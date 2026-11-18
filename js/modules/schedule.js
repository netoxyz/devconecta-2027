/**
 * Programação interativa: abas por dia e filtros por categoria.
 *
 * Os dados vêm de js/data/schedule.js. Todo o conteúdo é inserido com
 * textContent (nunca innerHTML com dados), evitando injeção de HTML.
 */

import { categories, scheduleDays } from '../data/schedule.js';

const ALL = 'todas';

export function initSchedule() {
  const root = document.querySelector('[data-schedule]');
  if (!root || !scheduleDays.length) return;

  const tabsEl = root.querySelector('[data-schedule-tabs]');
  const filtersEl = root.querySelector('[data-schedule-filters]');
  const panel = root.querySelector('[data-schedule-panel]');
  const list = root.querySelector('[data-schedule-list]');
  const empty = root.querySelector('[data-schedule-empty]');
  const status = root.querySelector('[data-schedule-status]');

  const categoryLabel = Object.fromEntries(categories.map((c) => [c.id, c.label]));

  /** Estado atual da interface. */
  const state = { day: scheduleDays[0].id, category: ALL };

  /* ---------- Abas (dias) ---------- */
  const tabs = scheduleDays.map((day) => {
    const tab = el('button', 'tab');
    tab.type = 'button';
    tab.id = `tab-${day.id}`;
    tab.dataset.day = day.id;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    tab.append(el('span', 'tab__label', day.label), el('span', 'tab__date', day.dateLabel));
    tab.addEventListener('click', () => selectDay(day.id));
    tabsEl.append(tab);
    return tab;
  });

  // Navegação por setas entre as abas (padrão WAI-ARIA)
  tabsEl.addEventListener('keydown', (event) => {
    const index = tabs.indexOf(document.activeElement);
    if (index === -1) return;
    let next = null;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === null) return;
    event.preventDefault();
    tabs[next].focus();
    selectDay(tabs[next].dataset.day);
  });

  /* ---------- Filtros (categorias) ---------- */
  const filterOptions = [{ id: ALL, label: 'Todas' }, ...categories];
  const chips = filterOptions.map((option) => {
    const chip = el('button', 'chip');
    chip.type = 'button';
    chip.dataset.category = option.id;
    if (option.id !== ALL) chip.append(el('span', 'chip__dot'));
    chip.append(document.createTextNode(option.label));
    chip.addEventListener('click', () => selectCategory(option.id));
    filtersEl.append(chip);
    return chip;
  });

  /* ---------- Ações ---------- */
  function selectDay(dayId) {
    state.day = dayId;
    render();
  }

  function selectCategory(categoryId) {
    state.category = categoryId;
    render();
  }

  /* ---------- Renderização ---------- */
  function render() {
    const day = scheduleDays.find((d) => d.id === state.day);

    // Feedback visual e estado acessível das abas
    tabs.forEach((tab) => {
      const selected = tab.dataset.day === state.day;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      tab.classList.toggle('is-active', selected);
    });
    panel.setAttribute('aria-labelledby', `tab-${state.day}`);

    // Feedback visual e estado acessível dos filtros
    chips.forEach((chip) => {
      const pressed = chip.dataset.category === state.category;
      chip.setAttribute('aria-pressed', String(pressed));
      chip.classList.toggle('is-active', pressed);
    });

    const activities = day.activities.filter(
      (a) => state.category === ALL || a.category === state.category,
    );

    list.replaceChildren(...activities.map((activity, i) => createActivity(activity, i)));
    empty.hidden = activities.length > 0;

    const count = activities.length === 1 ? '1 atividade' : `${activities.length} atividades`;
    status.textContent = `${day.label}, ${day.dateLabel}: ${count}.`;
  }

  function createActivity(activity, index) {
    const item = el('li', 'timeline__item');
    item.dataset.category = activity.category;
    item.style.setProperty('--i', index); // atraso escalonado da animação

    const time = el('div', 'timeline__time');
    const start = el('time', 'timeline__start', activity.start);
    start.dateTime = activity.start;
    const end = el('span', 'timeline__end', `até ${activity.end}`);
    time.append(start, end);

    const card = el('article', 'activity');
    const meta = el('div', 'activity__meta');
    meta.append(
      el('span', 'activity__category', categoryLabel[activity.category] ?? activity.category),
      el('span', 'activity__type', activity.type),
    );

    const speaker = el('div', 'activity__speaker');
    const avatar = el('span', 'activity__avatar', initials(activity.speaker));
    avatar.setAttribute('aria-hidden', 'true');
    const who = el('div', 'activity__who');
    who.append(
      el('span', 'activity__name', activity.speaker),
      el('span', 'activity__role', activity.role),
    );
    speaker.append(avatar, who);

    card.append(
      meta,
      el('h3', 'activity__title', activity.title),
      el('p', 'activity__desc', activity.description),
      speaker,
    );

    item.append(time, el('span', 'timeline__dot'), card);
    return item;
  }

  render();
}

/* ---------- Utilitários ---------- */

/** Cria um elemento com classe e texto opcionais. */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/** "Helena Duarte" → "HD" */
function initials(name) {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts.at(-1)[0] : '')).toUpperCase();
}
