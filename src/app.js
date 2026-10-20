/* Ruta del Talento: una landing guiada, accesible y preparada para GitHub Pages. */
(() => {
  'use strict';
  const $ = (sel) => document.querySelector(sel),
    $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const chapters = [
    { id: 'inicio', name: '¿Por qué colaborar?' },
    { id: 'ventajas', name: '¿Qué gana mi empresa?' },
    { id: 'perfiles', name: '¿Quiénes y cuándo?' },
    { id: 'proceso', name: '¿Cómo colaboramos?' },
    { id: 'contacto', name: '¿Hablamos?' },
  ];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 'dam',
    menuOpen = false,
    pending = false,
    activeChapter = '',
    lastScrollY = scrollY;
  const menu = $('#menu-panel'),
    overlay = $('#menu-overlay'),
    toggle = $('#menu-toggle');
  function openMenu(open, focus = true) {
    menuOpen = open;
    menu.hidden = !open;
    overlay.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', open);
    if (focus) {
      (open ? menu.querySelector('a') : toggle).focus();
    }
  }
  toggle.addEventListener('click', () => openMenu(!menuOpen));
  overlay.addEventListener('click', () => openMenu(false));
  menu
    .querySelectorAll('a')
    .forEach((a) => a.addEventListener('click', () => openMenu(false, false)));
  document.addEventListener('keydown', (e) => {
    if (!menuOpen) return;
    if (e.key === 'Escape') {
      openMenu(false);
      return;
    }
    if (e.key !== 'Tab') return;
    let els = [toggle, ...$$('#menu-panel a')],
      i = els.indexOf(document.activeElement);
    if (e.shiftKey && i === 0) {
      e.preventDefault();
      els.at(-1).focus();
    } else if (!e.shiftKey && i === els.length - 1) {
      e.preventDefault();
      toggle.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (menuOpen && window.innerWidth > 1100) openMenu(false, false);
  });
  function chapterChange(id) {
    if (activeChapter === id) return;
    activeChapter = id;
    let n = chapters.findIndex((x) => x.id === id),
      name = chapters[n].name;
    $('#mobile-chapter').textContent = `0${n + 1} / 05`;
    $('#mobile-location-text').textContent = name;
    $('#route-count').textContent = `0${n + 1}`;
    $$('[data-nav], [data-route]').forEach((a) => {
      if ((a.dataset.nav || a.dataset.route) === id) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  }
  function updateProgress() {
    const traveler = $('#rail-traveler');
    if (scrollY !== lastScrollY) {
      traveler.classList.toggle('is-scrolling-up', scrollY < lastScrollY);
      lastScrollY = scrollY;
    }
    const total = Math.max(1, document.documentElement.scrollHeight - innerHeight),
      frac = Math.min(1, Math.max(0, scrollY / total));
    $('#scroll-progress').style.width = frac * 100 + '%';
    const focusY = innerHeight * 0.38 + 80;
    let found = chapters[0].id;
    chapters.forEach((x) => {
      if (document.getElementById(x.id).getBoundingClientRect().top <= focusY) found = x.id;
    });
    chapterChange(found);
    // Rail de 5 estaciones: progreso continuo a lo largo de TODA la web, no solamente en un bloque.
    const first = $('#inicio'),
      last = $('#contacto'),
      mid = scrollY + innerHeight * 0.46,
      start = first.offsetTop + first.offsetHeight * 0.2,
      end = last.offsetTop + last.offsetHeight * 0.65,
      p = Math.max(0, Math.min(1, (mid - start) / Math.max(1, end - start))),
      rail = $('#route-rail'),
      railBox = rail.getBoundingClientRect(),
      routeNodes = $$('[data-route]'),
      firstDot = routeNodes[0].querySelector('i').getBoundingClientRect(),
      lastDot = routeNodes.at(-1).querySelector('i').getBoundingClientRect(),
      travelerStart = firstDot.top - railBox.top + firstDot.height / 2 - traveler.offsetHeight / 2,
      travelerEnd = lastDot.top - railBox.top + lastDot.height / 2 - traveler.offsetHeight / 2;
    $('#rail-fill').style.height = p * 100 + '%';
    traveler.style.top = `${travelerStart + (travelerEnd - travelerStart) * p}px`;
    $('#mini-progress').style.width = p * 100 + '%';
    const contactTop = last.getBoundingClientRect().top,
      footerTop = $('.footer').getBoundingClientRect().top;
    $('#mobile-cta').classList.toggle(
      'visible',
      scrollY > 560 && contactTop > innerHeight * 0.7 && footerTop > innerHeight,
    );
    $('#back-to-top').classList.toggle('visible', scrollY > 560);
  }
  function requestUpdate() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      updateProgress();
    });
  }
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  requestUpdate();
  function node(tag, text, classes) {
    const el = document.createElement(tag);
    if (classes) el.className = classes;
    el.textContent = text;
    return el;
  }
  function icon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'ui-icon');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#icon-' + name);
    svg.append(use);
    return svg;
  }
  function yearCard(y) {
    const card = node('article', '', 'year-card');
    const head = node('div', '', 'year-top');
    const number = node('span', y.year, 'year-number');
    const name = node('div', '', 'year-title');
    name.append(node('strong', y.phase), node('small', y.period));
    head.append(number, name);
    card.append(head);
    let list = node('ul', '', 'year-list');
    y.tasks.forEach((t) => list.append(node('li', t)));
    card.append(list);
    let aut = node('p', '', 'year-autonomy');
    aut.append(node('b', 'Autonomía: '), document.createTextNode(y.autonomy));
    card.append(aut);
    return card;
  }
  function renderCycle(cycle, changeHash = false) {
    selected = cycle;
    const d = window.TALENTO_CYCLES[cycle];
    $('#cycle-kicker').textContent = d.level.toUpperCase();
    $('#cycle-title').textContent = d.title;
    $('#cycle-description').textContent = d.description;
    $('#cycle-skills').replaceChildren(...d.skills.map((t) => node('span', t)));
    $('#year-grid').replaceChildren(...d.years.map(yearCard));
    $('#calendar-title').textContent = d.calendarTitle;
    $('#timeline-note').textContent = d.note;
    let rows = [];
    d.bars.forEach((b) => {
      let row = node('div', '', 'timeline-row'),
        label = node('strong', b.label),
        track = node('div', '', 'timeline-track'),
        bar = node('div', b.caption, 'timeline-bar ' + b.kind);
      bar.style.left = b.start + '%';
      bar.style.width = b.width + '%';
      track.append(bar);
      row.append(label, track);
      if (b.width < 14) row.append(node('span', b.caption, 'timeline-small-label'));
      rows.push(row);
    });
    $('#timeline-rows').replaceChildren(...rows);
    const old = $('.mentor-callout');
    if (old) old.remove();
    if (d.mentoring) {
      const panel = node('div', '', 'mentor-callout');
      const symbol = node('div', '', 'mentor-icon');
      symbol.append(icon('users'));
      panel.append(symbol);
      const content = node('div');
      content.append(node('strong', d.mentoringTitle), node('p', d.mentoringText));
      panel.append(content);
      $('#cycle-calendar').append(panel);
    }
    const img = $('#cycle-photo');
    img.src = d.image;
    img.alt = d.imageAlt;
    img.classList.remove('loaded');
    $('#cycle-panel').dataset.cycle = cycle;
    $$('[data-cycle]').forEach((b) => {
      const yes = b.dataset.cycle === cycle;
      b.classList.toggle('selected', yes);
      b.setAttribute('aria-selected', String(yes));
      b.tabIndex = yes ? 0 : -1;
    });
    $('#cycle-panel').setAttribute('aria-labelledby', 'tab-' + cycle);
    $('#cycle-other').replaceChildren(document.createTextNode(`Ver ${cycle === 'smr' ? 'DAM' : 'SMR'}  `), icon('chevron'));
    const cycleCta = $('#cycle-cta');
    cycleCta.replaceChildren(document.createTextNode(d.cta + '  '), node('span', 'Hablemos'), icon('chat'));
    if (changeHash) history.replaceState(null, '', `#perfiles/${cycle}`);
    requestUpdate();
  }
  $$('[data-cycle]').forEach((btn, i, all) => {
    btn.addEventListener('click', () => renderCycle(btn.dataset.cycle, true));
    btn.addEventListener('keydown', (e) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      let next =
        e.key === 'Home'
          ? 0
          : e.key === 'End'
            ? all.length - 1
            : e.key === 'ArrowRight'
              ? (i + 1) % all.length
              : (i + all.length - 1) % all.length;
      all[next].focus();
      all[next].click();
    });
  });
  $('#cycle-other').addEventListener('click', () => {
    renderCycle(selected === 'smr' ? 'dam' : 'smr', true);
    $('#perfiles').scrollIntoView({
      behavior: reduced.matches ? 'auto' : 'smooth',
      block: 'start',
    });
  });
  function onHash() {
    const hit = decodeURIComponent(location.hash).match(/^#perfiles\/(smr|dam)$/);
    if (hit) {
      renderCycle(hit[1], false);
      setTimeout(() => $('#perfiles').scrollIntoView({ behavior: 'auto', block: 'start' }), 50);
    }
  }
  window.addEventListener('hashchange', onHash);
  renderCycle('dam');
  onHash();
  function handlePhoto(img) {
    function setState() {
      const valid = img.complete && img.naturalWidth > 0;
      img.classList.toggle('loaded', valid);
    }
    img.addEventListener('load', setState);
    img.addEventListener('error', setState);
    if (img.complete) setState();
  }
  $$('[data-photo]').forEach(handlePhoto);
  const realPartners = window.TALENTO_CONFIG.partners.filter(
    (p) => p.verified && p.name && p.name.trim(),
  );
  if (realPartners.length) {
    let section = $('#colaboraciones'),
      list = $('#trust-list');
    realPartners.forEach((p) => list.append(node('span', p.name, 'trust-name')));
    section.hidden = false;
  }
  // Google Forms navega el iframe después de enviar. Al dejar de recortarlo en ese
  // momento, la pantalla de confirmación queda visible en lugar de parecer vacía.
  const googleFormFrame = $('.google-form-embed iframe');
  const googleFormEmbed = $('.google-form-embed');
  const googleFormFeedback = $('#google-form-feedback');
  let googleFormInitialLoad = true;
  googleFormFrame?.addEventListener('load', () => {
    if (googleFormInitialLoad) {
      googleFormInitialLoad = false;
      return;
    }
    googleFormEmbed.classList.add('is-submitted');
    googleFormFeedback.hidden = false;
    googleFormFeedback.focus({ preventScroll: true });
  });
  $('#year').textContent = new Date().getFullYear();
})();
