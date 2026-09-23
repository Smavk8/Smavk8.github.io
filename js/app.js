/**
 * Xylen Workspace - Application Controller & SPA Engine
 * Full-featured Product Workspace for SIM-testing managers and teams:
 * - Short typographic loader (00 — Loading)
 * - Count-up odometer animation for numbers
 * - Dynamic rendering for Testers, Devices, SIMs, Testing Lifecycle, Traffic, Releases
 * - Interactive test lifecycle simulation
 * - Modal inspectors for Testers & Devices
 * - Protected isolated Manager Admin gate
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
  // SCROLL PROGRESS & BACK TO TOP & REVEAL
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
  setTimeout(triggerScrollReveal, 100);

  // --------------------------------------------------------------------------
  // NUMBER COUNT-UP ODOMETER ENGINE
  // --------------------------------------------------------------------------
  function animateNumbers() {
    const counters = document.querySelectorAll('.page-section.active .count-up');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10) || 0;
      const duration = 900;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
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
  // SPA ROUTER & NAVIGATION
  // --------------------------------------------------------------------------
  const navButtons = document.querySelectorAll('.nav-page-btn[data-page]');
  const pageSections = document.querySelectorAll('.page-section');

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

    navButtons.forEach(btn => {
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

  function handleUrlHash() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const map = {
      'overview': 'page-overview',
      'home': 'page-overview',
      'testers': 'page-testers',
      'team': 'page-testers',
      'devices': 'page-devices',
      'sims': 'page-sims',
      'sim': 'page-sims',
      'testing': 'page-testing',
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
  // 02 — RENDER TESTERS (Команда тестирования)
  // --------------------------------------------------------------------------
  const testersContainer = document.getElementById('testers-list-container');

  function renderTesters() {
    if (!testersContainer || !window.activityStorage) return;
    const testers = window.activityStorage.getTesters();

    testersContainer.innerHTML = testers.map(t => {
      const statusClass = t.status === 'active' ? 'green' : (t.status === 'testing' ? 'cyan' : 'amber');
      return `
        <div class="tester-card" onclick="window.openTesterModal('${t.id}')">
          <div class="tester-card-header">
            <div class="tester-profile-info">
              <div class="avatar-circle">${t.avatar}</div>
              <div>
                <div class="tester-name">${t.name}</div>
                <div class="tester-role">${t.role}</div>
              </div>
            </div>
            <div class="card-status-badge">
              <span class="pulse-dot ${statusClass}"></span>
              <span>${t.statusLabel}</span>
            </div>
          </div>

          <div class="tester-stats-row">
            <div class="tester-stat-unit">
              <span class="t-stat-label">SIM-карт</span>
              <span class="t-stat-val">${t.simsCount} SIMs</span>
            </div>
            <div class="tester-stat-unit">
              <span class="t-stat-label">Тестов за сегодня</span>
              <span class="t-stat-val">${t.testsToday}</span>
            </div>
            <div class="tester-stat-unit">
              <span class="t-stat-label">Активность</span>
              <span class="t-stat-val">${t.lastActivity}</span>
            </div>
          </div>

          <div class="tester-card-footer">
            <span>Аппарат: <strong>${t.activeDevice}</strong></span>
            <span style="color:var(--cyan-electric); font-weight:700;">Инспектор ➔</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // --------------------------------------------------------------------------
  // 03 — RENDER DEVICES (Каждое устройство — живая история с Timeline)
  // --------------------------------------------------------------------------
  const devicesContainer = document.getElementById('devices-container');

  function renderDevices() {
    if (!devicesContainer || !window.activityStorage) return;
    const devices = window.activityStorage.getDevices();

    devicesContainer.innerHTML = devices.map(d => {
      const isOnline = d.status === 'online';
      const mbToday = (d.todayTrafficBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
      const speedStr = (d.currentSpeedKBps / 1024).toFixed(1) + ' Mbps';

      const timelineHtml = (d.timeline || []).map(item => `
        <div class="timeline-item">
          <span class="tl-time">${item.time}</span>
          <span class="tl-event">${item.event}</span>
          <span class="tl-desc">— ${item.desc}</span>
        </div>
      `).join('');

      return `
        <div class="device-story-card">
          <div class="device-card-header">
            <div class="device-title-box">
              <div class="device-model-name">${d.model}</div>
              <div class="device-os-pill">${d.deviceOs} • ${d.appVersion}</div>
            </div>
            <div class="card-status-badge">
              <span class="pulse-dot ${isOnline ? 'green' : 'amber'}"></span>
              <span>${isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>

          <div class="device-sim-banner">
            <div class="sim-banner-row">
              <span class="sim-carrier-name">${d.sim.carrierName}</span>
              <span class="code-pill">${d.sim.slot}</span>
            </div>
            <div class="sim-banner-row">
              <span>${d.sim.networkType} • ${d.sim.cellTower}</span>
              <span class="sim-signal-meter" style="color:var(--green-neon); font-weight:700;">${d.sim.signalDbm} dBm</span>
            </div>
            <div class="sim-banner-row" style="margin-top:6px; padding-top:6px; border-top:1px solid var(--border-subtle); font-size:0.75rem;">
              <span>Трафик: <strong>${mbToday}</strong></span>
              <span style="color:var(--cyan-electric); font-weight:700;">↓ ${speedStr}</span>
            </div>
          </div>

          <div class="device-timeline-wrap">
            <div class="timeline-heading">Live Event Timeline</div>
            <div class="timeline-list">
              ${timelineHtml}
            </div>
          </div>

          <div style="margin-top: 14px; text-align: right;">
            <button class="btn btn-secondary btn-compact" onclick="window.openDeviceModal('${d.id}')">
              Детальный инспектор ➔
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // --------------------------------------------------------------------------
  // 04 — RENDER SIMs (Паспортный реестр SIM-карт)
  // --------------------------------------------------------------------------
  const simsTableBody = document.getElementById('sims-table-body');
  const simFilterButtons = document.querySelectorAll('.sim-tab-btn[data-filter]');
  let currentSimFilter = 'all';

  function renderSims() {
    if (!simsTableBody || !window.activityStorage) return;
    const allSims = window.activityStorage.getSims();

    const filtered = allSims.filter(s => {
      if (currentSimFilter === 'all') return true;
      if (currentSimFilter === 'active') return s.status === 'active';
      if (currentSimFilter === 'testing') return s.status === 'testing';
      if (currentSimFilter === 'spare') return s.status === 'spare';
      return true;
    });

    const flagMap = {
      'FR': '🇫🇷',
      'UZ': '🇺🇿',
      'UK': '🇬🇧',
      'US': '🇺🇸'
    };

    simsTableBody.innerHTML = filtered.map(s => {
      const flag = flagMap[s.country] || '🌐';
      const statusColor = s.status === 'testing' ? 'var(--cyan-electric)' : (s.status === 'active' ? 'var(--green-neon)' : 'var(--text-muted)');

      return `
        <tr>
          <td>
            <div class="sim-carrier-cell">
              <span class="country-flag">${flag}</span>
              <span>${s.carrier}</span>
            </div>
          </td>
          <td><span class="code-pill">${s.slot}</span></td>
          <td>
            <div style="font-family:var(--font-mono); font-size:0.75rem;">
              <div>ICCID: ${s.iccid}</div>
              <div style="color:var(--text-muted);">IMSI: ${s.imsi}</div>
            </div>
          </td>
          <td>
            <div style="font-weight:700;">${s.network}</div>
            <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--green-neon);">${s.signalDbm} dBm</div>
          </td>
          <td style="font-family:var(--font-mono); font-size:0.75rem;">${s.tower}</td>
          <td>
            <div style="font-weight:600;">${s.assignedDevice}</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">Тестировщик: ${s.assignedTester}</div>
          </td>
          <td>
            <span style="color:${statusColor}; font-weight:700; font-size:0.78rem;">
              ● ${s.statusLabel}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  simFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      simFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSimFilter = btn.dataset.filter;
      renderSims();
    });
  });

  // --------------------------------------------------------------------------
  // 05 — TESTING LIFECYCLE SIMULATOR (Benchmark Shakuro / Jitter)
  // --------------------------------------------------------------------------
  let lifecycleRunning = false;
  window.runLifecycleSimulation = function() {
    if (lifecycleRunning) return;
    lifecycleRunning = true;

    const steps = [
      { id: 'step-detected', text: '[STEP 1/5] Фиксация SIM-карты в слоте: Orange France LTE Cat.19 (ICCID: 8933-0145-...)' },
      { id: 'step-connected', text: '[STEP 2/5] Авторизация устройства в ядре Xylen: AES-256 ключ подтвержден, токен сессии активен.' },
      { id: 'step-testing', text: '[STEP 3/5] Запуск контрольной сессии: передача 24-байтных микро-дельта пакетов скорости.' },
      { id: 'step-collecting', text: '[STEP 4/5] Сбор сетевой телеметрии: задержка 0 мс, RSRP -78 dBm, TAC 55102, CID 89211.' },
      { id: 'step-completed', text: '[STEP 5/5] Тест успешно завершен: 100% паритет биллинга, результат внесен в реестр платформы.' }
    ];

    const logArea = document.getElementById('lifecycle-log-area');
    const clockEl = document.getElementById('console-clock');
    const runBtn = document.getElementById('btn-run-lifecycle-test');

    if (runBtn) {
      runBtn.disabled = true;
      runBtn.textContent = '⏳ Выполнение тестового цикла...';
    }

    if (logArea) {
      logArea.innerHTML = `<div class="log-line text-cyan">[START] Инициализация контрольного цикла SIM-тестирования...</div>`;
    }

    let currentIndex = 0;

    function nextStep() {
      if (clockEl) {
        clockEl.textContent = new Date().toLocaleTimeString();
      }

      // Reset all steps
      steps.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el) {
          el.classList.toggle('active', i === currentIndex);
          el.classList.toggle('completed', i < currentIndex);
        }
      });

      const current = steps[currentIndex];
      if (logArea && current) {
        const line = document.createElement('div');
        line.className = 'log-line text-green';
        line.textContent = current.text;
        logArea.appendChild(line);
        logArea.scrollTop = logArea.scrollHeight;
      }

      currentIndex++;
      if (currentIndex < steps.length) {
        setTimeout(nextStep, 900);
      } else {
        setTimeout(() => {
          const finalEl = document.getElementById('step-completed');
          if (finalEl) {
            finalEl.classList.remove('active');
            finalEl.classList.add('completed');
          }
          if (runBtn) {
            runBtn.disabled = false;
            runBtn.textContent = '▶ Запустить контрольный цикл теста';
          }
          lifecycleRunning = false;
          window.showToast('Контрольный цикл тестирования успешно завершен!');
        }, 1000);
      }
    }

    nextStep();
  };

  // --------------------------------------------------------------------------
  // 06 — TRAFFIC WAVEFORM & LIVE PULSE
  // --------------------------------------------------------------------------
  const trafficAreaPath = document.getElementById('traffic-area-path');
  const trafficLinePath = document.getElementById('traffic-line-path');
  const trafficSpeedDisplay = document.getElementById('traffic-live-speed');
  const trafficTodayDisplay = document.getElementById('traffic-live-today');
  const overviewSpeedDisplay = document.getElementById('overview-live-speed');
  const overviewTodayDisplay = document.getElementById('overview-live-today');

  let waveOffset = 0;
  function updateWave() {
    waveOffset += 0.05;
    const y1 = 120 + Math.sin(waveOffset) * 25;
    const y2 = 90 + Math.cos(waveOffset * 1.3) * 30;
    const y3 = 140 + Math.sin(waveOffset * 0.9) * 20;

    const lineD = `M0,150 Q150,${y1} 300,${y2} T600,${y3} T800,110`;
    const areaD = `${lineD} L800,200 L0,200 Z`;

    if (trafficLinePath) trafficLinePath.setAttribute('d', lineD);
    if (trafficAreaPath) trafficAreaPath.setAttribute('d', areaD);

    requestAnimationFrame(updateWave);
  }
  requestAnimationFrame(updateWave);

  window.addEventListener('xylen:live-pulse', (e) => {
    const data = e.detail;
    if (!data) return;

    const speedMbps = ((data.totalSpeedKBps * 8) / 1024).toFixed(1) + ' Мбит/с';
    const todayGb = (data.totalTodayBytes / (1024 * 1024 * 1024)).toFixed(2) + ' ГБ';

    if (trafficSpeedDisplay) trafficSpeedDisplay.textContent = speedMbps;
    if (trafficTodayDisplay) trafficTodayDisplay.textContent = todayGb;
    if (overviewSpeedDisplay) overviewSpeedDisplay.textContent = (data.totalSpeedKBps / 1024).toFixed(1) + ' МБ/с';
    if (overviewTodayDisplay) overviewTodayDisplay.textContent = todayGb;
  });

  // --------------------------------------------------------------------------
  // 07 — RENDER RELEASES (Release Center)
  // --------------------------------------------------------------------------
  const latestReleaseContainer = document.getElementById('latest-release-container');
  const archiveReleasesContainer = document.getElementById('releases-archive-container');

  function renderReleases() {
    if (!latestReleaseContainer || !window.versionStorage) return;
    const latest = window.versionStorage.getLatest();
    const all = window.versionStorage.getAll();

    if (latest) {
      latestReleaseContainer.innerHTML = `
        <div class="release-card-top">
          <div>
            <div class="release-version-title">${latest.versionDisplay}</div>
            <div class="release-date-sub">Официальный релиз • ${latest.releaseDate}</div>
          </div>
          <span class="card-status-badge">
            <span class="pulse-dot green"></span>
            <span>АКТУАЛЬНЫЙ РЕЛИЗ</span>
          </span>
        </div>

        <p style="color:var(--text-secondary); margin-bottom: 20px; font-size:0.95rem;">
          ${latest.summary}
        </p>

        <div class="release-actions-grid">
          <!-- Android Option -->
          <div class="download-option-box">
            <div class="opt-header">
              <img src="assets/icon-android.svg" alt="Android" class="platform-logo-svg">
              <div>
                <div class="opt-name">Google Android APK</div>
                <div class="opt-meta">${latest.android.fileSize} • ${latest.android.osReq}</div>
              </div>
            </div>
            <div style="display:flex; gap:8px;">
              <a href="${latest.android.downloadUrl}" class="btn btn-cyan btn-compact" style="flex:1;">
                Скачать APK
              </a>
              <button class="btn btn-secondary btn-compact" onclick="window.openQrModal('${latest.android.downloadUrl}', 'Android APK Release v5.2')">
                QR
              </button>
            </div>
          </div>

          <!-- iOS Option -->
          <div class="download-option-box">
            <div class="opt-header">
              <img src="assets/icon-ios.svg" alt="iOS" class="platform-logo-svg">
              <div>
                <div class="opt-name">Apple iPhone IPA</div>
                <div class="opt-meta">${latest.ios.fileSize} • ${latest.ios.osReq}</div>
              </div>
            </div>
            <div style="display:flex; gap:8px;">
              <a href="${latest.ios.downloadUrl}" class="btn btn-cyan btn-compact" style="flex:1;">
                Установить IPA
              </a>
              <button class="btn btn-secondary btn-compact" onclick="window.openQrModal('${latest.ios.downloadUrl}', 'iOS IPA Release v5.2')">
                QR
              </button>
            </div>
          </div>
        </div>

        <div class="whats-new-list">
          <div class="whats-new-heading">Что нового в сборке v5.2:</div>
          ${latest.changelog.map(item => `
            <div class="whats-new-item">${item.text}</div>
          `).join('')}
        </div>
      `;
    }

    if (archiveReleasesContainer) {
      const archives = all.filter(r => r.status === 'archive');
      archiveReleasesContainer.innerHTML = archives.map(arch => `
        <div class="archive-card">
          <div>
            <div style="font-weight:700; color:var(--text-primary); font-size:0.92rem;">
              ${arch.versionDisplay}
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${arch.releaseDate} • ${arch.summary}</div>
          </div>
          <div style="display:flex; gap:6px;">
            <a href="${arch.android.downloadUrl}" class="btn btn-secondary btn-compact" style="font-size:0.74rem;">APK</a>
            <a href="${arch.ios.downloadUrl}" class="btn btn-secondary btn-compact" style="font-size:0.74rem;">IPA</a>
          </div>
        </div>
      `).join('');
    }
  }

  // --------------------------------------------------------------------------
  // MODALS: TESTER, DEVICE, ADMIN, QR
  // --------------------------------------------------------------------------
  const testerModal = document.getElementById('tester-modal');
  const modalTesterAvatar = document.getElementById('modal-tester-avatar');
  const modalTesterName = document.getElementById('modal-tester-name');
  const modalTesterRole = document.getElementById('modal-tester-role');
  const modalTesterSpec = document.getElementById('modal-tester-spec');
  const modalTesterDevice = document.getElementById('modal-tester-device');
  const modalTesterTask = document.getElementById('modal-tester-task');
  const modalTesterSimsCount = document.getElementById('modal-tester-sims-count');

  window.openTesterModal = function(testerId) {
    if (!window.activityStorage || !testerModal) return;
    const testers = window.activityStorage.getTesters();
    const t = testers.find(x => x.id === testerId);
    if (!t) return;

    if (modalTesterAvatar) modalTesterAvatar.textContent = t.avatar;
    if (modalTesterName) modalTesterName.textContent = t.name;
    if (modalTesterRole) modalTesterRole.textContent = t.role;
    if (modalTesterSpec) modalTesterSpec.textContent = t.role + ' (Field Operations)';
    if (modalTesterDevice) modalTesterDevice.textContent = t.activeDevice;
    if (modalTesterTask) modalTesterTask.textContent = t.notes;
    if (modalTesterSimsCount) modalTesterSimsCount.textContent = t.simsCount + ' SIMs (' + t.testsToday + ' тестов сегодня)';

    testerModal.classList.add('active');
  };

  window.closeTesterModal = function() {
    if (testerModal) testerModal.classList.remove('active');
  };

  // Device Modal
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
    if (devModalSub) devModalSub.textContent = `${d.deviceOs} • ${d.appVersion} • Ответственный: ${d.assignedTester}`;

    if (devModalBody) {
      devModalBody.innerHTML = `
        <div class="inspector-item-row">
          <span class="inspector-label">Оператор и Слот:</span>
          <span class="inspector-val cyan">${d.sim.carrierName} (${d.sim.slot})</span>
        </div>
        <div class="inspector-item-row">
          <span class="inspector-label">Стандарт и Мощность:</span>
          <span class="inspector-val">${d.sim.networkType} • ${d.sim.signalDbm} dBm</span>
        </div>
        <div class="inspector-item-row">
          <span class="inspector-label">Базовая вышка:</span>
          <span class="inspector-val">${d.sim.cellTower}</span>
        </div>
        <div class="inspector-item-row">
          <span class="inspector-label">IP-адрес терминала:</span>
          <span class="inspector-val" style="font-family:var(--font-mono);">${d.sim.ipAddress}</span>
        </div>
        <div class="inspector-item-row">
          <span class="inspector-label">ICCID серийный номер:</span>
          <span class="inspector-val" style="font-family:var(--font-mono);">${d.sim.iccid}</span>
        </div>
        <div class="inspector-item-row">
          <span class="inspector-label">IMSI абонента:</span>
          <span class="inspector-val" style="font-family:var(--font-mono);">${d.sim.imsi}</span>
        </div>
        <div class="inspector-item-row">
          <span class="inspector-label">Трафик за сессию:</span>
          <span class="inspector-val">${(d.todayTrafficBytes / (1024 * 1024)).toFixed(1)} МБ</span>
        </div>
      `;
    }

    deviceModal.classList.add('active');
  };

  window.closeDeviceModal = function() {
    if (deviceModal) deviceModal.classList.remove('active');
  };

  // Admin PIN Modal
  const adminAuthModal = document.getElementById('admin-auth-modal');
  const adminPinInput = document.getElementById('admin-pin-input');
  const adminAuthError = document.getElementById('admin-auth-error');

  window.requestAdminConsole = function() {
    if (window.activityStorage && window.activityStorage.isAdmin()) {
      window.switchPage('page-admin');
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
      document.body.classList.add('admin-authenticated');
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
      if (e.key === 'Enter') {
        window.submitAdminPin();
      }
    });
  }

  window.logoutAdminConsole = function() {
    if (window.activityStorage) {
      window.activityStorage.logoutAdmin();
      document.body.classList.remove('admin-authenticated');
      window.switchPage('page-overview');
      window.showToast('Сессия администратора завершена.');
    }
  };

  // Render Admin Visitors
  const adminVisitorsTbody = document.getElementById('admin-visitors-tbody');
  window.renderAdminVisitors = function() {
    if (!adminVisitorsTbody || !window.activityStorage) return;
    const visits = window.activityStorage.getWebVisitors();

    adminVisitorsTbody.innerHTML = visits.map(v => `
      <tr>
        <td style="font-family:var(--font-mono); font-size:0.75rem;">${new Date(v.timestamp).toLocaleTimeString()}</td>
        <td><strong>${v.device}</strong></td>
        <td><span class="code-pill">${v.ip}</span></td>
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
    if (qrTitle) qrTitle.textContent = title || 'QR-код загрузки';
    if (qrUrlText) qrUrlText.textContent = url;
    if (qrDirectLink) qrDirectLink.href = url;

    if (qrBox && typeof QRCode !== 'undefined') {
      qrBox.innerHTML = '';
      new QRCode(qrBox, {
        text: url,
        width: 164,
        height: 164,
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

  // Initial Data Render
  renderTesters();
  renderDevices();
  renderSims();
  renderReleases();
  handleUrlHash();
});
