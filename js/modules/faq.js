/**
 * FAQ: renderiza as perguntas a partir de js/data/faq.js e controla o acordeão.
 *
 * - Clicar em uma pergunta abre a resposta; clicar de novo fecha.
 * - Apenas uma pergunta fica aberta por vez.
 * - Cada pergunta é um <button> com aria-expanded/aria-controls (padrão WAI-ARIA).
 */

import { faq } from '../data/faq.js';

export function initFaq() {
  const container = document.querySelector('[data-faq]');
  if (!container || !faq.length) return;

  const items = faq.map((entry, index) => createItem(entry, index));
  container.replaceChildren(...items.map((item) => item.element));

  const setOpen = (target, open) => {
    target.button.setAttribute('aria-expanded', String(open));
    target.element.classList.toggle('is-open', open);
    target.panel.setAttribute('aria-hidden', String(!open));
    // inert impede o foco em conteúdo de respostas fechadas
    target.panel.inert = !open;
  };

  items.forEach((item) => {
    setOpen(item, false);
    item.button.addEventListener('click', () => {
      const willOpen = item.button.getAttribute('aria-expanded') !== 'true';
      items.forEach((other) => setOpen(other, false)); // apenas uma aberta
      if (willOpen) setOpen(item, true);
    });
  });
}

function createItem(entry, index) {
  const id = `faq-${index + 1}`;

  const element = document.createElement('div');
  element.className = 'faq__item';

  const heading = document.createElement('h3');
  heading.className = 'faq__heading';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'faq__question';
  button.id = `${id}-pergunta`;
  button.setAttribute('aria-controls', `${id}-resposta`);

  const number = document.createElement('span');
  number.className = 'faq__number';
  number.setAttribute('aria-hidden', 'true');
  number.textContent = String(index + 1).padStart(2, '0');

  const text = document.createElement('span');
  text.className = 'faq__question-text';
  text.textContent = entry.question;

  // Ícone "+" que vira "−" quando aberto (desenhado em CSS)
  const icon = document.createElement('span');
  icon.className = 'faq__icon';
  icon.setAttribute('aria-hidden', 'true');

  button.append(number, text, icon);
  heading.append(button);

  const panel = document.createElement('div');
  panel.className = 'faq__panel';
  panel.id = `${id}-resposta`;
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', button.id);

  const inner = document.createElement('div');
  inner.className = 'faq__panel-inner';
  const answer = document.createElement('p');
  answer.className = 'faq__answer';
  answer.textContent = entry.answer;
  inner.append(answer);
  panel.append(inner);

  element.append(heading, panel);
  return { element, button, panel };
}
