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
    kpi_traffic_sub: "счётчики из Android-отчётов",
    kpi_speed: "Скорость из отчёта",
    kpi_speed_sub: "сайт не измеряет радиоэфир",

    // Stack Feature Section (Jitter Style)
    stack_title: "Архитектура контроля телеметрии",
    stack_sub: "Путь согласованного Android-отчёта: от решения пользователя до агрегированной сводки и защищённого просмотра.",
    stack_card1_tag: "Поля Android-отчёта",
    stack_card1_title: "Счётчики, которые сообщает клиент",
    stack_card1_desc: "Android может передать приложению доступные ему мобильные счётчики, оператора и сведения о SIM-профиле. Это данные отчёта на момент его формирования, а не прямое чтение радиомодема, вышек или уровня сигнала.",
    stack_card1_fact1: "Доступные поля SIM / eSIM",
    stack_card1_fact2: "Параметры радиосигнала не передаются",
    stack_card1_fact3: "Сетевой интерфейс не проверяется",
    stack_card1_media: "Иллюстрация интерфейса",
    stack_card2_media: "Отчёт отправлен клиентом",
    
    stack_card2_tag: "Путь отчёта",
    stack_card2_title: "Передача после согласия",
    stack_card2_desc: "После согласия Android-клиент отправляет JSON-отчёт в веб API. Доставка зависит от сети и доступности сервиса; специальный размер пакета, собственный протокол сжатия и работу без задержек проект не заявляет.",
    stack_card2_fields: "ПОЛЯ JSON-ОТЧЁТА",
    stack_card2_condition_label: "Условие:",
    stack_card2_condition_value: "согласие",
    stack_card2_format_label: "Формат:",
    stack_card2_public_label: "Публичный вид:",
    stack_card2_public_value: "агрегаты",
    connect_title: "Шлюз приёма мобильных клиентов Xylen",
    connect_desc: "Android отправляет отчёты только после согласия. Изученный исходный код iOS хранит журнал на устройстве.",
    connect_android: "Android-клиент",
    connect_ios: "iOS-клиент",
    
    stack_card3_tag: "Сводка без домыслов",
    stack_card3_title: "Присланные данные — в понятном виде",
    stack_card3_desc: "Публичная страница показывает доступные агрегаты по полученным отчётам. Она не сверяет показания с биллингом оператора, не подтверждает точность клиентских счётчиков и не обещает предотвратить списания.",
    stack_card3_fact1: "География не измеряется",
    stack_card3_fact2: "Счётчик сообщает клиент",
    stack_card3_fact3: "Сверки с биллингом нет",
    stack_card3_media: "Декоративная иллюстрация",

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
    devices_status_online: "Online (В эфире)",
    devices_status_offline: "Offline",
    devices_btn_inspect: "Инспектор телеметрии ➔",
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
    kpi_traffic_sub: "Android hisobotlaridagi hisoblagichlar",
    kpi_speed: "Hisobotdagi tezlik",
    kpi_speed_sub: "sayt radioefirni o‘lchamaydi",

    // Stack Feature Section (Jitter Style)
    stack_title: "Telemetriyani boshqarish arxitekturasi",
    stack_sub: "Rozilik asosidagi Android hisoboti yo‘li: foydalanuvchi qaroridan umumiy xulosa va himoyalangan ko‘rishgacha.",
    stack_card1_tag: "Android hisobot maydonlari",
    stack_card1_title: "Mijoz yuborgan hisoblagichlar",
    stack_card1_desc: "Android ilovasi mavjud mobil trafik hisoblagichlari, operator va SIM-profil haqidagi ma’lumotlarni yuborishi mumkin. Bu hisobot olingan paytdagi mijoz ma’lumotlari; radio modem, baza stansiyalari yoki signalni bevosita o‘qish emas.",
    stack_card1_fact1: "Mavjud SIM / eSIM maydonlari",
    stack_card1_fact2: "Radio signal qiymatlari yuborilmaydi",
    stack_card1_fact3: "Tarmoq interfeysi tekshirilmaydi",
    stack_card1_media: "Interfeys tasviri",
    stack_card2_media: "Hisobot mijoz tomonidan yuborilgan",
    
    stack_card2_tag: "Hisobot yo‘li",
    stack_card2_title: "Yuborish rozilikdan so‘ng",
    stack_card2_desc: "Foydalanuvchi rozilik bergach, Android mijozi JSON hisobotini veb API’ga yuboradi. Yetkazish tarmoq va xizmat mavjudligiga bog‘liq; loyiha maxsus paket hajmi, siqish protokoli yoki kechikishsiz ishlashni va’da qilmaydi.",
    stack_card2_fields: "JSON HISOBOTI MAYDONLARI",
    stack_card2_condition_label: "Shart:",
    stack_card2_condition_value: "rozilik",
    stack_card2_format_label: "Format:",
    stack_card2_public_label: "Ochiq ko‘rinish:",
    stack_card2_public_value: "jamlanma",
    connect_title: "Xylen mobil mijozlarini qabul qilish shlyuzi",
    connect_desc: "Android hisobotlarni faqat rozilikdan so‘ng yuboradi. Ko‘rib chiqilgan iOS manba kodi jurnalni qurilmada saqlaydi.",
    connect_android: "Android mijozi",
    connect_ios: "iOS mijozi",
    
    stack_card3_tag: "Taxminsiz jamlanma",
    stack_card3_title: "Yuborilgan ma’lumotlar tushunarli shaklda",
    stack_card3_desc: "Ochiq sahifa olingan hisobotlardagi mavjud jamlanma qiymatlarni ko‘rsatadi. U operator billingini tekshirmaydi, mijoz hisoblagichlari aniqligini tasdiqlamaydi va kutilmagan to‘lovlarning oldini olishni va’da qilmaydi.",
    stack_card3_fact1: "Geografiya o‘lchanmaydi",
    stack_card3_fact2: "Hisoblagichni mijoz yuboradi",
    stack_card3_fact3: "Billing bilan solishtirilmaydi",
    stack_card3_media: "Dekorativ tasvir",

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
    devices_status_online: "Online (Efirda)",
    devices_status_offline: "Offline",
    devices_btn_inspect: "Telemetriya inspektori ➔",
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
    kpi_traffic_sub: "counters from Android reports",
    kpi_speed: "Speed in report",
    kpi_speed_sub: "the site does not measure radio activity",

    // Stack Feature Section (Jitter Style)
    stack_title: "Telemetry Control Architecture",
    stack_sub: "The consent-based Android report path, from the user's choice to an aggregated summary and access-controlled details.",
    stack_card1_tag: "Android Report Fields",
    stack_card1_title: "Counters reported by the client",
    stack_card1_desc: "The Android app can send available mobile counters, carrier details, and SIM-profile information. These are client-reported values from when a report is created, not direct readings from the radio modem, cell towers, or signal strength.",
    stack_card1_fact1: "Available SIM / eSIM fields",
    stack_card1_fact2: "Radio signal values are not sent",
    stack_card1_fact3: "Network interface is not verified",
    stack_card1_media: "Interface illustration",
    stack_card2_media: "Report sent by client",
    
    stack_card2_tag: "Report Path",
    stack_card2_title: "Sent after consent",
    stack_card2_desc: "After consent, the Android client sends a JSON report to the web API. Delivery depends on network and service availability; the project does not claim a fixed packet size, a custom compression protocol, or delay-free delivery.",
    stack_card2_fields: "JSON REPORT FIELDS",
    stack_card2_condition_label: "Condition:",
    stack_card2_condition_value: "consent",
    stack_card2_format_label: "Format:",
    stack_card2_public_label: "Public view:",
    stack_card2_public_value: "aggregates",
    connect_title: "Xylen mobile client gateway",
    connect_desc: "Android sends reports only after consent. The reviewed iOS source code keeps its activity log on-device.",
    connect_android: "Android client",
    connect_ios: "iOS client",
    
    stack_card3_tag: "A summary without assumptions",
    stack_card3_title: "Reported data, made readable",
    stack_card3_desc: "The public page displays available aggregates from received reports. It does not compare readings with carrier billing, independently validate client counters, or promise to prevent charges.",
    stack_card3_fact1: "Geography is not measured",
    stack_card3_fact2: "Counter is reported by client",
    stack_card3_fact3: "Not reconciled with carrier billing",
    stack_card3_media: "Decorative illustration",

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
    devices_status_online: "Online (On Air)",
    devices_status_offline: "Offline",
    devices_btn_inspect: "Telemetry Inspector ➔",
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
