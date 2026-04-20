// ─────────────────────────────────────────────────────────────────────────────
// TAG FILTER + SHOW MORE
// Controla el filtrado de tarjetas por categoría y la expansión del grid.
//
// Estados:
//   activeTag — 'all' | nombre de tag → qué tarjetas son visibles por filtro
//   expanded  — boolean              → si se muestran todas (Ver más) o solo
//                                      las primeras INITIAL_VISIBLE
//
// Reglas de visibilidad para cada tarjeta:
//   - matchesFilter: activeTag === 'all' OR el tag está en data-tags
//   - inFold:        activeTag === 'all' AND !expanded AND index >= initialVisible
//   - visible:       matchesFilter AND !inFold
//
// Cuando hay un filtro activo (≠ 'all') se ignora el fold y se muestran
// todos los proyectos que coincidan con el tag.
// ─────────────────────────────────────────────────────────────────────────────

export function initTagFilter(): void {
  const filterBtns    = document.querySelectorAll<HTMLButtonElement>('.tag-btn');
  const cards         = document.querySelectorAll<HTMLElement>('.project-card');
  const noResults     = document.getElementById('no-results');
  const showMoreBtn   = document.getElementById('show-more-btn');
  const showMoreSec   = document.getElementById('show-more-section');
  const grid          = document.getElementById('projects-grid');

  if (!filterBtns.length || !cards.length) return;

  // Leer el umbral inicial desde el data-attribute del grid
  const initialVisible = parseInt(grid?.dataset.initialVisible ?? '999', 10);

  let activeTag = 'all';
  let expanded  = false;

  // ── Actualizar visibilidad de todas las tarjetas ──────────────────────────
  function updateVisibility(): void {
    let visibleCount = 0;
    let foldedCount  = 0; // tarjetas ocultas por fold (no por filtro)

    cards.forEach((card, i) => {
      const cardTags: string[] = JSON.parse(card.dataset.tags ?? '[]');

      const matchesFilter = activeTag === 'all' || cardTags.includes(activeTag);
      // El fold solo aplica cuando se muestra todo (sin filtro activo)
      const inFold = activeTag === 'all' && !expanded && i >= initialVisible;

      const shouldShow = matchesFilter && !inFold;

      if (matchesFilter && inFold) foldedCount++;

      if (shouldShow) {
        // Mostrar con animación de entrada (quita clase hidden-card si la tenía)
        card.classList.remove('hidden-card');
        card.style.display = '';
        visibleCount++;
      } else if (inFold) {
        // Oculto por fold: sin animación, oculto directo
        card.classList.remove('hidden-card');
        card.style.display = 'none';
      } else {
        // Oculto por filtro: animar salida y luego display:none
        card.classList.add('hidden-card');
        setTimeout(() => {
          if (card.classList.contains('hidden-card')) card.style.display = 'none';
        }, 320);
      }
    });

    // Mensaje sin resultados
    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount > 0);
    }

    // Botón Ver más: visible solo cuando se muestra "todo" (sin filtro activo)
    // y hay proyectos fuera del fold o la sección está expandida
    if (showMoreSec) {
      const hasMore = activeTag === 'all' && (expanded || foldedCount > 0);
      showMoreSec.style.display = hasMore ? '' : 'none';
      if (showMoreBtn) {
        showMoreBtn.textContent = expanded
          ? '↑ Ver menos'
          : `↓ Ver más (${foldedCount})`;
      }
    }
  }

  // ── Actualizar estilos de los botones de filtro ───────────────────────────
  function updateButtonStyles(tag: string): void {
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
  }

  // ── Click en botones de filtro ────────────────────────────────────────────
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeTag = btn.dataset.tag ?? 'all';
      updateButtonStyles(activeTag);
      updateVisibility();
    });
  });

  // ── Click en Ver más / Ver menos ─────────────────────────────────────────
  showMoreBtn?.addEventListener('click', () => {
    expanded = !expanded;
    updateVisibility();

    // Al contraer, volver al inicio de la sección de proyectos
    if (!expanded) {
      document.getElementById('projects')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });

  // Estado inicial
  updateButtonStyles('all');
  updateVisibility();
}
