/* Product refinements: honest public telemetry, owner-gated audit, restrained motion. */
(function () {
  let ownerAudit = null;
  let ownerReady = false;
  let latestSummary = null;

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const formatBytes = value => {
    const bytes = Math.max(0, Number(value) || 0);
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  if (window.activityStorage) {
    // A browser flag is only a UI state. Private data always comes from /api/admin.
    window.activityStorage.isAdmin = () => ownerReady;
    window.activityStorage.loginAdmin = () => false;
    window.activityStorage.verifyAdminPin = () => false;
    window.activityStorage.getPairingToken = () => '';
    window.activityStorage.generateNewPairingToken = () => '';
    window.activityStorage.registerDevice = () => false;
    window.activityStorage.getDevices = () => [];
    window.activityStorage.getActivities = () => [];
    window.activityStorage.getAuditUsers = () => [];
    window.activityStorage.getAuditActivities = () => [];
  }

  async function fetchPublicSummary() {
    const status = document.getElementById('public-audit-status');
    try {
      const response = await fetch('/api/audit', { cache: 'no-store', headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('summary unavailable');
      const data = await response.json();
      if (!data.ok) throw new Error('summary unavailable');
      latestSummary = data;
      updateSummary(data);
      if (status) status.textContent = 'Сводка обновлена';
    } catch (_) {
      latestSummary = null;
      if (status) status.textContent = 'Серверная сводка недоступна';
      ['device-kpi-total-users','device-kpi-online-users','device-kpi-total-spend','device-kpi-total-actions','traffic-delta-size','traffic-live-today','traffic-live-speed','traffic-active-devices','traffic-public-today','traffic-public-events','traffic-public-speed','traffic-last-received','kpi-sims-count','kpi-speed-count','kpi-traffic-count','kpi-devices-count'].forEach(id => {
        const node = document.getElementById(id);
        if (node) node.textContent = '—';
      });
      const state = document.getElementById('public-audit-state');
      if (state) state.textContent = 'Серверная сводка недоступна';
      const last = document.getElementById('public-audit-last-event');
      if (last) last.textContent = '—';
    }
  }

  function updateSummary(data) {
    const set = (id, value) => { const node = document.getElementById(id); if (node) node.textContent = value; };
    set('device-kpi-total-users', Number(data.totalUsersCount) || 0);
    set('device-kpi-online-users', Number(data.onlineUsersCount) || 0);
    set('device-kpi-total-spend', formatBytes(data.todayBytes));
    set('device-kpi-total-actions', Number(data.activityCount) || 0);
    set('traffic-delta-size', Number(data.activityCount) || 0);
    set('traffic-live-today', formatBytes(data.todayBytes));
    set('traffic-live-speed', 'Нет показаний');
    set('traffic-active-devices', Number(data.onlineUsersCount) || 0);
    set('traffic-public-today', formatBytes(data.todayBytes));
    set('traffic-public-events', Number(data.activityCount) || 0);
    set('traffic-public-speed', ({ ru: 'Не передаётся', en: 'Not reported', uz: 'Yuborilmaydi' })[window.i18n?.currentLang || 'ru']);
    set('traffic-last-received', data.lastActivityAt ? new Date(data.lastActivityAt).toLocaleString() : '—');
    set('kpi-sims-count', '—');
    set('kpi-speed-count', '—');
    set('kpi-traffic-count', formatBytes(data.todayBytes));
    set('kpi-devices-count', Number(data.totalUsersCount) || 0);
    const state = document.getElementById('public-audit-state');
    if (state) {
      state.textContent = data.totalUsersCount
        ? `${data.totalUsersCount} устройств передавали данные · ${data.onlineUsersCount} активны за последние 75 секунд`
        : 'Пока нет устройств, передавших данные с Android-клиента.';
    }
    const latest = document.getElementById('public-audit-last-event');
    if (latest) latest.textContent = data.lastActivityAt ? new Date(data.lastActivityAt).toLocaleString() : 'Событий пока нет';
  }

  function renderPublicPage() {
    const page = document.getElementById('page-devices');
    if (!page) return;
    page.innerHTML = `
      <div class="container devices-page">
        <header class="section-title-strip reveal-on-scroll">
          <div><span class="eyebrow">УСТРОЙСТВА</span><h1 class="section-heading">Обзор устройств</h1>
          <p class="section-desc">Сводка реальных событий от мобильного приложения. Подробные записи доступны только владельцу.</p></div>
          <div class="device-toolbar"><span class="card-status-badge" id="public-audit-status">Проверка соединения…</span><button class="btn btn-secondary btn-compact" id="refresh-public-audit">Обновить</button></div>
        </header>
        <div class="audit-kpi-bar public-kpis">
          <div class="audit-kpi-pill"><span class="kpi-label">Устройств с данными</span><strong class="kpi-val" id="device-kpi-total-users">—</strong></div>
          <div class="audit-kpi-pill"><span class="kpi-label">Активны сейчас</span><strong class="kpi-val cyan" id="device-kpi-online-users">—</strong></div>
          <div class="audit-kpi-pill"><span class="kpi-label">Трафик сегодня</span><strong class="kpi-val green" id="device-kpi-total-spend">—</strong></div>
          <div class="audit-kpi-pill"><span class="kpi-label">Получено событий</span><strong class="kpi-val" id="device-kpi-total-actions">—</strong></div>
        </div>
        <section class="device-summary-panel" aria-live="polite">
          <div class="device-summary-mark" aria-hidden="true"><span></span><span></span><span></span></div>
          <div><span class="eyebrow">ПОСЛЕДНЕЕ СОСТОЯНИЕ</span><p id="public-audit-state">Загружаем сводку…</p><small>Последнее событие: <time id="public-audit-last-event">—</time></small></div>
        </section>
        <p class="data-scope-note">В этой сводке нет идентификаторов, имён, SIM-профилей или журнала действий. Сервер получает отчёты Android только после согласия в приложении. iOS пока хранит журнал локально и в эту сводку не входит. Данные SIM-слотов серверу не передаются.</p>
      </div>`;
    document.getElementById('refresh-public-audit')?.addEventListener('click', fetchPublicSummary);
    fetchPublicSummary();
  }

  function renderInfoPages() {
    const lang = window.i18n?.currentLang || 'ru';
    const copy = {
      ru: {
        nav: 'Обзор устройства', about: 'Как работает платформа',
        aboutIntro: 'Xylen объединяет мобильный клиент и веб-панель для аудита использования приложения и учёта переданных клиентом сетевых счётчиков. Интерфейс различает полученные с устройства сведения и параметры, которые приложение пока не передаёт.',
        aboutAndroid: 'Android-клиент отправляет отчёты в /api/audit только при выданном согласии: постоянный случайный ID установки, модель, заданное тестировщиком имя, открытый экран, действие и его текстовые детали, выбранного оператора, а также счётчики сессии и дня. Эти значения формирует клиент; сервер не подтверждает их независимо.',
        aboutStorage: 'Cloudflare Pages Function принимает отчёты, а конфигурация сайта связывает её с Cloudflare KV. Публичный экран получает только сводные числа. Подробные записи доступны через отдельный endpoint после проверки подписанного Cloudflare Access JWT и email владельца.',
        aboutLimits: 'SIM-карты и радиопараметры не передаются этим веб API. Android имеет отдельный клиент portal API для SIM-профиля и очереди трафика, но это другой серверный адрес и отдельный API-ключ. В найденном iOS-коде аудит хранится на устройстве и не отправляется на сайт.',
        aboutMotion: 'Мобильная ОС ограничивает работу приложений в фоне и доступ к идентификаторам SIM, сотам и радиосигналу. Поэтому сайт не обещает постоянное обнаружение устройств, точную скорость радиоэфира или список SIM-слотов, которых нет в серверном событии.',
        privacy: 'Данные и конфиденциальность',
        privacyIntro: 'Здесь описан поток данных, который реализован в текущем коде Xylen Platform Web и мобильных клиентов. Это техническое описание; применимость требований законодательства и юридические основания обработки должен проверить оператор платформы.',
        privacyData: 'Android после согласия отправляет идентификатор установки, модель и платформу, имя тестировщика, экран, действие и детали, имя сотового оператора, а также объём трафика за день и сессию. В деталях действия пользователь может указать свободный текст.',
        privacyNot: 'Этот сайт не получает от текущего Android audit endpoint номера телефона, ICCID/IMSI, CID/TAC, уровни сигнала или список SIM-слотов. iOS-клиент хранит журнал локально; найденная реализация не отправляет его на этот сайт. Отдельный Android portal API может передавать SIM-профиль и записи трафика на p.xylen.workers.dev при настроенном API-ключе.',
        privacyUse: 'Сведения используются для отображения сводки и, владельцем, для разбора полученных событий и показаний счётчиков. Публичный endpoint возвращает только число зарегистрированных устройств, число недавних активных устройств, сумму присланных счётчиков и размер журнала. Подробный endpoint требует JWT Cloudflare Access, действующую аудиторию и совпадение email с настроенным email владельца.',
        privacyKeep: 'На сервере сохраняется последняя запись по каждому ID устройства до удаления из хранилища оператором. Журнал ограничен последними 200 событиями. Отключение согласия останавливает последующую отправку из клиента, но само по себе не стирает уже сохранённые записи; в текущей веб-панели пользовательского удаления нет.',
        privacySecurity: 'Передача идёт по HTTPS. Дополнительные заявления о месте хранения, сквозном шифровании, сертификации, соблюдении конкретного закона или сроке удаления не делаются: это зависит от фактических настроек Cloudflare и процедур оператора.',
        data: 'Какие данные передаются', limits: 'Границы сбора', use: 'Назначение и доступ', keep: 'Хранение и удаление', security: 'Защита и правовые сведения'
      },
      en: {
        nav: 'Device overview', about: 'How the platform works',
        aboutIntro: 'Xylen combines a mobile client and a web console for auditing app usage and viewing network counters submitted by the client. The interface distinguishes reported data from capabilities the apps do not currently send.',
        aboutAndroid: 'With consent enabled, the Android client posts to /api/audit: a persistent random installation ID, model, tester-provided name, current screen, action and its text details, selected carrier, and session/day counters. These values are client-reported and are not independently verified by the server.',
        aboutStorage: 'A Cloudflare Pages Function accepts reports, and the site configuration binds it to Cloudflare KV. The public screen receives aggregate counts only. Detailed records use a separate endpoint that verifies a signed Cloudflare Access JWT and the owner email.',
        aboutLimits: 'SIM profiles and radio measurements are not sent to this web API. Android has a separate portal API client for SIM profiles and queued traffic records, using a different server address and API key. In the iOS source reviewed, the audit stays on the device and is not uploaded to this site.',
        aboutMotion: 'Mobile operating systems limit background execution and access to SIM, cell, and radio identifiers. The site therefore does not claim continuous discovery, measured live radio speed, or a SIM-slot list that the server does not receive.',
        privacy: 'Data and privacy',
        privacyIntro: 'This page describes the data flow implemented in the current Xylen Platform Web and mobile-client source. It is a technical description, not a legal opinion; the platform operator should confirm applicable legal requirements and lawful bases.',
        privacyData: 'After consent, Android sends an installation ID, model and platform, tester name, screen, action and details, carrier name, and session/day traffic counters. The action details field may contain free text entered by the user.',
        privacyNot: 'The current Android audit endpoint does not receive phone numbers, ICCID/IMSI, CID/TAC, signal levels, or SIM-slot lists. The reviewed iOS client stores its activity log locally and does not upload it to this site. A separate Android portal API may send SIM-profile and traffic records to p.xylen.workers.dev when an API key is configured.',
        privacyUse: 'The data supports an aggregate public summary and an owner-only review of reported events and counters. The public endpoint returns counts, a sum of submitted counters, and the retained event count. The detailed endpoint requires a valid Cloudflare Access JWT, configured audience, and a matching configured owner email.',
        privacyKeep: 'The server keeps the latest record for each device ID until the operator removes it from storage. The activity log is limited to the latest 200 events. Revoking consent stops later client uploads; it does not erase previously stored records. The current web console has no user-facing deletion control.',
        privacySecurity: 'Data is transmitted over HTTPS. No claims are made here about storage location, end-to-end encryption, certification, legal compliance, or deletion deadlines; those depend on the actual Cloudflare configuration and operator procedures.',
        data: 'Data sent', limits: 'Collection boundaries', use: 'Purpose and access', keep: 'Retention and deletion', security: 'Security and legal notes'
      },
      uz: {
        nav: 'Qurilmalar sharhi', about: 'Platforma qanday ishlaydi',
        aboutIntro: 'Xylen mobil ilova va veb-panelni birlashtirib, ilovadan foydalanish hamda mijoz yuborgan tarmoq hisoblagichlarini ko‘rsatadi. Interfeys qurilmadan kelgan ma’lumotlarni ilovalar hozircha yubormaydigan imkoniyatlardan ajratadi.',
        aboutAndroid: 'Rozilik berilganda Android mijoz /api/audit manziliga doimiy tasodifiy o‘rnatish IDsi, model, sinovchi kiritgan ism, joriy ekran, amal va matnli tafsilotlar, tanlangan operator hamda kun/sessiya hisoblagichlarini yuboradi. Server bu qiymatlarni mustaqil tekshirmaydi.',
        aboutStorage: 'Cloudflare Pages Function hisobotlarni qabul qiladi va loyiha sozlamasi Cloudflare KV bilan bog‘laydi. Ochiq sahifa faqat umumiy sonlarni oladi. Batafsil yozuvlar imzolangan Cloudflare Access JWT va egasining emaili tekshiriladigan alohida endpoint orqali beriladi.',
        aboutLimits: 'SIM profillari va radio o‘lchovlari ushbu veb APIga yuborilmaydi. Androidda boshqa server manzili va alohida API kalitidan foydalanadigan portal API mavjud. Ko‘rib chiqilgan iOS kodida jurnal qurilmada saqlanadi va saytga yuborilmaydi.',
        aboutMotion: 'Mobil operatsion tizimlar fonda ishlash va SIM, baza stansiyasi hamda radio identifikatorlariga kirishni cheklaydi. Shu bois sayt doimiy qurilma aniqlash, o‘lchangan jonli radio tezligi yoki server olmagan SIM ro‘yxatini va’da qilmaydi.',
        privacy: 'Ma’lumotlar va maxfiylik',
        privacyIntro: 'Bu sahifada joriy Xylen Platform Web va mobil mijoz kodida ishlaydigan ma’lumot oqimi bayon etilgan. Bu texnik tavsif, yuridik xulosa emas; operator qonuniy talablar va qayta ishlash asoslarini tekshirishi lozim.',
        privacyData: 'Rozilikdan so‘ng Android o‘rnatish IDsi, model va platforma, sinovchi ismi, ekran, amal va tafsilotlari, operator nomi hamda kun/sessiya trafik hisoblagichlarini yuboradi. Amal tafsilotlariga foydalanuvchi erkin matn kiritishi mumkin.',
        privacyNot: 'Joriy Android audit endpointi telefon raqami, ICCID/IMSI, CID/TAC, signal darajasi yoki SIM ro‘yxatini olmaydi. Ko‘rib chiqilgan iOS mijoz jurnali qurilmada qoladi va saytga yuborilmaydi. Alohida Android portal API sozlangan kalit bilan SIM profilini va trafik yozuvlarini p.xylen.workers.dev manziliga yuborishi mumkin.',
        privacyUse: 'Ma’lumotlar umumiy ochiq jamlanma hamda egasining batafsil hodisalar va hisoblagichlarni ko‘rishi uchun ishlatiladi. Ochiq endpoint faqat sonlar, yuborilgan hisoblagichlar yig‘indisi va saqlangan hodisalar miqdorini qaytaradi. Batafsil endpoint amaldagi Cloudflare Access JWT, auditoriya va sozlangan egasi emailiga moslikni talab qiladi.',
        privacyKeep: 'Server har bir qurilma IDsi bo‘yicha so‘nggi yozuvni operator xotiradan o‘chirmaguncha saqlaydi. Hodisalar jurnali eng so‘nggi 200 yozuv bilan cheklangan. Rozilikni bekor qilish keyingi yuborishni to‘xtatadi, ammo avval saqlangan ma’lumotlarni o‘chirmaydi. Veb-panelda foydalanuvchi o‘chirish boshqaruvi yo‘q.',
        privacySecurity: 'Ma’lumot HTTPS orqali uzatiladi. Saqlash joyi, to‘liq shifrlash, sertifikat, qonunchilikka muvofiqlik yoki o‘chirish muddati haqida da’vo qilinmaydi; bular Cloudflare sozlamalari va operator jarayonlariga bog‘liq.',
        data: 'Yuboriladigan ma’lumotlar', limits: 'Yig‘ish chegaralari', use: 'Maqsad va kirish', keep: 'Saqlash va o‘chirish', security: 'Xavfsizlik va huquqiy eslatma'
      }
    }[lang] || null;
    if (!copy) return;
    copy.privacyIntro += lang === 'ru'
      ? ' Перед запуском обработки оператору следует проверить применимость Закона Республики Узбекистан № ЗРУ-547 «О персональных данных», UK GDPR и Data Protection Act 2018; эта страница не подтверждает соблюдение этих актов.'
      : lang === 'uz'
        ? ' Qayta ishlashni boshlashdan oldin operator O‘zbekiston Respublikasining O‘RQ-547-son «Shaxsiy ma’lumotlar to‘g‘risida»gi Qonuni, UK GDPR va Data Protection Act 2018 qo‘llanishini tekshirishi kerak; ushbu sahifa ularga muvofiqlikni tasdiqlamaydi.'
        : ' Before processing begins, the operator should review whether Uzbekistan Law No. ZRU-547 on Personal Data, UK GDPR, and the Data Protection Act 2018 apply; this page does not certify compliance.';
    document.querySelectorAll('[data-i18n="nav_overview"]').forEach(node => { node.textContent = copy.nav; });
    const about = document.querySelector('#page-about .about-clean-card');
    if (about) about.innerHTML = `<span class="eyebrow">XYLEN PLATFORM</span><h1 class="section-heading">${copy.about}</h1><p class="about-body-text">${copy.aboutIntro}</p><section class="info-article"><h2>${copy.data}</h2><p>${copy.aboutAndroid}</p></section><section class="info-article"><h2>${copy.use}</h2><p>${copy.aboutStorage}</p></section><section class="info-article"><h2>${copy.limits}</h2><p>${copy.aboutLimits}</p></section><section class="info-article"><h2>${copy.security}</h2><p>${copy.aboutMotion}</p></section>`;
    const privacy = document.querySelector('#page-privacy .privacy-clean-card');
    if (privacy) privacy.innerHTML = `<span class="eyebrow">XYLEN PLATFORM</span><h1 class="section-heading">${copy.privacy}</h1><p class="section-desc">${copy.privacyIntro}</p><section class="legal-article-block"><h2 class="legal-title">${copy.data}</h2><p class="legal-text">${copy.privacyData}</p></section><section class="legal-article-block"><h2 class="legal-title">${copy.limits}</h2><p class="legal-text">${copy.privacyNot}</p></section><section class="legal-article-block"><h2 class="legal-title">${copy.use}</h2><p class="legal-text">${copy.privacyUse}</p></section><section class="legal-article-block"><h2 class="legal-title">${copy.keep}</h2><p class="legal-text">${copy.privacyKeep}</p></section><section class="legal-article-block"><h2 class="legal-title">${copy.security}</h2><p class="legal-text">${copy.privacySecurity}</p></section>`;
  }

  function renderOperationalCopy() {
    const lang = window.i18n?.currentLang || 'ru';
    const copy = {
      ru: { cards: [['Данные Android','Оператор и сетевые сведения зависят от разрешений, устройства и версии ОС. Сайт не получает параметры сигнала или вышки.'],['События приложения','После согласия Android отправляет экран, действие и технические счётчики. Идентификатор и детали формирует клиент.'],['Счётчики трафика','Панель показывает переданные клиентом счётчики дня и сессии. Мгновенную скорость сервер не получает.'],['iOS хранит журнал локально','В найденном коде iOS нет отправки журнала на сайт.']], traffic:'Сотовые счётчики', intro:'Сводка отражает показания Android-клиента. Сервер не измеряет радиоканал в реальном времени.', active:'Устройства · последние 75 секунд', day:'Трафик за день', events:'Событий в журнале', speed:'Мгновенная скорость', unavailable:'Не передаётся', note:'iOS-журнал остаётся на устройстве. SIM-слоты, сигнал и вышки этим API не передаются.', modules:[['Согласие и отчёт','Приложение отправляет событие после согласия.'],['Поля события','ID установки, экран, действие и счётчики, сообщённые клиентом.'],['Сводка','Публичный endpoint отдаёт агрегированные числа.'],['iOS','Журнал хранится локально и не поступает на сайт.'],['Доступ владельца','Подробные записи защищает Cloudflare Access.']] },
      en: { cards: [['Android-reported data','Carrier and network details depend on permissions, device, and OS. The website receives no signal or cell-tower measurements.'],['App events','With consent, Android sends the screen, action, and technical counters. The client supplies the identifier and event details.'],['Traffic counters','The console displays client-submitted day and session totals. The server receives no instantaneous speed.'],['iOS keeps its log locally','The reviewed iOS source does not upload its activity log to this site.']], traffic:'Cellular counters', intro:'This summary reflects readings submitted by Android. The server does not measure the radio channel live.', active:'Devices · last 75 seconds', day:'Traffic today', events:'Events retained', speed:'Instantaneous speed', unavailable:'Not reported', note:'The iOS log stays on-device. SIM slots, signal, and cell towers are not sent to this API.', modules:[['Consent and report','The app sends an event after consent.'],['Event fields','Install ID, screen, action, and client-reported counters.'],['Summary','The public endpoint returns aggregate counts.'],['iOS','The activity log stays local and is not sent to this site.'],['Owner access','Cloudflare Access protects detailed records.']] },
      uz: { cards: [['Android yuboradigan ma’lumotlar','Operator va tarmoq tafsilotlari ruxsat, qurilma va OTga bog‘liq. Sayt signal yoki baza stansiyasi o‘lchovlarini olmaydi.'],['Ilova hodisalari','Rozilik bo‘lsa Android ekran, amal va hisoblagichlarni yuboradi. ID va tafsilotlarni mijoz shakllantiradi.'],['Trafik hisoblagichlari','Panel mijoz yuborgan kunlik va sessiya jami ko‘rsatkichlarini ko‘rsatadi. Server oniy tezlikni olmaydi.'],['iOS jurnali qurilmada qoladi','Ko‘rib chiqilgan iOS kodida jurnal saytga yuborilmaydi.']], traffic:'Mobil tarmoq hisoblagichlari', intro:'Jamlanma Android mijoz yuborgan ko‘rsatkichlarni aks ettiradi. Server radio kanalni jonli o‘lchamaydi.', active:'Qurilmalar · so‘nggi 75 soniya', day:'Bugungi trafik', events:'Jurnaldagi hodisalar', speed:'Oniy tezlik', unavailable:'Yuborilmaydi', note:'iOS jurnali qurilmada qoladi. SIM ro‘yxati, signal va baza stansiyasi bu APIga yuborilmaydi.', modules:[['Rozilik va hisobot','Ilova rozilikdan keyin hodisani yuboradi.'],['Hodisa maydonlari','O‘rnatish IDsi, ekran, amal va mijoz hisoblagichlari.'],['Jamlanma','Ochiq endpoint umumiy sonlarni qaytaradi.'],['iOS','Jurnal mahalliy saqlanadi va saytga yuborilmaydi.'],['Egasi kirishi','Batafsil yozuvlar Cloudflare Access bilan himoyalanadi.']] }
    }[lang];
    if (!copy) return;
    const homeCopy = {
      ru: ['Веб-панель принимает только клиентские отчёты Android после согласия. Она не считывает радиомодем напрямую; iOS-журнал не загружается на сайт.', 'ДАННЫЕ ОТ МОБИЛЬНОГО КЛИЕНТА', 'Показания зависят от возможностей устройства и разрешений ОС.', ['Отчёты Android','Журнал iOS на устройстве','Без данных SIM и вышек']],
      en: ['The web console receives Android client reports after consent. It does not read the modem directly; the iOS log is not uploaded to this site.', 'MOBILE CLIENT REPORTS', 'Reported readings depend on the device and operating-system permissions.', ['Android reports','iOS log stays on-device','No SIM or tower details']],
      uz: ['Veb-panel rozilikdan so‘ng Android mijoz hisobotlarini oladi. Modemni bevosita o‘qimaydi; iOS jurnali saytga yuklanmaydi.', 'MOBIL MIJOZ HISOBOTLARI', 'Ko‘rsatkichlar qurilma va OT ruxsatlariga bog‘liq.', ['Android hisobotlari','iOS jurnali qurilmada','SIM va stansiya ma’lumoti yo‘q']]
    }[lang];
    const heroDesc = document.querySelector('#page-overview .hero-statement-desc');
    if (heroDesc) heroDesc.textContent = homeCopy[0];
    const socialTitle = document.querySelector('.social-proof-title');
    const socialItems = document.querySelector('.operator-logos-grid');
    if (socialTitle) socialTitle.textContent = homeCopy[2];
    if (socialItems) socialItems.innerHTML = homeCopy[3].map(item => `<div class="operator-pill">${escapeHtml(item)}</div>`).join('');
    const liveBadge = document.querySelector('.kpi-lead-badge');
    const liveTitle = document.querySelector('.kpi-lead-title');
    if (liveBadge) liveBadge.textContent = homeCopy[1];
    if (liveTitle) liveTitle.textContent = lang === 'ru' ? 'Счётчики, сообщённые клиентом' : lang === 'uz' ? 'Mijoz yuborgan hisoblagichlar' : 'Client-reported counters';
    const heroPrimary = document.querySelector('.btn-hero-primary-lg');
    if (heroPrimary) heroPrimary.textContent = lang === 'ru' ? 'Сводка устройств' : lang === 'uz' ? 'Qurilmalar jamlanmasi' : 'Device summary';
    document.querySelectorAll('.eng-pillar-card').forEach((card, index) => {
      const title = card.querySelector('.pillar-title'), desc = card.querySelector('.pillar-desc');
      const badge = card.querySelector('.pillar-badge');
      if (copy.cards[index]) { if (title) title.textContent = copy.cards[index][0]; if (desc) desc.textContent = copy.cards[index][1]; }
      if (badge && copy.cards[index]) badge.textContent = copy.cards[index][0];
    });
    document.querySelectorAll('.stack-card').forEach((card, index) => {
      const title = card.querySelector('.stack-card-title'), desc = card.querySelector('.stack-card-desc');
      const badge = card.querySelector('.stack-badge');
      if (title && copy.cards[index]) title.textContent = copy.cards[index][0];
      if (desc && copy.cards[index]) desc.textContent = copy.cards[index][1];
      if (badge && copy.cards[index]) badge.textContent = copy.cards[index][0];
    });
    const stackOne = document.getElementById('stack-card-1');
    const stackTwo = document.getElementById('stack-card-2');
    const stackThree = document.getElementById('stack-card-3');
    if (stackOne) {
      const visual = stackOne.querySelector('.stack-card-visual');
      const meta = stackOne.querySelector('.stack-card-meta');
      if (visual) visual.innerHTML = `<div class="stack-data-note"><span class="eyebrow">${copy.cards[0][0]}</span><p>${copy.cards[0][1]}</p></div>`;
      if (meta) meta.innerHTML = lang === 'ru' ? `<span class="spec-pill">Разрешения Android</span><span class="spec-pill">Данные клиента</span><span class="spec-pill">Без SIM-идентификаторов</span>` : lang === 'uz' ? `<span class="spec-pill">Android ruxsatlari</span><span class="spec-pill">Mijoz ma’lumoti</span><span class="spec-pill">SIM IDlari yuborilmaydi</span>` : `<span class="spec-pill">Android permissions</span><span class="spec-pill">Client reported</span><span class="spec-pill">No SIM identifiers sent</span>`;
      const title = stackOne.querySelector('.stack-card-title'), desc = stackOne.querySelector('.stack-card-desc');
      if (title) title.textContent = copy.cards[0][0]; if (desc) desc.textContent = copy.cards[0][1];
    }
    if (stackTwo) {
      const visual = stackTwo.querySelector('.stack-card-visual');
      const payload = stackTwo.querySelector('.hex-stream-preview');
      if (visual) visual.innerHTML = `<div class="stack-data-note"><span class="eyebrow">POST /api/audit</span><p>${lang === 'ru' ? 'Android после согласия отправляет JSON-отчёт. Веб API не использует заявленный формат пакета 24 байта.' : lang === 'uz' ? 'Android rozilikdan so‘ng JSON hisobot yuboradi. Veb API 24 baytli paket formatidan foydalanmaydi.' : 'After consent, Android sends a JSON report. The web API does not use the claimed 24-byte packet format.'}</p><code>{ "screen": "…", "action": "…" }</code></div>`;
      if (payload) payload.remove();
    }
    if (stackThree) {
      const visual = stackThree.querySelector('.stack-card-visual');
      const meta = stackThree.querySelector('.stack-card-meta');
      const badge = stackThree.querySelector('.stack-badge');
      const title = stackThree.querySelector('.stack-card-title'), desc = stackThree.querySelector('.stack-card-desc');
      if (visual) visual.innerHTML = `<div class="stack-data-note"><span class="eyebrow">CLOUDFLARE ACCESS</span><p>${lang === 'ru' ? 'Подробные записи доступны после проверки личности владельца через Cloudflare Access.' : lang === 'uz' ? 'Batafsil yozuvlar egasi Cloudflare Access orqali tasdiqlangandan keyin ochiladi.' : 'Detailed records are available after Cloudflare Access verifies the owner identity.'}</p></div>`;
      if (title) title.textContent = lang === 'ru' ? 'Доступ владельца' : lang === 'uz' ? 'Ega kirishi' : 'Owner access';
      if (desc) desc.textContent = lang === 'ru' ? 'Подробные записи доступны владельцу после проверки Cloudflare Access.' : lang === 'uz' ? 'Batafsil yozuvlar egasi uchun Cloudflare Access tekshiruvidan so‘ng ochiladi.' : 'Detailed records are available to the owner after Cloudflare Access verification.';
      if (meta) meta.textContent = '';
      if (badge) badge.textContent = lang === 'ru' ? 'Доступ владельца' : lang === 'uz' ? 'Ega kirishi' : 'Owner access';
    }
    const motionTitle = document.querySelector('.motion-carousel-section .section-heading');
    const motionSub = document.querySelector('.motion-carousel-section .section-desc');
    if (motionTitle) motionTitle.textContent = lang === 'ru' ? 'Как проходит аудит' : lang === 'uz' ? 'Audit qanday ishlaydi' : 'How the audit works';
    if (motionSub) motionSub.textContent = lang === 'ru' ? 'Пять шагов от согласия в приложении до защищённого просмотра отчётов' : lang === 'uz' ? 'Ilovadagi rozilikdan hisobotlarni himoyalangan ko‘rishgacha bo‘lgan besh qadam' : 'Five steps from app consent to protected review of reports';
    const stackSub = document.querySelector('[data-i18n="stack_sub"]');
    if (stackSub) stackSub.textContent = lang === 'ru' ? 'Отчёт Android, безопасная обработка и сводка полученных данных.' : lang === 'uz' ? 'Android hisoboti, xavfsiz ishlov va olingan ma’lumotlar jamlanmasi.' : 'Android reports, protected processing, and a summary of received data.';
    const connectTitle = document.querySelector('.connect-title');
    if (connectTitle) connectTitle.textContent = lang === 'ru' ? 'Приём отчётов Android после согласия' : lang === 'uz' ? 'Rozilikdan so‘ng Android hisobotlarini qabul qilish' : 'Android reports received after consent';
    const connectDesc = document.querySelector('.connect-desc');
    if (connectDesc) connectDesc.textContent = lang === 'ru' ? 'Веб API принимает клиентские события и счётчики. iOS пока сохраняет журнал локально.' : lang === 'uz' ? 'Veb API mijoz hodisalari va hisoblagichlarini qabul qiladi. iOS jurnali hozircha qurilmada saqlanadi.' : 'The web API accepts client events and counters. iOS currently keeps its log on-device.';
    const legacyMeta = document.querySelector('.section-title-strip + .connectivity-meta');
    if (legacyMeta) legacyMeta.textContent = '';
    document.querySelectorAll('.stack-card-meta').forEach(meta => { if (meta.closest('#stack-card-3')) meta.textContent = ''; });
    window.dispatchEvent(new Event('resize'));
    document.querySelectorAll('.motion-card').forEach((card, index) => {
      const moduleIndex = index % copy.modules.length;
      const [title, sub] = copy.modules[moduleIndex];
      const titleNode = card.querySelector('.motion-title'), subNode = card.querySelector('.motion-sub'), badge = card.querySelector('.motion-badge'), play = card.querySelector('.motion-play-tag');
      if (titleNode) titleNode.textContent = title;
      if (subNode) subNode.textContent = sub;
      if (badge) badge.textContent = `0${moduleIndex + 1} · ${title}`;
      if (play) play.textContent = '• Xylen audit flow';
      if (moduleIndex === 0) card.querySelectorAll('.radar-point').forEach(point => point.remove());
      if (moduleIndex === 2) { const lock = card.querySelector('.shield-lock'); if (lock) lock.textContent = '✓'; }
      if (moduleIndex === 3) { const tower = card.querySelector('.tower-beacon'); if (tower) tower.textContent = '↗'; }
      if (moduleIndex === 4) { const meter = card.querySelector('.meter-txt'); if (meter) meter.textContent = 'CLIENT REPORT'; }
    });
    window.openMotionModal = function (moduleId) {
      const labels = {
        'mod-spectrum': ['Сведения о сети', 'Android передаёт только выбранного оператора в audit endpoint. Идентификаторы вышки и уровни радиосигнала в него не включены.'],
        'mod-deltastream': ['Формат отчёта', 'Веб API принимает JSON-события Android. Передача в пакетах 24 байта или сжатие 96.4% этим сайтом не реализованы.'],
        'mod-vault': ['Доступ к журналу', 'Детальные записи закрыты серверной проверкой Cloudflare Access и email владельца. Эта проверка не подтверждает шифрование хранилища на устройстве.'],
        'mod-celltower': ['SIM и радиоданные', 'Текущий сайт не получает список SIM-слотов, CID/TAC или уровни сигнала. Эти сведения нельзя показать в мониторинге.'],
        'mod-billing': ['Счётчики клиента', 'Сайт суммирует присланные счётчики трафика за день. Сверки с биллингом оператора или проверки списаний нет.']
      };
      const english = {
        'mod-spectrum': ['Network data', 'Android reports only the selected carrier to this audit endpoint. Cell identifiers and radio-signal levels are not included.'],
        'mod-deltastream': ['Report format', 'The web API accepts Android JSON events. This site does not implement 24-byte packets or 96.4% compression.'],
        'mod-vault': ['Journal access', 'Detailed records require Cloudflare Access verification and the owner email. This does not establish encryption at rest on devices.'],
        'mod-celltower': ['SIM and radio data', 'This site does not receive SIM-slot lists, CID/TAC, or signal levels. Those values cannot appear in monitoring.'],
        'mod-billing': ['Client counters', 'The site aggregates client-submitted daily traffic counters. It does not reconcile carrier bills or verify charges.']
      };
      const uzbek = {
        'mod-spectrum': ['Tarmoq ma’lumotlari', 'Android audit endpointiga faqat tanlangan operatorni yuboradi. Stansiya IDsi va signal darajasi kiritilmaydi.'],
        'mod-deltastream': ['Hisobot formati', 'Veb API Android JSON hodisalarini qabul qiladi. Ushbu sayt 24 baytli paket yoki 96.4% siqishni ishlatmaydi.'],
        'mod-vault': ['Jurnalga kirish', 'Batafsil yozuvlar Cloudflare Access va egasi emaili orqali tekshiriladi. Bu qurilmadagi ma’lumot shifrlanishini anglatmaydi.'],
        'mod-celltower': ['SIM va radio ma’lumotlari', 'Sayt SIM ro‘yxati, CID/TAC yoki signal darajasini olmaydi. Bu qiymatlar monitoringda ko‘rinmaydi.'],
        'mod-billing': ['Mijoz hisoblagichlari', 'Sayt mijoz yuborgan kunlik trafikni jamlaydi. Operator to‘lovlarini tekshirmaydi yoki solishtirmaydi.']
      };
      const item = (lang === 'en' ? english : lang === 'uz' ? uzbek : labels)[moduleId] || [copy.traffic, copy.intro];
      const modal = document.getElementById('motion-modal');
      const title = document.getElementById('motion-modal-title');
      const body = document.getElementById('motion-modal-body');
      if (title) title.textContent = item[0];
      if (body) body.innerHTML = `<p>${escapeHtml(item[1])}</p>`;
      modal?.classList.add('active');
    };
    const page = document.getElementById('page-traffic');
    if (page) page.innerHTML = `<div class="container devices-page traffic-page"><header class="section-title-strip"><div><span class="eyebrow">ANDROID · CLIENT REPORTS</span><h1 class="section-heading">${copy.traffic}</h1><p class="section-desc">${copy.intro}</p></div></header><div class="audit-kpi-bar"><div class="audit-kpi-pill"><span class="kpi-label">${copy.active}</span><strong class="kpi-val cyan" id="traffic-active-devices">—</strong></div><div class="audit-kpi-pill"><span class="kpi-label">${copy.day}</span><strong class="kpi-val green" id="traffic-public-today">—</strong></div><div class="audit-kpi-pill"><span class="kpi-label">${copy.events}</span><strong class="kpi-val" id="traffic-public-events">—</strong></div><div class="audit-kpi-pill"><span class="kpi-label">${copy.speed}</span><strong class="kpi-val" id="traffic-public-speed">${copy.unavailable}</strong></div></div><div class="device-summary-panel"><div class="device-summary-mark" aria-hidden="true"><span></span><span></span><span></span></div><p>${copy.note}</p></div></div>`;
    const kpiCopy = {
      ru: [['Отчёты Android','После согласия'],['SIM-данные не передаются','Нет списка SIM-слотов'],['Счётчики клиента','Отправлено приложением'],['Мгновенная скорость','Не передаётся API']],
      en: [['Android reports','After consent'],['SIM data not reported','No SIM-slot list'],['Client counters','Submitted by the app'],['Instant speed','Not sent by API']],
      uz: [['Android hisobotlari','Rozilikdan so‘ng'],['SIM ma’lumoti yuborilmaydi','SIM ro‘yxati yo‘q'],['Mijoz hisoblagichlari','Ilova yuborgan'],['Oniy tezlik','APIga yuborilmaydi']]
    }[lang];
    ['kpi-devices-count','kpi-sims-count','kpi-traffic-count','kpi-speed-count'].forEach((id, index) => {
      const card = document.getElementById(id)?.closest('.kpi-card');
      const tag = card?.querySelector('.kpi-tag'), sub = card?.querySelector('.kpi-sub');
      if (tag) tag.textContent = kpiCopy[index][0];
      if (sub) sub.textContent = kpiCopy[index][1];
    });
    if (latestSummary) {
      const set = (id, value) => { const node = document.getElementById(id); if (node) node.textContent = value; };
      set('traffic-active-devices', Number(latestSummary.onlineUsersCount) || 0);
      set('traffic-public-today', formatBytes(latestSummary.todayBytes));
      set('traffic-public-events', Number(latestSummary.activityCount) || 0);
      set('traffic-public-speed', copy.unavailable);
    }
  }

  function renderOwnerConsole(data) {
    const root = document.querySelector('#page-admin .container');
    if (!root) return;
    const users = Array.isArray(data.users) ? data.users : [];
    const events = Array.isArray(data.recentActivities) ? data.recentActivities : [];
    root.innerHTML = `
      <header class="section-title-strip"><div><span class="eyebrow">ДОСТУП ВЛАДЕЛЬЦА</span><h1 class="section-heading">Консоль устройств</h1><p class="section-desc">Записи поступают с Android-клиентов после согласия на телеметрию. Время активности определяется по последнему полученному событию.</p></div><button class="btn btn-secondary btn-compact" id="owner-refresh">Обновить</button></header>
      <div class="audit-kpi-bar"><div class="audit-kpi-pill"><span class="kpi-label">Устройства</span><strong class="kpi-val">${users.length}</strong></div><div class="audit-kpi-pill"><span class="kpi-label">Активны · 75 секунд</span><strong class="kpi-val cyan">${users.filter(x => x.status === 'online').length}</strong></div><div class="audit-kpi-pill"><span class="kpi-label">События в журнале</span><strong class="kpi-val">${events.length}</strong></div></div>
      <section class="owner-table-section"><h2>Устройства</h2><div class="table-responsive"><table class="data-table"><thead><tr><th>Состояние</th><th>Идентификатор</th><th>Модель</th><th>Экран</th><th>Сеть</th><th>Сегодня</th><th>Последнее событие</th></tr></thead><tbody>${users.length ? users.map(u => `<tr><td>${escapeHtml(u.status === 'online' ? 'Активно' : 'Нет связи')}</td><td><code>${escapeHtml(u.userId)}</code></td><td>${escapeHtml(u.model || '—')} · ${escapeHtml(u.platform || '—')}</td><td>${escapeHtml(u.currentScreen || '—')}</td><td>${escapeHtml(u.carrier || '—')}</td><td>${escapeHtml(formatBytes(u.todayBytes))}</td><td>${escapeHtml(u.lastSeenIso ? new Date(u.lastSeenIso).toLocaleString() : '—')}</td></tr>`).join('') : '<tr><td colspan="7">Нет устройств, передавших данные.</td></tr>'}</tbody></table></div></section>
      <section class="owner-table-section"><h2>Журнал действий</h2><div class="table-responsive"><table class="data-table"><thead><tr><th>Время</th><th>Устройство</th><th>Экран</th><th>Действие</th><th>Детали</th><th>Трафик</th></tr></thead><tbody>${events.length ? events.map(e => `<tr><td>${escapeHtml(e.timeDisplay || (e.timestamp ? new Date(e.timestamp).toLocaleString() : '—'))}</td><td>${escapeHtml(e.userId || '—')}</td><td>${escapeHtml(e.screen || '—')}</td><td>${escapeHtml(e.action || '—')}</td><td>${escapeHtml(e.details || '—')}</td><td>${escapeHtml(formatBytes(e.bytesDelta))}</td></tr>`).join('') : '<tr><td colspan="6">Событий пока нет.</td></tr>'}</tbody></table></div></section>
      <p class="data-scope-note">Передаются только поля, отправляемые Android-клиентом. Сведения об отдельных SIM-слотах, CID/TAC и радиосигнале этим API не получает.</p>`;
    document.getElementById('owner-refresh')?.addEventListener('click', loadOwnerConsole);
  }

  async function loadOwnerConsole() {
    try {
      const response = await fetch('/api/admin', { cache: 'no-store', headers: { Accept: 'application/json' } });
      const type = response.headers.get('content-type') || '';
      if (!response.ok || !type.includes('application/json')) throw new Error('Owner sign-in required');
      const data = await response.json();
      if (!data.ok) throw new Error('Owner sign-in required');
      ownerAudit = data;
      ownerReady = true;
      window.switchPage('page-admin');
      renderOwnerConsole(ownerAudit);
    } catch (_) {
      ownerReady = false;
      if (location.pathname === '/manager') {
        if (window.showToast) window.showToast('Доступ не настроен или эта учётная запись не является владельцем.');
        return;
      }
      location.assign('/manager');
    }
  }

  window.requestAdminConsole = loadOwnerConsole;
  window.logoutAdminConsole = function () {
    ownerReady = false;
    ownerAudit = null;
    window.switchPage('page-overview');
    window.showToast?.('Консоль закрыта. Завершите сеанс Cloudflare Access в браузере, если он больше не нужен.');
  };
  window.injectTestRealDevice = function () { window.showToast?.('Демонстрационные устройства отключены.'); };
  window.clearAllDevices = function () { window.showToast?.('Удаление устройств недоступно из публичной панели.'); };
  window.regeneratePairingToken = function () {};

  document.addEventListener('DOMContentLoaded', () => {
    window.requestAdminConsole = loadOwnerConsole;
    window.logoutAdminConsole = function () {
      ownerReady = false;
      ownerAudit = null;
      window.switchPage('page-overview');
      window.showToast?.('Консоль закрыта. Завершите сеанс Cloudflare Access в браузере, если он больше не нужен.');
    };
    window.injectTestRealDevice = function () { window.showToast?.('Демонстрационные устройства отключены.'); };
    window.clearAllDevices = function () { window.showToast?.('Удаление устройств недоступно из публичной панели.'); };
    window.regeneratePairingToken = function () {};
    window.submitAdminPin = function () {};
    window.closeAdminPinModal = function () {};
    window.toggleNavDrawer = function (open) {
      const drawer = document.getElementById('compact-nav-drawer');
      const trigger = document.getElementById('compact-hamburger-btn-header');
      if (!drawer) return;
      const shouldOpen = open !== undefined ? Boolean(open) : !drawer.classList.contains('active');
      drawer.classList.toggle('active', shouldOpen);
      trigger?.setAttribute('aria-expanded', String(shouldOpen));
      if (shouldOpen) drawer.querySelector('.drawer-close-btn')?.focus();
      else if (document.activeElement && drawer.contains(document.activeElement)) trigger?.focus();
    };
    renderPublicPage();
    document.getElementById('audit-kpi-total-users')?.closest('.audit-kpi-bar')?.remove();
    document.querySelector('#page-overview .user-audit-section')?.remove();
    document.querySelector('#page-overview .audit-columns-row')?.remove();
    renderInfoPages();
    renderOperationalCopy();
    fetchPublicSummary();
    if (location.hash === '#admin') loadOwnerConsole();

    window.addEventListener('xylen:lang-changed', () => { renderInfoPages(); renderOperationalCopy(); });
    const header = document.getElementById('top-navbar');
    let previousY = window.scrollY;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 120 && y > previousY + 4) header?.classList.add('navbar-hidden');
        else if (y < previousY - 4 || y < 50) header?.classList.remove('navbar-hidden');
        previousY = y;
        ticking = false;
      });
    }, { passive: true });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') window.toggleNavDrawer?.(false); });
    let lastPublicFetchAt = 0;
    window.addEventListener('xylen:audit-sync', () => {
      if (Date.now() - lastPublicFetchAt < 8000) return;
      lastPublicFetchAt = Date.now();
      fetchPublicSummary();
    });
    window.addEventListener('xylen:live-pulse', () => { if (latestSummary) updateSummary(latestSummary); });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    animateHeroField();
  });

  function animateHeroField() {
    const canvas = document.getElementById('hero-field');
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const hero = canvas.parentElement;
    let width = 0, height = 0, frame = 0;
    let pointerX = 0.5, pointerY = 0.45, targetX = 0.5, targetY = 0.45;
    const points = Array.from({ length: 38 }, (_, index) => ({
      x: ((index * 0.61803398875) % 1), y: ((index * 0.754877666) % 1),
      phase: index * 0.73, radius: index % 7 === 0 ? 1.8 : 1.1
    }));
    const resize = () => {
      const box = hero.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      width = box.width; height = box.height;
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    new ResizeObserver(resize).observe(hero);
    hero.addEventListener('pointermove', event => {
      const box = hero.getBoundingClientRect();
      targetX = (event.clientX - box.left) / box.width;
      targetY = (event.clientY - box.top) / box.height;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { targetX = 0.5; targetY = 0.45; }, { passive: true });
    function draw(time) {
      frame = requestAnimationFrame(draw);
      if (document.hidden) return;
      pointerX += (targetX - pointerX) * 0.025;
      pointerY += (targetY - pointerY) * 0.025;
      context.clearRect(0, 0, width, height);
      const nodes = points.map(point => {
        const drift = Math.sin(time * 0.00018 + point.phase) * 0.006;
        return { x: (point.x + pointerX * 0.018 + drift) * width, y: (point.y + pointerY * 0.018 + drift) * height, r: point.radius };
      });
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const distance = Math.hypot(dx, dy);
        if (distance < 150) {
          context.strokeStyle = `rgba(99,190,222,${(1 - distance / 150) * 0.17})`;
          context.lineWidth = 0.7; context.beginPath(); context.moveTo(nodes[i].x, nodes[i].y); context.lineTo(nodes[j].x, nodes[j].y); context.stroke();
        }
      }
      nodes.forEach(node => { context.fillStyle = 'rgba(151,222,240,0.52)'; context.beginPath(); context.arc(node.x, node.y, node.r, 0, Math.PI * 2); context.fill(); });
    }
    frame = requestAnimationFrame(draw);
  }
})();
