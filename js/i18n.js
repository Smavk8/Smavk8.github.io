/**
 * Xylen Sim Platform - Multilingual Localization Engine (i18n)
 * Full & Accurate Translations across Russian (RU), Uzbek (UZ), and English (EN).
 */

const I18N_STORAGE_KEY = 'xylen_selected_language';

const TRANSLATIONS = {
  ru: {
    // Navigation (Short & Precise)
    brand_sub: "Телеком-экосистема",
    nav_home: "Главная",
    nav_devices: "Устройства",
    nav_traffic: "Трафик",
    nav_releases: "Релизы",
    nav_about: "О нас",
    nav_admin: "Аудит",
    admin_device_badge: "Админ",

    // Themes
    theme_light: "Светлая",
    theme_dark: "Тёмная",

    // Home Page
    home_pill: "Платформа аудита сотовой инфраструктуры нового поколения",
    home_hero_title: "Высокоточный мониторинг сотовой связи и контроль SIM-инфраструктуры",
    home_hero_desc: "Профессиональный программный комплекс для сквозного аудита сотовых сетей, выявления скрытых списаний трафика и синхронизации мульти-SIM парка в реальном времени.",
    home_cta_releases: "Скачать приложения",
    home_cta_devices: "Открыть мониторинг",
    home_stats_title: "Ключевые показатели платформы",
    home_stat_1_val: "24 байта",
    home_stat_1_lbl: "Размер микро-дельта пакета (96% сжатие)",
    home_stat_2_val: "1:1",
    home_stat_2_lbl: "Паритет между Android и iOS",
    home_stat_3_val: "AES-256",
    home_stat_3_lbl: "Шифрование локальных хранилищ",
    home_stat_4_val: "0 мс",
    home_stat_4_lbl: "Задержка при прямом эфире скорости",

    home_pillars_title: "Технологические преимущества Xylen",
    home_pillar_1_title: "Сверхлегкий микро-дельта протокол",
    home_pillar_1_desc: "Передача живых импульсов скорости сжата до 24 байт. Даже при 100% загрузке канала стресс-тестом или при слабом сигнале 2G/EDGE данные продолжают поступать без сбоев.",
    home_pillar_2_title: "Полный паспорт SIM-карты",
    home_pillar_2_desc: "Мгновенное считывание оператора, MCC/MNC кодов, номера слота, уровней сигнала в dBm, сотовых вышек (CID/TAC) и паспортных номеров при наличии разрешений.",
    home_pillar_3_title: "100% Нативный паритет 1:1",
    home_pillar_3_desc: "Идентичный пользовательский опыт: Jetpack Compose на Android и SwiftUI на iOS. Вращающийся одометр цифр, векторные графики и всплывающие доки работают одинаково совершенно.",
    home_pillar_4_title: "Полная автономность и безопасность",
    home_pillar_4_desc: "Никаких сторонних рекламных трекеров, облачных закладок и внешних зависимостей. Все данные принадлежат исключительно владельцу системы.",

    // About Page
    about_pill: "Инженерная миссия • Кто мы такие",
    about_hero_title: "История создания и миссия Xylen Sim Platform",
    about_hero_desc: "Мы создаем независимые инструменты нового поколения для контроля качества связи, учета мобильного трафика и защиты пользователей от скрытых ограничений сотовых сетей.",
    about_who_title: "Кто мы такие",
    about_who_text: "Xylen — это независимая инженерная лаборатория и команда разработчиков системного мобильного ПО. Мы специализируемся на низкоуровневой телеметрии сетей связи, нативной разработке для мобильных платформ (Android & iOS) и создании защищенных корпоративных решений для управления парком SIM-карт и терминалов.",
    about_mission_title: "Для чего создается этот проект",
    about_mission_text: "Современные мобильные операторы нередко завышают реальный расход трафика, скрывают деградацию покрытия вышек и используют закрытые тарифные ограничения. Большинство существующих утилит перегружены рекламой или собирают персональные данные для аналитических корпораций. Xylen Platform была создана как бескомпромиссный, кристально чистый и математически точный инструмент прямого аппаратного контроля. Мы даем пользователю и инженеру полную правду о том, что происходит с его SIM-картой и сетью каждую секунду.",
    about_principles_title: "Принципы нашей разработки",
    about_princ_1: "Native First: разработка ведется исключительно на чистых современных языках Kotlin (Compose) и Swift (SwiftUI) без тяжелых гибридных надстроек.",
    about_princ_2: "Zero-Overhead Telemetry: алгоритмы мониторинга оптимизированы так, чтобы потреблять менее 0.1% заряда аккумулятора смартфона за сутки.",
    about_princ_3: "Криптографическая надежность: история сессий и журнал аудита защищены военным стандартом шифрования AES-256 (Android) и системным сейфом Apple Keychain (iOS).",

    // Devices Page
    devices_title: "Парк подключенных устройств",
    devices_sub: "Мониторинг активных смартфонов и терминалов в реальном времени. Нажмите на любое устройство для детального инспектора всех параметров.",
    devices_empty_title: "Ожидание подключения устройств",
    devices_empty_desc: "В системе пока нет активных подключений. Запустите мобильное приложение Xylen Platform на вашем Android или iPhone — устройство автоматически зарегистрируется в защищенном реестре.",
    device_card_status_online: "В сети",
    device_card_status_offline: "Оффлайн",
    device_btn_inspect: "Подробнее ➔",
    device_last_seen: "Активность:",

    // Device Inspector Modal
    inspector_title: "Инспектор телеметрии устройства",
    inspector_tab_hardware: "Аппаратные данные",
    inspector_tab_sim: "SIM-паспорт",
    inspector_tab_traffic: "Сетевой аудит",
    inspector_label_model: "Модель устройства:",
    inspector_label_platform: "Операционная система:",
    inspector_label_app_ver: "Версия приложения:",
    inspector_label_sessions: "Количество запусков:",
    inspector_label_last_action: "Последнее действие:",
    inspector_label_carrier: "Оператор связи:",
    inspector_label_slot: "Слот SIM-карты:",
    inspector_label_net_type: "Стандарт сети:",
    inspector_label_signal: "Уровень сигнала:",
    inspector_label_cell_tower: "Сотовая вышка:",
    inspector_label_phone: "Телефонный номер:",
    inspector_label_imsi: "IMSI идентификатор:",
    inspector_label_iccid: "ICCID серийный номер:",
    inspector_label_ip: "IP-адрес:",
    inspector_label_today_traffic: "Расход за сегодня:",
    inspector_label_total_traffic: "Всего трафика за историю:",
    inspector_label_current_speed: "Текущая скорость:",
    inspector_btn_close: "Закрыть инспектор",

    // Traffic Page
    traffic_title: "Аналитика расхода трафика",
    traffic_sub: "Расход трафика за сегодня в прямом режиме через микро-дельты (24 байта) и история по дням.",
    traffic_efficiency_badge: "Микро-дельта: ~24 байт/пакет (96% сжатие)",
    traffic_live_title: "Живой расход за сегодня",
    traffic_live_badge: "В ЭФИРЕ",
    traffic_no_device: "Нет подключенных устройств",
    traffic_waiting_stream: "Ожидание подключения устройства из мобильного приложения...",
    traffic_speed_label: "Скорость передачи:",
    traffic_slot_label: "Слот:",
    traffic_calendar_title: "История по дням",
    traffic_day_today: "Сегодня",
    traffic_day_yesterday: "Вчера",
    traffic_day_2days: "2 дня назад",
    traffic_day_3days: "3 дня назад",
    traffic_day_7days: "7 дней назад",
    traffic_no_history: "Нет данных расхода за выбранный день.",

    // Releases Page
    releases_hero_title: "Релизы и загрузки",
    releases_hero_sub: "Прямое скачивание APK для Android и IPA для iPhone, раздельный учет версий приложения и поддерживаемых ОС.",
    guide_title: "Инструкции по установке",
    guide_android_title: "Установка на Android (2 шага)",
    guide_android_step1: "Нажмите кнопку <strong>«Скачать APK»</strong> или отсканируйте QR-код камерой смартфона.",
    guide_android_step2: "Откройте файл <span class=\"code-pill\">app-release.apk</span> ➔ нажмите <strong>«Установить»</strong>.",
    guide_ios_title: "Установка на iPhone по воздуху ($0)",
    guide_ios_step1: "Установите анти-отзывный профиль <a href=\"https://files.catbox.moe/khoindvn.mobileconfig\" target=\"_blank\" style=\"color:var(--cyan-electric);font-weight:700;\">khoindvn.mobileconfig</a> и подтвердите в Настройках iPhone.",
    guide_ios_step2: "Откройте установщик <a href=\"https://files.catbox.moe/9879kj.html\" target=\"_blank\" style=\"color:var(--cyan-electric);font-weight:700;\">ESign</a> в Safari ➔ в <i>Настройки ➔ VPN и управление</i> нажмите «Доверять».",
    guide_ios_step3: "Отсканируйте QR-код с <span class=\"code-pill\">XylenSimPlatform.ipa</span> ➔ откройте в ESign ➔ нажмите <strong>«Подписать»</strong> ➔ <strong>«Установить»</strong>.",
    version_hub_title: "История версий",
    tab_all: "Все версии",
    tab_android: "Android",
    tab_ios: "iOS",
    search_placeholder: "Поиск по версиям и чейнджлогу...",

    // Admin Page
    admin_visitors_title: "Аудит посетителей веб-портала (Администратор)",
    admin_visitors_sub: "Список клиентов и браузеров, посещающих портал, с фиксацией устройств и страниц.",
    admin_empty_visitors: "Посещений пока не зафиксировано.",

    // Controls
    btn_back_to_top: "Наверх",
    btn_copy: "Копировать",
    btn_open_direct: "Открыть ссылку ↗",
    copied_toast: "Ссылка скопирована!"
  },

  uz: {
    // Navigation (Short & Precise)
    brand_sub: "Telekom ekotizimi",
    nav_home: "Bosh sahifa",
    nav_devices: "Qurilmalar",
    nav_traffic: "Trafik",
    nav_releases: "Relizlar",
    nav_about: "Biz haqimizda",
    nav_admin: "Audit",
    admin_device_badge: "Admin",

    // Themes
    theme_light: "Kunduzgi",
    theme_dark: "Tungi",

    // Home Page
    home_pill: "Yangi avlod aloqa infratuzilmasini audit qilish platformasi",
    home_hero_title: "Mobil aloqani yuqori aniqlikda monitoring qilish va SIM nazorati",
    home_hero_desc: "Mobil tarmoqlarni to'liq tahlil qilish, yashirin trafik sarfini aniqlash va multi-SIM qurilmalarni jonli sinxronlashtirish uchun professional dasturiy majmua.",
    home_cta_releases: "Ilovalarni yuklab olish",
    home_cta_devices: "Monitoringni ochish",
    home_stats_title: "Platformaning asosiy ko'rsatkichlari",
    home_stat_1_val: "24 bayt",
    home_stat_1_lbl: "Mikro-delta paket hajmi (96% siqish)",
    home_stat_2_val: "1:1",
    home_stat_2_lbl: "Android va iOS o'rtasidagi to'liq paritet",
    home_stat_3_val: "AES-256",
    home_stat_3_lbl: "Lokal xotiraning harbiy shifrlanishi",
    home_stat_4_val: "0 ms",
    home_stat_4_lbl: "Jonli efirda tezlik kechikishi",

    home_pillars_title: "Xylen platformasining texnologik afzalliklari",
    home_pillar_1_title: "O'ta yengil mikro-delta protokoli",
    home_pillar_1_desc: "Tezlik pulslarini uzatish 24 baytgacha siqilgan. Hatoki 100% tarmoq yuklamasida yoki kuchsiz 2G/EDGE signallarda ham ma'lumotlar uzluksiz uzatiladi.",
    home_pillar_2_title: "To'liq SIM-karta pasporti",
    home_pillar_2_desc: "Operator nomi, MCC/MNC kodlari, slot raqami, dBm signal kuchi, tayanch stansiyalar (CID/TAC) va ruxsat berilgan bo'lsa barcha seriya raqamlarini lahzada o'qish.",
    home_pillar_3_title: "100% Nativ 1:1 Paritet",
    home_pillar_3_desc: "Bir xil foydalanuvchi tajribasi: Android-da Jetpack Compose va iOS-da SwiftUI. Aylanuvchi raqamli odometr, vektor grafiklar va qalqib chiquvchi panellar mukammal ishlaydi.",
    home_pillar_4_title: "To'liq avtonomlik va xavfsizlik",
    home_pillar_4_desc: "Hech qanday uchinchi tomon reklama trekerlari, bulutli kuzatuvlar va tashqi bog'liqliklar yo'q. Barcha ma'lumotlar faqat tizim egasiga tegishli.",

    // About Page
    about_pill: "Muhandislik missiyasi • Biz kimmiz",
    about_hero_title: "Xylen Sim Platform yaratilish tarixi va missiyasi",
    about_hero_desc: "Biz aloqa sifatini nazorat qilish, mobil trafik hisobini yuritish va foydalanuvchilarni yashirin cheklovlardan himoya qilish uchun yangi avlod mustaqil vositalarini yaratamiz.",
    about_who_title: "Biz kimmiz",
    about_who_text: "Xylen — bu mustaqil muhandislik laboratoriyasi va tizimli mobil dasturiy ta'minot ishlab chiquvchilari jamoasi. Biz aloqa tarmoqlarining quyi darajadagi telemetriyasiga, mobil platformalar (Android va iOS) uchun nativ dasturlashga va korporativ SIM-parklarni boshqarishga ixtisoslashganmiz.",
    about_mission_title: "Ushbu loyiha nima uchun yaratilmoqda",
    about_mission_text: "Hozirgi uyali aloqa operatorlari ko'pincha real trafik sarfini oshirib ko'rsatadi, tayanch stansiyalaridagi nosozliklarni yashiradi va noaniq tarif cheklovlarini qo'llaydi. Mavjud ilovalarning aksariyati esa reklamaga to'la yoki shaxsiy ma'lumotlarni tahlil qilish uchun yig'adi. Xylen Platform hech qanday murosasiz, toza va matematik jihatdan aniq nazorat vositasi sifatida yaratildi. Biz foydalanuvchiga va muhandisga har soniyada uning SIM-kartasi va tarmog'ida nima sodir bo'layotganini ko'rsatamiz.",
    about_principles_title: "Bizning dasturlash tamoyillarimiz",
    about_princ_1: "Native First: dasturlash faqat toza zamonaviy Kotlin (Compose) va Swift (SwiftUI) tillarida, ortiqcha gibrid qobiqlarsiz amalga oshiriladi.",
    about_princ_2: "Zero-Overhead Telemetry: monitoring algoritmlari smartfon batareyasini bir kunda 0.1% dan ham kam sarflaydigan darajada optimallashtirilgan.",
    about_princ_3: "Kriptografik ishonchlilik: sessiyalar tarixi va audit jurnali AES-256 (Android) va Apple Keychain (iOS) orqali to'liq himoyalangan.",

    // Devices Page
    devices_title: "Ulangan qurilmalar parki",
    devices_sub: "Faol smartfonlar va terminallarni real vaqt rejimida monitoring qilish. Barcha parametrlarni ko'rish uchun qurilma ustiga bosing.",
    devices_empty_title: "Qurilmalar ulanishi kutilmoqda",
    devices_empty_desc: "Tizimda hozircha faol ulanishlar mavjud emas. Android yoki iPhone qurilmangizda Xylen Platform ilovasini ishga tushiring — qurilma avtomatik ravishda ro'yxatdan o'tadi.",
    device_card_status_online: "Tarmoqda",
    device_card_status_offline: "Oflayn",
    device_btn_inspect: "Batafsil ➔",
    device_last_seen: "Faollik:",

    // Device Inspector Modal
    inspector_title: "Qurilma telemetriyasi inspektori",
    inspector_tab_hardware: "Qurilma ma'lumotlari",
    inspector_tab_sim: "SIM-pasport",
    inspector_tab_traffic: "Tarmoq auditi",
    inspector_label_model: "Qurilma modeli:",
    inspector_label_platform: "Operatsion tizim:",
    inspector_label_app_ver: "Ilova versiyasi:",
    inspector_label_sessions: "Ishga tushirishlar soni:",
    inspector_label_last_action: "Oxirgi harakat:",
    inspector_label_carrier: "Aloqa operatori:",
    inspector_label_slot: "SIM-karta sloti:",
    inspector_label_net_type: "Tarmoq standarti:",
    inspector_label_signal: "Signal darajasi:",
    inspector_label_cell_tower: "Tayanch stansiya:",
    inspector_label_phone: "Telefon raqami:",
    inspector_label_imsi: "IMSI identifikatori:",
    inspector_label_iccid: "ICCID seriya raqami:",
    inspector_label_ip: "IP-manzil:",
    inspector_label_today_traffic: "Bugungi trafik sarfi:",
    inspector_label_total_traffic: "Jami sarflangan trafik:",
    inspector_label_current_speed: "Hozirgi tezlik:",
    inspector_btn_close: "Inspektorni yopish",

    // Traffic Page
    traffic_title: "Trafik sarfi tahlili",
    traffic_sub: "Bugungi trafik sarfi mikro-deltalar (24 bayt) orqali jonli rejimda va kunlar bo'yicha tarix.",
    traffic_efficiency_badge: "Mikro-delta: ~24 bayt/paket (96% siqish)",
    traffic_live_title: "Bugungi jonli sarf",
    traffic_live_badge: "JONLI EFIR",
    traffic_no_device: "Ulangan qurilmalar yo'q",
    traffic_waiting_stream: "Mobil ilovadan qurilma ulanishi kutilmoqda...",
    traffic_speed_label: "Uzatish tezligi:",
    traffic_slot_label: "Slot:",
    traffic_calendar_title: "Kunlar bo'yicha tarix",
    traffic_day_today: "Bugun",
    traffic_day_yesterday: "Kecha",
    traffic_day_2days: "2 kun oldin",
    traffic_day_3days: "3 kun oldin",
    traffic_day_7days: "7 kun oldin",
    traffic_no_history: "Tanlangan kun uchun trafik ma'lumotlari mavjud emas.",

    // Releases Page
    releases_hero_title: "Relizlar va yuklamalar",
    releases_hero_sub: "Android uchun APK va iPhone uchun IPA to'g'ridan-to'g'ri yuklab olish, ilova va OS versiyalarini alohida nazorat qilish.",
    guide_title: "O'rnatish qo'llanmalari",
    guide_android_title: "Android tizimiga o'rnatish (2 qadam)",
    guide_android_step1: "<strong>«APK Yuklab olish»</strong> tugmasini bosing yoki telefon kamerasi bilan QR-kodni skanerlang.",
    guide_android_step2: "<span class=\"code-pill\">app-release.apk</span> faylini oching ➔ <strong>«O'rnatish»</strong> tugmasini bosing.",
    guide_ios_title: "iPhone tizimiga simsiz o'rnatish ($0)",
    guide_ios_step1: "<a href=\"https://files.catbox.moe/khoindvn.mobileconfig\" target=\"_blank\" style=\"color:var(--cyan-electric);font-weight:700;\">khoindvn.mobileconfig</a> profilini o'rnating va Sozlamalarda tasdiqlang.",
    guide_ios_step2: "Safari orqali <a href=\"https://files.catbox.moe/9879kj.html\" target=\"_blank\" style=\"color:var(--cyan-electric);font-weight:700;\">ESign</a> o'rnatuvchisini oching ➔ VPN va Boshqaruv bo'limida tasdiqlang.",
    guide_ios_step3: "<span class=\"code-pill\">XylenSimPlatform.ipa</span> QR-kodini skanerlang ➔ ESign dasturida <strong>«Imzolash»</strong> ➔ <strong>«O'rnatish»</strong> bosing.",
    version_hub_title: "Versiyalar tarixi",
    tab_all: "Barcha versiyalar",
    tab_android: "Android",
    tab_ios: "iOS",
    search_placeholder: "Versiyalar bo'yicha qidirish...",

    // Admin Page
    admin_visitors_title: "Veb-portal tashrifchilari auditi (Administrator)",
    admin_visitors_sub: "Portalga kirgan qurilmalar va ko'rilgan sahifalar ro'yxati.",
    admin_empty_visitors: "Tashriflar hali qayd etilmagan.",

    // Controls
    btn_back_to_top: "Tepaga",
    btn_copy: "Nusxalash",
    btn_open_direct: "Havolani ochish ↗",
    copied_toast: "Havola nusxalandi!"
  },

  en: {
    // Navigation (Short & Precise)
    brand_sub: "Telecom Ecosystem",
    nav_home: "Home",
    nav_devices: "Devices",
    nav_traffic: "Traffic",
    nav_releases: "Releases",
    nav_about: "About",
    nav_admin: "Audit",
    admin_device_badge: "Admin",

    // Themes
    theme_light: "Light",
    theme_dark: "Dark",

    // Home Page
    home_pill: "Next-Generation Cellular Infrastructure Audit Platform",
    home_hero_title: "High-Precision Cellular Telemetry & SIM Infrastructure Control",
    home_hero_desc: "Professional software suite for end-to-end cellular network auditing, uncovering hidden data billing discrepancies, and real-time multi-SIM fleet synchronization.",
    home_cta_releases: "Download Apps",
    home_cta_devices: "Open Monitoring",
    home_stats_title: "Core Platform Metrics",
    home_stat_1_val: "24 bytes",
    home_stat_1_lbl: "Micro-delta packet size (96% compression)",
    home_stat_2_val: "1:1",
    home_stat_2_lbl: "Android vs iOS Full Parity",
    home_stat_3_val: "AES-256",
    home_stat_3_lbl: "Military-grade local vault encryption",
    home_stat_4_val: "0 ms",
    home_stat_4_lbl: "Zero latency on live speed ticker",

    home_pillars_title: "Xylen Technological Pillars",
    home_pillar_1_title: "Ultra-Lightweight Micro-Delta Protocol",
    home_pillar_1_desc: "Live speed pulse transmission is compressed down to 24 bytes. Even during 100% channel stress testing or on 2G/EDGE networks, telemetry continues uninterrupted.",
    home_pillar_2_title: "Comprehensive SIM Passport",
    home_pillar_2_desc: "Instant readout of carrier, MCC/MNC codes, slot number, dBm signal quality, cell tower IDs (CID/TAC), and hardware serials when authorized.",
    home_pillar_3_title: "100% Native 1:1 Parity",
    home_pillar_3_desc: "Identical user experience: Kotlin Compose on Android and SwiftUI on iOS. Mechanical rolling odometers, vector graphs, and floating docks work consistently.",
    home_pillar_4_title: "Total Autonomy & Security",
    home_pillar_4_desc: "Zero third-party advertising trackers, cloud backdoors, or external bloat. All telemetry belongs strictly to the platform owner.",

    // About Page
    about_pill: "Engineering Mission • Who We Are",
    about_hero_title: "The Story and Mission of Xylen Sim Platform",
    about_hero_desc: "We build next-generation independent instruments to audit network quality, verify cellular data accounting, and protect users from hidden carrier restrictions.",
    about_who_title: "Who We Are",
    about_who_text: "Xylen is an independent engineering laboratory and mobile systems development team. We specialize in low-level cellular network telemetry, native mobile development (Android & iOS), and secure enterprise solutions for managing multi-SIM fleets and terminals.",
    about_mission_title: "Why This Project Exists",
    about_mission_text: "Modern telecom operators frequently overstate real mobile data usage, conceal cell tower degradation, and enforce opaque bandwidth throttling. Most existing utilities are bloated with ads or harvest user telemetry for data brokers. Xylen Platform was engineered as an uncompromising, clean, and mathematically precise hardware auditing instrument. We provide engineers and users with the unvarnished truth regarding what their SIM card and cellular link are doing every single second.",
    about_principles_title: "Our Engineering Principles",
    about_princ_1: "Native First: built exclusively with modern native Kotlin (Compose) and Swift (SwiftUI) without heavy cross-platform wrappers.",
    about_princ_2: "Zero-Overhead Telemetry: monitoring routines are optimized to consume under 0.1% smartphone battery per day.",
    about_princ_3: "Cryptographic Integrity: session histories and audit trails are secured by AES-256 (Android) and Apple Keychain (iOS).",

    // Devices Page
    devices_title: "Connected Devices Fleet",
    devices_sub: "Real-time presence and telemetry of active smartphones and field units. Tap any device card to inspect complete parameters.",
    devices_empty_title: "Waiting for Devices to Connect",
    devices_empty_desc: "No devices are currently connected. Launch the Xylen Platform app on your Android or iPhone — the device will automatically register in the secure registry.",
    device_card_status_online: "Online",
    device_card_status_offline: "Offline",
    device_btn_inspect: "Details ➔",
    device_last_seen: "Activity:",

    // Device Inspector Modal
    inspector_title: "Device Telemetry Inspector",
    inspector_tab_hardware: "Hardware Info",
    inspector_tab_sim: "SIM Passport",
    inspector_tab_traffic: "Network Audit",
    inspector_label_model: "Device Model:",
    inspector_label_platform: "Operating System:",
    inspector_label_app_ver: "App Version:",
    inspector_label_sessions: "Launch Count:",
    inspector_label_last_action: "Last Action:",
    inspector_label_carrier: "Carrier Name:",
    inspector_label_slot: "SIM Slot:",
    inspector_label_net_type: "Network Standard:",
    inspector_label_signal: "Signal Level:",
    inspector_label_cell_tower: "Cell Tower:",
    inspector_label_phone: "Phone Number:",
    inspector_label_imsi: "IMSI Identifier:",
    inspector_label_iccid: "ICCID Serial Number:",
    inspector_label_ip: "IP Address:",
    inspector_label_today_traffic: "Today's Usage:",
    inspector_label_total_traffic: "Lifetime Total Traffic:",
    inspector_label_current_speed: "Current Speed:",
    inspector_btn_close: "Close Inspector",

    // Traffic Page
    traffic_title: "Traffic Usage Analytics",
    traffic_sub: "Today's consumption via live micro-deltas (24 bytes) plus daily calendar historical breakdown.",
    traffic_efficiency_badge: "Micro-delta: ~24 bytes/pulse (96% compression)",
    traffic_live_title: "Live Consumption Today",
    traffic_live_badge: "LIVE",
    traffic_no_device: "No Devices Connected",
    traffic_waiting_stream: "Waiting for device stream from mobile application...",
    traffic_speed_label: "Transfer Speed:",
    traffic_slot_label: "Slot:",
    traffic_calendar_title: "Daily History",
    traffic_day_today: "Today",
    traffic_day_yesterday: "Yesterday",
    traffic_day_2days: "2 days ago",
    traffic_day_3days: "3 days ago",
    traffic_day_7days: "7 days ago",
    traffic_no_history: "No traffic data recorded for the selected date.",

    // Releases Page
    releases_hero_title: "Releases & Downloads",
    releases_hero_sub: "Direct APK download for Android and IPA for iPhone, separated App vs OS version tracking.",
    guide_title: "Installation Guides",
    guide_android_title: "Android Installation (2 steps)",
    guide_android_step1: "Click <strong>«Download APK»</strong> or scan the QR code with your phone camera.",
    guide_android_step2: "Open <span class=\"code-pill\">app-release.apk</span> ➔ tap <strong>«Install»</strong>.",
    guide_ios_title: "Over-the-Air iOS Installation ($0)",
    guide_ios_step1: "Install anti-revoke profile <a href=\"https://files.catbox.moe/khoindvn.mobileconfig\" target=\"_blank\" style=\"color:var(--cyan-electric);font-weight:700;\">khoindvn.mobileconfig</a> and verify in iOS Settings.",
    guide_ios_step2: "Open installer <a href=\"https://files.catbox.moe/9879kj.html\" target=\"_blank\" style=\"color:var(--cyan-electric);font-weight:700;\">ESign</a> in Safari ➔ trust profile in Settings.",
    guide_ios_step3: "Scan QR code with <span class=\"code-pill\">XylenSimPlatform.ipa</span> ➔ in ESign tap <strong>«Sign»</strong> ➔ <strong>«Install»</strong>.",
    version_hub_title: "Version History",
    tab_all: "All Versions",
    tab_android: "Android",
    tab_ios: "iOS",
    search_placeholder: "Search versions and changelog...",

    // Admin Page
    admin_visitors_title: "Web Portal Visitors Audit (Admin)",
    admin_visitors_sub: "Real-time log of client devices and visitors accessing this portal.",
    admin_empty_visitors: "No visitors logged yet.",

    // Controls
    btn_back_to_top: "Top",
    btn_copy: "Copy",
    btn_open_direct: "Open Link ↗",
    copied_toast: "Link copied to clipboard!"
  }
};

class I18nEngine {
  constructor() {
    this.currentLang = localStorage.getItem(I18N_STORAGE_KEY) || 'ru';
  }

  getLang() {
    return this.currentLang;
  }

  setLang(lang) {
    if (['ru', 'uz', 'en'].includes(lang)) {
      this.currentLang = lang;
      localStorage.setItem(I18N_STORAGE_KEY, lang);
      this.applyTranslations();
      window.dispatchEvent(new CustomEvent('xylen:lang-changed', { detail: lang }));
    }
  }

  t(key) {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ru;
    return dict[key] || TRANSLATIONS.ru[key] || key;
  }

  applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.dataset.i18n;
      const text = this.t(key);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    });

    document.documentElement.lang = this.currentLang;
  }
}

window.i18n = new I18nEngine();
