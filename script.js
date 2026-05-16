/* ============================================
   SHARED SCRIPT — Core interactions
   Particle canvas + basic scroll effects
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ── Ambient gold particle canvas ─────────────────────
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W = canvas.width  = window.innerWidth;
        let H = canvas.height = window.innerHeight;
        const particles = [];
        const COUNT = 40;

        function rand(min, max) { return Math.random() * (max - min) + min; }

        class Particle {
            constructor() { this.reset(true); }
            reset(initial) {
                this.x    = rand(0, W);
                this.y    = initial ? rand(0, H) : H + 10;
                this.r    = rand(1, 3);
                this.vx   = rand(-0.2, 0.2);
                this.vy   = rand(-0.4, -1.1);
                this.alpha = rand(0.15, 0.5);
                this.drift = rand(-0.3, 0.3);
                this.hue  = rand(38, 52);
                this.sat  = rand(60, 90);
                this.lit  = rand(55, 72);
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
                ctx.fillStyle = `hsla(${this.hue},${this.sat}%,${this.lit}%,${this.alpha})`;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue},${this.sat}%,${this.lit}%,${this.alpha * 0.15})`;
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

    // ── Theme toggle ────────────────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const themeKey = 'site-theme';

    function syncThemeToggle() {
        if (!themeToggle) return;
        const isDark = document.documentElement.classList.contains('dark-theme');
        themeToggle.setAttribute('aria-pressed', String(isDark));
        themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    themeToggle?.addEventListener('click', () => {
        const currentlyDark = document.documentElement.classList.contains('dark-theme');
        document.documentElement.classList.toggle('dark-theme', !currentlyDark);
        try {
            localStorage.setItem(themeKey, currentlyDark ? 'light' : 'dark');
        } catch (_e) { /* ignore */ }
        syncThemeToggle();
    });

    syncThemeToggle();

    // ── Nav scroll: tighten on scroll ─────────────────────────
    const nav = document.querySelector('.site-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 80);
        }, { passive: true });

        const navToggle = nav.querySelector('.nav-hamburger');
        const navLinks = nav.querySelectorAll('.nav-links a');

        if (navToggle) {
            navToggle.addEventListener('click', () => {
                const isOpen = nav.classList.contains('nav-open');
                navToggle.setAttribute('aria-expanded', String(isOpen));
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-open');
                if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ── Smooth anchor links ──────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
