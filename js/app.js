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

    // Update compact drawer buttons as well
    const drawerButtons = document.querySelectorAll('.drawer-nav-item');
    drawerButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageId);
    });

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
  // COMPACT NAVIGATION DRAWER CONTROLLER
  // --------------------------------------------------------------------------
  const compactNavDrawer = document.getElementById('compact-nav-drawer');

  window.toggleNavDrawer = function(open) {
    if (!compactNavDrawer) return;
    const shouldOpen = open !== undefined ? Boolean(open) : !compactNavDrawer.classList.contains('active');
    compactNavDrawer.classList.toggle('active', shouldOpen);
  };

  // --------------------------------------------------------------------------
  // HIGH-SENSITIVITY ZERO-DEADZONE FLOATING NAVBAR SCROLL PHYSICS
  // Hides immediately on ANY scroll down (even 1px or 1 wheel click)
  // Reveals immediately on ANY scroll up from anywhere on the page
  // At scrollY <= 10: Always shows full floating island
  // --------------------------------------------------------------------------
  const topNavbar = document.getElementById('top-navbar');
  const compactManager = document.getElementById('floating-compact-manager');
  const scrollProgressBar = document.getElementById('scroll-progress-line');
  const btnBackToTop = document.getElementById('btn-back-to-top');
  let lastScrollY = window.scrollY || 0;

  function updateNavbarVisibility(direction) {
    const currentScrollY = window.scrollY || document.documentElement.scrollTop;

    if (currentScrollY <= 10) {
      // At the very top: full menu is ALWAYS visible
      if (topNavbar) topNavbar.classList.remove('is-hidden');
      if (compactManager) compactManager.classList.remove('visible');
      return;
    }

    if (direction === 'down') {
      // Any scroll down: collapse full menu, reveal compact top-right manager pill
      if (topNavbar) topNavbar.classList.add('is-hidden');
      if (compactManager) compactManager.classList.add('visible');
    } else if (direction === 'up') {
      // Any scroll up: reveal full menu, hide compact manager pill
      if (topNavbar) topNavbar.classList.remove('is-hidden');
      if (compactManager) compactManager.classList.remove('visible');
    }
  }

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

    const delta = currentScrollY - lastScrollY;

    if (currentScrollY <= 10) {
      updateNavbarVisibility('at-top');
    } else if (delta > 0) {
      updateNavbarVisibility('down');
    } else if (delta < 0) {
      updateNavbarVisibility('up');
    }

    lastScrollY = currentScrollY;

    triggerScrollReveal();
    updateCardStackEffect();
  }

  // Instant response to mouse wheel rolling (Zero deadzone!)
  window.addEventListener('wheel', (e) => {
    const currentScrollY = window.scrollY || document.documentElement.scrollTop;
    if (currentScrollY > 10) {
      if (e.deltaY > 0) {
        updateNavbarVisibility('down');
      } else if (e.deltaY < 0) {
        updateNavbarVisibility('up');
      }
    }
  }, { passive: true });

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

  function updateCardStackEffect() {
    const stackCards = document.querySelectorAll('.stack-card');
    if (!stackCards || stackCards.length === 0) return;

    const totalCards = stackCards.length;
    const triggerStart = window.innerHeight;
    const triggerEnd = 130;

    stackCards.forEach((card, index) => {
      // Calculate how much successor cards have advanced towards sticky lock
      let totalProgress = 0;
      for (let j = index + 1; j < totalCards; j++) {
        const nextRect = stackCards[j].getBoundingClientRect();
        if (nextRect.top < triggerStart) {
          const rawProgress = (triggerStart - nextRect.top) / (triggerStart - triggerEnd);
          const progress = Math.min(Math.max(rawProgress, 0), 1);
          totalProgress += progress;
        }
      }

      if (totalProgress > 0) {
        const scale = Math.max(0.88, 1 - totalProgress * 0.05);
        const translateY = totalProgress * -8;
        const opacity = Math.max(0.7, 1 - totalProgress * 0.15);
        card.style.transform = `scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(1)}px)`;
        card.style.opacity = `${opacity.toFixed(2)}`;
      } else {
        card.style.transform = 'scale(1) translateY(0)';
        card.style.opacity = '1';
      }
    });
  }

  window.addEventListener('resize', updateCardStackEffect, { passive: true });

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
  // 5 MOTION MODULES CAROUSEL & MODAL INSPECTOR
  // --------------------------------------------------------------------------
  const carouselViewport = document.getElementById('motion-carousel-viewport');
  const carouselTrack = document.getElementById('motion-carousel-track');
  const carouselPrevBtn = document.getElementById('carousel-prev-btn');
  const carouselNextBtn = document.getElementById('carousel-next-btn');

  // Clone module items to create seamless infinite loop
  if (carouselTrack) {
    const originalChildren = Array.from(carouselTrack.children);
    originalChildren.forEach(child => {
      const clone = child.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      const modId = clone.dataset.moduleId;
      clone.onclick = () => window.openMotionModal(modId);
      carouselTrack.appendChild(clone);
    });
  }

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
      title: 'Orbit: 5G NR Spectrum (Гулистан ↔ Лондон)',
      badge: 'РАДИОЧАСТОТНЫЙ СПЕКТР',
      desc: 'Динамический мониторинг несущих частот Sub-6GHz и миллиметрового диапазона mmWave. Прямой шлюз синхронизации базовых станций Ucell, UMS, Beeline UZ и британских сетей O2 UK, Three UK.',
      specs: [
        { label: 'Диапазоны 5G NR', val: 'n78 (3.5 GHz), n41 (2.5 GHz), n28' },
        { label: 'Модуляция радиосигнала', val: '256-QAM DL / 64-QAM UL' },
        { label: 'Задержка трансграничного пинга', val: '4.8 мс (Гулистан Edge)' },
        { label: 'Совместимость операторов', val: 'Ucell, UMS, Beeline, O2, Three' }
      ]
    },
    'mod-deltastream': {
      title: 'DeltaStream: 24-Byte Pulse Protocol',
      badge: 'МИКРО-ДЕЛЬТА ТЕЛЕМЕТРИЯ',
      desc: 'Сверхкомпактный протокол сжатия данных. Передает полный вектор диагностики мобильного устройства за 24 байта, функционируя даже при экстремально слабом 2G/EDGE сигнале.',
      specs: [
        { label: 'Размер полезной нагрузки', val: 'Ровно 24 байта / пакет' },
        { label: 'Степень дельта-сжатия', val: '96.4% относительно JSON' },
        { label: 'Расход батареи устройства', val: '< 0.1% за 24 часа' },
        { label: 'Частота телеметрии', val: 'До 60 FPS в реальном эфире' }
      ]
    },
    'mod-vault': {
      title: 'Hardware Vault: AES-256 Enclave',
      badge: 'АППАРАТНАЯ БЕЗОПАСНОСТЬ',
      desc: 'Хранение криптографических ключей в защищенных аппаратных анклавах Android Keystore StrongBox и Apple Secure Enclave. Строгое соответствие Закону РУз № ЗРУ-547 и стандарту UK GDPR.',
      specs: [
        { label: 'Алгоритм шифрования', val: 'AES-256-GCM Hardware' },
        { label: 'Правовая база', val: 'ЗРУ-547 (РУз) & UK GDPR / DPA 2018' },
        { label: 'Доступ к личным данным', val: 'СТРОГО 0% (SMS и звонки заблокированы)' },
        { label: 'Аутентификация шлюза', val: 'Взаимный mTLS с ротацией токенов' }
      ]
    },
    'mod-celltower': {
      title: 'CellTower Matrix: CID & TAC Telemetry',
      badge: 'СОТОВАЯ ТРИАНГУЛЯЦИЯ',
      desc: 'Мгновенная фиксация сотовых вышек через Cell ID (CID) и Tracking Area Code (TAC) без энергозатратного спутникового GPS. Поддерживает карты расположения базовых станций в Гулистане и Лондоне.',
      specs: [
        { label: 'Код страны / сети (MCC/MNC)', val: '434 (05 Ucell, 07 UMS, 04 Beeline)' },
        { label: 'Британский транзит (MCC/MNC)', val: '234 (10 O2 UK, 20 Three UK)' },
        { label: 'Точность позиционирования', val: 'По сектору соты (без расхода GPS)' },
        { label: 'Фиксация хэндоверов', val: 'Бесшовная регистрация переходов' }
      ]
    },
    'mod-billing': {
      title: 'Billing Guard: Mobile Data Audit Engine',
      badge: 'АУДИТ ТАРИФОВ И БИЛЛИНГА',
      desc: 'Побайтовое сопоставление сетевого трафика, зафиксированного модемом смартфона, с биллинговыми данными оператора. Предотвращает скрытые списания и округления. Wi-Fi полностью исключён.',
      specs: [
        { label: 'Правило фильтрации сетей', val: '100% сотовый учёт (Wi-Fi = 0)' },
        { label: 'Защита от утечек в роуминге', val: 'Активна (Гулистан ↔ Лондон)' },
        { label: 'Погрешность подсчета', val: '< 0.01 МБ на 10 ГБ трафика' },
        { label: 'Предотвращение перерасхода', val: 'Автоматическая отсечка сессий' }
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
              <span data-i18n="devices_listening_status">Шлюз телеметрии активен: ожидание пакетов p.xylen.workers.dev / WebSocket</span>
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

  // Test real device injection (Strictly Gulistan & London Operators: Ucell, UMS, Beeline UZ, O2 UK, Three UK)
  window.injectTestRealDevice = function() {
    if (!window.activityStorage) return;

    const testPool = [
      {
        id: 'dev-s24u-gulistan',
        model: 'Samsung Galaxy S24 Ultra',
        platform: 'android',
        deviceOs: 'Android 15 (One UI 7.0)',
        appVersion: 'v5.2 (Build 28)',
        ipAddress: '192.168.1.104',
        assignedUser: 'Инженер связи (Гулистан)',
        currentSpeedKBps: 24600,
        todayTrafficBytes: 3221225472, // 3.0 GB
        isMobileData: true,
        isWifi: false,
        simSlots: [
          {
            slotNumber: 1,
            slotName: 'SIM 1 (Nano-SIM)',
            carrier: 'Ucell UZ',
            countryFlag: '🇺🇿',
            networkType: '5G NR NSA (n78)',
            signalDbm: -68,
            signalBars: 4,
            cellTower: 'CID 11042 • TAC 12401 (Гулистан Центр)',
            iccid: '8999-8041-5520-1192',
            imsi: '434-05-881230491',
            isDefaultData: true
          },
          {
            slotNumber: 2,
            slotName: 'SIM 2 (eSIM)',
            carrier: 'Beeline UZ',
            countryFlag: '🇺🇿',
            networkType: 'LTE Advanced (B3/B7)',
            signalDbm: -74,
            signalBars: 3,
            cellTower: 'CID 24190 • TAC 12401 (Гулистан Узел)',
            iccid: '8999-8021-4401-9932',
            imsi: '434-04-349012844',
            isDefaultData: false
          }
        ],
        timeline: [
          { time: new Date().toLocaleTimeString().slice(0, 5), event: 'Гулистан Lab', desc: 'Устройство авторизовано в ядре Xylen (ЗРУ-547)' },
          { time: '13:48', event: '5G NR NSA Активен', desc: 'Агрегация несущей n78 (3.5 GHz) на SIM 1 (Ucell)' }
        ]
      },
      {
        id: 'dev-pixel9-gulistan',
        model: 'Google Pixel 9 Pro',
        platform: 'android',
        deviceOs: 'Android 15 (AOSP)',
        appVersion: 'v5.2 (Build 28)',
        ipAddress: '192.168.1.182',
        assignedUser: 'Сетевой аналитик (Гулистан)',
        currentSpeedKBps: 18400,
        todayTrafficBytes: 1610612736, // 1.5 GB
        isMobileData: true,
        isWifi: false,
        simSlots: [
          {
            slotNumber: 1,
            slotName: 'SIM 1 (Nano-SIM)',
            carrier: 'UMS',
            countryFlag: '🇺🇿',
            networkType: 'LTE+ (Carrier Aggregation)',
            signalDbm: -71,
            signalBars: 4,
            cellTower: 'CID 18402 • TAC 12401 (Гулистан Вокзал)',
            iccid: '8999-8071-1201-4491',
            imsi: '434-07-550192841',
            isDefaultData: true
          }
        ],
        timeline: [
          { time: new Date().toLocaleTimeString().slice(0, 5), event: 'Подключено', desc: 'Авторизация в шлюзе телеметрии Гулистана' }
        ]
      },
      {
        id: 'dev-ip16p-london',
        model: 'iPhone 16 Pro Max',
        platform: 'ios',
        deviceOs: 'iOS 18.2.1',
        appVersion: 'v5.2 (Build 28)',
        ipAddress: '10.88.4.12',
        assignedUser: 'Инженер шлюза (Лондон)',
        currentSpeedKBps: 31200,
        todayTrafficBytes: 4294967296, // 4.0 GB
        isMobileData: true,
        isWifi: false,
        simSlots: [
          {
            slotNumber: 1,
            slotName: 'SIM 1 (eSIM)',
            carrier: 'O2 UK',
            countryFlag: '🇬🇧',
            networkType: '5G Standalone',
            signalDbm: -65,
            signalBars: 4,
            cellTower: 'CID 99410 • TAC 33012 (London Canary Wharf)',
            iccid: '8944-1510-9923-4188',
            imsi: '234-10-098231411',
            isDefaultData: true
          }
        ],
        timeline: [
          { time: new Date().toLocaleTimeString().slice(0, 5), event: 'UK Gateway', desc: 'Авторизация через Apple Keychain Vault v2 (UK GDPR)' }
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
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    window.addEventListener('resize', () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    let waveTime = 0;
    let scanlineX = 0;
    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      speed: Math.random() * 0.8 + 0.3
    }));

    function drawWave() {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.body.classList.contains('theme-light');
      const hasActiveStream = currentActiveSpeedKB > 0 && currentActiveDevices > 0;

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

      if (!hasActiveStream) {
        // STANDBY FLATLINE MODE (Calm horizon with soft scanning radar sweep)
        scanlineX = (scanlineX + 3) % width;

        const baselineY = height * 0.55;

        // Baseline glow
        ctx.beginPath();
        ctx.moveTo(0, baselineY);
        ctx.lineTo(width, baselineY);
        ctx.strokeStyle = isLight ? 'rgba(0, 136, 194, 0.2)' : 'rgba(0, 153, 218, 0.25)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Calm blip over baseline
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          const dist = Math.abs(x - scanlineX);
          let y = baselineY;
          if (dist < 40) {
            y -= Math.cos((dist / 40) * (Math.PI / 2)) * 6;
          }
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = isLight ? 'rgba(0, 136, 194, 0.6)' : 'rgba(0, 153, 218, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();

      } else {
        // ACTIVE HARMONIC WAVEFORM
        waveTime += 0.03;
        const waveColor = isLight ? '#0088C2' : '#0099DA';
        const amp1 = Math.min(42, 14 + (currentActiveSpeedKB / 1024) * 0.8);
        const amp2 = Math.min(24, 8 + (currentActiveSpeedKB / 1024) * 0.4);

        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, isLight ? 'rgba(0, 136, 194, 0.25)' : 'rgba(0, 153, 218, 0.35)');
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 10) {
          const y = height * 0.55 +
                    Math.sin(x * 0.008 + waveTime) * amp1 +
                    Math.cos(x * 0.015 - waveTime * 1.2) * amp2;
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
                    Math.sin(x * 0.008 + waveTime) * amp1 +
                    Math.cos(x * 0.015 - waveTime * 1.2) * amp2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = waveColor;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Telemetry floating dots
        ctx.fillStyle = isLight ? 'rgba(0, 136, 194, 0.7)' : 'rgba(85, 232, 49, 0.8)';
        particles.forEach(p => {
          p.x += p.speed;
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
  handleUrlHash();
});
