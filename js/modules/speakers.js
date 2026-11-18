/**
 * Palestrantes: renderiza os cards a partir de js/data/speakers.js.
 * Todo o conteúdo é inserido com textContent (sem innerHTML com dados).
 */

import { speakers } from '../data/speakers.js';

export function initSpeakers() {
  const list = document.querySelector('[data-speakers]');
  if (!list || !speakers.length) return;

  list.replaceChildren(...speakers.map(createCard));
}

function createCard(speaker) {
  const item = el('li', `speaker-card speaker-card--${speaker.accent}`);
  const card = el('article', 'speaker-card__inner');

  // Avatar com iniciais (CSS puro, sem imagens externas)
  const avatar = el('div', 'speaker-card__avatar');
  avatar.setAttribute('aria-hidden', 'true');
  avatar.append(el('span', 'speaker-card__initials', initials(speaker.name)));

  const header = el('div', 'speaker-card__header');
  header.append(
    el('h3', 'speaker-card__name', speaker.name),
    el('p', 'speaker-card__role', speaker.role),
    el('p', 'speaker-card__company', speaker.company),
  );

  const talk = el('div', 'speaker-card__talk');
  talk.append(
    el('span', 'speaker-card__talk-label', 'Palestra'),
    el('p', 'speaker-card__talk-title', speaker.talk),
  );

  card.append(
    avatar,
    el('span', 'speaker-card__specialty', speaker.specialty),
    header,
    talk,
    el('p', 'speaker-card__bio', speaker.bio),
  );

  item.append(card);
  return item;
}

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
