/* RevArc mobile performance — shared flags, visibility pause, interval helpers */
(function () {
  'use strict';
  var R = false, M = false, C = false;
  try {
    R = matchMedia('(prefers-reduced-motion: reduce)').matches;
    M = matchMedia('(max-width:760px)').matches;
    C = matchMedia('(pointer:coarse)').matches;
  } catch (e) {}

  function low() { return R || M || C; }
  function animate() { return !low() && !document.hidden; }

  function refresh() {
    try {
      M = matchMedia('(max-width:760px)').matches;
      C = matchMedia('(pointer:coarse)').matches;
    } catch (e) {}
    rkPerf.low = low();
    rkPerf.animate = animate();
    rkPerf.mobile = M;
    rkPerf.coarse = C;
  }

  var rkPerf = {
    reduce: R,
    mobile: M,
    coarse: C,
    low: low(),
    hidden: document.hidden,
    animate: animate(),
    dpr: function () {
      return Math.min(window.devicePixelRatio || 1, (M || C) ? 1.5 : 2);
    },
    /** Pause RAF loops when tab is hidden; resume on coarse/desktop when visible */
    visLoop: function (start, stop) {
      document.addEventListener('visibilitychange', function () {
        rkPerf.hidden = document.hidden;
        rkPerf.animate = animate();
        if (document.hidden) stop();
        else if (animate()) start();
      });
    },
    /** setInterval that skips work while hidden; slower cadence on mobile */
    tick: function (fn, ms, mobileMs) {
      var delay = low() && mobileMs ? mobileMs : ms;
      return setInterval(function () {
        if (document.hidden) return;
        fn();
      }, delay);
    }
  };

  window.rkPerf = rkPerf;

  addEventListener('resize', refresh, { passive: true });
  document.addEventListener('visibilitychange', function () {
    rkPerf.hidden = document.hidden;
    rkPerf.animate = animate();
  });
})();
