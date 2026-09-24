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
    nav_overview: "Главное",
    nav_devices: "Обзор устройства",
    nav_traffic: "Трафик",
    nav_releases: "Релизы",
    nav_about: "О платформе",
    nav_privacy: "Конфиденциальность",
    interlude_kicker: "ПРИНЦИП ПЕРЕДАЧИ · 01",
    interlude_title_lead: "Сначала —",
    interlude_title_focus: "согласие.",
    interlude_desc: "Android отправляет отчёт только после согласия. Ниже — путь данных от клиента до сводки.",
    interlude_step_1: "РАЗРЕШИТЬ",
    interlude_step_2: "ОТПРАВИТЬ ОТЧЁТ",
    interlude_step_3: "ПОКАЗАТЬ СВОДКУ",
    interlude_path_label: "Путь Android-отчёта",
    manager_btn: "Менеджер",
    menu_btn: "Меню",
    btn_pair_quick: "Подключить",

    // Overview Hero
    hero_badge: "Реальная сотовая телеметрия • Ядро связи v5.2",
    overview_hero_title: "Silent Motion",
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
    stack_sub: "Путь согласованного Android-отчёта: от решения пользователя до агрегированной сводки и защищённого просмотра.",
    stack_card1_tag: "Поля Android-отчёта",
    stack_card1_title: "Счётчики, которые сообщает клиент",
    stack_card1_desc: "Android может передать приложению доступные ему мобильные счётчики, оператора и сведения о SIM-профиле. Это данные отчёта на момент его формирования, а не прямое чтение радиомодема, вышек или уровня сигнала.",
    
    stack_card2_tag: "Путь отчёта",
    stack_card2_title: "Передача после согласия",
    stack_card2_desc: "После согласия Android-клиент отправляет JSON-отчёт в веб API. Доставка зависит от сети и доступности сервиса; специальный размер пакета, собственный протокол сжатия и работу без задержек проект не заявляет.",
    
    stack_card3_tag: "Сводка без домыслов",
    stack_card3_title: "Присланные данные — в понятном виде",
    stack_card3_desc: "Публичная страница показывает доступные агрегаты по полученным отчётам. Она не сверяет показания с биллингом оператора, не подтверждает точность клиентских счётчиков и не обещает предотвратить списания.",

    // 5 Rotating Motion Modules
    motion_section_title: "Путь отчёта",
    motion_section_sub: "Пять коротких сцен показывают путь Android-отчёта и локальный журнал iOS.",
    mod1_title: "Согласие и отчёт",
    mod1_sub: "Android отправляет веб-отчёт только после согласия.",
    mod2_title: "Поля события",
    mod2_sub: "Клиент формирует JSON-событие и доступные ему счётчики.",
    mod3_title: "Публичная сводка",
    mod3_sub: "Открытая часть показывает агрегированные числа.",
    mod4_title: "Доступ владельца",
    mod4_sub: "Подробные записи требуют проверки Cloudflare Access.",
    mod5_title: "Журнал iOS",
    mod5_sub: "Изученный клиент хранит журнал на устройстве.",

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
    privacy_hero_title: "Конфиденциальность",
    privacy_hero_sub: "Техническое описание потока данных Xylen. Применимость требований и основания обработки определяет оператор платформы.",
    privacy_badge_uz: "ЗРУ-547 (Республика Узбекистан)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (Великобритания)",
    privacy_p1: "После согласия Android передаёт ID установки, модель, имя тестировщика, экран, действие и детали, оператора, временную отметку, состояние, дневные и сессионные счётчики, а также активные или использованные сегодня SIM-профили.",
    privacy_p2: "Веб audit API не получает номер телефона, ICCID, IMSI, идентификаторы вышек или измерения радиосигнала. Изученный исходный код iOS хранит журнал на устройстве и не отправляет его в этот веб API.",
    privacy_p3: "Публичный endpoint возвращает только агрегированные сведения. Подробные записи защищены проверкой Cloudflare Access и email владельца; постоянное хранение зависит от настройки Cloudflare KV.",
    privacy_p4: "Журнал на сервере ограничен последними 200 событиями, а последняя запись устройства хранится до удаления оператором. Отзыв согласия прекращает будущую отправку, но не удаляет ранее сохранённые серверные записи.",
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
    nav_overview: "Asosiy",
    nav_devices: "Qurilma sharhi",
    nav_traffic: "Trafik",
    nav_releases: "Relizlar",
    nav_about: "Platforma haqida",
    nav_privacy: "Maxfiylik va qonuniylik",
    interlude_kicker: "UZATISH TAMOYILI · 01",
    interlude_title_lead: "Avval —",
    interlude_title_focus: "rozilik.",
    interlude_desc: "Android hisobotni faqat rozilikdan so‘ng yuboradi. Quyida — mijozdan jamlanmagacha bo‘lgan ma’lumotlar yo‘li.",
    interlude_step_1: "RUXSAT BERISH",
    interlude_step_2: "HISOBOT YUBORISH",
    interlude_step_3: "JAMLANMANI KO‘RISH",
    interlude_path_label: "Android hisoboti yo‘li",
    manager_btn: "Menejer",
    menu_btn: "Menyu",
    btn_pair_quick: "Ulash",

    // Overview Hero
    hero_badge: "Haqiqiy mobil telemetriya • Aloqa yadrosi v5.2",
    overview_hero_title: "Silent Motion",
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
    stack_sub: "Rozilik asosidagi Android hisoboti yo‘li: foydalanuvchi qaroridan umumiy xulosa va himoyalangan ko‘rishgacha.",
    stack_card1_tag: "Android hisobot maydonlari",
    stack_card1_title: "Mijoz yuborgan hisoblagichlar",
    stack_card1_desc: "Android ilovasi mavjud mobil trafik hisoblagichlari, operator va SIM-profil haqidagi ma’lumotlarni yuborishi mumkin. Bu hisobot olingan paytdagi mijoz ma’lumotlari; radio modem, baza stansiyalari yoki signalni bevosita o‘qish emas.",
    
    stack_card2_tag: "Hisobot yo‘li",
    stack_card2_title: "Yuborish rozilikdan so‘ng",
    stack_card2_desc: "Foydalanuvchi rozilik bergach, Android mijozi JSON hisobotini veb API’ga yuboradi. Yetkazish tarmoq va xizmat mavjudligiga bog‘liq; loyiha maxsus paket hajmi, siqish protokoli yoki kechikishsiz ishlashni va’da qilmaydi.",
    
    stack_card3_tag: "Taxminsiz jamlanma",
    stack_card3_title: "Yuborilgan ma’lumotlar tushunarli shaklda",
    stack_card3_desc: "Ochiq sahifa olingan hisobotlardagi mavjud jamlanma qiymatlarni ko‘rsatadi. U operator billingini tekshirmaydi, mijoz hisoblagichlari aniqligini tasdiqlamaydi va kutilmagan to‘lovlarning oldini olishni va’da qilmaydi.",

    // 5 Rotating Motion Modules
    motion_section_title: "Hisobot yo‘li",
    motion_section_sub: "Besh sahna Android hisobot yo‘li va qurilmada saqlanadigan iOS jurnalini ko‘rsatadi.",
    mod1_title: "Rozilik va hisobot",
    mod1_sub: "Android veb hisobotini faqat rozilikdan keyin yuboradi.",
    mod2_title: "Hodisa maydonlari",
    mod2_sub: "Mijoz JSON hodisasi va mavjud hisoblagichlarni shakllantiradi.",
    mod3_title: "Ochiq jamlanma",
    mod3_sub: "Ochiq qism faqat umumiy sonlarni ko‘rsatadi.",
    mod4_title: "Ega kirishi",
    mod4_sub: "Batafsil yozuvlar Cloudflare Access tekshiruvini talab qiladi.",
    mod5_title: "iOS jurnali",
    mod5_sub: "Ko‘rib chiqilgan mijoz jurnalni qurilmada saqlaydi.",

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
    privacy_hero_title: "Maxfiylik",
    privacy_hero_sub: "Xylen ma’lumotlar oqimining texnik tavsifi. Qo‘llanadigan talablar va qayta ishlash asoslarini platforma operatori belgilaydi.",
    privacy_badge_uz: "O'RQ-547 (O'zbekiston Respublikasi)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (Buyuk Britaniya)",
    privacy_p1: "Rozilikdan so‘ng Android o‘rnatish IDsi, model, sinovchi ismi, ekran, amal va tafsilot, operator, vaqt, holat, kunlik va sessiya hisoblagichlari hamda faol yoki bugun ishlatilgan SIM profillarini yuboradi.",
    privacy_p2: "Veb audit API telefon raqami, ICCID, IMSI, baza stansiyasi IDlari yoki radio o‘lchovlarini olmaydi. Ko‘rib chiqilgan iOS kodi jurnalni qurilmada saqlaydi va ushbu veb APIga yubormaydi.",
    privacy_p3: "Ochiq endpoint faqat umumiy ma’lumotlarni qaytaradi. Batafsil yozuvlar Cloudflare Access va egasi emaili bilan himoyalangan; doimiy saqlash Cloudflare KV sozlamasiga bog‘liq.",
    privacy_p4: "Server jurnali oxirgi 200 hodisa bilan cheklangan, qurilmaning so‘nggi yozuvi operator o‘chirmaguncha saqlanadi. Rozilikni bekor qilish keyingi yuborishni to‘xtatadi, avvalgi yozuvlarni o‘chirmaydi.",
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
    nav_overview: "Home",
    nav_devices: "Device overview",
    nav_traffic: "Traffic",
    nav_releases: "Releases",
    nav_about: "About the platform",
    nav_privacy: "Privacy & Legal",
    interlude_kicker: "TRANSMISSION PRINCIPLE · 01",
    interlude_title_lead: "First,",
    interlude_title_focus: "consent.",
    interlude_desc: "Android sends a report only after consent. Below is the data path from client to summary.",
    interlude_step_1: "ALLOW",
    interlude_step_2: "SEND REPORT",
    interlude_step_3: "SHOW SUMMARY",
    interlude_path_label: "Android report path",
    manager_btn: "Manager",
    menu_btn: "Menu",
    btn_pair_quick: "Pair Device",

    // Overview Hero
    hero_badge: "Real Cellular Telemetry • Network Core v5.2",
    overview_hero_title: "Silent Motion",
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
    stack_sub: "The consent-based Android report path, from the user's choice to an aggregated summary and access-controlled details.",
    stack_card1_tag: "Android Report Fields",
    stack_card1_title: "Counters reported by the client",
    stack_card1_desc: "The Android app can send available mobile counters, carrier details, and SIM-profile information. These are client-reported values from when a report is created, not direct readings from the radio modem, cell towers, or signal strength.",
    
    stack_card2_tag: "Report Path",
    stack_card2_title: "Sent after consent",
    stack_card2_desc: "After consent, the Android client sends a JSON report to the web API. Delivery depends on network and service availability; the project does not claim a fixed packet size, a custom compression protocol, or delay-free delivery.",
    
    stack_card3_tag: "A summary without assumptions",
    stack_card3_title: "Reported data, made readable",
    stack_card3_desc: "The public page displays available aggregates from received reports. It does not compare readings with carrier billing, independently validate client counters, or promise to prevent charges.",

    // 5 Rotating Motion Modules
    motion_section_title: "Report path",
    motion_section_sub: "Five scenes trace Android reports and the iOS log kept on-device.",
    mod1_title: "Consent and report",
    mod1_sub: "Android sends a web report only after consent.",
    mod2_title: "Event fields",
    mod2_sub: "The client forms a JSON event and available counters.",
    mod3_title: "Public summary",
    mod3_sub: "The public view shows aggregate counts.",
    mod4_title: "Owner access",
    mod4_sub: "Detailed records require Cloudflare Access verification.",
    mod5_title: "iOS activity log",
    mod5_sub: "The reviewed client stores its log on-device.",

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
    privacy_hero_title: "Privacy",
    privacy_hero_sub: "A technical description of Xylen’s data flow. The platform operator determines applicable requirements and lawful bases.",
    privacy_badge_uz: "ZRU-547 (Republic of Uzbekistan)",
    privacy_badge_uk: "UK GDPR / DPA 2018 (United Kingdom)",
    privacy_p1: "After consent, Android sends an installation ID, model, tester name, screen, action and details, carrier, timestamp, status, daily and session counters, and SIM profiles active now or used today.",
    privacy_p2: "The web audit API does not receive phone numbers, ICCID, IMSI, cell IDs, or radio measurements. The reviewed iOS source stores its activity log on-device and does not send it to this web API.",
    privacy_p3: "The public endpoint returns aggregate information only. Detailed records are protected by Cloudflare Access and the owner email; persistent storage depends on Cloudflare KV configuration.",
    privacy_p4: "The server log is limited to the latest 200 events, while each device’s latest record remains until the operator deletes it. Revoking consent stops future uploads but does not erase records already stored on the server.",
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
