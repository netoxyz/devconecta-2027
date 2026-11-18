/**
 * DevConecta 2027 — Ponto de entrada do JavaScript.
 *
 * Carregado em index.html com type="module" (adiado por padrão,
 * então o DOM já está disponível quando este arquivo executa).
 *
 * Cada funcionalidade vive em seu próprio módulo em js/modules/.
 * Os módulos ainda estão vazios e serão implementados etapa por etapa.
 */

import { initNavbar } from './modules/navbar.js';
import { initCountdown } from './modules/countdown.js';
import { initReveal } from './modules/reveal.js';
import { initCounters } from './modules/counters.js';
import { initSchedule } from './modules/schedule.js';
import { initSpeakers } from './modules/speakers.js';
import { initForm } from './modules/form.js';
import { initFaq } from './modules/faq.js';

/** Módulos inicializados na ordem em que aparecem na página. */
const modules = [
  ['navbar', initNavbar],
  ['countdown', initCountdown],
  ['reveal', initReveal],
  ['counters', initCounters],
  ['schedule', initSchedule],
  ['speakers', initSpeakers],
  ['form', initForm],
  ['faq', initFaq],
];

/**
 * Inicializa cada módulo de forma isolada: um erro em um módulo
 * é registrado no console sem impedir o funcionamento dos demais.
 */
function init() {
  modules.forEach(([name, initModule]) => {
    try {
      initModule();
    } catch (error) {
      console.error(`[DevConecta] Falha ao iniciar o módulo "${name}":`, error);
    }
  });
}

init();
