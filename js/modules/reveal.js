/**
 * Animações de entrada ao rolar (IntersectionObserver).
 *
 * Uso no HTML: adicione o atributo data-reveal ao elemento.
 * Atraso opcional (efeito cascata): style="--reveal-delay: 100ms".
 * Os estilos ficam em css/animations.css.
 */

export function initReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  // Sem suporte (navegadores muito antigos): mantém tudo visível
  if (!('IntersectionObserver' in window)) return;

  // Ativa o estado inicial oculto somente agora que o JS está rodando
  document.documentElement.classList.add('js-reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target); // anima apenas uma vez
    });
  }, {
    rootMargin: '0px 0px -10% 0px', // dispara um pouco antes do fim da tela
    threshold: 0.15,
  });

  elements.forEach((element) => observer.observe(element));
}
