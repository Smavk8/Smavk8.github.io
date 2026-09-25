/* Android-aligned web shell: mirror available report data and keep device-only controls honest. */
(function () {
  const byteText = value => {
    const bytes = Math.max(0, Number(value) || 0);
    const lang = window.i18n?.currentLang || 'ru';
    const units = lang === 'en' ? ['B', 'KB', 'MB', 'GB', 'TB'] : ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];
    let size = bytes;
    let unit = 0;
    while (size >= 1024 && unit < units.length - 1) {
      size /= 1024;
      unit += 1;
    }
    return `${size.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
  };

  let latestOwnerAudit = null;
  let selectedHomeSlot = 0;
  let amoledEnabled = false;

  const localeCopy = {
    ru: { locked: 'Войдите как владелец, чтобы увидеть SIM-профили, переданные Android-клиентами.', empty: 'В доступных отчётах пока нет данных для этого SIM-слота.', device: 'Устройство', slot: 'Слот', carrier: 'Оператор', type: 'Тип', usage: 'Сотовый расход сегодня', state: 'Состояние', active: 'Активна', inactive: 'Не активна', reported: 'Есть отчёт', login: 'Войти как владелец', radioUnavailable: 'Параметры радиосигнала не передаются в веб-аудит.', sim: 'SIM', esim: 'eSIM' },
    uz: { locked: 'Android mijozlari yuborgan SIM profillarini ko‘rish uchun egasi sifatida kiring.', empty: 'Mavjud hisobotlarda bu SIM uyasi uchun ma’lumot yo‘q.', device: 'Qurilma', slot: 'Slot', carrier: 'Operator', type: 'Turi', usage: 'Bugungi mobil sarf', state: 'Holati', active: 'Faol', inactive: 'Faol emas', reported: 'Hisobot bor', login: 'Egasi sifatida kirish', radioUnavailable: 'Radio signali parametrlari veb auditga yuborilmaydi.', sim: 'SIM', esim: 'eSIM' },
    en: { locked: 'Sign in as the owner to view SIM profiles sent by Android clients.', empty: 'No data for this SIM slot is present in the available reports.', device: 'Device', slot: 'Slot', carrier: 'Carrier', type: 'Type', usage: 'Cellular use today', state: 'State', active: 'Active', inactive: 'Inactive', reported: 'Report received', login: 'Owner sign-in', radioUnavailable: 'Radio signal measurements are not sent to the web audit.', sim: 'SIM', esim: 'eSIM' }
  };

  function profilesForSlot(slot) {
    const users = Array.isArray(latestOwnerAudit?.users) ? latestOwnerAudit.users : [];
    return users.flatMap(user => (Array.isArray(user.simProfiles) ? user.simProfiles : [])
      .filter(profile => Number(profile.slot) === slot + 1)
      .map(profile => ({ user, profile })));
  }

  function addDetailField(grid, label, value) {
    const field = document.createElement('div');
    field.className = 'android-sim-detail-field';
    const labelNode = document.createElement('small');
    labelNode.textContent = label;
    const valueNode = document.createElement('strong');
    valueNode.textContent = value;
    field.append(labelNode, valueNode);
    grid.appendChild(field);
  }

  function renderHomeSimScreen() {
    const lang = window.i18n?.currentLang || 'ru';
    const copy = localeCopy[lang] || localeCopy.ru;
    const title = document.getElementById('android-home-title');
    const content = document.getElementById('android-home-sim-content');
    if (!content) return;
    content.setAttribute('aria-labelledby', `android-home-sim-tab-${selectedHomeSlot + 1}`);

    document.querySelectorAll('[data-home-sim-slot]').forEach(button => {
      const slot = Number(button.dataset.homeSimSlot);
      const rows = profilesForSlot(slot);
      const active = rows.some(({ profile }) => profile.active === true);
      button.classList.toggle('is-selected', slot === selectedHomeSlot);
      button.setAttribute('aria-selected', String(slot === selectedHomeSlot));
      const state = button.querySelector('[data-home-slot-status]');
      if (state) state.textContent = !latestOwnerAudit ? copy.login : rows.length ? (active ? copy.active : copy.reported) : copy.empty;
      const marker = button.querySelector('.android-home-slot-marker');
      if (marker) marker.classList.toggle('is-active', active);
    });

    if (title) title.textContent = `${copy.sim} ${selectedHomeSlot + 1}`;
    content.replaceChildren();
    const rows = profilesForSlot(selectedHomeSlot);
    if (!latestOwnerAudit || !rows.length) {
      const empty = document.createElement('div');
      empty.className = 'android-home-empty';
      const message = document.createElement('p');
      message.textContent = latestOwnerAudit ? copy.empty : copy.locked;
      empty.appendChild(message);
      if (!latestOwnerAudit) {
        const login = document.createElement('button');
        login.type = 'button';
        login.className = 'android-text-action';
        login.textContent = copy.login;
        login.addEventListener('click', () => window.requestAdminConsole?.());
        empty.appendChild(login);
      }
      content.appendChild(empty);
      return;
    }

    rows.forEach(({ user, profile }) => {
      const card = document.createElement('article');
      card.className = 'android-home-profile';
      const header = document.createElement('header');
      header.className = 'android-home-profile-title';
      const profileIdentity = document.createElement('div');
      profileIdentity.className = 'android-home-profile-carrier';
      const slotBadge = document.createElement('span');
      slotBadge.className = 'android-home-profile-slot';
      slotBadge.textContent = String(selectedHomeSlot + 1);
      const carrier = document.createElement('strong');
      carrier.textContent = profile.carrier || `${copy.sim} ${selectedHomeSlot + 1}`;
      profileIdentity.append(slotBadge, carrier);
      const profileState = document.createElement('span');
      profileState.className = 'android-home-profile-state';
      profileState.textContent = profile.active === true ? copy.active : copy.inactive;
      header.append(profileIdentity, profileState);
      card.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'android-sim-detail-grid';
      addDetailField(grid, copy.type, profile.type === 'esim' ? copy.esim : copy.sim);
      addDetailField(grid, copy.usage, byteText(profile.todayBytes));
      addDetailField(grid, copy.state, profile.active === true ? copy.active : copy.inactive);
      card.appendChild(grid);

      const device = document.createElement('p');
      device.className = 'android-home-device-label';
      device.textContent = `${copy.device}: ${user.model || user.platform || 'Android'}`;
      card.appendChild(device);

      const radioNote = document.createElement('p');
      radioNote.className = 'android-sim-radio-note';
      radioNote.textContent = copy.radioUnavailable;
      card.appendChild(radioNote);
      content.appendChild(card);
    });
  }

  function renderSimProfiles(data) {
    const state = document.getElementById('android-sim-profiles-state');
    const list = document.getElementById('android-sim-profiles-list');
    if (!state || !list) return;
    list.replaceChildren();
    const lang = window.i18n?.currentLang || 'ru';
    const copy = localeCopy[lang] || localeCopy.ru;
    const users = Array.isArray(data?.users) ? data.users : [];
    const rows = users.flatMap(user => (Array.isArray(user.simProfiles) ? user.simProfiles : []).map(profile => ({ user, profile })));
    if (!data) {
      state.hidden = false;
      state.textContent = copy.locked;
      list.hidden = true;
      return;
    }
    if (!rows.length) {
      state.hidden = false;
      state.textContent = copy.empty;
      list.hidden = true;
      return;
    }
    state.hidden = true;
    list.hidden = false;
    const wrap = document.createElement('div');
    wrap.className = 'android-sim-table-scroll';
    const table = document.createElement('table');
    table.className = 'android-sim-table';
    const head = document.createElement('thead');
    const headerRow = document.createElement('tr');
    [copy.device, copy.slot, copy.carrier, copy.type, copy.usage, copy.state].forEach(label => {
      const cell = document.createElement('th');
      cell.scope = 'col';
      cell.textContent = label;
      headerRow.appendChild(cell);
    });
    head.appendChild(headerRow);
    table.appendChild(head);
    const body = document.createElement('tbody');
    rows.forEach(({ user, profile }) => {
      const row = document.createElement('tr');
      const values = [
        user.testerName || user.model || user.userId || '—',
        Number(profile.slot) > 0 ? String(Math.round(Number(profile.slot))) : '—',
        profile.carrier || '—',
        profile.type === 'esim' ? copy.esim : copy.sim,
        byteText(profile.todayBytes),
        profile.active === true ? copy.active : copy.inactive
      ];
      values.forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });
      body.appendChild(row);
    });
    table.appendChild(body);
    wrap.appendChild(table);
    list.appendChild(wrap);
  }

  function applyScale(value) {
    const scale = Math.min(1.15, Math.max(0.9, Number(value) / 100 || 1));
    document.documentElement.style.setProperty('--web-scale', String(scale));
    const output = document.getElementById('android-ui-scale-output');
    if (output) output.value = `${Math.round(scale * 100)}%`;
  }

  function applyReducedMotion(enabled) {
    document.documentElement.classList.toggle('motion-reduced', enabled);
  }

  function applyAmoled(enabled) {
    document.body.classList.toggle('amoled-mode', Boolean(enabled && !document.body.classList.contains('theme-light')));
  }

  window.copySupportNumber = async function (button) {
    const value = String(button?.dataset.copyValue || '');
    if (!value) return;
    let copied = false;
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
    } catch (_) {
      const field = document.createElement('textarea');
      field.value = value;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      try { copied = document.execCommand('copy'); } catch (_) {}
      field.remove();
    }
    const status = document.getElementById('android-support-copy-status');
    const message = copied
      ? window.i18n?.t('copied_toast') || 'Copied'
      : window.i18n?.t('support_copy_failed') || 'Could not copy the number.';
    if (status) status.textContent = message;
    window.showToast?.(message);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const scaleControl = document.getElementById('android-ui-scale');
    const motionControl = document.getElementById('android-reduced-motion');
    const amoledControl = document.getElementById('android-amoled-mode');
    let savedScale = 100;
    let savedMotion = null;
    try {
      savedScale = Number(localStorage.getItem('xylen_web_scale_v1')) || 100;
      savedMotion = localStorage.getItem('xylen_web_reduce_motion_v1');
      amoledEnabled = localStorage.getItem('xylen_web_amoled_v1') === 'true';
    } catch (_) {}

    const overviewContainer = document.querySelector('#page-overview > .container');
    const aboutContainer = document.querySelector('#page-about > .container');
    if (overviewContainer && aboutContainer) {
      const webSections = Array.from(overviewContainer.children)
        .filter(node => node.tagName === 'SECTION' && node.matches('.motion-carousel-section, .quick-connect-strip'));
      if (webSections.length) {
        const archive = document.createElement('div');
        archive.className = 'android-about-archive';
        webSections.forEach(section => archive.appendChild(section));
        aboutContainer.appendChild(archive);
      }
    }

    if (scaleControl) {
      scaleControl.value = String(savedScale);
      applyScale(savedScale);
      scaleControl.addEventListener('input', () => {
        applyScale(scaleControl.value);
        try { localStorage.setItem('xylen_web_scale_v1', String(scaleControl.value)); } catch (_) {}
      });
    }
    const reduced = savedMotion === null
      ? Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
      : savedMotion === 'true';
    if (motionControl) {
      motionControl.checked = reduced;
      motionControl.addEventListener('change', () => {
        applyReducedMotion(motionControl.checked);
        try { localStorage.setItem('xylen_web_reduce_motion_v1', String(motionControl.checked)); } catch (_) {}
      });
    }
    applyReducedMotion(reduced);
    if (amoledControl) {
      amoledControl.checked = amoledEnabled;
      amoledControl.addEventListener('change', () => {
        amoledEnabled = amoledControl.checked;
        applyAmoled(amoledEnabled);
        try { localStorage.setItem('xylen_web_amoled_v1', String(amoledEnabled)); } catch (_) {}
      });
    }
    applyAmoled(amoledEnabled);
    document.querySelectorAll('[data-home-sim-slot]').forEach(button => {
      button.addEventListener('click', () => {
        selectedHomeSlot = Number(button.dataset.homeSimSlot) || 0;
        renderHomeSimScreen();
      });
    });
    renderHomeSimScreen();
    renderSimProfiles(latestOwnerAudit);
    window.addEventListener('xylen:owner-audit-sync', event => {
      latestOwnerAudit = event.detail || null;
      renderHomeSimScreen();
      renderSimProfiles(latestOwnerAudit);
    });
    window.addEventListener('xylen:language-changed', () => {
      renderHomeSimScreen();
      renderSimProfiles(latestOwnerAudit);
    });
    const themeObserver = new MutationObserver(() => {
      const icon = document.getElementById('settings-theme-icon');
      if (icon) icon.textContent = document.body.classList.contains('theme-light') ? '☀' : '☾';
      applyAmoled(amoledEnabled);
    });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  });
})();
