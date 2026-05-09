/* ============================================
   ABOUT PAGE — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ── Skill bars: animate in on scroll ──────────────────
    const fills = document.querySelectorAll('.skill-fill[data-w]');
    if (fills.length) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const w = e.target.getAttribute('data-w');
                    e.target.style.width = w + '%';
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.5 });
        fills.forEach(el => io.observe(el));
    }

    // ── Gallery stagger in ──────────────────────────────────
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(14px)';
        el.style.transition = `opacity 0.45s ease ${i * 0.07}s, transform 0.45s ease ${i * 0.07}s`;
    });

    const galleryIO = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                items.forEach(item => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
                galleryIO.disconnect();
            }
        });
    }, { threshold: 0.1 });

    const section = document.querySelector('.gallery-section');
    if (section) galleryIO.observe(section);

    // ── Narrative columns stagger ────────────────────────────
    const cols = document.querySelectorAll('.narrative-col');
    const colIO = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                cols.forEach((col, i) => {
                    col.style.animationDelay = `${0.1 + i * 0.15}s`;
                });
                colIO.disconnect();
            }
        });
    }, { threshold: 0.05 });

    const narrativeSection = document.querySelector('.narrative-section');
    if (narrativeSection) colIO.observe(narrativeSection);
});
