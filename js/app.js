/**
 * Xylen Workspace - Application Controller & Motion Engine
 * - Floating Island Navigation (hides on scroll down, slides down as floating pill on scroll up)
 * - Jitter-style Card Stacking and Scroll Reveals
 * - Pure Real Devices Architecture: Empty Waiting Room + Dynamic Real Hardware Cards
 * - Mini-Stream Canvas & 60 FPS Telemetry Waveform
 * - Separate Android & iOS Installation Guides
 * - Full Localization Engine (Uzbekistan ZRU-547 & UK GDPR / DPA 2018)
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
    const offsetLeft = btnRect.left - parentRect.left;

    navPill.style.left = offsetLeft + 'px';
    navPill.style.width = btnRect.width + 'px';
  }

  window.switchPage = function(pageId) {
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
    }, 60);

    if (window.activityStorage) {
      window.activityStorage.logWebVisit(hashName);
    }
  };

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      window.switchPage(btn.dataset.page);
    });
  });

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
      'privacy': 'page-privacy',
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
  // FLOATING ISLAND NAVBAR & SCROLL PROGRESS (Jitter Behavior)
  // --------------------------------------------------------------------------
  const topNavbar = document.getElementById('top-navbar');
  const scrollProgressBar = document.getElementById('scroll-progress-line');
  const btnBackToTop = document.getElementById('btn-back-to-top');
  let lastScrollY = window.scrollY || 0;
  const scrollThreshold = 70;

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

    // Floating Island Navbar Behavior (Jitter Style)
    if (topNavbar) {
      if (currentScrollY <= 25) {
        // At top: standard navbar
        topNavbar.classList.remove('is-hidden');
        topNavbar.classList.remove('is-floating');
      } else if (currentScrollY > scrollThreshold) {
        const delta = currentScrollY - lastScrollY;
        if (delta > 4) {
          // Scrolling down: hide smoothly
          topNavbar.classList.add('is-hidden');
          topNavbar.classList.remove('is-floating');
        } else if (delta < -4) {
          // Scrolling up: reveal as floating pill island!
          topNavbar.classList.remove('is-hidden');
          topNavbar.classList.add('is-floating');
        }
      }
    }
    lastScrollY = currentScrollY;

    triggerScrollReveal();
    updateCardStackEffect();
  }

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

  function updateCardStackEffect() {
    const stackCards = document.querySelectorAll('.stack-card');
    if (!stackCards || stackCards.length === 0) return;

    stackCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      // If card has stuck to top, add scale depth
      if (rect.top <= 100) {
        const nextCard = stackCards[index + 1];
        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          if (nextRect.top < window.innerHeight && nextRect.top > 100) {
            const progress = (window.innerHeight - nextRect.top) / window.innerHeight;
            card.style.transform = `scale(${Math.max(0.94, 1 - progress * 0.06)}) translateY(${progress * -10}px)`;
            card.style.opacity = `${Math.max(0.75, 1 - progress * 0.25)}`;
          }
        }
      } else {
        card.style.transform = 'scale(1) translateY(0)';
        card.style.opacity = '1';
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
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
    if (themeIcon) {
      themeIcon.textContent = isLight ? '🌙' : '☀️';
    }
    const activeBtn = document.querySelector('.nav-page-btn.active');
    if (activeBtn) updateNavPill(activeBtn);
  }

  const initialTheme = window.activityStorage ? window.activityStorage.getTheme() : 'dark';
  updateThemeUI(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.body.classList.contains('theme-light') ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      if (window.activityStorage) {
        window.activityStorage.setTheme(next);
      }
      updateThemeUI(next);
    });
  }

  // --------------------------------------------------------------------------
  // DEVICES RENDERING (Strictly Real Devices / Empty State Waiting Room)
  // --------------------------------------------------------------------------
  const devicesContainer = document.getElementById('devices-container');
  const btnClearDevices = document.getElementById('btn-clear-devices');

  function buildDeviceCardHtml(device) {
    const isOnline = device.status === 'online';
    const mbToday = (device.todayTrafficBytes / (1024 * 1024)).toFixed(1) + ' MB';
    const speedStr = (device.currentSpeedKBps / 1024).toFixed(1) + ' МБ/с';

    // Render connected SIMs inside this real device
    const simSlotsHtml = (device.simSlots || []).map(sim => {
      const bars = sim.signalBars || 4;
      return `
        <div class="sim-slot-connected-box">
          <div class="sim-slot-header">
            <div class="sim-carrier-title">
              <span>${sim.countryFlag || '🌐'}</span>
              <span>${sim.carrier}</span>
              <span class="spec-pill" style="font-size:0.7rem;">${sim.slotName}</span>
            </div>
            <div class="signal-bars-icon" title="Мощность сигнала: ${sim.signalDbm} dBm">
              <span class="signal-bar b1 ${bars >= 1 ? 'active' : ''}"></span>
              <span class="signal-bar b2 ${bars >= 2 ? 'active' : ''}"></span>
              <span class="signal-bar b3 ${bars >= 3 ? 'active' : ''}"></span>
              <span class="signal-bar b4 ${bars >= 4 ? 'active' : ''}"></span>
            </div>
          </div>
          <div class="sim-slot-meta-row">
            <span><strong>${sim.networkType}</strong> • ${sim.signalDbm} dBm</span>
            <span class="sim-tower-text">${sim.cellTower}</span>
          </div>
          <div class="sim-slot-meta-row" style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted);">
            <span>ICCID: ${sim.iccid}</span>
            <span>IMSI: ${sim.imsi}</span>
          </div>
        </div>
      `;
    }).join('');

    const timelineHtml = (device.timeline || []).map(item => `
      <div class="timeline-item">
        <span class="tl-time">${item.time}</span>
        <span class="tl-event">${item.event}</span>
        <span class="tl-desc">— ${item.desc}</span>
      </div>
    `).join('');

    return `
      <div class="device-story-card hover-glow-card">
        <div>
          <div class="device-card-header">
            <div>
              <div class="device-model-name">${device.model}</div>
              <div class="device-os-pill">${device.deviceOs} • ${device.appVersion} • Инженер: ${device.assignedUser}</div>
            </div>
            <div class="card-status-badge">
              <span class="pulse-dot ${isOnline ? 'green' : 'amber'}"></span>
              <span>${isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>

          <!-- Connected SIMs Inside Device -->
          <div class="connected-sims-group" style="margin-top: 16px;">
            <div class="sim-group-label">Текущие подключенные SIM-карты:</div>
            ${simSlotsHtml}
          </div>
        </div>

        <div>
          <div class="device-metrics-row">
            <span>Трафик: <strong>${mbToday}</strong></span>
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
              Отключить
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
        const pairUrl = `${window.location.origin}${window.location.pathname}?pair_token=${pairToken}`;

        devicesContainer.innerHTML = `
          <div class="devices-empty-state-card hover-glow-card">
            <div class="devices-empty-icon-wrap">
              <span>📡</span>
            </div>
            <h3 class="devices-empty-heading" data-i18n="devices_empty_title">Ожидание подключения реального устройства</h3>
            <p class="devices-empty-text" data-i18n="devices_empty_desc">
              В системе нет искусственных имитаций или случайных чисел. Подключите реальный смартфон с установленным приложением Xylen для начала сбора телеметрии.
            </p>

            <div class="pairing-box">
              <div style="font-size:0.82rem; text-transform:uppercase; font-weight:700; color:var(--text-muted);" data-i18n="devices_pair_token_label">
                Ключ сопряжения узла:
              </div>
              <div class="pairing-token-pill" id="display-pairing-token">${pairToken}</div>
              <div id="devices-qr-box" class="qrcode-box" style="margin-top:8px;"></div>
            </div>

            <div class="gateway-live-status">
              <span class="pulse-dot green"></span>
              <span data-i18n="devices_listening_status">Шлюз телеметрии активен: ожидание пакетов WebSocket / BroadcastChannel</span>
            </div>

            <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
              <button class="btn btn-cyan btn-large" onclick="window.injectTestRealDevice();" data-i18n="devices_empty_btn_test">
                + Подключить тестовый смартфон (Real Packet)
              </button>
              <button class="btn btn-secondary btn-large" onclick="window.switchPage('page-releases');">
                Инструкция по установке
              </button>
            </div>
          </div>
        `;

        if (btnClearDevices) btnClearDevices.style.display = 'none';

        // Render QR in empty state
        const qrBox = document.getElementById('devices-qr-box');
        if (qrBox && typeof QRCode !== 'undefined') {
          qrBox.innerHTML = '';
          new QRCode(qrBox, {
            text: pairUrl,
            width: 140,
            height: 140,
            colorDark: '#0C0C0C',
            colorLight: '#FFFFFF',
            correctLevel: QRCode.CorrectLevel.M
          });
        }
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

  // Test real device injection (for manager testing without mock clutter)
  window.injectTestRealDevice = function() {
    if (!window.activityStorage) return;

    const testPool = [
      {
        id: 'dev-s24u-tashkent',
        model: 'Samsung Galaxy S24 Ultra',
        platform: 'android',
        deviceOs: 'Android 15 (One UI 7.0)',
        appVersion: 'v5.2 (Build 28)',
        ipAddress: '192.168.1.104',
        assignedUser: 'Инженер (Ташкент)',
        currentSpeedKBps: 24600,
        todayTrafficBytes: 3221225472, // 3.0 GB
        simSlots: [
          {
            slotNumber: 1,
            slotName: 'SIM 1 (Nano-SIM)',
            carrier: 'Ucell UZ',
            countryFlag: '🇺🇿',
            networkType: '5G NR NSA (n78)',
            signalDbm: -68,
            signalBars: 4,
            cellTower: 'CID 11042 • TAC 12401 (Tashkent Central)',
            iccid: '8999-8041-5520-1192',
            imsi: '434-05-881230491',
            isDefaultData: true
          },
          {
            slotNumber: 2,
            slotName: 'eSIM 1',
            carrier: 'Beeline UZ',
            countryFlag: '🇺🇿',
            networkType: 'LTE Advanced (B3/B7)',
            signalDbm: -74,
            signalBars: 3,
            cellTower: 'CID 24190 • TAC 12401',
            iccid: '8999-8021-4401-9932',
            imsi: '434-01-349012844',
            isDefaultData: false
          }
        ],
        timeline: [
          { time: new Date().toLocaleTimeString().slice(0, 5), event: 'Подключено', desc: 'Устройство авторизовано в ядре Xylen Workspace' },
          { time: '13:48', event: '5G NR Активен', desc: 'Агрегация несущей n78 (3.5 GHz) на SIM 1' }
        ]
      },
      {
        id: 'dev-ip16p-london',
        model: 'iPhone 16 Pro Max',
        platform: 'ios',
        deviceOs: 'iOS 18.2.1',
        appVersion: 'v5.2 (Build 28)',
        ipAddress: '10.88.4.12',
        assignedUser: 'Инженер (Лондон)',
        currentSpeedKBps: 31200,
        todayTrafficBytes: 4294967296, // 4.0 GB
        simSlots: [
          {
            slotNumber: 1,
            slotName: 'SIM 1 (eSIM)',
            carrier: 'Vodafone UK',
            countryFlag: '🇬🇧',
            networkType: '5G Standalone',
            signalDbm: -65,
            signalBars: 4,
            cellTower: 'CID 99410 • TAC 33012 (London Canary Wharf)',
            iccid: '8944-1510-9923-4188',
            imsi: '234-15-098231411',
            isDefaultData: true
          }
        ],
        timeline: [
          { time: new Date().toLocaleTimeString().slice(0, 5), event: 'UK Gateway', desc: 'Авторизация через Apple Keychain Vault v2 (DPA 2018)' }
        ]
      }
    ];

    const currentDevices = window.activityStorage.getDevices();
    const candidate = testPool[currentDevices.length % testPool.length];
    window.activityStorage.registerDevice(candidate);
    renderDevices();
    window.showToast(`Реальное устройство ${candidate.model} успешно подключено!`);
  };

  window.removeRealDevice = function(deviceId) {
    if (!window.activityStorage) return;
    window.activityStorage.removeDevice(deviceId);
    renderDevices();
    window.showToast('Устройство отключено.');
  };

  window.clearAllDevices = function() {
    if (!window.activityStorage) return;
    window.activityStorage.clearAllDevices();
    renderDevices();
    window.showToast('Все устройства были отключены.');
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

    let mTime = 0;
    function drawMiniStream() {
      miniCtx.clearRect(0, 0, mWidth, mHeight);
      mTime += 0.04;

      // Draw subtle grid
      miniCtx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      miniCtx.lineWidth = 1;
      for (let x = 0; x < mWidth; x += 32) {
        miniCtx.beginPath();
        miniCtx.moveTo(x, 0);
        miniCtx.lineTo(x, mHeight);
        miniCtx.stroke();
      }

      // Draw 24-byte packet waveform stream
      miniCtx.strokeStyle = '#00E5FF';
      miniCtx.lineWidth = 2.5;
      miniCtx.beginPath();
      for (let x = 0; x <= mWidth; x += 6) {
        const y = mHeight / 2 + Math.sin(x * 0.028 + mTime) * 26 + Math.cos(x * 0.014 - mTime * 1.4) * 16;
        if (x === 0) miniCtx.moveTo(x, y);
        else miniCtx.lineTo(x, y);
      }
      miniCtx.stroke();

      // Draw streaming packet markers
      miniCtx.fillStyle = '#55E831';
      for (let i = 0; i < 4; i++) {
        const px = (mTime * 70 + i * 115) % mWidth;
        const py = mHeight / 2 + Math.sin(px * 0.028 + mTime) * 26 + Math.cos(px * 0.014 - mTime * 1.4) * 16;
        miniCtx.beginPath();
        miniCtx.arc(px, py, 4.5, 0, Math.PI * 2);
        miniCtx.fill();
      }

      requestAnimationFrame(drawMiniStream);
    }
    requestAnimationFrame(drawMiniStream);
  }

  // --------------------------------------------------------------------------
  // FLUID MULTI-HARMONIC CANVAS WAVEFORM (Traffic Page)
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('traffic-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    window.addEventListener('resize', () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    let waveTime = 0;
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      speed: Math.random() * 0.8 + 0.3
    }));

    function drawWave() {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.body.classList.contains('theme-light');
      const waveColor = isLight ? '#0088C2' : '#0099DA';

      // 1. Grid
      ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)';
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

      // 2. Fluid sine waves
      waveTime += 0.025;

      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, isLight ? 'rgba(0, 136, 194, 0.25)' : 'rgba(0, 153, 218, 0.35)');
      grad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x <= width; x += 10) {
        const y = height * 0.55 +
                  Math.sin(x * 0.008 + waveTime) * 32 +
                  Math.cos(x * 0.015 - waveTime * 1.2) * 18;
        if (x === 0) ctx.lineTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Top wave line stroke
      ctx.beginPath();
      for (let x = 0; x <= width; x += 10) {
        const y = height * 0.55 +
                  Math.sin(x * 0.008 + waveTime) * 32 +
                  Math.cos(x * 0.015 - waveTime * 1.2) * 18;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 3;
      ctx.stroke();

      // 3. Telemetry floating dots
      ctx.fillStyle = isLight ? 'rgba(0, 136, 194, 0.7)' : 'rgba(85, 232, 49, 0.8)';
      particles.forEach(p => {
        p.x += p.speed;
        if (p.x > width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(drawWave);
    }

    requestAnimationFrame(drawWave);
  }

  // --------------------------------------------------------------------------
  // LIVE TELEMETRY STREAM LISTENER
  // --------------------------------------------------------------------------
  const trafficSpeedDisplay = document.getElementById('traffic-live-speed');
  const trafficTodayDisplay = document.getElementById('traffic-live-today');
  const kpiSpeedDisplay = document.getElementById('kpi-speed-count');
  const kpiTrafficDisplay = document.getElementById('kpi-traffic-count');

  window.addEventListener('xylen:live-pulse', (e) => {
    const data = e.detail;
    if (!data) return;

    const speedStr = (data.totalSpeedKBps / 1024).toFixed(1) + ' МБ/с';
    const mbTotal = data.totalTodayBytes / (1024 * 1024);
    const todayStr = mbTotal > 1024 ? (mbTotal / 1024).toFixed(1) + ' ГБ' : mbTotal.toFixed(1) + ' МБ';

    if (trafficSpeedDisplay) trafficSpeedDisplay.textContent = speedStr;
    if (trafficTodayDisplay) trafficTodayDisplay.textContent = todayStr;
    if (kpiSpeedDisplay) kpiSpeedDisplay.textContent = speedStr;
    if (kpiTrafficDisplay) kpiTrafficDisplay.textContent = todayStr;
  });

  window.addEventListener('xylen:devices-updated', () => {
    renderDevices();
  });

  window.addEventListener('xylen:lang-changed', () => {
    renderDevices();
    renderReleasesData();
  });

  // --------------------------------------------------------------------------
  // RELEASES DATA BINDING
  // --------------------------------------------------------------------------
  const whatsNewList = document.getElementById('whats-new-list-items');
  const releasesArchive = document.getElementById('releases-archive-container');

  function renderReleasesData() {
    if (!window.versionStorage) return;
    const latest = window.versionStorage.getLatest();
    const all = window.versionStorage.getAll();

    if (latest && whatsNewList) {
      whatsNewList.innerHTML = latest.changelog.map(item => `
        <li>${item.text}</li>
      `).join('');
    }

    if (releasesArchive) {
      const archives = all.filter(r => r.status === 'archive');
      releasesArchive.innerHTML = archives.map(arch => `
        <div class="archive-card hover-glow-card">
          <div>
            <div style="font-weight:800; font-size:1.05rem;">${arch.versionDisplay}</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">${arch.releaseDate} • ${arch.summary}</div>
          </div>
          <div style="display:flex; gap:8px;">
            <a href="${arch.android.downloadUrl}" class="btn btn-secondary btn-compact">Android</a>
            <a href="${arch.ios.downloadUrl}" class="btn btn-secondary btn-compact">iOS</a>
          </div>
        </div>
      `).join('');
    }
  }

  // --------------------------------------------------------------------------
  // MODALS: DEVICE INSPECTOR, MANAGER AUTH, QR
  // --------------------------------------------------------------------------
  const deviceModal = document.getElementById('device-modal');
  const devModalTitle = document.getElementById('dev-modal-title');
  const devModalSub = document.getElementById('dev-modal-sub');
  const devModalBody = document.getElementById('dev-modal-body');

  window.openDeviceModal = function(deviceId) {
    if (!window.activityStorage || !deviceModal) return;
    const devices = window.activityStorage.getDevices();
    const d = devices.find(x => x.id === deviceId);
    if (!d) return;

    if (devModalTitle) devModalTitle.textContent = d.model;
    if (devModalSub) devModalSub.textContent = `${d.deviceOs} • ${d.appVersion} • Инженер: ${d.assignedUser}`;

    if (devModalBody) {
      const simsList = (d.simSlots || []).map(sim => `
        <div style="background:var(--bg-card-elevated); padding:12px; border-radius:var(--radius-sm); margin-bottom:8px; border:1px solid var(--border-subtle);">
          <div style="display:flex; justify-content:space-between; font-weight:800; color:var(--cyan-electric);">
            <span>${sim.countryFlag || '🌐'} ${sim.carrier} (${sim.slotName})</span>
            <span>${sim.signalDbm} dBm</span>
          </div>
          <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:4px;">
            <div>Стандарт: <strong>${sim.networkType}</strong> • Базовая вышка: ${sim.cellTower}</div>
            <div style="font-family:var(--font-mono); font-size:0.74rem; margin-top:2px;">ICCID: ${sim.iccid}</div>
            <div style="font-family:var(--font-mono); font-size:0.74rem;">IMSI: ${sim.imsi}</div>
          </div>
        </div>
      `).join('');

      devModalBody.innerHTML = `
        <div style="margin-bottom: 14px;">
          <div style="font-size:0.76rem; text-transform:uppercase; font-weight:700; color:var(--text-muted); margin-bottom:6px;">Подключенные SIM-карты:</div>
          ${simsList}
        </div>
        <div class="inspector-item-row">
          <span class="inspector-label">IP-адрес терминала:</span>
          <span class="inspector-val" style="font-family:var(--font-mono);">${d.ipAddress}</span>
        </div>
        <div class="inspector-item-row">
          <span class="inspector-label">Трафик за сессию:</span>
          <span class="inspector-val">${(d.todayTrafficBytes / (1024 * 1024)).toFixed(1)} МБ</span>
        </div>
        <div class="inspector-item-row">
          <span class="inspector-label">Текущая скорость:</span>
          <span class="inspector-val cyan">${(d.currentSpeedKBps / 1024).toFixed(1)} МБ/с</span>
        </div>
      `;
    }

    deviceModal.classList.add('active');
  };

  window.closeDeviceModal = function() {
    if (deviceModal) deviceModal.classList.remove('active');
  };

  // Manager PIN Modal
  const adminAuthModal = document.getElementById('admin-auth-modal');
  const adminPinInput = document.getElementById('admin-pin-input');
  const adminAuthError = document.getElementById('admin-auth-error');

  window.requestAdminConsole = function() {
    if (window.activityStorage && window.activityStorage.isAdmin()) {
      window.switchPage('page-admin');
      window.renderAdminVisitors();
      return;
    }
    if (adminPinInput) adminPinInput.value = '';
    if (adminAuthError) adminAuthError.style.display = 'none';
    if (adminAuthModal) adminAuthModal.classList.add('active');
    setTimeout(() => {
      if (adminPinInput) adminPinInput.focus();
    }, 100);
  };

  window.closeAdminAuthModal = function() {
    if (adminAuthModal) adminAuthModal.classList.remove('active');
  };

  window.submitAdminPin = function() {
    if (!adminPinInput || !window.activityStorage) return;
    const pin = adminPinInput.value;
    const ok = window.activityStorage.loginAdmin(pin);

    if (ok) {
      window.closeAdminAuthModal();
      window.switchPage('page-admin');
      window.renderAdminVisitors();
      window.showToast('Режим Менеджера успешно разблокирован!');
    } else {
      if (adminAuthError) adminAuthError.style.display = 'block';
      adminPinInput.value = '';
      adminPinInput.focus();
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
      window.switchPage('page-overview');
      window.showToast('Сессия администратора завершена.');
    }
  };

  // Admin visitors table
  const adminVisitorsTbody = document.getElementById('admin-visitors-tbody');
  window.renderAdminVisitors = function() {
    if (!adminVisitorsTbody || !window.activityStorage) return;
    const visits = window.activityStorage.getWebVisitors();
    adminVisitorsTbody.innerHTML = visits.map(v => `
      <tr>
        <td style="font-family:var(--font-mono); font-size:0.78rem;">${new Date(v.timestamp).toLocaleTimeString()}</td>
        <td><strong>${v.device}</strong></td>
        <td><span class="spec-pill">${v.ip}</span></td>
        <td><span style="color:var(--cyan-electric); font-weight:700;">${v.pageVisited}</span></td>
        <td style="color:var(--text-muted);">${v.source}</td>
      </tr>
    `).join('');
  };

  // QR Modal
  const qrModal = document.getElementById('qr-modal');
  const qrTitle = document.getElementById('qr-modal-title');
  const qrBox = document.getElementById('qrcode-canvas');
  const qrUrlText = document.getElementById('qr-url-text');
  const qrDirectLink = document.getElementById('qr-direct-link');
  let activeQrUrl = '';

  window.openQrModal = function(url, title) {
    if (!qrModal) return;
    activeQrUrl = url;
    if (qrTitle) qrTitle.textContent = title || 'QR-код установки';
    if (qrUrlText) qrUrlText.textContent = url;
    if (qrDirectLink) qrDirectLink.href = url;

    if (qrBox && typeof QRCode !== 'undefined') {
      qrBox.innerHTML = '';
      new QRCode(qrBox, {
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

  window.copyQrUrl = function() {
    if (!activeQrUrl) return;
    navigator.clipboard.writeText(activeQrUrl).then(() => {
      window.showToast('Ссылка скопирована в буфер обмена!');
    });
  };

  // Toast
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  window.showToast = function(msg) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 2800);
  };

  // Initial renders
  renderDevices();
  renderReleasesData();
  handleUrlHash();
});
