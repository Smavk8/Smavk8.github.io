/**
 * Xylen Workspace - Multilingual Localization Engine (i18n)
 * Accurate Translations: Russian (RU), Uzbek (UZ), English (EN).
 * Platform labels: Android & iOS (strictly no APK/IPA labels).
 * Regulatory standard: 152-ФЗ РФ & UK GDPR / DPA 2018 (ICO).
 */

const I18N_STORAGE_KEY = 'xylen_selected_language';

const TRANSLATIONS = {
  ru: {
    // Navigation
    brand_sub: "Мониторинг устройств",
    nav_overview: "Обзор",
    nav_devices: "Устройства",
    nav_traffic: "Трафик",
    nav_releases: "Релизы",
    nav_about: "О платформе",
    nav_privacy: "Конфиденциальность",
    manager_btn: "Менеджер",

    // Overview
    overview_hero_title: "Всё тестирование — под контролем",
    overview_hero_sub: "Контроль устройств, проверка текущих подключенных SIM-карт и телеметрия сотовой сети в реальном времени.",
    kpi_devices: "Устройства в сети",
    kpi_devices_sub: "подключено к системе",
    kpi_sims: "Активные SIM-карты",
    kpi_sims_sub: "обнаружено в слотах",
    kpi_traffic: "Трафик за сегодня",
    kpi_traffic_sub: "суммарный объем",
    kpi_speed: "Скорость передачи",
    kpi_speed_sub: "общий поток данных",
    overview_fleet_title: "Парк активных устройств и подключенные SIM-карты",
    overview_fleet_sub: "Текущее состояние аппаратных терминалов и параметры сотового радиоканала",

    // Devices
    devices_hero_title: "Устройства и подключенные SIM-карты",
    devices_hero_sub: "Контролируйте каждый аппарат и мгновенно просматривайте установленные в него SIM-карты, силу сигнала и сотовые вышки.",
    devices_connected_sims: "Текущие подключенные SIM-карты:",
    devices_status_online: "В сети",
    devices_status_offline: "Оффлайн",
    devices_btn_inspect: "Инспектор телеметрии ➔",

    // Traffic
    traffic_hero_title: "Мониторинг сотового трафика",
    traffic_hero_sub: "Прямой поток микро-дельта пакетов (24 байта), мгновенная скорость и суточный учет расхода.",
    traffic_live_badge: "В ЭФИРЕ",
    traffic_speed_label: "Текущая скорость:",
    traffic_today_label: "Расход за сегодня:",
    traffic_packet_label: "Микро-дельта пакет:",

    // Releases (Android & iOS)
    releases_hero_title: "Центр загрузки приложений",
    releases_hero_sub: "Официальные нативные клиенты Xylen для мобильных платформ Android и iOS:",
    platform_android_title: "Google Android",
    platform_android_desc: "Клиент фоновой телеметрии для смартфонов и модемов Android 8.0 – 15.0+.",
    btn_install_android: "Скачать для Android",
    platform_ios_title: "Apple iOS",
    platform_ios_desc: "Нативный клиент телеметрии для iPhone на iOS 16.0 – 18.2+ с сейфом Keychain.",
    btn_install_ios: "Установить на iOS",
    releases_whats_new: "Что нового в версии v5.2:",
    releases_archive_title: "Предыдущие версии",
    qr_hint: "Отсканируйте камерой смартфона для прямой установки:",

    // About
    about_hero_title: "Создан для тех, кто проводит тесты",
    about_p1: "Xylen Platform — это практический рабочий инструмент для менеджера и технических специалистов: контроль аппаратных устройств, мгновенная проверка подключенных SIM-карт и выявление скрытых списаний трафика операторами связи.",
    about_p2: "Система обеспечивает прямую связь: Менеджер ↔ Устройства ↔ Подключенные SIM-карты ↔ Сетевая телеметрия. Вся обработка происходит локально и через защищенные каналы связи.",

    // Privacy
    privacy_hero_title: "Правовая основа и конфиденциальность",
    privacy_hero_sub: "Строгое соответствие Федеральному закону РФ № 152-ФЗ и регламентам Великобритании UK GDPR / Data Protection Act 2018 (ICO).",
    privacy_badge_rf: "152-ФЗ РФ (Персональные данные)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (ICO UK)",
    privacy_p1: "Xylen Platform является инженерным средством диагностики параметров радиоканала и расхода сетевого трафика. Платформа собирает исключительно технические телеметрические параметры (мощность сигнала в dBm, идентификаторы сотовых вышек CID/TAC, стандарт связи LTE/5G).",
    privacy_p2: "Приложение категорически НЕ собирает и НЕ имеет технического доступа к личным сообщениям (SMS), телефонной книге, персональным фотографиям, видеозаписям и паролям пользователей.",

    // Admin
    admin_auth_title: "Консоль Мастер-Менеджера",
    admin_auth_sub: "Введите защитный PIN-код доступа (7700):",
    admin_auth_btn_login: "Войти в консоль",
    admin_auth_error: "Неверный код доступа. Повторите попытку.",
    admin_visitors_title: "Журнал аудита сессий и подключений",

    // General
    btn_close: "Закрыть",
    btn_copy: "Копировать",
    copied_toast: "Скопировано в буфер обмена!"
  },

  uz: {
    // Navigation
    brand_sub: "Qurilmalar monitoringi",
    nav_overview: "Umumiy ko'rinish",
    nav_devices: "Qurilmalar",
    nav_traffic: "Trafik",
    nav_releases: "Relizlar",
    nav_about: "Platforma haqida",
    nav_privacy: "Maxfiylik",
    manager_btn: "Menejer",

    // Overview
    overview_hero_title: "Barcha sinovlar to'liq nazorat ostida",
    overview_hero_sub: "Qurilmalar nazorati, ulangan SIM-kartalarni tekshirish va tarmoq telemetriyasi real vaqtda.",
    kpi_devices: "Tarmoqdagi qurilmalar",
    kpi_devices_sub: "tizimga ulangan",
    kpi_sims: "Faol SIM-kartalar",
    kpi_sims_sub: "slotlarda aniqlangan",
    kpi_traffic: "Bugungi trafik",
    kpi_traffic_sub: "umumiy sarf",
    kpi_speed: "Uzatish tezligi",
    kpi_speed_sub: "umumiy ma'lumotlar oqimi",
    overview_fleet_title: "Faol qurilmalar va ulangan SIM-kartalar",
    overview_fleet_sub: "Qurilmalar holati va uyali aloqa parametrlari",

    // Devices
    devices_hero_title: "Qurilmalar va ulangan SIM-kartalar",
    devices_hero_sub: "Har bir qurilmani nazorat qiling va unga o'rnatilgan SIM-kartalar, signal kuchi va tayanch stansiyalarini ko'ring.",
    devices_connected_sims: "Joriy ulangan SIM-kartalar:",
    devices_status_online: "Tarmoqda",
    devices_status_offline: "Oflayn",
    devices_btn_inspect: "Telemetriya inspektori ➔",

    // Traffic
    traffic_hero_title: "Mobil trafik monitoringi",
    traffic_hero_sub: "Mikro-delta paketlar oqimi (24 bayt), joriy tezlik va kunlik hisob-kitoblar.",
    traffic_live_badge: "JONLI EFIRDA",
    traffic_speed_label: "Joriy tezlik:",
    traffic_today_label: "Bugungi sarf:",
    traffic_packet_label: "Mikro-delta paket:",

    // Releases (Android & iOS)
    releases_hero_title: "Ilovalarni yuklab olish markazi",
    releases_hero_sub: "Android va iOS mobil platformalari uchun rasmiy Xylen ilovalari:",
    platform_android_title: "Google Android",
    platform_android_desc: "Android 8.0 – 15.0+ uchun fon telemetriyasi mijozi.",
    btn_install_android: "Android uchun yuklab olish",
    platform_ios_title: "Apple iOS",
    platform_ios_desc: "iOS 16.0 – 18.2+ iPhone qurilmalari uchun nativ telemetriya mijozi.",
    btn_install_ios: "iOS uchun o'rnatish",
    releases_whats_new: "v5.2 versiyasidagi yangiliklar:",
    releases_archive_title: "Avvalgi versiyalar",
    qr_hint: "To'g'ridan-to'g'ri o'rnatish uchun telefon kamerasi bilan skanerlang:",

    // About
    about_hero_title: "Sinov o'tkazuvchilar uchun yaratilgan",
    about_p1: "Xylen Platform — bu menejer va muhandislar uchun amaliy ishchi vosita: qurilmalarni nazorat qilish, ulangan SIM-kartalarni tezkor tekshirish va billingni nazorat qilish.",
    about_p2: "Tizim to'g'ridan-to'g'ri bog'lanishni ta'minlaydi: Menejer ↔ Qurilmalar ↔ Ulangan SIM-kartalar ↔ Tarmoq telemetriyasi.",

    // Privacy
    privacy_hero_title: "Huquqiy asos va maxfiylik",
    privacy_hero_sub: "RF 152-FZ qonuni va Buyuk Britaniyaning UK GDPR / Data Protection Act 2018 standartlariga to'liq muvofiqlik.",
    privacy_badge_rf: "152-FZ RF (Shaxsiy ma'lumotlar)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (ICO UK)",
    privacy_p1: "Xylen Platform aloqa sifati va tarmoq trafigini tahlil qilish uchun muhandislik vositasidir. Dastur faqat texnik radio parametrlarini yig'adi.",
    privacy_p2: "Dastur foydalanuvchilarning shaxsiy xabarlari (SMS), kontaktlari, fotosuratlari yoki parollariga hech qachon kirmaydi.",

    // Admin
    admin_auth_title: "Bosh Menejer Konsoli",
    admin_auth_sub: "Xavfsizlik PIN-kodini kiriting (7700):",
    admin_auth_btn_login: "Konsolga kirish",
    admin_auth_error: "Noto'g'ri PIN-kod. Qayta urinib ko'ring.",
    admin_visitors_title: "Sessiyalar va ulanishlar jurnali",

    // General
    btn_close: "Yopish",
    btn_copy: "Nusxalash",
    copied_toast: "Nusxa olindi!"
  },

  en: {
    // Navigation
    brand_sub: "Device Monitoring",
    nav_overview: "Overview",
    nav_devices: "Devices",
    nav_traffic: "Traffic",
    nav_releases: "Releases",
    nav_about: "About",
    nav_privacy: "Privacy",
    manager_btn: "Manager",

    // Overview
    overview_hero_title: "Everything under control.",
    overview_hero_sub: "Real-time device fleet management, connected SIM card inspection, and live cellular telemetry.",
    kpi_devices: "Connected Devices",
    kpi_devices_sub: "online in system",
    kpi_sims: "Active SIMs",
    kpi_sims_sub: "detected in slots",
    kpi_traffic: "Today's Traffic",
    kpi_traffic_sub: "total data volume",
    kpi_speed: "Transfer Speed",
    kpi_speed_sub: "current bandwidth",
    overview_fleet_title: "Active Device Fleet & Connected SIM Cards",
    overview_fleet_sub: "Hardware status, radio signal parameters, and installed SIM profiles",

    // Devices
    devices_hero_title: "Devices & Connected SIM Cards",
    devices_hero_sub: "Control each hardware terminal and instantly view its installed SIM cards, signal strength, and cellular towers.",
    devices_connected_sims: "Currently Connected SIM Cards:",
    devices_status_online: "Online",
    devices_status_offline: "Offline",
    devices_btn_inspect: "Telemetry Inspector ➔",

    // Traffic
    traffic_hero_title: "Cellular Traffic Monitoring",
    traffic_hero_sub: "Live stream of 24-byte micro-delta packets, instant bandwidth throughput, and session auditing.",
    traffic_live_badge: "LIVE PULSE",
    traffic_speed_label: "Instant Speed:",
    traffic_today_label: "Today's Volume:",
    traffic_packet_label: "Micro-Delta Packet:",

    // Releases (Android & iOS)
    releases_hero_title: "Application Release Center",
    releases_hero_sub: "Official native Xylen telemetry clients for Android and iOS mobile platforms:",
    platform_android_title: "Google Android",
    platform_android_desc: "Background telemetry client for Android 8.0 – 15.0+ smartphones and modems.",
    btn_install_android: "Download for Android",
    platform_ios_title: "Apple iOS",
    platform_ios_desc: "Native telemetry client for iPhone on iOS 16.0 – 18.2+ with Keychain Vault.",
    btn_install_ios: "Install on iOS",
    releases_whats_new: "What's new in v5.2:",
    releases_archive_title: "Previous Versions",
    qr_hint: "Scan with smartphone camera for direct installation:",

    // About
    about_hero_title: "Built for the people who run the tests.",
    about_p1: "Xylen Platform is a practical operational tool for managers and engineers: hardware device control, instant connected SIM card verification, and carrier billing validation.",
    about_p2: "The system provides a direct pipeline: Manager ↔ Devices ↔ Connected SIM Cards ↔ Cellular Telemetry. All processing is private and cryptographically secured.",

    // Privacy
    privacy_hero_title: "Legal Transparency & Privacy Policy",
    privacy_hero_sub: "Strict compliance with Russian Federal Law No. 152-FZ and UK GDPR / Data Protection Act 2018 (ICO).",
    privacy_badge_rf: "152-FZ RF (Personal Data Law)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (ICO UK)",
    privacy_p1: "Xylen Platform is an engineering diagnostic suite for cellular radio telemetry and data traffic auditing. It collects strictly technical parameters (dBm signal power, CID/TAC base stations, LTE/5G radio type).",
    privacy_p2: "The application NEVER accesses SMS messages, phone contacts, personal photos, audio recordings, or credentials.",

    // Admin
    admin_auth_title: "Master Manager Console",
    admin_auth_sub: "Enter access PIN code (7700):",
    admin_auth_btn_login: "Unlock Console",
    admin_auth_error: "Invalid security code. Please retry.",
    admin_visitors_title: "Portal Access and Session Audit Logs",

    // General
    btn_close: "Close",
    btn_copy: "Copy Link",
    copied_toast: "Copied to clipboard!"
  }
};

class I18nEngine {
  constructor() {
    this.currentLang = localStorage.getItem(I18N_STORAGE_KEY) || 'ru';
    this.init();
  }

  init() {
    this.applyLanguage(this.currentLang);
    this.bindEvents();
  }

  setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    this.currentLang = lang;
    localStorage.setItem(I18N_STORAGE_KEY, lang);
    this.applyLanguage(lang);
    window.dispatchEvent(new CustomEvent('xylen:language-changed', { detail: lang }));
  }

  getLanguage() {
    return this.currentLang;
  }

  t(key) {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ru;
    return dict[key] || TRANSLATIONS.ru[key] || key;
  }

  applyLanguage(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.ru;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    document.querySelectorAll('.lang-text-btn[data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  bindEvents() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-text-btn[data-lang]');
      if (btn) {
        e.preventDefault();
        this.setLanguage(btn.dataset.lang);
      }
    });
  }
}

window.i18n = new I18nEngine();
