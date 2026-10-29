/* Experts Handyman Service — site behaviour (vanilla JS, no dependencies) */
(function () {
  'use strict';

  /* ---------------- Mobile navigation ---------------- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('primary-nav');
  var scrim = document.querySelector('[data-scrim]');
  var closeBtn = document.querySelector('[data-nav-close]');

  function setNav(open) {
    if (!nav || !toggle) return;
    nav.setAttribute('data-open', open ? 'true' : 'false');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (scrim) scrim.setAttribute('data-open', open ? 'true' : 'false');
    document.documentElement.style.overflow = open && window.innerWidth < 1024 ? 'hidden' : '';
    if (open) {
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    }
  }

  if (toggle) toggle.addEventListener('click', function () {
    setNav(nav.getAttribute('data-open') !== 'true');
  });
  if (closeBtn) closeBtn.addEventListener('click', function () { setNav(false); toggle.focus(); });
  if (scrim) scrim.addEventListener('click', function () { setNav(false); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.getAttribute('data-open') === 'true') {
      setNav(false);
      if (toggle) toggle.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) setNav(false);
  });

  /* ---------------- Forms: _page, confirmation, fetch submit ---------------- */
  var ENDPOINT = 'https://vision.leadrai.com/api/forms/34623bdd0f65986e6d871f46fa251f34';

  // Populate the hidden _page field with the current URL on load.
  Array.prototype.forEach.call(document.querySelectorAll('input[name="_page"]'), function (input) {
    input.value = window.location.href;
  });

  function showConfirmation(form) {
    var alertBox = form.querySelector('[data-form-alert]');
    if (alertBox) {
      alertBox.hidden = false;
      alertBox.setAttribute('tabindex', '-1');
      alertBox.focus({ preventScroll: true });
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Plain HTML submission returns with ?submitted=1
  if (/[?&]submitted=1(&|$)/.test(window.location.search)) {
    var forms = document.querySelectorAll('form[data-leadr]');
    if (forms.length) showConfirmation(forms[0]);
  }

  Array.prototype.forEach.call(document.querySelectorAll('form[data-leadr]'), function (form) {
    form.addEventListener('submit', function (e) {
      if (!window.fetch || !form.reportValidity) return; // let the plain POST happen
      if (!form.reportValidity()) { e.preventDefault(); return; }
      e.preventDefault();

      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      var data = {};
      var fd = new FormData(form);
      fd.forEach(function (value, key) {
        if (data[key] !== undefined) { data[key] = data[key] + ', ' + value; }
        else { data[key] = value; }
      });
      data._page = window.location.href;

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (res) {
        return res.json().catch(function () { return { ok: res.ok }; });
      }).then(function (json) {
        if (json && json.ok) {
          form.reset();
          Array.prototype.forEach.call(form.querySelectorAll('input[name="_page"]'), function (i) {
            i.value = window.location.href;
          });
          showConfirmation(form);
          if (btn) { btn.disabled = false; btn.textContent = label; }
        } else {
          if (btn) { btn.disabled = false; btn.textContent = label; }
          HTMLFormElement.prototype.submit.call(form);
        }
      }).catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = label; }
        HTMLFormElement.prototype.submit.call(form);
      });
    });
  });

  /* ---------------- Scroll reveal ---------------- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
  }

  /* ---------------- Ticker: duplicate content for a seamless loop ---------------- */
  var track = document.querySelector('[data-ticker]');
  if (track && !reduce) {
    track.innerHTML = track.innerHTML + track.innerHTML;
  }

  /* ---------------- Current year ---------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
