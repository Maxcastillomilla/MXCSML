// ─────────────────────────────────────────────────────────────────────────────
// TAG FILTER
// Controla el filtrado de tarjetas por categoría en la sección de proyectos.
//
// Cómo funciona:
//   1. Cada tarjeta (.project-card) tiene un atributo data-tags='["design","research"]'
//      generado en ProjectGrid.astro al momento del build.
//   2. Cada botón (.tag-btn) tiene data-tag="design" (o "all").
//   3. Al hacer click en un botón, se comparan los tags de cada tarjeta con el
//      tag activo y se muestra u oculta con animación CSS.
//
// Se inicializa con initTagFilter() y se llama en astro:page-load para que
// funcione después de cada navegación con View Transitions.
// ─────────────────────────────────────────────────────────────────────────────

export function initTagFilter(): void {
  const filterBtns  = document.querySelectorAll<HTMLButtonElement>('.tag-btn');
  const cards        = document.querySelectorAll<HTMLElement>('.project-card');
  const noResults    = document.getElementById('no-results');

  if (!filterBtns.length || !cards.length) return;

  let activeTag = 'all';

  function setActive(tag: string): void {
    activeTag = tag;

    // Actualizar estilos de los botones (activo = fondo lleno, inactivo = outline)
    filterBtns.forEach(btn => {
      const isActive = btn.dataset.tag === tag;
      const bg       = btn.dataset.bg   ?? '#1a1a1a';
      const text     = btn.dataset.text ?? '#f8f7f5';

      if (isActive) {
        btn.style.background  = bg;
        btn.style.borderColor = bg;
        btn.style.color       = text;
      } else {
        btn.style.background  = 'transparent';
        btn.style.borderColor = bg;
        btn.style.color       = '#1a1a1a';
      }
      btn.setAttribute('aria-pressed', String(isActive));
    });

    // Mostrar/ocultar tarjetas según el tag activo
    let visibleCount = 0;
    cards.forEach(card => {
      const cardTags: string[] = JSON.parse(card.dataset.tags ?? '[]');
      const visible = tag === 'all' || cardTags.includes(tag);

      if (visible) {
        card.classList.remove('hidden-card');
        card.style.display = '';
        visibleCount++;
      } else {
        card.classList.add('hidden-card');
        // Esperar a que termine la animación CSS (300ms) antes de hacer display:none
        setTimeout(() => {
          if (card.classList.contains('hidden-card')) {
            card.style.display = 'none';
          }
        }, 320);
      }
    });

    // Mostrar mensaje "sin resultados" si ninguna tarjeta es visible
    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount > 0);
    }
  }

  // Asignar click handlers a cada botón de filtro
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => setActive(btn.dataset.tag ?? 'all'));
  });

  // Estado inicial: mostrar todo
  setActive('all');
}
