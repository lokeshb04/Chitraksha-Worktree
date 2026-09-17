/* =========================================================================
   CHITRAKSH — SITE SCRIPT
   All UI is generated from window.SITE_DATA (see data.js).
   ========================================================================= */

(function () {
  "use strict";

  const DATA = window.SITE_DATA || {};
  const SETTINGS = DATA.settings || {};
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const SOUND_STORAGE_KEY = "chitraksh-sound";

  function esc(str) {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function safeUrl(url) {
    if (!url || typeof url !== "string" || url.trim() === "" || url.trim() === "#") return null;
    return url.trim();
  }

  function externalLinkAttrs(url) {
    return `target="_blank" rel="noopener noreferrer" href="${esc(url)}"`;
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function effectsEnabled() {
    return SETTINGS.enableAnimations !== false && !prefersReducedMotion() && !document.body.classList.contains("effects-off");
  }

  /* -----------------------------------------------------------------------
     EFFECTS CONFIG
  ----------------------------------------------------------------------- */
  function applyEffectConfig() {
    const intensity = Number(SETTINGS.effectIntensity);
    document.documentElement.style.setProperty("--effect-intensity", Number.isFinite(intensity) ? String(Math.min(1, Math.max(0, intensity))) : "1");
    const speed = Number(SETTINGS.transitionSpeedMs);
    document.documentElement.style.setProperty("--reveal-duration", Number.isFinite(speed) ? `${speed / 1000}s` : "0.7s");

    if (SETTINGS.enableAnimations === false || prefersReducedMotion()) {
      document.body.classList.add("effects-off");
    }
    if (prefersReducedMotion()) {
      document.body.classList.add("reduce-motion");
    }
  }

  /* -----------------------------------------------------------------------
     SOUND
  ----------------------------------------------------------------------- */
  const soundCache = {};
  let soundOn = false;

  function initializeSound() {
    const toggle = document.getElementById("soundToggle");
    if (!SETTINGS.enableSoundFeature) {
      if (toggle) toggle.remove();
      return;
    }

    const stored = localStorage.getItem(SOUND_STORAGE_KEY);
    if (stored === "on") soundOn = true;
    else if (stored === "off") soundOn = false;
    else soundOn = SETTINGS.soundDefaultOn === true;

    updateSoundToggle();

    if (toggle) {
      toggle.addEventListener("click", () => {
        soundOn = !soundOn;
        localStorage.setItem(SOUND_STORAGE_KEY, soundOn ? "on" : "off");
        updateSoundToggle();
        playSound("click");
      });
    }

    document.addEventListener("click", (e) => {
      const interactive = e.target.closest("a, button");
      if (!interactive || interactive.id === "soundToggle") return;
      const isNav = interactive.closest(".navbar");
      playSound(isNav ? "navigate" : "click");
    });
  }

  function updateSoundToggle() {
    const toggle = document.getElementById("soundToggle");
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(soundOn));
    toggle.setAttribute("aria-label", soundOn ? "Sound is on. Click to disable website sounds." : "Sound is off. Click to enable website sounds.");
    const offIcon = toggle.querySelector(".icon-sound-off");
    const onIcon = toggle.querySelector(".icon-sound-on");
    if (offIcon) offIcon.hidden = soundOn;
    if (onIcon) onIcon.hidden = !soundOn;
  }

  function playSound(name) {
    if (!soundOn || !SETTINGS.enableSoundFeature) return;
    const src = (SETTINGS.sounds || {})[name];
    if (!src) return;
    try {
      if (!soundCache[src]) {
        const audio = new Audio(src);
        audio.preload = "auto";
        audio.volume = 0.28;
        soundCache[src] = audio;
      }
      const audio = soundCache[src].cloneNode();
      audio.volume = 0.28;
      audio.play().catch(() => {});
    } catch (err) {
      /* Missing files fail silently until you add assets/sounds/*.mp3 */
    }
  }

  /* -----------------------------------------------------------------------
     CLUB INFO / HERO / ABOUT / FORM
  ----------------------------------------------------------------------- */
  function renderClubInformation() {
    const club = DATA.club || {};
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || ""; };

    setText("brandName", club.name);
    setText("brandSubtitle", club.subtitle);
    setText("footerBrand", club.name);
    setText("footerSubtitle", club.subtitle);
    setText("footerTagline", club.tagline);
    setText("footerCopyName", club.name);
    setText("footerAddress", club.address);
    setText("aboutCollege", club.college);
    setText("aboutText", club.about);

    const emailEl = document.getElementById("footerEmail");
    if (emailEl && club.email) { emailEl.textContent = club.email; emailEl.href = `mailto:${club.email}`; }

    const phoneEl = document.getElementById("footerPhone");
    if (phoneEl && club.phone) { phoneEl.textContent = club.phone; phoneEl.href = `tel:${club.phone.replace(/\s+/g, "")}`; }

    const yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const igLinks = ["navInstagram", "footerInstagram", "ctaInstagram"];
    const ytLinks = ["navYoutube", "footerYoutube", "ctaYoutube"];
    const ig = safeUrl(club.instagram);
    const yt = safeUrl(club.youtube);

    igLinks.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (ig) el.href = ig;
      else el.remove();
    });
    ytLinks.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (yt) el.href = yt;
      else el.remove();
    });

    const hero = DATA.hero || {};
    setText("heroEyebrow", hero.eyebrow);
    setText("heroTitle", hero.title || club.name);
    setText("heroTagline", hero.tagline || club.tagline);

    const heroBg = document.getElementById("heroBackground");
    if (heroBg && hero.background) {
      heroBg.src = hero.background;
      heroBg.alt = "";
    }
    const heroLogo = document.getElementById("heroLogo");
    if (heroLogo && hero.logo) {
      heroLogo.src = hero.logo;
      heroLogo.alt = `${club.name || "Team Chitraksh"} logo`;
    }
    const navLogo = document.getElementById("navLogo");
    if (navLogo && hero.logo) navLogo.src = hero.logo;

    const heroCta = document.getElementById("heroCta");
    if (heroCta) {
      const span = heroCta.querySelector("span");
      if (span) span.textContent = hero.ctaLabel || "Explore Our Work";
      heroCta.setAttribute("href", hero.ctaTarget || "#gallery");
    }

    const titleClub = club.name || "Team Chitraksh";
    const titleSub = club.subtitle || "Photography Club";
    document.title = `${titleClub} | ${titleSub}`;

    const desc = document.querySelector('meta[name="description"]');
    if (desc && club.about) desc.setAttribute("content", club.about);

    renderGoogleForm(club);
  }

  function renderGoogleForm(club) {
    const form = DATA.googleForm || {};
    const notice = document.getElementById("queryNotice");
    if (notice && form.notice) notice.textContent = form.notice;

    const wrap = document.getElementById("queryFrameWrap");
    const frame = document.getElementById("queryFrame");
    const fallback = document.getElementById("queryFallback");
    const openBtn = document.getElementById("queryOpenBtn");
    const mailto = document.getElementById("queryMailto");

    if (mailto && club.email) mailto.href = `mailto:${club.email}`;

    const embed = safeUrl(form.embedUrl);
    const url = safeUrl(form.url);

    if (embed && frame && wrap) {
      frame.src = embed;
      wrap.hidden = false;
      if (fallback) fallback.hidden = true;
    }

    if (url && openBtn) {
      openBtn.href = url;
      openBtn.hidden = false;
    }
  }

  /* -----------------------------------------------------------------------
     EVENTS DRIVE LINKS
  ----------------------------------------------------------------------- */
  function renderDriveLinks() {
    const grid = document.getElementById("driveGrid");
    if (!grid) return;
    const events = DATA.eventsDriveLinks || [];

    if (events.length === 0) {
      grid.innerHTML = `<p class="empty-state">No event folders yet. Add entries to the <code>eventsDriveLinks</code> array in data.js.</p>`;
      return;
    }

    grid.innerHTML = events.map((ev) => {
      const drive = safeUrl(ev.driveLink);
      const extras = (ev.additionalLinks || []).filter((l) => l && safeUrl(l.url));
      const links = [];
      if (drive) {
        links.push(`<a class="event-card__link" href="${esc(drive)}" target="_blank" rel="noopener noreferrer">Open Drive folder</a>`);
      }
      extras.forEach((l) => {
        links.push(`<a class="event-card__link" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label || "Additional link")}</a>`);
      });

      return `
        <article class="event-card${drive ? "" : " is-static"}" data-animate>
          <div class="event-card__media">
            <img src="${esc(ev.image)}" alt="${esc(ev.title)}" loading="lazy" decoding="async">
          </div>
          <div class="event-card__body">
            <h3>${esc(ev.title)}</h3>
            <p class="event-card__date">${esc(ev.date)}</p>
            ${ev.description ? `<p class="event-card__desc">${esc(ev.description)}</p>` : ""}
            ${links.length ? `<div class="event-card__links">${links.join("")}</div>` : `<p class="event-card__desc">Drive link pending — add <code>driveLink</code> in data.js.</p>`}
          </div>
        </article>
      `;
    }).join("");

    observeAnimations(grid);
  }

  /* -----------------------------------------------------------------------
     UPCOMING EVENTS
  ----------------------------------------------------------------------- */
  function renderUpcomingEvents() {
    const list = document.getElementById("upcomingList");
    if (!list) return;
    const events = (DATA.upcomingEvents || []).filter((ev) => ev && ev.title);

    if (events.length === 0) {
      list.innerHTML = `<p class="empty-state">No upcoming events are listed right now. When a shoot or campus event is confirmed, add it to <code>upcomingEvents</code> in data.js.</p>`;
      return;
    }

    list.innerHTML = events.map((ev) => {
      const reg = safeUrl(ev.registrationLink);
      const details = safeUrl(ev.detailsLink);
      const meta = [ev.time, ev.venue, ev.organizer].filter(Boolean).join(" · ");
      return `
        <article class="upcoming-card" data-animate>
          <div>
            <div class="upcoming-card__date">${esc(ev.date || "")}</div>
            ${meta ? `<div class="upcoming-card__meta">${esc(meta)}</div>` : ""}
          </div>
          <div>
            <h3>${esc(ev.title)}</h3>
            ${ev.description ? `<p>${esc(ev.description)}</p>` : ""}
            ${ev.additionalInfo ? `<p>${esc(ev.additionalInfo)}</p>` : ""}
            <div class="upcoming-card__actions">
              ${details ? `<a class="btn btn--outline" ${externalLinkAttrs(details)}>View details</a>` : ""}
              ${reg ? `<a class="btn btn--primary" ${externalLinkAttrs(reg)}>Register</a>` : ""}
            </div>
          </div>
        </article>
      `;
    }).join("");

    observeAnimations(list);
  }

  /* -----------------------------------------------------------------------
     INFINITE GALLERY + LIGHTBOX
  ----------------------------------------------------------------------- */
  let galleryItems = [];

  function renderGallery() {
    const track = document.getElementById("galleryTrack");
    if (!track) return;
    const items = DATA.gallery || [];
    galleryItems = items;

    if (items.length === 0) {
      track.innerHTML = `<p class="empty-state">Add photographs to the <code>gallery</code> array in data.js to populate this section.</p>`;
      return;
    }

    const cardHTML = (item, index) => `
      <div class="gallery__item" data-index="${index}" role="button" tabindex="0" aria-label="Open ${esc(item.title)} in viewer">
        <img src="${esc(item.image)}" alt="${esc(item.alt || item.title || "Gallery photograph")}" loading="lazy" decoding="async">
        <div class="gallery__caption">
          <strong>${esc(item.title)}</strong>
          <span>${esc(item.category)}</span>
        </div>
      </div>
    `;

    const singleSet = items.map(cardHTML).join("");
    track.innerHTML = singleSet + singleSet;

    initializeInfiniteGallery(track);
    initializeLightbox(track);
  }

  function initializeInfiniteGallery(track) {
    if (SETTINGS.enableGalleryAutoplay && effectsEnabled()) {
      track.style.animationDuration = `${SETTINGS.gallerySpeed || 50}s`;
    } else {
      track.style.animation = "none";
    }

    const wrapper = document.getElementById("galleryTrackWrapper");
    const pause = () => track.classList.add("is-paused");
    const resume = () => track.classList.remove("is-paused");

    wrapper.addEventListener("mouseenter", pause);
    wrapper.addEventListener("mouseleave", resume);
    wrapper.addEventListener("touchstart", pause, { passive: true });
    wrapper.addEventListener("touchend", () => setTimeout(resume, 1200), { passive: true });
  }

  let lightboxIndex = 0;

  function initializeLightbox(track) {
    const lightbox = document.getElementById("lightbox");
    const imgEl = document.getElementById("lightboxImage");
    const titleEl = document.getElementById("lightboxTitle");
    const catEl = document.getElementById("lightboxCategory");
    const closeBtn = document.getElementById("lightboxClose");
    const prevBtn = document.getElementById("lightboxPrev");
    const nextBtn = document.getElementById("lightboxNext");

    function openAt(index) {
      if (!galleryItems.length) return;
      lightboxIndex = ((index % galleryItems.length) + galleryItems.length) % galleryItems.length;
      const item = galleryItems[lightboxIndex];
      imgEl.src = item.image;
      imgEl.alt = item.alt || item.title || "";
      titleEl.textContent = item.title || "";
      catEl.textContent = item.category || "";
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    function close() {
      lightbox.hidden = true;
      document.body.style.overflow = "";
    }

    track.addEventListener("click", (e) => {
      const card = e.target.closest(".gallery__item");
      if (!card) return;
      openAt(Number(card.dataset.index));
    });

    track.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const card = e.target.closest(".gallery__item");
      if (!card) return;
      e.preventDefault();
      openAt(Number(card.dataset.index));
    });

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", () => openAt(lightboxIndex - 1));
    nextBtn.addEventListener("click", () => openAt(lightboxIndex + 1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", (e) => {
      if (lightbox.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") openAt(lightboxIndex - 1);
      if (e.key === "ArrowRight") openAt(lightboxIndex + 1);
    });

    let touchStartX = null;
    lightbox.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    lightbox.addEventListener("touchend", (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) openAt(lightboxIndex + (dx < 0 ? 1 : -1));
      touchStartX = null;
    }, { passive: true });
  }

  /* -----------------------------------------------------------------------
     ACHIEVEMENTS
  ----------------------------------------------------------------------- */
  function renderAchievements() {
    const grid = document.getElementById("achievementsGrid");
    if (!grid) return;
    const items = DATA.achievements || [];

    if (items.length === 0) {
      grid.innerHTML = `<p class="empty-state">Add entries to the <code>achievements</code> array in data.js.</p>`;
      return;
    }

    grid.innerHTML = items.map((a) => `
      <article class="achievement-card" data-animate>
        <img src="${esc(a.image)}" alt="${esc(a.title)}" loading="lazy" decoding="async">
        <div class="achievement-card__overlay">
          <span class="achievement-card__year">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 4H17V9C17 11.7614 14.7614 14 12 14C9.23858 14 7 11.7614 7 9V4Z" stroke="currentColor" stroke-width="1.8"/></svg>
            ${esc(a.year)}
          </span>
          <h3>${esc(a.title)}</h3>
          ${a.organization ? `<p class="achievement-card__org">${esc(a.organization)}</p>` : ""}
          ${a.description ? `<p class="achievement-card__desc">${esc(a.description)}</p>` : ""}
        </div>
      </article>
    `).join("");

    observeAnimations(grid);
  }

  /* -----------------------------------------------------------------------
     LEADERSHIP / TEAM
  ----------------------------------------------------------------------- */
  const GROUP_ORDER = ["Institute Leadership", "Faculty", "Club Leadership", "Team Heads", "Core Team", "Volunteers"];

  function socialIcons(member) {
    if (!SETTINGS.showMemberSocialLinks) return "";
    const links = [];
    const ig = safeUrl(member.instagram);
    const li = safeUrl(member.linkedin);
    const em = member.email && member.email.trim() ? member.email.trim() : null;

    if (ig) links.push(`<a ${externalLinkAttrs(ig)} aria-label="${esc(member.name)} on Instagram"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3.6" stroke="currentColor" stroke-width="1.8"/></svg></a>`);
    if (li) links.push(`<a ${externalLinkAttrs(li)} aria-label="${esc(member.name)} on LinkedIn"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.8"/><path d="M8 10.5V17M8 7.5V7.51M12 17V10.5M16 17V13.2C16 11.7 15 10.8 13.8 11.2C13.2 11.4 12.6 11.9 12 12.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></a>`);
    if (em) links.push(`<a href="mailto:${esc(em)}" aria-label="Email ${esc(member.name)}"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 6.5L12 13L20 6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></a>`);

    return links.length ? `<div class="member-card__social">${links.join("")}</div>` : "";
  }

  function memberCard(member, featured) {
    const cardClass = ["member-card", featured ? "member-card--featured" : ""].filter(Boolean).join(" ");
    return `
      <article class="${cardClass}" data-animate>
        <div class="member-card__media">
          <img src="${esc(member.image)}" alt="${esc(member.name)}" loading="lazy" decoding="async">
          ${socialIcons(member)}
        </div>
        <div class="member-card__body">
          <h3>${esc(member.name)}</h3>
          <p class="member-card__position">${esc(member.position)}</p>
          ${member.description ? `<p class="member-card__meta">${esc(member.description)}</p>` : ""}
        </div>
      </article>
    `;
  }

  function groupMembers(members) {
    const byGroup = new Map();
    members.forEach((m) => {
      const g = m.group || "Members";
      if (!byGroup.has(g)) byGroup.set(g, []);
      byGroup.get(g).push(m);
    });
    const orderedGroups = [
      ...GROUP_ORDER.filter((g) => byGroup.has(g)),
      ...Array.from(byGroup.keys()).filter((g) => !GROUP_ORDER.includes(g))
    ];
    return { byGroup, orderedGroups };
  }

  function renderGroupBlock(group, list, featured) {
    const gridClass = featured ? "team__grid team__grid--featured" : "team__grid";
    return `
      <div class="team__group" data-group="${esc(group)}">
        <h3 class="team__group-title">${esc(group)}</h3>
        <div class="${gridClass}">
          ${list.map((m) => memberCard(m, featured)).join("")}
        </div>
      </div>
    `;
  }

  function renderLeadership() {
    const coreWrap = document.getElementById("teamCore");
    const groupsWrap = document.getElementById("teamGroups");
    if (!coreWrap || !groupsWrap) return;
    const members = DATA.leadership || [];
    const homeGroups = SETTINGS.homeTeamGroups || ["Club Leadership"];

    if (members.length === 0) {
      coreWrap.innerHTML = `<p class="empty-state">Add entries to the <code>leadership</code> array in data.js.</p>`;
      renderLeadershipFilters([]);
      return;
    }

    const { byGroup, orderedGroups } = groupMembers(members);
    const home = orderedGroups.filter((g) => homeGroups.includes(g));
    const extended = orderedGroups.filter((g) => !homeGroups.includes(g));

    coreWrap.innerHTML = home.map((group) => {
      const list = byGroup.get(group).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
      const featured = group === "Institute Leadership" || group === "Faculty" || group === "Club Leadership";
      return renderGroupBlock(group, list, featured);
    }).join("");

    groupsWrap.innerHTML = extended.map((group) => {
      const list = byGroup.get(group).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
      const featured = group === "Institute Leadership" || group === "Faculty";
      return renderGroupBlock(group, list, featured);
    }).join("");

    const moreBtn = document.getElementById("teamMoreBtn");
    if (moreBtn) moreBtn.hidden = extended.length === 0;

    renderLeadershipFilters(extended);
    observeAnimations(coreWrap);
    observeAnimations(groupsWrap);
    initializeTeamMore();
  }

  function initializeTeamMore() {
    const btn = document.getElementById("teamMoreBtn");
    const panel = document.getElementById("teamExtended");
    if (!btn || !panel || btn.dataset.bound) return;
    btn.dataset.bound = "true";
    btn.addEventListener("click", () => {
      const open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Show less" : "More Info";
      if (open) panel.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    });
  }

  function renderLeadershipFilters(groups) {
    const filterWrap = document.getElementById("teamFilters");
    if (!filterWrap) return;
    if (groups.length === 0) { filterWrap.innerHTML = ""; return; }

    const buttons = ["All", ...groups];
    filterWrap.innerHTML = buttons.map((g, i) => `
      <button class="team__filter${i === 0 ? " is-active" : ""}" type="button" data-filter="${esc(g)}" role="tab" aria-selected="${i === 0}">${esc(g)}</button>
    `).join("");

    filterWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".team__filter");
      if (!btn) return;
      const filter = btn.dataset.filter;

      $$(".team__filter", filterWrap).forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });

      $$(".team__group", document.getElementById("teamGroups")).forEach((group) => {
        const match = filter === "All" || group.dataset.group === filter;
        group.hidden = !match;
      });
    });
  }

  /* -----------------------------------------------------------------------
     FORMER MEMBERS
  ----------------------------------------------------------------------- */
  function renderFormerMembers() {
    const grid = document.getElementById("formerGrid");
    if (!grid) return;
    const members = DATA.formerMembers || [];
    const limit = SETTINGS.formerMembersInitialLimit || 6;

    if (members.length === 0) {
      grid.innerHTML = `<p class="empty-state">Add entries to the <code>formerMembers</code> array in data.js.</p>`;
      renderFormerFilters([]);
      return;
    }

    grid.innerHTML = members.map((m, i) => {
      const links = [];
      const ig = safeUrl(m.instagram);
      const li = safeUrl(m.linkedin);
      if (ig) links.push(`<a ${externalLinkAttrs(ig)} aria-label="${esc(m.name)} on Instagram"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3.6" stroke="currentColor" stroke-width="1.8"/></svg></a>`);
      if (li) links.push(`<a ${externalLinkAttrs(li)} aria-label="${esc(m.name)} on LinkedIn"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.8"/><path d="M8 10.5V17M8 7.5V7.51M12 17V10.5M16 17V13.2C16 11.7 15 10.8 13.8 11.2C13.2 11.4 12.6 11.9 12 12.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></a>`);

      return `
        <article class="former-card${i >= limit ? " is-hidden" : ""}" data-position="${esc(m.position)}" data-animate>
          <div class="former-card__media">
            <img src="${esc(m.image)}" alt="${esc(m.name)}" loading="lazy" decoding="async">
            ${m.tenure ? `<span class="former-card__badge">${esc(m.tenure)}</span>` : ""}
          </div>
          <div class="former-card__body">
            <h3>${esc(m.name)}</h3>
            <p class="former-card__position">${esc(m.position)}</p>
            ${m.batch ? `<p class="former-card__meta">${esc(m.batch)}</p>` : ""}
            ${links.length ? `<div class="former-card__social">${links.join("")}</div>` : ""}
          </div>
        </article>
      `;
    }).join("");

    const uniquePositions = Array.from(new Set(members.map((m) => m.position).filter(Boolean)));
    renderFormerFilters(uniquePositions);
    initializeFormerMemberControls(members.length, limit);
    observeAnimations(grid);
  }

  function renderFormerFilters(positions) {
    const wrap = document.getElementById("formerFilters");
    if (!wrap) return;
    if (positions.length === 0) { wrap.innerHTML = ""; return; }

    const buttons = ["All", ...positions];
    wrap.innerHTML = buttons.map((p, i) => `
      <button class="former__filter${i === 0 ? " is-active" : ""}" type="button" data-filter="${esc(p)}" role="tab" aria-selected="${i === 0}">${esc(p)}</button>
    `).join("");

    wrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".former__filter");
      if (!btn) return;
      const filter = btn.dataset.filter;

      $$(".former__filter", wrap).forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });

      const toggleBtn = document.getElementById("formerToggleBtn");
      const cards = $$(".former-card", document.getElementById("formerGrid"));

      if (filter === "All") {
        toggleBtn.hidden = cards.length <= (SETTINGS.formerMembersInitialLimit || 6);
        applyFormerLimit(toggleBtn.textContent.trim() === "Show Less" ? cards.length : (SETTINGS.formerMembersInitialLimit || 6));
      } else {
        toggleBtn.hidden = true;
        cards.forEach((c) => { c.classList.toggle("is-hidden", c.dataset.position !== filter); });
      }
    });
  }

  function applyFormerLimit(limit) {
    const cards = $$(".former-card", document.getElementById("formerGrid"));
    cards.forEach((c, i) => c.classList.toggle("is-hidden", i >= limit));
  }

  function initializeFormerMemberControls(total, limit) {
    const btn = document.getElementById("formerToggleBtn");
    if (!btn) return;
    btn.hidden = total <= limit;
    btn.textContent = "Show More";
    if (btn.dataset.bound) return;
    btn.dataset.bound = "true";

    btn.addEventListener("click", () => {
      const showingAll = btn.textContent.trim() === "Show Less";
      if (showingAll) {
        applyFormerLimit(limit);
        btn.textContent = "Show More";
      } else {
        applyFormerLimit(total);
        btn.textContent = "Show Less";
      }
    });
  }

  /* -----------------------------------------------------------------------
     YOUTUBE / REELS
  ----------------------------------------------------------------------- */
  function renderVideos() {
    const grid = document.getElementById("videosGrid");
    if (!grid) return;
    const videos = DATA.videos || [];

    if (videos.length === 0) {
      grid.innerHTML = `<p class="empty-state">Add entries to the <code>videos</code> array in data.js.</p>`;
      return;
    }

    grid.innerHTML = videos.map((v) => {
      const url = safeUrl(v.url);
      const tag = url ? "a" : "div";
      const attrs = url ? externalLinkAttrs(url) : "";
      return `
        <${tag} class="video-card" ${attrs} data-animate>
          <div class="video-card__thumb">
            <img src="${esc(v.thumbnail)}" alt="${esc(v.title)}" loading="lazy" decoding="async">
            <span class="video-card__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M9 6.5L18 12L9 17.5V6.5Z" fill="currentColor"/></svg>
            </span>
          </div>
          <div class="video-card__title">
            <span>${esc(v.title)}</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </${tag}>
      `;
    }).join("");

    observeAnimations(grid);
  }

  function renderReels() {
    const grid = document.getElementById("reelsGrid");
    if (!grid) return;
    const reels = DATA.reels || [];

    if (reels.length === 0) {
      grid.innerHTML = `<p class="empty-state">Add entries to the <code>reels</code> array in data.js.</p>`;
      return;
    }

    grid.innerHTML = reels.map((r) => {
      const url = safeUrl(r.url);
      const tag = url ? "a" : "div";
      const attrs = url ? externalLinkAttrs(url) : "";
      return `
        <${tag} class="reel-card" ${attrs} data-animate>
          <img src="${esc(r.image)}" alt="${esc(r.title)}" loading="lazy" decoding="async">
          <span class="reel-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3.6" stroke="currentColor" stroke-width="1.8"/></svg>
          </span>
          <div class="reel-card__overlay"><strong>${esc(r.title)}</strong></div>
        </${tag}>
      `;
    }).join("");

    observeAnimations(grid);
  }

  /* -----------------------------------------------------------------------
     NAVIGATION + MORE MENU + SECONDARY PAGES
  ----------------------------------------------------------------------- */
  function initializeNavigation() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("primaryNav");

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    $$("a", nav).forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });

    const sections = $$("main section[id]");
    const navLinks = $$("[data-nav-link]");

    const setActive = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    };

    if ("IntersectionObserver" in window && sections.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

      sections.forEach((s) => observer.observe(s));
    }

    initializeMoreMenu();
    initializeSecondaryView();
  }

  function initializeMoreMenu() {
    const toggle = document.getElementById("moreToggle");
    const panel = document.getElementById("morePanel");
    if (!toggle || !panel) return;

    const close = () => {
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      if (open) panel.querySelector("button")?.focus();
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest("#moreMenu")) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !panel.hidden) {
        close();
        toggle.focus();
      }
    });
  }

  function initializeSecondaryView() {
    const view = document.getElementById("secondaryView");
    const closeBtn = document.getElementById("secondaryClose");
    if (!view) return;

    function openPanel(name) {
      view.hidden = false;
      document.body.classList.add("secondary-open");
      $$("[data-secondary-panel]", view).forEach((panel) => {
        panel.hidden = panel.getAttribute("data-secondary-panel") !== name;
      });
      const morePanel = document.getElementById("morePanel");
      const moreToggle = document.getElementById("moreToggle");
      if (morePanel) morePanel.hidden = true;
      if (moreToggle) moreToggle.setAttribute("aria-expanded", "false");
      view.scrollTop = 0;
      closeBtn?.focus();
    }

    function close() {
      view.hidden = true;
      document.body.classList.remove("secondary-open");
      $$("[data-secondary-panel]", view).forEach((panel) => { panel.hidden = true; });
    }

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-open-secondary]");
      if (!trigger) return;
      openPanel(trigger.getAttribute("data-open-secondary"));
    });

    closeBtn?.addEventListener("click", close);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !view.hidden && document.getElementById("lightbox")?.hidden !== false) {
        const lightbox = document.getElementById("lightbox");
        if (lightbox && !lightbox.hidden) return;
        close();
      }
    });
  }

  /* -----------------------------------------------------------------------
     PARALLAX
  ----------------------------------------------------------------------- */
  function initializeParallax() {
    if (!SETTINGS.enableParallax || !effectsEnabled()) return;
    const media = document.querySelector(".hero__media img");
    if (!media) return;
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          media.style.transform = `scale(1.06) translate3d(0, ${y * 0.12}px, 0)`;
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* -----------------------------------------------------------------------
     SCROLL ENTRANCE ANIMATIONS
  ----------------------------------------------------------------------- */
  let sharedObserver = null;

  function initializeScrollAnimations() {
    if (!effectsEnabled()) {
      $$("[data-animate]").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    sharedObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          sharedObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    observeAnimations(document);
  }

  function observeAnimations(root) {
    if (!sharedObserver) {
      $$("[data-animate]", root).forEach((el) => el.classList.add("is-visible"));
      return;
    }
    $$("[data-animate]", root).forEach((el) => sharedObserver.observe(el));
  }

  /* -----------------------------------------------------------------------
     INIT
  ----------------------------------------------------------------------- */
  function initializeSite() {
    applyEffectConfig();
    renderClubInformation();
    renderDriveLinks();
    renderUpcomingEvents();
    renderGallery();
    renderAchievements();
    renderLeadership();
    renderFormerMembers();
    renderVideos();
    renderReels();
    initializeNavigation();
    initializeSound();
    initializeScrollAnimations();
    initializeParallax();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSite);
  } else {
    initializeSite();
  }
})();
