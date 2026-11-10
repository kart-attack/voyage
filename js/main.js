(() => {
  const d = document;
  const root = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const DATA = window.VOYAGE;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger) && !reduced;
  const mobileMQ = matchMedia("(max-width: 767px)");

  root.classList.add("js");
  if (reduced) root.classList.add("reduced");
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };

  /* ---------- Theme ---------- */
  function initTheme() {
    const btn = $("#themeToggle");
    const label = $(".theme-label", btn);
    const apply = (t) => {
      root.dataset.theme = t;
      btn.setAttribute("aria-pressed", String(t === "dark"));
      label.textContent = t === "dark" ? "Day" : "Night";
    };
    apply(root.dataset.theme === "dark" ? "dark" : "light");
    btn.addEventListener("click", () => {
      const t = root.dataset.theme === "dark" ? "light" : "dark";
      apply(t);
      store.set("voyage-theme", t);
    });
  }

  /* ---------- Clock ---------- */
  function initClock() {
    const el = $("#clock");
    const f = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
    const tick = () => { el.textContent = f.format(new Date()).toUpperCase(); };
    tick();
    setInterval(tick, 15000);
  }

  /* ---------- Sea waves ---------- */
  function initWaves() {
    const svg = $("#waves");
    const ns = "http://www.w3.org/2000/svg";
    const rows = [
      [548, 0.45, 26, "40 80"], [572, 0.5, 22, "60 180"], [606, 0.6, 19, "50 70"],
      [650, 0.7, 16, "90 150"], [705, 0.8, 14, "70 170"], [770, 0.85, 12, "120 120"],
      [845, 0.95, 10, "80 160"], [925, 1, 9, "140 100"]
    ];
    rows.forEach(([y, o, dur, dash], i) => {
      const amp = 3 + i * 0.9;
      let path = `M-480 ${y}`;
      for (let x = -480; x < 2080; x += 120) path += ` q30 -${amp} 60 0 t60 0`;
      const p = d.createElementNS(ns, "path");
      p.setAttribute("d", path);
      p.setAttribute("class", "wave");
      p.style.opacity = o;
      p.style.strokeDasharray = dash;
      p.style.strokeDashoffset = String((i * 37) % 120);
      p.style.animationDuration = `${dur}s`;
      p.style.strokeWidth = String(1.6 + i * 0.25);
      svg.appendChild(p);
    });
  }

  /* ---------- Hero ---------- */
  function initHero() {
    const pins = $$(".pin");
    const lines = $$(".hero__title .line > span");
    if (!hasGsap) return;

    gsap.set(pins, { x: 0, y: 0, xPercent: -50, yPercent: -100 });
    gsap.set(".layer, .pins", { transformOrigin: "50% 74%" });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(".layer--mid svg > g", { y: "+=70", opacity: 0, duration: 1.5, stagger: 0.07 }, 0.1)
      .from(".layer--near svg > g", { y: "+=90", opacity: 0, duration: 1.5, stagger: 0.12 }, 0.3)
      .from(".banner", { x: -160, opacity: 0, duration: 1.6 }, 0.2)
      .from(".hero__hi", { y: 24, opacity: 0, duration: 1 }, 0.35)
      .from(lines, { yPercent: 115, duration: 1.3, stagger: 0.12 }, 0.4)
      .fromTo(".strike", { "--hl": 0 }, { "--hl": 1, duration: 0.7, ease: "power2.out" }, 1.15)
      .fromTo(".strike", { "--strike": 1 }, { "--strike": 0, duration: 0.6, ease: "power2.inOut" }, 1.6)
      .from(".hero__lede", { y: 20, opacity: 0, duration: 1 }, 0.8)
      .from(pins, { scale: 0, opacity: 0, transformOrigin: "50% 100%", duration: 0.9, stagger: 0.06, ease: "back.out(2.2)" }, 1.2)
      .from(".scroll-cue", { y: 20, opacity: 0, duration: 0.8 }, 1.7)
      .from(".world-note", { opacity: 0, x: -10, duration: 0.8 }, 2.1);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: ".hero", start: "top top", end: "+=110%", scrub: 1, pin: true, onEnter: closePopover }
      })
        .to(".hero__copy", { y: -140, opacity: 0, duration: 0.4 }, 0)
        .fromTo(".scroll-cue", { opacity: 1 }, { opacity: 0, duration: 0.12, immediateRender: false }, 0)
        .fromTo(".world-note", { opacity: 1 }, { opacity: 0, duration: 0.15, immediateRender: false }, 0)
        .to(".layer--sky", { scale: 1.08, duration: 1 }, 0)
        .to(".layer--far", { scale: 1.2, duration: 1 }, 0)
        .to(".layer--sea", { scale: 1.32, duration: 1 }, 0)
        .to(".layer--mid", { scale: 1.6, yPercent: -3, duration: 1 }, 0)
        .to(".pins", { scale: 1.6, yPercent: -3, opacity: 0, duration: 0.55 }, 0)
        .to(".layer--near", { scale: 2.2, yPercent: 8, duration: 1 }, 0);
    });
    mm.add("(max-width: 767px)", () => {
      const world = $("#world");
      const dist = () => Math.max(0, world.offsetWidth - window.innerWidth);
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: ".hero", start: "top top", end: () => "+=" + Math.max(dist() * 1.3, 300), scrub: 1, pin: true, invalidateOnRefresh: true }
      })
        .to(world, { x: () => -dist(), duration: 1 }, 0)
        .to(".hero__copy", { opacity: 0, y: -60, duration: 0.2 }, 0)
        .fromTo(".scroll-cue", { opacity: 1 }, { opacity: 0, duration: 0.08, immediateRender: false }, 0);
    });
  }

  /* ---------- Pins + popover ---------- */
  const pop = $("#popover");
  let openPin = null;

  function closePopover() {
    if (!openPin) return;
    pop.hidden = true;
    openPin.classList.remove("is-open");
    openPin.setAttribute("aria-expanded", "false");
    openPin = null;
  }

  function placePopover(pin) {
    const stage = $(".hero__stage").getBoundingClientRect();
    const chip = $(".pin__chip", pin).getBoundingClientRect();
    if (mobileMQ.matches) { pop.style.left = ""; pop.style.top = ""; return; }
    const w = pop.offsetWidth, h = pop.offsetHeight;
    let left = chip.left + chip.width / 2 - stage.left - w / 2;
    left = Math.min(Math.max(16, left), stage.width - w - 16);
    let top = chip.top - stage.top - h - 14;
    if (top < 70) top = chip.bottom - stage.top + 40;
    pop.style.left = `${left}px`;
    pop.style.top = `${top}px`;
  }

  function initPins() {
    const kicker = $("#popKicker"), title = $("#popTitle"), body = $("#popBody"), link = $("#popLink");
    $$(".pin[data-stop], .pin[data-me]").forEach((pin) => {
      pin.setAttribute("aria-expanded", "false");
      pin.setAttribute("aria-controls", "popover");
      pin.addEventListener("click", (e) => {
        e.stopPropagation();
        if (openPin === pin) return closePopover();
        closePopover();
        if (pin.hasAttribute("data-me")) {
          kicker.textContent = "Captain, Grand Line Creative";
          title.textContent = "Karthika Ramanujam";
          body.textContent = "Director of Creative at Masai School, Bengaluru. 11+ years across food delivery, real estate, fintech, automotive, home care, retail and ed tech.";
          link.textContent = "Read how I got here →";
          link.href = "#story";
          link.dataset.stop = "";
        } else {
          const s = DATA.stops[+pin.dataset.stop];
          kicker.textContent = `${s.role} · ${s.years}`;
          title.textContent = s.org;
          body.textContent = s.line;
          link.textContent = "See this port on the voyage →";
          link.href = "#voyage";
          link.dataset.stop = pin.dataset.stop;
        }
        pop.hidden = false;
        placePopover(pin);
        pin.classList.add("is-open");
        pin.setAttribute("aria-expanded", "true");
        openPin = pin;
      });
    });
    $(".popover__close").addEventListener("click", closePopover);
    pop.addEventListener("click", (e) => e.stopPropagation());
    link.addEventListener("click", (e) => {
      const i = link.dataset.stop;
      closePopover();
      if (i === "" || i === undefined) return;
      e.preventDefault();
      $("#voyage").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      setTimeout(() => window.voyageGo && window.voyageGo(+i), reduced ? 0 : 900);
    });
    d.addEventListener("click", closePopover);
    d.addEventListener("keydown", (e) => { if (e.key === "Escape") closePopover(); });
    window.addEventListener("resize", () => openPin && placePopover(openPin));
    window.addEventListener("scroll", () => { if (openPin && window.scrollY > 60) closePopover(); }, { passive: true });
  }

  /* ---------- Sea sound (synthesised, no audio files) ---------- */
  function initSeaSound() {
    const btn = $("#seaSound");
    const label = $(".sound-label", btn);
    let ctx, out, playing = false;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctx = new AC();
        const len = ctx.sampleRate * 6;
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const data = buf.getChannelData(0);
        let last = 0;
        for (let i = 0; i < len; i++) {
          last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
          data[i] = last * 3.5;
        }
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.loop = true;
        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 700;
        const swell = ctx.createGain();
        swell.gain.value = 0.55;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.11;
        const depth = ctx.createGain();
        depth.gain.value = 0.45;
        lfo.connect(depth).connect(swell.gain);
        out = ctx.createGain();
        out.gain.value = 0;
        src.connect(lp).connect(swell).connect(out).connect(ctx.destination);
        src.start();
        lfo.start();
      }
      if (ctx.state === "suspended") ctx.resume();
      playing = !playing;
      out.gain.setTargetAtTime(playing ? 0.4 : 0, ctx.currentTime, 0.5);
      btn.classList.toggle("is-playing", playing);
      btn.setAttribute("aria-pressed", String(playing));
      label.textContent = playing ? "Pause the sea" : "Play the sea";
    });
  }

  /* ---------- Word scrub + hand-drawn marks ---------- */
  function splitWords(el) {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = d.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.appendChild(d.createTextNode(part));
            else {
              const s = d.createElement("span");
              s.className = "w";
              s.textContent = part;
              frag.appendChild(s);
            }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName.toLowerCase() !== "svg") walk(n);
      });
    };
    walk(el);
    return $$(".w", el);
  }

  const MARK_PATHS = {
    circle: ["0 0 200 100", "M18 58C10 30 60 8 112 10S196 30 190 58 128 96 72 90 4 66 20 34 70 6 104 8"],
    wave: ["0 0 200 20", "M0 10" + " q5 -8 10 0 t10 0".repeat(10)],
    under: ["0 0 200 20", "M2 13Q50 3 100 11T198 7"]
  };

  function addMarks(scope) {
    $$(".mk", scope).forEach((m) => {
      const type = ["circle", "wave", "under"].find((t) => m.classList.contains(`mk--${t}`));
      if (!type) return;
      const [vb, path] = MARK_PATHS[type];
      m.insertAdjacentHTML("beforeend", `<svg viewBox="${vb}" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="${path}"/></svg>`);
    });
  }

  function scrubText(el) {
    const words = splitWords(el);
    addMarks(el);
    const marks = $$(".mk", el).map((m) => {
      const ws = $$(".w", m);
      return [m, words.indexOf(ws[ws.length - 1])];
    });
    const update = (p) => {
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle("is-lit", i < n));
      marks.forEach(([m, last]) => m.classList.toggle("is-on", last < n));
    };
    if (!hasGsap) return update(1);
    ScrollTrigger.create({
      trigger: el, start: "top 78%", end: "bottom 50%", scrub: true,
      onUpdate: (self) => update(self.progress),
      onRefresh: (self) => update(self.progress)
    });
  }

  /* ---------- Draggable ---------- */
  let zTop = 10;
  function makeDraggable(el, boundsEl) {
    let sx = 0, sy = 0, ox = 0, oy = 0, active = false, armed = false, timer = 0, lim = null;
    const start = (e) => {
      active = true;
      sx = e.clientX; sy = e.clientY;
      ox = +el.dataset.dx || 0; oy = +el.dataset.dy || 0;
      if (boundsEl) {
        const b = boundsEl.getBoundingClientRect(), r = el.getBoundingClientRect(), pad = 8;
        lim = { x0: ox + b.left + pad - r.left, x1: ox + b.right - pad - r.right, y0: oy + b.top + pad - r.top, y1: oy + b.bottom - pad - r.bottom };
      }
      el.classList.add("is-dragging");
      el.style.zIndex = ++zTop;
    };
    el.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      el.setPointerCapture(e.pointerId);
      if (e.pointerType === "touch") {
        sx = e.clientX; sy = e.clientY;
        timer = setTimeout(() => { armed = true; start(e); }, 200);
      } else start(e);
    });
    el.addEventListener("pointermove", (e) => {
      if (!active) {
        if (timer && Math.hypot(e.clientX - sx, e.clientY - sy) > 8) { clearTimeout(timer); timer = 0; }
        return;
      }
      let dx = ox + e.clientX - sx, dy = oy + e.clientY - sy;
      if (lim) {
        dx = Math.min(Math.max(dx, Math.min(lim.x0, lim.x1)), Math.max(lim.x0, lim.x1));
        dy = Math.min(Math.max(dy, Math.min(lim.y0, lim.y1)), Math.max(lim.y0, lim.y1));
      }
      el.dataset.dx = dx; el.dataset.dy = dy;
      el.style.translate = `${dx}px ${dy}px`;
    });
    el.addEventListener("touchmove", (e) => { if (armed) e.preventDefault(); }, { passive: false });
    const end = () => {
      clearTimeout(timer); timer = 0;
      active = false; armed = false;
      el.classList.remove("is-dragging");
    };
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
  }

  /* ---------- Story ---------- */
  function initStory() {
    scrubText($("#storyText"));
    $$(".notes .draggable").forEach((n) => makeDraggable(n, $(".story")));
    if (hasGsap) {
      gsap.from(".notes .note", { y: 50, opacity: 0, duration: 1, stagger: 0.12, ease: "back.out(1.6)", clearProps: "transform,opacity", scrollTrigger: { trigger: ".notes", start: "top 80%" } });
    }
  }

  /* ---------- Marquee ---------- */
  function initMarquee() {
    const track = $(".marquee__track");
    [...track.children].forEach((c) => {
      const clone = c.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }

  /* ---------- Voyage chart ---------- */
  function initVoyage() {
    const chart = $("#chart"), map = $("#chartMap"), pinsEl = $("#chartPins"), card = $("#stopCard"), route = $("#route");
    const S = DATA.stops, VW = 1200, VH = 700;
    let idx = -1, pos = { x: 0, y: 0, z: 1 };

    route.setAttribute("pathLength", "1");
    const total = route.getTotalLength();
    const samples = Array.from({ length: 401 }, (_, i) => {
      const p = route.getPointAtLength((total * i) / 400);
      return [p.x, p.y, i / 400];
    });
    const fracs = S.map((s) => samples.reduce((best, q) => (Math.hypot(q[0] - s.x, q[1] - s.y) < Math.hypot(best[0] - s.x, best[1] - s.y) ? q : best))[2]);

    const pins = S.map((s, i) => {
      const b = d.createElement("button");
      b.type = "button";
      b.className = "cpin";
      b.style.left = `${(s.x / VW) * 100}%`;
      b.style.top = `${(s.y / VH) * 100}%`;
      b.style.setProperty("--c", s.color);
      b.setAttribute("aria-label", `${s.org}, ${s.years}`);
      b.innerHTML = `<svg viewBox="0 0 46 56" aria-hidden="true"><path class="cpin__body" d="M23 54S4 34 4 21a19 19 0 0 1 38 0c0 13-19 33-19 33Z"/></svg><span>${s.mono}</span>`;
      b.addEventListener("click", () => go(i));
      pinsEl.appendChild(b);
      return b;
    });

    const dims = () => ({ cw: chart.clientWidth, ch: chart.clientHeight, mw: map.offsetWidth, mh: map.offsetHeight });
    const clampPos = (x, y, z) => {
      const { cw, ch, mw, mh } = dims();
      const minX = Math.min(0, cw - mw * z), minY = Math.min(0, ch - mh * z);
      const cx = mw * z < cw ? (cw - mw * z) / 2 : Math.min(0, Math.max(minX, x));
      const cy = mh * z < ch ? (ch - mh * z) / 2 : Math.min(0, Math.max(minY, y));
      return { x: cx, y: cy, z };
    };
    const apply = (p, animate = true) => {
      pos = clampPos(p.x, p.y, p.z);
      map.style.transition = animate && !reduced ? "transform .9s var(--ease)" : "none";
      map.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${pos.z})`;
    };
    route.style.transition = reduced ? "none" : "stroke-dashoffset 1.1s cubic-bezier(.16,1,.3,1)";

    const overview = (animate = true) => {
      idx = -1;
      chart.classList.remove("is-touring");
      card.hidden = true;
      pins.forEach((p) => p.classList.remove("is-active", "is-visited"));
      route.style.strokeDashoffset = "1";
      const { cw, mw } = dims();
      apply({ x: (cw - mw) / 2, y: 0, z: 1 }, animate);
    };

    const fill = (s, i) => {
      $("#stopNum").textContent = String(i + 1).padStart(2, "0");
      $("#stopOrg").textContent = `${s.org} · ${s.role} · ${s.years}`;
      $("#stopTitle").textContent = s.title;
      $("#stopLine").textContent = s.line;
      $("#stopLabel").textContent = s.label;
      $("#stopFacts").innerHTML = s.facts.map(([b, t]) => `<li><b>${b}</b><span>${t}</span></li>`).join("");
      const cb = $("#stopCase");
      cb.hidden = !s.caseId;
      cb.dataset.case = s.caseId || "";
      $("#stopCount").textContent = `${i + 1} / ${S.length}`;
      $("#stopPrev").disabled = i === 0;
      $("#stopNext").textContent = i === S.length - 1 ? "↺" : "→";
      $("#stopNext").setAttribute("aria-label", i === S.length - 1 ? "Back to the start" : "Next port");
    };

    const go = (i) => {
      idx = Math.max(0, Math.min(S.length - 1, i));
      const s = S[idx];
      chart.classList.add("is-touring");
      card.hidden = false;
      fill(s, idx);
      pins.forEach((p, j) => { p.classList.toggle("is-active", j === idx); p.classList.toggle("is-visited", j < idx); });
      route.style.strokeDashoffset = String(1 - fracs[idx]);
      const { cw, ch, mw, mh } = dims();
      const mobile = mobileMQ.matches;
      const z = mobile ? 1.35 : 1.75;
      const tx = mobile ? cw / 2 : (cw - card.offsetWidth - 40) / 2;
      const ty = mobile ? (ch - card.offsetHeight - 24) / 2 : ch / 2;
      apply({ x: tx - (s.x / VW) * mw * z, y: ty - (s.y / VH) * mh * z, z });
    };
    window.voyageGo = go;

    $("#voyageStart").addEventListener("click", () => go(0));
    $("#voyageClose").addEventListener("click", () => overview());
    $("#stopPrev").addEventListener("click", () => go(idx - 1));
    $("#stopNext").addEventListener("click", () => (idx === S.length - 1 ? go(0) : go(idx + 1)));
    $("#stopCase").addEventListener("click", (e) => openCase(e.currentTarget.dataset.case));
    chart.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1); }
      else if (e.key === "ArrowLeft" && idx > 0) { e.preventDefault(); go(idx - 1); }
      else if (e.key === "Escape" && idx > -1) overview();
    });

    // drag to pan
    let drag = null;
    chart.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 || e.target.closest("button, .stop-card")) return;
      drag = { sx: e.clientX, sy: e.clientY, x: pos.x, y: pos.y, id: e.pointerId };
      chart.setPointerCapture(e.pointerId);
      chart.classList.add("is-grabbing");
    });
    chart.addEventListener("pointermove", (e) => {
      if (!drag) return;
      apply({ x: drag.x + e.clientX - drag.sx, y: drag.y + e.clientY - drag.sy, z: pos.z }, false);
    });
    const endDrag = () => { drag = null; chart.classList.remove("is-grabbing"); };
    chart.addEventListener("pointerup", endDrag);
    chart.addEventListener("pointercancel", endDrag);
    window.addEventListener("resize", () => (idx > -1 ? go(idx) : overview(false)));

    overview(false);
    if (hasGsap) {
      gsap.from(pins, { scale: 0, opacity: 0, duration: 0.7, stagger: 0.08, ease: "back.out(2.4)", clearProps: "transform,opacity", scrollTrigger: { trigger: chart, start: "top 75%" } });
    }
  }

  /* ---------- Chest + case modal ---------- */
  const modal = $("#caseModal");
  const LIGHT = ["#FBB833", "#F19EC8", "#FC8019"];

  function openCase(id) {
    const c = DATA.cases[id];
    if (!c) return;
    $("#caseBody").innerHTML = `
      <header class="case__hero" style="--c:${c.color};--fg:${LIGHT.includes(c.color) ? "#1B2340" : "#fff"}">
        <span class="case__num">Case ${c.num}</span>
        <h2 id="caseTitle">${c.title}</h2>
        <p>${c.org} · ${c.role} · ${c.years}</p>
      </header>
      <div class="case__inner">
        <p class="case__intro">${c.intro}</p>
        <p class="case__label">The numbers</p>
        <div class="case__nums">${c.numbers.map(([b, s]) => `<div><b>${b}</b><span>${s}</span></div>`).join("")}</div>
        <p class="case__label">What I did</p>
        <ul class="case__did">${c.did.map((x) => `<li>${x}</li>`).join("")}</ul>
        <div class="case__ph">case visuals coming soon</div>
      </div>`;
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
    modal.scrollTop = 0;
  }

  function initModal() {
    $(".case__close").addEventListener("click", () => modal.close());
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
  }

  function initChest() {
    const wrap = $("#chestCards"), list = $("#workList"), chestEl = $("#chest");
    const order = ["masai", "3m", "swiggy", "grabhouse"];
    const rots = [-7, -2.5, 2.5, 7];
    order.forEach((id, i) => {
      const c = DATA.cases[id];
      const b = d.createElement("button");
      b.type = "button";
      b.className = "wcard" + (LIGHT.includes(c.color) ? " wcard--light" : "");
      b.style.setProperty("--c", c.color);
      b.style.setProperty("--r", `${rots[i]}deg`);
      b.setAttribute("aria-label", `${c.title}, ${c.org}. Open the case study`);
      b.innerHTML = `<span class="wcard__num">${c.num} · ${c.org}</span><span class="wcard__metric">${c.metric}</span><span class="wcard__label">${c.metricLabel}</span><span class="wcard__title">${c.title}</span>`;
      b.addEventListener("click", () => openCase(id));
      wrap.appendChild(b);
      list.insertAdjacentHTML("beforeend", `<li><button type="button" data-case="${id}" style="--c:${c.color}"><span class="n">${c.num}</span><strong>${c.title}</strong><span>${c.org} · ${c.role}</span></button></li>`);
    });
    list.addEventListener("click", (e) => {
      const b = e.target.closest("[data-case]");
      if (b) openCase(b.dataset.case);
    });
    if (!hasGsap) { chestEl.classList.add("is-ready"); return; }
    const cards = $$(".wcard", wrap);
    gsap.set(cards, { "--rise": "120%", opacity: 0 });
    gsap.timeline({ scrollTrigger: { trigger: chestEl, start: "top 72%" }, onComplete: () => chestEl.classList.add("is-ready") })
      .from(".chest__lid", { scaleY: 0.12, transformOrigin: "50% 100%", duration: 1.1, ease: "back.out(1.3)" })
      .to(cards, { "--rise": "0%", opacity: 1, duration: 1, stagger: 0.12, ease: "back.out(1.5)" }, "-=.55");
  }

  /* ---------- Brands carousel ---------- */
  function initCarousel() {
    const track = $("#brandsTrack");
    const step = () => ($(".site", track)?.offsetWidth || 400) + 28;
    $("#brandsPrev").addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    $("#brandsNext").addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
    let drag = null;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag = { x: e.clientX, left: track.scrollLeft, moved: false };
      track.classList.add("is-grabbing");
    });
    window.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 4) drag.moved = true;
      track.scrollLeft = drag.left - dx;
    });
    window.addEventListener("pointerup", () => {
      if (!drag) return;
      track.classList.remove("is-grabbing");
      drag = null;
    });
    if (hasGsap) {
      gsap.from(".site", { x: 120, opacity: 0, duration: 1.1, stagger: 0.1, ease: "expo.out", clearProps: "transform,opacity", scrollTrigger: { trigger: track, start: "top 80%" } });
    }
  }

  /* ---------- Crew ---------- */
  function initCrew() {
    scrubText($("#crewText"));
    const counters = $$("[data-count]");
    if (!hasGsap) return;
    gsap.from(".hat", { y: -50, opacity: 0, rotation: -12, duration: 0.9, stagger: 0.1, ease: "back.out(2)", clearProps: "transform,opacity", scrollTrigger: { trigger: ".hats", start: "top 78%" } });
    gsap.from("#ropePath", { strokeDashoffset: 1000, strokeDasharray: "1000 1000", duration: 1.4, ease: "power2.out", clearProps: "strokeDashoffset,strokeDasharray", scrollTrigger: { trigger: ".hats", start: "top 80%" } });
    counters.forEach((el) => {
      const end = +el.dataset.count, suf = el.dataset.suffix || "", o = { v: 0 };
      gsap.to(o, { v: end, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" }, onUpdate: () => { el.textContent = Math.round(o.v) + suf; } });
      el.textContent = "0" + suf;
    });
  }

  /* ---------- Toolkit crate ---------- */
  function initCrate() {
    const stage = $("#crateStage"), crate = $("#crate"), toolsEl = $("#tools");
    const T = DATA.tools;
    T.forEach((t, i) => {
      const b = d.createElement("button");
      b.type = "button";
      b.className = "tool";
      b.style.setProperty("--bg", t.bg);
      b.style.setProperty("--fg", t.fg);
      b.style.setProperty("--d", `${i * 45}ms`);
      b.style.setProperty("--tr", `${((i * 53) % 17) - 8}deg`);
      b.setAttribute("aria-label", `${t.name}: ${t.use}`);
      b.tabIndex = -1;
      b.innerHTML = `${t.mono}<span class="tool__tip" aria-hidden="true"><b>${t.name}</b>${t.use}</span>`;
      toolsEl.appendChild(b);
    });
    const layout = () => {
      const w = stage.clientWidth, h = stage.clientHeight;
      const rx = Math.min(w * 0.42, 440), ry = Math.min(h * 0.38, 230);
      $$(".tool", toolsEl).forEach((b, i) => {
        const a = (i / T.length) * Math.PI * 2 - Math.PI / 2 + 0.31;
        b.style.setProperty("--tx", `${Math.cos(a) * rx}px`);
        b.style.setProperty("--ty", `${Math.sin(a) * ry}px`);
      });
    };
    layout();
    window.addEventListener("resize", layout);
    crate.addEventListener("click", () => {
      const open = !crate.classList.contains("is-open");
      crate.classList.toggle("is-open", open);
      toolsEl.classList.toggle("is-out", open);
      stage.classList.toggle("is-open", open);
      crate.setAttribute("aria-expanded", String(open));
      $(".crate__cta", crate).textContent = open ? "Pack it up" : "Tap to crack it open";
      $$(".tool", toolsEl).forEach((b) => { b.tabIndex = open ? 0 : -1; });
    });
  }

  /* ---------- Process tide ---------- */
  function initTide() {
    const line = $("#tideLine");
    const steps = $$(".tide__steps li");
    line.setAttribute("pathLength", "1");
    const xs = steps.map((li) => parseFloat(li.style.getPropertyValue("--x")) / 100);
    if (!hasGsap) { steps.forEach((s) => s.classList.add("is-on")); line.style.setProperty("--draw", 0); return; }
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      line.style.setProperty("--draw", 1);
      const st = ScrollTrigger.create({
        trigger: "#tide", start: "top 75%", end: "bottom 55%", scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          line.style.setProperty("--draw", String(1 - p));
          steps.forEach((s, i) => s.classList.toggle("is-on", p >= xs[i] - 0.06));
        }
      });
      return () => st.kill();
    });
    mm.add("(max-width: 767px)", () => {
      const io = new IntersectionObserver((entries) => entries.forEach((en) => en.isIntersecting && en.target.classList.add("is-on")), { rootMargin: "0px 0px -15% 0px" });
      steps.forEach((s) => io.observe(s));
      return () => io.disconnect();
    });
  }

  /* ---------- Board ---------- */
  function initBoard() {
    const board = $("#board");
    const items = $$(".pinned", board);
    items.forEach((el) => makeDraggable(el, board));
    if (hasGsap) {
      gsap.from(items, { opacity: 0, translate: "0px -60px", duration: 0.9, stagger: 0.08, ease: "back.out(1.8)", clearProps: "translate,opacity", scrollTrigger: { trigger: board, start: "top 70%" } });
    }
  }

  /* ---------- Contact ---------- */
  function initContact() {
    const btn = $("#copyEmail"), toast = $("#toast");
    let t = 0;
    btn.addEventListener("click", async () => {
      const email = btn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        toast.textContent = "Email copied. Talk soon!";
      } catch (e) {
        window.location.href = `mailto:${email}`;
        return;
      }
      toast.classList.add("is-on");
      clearTimeout(t);
      t = setTimeout(() => toast.classList.remove("is-on"), 2200);
    });
    if (hasGsap) {
      gsap.from(".wordmark", { yPercent: 40, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".footer", start: "top 90%" } });
    }
  }

  /* ---------- Dock (active section) ---------- */
  function initDock() {
    const links = $$(".dock__link");
    const pill = $(".dock__pill");
    const setActive = (key) => {
      const a = links.find((l) => l.dataset.nav === key) || links[0];
      links.forEach((l) => l.classList.toggle("is-active", l === a));
      requestAnimationFrame(() => {
        pill.style.width = `${a.offsetWidth}px`;
        pill.style.transform = `translateX(${a.offsetLeft}px)`;
      });
      setTimeout(() => {
        pill.style.width = `${a.offsetWidth}px`;
        pill.style.transform = `translateX(${a.offsetLeft}px)`;
      }, 420);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.dataset.section); });
    }, { rootMargin: "-50% 0px -50% 0px" });
    $$("[data-section]").forEach((s) => io.observe(s));
    setActive("home");
    window.addEventListener("resize", () => setActive((links.find((l) => l.classList.contains("is-active")) || links[0]).dataset.nav));
  }

  /* ---------- Boot ---------- */
  initTheme();
  initClock();
  initWaves();
  initHero();
  initPins();
  initSeaSound();
  initStory();
  initMarquee();
  initVoyage();
  initModal();
  initChest();
  initCarousel();
  initCrew();
  initCrate();
  initTide();
  initBoard();
  initContact();
  initDock();

  if (hasGsap) {
    window.addEventListener("load", () => ScrollTrigger.refresh());
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(() => ScrollTrigger.refresh());
  }
})();
