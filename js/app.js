/**
 * Xylen Workspace - Application Controller & Motion Engine
 * - Smooth Sliding Navigation Pill
 * - Fluid Multi-Harmonic Canvas Waveform
 * - Device Fleet Cockpit with Currently Connected SIMs
 * - Dedicated Android & iOS App Download Center
 * - Tactile Micro-Interactions & Spring Physics
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
  // SCROLL PROGRESS & REVEALS
  // --------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scroll-progress-line');
  const btnBackToTop = document.getElementById('btn-back-to-top');

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = scrolled + '%';
    }

    if (btnBackToTop) {
      btnBackToTop.classList.toggle('visible', scrollTop > 250);
    }

    triggerScrollReveal();
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

  window.addEventListener('scroll', handleScroll, { passive: true });
  setTimeout(triggerScrollReveal, 120);

  // --------------------------------------------------------------------------
  // NUMBER COUNT-UP ODOMETER
  // --------------------------------------------------------------------------
  function animateNumbers() {
    const counters = document.querySelectorAll('.page-section.active .count-up');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10) || 0;
      const duration = 800;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(ease * target);
        counter.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
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
  // RENDER DEVICES & CURRENTLY CONNECTED SIMS (Ready for real work)
  // --------------------------------------------------------------------------
  const devicesContainer = document.getElementById('devices-container');
  const overviewDevicesPreview = document.getElementById('overview-devices-preview');

  function buildDeviceCardHtml(device) {
    const isOnline = device.status === 'online';
    const mbToday = (device.todayTrafficBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    const speedStr = (device.currentSpeedKBps / 1024).toFixed(1) + ' МБ/с';

    // Render connected SIMs inside this device
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

          <div style="margin-top: 16px; text-align: right;">
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
      devicesContainer.innerHTML = devices.map(d => buildDeviceCardHtml(d)).join('');
    }

    if (overviewDevicesPreview) {
      // First 2 devices on Overview
      overviewDevicesPreview.innerHTML = devices.slice(0, 2).map(d => buildDeviceCardHtml(d)).join('');
    }

    // Update KPI numbers
    const kpiDevices = document.getElementById('kpi-devices-count');
    const kpiSims = document.getElementById('kpi-sims-count');
    if (kpiDevices) {
      kpiDevices.dataset.target = devices.length;
      kpiDevices.textContent = devices.length;
    }
    if (kpiSims) {
      let totalSims = 0;
      devices.forEach(d => {
        if (Array.isArray(d.simSlots)) totalSims += d.simSlots.length;
      });
      kpiSims.dataset.target = totalSims;
      kpiSims.textContent = totalSims;
    }
  }

  // --------------------------------------------------------------------------
  // FLUID MULTI-HARMONIC CANVAS WAVEFORM (Buttery Smooth 60 FPS)
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

      // 1. Draw glowing background grid lines
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

      // 2. Draw animated fluid sine waves
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

      // 3. Draw telemetry floating dots
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
    const todayStr = (data.totalTodayBytes / (1024 * 1024 * 1024)).toFixed(1) + ' ГБ';

    if (trafficSpeedDisplay) trafficSpeedDisplay.textContent = speedStr;
    if (trafficTodayDisplay) trafficTodayDisplay.textContent = todayStr;
    if (kpiSpeedDisplay) kpiSpeedDisplay.textContent = speedStr;
    if (kpiTrafficDisplay) kpiTrafficDisplay.textContent = todayStr;
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
