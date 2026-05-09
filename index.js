/* ============================================
   INDEX PAGE — INTERACTIONS
   The Score: particles, mouse parallax, scroll reveals
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ── Ambient gold particle canvas ─────────────────────
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W = canvas.width  = window.innerWidth;
        let H = canvas.height = window.innerHeight;
        const particles = [];
        const COUNT = 55;

        function rand(min, max) { return Math.random() * (max - min) + min; }

        class Particle {
            constructor() { this.reset(true); }
            reset(initial) {
                this.x     = rand(0, W);
                this.y     = initial ? rand(0, H) : H + 10;
                this.r     = rand(1, 3.5);
                this.vx    = rand(-0.2, 0.2);
                this.vy    = rand(-0.4, -1.2);
                this.alpha = rand(0.15, 0.5);
                this.drift = rand(-0.3, 0.3);
                this.hue   = rand(38, 52);  // gold range
                this.sat   = rand(60, 90);
                this.lit   = rand(55, 72);
            }
            update() {
                this.x += this.vx + Math.sin(Date.now() * 0.0008 + this.drift * 10) * 0.15;
                this.y += this.vy;
                this.alpha += rand(-0.003, 0.003);
                this.alpha = Math.max(0.05, Math.min(0.6, this.alpha));
                if (this.y < -20) this.reset(false);
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle =
                    `hsla(${this.hue},${this.sat}%,${this.lit}%,${this.alpha})`;
                ctx.fill();
                // soft glow
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
                ctx.fillStyle =
                    `hsla(${this.hue},${this.sat}%,${this.lit}%,${this.alpha * 0.15})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < COUNT; i++) particles.push(new Particle());

        function loop() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(loop);
        }
        loop();

        window.addEventListener('resize', () => {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        });
    }

    // ── Mouse parallax on corner characters ───────────────
    const corners = document.querySelectorAll('.corner-char');
    document.addEventListener('mousemove', (e) => {
        const dx = (e.clientX / window.innerWidth  - 0.5) * 2;
        const dy = (e.clientY / window.innerHeight - 0.5) * 2;
        corners.forEach((el, i) => {
            const speed = (i + 1) * 8;
            el.style.transform =
                `translateY(${-7 + dy * -speed * 0.5}px) translateX(${dx * speed}px)`;
        });
    });

    // ── Scroll-triggered card reveals ─────────────────────
    const cards = document.querySelectorAll('.score-card');
    if (cards.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach((card, i) => {
            card.style.animationPlayState = 'paused';
            io.observe(card);
        });
    }

    // ── Cards stagger in on scroll ───────────────────────
    const scrollCards = document.querySelectorAll('.score-card');
    if (scrollCards.length) {
        const scrollIO = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scrollCards.forEach((c, i) => {
                        c.style.animationDelay = `${0.3 + i * 0.2}s`;
                        c.style.opacity = '1';
                        c.style.transform = 'translateY(0)';
                    });
                    scrollIO.disconnect();
                }
            });
        }, { threshold: 0.05 });
        scrollIO.observe(document.querySelector('.three-cards'));
    }
});
