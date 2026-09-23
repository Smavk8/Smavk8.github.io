/**
 * Xylen Sim Platform - Web Controller & SPA Router
 * Manages multi-page navigation, separated App vs OS versions,
 * in-depth SIM telemetry (IMSI, ICCID, MSISDN, Cell Tower),
 * daily calendar consumption history, and ultra-low-bandwidth live stream.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements: Containers
  const androidHeroContainer = document.getElementById('android-hero-card');
  const iosHeroContainer = document.getElementById('ios-hero-card');
  const versionListContainer = document.getElementById('version-list-container');
  const devicesContainer = document.getElementById('devices-container');
  const activityFeedContainer = document.getElementById('activity-feed-container');
  const activityCounterBadge = document.getElementById('activity-counter-badge');
  const calendarDaySummary = document.getElementById('calendar-day-summary');
  const calendarDatePicker = document.getElementById('calendar-date-picker');
  
  // Live Stream Elements
  const liveTodayMbDisplay = document.getElementById('live-today-mb');
  const liveSpeedDisplay = document.getElementById('live-current-speed');
  const liveDeviceName = document.getElementById('live-device-name');
  const liveSimSlot = document.getElementById('live-sim-slot');

  // Search & Filters
  const searchInput = document.getElementById('search-versions');
  const platformTabButtons = document.querySelectorAll('.tab-btn[data-platform]');
  const actFilterButtons = document.querySelectorAll('.tab-btn[data-act-filter]');
  const dayPillButtons = document.querySelectorAll('.day-pill-btn[data-offset]');
  
  // Modals & Navigation
  const navPageButtons = document.querySelectorAll('.nav-page-btn[data-page]');
  const pageSections = document.querySelectorAll('.page-section');
  const qrModal = document.getElementById('qr-modal');
  const qrTitle = document.getElementById('qr-modal-title');
  const qrSubtitle = document.getElementById('qr-modal-subtitle');
  const qrContainer = document.getElementById('qrcode-canvas');
  const qrUrlDisplay = document.getElementById('qr-url-text');
  const qrCopyBtn = document.getElementById('qr-copy-btn');
  const qrDirectLink = document.getElementById('qr-direct-link');
  const btnExportAuditCsv = document.getElementById('btn-export-audit-csv');
  const toastElement = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  let currentPlatformFilter = 'all';
  let currentActFilter = 'all';
  let searchQuery = '';
  let activeQrUrl = '';
  let selectedDateYMD = new Date().toISOString().split('T')[0];

  // ==========================================================================
  // SPA PAGE SWITCHER
  // ==========================================================================
  window.switchPage = function(pageId) {
    pageSections.forEach(section => {
      section.classList.toggle('active', section.id === pageId);
    });

    navPageButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  navPageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      window.switchPage(btn.dataset.page);
    });
  });

  // ==========================================================================
  // TOAST & CLIPBOARD
  // ==========================================================================
  function showToast(msg) {
    toastMessage.textContent = msg;
    toastElement.classList.add('show');
    setTimeout(() => {
      toastElement.classList.remove('show');
    }, 3200);
  }

  window.copyText = function(text, successMsg = 'Скопировано в буфер обмена!') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  };

  function fallbackCopy(text, successMsg) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (_) {
      prompt('Скопируйте вручную:', text);
    }
    document.body.removeChild(textarea);
  }

  // ==========================================================================
  // QR CODE MODAL
  // ==========================================================================
  window.openQrModal = function(title, subtitle, url) {
    activeQrUrl = url;
    qrTitle.textContent = title;
    qrSubtitle.textContent = subtitle;
    qrUrlDisplay.textContent = url;
    qrDirectLink.href = url;
    qrContainer.innerHTML = '';

    if (typeof QRCode !== 'undefined') {
      new QRCode(qrContainer, {
        text: url,
        width: 190,
        height: 190,
        colorDark: '#0B0E14',
        colorLight: '#FFFFFF',
        correctLevel: QRCode.CorrectLevel.M
      });
    } else {
      qrContainer.innerHTML = `<div style="padding:20px;color:#111;"><strong>${url}</strong></div>`;
    }

    qrModal.classList.add('active');
  };

  document.querySelectorAll('.modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
    }
  });

  if (qrCopyBtn) {
    qrCopyBtn.addEventListener('click', () => {
      if (activeQrUrl) copyText(activeQrUrl, 'Прямая ссылка скопирована!');
    });
  }

  // ==========================================================================
  // HERO CARDS: SEPARATED APP VERSION & OS PLATFORM
  // ==========================================================================
  function renderHeroCards() {
    const android = window.versionStorage.getLatest('android');
    const ios = window.versionStorage.getLatest('ios');

    // Android Card
    if (android && androidHeroContainer) {
      androidHeroContainer.innerHTML = `
        <div>
          <div class="card-header">
            <div class="platform-badge-group">
              <div class="platform-icon-circle">
                <img src="assets/icon-android.svg" alt="Android">
              </div>
              <div class="platform-titles">
                <h3>Google Android</h3>
                <span class="os-compat-badge">Поддержка: ${android.osRequirement}</span>
              </div>
            </div>
            <div class="card-status-badge">
              <span class="pulse-dot green"></span> Актуально
            </div>
          </div>

          <div class="card-metrics">
            <div class="metric-item">
              <span class="metric-label">Версия ПО</span>
              <span class="metric-val" style="color:var(--cyan-electric);">${android.appVersion}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Сборка</span>
              <span class="metric-val">Build ${android.buildNumber}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Размер</span>
              <span class="metric-val">${android.fileSize}</span>
            </div>
          </div>

          <ul class="card-highlights">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Постоянный сейф AppVaultBackupManager (AES-256)</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Вращающийся одометр цифр RollingOdometer</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Векторный график скорости LiveSpeedGraph</span>
            </li>
          </ul>
        </div>

        <div class="card-actions">
          <div class="card-btn-row">
            <a href="${android.downloadUrl}" class="btn btn-primary" download>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Скачать APK (${android.fileSize})
            </a>
            <button class="btn btn-secondary" onclick="openQrModal('Установка Android APK', 'Отсканируйте камерой смартфона для скачивания файла', '${android.downloadUrl}')" title="Показать QR-код">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              QR
            </button>
          </div>
          <button class="btn btn-outline btn-sm" onclick="copyText('${android.downloadUrl}', 'Прямая ссылка на APK скопирована!')">
            Копировать прямую ссылку на APK
          </button>
        </div>
      `;
    }

    // iOS Card
    if (ios && iosHeroContainer) {
      iosHeroContainer.innerHTML = `
        <div>
          <div class="card-header">
            <div class="platform-badge-group">
              <div class="platform-icon-circle">
                <img src="assets/icon-ios.svg" alt="iOS">
              </div>
              <div class="platform-titles">
                <h3>Apple iOS Native</h3>
                <span class="os-compat-badge">Поддержка: ${ios.osRequirement}</span>
              </div>
            </div>
            <div class="card-status-badge">
              <span class="pulse-dot"></span> Свежий релиз
            </div>
          </div>

          <div class="card-metrics">
            <div class="metric-item">
              <span class="metric-label">Версия ПО</span>
              <span class="metric-val" style="color:var(--cyan-electric);">${ios.appVersion}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Сборка</span>
              <span class="metric-val">Build ${ios.buildNumber}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Размер</span>
              <span class="metric-val">${ios.fileSize}</span>
            </div>
          </div>

          <ul class="card-highlights">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Сейф Apple Keychain + Documents: сохраняется при обновлениях</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>1:1 Паритет: Frosted Top Bar и выдвижной боковой Drawer</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Беспроводная установка через ESign + Anti-Revoke DNS ($0)</span>
            </li>
          </ul>
        </div>

        <div class="card-actions">
          <div class="card-btn-row">
            <a href="${ios.downloadUrl}" class="btn btn-cyan" target="_blank">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Скачать IPA (${ios.fileSize})
            </a>
            <button class="btn btn-secondary" onclick="openQrModal('Установка iOS на iPhone', 'Отсканируйте камерой iPhone для установки по воздуху через ESign', '${ios.downloadUrl}')" title="Показать QR-код">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              QR
            </button>
          </div>
          <button class="btn btn-outline btn-sm" onclick="copyText('${ios.downloadUrl}', 'Прямая ссылка на IPA скопирована!')">
            Копировать ссылку для отправки в Telegram
          </button>
        </div>
      `;
    }
  }

  // ==========================================================================
  // VERSION HUB LIST
  // ==========================================================================
  function renderVersionList() {
    if (!versionListContainer) return;
    let releases = window.versionStorage.getAll();

    if (currentPlatformFilter !== 'all') {
      releases = releases.filter(r => r.platform === currentPlatformFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      releases = releases.filter(r => 
        r.appVersion.toLowerCase().includes(q) ||
        r.osRequirement.toLowerCase().includes(q) ||
        (r.summary && r.summary.toLowerCase().includes(q)) ||
        (r.changelog && r.changelog.some(c => c.text.toLowerCase().includes(q)))
      );
    }

    versionListContainer.innerHTML = releases.map(r => {
      const isAndroid = r.platform === 'android';
      const icon = isAndroid ? 'assets/icon-android.svg' : 'assets/icon-ios.svg';

      return `
        <div class="version-row">
          <div class="version-main-info">
            <div class="version-platform-badge ${r.platform}">
              <img src="${icon}" width="22" height="22" alt="${r.platformLabel}">
            </div>
            <div class="version-details">
              <h4>
                ${r.platformLabel} • <span style="color:var(--cyan-electric);">${r.appVersion}</span>
                <span class="os-compat-badge" style="margin-left:6px;">ОС: ${r.osRequirement}</span>
                ${r.status === 'latest' ? '<span class="tag-new" style="margin-left:6px;">АКТУАЛЬНАЯ</span>' : ''}
              </h4>
              <div class="version-meta-tags">
                <span class="meta-chip">Сборка: #${r.buildNumber}</span>
                <span>•</span>
                <span class="meta-chip">Размер: ${r.fileSize}</span>
                <span>•</span>
                <span class="meta-chip">Дата: ${r.releaseDate}</span>
              </div>
              <div class="changelog-chips" style="margin-top:8px;">
                ${r.changelog.slice(0, 2).map(c => `
                  <div class="changelog-line">
                    <span class="${c.type === 'new' ? 'tag-new' : 'tag-improved'}">${c.type === 'new' ? 'НОВОЕ' : 'АПДЕЙТ'}</span>
                    <span>${c.text}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="version-row-actions">
            <button class="btn btn-secondary btn-sm" onclick="openQrModal('Установка ${r.platformLabel} ${r.appVersion}', 'Отсканируйте для установки релиза', '${r.downloadUrl}')">
              QR
            </button>
            <a href="${r.downloadUrl}" class="btn btn-primary btn-sm" ${r.downloadUrl === '#' ? 'disabled style="opacity:0.5;pointer-events:none;"' : ''} target="_blank">
              Скачать
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // DEVICES & IN-DEPTH SIM TELEMETRY
  // ==========================================================================
  function renderDevices() {
    if (!devicesContainer || !window.activityStorage) return;

    const devices = window.activityStorage.getDevices();
    devicesContainer.innerHTML = devices.map(dev => {
      const isOnline = dev.status === 'online';
      const isIos = dev.platform === 'ios';
      const icon = isIos ? 'assets/icon-ios.svg' : 'assets/icon-android.svg';
      const sim = dev.simInfo || {};

      return `
        <div class="device-card ${isOnline ? 'is-online' : 'is-offline'}">
          <div class="device-card-header">
            <div class="device-info-cluster">
              <div class="device-avatar">
                <img src="${icon}" width="26" height="26" alt="${dev.platform}">
              </div>
              <div>
                <div class="device-name-title">
                  ${dev.model}
                  <span class="os-compat-badge">${dev.deviceOs}</span>
                </div>
                <div class="device-user-alias">
                  ${dev.userAlias} • ПО: <strong style="color:var(--cyan-electric);">${dev.appVersion}</strong>
                </div>
              </div>
            </div>

            <button class="device-status-badge ${isOnline ? 'online' : 'offline'}" onclick="window.toggleDeviceOnline('${dev.id}')" title="Кликните для смены статуса">
              <span class="pulse-dot ${isOnline ? 'green' : ''}"></span>
              ${isOnline ? 'ONLINE' : 'OFFLINE'}
            </button>
          </div>

          <!-- Comprehensive SIM Telemetry Panel -->
          <div class="sim-telemetry-panel">
            <div class="sim-header-row">
              <div class="sim-title-group">
                <span class="sim-slot-badge">${sim.slotType || 'SIM'}</span>
                <strong style="color:var(--text-primary); font-size:0.95rem;">${sim.carrierName || 'Оператор'}</strong>
              </div>
              <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">
                ${sim.networkType || '4G/5G'}
              </div>
            </div>

            <div class="sim-grid-params">
              <div class="sim-param-box">
                <span class="sim-param-label">Номер телефона / MSISDN</span>
                <span class="sim-param-value cyan">${sim.phoneNumber || 'Не указан'}</span>
              </div>
              <div class="sim-param-box">
                <span class="sim-param-label">Серийный номер (ICCID)</span>
                <span class="sim-param-value">${sim.iccid || 'Н/Д'}</span>
              </div>
              <div class="sim-param-box">
                <span class="sim-param-label">Идентификатор IMSI</span>
                <span class="sim-param-value">${sim.imsi || 'Н/Д'}</span>
              </div>
              <div class="sim-param-box">
                <span class="sim-param-label">Коды сети (MCC / MNC)</span>
                <span class="sim-param-value">${sim.mcc || '434'} / ${sim.mnc || '04'}</span>
              </div>
              <div class="sim-param-box">
                <span class="sim-param-label">Качество радиосигнала</span>
                <span class="sim-param-value" style="color:#4ADE80;">${sim.signalQuality || '-78 dBm'}</span>
              </div>
              <div class="sim-param-box">
                <span class="sim-param-label">Сотовая вышка / eNodeB</span>
                <span class="sim-param-value">${sim.cellTower || 'Sector 1'}</span>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.72rem; color:var(--text-muted); border-top:1px solid rgba(255,255,255,0.05); padding-top:8px;">
              <span><strong>IP адрес:</strong> ${sim.ipAddress || '10.0.0.1'}</span>
              <span style="color:var(--blue-accent);">🔒 ${sim.persistenceEngine || 'Persistent Vault'}</span>
            </div>
          </div>

          <!-- Quick Stats Bar -->
          <div class="device-stats-bar">
            <div class="metric-item">
              <span class="metric-label">Всего сессий</span>
              <span class="metric-val">#${dev.sessionsCount}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Расход за сегодня</span>
              <span class="metric-val" style="color:var(--cyan-electric);">${(dev.todayTrafficBytes / (1024 * 1024)).toFixed(1)} МБ</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Последний вход</span>
              <span class="metric-val" style="font-size:0.8rem;">${formatTimeAgo(dev.lastSeen)}</span>
            </div>
          </div>

          <div class="device-last-action" title="${dev.lastAction}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex:1;">
              <strong>Действие:</strong> ${dev.lastAction}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function formatTimeAgo(isoString) {
    if (!isoString) return 'только что';
    const date = new Date(isoString);
    const now = new Date();
    const diffSec = Math.max(0, Math.floor((now - date) / 1000));
    if (diffSec < 45) return 'только что';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} мин назад`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} ч назад`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay} дн назад`;
  }

  window.toggleDeviceOnline = function(deviceId) {
    if (window.activityStorage) {
      const newStatus = window.activityStorage.toggleDeviceStatus(deviceId);
      showToast(`Статус устройства изменен на ${newStatus.toUpperCase()}`);
    }
  };

  // ==========================================================================
  // ACTIVITY FEED
  // ==========================================================================
  function renderActivityFeed() {
    if (!activityFeedContainer || !window.activityStorage) return;

    let activities = window.activityStorage.getActivities();
    if (currentActFilter !== 'all') {
      activities = activities.filter(a => a.category === currentActFilter);
    }

    if (activityCounterBadge) {
      activityCounterBadge.textContent = `${activities.length} ${activities.length === 1 ? 'запись' : (activities.length < 5 ? 'записи' : 'записей')}`;
    }

    activityFeedContainer.innerHTML = activities.map(act => {
      const dateFormatted = new Date(act.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) + ' • ' + formatTimeAgo(act.timestamp);
      const isIos = act.platform === 'ios';

      return `
        <div class="activity-item">
          <div class="activity-icon-node ${act.category}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="activity-content">
            <div class="activity-top-row">
              <div class="activity-user-badge">
                <span>${act.userAlias} (${act.deviceModel})</span>
                <span class="version-pill" style="font-size:0.68rem; padding:1px 6px;">${isIos ? 'iOS' : 'Android'}</span>
              </div>
              <div class="activity-timestamp">${dateFormatted}</div>
            </div>
            <div class="activity-action-desc">
              <span class="action-tag ${act.category}">${act.action}</span>
              ${act.details}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // TRAFFIC CALENDAR & LIVE TELEMETRY
  // ==========================================================================
  function renderCalendarSummary(dateYMD) {
    if (!calendarDaySummary || !window.activityStorage) return;

    const primaryDevId = 'dev-ios-aisma';
    const dayStats = window.activityStorage.getDailyTraffic(primaryDevId, dateYMD);

    calendarDaySummary.innerHTML = `
      <div class="metric-item">
        <span class="metric-label">Всего за день</span>
        <span class="metric-val" style="color:var(--cyan-electric); font-size:1.1rem;">${dayStats.totalMB.toFixed(1)} МБ</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Слот 1 (Физическая SIM)</span>
        <span class="metric-val">${dayStats.sim1MB.toFixed(1)} МБ</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Слот 2 (eSIM 5G)</span>
        <span class="metric-val">${dayStats.sim2MB.toFixed(1)} МБ</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Пиковая скорость</span>
        <span class="metric-val" style="color:#4ADE80;">${dayStats.peakSpeedMBps.toFixed(1)} МБ/с</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Время активности</span>
        <span class="metric-val">${Math.floor(dayStats.activeMinutes / 60)}ч ${dayStats.activeMinutes % 60}м</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Число сессий</span>
        <span class="metric-val">#${dayStats.sessions}</span>
      </div>
    `;
  }

  if (calendarDatePicker) {
    calendarDatePicker.value = selectedDateYMD;
    calendarDatePicker.addEventListener('change', (e) => {
      selectedDateYMD = e.target.value;
      dayPillButtons.forEach(b => b.classList.remove('active'));
      renderCalendarSummary(selectedDateYMD);
    });
  }

  dayPillButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dayPillButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const offset = parseInt(btn.dataset.offset, 10) || 0;
      const d = new Date();
      d.setDate(d.getDate() - offset);
      selectedDateYMD = d.toISOString().split('T')[0];
      if (calendarDatePicker) calendarDatePicker.value = selectedDateYMD;
      renderCalendarSummary(selectedDateYMD);
    });
  });

  // Listen to Ultra-low-bandwidth Live Delta Event (~24 bytes packet)
  window.addEventListener('xylen:live-delta', (e) => {
    const detail = e.detail;
    if (detail.deviceId === 'dev-ios-aisma') {
      const todayMB = (detail.todayBytes / (1024 * 1024)).toFixed(2);
      const speedMB = (detail.speedKBps / 1024).toFixed(1);

      if (liveTodayMbDisplay) {
        liveTodayMbDisplay.textContent = todayMB;
      }
      if (liveSpeedDisplay) {
        liveSpeedDisplay.textContent = `${speedMB} МБ/с`;
      }
    }
  });

  // Listeners
  if (btnExportAuditCsv) {
    btnExportAuditCsv.addEventListener('click', () => {
      window.activityStorage.exportAuditLogCsv();
      showToast('Журнал аудита выгружен в CSV!');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderVersionList();
    });
  }

  platformTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      platformTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPlatformFilter = btn.dataset.platform;
      renderVersionList();
    });
  });

  actFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      actFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentActFilter = btn.dataset.actFilter;
      renderActivityFeed();
    });
  });

  // ==========================================================================
  // THEME SWITCHER (SLATE MIDNIGHT VS TRUE AMOLED #000000)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeLabel = document.getElementById('theme-label');
  const themeIcon = document.getElementById('theme-icon');

  function updateThemeUI(theme) {
    if (theme === 'amoled') {
      document.body.classList.add('theme-amoled');
      if (themeLabel) themeLabel.textContent = 'Slate';
      if (themeIcon) themeIcon.textContent = '☀️';
    } else {
      document.body.classList.remove('theme-amoled');
      if (themeLabel) themeLabel.textContent = 'AMOLED';
      if (themeIcon) themeIcon.textContent = '🌙';
    }
  }

  if (themeToggleBtn && window.activityStorage) {
    const currentTheme = window.activityStorage.getTheme();
    updateThemeUI(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
      const isAmoled = document.body.classList.contains('theme-amoled');
      const nextTheme = isAmoled ? 'dark' : 'amoled';
      window.activityStorage.setTheme(nextTheme);
      updateThemeUI(nextTheme);
      showToast(nextTheme === 'amoled' ? 'Режим True AMOLED активирован' : 'Режим Slate Midnight активирован');
    });
  }

  // ==========================================================================
  // 3 LANGUAGES SELECTOR (RU / UZ / EN)
  // ==========================================================================
  const langButtons = document.querySelectorAll('.lang-btn[data-lang]');

  function updateLangUI(lang) {
    langButtons.forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    if (window.i18n) {
      window.i18n.applyTranslations();
    }
    renderHeroCards();
    renderVersionList();
    renderDevices();
    renderActivityFeed();
    renderCalendarSummary(selectedDateYMD);
    renderWebVisitors();
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (window.i18n) {
        window.i18n.setLang(lang);
      }
      updateLangUI(lang);
      const toastText = lang === 'uz' ? 'Til: O\'zbekcha' : (lang === 'en' ? 'Language: English' : 'Язык: Русский');
      showToast(toastText);
    });
  });

  // ==========================================================================
  // MASTER ADMIN: WEB VISITORS AUDIT
  // ==========================================================================
  const visitorsTableBody = document.getElementById('visitors-table-body');
  const adminVisitorsSection = document.getElementById('admin-visitors-section');

  function renderWebVisitors() {
    if (!adminVisitorsSection || !window.activityStorage) return;

    const isAdmin = window.activityStorage.isAdmin();
    adminVisitorsSection.style.display = isAdmin ? 'block' : 'none';

    if (!isAdmin || !visitorsTableBody) return;

    const visitors = window.activityStorage.getWebVisitors();
    visitorsTableBody.innerHTML = visitors.map(v => {
      const dateFormatted = new Date(v.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) + ' • ' + formatTimeAgo(v.timestamp);
      return `
        <tr>
          <td><strong style="color:var(--text-primary); font-family:var(--font-mono); font-size:0.8rem;">${dateFormatted}</strong></td>
          <td>${v.device}</td>
          <td><span style="font-family:var(--font-mono); color:var(--cyan-electric); font-size:0.8rem;">${v.ip}</span></td>
          <td><span class="visitor-source-pill">${v.source}</span></td>
          <td><strong>${v.pageVisited}</strong></td>
          <td>
            <span class="card-status-badge" style="padding:2px 8px; font-size:0.7rem;">
              <span class="pulse-dot ${v.isOnline ? 'green' : ''}"></span>
              ${v.isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Update switchPage to record web visit telemetry
  const origSwitchPage = window.switchPage;
  window.switchPage = function(pageId) {
    if (origSwitchPage) origSwitchPage(pageId);
    if (window.activityStorage) {
      window.activityStorage.logWebVisit(pageId);
    }
  };

  window.addEventListener('xylen:visitors-updated', () => renderWebVisitors());
  window.addEventListener('xylen:devices-updated', () => renderDevices());
  window.addEventListener('xylen:activities-updated', () => {
    renderActivityFeed();
    renderDevices();
  });

  // Initial render
  if (window.i18n) {
    window.i18n.applyTranslations();
    const savedLang = window.i18n.getLang();
    langButtons.forEach(b => b.classList.toggle('active', b.dataset.lang === savedLang));
  }

  renderHeroCards();
  renderVersionList();
  renderDevices();
  renderActivityFeed();
  renderCalendarSummary(selectedDateYMD);
  renderWebVisitors();
});
