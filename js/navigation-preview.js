/* Hover previews for the five main workspaces, with a lightweight same-origin page miniature. */
(function () {
  const copy = {
    ru: {
      overview: ['Главная', 'Архитектура и принцип согласия', '01 / ГЛАВНАЯ'],
      devices: ['Обзор устройства', 'Сводка полученных Android-отчётов', '02 / УСТРОЙСТВА'],
      traffic: ['Трафик', 'Клиентские мобильные счётчики', '03 / ТРАФИК'],
      releases: ['Релизы', 'Материалы для Android и iOS', '04 / РЕЛИЗЫ'],
      about: ['О платформе', 'Правила данных и доступ владельца', '05 / О ПЛАТФОРМЕ'],
      hint: 'НАВЕДИТЕ · ПРЕДПРОСМОТР',
      label: 'Предпросмотр страницы'
    },
    uz: {
      overview: ['Bosh sahifa', 'Arxitektura va rozilik tamoyili', '01 / BOSH SAHIFA'],
      devices: ['Qurilmalar sharhi', 'Olingan Android hisobotlari', '02 / QURILMALAR'],
      traffic: ['Trafik', 'Mijoz yuborgan mobil hisoblagichlar', '03 / TRAFIK'],
      releases: ['Relizlar', 'Android va iOS materiallari', '04 / RELIZLAR'],
      about: ['Platforma haqida', 'Ma’lumot qoidalari va egaga kirish', '05 / PLATFORMA'],
      hint: 'KURSORNI OLIB KELING · KO‘RISH',
      label: 'Sahifa ko‘rinishi'
    },
    en: {
      overview: ['Overview', 'Architecture and the consent principle', '01 / OVERVIEW'],
      devices: ['Device overview', 'Summary of received Android reports', '02 / DEVICES'],
      traffic: ['Traffic', 'Client-reported cellular counters', '03 / TRAFFIC'],
      releases: ['Releases', 'Android and iOS downloads', '04 / RELEASES'],
      about: ['About the platform', 'Data rules and owner access', '05 / ABOUT'],
      hint: 'HOVER · PREVIEW',
      label: 'Page preview'
    }
  };

  const scenes = {
    overview: '<i class="nav-preview-orbit"></i><i class="nav-preview-orbit nav-preview-orbit-inner"></i><b class="nav-preview-core">XYLEN</b><span class="nav-preview-node nav-preview-node-a"></span><span class="nav-preview-node nav-preview-node-b"></span>',
    devices: '<div class="nav-preview-metrics"><i><b></b><b></b></i><i><b></b><b></b></i><i><b></b><b></b></i></div><div class="nav-preview-device-line"><span></span><b></b><span></span></div>',
    traffic: '<div class="nav-preview-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="nav-preview-wave"></div>',
    releases: '<div class="nav-preview-release"><b>APK</b><span><i></i><i></i><i></i></span><small>ANDROID</small></div><div class="nav-preview-release nav-preview-release-ios"><b>iOS</b><span><i></i><i></i></span><small>LOCAL LOG</small></div>',
    about: '<div class="nav-preview-route"><i></i><b>01</b><span></span><b>02</b><span></span><b>03</b><i></i></div><div class="nav-preview-charter"><b>DATA CHARTER</b><i></i><i></i><i></i></div>'
  };

  function currentLanguage() {
    const lang = window.i18n?.currentLang || 'ru';
    return copy[lang] ? lang : 'ru';
  }

  function init() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('xylen-preview') === '1') {
      document.documentElement.classList.add('nav-preview-mode');
      const route = params.get('preview-page');
      const showPreviewPage = () => {
        document.querySelectorAll('video').forEach(video => {
          video.pause();
          video.autoplay = false;
          video.preload = 'none';
        });
        if (/^page-(overview|devices|traffic|releases|about)$/.test(route || '')) {
          window.switchPage?.(route);
        }
      };
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showPreviewPage, { once: true });
      else showPreviewPage();
      return;
    }

    const nav = document.getElementById('main-nav-menu');
    if (!nav || document.getElementById('nav-page-preview')) return;
    const lang = currentLanguage();
    const preview = document.createElement('aside');
    preview.id = 'nav-page-preview';
    preview.className = 'nav-page-preview';
    preview.setAttribute('role', 'tooltip');
    preview.setAttribute('aria-hidden', 'true');
    preview.innerHTML = `
      <div class="nav-preview-window">
        <div class="nav-preview-topbar"><span class="nav-preview-brand">XYLEN <i>MANAGEMENT</i></span><span class="nav-preview-tab"></span><span class="nav-preview-dots"><i></i><i></i><i></i></span></div>
        <div class="nav-preview-canvas"><div class="nav-preview-scenery"></div><iframe class="nav-preview-screen" title="Предпросмотр страницы" aria-hidden="true" tabindex="-1"></iframe></div>
        <div class="nav-preview-caption"><span><small class="nav-preview-eyebrow"></small><strong class="nav-preview-title"></strong><em class="nav-preview-summary"></em></span><b class="nav-preview-arrow" aria-hidden="true">↗</b></div>
      </div>`;
    document.body.appendChild(preview);

    let hideTimer = 0;
    let activeButton = null;
    let previewReady = false;
    let pendingPage = 'page-overview';
    const previewFrame = preview.querySelector('.nav-preview-screen');
    previewFrame.addEventListener('load', () => {
      previewReady = true;
      preview.classList.add('has-preview-frame');
      window.setTimeout(() => previewFrame.contentWindow?.switchPage?.(pendingPage), 80);
    });
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const hide = () => {
      clearTimeout(hideTimer);
      preview.classList.remove('is-open');
      preview.setAttribute('aria-hidden', 'true');
      activeButton?.removeAttribute('aria-describedby');
      activeButton = null;
    };
    const scheduleHide = () => {
      clearTimeout(hideTimer);
      hideTimer = window.setTimeout(hide, 140);
    };
    const show = button => {
      if (!canHover.matches || !button?.dataset.page) return;
      clearTimeout(hideTimer);
      const key = button.dataset.page.replace('page-', '');
      const language = currentLanguage();
      const strings = copy[language];
      const item = strings[key] || strings.overview;
      preview.querySelector('.nav-preview-eyebrow').textContent = strings.hint;
      preview.querySelector('.nav-preview-title').textContent = item[0];
      preview.querySelector('.nav-preview-summary').textContent = item[1];
      preview.querySelector('.nav-preview-tab').textContent = item[2];
      preview.querySelector('.nav-preview-scenery').innerHTML = scenes[key] || scenes.overview;
      preview.setAttribute('aria-label', `${strings.label}: ${item[0]}`);
      if (activeButton && activeButton !== button) activeButton.removeAttribute('aria-describedby');
      activeButton = button;
      activeButton.setAttribute('aria-describedby', preview.id);

      const rect = button.getBoundingClientRect();
      const width = Math.min(460, window.innerWidth - 28);
      const left = Math.max(14, Math.min(window.innerWidth - width - 14, rect.left + rect.width / 2 - width / 2));
      preview.style.left = `${left}px`;
      preview.style.setProperty('--nav-preview-scale', (width / 1280).toFixed(6));
      const previewHeight = preview.getBoundingClientRect().height || 268;
      const maxTop = Math.max(14, window.innerHeight - previewHeight - 14);
      preview.style.top = `${Math.min(maxTop, Math.max(14, rect.bottom + 12))}px`;
      pendingPage = button.dataset.page;
      previewFrame.title = `${strings.label}: ${item[0]}`;
      if (!previewFrame.src || previewFrame.src === 'about:blank') {
        const previewUrl = new URL(window.location.pathname, window.location.origin);
        previewUrl.searchParams.set('xylen-preview', '1');
        previewUrl.searchParams.set('preview-page', pendingPage);
        previewUrl.hash = 'overview';
        previewFrame.src = previewUrl.href;
      } else if (previewReady) {
        previewFrame.contentWindow?.switchPage?.(pendingPage);
      }
      preview.className = `nav-page-preview${previewReady ? ' has-preview-frame' : ''} is-${key}`;
      requestAnimationFrame(() => {
        preview.classList.add('is-open');
        preview.setAttribute('aria-hidden', 'false');
      });
    };

    nav.querySelectorAll('.nav-page-btn[data-page]').forEach(button => {
      button.addEventListener('pointerenter', () => show(button));
      button.addEventListener('pointerleave', scheduleHide);
      button.addEventListener('focus', () => show(button));
      button.addEventListener('blur', scheduleHide);
      button.addEventListener('click', hide);
    });
    preview.addEventListener('pointerenter', () => clearTimeout(hideTimer));
    preview.addEventListener('pointerleave', scheduleHide);
    nav.addEventListener('scroll', hide, { passive: true });
    window.addEventListener('resize', hide, { passive: true });
    window.addEventListener('scroll', hide, { passive: true });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') hide(); });
    document.addEventListener('pointerdown', event => {
      if (!preview.contains(event.target) && !nav.contains(event.target)) hide();
    }, { passive: true });
    window.addEventListener('xylen:lang-changed', () => { if (activeButton) show(activeButton); });

    let pointerFrame = 0;
    let pointerEvent = null;
    document.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      pointerEvent = event;
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!pointerEvent) return;
        const x = `${Math.round(pointerEvent.clientX / Math.max(1, window.innerWidth) * 100)}%`;
        const y = `${Math.round(pointerEvent.clientY / Math.max(1, window.innerHeight) * 100)}%`;
        document.documentElement.style.setProperty('--ambient-x', x);
        document.documentElement.style.setProperty('--ambient-y', y);
      });
    }, { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
