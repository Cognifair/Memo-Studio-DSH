// node_modules/svelte/src/constants.js
var e = {}, t = Symbol("uninitialized"), n = "http://www.w3.org/1999/xhtml", r = Array.isArray, i = Array.prototype.indexOf, a = Array.prototype.includes, o = Array.from, s = Object.defineProperty, c = Object.getOwnPropertyDescriptor, l = Object.getOwnPropertyDescriptors, u = Object.prototype, d = Array.prototype, f = Object.getPrototypeOf, p = Object.isExtensible, m = () => {};
function ee(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function h() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
// node_modules/svelte/src/internal/client/constants.js
var te = 1 << 24, g = 1024, _ = 2048, v = 4096, ne = 8192, re = 16384, ie = 32768, ae = 1 << 25, oe = 65536, se = 1 << 19, ce = 1 << 20, le = 1 << 21, ue = 1 << 22, de = 1 << 23, y = Symbol("$state"), fe = Symbol("component"), pe = Symbol(""), me = Symbol("attributes"), he = Symbol("class"), ge = Symbol("style"), _e = Symbol("text"), ve = Symbol("form reset"), ye = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), be = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
function xe() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Se(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Ce() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function we() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var b = !1;
function Te(e) {
	b = e;
}
var x;
function Ee(t) {
	if (t === null) throw Se(), e;
	return x = t;
}
function De() {
	return Ee(/* @__PURE__ */ N(x));
}
function Oe(t) {
	if (b) {
		if (/* @__PURE__ */ N(x) !== null) throw Se(), e;
		x = t;
	}
}
function ke(e = 1) {
	if (b) {
		for (var t = e, n = x; t--;) n = /* @__PURE__ */ N(n);
		x = n;
	}
}
function Ae(e = !0) {
	for (var t = 0, n = x;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ N(n);
		e && n.remove(), n = i;
	}
}
function je(t) {
	if (!t || t.nodeType !== 8) throw Se(), e;
	return t.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function Me(e) {
	return e === this.v;
}
function Ne(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Pe(e) {
	return !Ne(e, this.v);
}
// node_modules/svelte/src/internal/client/errors.js
function Fe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Ie(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Le() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Re(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function ze() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Be() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ve() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function He() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ue() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/internal/client/context.js
var S = null;
function We(e) {
	S = e;
}
function Ge(e, t = !1, n) {
	S = {
		p: S,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: H,
		l: null
	};
}
function Ke(e) {
	var t = S, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) sn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, S = t.p, qe(e);
}
function qe(e = {}) {
	return s(e, fe, { value: !0 }), e;
}
function Je() {
	return !0;
}
// node_modules/svelte/src/internal/client/dom/task.js
var Ye = [];
function Xe() {
	var e = Ye;
	Ye = [], ee(e);
}
function C(e) {
	if (Ye.length === 0 && !xt) {
		var t = Ye;
		queueMicrotask(() => {
			t === Ye && Xe();
		});
	}
	Ye.push(e);
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var Ze = ~(_ | v | g);
function w(e, t) {
	e.f = e.f & Ze | t;
}
function Qe(e) {
	e.f & 512 || e.deps === null ? w(e, g) : w(e, v);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function $e(e, t) {
	e.f & 2048 ? t.set(e, _) : e.f & 4096 && t.get(e) !== 2048 && t.set(e, v), w(e, g);
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
function et(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, C(() => {
			document.activeElement === t && e.focus();
		});
	}
}
var tt = !1;
function nt() {
	tt || (tt = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ve]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function rt(e) {
	var t = z, n = H;
	V(null), U(null);
	try {
		return e();
	} finally {
		V(t), U(n);
	}
}
// node_modules/svelte/src/internal/client/reactivity/async.js
function it(e, t, n, r) {
	let i = Je() ? ct : ft;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = H, c = at(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				P(e, s);
			}
			ot();
		}
	}
	var d = st();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ ut(e))).then(u).catch((e) => P(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), ot());
	}) : f();
}
function at() {
	var e = H, t = z, n = S, r = T;
	return function(i = !0) {
		U(e), V(t), We(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function ot(e = !0) {
	U(null), V(null), We(null), e && T?.deactivate();
}
function st() {
	var e = H, t = e.b, n = T, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ct(e) {
	var n = 2 | _;
	return H !== null && (H.f |= se), {
		ctx: S,
		deps: null,
		effects: null,
		equals: Me,
		f: n,
		fn: e,
		reactions: null,
		rv: 0,
		v: t,
		wv: 0,
		parent: H,
		ac: null
	};
}
var lt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function ut(e, n, r) {
	let i = H;
	i === null && Fe();
	var a = void 0, o = Ft(t), s = !z, c = /* @__PURE__ */ new Set();
	return un(() => {
		var t = H, n = h();
		a = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ye && n.reject(e);
			}).finally(ot);
		} catch (e) {
			n.reject(e), ot();
		}
		var r = T;
		if (s) {
			if (t.f & 32768) var l = st();
			if (i.b?.is_rendered()) r.async_deriveds.get(t)?.reject(lt);
			else for (let e of c.values()) e.reject(lt);
			c.add(n), r.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), c.delete(n), t !== lt && (r.activate(), t ? (o.f |= de, Lt(o, t)) : (o.f & 8388608 && (o.f ^= de), Lt(o, e)), r.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), an(() => {
		for (let e of c) e.reject(lt);
	}), new Promise((e) => {
		function t(n) {
			function r() {
				n === a ? e(o) : t(a);
			}
			n.then(r, r);
		}
		t(a);
	});
}
/*#__NO_SIDE_EFFECTS__*/
function dt(e) {
	let t = /* @__PURE__ */ ct(e);
	return Tn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function ft(e) {
	let t = /* @__PURE__ */ ct(e);
	return t.equals = Pe, t;
}
function pt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) L(t[n]);
	}
}
function mt(e) {
	var n, r = H, i = e.parent;
	if (!R && i !== null && e.v !== t && i.f & 24576) return xe(), e.v;
	U(i);
	try {
		pt(e), n = Mn(e);
	} finally {
		U(r);
	}
	return n;
}
function ht(e) {
	var t = mt(e);
	!e.equals(t) && (e.wv = kn(), (!T?.is_fork || e.deps === null) && (T === null ? e.v = t : (T.capture(e, t, !0), yt?.capture(e, t, !0)), e.deps === null)) ? w(e, g) : R || (E === null ? Qe(e) : (rn() || T?.is_fork) && E.set(e, t));
}
function gt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && rt(() => {
		t.ac.abort(ye), t.ac = null;
	}), t.fn !== null && (t.teardown = m), Fn(t, 0), gn(t));
}
function _t(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && In(t);
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var vt = null, T = null, yt = null, E = null, bt = null, xt = !1, St = !1, Ct = null, wt = null, Tt = 0, Et = 1, Dt = class e {
	id = Et++;
	started = !1;
	linked = !0;
	prev = null;
	next = null;
	async_deriveds = /* @__PURE__ */ new Map();
	current = /* @__PURE__ */ new Map();
	previous = /* @__PURE__ */ new Map();
	#e = /* @__PURE__ */ new Set();
	#t = /* @__PURE__ */ new Set();
	#n = 0;
	#r = /* @__PURE__ */ new Map();
	#i = null;
	#a = [];
	#o = [];
	#s = /* @__PURE__ */ new Map();
	#c = /* @__PURE__ */ new Map();
	#l = /* @__PURE__ */ new Set();
	is_fork = !1;
	#u = !1;
	constructor() {
		vt === null ? vt = this : (vt.next = this, this.prev = vt), vt = this;
	}
	#d() {
		if (this.is_fork) return !0;
		for (let e of this.#r.keys()) if (!this.#f(e)) return !0;
		return !1;
	}
	#f(e) {
		for (var t = e; t !== null; t = t.parent) if (this.#c.has(t)) return !0;
		return !1;
	}
	skip_effect(e) {
		this.#c.has(e) || this.#c.set(e, {
			d: [],
			m: []
		}), this.#l.delete(e);
	}
	unskip_effect(e, t = (e) => this.schedule(e)) {
		var n = this.#c.get(e);
		if (n) {
			this.#c.delete(e);
			for (var r of n.d) w(r, _), t(r);
			for (r of n.m) w(r, v), t(r);
		}
		this.#l.add(e);
	}
	#p() {
		var e = [];
		for (let i of this.#a) if (!(i.f & 16384 || !(i.f & 6144))) {
			for (var t = i, n = !1; t.parent !== null;) {
				t = t.parent;
				var r = t.f;
				if (r & 96) {
					if (!(r & 1024)) {
						n = !0;
						break;
					}
					t.f ^= g;
				}
			}
			n || e.push(t);
		}
		return this.#a = [], e;
	}
	#m() {
		this.started = !0;
		for (let [e, t] of this.#s) w(e, t), this.schedule(e);
		this.apply();
		for (var t = Ct = [], n = [], r = wt = []; this.#a.length > 0;) {
			Tt++ > 1e3 && (this.#b(), Ot());
			for (let e of this.#p()) try {
				this.#h(e, t, n);
			} catch (t) {
				throw Mt(e), this.#d() || this.discard(), t;
			}
		}
		if (T = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (Ct = null, wt = null, this.#d()) {
			this.#y(n), this.#y(t);
			for (let [e, t] of this.#c) jt(e, t);
			r.length > 0 && T.#m();
			return;
		}
		let a = this.#g();
		if (a) this.#y(n), this.#y(t), a.#v(this);
		else {
			this.#s.clear();
			for (let e of this.#e) e(this);
			this.#e.clear(), yt = this, kt(n), kt(t), yt = null, this.#i?.resolve();
			var o = T;
			this.#n === 0 && (this.#a.length === 0 || o !== null) && this.#b(), o !== null && (O.clear(), o.#m());
		}
	}
	#h(e, t, n) {
		e.f ^= g;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#c.has(r)) && r.fn !== null) {
				a ? r.f ^= g : i & 4 ? t.push(r) : An(r) && (i & 16 && this.add_dirty_reaction(r, v), In(r));
				var o = r.first;
				if (o !== null) {
					r = o;
					continue;
				}
			}
			for (; r !== null;) {
				var s = r.next;
				if (s !== null) {
					r = s;
					break;
				}
				r = r.parent;
			}
		}
	}
	#g() {
		for (var e = this.prev; e !== null; e = e.prev) if (!e.is_fork && this.#_(e)) return e;
		return null;
	}
	#_(e) {
		for (let [t, [, n]] of this.current) if (!n && e.current.has(t)) return !0;
		return !1;
	}
	#v(e) {
		for (let [t, n] of e.current) !this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)), this.current.set(t, n);
		for (let [t, n] of e.async_deriveds) {
			let e = this.async_deriveds.get(t);
			e && n.promise.then(e.resolve).catch(e.reject);
		}
		e.async_deriveds.clear(), this.transfer_reactions(e.#s);
		let t = (e) => {
			var n = e.reactions;
			if (n !== null && !(e.f & 2 && !(e.f & 6144))) for (let e of n) {
				var r = e.f;
				if (r & 2) t(e);
				else {
					var i = e;
					r & 4194320 && !this.async_deriveds.has(i) && (this.#s.delete(i), w(i, _), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#b(), T = this, this.#m();
	}
	#y(e) {
		for (var t = 0; t < e.length; t += 1) $e(e[t], this.#s);
	}
	capture(e, n, r = !1) {
		e.v !== t && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [n, r]), E?.set(e, n)), this.is_fork || (e.v = n);
	}
	activate() {
		T = this;
	}
	deactivate() {
		T = null, E = null;
	}
	flush() {
		try {
			St = !0, T = this, this.#m();
		} finally {
			Tt = 0, bt = null, Ct = null, wt = null, St = !1, T = null, E = null, O.clear();
		}
	}
	discard() {
		for (let e of this.#t) e(this);
		this.#t.clear();
		for (let e of this.async_deriveds.values()) e.reject(lt);
		this.#b(), this.#i?.resolve();
	}
	register_created_effect(e) {
		this.#o.push(e);
	}
	increment(e, t) {
		if (this.#n += 1, e) {
			let e = this.#r.get(t) ?? 0;
			this.#r.set(t, e + 1);
		}
	}
	decrement(e, t) {
		if (--this.#n, e) {
			let e = this.#r.get(t) ?? 0;
			e === 1 ? this.#r.delete(t) : this.#r.set(t, e - 1);
		}
		this.#u || (this.#u = !0, C(() => {
			this.#u = !1, this.linked && this.flush();
		}));
	}
	transfer_reactions(e) {
		for (let [t, n] of e) this.add_dirty_reaction(t, n);
		e.clear();
	}
	add_dirty_reaction(e, t) {
		(t === 2048 || this.#s.get(e) !== 2048) && this.#s.set(e, t);
	}
	oncommit(e) {
		this.#e.add(e);
	}
	ondiscard(e) {
		this.#t.add(e);
	}
	settled() {
		return (this.#i ??= h()).promise;
	}
	static ensure() {
		if (T === null) {
			let t = T = new e();
			!St && C(() => {
				t.started || t.flush();
			});
		}
		return T;
	}
	apply() {
		E = null;
	}
	schedule(e) {
		bt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#a.push(e);
	}
	#b() {
		if (this.linked) {
			var e = this.prev, t = this.next;
			e === null || (e.next = t), t === null ? vt = e : t.prev = e, this.linked = !1;
		}
	}
};
function Ot() {
	try {
		ze();
	} catch (e) {
		P(e, bt);
	}
}
var D = null;
function kt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && An(r) && (D = /* @__PURE__ */ new Set(), In(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && yn(r), D?.size > 0)) {
				O.clear();
				for (let e of D) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) D.has(n) && (D.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || In(n);
					}
				}
				D.clear();
			}
		}
		D = null;
	}
}
function At(e) {
	T.schedule(e);
}
function jt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), w(e, g);
		for (var n = e.first; n !== null;) jt(n, t), n = n.next;
	}
}
function Mt(e) {
	w(e, g);
	for (var t = e.first; t !== null;) Mt(t), t = t.next;
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Nt = /* @__PURE__ */ new Set(), O = /* @__PURE__ */ new Map(), Pt = !1;
function Ft(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Me,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function k(e, t) {
	let n = Ft(e, t);
	return Tn(n), n;
}
function A(e, t, n = !1) {
	return z !== null && (!B || z.f & 131072) && Je() && z.f & 4325394 && (W === null || !W.has(e)) && He(), Lt(e, n ? M(t) : t, wt);
}
var j = null, It = 0;
function Lt(e, t, n = null) {
	if (!e.equals(t)) {
		R ? O.set(e, t) : O.has(e) || O.set(e, e.v);
		var r = Dt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && mt(t), E === null && Qe(t);
		}
		e.wv = kn(), j = null, It = 0, Bt(e, _, n), j = null, Je() && H !== null && H.f & 1024 && !(H.f & 96) && (q === null ? En([e]) : q.push(e)), !r.is_fork && Nt.size > 0 && !Pt && Rt();
	}
	return t;
}
function Rt() {
	Pt = !1;
	for (let e of Nt) {
		e.f & 1024 && w(e, v);
		let t;
		try {
			t = An(e);
		} catch {
			t = !0;
		}
		t && In(e);
	}
	Nt.clear();
}
function zt(e) {
	A(e, e.v + 1);
}
function Bt(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = Je(), a = r.length;
		if (It += a, It > 1e5 && j === null && (j = /* @__PURE__ */ new Set()), j !== null) {
			if (j.has(e)) return;
			j.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== H) {
				var l = (c & _) === 0;
				if (l && w(s, t), c & 131072) Nt.add(s);
				else if (c & 2) {
					var u = s;
					E?.delete(u), Bt(u, v, n);
				} else if (l) {
					var d = s;
					c & 16 && D !== null && D.add(d), n === null ? At(d) : n.push(d);
				}
			}
		}
	}
}
function M(e) {
	if (typeof e != "object" || !e || y in e || fe in e) return e;
	let n = f(e);
	if (n !== u && n !== d) return e;
	var i = /* @__PURE__ */ new Map(), a = r(e), o = /* @__PURE__ */ k(0), s = null, l = Y, p = (e) => {
		if (Y === l) return e();
		var t = z, n = Y;
		V(null), On(l);
		var r = e();
		return V(t), On(n), r;
	};
	return a && i.set("length", /* @__PURE__ */ k(e.length, s)), new Proxy(e, {
		defineProperty(e, t, n) {
			"value" in n && n.configurable !== !1 && n.enumerable !== !1 && n.writable !== !1 || Be();
			var r = i.get(t);
			return r === void 0 ? p(() => {
				var e = /* @__PURE__ */ k(n.value, s);
				return i.set(t, e), e;
			}) : A(r, n.value, !0), !0;
		},
		deleteProperty(e, n) {
			var r = i.get(n);
			if (r === void 0) {
				if (n in e) {
					let e = p(() => /* @__PURE__ */ k(t, s));
					i.set(n, e), zt(o);
				}
			} else A(r, t), zt(o);
			return !0;
		},
		get(n, r, a) {
			if (r === y) return e;
			var o = i.get(r), l = r in n;
			if (o === void 0 && (!l || c(n, r)?.writable) && (o = p(() => /* @__PURE__ */ k(M(l ? n[r] : t), s)), i.set(r, o)), o !== void 0) {
				var u = X(o);
				return u === t ? void 0 : u;
			}
			return Reflect.get(n, r, a);
		},
		getOwnPropertyDescriptor(e, n) {
			this.has?.(e, n);
			var r = Reflect.getOwnPropertyDescriptor(e, n), a = i.get(n);
			if (a !== void 0) {
				var o = X(a);
				if (o === t) return;
				if (r && "value" in r) r.value = o;
				else return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return r;
		},
		has(e, n) {
			if (n === y) return !0;
			var r = i.get(n), a = r !== void 0 && r.v !== t || Reflect.has(e, n);
			return (r !== void 0 || (H !== null || z !== null) && (!a || c(e, n)?.writable)) && (r === void 0 && (r = p(() => /* @__PURE__ */ k(a ? M(e[n]) : t, s)), i.set(n, r)), X(r) === t) ? !1 : a;
		},
		set(e, n, r, l) {
			var u = i.get(n), d = n in e;
			if (a && n === "length") for (var f = r; f < u.v; f += 1) {
				var m = i.get(f + "");
				m === void 0 ? f in e && (m = p(() => /* @__PURE__ */ k(t, s)), i.set(f + "", m)) : A(m, t);
			}
			if (u === void 0) (!d || c(e, n)?.writable) && (u = p(() => /* @__PURE__ */ k(void 0, s)), A(u, M(r)), i.set(n, u));
			else {
				d = u.v !== t;
				var ee = p(() => M(r));
				A(u, ee);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, n);
			if (h?.set && h.set.call(l, r), !d) {
				if (a && typeof n == "string") {
					var te = i.get("length"), g = Number(n);
					Number.isInteger(g) && g >= te.v && A(te, g + 1);
				}
				zt(o);
			}
			return !0;
		},
		ownKeys(e) {
			X(o);
			var n = Reflect.ownKeys(e).filter((e) => {
				var n = i.get(e);
				return n === void 0 || n.v !== t;
			});
			for (var [r, a] of i) a.v !== t && !(r in e) && n.push(r);
			return n;
		},
		setPrototypeOf() {
			Ve();
		}
	});
}
function Vt(e) {
	try {
		if (typeof e == "object" && e && y in e) return e[y];
	} catch {}
	return e;
}
function Ht(e, t) {
	return Object.is(Vt(e), Vt(t));
}
var Ut, Wt, Gt, Kt;
function qt() {
	if (Ut === void 0) {
		Ut = window, Wt = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Gt = c(t, "firstChild").get, Kt = c(t, "nextSibling").get, p(e) && (e[he] = void 0, e[me] = null, e[ge] = void 0, e.__e = void 0), p(n) && (n[_e] = void 0);
	}
}
function Jt(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Yt(e) {
	return Gt.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function N(e) {
	return Kt.call(e);
}
function Xt(e, t) {
	if (!b) return /* @__PURE__ */ Yt(e);
	var n = /* @__PURE__ */ Yt(x);
	if (n === null) n = x.appendChild(Jt());
	else if (t && n.nodeType !== 3) {
		var r = Jt();
		return n?.before(r), Ee(r), r;
	}
	return t && $t(n), Ee(n), n;
}
function Zt(e, t = !1) {
	if (!b) return /* @__PURE__ */ Yt(e);
	var n = Xt(e, t);
	return Oe(e), n;
}
function Qt(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function $t(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function en(e) {
	var t = H;
	if (t === null) return z.f |= de, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	P(e, t);
}
function P(t, n) {
	if (t === e) throw t;
	if (!(n !== null && n.f & 16384)) {
		for (; n !== null;) {
			if (n.f & 128 && !(n.f & 33570816)) {
				if (!(n.f & 32768)) throw t;
				try {
					n.b.error(t);
					return;
				} catch (e) {
					t = e;
				}
			}
			n = n.parent;
		}
		throw t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/effects.js
function tn(e) {
	H === null && (z === null && Re(e), Le()), R && Ie(e);
}
function nn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function F(e, t) {
	var n = H;
	n !== null && n.f & 8192 && (e |= ne);
	var r = {
		ctx: S,
		deps: null,
		nodes: null,
		f: e | _ | 512,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	T?.register_created_effect(r);
	var i = r;
	if (e & 4) Ct === null ? Dt.ensure().schedule(r) : Ct.push(r);
	else if (t !== null) {
		try {
			In(r);
		} catch (e) {
			throw L(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= oe));
	}
	if (i !== null && (i.parent = n, n !== null && nn(i, n), z !== null && z.f & 2 && !(e & 64))) {
		var a = z;
		(a.effects ??= []).push(i);
	}
	return r;
}
function rn() {
	return z !== null && !B;
}
function an(e) {
	let t = F(8, null);
	return w(t, g), t.teardown = e, t;
}
function on(e) {
	tn("$effect");
	var t = H.f;
	if (!z && t & 32 && S !== null && !S.i) {
		var n = S;
		(n.e ??= []).push(e);
	} else return sn(e);
}
function sn(e) {
	return F(4 | ce, e);
}
function cn(e) {
	Dt.ensure();
	let t = F(64 | se, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? bn(t, () => {
			L(t), n(void 0);
		}) : (L(t), n(void 0));
	});
}
function ln(e) {
	return F(4, e);
}
function un(e) {
	return F(ue | se, e);
}
function dn(e, t = 0) {
	return F(8 | t, e);
}
function fn(e, t = [], n = [], r = []) {
	it(r, t, n, (t) => {
		F(8, () => {
			e(...t.map(X));
		});
	});
}
function pn(e, t = 0) {
	return F(16 | t, e);
}
function mn(e, t = 0) {
	return F(te | t, e);
}
function I(e) {
	return F(32 | se, e);
}
function hn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = R, r = z;
		wn(!0), V(null);
		try {
			t.call(null);
		} catch (t) {
			P(t, e.parent);
		} finally {
			wn(n), V(r);
		}
	}
}
function gn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && rt(() => {
			e.abort(ye);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : L(n, t), n = r;
	}
}
function _n(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || L(t), t = n;
	}
}
function L(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (vn(e.nodes.start, e.nodes.end), n = !0), e.f |= ae, gn(e, t && !n), Fn(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	hn(e), e.f ^= ae, e.f |= re;
	var i = e.parent;
	i !== null && i.first !== null && yn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function vn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ N(e);
		e.remove(), e = n;
	}
}
function yn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function bn(e, t, n = !0) {
	var r = [];
	e.f |= 256, xn(e, r, !0);
	var i = () => {
		n && L(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function xn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= ne;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				xn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Sn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ N(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Cn = null, R = !1;
function wn(e) {
	R = e;
}
var z = null, B = !1;
function V(e) {
	z = e;
}
var H = null;
function U(e) {
	H = e;
}
var W = null;
function Tn(e) {
	z !== null && (z.f & 2097152 || z.f & 2) && (W ??= /* @__PURE__ */ new Set()).add(e);
}
var G = null, K = 0, q = null;
function En(e) {
	q = e;
}
var Dn = 1, J = 0, Y = J;
function On(e) {
	Y = e;
}
function kn() {
	return ++Dn;
}
function An(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (An(a) && ht(a), a.wv > e.wv) return !0;
		}
		t & 512 && E === null && w(e, g);
	}
	return !1;
}
function jn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(W !== null && W.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? jn(a, t, !1) : t === a && (n ? w(a, _) : a.f & 1024 && w(a, v), At(a));
	}
}
function Mn(e) {
	var t = G, n = K, r = q, i = z, a = W, o = S, s = B, c = Y, l = e.f;
	G = null, K = 0, q = null, z = l & 96 ? null : e, W = null, We(e.ctx), B = !1, Y = ++J, e.ac !== null && (rt(() => {
		e.ac.abort(ye);
	}), e.ac = null);
	try {
		e.f |= le;
		var u = e.fn, d = u();
		e.f |= ie;
		var f = Nn(e);
		if (Je() && q !== null && !B && f !== null && !(e.f & 6146)) for (var p = 0; p < q.length; p++) jn(q[p], e);
		if (i !== null && i !== e) {
			if (J++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = J;
			if (t !== null) for (let e of t) e.rv = J;
			q !== null && (r === null ? r = q : r.push(...q));
		}
		return e.f & 8388608 && (e.f ^= de), d;
	} catch (t) {
		return Nn(e), en(t);
	} finally {
		e.f ^= le, G = t, K = n, q = r, z = i, W = a, We(o), B = s, Y = c;
	}
}
function Nn(e) {
	var t = e.deps, n = T?.is_fork;
	if (G !== null) {
		var r;
		if (n || Fn(e, K), t !== null && K > 0) for (t.length = K + G.length, r = 0; r < G.length; r++) t[K + r] = G[r];
		else e.deps = t = G;
		if (rn() && e.f & 512) for (r = K; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && K < t.length && (Fn(e, K), t.length = K);
	return t;
}
function Pn(e, n) {
	let r = n.reactions;
	if (r !== null) {
		var o = i.call(r, e);
		if (o !== -1) {
			var s = r.length - 1;
			s === 0 ? r = n.reactions = null : (r[o] = r[s], r.pop());
		}
	}
	if (r === null && n.f & 2 && (G === null || !a.call(G, n))) {
		var c = n;
		c.f & 512 && (c.f ^= 512), c.v !== t && Qe(c), c.ac !== null && rt(() => {
			c.ac.abort(ye), c.ac = null, w(c, _);
		}), gt(c), Fn(c, 0);
	}
}
function Fn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Pn(e, n[r]);
}
function In(e) {
	var t = e.f;
	if (!(t & 16384)) {
		w(e, g);
		var n = H;
		H = e;
		try {
			t & 16777232 ? _n(e) : gn(e), hn(e);
			var r = Mn(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = Dn;
		} finally {
			H = n;
		}
	}
}
function X(e) {
	var t = !!(e.f & 2);
	if (Cn?.add(e), z !== null && !B && !(H !== null && H.f & 16384) && (W === null || !W.has(e))) {
		var n = z.deps;
		if (z.f & 2097152) e.rv < J && (e.rv = J, G === null && n !== null && n[K] === e ? K++ : G === null ? G = [e] : G.push(e));
		else {
			z.deps ??= [], a.call(z.deps, e) || z.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [z] : a.call(r, z) || r.push(z);
		}
	}
	if (R && O.has(e)) return O.get(e);
	if (t) {
		var i = e;
		if (R) {
			var o = i.v;
			return (!(i.f & 1024) && i.reactions !== null || Rn(i)) && (o = mt(i)), O.set(i, o), o;
		}
		var s = !(i.f & 512) && !B && z !== null && !!(z.f & 512), c = (i.f & ie) === 0;
		An(i) && (s && (i.f |= 512), ht(i)), s && !c && (_t(i), Ln(i));
	}
	if (E?.has(e)) return E.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Ln(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : a.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (_t(n), Ln(n));
	}
}
function Rn(e) {
	if (e.v === t) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (O.has(t) || t.f & 2 && Rn(t)) return !0;
	return !1;
}
function zn(e) {
	var t = B;
	try {
		return B = !0, e();
	} finally {
		B = t;
	}
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var Bn = Symbol("events"), Vn = /* @__PURE__ */ new Set(), Hn = /* @__PURE__ */ new Set();
function Un(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Yn.call(t, e), !e.cancelBubble) return rt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, C(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function Wn(e, t, n, r = {}) {
	var i = Un(t, e, n, r);
	return () => {
		i.__removed = !0, e.removeEventListener(t, i, r);
	};
}
function Gn(e, t, n) {
	(t[Bn] ??= {})[e] = n;
}
function Kn(e) {
	for (var t = 0; t < e.length; t++) Vn.add(e[t]);
	for (var n of Hn) n(e);
}
var qn = null, Jn = !1;
function Yn(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	qn = e, Jn || (Jn = !0, setTimeout(() => {
		Jn = !1, qn = null;
	}));
	var o = 0, c = qn === e && e[Bn];
	if (c) {
		var l = i.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[Bn] = t;
			return;
		}
		var u = i.indexOf(t);
		if (u === -1) return;
		l <= u && (o = l);
	}
	if (a = i[o] || e.target, a !== t) {
		s(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var d = z, f = H;
		V(null), U(null);
		try {
			for (var p, m = []; a !== null && a !== t;) {
				try {
					var ee = a[Bn]?.[r];
					ee == null || a.disabled && e.target !== a || ee.call(a, e);
				} catch (e) {
					p ? m.push(e) : p = e;
				}
				if (e.cancelBubble) break;
				o++, a = o < i.length ? i[o] : null;
			}
			if (p) {
				for (let e of m) queueMicrotask(() => {
					throw e;
				});
				throw p;
			}
		} finally {
			e[Bn] = t, delete e.currentTarget, V(d), U(f);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var Xn = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Zn(e) {
	return Xn?.createHTML(e) ?? e;
}
function Qn(e) {
	var t = Qt("template");
	return t.innerHTML = Zn(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function $n(e, t) {
	var n = H;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function er(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (b) return $n(x, null), x;
		i === void 0 && (i = Qn(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ Yt(i)));
		var t = r || Wt ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ Yt(t), s = t.lastChild;
			$n(o, s);
		} else $n(t, t);
		return t;
	};
}
function tr(e, t) {
	if (b) {
		var n = H;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = x), De();
	} else e !== null && e.before(t);
}
// node_modules/svelte/src/utils.js
function nr(e) {
	return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
var rr = [
	"beforeinput",
	"click",
	"change",
	"dblclick",
	"contextmenu",
	"focusin",
	"focusout",
	"input",
	"keydown",
	"keyup",
	"mousedown",
	"mousemove",
	"mouseout",
	"mouseover",
	"mouseup",
	"pointerdown",
	"pointermove",
	"pointerout",
	"pointerover",
	"pointerup",
	"touchend",
	"touchmove",
	"touchstart"
];
function ir(e) {
	return rr.includes(e);
}
var ar = /* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split("."), or = {
	formnovalidate: "formNoValidate",
	ismap: "isMap",
	nomodule: "noModule",
	playsinline: "playsInline",
	readonly: "readOnly",
	defaultvalue: "defaultValue",
	defaultchecked: "defaultChecked",
	srcobject: "srcObject",
	novalidate: "noValidate",
	allowfullscreen: "allowFullscreen",
	disablepictureinpicture: "disablePictureInPicture",
	disableremoteplayback: "disableRemotePlayback"
};
function sr(e) {
	return e = e.toLowerCase(), or[e] ?? e;
}
[...ar];
var cr = ["touchstart", "touchmove"];
function lr(e) {
	return cr.includes(e);
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function ur(e) {
	let t = 0, n = Ft(0), r;
	return () => {
		rn() && (X(n), dn(() => (t === 0 && (r = zn(() => e(() => zt(n)))), t += 1, () => {
			C(() => {
				--t, t === 0 && (r?.(), r = void 0, zt(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var dr = oe | se;
function fr(e, t, n, r) {
	new pr(e, t, n, r);
}
var pr = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = b ? x : null;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	#s = null;
	#c = null;
	#l = 0;
	#u = 0;
	#d = !1;
	#f = /* @__PURE__ */ new Map();
	#p = null;
	#m = ur(() => (this.#p = Ft(this.#l), () => {
		this.#p = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = H;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = H.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = pn(() => {
			if (b) {
				let e = je(this.#t);
				De();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#g(t);
				} else t ? this.#y() : this.#h();
			} else this.#b();
		}, dr), b && (this.#e = x);
	}
	#h() {
		try {
			this.#a = I(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#g(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#_(e);
		C(r), t && (this.#s = I(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#_(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#v() || (t ? we() : (t = !0, n && Ue(), this.#s !== null && bn(this.#s, () => {
				this.#s = null;
			}), this.#S(() => {
				this.#b();
			})));
		};
		return {
			reset: r,
			invoke_onerror: () => {
				if (!this.#v()) try {
					n = !0, this.#n.onerror?.(e, r), n = !1;
				} catch (e) {
					P(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#v() {
		return (this.#i.f & (re | ae)) !== 0;
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = I(() => e(this.#e)), C(() => {
			if (!this.#v()) {
				var e = this.#c = document.createDocumentFragment(), t = Jt(), n = !1;
				e.append(t), this.#a = this.#S(() => {
					try {
						return I(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							P(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#x(T)) : this.#u === 0 && (this.#e.before(e), this.#c = null, bn(this.#o, () => {
					this.#o = null;
				}), this.#x(T));
			}
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = I(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Sn(this.#a, e);
				let t = this.#n.pending;
				this.#o = I(() => t(this.#e));
			} else this.#x(T);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_reactions(this.#f);
	}
	defer_effect(e) {
		$e(e, this.#f);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = H, n = z, r = S;
		U(this.#i), V(this.#i), We(this.#i.ctx);
		try {
			return Dt.ensure(), e();
		} finally {
			U(t), V(n), We(r);
		}
	}
	#C(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#x(t), this.#o && bn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#C(e, t);
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !this.#p || this.#d || (this.#d = !0, C(() => {
			this.#d = !1, this.#p && Lt(this.#p, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#m(), X(this.#p);
	}
	error(t) {
		if (t === e || !this.#n.onerror && !this.#n.failed) throw t;
		T?.is_fork ? (this.#a && T.skip_effect(this.#a), this.#o && T.skip_effect(this.#o), this.#s && T.skip_effect(this.#s), T.oncommit(() => {
			this.#v() || this.#w(t);
		})) : this.#w(t);
	}
	#w(e) {
		this.#a &&= (L(this.#a), null), this.#o &&= (L(this.#o), null), this.#s &&= (L(this.#s), null), b && (Ee(this.#t), ke(), Ee(Ae()));
		let t = this.#n.failed, n = (e) => {
			if (this.#v()) return;
			let { reset: n, invoke_onerror: r } = this.#_(e);
			r(), t && !this.#v() && (this.#s = this.#S(() => {
				try {
					return I(() => {
						var r = H;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return P(e, this.#i.parent), null;
				}
			}));
		};
		C(() => {
			if (!this.#v()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					P(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => P(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function mr(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[_e] ??= e.nodeValue) && (e[_e] = n, e.nodeValue = `${n}`);
}
function hr(e, t) {
	return _r(e, t);
}
var gr = /* @__PURE__ */ new Map();
function _r(t, { target: n, anchor: r, props: i = {}, events: a, context: s, intro: c = !0, transformError: l }) {
	qt();
	var u = void 0, d = cn(() => {
		var c = r ?? n.appendChild(Jt());
		fr(c, { pending: () => {} }, (n) => {
			Ge({});
			var r = S;
			if (s && (r.c = s), a && (i.$$events = a), b && $n(n, null), u = t(n, i) || qe(), b && (H.nodes.end = x, x === null || x.nodeType !== 8 || x.data !== "]")) throw Se(), e;
			Ke();
		}, l);
		var d = /* @__PURE__ */ new Set(), f = (e) => {
			for (var t = 0; t < e.length; t++) {
				var r = e[t];
				if (!d.has(r)) {
					d.add(r);
					var i = lr(r);
					for (let e of [n, document]) {
						var a = gr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), gr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Yn, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(o(Vn)), Hn.add(f), () => {
			for (var e of d) for (let r of [n, document]) {
				var t = gr.get(r), i = t.get(e);
				--i == 0 ? (r.removeEventListener(e, Yn), t.delete(e), t.size === 0 && gr.delete(r)) : t.set(e, i);
			}
			Hn.delete(f), c !== r && c.parentNode?.removeChild(c);
		};
	});
	return vr.set(u, d), u;
}
var vr = /* @__PURE__ */ new WeakMap();
function yr(e, t) {
	let n = vr.get(e);
	return n ? (vr.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/elements/attachments.js
function br(e, t) {
	var n = void 0, r;
	mn(() => {
		n !== (n = t()) && (r &&= (L(r), null), n && (r = I(() => {
			ln(() => n(e));
		})));
	});
}
// node_modules/clsx/dist/clsx.mjs
function xr(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = xr(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function Sr() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = xr(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/svelte/src/internal/shared/attributes.js
function Cr(e) {
	return typeof e == "object" ? Sr(e) : e ?? "";
}
var wr = [..." 	\n\r\f\xA0\v﻿"];
function Tr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || wr.includes(r[o - 1])) && (s === r.length || wr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Er(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Dr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Or(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Dr)), i && c.push(...Object.keys(i).map(Dr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Dr(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== ";" && d++;
								var m = e.substring(l, d).trim();
								n += " " + m + ";";
							}
						}
						l = d + 1, u = -1;
					}
				}
			}
		}
		return r && (n += Er(r)), i && (n += Er(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function kr(e, t, n, r, i, a) {
	var o = e[he];
	if (b || o !== n || o === void 0) {
		var s = Tr(n, r, a);
		b && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[he] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function Ar(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function jr(e, t, n, r) {
	var i = e[ge];
	if (b || i !== t) {
		var a = Or(t, r);
		b && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[ge] = t;
	} else r && (Array.isArray(r) ? (Ar(e, n?.[0], r[0]), Ar(e, n?.[1], r[1], "important")) : Ar(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function Mr(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function Nr(e, t) {
	var n = !("__defaultValue" in e);
	(n || e.__defaultValue !== t) && (e.__defaultValue = t, Pr(e, !n || "__value" in e));
}
function Pr(e, t) {
	var n = e.__defaultValue, i = e.multiple, a = i ? n ?? [] : null;
	if (!i || r(a)) {
		var o = e.selectedIndex, s = t && i ? new Set(e.selectedOptions) : null;
		for (var c of e.options) {
			var l = Lr(c);
			Mr(c, i ? a.includes(l) : Ht(l, n));
		}
		if (t) {
			if (s !== null) for (c of e.options) {
				var u = s.has(c);
				c.selected !== u && (c.selected = u);
			}
			else e.selectedIndex !== o && (e.selectedIndex = o);
		}
	}
}
function Fr(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!r(t)) return Ce();
		for (var i of e.options) i.selected = t.includes(Lr(i));
	} else {
		for (i of e.options) if (Ht(Lr(i), t)) {
			i.selected = !0;
			return;
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function Ir(e) {
	var t = new MutationObserver((t) => {
		t.every(Rr) || ("__defaultValue" in e && Pr(e, !1), "__value" in e && Fr(e, e.__value));
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), an(() => {
		t.disconnect();
	});
}
function Lr(e) {
	return "__value" in e ? e.__value : e.value;
}
function Rr(e) {
	if (e.target.closest("selectedcontent") !== null) return !0;
	if (e.type === "childList") {
		var t = [...e.addedNodes, ...e.removedNodes];
		return t.length > 0 && t.every((e) => e.nodeName === "SELECTEDCONTENT");
	}
	return !1;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var zr = Symbol("class"), Br = Symbol("style"), Vr = Symbol("is custom element"), Hr = Symbol("is html"), Ur = be ? "link" : "LINK", Wr = be ? "input" : "INPUT", Gr = be ? "option" : "OPTION", Kr = be ? "select" : "SELECT", qr = be ? "progress" : "PROGRESS";
function Jr(e) {
	if (b) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Yr(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Yr(e, "checked", null), e.checked = r;
				}
			}
		};
		e[ve] = n, C(n), nt();
	}
}
function Yr(e, t, n, r) {
	var i = Qr(e);
	if (!(b && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Ur))) {
		var a = i[t];
		a !== (i[t] = n) && (t === "loading" && (e[pe] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ei(e).has(t) ? e[t] = n : (!b || typeof n != "number" && typeof n != "boolean" || a !== String(n)) && e.setAttribute(t, n));
	}
}
function Xr(e, n, r, i, a = !1, o = !1) {
	b && a && e.nodeName === Wr && ("defaultValue" in r || "defaultChecked" in r || Jr(e));
	var s = Qr(e), c = s[Vr], l = !s[Hr];
	let u = b && c;
	u && Te(!1);
	var d = n || {}, f = e.nodeName === Gr, p = e.nodeName === Kr;
	try {
		for (var m in n) !(m in r) && m[0] + m[1] !== "$$" && (r[m] = null);
		r.class ? r.class = Cr(r.class) : (i || r[zr]) && (r.class = null), r[Br] && (r.style ??= null);
		var ee = ei(e);
		if (e.nodeName === Wr && "type" in r && ("value" in r || "__value" in r)) {
			var h = r.type;
			(h !== d.type || h === void 0 && e.hasAttribute("type")) && (d.type = h, Yr(e, "type", h, o));
		}
		for (let a in r) {
			let u = r[a];
			if (f && a === "value" && u == null) e.value = e.__value = "", d[a] = u;
			else if (a === "class") kr(e, e.namespaceURI === "http://www.w3.org/1999/xhtml", u, i, n?.[zr], r[zr]), d[a] = u, d[zr] = r[zr];
			else if (a === "style") jr(e, u, n?.[Br], r[Br]), d[a] = u, d[Br] = r[Br];
			else {
				var te = d[a];
				if (u !== te || u === void 0 && e.hasAttribute(a)) {
					d[a] = u;
					var g = a[0] + a[1];
					if (g !== "$$") {
						if (g === "on") {
							let t = {}, n = "$$" + a, r = a.slice(2);
							var _ = ir(r);
							if (nr(r) && (r = r.slice(0, -7), t.capture = !0), !_ && te) {
								if (u != null) continue;
								e.removeEventListener(r, d[n], t), d[n] = null;
							}
							if (_) Gn(r, e, u), Kn([r]);
							else if (u != null) {
								function i(e) {
									d[a].call(this, e);
								}
								d[n] = Un(r, e, i, t);
							}
						} else if (a === "style") Yr(e, a, u);
						else if (a === "autofocus") et(e, !!u);
						else if (!c && (a === "__value" || a === "value" && u != null)) e.__value = u, (te == null || e.value !== u || u === 0 && e.nodeName === qr) && (e.value = u);
						else if (a === "selected" && f) Mr(e, u);
						else {
							var v = a;
							l || (v = sr(v));
							var ne = v === "defaultValue" || v === "defaultChecked";
							if (p && v === "defaultValue") continue;
							if (u == null && !c && !ne) {
								if (s[a] = null, v === "value" || v === "checked") {
									let t = e, r = n === void 0;
									if (v === "value") {
										let e = t.defaultValue;
										t.removeAttribute(v), t.defaultValue = e, t.value = t.__value = r ? e : null;
									} else {
										let e = t.defaultChecked;
										t.removeAttribute(v), t.defaultChecked = e, t.checked = r ? e : !1;
									}
								} else e.removeAttribute(a);
							} else ne || (c || typeof u != "string") && ee.has(v) ? (e[v] = u, v in s && (s[v] = t)) : typeof u != "function" && Yr(e, v, u, o);
						}
					}
				}
			}
		}
	} finally {
		u && Te(!0);
	}
	return d;
}
function Zr(e, t, n = [], r = [], i = [], a, o = !1, s = !1) {
	it(i, n, r, (n) => {
		var r = void 0, i = {}, c = e.nodeName === Kr, l = !1;
		if (mn(() => {
			var u = t(...n.map(X)), d = Xr(e, r, u, a, o, s);
			if (l && c) {
				var f = e;
				"defaultValue" in u && Nr(f, u.defaultValue), "value" in u && Fr(f, u.value);
			}
			for (let e of Object.getOwnPropertySymbols(i)) u[e] || L(i[e]);
			for (let t of Object.getOwnPropertySymbols(u)) {
				var p = u[t];
				t.description !== "@attach" || r && p === r[t] || (i[t] && L(i[t]), i[t] = I(() => br(e, () => p))), d[t] = p;
			}
			r = d;
		}), c) {
			var u = e;
			ln(() => {
				var e = r;
				"defaultValue" in e && Nr(u, e.defaultValue), Fr(u, e.value, !0), Ir(u);
			});
		}
		l = !0;
	});
}
function Qr(e) {
	return e[me] ??= {
		[Vr]: e.nodeName.includes("-"),
		[Hr]: e.namespaceURI === n
	};
}
var $r = /* @__PURE__ */ new Map();
function ei(e) {
	var t = e.getAttribute("is") || e.nodeName, n = $r.get(t);
	if (n) return n;
	$r.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = l(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = f(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ti(e, t) {
	return e === t || e?.[y] === t;
}
function ni(e = qe(), t, n, r) {
	var i = S.r, a = H;
	return ln(() => {
		var o, s;
		return dn(() => {
			o = s, s = r?.() || [], zn(() => {
				ti(n(...s), e) || (t(e, ...s), o && ti(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ti(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/reactivity/props.js
var ri = {
	get(e, t) {
		if (!e.exclude.has(t)) return e.props[t];
	},
	set(e, t) {
		return !1;
	},
	getOwnPropertyDescriptor(e, t) {
		if (!e.exclude.has(t) && t in e.props) return {
			enumerable: !0,
			configurable: !0,
			value: e.props[t]
		};
	},
	has(e, t) {
		return !e.exclude.has(t) && t in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((t) => !e.exclude.has(t));
	}
};
/*#__NO_SIDE_EFFECTS__*/
function ii(e, t, n) {
	return new Proxy({
		props: e,
		exclude: t
	}, ri);
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// node_modules/svelte/src/reactivity/reactive-value.js
var ai = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = ur(t);
	}
	get current() {
		return this.#t(), this.#e();
	}
}, oi = /\(.+\)/, si = /* @__PURE__ */ new Set([
	"all",
	"print",
	"screen",
	"and",
	"or",
	"not",
	"only"
]), ci = /*@__PURE__*/ new class extends ai {
	constructor(e, t) {
		let n = oi.test(e) || e.split(/[\s,]+/).some((e) => si.has(e.trim())) ? e : `(${e})`, r = window.matchMedia(n);
		super(() => r.matches, (e) => Wn(r, "change", e));
	}
}("(prefers-reduced-motion: reduce)"), li = class {
	omega;
	zeta;
	constructor(e, t) {
		this.omega = 2 * Math.PI / Math.max(e, 1e-4), this.zeta = Math.min(Math.max(t, 1e-4), 10);
	}
	advance(e, t) {
		let { omega: n, zeta: r } = this, i = e.value - e.target, a = e.velocity, o, s;
		if (r < 1) {
			let e = n * Math.sqrt(1 - r * r), c = Math.exp(-r * n * t), l = i, u = (a + r * n * i) / e, d = Math.cos(e * t), f = Math.sin(e * t);
			o = c * (l * d + u * f), s = c * ((u * e - r * n * l) * d - (l * e + r * n * u) * f);
		} else if (r === 1) {
			let e = Math.exp(-n * t), r = i, c = a + n * i;
			o = (r + c * t) * e, s = (c - n * (r + c * t)) * e;
		} else {
			let e = Math.sqrt(r * r - 1), c = -n * (r - e), l = -n * (r + e), u = (a - c * i) / (l - c), d = i - u, f = Math.exp(c * t), p = Math.exp(l * t);
			o = d * f + u * p, s = d * c * f + u * l * p;
		}
		e.write(e.target + o, s);
	}
}, ui = .4, di = .91, fi = 1.35, Z = class e {
	static REFERENCE_DURATION = .42;
	static DEFAULT_BOUNCE = .46;
	scale;
	bounce;
	position;
	glyphScale;
	offset;
	opacity;
	blurIn;
	blurOut;
	constructor(t, n) {
		let r = Math.min(Math.max(t / e.REFERENCE_DURATION, .1), 10);
		this.scale = r, this.bounce = Math.min(Math.max(n, 0), .95), this.position = new li(.34 * r, 1), this.glyphScale = new li(.34 * r, 1), this.offset = new li(.4 * r, Math.min(Math.max(1 - this.bounce, .05), 1)), this.opacity = new li(.28 * r, 1), this.blurIn = new li(ui * r, di), this.blurOut = new li(ui / fi * r, di);
	}
	get staggerWindow() {
		return .2 * this.scale;
	}
	equals(e) {
		return this.scale === e.scale && this.bounce === e.bounce;
	}
}, Q;
(function(e) {
	e.Leading = "leading", e.Center = "center", e.Trailing = "trailing";
})(Q ||= {});
var pi = (e) => {
	switch (e) {
		case "center": return Q.Center;
		case "end": return Q.Trailing;
		default: return Q.Leading;
	}
}, mi;
(function(e) {
	e.Prefix = "prefix", e.Core = "core", e.Suffix = "suffix";
})(mi ||= {});
// node_modules/svelte-glyph-roll/dist/core/enums/TransitionDirection.js
var $;
(function(e) {
	e.Auto = "auto", e.Up = "up", e.Down = "down";
})($ ||= {});
var hi = (e) => {
	switch (e) {
		case "up": return $.Up;
		case "down": return $.Down;
		default: return $.Auto;
	}
}, gi = 8, _i = .375, vi = 512, yi = .57735, bi = .5, xi = "none", Si = /* @__PURE__ */ new Map(), Ci = (e) => e > 0 ? e * yi + bi : 0, wi = {
	NO_FILTER: xi,
	sigma: Ci,
	filter: (e) => {
		if (!(e >= _i)) return xi;
		let t = Math.round(e * gi), n = Si.get(t);
		if (n) return n;
		Si.size >= vi && Si.clear();
		let r = `blur(${Ci(t / gi).toFixed(3)}px)`;
		return Si.set(t, r), r;
	}
}, Ti = {
	blurIntensity: 1,
	maxBlurRadius: Infinity,
	enterScale: .4,
	travelRatio: 1 / 3
}, Ei = () => ({
	text: "",
	alignment: Q.Leading,
	direction: $.Auto,
	decimalSeparator: ".",
	shape: { ...Ti },
	clipEnabled: !0,
	animationsEnabled: !0,
	duration: Z.REFERENCE_DURATION,
	bounce: Z.DEFAULT_BOUNCE
}), Di = (e) => e.shape.blurIntensity > 0, Oi = (e, t) => e.text === t.text && e.alignment === t.alignment && e.direction === t.direction && e.decimalSeparator === t.decimalSeparator && e.clipEnabled === t.clipEnabled && e.animationsEnabled === t.animationsEnabled && e.duration === t.duration && e.bounce === t.bounce && e.shape.blurIntensity === t.shape.blurIntensity && e.shape.maxBlurRadius === t.shape.maxBlurRadius && e.shape.enterScale === t.shape.enterScale && e.shape.travelRatio === t.shape.travelRatio, ki = (e) => `${e.role}:${e.index}`, Ai = (e) => e.length === 1 && e >= "0" && e <= "9", ji = /\p{N}/u, Mi, Ni = () => (Mi === void 0 && (Mi = typeof Intl < "u" && "Segmenter" in Intl ? new Intl.Segmenter(void 0, { granularity: "grapheme" }) : null), Mi), Pi = (e) => {
	let t = [], n = Ni();
	if (n) {
		for (let { segment: r, index: i } of n.segment(e)) t.push({
			text: r,
			utf16Offset: i
		});
		return t;
	}
	let r = 0;
	for (let n of e) t.push({
		text: n,
		utf16Offset: r
	}), r += n.length;
	return t;
}, Fi = (e) => ji.test(e), Ii = (e, t, n) => {
	if (e.length === 0) return [];
	let r = e.findIndex((e) => Ai(e.text));
	if (r < 0) return e.map((t, r) => ({
		role: mi.Core,
		index: n ? r : r - e.length
	}));
	let i = r;
	for (let t = e.length - 1; t >= r; t--) if (Ai(e[t].text)) {
		i = t;
		break;
	}
	let a = i + 1;
	for (let n = i; n >= r; n--) if (e[n].text === t) {
		a = n;
		break;
	}
	return e.map((t, n) => n < r ? {
		role: mi.Prefix,
		index: n
	} : n > i ? {
		role: mi.Suffix,
		index: e.length - 1 - n
	} : {
		role: mi.Core,
		index: n - a
	});
}, Li = (e, t) => {
	let n = "", r = !1, i = !1;
	for (let a of e) Ai(a) ? (n += a, r = !0) : a === t && r && !i ? (n += ".", i = !0) : (a === "-" || a === "−") && n.length === 0 && (n += "-");
	if (!r) return null;
	let a = Number(n);
	return Number.isNaN(a) ? null : a;
}, Ri = class {
	spring;
	_value;
	_target;
	_velocity = 0;
	epsilon;
	constructor(e, t, n) {
		this.spring = e, this._value = t, this._target = t, this.epsilon = n;
	}
	get value() {
		return this._value;
	}
	get target() {
		return this._target;
	}
	get velocity() {
		return this._velocity;
	}
	snapTo(e) {
		this._value = e, this._target = e, this._velocity = 0;
	}
	retarget(e) {
		this._target = e;
	}
	reset(e, t) {
		this._value = e, this._target = t, this._velocity = 0;
	}
	get isSettled() {
		return Math.abs(this._value - this._target) < this.epsilon && Math.abs(this._velocity) < this.epsilon * 8;
	}
	tick(e) {
		return this.isSettled || (this.spring.advance(this, e), this.isSettled) ? (this.settle(), !1) : !0;
	}
	write(e, t) {
		this._value = e, this._velocity = t;
	}
	settle() {
		this._value = this._target, this._velocity = 0;
	}
}, zi = .25, Bi = .275, Vi = .35, Hi = .15, Ui = 3, Wi = .01, Gi = class {
	id;
	unit;
	slot = null;
	invalid = !1;
	disappearing = !1;
	delay = 0;
	x;
	offset;
	scale;
	alpha;
	blur;
	presence = 1;
	advance = 0;
	lineHeight = 0;
	travel = 0;
	padX = 0;
	padY = 0;
	feather = 0;
	viewportWidth = 1;
	viewportHeight = 1;
	enterScale = Ti.enterScale;
	appearBlur = 0;
	disappearBlur = 0;
	blurIn;
	blurOut;
	constructor(e, t, n) {
		this.id = e, this.unit = t, this.x = new Ri(n.position, 0, .02), this.offset = new Ri(n.offset, 0, .002), this.scale = new Ri(n.glyphScale, 1, .002), this.alpha = new Ri(n.opacity, 1, .002), this.blur = new Ri(n.blurIn, 0, .05), this.blurIn = n.blurIn, this.blurOut = n.blurOut;
	}
	adoptSprings(e) {
		this.x.spring = e.position, this.offset.spring = e.offset, this.scale.spring = e.glyphScale, this.alpha.spring = e.opacity, this.blurIn = e.blurIn, this.blurOut = e.blurOut, this.blur.spring = this.disappearing ? this.blurOut : this.blurIn;
	}
	updateMetrics(e, t, n) {
		this.advance = e.advance, this.lineHeight = t.height, this.travel = t.height * n.travelRatio, this.enterScale = n.enterScale, this.appearBlur = Math.min(t.height * zi * n.blurIntensity, n.maxBlurRadius), this.disappearBlur = Math.min(t.height * Bi * n.blurIntensity, n.maxBlurRadius);
		let r = Math.ceil(wi.sigma(Math.max(this.appearBlur, this.disappearBlur)) * Ui);
		this.feather = Math.ceil(t.height * Vi), this.padX = Math.max(Math.ceil(t.height * Hi), r), this.padY = this.feather, this.viewportWidth = Math.max(Math.ceil(e.advance + this.padX * 2), 1), this.viewportHeight = Math.max(Math.ceil(t.height + this.padY * 2), 1);
	}
	beginAppear(e, t) {
		let n = e ? -1 : 1;
		this.offset.reset(n, 0), this.scale.reset(this.enterScale, 1), this.alpha.reset(0, 1), this.blur.spring = this.blurIn, this.blur.reset(t ? this.appearBlur : 0, 0), this.disappearing = !1;
	}
	returnToVisible() {
		this.offset.retarget(0), this.scale.retarget(1), this.alpha.retarget(1), this.blur.spring = this.blurIn, this.blur.retarget(0), this.disappearing = !1;
	}
	beginDisappear(e, t) {
		let n = e ? 1 : -1;
		this.offset.retarget(n), this.scale.retarget(this.enterScale), this.alpha.retarget(0), this.blur.spring = this.blurOut, this.blur.retarget(t ? this.disappearBlur : 0), this.disappearing = !0;
	}
	snapToVisible() {
		this.offset.snapTo(0), this.scale.snapTo(1), this.alpha.snapTo(1), this.blur.snapTo(0), this.disappearing = !1, this.delay = 0;
	}
	clearBlur() {
		this.blur.snapTo(0);
	}
	get isDisplaced() {
		return this.offset.value !== 0 || this.scale.value !== 1 || this.blur.value > 0;
	}
	get isAnimating() {
		return this.delay > 0 || !this.x.isSettled || !this.offset.isSettled || !this.scale.isSettled || !this.alpha.isSettled || !this.blur.isSettled;
	}
	get isVisible() {
		return this.alpha.value >= Wi || this.alpha.target >= Wi;
	}
	tick(e) {
		let t = !1;
		return this.x.tick(e) && (t = !0), this.offset.tick(e) && (t = !0), this.scale.tick(e) && (t = !0), this.alpha.tick(e) && (t = !0), this.blur.tick(e) && (t = !0), t;
	}
}, Ki = class {
	glyphs = [];
	contentSize = {
		width: 0,
		height: 0
	};
	alignment = Q.Leading;
	blurActive = !0;
	clipEnabled = !0;
	springs = new Z(Z.REFERENCE_DURATION, Z.DEFAULT_BOUNCE);
	layoutWidth = new Ri(this.springs.position, 0, .02);
	currentText = "";
	hasContent = !1;
	countsDown = !1;
	nextId = 0;
	lastTypesetter = null;
	apply(e, t) {
		let n = this.lastTypesetter !== null && !this.lastTypesetter.equals(t);
		this.lastTypesetter = t;
		let r = new Z(e.duration, e.bounce);
		if (!r.equals(this.springs)) {
			this.springs = r, this.layoutWidth.spring = r.position;
			for (let e of this.glyphs) e.adoptSprings(r);
		}
		this.alignment = e.alignment, this.blurActive = Di(e), this.clipEnabled = e.clipEnabled;
		let i = !Fi(e.text) && !Fi(this.currentText), a = t.typeset(e.text, e.decimalSeparator, i);
		this.countsDown = this.resolveDirection(e);
		let { shape: o } = e;
		if (e.animationsEnabled && this.hasContent && !n ? (this.reconcile(a, o), this.layoutWidth.retarget(a.width)) : (this.rebuild(a, o), this.layoutWidth.snapTo(a.width)), !this.blurActive) for (let e of this.glyphs) e.clearBlur();
		this.composePresence(), this.contentSize = {
			width: a.width,
			height: a.height
		}, this.currentText = e.text, this.hasContent = !0;
	}
	get layoutSize() {
		return {
			width: this.layoutWidth.value,
			height: this.contentSize.height
		};
	}
	get isResizing() {
		return !this.layoutWidth.isSettled;
	}
	tick(e) {
		let t = this.layoutWidth.tick(e), n = 0;
		for (; n < this.glyphs.length;) {
			let r = this.glyphs[n];
			r.delay > 0 ? (r.delay -= e, t = !0, n++) : (r.tick(e) && (t = !0), r.invalid && !r.isVisible ? this.glyphs.splice(n, 1) : n++);
		}
		return this.composePresence(), t;
	}
	anchorBase(e) {
		switch (this.alignment) {
			case Q.Center: return e / 2;
			case Q.Trailing: return e;
			default: return 0;
		}
	}
	rebuild(e, t) {
		this.glyphs = e.placements.map((n) => {
			let r = new Gi(this.nextId++, n.unit, this.springs);
			return r.slot = n.slot, r.updateMetrics(n, e, t), r.x.snapTo(this.anchoredX(n.x, e.width)), r.snapToVisible(), r;
		});
	}
	reconcile(e, t) {
		let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
		for (let e of this.glyphs) {
			if (e.invalid = !0, !e.slot) continue;
			let t = ki(e.slot), i = `${t}|${e.unit}`, a = n.get(i);
			a ? a.push(e) : n.set(i, [e]), r.has(t) || r.set(t, e);
		}
		let i = [], a = /* @__PURE__ */ new Map();
		for (let t of e.placements) a.set(ki(t.slot), this.anchoredX(t.x, e.width));
		for (let a of e.placements) {
			let o = ki(a.slot), s = n.get(`${o}|${a.unit}`), c;
			if (s && s.length > 0) {
				let e = s.findIndex((e) => !e.disappearing);
				c = s.splice(Math.max(e, 0), 1)[0];
			}
			let l = this.anchoredX(a.x, e.width);
			if (c) c.invalid = !1, c.updateMetrics(a, e, t), c.x.retarget(l), c.returnToVisible();
			else {
				let n = new Gi(this.nextId++, a.unit, this.springs);
				n.slot = a.slot, n.updateMetrics(a, e, t);
				let s = r.get(o);
				s ? n.x.reset(s.x.value, l) : n.x.snapTo(l), n.beginAppear(this.countsDown, this.blurActive), this.glyphs.push(n), i.push(n);
			}
		}
		let o = this.glyphs.filter((e) => e.invalid).sort((e, t) => e.x.value - t.x.value);
		for (let e of o) {
			let t = e.slot ? a.get(ki(e.slot)) : void 0;
			t !== void 0 && e.x.retarget(t);
		}
		this.stagger(i, o);
	}
	stagger(e, t) {
		let n = Math.max(e.length, t.length), r = n === 0 ? 0 : this.springs.staggerWindow / n;
		e.forEach((e, t) => {
			e.delay = t * r;
		}), t.forEach((e, t) => {
			e.isAnimating || (e.delay = t * r), e.beginDisappear(this.countsDown, this.blurActive);
		});
	}
	composePresence() {
		let e = /* @__PURE__ */ new Map();
		for (let t of this.glyphs) {
			if (!t.slot) continue;
			let n = ki(t.slot);
			e.set(n, (e.get(n) ?? 0) + qi(t.alpha.value));
		}
		for (let t of this.glyphs) {
			let n = qi(t.alpha.value), r = t.slot ? e.get(ki(t.slot)) ?? 0 : 0;
			t.presence = r > 1 ? n / r : n;
		}
	}
	resolveDirection(e) {
		switch (e.direction) {
			case $.Up: return !1;
			case $.Down: return !0;
			default: {
				let t = Li(this.currentText, e.decimalSeparator), n = Li(e.text, e.decimalSeparator);
				return t !== null && n !== null && t !== n ? n < t : this.countsDown;
			}
		}
	}
	anchoredX(e, t) {
		switch (this.alignment) {
			case Q.Center: return e - t / 2;
			case Q.Trailing: return e - t;
			default: return e;
		}
	}
}, qi = (e) => Math.min(Math.max(e, 0), 1), Ji = [
	"font-family",
	"font-size",
	"font-weight",
	"font-style",
	"font-stretch",
	"font-kerning",
	"font-optical-sizing",
	"font-synthesis",
	"font-variant-caps",
	"font-variant-east-asian",
	"font-variant-ligatures",
	"font-variant-numeric",
	"font-variant-position",
	"font-feature-settings",
	"font-variation-settings",
	"letter-spacing",
	"word-spacing",
	"text-transform"
], Yi = "0123456789 Hxg", Xi = null, Zi = () => {
	if (typeof document > "u" || !document.body) return null;
	if (Xi?.isConnected) return Xi;
	let e = document.createElement("span");
	return e.setAttribute("aria-hidden", "true"), Object.assign(e.style, {
		position: "fixed",
		left: "0",
		top: "0",
		margin: "0",
		padding: "0",
		border: "0",
		width: "max-content",
		visibility: "hidden",
		pointerEvents: "none",
		whiteSpace: "pre",
		lineHeight: "normal",
		direction: "ltr"
	}), document.body.appendChild(e), Xi = e, e;
}, Qi = class e {
	fontStyle;
	key;
	static inheritingFrom(t) {
		let n = getComputedStyle(t), r = {};
		for (let e of Ji) r[e] = n.getPropertyValue(e);
		return new e(r);
	}
	constructor(e) {
		this.fontStyle = e;
		let t = Object.values(e).join("|"), n = this.prepare();
		if (!n) {
			this.key = t;
			return;
		}
		n.textContent = Yi;
		let { width: r, height: i } = n.getBoundingClientRect();
		this.key = `${t}|${r.toFixed(3)}x${i.toFixed(3)}`;
	}
	equals(e) {
		return this === e || this.key === e.key;
	}
	typeset(e, t, n) {
		let r = Pi(e), i = this.prepare();
		if (!i) return {
			placements: [],
			width: 0,
			height: 0
		};
		if (r.length === 0) return i.textContent = "0", {
			placements: [],
			width: 0,
			height: i.getBoundingClientRect().height
		};
		i.textContent = e;
		let a = i.getBoundingClientRect(), o = i.firstChild, s = document.createRange(), c = Ii(r, t, n), l = 0;
		return {
			placements: r.map((e, t) => {
				s.setStart(o, e.utf16Offset), s.setEnd(o, e.utf16Offset + e.text.length);
				let n = s.getBoundingClientRect(), r = n.width > 0 || n.height > 0, i = r ? n.left - a.left : l, u = r ? n.width : 0;
				return l = i + u, {
					unit: e.text,
					slot: c[t],
					x: i,
					advance: u
				};
			}),
			width: a.width,
			height: a.height
		};
	}
	prepare() {
		let e = Zi();
		if (e) for (let t of Ji) e.style.setProperty(t, this.fontStyle[t]);
		return e;
	}
}, $i = 1 / 15, ea = 6, ta = "none", na = (e) => e * e * (3 - 2 * e), ra = (e, t, n) => {
	let r = [];
	for (let t = 0; t <= ea; t++) {
		let i = t / ea;
		r.push(`rgba(0,0,0,${na(i).toFixed(3)}) ${(e - n * (1 - i)).toFixed(2)}px`);
	}
	for (let e = 0; e <= ea; e++) {
		let i = e / ea;
		r.push(`rgba(0,0,0,${na(1 - i).toFixed(3)}) ${(t + n * i).toFixed(2)}px`);
	}
	return `linear-gradient(to bottom, ${r.join(", ")})`;
}, ia = (e, t) => {
	e.style.setProperty("mask-image", t), e.style.setProperty("-webkit-mask-image", t);
}, aa = () => {
	let e = document.createElement("span");
	return Object.assign(e.style, {
		position: "absolute",
		left: "0",
		top: "0",
		visibility: "hidden",
		whiteSpace: "pre",
		lineHeight: "normal"
	}), e.textContent = Yi, e;
}, oa = (e) => {
	let t = document.createElement("span");
	return Object.assign(t.style, {
		position: "absolute",
		left: "0",
		top: "0",
		display: "block",
		width: "0",
		height: "0",
		overflow: "hidden"
	}), t.appendChild(e), t;
}, sa = (e) => {
	let t = document.createElement("span");
	Object.assign(t.style, {
		position: "absolute",
		left: "0",
		top: "0",
		display: "block",
		margin: "0",
		padding: "0"
	}), t.style.setProperty("mask-repeat", "no-repeat"), t.style.setProperty("-webkit-mask-repeat", "no-repeat"), t.style.setProperty("mask-size", "100% 100%"), t.style.setProperty("-webkit-mask-size", "100% 100%");
	let n = document.createElement("span");
	return Object.assign(n.style, {
		position: "absolute",
		display: "block",
		margin: "0",
		padding: "0",
		whiteSpace: "pre",
		transformOrigin: "50% 50%"
	}), n.textContent = e, t.appendChild(n), {
		window: t,
		content: n,
		geometry: "",
		featherMask: ta,
		mask: ta,
		windowTransform: "",
		opacity: "",
		contentTransform: "",
		filter: ""
	};
}, ca = class {
	host;
	onContentSizeChange = null;
	engine = new Ki();
	root;
	probe = aa();
	nodes = /* @__PURE__ */ new Map();
	resizeObserver = null;
	bounds;
	frame = 0;
	lastTimestamp = 0;
	reportedSize = null;
	spec = Ei();
	typesetter = null;
	constructor(e) {
		this.host = e, this.root = document.createElement("div"), this.root.setAttribute("aria-hidden", "true"), Object.assign(this.root.style, {
			position: "absolute",
			left: "0",
			top: "0",
			right: "0",
			bottom: "0",
			overflow: "visible",
			pointerEvents: "none",
			userSelect: "none",
			direction: "ltr"
		}), this.root.appendChild(oa(this.probe)), e.appendChild(this.root), this.bounds = {
			width: e.clientWidth,
			height: e.clientHeight
		}, typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => {
			this.bounds = {
				width: this.host.clientWidth,
				height: this.host.clientHeight
			}, this.render(), this.refresh();
		}), this.resizeObserver.observe(e), this.resizeObserver.observe(this.probe));
	}
	update(e) {
		let t = Qi.inheritingFrom(this.probe);
		this.typesetter?.equals(t) && Oi(e, this.spec) || this.apply(e, t);
	}
	destroy() {
		this.stop(), this.resizeObserver?.disconnect(), this.nodes.clear(), this.root.remove(), this.onContentSizeChange = null;
	}
	refresh() {
		if (!this.typesetter) return;
		let e = Qi.inheritingFrom(this.probe);
		e.equals(this.typesetter) || this.apply(this.spec, e);
	}
	apply(e, t) {
		this.typesetter = t, this.spec = e, this.engine.apply(e, t), this.syncNodes(), this.render(), this.reportContentSize(), this.start();
	}
	syncNodes() {
		let e = /* @__PURE__ */ new Set();
		for (let t of this.engine.glyphs) if (e.add(t.id), !this.nodes.has(t.id)) {
			let e = sa(t.unit);
			this.root.appendChild(e.window), this.nodes.set(t.id, e);
		}
		for (let [t, n] of this.nodes) e.has(t) || (n.window.remove(), this.nodes.delete(t));
	}
	render() {
		let { glyphs: e, contentSize: t, clipEnabled: n, blurActive: r } = this.engine;
		if (e.length === 0) return;
		let i = this.engine.anchorBase(this.bounds.width), a = Math.max((this.bounds.height - t.height) / 2, 0);
		for (let t of e) {
			let e = this.nodes.get(t.id);
			e && this.renderGlyph(e, t, i, a, n, r);
		}
	}
	renderGlyph(e, t, n, r, i, a) {
		let { window: o, content: s } = e, c = `${t.viewportWidth}:${t.viewportHeight}:${t.padX}:${t.padY}:${t.advance}:${t.lineHeight}`;
		e.geometry !== c && (e.geometry = c, o.style.width = `${t.viewportWidth}px`, o.style.height = `${t.viewportHeight}px`, s.style.left = `${t.padX}px`, s.style.top = `${t.padY}px`, s.style.width = `${t.advance}px`, s.style.height = `${t.lineHeight}px`, s.style.lineHeight = `${t.lineHeight}px`, e.featherMask = ra(t.padY, t.padY + t.lineHeight, t.feather), e.mask = "");
		let l = `translate(${(n + t.x.value - t.padX).toFixed(3)}px, ${(r - t.padY).toFixed(3)}px)`;
		e.windowTransform !== l && (e.windowTransform = l, o.style.transform = l);
		let u = t.presence >= 1 ? "" : t.presence.toFixed(4);
		e.opacity !== u && (e.opacity = u, o.style.opacity = u);
		let d = t.isDisplaced, f = i && d ? e.featherMask : ta;
		e.mask !== f && (e.mask = f, ia(o, f));
		let p = d ? `translate3d(0, ${(t.offset.value * t.travel).toFixed(3)}px, 0) scale(${t.scale.value.toFixed(4)})` : ta;
		e.contentTransform !== p && (e.contentTransform = p, s.style.transform = p);
		let m = a ? wi.filter(t.blur.value) : wi.NO_FILTER;
		e.filter !== m && (e.filter = m, s.style.filter = m);
	}
	reportContentSize() {
		let { width: e, height: t } = this.engine.layoutSize, n = this.engine.isResizing ? 100 : 1, r = {
			width: Math.round(e * n) / n,
			height: Math.round(t)
		};
		this.reportedSize && this.reportedSize.width === r.width && this.reportedSize.height === r.height || (this.reportedSize = r, this.onContentSizeChange?.(r));
	}
	start() {
		this.frame === 0 && typeof requestAnimationFrame < "u" && (this.lastTimestamp = 0, this.frame = requestAnimationFrame(this.step));
	}
	stop() {
		this.frame !== 0 && cancelAnimationFrame(this.frame), this.frame = 0;
	}
	step = (e) => {
		this.frame = 0;
		let t = this.lastTimestamp;
		this.lastTimestamp = e;
		let n = t === 0 ? 0 : Math.min((e - t) / 1e3, $i);
		if (n <= 0) {
			this.frame = requestAnimationFrame(this.step);
			return;
		}
		let r = this.engine.tick(n);
		this.syncNodes(), this.render(), this.reportContentSize(), r && (this.frame = requestAnimationFrame(this.step));
	};
}, la = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"alignment",
	"decimalSeparator",
	"direction",
	"duration",
	"bounce",
	"enterScale",
	"travel",
	"blurIntensity",
	"maxBlurRadius",
	"clip",
	"animated",
	"monospacedDigits",
	"style"
]), ua = /* @__PURE__ */ er("<span><span> </span></span>");
function da(e, t) {
	Ge(t, !0);
	let n = (e, t, n) => Math.min(Math.max(e, t), n), r = /* @__PURE__ */ ii(t, la), i = /* @__PURE__ */ k(void 0), a = /* @__PURE__ */ k(null), o = /* @__PURE__ */ k(null), s = /* @__PURE__ */ dt(() => typeof t.value == "number" ? String(t.value) : t.value), c = /* @__PURE__ */ dt(() => ({
		text: X(s),
		alignment: pi(t.alignment),
		direction: hi(t.direction),
		decimalSeparator: t.decimalSeparator && Array.from(t.decimalSeparator)[0] || ".",
		shape: {
			blurIntensity: n(t.blurIntensity ?? Ti.blurIntensity, 0, 8),
			maxBlurRadius: t.maxBlurRadius == null ? Ti.maxBlurRadius : Math.max(t.maxBlurRadius, 0),
			enterScale: n(t.enterScale ?? Ti.enterScale, 0, 2),
			travelRatio: n(t.travel ?? Ti.travelRatio, 0, 3)
		},
		clipEnabled: t.clip ?? !0,
		animationsEnabled: (t.animated ?? !0) && !ci.current,
		duration: t.duration == null ? Z.REFERENCE_DURATION : t.duration / 1e3,
		bounce: n(t.bounce ?? Z.DEFAULT_BOUNCE, 0, .95)
	})), l = /* @__PURE__ */ dt(() => X(o) ? `width: ${X(o).width}px; height: ${X(o).height}px;` : "");
	on(() => {
		if (!X(i)) return;
		let e = new ca(X(i));
		return e.onContentSizeChange = (e) => A(o, e), A(a, e), () => {
			e.destroy(), A(a, null);
		};
	}), on(() => {
		X(a)?.update(X(c));
	});
	var u = ua();
	Zr(u, () => ({
		...r,
		style: `display: inline-block; position: relative; ${X(l) ?? ""} ${t.style ?? "" ?? ""}`,
		[Br]: { "font-variant-numeric": t.monospacedDigits ? "tabular-nums" : void 0 }
	}));
	var d = Xt(u);
	let f;
	var p = Zt(d, !0);
	Oe(u), ni(u, (e) => A(i, e), () => X(i)), fn(() => {
		f = jr(d, "", f, {
			display: "block",
			opacity: X(o) ? "0" : null,
			"white-space": "pre",
			"line-height": "normal",
			direction: "ltr"
		}), mr(p, X(s));
	}), tr(e, u), Ke();
}
// vanilla/glyph-roll.svelte.ts
function fa(e, t) {
	let n = M({ ...t }), r = hr(da, {
		target: e,
		props: n
	}), i = !1;
	return {
		update(e) {
			i || Object.assign(n, e);
		},
		destroy() {
			i || (i = !0, yr(r));
		}
	};
}
var pa = {
	direction: "down",
	duration: 600,
	bounce: .3,
	travel: .6,
	enterScale: .85,
	blurIntensity: 2,
	monospacedDigits: !0
};
export { pa as STANDBY_PRESET, fa as createGlyphRoll };
