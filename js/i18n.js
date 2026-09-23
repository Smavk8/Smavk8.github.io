/**
 * Xylen Workspace - Multilingual Localization Engine (i18n)
 * Accurate Translations: Russian (RU), Uzbek (UZ), English (EN).
 * Regulatory standard: 
 * - Law of Republic of Uzbekistan "On Personal Data" (ЗРУ-547)
 * - UK GDPR / Data Protection Act 2018 (ICO UK)
 * Clean branding: icon-only header, zero fake devices, distinct Android & iOS setup guides.
 */

const I18N_STORAGE_KEY = 'xylen_selected_language_v4';

const TRANSLATIONS = {
  ru: {
    // Navigation
    nav_overview: "Обзор",
    nav_devices: "Устройства",
    nav_traffic: "Трафик",
    nav_releases: "Релизы",
    nav_about: "О платформе",
    nav_privacy: "Конфиденциальность",
    manager_btn: "Менеджер",
    btn_pair_quick: "Подключить",

    // Overview Hero
    hero_badge: "Реальная сотовая телеметрия • Ядро связи v5.2",
    overview_hero_title: "Контроль в движении. Телеметрия без имитаций.",
    overview_hero_sub: "Инженерная платформа для фиксации параметров радиоканала, проверки активных SIM-слотов и аудита сотового трафика в реальном времени. В строгом соответствии с законами Республики Узбекистан и Великобритании.",
    btn_hero_connect: "Подключить устройство",
    btn_hero_releases: "Центр загрузки клиентов",
    social_proof_title: "Прямая совместимость с базовыми станциями операторов связи Узбекистана и Великобритании:",

    // KPI Cards
    kpi_devices: "Реальные устройства",
    kpi_devices_sub: "подключено к системе",
    kpi_sims: "Активные SIM-слоты",
    kpi_sims_sub: "обнаружено в аппаратах",
    kpi_traffic: "Трафик за сессию",
    kpi_traffic_sub: "реальный учёт данных",
    kpi_speed: "Скорость канала",
    kpi_speed_sub: "текущий поток телеметрии",

    // Stack Feature Section (Jitter Style)
    stack_title: "Архитектура контроля телеметрии",
    stack_sub: "Инструменты для инженеров и менеджеров: от аппаратных микрочипов до сотовых вышек.",
    stack_card1_tag: "Слоты и радиоканал",
    stack_card1_title: "Аппаратное считывание SIM и eSIM",
    stack_card1_desc: "Прямой доступ к параметрам сотового радиоядра: уровень мощности в dBm, сотовые идентификаторы вышки CID/TAC, частотные диапазоны LTE Band и 5G NR NSA/SA. Никаких догадок — только чистые инженерные данные.",
    
    stack_card2_tag: "Микро-дельта протокол",
    stack_card2_title: "24-байтный пакет для любых сетей",
    stack_card2_desc: "Специализированный протокол сжатия передает полную диагностику устройства за 24 байта. Работает даже при минимальном уровне 2G/EDGE в горных районах Узбекистана или на перегруженных узлах Лондона без задержек.",
    
    stack_card3_tag: "Аудит операторов",
    stack_card3_title: "Нулевой перерасход и проверка биллинга",
    stack_card3_desc: "Сравнение данных радиочипа телефона с тарификацией оператора. Предотвращение скрытых округлений трафика, паразитных фоновых утечек и неожиданных списаний в роуминге.",

    // Devices Section
    devices_hero_title: "Подключенные устройства и SIM-карты",
    devices_hero_sub: "Контролируйте каждый аппарат и мгновенно просматривайте установленные в него SIM-карты, силу сигнала и сотовые вышки.",
    devices_empty_title: "Ожидание подключения реального устройства",
    devices_empty_desc: "В системе нет искусственных имитаций или случайных чисел. Подключите реальный смартфон с установленным приложением Xylen для начала сбора телеметрии.",
    devices_empty_btn_test: "Подключить тестовый смартфон (Real Packet)",
    devices_pair_token_label: "Ключ сопряжения узла:",
    devices_listening_status: "Шлюз телеметрии активен: ожидание пакетов WebSocket / BroadcastChannel",
    devices_connected_sims: "Текущие подключенные SIM-карты:",
    devices_status_online: "Online (В сети)",
    devices_status_offline: "Offline",
    devices_btn_inspect: "Инспектор телеметрии ➔",
    devices_btn_clear_all: "Отключить все устройства",

    // Traffic Section
    traffic_hero_title: "Мониторинг сотового трафика",
    traffic_hero_sub: "Прямой поток микро-дельта пакетов (24 байта), мгновенная скорость и учет расхода подключенных устройств.",
    traffic_live_badge: "РЕАЛЬНЫЙ ЭФИР",
    traffic_speed_label: "Текущая скорость:",
    traffic_today_label: "Расход за сегодня:",
    traffic_packet_label: "Микро-дельта пакет:",

    // Releases & Installation
    releases_hero_title: "Центр загрузки приложений",
    releases_hero_sub: "Официальные нативные клиенты Xylen для мобильных платформ Google Android и Apple iOS:",
    platform_android_title: "Google Android",
    platform_android_desc: "Клиент фоновой телеметрии для смартфонов и модемов Android 8.0 – 15.0+ (Samsung One UI, Xiaomi HyperOS, Google Pixel).",
    btn_install_android: "Скачать для Android",
    platform_ios_title: "Apple iOS",
    platform_ios_desc: "Нативный клиент телеметрии для iPhone на iOS 16.0 – 18.2+ с защитой ключей в Apple Keychain Vault.",
    btn_install_ios: "Установить на iOS",
    releases_whats_new: "Что нового в версии v5.2:",
    releases_archive_title: "Предыдущие версии",
    qr_hint: "Отсканируйте камерой смартфона для прямой установки:",

    // Installation Guides Tab
    install_guide_title: "Инструкция по установке на устройства",
    install_guide_sub: "Пошаговое руководство по установке и первой настройке для Android и iOS:",
    tab_android_guide: "Инструкция для Android",
    tab_ios_guide: "Инструкция для iOS",

    // Android Steps
    android_step1_title: "1. Скачивание установочного пакета",
    android_step1_desc: "Нажмите «Скачать для Android» или отсканируйте QR-код смартфоном. Файл загрузится в папку «Загрузки».",
    android_step2_title: "2. Разрешение установки из внешних источников",
    android_step2_desc: "При открытии файла система безопасности Android может запросить разрешение. Нажмите «Настройки» и включите тумблер «Разрешить установку из этого источника».",
    android_step3_title: "3. Выдача системных прав телеметрии",
    android_step3_desc: "При первом запуске предоставьте разрешение «Телефон» (READ_PHONE_STATE) — оно необходимо исключительно для считывания параметров SIM-слотов, и «Местоположение» — для фиксации ID сотовой вышки (CID/TAC).",
    android_step4_title: "4. Автономная фоновая работа",
    android_step4_desc: "Приложение готово к работе! В настройках аккумулятора выберите «Без ограничений», чтобы служба передавала 24-байтные отчеты в фоновом режиме с расходом аккумулятора <0.1% в сутки.",

    // iOS Steps
    ios_step1_title: "1. Загрузка установочного пакета",
    ios_step1_desc: "Загрузите файл приложения на iPhone через Safari или воспользуйтесь фирменным установщиком (AltStore, Sideloadly, Scarlet или TestFlight).",
    ios_step2_title: "2. Доверие профилю разработчика",
    ios_step2_desc: "Перейдите в «Настройки» → «Основные» → «VPN и управление устройством». В разделе «Корпоративные приложения» найдите сертификат разработчика Xylen и нажмите «Доверять».",
    ios_step3_title: "3. Активация Apple Keychain Vault",
    ios_step3_desc: "Запустите приложение. Сессионные токены телеметрии будут автоматически зашифрованы и помещены в защищенное аппаратное хранилище Secure Enclave / Apple Keychain.",
    ios_step4_title: "4. Интеграция в Live Activities",
    ios_step4_desc: "На iPhone с Dynamic Island текущая скорость и активный SIM-слот отображаются в компактном виджете реального времени.",

    // About
    about_hero_title: "Создан для тех, кто проводит тесты",
    about_p1: "Xylen Platform — это практический рабочий инструмент для менеджера и технических специалистов: контроль аппаратных устройств, мгновенная проверка подключенных SIM-карт и выявление скрытых списаний трафика операторами связи.",
    about_p2: "Система обеспечивает прямую связь: Менеджер ↔ Реальные устройства ↔ Подключенные SIM-карты ↔ Сетевая телеметрия. Вся обработка происходит локально и через защищенные каналы связи в соответствии с законами Российской Федерации и Великобритании.",

    // Privacy (Russia 152-FZ & UK GDPR)
    privacy_hero_title: "Правовая основа и защита данных",
    privacy_hero_sub: "Платформа строго соблюдает Федеральный закон РФ № 152-ФЗ «О персональных данных» и законодательство Великобритании UK GDPR / Data Protection Act 2018 (ICO UK).",
    privacy_badge_uz: "152-ФЗ РФ (Российская Федерация)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (Великобритания)",
    privacy_p1: "Xylen Platform является инженерным средством диагностики параметров радиоканала и расхода сотового трафика. Платформа собирает исключительно технические параметры радиочастотного спектра (мощность сигнала в dBm, идентификаторы сотовых вышек CID/TAC, стандарт связи LTE/5G).",
    privacy_p2: "В соответствии с требованиями 152-ФЗ РФ и принципом минимизации данных UK GDPR, приложение категорически НЕ собирает и НЕ имеет технического доступа к личным сообщениям (SMS), телефонной книге, персональным фотографиям, видеозаписям и паролям пользователей.",
    privacy_p3: "Хранение и обработка телеметрических данных локализованы и защищены сквозным аппаратным шифрованием AES-256.",

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
    nav_overview: "Umumiy ko'rinish",
    nav_devices: "Qurilmalar",
    nav_traffic: "Trafik",
    nav_releases: "Relizlar",
    nav_about: "Platforma haqida",
    nav_privacy: "Maxfiylik",
    manager_btn: "Menejer",
    btn_pair_quick: "Ulash",

    // Overview Hero
    hero_badge: "Haqiqiy uyali telemetriya • Aloqa yadrosi v5.2",
    overview_hero_title: "Harakatdagi nazorat. Soxta ma'lumotlarsiz.",
    overview_hero_sub: "Radiokanal parametrlarini qayd etish, faol SIM-slotlarni tekshirish va mobil trafikni real vaqtda audit qilish uchun muhandislik platformasi. O'zbekiston Respublikasi va Buyuk Britaniya qonunchiligiga to'liq mos keladi.",
    btn_hero_connect: "Qurilmani ulash",
    btn_hero_releases: "Ilovalar markazi",
    social_proof_title: "O'zbekiston va Buyuk Britaniya aloqa operatorlarining tayanch stansiyalari bilan to'liq moslik:",

    // KPI Cards
    kpi_devices: "Haqiqiy qurilmalar",
    kpi_devices_sub: "tizimga ulangan",
    kpi_sims: "Faol SIM-slotlar",
    kpi_sims_sub: "apparatlarda aniqlangan",
    kpi_traffic: "Sessiya trafigi",
    kpi_traffic_sub: "haqiqiy ma'lumotlar hisobi",
    kpi_speed: "Kanal tezligi",
    kpi_speed_sub: "joriy telemetriya oqimi",

    // Stack Feature Section
    stack_title: "Telemetriyani boshqarish arxitekturasi",
    stack_sub: "Muhandislar va menejerlar uchun asboblar: mikrochiplardan uyali aloqa minoralarigacha.",
    stack_card1_tag: "Slotlar va radiokanal",
    stack_card1_title: "SIM va eSIM apparat tahlili",
    stack_card1_desc: "Radiokanal parametrlariga to'g'ridan-to'g'ri kirish: dBm signali kuchi, CID/TAC minorasi identifikatorlari, LTE Band va 5G NR NSA/SA. Faqat aniq muhandislik ma'lumotlari.",
    
    stack_card2_tag: "Mikro-delta protokoli",
    stack_card2_title: "Har qanday tarmoq uchun 24 baytli paket",
    stack_card2_desc: "Maxsus siqish protokoli qurilma diagnostikasini 24 baytda uzatadi. O'zbekistonning tog'li hududlaridagi 2G/EDGE tarmog'ida yoki Londonning gavjum tugunlarida kechikishlarsiz ishlaydi.",
    
    stack_card3_tag: "Operatorlar auditi",
    stack_card3_title: "Ortiqcha sarfni oldini olish va billing auditi",
    stack_card3_desc: "Telefon radiochipining ma'lumotlarini operator tariflari bilan solishtirish. Yashirin xarajatlar va roumingdagi kutilmagan yechimlarni oldini oladi.",

    // Devices Section
    devices_hero_title: "Ulangan qurilmalar va SIM-kartalar",
    devices_hero_sub: "Har bir qurilmani nazorat qiling va unga o'rnatilgan SIM-kartalar, signal kuchi va tayanch stansiyalarini ko'ring.",
    devices_empty_title: "Haqiqiy qurilmaning ulanishi kutilmoqda",
    devices_empty_desc: "Tizimda hech qanday soxta ma'lumot yoki sun'iy taqlid yo'q. Telemetriya yig'ishni boshlash uchun Xylen ilovasi o'rnatilgan haqiqiy smartfonni ulang.",
    devices_empty_btn_test: "Sinov smartfonini ulash (Real Packet)",
    devices_pair_token_label: "Ulanish kaliti:",
    devices_listening_status: "Telemetriya shlyuzi faol: WebSocket / BroadcastChannel paketlari kutilmoqda",
    devices_connected_sims: "Joriy ulangan SIM-kartalar:",
    devices_status_online: "Tarmoqda (Online)",
    devices_status_offline: "Oflayn",
    devices_btn_inspect: "Telemetriya inspektori ➔",
    devices_btn_clear_all: "Barcha qurilmalarni uzish",

    // Traffic Section
    traffic_hero_title: "Mobil trafik monitoringi",
    traffic_hero_sub: "Mikro-delta paketlar oqimi (24 bayt), joriy tezlik va ulangan qurilmalar trafigi hisobi.",
    traffic_live_badge: "JONLI EFIRDA",
    traffic_speed_label: "Joriy tezlik:",
    traffic_today_label: "Bugungi sarf:",
    traffic_packet_label: "Mikro-delta paket:",

    // Releases & Installation
    releases_hero_title: "Ilovalarni yuklab olish markazi",
    releases_hero_sub: "Google Android va Apple iOS platformalari uchun rasmiy Xylen mijozlari:",
    platform_android_title: "Google Android",
    platform_android_desc: "Android 8.0 – 15.0+ (Samsung, Xiaomi, Pixel) uchun fon telemetriyasi mijozi.",
    btn_install_android: "Android uchun yuklab olish",
    platform_ios_title: "Apple iOS",
    platform_ios_desc: "iOS 16.0 – 18.2+ iPhone qurilmalari uchun Apple Keychain Vault himoyasiga ega nativ mijoz.",
    btn_install_ios: "iOS uchun o'rnatish",
    releases_whats_new: "v5.2 versiyasidagi yangiliklar:",
    releases_archive_title: "Avvalgi versiyalar",
    qr_hint: "To'g'ridan-to'g'ri o'rnatish uchun telefon kamerasi bilan skanerlang:",

    // Installation Guides Tab
    install_guide_title: "Qurilmalarga o'rnatish bo'yicha qo'llanma",
    install_guide_sub: "Android va iOS uchun bosqichma-bosqich o'rnatish va birinchi sozlash:",
    tab_android_guide: "Android uchun qo'llanma",
    tab_ios_guide: "iOS uchun qo'llanma",

    // Android Steps
    android_step1_title: "1. O'rnatish faylini yuklab olish",
    android_step1_desc: "«Android uchun yuklab olish» tugmasini bosing yoki QR-kodni skanerlang. Fayl «Yuklab olinganlar» jildiga tushadi.",
    android_step2_title: "2. Tashqi manbalardan o'rnatishga ruxsat",
    android_step2_desc: "Faylni ochishda xavfsizlik tizimi ruxsat so'rashi mumkin. Sozlamalarga o'tib «Ushbu manbadan o'rnatishga ruxsat berish»ni yoqing.",
    android_step3_title: "3. Tizim ruxsatlarini berish",
    android_step3_desc: "Ilovani birinchi marta ishga tushirishda SIM-kartalar parametrlarini aniqlash uchun «Telefon» va tayanch minorasini aniqlash uchun «Geolokatsiya» ruxsatlarini bering.",
    android_step4_title: "4. Avtonom fon rejimi",
    android_step4_desc: "Ilova tayyor! Batareya sarfi kuniga 0.1% dan kam bo'lib, mikro-delta hisobotlarni uzatadi.",

    // iOS Steps
    ios_step1_title: "1. O'rnatish paketini yuklash",
    ios_step1_desc: "Ilova faylini iPhone-ga Safari orqali yoki qulay o'rnatgich (AltStore, Sideloadly, TestFlight) orqali yuklang.",
    ios_step2_title: "2. Dasturchi profiliga ishonch bildirish",
    ios_step2_desc: "«Sozlamalar» → «Umumiy» → «VPN va qurilmani boshqarish» bo'limiga kiring va Xylen sertifikatiga «Ishonch bildirish» tugmasini bosing.",
    ios_step3_title: "3. Apple Keychain Vault faolligi",
    ios_step3_desc: "Ilovani oching. Telemetriya kalitlari xavfsiz apparat saqlagichida shifrlanadi.",
    ios_step4_title: "4. Live Activities integratsiyasi",
    ios_step4_desc: "Dynamic Island-ga ega iPhone qurilmalarida joriy tezlik va faol SIM vidjetda aks etadi.",

    // About
    about_hero_title: "Sinov o'tkazuvchilar uchun yaratilgan",
    about_p1: "Xylen Platform — bu menejer va muhandislar uchun amaliy ishchi vosita: qurilmalarni nazorat qilish, ulangan SIM-kartalarni tezkor tekshirish va billingni nazorat qilish.",
    about_p2: "Tizim to'g'ridan-to'g'ri bog'lanishni ta'minlaydi: Menejer ↔ Haqiqiy qurilmalar ↔ Ulangan SIM-kartalar ↔ Tarmoq telemetriyasi. Barcha amallar O'zbekiston Respublikasi va Buyuk Britaniya qonunlariga muvofiq bajariladi.",

    // Privacy (Uzbekistan ZRU-547 & UK GDPR)
    privacy_hero_title: "Huquqiy asos va ma'lumotlarni himoya qilish",
    privacy_hero_sub: "Platforma O'zbekiston Respublikasining «Shaxsga doir ma'lumotlar to'g'risida»gi O'RQ-547-son Qonuni va Buyuk Britaniyaning UK GDPR / DPA 2018 standartlariga qat'iy rioya qiladi.",
    privacy_badge_uz: "O'RQ-547 (O'zbekiston Respublikasi)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (Buyuk Britaniya)",
    privacy_p1: "Xylen Platform radiokanal parametrlarini diagnostika qilish uchun muhandislik vositasidir. Platforma faqat texnik parametrlarni (signal kuchi dBm, tayanch minoralari CID/TAC, LTE/5G standartlari) yig'adi.",
    privacy_p2: "O'RQ-547-son Qonunning 15-moddasiga va UK GDPR talablariga muvofiq, ilova foydalanuvchilarning shaxsiy xabarlari (SMS), telefon kitobi, shaxsiy fotosuratlari va parollarini qat'iyan YIG'MAYDI va ularga kirish imkoniga ega EMAS.",
    privacy_p3: "Telemetriya ma'lumotlarini saqlash va qayta ishlash mahalliylashtirilgan va AES-256 shifrlash bilan himoyalangan.",

    // Admin
    admin_auth_title: "Master-Menejer Konsoli",
    admin_auth_sub: "Xavfsizlik PIN-kodini kiriting (7700):",
    admin_auth_btn_login: "Konsolga kirish",
    admin_auth_error: "Noto'g'ri kirish kodi. Qayta urinib ko'ring.",
    admin_visitors_title: "Sessiyalar va ulanishlar auditi jurnali",

    // General
    btn_close: "Yopish",
    btn_copy: "Nusxalash",
    copied_toast: "Buferga nusxalandi!"
  },

  en: {
    // Navigation
    nav_overview: "Overview",
    nav_devices: "Devices",
    nav_traffic: "Traffic",
    nav_releases: "Releases",
    nav_about: "About",
    nav_privacy: "Privacy & Legal",
    manager_btn: "Manager",
    btn_pair_quick: "Pair Device",

    // Overview Hero
    hero_badge: "Real Cellular Telemetry • Network Core v5.2",
    overview_hero_title: "Design in Motion. Telemetry Without Mockups.",
    overview_hero_sub: "Engineering platform for live cellular radio telemetry, active SIM slot verification, and bandwidth audits. Strictly compliant with the laws of the Republic of Uzbekistan and the United Kingdom.",
    btn_hero_connect: "Pair Device",
    btn_hero_releases: "Download Clients",
    social_proof_title: "Direct base station compatibility with mobile operators in Uzbekistan and the United Kingdom:",

    // KPI Cards
    kpi_devices: "Real Devices",
    kpi_devices_sub: "connected to system",
    kpi_sims: "Active SIM Slots",
    kpi_sims_sub: "detected in hardware",
    kpi_traffic: "Session Traffic",
    kpi_traffic_sub: "real bandwidth recorded",
    kpi_speed: "Transfer Speed",
    kpi_speed_sub: "active telemetry stream",

    // Stack Feature Section
    stack_title: "Telemetry Control Architecture",
    stack_sub: "Tools for test engineers and managers: from hardware microchips to cellular towers.",
    stack_card1_tag: "Slots & Radio Channel",
    stack_card1_title: "Hardware SIM & eSIM Inspection",
    stack_card1_desc: "Direct access to cellular radio parameters: signal power in dBm, cell tower identifiers CID/TAC, LTE Band and 5G NR NSA/SA. No guesswork — pure engineering data.",
    
    stack_card2_tag: "Micro-Delta Protocol",
    stack_card2_title: "24-Byte Packet for Any Network",
    stack_card2_desc: "High-efficiency compression delivers full device diagnostics in a 24-byte payload. Operates seamlessly even on fringe 2G/EDGE networks in Uzbekistan or congested nodes in London.",
    
    stack_card3_tag: "Carrier Billing Audit",
    stack_card3_title: "Zero Overage & Billing Audits",
    stack_card3_desc: "Correlate smartphone modem stats with carrier accounting. Eliminate covert roundups, unwanted background drains, and unexpected roaming charges.",

    // Devices Section
    devices_hero_title: "Connected Devices & SIM Cards",
    devices_hero_sub: "Monitor each hardware unit and inspect installed SIM cards, signal power, and serving base stations.",
    devices_empty_title: "Waiting for Real Device Connection",
    devices_empty_desc: "No simulated devices or synthetic random numbers. Connect a real smartphone with the Xylen app installed to begin streaming telemetry.",
    devices_empty_btn_test: "Pair Test Smartphone (Real Packet)",
    devices_pair_token_label: "Node Pairing Key:",
    devices_listening_status: "Telemetry Gateway Active: Listening for WebSocket / BroadcastChannel packets",
    devices_connected_sims: "Currently Connected SIM Cards:",
    devices_status_online: "Online",
    devices_status_offline: "Offline",
    devices_btn_inspect: "Telemetry Inspector ➔",
    devices_btn_clear_all: "Disconnect All Devices",

    // Traffic Section
    traffic_hero_title: "Cellular Traffic Monitoring",
    traffic_hero_sub: "Live stream of 24-byte micro-delta packets, instantaneous throughput, and device consumption accounting.",
    traffic_live_badge: "LIVE FEED",
    traffic_speed_label: "Current Speed:",
    traffic_today_label: "Session Total:",
    traffic_packet_label: "Micro-Delta Packet:",

    // Releases & Installation
    releases_hero_title: "App Download Center",
    releases_hero_sub: "Official native Xylen clients for Google Android and Apple iOS platforms:",
    platform_android_title: "Google Android",
    platform_android_desc: "Background telemetry client for Android 8.0 – 15.0+ handsets and modems (One UI, HyperOS, Pixel AOSP).",
    btn_install_android: "Download for Android",
    platform_ios_title: "Apple iOS",
    platform_ios_desc: "Native telemetry client for iPhone on iOS 16.0 – 18.2+ with Apple Keychain Vault security.",
    btn_install_ios: "Install on iOS",
    releases_whats_new: "What's new in v5.2:",
    releases_archive_title: "Previous Versions",
    qr_hint: "Scan with your smartphone camera for direct install:",

    // Installation Guides Tab
    install_guide_title: "Device Installation Guides",
    install_guide_sub: "Step-by-step installation and initial onboarding for Android and iOS:",
    tab_android_guide: "Android Installation Guide",
    tab_ios_guide: "iOS Installation Guide",

    // Android Steps
    android_step1_title: "1. Download the Installation Package",
    android_step1_desc: "Click «Download for Android» or scan the QR code with your phone. The file will be saved to your Downloads folder.",
    android_step2_title: "2. Allow Installation from Unknown Sources",
    android_step2_desc: "When opening the package, Android security may prompt you. Tap «Settings» and toggle «Allow from this source».",
    android_step3_title: "3. Grant System Telemetry Permissions",
    android_step3_desc: "On first launch, grant «Phone» permission (READ_PHONE_STATE) to query SIM slot status, and «Location» to identify cellular towers (CID/TAC).",
    android_step4_title: "4. Autonomous Background Service",
    android_step4_desc: "Your setup is complete! Battery consumption is under 0.1% per 24h while transmitting lightweight 24B telemetry packets.",

    // iOS Steps
    ios_step1_title: "1. Download the Application Bundle",
    ios_step1_desc: "Download the bundle to your iPhone via Safari or use a trusted installer like AltStore, Sideloadly, Scarlet, or TestFlight.",
    ios_step2_title: "2. Trust Enterprise Developer Profile",
    ios_step2_desc: "Navigate to Settings → General → VPN & Device Management. Under Enterprise App, locate the Xylen certificate and tap «Trust».",
    ios_step3_title: "3. Apple Keychain Vault Activation",
    ios_step3_desc: "Launch the app. Session tokens and telemetry keys are automatically stored in the secure Apple Keychain / Secure Enclave.",
    ios_step4_title: "4. Live Activities Integration",
    ios_step4_desc: "On iPhones with Dynamic Island, the active SIM slot and instantaneous speed are displayed in a real-time widget.",

    // About
    about_hero_title: "Built for Mobile Network Testers",
    about_p1: "Xylen Platform is a hands-on tool for QA engineers and managers: hardware device tracking, instantaneous SIM slot diagnostics, and cellular billing auditing.",
    about_p2: "The system provides an immutable connection: Manager ↔ Real Devices ↔ Connected SIMs ↔ Radio Telemetry. All processing is localized and encrypted pursuant to the laws of the Russian Federation and the United Kingdom.",

    // Privacy
    privacy_hero_title: "Legal Framework & Data Protection",
    privacy_hero_sub: "The platform strictly complies with Federal Law of the Russian Federation No. 152-FZ «On Personal Data» and United Kingdom UK GDPR / Data Protection Act 2018 (ICO UK).",
    privacy_badge_uz: "152-FZ RF (Russian Federation)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (United Kingdom)",
    privacy_p1: "Xylen Platform is an engineering tool for radio frequency diagnostics and data consumption audits. It collects exclusively technical radio telemetry parameters (signal dBm, cell tower CID/TAC identifiers, LTE/5G network generation).",
    privacy_p2: "Under 152-FZ RF and UK GDPR Data Minimization principles, the application NEVER collects and CANNOT access personal SMS, contacts, private photos, videos, or user passwords.",
    privacy_p3: "Data storage and telemetry streams are protected with hardware-backed AES-256 encryption.",

    // Admin
    admin_auth_title: "Master Manager Console",
    admin_auth_sub: "Enter security PIN code (7700):",
    admin_auth_btn_login: "Access Console",
    admin_auth_error: "Invalid access PIN. Please retry.",
    admin_visitors_title: "Session & Telemetry Audit Log",

    // General
    btn_close: "Close",
    btn_copy: "Copy",
    copied_toast: "Copied to clipboard!"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = this.getSavedLang();
    this.init();
  }

  getSavedLang() {
    return localStorage.getItem(I18N_STORAGE_KEY) || 'ru';
  }

  setLang(lang) {
    if (!TRANSLATIONS[lang]) return;
    this.currentLang = lang;
    localStorage.setItem(I18N_STORAGE_KEY, lang);
    this.applyTranslations();
    this.updateControls();
    window.dispatchEvent(new CustomEvent('xylen:lang-changed', { detail: lang }));
  }

  t(key) {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ru;
    return dict[key] || TRANSLATIONS.ru[key] || key;
  }

  applyTranslations() {
    document.documentElement.lang = this.currentLang;
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      if (text) {
        if (el.tagName === 'INPUT' && el.placeholder) {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Also update any attributes
    const attrElements = document.querySelectorAll('[data-i18n-attr]');
    attrElements.forEach(el => {
      const config = el.getAttribute('data-i18n-attr').split(':');
      if (config.length === 2) {
        const attr = config[0];
        const key = config[1];
        el.setAttribute(attr, this.t(key));
      }
    });
  }

  updateControls() {
    const langButtons = document.querySelectorAll('.lang-text-btn[data-lang]');
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
    });
  }

  init() {
    this.updateControls();
    this.applyTranslations();

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-text-btn[data-lang]');
      if (btn) {
        this.setLang(btn.dataset.lang);
      }
    });
  }
}

window.i18n = new I18nManager();
