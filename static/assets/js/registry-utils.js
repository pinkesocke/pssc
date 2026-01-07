const a = "initialized";
class g {
    registry = {};
    register(t, e) {
        if (this.registry[t] && console.warn(`Overriding registered component "${t}"`),
        t[0].toUpperCase() !== t[0])
            throw new Error(`${t} is not a valid name, name must be CamelCase`);
        this.registry[t] = e
    }
    init(t=document) {
        let e = [...t.querySelectorAll("[data-ev-autoinit]")];
        e = e.filter(i => i.dataset.evInitialized !== a);
        for (const i of e)
            if (i.dataset.evProviders) {
                const o = i.dataset.evProviders.trim().split(/\s+/);
                for (const s of o)
                    this.initComponent(i, s)
            } else {
                const o = i.dataset.evComponent ?? i.dataset.evProvider;
                if (o) {
                    const s = o.trim().split(/\s+/);
                    for (const d of s)
                        this.initComponent(i, d)
                }
            }
    }
    initComponent(t, e) {
        if (!e || !this.registry[e]) {
            console.error(`Node ${t} requires a component that is not registered (${e}). Skipping`);
            return
        }
        try {
            const o = this.registry[e].attachTo(t);
            return t.dataset.evInitialized = a,
            Object.defineProperty(t, e, {
                configurable: !0,
                enumerable: !1,
                value: o,
                writable: !1
            }),
            o
        } catch (i) {
            console.error(`Failed to initialize component "${e}":`, i),
            t.dataset.evInitialized = a
        }
    }
    getInitializedComponents(t=document) {
        const e = t.querySelectorAll(`[data-ev-initialized='${a}']`)
          , i = [];
        for (const o of e) {
            const s = this.getComponentNames(o);
            s.length > 0 && i.push({
                element: o,
                names: s
            })
        }
        return i
    }
    destroyComponent(t, e) {
        const i = t[e];
        if (i && typeof i == "object" && "destroy"in i) {
            const o = i.destroy;
            if (typeof o == "function")
                try {
                    o.call(i)
                } catch (s) {
                    console.error(`Error destroying component "${e}":`, s)
                }
        }
    }
    getComponentNames(t) {
        const e = [];
        return t.dataset.evComponent ? e.push(t.dataset.evComponent) : t.dataset.evProvider ? e.push(t.dataset.evProvider) : t.dataset.evProviders && e.push(...t.dataset.evProviders.trim().split(/\s+/)),
        e
    }
}
const n = new g
  , l = n.register.bind(n)
  , p = n.init.bind(n)
  , f = n.getInitializedComponents.bind(n)
  , u = n.destroyComponent.bind(n);
class c {
    root;
    pollingIntervalSeconds;
    pollingUrl;
    timeout;
    static attachTo(t) {
        if (t instanceof HTMLImageElement) {
            const e = new c(t);
            return e.init(),
            e
        } else
            throw new Error("AssetImagePoller requires an <img> tag")
    }
    constructor(t) {
        this.root = t,
        this.pollingIntervalSeconds = parseInt(t.dataset.pollingInterval || "1") || 1,
        this.pollingUrl = t.dataset.pollingUrl
    }
    init() {
        this.checkAfterInterval()
    }
    getPollingInterval() {
        const t = (.5 - Math.random()) * 1e3;
        return this.pollingIntervalSeconds * 1e3 + t
    }
    checkAfterInterval() {
        this.timeout = setTimeout(this.check.bind(this), this.getPollingInterval())
    }
    detach() {
        const t = this.root;
        this.root.classList.remove("animate-pulse"),
        delete t.AssetImagePoller,
        this.timeout && clearTimeout(this.timeout)
    }
    async check() {
        if (this.pollingUrl) {
            const t = await fetch(this.pollingUrl);
            if (t.status === 200) {
                const e = await t.text();
                e ? this.root.src = e : console.error("Server should be ready, but no Location header was specified. Aborting")
            } else {
                if (t.status == 202)
                    return this.checkAfterInterval();
                console.error("Unexpected response, aborting")
            }
        } else
            console.warn("No polling URL specified, no polling will be done");
        this.detach()
    }
}
function v(r) {
    return Object.entries(r).forEach( ([e,i]) => {
        l(e, i)
    }
    ),
    {
        providers: r,
        getProvider: (e, i) => h(e, i)
    }
}
function m(r) {
    return Object.entries(r).forEach( ([t,e]) => {
        l(t, e)
    }
    ),
    {
        components: r
    }
}
function h(r, t) {
    const e = r.closest(`[data-ev-provider="${String(t)}"], [data-ev-providers~=${String(t)}]`);
    if (!e)
        throw new Error(`No provider found for "${String(t)}"`);
    return e[String(t)]
}
export {c as A, m as a, v as c, u as d, f as g, p as i};