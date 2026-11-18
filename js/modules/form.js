/**
 * Formulário de inscrição: validação, prevenção de duplicidade,
 * gravação no LocalStorage e exibição do comprovante.
 *
 * DEMONSTRAÇÃO ACADÊMICA: nenhum dado é enviado a servidores.
 */

import {
  findByCode,
  findByEmail,
  generateCode,
  getLastCode,
  clearLastCode,
  saveRegistration,
  StorageError,
} from './storage.js';
import { showToast } from './toast.js';

const TRACKS = {
  ia: 'Inteligência Artificial',
  web: 'Desenvolvimento Web',
  inovacao: 'Inovação e Tecnologia',
  carreira: 'Carreira e Mercado',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Regras de validação: cada função retorna a mensagem de erro ou ''. */
const validators = {
  nome(value) {
    const name = value.trim();
    if (!name) return 'Informe seu nome completo.';
    if (name.split(/\s+/).length < 2) return 'Informe nome e sobrenome.';
    return '';
  },
  email(value) {
    const email = value.trim();
    if (!email) return 'Informe seu e-mail.';
    if (!EMAIL_PATTERN.test(email)) return 'Digite um e-mail válido, como nome@exemplo.com.';
    return '';
  },
  instituicao(value) {
    return value.trim().length >= 2 ? '' : 'Informe sua instituição de ensino.';
  },
  curso(value) {
    return value.trim().length >= 2 ? '' : 'Informe o seu curso.';
  },
  semestre(value) {
    return value ? '' : 'Selecione o semestre.';
  },
  trilha(value) {
    return value ? '' : 'Escolha uma trilha de interesse.';
  },
  termos(checked) {
    return checked ? '' : 'Você precisa aceitar os termos para continuar.';
  },
};

export function initForm() {
  const form = document.querySelector('[data-form]');
  const ticket = document.querySelector('[data-ticket]');
  if (!form || !ticket) return;

  const touched = new Set(); // campos que o usuário já visitou

  /* ---------- Leitura dos valores ---------- */
  const getValue = (name) => {
    if (name === 'termos') return form.elements.termos.checked;
    if (name === 'trilha') return form.elements.trilha.value; // RadioNodeList
    return form.elements[name].value;
  };

  /* ---------- Exibição de erros ---------- */
  const fieldContainer = (name) =>
    name === 'trilha'
      ? form.querySelector('.track-picker')
      : form.elements[name].closest('.field');

  const setError = (name, message) => {
    const container = fieldContainer(name);
    const errorEl = form.querySelector(`#${name}-erro`);
    const inputs = name === 'trilha' ? [...form.elements.trilha] : [form.elements[name]];

    errorEl.textContent = message;
    container.classList.toggle('is-invalid', Boolean(message));
    container.classList.toggle('is-valid', !message && name !== 'termos');
    inputs.forEach((input) => {
      if (message) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    });
  };

  const validateField = (name) => {
    const message = validators[name](getValue(name));
    setError(name, message);
    return !message;
  };

  const clearStates = () => {
    touched.clear();
    Object.keys(validators).forEach((name) => {
      setError(name, '');
      fieldContainer(name).classList.remove('is-valid');
    });
  };

  /* ---------- Validação em tempo real ---------- */
  // Valida ao sair do campo; depois disso, revalida a cada alteração.
  form.addEventListener('focusout', (event) => {
    const name = event.target.name;
    if (!validators[name] || name === 'trilha') return;
    touched.add(name);
    validateField(name);
  });

  const revalidate = (event) => {
    const name = event.target.name;
    if (!validators[name]) return;
    if (name === 'trilha' || name === 'termos' || name === 'semestre') touched.add(name);
    if (touched.has(name)) validateField(name);
  };
  form.addEventListener('input', revalidate);
  form.addEventListener('change', revalidate);

  /* ---------- Envio ---------- */
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const names = Object.keys(validators);
    names.forEach((name) => touched.add(name));
    const invalid = names.filter((name) => !validateField(name));

    if (invalid.length) {
      focusField(invalid[0]);
      showToast('Revise os campos destacados para concluir a inscrição.', { type: 'error' });
      return;
    }

    // Impede inscrição duplicada pelo e-mail
    const existing = findByEmail(getValue('email'));
    if (existing) {
      setError('email', `Este e-mail já possui inscrição (código ${existing.code}).`);
      focusField('email');
      showToast('Já existe uma inscrição com este e-mail.', { type: 'error' });
      return;
    }

    const semester = form.elements.semestre;
    const registration = {
      code: generateCode(),
      name: getValue('nome').trim().replace(/\s+/g, ' '),
      email: getValue('email').trim(),
      institution: getValue('instituicao').trim(),
      course: getValue('curso').trim(),
      semester: semester.value,
      semesterLabel: semester.options[semester.selectedIndex].text,
      track: getValue('trilha'),
      trackLabel: TRACKS[getValue('trilha')],
      createdAt: new Date().toISOString(),
    };

    try {
      const saved = saveRegistration(registration);
      form.reset();
      clearStates();
      showTicket(saved, { focus: true });
      showToast(`Inscrição confirmada! Seu código é ${saved.code}.`, { type: 'success' });
    } catch (error) {
      const message = error instanceof StorageError
        ? `${error.message} Verifique se o armazenamento do navegador está habilitado.`
        : 'Ocorreu um erro inesperado. Tente novamente.';
      showToast(message, { type: 'error', duration: 7000 });
    }
  });

  /* ---------- Comprovante ---------- */
  function showTicket(record, { focus = false } = {}) {
    ticket.querySelector('[data-ticket-name]').textContent = record.name;
    ticket.querySelector('[data-ticket-track]').textContent = record.trackLabel ?? TRACKS[record.track] ?? '-';
    ticket.querySelector('[data-ticket-code]').textContent = record.code;
    ticket.querySelector('[data-ticket-date]').textContent =
      `Inscrição registrada em ${formatDate(record.createdAt)} · salva apenas neste navegador`;

    form.hidden = true;
    ticket.hidden = false;
    if (focus) {
      // Leva o comprovante para a tela (o formulário longo sumiu acima/abaixo)
      ticket.closest('.register__card')?.scrollIntoView({ block: 'start' });
      ticket.focus({ preventScroll: true });
    }
  }

  ticket.querySelector('[data-ticket-new]').addEventListener('click', () => {
    clearLastCode();
    ticket.hidden = true;
    form.hidden = false;
    form.elements.nome.focus();
  });

  // Ao recarregar a página, mostra novamente o comprovante da última inscrição
  const last = getLastCode();
  const lastRecord = last && findByCode(last);
  if (lastRecord) showTicket(lastRecord);

  function focusField(name) {
    const target = name === 'trilha' ? form.elements.trilha[0] : form.elements[name];
    target.focus();
  }
}

function formatDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '-';
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(date);
}
