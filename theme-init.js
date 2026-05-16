(() => {
    try {
        const stored = localStorage.getItem('site-theme');
        const dark = stored !== 'light';
        document.documentElement.classList.toggle('dark-theme', dark);
    } catch (e) { /* offline / privacy mode */ }
})();
