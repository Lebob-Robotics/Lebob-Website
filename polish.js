/* polish.js — below-the-fold scroll reveal (pairs with polish.css).
 *
 * SAFE DEGRADATION: the very first line adds `.js-reveal` to <html>, which
 * is what arms the CSS hide rules. If this file fails to load, the class is
 * never added and all content stays visible. Loaded with `defer`, so by the
 * time it runs the DOM is parsed and we reveal in-view elements in the same
 * tick (no flash) and only animate genuinely off-screen ones on scroll.
 */
(function () {
  var root = document.documentElement;
  root.classList.add('js-reveal');

  var SELECTOR = [
    '.highlight-card', '.crew-card', '.project-card', '.tier-card', '.tier-max',
    '.where-card', '.doc-item', '.masonry-item', '.sponsor-card',
    '.section-title', '.section-label'
  ].join(',');

  function reveal(el) { el.classList.add('is-visible'); }

  function setup() {
    var targets = document.querySelectorAll(SELECTOR);
    var reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // No motion wanted, or no observer support: show everything immediately.
    if (reduce || !('IntersectionObserver' in window)) {
      for (var i = 0; i < targets.length; i++) reveal(targets[i]);
      return;
    }

    var vh = window.innerHeight || root.clientHeight;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        reveal(el);
        // Clear the stagger delay once revealed so later hover/press
        // transitions on this element aren't delayed.
        el.addEventListener('transitionend', function clear() {
          el.style.transitionDelay = '';
          el.removeEventListener('transitionend', clear);
        });
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      // Already in view at load: reveal instantly, same tick → no flash,
      // no entrance animation for above-the-fold content.
      if (rect.top < vh && rect.bottom > 0) {
        reveal(el);
        return;
      }
      // Below the fold: gentle capped cascade within sibling groups.
      var sibs = el.parentElement ? el.parentElement.children : [el];
      var idx = Array.prototype.indexOf.call(sibs, el);
      el.style.transitionDelay = (Math.min(idx, 6) * 50) + 'ms';
      io.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
