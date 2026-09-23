/**
 * Xylen Workspace - Data & Telemetry Storage Engine
 * Dedicated Product Workspace for SIM-testing managers and teams:
 * Entities: Testers, Devices, SIMs, Testing Lifecycle, Traffic, Releases.
 * Supports: Hot-swap SIMs, real-time live delta simulation,
 * dual themes (Dark/Light), and isolated Master Admin audit.
 */

const STORAGE_KEY = 'xylen_workspace_releases_v5';
const DEVICES_STORAGE_KEY = 'xylen_workspace_devices_v5';
const TESTERS_STORAGE_KEY = 'xylen_workspace_testers_v5';
const SIMS_STORAGE_KEY = 'xylen_workspace_sims_v5';
const ACTIVITIES_STORAGE_KEY = 'xylen_workspace_activities_v5';
const DAILY_TRAFFIC_STORAGE_KEY = 'xylen_workspace_daily_traffic_v5';

// ----------------------------------------------------------------------------
// RELEASES: Clean download center for Android APK & iOS IPA
// ----------------------------------------------------------------------------
const DEFAULT_RELEASES = [
  {
    id: 'rel-5-2',
    appVersion: 'v5.2',
    buildNumber: 28,
    versionDisplay: 'v5.2 (Сборка 28)',
    releaseDate: '2026-09-23',
    status: 'latest',
    android: {
      downloadUrl: 'https://files.catbox.moe/app-release.apk',
      fileName: 'app-release.apk',
      fileSize: '17.0 MB',
      osReq: 'Android 8.0 – 15.0+ (One UI, HyperOS, AOSP)'
    },
    ios: {
      downloadUrl: 'https://files.catbox.moe/rw65px.ipa',
      fileName: 'XylenSimMonitor.ipa',
      fileSize: '1.6 MB',
      osReq: 'iOS 16.0 – 18.2+'
    },
    summary: 'Рабочий релиз для менеджеров и тестировщиков: автодетектирование SIM-слотов, 24-байтные микро-дельта пакеты телеметрии и устойчивая фоновая синхронизация.',
    changelog: [
      { type: 'new', text: 'Улучшенное автодетектирование SIM: мгновенная фиксация горячей замены карты и слота.' },
      { type: 'new', text: 'Фоновая синхронизация телеметрии без расхода батареи (<0.1% в сутки).' },
      { type: 'improved', text: 'Сжатие сетевых пакетов до 24 байт (дельта-протокол Xylen Core).' },
      { type: 'improved', text: 'Аппаратное шифрование AES-256-GCM на Android и Apple Keychain Vault на iOS.' }
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
      fileName: 'app-v5.1-b27.apk',
      fileSize: '16.2 MB',
      osReq: 'Android 8.0 – 15.0'
    },
    ios: {
      downloadUrl: '#',
      fileName: 'XylenSimMonitor-v5.1.ipa',
      fileSize: '1.5 MB',
      osReq: 'iOS 16.0 – 18.1'
    },
    summary: 'Обновление движка фонового трекинга и интеграция Live Speed графика.',
    changelog: [
      { type: 'new', text: 'Постоянный сейф Apple Keychain + Documents и AppVault.' },
      { type: 'improved', text: 'Отображение текущей скорости канала в строке статуса.' }
    ]
  },
  {
    id: 'rel-5-0',
    appVersion: 'v5.0',
    buildNumber: 25,
    versionDisplay: 'v5.0 (Сборка 25)',
    releaseDate: '2026-09-18',
    status: 'archive',
    android: {
      downloadUrl: '#',
      fileName: 'app-v5.0-b25.apk',
      fileSize: '15.8 MB',
      osReq: 'Android 8.0 – 14.0'
    },
    ios: {
      downloadUrl: '#',
      fileName: 'XylenSimMonitor-v5.0.ipa',
      fileSize: '1.2 MB',
      osReq: 'iOS 16.0 – 17.5'
    },
    summary: 'Базовая архитектура клиента мониторинга SIM-карт и сотовой сети.',
    changelog: [
      { type: 'new', text: 'Первая версия сетевого монитора TrafficMonitor.' },
      { type: 'new', text: 'Сбор параметров сотовой вышки (CID, TAC, MNC, MCC).' }
    ]
  }
];

// ----------------------------------------------------------------------------
// TESTERS (Команда тестирования — как на ладони)
// ----------------------------------------------------------------------------
const DEFAULT_TESTERS = [
  {
    id: 't-akmal',
    name: 'Akmal',
    role: 'Lead Field Tester',
    avatar: 'A',
    status: 'active',
    statusLabel: 'Active',
    simsCount: 8,
    testsToday: 3,
    lastActivity: '2m ago',
    activeDevice: 'iPhone 16 Pro Max',
    notes: 'Тестирование Orange France в международном роуминге LTE.'
  },
  {
    id: 't-sardor',
    name: 'Sardor',
    role: '5G Core Tester',
    avatar: 'S',
    status: 'active',
    statusLabel: 'Active',
    simsCount: 6,
    testsToday: 5,
    lastActivity: '6m ago',
    activeDevice: 'Samsung Galaxy S24 Ultra',
    notes: 'Проверка агрегации 5G NR NSA и стресс-тест скорости.'
  },
  {
    id: 't-elena',
    name: 'Elena',
    role: 'Roaming & Billing QA',
    avatar: 'E',
    status: 'testing',
    statusLabel: 'Testing',
    simsCount: 12,
    testsToday: 7,
    lastActivity: 'just now',
    activeDevice: 'iPhone 15 Pro',
    notes: 'Сверка списаний трафика оператором Vodafone UK.'
  },
  {
    id: 't-dmitriy',
    name: 'Dmitriy',
    role: 'RF Drive Tester',
    avatar: 'D',
    status: 'active',
    statusLabel: 'Active',
    simsCount: 4,
    testsToday: 2,
    lastActivity: '18m ago',
    activeDevice: 'Xiaomi 14 Pro',
    notes: 'Замер покрытия сотовой вышки Mobiuz в городской застройке.'
  },
  {
    id: 't-jamshid',
    name: 'Jamshid',
    role: 'SIM Provisioning',
    avatar: 'J',
    status: 'waiting',
    statusLabel: 'Waiting',
    simsCount: 5,
    testsToday: 1,
    lastActivity: '42m ago',
    activeDevice: 'Standby Rack',
    notes: 'Ожидание активации нового пула eSIM T-Mobile.'
  },
  {
    id: 't-farrukh',
    name: 'Farrukh',
    role: 'Multi-SIM Stress Tester',
    avatar: 'F',
    status: 'testing',
    statusLabel: 'Testing',
    simsCount: 7,
    testsToday: 4,
    lastActivity: '4m ago',
    activeDevice: 'Samsung Galaxy A55',
    notes: 'Стресс-тест переключения Dual-SIM слотов O2 UK.'
  }
];

// ----------------------------------------------------------------------------
// DEVICES (Каждое устройство — живая история с Timeline)
// ----------------------------------------------------------------------------
const DEFAULT_DEVICES = [
  {
    id: 'dev-ip16pm',
    model: 'iPhone 16 Pro Max',
    platform: 'ios',
    deviceOs: 'iOS 18.2',
    appVersion: 'v5.2 (Build 28)',
    status: 'online',
    currentSpeedKBps: 2450,
    todayTrafficBytes: 5175656448, // 4.82 GB
    totalDataTrafficBytes: 24194056192,
    assignedTester: 'Akmal',
    sim: {
      carrierName: 'Orange France',
      slot: 'Slot 1',
      slotType: 'Nano-SIM',
      networkType: 'LTE Cat.19',
      signalDbm: -78,
      cellTower: 'CID 89211 • TAC 55102',
      ipAddress: '10.142.8.214',
      imsi: '208-01-992144810',
      iccid: '8933-0145-8821-9041-22'
    },
    timeline: [
      { time: '09:31', event: 'Connected', desc: 'Устройство подключено к Xylen Platform' },
      { time: '09:34', event: 'Test started', desc: 'Запущен плановый тест задержки и дельта-пакетов' },
      { time: '09:42', event: 'Network changed', desc: 'Хэндовер LTE Band 3 → Band 7 (TAC 55102)' },
      { time: '09:46', event: 'Test completed', desc: 'Тест завершен без расхождений по биллингу' }
    ]
  },
  {
    id: 'dev-s24u',
    model: 'Samsung Galaxy S24 Ultra',
    platform: 'android',
    deviceOs: 'Android 15 (One UI 7)',
    appVersion: 'v5.2 (Build 28)',
    status: 'online',
    currentSpeedKBps: 18600,
    todayTrafficBytes: 6603538432, // 6.15 GB
    totalDataTrafficBytes: 31200984064,
    assignedTester: 'Sardor',
    sim: {
      carrierName: 'Ucell UZ',
      slot: 'Slot 1',
      slotType: 'Nano-SIM',
      networkType: '5G NR NSA',
      signalDbm: -64,
      cellTower: 'CID 11042 • TAC 12401',
      ipAddress: '10.220.14.99',
      imsi: '434-05-881230491',
      iccid: '8999-8041-5520-1192-34'
    },
    timeline: [
      { time: '09:15', event: 'Connected', desc: 'Устройство авторизовано в защищенной сети' },
      { time: '09:20', event: 'Cell handoff', desc: 'Подключена несущая 5G NR n78 (3.5 GHz)' },
      { time: '09:38', event: 'Speed test running', desc: 'Стресс-тест CDN чанков (18.6 МБ/с)' },
      { time: '09:45', event: 'Telemetry synced', desc: 'Передано 24B дельта-пакетов: 8,410' }
    ]
  },
  {
    id: 'dev-pix9p',
    model: 'Google Pixel 9 Pro',
    platform: 'android',
    deviceOs: 'Android 15 AOSP',
    appVersion: 'v5.2 (Build 28)',
    status: 'online',
    currentSpeedKBps: 4200,
    todayTrafficBytes: 3661627392, // 3.41 GB
    totalDataTrafficBytes: 15408992256,
    assignedTester: 'Akmal',
    sim: {
      carrierName: 'Beeline UZ',
      slot: 'eSIM 1',
      slotType: 'eSIM Profile',
      networkType: 'LTE Advanced',
      signalDbm: -72,
      cellTower: 'CID 33904 • TAC 44210',
      ipAddress: '10.115.4.52',
      imsi: '434-01-349012844',
      iccid: '8999-8021-4401-9932-88'
    },
    timeline: [
      { time: '08:50', event: 'Connected', desc: 'Подключение через виртуальный профиль eSIM' },
      { time: '09:10', event: 'Micro-delta ping', desc: 'Задержка ответа сотового ядра: 11 мс' },
      { time: '09:28', event: 'Roaming verify', desc: 'Проверка маршрутизации DNS' },
      { time: '09:48', event: 'Idle standby', desc: 'Фоновый мониторинг параметров радиоканала' }
    ]
  },
  {
    id: 'dev-xia14p',
    model: 'Xiaomi 14 Pro',
    platform: 'android',
    deviceOs: 'HyperOS 2.0 / Android 14',
    appVersion: 'v5.2 (Build 28)',
    status: 'online',
    currentSpeedKBps: 1840,
    todayTrafficBytes: 3156672512, // 2.94 GB
    totalDataTrafficBytes: 11840912384,
    assignedTester: 'Dmitriy',
    sim: {
      carrierName: 'Mobiuz',
      slot: 'Slot 2',
      slotType: 'Nano-SIM',
      networkType: 'LTE Cat.16',
      signalDbm: -81,
      cellTower: 'CID 77209 • TAC 66100',
      ipAddress: '10.88.2.14',
      imsi: '434-07-772194012',
      iccid: '8999-8071-1192-0043-51'
    },
    timeline: [
      { time: '09:02', event: 'Connected', desc: 'Регистрация устройства в реестре Xylen' },
      { time: '09:18', event: 'Billing check', desc: 'Запрос USSD остатка пакетов' },
      { time: '09:35', event: 'Session logged', desc: 'Лог сохранен в AES-256 хранилище' }
    ]
  },
  {
    id: 'dev-ip15p',
    model: 'iPhone 15 Pro',
    platform: 'ios',
    deviceOs: 'iOS 18.1',
    appVersion: 'v5.2 (Build 28)',
    status: 'online',
    currentSpeedKBps: 14800,
    todayTrafficBytes: 5583457280, // 5.20 GB
    totalDataTrafficBytes: 28409112576,
    assignedTester: 'Elena',
    sim: {
      carrierName: 'Vodafone UK',
      slot: 'Slot 1',
      slotType: 'Nano-SIM',
      networkType: '5G SA',
      signalDbm: -69,
      cellTower: 'CID 99410 • TAC 33012',
      ipAddress: '10.201.7.88',
      imsi: '234-15-098231411',
      iccid: '8944-1510-9923-4188-70'
    },
    timeline: [
      { time: '09:22', event: 'Connected', desc: 'Связь установлена через London Gateway' },
      { time: '09:30', event: 'UK Roaming active', desc: 'Регламент UK GDPR и DPA 2018 подтвержден' },
      { time: '09:41', event: 'Crypto audit passed', desc: 'Подпись Keychain Vault валидирована' }
    ]
  }
];

// ----------------------------------------------------------------------------
// SIMs (Каждая SIM — на контроле, отдельная сущность)
// ----------------------------------------------------------------------------
const DEFAULT_SIMS = [
  {
    id: 'sim-org-fr-01',
    carrier: 'Orange France',
    country: 'FR',
    slot: 'Slot 1',
    slotType: 'Nano-SIM',
    iccid: '8933-0145-8821-9041-22',
    imsi: '208-01-992144810',
    network: 'LTE Cat.19',
    signalDbm: -78,
    tower: 'CID 89211 • TAC 55102',
    status: 'testing',
    statusLabel: 'In Test',
    assignedDevice: 'iPhone 16 Pro Max',
    assignedTester: 'Akmal',
    hotSwapSupported: true
  },
  {
    id: 'sim-ucl-uz-01',
    carrier: 'Ucell UZ',
    country: 'UZ',
    slot: 'Slot 1',
    slotType: 'Nano-SIM',
    iccid: '8999-8041-5520-1192-34',
    imsi: '434-05-881230491',
    network: '5G NR NSA',
    signalDbm: -64,
    tower: 'CID 11042 • TAC 12401',
    status: 'testing',
    statusLabel: 'In Test',
    assignedDevice: 'Samsung Galaxy S24 Ultra',
    assignedTester: 'Sardor',
    hotSwapSupported: true
  },
  {
    id: 'sim-bee-uz-01',
    carrier: 'Beeline UZ',
    country: 'UZ',
    slot: 'eSIM 1',
    slotType: 'eSIM Profile',
    iccid: '8999-8021-4401-9932-88',
    imsi: '434-01-349012844',
    network: 'LTE Advanced',
    signalDbm: -72,
    tower: 'CID 33904 • TAC 44210',
    status: 'active',
    statusLabel: 'Active',
    assignedDevice: 'Google Pixel 9 Pro',
    assignedTester: 'Akmal',
    hotSwapSupported: true
  },
  {
    id: 'sim-mob-uz-01',
    carrier: 'Mobiuz',
    country: 'UZ',
    slot: 'Slot 2',
    slotType: 'Nano-SIM',
    iccid: '8999-8071-1192-0043-51',
    imsi: '434-07-772194012',
    network: 'LTE Cat.16',
    signalDbm: -81,
    tower: 'CID 77209 • TAC 66100',
    status: 'active',
    statusLabel: 'Active',
    assignedDevice: 'Xiaomi 14 Pro',
    assignedTester: 'Dmitriy',
    hotSwapSupported: true
  },
  {
    id: 'sim-vdf-uk-01',
    carrier: 'Vodafone UK',
    country: 'UK',
    slot: 'Slot 1',
    slotType: 'Nano-SIM',
    iccid: '8944-1510-9923-4188-70',
    imsi: '234-15-098231411',
    network: '5G SA',
    signalDbm: -69,
    tower: 'CID 99410 • TAC 33012',
    status: 'testing',
    statusLabel: 'In Test',
    assignedDevice: 'iPhone 15 Pro',
    assignedTester: 'Elena',
    hotSwapSupported: true
  },
  {
    id: 'sim-tmo-us-01',
    carrier: 'T-Mobile US',
    country: 'US',
    slot: 'eSIM 2',
    slotType: 'eSIM Profile',
    iccid: '8901-2608-4412-9901-44',
    imsi: '310-26-884102931',
    network: '5G UC',
    signalDbm: -74,
    tower: 'CID 44109 • TAC 88201',
    status: 'spare',
    statusLabel: 'Spare',
    assignedDevice: 'Standby Rack',
    assignedTester: 'Jamshid',
    hotSwapSupported: true
  },
  {
    id: 'sim-o2-uk-01',
    carrier: 'O2 UK',
    country: 'UK',
    slot: 'Slot 2',
    slotType: 'Nano-SIM',
    iccid: '8944-1002-3391-7720-19',
    imsi: '234-10-449102833',
    network: 'LTE',
    signalDbm: -84,
    tower: 'CID 88120 • TAC 33010',
    status: 'active',
    statusLabel: 'Active',
    assignedDevice: 'Samsung Galaxy A55',
    assignedTester: 'Farrukh',
    hotSwapSupported: true
  },
  {
    id: 'sim-uzt-uz-01',
    carrier: 'UZTELECOM',
    country: 'UZ',
    slot: 'Slot 1',
    slotType: 'Nano-SIM',
    iccid: '8999-8031-6602-5511-92',
    imsi: '434-03-662910482',
    network: 'LTE',
    signalDbm: -70,
    tower: 'CID 12004 • TAC 12400',
    status: 'spare',
    statusLabel: 'Spare',
    assignedDevice: 'Reserve Vault',
    assignedTester: 'Unassigned',
    hotSwapSupported: true
  }
];

// ----------------------------------------------------------------------------
// VERSION STORAGE CLASS
// ----------------------------------------------------------------------------
class VersionStorage {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      this.saveAll(DEFAULT_RELEASES);
    }
  }

  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return DEFAULT_RELEASES;
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_RELEASES;
    } catch (e) {
      return DEFAULT_RELEASES;
    }
  }

  saveAll(releases) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(releases));
      window.dispatchEvent(new CustomEvent('xylen:releases-updated', { detail: releases }));
      return true;
    } catch (e) {
      return false;
    }
  }

  getLatest() {
    const all = this.getAll();
    return all.find(r => r.status === 'latest') || all[0];
  }
}

// ----------------------------------------------------------------------------
// WORKSPACE DATA & TELEMETRY ENGINE
// ----------------------------------------------------------------------------
class ActivityStorage {
  constructor() {
    this.init();
    this.initLiveSimulation();
    this.setupIncomingTelemetryBridge();
  }

  init() {
    // Reset/Initialize workspace stores
    if (!localStorage.getItem(TESTERS_STORAGE_KEY)) {
      this.saveTesters(DEFAULT_TESTERS);
    }
    if (!localStorage.getItem(DEVICES_STORAGE_KEY)) {
      this.saveDevices(DEFAULT_DEVICES);
    }
    if (!localStorage.getItem(SIMS_STORAGE_KEY)) {
      this.saveSims(DEFAULT_SIMS);
    }
    if (!localStorage.getItem(ACTIVITIES_STORAGE_KEY)) {
      this.saveActivities([]);
    }
    if (!localStorage.getItem(DAILY_TRAFFIC_STORAGE_KEY)) {
      localStorage.setItem(DAILY_TRAFFIC_STORAGE_KEY, JSON.stringify({}));
    }
  }

  // Testers
  getTesters() {
    try {
      const data = localStorage.getItem(TESTERS_STORAGE_KEY);
      if (!data) return DEFAULT_TESTERS;
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_TESTERS;
    } catch (_) {
      return DEFAULT_TESTERS;
    }
  }

  saveTesters(testers) {
    try {
      localStorage.setItem(TESTERS_STORAGE_KEY, JSON.stringify(testers));
      window.dispatchEvent(new CustomEvent('xylen:testers-updated', { detail: testers }));
      return true;
    } catch (_) {
      return false;
    }
  }

  // Devices
  getDevices() {
    try {
      const data = localStorage.getItem(DEVICES_STORAGE_KEY);
      if (!data) return DEFAULT_DEVICES;
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DEVICES;
    } catch (_) {
      return DEFAULT_DEVICES;
    }
  }

  saveDevices(devices) {
    try {
      localStorage.setItem(DEVICES_STORAGE_KEY, JSON.stringify(devices));
      window.dispatchEvent(new CustomEvent('xylen:devices-updated', { detail: devices }));
      return true;
    } catch (_) {
      return false;
    }
  }

  // SIMs
  getSims() {
    try {
      const data = localStorage.getItem(SIMS_STORAGE_KEY);
      if (!data) return DEFAULT_SIMS;
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_SIMS;
    } catch (_) {
      return DEFAULT_SIMS;
    }
  }

  saveSims(sims) {
    try {
      localStorage.setItem(SIMS_STORAGE_KEY, JSON.stringify(sims));
      window.dispatchEvent(new CustomEvent('xylen:sims-updated', { detail: sims }));
      return true;
    } catch (_) {
      return false;
    }
  }

  // Activities / Audit
  getActivities() {
    try {
      const data = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  saveActivities(activities) {
    try {
      localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
      window.dispatchEvent(new CustomEvent('xylen:activities-updated', { detail: activities }));
      return true;
    } catch (_) {
      return false;
    }
  }

  logActivity(deviceId, action, details, category = 'system') {
    const devices = this.getDevices();
    const device = devices.find(d => d.id === deviceId);
    const now = new Date().toISOString();

    const activities = this.getActivities();
    const newAct = {
      id: 'act-' + Date.now(),
      deviceId: device ? device.id : deviceId,
      platform: device ? device.platform : 'mobile',
      userAlias: device ? (device.assignedTester || device.model) : 'Workspace User',
      deviceModel: device ? device.model : 'Device',
      timestamp: now,
      category: category,
      action: action,
      details: details || ''
    };

    activities.unshift(newAct);
    if (activities.length > 250) activities.pop();
    this.saveActivities(activities);
    return newAct;
  }

  // Incoming bridge from Mobile App
  setupIncomingTelemetryBridge() {
    window.addEventListener('message', (event) => {
      try {
        if (event.data && event.data.type === 'xylen:telemetry') {
          this.registerDevice(event.data.payload);
        }
      } catch (_) {}
    });
  }

  registerDevice(telemetry) {
    if (!telemetry || !telemetry.id) return false;
    const devices = this.getDevices();
    const existingIndex = devices.findIndex(d => d.id === telemetry.id);
    const now = new Date().toISOString();

    const deviceData = {
      id: telemetry.id,
      model: telemetry.model || 'Unknown Device',
      platform: telemetry.platform || 'android',
      deviceOs: telemetry.deviceOs || 'OS Version',
      appVersion: telemetry.appVersion || 'v5.2 (Build 28)',
      status: 'online',
      currentSpeedKBps: telemetry.currentSpeedKBps || 2400,
      todayTrafficBytes: telemetry.todayTrafficBytes || 104857600,
      totalDataTrafficBytes: telemetry.totalDataTrafficBytes || 1048576000,
      assignedTester: telemetry.assignedTester || 'New Tester',
      sim: telemetry.sim || {
        carrierName: telemetry.carrierName || 'Сотовая связь',
        slot: telemetry.slot || 'Slot 1',
        slotType: 'Nano-SIM',
        networkType: telemetry.networkType || 'LTE',
        signalDbm: telemetry.signalDbm || -75,
        cellTower: telemetry.cellTower || 'CID 12345',
        ipAddress: telemetry.ipAddress || '10.0.0.1',
        imsi: telemetry.imsi || '434-xx-xxxxxxxxx',
        iccid: telemetry.iccid || '8999-xxxx-xxxx-xxxx'
      },
      timeline: [
        { time: new Date().toLocaleTimeString().slice(0, 5), event: 'Connected', desc: 'Устройство зарегистрировано в Xylen Workspace' }
      ]
    };

    if (existingIndex >= 0) {
      devices[existingIndex] = { ...devices[existingIndex], ...deviceData };
    } else {
      devices.unshift(deviceData);
    }

    this.saveDevices(devices);
    return true;
  }

  // Live Pulse Simulation
  initLiveSimulation() {
    setInterval(() => {
      const devices = this.getDevices();
      if (!devices || devices.length === 0) return;

      let updated = false;
      let totalSpeedKBps = 0;
      let totalTodayBytes = 0;

      devices.forEach(d => {
        if (d.status === 'online') {
          const jitter = Math.floor((Math.random() - 0.48) * 400);
          d.currentSpeedKBps = Math.max(800, (d.currentSpeedKBps || 2400) + jitter);

          const deltaBytes = Math.floor((d.currentSpeedKBps * 1024) * 0.5);
          d.todayTrafficBytes = (d.todayTrafficBytes || 0) + deltaBytes;
          d.totalDataTrafficBytes = (d.totalDataTrafficBytes || 0) + deltaBytes;

          totalSpeedKBps += d.currentSpeedKBps;
          totalTodayBytes += d.todayTrafficBytes;
          updated = true;
        }
      });

      if (updated) {
        window.dispatchEvent(new CustomEvent('xylen:live-pulse', {
          detail: {
            totalSpeedKBps,
            totalTodayBytes,
            timestamp: Date.now()
          }
        }));
      }
    }, 2000);
  }

  // Theme
  getTheme() {
    return localStorage.getItem('xylen_selected_theme_v2') || 'dark';
  }

  setTheme(theme) {
    const validTheme = theme === 'light' ? 'light' : 'dark';
    localStorage.setItem('xylen_selected_theme_v2', validTheme);
    document.body.classList.toggle('theme-light', validTheme === 'light');
    window.dispatchEvent(new CustomEvent('xylen:theme-changed', { detail: validTheme }));
  }

  // Admin
  isAdmin() {
    return sessionStorage.getItem('xylen_admin_session_auth') === 'true';
  }

  verifyAdminPin(pin) {
    const clean = String(pin || '').trim();
    return clean === '7700' || clean === '2026';
  }

  loginAdmin(pin) {
    if (this.verifyAdminPin(pin)) {
      sessionStorage.setItem('xylen_admin_session_auth', 'true');
      window.dispatchEvent(new CustomEvent('xylen:admin-changed', { detail: true }));
      return true;
    }
    return false;
  }

  logoutAdmin() {
    sessionStorage.removeItem('xylen_admin_session_auth');
    window.dispatchEvent(new CustomEvent('xylen:admin-changed', { detail: false }));
  }

  // Web Visitors Audit
  getWebVisitors() {
    try {
      const data = localStorage.getItem('xylen_web_visitors_log_v2');
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
    const platform = isMobile ? (navigator.userAgent.includes('iPhone') ? 'iPhone (iOS / Safari)' : 'Android Smartphone') : 'Desktop (Windows / Browser)';

    const newVisit = {
      id: 'vis-' + Date.now(),
      timestamp: new Date().toISOString(),
      ip: 'Текущий посетитель',
      device: platform,
      source: document.referrer || 'Прямой вход',
      pageVisited: pageName || 'Overview',
      sessionDuration: 'только что',
      isOnline: true
    };

    visitors.unshift(newVisit);
    if (visitors.length > 50) visitors.pop();
    try {
      localStorage.setItem('xylen_web_visitors_log_v2', JSON.stringify(visitors));
      window.dispatchEvent(new CustomEvent('xylen:visitors-updated', { detail: visitors }));
    } catch (_) {}
  }
}

// Singletons
window.versionStorage = new VersionStorage();
window.activityStorage = new ActivityStorage();
