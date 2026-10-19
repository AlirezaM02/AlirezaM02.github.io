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
const me = document.querySelector('.me');
const updateName = () => {
  document.body.classList.toggle('scrolled', window.scrollY > 40);
  if (window.scrollY <= 40) me.classList.remove('is-jelly');
};
window.addEventListener('scroll', updateName, { passive: true });
updateName();
me.addEventListener('click', () => {
  me.classList.remove('is-clicked');
  void me.offsetWidth;
  me.classList.add('is-clicked');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) setTimeout(() => me.classList.remove('is-clicked'), 750);
});
me.addEventListener('animationend', e => {
  if (e.animationName === 'me-color-sweep') me.classList.remove('is-clicked');
});
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const wobble = () => {
    if (!document.body.classList.contains('scrolled')) return;
    me.classList.remove('is-jelly');
    void me.offsetWidth;
    me.classList.add('is-jelly');
  };
  me.addEventListener('pointerenter', wobble);
  me.addEventListener('click', wobble);
  me.addEventListener('animationend', e => {
    if (e.animationName === 'me-jelly') me.classList.remove('is-jelly');
  });
  if (matchMedia('(hover: hover)').matches) {
    window.addEventListener('pointermove', e => {
      if (!document.body.classList.contains('scrolled')) return;
      const r = me.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const pull = dist < 90 ? (1 - dist / 90) * 3 : 0;
      me.style.setProperty('--px', `${(dx / (dist || 1)) * pull}px`);
      me.style.setProperty('--py', `${(dy / (dist || 1)) * pull}px`);
    }, { passive: true });
  }
}
