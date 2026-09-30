/**
 * Xylen Private Gatekeeper
 * Restricts access to prototype to only authorized links with a secret key (?key=...)
 * or manual key entry.
 */
(() => {
  const VALID_KEYS = ['xylen', 'xylen2026', 'xylen-team', 'preview'];
  const STORAGE_KEY = 'xylen_private_access_authorized';

  // Normalize key string
  const clean = val => (val || '').toLowerCase().trim();

  // 1. Check URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const paramKey = clean(urlParams.get('key') || urlParams.get('access') || urlParams.get('pass'));

  function grantAccess() {
    try { localStorage.setItem(STORAGE_KEY, 'granted'); } catch (e) {}
    document.documentElement.classList.remove('access-locked');
    document.documentElement.classList.add('access-granted');
    const overlay = document.getElementById('private-gatekeeper-overlay');
    if (overlay) overlay.style.display = 'none';

    // Clean sensitive parameter from URL bar for clean UX
    if (paramKey && (urlParams.has('key') || urlParams.has('access') || urlParams.has('pass'))) {
      urlParams.delete('key');
      urlParams.delete('access');
      urlParams.delete('pass');
      const searchStr = urlParams.toString();
      const newUrl = window.location.pathname + (searchStr ? '?' + searchStr : '') + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
    }
  }

  function lockAccess() {
    document.documentElement.classList.remove('access-granted');
    document.documentElement.classList.add('access-locked');
    const overlay = document.getElementById('private-gatekeeper-overlay');
    if (overlay) overlay.style.display = 'flex';
  }

  // Check if valid key is passed in URL
  if (paramKey && VALID_KEYS.includes(paramKey)) {
    grantAccess();
  } else {
    // Check if previously authorized in this browser
    let isAuthorized = false;
    try {
      isAuthorized = localStorage.getItem(STORAGE_KEY) === 'granted';
    } catch (e) {}

    if (isAuthorized) {
      grantAccess();
    } else {
      lockAccess();
    }
  }

  // Setup form interactivity once DOM is ready
  function initGatekeeperUI() {
    const form = document.getElementById('gatekeeper-form');
    const input = document.getElementById('gatekeeper-key-input');
    const errorMsg = document.getElementById('gatekeeper-error');

    if (!form || !input) return;

    form.addEventListener('submit', event => {
      event.preventDefault();
      const enteredKey = clean(input.value);

      if (VALID_KEYS.includes(enteredKey)) {
        if (errorMsg) errorMsg.classList.remove('show');
        grantAccess();
      } else {
        if (errorMsg) {
          errorMsg.textContent = 'Неверный ключ доступа. Попробуйте снова.';
          errorMsg.classList.add('show');
        }
        input.focus();
        input.select();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGatekeeperUI);
  } else {
    initGatekeeperUI();
  }

  // Global helper for relocking/testing if needed
  window.xylenRelock = function() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    window.location.reload();
  };
})();
