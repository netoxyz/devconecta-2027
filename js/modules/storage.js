/**
 * Camada de acesso ao LocalStorage para as inscrições.
 * Único módulo que lê/grava no LocalStorage (usado pelo form.js).
 *
 * Estrutura salva:
 *   devconecta2027:inscricoes        → lista (JSON) de inscrições
 *   devconecta2027:ultima-inscricao  → código da última inscrição feita
 *                                      neste navegador (para reexibir o comprovante)
 *
 * Toda leitura/gravação fica em try/catch: o LocalStorage pode estar
 * bloqueado (modo privado, permissões), cheio ou com dados corrompidos.
 */

/** Prefixo das chaves para evitar conflito com outros sites/projetos. */
export const STORAGE_PREFIX = 'devconecta2027:';

const KEY_REGISTRATIONS = `${STORAGE_PREFIX}inscricoes`;
const KEY_LAST = `${STORAGE_PREFIX}ultima-inscricao`;

/** Erro lançado quando não é possível gravar no LocalStorage. */
export class StorageError extends Error {}

/** Retorna todas as inscrições salvas (lista vazia se não houver ou se der erro). */
export function getRegistrations() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY_REGISTRATIONS) ?? '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** Procura uma inscrição pelo e-mail (sem diferenciar maiúsculas/minúsculas). */
export function findByEmail(email) {
  const normalized = normalizeEmail(email);
  return getRegistrations().find((r) => r.email === normalized) ?? null;
}

/** Procura uma inscrição pelo código. */
export function findByCode(code) {
  return getRegistrations().find((r) => r.code === code) ?? null;
}

/**
 * Salva uma nova inscrição.
 * Lança StorageError se o e-mail já existir ou se a gravação falhar.
 */
export function saveRegistration(registration) {
  const list = getRegistrations();
  const email = normalizeEmail(registration.email);

  if (list.some((r) => r.email === email)) {
    throw new StorageError('E-mail já inscrito.');
  }

  const record = { ...registration, email };
  try {
    localStorage.setItem(KEY_REGISTRATIONS, JSON.stringify([...list, record]));
    localStorage.setItem(KEY_LAST, record.code);
  } catch {
    throw new StorageError('Não foi possível salvar no navegador.');
  }
  return record;
}

/** Código da última inscrição feita neste navegador, ou null. */
export function getLastCode() {
  try {
    return localStorage.getItem(KEY_LAST);
  } catch {
    return null;
  }
}

/** Esquece a última inscrição exibida (não apaga as inscrições salvas). */
export function clearLastCode() {
  try {
    localStorage.removeItem(KEY_LAST);
  } catch {
    /* sem LocalStorage: nada a fazer */
  }
}

/** Gera um código único no formato DC27-XXXXXX (sem caracteres ambíguos). */
export function generateCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem 0/O, 1/I
  const existing = new Set(getRegistrations().map((r) => r.code));
  let code;
  do {
    const values = crypto.getRandomValues(new Uint32Array(6));
    code = 'DC27-' + Array.from(values, (v) => alphabet[v % alphabet.length]).join('');
  } while (existing.has(code));
  return code;
}

function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}
