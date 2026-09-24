/**
 * Xylen Workspace - Multilingual Localization Engine (i18n)
 * Accurate Translations: Russian (RU), Uzbek (UZ), English (EN).
 * Regulatory standards: 
 * - Law of the Republic of Uzbekistan "On Personal Data" (ЗРУ-547 / O'RQ-547)
 * - UK GDPR / Data Protection Act 2018 (ICO UK)
 * Project Origin: Gulistan (Гулистан / Guliston) ↔ London (Лондон)
 * Cellular-Only Guarantee: Wi-Fi traffic is strictly ignored; only cellular mobile data via active SIM is counted.
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
    menu_btn: "Меню",
    btn_pair_quick: "Подключить",

    // Overview Hero
    hero_badge: "Реальная сотовая телеметрия • Ядро связи v5.2",
    overview_hero_title: "Контроль в движении. Телеметрия без имитаций.",
    overview_hero_sub: "Независимый инженерный комплекс аппаратного контроля сотового радиоканала, проверки активных SIM-слотов и сквозного аудита мобильного трафика. Прямой доступ к параметрам радиомодема без посредников и эмуляций.",
    btn_hero_connect: "Мониторинг радиоэфира",
    btn_hero_releases: "Центр загрузки клиентов",
    social_proof_title: "Прямая совместимость с базовыми станциями операторов связи Узбекистана и Великобритании:",

    // KPI Cards
    kpi_devices: "Реальные устройства",
    kpi_devices_sub: "активно в радиоэфире",
    kpi_sims: "Активные SIM-слоты",
    kpi_sims_sub: "обнаружено в аппаратах",
    kpi_traffic: "Сотовый трафик",
    kpi_traffic_sub: "Wi-Fi строго исключён",
    kpi_speed: "Скорость радиоканала",
    kpi_speed_sub: "текущий поток SIM-данных",

    // Stack Feature Section (Jitter Style)
    stack_title: "Архитектура контроля телеметрии",
    stack_sub: "Инструменты для инженеров и менеджеров: от аппаратных микрочипов до сотовых вышек.",
    stack_card1_tag: "Слоты и радиоканал",
    stack_card1_title: "Аппаратное считывание SIM и eSIM",
    stack_card1_desc: "Прямой доступ к параметрам сотового радиоядра: уровень мощности в dBm, сотовые идентификаторы вышки CID/TAC, частотные диапазоны LTE Band и 5G NR NSA/SA. Никаких догадок — только чистые инженерные данные реального чипсета.",
    
    stack_card2_tag: "Микро-дельта протокол",
    stack_card2_title: "24-байтный пакет для любых сетей",
    stack_card2_desc: "Специализированный протокол сжатия передает полную диагностику устройства за 24 байта. Работает даже при слабом уровне 2G/EDGE в Гулистане, по всей Сырдарьинской области и Узбекистану, а также на транзитных узлах Лондона без задержек.",
    
    stack_card3_tag: "Аудит операторов",
    stack_card3_title: "Нулевой перерасход и проверка биллинга",
    stack_card3_desc: "Сравнение данных радиочипа телефона с тарификацией оператора. Предотвращение скрытых округлений сотового трафика, паразитных фоновых утечек и неожиданных списаний в роуминге (Гулистан ↔ Лондон).",

    // 5 Rotating Motion Modules
    motion_section_title: "Инженерные модули Xylen Motion",
    motion_section_sub: "5 интерактивных непрерывно вращающихся компонентов контроля радиоканала и сотовой телеметрии",
    mod1_title: "Orbit: 5G NR Spectrum",
    mod1_sub: "Гулистан ↔ Лондон • Агрегация n78, n41, n28 и Sub-6GHz",
    mod2_title: "DeltaStream: 24-Byte Pulse",
    mod2_sub: "Сжатие дельты телеметрии без потерь • 60 FPS стрим",
    mod3_title: "Hardware Vault: AES-256 Enclave",
    mod3_sub: "Аппаратная защита ключей • Сквозное шифрование AES-256",
    mod4_title: "CellTower Matrix: CID & TAC",
    mod4_sub: "Идентификация вышек Ucell, UMS, Beeline без GPS-расхода",
    mod5_title: "Billing Guard: Mobile Data Audit",
    mod5_sub: "Аудит сотового трафика • Wi-Fi полностью исключён",

    // Devices Section
    devices_hero_title: "Радиоэфир и реестр SIM-карт",
    devices_hero_sub: "Режим постоянного радиоприёма. Платформа ожидает сигналы от фоновых служб мобильного приложения: данные SIM-карт, вышки CID/TAC, радиоуровень RSRP dBm и полный сотовый аудит.",
    devices_empty_title: "Радиоэфир активен • Ожидание передачи данных",
    devices_empty_desc: "Шлюз телеметрии слушает входящие соединения в реальном времени. Как только мобильное приложение запускается на устройстве, данные его активных SIM-карт и сотового радиоканала мгновенно поступают на экран и направляются в модуль анализа трафика.",
    devices_cellular_rule: "ВНИМАНИЕ: Учитывается ТОЛЬКО мобильный сотовый трафик через активные SIM-карты (2G/3G/LTE/5G). Wi-Fi трафик строго игнорируется и не регистрируется.",
    devices_empty_btn_test: "Принять тестовый поток (Real Packet)",
    devices_pair_token_label: "Узел приёма сотовой телеметрии:",
    devices_listening_status: "Шлюз телеметрии активен: радиоприёмник p.xylen.workers.dev (Wi-Fi строго исключён)",
    devices_connected_sims: "Текущие зарегистрированные SIM-карты:",
    devices_status_online: "Online (В эфире)",
    devices_status_offline: "Offline",
    devices_btn_inspect: "Инспектор телеметрии ➔",
    devices_btn_clear_all: "Очистить список устройств",

    // Traffic Section
    traffic_hero_title: "Мониторинг сотового трафика",
    traffic_hero_sub: "Прямой поток микро-дельта пакетов (24 байта), мгновенная скорость и учет расхода подключенных устройств. Фиксируется исключительно сотовая связь.",
    traffic_cellular_only_badge: "ТОЛЬКО СОТОВЫЕ ДАННЫЕ (Wi-Fi ИСКЛЮЧЁН)",
    traffic_live_badge: "РЕАЛЬНЫЙ СОТОВЫЙ ЭФИР",
    traffic_standby_badge: "РЕЖИМ ОЖИДАНИЯ • СТЕНДБАЙ",
    traffic_speed_label: "Текущая скорость SIM:",
    traffic_today_label: "Сотовый расход за сегодня:",
    traffic_packet_label: "Микро-дельта пакет:",
    traffic_wifi_excluded_notice: "Инженерное правило: Трафик беспроводных сетей Wi-Fi категорически исключён из учёта. Фиксируются только байты, прошедшие через стек сотового модема TelephonyManager / NetworkStatsManager.",

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
    about_origin_tag: "Родина проекта • Гулистан, Узбекистан",
    about_origin_title: "История создания: От лаборатории в Гулистане до транзитного шлюза в Лондоне",
    about_origin_p1: "Проект Xylen начался в Гулистане (Сырдарьинская область, Узбекистан). Первоначальной задачей была разработка независимого инженерного решения для аудита мобильного интернета и устранения разногласий между реальным аппаратным трафиком и округлениями сотовых операторов.",
    about_origin_p2: "Из-за специфики региональных сетей было создано сверхэффективное ядро телеметрии, способное стабильно работать даже на слабом 2G/EDGE и передавать диагностику пакетами всего по 24 байта без лишнего расхода мегабайтов пользователя.",
    about_arch_title: "Архитектура нативного стека",
    about_p1: "Xylen Platform — это практический рабочий инструмент для менеджера и технических специалистов: контроль аппаратных устройств, мгновенная проверка подключенных SIM-карт и выявление скрытых списаний сотового трафика операторами связи.",
    about_p2: "Нативное приложение для Android написано на Kotlin и Jetpack Compose. Оно использует системные службы TelephonyManager, SubscriptionManager и NetworkStatsManager, запуская изолированный Foreground Service. Это обеспечивает 100% достоверность данных без погрешностей эмуляторов.",
    about_p3: "Для трансграничного обмена развёрнут шлюз Cloudflare Workers Edge (p.xylen.workers.dev). Первичный контур данных обрабатывается локально в Узбекистане, а зашифрованный транзитный контур связывает узел с Лондоном с защитой AES-256.",
    about_p4: "Трафик беспроводных сетей Wi-Fi полностью игнорируется алгоритмами учёта. Xylen фокусируется исключительно на сотовой мобильной среде и параметрах базовых станций.",

    // Privacy
    privacy_hero_title: "Правовая основа и защита данных",
    privacy_hero_sub: "Платформа строго соблюдает Закон Республики Узбекистан № ЗРУ-547 «О персональных данных» и законодательство Великобритании UK GDPR / Data Protection Act 2018 (ICO UK).",
    privacy_badge_uz: "ЗРУ-547 (Республика Узбекистан)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (Великобритания)",
    privacy_p1: "Xylen Platform является инженерным средством диагностики параметров радиоканала и расхода сотового трафика. Платформа собирает исключительно технические параметры радиочастотного спектра (мощность сигнала в dBm, идентификаторы сотовых вышек CID/TAC, стандарт связи LTE/5G).",
    privacy_p2: "В соответствии со статьями 13, 15 и 18 Закона РУз № ЗРУ-547 и принципом минимизации данных UK GDPR, приложение категорически НЕ собирает и НЕ имеет технического доступа к личным сообщениям (SMS), телефонной книге, персональным фотографиям, аудиозаписям звонков, истории браузера и паролям пользователей.",
    privacy_p3: "Хранение и обработка телеметрических данных локализованы в Республике Узбекистан в соответствии со статьёй 27-1 ЗРУ-547. Все транзитные потоки защищены сквозным аппаратным шифрованием AES-256-GCM с использованием аппаратных анклавов Android Keystore и Apple Secure Enclave.",
    privacy_p4: "Пользователь имеет право в любой момент прекратить сессию и удалить телеметрические логи одним нажатием. Данные не передаются рекламным сетям или сторонним брокерам данных.",
    privacy_law_uz_title: "Соответствие Закону РУз № ЗРУ-547 «О персональных данных»",
    privacy_law_uz_desc: "Соблюдение принципов законности, соразмерности и ограничения целей обработки. Базы персональных данных граждан РУз обрабатываются на серверах, физически размещённых в соответствии с законодательством Республики Узбекистан.",
    privacy_law_uk_title: "Соответствие UK GDPR и Data Protection Act 2018",
    privacy_law_uk_desc: "Трансграничный шлюз в Лондоне отвечает высочайшим мировым стандартам конфиденциальности под юрисдикцией Информационного комиссара Великобритании (ICO).",

    // Admin
    admin_auth_title: "Консоль Мастер-Менеджера",
    admin_auth_sub: "Вход выполняется через Cloudflare Access.",
    admin_auth_btn_login: "Войти в консоль",
    admin_auth_error: "Требуется авторизация владельца через Cloudflare Access.",
    admin_visitors_title: "Журнал аудита сессий и подключений",

    // Footer
    footer_copyright: "© 2026 Xylen • Все права защищены",

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
    nav_privacy: "Maxfiylik va qonuniylik",
    manager_btn: "Menejer",
    menu_btn: "Menyu",
    btn_pair_quick: "Ulash",

    // Overview Hero
    hero_badge: "Haqiqiy mobil telemetriya • Aloqa yadrosi v5.2",
    overview_hero_title: "Harakatdagi nazorat. Soxtaliklarsiz telemetriya.",
    overview_hero_sub: "Radiokanal parametrlarini aniqlash, faol SIM-slotlarni tekshirish va mobil internet sarfini to'liq audit qilish mustaqil muhandislik platformasi. Radiomodem parametrlariga vositachilarsiz to'g'ridan-to'g'ri kirish.",
    btn_hero_connect: "Radioefir monitoringi",
    btn_hero_releases: "Mijozlarni yuklab olish",
    social_proof_title: "O'zbekiston va Buyuk Britaniya aloqa operatorlari tayanch minoralari bilan to'g'ridan-to'g'ri moslik:",

    // KPI Cards
    kpi_devices: "Haqiqiy qurilmalar",
    kpi_devices_sub: "efirda faol",
    kpi_sims: "Faol SIM-slotlar",
    kpi_sims_sub: "apparatda aniqlangan",
    kpi_traffic: "Mobil internet sarfi",
    kpi_traffic_sub: "Wi-Fi qat'iyan hisobga olinmaydi",
    kpi_speed: "Kanal tezligi",
    kpi_speed_sub: "SIM-karta telemetriya oqimi",

    // Stack Feature Section (Jitter Style)
    stack_title: "Telemetriyani boshqarish arxitekturasi",
    stack_sub: "Muhandislar va menejerlar uchun vositalar: apparat mikrosxemalaridan tortib tayanch minoralarigacha.",
    stack_card1_tag: "Slotlar va radiokanal",
    stack_card1_title: "SIM va eSIM apparat tahlili",
    stack_card1_desc: "Mobil radio yadrosi parametrlariga to'g'ridan-to'g'ri kirish: signal quvvati dBm, CID/TAC minora identifikatorlari, LTE va 5G NR diapazonlari. Hech qanday taxminlarsiz — faqat haqiqiy mikrosxema ma'lumotlari.",
    
    stack_card2_tag: "Mikro-delta protokoli",
    stack_card2_title: "Har qanday tarmoq uchun 24 baytli paket",
    stack_card2_desc: "Maxsus siqish protokoli qurilma diagnostikasini 24 baytda uzatadi. Gulistonda, butun Sirdaryo viloyatida, O'zbekistonning chekka hududlarida 2G/EDGE orqali yoki Londonning gavjum tugunlarida kechikishlarsiz ishlaydi.",
    
    stack_card3_tag: "Operatorlar auditi",
    stack_card3_title: "Nol ortiqcha sarf va billing tekshiruvi",
    stack_card3_desc: "Telefon radiochipi ma'lumotlarini operator hisob-kitoblari bilan solishtirish. Yashirin yaxlitlashlar va kutilmagan to'lovlarni oldini olish (Guliston ↔ London).",

    // 5 Rotating Motion Modules
    motion_section_title: "Xylen Motion muhandislik modullari",
    motion_section_sub: "Radiokanal va mobil telemetriyani nazorat qiluvchi 5 ta doimiy aylanuvchi interaktiv modul",
    mod1_title: "Orbit: 5G NR Spectrum",
    mod1_sub: "Guliston ↔ London • n78, n41, n28 tashuvchilar agregatsiyasi",
    mod2_title: "DeltaStream: 24-Byte Pulse",
    mod2_sub: "Yo'qotishlarsiz telemetriya deltasini siqish • 60 FPS oqim",
    mod3_title: "Hardware Vault: AES-256 Enclave",
    mod3_sub: "Apparat kalitlar himoyasi • AES-256 shifrlash",
    mod4_title: "CellTower Matrix: CID & TAC",
    mod4_sub: "Ucell, UMS, Beeline minoralarini GPS-siz tezkor aniqlash",
    mod5_title: "Billing Guard: Mobile Data Audit",
    mod5_sub: "Mobil internet auditi • Wi-Fi butunlay chiqarib tashlangan",

    // Devices Section
    devices_hero_title: "Radioefir va SIM-kartalar reestri",
    devices_hero_sub: "Doimiy radioqabul rejimi. Platforma mobil ilovaning fon xizmatlaridan signallarni kutadi: SIM-karta parametrlari, CID/TAC minoralari, RSRP dBm darajasi va to'liq audit.",
    devices_empty_title: "Radioefir faol • Ma'lumot uzatilishini kutish",
    devices_empty_desc: "Telemetriya shlyuzi real vaqt rejimida kiruvchi ulanishlarni eshitadi. Mobil ilova qurilmada ishga tushishi bilanoq, uning faol SIM-kartalari va radiokanal ma'lumotlari ekranga uzatiladi hamda trafik auditiga yo'naltiriladi.",
    devices_cellular_rule: "DIQQAT: FAQAT faol SIM-karta orqali mobil tarmoq trafigi (2G/3G/LTE/5G) hisobga olinadi. Wi-Fi trafigi qat'iyan inobatga olinmaydi.",
    devices_empty_btn_test: "Sinov oqimini qabul qilish (Real Packet)",
    devices_pair_token_label: "Mobil telemetriyani qabul qilish tuguni:",
    devices_listening_status: "Telemetriya shlyuzi faol: p.xylen.workers.dev radioqabul qilgich (Wi-Fi qat'iyan chiqarilgan)",
    devices_connected_sims: "Joriy ro'yxatdan o'tgan SIM-kartalar:",
    devices_status_online: "Online (Efirda)",
    devices_status_offline: "Offline",
    devices_btn_inspect: "Telemetriya inspektori ➔",
    devices_btn_clear_all: "Qurilmalar ro'yxatini tozalash",

    // Traffic Section
    traffic_hero_title: "Mobil internet trafigi monitoringi",
    traffic_hero_sub: "Mikro-delta paketlari (24 bayt) to'g'ridan-to'g'ri oqimi, tezkor tezlik va ulangan qurilmalar sarfi hisobi. Faqat mobil internet hisoblanadi.",
    traffic_cellular_only_badge: "FAQAT MOBIL MA'LUMOTLAR (Wi-Fi CHIQARILGAN)",
    traffic_live_badge: "HAQIQIY MOBIL EFIR",
    traffic_standby_badge: "KUTISH REJIMI • STANDBY",
    traffic_speed_label: "SIM joriy tezligi:",
    traffic_today_label: "Bugungi mobil sarf:",
    traffic_packet_label: "Mikro-delta paket:",
    traffic_wifi_excluded_notice: "Muhandislik qoidasi: Wi-Fi tarmoqlari trafigi qat'iyan chiqarib tashlangan. Faqat modem steki (TelephonyManager) orqali o'tgan baytlar qayd etiladi.",

    // Releases & Installation
    releases_hero_title: "Ilovalarni yuklab olish markazi",
    releases_hero_sub: "Google Android va Apple iOS mobil platformalari uchun rasmiy nativ Xylen mijozlari:",
    platform_android_title: "Google Android",
    platform_android_desc: "Android 8.0 – 15.0+ (Samsung One UI, Xiaomi HyperOS, Google Pixel) smartfonlari uchun fon telemetriyasi mijozi.",
    btn_install_android: "Android uchun yuklab olish",
    platform_ios_title: "Apple iOS",
    platform_ios_desc: "Apple Keychain Vault bilan himoyalangan iOS 16.0 – 18.2+ iPhone qurilmalari uchun nativ telemetriya mijozi.",
    btn_install_ios: "iOS uchun o'rnatish",
    releases_whats_new: "v5.2 versiyasidagi yangiliklar:",
    releases_archive_title: "Oldingi versiyalar",
    qr_hint: "To'g'ridan-to'g'ri o'rnatish uchun smartfon kamerasi bilan skanerlang:",

    // Installation Guides Tab
    install_guide_title: "Qurilmalarga o'rnatish bo'yicha qo'llanma",
    install_guide_sub: "Android va iOS uchun bosqichma-bosqich o'rnatish va dastlabki sozlash yo'riqnomasi:",
    tab_android_guide: "Android uchun qo'llanma",
    tab_ios_guide: "iOS uchun qo'llanma",

    // Android Steps
    android_step1_title: "1. O'rnatish paketini yuklash",
    android_step1_desc: "«Android uchun yuklab olish» tugmasini bosing yoki QR-kodni skanerlang. Fayl «Yuklanmalar» jildiga saqlanadi.",
    android_step2_title: "2. Tashqi manbalardan o'rnatishga ruxsat berish",
    android_step2_desc: "Faylni ochishda Android xavfsizlik tizimi ruxsat so'rashi mumkin. «Sozlamalar»ga o'ting va «Ushbu manbadan o'rnatishga ruxsat berish» tugmasini yoqing.",
    android_step3_title: "3. Tizim ruxsatlarini berish",
    android_step3_desc: "Birinchi ishga tushirishda «Telefon» ruxsatini (READ_PHONE_STATE) bering — bu faqat SIM-slot parametrlarini o'qish uchun kerak, hamda «Joylashuv» — tayanch minorasi ID-sini (CID/TAC) aniqlash uchun zarur.",
    android_step4_title: "4. Avtonom fon rejimi",
    android_step4_desc: "Ilova tayyor! Batareya sarfi sozlamalarida «Cheklovlarsiz» bandini tanlang, shunda xizmat kuniga 0.1% dan kam quvvat sarflab fon rejimida ishlaydi.",

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
    about_origin_tag: "Loyiha vatani • Guliston, O'zbekiston",
    about_origin_title: "Yaratilish tarixi: Gulistondagi laboratoriyadan Londondagi tranzit shlyuzgacha",
    about_origin_p1: "Xylen loyihasi Gulistonda (Sirdaryo viloyati, O'zbekiston) boshlangan. Dastlabki maqsad mobil internetni mustaqil ravishda audit qilish va apparat sarfi bilan operator yaxlitlashlari o'rtasidagi tafovutlarni bartaraf etish edi.",
    about_origin_p2: "Mintaqaviy tarmoqlarning o'ziga xosligi tufayli zaif 2G/EDGE tarmoqlarida ham barqaror ishlaydigan va diagnostikani atigi 24 baytli paketlarda uzatuvchi o'ta tejamkor telemetriya yadrosi yaratildi.",
    about_arch_title: "Nativ dasturiy arxitektura",
    about_p1: "Xylen Platform — bu menejer va muhandislar uchun amaliy ishchi vosita: apparat qurilmalarini nazorat qilish, ulangan SIM-kartalarni tezkor tekshirish va mobil internet billingini nazorat qilish.",
    about_p2: "Android uchun nativ ilova Kotlin va Jetpack Compose-da yozilgan. U TelephonyManager, SubscriptionManager va NetworkStatsManager tizim xizmatlaridan foydalanib, izolyatsiyalangan Foreground Service sifatida ishlaydi.",
    about_p3: "Transchegaraviy ma'lumotlar almashinuvi uchun Cloudflare Workers Edge (p.xylen.workers.dev) shlyuzi yo'lga qo'yilgan. Birlamchi ma'lumotlar O'zbekistonda saqlanadi, shifrlangan tranzit esa London bilan AES-256 orqali bog'langan.",
    about_p4: "Wi-Fi simsiz tarmoqlari trafigi hisob-kitob algoritmlaridan butunlay chiqarib tashlangan. Xylen faqat uyali aloqa muhitiga e'tibor qaratadi.",

    // Privacy
    privacy_hero_title: "Huquqiy asos va ma'lumotlarni himoya qilish",
    privacy_hero_sub: "Platforma O'zbekiston Respublikasining «Shaxsga doir ma'lumotlar to'g'risida»gi O'RQ-547-son Qonuni va Buyuk Britaniyaning UK GDPR / Data Protection Act 2018 standartlariga qat'iy rioya qiladi.",
    privacy_badge_uz: "O'RQ-547 (O'zbekiston Respublikasi)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (Buyuk Britaniya)",
    privacy_p1: "Xylen Platform radiokanal parametrlarini diagnostika qilish uchun muhandislik vositasidir. Platforma faqat texnik parametrlarni (signal kuchi dBm, tayanch minoralari CID/TAC, LTE/5G standartlari) yig'adi.",
    privacy_p2: "O'RQ-547-son Qonunning 13, 15 va 18-moddalariga hamda UK GDPR talablariga muvofiq, ilova foydalanuvchilarning shaxsiy xabarlari (SMS), telefon kitobi, shaxsiy fotosuratlari, qo'ng'iroq audiosi, brauzer tarixi va parollarini qat'iyan YIG'MAYDI va ularga kirish imkoniga ega EMAS.",
    privacy_p3: "Telemetriya ma'lumotlarini saqlash va qayta ishlash O'RQ-547-son Qonunning 27-1-moddasiga muvofiq O'zbekistonda mahalliylashtirilgan. Tranzit oqimlar AES-256-GCM apparat shifrlash bilan himoyalangan.",
    privacy_p4: "Foydalanuvchi istalgan vaqtda sessiyani to'xtatishi va o'z ma'lumotlarini bitta tugma bilan o'chirishi mumkin. Ma'lumotlar reklama tarmoqlariga berilmaydi.",
    privacy_law_uz_title: "O'RQ-547 Qonuniga to'liq muvofiqlik",
    privacy_law_uz_desc: "Qonuniylik, mutanosiblik va qayta ishlash maqsadlarini cheklash tamoyillariga rioya etiladi. Ma'lumotlar bazasi O'zbekiston qonunchiligiga binoan jismonan joylashtirilgan serverlarda saqlanadi.",
    privacy_law_uk_title: "UK GDPR va Data Protection Act 2018 talablari",
    privacy_law_uk_desc: "Londondagi tranzit shlyuz Buyuk Britaniya Axborot komissari (ICO) yurisdiksiyasi ostida eng yuqori jahon maxfiylik standartlariga javob beradi.",

    // Admin
    admin_auth_title: "Master-Menejer Konsoli",
    admin_auth_sub: "Kirish Cloudflare Access orqali amalga oshiriladi.",
    admin_auth_btn_login: "Konsolga kirish",
    admin_auth_error: "Cloudflare Access orqali egasi tasdiqlanishi kerak.",
    admin_visitors_title: "Sessiyalar va ulanishlar auditi jurnali",

    // Footer
    footer_copyright: "© 2026 Xylen • Barcha huquqlar himoyalangan",

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
    menu_btn: "Menu",
    btn_pair_quick: "Pair Device",

    // Overview Hero
    hero_badge: "Real Cellular Telemetry • Network Core v5.2",
    overview_hero_title: "Design in Motion. Telemetry Without Mockups.",
    overview_hero_sub: "Independent engineering suite for cellular RF telemetry, active SIM slot inspection, and end-to-end mobile data auditing. Direct hardware modem parameters without intermediaries or emulations.",
    btn_hero_connect: "Radio Ether Monitoring",
    btn_hero_releases: "Download Clients",
    social_proof_title: "Direct base station compatibility with mobile operators in Uzbekistan and the United Kingdom:",

    // KPI Cards
    kpi_devices: "Real Devices",
    kpi_devices_sub: "active in radio ether",
    kpi_sims: "Active SIM Slots",
    kpi_sims_sub: "detected in hardware",
    kpi_traffic: "Cellular Traffic",
    kpi_traffic_sub: "Wi-Fi strictly excluded",
    kpi_speed: "Radio Bandwidth",
    kpi_speed_sub: "live SIM telemetry stream",

    // Stack Feature Section (Jitter Style)
    stack_title: "Telemetry Control Architecture",
    stack_sub: "Tools for engineers and network managers: from hardware microchips to cellular towers.",
    stack_card1_tag: "Slots & RF Modem",
    stack_card1_title: "Hardware SIM & eSIM Extraction",
    stack_card1_desc: "Direct access to cellular radio parameters: signal power in dBm, cell tower CID/TAC identifiers, LTE Band and 5G NR NSA/SA frequencies. Zero assumptions — pure engineering telemetry directly from the physical modem.",
    
    stack_card2_tag: "Micro-Delta Protocol",
    stack_card2_title: "24-Byte Packet for Any Cellular Network",
    stack_card2_desc: "Proprietary delta compression protocol transmitting full device diagnostics in just 24 bytes. Seamlessly operates over weak 2G/EDGE in Gulistan, throughout the Syrdarya region and Uzbekistan, as well as high-density transit nodes in London without packet loss.",
    
    stack_card3_tag: "Carrier Billing Audit",
    stack_card3_title: "Zero Overspend & Billing Verification",
    stack_card3_desc: "Cross-checks device modem byte counts against carrier billing records. Prevents hidden data rounding, ghost background leaks, and unexpected roaming surcharges (Gulistan ↔ London).",

    // 5 Rotating Motion Modules
    motion_section_title: "Xylen Motion Engineering Modules",
    motion_section_sub: "5 interactive continuously revolving components for RF monitoring and cellular telemetry",
    mod1_title: "Orbit: 5G NR Spectrum",
    mod1_sub: "Gulistan ↔ London • n78, n41, n28 & Sub-6GHz carrier aggregation",
    mod2_title: "DeltaStream: 24-Byte Pulse",
    mod2_sub: "Lossless telemetry delta compression • 60 FPS live stream",
    mod3_title: "Hardware Vault: AES-256 Enclave",
    mod3_sub: "Hardware-backed keys • AES-256 End-to-End Encryption",
    mod4_title: "CellTower Matrix: CID & TAC",
    mod4_sub: "Real-time Ucell, UMS, Beeline tower tracking without GPS drain",
    mod5_title: "Billing Guard: Mobile Data Audit",
    mod5_sub: "Cellular data byte audit • Wi-Fi traffic completely excluded",

    // Devices Section
    devices_hero_title: "Radio Ether & SIM Registry",
    devices_hero_sub: "Continuous listening mode. The platform awaits telemetry signals from mobile app background services: SIM card data, CID/TAC towers, RSRP dBm signal strength, and deep cellular audit.",
    devices_empty_title: "Radio Ether Active • Waiting for Ingestion Stream",
    devices_empty_desc: "The telemetry gateway listens for real-time incoming connections. As soon as the mobile app launches, active SIM cards and cellular radio metrics are streamed to the screen and forwarded to the traffic audit module.",
    devices_cellular_rule: "ATTENTION: ONLY cellular mobile data via active SIM cards (2G/3G/LTE/5G) is metered. Wi-Fi traffic is strictly ignored and unrecorded.",
    devices_empty_btn_test: "Ingest Test Packet (Real Packet)",
    devices_pair_token_label: "Cellular Telemetry Ingestion Node:",
    devices_listening_status: "Telemetry Gateway active: p.xylen.workers.dev receiver (Wi-Fi strictly excluded)",
    devices_connected_sims: "Currently Registered SIM Cards:",
    devices_status_online: "Online (On Air)",
    devices_status_offline: "Offline",
    devices_btn_inspect: "Telemetry Inspector ➔",
    devices_btn_clear_all: "Clear Device List",

    // Traffic Section
    traffic_hero_title: "Cellular Traffic Monitoring",
    traffic_hero_sub: "Direct stream of 24-byte micro-delta packets, instantaneous speed, and cellular data consumption. Cellular data only.",
    traffic_cellular_only_badge: "CELLULAR DATA ONLY (Wi-Fi EXCLUDED)",
    traffic_live_badge: "LIVE CELLULAR RF",
    traffic_standby_badge: "STANDBY MODE • WAITING",
    traffic_speed_label: "Current SIM Speed:",
    traffic_today_label: "Today's Cellular Usage:",
    traffic_packet_label: "Micro-Delta Packet:",
    traffic_wifi_excluded_notice: "Engineering Rule: Wi-Fi traffic is categorically excluded from metering. Only bytes routed through the cellular modem stack (TelephonyManager / NetworkStatsManager) are recorded.",

    // Releases & Installation
    releases_hero_title: "App Download Center",
    releases_hero_sub: "Official native Xylen clients for Google Android and Apple iOS mobile platforms:",
    platform_android_title: "Google Android",
    platform_android_desc: "Background telemetry client for Android 8.0 – 15.0+ smartphones (Samsung One UI, Xiaomi HyperOS, Google Pixel).",
    btn_install_android: "Download for Android",
    platform_ios_title: "Apple iOS",
    platform_ios_desc: "Native telemetry client for iPhone running iOS 16.0 – 18.2+ with Apple Keychain Vault protection.",
    btn_install_ios: "Install on iOS",
    releases_whats_new: "What's new in version v5.2:",
    releases_archive_title: "Previous Versions",
    qr_hint: "Scan with your smartphone camera for direct installation:",

    // Installation Guides Tab
    install_guide_title: "Device Installation Guides",
    install_guide_sub: "Step-by-step setup guides for Android and iOS devices:",
    tab_android_guide: "Guide for Android",
    tab_ios_guide: "Guide for iOS",

    // Android Steps
    android_step1_title: "1. Download installation package",
    android_step1_desc: "Click 'Download for Android' or scan the QR code with your phone. The file will be saved to your Downloads folder.",
    android_step2_title: "2. Allow installation from external sources",
    android_step2_desc: "When opening the package, Android security may prompt you. Tap 'Settings' and toggle 'Allow from this source'.",
    android_step3_title: "3. Grant telemetry system permissions",
    android_step3_desc: "On first launch, grant 'Phone' (READ_PHONE_STATE) permission — strictly required to read SIM slot parameters, and 'Location' — required to read Cell Tower IDs (CID/TAC).",
    android_step4_title: "4. Autonomous background service",
    android_step4_desc: "The app is ready! In battery settings, select 'Unrestricted' so the service sends 24-byte reports in the background with <0.1% battery drain per day.",

    // iOS Steps
    ios_step1_title: "1. Download installation package",
    ios_step1_desc: "Download the app package to your iPhone via Safari or use an installer utility (AltStore, Sideloadly, Scarlet, or TestFlight).",
    ios_step2_title: "2. Trust developer enterprise profile",
    ios_step2_desc: "Go to Settings → General → VPN & Device Management. Under Enterprise Apps, locate Xylen Developer and tap 'Trust'.",
    ios_step3_title: "3. Activate Apple Keychain Vault",
    ios_step3_desc: "Launch the app. Session telemetry tokens are automatically encrypted and placed into the Secure Enclave / Apple Keychain vault.",
    ios_step4_title: "4. Integrate with Live Activities",
    ios_step4_desc: "On iPhones with Dynamic Island, the active SIM slot and instantaneous speed are displayed in a real-time widget.",

    // About
    about_hero_title: "Built for Mobile Network Testers",
    about_origin_tag: "Project Origin • Gulistan, Uzbekistan",
    about_origin_title: "Origin Story: From a Gulistan Lab to the London Transit Gateway",
    about_origin_p1: "The Xylen platform was born in Gulistan (Syrdarya Region, Uzbekistan). The initial goal was to build an independent engineering solution for auditing cellular data and resolving discrepancies between physical modem usage and carrier billing roundings.",
    about_origin_p2: "Given regional cellular constraints, an ultra-efficient telemetry core was engineered to transmit diagnostics in tiny 24-byte packets with zero packet loss, functioning even over weak 2G/EDGE networks without consuming user data allowances.",
    about_arch_title: "Native Architecture Stack",
    about_p1: "Xylen Platform is a hands-on tool for QA engineers and managers: hardware device tracking, instantaneous SIM slot diagnostics, and cellular billing auditing.",
    about_p2: "The native Android client is built with Kotlin and Jetpack Compose. It utilizes the TelephonyManager, SubscriptionManager, and NetworkStatsManager APIs running an isolated Foreground Service for reliable, real-world data collection.",
    about_p3: "For cross-border routing, a Cloudflare Workers Edge gateway (p.xylen.workers.dev) is deployed. Primary data sovereignty is maintained locally in Uzbekistan, while an encrypted transit pipeline links the node to London via AES-256.",
    about_p4: "Wi-Fi traffic is completely ignored by the billing and telemetry engine. Xylen focuses exclusively on the cellular mobile environment and base station parameters.",

    // Privacy
    privacy_hero_title: "Legal Framework & Data Protection",
    privacy_hero_sub: "The platform strictly complies with the Law of the Republic of Uzbekistan No. ZRU-547 «On Personal Data» and United Kingdom UK GDPR / Data Protection Act 2018 (ICO UK).",
    privacy_badge_uz: "ZRU-547 (Republic of Uzbekistan)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (United Kingdom)",
    privacy_p1: "Xylen Platform is an engineering tool for radio frequency diagnostics and data consumption audits. It collects exclusively technical radio telemetry parameters (signal dBm, cell tower CID/TAC identifiers, LTE/5G network generation).",
    privacy_p2: "Under Articles 13, 15, and 18 of Law ZRU-547 and the UK GDPR Data Minimization principle, the application NEVER collects and CANNOT access personal SMS, contacts, private photos, call audio, browsing history, or user passwords.",
    privacy_p3: "Telemetry data storage and processing are localized in Uzbekistan pursuant to Article 27-1 of Law ZRU-547. All transit streams are secured with hardware-backed AES-256-GCM encryption via Android Keystore and Apple Secure Enclave.",
    privacy_p4: "Users may terminate their session and wipe telemetry records at any time. Data is never shared with advertising networks or third-party brokers.",
    privacy_law_uz_title: "Compliance with Law of the Republic of Uzbekistan No. ZRU-547",
    privacy_law_uz_desc: "Strict adherence to the principles of legality, proportionality, and purpose limitation. Personal databases are processed on servers physically located within the Republic of Uzbekistan.",
    privacy_law_uk_title: "Compliance with UK GDPR & Data Protection Act 2018",
    privacy_law_uk_desc: "The London transit gateway meets the highest global privacy standards under the regulatory oversight of the UK Information Commissioner's Office (ICO).",

    // Admin
    admin_auth_title: "Master Manager Console",
    admin_auth_sub: "Sign in through Cloudflare Access.",
    admin_auth_btn_login: "Access Console",
    admin_auth_error: "Owner authentication through Cloudflare Access is required.",
    admin_visitors_title: "Session & Telemetry Audit Log",

    // Footer
    footer_copyright: "© 2026 Xylen • All rights reserved",

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
