/* ============================================
   PIANO PAGE — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ── Gallery items: scroll-triggered fade-in ─────────────────
    const pgItems = document.querySelectorAll('.pg-item');
    const galleryIO = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                pgItems.forEach((item, i) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(14px)';
                    item.style.transition = `opacity 0.45s ease ${i * 0.07}s, transform 0.45s ease ${i * 0.07}s`;
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                });
                galleryIO.disconnect();
            }
        });
    }, { threshold: 0.1 });

    const gallerySection = document.querySelector('.piano-gallery-section');
    if (gallerySection) galleryIO.observe(gallerySection);

    // ── Sheet cards: hover lift already via CSS, add subtle tilt ─
    document.querySelectorAll('.sheet-card').forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
            const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
            card.style.transform =
                `perspective(800px) rotateY(${dx * 3}deg) rotateX(${-dy * 2}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });
});
