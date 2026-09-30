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
    about_p2: "Android-клиент написан на Kotlin и Jetpack Compose. После согласия он передаёт в веб API поля, перечисленные в описании состава отчёта; состав отчёта зависит от приложения, устройства и версии Android.",
    about_p3: "Веб API принимает отчёты через Cloudflare Pages Functions. Публичная точка API возвращает агрегированные значения, а подробные записи доступны после проверки Cloudflare Access. Постоянное хранение зависит от настройки Cloudflare KV.",
    about_p4: "Сводки мобильного трафика основаны на счётчиках, которые сообщает клиент. Сайт не получает CID/TAC или измерения радиосигнала и не подтверждает точность показаний оператора.",

    // Privacy
    privacy_hero_title: "Конфиденциальность",
    privacy_hero_sub: "Техническое описание потока данных Xylen. Применимость требований и основания обработки определяет оператор платформы.",
    privacy_badge_uz: "СОСТАВ ОТЧЁТА",
    privacy_badge_uk: "ДОСТУП И ХРАНЕНИЕ",
    privacy_p1: "После согласия Android передаёт ID установки, модель, имя тестировщика, экран, действие и детали, оператора, временную отметку, состояние, дневные и сессионные счётчики, а также активные или использованные сегодня SIM-профили.",
    privacy_p2: "Веб audit API не получает номер телефона, ICCID, IMSI, идентификаторы вышек или измерения радиосигнала. Изученный исходный код iOS хранит журнал на устройстве и не отправляет его в этот веб API.",
    privacy_p3: "Публичная точка API возвращает только агрегированные сведения. Подробные записи защищены проверкой Cloudflare Access и совпадением адреса электронной почты владельца; постоянное хранение зависит от настройки Cloudflare KV.",
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
    about_p2: "Android mijozi Kotlin va Jetpack Compose-da yozilgan. Rozilikdan so‘ng u hisobot tarkibi tavsifida ko‘rsatilgan maydonlarni veb APIga yuboradi; hisobot tarkibi ilova, qurilma va Android versiyasiga bog‘liq.",
    about_p3: "Veb API hisobotlarni Cloudflare Pages Functions orqali qabul qiladi. Ochiq API manzili umumlashtirilgan qiymatlarni qaytaradi, batafsil yozuvlar esa Cloudflare Access orqali cheklanadi. Doimiy saqlash Cloudflare KV sozlamasiga bog‘liq.",
    about_p4: "Mobil trafik jamlanmalari mijoz yuborgan hisoblagichlarga asoslanadi. Sayt CID/TAC yoki radio o‘lchovlarini olmaydi va operator ko‘rsatkichlarining aniqligini tasdiqlamaydi.",

    // Privacy
    privacy_hero_title: "Maxfiylik",
    privacy_hero_sub: "Xylen ma’lumotlar oqimining texnik tavsifi. Qo‘llanadigan talablar va qayta ishlash asoslarini platforma operatori belgilaydi.",
    privacy_badge_uz: "HISOBOT TARKIBI",
    privacy_badge_uk: "KIRISH VA SAQLASH",
    privacy_p1: "Rozilikdan so‘ng Android o‘rnatish IDsi, model, sinovchi ismi, ekran, amal va tafsilot, operator, vaqt, holat, kunlik va sessiya hisoblagichlari hamda faol yoki bugun ishlatilgan SIM profillarini yuboradi.",
    privacy_p2: "Veb audit API telefon raqami, ICCID, IMSI, baza stansiyasi IDlari yoki radio o‘lchovlarini olmaydi. Ko‘rib chiqilgan iOS kodi jurnalni qurilmada saqlaydi va ushbu veb APIga yubormaydi.",
    privacy_p3: "Ochiq API manzili faqat umumiy ma’lumotlarni qaytaradi. Batafsil yozuvlar Cloudflare Access tekshiruvi va loyiha egasining elektron pochta manzili mosligi bilan himoyalangan; doimiy saqlash Cloudflare KV sozlamasiga bog‘liq.",
    privacy_p4: "Server jurnali oxirgi 200 hodisa bilan cheklangan, qurilmaning so‘nggi yozuvi operator o‘chirmaguncha saqlanadi. Rozilikni bekor qilish keyingi yuborishni to‘xtatadi, avvalgi yozuvlarni o‘chirmaydi.",
    privacy_law_uz_title: "Ma’lumot uzatish tavsifi",
    privacy_law_uz_desc: "Bu sahifa veb API maydonlari va ishlashini tasvirlaydi. U qonuniy muvofiqlikni tasdiqlamaydi va platforma operatori belgilaydigan ma’lumotlarni qayta ishlash siyosatini almashtirmaydi.",
    privacy_law_uk_title: "Yozuvlarni saqlash va ularga kirish",
    privacy_law_uk_desc: "Batafsil yozuvlar Cloudflare Access orqali cheklanadi. Doimiy saqlash Cloudflare KV sozlamasiga bog‘liq; o‘chirish muddati va murojaat tartibini platforma operatori belgilaydi.",

    // Admin
    admin_auth_title: "Bosh menejer konsoli",
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

const EXTRA_TRANSLATIONS = {
  ru: {
    page_title: 'Xylen Platform • Сводка мобильных отчётов',
    page_description: 'Xylen Platform: сводка отчётов Android, клиентских сетевых счётчиков и событий приложения.',
    drawer_open: 'Открыть меню', nav_aria: 'Разделы Xylen', menu_title: 'Настройки', drawer_close: 'Закрыть меню',
    settings_language: 'Язык интерфейса', settings_theme: 'Режим оформления',
    theme_current_light: 'Светлая тема', theme_current_dark: 'Тёмная тема',
    brand_platform: 'Xylen Platform', brand_management: 'Xylen Management',
    about_field_notes: 'ПОЛЕВЫЕ ЗАМЕТКИ', about_data_charter: 'ПАСПОРТ ДАННЫХ', about_data_note: 'ЗАПИСКА О ДАННЫХ', about_end: 'КОНЕЦ',
    release_client_label: 'КЛИЕНТ', release_clients_label: 'КЛИЕНТЫ',
    gatekeeper_badge: 'Приватный прототип',
    gatekeeper_desc: 'Портал проходит закрытое тестирование. Просмотр доступен по персональной пригласительной ссылке владельца проекта.',
    gatekeeper_placeholder: 'Введите ключ доступа…', gatekeeper_submit: 'Разблокировать доступ',
    gatekeeper_footnote: 'Если вы открыли специальную ссылку с ключом, сайт разблокируется автоматически.',
    gatekeeper_error: 'Неверный ключ доступа. Попробуйте снова.',
    gatekeeper_logout: 'Выйти из защищённого режима',
    qr_install_title: 'QR-код для установки', pairing_token_created: 'Создан новый ключ сопряжения',
    video_heading_1: 'Согласие', video_heading_2: 'Поля отчёта', video_heading_3: 'Сводка', video_heading_4: 'Доступ владельца', video_heading_5: 'Журнал iOS',
    video_caption_1: 'Android отправляет отчёт только после согласия пользователя.',
    video_caption_2: 'Клиент передаёт доступные поля события и счётчики.',
    video_caption_3: 'Сводка включает только полученные отчёты.',
    video_caption_4: 'Для подробных записей нужна проверка владельца.',
    video_caption_5: 'Проверенный журнал iOS остаётся на устройстве.',
    video_index_1: 'ЭТАП 01 / 05', video_index_2: 'ЭТАП 02 / 05', video_index_3: 'ЭТАП 03 / 05', video_index_4: 'ЭТАП 04 / 05', video_index_5: 'ЭТАП 05 / 05',
    video_play_tag: '↻ Анимированная схема',
    mod1_badge: '01 • Согласие', mod2_badge: '02 • Отчёт', mod3_badge: '03 • Сводка', mod4_badge: '04 • Доступ', mod5_badge: '05 • iOS'
  },
  uz: {
    page_title: 'Xylen Platform • Mobil hisobotlar jamlanmasi',
    page_description: 'Xylen Platform: Android hisobotlari, mijoz yuborgan tarmoq hisoblagichlari va ilova hodisalari jamlanmasi.',
    drawer_open: 'Menyuni ochish', nav_aria: 'Xylen bo‘limlari', menu_title: 'Sozlamalar', drawer_close: 'Menyuni yopish',
    settings_language: 'Interfeys tili', settings_theme: 'Ko‘rinish rejimi',
    theme_current_light: 'Yorug‘ mavzu', theme_current_dark: 'Qorong‘i mavzu',
    brand_platform: 'Xylen Platform', brand_management: 'Xylen Management',
    about_field_notes: 'QAYDLAR', about_data_charter: 'MA’LUMOTLAR NIZOMI', about_data_note: 'MA’LUMOT HAQIDA', about_end: 'YAKUN',
    release_client_label: 'MIJOZ', release_clients_label: 'MIJOZLAR',
    gatekeeper_badge: 'Yopiq sinov versiyasi',
    gatekeeper_desc: 'Portal yopiq sinovdan o‘tmoqda. Uni loyiha egasining shaxsiy taklif havolasi orqali ko‘rish mumkin.',
    gatekeeper_placeholder: 'Kirish kalitini kiriting…', gatekeeper_submit: 'Kirishni ochish',
    gatekeeper_footnote: 'Maxsus kalitli havolani ochsangiz, sayt avtomatik ravishda ochiladi.',
    gatekeeper_error: 'Kirish kaliti noto‘g‘ri. Qayta urinib ko‘ring.',
    gatekeeper_logout: 'Himoyalangan rejimdan chiqish',
    qr_install_title: 'O‘rnatish uchun QR-kod', pairing_token_created: 'Yangi ulash kaliti yaratildi',
    video_heading_1: 'Rozilik', video_heading_2: 'Hisobot maydonlari', video_heading_3: 'Jamlanma', video_heading_4: 'Ega kirishi', video_heading_5: 'iOS jurnali',
    video_caption_1: 'Android hisobotni faqat foydalanuvchi roziligidan keyin yuboradi.',
    video_caption_2: 'Mijoz mavjud hodisa maydonlari va hisoblagichlarni yuboradi.',
    video_caption_3: 'Jamlanma faqat qabul qilingan hisobotlarni qamrab oladi.',
    video_caption_4: 'Batafsil yozuvlar uchun egani tekshirish talab qilinadi.',
    video_caption_5: 'Ko‘rib chiqilgan iOS jurnali qurilmada qoladi.',
    video_index_1: 'BOSQICH 01 / 05', video_index_2: 'BOSQICH 02 / 05', video_index_3: 'BOSQICH 03 / 05', video_index_4: 'BOSQICH 04 / 05', video_index_5: 'BOSQICH 05 / 05',
    video_play_tag: '↻ Animatsion sxema',
    mod1_badge: '01 • Rozilik', mod2_badge: '02 • Hisobot', mod3_badge: '03 • Jamlanma', mod4_badge: '04 • Kirish', mod5_badge: '05 • iOS'
  },
  en: {
    page_title: 'Xylen Platform • Mobile report summary',
    page_description: 'Xylen Platform: summaries of Android reports, client-reported network counters, and app events.',
    drawer_open: 'Open menu', nav_aria: 'Xylen sections', menu_title: 'Settings', drawer_close: 'Close menu',
    settings_language: 'Interface language', settings_theme: 'Appearance',
    theme_current_light: 'Light theme', theme_current_dark: 'Dark theme',
    brand_platform: 'Xylen Platform', brand_management: 'Xylen Management',
    about_field_notes: 'FIELD NOTES', about_data_charter: 'DATA CHARTER', about_data_note: 'DATA NOTE', about_end: 'END',
    release_client_label: 'CLIENT', release_clients_label: 'CLIENTS',
    gatekeeper_badge: 'Private prototype',
    gatekeeper_desc: 'This portal is in closed testing. View it with a personal invitation link from the project owner.',
    gatekeeper_placeholder: 'Enter access key…', gatekeeper_submit: 'Unlock access',
    gatekeeper_footnote: 'Open a special link with a key to unlock the site automatically.',
    gatekeeper_error: 'The access key is incorrect. Try again.',
    gatekeeper_logout: 'Exit protected mode',
    qr_install_title: 'QR code for installation', pairing_token_created: 'New pairing key generated',
    video_heading_1: 'Consent', video_heading_2: 'Report fields', video_heading_3: 'Summary', video_heading_4: 'Owner access', video_heading_5: 'iOS activity log',
    video_caption_1: 'Android sends a report only after the user gives consent.',
    video_caption_2: 'The client sends available event fields and counters.',
    video_caption_3: 'The summary includes received reports only.',
    video_caption_4: 'Detailed records require owner verification.',
    video_caption_5: 'The reviewed iOS activity log stays on-device.',
    video_index_1: 'STEP 01 / 05', video_index_2: 'STEP 02 / 05', video_index_3: 'STEP 03 / 05', video_index_4: 'STEP 04 / 05', video_index_5: 'STEP 05 / 05',
    video_play_tag: '↻ Animated schematic',
    mod1_badge: '01 • Consent', mod2_badge: '02 • Report', mod3_badge: '03 • Summary', mod4_badge: '04 • Access', mod5_badge: '05 • iOS'
  }
};

const INLINE_COPY = [
  ['Приватный прототип', 'Yopiq sinov versiyasi', 'Private prototype'],
  ['Данный портал находится в стадии закрытого тестирования. Просмотр доступен только по персональной пригласительной ссылке владельца проекта.', 'Portal yopiq sinovdan o‘tmoqda. Uni loyiha egasining shaxsiy taklif havolasi orqali ko‘rish mumkin.', 'This portal is in closed testing. View it with a personal invitation link from the project owner.'],
  ['Если вы перешли по специальной ссылке с ключом, сайт откроется автоматически.', 'Maxsus kalitli havolani ochsangiz, sayt avtomatik ravishda ochiladi.', 'Open a special link with a key to unlock the site automatically.'],
  ['Введите ключ доступа...', 'Kirish kalitini kiriting…', 'Enter access key…'],
  ['Разблокировать доступ', 'Kirishni ochish', 'Unlock access'],
  ['Выйти из защищённого режима', 'Himoyalangan rejimdan chiqish', 'Exit protected mode'],
  ['Язык интерфейса / Til / Language', 'Interfeys tili', 'Interface language'],
  ['Режим оформления', 'Ko‘rinish rejimi', 'Appearance'],
  ['Настройки', 'Sozlamalar', 'Settings'],
  ['Меню сайта', 'Sayt menyusi', 'Site menu'],
  ['Закрыть меню', 'Menyuni yopish', 'Close menu'],
  ['Заблокировать доступ / Выйти', 'Kirishni yopish / Chiqish', 'Lock access / Sign out'],
  ['Выйти', 'Chiqish', 'Sign out'],
  ['Назад', 'Orqaga', 'Back'], ['Вперед', 'Oldinga', 'Next'],
  ['Открыть меню', 'Menyuni ochish', 'Open menu'],
  ['Прямой съём с радиочипа', 'Radio chipidan bevosita olish', 'Direct read from the radio chip'],
  ['События приложения', 'Ilova hodisalari', 'App events'],
  ['Доступ владельца', 'Ega kirishi', 'Owner access'],
  ['Журнал iOS', 'iOS jurnali', 'iOS activity log'],
  ['Сайт получает от Android разрешённые операторские сведения и сотовые счётчики, но не параметры сигнала или вышки.', 'Sayt Android yuborgan operator ma’lumotlari va mobil hisoblagichlarni oladi, ammo signal yoki baza stansiyasi parametrlarini olmaydi.', 'The site receives carrier details and cellular counters reported by Android, but no signal or cell-tower measurements.'],
  ['После согласия Android отправляет события и счётчики в JSON-отчётах.', 'Rozilikdan so‘ng Android hodisalar va hisoblagichlarni JSON hisobotlarida yuboradi.', 'After consent, Android sends events and counters in JSON reports.'],
  ['Подробные отчёты доступны владельцу после проверки Cloudflare Access.', 'Batafsil hisobotlar Cloudflare Access tekshiruvidan keyin egasiga ochiladi.', 'Detailed reports are available to the owner after Cloudflare Access verification.'],
  ['Изученный исходный код iOS хранит журнал на устройстве и не отправляет его в веб API.', 'Ko‘rib chiqilgan iOS kodi jurnalni qurilmada saqlaydi va veb APIga yubormaydi.', 'The reviewed iOS source stores its activity log on-device and does not send it to the web API.'],
  ['ЭТАП СОГЛАСИЯ', 'ROZILIK BOSQICHI', 'CONSENT GATE'],
  ['XYLEN / ANDROID', 'XYLEN / ANDROID', 'XYLEN / ANDROID'],
  ['СОГЛАСИЕ ПОЛЬЗОВАТЕЛЯ', 'FOYDALANUVCHI ROZILIGI', 'USER CONSENT'],
  ['ГОТОВНОСТЬ К ПЕРЕДАЧЕ', 'UZATISHGA TAYYOR', 'TRANSMISSION READY'],
  ['ОТЧЁТ ANDROID', 'ANDROID HISOBOTI', 'ANDROID REPORT'],
  ['ОТЧЁТ / JSON', 'HISOBOT / JSON', 'REPORT / JSON'],
  ['СОБЫТИЕ КЛИЕНТА', 'MIJOZ HODISASI', 'CLIENT EVENT'],
  ['СОБЫТИЕ', 'HODISA', 'EVENT'], ['СЧЁТЧИКИ', 'HISOBLAGICHLAR', 'COUNTERS'],
  ['ВЕБ API', 'VEB API', 'WEB API'], ['ПОЛУЧЕНО', 'QABUL QILINDI', 'RECEIVED'],
  ['ПУБЛИЧНАЯ СВОДКА', 'OCHIQ JAMLANMA', 'PUBLIC SUMMARY'],
  ['ОБЩАЯ СВОДКА', 'UMUMLASHTIRILGAN KO‘RINISH', 'AGGREGATE VIEW'],
  ['ТОЛЬКО НА УСТРОЙСТВЕ', 'FAQAT QURILMADA', 'ON-DEVICE ONLY'],
  ['ЛОКАЛЬНЫЙ ЖУРНАЛ ДЕЙСТВИЙ', 'MAHALLIY FAOLIYAT JURNALI', 'LOCAL ACTIVITY LOG'],
  ['НА ЭТОМ УСТРОЙСТВЕ', 'SHU QURILMADA', 'ON THIS DEVICE'],
  ['РАДИОЭФИР В РЕАЛЬНОМ ВРЕМЕНИ', 'JONLI RADIO EFIRI', 'LIVE RADIO ACTIVITY'],
  ['Всего тестировщиков', 'Sinovchilar jami', 'Total testers'],
  ['Сейчас в сети', 'Hozir tarmoqda', 'Online now'],
  ['Израсходовано за сегодня', 'Bugun sarflandi', 'Used today'],
  ['Зафиксировано действий', 'Qayd etilgan amallar', 'Actions recorded'],
  ['ПРЯМОЙ ПОТОК', 'JONLI OQIM', 'LIVE STREAM'],
  ['ДАННЫЕ МОБИЛЬНОЙ СЕТИ', 'MOBIL TARMOQ MA’LUMOTLARI', 'CELLULAR DATA'],
  ['Шаг 1', '1-bosqich', 'Step 1'], ['Шаг 2', '2-bosqich', 'Step 2'], ['Шаг 3', '3-bosqich', 'Step 3'], ['Шаг 4', '4-bosqich', 'Step 4'],
  ['XYLEN / ПЛАТФОРМА', 'XYLEN / PLATFORMA', 'XYLEN PLATFORM'],
  ['XYLEN / ПОЛЕВЫЕ ЗАМЕТКИ', 'XYLEN / QAYDLAR', 'XYLEN / FIELD NOTES'],
  ['ПАСПОРТ ДАННЫХ', 'MA’LUMOTLAR NIZOMI', 'DATA CHARTER'],
  ['XYLEN / ЗАПИСКА О ДАННЫХ 01—05', 'XYLEN / MA’LUMOT IZOHI 01—05', 'XYLEN / DATA NOTE 01—05'],
  ['Публичная сводка ≠ подробная запись', 'Ochiq jamlanma ≠ batafsil yozuv', 'Public summary ≠ detailed record'],
  ['Прозрачно по умолчанию.', 'Shaffoflik — asosiy tamoyil.', 'Transparent by design.'],
  ['КОНЕЦ / 04', 'YAKUN / 04', 'END / 04'],
  ['Android · клиентские отчёты', 'Android · mijoz hisobotlari', 'Android · client reports'],
  ['ПЕРЕД УСТАНОВКОЙ', 'O‘RNATISHDAN OLDIN', 'BEFORE INSTALLATION'],
  ['Три проверки. Никакой магии.', 'Uch tekshiruv. Asossiz va’da yo‘q.', 'Three checks. No magic claims.'],
  ['XYLEN / КЛИЕНТ', 'XYLEN / MIJOZ', 'XYLEN / CLIENT'],
  ['КЛИЕНТЫ XYLEN', 'XYLEN MIJOZLARI', 'XYLEN CLIENTS'],
  ['Время', 'Vaqt', 'Time'], ['Устройство / Узел', 'Qurilma / Tugun', 'Device / Node'],
  ['Категория', 'Turkum', 'Category'], ['Действие', 'Amal', 'Action'], ['Инженерные детали', 'Texnik tafsilotlar', 'Technical details'],
  ['Источник показаний:', 'Ko‘rsatkich manbasi:', 'Reading source:'],
  ['Android-клиент после согласия', 'Rozilikdan so‘ng Android mijozi', 'Android client after consent'],
  ['Приём отчёта:', 'Hisobotni qabul qilish:', 'Report intake:'],
  ['Веб API проекта', 'Loyiha veb API', 'Project web API'],
  ['Публичный ответ:', 'Ochiq javob:', 'Public response:'],
  ['Агрегированные значения', 'Umumlashtirilgan qiymatlar', 'Aggregated values'],
  ['Радиоизмерения:', 'Radio o‘lchovlari:', 'Radio measurements:'],
  ['В веб-отчёте не передаются', 'Veb hisobotda yuborilmaydi', 'Not sent in web reports'],
  ['Подробные записи:', 'Batafsil yozuvlar:', 'Detailed records:'],
  ['Доступ владельца через Cloudflare Access', 'Cloudflare Access orqali ega kirishi', 'Owner access through Cloudflare Access'],
  ['Доступ не настроен или эта учётная запись не является владельцем.', 'Kirish sozlanmagan yoki bu hisob loyiha egasiga tegishli emas.', 'Access is not configured, or this account is not the owner.'],
  ['Консоль закрыта. Завершите сеанс Cloudflare Access в браузере, если он больше не нужен.', 'Konsol yopildi. Endi kerak bo‘lmasa, brauzerdagi Cloudflare Access seansini ham yakunlang.', 'The console is closed. End your Cloudflare Access session in the browser if you no longer need it.'],
  ['Демонстрационные устройства отключены.', 'Namoyish qurilmalari o‘chirib qo‘yilgan.', 'Demo devices are disabled.'],
  ['Удаление устройств недоступно из публичной панели.', 'Ommaviy paneldan qurilmalarni o‘chirib bo‘lmaydi.', 'Device deletion is not available from the public panel.'],
  ['Узел удален из мониторинга.', 'Tugun kuzatuvdan olib tashlandi.', 'Node removed from monitoring.'],
  ['Все активные узлы удалены из мониторинга.', 'Barcha faol tugunlar kuzatuvdan olib tashlandi.', 'All active nodes were removed from monitoring.'],
  ['Успешная авторизация в консоли менеджера!', 'Menejer konsoliga muvaffaqiyatli kirdingiz!', 'Manager console sign-in successful!'],
  ['Вы вышли из консоли менеджера.', 'Menejer konsolidan chiqdingiz.', 'You signed out of the manager console.'],
  ['Ссылка скопирована в буфер обмена!', 'Havola buferga nusxalandi!', 'Link copied to clipboard!']
];

const INLINE_COPY_LOOKUP = new Map();
const normalizeInlineCopy = value => String(value || '').replace(/\s+/g, ' ').trim().toLocaleLowerCase();
INLINE_COPY.forEach(([ru, uz, en]) => {
  const copy = { ru, uz, en };
  [ru, uz, en].forEach(value => INLINE_COPY_LOOKUP.set(normalizeInlineCopy(value), copy));
});

class I18nManager {
  constructor() {
    this.currentLang = this.getSavedLang();
    this.init();
  }

  getSavedLang() {
    try {
      const saved = localStorage.getItem(I18N_STORAGE_KEY) || 'ru';
      return TRANSLATIONS[saved] ? saved : 'ru';
    } catch (error) {
      return 'ru';
    }
  }

  setLang(lang) {
    if (!TRANSLATIONS[lang]) return;
    this.currentLang = lang;
    try { localStorage.setItem(I18N_STORAGE_KEY, lang); } catch (error) {}
    this.applyTranslations();
    this.updateControls();
    window.dispatchEvent(new CustomEvent('xylen:lang-changed', { detail: lang }));
  }

  t(key) {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ru;
    return dict[key] || EXTRA_TRANSLATIONS[this.currentLang]?.[key] || TRANSLATIONS.ru[key] || EXTRA_TRANSLATIONS.ru[key] || key;
  }

  applyTranslations(root = document) {
    document.documentElement.lang = this.currentLang;
    const elements = [];
    if (root.nodeType === Node.ELEMENT_NODE && root.matches('[data-i18n]')) elements.push(root);
    elements.push(...(root.querySelectorAll?.('[data-i18n]') || []));
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      if (text && el.textContent !== text) {
        if (el.tagName === 'INPUT' && el.placeholder) {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });

    const attrElements = [];
    if (root.nodeType === Node.ELEMENT_NODE && root.matches('[data-i18n-attr]')) attrElements.push(root);
    attrElements.push(...(root.querySelectorAll?.('[data-i18n-attr]') || []));
    attrElements.forEach(el => {
      el.getAttribute('data-i18n-attr').split(';').forEach(binding => {
        const separator = binding.indexOf(':');
        if (separator < 1) return;
        const attr = binding.slice(0, separator).trim();
        const key = binding.slice(separator + 1).trim();
        if (!attr || !key) return;
        const value = this.t(key);
        if (el.getAttribute(attr) !== value) el.setAttribute(attr, value);
      });
    });

    const elementsWithCopyAttrs = [];
    if (root.nodeType === Node.ELEMENT_NODE) elementsWithCopyAttrs.push(root);
    elementsWithCopyAttrs.push(...(root.querySelectorAll?.('*') || []));
    elementsWithCopyAttrs.forEach(el => {
      if (el.hasAttribute('data-i18n-attr')) return;
      ['title', 'aria-label', 'placeholder', 'alt', 'value', 'content'].forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        const source = el.getAttribute(attr);
        const copy = INLINE_COPY_LOOKUP.get(normalizeInlineCopy(source));
        if (copy && copy[this.currentLang] !== source) el.setAttribute(attr, copy[this.currentLang]);
      });
    });

    const treeRoot = root.nodeType === Node.TEXT_NODE ? root.parentElement : root;
    if (!treeRoot?.ownerDocument && treeRoot !== document) return;
    const walker = (treeRoot.ownerDocument || document).createTreeWalker(treeRoot, NodeFilter.SHOW_TEXT);
    let textNode;
    while ((textNode = walker.nextNode())) {
      const parent = textNode.parentElement;
      if (!parent || parent.closest('script,style,template,textarea,pre,code,[data-i18n]')) continue;
      const original = textNode.nodeValue || '';
      const normalized = normalizeInlineCopy(original);
      const copy = INLINE_COPY_LOOKUP.get(normalized);
      if (!copy) continue;
      const leading = original.length - original.trimStart().length;
      const trailing = original.length - original.trimEnd().length;
      const translated = original.slice(0, leading) + copy[this.currentLang] + (trailing ? original.slice(-trailing) : '');
      if (translated !== original) textNode.nodeValue = translated;
    }
  }

  updateControls() {
    const langButtons = document.querySelectorAll('.lang-text-btn[data-lang]');
    langButtons.forEach(btn => {
      const active = btn.dataset.lang === this.currentLang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  init() {
    this.updateControls();
    this.applyTranslations();

    this.observer = new MutationObserver(records => {
      const roots = new Set();
      records.forEach(record => {
        if (record.type === 'characterData' && record.target.parentElement) roots.add(record.target.parentElement);
        record.addedNodes?.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) roots.add(node);
          else if (node.parentElement) roots.add(node.parentElement);
        });
      });
      roots.forEach(root => this.applyTranslations(root));
    });
    this.observer.observe(document.documentElement, { childList: true, characterData: true, subtree: true });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-text-btn[data-lang]');
      if (btn) {
        this.setLang(btn.dataset.lang);
      }
    });
  }
}

window.i18n = new I18nManager();
