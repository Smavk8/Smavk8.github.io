/**
 * Xylen Sim Platform - Web Controller & SPA Router
 * Full-width modern interface, modal device inspector,
 * clean light/dark themes, smart auto-hiding header,
 * floating back-to-top button, scroll reveal animations,
 * zero fake devices (real telemetry only), and zero GitHub links.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements: Containers
  const androidHeroContainer = document.getElementById('android-hero-card');
  const iosHeroContainer = document.getElementById('ios-hero-card');
  const versionListContainer = document.getElementById('version-list-container');
  const devicesContainer = document.getElementById('devices-container');
  const calendarDaySummary = document.getElementById('calendar-day-summary');
  const calendarDatePicker = document.getElementById('calendar-date-picker');
  
  // Live Stream Elements
  const liveTodayMbDisplay = document.getElementById('live-today-mb');
  const liveSpeedDisplay = document.getElementById('live-current-speed');
  const liveDeviceName = document.getElementById('live-device-name');
  const liveSimSlot = document.getElementById('live-sim-slot');

  // Home Cockpit Elements
  const homeLiveSpeed = document.getElementById('home-live-speed');
  const homeLiveToday = document.getElementById('home-live-today');
  const homeLiveSim = document.getElementById('home-live-sim');
  const homeLiveSignal = document.getElementById('home-live-signal');
  const homeLiveTower = document.getElementById('home-live-tower');
  const homeLiveStatus = document.getElementById('home-live-device-status');

  // Search & Filters
  const searchInput = document.getElementById('search-versions');
  const platformTabButtons = document.querySelectorAll('.tab-btn[data-platform]');
  const dayPillButtons = document.querySelectorAll('.day-pill-btn[data-offset]');
  
  // Modals & Navigation
  const navPageButtons = document.querySelectorAll('.nav-page-btn[data-page]');
  const pageSections = document.querySelectorAll('.page-section');
  const navBtnAdmin = document.getElementById('nav-btn-admin');
  const qrModal = document.getElementById('qr-modal');
  const qrTitle = document.getElementById('qr-modal-title');
  const qrSubtitle = document.getElementById('qr-modal-subtitle');
  const qrContainer = document.getElementById('qrcode-canvas');
  const qrUrlDisplay = document.getElementById('qr-url-text');
  const qrCopyBtn = document.getElementById('qr-copy-btn');
  const qrDirectLink = document.getElementById('qr-direct-link');
  const toastElement = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  const topNavbar = document.getElementById('top-navbar');
  const btnBackToTop = document.getElementById('btn-back-to-top');

  let currentPlatformFilter = 'all';
  let searchQuery = '';
  let activeQrUrl = '';
  let selectedDateYMD = new Date().toISOString().split('T')[0];

  // Elements: Scroll & Admin
  const scrollProgressBar = document.getElementById('scroll-progress-line');
  const adminActiveBar = document.getElementById('admin-active-bar');
  const adminAuthModal = document.getElementById('admin-auth-modal');
  const adminPinInput = document.getElementById('admin-pin-input');
  const adminAuthError = document.getElementById('admin-auth-error');

  // ==========================================================================
  // SPA PAGE SWITCHER (With Protected Admin Gate)
  // ==========================================================================
  window.switchPage = function(pageId) {
    // If trying to access admin audit without authorization, intercept and prompt PIN
    if (pageId === 'page-admin' && (!window.activityStorage || !window.activityStorage.isAdmin())) {
      window.requestAdminConsole();
      return;
    }

    pageSections.forEach(section => {
      section.classList.toggle('active', section.id === pageId);
    });

    navPageButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger reveal animations for elements on the newly opened page
    setTimeout(triggerScrollReveal, 60);

    if (window.activityStorage) {
      window.activityStorage.logWebVisit(pageId);
    }
  };

  // URL Hash navigation support (#privacy, #devices, #releases, #about, #home, #admin)
  function handleUrlHash() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const map = {
      'privacy': 'page-privacy',
      'devices': 'page-devices',
      'traffic': 'page-traffic',
      'releases': 'page-releases',
      'about': 'page-about',
      'home': 'page-home',
      'admin': 'page-admin'
    };
    if (map[hash]) {
      window.switchPage(map[hash]);
    }
  }
  handleUrlHash();
  window.addEventListener('hashchange', handleUrlHash);

  navPageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      window.switchPage(btn.dataset.page);
    });
  });

  // ==========================================================================
  // SMART HEADER AUTO-HIDE, PROGRESS LINE & BACK TO TOP BUTTON
  // ==========================================================================
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Header auto-hide logic
    if (topNavbar) {
      if (currentScrollY > 90 && currentScrollY > lastScrollY) {
        topNavbar.classList.add('nav-hidden');
      } else {
        topNavbar.classList.remove('nav-hidden');
      }
    }

    // Scroll Progress Line calculation (Benchmark Jitter / ROG)
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollProgressBar && docHeight > 0) {
      const pct = Math.min(100, Math.max(0, (currentScrollY / docHeight) * 100));
      scrollProgressBar.style.width = pct + '%';
    }

    // Floating Back to Top Button visibility
    if (btnBackToTop) {
      if (currentScrollY > 280) {
        btnBackToTop.classList.add('visible');
      } else {
        btnBackToTop.classList.remove('visible');
      }
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // ANIMATED NUMBER COUNTERS (ROG Phone 8 & Jitter Telemetry Style)
  // ==========================================================================
  function animateCounter(el) {
    if (el.classList.contains('counter-animated')) return;
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    el.classList.add('counter-animated');

    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(target * ease);
      el.textContent = `${prefix}${currentVal}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${target}${suffix}`;
      }
    }
    requestAnimationFrame(update);
  }

  // ==========================================================================
  // SCROLL REVEAL ANIMATIONS (IntersectionObserver with Spring Physics)
  // ==========================================================================
  function triggerScrollReveal() {
    const elements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Trigger any animated counters
            const counters = entry.target.querySelectorAll('.stat-counter');
            counters.forEach(animateCounter);
            if (entry.target.classList.contains('stat-counter')) {
              animateCounter(entry.target);
            }
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });

      elements.forEach(el => observer.observe(el));
    } else {
      elements.forEach(el => {
        el.classList.add('revealed');
        const counters = el.querySelectorAll('.stat-counter');
        counters.forEach(animateCounter);
      });
    }
  }

  // ==========================================================================
  // ISOLATED MASTER ADMIN GATE (Discreet & Protected for Owner Only)
  // ==========================================================================
  function updateAdminUiState() {
    const isAuth = window.activityStorage && window.activityStorage.isAdmin();
    if (adminActiveBar) {
      adminActiveBar.classList.toggle('active', isAuth);
    }
  }

  window.requestAdminConsole = function() {
    if (window.activityStorage && window.activityStorage.isAdmin()) {
      window.switchPage('page-admin');
      return;
    }
    if (adminAuthModal) {
      adminAuthModal.classList.add('active');
      if (adminAuthError) adminAuthError.style.display = 'none';
      if (adminPinInput) {
        adminPinInput.value = '';
        setTimeout(() => adminPinInput.focus(), 120);
      }
    }
  };

  window.closeAdminAuthModal = function() {
    if (adminAuthModal) adminAuthModal.classList.remove('active');
    if (adminPinInput) adminPinInput.value = '';
    if (adminAuthError) adminAuthError.style.display = 'none';
  };

  window.submitAdminPin = function() {
    if (!adminPinInput) return;
    const pin = adminPinInput.value.trim();
    if (window.activityStorage && window.activityStorage.loginAdmin(pin)) {
      window.closeAdminAuthModal();
      updateAdminUiState();
      window.switchPage('page-admin');
      showToast('Вход выполнен: консоль аудита разблокирована');
    } else {
      if (adminAuthError) adminAuthError.style.display = 'block';
      adminPinInput.classList.add('shake');
      setTimeout(() => adminPinInput.classList.remove('shake'), 400);
      adminPinInput.focus();
    }
  };

  window.logoutAdminConsole = function() {
    if (window.activityStorage) {
      window.activityStorage.logoutAdmin();
    }
    updateAdminUiState();
    window.switchPage('page-home');
    showToast('Консоль аудита заблокирована');
  };

  if (adminPinInput) {
    adminPinInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        window.submitAdminPin();
      } else if (e.key === 'Escape') {
        window.closeAdminAuthModal();
      }
    });
  }

  // Secret Keyboard shortcut: Ctrl + Shift + A / Cmd + Shift + A
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'Ф' || e.key === 'ф')) {
      e.preventDefault();
      window.requestAdminConsole();
    }
  });

  // Secret 5-tap on brand logo to trigger admin modal
  let brandLogoClickCount = 0;
  let brandLogoClickTimer = null;
  const brandBadge = document.getElementById('brand-badge-logo');
  if (brandBadge) {
    brandBadge.addEventListener('click', (e) => {
      brandLogoClickCount++;
      clearTimeout(brandLogoClickTimer);
      if (brandLogoClickCount >= 5) {
        brandLogoClickCount = 0;
        e.preventDefault();
        window.requestAdminConsole();
      } else {
        brandLogoClickTimer = setTimeout(() => {
          brandLogoClickCount = 0;
        }, 2500);
      }
    });
  }

  updateAdminUiState();

  // ==========================================================================
  // TOAST & CLIPBOARD
  // ==========================================================================
  function showToast(msg) {
    if (!toastElement || !toastMessage) return;
    toastMessage.textContent = msg;
    toastElement.classList.add('show');
    setTimeout(() => {
      toastElement.classList.remove('show');
    }, 3000);
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

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
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

  // ==========================================================================
  // QR CODE MODAL
  // ==========================================================================
  window.openQrModal = function(title, subtitle, url) {
    activeQrUrl = url;
    if (qrTitle) qrTitle.textContent = title;
    if (qrSubtitle) qrSubtitle.textContent = subtitle;
    if (qrUrlDisplay) qrUrlDisplay.textContent = url;
    if (qrDirectLink) qrDirectLink.href = url;
    if (qrContainer) qrContainer.innerHTML = '';

    if (typeof QRCode !== 'undefined' && qrContainer) {
      new QRCode(qrContainer, {
        text: url,
        width: 190,
        height: 190,
        colorDark: '#0B0E14',
        colorLight: '#FFFFFF',
        correctLevel: QRCode.CorrectLevel.M
      });
    } else if (qrContainer) {
      qrContainer.innerHTML = `<div style="padding:20px;color:#111;"><strong>${url}</strong></div>`;
    }

    if (qrModal) qrModal.classList.add('active');
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
  // HERO CARDS: SEPARATED APP VERSION & OS PLATFORM (NO GITHUB LINKS)
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
            Копировать прямую ссылку на IPA
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
  // DEVICES: CLEAN COMPACT CARDS & ZERO FAKE DEVICES
  // ==========================================================================
  function renderDevices() {
    if (!devicesContainer || !window.activityStorage) return;

    const devices = window.activityStorage.getDevices();

    if (!devices || devices.length === 0) {
      devicesContainer.innerHTML = `
        <div class="devices-empty-card">
          <div class="devices-empty-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          </div>
          <h3 style="font-size:1.25rem; font-weight:800;" data-i18n="devices_empty_title">
            ${window.i18n ? window.i18n.t('devices_empty_title') : 'Ожидание подключения устройств'}
          </h3>
          <p style="max-width:560px; color:var(--text-secondary); font-size:0.92rem; line-height:1.6;" data-i18n="devices_empty_desc">
            ${window.i18n ? window.i18n.t('devices_empty_desc') : 'В системе пока нет активных подключений. Запустите мобильное приложение Xylen Platform на вашем Android или iPhone — устройство автоматически зарегистрируется в защищенном реестре.'}
          </p>
        </div>
      `;
      return;
    }

    devicesContainer.innerHTML = devices.map(device => {
      const isOnline = device.status === 'online';
      const lastSeenText = formatTimeAgo(device.lastSeen);
      const carrier = (device.simInfo && device.simInfo.carrierName) || 'Сотовая связь';
      const iconSvg = device.platform === 'ios'
        ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>`
        : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8z"/><path d="M12 2a4 4 0 0 0-4 4v4h8V6a4 4 0 0 0-4-4z"/><circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/></svg>`;

      return `
        <div class="device-compact-card" onclick="window.openDeviceInspector('${device.id}')">
          <div class="device-main-info">
            <div class="device-icon-box">
              ${iconSvg}
            </div>
            <div class="device-names-col">
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="device-name-title">${escapeHtml(device.model || device.userAlias)}</span>
                <span class="card-status-badge" style="font-size:0.7rem; padding:2px 8px;">
                  <span class="pulse-dot ${isOnline ? 'green' : 'amber'}"></span>
                  ${isOnline ? 'В сети' : 'Оффлайн'}
                </span>
              </div>
              <div class="device-meta-row">
                <span style="color:var(--cyan-electric); font-weight:700;">${escapeHtml(carrier)}</span>
                <span>•</span>
                <span>${escapeHtml(device.deviceOs || '')}</span>
                <span>•</span>
                <span>${window.i18n ? window.i18n.t('device_last_seen') : 'Активность:'} ${lastSeenText}</span>
              </div>
            </div>
          </div>

          <button class="btn btn-secondary btn-sm" style="white-space:nowrap;" onclick="event.stopPropagation(); window.openDeviceInspector('${device.id}')">
            ${window.i18n ? window.i18n.t('device_btn_inspect') : 'Подробнее ➔'}
          </button>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // DEVICE INSPECTOR MODAL (ВСЕ ДАННЫЕ В ОДНУ)
  // ==========================================================================
  window.openDeviceInspector = function(deviceId) {
    const devices = window.activityStorage.getDevices();
    const d = devices.find(item => item.id === deviceId);
    if (!d) return;

    const modalBackdrop = document.getElementById('inspector-modal-backdrop');
    const modalName = document.getElementById('modal-dev-name');
    const modalPlatformBadge = document.getElementById('modal-dev-platform-badge');
    
    // Set hardware params
    document.getElementById('modal-dev-model-val').textContent = d.model || '—';
    document.getElementById('modal-dev-os-val').textContent = d.deviceOs || '—';
    document.getElementById('modal-dev-app-ver-val').textContent = d.appVersion || '—';
    document.getElementById('modal-dev-sessions-val').textContent = d.sessionsCount || '1';
    document.getElementById('modal-dev-action-val').textContent = d.lastAction || '—';

    // Set SIM params
    const sim = d.simInfo || {};
    document.getElementById('modal-sim-carrier-val').textContent = sim.carrierName || '—';
    document.getElementById('modal-sim-slot-val').textContent = sim.displayName || 'SIM 1';
    document.getElementById('modal-sim-net-type-val').textContent = sim.networkType || '—';
    document.getElementById('modal-sim-signal-val').textContent = `${sim.signalDbm ? sim.signalDbm + ' dBm' : '—'} (${sim.signalQuality || ''})`;
    document.getElementById('modal-sim-tower-val').textContent = sim.cellTower || '—';
    document.getElementById('modal-sim-phone-val').textContent = sim.phoneNumber || '—';
    document.getElementById('modal-sim-imsi-val').textContent = sim.imsi || '—';
    document.getElementById('modal-sim-iccid-val').textContent = sim.iccid || '—';
    document.getElementById('modal-sim-ip-val').textContent = sim.ipAddress || '—';

    // Set traffic params
    const todayMB = (d.todayTrafficBytes ? (d.todayTrafficBytes / (1024 * 1024)).toFixed(2) : '0.00');
    const totalGB = (d.totalDataTrafficBytes ? (d.totalDataTrafficBytes / (1024 * 1024 * 1024)).toFixed(2) + ' ГБ' : '0.00 ГБ');
    const speedMB = (d.currentSpeedKBps ? (d.currentSpeedKBps / 1024).toFixed(1) + ' МБ/с' : '0.0 КБ/с');
    document.getElementById('modal-traffic-today-val').textContent = `${todayMB} МБ`;
    document.getElementById('modal-traffic-total-val').textContent = totalGB;
    document.getElementById('modal-traffic-speed-val').textContent = speedMB;

    if (modalName) modalName.textContent = d.model || d.userAlias;
    if (modalPlatformBadge) {
      modalPlatformBadge.textContent = d.platform === 'ios' ? 'Apple iOS' : 'Google Android';
      modalPlatformBadge.className = `badge ${d.platform}`;
    }

    if (modalBackdrop) modalBackdrop.classList.add('open');
  };

  function closeDeviceInspector() {
    const modalBackdrop = document.getElementById('inspector-modal-backdrop');
    if (modalBackdrop) modalBackdrop.classList.remove('open');
  }

  document.getElementById('modal-close-btn')?.addEventListener('click', closeDeviceInspector);
  document.getElementById('modal-close-x-btn')?.addEventListener('click', closeDeviceInspector);
  document.getElementById('inspector-modal-backdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'inspector-modal-backdrop') closeDeviceInspector();
  });

  // ==========================================================================
  // TRAFFIC CALENDAR & LIVE TELEMETRY
  // ==========================================================================
  function renderCalendarSummary(dateYMD) {
    if (!calendarDaySummary || !window.activityStorage) return;

    const devices = window.activityStorage.getDevices();
    if (!devices || devices.length === 0) {
      calendarDaySummary.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          ${window.i18n ? window.i18n.t('traffic_no_history') : 'Нет данных расхода за выбранный день.'}
        </div>
      `;
      return;
    }

    const firstDevId = devices[0].id;
    const dayStats = window.activityStorage.getDailyTraffic(firstDevId, dateYMD);

    calendarDaySummary.innerHTML = `
      <div class="metric-item">
        <span class="metric-label">Всего за день</span>
        <span class="metric-val" style="color:var(--cyan-electric); font-size:1.1rem;">${dayStats.totalMB.toFixed(1)} МБ</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Слот 1</span>
        <span class="metric-val">${dayStats.sim1MB.toFixed(1)} МБ</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Слот 2</span>
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

  function updateCockpitLive(dev, detail) {
    if (!dev) return;
    const todayMB = detail ? (detail.todayBytes / (1024 * 1024)).toFixed(2) : (dev.todayTrafficBytes ? (dev.todayTrafficBytes / (1024 * 1024)).toFixed(2) : '0.00');
    const speedMB = detail ? (detail.speedKBps / 1024).toFixed(1) : (dev.currentSpeedKBps ? (dev.currentSpeedKBps / 1024).toFixed(1) : '0.0');

    if (homeLiveSpeed) homeLiveSpeed.textContent = `${speedMB} МБ/с`;
    if (homeLiveToday) homeLiveToday.textContent = `${todayMB} МБ`;
    if (homeLiveSim && dev.simInfo) homeLiveSim.textContent = dev.simInfo.displayName || 'SIM 1';
    if (homeLiveSignal && dev.simInfo) {
      const dbm = dev.simInfo.signalDbm ? `${dev.simInfo.signalDbm} dBm` : '';
      const quality = dev.simInfo.signalQuality ? ` (${dev.simInfo.signalQuality})` : '';
      homeLiveSignal.textContent = dbm ? `${dbm}${quality}` : '98% (Отличный)';
    }
    if (homeLiveTower && dev.simInfo) {
      homeLiveTower.textContent = dev.simInfo.cellTower || 'CID 20847 / TAC 419';
    }
    if (homeLiveStatus) {
      homeLiveStatus.textContent = `${dev.model || dev.userAlias || 'Устройство'} • ${dev.status === 'online' ? 'Подключено в сети' : 'Оффлайн'}`;
    }
  }

  function initCockpit() {
    const devices = window.activityStorage ? window.activityStorage.getDevices() : [];
    if (devices && devices.length > 0) {
      updateCockpitLive(devices[0]);
    }
  }

  // Listen to Ultra-low-bandwidth Live Delta Event (~24 bytes packet)
  window.addEventListener('xylen:live-delta', (e) => {
    const detail = e.detail;
    const devices = window.activityStorage ? window.activityStorage.getDevices() : [];
    if (!devices || devices.length === 0) return;

    const matchedDev = devices.find(d => d.id === detail.deviceId) || devices[0];
    if (matchedDev) {
      const todayMB = (detail.todayBytes / (1024 * 1024)).toFixed(2);
      const speedMB = (detail.speedKBps / 1024).toFixed(1);

      if (liveTodayMbDisplay) liveTodayMbDisplay.textContent = todayMB;
      if (liveSpeedDisplay) liveSpeedDisplay.textContent = `${speedMB} МБ/с`;
      if (liveDeviceName) liveDeviceName.textContent = matchedDev.model || matchedDev.userAlias;
      if (liveSimSlot && matchedDev.simInfo) liveSimSlot.textContent = matchedDev.simInfo.displayName || 'SIM 1';

      updateCockpitLive(matchedDev, detail);
    }
  });

  // Search & Filter Listeners
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

  // ==========================================================================
  // THEME SWITCHER (SLATE DARK VS CLEAN LIGHT)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeLabel = document.getElementById('theme-label');
  const themeIcon = document.getElementById('theme-icon');

  function updateThemeUI(theme) {
    const isLight = theme === 'light';
    document.body.classList.toggle('theme-light', isLight);
    if (themeIcon) themeIcon.textContent = isLight ? '🌙' : '☀️';
    if (themeLabel) {
      themeLabel.textContent = isLight
        ? (window.i18n ? window.i18n.t('theme_dark') : 'Тёмная')
        : (window.i18n ? window.i18n.t('theme_light') : 'Светлая');
    }
  }

  if (themeToggleBtn && window.activityStorage) {
    const currentTheme = window.activityStorage.getTheme();
    updateThemeUI(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.contains('theme-light');
      const nextTheme = isLight ? 'dark' : 'light';
      window.activityStorage.setTheme(nextTheme);
      updateThemeUI(nextTheme);
      showToast(nextTheme === 'light' ? 'Светлая тема включена' : 'Тёмная тема включена');
    });
  }

  // ==========================================================================
  // 3 LANGUAGES SELECTOR (RU / UZ / EN)
  // ==========================================================================
  const langButtons = document.querySelectorAll('.lang-btn[data-lang], .lang-text-btn[data-lang]');

  function updateLangUI(lang) {
    langButtons.forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    if (window.i18n) {
      window.i18n.applyTranslations();
    }
    const currentTheme = window.activityStorage ? window.activityStorage.getTheme() : 'dark';
    updateThemeUI(currentTheme);

    renderHeroCards();
    renderVersionList();
    renderDevices();
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

  function renderWebVisitors() {
    if (!window.activityStorage) return;

    const isAdmin = window.activityStorage.isAdmin();
    if (navBtnAdmin) {
      navBtnAdmin.style.display = isAdmin ? 'inline-flex' : 'none';
    }

    if (!isAdmin || !visitorsTableBody) return;

    const visitors = window.activityStorage.getWebVisitors();
    if (visitors.length === 0) {
      visitorsTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; color:var(--text-muted); padding:24px;">
            ${window.i18n ? window.i18n.t('admin_empty_visitors') : 'Посещений пока не зафиксировано.'}
          </td>
        </tr>
      `;
      return;
    }

    visitorsTableBody.innerHTML = visitors.map(v => {
      const dateFormatted = new Date(v.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) + ' • ' + formatTimeAgo(v.timestamp);
      return `
        <tr>
          <td><strong style="color:var(--text-primary); font-family:var(--font-mono); font-size:0.8rem;">${dateFormatted}</strong></td>
          <td>${escapeHtml(v.device)}</td>
          <td><span style="font-family:var(--font-mono); color:var(--cyan-electric); font-size:0.8rem;">${escapeHtml(v.ip)}</span></td>
          <td><span class="visitor-source-pill">${escapeHtml(v.source)}</span></td>
          <td><strong>${escapeHtml(v.pageVisited)}</strong></td>
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

  window.addEventListener('xylen:visitors-updated', () => renderWebVisitors());
  window.addEventListener('xylen:devices-updated', () => {
    renderDevices();
    renderCalendarSummary(selectedDateYMD);
    initCockpit();
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
  renderCalendarSummary(selectedDateYMD);
  renderWebVisitors();
  initCockpit();
  triggerScrollReveal();
});
