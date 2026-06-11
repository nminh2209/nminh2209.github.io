/* ============================================
   GITHUB STATS — live fetch (profile README sources)
   streak-stats.demolab.com JSON + GitHub REST API
   ============================================ */

(function () {
    const USER = 'nminh2209';
    const STREAK_URL = `https://streak-stats.demolab.com/?user=${USER}&type=json`;
    const USER_URL = `https://api.github.com/users/${USER}`;
    const REPOS_URL = `https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`;
    const REFRESH_MS = 30 * 60 * 1000;

    const STATS_WIDGET =
        'https://github-readme-stats-eight-theta.vercel.app/api' +
        `?username=${USER}&layout=compact&theme=dark&border_radius=10&cache_seconds=7200`;
    const STREAK_WIDGET =
        'https://streak-stats.demolab.com/' +
        `?user=${USER}&theme=dark&hide_border=true`;

    function fmt(n) {
        return Number(n).toLocaleString('en-US');
    }

    function fmtShort(n) {
        const num = Number(n);
        if (num >= 1000) return `${Math.floor(num / 100) * 100}+`;
        return fmt(num);
    }

    async function fetchJson(url) {
        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(`${url} → ${res.status}`);
        return res.json();
    }

    async function loadStats() {
        const [streak, user, repos] = await Promise.all([
            fetchJson(STREAK_URL),
            fetchJson(USER_URL),
            fetchJson(REPOS_URL),
        ]);

        const stars = (Array.isArray(repos) ? repos : [])
            .filter((r) => !r.fork)
            .reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

        return {
            contributions: streak.totalContributions ?? 0,
            streak: streak.currentStreak?.length ?? 0,
            repos: user.public_repos ?? 0,
            stars,
        };
    }

    function setText(key, value) {
        document.querySelectorAll(`[data-gh="${key}"]`).forEach((el) => {
            el.textContent = value;
        });
    }

    function applyStats(stats) {
        const { contributions, streak, repos, stars } = stats;

        setText('contributions', fmt(contributions));
        setText('contributions-short', fmtShort(contributions));
        setText('streak', fmt(streak));
        setText('repos', fmt(repos));
        setText('stars', fmt(stars));

        document.querySelectorAll('[data-gh-label]').forEach((el) => {
            el.textContent =
                `${fmt(contributions)} contributions · live from GitHub`;
        });

        document.querySelectorAll('[data-gh-widget="stats"]').forEach((img) => {
            img.alt = `nminh2209 GitHub stats — ${fmt(stars)} stars, ${fmt(contributions)} contributions`;
        });
        document.querySelectorAll('[data-gh-widget="streak"]').forEach((img) => {
            img.alt =
                `nminh2209 contribution streak — ${fmt(contributions)} total, ${fmt(streak)}-day streak`;
        });
    }

    function refreshWidgetImages() {
        const bust = `_=${Date.now()}`;
        document.querySelectorAll('[data-gh-widget="stats"]').forEach((img) => {
            img.src = `${STATS_WIDGET}&${bust}`;
        });
        document.querySelectorAll('[data-gh-widget="streak"]').forEach((img) => {
            img.src = `${STREAK_WIDGET}&${bust}`;
        });
    }

    async function refresh() {
        try {
            const stats = await loadStats();
            applyStats(stats);
            refreshWidgetImages();
        } catch (err) {
            console.warn('GitHub stats refresh failed:', err);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (!document.querySelector('[data-gh], [data-gh-label], [data-gh-widget]')) return;

        refresh();
        setInterval(refresh, REFRESH_MS);
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'visible') refresh();
        });
    });
})();
