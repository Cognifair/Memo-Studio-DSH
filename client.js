/**
 * 墨卡大师灵动岛 —— 客户端半边。
 *
 * 形态：frame 级浮层（shell.overlay）顶部居中的一枚胶囊「墨卡大师 · 技能指南」，
 * 点开向下长出一块面板：左边按任务列出 7 条入口，右边是所选技能的一句话用途、
 * 输入 / 输出、主要限制，以及一条可以复制的示例请求。
 *
 * 三条纪律：
 *   1. 只走插槽注册，不碰 DOM、不挂 body、不改官方节点；
 *   2. 配色支持浅色、深色与跟随系统，通过个人菜单切换并在本机保存；
 *   3. 只读静态目录：不记调用、不统计、不读会话、不连账户 —— 点开只是看，复制只是写剪贴板。
 *
 * 技能文案集中在下面的 TASKS / SKILLS 两段里，要改内容只动这两段。
 */
window.__ModuleLoader__.load({
  id: 'dsh-memo-skill-island',
  factory: function (require) {
    'use strict';

    var React = require('react');
    var h = React.createElement;

    /* Vendored svelte-glyph-roll 0.6.0 + Svelte (MIT); see vendor/glyph-roll. */
    var glyphRoll = (function () {
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
return { STANDBY_PRESET: pa, createGlyphRoll: fa };

    })();


    /* ════════════════════════════════════════════════════════════════
     * 静态数据（技能介绍都在这里）
     * ════════════════════════════════════════════════════════════════ */

    /** 按任务浏览的入口；skill 指向下面 SKILLS 里的 id。 */
    var TASKS = [
      {
        id: 'handout',
        label: { zh: '制卡核心技能', en: 'Core card making' },
        blurb: { zh: '把成堆材料变成能背的卡', en: 'Turn a stack of material into cards' },
        skill: 'memo-cardest'
      },
      {
        id: 'scan',
        label: { zh: '材料转文字', en: 'Material to text' },
        blurb: { zh: 'PDF、扫描件先变成文字', en: 'Get text out of PDFs and scans' },
        skill: 'memo-mineruocr'
      },
      {
        id: 'table',
        label: { zh: '图片与表格', en: 'Images & tables' },
        blurb: { zh: '表格、公式做进卡片', en: 'Put tables and formulas on cards' },
        skill: 'memo-canvas'
      },
      {
        id: 'anki',
        label: { zh: 'Anki 迁移', en: 'Anki migration' },
        blurb: { zh: '把 Anki 的挖空卡搬过来', en: 'Move occlusion cards out of Anki' },
        skill: 'memo-ankigo'
      },
      {
        id: 'links',
        label: { zh: '卡片互链', en: 'Card links' },
        blurb: { zh: '让卡片之间能跳转', en: 'Make cards jump to each other' },
        skill: 'memo-cardlink'
      },
      {
        id: 'txt',
        label: { zh: 'TXT 导入', en: 'TXT import' },
        blurb: { zh: '生成能直接导入的文件', en: 'Build a file Markji can import' },
        skill: 'memo-txt'
      },
      {
        id: 'help',
        label: { zh: '使用答疑', en: 'How-to help' },
        blurb: { zh: '问墨墨本身怎么用', en: 'Ask how Markji itself works' },
        skill: 'memo-qahelper'
      },
      {
        id: 'delete',
        label: { zh: '批量删除', en: 'Bulk delete' },
        blurb: { zh: '按清单清掉一批卡', en: 'Remove a batch of cards' },
        skill: 'memo-cardest-delete',
        /* 它和「制卡核心技能」共用 memo-cardest：只有本轮真的走到删除路线才亮 */
        routeStage: 'delete'
      }
    ];

    /** 每条技能只写四处：用途、输入、输出、主要限制，外加一条示例请求。 */
    /** 常用制卡功能排在上面；答疑、删除这类辅助入口沉到底部（不另加分组标题）。 */
    var TASK_PRIMARY = TASKS.filter(function (item) {
      return item.id !== 'help' && item.id !== 'delete';
    });
    var TASK_AUX = TASKS.filter(function (item) {
      return item.id === 'help' || item.id === 'delete';
    });

    var SKILLS = [
      {
        id: 'memo-cardest',
        title: '墨卡大师',
        titleEn: 'Memo-Cardest',
        alias: 'Memo-Cardest',
        use: {
          zh: '把讲义、笔记和教材整理成墨墨记忆卡。',
          en: 'Turn handouts, notes and textbooks into Markji cards.'
        },
        prep: {
          zh: '学习材料，以及你想学什么、怎么考。',
          en: 'Your material, plus what you want to learn and how you want to be tested.'
        },
        example: {
          zh: '把这份讲义做成 30 张概念卡，先给我 TXT。',
          en: 'Turn this handout into 30 concept cards and give me the TXT first.'
        },
        delivery: {
          zh: '可交付 TXT，也可通过 API 直接写进指定牌组。',
          en: 'Delivered as TXT, or written into a deck through the API.'
        },
        detail: {
          zh: '材料可以是 PDF、TXT 或已经识别好的文字；题型和目标牌组章节都能指定。只管墨墨记忆卡，不用于墨墨背单词；只要 OCR 或文档转换，走「材料转文字」。',
          en: 'Material can be PDF, TXT or already-transcribed text; you can pick card types and the target deck and chapter. Markji cards only, not Markji vocabulary. For OCR or document conversion, use Material to text.'
        }
      },
      {
        id: 'memo-mineruocr',
        title: 'Memo-MinerUOCR',
        titleEn: 'Memo-MinerUOCR',
        alias: 'memo-mineruocr',
        use: {
          zh: '把 PDF、扫描件和图片里的文字识别成 Markdown。',
          en: 'Turn PDFs, scans and photos into Markdown text.'
        },
        prep: {
          zh: '一份 PDF、扫描件或图片，整本书也行。',
          en: 'A PDF, scan or image — a whole book is fine.'
        },
        example: {
          zh: '把这份扫描讲义转成 Markdown，公式和表格原样保留。',
          en: 'Turn this scanned handout into Markdown and keep formulas and tables as they are.'
        },
        delivery: {
          zh: '交付 Markdown 全文和图片引用，按原顺序合并。',
          en: 'Markdown text with image references, merged in order.'
        },
        detail: {
          zh: '大文件会按页数和大小自动拆开，中断可以续跑。只做识别和文档转换，不拆卡、不写牌组。',
          en: 'Large files are split by page count and size; an interrupted run can continue. Recognition and conversion only — no card design, no deck writes.'
        },
        note: {
          zh: '云端识别要先在本机配好 MinerU Token。',
          en: 'Cloud recognition needs your MinerU token configured first.'
        }
      },
      {
        id: 'memo-canvas',
        title: '墨兰迪',
        titleEn: 'Memo-Canvas',
        alias: 'Memo-Canvas',
        use: {
          zh: '把表格、公式和图做成能放进卡片的图片。',
          en: 'Turn tables, formulas and diagrams into images you can put on a card.'
        },
        prep: {
          zh: '表格、公式或流程图的截图或内容。',
          en: 'A screenshot or the content of the table, formula or flowchart.'
        },
        example: {
          zh: '把这张表做成一张干净的表格图。',
          en: 'Turn this table into one clean table image.'
        },
        delivery: {
          zh: '交付 PNG 或 LaTeX array，可以直接贴进卡片。',
          en: 'A PNG or LaTeX array you can paste straight onto a card.'
        },
        detail: {
          zh: '扫描图可以按原样高清化，也可以忠实重绘。不负责牌组、上传和 TXT 容器。',
          en: 'Scans can be sharpened as-is or faithfully redrawn. Decks, uploads and TXT files are handled elsewhere.'
        }
      },
      {
        id: 'memo-ankigo',
        title: '迁墨',
        titleEn: 'Memo-AnkiGo',
        alias: 'Memo-AnkiGo',
        use: {
          zh: '把 Anki 的图片挖空卡迁成墨墨的图片遮罩卡。',
          en: 'Move Anki image-occlusion cards into Markji as native image masks.'
        },
        prep: {
          zh: '本机 Anki 里的牌组；卡片用 Image / Masks / Mode 字段。',
          en: 'A deck in your local Anki, with cards using Image / Masks / Mode fields.'
        },
        example: {
          zh: '把这个牌组的挖空卡迁到墨墨，先给我看位置预览。',
          en: 'Move the occlusion cards in this deck to Markji, and show me the position preview first.'
        },
        delivery: {
          zh: '先生成遮罩和位置预览，再通过 API 导入指定牌组。',
          en: 'Masks and a position preview first, then import into the target deck through the API.'
        },
        detail: {
          zh: '实测支持 26 讲义模板；不承诺支持所有 Image Occlusion 插件，也不迁移学习进度。同组多个矩形会按原顺序拆成独立遮罩。',
          en: 'Tested on the 26-handout template; other Image Occlusion variants and study progress are not covered. Several rectangles in one group become separate masks in order.'
        },
        note: {
          zh: '需要本机 Anki 正在运行。',
          en: 'Requires Anki running on this machine.'
        }
      },
      {
        id: 'memo-cardlink',
        title: '卡跳跳',
        titleEn: 'Memo-CardLink',
        alias: 'Memo-CardLink',
        use: {
          zh: '给已有卡片加上能互相跳转的链接。',
          en: 'Add links so existing cards can jump to each other.'
        },
        prep: {
          zh: '要互链的卡片、目录卡或章节。',
          en: 'The cards, directory card or chapter you want linked.'
        },
        example: {
          zh: '给这张目录卡和这三张卡加双向链接。',
          en: 'Link this directory card and these three cards both ways.'
        },
        delivery: {
          zh: '通过官方 API 写回链接，写完再核验一遍。',
          en: 'Links written back through the official API, then checked again.'
        },
        detail: {
          zh: '只处理链接，不新建卡片正文，也不移动卡片。',
          en: 'Links only — it does not write card content or move cards.'
        }
      },
      {
        id: 'memo-txt',
        title: '墨记文档导入',
        titleEn: 'Memo-TXT',
        alias: 'Memo-TXT',
        use: {
          zh: '把卡片内容整理成墨墨能直接导入的 TXT。',
          en: 'Turn card content into a TXT that Markji can import directly.'
        },
        prep: {
          zh: '卡片内容，或者一份格式不对的 TXT。',
          en: 'Your card content, or an existing TXT that is formatted wrong.'
        },
        example: {
          zh: '把这些卡片整理成一个能导入的 TXT，牌组名写「教育学原理」。',
          en: 'Pack these cards into one importable TXT under the deck name "Principles of Education".'
        },
        delivery: {
          zh: '交付带牌组信息、### 章节和 === 分卡的 TXT。',
          en: 'A TXT with deck info, ### chapters and === card splits.'
        },
        detail: {
          zh: '也可以先导入、再用 --- 答案线校对；图片可以导入后回填。知识拆解和题型设计不在这里，导入也要你在客户端自己点。',
          en: 'You can also import first and check against the --- answer line; images can be filled in afterwards. Knowledge breakdown and card-type design are not part of this, and the import is clicked by you in the client.'
        }
      },
      {
        id: 'memo-qahelper',
        title: 'Memo-QAhelper',
        titleEn: 'Memo-QAhelper',
        alias: 'memo-qahelper',
        use: {
          zh: '回答墨墨记忆卡本身怎么用。',
          en: 'Answer how Markji itself works.'
        },
        prep: {
          zh: '一个具体的使用问题。',
          en: 'One concrete usage question.'
        },
        example: {
          zh: '墨墨的 TXT 导入在哪，怎么选牌组？',
          en: 'Where is TXT import in Markji, and how do I pick the deck?'
        },
        delivery: {
          zh: '只给查到的答案，来源是墨墨百科、墨记论坛和本机技能说明。',
          en: 'Answers come only from the Markji docs, the Markji forum and the local skill notes.'
        },
        detail: {
          zh: '都查不到会让你发邮件给 support@markji.com。不负责制卡内容和 OCR。',
          en: 'If nothing turns up, it points you to support@markji.com. Not for card content or OCR.'
        }
      },
      {
        id: 'memo-cardest-delete',
        skillId: 'memo-cardest',
        title: '批量删除',
        titleEn: 'Bulk delete',
        alias: '墨卡大师 · DELETE 章节',
        use: {
          zh: '按清单批量删掉墨墨卡片。',
          en: 'Delete Markji cards in bulk from a list.'
        },
        prep: {
          zh: '要删的牌组章节，或者一份卡片清单。',
          en: 'The deck chapter to clear, or a list of cards.'
        },
        example: {
          zh: '把「教育学原理」第 2 章这批卡删掉，先给我 DELETE 清单核对。',
          en: 'Delete the cards in chapter 2 of "Principles of Education", and show me the DELETE list first.'
        },
        delivery: {
          zh: '走 DELETE 章节执行，删完回读牌组状态。',
          en: 'Runs through the DELETE section, then reads the deck back.'
        },
        detail: {
          zh: '只走墨卡大师这条链，不碰账户设置。',
          en: 'Stays inside Memo-Cardest; it never touches account settings.'
        },
        warning: {
          zh: '删除不可撤销，请先确认范围。',
          en: 'Deletion is irreversible — confirm the scope first.'
        }
      }
    ];

    /* ════════════════════════════════════════════════════════════════
     * 界面文案（走 Client locale 服务，中英两份）
     * ════════════════════════════════════════════════════════════════ */

    var NS = 'memo-skill-island';
    var STRINGS = {
      zh: {
        'capsule': 'Memo Studio（DSH） · 技能指南',
        'panel.title': 'Memo Studio（DSH）',
        'brand': 'Memo Studio（DSH）',
        'bubble.open': '查看任务状态',
        'bubble.progress': '上传进度 {sent}/{total}',
        "progress.uploaded": "已上传 {n}/{total}",
        "phase.verifying": "核验中",
        "phase.partial": "部分完成 / 待处理",
        "phase.paused": "已暂停",
        "phase.progress_unavailable": "实时进度不可用",
        "progress.counts": "核验通过 {verified} · 待核验 {written} · 失败 {failed} · 不确定 {uncertain} · 跳过 {skipped} · 不一致 {mismatch} · 未发送 {planned}",
        "progress.readback": "{n} 张仅由回读确认，未记录写成功响应",
        "progress.source.registered": "脚本自动登记",
        "progress.source.legacy_journal": "兼容检测 · 清单",
        "progress.source.report_snapshot": "兼容检测 · 报告快照",
        "progress.updated": "最近读取：{time}",
        "progress.snapshot": "仅有历史快照",
        "progress.disconnected": "连接中断 · 显示上次记录",
        "progress.stale": "执行状态未知 · 心跳已过期",
        "progress.read_failed": "进度读取失败 · 显示上次记录",
        "progress.running": "执行器仍在上报",
        "progress.rate_limit": "限流等待",
        "progress.network_wait": "等待网络",
        "progress.complete": "全部核验通过 · 待客户端预览",
        "progress.task": "任务 {n}：{state}",
        "eta.configured": "按配置估算 {t}",
        "eta.lower_bound": "理论至少 {t}",
        "progress.compat": "兼容检测",

        'status.label': 'Memo Studio（DSH）状态',
        'stage.start': '启动',
        'stage.sync': '同步技能',
        'stage.help': '介绍功能',
        'stage.route': '确认交付路线',
        'stage.credentials': '读取凭证',
        'stage.source': '检查材料',
        'stage.ocr': 'OCR 识别',
        'stage.redraw': '图像审查',
        'stage.table': '表格配图',
        'stage.docs': '读接口文档',
        'stage.design': '设计卡片',
        'stage.write': '写卡片',
        'stage.txt': '生成 TXT',
        'stage.finalize': '校验 TXT',
        'stage.upload': '上传卡片',
        'stage.delete': '批量删除',
        'stage.anki': 'Anki 迁移',
        'stage.link': '卡片互链',
        'phase.upload': '上传中 {sent}/{total}',
        'phase.ask': '等你选择',
        'phase.approval': '等你批准',
        'phase.reply': '等你回复',
        'phase.stopped': '已停止',
        'done.txt': 'TXT 已生成 · 待导入',
        'done.api': '已写入 {n} 张 · 待客户端预览',
        'error.verify': '{n} 张回读不一致',
        'error.lint': 'TXT 校验未通过',
        'error.quota': '模型余额不足',
        'error.transport': '连接失败',
        'error.turn': '运行出错',
        'eta': '约 {t}',
        'eta.pending': '估算中',
        'duration.s': '{n} 秒',
        'duration.m': '{n} 分钟',
        'task.title': '当前任务',
        'task.elapsed': '已用 {t}',
        'task.route.txt': 'TXT 导入',
        'task.route.api': 'API 写入',
        'task.step.0': '准备',
        'task.step.1': '材料',
        'task.step.2': '设计',
        'task.step.3': '交付',
        'task.step.4': '完成',
        'task.questions': '共 {n} 个问题',
        'task.tool': '操作：{tool}',
        'task.progress': '已发送 {sent}/{total} · 已回读一致 {verified} · 不一致 {bad}',
        'task.cards': '{cards} 张卡 · {chapters} 章',
        'next.ask': '回到对话里回答这个问题。',
        'next.approval': '回到对话里批准或拒绝这次操作。',
        'next.reply': 'AI 在等你回复，回到对话继续。',
        'next.stopped': '任务被中止了，发一条消息就能继续。',
        'next.txt': '打开墨墨 →「批量制卡」→「从文本导入」，粘贴这份 TXT。',
        'next.api': '到墨墨客户端预览，确认排版没问题。',
        'next.verify': '让 AI 按回读结果修正这几张卡。',
        'next.lint': 'AI 会按校验结果修正 TXT，等它重新校验。',
        'next.quota': '模型余额不足，充值后发消息继续。',
        'next.transport': '网络连接失败，发一条消息重试。',
        'next.turn': '这一轮出错了，发一条消息重试。',
        'tasks.label': '按任务浏览',
        'upload.verified': '核验通过',
        'upload.planned': '待上传',
        'upload.written': '待核验',
        'upload.failed': '失败',
        'upload.uncertain': '不确定',
        'upload.mismatch': '不一致',
        'upload.skipped': '跳过',
        'upload.state.disconnected': '连接中断 · 显示上次记录',
        'upload.state.readFailed': '进度读取失败 · 显示上次记录',
        'upload.state.stale': '执行状态未知 · 心跳已过期',
        'upload.state.rateLimited': '限流等待',
        'upload.state.networkWait': '等待网络',
        'upload.state.paused': '已暂停',
        'upload.state.waitingUser': '等你在对话里回复',
        'upload.state.allVerified': '全部核验通过',
        'upload.state.uploading': '正在上传',
        'upload.state.verifying': '核验中',
        'upload.state.scriptOnline': '上传脚本在线',
        'upload.state.idle': '暂无进展',
        'upload.previewNote': '客户端预览另计',
        'upload.justNow': '刚刚读取',
        'upload.secondsAgo': '{n} 秒前读取',
        'upload.minutesAgo': '{n} 分钟前读取',
        'upload.hoursAgo': '{n} 小时前读取',
        'upload.daysAgo': '{n} 天前读取',
        'upload.details': '查看详情',
        'upload.detailsHide': '收起详情',
        'upload.exc.uncertain': '{n} 张结果不确定，等待核查',
        'upload.exc.failed': '{n} 张写入失败',
        'upload.exc.mismatch': '{n} 张回读不一致',
        'upload.exc.skipped': '{n} 张被跳过（目标未完成）',
        'upload.row.source': '进度来源',
        'upload.row.readAt': '上次成功读取',
        'upload.row.lastProgress': '最后进展',
        'upload.row.heartbeat': '心跳',
        'upload.row.lifecycle': '执行状态',
        'upload.row.conflict': '记录冲突',
        'upload.row.readback': '仅回读确认',
        'upload.yes': '是',
        'update.short': '更新',
        'update.check': '检查更新',
        'update.title': '更新',
        'update.current': '当前',
        'update.latest': '最新',
        'update.available': '有新版本可用',
        'update.later': '稍后',
        'update.open': '打开发布页',
        'update.download': '下载安装包',
        'update.checking': '正在检查…',
        'update.failed': '检查失败，请稍后重试',
        'update.uptodate': '已是最新版本',
        'update.unconfigured': '尚未配置发布仓库',
        'update.no_release': '仓库里没有正式版本',
        'update.no_asset': '新版本没有提供可用的安装包',
        'update.rate_limited': 'GitHub 限流，稍后再试',
        'update.offline': '网络不可用',
        'update.timeout': '请求超时',
        'update.bad_response': '发布信息异常',
        'update.dev': '本地开发安装（link）：这里只提示版本，不会覆盖源码。',
        'update.install': '拿到安装包后用 plugin_manager 安装；开发安装请手动合并改动。',
        'run.active': '本轮已启用 · 回复结束后停止',
        'run.paused': '本轮已启用 · 等待你的回复',
        'run.unknown': '本轮已启用 · 连接中断，状态未知',
        'profile.name': '你的名字',
        'profile.upload': '上传头像',
        'profile.rename': '改变名字',
        'profile.site': '进入官网',
        'theme.system': '显示模式：跟随系统',
        'theme.light': '显示模式：浅色',
        'theme.dark': '显示模式：深色',
        'theme.next': '点击切换为：',
        'profile.avatar': '点一下选本地图片，只存在这台机器上；双击头像可清除',
        'detail.provide': '准备什么',
        'detail.more': '更多说明',
        'detail.example': '试着这样说',
        'copy': '复制示例',
        'copied': '已复制',
        'copyFailed': '复制失败，请手动选中',
      },
      en: {
        'capsule': 'Markji Master · Skill guide',
        'panel.title': 'Memo Studio（DSH）',
        'brand': 'Markji Master',
        'bubble.open': 'Show task status',
        'bubble.progress': 'Upload progress {sent}/{total}',
        "progress.uploaded": "Uploaded {n}/{total}",
        "phase.verifying": "Verifying",
        "phase.partial": "Partial / needs attention",
        "phase.paused": "Paused",
        "phase.progress_unavailable": "Live progress unavailable",
        "progress.counts": "Verified {verified} · pending verification {written} · failed {failed} · uncertain {uncertain} · skipped {skipped} · mismatched {mismatch} · planned {planned}",
        "progress.readback": "{n} confirmed by readback only, no write receipt",
        "progress.source.registered": "Registered by uploader",
        "progress.source.legacy_journal": "Compatibility · journal",
        "progress.source.report_snapshot": "Compatibility · report snapshot",
        "progress.updated": "Last read: {time}",
        "progress.snapshot": "Historical snapshot only",
        "progress.disconnected": "Disconnected · last known state",
        "progress.stale": "Execution unknown · heartbeat stale",
        "progress.read_failed": "Read failed · last known state",
        "progress.running": "Executor reporting",
        "progress.rate_limit": "Rate-limit wait",
        "progress.network_wait": "Waiting for network",
        "progress.complete": "All verified · preview in app",
        "progress.task": "Task {n}: {state}",
        "eta.configured": "Configured estimate {t}",
        "eta.lower_bound": "At least {t} (theoretical)",
        "progress.compat": "Compatibility",

        'status.label': 'Markji Master status',
        'stage.start': 'Starting',
        'stage.sync': 'Syncing skills',
        'stage.help': 'Explaining features',
        'stage.route': 'Choosing delivery',
        'stage.credentials': 'Reading credentials',
        'stage.source': 'Checking source',
        'stage.ocr': 'Running OCR',
        'stage.redraw': 'Reviewing images',
        'stage.table': 'Table images',
        'stage.docs': 'Reading API docs',
        'stage.design': 'Designing cards',
        'stage.write': 'Writing cards',
        'stage.txt': 'Building TXT',
        'stage.finalize': 'Checking TXT',
        'stage.upload': 'Uploading cards',
        'stage.delete': 'Batch delete',
        'stage.anki': 'Anki migration',
        'stage.link': 'Card links',
        'phase.upload': 'Uploading {sent}/{total}',
        'phase.ask': 'Your choice',
        'phase.approval': 'Needs approval',
        'phase.reply': 'Waiting for you',
        'phase.stopped': 'Stopped',
        'done.txt': 'TXT ready · import it',
        'done.api': '{n} cards written · preview in app',
        'error.verify': '{n} cards differ on read-back',
        'error.lint': 'TXT check failed',
        'error.quota': 'Model balance too low',
        'error.transport': 'Connection failed',
        'error.turn': 'Run failed',
        'eta': '~{t}',
        'eta.pending': 'estimating',
        'duration.s': '{n}s',
        'duration.m': '{n} min',
        'task.title': 'Current task',
        'task.elapsed': '{t} elapsed',
        'task.route.txt': 'TXT import',
        'task.route.api': 'API write',
        'task.step.0': 'Prepare',
        'task.step.1': 'Source',
        'task.step.2': 'Design',
        'task.step.3': 'Deliver',
        'task.step.4': 'Done',
        'task.questions': '{n} questions',
        'task.tool': 'Action: {tool}',
        'task.progress': 'Sent {sent}/{total} · verified {verified} · differ {bad}',
        'task.cards': '{cards} cards · {chapters} chapters',
        'next.ask': 'Answer the question in the chat.',
        'next.approval': 'Approve or deny the action in the chat.',
        'next.reply': 'The AI is waiting for your reply in the chat.',
        'next.stopped': 'The run was stopped; send a message to continue.',
        'next.txt': 'In Markji: Batch create → Import from text, then paste this TXT.',
        'next.api': 'Preview the cards in the Markji app.',
        'next.verify': 'Ask the AI to fix these cards from the read-back.',
        'next.lint': 'The AI will fix the TXT and check it again.',
        'next.quota': 'Top up the model balance, then send a message.',
        'next.transport': 'The connection failed; send a message to retry.',
        'next.turn': 'This turn failed; send a message to retry.',
        'tasks.label': 'Browse by task',
        'upload.verified': 'Verified',
        'upload.planned': 'To send',
        'upload.written': 'To verify',
        'upload.failed': 'Failed',
        'upload.uncertain': 'Uncertain',
        'upload.mismatch': 'Mismatched',
        'upload.skipped': 'Skipped',
        'upload.state.disconnected': 'Disconnected · showing last record',
        'upload.state.readFailed': 'Progress read failed · showing last record',
        'upload.state.stale': 'Execution unknown · heartbeat expired',
        'upload.state.rateLimited': 'Rate-limit wait',
        'upload.state.networkWait': 'Waiting for network',
        'upload.state.paused': 'Paused',
        'upload.state.waitingUser': 'Waiting for your reply',
        'upload.state.allVerified': 'All verified',
        'upload.state.uploading': 'Uploading',
        'upload.state.verifying': 'Verifying',
        'upload.state.scriptOnline': 'Upload script online',
        'upload.state.idle': 'No recent progress',
        'upload.previewNote': 'client preview not counted',
        'upload.justNow': 'read just now',
        'upload.secondsAgo': 'read {n}s ago',
        'upload.minutesAgo': 'read {n}m ago',
        'upload.hoursAgo': 'read {n}h ago',
        'upload.daysAgo': 'read {n}d ago',
        'upload.details': 'Show details',
        'upload.detailsHide': 'Hide details',
        'upload.exc.uncertain': '{n} uncertain, waiting for review',
        'upload.exc.failed': '{n} failed to write',
        'upload.exc.mismatch': '{n} differ on read-back',
        'upload.exc.skipped': '{n} skipped (goal not met)',
        'upload.row.source': 'Source',
        'upload.row.readAt': 'Last successful read',
        'upload.row.lastProgress': 'Last progress',
        'upload.row.heartbeat': 'Heartbeat',
        'upload.row.lifecycle': 'Execution state',
        'upload.row.conflict': 'Record conflict',
        'upload.row.readback': 'Read-back only',
        'upload.yes': 'yes',
        'update.short': 'Update',
        'update.check': 'Check for updates',
        'update.title': 'Update',
        'update.current': 'Current',
        'update.latest': 'Latest',
        'update.available': 'A new version is available',
        'update.later': 'Later',
        'update.open': 'Open release page',
        'update.download': 'Download package',
        'update.checking': 'Checking…',
        'update.failed': 'Check failed, try again later',
        'update.uptodate': 'You are up to date',
        'update.unconfigured': 'Release repository is not configured',
        'update.no_release': 'No stable release found',
        'update.no_asset': 'The new release has no usable package',
        'update.rate_limited': 'GitHub rate limit reached',
        'update.offline': 'Network unavailable',
        'update.timeout': 'Request timed out',
        'update.bad_response': 'Unexpected release response',
        'update.dev': 'Local link install: this only reports versions and never overwrites the source.',
        'update.install': 'Install the package with plugin_manager; for a link install merge the changes yourself.',
        'run.active': 'Active this turn · stops when the reply ends',
        'run.paused': 'Active this turn · waiting for your reply',
        'run.unknown': 'Active this turn · connection lost, state unknown',
        'profile.name': 'Your name',
        'profile.upload': 'Upload avatar',
        'profile.rename': 'Change name',
        'profile.site': 'Open website',
        'theme.system': 'Appearance: System',
        'theme.light': 'Appearance: Light',
        'theme.dark': 'Appearance: Dark',
        'theme.next': 'Switch to: ',
        'profile.avatar': 'Click to pick a local image stored on this machine only; double-click to clear',
        'detail.provide': 'What to prepare',
        'detail.more': 'More details',
        'detail.example': 'Try saying',
        'copy': 'Copy example',
        'copied': 'Copied',
        'copyFailed': 'Copy failed — select it manually',
      }
    };

    /* ─── 间距 ───
     * 胶囊 ↔ 面板用同一个呼吸值；纵向按窗口高度的比例落位。
     * 纵向不跟会话标题栏走：标题栏高度会变（标签行时高时低），跟着它位置会跳。
     */
    var ISLAND_GAP = 6;
    /** 纵向：窗口高度的 11.5%（176 / 1527，就是你框的那个高度），并夹在 120–260 之间。
     *  窗口变高变矮时按比例走，又不至于在小窗口钻进标题栏、在大窗口掉进内容里。 */
    var ISLAND_TOP_RATIO = 0.115;
    /** 整体上下平移的微调（px），正数往下。 */
    var ISLAND_TOP_SHIFT = 4;
    var ISLAND_TOP_MIN = 120;
    var ISLAND_TOP_MAX = 260;

    /** 本地个人展示块：只存在这台机器上（localStorage），不发给任何地方。 */
    var PROFILE_KEY = 'memo-skill-island:profile';
    /** 官网入口：带分享码，点开在新标签页，不在插件里加载任何东西。 */
    var SITE_URL = 'https://moka-master.app.workbuddy.host/?sharecode=ZYHGDS4GEB';

    function readStoredProfile() {
      try {
        var raw = window.localStorage.getItem(PROFILE_KEY);
        if (!raw) return { name: '', avatar: '' };
        var parsed = JSON.parse(raw);
        return {
          name: typeof parsed.name === 'string' ? parsed.name : '',
          avatar: typeof parsed.avatar === 'string' ? parsed.avatar : ''
        };
      } catch (error) {
        return { name: '', avatar: '' };
      }
    }

    function storeProfile(value) {
      try {
        window.localStorage.setItem(
          PROFILE_KEY,
          JSON.stringify({ name: value.name, avatar: value.avatar })
        );
      } catch (error) {
        /* 存储被禁用就只在本次生效 */
      }
    }

    /** 菜单项前面的线性图标：只画 stroke，颜色跟文字走。 */
    function menuIcon(paths) {
      return h('svg', { className: 'msi-profile__icon', viewBox: '0 0 24 24', 'aria-hidden': 'true' },
        paths.map(function (d, index) {
          return h('path', { key: index, d: d });
        })
      );
    }

    var ICON_UPLOAD = ['M12 16V4', 'M7 9l5-5 5 5', 'M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2'];
    var ICON_EDIT = ['M4 20h4l10-10a2.5 2.5 0 0 0-3.5-3.5L4 16v4z'];
    var ICON_LINK = ['M14 4h6v6', 'M20 4l-9 9', 'M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4'];
    var ICON_REFRESH = ['M20 12a8 8 0 1 1-2.3-5.6', 'M20 4v4h-4'];

    /* 左侧任务行的小图标：24 视框、1.6 描边、不填充，颜色跟 currentColor 走。
       全部用手写 path，不引外部图标库。 */
    var TASK_ICONS = {
      handout: [
        'M9 3.5h8.5A1.5 1.5 0 0 1 19 5v7.5',
        'M4.5 7.5h9A1.5 1.5 0 0 1 15 9v10.5A1.5 1.5 0 0 1 13.5 21h-9A1.5 1.5 0 0 1 3 19.5V9a1.5 1.5 0 0 1 1.5-1.5z'
      ],
      scan: ['M6.5 17.5L12 5l5.5 12.5', 'M8.8 13.4h6.4'],
      table: ['M4 5.5h16v13H4z', 'M4 15.5l4.5-4.5 4.5 4.5 3-3 4 4'],
      anki: ['M12 4v10', 'M8 10.5l4 4 4-4', 'M5 19h14'],
      links: [
        'M9.5 14.5l5-5',
        'M8 11.5l-2 2a3.5 3.5 0 0 0 5 5l2-2',
        'M16 12.5l2-2a3.5 3.5 0 0 0-5-5l-2 2'
      ],
      txt: ['M6.5 3.5h7l4 4v13h-11z', 'M13.5 3.5v4h4', 'M9 12.5h6', 'M9 16.5h6'],
      help: [
        'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
        'M9.6 9.4a2.4 2.4 0 1 1 3.3 2.2c-.6.3-.9.8-.9 1.4v.4',
        'M12 16.8h.01'
      ],
      delete: ['M4.5 7.5h15', 'M9.5 7.5v-2h5v2', 'M6.5 7.5l1 12h9l1-12']
    };

    function taskIcon(taskId) {
      var paths = TASK_ICONS[taskId] || ['M12 12h.01'];
      return h('svg', { className: 'msi-task__icon', viewBox: '0 0 24 24', 'aria-hidden': 'true' },
        paths.map(function (d, index) {
          return h('path', { key: index, d: d });
        })
      );
    }


    function initialOf(name) {
      var trimmed = String(name || '').trim();
      return trimmed ? trimmed.slice(0, 1).toUpperCase() : '·';
    }
    /* ════════════════════════════════════════════════════════════════
     * 样式（固定深色皮肤：色值全部来自 .msi-root 上的 --msi-* 变量）
     * ════════════════════════════════════════════════════════════════ */

    var STYLE = `
.msi-root {
  /* 固定深色皮肤：不跟随宿主主题，收起更暗、展开稍亮 */
  /* 灰阶皮肤：16 个色值全部来自这张表，改色只动这一块 */
  --msi-base: #151517;
  --msi-bar: #1b1b1c;
  --msi-panel: #212123;
  --msi-code: #292929;
  --msi-selected: #2d2d2e;
  --msi-button: #353638;
  --msi-line: #3b3b3c;
  --msi-line-2: #545557;
  --msi-scroll: #68686b;
  --msi-icon: #89898b;
  --msi-muted: #a0a1a3;
  --msi-soft: #bebebf;
  --msi-icon-light: #d3d4d6;
  --msi-body: #EDEEEF;
  --msi-title: #f9fafb;
  --msi-accent: #84a9f9;
  /* 指示灯：蓝 空闲 / 绿 进行中、完成 / 黄 等你 / 红 出错。都压低了饱和度，和灰阶皮肤一致 */
  --msi-green: #6cc58f;
  --msi-yellow: #e8b55a;
  --msi-red: #f07b72;
  --msi-light: var(--msi-accent);

  position: fixed;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 40;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${ISLAND_GAP}px;
  pointer-events: none;
  color: var(--msi-body);
  color-scheme: dark;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.5;
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.msi-root {
  color-scheme: dark;
  --msi-shimmer: #ffffff;
  --msi-task-hover: rgba(255, 255, 255, .045);
  --msi-task-selected: rgba(255, 255, 255, .075);
}
.msi-root[data-theme="light"] {
  color-scheme: light;
  --msi-capsule-bg: #FFFFFF;
  --msi-capsule-open-bg: #FFFFFF;
  --msi-base: #FFFFFF;
  --msi-bar: #F9FAFB;
  --msi-panel: #FAFAFC;
  --msi-code: #ECECF0;
  --msi-selected: #E2E4E9;
  --msi-task-hover: #EAECEF;
  --msi-task-selected: #ECEEF0;
  --msi-button: #E7E9EE;
  --msi-line: #D7D9E0;
  --msi-line-2: #B4B8C3;
  --msi-scroll: #949AA7;
  --msi-icon: #626977;
  --msi-muted: #626977;
  --msi-soft: #535A67;
  --msi-icon-light: #343B47;
  --msi-body: #282D36;
  --msi-title: #171B22;
  --msi-accent: #325DB5;
  --msi-green: #5EC269;
  --msi-yellow: #C58B32;
  --msi-red: #B63730;
  --msi-shimmer: #A1AEC2;
}
.msi-root[data-theme="light"] .msi-tasks__group--aux { border-top-color: var(--msi-line); }
.msi-root > button.msi-capsule {
  position: relative;
  z-index: 1;
  transform: translateX(var(--msi-nudge, 0px));
  /* Own the button geometry: host button defaults must not turn the stadium into a squircle. */
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  pointer-events: auto;
  display: inline-flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  gap: 7px;
  width: max-content;
  min-width: 0;
  max-width: calc(100vw - 32px);
  height: 32px;
  min-height: 32px;
  max-height: 32px;
  margin: 0;
  padding: 0 14px;
  border: 1px solid var(--msi-line);
  /* H / 2 gives two circular ends, NOT four independent small corners.
   * Reset corner-shape too: inherited superellipse/squircle changes the outline even at H / 2. */
  border-radius: 16px !important;
  corner-shape: round !important;
  /* 收起时用顶栏色（更暗），展开后换成面板色，看起来是同一块 */
  background: var(--msi-capsule-bg, var(--msi-bar));
  color: var(--msi-body);
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, .3);
  transition: border-color .16s ease, background-color .16s ease, box-shadow .16s ease;
}
/* Optical offsets only: relative positioning preserves measured capsule width,
 * flex gaps and the background spring. Keep arrow rotation independent. */
.msi-capsule--optical .msi-capsule__dot,
.msi-capsule--optical .msi-capsule__text {
  position: relative;
  left: -15px;
}
.msi-capsule--optical .msi-capsule__meta,
.msi-capsule--optical .msi-capsule__chev {
  position: relative;
  left: 21px;
}
.msi-capsule__text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 扫光：只在「正在跑」（进行中、上传中，即慢呼吸的状态）时出现。
 * 底色压到辅助文字色（--msi-soft #BEBEBF），一道白色亮带从左往右扫过（background-clip: text），
 * 2.4 秒一次、中间停一小段，不连续刷屏。底色必须比亮带暗：正文色 #EDEEEF 和白色几乎没有反差，扫光会看不见。
 * 等你 / 完成 / 出错时文字静止、回到正文色。 */
.msi-root[data-pulse="slow"] .msi-capsule__text {
  color: transparent;
  background-image: linear-gradient(100deg,
    var(--msi-soft) 0%, var(--msi-soft) 38%,
    var(--msi-shimmer) 50%,
    var(--msi-soft) 62%, var(--msi-soft) 100%);
  background-size: 250% 100%;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  animation: msi-shimmer 2.4s cubic-bezier(.4, 0, .2, 1) infinite;
}
@keyframes msi-shimmer {
  0% { background-position: 100% 0; }
  70%, 100% { background-position: 0% 0; }
}
.msi-root > button.msi-capsule::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(var(--msi-stretch, 0px) * -.5);
  right: calc(var(--msi-stretch, 0px) * -.5);
  border-radius: 16px;
}
.msi-root > button.msi-capsule:hover { border-color: var(--msi-line-2); background: var(--msi-capsule-open-bg, var(--msi-panel)); }
.msi-capsule:hover .msi-capsule__chev { color: var(--msi-icon-light); }
.msi-capsule:focus-visible { outline: 2px solid var(--msi-accent); outline-offset: 2px; }
/* 收起时更暗；展开后跟面板同色，看起来是同一块 */
.msi-root > button.msi-capsule[aria-expanded="true"] { background: var(--msi-capsule-open-bg, var(--msi-panel)); border-color: var(--msi-line-2); }
.msi-root[data-light="green"] { --msi-light: var(--msi-green); }
.msi-root[data-light="yellow"] { --msi-light: var(--msi-yellow); }
.msi-root[data-light="red"] { --msi-light: var(--msi-red); }
.msi-capsule__dot {
  width: 6px; height: 6px; border-radius: 999px;
  background: var(--msi-light);
  flex: 0 0 auto;
  transition: background-color .3s ease;
}
/* 呼吸：进行中 2 秒一次，等你操作 1 秒一次；常亮的状态不动 */
.msi-root[data-pulse="slow"] .msi-capsule__dot { animation: msi-breathe 2s ease-in-out infinite; }
.msi-root[data-pulse="fast"] .msi-capsule__dot { animation: msi-breathe 1s ease-in-out infinite; }
@keyframes msi-breathe {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 color-mix(in srgb, var(--msi-light) 60%, transparent); }
  50% { opacity: .45; box-shadow: 0 0 6px 2px color-mix(in srgb, var(--msi-light) 30%, transparent); }
}
.msi-capsule__meta {
  flex: 0 0 auto;
  color: var(--msi-muted);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.msi-elapsed { display: inline-flex; align-items: center; vertical-align: middle; line-height: normal; }
.msi-elapsed > span { display: inline-flex; align-items: center; }
.msi-upload-digits {
  display: inline-flex;
  align-items: center;
  color: var(--msi-body);
  font-variant-numeric: tabular-nums;
  vertical-align: middle;
}

/* 上传进度：胶囊底边内侧一条细线，颜色跟灯 */
.msi-capsule__bar {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 4px;
  height: 2px;
  border-radius: 1px;
  background: var(--msi-line);
  overflow: hidden;
  pointer-events: none;
}
.msi-capsule__fill {
  display: block;
  height: 100%;
  border-radius: 1px;
  background: var(--msi-light);
  transition: width .4s ease, background-color .3s ease;
}
.msi-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
.msi-capsule__chev {
  flex: 0 0 auto;
  font-size: 10px; line-height: 1;
  color: var(--msi-icon);
  transition: transform .18s ease;
}
.msi-capsule__chev.is-open { transform: rotate(180deg); }

/* Only the two background shapes pass through the goo filter; text stays crisp. */
.msi-root[data-morph="true"] > button.msi-capsule,
.msi-root[data-morph="true"] > button.msi-capsule:hover,
.msi-root[data-morph="true"] > button.msi-capsule[aria-expanded="true"] {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
}
.msi-morph {
  position: absolute;
  top: -8px;
  height: 48px;
  /* 压在面板之上：面板从胶囊背后长出来，而不是盖住胶囊 */
  z-index: 1;
  overflow: visible;
  pointer-events: none;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, .30));
}
.msi-root[data-theme="light"] .msi-morph {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, .12));
}
.msi-root[data-theme="light"]:not([data-morph="true"]) > button.msi-capsule {
  box-shadow: 0 2px 8px rgba(0, 0, 0, .12);
}
.msi-root > button.msi-badge {
  appearance: none;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  z-index: 2;
  width: 32px;
  min-width: 32px;
  max-width: 32px;
  height: 32px;
  min-height: 32px;
  max-height: 32px;
  padding: 0;
  margin: 0;
  border: 0;
  border-radius: 16px !important;
  corner-shape: round !important;
  background: transparent;
  box-shadow: none;
  color: var(--msi-light);
  font: 700 18px/32px system-ui, sans-serif;
  text-align: center;
  cursor: pointer;
}
.msi-badge:focus-visible { outline: 2px solid var(--msi-accent); outline-offset: 2px; }
.msi-ring { display: block; margin: 6px; overflow: visible; }
.msi-ring__track { fill: none; stroke: var(--msi-line-2); stroke-width: 2.5; }
.msi-ring__arc {
  fill: none;
  stroke: var(--msi-light);
  stroke-width: 2.5;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 10px 10px;
  transition: stroke-dashoffset .5s cubic-bezier(.4, 0, .2, 1), stroke .3s ease;
}

/* 当前任务：标题条下方、技能目录上方，和标题条同色 */
.msi-current {
  flex: 0 0 auto;
  padding: 2px 16px 12px;
  background: var(--msi-bar);
  border-bottom: 0;
}
.msi-current__row { display: flex; align-items: center; gap: 8px; min-width: 0; }
.msi-current__dot {
  width: 8px; height: 8px; border-radius: 999px;
  background: var(--msi-light);
  flex: 0 0 auto;
}
.msi-root[data-pulse="slow"] .msi-current__dot { animation: msi-breathe 2s ease-in-out infinite; }
.msi-root[data-pulse="fast"] .msi-current__dot { animation: msi-breathe 1s ease-in-out infinite; }
.msi-current__status {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 400;
  color: var(--msi-title);
}
.msi-current__meta {
  margin-left: auto;
  flex: 0 0 auto;
  font-size: 11px;
  color: var(--msi-muted);
  font-variant-numeric: tabular-nums;
}
.msi-steps {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 6px;
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
}
.msi-step { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.msi-step__mark { height: 3px; border-radius: 2px; background: var(--msi-line); transition: background-color .3s ease; }
.msi-step[data-state="done"] .msi-step__mark { background: var(--msi-line-2); }
.msi-step[data-state="current"] .msi-step__mark { background: var(--msi-light); }
/* 完成时五段全部亮成灯色（绿），和「还没开始」的灰区分开 */
.msi-root[data-phase="done"] .msi-step__mark { background: var(--msi-light); }
.msi-step__label { font-size: 11px; color: var(--msi-icon); }
.msi-step[data-state="current"] .msi-step__label { color: var(--msi-body); font-weight: 500; }
.msi-current__detail { margin-top: 10px; }
.msi-upload { margin-top: 12px; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px 18px; }
.msi-upload__counts { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 20px; }
.msi-upload__count { display: inline-flex; align-items: baseline; gap: 7px; }
.msi-upload__label { font-size: 12px; color: var(--msi-muted); }
.msi-upload__value { font-size: 13px; font-weight: 600; line-height: 1.5; color: var(--msi-body); font-variant-numeric: tabular-nums; }
.msi-upload__state { grid-column: 1 / -1; display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 16px; font-size: 11px; line-height: 1.6; color: var(--msi-muted); }
.msi-upload__read { margin-left: auto; color: var(--msi-icon); font-size: 11px; }
.msi-upload__exc { grid-column: 1 / -1; margin: 0; font-size: 12px; line-height: 1.6; color: var(--msi-body); }
.msi-upload__toggle { grid-column: 2; grid-row: 1; align-self: baseline; display: inline-flex; align-items: center; gap: 5px; margin: 0; padding: 2px 0; border: 0; border-radius: 3px; background: transparent; color: var(--msi-muted); font: inherit; font-size: 11px; line-height: 1.5; white-space: nowrap; cursor: pointer; }
.msi-upload__toggle::after { content: none; }
.msi-upload__chevron { display: block; flex: 0 0 12px; width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.msi-upload__toggle[aria-expanded="true"] .msi-upload__chevron { transform: rotate(180deg); }
.msi-upload__toggle:hover { color: var(--msi-body); }
.msi-upload__toggle:focus-visible { outline: 2px solid var(--msi-accent); outline-offset: 3px; }
.msi-upload__detail { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 28px; margin: 4px 0 0; padding: 10px 0 2px; max-height: 180px; overflow: auto; font-size: 11px; line-height: 1.55; }
.msi-upload__row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); align-items: baseline; gap: 10px; min-width: 0; }
.msi-upload__detail dt { color: var(--msi-muted); }
.msi-upload__detail dd { margin: 0; color: var(--msi-body); overflow-wrap: anywhere; font-variant-numeric: tabular-nums; }
@media (max-width: 620px) {
  .msi-upload { gap: 8px 12px; }
  .msi-upload__counts { gap: 5px 12px; }
  .msi-upload__read { margin-left: 0; }
  .msi-upload__detail { grid-template-columns: minmax(0, 1fr); }
}

.msi-current__detail p {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: var(--msi-soft);
  overflow-wrap: anywhere;
}
.msi-current__next { margin: 6px 0 0; font-size: 12px; color: var(--msi-body); }

/* 外壳：宽、高、圆角、上移量都由 usePanelSpring 每帧写入（见 Island 里的 panelStyle），
 * 对应教程 FaceUnlockState 的 animateDpAsState(spring(StiffnessLow, dampingRatio=.6))。
 * 外壳只负责「长出来」的那块形状，内容层尺寸固定，不随弹簧重排。 */
.msi-panel {
  position: relative;
  box-sizing: border-box;
  flex: 0 0 auto;
  pointer-events: none;
  visibility: hidden;
  transform-origin: top center;
  overflow: hidden;
  border: 1px solid var(--msi-line);
  /* 右侧详情区的底色 */
  background: var(--msi-base);
  box-shadow:
    0 24px 60px rgba(0, 0, 0, .55),
    0 2px 8px rgba(0, 0, 0, .4);
}
.msi-root[data-theme="light"] .msi-panel {
  box-shadow:
    0 12px 32px rgba(0, 0, 0, .14),
    0 2px 6px rgba(0, 0, 0, .08);
}
.msi-panel[data-visible="true"] { visibility: visible; }
.msi-panel[data-open="true"] { pointer-events: auto; }
/* 内容层：固定为面板终态尺寸、顶端居中，被外壳裁切。
 * 入场 = 教程的 fadeIn(tween(300, delay 300))，Compose 默认 FastOutSlowIn 曲线；
 * 收起先快速淡出，再让外壳缩回胶囊。 */
.msi-panel__inner {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: opacity .12s ease;
}
.msi-panel[data-open="true"] > .msi-panel__inner {
  opacity: 1;
  transition: opacity .3s cubic-bezier(.4, 0, .2, 1) .3s;
}
.msi-panel__head {
  flex: 0 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 10px;
  padding: 12px 16px 10px;
  /* 和左侧任务栏同色、不画分隔线：两块连成一片 */
  background: var(--msi-bar);
  /* 自己再声明一次上沿圆角，跟面板外框对齐，不靠父级裁剪 */
  border-top-left-radius: 27px;
  border-top-right-radius: 27px;
}
.msi-panel__title { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 8px; color: var(--msi-title); line-height: 1.2; }
.msi-panel__brand { font-size: 16px; font-weight: 600; letter-spacing: -.45px; }
.msi-panel__studio { display: inline-block; position: relative; top: 1px; padding: 2px 5px 3px; border-radius: 4px; background: var(--msi-title); color: var(--msi-base); font-size: 9px; font-weight: 600; letter-spacing: 1px; line-height: 1; }
.msi-panel__body {
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: 188px minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}
.msi-tasks {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 10px 8px 8px;
  border-right: 1px solid var(--msi-line);
  /* 和标题条同色（岛体上沿），接成一整块 */
  background: var(--msi-bar);
}
.msi-side {
  display: flex;
  flex-direction: column;
  min-height: 0;
  /* 不画右边线：左栏和右侧详情靠底色差区分 */
  background: var(--msi-bar);
}
.msi-side .msi-tasks { border-right: 0; }
.msi-root[data-theme="light"] .msi-side,
.msi-root[data-theme="light"] .msi-side .msi-tasks {
  background: var(--msi-bar);
}

.msi-profile-wrap {
  position: relative;
  flex: 0 0 auto;
}
.msi-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  border: 0;
  background: transparent;
  color: var(--msi-body);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.msi-profile:hover { background: var(--msi-code); }
.msi-profile:focus-visible { outline: 2px solid var(--msi-accent); outline-offset: -2px; }
.msi-profile__avatar {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--msi-line-2);
  border-radius: 50%;
  background: var(--msi-code) center / cover no-repeat;
  color: var(--msi-muted);
  font-size: 12px;
  line-height: 1;
}
.msi-profile__name {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  font-size: 12.5px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.msi-profile__name[data-empty="true"] { color: var(--msi-icon); }
.msi-profile__input {
  flex: 1 1 auto;
  min-width: 0;
  padding: 4px 6px;
  border: 1px solid var(--msi-line-2);
  border-radius: 7px;
  background: var(--msi-code);
  color: var(--msi-body);
  font: inherit;
  font-size: 12.5px;
  outline: none;
}
.msi-profile__menu {
  position: absolute;
  left: 6px;
  right: 6px;
  bottom: calc(100% + 6px);
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px;
  border: 1px solid var(--msi-line);
  border-radius: 10px;
  background: var(--msi-panel);
  box-shadow: 0 12px 28px rgba(0, 0, 0, .45);
  z-index: 3;
}
.msi-profile__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 8px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--msi-body);
  font: inherit;
  font-size: 12.5px;
  text-decoration: none;
  text-align: left;
  cursor: pointer;
}
.msi-profile__item:hover { background: var(--msi-code); }
.msi-profile__icon {
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  color: var(--msi-muted);
}
.msi-profile__file { display: none; }
/* 个人行：头像名字占满，更新按钮固定在右侧，不挤压 */
.msi-profile-wrap { display: flex; align-items: center; gap: 4px; padding-right: 6px; }
.msi-profile { flex: 1 1 auto; width: auto; min-width: 0; }
.msi-profile__update {
  --msi-update-blue: #4176E6;
  box-sizing: border-box;
  display: inline-grid;
  grid-template-columns: 14px max-content;
  align-items: center;
  column-gap: 4px;
  flex: 0 0 auto;
  height: 28px;
  padding: 0 8px;
  border: 1px solid color-mix(in srgb, var(--msi-update-blue) 20%, transparent);
  border-radius: 8px;
  background: color-mix(in srgb, var(--msi-update-blue) 8%, transparent);
  color: var(--msi-update-blue);
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
  cursor: pointer;
}
.msi-root[data-theme="dark"] .msi-profile__update { --msi-update-blue: var(--msi-accent); }
.msi-profile__update:hover { background: color-mix(in srgb, var(--msi-update-blue) 12%, transparent); }
.msi-profile__update-icon { display: block; width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.msi-profile__update:focus-visible { outline: 2px solid var(--msi-accent); outline-offset: 2px; }
.msi-update {
  position: absolute;
  left: 6px;
  right: 6px;
  bottom: calc(100% + 6px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border: 1px solid var(--msi-line);
  border-radius: 10px;
  background: var(--msi-panel);
  box-shadow: 0 12px 28px rgba(0, 0, 0, .45);
  z-index: 4;
  outline: none;
}
.msi-update:focus-visible { outline: 2px solid var(--msi-accent); outline-offset: 2px; }
.msi-update__head { font-size: 12.5px; font-weight: 600; color: var(--msi-title); }
.msi-update__versions {
  font-size: 11px;
  color: var(--msi-muted);
  font-variant-numeric: tabular-nums;
  word-break: break-all;
}
.msi-update__msg { margin: 0; font-size: 12px; color: var(--msi-soft); }
.msi-update__notes {
  margin: 0;
  max-height: 160px;
  overflow: auto;
  padding: 8px;
  border-radius: 8px;
  background: var(--msi-code);
  color: var(--msi-body);
  font: inherit;
  font-size: 11.5px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}
.msi-update__hint { margin: 0; font-size: 11px; color: var(--msi-icon); }
.msi-update__actions { display: flex; justify-content: flex-end; gap: 8px; }
.msi-update__btn {
  padding: 5px 12px;
  border: 1px solid var(--msi-line-2);
  border-radius: 8px;
  background: transparent;
  color: var(--msi-body);
  font: inherit;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
}
.msi-update__btn:hover { background: var(--msi-code); }
.msi-update__btn:focus-visible { outline: 2px solid var(--msi-accent); outline-offset: 1px; }
.msi-update__btn--primary { background: var(--msi-button); }
.msi-update__btn--primary:hover { background: var(--msi-line); }
@media (max-width: 620px) { .msi-update { left: 4px; right: 4px; } }
.msi-tasks__label {
  padding: 0 8px 8px;
  font-size: 11px;
  letter-spacing: .08em;
  color: var(--msi-icon);
}
.msi-tasks__group {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.msi-tasks__group--aux {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, .06);
}
.msi-task {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 32px;
  /* 左右各 8px：给前面的图标让出位置 */
  padding: 0 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--msi-icon-light);
  font: inherit;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: background-color .14s ease, color .14s ease;
}
.msi-task:hover { background: var(--msi-task-hover); color: var(--msi-body); }
.msi-task:focus-visible {
  outline: 2px solid var(--msi-accent);
  outline-offset: -2px;
}
.msi-task[aria-current="true"] {
  background: var(--msi-task-selected);
  color: var(--msi-title);
  font-weight: 500;
}
.msi-task__icon {
  width: 13px;
  height: 13px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: .85;
}
.msi-task[aria-current="true"] .msi-task__icon { opacity: 1; }
.msi-task__name {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 运行圈：固定 12px 槽位，未启用只隐藏不塌陷，文字不会因为圈出现而跳动 */
.msi-task__run {
  display: block;
  flex: 0 0 12px;
  width: 12px;
  height: 12px;
  margin-left: 6px;
  padding: 0;
  border: 0;
  overflow: visible;
  visibility: hidden;
  transform-origin: center;
  animation: msi-run-spin 1s linear infinite;
}
.msi-task__run-track, .msi-task__run-arc {
  fill: none;
  stroke-width: 1.5;
}
.msi-task__run-track { stroke: var(--msi-line-2); opacity: .45; }
.msi-task__run-arc { stroke: var(--msi-muted); stroke-linecap: round; }
.msi-task__run[data-state="running"] { visibility: visible; }
.msi-task__run[data-state="paused"], .msi-task__run[data-state="unknown"] {
  visibility: visible;
  animation: none;
}
.msi-task__run[data-state="unknown"] .msi-task__run-arc { visibility: hidden; }
@keyframes msi-run-spin { to { transform: rotate(360deg); } }
.msi-task[aria-current="true"] .msi-task__name[data-run="true"] {
  background-image: linear-gradient(100deg, var(--msi-body) 40%, var(--msi-shimmer) 50%, var(--msi-body) 60%);
  background-size: 240% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: msi-run-sweep 3s ease-in-out infinite;
}
@keyframes msi-run-sweep {
  0% { background-position: 120% 0; }
  100% { background-position: -120% 0; }
}
.msi-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
@media (prefers-reduced-motion: reduce) {
  .msi-task__run { animation: none; }
  .msi-task[aria-current="true"] .msi-task__name[data-run="true"] {
    animation: none;
    background: none;
    color: inherit;
  }
}
.msi-detail {
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 18px 18px 20px;
}
.msi-detail__title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--msi-title);
}
.msi-detail__use {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.65;
  color: var(--msi-body);
}
.msi-detail__block { margin-top: 16px; }
.msi-detail__label {
  margin-bottom: 4px;
  font-size: 11px;
  letter-spacing: .08em;
  color: var(--msi-icon);
}
.msi-detail__text {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--msi-body);
}
.msi-example { margin-top: 18px; }
.msi-example__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}
.msi-example__label {
  font-size: 11px;
  letter-spacing: .08em;
  color: var(--msi-icon);
}
.msi-example__text {
  margin: 5px 0 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--msi-body);
}
.msi-copy {
  flex: 0 0 auto;
  padding: 2px 8px;
  border: 1px solid var(--msi-line-2);
  border-radius: 6px;
  background: transparent;
  color: var(--msi-muted);
  font: inherit;
  font-size: 11.5px;
  white-space: nowrap;
  cursor: pointer;
  transition: border-color .14s ease, color .14s ease, background-color .14s ease;
}
.msi-copy:hover { background: var(--msi-code); border-color: var(--msi-scroll); color: var(--msi-body); }
.msi-copy:focus-visible { outline: 2px solid var(--msi-accent); outline-offset: 1px; }
.msi-copy[data-state="ok"] {
  border-color: var(--msi-accent);
  color: var(--msi-accent);
}
.msi-copy[data-state="error"] {
  border-color: var(--msi-icon);
  color: var(--msi-soft);
}
.msi-detail__delivery {
  margin: 14px 0 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--msi-muted);
}
.msi-detail__note {
  margin: 6px 0 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--msi-muted);
}
.msi-detail__warning {
  margin: 6px 0 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--msi-soft);
}
.msi-more {
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid var(--msi-line);
}
.msi-more__summary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: var(--msi-icon);
  cursor: pointer;
  list-style: none;
}
.msi-more__summary::-webkit-details-marker { display: none; }
.msi-more__summary::before { content: '▸'; font-size: 9px; line-height: 1; }
.msi-more[open] .msi-more__summary::before { content: '▾'; }
.msi-more__summary:hover { color: var(--msi-body); }
.msi-more__summary:focus-visible {
  outline: 2px solid var(--msi-accent);
  outline-offset: 2px;
  border-radius: 4px;
}
.msi-more__body { margin-top: 10px; }
.msi-more__alias {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  color: var(--msi-icon);
}
.msi-more__text {
  margin: 6px 0 0;
  font-size: 12px;
  line-height: 1.7;
  color: var(--msi-muted);
}
.msi-detail__related {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}
.msi-detail__related-btn {
  padding: 2px 9px;
  border: 1px solid var(--msi-line);
  border-radius: 999px;
  background: transparent;
  color: var(--msi-muted);
  font: inherit;
  font-size: 11.5px;
  cursor: pointer;
  transition: border-color .14s ease, color .14s ease;
}
.msi-detail__related-btn:hover {
  border-color: var(--msi-line-2);
  color: var(--msi-body);
}
.msi-detail__related-btn:focus-visible {
  outline: 2px solid var(--msi-accent);
  outline-offset: 1px;
}

.msi-tasks, .msi-detail {
  scrollbar-width: thin;
  scrollbar-color: var(--msi-line-2) transparent;
}
.msi-tasks::-webkit-scrollbar,
.msi-detail::-webkit-scrollbar { width: 6px; }
.msi-tasks::-webkit-scrollbar-track,
.msi-detail::-webkit-scrollbar-track {
  background: transparent;
  /* 圆角靠 track 的空白撑出来：上下各留 4px，两头不贴边 */
  margin: 4px 0;
}
.msi-tasks::-webkit-scrollbar-thumb,
.msi-detail::-webkit-scrollbar-thumb {
  background: var(--msi-line-2);
  /* 1px 透明边 + content-box：可见部分 4px，两端是真正的圆头 */
  border: 1px solid transparent;
  background-clip: content-box;
  border-radius: 999px;
}
.msi-tasks:hover::-webkit-scrollbar-thumb,
.msi-detail:hover::-webkit-scrollbar-thumb { background: var(--msi-scroll); }
@media (max-width: 620px) {
  .msi-panel__body {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto minmax(0, 1fr);
  }
  .msi-tasks {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2px;
    max-height: 216px;
    border-bottom: 1px solid var(--msi-line);
  }
  .msi-tasks__label { grid-column: 1 / -1; }
  .msi-tasks__group {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2px;
  }
  .msi-tasks__group--aux {
    margin-top: 6px;
    padding-top: 8px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .msi-root .msi-capsule__dot, .msi-root .msi-current__dot { animation: none !important; }
  .msi-ring__arc { transition: none; }
  /* 减少动态效果：不扫光，文字退回普通正文色 */
  .msi-root[data-pulse="slow"] .msi-capsule__text { animation: none; color: var(--msi-body); background-image: none; }
  .msi-capsule__fill, .msi-step__mark { transition: none; }
  .msi-panel__inner, .msi-panel[data-open="true"] > .msi-panel__inner,
  .msi-root > button.msi-capsule, .msi-capsule__chev, .msi-copy, .msi-task { transition: none; }
}
`;

    /* ════════════════════════════════════════════════════════════════
     * 工具函数
     * ════════════════════════════════════════════════════════════════ */

    var SLOT = 'shell.overlay';
    var ENTRY_ID = 'memo-skill-island';
    var ENTRY_ORDER = 10;
    var COPIED_MS = 1800;
    /** 探针挂的位置：聊天下方的输入区（只用来量横向中心）。 */
    var PROBE_COLUMN_SLOT = 'conversation.input.dock';
    var SKILL_BY_ID = {};
    for (var s = 0; s < SKILLS.length; s += 1) SKILL_BY_ID[SKILLS[s].id] = SKILLS[s];

    /**
     * 一条入口本轮的运行状态：none / running / paused / unknown。
     * 只认宿主折叠出的启用集合（成功 tool/result 才进去）+ 入口自己的路线证据；
     * 不看选中、不看详情、不从文案里猜。
     */
    function skillRunState(entry, view, connection) {
      if (!entry || !view) return 'none';
      var skill = SKILL_BY_ID[entry.skill];
      var skillId = skill ? (skill.skillId || skill.id) : entry.skill;
      if (!Array.isArray(view.skills) || view.skills.indexOf(skillId) < 0) return 'none';
      if (entry.routeStage && view.stage !== entry.routeStage) return 'none';
      if (connection === 'disconnected') return 'unknown';
      return view.skillsPaused ? 'paused' : 'running';
    }

    /** 取一条中英双语的静态文字。 */
    function pick(value, lang) {
      if (typeof value === 'string') return value;
      if (!value) return '';
      return value[lang] || value.zh || '';
    }

    /** 写剪贴板：优先 navigator.clipboard，失败退回 execCommand。 */
    function copyText(text, done) {
      var finished = false;
      function mark(ok) {
        if (finished) return;
        finished = true;
        done(ok);
      }
      function legacy() {
        try {
          var area = document.createElement('textarea');
          area.value = text;
          area.setAttribute('readonly', '');
          area.style.position = 'fixed';
          area.style.top = '-1000px';
          area.style.opacity = '0';
          document.body.appendChild(area);
          area.select();
          var ok = document.execCommand('copy');
          document.body.removeChild(area);
          return ok;
        } catch (error) {
          return false;
        }
      }
      try {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          navigator.clipboard.writeText(text).then(function () { mark(true); }, function () { mark(legacy()); });
          return;
        }
      } catch (error) {
        /* 落到兜底方案 */
      }
      mark(legacy());
    }

    /* ════════════════════════════════════════════════════════════════
     * 横向落点
     *
     * 浮层是 frame 级的，`left: 50%` 对的是整个窗口；胶囊要落在会话栏正中。
     * 所以挂一个零尺寸探针在输入区 dock 上，量到自己所在插槽的左右边界，算出中心。
     * 探针量的是自己的矩形，不查宿主 DOM、不碰别的插件；量不到就退回窗口居中。
     * 纵向不测量：按窗口高度比例算（ISLAND_TOP_RATIO + 上下限），标题栏高度变了位置也不跳。
     * ════════════════════════════════════════════════════════════════ */

    var columnCenter = { x: null, listeners: [] };

    function publishColumnCenter(x) {
      if (typeof x !== 'number') return;
      if (columnCenter.x !== null && Math.abs(x - columnCenter.x) <= 0.5) return;
      columnCenter.x = x;
      for (var i = 0; i < columnCenter.listeners.length; i += 1) {
        try { columnCenter.listeners[i](); } catch (error) { /* 单个订阅者出错不影响其他 */ }
      }
    }

    function useColumnCenter() {
      var pair = React.useState(columnCenter.x);
      var value = pair[0];
      var setValue = pair[1];
      React.useEffect(function () {
        function sync() { setValue(columnCenter.x); }
        columnCenter.listeners.push(sync);
        sync();
        return function () {
          var index = columnCenter.listeners.indexOf(sync);
          if (index >= 0) columnCenter.listeners.splice(index, 1);
        };
      }, []);
      return value;
    }

    /* ════════════════════════════════════════════════════════════════
     * 当前会话 + 墨卡大师状态
     *
     * 浮层是 frame 级的，不知道当前是哪个会话；会话作用域的插槽（输入区 dock）会把 sessionId
     * 作为 props 交给探针，探针登记到这里。分屏有多个会话时取最后挂上的那个。
     * 状态由宿主半边（index.js + status.js）折叠会话事件得出，这里长轮询 memo-island/status。
     * ════════════════════════════════════════════════════════════════ */

    var activeSessions = { ids: [], listeners: [] };

    function publishSessions() {
      for (var i = 0; i < activeSessions.listeners.length; i += 1) {
        try { activeSessions.listeners[i](); } catch (error) { /* 单个订阅者出错不影响其他 */ }
      }
    }

    function mountSession(id) {
      activeSessions.ids.push(id);
      publishSessions();
      return function () {
        var index = activeSessions.ids.lastIndexOf(id);
        if (index >= 0) activeSessions.ids.splice(index, 1);
        publishSessions();
      };
    }

    function currentSessionId() {
      var ids = activeSessions.ids;
      return ids.length ? ids[ids.length - 1] : null;
    }

    function useActiveSession() {
      var pair = React.useState(currentSessionId());
      var setValue = pair[1];
      React.useEffect(function () {
        function sync() { setValue(currentSessionId()); }
        activeSessions.listeners.push(sync);
        sync();
        return function () {
          var index = activeSessions.listeners.indexOf(sync);
          if (index >= 0) activeSessions.listeners.splice(index, 1);
        };
      }, []);
      return pair[0];
    }

    /* ─── 更新检查（只读；宿主侧带 6 小时缓存，这里不轮询） ─── */
    var UPDATE_ROUTE = 'memo-island/update';
    var UPDATE_IDLE = { state: 'idle' };

    function updateUrl(force) {
      var base = new URL(document.baseURI || window.location.href);
      base.search = '';
      base.hash = '';
      if (base.pathname.charAt(base.pathname.length - 1) !== '/') base.pathname = base.pathname.replace(/[^/]*$/, '');
      var url = new URL(UPDATE_ROUTE, base);
      if (force) url.searchParams.set('force', '1');
      return url.href;
    }

    /** 打开时问一次；手动检查走 force。失败不改写已有结果，只标 error。 */
    function useUpdateInfo() {
      var pair = React.useState({ info: UPDATE_IDLE, checking: false, error: false });
      var ref = React.useRef({ info: UPDATE_IDLE, checking: false, error: false });
      var setState = pair[1];
      function apply(next) { ref.current = next; setState(next); }
      async function refresh(force) {
        if (ref.current.checking) return;
        apply({ ...ref.current, checking: true });
        try {
          var response = await fetch(updateUrl(force), { cache: 'no-store' });
          var body = await response.json();
          if (!body || !body.ok || !body.value || typeof body.value.state !== 'string') throw new Error('invalid_update');
          apply({ info: body.value, checking: false, error: false });
        } catch (error) {
          apply({ ...ref.current, checking: false, error: true });
        }
      }
      React.useEffect(function () {
        if (typeof fetch === 'function') refresh(false);
      }, []);
      return { state: pair[0], refresh: refresh };
    }

    /** 状态 → 一句人话；检查中与失败优先，绝不在失败时说“已是最新”。 */

    /* ────────────────────────────────────────────────────────────────
     * 上传状态详情（派生视图，只读宿主已有字段）
     *
     * 默认区：关键数量 → 一句状态 → 相对读取时间 → 异常提示
     * 展开区：全量计数（含零值）、来源、读取/进展/心跳时间、生命周期
     * 不新增任何状态存储：全部从 view.progress / view.health / view.source 派生。
     * ──────────────────────────────────────────────────────────────── */
    var UPLOAD_FIELDS = [
      ['verified', 'upload.verified'],
      ['planned', 'upload.planned'],
      ['written', 'upload.written'],
      ['failed', 'upload.failed'],
      ['uncertain', 'upload.uncertain'],
      ['mismatch', 'upload.mismatch'],
      ['skipped', 'upload.skipped']
    ];

    /** 相对时间：只在 10s / 60s / 1h / 1d 这几个档位变化，不逐秒改文案。 */
    function agoText(time, now, t) {
      if (typeof time !== 'number' || !isFinite(time) || time <= 0) return '';
      var diff = Math.max(0, now - time);
      if (diff < 10000) return t('upload.justNow');
      if (diff < 60000) return fill(t('upload.secondsAgo'), { n: Math.floor(diff / 1000) });
      if (diff < 3600000) return fill(t('upload.minutesAgo'), { n: Math.floor(diff / 60000) });
      if (diff < 86400000) return fill(t('upload.hoursAgo'), { n: Math.floor(diff / 3600000) });
      return fill(t('upload.daysAgo'), { n: Math.floor(diff / 86400000) });
    }

    function absoluteTime(time) {
      if (typeof time !== 'number' || !isFinite(time) || time <= 0) return '';
      try { return new Date(time).toLocaleString(); } catch (error) { return ''; }
    }

    /**
     * @param {object} view 宿主返回的状态
     * @param {Function} t 文案
     * @param {number} now 当前时间（带 skew）
     */
    function describeUpload(view, t, now) {
      var p = view && view.progress;
      if (!p) return null;
      var num = function (key) { return Math.max(0, Number(p[key]) || 0); };
      var health = (view && view.health) || {};
      var total = num('total');
      var verified = num('verified');
      var planned = num('planned');
      var written = num('written');
      var failed = num('failed');
      var uncertain = num('uncertain');
      var mismatch = num('mismatch');
      var skipped = num('skipped');
      var lastProgressAt = typeof health.lastProgressAt === 'number' ? health.lastProgressAt : 0;
      var heartbeatAt = typeof health.heartbeatAt === 'number' ? health.heartbeatAt : 0;
      var readAt = typeof health.readAt === 'number' ? health.readAt : (typeof p.readAt === 'number' ? p.readAt : 0);
      var phase = view.phase || '';
      var code = health.code || '';
      var waiting = Boolean(view.ask) || Boolean(view.approval);
      var moving = lastProgressAt > 0 && now - lastProgressAt < 90000;

      /* 状态：异常与等待优先；心跳只证明"还在上报"，不据此说"正在上传" */
      var state;
      if (code === 'disconnected') state = { tone: 'warn', text: t('upload.state.disconnected') };
      else if (code === 'read_failed' || code === 'journal_read_failed') state = { tone: 'warn', text: t('upload.state.readFailed') };
      else if (code === 'heartbeat_stale' || code === 'stale') state = { tone: 'warn', text: t('upload.state.stale') };
      else if (health.waitReason === 'rate_limit') state = { tone: 'wait', text: t('upload.state.rateLimited') };
      else if (health.waitReason === 'network_wait') state = { tone: 'wait', text: t('upload.state.networkWait') };
      else if (phase === 'paused' || health.waitReason === 'paused' || health.lifecycle === 'paused') state = { tone: 'wait', text: t('upload.state.paused') };
      else if (waiting || phase === 'ask' || phase === 'approval') state = { tone: 'wait', text: t('upload.state.waitingUser') };
      else if (total > 0 && verified === total && failed === 0 && uncertain === 0 && mismatch === 0 && skipped === 0) {
        state = { tone: 'ok', text: t('upload.state.allVerified') + ' · ' + t('upload.previewNote') };
      }
      else if (moving) state = { tone: 'run', text: t('upload.state.uploading') };
      else if (written > 0) state = { tone: 'run', text: t('upload.state.verifying') };
      else if (view.running) state = { tone: 'quiet', text: t('upload.state.scriptOnline') };
      else state = { tone: 'quiet', text: t('upload.state.idle') };

      var counts = [
        { key: 'verified', label: t('upload.verified'), value: verified },
        { key: 'planned', label: t('upload.planned'), value: planned }
      ];
      if (written > 0) counts.push({ key: 'written', label: t('upload.written'), value: written });

      var exceptions = [];
      if (uncertain > 0) exceptions.push(fill(t('upload.exc.uncertain'), { n: uncertain }));
      if (failed > 0) exceptions.push(fill(t('upload.exc.failed'), { n: failed }));
      if (mismatch > 0) exceptions.push(fill(t('upload.exc.mismatch'), { n: mismatch }));
      if (skipped > 0) exceptions.push(fill(t('upload.exc.skipped'), { n: skipped }));

      var rows = UPLOAD_FIELDS.map(function (entry) {
        return { key: entry[0], label: t(entry[1]), value: num(entry[0]) };
      });
      var details = rows.map(function (row) { return { label: row.label, value: String(row.value) }; });
      if (view.source) details.push({ label: t('upload.row.source'), value: t('progress.source.' + view.source) });
      var readAbsolute = absoluteTime(readAt);
      if (readAbsolute) details.push({ label: t('upload.row.readAt'), value: readAbsolute });
      if (lastProgressAt) details.push({ label: t('upload.row.lastProgress'), value: absoluteTime(lastProgressAt) });
      if (heartbeatAt) details.push({ label: t('upload.row.heartbeat'), value: absoluteTime(heartbeatAt) });
      if (health.lifecycle) details.push({ label: t('upload.row.lifecycle'), value: String(health.lifecycle) });
      if (health.conflict === true) details.push({ label: t('upload.row.conflict'), value: t('upload.yes') });
      if (num('readbackConfirmed') > 0) {
        details.push({ label: t('upload.row.readback'), value: String(num('readbackConfirmed')) });
      }

      return {
        counts: counts,
        state: state,
        exceptions: exceptions,
        readAgo: readAbsolute ? { text: agoText(readAt, now, t), absolute: readAbsolute } : null,
        staleRead: code === 'read_failed' || code === 'journal_read_failed' || code === 'disconnected',
        details: details,
        total: total,
        allVerified: total > 0 && verified === total && failed === 0 && uncertain === 0 && mismatch === 0 && skipped === 0
      };
    }

    function updateMessage(info, checking, error, t) {
      if (checking) return t('update.checking');
      if (error) return t('update.failed');
      var state = info && info.state ? info.state : 'idle';
      if (state === 'available') return t('update.available');
      if (state === 'up_to_date') return t('update.uptodate');
      if (state === 'unconfigured') return t('update.unconfigured');
      var key = 'update.' + state;
      var text = t(key);
      return text === key ? t('update.failed') : text;
    }

    var IDLE_STATUS = { rev: -1, phase: 'idle' };
    var STATUS_ROUTE = 'memo-island/status';

    /** 路由按页面目录解析（document.baseURI 可能带反向代理前缀），不从源站根开始。 */
    function statusUrl(sessionId, rev, instance) {
      var base = new URL(document.baseURI || window.location.href);
      base.search = '';
      base.hash = '';
      if (base.pathname.charAt(base.pathname.length - 1) !== '/') base.pathname = base.pathname.replace(/[^/]*$/, '');
      var url = new URL(STATUS_ROUTE, base);
      url.searchParams.set('sessionId', sessionId);
      url.searchParams.set('rev', String(rev));
      if (instance) url.searchParams.set('instance', instance);
      url.searchParams.set('wait', '1');
      return url.href;
    }

    /** 长轮询当前会话的状态。宿主没有这条路由（旧版宿主没重启）时安静地退回 idle，30 秒后再试。 */
    function useMemoStatus(sessionId) {
      var pair = React.useState({ view: IDLE_STATUS, skew: 0, connection: 'connecting' });
      var setState = pair[1];
      React.useEffect(function () {
        setState({ view: IDLE_STATUS, skew: 0, connection: 'connecting' });
        if (!sessionId || typeof fetch !== 'function') return undefined;
        var alive = true, rev = -1, instance = null, controller = null;
        var timer = 0, requestTimer = 0, resumePause = null;
        function pause(ms) { return new Promise(function (resolve) { resumePause = resolve; timer = setTimeout(resolve, ms); }); }
        function disconnected() { if (alive) setState(function (old) { return { ...old, connection: 'disconnected' }; }); }
        async function loop() {
          while (alive) {
            controller = typeof AbortController === 'function' ? new AbortController() : null;
            try {
              requestTimer = setTimeout(function () { if (controller) controller.abort(); }, 35000);
              var response = await fetch(statusUrl(sessionId, rev, instance), { cache: 'no-store', signal: controller ? controller.signal : undefined });
              if (!alive) return;
              if (!response.ok) { clearTimeout(requestTimer); disconnected(); await pause(response.status === 404 ? 30000 : 5000); continue; }
              var body = await response.json();
              if (!alive) return;
              if (!body || !body.ok || !body.value || typeof body.value.phase !== 'string') throw new Error('invalid_status');
              rev = body.value.rev; instance = body.value.instanceId || null;
              setState({ view: body.value, connection: 'connected', skew: typeof body.now === 'number' ? body.now - Date.now() : 0 });
            } catch (error) {
              if (!alive) return;
              clearTimeout(requestTimer); disconnected(); await pause(5000);
            } finally { clearTimeout(requestTimer); }
          }
        }
        loop();
        return function () { alive = false; clearTimeout(timer); clearTimeout(requestTimer); if (resumePause) resumePause(); if (controller) controller.abort(); };
      }, [sessionId]);
      return pair[0];
    }

    /** 每秒走一次的时钟：只在需要显示已用时 / 剩余时间时开。 */
    function useNow(active) {
      var pair = React.useState(Date.now());
      var setNow = pair[1];
      React.useEffect(function () {
        if (!active) return undefined;
        setNow(Date.now());
        var id = setInterval(function () { setNow(Date.now()); }, 1000);
        return function () { clearInterval(id); };
      }, [active]);
      return pair[0];
    }

    function fill(template, values) {
      return String(template).replace(/\{(\w+)\}/g, function (match, key) {
        return values && values[key] !== undefined && values[key] !== null ? String(values[key]) : match;
      });
    }

    /** 已用时：m:ss，一小时以上 h:mm:ss。 */
    // React owns the host; GlyphRoll owns only its empty child span.
    function ElapsedDigits(props) {
      var host = React.useRef(null);
      var roll = React.useRef(null);
      React.useLayoutEffect(function () {
        roll.current = glyphRoll.createGlyphRoll(host.current, Object.assign({}, glyphRoll.STANDBY_PRESET, {
          value: props.value, duration: 320, bounce: 0.10, maxBlurRadius: 4, alignment: 'end'
        }));
        return function () {
          roll.current.destroy();
          roll.current = null;
        };
      }, []);
      React.useLayoutEffect(function () {
        if (roll.current) roll.current.update({ value: props.value });
      }, [props.value]);
      return h('span', { className: 'msi-elapsed', 'aria-label': props.value },
        h('span', { ref: host, 'aria-hidden': 'true' })
      );
    }

    function UploadCapsuleText(props) {
      var progress = props.view.progress;
      var ratio = progress && typeof progress.uploaded === 'number' && typeof progress.total === 'number'
        ? String(progress.uploaded) + '/' + String(progress.total) : '';
      var position = ratio ? props.text.indexOf(ratio) : -1;
      if (position < 0) return h('span', { className: 'msi-capsule__text' }, props.text);
      return h('span', { className: 'msi-capsule__text', 'aria-label': props.text },
        props.text.slice(0, position),
        h('span', { className: 'msi-upload-digits', 'aria-hidden': 'true' },
          h(ElapsedDigits, { value: String(progress.uploaded) }),
          h('span', { 'aria-hidden': 'true' }, '/'),
          h(ElapsedDigits, { value: String(progress.total) })
        ),
        props.text.slice(position + ratio.length)
      );
    }

    function clockText(ms) {
      var total = Math.max(0, Math.floor(ms / 1000));
      var hours = Math.floor(total / 3600);
      var minutes = Math.floor((total % 3600) / 60);
      var seconds = total % 60;
      var pad = function (n) { return n < 10 ? '0' + n : String(n); };
      return hours > 0 ? hours + ':' + pad(minutes) + ':' + pad(seconds) : minutes + ':' + pad(seconds);
    }

    /** 剩余时间：一分钟内按 5 秒取整，之后按分钟。 */
    function etaText(ms, t) {
      var seconds = Math.max(1, Math.round(ms / 1000));
      if (seconds < 60) return fill(t('eta'), { t: fill(t('duration.s'), { n: Math.max(5, Math.ceil(seconds / 5) * 5) }) });
      return fill(t('eta'), { t: fill(t('duration.m'), { n: Math.ceil(seconds / 60) }) });
    }

    /** 阶段 → 当前任务面板里的五步进度。 */
    var STAGE_STEP = {
      start: 0, sync: 0, help: 0, route: 0, credentials: 0,
      source: 1, ocr: 1, redraw: 1, table: 1, docs: 1,
      design: 2, write: 2, anki: 2, link: 2,
      txt: 3, finalize: 3, upload: 3, delete: 3
    };

    /**
     * 状态 → 岛上怎么显示。
     * light：blue 空闲 / green 进行中、完成 / yellow 等你 / red 出错；
     * pulse：slow 进行中（2 秒）/ fast 等你操作（1 秒）/ none 常亮；
     * attention：分离出 ! 圆球（问你问题、等批准、出错）。
     */
    function describeStatus(view, t, now) {
      var phase = view.phase;
      var stage = t('stage.' + (view.stage || 'start'));
      var elapsed = view.startedAt ? clockText(now - view.startedAt) : '';
      // bubble：分离出来的小圆球里画什么 —— 'alert' 感叹号（等你 / 出错）、'ring' 圆环进度（上传中）
      var d = { phase: phase, light: 'blue', pulse: 'none', text: t('capsule'), trailing: '', progress: null, attention: false, bubble: null, bubbleLabel: '', next: '' };
      if (phase === 'working') {
        d.light = 'green'; d.pulse = 'slow';
        d.text = t('brand') + ' · ' + stage;
        d.trailing = elapsed;
      } else if (phase === 'upload' && view.progress) {
        var progress = view.progress;
        d.light = 'green'; d.pulse = 'slow';
        d.text = fill(t('phase.upload'), { sent: progress.uploaded, total: progress.total });
        d.trailing = progress.etaMs ? etaText(progress.etaMs, t) : '';
        // 进度不再画在胶囊底边，而是分离出一个圆环小球（额度圈式，0% 是空轨道）
        d.progress = progress.total > 0 ? Math.max(0, Math.min(1, progress.uploaded / progress.total)) : 0;
        d.bubble = 'ring';
        d.bubbleLabel = fill(t('bubble.progress'), { sent: progress.uploaded, total: progress.total });
      } else if (phase === 'ask') {
        d.light = 'yellow'; d.pulse = 'fast'; d.attention = true;
        d.text = t('phase.ask') + (view.ask && view.ask.header ? ' · ' + view.ask.header : '');
        d.next = t('next.ask');
      } else if (phase === 'approval') {
        d.light = 'yellow'; d.pulse = 'fast'; d.attention = true;
        d.text = t('phase.approval') + (view.approval && view.approval.tool ? ' · ' + view.approval.tool : '');
        d.next = t('next.approval');
      } else if (phase === 'reply') {
        d.light = 'yellow'; d.pulse = 'fast';
        d.text = t('phase.reply') + ' · ' + stage;
        d.next = t('next.reply');
      } else if (phase === 'stopped') {
        d.light = 'yellow';
        d.text = t('phase.stopped') + ' · ' + stage;
        d.next = t('next.stopped');
      } else if (phase === 'done') {
        var deliverable = view.deliverable || {};
        d.light = 'green';
        d.text = deliverable.kind === 'api' ? fill(t('done.api'), { n: deliverable.cards }) : t('done.txt');
        d.next = deliverable.kind === 'api' ? t('next.api') : t('next.txt');
      } else if (phase === 'error') {
        var error = view.error || { kind: 'turn' };
        var kind = ['verify', 'lint', 'quota', 'transport', 'turn'].indexOf(error.kind) >= 0 ? error.kind : 'turn';
        d.light = 'red'; d.attention = true;
        d.text = fill(t('error.' + kind), { n: error.count });
        d.next = t('next.' + kind);
      }
      if (view.progress && phase !== 'ask' && phase !== 'approval') {
        var p = view.progress, exact = typeof p.uploaded === 'number';
        d.text = exact ? fill(t('progress.uploaded'), { n: p.uploaded, total: p.total }) : t('phase.progress_unavailable');
        d.progress = exact && p.total > 0 ? Math.max(0, Math.min(1, p.uploaded / p.total)) : null;
        d.bubble = exact ? 'ring' : null;
        d.bubbleLabel = exact ? fill(t('bubble.progress'), { sent: p.uploaded, total: p.total }) : '';
        d.attention = false;
        d.light = ['done', 'upload', 'verifying'].indexOf(phase) >= 0 ? 'green' : 'yellow';
        d.pulse = view.running && ['upload', 'verifying'].indexOf(phase) >= 0 ? 'slow' : 'none';
        d.trailing = phase === 'done' ? t('progress.complete') : phase === 'upload' ? '' : t('phase.' + phase);
        if (p.etaMs && (phase === 'upload' || phase === 'verifying')) {
          var estimate = etaText(p.etaMs, t);
          d.trailing = (phase === 'verifying' ? t('phase.verifying') + ' · ' : '') + (p.etaBasis === 'configured' ? fill(t('eta.configured'), { t: estimate }) : p.etaBasis === 'lower_bound' ? fill(t('eta.lower_bound'), { t: estimate }) : estimate);
        }
        if (view.source !== 'registered' && phase !== 'done') d.trailing = t('progress.compat') + (d.trailing ? ' · ' + d.trailing : '');
      } else if (phase === 'progress_unavailable') {
        d.text = t('phase.progress_unavailable'); d.light = 'yellow'; d.pulse = 'none';
      }
      if (view.health && view.health.code !== 'ok') {
        d.trailing = view.health.code === 'disconnected' ? t('progress.disconnected') : view.health.code === 'heartbeat_stale' ? t('progress.stale') : view.health.code === 'snapshot_only' ? t('progress.snapshot') : t('progress.read_failed');
        d.pulse = 'none'; d.light = 'yellow';
      }
      if (d.attention) d.bubble = 'alert';
      d.step = phase === 'done' ? 4 : (STAGE_STEP[view.stage] !== undefined ? STAGE_STEP[view.stage] : 0);
      return d;
    }

    /** 会话栏探针：零高度整宽，量到聊天栏的横向范围；顺便把插槽给的 sessionId 登记为当前会话。 */
    function ColumnProbe(props) {
      var sessionId = props && typeof props.sessionId === 'string' && props.sessionId ? props.sessionId : null;
      React.useEffect(function () {
        if (!sessionId) return undefined;
        return mountSession(sessionId);
      }, [sessionId]);
      var ref = React.useRef(null);
      React.useEffect(function () {
        var node = ref.current;
        if (!node) return undefined;
        function measure() {
          var rect = node.getBoundingClientRect();
          if (rect.width > 160) publishColumnCenter(rect.left + rect.width / 2);
        }
        measure();
        var frame = window.requestAnimationFrame(measure);
        var observer = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
        if (observer) observer.observe(node);
        window.addEventListener('resize', measure);
        return function () {
          window.cancelAnimationFrame(frame);
          if (observer) observer.disconnect();
          window.removeEventListener('resize', measure);
        };
      }, []);
      return h('div', {
        ref: ref,
        'aria-hidden': 'true',
        className: 'msi-probe',
        style: { height: 0, width: '100%', lineHeight: 0, fontSize: 0, pointerEvents: 'none' }
      });
    }

    /** 文案走 Host 的 locale 服务；取不到就退回内置字典。 */
    function createI18n(ctx) {
      var locale = null;
      try {
        locale = ctx && typeof ctx.get === 'function' ? ctx.get('locale') : null;
      } catch (error) {
        locale = null;
      }

      if (locale && typeof locale.register === 'function' && typeof ctx.effect === 'function') {
        try {
          ctx.effect(function () {
            var disposers = [];
            try { disposers.push(locale.register(NS, 'zh', STRINGS.zh)); } catch (error) { /* 已有同名命名空间 */ }
            try { disposers.push(locale.register(NS, 'en', STRINGS.en)); } catch (error) { /* 已有同名命名空间 */ }
            return function () {
              for (var i = 0; i < disposers.length; i += 1) {
                try { disposers[i](); } catch (error) { /* 已清理 */ }
              }
            };
          }, 'memo-skill-island:dictionary');
        } catch (error) {
          /* 注册不了就只用内置字典 */
        }
      }

      var bound = null;
      if (locale && typeof locale.bind === 'function') {
        try { bound = locale.bind(NS); } catch (error) { bound = null; }
      }

      /** 当前 locale 的原始 id；读不到就是空串。 */
      function rawLocale() {
        try {
          var snapshot = locale && typeof locale.getLocale === 'function' ? locale.getLocale() : null;
          if (snapshot && snapshot.active) return String(snapshot.active);
        } catch (error) {
          /* 读不到就用中文 */
        }
        return '';
      }

      /** 归一到本插件有的两种语言；其他语言一律按中文展示（内容是中文原文）。 */
      function active() {
        var id = rawLocale().toLowerCase();
        if (id.indexOf('en') === 0) return 'en';
        return 'zh';
      }

      function t(key) {
        /* 只有 locale id 正好是 zh / en 时才用服务里的字典，避免半中半英 */
        if (bound && rawLocale().toLowerCase() === active()) {
          try {
            var value = bound(key);
            if (typeof value === 'string' && value && value !== key) return value;
          } catch (error) {
            /* 落到内置字典 */
          }
        }
        var lang = active();
        if (STRINGS[lang] && STRINGS[lang][key]) return STRINGS[lang][key];
        if (STRINGS.zh[key]) return STRINGS.zh[key];
        return key;
      }

      function subscribe(listener) {
        try {
          if (locale && typeof locale.subscribe === 'function') return locale.subscribe(listener);
        } catch (error) {
          /* 不订阅也能用 */
        }
        return function () {};
      }

      return { t: t, active: active, subscribe: subscribe };
    }

    /* ════════════════════════════════════════════════════════════════
     * 组件
     * ════════════════════════════════════════════════════════════════ */

    /** Local web port of the animation sequence in:
     * https://www.sinasamaki.com/dynamic-island/
     * https://github.com/sinasamaki/DynamicIsland
     * Compose's Low=200, LowBouncy=.75, MediumBouncy=.5, default spring=1500/1.
     * dp sizes are normalized from 50dp to 32 CSS px. The original blur and shake
     * are physical px, so use an explicit reference Android density of 3, not 30 CSS px. */
    var ISLAND_REFERENCE = {
      scale: 32 / 50,
      density: 3,
      sourceGap: 8 * (32 / 50),
      // The desktop's 32px geometry needs clearance beyond the blur's adhesion radius.
      // Keep the reference spring specs, but fully break the neck in the resting state.
      // 分离静止时两岛之间看得见的间距 = gap + 2（描边内缩）。原来 14（看上去 16px）显得远，收到 8（看上去 10px）。
      // 下限来自流体层：模糊 σ=6.4px，两条边按平直边最坏情况估算，间距 < 8.6px 时中点 alpha 之和 ≥ .5，
      // 静止时会连出一条颈；10px 时约 .44，留了余量
      gap: 8,
      blur: (30 / 3) * (32 / 50),
      push: (15 / 3) * (32 / 50)
    };

    /** 融合结束时圆球的显示比例：0，结束时没有可移除的东西，右端不会突变回半圆。 */
    var ISLAND_MERGED_SCALE = 0;

    /** 融合时的「吸收」系数，按圆球的位置 x（不是按时间）算：
     * x ≥ ISLAND_CONTACT_X 时圆球还没碰到主岛（由 gap 推出，gap=8 时约 .69），保持原大，
     * 回程全尺寸飞回、碰上主岛时由流体层长出黏连的颈；
     * x 从接触点到融合终点 -.2 之间按 smoothstep 缩到 0 —— 越往主岛里钻越小，像被吸进去。
     * 之前用独立的缩放弹簧（k=400）缩到 0，圆球在半空就缩到 21%，接触时只剩一个小点，
     * 看不到被吸收的过程。 */
    /** 圆球全尺寸接触主岛时的 x：静止 x=1 时看得见的间距是 gap+2，每单位 x 移动 32px。 */
    var ISLAND_CONTACT_X = 1 - (ISLAND_REFERENCE.gap + 2) / 32;
    function islandAbsorb(x) {
      var t = Math.max(0, Math.min(1, (x + .2) / (ISLAND_CONTACT_X + .2)));
      return t * t * (3 - 2 * t);
    }

    /** Closed-form unit-mass spring; unlike Euler integration this is refresh-rate independent. */
    function advanceIslandSpring(value, velocity, target, stiffness, dampingRatio, seconds) {
      var omega = Math.sqrt(stiffness);
      var displacement = value - target;
      if (dampingRatio === 1) {
        var c = velocity + omega * displacement;
        var decay = Math.exp(-omega * seconds);
        return { value: target + (displacement + c * seconds) * decay, velocity: (velocity - omega * c * seconds) * decay };
      }
      var damped = omega * Math.sqrt(1 - dampingRatio * dampingRatio);
      var damping = dampingRatio * omega;
      var sine = Math.sin(damped * seconds);
      var cosine = Math.cos(damped * seconds);
      var coefficient = (velocity + damping * displacement) / damped;
      var envelope = Math.exp(-damping * seconds);
      return {
        value: target + envelope * (displacement * cosine + coefficient * sine),
        velocity: envelope * ((coefficient * damped - damping * displacement) * cosine - (displacement * damped + damping * coefficient) * sine)
      };
    }

    function useIslandSpring(detached) {
      var state = React.useState({ x: -.2, nudge: 0, stretch: 0, bubbleWidth: 1, scale: ISLAND_MERGED_SCALE, visible: false });
      var motion = state[0];
      var setMotion = state[1];
      var physics = React.useRef({ x: -.2, v: 0, nudge: 0, nudgeVelocity: 0, stretch: 0, stretchVelocity: 0, bubbleWidth: 1, bubbleVelocity: 0, scale: ISLAND_MERGED_SCALE, scaleVelocity: 0, visible: false });
      var mounted = React.useRef(false);
      React.useEffect(function () {
        var query = window.matchMedia('(prefers-reduced-motion: reduce)');
        var target = detached ? 1 : -.2;
        // The author's CallTimerState adds 50dp of leading content to the MAIN
        // island and keeps it until returning to DefaultState. This is not a pulse.
        var widthTarget = detached ? 50 * ISLAND_REFERENCE.scale : 0;
        var changed = mounted.current;
        mounted.current = true;
        var phase = changed ? 'push' : 'return';
        var p = physics.current;
        // AnimatedVisibility creates the incoming content at width*1.5 and scale .7.
        // If exit is interrupted before disposal, keep the existing values and velocities.
        if (detached && !p.visible) {
          p.x = 0;
          p.v = 0;
          p.bubbleWidth = 1.5;
          p.bubbleVelocity = 0;
          p.scale = .7;
          p.scaleVelocity = 0;
          p.visible = true;
        } else if (detached && p.visible) {
          // 融合途中又点了分离：把当前显示出来的吸收比例并入弹簧，从看到的大小接着长回去，不跳
          p.scale *= islandAbsorb(p.x);
        }
        var frame = 0;
        var last = 0;
        function jump() {
          window.cancelAnimationFrame(frame);
          physics.current = { x: target, v: 0, nudge: 0, nudgeVelocity: 0, stretch: widthTarget, stretchVelocity: 0, bubbleWidth: 1, bubbleVelocity: 0, scale: 1, scaleVelocity: 0, visible: detached };
          setMotion({ x: target, nudge: 0, stretch: widthTarget, bubbleWidth: 1, scale: detached ? 1 : ISLAND_MERGED_SCALE, visible: detached });
        }
        function tick(time) {
          var dt = last ? Math.min((time - last) / 1000, .032) : 1 / 60;
          last = time;
          var p = physics.current;
          // Substeps only synchronize the two-stage sequence; each spring step is analytic.
          var steps = Math.ceil(dt / .008);
          for (var i = 0; i < steps; i += 1) {
            var step = dt / steps;
            var slide = advanceIslandSpring(p.x, p.v, target, 200, detached ? .75 : 1, step);
            p.x = slide.value;
            p.v = slide.velocity;
            var pushing = phase === 'push';
            var nudge = advanceIslandSpring(p.nudge, p.nudgeVelocity, pushing ? ISLAND_REFERENCE.push : 0, pushing ? 1500 : 200, pushing ? 1 : .5, step);
            p.nudge = nudge.value;
            p.nudgeVelocity = nudge.velocity;
            // IslandContent's independent width spring: k=Low(200), damping=.6.
            // Match bubble_live.gif: widen on separation, HOLD while detached,
            // and restore the original width only when the bubble merges.
            var stretch = advanceIslandSpring(p.stretch, p.stretchVelocity, widthTarget, 200, .6, step);
            p.stretch = stretch.value;
            p.stretchVelocity = stretch.velocity;
            if (pushing && Math.abs(p.nudge - ISLAND_REFERENCE.push) < .0064 && Math.abs(p.nudgeVelocity) < .05) phase = 'return';
            var horizontal = advanceIslandSpring(p.bubbleWidth, p.bubbleVelocity, 1, 200, .35, step);
            p.bubbleWidth = horizontal.value;
            p.bubbleVelocity = horizontal.velocity;
            // 缩放弹簧两个方向都回到 1；融合时的缩小交给 islandAbsorb(x)，和位置绑定
            var scale = advanceIslandSpring(p.scale, p.scaleVelocity, 1, 400, 1, step);
            p.scale = scale.value;
            p.scaleVelocity = scale.velocity;
          }
          if (phase === 'return' && Math.abs(p.x - target) < .0005 && Math.abs(p.v) < .002 && Math.abs(p.nudge) < .015 && Math.abs(p.nudgeVelocity) < .04 && Math.abs(p.stretch - widthTarget) < .015 && Math.abs(p.stretchVelocity) < .04 && Math.abs(p.bubbleWidth - 1) < .001 && Math.abs(p.bubbleVelocity) < .01 && Math.abs(p.scale - 1) < .002) {
            p.x = target;
            p.v = 0;
            p.nudge = 0;
            p.nudgeVelocity = 0;
            p.stretch = widthTarget;
            p.stretchVelocity = 0;
            p.bubbleWidth = 1;
            p.bubbleVelocity = 0;
            p.visible = detached;
            p.scale = 1;
            p.scaleVelocity = 0;
            setMotion({ x: target, nudge: 0, stretch: widthTarget, bubbleWidth: 1, scale: detached ? 1 : ISLAND_MERGED_SCALE, visible: detached });
            return;
          }
          setMotion({ x: p.x, nudge: p.nudge, stretch: p.stretch, bubbleWidth: p.bubbleWidth, scale: detached ? p.scale : p.scale * islandAbsorb(p.x), visible: p.visible });
          frame = window.requestAnimationFrame(tick);
        }
        function onPreferenceChange() { if (query.matches) jump(); }
        if (query.matches) jump();
        else frame = window.requestAnimationFrame(tick);
        query.addEventListener('change', onPreferenceChange);
        return function () {
          window.cancelAnimationFrame(frame);
          query.removeEventListener('change', onPreferenceChange);
        };
      }, [detached]);
      return motion;
    }

    /** 面板展开进度 0 → 1 的单一弹簧（宽、高同一份 spec，等价于教程里两个 animateDpAsState）。
     * 展开：k=200（StiffnessLow）、dampingRatio=.75（Compose LowBouncy），过冲约 3% 再回弹；
     * 教程原值 .6 过冲约 9%，在 660px 宽的面板上显得太晃，按需求收了一档。
     * 收起：同刚度、阻尼 1。教程里回到的是常驻胶囊，回弹看得见；这里收回后面板要消失，
     * 若用欠阻尼会欠冲成负尺寸再闪回，所以收起改为临界阻尼。
     * 中途反向时沿用当前位置和速度；prefers-reduced-motion 直接跳到终态。 */
    function usePanelSpring(open) {
      var target = open ? 1 : 0;
      var state = React.useState(target);
      var value = state[0];
      var setValue = state[1];
      var physics = React.useRef({ value: target, velocity: 0 });
      React.useEffect(function () {
        var query = window.matchMedia('(prefers-reduced-motion: reduce)');
        var p = physics.current;
        var dampingRatio = open ? .75 : 1;
        var frame = 0;
        var last = 0;
        function jump() {
          window.cancelAnimationFrame(frame);
          p.value = target;
          p.velocity = 0;
          setValue(target);
        }
        function tick(time) {
          var dt = last ? Math.min((time - last) / 1000, .032) : 1 / 60;
          last = time;
          var next = advanceIslandSpring(p.value, p.velocity, target, 200, dampingRatio, dt);
          p.value = next.value;
          p.velocity = next.velocity;
          if (Math.abs(p.value - target) < .0005 && Math.abs(p.velocity) < .005) {
            jump();
            return;
          }
          setValue(p.value);
          frame = window.requestAnimationFrame(tick);
        }
        if (query.matches) jump();
        else frame = window.requestAnimationFrame(tick);
        return function () { window.cancelAnimationFrame(frame); };
      }, [open]);
      return value;
    }

    /** 胶囊宽度的弹簧：状态文字变长变短时，岛的底形跟着弹过去，而不是一帧跳到新宽度。
     * 第一次量到宽度时直接到位（不从 0 长出来）；prefers-reduced-motion 直接跳。 */
    function useWidthSpring(target) {
      var state = React.useState(target);
      var setValue = state[1];
      var physics = React.useRef({ value: target, velocity: 0 });
      React.useEffect(function () {
        var p = physics.current;
        var query = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (p.value <= 0 || target <= 0 || query.matches) {
          p.value = target;
          p.velocity = 0;
          setValue(target);
          return undefined;
        }
        var frame = 0;
        var last = 0;
        function tick(time) {
          var dt = last ? Math.min((time - last) / 1000, .032) : 1 / 60;
          last = time;
          var next = advanceIslandSpring(p.value, p.velocity, target, 300, .8, dt);
          p.value = next.value;
          p.velocity = next.velocity;
          if (Math.abs(p.value - target) < .05 && Math.abs(p.velocity) < .5) {
            p.value = target;
            p.velocity = 0;
            setValue(target);
            return;
          }
          setValue(p.value);
          frame = window.requestAnimationFrame(tick);
        }
        frame = window.requestAnimationFrame(tick);
        return function () { window.cancelAnimationFrame(frame); };
      }, [target]);
      return state[0];
    }

    function IslandMorph(props) {
      var motion = props.motion;
      var progress = motion.x;
      var filterId = 'msi-goo-' + React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
      var width = props.width;
      var scale = motion.scale;
      var bubbleWidth = Math.max(.7, Math.min(1.6, motion.bubbleWidth));
      var fluidActive = motion.visible && (progress !== (props.detached ? 1 : -.2) || motion.nudge !== 0 || motion.stretch !== (props.detached ? 32 : 0) || motion.bubbleWidth !== 1 || scale !== (props.detached ? 1 : ISLAND_MERGED_SCALE));
      // Row gap + slide offset use the animated content width, as in the original Row.
      var circleX = width + motion.stretch / 2 + ISLAND_REFERENCE.gap + 32 * bubbleWidth * (progress - .5);
      // Shape lifetime is NOT label lifetime. Never carry the glyph into the chevron:
      // hide it immediately on merge, and reveal on detach only once outside the main island.
      var glyphClearance = circleX - 7 * scale * bubbleWidth - (width + motion.nudge + motion.stretch / 2 + 3);
      // 感叹号随「离主岛右沿的距离」连续显隐（smoothstep，0 → 14px）：
      // 分离时圆球越过边界后渐显，融合时在碰到主岛之前就渐隐到 0，两个方向对称，
      // 不再是分离 40ms 内硬切出现、融合第一帧直接消失。距离 ≤ 0 时一定为 0，仍不会压到箭头上。
      var glyphLinear = motion.visible ? Math.max(0, Math.min(1, glyphClearance / 14)) : 0;
      var glyphReveal = glyphLinear * glyphLinear * (3 - 2 * glyphLinear);
      var glyphVisible = glyphReveal > .001;
      // 随显隐从 .6 放大到 1，叠在圆球自身的缩放 / 横向挤压上，像是从圆球里「冒」出来
      var glyphPop = .6 + .4 * glyphReveal;
      var glyphInteractive = glyphVisible && props.detached;
      var fill = props.open ? 'var(--msi-capsule-open-bg, var(--msi-panel))' : 'var(--msi-capsule-bg, var(--msi-bar))';
      function shapes(inset, color) {
        function body(filtered) {
          return h('rect', {
            filter: filtered ? 'url(#' + filterId + '-blur)' : undefined,
            className: filtered ? 'msi-body-fluid' : 'msi-body-shape',
            x: inset + motion.nudge - motion.stretch / 2, y: inset,
            width: Math.max(0, width + motion.stretch - inset * 2), height: 32 - inset * 2, rx: 16 - inset
          });
        }
        function bubble(filtered) {
          return h('ellipse', {
            filter: filtered ? 'url(#' + filterId + '-blur)' : undefined,
            className: filtered ? 'msi-bubble-fluid' : 'msi-bubble-shape',
            cx: circleX, cy: 16,
            rx: motion.visible ? (16 - inset) * scale * bubbleWidth : 0,
            ry: motion.visible ? (16 - inset) * scale : 0
          });
        }
        return h('g', { fill: color },
          // The threshold union may ADD a fluid neck, but never subtract the
          // original circular ends. Crisp geometry restores the curved edge
          // eroded by blurring a finite-radius shape and thresholding at .5.
          h('g', { className: 'msi-fluid-layer', style: { display: fluidActive ? undefined : 'none' }, filter: 'url(#' + filterId + '-cutoff)' }, body(true), bubble(true)),
          body(false), bubble(false)
        );
      }
      return h(React.Fragment, null,
        h('svg', {
          className: 'msi-morph', 'aria-hidden': 'true', focusable: 'false',
          'data-nudge': motion.nudge,
          'data-stretch': motion.stretch,
          'data-bubble-width': bubbleWidth,
          'data-bubble-visible': motion.visible ? 'true' : 'false',
          viewBox: '-24 -8 ' + (width + 112) + ' 48',
          style: { left: 'calc(50% - ' + (width / 2 + 24) + 'px)', width: width + 112 + 'px' }
        },
          h('defs', null,
            h('filter', { id: filterId + '-blur', filterUnits: 'userSpaceOnUse', x: -32, y: -32, width: width + 128, height: 96, colorInterpolationFilters: 'sRGB' },
              h('feGaussianBlur', { stdDeviation: ISLAND_REFERENCE.blur })
            ),
            h('filter', { id: filterId + '-cutoff', filterUnits: 'userSpaceOnUse', x: -32, y: -32, width: width + 128, height: 96, colorInterpolationFilters: 'sRGB' },
              h('feComponentTransfer', null, h('feFuncA', { type: 'discrete', tableValues: '0 1' }))
            )
          ),
          shapes(0, 'var(--msi-line)'),
          shapes(1, fill)
        ),
        h('button', {
          type: 'button', className: 'msi-badge',
          title: props.label,
          'aria-label': props.label,
          'aria-hidden': !glyphInteractive,
          tabIndex: glyphInteractive ? 0 : -1,
          onClick: props.onActivate,
          style: {
            left: 'calc(50% + ' + (circleX - width / 2 - 16) + 'px)',
            transform: 'scale(' + (scale * bubbleWidth * glyphPop) + ', ' + (scale * glyphPop) + ')',
            opacity: glyphReveal,
            filter: 'none',
            visibility: glyphVisible ? 'visible' : 'hidden',
            // 融合途中还在淡出的感叹号不再接点击
            pointerEvents: glyphInteractive ? 'auto' : 'none'
          }
        }, props.glyph === 'ring' ? h(ProgressRing, { ratio: props.ratio }) : '!')
      );
    }

    /** 圆环进度（像额度圈）：深色轨道 + 灯色弧线，12 点钟方向起笔顺时针，弧长 = 已发送 / 总数。
     * 不做转圈的加载动画：0% 就是一圈空轨道，进度涨一点弧线长一点。 */
    var RING_R = 8;
    var RING_C = 2 * Math.PI * RING_R;
    function ProgressRing(props) {
      var ratio = typeof props.ratio === 'number' ? Math.max(0, Math.min(1, props.ratio)) : 0;
      return h('svg', {
        className: 'msi-ring',
        viewBox: '0 0 20 20', width: 20, height: 20, 'aria-hidden': 'true', focusable: 'false'
      },
        h('circle', { className: 'msi-ring__track', cx: 10, cy: 10, r: RING_R }),
        h('circle', {
          className: 'msi-ring__arc', cx: 10, cy: 10, r: RING_R,
          strokeDasharray: RING_C.toFixed(2),
          strokeDashoffset: (RING_C * (1 - ratio)).toFixed(2),
          // 0% 时连圆头端点都不画，只剩空轨道
          style: ratio <= 0 ? { opacity: 0 } : undefined
        })
      );
    }

    var THEME_KEY = 'memo-skill-island:theme';
    function readTheme() {
      try {
        var value = window.localStorage.getItem(THEME_KEY);
        return ['system', 'light', 'dark'].indexOf(value) >= 0 ? value : 'system';
      } catch (_) { return 'system'; }
    }
    function useIslandTheme() {
      var preference = React.useState(readTheme);
      var system = React.useState(function () {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      });
      React.useEffect(function () {
        var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
        function changed() { system[1](media && media.matches ? 'dark' : 'light'); }
        function stored(e) { if (e.key === THEME_KEY || e.key === null) preference[1](readTheme()); }
        if (media) {
          changed();
          if (media.addEventListener) media.addEventListener('change', changed);
          else media.addListener(changed);
        }
        window.addEventListener('storage', stored);
        return function () {
          if (media) {
            if (media.removeEventListener) media.removeEventListener('change', changed);
            else media.removeListener(changed);
          }
          window.removeEventListener('storage', stored);
        };
      }, []);
      function cycle() {
        preference[1](function (current) {
          var next = current === 'system' ? 'light' : current === 'light' ? 'dark' : 'system';
          try { window.localStorage.setItem(THEME_KEY, next); } catch (_) { /* Still usable for this session. */ }
          return next;
        });
      }
      return { mode: preference[0], resolved: preference[0] === 'system' ? system[0] : preference[0], cycle: cycle };
    }

    function Island(props) {
      var theme = useIslandTheme();
      var i18n = props.i18n;
      var t = i18n.t;
      var lang = i18n.active();

      var anchorValue = useColumnCenter();
      var halfSpan = Math.max(140, Math.min(330, window.innerWidth / 2 - 16));

      /* 窗口尺寸变化时重算一次落点（纵向是按高度比例算的） */
      var viewportTick = React.useState(0);
      var setViewportTick = viewportTick[1];
      React.useEffect(function () {
        function onResize() { setViewportTick(Date.now()); }
        window.addEventListener('resize', onResize);
        return function () { window.removeEventListener('resize', onResize); };
      }, []);

      var baseX = anchorValue === null ? window.innerWidth / 2 : anchorValue;
      var centerX = Math.min(Math.max(baseX, halfSpan), window.innerWidth - halfSpan);
      var topY = Math.min(
        Math.max(Math.round(window.innerHeight * ISLAND_TOP_RATIO) + ISLAND_TOP_SHIFT, ISLAND_TOP_MIN),
        ISLAND_TOP_MAX
      );
      var rootStyle = {
        left: Math.round(centerX) + 'px',
        top: (topY + 3) + 'px'
      };

      var openState = React.useState(false);
      var open = openState[0];
      var setOpen = openState[1];

      /* 墨卡大师状态：当前会话 → 宿主折叠出的状态 → 岛上的灯、文字、进度、! 圆球 */
      var sessionId = useActiveSession();
      var memo = useMemoStatus(sessionId);
      var memoView = memo.connection === 'disconnected' ? { ...memo.view, phase: 'progress_unavailable', running: false, health: { ...(memo.view.health || {}), code: 'disconnected' }, progress: memo.view.progress ? { ...memo.view.progress, etaMs: null } : null } : memo.view;
      var ticking = memoView.phase === 'working' || memoView.phase === 'upload';
      var now = useNow(ticking) + memo.skew;
      var display = describeStatus(memoView, t, now);
      // 小圆球分离出来的两种情况：需要你注意（! ：问你问题、等批准、出错）和上传中（圆环进度）
      var detached = display.bubble !== null;
      var motion = useIslandSpring(detached);
      rootStyle['--msi-nudge'] = motion.nudge + 'px';
      rootStyle['--msi-stretch'] = motion.stretch + 'px';
      var capsuleRef = React.useRef(null);
      var widthState = React.useState(0);
      var capsuleWidth = widthState[0];
      var setCapsuleWidth = widthState[1];
      React.useLayoutEffect(function () {
        var node = capsuleRef.current;
        if (!node) return undefined;
        function measure() { setCapsuleWidth(node.getBoundingClientRect().width); }
        measure();
        var observer = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
        if (observer) observer.observe(node);
        window.addEventListener('resize', measure);
        return function () {
          if (observer) observer.disconnect();
          window.removeEventListener('resize', measure);
        };
      }, []);

      var islandWidth = useWidthSpring(capsuleWidth);

      var taskState = React.useState(TASKS[0].id);
      var selectedId = taskState[0];
      var setSelectedId = taskState[1];

      var feedbackState = React.useState(null);
      var feedback = feedbackState[0];
      var setFeedback = feedbackState[1];

      var rootRef = React.useRef(null);
      var profileState = React.useState(readStoredProfile);
      var profile = profileState[0];
      var setProfile = profileState[1];
      var avatarInputRef = React.useRef(null);
      var profileTimer = React.useRef(0);
      var update = useUpdateInfo();
      var updateInfo = update.state.info || UPDATE_IDLE;
      var updateStatus = update.state;
      var uploadOpenState = React.useState(false);
      var uploadOpen = uploadOpenState[0];
      var setUploadOpen = uploadOpenState[1];
      var updateOpenState = React.useState(false);
      var updateOpen = updateOpenState[0];
      var setUpdateOpen = updateOpenState[1];
      var updateButtonRef = React.useRef(null);
      var updatePanelRef = React.useRef(null);
      var profileMenuState = React.useState(false);
      var profileMenuOpen = profileMenuState[0];
      var setProfileMenuOpen = profileMenuState[1];
      var editingNameState = React.useState(false);
      var editingName = editingNameState[0];
      var setEditingName = editingNameState[1];
      var profileRef = React.useRef(null);
      var nameInputRef = React.useRef(null);
      var nameBeforeRef = React.useRef('');
      var timerRef = React.useRef(0);
      var bumpLocale = React.useState(0)[1];

      /* 切换语言时重绘（文案是渲染时读的） */
      React.useEffect(function () {
        return i18n.subscribe(function () { bumpLocale(Date.now()); });
      }, []);

      /* 卸载时收掉复制反馈的定时器 */
      React.useEffect(function () {
        return function () {
          if (timerRef.current) clearTimeout(timerRef.current);
        };
      }, []);

      /* 展开时：点外部收起、Esc 收起 */
      React.useEffect(function () {
        if (!open) return undefined;
        function onPointerDown(event) {
          var node = rootRef.current;
          if (node && event.target && node.contains(event.target)) return;
          setOpen(false);
        }
        function onKeyDown(event) {
          if (event.key === 'Escape') setOpen(false);
        }
        document.addEventListener('pointerdown', onPointerDown, true);
        document.addEventListener('keydown', onKeyDown);
        return function () {
          document.removeEventListener('pointerdown', onPointerDown, true);
          document.removeEventListener('keydown', onKeyDown);
        };
      }, [open]);

      var task = TASKS[0];
      for (var i = 0; i < TASKS.length; i += 1) {
        if (TASKS[i].id === selectedId) task = TASKS[i];
      }
      var skill = SKILL_BY_ID[task.skill] || SKILLS[0];

      /* 一行一个中文功能名；用途和技能 id 都挪到右栏，靠 title 提供悬停提示 */
      function renderTaskRow(item) {
        var isCurrent = item.id === task.id;
        var run = skillRunState(item, memoView, memo.connection);
        var runLabel = run === 'running' ? t('run.active')
          : run === 'paused' ? t('run.paused')
            : run === 'unknown' ? t('run.unknown')
              : '';
        return h('button', {
          key: item.id,
          type: 'button',
          className: 'msi-task',
          'aria-current': isCurrent ? 'true' : 'false',
          title: runLabel || pick(item.blurb, lang),
          onClick: function () { setSelectedId(item.id); }
        },
          taskIcon(item.id),
          h('span', {
            className: 'msi-task__name',
            'data-run': run === 'running' ? 'true' : 'false'
          }, pick(item.label, lang)),
          h('svg', {
            className: 'msi-task__run',
            viewBox: '0 0 12 12',
            'data-state': run,
            'aria-hidden': 'true',
            focusable: 'false'
          },
            h('circle', { className: 'msi-task__run-track', cx: 6, cy: 6, r: 4.5 }),
            h('path', { className: 'msi-task__run-arc', d: 'M6 1.5a4.5 4.5 0 0 1 4.5 4.5' })
          ),
          runLabel ? h('span', { className: 'msi-sr' }, ' ' + runLabel) : null
        );
      }

      function copyExample() {
        copyText(pick(skill.example, lang), function (ok) {
          setFeedback({ id: skill.id, ok: ok });
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(function () { setFeedback(null); }, COPIED_MS);
        });
      }

      /* 面板从胶囊的尺寸和位置长出来：宽 胶囊宽 → 面板宽，高 32 → 面板高，
       * 圆角 16 → 28/20，并从胶囊所在位置（上移 32 + gap）落到胶囊下方。 */
      var grow = usePanelSpring(open);
      var panelWidth = Math.min(660, window.innerWidth - 32);
      var panelHeight = Math.min(window.innerHeight * .72, 640);
      var startWidth = islandWidth > 0 ? islandWidth : 160;
      var settled = Math.max(0, Math.min(1, grow));
      var panelVisible = open || grow > .01;
      var panelStyle = {
        width: Math.max(0, startWidth + (panelWidth - startWidth) * grow) + 'px',
        height: Math.max(0, 32 + (panelHeight - 32) * grow) + 'px',
        borderRadius: (16 + 12 * settled) + 'px ' + (16 + 12 * settled) + 'px ' + (16 + 4 * settled) + 'px ' + (16 + 4 * settled) + 'px',
        transform: 'translateY(' + (-(32 + ISLAND_GAP) * (1 - settled)) + 'px)',
        // 起点和胶囊重合，先淡入外壳，避免第一帧在胶囊上叠出一层硬边
        opacity: Math.min(1, Math.max(0, grow) * 4)
      };
      var innerStyle = { width: panelWidth - 2 + 'px', height: panelHeight - 2 + 'px' };

      /* ─── 本地个人展示块：名字直接改，头像点一下选本地图 ─── */
      function updateProfile(patch) {
        var next = {
          name: typeof patch.name === 'string' ? patch.name : profile.name,
          avatar: typeof patch.avatar === 'string' ? patch.avatar : profile.avatar
        };
        setProfile(next);
        if (profileTimer.current) clearTimeout(profileTimer.current);
        profileTimer.current = setTimeout(function () { storeProfile(next); }, 300);
      }

      function openAvatarPicker() {
        var input = avatarInputRef.current;
        if (input) input.click();
      }

      function chooseAvatar() {
        setProfileMenuOpen(false);
        openAvatarPicker();
      }

      function chooseRename() {
        setProfileMenuOpen(false);
        nameBeforeRef.current = profile.name;
        setEditingName(true);
      }

      function onNameKeyDown(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          setEditingName(false);
          return;
        }
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          updateProfile({ name: nameBeforeRef.current });
          setEditingName(false);
        }
      }

      /* 更新面板：打开聚焦面板，关闭把焦点还给“更新”按钮 */
      React.useEffect(function () {
        if (updateOpen && updatePanelRef.current) updatePanelRef.current.focus();
      }, [updateOpen]);
      function closeUpdate(restoreFocus) {
        setUpdateOpen(false);
        if (restoreFocus && updateButtonRef.current) updateButtonRef.current.focus();
      }
      function checkUpdates() {
        setProfileMenuOpen(false);
        setUpdateOpen(true);
        update.refresh(true);
      }

      /* 菜单打开时：点外面收起 */
      React.useEffect(function () {
        if (!profileMenuOpen) return undefined;
        function onDown(event) {
          var node = profileRef.current;
          if (node && event.target && node.contains(event.target)) return;
          setProfileMenuOpen(false);
        }
        document.addEventListener('pointerdown', onDown, true);
        return function () { document.removeEventListener('pointerdown', onDown, true); };
      }, [profileMenuOpen]);

      /* 改名时自动聚焦并全选 */
      React.useEffect(function () {
        if (editingName && nameInputRef.current) {
          nameInputRef.current.focus();
          nameInputRef.current.select();
        }
      }, [editingName]);

      function onAvatarPicked(event) {
        var input = event.currentTarget;
        var file = input.files && input.files[0];
        input.value = '';
        if (!file || !/^image\//.test(file.type)) return;
        var reader = new FileReader();
        reader.onload = function () {
          var image = new Image();
          image.onload = function () {
            try {
              var size = 96;
              var canvas = document.createElement('canvas');
              canvas.width = size;
              canvas.height = size;
              var context = canvas.getContext('2d');
              if (!context) return;
              var scale = Math.max(size / image.width, size / image.height);
              var width = image.width * scale;
              var height = image.height * scale;
              context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
              updateProfile({ avatar: canvas.toDataURL('image/jpeg', 0.82) });
            } catch (error) {
              /* 画不出来就算了，别把面板搞崩 */
            }
          };
          image.src = String(reader.result);
        };
        reader.readAsDataURL(file);
      }


      /* 适用范围里提到的其他能力，做成可点的任务入口：只认左侧已有的任务标签，
         不拼外链、不造假入口。 */
      var relatedTasks = [];
      var scopeText = pick(skill.detail, lang);
      for (var ri = 0; ri < TASKS.length; ri += 1) {
        var candidateTask = TASKS[ri];
        if (candidateTask.id === task.id) continue;
        var candidateLabel = pick(candidateTask.label, lang);
        if (candidateLabel && scopeText.indexOf(candidateLabel) !== -1) {
          relatedTasks.push(candidateTask);
        }
      }

      var copyLabel = t('copy');
      var copyState = '';
      if (feedback && feedback.id === skill.id) {
        copyLabel = feedback.ok ? t('copied') : t('copyFailed');
        copyState = feedback.ok ? 'ok' : 'error';
      }

      var statusLine = display.text + (display.trailing ? ' · ' + display.trailing : '');
      var routeLabel = memoView.route ? t('task.route.' + memoView.route) : '';
      // 进行中按当前时间走；完成、等你、出错时停在最后一次动静，不让已用时在静止状态里一直涨
      var elapsedEnd = ticking ? now : (memoView.updatedAt || now);
      var elapsedLabel = memoView.startedAt && memoView.phase !== 'idle' ? fill(t('task.elapsed'), { t: clockText(elapsedEnd - memoView.startedAt) }) : '';
      var detailLines = [];
      if (memoView.ask) {
        if (memoView.ask.question) detailLines.push(memoView.ask.question);
        if (memoView.ask.count > 1) detailLines.push(fill(t('task.questions'), { n: memoView.ask.count }));
      }
      if (memoView.approval && memoView.approval.tool) detailLines.push(fill(t('task.tool'), { tool: memoView.approval.tool }));
      // 计数 / 来源 / 读取时间 / 执行器状态不再平铺在这里：
      // 统一由下面的“关键数量 → 状态 → 可展开详情”区块呈现（describeUpload 派生）
      var uploadInfo = display.phase !== 'idle' ? describeUpload(memoView, t, now) : null;
      if (memoView.tasks && memoView.tasks.length > 1) memoView.tasks.forEach(function (task, index) {
        var label = task.progress && typeof task.progress.uploaded === 'number' ? fill(t('progress.uploaded'), { n: task.progress.uploaded, total: task.progress.total }) : t('phase.progress_unavailable');
        detailLines.push(fill(t('progress.task'), { n: index + 1, state: label + ' · ' + (task.phase === 'done' ? t('progress.complete') : t('phase.' + task.phase)) }));
      });
      if (memoView.deliverable && memoView.deliverable.kind === 'txt') {
        if (memoView.deliverable.file) detailLines.push(memoView.deliverable.file);
        detailLines.push(fill(t('task.cards'), { cards: memoView.deliverable.cards, chapters: memoView.deliverable.chapters }));
      }

      return h('div', {
        className: 'msi-root', ref: rootRef, style: rootStyle,
        'data-morph': capsuleWidth > 0 ? 'true' : 'false',
        'data-light': display.light,
        'data-pulse': display.pulse,
        'data-theme': theme.resolved,
        'data-phase': display.phase
      },
        h('style', null, STYLE),
        /* 读屏：状态变了就播报一句，不抢焦点 */
        h('span', { className: 'msi-sr', role: 'status', 'aria-live': 'polite' }, display.phase === 'idle' ? '' : t('status.label') + '：' + statusLine),
        capsuleWidth > 0 ? h(IslandMorph, {
          width: islandWidth, detached: detached, open: open, motion: motion,
          label: (display.bubble === 'ring' ? display.bubbleLabel : t('bubble.open') + ' · ' + display.text),
          glyph: display.bubble || 'alert',
          ratio: display.progress,
          onActivate: function () { setOpen(true); }
        }) : null,
        h('button', {
          type: 'button',
          ref: capsuleRef,
          className: 'msi-capsule' + (display.bubble === 'ring' ? ' msi-capsule--optical' : ''),
          'aria-expanded': open ? 'true' : 'false',
          'aria-controls': 'msi-panel',
          title: display.phase === 'idle' ? t('panel.title') : statusLine,
          onClick: function () { setOpen(!open); }
        },
          h('span', { className: 'msi-capsule__dot', 'aria-hidden': 'true' }),
          h(UploadCapsuleText, { key: sessionId + ':' + (memoView.taskId || memoView.startedAt || ''), text: display.text, view: memoView }),
          display.trailing ? h('span', { className: 'msi-capsule__meta' },
            display.phase === 'working' ? h(ElapsedDigits, { key: sessionId + ':' + memoView.startedAt, value: display.trailing }) : display.trailing
          ) : null,
          h('span', {
            className: 'msi-capsule__chev' + (open ? ' is-open' : ''),
            'aria-hidden': 'true'
          }, '▾')
        ),
        h('section', {
          id: 'msi-panel',
          className: 'msi-panel',
          'data-open': open ? 'true' : 'false',
          'data-visible': panelVisible ? 'true' : 'false',
          'aria-hidden': open ? 'false' : 'true',
          role: 'region',
          'aria-label': t('panel.title'),
          style: panelStyle
        },
          h('div', { className: 'msi-panel__inner', style: innerStyle },
          h('header', { className: 'msi-panel__head' },
            h('span', { className: 'msi-panel__title', 'aria-label': t('panel.title') },
              h('span', { className: 'msi-panel__brand', 'aria-hidden': 'true' }, 'Memo Cardest'),
              h('span', { className: 'msi-panel__studio', 'aria-hidden': 'true' }, 'STUDIO')
            )
          ),
          /* 当前任务：只在墨卡大师有任务时出现，在技能目录上方 */
          display.phase !== 'idle' ? h('div', { className: 'msi-current', 'aria-label': t('task.title') },
            h('div', { className: 'msi-current__row' },
              h('span', { className: 'msi-current__dot', 'aria-hidden': 'true' }),
              h('span', { className: 'msi-current__status' }, display.text),
              h('span', { className: 'msi-current__meta' }, [routeLabel, elapsedLabel].filter(Boolean).join(' · '))
            ),
            h('ol', { className: 'msi-steps' },
              [0, 1, 2, 3, 4].map(function (index) {
                var state = index < display.step ? 'done' : index === display.step ? 'current' : 'todo';
                if (display.phase === 'done') state = 'done';
                return h('li', { key: index, className: 'msi-step', 'data-state': state, 'aria-current': state === 'current' ? 'step' : undefined },
                  h('span', { className: 'msi-step__mark', 'aria-hidden': 'true' }),
                  h('span', { className: 'msi-step__label' }, t('task.step.' + index))
                );
              })
            ),
            uploadInfo ? h('div', { className: 'msi-upload', 'data-tone': uploadInfo.state.tone },
              h('div', { className: 'msi-upload__counts' }, uploadInfo.counts.map(function (count) {
                return h('span', { key: count.key, className: 'msi-upload__count' },
                  h('span', { className: 'msi-upload__label' }, count.label),
                  h('span', { className: 'msi-upload__value' }, String(count.value))
                );
              })),
              uploadInfo.state.tone !== 'ok' ? h('div', { className: 'msi-upload__state' },
                h('span', { className: 'msi-upload__stext' }, uploadInfo.state.text)
              ) : null,
              uploadInfo.exceptions.length
                ? h('p', { className: 'msi-upload__exc' }, uploadInfo.exceptions.join(' · '))
                : null,
              h('button', {
                type: 'button',
                className: 'msi-upload__toggle',
                'aria-expanded': uploadOpen ? 'true' : 'false',
                'aria-controls': 'msi-upload-details',
                onClick: function () { setUploadOpen(!uploadOpen); }
              }, uploadOpen ? t('upload.detailsHide') : t('upload.details'),
                h('svg', { className: 'msi-upload__chevron', viewBox: '0 0 12 12', 'aria-hidden': 'true', focusable: 'false' },
                  h('path', { d: 'M3 4.5 6 7.5 9 4.5' }))
              ),
              uploadOpen
                ? h('dl', { id: 'msi-upload-details', className: 'msi-upload__detail' }, uploadInfo.details.map(function (row, index) {
                  return h('div', { key: index, className: 'msi-upload__row' },
                    h('dt', null, row.label), h('dd', null, row.value));
                }))
                : null
            ) : null,
            detailLines.length ? h('div', { className: 'msi-current__detail' },
              detailLines.map(function (line, index) { return h('p', { key: index }, line); })
            ) : null,
            display.next && !(uploadInfo && uploadInfo.allVerified) ? h('p', { className: 'msi-current__next' }, display.next) : null
          ) : null,
          h('div', { className: 'msi-panel__body' },
            h('div', { className: 'msi-side' },
            h('div', { className: 'msi-tasks' },
              h('div', { className: 'msi-tasks__label' }, t('tasks.label')),
              h('div', { className: 'msi-tasks__group' }, TASK_PRIMARY.map(renderTaskRow)),
              h('div', { className: 'msi-tasks__group msi-tasks__group--aux' }, TASK_AUX.map(renderTaskRow))
            ),
            h('div', { className: 'msi-profile-wrap', ref: profileRef },
              profileMenuOpen ? h('div', { className: 'msi-profile__menu', role: 'menu' },
                h('button', {
                  type: 'button', role: 'menuitem', className: 'msi-profile__item',
                  onClick: chooseAvatar
                }, menuIcon(ICON_UPLOAD), h('span', null, t('profile.upload'))),
                h('button', {
                  type: 'button', role: 'menuitem', className: 'msi-profile__item',
                  onClick: chooseRename
                }, menuIcon(ICON_EDIT), h('span', null, t('profile.rename'))),
                h('a', {
                  className: 'msi-profile__item', role: 'menuitem', href: SITE_URL,
                  target: '_blank', rel: 'noopener noreferrer',
                  onClick: function () { setProfileMenuOpen(false); }
                }, menuIcon(ICON_LINK), h('span', null, t('profile.site'))),
                h('button', {
                  type: 'button', role: 'menuitem', className: 'msi-profile__item',
                  title: t('theme.next') + t('theme.' + (theme.mode === 'system' ? 'light' : theme.mode === 'light' ? 'dark' : 'system')),
                  onClick: theme.cycle
                }, menuIcon(['M12 3a9 9 0 1 0 0 18V3z', 'M12 3a9 9 0 0 1 0 18']), h('span', { 'aria-live': 'polite' }, t('theme.' + theme.mode))),
                h('button', {
                  type: 'button', role: 'menuitem', className: 'msi-profile__item',
                  onClick: checkUpdates
                }, menuIcon(ICON_REFRESH), h('span', null, t('update.check')))
              ) : null,
              editingName
                ? h('div', { className: 'msi-profile' },
                  h('span', {
                    className: 'msi-profile__avatar',
                    'aria-hidden': 'true',
                    style: profile.avatar ? { backgroundImage: 'url("' + profile.avatar + '")' } : null
                  }, profile.avatar ? null : initialOf(profile.name)),
                  h('input', {
                    ref: nameInputRef,
                    className: 'msi-profile__input',
                    type: 'text',
                    value: profile.name,
                    maxLength: 24,
                    spellCheck: false,
                    placeholder: t('profile.name'),
                    'aria-label': t('profile.name'),
                    onChange: function (event) { updateProfile({ name: event.target.value }); },
                    onKeyDown: onNameKeyDown,
                    onBlur: function () { setEditingName(false); }
                  })
                )
                : h('button', {
                  type: 'button',
                  className: 'msi-profile',
                  'aria-haspopup': 'menu',
                  'aria-expanded': profileMenuOpen ? 'true' : 'false',
                  onClick: function () { setProfileMenuOpen(!profileMenuOpen); }
                },
                  h('span', {
                    className: 'msi-profile__avatar',
                    'aria-hidden': 'true',
                    style: profile.avatar ? { backgroundImage: 'url("' + profile.avatar + '")' } : null
                  }, profile.avatar ? null : initialOf(profile.name)),
                  h('span', {
                    className: 'msi-profile__name',
                    'data-empty': profile.name ? 'false' : 'true'
                  }, profile.name || t('profile.name'))
                ),
              updateInfo.state === 'available'
                ? h('button', {
                  ref: updateButtonRef,
                  type: 'button',
                  className: 'msi-profile__update',
                  'aria-haspopup': 'dialog',
                  'aria-expanded': updateOpen ? 'true' : 'false',
                  title: t('update.available') + ' · ' + (updateInfo.latest || ''),
                  onClick: function () { setUpdateOpen(!updateOpen); }
                }, h('svg', { className: 'msi-profile__update-icon', viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false' },
                  h('path', { d: 'M12 3v12m-4-4 4 4 4-4M5 15v5h14v-5' })
                ), h('span', null, t('update.short')))
                : null,
              updateOpen
                ? h('div', {
                  ref: updatePanelRef,
                  className: 'msi-update',
                  role: 'dialog',
                  tabIndex: -1,
                  'aria-label': t('update.title'),
                  onKeyDown: function (event) {
                    if (event.key === 'Escape') {
                      event.preventDefault();
                      event.stopPropagation();
                      closeUpdate(true);
                    }
                  }
                },
                  h('div', { className: 'msi-update__head' }, t('update.title')),
                  h('div', { className: 'msi-update__versions' },
                    t('update.current') + ' ' + (updateInfo.current || '—') + ' · ' + t('update.latest') + ' ' + (updateInfo.latest || '—')),
                  h('p', { className: 'msi-update__msg' }, updateMessage(updateInfo, updateStatus.checking, updateStatus.error, t)),
                  updateInfo.notes ? h('pre', { className: 'msi-update__notes' }, updateInfo.notes) : null,
                  updateInfo.installMode === 'link' ? h('p', { className: 'msi-update__hint' }, t('update.dev')) : null,
                  h('div', { className: 'msi-update__actions' },
                    h('button', {
                      type: 'button', className: 'msi-update__btn',
                      onClick: function () { closeUpdate(true); }
                    }, t('update.later')),
                    updateInfo.state === 'available' && updateInfo.asset
                      ? h('a', {
                        className: 'msi-update__btn msi-update__btn--primary',
                        href: updateInfo.asset.url, target: '_blank', rel: 'noopener noreferrer',
                        onClick: function () { closeUpdate(false); }
                      }, t('update.download'))
                      : updateInfo.releaseUrl
                        ? h('a', {
                          className: 'msi-update__btn msi-update__btn--primary',
                          href: updateInfo.releaseUrl, target: '_blank', rel: 'noopener noreferrer',
                          onClick: function () { closeUpdate(false); }
                        }, t('update.open'))
                        : null
                  ),
                  updateInfo.state === 'available' ? h('p', { className: 'msi-update__hint' }, t('update.install')) : null
                )
                : null,
              h('input', {
                ref: avatarInputRef,
                className: 'msi-profile__file',
                type: 'file',
                accept: 'image/png,image/jpeg,image/webp,image/gif',
                tabIndex: -1,
                'aria-hidden': 'true',
                onChange: onAvatarPicked
              })
            )
            ),
            h('div', { className: 'msi-detail' },
              h('h2', { className: 'msi-detail__title' }, (lang === 'en' && skill.titleEn) ? skill.titleEn : (skill.title || skill.alias || '')),
              h('p', { className: 'msi-detail__use' }, pick(skill.use, lang)),
              h('div', { className: 'msi-detail__block' },
                h('div', { className: 'msi-detail__label' }, t('detail.provide')),
                h('p', { className: 'msi-detail__text' }, pick(skill.prep, lang))
              ),
              h('div', { className: 'msi-example' },
                h('div', { className: 'msi-example__head' },
                  h('span', { className: 'msi-example__label' }, t('detail.example')),
                  h('button', {
                    type: 'button',
                    className: 'msi-copy',
                    'data-state': copyState,
                    'aria-live': 'polite',
                    onClick: copyExample
                  }, copyLabel)
                ),
                h('p', { className: 'msi-example__text' }, pick(skill.example, lang))
              ),
              skill.delivery ? h('p', { className: 'msi-detail__delivery' }, pick(skill.delivery, lang)) : null,
              skill.note ? h('p', { className: 'msi-detail__note' }, pick(skill.note, lang)) : null,
              skill.warning ? h('p', { className: 'msi-detail__warning' }, pick(skill.warning, lang)) : null,
              h('details', { className: 'msi-more' },
                h('summary', { className: 'msi-more__summary' }, t('detail.more')),
                h('div', { className: 'msi-more__body' },
                  (function () {
                    var otherName = lang === 'en' ? skill.title : skill.alias;
                    var mainName = (lang === 'en' && skill.titleEn) ? skill.titleEn : skill.title;
                    return otherName && otherName !== mainName
                      ? h('div', { className: 'msi-more__alias' }, otherName)
                      : null;
                  })(),
                  h('p', { className: 'msi-more__text' }, pick(skill.detail, lang)),
                  relatedTasks.length
                    ? h('div', { className: 'msi-detail__related' },
                      relatedTasks.map(function (item) {
                        return h('button', {
                          key: item.id,
                          type: 'button',
                          className: 'msi-detail__related-btn',
                          onClick: function () { setSelectedId(item.id); }
                        }, pick(item.label, lang));
                      })
                    )
                    : null
                )
              )
            )
          )
          )
        )
      );
    }

    /* ════════════════════════════════════════════════════════════════
     * 插件入口
     * ════════════════════════════════════════════════════════════════ */

    var inject = ['slots'];

    function apply(ctx) {
      try {
        var i18n = createI18n(ctx);
        ctx.slots.inject(SLOT, function () {
          return ctx.slots.register(
            { name: SLOT, id: ENTRY_ID, order: ENTRY_ORDER },
            function SkillIslandEntry() {
              return h(Island, { i18n: i18n });
            }
          );
        });
        /* 落点探针：只量横向中心，不画任何东西 */
        ctx.slots.inject(PROBE_COLUMN_SLOT, function () {
          return ctx.slots.register(
            {
              name: PROBE_COLUMN_SLOT,
              id: ENTRY_ID + ':column',
              order: 950,
              // 会话作用域插槽把 sessionId 交给探针（标准 props 一般已带，这里再声明一条来路）
              inject: function (sessionId) { return { sessionId: sessionId }; }
            },
            ColumnProbe
          );
        });
      } catch (error) {
        /* fail-open：挂不上就什么都不显示，不影响官方界面 */
      }
    }

    return { inject: inject, apply: apply };
  }
});
