/**
 * Notificações (toasts) exibidas na região .toast-region do index.html.
 * A região tem aria-live="polite", então as mensagens são lidas por
 * leitores de tela automaticamente.
 *
 * Uso: showToast('Mensagem', { type: 'success' | 'error' | 'info', duration: 5000 })
 */

const ICONS = {
  success: '<polyline points="20 6 9 17 4 12"/>',
  error: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
  info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
};

export function showToast(message, { type = 'info', duration = 5000 } = {}) {
  const region = document.querySelector('.toast-region');
  if (!region) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;

  // Ícone: SVG fixo (sem dados do usuário), seguro para innerHTML
  const icon = document.createElement('span');
  icon.className = 'toast__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
    stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${ICONS[type] ?? ICONS.info}</svg>`;

  const text = document.createElement('p');
  text.className = 'toast__text';
  text.textContent = message; // mensagem sempre como texto

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'toast__close';
  close.setAttribute('aria-label', 'Fechar notificação');
  close.textContent = '×';

  toast.append(icon, text, close);
  region.append(toast);

  const remove = () => {
    if (toast.classList.contains('is-leaving')) return;
    toast.classList.add('is-leaving');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
    window.setTimeout(() => toast.remove(), 400); // garantia se não houver animação
  };

  close.addEventListener('click', remove);
  window.setTimeout(remove, duration);
}
