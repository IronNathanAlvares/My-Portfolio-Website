/* Legacy site behavior bridge for Next.js.
   This script safely adds small DOM enhancements that existed in the original script.js
   without conflicting with the React components.
*/
(function(){
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // ========== Back to Top button ==========
  function backToTopSetup(){
    const btn = document.getElementById('back-to-top');
    const about = document.getElementById('about');
    if (!btn || !about) return;
    function updateVisibility(){
      const rect = about.getBoundingClientRect();
      const scrolledPast = rect.top <= 0;
      btn.hidden = !scrolledPast;
      btn.setAttribute('aria-hidden', String(!scrolledPast));
    }
    btn.addEventListener('click', (e)=>{ e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'});});
    window.addEventListener('scroll', updateVisibility, {passive:true});
    window.addEventListener('resize', updateVisibility);
    updateVisibility();
  }

  // ========== Recommendations: expand/collapse ==========
  function recommendationsToggles(){
    const recGrid = document.querySelector('.recommendations-grid');
    if (!recGrid) return;
    const cards = Array.from(recGrid.querySelectorAll('.rec-card'));
    cards.forEach(card => {
      const body = card.querySelector('.rec-body');
      const text = body && body.querySelector('.rec-text');
      if (!body || !text) return;
      if (body.querySelector('.rec-toggle')) return; // already inserted
      const btn = document.createElement('button');
      btn.className = 'rec-toggle';
      btn.type = 'button';
      btn.setAttribute('aria-expanded','false');
      btn.textContent = 'Show more';
      text.insertAdjacentElement('afterend', btn);
      btn.addEventListener('click', () => {
        const expanded = card.classList.toggle('expanded');
        btn.textContent = expanded ? 'Show less' : 'Show more';
        btn.setAttribute('aria-expanded', String(expanded));
      });
    });
  }

  // ========== Languages: CEFR mapping + overflow fades ==========
  function setupLanguages(){
    const levelMap = {
      'C2': 100, 'C1': 90, 'B2': 70, 'B1': 55, 'A2': 30, 'A1': 10, 'A0': 3,
      'native': 100, 'fluent': 90, 'proficient': 80, 'advanced': 70,
      'intermediate': 55, 'conversational': 40, 'basic': 25, 'beginner': 10,
      'novice': 3, 'just-started': 3
    };
    const chips = Array.from(document.querySelectorAll('.language-chip'));
    chips.forEach(chip => {
      const fill = chip.querySelector('.lang-fill');
      if (!fill) return;
      let v = 0;
      if (chip.dataset.levelValue) v = parseInt(chip.dataset.levelValue, 10) || 0;
      else if (chip.dataset.level) v = levelMap[chip.dataset.level] || 0;
      v = Math.max(0, Math.min(100, v));
      fill.style.width = v + '%';
    });
    function updateOverflowForAll(){
      const sections = Array.from(document.querySelectorAll('.languages-section'));
      sections.forEach(section => {
        const chipsWrap = section.querySelector('.language-chips');
        if (!chipsWrap) return;
        const overflowing = chipsWrap.scrollWidth > chipsWrap.clientWidth + 2;
        section.classList.toggle('overflowing', overflowing);
      });
    }
    updateOverflowForAll();
    window.addEventListener('resize', updateOverflowForAll);
  }

  // ========== Eyes follow (contact figure) ==========
  function setupEyes(){
    const pupils = Array.from(document.querySelectorAll('.contact-figure .pupil'));
    const contact = document.querySelector('.section.contact');
    if (pupils.length === 0 || !contact) return;
    let last = {x: window.innerWidth/2, y: window.innerHeight/2};
    function pointInRect(x,y,r){ return r && x>=r.left && x<=r.right && y>=r.top && y<=r.bottom; }
    function onMove(ev){
      const rect = contact.getBoundingClientRect();
      const x = 'clientX' in ev ? ev.clientX : (ev.touches && ev.touches[0] ? ev.touches[0].clientX : last.x);
      const y = 'clientY' in ev ? ev.clientY : (ev.touches && ev.touches[0] ? ev.touches[0].clientY : last.y);
      if (!pointInRect(x,y,rect)) return;
      last = {x,y};
      pupils.forEach(p => {
        const eye = p.parentElement;
        if (!eye) return;
        const r = eye.getBoundingClientRect();
        const cx = r.left + r.width/2;
        const cy = r.top + r.height/2;
        const dx = x - cx; const dy = y - cy;
        const maxX = (r.width - p.clientWidth)/2 - 4;
        const maxY = (r.height - p.clientHeight)/2 - 4;
        const nx = Math.max(-maxX, Math.min(maxX, dx*0.2));
        const ny = Math.max(-maxY, Math.min(maxY, dy*0.2));
        p.style.transform = `translate(calc(-50% + ${nx}px), calc(-50% + ${ny}px))`;
      });
    }
    window.addEventListener('pointermove', onMove, {passive:true});
    window.addEventListener('touchmove', onMove, {passive:true});
  }

  // ========== Smooth anchor navigation with offset ==========
  function setupAnchorNavigation(){
    const header = document.querySelector('.nav');
    const getHeaderHeight = () => header ? header.offsetHeight : 80;
    const navEntry = (performance && performance.getEntriesByType) ? performance.getEntriesByType('navigation')[0] : null;
    const isReload = !!navEntry && navEntry.type === 'reload';
    
    // Get absolute position from document top
    function getAbsoluteTop(element){
      let top = 0;
      let current = element;
      while (current) {
        top += current.offsetTop;
        current = current.offsetParent;
      }
      return top;
    }
    
    // Handle all internal anchor clicks
    document.addEventListener('click', (e) => {
      const target = e.target;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      
      e.preventDefault();
      
      const targetId = href.slice(1);
      const element = document.getElementById(targetId);
      if (!element) return;
      
      // Calculate target position with offset
      const headerHeight = getHeaderHeight();
      const absoluteTop = getAbsoluteTop(element);
      const offsetPosition = absoluteTop - headerHeight - 12;
      
      // Scroll to position
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash without triggering scroll
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    });
    
    // Handle direct hash navigation (e.g., page load with hash) only on fresh navigations, not reloads
    if (location.hash) {
      if (isReload) {
        // On reload: always start at the top and clear the hash so the URL doesn't force scrolling
        history.replaceState(null, '', location.pathname + location.search);
        window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
      } else {
        setTimeout(() => {
          const targetId = location.hash.slice(1);
          const element = document.getElementById(targetId);
          if (element) {
            const headerHeight = getHeaderHeight();
            const absoluteTop = getAbsoluteTop(element);
            const offsetPosition = absoluteTop - headerHeight - 12;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }

  // ========== Initialize after DOM ready ==========
  function init(){
    backToTopSetup();
    recommendationsToggles();
    setupLanguages();
    setupEyes();
    setupAnchorNavigation();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
