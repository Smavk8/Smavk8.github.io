/* Adds a product-story layer to the overview without replacing existing cards or media. */
(function () {
  const copy = {
    ru: {
      eyebrow: 'XYLEN · КАК ЭТО УСТРОЕНО', title: 'От согласия — к понятной сводке.',
      intro: 'Каждый экран показывает свою часть пути. Отчёт создаёт мобильный клиент, сводку формирует веб-платформа, а подробный журнал остаётся закрытым для владельца.',
      stages: [
        ['01', 'Решение остаётся у пользователя', 'Android начинает передачу только после согласия. Нет согласия — нет нового отчёта.'],
        ['02', 'Клиент формирует отчёт', 'Приложение отправляет событие и доступные ему счётчики. Сервер показывает именно присланные значения.'],
        ['03', 'Публичная часть даёт сводку', 'Посетитель видит агрегированные числа. График появляется только при наличии временных показаний.'],
        ['04', 'Детали видит владелец', 'Подробные записи доступны через отдельную проверку Cloudflare Access.']
      ],
      boundaryLabel: 'ЧЕСТНЫЕ ГРАНИЦЫ', boundaryTitle: 'Что Xylen получает — и чего не обещает',
      boundaryIntro: 'Прозрачность начинается с разделения измерений устройства и данных, которые приложение само присылает в отчёте.',
      yesTitle: 'В отчёте Android', yesItems: ['События приложения: экран, действие, время и детали', 'Счётчики мобильной загрузки, сообщённые клиентом', 'Сведения о SIM-профиле в объёме, который формирует приложение'],
      noTitle: 'Не передаётся в веб-аудит', noItems: ['ICCID, IMSI и номер телефона', 'CID/TAC, уровень радиосигнала и скорость радиоэфира', 'Журнал событий iOS: он остаётся на устройстве'],
      mapLabel: 'ДАННЫЕ И ДОСТУП', mapTitle: 'Три уровня. Разные права.',
      map: [['Устройство', 'Пользователь решает, отправлять ли Android-отчёт. iOS-журнал хранится локально.'], ['Публичная сводка', 'Endpoint возвращает агрегированные числа и доступные сводные счётчики.'], ['Кабинет владельца', 'Подробный журнал требует Cloudflare Access и проверки учётной записи владельца.']],
      questionsLabel: 'КОРОТКО И ПО ДЕЛУ', questionsTitle: 'Вопросы, которые возникают первыми',
      questions: [['Сайт следит за телефоном в реальном времени?', 'Нет. Сайт показывает данные, присланные Android-отчётом. Непрерывного измерения радиоканала нет.'], ['Что будет, если отчётов пока нет?', 'Сводка покажет пустое состояние. Значения не заменяются демонстрационными или придуманными числами.'], ['Можно увидеть подробные записи?', 'Только владельцу после проверки Cloudflare Access. Публичный экран получает агрегированную сводку.'], ['iOS отправляет события на сайт?', 'В проверенном исходном коде iOS журнал хранится локально и в веб-аудит не отправляется.']],
      ctaLabel: 'СЛЕДУЮЩИЙ ШАГ', ctaTitle: 'Посмотрите, что действительно пришло.', ctaText: 'Откройте сводку устройств или изучите фактические поля и правила хранения данных.', ctaDevices: 'Открыть сводку', ctaPrivacy: 'Как устроена приватность',
      flowCaption: 'Схема отражает поток данных, а не непрерывное соединение.'
    },
    en: {
      eyebrow: 'XYLEN · HOW IT WORKS', title: 'From consent to a clear summary.',
      intro: 'Each screen explains one part of the journey. The mobile client creates the report, the web platform builds a summary, and detailed logs stay owner-only.',
      stages: [
        ['01', 'The user stays in control', 'Android sends only after consent. No consent means no new report.'],
        ['02', 'The client creates a report', 'The app sends an event and counters available to it. The server displays the values it receives.'],
        ['03', 'The public view shows a summary', 'Visitors see aggregate counts. A chart appears only when timestamped readings exist.'],
        ['04', 'The owner can review details', 'Detailed records require a separate Cloudflare Access check.']
      ],
      boundaryLabel: 'CLEAR BOUNDARIES', boundaryTitle: 'What Xylen receives — and what it does not claim',
      boundaryIntro: 'Transparency means separating device measurements from data the app submits in a report.',
      yesTitle: 'In Android reports', yesItems: ['App events: screen, action, time, and details', 'Cellular-download counters reported by the client', 'SIM-profile details included by the app'],
      noTitle: 'Not sent to web audit', noItems: ['ICCID, IMSI, or phone number', 'CID/TAC, radio-signal levels, or live radio speed', 'The iOS activity log: it stays on-device'],
      mapLabel: 'DATA AND ACCESS', mapTitle: 'Three layers. Different permissions.',
      map: [['Device', 'The user decides whether Android sends a report. The iOS activity log stays local.'], ['Public summary', 'The endpoint returns aggregate counts and available summary counters.'], ['Owner console', 'Detailed logs require Cloudflare Access and owner-account verification.']],
      questionsLabel: 'QUICK ANSWERS', questionsTitle: 'The first questions, answered',
      questions: [['Does the site track a phone live?', 'No. The site shows data submitted in Android reports. It does not continuously measure the radio channel.'], ['What if no reports have arrived?', 'The summary shows an empty state. It does not replace missing data with demo or invented numbers.'], ['Can I see detailed records?', 'Only the owner can, after Cloudflare Access verification. The public screen receives an aggregate summary.'], ['Does iOS send events to the site?', 'In the reviewed source, the iOS activity log stays on-device and is not sent to web audit.']],
      ctaLabel: 'NEXT STEP', ctaTitle: 'See what has actually arrived.', ctaText: 'Open the device summary or review the reported fields and data-retention rules.', ctaDevices: 'Open the summary', ctaPrivacy: 'Privacy and data flow',
      flowCaption: 'This diagram shows the data path, not a continuous connection.'
    },
    uz: {
      eyebrow: 'XYLEN · QANDAY ISHLAYDI', title: 'Rozilikdan — tushunarli jamlanmagacha.',
      intro: 'Har bir ekran jarayonning bir qismini tushuntiradi. Hisobotni mobil mijoz yaratadi, veb-platforma jamlanmani tuzadi, batafsil jurnal esa faqat egaga ochiq.',
      stages: [
        ['01', 'Qaror foydalanuvchida', 'Android faqat rozilikdan so‘ng yuboradi. Rozilik bo‘lmasa, yangi hisobot yuborilmaydi.'],
        ['02', 'Mijoz hisobot yaratadi', 'Ilova hodisa va mavjud hisoblagichlarni yuboradi. Server qabul qilingan qiymatlarni ko‘rsatadi.'],
        ['03', 'Ochiq sahifa jamlanmani ko‘rsatadi', 'Tashrifchi umumiy sonlarni ko‘radi. Grafik faqat vaqtli ko‘rsatkichlar mavjud bo‘lsa chiqadi.'],
        ['04', 'Batafsil ma’lumot egaga ochiq', 'Batafsil yozuvlar Cloudflare Access tekshiruvidan keyin ochiladi.']
      ],
      boundaryLabel: 'ANIQ CHEGARALAR', boundaryTitle: 'Xylen nimani oladi — va nimani va’da qilmaydi',
      boundaryIntro: 'Shaffoflik qurilma o‘lchovlari bilan ilova hisobotda yuboradigan ma’lumotlarni ajratishdan boshlanadi.',
      yesTitle: 'Android hisobotida', yesItems: ['Ilova hodisalari: ekran, amal, vaqt va tafsilotlar', 'Mijoz yuborgan mobil yuklab olish hisoblagichlari', 'Ilova kiritgan SIM profili tafsilotlari'],
      noTitle: 'Veb auditga yuborilmaydi', noItems: ['ICCID, IMSI yoki telefon raqami', 'CID/TAC, radio signal darajasi yoki jonli radio tezligi', 'iOS hodisalar jurnali: qurilmada qoladi'],
      mapLabel: 'MA’LUMOT VA KIRISH', mapTitle: 'Uch qatlam. Turli ruxsatlar.',
      map: [['Qurilma', 'Android hisobotini yuborishni foydalanuvchi hal qiladi. iOS jurnali qurilmada qoladi.'], ['Ochiq jamlanma', 'Endpoint umumiy sonlar va mavjud hisoblagichlarni qaytaradi.'], ['Egasi paneli', 'Batafsil jurnal uchun Cloudflare Access va egani tekshirish talab qilinadi.']],
      questionsLabel: 'QISQA JAVOBLAR', questionsTitle: 'Birinchi savollarga javoblar',
      questions: [['Sayt telefonni jonli kuzatadimi?', 'Yo‘q. Sayt Android hisobotida yuborilgan ma’lumotlarni ko‘rsatadi. Radio kanal uzluksiz o‘lchanmaydi.'], ['Hali hisobot kelmagan bo‘lsa-chi?', 'Jamlanmada bo‘sh holat ko‘rsatiladi. Demo yoki o‘ylab topilgan raqamlar ishlatilmaydi.'], ['Batafsil yozuvlarni ko‘rish mumkinmi?', 'Faqat egasi Cloudflare Access tekshiruvidan o‘tgach. Ochiq sahifaga faqat umumiy jamlanma beriladi.'], ['iOS saytga hodisalarni yuboradimi?', 'Ko‘rib chiqilgan manba kodida iOS jurnali qurilmada saqlanadi va veb auditga yuborilmaydi.']],
      ctaLabel: 'KEYINGI QADAM', ctaTitle: 'Haqiqatan kelgan ma’lumotlarni ko‘ring.', ctaText: 'Qurilmalar jamlanmasini oching yoki yuboriladigan maydonlar va saqlash qoidalarini ko‘rib chiqing.', ctaDevices: 'Jamlanmani ochish', ctaPrivacy: 'Maxfiylik va ma’lumot oqimi',
      flowCaption: 'Sxema ma’lumotlar yo‘lini ko‘rsatadi, uzluksiz ulanishni emas.'
    }
  };

  function render() {
    const page = document.getElementById('page-overview');
    const anchor = page?.querySelector('.quick-connect-strip');
    if (!page || !anchor) return;
    const lang = window.i18n?.currentLang || 'ru';
    const t = copy[lang] || copy.ru;
    let root = page.querySelector('.xylen-story-expansion');
    if (!root) {
      root = document.createElement('div');
      root.className = 'xylen-story-expansion';
      anchor.after(root);
    }
    const list = items => `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
    root.innerHTML = `
      <section class="story-section story-flow reveal-on-scroll" aria-labelledby="story-flow-title">
        <div class="story-heading"><span class="story-eyebrow">${t.eyebrow}</span><h2 id="story-flow-title">${t.title}</h2><p>${t.intro}</p></div>
        <div class="story-route" aria-label="${t.title}">${t.stages.map((stage, i) => `<article class="story-step" style="--step:${i}"><span class="story-step-no">${stage[0]}</span><span class="story-step-line" aria-hidden="true"></span><h3>${stage[1]}</h3><p>${stage[2]}</p></article>`).join('')}</div>
        <p class="story-caption"><span></span>${t.flowCaption}</p>
      </section>
      <section class="story-section story-boundaries reveal-on-scroll" aria-labelledby="story-boundary-title">
        <div class="story-heading"><span class="story-eyebrow">${t.boundaryLabel}</span><h2 id="story-boundary-title">${t.boundaryTitle}</h2><p>${t.boundaryIntro}</p></div>
        <div class="boundary-grid"><article class="boundary-card boundary-reported"><span class="boundary-symbol" aria-hidden="true">↗</span><h3>${t.yesTitle}</h3>${list(t.yesItems)}</article><article class="boundary-card boundary-private"><span class="boundary-symbol" aria-hidden="true">⌂</span><h3>${t.noTitle}</h3>${list(t.noItems)}</article></div>
      </section>
      <section class="story-section story-access reveal-on-scroll" aria-labelledby="story-access-title">
        <div class="story-heading"><span class="story-eyebrow">${t.mapLabel}</span><h2 id="story-access-title">${t.mapTitle}</h2></div>
        <div class="access-grid">${t.map.map((item, i) => `<article class="access-card"><span>0${i + 1}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join('')}</div>
      </section>
      <section class="story-section story-faq reveal-on-scroll" aria-labelledby="story-faq-title">
        <div class="story-heading"><span class="story-eyebrow">${t.questionsLabel}</span><h2 id="story-faq-title">${t.questionsTitle}</h2></div>
        <div class="story-faq-list">${t.questions.map((item, i) => `<details class="story-faq-item"><summary><span>0${i + 1}</span>${item[0]}<i aria-hidden="true"></i></summary><p>${item[1]}</p></details>`).join('')}</div>
      </section>
      <section class="story-cta reveal-on-scroll"><div><span class="story-eyebrow">${t.ctaLabel}</span><h2>${t.ctaTitle}</h2><p>${t.ctaText}</p></div><div class="story-cta-actions"><button class="btn btn-cyan" type="button" data-story-page="page-devices">${t.ctaDevices}<span aria-hidden="true">↗</span></button><button class="btn btn-secondary" type="button" data-story-page="page-privacy">${t.ctaPrivacy}<span aria-hidden="true">↗</span></button></div></section>`;
    root.querySelectorAll('[data-story-page]').forEach(button => button.addEventListener('click', () => window.switchPage?.(button.dataset.storyPage)));
  }

  document.addEventListener('DOMContentLoaded', render);
  window.addEventListener('xylen:lang-changed', render);
})();
