/**
 * Xylen Workspace - Multilingual Localization Engine (i18n)
 * Full & Accurate Translations across Russian (RU), Uzbek (UZ), and English (EN).
 * Strict Regulatory Standard: 152-ФЗ РФ & UK GDPR / DPA 2018 (ICO). Zero corporate pathos.
 */

const I18N_STORAGE_KEY = 'xylen_selected_language';

const TRANSLATIONS = {
  ru: {
    // Navigation
    brand_sub: "SIM Workspace",
    nav_overview: "Обзор",
    nav_testers: "Тестировщики",
    nav_devices: "Устройства",
    nav_sims: "SIM-карты",
    nav_testing: "Тестирование",
    nav_traffic: "Трафик",
    nav_releases: "Релизы",
    nav_about: "О платформе",
    nav_privacy: "Конфиденциальность",
    manager_btn: "Менеджер",

    // Section 01: Overview
    overview_hero_title: "Всё тестирование — под контролем",
    overview_hero_sub: "Следите за тестировщиками, устройствами, SIM-картами и результатами тестирования в едином рабочем пространстве.",
    kpi_testers: "Тестировщики",
    kpi_testers_sub: "32 активны прямо сейчас",
    kpi_sims: "SIM-карты",
    kpi_sims_sub: "126 в мониторинге (84 активны)",
    kpi_devices: "Устройства",
    kpi_devices_sub: "83 подключено (51 Android, 32 iOS)",
    kpi_tests: "Тесты за неделю",
    kpi_tests_sub: "342 завершено успешно",
    topology_title: "Архитектура процесса тестирования",
    topology_sub: "Непрерывный поток данных от SIM-карты до подтвержденного результата",

    // Section 02: Testers
    testers_hero_title: "Команда тестирования — как на ладони",
    testers_hero_sub: "Знайте, кто тестирует прямо сейчас, какие SIM-карты задействованы и где требуется внимание.",
    testers_active_chip: "32 активны • 11 в тесте • 4 ожидают • 2 вопроса",
    testers_sims_label: "SIM-карт:",
    testers_tests_today: "тестов за сегодня:",
    testers_last_active: "Активность:",
    testers_inspect_btn: "Инспектор ➔",
    tester_modal_title: "Карточка тестировщика",
    tester_modal_role: "Специализация:",
    tester_modal_devices: "Закрепленные аппараты:",
    tester_modal_notes: "Текущая задача:",

    // Section 03: Devices
    devices_hero_title: "Каждое устройство — живая история",
    devices_hero_sub: "Аппаратный парк, версии ОС, радиоканал и пошаговая хронология событий в реальном времени.",
    devices_inspect_btn: "Детальный инспектор ➔",
    device_timeline_title: "Хронология событий (Timeline)",
    device_card_status_online: "В сети",
    device_card_status_offline: "Оффлайн",

    // Section 04: SIMs
    sims_hero_title: "Каждая SIM — на контроле",
    sims_hero_sub: "Учет операторов, слотов, IMSI/ICCID и уровней радиосигнала независимо от аппаратов.",
    sims_filter_all: "Все SIM (126)",
    sims_filter_active: "Активные (84)",
    sims_filter_testing: "В тесте (32)",
    sims_filter_spare: "Резерв (10)",
    sim_th_carrier: "Оператор / Страна",
    sim_th_slot: "Слот",
    sim_th_iccid: "ICCID / IMSI",
    sim_th_network: "Стандарт / Сигнал",
    sim_th_tower: "Базовая станция (CID/TAC)",
    sim_th_device: "Устройство / Тестировщик",
    sim_th_status: "Статус",

    // Section 05: Testing
    testing_hero_title: "От SIM до результата",
    testing_hero_sub: "Анимированный пошаговый цикл жизненного цикла тестирования от обнаружения SIM до сохранения отчета.",
    testing_simulate_btn: "▶ Запустить контрольный цикл теста",
    testing_step1_name: "Обнаружение SIM",
    testing_step1_desc: "Чтение ICCID, IMSI и несущей частоты",
    testing_step2_name: "Связь с Xylen",
    testing_step2_desc: "Авторизация аппарата и проверка ключей",
    testing_step3_name: "Запуск теста",
    testing_step3_desc: "Генерация тестовой сессии и передача дельт",
    testing_step4_name: "Сбор телеметрии",
    testing_step4_desc: "Анализ задержки, списаний и биллинга",
    testing_step5_name: "Завершено успешно",
    testing_step5_desc: "Результат валидирован и внесен в реестр",
    testing_metric_latency: "Задержка ядра: 0 мс",
    testing_metric_packet: "Дельта-пакет: 24 байта",
    testing_metric_compression: "Сжатие: 96%",
    testing_metric_crypto: "Шифрование: AES-256 / Keychain",

    // Section 06: Traffic
    traffic_hero_title: "Трафик — в реальном времени",
    traffic_hero_sub: "Прямой поток дельта-пакетов, мгновенная скорость передачи и суточный учет расхода.",
    traffic_live_badge: "В ЭФИРЕ",
    traffic_speed_val: "Текущая скорость:",
    traffic_today_val: "Расход за сегодня:",
    traffic_delta_val: "Размер дельта-пакета:",

    // Section 07: Releases
    releases_hero_title: "Центр релизов",
    releases_hero_sub: "Рабочие сборки мобильного приложения для Android и iOS, прямые ссылки и чейнджлог.",
    releases_latest_badge: "АКТУАЛЬНЫЙ РЕЛИЗ",
    releases_download_apk: "Скачать APK (Android)",
    releases_download_ipa: "Установить IPA (iPhone)",
    releases_whats_new: "Что нового в сборке:",
    releases_archive_title: "Предыдущие версии",
    releases_qr_scan: "Отсканируйте камерой телефона для быстрой загрузки:",

    // Section 08: About
    about_hero_title: "Создан для тех, кто проводит тесты",
    about_p1: "Xylen Platform был создан с единственной практической целью: сделать процесс тестирования SIM-карт прозрачным, легко управляемым и масштабируемым для менеджера и полевых тестировщиков.",
    about_p2: "Вся система выстроена вокруг сквозного рабочего процесса: Менеджер ↔ Тестировщики → Мобильное приложение → Устройство ↔ SIM-карта → Тест → Результат. Никакой корпоративной рекламы — только измеримые сетевые параметры и надежный учет.",

    // Section 09: Privacy
    privacy_hero_title: "Правовая основа и конфиденциальность",
    privacy_hero_sub: "Строгое соответствие закону РФ № 152-ФЗ и регламентам Великобритании UK GDPR / Data Protection Act 2018.",
    privacy_badge_rf: "152-ФЗ РФ (Персональные данные)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (ICO UK)",
    privacy_section_1_title: "1. Статус платформы и цели сбора данных",
    privacy_section_1_text: "Xylen Platform является специализированным инженерным комплексом для аудита качества сотовой связи, контроля биллинга мобильных операторов и мониторинга парка служебных SIM-терминалов. Обработка телеметрии осуществляется строго в рамках Федерального закона РФ от 27.07.2006 № 152-ФЗ «О персональных данных» и законодательства Великобритании — UK General Data Protection Regulation (UK GDPR) и Data Protection Act 2018 под контролем Information Commissioner's Office (ICO).",
    privacy_section_2_title: "2. Категории обрабатываемой технической телеметрии",
    privacy_section_2_text: "Приложение собирает исключительно низкоуровневые диагностические параметры радиоканала: уровень радиосигнала (dBm/RSRP), рабочий диапазон (LTE/5G), сетевые идентификаторы базовых станций (CID, TAC, MNC, MCC), объемы переданного сетевого трафика и анонимный системный идентификатор установки. Платформа категорически НЕ имеет доступа к персональным сообщениям (SMS), телефонным контактам, фото/видео материалам, аудиозаписям и паролям.",

    // Section 10: Admin Modal
    admin_auth_title: "Консоль Мастер-Менеджера",
    admin_auth_sub: "Введите защитный PIN-код (7700):",
    admin_auth_btn_login: "Разблокировать консоль",
    admin_auth_error: "Неверный код доступа. Повторите попытку.",
    admin_active_banner_text: "🔒 Режим Менеджера активен. Журнал аудита доступен.",
    admin_banner_goto: "Открыть Аудит",
    admin_banner_logout: "Заблокировать и выйти",
    admin_visitors_title: "Журнал аудита сессий и посещений портала",

    // General
    btn_close: "Закрыть",
    btn_copy: "Копировать",
    copied_toast: "Скопировано в буфер обмена!"
  },

  uz: {
    // Navigation
    brand_sub: "SIM Workspace",
    nav_overview: "Umumiy ko'rinish",
    nav_testers: "Testerlar",
    nav_devices: "Qurilmalar",
    nav_sims: "SIM-kartalar",
    nav_testing: "Sinov jarayoni",
    nav_traffic: "Trafik",
    nav_releases: "Relizlar",
    nav_about: "Platforma haqida",
    nav_privacy: "Maxfiylik",
    manager_btn: "Menejer",

    // Section 01: Overview
    overview_hero_title: "Barcha sinovlar to'liq nazorat ostida",
    overview_hero_sub: "Testerlar, qurilmalar, SIM-kartalar va sinov natijalarini yagona ishchi muhitda kuzatib boring.",
    kpi_testers: "Testerlar",
    kpi_testers_sub: "Hozirda 32 nafari faol",
    kpi_sims: "SIM-kartalar",
    kpi_sims_sub: "126 tasi monitoringda (84 faol)",
    kpi_devices: "Qurilmalar",
    kpi_devices_sub: "83 ta ulangan (51 Android, 32 iOS)",
    kpi_tests: "Haftalik sinovlar",
    kpi_tests_sub: "342 tasi muvaffaqiyatli yakunlandi",
    topology_title: "Sinov jarayoni arxitekturasi",
    topology_sub: "SIM-kartadan boshlab tasdiqlangan natijagacha bo'lgan uzluksiz ma'lumotlar oqimi",

    // Section 02: Testers
    testers_hero_title: "Sinov guruhi — kaftdek ravshan",
    testers_hero_sub: "Ayni damda kim sinov o'tkazayotgani, qaysi SIM-kartalar bandligi va menejer nazorati kerakligini biling.",
    testers_active_chip: "32 faol • 11 sinovda • 4 kutmoqda • 2 masala",
    testers_sims_label: "SIM-kartalar:",
    testers_tests_today: "Bugungi sinovlar:",
    testers_last_active: "Faollik:",
    testers_inspect_btn: "Inspektor ➔",
    tester_modal_title: "Tester kartochkasi",
    tester_modal_role: "Mutaxassislik:",
    tester_modal_devices: "Biriktirilgan qurilmalar:",
    tester_modal_notes: "Joriy vazifa:",

    // Section 03: Devices
    devices_hero_title: "Har bir qurilma — jonli tarix",
    devices_hero_sub: "Qurilmalar parki, OT versiyalari, radiochastotalar va voqealar xronologiyasi real vaqtda.",
    devices_inspect_btn: "Batafsil inspektor ➔",
    device_timeline_title: "Voqealar xronologiyasi (Timeline)",
    device_card_status_online: "Tarmoqda",
    device_card_status_offline: "Oflayn",

    // Section 04: SIMs
    sims_hero_title: "Har bir SIM — nazoratda",
    sims_hero_sub: "Qurilmalardan qat'i nazar operatorlar, slotlar, IMSI/ICCID va radio signali hisobi.",
    sims_filter_all: "Barcha SIM (126)",
    sims_filter_active: "Faollar (84)",
    sims_filter_testing: "Sinovda (32)",
    sims_filter_spare: "Zaxira (10)",
    sim_th_carrier: "Operator / Davlat",
    sim_th_slot: "Slot",
    sim_th_iccid: "ICCID / IMSI",
    sim_th_network: "Standart / Signal",
    sim_th_tower: "Tayanch stansiya (CID/TAC)",
    sim_th_device: "Qurilma / Tester",
    sim_th_status: "Holat",

    // Section 05: Testing
    testing_hero_title: "SIM-dan natijagacha",
    testing_hero_sub: "SIM aniqlanishidan tortib yakuniy hisobotgacha bo'lgan to'liq jonli sinov bosqichlari.",
    testing_simulate_btn: "▶ Sinov tsiklini ishga tushirish",
    testing_step1_name: "SIM aniqlash",
    testing_step1_desc: "ICCID, IMSI va chastotani o'qish",
    testing_step2_name: "Xylen aloqasi",
    testing_step2_desc: "Qurilmani autentifikatsiya qilish",
    testing_step3_name: "Sinovni boshlash",
    testing_step3_desc: "Test sessiyasi va delta paketlar yuborish",
    testing_step4_name: "Telemetriya yig'ish",
    testing_step4_desc: "Kechikish va billingni tekshirish",
    testing_step5_name: "Muvaffaqiyatli yakunlandi",
    testing_step5_desc: "Natija tasdiqlandi va saqlandi",
    testing_metric_latency: "Yadro kechikishi: 0 ms",
    testing_metric_packet: "Delta-paket: 24 bayt",
    testing_metric_compression: "Siqilish: 96%",
    testing_metric_crypto: "Shifrlash: AES-256 / Keychain",

    // Section 06: Traffic
    traffic_hero_title: "Trafik — real vaqt rejimida",
    traffic_hero_sub: "Delta paketlar oqimi, uzatish tezligi va kunlik hisob-kitoblar.",
    traffic_live_badge: "JONLI EFIRDA",
    traffic_speed_val: "Joriy tezlik:",
    traffic_today_val: "Bugungi sarf:",
    traffic_delta_val: "Delta paket hajmi:",

    // Section 07: Releases
    releases_hero_title: "Relizlar markazi",
    releases_hero_sub: "Android va iOS uchun mobil ilovaning ishchi versiyalari, to'g'ridan-to'g'ri havolalar.",
    releases_latest_badge: "ENG SO'NGGI VERSIYA",
    releases_download_apk: "APK yuklab olish (Android)",
    releases_download_ipa: "IPA o'rnatish (iPhone)",
    releases_whats_new: "Ushbu versiyadagi yangiliklar:",
    releases_archive_title: "Avvalgi versiyalar",
    releases_qr_scan: "Tez o'rnatish uchun telefon kamerasi orqali skanerlang:",

    // Section 08: About
    about_hero_title: "Sinov o'tkazuvchilar uchun yaratilgan",
    about_p1: "Xylen Platform faqat amaliy maqsad bilan yaratilgan: SIM-kartalarni sinash jarayonini menejer va testerlar uchun shaffof, qulay va kengaytiriladigan qilish.",
    about_p2: "Tizim to'liq ishchi zanjirga tayanadi: Menejer ↔ Testerlar → Mobil ilova → Qurilma ↔ SIM-karta → Sinov → Natija. Hech qanday korporativ balandparvozliklarsiz.",

    // Section 09: Privacy
    privacy_hero_title: "Huquqiy asos va maxfiylik",
    privacy_hero_sub: "RF 152-FZ qonuni va Buyuk Britaniyaning UK GDPR / Data Protection Act 2018 standartlariga to'liq moslik.",
    privacy_badge_rf: "152-FZ RF (Shaxsiy ma'lumotlar)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (ICO UK)",
    privacy_section_1_title: "1. Platforma maqomi va ma'lumot yig'ish maqsadlari",
    privacy_section_1_text: "Xylen Platform aloqa sifatini tekshirish, mobil operatorlar billingini audit qilish va xizmat SIM-terminallarini monitoring qilish uchun muhandislik vositasidir. Ishlov berish qat'iy ravishda RF 152-FZ hamda Buyuk Britaniyaning UK GDPR / DPA 2018 qoidalariga rioya qilgan holda amalga oshiriladi.",
    privacy_section_2_title: "2. Yig'iladigan texnik telemetriya toifalari",
    privacy_section_2_text: "Ilova faqat radiochastota va tarmoq parametrlarini (signal kuchi dBm, tayanch stansiya CID/TAC, tarmoq turi, sarflangan baytlar) to'playdi. Dastur hech qachon shaxsiy xabarlar (SMS), kontaktlar, fotosuratlar yoki parollarga daxl qilmaydi.",

    // Section 10: Admin Modal
    admin_auth_title: "Bosh Menejer Konsoli",
    admin_auth_sub: "Xavfsizlik PIN-kodini kiriting (7700):",
    admin_auth_btn_login: "Konsolga kirish",
    admin_auth_error: "Noto'g'ri PIN-kod. Qayta urinib ko'ring.",
    admin_active_banner_text: "🔒 Menejer rejimi faol. Audit jurnali ochiq.",
    admin_banner_goto: "Auditni ochish",
    admin_banner_logout: "Chiqish",
    admin_visitors_title: "Tizimga kirishlar va sessiyalar jurnali",

    // General
    btn_close: "Yopish",
    btn_copy: "Nusxalash",
    copied_toast: "Nusxa olindi!"
  },

  en: {
    // Navigation
    brand_sub: "SIM Workspace",
    nav_overview: "Overview",
    nav_testers: "Testers",
    nav_devices: "Devices",
    nav_sims: "SIMs",
    nav_testing: "Testing",
    nav_traffic: "Traffic",
    nav_releases: "Releases",
    nav_about: "About",
    nav_privacy: "Privacy",
    manager_btn: "Manager",

    // Section 01: Overview
    overview_hero_title: "Everything under control.",
    overview_hero_sub: "Monitor testers, devices, SIM cards, and test results in one unified operational workspace.",
    kpi_testers: "Testers",
    kpi_testers_sub: "32 active right now",
    kpi_sims: "SIMs",
    kpi_sims_sub: "126 in monitoring (84 active)",
    kpi_devices: "Devices",
    kpi_devices_sub: "83 connected (51 Android, 32 iOS)",
    kpi_tests: "Tests this week",
    kpi_tests_sub: "342 completed successfully",
    topology_title: "Testing Workflow Architecture",
    topology_sub: "Continuous data flow from physical SIM card to verified audit result",

    // Section 02: Testers
    testers_hero_title: "Your team, at a glance.",
    testers_hero_sub: "Know who is testing, what SIMs are in use, and where manager attention is needed.",
    testers_active_chip: "32 active • 11 testing • 4 waiting • 2 issue",
    testers_sims_label: "SIMs:",
    testers_tests_today: "tests today:",
    testers_last_active: "Activity:",
    testers_inspect_btn: "Inspector ➔",
    tester_modal_title: "Tester Profile",
    tester_modal_role: "Specialization:",
    tester_modal_devices: "Assigned Devices:",
    tester_modal_notes: "Current Objective:",

    // Section 03: Devices
    devices_hero_title: "Every device has a story.",
    devices_hero_sub: "Hardware fleet, OS versions, cellular radio parameters, and real-time event timelines.",
    devices_inspect_btn: "Deep Inspector ➔",
    device_timeline_title: "Live Event Timeline",
    device_card_status_online: "Online",
    device_card_status_offline: "Offline",

    // Section 04: SIMs
    sims_hero_title: "Every SIM. One place.",
    sims_hero_sub: "Carriers, slots, IMSI/ICCID records, and cellular tower signal metrics independent of hardware.",
    sims_filter_all: "All SIMs (126)",
    sims_filter_active: "Active (84)",
    sims_filter_testing: "In Test (32)",
    sims_filter_spare: "Spare (10)",
    sim_th_carrier: "Carrier / Country",
    sim_th_slot: "Slot",
    sim_th_iccid: "ICCID / IMSI",
    sim_th_network: "Standard / Signal",
    sim_th_tower: "Base Tower (CID/TAC)",
    sim_th_device: "Device / Tester",
    sim_th_status: "Status",

    // Section 05: Testing
    testing_hero_title: "From SIM to result.",
    testing_hero_sub: "Motion-first animated lifecycle from SIM detection to verified cryptographic audit.",
    testing_simulate_btn: "▶ Run Interactive Test Cycle",
    testing_step1_name: "SIM Detected",
    testing_step1_desc: "Read ICCID, IMSI, and carrier frequency",
    testing_step2_name: "Connected",
    testing_step2_desc: "Device authorization & token handshake",
    testing_step3_name: "Test Running",
    testing_step3_desc: "Delta telemetry stream generation",
    testing_step4_name: "Data Collected",
    testing_step4_desc: "Latency, billing audit & packet verify",
    testing_step5_name: "Completed",
    testing_step5_desc: "Cryptographically verified and stored",
    testing_metric_latency: "Core Latency: 0 ms",
    testing_metric_packet: "Delta Packet: 24 Bytes",
    testing_metric_compression: "Compression: 96%",
    testing_metric_crypto: "Crypto: AES-256 / Keychain",

    // Section 06: Traffic
    traffic_hero_title: "Traffic, live.",
    traffic_hero_sub: "Live micro-delta packet stream, instant throughput, and daily bandwidth metrics.",
    traffic_live_badge: "LIVE PULSE",
    traffic_speed_val: "Instant Speed:",
    traffic_today_val: "Today Volume:",
    traffic_delta_val: "Delta Packet Size:",

    // Section 07: Releases
    releases_hero_title: "Always ready to test.",
    releases_hero_sub: "Working mobile client builds for Android & iOS, direct downloads, and version logs.",
    releases_latest_badge: "LATEST STABLE",
    releases_download_apk: "Download APK (Android)",
    releases_download_ipa: "Install IPA (iPhone)",
    releases_whats_new: "What's new in this build:",
    releases_archive_title: "Previous Releases",
    releases_qr_scan: "Scan with smartphone camera for instant wireless installation:",

    // Section 08: About
    about_hero_title: "Built for the people who run the tests.",
    about_p1: "Xylen Platform was created for a single practical purpose: to make SIM testing easier to manage, easier to monitor, and easier to scale for managers and field engineers.",
    about_p2: "The entire system is designed around the real operational workflow: Manager ↔ Testers → Mobile App → Device ↔ SIM Card → Test → Result. Zero corporate fluff — only precision metrics.",

    // Section 09: Privacy
    privacy_hero_title: "Legal Transparency & Privacy Policy",
    privacy_hero_sub: "Strict compliance with Russian Federal Law No. 152-FZ and UK GDPR / Data Protection Act 2018 (ICO).",
    privacy_badge_rf: "152-FZ RF (Personal Data Law)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (ICO UK)",
    privacy_section_1_title: "1. Platform Status & Data Collection Purposes",
    privacy_section_1_text: "Xylen Platform is a specialized engineering system for cellular radio telemetry, carrier billing audit, and SIM terminal monitoring. Data processing is governed exclusively under Russian Federal Law No. 152-FZ and United Kingdom legislation (UK GDPR and Data Protection Act 2018) overseen by the Information Commissioner's Office (ICO).",
    privacy_section_2_title: "2. Technical Telemetry Categories",
    privacy_section_2_text: "The application strictly collects low-level cellular diagnostic metrics: radio signal power (dBm/RSRP), network generation (LTE/5G), cell tower identifiers (CID, TAC, MNC, MCC), data transfer volume, and anonymous installation UUIDs. The platform NEVER accesses SMS, phone contacts, personal photos, audio recordings, or credentials.",

    // Section 10: Admin Modal
    admin_auth_title: "Master Manager Console",
    admin_auth_sub: "Enter access PIN (7700):",
    admin_auth_btn_login: "Unlock Console",
    admin_auth_error: "Invalid security code. Please retry.",
    admin_active_banner_text: "🔒 Manager Mode Active. Access audit logs unlocked.",
    admin_banner_goto: "Open Audit",
    admin_banner_logout: "Lock & Logout",
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

    // Update text elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update placeholders with data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    // Update lang switcher buttons state
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

// Global Singleton
window.i18n = new I18nEngine();
