/**
 * Navbar: estado ao rolar, menu mobile e scroll spy.
 *
 * - Adiciona .is-scrolled ao header quando a página sai do topo (glassmorphism).
 * - Abre/fecha o menu mobile (botão, clique em link, clique no fundo, tecla Esc).
 * - Destaca o link da seção visível usando IntersectionObserver.
 *
 * A rolagem suave e o desconto da altura da navbar ficam no CSS
 * (scroll-behavior e scroll-padding-top em base.css).
 */

/** Largura a partir da qual o layout desktop é usado (igual ao CSS). */
const DESKTOP_QUERY = '(min-width: 960px)';

/** Distância rolada (px) para aplicar o fundo da navbar. */
const SCROLL_THRESHOLD = 8;

export function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggle = header?.querySelector('.navbar__toggle');
  const panel = header?.querySelector('.navbar__panel');
  const backdrop = header?.querySelector('[data-navbar-backdrop]');

  if (!header || !toggle || !panel) return;

  setupScrolledState(header);
  setupMobileMenu({ header, toggle, panel, backdrop });
  setupScrollSpy(header);
}

/* --------------------------------------------------------------------------
   Fundo da navbar ao rolar
   -------------------------------------------------------------------------- */

function setupScrolledState(header) {
  let ticking = false;

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
    ticking = false;
  };

  // requestAnimationFrame limita a atualização a uma vez por quadro
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });

  update(); // estado correto ao carregar a página já rolada (ex.: com #hash)
}

/* --------------------------------------------------------------------------
   Menu mobile
   -------------------------------------------------------------------------- */

function setupMobileMenu({ header, toggle, panel, backdrop }) {
  const desktop = window.matchMedia(DESKTOP_QUERY);

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  const open = () => {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu de navegação');
    header.classList.add('is-menu-open');
    document.body.classList.add('has-menu-open');
    if (backdrop) backdrop.hidden = false;

    // Leva o foco ao primeiro link para quem navega por teclado
    panel.querySelector('a')?.focus({ preventScroll: true });
  };

  const close = ({ returnFocus = false } = {}) => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu de navegação');
    header.classList.remove('is-menu-open');
    document.body.classList.remove('has-menu-open');
    if (backdrop) backdrop.hidden = true;

    if (returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => (isOpen() ? close() : open()));

  // Fecha ao clicar em qualquer link do menu. O fechamento acontece antes
  // da navegação padrão da âncora, então a rolagem já ocorre liberada.
  panel.addEventListener('click', (event) => {
    if (event.target.closest('a') && isOpen()) close();
  });

  backdrop?.addEventListener('click', () => close());

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) close({ returnFocus: true });
  });

  // Se a tela passar para o layout desktop com o menu aberto, fecha o menu
  desktop.addEventListener('change', (event) => {
    if (event.matches && isOpen()) close();
  });
}

/* --------------------------------------------------------------------------
   Scroll spy
   -------------------------------------------------------------------------- */

function setupScrollSpy(header) {
  const links = [...header.querySelectorAll('.navbar__link[href^="#"]')];

  // Mapeia cada seção ao seu link na navbar
  const linkBySection = new Map();
  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) linkBySection.set(section, link);
  });

  if (!linkBySection.size || !('IntersectionObserver' in window)) return;

  const setActive = (activeLink) => {
    links.forEach((link) => {
      const active = link === activeLink;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  // Observa todas as seções do <main>, inclusive as que não têm link
  // (ex.: #inscricao), para que nenhum link fique destacado por engano.
  const sections = [...document.querySelectorAll('main section[id]')];

  // A "linha de leitura" é uma faixa estreita a ~40% da altura da tela:
  // a seção que a cruza é considerada a seção atual.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(linkBySection.get(entry.target) ?? null);
    });
  }, { rootMargin: '-40% 0px -59% 0px', threshold: 0 });

  sections.forEach((section) => observer.observe(section));

  // No fim da página, a última seção pode não alcançar a linha de leitura;
  // nesse caso, destaca a última seção que possui link.
  const lastLinkedSection = sections.filter((s) => linkBySection.has(s)).at(-1);
  window.addEventListener('scroll', () => {
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom && lastLinkedSection) setActive(linkBySection.get(lastLinkedSection));
  }, { passive: true });
}
