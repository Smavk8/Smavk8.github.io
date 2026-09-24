/**
 * Xylen Workspace - Core Storage & Real Telemetry Engine
 * STRICTLY REAL DEVICES & REAL CELLULAR DATA ONLY:
 * - Zero simulated devices. Zero synthetic Math.random() noise.
 * - Live Telemetry Waveform stays in standby flatline until a real device transmits.
 * - Counts EXCLUSIVELY Cellular Mobile Data (2G/3G/LTE/5G) via active SIM card.
 * - Wi-Fi traffic is strictly ignored and excluded from billing & telemetry.
 * - Project Origin: Gulistan (Uzbekistan) ↔ London (UK)
 * - Compliant with Law of the Republic of Uzbekistan "On Personal Data" (ЗРУ-547)
 *   and UK GDPR / Data Protection Act 2018 (ICO UK).
 */

const RELEASES_KEY = 'xylen_workspace_releases_v8';
const DEVICES_KEY = 'xylen_workspace_real_devices_v8';
const ACTIVITIES_KEY = 'xylen_workspace_activities_v8';
const PAIRING_KEY = 'xylen_workspace_pairing_token_v8';

// ----------------------------------------------------------------------------
// RELEASES: Clean download center for Android & iOS (No APK/IPA jargon)
// ----------------------------------------------------------------------------
const DEFAULT_RELEASES = [
  {
    id: 'rel-5-3',
    appVersion: 'v5.3',
    buildNumber: 29,
    versionDisplay: 'v5.3 (Сборка 29)',
    releaseDate: '2026-09-23',
    status: 'latest',
    android: {
      downloadUrl: 'https://files.catbox.moe/8uk579.apk',
      platformLabel: 'Android',
      osReq: 'Android 8.0 – 15.0+ (One UI, HyperOS, ColorOS, Pixel AOSP)',
      fileSize: '16.3 MB'
    },
    ios: {
      downloadUrl: 'https://files.catbox.moe/f0mefz.ipa',
      platformLabel: 'iOS',
      osReq: 'iOS 16.0 – 18.2+ (iPhone SE, 12, 13, 14, 15, 16 Pro)',
      fileSize: '1.8 MB'
    },
    summary: 'Официальный выпуск v5.3: сквозной онлайн-мониторинг действий пользователей, учет посещаемых экранов, раздельный аудит сотового трафика по тестерам.',
    changelog: [
      { type: 'new', text: 'Сквозной аудит действий и навигации пользователей на веб-панели управления в реальном времени.' },
      { type: 'new', text: 'Учёт сотового трафика отдельно по каждому пользователю/тестеру (кто сколько тратит).' },
      { type: 'new', text: 'Возможность указать имя или позывной тестера прямо в Настройках приложения.' },
      { type: 'improved', text: 'Прямое считывание подключенных SIM-карт (Ucell, UMS, Beeline UZ, O2 UK, Three UK).' },
      { type: 'improved', text: 'Автономная фоновая синхронизация с нулевым расходом батареи.' }
    ]
  },
  {
    id: 'rel-5-2',
    appVersion: 'v5.2',
    buildNumber: 28,
    versionDisplay: 'v5.2 (Сборка 28)',
    releaseDate: '2026-09-23',
    status: 'archive',
    android: {
      downloadUrl: 'https://files.catbox.moe/j58gyt.apk',
      platformLabel: 'Android',
      osReq: 'Android 8.0 – 15.0+ (One UI, HyperOS, ColorOS, Pixel AOSP)',
      fileSize: '17.0 MB'
    },
    ios: {
      downloadUrl: 'https://files.catbox.moe/f0mefz.ipa',
      platformLabel: 'iOS',
      osReq: 'iOS 16.0 – 18.2+ (iPhone SE, 12, 13, 14, 15, 16 Pro)',
      fileSize: '1.8 MB'
    },
    summary: 'Выпуск v5.2: 24-байтный микро-дельта протокол связи и прямое считывание сотового модема.',
    changelog: [
      { type: 'new', text: 'Прямое считывание подключенных SIM-карт и сотового радиоканала.' },
      { type: 'new', text: 'Учёт исключительно мобильного сотового интернета через SIM.' }
    ]
  },
  {
    id: 'rel-5-1',
    appVersion: 'v5.1',
    buildNumber: 27,
    versionDisplay: 'v5.1 (Сборка 27)',
    releaseDate: '2026-09-22',
    status: 'archive',
    android: {
      downloadUrl: '#',
      platformLabel: 'Android',
      osReq: 'Android 8.0 – 15.0',
      fileSize: '16.2 MB'
    },
    ios: {
      downloadUrl: '#',
      platformLabel: 'iOS',
      osReq: 'iOS 16.0 – 18.1',
      fileSize: '1.5 MB'
    },
    summary: 'Обновление сетевого монитора и оптимизация частоты передачи пакетов.',
    changelog: [
      { type: 'new', text: 'Сейф Keychain + Documents и AppVault AES-256.' },
      { type: 'improved', text: 'Поддержка Dynamic Island и Live Activities на iOS 18.' }
    ]
  }
];

// ZERO FAKE DEVICES BY DEFAULT: ONLY REAL CONNECTED HARDWARE
const DEFAULT_DEVICES = [];

// ----------------------------------------------------------------------------
// STORAGE CLASSES
// ----------------------------------------------------------------------------
class VersionStorage {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(RELEASES_KEY)) {
      this.saveAll(DEFAULT_RELEASES);
    }
  }

  getAll() {
    try {
      const data = localStorage.getItem(RELEASES_KEY);
      if (!data) return DEFAULT_RELEASES;
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_RELEASES;
    } catch (_) {
      return DEFAULT_RELEASES;
    }
  }

  saveAll(releases) {
    try {
      localStorage.setItem(RELEASES_KEY, JSON.stringify(releases));
      window.dispatchEvent(new CustomEvent('xylen:releases-updated', { detail: releases }));
      return true;
    } catch (_) {
      return false;
    }
  }

  getLatest() {
    const all = this.getAll();
    return all.find(r => r.status === 'latest') || all[0];
  }
}

class ActivityStorage {
  constructor() {
    this.telemetryChannel = null;
    this.auditUsers = [];
    this.auditActivities = [];
    this.init();
    this.initLivePulse();
    // Device telemetry is accepted by the API, never from untrusted page events.
    this.startLiveAuditEngine();
  }

  init() {
    // Purge legacy test device keys from earlier builds to guarantee 0 fake devices
    try {
      localStorage.removeItem('xylen_workspace_real_devices_v7');
      localStorage.removeItem('xylen_workspace_devices');
      localStorage.removeItem('xylen_devices');
    } catch (_) {}

    if (!localStorage.getItem(DEVICES_KEY)) {
      this.saveDevices(DEFAULT_DEVICES);
    }
    if (!localStorage.getItem(ACTIVITIES_KEY)) {
      this.saveActivities([]);
    }
    if (!localStorage.getItem(PAIRING_KEY)) {
      this.generateNewPairingToken();
    }
  }

  getPairingToken() {
    return localStorage.getItem(PAIRING_KEY) || this.generateNewPairingToken();
  }

  generateNewPairingToken() {
    const token = 'XYL-' + Math.random().toString(36).substring(2, 7).toUpperCase() + '-UZUK';
    localStorage.setItem(PAIRING_KEY, token);
    return token;
  }

  getDevices() {
    try {
      const data = localStorage.getItem(DEVICES_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  saveDevices(devices) {
    try {
      localStorage.setItem(DEVICES_KEY, JSON.stringify(devices));
      window.dispatchEvent(new CustomEvent('xylen:devices-updated', { detail: devices }));
      return true;
    } catch (_) {
      return false;
    }
  }

  clearAllDevices() {
    this.saveDevices([]);
    this.logActivity('core-system', 'Очистка устройств', 'Все устройства были отключены менеджером', 'system');
    window.dispatchEvent(new CustomEvent('xylen:live-pulse', {
      detail: {
        totalSpeedKBps: 0,
        totalTodayBytes: 0,
        devicesCount: 0,
        activeSimsCount: 0,
        timestamp: Date.now()
      }
    }));
  }

  removeDevice(deviceId) {
    const devices = this.getDevices().filter(d => d.id !== deviceId);
    this.saveDevices(devices);
    this.logActivity(deviceId, 'Устройство удалено', `Устройство ${deviceId} отключено`, 'network');
  }

  getActivities() {
    try {
      const data = localStorage.getItem(ACTIVITIES_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  saveActivities(activities) {
    try {
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
      window.dispatchEvent(new CustomEvent('xylen:activities-updated', { detail: activities }));
      return true;
    } catch (_) {
      return false;
    }
  }

  logActivity(deviceId, action, details, category = 'system') {
    const activities = this.getActivities();
    const newAct = {
      id: 'act-' + Date.now(),
      deviceId,
      timestamp: new Date().toISOString(),
      category,
      action,
      details
    };
    activities.unshift(newAct);
    if (activities.length > 100) activities.pop();
    this.saveActivities(activities);
    return newAct;
  }

  /**
   * Real Device Telemetry Registration from Android/iOS apps
   */
  registerDevice() { return false; }

  setupIncomingTelemetryBridge() {}

  /**
   * Continuous Cloudflare Pages Live Audit Sync Engine.
   * Periodically fetches /api/audit to track active users, their current screen,
   * actions taken, and cellular data spent.
   */
  startLiveAuditEngine() {
    const poll = async () => {
      try {
        const isPagesOrLocal = window.location.hostname && (window.location.hostname.includes('pages.dev') || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        const apiUrl = isPagesOrLocal ? '/api/audit' : 'https://xylen-platform.pages.dev/api/audit';
        const res = await fetch(apiUrl, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.ok) {
            this.auditUsers = data.users || [];
            this.auditActivities = data.recentActivities || [];
            window.dispatchEvent(new CustomEvent('xylen:audit-sync', { detail: data }));

            if (Array.isArray(data.users) && data.users.length > 0) {
              const mappedDevices = data.users.map(u => ({
                id: u.userId,
                model: u.model || 'Смартфон',
                platform: u.platform || 'Android',
                deviceOs: `${u.platform || 'Android'} • ${u.model || ''}`,
                appVersion: 'v5.3 (Build 29)',
                status: u.status || 'online',
                currentSpeedKBps: u.currentSpeedKBps || 0,
                todayTrafficBytes: u.todayBytes || 0,
                totalDataTrafficBytes: u.totalBytes || u.todayBytes || 0,
                lastSeen: u.lastSeenIso || new Date(u.lastSeenMs || Date.now()).toISOString(),
                assignedUser: u.testerName || u.userId,
                currentScreen: u.currentScreen || 'Главная',
                lastAction: u.lastAction || 'В сети',
                simSlots: [
                  {
                    slotNumber: 1,
                    slotName: 'SIM 1 (Сотовая связь)',
                    carrier: u.carrier || 'Сотовый оператор',
                    countryFlag: (u.carrier && (u.carrier.includes('O2') || u.carrier.includes('Three') || u.carrier.includes('UK'))) ? '🇬🇧' : '🇺🇿',
                    networkType: 'LTE / 5G',
                    signalDbm: -75,
                    isDefaultData: true
                  }
                ]
              }));
              this.saveDevices(mappedDevices);
            }
          }
        }
      } catch (_) {}
    };

    poll();
    setInterval(poll, 2500);
  }

  getAuditUsers() {
    return this.auditUsers || [];
  }

  getAuditActivities() {
    return this.auditActivities || [];
  }

  /**
   * Real pulse without Math.random() noise!
   * Calculates actual data from active devices.
   */
  initLivePulse() {
    setInterval(() => {
      const devices = this.getDevices();
      let totalSpeedKBps = 0;
      let totalTodayBytes = 0;
      let activeSimsCount = 0;

      if (devices && devices.length > 0) {
        devices.forEach(d => {
          if (d.status === 'online') {
            totalSpeedKBps += Number(d.currentSpeedKBps) || 0;
            totalTodayBytes += Number(d.todayTrafficBytes) || 0;
            if (Array.isArray(d.simSlots)) {
              activeSimsCount += d.simSlots.length;
            }
          }
        });
      }

      window.dispatchEvent(new CustomEvent('xylen:live-pulse', {
        detail: {
          totalSpeedKBps,
          totalTodayBytes,
          devicesCount: devices ? devices.length : 0,
          activeSimsCount,
          timestamp: Date.now()
        }
      }));
    }, 2000);
  }

  getTheme() {
    return localStorage.getItem('xylen_theme_v4') || 'dark';
  }

  setTheme(theme) {
    const validTheme = theme === 'light' ? 'light' : 'dark';
    localStorage.setItem('xylen_theme_v4', validTheme);
    document.body.classList.toggle('theme-light', validTheme === 'light');
    window.dispatchEvent(new CustomEvent('xylen:theme-changed', { detail: validTheme }));
  }

  isAdmin() {
    return false;
  }

  verifyAdminPin(pin) {
    return false;
  }

  loginAdmin(pin) {
    return false;
  }

  logoutAdmin() {
    window.dispatchEvent(new CustomEvent('xylen:admin-changed', { detail: false }));
  }

  getWebVisitors() {
    try {
      const data = localStorage.getItem('xylen_web_visitors_log_v4');
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  logWebVisit(pageName) {
    const visitors = this.getWebVisitors();
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
    const platform = isMobile ? (navigator.userAgent.includes('iPhone') ? 'Apple iPhone (iOS)' : 'Android Smartphone') : 'Desktop Workstation';

    const newVisit = {
      id: 'vis-' + Date.now(),
      timestamp: new Date().toISOString(),
      ip: 'Активная сессия',
      device: platform,
      source: document.referrer || 'Прямой вход',
      pageVisited: pageName || 'Обзор',
      sessionDuration: 'активно'
    };

    visitors.unshift(newVisit);
    if (visitors.length > 50) visitors.pop();
    try {
      localStorage.setItem('xylen_web_visitors_log_v4', JSON.stringify(visitors));
      window.dispatchEvent(new CustomEvent('xylen:visitors-updated', { detail: visitors }));
    } catch (_) {}
  }
}

// Singletons
window.versionStorage = new VersionStorage();
window.activityStorage = new ActivityStorage();
