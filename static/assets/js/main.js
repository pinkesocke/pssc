// Cleaned build: only UI components (no accounts/cookies/tracking)


import { a as Ve, i as He } from "./registry-utils.js";


class Nt {
    root;
    track;
    leftBtn;
    rightBtn;
    scrollDistance = 0;
    resizeObserver = null;
    scrollTimeout = null;
    static attachTo(t) {
        const e = new Nt(t);
        return e.init(),
            e
    }
    constructor(t) {
        this.root = t;
        const e = this.root.querySelector("[data-carousel-track]");
        if (this.leftBtn = this.root.querySelector('[data-scroll="left"]'),
            this.rightBtn = this.root.querySelector('[data-scroll="right"]'),
            !e)
            throw new Error("[NestedCarousel] Missing [data-carousel-track]");
        this.track = e
    }
    init() {
        this.calculateScrollDistance(),
            this.bind(),
            this.updateButtons(),
            this.observeResize()
    }
    destroy() {
        this.resizeObserver?.disconnect(),
            this.scrollTimeout && window.clearTimeout(this.scrollTimeout)
    }
    bind() {
        this.leftBtn?.addEventListener("click", () => this.scroll(-1)),
            this.rightBtn?.addEventListener("click", () => this.scroll(1)),
            this.track.addEventListener("scroll", () => {
                this.scrollTimeout && window.clearTimeout(this.scrollTimeout),
                    this.scrollTimeout = window.setTimeout(() => this.updateButtons(), 150)
            }
                , {
                    passive: !0
                })
    }
    calculateScrollDistance() {
        const t = this.track.querySelector("[data-carousel-item]");
        if (!t) {
            this.scrollDistance = 0;
            return
        }
        const e = t.offsetWidth
            , s = window.getComputedStyle(this.track)
            , i = parseFloat(s.gap) || 0;
        this.scrollDistance = e + i
    }
    observeResize() {
        this.resizeObserver = new ResizeObserver(() => {
            this.calculateScrollDistance(),
                this.updateButtons()
        }
        ),
            this.resizeObserver.observe(this.track)
    }
    scroll(t) {
        this.scrollDistance === 0 && this.calculateScrollDistance(),
            this.track.scrollBy({
                left: t * this.scrollDistance,
                behavior: "smooth"
            })
    }
    updateButtons() {
        const t = this.track.scrollLeft
            , e = this.track.scrollWidth - this.track.clientWidth - 1
            , s = e <= 0;
        Nt.disableButton(this.leftBtn, s || t <= 0),
            Nt.disableButton(this.rightBtn, s || t >= e)
    }
    static disableButton(t, e) {
        t && (t.disabled = !!e,
            t.ariaDisabled = t.disabled ? "true" : "false",
            t.classList.toggle("opacity-(--opacity-medium)", t.disabled),
            t.style.pointerEvents = t.disabled ? "none" : "auto")
    }
}

class he {
    root;
    carousel;
    indicators;
    prevBtn;
    nextBtn;
    currentSlide = 0;
    totalSlides = 0;
    autoSlideInterval = null;
    autoSlideDelay = 8e3;
    scrollTimeout = null;
    progressStartTime = 0;
    progressAnimationFrame = null;
    itemsData = [];
    prefersReducedMotion = !1;
    static attachTo(t) {
        const e = new he(t);
        return e.init(),
            e
    }
    constructor(t) {
        if (this.root = t,
            this.carousel = this.root.querySelector(".carousel-slider-track"),
            this.indicators = Array.from(this.root.querySelectorAll(".carousel-indicator")),
            this.prevBtn = this.root.querySelector("[data-prev]"),
            this.nextBtn = this.root.querySelector("[data-next]"),
            !this.carousel)
            throw new Error("[CarouselSlider] Missing carousel element");
        if (this.totalSlides = this.carousel.children.length,
            this.totalSlides === 0)
            throw new Error("[CarouselSlider] No carousel items found");
        this.checkReducedMotionPreference(),
            this.loadItemsData()
    }
    init() {
        this.bindEvents(),
            this.updateIndicators(),
            this.updateContent(),
            this.startAutoSlide(),
            this.startProgressAnimation()
    }
    bindEvents() {
        this.prevBtn?.addEventListener("click", () => {
            this.pauseAutoSlide(),
                this.resetProgress(),
                this.previousSlide(),
                this.prefersReducedMotion || (this.startAutoSlide(),
                    this.startProgressAnimation())
        }
        ),
            this.nextBtn?.addEventListener("click", () => {
                this.pauseAutoSlide(),
                    this.resetProgress(),
                    this.nextSlide(),
                    this.prefersReducedMotion || (this.startAutoSlide(),
                        this.startProgressAnimation())
            }
            ),
            this.indicators.forEach((t, e) => {
                t.addEventListener("click", () => {
                    this.pauseAutoSlide(),
                        this.resetProgress();
                    const s = this.findNextSlideInSection(e);
                    this.goToSlide(s),
                        this.prefersReducedMotion || (this.startAutoSlide(),
                            this.startProgressAnimation())
                }
                )
            }
            ),
            this.carousel.addEventListener("scroll", () => {
                this.scrollTimeout && clearTimeout(this.scrollTimeout),
                    this.scrollTimeout = setTimeout(() => {
                        this.updateCurrentSlideFromScroll()
                    }
                        , 100)
            }
            )
    }
    updateCurrentSlideFromScroll() {
        const t = this.carousel.scrollLeft
            , e = window.innerWidth
            , s = Math.round(t / e)
            , i = e * .1;
        Math.abs(t - s * e) < i && s !== this.currentSlide && s < this.totalSlides && (this.currentSlide = s,
            this.updateIndicators(),
            this.updateContent())
    }
    goToSlide(t) {
        if (t < 0 || t >= this.totalSlides)
            return;
        this.currentSlide = t;
        const e = this.carousel
            , s = window.innerWidth
            , i = t * s;
        e.scrollTo({
            left: i,
            behavior: "smooth"
        }),
            this.updateIndicators(),
            this.updateContent()
    }
    nextSlide() {
        const t = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(t)
    }
    previousSlide() {
        const t = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.goToSlide(t)
    }
    findNextSlideInSection(t) {
        return t
    }
    updateIndicators() {
        const t = this.currentSlide
            , e = 5;
        if (this.totalSlides <= e) {
            this.indicators.forEach((n, o) => {
                const a = n.querySelector(".indicator-pill")
                    , l = n.querySelector(".indicator-dot")
                    , h = n.querySelector(".indicator-pill-progress");
                !a || !l || (n.classList.remove("hidden"),
                    l.classList.remove("indicator-dot-small"),
                    o === t ? (a.classList.remove("hidden"),
                        l.classList.add("hidden"),
                        n.setAttribute("aria-current", "true"),
                        h && (h.style.transform = "translateX(-100%)",
                            h.setAttribute("aria-valuenow", "0"))) : (l.classList.remove("hidden"),
                                a.classList.add("hidden"),
                                n.setAttribute("aria-current", "false")))
            }
            );
            return
        }
        let s = 0
            , i = e - 1;
        this.currentSlide <= 2 ? (s = 0,
            i = e - 1) : this.currentSlide >= this.totalSlides - 3 ? (s = this.totalSlides - e,
                i = this.totalSlides - 1) : (s = this.currentSlide - 2,
                    i = this.currentSlide + 2),
            this.indicators.forEach((n, o) => {
                const a = n.querySelector(".indicator-pill")
                    , l = n.querySelector(".indicator-dot")
                    , h = n.querySelector(".indicator-pill-progress");
                if (!a || !l)
                    return;
                if (o < s || o > i) {
                    n.classList.add("hidden");
                    return
                }
                n.classList.remove("hidden");
                const d = o === s
                    , g = o === i
                    , m = this.currentSlide <= 2
                    , p = this.currentSlide >= this.totalSlides - 3;
                let v = !1;
                !m && d && (v = !0),
                    !p && g && (v = !0),
                    v && o !== t ? l.classList.add("indicator-dot-small") : l.classList.remove("indicator-dot-small"),
                    o === t ? (a.classList.remove("hidden"),
                        l.classList.add("hidden"),
                        n.setAttribute("aria-current", "true"),
                        h && (h.style.transform = "translateX(-100%)",
                            h.setAttribute("aria-valuenow", "0"))) : (l.classList.remove("hidden"),
                                a.classList.add("hidden"),
                                n.setAttribute("aria-current", "false"))
            }
            )
    }
    checkReducedMotionPreference() {
        if (window.matchMedia) {
            const t = window.matchMedia("(prefers-reduced-motion: reduce)");
            this.prefersReducedMotion = t.matches,
                t.addEventListener("change", e => {
                    this.prefersReducedMotion = e.matches,
                        this.prefersReducedMotion ? this.pauseAutoSlide() : this.startAutoSlide()
                }
                )
        }
    }
    loadItemsData() {
        this.itemsData = [];
        const t = this.carousel.children;
        for (let e = 0; e < t.length; e++) {
            const s = t[e];
            this.itemsData.push({
                song_title: s.dataset.songTitle || "",
                name: s.dataset.name || "",
                year: s.dataset.year || "",
                country: s.dataset.country || "",
                host_flag_url: s.dataset.hostFlagUrl || "",
                venue_city: s.dataset.venueCity || "",
                winner_flag_url: s.dataset.winnerFlagUrl || ""
            })
        }
    }
    updateContent() {
        if (this.itemsData.length === 0)
            return;
        const t = this.itemsData[this.currentSlide];
        if (!t)
            return;
        const e = this.root.querySelector(".carousel-song-title")
            , s = this.root.querySelector(".carousel-artist-name")
            , i = this.root.querySelector(".carousel-year")
            , n = this.root.querySelector(".carousel-host-flag")
            , o = this.root.querySelector(".carousel-venue-city")
            , a = this.root.querySelector(".carousel-winner-flag")
            , l = this.root.querySelector(".carousel-ukraine-flag");
        e && (e.textContent = t.song_title),
            s && (s.textContent = t.name),
            i && (i.textContent = t.year),
            o && (o.textContent = t.venue_city),
            n && t.host_flag_url && (n.src = t.host_flag_url,
                n.alt = `${t.venue_city} flag in a eurovision heart`),
            a && t.winner_flag_url && (a.src = t.winner_flag_url,
                a.alt = `${t.country} flag in a eurovision heart`),
            l && (t.year === "2023" ? l.classList.remove("hidden") : l.classList.add("hidden"))
    }
    startAutoSlide() {
        this.prefersReducedMotion || (this.pauseAutoSlide(),
            this.autoSlideInterval = setInterval(() => {
                this.nextSlide(),
                    this.resetProgress(),
                    this.startProgressAnimation()
            }
                , this.autoSlideDelay))
    }
    pauseAutoSlide() {
        this.autoSlideInterval && (clearInterval(this.autoSlideInterval),
            this.autoSlideInterval = null)
    }
    startProgressAnimation() {
        this.prefersReducedMotion || (this.progressStartTime = performance.now(),
            this.animateProgress())
    }
    animateProgress() {
        const e = performance.now() - this.progressStartTime
            , s = Math.min(e / this.autoSlideDelay * 100, 100)
            , i = this.indicators[this.currentSlide];
        if (i) {
            const n = i.querySelector(".indicator-pill-progress");
            if (n) {
                const o = (-100 + s).toFixed(2);
                n.style.transform = `translateX(${o}%)`,
                    n.setAttribute("aria-valuenow", Math.round(s).toString())
            }
        }
        s < 100 && (this.progressAnimationFrame = requestAnimationFrame(() => this.animateProgress()))
    }
    resetProgress() {
        this.progressAnimationFrame && (cancelAnimationFrame(this.progressAnimationFrame),
            this.progressAnimationFrame = null),
            this.indicators.forEach(t => {
                const e = t.querySelector(".indicator-pill-progress");
                e && (e.style.transform = "translateX(-100%)",
                    e.setAttribute("aria-valuenow", "0"))
            }
            )
    }
    cleanup() {
        this.pauseAutoSlide(),
            this.resetProgress(),
            this.scrollTimeout && clearTimeout(this.scrollTimeout)
    }
}

const Qt = 60
    , te = Qt * 60
    , Ie = 24 * te;
class ct {
    root;
    targetTimestamp;
    daysEl;
    hoursEl;
    minutesEl;
    secondsEl;
    timer;
    static MAX_SUPPORTED_DELTA = 693 * 24 * 3600;
    constructor(t) {
        this.root = t;
        const e = this.root.dataset.countdownTarget;
        e && (this.targetTimestamp = Math.floor(new Date(e).getTime() / 1e3));
        const s = Array.from(this.root.querySelectorAll(".time-unit > [aria-live]"));
        this.daysEl = s[0],
            this.hoursEl = s[1],
            this.minutesEl = s[2],
            this.secondsEl = s[3]
    }
    init() {
        if (typeof this.targetTimestamp != "number") {
            console.warn("No countdown target provided!");
            return
        }
        if (this.delta > ct.MAX_SUPPORTED_DELTA) {
            console.warn("Target date is more than 99 weeks away, not showing countdown");
            return
        }
        this.onTick(),
            this.root.classList.remove("invisible"),
            this.start()
    }
    stop() {
        clearInterval(this.timer)
    }
    start() {
        this.timer = setInterval(this.onTick.bind(this), 1e3)
    }
    cleanup() {
        this.stop()
    }
    get delta() {
        const t = Math.floor(Date.now() / 1e3);
        return Math.max((this.targetTimestamp ?? 0) - t, 0)
    }
    onTick() {
        let t = this.delta;
        const e = t
            , s = Math.floor(t / Ie);
        t %= Ie;
        const i = Math.floor(t / te);
        t %= te;
        const n = Math.floor(t / Qt);
        t %= Qt,
            this.setValue({
                days: s,
                hours: i,
                minutes: n,
                seconds: t
            }),
            e === 0 && (this.root.classList.add("hidden"),
                this.stop())
    }
    setValue({ days: t, hours: e, minutes: s, seconds: i }) {
        this.setElValue(this.daysEl, ct.pad(t)),
            this.setElValue(this.hoursEl, ct.pad(e)),
            this.setElValue(this.minutesEl, ct.pad(s)),
            this.setElValue(this.secondsEl, ct.pad(i))
    }
    setElValue(t, e) {
        t && (t.textContent = e,
            t.ariaLabel = e)
    }
    static pad(t) {
        let e = "0";
        return t >= 10 && (e = ""),
            `${e}${t}`
    }
    static attachTo(t) {
        const e = new ct(t);
        return e.init(),
            e
    }
}

class fe {
    root;
    select;
    constructor(t) {
        this.root = t;
        const e = t.querySelector("select[name='decade']");
        if (!e)
            throw new Error("HistoryDecadeForm requires a select[name='decade'] element. None found.");
        this.select = e
    }
    init() {
        this.select.addEventListener("change", this.handleChange.bind(this))
    }
    handleChange() {
        this.root.submit()
    }
    static attachTo(t) {
        if (!(t instanceof HTMLFormElement))
            throw new Error("HistoryDecadeForm must be attached to a form element");
        const e = new fe(t);
        return e.init(),
            e
    }
}

class ge {
    tabButtons;
    tabContents;
    constructor(t) {
        this.tabButtons = t.querySelectorAll("[data-tab-button]"),
            this.tabContents = t.querySelectorAll("[data-tab-content]")
    }
    init() {
        this.tabButtons.forEach(t => {
            t.addEventListener("click", this.handleTabClick.bind(this))
        }
        )
    }
    cleanup() {
        this.tabButtons.forEach(t => {
            t.removeEventListener("click", this.handleTabClick.bind(this))
        }
        )
    }
    handleTabClick(t) {
        const e = t.currentTarget
            , s = e.dataset.language;
        s && (this.tabButtons.forEach(i => {
            i.classList.remove("font-bold"),
                i.classList.add("text-white/70"),
                i.setAttribute("aria-selected", "false")
        }
        ),
            e.classList.add("font-bold"),
            e.classList.remove("text-white/70"),
            e.setAttribute("aria-selected", "true"),
            this.tabContents.forEach(i => {
                i.dataset.language === s ? i.classList.remove("hidden") : i.classList.add("hidden")
            }
            ))
    }
    static attachTo(t) {
        const e = new ge(t);
        return e.init(),
            e
    }
}

class me {
    root;
    mobileMenuOverlay = null;
    openButton = null;
    closeButton = null;
    openDropdowns = new Set;
    cleanupFunctions = [];
    static attachTo(t) {
        const e = new me(t);
        return e.init(),
            e
    }
    constructor(t) {
        this.root = t,
            this.mobileMenuOverlay = this.root.querySelector("#mobile-menu-overlay"),
            this.openButton = this.root.querySelector("[data-open-mobile-menu]"),
            this.closeButton = this.root.querySelector("[data-close-mobile-menu]")
    }
    init() {
        this.bindEvents()
    }
    bindEvents() {
        this.setupMobileMenu(),
            this.setupDropdowns(),
            this.setupClickOutsideHandler(),
            this.setupEscapeKeyHandler(),
            this.setupMobileFocusTrap(),
            this.setupDesktopFocusTrap()
    }
    setupMobileMenu() {
        if (!this.mobileMenuOverlay)
            return;
        const t = () => {
            this.mobileMenuOverlay && (this.mobileMenuOverlay.removeAttribute("inert"),
                this.mobileMenuOverlay.setAttribute("aria-hidden", "false"),
                this.mobileMenuOverlay.classList.remove("-translate-x-full"),
                this.mobileMenuOverlay.classList.add("translate-x-0"),
                document.body.style.overflow = "hidden",
                setTimeout(() => {
                    this.closeButton?.focus()
                }
                    , 350))
        }
            , e = () => {
                this.mobileMenuOverlay && (this.mobileMenuOverlay.classList.add("-translate-x-full"),
                    this.mobileMenuOverlay.classList.remove("translate-x-0"),
                    this.mobileMenuOverlay.setAttribute("aria-hidden", "true"),
                    this.mobileMenuOverlay.setAttribute("inert", ""),
                    document.body.style.overflow = "",
                    this.openButton?.focus())
            }
            ;
        this.openButton?.addEventListener("click", t),
            this.closeButton?.addEventListener("click", e),
            this.cleanupFunctions.push(() => {
                this.openButton?.removeEventListener("click", t),
                    this.closeButton?.removeEventListener("click", e)
            }
            )
    }
    setupDropdowns() {
        this.root.querySelectorAll("[data-toggle-dropdown]").forEach(e => {
            const s = e.getAttribute("data-toggle-dropdown");
            if (!s)
                return;
            const i = document.getElementById(s);
            if (!i)
                return;
            const n = () => {
                this.openDropdowns.has(s) ? this.closeDropdown(e, i, s) : this.openDropdown(e, i, s)
            }
                ;
            e.addEventListener("click", n),
                this.cleanupFunctions.push(() => {
                    e.removeEventListener("click", n)
                }
                )
        }
        )
    }
    openDropdown(t, e, s) {
        e.classList.add("dropdown-open");
        const i = t.querySelector(".chev-down")
            , n = t.querySelector(".chev-up");
        i?.classList.add("hidden"),
            n?.classList.remove("hidden"),
            t.setAttribute("aria-expanded", "true"),
            e.setAttribute("aria-hidden", "false"),
            this.openDropdowns.add(s)
    }
    closeDropdown(t, e, s) {
        e.classList.remove("dropdown-open");
        const i = t.querySelector(".chev-down")
            , n = t.querySelector(".chev-up");
        i?.classList.remove("hidden"),
            n?.classList.add("hidden"),
            t.setAttribute("aria-expanded", "false"),
            e.setAttribute("aria-hidden", "true"),
            this.openDropdowns.delete(s)
    }
    setupClickOutsideHandler() {
        const t = e => {
            const s = this.root.querySelector('[data-toggle-dropdown="desktop-whats-on-panel"]')
                , i = document.getElementById("desktop-whats-on-panel");
            s && i && this.openDropdowns.has("desktop-whats-on-panel") && (s.contains(e.target) || i.contains(e.target) || this.closeDropdown(s, i, "desktop-whats-on-panel"))
        }
            ;
        document.addEventListener("mousedown", t),
            this.cleanupFunctions.push(() => document.removeEventListener("mousedown", t))
    }
    setupEscapeKeyHandler() {
        const t = e => {
            if (e.key === "Escape") {
                if (this.mobileMenuOverlay && this.mobileMenuOverlay.getAttribute("aria-hidden") === "false") {
                    this.closeButton?.click();
                    return
                }
                this.openDropdowns.forEach(s => {
                    const i = document.getElementById(s)
                        , n = this.root.querySelector(`[data-toggle-dropdown="${s}"]`);
                    i && n && (this.closeDropdown(n, i, s),
                        n.focus())
                }
                )
            }
        }
            ;
        document.addEventListener("keydown", t),
            this.cleanupFunctions.push(() => document.removeEventListener("keydown", t))
    }
    setupMobileFocusTrap() {
        const t = e => {
            if (e.key !== "Tab" || !this.mobileMenuOverlay || this.mobileMenuOverlay.getAttribute("aria-hidden") !== "false")
                return;
            e.preventDefault();
            const s = this.mobileMenuOverlay.querySelectorAll("[data-nav-item]")
                , i = Array.from(s).filter(d => {
                    let g = d;
                    for (; g && g !== this.mobileMenuOverlay;) {
                        if (g.getAttribute("aria-hidden") === "true")
                            return !1;
                        g = g.parentElement
                    }
                    return !0
                }
                );
            if (i.length === 0)
                return;
            const n = i[0]
                , o = document.activeElement;
            if (!this.mobileMenuOverlay.contains(o)) {
                n.focus();
                return
            }
            const l = i.indexOf(o);
            if (l === -1) {
                n.focus();
                return
            }
            let h;
            e.shiftKey ? h = l === 0 ? i.length - 1 : l - 1 : h = l === i.length - 1 ? 0 : l + 1,
                i[h].focus()
        }
            ;
        document.addEventListener("keydown", t),
            this.cleanupFunctions.push(() => {
                document.removeEventListener("keydown", t)
            }
            )
    }
    setupDesktopFocusTrap() {
        const t = e => {
            if (e.key !== "Tab")
                return;
            const s = document.getElementById("desktop-whats-on-panel");
            if (!s || !this.openDropdowns.has("desktop-whats-on-panel"))
                return;
            const i = this.root.querySelector('[data-toggle-dropdown="desktop-whats-on-panel"]');
            if (!i)
                return;
            const n = Array.from(s.querySelectorAll("a[href], button:not([disabled])")).filter(d => {
                const g = window.getComputedStyle(d);
                return g.display !== "none" && g.visibility !== "hidden"
            }
            )
                , o = [i, ...n];
            if (o.length === 0)
                return;
            const a = document.activeElement
                , l = o.indexOf(a);
            if (l === -1)
                return;
            e.preventDefault();
            let h;
            e.shiftKey ? h = l === 0 ? o.length - 1 : l - 1 : h = l === o.length - 1 ? 0 : l + 1,
                o[h].focus()
        }
            ;
        document.addEventListener("keydown", t),
            this.cleanupFunctions.push(() => document.removeEventListener("keydown", t))
    }
    cleanup() {
        this.cleanupFunctions.forEach(t => t()),
            this.cleanupFunctions = []
    }
}

class pe {
    root;
    nextUrl;
    refreshInterval;
    refreshIntervalMilliseconds = 3e4;
    countdownInterval;
    countdownDisplayEl;
    countdownSecondsEl;
    countdownRefreshingEl;
    waitTimeHoursEl;
    waitTimeMinutesEl;
    waitTimeHoursLabelSingularEl;
    waitTimeHoursLabelPluralEl;
    waitTimeMinutesLabelSingularEl;
    waitTimeMinutesLabelPluralEl;
    countdownSecondsLabelSingularEl;
    countdownSecondsLabelPluralEl;
    constructor(t) {
        this.root = t,
            this.nextUrl = new URLSearchParams(window.location.search).get("next") || "/",
            this.countdownDisplayEl = this.root.querySelector("[data-countdown-display]"),
            this.countdownSecondsEl = this.root.querySelector("[data-countdown-seconds-value]"),
            this.countdownRefreshingEl = this.root.querySelector("[data-countdown-refreshing]"),
            this.waitTimeHoursEl = this.root.querySelector("[data-wait-time-hours-value]"),
            this.waitTimeMinutesEl = this.root.querySelector("[data-wait-time-minutes-value]"),
            this.waitTimeHoursLabelSingularEl = this.root.querySelector("[data-wait-time-hours-label-singular]"),
            this.waitTimeHoursLabelPluralEl = this.root.querySelector("[data-wait-time-hours-label-plural]"),
            this.waitTimeMinutesLabelSingularEl = this.root.querySelector("[data-wait-time-minutes-label-singular]"),
            this.waitTimeMinutesLabelPluralEl = this.root.querySelector("[data-wait-time-minutes-label-plural]"),
            this.countdownSecondsLabelSingularEl = this.root.querySelector("[data-wait-time-seconds-label-singular]"),
            this.countdownSecondsLabelPluralEl = this.root.querySelector("[data-wait-time-seconds-label-plural]")
    }
    init() {
        this.checkQueueStatus(),
            this.start()
    }
    updateElement(t, e) {
        t && (t.textContent = e,
            this.showElement(t))
    }
    showElement(t) {
        t && t.classList.remove("hidden")
    }
    hideElement(t) {
        t && t.classList.add("hidden")
    }
    updateWaitTimeDisplay(t) {
        const e = t?.estimated_wait_in_minutes || 0
            , s = Math.floor(e / 60)
            , i = e % 60;
        s > 0 ? (this.updateElement(this.waitTimeHoursEl, s.toString()),
            s === 1 ? (this.showElement(this.waitTimeHoursLabelSingularEl),
                this.hideElement(this.waitTimeHoursLabelPluralEl)) : (this.showElement(this.waitTimeHoursLabelPluralEl),
                    this.hideElement(this.waitTimeHoursLabelSingularEl))) : (this.hideElement(this.waitTimeHoursEl),
                        this.hideElement(this.waitTimeHoursLabelSingularEl),
                        this.hideElement(this.waitTimeHoursLabelPluralEl)),
            this.updateElement(this.waitTimeMinutesEl, i.toString()),
            i === 1 ? (this.showElement(this.waitTimeMinutesLabelSingularEl),
                this.hideElement(this.waitTimeMinutesLabelPluralEl)) : (this.showElement(this.waitTimeMinutesLabelPluralEl),
                    this.hideElement(this.waitTimeMinutesLabelSingularEl))
    }
    showCountdownRefreshing() {
        this.showElement(this.countdownRefreshingEl),
            this.hideElement(this.countdownDisplayEl)
    }
    showCountdownDisplay(t) {
        t === 1 ? (this.showElement(this.countdownSecondsLabelSingularEl),
            this.hideElement(this.countdownSecondsLabelPluralEl)) : (this.showElement(this.countdownSecondsLabelPluralEl),
                this.hideElement(this.countdownSecondsLabelSingularEl)),
            this.showElement(this.countdownDisplayEl),
            this.hideElement(this.countdownRefreshingEl),
            this.updateElement(this.countdownSecondsEl, t.toString())
    }
    startCountdown() {
        this.stopCountdown();
        let t = this.refreshIntervalMilliseconds / 1e3;
        this.countdownInterval = setInterval(() => {
            t--,
                this.showCountdownDisplay(t),
                t <= 0 && this.stopCountdown()
        }
            , 1e3)
    }
    stopCountdown() {
        this.countdownInterval && (clearInterval(this.countdownInterval),
            this.countdownInterval = void 0)
    }
    async checkQueueStatus() {
        this.showCountdownRefreshing();
        try {
            const e = await (await fetch("/queue/progress/")).json()
                , s = e.time_till_next_refresh * 1e3;
            this.updateWaitTimeDisplay(e),
                s !== this.refreshIntervalMilliseconds && (this.refreshIntervalMilliseconds = s,
                    this.stop(),
                    this.start()),
                this.refreshIntervalMilliseconds && this.startCountdown(),
                e.access_granted === !0 && (this.stop(),
                    window.location.href = this.nextUrl)
        } catch (t) {
            console.error("Error fetching queue status:", t)
        }
    }
    start() {
        this.refreshInterval = setInterval(() => {
            this.checkQueueStatus()
        }
            , this.refreshIntervalMilliseconds)
    }
    stop() {
        this.refreshInterval && (clearInterval(this.refreshInterval),
            this.refreshInterval = void 0),
            this.stopCountdown()
    }
    cleanup() {
        this.stop()
    }
    static attachTo(t) {
        const e = new pe(t);
        return e.init(),
            e
    }
}

class ve {
    root;
    lastY = window.scrollY;
    dir = "up";
    ticking = !1;
    thresholdPx;
    constructor(t, e = .625) {
        this.root = t ?? document.querySelector('[data-ev-component="ScrollDirection"]');
        const s = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        this.thresholdPx = e * s,
            this.init()
    }
    static attachTo(t) {
        return new ve(t)
    }
    init() {
        this.applyAttrs(window.scrollY);
        const t = () => {
            this.ticking || (this.ticking = !0,
                requestAnimationFrame(this.update))
        }
            , e = () => {
                const s = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
                this.thresholdPx = .625 * s,
                    this.applyAttrs(window.scrollY)
            }
            ;
        window.addEventListener("scroll", t, {
            passive: !0
        }),
            window.addEventListener("resize", e, {
                passive: !0
            }),
            this.root.__scrollDirectionCleanup = () => {
                window.removeEventListener("scroll", t),
                    window.removeEventListener("resize", e)
            }
    }
    update = () => {
        const t = window.scrollY
            , e = t - this.lastY;
        Math.abs(e) > .5 && (this.dir = e > 0 ? "down" : "up"),
            this.applyAttrs(t),
            this.lastY = t,
            this.ticking = !1
    }
        ;
    applyAttrs(t) {
        this.root.dataset.dir = this.dir,
            this.root.dataset.scrolled = String(t > 0),
            this.root.dataset.atTop = String(t < this.thresholdPx),
            this.root.dispatchEvent(new CustomEvent("scroll:direction", {
                bubbles: !1,
                detail: {
                    dir: this.dir,
                    y: t
                }
            }))
    }
    destroy() {
        this.root.__scrollDirectionCleanup?.()
    }
}

Ve({
    NestedCarousel: Nt,
    CarouselSlider: he,
    Navigation: me,
    ScrollDirection: ve,
    Countdown: ct,
    HistoryDecadeForm: fe,
    LyricsTabs: ge,
    QueueMonitor: pe
});

document.addEventListener("DOMContentLoaded", () => He());