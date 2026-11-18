/**
 * Contagem regressiva do Hero.
 *
 * A data do evento fica centralizada em EVENT_START. Ela é escrita em
 * formato ISO 8601 com o deslocamento explícito de Brasília (-03:00),
 * o que define um instante absoluto: o resultado é o mesmo em qualquer
 * fuso horário configurado no computador do visitante.
 */

/** Início do evento: 17/06/2027 às 09:00, horário de Brasília (UTC-3). */
export const EVENT_START = new Date('2027-06-17T09:00:00-03:00');

/** Mensagem exibida quando a contagem chega a zero. */
const DONE_MESSAGE = 'O DevConecta 2027 começou! Acompanhe a programação.';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function initCountdown() {
  const root = document.querySelector('[data-countdown]');
  if (!root) return;

  const timer = root.querySelector('.countdown__timer');
  const doneMessage = root.querySelector('[data-countdown-done]');
  const fields = {
    days: root.querySelector('[data-unit="days"]'),
    hours: root.querySelector('[data-unit="hours"]'),
    minutes: root.querySelector('[data-unit="minutes"]'),
    seconds: root.querySelector('[data-unit="seconds"]'),
  };

  let timeoutId = null;

  const tick = () => {
    const remaining = EVENT_START.getTime() - Date.now();

    if (remaining <= 0) {
      finish();
      return;
    }

    render(splitTime(remaining));

    // Agenda a próxima atualização exatamente na virada do próximo segundo
    // (evita o "desvio" acumulado de um setInterval fixo de 1000 ms).
    const delay = remaining % SECOND || SECOND;
    timeoutId = window.setTimeout(tick, delay + 5);
  };

  const render = (parts) => {
    Object.entries(parts).forEach(([unit, value]) => {
      setValue(fields[unit], String(value).padStart(2, '0'));
    });
  };

  const finish = () => {
    window.clearTimeout(timeoutId);
    if (timer) timer.hidden = true;
    if (doneMessage) {
      doneMessage.hidden = false;
      doneMessage.textContent = DONE_MESSAGE; // role="status" anuncia a mensagem
    }
  };

  // Navegadores reduzem timers em abas em segundo plano; ao voltar,
  // recalcula imediatamente para não exibir um valor atrasado.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      window.clearTimeout(timeoutId);
      tick();
    }
  });

  tick();
}

/**
 * Divide milissegundos em dias, horas, minutos e segundos.
 * Usa arredondamento para cima nos segundos: com 0,4 s restante
 * ainda é exibido "00:00:01", e o zero coincide com o início do evento.
 */
function splitTime(ms) {
  const total = Math.ceil(ms / SECOND) * SECOND;
  return {
    days: Math.floor(total / DAY),
    hours: Math.floor((total % DAY) / HOUR),
    minutes: Math.floor((total % HOUR) / MINUTE),
    seconds: Math.floor((total % MINUTE) / SECOND),
  };
}

/** Atualiza o número somente se ele mudou, reiniciando a animação de troca. */
function setValue(element, text) {
  if (!element || element.textContent === text) return;

  element.textContent = text;
  element.classList.remove('is-changing');
  void element.offsetWidth; // força o navegador a reiniciar a animação
  element.classList.add('is-changing');
}
