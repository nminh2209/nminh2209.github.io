/* ============================================
   PORTFOLIO PAGE — Interactions
   Stars canvas + crystal hover
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ── Starfield canvas ────────────────────────────────────
    const starsCanvas = document.getElementById('stars-canvas');
    if (starsCanvas) {
        const ctx = starsCanvas.getContext('2d');
        let W = starsCanvas.width  = window.innerWidth;
        let H = starsCanvas.height = window.innerHeight;

        const STARS = 180;
        const stars = [];

        for (let i = 0; i < STARS; i++) {
            stars.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.4 + 0.2,
                alpha: Math.random() * 0.7 + 0.15,
                speed: Math.random() * 0.015 + 0.004,
                phase: Math.random() * Math.PI * 2
            });
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);
            const now = Date.now() * 0.001;
            stars.forEach(s => {
                const a = s.alpha * (0.7 + 0.3 * Math.sin(now * s.speed * 60 + s.phase));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245, 240, 230, ${a})`;
                ctx.fill();
            });
            requestAnimationFrame(draw);
        }
        draw();

        window.addEventListener('resize', () => {
            W = starsCanvas.width  = window.innerWidth;
            H = starsCanvas.height = window.innerHeight;
        });
    }

    // ── Crystal cards: 3D perspective on hover ─────────────
    document.querySelectorAll('.memory-crystal').forEach(crystal => {
        crystal.addEventListener('mousemove', function (e) {
            const rect = crystal.getBoundingClientRect();
            const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
            const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
            crystal.querySelector('.crystal-inner').style.transform =
                `perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg)`;
        });
        crystal.addEventListener('mouseleave', function () {
            crystal.querySelector('.crystal-inner').style.transform = '';
        });
    });

    // ── Crystal glow ring pulses staggered ─────────────────
    document.querySelectorAll('.crystal-glow-ring').forEach((ring, i) => {
        ring.style.animationDelay = `${i * 1.3}s`;
    });

    // ── Projects stagger in ──────────────────────────────────
    const items = document.querySelectorAll('.proj-item');
    items.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
        el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    });

    const projIO = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                items.forEach(item => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
                projIO.disconnect();
            }
        });
    }, { threshold: 0.1 });

    const projSection = document.querySelector('.projects-section');
    if (projSection) projIO.observe(projSection);

    // ── Crystal stagger on scroll ───────────────────────────
    const crystalSection = document.querySelector('.crystals-section');
    const crystalEls = document.querySelectorAll('.memory-crystal');
    if (crystalSection) {
        const crystalIO = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    crystalEls.forEach((c, i) => {
                        c.style.animationDelay = `${0.1 + i * 0.15}s`;
                    });
                    crystalIO.disconnect();
                }
            });
        }, { threshold: 0.05 });
        crystalIO.observe(crystalSection);
    }
});
