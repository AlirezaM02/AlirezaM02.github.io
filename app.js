'use strict';
const themeButton = document.querySelector('#theme');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#101d2c' : '#dbe9f6';
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
}
try {
  const stored = localStorage.getItem('am-editorial-theme');
  if (stored === 'dark' || stored === 'light') setTheme(stored);
} catch (_) {}
themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  try { localStorage.setItem('am-editorial-theme', next); } catch (_) {}
});
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('alirezamirzaei68@gmail.com');
    status.textContent = 'Email copied.';
  } catch (_) {
    status.textContent = 'Select and copy the email address above; clipboard access is unavailable.';
  }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
