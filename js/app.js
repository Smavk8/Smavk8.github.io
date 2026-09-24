/**
 * Xylen Workspace - Application Controller & Motion Engine
 * - Always Floating Island Navigation (Zero deadzone scroll physics: hides on scroll down, returns on scroll up)
 * - Fixed Top-Right Compact Manager Capsule (with ☰ hamburger & manager badge)
 * - Compact Nav Drawer for mobile & collapsed states
 * - 5 Continuously Rotating Interactive Motion Modules (Auto-carousel + Diagnostic Modal)
 * - Calibrated Card Stack Scroll Runway (Smooth gliding & depth scaling)
 * - Standby Flatline Mode for Waveform until real device transmits
 * - Strictly Real Devices & Real Cellular Mobile Data (Wi-Fi 100% ignored)
 * - Origin: Gulistan (Гулистан) ↔ London (Лондон)
 * - Regulatory: Law of Republic of Uzbekistan (ЗРУ-547) & UK GDPR / DPA 2018
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 00 — SHORT TYPOGRAPHIC LOADER (Benchmark Jitter / ROG)
  // --------------------------------------------------------------------------
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 400);
    }
  }, 650);

  // --------------------------------------------------------------------------
  // SLIDING NAVIGATION PILL & SPA ROUTER
  // --------------------------------------------------------------------------
  const navButtons = document.querySelectorAll('.nav-page-btn[data-page]');
  const pageSections = document.querySelectorAll('.page-section');
  const navPill = document.getElementById('nav-active-pill');

  function updateNavPill(activeBtn) {
    if (!navPill || !activeBtn) return;
    const parent = activeBtn.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const offsetLeft = parent.scrollLeft + btnRect.left - parentRect.left - parent.clientLeft;

    navPill.style.left = offsetLeft + 'px';
    navPill.style.width = btnRect.width + 'px';
  }

  window.switchPage = function(pageId) {
    if (pageId === 'page-privacy') {
      pageId = 'page-about';
      setTimeout(() => document.getElementById('about-privacy')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 90);
    }
    if (pageId === 'page-admin' && (!window.activityStorage || !window.activityStorage.isAdmin())) {
      window.requestAdminConsole();
      return;
    }

    pageSections.forEach(section => {
      const isActive = section.id === pageId;
      section.classList.toggle('active', isActive);
      if (isActive) {
        section.classList.remove('revealed');
      }
    });

    let activeBtn = null;
    navButtons.forEach(btn => {
      const match = btn.dataset.page === pageId;
      btn.classList.toggle('active', match);
      if (match) activeBtn = btn;
    });

    if (activeBtn) {
      updateNavPill(activeBtn);
    }

    const hashName = pageId.replace('page-', '');
    if (window.location.hash !== '#' + hashName) {
      history.pushState(null, '', '#' + hashName);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      triggerScrollReveal();
      animateNumbers();
      if (pageId === 'page-traffic' && window.resizeTrafficCanvas) {
        window.resizeTrafficCanvas();
      }
    }, 60);

    if (window.activityStorage) {
      window.activityStorage.logWebVisit(hashName);
    }
  };

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        if (btnRect.left < parentRect.left) parent.scrollBy({ left: btnRect.left - parentRect.left - 8, behavior: 'smooth' });
        else if (btnRect.right > parentRect.right) parent.scrollBy({ left: btnRect.right - parentRect.right + 8, behavior: 'smooth' });
      }
      window.switchPage(btn.dataset.page);
    });
  });

  document.getElementById('main-nav-menu')?.addEventListener('scroll', () => {
    const activeBtn = document.querySelector('.nav-page-btn.active');
    if (activeBtn) updateNavPill(activeBtn);
  }, { passive: true });

  window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.nav-page-btn.active');
    if (activeBtn) updateNavPill(activeBtn);
  });

  function handleUrlHash() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const map = {
      'overview': 'page-overview',
      'home': 'page-overview',
      'devices': 'page-devices',
      'traffic': 'page-traffic',
      'releases': 'page-releases',
      'about': 'page-about',
      'privacy': 'page-about',
      'admin': 'page-admin'
    };

    if (map[hash]) {
      window.switchPage(map[hash]);
    } else {
      window.switchPage('page-overview');
    }
  }

  window.addEventListener('popstate', handleUrlHash);

  // --------------------------------------------------------------------------
  // COMPACT NAVIGATION DRAWER CONTROLLER
  // --------------------------------------------------------------------------
  const compactNavDrawer = document.getElementById('compact-nav-drawer');
  const drawerTrigger = document.getElementById('compact-hamburger-btn-header');

  window.toggleNavDrawer = function(open) {
    if (!compactNavDrawer) return;
    const shouldOpen = open !== undefined ? Boolean(open) : !compactNavDrawer.classList.contains('active');
    compactNavDrawer.classList.toggle('active', shouldOpen);
    compactNavDrawer.setAttribute('aria-hidden', String(!shouldOpen));
    compactNavDrawer.inert = !shouldOpen;
    drawerTrigger?.setAttribute('aria-expanded', String(shouldOpen));
    if (shouldOpen) compactNavDrawer.querySelector('.drawer-close-btn')?.focus({ preventScroll: true });
  };

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && compactNavDrawer?.classList.contains('active')) {
      window.toggleNavDrawer(false);
      drawerTrigger?.focus({ preventScroll: true });
    }
  });

  // --------------------------------------------------------------------------
  // PERMANENTLY FLOATING ISLAND NAVBAR
  // Top navbar stays smoothly anchored at top: 14px on all scroll positions.
  // --------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scroll-progress-line');
  const btnBackToTop = document.getElementById('btn-back-to-top');

  function handleScroll() {
    const currentScrollY = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = scrolled + '%';
    }

    if (btnBackToTop) {
      btnBackToTop.classList.toggle('visible', currentScrollY > 250);
    }

    triggerScrollReveal();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  function triggerScrollReveal() {
    const reveals = document.querySelectorAll('.page-section.active .reveal-on-scroll:not(.revealed)');
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 40) {
        el.classList.add('revealed');
      }
    });
  }

  // --------------------------------------------------------------------------
  // DRAWER LANGUAGE SELECTION CONTROLLER
  // --------------------------------------------------------------------------
  window.selectLanguage = function(lang) {
    if (window.i18n) {
      window.i18n.setLang(lang);
    }
    document.querySelectorAll('.drawer-lang-row .lang-text-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  };

  setTimeout(triggerScrollReveal, 120);

  // --------------------------------------------------------------------------
  // NUMBER COUNT-UP ODOMETER
  // --------------------------------------------------------------------------
  function animateNumbers() {
    const counters = document.querySelectorAll('.page-section.active .count-up');
    counters.forEach(counter => {
      const target = parseFloat(counter.dataset.target) || 0;
      const duration = 750;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(ease * target);
        
        if (counter.id === 'kpi-devices-count' || counter.id === 'kpi-sims-count') {
          counter.textContent = current;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (counter.id === 'kpi-devices-count' || counter.id === 'kpi-sims-count') {
            counter.textContent = target;
          }
        }
      }

      requestAnimationFrame(update);
    });
  }

  // --------------------------------------------------------------------------
  // THEME ENGINE
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  function updateThemeUI(theme) {
    const isLight = theme === 'light';
    document.body.classList.toggle('theme-light', isLight);
    const drawerThemeIcon = document.getElementById('drawer-theme-icon');
    const drawerThemeText = document.getElementById('drawer-theme-text');
    if (drawerThemeIcon) {
      drawerThemeIcon.textContent = isLight ? '🌙' : '☀️';
    }
    if (drawerThemeText) {
      drawerThemeText.textContent = isLight ? 'Светлая тема' : 'Тёмная тема';
    }
    const activeBtn = document.querySelector('.nav-page-btn.active');
    if (activeBtn) updateNavPill(activeBtn);
  }

  window.toggleTheme = function() {
    const current = document.body.classList.contains('theme-light') ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    if (window.activityStorage) {
      window.activityStorage.setTheme(next);
    }
    updateThemeUI(next);
  };

  const initialTheme = window.activityStorage ? window.activityStorage.getTheme() : 'dark';
  updateThemeUI(initialTheme);

  // --------------------------------------------------------------------------
  // 5 MOTION MODULES CAROUSEL & MODAL INSPECTOR
  // --------------------------------------------------------------------------
  const carouselViewport = document.getElementById('motion-carousel-viewport');
  const carouselTrack = document.getElementById('motion-carousel-track');
  const carouselPrevBtn = document.getElementById('carousel-prev-btn');
  const carouselNextBtn = document.getElementById('carousel-next-btn');

  if (carouselPrevBtn && carouselViewport) {
    carouselPrevBtn.addEventListener('click', () => {
      carouselViewport.scrollBy({ left: -340, behavior: 'smooth' });
    });
  }

  if (carouselNextBtn && carouselViewport) {
    carouselNextBtn.addEventListener('click', () => {
      carouselViewport.scrollBy({ left: 340, behavior: 'smooth' });
    });
  }

  const MOTION_MODULE_DATA = {
    'mod-spectrum': {
      title: 'Согласие и отправка отчёта',
      badge: 'КОНТРОЛЬ ПОЛЬЗОВАТЕЛЯ',
      desc: 'Android-клиент отправляет отчёт в веб API только при включённом согласии. Отключение согласия останавливает последующую отправку; уже сохранённые записи при этом автоматически не удаляются.',
      specs: [
        { label: 'Условие отправки', val: 'Согласие включено в клиенте' },
        { label: 'После отключения', val: 'Новые отчёты не отправляются' },
        { label: 'Уже полученные записи', val: 'Не удаляются автоматически' }
      ]
    },
    'mod-deltastream': {
      title: 'Поля Android-отчёта',
      badge: 'JSON ОТ КЛИЕНТА',
      desc: 'После согласия клиент отправляет событие с данными установки и приложения, временем, оператором, мобильными счётчиками и доступными SIM-профилями. Состав отчёта зависит от версии клиента и устройства.',
      specs: [
        { label: 'Событие', val: 'Экран, действие, время, детали' },
        { label: 'Счётчики', val: 'Дневной и сессионный отчёт клиента' },
        { label: 'SIM-профиль', val: 'Слот, оператор, тип и счётчик' }
      ]
    },
    'mod-vault': {
      title: 'Публичная сводка',
      badge: 'АГРЕГИРОВАННЫЕ ДАННЫЕ',
      desc: 'Открытая часть API возвращает суммарные числа по полученным отчётам. Она не показывает подробный журнал и не подтверждает независимым измерением значения, присланные телефоном.',
      specs: [
        { label: 'Публичный ответ', val: 'Агрегированные числа' },
        { label: 'Подробные события', val: 'Не публикуются' },
        { label: 'Источник показаний', val: 'Данные, сообщённые клиентом' }
      ]
    },
    'mod-celltower': {
      title: 'Подробный доступ владельца',
      badge: 'ОТДЕЛЬНАЯ ПРОВЕРКА',
      desc: 'Детальные записи выдаются через защищённый маршрут после проверки Cloudflare Access и совпадения учётной записи с адресом владельца, настроенным для проекта.',
      specs: [
        { label: 'Вход', val: 'Cloudflare Access JWT' },
        { label: 'Проверка владельца', val: 'Совпадение email' },
        { label: 'Область доступа', val: 'Подробные записи отчётов' }
      ]
    },
    'mod-billing': {
      title: 'Локальный журнал iOS',
      badge: 'ХРАНЕНИЕ НА УСТРОЙСТВЕ',
      desc: 'В проверенной версии iOS-клиента журнал событий хранится на устройстве и не отправляется в веб audit API. Это описание относится к журналу, а не ко всем данным приложения.',
      specs: [
        { label: 'Журнал событий', val: 'Хранится локально' },
        { label: 'Веб audit API', val: 'Журнал не отправляется' },
        { label: 'Область описания', val: 'Проверенная версия клиента' }
      ]
    }
  };

  const motionModal = document.getElementById('motion-modal');
  const motionModalTitle = document.getElementById('motion-modal-title');
  const motionModalBody = document.getElementById('motion-modal-body');

  window.openMotionModal = function(moduleId) {
    const data = MOTION_MODULE_DATA[moduleId];
    if (!data || !motionModal) return;

    if (motionModalTitle) motionModalTitle.textContent = data.title;
    if (motionModalBody) {
      motionModalBody.innerHTML = `
        <div class="motion-modal-detail-card">
          <span class="motion-badge">${data.badge}</span>
          <p style="font-size: 0.96rem; line-height: 1.6; margin-top: 8px; color: var(--text-primary);">
            ${data.desc}
          </p>
          <div class="motion-modal-specs">
            ${data.specs.map(s => `
              <div class="spec-cell">
                <span class="spec-cell-label">${s.label}</span>
                <span class="spec-cell-val">${s.val}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div style="text-align: right; margin-top: 14px;">
          <button class="btn btn-cyan btn-compact" onclick="window.closeMotionModal();">
            Закрыть инспектор
          </button>
        </div>
      `;
    }

    motionModal.classList.add('active');
  };

  window.closeMotionModal = function() {
    if (motionModal) motionModal.classList.remove('active');
  };

  // --------------------------------------------------------------------------
  // REAL DEVICES LIST & STANDBY WAITING ROOM
  // Strictly Real Hardware. Wi-Fi Strictly Ignored.
  // --------------------------------------------------------------------------
  const devicesContainer = document.getElementById('devices-container');
  const btnClearDevices = document.getElementById('btn-clear-devices');

  function buildDeviceCardHtml(device) {
    const mbToday = (device.todayTrafficBytes / (1024 * 1024)).toFixed(1) + ' МБ';
    const speedStr = (device.currentSpeedKBps / 1024).toFixed(1) + ' МБ/с';
    const isOnline = device.status === 'online';

    let simSlotsHtml = '';
    if (Array.isArray(device.simSlots) && device.simSlots.length > 0) {
      simSlotsHtml = device.simSlots.map(sim => `
        <div class="sim-chip-row ${sim.isDefaultData ? 'active-data' : ''}">
          <div class="sim-chip-header">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="sim-flag">${sim.countryFlag || '🇺🇿'}</span>
              <span class="sim-carrier-title">${sim.carrier}</span>
              <span class="sim-type-badge">${sim.networkType || '5G NR'}</span>
            </div>
            ${sim.isDefaultData ? '<span class="default-data-tag">● Мобильные данные</span>' : ''}
          </div>
          <div class="sim-chip-details">
            <span>Сигнал: <strong>${sim.signalDbm || -75} dBm</strong></span>
            <span>Вышка: <strong>${sim.cellTower || 'CID 11042'}</strong></span>
            <span>ICCID: <strong>${sim.iccid ? sim.iccid.substring(0, 10) + '...' : '8999...'}</strong></span>
          </div>
        </div>
      `).join('');
    }

    let timelineHtml = '';
    if (Array.isArray(device.timeline)) {
      timelineHtml = device.timeline.map(t => `
        <div class="timeline-event-item">
          <span class="timeline-time">${t.time}</span>
          <span class="timeline-title">${t.event}</span>
          <span class="timeline-desc">${t.desc}</span>
        </div>
      `).join('');
    }

    return `
      <div class="device-real-card hover-glow-card" id="card-${device.id}">
        <div>
          <div class="device-card-header">
            <div>
              <div class="device-model-name">${device.model}</div>
              <div class="device-os-tag">${device.deviceOs} • ${device.appVersion || 'v5.2'}</div>
            </div>
            <div class="device-status-badge ${isOnline ? 'online' : 'offline'}">
              <span class="pulse-dot ${isOnline ? 'green' : 'gray'}"></span>
              <span>${isOnline ? 'В сети' : 'Офлайн'}</span>
            </div>
          </div>

          <!-- Connected SIMs Inside Device -->
          <div class="connected-sims-group" style="margin-top: 16px;">
            <div class="sim-group-label">Текущие подключенные SIM-карты (Сотовая связь):</div>
            ${simSlotsHtml}
          </div>
        </div>

        <div>
          <div class="device-metrics-row">
            <span>Сотовый трафик: <strong>${mbToday}</strong></span>
            <span>IP: <strong style="font-family:var(--font-mono);">${device.ipAddress}</strong></span>
            <span style="color:var(--cyan-electric); font-weight:700;">↓ ${speedStr}</span>
          </div>

          <div class="device-timeline-wrap">
            <div class="timeline-heading">Хронология подключений</div>
            <div class="timeline-list">
              ${timelineHtml}
            </div>
          </div>

          <div style="margin-top: 16px; display:flex; justify-content:space-between; align-items:center;">
            <button class="btn btn-danger-subtle btn-compact" onclick="window.removeRealDevice('${device.id}')">
              Удалить узел
            </button>
            <button class="btn btn-secondary btn-compact" onclick="window.openDeviceModal('${device.id}')">
              Инспектор телеметрии ➔
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderDevices() {
    if (!window.activityStorage) return;
    const devices = window.activityStorage.getDevices();

    if (devicesContainer) {
      if (!devices || devices.length === 0) {
        const pairToken = window.activityStorage.getPairingToken();

        devicesContainer.innerHTML = `
          <div class="devices-empty-state-card hover-glow-card">
            <!-- Animated High-Tech Radio Radar Scanner -->
            <div class="devices-radar-container">
              <div class="radar-scope-wrapper">
                <div class="radar-screen">
                  <div class="radar-circle rc-1"></div>
                  <div class="radar-circle rc-2"></div>
                  <div class="radar-circle rc-3"></div>
                  <div class="radar-crosshair-h"></div>
                  <div class="radar-crosshair-v"></div>
                  <div class="radar-sweep-beam"></div>
                  <div class="radar-blip rb-1"></div>
                  <div class="radar-blip rb-2"></div>
                </div>
              </div>
              <div class="radar-status-caption">
                <span class="pulse-dot green"></span>
                <span>Эфир 5G NR / LTE • Автопоиск узлов связи</span>
              </div>
            </div>

            <h3 class="devices-empty-heading" data-i18n="devices_empty_title">Радиоэфир активен • Ожидание передачи данных</h3>
            <p class="devices-empty-text" data-i18n="devices_empty_desc">
              Шлюз телеметрии слушает входящие соединения в реальном времени. Как только мобильное приложение запускается на устройстве, данные его активных SIM-карт и сотового радиоканала мгновенно поступают на экран и направляются в модуль анализа трафика.
            </p>

            <div class="pairing-box">
              <div style="font-size:0.82rem; text-transform:uppercase; font-weight:700; color:var(--text-muted);">
                Узел приёма сотовой телеметрии:
              </div>
              <div class="pairing-token-pill" id="display-pairing-token">${pairToken}</div>
              <div class="active-node-specs-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:14px; text-align:left; font-size:0.82rem;">
                <div style="background:rgba(0,0,0,0.25); padding:8px 12px; border-radius:6px;">
                  <span style="color:var(--text-muted); display:block; font-size:0.72rem; text-transform:uppercase;">Маршрут:</span>
                  <strong style="color:var(--green-neon);">Гулистан ↔ Лондон (Cloudflare Edge)</strong>
                </div>
                <div style="background:rgba(0,0,0,0.25); padding:8px 12px; border-radius:6px;">
                  <span style="color:var(--text-muted); display:block; font-size:0.72rem; text-transform:uppercase;">Сотовые сети:</span>
                  <strong style="color:var(--cyan-bright);">Ucell, UMS, Beeline UZ, O2 UK, Three UK</strong>
                </div>
              </div>
            </div>

            <div class="gateway-live-status">
              <span class="pulse-dot green"></span>
              <span data-i18n="devices_listening_status">Шлюз телеметрии активен: радиоприёмник p.xylen.workers.dev (Wi-Fi строго исключён)</span>
            </div>

            <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin-top:12px;">
              <button class="btn btn-secondary btn-large" onclick="window.switchPage('page-releases');" data-i18n="btn_hero_releases">
                Центр загрузки клиентов (Android / iOS)
              </button>
            </div>
          </div>
        `;

        if (btnClearDevices) btnClearDevices.style.display = 'none';
      } else {
        devicesContainer.innerHTML = `
          <div class="devices-story-grid">
            ${devices.map(d => buildDeviceCardHtml(d)).join('')}
          </div>
        `;
        if (btnClearDevices) btnClearDevices.style.display = 'inline-block';
      }
    }

    // Update KPI numbers
    const kpiDevices = document.getElementById('kpi-devices-count');
    const kpiSims = document.getElementById('kpi-sims-count');
    const kpiTraffic = document.getElementById('kpi-traffic-count');
    const kpiSpeed = document.getElementById('kpi-speed-count');

    if (kpiDevices) {
      kpiDevices.dataset.target = devices ? devices.length : 0;
      kpiDevices.textContent = devices ? devices.length : 0;
    }
    if (kpiSims) {
      let totalSims = 0;
      if (devices) {
        devices.forEach(d => {
          if (Array.isArray(d.simSlots)) totalSims += d.simSlots.length;
        });
      }
      kpiSims.dataset.target = totalSims;
      kpiSims.textContent = totalSims;
    }

    // Update Total Traffic and Speed
    let totalSpeedKB = 0;
    let totalBytes = 0;
    if (devices) {
      devices.forEach(d => {
        totalSpeedKB += Number(d.currentSpeedKBps) || 0;
        totalBytes += Number(d.todayTrafficBytes) || 0;
      });
    }

    if (kpiSpeed) {
      kpiSpeed.textContent = (totalSpeedKB / 1024).toFixed(1) + ' МБ/с';
    }
    if (kpiTraffic) {
      const mb = totalBytes / (1024 * 1024);
      kpiTraffic.textContent = mb > 1024 ? (mb / 1024).toFixed(1) + ' ГБ' : mb.toFixed(1) + ' МБ';
    }
  }

  // --------------------------------------------------------------------------
  // USER AUDIT, SCREEN NAVIGATION & DATA SPEND MONITOR
  // --------------------------------------------------------------------------
  function formatBytes(bytes) {
    const b = Number(bytes) || 0;
    if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' КБ';
    if (b < 1024 * 1024 * 1024) return (b / (1024 * 1024)).toFixed(1) + ' МБ';
    return (b / (1024 * 1024 * 1024)).toFixed(2) + ' ГБ';
  }

  function renderAuditDashboard() {
    if (!window.activityStorage) return;
    const users = window.activityStorage.getAuditUsers();
    const activities = window.activityStorage.getAuditActivities();

    // 1. Update KPI bar
    const kpiTotalUsers = document.getElementById('audit-kpi-total-users');
    const kpiOnlineUsers = document.getElementById('audit-kpi-online-users');
    const kpiTotalSpend = document.getElementById('audit-kpi-total-spend');
    const kpiTotalActions = document.getElementById('audit-kpi-total-actions');

    const onlineUsers = users.filter(u => u.status === 'online');
    let totalSpendBytes = 0;
    users.forEach(u => { totalSpendBytes += (Number(u.todayBytes) || 0); });

    if (kpiTotalUsers) kpiTotalUsers.textContent = users.length;
    if (kpiOnlineUsers) kpiOnlineUsers.textContent = onlineUsers.length;
    if (kpiTotalSpend) kpiTotalSpend.textContent = formatBytes(totalSpendBytes);
    if (kpiTotalActions) kpiTotalActions.textContent = activities.length;

    // 2. Render Users Grid
    const usersGrid = document.getElementById('audit-users-grid');
    if (usersGrid) {
      if (!users || users.length === 0) {
        usersGrid.innerHTML = `
          <div class="user-empty-banner" style="grid-column: 1 / -1;">
            <div style="font-size: 2rem; margin-bottom: 8px;">👥</div>
            <strong>Ожидание подключения тестировщиков и пользователей</strong>
            <p style="margin-top: 6px; font-size: 0.86rem; color: var(--text-muted);">
              Как только пользователь откроет приложение на смартфоне, его карточка с текущим экраном, запущенными функциями и расходом трафика появится здесь в реальном времени.
            </p>
          </div>
        `;
      } else {
        usersGrid.innerHTML = users.map(u => {
          const isOnline = u.status === 'online';
          const initials = (u.testerName || 'U').substring(0, 2).toUpperCase();
          const screen = u.currentScreen || 'Главная';
          const spendFormatted = formatBytes(u.todayBytes);
          const lastAction = u.lastAction || 'В сети';
          const timeSince = u.lastSeenMs ? Math.round((Date.now() - u.lastSeenMs) / 1000) : 0;
          const timeDisplay = timeSince < 60 ? 'Только что' : `${Math.round(timeSince / 60)} мин назад`;

          return `
            <div class="user-monitor-card ${isOnline ? 'online' : 'offline'} hover-glow-card">
              <div class="user-card-top">
                <div class="user-identity">
                  <div class="user-avatar-circle">${initials}</div>
                  <div>
                    <div class="user-meta-name">${u.testerName || 'Тестировщик'}</div>
                    <div class="user-meta-device">${u.model || 'Смартфон'} • ${u.platform || 'Android'}</div>
                  </div>
                </div>
                <div class="user-status-tag ${isOnline ? 'online' : 'offline'}">
                  <span class="pulse-dot ${isOnline ? 'green' : 'gray'}"></span>
                  <span>${isOnline ? 'В сети' : 'Офлайн'}</span>
                </div>
              </div>

              <div class="user-screen-indicator">
                <span class="screen-label">Текущий раздел приложения:</span>
                <span class="screen-val">📍 ${screen}</span>
              </div>

              <div class="user-spend-strip">
                <div class="spend-item">
                  <span class="spend-item-label">Расход за сегодня</span>
                  <span class="spend-item-val">${spendFormatted}</span>
                </div>
                <div class="spend-item" style="text-align: right;">
                  <span class="spend-item-label">Сотовая сеть</span>
                  <strong style="color: var(--cyan-bright); font-size: 0.88rem;">${u.carrier || 'Ucell UZ'}</strong>
                </div>
              </div>

              <div class="user-last-action">
                <span>Действие: <strong>${lastAction}</strong></span>
                <span>${timeDisplay}</span>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // 3. Render Activity Feed
    const feedContainer = document.getElementById('audit-feed-container');
    if (feedContainer) {
      if (!activities || activities.length === 0) {
        feedContainer.innerHTML = `
          <div class="user-empty-banner">
            <span style="font-size: 1.4rem;">📜</span>
            <div style="margin-top: 6px;">Журнал ожидает действий пользователей...</div>
          </div>
        `;
      } else {
        feedContainer.innerHTML = activities.slice(0, 50).map(act => {
          const deltaTag = act.bytesDelta && act.bytesDelta > 0 
            ? `<span class="feed-spend-tag">+${formatBytes(act.bytesDelta)}</span>` 
            : '';
          return `
            <div class="audit-feed-item">
              <span class="feed-time">${act.timeDisplay || '12:00'}</span>
              <div class="feed-body">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="feed-user-title">${act.testerName || 'Пользователь'} (${act.model || 'Телефон'})</span>
                  ${deltaTag}
                </div>
                <div class="feed-action-text">${act.action || 'Действие'}</div>
                ${act.details ? `<div class="feed-details">${act.details}</div>` : ''}
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // 4. Render Spend Leaderboard
    const spendContainer = document.getElementById('audit-spend-container');
    if (spendContainer) {
      if (!users || users.length === 0) {
        spendContainer.innerHTML = `
          <div class="user-empty-banner">
            <span style="font-size: 1.4rem;">📊</span>
            <div style="margin-top: 6px;">Нет данных о расходе сотового трафика</div>
          </div>
        `;
      } else {
        const sorted = [...users].sort((a, b) => (Number(b.todayBytes) || 0) - (Number(a.todayBytes) || 0));
        spendContainer.innerHTML = `
          <table class="spend-table">
            <thead>
              <tr>
                <th>Тестировщик</th>
                <th>Устройство</th>
                <th>Текущий экран</th>
                <th>Расход сегодня</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              ${sorted.map(u => `
                <tr>
                  <td><strong>${u.testerName || 'Пользователь'}</strong></td>
                  <td style="color: var(--text-muted); font-size: 0.8rem;">${u.model || 'Смартфон'}</td>
                  <td><span class="screen-val" style="font-size: 0.82rem;">${u.currentScreen || 'Главная'}</span></td>
                  <td><strong style="color: var(--green-neon); font-family: var(--font-mono);">${formatBytes(u.todayBytes)}</strong></td>
                  <td>
                    <span class="user-status-tag ${u.status === 'online' ? 'online' : 'offline'}" style="font-size: 0.7rem; padding: 2px 6px;">
                      ${u.status === 'online' ? '● В сети' : '○ Офлайн'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      }
    }
  }

  window.refreshAuditNow = function() {
    if (window.activityStorage && window.activityStorage.startLiveAuditEngine) {
      fetch('/api/audit', { cache: 'no-store' })
        .then(r => r.json())
        .then(d => {
          if (d && d.ok) {
            window.activityStorage.auditUsers = d.users || [];
            window.activityStorage.auditActivities = d.recentActivities || [];
            renderAuditDashboard();
          }
        }).catch(() => {});
    }
  };

  window.addEventListener('xylen:audit-sync', () => {
    renderAuditDashboard();
  });

  window.injectTestRealDevice = function() { window.showToast('Демонстрационные устройства отключены.'); };

  window.removeRealDevice = function(deviceId) {
    if (!window.activityStorage) return;
    window.activityStorage.removeDevice(deviceId);
    renderDevices();
    window.showToast('Узел удален из мониторинга.');
  };

  window.clearAllDevices = function() {
    if (!window.activityStorage) return;
    window.activityStorage.clearAllDevices();
    renderDevices();
    window.showToast('Все активные узлы удалены из мониторинга.');
  };

  // --------------------------------------------------------------------------
  // INSTALLATION GUIDES TAB SWITCHER
  // --------------------------------------------------------------------------
  window.switchGuideTab = function(platform) {
    const btnAndroid = document.getElementById('tab-btn-android');
    const btnIos = document.getElementById('tab-btn-ios');
    const panelAndroid = document.getElementById('guide-panel-android');
    const panelIos = document.getElementById('guide-panel-ios');

    if (platform === 'android') {
      if (btnAndroid) btnAndroid.classList.add('active');
      if (btnIos) btnIos.classList.remove('active');
      if (panelAndroid) panelAndroid.classList.add('active');
      if (panelIos) panelIos.classList.remove('active');
    } else {
      if (btnAndroid) btnAndroid.classList.remove('active');
      if (btnIos) btnIos.classList.add('active');
      if (panelAndroid) panelAndroid.classList.remove('active');
      if (panelIos) panelIos.classList.add('active');
    }
  };

  // --------------------------------------------------------------------------
  // MINI STREAM CANVAS FOR JITTER STACK CARD 2
  // --------------------------------------------------------------------------
  const miniCanvas = document.getElementById('mini-stream-canvas');
  if (miniCanvas) {
    const miniCtx = miniCanvas.getContext('2d');
    let mWidth = miniCanvas.width = miniCanvas.offsetWidth || 460;
    let mHeight = miniCanvas.height = miniCanvas.offsetHeight || 240;

    window.addEventListener('resize', () => {
      if (!miniCanvas) return;
      mWidth = miniCanvas.width = miniCanvas.offsetWidth || 460;
      mHeight = miniCanvas.height = miniCanvas.offsetHeight || 240;
    });

    let streamOffset = 0;
    function drawMiniStream() {
      miniCtx.clearRect(0, 0, mWidth, mHeight);

      // Grid
      miniCtx.strokeStyle = 'rgba(0, 153, 218, 0.12)';
      miniCtx.lineWidth = 1;
      for (let x = 0; x < mWidth; x += 30) {
        miniCtx.beginPath();
        miniCtx.moveTo(x, 0);
        miniCtx.lineTo(x, mHeight);
        miniCtx.stroke();
      }

      // Draw 24-byte packet waveform stream
      streamOffset += 0.04;
      miniCtx.beginPath();
      for (let x = 0; x < mWidth; x += 4) {
        const y = mHeight * 0.5 + Math.sin(x * 0.03 + streamOffset) * 25 + Math.cos(x * 0.08 - streamOffset * 1.5) * 12;
        if (x === 0) miniCtx.moveTo(x, y);
        else miniCtx.lineTo(x, y);
      }
      miniCtx.strokeStyle = '#0099DA';
      miniCtx.lineWidth = 2.5;
      miniCtx.stroke();

      // Draw streaming packet markers
      miniCtx.fillStyle = '#55E831';
      for (let i = 0; i < 4; i++) {
        const px = ((streamOffset * 60 + i * 110) % mWidth);
        const py = mHeight * 0.5 + Math.sin(px * 0.03 + streamOffset) * 25 + Math.cos(px * 0.08 - streamOffset * 1.5) * 12;
        miniCtx.beginPath();
        miniCtx.arc(px, py, 4, 0, Math.PI * 2);
        miniCtx.fill();
      }

      requestAnimationFrame(drawMiniStream);
    }
    requestAnimationFrame(drawMiniStream);
  }

  // Ensure stack video elements autoplay reliably
  document.querySelectorAll('.stack-video-cover').forEach(video => {
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const startOnInteract = () => {
          video.play().catch(() => {});
        };
        window.addEventListener('click', startOnInteract, { once: true });
        window.addEventListener('scroll', startOnInteract, { once: true, passive: true });
        window.addEventListener('touchstart', startOnInteract, { once: true, passive: true });
      });
    }
  });

  // --------------------------------------------------------------------------
  // FLUID MULTI-HARMONIC CANVAS WAVEFORM (Traffic Page)
  // Calm Standby Flatline Mode when idle / zero devices
  // Dynamic Harmonic Waveform when transmitting
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('traffic-canvas');
  let currentActiveSpeedKB = 0;
  let currentActiveDevices = 0;

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;

    function ensureDimensions() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const parentW = canvas.parentElement ? canvas.parentElement.clientWidth : 0;
      const targetW = canvas.offsetWidth || rect.width || parentW || 1160;
      const targetH = canvas.offsetHeight || rect.height || 360;

      if (targetW > 0 && targetH > 0 && (canvas.width !== targetW || canvas.height !== targetH)) {
        canvas.width = width = targetW;
        canvas.height = height = targetH;
      }
    }

    ensureDimensions();
    window.addEventListener('resize', ensureDimensions);
    window.resizeTrafficCanvas = ensureDimensions;

    let waveTime = 0;
    let scanlineX = 0;
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 360,
      r: Math.random() * 2 + 1,
      speed: Math.random() * 1.2 + 0.4
    }));

    function drawWave() {
      ensureDimensions();
      if (width <= 0 || height <= 0) {
        requestAnimationFrame(drawWave);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const isLight = document.body.classList.contains('theme-light');
      const hasActiveStream = currentActiveSpeedKB > 0 && currentActiveDevices > 0;

      // 1. Phosphor Grid Lines
      ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      waveTime += 0.025;

      if (!hasActiveStream) {
        // VIBRANT STANDBY MODE: Continuous RF Carrier Wave with Breathing Modulation & Radar Sweep
        scanlineX = (scanlineX + 3.2) % width;
        const baselineY = height * 0.52;

        // Subtle gradient under the standby carrier
        const standbyGrad = ctx.createLinearGradient(0, baselineY - 40, 0, height);
        standbyGrad.addColorStop(0, isLight ? 'rgba(0, 136, 194, 0.08)' : 'rgba(0, 153, 218, 0.12)');
        standbyGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 8) {
          const dist = Math.abs(x - scanlineX);
          const carrier = Math.sin(x * 0.012 + waveTime) * 12 + Math.sin(x * 0.035 - waveTime * 1.5) * 6;
          let blip = 0;
          if (dist < 60) {
            blip = Math.cos((dist / 60) * (Math.PI / 2)) * 18;
          }
          const y = baselineY + carrier - blip;
          if (x === 0) ctx.lineTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = standbyGrad;
        ctx.fill();

        // Standby harmonic stroke
        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const dist = Math.abs(x - scanlineX);
          const carrier = Math.sin(x * 0.012 + waveTime) * 12 + Math.sin(x * 0.035 - waveTime * 1.5) * 6;
          let blip = 0;
          if (dist < 60) {
            blip = Math.cos((dist / 60) * (Math.PI / 2)) * 18;
          }
          const y = baselineY + carrier - blip;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = isLight ? 'rgba(0, 136, 194, 0.65)' : 'rgba(0, 153, 218, 0.75)';
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Tracer radar beam line
        const beamGrad = ctx.createLinearGradient(scanlineX - 40, 0, scanlineX + 10, 0);
        beamGrad.addColorStop(0, 'transparent');
        beamGrad.addColorStop(1, isLight ? 'rgba(0, 136, 194, 0.45)' : 'rgba(0, 229, 255, 0.55)');
        ctx.fillStyle = beamGrad;
        ctx.fillRect(Math.max(0, scanlineX - 40), 0, 40, height);

        // Standby slow particle drift
        ctx.fillStyle = isLight ? 'rgba(0, 136, 194, 0.35)' : 'rgba(0, 229, 255, 0.45)';
        particles.slice(0, 12).forEach(p => {
          p.x += p.speed * 0.5;
          if (p.x > width) p.x = 0;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });

      } else {
        // ACTIVE HIGH-THROUGHPUT HARMONIC WAVEFORM
        const waveColor = isLight ? '#0088C2' : '#0099DA';
        const speedFactor = Math.min(10, currentActiveSpeedKB / 1024);
        const amp1 = 20 + speedFactor * 4;
        const amp2 = 12 + speedFactor * 2.5;

        const grad = ctx.createLinearGradient(0, height * 0.2, 0, height);
        grad.addColorStop(0, isLight ? 'rgba(0, 136, 194, 0.32)' : 'rgba(0, 153, 218, 0.42)');
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 8) {
          const y = height * 0.52 +
                    Math.sin(x * 0.008 + waveTime * 1.4) * amp1 +
                    Math.cos(x * 0.018 - waveTime * 1.8) * amp2 +
                    Math.sin(x * 0.04 + waveTime * 2.2) * 5;
          if (x === 0) ctx.lineTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Main waveform stroke
        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const y = height * 0.52 +
                    Math.sin(x * 0.008 + waveTime * 1.4) * amp1 +
                    Math.cos(x * 0.018 - waveTime * 1.8) * amp2 +
                    Math.sin(x * 0.04 + waveTime * 2.2) * 5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = waveColor;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Fast high-speed telemetry particles
        ctx.fillStyle = isLight ? 'rgba(0, 136, 194, 0.85)' : 'rgba(85, 232, 49, 0.9)';
        particles.forEach(p => {
          p.x += p.speed * (1 + speedFactor * 0.3);
          if (p.x > width) p.x = 0;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      requestAnimationFrame(drawWave);
    }

    requestAnimationFrame(drawWave);
  }

  // --------------------------------------------------------------------------
  // LIVE TELEMETRY STREAM LISTENER & WAVEFORM STATE
  // --------------------------------------------------------------------------
  const trafficSpeedDisplay = document.getElementById('traffic-live-speed');
  const trafficTodayDisplay = document.getElementById('traffic-live-today');
  const kpiSpeedDisplay = document.getElementById('kpi-speed-count');
  const kpiTrafficDisplay = document.getElementById('kpi-traffic-count');
  const waveformStatusBadge = document.getElementById('waveform-status-badge');
  const waveformStatusDot = document.getElementById('waveform-status-dot');
  const waveformBadgeDot = document.getElementById('waveform-badge-dot');
  const waveformStatusText = document.getElementById('waveform-status-text');

  window.addEventListener('xylen:live-pulse', (e) => {
    const data = e.detail;
    if (!data) return;

    currentActiveSpeedKB = data.totalSpeedKBps || 0;
    currentActiveDevices = data.devicesCount || 0;

    const hasActiveStream = currentActiveSpeedKB > 0 && currentActiveDevices > 0;
    const speedMB = (currentActiveSpeedKB / 1024).toFixed(1);
    const todayMB = (data.totalTodayBytes / (1024 * 1024)).toFixed(1);

    if (trafficSpeedDisplay) trafficSpeedDisplay.textContent = speedMB + ' МБ/с';
    if (trafficTodayDisplay) trafficTodayDisplay.textContent = todayMB + ' МБ';
    if (kpiSpeedDisplay) kpiSpeedDisplay.textContent = speedMB + ' МБ/с';
    if (kpiTrafficDisplay) kpiTrafficDisplay.textContent = todayMB + ' МБ';

    // Update Waveform Status Indicator
    if (waveformStatusText) {
      if (hasActiveStream) {
        waveformStatusText.textContent = window.i18n ? window.i18n.t('traffic_live_badge') : 'РЕАЛЬНЫЙ СОТОВЫЙ ЭФИР';
        if (waveformStatusDot) { waveformStatusDot.className = 'pulse-dot green'; }
        if (waveformBadgeDot) { waveformBadgeDot.className = 'pulse-dot green'; }
      } else {
        waveformStatusText.textContent = window.i18n ? window.i18n.t('traffic_standby_badge') : 'РЕЖИМ ОЖИДАНИЯ • СТЕНДБАЙ';
        if (waveformStatusDot) { waveformStatusDot.className = 'pulse-dot standby'; }
        if (waveformBadgeDot) { waveformBadgeDot.className = 'pulse-dot standby'; }
      }
    }
  });

  window.addEventListener('xylen:devices-updated', () => {
    renderDevices();
  });

  // --------------------------------------------------------------------------
  // RELEASES SECTION CONTROLLER
  // --------------------------------------------------------------------------
  function renderReleases() {
    if (!window.versionStorage) return;
    const latest = window.versionStorage.getLatest();
    const all = window.versionStorage.getAll();

    // Render changelog
    const changelogList = document.getElementById('whats-new-list-items');
    if (changelogList && latest && Array.isArray(latest.changelog)) {
      changelogList.innerHTML = latest.changelog.map(item => `
        <li>${item.text}</li>
      `).join('');
    }

    // Render archive list
    const archiveContainer = document.getElementById('releases-archive-container');
    if (archiveContainer && all) {
      const older = all.filter(r => r.id !== (latest ? latest.id : ''));
      archiveContainer.innerHTML = older.map(r => `
        <div class="archive-card">
          <div>
            <div style="font-weight:700; font-size:1.05rem;">${r.versionDisplay}</div>
            <div style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">Дата выпуска: ${r.releaseDate}</div>
          </div>
          <div style="display:flex; gap:10px;">
            <a href="${r.android.downloadUrl}" class="btn btn-secondary btn-compact">Android (${r.android.fileSize})</a>
            <a href="${r.ios.downloadUrl}" class="btn btn-secondary btn-compact">iOS (${r.ios.fileSize})</a>
          </div>
        </div>
      `).join('');
    }
  }

  renderReleases();

  // --------------------------------------------------------------------------
  // ADMIN CONSOLE CONTROLLER
  // --------------------------------------------------------------------------
  const adminPinModal = document.getElementById('admin-pin-modal');
  const adminPinInput = document.getElementById('admin-pin-input');
  const adminPinError = document.getElementById('admin-pin-error');
  const activitiesTbody = document.getElementById('admin-activities-tbody');

  window.requestAdminConsole = function() {
    if (window.activityStorage && window.activityStorage.isAdmin()) {
      window.switchPage('page-admin');
    } else {
      if (adminPinModal) {
        adminPinModal.classList.add('active');
        if (adminPinInput) {
          adminPinInput.value = '';
          adminPinInput.focus();
        }
        if (adminPinError) adminPinError.style.display = 'none';
      }
    }
  };

  window.closeAdminPinModal = function() {
    if (adminPinModal) adminPinModal.classList.remove('active');
  };

  window.submitAdminPin = function() {
    if (!adminPinInput || !window.activityStorage) return;
    const pin = adminPinInput.value;
    if (window.activityStorage.loginAdmin(pin)) {
      window.closeAdminPinModal();
      window.switchPage('page-admin');
      renderAdminActivities();
      window.showToast('Успешная авторизация в консоли менеджера!');
    } else {
      if (adminPinError) adminPinError.style.display = 'block';
      adminPinInput.select();
    }
  };

  if (adminPinInput) {
    adminPinInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') window.submitAdminPin();
    });
  }

  window.logoutAdminConsole = function() {
    if (window.activityStorage) {
      window.activityStorage.logoutAdmin();
    }
    window.switchPage('page-overview');
    window.showToast('Вы вышли из консоли менеджера.');
  };

  function renderAdminActivities() {
    if (!activitiesTbody || !window.activityStorage) return;
    const acts = window.activityStorage.getActivities();
    if (!acts || acts.length === 0) {
      activitiesTbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; padding:24px; color:var(--text-muted);">
            Журнал чист. Зафиксированные действия отсутствуют.
          </td>
        </tr>
      `;
      return;
    }

    activitiesTbody.innerHTML = acts.map(a => `
      <tr>
        <td style="font-family:var(--font-mono); font-size:0.8rem;">${new Date(a.timestamp).toLocaleTimeString()}</td>
        <td style="font-weight:700;">${a.deviceId}</td>
        <td><span class="category-badge ${a.category}">${a.category}</span></td>
        <td>${a.action}</td>
        <td style="color:var(--text-secondary);">${a.details}</td>
      </tr>
    `).join('');
  }

  window.regeneratePairingToken = function() {
    if (!window.activityStorage) return;
    const newToken = window.activityStorage.generateNewPairingToken();
    renderDevices();
    window.showToast(`Новый ключ сопряжения сгенерирован: ${newToken}`);
  };

  // --------------------------------------------------------------------------
  // QR CODE MODAL FOR APP INSTALLATION
  // --------------------------------------------------------------------------
  const qrModal = document.getElementById('qr-modal');
  const qrTitle = document.getElementById('qr-modal-title');
  const qrCanvas = document.getElementById('qrcode-canvas');
  const qrLinkInput = document.getElementById('qr-link-input');

  window.openQrModal = function(url, title) {
    if (!qrModal) return;
    if (qrTitle) qrTitle.textContent = title || 'QR-код для установки';
    if (qrLinkInput) qrLinkInput.value = url;

    if (qrCanvas && typeof QRCode !== 'undefined') {
      qrCanvas.innerHTML = '';
      new QRCode(qrCanvas, {
        text: url,
        width: 180,
        height: 180,
        colorDark: '#0C0C0C',
        colorLight: '#FFFFFF',
        correctLevel: QRCode.CorrectLevel.M
      });
    }

    qrModal.classList.add('active');
  };

  window.closeQrModal = function() {
    if (qrModal) qrModal.classList.remove('active');
  };

  window.copyQrLink = function() {
    if (!qrLinkInput) return;
    qrLinkInput.select();
    navigator.clipboard.writeText(qrLinkInput.value).then(() => {
      window.showToast('Ссылка скопирована в буфер обмена!');
    });
  };

  // --------------------------------------------------------------------------
  // TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  let toastTimeout = null;
  window.showToast = function(message) {
    let toast = document.getElementById('xylen-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'xylen-toast';
      toast.className = 'toast-notification';
      toast.innerHTML = `<span class="toast-icon">✓</span> <span class="toast-text"></span>`;
      document.body.appendChild(toast);
    }

    const textEl = toast.querySelector('.toast-text');
    if (textEl) textEl.textContent = message;

    toast.classList.add('active');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  };

  // Initial render
  renderDevices();
  renderAuditDashboard();
  handleUrlHash();
});
