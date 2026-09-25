/**
 * Xylen Workspace - Multilingual Localization Engine (i18n)
 * Accurate Translations: Russian (RU), Uzbek (UZ), English (EN).
 * Privacy copy describes the current web API and reviewed client behavior; it does not certify legal compliance.
 */

const I18N_STORAGE_KEY = 'xylen_selected_language_v4';

const TRANSLATIONS = {
  ru: {
    // Navigation
    nav_overview: "Главная",
    nav_devices: "Обзор устройства",
    nav_traffic: "Трафик",
    nav_releases: "Релизы",
    nav_about: "О платформе",
    nav_privacy: "Конфиденциальность",
    nav_sim_center: "SIM-Центр",
    nav_auto_download: "Авто Скачивание",
    nav_today_traffic: "Расход сегодня",
    nav_usage_history: "История расхода",
    nav_sim_override: "Переопределение SIM",
    nav_app_settings: "Настройки",
    nav_support_app: "Поддержать разработчика",
    nav_web_downloads: "Загрузки приложений",
    nav_web_about: "О платформе и конфиденциальность",
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
    theme_switch_to_light: "Светлая тема",
    theme_switch_to_dark: "Тёмная тема",
    app_shell_name: "SIM-ПЛАТФОРМА",
    app_navigation: "ОСНОВНЫЕ РАЗДЕЛЫ",
    app_web_tools: "ВЕБ-ПОРТАЛ",
    drawer_open: "Открыть меню",
    drawer_owner_login: "ВХОД ВЛАДЕЛЬЦА",
    drawer_web_note: "ВЕБ-БРАУЗЕР",
    drawer_web_readonly: "Данные SIM доступны только из отчётов",
    home_sim_slots: "SIM-карты",
    home_sim_slot_1: "SIM 1",
    home_sim_slot_2: "SIM 2",
    home_sim_selected: "ВЫБРАННАЯ SIM",
    home_sim_data_boundary: "Сайт не читает SIM и радио с этого устройства. Здесь отображаются только поля, которые Android-клиент передал после согласия; ICCID, IMSI и параметры сигнала в веб-аудит не отправляются.",
    drawer_close: "Закрыть меню",
    history_description: "Сводка мобильных отчётов и счётчиков Android. Подробная история действий доступна владельцу после входа.",
    history_owner_link: "Подробный журнал",
    home_eyebrow: "МОНИТОРИНГ УСТРОЙСТВ",
    home_title: "SIM-Центр",
    home_subtitle: "Сводка отчётов Android и сотовых счётчиков.",
    home_status_label: "Состояние Android-отчётов",
    home_status_loading: "Загрузка серверной сводки…",
    home_last_report: "Последний отчёт:",
    home_metrics_label: "Сводные показатели",
    home_quick_actions: "Быстрый переход",
    home_metric_devices: "Устройства",
    home_metric_devices_hint: "передавали отчёты",
    home_metric_active: "Активны",
    home_metric_active_hint: "за последние 75 секунд",
    home_metric_traffic: "Сотовый расход",
    home_metric_traffic_hint: "за день · по отчётам",
    home_metric_speed: "Скорость SIM",
    home_speed_unavailable: "Не передаётся",
    home_metric_speed_hint: "сайт не измеряет радио",
    home_data_boundary: "Показываются только данные, которые Android отправил после согласия. Браузер не читает SIM-карты и радиопараметры.",
    refresh_data: "Обновить сводку",
    auto_eyebrow: "МОБИЛЬНАЯ СЕССИЯ",
    auto_subtitle: "Управление фоновой сессией сотовой загрузки из Android-приложения.",
    auto_status_label: "Состояние сессии",
    auto_status_unavailable: "Требуется Android",
    auto_status_title: "Автоскачивание работает на телефоне",
    auto_status_description: "Сессия использует системные SIM-счётчики, фоновые службы и состояние батареи. Веб-страница не может запустить её или управлять ею.",
    auto_metric_network: "Сеть",
    auto_metric_network_value: "Только на устройстве",
    auto_metric_goal: "Цель сессии",
    auto_metric_goal_value: "Настраивается в приложении",
    auto_metric_thermal: "Контроль нагрева",
    auto_metric_thermal_value: "Доступен в Android",
    auto_open_downloads: "Открыть загрузки Android",
    auto_history_title: "История сессий",
    auto_history_note: "Публичная веб-сводка не получает состояние загрузки, цель сессии или температуру батареи. Подробные отчёты доступны владельцу, если Android отправил соответствующие данные.",
    auto_owner_link: "Открыть консоль владельца",
    sim_config_eyebrow: "ПРОФИЛИ УСТРОЙСТВА",
    sim_config_subtitle: "SIM и eSIM профили, которые сообщил Android-клиент.",
    sim_config_readonly: "Доступ только для чтения",
    sim_config_boundary: "Переопределения оператора и привязка проекта хранятся на Android-устройстве. Веб-портал не меняет настройки SIM.",
    sim_config_locked: "Подробные SIM-профили доступны владельцу после входа через Cloudflare Access.",
    sim_config_owner_link: "Войти как владелец",
    settings_eyebrow: "ПАРАМЕТРЫ ИНТЕРФЕЙСА",
    settings_subtitle: "Настройте внешний вид веб-портала.",
    settings_appearance: "ВНЕШНИЙ ВИД",
    settings_theme: "Тема",
    settings_theme_description: "Переключение между светлой и тёмной темой.",
    settings_theme_action: "Изменить",
    settings_amoled: "AMOLED-тема",
    settings_amoled_description: "Чёрный фон для тёмной темы браузера.",
    settings_language: "Язык интерфейса",
    settings_language_description: "Русский, узбекский или английский.",
    settings_scale: "Масштаб интерфейса",
    settings_scale_description: "Размер текста и основных элементов управления.",
    settings_motion: "Уменьшить анимацию",
    settings_motion_description: "Сократить движение и декоративные эффекты.",
    settings_device_title: "НАСТРОЙКИ УСТРОЙСТВА",
    settings_device_note: "Разрешения SIM, фоновые ограничения, автозапуск и защита батареи управляются только в Android-приложении и системных настройках телефона.",
    support_eyebrow: "ПОДДЕРЖКА ПРОЕКТА",
    support_intro: "Спасибо, что пользуетесь Xylen Sim Platform. Ваша поддержка помогает проекту развиваться.",
    support_options: "Способы поддержки",
    support_copy: "Скопировать номер для перевода",
    support_copy_note: "Номер копируется только после нажатия кнопки. Платёжная операция на сайте не выполняется.",
    support_copy_failed: "Не удалось скопировать. Выделите номер вручную.",

    // Overview Hero
    hero_badge: "Реальная сотовая телеметрия • Ядро связи v5.2",
    overview_hero_title: "Тихое движение",
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
    kpi_traffic_sub: "счётчики из Android-отчётов",
    kpi_speed: "Скорость из отчёта",
    kpi_speed_sub: "сайт не измеряет радиоэфир",

    connect_title: "Шлюз приёма мобильных клиентов Xylen",
    connect_desc: "Android отправляет отчёты только после согласия. Изученный исходный код iOS хранит журнал на устройстве.",
    connect_android: "Android-клиент",
    connect_ios: "iOS-клиент",

    path_story_kicker: "XYLEN / ПУТЬ ДАННЫХ · 01—05",
    path_story_title: "От согласия до сводки",
    path_story_desc: "Пять сцен показывают, что сообщает Android, что получает сайт и какие данные остаются на устройстве.",
    path_story_visual_note: "АНИМИРОВАННАЯ СХЕМА · НЕ ЖИВЫЕ ДАННЫЕ",
    path_story_progress: "ПЯТЬ ЭТАПОВ",
    path_story_1_title: "Согласие включает передачу",
    path_story_1_desc: "Отчёт Android отправляется в веб-сервис только после действия пользователя.",
    path_story_2_title: "Клиент формирует отчёт",
    path_story_2_desc: "Приложение собирает JSON-событие и доступные ему счётчики устройства.",
    path_story_3_title: "API принимает полученные данные",
    path_story_3_desc: "Доставка зависит от сети. Сервер принимает только те события и счётчики, которые действительно пришли.",
    path_story_4_title: "Публичная часть показывает сводку",
    path_story_4_desc: "Открытая страница использует агрегированные полученные отчёты и не выдаёт иллюстрацию за измерение.",
    path_story_5_title: "Журнал iOS остаётся на устройстве",
    path_story_5_desc: "Изученная версия iOS-клиента хранит журнал локально и не отправляет его в веб API.",

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
    devices_hero_title: "Устройства и отчёты",
    devices_hero_sub: "Здесь показаны устройства и счётчики из полученных Android-отчётов. iOS-журнал, согласно проверенной версии клиента, хранится на устройстве.",
    devices_empty_title: "Пока нет отчётов",
    devices_empty_desc: "Сводка появится после того, как Android-клиент отправит первый отчёт с согласия пользователя. Веб-панель не считывает параметры SIM или радиосети напрямую и не измеряет телефон непрерывно.",
    devices_cellular_rule: "Сводка использует поля из клиентского отчёта. Сайт самостоятельно не проверяет, через какой сетевой интерфейс передавались данные.",
    devices_empty_btn_test: "Открыть загрузки Android",
    devices_pair_token_label: "Локальный ключ сопряжения:",
    devices_listening_status: "Ожидается отчёт Android, отправленный после согласия пользователя.",
    devices_connected_sims: "Профили SIM из последнего отчёта:",
    devices_status_online: "Недавно передавал отчёт",
    devices_status_offline: "Нет недавнего отчёта",
    devices_btn_inspect: "Открыть отчёт ➔",
    devices_btn_clear_all: "Очистить список устройств",

    // Traffic Section
    traffic_hero_title: "Мониторинг сотового трафика",
    traffic_hero_sub: "Сводка по мобильным счётчикам, которые Android-клиент отправил после согласия. Веб-панель показывает полученные отчёты, а не измеряет скорость телефона в реальном времени.",
    traffic_cellular_only_badge: "МОБИЛЬНЫЕ СЧЁТЧИКИ ИЗ ОТЧЁТОВ",
    traffic_live_badge: "ПОСЛЕДНИЙ ПОЛУЧЕННЫЙ ОТЧЁТ",
    traffic_standby_badge: "РЕЖИМ ОЖИДАНИЯ • СТЕНДБАЙ",
    traffic_speed_label: "Текущая скорость, если её сообщил клиент:",
    traffic_today_label: "Счётчик за сегодня из отчёта:",
    traffic_packet_label: "Получено событий:",
    traffic_wifi_excluded_notice: "Сводка строится по мобильным счётчикам, присланным Android-клиентом. Счётчика Wi-Fi в веб-отчёте нет; сайт не проверяет тип сетевого интерфейса независимо.",

    // Releases & Installation
    releases_hero_title: "Центр загрузки приложений",
    releases_hero_sub: "Актуальные ссылки и сведения о доступных сборках Android и iOS.",
    platform_android_title: "Google Android",
    platform_android_desc: "Совместимость и доступные функции зависят от текущей сборки Android-клиента. Проверьте сведения о версии и запрашиваемых разрешениях перед установкой.",
    btn_install_android: "Скачать для Android",
    platform_ios_title: "Apple iOS",
    platform_ios_desc: "Доступность сборки и способ установки зависят от текущей версии. В проверенном клиенте журнал активности хранится на устройстве.",
    ios_local_log: "Журнал активности хранится локально",
    btn_install_ios: "Установить на iOS",
    releases_whats_new: "Сведения о выбранной сборке:",
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
    android_step3_desc: "Android может запросить доступ к сведениям о SIM и местоположению для отдельных функций приложения. Перед выдачей прочитайте системный запрос. Эти разрешения сами по себе не означают, что ID вышки или радиосигнал отправляются в веб-отчёте.",
    android_step4_title: "4. Автономная фоновая работа",
    android_step4_desc: "Отправка отчётов зависит от согласия, настроек фоновой работы Android и доступности сети. Частота передачи и расход аккумулятора зависят от устройства и режима использования; фиксированные показатели не заявляются.",

    // iOS Steps
    ios_step1_title: "1. Загрузка установочного пакета",
    ios_step1_desc: "Используйте актуальную ссылку распространения и инструкцию, предоставленные владельцем проекта. Способ установки зависит от подписи и текущей сборки приложения.",
    ios_step2_title: "2. Проверьте источник приложения",
    ios_step2_desc: "Используйте инструкцию владельца проекта для текущей сборки. Перед установкой проверьте источник файла и издателя; профиль сам по себе не подтверждает безопасность приложения.",
    ios_step3_title: "3. Локальный журнал",
    ios_step3_desc: "Изученный исходный код клиента хранит журнал активности на устройстве и не отправляет его в веб audit API. Это описание относится к журналу, а не ко всем данным iOS.",
    ios_step4_title: "4. Что остаётся на iPhone",
    ios_step4_desc: "В проверенной версии приложения журнал активности хранится локально. Работа Live Activities, отображение SIM-слота и скорость в реальном времени в этой версии не подтверждены.",

    // About
    about_hero_title: "Создан для тех, кто проводит тесты",
    about_origin_tag: "Назначение платформы • мобильные отчёты",
    about_origin_title: "От отчёта клиента — к сводке",
    about_origin_p1: "Xylen Platform — веб-панель для просмотра устройств и отчётов, которые Android-клиент отправляет после согласия пользователя.",
    about_origin_p2: "Сводка строится по событиям и счётчикам из отчёта. Их состав зависит от клиента, устройства и версии Android; сайт не измеряет радиоканал и не сверяет расход с биллингом оператора.",
    about_arch_title: "Архитектура нативного стека",
    about_p1: "Платформа показывает агрегированные отчёты и даёт владельцу доступ к подробным записям после отдельной проверки. Она не измеряет радиосигнал и не сверяет мобильный расход с биллингом оператора.",
    about_p2: "Android-клиент написан на Kotlin и Jetpack Compose. После согласия он передаёт в веб API поля, перечисленные в Data Charter; состав отчёта зависит от приложения, устройства и версии Android.",
    about_p3: "Веб API принимает отчёты через Cloudflare Pages Functions. Публичный endpoint возвращает агрегаты, а подробные записи доступны через Cloudflare Access. Постоянное хранение зависит от настройки Cloudflare KV.",
    about_p4: "Сводки мобильного трафика основаны на счётчиках, которые сообщает клиент. Сайт не получает CID/TAC или измерения радиосигнала и не подтверждает точность показаний оператора.",

    // Privacy
    privacy_hero_title: "Конфиденциальность",
    privacy_hero_sub: "Техническое описание потока данных Xylen. Применимость требований и основания обработки определяет оператор платформы.",
    privacy_badge_uz: "СОСТАВ ОТЧЁТА",
    privacy_badge_uk: "ДОСТУП И ХРАНЕНИЕ",
    privacy_p1: "После согласия Android передаёт ID установки, модель, имя тестировщика, экран, действие и детали, оператора, временную отметку, состояние, дневные и сессионные счётчики, а также активные или использованные сегодня SIM-профили.",
    privacy_p2: "Веб audit API не получает номер телефона, ICCID, IMSI, идентификаторы вышек или измерения радиосигнала. Изученный исходный код iOS хранит журнал на устройстве и не отправляет его в этот веб API.",
    privacy_p3: "Публичный endpoint возвращает только агрегированные сведения. Подробные записи защищены проверкой Cloudflare Access и email владельца; постоянное хранение зависит от настройки Cloudflare KV.",
    privacy_p4: "Журнал на сервере ограничен последними 200 событиями, а последняя запись устройства хранится до удаления оператором. Отзыв согласия прекращает будущую отправку, но не удаляет ранее сохранённые серверные записи.",
    privacy_law_uz_title: "Описание передачи данных",
    privacy_law_uz_desc: "Эта страница описывает поля и поведение веб API. Она не подтверждает юридическое соответствие и не заменяет политику обработки данных, которую определяет оператор платформы.",
    privacy_law_uk_title: "Хранение и доступ к записям",
    privacy_law_uk_desc: "Подробные записи ограничены Cloudflare Access. Постоянное хранение зависит от Cloudflare KV; сроки удаления и порядок обращений должен определить оператор платформы.",

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
    nav_sim_center: "SIM-markaz",
    nav_auto_download: "Avtomatik yuklash",
    nav_today_traffic: "Bugungi sarf",
    nav_usage_history: "Sarf tarixi",
    nav_sim_override: "SIM sozlamalarini almashtirish",
    nav_app_settings: "Sozlamalar",
    nav_support_app: "Dasturchini qo‘llab-quvvatlash",
    nav_web_downloads: "Ilovalarni yuklab olish",
    nav_web_about: "Platforma va maxfiylik haqida",
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
    theme_switch_to_light: "Yorug‘ mavzu",
    theme_switch_to_dark: "Qorong‘i mavzu",
    app_shell_name: "SIM platformasi",
    app_navigation: "ASOSIY BO‘LIMLAR",
    app_web_tools: "VEB-PORTAL",
    drawer_open: "Menyuni ochish",
    drawer_owner_login: "EGA SIFATIDA KIRISH",
    drawer_web_note: "VEB-BRAUZER",
    drawer_web_readonly: "SIM ma’lumotlari faqat hisobotlardan olinadi",
    home_sim_slots: "SIM kartalar",
    home_sim_slot_1: "SIM 1",
    home_sim_slot_2: "SIM 2",
    home_sim_selected: "TANLANGAN SIM",
    home_sim_data_boundary: "Sayt bu qurilmadagi SIM yoki radioni o‘qimaydi. Bu yerda faqat Android mijozi rozilikdan so‘ng yuborgan maydonlar ko‘rsatiladi; ICCID, IMSI va signal parametrlari veb auditga yuborilmaydi.",
    drawer_close: "Menyuni yopish",
    history_description: "Android mobil hisobotlari va hisoblagichlari jamlanmasi. Batafsil amallar tarixi egaga kirgandan so‘ng ko‘rinadi.",
    history_owner_link: "Batafsil jurnal",
    home_eyebrow: "QURILMALAR MONITORINGI",
    home_title: "SIM-markaz",
    home_subtitle: "Android hisobotlari va mobil hisoblagichlar jamlanmasi.",
    home_status_label: "Android hisobotlari holati",
    home_status_loading: "Server jamlanmasi yuklanmoqda…",
    home_last_report: "Oxirgi hisobot:",
    home_metrics_label: "Umumiy ko‘rsatkichlar",
    home_quick_actions: "Tezkor o‘tish",
    home_metric_devices: "Qurilmalar",
    home_metric_devices_hint: "hisobot yuborgan",
    home_metric_active: "Faol",
    home_metric_active_hint: "so‘nggi 75 soniyada",
    home_metric_traffic: "Mobil sarf",
    home_metric_traffic_hint: "kunlik · hisobotlar bo‘yicha",
    home_metric_speed: "SIM tezligi",
    home_speed_unavailable: "Yuborilmaydi",
    home_metric_speed_hint: "sayt radioaloqani o‘lchamaydi",
    home_data_boundary: "Faqat Android rozilikdan so‘ng yuborgan ma’lumot ko‘rsatiladi. Brauzer SIM-kartalar yoki radio parametrlarini o‘qimaydi.",
    refresh_data: "Jamlanmani yangilash",
    auto_eyebrow: "MOBIL SESSIYA",
    auto_subtitle: "Android ilovasidagi mobil internetni fonda yuklash sessiyasini boshqarish.",
    auto_status_label: "Sessiya holati",
    auto_status_unavailable: "Android kerak",
    auto_status_title: "Avtomatik yuklash telefonda ishlaydi",
    auto_status_description: "Sessiya tizim SIM hisoblagichlari, fon xizmatlari va batareya holatidan foydalanadi. Veb-sahifa uni boshlay yoki boshqara olmaydi.",
    auto_metric_network: "Tarmoq",
    auto_metric_network_value: "Faqat qurilmada",
    auto_metric_goal: "Sessiya maqsadi",
    auto_metric_goal_value: "Ilovada sozlanadi",
    auto_metric_thermal: "Qizishni nazorat qilish",
    auto_metric_thermal_value: "Androidda mavjud",
    auto_open_downloads: "Android yuklamalarini ochish",
    auto_history_title: "Sessiyalar tarixi",
    auto_history_note: "Ochiq veb jamlanmasi yuklash holati, sessiya maqsadi yoki batareya haroratini olmaydi. Android yuborgan batafsil hisobotlar egaga ko‘rinadi.",
    auto_owner_link: "Ega konsolini ochish",
    sim_config_eyebrow: "QURILMA PROFILLARI",
    sim_config_subtitle: "Android mijoz xabar qilgan SIM va eSIM profillari.",
    sim_config_readonly: "Faqat ko‘rish",
    sim_config_boundary: "Operatorni almashtirish va loyiha biriktirish Android qurilmasida saqlanadi. Veb-portal SIM sozlamalarini o‘zgartirmaydi.",
    sim_config_locked: "Batafsil SIM profillari Cloudflare Access orqali kirgandan keyin egaga ko‘rinadi.",
    sim_config_owner_link: "Ega sifatida kirish",
    settings_eyebrow: "INTERFEYS PARAMETRLARI",
    settings_subtitle: "Veb-portal ko‘rinishini sozlang.",
    settings_appearance: "TASHQI KO‘RINISH",
    settings_theme: "Mavzu",
    settings_theme_description: "Yorug‘ yoki qorong‘i mavzuga o‘tish.",
    settings_theme_action: "O‘zgartirish",
    settings_amoled: "AMOLED mavzu",
    settings_amoled_description: "Brauzerning qorong‘i mavzusi uchun qora fon.",
    settings_language: "Interfeys tili",
    settings_language_description: "Ruscha, o‘zbekcha yoki inglizcha.",
    settings_scale: "Interfeys masshtabi",
    settings_scale_description: "Matn va asosiy boshqaruv elementlari o‘lchami.",
    settings_motion: "Animatsiyani kamaytirish",
    settings_motion_description: "Harakat va bezak effektlarini kamaytirish.",
    settings_device_title: "QURILMA SOZLAMALARI",
    settings_device_note: "SIM ruxsatlari, fon cheklovlari, avtomatik ishga tushish va batareya himoyasi faqat Android ilovasi va telefon tizim sozlamalarida boshqariladi.",
    support_eyebrow: "LOYIHANI QO‘LLAB-QUVVATLASH",
    support_intro: "Xylen Sim Platform’dan foydalanayotganingiz uchun rahmat. Qo‘llab-quvvatlashingiz loyihani rivojlantirishga yordam beradi.",
    support_options: "Qo‘llab-quvvatlash usullari",
    support_copy: "O‘tkazma raqamini nusxalash",
    support_copy_note: "Raqam faqat tugma bosilganda nusxalanadi. Sayt orqali to‘lov amalga oshirilmaydi.",
    support_copy_failed: "Nusxalab bo‘lmadi. Raqamni qo‘lda belgilang.",

    // Overview Hero
    hero_badge: "Haqiqiy mobil telemetriya • Aloqa yadrosi v5.2",
    overview_hero_title: "Jimjit harakat",
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
    kpi_traffic_sub: "Android hisobotlaridagi hisoblagichlar",
    kpi_speed: "Hisobotdagi tezlik",
    kpi_speed_sub: "sayt radioefirni o‘lchamaydi",

    // Mobile client integration
    connect_title: "Xylen mobil mijozlarini qabul qilish shlyuzi",
    connect_desc: "Android hisobotlarni faqat rozilikdan so‘ng yuboradi. Ko‘rib chiqilgan iOS manba kodi jurnalni qurilmada saqlaydi.",
    connect_android: "Android mijozi",
    connect_ios: "iOS mijozi",

    path_story_kicker: "XYLEN / MA’LUMOTLAR OQIMI · 01—05",
    path_story_title: "Rozilikdan jamlanmagacha",
    path_story_desc: "Besh sahna Android nimalarni yuborishi, sayt nimalarni olishi va qaysi ma’lumotlar qurilmada qolishini ko‘rsatadi.",
    path_story_visual_note: "ANIMATSIYALI SXEMA · JONLI MA’LUMOT EMAS",
    path_story_progress: "BESH BOSQICH",
    path_story_1_title: "Uzatish rozilik bilan boshlanadi",
    path_story_1_desc: "Android hisoboti veb xizmatiga faqat foydalanuvchi roziligidan keyin yuboriladi.",
    path_story_2_title: "Mijoz hisobotni tayyorlaydi",
    path_story_2_desc: "Ilova JSON hodisasi va qurilmada mavjud hisoblagichlarni shakllantiradi.",
    path_story_3_title: "API kelgan ma’lumotni qabul qiladi",
    path_story_3_desc: "Yetkazish tarmoqqa bog‘liq. Server faqat haqiqatda yetib kelgan hodisa va hisoblagichlarni qabul qiladi.",
    path_story_4_title: "Ochiq qism jamlanmani ko‘rsatadi",
    path_story_4_desc: "Ochiq sahifa kelgan hisobotlarning jamlanmasini ko‘rsatadi va tasvirni o‘lchov sifatida bermaydi.",
    path_story_5_title: "iOS jurnali qurilmada qoladi",
    path_story_5_desc: "Ko‘rib chiqilgan iOS mijoz versiyasi jurnalni mahalliy saqlaydi va uni veb API’ga yubormaydi.",

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
    devices_hero_title: "Qurilmalar va hisobotlar",
    devices_hero_sub: "Bu yerda olingan Android hisobotlaridagi qurilmalar va hisoblagichlar ko‘rsatiladi. Ko‘rib chiqilgan mijoz versiyasida iOS jurnali qurilmada saqlanadi.",
    devices_empty_title: "Hozircha hisobotlar yo‘q",
    devices_empty_desc: "Android mijozi foydalanuvchi roziligidan so‘ng birinchi hisobotni yuborganda jamlanma paydo bo‘ladi. Veb-panel SIM yoki radio tarmoq parametrlarini bevosita o‘qimaydi va telefonni uzluksiz o‘lchamaydi.",
    devices_cellular_rule: "Jamlanma mijoz hisobotidagi maydonlardan foydalanadi. Sayt ma’lumotlar qaysi tarmoq interfeysi orqali uzatilganini mustaqil tekshirmaydi.",
    devices_empty_btn_test: "Android yuklamalarini ochish",
    devices_pair_token_label: "Mahalliy ulash kaliti:",
    devices_listening_status: "Foydalanuvchi roziligidan keyin yuborilgan Android hisoboti kutilmoqda.",
    devices_connected_sims: "Oxirgi hisobotdagi SIM profillari:",
    devices_status_online: "Yaqinda hisobot yuborgan",
    devices_status_offline: "Yaqinda hisobot yo‘q",
    devices_btn_inspect: "Hisobotni ko‘rish ➔",
    devices_btn_clear_all: "Qurilmalar ro'yxatini tozalash",

    // Traffic Section
    traffic_hero_title: "Mobil internet trafigi monitoringi",
    traffic_hero_sub: "Android mijozi rozilikdan so‘ng yuborgan mobil hisoblagichlar jamlanmasi. Veb-panel olingan hisobotlarni ko‘rsatadi, telefon tezligini real vaqtda o‘lchamaydi.",
    traffic_cellular_only_badge: "HISOBOTDAGI MOBIL HISOBLAGICHLAR",
    traffic_live_badge: "SO‘NGGI QABUL QILINGAN HISOBOT",
    traffic_standby_badge: "KUTISH REJIMI • STANDBY",
    traffic_speed_label: "Mijoz yuborgan joriy tezlik:",
    traffic_today_label: "Hisobotdagi bugungi hisoblagich:",
    traffic_packet_label: "Qabul qilingan hodisalar:",
    traffic_wifi_excluded_notice: "Jamlanma Android mijozi yuborgan mobil hisoblagichlarga asoslanadi. Veb hisobotida Wi-Fi hisoblagichi yo‘q; sayt tarmoq turini mustaqil tekshirmaydi.",

    // Releases & Installation
    releases_hero_title: "Ilovalarni yuklab olish markazi",
    releases_hero_sub: "Android va iOS yig‘ilmalari uchun amaldagi havolalar va ma’lumotlar.",
    platform_android_title: "Google Android",
    platform_android_desc: "Moslik va mavjud funksiyalar joriy Android yig‘ilmasiga bog‘liq. O‘rnatishdan oldin versiya va so‘raladigan ruxsatlar haqidagi ma’lumotni tekshiring.",
    btn_install_android: "Android uchun yuklab olish",
    platform_ios_title: "Apple iOS",
    platform_ios_desc: "Yig‘ilma mavjudligi va o‘rnatish usuli joriy versiyaga bog‘liq. Ko‘rib chiqilgan mijozda faoliyat jurnali qurilmada saqlanadi.",
    ios_local_log: "Faoliyat jurnali qurilmada saqlanadi",
    btn_install_ios: "iOS uchun o'rnatish",
    releases_whats_new: "Tanlangan yig‘ilma haqida:",
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
    android_step3_desc: "Android ayrim funksiyalar uchun SIM ma’lumotlari yoki joylashuvga ruxsat so‘rashi mumkin. Ruxsat berishdan oldin tizim so‘rovini o‘qing. Bu ruxsatlar baza stansiyasi yoki radio o‘lchovlari veb-hisobotga yuborilishini anglatmaydi.",
    android_step4_title: "4. Avtonom fon rejimi",
    android_step4_desc: "Hisobot yuborilishi rozilik, Android fon sozlamalari va tarmoq mavjudligiga bog‘liq. Uzatish tezligi va batareya sarfi qurilma hamda foydalanish rejimiga qarab o‘zgaradi; qat’iy ko‘rsatkich va’da qilinmaydi.",

    // iOS Steps
    ios_step1_title: "1. O'rnatish paketini yuklash",
    ios_step1_desc: "Loyiha egasi bergan amaldagi tarqatish havolasi va ko‘rsatmalardan foydalaning. O‘rnatish usuli ilova imzosi va joriy yig‘ilishga bog‘liq.",
    ios_step2_title: "2. Ilova manbasini tekshiring",
    ios_step2_desc: "Joriy yig‘ilma uchun loyiha egasi bergan ko‘rsatmalardan foydalaning. O‘rnatishdan oldin fayl manbasi va nashriyotchini tekshiring; profilning o‘zi ilova xavfsizligini tasdiqlamaydi.",
    ios_step3_title: "3. Mahalliy jurnal",
    ios_step3_desc: "Ko‘rib chiqilgan mijoz kodi faoliyat jurnalini qurilmada saqlaydi va uni veb audit APIga yubormaydi. Bu tavsif jurnalga tegishli, barcha iOS ma’lumotlariga emas.",
    ios_step4_title: "4. iPhone’da qoladigan ma’lumot",
    ios_step4_desc: "Ko‘rib chiqilgan ilova versiyasida faoliyat jurnali qurilmada saqlanadi. Live Activities, SIM vidjeti yoki real vaqtdagi tezlik bu versiyada tasdiqlanmagan.",

    // About
    about_hero_title: "Sinov o'tkazuvchilar uchun yaratilgan",
    about_origin_tag: "Platforma vazifasi • mobil hisobotlar",
    about_origin_title: "Mijoz hisobotidan — jamlanmagacha",
    about_origin_p1: "Xylen Platform — foydalanuvchi roziligidan keyin Android mijozi yuborgan qurilmalar va hisobotlarni ko‘rish uchun veb-panel.",
    about_origin_p2: "Jamlanma hisobotdagi hodisalar va hisoblagichlarga tayanadi. Ularning tarkibi mijoz, qurilma va Android versiyasiga bog‘liq; sayt radio kanalni o‘lchamaydi va operator billingini tekshirmaydi.",
    about_arch_title: "Nativ dasturiy arxitektura",
    about_p1: "Platforma umumiy hisobotlarni ko‘rsatadi va egasiga batafsil yozuvlarni alohida tekshiruvdan so‘ng ochadi. U radio signalni o‘lchamaydi va mobil sarfni operator billingiga solishtirmaydi.",
    about_p2: "Android mijozi Kotlin va Jetpack Compose-da yozilgan. Rozilikdan so‘ng u Data Charter’da ko‘rsatilgan maydonlarni veb APIga yuboradi; hisobot tarkibi ilova, qurilma va Android versiyasiga bog‘liq.",
    about_p3: "Veb API hisobotlarni Cloudflare Pages Functions orqali qabul qiladi. Ochiq endpoint jamlanmalarni qaytaradi, batafsil yozuvlar esa Cloudflare Access orqali cheklanadi. Doimiy saqlash Cloudflare KV sozlamasiga bog‘liq.",
    about_p4: "Mobil trafik jamlanmalari mijoz yuborgan hisoblagichlarga asoslanadi. Sayt CID/TAC yoki radio o‘lchovlarini olmaydi va operator ko‘rsatkichlarining aniqligini tasdiqlamaydi.",

    // Privacy
    privacy_hero_title: "Maxfiylik",
    privacy_hero_sub: "Xylen ma’lumotlar oqimining texnik tavsifi. Qo‘llanadigan talablar va qayta ishlash asoslarini platforma operatori belgilaydi.",
    privacy_badge_uz: "HISOBOT TARKIBI",
    privacy_badge_uk: "KIRISH VA SAQLASH",
    privacy_p1: "Rozilikdan so‘ng Android o‘rnatish IDsi, model, sinovchi ismi, ekran, amal va tafsilot, operator, vaqt, holat, kunlik va sessiya hisoblagichlari hamda faol yoki bugun ishlatilgan SIM profillarini yuboradi.",
    privacy_p2: "Veb audit API telefon raqami, ICCID, IMSI, baza stansiyasi IDlari yoki radio o‘lchovlarini olmaydi. Ko‘rib chiqilgan iOS kodi jurnalni qurilmada saqlaydi va ushbu veb APIga yubormaydi.",
    privacy_p3: "Ochiq endpoint faqat umumiy ma’lumotlarni qaytaradi. Batafsil yozuvlar Cloudflare Access va egasi emaili bilan himoyalangan; doimiy saqlash Cloudflare KV sozlamasiga bog‘liq.",
    privacy_p4: "Server jurnali oxirgi 200 hodisa bilan cheklangan, qurilmaning so‘nggi yozuvi operator o‘chirmaguncha saqlanadi. Rozilikni bekor qilish keyingi yuborishni to‘xtatadi, avvalgi yozuvlarni o‘chirmaydi.",
    privacy_law_uz_title: "Ma’lumot uzatish tavsifi",
    privacy_law_uz_desc: "Bu sahifa veb API maydonlari va ishlashini tasvirlaydi. U qonuniy muvofiqlikni tasdiqlamaydi va platforma operatori belgilaydigan ma’lumotlarni qayta ishlash siyosatini almashtirmaydi.",
    privacy_law_uk_title: "Yozuvlarni saqlash va ularga kirish",
    privacy_law_uk_desc: "Batafsil yozuvlar Cloudflare Access orqali cheklanadi. Doimiy saqlash Cloudflare KV sozlamasiga bog‘liq; o‘chirish muddati va murojaat tartibini platforma operatori belgilaydi.",

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
    nav_sim_center: "SIM Center",
    nav_auto_download: "Auto Download",
    nav_today_traffic: "Today's Usage",
    nav_usage_history: "Usage History",
    nav_sim_override: "SIM Overrides",
    nav_app_settings: "Settings",
    nav_support_app: "Support the Developer",
    nav_web_downloads: "App Downloads",
    nav_web_about: "About and Privacy",
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
    theme_switch_to_light: "Light theme",
    theme_switch_to_dark: "Dark theme",
    app_shell_name: "SIM PLATFORM",
    app_navigation: "MAIN SECTIONS",
    app_web_tools: "WEB PORTAL",
    drawer_open: "Open menu",
    drawer_owner_login: "OWNER SIGN IN",
    drawer_web_note: "WEB BROWSER",
    drawer_web_readonly: "SIM data is available from reports only",
    home_sim_slots: "SIM cards",
    home_sim_slot_1: "SIM 1",
    home_sim_slot_2: "SIM 2",
    home_sim_selected: "SELECTED SIM",
    home_sim_data_boundary: "This site cannot read the SIM or radio on this device. It shows only fields sent by the Android client after consent; ICCID, IMSI, and signal measurements are not sent to the web audit.",
    drawer_close: "Close menu",
    history_description: "A summary of Android reports and counters. Detailed activity history is available to the owner after sign-in.",
    history_owner_link: "Detailed activity log",
    home_eyebrow: "DEVICE MONITORING",
    home_title: "SIM Center",
    home_subtitle: "Android reports and cellular counters at a glance.",
    home_status_label: "Android report status",
    home_status_loading: "Loading server summary…",
    home_last_report: "Last report:",
    home_metrics_label: "Summary metrics",
    home_quick_actions: "Quick access",
    home_metric_devices: "Devices",
    home_metric_devices_hint: "have sent reports",
    home_metric_active: "Active",
    home_metric_active_hint: "in the last 75 seconds",
    home_metric_traffic: "Cellular usage",
    home_metric_traffic_hint: "today · reported counters",
    home_metric_speed: "SIM speed",
    home_speed_unavailable: "Not reported",
    home_metric_speed_hint: "the site does not measure radio",
    home_data_boundary: "Only data Android sent after consent is shown. This browser cannot read SIM cards or radio measurements.",
    refresh_data: "Refresh summary",
    auto_eyebrow: "MOBILE SESSION",
    auto_subtitle: "Manage a background cellular download session in the Android app.",
    auto_status_label: "Session status",
    auto_status_unavailable: "Android required",
    auto_status_title: "Auto download runs on the phone",
    auto_status_description: "The session uses system SIM counters, background services, and battery state. A web page cannot start or control it.",
    auto_metric_network: "Network",
    auto_metric_network_value: "On device only",
    auto_metric_goal: "Session target",
    auto_metric_goal_value: "Set in the app",
    auto_metric_thermal: "Thermal guard",
    auto_metric_thermal_value: "Available on Android",
    auto_open_downloads: "Open Android downloads",
    auto_history_title: "Session history",
    auto_history_note: "The public web summary does not receive download state, a session target, or battery temperature. Detailed reports are owner-only when Android sends those fields.",
    auto_owner_link: "Open owner console",
    sim_config_eyebrow: "DEVICE PROFILES",
    sim_config_subtitle: "SIM and eSIM profiles reported by the Android client.",
    sim_config_readonly: "Read only",
    sim_config_boundary: "Carrier overrides and project assignment are stored on the Android device. The web portal cannot change SIM settings.",
    sim_config_locked: "Detailed SIM profiles are available to the owner after Cloudflare Access sign-in.",
    sim_config_owner_link: "Sign in as owner",
    settings_eyebrow: "INTERFACE OPTIONS",
    settings_subtitle: "Adjust the appearance of this web portal.",
    settings_appearance: "APPEARANCE",
    settings_theme: "Theme",
    settings_theme_description: "Switch between light and dark themes.",
    settings_theme_action: "Change",
    settings_amoled: "AMOLED theme",
    settings_amoled_description: "Black background for the browser dark theme.",
    settings_language: "Interface language",
    settings_language_description: "Russian, Uzbek, or English.",
    settings_scale: "Interface scale",
    settings_scale_description: "Text and primary control size.",
    settings_motion: "Reduce motion",
    settings_motion_description: "Limit movement and decorative effects.",
    settings_device_title: "DEVICE SETTINGS",
    settings_device_note: "SIM permissions, background limits, auto-start, and battery protection are managed in the Android app and phone settings.",
    support_eyebrow: "PROJECT SUPPORT",
    support_intro: "Thank you for using Xylen Sim Platform. Your support helps the project continue to grow.",
    support_options: "Ways to support",
    support_copy: "Copy transfer number",
    support_copy_note: "The number is copied only after you press the button. No payment is processed on this website.",
    support_copy_failed: "Could not copy. Select the number manually.",

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
    kpi_traffic_sub: "counters from Android reports",
    kpi_speed: "Speed in report",
    kpi_speed_sub: "the site does not measure radio activity",

    // Mobile client integration
    connect_title: "Xylen mobile client gateway",
    connect_desc: "Android sends reports only after consent. The reviewed iOS source code keeps its activity log on-device.",
    connect_android: "Android client",
    connect_ios: "iOS client",

    path_story_kicker: "XYLEN / DATA PATH · 01—05",
    path_story_title: "From consent to summary",
    path_story_desc: "Five scenes show what Android reports, what the site receives, and which data stays on the device.",
    path_story_visual_note: "ANIMATED ILLUSTRATION · NOT LIVE DATA",
    path_story_progress: "FIVE STAGES",
    path_story_1_title: "Consent enables transmission",
    path_story_1_desc: "Android sends a report to the web service only after the user gives consent.",
    path_story_2_title: "The client forms a report",
    path_story_2_desc: "The app builds a JSON event and the device counters available to it.",
    path_story_3_title: "The API receives delivered data",
    path_story_3_desc: "Delivery depends on the network. The server accepts only events and counters that actually arrive.",
    path_story_4_title: "The public view shows a summary",
    path_story_4_desc: "The public page uses aggregated received reports and does not present the illustration as a measurement.",
    path_story_5_title: "The iOS log stays on-device",
    path_story_5_desc: "The reviewed iOS client version stores its log locally and does not send it to the web API.",

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
    devices_hero_title: "Devices and reports",
    devices_hero_sub: "This page shows devices and counters included in received Android reports. The reviewed iOS client version keeps its activity log on the device.",
    devices_empty_title: "No reports yet",
    devices_empty_desc: "A summary appears after the Android client sends its first report with the user’s consent. The web panel does not read SIM or radio parameters directly or measure the phone continuously.",
    devices_cellular_rule: "The summary uses fields included in the client report. The site does not independently verify which network interface carried the data.",
    devices_empty_btn_test: "Open Android downloads",
    devices_pair_token_label: "Local pairing key:",
    devices_listening_status: "Waiting for an Android report sent with the user’s consent.",
    devices_connected_sims: "SIM profiles in the latest report:",
    devices_status_online: "Recently reported",
    devices_status_offline: "No recent report",
    devices_btn_inspect: "View report ➔",
    devices_btn_clear_all: "Clear Device List",

    // Traffic Section
    traffic_hero_title: "Cellular Traffic Monitoring",
    traffic_hero_sub: "A summary of mobile counters sent by the Android client after consent. The web panel displays received reports; it does not measure a phone's live speed.",
    traffic_cellular_only_badge: "MOBILE COUNTERS FROM REPORTS",
    traffic_live_badge: "LAST RECEIVED REPORT",
    traffic_standby_badge: "STANDBY MODE • WAITING",
    traffic_speed_label: "Current speed, if reported by the client:",
    traffic_today_label: "Counter reported for today:",
    traffic_packet_label: "Events received:",
    traffic_wifi_excluded_notice: "The summary uses mobile counters sent by the Android client. The web report has no Wi-Fi counter; the site does not independently inspect the network interface.",

    // Releases & Installation
    releases_hero_title: "App Download Center",
    releases_hero_sub: "Current links and information for available Android and iOS builds.",
    platform_android_title: "Google Android",
    platform_android_desc: "Compatibility and available features depend on the current Android client build. Check the version details and requested permissions before installing.",
    btn_install_android: "Download for Android",
    platform_ios_title: "Apple iOS",
    platform_ios_desc: "Build availability and installation steps depend on the current version. The reviewed client keeps its activity log on the device.",
    ios_local_log: "Activity log stays on the device",
    btn_install_ios: "Install on iOS",
    releases_whats_new: "Selected build information:",
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
    android_step3_desc: "Android may request access to SIM details or location for specific app features. Read the system prompt before granting access. Those permissions do not mean that cell IDs or radio measurements are sent in the web report.",
    android_step4_title: "4. Autonomous background service",
    android_step4_desc: "Report delivery depends on consent, Android background settings, and network availability. Upload timing and battery use vary by device and usage; no fixed figures are promised.",

    // iOS Steps
    ios_step1_title: "1. Download installation package",
    ios_step1_desc: "Use the current distribution link and instructions from the project owner. The installation method depends on the app signature and current build.",
    ios_step2_title: "2. Check the app source",
    ios_step2_desc: "Use the project owner's instructions for the current build. Check the file source and publisher before installing; a profile alone does not establish that an app is safe.",
    ios_step3_title: "3. On-device activity log",
    ios_step3_desc: "The reviewed client source stores its activity log on-device and does not send it to the web audit API. This description applies to that log, not all iOS data.",
    ios_step4_title: "4. What stays on iPhone",
    ios_step4_desc: "The reviewed app version stores its activity log on-device. Live Activities, a SIM widget, and real-time speed are not confirmed in this version.",

    // About
    about_hero_title: "Built for Mobile Network Testers",
    about_origin_tag: "Platform purpose • mobile reports",
    about_origin_title: "From a client report to a summary",
    about_origin_p1: "Xylen Platform is a web panel for viewing devices and reports sent by the Android client after the user consents.",
    about_origin_p2: "Summaries use events and counters included in reports. Their contents depend on the client, device, and Android version; the site does not measure the radio channel or compare usage with carrier billing.",
    about_arch_title: "Native Architecture Stack",
    about_p1: "The platform shows aggregate reports and gives the owner access to detailed records after a separate check. It does not measure radio signal or compare mobile usage with carrier billing.",
    about_p2: "The Android client is built with Kotlin and Jetpack Compose. After consent, it sends the fields described in the Data Charter to the web API; report contents vary by app, device, and Android version.",
    about_p3: "The web API receives reports through Cloudflare Pages Functions. The public endpoint returns aggregates, while Cloudflare Access restricts detailed records. Persistent storage depends on Cloudflare KV configuration.",
    about_p4: "Mobile-traffic summaries use counters reported by the client. The site does not receive CID/TAC or radio measurements and does not verify carrier readings.",

    // Privacy
    privacy_hero_title: "Privacy",
    privacy_hero_sub: "A technical description of Xylen’s data flow. The platform operator determines applicable requirements and lawful bases.",
    privacy_badge_uz: "REPORT FIELDS",
    privacy_badge_uk: "ACCESS AND RETENTION",
    privacy_p1: "After consent, Android sends an installation ID, model, tester name, screen, action and details, carrier, timestamp, status, daily and session counters, and SIM profiles active now or used today.",
    privacy_p2: "The web audit API does not receive phone numbers, ICCID, IMSI, cell IDs, or radio measurements. The reviewed iOS source stores its activity log on-device and does not send it to this web API.",
    privacy_p3: "The public endpoint returns aggregate information only. Detailed records are protected by Cloudflare Access and the owner email; persistent storage depends on Cloudflare KV configuration.",
    privacy_p4: "The server log is limited to the latest 200 events, while each device’s latest record remains until the operator deletes it. Revoking consent stops future uploads but does not erase records already stored on the server.",
    privacy_law_uz_title: "Data-transfer description",
    privacy_law_uz_desc: "This page describes the web API fields and behavior. It does not certify legal compliance or replace a data-processing policy defined by the platform operator.",
    privacy_law_uk_title: "Record retention and access",
    privacy_law_uk_desc: "Detailed records are restricted through Cloudflare Access. Persistent storage depends on Cloudflare KV; the platform operator must define deletion periods and a contact process.",

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

/* Exact-copy fallback for legacy markup and content created after the first render.
   Values are ordered RU, EN, UZ so translated labels survive page rerenders too. */
const INLINE_COPY = [
  ['Платформа Xylen • Сводка мобильных отчётов', 'Xylen Platform • Mobile report summary', 'Xylen platformasi • Mobil hisobotlar jamlanmasi'],
  ['Xylen Platform: сводка клиентских отчётов Android, сетевых счётчиков и журнала событий приложения.', 'Xylen Platform: a summary of Android client reports, network counters, and app activity logs.', 'Xylen Platform: Android mijoz hisobotlari, tarmoq hisoblagichlari va ilova hodisalari jurnali jamlanmasi.'],
  ['Настройки', 'Settings', 'Sozlamalar'],
  ['Язык интерфейса', 'Interface language', 'Interfeys tili'],
  ['Режим оформления', 'Appearance', 'Ko‘rinish'],
  ['Тёмная тема', 'Dark theme', 'Qorong‘i mavzu'],
  ['Светлая тема', 'Light theme', 'Yorug‘ mavzu'],
  ['Меню сайта', 'Site menu', 'Sayt menyusi'],
  ['Закрыть меню', 'Close menu', 'Menyuni yopish'],
  ['Язык интерфейса', 'Interface language', 'Interfeys tili'],
  ['Разделы Xylen Workspace', 'Xylen Workspace sections', 'Xylen Workspace bo‘limlari'],
  ['Меню, языки и тема', 'Menu, language, and theme', 'Menyu, til va mavzu'],
  ['Открыть меню', 'Open menu', 'Menyuni ochish'],
  ['Предпросмотр страницы', 'Page preview', 'Sahifa ko‘rinishi'],
  ['Путь отчёта', 'Report path', 'Hisobot yo‘li'],
  ['Назад', 'Previous', 'Oldingi'],
  ['Вперед', 'Next', 'Keyingi'],
  ['Обновить сейчас', 'Refresh now', 'Hozir yangilash'],
  ['Наверх', 'Back to top', 'Yuqoriga'],
  ['Xylen Workspace • Наверх', 'Xylen Workspace • Back to top', 'Xylen Workspace • Yuqoriga'],
  ['Xylen Monogram', 'Xylen monogram', 'Xylen monogrammasi'],
  ['Xylen Management', 'Xylen Management', 'Xylen boshqaruv tizimi'],
  ['Радиомодем Android', 'Android radio modem', 'Android radio modemi'],
  ['Прямой съём с радиочипа', 'Direct radio-chip readings', 'Radiochipdan to‘g‘ridan-to‘g‘ri ko‘rsatkichlar'],
  ['Сайт получает от Android разрешённые операторские сведения и сотовые счётчики, но не параметры сигнала или вышки.', 'The site receives carrier details and cellular counters reported by Android, but no signal or cell-tower measurements.', 'Sayt Android yuborgan operator ma’lumotlari va mobil hisoblagichlarni oladi, ammo signal yoki baza stansiyasi o‘lchovlarini olmaydi.'],
  ['Отчёт клиента', 'Client report', 'Mijoz hisoboti'],
  ['События приложения', 'App events', 'Ilova hodisalari'],
  ['После согласия Android отправляет события и счётчики в JSON-отчётах.', 'After consent, Android sends events and counters in JSON reports.', 'Rozilikdan so‘ng Android hodisalar va hisoblagichlarni JSON hisobotlarida yuboradi.'],
  ['Billing Guard', 'Access control', 'Kirish nazorati'],
  ['Подробные отчёты доступны владельцу после проверки Cloudflare Access.', 'Detailed reports are available to the owner after Cloudflare Access verification.', 'Batafsil hisobotlar Cloudflare Access tekshiruvidan keyin egasiga ochiladi.'],
  ['Локальный журнал', 'On-device log', 'Qurilmadagi jurnal'],
  ['Журнал iOS', 'iOS activity log', 'iOS hodisalar jurnali'],
  ['Изученный исходный код iOS хранит журнал на устройстве и не отправляет его в веб API.', 'The reviewed iOS source keeps the activity log on-device and does not send it to the web API.', 'Ko‘rib chiqilgan iOS manba kodi jurnalni qurilmada saqlaydi va veb APIga yubormaydi.'],
  ['ШАГ СОГЛАСИЯ', 'CONSENT GATE', 'ROZILIK BOSQICHI'],
  ['СОГЛАСИЕ ПОЛЬЗОВАТЕЛЯ', 'USER CONSENT', 'FOYDALANUVCHI ROZILIGI'],
  ['TRANSMISSION READY', 'READY TO SEND', 'YUBORISHGA TAYYOR'],
  ['ANDROID REPORT', 'ANDROID REPORT', 'ANDROID HISOBOTI'],
  ['REPORT / JSON', 'REPORT / JSON', 'HISOBOT / JSON'],
  ['СОБЫТИЕ КЛИЕНТА', 'CLIENT EVENT', 'MIJOZ HODISASI'],
  ['СОБЫТИЕ', 'EVENT', 'HODISA'],
  ['COUNTERS', 'COUNTERS', 'HISOBLAGICHLAR'],
  ['WEB API', 'WEB API', 'VEB API'],
  ['ПОЛУЧЕНО', 'RECEIVED', 'QABUL QILINDI'],
  ['ОТКРЫТАЯ СВОДКА', 'PUBLIC SUMMARY', 'OCHIQ JAMLAMA'],
  ['AGGREGATE VIEW', 'AGGREGATE VIEW', 'UMUMIY KO‘RINISH'],
  ['ТОЛЬКО НА УСТРОЙСТВЕ', 'ON-DEVICE ONLY', 'FAQAT QURILMADA'],
  ['ЛОКАЛЬНЫЙ ЖУРНАЛ СОБЫТИЙ', 'LOCAL ACTIVITY LOG', 'MAHALLIY HODISALAR JURNALI'],
  ['НА ЭТОМ УСТРОЙСТВЕ', 'ON THIS DEVICE', 'USHBU QURILMADA'],
  ['Ключевые показатели сотовой телеметрии', 'Cellular report summary', 'Mobil tarmoq hisoboti jamlanmasi'],
  ['↻ Видео-схема · цикл', '↻ Animated video · loop', '↻ Animatsion video · takror'],
  ['01 • Согласие', '01 • Consent', '01 • Rozilik'],
  ['02 • Отчёт', '02 • Report', '02 • Hisobot'],
  ['03 • Сводка', '03 • Summary', '03 • Jamlanma'],
  ['04 • Доступ', '04 • Access', '04 • Kirish'],
  ['05 • iOS', '05 • iOS', '05 • iOS'],
  ['ШЛЮЗ СИНХРОНИЗАЦИИ АКТИВЕН', 'SYNC GATEWAY ACTIVE', 'SINXRONLASH SHLYUZI FAOL'],
  ['🔄 Обновить', '🔄 Refresh', '🔄 Yangilash'],
  ['Всего тестировщиков', 'Total testers', 'Jami sinovchilar'],
  ['Сейчас в сети', 'Online now', 'Hozir onlayn'],
  ['Израсходовано за сегодня', 'Used today', 'Bugun sarflangan'],
  ['0 МБ', '0 MB', '0 MB'],
  ['Зафиксировано действий', 'Actions recorded', 'Qayd etilgan amallar'],
  ['Тестировщики приложения (Кто где находится и что использует)', 'App testers (where they are and what they use)', 'Ilova sinovchilari (joylashuvi va ishlatayotgan funksiyalari)'],
  ['Хронология действий (Кто куда заходит)', 'Activity timeline (where users go)', 'Amallar tarixi (foydalanuvchi kirgan bo‘limlar)'],
  ['LIVE STREAM', 'LIVE STREAM', 'JONLI OQIM'],
  ['Расход трафика по пользователям', 'Traffic usage by user', 'Foydalanuvchilar bo‘yicha trafik sarfi'],
  ['МОБИЛЬНЫЕ ДАННЫЕ', 'CELLULAR DATA', 'MOBIL TARMOQ MA’LUMOTLARI'],
  ['Live Telemetry Waveform', 'Live report waveform', 'Jonli hisobot to‘lqini'],
  ['0.0 МБ', '0.0 MB', '0.0 MB'],
  ['🛡️ БИЛЛИНГ И БЕЗОПАСНОСТЬ', '🛡️ ACCESS AND DATA SAFETY', '🛡️ KIRISH VA MA’LUMOTLAR XAVFSIZLIGI'],
  ['Версия v5.3 (Сборка 29)', 'Version v5.3 (Build 29)', 'v5.3 versiya (29-yig‘ilma)'],
  ['Расход батареи <0.1%', 'Battery use <0.1%', 'Batareya sarfi <0.1%'],
  ['Показать QR-код для установки', 'Show installation QR code', 'O‘rnatish QR kodini ko‘rsatish'],
  ['Версия v5.2 (Сборка 28)', 'Version v5.2 (Build 28)', 'v5.2 versiya (28-yig‘ilma)'],
  ['Шаг 1', 'Step 1', '1-qadam'],
  ['Шаг 2', 'Step 2', '2-qadam'],
  ['Шаг 3', 'Step 3', '3-qadam'],
  ['Шаг 4', 'Step 4', '4-qadam'],
  ['О платформе', 'About the platform', 'Platforma haqida'],
  ['Назначение платформы', 'Platform purpose', 'Platformaning vazifasi'],
  ['Панель помогает владельцу увидеть зарегистрированные Android-устройства, недавние отчёты, дневные счётчики и действия, сообщённые приложением. Публичная часть показывает только агрегированные сведения.', 'The console helps the owner review registered Android devices, recent reports, daily counters, and app-reported actions. The public view shows aggregate information only.', 'Panel egasiga ro‘yxatdan o‘tgan Android qurilmalari, so‘nggi hisobotlar, kunlik hisoblagichlar va ilova yuborgan amallarni ko‘rishga yordam beradi. Ochiq qism faqat umumiy ma’lumotni ko‘rsatadi.'],
  ['Как устроен обмен данными', 'How data is exchanged', 'Ma’lumot almashinuvi qanday ishlaydi'],
  ['После согласия Android отправляет JSON-отчёт в /api/audit по HTTPS. Cloudflare Pages Function принимает его; постоянное хранение использует настроенный KV binding. Подробные записи доступны после проверки Cloudflare Access и email владельца.', 'After consent, Android sends a JSON report to /api/audit over HTTPS. A Cloudflare Pages Function receives it; persistent storage uses the configured KV binding. Detailed records require Cloudflare Access verification and the owner email.', 'Rozilikdan so‘ng Android HTTPS orqali /api/audit manziliga JSON hisobot yuboradi. Uni Cloudflare Pages Function qabul qiladi; doimiy saqlash sozlangan KV bindingdan foydalanadi. Batafsil yozuvlar Cloudflare Access va egasining emaili tekshirilgandan keyin ochiladi.'],
  ['Границы возможностей', 'Platform boundaries', 'Platforma imkoniyatlari chegaralari'],
  ['Сайт показывает значения, сообщённые клиентом, и не проверяет их независимо. Он не измеряет скорость радио в реальном времени и не получает данные о вышках. Изученный исходный код iOS хранит журнал локально и не отправляет его в этот веб API.', 'The site displays client-reported values and does not verify them independently. It does not measure live radio speed or receive cell-tower data. The reviewed iOS source stores its log locally and does not send it to this web API.', 'Sayt mijoz yuborgan qiymatlarni ko‘rsatadi va ularni mustaqil tekshirmaydi. U radio tezligini jonli o‘lchamaydi yoki baza stansiyasi ma’lumotlarini olmaydi. Ko‘rib chiqilgan iOS kodi jurnalni mahalliy saqlaydi va ushbu veb APIga yubormaydi.'],
  ['Здесь описан поток данных в изученных версиях сайта и мобильных клиентов. Это техническая информация, а не юридическое заключение; оператор должен определить применимые требования и основания обработки.', 'This describes the data flow in the reviewed website and mobile-client versions. It is technical information, not legal advice; the operator must determine applicable requirements and processing grounds.', 'Bu yerda sayt va mobil mijozlarning ko‘rib chiqilgan versiyalaridagi ma’lumot oqimi tasvirlangan. Bu texnik ma’lumot, yuridik xulosa emas; operator tegishli talablar va qayta ishlash asoslarini belgilashi kerak.'],
  ['Данные Android-отчёта', 'Android report data', 'Android hisoboti ma’lumotlari'],
  ['После согласия Android отправляет ID установки, модель, имя тестировщика, экран, действие и детали, оператора, дневные и сессионные счётчики, а также сведения об активных или использованных сегодня SIM-профилях. Значения сообщает клиент, сервер не проверяет их независимо.', 'After consent, Android sends an installation ID, model, tester name, screen, action and details, carrier, daily and session counters, and details of SIM profiles active or used today. The client reports these values; the server does not verify them independently.', 'Rozilikdan so‘ng Android o‘rnatish IDsi, model, sinovchi nomi, ekran, amal va tafsilotlar, operator, kunlik va seans hisoblagichlari, shuningdek faol yoki bugun ishlatilgan SIM profillari haqidagi ma’lumotlarni yuboradi. Qiymatlarni mijoz yuboradi, server mustaqil tekshirmaydi.'],
  ['Что не передаётся в веб-аудит', 'What web audit does not receive', 'Veb auditga nimalar yuborilmaydi'],
  ['Веб audit API не получает номера телефона, ICCID, IMSI, идентификаторы вышек или измерения радиосигнала. Изученный код iOS хранит журнал на устройстве. Отдельный Android portal API может передавать данные на другой сервис при настройке.', 'The web audit API does not receive phone numbers, ICCID, IMSI, cell IDs, or radio measurements. The reviewed iOS code keeps its log on-device. A separate Android portal API may send data to another service when configured.', 'Veb audit API telefon raqami, ICCID, IMSI, baza stansiyasi IDlari yoki radio o‘lchovlarini olmaydi. Ko‘rib chiqilgan iOS kodi jurnalni qurilmada saqlaydi. Alohida Android portal API sozlangan bo‘lsa, boshqa xizmatga ma’lumot yuborishi mumkin.'],
  ['Назначение и доступ', 'Purpose and access', 'Maqsad va kirish'],
  ['Публичный endpoint возвращает агрегированные числа и сотовые счётчики. Подробные записи требуют проверки Cloudflare Access и соответствия email владельца.', 'The public endpoint returns aggregate counts and cellular counters. Detailed records require Cloudflare Access verification and a matching owner email.', 'Ochiq endpoint umumiy sonlar va mobil hisoblagichlarni qaytaradi. Batafsil yozuvlar uchun Cloudflare Access tekshiruvi va egasining emaili mos kelishi talab qilinadi.'],
  ['Хранение и удаление', 'Retention and deletion', 'Saqlash va o‘chirish'],
  ['Сервер хранит последнюю запись устройства до удаления оператором; журнал ограничен последними 200 событиями. Отзыв согласия прекращает будущую отправку, но сам по себе не удаляет уже сохранённые записи.', 'The server keeps each device’s latest record until the operator deletes it; the log is limited to the latest 200 events. Revoking consent stops future uploads but does not itself delete records already stored.', 'Server har bir qurilmaning so‘nggi yozuvini operator o‘chirguncha saqlaydi; jurnal oxirgi 200 hodisa bilan cheklangan. Rozilikni bekor qilish yangi yuborishlarni to‘xtatadi, ammo saqlangan yozuvlarni o‘z-o‘zidan o‘chirmaydi.'],
  ['Защита и правовые сведения', 'Security and legal information', 'Xavfsizlik va huquqiy ma’lumot'],
  ['Передача идёт по HTTPS. Оператору следует проверить применимость Закона Республики Узбекистан № ЗРУ-547 «О персональных данных», UK GDPR и Data Protection Act 2018. Эта страница не подтверждает соблюдение законодательства, расположение хранилища или шифрование данных на сервере.', 'Data is transmitted over HTTPS. The operator should assess whether Uzbekistan’s Law No. ZRU-547 on Personal Data, the UK GDPR, and the Data Protection Act 2018 apply. This page does not certify legal compliance, storage location, or server-side encryption.', 'Ma’lumot HTTPS orqali uzatiladi. Operator O‘zbekiston Respublikasining O‘RQ-547-son “Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonuni, UK GDPR va Data Protection Act 2018 qo‘llanishini tekshirishi kerak. Bu sahifa qonunlarga muvofiqlik, saqlash joyi yoki serverdagi shifrlashni tasdiqlamaydi.'],
  ['Сводка полученных отчётов Android и журнал событий приложения.', 'Summary of received Android reports and app activity logs.', 'Olingan Android hisobotlari va ilova hodisalari jurnali jamlanmasi.'],
  ['Выйти из консоли', 'Sign out of console', 'Konsoldan chiqish'],
  ['Служебные действия', 'Administrative actions', 'Xizmat amallari'],
  ['Управление реальными устройствами', 'Manage reported devices', 'Hisobot yuborgan qurilmalarni boshqarish'],
  ['+ Добавить устройство', '+ Add device', '+ Qurilma qo‘shish'],
  ['Очистить активные узлы', 'Clear active devices', 'Faol qurilmalarni tozalash'],
  ['Обновить ключ сопряжения шлюза', 'Refresh gateway pairing key', 'Shlyuz juftlash kalitini yangilash'],
  ['Доступ и отчётность', 'Access and reporting', 'Kirish va hisobotlar'],
  ['Как устроена веб-сводка', 'How the web summary works', 'Veb jamlanma qanday ishlaydi'],
  ['Источник показаний:', 'Reading source:', 'Ko‘rsatkich manbasi:'],
  ['Android-клиент после согласия', 'Android client after consent', 'Rozilikdan so‘ng Android mijozi'],
  ['Приём отчёта:', 'Report intake:', 'Hisobotni qabul qilish:'],
  ['Веб API проекта', 'Project web API', 'Loyiha veb API'],
  ['Публичный ответ:', 'Public response:', 'Ochiq javob:'],
  ['Агрегированные значения', 'Aggregate values', 'Umumlashtirilgan qiymatlar'],
  ['Радиоизмерения:', 'Radio measurements:', 'Radio o‘lchovlari:'],
  ['В веб-отчёте не передаются', 'Not sent in web reports', 'Veb hisobotlarda yuborilmaydi'],
  ['Подробные записи:', 'Detailed records:', 'Batafsil yozuvlar:'],
  ['Доступ владельца через Cloudflare Access', 'Owner access through Cloudflare Access', 'Cloudflare Access orqali egaga kirish'],
  ['Время', 'Time', 'Vaqt'],
  ['Устройство / Узел', 'Device / Node', 'Qurilma / Tugun'],
  ['Категория', 'Category', 'Turkum'],
  ['Действие', 'Action', 'Amal'],
  ['Инженерные детали', 'Technical details', 'Texnik tafsilotlar'],
  ['QR-код для установки', 'Installation QR code', 'O‘rnatish uchun QR kod'],
  ['Инженерный модуль Xylen Motion', 'Xylen Motion engineering module', 'Xylen Motion muhandislik moduli'],
  ['Закрыть инспектор', 'Close inspector', 'Inspektorni yopish'],
  ['● Мобильные данные', '● Cellular data', '● Mobil ma’lumotlar'],
  ['Слот:', 'Slot:', 'Slot:'],
  ['Счётчик за день:', 'Daily counter:', 'Kunlik hisoblagich:'],
  ['Источник:', 'Source:', 'Manba:'],
  ['отчёт Android', 'Android report', 'Android hisoboti'],
  ['В сети', 'Online', 'Onlayn'],
  ['Офлайн', 'Offline', 'Oflayn'],
  ['SIM / eSIM в отчёте клиента:', 'SIM / eSIM in client report:', 'Mijoz hisobotidagi SIM / eSIM:'],
  ['Этот отчёт не содержит сведений о SIM-профиле.', 'This report contains no SIM-profile details.', 'Ushbu hisobotda SIM profili tafsilotlari yo‘q.'],
  ['Мобильный счётчик за день:', 'Daily cellular counter:', 'Kunlik mobil hisoblagich:'],
  ['Экран в отчёте:', 'Screen in report:', 'Hisobotdagi ekran:'],
  ['Показание клиента', 'Client-reported reading', 'Mijoz yuborgan ko‘rsatkich'],
  ['не указан', 'not provided', 'ko‘rsatilmagan'],
  ['Хронология подключений', 'Connection timeline', 'Ulanishlar tarixi'],
  ['Удалить узел', 'Remove device', 'Qurilmani o‘chirish'],
  ['Инспектор телеметрии ➔', 'Report inspector ➔', 'Hisobot inspektori ➔'],
  ['Радиоэфир активен • Ожидание передачи данных', 'Radio status • Waiting for a report', 'Radio holati • Hisobot kutilmoqda'],
  ['Сводка появится после того, как Android-клиент отправит первый отчёт с согласия пользователя. Веб-панель не считывает параметры SIM или радиосети напрямую и не измеряет телефон непрерывно.', 'The summary appears after the Android client sends its first report with user consent. The web console does not read SIM or radio parameters directly or monitor the phone continuously.', 'Android mijozi foydalanuvchi roziligi bilan birinchi hisobotni yuborgach jamlanma ko‘rinadi. Veb panel SIM yoki radio parametrlarini bevosita o‘qimaydi va telefonni uzluksiz kuzatmaydi.'],
  ['Веб-сводка ожидает клиентские отчёты Android после согласия пользователя.', 'The web summary is waiting for Android reports submitted with user consent.', 'Veb jamlanma foydalanuvchi roziligidan so‘ng yuboriladigan Android hisobotlarini kutmoqda.'],
  ['Центр загрузки клиентов (Android / iOS)', 'Client downloads (Android / iOS)', 'Mijoz ilovalarini yuklab olish (Android / iOS)'],
  ['Согласие и отправка отчёта', 'Consent and report submission', 'Rozilik va hisobot yuborish'],
  ['КОНТРОЛЬ ПОЛЬЗОВАТЕЛЯ', 'USER CONTROL', 'FOYDALANUVCHI NAZORATI'],
  ['Android-клиент отправляет отчёт в веб API только при включённом согласии. Отключение согласия останавливает последующую отправку; уже сохранённые записи при этом автоматически не удаляются.', 'The Android client sends reports to the web API only while consent is enabled. Turning consent off stops future uploads; records already stored are not automatically deleted.', 'Android mijozi veb APIga faqat rozilik yoqilganida hisobot yuboradi. Rozilikni o‘chirish keyingi yuborishlarni to‘xtatadi; avval saqlangan yozuvlar avtomatik o‘chirilmaydi.'],
  ['Условие отправки', 'Upload condition', 'Yuborish sharti'],
  ['Согласие включено в клиенте', 'Consent enabled in the client', 'Mijoz ilovasida rozilik yoqilgan'],
  ['После отключения', 'After consent is turned off', 'Rozilik o‘chirilgandan so‘ng'],
  ['Новые отчёты не отправляются', 'No new reports are sent', 'Yangi hisobotlar yuborilmaydi'],
  ['Уже полученные записи', 'Previously received records', 'Avval olingan yozuvlar'],
  ['Не удаляются автоматически', 'Are not deleted automatically', 'Avtomatik o‘chirilmaydi'],
  ['Поля Android-отчёта', 'Android report fields', 'Android hisoboti maydonlari'],
  ['JSON ОТ КЛИЕНТА', 'CLIENT JSON', 'MIJOZ JSONI'],
  ['После согласия клиент отправляет событие с данными установки и приложения, временем, оператором, мобильными счётчиками и доступными SIM-профилями. Состав отчёта зависит от версии клиента и устройства.', 'After consent, the client sends an event with installation and app data, time, carrier, cellular counters, and available SIM profiles. Report fields depend on the client version and device.', 'Rozilikdan so‘ng mijoz o‘rnatish va ilova ma’lumotlari, vaqt, operator, mobil hisoblagichlar va mavjud SIM profillari bo‘lgan hodisani yuboradi. Hisobot maydonlari mijoz versiyasi va qurilmaga bog‘liq.'],
  ['Событие', 'Event', 'Hodisa'],
  ['Экран, действие, время, детали', 'Screen, action, time, details', 'Ekran, amal, vaqt, tafsilotlar'],
  ['Счётчики', 'Counters', 'Hisoblagichlar'],
  ['Дневной и сессионный отчёт клиента', 'Client-reported daily and session totals', 'Mijoz yuborgan kunlik va seans jami'],
  ['SIM-профиль', 'SIM profile', 'SIM profili'],
  ['Слот, оператор, тип и счётчик', 'Slot, carrier, type, and counter', 'Slot, operator, tur va hisoblagich'],
  ['Публичная сводка', 'Public summary', 'Ochiq jamlanma'],
  ['АГРЕГИРОВАННЫЕ ДАННЫЕ', 'AGGREGATE DATA', 'UMUMLASHTIRILGAN MA’LUMOT'],
  ['Открытая часть API возвращает суммарные числа по полученным отчётам. Она не показывает подробный журнал и не подтверждает независимым измерением значения, присланные телефоном.', 'The public API returns aggregate counts from received reports. It does not show detailed logs or independently verify values reported by the phone.', 'Ochiq API olingan hisobotlardagi umumiy sonlarni qaytaradi. U batafsil jurnalni ko‘rsatmaydi va telefon yuborgan qiymatlarni mustaqil o‘lchov bilan tasdiqlamaydi.'],
  ['Публичный ответ', 'Public response', 'Ochiq javob'],
  ['Агрегированные числа', 'Aggregate counts', 'Umumiy sonlar'],
  ['Подробные события', 'Detailed events', 'Batafsil hodisalar'],
  ['Не публикуются', 'Not published', 'Ochiq e’lon qilinmaydi'],
  ['Источник показаний', 'Reading source', 'Ko‘rsatkich manbasi'],
  ['Данные, сообщённые клиентом', 'Client-reported data', 'Mijoz yuborgan ma’lumot'],
  ['Подробный доступ владельца', 'Detailed owner access', 'Egaga batafsil kirish'],
  ['ОТДЕЛЬНАЯ ПРОВЕРКА', 'SEPARATE VERIFICATION', 'ALOHIDA TEKSHIRUV'],
  ['Детальные записи выдаются через защищённый маршрут после проверки Cloudflare Access и совпадения учётной записи с адресом владельца, настроенным для проекта.', 'Detailed records are served through a protected route after Cloudflare Access verification and a match with the owner account configured for the project.', 'Batafsil yozuvlar himoyalangan yo‘l orqali Cloudflare Access tekshiruvi va loyiha uchun sozlangan egasi hisobi mos kelgandan keyin beriladi.'],
  ['Вход', 'Sign-in', 'Kirish'],
  ['Проверка владельца', 'Owner verification', 'Egani tekshirish'],
  ['Совпадение email', 'Email match', 'Email mosligi'],
  ['Область доступа', 'Access scope', 'Kirish doirasi'],
  ['Подробные записи отчётов', 'Detailed report records', 'Hisobotlarning batafsil yozuvlari'],
  ['Локальный журнал iOS', 'Local iOS activity log', 'iOS mahalliy hodisalar jurnali'],
  ['ХРАНЕНИЕ НА УСТРОЙСТВЕ', 'STORED ON-DEVICE', 'QURILMADA SAQLANADI'],
  ['В проверенной версии iOS-клиента журнал событий хранится на устройстве и не отправляется в веб audit API. Это описание относится к журналу, а не ко всем данным приложения.', 'In the reviewed iOS client version, the activity log stays on-device and is not sent to the web audit API. This describes the log, not all app data.', 'Ko‘rib chiqilgan iOS mijoz versiyasida hodisalar jurnali qurilmada qoladi va veb audit APIga yuborilmaydi. Bu tavsif ilovaning barcha ma’lumotlariga emas, jurnalga tegishli.'],
  ['Журнал событий', 'Activity log', 'Hodisalar jurnali'],
  ['Хранится локально', 'Stored locally', 'Mahalliy saqlanadi'],
  ['Веб audit API', 'Web audit API', 'Veb audit API'],
  ['Журнал не отправляется', 'The log is not sent', 'Jurnal yuborilmaydi'],
  ['Область описания', 'Description scope', 'Tavsif doirasi'],
  ['Проверенная версия клиента', 'Reviewed client version', 'Ko‘rib chiqilgan mijoz versiyasi'],
  ['Телеметрия, которая движется только по явному согласию.', 'Telemetry moves only with explicit consent.', 'Telemetriya faqat aniq rozilik bilan uzatiladi.'],
  ['Счётчики, сообщённые клиентом', 'Client-reported counters', 'Mijoz yuborgan hisoblagichlar'],
  ['Смотреть устройства', 'View devices', 'Qurilmalarni ko‘rish'],
  ['Путь данных', 'Data path', 'Ma’lumotlar oqimi'],
  ['Схема обмена Android-отчётом и локального хранения журнала iOS', 'Android reports and the locally stored iOS log', 'Android hisobotlari va mahalliy saqlanadigan iOS jurnali'],
  ['Приём отчётов Android после согласия', 'Android reports received after consent', 'Rozilikdan so‘ng Android hisobotlarini qabul qilish'],
  ['Веб API принимает клиентские события и счётчики. iOS пока сохраняет журнал локально.', 'The web API accepts client events and counters. iOS currently keeps its log on-device.', 'Veb API mijoz hodisalari va hisoblagichlarini qabul qiladi. iOS jurnali hozircha qurilmada saqlanadi.'],
  ['↻ Анимированная схема', '↻ Animated schematic', '↻ Animatsion sxema'],
  ['Счётчики, сообщённые клиентом', 'Client-reported counters', 'Mijoz yuborgan hisoblagichlar'],
  ['Согласие и отчёт', 'Consent and report', 'Rozilik va hisobot'],
  ['Android отправляет веб-аудит только после согласия пользователя.', 'Android sends web-audit reports only after user consent.', 'Android veb audit hisobotlarini faqat foydalanuvchi roziligidan so‘ng yuboradi.'],
  ['Поля события', 'Event fields', 'Hodisa maydonlari'],
  ['JSON-отчёт может включать ID установки, модель, экран, действие, детали, время и клиентские счётчики.', 'A JSON report may include an installation ID, model, screen, action, details, time, and client-reported counters.', 'JSON hisobotda o‘rnatish IDsi, model, ekran, amal, tafsilotlar, vaqt va mijoz hisoblagichlari bo‘lishi mumkin.'],
  ['Открытая часть показывает агрегированные числа, а не подробные записи устройства.', 'The public view shows aggregate counts, not detailed device records.', 'Ochiq qism qurilmaning batafsil yozuvlarini emas, umumiy sonlarni ko‘rsatadi.'],
  ['Доступ владельца', 'Owner access', 'Egaga kirish'],
  ['Подробные записи доступны после проверки Cloudflare Access и email владельца.', 'Detailed records are available after Cloudflare Access and owner-email verification.', 'Batafsil yozuvlar Cloudflare Access va egasining emaili tekshirilgandan so‘ng ochiladi.'],
  ['Изученная версия приложения iOS сохраняет события на устройстве; веб-аудит их не получает.', 'The reviewed iOS app stores events on-device; web audit does not receive them.', 'Ko‘rib chiqilgan iOS ilovasi hodisalarni qurilmada saqlaydi; veb audit ularni olmaydi.'],
  ['Android отправляет отчёт только после согласия.', 'Android sends reports only after consent.', 'Android hisobotni faqat rozilikdan so‘ng yuboradi.'],
  ['Мониторинг радиоэфира', 'View reported cellular data', 'Yuborilgan mobil tarmoq ma’lumotlari'],
  ['Центр загрузки клиентов', 'Client downloads', 'Mijoz ilovalarini yuklab olish'],
  ['Xylen объединяет Android-клиент и веб-панель для просмотра событий приложения и счётчиков сотовой загрузки, которые клиент отправил с согласия пользователя.', 'Xylen combines an Android client and a web console for reviewing app events and cellular counters submitted with the user’s consent.', 'Xylen Android mijozi va veb panelini birlashtiradi: ular foydalanuvchi roziligi bilan yuborilgan ilova hodisalari va mobil hisoblagichlarni ko‘rsatadi.'],
  ['Конфиденциальность', 'Privacy', 'Maxfiylik'],
  ['Навигация приложения', 'App navigation', 'Ilova navigatsiyasi'],
  ['Навигация', 'Navigation', 'Navigatsiya'],
  ['XYLEN SIM-ПЛАТФОРМА', 'XYLEN SIM PLATFORM', 'XYLEN SIM platformasi'],
  ['Обновить сводку', 'Refresh summary', 'Jamlanmani yangilash'],
  ['Сводные показатели', 'Summary metrics', 'Jamlanma ko‘rsatkichlari'],
  ['Быстрый переход', 'Quick links', 'Tezkor havolalar'],
  ['Масштаб интерфейса', 'Interface scale', 'Interfeys masshtabi'],
  ['XYLEN / ПОЛЕВЫЕ ЗАМЕТКИ', 'XYLEN / FIELD NOTES', 'XYLEN / MAYDON QAYDLARI'],
  ['ПРИНЦИПЫ ДАННЫХ', 'DATA CHARTER', 'MA’LUMOTLAR NIZOMI'],
  ['ЗАМЕТКА О ДАННЫХ 01—05', 'DATA NOTE 01—05', 'MA’LUMOT QAYDI 01—05'],
  ['ЛОКАЛЬНЫЙ ЖУРНАЛ', 'LOCAL LOG', 'MAHALLIY JURNAL'],
  ['УПРАВЛЕНИЕ', 'MANAGEMENT', 'BOSHQARUV'],
  ['Тихое движение', 'Silent Motion', 'Jimjit harakat'],
  ['ТИХОЕ ДВИЖЕНИЕ', 'SILENT MOTION', 'JIMJIT HARAKAT'],
  ['ОТЧЁТ КЛИЕНТА', 'CLIENT REPORT', 'MIJOZ HISOBOTI'],
  ['Недавно передавал отчёт', 'Recently reported', 'Yaqinda hisobot yuborgan'],
  ['Нет недавнего отчёта', 'No recent report', 'Yaqinda hisobot yo‘q'],
  ['Humo (местная карта)', 'Humo (Local UZ)', 'Humo (mahalliy karta)'],
  ['Mastercard (международная)', 'Mastercard (Global)', 'Mastercard (xalqaro)'],
  ['Способы поддержки', 'Support methods', 'Qo‘llab-quvvatlash usullari'],
  ['Скопировать номер', 'Copy number', 'Raqamni nusxalash'],
  ['Обновить сейчас', 'Refresh now', 'Hozir yangilash'],
  ['Меню, языки и тема', 'Menu, language, and theme', 'Menyu, til va mavzu'],
  ['Открыть меню', 'Open menu', 'Menyuni ochish'],
  ['Наверх', 'Back to top', 'Yuqoriga'],
  ['Xylen Workspace • Наверх', 'Xylen Workspace • Back to top', 'Xylen Workspace • Yuqoriga'],
  ['РАДИОЭФИР В РЕАЛЬНОМ ВРЕМЕНИ', 'REAL-TIME RADIO ACTIVITY', 'RADIOEFIRDA REAL VAQTDAGI FAOLLIK']
];

const INLINE_COPY_BY_VALUE = new Map();
INLINE_COPY.forEach(copy => copy.forEach(value => INLINE_COPY_BY_VALUE.set(String(value).replace(/\s+/g, ' ').trim(), copy)));
const INLINE_COPY_LANG_INDEX = { ru: 0, en: 1, uz: 2 };

class I18nManager {
  constructor() {
    this.currentLang = this.getSavedLang();
      this.inlineCopyNodes = new WeakMap();
      this.inlineCopyAttributes = new WeakMap();
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

  applyTranslations(root = document.documentElement) {
    document.documentElement.lang = this.currentLang;
    const elements = Array.from(root.querySelectorAll('[data-i18n]'));
    if (root.nodeType === Node.ELEMENT_NODE && root.matches('[data-i18n]')) elements.unshift(root);
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      if (text) {
        if (el.tagName === 'INPUT' && el.placeholder) {
          if (el.placeholder !== text) el.placeholder = text;
        } else if (el.textContent !== text) {
          el.textContent = text;
        }
      }
    });

    const attrElements = Array.from(root.querySelectorAll('[data-i18n-attr]'));
    if (root.nodeType === Node.ELEMENT_NODE && root.matches('[data-i18n-attr]')) attrElements.unshift(root);
    attrElements.forEach(el => {
      el.getAttribute('data-i18n-attr').split(';').forEach(binding => {
        const config = binding.trim().split(':');
        if (config.length === 2) {
          const attr = config[0];
          const key = config[1];
          const text = this.t(key);
          if (el.getAttribute(attr) !== text) el.setAttribute(attr, text);
        }
      });
    });
    this.applyInlineTranslations(root);
  }

  applyInlineTranslations(root) {
    const normalize = value => String(value || '').replace(/\s+/g, ' ').trim();
    const textWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let textNode;
    while ((textNode = textWalker.nextNode())) {
      const element = textNode.parentElement;
      if (!element || element.closest('script,style,template,textarea,pre,code,[data-i18n]')) continue;
      const source = normalize(textNode.nodeValue);
      const previous = this.inlineCopyNodes.get(textNode);
      const previousValue = previous && previous.copy[INLINE_COPY_LANG_INDEX[previous.lang]];
      const copy = previous && normalize(previousValue) === source
        ? previous.copy
        : INLINE_COPY_BY_VALUE.get(source);
      if (!copy) continue;
      this.inlineCopyNodes.set(textNode, { copy, lang: this.currentLang });
      const translated = copy[INLINE_COPY_LANG_INDEX[this.currentLang]];
      if (!translated || source === normalize(translated)) continue;
      const raw = textNode.nodeValue || '';
      const leading = raw.match(/^\s*/)?.[0] || '';
      const trailing = raw.match(/\s*$/)?.[0] || '';
      textNode.nodeValue = leading + translated + trailing;
    }

    const attributes = ['aria-label', 'aria-description', 'title', 'placeholder', 'alt', 'value', 'content'];
    const elements = [];
    if (root.nodeType === Node.ELEMENT_NODE) elements.push(root);
    elements.push(...root.querySelectorAll('*'));
    elements.forEach(element => {
      attributes.forEach(attribute => {
        if (!element.hasAttribute(attribute)) return;
        const value = element.getAttribute(attribute);
        let previousAttributes = this.inlineCopyAttributes.get(element);
        const previous = previousAttributes?.get(attribute);
        const previousValue = previous && previous.copy[INLINE_COPY_LANG_INDEX[previous.lang]];
        const normalizedValue = normalize(value);
        const copy = previous && normalize(previousValue) === normalizedValue
          ? previous.copy
          : INLINE_COPY_BY_VALUE.get(normalizedValue);
        if (copy) {
          const translated = copy[INLINE_COPY_LANG_INDEX[this.currentLang]];
          if (!previousAttributes) {
            previousAttributes = new Map();
            this.inlineCopyAttributes.set(element, previousAttributes);
          }
          previousAttributes.set(attribute, { copy, lang: this.currentLang });
          if (translated && normalizedValue !== normalize(translated)) element.setAttribute(attribute, translated);
        }
      });
    });
  }

  observeDynamicCopy() {
    if (!document.body || !('MutationObserver' in window)) return;
    let scheduled = false;
    const pending = new Set();
    const observer = new MutationObserver(records => {
      records.forEach(record => {
        if (record.type === 'attributes' || record.type === 'characterData') {
          if (record.target.nodeType === Node.ELEMENT_NODE) pending.add(record.target);
          else if (record.target.parentElement) pending.add(record.target.parentElement);
        }
        record.addedNodes?.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) pending.add(node);
          else if (node.parentElement) pending.add(node.parentElement);
        });
      });
      if (scheduled || !pending.size) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        const roots = Array.from(pending);
        pending.clear();
        roots.forEach(root => this.applyTranslations(root));
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['aria-label', 'aria-description', 'title', 'placeholder', 'alt', 'value', 'content'] });
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
    this.observeDynamicCopy();

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-text-btn[data-lang]');
      if (btn) {
        this.setLang(btn.dataset.lang);
      }
    });
  }
}

window.i18n = new I18nManager();
