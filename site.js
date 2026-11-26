// You don't need to edit this file.
(function () {
  var root = document.documentElement;

  // Light/dark mode: use the visitor's last choice, or their computer's setting
  try {
    root.dataset.theme = localStorage.getItem('theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (e) {}

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        try { localStorage.setItem('theme', next); } catch (e) {}
      });
    }

    // Tell screen readers which page is open
    var active = document.querySelector('.nav a.active');
    if (active) active.setAttribute('aria-current', 'page');

    // "Abstract" buttons open and close the abstract inside the same paper
    document.querySelectorAll('.abstract-btn').forEach(function (btn, i) {
      var paper = btn.closest('.paper');
      var panel = paper && paper.querySelector('.abstract');
      if (!panel) { btn.remove(); return; }
      panel.id = panel.id || 'abstract-' + (i + 1);
      btn.setAttribute('aria-controls', panel.id);
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function () {
        var open = panel.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  });
})();
