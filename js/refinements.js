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
      if (status) status.textContent = ({ ru: 'Сводка обновлена', en: 'Summary updated', uz: 'Jamlanma yangilandi' })[window.i18n?.currentLang || 'ru'];
    } catch (_) {
      latestSummary = null;
      if (status) status.textContent = ({ ru: 'Серверная сводка недоступна', en: 'Server summary unavailable', uz: 'Server jamlanmasi mavjud emas' })[window.i18n?.currentLang || 'ru'];
      ['device-kpi-total-users','device-kpi-online-users','device-kpi-total-spend','device-kpi-total-actions','traffic-delta-size','traffic-live-today','traffic-live-speed','traffic-active-devices','traffic-public-today','traffic-public-events','traffic-public-speed','traffic-last-received','kpi-sims-count','kpi-speed-count','kpi-traffic-count','kpi-devices-count'].forEach(id => {
        const node = document.getElementById(id);
        if (node) node.textContent = '—';
      });
      const state = document.getElementById('public-audit-state');
      if (state) state.textContent = ({ ru: 'Серверная сводка недоступна', en: 'Server summary unavailable', uz: 'Server jamlanmasi mavjud emas' })[window.i18n?.currentLang || 'ru'];
      const last = document.getElementById('public-audit-last-event');
      if (last) last.textContent = '—';
      const chartStatus = document.getElementById('traffic-chart-status');
      if (chartStatus) chartStatus.textContent = ({ ru: 'Не удалось загрузить данные. Попробуйте обновить позже.', en: 'Data could not be loaded. Try again later.', uz: 'Ma’lumot yuklanmadi. Keyinroq qayta urinib ko‘ring.' })[window.i18n?.currentLang || 'ru'];
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
    set('traffic-public-today', Number(data.totalUsersCount) > 0 ? formatBytes(data.todayBytes) : '—');
    set('traffic-public-events', Number(data.activityCount) || 0);
    set('traffic-public-speed', ({ ru: 'Не передаётся', en: 'Not reported', uz: 'Yuborilmaydi' })[window.i18n?.currentLang || 'ru']);
    renderTrafficChart(data);
    set('traffic-last-received', data.lastActivityAt ? new Date(data.lastActivityAt).toLocaleString() : '—');
    set('kpi-sims-count', '—');
    set('kpi-speed-count', '—');
    set('kpi-traffic-count', formatBytes(data.todayBytes));
    set('kpi-devices-count', Number(data.totalUsersCount) || 0);
    const state = document.getElementById('public-audit-state');
    if (state) {
      const lang = window.i18n?.currentLang || 'ru';
      state.textContent = data.totalUsersCount
        ? lang === 'ru' ? `${data.totalUsersCount} устройств отправляли отчёты · ${data.onlineUsersCount} активны за последние 75 секунд` : lang === 'uz' ? `${data.totalUsersCount} qurilma hisobot yubordi · ${data.onlineUsersCount} tasi so‘nggi 75 soniyada faol` : `${data.totalUsersCount} devices have reported · ${data.onlineUsersCount} active in the last 75 seconds`
        : ({ ru: 'Пока нет устройств, передавших данные с Android-клиента.', en: 'No Android devices have reported yet.', uz: 'Hozircha Android qurilmalari hisobot yubormagan.' })[lang];
    }
    const latest = document.getElementById('public-audit-last-event');
    if (latest) latest.textContent = data.lastActivityAt ? new Date(data.lastActivityAt).toLocaleString() : 'Событий пока нет';
  }

  function renderTrafficChart(data) {
    const status = document.getElementById('traffic-chart-status');
    const plot = document.getElementById('traffic-chart-plot');
    if (!status || !plot) return;
    const points = Array.isArray(data.trafficSeries) ? data.trafficSeries.filter(point => Number.isFinite(Number(point.timestamp)) && Number.isFinite(Number(point.bytes))) : [];
    if (!points.length) {
      plot.hidden = true;
      status.hidden = false;
      status.textContent = ({ ru: 'Пока нет подтверждённых показаний Android за последние 24 часа.', en: 'No confirmed Android readings are available for the last 24 hours yet.', uz: 'So‘nggi 24 soat uchun tasdiqlangan Android ko‘rsatkichlari hozircha yo‘q.' })[window.i18n?.currentLang || 'ru'];
      return;
    }
    status.hidden = true;
    plot.hidden = false;
    const width = 840, height = 300, left = 72, right = 22, top = 18, bottom = 48;
    const minX = Math.min(...points.map(point => Number(point.timestamp)));
    const maxX = Math.max(...points.map(point => Number(point.timestamp)));
    const maxBytes = Math.max(1, ...points.map(point => Number(point.bytes)));
    const maxMb = Math.ceil(maxBytes / (1024 * 1024) / 5) * 5 || 1;
    const x = timestamp => left + (Number(timestamp) - minX) / Math.max(1, maxX - minX) * (width - left - right);
    const y = bytes => height - bottom - Number(bytes) / (maxMb * 1024 * 1024) * (height - top - bottom);
    const line = points.map((point, index) => `${index ? 'L' : 'M'}${x(point.timestamp).toFixed(1)},${y(point.bytes).toFixed(1)}`).join(' ');
    const lang = window.i18n?.currentLang || 'ru';
    const yUnit = lang === 'ru' ? 'МБ' : 'MB';
    const yTicks = Array.from({ length: 5 }, (_, index) => maxMb * index / 4);
    const xTicks = Array.from({ length: 5 }, (_, index) => minX + (maxX - minX) * index / 4);
    plot.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${lang === 'ru' ? 'График мобильных данных по времени получения отчётов Android' : lang === 'uz' ? 'Android hisobotlari bo‘yicha mobil trafik grafigi' : 'Android-reported cellular data over time'}"><g class="chart-grid">${yTicks.map(value => `<line x1="${left}" y1="${y(value * 1024 * 1024)}" x2="${width-right}" y2="${y(value * 1024 * 1024)}"/><text x="${left-12}" y="${y(value * 1024 * 1024)+4}" text-anchor="end">${value.toFixed(value % 1 ? 1 : 0)} ${yUnit}</text>`).join('')}${xTicks.map(time => `<text x="${x(time)}" y="${height-16}" text-anchor="middle">${new Date(time).toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })}</text>`).join('')}</g><path class="traffic-chart-line" d="${line}"/>${points.map(point => `<circle class="traffic-chart-point" cx="${x(point.timestamp)}" cy="${y(point.bytes)}" r="3.5"><title>${new Date(point.timestamp).toLocaleString()} · ${formatBytes(point.bytes)}</title></circle>`).join('')}</svg>`;
  }

  function renderPublicPage() {
    const page = document.getElementById('page-devices');
    if (!page) return;
    const lang = window.i18n?.currentLang || 'ru';
    const c = lang === 'ru' ? ['ИСТОРИЯ РАСХОДА','История расхода','Отчёты Android, число устройств, активность и сотовый расход за день. Подробная история доступна владельцу.','Проверка соединения…','Обновить','Устройств с данными','Активны сейчас','Трафик сегодня','Получено событий','ПОСЛЕДНИЕ ДАННЫЕ','Последний отчёт:','Сводка загружается…','Публичная сводка не раскрывает SIM-профили. Владелец видит только слот, оператора, тип SIM/eSIM и мобильный счётчик без ICCID/IMSI. Отчёты Android отправляются после согласия; журнал iOS остаётся локальным.']
      : lang === 'uz' ? ['SARF TARIXI','Sarf tarixi','Android hisobotlari, qurilmalar soni, faollik va bugungi mobil sarf. Batafsil tarix egaga kirgandan so‘ng ko‘rinadi.','Ulanish tekshirilmoqda…','Yangilash','Hisobot yuborgan qurilmalar','Hozir faol','Bugungi trafik','Qabul qilingan hodisalar','SO‘NGGI MA’LUMOT','So‘nggi hisobot:','Jamlanma yuklanmoqda…','Ochiq jamlanma SIM profillarini ko‘rsatmaydi. Ega ICCID/IMSIisiz faqat slot, operator, SIM/eSIM turi va mobil hisoblagichni ko‘radi. Android rozilikdan keyin hisobot yuboradi; iOS jurnali qurilmada qoladi.']
        : ['USAGE HISTORY','Usage history','Android reports, device counts, recent activity, and cellular use today. Detailed history is available to the owner.','Checking connection…','Refresh','Devices reported','Active now','Traffic today','Events received','LATEST DATA','Last report:','Loading summary…','The public summary does not expose SIM profiles. The owner sees slot, carrier, SIM/eSIM type, and cellular counters without ICCID/IMSI. Android reports require consent; the iOS log stays on-device.'];
    page.innerHTML = `
      <div class="container devices-page">
        <header class="section-title-strip reveal-on-scroll">
          <div><span class="eyebrow">${c[0]}</span><h1 class="section-heading">${c[1]}</h1>
          <p class="section-desc">${c[2]}</p></div>
          <div class="device-toolbar"><span class="card-status-badge" id="public-audit-status">${c[3]}</span><button class="btn btn-secondary btn-compact" id="refresh-public-audit">${c[4]}</button></div>
        </header>
        <div class="audit-kpi-bar public-kpis">
          <div class="audit-kpi-pill"><span class="kpi-label">${c[5]}</span><strong class="kpi-val" id="device-kpi-total-users">—</strong></div>
          <div class="audit-kpi-pill"><span class="kpi-label">${c[6]}</span><strong class="kpi-val cyan" id="device-kpi-online-users">—</strong></div>
          <div class="audit-kpi-pill"><span class="kpi-label">${c[7]}</span><strong class="kpi-val green" id="device-kpi-total-spend">—</strong></div>
          <div class="audit-kpi-pill"><span class="kpi-label">${c[8]}</span><strong class="kpi-val" id="device-kpi-total-actions">—</strong></div>
        </div>
        <section class="device-summary-panel" aria-live="polite">
          <div class="device-summary-mark" aria-hidden="true"><span></span><span></span><span></span></div>
          <div><span class="eyebrow">${c[9]}</span><p id="public-audit-state">${c[11]}</p><small>${c[10]} <time id="public-audit-last-event">—</time></small></div>
        </section>
        <p class="data-scope-note">${c[12]}</p>
      </div>`;
    const toolbar = page.querySelector('.device-toolbar');
    if (toolbar) {
      const ownerButton = document.createElement('button');
      ownerButton.type = 'button';
      ownerButton.className = 'btn btn-secondary btn-compact';
      ownerButton.dataset.i18n = 'history_owner_link';
      ownerButton.textContent = window.i18n?.t('history_owner_link') || 'Detailed activity log';
      ownerButton.addEventListener('click', () => window.requestAdminConsole?.());
      toolbar.appendChild(ownerButton);
    }
    document.getElementById('refresh-public-audit')?.addEventListener('click', fetchPublicSummary);
    fetchPublicSummary();
  }

  function renderInfoPages() {
    const lang = window.i18n?.currentLang || 'ru';
    const copy = {
      ru: {
        nav: 'Главная', device: 'Обзор устройства', about: 'О платформе',
        aboutIntro: 'Xylen объединяет Android-клиент и веб-панель для просмотра событий приложения и счётчиков сотовой загрузки, которые клиент отправил с согласия пользователя.',
        aboutPurpose: 'Назначение платформы',
        aboutPurposeText: 'Панель помогает владельцу увидеть зарегистрированные Android-устройства, недавние отчёты, дневные счётчики и действия, сообщённые приложением. Публичная часть показывает только агрегированные сведения.',
        aboutFlow: 'Как устроен обмен данными',
        aboutFlowText: 'После согласия Android отправляет JSON-отчёт в /api/audit по HTTPS. Cloudflare Pages Function принимает его; постоянное хранение использует настроенный KV binding. Подробные записи доступны только после проверки Cloudflare Access и email владельца.',
        aboutLimits: 'Границы возможностей',
        aboutLimitsText: 'Сайт показывает значения, сообщённые клиентом, и не проверяет их независимо. Он не измеряет скорость радио в реальном времени и не получает данные о вышках. Найденный исходный код iOS хранит журнал локально и не отправляет его в этот веб API.',
        privacy: 'Конфиденциальность',
        privacyIntro: 'Ниже описан поток данных в изученных версиях сайта и мобильных клиентов. Это техническая информация, а не юридическое заключение; оператор должен определить применимые требования и основания обработки.',
        privacyData: 'Android после согласия отправляет идентификатор установки, модель и платформу, имя тестировщика, экран, действие и детали, имя сотового оператора, дневной и сессионный счётчики, а также для каждого активного или использованного сегодня SIM-профиля номер слота, оператора, тип SIM/eSIM, признак активного профиля и мобильную загрузку за день. ICCID и IMSI в веб audit API не передаются. Счётчики формирует клиент и сервер независимо не проверяет.',
        privacyNot: 'Веб API получает только номер SIM-слота, оператора, тип SIM/eSIM и мобильный счётчик активных или использованных сегодня профилей; номер телефона, ICCID/IMSI, CID/TAC и уровни сигнала не отправляются. iOS хранит журнал локально. Отдельный Android portal API может передавать записи на p.xylen.workers.dev при настроенном ключе.',
        privacyUse: 'Сведения используются для отображения сводки и, владельцем, для разбора полученных событий и показаний счётчиков. Публичный endpoint возвращает только число зарегистрированных устройств, число недавних активных устройств, сумму присланных счётчиков и размер журнала. Подробный endpoint требует JWT Cloudflare Access, действующую аудиторию и совпадение email с настроенным email владельца.',
        privacyKeep: 'На сервере сохраняется последняя запись по каждому ID устройства до удаления из хранилища оператором. Журнал ограничен последними 200 событиями. Отключение согласия останавливает последующую отправку из клиента, но само по себе не стирает уже сохранённые записи; в текущей веб-панели пользовательского удаления нет.',
        privacySecurity: 'Передача идёт по HTTPS. Дополнительные заявления о месте хранения, сквозном шифровании, сертификации, соблюдении конкретного закона или сроке удаления не делаются: это зависит от фактических настроек Cloudflare и процедур оператора.',
        privacyScopeTitle: 'Что не передаётся в веб-аудит',
        data: 'Данные Android-отчёта', limits: 'Границы сбора', use: 'Назначение и доступ', keep: 'Хранение и удаление', security: 'Защита и правовые сведения'
      },
      en: {
        nav: 'Home', device: 'Device overview', about: 'About the platform',
        aboutIntro: 'Xylen combines an Android client and a web console for viewing app events and cellular-download counters submitted with the user’s consent.',
        aboutPurpose: 'What the platform does',
        aboutPurposeText: 'The console helps the owner review registered Android devices, recent reports, daily counters, and actions reported by the app. The public view contains aggregate information only.',
        aboutFlow: 'How data moves',
        aboutFlowText: 'After consent, Android sends a JSON report to /api/audit over HTTPS. A Cloudflare Pages Function accepts it; persistent storage uses the configured KV binding. Detailed records require Cloudflare Access verification and a matching owner email.',
        aboutLimits: 'Current boundaries',
        aboutLimitsText: 'The site displays client-reported values and does not independently verify them. It does not measure live radio speed or receive cell-tower data. The reviewed iOS source keeps its activity log on-device and does not send it to this web API.',
        aboutAndroid: 'With consent enabled, Android posts a persistent random installation ID, model, tester-provided name, screen, action and text details, carrier, daily cellular-download counter, and active or used-today SIM profiles (slot, carrier, SIM/eSIM type, active state, and daily download counter) to /api/audit. ICCID and IMSI are not sent to this API. Values are client-reported and not independently verified by the server.',
        aboutStorage: 'A Cloudflare Pages Function accepts reports, and the site configuration binds it to Cloudflare KV. The public screen receives aggregate counts only. Detailed records use a separate endpoint that verifies a signed Cloudflare Access JWT and the owner email.',
        aboutLimits: 'The web API receives slot information only for profiles active or used today, carrier, SIM/eSIM type, and daily cellular-download counter. ICCID, IMSI, cell IDs, and radio measurements are not sent. Android also has a separate portal API on another server with its own key. The reviewed iOS audit remains on-device.',
        aboutMotion: 'Mobile operating systems limit background execution and access to SIM, cell, and radio identifiers. The site therefore does not claim continuous discovery, measured live radio speed, or cell measurements that the web API does not receive.',
        privacy: 'Privacy',
        privacyIntro: 'This page describes the data flow in the reviewed website and mobile-client source. It is technical information, not legal advice; the operator should determine applicable requirements and lawful bases.',
        privacyData: 'After consent, Android sends an installation ID, model, tester name, screen, action and details, carrier, daily and session counters, and profiles active now or used today (slot, carrier, SIM/eSIM type, active state, and daily cellular-download counter). ICCID and IMSI are not sent to the web audit API. Values are client-reported and not independently verified.',
        privacyNot: 'The web audit API does not receive phone numbers, ICCID, IMSI, cell IDs, or radio-signal measurements. The reviewed iOS source stores its activity log on-device. A separate Android portal API may send account-related records to another service when configured; it is not this website’s audit API.',
        privacyUse: 'The data supports an aggregate public summary and an owner-only review of reported events and counters. The public endpoint returns counts, a sum of submitted counters, and the retained event count. The detailed endpoint requires a valid Cloudflare Access JWT, configured audience, and a matching configured owner email.',
        privacyKeep: 'The server keeps the latest record for each device ID until the operator removes it from storage. The activity log is limited to the latest 200 events. Revoking consent stops later client uploads; it does not erase previously stored records. The current web console has no user-facing deletion control.',
        privacySecurity: 'Data is transmitted over HTTPS. No claims are made here about storage location, end-to-end encryption, certification, legal compliance, or deletion deadlines; those depend on the actual Cloudflare configuration and operator procedures.',
        privacyScopeTitle: 'What the web audit does not receive',
        data: 'Android report data', limits: 'Collection boundaries', use: 'Purpose and access', keep: 'Retention and deletion', security: 'Security and legal notes'
      },
      uz: {
        nav: 'Asosiy', device: 'Qurilma sharhi', about: 'Platforma haqida',
        aboutIntro: 'Xylen Android mijoz ilovasi va veb-panelni birlashtirib, foydalanuvchi roziligi bilan yuborilgan ilova hodisalari hamda mobil yuklab olish hisoblagichlarini ko‘rsatadi.',
        aboutPurpose: 'Platformaning vazifasi',
        aboutPurposeText: 'Panel egasiga ro‘yxatdan o‘tgan Android qurilmalari, so‘nggi hisobotlar, kunlik hisoblagichlar va ilova yuborgan amallarni ko‘rishga yordam beradi. Ochiq qism faqat umumiy ma’lumotlarni ko‘rsatadi.',
        aboutFlow: 'Ma’lumot uzatish tartibi',
        aboutFlowText: 'Rozilikdan keyin Android HTTPS orqali /api/audit manziliga JSON hisobot yuboradi. Uni Cloudflare Pages Function qabul qiladi; doimiy saqlash sozlangan KV binding orqali ishlaydi. Batafsil yozuvlar Cloudflare Access va egasi emaili tekshirilgandan keyin ochiladi.',
        aboutLimits: 'Joriy imkoniyatlar chegarasi',
        aboutLimitsText: 'Sayt mijoz yuborgan qiymatlarni ko‘rsatadi, ularni mustaqil tekshirmaydi. Jonli radio tezligi yoki baza stansiyalari ma’lumotlarini olmaydi. Ko‘rib chiqilgan iOS kodi jurnalni qurilmada saqlaydi va ushbu veb APIga yubormaydi.',
        aboutAndroid: 'Rozilik berilganda Android mijoz /api/audit manziliga doimiy tasodifiy o‘rnatish IDsi, model, sinovchi ismi, ekran, amal va matnli tafsilotlar, operator, kunlik mobil yuklab olish hisoblagichi hamda faol yoki bugun ishlatilgan SIM profillarining sloti, operatori, SIM/eSIM turi, faolligi va kunlik hisoblagichini yuboradi. ICCID va IMSI yuborilmaydi. Server bu qiymatlarni mustaqil tekshirmaydi.',
        aboutStorage: 'Cloudflare Pages Function hisobotlarni qabul qiladi va loyiha sozlamasi Cloudflare KV bilan bog‘laydi. Ochiq sahifa faqat umumiy sonlarni oladi. Batafsil yozuvlar imzolangan Cloudflare Access JWT va egasining emaili tekshiriladigan alohida endpoint orqali beriladi.',
        aboutLimits: 'Veb API faol yoki bugun ishlatilgan SIM profillarining sloti, operator, SIM/eSIM turi va kunlik mobil yuklab olish hisoblagichini oladi. ICCID, IMSI, baza stansiyasi IDlari va radio o‘lchovlari yuborilmaydi. Android portal API alohida server va kalitdan foydalanadi. iOS jurnali qurilmada qoladi.',
        aboutMotion: 'Mobil operatsion tizimlar fonda ishlash va SIM, baza stansiyasi hamda radio identifikatorlariga kirishni cheklaydi. Shu bois sayt doimiy qurilma aniqlash, o‘lchangan jonli radio tezligi yoki veb API olmaydigan baza stansiyasi o‘lchovlarini va’da qilmaydi.',
        privacy: 'Maxfiylik',
        privacyIntro: 'Bu sahifada ko‘rib chiqilgan sayt va mobil mijoz kodidagi ma’lumot oqimi bayon etiladi. Bu texnik ma’lumot, yuridik maslahat emas; operator qo‘llanadigan talablar va qayta ishlash asoslarini belgilashi kerak.',
        privacyData: 'Rozilikdan so‘ng Android o‘rnatish IDsi, model, sinovchi ismi, ekran, amal va tafsilotlar, operator, kunlik va sessiya hisoblagichlari, faol yoki bugun ishlatilgan SIM profillari (slot, operator, SIM/eSIM turi, faol holati va kunlik mobil yuklab olish hisoblagichi)ni yuboradi. ICCID va IMSI veb audit APIga yuborilmaydi. Qiymatlarni mijoz yuboradi, server mustaqil tekshirmaydi.',
        privacyNot: 'Veb audit API telefon raqami, ICCID, IMSI, baza stansiyasi IDlari yoki radio signal o‘lchovlarini olmaydi. Ko‘rib chiqilgan iOS kodi faoliyat jurnalini qurilmada saqlaydi. Alohida Android portal API sozlanganida boshqa xizmatga hisob yozuvlarini yuborishi mumkin; u ushbu sayt audit APIsi emas.',
        privacyUse: 'Ma’lumotlar umumiy ochiq jamlanma hamda egasining batafsil hodisalar va hisoblagichlarni ko‘rishi uchun ishlatiladi. Ochiq endpoint faqat sonlar, yuborilgan hisoblagichlar yig‘indisi va saqlangan hodisalar miqdorini qaytaradi. Batafsil endpoint amaldagi Cloudflare Access JWT, auditoriya va sozlangan egasi emailiga moslikni talab qiladi.',
        privacyKeep: 'Server har bir qurilma IDsi bo‘yicha so‘nggi yozuvni operator xotiradan o‘chirmaguncha saqlaydi. Hodisalar jurnali eng so‘nggi 200 yozuv bilan cheklangan. Rozilikni bekor qilish keyingi yuborishni to‘xtatadi, ammo avval saqlangan ma’lumotlarni o‘chirmaydi. Veb-panelda foydalanuvchi o‘chirish boshqaruvi yo‘q.',
        privacySecurity: 'Ma’lumot HTTPS orqali uzatiladi. Saqlash joyi, to‘liq shifrlash, sertifikat, qonunchilikka muvofiqlik yoki o‘chirish muddati haqida da’vo qilinmaydi; bular Cloudflare sozlamalari va operator jarayonlariga bog‘liq.',
        privacyScopeTitle: 'Veb audit olmaydigan ma’lumotlar',
        data: 'Android hisoboti', limits: 'Yig‘ish chegaralari', use: 'Maqsad va kirish', keep: 'Saqlash va o‘chirish', security: 'Xavfsizlik va huquqiy eslatma'
      }
    }[lang] || null;
    if (!copy) return;
    copy.privacyIntro += lang === 'ru'
      ? ' Перед запуском обработки оператору следует проверить применимость Закона Республики Узбекистан № ЗРУ-547 «О персональных данных», UK GDPR и Data Protection Act 2018; эта страница не подтверждает соблюдение этих актов.'
      : lang === 'uz'
        ? ' Qayta ishlashni boshlashdan oldin operator O‘zbekiston Respublikasining O‘RQ-547-son «Shaxsiy ma’lumotlar to‘g‘risida»gi Qonuni, UK GDPR va Data Protection Act 2018 qo‘llanishini tekshirishi kerak; ushbu sahifa ularga muvofiqlikni tasdiqlamaydi.'
        : ' Before processing begins, the operator should review whether Uzbekistan Law No. ZRU-547 on Personal Data, UK GDPR, and the Data Protection Act 2018 apply; this page does not certify compliance.';
    document.querySelectorAll('[data-i18n="nav_overview"]').forEach(node => { node.textContent = copy.nav; });
    document.querySelectorAll('[data-i18n="nav_devices"]').forEach(node => { node.textContent = copy.device; });
    const about = document.querySelector('#page-about .about-clean-card');
    if (about) about.innerHTML = `<span class="eyebrow">XYLEN PLATFORM</span><h1 class="section-heading">${copy.about}</h1><p class="about-body-text">${copy.aboutIntro}</p><section class="info-article"><h2>${copy.aboutPurpose}</h2><p>${copy.aboutPurposeText}</p></section><section class="info-article"><h2>${copy.aboutFlow}</h2><p>${copy.aboutFlowText}</p></section><section class="info-article"><h2>${copy.aboutLimits}</h2><p>${copy.aboutLimitsText}</p></section>`;
    const privacy = document.querySelector('#page-privacy .privacy-clean-card');
    if (privacy) privacy.innerHTML = `<span class="eyebrow">XYLEN PLATFORM</span><h1 class="section-heading">${copy.privacy}</h1><p class="section-desc">${copy.privacyIntro}</p><section class="legal-article-block"><h2 class="legal-title">${copy.data}</h2><p class="legal-text">${copy.privacyData}</p></section><section class="legal-article-block"><h2 class="legal-title">${copy.privacyScopeTitle}</h2><p class="legal-text">${copy.privacyNot}</p></section><section class="legal-article-block"><h2 class="legal-title">${copy.use}</h2><p class="legal-text">${copy.privacyUse}</p></section><section class="legal-article-block"><h2 class="legal-title">${copy.keep}</h2><p class="legal-text">${copy.privacyKeep}</p></section><section class="legal-article-block"><h2 class="legal-title">${copy.security}</h2><p class="legal-text">${copy.privacySecurity}</p></section>`;
  }

  function renderOperationalCopy() {
    const lang = window.i18n?.currentLang || 'ru';
    const copy = {
      ru: { cards: [['Данные Android','Оператор и сетевые сведения зависят от разрешений, устройства и версии ОС. Сайт не получает параметры сигнала или вышки.'],['События и счётчики','После согласия Android отправляет JSON-отчёты с действиями приложения и клиентскими счётчиками.'],['Доступ владельца','Подробные записи доступны владельцу после проверки Cloudflare Access.']], traffic:'Сотовые счётчики', intro:'Сводка отражает показания Android-клиента. Сервер не измеряет радиоканал в реальном времени.', active:'Устройства · последние 75 секунд', day:'Трафик за день', events:'Событий в журнале', speed:'Мгновенная скорость', unavailable:'Не передаётся', note:'iOS-журнал остаётся на устройстве. ICCID/IMSI и параметры сигнала или вышки веб-аудиту не передаются.', modules:[['Согласие и отчёт','Android отправляет отчёты только после согласия.'],['Поля события','ID установки, экран, действие, счётчики и SIM-профили, сообщённые клиентом.'],['Сводка','Публичный endpoint возвращает агрегированные числа.'],['Доступ владельца','Детальные записи защищает Cloudflare Access.'],['Журнал iOS','Изученный исходный код iOS хранит журнал локально.']] },
      en: { cards: [['Android-reported data','Carrier and network details depend on permissions, device, and OS. The website receives no signal or cell-tower measurements.'],['Events and counters','With consent, Android sends JSON reports containing app actions and client-reported counters.'],['Owner access','Detailed records are available to the owner after Cloudflare Access verification.']], traffic:'Cellular counters', intro:'This summary reflects readings submitted by Android. The server does not measure the radio channel live.', active:'Devices · last 75 seconds', day:'Traffic today', events:'Events retained', speed:'Instantaneous speed', unavailable:'Not reported', note:'The iOS log stays on-device. ICCID/IMSI and radio or cell measurements are not sent to web audit.', modules:[['Consent and report','Android sends reports only after consent.'],['Event fields','Install ID, screen, action, counters, and SIM profiles reported by the client.'],['Summary','The public endpoint returns aggregate counts.'],['Owner access','Cloudflare Access protects detailed records.'],['iOS activity log','The reviewed iOS source stores its log on-device.']] },
      uz: { cards: [['Android yuboradigan ma’lumotlar','Operator va tarmoq tafsilotlari ruxsat, qurilma va OTga bog‘liq. Sayt signal yoki baza stansiyasi o‘lchovlarini olmaydi.'],['Hodisalar va hisoblagichlar','Rozilik bo‘lsa Android ilova amallari va mijoz hisoblagichlari bo‘lgan JSON hisobotlarni yuboradi.'],['Ega kirishi','Batafsil yozuvlar egasi uchun Cloudflare Access tekshiruvidan keyin ochiladi.']], traffic:'Mobil tarmoq hisoblagichlari', intro:'Jamlanma Android mijoz yuborgan ko‘rsatkichlarni aks ettiradi. Server radio kanalni jonli o‘lchamaydi.', active:'Qurilmalar · so‘nggi 75 soniya', day:'Bugungi trafik', events:'Jurnaldagi hodisalar', speed:'Oniy tezlik', unavailable:'Yuborilmaydi', note:'iOS jurnali qurilmada qoladi. ICCID/IMSI va radio yoki baza stansiyasi o‘lchovlari veb auditga yuborilmaydi.', modules:[['Rozilik va hisobot','Android hisobotlarni faqat rozilikdan keyin yuboradi.'],['Hodisa maydonlari','O‘rnatish IDsi, ekran, amal, hisoblagichlar va mijoz yuborgan SIM profillari.'],['Jamlanma','Ochiq endpoint umumiy sonlarni qaytaradi.'],['Ega kirishi','Batafsil yozuvlar Cloudflare Access bilan himoyalanadi.'],['iOS jurnali','Ko‘rib chiqilgan iOS kodi jurnalni qurilmada saqlaydi.']] }
    }[lang];
    if (!copy) return;
    const homeCopy = {
      ru: ['Платформа собирает только согласованные отчёты Android: мобильные счётчики и события приложения. Параметры радиомодема и журнал iOS на сайт не передаются.', 'ПОДКЛЮЧЁННЫЕ КЛИЕНТЫ', 'Телеметрия, которая движется только по явному согласию.', ['Согласие','Мобильный счётчик','Доступ владельца']],
      en: ['The platform receives Android reports only after consent: cellular counters and app events. Radio-modem measurements and the iOS log are not sent to this site.', 'CONNECTED CLIENTS', 'Telemetry moves only when the user allows it.', ['Consent','Cellular counter','Owner access']],
      uz: ['Platforma Android hisobotlarini faqat rozilikdan so‘ng oladi: mobil hisoblagichlar va ilova hodisalari. Radio modem o‘lchovlari va iOS jurnali saytga yuborilmaydi.', 'ULANGAN MIJOZLAR', 'Telemetriya faqat foydalanuvchi roziligi bilan uzatiladi.', ['Rozilik','Mobil hisoblagich','Ega kirishi']]
    }[lang];
    const hero = document.querySelector('#page-overview .overview-hero-block');
    const heroTitle = hero?.querySelector('.hero-statement-title');
    const heroDesc = hero?.querySelector('.hero-statement-desc');
    const heroActions = hero?.querySelector('.hero-actions-row');
    if (hero) {
      hero.classList.add('silent-motion-hero');
      hero.querySelector('.hero-engineering-pillars')?.remove();
      hero.querySelector('.social-proof-strip')?.remove();
      let copyPanel = hero.querySelector('.silent-motion-copy');
      if (!copyPanel) {
        copyPanel = document.createElement('div');
        copyPanel.className = 'silent-motion-copy';
        if (heroTitle) copyPanel.append(heroTitle);
        if (heroDesc) copyPanel.append(heroDesc);
        if (heroActions) copyPanel.append(heroActions);
        hero.append(copyPanel);
      }
      let visual = hero.querySelector('.silent-motion-visual');
      if (!visual) { visual = document.createElement('div'); visual.className = 'silent-motion-visual'; hero.append(visual); }
      const stage = lang === 'ru'
        ? ['Согласие', 'Отчёт Android', 'Сводка', 'Доступ владельца']
        : lang === 'uz' ? ['Rozilik', 'Android hisoboti', 'Jamlanma', 'Ega kirishi']
          : ['Consent', 'Android report', 'Summary', 'Owner access'];
      visual.innerHTML = `<div class="silent-motion-orbit" aria-hidden="true"><div class="orbit-depth-plane"></div><div class="orbit-ring orbit-ring-a"></div><div class="orbit-ring orbit-ring-b"></div><div class="orbit-ring-c"></div><svg class="silent-motion-route" viewBox="0 0 600 600" aria-hidden="true"><defs><linearGradient id="xylen-route-glow"><stop stop-color="#6cecff" stop-opacity="0"/><stop offset=".46" stop-color="#70eaff"/><stop offset="1" stop-color="#67d9ff" stop-opacity="0"/></linearGradient><linearGradient id="xylen-route-violet"><stop stop-color="#af8cff" stop-opacity="0"/><stop offset=".54" stop-color="#c6a4ff"/><stop offset="1" stop-color="#af8cff" stop-opacity="0"/></linearGradient></defs><path d="M62 300C120 83 461 73 538 300S120 520 62 300Z"/><path d="M300 57C520 117 518 469 300 540S79 118 300 57Z"/><path class="route-highlight" d="M62 300C120 83 461 73 538 300S120 520 62 300Z"/><path class="route-highlight" d="M300 57C520 117 518 469 300 540S79 118 300 57Z"/></svg><div class="orbit-core"><span>XYLEN</span><small>SILENT MOTION</small></div>${stage.map((label, i) => `<span class="orbit-node orbit-node-${i + 1}"><b>0${i + 1}</b><small>${escapeHtml(label)}</small></span>`).join('')}<span class="orbit-sweep"></span></div><div class="motion-caption">${escapeHtml(homeCopy[2])}</div>`;
    }
    if (heroTitle) heroTitle.textContent = 'Silent Motion';
    if (heroDesc) heroDesc.textContent = homeCopy[0];
    document.querySelector('#page-overview .kpi-showcase-section')?.remove();
    const liveBadge = document.querySelector('.kpi-lead-badge');
    const liveTitle = document.querySelector('.kpi-lead-title');
    if (liveBadge) liveBadge.textContent = homeCopy[1];
    if (liveTitle) liveTitle.textContent = lang === 'ru' ? 'Счётчики, сообщённые клиентом' : lang === 'uz' ? 'Mijoz yuborgan hisoblagichlar' : 'Client-reported counters';
    const heroPrimary = document.querySelector('.btn-hero-primary-lg');
    if (heroPrimary) heroPrimary.textContent = lang === 'ru' ? 'Смотреть устройства' : lang === 'uz' ? 'Qurilmalarni ko‘rish' : 'View devices';
    document.querySelectorAll('.eng-pillar-card').forEach((card, index) => {
      const title = card.querySelector('.pillar-title'), desc = card.querySelector('.pillar-desc');
      const badge = card.querySelector('.pillar-badge');
      if (copy.cards[index]) { if (title) title.textContent = copy.cards[index][0]; if (desc) desc.textContent = copy.cards[index][1]; }
      if (badge && copy.cards[index]) badge.textContent = copy.cards[index][0];
    });
    const motionTitle = document.querySelector('.motion-carousel-section .section-heading');
    const motionSub = document.querySelector('.motion-carousel-section .section-desc');
     if (motionTitle) motionTitle.textContent = lang === 'ru' ? 'Путь данных' : lang === 'uz' ? 'Ma’lumotlar oqimi' : 'How the data flows';
     if (motionSub) motionSub.textContent = lang === 'ru' ? 'Схема обмена Android-отчётом и локального хранения журнала iOS' : lang === 'uz' ? 'Android hisoboti uzatilishi va iOS jurnalining mahalliy saqlanish sxemasi' : 'An illustration of Android reports and on-device iOS logs';
    const connectTitle = document.querySelector('.connect-title');
    if (connectTitle) connectTitle.textContent = lang === 'ru' ? 'Приём отчётов Android после согласия' : lang === 'uz' ? 'Rozilikdan so‘ng Android hisobotlarini qabul qilish' : 'Android reports received after consent';
    const connectDesc = document.querySelector('.connect-desc');
    if (connectDesc) connectDesc.textContent = lang === 'ru' ? 'Веб API принимает клиентские события и счётчики. iOS пока сохраняет журнал локально.' : lang === 'uz' ? 'Veb API mijoz hodisalari va hisoblagichlarini qabul qiladi. iOS jurnali hozircha qurilmada saqlanadi.' : 'The web API accepts client events and counters. iOS currently keeps its log on-device.';
    const brandTitle = document.getElementById('brand-badge-logo');
    if (brandTitle) brandTitle.title = 'Xylen Platform';
    const legacyMeta = document.querySelector('.section-title-strip + .connectivity-meta');
    if (legacyMeta) legacyMeta.textContent = '';
    window.dispatchEvent(new Event('resize'));
    document.querySelectorAll('.motion-card').forEach((card, index) => {
      const moduleIndex = index % copy.modules.length;
      const [title, sub] = copy.modules[moduleIndex];
      const titleNode = card.querySelector('.motion-title'), subNode = card.querySelector('.motion-sub'), badge = card.querySelector('.motion-badge'), play = card.querySelector('.motion-play-tag');
      if (titleNode) titleNode.textContent = title;
      if (subNode) subNode.textContent = sub;
      if (badge) badge.textContent = `0${moduleIndex + 1} · ${title}`;
      if (play) play.textContent = lang === 'ru' ? '↻ Анимированная схема' : lang === 'uz' ? '↻ Animatsion sxema' : '↻ Animated schematic';
      const videoFrame = card.querySelector('.motion-preview-box');
      let videoHeading = card.querySelector('.motion-video-heading');
      if (!videoHeading && videoFrame) {
        videoHeading = document.createElement('span');
        videoHeading.className = 'motion-video-heading';
        videoHeading.setAttribute('aria-hidden', 'true');
        videoFrame.appendChild(videoHeading);
      }
      if (videoHeading) videoHeading.textContent = title.toLocaleUpperCase(lang === 'uz' ? 'uz-UZ' : lang === 'en' ? 'en-US' : 'ru-RU');
      const videoIndex = card.querySelector('.motion-video-index');
      if (videoIndex) videoIndex.textContent = `XYLEN / ${lang === 'ru' ? 'ЭТАП' : lang === 'uz' ? 'BOSQICH' : 'STEP'} 0${moduleIndex + 1} / 05`;
      if (moduleIndex === 0) card.querySelectorAll('.radar-point').forEach(point => point.remove());
      if (moduleIndex === 2) { const lock = card.querySelector('.shield-lock'); if (lock) lock.textContent = '✓'; }
      if (moduleIndex === 3) { const tower = card.querySelector('.tower-beacon'); if (tower) tower.textContent = '↗'; }
      if (moduleIndex === 4) { const meter = card.querySelector('.meter-txt'); if (meter) meter.textContent = 'CLIENT REPORT'; }
    });
    window.openMotionModal = function (moduleId) {
      const labels = {
        'mod-spectrum': ['Согласие и отчёт', 'Android отправляет веб-аудит только после согласия пользователя.'],
        'mod-deltastream': ['Поля события', 'JSON-отчёт может включать ID установки, модель, экран, действие, детали, время и клиентские счётчики.'],
        'mod-vault': ['Публичная сводка', 'Открытая часть показывает агрегированные числа, а не подробные записи устройства.'],
        'mod-celltower': ['Доступ владельца', 'Подробные записи доступны после проверки Cloudflare Access и email владельца.'],
        'mod-billing': ['Журнал iOS', 'Изученная версия приложения iOS сохраняет события на устройстве; веб-аудит их не получает.']
      };
      const english = {
        'mod-spectrum': ['Consent and report', 'Android sends web-audit reports only after user consent.'],
        'mod-deltastream': ['Event fields', 'A JSON report can include an installation ID, model, screen, action, details, timestamp, and client-reported counters.'],
        'mod-vault': ['Public summary', 'The public view displays aggregate counts rather than detailed device records.'],
        'mod-celltower': ['Owner access', 'Detailed records require Cloudflare Access verification and a matching owner email.'],
        'mod-billing': ['iOS activity log', 'The reviewed iOS app stores activity events on-device; the web audit does not receive them.']
      };
      const uzbek = {
        'mod-spectrum': ['Rozilik va hisobot', 'Android veb audit hisobotlarini faqat foydalanuvchi roziligidan keyin yuboradi.'],
        'mod-deltastream': ['Hodisa maydonlari', 'JSON hisobotda o‘rnatish IDsi, model, ekran, amal, tafsilot, vaqt va mijoz hisoblagichlari bo‘lishi mumkin.'],
        'mod-vault': ['Ochiq jamlanma', 'Ochiq qism batafsil qurilma yozuvlarini emas, umumiy sonlarni ko‘rsatadi.'],
        'mod-celltower': ['Ega kirishi', 'Batafsil yozuvlar Cloudflare Access va egasining emaili tekshirilgandan keyin ochiladi.'],
        'mod-billing': ['iOS jurnali', 'Ko‘rib chiqilgan iOS ilovasi hodisalarni qurilmada saqlaydi; veb audit ularni olmaydi.']
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
    renderTrafficPage(copy, lang);
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
      set('traffic-public-today', Number(latestSummary.totalUsersCount) > 0 ? formatBytes(latestSummary.todayBytes) : '—');
      set('traffic-public-events', Number(latestSummary.activityCount) || 0);
      set('traffic-public-speed', copy.unavailable);
    }
  }

  function renderTrafficPage(copy, lang) {
    const page = document.getElementById('page-traffic');
    if (!page) return;
    const t = lang === 'ru' ? {
      chartTitle: 'Изменение расхода мобильных данных', chartEyebrow: 'СЕГОДНЯ · МОБИЛЬНАЯ ЗАГРУЗКА', range: 'Снимки отчётов за последние 24 часа', loading: 'Загружаем показания…',
      chartNote: 'График использует счётчики мобильной загрузки, присланные Android. Точки показывают время получения отчёта, а не непрерывное измерение. iOS в график не входит.',
      phoneList: 'Устройства и SIM-профили', locked: 'Подробный список телефонов и SIM-профилей виден только владельцу.', enter: 'Войти как владелец', device: 'Телефон', slot: 'Слот', carrier: 'Оператор', type: 'Тип', amount: 'Мобильная загрузка сегодня', state: 'Состояние', empty: 'Нет телефонов и SIM-профилей, приславших данные.'
    } : lang === 'uz' ? {
      chartTitle: 'Mobil trafik o‘zgarishi', chartEyebrow: 'BUGUN · MOBIL YUKLAB OLISH', range: 'So‘nggi 24 soatdagi hisobotlar', loading: 'Ko‘rsatkichlar yuklanmoqda…',
      chartNote: 'Grafik Android yuborgan mobil yuklab olish hisoblagichlaridan foydalanadi. Nuqtalar hisobot kelgan vaqtni ko‘rsatadi; bu uzluksiz o‘lchov emas. iOS kiritilmagan.',
      phoneList: 'Qurilmalar va SIM profillari', locked: 'Telefonlar va SIM profillari ro‘yxati faqat egaga ko‘rinadi.', enter: 'Ega sifatida kirish', device: 'Telefon', slot: 'Slot', carrier: 'Operator', type: 'Tur', amount: 'Bugungi mobil yuklab olish', state: 'Holat', empty: 'Ma’lumot yuborgan telefon yoki SIM profili yo‘q.'
    } : {
      chartTitle: 'Cellular data over time', chartEyebrow: 'TODAY · CELLULAR DOWNLOAD', range: 'Report snapshots · last 24 hours', loading: 'Loading readings…',
      chartNote: 'The chart uses Android-reported cellular download counters. Points mark report receipt time; they are not continuous measurements. iOS is not included.',
      phoneList: 'Phones and SIM profiles', locked: 'Phone and SIM profile details are owner-only.', enter: 'Owner sign-in', device: 'Phone', slot: 'Slot', carrier: 'Carrier', type: 'Type', amount: 'Cellular download today', state: 'State', empty: 'No phone or SIM profile has reported data.'
    };
    page.innerHTML = `<div class="container devices-page traffic-page">
      <header class="section-title-strip"><div><span class="eyebrow">ANDROID · CLIENT REPORTS</span><h1 class="section-heading">${escapeHtml(copy.traffic)}</h1><p class="section-desc">${escapeHtml(copy.intro)}</p></div></header>
      <div class="audit-kpi-bar"><div class="audit-kpi-pill"><span class="kpi-label">${escapeHtml(copy.active)}</span><strong class="kpi-val cyan" id="traffic-active-devices">—</strong></div><div class="audit-kpi-pill"><span class="kpi-label">${escapeHtml(copy.day)}</span><strong class="kpi-val green" id="traffic-public-today">—</strong></div><div class="audit-kpi-pill"><span class="kpi-label">${escapeHtml(copy.events)}</span><strong class="kpi-val" id="traffic-public-events">—</strong></div><div class="audit-kpi-pill"><span class="kpi-label">${escapeHtml(copy.speed)}</span><strong class="kpi-val" id="traffic-public-speed">${escapeHtml(copy.unavailable)}</strong></div></div>
      <section class="traffic-chart-panel"><div class="traffic-chart-heading"><div><span class="eyebrow">${t.chartEyebrow}</span><h2>${t.chartTitle}</h2></div><span id="traffic-chart-range">${t.range}</span></div><p id="traffic-chart-status" class="traffic-chart-status" aria-live="polite">${t.loading}</p><div id="traffic-chart-plot" class="traffic-chart-plot" hidden></div><p class="traffic-chart-note">${t.chartNote}</p></section>
      <section class="traffic-owner-panel"><header class="traffic-owner-heading"><div><span class="eyebrow">CLOUDFLARE ACCESS</span><h2>${t.phoneList}</h2></div></header><p id="traffic-owner-state" class="traffic-owner-state">${t.locked}<a class="btn btn-secondary btn-compact" href="/manager">${t.enter}</a></p><div id="traffic-owner-list" class="table-responsive traffic-owner-list" hidden></div></section>
      <div class="device-summary-panel"><div class="device-summary-mark" aria-hidden="true"><span></span><span></span><span></span></div><p>${escapeHtml(copy.note)}</p></div>
    </div>`;
    if (ownerReady && ownerAudit) renderTrafficOwnerList(ownerAudit);
    if (latestSummary) renderTrafficChart(latestSummary);
  }

  function renderTrafficOwnerList(data) {
    const state = document.getElementById('traffic-owner-state');
    const root = document.getElementById('traffic-owner-list');
    if (!state || !root) return;
    const users = Array.isArray(data.users) ? data.users : [];
    state.hidden = true;
    root.hidden = false;
    const lang = window.i18n?.currentLang || 'ru';
    const labels = lang === 'ru' ? ['Телефон','Слот','Оператор','Тип','Мобильная загрузка сегодня','Состояние'] : lang === 'uz' ? ['Telefon','Slot','Operator','Tur','Bugungi mobil yuklab olish','Holat'] : ['Phone','Slot','Carrier','Type','Cellular download today','State'];
    const rows = users.flatMap(user => (Array.isArray(user.simProfiles) && user.simProfiles.length ? user.simProfiles : [null]).map(profile => `<tr><td>${escapeHtml(user.model || '—')} · ${escapeHtml(user.platform || '—')}</td><td>${profile ? escapeHtml(profile.slot) : '—'}</td><td>${escapeHtml(profile?.carrier || user.carrier || '—')}</td><td>${profile ? escapeHtml(profile.type === 'esim' ? 'eSIM' : 'SIM') : '—'}</td><td>${profile ? escapeHtml(formatBytes(profile.todayBytes)) : escapeHtml(formatBytes(user.todayBytes))}</td><td>${profile ? escapeHtml(profile.active ? 'Активна' : 'Неактивна') : escapeHtml(user.status || '—')}</td></tr>`));
    root.innerHTML = users.length
      ? `<table class="data-table"><thead><tr>${labels.map(label => `<th>${label}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table>`
      : `<p class="traffic-chart-status">${lang === 'ru' ? 'Нет телефонов, приславших данные.' : lang === 'uz' ? 'Ma’lumot yuborgan telefonlar yo‘q.' : 'No phones have reported data.'}</p>`;
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
      <p class="data-scope-note">Таблица использует последние поля из отчёта Android: устройство и активные SIM-профили. ICCID/IMSI, CID/TAC и радиосигнал не передаются.</p>`;
    document.getElementById('owner-refresh')?.addEventListener('click', loadOwnerConsole);
  }

  async function loadOwnerConsole({ navigate = true } = {}) {
    try {
      const response = await fetch('/api/admin', { cache: 'no-store', headers: { Accept: 'application/json' } });
      const type = response.headers.get('content-type') || '';
      if (!response.ok || !type.includes('application/json')) throw new Error('Owner sign-in required');
      const data = await response.json();
      if (!data.ok) throw new Error('Owner sign-in required');
      ownerAudit = data;
      ownerReady = true;
      window.dispatchEvent(new CustomEvent('xylen:owner-audit-sync', { detail: ownerAudit }));
      if (navigate) window.switchPage('page-admin');
      renderOwnerConsole(ownerAudit);
      renderTrafficOwnerList(ownerAudit);
    } catch (_) {
      ownerReady = false;
      window.dispatchEvent(new CustomEvent('xylen:owner-audit-sync', { detail: null }));
      if (location.pathname === '/manager') {
        if (window.showToast) window.showToast('Доступ не настроен или эта учётная запись не является владельцем.');
        return;
      }
      if (navigate) location.assign('/manager');
    }
  }

  window.requestAdminConsole = loadOwnerConsole;
  window.refreshAuditNow = async function () {
    await fetchPublicSummary();
    if (ownerReady) await loadOwnerConsole({ navigate: false });
  };
  window.logoutAdminConsole = function () {
    ownerReady = false;
    ownerAudit = null;
    window.dispatchEvent(new CustomEvent('xylen:owner-audit-sync', { detail: null }));
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
      window.dispatchEvent(new CustomEvent('xylen:owner-audit-sync', { detail: null }));
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
      drawer.setAttribute('aria-hidden', String(!shouldOpen));
      drawer.inert = !shouldOpen;
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
    const menuButton = document.getElementById('compact-hamburger-btn-header');
    if (menuButton) {
      menuButton.classList.remove('fixed-menu-trigger');
    }
    fetchPublicSummary();
    if (location.hash === '#admin') loadOwnerConsole();

    window.addEventListener('xylen:lang-changed', () => { renderPublicPage(); renderInfoPages(); renderOperationalCopy(); });
    const header = document.getElementById('top-navbar');
    let previousY = window.scrollY;
    let direction = 0;
    let directionTravel = 0;
    let lastWheelAt = 0;
    let scrollFrame = 0;
    const resetTravel = nextDirection => {
      if (nextDirection && nextDirection !== direction) directionTravel = 0;
      if (nextDirection) direction = nextDirection;
    };
    const applyNavigationIntent = (nextDirection, distance, y) => {
      const drawerOpen = document.getElementById('compact-nav-drawer')?.classList.contains('active');
      if (y < 56 || drawerOpen) {
        header?.classList.remove('navbar-hidden');
        directionTravel = 0;
        return;
      }
      if (nextDirection > 0 && y > 150 && !header?.classList.contains('navbar-hidden') && distance >= 64) {
        header?.classList.add('navbar-hidden');
        directionTravel = 0;
      } else if (nextDirection < 0 && header?.classList.contains('navbar-hidden') && distance >= 36) {
        header.classList.remove('navbar-hidden');
        directionTravel = 0;
      }
    };
    window.addEventListener('wheel', event => {
      if (event.ctrlKey || Math.abs(event.deltaY) < Math.abs(event.deltaX) * .7) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      const delta = Math.max(-120, Math.min(120, event.deltaY * unit));
      if (Math.abs(delta) < 2) return;
      lastWheelAt = performance.now();
      const nextDirection = Math.sign(delta);
      resetTravel(nextDirection);
      directionTravel += Math.abs(delta);
      applyNavigationIntent(nextDirection, directionTravel, window.scrollY);
    }, { passive: true });
    window.addEventListener('scroll', () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const y = window.scrollY;
        const delta = y - previousY;
        previousY = y;
        if (y < 56) {
          header?.classList.remove('navbar-hidden');
          directionTravel = 0;
          return;
        }
        if (performance.now() - lastWheelAt < 180 || Math.abs(delta) < 1) return;
        const nextDirection = Math.sign(delta);
        resetTravel(nextDirection);
        directionTravel += Math.abs(delta);
        applyNavigationIntent(nextDirection, directionTravel, y);
      });
    }, { passive: true });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') window.toggleNavDrawer?.(false); });
    document.addEventListener('click', event => {
      const drawer = document.getElementById('compact-nav-drawer');
      const trigger = document.getElementById('compact-hamburger-btn-header');
      if (drawer?.classList.contains('active') && !drawer.querySelector('.drawer-sheet')?.contains(event.target) && !trigger?.contains(event.target)) window.toggleNavDrawer(false);
    });
    let lastPublicFetchAt = 0;
    window.addEventListener('xylen:audit-sync', () => {
      if (Date.now() - lastPublicFetchAt < 8000) return;
      lastPublicFetchAt = Date.now();
      fetchPublicSummary();
    });
    window.addEventListener('xylen:live-pulse', () => { if (latestSummary) updateSummary(latestSummary); });
    const motionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.classList.toggle('motion-paused', !entry.isIntersecting);
    }), { threshold: 0.05 });
    document.querySelectorAll('.motion-card').forEach(card => motionObserver.observe(card));
    animateHeroField();
  });

  function animateHeroField() {
    const canvas = document.getElementById('hero-field');
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;
    const hero = canvas.parentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, pixelRatio = 1, frame = 0, lastPaint = 0, visible = true;
    let pointerX = .5, pointerY = .42, targetX = .5, targetY = .42;
    const points = Array.from({ length: 84 }, (_, index) => ({
      x: ((index * .61803398875) % 1), y: ((index * .754877666) % 1),
      phase: index * .73, radius: index % 11 === 0 ? 2.5 : index % 4 === 0 ? 1.7 : 1.1,
      speed: .00015 + (index % 5) * .000035
    }));
    const resize = () => {
      const box = hero.getBoundingClientRect();
      pixelRatio = Math.min(devicePixelRatio || 1, 1.5);
      width = box.width; height = box.height;
      canvas.width = Math.round(width * pixelRatio); canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      schedule();
    };
    resize();
    new ResizeObserver(resize).observe(hero);
    hero.addEventListener('pointermove', event => {
      const box = hero.getBoundingClientRect();
      targetX = Math.min(1, Math.max(0, (event.clientX - box.left) / Math.max(box.width, 1)));
      targetY = Math.min(1, Math.max(0, (event.clientY - box.top) / Math.max(box.height, 1)));
      schedule();
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { targetX = .5; targetY = .42; schedule(); }, { passive: true });
    const heroObserver = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      if (visible) schedule();
      else if (frame) { cancelAnimationFrame(frame); frame = 0; }
    }, { threshold: 0 });
    heroObserver.observe(hero);

    function schedule() {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw);
    }

    function draw(time) {
      frame = 0;
      if (!visible || document.hidden) return;
      if (!reducedMotion.matches && time - lastPaint < 30) { schedule(); return; }
      lastPaint = time;
      pointerX += (targetX - pointerX) * .1;
      pointerY += (targetY - pointerY) * .1;
      context.clearRect(0, 0, width, height);

      const visual = hero.querySelector('.silent-motion-visual');
      const heroRect = hero.getBoundingClientRect();
      const visualRect = visual?.getBoundingClientRect();
      const cx = visualRect ? visualRect.left - heroRect.left + visualRect.width * .5 : width * .74;
      const cy = visualRect ? visualRect.top - heroRect.top + visualRect.height * .48 : height * .32;
      const radius = Math.min(visualRect?.width ? visualRect.width * .58 : width * .3, width * .36, 360);
      const shiftX = (pointerX - .5) * Math.min(width * .035, 34);
      const shiftY = (pointerY - .5) * 26;

      const halo = context.createRadialGradient(cx + shiftX, cy + shiftY, radius * .04, cx + shiftX, cy + shiftY, radius * 1.9);
      halo.addColorStop(0, 'rgba(12,166,220,.15)');
      halo.addColorStop(.4, 'rgba(19,111,165,.075)');
      halo.addColorStop(1, 'rgba(6,13,23,0)');
      context.fillStyle = halo;
      context.beginPath(); context.arc(cx + shiftX, cy + shiftY, radius * 1.9, 0, Math.PI * 2); context.fill();

      context.save();
      context.translate(cx + shiftX, cy + shiftY);
      context.rotate(reducedMotion.matches ? -.16 : time * .000035 - .16);
      for (let ring = 0; ring < 5; ring += 1) {
        const scale = .47 + ring * .155;
        context.beginPath();
        context.ellipse(0, 0, radius * scale, radius * scale * (.68 + (ring % 2) * .12), 0, 0, Math.PI * 2);
        context.strokeStyle = ring % 2 ? 'rgba(127,110,231,.12)' : 'rgba(84,209,240,.18)';
        context.lineWidth = ring === 2 ? 1.5 : .85;
        context.setLineDash(ring === 1 || ring === 4 ? [3, 9] : []);
        context.stroke();
      }
      context.setLineDash([]);
      context.restore();

      // Luminous data paths orbit the Xylen core; their pulses are illustrative, not measurements.
      const routes = [
        [[cx - radius * 1.14, cy + radius * .56], [cx - radius * .52, cy - radius * .84], [cx + radius * .68, cy - radius * .82], [cx + radius * 1.04, cy + radius * .34]],
        [[cx + radius * 1.08, cy - radius * .22], [cx + radius * .72, cy + radius * .88], [cx - radius * .58, cy + radius * .96], [cx - radius * 1.12, cy + radius * .2]],
        [[cx - radius * .98, cy - radius * .54], [cx - radius * .22, cy - radius * 1.02], [cx + radius * .62, cy - radius * .54], [cx + radius * .95, cy + radius * .06]]
      ];
      routes.forEach((points, index) => {
        context.beginPath();
        context.moveTo(points[0][0], points[0][1]);
        context.bezierCurveTo(points[1][0], points[1][1], points[2][0], points[2][1], points[3][0], points[3][1]);
        context.strokeStyle = index === 1 ? 'rgba(168,127,255,.24)' : 'rgba(77,202,235,.28)';
        context.lineWidth = index === 0 ? 1.4 : .9;
        context.stroke();
        if (!reducedMotion.matches) {
          const p = (time * .00016 * (index % 2 ? -1 : 1) + index * .31 + 1) % 1;
          const inv = 1 - p;
          const x = inv ** 3 * points[0][0] + 3 * inv ** 2 * p * points[1][0] + 3 * inv * p ** 2 * points[2][0] + p ** 3 * points[3][0];
          const y = inv ** 3 * points[0][1] + 3 * inv ** 2 * p * points[1][1] + 3 * inv * p ** 2 * points[2][1] + p ** 3 * points[3][1];
          const glow = context.createRadialGradient(x, y, 0, x, y, 23);
          glow.addColorStop(0, index === 1 ? 'rgba(223,206,255,.95)' : 'rgba(191,245,255,.96)');
          glow.addColorStop(.18, index === 1 ? 'rgba(163,119,255,.78)' : 'rgba(41,199,234,.82)');
          glow.addColorStop(1, 'rgba(26,157,204,0)');
          context.fillStyle = glow; context.beginPath(); context.arc(x, y, 23, 0, Math.PI * 2); context.fill();
          context.fillStyle = '#e1fbff'; context.beginPath(); context.arc(x, y, 2.2, 0, Math.PI * 2); context.fill();
        }
      });

      const nodes = points.map(point => {
        const drift = reducedMotion.matches ? 0 : Math.sin(time * point.speed + point.phase) * .009;
        return { x: (point.x + (pointerX - .5) * .045 + drift) * width, y: (point.y + (pointerY - .5) * .05 + drift) * height, r: point.radius, phase: point.phase };
      });
      for (let i = 0; i < nodes.length; i += 1) for (let j = i + 1; j < nodes.length; j += 1) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const distance = Math.hypot(dx, dy);
        if (distance < 132) {
          context.strokeStyle = `rgba(84,198,230,${(1 - distance / 132) * .19})`;
          context.lineWidth = .65;
          context.beginPath(); context.moveTo(nodes[i].x, nodes[i].y); context.lineTo(nodes[j].x, nodes[j].y); context.stroke();
        }
      }
      nodes.forEach(node => {
        const pulse = reducedMotion.matches ? .5 : .5 + .5 * Math.sin(time * .001 + node.phase);
        context.fillStyle = `rgba(177,239,250,${.36 + pulse * .48})`;
        context.shadowColor = '#3cbddf'; context.shadowBlur = node.r > 2 ? 12 : 5;
        context.beginPath(); context.arc(node.x, node.y, node.r * (.8 + pulse * .45), 0, Math.PI * 2); context.fill();
      });
      context.shadowBlur = 0;

      const mouseX = pointerX * width, mouseY = pointerY * height;
      const cursorGlow = context.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, Math.min(width, height) * .22);
      cursorGlow.addColorStop(0, 'rgba(44,187,226,.09)'); cursorGlow.addColorStop(1, 'rgba(44,187,226,0)');
      context.fillStyle = cursorGlow; context.fillRect(0, 0, width, height);
      if (!reducedMotion.matches) schedule();
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; }
      else schedule();
    });
    reducedMotion.addEventListener?.('change', schedule);
    schedule();
  }
})();
