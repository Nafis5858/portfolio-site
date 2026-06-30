document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const pageInfo = document.getElementById('page-info');
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark-mode', isDark);
        document.body.classList.toggle('light-mode', !isDark);

        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', String(isDark));
            themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }

        localStorage.setItem('theme', theme);
    }

    function updatePageInfo() {
        if (!pageInfo) return;
        const pageUrl = window.location.href;
        const modifiedDate = document.lastModified ? new Date(document.lastModified) : null;
        const formattedDate = modifiedDate ? modifiedDate.toLocaleString() : 'Unknown';
        pageInfo.textContent = `Page URL: ${pageUrl} · Last updated: ${formattedDate}`;
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    }

    applyTheme(initialTheme);
    updatePageInfo();
});
