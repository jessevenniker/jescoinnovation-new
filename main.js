/* ─── Hero canvas  —  golden hour on Curaçao ─────────────────── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h, raf;
  let t = 0;

  /* warm amber · Caribbean teal · soft twilight */
  const blobs = [
    { nx: 0.82, ny: 1.08, r: 0.78, rgb: [190, 115, 42],  alpha: 0.13,  sx: 0.00065, sy: 0.0005,  px: 0,   py: 0.5  },
    { nx: -0.05, ny: 0.4,  r: 0.65, rgb: [44, 172, 152],  alpha: 0.08,  sx: 0.00048, sy: 0.00062, px: 1.2, py: 2.1  },
    { nx: 0.5,  ny: -0.1,  r: 0.7,  rgb: [110, 68, 148],  alpha: 0.028, sx: 0.00038, sy: 0.00042, px: 2.5, py: 0.85 },
  ];

  function resize() {
    w = canvas.width  = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    /* base: warm deep teal sky → warm ocean at horizon */
    const base = ctx.createLinearGradient(0, 0, 0, h);
    base.addColorStop(0,    '#152A32');
    base.addColorStop(0.55, '#1A2C35');
    base.addColorStop(1,    '#1E2A1C');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    blobs.forEach(b => {
      const cx = w * (b.nx + Math.sin(t * b.sx + b.px) * 0.09);
      const cy = h * (b.ny + Math.cos(t * b.sy + b.py) * 0.08);
      const r  = Math.min(w, h) * b.r;
      const [rv, gv, bv] = b.rgb;

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `rgba(${rv},${gv},${bv},${b.alpha})`);
      g.addColorStop(1, `rgba(${rv},${gv},${bv},0)`);

      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    });

    t++;
    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('beforeunload', () => cancelAnimationFrame(raf));
})();


/* ─── Scroll fade-ins ─────────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();


/* ─── Nav on scroll ───────────────────────────────────────────── */
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  }, { passive: true });
})();
