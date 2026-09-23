/**
 * Xylen Sim Platform - Multilingual Localization Engine (i18n)
 * Supports 3 languages: Russian (RU), Uzbek (UZ), English (EN).
 */

const I18N_STORAGE_KEY = 'xylen_selected_language';

const TRANSLATIONS = {
  ru: {
    brand_sub: "Ecosystem & Data Portal",
    nav_releases: "Релизы и файлы",
    nav_devices: "Устройства и SIM",
    nav_traffic: "Расход трафика & Live",
    nav_parity: "Матрица 1:1",
    live_sync: "Live Sync",
    hero_pill: "Кроссплатформенный Центр Дистрибуции • 1:1 Паритет",
    hero_title: "Центр релизов и загрузок",
    hero_sub: "Прямое скачивание APK для Android и IPA для iPhone, беспроводная установка по QR-коду и раздельный контроль версий приложения и поддерживаемых ОС.",
    guide_title: "Экспресс-инструкции по установке",
    guide_android_title: "Установка на Android (2 шага)",
    guide_android_step1: "Нажмите кнопку <strong>«Скачать APK»</strong> или отсканируйте QR-код камерой смартфона.",
    guide_android_step2: "Откройте файл <span class=\"code-pill\">app-release.apk</span> ➔ нажмите <strong>«Установить»</strong> (при необходимости разрешите установку из браузера).",
    guide_ios_title: "Установка на iPhone по воздуху ($0)",
    guide_ios_step1: "Установите анти-отзывный профиль <a href=\"https://github.com/dns-khoindvn/oci-auto-vm/releases/download/DNS/khoindvn.mobileconfig\" target=\"_blank\" style=\"color:var(--cyan-electric);font-weight:700;\">khoindvn.mobileconfig</a> и подтвердите в Настройках iPhone.",
    guide_ios_step2: "Откройте установщик <a href=\"https://files.catbox.moe/9879kj.html\" target=\"_blank\" style=\"color:var(--cyan-electric);font-weight:700;\">ESign</a> в Safari ➔ подтвердите установку ➔ в <i>Настройки ➔ VPN и управление</i> нажмите «Доверять».",
    guide_ios_step3: "Отсканируйте QR-код с <span class=\"code-pill\">XylenSimPlatform.ipa</span> ➔ откройте в ESign ➔ нажмите <strong>«Подписать»</strong> ➔ <strong>«Установить»</strong>.",
    version_hub_title: "История версий приложения и поддерживаемых ОС",
    version_hub_sub: "Версии приложения и операционные системы разделены",
    tab_all: "Все версии",
    tab_android: "Android",
    tab_ios: "iOS",
    search_placeholder: "Поиск по версиям и чейнджлогу...",
    devices_title: "Мониторинг устройств и SIM-телеметрия",
    devices_sub: "Кто когда заходил, кто онлайн/оффлайн, какую SIM-карту использовал (Название, Номер телефона, IMSI, ICCID, сотовая вышка). Данные защищены и сохраняются при любых обновлениях.",
    btn_export_csv: "Экспорт журнала (CSV)",
    audit_title: "Журнал входов и действий (Аудит-лог)",
    audit_all: "Все",
    audit_test: "Тесты CDN",
    audit_sim: "SIM слоты",
    audit_portal: "Web Portal",
    audit_system: "Система",
    traffic_title: "Аналитика расхода трафика и Прямой эфир",
    traffic_sub: "Расход сегодня в прямом режиме через ультра-легкий микро-дельта протокол (24 байта) + история расхода по дням с интерактивным календарем.",
    live_today_title: "Расход за сегодня в прямом эфире",
    live_active_dev: "Текущее активное устройство:",
    live_speed_label: "Скорость передачи:",
    live_slot_label: "Слот:",
    live_protection_note: "✓ Защита от перегрузки сети: Синхронизация прямого режима использует компактный бинарный дельта-пакет (24 байта). Даже при пиковой загрузке стресс-тестом на 100% полосы и при 2G/EDGE сигнале данные расхода продолжают передаваться без задержек.",
    calendar_title: "Выбор дня расхода",
    day_today: "Сегодня",
    day_yesterday: "Вчера",
    day_2days: "2 дня назад",
    day_3days: "3 дня назад",
    day_7days: "7 дней назад",
    calendar_note: "История расхода формируется автоматически из хранилища устройства и не стирается при обновлениях.",
    parity_title: "Матрица синхронизации Android vs iOS (1:1)",
    parity_sub: "Детальное сопоставление всех 8 ключевых архитектурных модулей между Kotlin Jetpack Compose и Swift SwiftUI.",
    admin_device_badge: "Админ (Это устр.)",
    admin_visitors_title: "Аудит посетителей сайта (Доступно только Админу)",
    admin_visitors_sub: "Список всех устройств и браузеров, которые заходили на сайт, с фиксацией действий и разделов.",
    theme_dark: "Slate",
    theme_amoled: "AMOLED",
    qr_title: "QR-код для установки",
    qr_sub: "Отсканируйте камерой смартфона для прямой установки",
    btn_copy: "Копировать",
    btn_open_direct: "Открыть ссылку напрямую ↗",
    copied_toast: "Ссылка скопирована в буфер обмена!"
  },

  uz: {
    brand_sub: "Ekotizim va Ma'lumotlar Portali",
    nav_releases: "Relizlar va fayllar",
    nav_devices: "Qurilmalar va SIM",
    nav_traffic: "Trafik sarfi & Live",
    nav_parity: "1:1 Matritsa",
    live_sync: "Jonli Sinx",
    hero_pill: "Kross-platforma Tarqatish Markazi • 1:1 Paritet",
    hero_title: "Relizlar va yuklamalar markazi",
    hero_sub: "Android uchun APK va iPhone uchun IPA to'g'ridan-to'g'ri yuklab olish, QR-kod orqali simsiz o'rnatish hamda ilova va OS versiyalarini alohida nazorat qilish.",
    guide_title: "Tezkor o'rnatish qo'llanmasi",
    guide_android_title: "Android tizimiga o'rnatish (2 qadam)",
    guide_android_step1: "<strong>«APK Yuklab olish»</strong> tugmasini bosing yoki telefon kamerasi bilan QR-kodni skanerlang.",
    guide_android_step2: "<span class=\"code-pill\">app-release.apk</span> faylini oching ➔ <strong>«O'rnatish»</strong> tugmasini bosing.",
    guide_ios_title: "iPhone tizimiga simsiz o'rnatish ($0)",
    guide_ios_step1: "<a href=\"https://github.com/dns-khoindvn/oci-auto-vm/releases/download/DNS/khoindvn.mobileconfig\" target=\"_blank\" style=\"color:var(--cyan-electric);font-weight:700;\">khoindvn.mobileconfig</a> DNS profilini o'rnating va Sozlamalarda tasdiqlang.",
    guide_ios_step2: "Safari orqali <a href=\"https://files.catbox.moe/9879kj.html\" target=\"_blank\" style=\"color:var(--cyan-electric);font-weight:700;\">ESign</a> o'rnatuvchisini oching ➔ VPN va Boshqaruv bo'limida «Ishonchli» deb belgilang.",
    guide_ios_step3: "<span class=\"code-pill\">XylenSimPlatform.ipa</span> QR-kodini skanerlang ➔ ESign dasturida <strong>«Imzolash»</strong> ➔ <strong>«O'rnatish»</strong> tugmalarini bosing.",
    version_hub_title: "Ilova versiyalari va qo'llab-quvvatlanadigan OS tarixi",
    version_hub_sub: "Ilova versiyasi va operatsion tizimlar ajratilgan",
    tab_all: "Barcha versiyalar",
    tab_android: "Android",
    tab_ios: "iOS",
    search_placeholder: "Versiyalar va o'zgarishlar bo'yicha qidirish...",
    devices_title: "Qurilmalar monitoringi va SIM telemetriya",
    devices_sub: "Kim qachon kirgan, kim onlayn/oflayn, qaysi SIM-kartadan foydalangan (Nomi, Telefon raqami, IMSI, ICCID, tayanch stansiya). Ma'lumotlar himoyalangan va har qanday yangilanishda saqlanib qoladi.",
    btn_export_csv: "Jurnalni yuklab olish (CSV)",
    audit_title: "Kirishlar va harakatlar jurnali (Audit)",
    audit_all: "Barchasi",
    audit_test: "CDN Testlari",
    audit_sim: "SIM slotlar",
    audit_portal: "Veb Portal",
    audit_system: "Tizim",
    traffic_title: "Trafik sarfi tahlili va Jonli efir",
    traffic_sub: "Bugungi sarf yengil mikro-delta protokoli (24 bayt) orqali jonli rejimda + interaktiv taqvim bilan kunlik sarf tarixi.",
    live_today_title: "Bugungi sarf jonli efirda",
    live_active_dev: "Hozirgi faol qurilma:",
    live_speed_label: "Uzatish tezligi:",
    live_slot_label: "Slot:",
    live_protection_note: "✓ Tarmoq yuklamasidan himoya: Jonli sinxronizatsiya ixcham binar delta-paketdan (24 bayt) foydalanadi. Hatoki 100% yuklamada va 2G/EDGE signallarda ham kechikishsiz uzatiladi.",
    calendar_title: "Trafik sarflangan kunni tanlash",
    day_today: "Bugun",
    day_yesterday: "Kecha",
    day_2days: "2 kun oldin",
    day_3days: "3 kun oldin",
    day_7days: "7 kun oldin",
    calendar_note: "Sarf tarixi qurilma xotirasidan avtomatik olinadi va yangilanishlarda o'chib ketmaydi.",
    parity_title: "Android vs iOS sinxronizatsiya matritsasi (1:1)",
    parity_sub: "Kotlin Jetpack Compose va Swift SwiftUI o'rtasidagi barcha 8 ta asosiy modulning to'liq taqqoslanishi.",
    admin_device_badge: "Admin (Bu qurilma)",
    admin_visitors_title: "Sayt tashrifchilari auditi (Faqat Admin uchun)",
    admin_visitors_sub: "Saytga kirgan barcha qurilmalar, brauzerlar va ko'rilgan sahifalar ro'yxati.",
    theme_dark: "Slate",
    theme_amoled: "AMOLED",
    qr_title: "O'rnatish uchun QR-kod",
    qr_sub: "To'g'ridan-to'g'ri o'rnatish uchun smartfon kamerasi bilan skanerlang",
    btn_copy: "Nusxalash",
    btn_open_direct: "Havolani to'g'ridan-to'g'ri ochish ↗",
    copied_toast: "Havola buferga nusxalandi!"
  },

  en: {
    brand_sub: "Ecosystem & Data Portal",
    nav_releases: "Releases & Files",
    nav_devices: "Devices & SIM",
    nav_traffic: "Traffic Usage & Live",
    nav_parity: "1:1 Parity Matrix",
    live_sync: "Live Sync",
    hero_pill: "Cross-Platform Distribution Hub • 1:1 Parity",
    hero_title: "Releases & Download Hub",
    hero_sub: "Direct APK download for Android and IPA for iPhone, wireless QR installation, and separated App vs OS version tracking.",
    guide_title: "Express Installation Guides",
    guide_android_title: "Android Installation (2 steps)",
    guide_android_step1: "Click <strong>«Download APK»</strong> or scan the QR code with your phone camera.",
    guide_android_step2: "Open <span class=\"code-pill\">app-release.apk</span> ➔ tap <strong>«Install»</strong>.",
    guide_ios_title: "Over-the-Air iOS Installation ($0)",
    guide_ios_step1: "Install anti-revoke DNS profile <a href=\"https://github.com/dns-khoindvn/oci-auto-vm/releases/download/DNS/khoindvn.mobileconfig\" target=\"_blank\" style=\"color:var(--cyan-electric);font-weight:700;\">khoindvn.mobileconfig</a> and verify in Settings.",
    guide_ios_step2: "Open installer <a href=\"https://files.catbox.moe/9879kj.html\" target=\"_blank\" style=\"color:var(--cyan-electric);font-weight:700;\">ESign</a> in Safari ➔ trust certificate in Settings.",
    guide_ios_step3: "Scan QR code with <span class=\"code-pill\">XylenSimPlatform.ipa</span> ➔ in ESign tap <strong>«Sign»</strong> ➔ <strong>«Install»</strong>.",
    version_hub_title: "Application Versions & Supported OS History",
    version_hub_sub: "Application version and operating systems are clearly separated",
    tab_all: "All versions",
    tab_android: "Android",
    tab_ios: "iOS",
    search_placeholder: "Search versions and changelog...",
    devices_title: "Device Monitoring & SIM Telemetry",
    devices_sub: "Who logged in, when, online/offline presence, which SIM card was used (Carrier, Phone Number, IMSI, ICCID, Cell Tower). All data persists across any app updates.",
    btn_export_csv: "Export Audit Log (CSV)",
    audit_title: "Login & Action Audit Log",
    audit_all: "All",
    audit_test: "CDN Tests",
    audit_sim: "SIM Slots",
    audit_portal: "Web Portal",
    audit_system: "System",
    traffic_title: "Traffic Consumption & Live Stream",
    traffic_sub: "Today's usage in real-time via ultra-low-bandwidth micro-delta protocol (24 bytes) + calendar historical breakdown.",
    live_today_title: "Today's Usage Live Stream",
    live_active_dev: "Currently Active Device:",
    live_speed_label: "Transfer Speed:",
    live_slot_label: "Slot:",
    live_protection_note: "✓ Network Overload Protection: Live mode sync utilizes compact 24-byte binary delta frames. Telemetry stream continues smoothly even under 100% channel stress testing and on 2G/EDGE networks.",
    calendar_title: "Select Traffic Consumption Date",
    day_today: "Today",
    day_yesterday: "Yesterday",
    day_2days: "2 days ago",
    day_3days: "3 days ago",
    day_7days: "7 days ago",
    calendar_note: "Traffic history is automatically aggregated from device persistent vault and never gets wiped during updates.",
    parity_title: "Android vs iOS Parity Matrix (1:1)",
    parity_sub: "Comprehensive 1:1 synchronization between Kotlin Jetpack Compose and Swift SwiftUI modules.",
    admin_device_badge: "Admin (This Device)",
    admin_visitors_title: "Website Visitors Audit (Admin Only)",
    admin_visitors_sub: "List of all client devices and browsers visiting this portal with page views and timestamps.",
    theme_dark: "Slate",
    theme_amoled: "AMOLED",
    qr_title: "Installation QR Code",
    qr_sub: "Scan with your smartphone camera for direct over-the-air install",
    btn_copy: "Copy Link",
    btn_open_direct: "Open Directly ↗",
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
