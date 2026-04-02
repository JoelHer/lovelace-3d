var __defProp = Object.defineProperty, __esmMin = (w, T) => () => (w && (T = w(w = 0)), T), __export = (T) => {
	let O = {};
	for (var j in T) __defProp(O, j, {
		get: T[j],
		enumerable: !0
	});
	return O;
};
/**
* @vue/shared v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/* @__NO_SIDE_EFFECTS__ */
function makeMap(w) {
	let T = /* @__PURE__ */ Object.create(null);
	for (let O of w.split(",")) T[O] = 1;
	return (w) => w in T;
}
var EMPTY_OBJ = {}, EMPTY_ARR = [], NOOP = () => {}, NO = () => !1, isOn = (w) => w.charCodeAt(0) === 111 && w.charCodeAt(1) === 110 && (w.charCodeAt(2) > 122 || w.charCodeAt(2) < 97), isModelListener = (w) => w.startsWith("onUpdate:"), extend = Object.assign, remove = (w, T) => {
	let O = w.indexOf(T);
	O > -1 && w.splice(O, 1);
}, hasOwnProperty$1 = Object.prototype.hasOwnProperty, hasOwn = (w, T) => hasOwnProperty$1.call(w, T), isArray = Array.isArray, isMap = (w) => toTypeString(w) === "[object Map]", isSet = (w) => toTypeString(w) === "[object Set]", isFunction = (w) => typeof w == "function", isString = (w) => typeof w == "string", isSymbol = (w) => typeof w == "symbol", isObject = (w) => typeof w == "object" && !!w, isPromise = (w) => (isObject(w) || isFunction(w)) && isFunction(w.then) && isFunction(w.catch), objectToString = Object.prototype.toString, toTypeString = (w) => objectToString.call(w), toRawType = (w) => toTypeString(w).slice(8, -1), isPlainObject = (w) => toTypeString(w) === "[object Object]", isIntegerKey = (w) => isString(w) && w !== "NaN" && w[0] !== "-" && "" + parseInt(w, 10) === w, isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), cacheStringFunction = (w) => {
	let T = /* @__PURE__ */ Object.create(null);
	return ((O) => T[O] || (T[O] = w(O)));
}, camelizeRE = /-\w/g, camelize = cacheStringFunction((w) => w.replace(camelizeRE, (w) => w.slice(1).toUpperCase())), hyphenateRE = /\B([A-Z])/g, hyphenate = cacheStringFunction((w) => w.replace(hyphenateRE, "-$1").toLowerCase()), capitalize = cacheStringFunction((w) => w.charAt(0).toUpperCase() + w.slice(1)), toHandlerKey = cacheStringFunction((w) => w ? `on${capitalize(w)}` : ""), hasChanged = (w, T) => !Object.is(w, T), invokeArrayFns = (w, ...T) => {
	for (let O = 0; O < w.length; O++) w[O](...T);
}, def = (w, T, O, j = !1) => {
	Object.defineProperty(w, T, {
		configurable: !0,
		enumerable: !1,
		writable: j,
		value: O
	});
}, looseToNumber = (w) => {
	let T = parseFloat(w);
	return isNaN(T) ? w : T;
}, _globalThis, getGlobalThis = () => _globalThis ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function normalizeStyle(w) {
	if (isArray(w)) {
		let T = {};
		for (let O = 0; O < w.length; O++) {
			let j = w[O], F = isString(j) ? parseStringStyle(j) : normalizeStyle(j);
			if (F) for (let w in F) T[w] = F[w];
		}
		return T;
	} else if (isString(w) || isObject(w)) return w;
}
var listDelimiterRE = /;(?![^(]*\))/g, propertyDelimiterRE = /:([^]+)/, styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(w) {
	let T = {};
	return w.replace(styleCommentRE, "").split(listDelimiterRE).forEach((w) => {
		if (w) {
			let O = w.split(propertyDelimiterRE);
			O.length > 1 && (T[O[0].trim()] = O[1].trim());
		}
	}), T;
}
function normalizeClass(w) {
	let T = "";
	if (isString(w)) T = w;
	else if (isArray(w)) for (let O = 0; O < w.length; O++) {
		let j = normalizeClass(w[O]);
		j && (T += j + " ");
	}
	else if (isObject(w)) for (let O in w) w[O] && (T += O + " ");
	return T.trim();
}
var specialBooleanAttrs = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
specialBooleanAttrs + "";
function includeBooleanAttr(w) {
	return !!w || w === "";
}
var isRef$1 = (w) => !!(w && w.__v_isRef === !0), toDisplayString = (w) => isString(w) ? w : w == null ? "" : isArray(w) || isObject(w) && (w.toString === objectToString || !isFunction(w.toString)) ? isRef$1(w) ? toDisplayString(w.value) : JSON.stringify(w, replacer, 2) : String(w), replacer = (w, T) => isRef$1(T) ? replacer(w, T.value) : isMap(T) ? { [`Map(${T.size})`]: [...T.entries()].reduce((w, [T, O], j) => (w[stringifySymbol(T, j) + " =>"] = O, w), {}) } : isSet(T) ? { [`Set(${T.size})`]: [...T.values()].map((w) => stringifySymbol(w)) } : isSymbol(T) ? stringifySymbol(T) : isObject(T) && !isArray(T) && !isPlainObject(T) ? String(T) : T, stringifySymbol = (w, T = "") => isSymbol(w) ? `Symbol(${w.description ?? T})` : w, activeEffectScope, EffectScope = class {
	constructor(w = !1) {
		this.detached = w, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = activeEffectScope, !w && activeEffectScope && (this.index = (activeEffectScope.scopes ||= []).push(this) - 1);
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let w, T;
			if (this.scopes) for (w = 0, T = this.scopes.length; w < T; w++) this.scopes[w].pause();
			for (w = 0, T = this.effects.length; w < T; w++) this.effects[w].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let w, T;
			if (this.scopes) for (w = 0, T = this.scopes.length; w < T; w++) this.scopes[w].resume();
			for (w = 0, T = this.effects.length; w < T; w++) this.effects[w].resume();
		}
	}
	run(w) {
		if (this._active) {
			let T = activeEffectScope;
			try {
				return activeEffectScope = this, w();
			} finally {
				activeEffectScope = T;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = activeEffectScope, activeEffectScope = this);
	}
	off() {
		this._on > 0 && --this._on === 0 && (activeEffectScope = this.prevScope, this.prevScope = void 0);
	}
	stop(w) {
		if (this._active) {
			this._active = !1;
			let T, O;
			for (T = 0, O = this.effects.length; T < O; T++) this.effects[T].stop();
			for (this.effects.length = 0, T = 0, O = this.cleanups.length; T < O; T++) this.cleanups[T]();
			if (this.cleanups.length = 0, this.scopes) {
				for (T = 0, O = this.scopes.length; T < O; T++) this.scopes[T].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !w) {
				let w = this.parent.scopes.pop();
				w && w !== this && (this.parent.scopes[this.index] = w, w.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function getCurrentScope() {
	return activeEffectScope;
}
var activeSub, pausedQueueEffects = /* @__PURE__ */ new WeakSet(), ReactiveEffect = class {
	constructor(w) {
		this.fn = w, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, activeEffectScope && activeEffectScope.active && activeEffectScope.effects.push(this);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, pausedQueueEffects.has(this) && (pausedQueueEffects.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || batch(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, cleanupEffect(this), prepareDeps(this);
		let w = activeSub, T = shouldTrack;
		activeSub = this, shouldTrack = !0;
		try {
			return this.fn();
		} finally {
			cleanupDeps(this), activeSub = w, shouldTrack = T, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let w = this.deps; w; w = w.nextDep) removeSub(w);
			this.deps = this.depsTail = void 0, cleanupEffect(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? pausedQueueEffects.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		isDirty(this) && this.run();
	}
	get dirty() {
		return isDirty(this);
	}
}, batchDepth = 0, batchedSub, batchedComputed;
function batch(w, T = !1) {
	if (w.flags |= 8, T) {
		w.next = batchedComputed, batchedComputed = w;
		return;
	}
	w.next = batchedSub, batchedSub = w;
}
function startBatch() {
	batchDepth++;
}
function endBatch() {
	if (--batchDepth > 0) return;
	if (batchedComputed) {
		let w = batchedComputed;
		for (batchedComputed = void 0; w;) {
			let T = w.next;
			w.next = void 0, w.flags &= -9, w = T;
		}
	}
	let w;
	for (; batchedSub;) {
		let T = batchedSub;
		for (batchedSub = void 0; T;) {
			let O = T.next;
			if (T.next = void 0, T.flags &= -9, T.flags & 1) try {
				T.trigger();
			} catch (T) {
				w ||= T;
			}
			T = O;
		}
	}
	if (w) throw w;
}
function prepareDeps(w) {
	for (let T = w.deps; T; T = T.nextDep) T.version = -1, T.prevActiveLink = T.dep.activeLink, T.dep.activeLink = T;
}
function cleanupDeps(w) {
	let T, O = w.depsTail, j = O;
	for (; j;) {
		let w = j.prevDep;
		j.version === -1 ? (j === O && (O = w), removeSub(j), removeDep(j)) : T = j, j.dep.activeLink = j.prevActiveLink, j.prevActiveLink = void 0, j = w;
	}
	w.deps = T, w.depsTail = O;
}
function isDirty(w) {
	for (let T = w.deps; T; T = T.nextDep) if (T.dep.version !== T.version || T.dep.computed && (refreshComputed(T.dep.computed) || T.dep.version !== T.version)) return !0;
	return !!w._dirty;
}
function refreshComputed(w) {
	if (w.flags & 4 && !(w.flags & 16) || (w.flags &= -17, w.globalVersion === globalVersion) || (w.globalVersion = globalVersion, !w.isSSR && w.flags & 128 && (!w.deps && !w._dirty || !isDirty(w)))) return;
	w.flags |= 2;
	let T = w.dep, O = activeSub, j = shouldTrack;
	activeSub = w, shouldTrack = !0;
	try {
		prepareDeps(w);
		let O = w.fn(w._value);
		(T.version === 0 || hasChanged(O, w._value)) && (w.flags |= 128, w._value = O, T.version++);
	} catch (w) {
		throw T.version++, w;
	} finally {
		activeSub = O, shouldTrack = j, cleanupDeps(w), w.flags &= -3;
	}
}
function removeSub(w, T = !1) {
	let { dep: O, prevSub: j, nextSub: F } = w;
	if (j && (j.nextSub = F, w.prevSub = void 0), F && (F.prevSub = j, w.nextSub = void 0), O.subs === w && (O.subs = j, !j && O.computed)) {
		O.computed.flags &= -5;
		for (let w = O.computed.deps; w; w = w.nextDep) removeSub(w, !0);
	}
	!T && !--O.sc && O.map && O.map.delete(O.key);
}
function removeDep(w) {
	let { prevDep: T, nextDep: O } = w;
	T && (T.nextDep = O, w.prevDep = void 0), O && (O.prevDep = T, w.nextDep = void 0);
}
var shouldTrack = !0, trackStack = [];
function pauseTracking() {
	trackStack.push(shouldTrack), shouldTrack = !1;
}
function resetTracking() {
	let w = trackStack.pop();
	shouldTrack = w === void 0 ? !0 : w;
}
function cleanupEffect(w) {
	let { cleanup: T } = w;
	if (w.cleanup = void 0, T) {
		let w = activeSub;
		activeSub = void 0;
		try {
			T();
		} finally {
			activeSub = w;
		}
	}
}
var globalVersion = 0, Link = class {
	constructor(w, T) {
		this.sub = w, this.dep = T, this.version = T.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Dep = class {
	constructor(w) {
		this.computed = w, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(w) {
		if (!activeSub || !shouldTrack || activeSub === this.computed) return;
		let T = this.activeLink;
		if (T === void 0 || T.sub !== activeSub) T = this.activeLink = new Link(activeSub, this), activeSub.deps ? (T.prevDep = activeSub.depsTail, activeSub.depsTail.nextDep = T, activeSub.depsTail = T) : activeSub.deps = activeSub.depsTail = T, addSub(T);
		else if (T.version === -1 && (T.version = this.version, T.nextDep)) {
			let w = T.nextDep;
			w.prevDep = T.prevDep, T.prevDep && (T.prevDep.nextDep = w), T.prevDep = activeSub.depsTail, T.nextDep = void 0, activeSub.depsTail.nextDep = T, activeSub.depsTail = T, activeSub.deps === T && (activeSub.deps = w);
		}
		return T;
	}
	trigger(w) {
		this.version++, globalVersion++, this.notify(w);
	}
	notify(w) {
		startBatch();
		try {
			for (let w = this.subs; w; w = w.prevSub) w.sub.notify() && w.sub.dep.notify();
		} finally {
			endBatch();
		}
	}
};
function addSub(w) {
	if (w.dep.sc++, w.sub.flags & 4) {
		let T = w.dep.computed;
		if (T && !w.dep.subs) {
			T.flags |= 20;
			for (let w = T.deps; w; w = w.nextDep) addSub(w);
		}
		let O = w.dep.subs;
		O !== w && (w.prevSub = O, O && (O.nextSub = w)), w.dep.subs = w;
	}
}
var targetMap = /* @__PURE__ */ new WeakMap(), ITERATE_KEY = /* @__PURE__ */ Symbol(""), MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(""), ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol("");
function track(w, T, O) {
	if (shouldTrack && activeSub) {
		let T = targetMap.get(w);
		T || targetMap.set(w, T = /* @__PURE__ */ new Map());
		let j = T.get(O);
		j || (T.set(O, j = new Dep()), j.map = T, j.key = O), j.track();
	}
}
function trigger(w, T, O, j, F, U) {
	let W = targetMap.get(w);
	if (!W) {
		globalVersion++;
		return;
	}
	let G = (w) => {
		w && w.trigger();
	};
	if (startBatch(), T === "clear") W.forEach(G);
	else {
		let F = isArray(w), U = F && isIntegerKey(O);
		if (F && O === "length") {
			let w = Number(j);
			W.forEach((T, O) => {
				(O === "length" || O === ARRAY_ITERATE_KEY || !isSymbol(O) && O >= w) && G(T);
			});
		} else switch ((O !== void 0 || W.has(void 0)) && G(W.get(O)), U && G(W.get(ARRAY_ITERATE_KEY)), T) {
			case "add":
				F ? U && G(W.get("length")) : (G(W.get(ITERATE_KEY)), isMap(w) && G(W.get(MAP_KEY_ITERATE_KEY)));
				break;
			case "delete":
				F || (G(W.get(ITERATE_KEY)), isMap(w) && G(W.get(MAP_KEY_ITERATE_KEY)));
				break;
			case "set":
				isMap(w) && G(W.get(ITERATE_KEY));
				break;
		}
	}
	endBatch();
}
function reactiveReadArray(w) {
	let T = toRaw(w);
	return T === w ? T : (track(T, "iterate", ARRAY_ITERATE_KEY), isShallow(w) ? T : T.map(toReactive));
}
function shallowReadArray(w) {
	return track(w = toRaw(w), "iterate", ARRAY_ITERATE_KEY), w;
}
function toWrapped(w, T) {
	return isReadonly(w) ? isReactive(w) ? toReadonly(toReactive(T)) : toReadonly(T) : toReactive(T);
}
var arrayInstrumentations = {
	__proto__: null,
	[Symbol.iterator]() {
		return iterator(this, Symbol.iterator, (w) => toWrapped(this, w));
	},
	concat(...w) {
		return reactiveReadArray(this).concat(...w.map((w) => isArray(w) ? reactiveReadArray(w) : w));
	},
	entries() {
		return iterator(this, "entries", (w) => (w[1] = toWrapped(this, w[1]), w));
	},
	every(w, T) {
		return apply(this, "every", w, T, void 0, arguments);
	},
	filter(w, T) {
		return apply(this, "filter", w, T, (w) => w.map((w) => toWrapped(this, w)), arguments);
	},
	find(w, T) {
		return apply(this, "find", w, T, (w) => toWrapped(this, w), arguments);
	},
	findIndex(w, T) {
		return apply(this, "findIndex", w, T, void 0, arguments);
	},
	findLast(w, T) {
		return apply(this, "findLast", w, T, (w) => toWrapped(this, w), arguments);
	},
	findLastIndex(w, T) {
		return apply(this, "findLastIndex", w, T, void 0, arguments);
	},
	forEach(w, T) {
		return apply(this, "forEach", w, T, void 0, arguments);
	},
	includes(...w) {
		return searchProxy(this, "includes", w);
	},
	indexOf(...w) {
		return searchProxy(this, "indexOf", w);
	},
	join(w) {
		return reactiveReadArray(this).join(w);
	},
	lastIndexOf(...w) {
		return searchProxy(this, "lastIndexOf", w);
	},
	map(w, T) {
		return apply(this, "map", w, T, void 0, arguments);
	},
	pop() {
		return noTracking(this, "pop");
	},
	push(...w) {
		return noTracking(this, "push", w);
	},
	reduce(w, ...T) {
		return reduce(this, "reduce", w, T);
	},
	reduceRight(w, ...T) {
		return reduce(this, "reduceRight", w, T);
	},
	shift() {
		return noTracking(this, "shift");
	},
	some(w, T) {
		return apply(this, "some", w, T, void 0, arguments);
	},
	splice(...w) {
		return noTracking(this, "splice", w);
	},
	toReversed() {
		return reactiveReadArray(this).toReversed();
	},
	toSorted(w) {
		return reactiveReadArray(this).toSorted(w);
	},
	toSpliced(...w) {
		return reactiveReadArray(this).toSpliced(...w);
	},
	unshift(...w) {
		return noTracking(this, "unshift", w);
	},
	values() {
		return iterator(this, "values", (w) => toWrapped(this, w));
	}
};
function iterator(w, T, O) {
	let j = shallowReadArray(w), F = j[T]();
	return j !== w && !isShallow(w) && (F._next = F.next, F.next = () => {
		let w = F._next();
		return w.done || (w.value = O(w.value)), w;
	}), F;
}
var arrayProto = Array.prototype;
function apply(w, T, O, j, F, U) {
	let W = shallowReadArray(w), G = W !== w && !isShallow(w), K = W[T];
	if (K !== arrayProto[T]) {
		let T = K.apply(w, U);
		return G ? toReactive(T) : T;
	}
	let q = O;
	W !== w && (G ? q = function(T, j) {
		return O.call(this, toWrapped(w, T), j, w);
	} : O.length > 2 && (q = function(T, j) {
		return O.call(this, T, j, w);
	}));
	let J = K.call(W, q, j);
	return G && F ? F(J) : J;
}
function reduce(w, T, O, j) {
	let F = shallowReadArray(w), U = O;
	return F !== w && (isShallow(w) ? O.length > 3 && (U = function(T, j, F) {
		return O.call(this, T, j, F, w);
	}) : U = function(T, j, F) {
		return O.call(this, T, toWrapped(w, j), F, w);
	}), F[T](U, ...j);
}
function searchProxy(w, T, O) {
	let j = toRaw(w);
	track(j, "iterate", ARRAY_ITERATE_KEY);
	let F = j[T](...O);
	return (F === -1 || F === !1) && isProxy(O[0]) ? (O[0] = toRaw(O[0]), j[T](...O)) : F;
}
function noTracking(w, T, O = []) {
	pauseTracking(), startBatch();
	let j = toRaw(w)[T].apply(w, O);
	return endBatch(), resetTracking(), j;
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap("__proto__,__v_isRef,__isVue"), builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((w) => w !== "arguments" && w !== "caller").map((w) => Symbol[w]).filter(isSymbol));
function hasOwnProperty(w) {
	isSymbol(w) || (w = String(w));
	let T = toRaw(this);
	return track(T, "has", w), T.hasOwnProperty(w);
}
var BaseReactiveHandler = class {
	constructor(w = !1, T = !1) {
		this._isReadonly = w, this._isShallow = T;
	}
	get(w, T, O) {
		if (T === "__v_skip") return w.__v_skip;
		let j = this._isReadonly, F = this._isShallow;
		if (T === "__v_isReactive") return !j;
		if (T === "__v_isReadonly") return j;
		if (T === "__v_isShallow") return F;
		if (T === "__v_raw") return O === (j ? F ? shallowReadonlyMap : readonlyMap : F ? shallowReactiveMap : reactiveMap).get(w) || Object.getPrototypeOf(w) === Object.getPrototypeOf(O) ? w : void 0;
		let U = isArray(w);
		if (!j) {
			let w;
			if (U && (w = arrayInstrumentations[T])) return w;
			if (T === "hasOwnProperty") return hasOwnProperty;
		}
		let W = Reflect.get(w, T, isRef(w) ? w : O);
		if ((isSymbol(T) ? builtInSymbols.has(T) : isNonTrackableKeys(T)) || (j || track(w, "get", T), F)) return W;
		if (isRef(W)) {
			let w = U && isIntegerKey(T) ? W : W.value;
			return j && isObject(w) ? readonly(w) : w;
		}
		return isObject(W) ? j ? readonly(W) : reactive(W) : W;
	}
}, MutableReactiveHandler = class extends BaseReactiveHandler {
	constructor(w = !1) {
		super(!1, w);
	}
	set(w, T, O, j) {
		let F = w[T], U = isArray(w) && isIntegerKey(T);
		if (!this._isShallow) {
			let w = isReadonly(F);
			if (!isShallow(O) && !isReadonly(O) && (F = toRaw(F), O = toRaw(O)), !U && isRef(F) && !isRef(O)) return w || (F.value = O), !0;
		}
		let W = U ? Number(T) < w.length : hasOwn(w, T), G = Reflect.set(w, T, O, isRef(w) ? w : j);
		return w === toRaw(j) && (W ? hasChanged(O, F) && trigger(w, "set", T, O, F) : trigger(w, "add", T, O)), G;
	}
	deleteProperty(w, T) {
		let O = hasOwn(w, T), j = w[T], F = Reflect.deleteProperty(w, T);
		return F && O && trigger(w, "delete", T, void 0, j), F;
	}
	has(w, T) {
		let O = Reflect.has(w, T);
		return (!isSymbol(T) || !builtInSymbols.has(T)) && track(w, "has", T), O;
	}
	ownKeys(w) {
		return track(w, "iterate", isArray(w) ? "length" : ITERATE_KEY), Reflect.ownKeys(w);
	}
}, ReadonlyReactiveHandler = class extends BaseReactiveHandler {
	constructor(w = !1) {
		super(!0, w);
	}
	set(w, T) {
		return !0;
	}
	deleteProperty(w, T) {
		return !0;
	}
}, mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler(), readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(), shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(!0), toShallow = (w) => w, getProto = (w) => Reflect.getPrototypeOf(w);
function createIterableMethod(w, T, O) {
	return function(...j) {
		let F = this.__v_raw, U = toRaw(F), W = isMap(U), G = w === "entries" || w === Symbol.iterator && W, K = w === "keys" && W, q = F[w](...j), J = O ? toShallow : T ? toReadonly : toReactive;
		return !T && track(U, "iterate", K ? MAP_KEY_ITERATE_KEY : ITERATE_KEY), {
			next() {
				let { value: w, done: T } = q.next();
				return T ? {
					value: w,
					done: T
				} : {
					value: G ? [J(w[0]), J(w[1])] : J(w),
					done: T
				};
			},
			[Symbol.iterator]() {
				return this;
			}
		};
	};
}
function createReadonlyMethod(w) {
	return function(...T) {
		return w === "delete" ? !1 : w === "clear" ? void 0 : this;
	};
}
function createInstrumentations(w, T) {
	let O = {
		get(O) {
			let j = this.__v_raw, F = toRaw(j), U = toRaw(O);
			w || (hasChanged(O, U) && track(F, "get", O), track(F, "get", U));
			let { has: W } = getProto(F), G = T ? toShallow : w ? toReadonly : toReactive;
			if (W.call(F, O)) return G(j.get(O));
			if (W.call(F, U)) return G(j.get(U));
			j !== F && j.get(O);
		},
		get size() {
			let T = this.__v_raw;
			return !w && track(toRaw(T), "iterate", ITERATE_KEY), T.size;
		},
		has(T) {
			let O = this.__v_raw, j = toRaw(O), F = toRaw(T);
			return w || (hasChanged(T, F) && track(j, "has", T), track(j, "has", F)), T === F ? O.has(T) : O.has(T) || O.has(F);
		},
		forEach(O, j) {
			let F = this, U = F.__v_raw, W = toRaw(U), G = T ? toShallow : w ? toReadonly : toReactive;
			return !w && track(W, "iterate", ITERATE_KEY), U.forEach((w, T) => O.call(j, G(w), G(T), F));
		}
	};
	return extend(O, w ? {
		add: createReadonlyMethod("add"),
		set: createReadonlyMethod("set"),
		delete: createReadonlyMethod("delete"),
		clear: createReadonlyMethod("clear")
	} : {
		add(w) {
			!T && !isShallow(w) && !isReadonly(w) && (w = toRaw(w));
			let O = toRaw(this);
			return getProto(O).has.call(O, w) || (O.add(w), trigger(O, "add", w, w)), this;
		},
		set(w, O) {
			!T && !isShallow(O) && !isReadonly(O) && (O = toRaw(O));
			let j = toRaw(this), { has: F, get: U } = getProto(j), W = F.call(j, w);
			W ||= (w = toRaw(w), F.call(j, w));
			let G = U.call(j, w);
			return j.set(w, O), W ? hasChanged(O, G) && trigger(j, "set", w, O, G) : trigger(j, "add", w, O), this;
		},
		delete(w) {
			let T = toRaw(this), { has: O, get: j } = getProto(T), F = O.call(T, w);
			F ||= (w = toRaw(w), O.call(T, w));
			let U = j ? j.call(T, w) : void 0, W = T.delete(w);
			return F && trigger(T, "delete", w, void 0, U), W;
		},
		clear() {
			let w = toRaw(this), T = w.size !== 0, O = w.clear();
			return T && trigger(w, "clear", void 0, void 0, void 0), O;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((j) => {
		O[j] = createIterableMethod(j, w, T);
	}), O;
}
function createInstrumentationGetter(w, T) {
	let O = createInstrumentations(w, T);
	return (T, j, F) => j === "__v_isReactive" ? !w : j === "__v_isReadonly" ? w : j === "__v_raw" ? T : Reflect.get(hasOwn(O, j) && j in T ? O : T, j, F);
}
var mutableCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(!1, !1) }, shallowCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(!1, !0) }, readonlyCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(!0, !1) }, reactiveMap = /* @__PURE__ */ new WeakMap(), shallowReactiveMap = /* @__PURE__ */ new WeakMap(), readonlyMap = /* @__PURE__ */ new WeakMap(), shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(w) {
	switch (w) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
function getTargetType(w) {
	return w.__v_skip || !Object.isExtensible(w) ? 0 : targetTypeMap(toRawType(w));
}
function reactive(w) {
	return isReadonly(w) ? w : createReactiveObject(w, !1, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(w) {
	return createReactiveObject(w, !1, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(w) {
	return createReactiveObject(w, !0, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(w, T, O, j, F) {
	if (!isObject(w) || w.__v_raw && !(T && w.__v_isReactive)) return w;
	let U = getTargetType(w);
	if (U === 0) return w;
	let W = F.get(w);
	if (W) return W;
	let G = new Proxy(w, U === 2 ? j : O);
	return F.set(w, G), G;
}
function isReactive(w) {
	return isReadonly(w) ? isReactive(w.__v_raw) : !!(w && w.__v_isReactive);
}
function isReadonly(w) {
	return !!(w && w.__v_isReadonly);
}
function isShallow(w) {
	return !!(w && w.__v_isShallow);
}
function isProxy(w) {
	return w ? !!w.__v_raw : !1;
}
function toRaw(w) {
	let T = w && w.__v_raw;
	return T ? toRaw(T) : w;
}
function markRaw(w) {
	return !hasOwn(w, "__v_skip") && Object.isExtensible(w) && def(w, "__v_skip", !0), w;
}
var toReactive = (w) => isObject(w) ? reactive(w) : w, toReadonly = (w) => isObject(w) ? readonly(w) : w;
function isRef(w) {
	return w ? w.__v_isRef === !0 : !1;
}
function ref(w) {
	return createRef(w, !1);
}
function createRef(w, T) {
	return isRef(w) ? w : new RefImpl(w, T);
}
var RefImpl = class {
	constructor(w, T) {
		this.dep = new Dep(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = T ? w : toRaw(w), this._value = T ? w : toReactive(w), this.__v_isShallow = T;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(w) {
		let T = this._rawValue, O = this.__v_isShallow || isShallow(w) || isReadonly(w);
		w = O ? w : toRaw(w), hasChanged(w, T) && (this._rawValue = w, this._value = O ? w : toReactive(w), this.dep.trigger());
	}
};
function unref(w) {
	return isRef(w) ? w.value : w;
}
var shallowUnwrapHandlers = {
	get: (w, T, O) => T === "__v_raw" ? w : unref(Reflect.get(w, T, O)),
	set: (w, T, O, j) => {
		let F = w[T];
		return isRef(F) && !isRef(O) ? (F.value = O, !0) : Reflect.set(w, T, O, j);
	}
};
function proxyRefs(w) {
	return isReactive(w) ? w : new Proxy(w, shallowUnwrapHandlers);
}
var ComputedRefImpl = class {
	constructor(w, T, O) {
		this.fn = w, this.setter = T, this._value = void 0, this.dep = new Dep(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = globalVersion - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !T, this.isSSR = O;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && activeSub !== this) return batch(this, !0), !0;
	}
	get value() {
		let w = this.dep.track();
		return refreshComputed(this), w && (w.version = this.dep.version), this._value;
	}
	set value(w) {
		this.setter && this.setter(w);
	}
};
function computed$1(w, T, O = !1) {
	let j, F;
	return isFunction(w) ? j = w : (j = w.get, F = w.set), new ComputedRefImpl(j, F, O);
}
var INITIAL_WATCHER_VALUE = {}, cleanupMap = /* @__PURE__ */ new WeakMap(), activeWatcher = void 0;
function onWatcherCleanup(w, T = !1, O = activeWatcher) {
	if (O) {
		let T = cleanupMap.get(O);
		T || cleanupMap.set(O, T = []), T.push(w);
	}
}
function watch$1(w, T, O = EMPTY_OBJ) {
	let { immediate: j, deep: U, once: G, scheduler: K, augmentJob: q, call: J } = O, X = (w) => U ? w : isShallow(w) || U === !1 || U === 0 ? traverse(w, 1) : traverse(w), Q, SS, CS, TS, ES = !1, DS = !1;
	if (isRef(w) ? (SS = () => w.value, ES = isShallow(w)) : isReactive(w) ? (SS = () => X(w), ES = !0) : isArray(w) ? (DS = !0, ES = w.some((w) => isReactive(w) || isShallow(w)), SS = () => w.map((w) => {
		if (isRef(w)) return w.value;
		if (isReactive(w)) return X(w);
		if (isFunction(w)) return J ? J(w, 2) : w();
	})) : SS = isFunction(w) ? T ? J ? () => J(w, 2) : w : () => {
		if (CS) {
			pauseTracking();
			try {
				CS();
			} finally {
				resetTracking();
			}
		}
		let T = activeWatcher;
		activeWatcher = Q;
		try {
			return J ? J(w, 3, [TS]) : w(TS);
		} finally {
			activeWatcher = T;
		}
	} : NOOP, T && U) {
		let w = SS, T = U === !0 ? Infinity : U;
		SS = () => traverse(w(), T);
	}
	let OS = getCurrentScope(), kS = () => {
		Q.stop(), OS && OS.active && remove(OS.effects, Q);
	};
	if (G && T) {
		let w = T;
		T = (...T) => {
			w(...T), kS();
		};
	}
	let AS = DS ? Array(w.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE, jS = (w) => {
		if (!(!(Q.flags & 1) || !Q.dirty && !w)) if (T) {
			let w = Q.run();
			if (U || ES || (DS ? w.some((w, T) => hasChanged(w, AS[T])) : hasChanged(w, AS))) {
				CS && CS();
				let O = activeWatcher;
				activeWatcher = Q;
				try {
					let O = [
						w,
						AS === INITIAL_WATCHER_VALUE ? void 0 : DS && AS[0] === INITIAL_WATCHER_VALUE ? [] : AS,
						TS
					];
					AS = w, J ? J(T, 3, O) : T(...O);
				} finally {
					activeWatcher = O;
				}
			}
		} else Q.run();
	};
	return q && q(jS), Q = new ReactiveEffect(SS), Q.scheduler = K ? () => K(jS, !1) : jS, TS = (w) => onWatcherCleanup(w, !1, Q), CS = Q.onStop = () => {
		let w = cleanupMap.get(Q);
		if (w) {
			if (J) J(w, 4);
			else for (let T of w) T();
			cleanupMap.delete(Q);
		}
	}, T ? j ? jS(!0) : AS = Q.run() : K ? K(jS.bind(null, !0), !0) : Q.run(), kS.pause = Q.pause.bind(Q), kS.resume = Q.resume.bind(Q), kS.stop = kS, kS;
}
function traverse(w, T = Infinity, O) {
	if (T <= 0 || !isObject(w) || w.__v_skip || (O ||= /* @__PURE__ */ new Map(), (O.get(w) || 0) >= T)) return w;
	if (O.set(w, T), T--, isRef(w)) traverse(w.value, T, O);
	else if (isArray(w)) for (let j = 0; j < w.length; j++) traverse(w[j], T, O);
	else if (isSet(w) || isMap(w)) w.forEach((w) => {
		traverse(w, T, O);
	});
	else if (isPlainObject(w)) {
		for (let j in w) traverse(w[j], T, O);
		for (let j of Object.getOwnPropertySymbols(w)) Object.prototype.propertyIsEnumerable.call(w, j) && traverse(w[j], T, O);
	}
	return w;
}
/**
* @vue/runtime-core v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function callWithErrorHandling(w, T, O, j) {
	try {
		return j ? w(...j) : w();
	} catch (w) {
		handleError(w, T, O);
	}
}
function callWithAsyncErrorHandling(w, T, O, j) {
	if (isFunction(w)) {
		let F = callWithErrorHandling(w, T, O, j);
		return F && isPromise(F) && F.catch((w) => {
			handleError(w, T, O);
		}), F;
	}
	if (isArray(w)) {
		let F = [];
		for (let U = 0; U < w.length; U++) F.push(callWithAsyncErrorHandling(w[U], T, O, j));
		return F;
	}
}
function handleError(w, T, O, j = !0) {
	let U = T ? T.vnode : null, { errorHandler: W, throwUnhandledErrorInProduction: G } = T && T.appContext.config || EMPTY_OBJ;
	if (T) {
		let j = T.parent, F = T.proxy, U = `https://vuejs.org/error-reference/#runtime-${O}`;
		for (; j;) {
			let T = j.ec;
			if (T) {
				for (let O = 0; O < T.length; O++) if (T[O](w, F, U) === !1) return;
			}
			j = j.parent;
		}
		if (W) {
			pauseTracking(), callWithErrorHandling(W, null, 10, [
				w,
				F,
				U
			]), resetTracking();
			return;
		}
	}
	logError(w, O, U, j, G);
}
function logError(w, T, O, j = !0, F = !1) {
	if (F) throw w;
	console.error(w);
}
var queue = [], flushIndex = -1, pendingPostFlushCbs = [], activePostFlushCbs = null, postFlushIndex = 0, resolvedPromise = /* @__PURE__ */ Promise.resolve(), currentFlushPromise = null;
function nextTick(w) {
	let T = currentFlushPromise || resolvedPromise;
	return w ? T.then(this ? w.bind(this) : w) : T;
}
function findInsertionIndex(w) {
	let T = flushIndex + 1, O = queue.length;
	for (; T < O;) {
		let j = T + O >>> 1, F = queue[j], U = getId(F);
		U < w || U === w && F.flags & 2 ? T = j + 1 : O = j;
	}
	return T;
}
function queueJob(w) {
	if (!(w.flags & 1)) {
		let T = getId(w), O = queue[queue.length - 1];
		!O || !(w.flags & 2) && T >= getId(O) ? queue.push(w) : queue.splice(findInsertionIndex(T), 0, w), w.flags |= 1, queueFlush();
	}
}
function queueFlush() {
	currentFlushPromise ||= resolvedPromise.then(flushJobs);
}
function queuePostFlushCb(w) {
	isArray(w) ? pendingPostFlushCbs.push(...w) : activePostFlushCbs && w.id === -1 ? activePostFlushCbs.splice(postFlushIndex + 1, 0, w) : w.flags & 1 || (pendingPostFlushCbs.push(w), w.flags |= 1), queueFlush();
}
function flushPreFlushCbs(w, T, O = flushIndex + 1) {
	for (; O < queue.length; O++) {
		let T = queue[O];
		if (T && T.flags & 2) {
			if (w && T.id !== w.uid) continue;
			queue.splice(O, 1), O--, T.flags & 4 && (T.flags &= -2), T(), T.flags & 4 || (T.flags &= -2);
		}
	}
}
function flushPostFlushCbs(w) {
	if (pendingPostFlushCbs.length) {
		let w = [...new Set(pendingPostFlushCbs)].sort((w, T) => getId(w) - getId(T));
		if (pendingPostFlushCbs.length = 0, activePostFlushCbs) {
			activePostFlushCbs.push(...w);
			return;
		}
		for (activePostFlushCbs = w, postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
			let w = activePostFlushCbs[postFlushIndex];
			w.flags & 4 && (w.flags &= -2), w.flags & 8 || w(), w.flags &= -2;
		}
		activePostFlushCbs = null, postFlushIndex = 0;
	}
}
var getId = (w) => w.id == null ? w.flags & 2 ? -1 : Infinity : w.id;
function flushJobs(w) {
	try {
		for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
			let w = queue[flushIndex];
			w && !(w.flags & 8) && (w.flags & 4 && (w.flags &= -2), callWithErrorHandling(w, w.i, w.i ? 15 : 14), w.flags & 4 || (w.flags &= -2));
		}
	} finally {
		for (; flushIndex < queue.length; flushIndex++) {
			let w = queue[flushIndex];
			w && (w.flags &= -2);
		}
		flushIndex = -1, queue.length = 0, flushPostFlushCbs(w), currentFlushPromise = null, (queue.length || pendingPostFlushCbs.length) && flushJobs(w);
	}
}
var currentRenderingInstance = null, currentScopeId = null;
function setCurrentRenderingInstance(w) {
	let T = currentRenderingInstance;
	return currentRenderingInstance = w, currentScopeId = w && w.type.__scopeId || null, T;
}
function withCtx(w, T = currentRenderingInstance, O) {
	if (!T || w._n) return w;
	let j = (...O) => {
		j._d && setBlockTracking(-1);
		let F = setCurrentRenderingInstance(T), U;
		try {
			U = w(...O);
		} finally {
			setCurrentRenderingInstance(F), j._d && setBlockTracking(1);
		}
		return U;
	};
	return j._n = !0, j._c = !0, j._d = !0, j;
}
function invokeDirectiveHook(w, T, O, j) {
	let F = w.dirs, U = T && T.dirs;
	for (let W = 0; W < F.length; W++) {
		let G = F[W];
		U && (G.oldValue = U[W].value);
		let K = G.dir[j];
		K && (pauseTracking(), callWithAsyncErrorHandling(K, O, 8, [
			w.el,
			G,
			w,
			T
		]), resetTracking());
	}
}
function provide(w, T) {
	if (currentInstance) {
		let O = currentInstance.provides, j = currentInstance.parent && currentInstance.parent.provides;
		j === O && (O = currentInstance.provides = Object.create(j)), O[w] = T;
	}
}
function inject(w, T, O = !1) {
	let j = getCurrentInstance();
	if (j || currentApp) {
		let F = currentApp ? currentApp._context.provides : j ? j.parent == null || j.ce ? j.vnode.appContext && j.vnode.appContext.provides : j.parent.provides : void 0;
		if (F && w in F) return F[w];
		if (arguments.length > 1) return O && isFunction(T) ? T.call(j && j.proxy) : T;
	}
}
var ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx"), useSSRContext = () => inject(ssrContextKey);
function watch(w, T, O) {
	return doWatch(w, T, O);
}
function doWatch(w, T, O = EMPTY_OBJ) {
	let { immediate: j, deep: U, flush: G, once: K } = O, q = extend({}, O), Y = T && j || !T && G !== "post", X;
	if (isInSSRComponentSetup) {
		if (G === "sync") {
			let w = useSSRContext();
			X = w.__watcherHandles ||= [];
		} else if (!Y) {
			let w = () => {};
			return w.stop = NOOP, w.resume = NOOP, w.pause = NOOP, w;
		}
	}
	let Q = currentInstance;
	q.call = (w, T, O) => callWithAsyncErrorHandling(w, Q, T, O);
	let xS = !1;
	G === "post" ? q.scheduler = (w) => {
		queuePostRenderEffect(w, Q && Q.suspense);
	} : G !== "sync" && (xS = !0, q.scheduler = (w, T) => {
		T ? w() : queueJob(w);
	}), q.augmentJob = (w) => {
		T && (w.flags |= 4), xS && (w.flags |= 2, Q && (w.id = Q.uid, w.i = Q));
	};
	let SS = watch$1(w, T, q);
	return isInSSRComponentSetup && (X ? X.push(SS) : Y && SS()), SS;
}
function instanceWatch(w, T, O) {
	let j = this.proxy, F = isString(w) ? w.includes(".") ? createPathGetter(j, w) : () => j[w] : w.bind(j, j), U;
	isFunction(T) ? U = T : (U = T.handler, O = T);
	let W = setCurrentInstance(this), G = doWatch(F, U.bind(j), O);
	return W(), G;
}
function createPathGetter(w, T) {
	let O = T.split(".");
	return () => {
		let T = w;
		for (let w = 0; w < O.length && T; w++) T = T[O[w]];
		return T;
	};
}
var TeleportEndKey = /* @__PURE__ */ Symbol("_vte"), isTeleport = (w) => w.__isTeleport, leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
function setTransitionHooks(w, T) {
	w.shapeFlag & 6 && w.component ? (w.transition = T, setTransitionHooks(w.component.subTree, T)) : w.shapeFlag & 128 ? (w.ssContent.transition = T.clone(w.ssContent), w.ssFallback.transition = T.clone(w.ssFallback)) : w.transition = T;
}
/* @__NO_SIDE_EFFECTS__ */
function defineComponent(w, T) {
	return isFunction(w) ? /* @__PURE__ */ (() => extend({ name: w.name }, T, { setup: w }))() : w;
}
function markAsyncBoundary(w) {
	w.ids = [
		w.ids[0] + w.ids[2]++ + "-",
		0,
		0
	];
}
var pendingSetRefMap = /* @__PURE__ */ new WeakMap();
function setRef(w, T, O, j, U = !1) {
	if (isArray(w)) {
		w.forEach((w, F) => setRef(w, T && (isArray(T) ? T[F] : T), O, j, U));
		return;
	}
	if (isAsyncWrapper(j) && !U) {
		j.shapeFlag & 512 && j.type.__asyncResolved && j.component.subTree.component && setRef(w, T, O, j.component.subTree);
		return;
	}
	let W = j.shapeFlag & 4 ? getComponentPublicInstance(j.component) : j.el, K = U ? null : W, { i: q, r: J } = w, X = T && T.r, SS = q.refs === EMPTY_OBJ ? q.refs = {} : q.refs, CS = q.setupState, ES = toRaw(CS), DS = CS === EMPTY_OBJ ? NO : (w) => hasOwn(ES, w), OS = (w) => !0;
	if (X != null && X !== J) {
		if (invalidatePendingSetRef(T), isString(X)) SS[X] = null, DS(X) && (CS[X] = null);
		else if (isRef(X)) {
			OS(X) && (X.value = null);
			let w = T;
			w.k && (SS[w.k] = null);
		}
	}
	if (isFunction(J)) callWithErrorHandling(J, q, 12, [K, SS]);
	else {
		let T = isString(J), j = isRef(J);
		if (T || j) {
			let F = () => {
				if (w.f) {
					let O = T ? DS(J) ? CS[J] : SS[J] : OS(J) || !w.k ? J.value : SS[w.k];
					if (U) isArray(O) && remove(O, W);
					else if (isArray(O)) O.includes(W) || O.push(W);
					else if (T) SS[J] = [W], DS(J) && (CS[J] = SS[J]);
					else {
						let T = [W];
						OS(J) && (J.value = T), w.k && (SS[w.k] = T);
					}
				} else T ? (SS[J] = K, DS(J) && (CS[J] = K)) : j && (OS(J) && (J.value = K), w.k && (SS[w.k] = K));
			};
			if (K) {
				let T = () => {
					F(), pendingSetRefMap.delete(w);
				};
				T.id = -1, pendingSetRefMap.set(w, T), queuePostRenderEffect(T, O);
			} else invalidatePendingSetRef(w), F();
		}
	}
}
function invalidatePendingSetRef(w) {
	let T = pendingSetRefMap.get(w);
	T && (T.flags |= 8, pendingSetRefMap.delete(w));
}
getGlobalThis().requestIdleCallback, getGlobalThis().cancelIdleCallback;
var isAsyncWrapper = (w) => !!w.type.__asyncLoader, isKeepAlive = (w) => w.type.__isKeepAlive;
function onActivated(w, T) {
	registerKeepAliveHook(w, "a", T);
}
function onDeactivated(w, T) {
	registerKeepAliveHook(w, "da", T);
}
function registerKeepAliveHook(w, T, O = currentInstance) {
	let j = w.__wdc ||= () => {
		let T = O;
		for (; T;) {
			if (T.isDeactivated) return;
			T = T.parent;
		}
		return w();
	};
	if (injectHook(T, j, O), O) {
		let w = O.parent;
		for (; w && w.parent;) isKeepAlive(w.parent.vnode) && injectToKeepAliveRoot(j, T, O, w), w = w.parent;
	}
}
function injectToKeepAliveRoot(w, T, O, j) {
	let F = injectHook(T, w, j, !0);
	onUnmounted(() => {
		remove(j[T], F);
	}, O);
}
function injectHook(w, T, O = currentInstance, j = !1) {
	if (O) {
		let F = O[w] || (O[w] = []), U = T.__weh ||= (...j) => {
			pauseTracking();
			let F = setCurrentInstance(O), U = callWithAsyncErrorHandling(T, O, w, j);
			return F(), resetTracking(), U;
		};
		return j ? F.unshift(U) : F.push(U), U;
	}
}
var createHook = (w) => (T, O = currentInstance) => {
	(!isInSSRComponentSetup || w === "sp") && injectHook(w, (...w) => T(...w), O);
}, onBeforeMount = createHook("bm"), onMounted = createHook("m"), onBeforeUpdate = createHook("bu"), onUpdated = createHook("u"), onBeforeUnmount = createHook("bum"), onUnmounted = createHook("um"), onServerPrefetch = createHook("sp"), onRenderTriggered = createHook("rtg"), onRenderTracked = createHook("rtc");
function onErrorCaptured(w, T = currentInstance) {
	injectHook("ec", w, T);
}
var COMPONENTS = "components";
function resolveComponent(w, T) {
	return resolveAsset(COMPONENTS, w, !0, T) || w;
}
var NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
function resolveAsset(w, T, O = !0, j = !1) {
	let F = currentRenderingInstance || currentInstance;
	if (F) {
		let O = F.type;
		if (w === COMPONENTS) {
			let w = getComponentName(O, !1);
			if (w && (w === T || w === camelize(T) || w === capitalize(camelize(T)))) return O;
		}
		let U = resolve(F[w] || O[w], T) || resolve(F.appContext[w], T);
		return !U && j ? O : U;
	}
}
function resolve(w, T) {
	return w && (w[T] || w[camelize(T)] || w[capitalize(camelize(T))]);
}
function renderList(w, T, O, j) {
	let F, U = O && O[j], W = isArray(w);
	if (W || isString(w)) {
		let O = W && isReactive(w), j = !1, G = !1;
		O && (j = !isShallow(w), G = isReadonly(w), w = shallowReadArray(w)), F = Array(w.length);
		for (let O = 0, W = w.length; O < W; O++) F[O] = T(j ? G ? toReadonly(toReactive(w[O])) : toReactive(w[O]) : w[O], O, void 0, U && U[O]);
	} else if (typeof w == "number") {
		F = Array(w);
		for (let O = 0; O < w; O++) F[O] = T(O + 1, O, void 0, U && U[O]);
	} else if (isObject(w)) if (w[Symbol.iterator]) F = Array.from(w, (w, O) => T(w, O, void 0, U && U[O]));
	else {
		let O = Object.keys(w);
		F = Array(O.length);
		for (let j = 0, W = O.length; j < W; j++) {
			let W = O[j];
			F[j] = T(w[W], W, j, U && U[j]);
		}
	}
	else F = [];
	return O && (O[j] = F), F;
}
var getPublicInstance = (w) => w ? isStatefulComponent(w) ? getComponentPublicInstance(w) : getPublicInstance(w.parent) : null, publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
	$: (w) => w,
	$el: (w) => w.vnode.el,
	$data: (w) => w.data,
	$props: (w) => w.props,
	$attrs: (w) => w.attrs,
	$slots: (w) => w.slots,
	$refs: (w) => w.refs,
	$parent: (w) => getPublicInstance(w.parent),
	$root: (w) => getPublicInstance(w.root),
	$host: (w) => w.ce,
	$emit: (w) => w.emit,
	$options: (w) => resolveMergedOptions(w),
	$forceUpdate: (w) => w.f ||= () => {
		queueJob(w.update);
	},
	$nextTick: (w) => w.n ||= nextTick.bind(w.proxy),
	$watch: (w) => instanceWatch.bind(w)
}), hasSetupBinding = (w, T) => w !== EMPTY_OBJ && !w.__isScriptSetup && hasOwn(w, T), PublicInstanceProxyHandlers = {
	get({ _: w }, T) {
		if (T === "__v_skip") return !0;
		let { ctx: O, setupState: j, data: U, props: W, accessCache: G, type: K, appContext: q } = w;
		if (T[0] !== "$") {
			let w = G[T];
			if (w !== void 0) switch (w) {
				case 1: return j[T];
				case 2: return U[T];
				case 4: return O[T];
				case 3: return W[T];
			}
			else if (hasSetupBinding(j, T)) return G[T] = 1, j[T];
			else if (U !== EMPTY_OBJ && hasOwn(U, T)) return G[T] = 2, U[T];
			else if (hasOwn(W, T)) return G[T] = 3, W[T];
			else if (O !== EMPTY_OBJ && hasOwn(O, T)) return G[T] = 4, O[T];
			else shouldCacheAccess && (G[T] = 0);
		}
		let J = publicPropertiesMap[T], Y, X;
		if (J) return T === "$attrs" && track(w.attrs, "get", ""), J(w);
		if ((Y = K.__cssModules) && (Y = Y[T])) return Y;
		if (O !== EMPTY_OBJ && hasOwn(O, T)) return G[T] = 4, O[T];
		if (X = q.config.globalProperties, hasOwn(X, T)) return X[T];
	},
	set({ _: w }, T, O) {
		let { data: j, setupState: U, ctx: W } = w;
		return hasSetupBinding(U, T) ? (U[T] = O, !0) : j !== EMPTY_OBJ && hasOwn(j, T) ? (j[T] = O, !0) : hasOwn(w.props, T) || T[0] === "$" && T.slice(1) in w ? !1 : (W[T] = O, !0);
	},
	has({ _: { data: w, setupState: T, accessCache: O, ctx: j, appContext: U, props: W, type: G } }, K) {
		let q;
		return !!(O[K] || w !== EMPTY_OBJ && K[0] !== "$" && hasOwn(w, K) || hasSetupBinding(T, K) || hasOwn(W, K) || hasOwn(j, K) || hasOwn(publicPropertiesMap, K) || hasOwn(U.config.globalProperties, K) || (q = G.__cssModules) && q[K]);
	},
	defineProperty(w, T, O) {
		return O.get == null ? hasOwn(O, "value") && this.set(w, T, O.value, null) : w._.accessCache[T] = 0, Reflect.defineProperty(w, T, O);
	}
};
function normalizePropsOrEmits(w) {
	return isArray(w) ? w.reduce((w, T) => (w[T] = null, w), {}) : w;
}
var shouldCacheAccess = !0;
function applyOptions(w) {
	let T = resolveMergedOptions(w), O = w.proxy, j = w.ctx;
	shouldCacheAccess = !1, T.beforeCreate && callHook(T.beforeCreate, w, "bc");
	let { data: F, computed: U, methods: G, watch: K, provide: q, inject: J, created: Y, beforeMount: X, mounted: Q, beforeUpdate: SS, updated: CS, activated: TS, deactivated: ES, beforeDestroy: OS, beforeUnmount: kS, destroyed: AS, unmounted: jS, render: MS, renderTracked: NS, renderTriggered: PS, errorCaptured: FS, serverPrefetch: IS, expose: LS, inheritAttrs: RS, components: zS, directives: BS, filters: VS } = T;
	if (J && resolveInjections(J, j, null), G) for (let w in G) {
		let T = G[w];
		isFunction(T) && (j[w] = T.bind(O));
	}
	if (F) {
		let T = F.call(O, O);
		isObject(T) && (w.data = reactive(T));
	}
	if (shouldCacheAccess = !0, U) for (let w in U) {
		let T = U[w], F = computed({
			get: isFunction(T) ? T.bind(O, O) : isFunction(T.get) ? T.get.bind(O, O) : NOOP,
			set: !isFunction(T) && isFunction(T.set) ? T.set.bind(O) : NOOP
		});
		Object.defineProperty(j, w, {
			enumerable: !0,
			configurable: !0,
			get: () => F.value,
			set: (w) => F.value = w
		});
	}
	if (K) for (let w in K) createWatcher(K[w], j, O, w);
	if (q) {
		let w = isFunction(q) ? q.call(O) : q;
		Reflect.ownKeys(w).forEach((T) => {
			provide(T, w[T]);
		});
	}
	Y && callHook(Y, w, "c");
	function HS(w, T) {
		isArray(T) ? T.forEach((T) => w(T.bind(O))) : T && w(T.bind(O));
	}
	if (HS(onBeforeMount, X), HS(onMounted, Q), HS(onBeforeUpdate, SS), HS(onUpdated, CS), HS(onActivated, TS), HS(onDeactivated, ES), HS(onErrorCaptured, FS), HS(onRenderTracked, NS), HS(onRenderTriggered, PS), HS(onBeforeUnmount, kS), HS(onUnmounted, jS), HS(onServerPrefetch, IS), isArray(LS)) if (LS.length) {
		let T = w.exposed ||= {};
		LS.forEach((w) => {
			Object.defineProperty(T, w, {
				get: () => O[w],
				set: (T) => O[w] = T,
				enumerable: !0
			});
		});
	} else w.exposed ||= {};
	MS && w.render === NOOP && (w.render = MS), RS != null && (w.inheritAttrs = RS), zS && (w.components = zS), BS && (w.directives = BS), IS && markAsyncBoundary(w);
}
function resolveInjections(w, T, O = NOOP) {
	for (let O in isArray(w) && (w = normalizeInject(w)), w) {
		let j = w[O], F;
		F = isObject(j) ? "default" in j ? inject(j.from || O, j.default, !0) : inject(j.from || O) : inject(j), isRef(F) ? Object.defineProperty(T, O, {
			enumerable: !0,
			configurable: !0,
			get: () => F.value,
			set: (w) => F.value = w
		}) : T[O] = F;
	}
}
function callHook(w, T, O) {
	callWithAsyncErrorHandling(isArray(w) ? w.map((w) => w.bind(T.proxy)) : w.bind(T.proxy), T, O);
}
function createWatcher(w, T, O, j) {
	let F = j.includes(".") ? createPathGetter(O, j) : () => O[j];
	if (isString(w)) {
		let O = T[w];
		isFunction(O) && watch(F, O);
	} else if (isFunction(w)) watch(F, w.bind(O));
	else if (isObject(w)) if (isArray(w)) w.forEach((w) => createWatcher(w, T, O, j));
	else {
		let j = isFunction(w.handler) ? w.handler.bind(O) : T[w.handler];
		isFunction(j) && watch(F, j, w);
	}
}
function resolveMergedOptions(w) {
	let T = w.type, { mixins: O, extends: j } = T, { mixins: F, optionsCache: U, config: { optionMergeStrategies: W } } = w.appContext, G = U.get(T), K;
	return G ? K = G : !F.length && !O && !j ? K = T : (K = {}, F.length && F.forEach((w) => mergeOptions(K, w, W, !0)), mergeOptions(K, T, W)), isObject(T) && U.set(T, K), K;
}
function mergeOptions(w, T, O, j = !1) {
	let { mixins: F, extends: U } = T;
	for (let W in U && mergeOptions(w, U, O, !0), F && F.forEach((T) => mergeOptions(w, T, O, !0)), T) if (!(j && W === "expose")) {
		let j = internalOptionMergeStrats[W] || O && O[W];
		w[W] = j ? j(w[W], T[W]) : T[W];
	}
	return w;
}
var internalOptionMergeStrats = {
	data: mergeDataFn,
	props: mergeEmitsOrPropsOptions,
	emits: mergeEmitsOrPropsOptions,
	methods: mergeObjectOptions,
	computed: mergeObjectOptions,
	beforeCreate: mergeAsArray,
	created: mergeAsArray,
	beforeMount: mergeAsArray,
	mounted: mergeAsArray,
	beforeUpdate: mergeAsArray,
	updated: mergeAsArray,
	beforeDestroy: mergeAsArray,
	beforeUnmount: mergeAsArray,
	destroyed: mergeAsArray,
	unmounted: mergeAsArray,
	activated: mergeAsArray,
	deactivated: mergeAsArray,
	errorCaptured: mergeAsArray,
	serverPrefetch: mergeAsArray,
	components: mergeObjectOptions,
	directives: mergeObjectOptions,
	watch: mergeWatchOptions,
	provide: mergeDataFn,
	inject: mergeInject
};
function mergeDataFn(w, T) {
	return T ? w ? function() {
		return extend(isFunction(w) ? w.call(this, this) : w, isFunction(T) ? T.call(this, this) : T);
	} : T : w;
}
function mergeInject(w, T) {
	return mergeObjectOptions(normalizeInject(w), normalizeInject(T));
}
function normalizeInject(w) {
	if (isArray(w)) {
		let T = {};
		for (let O = 0; O < w.length; O++) T[w[O]] = w[O];
		return T;
	}
	return w;
}
function mergeAsArray(w, T) {
	return w ? [...new Set([].concat(w, T))] : T;
}
function mergeObjectOptions(w, T) {
	return w ? extend(/* @__PURE__ */ Object.create(null), w, T) : T;
}
function mergeEmitsOrPropsOptions(w, T) {
	return w ? isArray(w) && isArray(T) ? [.../* @__PURE__ */ new Set([...w, ...T])] : extend(/* @__PURE__ */ Object.create(null), normalizePropsOrEmits(w), normalizePropsOrEmits(T ?? {})) : T;
}
function mergeWatchOptions(w, T) {
	if (!w) return T;
	if (!T) return w;
	let O = extend(/* @__PURE__ */ Object.create(null), w);
	for (let j in T) O[j] = mergeAsArray(w[j], T[j]);
	return O;
}
function createAppContext() {
	return {
		app: null,
		config: {
			isNativeTag: NO,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var uid$1 = 0;
function createAppAPI(w, T) {
	return function(O, j = null) {
		isFunction(O) || (O = extend({}, O)), j != null && !isObject(j) && (j = null);
		let F = createAppContext(), U = /* @__PURE__ */ new WeakSet(), W = [], G = !1, K = F.app = {
			_uid: uid$1++,
			_component: O,
			_props: j,
			_container: null,
			_context: F,
			_instance: null,
			version,
			get config() {
				return F.config;
			},
			set config(w) {},
			use(w, ...T) {
				return U.has(w) || (w && isFunction(w.install) ? (U.add(w), w.install(K, ...T)) : isFunction(w) && (U.add(w), w(K, ...T))), K;
			},
			mixin(w) {
				return F.mixins.includes(w) || F.mixins.push(w), K;
			},
			component(w, T) {
				return T ? (F.components[w] = T, K) : F.components[w];
			},
			directive(w, T) {
				return T ? (F.directives[w] = T, K) : F.directives[w];
			},
			mount(U, W, q) {
				if (!G) {
					let J = K._ceVNode || createVNode(O, j);
					return J.appContext = F, q === !0 ? q = "svg" : q === !1 && (q = void 0), W && T ? T(J, U) : w(J, U, q), G = !0, K._container = U, U.__vue_app__ = K, getComponentPublicInstance(J.component);
				}
			},
			onUnmount(w) {
				W.push(w);
			},
			unmount() {
				G && (callWithAsyncErrorHandling(W, K._instance, 16), w(null, K._container), delete K._container.__vue_app__);
			},
			provide(w, T) {
				return F.provides[w] = T, K;
			},
			runWithContext(w) {
				let T = currentApp;
				currentApp = K;
				try {
					return w();
				} finally {
					currentApp = T;
				}
			}
		};
		return K;
	};
}
var currentApp = null, getModelModifiers = (w, T) => T === "modelValue" || T === "model-value" ? w.modelModifiers : w[`${T}Modifiers`] || w[`${camelize(T)}Modifiers`] || w[`${hyphenate(T)}Modifiers`];
function emit(w, T, ...O) {
	if (w.isUnmounted) return;
	let j = w.vnode.props || EMPTY_OBJ, U = O, W = T.startsWith("update:"), G = W && getModelModifiers(j, T.slice(7));
	G && (G.trim && (U = O.map((w) => isString(w) ? w.trim() : w)), G.number && (U = O.map(looseToNumber)));
	let K, q = j[K = toHandlerKey(T)] || j[K = toHandlerKey(camelize(T))];
	!q && W && (q = j[K = toHandlerKey(hyphenate(T))]), q && callWithAsyncErrorHandling(q, w, 6, U);
	let J = j[K + "Once"];
	if (J) {
		if (!w.emitted) w.emitted = {};
		else if (w.emitted[K]) return;
		w.emitted[K] = !0, callWithAsyncErrorHandling(J, w, 6, U);
	}
}
var mixinEmitsCache = /* @__PURE__ */ new WeakMap();
function normalizeEmitsOptions(w, T, O = !1) {
	let j = O ? mixinEmitsCache : T.emitsCache, F = j.get(w);
	if (F !== void 0) return F;
	let U = w.emits, W = {}, G = !1;
	if (!isFunction(w)) {
		let j = (w) => {
			let O = normalizeEmitsOptions(w, T, !0);
			O && (G = !0, extend(W, O));
		};
		!O && T.mixins.length && T.mixins.forEach(j), w.extends && j(w.extends), w.mixins && w.mixins.forEach(j);
	}
	return !U && !G ? (isObject(w) && j.set(w, null), null) : (isArray(U) ? U.forEach((w) => W[w] = null) : extend(W, U), isObject(w) && j.set(w, W), W);
}
function isEmitListener(w, T) {
	return !w || !isOn(T) ? !1 : (T = T.slice(2).replace(/Once$/, ""), hasOwn(w, T[0].toLowerCase() + T.slice(1)) || hasOwn(w, hyphenate(T)) || hasOwn(w, T));
}
function renderComponentRoot(w) {
	let { type: T, vnode: O, proxy: j, withProxy: F, propsOptions: [U], slots: W, attrs: G, emit: K, render: J, renderCache: Y, props: X, data: Q, setupState: xS, ctx: SS, inheritAttrs: CS } = w, wS = setCurrentRenderingInstance(w), TS, ES;
	try {
		if (O.shapeFlag & 4) {
			let w = F || j, T = w;
			TS = normalizeVNode(J.call(T, w, Y, X, xS, Q, SS)), ES = G;
		} else {
			let w = T;
			TS = normalizeVNode(w.length > 1 ? w(X, {
				attrs: G,
				slots: W,
				emit: K
			}) : w(X, null)), ES = T.props ? G : getFunctionalFallthrough(G);
		}
	} catch (T) {
		blockStack.length = 0, handleError(T, w, 1), TS = createVNode(Comment);
	}
	let DS = TS;
	if (ES && CS !== !1) {
		let w = Object.keys(ES), { shapeFlag: T } = DS;
		w.length && T & 7 && (U && w.some(isModelListener) && (ES = filterModelListeners(ES, U)), DS = cloneVNode(DS, ES, !1, !0));
	}
	return O.dirs && (DS = cloneVNode(DS, null, !1, !0), DS.dirs = DS.dirs ? DS.dirs.concat(O.dirs) : O.dirs), O.transition && setTransitionHooks(DS, O.transition), TS = DS, setCurrentRenderingInstance(wS), TS;
}
var getFunctionalFallthrough = (w) => {
	let T;
	for (let O in w) (O === "class" || O === "style" || isOn(O)) && ((T ||= {})[O] = w[O]);
	return T;
}, filterModelListeners = (w, T) => {
	let O = {};
	for (let j in w) (!isModelListener(j) || !(j.slice(9) in T)) && (O[j] = w[j]);
	return O;
};
function shouldUpdateComponent(w, T, O) {
	let { props: j, children: F, component: U } = w, { props: W, children: G, patchFlag: K } = T, q = U.emitsOptions;
	if (T.dirs || T.transition) return !0;
	if (O && K >= 0) {
		if (K & 1024) return !0;
		if (K & 16) return j ? hasPropsChanged(j, W, q) : !!W;
		if (K & 8) {
			let w = T.dynamicProps;
			for (let T = 0; T < w.length; T++) {
				let O = w[T];
				if (W[O] !== j[O] && !isEmitListener(q, O)) return !0;
			}
		}
	} else return (F || G) && (!G || !G.$stable) ? !0 : j === W ? !1 : j ? W ? hasPropsChanged(j, W, q) : !0 : !!W;
	return !1;
}
function hasPropsChanged(w, T, O) {
	let j = Object.keys(T);
	if (j.length !== Object.keys(w).length) return !0;
	for (let F = 0; F < j.length; F++) {
		let U = j[F];
		if (T[U] !== w[U] && !isEmitListener(O, U)) return !0;
	}
	return !1;
}
function updateHOCHostEl({ vnode: w, parent: T }, O) {
	for (; T;) {
		let j = T.subTree;
		if (j.suspense && j.suspense.activeBranch === w && (j.el = w.el), j === w) (w = T.vnode).el = O, T = T.parent;
		else break;
	}
}
var internalObjectProto = {}, createInternalObject = () => Object.create(internalObjectProto), isInternalObject = (w) => Object.getPrototypeOf(w) === internalObjectProto;
function initProps(w, T, O, j = !1) {
	let F = {}, U = createInternalObject();
	for (let O in w.propsDefaults = /* @__PURE__ */ Object.create(null), setFullProps(w, T, F, U), w.propsOptions[0]) O in F || (F[O] = void 0);
	O ? w.props = j ? F : shallowReactive(F) : w.type.props ? w.props = F : w.props = U, w.attrs = U;
}
function updateProps(w, T, O, j) {
	let { props: F, attrs: U, vnode: { patchFlag: W } } = w, G = toRaw(F), [K] = w.propsOptions, q = !1;
	if ((j || W > 0) && !(W & 16)) {
		if (W & 8) {
			let O = w.vnode.dynamicProps;
			for (let j = 0; j < O.length; j++) {
				let W = O[j];
				if (isEmitListener(w.emitsOptions, W)) continue;
				let J = T[W];
				if (K) if (hasOwn(U, W)) J !== U[W] && (U[W] = J, q = !0);
				else {
					let T = camelize(W);
					F[T] = resolvePropValue(K, G, T, J, w, !1);
				}
				else J !== U[W] && (U[W] = J, q = !0);
			}
		}
	} else {
		setFullProps(w, T, F, U) && (q = !0);
		let j;
		for (let U in G) (!T || !hasOwn(T, U) && ((j = hyphenate(U)) === U || !hasOwn(T, j))) && (K ? O && (O[U] !== void 0 || O[j] !== void 0) && (F[U] = resolvePropValue(K, G, U, void 0, w, !0)) : delete F[U]);
		if (U !== G) for (let w in U) (!T || !hasOwn(T, w)) && (delete U[w], q = !0);
	}
	q && trigger(w.attrs, "set", "");
}
function setFullProps(w, T, O, j) {
	let [U, W] = w.propsOptions, G = !1, K;
	if (T) for (let F in T) {
		if (isReservedProp(F)) continue;
		let q = T[F], J;
		U && hasOwn(U, J = camelize(F)) ? !W || !W.includes(J) ? O[J] = q : (K ||= {})[J] = q : isEmitListener(w.emitsOptions, F) || (!(F in j) || q !== j[F]) && (j[F] = q, G = !0);
	}
	if (W) {
		let T = toRaw(O), j = K || EMPTY_OBJ;
		for (let F = 0; F < W.length; F++) {
			let G = W[F];
			O[G] = resolvePropValue(U, T, G, j[G], w, !hasOwn(j, G));
		}
	}
	return G;
}
function resolvePropValue(w, T, O, j, F, U) {
	let W = w[O];
	if (W != null) {
		let w = hasOwn(W, "default");
		if (w && j === void 0) {
			let w = W.default;
			if (W.type !== Function && !W.skipFactory && isFunction(w)) {
				let { propsDefaults: U } = F;
				if (O in U) j = U[O];
				else {
					let W = setCurrentInstance(F);
					j = U[O] = w.call(null, T), W();
				}
			} else j = w;
			F.ce && F.ce._setProp(O, j);
		}
		W[0] && (U && !w ? j = !1 : W[1] && (j === "" || j === hyphenate(O)) && (j = !0));
	}
	return j;
}
var mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(w, T, O = !1) {
	let j = O ? mixinPropsCache : T.propsCache, W = j.get(w);
	if (W) return W;
	let G = w.props, K = {}, q = [], Y = !1;
	if (!isFunction(w)) {
		let j = (w) => {
			Y = !0;
			let [O, j] = normalizePropsOptions(w, T, !0);
			extend(K, O), j && q.push(...j);
		};
		!O && T.mixins.length && T.mixins.forEach(j), w.extends && j(w.extends), w.mixins && w.mixins.forEach(j);
	}
	if (!G && !Y) return isObject(w) && j.set(w, EMPTY_ARR), EMPTY_ARR;
	if (isArray(G)) for (let w = 0; w < G.length; w++) {
		let T = camelize(G[w]);
		validatePropName(T) && (K[T] = EMPTY_OBJ);
	}
	else if (G) for (let w in G) {
		let T = camelize(w);
		if (validatePropName(T)) {
			let O = G[w], j = K[T] = isArray(O) || isFunction(O) ? { type: O } : extend({}, O), F = j.type, U = !1, W = !0;
			if (isArray(F)) for (let w = 0; w < F.length; ++w) {
				let T = F[w], O = isFunction(T) && T.name;
				if (O === "Boolean") {
					U = !0;
					break;
				} else O === "String" && (W = !1);
			}
			else U = isFunction(F) && F.name === "Boolean";
			j[0] = U, j[1] = W, (U || hasOwn(j, "default")) && q.push(T);
		}
	}
	let X = [K, q];
	return isObject(w) && j.set(w, X), X;
}
function validatePropName(w) {
	return w[0] !== "$" && !isReservedProp(w);
}
var isInternalKey = (w) => w === "_" || w === "_ctx" || w === "$stable", normalizeSlotValue = (w) => isArray(w) ? w.map(normalizeVNode) : [normalizeVNode(w)], normalizeSlot = (w, T, O) => {
	if (T._n) return T;
	let j = withCtx((...w) => normalizeSlotValue(T(...w)), O);
	return j._c = !1, j;
}, normalizeObjectSlots = (w, T, O) => {
	let j = w._ctx;
	for (let O in w) {
		if (isInternalKey(O)) continue;
		let F = w[O];
		if (isFunction(F)) T[O] = normalizeSlot(O, F, j);
		else if (F != null) {
			let w = normalizeSlotValue(F);
			T[O] = () => w;
		}
	}
}, normalizeVNodeSlots = (w, T) => {
	let O = normalizeSlotValue(T);
	w.slots.default = () => O;
}, assignSlots = (w, T, O) => {
	for (let j in T) (O || !isInternalKey(j)) && (w[j] = T[j]);
}, initSlots = (w, T, O) => {
	let j = w.slots = createInternalObject();
	if (w.vnode.shapeFlag & 32) {
		let w = T._;
		w ? (assignSlots(j, T, O), O && def(j, "_", w, !0)) : normalizeObjectSlots(T, j);
	} else T && normalizeVNodeSlots(w, T);
}, updateSlots = (w, T, O) => {
	let { vnode: j, slots: U } = w, W = !0, G = EMPTY_OBJ;
	if (j.shapeFlag & 32) {
		let w = T._;
		w ? O && w === 1 ? W = !1 : assignSlots(U, T, O) : (W = !T.$stable, normalizeObjectSlots(T, U)), G = T;
	} else T && (normalizeVNodeSlots(w, T), G = { default: 1 });
	if (W) for (let w in U) !isInternalKey(w) && G[w] == null && delete U[w];
}, queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer$1(w) {
	return baseCreateRenderer(w);
}
function baseCreateRenderer(w, T) {
	let O = getGlobalThis();
	O.__VUE__ = !0;
	let { insert: j, remove: G, patchProp: K, createElement: q, createText: J, createComment: Y, setText: X, setElementText: Q, parentNode: xS, nextSibling: SS, setScopeId: CS = NOOP, insertStaticContent: wS } = w, TS = (w, T, O, j = null, F = null, U = null, W = void 0, G = null, K = !!T.dynamicChildren) => {
		if (w === T) return;
		w && !isSameVNodeType(w, T) && (j = nC(w), ZS(w, F, U, !0), w = null), T.patchFlag === -2 && (K = !1, T.dynamicChildren = null);
		let { type: q, ref: J, shapeFlag: Y } = T;
		switch (q) {
			case Text:
				ES(w, T, O, j);
				break;
			case Comment:
				DS(w, T, O, j);
				break;
			case Static:
				w ?? OS(T, O, j, W);
				break;
			case Fragment:
				zS(w, T, O, j, F, U, W, G, K);
				break;
			default: Y & 1 ? jS(w, T, O, j, F, U, W, G, K) : Y & 6 ? BS(w, T, O, j, F, U, W, G, K) : (Y & 64 || Y & 128) && q.process(w, T, O, j, F, U, W, G, K, aC);
		}
		J != null && F ? setRef(J, w && w.ref, U, T || w, !T) : J == null && w && w.ref != null && setRef(w.ref, null, U, w, !0);
	}, ES = (w, T, O, F) => {
		if (w == null) j(T.el = J(T.children), O, F);
		else {
			let O = T.el = w.el;
			T.children !== w.children && X(O, T.children);
		}
	}, DS = (w, T, O, F) => {
		w == null ? j(T.el = Y(T.children || ""), O, F) : T.el = w.el;
	}, OS = (w, T, O, j) => {
		[w.el, w.anchor] = wS(w.children, T, O, j, w.el, w.anchor);
	}, kS = ({ el: w, anchor: T }, O, F) => {
		let U;
		for (; w && w !== T;) U = SS(w), j(w, O, F), w = U;
		j(T, O, F);
	}, AS = ({ el: w, anchor: T }) => {
		let O;
		for (; w && w !== T;) O = SS(w), G(w), w = O;
		G(T);
	}, jS = (w, T, O, j, F, U, W, G, K) => {
		if (T.type === "svg" ? W = "svg" : T.type === "math" && (W = "mathml"), w == null) MS(T, O, j, F, U, W, G, K);
		else {
			let O = w.el && w.el._isVueCE ? w.el : null;
			try {
				O && O._beginPatch(), IS(w, T, F, U, W, G, K);
			} finally {
				O && O._endPatch();
			}
		}
	}, MS = (w, T, O, F, U, W, G, J) => {
		let Y, X, { props: xS, shapeFlag: SS, transition: CS, dirs: wS } = w;
		if (Y = w.el = q(w.type, W, xS && xS.is, xS), SS & 8 ? Q(Y, w.children) : SS & 16 && FS(w.children, Y, null, F, U, resolveChildrenNamespace(w, W), G, J), wS && invokeDirectiveHook(w, null, F, "created"), NS(Y, w, w.scopeId, G, F), xS) {
			for (let w in xS) w !== "value" && !isReservedProp(w) && K(Y, w, null, xS[w], W, F);
			"value" in xS && K(Y, "value", null, xS.value, W), (X = xS.onVnodeBeforeMount) && invokeVNodeHook(X, F, w);
		}
		wS && invokeDirectiveHook(w, null, F, "beforeMount");
		let TS = needTransition(U, CS);
		TS && CS.beforeEnter(Y), j(Y, T, O), ((X = xS && xS.onVnodeMounted) || TS || wS) && queuePostRenderEffect(() => {
			X && invokeVNodeHook(X, F, w), TS && CS.enter(Y), wS && invokeDirectiveHook(w, null, F, "mounted");
		}, U);
	}, NS = (w, T, O, j, F) => {
		if (O && CS(w, O), j) for (let T = 0; T < j.length; T++) CS(w, j[T]);
		if (F) {
			let O = F.subTree;
			if (T === O || isSuspense(O.type) && (O.ssContent === T || O.ssFallback === T)) {
				let T = F.vnode;
				NS(w, T, T.scopeId, T.slotScopeIds, F.parent);
			}
		}
	}, FS = (w, T, O, j, F, U, W, G, K = 0) => {
		for (let q = K; q < w.length; q++) TS(null, w[q] = G ? cloneIfMounted(w[q]) : normalizeVNode(w[q]), T, O, j, F, U, W, G);
	}, IS = (w, T, O, j, U, W, G) => {
		let q = T.el = w.el, { patchFlag: J, dynamicChildren: Y, dirs: X } = T;
		J |= w.patchFlag & 16;
		let xS = w.props || EMPTY_OBJ, SS = T.props || EMPTY_OBJ, CS;
		if (O && toggleRecurse(O, !1), (CS = SS.onVnodeBeforeUpdate) && invokeVNodeHook(CS, O, T, w), X && invokeDirectiveHook(T, w, O, "beforeUpdate"), O && toggleRecurse(O, !0), (xS.innerHTML && SS.innerHTML == null || xS.textContent && SS.textContent == null) && Q(q, ""), Y ? LS(w.dynamicChildren, Y, q, O, j, resolveChildrenNamespace(T, U), W) : G || KS(w, T, q, null, O, j, resolveChildrenNamespace(T, U), W, !1), J > 0) {
			if (J & 16) RS(q, xS, SS, O, U);
			else if (J & 2 && xS.class !== SS.class && K(q, "class", null, SS.class, U), J & 4 && K(q, "style", xS.style, SS.style, U), J & 8) {
				let w = T.dynamicProps;
				for (let T = 0; T < w.length; T++) {
					let j = w[T], F = xS[j], W = SS[j];
					(W !== F || j === "value") && K(q, j, F, W, U, O);
				}
			}
			J & 1 && w.children !== T.children && Q(q, T.children);
		} else !G && Y == null && RS(q, xS, SS, O, U);
		((CS = SS.onVnodeUpdated) || X) && queuePostRenderEffect(() => {
			CS && invokeVNodeHook(CS, O, T, w), X && invokeDirectiveHook(T, w, O, "updated");
		}, j);
	}, LS = (w, T, O, j, F, U, W) => {
		for (let G = 0; G < T.length; G++) {
			let K = w[G], q = T[G];
			TS(K, q, K.el && (K.type === Fragment || !isSameVNodeType(K, q) || K.shapeFlag & 198) ? xS(K.el) : O, null, j, F, U, W, !0);
		}
	}, RS = (w, T, O, j, U) => {
		if (T !== O) {
			if (T !== EMPTY_OBJ) for (let F in T) !isReservedProp(F) && !(F in O) && K(w, F, T[F], null, U, j);
			for (let F in O) {
				if (isReservedProp(F)) continue;
				let W = O[F], G = T[F];
				W !== G && F !== "value" && K(w, F, G, W, U, j);
			}
			"value" in O && K(w, "value", T.value, O.value, U);
		}
	}, zS = (w, T, O, F, U, W, G, K, q) => {
		let Y = T.el = w ? w.el : J(""), X = T.anchor = w ? w.anchor : J(""), { patchFlag: Q, dynamicChildren: xS, slotScopeIds: SS } = T;
		SS && (K = K ? K.concat(SS) : SS), w == null ? (j(Y, O, F), j(X, O, F), FS(T.children || [], O, X, U, W, G, K, q)) : Q > 0 && Q & 64 && xS && w.dynamicChildren && w.dynamicChildren.length === xS.length ? (LS(w.dynamicChildren, xS, O, U, W, G, K), (T.key != null || U && T === U.subTree) && traverseStaticChildren(w, T, !0)) : KS(w, T, O, X, U, W, G, K, q);
	}, BS = (w, T, O, j, F, U, W, G, K) => {
		T.slotScopeIds = G, w == null ? T.shapeFlag & 512 ? F.ctx.activate(T, O, j, W, K) : VS(T, O, j, F, U, W, K) : HS(w, T, K);
	}, VS = (w, T, O, j, F, U, W) => {
		let G = w.component = createComponentInstance(w, j, F);
		if (isKeepAlive(w) && (G.ctx.renderer = aC), setupComponent(G, !1, W), G.asyncDep) {
			if (F && F.registerDep(G, WS, W), !w.el) {
				let j = G.subTree = createVNode(Comment);
				DS(null, j, T, O), w.placeholder = j.el;
			}
		} else WS(G, w, T, O, F, U, W);
	}, HS = (w, T, O) => {
		let j = T.component = w.component;
		if (shouldUpdateComponent(w, T, O)) if (j.asyncDep && !j.asyncResolved) {
			GS(j, T, O);
			return;
		} else j.next = T, j.update();
		else T.el = w.el, j.vnode = T;
	}, WS = (w, T, O, j, F, U, W) => {
		let G = () => {
			if (w.isMounted) {
				let { next: T, bu: O, u: j, parent: K, vnode: q } = w;
				{
					let O = locateNonHydratedAsyncRoot(w);
					if (O) {
						T && (T.el = q.el, GS(w, T, W)), O.asyncDep.then(() => {
							w.isUnmounted || G();
						});
						return;
					}
				}
				let J = T, Y;
				toggleRecurse(w, !1), T ? (T.el = q.el, GS(w, T, W)) : T = q, O && invokeArrayFns(O), (Y = T.props && T.props.onVnodeBeforeUpdate) && invokeVNodeHook(Y, K, T, q), toggleRecurse(w, !0);
				let X = renderComponentRoot(w), Q = w.subTree;
				w.subTree = X, TS(Q, X, xS(Q.el), nC(Q), w, F, U), T.el = X.el, J === null && updateHOCHostEl(w, X.el), j && queuePostRenderEffect(j, F), (Y = T.props && T.props.onVnodeUpdated) && queuePostRenderEffect(() => invokeVNodeHook(Y, K, T, q), F);
			} else {
				let W, { el: G, props: K } = T, { bm: q, m: J, parent: Y, root: X, type: Q } = w, xS = isAsyncWrapper(T);
				if (toggleRecurse(w, !1), q && invokeArrayFns(q), !xS && (W = K && K.onVnodeBeforeMount) && invokeVNodeHook(W, Y, T), toggleRecurse(w, !0), G && sC) {
					let T = () => {
						w.subTree = renderComponentRoot(w), sC(G, w.subTree, w, F, null);
					};
					xS && Q.__asyncHydrate ? Q.__asyncHydrate(G, w, T) : T();
				} else {
					X.ce && X.ce._def.shadowRoot !== !1 && X.ce._injectChildStyle(Q);
					let W = w.subTree = renderComponentRoot(w);
					TS(null, W, O, j, w, F, U), T.el = W.el;
				}
				if (J && queuePostRenderEffect(J, F), !xS && (W = K && K.onVnodeMounted)) {
					let w = T;
					queuePostRenderEffect(() => invokeVNodeHook(W, Y, w), F);
				}
				(T.shapeFlag & 256 || Y && isAsyncWrapper(Y.vnode) && Y.vnode.shapeFlag & 256) && w.a && queuePostRenderEffect(w.a, F), w.isMounted = !0, T = O = j = null;
			}
		};
		w.scope.on();
		let K = w.effect = new ReactiveEffect(G);
		w.scope.off();
		let q = w.update = K.run.bind(K), J = w.job = K.runIfDirty.bind(K);
		J.i = w, J.id = w.uid, K.scheduler = () => queueJob(J), toggleRecurse(w, !0), q();
	}, GS = (w, T, O) => {
		T.component = w;
		let j = w.vnode.props;
		w.vnode = T, w.next = null, updateProps(w, T.props, j, O), updateSlots(w, T.children, O), pauseTracking(), flushPreFlushCbs(w), resetTracking();
	}, KS = (w, T, O, j, F, U, W, G, K = !1) => {
		let q = w && w.children, J = w ? w.shapeFlag : 0, Y = T.children, { patchFlag: X, shapeFlag: xS } = T;
		if (X > 0) {
			if (X & 128) {
				YS(q, Y, O, j, F, U, W, G, K);
				return;
			} else if (X & 256) {
				JS(q, Y, O, j, F, U, W, G, K);
				return;
			}
		}
		xS & 8 ? (J & 16 && tC(q, F, U), Y !== q && Q(O, Y)) : J & 16 ? xS & 16 ? YS(q, Y, O, j, F, U, W, G, K) : tC(q, F, U, !0) : (J & 8 && Q(O, ""), xS & 16 && FS(Y, O, j, F, U, W, G, K));
	}, JS = (w, T, O, j, F, W, G, K, q) => {
		w ||= EMPTY_ARR, T ||= EMPTY_ARR;
		let J = w.length, Y = T.length, X = Math.min(J, Y), Q;
		for (Q = 0; Q < X; Q++) {
			let j = T[Q] = q ? cloneIfMounted(T[Q]) : normalizeVNode(T[Q]);
			TS(w[Q], j, O, null, F, W, G, K, q);
		}
		J > Y ? tC(w, F, W, !0, !1, X) : FS(T, O, j, F, W, G, K, q, X);
	}, YS = (w, T, O, j, F, W, G, K, q) => {
		let J = 0, Y = T.length, X = w.length - 1, Q = Y - 1;
		for (; J <= X && J <= Q;) {
			let j = w[J], U = T[J] = q ? cloneIfMounted(T[J]) : normalizeVNode(T[J]);
			if (isSameVNodeType(j, U)) TS(j, U, O, null, F, W, G, K, q);
			else break;
			J++;
		}
		for (; J <= X && J <= Q;) {
			let j = w[X], U = T[Q] = q ? cloneIfMounted(T[Q]) : normalizeVNode(T[Q]);
			if (isSameVNodeType(j, U)) TS(j, U, O, null, F, W, G, K, q);
			else break;
			X--, Q--;
		}
		if (J > X) {
			if (J <= Q) {
				let w = Q + 1, U = w < Y ? T[w].el : j;
				for (; J <= Q;) TS(null, T[J] = q ? cloneIfMounted(T[J]) : normalizeVNode(T[J]), O, U, F, W, G, K, q), J++;
			}
		} else if (J > Q) for (; J <= X;) ZS(w[J], F, W, !0), J++;
		else {
			let xS = J, SS = J, CS = /* @__PURE__ */ new Map();
			for (J = SS; J <= Q; J++) {
				let w = T[J] = q ? cloneIfMounted(T[J]) : normalizeVNode(T[J]);
				w.key != null && CS.set(w.key, J);
			}
			let wS, ES = 0, DS = Q - SS + 1, OS = !1, kS = 0, AS = Array(DS);
			for (J = 0; J < DS; J++) AS[J] = 0;
			for (J = xS; J <= X; J++) {
				let j = w[J];
				if (ES >= DS) {
					ZS(j, F, W, !0);
					continue;
				}
				let U;
				if (j.key != null) U = CS.get(j.key);
				else for (wS = SS; wS <= Q; wS++) if (AS[wS - SS] === 0 && isSameVNodeType(j, T[wS])) {
					U = wS;
					break;
				}
				U === void 0 ? ZS(j, F, W, !0) : (AS[U - SS] = J + 1, U >= kS ? kS = U : OS = !0, TS(j, T[U], O, null, F, W, G, K, q), ES++);
			}
			let jS = OS ? getSequence(AS) : EMPTY_ARR;
			for (wS = jS.length - 1, J = DS - 1; J >= 0; J--) {
				let w = SS + J, U = T[w], X = T[w + 1], Q = w + 1 < Y ? X.el || resolveAsyncComponentPlaceholder(X) : j;
				AS[J] === 0 ? TS(null, U, O, Q, F, W, G, K, q) : OS && (wS < 0 || J !== jS[wS] ? XS(U, O, Q, 2) : wS--);
			}
		}
	}, XS = (w, T, O, F, U = null) => {
		let { el: W, type: K, transition: q, children: J, shapeFlag: Y } = w;
		if (Y & 6) {
			XS(w.component.subTree, T, O, F);
			return;
		}
		if (Y & 128) {
			w.suspense.move(T, O, F);
			return;
		}
		if (Y & 64) {
			K.move(w, T, O, aC);
			return;
		}
		if (K === Fragment) {
			j(W, T, O);
			for (let w = 0; w < J.length; w++) XS(J[w], T, O, F);
			j(w.anchor, T, O);
			return;
		}
		if (K === Static) {
			kS(w, T, O);
			return;
		}
		if (F !== 2 && Y & 1 && q) if (F === 0) q.beforeEnter(W), j(W, T, O), queuePostRenderEffect(() => q.enter(W), U);
		else {
			let { leave: F, delayLeave: U, afterLeave: K } = q, J = () => {
				w.ctx.isUnmounted ? G(W) : j(W, T, O);
			}, Y = () => {
				W._isLeaving && W[leaveCbKey](!0), F(W, () => {
					J(), K && K();
				});
			};
			U ? U(W, J, Y) : Y();
		}
		else j(W, T, O);
	}, ZS = (w, T, O, j = !1, F = !1) => {
		let { type: U, props: W, ref: G, children: K, dynamicChildren: q, shapeFlag: J, patchFlag: Y, dirs: X, cacheIndex: Q } = w;
		if (Y === -2 && (F = !1), G != null && (pauseTracking(), setRef(G, null, O, w, !0), resetTracking()), Q != null && (T.renderCache[Q] = void 0), J & 256) {
			T.ctx.deactivate(w);
			return;
		}
		let xS = J & 1 && X, SS = !isAsyncWrapper(w), CS;
		if (SS && (CS = W && W.onVnodeBeforeUnmount) && invokeVNodeHook(CS, T, w), J & 6) eC(w.component, O, j);
		else {
			if (J & 128) {
				w.suspense.unmount(O, j);
				return;
			}
			xS && invokeDirectiveHook(w, null, T, "beforeUnmount"), J & 64 ? w.type.remove(w, T, O, aC, j) : q && !q.hasOnce && (U !== Fragment || Y > 0 && Y & 64) ? tC(q, T, O, !1, !0) : (U === Fragment && Y & 384 || !F && J & 16) && tC(K, T, O), j && QS(w);
		}
		(SS && (CS = W && W.onVnodeUnmounted) || xS) && queuePostRenderEffect(() => {
			CS && invokeVNodeHook(CS, T, w), xS && invokeDirectiveHook(w, null, T, "unmounted");
		}, O);
	}, QS = (w) => {
		let { type: T, el: O, anchor: j, transition: F } = w;
		if (T === Fragment) {
			$S(O, j);
			return;
		}
		if (T === Static) {
			AS(w);
			return;
		}
		let U = () => {
			G(O), F && !F.persisted && F.afterLeave && F.afterLeave();
		};
		if (w.shapeFlag & 1 && F && !F.persisted) {
			let { leave: T, delayLeave: j } = F, W = () => T(O, U);
			j ? j(w.el, U, W) : W();
		} else U();
	}, $S = (w, T) => {
		let O;
		for (; w !== T;) O = SS(w), G(w), w = O;
		G(T);
	}, eC = (w, T, O) => {
		let { bum: j, scope: F, job: U, subTree: W, um: G, m: K, a: q } = w;
		invalidateMount(K), invalidateMount(q), j && invokeArrayFns(j), F.stop(), U && (U.flags |= 8, ZS(W, w, T, O)), G && queuePostRenderEffect(G, T), queuePostRenderEffect(() => {
			w.isUnmounted = !0;
		}, T);
	}, tC = (w, T, O, j = !1, F = !1, U = 0) => {
		for (let W = U; W < w.length; W++) ZS(w[W], T, O, j, F);
	}, nC = (w) => {
		if (w.shapeFlag & 6) return nC(w.component.subTree);
		if (w.shapeFlag & 128) return w.suspense.next();
		let T = SS(w.anchor || w.el), O = T && T[TeleportEndKey];
		return O ? SS(O) : T;
	}, rC = !1, iC = (w, T, O) => {
		let j;
		w == null ? T._vnode && (ZS(T._vnode, null, null, !0), j = T._vnode.component) : TS(T._vnode || null, w, T, null, null, null, O), T._vnode = w, rC ||= (rC = !0, flushPreFlushCbs(j), flushPostFlushCbs(), !1);
	}, aC = {
		p: TS,
		um: ZS,
		m: XS,
		r: QS,
		mt: VS,
		mc: FS,
		pc: KS,
		pbc: LS,
		n: nC,
		o: w
	}, oC, sC;
	return T && ([oC, sC] = T(aC)), {
		render: iC,
		hydrate: oC,
		createApp: createAppAPI(iC, oC)
	};
}
function resolveChildrenNamespace({ type: w, props: T }, O) {
	return O === "svg" && w === "foreignObject" || O === "mathml" && w === "annotation-xml" && T && T.encoding && T.encoding.includes("html") ? void 0 : O;
}
function toggleRecurse({ effect: w, job: T }, O) {
	O ? (w.flags |= 32, T.flags |= 4) : (w.flags &= -33, T.flags &= -5);
}
function needTransition(w, T) {
	return (!w || w && !w.pendingBranch) && T && !T.persisted;
}
function traverseStaticChildren(w, T, O = !1) {
	let j = w.children, F = T.children;
	if (isArray(j) && isArray(F)) for (let T = 0; T < j.length; T++) {
		let U = j[T], W = F[T];
		W.shapeFlag & 1 && !W.dynamicChildren && ((W.patchFlag <= 0 || W.patchFlag === 32) && (W = F[T] = cloneIfMounted(F[T]), W.el = U.el), !O && W.patchFlag !== -2 && traverseStaticChildren(U, W)), W.type === Text && (W.patchFlag === -1 ? W.__elIndex = T + (w.type === Fragment ? 1 : 0) : W.el = U.el), W.type === Comment && !W.el && (W.el = U.el);
	}
}
function getSequence(w) {
	let T = w.slice(), O = [0], j, F, U, W, G, K = w.length;
	for (j = 0; j < K; j++) {
		let K = w[j];
		if (K !== 0) {
			if (F = O[O.length - 1], w[F] < K) {
				T[j] = F, O.push(j);
				continue;
			}
			for (U = 0, W = O.length - 1; U < W;) G = U + W >> 1, w[O[G]] < K ? U = G + 1 : W = G;
			K < w[O[U]] && (U > 0 && (T[j] = O[U - 1]), O[U] = j);
		}
	}
	for (U = O.length, W = O[U - 1]; U-- > 0;) O[U] = W, W = T[W];
	return O;
}
function locateNonHydratedAsyncRoot(w) {
	let T = w.subTree.component;
	if (T) return T.asyncDep && !T.asyncResolved ? T : locateNonHydratedAsyncRoot(T);
}
function invalidateMount(w) {
	if (w) for (let T = 0; T < w.length; T++) w[T].flags |= 8;
}
function resolveAsyncComponentPlaceholder(w) {
	if (w.placeholder) return w.placeholder;
	let T = w.component;
	return T ? resolveAsyncComponentPlaceholder(T.subTree) : null;
}
var isSuspense = (w) => w.__isSuspense;
function queueEffectWithSuspense(w, T) {
	T && T.pendingBranch ? isArray(w) ? T.effects.push(...w) : T.effects.push(w) : queuePostFlushCb(w);
}
var Fragment = /* @__PURE__ */ Symbol.for("v-fgt"), Text = /* @__PURE__ */ Symbol.for("v-txt"), Comment = /* @__PURE__ */ Symbol.for("v-cmt"), Static = /* @__PURE__ */ Symbol.for("v-stc"), blockStack = [], currentBlock = null;
function openBlock(w = !1) {
	blockStack.push(currentBlock = w ? null : []);
}
function closeBlock() {
	blockStack.pop(), currentBlock = blockStack[blockStack.length - 1] || null;
}
var isBlockTreeEnabled = 1;
function setBlockTracking(w, T = !1) {
	isBlockTreeEnabled += w, w < 0 && currentBlock && T && (currentBlock.hasOnce = !0);
}
function setupBlock(w) {
	return w.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null, closeBlock(), isBlockTreeEnabled > 0 && currentBlock && currentBlock.push(w), w;
}
function createElementBlock(w, T, O, j, F, U) {
	return setupBlock(createBaseVNode(w, T, O, j, F, U, !0));
}
function createBlock(w, T, O, j, F) {
	return setupBlock(createVNode(w, T, O, j, F, !0));
}
function isVNode(w) {
	return w ? w.__v_isVNode === !0 : !1;
}
function isSameVNodeType(w, T) {
	return w.type === T.type && w.key === T.key;
}
var normalizeKey = ({ key: w }) => w ?? null, normalizeRef = ({ ref: w, ref_key: T, ref_for: O }) => (typeof w == "number" && (w = "" + w), w == null ? null : isString(w) || isRef(w) || isFunction(w) ? {
	i: currentRenderingInstance,
	r: w,
	k: T,
	f: !!O
} : w);
function createBaseVNode(w, T = null, O = null, j = 0, F = null, U = w === Fragment ? 0 : 1, W = !1, G = !1) {
	let K = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: w,
		props: T,
		key: T && normalizeKey(T),
		ref: T && normalizeRef(T),
		scopeId: currentScopeId,
		slotScopeIds: null,
		children: O,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: U,
		patchFlag: j,
		dynamicProps: F,
		dynamicChildren: null,
		appContext: null,
		ctx: currentRenderingInstance
	};
	return G ? (normalizeChildren(K, O), U & 128 && w.normalize(K)) : O && (K.shapeFlag |= isString(O) ? 8 : 16), isBlockTreeEnabled > 0 && !W && currentBlock && (K.patchFlag > 0 || U & 6) && K.patchFlag !== 32 && currentBlock.push(K), K;
}
var createVNode = _createVNode;
function _createVNode(w, T = null, O = null, j = 0, F = null, U = !1) {
	if ((!w || w === NULL_DYNAMIC_COMPONENT) && (w = Comment), isVNode(w)) {
		let j = cloneVNode(w, T, !0);
		return O && normalizeChildren(j, O), isBlockTreeEnabled > 0 && !U && currentBlock && (j.shapeFlag & 6 ? currentBlock[currentBlock.indexOf(w)] = j : currentBlock.push(j)), j.patchFlag = -2, j;
	}
	if (isClassComponent(w) && (w = w.__vccOpts), T) {
		T = guardReactiveProps(T);
		let { class: w, style: O } = T;
		w && !isString(w) && (T.class = normalizeClass(w)), isObject(O) && (isProxy(O) && !isArray(O) && (O = extend({}, O)), T.style = normalizeStyle(O));
	}
	let W = isString(w) ? 1 : isSuspense(w) ? 128 : isTeleport(w) ? 64 : isObject(w) ? 4 : isFunction(w) ? 2 : 0;
	return createBaseVNode(w, T, O, j, F, W, U, !0);
}
function guardReactiveProps(w) {
	return w ? isProxy(w) || isInternalObject(w) ? extend({}, w) : w : null;
}
function cloneVNode(w, T, O = !1, j = !1) {
	let { props: F, ref: U, patchFlag: W, children: G, transition: K } = w, q = T ? mergeProps(F || {}, T) : F, J = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: w.type,
		props: q,
		key: q && normalizeKey(q),
		ref: T && T.ref ? O && U ? isArray(U) ? U.concat(normalizeRef(T)) : [U, normalizeRef(T)] : normalizeRef(T) : U,
		scopeId: w.scopeId,
		slotScopeIds: w.slotScopeIds,
		children: G,
		target: w.target,
		targetStart: w.targetStart,
		targetAnchor: w.targetAnchor,
		staticCount: w.staticCount,
		shapeFlag: w.shapeFlag,
		patchFlag: T && w.type !== Fragment ? W === -1 ? 16 : W | 16 : W,
		dynamicProps: w.dynamicProps,
		dynamicChildren: w.dynamicChildren,
		appContext: w.appContext,
		dirs: w.dirs,
		transition: K,
		component: w.component,
		suspense: w.suspense,
		ssContent: w.ssContent && cloneVNode(w.ssContent),
		ssFallback: w.ssFallback && cloneVNode(w.ssFallback),
		placeholder: w.placeholder,
		el: w.el,
		anchor: w.anchor,
		ctx: w.ctx,
		ce: w.ce
	};
	return K && j && setTransitionHooks(J, K.clone(J)), J;
}
function createTextVNode(w = " ", T = 0) {
	return createVNode(Text, null, w, T);
}
function createCommentVNode(w = "", T = !1) {
	return T ? (openBlock(), createBlock(Comment, null, w)) : createVNode(Comment, null, w);
}
function normalizeVNode(w) {
	return w == null || typeof w == "boolean" ? createVNode(Comment) : isArray(w) ? createVNode(Fragment, null, w.slice()) : isVNode(w) ? cloneIfMounted(w) : createVNode(Text, null, String(w));
}
function cloneIfMounted(w) {
	return w.el === null && w.patchFlag !== -1 || w.memo ? w : cloneVNode(w);
}
function normalizeChildren(w, T) {
	let O = 0, { shapeFlag: j } = w;
	if (T == null) T = null;
	else if (isArray(T)) O = 16;
	else if (typeof T == "object") if (j & 65) {
		let O = T.default;
		O && (O._c && (O._d = !1), normalizeChildren(w, O()), O._c && (O._d = !0));
		return;
	} else {
		O = 32;
		let j = T._;
		!j && !isInternalObject(T) ? T._ctx = currentRenderingInstance : j === 3 && currentRenderingInstance && (currentRenderingInstance.slots._ === 1 ? T._ = 1 : (T._ = 2, w.patchFlag |= 1024));
	}
	else isFunction(T) ? (T = {
		default: T,
		_ctx: currentRenderingInstance
	}, O = 32) : (T = String(T), j & 64 ? (O = 16, T = [createTextVNode(T)]) : O = 8);
	w.children = T, w.shapeFlag |= O;
}
function mergeProps(...w) {
	let T = {};
	for (let O = 0; O < w.length; O++) {
		let j = w[O];
		for (let w in j) if (w === "class") T.class !== j.class && (T.class = normalizeClass([T.class, j.class]));
		else if (w === "style") T.style = normalizeStyle([T.style, j.style]);
		else if (isOn(w)) {
			let O = T[w], F = j[w];
			F && O !== F && !(isArray(O) && O.includes(F)) && (T[w] = O ? [].concat(O, F) : F);
		} else w !== "" && (T[w] = j[w]);
	}
	return T;
}
function invokeVNodeHook(w, T, O, j = null) {
	callWithAsyncErrorHandling(w, T, 7, [O, j]);
}
var emptyAppContext = createAppContext(), uid = 0;
function createComponentInstance(w, T, O) {
	let j = w.type, U = (T ? T.appContext : w.appContext) || emptyAppContext, W = {
		uid: uid++,
		vnode: w,
		type: j,
		parent: T,
		appContext: U,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new EffectScope(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: T ? T.provides : Object.create(U.provides),
		ids: T ? T.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: normalizePropsOptions(j, U),
		emitsOptions: normalizeEmitsOptions(j, U),
		emit: null,
		emitted: null,
		propsDefaults: EMPTY_OBJ,
		inheritAttrs: j.inheritAttrs,
		ctx: EMPTY_OBJ,
		data: EMPTY_OBJ,
		props: EMPTY_OBJ,
		attrs: EMPTY_OBJ,
		slots: EMPTY_OBJ,
		refs: EMPTY_OBJ,
		setupState: EMPTY_OBJ,
		setupContext: null,
		suspense: O,
		suspenseId: O ? O.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return W.ctx = { _: W }, W.root = T ? T.root : W, W.emit = emit.bind(null, W), w.ce && w.ce(W), W;
}
var currentInstance = null, getCurrentInstance = () => currentInstance || currentRenderingInstance, internalSetCurrentInstance, setInSSRSetupState;
{
	let w = getGlobalThis(), T = (T, O) => {
		let j;
		return (j = w[T]) || (j = w[T] = []), j.push(O), (w) => {
			j.length > 1 ? j.forEach((T) => T(w)) : j[0](w);
		};
	};
	internalSetCurrentInstance = T("__VUE_INSTANCE_SETTERS__", (w) => currentInstance = w), setInSSRSetupState = T("__VUE_SSR_SETTERS__", (w) => isInSSRComponentSetup = w);
}
var setCurrentInstance = (w) => {
	let T = currentInstance;
	return internalSetCurrentInstance(w), w.scope.on(), () => {
		w.scope.off(), internalSetCurrentInstance(T);
	};
}, unsetCurrentInstance = () => {
	currentInstance && currentInstance.scope.off(), internalSetCurrentInstance(null);
};
function isStatefulComponent(w) {
	return w.vnode.shapeFlag & 4;
}
var isInSSRComponentSetup = !1;
function setupComponent(w, T = !1, O = !1) {
	T && setInSSRSetupState(T);
	let { props: j, children: F } = w.vnode, U = isStatefulComponent(w);
	initProps(w, j, U, T), initSlots(w, F, O || T);
	let W = U ? setupStatefulComponent(w, T) : void 0;
	return T && setInSSRSetupState(!1), W;
}
function setupStatefulComponent(w, T) {
	let O = w.type;
	w.accessCache = /* @__PURE__ */ Object.create(null), w.proxy = new Proxy(w.ctx, PublicInstanceProxyHandlers);
	let { setup: j } = O;
	if (j) {
		pauseTracking();
		let O = w.setupContext = j.length > 1 ? createSetupContext(w) : null, F = setCurrentInstance(w), U = callWithErrorHandling(j, w, 0, [w.props, O]), W = isPromise(U);
		if (resetTracking(), F(), (W || w.sp) && !isAsyncWrapper(w) && markAsyncBoundary(w), W) {
			if (U.then(unsetCurrentInstance, unsetCurrentInstance), T) return U.then((O) => {
				handleSetupResult(w, O, T);
			}).catch((T) => {
				handleError(T, w, 0);
			});
			w.asyncDep = U;
		} else handleSetupResult(w, U, T);
	} else finishComponentSetup(w, T);
}
function handleSetupResult(w, T, O) {
	isFunction(T) ? w.type.__ssrInlineRender ? w.ssrRender = T : w.render = T : isObject(T) && (w.setupState = proxyRefs(T)), finishComponentSetup(w, O);
}
var compile, installWithProxy;
function finishComponentSetup(w, T, O) {
	let j = w.type;
	if (!w.render) {
		if (!T && compile && !j.render) {
			let T = j.template || resolveMergedOptions(w).template;
			if (T) {
				let { isCustomElement: O, compilerOptions: F } = w.appContext.config, { delimiters: U, compilerOptions: W } = j;
				j.render = compile(T, extend(extend({
					isCustomElement: O,
					delimiters: U
				}, F), W));
			}
		}
		w.render = j.render || NOOP, installWithProxy && installWithProxy(w);
	}
	{
		let T = setCurrentInstance(w);
		pauseTracking();
		try {
			applyOptions(w);
		} finally {
			resetTracking(), T();
		}
	}
}
var attrsProxyHandlers = { get(w, T) {
	return track(w, "get", ""), w[T];
} };
function createSetupContext(w) {
	return {
		attrs: new Proxy(w.attrs, attrsProxyHandlers),
		slots: w.slots,
		emit: w.emit,
		expose: (T) => {
			w.exposed = T || {};
		}
	};
}
function getComponentPublicInstance(w) {
	return w.exposed ? w.exposeProxy ||= new Proxy(proxyRefs(markRaw(w.exposed)), {
		get(T, O) {
			if (O in T) return T[O];
			if (O in publicPropertiesMap) return publicPropertiesMap[O](w);
		},
		has(w, T) {
			return T in w || T in publicPropertiesMap;
		}
	}) : w.proxy;
}
function getComponentName(w, T = !0) {
	return isFunction(w) ? w.displayName || w.name : w.name || T && w.__name;
}
function isClassComponent(w) {
	return isFunction(w) && "__vccOpts" in w;
}
var computed = (w, T) => computed$1(w, T, isInSSRComponentSetup), version = "3.5.26", policy = void 0, tt = typeof window < "u" && window.trustedTypes;
if (tt) try {
	policy = /* @__PURE__ */ tt.createPolicy("vue", { createHTML: (w) => w });
} catch {}
var unsafeToTrustedHTML = policy ? (w) => policy.createHTML(w) : (w) => w, svgNS = "http://www.w3.org/2000/svg", mathmlNS = "http://www.w3.org/1998/Math/MathML", doc = typeof document < "u" ? document : null, templateContainer = doc && /* @__PURE__ */ doc.createElement("template"), nodeOps = {
	insert: (w, T, O) => {
		T.insertBefore(w, O || null);
	},
	remove: (w) => {
		let T = w.parentNode;
		T && T.removeChild(w);
	},
	createElement: (w, T, O, j) => {
		let F = T === "svg" ? doc.createElementNS(svgNS, w) : T === "mathml" ? doc.createElementNS(mathmlNS, w) : O ? doc.createElement(w, { is: O }) : doc.createElement(w);
		return w === "select" && j && j.multiple != null && F.setAttribute("multiple", j.multiple), F;
	},
	createText: (w) => doc.createTextNode(w),
	createComment: (w) => doc.createComment(w),
	setText: (w, T) => {
		w.nodeValue = T;
	},
	setElementText: (w, T) => {
		w.textContent = T;
	},
	parentNode: (w) => w.parentNode,
	nextSibling: (w) => w.nextSibling,
	querySelector: (w) => doc.querySelector(w),
	setScopeId(w, T) {
		w.setAttribute(T, "");
	},
	insertStaticContent(w, T, O, j, F, U) {
		let W = O ? O.previousSibling : T.lastChild;
		if (F && (F === U || F.nextSibling)) for (; T.insertBefore(F.cloneNode(!0), O), !(F === U || !(F = F.nextSibling)););
		else {
			templateContainer.innerHTML = unsafeToTrustedHTML(j === "svg" ? `<svg>${w}</svg>` : j === "mathml" ? `<math>${w}</math>` : w);
			let F = templateContainer.content;
			if (j === "svg" || j === "mathml") {
				let w = F.firstChild;
				for (; w.firstChild;) F.appendChild(w.firstChild);
				F.removeChild(w);
			}
			T.insertBefore(F, O);
		}
		return [W ? W.nextSibling : T.firstChild, O ? O.previousSibling : T.lastChild];
	}
}, vtcKey = /* @__PURE__ */ Symbol("_vtc");
function patchClass(w, T, O) {
	let j = w[vtcKey];
	j && (T = (T ? [T, ...j] : [...j]).join(" ")), T == null ? w.removeAttribute("class") : O ? w.setAttribute("class", T) : w.className = T;
}
var vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod"), vShowHidden = /* @__PURE__ */ Symbol("_vsh"), CSS_VAR_TEXT = /* @__PURE__ */ Symbol(""), displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(w, T, O) {
	let j = w.style, F = isString(O), U = !1;
	if (O && !F) {
		if (T) if (isString(T)) for (let w of T.split(";")) {
			let T = w.slice(0, w.indexOf(":")).trim();
			O[T] ?? setStyle(j, T, "");
		}
		else for (let w in T) O[w] ?? setStyle(j, w, "");
		for (let w in O) w === "display" && (U = !0), setStyle(j, w, O[w]);
	} else if (F) {
		if (T !== O) {
			let w = j[CSS_VAR_TEXT];
			w && (O += ";" + w), j.cssText = O, U = displayRE.test(O);
		}
	} else T && w.removeAttribute("style");
	vShowOriginalDisplay in w && (w[vShowOriginalDisplay] = U ? j.display : "", w[vShowHidden] && (j.display = "none"));
}
var importantRE = /\s*!important$/;
function setStyle(w, T, O) {
	if (isArray(O)) O.forEach((O) => setStyle(w, T, O));
	else if (O ??= "", T.startsWith("--")) w.setProperty(T, O);
	else {
		let j = autoPrefix(w, T);
		importantRE.test(O) ? w.setProperty(hyphenate(j), O.replace(importantRE, ""), "important") : w[j] = O;
	}
}
var prefixes = [
	"Webkit",
	"Moz",
	"ms"
], prefixCache = {};
function autoPrefix(w, T) {
	let O = prefixCache[T];
	if (O) return O;
	let j = camelize(T);
	if (j !== "filter" && j in w) return prefixCache[T] = j;
	j = capitalize(j);
	for (let O = 0; O < prefixes.length; O++) {
		let F = prefixes[O] + j;
		if (F in w) return prefixCache[T] = F;
	}
	return T;
}
var xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(w, T, O, j, F, U = isSpecialBooleanAttr(T)) {
	j && T.startsWith("xlink:") ? O == null ? w.removeAttributeNS(xlinkNS, T.slice(6, T.length)) : w.setAttributeNS(xlinkNS, T, O) : O == null || U && !includeBooleanAttr(O) ? w.removeAttribute(T) : w.setAttribute(T, U ? "" : isSymbol(O) ? String(O) : O);
}
function patchDOMProp(w, T, O, j, F) {
	if (T === "innerHTML" || T === "textContent") {
		O != null && (w[T] = T === "innerHTML" ? unsafeToTrustedHTML(O) : O);
		return;
	}
	let U = w.tagName;
	if (T === "value" && U !== "PROGRESS" && !U.includes("-")) {
		let j = U === "OPTION" ? w.getAttribute("value") || "" : w.value, F = O == null ? w.type === "checkbox" ? "on" : "" : String(O);
		(j !== F || !("_value" in w)) && (w.value = F), O ?? w.removeAttribute(T), w._value = O;
		return;
	}
	let W = !1;
	if (O === "" || O == null) {
		let j = typeof w[T];
		j === "boolean" ? O = includeBooleanAttr(O) : O == null && j === "string" ? (O = "", W = !0) : j === "number" && (O = 0, W = !0);
	}
	try {
		w[T] = O;
	} catch {}
	W && w.removeAttribute(F || T);
}
function addEventListener(w, T, O, j) {
	w.addEventListener(T, O, j);
}
function removeEventListener(w, T, O, j) {
	w.removeEventListener(T, O, j);
}
var veiKey = /* @__PURE__ */ Symbol("_vei");
function patchEvent(w, T, O, j, F = null) {
	let U = w[veiKey] || (w[veiKey] = {}), W = U[T];
	if (j && W) W.value = j;
	else {
		let [O, G] = parseName(T);
		j ? addEventListener(w, O, U[T] = createInvoker(j, F), G) : W && (removeEventListener(w, O, W, G), U[T] = void 0);
	}
}
var optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(w) {
	let T;
	if (optionsModifierRE.test(w)) {
		T = {};
		let O;
		for (; O = w.match(optionsModifierRE);) w = w.slice(0, w.length - O[0].length), T[O[0].toLowerCase()] = !0;
	}
	return [w[2] === ":" ? w.slice(3) : hyphenate(w.slice(2)), T];
}
var cachedNow = 0, p$2 = /* @__PURE__ */ Promise.resolve(), getNow = () => cachedNow ||= (p$2.then(() => cachedNow = 0), Date.now());
function createInvoker(w, T) {
	let O = (w) => {
		if (!w._vts) w._vts = Date.now();
		else if (w._vts <= O.attached) return;
		callWithAsyncErrorHandling(patchStopImmediatePropagation(w, O.value), T, 5, [w]);
	};
	return O.value = w, O.attached = getNow(), O;
}
function patchStopImmediatePropagation(w, T) {
	if (isArray(T)) {
		let O = w.stopImmediatePropagation;
		return w.stopImmediatePropagation = () => {
			O.call(w), w._stopped = !0;
		}, T.map((w) => (T) => !T._stopped && w && w(T));
	} else return T;
}
var isNativeOn = (w) => w.charCodeAt(0) === 111 && w.charCodeAt(1) === 110 && w.charCodeAt(2) > 96 && w.charCodeAt(2) < 123, patchProp = (w, T, O, j, F, U) => {
	let W = F === "svg";
	T === "class" ? patchClass(w, j, W) : T === "style" ? patchStyle(w, O, j) : isOn(T) ? isModelListener(T) || patchEvent(w, T, O, j, U) : (T[0] === "." ? (T = T.slice(1), !0) : T[0] === "^" ? (T = T.slice(1), !1) : shouldSetAsProp(w, T, j, W)) ? (patchDOMProp(w, T, j), !w.tagName.includes("-") && (T === "value" || T === "checked" || T === "selected") && patchAttr(w, T, j, W, U, T !== "value")) : w._isVueCE && (/[A-Z]/.test(T) || !isString(j)) ? patchDOMProp(w, camelize(T), j, U, T) : (T === "true-value" ? w._trueValue = j : T === "false-value" && (w._falseValue = j), patchAttr(w, T, j, W));
};
function shouldSetAsProp(w, T, O, j) {
	if (j) return !!(T === "innerHTML" || T === "textContent" || T in w && isNativeOn(T) && isFunction(O));
	if (T === "spellcheck" || T === "draggable" || T === "translate" || T === "autocorrect" || T === "sandbox" && w.tagName === "IFRAME" || T === "form" || T === "list" && w.tagName === "INPUT" || T === "type" && w.tagName === "TEXTAREA") return !1;
	if (T === "width" || T === "height") {
		let T = w.tagName;
		if (T === "IMG" || T === "VIDEO" || T === "CANVAS" || T === "SOURCE") return !1;
	}
	return isNativeOn(T) && isString(O) ? !1 : T in w;
}
var systemModifiers = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], modifierGuards = {
	stop: (w) => w.stopPropagation(),
	prevent: (w) => w.preventDefault(),
	self: (w) => w.target !== w.currentTarget,
	ctrl: (w) => !w.ctrlKey,
	shift: (w) => !w.shiftKey,
	alt: (w) => !w.altKey,
	meta: (w) => !w.metaKey,
	left: (w) => "button" in w && w.button !== 0,
	middle: (w) => "button" in w && w.button !== 1,
	right: (w) => "button" in w && w.button !== 2,
	exact: (w, T) => systemModifiers.some((O) => w[`${O}Key`] && !T.includes(O))
}, withModifiers = (w, T) => {
	let O = w._withMods ||= {}, j = T.join(".");
	return O[j] || (O[j] = ((O, ...j) => {
		for (let w = 0; w < T.length; w++) {
			let j = modifierGuards[T[w]];
			if (j && j(O, T)) return;
		}
		return w(O, ...j);
	}));
}, keyNames = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
}, withKeys = (w, T) => {
	let O = w._withKeys ||= {}, j = T.join(".");
	return O[j] || (O[j] = ((O) => {
		if (!("key" in O)) return;
		let j = hyphenate(O.key);
		if (T.some((w) => w === j || keyNames[w] === j)) return w(O);
	}));
}, rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps), renderer;
function ensureRenderer() {
	return renderer ||= createRenderer$1(rendererOptions);
}
var createApp = ((...w) => {
	let T = ensureRenderer().createApp(...w), { mount: O } = T;
	return T.mount = (w) => {
		let j = normalizeContainer(w);
		if (!j) return;
		let F = T._component;
		!isFunction(F) && !F.render && !F.template && (F.template = j.innerHTML), j.nodeType === 1 && (j.textContent = "");
		let U = O(j, !1, resolveRootNamespace(j));
		return j instanceof Element && (j.removeAttribute("v-cloak"), j.setAttribute("data-v-app", "")), U;
	}, T;
});
function resolveRootNamespace(w) {
	if (w instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && w instanceof MathMLElement) return "mathml";
}
function normalizeContainer(w) {
	return isString(w) ? document.querySelector(w) : w;
}
var _hoisted_1$3 = ["aria-label"], _hoisted_2$3 = {
	key: 0,
	class: "floater-value"
}, _hoisted_3$3 = {
	key: 1,
	class: "floater-count",
	"aria-hidden": "true"
}, LONG_PRESS_MS = 460, FloaterButton_default = /* @__PURE__ */ defineComponent({
	__name: "FloaterButton",
	props: {
		x: { type: Number },
		y: { type: Number },
		icon: { type: String },
		label: { type: String },
		isActive: { type: Boolean },
		isOn: { type: Boolean },
		isGroup: { type: Boolean },
		groupCount: { type: [Number, null] },
		accentColor: { type: [String, null] },
		valueText: { type: [String, null] }
	},
	emits: ["press", "long-press"],
	setup(w, { emit: T }) {
		let O = w, j = T, F = null, U = null, W = !1, G = computed(() => ({
			"--floater-x": `${Math.round(O.x)}px`,
			"--floater-y": `${Math.round(O.y)}px`,
			...O.accentColor ? { "--floater-accent": O.accentColor } : {}
		}));
		function K() {
			F !== null && (window.clearTimeout(F), F = null);
		}
		function q() {
			K(), U = null, W = !1;
		}
		function J(w) {
			if (U !== null) return;
			let T = w.currentTarget;
			U = w.pointerId, W = !1, T.setPointerCapture(w.pointerId), F = window.setTimeout(() => {
				F = null, W = !0, j("long-press");
			}, LONG_PRESS_MS);
		}
		function Y(w) {
			if (U !== w.pointerId) return;
			let T = w.currentTarget;
			K(), W || j("press"), T.hasPointerCapture(w.pointerId) && T.releasePointerCapture(w.pointerId), q();
		}
		function X() {
			q();
		}
		return (T, O) => {
			let j = resolveComponent("ha-icon");
			return openBlock(), createElementBlock("button", {
				class: normalizeClass(["floater-btn", {
					active: !!w.isActive,
					on: !!w.isOn,
					group: !!w.isGroup,
					value: !!w.valueText
				}]),
				style: normalizeStyle(G.value),
				type: "button",
				"aria-label": w.label,
				onPointerdown: J,
				onPointerup: Y,
				onPointercancel: X,
				onLostpointercapture: X,
				onKeydown: [O[0] ||= withKeys(withModifiers((w) => T.$emit("press"), ["prevent"]), ["enter"]), O[1] ||= withKeys(withModifiers((w) => T.$emit("press"), ["prevent"]), ["space"])],
				onContextmenu: O[2] ||= withModifiers(() => {}, ["prevent"])
			}, [
				createVNode(j, {
					class: "floater-icon",
					icon: w.icon
				}, null, 8, ["icon"]),
				w.valueText ? (openBlock(), createElementBlock("span", _hoisted_2$3, toDisplayString(w.valueText), 1)) : createCommentVNode("", !0),
				w.groupCount && w.groupCount > 1 ? (openBlock(), createElementBlock("span", _hoisted_3$3, toDisplayString(w.groupCount), 1)) : createCommentVNode("", !0)
			], 46, _hoisted_1$3);
		};
	}
}), _hoisted_1$2 = { class: "floater-head" }, _hoisted_2$2 = { class: "name" }, _hoisted_3$2 = { class: "entity" }, _hoisted_4$2 = { class: "state" }, _hoisted_5$2 = { class: "actions" }, _hoisted_6$1 = ["disabled"], _hoisted_7$1 = ["disabled"], FloaterEntityPopup_default = /* @__PURE__ */ defineComponent({
	__name: "FloaterEntityPopup",
	props: {
		name: { type: String },
		entityId: { type: String },
		icon: { type: String },
		stateText: { type: String },
		x: { type: Number },
		y: { type: Number },
		primaryLabel: { type: String },
		secondaryLabel: { type: String },
		runningAction: { type: [String, null] }
	},
	emits: [
		"close",
		"primary",
		"secondary"
	],
	setup(w) {
		let T = w, O = computed(() => ({
			"--popup-x": `${Math.round(T.x)}px`,
			"--popup-y": `${Math.round(T.y)}px`,
			"--popup-shift-y": T.y < 110 ? "16px" : "calc(-100% - 14px)"
		}));
		return (T, j) => {
			let F = resolveComponent("ha-icon");
			return openBlock(), createElementBlock("div", {
				class: "floater-popup",
				style: normalizeStyle(O.value),
				role: "dialog",
				"aria-label": "Floater controls",
				onPointerdown: j[3] ||= withModifiers(() => {}, ["stop"])
			}, [
				createBaseVNode("button", {
					class: "close-btn",
					type: "button",
					onClick: j[0] ||= (w) => T.$emit("close")
				}, "Close"),
				createBaseVNode("div", _hoisted_1$2, [createVNode(F, {
					class: "floater-icon",
					icon: w.icon
				}, null, 8, ["icon"]), createBaseVNode("div", null, [createBaseVNode("div", _hoisted_2$2, toDisplayString(w.name), 1), createBaseVNode("div", _hoisted_3$2, toDisplayString(w.entityId), 1)])]),
				createBaseVNode("div", _hoisted_4$2, toDisplayString(w.stateText), 1),
				createBaseVNode("div", _hoisted_5$2, [createBaseVNode("button", {
					class: "action-btn",
					type: "button",
					disabled: w.runningAction === "primary",
					onClick: j[1] ||= (w) => T.$emit("primary")
				}, toDisplayString(w.runningAction === "primary" ? "Running..." : w.primaryLabel), 9, _hoisted_6$1), createBaseVNode("button", {
					class: "action-btn secondary",
					type: "button",
					disabled: w.runningAction === "secondary",
					onClick: j[2] ||= (w) => T.$emit("secondary")
				}, toDisplayString(w.runningAction === "secondary" ? "Running..." : w.secondaryLabel), 9, _hoisted_7$1)])
			], 36);
		};
	}
}), _hoisted_1$1 = { class: "room-name" }, _hoisted_2$1 = { class: "room-id" }, _hoisted_3$1 = {
	key: 0,
	class: "actions"
}, _hoisted_4$1 = ["disabled", "onClick"], _hoisted_5$1 = {
	key: 1,
	class: "empty"
}, RoomActionPopup_default = /* @__PURE__ */ defineComponent({
	__name: "RoomActionPopup",
	props: {
		room: { type: Object },
		actions: { type: Array },
		x: { type: Number },
		y: { type: Number },
		runningActionId: { type: [String, null] }
	},
	emits: ["close", "run"],
	setup(w) {
		let T = w, O = computed(() => ({
			"--popup-x": `${Math.round(T.x)}px`,
			"--popup-y": `${Math.round(T.y)}px`,
			"--popup-shift-y": T.y < 110 ? "14px" : "calc(-100% - 12px)"
		}));
		return (T, j) => (openBlock(), createElementBlock("div", {
			class: "room-popup",
			style: normalizeStyle(O.value),
			role: "dialog",
			"aria-label": "Room actions",
			onPointerdown: j[1] ||= withModifiers(() => {}, ["stop"])
		}, [
			createBaseVNode("button", {
				class: "close-btn",
				type: "button",
				onClick: j[0] ||= (w) => T.$emit("close")
			}, "Close"),
			createBaseVNode("div", _hoisted_1$1, toDisplayString(w.room.name), 1),
			createBaseVNode("div", _hoisted_2$1, toDisplayString(w.room.id), 1),
			w.actions.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3$1, [(openBlock(!0), createElementBlock(Fragment, null, renderList(w.actions, (O) => (openBlock(), createElementBlock("button", {
				key: O.id,
				class: "action-btn",
				type: "button",
				disabled: w.runningActionId === O.id,
				onClick: (w) => T.$emit("run", O.id)
			}, toDisplayString(w.runningActionId === O.id ? "Running..." : O.label), 9, _hoisted_4$1))), 128))])) : (openBlock(), createElementBlock("div", _hoisted_5$1, "No actions configured for this room."))
		], 36));
	}
}), MOUSE = {
	LEFT: 0,
	MIDDLE: 1,
	RIGHT: 2,
	ROTATE: 0,
	DOLLY: 1,
	PAN: 2
}, TOUCH = {
	ROTATE: 0,
	PAN: 1,
	DOLLY_PAN: 2,
	DOLLY_ROTATE: 3
}, RepeatWrapping = 1e3, ClampToEdgeWrapping = 1001, MirroredRepeatWrapping = 1002, NearestFilter = 1003, NearestMipmapNearestFilter = 1004, NearestMipmapLinearFilter = 1005, LinearFilter = 1006, LinearMipmapNearestFilter = 1007, LinearMipmapLinearFilter = 1008, UnsignedByteType = 1009, ByteType = 1010, ShortType = 1011, UnsignedShortType = 1012, IntType = 1013, UnsignedIntType = 1014, FloatType = 1015, HalfFloatType = 1016, UnsignedShort4444Type = 1017, UnsignedShort5551Type = 1018, UnsignedInt248Type = 1020, UnsignedInt5999Type = 35902, UnsignedInt101111Type = 35899, AlphaFormat = 1021, RGBFormat = 1022, RGBAFormat = 1023, DepthFormat = 1026, DepthStencilFormat = 1027, RedFormat = 1028, RedIntegerFormat = 1029, RGFormat = 1030, RGIntegerFormat = 1031, RGBAIntegerFormat = 1033, RGB_S3TC_DXT1_Format = 33776, RGBA_S3TC_DXT1_Format = 33777, RGBA_S3TC_DXT3_Format = 33778, RGBA_S3TC_DXT5_Format = 33779, RGB_PVRTC_4BPPV1_Format = 35840, RGB_PVRTC_2BPPV1_Format = 35841, RGBA_PVRTC_4BPPV1_Format = 35842, RGBA_PVRTC_2BPPV1_Format = 35843, RGB_ETC1_Format = 36196, RGB_ETC2_Format = 37492, RGBA_ETC2_EAC_Format = 37496, R11_EAC_Format = 37488, SIGNED_R11_EAC_Format = 37489, RG11_EAC_Format = 37490, SIGNED_RG11_EAC_Format = 37491, RGBA_ASTC_4x4_Format = 37808, RGBA_ASTC_5x4_Format = 37809, RGBA_ASTC_5x5_Format = 37810, RGBA_ASTC_6x5_Format = 37811, RGBA_ASTC_6x6_Format = 37812, RGBA_ASTC_8x5_Format = 37813, RGBA_ASTC_8x6_Format = 37814, RGBA_ASTC_8x8_Format = 37815, RGBA_ASTC_10x5_Format = 37816, RGBA_ASTC_10x6_Format = 37817, RGBA_ASTC_10x8_Format = 37818, RGBA_ASTC_10x10_Format = 37819, RGBA_ASTC_12x10_Format = 37820, RGBA_ASTC_12x12_Format = 37821, RGBA_BPTC_Format = 36492, RGB_BPTC_SIGNED_Format = 36494, RGB_BPTC_UNSIGNED_Format = 36495, RED_RGTC1_Format = 36283, SIGNED_RED_RGTC1_Format = 36284, RED_GREEN_RGTC2_Format = 36285, SIGNED_RED_GREEN_RGTC2_Format = 36286, InterpolateDiscrete = 2300, InterpolateLinear = 2301, InterpolateSmooth = 2302, ZeroCurvatureEnding = 2400, ZeroSlopeEnding = 2401, WrapAroundEnding = 2402, BasicDepthPacking = 3200, SRGBColorSpace = "srgb", LinearSRGBColorSpace = "srgb-linear", LinearTransfer = "linear", SRGBTransfer = "srgb", KeepStencilOp = 7680, StaticDrawUsage = 35044, WebGLCoordinateSystem = 2e3;
function arrayNeedsUint32(w) {
	for (let T = w.length - 1; T >= 0; --T) if (w[T] >= 65535) return !0;
	return !1;
}
function isTypedArray(w) {
	return ArrayBuffer.isView(w) && !(w instanceof DataView);
}
function createElementNS(w) {
	return document.createElementNS("http://www.w3.org/1999/xhtml", w);
}
function createCanvasElement() {
	let w = createElementNS("canvas");
	return w.style.display = "block", w;
}
var _cache = {}, _setConsoleFunction = null;
function log(...w) {
	let T = "THREE." + w.shift();
	_setConsoleFunction ? _setConsoleFunction("log", T, ...w) : console.log(T, ...w);
}
function warn(...w) {
	let T = "THREE." + w.shift();
	_setConsoleFunction ? _setConsoleFunction("warn", T, ...w) : console.warn(T, ...w);
}
function error(...w) {
	let T = "THREE." + w.shift();
	_setConsoleFunction ? _setConsoleFunction("error", T, ...w) : console.error(T, ...w);
}
function warnOnce(...w) {
	let T = w.join(" ");
	T in _cache || (_cache[T] = !0, warn(...w));
}
function probeAsync(w, T, O) {
	return new Promise(function(j, F) {
		function U() {
			switch (w.clientWaitSync(T, w.SYNC_FLUSH_COMMANDS_BIT, 0)) {
				case w.WAIT_FAILED:
					F();
					break;
				case w.TIMEOUT_EXPIRED:
					setTimeout(U, O);
					break;
				default: j();
			}
		}
		setTimeout(U, O);
	});
}
var EventDispatcher = class {
	addEventListener(w, T) {
		this._listeners === void 0 && (this._listeners = {});
		let O = this._listeners;
		O[w] === void 0 && (O[w] = []), O[w].indexOf(T) === -1 && O[w].push(T);
	}
	hasEventListener(w, T) {
		let O = this._listeners;
		return O === void 0 ? !1 : O[w] !== void 0 && O[w].indexOf(T) !== -1;
	}
	removeEventListener(w, T) {
		let O = this._listeners;
		if (O === void 0) return;
		let j = O[w];
		if (j !== void 0) {
			let w = j.indexOf(T);
			w !== -1 && j.splice(w, 1);
		}
	}
	dispatchEvent(w) {
		let T = this._listeners;
		if (T === void 0) return;
		let O = T[w.type];
		if (O !== void 0) {
			w.target = this;
			let T = O.slice(0);
			for (let O = 0, j = T.length; O < j; O++) T[O].call(this, w);
			w.target = null;
		}
	}
}, _lut = /* @__PURE__ */ "00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff".split("."), _seed = 1234567, DEG2RAD = Math.PI / 180, RAD2DEG = 180 / Math.PI;
function generateUUID() {
	let w = Math.random() * 4294967295 | 0, T = Math.random() * 4294967295 | 0, O = Math.random() * 4294967295 | 0, j = Math.random() * 4294967295 | 0;
	return (_lut[w & 255] + _lut[w >> 8 & 255] + _lut[w >> 16 & 255] + _lut[w >> 24 & 255] + "-" + _lut[T & 255] + _lut[T >> 8 & 255] + "-" + _lut[T >> 16 & 15 | 64] + _lut[T >> 24 & 255] + "-" + _lut[O & 63 | 128] + _lut[O >> 8 & 255] + "-" + _lut[O >> 16 & 255] + _lut[O >> 24 & 255] + _lut[j & 255] + _lut[j >> 8 & 255] + _lut[j >> 16 & 255] + _lut[j >> 24 & 255]).toLowerCase();
}
function clamp$6(w, T, O) {
	return Math.max(T, Math.min(O, w));
}
function euclideanModulo(w, T) {
	return (w % T + T) % T;
}
function mapLinear(w, T, O, j, F) {
	return j + (w - T) * (F - j) / (O - T);
}
function inverseLerp(w, T, O) {
	return w === T ? 0 : (O - w) / (T - w);
}
function lerp(w, T, O) {
	return (1 - O) * w + O * T;
}
function damp(w, T, O, j) {
	return lerp(w, T, 1 - Math.exp(-O * j));
}
function pingpong(w, T = 1) {
	return T - Math.abs(euclideanModulo(w, T * 2) - T);
}
function smoothstep(w, T, O) {
	return w <= T ? 0 : w >= O ? 1 : (w = (w - T) / (O - T), w * w * (3 - 2 * w));
}
function smootherstep(w, T, O) {
	return w <= T ? 0 : w >= O ? 1 : (w = (w - T) / (O - T), w * w * w * (w * (w * 6 - 15) + 10));
}
function randInt(w, T) {
	return w + Math.floor(Math.random() * (T - w + 1));
}
function randFloat(w, T) {
	return w + Math.random() * (T - w);
}
function randFloatSpread(w) {
	return w * (.5 - Math.random());
}
function seededRandom(w) {
	w !== void 0 && (_seed = w);
	let T = _seed += 1831565813;
	return T = Math.imul(T ^ T >>> 15, T | 1), T ^= T + Math.imul(T ^ T >>> 7, T | 61), ((T ^ T >>> 14) >>> 0) / 4294967296;
}
function degToRad(w) {
	return w * DEG2RAD;
}
function radToDeg(w) {
	return w * RAD2DEG;
}
function isPowerOfTwo(w) {
	return (w & w - 1) == 0 && w !== 0;
}
function ceilPowerOfTwo(w) {
	return 2 ** Math.ceil(Math.log(w) / Math.LN2);
}
function floorPowerOfTwo(w) {
	return 2 ** Math.floor(Math.log(w) / Math.LN2);
}
function setQuaternionFromProperEuler(w, T, O, j, F) {
	let U = Math.cos, W = Math.sin, G = U(O / 2), K = W(O / 2), q = U((T + j) / 2), J = W((T + j) / 2), Y = U((T - j) / 2), X = W((T - j) / 2), Q = U((j - T) / 2), xS = W((j - T) / 2);
	switch (F) {
		case "XYX":
			w.set(G * J, K * Y, K * X, G * q);
			break;
		case "YZY":
			w.set(K * X, G * J, K * Y, G * q);
			break;
		case "ZXZ":
			w.set(K * Y, K * X, G * J, G * q);
			break;
		case "XZX":
			w.set(G * J, K * xS, K * Q, G * q);
			break;
		case "YXY":
			w.set(K * Q, G * J, K * xS, G * q);
			break;
		case "ZYZ":
			w.set(K * xS, K * Q, G * J, G * q);
			break;
		default: warn("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + F);
	}
}
function denormalize(w, T) {
	switch (T.constructor) {
		case Float32Array: return w;
		case Uint32Array: return w / 4294967295;
		case Uint16Array: return w / 65535;
		case Uint8Array: return w / 255;
		case Int32Array: return Math.max(w / 2147483647, -1);
		case Int16Array: return Math.max(w / 32767, -1);
		case Int8Array: return Math.max(w / 127, -1);
		default: throw Error("Invalid component type.");
	}
}
function normalize(w, T) {
	switch (T.constructor) {
		case Float32Array: return w;
		case Uint32Array: return Math.round(w * 4294967295);
		case Uint16Array: return Math.round(w * 65535);
		case Uint8Array: return Math.round(w * 255);
		case Int32Array: return Math.round(w * 2147483647);
		case Int16Array: return Math.round(w * 32767);
		case Int8Array: return Math.round(w * 127);
		default: throw Error("Invalid component type.");
	}
}
var MathUtils = {
	DEG2RAD,
	RAD2DEG,
	generateUUID,
	clamp: clamp$6,
	euclideanModulo,
	mapLinear,
	inverseLerp,
	lerp,
	damp,
	pingpong,
	smoothstep,
	smootherstep,
	randInt,
	randFloat,
	randFloatSpread,
	seededRandom,
	degToRad,
	radToDeg,
	isPowerOfTwo,
	ceilPowerOfTwo,
	floorPowerOfTwo,
	setQuaternionFromProperEuler,
	normalize,
	denormalize
}, Vector2 = class w {
	constructor(T = 0, O = 0) {
		w.prototype.isVector2 = !0, this.x = T, this.y = O;
	}
	get width() {
		return this.x;
	}
	set width(w) {
		this.x = w;
	}
	get height() {
		return this.y;
	}
	set height(w) {
		this.y = w;
	}
	set(w, T) {
		return this.x = w, this.y = T, this;
	}
	setScalar(w) {
		return this.x = w, this.y = w, this;
	}
	setX(w) {
		return this.x = w, this;
	}
	setY(w) {
		return this.y = w, this;
	}
	setComponent(w, T) {
		switch (w) {
			case 0:
				this.x = T;
				break;
			case 1:
				this.y = T;
				break;
			default: throw Error("index is out of range: " + w);
		}
		return this;
	}
	getComponent(w) {
		switch (w) {
			case 0: return this.x;
			case 1: return this.y;
			default: throw Error("index is out of range: " + w);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y);
	}
	copy(w) {
		return this.x = w.x, this.y = w.y, this;
	}
	add(w) {
		return this.x += w.x, this.y += w.y, this;
	}
	addScalar(w) {
		return this.x += w, this.y += w, this;
	}
	addVectors(w, T) {
		return this.x = w.x + T.x, this.y = w.y + T.y, this;
	}
	addScaledVector(w, T) {
		return this.x += w.x * T, this.y += w.y * T, this;
	}
	sub(w) {
		return this.x -= w.x, this.y -= w.y, this;
	}
	subScalar(w) {
		return this.x -= w, this.y -= w, this;
	}
	subVectors(w, T) {
		return this.x = w.x - T.x, this.y = w.y - T.y, this;
	}
	multiply(w) {
		return this.x *= w.x, this.y *= w.y, this;
	}
	multiplyScalar(w) {
		return this.x *= w, this.y *= w, this;
	}
	divide(w) {
		return this.x /= w.x, this.y /= w.y, this;
	}
	divideScalar(w) {
		return this.multiplyScalar(1 / w);
	}
	applyMatrix3(w) {
		let T = this.x, O = this.y, j = w.elements;
		return this.x = j[0] * T + j[3] * O + j[6], this.y = j[1] * T + j[4] * O + j[7], this;
	}
	min(w) {
		return this.x = Math.min(this.x, w.x), this.y = Math.min(this.y, w.y), this;
	}
	max(w) {
		return this.x = Math.max(this.x, w.x), this.y = Math.max(this.y, w.y), this;
	}
	clamp(w, T) {
		return this.x = clamp$6(this.x, w.x, T.x), this.y = clamp$6(this.y, w.y, T.y), this;
	}
	clampScalar(w, T) {
		return this.x = clamp$6(this.x, w, T), this.y = clamp$6(this.y, w, T), this;
	}
	clampLength(w, T) {
		let O = this.length();
		return this.divideScalar(O || 1).multiplyScalar(clamp$6(O, w, T));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this;
	}
	dot(w) {
		return this.x * w.x + this.y * w.y;
	}
	cross(w) {
		return this.x * w.y - this.y * w.x;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	angle() {
		return Math.atan2(-this.y, -this.x) + Math.PI;
	}
	angleTo(w) {
		let T = Math.sqrt(this.lengthSq() * w.lengthSq());
		if (T === 0) return Math.PI / 2;
		let O = this.dot(w) / T;
		return Math.acos(clamp$6(O, -1, 1));
	}
	distanceTo(w) {
		return Math.sqrt(this.distanceToSquared(w));
	}
	distanceToSquared(w) {
		let T = this.x - w.x, O = this.y - w.y;
		return T * T + O * O;
	}
	manhattanDistanceTo(w) {
		return Math.abs(this.x - w.x) + Math.abs(this.y - w.y);
	}
	setLength(w) {
		return this.normalize().multiplyScalar(w);
	}
	lerp(w, T) {
		return this.x += (w.x - this.x) * T, this.y += (w.y - this.y) * T, this;
	}
	lerpVectors(w, T, O) {
		return this.x = w.x + (T.x - w.x) * O, this.y = w.y + (T.y - w.y) * O, this;
	}
	equals(w) {
		return w.x === this.x && w.y === this.y;
	}
	fromArray(w, T = 0) {
		return this.x = w[T], this.y = w[T + 1], this;
	}
	toArray(w = [], T = 0) {
		return w[T] = this.x, w[T + 1] = this.y, w;
	}
	fromBufferAttribute(w, T) {
		return this.x = w.getX(T), this.y = w.getY(T), this;
	}
	rotateAround(w, T) {
		let O = Math.cos(T), j = Math.sin(T), F = this.x - w.x, U = this.y - w.y;
		return this.x = F * O - U * j + w.x, this.y = F * j + U * O + w.y, this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y;
	}
}, Quaternion = class {
	constructor(w = 0, T = 0, O = 0, j = 1) {
		this.isQuaternion = !0, this._x = w, this._y = T, this._z = O, this._w = j;
	}
	static slerpFlat(w, T, O, j, F, U, W) {
		let G = O[j + 0], K = O[j + 1], q = O[j + 2], J = O[j + 3], Y = F[U + 0], X = F[U + 1], Q = F[U + 2], xS = F[U + 3];
		if (W <= 0) {
			w[T + 0] = G, w[T + 1] = K, w[T + 2] = q, w[T + 3] = J;
			return;
		}
		if (W >= 1) {
			w[T + 0] = Y, w[T + 1] = X, w[T + 2] = Q, w[T + 3] = xS;
			return;
		}
		if (J !== xS || G !== Y || K !== X || q !== Q) {
			let w = G * Y + K * X + q * Q + J * xS;
			w < 0 && (Y = -Y, X = -X, Q = -Q, xS = -xS, w = -w);
			let T = 1 - W;
			if (w < .9995) {
				let O = Math.acos(w), j = Math.sin(O);
				T = Math.sin(T * O) / j, W = Math.sin(W * O) / j, G = G * T + Y * W, K = K * T + X * W, q = q * T + Q * W, J = J * T + xS * W;
			} else {
				G = G * T + Y * W, K = K * T + X * W, q = q * T + Q * W, J = J * T + xS * W;
				let w = 1 / Math.sqrt(G * G + K * K + q * q + J * J);
				G *= w, K *= w, q *= w, J *= w;
			}
		}
		w[T] = G, w[T + 1] = K, w[T + 2] = q, w[T + 3] = J;
	}
	static multiplyQuaternionsFlat(w, T, O, j, F, U) {
		let W = O[j], G = O[j + 1], K = O[j + 2], q = O[j + 3], J = F[U], Y = F[U + 1], X = F[U + 2], Q = F[U + 3];
		return w[T] = W * Q + q * J + G * X - K * Y, w[T + 1] = G * Q + q * Y + K * J - W * X, w[T + 2] = K * Q + q * X + W * Y - G * J, w[T + 3] = q * Q - W * J - G * Y - K * X, w;
	}
	get x() {
		return this._x;
	}
	set x(w) {
		this._x = w, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(w) {
		this._y = w, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(w) {
		this._z = w, this._onChangeCallback();
	}
	get w() {
		return this._w;
	}
	set w(w) {
		this._w = w, this._onChangeCallback();
	}
	set(w, T, O, j) {
		return this._x = w, this._y = T, this._z = O, this._w = j, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._w);
	}
	copy(w) {
		return this._x = w.x, this._y = w.y, this._z = w.z, this._w = w.w, this._onChangeCallback(), this;
	}
	setFromEuler(w, T = !0) {
		let O = w._x, j = w._y, F = w._z, U = w._order, W = Math.cos, G = Math.sin, K = W(O / 2), q = W(j / 2), J = W(F / 2), Y = G(O / 2), X = G(j / 2), Q = G(F / 2);
		switch (U) {
			case "XYZ":
				this._x = Y * q * J + K * X * Q, this._y = K * X * J - Y * q * Q, this._z = K * q * Q + Y * X * J, this._w = K * q * J - Y * X * Q;
				break;
			case "YXZ":
				this._x = Y * q * J + K * X * Q, this._y = K * X * J - Y * q * Q, this._z = K * q * Q - Y * X * J, this._w = K * q * J + Y * X * Q;
				break;
			case "ZXY":
				this._x = Y * q * J - K * X * Q, this._y = K * X * J + Y * q * Q, this._z = K * q * Q + Y * X * J, this._w = K * q * J - Y * X * Q;
				break;
			case "ZYX":
				this._x = Y * q * J - K * X * Q, this._y = K * X * J + Y * q * Q, this._z = K * q * Q - Y * X * J, this._w = K * q * J + Y * X * Q;
				break;
			case "YZX":
				this._x = Y * q * J + K * X * Q, this._y = K * X * J + Y * q * Q, this._z = K * q * Q - Y * X * J, this._w = K * q * J - Y * X * Q;
				break;
			case "XZY":
				this._x = Y * q * J - K * X * Q, this._y = K * X * J - Y * q * Q, this._z = K * q * Q + Y * X * J, this._w = K * q * J + Y * X * Q;
				break;
			default: warn("Quaternion: .setFromEuler() encountered an unknown order: " + U);
		}
		return T === !0 && this._onChangeCallback(), this;
	}
	setFromAxisAngle(w, T) {
		let O = T / 2, j = Math.sin(O);
		return this._x = w.x * j, this._y = w.y * j, this._z = w.z * j, this._w = Math.cos(O), this._onChangeCallback(), this;
	}
	setFromRotationMatrix(w) {
		let T = w.elements, O = T[0], j = T[4], F = T[8], U = T[1], W = T[5], G = T[9], K = T[2], q = T[6], J = T[10], Y = O + W + J;
		if (Y > 0) {
			let w = .5 / Math.sqrt(Y + 1);
			this._w = .25 / w, this._x = (q - G) * w, this._y = (F - K) * w, this._z = (U - j) * w;
		} else if (O > W && O > J) {
			let w = 2 * Math.sqrt(1 + O - W - J);
			this._w = (q - G) / w, this._x = .25 * w, this._y = (j + U) / w, this._z = (F + K) / w;
		} else if (W > J) {
			let w = 2 * Math.sqrt(1 + W - O - J);
			this._w = (F - K) / w, this._x = (j + U) / w, this._y = .25 * w, this._z = (G + q) / w;
		} else {
			let w = 2 * Math.sqrt(1 + J - O - W);
			this._w = (U - j) / w, this._x = (F + K) / w, this._y = (G + q) / w, this._z = .25 * w;
		}
		return this._onChangeCallback(), this;
	}
	setFromUnitVectors(w, T) {
		let O = w.dot(T) + 1;
		return O < 1e-8 ? (O = 0, Math.abs(w.x) > Math.abs(w.z) ? (this._x = -w.y, this._y = w.x, this._z = 0, this._w = O) : (this._x = 0, this._y = -w.z, this._z = w.y, this._w = O)) : (this._x = w.y * T.z - w.z * T.y, this._y = w.z * T.x - w.x * T.z, this._z = w.x * T.y - w.y * T.x, this._w = O), this.normalize();
	}
	angleTo(w) {
		return 2 * Math.acos(Math.abs(clamp$6(this.dot(w), -1, 1)));
	}
	rotateTowards(w, T) {
		let O = this.angleTo(w);
		if (O === 0) return this;
		let j = Math.min(1, T / O);
		return this.slerp(w, j), this;
	}
	identity() {
		return this.set(0, 0, 0, 1);
	}
	invert() {
		return this.conjugate();
	}
	conjugate() {
		return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
	}
	dot(w) {
		return this._x * w._x + this._y * w._y + this._z * w._z + this._w * w._w;
	}
	lengthSq() {
		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
	}
	length() {
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
	}
	normalize() {
		let w = this.length();
		return w === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (w = 1 / w, this._x *= w, this._y *= w, this._z *= w, this._w *= w), this._onChangeCallback(), this;
	}
	multiply(w) {
		return this.multiplyQuaternions(this, w);
	}
	premultiply(w) {
		return this.multiplyQuaternions(w, this);
	}
	multiplyQuaternions(w, T) {
		let O = w._x, j = w._y, F = w._z, U = w._w, W = T._x, G = T._y, K = T._z, q = T._w;
		return this._x = O * q + U * W + j * K - F * G, this._y = j * q + U * G + F * W - O * K, this._z = F * q + U * K + O * G - j * W, this._w = U * q - O * W - j * G - F * K, this._onChangeCallback(), this;
	}
	slerp(w, T) {
		if (T <= 0) return this;
		if (T >= 1) return this.copy(w);
		let O = w._x, j = w._y, F = w._z, U = w._w, W = this.dot(w);
		W < 0 && (O = -O, j = -j, F = -F, U = -U, W = -W);
		let G = 1 - T;
		if (W < .9995) {
			let w = Math.acos(W), K = Math.sin(w);
			G = Math.sin(G * w) / K, T = Math.sin(T * w) / K, this._x = this._x * G + O * T, this._y = this._y * G + j * T, this._z = this._z * G + F * T, this._w = this._w * G + U * T, this._onChangeCallback();
		} else this._x = this._x * G + O * T, this._y = this._y * G + j * T, this._z = this._z * G + F * T, this._w = this._w * G + U * T, this.normalize();
		return this;
	}
	slerpQuaternions(w, T, O) {
		return this.copy(w).slerp(T, O);
	}
	random() {
		let w = 2 * Math.PI * Math.random(), T = 2 * Math.PI * Math.random(), O = Math.random(), j = Math.sqrt(1 - O), F = Math.sqrt(O);
		return this.set(j * Math.sin(w), j * Math.cos(w), F * Math.sin(T), F * Math.cos(T));
	}
	equals(w) {
		return w._x === this._x && w._y === this._y && w._z === this._z && w._w === this._w;
	}
	fromArray(w, T = 0) {
		return this._x = w[T], this._y = w[T + 1], this._z = w[T + 2], this._w = w[T + 3], this._onChangeCallback(), this;
	}
	toArray(w = [], T = 0) {
		return w[T] = this._x, w[T + 1] = this._y, w[T + 2] = this._z, w[T + 3] = this._w, w;
	}
	fromBufferAttribute(w, T) {
		return this._x = w.getX(T), this._y = w.getY(T), this._z = w.getZ(T), this._w = w.getW(T), this._onChangeCallback(), this;
	}
	toJSON() {
		return this.toArray();
	}
	_onChange(w) {
		return this._onChangeCallback = w, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._w;
	}
}, Vector3 = class w {
	constructor(T = 0, O = 0, j = 0) {
		w.prototype.isVector3 = !0, this.x = T, this.y = O, this.z = j;
	}
	set(w, T, O) {
		return O === void 0 && (O = this.z), this.x = w, this.y = T, this.z = O, this;
	}
	setScalar(w) {
		return this.x = w, this.y = w, this.z = w, this;
	}
	setX(w) {
		return this.x = w, this;
	}
	setY(w) {
		return this.y = w, this;
	}
	setZ(w) {
		return this.z = w, this;
	}
	setComponent(w, T) {
		switch (w) {
			case 0:
				this.x = T;
				break;
			case 1:
				this.y = T;
				break;
			case 2:
				this.z = T;
				break;
			default: throw Error("index is out of range: " + w);
		}
		return this;
	}
	getComponent(w) {
		switch (w) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw Error("index is out of range: " + w);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z);
	}
	copy(w) {
		return this.x = w.x, this.y = w.y, this.z = w.z, this;
	}
	add(w) {
		return this.x += w.x, this.y += w.y, this.z += w.z, this;
	}
	addScalar(w) {
		return this.x += w, this.y += w, this.z += w, this;
	}
	addVectors(w, T) {
		return this.x = w.x + T.x, this.y = w.y + T.y, this.z = w.z + T.z, this;
	}
	addScaledVector(w, T) {
		return this.x += w.x * T, this.y += w.y * T, this.z += w.z * T, this;
	}
	sub(w) {
		return this.x -= w.x, this.y -= w.y, this.z -= w.z, this;
	}
	subScalar(w) {
		return this.x -= w, this.y -= w, this.z -= w, this;
	}
	subVectors(w, T) {
		return this.x = w.x - T.x, this.y = w.y - T.y, this.z = w.z - T.z, this;
	}
	multiply(w) {
		return this.x *= w.x, this.y *= w.y, this.z *= w.z, this;
	}
	multiplyScalar(w) {
		return this.x *= w, this.y *= w, this.z *= w, this;
	}
	multiplyVectors(w, T) {
		return this.x = w.x * T.x, this.y = w.y * T.y, this.z = w.z * T.z, this;
	}
	applyEuler(w) {
		return this.applyQuaternion(_quaternion$4.setFromEuler(w));
	}
	applyAxisAngle(w, T) {
		return this.applyQuaternion(_quaternion$4.setFromAxisAngle(w, T));
	}
	applyMatrix3(w) {
		let T = this.x, O = this.y, j = this.z, F = w.elements;
		return this.x = F[0] * T + F[3] * O + F[6] * j, this.y = F[1] * T + F[4] * O + F[7] * j, this.z = F[2] * T + F[5] * O + F[8] * j, this;
	}
	applyNormalMatrix(w) {
		return this.applyMatrix3(w).normalize();
	}
	applyMatrix4(w) {
		let T = this.x, O = this.y, j = this.z, F = w.elements, U = 1 / (F[3] * T + F[7] * O + F[11] * j + F[15]);
		return this.x = (F[0] * T + F[4] * O + F[8] * j + F[12]) * U, this.y = (F[1] * T + F[5] * O + F[9] * j + F[13]) * U, this.z = (F[2] * T + F[6] * O + F[10] * j + F[14]) * U, this;
	}
	applyQuaternion(w) {
		let T = this.x, O = this.y, j = this.z, F = w.x, U = w.y, W = w.z, G = w.w, K = 2 * (U * j - W * O), q = 2 * (W * T - F * j), J = 2 * (F * O - U * T);
		return this.x = T + G * K + U * J - W * q, this.y = O + G * q + W * K - F * J, this.z = j + G * J + F * q - U * K, this;
	}
	project(w) {
		return this.applyMatrix4(w.matrixWorldInverse).applyMatrix4(w.projectionMatrix);
	}
	unproject(w) {
		return this.applyMatrix4(w.projectionMatrixInverse).applyMatrix4(w.matrixWorld);
	}
	transformDirection(w) {
		let T = this.x, O = this.y, j = this.z, F = w.elements;
		return this.x = F[0] * T + F[4] * O + F[8] * j, this.y = F[1] * T + F[5] * O + F[9] * j, this.z = F[2] * T + F[6] * O + F[10] * j, this.normalize();
	}
	divide(w) {
		return this.x /= w.x, this.y /= w.y, this.z /= w.z, this;
	}
	divideScalar(w) {
		return this.multiplyScalar(1 / w);
	}
	min(w) {
		return this.x = Math.min(this.x, w.x), this.y = Math.min(this.y, w.y), this.z = Math.min(this.z, w.z), this;
	}
	max(w) {
		return this.x = Math.max(this.x, w.x), this.y = Math.max(this.y, w.y), this.z = Math.max(this.z, w.z), this;
	}
	clamp(w, T) {
		return this.x = clamp$6(this.x, w.x, T.x), this.y = clamp$6(this.y, w.y, T.y), this.z = clamp$6(this.z, w.z, T.z), this;
	}
	clampScalar(w, T) {
		return this.x = clamp$6(this.x, w, T), this.y = clamp$6(this.y, w, T), this.z = clamp$6(this.z, w, T), this;
	}
	clampLength(w, T) {
		let O = this.length();
		return this.divideScalar(O || 1).multiplyScalar(clamp$6(O, w, T));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
	}
	dot(w) {
		return this.x * w.x + this.y * w.y + this.z * w.z;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(w) {
		return this.normalize().multiplyScalar(w);
	}
	lerp(w, T) {
		return this.x += (w.x - this.x) * T, this.y += (w.y - this.y) * T, this.z += (w.z - this.z) * T, this;
	}
	lerpVectors(w, T, O) {
		return this.x = w.x + (T.x - w.x) * O, this.y = w.y + (T.y - w.y) * O, this.z = w.z + (T.z - w.z) * O, this;
	}
	cross(w) {
		return this.crossVectors(this, w);
	}
	crossVectors(w, T) {
		let O = w.x, j = w.y, F = w.z, U = T.x, W = T.y, G = T.z;
		return this.x = j * G - F * W, this.y = F * U - O * G, this.z = O * W - j * U, this;
	}
	projectOnVector(w) {
		let T = w.lengthSq();
		if (T === 0) return this.set(0, 0, 0);
		let O = w.dot(this) / T;
		return this.copy(w).multiplyScalar(O);
	}
	projectOnPlane(w) {
		return _vector$c.copy(this).projectOnVector(w), this.sub(_vector$c);
	}
	reflect(w) {
		return this.sub(_vector$c.copy(w).multiplyScalar(2 * this.dot(w)));
	}
	angleTo(w) {
		let T = Math.sqrt(this.lengthSq() * w.lengthSq());
		if (T === 0) return Math.PI / 2;
		let O = this.dot(w) / T;
		return Math.acos(clamp$6(O, -1, 1));
	}
	distanceTo(w) {
		return Math.sqrt(this.distanceToSquared(w));
	}
	distanceToSquared(w) {
		let T = this.x - w.x, O = this.y - w.y, j = this.z - w.z;
		return T * T + O * O + j * j;
	}
	manhattanDistanceTo(w) {
		return Math.abs(this.x - w.x) + Math.abs(this.y - w.y) + Math.abs(this.z - w.z);
	}
	setFromSpherical(w) {
		return this.setFromSphericalCoords(w.radius, w.phi, w.theta);
	}
	setFromSphericalCoords(w, T, O) {
		let j = Math.sin(T) * w;
		return this.x = j * Math.sin(O), this.y = Math.cos(T) * w, this.z = j * Math.cos(O), this;
	}
	setFromCylindrical(w) {
		return this.setFromCylindricalCoords(w.radius, w.theta, w.y);
	}
	setFromCylindricalCoords(w, T, O) {
		return this.x = w * Math.sin(T), this.y = O, this.z = w * Math.cos(T), this;
	}
	setFromMatrixPosition(w) {
		let T = w.elements;
		return this.x = T[12], this.y = T[13], this.z = T[14], this;
	}
	setFromMatrixScale(w) {
		let T = this.setFromMatrixColumn(w, 0).length(), O = this.setFromMatrixColumn(w, 1).length(), j = this.setFromMatrixColumn(w, 2).length();
		return this.x = T, this.y = O, this.z = j, this;
	}
	setFromMatrixColumn(w, T) {
		return this.fromArray(w.elements, T * 4);
	}
	setFromMatrix3Column(w, T) {
		return this.fromArray(w.elements, T * 3);
	}
	setFromEuler(w) {
		return this.x = w._x, this.y = w._y, this.z = w._z, this;
	}
	setFromColor(w) {
		return this.x = w.r, this.y = w.g, this.z = w.b, this;
	}
	equals(w) {
		return w.x === this.x && w.y === this.y && w.z === this.z;
	}
	fromArray(w, T = 0) {
		return this.x = w[T], this.y = w[T + 1], this.z = w[T + 2], this;
	}
	toArray(w = [], T = 0) {
		return w[T] = this.x, w[T + 1] = this.y, w[T + 2] = this.z, w;
	}
	fromBufferAttribute(w, T) {
		return this.x = w.getX(T), this.y = w.getY(T), this.z = w.getZ(T), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
	}
	randomDirection() {
		let w = Math.random() * Math.PI * 2, T = Math.random() * 2 - 1, O = Math.sqrt(1 - T * T);
		return this.x = O * Math.cos(w), this.y = T, this.z = O * Math.sin(w), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z;
	}
}, _vector$c = /* @__PURE__ */ new Vector3(), _quaternion$4 = /* @__PURE__ */ new Quaternion(), Matrix3 = class w {
	constructor(T, O, j, F, U, W, G, K, q) {
		w.prototype.isMatrix3 = !0, this.elements = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], T !== void 0 && this.set(T, O, j, F, U, W, G, K, q);
	}
	set(w, T, O, j, F, U, W, G, K) {
		let q = this.elements;
		return q[0] = w, q[1] = j, q[2] = W, q[3] = T, q[4] = F, q[5] = G, q[6] = O, q[7] = U, q[8] = K, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
	}
	copy(w) {
		let T = this.elements, O = w.elements;
		return T[0] = O[0], T[1] = O[1], T[2] = O[2], T[3] = O[3], T[4] = O[4], T[5] = O[5], T[6] = O[6], T[7] = O[7], T[8] = O[8], this;
	}
	extractBasis(w, T, O) {
		return w.setFromMatrix3Column(this, 0), T.setFromMatrix3Column(this, 1), O.setFromMatrix3Column(this, 2), this;
	}
	setFromMatrix4(w) {
		let T = w.elements;
		return this.set(T[0], T[4], T[8], T[1], T[5], T[9], T[2], T[6], T[10]), this;
	}
	multiply(w) {
		return this.multiplyMatrices(this, w);
	}
	premultiply(w) {
		return this.multiplyMatrices(w, this);
	}
	multiplyMatrices(w, T) {
		let O = w.elements, j = T.elements, F = this.elements, U = O[0], W = O[3], G = O[6], K = O[1], q = O[4], J = O[7], Y = O[2], X = O[5], Q = O[8], xS = j[0], SS = j[3], CS = j[6], wS = j[1], TS = j[4], ES = j[7], DS = j[2], OS = j[5], kS = j[8];
		return F[0] = U * xS + W * wS + G * DS, F[3] = U * SS + W * TS + G * OS, F[6] = U * CS + W * ES + G * kS, F[1] = K * xS + q * wS + J * DS, F[4] = K * SS + q * TS + J * OS, F[7] = K * CS + q * ES + J * kS, F[2] = Y * xS + X * wS + Q * DS, F[5] = Y * SS + X * TS + Q * OS, F[8] = Y * CS + X * ES + Q * kS, this;
	}
	multiplyScalar(w) {
		let T = this.elements;
		return T[0] *= w, T[3] *= w, T[6] *= w, T[1] *= w, T[4] *= w, T[7] *= w, T[2] *= w, T[5] *= w, T[8] *= w, this;
	}
	determinant() {
		let w = this.elements, T = w[0], O = w[1], j = w[2], F = w[3], U = w[4], W = w[5], G = w[6], K = w[7], q = w[8];
		return T * U * q - T * W * K - O * F * q + O * W * G + j * F * K - j * U * G;
	}
	invert() {
		let w = this.elements, T = w[0], O = w[1], j = w[2], F = w[3], U = w[4], W = w[5], G = w[6], K = w[7], q = w[8], J = q * U - W * K, Y = W * G - q * F, X = K * F - U * G, Q = T * J + O * Y + j * X;
		if (Q === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
		let xS = 1 / Q;
		return w[0] = J * xS, w[1] = (j * K - q * O) * xS, w[2] = (W * O - j * U) * xS, w[3] = Y * xS, w[4] = (q * T - j * G) * xS, w[5] = (j * F - W * T) * xS, w[6] = X * xS, w[7] = (O * G - K * T) * xS, w[8] = (U * T - O * F) * xS, this;
	}
	transpose() {
		let w, T = this.elements;
		return w = T[1], T[1] = T[3], T[3] = w, w = T[2], T[2] = T[6], T[6] = w, w = T[5], T[5] = T[7], T[7] = w, this;
	}
	getNormalMatrix(w) {
		return this.setFromMatrix4(w).invert().transpose();
	}
	transposeIntoArray(w) {
		let T = this.elements;
		return w[0] = T[0], w[1] = T[3], w[2] = T[6], w[3] = T[1], w[4] = T[4], w[5] = T[7], w[6] = T[2], w[7] = T[5], w[8] = T[8], this;
	}
	setUvTransform(w, T, O, j, F, U, W) {
		let G = Math.cos(F), K = Math.sin(F);
		return this.set(O * G, O * K, -O * (G * U + K * W) + U + w, -j * K, j * G, -j * (-K * U + G * W) + W + T, 0, 0, 1), this;
	}
	scale(w, T) {
		return this.premultiply(_m3.makeScale(w, T)), this;
	}
	rotate(w) {
		return this.premultiply(_m3.makeRotation(-w)), this;
	}
	translate(w, T) {
		return this.premultiply(_m3.makeTranslation(w, T)), this;
	}
	makeTranslation(w, T) {
		return w.isVector2 ? this.set(1, 0, w.x, 0, 1, w.y, 0, 0, 1) : this.set(1, 0, w, 0, 1, T, 0, 0, 1), this;
	}
	makeRotation(w) {
		let T = Math.cos(w), O = Math.sin(w);
		return this.set(T, -O, 0, O, T, 0, 0, 0, 1), this;
	}
	makeScale(w, T) {
		return this.set(w, 0, 0, 0, T, 0, 0, 0, 1), this;
	}
	equals(w) {
		let T = this.elements, O = w.elements;
		for (let w = 0; w < 9; w++) if (T[w] !== O[w]) return !1;
		return !0;
	}
	fromArray(w, T = 0) {
		for (let O = 0; O < 9; O++) this.elements[O] = w[O + T];
		return this;
	}
	toArray(w = [], T = 0) {
		let O = this.elements;
		return w[T] = O[0], w[T + 1] = O[1], w[T + 2] = O[2], w[T + 3] = O[3], w[T + 4] = O[4], w[T + 5] = O[5], w[T + 6] = O[6], w[T + 7] = O[7], w[T + 8] = O[8], w;
	}
	clone() {
		return new this.constructor().fromArray(this.elements);
	}
}, _m3 = /* @__PURE__ */ new Matrix3(), LINEAR_REC709_TO_XYZ = /* @__PURE__ */ new Matrix3().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322), XYZ_TO_LINEAR_REC709 = /* @__PURE__ */ new Matrix3().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);
function createColorManagement() {
	let w = {
		enabled: !0,
		workingColorSpace: LinearSRGBColorSpace,
		spaces: {},
		convert: function(w, T, O) {
			return this.enabled === !1 || T === O || !T || !O ? w : (this.spaces[T].transfer === "srgb" && (w.r = SRGBToLinear(w.r), w.g = SRGBToLinear(w.g), w.b = SRGBToLinear(w.b)), this.spaces[T].primaries !== this.spaces[O].primaries && (w.applyMatrix3(this.spaces[T].toXYZ), w.applyMatrix3(this.spaces[O].fromXYZ)), this.spaces[O].transfer === "srgb" && (w.r = LinearToSRGB(w.r), w.g = LinearToSRGB(w.g), w.b = LinearToSRGB(w.b)), w);
		},
		workingToColorSpace: function(w, T) {
			return this.convert(w, this.workingColorSpace, T);
		},
		colorSpaceToWorking: function(w, T) {
			return this.convert(w, T, this.workingColorSpace);
		},
		getPrimaries: function(w) {
			return this.spaces[w].primaries;
		},
		getTransfer: function(w) {
			return w === "" ? LinearTransfer : this.spaces[w].transfer;
		},
		getToneMappingMode: function(w) {
			return this.spaces[w].outputColorSpaceConfig.toneMappingMode || "standard";
		},
		getLuminanceCoefficients: function(w, T = this.workingColorSpace) {
			return w.fromArray(this.spaces[T].luminanceCoefficients);
		},
		define: function(w) {
			Object.assign(this.spaces, w);
		},
		_getMatrix: function(w, T, O) {
			return w.copy(this.spaces[T].toXYZ).multiply(this.spaces[O].fromXYZ);
		},
		_getDrawingBufferColorSpace: function(w) {
			return this.spaces[w].outputColorSpaceConfig.drawingBufferColorSpace;
		},
		_getUnpackColorSpace: function(w = this.workingColorSpace) {
			return this.spaces[w].workingColorSpaceConfig.unpackColorSpace;
		},
		fromWorkingColorSpace: function(T, O) {
			return warnOnce("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), w.workingToColorSpace(T, O);
		},
		toWorkingColorSpace: function(T, O) {
			return warnOnce("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), w.colorSpaceToWorking(T, O);
		}
	}, T = [
		.64,
		.33,
		.3,
		.6,
		.15,
		.06
	], O = [
		.2126,
		.7152,
		.0722
	], j = [.3127, .329];
	return w.define({
		[LinearSRGBColorSpace]: {
			primaries: T,
			whitePoint: j,
			transfer: LinearTransfer,
			toXYZ: LINEAR_REC709_TO_XYZ,
			fromXYZ: XYZ_TO_LINEAR_REC709,
			luminanceCoefficients: O,
			workingColorSpaceConfig: { unpackColorSpace: SRGBColorSpace },
			outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }
		},
		[SRGBColorSpace]: {
			primaries: T,
			whitePoint: j,
			transfer: SRGBTransfer,
			toXYZ: LINEAR_REC709_TO_XYZ,
			fromXYZ: XYZ_TO_LINEAR_REC709,
			luminanceCoefficients: O,
			outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }
		}
	}), w;
}
var ColorManagement = /* @__PURE__ */ createColorManagement();
function SRGBToLinear(w) {
	return w < .04045 ? w * .0773993808 : (w * .9478672986 + .0521327014) ** 2.4;
}
function LinearToSRGB(w) {
	return w < .0031308 ? w * 12.92 : 1.055 * w ** .41666 - .055;
}
var _canvas, ImageUtils = class {
	static getDataURL(w, T = "image/png") {
		if (/^data:/i.test(w.src) || typeof HTMLCanvasElement > "u") return w.src;
		let O;
		if (w instanceof HTMLCanvasElement) O = w;
		else {
			_canvas === void 0 && (_canvas = createElementNS("canvas")), _canvas.width = w.width, _canvas.height = w.height;
			let T = _canvas.getContext("2d");
			w instanceof ImageData ? T.putImageData(w, 0, 0) : T.drawImage(w, 0, 0, w.width, w.height), O = _canvas;
		}
		return O.toDataURL(T);
	}
	static sRGBToLinear(w) {
		if (typeof HTMLImageElement < "u" && w instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && w instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && w instanceof ImageBitmap) {
			let T = createElementNS("canvas");
			T.width = w.width, T.height = w.height;
			let O = T.getContext("2d");
			O.drawImage(w, 0, 0, w.width, w.height);
			let j = O.getImageData(0, 0, w.width, w.height), F = j.data;
			for (let w = 0; w < F.length; w++) F[w] = SRGBToLinear(F[w] / 255) * 255;
			return O.putImageData(j, 0, 0), T;
		} else if (w.data) {
			let T = w.data.slice(0);
			for (let w = 0; w < T.length; w++) T instanceof Uint8Array || T instanceof Uint8ClampedArray ? T[w] = Math.floor(SRGBToLinear(T[w] / 255) * 255) : T[w] = SRGBToLinear(T[w]);
			return {
				data: T,
				width: w.width,
				height: w.height
			};
		} else return warn("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), w;
	}
}, _sourceId = 0, Source = class {
	constructor(w = null) {
		this.isSource = !0, Object.defineProperty(this, "id", { value: _sourceId++ }), this.uuid = generateUUID(), this.data = w, this.dataReady = !0, this.version = 0;
	}
	getSize(w) {
		let T = this.data;
		return typeof HTMLVideoElement < "u" && T instanceof HTMLVideoElement ? w.set(T.videoWidth, T.videoHeight, 0) : typeof VideoFrame < "u" && T instanceof VideoFrame ? w.set(T.displayHeight, T.displayWidth, 0) : T === null ? w.set(0, 0, 0) : w.set(T.width, T.height, T.depth || 0), w;
	}
	set needsUpdate(w) {
		w === !0 && this.version++;
	}
	toJSON(w) {
		let T = w === void 0 || typeof w == "string";
		if (!T && w.images[this.uuid] !== void 0) return w.images[this.uuid];
		let O = {
			uuid: this.uuid,
			url: ""
		}, j = this.data;
		if (j !== null) {
			let w;
			if (Array.isArray(j)) {
				w = [];
				for (let T = 0, O = j.length; T < O; T++) j[T].isDataTexture ? w.push(serializeImage(j[T].image)) : w.push(serializeImage(j[T]));
			} else w = serializeImage(j);
			O.url = w;
		}
		return T || (w.images[this.uuid] = O), O;
	}
};
function serializeImage(w) {
	return typeof HTMLImageElement < "u" && w instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && w instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && w instanceof ImageBitmap ? ImageUtils.getDataURL(w) : w.data ? {
		data: Array.from(w.data),
		width: w.width,
		height: w.height,
		type: w.data.constructor.name
	} : (warn("Texture: Unable to serialize Texture."), {});
}
var _textureId = 0, _tempVec3 = /* @__PURE__ */ new Vector3(), Texture = class w extends EventDispatcher {
	constructor(T = w.DEFAULT_IMAGE, O = w.DEFAULT_MAPPING, j = ClampToEdgeWrapping, F = ClampToEdgeWrapping, U = LinearFilter, W = LinearMipmapLinearFilter, G = RGBAFormat, K = UnsignedByteType, q = w.DEFAULT_ANISOTROPY, J = "") {
		super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: _textureId++ }), this.uuid = generateUUID(), this.name = "", this.source = new Source(T), this.mipmaps = [], this.mapping = O, this.channel = 0, this.wrapS = j, this.wrapT = F, this.magFilter = U, this.minFilter = W, this.anisotropy = q, this.format = G, this.internalFormat = null, this.type = K, this.offset = new Vector2(0, 0), this.repeat = new Vector2(1, 1), this.center = new Vector2(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Matrix3(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = J, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(T && T.depth && T.depth > 1), this.pmremVersion = 0;
	}
	get width() {
		return this.source.getSize(_tempVec3).x;
	}
	get height() {
		return this.source.getSize(_tempVec3).y;
	}
	get depth() {
		return this.source.getSize(_tempVec3).z;
	}
	get image() {
		return this.source.data;
	}
	set image(w = null) {
		this.source.data = w;
	}
	updateMatrix() {
		this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
	}
	addUpdateRange(w, T) {
		this.updateRanges.push({
			start: w,
			count: T
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(w) {
		return this.name = w.name, this.source = w.source, this.mipmaps = w.mipmaps.slice(0), this.mapping = w.mapping, this.channel = w.channel, this.wrapS = w.wrapS, this.wrapT = w.wrapT, this.magFilter = w.magFilter, this.minFilter = w.minFilter, this.anisotropy = w.anisotropy, this.format = w.format, this.internalFormat = w.internalFormat, this.type = w.type, this.offset.copy(w.offset), this.repeat.copy(w.repeat), this.center.copy(w.center), this.rotation = w.rotation, this.matrixAutoUpdate = w.matrixAutoUpdate, this.matrix.copy(w.matrix), this.generateMipmaps = w.generateMipmaps, this.premultiplyAlpha = w.premultiplyAlpha, this.flipY = w.flipY, this.unpackAlignment = w.unpackAlignment, this.colorSpace = w.colorSpace, this.renderTarget = w.renderTarget, this.isRenderTargetTexture = w.isRenderTargetTexture, this.isArrayTexture = w.isArrayTexture, this.userData = JSON.parse(JSON.stringify(w.userData)), this.needsUpdate = !0, this;
	}
	setValues(w) {
		for (let T in w) {
			let O = w[T];
			if (O === void 0) {
				warn(`Texture.setValues(): parameter '${T}' has value of undefined.`);
				continue;
			}
			let j = this[T];
			if (j === void 0) {
				warn(`Texture.setValues(): property '${T}' does not exist.`);
				continue;
			}
			j && O && j.isVector2 && O.isVector2 || j && O && j.isVector3 && O.isVector3 || j && O && j.isMatrix3 && O.isMatrix3 ? j.copy(O) : this[T] = O;
		}
	}
	toJSON(w) {
		let T = w === void 0 || typeof w == "string";
		if (!T && w.textures[this.uuid] !== void 0) return w.textures[this.uuid];
		let O = {
			metadata: {
				version: 4.7,
				type: "Texture",
				generator: "Texture.toJSON"
			},
			uuid: this.uuid,
			name: this.name,
			image: this.source.toJSON(w).uuid,
			mapping: this.mapping,
			channel: this.channel,
			repeat: [this.repeat.x, this.repeat.y],
			offset: [this.offset.x, this.offset.y],
			center: [this.center.x, this.center.y],
			rotation: this.rotation,
			wrap: [this.wrapS, this.wrapT],
			format: this.format,
			internalFormat: this.internalFormat,
			type: this.type,
			colorSpace: this.colorSpace,
			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy,
			flipY: this.flipY,
			generateMipmaps: this.generateMipmaps,
			premultiplyAlpha: this.premultiplyAlpha,
			unpackAlignment: this.unpackAlignment
		};
		return Object.keys(this.userData).length > 0 && (O.userData = this.userData), T || (w.textures[this.uuid] = O), O;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	transformUv(w) {
		if (this.mapping !== 300) return w;
		if (w.applyMatrix3(this.matrix), w.x < 0 || w.x > 1) switch (this.wrapS) {
			case RepeatWrapping:
				w.x -= Math.floor(w.x);
				break;
			case ClampToEdgeWrapping:
				w.x = w.x < 0 ? 0 : 1;
				break;
			case MirroredRepeatWrapping:
				Math.abs(Math.floor(w.x) % 2) === 1 ? w.x = Math.ceil(w.x) - w.x : w.x -= Math.floor(w.x);
				break;
		}
		if (w.y < 0 || w.y > 1) switch (this.wrapT) {
			case RepeatWrapping:
				w.y -= Math.floor(w.y);
				break;
			case ClampToEdgeWrapping:
				w.y = w.y < 0 ? 0 : 1;
				break;
			case MirroredRepeatWrapping:
				Math.abs(Math.floor(w.y) % 2) === 1 ? w.y = Math.ceil(w.y) - w.y : w.y -= Math.floor(w.y);
				break;
		}
		return this.flipY && (w.y = 1 - w.y), w;
	}
	set needsUpdate(w) {
		w === !0 && (this.version++, this.source.needsUpdate = !0);
	}
	set needsPMREMUpdate(w) {
		w === !0 && this.pmremVersion++;
	}
};
Texture.DEFAULT_IMAGE = null, Texture.DEFAULT_MAPPING = 300, Texture.DEFAULT_ANISOTROPY = 1;
var Vector4 = class w {
	constructor(T = 0, O = 0, j = 0, F = 1) {
		w.prototype.isVector4 = !0, this.x = T, this.y = O, this.z = j, this.w = F;
	}
	get width() {
		return this.z;
	}
	set width(w) {
		this.z = w;
	}
	get height() {
		return this.w;
	}
	set height(w) {
		this.w = w;
	}
	set(w, T, O, j) {
		return this.x = w, this.y = T, this.z = O, this.w = j, this;
	}
	setScalar(w) {
		return this.x = w, this.y = w, this.z = w, this.w = w, this;
	}
	setX(w) {
		return this.x = w, this;
	}
	setY(w) {
		return this.y = w, this;
	}
	setZ(w) {
		return this.z = w, this;
	}
	setW(w) {
		return this.w = w, this;
	}
	setComponent(w, T) {
		switch (w) {
			case 0:
				this.x = T;
				break;
			case 1:
				this.y = T;
				break;
			case 2:
				this.z = T;
				break;
			case 3:
				this.w = T;
				break;
			default: throw Error("index is out of range: " + w);
		}
		return this;
	}
	getComponent(w) {
		switch (w) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw Error("index is out of range: " + w);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z, this.w);
	}
	copy(w) {
		return this.x = w.x, this.y = w.y, this.z = w.z, this.w = w.w === void 0 ? 1 : w.w, this;
	}
	add(w) {
		return this.x += w.x, this.y += w.y, this.z += w.z, this.w += w.w, this;
	}
	addScalar(w) {
		return this.x += w, this.y += w, this.z += w, this.w += w, this;
	}
	addVectors(w, T) {
		return this.x = w.x + T.x, this.y = w.y + T.y, this.z = w.z + T.z, this.w = w.w + T.w, this;
	}
	addScaledVector(w, T) {
		return this.x += w.x * T, this.y += w.y * T, this.z += w.z * T, this.w += w.w * T, this;
	}
	sub(w) {
		return this.x -= w.x, this.y -= w.y, this.z -= w.z, this.w -= w.w, this;
	}
	subScalar(w) {
		return this.x -= w, this.y -= w, this.z -= w, this.w -= w, this;
	}
	subVectors(w, T) {
		return this.x = w.x - T.x, this.y = w.y - T.y, this.z = w.z - T.z, this.w = w.w - T.w, this;
	}
	multiply(w) {
		return this.x *= w.x, this.y *= w.y, this.z *= w.z, this.w *= w.w, this;
	}
	multiplyScalar(w) {
		return this.x *= w, this.y *= w, this.z *= w, this.w *= w, this;
	}
	applyMatrix4(w) {
		let T = this.x, O = this.y, j = this.z, F = this.w, U = w.elements;
		return this.x = U[0] * T + U[4] * O + U[8] * j + U[12] * F, this.y = U[1] * T + U[5] * O + U[9] * j + U[13] * F, this.z = U[2] * T + U[6] * O + U[10] * j + U[14] * F, this.w = U[3] * T + U[7] * O + U[11] * j + U[15] * F, this;
	}
	divide(w) {
		return this.x /= w.x, this.y /= w.y, this.z /= w.z, this.w /= w.w, this;
	}
	divideScalar(w) {
		return this.multiplyScalar(1 / w);
	}
	setAxisAngleFromQuaternion(w) {
		this.w = 2 * Math.acos(w.w);
		let T = Math.sqrt(1 - w.w * w.w);
		return T < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = w.x / T, this.y = w.y / T, this.z = w.z / T), this;
	}
	setAxisAngleFromRotationMatrix(w) {
		let T, O, j, F, U = .01, W = .1, G = w.elements, K = G[0], q = G[4], J = G[8], Y = G[1], X = G[5], Q = G[9], xS = G[2], SS = G[6], CS = G[10];
		if (Math.abs(q - Y) < U && Math.abs(J - xS) < U && Math.abs(Q - SS) < U) {
			if (Math.abs(q + Y) < W && Math.abs(J + xS) < W && Math.abs(Q + SS) < W && Math.abs(K + X + CS - 3) < W) return this.set(1, 0, 0, 0), this;
			T = Math.PI;
			let w = (K + 1) / 2, G = (X + 1) / 2, wS = (CS + 1) / 2, TS = (q + Y) / 4, ES = (J + xS) / 4, DS = (Q + SS) / 4;
			return w > G && w > wS ? w < U ? (O = 0, j = .707106781, F = .707106781) : (O = Math.sqrt(w), j = TS / O, F = ES / O) : G > wS ? G < U ? (O = .707106781, j = 0, F = .707106781) : (j = Math.sqrt(G), O = TS / j, F = DS / j) : wS < U ? (O = .707106781, j = .707106781, F = 0) : (F = Math.sqrt(wS), O = ES / F, j = DS / F), this.set(O, j, F, T), this;
		}
		let wS = Math.sqrt((SS - Q) * (SS - Q) + (J - xS) * (J - xS) + (Y - q) * (Y - q));
		return Math.abs(wS) < .001 && (wS = 1), this.x = (SS - Q) / wS, this.y = (J - xS) / wS, this.z = (Y - q) / wS, this.w = Math.acos((K + X + CS - 1) / 2), this;
	}
	setFromMatrixPosition(w) {
		let T = w.elements;
		return this.x = T[12], this.y = T[13], this.z = T[14], this.w = T[15], this;
	}
	min(w) {
		return this.x = Math.min(this.x, w.x), this.y = Math.min(this.y, w.y), this.z = Math.min(this.z, w.z), this.w = Math.min(this.w, w.w), this;
	}
	max(w) {
		return this.x = Math.max(this.x, w.x), this.y = Math.max(this.y, w.y), this.z = Math.max(this.z, w.z), this.w = Math.max(this.w, w.w), this;
	}
	clamp(w, T) {
		return this.x = clamp$6(this.x, w.x, T.x), this.y = clamp$6(this.y, w.y, T.y), this.z = clamp$6(this.z, w.z, T.z), this.w = clamp$6(this.w, w.w, T.w), this;
	}
	clampScalar(w, T) {
		return this.x = clamp$6(this.x, w, T), this.y = clamp$6(this.y, w, T), this.z = clamp$6(this.z, w, T), this.w = clamp$6(this.w, w, T), this;
	}
	clampLength(w, T) {
		let O = this.length();
		return this.divideScalar(O || 1).multiplyScalar(clamp$6(O, w, T));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
	}
	dot(w) {
		return this.x * w.x + this.y * w.y + this.z * w.z + this.w * w.w;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(w) {
		return this.normalize().multiplyScalar(w);
	}
	lerp(w, T) {
		return this.x += (w.x - this.x) * T, this.y += (w.y - this.y) * T, this.z += (w.z - this.z) * T, this.w += (w.w - this.w) * T, this;
	}
	lerpVectors(w, T, O) {
		return this.x = w.x + (T.x - w.x) * O, this.y = w.y + (T.y - w.y) * O, this.z = w.z + (T.z - w.z) * O, this.w = w.w + (T.w - w.w) * O, this;
	}
	equals(w) {
		return w.x === this.x && w.y === this.y && w.z === this.z && w.w === this.w;
	}
	fromArray(w, T = 0) {
		return this.x = w[T], this.y = w[T + 1], this.z = w[T + 2], this.w = w[T + 3], this;
	}
	toArray(w = [], T = 0) {
		return w[T] = this.x, w[T + 1] = this.y, w[T + 2] = this.z, w[T + 3] = this.w, w;
	}
	fromBufferAttribute(w, T) {
		return this.x = w.getX(T), this.y = w.getY(T), this.z = w.getZ(T), this.w = w.getW(T), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z, yield this.w;
	}
}, RenderTarget = class extends EventDispatcher {
	constructor(w = 1, T = 1, O = {}) {
		super(), O = Object.assign({
			generateMipmaps: !1,
			internalFormat: null,
			minFilter: LinearFilter,
			depthBuffer: !0,
			stencilBuffer: !1,
			resolveDepthBuffer: !0,
			resolveStencilBuffer: !0,
			depthTexture: null,
			samples: 0,
			count: 1,
			depth: 1,
			multiview: !1
		}, O), this.isRenderTarget = !0, this.width = w, this.height = T, this.depth = O.depth, this.scissor = new Vector4(0, 0, w, T), this.scissorTest = !1, this.viewport = new Vector4(0, 0, w, T);
		let j = new Texture({
			width: w,
			height: T,
			depth: O.depth
		});
		this.textures = [];
		let F = O.count;
		for (let w = 0; w < F; w++) this.textures[w] = j.clone(), this.textures[w].isRenderTargetTexture = !0, this.textures[w].renderTarget = this;
		this._setTextureOptions(O), this.depthBuffer = O.depthBuffer, this.stencilBuffer = O.stencilBuffer, this.resolveDepthBuffer = O.resolveDepthBuffer, this.resolveStencilBuffer = O.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = O.depthTexture, this.samples = O.samples, this.multiview = O.multiview;
	}
	_setTextureOptions(w = {}) {
		let T = {
			minFilter: LinearFilter,
			generateMipmaps: !1,
			flipY: !1,
			internalFormat: null
		};
		w.mapping !== void 0 && (T.mapping = w.mapping), w.wrapS !== void 0 && (T.wrapS = w.wrapS), w.wrapT !== void 0 && (T.wrapT = w.wrapT), w.wrapR !== void 0 && (T.wrapR = w.wrapR), w.magFilter !== void 0 && (T.magFilter = w.magFilter), w.minFilter !== void 0 && (T.minFilter = w.minFilter), w.format !== void 0 && (T.format = w.format), w.type !== void 0 && (T.type = w.type), w.anisotropy !== void 0 && (T.anisotropy = w.anisotropy), w.colorSpace !== void 0 && (T.colorSpace = w.colorSpace), w.flipY !== void 0 && (T.flipY = w.flipY), w.generateMipmaps !== void 0 && (T.generateMipmaps = w.generateMipmaps), w.internalFormat !== void 0 && (T.internalFormat = w.internalFormat);
		for (let w = 0; w < this.textures.length; w++) this.textures[w].setValues(T);
	}
	get texture() {
		return this.textures[0];
	}
	set texture(w) {
		this.textures[0] = w;
	}
	set depthTexture(w) {
		this._depthTexture !== null && (this._depthTexture.renderTarget = null), w !== null && (w.renderTarget = this), this._depthTexture = w;
	}
	get depthTexture() {
		return this._depthTexture;
	}
	setSize(w, T, O = 1) {
		if (this.width !== w || this.height !== T || this.depth !== O) {
			this.width = w, this.height = T, this.depth = O;
			for (let j = 0, F = this.textures.length; j < F; j++) this.textures[j].image.width = w, this.textures[j].image.height = T, this.textures[j].image.depth = O, this.textures[j].isData3DTexture !== !0 && (this.textures[j].isArrayTexture = this.textures[j].image.depth > 1);
			this.dispose();
		}
		this.viewport.set(0, 0, w, T), this.scissor.set(0, 0, w, T);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(w) {
		this.width = w.width, this.height = w.height, this.depth = w.depth, this.scissor.copy(w.scissor), this.scissorTest = w.scissorTest, this.viewport.copy(w.viewport), this.textures.length = 0;
		for (let T = 0, O = w.textures.length; T < O; T++) {
			this.textures[T] = w.textures[T].clone(), this.textures[T].isRenderTargetTexture = !0, this.textures[T].renderTarget = this;
			let O = Object.assign({}, w.textures[T].image);
			this.textures[T].source = new Source(O);
		}
		return this.depthBuffer = w.depthBuffer, this.stencilBuffer = w.stencilBuffer, this.resolveDepthBuffer = w.resolveDepthBuffer, this.resolveStencilBuffer = w.resolveStencilBuffer, w.depthTexture !== null && (this.depthTexture = w.depthTexture.clone()), this.samples = w.samples, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, WebGLRenderTarget = class extends RenderTarget {
	constructor(w = 1, T = 1, O = {}) {
		super(w, T, O), this.isWebGLRenderTarget = !0;
	}
}, DataArrayTexture = class extends Texture {
	constructor(w = null, T = 1, O = 1, j = 1) {
		super(null), this.isDataArrayTexture = !0, this.image = {
			data: w,
			width: T,
			height: O,
			depth: j
		}, this.magFilter = NearestFilter, this.minFilter = NearestFilter, this.wrapR = ClampToEdgeWrapping, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
	}
	addLayerUpdate(w) {
		this.layerUpdates.add(w);
	}
	clearLayerUpdates() {
		this.layerUpdates.clear();
	}
}, Data3DTexture = class extends Texture {
	constructor(w = null, T = 1, O = 1, j = 1) {
		super(null), this.isData3DTexture = !0, this.image = {
			data: w,
			width: T,
			height: O,
			depth: j
		}, this.magFilter = NearestFilter, this.minFilter = NearestFilter, this.wrapR = ClampToEdgeWrapping, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
}, Box3 = class {
	constructor(w = new Vector3(Infinity, Infinity, Infinity), T = new Vector3(-Infinity, -Infinity, -Infinity)) {
		this.isBox3 = !0, this.min = w, this.max = T;
	}
	set(w, T) {
		return this.min.copy(w), this.max.copy(T), this;
	}
	setFromArray(w) {
		this.makeEmpty();
		for (let T = 0, O = w.length; T < O; T += 3) this.expandByPoint(_vector$b.fromArray(w, T));
		return this;
	}
	setFromBufferAttribute(w) {
		this.makeEmpty();
		for (let T = 0, O = w.count; T < O; T++) this.expandByPoint(_vector$b.fromBufferAttribute(w, T));
		return this;
	}
	setFromPoints(w) {
		this.makeEmpty();
		for (let T = 0, O = w.length; T < O; T++) this.expandByPoint(w[T]);
		return this;
	}
	setFromCenterAndSize(w, T) {
		let O = _vector$b.copy(T).multiplyScalar(.5);
		return this.min.copy(w).sub(O), this.max.copy(w).add(O), this;
	}
	setFromObject(w, T = !1) {
		return this.makeEmpty(), this.expandByObject(w, T);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(w) {
		return this.min.copy(w.min), this.max.copy(w.max), this;
	}
	makeEmpty() {
		return this.min.x = this.min.y = this.min.z = Infinity, this.max.x = this.max.y = this.max.z = -Infinity, this;
	}
	isEmpty() {
		return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
	}
	getCenter(w) {
		return this.isEmpty() ? w.set(0, 0, 0) : w.addVectors(this.min, this.max).multiplyScalar(.5);
	}
	getSize(w) {
		return this.isEmpty() ? w.set(0, 0, 0) : w.subVectors(this.max, this.min);
	}
	expandByPoint(w) {
		return this.min.min(w), this.max.max(w), this;
	}
	expandByVector(w) {
		return this.min.sub(w), this.max.add(w), this;
	}
	expandByScalar(w) {
		return this.min.addScalar(-w), this.max.addScalar(w), this;
	}
	expandByObject(w, T = !1) {
		w.updateWorldMatrix(!1, !1);
		let O = w.geometry;
		if (O !== void 0) {
			let j = O.getAttribute("position");
			if (T === !0 && j !== void 0 && w.isInstancedMesh !== !0) for (let T = 0, O = j.count; T < O; T++) w.isMesh === !0 ? w.getVertexPosition(T, _vector$b) : _vector$b.fromBufferAttribute(j, T), _vector$b.applyMatrix4(w.matrixWorld), this.expandByPoint(_vector$b);
			else w.boundingBox === void 0 ? (O.boundingBox === null && O.computeBoundingBox(), _box$4.copy(O.boundingBox)) : (w.boundingBox === null && w.computeBoundingBox(), _box$4.copy(w.boundingBox)), _box$4.applyMatrix4(w.matrixWorld), this.union(_box$4);
		}
		let j = w.children;
		for (let w = 0, O = j.length; w < O; w++) this.expandByObject(j[w], T);
		return this;
	}
	containsPoint(w) {
		return w.x >= this.min.x && w.x <= this.max.x && w.y >= this.min.y && w.y <= this.max.y && w.z >= this.min.z && w.z <= this.max.z;
	}
	containsBox(w) {
		return this.min.x <= w.min.x && w.max.x <= this.max.x && this.min.y <= w.min.y && w.max.y <= this.max.y && this.min.z <= w.min.z && w.max.z <= this.max.z;
	}
	getParameter(w, T) {
		return T.set((w.x - this.min.x) / (this.max.x - this.min.x), (w.y - this.min.y) / (this.max.y - this.min.y), (w.z - this.min.z) / (this.max.z - this.min.z));
	}
	intersectsBox(w) {
		return w.max.x >= this.min.x && w.min.x <= this.max.x && w.max.y >= this.min.y && w.min.y <= this.max.y && w.max.z >= this.min.z && w.min.z <= this.max.z;
	}
	intersectsSphere(w) {
		return this.clampPoint(w.center, _vector$b), _vector$b.distanceToSquared(w.center) <= w.radius * w.radius;
	}
	intersectsPlane(w) {
		let T, O;
		return w.normal.x > 0 ? (T = w.normal.x * this.min.x, O = w.normal.x * this.max.x) : (T = w.normal.x * this.max.x, O = w.normal.x * this.min.x), w.normal.y > 0 ? (T += w.normal.y * this.min.y, O += w.normal.y * this.max.y) : (T += w.normal.y * this.max.y, O += w.normal.y * this.min.y), w.normal.z > 0 ? (T += w.normal.z * this.min.z, O += w.normal.z * this.max.z) : (T += w.normal.z * this.max.z, O += w.normal.z * this.min.z), T <= -w.constant && O >= -w.constant;
	}
	intersectsTriangle(w) {
		if (this.isEmpty()) return !1;
		this.getCenter(_center), _extents.subVectors(this.max, _center), _v0$2.subVectors(w.a, _center), _v1$7.subVectors(w.b, _center), _v2$4.subVectors(w.c, _center), _f0.subVectors(_v1$7, _v0$2), _f1.subVectors(_v2$4, _v1$7), _f2.subVectors(_v0$2, _v2$4);
		let T = [
			0,
			-_f0.z,
			_f0.y,
			0,
			-_f1.z,
			_f1.y,
			0,
			-_f2.z,
			_f2.y,
			_f0.z,
			0,
			-_f0.x,
			_f1.z,
			0,
			-_f1.x,
			_f2.z,
			0,
			-_f2.x,
			-_f0.y,
			_f0.x,
			0,
			-_f1.y,
			_f1.x,
			0,
			-_f2.y,
			_f2.x,
			0
		];
		return !satForAxes(T, _v0$2, _v1$7, _v2$4, _extents) || (T = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], !satForAxes(T, _v0$2, _v1$7, _v2$4, _extents)) ? !1 : (_triangleNormal.crossVectors(_f0, _f1), T = [
			_triangleNormal.x,
			_triangleNormal.y,
			_triangleNormal.z
		], satForAxes(T, _v0$2, _v1$7, _v2$4, _extents));
	}
	clampPoint(w, T) {
		return T.copy(w).clamp(this.min, this.max);
	}
	distanceToPoint(w) {
		return this.clampPoint(w, _vector$b).distanceTo(w);
	}
	getBoundingSphere(w) {
		return this.isEmpty() ? w.makeEmpty() : (this.getCenter(w.center), w.radius = this.getSize(_vector$b).length() * .5), w;
	}
	intersect(w) {
		return this.min.max(w.min), this.max.min(w.max), this.isEmpty() && this.makeEmpty(), this;
	}
	union(w) {
		return this.min.min(w.min), this.max.max(w.max), this;
	}
	applyMatrix4(w) {
		return this.isEmpty() ? this : (_points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(w), _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(w), _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(w), _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(w), _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(w), _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(w), _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(w), _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(w), this.setFromPoints(_points), this);
	}
	translate(w) {
		return this.min.add(w), this.max.add(w), this;
	}
	equals(w) {
		return w.min.equals(this.min) && w.max.equals(this.max);
	}
	toJSON() {
		return {
			min: this.min.toArray(),
			max: this.max.toArray()
		};
	}
	fromJSON(w) {
		return this.min.fromArray(w.min), this.max.fromArray(w.max), this;
	}
}, _points = [
	/* @__PURE__ */ new Vector3(),
	/* @__PURE__ */ new Vector3(),
	/* @__PURE__ */ new Vector3(),
	/* @__PURE__ */ new Vector3(),
	/* @__PURE__ */ new Vector3(),
	/* @__PURE__ */ new Vector3(),
	/* @__PURE__ */ new Vector3(),
	/* @__PURE__ */ new Vector3()
], _vector$b = /* @__PURE__ */ new Vector3(), _box$4 = /* @__PURE__ */ new Box3(), _v0$2 = /* @__PURE__ */ new Vector3(), _v1$7 = /* @__PURE__ */ new Vector3(), _v2$4 = /* @__PURE__ */ new Vector3(), _f0 = /* @__PURE__ */ new Vector3(), _f1 = /* @__PURE__ */ new Vector3(), _f2 = /* @__PURE__ */ new Vector3(), _center = /* @__PURE__ */ new Vector3(), _extents = /* @__PURE__ */ new Vector3(), _triangleNormal = /* @__PURE__ */ new Vector3(), _testAxis = /* @__PURE__ */ new Vector3();
function satForAxes(w, T, O, j, F) {
	for (let U = 0, W = w.length - 3; U <= W; U += 3) {
		_testAxis.fromArray(w, U);
		let W = F.x * Math.abs(_testAxis.x) + F.y * Math.abs(_testAxis.y) + F.z * Math.abs(_testAxis.z), G = T.dot(_testAxis), K = O.dot(_testAxis), q = j.dot(_testAxis);
		if (Math.max(-Math.max(G, K, q), Math.min(G, K, q)) > W) return !1;
	}
	return !0;
}
var _box$3 = /* @__PURE__ */ new Box3(), _v1$6 = /* @__PURE__ */ new Vector3(), _v2$3 = /* @__PURE__ */ new Vector3(), Sphere = class {
	constructor(w = new Vector3(), T = -1) {
		this.isSphere = !0, this.center = w, this.radius = T;
	}
	set(w, T) {
		return this.center.copy(w), this.radius = T, this;
	}
	setFromPoints(w, T) {
		let O = this.center;
		T === void 0 ? _box$3.setFromPoints(w).getCenter(O) : O.copy(T);
		let j = 0;
		for (let T = 0, F = w.length; T < F; T++) j = Math.max(j, O.distanceToSquared(w[T]));
		return this.radius = Math.sqrt(j), this;
	}
	copy(w) {
		return this.center.copy(w.center), this.radius = w.radius, this;
	}
	isEmpty() {
		return this.radius < 0;
	}
	makeEmpty() {
		return this.center.set(0, 0, 0), this.radius = -1, this;
	}
	containsPoint(w) {
		return w.distanceToSquared(this.center) <= this.radius * this.radius;
	}
	distanceToPoint(w) {
		return w.distanceTo(this.center) - this.radius;
	}
	intersectsSphere(w) {
		let T = this.radius + w.radius;
		return w.center.distanceToSquared(this.center) <= T * T;
	}
	intersectsBox(w) {
		return w.intersectsSphere(this);
	}
	intersectsPlane(w) {
		return Math.abs(w.distanceToPoint(this.center)) <= this.radius;
	}
	clampPoint(w, T) {
		let O = this.center.distanceToSquared(w);
		return T.copy(w), O > this.radius * this.radius && (T.sub(this.center).normalize(), T.multiplyScalar(this.radius).add(this.center)), T;
	}
	getBoundingBox(w) {
		return this.isEmpty() ? (w.makeEmpty(), w) : (w.set(this.center, this.center), w.expandByScalar(this.radius), w);
	}
	applyMatrix4(w) {
		return this.center.applyMatrix4(w), this.radius *= w.getMaxScaleOnAxis(), this;
	}
	translate(w) {
		return this.center.add(w), this;
	}
	expandByPoint(w) {
		if (this.isEmpty()) return this.center.copy(w), this.radius = 0, this;
		_v1$6.subVectors(w, this.center);
		let T = _v1$6.lengthSq();
		if (T > this.radius * this.radius) {
			let w = Math.sqrt(T), O = (w - this.radius) * .5;
			this.center.addScaledVector(_v1$6, O / w), this.radius += O;
		}
		return this;
	}
	union(w) {
		return w.isEmpty() ? this : this.isEmpty() ? (this.copy(w), this) : (this.center.equals(w.center) === !0 ? this.radius = Math.max(this.radius, w.radius) : (_v2$3.subVectors(w.center, this.center).setLength(w.radius), this.expandByPoint(_v1$6.copy(w.center).add(_v2$3)), this.expandByPoint(_v1$6.copy(w.center).sub(_v2$3))), this);
	}
	equals(w) {
		return w.center.equals(this.center) && w.radius === this.radius;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		return {
			radius: this.radius,
			center: this.center.toArray()
		};
	}
	fromJSON(w) {
		return this.radius = w.radius, this.center.fromArray(w.center), this;
	}
}, _vector$a = /* @__PURE__ */ new Vector3(), _segCenter = /* @__PURE__ */ new Vector3(), _segDir = /* @__PURE__ */ new Vector3(), _diff = /* @__PURE__ */ new Vector3(), _edge1 = /* @__PURE__ */ new Vector3(), _edge2 = /* @__PURE__ */ new Vector3(), _normal$1 = /* @__PURE__ */ new Vector3(), Ray = class {
	constructor(w = new Vector3(), T = new Vector3(0, 0, -1)) {
		this.origin = w, this.direction = T;
	}
	set(w, T) {
		return this.origin.copy(w), this.direction.copy(T), this;
	}
	copy(w) {
		return this.origin.copy(w.origin), this.direction.copy(w.direction), this;
	}
	at(w, T) {
		return T.copy(this.origin).addScaledVector(this.direction, w);
	}
	lookAt(w) {
		return this.direction.copy(w).sub(this.origin).normalize(), this;
	}
	recast(w) {
		return this.origin.copy(this.at(w, _vector$a)), this;
	}
	closestPointToPoint(w, T) {
		T.subVectors(w, this.origin);
		let O = T.dot(this.direction);
		return O < 0 ? T.copy(this.origin) : T.copy(this.origin).addScaledVector(this.direction, O);
	}
	distanceToPoint(w) {
		return Math.sqrt(this.distanceSqToPoint(w));
	}
	distanceSqToPoint(w) {
		let T = _vector$a.subVectors(w, this.origin).dot(this.direction);
		return T < 0 ? this.origin.distanceToSquared(w) : (_vector$a.copy(this.origin).addScaledVector(this.direction, T), _vector$a.distanceToSquared(w));
	}
	distanceSqToSegment(w, T, O, j) {
		_segCenter.copy(w).add(T).multiplyScalar(.5), _segDir.copy(T).sub(w).normalize(), _diff.copy(this.origin).sub(_segCenter);
		let F = w.distanceTo(T) * .5, U = -this.direction.dot(_segDir), W = _diff.dot(this.direction), G = -_diff.dot(_segDir), K = _diff.lengthSq(), q = Math.abs(1 - U * U), J, Y, X, Q;
		if (q > 0) if (J = U * G - W, Y = U * W - G, Q = F * q, J >= 0) if (Y >= -Q) if (Y <= Q) {
			let w = 1 / q;
			J *= w, Y *= w, X = J * (J + U * Y + 2 * W) + Y * (U * J + Y + 2 * G) + K;
		} else Y = F, J = Math.max(0, -(U * Y + W)), X = -J * J + Y * (Y + 2 * G) + K;
		else Y = -F, J = Math.max(0, -(U * Y + W)), X = -J * J + Y * (Y + 2 * G) + K;
		else Y <= -Q ? (J = Math.max(0, -(-U * F + W)), Y = J > 0 ? -F : Math.min(Math.max(-F, -G), F), X = -J * J + Y * (Y + 2 * G) + K) : Y <= Q ? (J = 0, Y = Math.min(Math.max(-F, -G), F), X = Y * (Y + 2 * G) + K) : (J = Math.max(0, -(U * F + W)), Y = J > 0 ? F : Math.min(Math.max(-F, -G), F), X = -J * J + Y * (Y + 2 * G) + K);
		else Y = U > 0 ? -F : F, J = Math.max(0, -(U * Y + W)), X = -J * J + Y * (Y + 2 * G) + K;
		return O && O.copy(this.origin).addScaledVector(this.direction, J), j && j.copy(_segCenter).addScaledVector(_segDir, Y), X;
	}
	intersectSphere(w, T) {
		_vector$a.subVectors(w.center, this.origin);
		let O = _vector$a.dot(this.direction), j = _vector$a.dot(_vector$a) - O * O, F = w.radius * w.radius;
		if (j > F) return null;
		let U = Math.sqrt(F - j), W = O - U, G = O + U;
		return G < 0 ? null : W < 0 ? this.at(G, T) : this.at(W, T);
	}
	intersectsSphere(w) {
		return w.radius < 0 ? !1 : this.distanceSqToPoint(w.center) <= w.radius * w.radius;
	}
	distanceToPlane(w) {
		let T = w.normal.dot(this.direction);
		if (T === 0) return w.distanceToPoint(this.origin) === 0 ? 0 : null;
		let O = -(this.origin.dot(w.normal) + w.constant) / T;
		return O >= 0 ? O : null;
	}
	intersectPlane(w, T) {
		let O = this.distanceToPlane(w);
		return O === null ? null : this.at(O, T);
	}
	intersectsPlane(w) {
		let T = w.distanceToPoint(this.origin);
		return T === 0 || w.normal.dot(this.direction) * T < 0;
	}
	intersectBox(w, T) {
		let O, j, F, U, W, G, K = 1 / this.direction.x, q = 1 / this.direction.y, J = 1 / this.direction.z, Y = this.origin;
		return K >= 0 ? (O = (w.min.x - Y.x) * K, j = (w.max.x - Y.x) * K) : (O = (w.max.x - Y.x) * K, j = (w.min.x - Y.x) * K), q >= 0 ? (F = (w.min.y - Y.y) * q, U = (w.max.y - Y.y) * q) : (F = (w.max.y - Y.y) * q, U = (w.min.y - Y.y) * q), O > U || F > j || ((F > O || isNaN(O)) && (O = F), (U < j || isNaN(j)) && (j = U), J >= 0 ? (W = (w.min.z - Y.z) * J, G = (w.max.z - Y.z) * J) : (W = (w.max.z - Y.z) * J, G = (w.min.z - Y.z) * J), O > G || W > j) || ((W > O || O !== O) && (O = W), (G < j || j !== j) && (j = G), j < 0) ? null : this.at(O >= 0 ? O : j, T);
	}
	intersectsBox(w) {
		return this.intersectBox(w, _vector$a) !== null;
	}
	intersectTriangle(w, T, O, j, F) {
		_edge1.subVectors(T, w), _edge2.subVectors(O, w), _normal$1.crossVectors(_edge1, _edge2);
		let U = this.direction.dot(_normal$1), W;
		if (U > 0) {
			if (j) return null;
			W = 1;
		} else if (U < 0) W = -1, U = -U;
		else return null;
		_diff.subVectors(this.origin, w);
		let G = W * this.direction.dot(_edge2.crossVectors(_diff, _edge2));
		if (G < 0) return null;
		let K = W * this.direction.dot(_edge1.cross(_diff));
		if (K < 0 || G + K > U) return null;
		let q = -W * _diff.dot(_normal$1);
		return q < 0 ? null : this.at(q / U, F);
	}
	applyMatrix4(w) {
		return this.origin.applyMatrix4(w), this.direction.transformDirection(w), this;
	}
	equals(w) {
		return w.origin.equals(this.origin) && w.direction.equals(this.direction);
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, Matrix4 = class w {
	constructor(T, O, j, F, U, W, G, K, q, J, Y, X, Q, xS, SS, CS) {
		w.prototype.isMatrix4 = !0, this.elements = [
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1
		], T !== void 0 && this.set(T, O, j, F, U, W, G, K, q, J, Y, X, Q, xS, SS, CS);
	}
	set(w, T, O, j, F, U, W, G, K, q, J, Y, X, Q, xS, SS) {
		let CS = this.elements;
		return CS[0] = w, CS[4] = T, CS[8] = O, CS[12] = j, CS[1] = F, CS[5] = U, CS[9] = W, CS[13] = G, CS[2] = K, CS[6] = q, CS[10] = J, CS[14] = Y, CS[3] = X, CS[7] = Q, CS[11] = xS, CS[15] = SS, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	clone() {
		return new w().fromArray(this.elements);
	}
	copy(w) {
		let T = this.elements, O = w.elements;
		return T[0] = O[0], T[1] = O[1], T[2] = O[2], T[3] = O[3], T[4] = O[4], T[5] = O[5], T[6] = O[6], T[7] = O[7], T[8] = O[8], T[9] = O[9], T[10] = O[10], T[11] = O[11], T[12] = O[12], T[13] = O[13], T[14] = O[14], T[15] = O[15], this;
	}
	copyPosition(w) {
		let T = this.elements, O = w.elements;
		return T[12] = O[12], T[13] = O[13], T[14] = O[14], this;
	}
	setFromMatrix3(w) {
		let T = w.elements;
		return this.set(T[0], T[3], T[6], 0, T[1], T[4], T[7], 0, T[2], T[5], T[8], 0, 0, 0, 0, 1), this;
	}
	extractBasis(w, T, O) {
		return this.determinant() === 0 ? (w.set(1, 0, 0), T.set(0, 1, 0), O.set(0, 0, 1), this) : (w.setFromMatrixColumn(this, 0), T.setFromMatrixColumn(this, 1), O.setFromMatrixColumn(this, 2), this);
	}
	makeBasis(w, T, O) {
		return this.set(w.x, T.x, O.x, 0, w.y, T.y, O.y, 0, w.z, T.z, O.z, 0, 0, 0, 0, 1), this;
	}
	extractRotation(w) {
		if (w.determinant() === 0) return this.identity();
		let T = this.elements, O = w.elements, j = 1 / _v1$5.setFromMatrixColumn(w, 0).length(), F = 1 / _v1$5.setFromMatrixColumn(w, 1).length(), U = 1 / _v1$5.setFromMatrixColumn(w, 2).length();
		return T[0] = O[0] * j, T[1] = O[1] * j, T[2] = O[2] * j, T[3] = 0, T[4] = O[4] * F, T[5] = O[5] * F, T[6] = O[6] * F, T[7] = 0, T[8] = O[8] * U, T[9] = O[9] * U, T[10] = O[10] * U, T[11] = 0, T[12] = 0, T[13] = 0, T[14] = 0, T[15] = 1, this;
	}
	makeRotationFromEuler(w) {
		let T = this.elements, O = w.x, j = w.y, F = w.z, U = Math.cos(O), W = Math.sin(O), G = Math.cos(j), K = Math.sin(j), q = Math.cos(F), J = Math.sin(F);
		if (w.order === "XYZ") {
			let w = U * q, O = U * J, j = W * q, F = W * J;
			T[0] = G * q, T[4] = -G * J, T[8] = K, T[1] = O + j * K, T[5] = w - F * K, T[9] = -W * G, T[2] = F - w * K, T[6] = j + O * K, T[10] = U * G;
		} else if (w.order === "YXZ") {
			let w = G * q, O = G * J, j = K * q, F = K * J;
			T[0] = w + F * W, T[4] = j * W - O, T[8] = U * K, T[1] = U * J, T[5] = U * q, T[9] = -W, T[2] = O * W - j, T[6] = F + w * W, T[10] = U * G;
		} else if (w.order === "ZXY") {
			let w = G * q, O = G * J, j = K * q, F = K * J;
			T[0] = w - F * W, T[4] = -U * J, T[8] = j + O * W, T[1] = O + j * W, T[5] = U * q, T[9] = F - w * W, T[2] = -U * K, T[6] = W, T[10] = U * G;
		} else if (w.order === "ZYX") {
			let w = U * q, O = U * J, j = W * q, F = W * J;
			T[0] = G * q, T[4] = j * K - O, T[8] = w * K + F, T[1] = G * J, T[5] = F * K + w, T[9] = O * K - j, T[2] = -K, T[6] = W * G, T[10] = U * G;
		} else if (w.order === "YZX") {
			let w = U * G, O = U * K, j = W * G, F = W * K;
			T[0] = G * q, T[4] = F - w * J, T[8] = j * J + O, T[1] = J, T[5] = U * q, T[9] = -W * q, T[2] = -K * q, T[6] = O * J + j, T[10] = w - F * J;
		} else if (w.order === "XZY") {
			let w = U * G, O = U * K, j = W * G, F = W * K;
			T[0] = G * q, T[4] = -J, T[8] = K * q, T[1] = w * J + F, T[5] = U * q, T[9] = O * J - j, T[2] = j * J - O, T[6] = W * q, T[10] = F * J + w;
		}
		return T[3] = 0, T[7] = 0, T[11] = 0, T[12] = 0, T[13] = 0, T[14] = 0, T[15] = 1, this;
	}
	makeRotationFromQuaternion(w) {
		return this.compose(_zero, w, _one);
	}
	lookAt(w, T, O) {
		let j = this.elements;
		return _z.subVectors(w, T), _z.lengthSq() === 0 && (_z.z = 1), _z.normalize(), _x.crossVectors(O, _z), _x.lengthSq() === 0 && (Math.abs(O.z) === 1 ? _z.x += 1e-4 : _z.z += 1e-4, _z.normalize(), _x.crossVectors(O, _z)), _x.normalize(), _y.crossVectors(_z, _x), j[0] = _x.x, j[4] = _y.x, j[8] = _z.x, j[1] = _x.y, j[5] = _y.y, j[9] = _z.y, j[2] = _x.z, j[6] = _y.z, j[10] = _z.z, this;
	}
	multiply(w) {
		return this.multiplyMatrices(this, w);
	}
	premultiply(w) {
		return this.multiplyMatrices(w, this);
	}
	multiplyMatrices(w, T) {
		let O = w.elements, j = T.elements, F = this.elements, U = O[0], W = O[4], G = O[8], K = O[12], q = O[1], J = O[5], Y = O[9], X = O[13], Q = O[2], xS = O[6], SS = O[10], CS = O[14], wS = O[3], TS = O[7], ES = O[11], DS = O[15], OS = j[0], kS = j[4], AS = j[8], jS = j[12], MS = j[1], NS = j[5], PS = j[9], FS = j[13], IS = j[2], LS = j[6], RS = j[10], zS = j[14], BS = j[3], VS = j[7], HS = j[11], US = j[15];
		return F[0] = U * OS + W * MS + G * IS + K * BS, F[4] = U * kS + W * NS + G * LS + K * VS, F[8] = U * AS + W * PS + G * RS + K * HS, F[12] = U * jS + W * FS + G * zS + K * US, F[1] = q * OS + J * MS + Y * IS + X * BS, F[5] = q * kS + J * NS + Y * LS + X * VS, F[9] = q * AS + J * PS + Y * RS + X * HS, F[13] = q * jS + J * FS + Y * zS + X * US, F[2] = Q * OS + xS * MS + SS * IS + CS * BS, F[6] = Q * kS + xS * NS + SS * LS + CS * VS, F[10] = Q * AS + xS * PS + SS * RS + CS * HS, F[14] = Q * jS + xS * FS + SS * zS + CS * US, F[3] = wS * OS + TS * MS + ES * IS + DS * BS, F[7] = wS * kS + TS * NS + ES * LS + DS * VS, F[11] = wS * AS + TS * PS + ES * RS + DS * HS, F[15] = wS * jS + TS * FS + ES * zS + DS * US, this;
	}
	multiplyScalar(w) {
		let T = this.elements;
		return T[0] *= w, T[4] *= w, T[8] *= w, T[12] *= w, T[1] *= w, T[5] *= w, T[9] *= w, T[13] *= w, T[2] *= w, T[6] *= w, T[10] *= w, T[14] *= w, T[3] *= w, T[7] *= w, T[11] *= w, T[15] *= w, this;
	}
	determinant() {
		let w = this.elements, T = w[0], O = w[4], j = w[8], F = w[12], U = w[1], W = w[5], G = w[9], K = w[13], q = w[2], J = w[6], Y = w[10], X = w[14], Q = w[3], xS = w[7], SS = w[11], CS = w[15], wS = G * X - K * Y, TS = W * X - K * J, ES = W * Y - G * J, DS = U * X - K * q, OS = U * Y - G * q, kS = U * J - W * q;
		return T * (xS * wS - SS * TS + CS * ES) - O * (Q * wS - SS * DS + CS * OS) + j * (Q * TS - xS * DS + CS * kS) - F * (Q * ES - xS * OS + SS * kS);
	}
	transpose() {
		let w = this.elements, T;
		return T = w[1], w[1] = w[4], w[4] = T, T = w[2], w[2] = w[8], w[8] = T, T = w[6], w[6] = w[9], w[9] = T, T = w[3], w[3] = w[12], w[12] = T, T = w[7], w[7] = w[13], w[13] = T, T = w[11], w[11] = w[14], w[14] = T, this;
	}
	setPosition(w, T, O) {
		let j = this.elements;
		return w.isVector3 ? (j[12] = w.x, j[13] = w.y, j[14] = w.z) : (j[12] = w, j[13] = T, j[14] = O), this;
	}
	invert() {
		let w = this.elements, T = w[0], O = w[1], j = w[2], F = w[3], U = w[4], W = w[5], G = w[6], K = w[7], q = w[8], J = w[9], Y = w[10], X = w[11], Q = w[12], xS = w[13], SS = w[14], CS = w[15], wS = J * SS * K - xS * Y * K + xS * G * X - W * SS * X - J * G * CS + W * Y * CS, TS = Q * Y * K - q * SS * K - Q * G * X + U * SS * X + q * G * CS - U * Y * CS, ES = q * xS * K - Q * J * K + Q * W * X - U * xS * X - q * W * CS + U * J * CS, DS = Q * J * G - q * xS * G - Q * W * Y + U * xS * Y + q * W * SS - U * J * SS, OS = T * wS + O * TS + j * ES + F * DS;
		if (OS === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		let kS = 1 / OS;
		return w[0] = wS * kS, w[1] = (xS * Y * F - J * SS * F - xS * j * X + O * SS * X + J * j * CS - O * Y * CS) * kS, w[2] = (W * SS * F - xS * G * F + xS * j * K - O * SS * K - W * j * CS + O * G * CS) * kS, w[3] = (J * G * F - W * Y * F - J * j * K + O * Y * K + W * j * X - O * G * X) * kS, w[4] = TS * kS, w[5] = (q * SS * F - Q * Y * F + Q * j * X - T * SS * X - q * j * CS + T * Y * CS) * kS, w[6] = (Q * G * F - U * SS * F - Q * j * K + T * SS * K + U * j * CS - T * G * CS) * kS, w[7] = (U * Y * F - q * G * F + q * j * K - T * Y * K - U * j * X + T * G * X) * kS, w[8] = ES * kS, w[9] = (Q * J * F - q * xS * F - Q * O * X + T * xS * X + q * O * CS - T * J * CS) * kS, w[10] = (U * xS * F - Q * W * F + Q * O * K - T * xS * K - U * O * CS + T * W * CS) * kS, w[11] = (q * W * F - U * J * F - q * O * K + T * J * K + U * O * X - T * W * X) * kS, w[12] = DS * kS, w[13] = (q * xS * j - Q * J * j + Q * O * Y - T * xS * Y - q * O * SS + T * J * SS) * kS, w[14] = (Q * W * j - U * xS * j - Q * O * G + T * xS * G + U * O * SS - T * W * SS) * kS, w[15] = (U * J * j - q * W * j + q * O * G - T * J * G - U * O * Y + T * W * Y) * kS, this;
	}
	scale(w) {
		let T = this.elements, O = w.x, j = w.y, F = w.z;
		return T[0] *= O, T[4] *= j, T[8] *= F, T[1] *= O, T[5] *= j, T[9] *= F, T[2] *= O, T[6] *= j, T[10] *= F, T[3] *= O, T[7] *= j, T[11] *= F, this;
	}
	getMaxScaleOnAxis() {
		let w = this.elements, T = w[0] * w[0] + w[1] * w[1] + w[2] * w[2], O = w[4] * w[4] + w[5] * w[5] + w[6] * w[6], j = w[8] * w[8] + w[9] * w[9] + w[10] * w[10];
		return Math.sqrt(Math.max(T, O, j));
	}
	makeTranslation(w, T, O) {
		return w.isVector3 ? this.set(1, 0, 0, w.x, 0, 1, 0, w.y, 0, 0, 1, w.z, 0, 0, 0, 1) : this.set(1, 0, 0, w, 0, 1, 0, T, 0, 0, 1, O, 0, 0, 0, 1), this;
	}
	makeRotationX(w) {
		let T = Math.cos(w), O = Math.sin(w);
		return this.set(1, 0, 0, 0, 0, T, -O, 0, 0, O, T, 0, 0, 0, 0, 1), this;
	}
	makeRotationY(w) {
		let T = Math.cos(w), O = Math.sin(w);
		return this.set(T, 0, O, 0, 0, 1, 0, 0, -O, 0, T, 0, 0, 0, 0, 1), this;
	}
	makeRotationZ(w) {
		let T = Math.cos(w), O = Math.sin(w);
		return this.set(T, -O, 0, 0, O, T, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	makeRotationAxis(w, T) {
		let O = Math.cos(T), j = Math.sin(T), F = 1 - O, U = w.x, W = w.y, G = w.z, K = F * U, q = F * W;
		return this.set(K * U + O, K * W - j * G, K * G + j * W, 0, K * W + j * G, q * W + O, q * G - j * U, 0, K * G - j * W, q * G + j * U, F * G * G + O, 0, 0, 0, 0, 1), this;
	}
	makeScale(w, T, O) {
		return this.set(w, 0, 0, 0, 0, T, 0, 0, 0, 0, O, 0, 0, 0, 0, 1), this;
	}
	makeShear(w, T, O, j, F, U) {
		return this.set(1, O, F, 0, w, 1, U, 0, T, j, 1, 0, 0, 0, 0, 1), this;
	}
	compose(w, T, O) {
		let j = this.elements, F = T._x, U = T._y, W = T._z, G = T._w, K = F + F, q = U + U, J = W + W, Y = F * K, X = F * q, Q = F * J, xS = U * q, SS = U * J, CS = W * J, wS = G * K, TS = G * q, ES = G * J, DS = O.x, OS = O.y, kS = O.z;
		return j[0] = (1 - (xS + CS)) * DS, j[1] = (X + ES) * DS, j[2] = (Q - TS) * DS, j[3] = 0, j[4] = (X - ES) * OS, j[5] = (1 - (Y + CS)) * OS, j[6] = (SS + wS) * OS, j[7] = 0, j[8] = (Q + TS) * kS, j[9] = (SS - wS) * kS, j[10] = (1 - (Y + xS)) * kS, j[11] = 0, j[12] = w.x, j[13] = w.y, j[14] = w.z, j[15] = 1, this;
	}
	decompose(w, T, O) {
		let j = this.elements;
		if (w.x = j[12], w.y = j[13], w.z = j[14], this.determinant() === 0) return O.set(1, 1, 1), T.identity(), this;
		let F = _v1$5.set(j[0], j[1], j[2]).length(), U = _v1$5.set(j[4], j[5], j[6]).length(), W = _v1$5.set(j[8], j[9], j[10]).length();
		this.determinant() < 0 && (F = -F), _m1$2.copy(this);
		let G = 1 / F, K = 1 / U, q = 1 / W;
		return _m1$2.elements[0] *= G, _m1$2.elements[1] *= G, _m1$2.elements[2] *= G, _m1$2.elements[4] *= K, _m1$2.elements[5] *= K, _m1$2.elements[6] *= K, _m1$2.elements[8] *= q, _m1$2.elements[9] *= q, _m1$2.elements[10] *= q, T.setFromRotationMatrix(_m1$2), O.x = F, O.y = U, O.z = W, this;
	}
	makePerspective(w, T, O, j, F, U, W = WebGLCoordinateSystem, G = !1) {
		let K = this.elements, q = 2 * F / (T - w), J = 2 * F / (O - j), Y = (T + w) / (T - w), X = (O + j) / (O - j), Q, xS;
		if (G) Q = F / (U - F), xS = U * F / (U - F);
		else if (W === 2e3) Q = -(U + F) / (U - F), xS = -2 * U * F / (U - F);
		else if (W === 2001) Q = -U / (U - F), xS = -U * F / (U - F);
		else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + W);
		return K[0] = q, K[4] = 0, K[8] = Y, K[12] = 0, K[1] = 0, K[5] = J, K[9] = X, K[13] = 0, K[2] = 0, K[6] = 0, K[10] = Q, K[14] = xS, K[3] = 0, K[7] = 0, K[11] = -1, K[15] = 0, this;
	}
	makeOrthographic(w, T, O, j, F, U, W = WebGLCoordinateSystem, G = !1) {
		let K = this.elements, q = 2 / (T - w), J = 2 / (O - j), Y = -(T + w) / (T - w), X = -(O + j) / (O - j), Q, xS;
		if (G) Q = 1 / (U - F), xS = U / (U - F);
		else if (W === 2e3) Q = -2 / (U - F), xS = -(U + F) / (U - F);
		else if (W === 2001) Q = -1 / (U - F), xS = -F / (U - F);
		else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + W);
		return K[0] = q, K[4] = 0, K[8] = 0, K[12] = Y, K[1] = 0, K[5] = J, K[9] = 0, K[13] = X, K[2] = 0, K[6] = 0, K[10] = Q, K[14] = xS, K[3] = 0, K[7] = 0, K[11] = 0, K[15] = 1, this;
	}
	equals(w) {
		let T = this.elements, O = w.elements;
		for (let w = 0; w < 16; w++) if (T[w] !== O[w]) return !1;
		return !0;
	}
	fromArray(w, T = 0) {
		for (let O = 0; O < 16; O++) this.elements[O] = w[O + T];
		return this;
	}
	toArray(w = [], T = 0) {
		let O = this.elements;
		return w[T] = O[0], w[T + 1] = O[1], w[T + 2] = O[2], w[T + 3] = O[3], w[T + 4] = O[4], w[T + 5] = O[5], w[T + 6] = O[6], w[T + 7] = O[7], w[T + 8] = O[8], w[T + 9] = O[9], w[T + 10] = O[10], w[T + 11] = O[11], w[T + 12] = O[12], w[T + 13] = O[13], w[T + 14] = O[14], w[T + 15] = O[15], w;
	}
}, _v1$5 = /* @__PURE__ */ new Vector3(), _m1$2 = /* @__PURE__ */ new Matrix4(), _zero = /* @__PURE__ */ new Vector3(0, 0, 0), _one = /* @__PURE__ */ new Vector3(1, 1, 1), _x = /* @__PURE__ */ new Vector3(), _y = /* @__PURE__ */ new Vector3(), _z = /* @__PURE__ */ new Vector3(), _matrix$2 = /* @__PURE__ */ new Matrix4(), _quaternion$3 = /* @__PURE__ */ new Quaternion(), Euler = class w {
	constructor(T = 0, O = 0, j = 0, F = w.DEFAULT_ORDER) {
		this.isEuler = !0, this._x = T, this._y = O, this._z = j, this._order = F;
	}
	get x() {
		return this._x;
	}
	set x(w) {
		this._x = w, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(w) {
		this._y = w, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(w) {
		this._z = w, this._onChangeCallback();
	}
	get order() {
		return this._order;
	}
	set order(w) {
		this._order = w, this._onChangeCallback();
	}
	set(w, T, O, j = this._order) {
		return this._x = w, this._y = T, this._z = O, this._order = j, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._order);
	}
	copy(w) {
		return this._x = w._x, this._y = w._y, this._z = w._z, this._order = w._order, this._onChangeCallback(), this;
	}
	setFromRotationMatrix(w, T = this._order, O = !0) {
		let j = w.elements, F = j[0], U = j[4], W = j[8], G = j[1], K = j[5], q = j[9], J = j[2], Y = j[6], X = j[10];
		switch (T) {
			case "XYZ":
				this._y = Math.asin(clamp$6(W, -1, 1)), Math.abs(W) < .9999999 ? (this._x = Math.atan2(-q, X), this._z = Math.atan2(-U, F)) : (this._x = Math.atan2(Y, K), this._z = 0);
				break;
			case "YXZ":
				this._x = Math.asin(-clamp$6(q, -1, 1)), Math.abs(q) < .9999999 ? (this._y = Math.atan2(W, X), this._z = Math.atan2(G, K)) : (this._y = Math.atan2(-J, F), this._z = 0);
				break;
			case "ZXY":
				this._x = Math.asin(clamp$6(Y, -1, 1)), Math.abs(Y) < .9999999 ? (this._y = Math.atan2(-J, X), this._z = Math.atan2(-U, K)) : (this._y = 0, this._z = Math.atan2(G, F));
				break;
			case "ZYX":
				this._y = Math.asin(-clamp$6(J, -1, 1)), Math.abs(J) < .9999999 ? (this._x = Math.atan2(Y, X), this._z = Math.atan2(G, F)) : (this._x = 0, this._z = Math.atan2(-U, K));
				break;
			case "YZX":
				this._z = Math.asin(clamp$6(G, -1, 1)), Math.abs(G) < .9999999 ? (this._x = Math.atan2(-q, K), this._y = Math.atan2(-J, F)) : (this._x = 0, this._y = Math.atan2(W, X));
				break;
			case "XZY":
				this._z = Math.asin(-clamp$6(U, -1, 1)), Math.abs(U) < .9999999 ? (this._x = Math.atan2(Y, K), this._y = Math.atan2(W, F)) : (this._x = Math.atan2(-q, X), this._y = 0);
				break;
			default: warn("Euler: .setFromRotationMatrix() encountered an unknown order: " + T);
		}
		return this._order = T, O === !0 && this._onChangeCallback(), this;
	}
	setFromQuaternion(w, T, O) {
		return _matrix$2.makeRotationFromQuaternion(w), this.setFromRotationMatrix(_matrix$2, T, O);
	}
	setFromVector3(w, T = this._order) {
		return this.set(w.x, w.y, w.z, T);
	}
	reorder(w) {
		return _quaternion$3.setFromEuler(this), this.setFromQuaternion(_quaternion$3, w);
	}
	equals(w) {
		return w._x === this._x && w._y === this._y && w._z === this._z && w._order === this._order;
	}
	fromArray(w) {
		return this._x = w[0], this._y = w[1], this._z = w[2], w[3] !== void 0 && (this._order = w[3]), this._onChangeCallback(), this;
	}
	toArray(w = [], T = 0) {
		return w[T] = this._x, w[T + 1] = this._y, w[T + 2] = this._z, w[T + 3] = this._order, w;
	}
	_onChange(w) {
		return this._onChangeCallback = w, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._order;
	}
};
Euler.DEFAULT_ORDER = "XYZ";
var Layers = class {
	constructor() {
		this.mask = 1;
	}
	set(w) {
		this.mask = (1 << w | 0) >>> 0;
	}
	enable(w) {
		this.mask |= 1 << w | 0;
	}
	enableAll() {
		this.mask = -1;
	}
	toggle(w) {
		this.mask ^= 1 << w | 0;
	}
	disable(w) {
		this.mask &= ~(1 << w | 0);
	}
	disableAll() {
		this.mask = 0;
	}
	test(w) {
		return (this.mask & w.mask) !== 0;
	}
	isEnabled(w) {
		return (this.mask & (1 << w | 0)) != 0;
	}
}, _object3DId = 0, _v1$4 = /* @__PURE__ */ new Vector3(), _q1 = /* @__PURE__ */ new Quaternion(), _m1$1$1 = /* @__PURE__ */ new Matrix4(), _target = /* @__PURE__ */ new Vector3(), _position$3 = /* @__PURE__ */ new Vector3(), _scale$2 = /* @__PURE__ */ new Vector3(), _quaternion$2 = /* @__PURE__ */ new Quaternion(), _xAxis = /* @__PURE__ */ new Vector3(1, 0, 0), _yAxis = /* @__PURE__ */ new Vector3(0, 1, 0), _zAxis = /* @__PURE__ */ new Vector3(0, 0, 1), _addedEvent = { type: "added" }, _removedEvent = { type: "removed" }, _childaddedEvent = {
	type: "childadded",
	child: null
}, _childremovedEvent = {
	type: "childremoved",
	child: null
}, Object3D = class w extends EventDispatcher {
	constructor() {
		super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: _object3DId++ }), this.uuid = generateUUID(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = w.DEFAULT_UP.clone();
		let T = new Vector3(), O = new Euler(), j = new Quaternion(), F = new Vector3(1, 1, 1);
		function U() {
			j.setFromEuler(O, !1);
		}
		function W() {
			O.setFromQuaternion(j, void 0, !1);
		}
		O._onChange(U), j._onChange(W), Object.defineProperties(this, {
			position: {
				configurable: !0,
				enumerable: !0,
				value: T
			},
			rotation: {
				configurable: !0,
				enumerable: !0,
				value: O
			},
			quaternion: {
				configurable: !0,
				enumerable: !0,
				value: j
			},
			scale: {
				configurable: !0,
				enumerable: !0,
				value: F
			},
			modelViewMatrix: { value: new Matrix4() },
			normalMatrix: { value: new Matrix3() }
		}), this.matrix = new Matrix4(), this.matrixWorld = new Matrix4(), this.matrixAutoUpdate = w.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = w.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Layers(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.userData = {};
	}
	onBeforeShadow() {}
	onAfterShadow() {}
	onBeforeRender() {}
	onAfterRender() {}
	applyMatrix4(w) {
		this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(w), this.matrix.decompose(this.position, this.quaternion, this.scale);
	}
	applyQuaternion(w) {
		return this.quaternion.premultiply(w), this;
	}
	setRotationFromAxisAngle(w, T) {
		this.quaternion.setFromAxisAngle(w, T);
	}
	setRotationFromEuler(w) {
		this.quaternion.setFromEuler(w, !0);
	}
	setRotationFromMatrix(w) {
		this.quaternion.setFromRotationMatrix(w);
	}
	setRotationFromQuaternion(w) {
		this.quaternion.copy(w);
	}
	rotateOnAxis(w, T) {
		return _q1.setFromAxisAngle(w, T), this.quaternion.multiply(_q1), this;
	}
	rotateOnWorldAxis(w, T) {
		return _q1.setFromAxisAngle(w, T), this.quaternion.premultiply(_q1), this;
	}
	rotateX(w) {
		return this.rotateOnAxis(_xAxis, w);
	}
	rotateY(w) {
		return this.rotateOnAxis(_yAxis, w);
	}
	rotateZ(w) {
		return this.rotateOnAxis(_zAxis, w);
	}
	translateOnAxis(w, T) {
		return _v1$4.copy(w).applyQuaternion(this.quaternion), this.position.add(_v1$4.multiplyScalar(T)), this;
	}
	translateX(w) {
		return this.translateOnAxis(_xAxis, w);
	}
	translateY(w) {
		return this.translateOnAxis(_yAxis, w);
	}
	translateZ(w) {
		return this.translateOnAxis(_zAxis, w);
	}
	localToWorld(w) {
		return this.updateWorldMatrix(!0, !1), w.applyMatrix4(this.matrixWorld);
	}
	worldToLocal(w) {
		return this.updateWorldMatrix(!0, !1), w.applyMatrix4(_m1$1$1.copy(this.matrixWorld).invert());
	}
	lookAt(w, T, O) {
		w.isVector3 ? _target.copy(w) : _target.set(w, T, O);
		let j = this.parent;
		this.updateWorldMatrix(!0, !1), _position$3.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? _m1$1$1.lookAt(_position$3, _target, this.up) : _m1$1$1.lookAt(_target, _position$3, this.up), this.quaternion.setFromRotationMatrix(_m1$1$1), j && (_m1$1$1.extractRotation(j.matrixWorld), _q1.setFromRotationMatrix(_m1$1$1), this.quaternion.premultiply(_q1.invert()));
	}
	add(w) {
		if (arguments.length > 1) {
			for (let w = 0; w < arguments.length; w++) this.add(arguments[w]);
			return this;
		}
		return w === this ? (error("Object3D.add: object can't be added as a child of itself.", w), this) : (w && w.isObject3D ? (w.removeFromParent(), w.parent = this, this.children.push(w), w.dispatchEvent(_addedEvent), _childaddedEvent.child = w, this.dispatchEvent(_childaddedEvent), _childaddedEvent.child = null) : error("Object3D.add: object not an instance of THREE.Object3D.", w), this);
	}
	remove(w) {
		if (arguments.length > 1) {
			for (let w = 0; w < arguments.length; w++) this.remove(arguments[w]);
			return this;
		}
		let T = this.children.indexOf(w);
		return T !== -1 && (w.parent = null, this.children.splice(T, 1), w.dispatchEvent(_removedEvent), _childremovedEvent.child = w, this.dispatchEvent(_childremovedEvent), _childremovedEvent.child = null), this;
	}
	removeFromParent() {
		let w = this.parent;
		return w !== null && w.remove(this), this;
	}
	clear() {
		return this.remove(...this.children);
	}
	attach(w) {
		return this.updateWorldMatrix(!0, !1), _m1$1$1.copy(this.matrixWorld).invert(), w.parent !== null && (w.parent.updateWorldMatrix(!0, !1), _m1$1$1.multiply(w.parent.matrixWorld)), w.applyMatrix4(_m1$1$1), w.removeFromParent(), w.parent = this, this.children.push(w), w.updateWorldMatrix(!1, !0), w.dispatchEvent(_addedEvent), _childaddedEvent.child = w, this.dispatchEvent(_childaddedEvent), _childaddedEvent.child = null, this;
	}
	getObjectById(w) {
		return this.getObjectByProperty("id", w);
	}
	getObjectByName(w) {
		return this.getObjectByProperty("name", w);
	}
	getObjectByProperty(w, T) {
		if (this[w] === T) return this;
		for (let O = 0, j = this.children.length; O < j; O++) {
			let j = this.children[O].getObjectByProperty(w, T);
			if (j !== void 0) return j;
		}
	}
	getObjectsByProperty(w, T, O = []) {
		this[w] === T && O.push(this);
		let j = this.children;
		for (let F = 0, U = j.length; F < U; F++) j[F].getObjectsByProperty(w, T, O);
		return O;
	}
	getWorldPosition(w) {
		return this.updateWorldMatrix(!0, !1), w.setFromMatrixPosition(this.matrixWorld);
	}
	getWorldQuaternion(w) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(_position$3, w, _scale$2), w;
	}
	getWorldScale(w) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(_position$3, _quaternion$2, w), w;
	}
	getWorldDirection(w) {
		this.updateWorldMatrix(!0, !1);
		let T = this.matrixWorld.elements;
		return w.set(T[8], T[9], T[10]).normalize();
	}
	raycast() {}
	traverse(w) {
		w(this);
		let T = this.children;
		for (let O = 0, j = T.length; O < j; O++) T[O].traverse(w);
	}
	traverseVisible(w) {
		if (this.visible === !1) return;
		w(this);
		let T = this.children;
		for (let O = 0, j = T.length; O < j; O++) T[O].traverseVisible(w);
	}
	traverseAncestors(w) {
		let T = this.parent;
		T !== null && (w(T), T.traverseAncestors(w));
	}
	updateMatrix() {
		this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
	}
	updateMatrixWorld(w) {
		this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || w) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, w = !0);
		let T = this.children;
		for (let O = 0, j = T.length; O < j; O++) T[O].updateMatrixWorld(w);
	}
	updateWorldMatrix(w, T) {
		let O = this.parent;
		if (w === !0 && O !== null && O.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), T === !0) {
			let w = this.children;
			for (let T = 0, O = w.length; T < O; T++) w[T].updateWorldMatrix(!1, !0);
		}
	}
	toJSON(w) {
		let T = w === void 0 || typeof w == "string", O = {};
		T && (w = {
			geometries: {},
			materials: {},
			textures: {},
			images: {},
			shapes: {},
			skeletons: {},
			animations: {},
			nodes: {}
		}, O.metadata = {
			version: 4.7,
			type: "Object",
			generator: "Object3D.toJSON"
		});
		let j = {};
		j.uuid = this.uuid, j.type = this.type, this.name !== "" && (j.name = this.name), this.castShadow === !0 && (j.castShadow = !0), this.receiveShadow === !0 && (j.receiveShadow = !0), this.visible === !1 && (j.visible = !1), this.frustumCulled === !1 && (j.frustumCulled = !1), this.renderOrder !== 0 && (j.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (j.userData = this.userData), j.layers = this.layers.mask, j.matrix = this.matrix.toArray(), j.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (j.matrixAutoUpdate = !1), this.isInstancedMesh && (j.type = "InstancedMesh", j.count = this.count, j.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (j.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (j.type = "BatchedMesh", j.perObjectFrustumCulled = this.perObjectFrustumCulled, j.sortObjects = this.sortObjects, j.drawRanges = this._drawRanges, j.reservedRanges = this._reservedRanges, j.geometryInfo = this._geometryInfo.map((w) => ({
			...w,
			boundingBox: w.boundingBox ? w.boundingBox.toJSON() : void 0,
			boundingSphere: w.boundingSphere ? w.boundingSphere.toJSON() : void 0
		})), j.instanceInfo = this._instanceInfo.map((w) => ({ ...w })), j.availableInstanceIds = this._availableInstanceIds.slice(), j.availableGeometryIds = this._availableGeometryIds.slice(), j.nextIndexStart = this._nextIndexStart, j.nextVertexStart = this._nextVertexStart, j.geometryCount = this._geometryCount, j.maxInstanceCount = this._maxInstanceCount, j.maxVertexCount = this._maxVertexCount, j.maxIndexCount = this._maxIndexCount, j.geometryInitialized = this._geometryInitialized, j.matricesTexture = this._matricesTexture.toJSON(w), j.indirectTexture = this._indirectTexture.toJSON(w), this._colorsTexture !== null && (j.colorsTexture = this._colorsTexture.toJSON(w)), this.boundingSphere !== null && (j.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (j.boundingBox = this.boundingBox.toJSON()));
		function F(T, O) {
			return T[O.uuid] === void 0 && (T[O.uuid] = O.toJSON(w)), O.uuid;
		}
		if (this.isScene) this.background && (this.background.isColor ? j.background = this.background.toJSON() : this.background.isTexture && (j.background = this.background.toJSON(w).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (j.environment = this.environment.toJSON(w).uuid);
		else if (this.isMesh || this.isLine || this.isPoints) {
			j.geometry = F(w.geometries, this.geometry);
			let T = this.geometry.parameters;
			if (T !== void 0 && T.shapes !== void 0) {
				let O = T.shapes;
				if (Array.isArray(O)) for (let T = 0, j = O.length; T < j; T++) {
					let j = O[T];
					F(w.shapes, j);
				}
				else F(w.shapes, O);
			}
		}
		if (this.isSkinnedMesh && (j.bindMode = this.bindMode, j.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (F(w.skeletons, this.skeleton), j.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
			let T = [];
			for (let O = 0, j = this.material.length; O < j; O++) T.push(F(w.materials, this.material[O]));
			j.material = T;
		} else j.material = F(w.materials, this.material);
		if (this.children.length > 0) {
			j.children = [];
			for (let T = 0; T < this.children.length; T++) j.children.push(this.children[T].toJSON(w).object);
		}
		if (this.animations.length > 0) {
			j.animations = [];
			for (let T = 0; T < this.animations.length; T++) {
				let O = this.animations[T];
				j.animations.push(F(w.animations, O));
			}
		}
		if (T) {
			let T = U(w.geometries), j = U(w.materials), F = U(w.textures), W = U(w.images), G = U(w.shapes), K = U(w.skeletons), q = U(w.animations), J = U(w.nodes);
			T.length > 0 && (O.geometries = T), j.length > 0 && (O.materials = j), F.length > 0 && (O.textures = F), W.length > 0 && (O.images = W), G.length > 0 && (O.shapes = G), K.length > 0 && (O.skeletons = K), q.length > 0 && (O.animations = q), J.length > 0 && (O.nodes = J);
		}
		return O.object = j, O;
		function U(w) {
			let T = [];
			for (let O in w) {
				let j = w[O];
				delete j.metadata, T.push(j);
			}
			return T;
		}
	}
	clone(w) {
		return new this.constructor().copy(this, w);
	}
	copy(w, T = !0) {
		if (this.name = w.name, this.up.copy(w.up), this.position.copy(w.position), this.rotation.order = w.rotation.order, this.quaternion.copy(w.quaternion), this.scale.copy(w.scale), this.matrix.copy(w.matrix), this.matrixWorld.copy(w.matrixWorld), this.matrixAutoUpdate = w.matrixAutoUpdate, this.matrixWorldAutoUpdate = w.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = w.matrixWorldNeedsUpdate, this.layers.mask = w.layers.mask, this.visible = w.visible, this.castShadow = w.castShadow, this.receiveShadow = w.receiveShadow, this.frustumCulled = w.frustumCulled, this.renderOrder = w.renderOrder, this.animations = w.animations.slice(), this.userData = JSON.parse(JSON.stringify(w.userData)), T === !0) for (let T = 0; T < w.children.length; T++) {
			let O = w.children[T];
			this.add(O.clone());
		}
		return this;
	}
};
Object3D.DEFAULT_UP = /* @__PURE__ */ new Vector3(0, 1, 0), Object3D.DEFAULT_MATRIX_AUTO_UPDATE = !0, Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var _v0$1 = /* @__PURE__ */ new Vector3(), _v1$3 = /* @__PURE__ */ new Vector3(), _v2$2 = /* @__PURE__ */ new Vector3(), _v3$2 = /* @__PURE__ */ new Vector3(), _vab = /* @__PURE__ */ new Vector3(), _vac = /* @__PURE__ */ new Vector3(), _vbc = /* @__PURE__ */ new Vector3(), _vap = /* @__PURE__ */ new Vector3(), _vbp = /* @__PURE__ */ new Vector3(), _vcp = /* @__PURE__ */ new Vector3(), _v40 = /* @__PURE__ */ new Vector4(), _v41 = /* @__PURE__ */ new Vector4(), _v42 = /* @__PURE__ */ new Vector4(), Triangle = class w {
	constructor(w = new Vector3(), T = new Vector3(), O = new Vector3()) {
		this.a = w, this.b = T, this.c = O;
	}
	static getNormal(w, T, O, j) {
		j.subVectors(O, T), _v0$1.subVectors(w, T), j.cross(_v0$1);
		let F = j.lengthSq();
		return F > 0 ? j.multiplyScalar(1 / Math.sqrt(F)) : j.set(0, 0, 0);
	}
	static getBarycoord(w, T, O, j, F) {
		_v0$1.subVectors(j, T), _v1$3.subVectors(O, T), _v2$2.subVectors(w, T);
		let U = _v0$1.dot(_v0$1), W = _v0$1.dot(_v1$3), G = _v0$1.dot(_v2$2), K = _v1$3.dot(_v1$3), q = _v1$3.dot(_v2$2), J = U * K - W * W;
		if (J === 0) return F.set(0, 0, 0), null;
		let Y = 1 / J, X = (K * G - W * q) * Y, Q = (U * q - W * G) * Y;
		return F.set(1 - X - Q, Q, X);
	}
	static containsPoint(w, T, O, j) {
		return this.getBarycoord(w, T, O, j, _v3$2) === null ? !1 : _v3$2.x >= 0 && _v3$2.y >= 0 && _v3$2.x + _v3$2.y <= 1;
	}
	static getInterpolation(w, T, O, j, F, U, W, G) {
		return this.getBarycoord(w, T, O, j, _v3$2) === null ? (G.x = 0, G.y = 0, "z" in G && (G.z = 0), "w" in G && (G.w = 0), null) : (G.setScalar(0), G.addScaledVector(F, _v3$2.x), G.addScaledVector(U, _v3$2.y), G.addScaledVector(W, _v3$2.z), G);
	}
	static getInterpolatedAttribute(w, T, O, j, F, U) {
		return _v40.setScalar(0), _v41.setScalar(0), _v42.setScalar(0), _v40.fromBufferAttribute(w, T), _v41.fromBufferAttribute(w, O), _v42.fromBufferAttribute(w, j), U.setScalar(0), U.addScaledVector(_v40, F.x), U.addScaledVector(_v41, F.y), U.addScaledVector(_v42, F.z), U;
	}
	static isFrontFacing(w, T, O, j) {
		return _v0$1.subVectors(O, T), _v1$3.subVectors(w, T), _v0$1.cross(_v1$3).dot(j) < 0;
	}
	set(w, T, O) {
		return this.a.copy(w), this.b.copy(T), this.c.copy(O), this;
	}
	setFromPointsAndIndices(w, T, O, j) {
		return this.a.copy(w[T]), this.b.copy(w[O]), this.c.copy(w[j]), this;
	}
	setFromAttributeAndIndices(w, T, O, j) {
		return this.a.fromBufferAttribute(w, T), this.b.fromBufferAttribute(w, O), this.c.fromBufferAttribute(w, j), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(w) {
		return this.a.copy(w.a), this.b.copy(w.b), this.c.copy(w.c), this;
	}
	getArea() {
		return _v0$1.subVectors(this.c, this.b), _v1$3.subVectors(this.a, this.b), _v0$1.cross(_v1$3).length() * .5;
	}
	getMidpoint(w) {
		return w.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
	}
	getNormal(T) {
		return w.getNormal(this.a, this.b, this.c, T);
	}
	getPlane(w) {
		return w.setFromCoplanarPoints(this.a, this.b, this.c);
	}
	getBarycoord(T, O) {
		return w.getBarycoord(T, this.a, this.b, this.c, O);
	}
	getInterpolation(T, O, j, F, U) {
		return w.getInterpolation(T, this.a, this.b, this.c, O, j, F, U);
	}
	containsPoint(T) {
		return w.containsPoint(T, this.a, this.b, this.c);
	}
	isFrontFacing(T) {
		return w.isFrontFacing(this.a, this.b, this.c, T);
	}
	intersectsBox(w) {
		return w.intersectsTriangle(this);
	}
	closestPointToPoint(w, T) {
		let O = this.a, j = this.b, F = this.c, U, W;
		_vab.subVectors(j, O), _vac.subVectors(F, O), _vap.subVectors(w, O);
		let G = _vab.dot(_vap), K = _vac.dot(_vap);
		if (G <= 0 && K <= 0) return T.copy(O);
		_vbp.subVectors(w, j);
		let q = _vab.dot(_vbp), J = _vac.dot(_vbp);
		if (q >= 0 && J <= q) return T.copy(j);
		let Y = G * J - q * K;
		if (Y <= 0 && G >= 0 && q <= 0) return U = G / (G - q), T.copy(O).addScaledVector(_vab, U);
		_vcp.subVectors(w, F);
		let X = _vab.dot(_vcp), Q = _vac.dot(_vcp);
		if (Q >= 0 && X <= Q) return T.copy(F);
		let xS = X * K - G * Q;
		if (xS <= 0 && K >= 0 && Q <= 0) return W = K / (K - Q), T.copy(O).addScaledVector(_vac, W);
		let SS = q * Q - X * J;
		if (SS <= 0 && J - q >= 0 && X - Q >= 0) return _vbc.subVectors(F, j), W = (J - q) / (J - q + (X - Q)), T.copy(j).addScaledVector(_vbc, W);
		let CS = 1 / (SS + xS + Y);
		return U = xS * CS, W = Y * CS, T.copy(O).addScaledVector(_vab, U).addScaledVector(_vac, W);
	}
	equals(w) {
		return w.a.equals(this.a) && w.b.equals(this.b) && w.c.equals(this.c);
	}
}, _colorKeywords = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
}, _hslA = {
	h: 0,
	s: 0,
	l: 0
}, _hslB = {
	h: 0,
	s: 0,
	l: 0
};
function hue2rgb(w, T, O) {
	return O < 0 && (O += 1), O > 1 && --O, O < 1 / 6 ? w + (T - w) * 6 * O : O < 1 / 2 ? T : O < 2 / 3 ? w + (T - w) * 6 * (2 / 3 - O) : w;
}
var Color = class {
	constructor(w, T, O) {
		return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(w, T, O);
	}
	set(w, T, O) {
		if (T === void 0 && O === void 0) {
			let T = w;
			T && T.isColor ? this.copy(T) : typeof T == "number" ? this.setHex(T) : typeof T == "string" && this.setStyle(T);
		} else this.setRGB(w, T, O);
		return this;
	}
	setScalar(w) {
		return this.r = w, this.g = w, this.b = w, this;
	}
	setHex(w, T = SRGBColorSpace) {
		return w = Math.floor(w), this.r = (w >> 16 & 255) / 255, this.g = (w >> 8 & 255) / 255, this.b = (w & 255) / 255, ColorManagement.colorSpaceToWorking(this, T), this;
	}
	setRGB(w, T, O, j = ColorManagement.workingColorSpace) {
		return this.r = w, this.g = T, this.b = O, ColorManagement.colorSpaceToWorking(this, j), this;
	}
	setHSL(w, T, O, j = ColorManagement.workingColorSpace) {
		if (w = euclideanModulo(w, 1), T = clamp$6(T, 0, 1), O = clamp$6(O, 0, 1), T === 0) this.r = this.g = this.b = O;
		else {
			let j = O <= .5 ? O * (1 + T) : O + T - O * T, F = 2 * O - j;
			this.r = hue2rgb(F, j, w + 1 / 3), this.g = hue2rgb(F, j, w), this.b = hue2rgb(F, j, w - 1 / 3);
		}
		return ColorManagement.colorSpaceToWorking(this, j), this;
	}
	setStyle(w, T = SRGBColorSpace) {
		function O(T) {
			T !== void 0 && parseFloat(T) < 1 && warn("Color: Alpha component of " + w + " will be ignored.");
		}
		let j;
		if (j = /^(\w+)\(([^\)]*)\)/.exec(w)) {
			let F, U = j[1], W = j[2];
			switch (U) {
				case "rgb":
				case "rgba":
					if (F = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(W)) return O(F[4]), this.setRGB(Math.min(255, parseInt(F[1], 10)) / 255, Math.min(255, parseInt(F[2], 10)) / 255, Math.min(255, parseInt(F[3], 10)) / 255, T);
					if (F = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(W)) return O(F[4]), this.setRGB(Math.min(100, parseInt(F[1], 10)) / 100, Math.min(100, parseInt(F[2], 10)) / 100, Math.min(100, parseInt(F[3], 10)) / 100, T);
					break;
				case "hsl":
				case "hsla":
					if (F = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(W)) return O(F[4]), this.setHSL(parseFloat(F[1]) / 360, parseFloat(F[2]) / 100, parseFloat(F[3]) / 100, T);
					break;
				default: warn("Color: Unknown color model " + w);
			}
		} else if (j = /^\#([A-Fa-f\d]+)$/.exec(w)) {
			let O = j[1], F = O.length;
			if (F === 3) return this.setRGB(parseInt(O.charAt(0), 16) / 15, parseInt(O.charAt(1), 16) / 15, parseInt(O.charAt(2), 16) / 15, T);
			if (F === 6) return this.setHex(parseInt(O, 16), T);
			warn("Color: Invalid hex color " + w);
		} else if (w && w.length > 0) return this.setColorName(w, T);
		return this;
	}
	setColorName(w, T = SRGBColorSpace) {
		let O = _colorKeywords[w.toLowerCase()];
		return O === void 0 ? warn("Color: Unknown color " + w) : this.setHex(O, T), this;
	}
	clone() {
		return new this.constructor(this.r, this.g, this.b);
	}
	copy(w) {
		return this.r = w.r, this.g = w.g, this.b = w.b, this;
	}
	copySRGBToLinear(w) {
		return this.r = SRGBToLinear(w.r), this.g = SRGBToLinear(w.g), this.b = SRGBToLinear(w.b), this;
	}
	copyLinearToSRGB(w) {
		return this.r = LinearToSRGB(w.r), this.g = LinearToSRGB(w.g), this.b = LinearToSRGB(w.b), this;
	}
	convertSRGBToLinear() {
		return this.copySRGBToLinear(this), this;
	}
	convertLinearToSRGB() {
		return this.copyLinearToSRGB(this), this;
	}
	getHex(w = SRGBColorSpace) {
		return ColorManagement.workingToColorSpace(_color.copy(this), w), Math.round(clamp$6(_color.r * 255, 0, 255)) * 65536 + Math.round(clamp$6(_color.g * 255, 0, 255)) * 256 + Math.round(clamp$6(_color.b * 255, 0, 255));
	}
	getHexString(w = SRGBColorSpace) {
		return ("000000" + this.getHex(w).toString(16)).slice(-6);
	}
	getHSL(w, T = ColorManagement.workingColorSpace) {
		ColorManagement.workingToColorSpace(_color.copy(this), T);
		let O = _color.r, j = _color.g, F = _color.b, U = Math.max(O, j, F), W = Math.min(O, j, F), G, K, q = (W + U) / 2;
		if (W === U) G = 0, K = 0;
		else {
			let w = U - W;
			switch (K = q <= .5 ? w / (U + W) : w / (2 - U - W), U) {
				case O:
					G = (j - F) / w + (j < F ? 6 : 0);
					break;
				case j:
					G = (F - O) / w + 2;
					break;
				case F:
					G = (O - j) / w + 4;
					break;
			}
			G /= 6;
		}
		return w.h = G, w.s = K, w.l = q, w;
	}
	getRGB(w, T = ColorManagement.workingColorSpace) {
		return ColorManagement.workingToColorSpace(_color.copy(this), T), w.r = _color.r, w.g = _color.g, w.b = _color.b, w;
	}
	getStyle(w = SRGBColorSpace) {
		ColorManagement.workingToColorSpace(_color.copy(this), w);
		let T = _color.r, O = _color.g, j = _color.b;
		return w === "srgb" ? `rgb(${Math.round(T * 255)},${Math.round(O * 255)},${Math.round(j * 255)})` : `color(${w} ${T.toFixed(3)} ${O.toFixed(3)} ${j.toFixed(3)})`;
	}
	offsetHSL(w, T, O) {
		return this.getHSL(_hslA), this.setHSL(_hslA.h + w, _hslA.s + T, _hslA.l + O);
	}
	add(w) {
		return this.r += w.r, this.g += w.g, this.b += w.b, this;
	}
	addColors(w, T) {
		return this.r = w.r + T.r, this.g = w.g + T.g, this.b = w.b + T.b, this;
	}
	addScalar(w) {
		return this.r += w, this.g += w, this.b += w, this;
	}
	sub(w) {
		return this.r = Math.max(0, this.r - w.r), this.g = Math.max(0, this.g - w.g), this.b = Math.max(0, this.b - w.b), this;
	}
	multiply(w) {
		return this.r *= w.r, this.g *= w.g, this.b *= w.b, this;
	}
	multiplyScalar(w) {
		return this.r *= w, this.g *= w, this.b *= w, this;
	}
	lerp(w, T) {
		return this.r += (w.r - this.r) * T, this.g += (w.g - this.g) * T, this.b += (w.b - this.b) * T, this;
	}
	lerpColors(w, T, O) {
		return this.r = w.r + (T.r - w.r) * O, this.g = w.g + (T.g - w.g) * O, this.b = w.b + (T.b - w.b) * O, this;
	}
	lerpHSL(w, T) {
		this.getHSL(_hslA), w.getHSL(_hslB);
		let O = lerp(_hslA.h, _hslB.h, T), j = lerp(_hslA.s, _hslB.s, T), F = lerp(_hslA.l, _hslB.l, T);
		return this.setHSL(O, j, F), this;
	}
	setFromVector3(w) {
		return this.r = w.x, this.g = w.y, this.b = w.z, this;
	}
	applyMatrix3(w) {
		let T = this.r, O = this.g, j = this.b, F = w.elements;
		return this.r = F[0] * T + F[3] * O + F[6] * j, this.g = F[1] * T + F[4] * O + F[7] * j, this.b = F[2] * T + F[5] * O + F[8] * j, this;
	}
	equals(w) {
		return w.r === this.r && w.g === this.g && w.b === this.b;
	}
	fromArray(w, T = 0) {
		return this.r = w[T], this.g = w[T + 1], this.b = w[T + 2], this;
	}
	toArray(w = [], T = 0) {
		return w[T] = this.r, w[T + 1] = this.g, w[T + 2] = this.b, w;
	}
	fromBufferAttribute(w, T) {
		return this.r = w.getX(T), this.g = w.getY(T), this.b = w.getZ(T), this;
	}
	toJSON() {
		return this.getHex();
	}
	*[Symbol.iterator]() {
		yield this.r, yield this.g, yield this.b;
	}
}, _color = /* @__PURE__ */ new Color();
Color.NAMES = _colorKeywords;
var _materialId = 0, Material = class extends EventDispatcher {
	constructor() {
		super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: _materialId++ }), this.uuid = generateUUID(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Color(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = KeepStencilOp, this.stencilZFail = KeepStencilOp, this.stencilZPass = KeepStencilOp, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
	}
	get alphaTest() {
		return this._alphaTest;
	}
	set alphaTest(w) {
		this._alphaTest > 0 != w > 0 && this.version++, this._alphaTest = w;
	}
	onBeforeRender() {}
	onBeforeCompile() {}
	customProgramCacheKey() {
		return this.onBeforeCompile.toString();
	}
	setValues(w) {
		if (w !== void 0) for (let T in w) {
			let O = w[T];
			if (O === void 0) {
				warn(`Material: parameter '${T}' has value of undefined.`);
				continue;
			}
			let j = this[T];
			if (j === void 0) {
				warn(`Material: '${T}' is not a property of THREE.${this.type}.`);
				continue;
			}
			j && j.isColor ? j.set(O) : j && j.isVector3 && O && O.isVector3 ? j.copy(O) : this[T] = O;
		}
	}
	toJSON(w) {
		let T = w === void 0 || typeof w == "string";
		T && (w = {
			textures: {},
			images: {}
		});
		let O = { metadata: {
			version: 4.7,
			type: "Material",
			generator: "Material.toJSON"
		} };
		O.uuid = this.uuid, O.type = this.type, this.name !== "" && (O.name = this.name), this.color && this.color.isColor && (O.color = this.color.getHex()), this.roughness !== void 0 && (O.roughness = this.roughness), this.metalness !== void 0 && (O.metalness = this.metalness), this.sheen !== void 0 && (O.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (O.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (O.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (O.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (O.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (O.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (O.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (O.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (O.shininess = this.shininess), this.clearcoat !== void 0 && (O.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (O.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (O.clearcoatMap = this.clearcoatMap.toJSON(w).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (O.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(w).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (O.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(w).uuid, O.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (O.sheenColorMap = this.sheenColorMap.toJSON(w).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (O.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(w).uuid), this.dispersion !== void 0 && (O.dispersion = this.dispersion), this.iridescence !== void 0 && (O.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (O.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (O.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (O.iridescenceMap = this.iridescenceMap.toJSON(w).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (O.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(w).uuid), this.anisotropy !== void 0 && (O.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (O.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (O.anisotropyMap = this.anisotropyMap.toJSON(w).uuid), this.map && this.map.isTexture && (O.map = this.map.toJSON(w).uuid), this.matcap && this.matcap.isTexture && (O.matcap = this.matcap.toJSON(w).uuid), this.alphaMap && this.alphaMap.isTexture && (O.alphaMap = this.alphaMap.toJSON(w).uuid), this.lightMap && this.lightMap.isTexture && (O.lightMap = this.lightMap.toJSON(w).uuid, O.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (O.aoMap = this.aoMap.toJSON(w).uuid, O.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (O.bumpMap = this.bumpMap.toJSON(w).uuid, O.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (O.normalMap = this.normalMap.toJSON(w).uuid, O.normalMapType = this.normalMapType, O.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (O.displacementMap = this.displacementMap.toJSON(w).uuid, O.displacementScale = this.displacementScale, O.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (O.roughnessMap = this.roughnessMap.toJSON(w).uuid), this.metalnessMap && this.metalnessMap.isTexture && (O.metalnessMap = this.metalnessMap.toJSON(w).uuid), this.emissiveMap && this.emissiveMap.isTexture && (O.emissiveMap = this.emissiveMap.toJSON(w).uuid), this.specularMap && this.specularMap.isTexture && (O.specularMap = this.specularMap.toJSON(w).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (O.specularIntensityMap = this.specularIntensityMap.toJSON(w).uuid), this.specularColorMap && this.specularColorMap.isTexture && (O.specularColorMap = this.specularColorMap.toJSON(w).uuid), this.envMap && this.envMap.isTexture && (O.envMap = this.envMap.toJSON(w).uuid, this.combine !== void 0 && (O.combine = this.combine)), this.envMapRotation !== void 0 && (O.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (O.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (O.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (O.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (O.gradientMap = this.gradientMap.toJSON(w).uuid), this.transmission !== void 0 && (O.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (O.transmissionMap = this.transmissionMap.toJSON(w).uuid), this.thickness !== void 0 && (O.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (O.thicknessMap = this.thicknessMap.toJSON(w).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== Infinity && (O.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (O.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (O.size = this.size), this.shadowSide !== null && (O.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (O.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (O.blending = this.blending), this.side !== 0 && (O.side = this.side), this.vertexColors === !0 && (O.vertexColors = !0), this.opacity < 1 && (O.opacity = this.opacity), this.transparent === !0 && (O.transparent = !0), this.blendSrc !== 204 && (O.blendSrc = this.blendSrc), this.blendDst !== 205 && (O.blendDst = this.blendDst), this.blendEquation !== 100 && (O.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (O.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (O.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (O.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (O.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (O.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (O.depthFunc = this.depthFunc), this.depthTest === !1 && (O.depthTest = this.depthTest), this.depthWrite === !1 && (O.depthWrite = this.depthWrite), this.colorWrite === !1 && (O.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (O.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (O.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (O.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (O.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (O.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (O.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (O.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (O.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (O.rotation = this.rotation), this.polygonOffset === !0 && (O.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (O.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (O.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (O.linewidth = this.linewidth), this.dashSize !== void 0 && (O.dashSize = this.dashSize), this.gapSize !== void 0 && (O.gapSize = this.gapSize), this.scale !== void 0 && (O.scale = this.scale), this.dithering === !0 && (O.dithering = !0), this.alphaTest > 0 && (O.alphaTest = this.alphaTest), this.alphaHash === !0 && (O.alphaHash = !0), this.alphaToCoverage === !0 && (O.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (O.premultipliedAlpha = !0), this.forceSinglePass === !0 && (O.forceSinglePass = !0), this.allowOverride === !1 && (O.allowOverride = !1), this.wireframe === !0 && (O.wireframe = !0), this.wireframeLinewidth > 1 && (O.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (O.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (O.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (O.flatShading = !0), this.visible === !1 && (O.visible = !1), this.toneMapped === !1 && (O.toneMapped = !1), this.fog === !1 && (O.fog = !1), Object.keys(this.userData).length > 0 && (O.userData = this.userData);
		function j(w) {
			let T = [];
			for (let O in w) {
				let j = w[O];
				delete j.metadata, T.push(j);
			}
			return T;
		}
		if (T) {
			let T = j(w.textures), F = j(w.images);
			T.length > 0 && (O.textures = T), F.length > 0 && (O.images = F);
		}
		return O;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(w) {
		this.name = w.name, this.blending = w.blending, this.side = w.side, this.vertexColors = w.vertexColors, this.opacity = w.opacity, this.transparent = w.transparent, this.blendSrc = w.blendSrc, this.blendDst = w.blendDst, this.blendEquation = w.blendEquation, this.blendSrcAlpha = w.blendSrcAlpha, this.blendDstAlpha = w.blendDstAlpha, this.blendEquationAlpha = w.blendEquationAlpha, this.blendColor.copy(w.blendColor), this.blendAlpha = w.blendAlpha, this.depthFunc = w.depthFunc, this.depthTest = w.depthTest, this.depthWrite = w.depthWrite, this.stencilWriteMask = w.stencilWriteMask, this.stencilFunc = w.stencilFunc, this.stencilRef = w.stencilRef, this.stencilFuncMask = w.stencilFuncMask, this.stencilFail = w.stencilFail, this.stencilZFail = w.stencilZFail, this.stencilZPass = w.stencilZPass, this.stencilWrite = w.stencilWrite;
		let T = w.clippingPlanes, O = null;
		if (T !== null) {
			let w = T.length;
			O = Array(w);
			for (let j = 0; j !== w; ++j) O[j] = T[j].clone();
		}
		return this.clippingPlanes = O, this.clipIntersection = w.clipIntersection, this.clipShadows = w.clipShadows, this.shadowSide = w.shadowSide, this.colorWrite = w.colorWrite, this.precision = w.precision, this.polygonOffset = w.polygonOffset, this.polygonOffsetFactor = w.polygonOffsetFactor, this.polygonOffsetUnits = w.polygonOffsetUnits, this.dithering = w.dithering, this.alphaTest = w.alphaTest, this.alphaHash = w.alphaHash, this.alphaToCoverage = w.alphaToCoverage, this.premultipliedAlpha = w.premultipliedAlpha, this.forceSinglePass = w.forceSinglePass, this.allowOverride = w.allowOverride, this.visible = w.visible, this.toneMapped = w.toneMapped, this.userData = JSON.parse(JSON.stringify(w.userData)), this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	set needsUpdate(w) {
		w === !0 && this.version++;
	}
}, MeshBasicMaterial = class extends Material {
	constructor(w) {
		super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Color(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Euler(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(w);
	}
	copy(w) {
		return super.copy(w), this.color.copy(w.color), this.map = w.map, this.lightMap = w.lightMap, this.lightMapIntensity = w.lightMapIntensity, this.aoMap = w.aoMap, this.aoMapIntensity = w.aoMapIntensity, this.specularMap = w.specularMap, this.alphaMap = w.alphaMap, this.envMap = w.envMap, this.envMapRotation.copy(w.envMapRotation), this.combine = w.combine, this.reflectivity = w.reflectivity, this.refractionRatio = w.refractionRatio, this.wireframe = w.wireframe, this.wireframeLinewidth = w.wireframeLinewidth, this.wireframeLinecap = w.wireframeLinecap, this.wireframeLinejoin = w.wireframeLinejoin, this.fog = w.fog, this;
	}
}, _vector$9 = /* @__PURE__ */ new Vector3(), _vector2$1 = /* @__PURE__ */ new Vector2(), _id$2 = 0, BufferAttribute = class {
	constructor(w, T, O = !1) {
		if (Array.isArray(w)) throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");
		this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: _id$2++ }), this.name = "", this.array = w, this.itemSize = T, this.count = w === void 0 ? 0 : w.length / T, this.normalized = O, this.usage = StaticDrawUsage, this.updateRanges = [], this.gpuType = FloatType, this.version = 0;
	}
	onUploadCallback() {}
	set needsUpdate(w) {
		w === !0 && this.version++;
	}
	setUsage(w) {
		return this.usage = w, this;
	}
	addUpdateRange(w, T) {
		this.updateRanges.push({
			start: w,
			count: T
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	copy(w) {
		return this.name = w.name, this.array = new w.array.constructor(w.array), this.itemSize = w.itemSize, this.count = w.count, this.normalized = w.normalized, this.usage = w.usage, this.gpuType = w.gpuType, this;
	}
	copyAt(w, T, O) {
		w *= this.itemSize, O *= T.itemSize;
		for (let j = 0, F = this.itemSize; j < F; j++) this.array[w + j] = T.array[O + j];
		return this;
	}
	copyArray(w) {
		return this.array.set(w), this;
	}
	applyMatrix3(w) {
		if (this.itemSize === 2) for (let T = 0, O = this.count; T < O; T++) _vector2$1.fromBufferAttribute(this, T), _vector2$1.applyMatrix3(w), this.setXY(T, _vector2$1.x, _vector2$1.y);
		else if (this.itemSize === 3) for (let T = 0, O = this.count; T < O; T++) _vector$9.fromBufferAttribute(this, T), _vector$9.applyMatrix3(w), this.setXYZ(T, _vector$9.x, _vector$9.y, _vector$9.z);
		return this;
	}
	applyMatrix4(w) {
		for (let T = 0, O = this.count; T < O; T++) _vector$9.fromBufferAttribute(this, T), _vector$9.applyMatrix4(w), this.setXYZ(T, _vector$9.x, _vector$9.y, _vector$9.z);
		return this;
	}
	applyNormalMatrix(w) {
		for (let T = 0, O = this.count; T < O; T++) _vector$9.fromBufferAttribute(this, T), _vector$9.applyNormalMatrix(w), this.setXYZ(T, _vector$9.x, _vector$9.y, _vector$9.z);
		return this;
	}
	transformDirection(w) {
		for (let T = 0, O = this.count; T < O; T++) _vector$9.fromBufferAttribute(this, T), _vector$9.transformDirection(w), this.setXYZ(T, _vector$9.x, _vector$9.y, _vector$9.z);
		return this;
	}
	set(w, T = 0) {
		return this.array.set(w, T), this;
	}
	getComponent(w, T) {
		let O = this.array[w * this.itemSize + T];
		return this.normalized && (O = denormalize(O, this.array)), O;
	}
	setComponent(w, T, O) {
		return this.normalized && (O = normalize(O, this.array)), this.array[w * this.itemSize + T] = O, this;
	}
	getX(w) {
		let T = this.array[w * this.itemSize];
		return this.normalized && (T = denormalize(T, this.array)), T;
	}
	setX(w, T) {
		return this.normalized && (T = normalize(T, this.array)), this.array[w * this.itemSize] = T, this;
	}
	getY(w) {
		let T = this.array[w * this.itemSize + 1];
		return this.normalized && (T = denormalize(T, this.array)), T;
	}
	setY(w, T) {
		return this.normalized && (T = normalize(T, this.array)), this.array[w * this.itemSize + 1] = T, this;
	}
	getZ(w) {
		let T = this.array[w * this.itemSize + 2];
		return this.normalized && (T = denormalize(T, this.array)), T;
	}
	setZ(w, T) {
		return this.normalized && (T = normalize(T, this.array)), this.array[w * this.itemSize + 2] = T, this;
	}
	getW(w) {
		let T = this.array[w * this.itemSize + 3];
		return this.normalized && (T = denormalize(T, this.array)), T;
	}
	setW(w, T) {
		return this.normalized && (T = normalize(T, this.array)), this.array[w * this.itemSize + 3] = T, this;
	}
	setXY(w, T, O) {
		return w *= this.itemSize, this.normalized && (T = normalize(T, this.array), O = normalize(O, this.array)), this.array[w + 0] = T, this.array[w + 1] = O, this;
	}
	setXYZ(w, T, O, j) {
		return w *= this.itemSize, this.normalized && (T = normalize(T, this.array), O = normalize(O, this.array), j = normalize(j, this.array)), this.array[w + 0] = T, this.array[w + 1] = O, this.array[w + 2] = j, this;
	}
	setXYZW(w, T, O, j, F) {
		return w *= this.itemSize, this.normalized && (T = normalize(T, this.array), O = normalize(O, this.array), j = normalize(j, this.array), F = normalize(F, this.array)), this.array[w + 0] = T, this.array[w + 1] = O, this.array[w + 2] = j, this.array[w + 3] = F, this;
	}
	onUpload(w) {
		return this.onUploadCallback = w, this;
	}
	clone() {
		return new this.constructor(this.array, this.itemSize).copy(this);
	}
	toJSON() {
		let w = {
			itemSize: this.itemSize,
			type: this.array.constructor.name,
			array: Array.from(this.array),
			normalized: this.normalized
		};
		return this.name !== "" && (w.name = this.name), this.usage !== 35044 && (w.usage = this.usage), w;
	}
}, Uint16BufferAttribute = class extends BufferAttribute {
	constructor(w, T, O) {
		super(new Uint16Array(w), T, O);
	}
}, Uint32BufferAttribute = class extends BufferAttribute {
	constructor(w, T, O) {
		super(new Uint32Array(w), T, O);
	}
}, Float32BufferAttribute = class extends BufferAttribute {
	constructor(w, T, O) {
		super(new Float32Array(w), T, O);
	}
}, _id$1 = 0, _m1$3 = /* @__PURE__ */ new Matrix4(), _obj = /* @__PURE__ */ new Object3D(), _offset = /* @__PURE__ */ new Vector3(), _box$2 = /* @__PURE__ */ new Box3(), _boxMorphTargets = /* @__PURE__ */ new Box3(), _vector$8 = /* @__PURE__ */ new Vector3(), BufferGeometry = class w extends EventDispatcher {
	constructor() {
		super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: _id$1++ }), this.uuid = generateUUID(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
			start: 0,
			count: Infinity
		}, this.userData = {};
	}
	getIndex() {
		return this.index;
	}
	setIndex(w) {
		return Array.isArray(w) ? this.index = new (arrayNeedsUint32(w) ? Uint32BufferAttribute : Uint16BufferAttribute)(w, 1) : this.index = w, this;
	}
	setIndirect(w, T = 0) {
		return this.indirect = w, this.indirectOffset = T, this;
	}
	getIndirect() {
		return this.indirect;
	}
	getAttribute(w) {
		return this.attributes[w];
	}
	setAttribute(w, T) {
		return this.attributes[w] = T, this;
	}
	deleteAttribute(w) {
		return delete this.attributes[w], this;
	}
	hasAttribute(w) {
		return this.attributes[w] !== void 0;
	}
	addGroup(w, T, O = 0) {
		this.groups.push({
			start: w,
			count: T,
			materialIndex: O
		});
	}
	clearGroups() {
		this.groups = [];
	}
	setDrawRange(w, T) {
		this.drawRange.start = w, this.drawRange.count = T;
	}
	applyMatrix4(w) {
		let T = this.attributes.position;
		T !== void 0 && (T.applyMatrix4(w), T.needsUpdate = !0);
		let O = this.attributes.normal;
		if (O !== void 0) {
			let T = new Matrix3().getNormalMatrix(w);
			O.applyNormalMatrix(T), O.needsUpdate = !0;
		}
		let j = this.attributes.tangent;
		return j !== void 0 && (j.transformDirection(w), j.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
	}
	applyQuaternion(w) {
		return _m1$3.makeRotationFromQuaternion(w), this.applyMatrix4(_m1$3), this;
	}
	rotateX(w) {
		return _m1$3.makeRotationX(w), this.applyMatrix4(_m1$3), this;
	}
	rotateY(w) {
		return _m1$3.makeRotationY(w), this.applyMatrix4(_m1$3), this;
	}
	rotateZ(w) {
		return _m1$3.makeRotationZ(w), this.applyMatrix4(_m1$3), this;
	}
	translate(w, T, O) {
		return _m1$3.makeTranslation(w, T, O), this.applyMatrix4(_m1$3), this;
	}
	scale(w, T, O) {
		return _m1$3.makeScale(w, T, O), this.applyMatrix4(_m1$3), this;
	}
	lookAt(w) {
		return _obj.lookAt(w), _obj.updateMatrix(), this.applyMatrix4(_obj.matrix), this;
	}
	center() {
		return this.computeBoundingBox(), this.boundingBox.getCenter(_offset).negate(), this.translate(_offset.x, _offset.y, _offset.z), this;
	}
	setFromPoints(w) {
		let T = this.getAttribute("position");
		if (T === void 0) {
			let T = [];
			for (let O = 0, j = w.length; O < j; O++) {
				let j = w[O];
				T.push(j.x, j.y, j.z || 0);
			}
			this.setAttribute("position", new Float32BufferAttribute(T, 3));
		} else {
			let O = Math.min(w.length, T.count);
			for (let j = 0; j < O; j++) {
				let O = w[j];
				T.setXYZ(j, O.x, O.y, O.z || 0);
			}
			w.length > T.count && warn("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), T.needsUpdate = !0;
		}
		return this;
	}
	computeBoundingBox() {
		this.boundingBox === null && (this.boundingBox = new Box3());
		let w = this.attributes.position, T = this.morphAttributes.position;
		if (w && w.isGLBufferAttribute) {
			error("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new Vector3(-Infinity, -Infinity, -Infinity), new Vector3(Infinity, Infinity, Infinity));
			return;
		}
		if (w !== void 0) {
			if (this.boundingBox.setFromBufferAttribute(w), T) for (let w = 0, O = T.length; w < O; w++) {
				let O = T[w];
				_box$2.setFromBufferAttribute(O), this.morphTargetsRelative ? (_vector$8.addVectors(this.boundingBox.min, _box$2.min), this.boundingBox.expandByPoint(_vector$8), _vector$8.addVectors(this.boundingBox.max, _box$2.max), this.boundingBox.expandByPoint(_vector$8)) : (this.boundingBox.expandByPoint(_box$2.min), this.boundingBox.expandByPoint(_box$2.max));
			}
		} else this.boundingBox.makeEmpty();
		(isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && error("BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The \"position\" attribute is likely to have NaN values.", this);
	}
	computeBoundingSphere() {
		this.boundingSphere === null && (this.boundingSphere = new Sphere());
		let w = this.attributes.position, T = this.morphAttributes.position;
		if (w && w.isGLBufferAttribute) {
			error("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new Vector3(), Infinity);
			return;
		}
		if (w) {
			let O = this.boundingSphere.center;
			if (_box$2.setFromBufferAttribute(w), T) for (let w = 0, O = T.length; w < O; w++) {
				let O = T[w];
				_boxMorphTargets.setFromBufferAttribute(O), this.morphTargetsRelative ? (_vector$8.addVectors(_box$2.min, _boxMorphTargets.min), _box$2.expandByPoint(_vector$8), _vector$8.addVectors(_box$2.max, _boxMorphTargets.max), _box$2.expandByPoint(_vector$8)) : (_box$2.expandByPoint(_boxMorphTargets.min), _box$2.expandByPoint(_boxMorphTargets.max));
			}
			_box$2.getCenter(O);
			let j = 0;
			for (let T = 0, F = w.count; T < F; T++) _vector$8.fromBufferAttribute(w, T), j = Math.max(j, O.distanceToSquared(_vector$8));
			if (T) for (let F = 0, U = T.length; F < U; F++) {
				let U = T[F], W = this.morphTargetsRelative;
				for (let T = 0, F = U.count; T < F; T++) _vector$8.fromBufferAttribute(U, T), W && (_offset.fromBufferAttribute(w, T), _vector$8.add(_offset)), j = Math.max(j, O.distanceToSquared(_vector$8));
			}
			this.boundingSphere.radius = Math.sqrt(j), isNaN(this.boundingSphere.radius) && error("BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The \"position\" attribute is likely to have NaN values.", this);
		}
	}
	computeTangents() {
		let w = this.index, T = this.attributes;
		if (w === null || T.position === void 0 || T.normal === void 0 || T.uv === void 0) {
			error("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
			return;
		}
		let O = T.position, j = T.normal, F = T.uv;
		this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new BufferAttribute(new Float32Array(4 * O.count), 4));
		let U = this.getAttribute("tangent"), W = [], G = [];
		for (let w = 0; w < O.count; w++) W[w] = new Vector3(), G[w] = new Vector3();
		let K = new Vector3(), q = new Vector3(), J = new Vector3(), Y = new Vector2(), X = new Vector2(), Q = new Vector2(), xS = new Vector3(), SS = new Vector3();
		function CS(w, T, j) {
			K.fromBufferAttribute(O, w), q.fromBufferAttribute(O, T), J.fromBufferAttribute(O, j), Y.fromBufferAttribute(F, w), X.fromBufferAttribute(F, T), Q.fromBufferAttribute(F, j), q.sub(K), J.sub(K), X.sub(Y), Q.sub(Y);
			let U = 1 / (X.x * Q.y - Q.x * X.y);
			isFinite(U) && (xS.copy(q).multiplyScalar(Q.y).addScaledVector(J, -X.y).multiplyScalar(U), SS.copy(J).multiplyScalar(X.x).addScaledVector(q, -Q.x).multiplyScalar(U), W[w].add(xS), W[T].add(xS), W[j].add(xS), G[w].add(SS), G[T].add(SS), G[j].add(SS));
		}
		let wS = this.groups;
		wS.length === 0 && (wS = [{
			start: 0,
			count: w.count
		}]);
		for (let T = 0, O = wS.length; T < O; ++T) {
			let O = wS[T], j = O.start, F = O.count;
			for (let T = j, O = j + F; T < O; T += 3) CS(w.getX(T + 0), w.getX(T + 1), w.getX(T + 2));
		}
		let TS = new Vector3(), ES = new Vector3(), DS = new Vector3(), OS = new Vector3();
		function kS(w) {
			DS.fromBufferAttribute(j, w), OS.copy(DS);
			let T = W[w];
			TS.copy(T), TS.sub(DS.multiplyScalar(DS.dot(T))).normalize(), ES.crossVectors(OS, T);
			let O = ES.dot(G[w]) < 0 ? -1 : 1;
			U.setXYZW(w, TS.x, TS.y, TS.z, O);
		}
		for (let T = 0, O = wS.length; T < O; ++T) {
			let O = wS[T], j = O.start, F = O.count;
			for (let T = j, O = j + F; T < O; T += 3) kS(w.getX(T + 0)), kS(w.getX(T + 1)), kS(w.getX(T + 2));
		}
	}
	computeVertexNormals() {
		let w = this.index, T = this.getAttribute("position");
		if (T !== void 0) {
			let O = this.getAttribute("normal");
			if (O === void 0) O = new BufferAttribute(new Float32Array(T.count * 3), 3), this.setAttribute("normal", O);
			else for (let w = 0, T = O.count; w < T; w++) O.setXYZ(w, 0, 0, 0);
			let j = new Vector3(), F = new Vector3(), U = new Vector3(), W = new Vector3(), G = new Vector3(), K = new Vector3(), q = new Vector3(), J = new Vector3();
			if (w) for (let Y = 0, X = w.count; Y < X; Y += 3) {
				let X = w.getX(Y + 0), Q = w.getX(Y + 1), xS = w.getX(Y + 2);
				j.fromBufferAttribute(T, X), F.fromBufferAttribute(T, Q), U.fromBufferAttribute(T, xS), q.subVectors(U, F), J.subVectors(j, F), q.cross(J), W.fromBufferAttribute(O, X), G.fromBufferAttribute(O, Q), K.fromBufferAttribute(O, xS), W.add(q), G.add(q), K.add(q), O.setXYZ(X, W.x, W.y, W.z), O.setXYZ(Q, G.x, G.y, G.z), O.setXYZ(xS, K.x, K.y, K.z);
			}
			else for (let w = 0, W = T.count; w < W; w += 3) j.fromBufferAttribute(T, w + 0), F.fromBufferAttribute(T, w + 1), U.fromBufferAttribute(T, w + 2), q.subVectors(U, F), J.subVectors(j, F), q.cross(J), O.setXYZ(w + 0, q.x, q.y, q.z), O.setXYZ(w + 1, q.x, q.y, q.z), O.setXYZ(w + 2, q.x, q.y, q.z);
			this.normalizeNormals(), O.needsUpdate = !0;
		}
	}
	normalizeNormals() {
		let w = this.attributes.normal;
		for (let T = 0, O = w.count; T < O; T++) _vector$8.fromBufferAttribute(w, T), _vector$8.normalize(), w.setXYZ(T, _vector$8.x, _vector$8.y, _vector$8.z);
	}
	toNonIndexed() {
		function T(w, T) {
			let O = w.array, j = w.itemSize, F = w.normalized, U = new O.constructor(T.length * j), W = 0, G = 0;
			for (let F = 0, K = T.length; F < K; F++) {
				W = w.isInterleavedBufferAttribute ? T[F] * w.data.stride + w.offset : T[F] * j;
				for (let w = 0; w < j; w++) U[G++] = O[W++];
			}
			return new BufferAttribute(U, j, F);
		}
		if (this.index === null) return warn("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
		let O = new w(), j = this.index.array, F = this.attributes;
		for (let w in F) {
			let U = F[w], W = T(U, j);
			O.setAttribute(w, W);
		}
		let U = this.morphAttributes;
		for (let w in U) {
			let F = [], W = U[w];
			for (let w = 0, O = W.length; w < O; w++) {
				let O = W[w], U = T(O, j);
				F.push(U);
			}
			O.morphAttributes[w] = F;
		}
		O.morphTargetsRelative = this.morphTargetsRelative;
		let W = this.groups;
		for (let w = 0, T = W.length; w < T; w++) {
			let T = W[w];
			O.addGroup(T.start, T.count, T.materialIndex);
		}
		return O;
	}
	toJSON() {
		let w = { metadata: {
			version: 4.7,
			type: "BufferGeometry",
			generator: "BufferGeometry.toJSON"
		} };
		if (w.uuid = this.uuid, w.type = this.type, this.name !== "" && (w.name = this.name), Object.keys(this.userData).length > 0 && (w.userData = this.userData), this.parameters !== void 0) {
			let T = this.parameters;
			for (let O in T) T[O] !== void 0 && (w[O] = T[O]);
			return w;
		}
		w.data = { attributes: {} };
		let T = this.index;
		T !== null && (w.data.index = {
			type: T.array.constructor.name,
			array: Array.prototype.slice.call(T.array)
		});
		let O = this.attributes;
		for (let T in O) {
			let j = O[T];
			w.data.attributes[T] = j.toJSON(w.data);
		}
		let j = {}, F = !1;
		for (let T in this.morphAttributes) {
			let O = this.morphAttributes[T], U = [];
			for (let T = 0, j = O.length; T < j; T++) {
				let j = O[T];
				U.push(j.toJSON(w.data));
			}
			U.length > 0 && (j[T] = U, F = !0);
		}
		F && (w.data.morphAttributes = j, w.data.morphTargetsRelative = this.morphTargetsRelative);
		let U = this.groups;
		U.length > 0 && (w.data.groups = JSON.parse(JSON.stringify(U)));
		let W = this.boundingSphere;
		return W !== null && (w.data.boundingSphere = W.toJSON()), w;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(w) {
		this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
		let T = {};
		this.name = w.name;
		let O = w.index;
		O !== null && this.setIndex(O.clone());
		let j = w.attributes;
		for (let w in j) {
			let O = j[w];
			this.setAttribute(w, O.clone(T));
		}
		let F = w.morphAttributes;
		for (let w in F) {
			let O = [], j = F[w];
			for (let w = 0, F = j.length; w < F; w++) O.push(j[w].clone(T));
			this.morphAttributes[w] = O;
		}
		this.morphTargetsRelative = w.morphTargetsRelative;
		let U = w.groups;
		for (let w = 0, T = U.length; w < T; w++) {
			let T = U[w];
			this.addGroup(T.start, T.count, T.materialIndex);
		}
		let W = w.boundingBox;
		W !== null && (this.boundingBox = W.clone());
		let G = w.boundingSphere;
		return G !== null && (this.boundingSphere = G.clone()), this.drawRange.start = w.drawRange.start, this.drawRange.count = w.drawRange.count, this.userData = w.userData, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, _inverseMatrix$3 = /* @__PURE__ */ new Matrix4(), _ray$3 = /* @__PURE__ */ new Ray(), _sphere$6 = /* @__PURE__ */ new Sphere(), _sphereHitAt = /* @__PURE__ */ new Vector3(), _vA$1 = /* @__PURE__ */ new Vector3(), _vB$1 = /* @__PURE__ */ new Vector3(), _vC$1 = /* @__PURE__ */ new Vector3(), _tempA = /* @__PURE__ */ new Vector3(), _morphA = /* @__PURE__ */ new Vector3(), _intersectionPoint = /* @__PURE__ */ new Vector3(), _intersectionPointWorld = /* @__PURE__ */ new Vector3(), Mesh = class extends Object3D {
	constructor(w = new BufferGeometry(), T = new MeshBasicMaterial()) {
		super(), this.isMesh = !0, this.type = "Mesh", this.geometry = w, this.material = T, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
	}
	copy(w, T) {
		return super.copy(w, T), w.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = w.morphTargetInfluences.slice()), w.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, w.morphTargetDictionary)), this.material = Array.isArray(w.material) ? w.material.slice() : w.material, this.geometry = w.geometry, this;
	}
	updateMorphTargets() {
		let w = this.geometry.morphAttributes, T = Object.keys(w);
		if (T.length > 0) {
			let O = w[T[0]];
			if (O !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let w = 0, T = O.length; w < T; w++) {
					let T = O[w].name || String(w);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[T] = w;
				}
			}
		}
	}
	getVertexPosition(w, T) {
		let O = this.geometry, j = O.attributes.position, F = O.morphAttributes.position, U = O.morphTargetsRelative;
		T.fromBufferAttribute(j, w);
		let W = this.morphTargetInfluences;
		if (F && W) {
			_morphA.set(0, 0, 0);
			for (let O = 0, j = F.length; O < j; O++) {
				let j = W[O], G = F[O];
				j !== 0 && (_tempA.fromBufferAttribute(G, w), U ? _morphA.addScaledVector(_tempA, j) : _morphA.addScaledVector(_tempA.sub(T), j));
			}
			T.add(_morphA);
		}
		return T;
	}
	raycast(w, T) {
		let O = this.geometry, j = this.material, F = this.matrixWorld;
		j !== void 0 && (O.boundingSphere === null && O.computeBoundingSphere(), _sphere$6.copy(O.boundingSphere), _sphere$6.applyMatrix4(F), _ray$3.copy(w.ray).recast(w.near), !(_sphere$6.containsPoint(_ray$3.origin) === !1 && (_ray$3.intersectSphere(_sphere$6, _sphereHitAt) === null || _ray$3.origin.distanceToSquared(_sphereHitAt) > (w.far - w.near) ** 2)) && (_inverseMatrix$3.copy(F).invert(), _ray$3.copy(w.ray).applyMatrix4(_inverseMatrix$3), !(O.boundingBox !== null && _ray$3.intersectsBox(O.boundingBox) === !1) && this._computeIntersections(w, T, _ray$3)));
	}
	_computeIntersections(w, T, O) {
		let j, F = this.geometry, U = this.material, W = F.index, G = F.attributes.position, K = F.attributes.uv, q = F.attributes.uv1, J = F.attributes.normal, Y = F.groups, X = F.drawRange;
		if (W !== null) if (Array.isArray(U)) for (let F = 0, G = Y.length; F < G; F++) {
			let G = Y[F], Q = U[G.materialIndex], xS = Math.max(G.start, X.start), SS = Math.min(W.count, Math.min(G.start + G.count, X.start + X.count));
			for (let F = xS, U = SS; F < U; F += 3) {
				let U = W.getX(F), Y = W.getX(F + 1), X = W.getX(F + 2);
				j = checkGeometryIntersection(this, Q, w, O, K, q, J, U, Y, X), j && (j.faceIndex = Math.floor(F / 3), j.face.materialIndex = G.materialIndex, T.push(j));
			}
		}
		else {
			let F = Math.max(0, X.start), G = Math.min(W.count, X.start + X.count);
			for (let Y = F, X = G; Y < X; Y += 3) {
				let F = W.getX(Y), G = W.getX(Y + 1), X = W.getX(Y + 2);
				j = checkGeometryIntersection(this, U, w, O, K, q, J, F, G, X), j && (j.faceIndex = Math.floor(Y / 3), T.push(j));
			}
		}
		else if (G !== void 0) if (Array.isArray(U)) for (let F = 0, W = Y.length; F < W; F++) {
			let W = Y[F], Q = U[W.materialIndex], xS = Math.max(W.start, X.start), SS = Math.min(G.count, Math.min(W.start + W.count, X.start + X.count));
			for (let F = xS, U = SS; F < U; F += 3) {
				let U = F, G = F + 1, Y = F + 2;
				j = checkGeometryIntersection(this, Q, w, O, K, q, J, U, G, Y), j && (j.faceIndex = Math.floor(F / 3), j.face.materialIndex = W.materialIndex, T.push(j));
			}
		}
		else {
			let F = Math.max(0, X.start), W = Math.min(G.count, X.start + X.count);
			for (let G = F, Y = W; G < Y; G += 3) {
				let F = G, W = G + 1, Y = G + 2;
				j = checkGeometryIntersection(this, U, w, O, K, q, J, F, W, Y), j && (j.faceIndex = Math.floor(G / 3), T.push(j));
			}
		}
	}
};
function checkIntersection$1(w, T, O, j, F, U, W, G) {
	let K;
	if (K = T.side === 1 ? j.intersectTriangle(W, U, F, !0, G) : j.intersectTriangle(F, U, W, T.side === 0, G), K === null) return null;
	_intersectionPointWorld.copy(G), _intersectionPointWorld.applyMatrix4(w.matrixWorld);
	let q = O.ray.origin.distanceTo(_intersectionPointWorld);
	return q < O.near || q > O.far ? null : {
		distance: q,
		point: _intersectionPointWorld.clone(),
		object: w
	};
}
function checkGeometryIntersection(w, T, O, j, F, U, W, G, K, q) {
	w.getVertexPosition(G, _vA$1), w.getVertexPosition(K, _vB$1), w.getVertexPosition(q, _vC$1);
	let J = checkIntersection$1(w, T, O, j, _vA$1, _vB$1, _vC$1, _intersectionPoint);
	if (J) {
		let w = new Vector3();
		Triangle.getBarycoord(_intersectionPoint, _vA$1, _vB$1, _vC$1, w), F && (J.uv = Triangle.getInterpolatedAttribute(F, G, K, q, w, new Vector2())), U && (J.uv1 = Triangle.getInterpolatedAttribute(U, G, K, q, w, new Vector2())), W && (J.normal = Triangle.getInterpolatedAttribute(W, G, K, q, w, new Vector3()), J.normal.dot(j.direction) > 0 && J.normal.multiplyScalar(-1));
		let T = {
			a: G,
			b: K,
			c: q,
			normal: new Vector3(),
			materialIndex: 0
		};
		Triangle.getNormal(_vA$1, _vB$1, _vC$1, T.normal), J.face = T, J.barycoord = w;
	}
	return J;
}
var BoxGeometry = class w extends BufferGeometry {
	constructor(w = 1, T = 1, O = 1, j = 1, F = 1, U = 1) {
		super(), this.type = "BoxGeometry", this.parameters = {
			width: w,
			height: T,
			depth: O,
			widthSegments: j,
			heightSegments: F,
			depthSegments: U
		};
		let W = this;
		j = Math.floor(j), F = Math.floor(F), U = Math.floor(U);
		let G = [], K = [], q = [], J = [], Y = 0, X = 0;
		Q("z", "y", "x", -1, -1, O, T, w, U, F, 0), Q("z", "y", "x", 1, -1, O, T, -w, U, F, 1), Q("x", "z", "y", 1, 1, w, O, T, j, U, 2), Q("x", "z", "y", 1, -1, w, O, -T, j, U, 3), Q("x", "y", "z", 1, -1, w, T, O, j, F, 4), Q("x", "y", "z", -1, -1, w, T, -O, j, F, 5), this.setIndex(G), this.setAttribute("position", new Float32BufferAttribute(K, 3)), this.setAttribute("normal", new Float32BufferAttribute(q, 3)), this.setAttribute("uv", new Float32BufferAttribute(J, 2));
		function Q(w, T, O, j, F, U, Q, xS, SS, CS, wS) {
			let TS = U / SS, ES = Q / CS, DS = U / 2, OS = Q / 2, kS = xS / 2, AS = SS + 1, jS = CS + 1, MS = 0, NS = 0, PS = new Vector3();
			for (let U = 0; U < jS; U++) {
				let W = U * ES - OS;
				for (let G = 0; G < AS; G++) PS[w] = (G * TS - DS) * j, PS[T] = W * F, PS[O] = kS, K.push(PS.x, PS.y, PS.z), PS[w] = 0, PS[T] = 0, PS[O] = xS > 0 ? 1 : -1, q.push(PS.x, PS.y, PS.z), J.push(G / SS), J.push(1 - U / CS), MS += 1;
			}
			for (let w = 0; w < CS; w++) for (let T = 0; T < SS; T++) {
				let O = Y + T + AS * w, j = Y + T + AS * (w + 1), F = Y + (T + 1) + AS * (w + 1), U = Y + (T + 1) + AS * w;
				G.push(O, j, U), G.push(j, F, U), NS += 6;
			}
			W.addGroup(X, NS, wS), X += NS, Y += MS;
		}
	}
	copy(w) {
		return super.copy(w), this.parameters = Object.assign({}, w.parameters), this;
	}
	static fromJSON(T) {
		return new w(T.width, T.height, T.depth, T.widthSegments, T.heightSegments, T.depthSegments);
	}
};
function cloneUniforms(w) {
	let T = {};
	for (let O in w) for (let j in T[O] = {}, w[O]) {
		let F = w[O][j];
		F && (F.isColor || F.isMatrix3 || F.isMatrix4 || F.isVector2 || F.isVector3 || F.isVector4 || F.isTexture || F.isQuaternion) ? F.isRenderTargetTexture ? (warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), T[O][j] = null) : T[O][j] = F.clone() : Array.isArray(F) ? T[O][j] = F.slice() : T[O][j] = F;
	}
	return T;
}
function mergeUniforms(w) {
	let T = {};
	for (let O = 0; O < w.length; O++) {
		let j = cloneUniforms(w[O]);
		for (let w in j) T[w] = j[w];
	}
	return T;
}
function cloneUniformsGroups(w) {
	let T = [];
	for (let O = 0; O < w.length; O++) T.push(w[O].clone());
	return T;
}
function getUnlitUniformColorSpace(w) {
	let T = w.getRenderTarget();
	return T === null ? w.outputColorSpace : T.isXRRenderTarget === !0 ? T.texture.colorSpace : ColorManagement.workingColorSpace;
}
var UniformsUtils = {
	clone: cloneUniforms,
	merge: mergeUniforms
}, default_vertex = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", default_fragment = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", ShaderMaterial = class extends Material {
	constructor(w) {
		super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = default_vertex, this.fragmentShader = default_fragment, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
			clipCullDistance: !1,
			multiDraw: !1
		}, this.defaultAttributeValues = {
			color: [
				1,
				1,
				1
			],
			uv: [0, 0],
			uv1: [0, 0]
		}, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, w !== void 0 && this.setValues(w);
	}
	copy(w) {
		return super.copy(w), this.fragmentShader = w.fragmentShader, this.vertexShader = w.vertexShader, this.uniforms = cloneUniforms(w.uniforms), this.uniformsGroups = cloneUniformsGroups(w.uniformsGroups), this.defines = Object.assign({}, w.defines), this.wireframe = w.wireframe, this.wireframeLinewidth = w.wireframeLinewidth, this.fog = w.fog, this.lights = w.lights, this.clipping = w.clipping, this.extensions = Object.assign({}, w.extensions), this.glslVersion = w.glslVersion, this.defaultAttributeValues = Object.assign({}, w.defaultAttributeValues), this.index0AttributeName = w.index0AttributeName, this.uniformsNeedUpdate = w.uniformsNeedUpdate, this;
	}
	toJSON(w) {
		let T = super.toJSON(w);
		for (let O in T.glslVersion = this.glslVersion, T.uniforms = {}, this.uniforms) {
			let j = this.uniforms[O].value;
			j && j.isTexture ? T.uniforms[O] = {
				type: "t",
				value: j.toJSON(w).uuid
			} : j && j.isColor ? T.uniforms[O] = {
				type: "c",
				value: j.getHex()
			} : j && j.isVector2 ? T.uniforms[O] = {
				type: "v2",
				value: j.toArray()
			} : j && j.isVector3 ? T.uniforms[O] = {
				type: "v3",
				value: j.toArray()
			} : j && j.isVector4 ? T.uniforms[O] = {
				type: "v4",
				value: j.toArray()
			} : j && j.isMatrix3 ? T.uniforms[O] = {
				type: "m3",
				value: j.toArray()
			} : j && j.isMatrix4 ? T.uniforms[O] = {
				type: "m4",
				value: j.toArray()
			} : T.uniforms[O] = { value: j };
		}
		Object.keys(this.defines).length > 0 && (T.defines = this.defines), T.vertexShader = this.vertexShader, T.fragmentShader = this.fragmentShader, T.lights = this.lights, T.clipping = this.clipping;
		let O = {};
		for (let w in this.extensions) this.extensions[w] === !0 && (O[w] = !0);
		return Object.keys(O).length > 0 && (T.extensions = O), T;
	}
}, Camera = class extends Object3D {
	constructor() {
		super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Matrix4(), this.projectionMatrix = new Matrix4(), this.projectionMatrixInverse = new Matrix4(), this.coordinateSystem = WebGLCoordinateSystem, this._reversedDepth = !1;
	}
	get reversedDepth() {
		return this._reversedDepth;
	}
	copy(w, T) {
		return super.copy(w, T), this.matrixWorldInverse.copy(w.matrixWorldInverse), this.projectionMatrix.copy(w.projectionMatrix), this.projectionMatrixInverse.copy(w.projectionMatrixInverse), this.coordinateSystem = w.coordinateSystem, this;
	}
	getWorldDirection(w) {
		return super.getWorldDirection(w).negate();
	}
	updateMatrixWorld(w) {
		super.updateMatrixWorld(w), this.matrixWorldInverse.copy(this.matrixWorld).invert();
	}
	updateWorldMatrix(w, T) {
		super.updateWorldMatrix(w, T), this.matrixWorldInverse.copy(this.matrixWorld).invert();
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, _v3$1 = /* @__PURE__ */ new Vector3(), _minTarget = /* @__PURE__ */ new Vector2(), _maxTarget = /* @__PURE__ */ new Vector2(), PerspectiveCamera = class extends Camera {
	constructor(w = 50, T = 1, O = .1, j = 2e3) {
		super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = w, this.zoom = 1, this.near = O, this.far = j, this.focus = 10, this.aspect = T, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
	}
	copy(w, T) {
		return super.copy(w, T), this.fov = w.fov, this.zoom = w.zoom, this.near = w.near, this.far = w.far, this.focus = w.focus, this.aspect = w.aspect, this.view = w.view === null ? null : Object.assign({}, w.view), this.filmGauge = w.filmGauge, this.filmOffset = w.filmOffset, this;
	}
	setFocalLength(w) {
		let T = .5 * this.getFilmHeight() / w;
		this.fov = RAD2DEG * 2 * Math.atan(T), this.updateProjectionMatrix();
	}
	getFocalLength() {
		let w = Math.tan(DEG2RAD * .5 * this.fov);
		return .5 * this.getFilmHeight() / w;
	}
	getEffectiveFOV() {
		return RAD2DEG * 2 * Math.atan(Math.tan(DEG2RAD * .5 * this.fov) / this.zoom);
	}
	getFilmWidth() {
		return this.filmGauge * Math.min(this.aspect, 1);
	}
	getFilmHeight() {
		return this.filmGauge / Math.max(this.aspect, 1);
	}
	getViewBounds(w, T, O) {
		_v3$1.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), T.set(_v3$1.x, _v3$1.y).multiplyScalar(-w / _v3$1.z), _v3$1.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), O.set(_v3$1.x, _v3$1.y).multiplyScalar(-w / _v3$1.z);
	}
	getViewSize(w, T) {
		return this.getViewBounds(w, _minTarget, _maxTarget), T.subVectors(_maxTarget, _minTarget);
	}
	setViewOffset(w, T, O, j, F, U) {
		this.aspect = w / T, this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = w, this.view.fullHeight = T, this.view.offsetX = O, this.view.offsetY = j, this.view.width = F, this.view.height = U, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let w = this.near, T = w * Math.tan(DEG2RAD * .5 * this.fov) / this.zoom, O = 2 * T, j = this.aspect * O, F = -.5 * j, U = this.view;
		if (this.view !== null && this.view.enabled) {
			let w = U.fullWidth, W = U.fullHeight;
			F += U.offsetX * j / w, T -= U.offsetY * O / W, j *= U.width / w, O *= U.height / W;
		}
		let W = this.filmOffset;
		W !== 0 && (F += w * W / this.getFilmWidth()), this.projectionMatrix.makePerspective(F, F + j, T, T - O, w, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(w) {
		let T = super.toJSON(w);
		return T.object.fov = this.fov, T.object.zoom = this.zoom, T.object.near = this.near, T.object.far = this.far, T.object.focus = this.focus, T.object.aspect = this.aspect, this.view !== null && (T.object.view = Object.assign({}, this.view)), T.object.filmGauge = this.filmGauge, T.object.filmOffset = this.filmOffset, T;
	}
}, fov = -90, aspect = 1, CubeCamera = class extends Object3D {
	constructor(w, T, O) {
		super(), this.type = "CubeCamera", this.renderTarget = O, this.coordinateSystem = null, this.activeMipmapLevel = 0;
		let j = new PerspectiveCamera(fov, aspect, w, T);
		j.layers = this.layers, this.add(j);
		let F = new PerspectiveCamera(fov, aspect, w, T);
		F.layers = this.layers, this.add(F);
		let U = new PerspectiveCamera(fov, aspect, w, T);
		U.layers = this.layers, this.add(U);
		let W = new PerspectiveCamera(fov, aspect, w, T);
		W.layers = this.layers, this.add(W);
		let G = new PerspectiveCamera(fov, aspect, w, T);
		G.layers = this.layers, this.add(G);
		let K = new PerspectiveCamera(fov, aspect, w, T);
		K.layers = this.layers, this.add(K);
	}
	updateCoordinateSystem() {
		let w = this.coordinateSystem, T = this.children.concat(), [O, j, F, U, W, G] = T;
		for (let w of T) this.remove(w);
		if (w === 2e3) O.up.set(0, 1, 0), O.lookAt(1, 0, 0), j.up.set(0, 1, 0), j.lookAt(-1, 0, 0), F.up.set(0, 0, -1), F.lookAt(0, 1, 0), U.up.set(0, 0, 1), U.lookAt(0, -1, 0), W.up.set(0, 1, 0), W.lookAt(0, 0, 1), G.up.set(0, 1, 0), G.lookAt(0, 0, -1);
		else if (w === 2001) O.up.set(0, -1, 0), O.lookAt(-1, 0, 0), j.up.set(0, -1, 0), j.lookAt(1, 0, 0), F.up.set(0, 0, 1), F.lookAt(0, 1, 0), U.up.set(0, 0, -1), U.lookAt(0, -1, 0), W.up.set(0, -1, 0), W.lookAt(0, 0, 1), G.up.set(0, -1, 0), G.lookAt(0, 0, -1);
		else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + w);
		for (let w of T) this.add(w), w.updateMatrixWorld();
	}
	update(w, T) {
		this.parent === null && this.updateMatrixWorld();
		let { renderTarget: O, activeMipmapLevel: j } = this;
		this.coordinateSystem !== w.coordinateSystem && (this.coordinateSystem = w.coordinateSystem, this.updateCoordinateSystem());
		let [F, U, W, G, K, q] = this.children, J = w.getRenderTarget(), Y = w.getActiveCubeFace(), X = w.getActiveMipmapLevel(), Q = w.xr.enabled;
		w.xr.enabled = !1;
		let xS = O.texture.generateMipmaps;
		O.texture.generateMipmaps = !1, w.setRenderTarget(O, 0, j), w.render(T, F), w.setRenderTarget(O, 1, j), w.render(T, U), w.setRenderTarget(O, 2, j), w.render(T, W), w.setRenderTarget(O, 3, j), w.render(T, G), w.setRenderTarget(O, 4, j), w.render(T, K), O.texture.generateMipmaps = xS, w.setRenderTarget(O, 5, j), w.render(T, q), w.setRenderTarget(J, Y, X), w.xr.enabled = Q, O.texture.needsPMREMUpdate = !0;
	}
}, CubeTexture = class extends Texture {
	constructor(w = [], T = 301, O, j, F, U, W, G, K, q) {
		super(w, T, O, j, F, U, W, G, K, q), this.isCubeTexture = !0, this.flipY = !1;
	}
	get images() {
		return this.image;
	}
	set images(w) {
		this.image = w;
	}
}, WebGLCubeRenderTarget = class extends WebGLRenderTarget {
	constructor(w = 1, T = {}) {
		super(w, w, T), this.isWebGLCubeRenderTarget = !0;
		let O = {
			width: w,
			height: w,
			depth: 1
		};
		this.texture = new CubeTexture([
			O,
			O,
			O,
			O,
			O,
			O
		]), this._setTextureOptions(T), this.texture.isRenderTargetTexture = !0;
	}
	fromEquirectangularTexture(w, T) {
		this.texture.type = T.type, this.texture.colorSpace = T.colorSpace, this.texture.generateMipmaps = T.generateMipmaps, this.texture.minFilter = T.minFilter, this.texture.magFilter = T.magFilter;
		let O = {
			uniforms: { tEquirect: { value: null } },
			vertexShader: "\n\n				varying vec3 vWorldDirection;\n\n				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n				}\n\n				void main() {\n\n					vWorldDirection = transformDirection( position, modelMatrix );\n\n					#include <begin_vertex>\n					#include <project_vertex>\n\n				}\n			",
			fragmentShader: "\n\n				uniform sampler2D tEquirect;\n\n				varying vec3 vWorldDirection;\n\n				#include <common>\n\n				void main() {\n\n					vec3 direction = normalize( vWorldDirection );\n\n					vec2 sampleUV = equirectUv( direction );\n\n					gl_FragColor = texture2D( tEquirect, sampleUV );\n\n				}\n			"
		}, j = new BoxGeometry(5, 5, 5), F = new ShaderMaterial({
			name: "CubemapFromEquirect",
			uniforms: cloneUniforms(O.uniforms),
			vertexShader: O.vertexShader,
			fragmentShader: O.fragmentShader,
			side: 1,
			blending: 0
		});
		F.uniforms.tEquirect.value = T;
		let U = new Mesh(j, F), W = T.minFilter;
		return T.minFilter === 1008 && (T.minFilter = LinearFilter), new CubeCamera(1, 10, this).update(w, U), T.minFilter = W, U.geometry.dispose(), U.material.dispose(), this;
	}
	clear(w, T = !0, O = !0, j = !0) {
		let F = w.getRenderTarget();
		for (let F = 0; F < 6; F++) w.setRenderTarget(this, F), w.clear(T, O, j);
		w.setRenderTarget(F);
	}
}, Group = class extends Object3D {
	constructor() {
		super(), this.isGroup = !0, this.type = "Group";
	}
}, _moveEvent = { type: "move" }, WebXRController = class {
	constructor() {
		this._targetRay = null, this._grip = null, this._hand = null;
	}
	getHandSpace() {
		return this._hand === null && (this._hand = new Group(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
	}
	getTargetRaySpace() {
		return this._targetRay === null && (this._targetRay = new Group(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new Vector3(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new Vector3()), this._targetRay;
	}
	getGripSpace() {
		return this._grip === null && (this._grip = new Group(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new Vector3(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new Vector3()), this._grip;
	}
	dispatchEvent(w) {
		return this._targetRay !== null && this._targetRay.dispatchEvent(w), this._grip !== null && this._grip.dispatchEvent(w), this._hand !== null && this._hand.dispatchEvent(w), this;
	}
	connect(w) {
		if (w && w.hand) {
			let T = this._hand;
			if (T) for (let O of w.hand.values()) this._getHandJoint(T, O);
		}
		return this.dispatchEvent({
			type: "connected",
			data: w
		}), this;
	}
	disconnect(w) {
		return this.dispatchEvent({
			type: "disconnected",
			data: w
		}), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
	}
	update(w, T, O) {
		let j = null, F = null, U = null, W = this._targetRay, G = this._grip, K = this._hand;
		if (w && T.session.visibilityState !== "visible-blurred") {
			if (K && w.hand) {
				U = !0;
				for (let j of w.hand.values()) {
					let w = T.getJointPose(j, O), F = this._getHandJoint(K, j);
					w !== null && (F.matrix.fromArray(w.transform.matrix), F.matrix.decompose(F.position, F.rotation, F.scale), F.matrixWorldNeedsUpdate = !0, F.jointRadius = w.radius), F.visible = w !== null;
				}
				let j = K.joints["index-finger-tip"], F = K.joints["thumb-tip"], W = j.position.distanceTo(F.position), G = .02, q = .005;
				K.inputState.pinching && W > G + q ? (K.inputState.pinching = !1, this.dispatchEvent({
					type: "pinchend",
					handedness: w.handedness,
					target: this
				})) : !K.inputState.pinching && W <= G - q && (K.inputState.pinching = !0, this.dispatchEvent({
					type: "pinchstart",
					handedness: w.handedness,
					target: this
				}));
			} else G !== null && w.gripSpace && (F = T.getPose(w.gripSpace, O), F !== null && (G.matrix.fromArray(F.transform.matrix), G.matrix.decompose(G.position, G.rotation, G.scale), G.matrixWorldNeedsUpdate = !0, F.linearVelocity ? (G.hasLinearVelocity = !0, G.linearVelocity.copy(F.linearVelocity)) : G.hasLinearVelocity = !1, F.angularVelocity ? (G.hasAngularVelocity = !0, G.angularVelocity.copy(F.angularVelocity)) : G.hasAngularVelocity = !1));
			W !== null && (j = T.getPose(w.targetRaySpace, O), j === null && F !== null && (j = F), j !== null && (W.matrix.fromArray(j.transform.matrix), W.matrix.decompose(W.position, W.rotation, W.scale), W.matrixWorldNeedsUpdate = !0, j.linearVelocity ? (W.hasLinearVelocity = !0, W.linearVelocity.copy(j.linearVelocity)) : W.hasLinearVelocity = !1, j.angularVelocity ? (W.hasAngularVelocity = !0, W.angularVelocity.copy(j.angularVelocity)) : W.hasAngularVelocity = !1, this.dispatchEvent(_moveEvent)));
		}
		return W !== null && (W.visible = j !== null), G !== null && (G.visible = F !== null), K !== null && (K.visible = U !== null), this;
	}
	_getHandJoint(w, T) {
		if (w.joints[T.jointName] === void 0) {
			let O = new Group();
			O.matrixAutoUpdate = !1, O.visible = !1, w.joints[T.jointName] = O, w.add(O);
		}
		return w.joints[T.jointName];
	}
}, Scene = class extends Object3D {
	constructor() {
		super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Euler(), this.environmentIntensity = 1, this.environmentRotation = new Euler(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	copy(w, T) {
		return super.copy(w, T), w.background !== null && (this.background = w.background.clone()), w.environment !== null && (this.environment = w.environment.clone()), w.fog !== null && (this.fog = w.fog.clone()), this.backgroundBlurriness = w.backgroundBlurriness, this.backgroundIntensity = w.backgroundIntensity, this.backgroundRotation.copy(w.backgroundRotation), this.environmentIntensity = w.environmentIntensity, this.environmentRotation.copy(w.environmentRotation), w.overrideMaterial !== null && (this.overrideMaterial = w.overrideMaterial.clone()), this.matrixAutoUpdate = w.matrixAutoUpdate, this;
	}
	toJSON(w) {
		let T = super.toJSON(w);
		return this.fog !== null && (T.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (T.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (T.object.backgroundIntensity = this.backgroundIntensity), T.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (T.object.environmentIntensity = this.environmentIntensity), T.object.environmentRotation = this.environmentRotation.toArray(), T;
	}
}, DataTexture = class extends Texture {
	constructor(w = null, T = 1, O = 1, j, F, U, W, G, K = NearestFilter, q = NearestFilter, J, Y) {
		super(null, U, W, G, K, q, j, F, J, Y), this.isDataTexture = !0, this.image = {
			data: w,
			width: T,
			height: O
		}, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
}, _vector1 = /* @__PURE__ */ new Vector3(), _vector2 = /* @__PURE__ */ new Vector3(), _normalMatrix = /* @__PURE__ */ new Matrix3(), Plane = class {
	constructor(w = new Vector3(1, 0, 0), T = 0) {
		this.isPlane = !0, this.normal = w, this.constant = T;
	}
	set(w, T) {
		return this.normal.copy(w), this.constant = T, this;
	}
	setComponents(w, T, O, j) {
		return this.normal.set(w, T, O), this.constant = j, this;
	}
	setFromNormalAndCoplanarPoint(w, T) {
		return this.normal.copy(w), this.constant = -T.dot(this.normal), this;
	}
	setFromCoplanarPoints(w, T, O) {
		let j = _vector1.subVectors(O, T).cross(_vector2.subVectors(w, T)).normalize();
		return this.setFromNormalAndCoplanarPoint(j, w), this;
	}
	copy(w) {
		return this.normal.copy(w.normal), this.constant = w.constant, this;
	}
	normalize() {
		let w = 1 / this.normal.length();
		return this.normal.multiplyScalar(w), this.constant *= w, this;
	}
	negate() {
		return this.constant *= -1, this.normal.negate(), this;
	}
	distanceToPoint(w) {
		return this.normal.dot(w) + this.constant;
	}
	distanceToSphere(w) {
		return this.distanceToPoint(w.center) - w.radius;
	}
	projectPoint(w, T) {
		return T.copy(w).addScaledVector(this.normal, -this.distanceToPoint(w));
	}
	intersectLine(w, T) {
		let O = w.delta(_vector1), j = this.normal.dot(O);
		if (j === 0) return this.distanceToPoint(w.start) === 0 ? T.copy(w.start) : null;
		let F = -(w.start.dot(this.normal) + this.constant) / j;
		return F < 0 || F > 1 ? null : T.copy(w.start).addScaledVector(O, F);
	}
	intersectsLine(w) {
		let T = this.distanceToPoint(w.start), O = this.distanceToPoint(w.end);
		return T < 0 && O > 0 || O < 0 && T > 0;
	}
	intersectsBox(w) {
		return w.intersectsPlane(this);
	}
	intersectsSphere(w) {
		return w.intersectsPlane(this);
	}
	coplanarPoint(w) {
		return w.copy(this.normal).multiplyScalar(-this.constant);
	}
	applyMatrix4(w, T) {
		let O = T || _normalMatrix.getNormalMatrix(w), j = this.coplanarPoint(_vector1).applyMatrix4(w), F = this.normal.applyMatrix3(O).normalize();
		return this.constant = -j.dot(F), this;
	}
	translate(w) {
		return this.constant -= w.dot(this.normal), this;
	}
	equals(w) {
		return w.normal.equals(this.normal) && w.constant === this.constant;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, _sphere$3 = /* @__PURE__ */ new Sphere(), _defaultSpriteCenter = /* @__PURE__ */ new Vector2(.5, .5), _vector$6 = /* @__PURE__ */ new Vector3(), Frustum = class {
	constructor(w = new Plane(), T = new Plane(), O = new Plane(), j = new Plane(), F = new Plane(), U = new Plane()) {
		this.planes = [
			w,
			T,
			O,
			j,
			F,
			U
		];
	}
	set(w, T, O, j, F, U) {
		let W = this.planes;
		return W[0].copy(w), W[1].copy(T), W[2].copy(O), W[3].copy(j), W[4].copy(F), W[5].copy(U), this;
	}
	copy(w) {
		let T = this.planes;
		for (let O = 0; O < 6; O++) T[O].copy(w.planes[O]);
		return this;
	}
	setFromProjectionMatrix(w, T = WebGLCoordinateSystem, O = !1) {
		let j = this.planes, F = w.elements, U = F[0], W = F[1], G = F[2], K = F[3], q = F[4], J = F[5], Y = F[6], X = F[7], Q = F[8], xS = F[9], SS = F[10], CS = F[11], wS = F[12], TS = F[13], ES = F[14], DS = F[15];
		if (j[0].setComponents(K - U, X - q, CS - Q, DS - wS).normalize(), j[1].setComponents(K + U, X + q, CS + Q, DS + wS).normalize(), j[2].setComponents(K + W, X + J, CS + xS, DS + TS).normalize(), j[3].setComponents(K - W, X - J, CS - xS, DS - TS).normalize(), O) j[4].setComponents(G, Y, SS, ES).normalize(), j[5].setComponents(K - G, X - Y, CS - SS, DS - ES).normalize();
		else if (j[4].setComponents(K - G, X - Y, CS - SS, DS - ES).normalize(), T === 2e3) j[5].setComponents(K + G, X + Y, CS + SS, DS + ES).normalize();
		else if (T === 2001) j[5].setComponents(G, Y, SS, ES).normalize();
		else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + T);
		return this;
	}
	intersectsObject(w) {
		if (w.boundingSphere !== void 0) w.boundingSphere === null && w.computeBoundingSphere(), _sphere$3.copy(w.boundingSphere).applyMatrix4(w.matrixWorld);
		else {
			let T = w.geometry;
			T.boundingSphere === null && T.computeBoundingSphere(), _sphere$3.copy(T.boundingSphere).applyMatrix4(w.matrixWorld);
		}
		return this.intersectsSphere(_sphere$3);
	}
	intersectsSprite(w) {
		return _sphere$3.center.set(0, 0, 0), _sphere$3.radius = .7071067811865476 + _defaultSpriteCenter.distanceTo(w.center), _sphere$3.applyMatrix4(w.matrixWorld), this.intersectsSphere(_sphere$3);
	}
	intersectsSphere(w) {
		let T = this.planes, O = w.center, j = -w.radius;
		for (let w = 0; w < 6; w++) if (T[w].distanceToPoint(O) < j) return !1;
		return !0;
	}
	intersectsBox(w) {
		let T = this.planes;
		for (let O = 0; O < 6; O++) {
			let j = T[O];
			if (_vector$6.x = j.normal.x > 0 ? w.max.x : w.min.x, _vector$6.y = j.normal.y > 0 ? w.max.y : w.min.y, _vector$6.z = j.normal.z > 0 ? w.max.z : w.min.z, j.distanceToPoint(_vector$6) < 0) return !1;
		}
		return !0;
	}
	containsPoint(w) {
		let T = this.planes;
		for (let O = 0; O < 6; O++) if (T[O].distanceToPoint(w) < 0) return !1;
		return !0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, LineBasicMaterial = class extends Material {
	constructor(w) {
		super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Color(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(w);
	}
	copy(w) {
		return super.copy(w), this.color.copy(w.color), this.map = w.map, this.linewidth = w.linewidth, this.linecap = w.linecap, this.linejoin = w.linejoin, this.fog = w.fog, this;
	}
}, _vStart = /* @__PURE__ */ new Vector3(), _vEnd = /* @__PURE__ */ new Vector3(), _inverseMatrix$1 = /* @__PURE__ */ new Matrix4(), _ray$1 = /* @__PURE__ */ new Ray(), _sphere$1 = /* @__PURE__ */ new Sphere(), _intersectPointOnRay = /* @__PURE__ */ new Vector3(), _intersectPointOnSegment = /* @__PURE__ */ new Vector3(), Line = class extends Object3D {
	constructor(w = new BufferGeometry(), T = new LineBasicMaterial()) {
		super(), this.isLine = !0, this.type = "Line", this.geometry = w, this.material = T, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
	}
	copy(w, T) {
		return super.copy(w, T), this.material = Array.isArray(w.material) ? w.material.slice() : w.material, this.geometry = w.geometry, this;
	}
	computeLineDistances() {
		let w = this.geometry;
		if (w.index === null) {
			let T = w.attributes.position, O = [0];
			for (let w = 1, j = T.count; w < j; w++) _vStart.fromBufferAttribute(T, w - 1), _vEnd.fromBufferAttribute(T, w), O[w] = O[w - 1], O[w] += _vStart.distanceTo(_vEnd);
			w.setAttribute("lineDistance", new Float32BufferAttribute(O, 1));
		} else warn("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
		return this;
	}
	raycast(w, T) {
		let O = this.geometry, j = this.matrixWorld, F = w.params.Line.threshold, U = O.drawRange;
		if (O.boundingSphere === null && O.computeBoundingSphere(), _sphere$1.copy(O.boundingSphere), _sphere$1.applyMatrix4(j), _sphere$1.radius += F, w.ray.intersectsSphere(_sphere$1) === !1) return;
		_inverseMatrix$1.copy(j).invert(), _ray$1.copy(w.ray).applyMatrix4(_inverseMatrix$1);
		let W = F / ((this.scale.x + this.scale.y + this.scale.z) / 3), G = W * W, K = this.isLineSegments ? 2 : 1, q = O.index, J = O.attributes.position;
		if (q !== null) {
			let O = Math.max(0, U.start), j = Math.min(q.count, U.start + U.count);
			for (let F = O, U = j - 1; F < U; F += K) {
				let O = q.getX(F), j = q.getX(F + 1), U = checkIntersection(this, w, _ray$1, G, O, j, F);
				U && T.push(U);
			}
			if (this.isLineLoop) {
				let F = q.getX(j - 1), U = q.getX(O), W = checkIntersection(this, w, _ray$1, G, F, U, j - 1);
				W && T.push(W);
			}
		} else {
			let O = Math.max(0, U.start), j = Math.min(J.count, U.start + U.count);
			for (let F = O, U = j - 1; F < U; F += K) {
				let O = checkIntersection(this, w, _ray$1, G, F, F + 1, F);
				O && T.push(O);
			}
			if (this.isLineLoop) {
				let F = checkIntersection(this, w, _ray$1, G, j - 1, O, j - 1);
				F && T.push(F);
			}
		}
	}
	updateMorphTargets() {
		let w = this.geometry.morphAttributes, T = Object.keys(w);
		if (T.length > 0) {
			let O = w[T[0]];
			if (O !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let w = 0, T = O.length; w < T; w++) {
					let T = O[w].name || String(w);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[T] = w;
				}
			}
		}
	}
};
function checkIntersection(w, T, O, j, F, U, W) {
	let G = w.geometry.attributes.position;
	if (_vStart.fromBufferAttribute(G, F), _vEnd.fromBufferAttribute(G, U), O.distanceSqToSegment(_vStart, _vEnd, _intersectPointOnRay, _intersectPointOnSegment) > j) return;
	_intersectPointOnRay.applyMatrix4(w.matrixWorld);
	let K = T.ray.origin.distanceTo(_intersectPointOnRay);
	if (!(K < T.near || K > T.far)) return {
		distance: K,
		point: _intersectPointOnSegment.clone().applyMatrix4(w.matrixWorld),
		index: W,
		face: null,
		faceIndex: null,
		barycoord: null,
		object: w
	};
}
var _start = /* @__PURE__ */ new Vector3(), _end = /* @__PURE__ */ new Vector3(), LineSegments = class extends Line {
	constructor(w, T) {
		super(w, T), this.isLineSegments = !0, this.type = "LineSegments";
	}
	computeLineDistances() {
		let w = this.geometry;
		if (w.index === null) {
			let T = w.attributes.position, O = [];
			for (let w = 0, j = T.count; w < j; w += 2) _start.fromBufferAttribute(T, w), _end.fromBufferAttribute(T, w + 1), O[w] = w === 0 ? 0 : O[w - 1], O[w + 1] = O[w] + _start.distanceTo(_end);
			w.setAttribute("lineDistance", new Float32BufferAttribute(O, 1));
		} else warn("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
		return this;
	}
}, CanvasTexture = class extends Texture {
	constructor(w, T, O, j, F, U, W, G, K) {
		super(w, T, O, j, F, U, W, G, K), this.isCanvasTexture = !0, this.needsUpdate = !0;
	}
}, DepthTexture = class extends Texture {
	constructor(w, T, O = UnsignedIntType, j, F, U, W = NearestFilter, G = NearestFilter, K, q = DepthFormat, J = 1) {
		if (q !== 1026 && q !== 1027) throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
		super({
			width: w,
			height: T,
			depth: J
		}, j, F, U, W, G, q, O, K), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
	}
	copy(w) {
		return super.copy(w), this.source = new Source(Object.assign({}, w.image)), this.compareFunction = w.compareFunction, this;
	}
	toJSON(w) {
		let T = super.toJSON(w);
		return this.compareFunction !== null && (T.compareFunction = this.compareFunction), T;
	}
}, CubeDepthTexture = class extends DepthTexture {
	constructor(w, T = UnsignedIntType, O = 301, j, F, U = NearestFilter, W = NearestFilter, G, K = DepthFormat) {
		let q = {
			width: w,
			height: w,
			depth: 1
		}, J = [
			q,
			q,
			q,
			q,
			q,
			q
		];
		super(w, w, T, O, j, F, U, W, G, K), this.image = J, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
	}
	get images() {
		return this.image;
	}
	set images(w) {
		this.image = w;
	}
}, ExternalTexture = class extends Texture {
	constructor(w = null) {
		super(), this.sourceTexture = w, this.isExternalTexture = !0;
	}
	copy(w) {
		return super.copy(w), this.sourceTexture = w.sourceTexture, this;
	}
}, PlaneGeometry = class w extends BufferGeometry {
	constructor(w = 1, T = 1, O = 1, j = 1) {
		super(), this.type = "PlaneGeometry", this.parameters = {
			width: w,
			height: T,
			widthSegments: O,
			heightSegments: j
		};
		let F = w / 2, U = T / 2, W = Math.floor(O), G = Math.floor(j), K = W + 1, q = G + 1, J = w / W, Y = T / G, X = [], Q = [], xS = [], SS = [];
		for (let w = 0; w < q; w++) {
			let T = w * Y - U;
			for (let O = 0; O < K; O++) {
				let j = O * J - F;
				Q.push(j, -T, 0), xS.push(0, 0, 1), SS.push(O / W), SS.push(1 - w / G);
			}
		}
		for (let w = 0; w < G; w++) for (let T = 0; T < W; T++) {
			let O = T + K * w, j = T + K * (w + 1), F = T + 1 + K * (w + 1), U = T + 1 + K * w;
			X.push(O, j, U), X.push(j, F, U);
		}
		this.setIndex(X), this.setAttribute("position", new Float32BufferAttribute(Q, 3)), this.setAttribute("normal", new Float32BufferAttribute(xS, 3)), this.setAttribute("uv", new Float32BufferAttribute(SS, 2));
	}
	copy(w) {
		return super.copy(w), this.parameters = Object.assign({}, w.parameters), this;
	}
	static fromJSON(T) {
		return new w(T.width, T.height, T.widthSegments, T.heightSegments);
	}
}, RawShaderMaterial = class extends ShaderMaterial {
	constructor(w) {
		super(w), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
	}
}, MeshStandardMaterial = class extends Material {
	constructor(w) {
		super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new Color(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Color(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new Vector2(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Euler(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(w);
	}
	copy(w) {
		return super.copy(w), this.defines = { STANDARD: "" }, this.color.copy(w.color), this.roughness = w.roughness, this.metalness = w.metalness, this.map = w.map, this.lightMap = w.lightMap, this.lightMapIntensity = w.lightMapIntensity, this.aoMap = w.aoMap, this.aoMapIntensity = w.aoMapIntensity, this.emissive.copy(w.emissive), this.emissiveMap = w.emissiveMap, this.emissiveIntensity = w.emissiveIntensity, this.bumpMap = w.bumpMap, this.bumpScale = w.bumpScale, this.normalMap = w.normalMap, this.normalMapType = w.normalMapType, this.normalScale.copy(w.normalScale), this.displacementMap = w.displacementMap, this.displacementScale = w.displacementScale, this.displacementBias = w.displacementBias, this.roughnessMap = w.roughnessMap, this.metalnessMap = w.metalnessMap, this.alphaMap = w.alphaMap, this.envMap = w.envMap, this.envMapRotation.copy(w.envMapRotation), this.envMapIntensity = w.envMapIntensity, this.wireframe = w.wireframe, this.wireframeLinewidth = w.wireframeLinewidth, this.wireframeLinecap = w.wireframeLinecap, this.wireframeLinejoin = w.wireframeLinejoin, this.flatShading = w.flatShading, this.fog = w.fog, this;
	}
}, MeshDepthMaterial = class extends Material {
	constructor(w) {
		super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = BasicDepthPacking, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(w);
	}
	copy(w) {
		return super.copy(w), this.depthPacking = w.depthPacking, this.map = w.map, this.alphaMap = w.alphaMap, this.displacementMap = w.displacementMap, this.displacementScale = w.displacementScale, this.displacementBias = w.displacementBias, this.wireframe = w.wireframe, this.wireframeLinewidth = w.wireframeLinewidth, this;
	}
}, MeshDistanceMaterial = class extends Material {
	constructor(w) {
		super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(w);
	}
	copy(w) {
		return super.copy(w), this.map = w.map, this.alphaMap = w.alphaMap, this.displacementMap = w.displacementMap, this.displacementScale = w.displacementScale, this.displacementBias = w.displacementBias, this;
	}
};
function convertArray(w, T) {
	return !w || w.constructor === T ? w : typeof T.BYTES_PER_ELEMENT == "number" ? new T(w) : Array.prototype.slice.call(w);
}
var Interpolant = class {
	constructor(w, T, O, j) {
		this.parameterPositions = w, this._cachedIndex = 0, this.resultBuffer = j === void 0 ? new T.constructor(O) : j, this.sampleValues = T, this.valueSize = O, this.settings = null, this.DefaultSettings_ = {};
	}
	evaluate(w) {
		let T = this.parameterPositions, O = this._cachedIndex, j = T[O], F = T[O - 1];
		validate_interval: {
			seek: {
				let U;
				linear_scan: {
					forward_scan: if (!(w < j)) {
						for (let U = O + 2;;) {
							if (j === void 0) {
								if (w < F) break forward_scan;
								return O = T.length, this._cachedIndex = O, this.copySampleValue_(O - 1);
							}
							if (O === U) break;
							if (F = j, j = T[++O], w < j) break seek;
						}
						U = T.length;
						break linear_scan;
					}
					if (!(w >= F)) {
						let W = T[1];
						w < W && (O = 2, F = W);
						for (let U = O - 2;;) {
							if (F === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
							if (O === U) break;
							if (j = F, F = T[--O - 1], w >= F) break seek;
						}
						U = O, O = 0;
						break linear_scan;
					}
					break validate_interval;
				}
				for (; O < U;) {
					let j = O + U >>> 1;
					w < T[j] ? U = j : O = j + 1;
				}
				if (j = T[O], F = T[O - 1], F === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
				if (j === void 0) return O = T.length, this._cachedIndex = O, this.copySampleValue_(O - 1);
			}
			this._cachedIndex = O, this.intervalChanged_(O, F, j);
		}
		return this.interpolate_(O, F, w, j);
	}
	getSettings_() {
		return this.settings || this.DefaultSettings_;
	}
	copySampleValue_(w) {
		let T = this.resultBuffer, O = this.sampleValues, j = this.valueSize, F = w * j;
		for (let w = 0; w !== j; ++w) T[w] = O[F + w];
		return T;
	}
	interpolate_() {
		throw Error("call to abstract method");
	}
	intervalChanged_() {}
}, CubicInterpolant = class extends Interpolant {
	constructor(w, T, O, j) {
		super(w, T, O, j), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
			endingStart: ZeroCurvatureEnding,
			endingEnd: ZeroCurvatureEnding
		};
	}
	intervalChanged_(w, T, O) {
		let j = this.parameterPositions, F = w - 2, U = w + 1, W = j[F], G = j[U];
		if (W === void 0) switch (this.getSettings_().endingStart) {
			case ZeroSlopeEnding:
				F = w, W = 2 * T - O;
				break;
			case WrapAroundEnding:
				F = j.length - 2, W = T + j[F] - j[F + 1];
				break;
			default: F = w, W = O;
		}
		if (G === void 0) switch (this.getSettings_().endingEnd) {
			case ZeroSlopeEnding:
				U = w, G = 2 * O - T;
				break;
			case WrapAroundEnding:
				U = 1, G = O + j[1] - j[0];
				break;
			default: U = w - 1, G = T;
		}
		let K = (O - T) * .5, q = this.valueSize;
		this._weightPrev = K / (T - W), this._weightNext = K / (G - O), this._offsetPrev = F * q, this._offsetNext = U * q;
	}
	interpolate_(w, T, O, j) {
		let F = this.resultBuffer, U = this.sampleValues, W = this.valueSize, G = w * W, K = G - W, q = this._offsetPrev, J = this._offsetNext, Y = this._weightPrev, X = this._weightNext, Q = (O - T) / (j - T), xS = Q * Q, SS = xS * Q, CS = -Y * SS + 2 * Y * xS - Y * Q, wS = (1 + Y) * SS + (-1.5 - 2 * Y) * xS + (-.5 + Y) * Q + 1, TS = (-1 - X) * SS + (1.5 + X) * xS + .5 * Q, ES = X * SS - X * xS;
		for (let w = 0; w !== W; ++w) F[w] = CS * U[q + w] + wS * U[K + w] + TS * U[G + w] + ES * U[J + w];
		return F;
	}
}, LinearInterpolant = class extends Interpolant {
	constructor(w, T, O, j) {
		super(w, T, O, j);
	}
	interpolate_(w, T, O, j) {
		let F = this.resultBuffer, U = this.sampleValues, W = this.valueSize, G = w * W, K = G - W, q = (O - T) / (j - T), J = 1 - q;
		for (let w = 0; w !== W; ++w) F[w] = U[K + w] * J + U[G + w] * q;
		return F;
	}
}, DiscreteInterpolant = class extends Interpolant {
	constructor(w, T, O, j) {
		super(w, T, O, j);
	}
	interpolate_(w) {
		return this.copySampleValue_(w - 1);
	}
}, KeyframeTrack = class {
	constructor(w, T, O, j) {
		if (w === void 0) throw Error("THREE.KeyframeTrack: track name is undefined");
		if (T === void 0 || T.length === 0) throw Error("THREE.KeyframeTrack: no keyframes in track named " + w);
		this.name = w, this.times = convertArray(T, this.TimeBufferType), this.values = convertArray(O, this.ValueBufferType), this.setInterpolation(j || this.DefaultInterpolation);
	}
	static toJSON(w) {
		let T = w.constructor, O;
		if (T.toJSON !== this.toJSON) O = T.toJSON(w);
		else {
			O = {
				name: w.name,
				times: convertArray(w.times, Array),
				values: convertArray(w.values, Array)
			};
			let T = w.getInterpolation();
			T !== w.DefaultInterpolation && (O.interpolation = T);
		}
		return O.type = w.ValueTypeName, O;
	}
	InterpolantFactoryMethodDiscrete(w) {
		return new DiscreteInterpolant(this.times, this.values, this.getValueSize(), w);
	}
	InterpolantFactoryMethodLinear(w) {
		return new LinearInterpolant(this.times, this.values, this.getValueSize(), w);
	}
	InterpolantFactoryMethodSmooth(w) {
		return new CubicInterpolant(this.times, this.values, this.getValueSize(), w);
	}
	setInterpolation(w) {
		let T;
		switch (w) {
			case InterpolateDiscrete:
				T = this.InterpolantFactoryMethodDiscrete;
				break;
			case InterpolateLinear:
				T = this.InterpolantFactoryMethodLinear;
				break;
			case InterpolateSmooth:
				T = this.InterpolantFactoryMethodSmooth;
				break;
		}
		if (T === void 0) {
			let T = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
			if (this.createInterpolant === void 0) if (w !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
			else throw Error(T);
			return warn("KeyframeTrack:", T), this;
		}
		return this.createInterpolant = T, this;
	}
	getInterpolation() {
		switch (this.createInterpolant) {
			case this.InterpolantFactoryMethodDiscrete: return InterpolateDiscrete;
			case this.InterpolantFactoryMethodLinear: return InterpolateLinear;
			case this.InterpolantFactoryMethodSmooth: return InterpolateSmooth;
		}
	}
	getValueSize() {
		return this.values.length / this.times.length;
	}
	shift(w) {
		if (w !== 0) {
			let T = this.times;
			for (let O = 0, j = T.length; O !== j; ++O) T[O] += w;
		}
		return this;
	}
	scale(w) {
		if (w !== 1) {
			let T = this.times;
			for (let O = 0, j = T.length; O !== j; ++O) T[O] *= w;
		}
		return this;
	}
	trim(w, T) {
		let O = this.times, j = O.length, F = 0, U = j - 1;
		for (; F !== j && O[F] < w;) ++F;
		for (; U !== -1 && O[U] > T;) --U;
		if (++U, F !== 0 || U !== j) {
			F >= U && (U = Math.max(U, 1), F = U - 1);
			let w = this.getValueSize();
			this.times = O.slice(F, U), this.values = this.values.slice(F * w, U * w);
		}
		return this;
	}
	validate() {
		let w = !0, T = this.getValueSize();
		T - Math.floor(T) !== 0 && (error("KeyframeTrack: Invalid value size in track.", this), w = !1);
		let O = this.times, j = this.values, F = O.length;
		F === 0 && (error("KeyframeTrack: Track is empty.", this), w = !1);
		let U = null;
		for (let T = 0; T !== F; T++) {
			let j = O[T];
			if (typeof j == "number" && isNaN(j)) {
				error("KeyframeTrack: Time is not a valid number.", this, T, j), w = !1;
				break;
			}
			if (U !== null && U > j) {
				error("KeyframeTrack: Out of order keys.", this, T, j, U), w = !1;
				break;
			}
			U = j;
		}
		if (j !== void 0 && isTypedArray(j)) for (let T = 0, O = j.length; T !== O; ++T) {
			let O = j[T];
			if (isNaN(O)) {
				error("KeyframeTrack: Value is not a valid number.", this, T, O), w = !1;
				break;
			}
		}
		return w;
	}
	optimize() {
		let w = this.times.slice(), T = this.values.slice(), O = this.getValueSize(), j = this.getInterpolation() === InterpolateSmooth, F = w.length - 1, U = 1;
		for (let W = 1; W < F; ++W) {
			let F = !1, G = w[W];
			if (G !== w[W + 1] && (W !== 1 || G !== w[0])) if (j) F = !0;
			else {
				let w = W * O, j = w - O, U = w + O;
				for (let W = 0; W !== O; ++W) {
					let O = T[w + W];
					if (O !== T[j + W] || O !== T[U + W]) {
						F = !0;
						break;
					}
				}
			}
			if (F) {
				if (W !== U) {
					w[U] = w[W];
					let j = W * O, F = U * O;
					for (let w = 0; w !== O; ++w) T[F + w] = T[j + w];
				}
				++U;
			}
		}
		if (F > 0) {
			w[U] = w[F];
			for (let w = F * O, j = U * O, W = 0; W !== O; ++W) T[j + W] = T[w + W];
			++U;
		}
		return U === w.length ? (this.times = w, this.values = T) : (this.times = w.slice(0, U), this.values = T.slice(0, U * O)), this;
	}
	clone() {
		let w = this.times.slice(), T = this.values.slice(), O = this.constructor, j = new O(this.name, w, T);
		return j.createInterpolant = this.createInterpolant, j;
	}
};
KeyframeTrack.prototype.ValueTypeName = "", KeyframeTrack.prototype.TimeBufferType = Float32Array, KeyframeTrack.prototype.ValueBufferType = Float32Array, KeyframeTrack.prototype.DefaultInterpolation = InterpolateLinear;
var BooleanKeyframeTrack = class extends KeyframeTrack {
	constructor(w, T, O) {
		super(w, T, O);
	}
};
BooleanKeyframeTrack.prototype.ValueTypeName = "bool", BooleanKeyframeTrack.prototype.ValueBufferType = Array, BooleanKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete, BooleanKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0, BooleanKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
var ColorKeyframeTrack = class extends KeyframeTrack {
	constructor(w, T, O, j) {
		super(w, T, O, j);
	}
};
ColorKeyframeTrack.prototype.ValueTypeName = "color";
var NumberKeyframeTrack = class extends KeyframeTrack {
	constructor(w, T, O, j) {
		super(w, T, O, j);
	}
};
NumberKeyframeTrack.prototype.ValueTypeName = "number";
var QuaternionLinearInterpolant = class extends Interpolant {
	constructor(w, T, O, j) {
		super(w, T, O, j);
	}
	interpolate_(w, T, O, j) {
		let F = this.resultBuffer, U = this.sampleValues, W = this.valueSize, G = (O - T) / (j - T), K = w * W;
		for (let w = K + W; K !== w; K += 4) Quaternion.slerpFlat(F, 0, U, K - W, U, K, G);
		return F;
	}
}, QuaternionKeyframeTrack = class extends KeyframeTrack {
	constructor(w, T, O, j) {
		super(w, T, O, j);
	}
	InterpolantFactoryMethodLinear(w) {
		return new QuaternionLinearInterpolant(this.times, this.values, this.getValueSize(), w);
	}
};
QuaternionKeyframeTrack.prototype.ValueTypeName = "quaternion", QuaternionKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
var StringKeyframeTrack = class extends KeyframeTrack {
	constructor(w, T, O) {
		super(w, T, O);
	}
};
StringKeyframeTrack.prototype.ValueTypeName = "string", StringKeyframeTrack.prototype.ValueBufferType = Array, StringKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete, StringKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0, StringKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
var VectorKeyframeTrack = class extends KeyframeTrack {
	constructor(w, T, O, j) {
		super(w, T, O, j);
	}
};
VectorKeyframeTrack.prototype.ValueTypeName = "vector";
var DefaultLoadingManager = /* @__PURE__ */ new class {
	constructor(w, T, O) {
		let j = this, F = !1, U = 0, W = 0, G, K = [];
		this.onStart = void 0, this.onLoad = w, this.onProgress = T, this.onError = O, this._abortController = null, this.itemStart = function(w) {
			W++, F === !1 && j.onStart !== void 0 && j.onStart(w, U, W), F = !0;
		}, this.itemEnd = function(w) {
			U++, j.onProgress !== void 0 && j.onProgress(w, U, W), U === W && (F = !1, j.onLoad !== void 0 && j.onLoad());
		}, this.itemError = function(w) {
			j.onError !== void 0 && j.onError(w);
		}, this.resolveURL = function(w) {
			return G ? G(w) : w;
		}, this.setURLModifier = function(w) {
			return G = w, this;
		}, this.addHandler = function(w, T) {
			return K.push(w, T), this;
		}, this.removeHandler = function(w) {
			let T = K.indexOf(w);
			return T !== -1 && K.splice(T, 2), this;
		}, this.getHandler = function(w) {
			for (let T = 0, O = K.length; T < O; T += 2) {
				let O = K[T], j = K[T + 1];
				if (O.global && (O.lastIndex = 0), O.test(w)) return j;
			}
			return null;
		}, this.abort = function() {
			return this.abortController.abort(), this._abortController = null, this;
		};
	}
	get abortController() {
		return this._abortController ||= new AbortController(), this._abortController;
	}
}(), Loader = class {
	constructor(w) {
		this.manager = w === void 0 ? DefaultLoadingManager : w, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
	}
	load() {}
	loadAsync(w, T) {
		let O = this;
		return new Promise(function(j, F) {
			O.load(w, j, T, F);
		});
	}
	parse() {}
	setCrossOrigin(w) {
		return this.crossOrigin = w, this;
	}
	setWithCredentials(w) {
		return this.withCredentials = w, this;
	}
	setPath(w) {
		return this.path = w, this;
	}
	setResourcePath(w) {
		return this.resourcePath = w, this;
	}
	setRequestHeader(w) {
		return this.requestHeader = w, this;
	}
	abort() {
		return this;
	}
};
Loader.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var Light = class extends Object3D {
	constructor(w, T = 1) {
		super(), this.isLight = !0, this.type = "Light", this.color = new Color(w), this.intensity = T;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	copy(w, T) {
		return super.copy(w, T), this.color.copy(w.color), this.intensity = w.intensity, this;
	}
	toJSON(w) {
		let T = super.toJSON(w);
		return T.object.color = this.color.getHex(), T.object.intensity = this.intensity, T;
	}
}, _projScreenMatrix$1 = /* @__PURE__ */ new Matrix4(), _lightPositionWorld$1 = /* @__PURE__ */ new Vector3(), _lookTarget$1 = /* @__PURE__ */ new Vector3(), LightShadow = class {
	constructor(w) {
		this.camera = w, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Vector2(512, 512), this.mapType = UnsignedByteType, this.map = null, this.mapPass = null, this.matrix = new Matrix4(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Frustum(), this._frameExtents = new Vector2(1, 1), this._viewportCount = 1, this._viewports = [new Vector4(0, 0, 1, 1)];
	}
	getViewportCount() {
		return this._viewportCount;
	}
	getFrustum() {
		return this._frustum;
	}
	updateMatrices(w) {
		let T = this.camera, O = this.matrix;
		_lightPositionWorld$1.setFromMatrixPosition(w.matrixWorld), T.position.copy(_lightPositionWorld$1), _lookTarget$1.setFromMatrixPosition(w.target.matrixWorld), T.lookAt(_lookTarget$1), T.updateMatrixWorld(), _projScreenMatrix$1.multiplyMatrices(T.projectionMatrix, T.matrixWorldInverse), this._frustum.setFromProjectionMatrix(_projScreenMatrix$1, T.coordinateSystem, T.reversedDepth), T.reversedDepth ? O.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, 1, 0, 0, 0, 0, 1) : O.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), O.multiply(_projScreenMatrix$1);
	}
	getViewport(w) {
		return this._viewports[w];
	}
	getFrameExtents() {
		return this._frameExtents;
	}
	dispose() {
		this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
	}
	copy(w) {
		return this.camera = w.camera.clone(), this.intensity = w.intensity, this.bias = w.bias, this.radius = w.radius, this.autoUpdate = w.autoUpdate, this.needsUpdate = w.needsUpdate, this.normalBias = w.normalBias, this.blurSamples = w.blurSamples, this.mapSize.copy(w.mapSize), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		let w = {};
		return this.intensity !== 1 && (w.intensity = this.intensity), this.bias !== 0 && (w.bias = this.bias), this.normalBias !== 0 && (w.normalBias = this.normalBias), this.radius !== 1 && (w.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (w.mapSize = this.mapSize.toArray()), w.camera = this.camera.toJSON(!1).object, delete w.camera.matrix, w;
	}
}, PointLightShadow = class extends LightShadow {
	constructor() {
		super(new PerspectiveCamera(90, 1, .5, 500)), this.isPointLightShadow = !0;
	}
}, PointLight = class extends Light {
	constructor(w, T, O = 0, j = 2) {
		super(w, T), this.isPointLight = !0, this.type = "PointLight", this.distance = O, this.decay = j, this.shadow = new PointLightShadow();
	}
	get power() {
		return this.intensity * 4 * Math.PI;
	}
	set power(w) {
		this.intensity = w / (4 * Math.PI);
	}
	dispose() {
		super.dispose(), this.shadow.dispose();
	}
	copy(w, T) {
		return super.copy(w, T), this.distance = w.distance, this.decay = w.decay, this.shadow = w.shadow.clone(), this;
	}
	toJSON(w) {
		let T = super.toJSON(w);
		return T.object.distance = this.distance, T.object.decay = this.decay, T.object.shadow = this.shadow.toJSON(), T;
	}
}, OrthographicCamera = class extends Camera {
	constructor(w = -1, T = 1, O = 1, j = -1, F = .1, U = 2e3) {
		super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = w, this.right = T, this.top = O, this.bottom = j, this.near = F, this.far = U, this.updateProjectionMatrix();
	}
	copy(w, T) {
		return super.copy(w, T), this.left = w.left, this.right = w.right, this.top = w.top, this.bottom = w.bottom, this.near = w.near, this.far = w.far, this.zoom = w.zoom, this.view = w.view === null ? null : Object.assign({}, w.view), this;
	}
	setViewOffset(w, T, O, j, F, U) {
		this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = w, this.view.fullHeight = T, this.view.offsetX = O, this.view.offsetY = j, this.view.width = F, this.view.height = U, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let w = (this.right - this.left) / (2 * this.zoom), T = (this.top - this.bottom) / (2 * this.zoom), O = (this.right + this.left) / 2, j = (this.top + this.bottom) / 2, F = O - w, U = O + w, W = j + T, G = j - T;
		if (this.view !== null && this.view.enabled) {
			let w = (this.right - this.left) / this.view.fullWidth / this.zoom, T = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
			F += w * this.view.offsetX, U = F + w * this.view.width, W -= T * this.view.offsetY, G = W - T * this.view.height;
		}
		this.projectionMatrix.makeOrthographic(F, U, W, G, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(w) {
		let T = super.toJSON(w);
		return T.object.zoom = this.zoom, T.object.left = this.left, T.object.right = this.right, T.object.top = this.top, T.object.bottom = this.bottom, T.object.near = this.near, T.object.far = this.far, this.view !== null && (T.object.view = Object.assign({}, this.view)), T;
	}
}, DirectionalLightShadow = class extends LightShadow {
	constructor() {
		super(new OrthographicCamera(-5, 5, 5, -5, .5, 500)), this.isDirectionalLightShadow = !0;
	}
}, DirectionalLight = class extends Light {
	constructor(w, T) {
		super(w, T), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(Object3D.DEFAULT_UP), this.updateMatrix(), this.target = new Object3D(), this.shadow = new DirectionalLightShadow();
	}
	dispose() {
		super.dispose(), this.shadow.dispose();
	}
	copy(w) {
		return super.copy(w), this.target = w.target.clone(), this.shadow = w.shadow.clone(), this;
	}
	toJSON(w) {
		let T = super.toJSON(w);
		return T.object.shadow = this.shadow.toJSON(), T.object.target = this.target.uuid, T;
	}
}, AmbientLight = class extends Light {
	constructor(w, T) {
		super(w, T), this.isAmbientLight = !0, this.type = "AmbientLight";
	}
}, ArrayCamera = class extends PerspectiveCamera {
	constructor(w = []) {
		super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = w;
	}
}, _RESERVED_CHARS_RE = "\\[\\]\\.:\\/", _reservedRe = RegExp("[" + _RESERVED_CHARS_RE + "]", "g"), _wordChar = "[^" + _RESERVED_CHARS_RE + "]", _wordCharOrDot = "[^" + _RESERVED_CHARS_RE.replace("\\.", "") + "]", _directoryRe = /* @__PURE__ */ "((?:WC+[\\/:])*)".replace("WC", _wordChar), _nodeRe = /* @__PURE__ */ "(WCOD+)?".replace("WCOD", _wordCharOrDot), _objectRe = /* @__PURE__ */ "(?:\\.(WC+)(?:\\[(.+)\\])?)?".replace("WC", _wordChar), _propertyRe = /* @__PURE__ */ "\\.(WC+)(?:\\[(.+)\\])?".replace("WC", _wordChar), _trackRe = /* @__PURE__ */ RegExp("^" + _directoryRe + _nodeRe + _objectRe + _propertyRe + "$"), _supportedObjectNames = [
	"material",
	"materials",
	"bones",
	"map"
], Composite = class {
	constructor(w, T, O) {
		let j = O || PropertyBinding.parseTrackName(T);
		this._targetGroup = w, this._bindings = w.subscribe_(T, j);
	}
	getValue(w, T) {
		this.bind();
		let O = this._targetGroup.nCachedObjects_, j = this._bindings[O];
		j !== void 0 && j.getValue(w, T);
	}
	setValue(w, T) {
		let O = this._bindings;
		for (let j = this._targetGroup.nCachedObjects_, F = O.length; j !== F; ++j) O[j].setValue(w, T);
	}
	bind() {
		let w = this._bindings;
		for (let T = this._targetGroup.nCachedObjects_, O = w.length; T !== O; ++T) w[T].bind();
	}
	unbind() {
		let w = this._bindings;
		for (let T = this._targetGroup.nCachedObjects_, O = w.length; T !== O; ++T) w[T].unbind();
	}
}, PropertyBinding = class w {
	constructor(T, O, j) {
		this.path = O, this.parsedPath = j || w.parseTrackName(O), this.node = w.findNode(T, this.parsedPath.nodeName), this.rootNode = T, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
	static create(T, O, j) {
		return T && T.isAnimationObjectGroup ? new w.Composite(T, O, j) : new w(T, O, j);
	}
	static sanitizeNodeName(w) {
		return w.replace(/\s/g, "_").replace(_reservedRe, "");
	}
	static parseTrackName(w) {
		let T = _trackRe.exec(w);
		if (T === null) throw Error("PropertyBinding: Cannot parse trackName: " + w);
		let O = {
			nodeName: T[2],
			objectName: T[3],
			objectIndex: T[4],
			propertyName: T[5],
			propertyIndex: T[6]
		}, j = O.nodeName && O.nodeName.lastIndexOf(".");
		if (j !== void 0 && j !== -1) {
			let w = O.nodeName.substring(j + 1);
			_supportedObjectNames.indexOf(w) !== -1 && (O.nodeName = O.nodeName.substring(0, j), O.objectName = w);
		}
		if (O.propertyName === null || O.propertyName.length === 0) throw Error("PropertyBinding: can not parse propertyName from trackName: " + w);
		return O;
	}
	static findNode(w, T) {
		if (T === void 0 || T === "" || T === "." || T === -1 || T === w.name || T === w.uuid) return w;
		if (w.skeleton) {
			let O = w.skeleton.getBoneByName(T);
			if (O !== void 0) return O;
		}
		if (w.children) {
			let O = function(w) {
				for (let j = 0; j < w.length; j++) {
					let F = w[j];
					if (F.name === T || F.uuid === T) return F;
					let U = O(F.children);
					if (U) return U;
				}
				return null;
			}, j = O(w.children);
			if (j) return j;
		}
		return null;
	}
	_getValue_unavailable() {}
	_setValue_unavailable() {}
	_getValue_direct(w, T) {
		w[T] = this.targetObject[this.propertyName];
	}
	_getValue_array(w, T) {
		let O = this.resolvedProperty;
		for (let j = 0, F = O.length; j !== F; ++j) w[T++] = O[j];
	}
	_getValue_arrayElement(w, T) {
		w[T] = this.resolvedProperty[this.propertyIndex];
	}
	_getValue_toArray(w, T) {
		this.resolvedProperty.toArray(w, T);
	}
	_setValue_direct(w, T) {
		this.targetObject[this.propertyName] = w[T];
	}
	_setValue_direct_setNeedsUpdate(w, T) {
		this.targetObject[this.propertyName] = w[T], this.targetObject.needsUpdate = !0;
	}
	_setValue_direct_setMatrixWorldNeedsUpdate(w, T) {
		this.targetObject[this.propertyName] = w[T], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_array(w, T) {
		let O = this.resolvedProperty;
		for (let j = 0, F = O.length; j !== F; ++j) O[j] = w[T++];
	}
	_setValue_array_setNeedsUpdate(w, T) {
		let O = this.resolvedProperty;
		for (let j = 0, F = O.length; j !== F; ++j) O[j] = w[T++];
		this.targetObject.needsUpdate = !0;
	}
	_setValue_array_setMatrixWorldNeedsUpdate(w, T) {
		let O = this.resolvedProperty;
		for (let j = 0, F = O.length; j !== F; ++j) O[j] = w[T++];
		this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_arrayElement(w, T) {
		this.resolvedProperty[this.propertyIndex] = w[T];
	}
	_setValue_arrayElement_setNeedsUpdate(w, T) {
		this.resolvedProperty[this.propertyIndex] = w[T], this.targetObject.needsUpdate = !0;
	}
	_setValue_arrayElement_setMatrixWorldNeedsUpdate(w, T) {
		this.resolvedProperty[this.propertyIndex] = w[T], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_fromArray(w, T) {
		this.resolvedProperty.fromArray(w, T);
	}
	_setValue_fromArray_setNeedsUpdate(w, T) {
		this.resolvedProperty.fromArray(w, T), this.targetObject.needsUpdate = !0;
	}
	_setValue_fromArray_setMatrixWorldNeedsUpdate(w, T) {
		this.resolvedProperty.fromArray(w, T), this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_getValue_unbound(w, T) {
		this.bind(), this.getValue(w, T);
	}
	_setValue_unbound(w, T) {
		this.bind(), this.setValue(w, T);
	}
	bind() {
		let T = this.node, O = this.parsedPath, j = O.objectName, F = O.propertyName, U = O.propertyIndex;
		if (T || (T = w.findNode(this.rootNode, O.nodeName), this.node = T), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !T) {
			warn("PropertyBinding: No target node found for track: " + this.path + ".");
			return;
		}
		if (j) {
			let w = O.objectIndex;
			switch (j) {
				case "materials":
					if (!T.material) {
						error("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!T.material.materials) {
						error("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
						return;
					}
					T = T.material.materials;
					break;
				case "bones":
					if (!T.skeleton) {
						error("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
						return;
					}
					T = T.skeleton.bones;
					for (let O = 0; O < T.length; O++) if (T[O].name === w) {
						w = O;
						break;
					}
					break;
				case "map":
					if ("map" in T) {
						T = T.map;
						break;
					}
					if (!T.material) {
						error("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!T.material.map) {
						error("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
						return;
					}
					T = T.material.map;
					break;
				default:
					if (T[j] === void 0) {
						error("PropertyBinding: Can not bind to objectName of node undefined.", this);
						return;
					}
					T = T[j];
			}
			if (w !== void 0) {
				if (T[w] === void 0) {
					error("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, T);
					return;
				}
				T = T[w];
			}
		}
		let W = T[F];
		if (W === void 0) {
			let w = O.nodeName;
			error("PropertyBinding: Trying to update property for track: " + w + "." + F + " but it wasn't found.", T);
			return;
		}
		let G = this.Versioning.None;
		this.targetObject = T, T.isMaterial === !0 ? G = this.Versioning.NeedsUpdate : T.isObject3D === !0 && (G = this.Versioning.MatrixWorldNeedsUpdate);
		let K = this.BindingType.Direct;
		if (U !== void 0) {
			if (F === "morphTargetInfluences") {
				if (!T.geometry) {
					error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
					return;
				}
				if (!T.geometry.morphAttributes) {
					error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
					return;
				}
				T.morphTargetDictionary[U] !== void 0 && (U = T.morphTargetDictionary[U]);
			}
			K = this.BindingType.ArrayElement, this.resolvedProperty = W, this.propertyIndex = U;
		} else W.fromArray !== void 0 && W.toArray !== void 0 ? (K = this.BindingType.HasFromToArray, this.resolvedProperty = W) : Array.isArray(W) ? (K = this.BindingType.EntireArray, this.resolvedProperty = W) : this.propertyName = F;
		this.getValue = this.GetterByBindingType[K], this.setValue = this.SetterByBindingTypeAndVersioning[K][G];
	}
	unbind() {
		this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
};
PropertyBinding.Composite = Composite, PropertyBinding.prototype.BindingType = {
	Direct: 0,
	EntireArray: 1,
	ArrayElement: 2,
	HasFromToArray: 3
}, PropertyBinding.prototype.Versioning = {
	None: 0,
	NeedsUpdate: 1,
	MatrixWorldNeedsUpdate: 2
}, PropertyBinding.prototype.GetterByBindingType = [
	PropertyBinding.prototype._getValue_direct,
	PropertyBinding.prototype._getValue_array,
	PropertyBinding.prototype._getValue_arrayElement,
	PropertyBinding.prototype._getValue_toArray
], PropertyBinding.prototype.SetterByBindingTypeAndVersioning = [
	[
		PropertyBinding.prototype._setValue_direct,
		PropertyBinding.prototype._setValue_direct_setNeedsUpdate,
		PropertyBinding.prototype._setValue_direct_setMatrixWorldNeedsUpdate
	],
	[
		PropertyBinding.prototype._setValue_array,
		PropertyBinding.prototype._setValue_array_setNeedsUpdate,
		PropertyBinding.prototype._setValue_array_setMatrixWorldNeedsUpdate
	],
	[
		PropertyBinding.prototype._setValue_arrayElement,
		PropertyBinding.prototype._setValue_arrayElement_setNeedsUpdate,
		PropertyBinding.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
	],
	[
		PropertyBinding.prototype._setValue_fromArray,
		PropertyBinding.prototype._setValue_fromArray_setNeedsUpdate,
		PropertyBinding.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
	]
], new Float32Array(1);
var _matrix = /* @__PURE__ */ new Matrix4(), Raycaster = class {
	constructor(w, T, O = 0, j = Infinity) {
		this.ray = new Ray(w, T), this.near = O, this.far = j, this.camera = null, this.layers = new Layers(), this.params = {
			Mesh: {},
			Line: { threshold: 1 },
			LOD: {},
			Points: { threshold: 1 },
			Sprite: {}
		};
	}
	set(w, T) {
		this.ray.set(w, T);
	}
	setFromCamera(w, T) {
		T.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(T.matrixWorld), this.ray.direction.set(w.x, w.y, .5).unproject(T).sub(this.ray.origin).normalize(), this.camera = T) : T.isOrthographicCamera ? (this.ray.origin.set(w.x, w.y, (T.near + T.far) / (T.near - T.far)).unproject(T), this.ray.direction.set(0, 0, -1).transformDirection(T.matrixWorld), this.camera = T) : error("Raycaster: Unsupported camera type: " + T.type);
	}
	setFromXRController(w) {
		return _matrix.identity().extractRotation(w.matrixWorld), this.ray.origin.setFromMatrixPosition(w.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(_matrix), this;
	}
	intersectObject(w, T = !0, O = []) {
		return intersect(w, this, O, T), O.sort(ascSort), O;
	}
	intersectObjects(w, T = !0, O = []) {
		for (let j = 0, F = w.length; j < F; j++) intersect(w[j], this, O, T);
		return O.sort(ascSort), O;
	}
};
function ascSort(w, T) {
	return w.distance - T.distance;
}
function intersect(w, T, O, j) {
	let F = !0;
	if (w.layers.test(T.layers) && w.raycast(T, O) === !1 && (F = !1), F === !0 && j === !0) {
		let j = w.children;
		for (let w = 0, F = j.length; w < F; w++) intersect(j[w], T, O, !0);
	}
}
var Spherical = class {
	constructor(w = 1, T = 0, O = 0) {
		this.radius = w, this.phi = T, this.theta = O;
	}
	set(w, T, O) {
		return this.radius = w, this.phi = T, this.theta = O, this;
	}
	copy(w) {
		return this.radius = w.radius, this.phi = w.phi, this.theta = w.theta, this;
	}
	makeSafe() {
		let w = 1e-6;
		return this.phi = clamp$6(this.phi, w, Math.PI - w), this;
	}
	setFromVector3(w) {
		return this.setFromCartesianCoords(w.x, w.y, w.z);
	}
	setFromCartesianCoords(w, T, O) {
		return this.radius = Math.sqrt(w * w + T * T + O * O), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(w, O), this.phi = Math.acos(clamp$6(T / this.radius, -1, 1))), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, GridHelper = class extends LineSegments {
	constructor(w = 10, T = 10, O = 4473924, j = 8947848) {
		O = new Color(O), j = new Color(j);
		let F = T / 2, U = w / T, W = w / 2, G = [], K = [];
		for (let w = 0, q = 0, J = -W; w <= T; w++, J += U) {
			G.push(-W, 0, J, W, 0, J), G.push(J, 0, -W, J, 0, W);
			let T = w === F ? O : j;
			T.toArray(K, q), q += 3, T.toArray(K, q), q += 3, T.toArray(K, q), q += 3, T.toArray(K, q), q += 3;
		}
		let q = new BufferGeometry();
		q.setAttribute("position", new Float32BufferAttribute(G, 3)), q.setAttribute("color", new Float32BufferAttribute(K, 3));
		let J = new LineBasicMaterial({
			vertexColors: !0,
			toneMapped: !1
		});
		super(q, J), this.type = "GridHelper";
	}
	dispose() {
		this.geometry.dispose(), this.material.dispose();
	}
}, Controls = class extends EventDispatcher {
	constructor(w, T = null) {
		super(), this.object = w, this.domElement = T, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = {
			LEFT: null,
			MIDDLE: null,
			RIGHT: null
		}, this.touches = {
			ONE: null,
			TWO: null
		};
	}
	connect(w) {
		if (w === void 0) {
			warn("Controls: connect() now requires an element.");
			return;
		}
		this.domElement !== null && this.disconnect(), this.domElement = w;
	}
	disconnect() {}
	dispose() {}
	update() {}
};
function getByteLength(w, T, O, j) {
	let F = getTextureTypeByteLength(j);
	switch (O) {
		case AlphaFormat: return w * T;
		case RedFormat: return w * T / F.components * F.byteLength;
		case RedIntegerFormat: return w * T / F.components * F.byteLength;
		case RGFormat: return w * T * 2 / F.components * F.byteLength;
		case RGIntegerFormat: return w * T * 2 / F.components * F.byteLength;
		case RGBFormat: return w * T * 3 / F.components * F.byteLength;
		case RGBAFormat: return w * T * 4 / F.components * F.byteLength;
		case RGBAIntegerFormat: return w * T * 4 / F.components * F.byteLength;
		case RGB_S3TC_DXT1_Format:
		case RGBA_S3TC_DXT1_Format: return Math.floor((w + 3) / 4) * Math.floor((T + 3) / 4) * 8;
		case RGBA_S3TC_DXT3_Format:
		case RGBA_S3TC_DXT5_Format: return Math.floor((w + 3) / 4) * Math.floor((T + 3) / 4) * 16;
		case RGB_PVRTC_2BPPV1_Format:
		case RGBA_PVRTC_2BPPV1_Format: return Math.max(w, 16) * Math.max(T, 8) / 4;
		case RGB_PVRTC_4BPPV1_Format:
		case RGBA_PVRTC_4BPPV1_Format: return Math.max(w, 8) * Math.max(T, 8) / 2;
		case RGB_ETC1_Format:
		case RGB_ETC2_Format:
		case R11_EAC_Format:
		case SIGNED_R11_EAC_Format: return Math.floor((w + 3) / 4) * Math.floor((T + 3) / 4) * 8;
		case RGBA_ETC2_EAC_Format:
		case RG11_EAC_Format:
		case SIGNED_RG11_EAC_Format: return Math.floor((w + 3) / 4) * Math.floor((T + 3) / 4) * 16;
		case RGBA_ASTC_4x4_Format: return Math.floor((w + 3) / 4) * Math.floor((T + 3) / 4) * 16;
		case RGBA_ASTC_5x4_Format: return Math.floor((w + 4) / 5) * Math.floor((T + 3) / 4) * 16;
		case RGBA_ASTC_5x5_Format: return Math.floor((w + 4) / 5) * Math.floor((T + 4) / 5) * 16;
		case RGBA_ASTC_6x5_Format: return Math.floor((w + 5) / 6) * Math.floor((T + 4) / 5) * 16;
		case RGBA_ASTC_6x6_Format: return Math.floor((w + 5) / 6) * Math.floor((T + 5) / 6) * 16;
		case RGBA_ASTC_8x5_Format: return Math.floor((w + 7) / 8) * Math.floor((T + 4) / 5) * 16;
		case RGBA_ASTC_8x6_Format: return Math.floor((w + 7) / 8) * Math.floor((T + 5) / 6) * 16;
		case RGBA_ASTC_8x8_Format: return Math.floor((w + 7) / 8) * Math.floor((T + 7) / 8) * 16;
		case RGBA_ASTC_10x5_Format: return Math.floor((w + 9) / 10) * Math.floor((T + 4) / 5) * 16;
		case RGBA_ASTC_10x6_Format: return Math.floor((w + 9) / 10) * Math.floor((T + 5) / 6) * 16;
		case RGBA_ASTC_10x8_Format: return Math.floor((w + 9) / 10) * Math.floor((T + 7) / 8) * 16;
		case RGBA_ASTC_10x10_Format: return Math.floor((w + 9) / 10) * Math.floor((T + 9) / 10) * 16;
		case RGBA_ASTC_12x10_Format: return Math.floor((w + 11) / 12) * Math.floor((T + 9) / 10) * 16;
		case RGBA_ASTC_12x12_Format: return Math.floor((w + 11) / 12) * Math.floor((T + 11) / 12) * 16;
		case RGBA_BPTC_Format:
		case RGB_BPTC_SIGNED_Format:
		case RGB_BPTC_UNSIGNED_Format: return Math.ceil(w / 4) * Math.ceil(T / 4) * 16;
		case RED_RGTC1_Format:
		case SIGNED_RED_RGTC1_Format: return Math.ceil(w / 4) * Math.ceil(T / 4) * 8;
		case RED_GREEN_RGTC2_Format:
		case SIGNED_RED_GREEN_RGTC2_Format: return Math.ceil(w / 4) * Math.ceil(T / 4) * 16;
	}
	throw Error(`Unable to determine texture byte length for ${O} format.`);
}
function getTextureTypeByteLength(w) {
	switch (w) {
		case UnsignedByteType:
		case ByteType: return {
			byteLength: 1,
			components: 1
		};
		case UnsignedShortType:
		case ShortType:
		case HalfFloatType: return {
			byteLength: 2,
			components: 1
		};
		case UnsignedShort4444Type:
		case UnsignedShort5551Type: return {
			byteLength: 2,
			components: 4
		};
		case UnsignedIntType:
		case IntType:
		case FloatType: return {
			byteLength: 4,
			components: 1
		};
		case UnsignedInt5999Type:
		case UnsignedInt101111Type: return {
			byteLength: 4,
			components: 3
		};
	}
	throw Error(`Unknown texture type ${w}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "182" } })), typeof window < "u" && (window.__THREE__ ? warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "182");
/**
* @license
* Copyright 2010-2025 Three.js Authors
* SPDX-License-Identifier: MIT
*/
function WebGLAnimation() {
	let w = null, T = !1, O = null, j = null;
	function F(T, U) {
		O(T, U), j = w.requestAnimationFrame(F);
	}
	return {
		start: function() {
			T !== !0 && O !== null && (j = w.requestAnimationFrame(F), T = !0);
		},
		stop: function() {
			w.cancelAnimationFrame(j), T = !1;
		},
		setAnimationLoop: function(w) {
			O = w;
		},
		setContext: function(T) {
			w = T;
		}
	};
}
function WebGLAttributes(w) {
	let T = /* @__PURE__ */ new WeakMap();
	function O(T, O) {
		let j = T.array, F = T.usage, U = j.byteLength, W = w.createBuffer();
		w.bindBuffer(O, W), w.bufferData(O, j, F), T.onUploadCallback();
		let G;
		if (j instanceof Float32Array) G = w.FLOAT;
		else if (typeof Float16Array < "u" && j instanceof Float16Array) G = w.HALF_FLOAT;
		else if (j instanceof Uint16Array) G = T.isFloat16BufferAttribute ? w.HALF_FLOAT : w.UNSIGNED_SHORT;
		else if (j instanceof Int16Array) G = w.SHORT;
		else if (j instanceof Uint32Array) G = w.UNSIGNED_INT;
		else if (j instanceof Int32Array) G = w.INT;
		else if (j instanceof Int8Array) G = w.BYTE;
		else if (j instanceof Uint8Array) G = w.UNSIGNED_BYTE;
		else if (j instanceof Uint8ClampedArray) G = w.UNSIGNED_BYTE;
		else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: " + j);
		return {
			buffer: W,
			type: G,
			bytesPerElement: j.BYTES_PER_ELEMENT,
			version: T.version,
			size: U
		};
	}
	function j(T, O, j) {
		let F = O.array, U = O.updateRanges;
		if (w.bindBuffer(j, T), U.length === 0) w.bufferSubData(j, 0, F);
		else {
			U.sort((w, T) => w.start - T.start);
			let T = 0;
			for (let w = 1; w < U.length; w++) {
				let O = U[T], j = U[w];
				j.start <= O.start + O.count + 1 ? O.count = Math.max(O.count, j.start + j.count - O.start) : (++T, U[T] = j);
			}
			U.length = T + 1;
			for (let T = 0, O = U.length; T < O; T++) {
				let O = U[T];
				w.bufferSubData(j, O.start * F.BYTES_PER_ELEMENT, F, O.start, O.count);
			}
			O.clearUpdateRanges();
		}
		O.onUploadCallback();
	}
	function F(w) {
		return w.isInterleavedBufferAttribute && (w = w.data), T.get(w);
	}
	function U(O) {
		O.isInterleavedBufferAttribute && (O = O.data);
		let j = T.get(O);
		j && (w.deleteBuffer(j.buffer), T.delete(O));
	}
	function W(w, F) {
		if (w.isInterleavedBufferAttribute && (w = w.data), w.isGLBufferAttribute) {
			let O = T.get(w);
			(!O || O.version < w.version) && T.set(w, {
				buffer: w.buffer,
				type: w.type,
				bytesPerElement: w.elementSize,
				version: w.version
			});
			return;
		}
		let U = T.get(w);
		if (U === void 0) T.set(w, O(w, F));
		else if (U.version < w.version) {
			if (U.size !== w.array.byteLength) throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
			j(U.buffer, w, F), U.version = w.version;
		}
	}
	return {
		get: F,
		remove: U,
		update: W
	};
}
var ShaderChunk = {
	alphahash_fragment: "#ifdef USE_ALPHAHASH\n	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif",
	alphahash_pars_fragment: "#ifdef USE_ALPHAHASH\n	const float ALPHA_HASH_SCALE = 0.05;\n	float hash2D( vec2 value ) {\n		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n	}\n	float hash3D( vec3 value ) {\n		return hash2D( vec2( hash2D( value.xy ), value.z ) );\n	}\n	float getAlphaHashThreshold( vec3 position ) {\n		float maxDeriv = max(\n			length( dFdx( position.xyz ) ),\n			length( dFdy( position.xyz ) )\n		);\n		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n		vec2 pixScales = vec2(\n			exp2( floor( log2( pixScale ) ) ),\n			exp2( ceil( log2( pixScale ) ) )\n		);\n		vec2 alpha = vec2(\n			hash3D( floor( pixScales.x * position.xyz ) ),\n			hash3D( floor( pixScales.y * position.xyz ) )\n		);\n		float lerpFactor = fract( log2( pixScale ) );\n		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n		float a = min( lerpFactor, 1.0 - lerpFactor );\n		vec3 cases = vec3(\n			x * x / ( 2.0 * a * ( 1.0 - a ) ),\n			( x - 0.5 * a ) / ( 1.0 - a ),\n			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n		);\n		float threshold = ( x < ( 1.0 - a ) )\n			? ( ( x < a ) ? cases.x : cases.y )\n			: cases.z;\n		return clamp( threshold , 1.0e-6, 1.0 );\n	}\n#endif",
	alphamap_fragment: "#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif",
	alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",
	alphatest_fragment: "#ifdef USE_ALPHATEST\n	#ifdef ALPHA_TO_COVERAGE\n	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n	if ( diffuseColor.a == 0.0 ) discard;\n	#else\n	if ( diffuseColor.a < alphaTest ) discard;\n	#endif\n#endif",
	alphatest_pars_fragment: "#ifdef USE_ALPHATEST\n	uniform float alphaTest;\n#endif",
	aomap_fragment: "#ifdef USE_AOMAP\n	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n	reflectedLight.indirectDiffuse *= ambientOcclusion;\n	#if defined( USE_CLEARCOAT ) \n		clearcoatSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_SHEEN ) \n		sheenSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD )\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n	#endif\n#endif",
	aomap_pars_fragment: "#ifdef USE_AOMAP\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n#endif",
	batching_pars_vertex: "#ifdef USE_BATCHING\n	#if ! defined( GL_ANGLE_multi_draw )\n	#define gl_DrawID _gl_DrawID\n	uniform int _gl_DrawID;\n	#endif\n	uniform highp sampler2D batchingTexture;\n	uniform highp usampler2D batchingIdTexture;\n	mat4 getBatchingMatrix( const in float i ) {\n		int size = textureSize( batchingTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n	float getIndirectIndex( const in int i ) {\n		int size = textureSize( batchingIdTexture, 0 ).x;\n		int x = i % size;\n		int y = i / size;\n		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n	}\n#endif\n#ifdef USE_BATCHING_COLOR\n	uniform sampler2D batchingColorTexture;\n	vec3 getBatchingColor( const in float i ) {\n		int size = textureSize( batchingColorTexture, 0 ).x;\n		int j = int( i );\n		int x = j % size;\n		int y = j / size;\n		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;\n	}\n#endif",
	batching_vertex: "#ifdef USE_BATCHING\n	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif",
	begin_vertex: "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n	vPosition = vec3( position );\n#endif",
	beginnormal_vertex: "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n	vec3 objectTangent = vec3( tangent.xyz );\n#endif",
	bsdfs: "float G_BlinnPhong_Implicit( ) {\n	return 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( specularColor, 1.0, dotVH );\n	float G = G_BlinnPhong_Implicit( );\n	float D = D_BlinnPhong( shininess, dotNH );\n	return F * ( G * D );\n} // validated",
	iridescence_fragment: "#ifdef USE_IRIDESCENCE\n	const mat3 XYZ_TO_REC709 = mat3(\n		 3.2404542, -0.9692660,  0.0556434,\n		-1.5371385,  1.8760108, -0.2040259,\n		-0.4985314,  0.0415560,  1.0572252\n	);\n	vec3 Fresnel0ToIor( vec3 fresnel0 ) {\n		vec3 sqrtF0 = sqrt( fresnel0 );\n		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n	}\n	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n	}\n	float IorToFresnel0( float transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n	}\n	vec3 evalSensitivity( float OPD, vec3 shift ) {\n		float phase = 2.0 * PI * OPD * 1.0e-9;\n		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n		xyz /= 1.0685e-7;\n		vec3 rgb = XYZ_TO_REC709 * xyz;\n		return rgb;\n	}\n	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n		vec3 I;\n		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n		float cosTheta2Sq = 1.0 - sinTheta2Sq;\n		if ( cosTheta2Sq < 0.0 ) {\n			return vec3( 1.0 );\n		}\n		float cosTheta2 = sqrt( cosTheta2Sq );\n		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n		float R12 = F_Schlick( R0, 1.0, cosTheta1 );\n		float T121 = 1.0 - R12;\n		float phi12 = 0.0;\n		if ( iridescenceIOR < outsideIOR ) phi12 = PI;\n		float phi21 = PI - phi12;\n		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n		vec3 phi23 = vec3( 0.0 );\n		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n		vec3 phi = vec3( phi21 ) + phi23;\n		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n		vec3 r123 = sqrt( R123 );\n		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n		vec3 C0 = R12 + Rs;\n		I = C0;\n		vec3 Cm = Rs - T121;\n		for ( int m = 1; m <= 2; ++ m ) {\n			Cm *= r123;\n			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n			I += Cm * Sm;\n		}\n		return max( I, vec3( 0.0 ) );\n	}\n#endif",
	bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vBumpMapUv );\n		vec2 dSTdy = dFdy( vBumpMapUv );\n		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 ) * faceDirection;\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif",
	clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n	vec4 plane;\n	#ifdef ALPHA_TO_COVERAGE\n		float distanceToPlane, distanceGradient;\n		float clipOpacity = 1.0;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n			distanceGradient = fwidth( distanceToPlane ) / 2.0;\n			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			if ( clipOpacity == 0.0 ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			float unionClipOpacity = 1.0;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n				distanceGradient = fwidth( distanceToPlane ) / 2.0;\n				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			}\n			#pragma unroll_loop_end\n			clipOpacity *= 1.0 - unionClipOpacity;\n		#endif\n		diffuseColor.a *= clipOpacity;\n		if ( diffuseColor.a == 0.0 ) discard;\n	#else\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			bool clipped = true;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n			}\n			#pragma unroll_loop_end\n			if ( clipped ) discard;\n		#endif\n	#endif\n#endif",
	clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
	clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n#endif",
	clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0\n	vClipPosition = - mvPosition.xyz;\n#endif",
	color_fragment: "#if defined( USE_COLOR_ALPHA )\n	diffuseColor *= vColor;\n#elif defined( USE_COLOR )\n	diffuseColor.rgb *= vColor;\n#endif",
	color_pars_fragment: "#if defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#elif defined( USE_COLOR )\n	varying vec3 vColor;\n#endif",
	color_pars_vertex: "#if defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	varying vec3 vColor;\n#endif",
	color_vertex: "#if defined( USE_COLOR_ALPHA )\n	vColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	vColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n	vColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n	vColor.xyz *= instanceColor.xyz;\n#endif\n#ifdef USE_BATCHING_COLOR\n	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );\n	vColor.xyz *= batchingColor.xyz;\n#endif",
	common: "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n	const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n	return fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n	float precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n	float precisionSafeLength( vec3 v ) {\n		float maxComponent = max3( abs( v ) );\n		return length( v / maxComponent ) * maxComponent;\n	}\n#endif\nstruct IncidentLight {\n	vec3 color;\n	vec3 direction;\n	bool visible;\n};\nstruct ReflectedLight {\n	vec3 directDiffuse;\n	vec3 directSpecular;\n	vec3 indirectDiffuse;\n	vec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n	varying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n	return m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n	return vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n	return RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated",
	cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n	#define cubeUV_minMipLevel 4.0\n	#define cubeUV_minTileSize 16.0\n	float getFace( vec3 direction ) {\n		vec3 absDirection = abs( direction );\n		float face = - 1.0;\n		if ( absDirection.x > absDirection.z ) {\n			if ( absDirection.x > absDirection.y )\n				face = direction.x > 0.0 ? 0.0 : 3.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		} else {\n			if ( absDirection.z > absDirection.y )\n				face = direction.z > 0.0 ? 2.0 : 5.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		}\n		return face;\n	}\n	vec2 getUV( vec3 direction, float face ) {\n		vec2 uv;\n		if ( face == 0.0 ) {\n			uv = vec2( direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 1.0 ) {\n			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n		} else if ( face == 2.0 ) {\n			uv = vec2( - direction.x, direction.y ) / abs( direction.z );\n		} else if ( face == 3.0 ) {\n			uv = vec2( - direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 4.0 ) {\n			uv = vec2( - direction.x, direction.z ) / abs( direction.y );\n		} else {\n			uv = vec2( direction.x, direction.y ) / abs( direction.z );\n		}\n		return 0.5 * ( uv + 1.0 );\n	}\n	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n		float face = getFace( direction );\n		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n		mipInt = max( mipInt, cubeUV_minMipLevel );\n		float faceSize = exp2( mipInt );\n		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n		if ( face > 2.0 ) {\n			uv.y += faceSize;\n			face -= 3.0;\n		}\n		uv.x += face * faceSize;\n		uv.x += filterInt * 3.0 * cubeUV_minTileSize;\n		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n		uv.x *= CUBEUV_TEXEL_WIDTH;\n		uv.y *= CUBEUV_TEXEL_HEIGHT;\n		#ifdef texture2DGradEXT\n			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n		#else\n			return texture2D( envMap, uv ).rgb;\n		#endif\n	}\n	#define cubeUV_r0 1.0\n	#define cubeUV_m0 - 2.0\n	#define cubeUV_r1 0.8\n	#define cubeUV_m1 - 1.0\n	#define cubeUV_r4 0.4\n	#define cubeUV_m4 2.0\n	#define cubeUV_r5 0.305\n	#define cubeUV_m5 3.0\n	#define cubeUV_r6 0.21\n	#define cubeUV_m6 4.0\n	float roughnessToMip( float roughness ) {\n		float mip = 0.0;\n		if ( roughness >= cubeUV_r1 ) {\n			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n		} else if ( roughness >= cubeUV_r4 ) {\n			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n		} else if ( roughness >= cubeUV_r5 ) {\n			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n		} else if ( roughness >= cubeUV_r6 ) {\n			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n		} else {\n			mip = - 2.0 * log2( 1.16 * roughness );		}\n		return mip;\n	}\n	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n		float mipF = fract( mip );\n		float mipInt = floor( mip );\n		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n		if ( mipF == 0.0 ) {\n			return vec4( color0, 1.0 );\n		} else {\n			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n			return vec4( mix( color0, color1, mipF ), 1.0 );\n		}\n	}\n#endif",
	defaultnormal_vertex: "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n	vec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n	mat3 bm = mat3( batchingMatrix );\n	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n	transformedNormal = bm * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = bm * transformedTangent;\n	#endif\n#endif\n#ifdef USE_INSTANCING\n	mat3 im = mat3( instanceMatrix );\n	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n	transformedNormal = im * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = im * transformedTangent;\n	#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n	transformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n	#ifdef FLIP_SIDED\n		transformedTangent = - transformedTangent;\n	#endif\n#endif",
	displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n#endif",
	displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif",
	emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n		emissiveColor = sRGBTransferEOTF( emissiveColor );\n	#endif\n	totalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
	emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n	uniform sampler2D emissiveMap;\n#endif",
	colorspace_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
	colorspace_pars_fragment: "vec4 LinearTransferOETF( in vec4 value ) {\n	return value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}",
	envmap_fragment: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vec3 cameraToFrag;\n		if ( isOrthographic ) {\n			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToFrag = normalize( vWorldPosition - cameraPosition );\n		}\n		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( cameraToFrag, worldNormal );\n		#else\n			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n		#endif\n	#else\n		vec3 reflectVec = vReflect;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n	#else\n		vec4 envColor = vec4( 0.0 );\n	#endif\n	#ifdef ENVMAP_BLENDING_MULTIPLY\n		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n	#elif defined( ENVMAP_BLENDING_MIX )\n		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n	#elif defined( ENVMAP_BLENDING_ADD )\n		outgoingLight += envColor.xyz * specularStrength * reflectivity;\n	#endif\n#endif",
	envmap_common_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float envMapIntensity;\n	uniform float flipEnvMap;\n	uniform mat3 envMapRotation;\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n#endif",
	envmap_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float reflectivity;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		varying vec3 vWorldPosition;\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif",
	envmap_pars_vertex: "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		\n		varying vec3 vWorldPosition;\n	#else\n		varying vec3 vReflect;\n		uniform float refractionRatio;\n	#endif\n#endif",
	envmap_physical_pars_fragment: "#ifdef USE_ENVMAP\n	vec3 getIBLIrradiance( const in vec3 normal ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );\n			return PI * envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 reflectVec = reflect( - viewDir, normal );\n			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );\n			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );\n			return envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	#ifdef USE_ANISOTROPY\n		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n			#ifdef ENVMAP_TYPE_CUBE_UV\n				vec3 bentNormal = cross( bitangent, viewDir );\n				bentNormal = normalize( cross( bentNormal, bitangent ) );\n				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n				return getIBLRadiance( viewDir, bentNormal, roughness );\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n	#endif\n#endif",
	envmap_vertex: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vWorldPosition = worldPosition.xyz;\n	#else\n		vec3 cameraToVertex;\n		if ( isOrthographic ) {\n			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n		}\n		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vReflect = reflect( cameraToVertex, worldNormal );\n		#else\n			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#endif\n#endif",
	fog_vertex: "#ifdef USE_FOG\n	vFogDepth = - mvPosition.z;\n#endif",
	fog_pars_vertex: "#ifdef USE_FOG\n	varying float vFogDepth;\n#endif",
	fog_fragment: "#ifdef USE_FOG\n	#ifdef FOG_EXP2\n		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n	#endif\n	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
	fog_pars_fragment: "#ifdef USE_FOG\n	uniform vec3 fogColor;\n	varying float vFogDepth;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif",
	gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\n	uniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n	float dotNL = dot( normal, lightDirection );\n	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n	#ifdef USE_GRADIENTMAP\n		return vec3( texture2D( gradientMap, coord ).r );\n	#else\n		vec2 fw = fwidth( coord ) * 0.5;\n		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n	#endif\n}",
	lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n#endif",
	lights_lambert_fragment: "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;",
	lights_lambert_pars_fragment: "varying vec3 vViewPosition;\nstruct LambertMaterial {\n	vec3 diffuseColor;\n	float specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Lambert\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert",
	lights_pars_begin: "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n	uniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n	float x = normal.x, y = normal.y, z = normal.z;\n	vec3 result = shCoefficients[ 0 ] * 0.886227;\n	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n	return result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n	return irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n	vec3 irradiance = ambientLightColor;\n	return irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n	if ( cutoffDistance > 0.0 ) {\n		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n	}\n	return distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n	return smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n	struct DirectionalLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n		light.color = directionalLight.color;\n		light.direction = directionalLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_POINT_LIGHTS > 0\n	struct PointLight {\n		vec3 position;\n		vec3 color;\n		float distance;\n		float decay;\n	};\n	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = pointLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		light.color = pointLight.color;\n		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n		light.visible = ( light.color != vec3( 0.0 ) );\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	struct SpotLight {\n		vec3 position;\n		vec3 direction;\n		vec3 color;\n		float distance;\n		float decay;\n		float coneCos;\n		float penumbraCos;\n	};\n	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = spotLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float angleCos = dot( light.direction, spotLight.direction );\n		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n		if ( spotAttenuation > 0.0 ) {\n			float lightDistance = length( lVector );\n			light.color = spotLight.color * spotAttenuation;\n			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n			light.visible = ( light.color != vec3( 0.0 ) );\n		} else {\n			light.color = vec3( 0.0 );\n			light.visible = false;\n		}\n	}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n	struct RectAreaLight {\n		vec3 color;\n		vec3 position;\n		vec3 halfWidth;\n		vec3 halfHeight;\n	};\n	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;\n	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	struct HemisphereLight {\n		vec3 direction;\n		vec3 skyColor;\n		vec3 groundColor;\n	};\n	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n		float dotNL = dot( normal, hemiLight.direction );\n		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n		return irradiance;\n	}\n#endif",
	lights_toon_fragment: "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",
	lights_toon_pars_fragment: "varying vec3 vViewPosition;\nstruct ToonMaterial {\n	vec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Toon\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon",
	lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
	lights_phong_pars_fragment: "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n	vec3 diffuseColor;\n	vec3 specularColor;\n	float specularShininess;\n	float specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong",
	lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.metalness = metalnessFactor;\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n	material.ior = ior;\n	#ifdef USE_SPECULAR\n		float specularIntensityFactor = specularIntensity;\n		vec3 specularColorFactor = specularColor;\n		#ifdef USE_SPECULAR_COLORMAP\n			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n		#endif\n		#ifdef USE_SPECULAR_INTENSITYMAP\n			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n		#endif\n		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n	#else\n		float specularIntensityFactor = 1.0;\n		vec3 specularColorFactor = vec3( 1.0 );\n		material.specularF90 = 1.0;\n	#endif\n	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n#else\n	material.specularColor = vec3( 0.04 );\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n	material.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n	material.clearcoat = clearcoat;\n	material.clearcoatRoughness = clearcoatRoughness;\n	material.clearcoatF0 = vec3( 0.04 );\n	material.clearcoatF90 = 1.0;\n	#ifdef USE_CLEARCOATMAP\n		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n	#endif\n	#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n	#endif\n	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n	material.clearcoatRoughness += geometryRoughness;\n	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n	material.dispersion = dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n	material.iridescence = iridescence;\n	material.iridescenceIOR = iridescenceIOR;\n	#ifdef USE_IRIDESCENCEMAP\n		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n	#endif\n	#ifdef USE_IRIDESCENCE_THICKNESSMAP\n		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n	#else\n		material.iridescenceThickness = iridescenceThicknessMaximum;\n	#endif\n#endif\n#ifdef USE_SHEEN\n	material.sheenColor = sheenColor;\n	#ifdef USE_SHEEN_COLORMAP\n		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n	#endif\n	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	#ifdef USE_ANISOTROPYMAP\n		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n	#else\n		vec2 anisotropyV = anisotropyVector;\n	#endif\n	material.anisotropy = length( anisotropyV );\n	if( material.anisotropy == 0.0 ) {\n		anisotropyV = vec2( 1.0, 0.0 );\n	} else {\n		anisotropyV /= material.anisotropy;\n		material.anisotropy = saturate( material.anisotropy );\n	}\n	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif",
	lights_physical_pars_fragment: "uniform sampler2D dfgLUT;\nstruct PhysicalMaterial {\n	vec3 diffuseColor;\n	vec3 diffuseContribution;\n	vec3 specularColor;\n	vec3 specularColorBlended;\n	float roughness;\n	float metalness;\n	float specularF90;\n	float dispersion;\n	#ifdef USE_CLEARCOAT\n		float clearcoat;\n		float clearcoatRoughness;\n		vec3 clearcoatF0;\n		float clearcoatF90;\n	#endif\n	#ifdef USE_IRIDESCENCE\n		float iridescence;\n		float iridescenceIOR;\n		float iridescenceThickness;\n		vec3 iridescenceFresnel;\n		vec3 iridescenceF0;\n		vec3 iridescenceFresnelDielectric;\n		vec3 iridescenceFresnelMetallic;\n	#endif\n	#ifdef USE_SHEEN\n		vec3 sheenColor;\n		float sheenRoughness;\n	#endif\n	#ifdef IOR\n		float ior;\n	#endif\n	#ifdef USE_TRANSMISSION\n		float transmission;\n		float transmissionAlpha;\n		float thickness;\n		float attenuationDistance;\n		vec3 attenuationColor;\n	#endif\n	#ifdef USE_ANISOTROPY\n		float anisotropy;\n		float alphaT;\n		vec3 anisotropyT;\n		vec3 anisotropyB;\n	#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	return 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n	float a2 = pow2( alpha );\n	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n	return RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n		float v = 0.5 / ( gv + gl );\n		return v;\n	}\n	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n		float a2 = alphaT * alphaB;\n		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n		highp float v2 = dot( v, v );\n		float w2 = a2 / v2;\n		return RECIPROCAL_PI * a2 * pow2 ( w2 );\n	}\n#endif\n#ifdef USE_CLEARCOAT\n	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n		vec3 f0 = material.clearcoatF0;\n		float f90 = material.clearcoatF90;\n		float roughness = material.clearcoatRoughness;\n		float alpha = pow2( roughness );\n		vec3 halfDir = normalize( lightDir + viewDir );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float dotNH = saturate( dot( normal, halfDir ) );\n		float dotVH = saturate( dot( viewDir, halfDir ) );\n		vec3 F = F_Schlick( f0, f90, dotVH );\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n		return F * ( V * D );\n	}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 f0 = material.specularColorBlended;\n	float f90 = material.specularF90;\n	float roughness = material.roughness;\n	float alpha = pow2( roughness );\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( f0, f90, dotVH );\n	#ifdef USE_IRIDESCENCE\n		F = mix( F, material.iridescenceFresnel, material.iridescence );\n	#endif\n	#ifdef USE_ANISOTROPY\n		float dotTL = dot( material.anisotropyT, lightDir );\n		float dotTV = dot( material.anisotropyT, viewDir );\n		float dotTH = dot( material.anisotropyT, halfDir );\n		float dotBL = dot( material.anisotropyB, lightDir );\n		float dotBV = dot( material.anisotropyB, viewDir );\n		float dotBH = dot( material.anisotropyB, halfDir );\n		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n	#else\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n	#endif\n	return F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n	const float LUT_SIZE = 64.0;\n	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n	const float LUT_BIAS = 0.5 / LUT_SIZE;\n	float dotNV = saturate( dot( N, V ) );\n	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n	uv = uv * LUT_SCALE + LUT_BIAS;\n	return uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n	float l = length( f );\n	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n	float x = dot( v1, v2 );\n	float y = abs( x );\n	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n	float b = 3.4175940 + ( 4.1616724 + y ) * y;\n	float v = a / b;\n	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n	return cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n	vec3 lightNormal = cross( v1, v2 );\n	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n	vec3 T1, T2;\n	T1 = normalize( V - N * dot( V, N ) );\n	T2 = - cross( N, T1 );\n	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );\n	vec3 coords[ 4 ];\n	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n	coords[ 0 ] = normalize( coords[ 0 ] );\n	coords[ 1 ] = normalize( coords[ 1 ] );\n	coords[ 2 ] = normalize( coords[ 2 ] );\n	coords[ 3 ] = normalize( coords[ 3 ] );\n	vec3 vectorFormFactor = vec3( 0.0 );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n	return vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n	float alpha = pow2( roughness );\n	float invAlpha = 1.0 / alpha;\n	float cos2h = dotNH * dotNH;\n	float sin2h = max( 1.0 - cos2h, 0.0078125 );\n	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float D = D_Charlie( sheenRoughness, dotNH );\n	float V = V_Neubelt( dotNV, dotNL );\n	return sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float r2 = roughness * roughness;\n	float rInv = 1.0 / ( roughness + 0.1 );\n	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;\n	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;\n	float DG = exp( a * dotNV + b );\n	return saturate( DG );\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n	return specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n	#ifdef USE_IRIDESCENCE\n		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n	#else\n		vec3 Fr = specularColor;\n	#endif\n	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n	float Ess = fab.x + fab.y;\n	float Ems = 1.0 - Ess;\n	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n	singleScatter += FssEss;\n	multiScatter += Fms * Ems;\n}\nvec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;\n	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;\n	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;\n	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;\n	float Ess_V = dfgV.x + dfgV.y;\n	float Ess_L = dfgL.x + dfgL.y;\n	float Ems_V = 1.0 - Ess_V;\n	float Ems_L = 1.0 - Ess_L;\n	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;\n	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );\n	float compensationFactor = Ems_V * Ems_L;\n	vec3 multiScatter = Fms * compensationFactor;\n	return singleScatter + multiScatter;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n		vec3 normal = geometryNormal;\n		vec3 viewDir = geometryViewDir;\n		vec3 position = geometryPosition;\n		vec3 lightPos = rectAreaLight.position;\n		vec3 halfWidth = rectAreaLight.halfWidth;\n		vec3 halfHeight = rectAreaLight.halfHeight;\n		vec3 lightColor = rectAreaLight.color;\n		float roughness = material.roughness;\n		vec3 rectCoords[ 4 ];\n		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n		vec2 uv = LTC_Uv( normal, viewDir, roughness );\n		vec4 t1 = texture2D( ltc_1, uv );\n		vec4 t2 = texture2D( ltc_2, uv );\n		mat3 mInv = mat3(\n			vec3( t1.x, 0, t1.y ),\n			vec3(    0, 1,    0 ),\n			vec3( t1.z, 0, t1.w )\n		);\n		vec3 fresnel = ( material.specularColorBlended * t2.x + ( vec3( 1.0 ) - material.specularColorBlended ) * t2.y );\n		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n	}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifdef USE_CLEARCOAT\n		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n		vec3 ccIrradiance = dotNLcc * directLight.color;\n		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n	#endif\n	#ifdef USE_SHEEN\n \n 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n \n 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );\n \n 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );\n \n 		irradiance *= sheenEnergyComp;\n \n 	#endif\n	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		diffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectDiffuse += diffuse;\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n	#ifdef USE_CLEARCOAT\n		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;\n 	#endif\n	vec3 singleScatteringDielectric = vec3( 0.0 );\n	vec3 multiScatteringDielectric = vec3( 0.0 );\n	vec3 singleScatteringMetallic = vec3( 0.0 );\n	vec3 multiScatteringMetallic = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );\n	#else\n		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );\n	#endif\n	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );\n	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );\n	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;\n	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );\n	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n	vec3 indirectSpecular = radiance * singleScattering;\n	indirectSpecular += multiScattering * cosineWeightedIrradiance;\n	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		indirectSpecular *= sheenEnergyComp;\n		indirectDiffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectSpecular += indirectSpecular;\n	reflectedLight.indirectDiffuse += indirectDiffuse;\n}\n#define RE_Direct				RE_Direct_Physical\n#define RE_Direct_RectArea		RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular		RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
	lights_fragment_begin: "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n	geometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n	float dotNVi = saturate( dot( normal, geometryViewDir ) );\n	if ( material.iridescenceThickness == 0.0 ) {\n		material.iridescence = 0.0;\n	} else {\n		material.iridescence = saturate( material.iridescence );\n	}\n	if ( material.iridescence > 0.0 ) {\n		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );\n		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );\n		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n	}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n	PointLight pointLight;\n	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		getPointLightInfo( pointLight, geometryPosition, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n		pointLightShadow = pointLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n	SpotLight spotLight;\n	vec4 spotColor;\n	vec3 spotLightCoord;\n	bool inSpotLightMap;\n	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		getSpotLightInfo( spotLight, geometryPosition, directLight );\n		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n		#else\n		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#endif\n		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n		#endif\n		#undef SPOT_LIGHT_MAP_INDEX\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		spotLightShadow = spotLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n	DirectionalLight directionalLight;\n	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		getDirectionalLightInfo( directionalLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n		directionalLightShadow = directionalLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n	RectAreaLight rectAreaLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n		rectAreaLight = rectAreaLights[ i ];\n		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n	vec3 iblIrradiance = vec3( 0.0 );\n	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n	#if defined( USE_LIGHT_PROBES )\n		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n	#endif\n	#if ( NUM_HEMI_LIGHTS > 0 )\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if defined( RE_IndirectSpecular )\n	vec3 radiance = vec3( 0.0 );\n	vec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
	lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n		irradiance += lightMapIrradiance;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n		iblIrradiance += getIBLIrradiance( geometryNormal );\n	#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n	#ifdef USE_ANISOTROPY\n		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n	#else\n		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n	#endif\n	#ifdef USE_CLEARCOAT\n		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n	#endif\n#endif",
	lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif",
	logdepthbuf_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
	logdepthbuf_pars_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	uniform float logDepthBufFC;\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",
	logdepthbuf_pars_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",
	logdepthbuf_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	vFragDepth = 1.0 + gl_Position.w;\n	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif",
	map_fragment: "#ifdef USE_MAP\n	vec4 sampledDiffuseColor = texture2D( map, vMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n	#endif\n	diffuseColor *= sampledDiffuseColor;\n#endif",
	map_pars_fragment: "#ifdef USE_MAP\n	uniform sampler2D map;\n#endif",
	map_particle_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n	#if defined( USE_POINTS_UV )\n		vec2 uv = vUv;\n	#else\n		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n	#endif\n#endif\n#ifdef USE_MAP\n	diffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
	map_particle_pars_fragment: "#if defined( USE_POINTS_UV )\n	varying vec2 vUv;\n#else\n	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n		uniform mat3 uvTransform;\n	#endif\n#endif\n#ifdef USE_MAP\n	uniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",
	metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n	metalnessFactor *= texelMetalness.b;\n#endif",
	metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n	uniform sampler2D metalnessMap;\n#endif",
	morphinstance_vertex: "#ifdef USE_INSTANCING_MORPH\n	float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n	}\n#endif",
	morphcolor_vertex: "#if defined( USE_MORPHCOLORS )\n	vColor *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		#if defined( USE_COLOR_ALPHA )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n		#elif defined( USE_COLOR )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n		#endif\n	}\n#endif",
	morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n	objectNormal *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif",
	morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n	#ifndef USE_INSTANCING_MORPH\n		uniform float morphTargetBaseInfluence;\n		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	#endif\n	uniform sampler2DArray morphTargetsTexture;\n	uniform ivec2 morphTargetsTextureSize;\n	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n		int y = texelIndex / morphTargetsTextureSize.x;\n		int x = texelIndex - y * morphTargetsTextureSize.x;\n		ivec3 morphUV = ivec3( x, y, morphTargetIndex );\n		return texelFetch( morphTargetsTexture, morphUV, 0 );\n	}\n#endif",
	morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n	transformed *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif",
	normal_fragment_begin: "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n#else\n	vec3 normal = normalize( vNormal );\n	#ifdef DOUBLE_SIDED\n		normal *= faceDirection;\n	#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n	#ifdef USE_TANGENT\n		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn = getTangentFrame( - vViewPosition, normal,\n		#if defined( USE_NORMALMAP )\n			vNormalMapUv\n		#elif defined( USE_CLEARCOAT_NORMALMAP )\n			vClearcoatNormalMapUv\n		#else\n			vUv\n		#endif\n		);\n	#endif\n	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n		tbn[0] *= faceDirection;\n		tbn[1] *= faceDirection;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	#ifdef USE_TANGENT\n		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n	#endif\n	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n		tbn2[0] *= faceDirection;\n		tbn2[1] *= faceDirection;\n	#endif\n#endif\nvec3 nonPerturbedNormal = normal;",
	normal_fragment_maps: "#ifdef USE_NORMALMAP_OBJECTSPACE\n	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#ifdef FLIP_SIDED\n		normal = - normal;\n	#endif\n	#ifdef DOUBLE_SIDED\n		normal = normal * faceDirection;\n	#endif\n	normal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	mapN.xy *= normalScale;\n	normal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",
	normal_pars_fragment: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",
	normal_pars_vertex: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",
	normal_vertex: "#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n	#ifdef USE_TANGENT\n		vTangent = normalize( transformedTangent );\n		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n	#endif\n#endif",
	normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n	uniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( uv.st );\n		vec2 st1 = dFdy( uv.st );\n		vec3 N = surf_norm;\n		vec3 q1perp = cross( q1, N );\n		vec3 q0perp = cross( N, q0 );\n		vec3 T = q1perp * st0.x + q0perp * st1.x;\n		vec3 B = q1perp * st0.y + q0perp * st1.y;\n		float det = max( dot( T, T ), dot( B, B ) );\n		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n		return mat3( T * scale, B * scale, N );\n	}\n#endif",
	clearcoat_normal_fragment_begin: "#ifdef USE_CLEARCOAT\n	vec3 clearcoatNormal = nonPerturbedNormal;\n#endif",
	clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\n	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n	clearcoatMapN.xy *= clearcoatNormalScale;\n	clearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif",
	clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\n	uniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform sampler2D clearcoatNormalMap;\n	uniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform sampler2D clearcoatRoughnessMap;\n#endif",
	iridescence_pars_fragment: "#ifdef USE_IRIDESCENCEMAP\n	uniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform sampler2D iridescenceThicknessMap;\n#endif",
	opaque_fragment: "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",
	packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n	return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n	return 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n	if( v <= 0.0 )\n		return vec4( 0., 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec4( 1., 1., 1., 1. );\n	float vuf;\n	float af = modf( v * PackFactors.a, vuf );\n	float bf = modf( vuf * ShiftRight8, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n	if( v <= 0.0 )\n		return vec3( 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec3( 1., 1., 1. );\n	float vuf;\n	float bf = modf( v * PackFactors.b, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n	if( v <= 0.0 )\n		return vec2( 0., 0. );\n	if( v >= 1.0 )\n		return vec2( 1., 1. );\n	float vuf;\n	float gf = modf( v * 256., vuf );\n	return vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n	return dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n	return dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	return depth * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	return ( near * far ) / ( ( far - near ) * depth - far );\n}",
	premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n	gl_FragColor.rgb *= gl_FragColor.a;\n#endif",
	project_vertex: "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n	mvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n	mvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
	dithering_fragment: "#ifdef DITHERING\n	gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
	dithering_pars_fragment: "#ifdef DITHERING\n	vec3 dithering( vec3 color ) {\n		float grid_position = rand( gl_FragCoord.xy );\n		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n		return color + dither_shift_RGB;\n	}\n#endif",
	roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n	roughnessFactor *= texelRoughness.g;\n#endif",
	roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n	uniform sampler2D roughnessMap;\n#endif",
	shadowmap_pars_fragment: "#if NUM_SPOT_LIGHT_COORDS > 0\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#endif\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#elif defined( SHADOWMAP_TYPE_BASIC )\n			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float interleavedGradientNoise( vec2 position ) {\n			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );\n		}\n		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {\n			const float goldenAngle = 2.399963229728653;\n			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );\n			float theta = float( sampleIndex ) * goldenAngle + phi;\n			return vec2( cos( theta ), sin( theta ) ) * r;\n		}\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			shadowCoord.z += shadowBias;\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n				float radius = shadowRadius * texelSize.x;\n				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;\n				shadow = (\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )\n				) * 0.2;\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#elif defined( SHADOWMAP_TYPE_VSM )\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			shadowCoord.z += shadowBias;\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;\n				float mean = distribution.x;\n				float variance = distribution.y * distribution.y;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					float hard_shadow = step( mean, shadowCoord.z );\n				#else\n					float hard_shadow = step( shadowCoord.z, mean );\n				#endif\n				if ( hard_shadow == 1.0 ) {\n					shadow = 1.0;\n				} else {\n					variance = max( variance, 0.0000001 );\n					float d = shadowCoord.z - mean;\n					float p_max = variance / ( variance + d * d );\n					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );\n					shadow = max( hard_shadow, p_max );\n				}\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#else\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			shadowCoord.z += shadowBias;\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				float depth = texture2D( shadowMap, shadowCoord.xy ).r;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					shadow = step( depth, shadowCoord.z );\n				#else\n					shadow = step( shadowCoord.z, depth );\n				#endif\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n	#if defined( SHADOWMAP_TYPE_PCF )\n	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 bd3D = normalize( lightToPosition );\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n			dp += shadowBias;\n			float texelSize = shadowRadius / shadowMapSize.x;\n			vec3 absDir = abs( bd3D );\n			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );\n			tangent = normalize( cross( bd3D, tangent ) );\n			vec3 bitangent = cross( bd3D, tangent );\n			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;\n			shadow = (\n				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 0, 5, phi ).x + bitangent * vogelDiskSample( 0, 5, phi ).y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 1, 5, phi ).x + bitangent * vogelDiskSample( 1, 5, phi ).y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 2, 5, phi ).x + bitangent * vogelDiskSample( 2, 5, phi ).y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 3, 5, phi ).x + bitangent * vogelDiskSample( 3, 5, phi ).y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 4, 5, phi ).x + bitangent * vogelDiskSample( 4, 5, phi ).y ) * texelSize, dp ) )\n			) * 0.2;\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#elif defined( SHADOWMAP_TYPE_BASIC )\n	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 bd3D = normalize( lightToPosition );\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n			dp += shadowBias;\n			float depth = textureCube( shadowMap, bd3D ).r;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadow = step( depth, dp );\n			#else\n				shadow = step( dp, depth );\n			#endif\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#endif\n	#endif\n#endif",
	shadowmap_pars_vertex: "#if NUM_SPOT_LIGHT_COORDS > 0\n	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n#endif",
	shadowmap_vertex: "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n	vec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n		shadowWorldPosition = worldPosition;\n		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n		#endif\n		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n#endif",
	shadowmask_pars_fragment: "float getShadowMask() {\n	float shadow = 1.0;\n	#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n		directionalLight = directionalLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n		spotLight = spotLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n	PointLightShadow pointLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n		pointLight = pointLightShadows[ i ];\n		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#endif\n	return shadow;\n}",
	skinbase_vertex: "#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
	skinning_pars_vertex: "#ifdef USE_SKINNING\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n	uniform highp sampler2D boneTexture;\n	mat4 getBoneMatrix( const in float i ) {\n		int size = textureSize( boneTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n#endif",
	skinning_vertex: "#ifdef USE_SKINNING\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	transformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
	skinnormal_vertex: "#ifdef USE_SKINNING\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n	#ifdef USE_TANGENT\n		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n	#endif\n#endif",
	specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif",
	specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif",
	tonemapping_fragment: "#if defined( TONE_MAPPING )\n	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
	tonemapping_pars_fragment: "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n	return saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	return saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	color = max( vec3( 0.0 ), color - 0.004 );\n	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n	return a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n	const mat3 ACESInputMat = mat3(\n		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),\n		vec3( 0.04823, 0.01566, 0.83777 )\n	);\n	const mat3 ACESOutputMat = mat3(\n		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),\n		vec3( -0.07367, -0.00605,  1.07602 )\n	);\n	color *= toneMappingExposure / 0.6;\n	color = ACESInputMat * color;\n	color = RRTAndODTFit( color );\n	color = ACESOutputMat * color;\n	return saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n	vec3( 1.6605, - 0.1246, - 0.0182 ),\n	vec3( - 0.5876, 1.1329, - 0.1006 ),\n	vec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n	vec3( 0.6274, 0.0691, 0.0164 ),\n	vec3( 0.3293, 0.9195, 0.0880 ),\n	vec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n	vec3 x2 = x * x;\n	vec3 x4 = x2 * x2;\n	return + 15.5 * x4 * x2\n		- 40.14 * x4 * x\n		+ 31.96 * x4\n		- 6.868 * x2 * x\n		+ 0.4298 * x2\n		+ 0.1191 * x\n		- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n	const mat3 AgXInsetMatrix = mat3(\n		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n	);\n	const mat3 AgXOutsetMatrix = mat3(\n		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n	);\n	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;\n	color *= toneMappingExposure;\n	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n	color = AgXInsetMatrix * color;\n	color = max( color, 1e-10 );	color = log2( color );\n	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n	color = clamp( color, 0.0, 1.0 );\n	color = agxDefaultContrastApprox( color );\n	color = AgXOutsetMatrix * color;\n	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n	color = clamp( color, 0.0, 1.0 );\n	return color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n	const float StartCompression = 0.8 - 0.04;\n	const float Desaturation = 0.15;\n	color *= toneMappingExposure;\n	float x = min( color.r, min( color.g, color.b ) );\n	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n	color -= offset;\n	float peak = max( color.r, max( color.g, color.b ) );\n	if ( peak < StartCompression ) return color;\n	float d = 1. - StartCompression;\n	float newPeak = 1. - d * d / ( peak + d - StartCompression );\n	color *= newPeak / peak;\n	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n	return mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",
	transmission_fragment: "#ifdef USE_TRANSMISSION\n	material.transmission = transmission;\n	material.transmissionAlpha = 1.0;\n	material.thickness = thickness;\n	material.attenuationDistance = attenuationDistance;\n	material.attenuationColor = attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n	#endif\n	vec3 pos = vWorldPosition;\n	vec3 v = normalize( cameraPosition - pos );\n	vec3 n = inverseTransformDirection( normal, viewMatrix );\n	vec4 transmitted = getIBLVolumeRefraction(\n		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,\n		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n		material.attenuationColor, material.attenuationDistance );\n	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif",
	transmission_pars_fragment: "#ifdef USE_TRANSMISSION\n	uniform float transmission;\n	uniform float thickness;\n	uniform float attenuationDistance;\n	uniform vec3 attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		uniform sampler2D transmissionMap;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		uniform sampler2D thicknessMap;\n	#endif\n	uniform vec2 transmissionSamplerSize;\n	uniform sampler2D transmissionSamplerMap;\n	uniform mat4 modelMatrix;\n	uniform mat4 projectionMatrix;\n	varying vec3 vWorldPosition;\n	float w0( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n	}\n	float w1( float a ) {\n		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n	}\n	float w2( float a ){\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n	}\n	float w3( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * a * a );\n	}\n	float g0( float a ) {\n		return w0( a ) + w1( a );\n	}\n	float g1( float a ) {\n		return w2( a ) + w3( a );\n	}\n	float h0( float a ) {\n		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n	}\n	float h1( float a ) {\n		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n	}\n	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n		uv = uv * texelSize.zw + 0.5;\n		vec2 iuv = floor( uv );\n		vec2 fuv = fract( uv );\n		float g0x = g0( fuv.x );\n		float g1x = g1( fuv.x );\n		float h0x = h0( fuv.x );\n		float h1x = h1( fuv.x );\n		float h0y = h0( fuv.y );\n		float h1y = h1( fuv.y );\n		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n	}\n	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n		vec2 fLodSizeInv = 1.0 / fLodSize;\n		vec2 cLodSizeInv = 1.0 / cLodSize;\n		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n		return mix( fSample, cSample, fract( lod ) );\n	}\n	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n		vec3 modelScale;\n		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n		return normalize( refractionVector ) * thickness * modelScale;\n	}\n	float applyIorToRoughness( const in float roughness, const in float ior ) {\n		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n	}\n	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n	}\n	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n		if ( isinf( attenuationDistance ) ) {\n			return vec3( 1.0 );\n		} else {\n			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;\n		}\n	}\n	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n		const in vec3 attenuationColor, const in float attenuationDistance ) {\n		vec4 transmittedLight;\n		vec3 transmittance;\n		#ifdef USE_DISPERSION\n			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n			for ( int i = 0; i < 3; i ++ ) {\n				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n				vec3 refractedRayExit = position + transmissionRay;\n				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n				vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n				refractionCoords += 1.0;\n				refractionCoords /= 2.0;\n				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n				transmittedLight[ i ] = transmissionSample[ i ];\n				transmittedLight.a += transmissionSample.a;\n				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n			}\n			transmittedLight.a /= 3.0;\n		#else\n			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n			vec3 refractedRayExit = position + transmissionRay;\n			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n			vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n			refractionCoords += 1.0;\n			refractionCoords /= 2.0;\n			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n		#endif\n		vec3 attenuatedColor = transmittance * transmittedLight.rgb;\n		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n	}\n#endif",
	uv_pars_fragment: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",
	uv_pars_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	uniform mat3 mapTransform;\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform mat3 alphaMapTransform;\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	uniform mat3 lightMapTransform;\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	uniform mat3 aoMapTransform;\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	uniform mat3 bumpMapTransform;\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	uniform mat3 normalMapTransform;\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	uniform mat3 displacementMapTransform;\n	varying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	uniform mat3 emissiveMapTransform;\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	uniform mat3 metalnessMapTransform;\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	uniform mat3 roughnessMapTransform;\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	uniform mat3 anisotropyMapTransform;\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	uniform mat3 clearcoatMapTransform;\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform mat3 clearcoatNormalMapTransform;\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform mat3 clearcoatRoughnessMapTransform;\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	uniform mat3 sheenColorMapTransform;\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	uniform mat3 sheenRoughnessMapTransform;\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	uniform mat3 iridescenceMapTransform;\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform mat3 iridescenceThicknessMapTransform;\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	uniform mat3 specularMapTransform;\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	uniform mat3 specularColorMapTransform;\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	uniform mat3 specularIntensityMapTransform;\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",
	uv_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	vUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif",
	worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n	vec4 worldPosition = vec4( transformed, 1.0 );\n	#ifdef USE_BATCHING\n		worldPosition = batchingMatrix * worldPosition;\n	#endif\n	#ifdef USE_INSTANCING\n		worldPosition = instanceMatrix * worldPosition;\n	#endif\n	worldPosition = modelMatrix * worldPosition;\n#endif",
	background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	gl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
	background_frag: "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n	vec4 texColor = texture2D( t2D, vUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	backgroundCube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",
	backgroundCube_frag: "#ifdef ENVMAP_TYPE_CUBE\n	uniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n	uniform sampler2D envMap;\n#endif\nuniform float flipEnvMap;\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );\n	#elif defined( ENVMAP_TYPE_CUBE_UV )\n		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );\n	#else\n		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",
	cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n	gl_FragColor = texColor;\n	gl_FragColor.a *= opacity;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	depth_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vHighPrecisionZW = gl_Position.zw;\n}",
	depth_frag: "#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <logdepthbuf_fragment>\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];\n	#else\n		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;\n	#endif\n	#if DEPTH_PACKING == 3200\n		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n	#elif DEPTH_PACKING == 3201\n		gl_FragColor = packDepthToRGBA( fragCoordZ );\n	#elif DEPTH_PACKING == 3202\n		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n	#elif DEPTH_PACKING == 3203\n		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n	#endif\n}",
	distance_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	vWorldPosition = worldPosition.xyz;\n}",
	distance_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	float dist = length( vWorldPosition - referencePosition );\n	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n	dist = saturate( dist );\n	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );\n}",
	equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n}",
	equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vec3 direction = normalize( vWorldDirection );\n	vec2 sampleUV = equirectUv( direction );\n	gl_FragColor = texture2D( tEquirect, sampleUV );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vLineDistance = scale * lineDistance;\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",
	linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	meshbasic_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinbase_vertex>\n		#include <skinnormal_vertex>\n		#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <fog_vertex>\n}",
	meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n	#else\n		reflectedLight.indirectDiffuse += vec3( 1.0 );\n	#endif\n	#include <aomap_fragment>\n	reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshlambert_vert: "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshlambert_frag: "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_lambert_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n	vViewPosition = - mvPosition.xyz;\n}",
	meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	vec3 viewDir = normalize( vViewPosition );\n	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n	vec3 y = cross( viewDir, x );\n	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n	#ifdef USE_MATCAP\n		vec4 matcapColor = texture2D( matcap, uv );\n	#else\n		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n	#endif\n	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshnormal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	vViewPosition = - mvPosition.xyz;\n#endif\n}",
	meshnormal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );\n	#ifdef OPAQUE\n		gl_FragColor.a = 1.0;\n	#endif\n}",
	meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_phong_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n	varying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n	vWorldPosition = worldPosition.xyz;\n#endif\n}",
	meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n	#define IOR\n	#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n	uniform float ior;\n#endif\n#ifdef USE_SPECULAR\n	uniform float specularIntensity;\n	uniform vec3 specularColor;\n	#ifdef USE_SPECULAR_COLORMAP\n		uniform sampler2D specularColorMap;\n	#endif\n	#ifdef USE_SPECULAR_INTENSITYMAP\n		uniform sampler2D specularIntensityMap;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT\n	uniform float clearcoat;\n	uniform float clearcoatRoughness;\n#endif\n#ifdef USE_DISPERSION\n	uniform float dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n	uniform float iridescence;\n	uniform float iridescenceIOR;\n	uniform float iridescenceThicknessMinimum;\n	uniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n	uniform vec3 sheenColor;\n	uniform float sheenRoughness;\n	#ifdef USE_SHEEN_COLORMAP\n		uniform sampler2D sheenColorMap;\n	#endif\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		uniform sampler2D sheenRoughnessMap;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	uniform vec2 anisotropyVector;\n	#ifdef USE_ANISOTROPYMAP\n		uniform sampler2D anisotropyMap;\n	#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <clearcoat_normal_fragment_begin>\n	#include <clearcoat_normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_physical_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n	#include <transmission_fragment>\n	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n	#ifdef USE_SHEEN\n \n		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;\n \n 	#endif\n	#ifdef USE_CLEARCOAT\n		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n	#endif\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshtoon_frag: "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_toon_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n	varying vec2 vUv;\n	uniform mat3 uvTransform;\n#endif\nvoid main() {\n	#ifdef USE_POINTS_UV\n		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	#endif\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	gl_PointSize = size;\n	#ifdef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n	#endif\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <fog_vertex>\n}",
	points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	shadow_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n	#include <logdepthbuf_fragment>\n	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}",
	sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	vec4 mvPosition = modelViewMatrix[ 3 ];\n	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n	#ifndef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) scale *= - mvPosition.z;\n	#endif\n	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n	vec2 rotatedPosition;\n	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n	mvPosition.xy += rotatedPosition;\n	gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",
	sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}"
}, UniformsLib = {
	common: {
		diffuse: { value: /* @__PURE__ */ new Color(16777215) },
		opacity: { value: 1 },
		map: { value: null },
		mapTransform: { value: /* @__PURE__ */ new Matrix3() },
		alphaMap: { value: null },
		alphaMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		alphaTest: { value: 0 }
	},
	specularmap: {
		specularMap: { value: null },
		specularMapTransform: { value: /* @__PURE__ */ new Matrix3() }
	},
	envmap: {
		envMap: { value: null },
		envMapRotation: { value: /* @__PURE__ */ new Matrix3() },
		flipEnvMap: { value: -1 },
		reflectivity: { value: 1 },
		ior: { value: 1.5 },
		refractionRatio: { value: .98 },
		dfgLUT: { value: null }
	},
	aomap: {
		aoMap: { value: null },
		aoMapIntensity: { value: 1 },
		aoMapTransform: { value: /* @__PURE__ */ new Matrix3() }
	},
	lightmap: {
		lightMap: { value: null },
		lightMapIntensity: { value: 1 },
		lightMapTransform: { value: /* @__PURE__ */ new Matrix3() }
	},
	bumpmap: {
		bumpMap: { value: null },
		bumpMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		bumpScale: { value: 1 }
	},
	normalmap: {
		normalMap: { value: null },
		normalMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		normalScale: { value: /* @__PURE__ */ new Vector2(1, 1) }
	},
	displacementmap: {
		displacementMap: { value: null },
		displacementMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		displacementScale: { value: 1 },
		displacementBias: { value: 0 }
	},
	emissivemap: {
		emissiveMap: { value: null },
		emissiveMapTransform: { value: /* @__PURE__ */ new Matrix3() }
	},
	metalnessmap: {
		metalnessMap: { value: null },
		metalnessMapTransform: { value: /* @__PURE__ */ new Matrix3() }
	},
	roughnessmap: {
		roughnessMap: { value: null },
		roughnessMapTransform: { value: /* @__PURE__ */ new Matrix3() }
	},
	gradientmap: { gradientMap: { value: null } },
	fog: {
		fogDensity: { value: 25e-5 },
		fogNear: { value: 1 },
		fogFar: { value: 2e3 },
		fogColor: { value: /* @__PURE__ */ new Color(16777215) }
	},
	lights: {
		ambientLightColor: { value: [] },
		lightProbe: { value: [] },
		directionalLights: {
			value: [],
			properties: {
				direction: {},
				color: {}
			}
		},
		directionalLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		directionalShadowMap: { value: [] },
		directionalShadowMatrix: { value: [] },
		spotLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {}
			}
		},
		spotLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		spotLightMap: { value: [] },
		spotShadowMap: { value: [] },
		spotLightMatrix: { value: [] },
		pointLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				decay: {},
				distance: {}
			}
		},
		pointLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {},
				shadowCameraNear: {},
				shadowCameraFar: {}
			}
		},
		pointShadowMap: { value: [] },
		pointShadowMatrix: { value: [] },
		hemisphereLights: {
			value: [],
			properties: {
				direction: {},
				skyColor: {},
				groundColor: {}
			}
		},
		rectAreaLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				width: {},
				height: {}
			}
		},
		ltc_1: { value: null },
		ltc_2: { value: null }
	},
	points: {
		diffuse: { value: /* @__PURE__ */ new Color(16777215) },
		opacity: { value: 1 },
		size: { value: 1 },
		scale: { value: 1 },
		map: { value: null },
		alphaMap: { value: null },
		alphaMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		alphaTest: { value: 0 },
		uvTransform: { value: /* @__PURE__ */ new Matrix3() }
	},
	sprite: {
		diffuse: { value: /* @__PURE__ */ new Color(16777215) },
		opacity: { value: 1 },
		center: { value: /* @__PURE__ */ new Vector2(.5, .5) },
		rotation: { value: 0 },
		map: { value: null },
		mapTransform: { value: /* @__PURE__ */ new Matrix3() },
		alphaMap: { value: null },
		alphaMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		alphaTest: { value: 0 }
	}
}, ShaderLib = {
	basic: {
		uniforms: /* @__PURE__ */ mergeUniforms([
			UniformsLib.common,
			UniformsLib.specularmap,
			UniformsLib.envmap,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.fog
		]),
		vertexShader: ShaderChunk.meshbasic_vert,
		fragmentShader: ShaderChunk.meshbasic_frag
	},
	lambert: {
		uniforms: /* @__PURE__ */ mergeUniforms([
			UniformsLib.common,
			UniformsLib.specularmap,
			UniformsLib.envmap,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.fog,
			UniformsLib.lights,
			{ emissive: { value: /* @__PURE__ */ new Color(0) } }
		]),
		vertexShader: ShaderChunk.meshlambert_vert,
		fragmentShader: ShaderChunk.meshlambert_frag
	},
	phong: {
		uniforms: /* @__PURE__ */ mergeUniforms([
			UniformsLib.common,
			UniformsLib.specularmap,
			UniformsLib.envmap,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.fog,
			UniformsLib.lights,
			{
				emissive: { value: /* @__PURE__ */ new Color(0) },
				specular: { value: /* @__PURE__ */ new Color(1118481) },
				shininess: { value: 30 }
			}
		]),
		vertexShader: ShaderChunk.meshphong_vert,
		fragmentShader: ShaderChunk.meshphong_frag
	},
	standard: {
		uniforms: /* @__PURE__ */ mergeUniforms([
			UniformsLib.common,
			UniformsLib.envmap,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.roughnessmap,
			UniformsLib.metalnessmap,
			UniformsLib.fog,
			UniformsLib.lights,
			{
				emissive: { value: /* @__PURE__ */ new Color(0) },
				roughness: { value: 1 },
				metalness: { value: 0 },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: ShaderChunk.meshphysical_vert,
		fragmentShader: ShaderChunk.meshphysical_frag
	},
	toon: {
		uniforms: /* @__PURE__ */ mergeUniforms([
			UniformsLib.common,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.gradientmap,
			UniformsLib.fog,
			UniformsLib.lights,
			{ emissive: { value: /* @__PURE__ */ new Color(0) } }
		]),
		vertexShader: ShaderChunk.meshtoon_vert,
		fragmentShader: ShaderChunk.meshtoon_frag
	},
	matcap: {
		uniforms: /* @__PURE__ */ mergeUniforms([
			UniformsLib.common,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.fog,
			{ matcap: { value: null } }
		]),
		vertexShader: ShaderChunk.meshmatcap_vert,
		fragmentShader: ShaderChunk.meshmatcap_frag
	},
	points: {
		uniforms: /* @__PURE__ */ mergeUniforms([UniformsLib.points, UniformsLib.fog]),
		vertexShader: ShaderChunk.points_vert,
		fragmentShader: ShaderChunk.points_frag
	},
	dashed: {
		uniforms: /* @__PURE__ */ mergeUniforms([
			UniformsLib.common,
			UniformsLib.fog,
			{
				scale: { value: 1 },
				dashSize: { value: 1 },
				totalSize: { value: 2 }
			}
		]),
		vertexShader: ShaderChunk.linedashed_vert,
		fragmentShader: ShaderChunk.linedashed_frag
	},
	depth: {
		uniforms: /* @__PURE__ */ mergeUniforms([UniformsLib.common, UniformsLib.displacementmap]),
		vertexShader: ShaderChunk.depth_vert,
		fragmentShader: ShaderChunk.depth_frag
	},
	normal: {
		uniforms: /* @__PURE__ */ mergeUniforms([
			UniformsLib.common,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			{ opacity: { value: 1 } }
		]),
		vertexShader: ShaderChunk.meshnormal_vert,
		fragmentShader: ShaderChunk.meshnormal_frag
	},
	sprite: {
		uniforms: /* @__PURE__ */ mergeUniforms([UniformsLib.sprite, UniformsLib.fog]),
		vertexShader: ShaderChunk.sprite_vert,
		fragmentShader: ShaderChunk.sprite_frag
	},
	background: {
		uniforms: {
			uvTransform: { value: /* @__PURE__ */ new Matrix3() },
			t2D: { value: null },
			backgroundIntensity: { value: 1 }
		},
		vertexShader: ShaderChunk.background_vert,
		fragmentShader: ShaderChunk.background_frag
	},
	backgroundCube: {
		uniforms: {
			envMap: { value: null },
			flipEnvMap: { value: -1 },
			backgroundBlurriness: { value: 0 },
			backgroundIntensity: { value: 1 },
			backgroundRotation: { value: /* @__PURE__ */ new Matrix3() }
		},
		vertexShader: ShaderChunk.backgroundCube_vert,
		fragmentShader: ShaderChunk.backgroundCube_frag
	},
	cube: {
		uniforms: {
			tCube: { value: null },
			tFlip: { value: -1 },
			opacity: { value: 1 }
		},
		vertexShader: ShaderChunk.cube_vert,
		fragmentShader: ShaderChunk.cube_frag
	},
	equirect: {
		uniforms: { tEquirect: { value: null } },
		vertexShader: ShaderChunk.equirect_vert,
		fragmentShader: ShaderChunk.equirect_frag
	},
	distance: {
		uniforms: /* @__PURE__ */ mergeUniforms([
			UniformsLib.common,
			UniformsLib.displacementmap,
			{
				referencePosition: { value: /* @__PURE__ */ new Vector3() },
				nearDistance: { value: 1 },
				farDistance: { value: 1e3 }
			}
		]),
		vertexShader: ShaderChunk.distance_vert,
		fragmentShader: ShaderChunk.distance_frag
	},
	shadow: {
		uniforms: /* @__PURE__ */ mergeUniforms([
			UniformsLib.lights,
			UniformsLib.fog,
			{
				color: { value: /* @__PURE__ */ new Color(0) },
				opacity: { value: 1 }
			}
		]),
		vertexShader: ShaderChunk.shadow_vert,
		fragmentShader: ShaderChunk.shadow_frag
	}
};
ShaderLib.physical = {
	uniforms: /* @__PURE__ */ mergeUniforms([ShaderLib.standard.uniforms, {
		clearcoat: { value: 0 },
		clearcoatMap: { value: null },
		clearcoatMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		clearcoatNormalMap: { value: null },
		clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		clearcoatNormalScale: { value: /* @__PURE__ */ new Vector2(1, 1) },
		clearcoatRoughness: { value: 0 },
		clearcoatRoughnessMap: { value: null },
		clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		dispersion: { value: 0 },
		iridescence: { value: 0 },
		iridescenceMap: { value: null },
		iridescenceMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		iridescenceIOR: { value: 1.3 },
		iridescenceThicknessMinimum: { value: 100 },
		iridescenceThicknessMaximum: { value: 400 },
		iridescenceThicknessMap: { value: null },
		iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		sheen: { value: 0 },
		sheenColor: { value: /* @__PURE__ */ new Color(0) },
		sheenColorMap: { value: null },
		sheenColorMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		sheenRoughness: { value: 1 },
		sheenRoughnessMap: { value: null },
		sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		transmission: { value: 0 },
		transmissionMap: { value: null },
		transmissionMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		transmissionSamplerSize: { value: /* @__PURE__ */ new Vector2() },
		transmissionSamplerMap: { value: null },
		thickness: { value: 0 },
		thicknessMap: { value: null },
		thicknessMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		attenuationDistance: { value: 0 },
		attenuationColor: { value: /* @__PURE__ */ new Color(0) },
		specularColor: { value: /* @__PURE__ */ new Color(1, 1, 1) },
		specularColorMap: { value: null },
		specularColorMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		specularIntensity: { value: 1 },
		specularIntensityMap: { value: null },
		specularIntensityMapTransform: { value: /* @__PURE__ */ new Matrix3() },
		anisotropyVector: { value: /* @__PURE__ */ new Vector2() },
		anisotropyMap: { value: null },
		anisotropyMapTransform: { value: /* @__PURE__ */ new Matrix3() }
	}]),
	vertexShader: ShaderChunk.meshphysical_vert,
	fragmentShader: ShaderChunk.meshphysical_frag
};
var _rgb = {
	r: 0,
	b: 0,
	g: 0
}, _e1$1 = /* @__PURE__ */ new Euler(), _m1$1 = /* @__PURE__ */ new Matrix4();
function WebGLBackground(w, T, O, j, F, U, W) {
	let G = new Color(0), K = U === !0 ? 0 : 1, q, J, Y = null, X = 0, Q = null;
	function xS(w) {
		let j = w.isScene === !0 ? w.background : null;
		return j && j.isTexture && (j = (w.backgroundBlurriness > 0 ? O : T).get(j)), j;
	}
	function SS(T) {
		let O = !1, F = xS(T);
		F === null ? wS(G, K) : F && F.isColor && (wS(F, 1), O = !0);
		let U = w.xr.getEnvironmentBlendMode();
		U === "additive" ? j.buffers.color.setClear(0, 0, 0, 1, W) : U === "alpha-blend" && j.buffers.color.setClear(0, 0, 0, 0, W), (w.autoClear || O) && (j.buffers.depth.setTest(!0), j.buffers.depth.setMask(!0), j.buffers.color.setMask(!0), w.clear(w.autoClearColor, w.autoClearDepth, w.autoClearStencil));
	}
	function CS(T, O) {
		let j = xS(O);
		j && (j.isCubeTexture || j.mapping === 306) ? (J === void 0 && (J = new Mesh(new BoxGeometry(1, 1, 1), new ShaderMaterial({
			name: "BackgroundCubeMaterial",
			uniforms: cloneUniforms(ShaderLib.backgroundCube.uniforms),
			vertexShader: ShaderLib.backgroundCube.vertexShader,
			fragmentShader: ShaderLib.backgroundCube.fragmentShader,
			side: 1,
			depthTest: !1,
			depthWrite: !1,
			fog: !1,
			allowOverride: !1
		})), J.geometry.deleteAttribute("normal"), J.geometry.deleteAttribute("uv"), J.onBeforeRender = function(w, T, O) {
			this.matrixWorld.copyPosition(O.matrixWorld);
		}, Object.defineProperty(J.material, "envMap", { get: function() {
			return this.uniforms.envMap.value;
		} }), F.update(J)), _e1$1.copy(O.backgroundRotation), _e1$1.x *= -1, _e1$1.y *= -1, _e1$1.z *= -1, j.isCubeTexture && j.isRenderTargetTexture === !1 && (_e1$1.y *= -1, _e1$1.z *= -1), J.material.uniforms.envMap.value = j, J.material.uniforms.flipEnvMap.value = j.isCubeTexture && j.isRenderTargetTexture === !1 ? -1 : 1, J.material.uniforms.backgroundBlurriness.value = O.backgroundBlurriness, J.material.uniforms.backgroundIntensity.value = O.backgroundIntensity, J.material.uniforms.backgroundRotation.value.setFromMatrix4(_m1$1.makeRotationFromEuler(_e1$1)), J.material.toneMapped = ColorManagement.getTransfer(j.colorSpace) !== SRGBTransfer, (Y !== j || X !== j.version || Q !== w.toneMapping) && (J.material.needsUpdate = !0, Y = j, X = j.version, Q = w.toneMapping), J.layers.enableAll(), T.unshift(J, J.geometry, J.material, 0, 0, null)) : j && j.isTexture && (q === void 0 && (q = new Mesh(new PlaneGeometry(2, 2), new ShaderMaterial({
			name: "BackgroundMaterial",
			uniforms: cloneUniforms(ShaderLib.background.uniforms),
			vertexShader: ShaderLib.background.vertexShader,
			fragmentShader: ShaderLib.background.fragmentShader,
			side: 0,
			depthTest: !1,
			depthWrite: !1,
			fog: !1,
			allowOverride: !1
		})), q.geometry.deleteAttribute("normal"), Object.defineProperty(q.material, "map", { get: function() {
			return this.uniforms.t2D.value;
		} }), F.update(q)), q.material.uniforms.t2D.value = j, q.material.uniforms.backgroundIntensity.value = O.backgroundIntensity, q.material.toneMapped = ColorManagement.getTransfer(j.colorSpace) !== SRGBTransfer, j.matrixAutoUpdate === !0 && j.updateMatrix(), q.material.uniforms.uvTransform.value.copy(j.matrix), (Y !== j || X !== j.version || Q !== w.toneMapping) && (q.material.needsUpdate = !0, Y = j, X = j.version, Q = w.toneMapping), q.layers.enableAll(), T.unshift(q, q.geometry, q.material, 0, 0, null));
	}
	function wS(T, O) {
		T.getRGB(_rgb, getUnlitUniformColorSpace(w)), j.buffers.color.setClear(_rgb.r, _rgb.g, _rgb.b, O, W);
	}
	function TS() {
		J !== void 0 && (J.geometry.dispose(), J.material.dispose(), J = void 0), q !== void 0 && (q.geometry.dispose(), q.material.dispose(), q = void 0);
	}
	return {
		getClearColor: function() {
			return G;
		},
		setClearColor: function(w, T = 1) {
			G.set(w), K = T, wS(G, K);
		},
		getClearAlpha: function() {
			return K;
		},
		setClearAlpha: function(w) {
			K = w, wS(G, K);
		},
		render: SS,
		addToRenderList: CS,
		dispose: TS
	};
}
function WebGLBindingStates(w, T) {
	let O = w.getParameter(w.MAX_VERTEX_ATTRIBS), j = {}, F = X(null), U = F, W = !1;
	function G(O, j, F, G, K) {
		let J = !1, X = Y(G, F, j);
		U !== X && (U = X, q(U.object)), J = Q(O, G, F, K), J && xS(O, G, F, K), K !== null && T.update(K, w.ELEMENT_ARRAY_BUFFER), (J || W) && (W = !1, DS(O, j, F, G), K !== null && w.bindBuffer(w.ELEMENT_ARRAY_BUFFER, T.get(K).buffer));
	}
	function K() {
		return w.createVertexArray();
	}
	function q(T) {
		return w.bindVertexArray(T);
	}
	function J(T) {
		return w.deleteVertexArray(T);
	}
	function Y(w, T, O) {
		let F = O.wireframe === !0, U = j[w.id];
		U === void 0 && (U = {}, j[w.id] = U);
		let W = U[T.id];
		W === void 0 && (W = {}, U[T.id] = W);
		let G = W[F];
		return G === void 0 && (G = X(K()), W[F] = G), G;
	}
	function X(w) {
		let T = [], j = [], F = [];
		for (let w = 0; w < O; w++) T[w] = 0, j[w] = 0, F[w] = 0;
		return {
			geometry: null,
			program: null,
			wireframe: !1,
			newAttributes: T,
			enabledAttributes: j,
			attributeDivisors: F,
			object: w,
			attributes: {},
			index: null
		};
	}
	function Q(w, T, O, j) {
		let F = U.attributes, W = T.attributes, G = 0, K = O.getAttributes();
		for (let T in K) if (K[T].location >= 0) {
			let O = F[T], j = W[T];
			if (j === void 0 && (T === "instanceMatrix" && w.instanceMatrix && (j = w.instanceMatrix), T === "instanceColor" && w.instanceColor && (j = w.instanceColor)), O === void 0 || O.attribute !== j || j && O.data !== j.data) return !0;
			G++;
		}
		return U.attributesNum !== G || U.index !== j;
	}
	function xS(w, T, O, j) {
		let F = {}, W = T.attributes, G = 0, K = O.getAttributes();
		for (let T in K) if (K[T].location >= 0) {
			let O = W[T];
			O === void 0 && (T === "instanceMatrix" && w.instanceMatrix && (O = w.instanceMatrix), T === "instanceColor" && w.instanceColor && (O = w.instanceColor));
			let j = {};
			j.attribute = O, O && O.data && (j.data = O.data), F[T] = j, G++;
		}
		U.attributes = F, U.attributesNum = G, U.index = j;
	}
	function SS() {
		let w = U.newAttributes;
		for (let T = 0, O = w.length; T < O; T++) w[T] = 0;
	}
	function CS(w) {
		wS(w, 0);
	}
	function wS(T, O) {
		let j = U.newAttributes, F = U.enabledAttributes, W = U.attributeDivisors;
		j[T] = 1, F[T] === 0 && (w.enableVertexAttribArray(T), F[T] = 1), W[T] !== O && (w.vertexAttribDivisor(T, O), W[T] = O);
	}
	function TS() {
		let T = U.newAttributes, O = U.enabledAttributes;
		for (let j = 0, F = O.length; j < F; j++) O[j] !== T[j] && (w.disableVertexAttribArray(j), O[j] = 0);
	}
	function ES(T, O, j, F, U, W, G) {
		G === !0 ? w.vertexAttribIPointer(T, O, j, U, W) : w.vertexAttribPointer(T, O, j, F, U, W);
	}
	function DS(O, j, F, U) {
		SS();
		let W = U.attributes, G = F.getAttributes(), K = j.defaultAttributeValues;
		for (let j in G) {
			let F = G[j];
			if (F.location >= 0) {
				let G = W[j];
				if (G === void 0 && (j === "instanceMatrix" && O.instanceMatrix && (G = O.instanceMatrix), j === "instanceColor" && O.instanceColor && (G = O.instanceColor)), G !== void 0) {
					let j = G.normalized, W = G.itemSize, K = T.get(G);
					if (K === void 0) continue;
					let q = K.buffer, J = K.type, Y = K.bytesPerElement, X = J === w.INT || J === w.UNSIGNED_INT || G.gpuType === 1013;
					if (G.isInterleavedBufferAttribute) {
						let T = G.data, K = T.stride, Q = G.offset;
						if (T.isInstancedInterleavedBuffer) {
							for (let w = 0; w < F.locationSize; w++) wS(F.location + w, T.meshPerAttribute);
							O.isInstancedMesh !== !0 && U._maxInstanceCount === void 0 && (U._maxInstanceCount = T.meshPerAttribute * T.count);
						} else for (let w = 0; w < F.locationSize; w++) CS(F.location + w);
						w.bindBuffer(w.ARRAY_BUFFER, q);
						for (let w = 0; w < F.locationSize; w++) ES(F.location + w, W / F.locationSize, J, j, K * Y, (Q + W / F.locationSize * w) * Y, X);
					} else {
						if (G.isInstancedBufferAttribute) {
							for (let w = 0; w < F.locationSize; w++) wS(F.location + w, G.meshPerAttribute);
							O.isInstancedMesh !== !0 && U._maxInstanceCount === void 0 && (U._maxInstanceCount = G.meshPerAttribute * G.count);
						} else for (let w = 0; w < F.locationSize; w++) CS(F.location + w);
						w.bindBuffer(w.ARRAY_BUFFER, q);
						for (let w = 0; w < F.locationSize; w++) ES(F.location + w, W / F.locationSize, J, j, W * Y, W / F.locationSize * w * Y, X);
					}
				} else if (K !== void 0) {
					let T = K[j];
					if (T !== void 0) switch (T.length) {
						case 2:
							w.vertexAttrib2fv(F.location, T);
							break;
						case 3:
							w.vertexAttrib3fv(F.location, T);
							break;
						case 4:
							w.vertexAttrib4fv(F.location, T);
							break;
						default: w.vertexAttrib1fv(F.location, T);
					}
				}
			}
		}
		TS();
	}
	function OS() {
		for (let w in jS(), j) {
			let T = j[w];
			for (let w in T) {
				let O = T[w];
				for (let w in O) J(O[w].object), delete O[w];
				delete T[w];
			}
			delete j[w];
		}
	}
	function kS(w) {
		if (j[w.id] === void 0) return;
		let T = j[w.id];
		for (let w in T) {
			let O = T[w];
			for (let w in O) J(O[w].object), delete O[w];
			delete T[w];
		}
		delete j[w.id];
	}
	function AS(w) {
		for (let T in j) {
			let O = j[T];
			if (O[w.id] === void 0) continue;
			let F = O[w.id];
			for (let w in F) J(F[w].object), delete F[w];
			delete O[w.id];
		}
	}
	function jS() {
		MS(), W = !0, U !== F && (U = F, q(U.object));
	}
	function MS() {
		F.geometry = null, F.program = null, F.wireframe = !1;
	}
	return {
		setup: G,
		reset: jS,
		resetDefaultState: MS,
		dispose: OS,
		releaseStatesOfGeometry: kS,
		releaseStatesOfProgram: AS,
		initAttributes: SS,
		enableAttribute: CS,
		disableUnusedAttributes: TS
	};
}
function WebGLBufferRenderer(w, T, O) {
	let j;
	function F(w) {
		j = w;
	}
	function U(T, F) {
		w.drawArrays(j, T, F), O.update(F, j, 1);
	}
	function W(T, F, U) {
		U !== 0 && (w.drawArraysInstanced(j, T, F, U), O.update(F, j, U));
	}
	function G(w, F, U) {
		if (U === 0) return;
		T.get("WEBGL_multi_draw").multiDrawArraysWEBGL(j, w, 0, F, 0, U);
		let W = 0;
		for (let w = 0; w < U; w++) W += F[w];
		O.update(W, j, 1);
	}
	function K(w, F, U, G) {
		if (U === 0) return;
		let K = T.get("WEBGL_multi_draw");
		if (K === null) for (let T = 0; T < w.length; T++) W(w[T], F[T], G[T]);
		else {
			K.multiDrawArraysInstancedWEBGL(j, w, 0, F, 0, G, 0, U);
			let T = 0;
			for (let w = 0; w < U; w++) T += F[w] * G[w];
			O.update(T, j, 1);
		}
	}
	this.setMode = F, this.render = U, this.renderInstances = W, this.renderMultiDraw = G, this.renderMultiDrawInstances = K;
}
function WebGLCapabilities(w, T, O, j) {
	let F;
	function U() {
		if (F !== void 0) return F;
		if (T.has("EXT_texture_filter_anisotropic") === !0) {
			let O = T.get("EXT_texture_filter_anisotropic");
			F = w.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
		} else F = 0;
		return F;
	}
	function W(T) {
		return !(T !== 1023 && j.convert(T) !== w.getParameter(w.IMPLEMENTATION_COLOR_READ_FORMAT));
	}
	function G(O) {
		let F = O === 1016 && (T.has("EXT_color_buffer_half_float") || T.has("EXT_color_buffer_float"));
		return !(O !== 1009 && j.convert(O) !== w.getParameter(w.IMPLEMENTATION_COLOR_READ_TYPE) && O !== 1015 && !F);
	}
	function K(T) {
		if (T === "highp") {
			if (w.getShaderPrecisionFormat(w.VERTEX_SHADER, w.HIGH_FLOAT).precision > 0 && w.getShaderPrecisionFormat(w.FRAGMENT_SHADER, w.HIGH_FLOAT).precision > 0) return "highp";
			T = "mediump";
		}
		return T === "mediump" && w.getShaderPrecisionFormat(w.VERTEX_SHADER, w.MEDIUM_FLOAT).precision > 0 && w.getShaderPrecisionFormat(w.FRAGMENT_SHADER, w.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
	}
	let q = O.precision === void 0 ? "highp" : O.precision, J = K(q);
	J !== q && (warn("WebGLRenderer:", q, "not supported, using", J, "instead."), q = J);
	let Y = O.logarithmicDepthBuffer === !0, X = O.reversedDepthBuffer === !0 && T.has("EXT_clip_control"), Q = w.getParameter(w.MAX_TEXTURE_IMAGE_UNITS), xS = w.getParameter(w.MAX_VERTEX_TEXTURE_IMAGE_UNITS), SS = w.getParameter(w.MAX_TEXTURE_SIZE), CS = w.getParameter(w.MAX_CUBE_MAP_TEXTURE_SIZE), wS = w.getParameter(w.MAX_VERTEX_ATTRIBS), TS = w.getParameter(w.MAX_VERTEX_UNIFORM_VECTORS), ES = w.getParameter(w.MAX_VARYING_VECTORS), DS = w.getParameter(w.MAX_FRAGMENT_UNIFORM_VECTORS), OS = w.getParameter(w.MAX_SAMPLES), kS = w.getParameter(w.SAMPLES);
	return {
		isWebGL2: !0,
		getMaxAnisotropy: U,
		getMaxPrecision: K,
		textureFormatReadable: W,
		textureTypeReadable: G,
		precision: q,
		logarithmicDepthBuffer: Y,
		reversedDepthBuffer: X,
		maxTextures: Q,
		maxVertexTextures: xS,
		maxTextureSize: SS,
		maxCubemapSize: CS,
		maxAttributes: wS,
		maxVertexUniforms: TS,
		maxVaryings: ES,
		maxFragmentUniforms: DS,
		maxSamples: OS,
		samples: kS
	};
}
function WebGLClipping(w) {
	let T = this, O = null, j = 0, F = !1, U = !1, W = new Plane(), G = new Matrix3(), K = {
		value: null,
		needsUpdate: !1
	};
	this.uniform = K, this.numPlanes = 0, this.numIntersection = 0, this.init = function(w, T) {
		let O = w.length !== 0 || T || j !== 0 || F;
		return F = T, j = w.length, O;
	}, this.beginShadows = function() {
		U = !0, J(null);
	}, this.endShadows = function() {
		U = !1;
	}, this.setGlobalState = function(w, T) {
		O = J(w, T, 0);
	}, this.setState = function(T, W, G) {
		let Y = T.clippingPlanes, X = T.clipIntersection, Q = T.clipShadows, xS = w.get(T);
		if (!F || Y === null || Y.length === 0 || U && !Q) U ? J(null) : q();
		else {
			let w = U ? 0 : j, T = w * 4, F = xS.clippingState || null;
			K.value = F, F = J(Y, W, T, G);
			for (let w = 0; w !== T; ++w) F[w] = O[w];
			xS.clippingState = F, this.numIntersection = X ? this.numPlanes : 0, this.numPlanes += w;
		}
	};
	function q() {
		K.value !== O && (K.value = O, K.needsUpdate = j > 0), T.numPlanes = j, T.numIntersection = 0;
	}
	function J(w, O, j, F) {
		let U = w === null ? 0 : w.length, q = null;
		if (U !== 0) {
			if (q = K.value, F !== !0 || q === null) {
				let T = j + U * 4, F = O.matrixWorldInverse;
				G.getNormalMatrix(F), (q === null || q.length < T) && (q = new Float32Array(T));
				for (let T = 0, O = j; T !== U; ++T, O += 4) W.copy(w[T]).applyMatrix4(F, G), W.normal.toArray(q, O), q[O + 3] = W.constant;
			}
			K.value = q, K.needsUpdate = !0;
		}
		return T.numPlanes = U, T.numIntersection = 0, q;
	}
}
function WebGLCubeMaps(w) {
	let T = /* @__PURE__ */ new WeakMap();
	function O(w, T) {
		return T === 303 ? w.mapping = 301 : T === 304 && (w.mapping = 302), w;
	}
	function j(j) {
		if (j && j.isTexture) {
			let U = j.mapping;
			if (U === 303 || U === 304) if (T.has(j)) {
				let w = T.get(j).texture;
				return O(w, j.mapping);
			} else {
				let U = j.image;
				if (U && U.height > 0) {
					let W = new WebGLCubeRenderTarget(U.height);
					return W.fromEquirectangularTexture(w, j), T.set(j, W), j.addEventListener("dispose", F), O(W.texture, j.mapping);
				} else return null;
			}
		}
		return j;
	}
	function F(w) {
		let O = w.target;
		O.removeEventListener("dispose", F);
		let j = T.get(O);
		j !== void 0 && (T.delete(O), j.dispose());
	}
	function U() {
		T = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: j,
		dispose: U
	};
}
var LOD_MIN = 4, EXTRA_LOD_SIGMA = [
	.125,
	.215,
	.35,
	.446,
	.526,
	.582
], MAX_SAMPLES = 20, GGX_SAMPLES = 256, _flatCamera = /* @__PURE__ */ new OrthographicCamera(), _clearColor = /* @__PURE__ */ new Color(), _oldTarget = null, _oldActiveCubeFace = 0, _oldActiveMipmapLevel = 0, _oldXrEnabled = !1, _origin = /* @__PURE__ */ new Vector3(), PMREMGenerator = class {
	constructor(w) {
		this._renderer = w, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
	}
	fromScene(w, T = 0, O = .1, j = 100, F = {}) {
		let { size: U = 256, position: W = _origin } = F;
		_oldTarget = this._renderer.getRenderTarget(), _oldActiveCubeFace = this._renderer.getActiveCubeFace(), _oldActiveMipmapLevel = this._renderer.getActiveMipmapLevel(), _oldXrEnabled = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(U);
		let G = this._allocateTargets();
		return G.depthBuffer = !0, this._sceneToCubeUV(w, O, j, G, W), T > 0 && this._blur(G, 0, 0, T), this._applyPMREM(G), this._cleanup(G), G;
	}
	fromEquirectangular(w, T = null) {
		return this._fromTexture(w, T);
	}
	fromCubemap(w, T = null) {
		return this._fromTexture(w, T);
	}
	compileCubemapShader() {
		this._cubemapMaterial === null && (this._cubemapMaterial = _getCubemapMaterial(), this._compileMaterial(this._cubemapMaterial));
	}
	compileEquirectangularShader() {
		this._equirectMaterial === null && (this._equirectMaterial = _getEquirectMaterial(), this._compileMaterial(this._equirectMaterial));
	}
	dispose() {
		this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
	}
	_setSize(w) {
		this._lodMax = Math.floor(Math.log2(w)), this._cubeSize = 2 ** this._lodMax;
	}
	_dispose() {
		this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
		for (let w = 0; w < this._lodMeshes.length; w++) this._lodMeshes[w].geometry.dispose();
	}
	_cleanup(w) {
		this._renderer.setRenderTarget(_oldTarget, _oldActiveCubeFace, _oldActiveMipmapLevel), this._renderer.xr.enabled = _oldXrEnabled, w.scissorTest = !1, _setViewport(w, 0, 0, w.width, w.height);
	}
	_fromTexture(w, T) {
		w.mapping === 301 || w.mapping === 302 ? this._setSize(w.image.length === 0 ? 16 : w.image[0].width || w.image[0].image.width) : this._setSize(w.image.width / 4), _oldTarget = this._renderer.getRenderTarget(), _oldActiveCubeFace = this._renderer.getActiveCubeFace(), _oldActiveMipmapLevel = this._renderer.getActiveMipmapLevel(), _oldXrEnabled = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
		let O = T || this._allocateTargets();
		return this._textureToCubeUV(w, O), this._applyPMREM(O), this._cleanup(O), O;
	}
	_allocateTargets() {
		let w = 3 * Math.max(this._cubeSize, 112), T = 4 * this._cubeSize, O = {
			magFilter: LinearFilter,
			minFilter: LinearFilter,
			generateMipmaps: !1,
			type: HalfFloatType,
			format: RGBAFormat,
			colorSpace: LinearSRGBColorSpace,
			depthBuffer: !1
		}, j = _createRenderTarget(w, T, O);
		if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== w || this._pingPongRenderTarget.height !== T) {
			this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = _createRenderTarget(w, T, O);
			let { _lodMax: j } = this;
			({lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas} = _createPlanes(j)), this._blurMaterial = _getBlurShader(j, w, T), this._ggxMaterial = _getGGXShader(j, w, T);
		}
		return j;
	}
	_compileMaterial(w) {
		let T = new Mesh(new BufferGeometry(), w);
		this._renderer.compile(T, _flatCamera);
	}
	_sceneToCubeUV(w, T, O, j, F) {
		let U = new PerspectiveCamera(90, 1, T, O), W = [
			1,
			-1,
			1,
			1,
			1,
			1
		], G = [
			1,
			1,
			1,
			-1,
			-1,
			-1
		], K = this._renderer, q = K.autoClear, J = K.toneMapping;
		K.getClearColor(_clearColor), K.toneMapping = 0, K.autoClear = !1, K.state.buffers.depth.getReversed() && (K.setRenderTarget(j), K.clearDepth(), K.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new Mesh(new BoxGeometry(), new MeshBasicMaterial({
			name: "PMREM.Background",
			side: 1,
			depthWrite: !1,
			depthTest: !1
		})));
		let Y = this._backgroundBox, X = Y.material, Q = !1, xS = w.background;
		xS ? xS.isColor && (X.color.copy(xS), w.background = null, Q = !0) : (X.color.copy(_clearColor), Q = !0);
		for (let T = 0; T < 6; T++) {
			let O = T % 3;
			O === 0 ? (U.up.set(0, W[T], 0), U.position.set(F.x, F.y, F.z), U.lookAt(F.x + G[T], F.y, F.z)) : O === 1 ? (U.up.set(0, 0, W[T]), U.position.set(F.x, F.y, F.z), U.lookAt(F.x, F.y + G[T], F.z)) : (U.up.set(0, W[T], 0), U.position.set(F.x, F.y, F.z), U.lookAt(F.x, F.y, F.z + G[T]));
			let q = this._cubeSize;
			_setViewport(j, O * q, T > 2 ? q : 0, q, q), K.setRenderTarget(j), Q && K.render(Y, U), K.render(w, U);
		}
		K.toneMapping = J, K.autoClear = q, w.background = xS;
	}
	_textureToCubeUV(w, T) {
		let O = this._renderer, j = w.mapping === 301 || w.mapping === 302;
		j ? (this._cubemapMaterial === null && (this._cubemapMaterial = _getCubemapMaterial()), this._cubemapMaterial.uniforms.flipEnvMap.value = w.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = _getEquirectMaterial());
		let F = j ? this._cubemapMaterial : this._equirectMaterial, U = this._lodMeshes[0];
		U.material = F;
		let W = F.uniforms;
		W.envMap.value = w;
		let G = this._cubeSize;
		_setViewport(T, 0, 0, 3 * G, 2 * G), O.setRenderTarget(T), O.render(U, _flatCamera);
	}
	_applyPMREM(w) {
		let T = this._renderer, O = T.autoClear;
		T.autoClear = !1;
		let j = this._lodMeshes.length;
		for (let T = 1; T < j; T++) this._applyGGXFilter(w, T - 1, T);
		T.autoClear = O;
	}
	_applyGGXFilter(w, T, O) {
		let j = this._renderer, F = this._pingPongRenderTarget, U = this._ggxMaterial, W = this._lodMeshes[O];
		W.material = U;
		let G = U.uniforms, K = O / (this._lodMeshes.length - 1), q = T / (this._lodMeshes.length - 1), J = Math.sqrt(K * K - q * q) * (0 + K * 1.25), { _lodMax: Y } = this, X = this._sizeLods[O], Q = 3 * X * (O > Y - LOD_MIN ? O - Y + LOD_MIN : 0), xS = 4 * (this._cubeSize - X);
		G.envMap.value = w.texture, G.roughness.value = J, G.mipInt.value = Y - T, _setViewport(F, Q, xS, 3 * X, 2 * X), j.setRenderTarget(F), j.render(W, _flatCamera), G.envMap.value = F.texture, G.roughness.value = 0, G.mipInt.value = Y - O, _setViewport(w, Q, xS, 3 * X, 2 * X), j.setRenderTarget(w), j.render(W, _flatCamera);
	}
	_blur(w, T, O, j, F) {
		let U = this._pingPongRenderTarget;
		this._halfBlur(w, U, T, O, j, "latitudinal", F), this._halfBlur(U, w, O, O, j, "longitudinal", F);
	}
	_halfBlur(w, T, O, j, F, U, W) {
		let G = this._renderer, K = this._blurMaterial;
		U !== "latitudinal" && U !== "longitudinal" && error("blur direction must be either latitudinal or longitudinal!");
		let q = this._lodMeshes[j];
		q.material = K;
		let J = K.uniforms, Y = this._sizeLods[O] - 1, X = isFinite(F) ? Math.PI / (2 * Y) : 2 * Math.PI / (2 * MAX_SAMPLES - 1), Q = F / X, xS = isFinite(F) ? 1 + Math.floor(3 * Q) : MAX_SAMPLES;
		xS > MAX_SAMPLES && warn(`sigmaRadians, ${F}, is too large and will clip, as it requested ${xS} samples when the maximum is set to ${MAX_SAMPLES}`);
		let SS = [], CS = 0;
		for (let w = 0; w < MAX_SAMPLES; ++w) {
			let T = w / Q, O = Math.exp(-T * T / 2);
			SS.push(O), w === 0 ? CS += O : w < xS && (CS += 2 * O);
		}
		for (let w = 0; w < SS.length; w++) SS[w] = SS[w] / CS;
		J.envMap.value = w.texture, J.samples.value = xS, J.weights.value = SS, J.latitudinal.value = U === "latitudinal", W && (J.poleAxis.value = W);
		let { _lodMax: wS } = this;
		J.dTheta.value = X, J.mipInt.value = wS - O;
		let TS = this._sizeLods[j];
		_setViewport(T, 3 * TS * (j > wS - LOD_MIN ? j - wS + LOD_MIN : 0), 4 * (this._cubeSize - TS), 3 * TS, 2 * TS), G.setRenderTarget(T), G.render(q, _flatCamera);
	}
};
function _createPlanes(w) {
	let T = [], O = [], j = [], F = w, U = w - LOD_MIN + 1 + EXTRA_LOD_SIGMA.length;
	for (let W = 0; W < U; W++) {
		let U = 2 ** F;
		T.push(U);
		let G = 1 / U;
		W > w - LOD_MIN ? G = EXTRA_LOD_SIGMA[W - w + LOD_MIN - 1] : W === 0 && (G = 0), O.push(G);
		let K = 1 / (U - 2), q = -K, J = 1 + K, Y = [
			q,
			q,
			J,
			q,
			J,
			J,
			q,
			q,
			J,
			J,
			q,
			J
		], X = new Float32Array(108), Q = new Float32Array(72), xS = new Float32Array(36);
		for (let w = 0; w < 6; w++) {
			let T = w % 3 * 2 / 3 - 1, O = w > 2 ? 0 : -1, j = [
				T,
				O,
				0,
				T + 2 / 3,
				O,
				0,
				T + 2 / 3,
				O + 1,
				0,
				T,
				O,
				0,
				T + 2 / 3,
				O + 1,
				0,
				T,
				O + 1,
				0
			];
			X.set(j, 18 * w), Q.set(Y, 12 * w);
			let F = [
				w,
				w,
				w,
				w,
				w,
				w
			];
			xS.set(F, 6 * w);
		}
		let SS = new BufferGeometry();
		SS.setAttribute("position", new BufferAttribute(X, 3)), SS.setAttribute("uv", new BufferAttribute(Q, 2)), SS.setAttribute("faceIndex", new BufferAttribute(xS, 1)), j.push(new Mesh(SS, null)), F > LOD_MIN && F--;
	}
	return {
		lodMeshes: j,
		sizeLods: T,
		sigmas: O
	};
}
function _createRenderTarget(w, T, O) {
	let j = new WebGLRenderTarget(w, T, O);
	return j.texture.mapping = 306, j.texture.name = "PMREM.cubeUv", j.scissorTest = !0, j;
}
function _setViewport(w, T, O, j, F) {
	w.viewport.set(T, O, j, F), w.scissor.set(T, O, j, F);
}
function _getGGXShader(w, T, O) {
	return new ShaderMaterial({
		name: "PMREMGGXConvolution",
		defines: {
			GGX_SAMPLES,
			CUBEUV_TEXEL_WIDTH: 1 / T,
			CUBEUV_TEXEL_HEIGHT: 1 / O,
			CUBEUV_MAX_MIP: `${w}.0`
		},
		uniforms: {
			envMap: { value: null },
			roughness: { value: 0 },
			mipInt: { value: 0 }
		},
		vertexShader: _getCommonVertexShader(),
		fragmentShader: "\n\n			precision highp float;\n			precision highp int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n			uniform float roughness;\n			uniform float mipInt;\n\n			#define ENVMAP_TYPE_CUBE_UV\n			#include <cube_uv_reflection_fragment>\n\n			#define PI 3.14159265359\n\n			// Van der Corput radical inverse\n			float radicalInverse_VdC(uint bits) {\n				bits = (bits << 16u) | (bits >> 16u);\n				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);\n				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);\n				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);\n				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);\n				return float(bits) * 2.3283064365386963e-10; // / 0x100000000\n			}\n\n			// Hammersley sequence\n			vec2 hammersley(uint i, uint N) {\n				return vec2(float(i) / float(N), radicalInverse_VdC(i));\n			}\n\n			// GGX VNDF importance sampling (Eric Heitz 2018)\n			// \"Sampling the GGX Distribution of Visible Normals\"\n			// https://jcgt.org/published/0007/04/01/\n			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {\n				float alpha = roughness * roughness;\n\n				// Section 3.2: Transform view direction to hemisphere configuration\n				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));\n\n				// Section 4.1: Orthonormal basis\n				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;\n				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);\n				vec3 T2 = cross(Vh, T1);\n\n				// Section 4.2: Parameterization of projected area\n				float r = sqrt(Xi.x);\n				float phi = 2.0 * PI * Xi.y;\n				float t1 = r * cos(phi);\n				float t2 = r * sin(phi);\n				float s = 0.5 * (1.0 + Vh.z);\n				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;\n\n				// Section 4.3: Reprojection onto hemisphere\n				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;\n\n				// Section 3.4: Transform back to ellipsoid configuration\n				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));\n			}\n\n			void main() {\n				vec3 N = normalize(vOutputDirection);\n				vec3 V = N; // Assume view direction equals normal for pre-filtering\n\n				vec3 prefilteredColor = vec3(0.0);\n				float totalWeight = 0.0;\n\n				// For very low roughness, just sample the environment directly\n				if (roughness < 0.001) {\n					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);\n					return;\n				}\n\n				// Tangent space basis for VNDF sampling\n				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);\n				vec3 tangent = normalize(cross(up, N));\n				vec3 bitangent = cross(N, tangent);\n\n				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {\n					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));\n\n					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)\n					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);\n\n					// Transform H back to world space\n					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);\n					vec3 L = normalize(2.0 * dot(V, H) * H - V);\n\n					float NdotL = max(dot(N, L), 0.0);\n\n					if(NdotL > 0.0) {\n						// Sample environment at fixed mip level\n						// VNDF importance sampling handles the distribution filtering\n						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);\n\n						// Weight by NdotL for the split-sum approximation\n						// VNDF PDF naturally accounts for the visible microfacet distribution\n						prefilteredColor += sampleColor * NdotL;\n						totalWeight += NdotL;\n					}\n				}\n\n				if (totalWeight > 0.0) {\n					prefilteredColor = prefilteredColor / totalWeight;\n				}\n\n				gl_FragColor = vec4(prefilteredColor, 1.0);\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function _getBlurShader(w, T, O) {
	let j = new Float32Array(MAX_SAMPLES), F = new Vector3(0, 1, 0);
	return new ShaderMaterial({
		name: "SphericalGaussianBlur",
		defines: {
			n: MAX_SAMPLES,
			CUBEUV_TEXEL_WIDTH: 1 / T,
			CUBEUV_TEXEL_HEIGHT: 1 / O,
			CUBEUV_MAX_MIP: `${w}.0`
		},
		uniforms: {
			envMap: { value: null },
			samples: { value: 1 },
			weights: { value: j },
			latitudinal: { value: !1 },
			dTheta: { value: 0 },
			mipInt: { value: 0 },
			poleAxis: { value: F }
		},
		vertexShader: _getCommonVertexShader(),
		fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n			uniform int samples;\n			uniform float weights[ n ];\n			uniform bool latitudinal;\n			uniform float dTheta;\n			uniform float mipInt;\n			uniform vec3 poleAxis;\n\n			#define ENVMAP_TYPE_CUBE_UV\n			#include <cube_uv_reflection_fragment>\n\n			vec3 getSample( float theta, vec3 axis ) {\n\n				float cosTheta = cos( theta );\n				// Rodrigues' axis-angle rotation\n				vec3 sampleDirection = vOutputDirection * cosTheta\n					+ cross( axis, vOutputDirection ) * sin( theta )\n					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );\n\n				return bilinearCubeUV( envMap, sampleDirection, mipInt );\n\n			}\n\n			void main() {\n\n				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );\n\n				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {\n\n					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );\n\n				}\n\n				axis = normalize( axis );\n\n				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );\n\n				for ( int i = 1; i < n; i++ ) {\n\n					if ( i >= samples ) {\n\n						break;\n\n					}\n\n					float theta = dTheta * float( i );\n					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );\n					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );\n\n				}\n\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function _getEquirectMaterial() {
	return new ShaderMaterial({
		name: "EquirectangularToCubeUV",
		uniforms: { envMap: { value: null } },
		vertexShader: _getCommonVertexShader(),
		fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n\n			#include <common>\n\n			void main() {\n\n				vec3 outputDirection = normalize( vOutputDirection );\n				vec2 uv = equirectUv( outputDirection );\n\n				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );\n\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function _getCubemapMaterial() {
	return new ShaderMaterial({
		name: "CubemapToCubeUV",
		uniforms: {
			envMap: { value: null },
			flipEnvMap: { value: -1 }
		},
		vertexShader: _getCommonVertexShader(),
		fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			uniform float flipEnvMap;\n\n			varying vec3 vOutputDirection;\n\n			uniform samplerCube envMap;\n\n			void main() {\n\n				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );\n\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function _getCommonVertexShader() {
	return "\n\n		precision mediump float;\n		precision mediump int;\n\n		attribute float faceIndex;\n\n		varying vec3 vOutputDirection;\n\n		// RH coordinate system; PMREM face-indexing convention\n		vec3 getDirection( vec2 uv, float face ) {\n\n			uv = 2.0 * uv - 1.0;\n\n			vec3 direction = vec3( uv, 1.0 );\n\n			if ( face == 0.0 ) {\n\n				direction = direction.zyx; // ( 1, v, u ) pos x\n\n			} else if ( face == 1.0 ) {\n\n				direction = direction.xzy;\n				direction.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n			} else if ( face == 2.0 ) {\n\n				direction.x *= -1.0; // ( -u, v, 1 ) pos z\n\n			} else if ( face == 3.0 ) {\n\n				direction = direction.zyx;\n				direction.xz *= -1.0; // ( -1, v, -u ) neg x\n\n			} else if ( face == 4.0 ) {\n\n				direction = direction.xzy;\n				direction.xy *= -1.0; // ( -u, -1, v ) neg y\n\n			} else if ( face == 5.0 ) {\n\n				direction.z *= -1.0; // ( u, v, -1 ) neg z\n\n			}\n\n			return direction;\n\n		}\n\n		void main() {\n\n			vOutputDirection = getDirection( uv, faceIndex );\n			gl_Position = vec4( position, 1.0 );\n\n		}\n	";
}
function WebGLCubeUVMaps(w) {
	let T = /* @__PURE__ */ new WeakMap(), O = null;
	function j(j) {
		if (j && j.isTexture) {
			let W = j.mapping, G = W === 303 || W === 304, K = W === 301 || W === 302;
			if (G || K) {
				let W = T.get(j), q = W === void 0 ? 0 : W.texture.pmremVersion;
				if (j.isRenderTargetTexture && j.pmremVersion !== q) return O === null && (O = new PMREMGenerator(w)), W = G ? O.fromEquirectangular(j, W) : O.fromCubemap(j, W), W.texture.pmremVersion = j.pmremVersion, T.set(j, W), W.texture;
				if (W !== void 0) return W.texture;
				{
					let q = j.image;
					return G && q && q.height > 0 || K && q && F(q) ? (O === null && (O = new PMREMGenerator(w)), W = G ? O.fromEquirectangular(j) : O.fromCubemap(j), W.texture.pmremVersion = j.pmremVersion, T.set(j, W), j.addEventListener("dispose", U), W.texture) : null;
				}
			}
		}
		return j;
	}
	function F(w) {
		let T = 0;
		for (let O = 0; O < 6; O++) w[O] !== void 0 && T++;
		return T === 6;
	}
	function U(w) {
		let O = w.target;
		O.removeEventListener("dispose", U);
		let j = T.get(O);
		j !== void 0 && (T.delete(O), j.dispose());
	}
	function W() {
		T = /* @__PURE__ */ new WeakMap(), O !== null && (O.dispose(), O = null);
	}
	return {
		get: j,
		dispose: W
	};
}
function WebGLExtensions(w) {
	let T = {};
	function O(O) {
		if (T[O] !== void 0) return T[O];
		let j = w.getExtension(O);
		return T[O] = j, j;
	}
	return {
		has: function(w) {
			return O(w) !== null;
		},
		init: function() {
			O("EXT_color_buffer_float"), O("WEBGL_clip_cull_distance"), O("OES_texture_float_linear"), O("EXT_color_buffer_half_float"), O("WEBGL_multisampled_render_to_texture"), O("WEBGL_render_shared_exponent");
		},
		get: function(w) {
			let T = O(w);
			return T === null && warnOnce("WebGLRenderer: " + w + " extension not supported."), T;
		}
	};
}
function WebGLGeometries(w, T, O, j) {
	let F = {}, U = /* @__PURE__ */ new WeakMap();
	function W(w) {
		let G = w.target;
		for (let w in G.index !== null && T.remove(G.index), G.attributes) T.remove(G.attributes[w]);
		G.removeEventListener("dispose", W), delete F[G.id];
		let K = U.get(G);
		K && (T.remove(K), U.delete(G)), j.releaseStatesOfGeometry(G), G.isInstancedBufferGeometry === !0 && delete G._maxInstanceCount, O.memory.geometries--;
	}
	function G(w, T) {
		return F[T.id] === !0 ? T : (T.addEventListener("dispose", W), F[T.id] = !0, O.memory.geometries++, T);
	}
	function K(O) {
		let j = O.attributes;
		for (let O in j) T.update(j[O], w.ARRAY_BUFFER);
	}
	function q(w) {
		let O = [], j = w.index, F = w.attributes.position, W = 0;
		if (j !== null) {
			let w = j.array;
			W = j.version;
			for (let T = 0, j = w.length; T < j; T += 3) {
				let j = w[T + 0], F = w[T + 1], U = w[T + 2];
				O.push(j, F, F, U, U, j);
			}
		} else if (F !== void 0) {
			let w = F.array;
			W = F.version;
			for (let T = 0, j = w.length / 3 - 1; T < j; T += 3) {
				let w = T + 0, j = T + 1, F = T + 2;
				O.push(w, j, j, F, F, w);
			}
		} else return;
		let G = new (arrayNeedsUint32(O) ? Uint32BufferAttribute : Uint16BufferAttribute)(O, 1);
		G.version = W;
		let K = U.get(w);
		K && T.remove(K), U.set(w, G);
	}
	function J(w) {
		let T = U.get(w);
		if (T) {
			let O = w.index;
			O !== null && T.version < O.version && q(w);
		} else q(w);
		return U.get(w);
	}
	return {
		get: G,
		update: K,
		getWireframeAttribute: J
	};
}
function WebGLIndexedBufferRenderer(w, T, O) {
	let j;
	function F(w) {
		j = w;
	}
	let U, W;
	function G(w) {
		U = w.type, W = w.bytesPerElement;
	}
	function K(T, F) {
		w.drawElements(j, F, U, T * W), O.update(F, j, 1);
	}
	function q(T, F, G) {
		G !== 0 && (w.drawElementsInstanced(j, F, U, T * W, G), O.update(F, j, G));
	}
	function J(w, F, W) {
		if (W === 0) return;
		T.get("WEBGL_multi_draw").multiDrawElementsWEBGL(j, F, 0, U, w, 0, W);
		let G = 0;
		for (let w = 0; w < W; w++) G += F[w];
		O.update(G, j, 1);
	}
	function Y(w, F, G, K) {
		if (G === 0) return;
		let J = T.get("WEBGL_multi_draw");
		if (J === null) for (let T = 0; T < w.length; T++) q(w[T] / W, F[T], K[T]);
		else {
			J.multiDrawElementsInstancedWEBGL(j, F, 0, U, w, 0, K, 0, G);
			let T = 0;
			for (let w = 0; w < G; w++) T += F[w] * K[w];
			O.update(T, j, 1);
		}
	}
	this.setMode = F, this.setIndex = G, this.render = K, this.renderInstances = q, this.renderMultiDraw = J, this.renderMultiDrawInstances = Y;
}
function WebGLInfo(w) {
	let T = {
		geometries: 0,
		textures: 0
	}, O = {
		frame: 0,
		calls: 0,
		triangles: 0,
		points: 0,
		lines: 0
	};
	function j(T, j, F) {
		switch (O.calls++, j) {
			case w.TRIANGLES:
				O.triangles += F * (T / 3);
				break;
			case w.LINES:
				O.lines += F * (T / 2);
				break;
			case w.LINE_STRIP:
				O.lines += F * (T - 1);
				break;
			case w.LINE_LOOP:
				O.lines += F * T;
				break;
			case w.POINTS:
				O.points += F * T;
				break;
			default:
				error("WebGLInfo: Unknown draw mode:", j);
				break;
		}
	}
	function F() {
		O.calls = 0, O.triangles = 0, O.points = 0, O.lines = 0;
	}
	return {
		memory: T,
		render: O,
		programs: null,
		autoReset: !0,
		reset: F,
		update: j
	};
}
function WebGLMorphtargets(w, T, O) {
	let j = /* @__PURE__ */ new WeakMap(), F = new Vector4();
	function U(U, W, G) {
		let K = U.morphTargetInfluences, q = W.morphAttributes.position || W.morphAttributes.normal || W.morphAttributes.color, J = q === void 0 ? 0 : q.length, Y = j.get(W);
		if (Y === void 0 || Y.count !== J) {
			Y !== void 0 && Y.texture.dispose();
			let w = W.morphAttributes.position !== void 0, O = W.morphAttributes.normal !== void 0, U = W.morphAttributes.color !== void 0, G = W.morphAttributes.position || [], K = W.morphAttributes.normal || [], q = W.morphAttributes.color || [], X = 0;
			w === !0 && (X = 1), O === !0 && (X = 2), U === !0 && (X = 3);
			let Q = W.attributes.position.count * X, xS = 1;
			Q > T.maxTextureSize && (xS = Math.ceil(Q / T.maxTextureSize), Q = T.maxTextureSize);
			let SS = new Float32Array(Q * xS * 4 * J), CS = new DataArrayTexture(SS, Q, xS, J);
			CS.type = FloatType, CS.needsUpdate = !0;
			let wS = X * 4;
			for (let T = 0; T < J; T++) {
				let j = G[T], W = K[T], J = q[T], Y = Q * xS * 4 * T;
				for (let T = 0; T < j.count; T++) {
					let G = T * wS;
					w === !0 && (F.fromBufferAttribute(j, T), SS[Y + G + 0] = F.x, SS[Y + G + 1] = F.y, SS[Y + G + 2] = F.z, SS[Y + G + 3] = 0), O === !0 && (F.fromBufferAttribute(W, T), SS[Y + G + 4] = F.x, SS[Y + G + 5] = F.y, SS[Y + G + 6] = F.z, SS[Y + G + 7] = 0), U === !0 && (F.fromBufferAttribute(J, T), SS[Y + G + 8] = F.x, SS[Y + G + 9] = F.y, SS[Y + G + 10] = F.z, SS[Y + G + 11] = J.itemSize === 4 ? F.w : 1);
				}
			}
			Y = {
				count: J,
				texture: CS,
				size: new Vector2(Q, xS)
			}, j.set(W, Y);
			function TS() {
				CS.dispose(), j.delete(W), W.removeEventListener("dispose", TS);
			}
			W.addEventListener("dispose", TS);
		}
		if (U.isInstancedMesh === !0 && U.morphTexture !== null) G.getUniforms().setValue(w, "morphTexture", U.morphTexture, O);
		else {
			let T = 0;
			for (let w = 0; w < K.length; w++) T += K[w];
			let O = W.morphTargetsRelative ? 1 : 1 - T;
			G.getUniforms().setValue(w, "morphTargetBaseInfluence", O), G.getUniforms().setValue(w, "morphTargetInfluences", K);
		}
		G.getUniforms().setValue(w, "morphTargetsTexture", Y.texture, O), G.getUniforms().setValue(w, "morphTargetsTextureSize", Y.size);
	}
	return { update: U };
}
function WebGLObjects(w, T, O, j) {
	let F = /* @__PURE__ */ new WeakMap();
	function U(U) {
		let W = j.render.frame, K = U.geometry, q = T.get(U, K);
		if (F.get(q) !== W && (T.update(q), F.set(q, W)), U.isInstancedMesh && (U.hasEventListener("dispose", G) === !1 && U.addEventListener("dispose", G), F.get(U) !== W && (O.update(U.instanceMatrix, w.ARRAY_BUFFER), U.instanceColor !== null && O.update(U.instanceColor, w.ARRAY_BUFFER), F.set(U, W))), U.isSkinnedMesh) {
			let w = U.skeleton;
			F.get(w) !== W && (w.update(), F.set(w, W));
		}
		return q;
	}
	function W() {
		F = /* @__PURE__ */ new WeakMap();
	}
	function G(w) {
		let T = w.target;
		T.removeEventListener("dispose", G), O.remove(T.instanceMatrix), T.instanceColor !== null && O.remove(T.instanceColor);
	}
	return {
		update: U,
		dispose: W
	};
}
var toneMappingMap = {
	1: "LINEAR_TONE_MAPPING",
	2: "REINHARD_TONE_MAPPING",
	3: "CINEON_TONE_MAPPING",
	4: "ACES_FILMIC_TONE_MAPPING",
	6: "AGX_TONE_MAPPING",
	7: "NEUTRAL_TONE_MAPPING",
	5: "CUSTOM_TONE_MAPPING"
};
function WebGLOutput(w, T, O, j, F) {
	let U = new WebGLRenderTarget(T, O, {
		type: w,
		depthBuffer: j,
		stencilBuffer: F
	}), W = new WebGLRenderTarget(T, O, {
		type: HalfFloatType,
		depthBuffer: !1,
		stencilBuffer: !1
	}), G = new BufferGeometry();
	G.setAttribute("position", new Float32BufferAttribute([
		-1,
		3,
		0,
		-1,
		-1,
		0,
		3,
		-1,
		0
	], 3)), G.setAttribute("uv", new Float32BufferAttribute([
		0,
		2,
		0,
		0,
		2,
		0
	], 2));
	let K = new RawShaderMaterial({
		uniforms: { tDiffuse: { value: null } },
		vertexShader: "\n			precision highp float;\n\n			uniform mat4 modelViewMatrix;\n			uniform mat4 projectionMatrix;\n\n			attribute vec3 position;\n			attribute vec2 uv;\n\n			varying vec2 vUv;\n\n			void main() {\n				vUv = uv;\n				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n			}",
		fragmentShader: "\n			precision highp float;\n\n			uniform sampler2D tDiffuse;\n\n			varying vec2 vUv;\n\n			#include <tonemapping_pars_fragment>\n			#include <colorspace_pars_fragment>\n\n			void main() {\n				gl_FragColor = texture2D( tDiffuse, vUv );\n\n				#ifdef LINEAR_TONE_MAPPING\n					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );\n				#elif defined( REINHARD_TONE_MAPPING )\n					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );\n				#elif defined( CINEON_TONE_MAPPING )\n					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );\n				#elif defined( ACES_FILMIC_TONE_MAPPING )\n					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n				#elif defined( AGX_TONE_MAPPING )\n					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );\n				#elif defined( NEUTRAL_TONE_MAPPING )\n					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );\n				#elif defined( CUSTOM_TONE_MAPPING )\n					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );\n				#endif\n\n				#ifdef SRGB_TRANSFER\n					gl_FragColor = sRGBTransferOETF( gl_FragColor );\n				#endif\n			}",
		depthTest: !1,
		depthWrite: !1
	}), q = new Mesh(G, K), J = new OrthographicCamera(-1, 1, 1, -1, 0, 1), Y = null, X = null, Q = !1, xS, SS = null, CS = [], wS = !1;
	this.setSize = function(w, T) {
		U.setSize(w, T), W.setSize(w, T);
		for (let O = 0; O < CS.length; O++) {
			let j = CS[O];
			j.setSize && j.setSize(w, T);
		}
	}, this.setEffects = function(w) {
		CS = w, wS = CS.length > 0 && CS[0].isRenderPass === !0;
		let T = U.width, O = U.height;
		for (let w = 0; w < CS.length; w++) {
			let j = CS[w];
			j.setSize && j.setSize(T, O);
		}
	}, this.begin = function(w, T) {
		if (Q || w.toneMapping === 0 && CS.length === 0) return !1;
		if (SS = T, T !== null) {
			let w = T.width, O = T.height;
			(U.width !== w || U.height !== O) && this.setSize(w, O);
		}
		return wS === !1 && w.setRenderTarget(U), xS = w.toneMapping, w.toneMapping = 0, !0;
	}, this.hasRenderPass = function() {
		return wS;
	}, this.end = function(w, T) {
		w.toneMapping = xS, Q = !0;
		let O = U, j = W;
		for (let F = 0; F < CS.length; F++) {
			let U = CS[F];
			if (U.enabled !== !1 && (U.render(w, j, O, T), U.needsSwap !== !1)) {
				let w = O;
				O = j, j = w;
			}
		}
		if (Y !== w.outputColorSpace || X !== w.toneMapping) {
			Y = w.outputColorSpace, X = w.toneMapping, K.defines = {}, ColorManagement.getTransfer(Y) === "srgb" && (K.defines.SRGB_TRANSFER = "");
			let T = toneMappingMap[X];
			T && (K.defines[T] = ""), K.needsUpdate = !0;
		}
		K.uniforms.tDiffuse.value = O.texture, w.setRenderTarget(SS), w.render(q, J), SS = null, Q = !1;
	}, this.isCompositing = function() {
		return Q;
	}, this.dispose = function() {
		U.dispose(), W.dispose(), G.dispose(), K.dispose();
	};
}
var emptyTexture = /* @__PURE__ */ new Texture(), emptyShadowTexture = /* @__PURE__ */ new DepthTexture(1, 1), emptyArrayTexture = /* @__PURE__ */ new DataArrayTexture(), empty3dTexture = /* @__PURE__ */ new Data3DTexture(), emptyCubeTexture = /* @__PURE__ */ new CubeTexture(), arrayCacheF32 = [], arrayCacheI32 = [], mat4array = new Float32Array(16), mat3array = new Float32Array(9), mat2array = new Float32Array(4);
function flatten(w, T, O) {
	let j = w[0];
	if (j <= 0 || j > 0) return w;
	let F = T * O, U = arrayCacheF32[F];
	if (U === void 0 && (U = new Float32Array(F), arrayCacheF32[F] = U), T !== 0) {
		j.toArray(U, 0);
		for (let j = 1, F = 0; j !== T; ++j) F += O, w[j].toArray(U, F);
	}
	return U;
}
function arraysEqual(w, T) {
	if (w.length !== T.length) return !1;
	for (let O = 0, j = w.length; O < j; O++) if (w[O] !== T[O]) return !1;
	return !0;
}
function copyArray(w, T) {
	for (let O = 0, j = T.length; O < j; O++) w[O] = T[O];
}
function allocTexUnits(w, T) {
	let O = arrayCacheI32[T];
	O === void 0 && (O = new Int32Array(T), arrayCacheI32[T] = O);
	for (let j = 0; j !== T; ++j) O[j] = w.allocateTextureUnit();
	return O;
}
function setValueV1f(w, T) {
	let O = this.cache;
	O[0] !== T && (w.uniform1f(this.addr, T), O[0] = T);
}
function setValueV2f(w, T) {
	let O = this.cache;
	if (T.x !== void 0) (O[0] !== T.x || O[1] !== T.y) && (w.uniform2f(this.addr, T.x, T.y), O[0] = T.x, O[1] = T.y);
	else {
		if (arraysEqual(O, T)) return;
		w.uniform2fv(this.addr, T), copyArray(O, T);
	}
}
function setValueV3f(w, T) {
	let O = this.cache;
	if (T.x !== void 0) (O[0] !== T.x || O[1] !== T.y || O[2] !== T.z) && (w.uniform3f(this.addr, T.x, T.y, T.z), O[0] = T.x, O[1] = T.y, O[2] = T.z);
	else if (T.r !== void 0) (O[0] !== T.r || O[1] !== T.g || O[2] !== T.b) && (w.uniform3f(this.addr, T.r, T.g, T.b), O[0] = T.r, O[1] = T.g, O[2] = T.b);
	else {
		if (arraysEqual(O, T)) return;
		w.uniform3fv(this.addr, T), copyArray(O, T);
	}
}
function setValueV4f(w, T) {
	let O = this.cache;
	if (T.x !== void 0) (O[0] !== T.x || O[1] !== T.y || O[2] !== T.z || O[3] !== T.w) && (w.uniform4f(this.addr, T.x, T.y, T.z, T.w), O[0] = T.x, O[1] = T.y, O[2] = T.z, O[3] = T.w);
	else {
		if (arraysEqual(O, T)) return;
		w.uniform4fv(this.addr, T), copyArray(O, T);
	}
}
function setValueM2(w, T) {
	let O = this.cache, j = T.elements;
	if (j === void 0) {
		if (arraysEqual(O, T)) return;
		w.uniformMatrix2fv(this.addr, !1, T), copyArray(O, T);
	} else {
		if (arraysEqual(O, j)) return;
		mat2array.set(j), w.uniformMatrix2fv(this.addr, !1, mat2array), copyArray(O, j);
	}
}
function setValueM3(w, T) {
	let O = this.cache, j = T.elements;
	if (j === void 0) {
		if (arraysEqual(O, T)) return;
		w.uniformMatrix3fv(this.addr, !1, T), copyArray(O, T);
	} else {
		if (arraysEqual(O, j)) return;
		mat3array.set(j), w.uniformMatrix3fv(this.addr, !1, mat3array), copyArray(O, j);
	}
}
function setValueM4(w, T) {
	let O = this.cache, j = T.elements;
	if (j === void 0) {
		if (arraysEqual(O, T)) return;
		w.uniformMatrix4fv(this.addr, !1, T), copyArray(O, T);
	} else {
		if (arraysEqual(O, j)) return;
		mat4array.set(j), w.uniformMatrix4fv(this.addr, !1, mat4array), copyArray(O, j);
	}
}
function setValueV1i(w, T) {
	let O = this.cache;
	O[0] !== T && (w.uniform1i(this.addr, T), O[0] = T);
}
function setValueV2i(w, T) {
	let O = this.cache;
	if (T.x !== void 0) (O[0] !== T.x || O[1] !== T.y) && (w.uniform2i(this.addr, T.x, T.y), O[0] = T.x, O[1] = T.y);
	else {
		if (arraysEqual(O, T)) return;
		w.uniform2iv(this.addr, T), copyArray(O, T);
	}
}
function setValueV3i(w, T) {
	let O = this.cache;
	if (T.x !== void 0) (O[0] !== T.x || O[1] !== T.y || O[2] !== T.z) && (w.uniform3i(this.addr, T.x, T.y, T.z), O[0] = T.x, O[1] = T.y, O[2] = T.z);
	else {
		if (arraysEqual(O, T)) return;
		w.uniform3iv(this.addr, T), copyArray(O, T);
	}
}
function setValueV4i(w, T) {
	let O = this.cache;
	if (T.x !== void 0) (O[0] !== T.x || O[1] !== T.y || O[2] !== T.z || O[3] !== T.w) && (w.uniform4i(this.addr, T.x, T.y, T.z, T.w), O[0] = T.x, O[1] = T.y, O[2] = T.z, O[3] = T.w);
	else {
		if (arraysEqual(O, T)) return;
		w.uniform4iv(this.addr, T), copyArray(O, T);
	}
}
function setValueV1ui(w, T) {
	let O = this.cache;
	O[0] !== T && (w.uniform1ui(this.addr, T), O[0] = T);
}
function setValueV2ui(w, T) {
	let O = this.cache;
	if (T.x !== void 0) (O[0] !== T.x || O[1] !== T.y) && (w.uniform2ui(this.addr, T.x, T.y), O[0] = T.x, O[1] = T.y);
	else {
		if (arraysEqual(O, T)) return;
		w.uniform2uiv(this.addr, T), copyArray(O, T);
	}
}
function setValueV3ui(w, T) {
	let O = this.cache;
	if (T.x !== void 0) (O[0] !== T.x || O[1] !== T.y || O[2] !== T.z) && (w.uniform3ui(this.addr, T.x, T.y, T.z), O[0] = T.x, O[1] = T.y, O[2] = T.z);
	else {
		if (arraysEqual(O, T)) return;
		w.uniform3uiv(this.addr, T), copyArray(O, T);
	}
}
function setValueV4ui(w, T) {
	let O = this.cache;
	if (T.x !== void 0) (O[0] !== T.x || O[1] !== T.y || O[2] !== T.z || O[3] !== T.w) && (w.uniform4ui(this.addr, T.x, T.y, T.z, T.w), O[0] = T.x, O[1] = T.y, O[2] = T.z, O[3] = T.w);
	else {
		if (arraysEqual(O, T)) return;
		w.uniform4uiv(this.addr, T), copyArray(O, T);
	}
}
function setValueT1(w, T, O) {
	let j = this.cache, F = O.allocateTextureUnit();
	j[0] !== F && (w.uniform1i(this.addr, F), j[0] = F);
	let U;
	this.type === w.SAMPLER_2D_SHADOW ? (emptyShadowTexture.compareFunction = O.isReversedDepthBuffer() ? 518 : 515, U = emptyShadowTexture) : U = emptyTexture, O.setTexture2D(T || U, F);
}
function setValueT3D1(w, T, O) {
	let j = this.cache, F = O.allocateTextureUnit();
	j[0] !== F && (w.uniform1i(this.addr, F), j[0] = F), O.setTexture3D(T || empty3dTexture, F);
}
function setValueT6(w, T, O) {
	let j = this.cache, F = O.allocateTextureUnit();
	j[0] !== F && (w.uniform1i(this.addr, F), j[0] = F), O.setTextureCube(T || emptyCubeTexture, F);
}
function setValueT2DArray1(w, T, O) {
	let j = this.cache, F = O.allocateTextureUnit();
	j[0] !== F && (w.uniform1i(this.addr, F), j[0] = F), O.setTexture2DArray(T || emptyArrayTexture, F);
}
function getSingularSetter(w) {
	switch (w) {
		case 5126: return setValueV1f;
		case 35664: return setValueV2f;
		case 35665: return setValueV3f;
		case 35666: return setValueV4f;
		case 35674: return setValueM2;
		case 35675: return setValueM3;
		case 35676: return setValueM4;
		case 5124:
		case 35670: return setValueV1i;
		case 35667:
		case 35671: return setValueV2i;
		case 35668:
		case 35672: return setValueV3i;
		case 35669:
		case 35673: return setValueV4i;
		case 5125: return setValueV1ui;
		case 36294: return setValueV2ui;
		case 36295: return setValueV3ui;
		case 36296: return setValueV4ui;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682: return setValueT1;
		case 35679:
		case 36299:
		case 36307: return setValueT3D1;
		case 35680:
		case 36300:
		case 36308:
		case 36293: return setValueT6;
		case 36289:
		case 36303:
		case 36311:
		case 36292: return setValueT2DArray1;
	}
}
function setValueV1fArray(w, T) {
	w.uniform1fv(this.addr, T);
}
function setValueV2fArray(w, T) {
	let O = flatten(T, this.size, 2);
	w.uniform2fv(this.addr, O);
}
function setValueV3fArray(w, T) {
	let O = flatten(T, this.size, 3);
	w.uniform3fv(this.addr, O);
}
function setValueV4fArray(w, T) {
	let O = flatten(T, this.size, 4);
	w.uniform4fv(this.addr, O);
}
function setValueM2Array(w, T) {
	let O = flatten(T, this.size, 4);
	w.uniformMatrix2fv(this.addr, !1, O);
}
function setValueM3Array(w, T) {
	let O = flatten(T, this.size, 9);
	w.uniformMatrix3fv(this.addr, !1, O);
}
function setValueM4Array(w, T) {
	let O = flatten(T, this.size, 16);
	w.uniformMatrix4fv(this.addr, !1, O);
}
function setValueV1iArray(w, T) {
	w.uniform1iv(this.addr, T);
}
function setValueV2iArray(w, T) {
	w.uniform2iv(this.addr, T);
}
function setValueV3iArray(w, T) {
	w.uniform3iv(this.addr, T);
}
function setValueV4iArray(w, T) {
	w.uniform4iv(this.addr, T);
}
function setValueV1uiArray(w, T) {
	w.uniform1uiv(this.addr, T);
}
function setValueV2uiArray(w, T) {
	w.uniform2uiv(this.addr, T);
}
function setValueV3uiArray(w, T) {
	w.uniform3uiv(this.addr, T);
}
function setValueV4uiArray(w, T) {
	w.uniform4uiv(this.addr, T);
}
function setValueT1Array(w, T, O) {
	let j = this.cache, F = T.length, U = allocTexUnits(O, F);
	arraysEqual(j, U) || (w.uniform1iv(this.addr, U), copyArray(j, U));
	let W;
	W = this.type === w.SAMPLER_2D_SHADOW ? emptyShadowTexture : emptyTexture;
	for (let w = 0; w !== F; ++w) O.setTexture2D(T[w] || W, U[w]);
}
function setValueT3DArray(w, T, O) {
	let j = this.cache, F = T.length, U = allocTexUnits(O, F);
	arraysEqual(j, U) || (w.uniform1iv(this.addr, U), copyArray(j, U));
	for (let w = 0; w !== F; ++w) O.setTexture3D(T[w] || empty3dTexture, U[w]);
}
function setValueT6Array(w, T, O) {
	let j = this.cache, F = T.length, U = allocTexUnits(O, F);
	arraysEqual(j, U) || (w.uniform1iv(this.addr, U), copyArray(j, U));
	for (let w = 0; w !== F; ++w) O.setTextureCube(T[w] || emptyCubeTexture, U[w]);
}
function setValueT2DArrayArray(w, T, O) {
	let j = this.cache, F = T.length, U = allocTexUnits(O, F);
	arraysEqual(j, U) || (w.uniform1iv(this.addr, U), copyArray(j, U));
	for (let w = 0; w !== F; ++w) O.setTexture2DArray(T[w] || emptyArrayTexture, U[w]);
}
function getPureArraySetter(w) {
	switch (w) {
		case 5126: return setValueV1fArray;
		case 35664: return setValueV2fArray;
		case 35665: return setValueV3fArray;
		case 35666: return setValueV4fArray;
		case 35674: return setValueM2Array;
		case 35675: return setValueM3Array;
		case 35676: return setValueM4Array;
		case 5124:
		case 35670: return setValueV1iArray;
		case 35667:
		case 35671: return setValueV2iArray;
		case 35668:
		case 35672: return setValueV3iArray;
		case 35669:
		case 35673: return setValueV4iArray;
		case 5125: return setValueV1uiArray;
		case 36294: return setValueV2uiArray;
		case 36295: return setValueV3uiArray;
		case 36296: return setValueV4uiArray;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682: return setValueT1Array;
		case 35679:
		case 36299:
		case 36307: return setValueT3DArray;
		case 35680:
		case 36300:
		case 36308:
		case 36293: return setValueT6Array;
		case 36289:
		case 36303:
		case 36311:
		case 36292: return setValueT2DArrayArray;
	}
}
var SingleUniform = class {
	constructor(w, T, O) {
		this.id = w, this.addr = O, this.cache = [], this.type = T.type, this.setValue = getSingularSetter(T.type);
	}
}, PureArrayUniform = class {
	constructor(w, T, O) {
		this.id = w, this.addr = O, this.cache = [], this.type = T.type, this.size = T.size, this.setValue = getPureArraySetter(T.type);
	}
}, StructuredUniform = class {
	constructor(w) {
		this.id = w, this.seq = [], this.map = {};
	}
	setValue(w, T, O) {
		let j = this.seq;
		for (let F = 0, U = j.length; F !== U; ++F) {
			let U = j[F];
			U.setValue(w, T[U.id], O);
		}
	}
}, RePathPart = /(\w+)(\])?(\[|\.)?/g;
function addUniform(w, T) {
	w.seq.push(T), w.map[T.id] = T;
}
function parseUniform(w, T, O) {
	let j = w.name, F = j.length;
	for (RePathPart.lastIndex = 0;;) {
		let U = RePathPart.exec(j), W = RePathPart.lastIndex, G = U[1], K = U[2] === "]", q = U[3];
		if (K && (G |= 0), q === void 0 || q === "[" && W + 2 === F) {
			addUniform(O, q === void 0 ? new SingleUniform(G, w, T) : new PureArrayUniform(G, w, T));
			break;
		} else {
			let w = O.map[G];
			w === void 0 && (w = new StructuredUniform(G), addUniform(O, w)), O = w;
		}
	}
}
var WebGLUniforms = class {
	constructor(w, T) {
		this.seq = [], this.map = {};
		let O = w.getProgramParameter(T, w.ACTIVE_UNIFORMS);
		for (let j = 0; j < O; ++j) {
			let O = w.getActiveUniform(T, j);
			parseUniform(O, w.getUniformLocation(T, O.name), this);
		}
		let j = [], F = [];
		for (let T of this.seq) T.type === w.SAMPLER_2D_SHADOW || T.type === w.SAMPLER_CUBE_SHADOW || T.type === w.SAMPLER_2D_ARRAY_SHADOW ? j.push(T) : F.push(T);
		j.length > 0 && (this.seq = j.concat(F));
	}
	setValue(w, T, O, j) {
		let F = this.map[T];
		F !== void 0 && F.setValue(w, O, j);
	}
	setOptional(w, T, O) {
		let j = T[O];
		j !== void 0 && this.setValue(w, O, j);
	}
	static upload(w, T, O, j) {
		for (let F = 0, U = T.length; F !== U; ++F) {
			let U = T[F], W = O[U.id];
			W.needsUpdate !== !1 && U.setValue(w, W.value, j);
		}
	}
	static seqWithValue(w, T) {
		let O = [];
		for (let j = 0, F = w.length; j !== F; ++j) {
			let F = w[j];
			F.id in T && O.push(F);
		}
		return O;
	}
};
function WebGLShader(w, T, O) {
	let j = w.createShader(T);
	return w.shaderSource(j, O), w.compileShader(j), j;
}
var COMPLETION_STATUS_KHR = 37297, programIdCount = 0;
function handleSource(w, T) {
	let O = w.split("\n"), j = [], F = Math.max(T - 6, 0), U = Math.min(T + 6, O.length);
	for (let w = F; w < U; w++) {
		let F = w + 1;
		j.push(`${F === T ? ">" : " "} ${F}: ${O[w]}`);
	}
	return j.join("\n");
}
var _m0 = /* @__PURE__ */ new Matrix3();
function getEncodingComponents(w) {
	ColorManagement._getMatrix(_m0, ColorManagement.workingColorSpace, w);
	let T = `mat3( ${_m0.elements.map((w) => w.toFixed(4))} )`;
	switch (ColorManagement.getTransfer(w)) {
		case LinearTransfer: return [T, "LinearTransferOETF"];
		case SRGBTransfer: return [T, "sRGBTransferOETF"];
		default: return warn("WebGLProgram: Unsupported color space: ", w), [T, "LinearTransferOETF"];
	}
}
function getShaderErrors(w, T, O) {
	let j = w.getShaderParameter(T, w.COMPILE_STATUS), F = (w.getShaderInfoLog(T) || "").trim();
	if (j && F === "") return "";
	let U = /ERROR: 0:(\d+)/.exec(F);
	if (U) {
		let j = parseInt(U[1]);
		return O.toUpperCase() + "\n\n" + F + "\n\n" + handleSource(w.getShaderSource(T), j);
	} else return F;
}
function getTexelEncodingFunction(w, T) {
	let O = getEncodingComponents(T);
	return [
		`vec4 ${w}( vec4 value ) {`,
		`	return ${O[1]}( vec4( value.rgb * ${O[0]}, value.a ) );`,
		"}"
	].join("\n");
}
var toneMappingFunctions = {
	1: "Linear",
	2: "Reinhard",
	3: "Cineon",
	4: "ACESFilmic",
	6: "AgX",
	7: "Neutral",
	5: "Custom"
};
function getToneMappingFunction(w, T) {
	let O = toneMappingFunctions[T];
	return O === void 0 ? (warn("WebGLProgram: Unsupported toneMapping:", T), "vec3 " + w + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + w + "( vec3 color ) { return " + O + "ToneMapping( color ); }";
}
var _v0 = /* @__PURE__ */ new Vector3();
function getLuminanceFunction() {
	return ColorManagement.getLuminanceCoefficients(_v0), [
		"float luminance( const in vec3 rgb ) {",
		`	const vec3 weights = vec3( ${_v0.x.toFixed(4)}, ${_v0.y.toFixed(4)}, ${_v0.z.toFixed(4)} );`,
		"	return dot( weights, rgb );",
		"}"
	].join("\n");
}
function generateVertexExtensions(w) {
	return [w.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", w.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(filterEmptyLine).join("\n");
}
function generateDefines(w) {
	let T = [];
	for (let O in w) {
		let j = w[O];
		j !== !1 && T.push("#define " + O + " " + j);
	}
	return T.join("\n");
}
function fetchAttributeLocations(w, T) {
	let O = {}, j = w.getProgramParameter(T, w.ACTIVE_ATTRIBUTES);
	for (let F = 0; F < j; F++) {
		let j = w.getActiveAttrib(T, F), U = j.name, W = 1;
		j.type === w.FLOAT_MAT2 && (W = 2), j.type === w.FLOAT_MAT3 && (W = 3), j.type === w.FLOAT_MAT4 && (W = 4), O[U] = {
			type: j.type,
			location: w.getAttribLocation(T, U),
			locationSize: W
		};
	}
	return O;
}
function filterEmptyLine(w) {
	return w !== "";
}
function replaceLightNums(w, T) {
	let O = T.numSpotLightShadows + T.numSpotLightMaps - T.numSpotLightShadowsWithMaps;
	return w.replace(/NUM_DIR_LIGHTS/g, T.numDirLights).replace(/NUM_SPOT_LIGHTS/g, T.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, T.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, O).replace(/NUM_RECT_AREA_LIGHTS/g, T.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, T.numPointLights).replace(/NUM_HEMI_LIGHTS/g, T.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, T.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, T.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, T.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, T.numPointLightShadows);
}
function replaceClippingPlaneNums(w, T) {
	return w.replace(/NUM_CLIPPING_PLANES/g, T.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, T.numClippingPlanes - T.numClipIntersection);
}
var includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
function resolveIncludes(w) {
	return w.replace(includePattern, includeReplacer);
}
var shaderChunkMap = /* @__PURE__ */ new Map();
function includeReplacer(w, T) {
	let O = ShaderChunk[T];
	if (O === void 0) {
		let w = shaderChunkMap.get(T);
		if (w !== void 0) O = ShaderChunk[w], warn("WebGLRenderer: Shader chunk \"%s\" has been deprecated. Use \"%s\" instead.", T, w);
		else throw Error("Can not resolve #include <" + T + ">");
	}
	return resolveIncludes(O);
}
var unrollLoopPattern = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function unrollLoops(w) {
	return w.replace(unrollLoopPattern, loopReplacer);
}
function loopReplacer(w, T, O, j) {
	let F = "";
	for (let w = parseInt(T); w < parseInt(O); w++) F += j.replace(/\[\s*i\s*\]/g, "[ " + w + " ]").replace(/UNROLLED_LOOP_INDEX/g, w);
	return F;
}
function generatePrecision(w) {
	let T = `precision ${w.precision} float;
	precision ${w.precision} int;
	precision ${w.precision} sampler2D;
	precision ${w.precision} samplerCube;
	precision ${w.precision} sampler3D;
	precision ${w.precision} sampler2DArray;
	precision ${w.precision} sampler2DShadow;
	precision ${w.precision} samplerCubeShadow;
	precision ${w.precision} sampler2DArrayShadow;
	precision ${w.precision} isampler2D;
	precision ${w.precision} isampler3D;
	precision ${w.precision} isamplerCube;
	precision ${w.precision} isampler2DArray;
	precision ${w.precision} usampler2D;
	precision ${w.precision} usampler3D;
	precision ${w.precision} usamplerCube;
	precision ${w.precision} usampler2DArray;
	`;
	return w.precision === "highp" ? T += "\n#define HIGH_PRECISION" : w.precision === "mediump" ? T += "\n#define MEDIUM_PRECISION" : w.precision === "lowp" && (T += "\n#define LOW_PRECISION"), T;
}
var shadowMapTypeDefines = {
	1: "SHADOWMAP_TYPE_PCF",
	3: "SHADOWMAP_TYPE_VSM"
};
function generateShadowMapTypeDefine(w) {
	return shadowMapTypeDefines[w.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
var envMapTypeDefines = {
	301: "ENVMAP_TYPE_CUBE",
	302: "ENVMAP_TYPE_CUBE",
	306: "ENVMAP_TYPE_CUBE_UV"
};
function generateEnvMapTypeDefine(w) {
	return w.envMap === !1 ? "ENVMAP_TYPE_CUBE" : envMapTypeDefines[w.envMapMode] || "ENVMAP_TYPE_CUBE";
}
var envMapModeDefines = { 302: "ENVMAP_MODE_REFRACTION" };
function generateEnvMapModeDefine(w) {
	return w.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : envMapModeDefines[w.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
var envMapBlendingDefines = {
	0: "ENVMAP_BLENDING_MULTIPLY",
	1: "ENVMAP_BLENDING_MIX",
	2: "ENVMAP_BLENDING_ADD"
};
function generateEnvMapBlendingDefine(w) {
	return w.envMap === !1 ? "ENVMAP_BLENDING_NONE" : envMapBlendingDefines[w.combine] || "ENVMAP_BLENDING_NONE";
}
function generateCubeUVSize(w) {
	let T = w.envMapCubeUVHeight;
	if (T === null) return null;
	let O = Math.log2(T) - 2, j = 1 / T;
	return {
		texelWidth: 1 / (3 * Math.max(2 ** O, 112)),
		texelHeight: j,
		maxMip: O
	};
}
function WebGLProgram(w, T, O, j) {
	let F = w.getContext(), U = O.defines, W = O.vertexShader, G = O.fragmentShader, K = generateShadowMapTypeDefine(O), q = generateEnvMapTypeDefine(O), J = generateEnvMapModeDefine(O), Y = generateEnvMapBlendingDefine(O), X = generateCubeUVSize(O), Q = generateVertexExtensions(O), xS = generateDefines(U), SS = F.createProgram(), CS, wS, TS = O.glslVersion ? "#version " + O.glslVersion + "\n" : "";
	O.isRawShaderMaterial ? (CS = [
		"#define SHADER_TYPE " + O.shaderType,
		"#define SHADER_NAME " + O.shaderName,
		xS
	].filter(filterEmptyLine).join("\n"), CS.length > 0 && (CS += "\n"), wS = [
		"#define SHADER_TYPE " + O.shaderType,
		"#define SHADER_NAME " + O.shaderName,
		xS
	].filter(filterEmptyLine).join("\n"), wS.length > 0 && (wS += "\n")) : (CS = [
		generatePrecision(O),
		"#define SHADER_TYPE " + O.shaderType,
		"#define SHADER_NAME " + O.shaderName,
		xS,
		O.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
		O.batching ? "#define USE_BATCHING" : "",
		O.batchingColor ? "#define USE_BATCHING_COLOR" : "",
		O.instancing ? "#define USE_INSTANCING" : "",
		O.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
		O.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
		O.useFog && O.fog ? "#define USE_FOG" : "",
		O.useFog && O.fogExp2 ? "#define FOG_EXP2" : "",
		O.map ? "#define USE_MAP" : "",
		O.envMap ? "#define USE_ENVMAP" : "",
		O.envMap ? "#define " + J : "",
		O.lightMap ? "#define USE_LIGHTMAP" : "",
		O.aoMap ? "#define USE_AOMAP" : "",
		O.bumpMap ? "#define USE_BUMPMAP" : "",
		O.normalMap ? "#define USE_NORMALMAP" : "",
		O.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
		O.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
		O.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
		O.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
		O.anisotropy ? "#define USE_ANISOTROPY" : "",
		O.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
		O.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
		O.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
		O.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
		O.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
		O.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
		O.specularMap ? "#define USE_SPECULARMAP" : "",
		O.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
		O.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
		O.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
		O.metalnessMap ? "#define USE_METALNESSMAP" : "",
		O.alphaMap ? "#define USE_ALPHAMAP" : "",
		O.alphaHash ? "#define USE_ALPHAHASH" : "",
		O.transmission ? "#define USE_TRANSMISSION" : "",
		O.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
		O.thicknessMap ? "#define USE_THICKNESSMAP" : "",
		O.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
		O.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
		O.mapUv ? "#define MAP_UV " + O.mapUv : "",
		O.alphaMapUv ? "#define ALPHAMAP_UV " + O.alphaMapUv : "",
		O.lightMapUv ? "#define LIGHTMAP_UV " + O.lightMapUv : "",
		O.aoMapUv ? "#define AOMAP_UV " + O.aoMapUv : "",
		O.emissiveMapUv ? "#define EMISSIVEMAP_UV " + O.emissiveMapUv : "",
		O.bumpMapUv ? "#define BUMPMAP_UV " + O.bumpMapUv : "",
		O.normalMapUv ? "#define NORMALMAP_UV " + O.normalMapUv : "",
		O.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + O.displacementMapUv : "",
		O.metalnessMapUv ? "#define METALNESSMAP_UV " + O.metalnessMapUv : "",
		O.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + O.roughnessMapUv : "",
		O.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + O.anisotropyMapUv : "",
		O.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + O.clearcoatMapUv : "",
		O.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + O.clearcoatNormalMapUv : "",
		O.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + O.clearcoatRoughnessMapUv : "",
		O.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + O.iridescenceMapUv : "",
		O.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + O.iridescenceThicknessMapUv : "",
		O.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + O.sheenColorMapUv : "",
		O.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + O.sheenRoughnessMapUv : "",
		O.specularMapUv ? "#define SPECULARMAP_UV " + O.specularMapUv : "",
		O.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + O.specularColorMapUv : "",
		O.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + O.specularIntensityMapUv : "",
		O.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + O.transmissionMapUv : "",
		O.thicknessMapUv ? "#define THICKNESSMAP_UV " + O.thicknessMapUv : "",
		O.vertexTangents && O.flatShading === !1 ? "#define USE_TANGENT" : "",
		O.vertexColors ? "#define USE_COLOR" : "",
		O.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
		O.vertexUv1s ? "#define USE_UV1" : "",
		O.vertexUv2s ? "#define USE_UV2" : "",
		O.vertexUv3s ? "#define USE_UV3" : "",
		O.pointsUvs ? "#define USE_POINTS_UV" : "",
		O.flatShading ? "#define FLAT_SHADED" : "",
		O.skinning ? "#define USE_SKINNING" : "",
		O.morphTargets ? "#define USE_MORPHTARGETS" : "",
		O.morphNormals && O.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
		O.morphColors ? "#define USE_MORPHCOLORS" : "",
		O.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + O.morphTextureStride : "",
		O.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + O.morphTargetsCount : "",
		O.doubleSided ? "#define DOUBLE_SIDED" : "",
		O.flipSided ? "#define FLIP_SIDED" : "",
		O.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
		O.shadowMapEnabled ? "#define " + K : "",
		O.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
		O.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
		O.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
		O.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
		"uniform mat4 modelMatrix;",
		"uniform mat4 modelViewMatrix;",
		"uniform mat4 projectionMatrix;",
		"uniform mat4 viewMatrix;",
		"uniform mat3 normalMatrix;",
		"uniform vec3 cameraPosition;",
		"uniform bool isOrthographic;",
		"#ifdef USE_INSTANCING",
		"	attribute mat4 instanceMatrix;",
		"#endif",
		"#ifdef USE_INSTANCING_COLOR",
		"	attribute vec3 instanceColor;",
		"#endif",
		"#ifdef USE_INSTANCING_MORPH",
		"	uniform sampler2D morphTexture;",
		"#endif",
		"attribute vec3 position;",
		"attribute vec3 normal;",
		"attribute vec2 uv;",
		"#ifdef USE_UV1",
		"	attribute vec2 uv1;",
		"#endif",
		"#ifdef USE_UV2",
		"	attribute vec2 uv2;",
		"#endif",
		"#ifdef USE_UV3",
		"	attribute vec2 uv3;",
		"#endif",
		"#ifdef USE_TANGENT",
		"	attribute vec4 tangent;",
		"#endif",
		"#if defined( USE_COLOR_ALPHA )",
		"	attribute vec4 color;",
		"#elif defined( USE_COLOR )",
		"	attribute vec3 color;",
		"#endif",
		"#ifdef USE_SKINNING",
		"	attribute vec4 skinIndex;",
		"	attribute vec4 skinWeight;",
		"#endif",
		"\n"
	].filter(filterEmptyLine).join("\n"), wS = [
		generatePrecision(O),
		"#define SHADER_TYPE " + O.shaderType,
		"#define SHADER_NAME " + O.shaderName,
		xS,
		O.useFog && O.fog ? "#define USE_FOG" : "",
		O.useFog && O.fogExp2 ? "#define FOG_EXP2" : "",
		O.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
		O.map ? "#define USE_MAP" : "",
		O.matcap ? "#define USE_MATCAP" : "",
		O.envMap ? "#define USE_ENVMAP" : "",
		O.envMap ? "#define " + q : "",
		O.envMap ? "#define " + J : "",
		O.envMap ? "#define " + Y : "",
		X ? "#define CUBEUV_TEXEL_WIDTH " + X.texelWidth : "",
		X ? "#define CUBEUV_TEXEL_HEIGHT " + X.texelHeight : "",
		X ? "#define CUBEUV_MAX_MIP " + X.maxMip + ".0" : "",
		O.lightMap ? "#define USE_LIGHTMAP" : "",
		O.aoMap ? "#define USE_AOMAP" : "",
		O.bumpMap ? "#define USE_BUMPMAP" : "",
		O.normalMap ? "#define USE_NORMALMAP" : "",
		O.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
		O.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
		O.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
		O.anisotropy ? "#define USE_ANISOTROPY" : "",
		O.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
		O.clearcoat ? "#define USE_CLEARCOAT" : "",
		O.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
		O.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
		O.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
		O.dispersion ? "#define USE_DISPERSION" : "",
		O.iridescence ? "#define USE_IRIDESCENCE" : "",
		O.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
		O.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
		O.specularMap ? "#define USE_SPECULARMAP" : "",
		O.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
		O.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
		O.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
		O.metalnessMap ? "#define USE_METALNESSMAP" : "",
		O.alphaMap ? "#define USE_ALPHAMAP" : "",
		O.alphaTest ? "#define USE_ALPHATEST" : "",
		O.alphaHash ? "#define USE_ALPHAHASH" : "",
		O.sheen ? "#define USE_SHEEN" : "",
		O.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
		O.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
		O.transmission ? "#define USE_TRANSMISSION" : "",
		O.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
		O.thicknessMap ? "#define USE_THICKNESSMAP" : "",
		O.vertexTangents && O.flatShading === !1 ? "#define USE_TANGENT" : "",
		O.vertexColors || O.instancingColor || O.batchingColor ? "#define USE_COLOR" : "",
		O.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
		O.vertexUv1s ? "#define USE_UV1" : "",
		O.vertexUv2s ? "#define USE_UV2" : "",
		O.vertexUv3s ? "#define USE_UV3" : "",
		O.pointsUvs ? "#define USE_POINTS_UV" : "",
		O.gradientMap ? "#define USE_GRADIENTMAP" : "",
		O.flatShading ? "#define FLAT_SHADED" : "",
		O.doubleSided ? "#define DOUBLE_SIDED" : "",
		O.flipSided ? "#define FLIP_SIDED" : "",
		O.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
		O.shadowMapEnabled ? "#define " + K : "",
		O.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
		O.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
		O.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
		O.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
		O.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
		O.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
		"uniform mat4 viewMatrix;",
		"uniform vec3 cameraPosition;",
		"uniform bool isOrthographic;",
		O.toneMapping === 0 ? "" : "#define TONE_MAPPING",
		O.toneMapping === 0 ? "" : ShaderChunk.tonemapping_pars_fragment,
		O.toneMapping === 0 ? "" : getToneMappingFunction("toneMapping", O.toneMapping),
		O.dithering ? "#define DITHERING" : "",
		O.opaque ? "#define OPAQUE" : "",
		ShaderChunk.colorspace_pars_fragment,
		getTexelEncodingFunction("linearToOutputTexel", O.outputColorSpace),
		getLuminanceFunction(),
		O.useDepthPacking ? "#define DEPTH_PACKING " + O.depthPacking : "",
		"\n"
	].filter(filterEmptyLine).join("\n")), W = resolveIncludes(W), W = replaceLightNums(W, O), W = replaceClippingPlaneNums(W, O), G = resolveIncludes(G), G = replaceLightNums(G, O), G = replaceClippingPlaneNums(G, O), W = unrollLoops(W), G = unrollLoops(G), O.isRawShaderMaterial !== !0 && (TS = "#version 300 es\n", CS = [
		Q,
		"#define attribute in",
		"#define varying out",
		"#define texture2D texture"
	].join("\n") + "\n" + CS, wS = [
		"#define varying in",
		O.glslVersion === "300 es" ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
		O.glslVersion === "300 es" ? "" : "#define gl_FragColor pc_fragColor",
		"#define gl_FragDepthEXT gl_FragDepth",
		"#define texture2D texture",
		"#define textureCube texture",
		"#define texture2DProj textureProj",
		"#define texture2DLodEXT textureLod",
		"#define texture2DProjLodEXT textureProjLod",
		"#define textureCubeLodEXT textureLod",
		"#define texture2DGradEXT textureGrad",
		"#define texture2DProjGradEXT textureProjGrad",
		"#define textureCubeGradEXT textureGrad"
	].join("\n") + "\n" + wS);
	let ES = TS + CS + W, DS = TS + wS + G, OS = WebGLShader(F, F.VERTEX_SHADER, ES), kS = WebGLShader(F, F.FRAGMENT_SHADER, DS);
	F.attachShader(SS, OS), F.attachShader(SS, kS), O.index0AttributeName === void 0 ? O.morphTargets === !0 && F.bindAttribLocation(SS, 0, "position") : F.bindAttribLocation(SS, 0, O.index0AttributeName), F.linkProgram(SS);
	function AS(T) {
		if (w.debug.checkShaderErrors) {
			let O = F.getProgramInfoLog(SS) || "", j = F.getShaderInfoLog(OS) || "", U = F.getShaderInfoLog(kS) || "", W = O.trim(), G = j.trim(), K = U.trim(), q = !0, J = !0;
			if (F.getProgramParameter(SS, F.LINK_STATUS) === !1) if (q = !1, typeof w.debug.onShaderError == "function") w.debug.onShaderError(F, SS, OS, kS);
			else {
				let w = getShaderErrors(F, OS, "vertex"), O = getShaderErrors(F, kS, "fragment");
				error("THREE.WebGLProgram: Shader Error " + F.getError() + " - VALIDATE_STATUS " + F.getProgramParameter(SS, F.VALIDATE_STATUS) + "\n\nMaterial Name: " + T.name + "\nMaterial Type: " + T.type + "\n\nProgram Info Log: " + W + "\n" + w + "\n" + O);
			}
			else W === "" ? (G === "" || K === "") && (J = !1) : warn("WebGLProgram: Program Info Log:", W);
			J && (T.diagnostics = {
				runnable: q,
				programLog: W,
				vertexShader: {
					log: G,
					prefix: CS
				},
				fragmentShader: {
					log: K,
					prefix: wS
				}
			});
		}
		F.deleteShader(OS), F.deleteShader(kS), jS = new WebGLUniforms(F, SS), MS = fetchAttributeLocations(F, SS);
	}
	let jS;
	this.getUniforms = function() {
		return jS === void 0 && AS(this), jS;
	};
	let MS;
	this.getAttributes = function() {
		return MS === void 0 && AS(this), MS;
	};
	let NS = O.rendererExtensionParallelShaderCompile === !1;
	return this.isReady = function() {
		return NS === !1 && (NS = F.getProgramParameter(SS, COMPLETION_STATUS_KHR)), NS;
	}, this.destroy = function() {
		j.releaseStatesOfProgram(this), F.deleteProgram(SS), this.program = void 0;
	}, this.type = O.shaderType, this.name = O.shaderName, this.id = programIdCount++, this.cacheKey = T, this.usedTimes = 1, this.program = SS, this.vertexShader = OS, this.fragmentShader = kS, this;
}
var _id = 0, WebGLShaderCache = class {
	constructor() {
		this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
	}
	update(w) {
		let T = w.vertexShader, O = w.fragmentShader, j = this._getShaderStage(T), F = this._getShaderStage(O), U = this._getShaderCacheForMaterial(w);
		return U.has(j) === !1 && (U.add(j), j.usedTimes++), U.has(F) === !1 && (U.add(F), F.usedTimes++), this;
	}
	remove(w) {
		let T = this.materialCache.get(w);
		for (let w of T) w.usedTimes--, w.usedTimes === 0 && this.shaderCache.delete(w.code);
		return this.materialCache.delete(w), this;
	}
	getVertexShaderID(w) {
		return this._getShaderStage(w.vertexShader).id;
	}
	getFragmentShaderID(w) {
		return this._getShaderStage(w.fragmentShader).id;
	}
	dispose() {
		this.shaderCache.clear(), this.materialCache.clear();
	}
	_getShaderCacheForMaterial(w) {
		let T = this.materialCache, O = T.get(w);
		return O === void 0 && (O = /* @__PURE__ */ new Set(), T.set(w, O)), O;
	}
	_getShaderStage(w) {
		let T = this.shaderCache, O = T.get(w);
		return O === void 0 && (O = new WebGLShaderStage(w), T.set(w, O)), O;
	}
}, WebGLShaderStage = class {
	constructor(w) {
		this.id = _id++, this.code = w, this.usedTimes = 0;
	}
};
function WebGLPrograms(w, T, O, j, F, U, W) {
	let G = new Layers(), K = new WebGLShaderCache(), q = /* @__PURE__ */ new Set(), J = [], Y = /* @__PURE__ */ new Map(), X = F.logarithmicDepthBuffer, Q = F.precision, xS = {
		MeshDepthMaterial: "depth",
		MeshDistanceMaterial: "distance",
		MeshNormalMaterial: "normal",
		MeshBasicMaterial: "basic",
		MeshLambertMaterial: "lambert",
		MeshPhongMaterial: "phong",
		MeshToonMaterial: "toon",
		MeshStandardMaterial: "physical",
		MeshPhysicalMaterial: "physical",
		MeshMatcapMaterial: "matcap",
		LineBasicMaterial: "basic",
		LineDashedMaterial: "dashed",
		PointsMaterial: "points",
		ShadowMaterial: "shadow",
		SpriteMaterial: "sprite"
	};
	function SS(w) {
		return q.add(w), w === 0 ? "uv" : `uv${w}`;
	}
	function CS(U, G, J, Y, CS) {
		let wS = Y.fog, TS = CS.geometry, ES = U.isMeshStandardMaterial ? Y.environment : null, DS = (U.isMeshStandardMaterial ? O : T).get(U.envMap || ES), OS = DS && DS.mapping === 306 ? DS.image.height : null, kS = xS[U.type];
		U.precision !== null && (Q = F.getMaxPrecision(U.precision), Q !== U.precision && warn("WebGLProgram.getParameters:", U.precision, "not supported, using", Q, "instead."));
		let AS = TS.morphAttributes.position || TS.morphAttributes.normal || TS.morphAttributes.color, jS = AS === void 0 ? 0 : AS.length, MS = 0;
		TS.morphAttributes.position !== void 0 && (MS = 1), TS.morphAttributes.normal !== void 0 && (MS = 2), TS.morphAttributes.color !== void 0 && (MS = 3);
		let NS, PS, FS, IS;
		if (kS) {
			let w = ShaderLib[kS];
			NS = w.vertexShader, PS = w.fragmentShader;
		} else NS = U.vertexShader, PS = U.fragmentShader, K.update(U), FS = K.getVertexShaderID(U), IS = K.getFragmentShaderID(U);
		let LS = w.getRenderTarget(), RS = w.state.buffers.depth.getReversed(), zS = CS.isInstancedMesh === !0, BS = CS.isBatchedMesh === !0, VS = !!U.map, HS = !!U.matcap, US = !!DS, WS = !!U.aoMap, GS = !!U.lightMap, KS = !!U.bumpMap, qS = !!U.normalMap, JS = !!U.displacementMap, YS = !!U.emissiveMap, XS = !!U.metalnessMap, ZS = !!U.roughnessMap, QS = U.anisotropy > 0, $S = U.clearcoat > 0, eC = U.dispersion > 0, tC = U.iridescence > 0, nC = U.sheen > 0, rC = U.transmission > 0, iC = QS && !!U.anisotropyMap, aC = $S && !!U.clearcoatMap, oC = $S && !!U.clearcoatNormalMap, sC = $S && !!U.clearcoatRoughnessMap, cC = tC && !!U.iridescenceMap, lC = tC && !!U.iridescenceThicknessMap, uC = nC && !!U.sheenColorMap, dC = nC && !!U.sheenRoughnessMap, fC = !!U.specularMap, pC = !!U.specularColorMap, mC = !!U.specularIntensityMap, hC = rC && !!U.transmissionMap, gC = rC && !!U.thicknessMap, _C = !!U.gradientMap, vC = !!U.alphaMap, yC = U.alphaTest > 0, bC = !!U.alphaHash, xC = !!U.extensions, SC = 0;
		U.toneMapped && (LS === null || LS.isXRRenderTarget === !0) && (SC = w.toneMapping);
		let CC = {
			shaderID: kS,
			shaderType: U.type,
			shaderName: U.name,
			vertexShader: NS,
			fragmentShader: PS,
			defines: U.defines,
			customVertexShaderID: FS,
			customFragmentShaderID: IS,
			isRawShaderMaterial: U.isRawShaderMaterial === !0,
			glslVersion: U.glslVersion,
			precision: Q,
			batching: BS,
			batchingColor: BS && CS._colorsTexture !== null,
			instancing: zS,
			instancingColor: zS && CS.instanceColor !== null,
			instancingMorph: zS && CS.morphTexture !== null,
			outputColorSpace: LS === null ? w.outputColorSpace : LS.isXRRenderTarget === !0 ? LS.texture.colorSpace : LinearSRGBColorSpace,
			alphaToCoverage: !!U.alphaToCoverage,
			map: VS,
			matcap: HS,
			envMap: US,
			envMapMode: US && DS.mapping,
			envMapCubeUVHeight: OS,
			aoMap: WS,
			lightMap: GS,
			bumpMap: KS,
			normalMap: qS,
			displacementMap: JS,
			emissiveMap: YS,
			normalMapObjectSpace: qS && U.normalMapType === 1,
			normalMapTangentSpace: qS && U.normalMapType === 0,
			metalnessMap: XS,
			roughnessMap: ZS,
			anisotropy: QS,
			anisotropyMap: iC,
			clearcoat: $S,
			clearcoatMap: aC,
			clearcoatNormalMap: oC,
			clearcoatRoughnessMap: sC,
			dispersion: eC,
			iridescence: tC,
			iridescenceMap: cC,
			iridescenceThicknessMap: lC,
			sheen: nC,
			sheenColorMap: uC,
			sheenRoughnessMap: dC,
			specularMap: fC,
			specularColorMap: pC,
			specularIntensityMap: mC,
			transmission: rC,
			transmissionMap: hC,
			thicknessMap: gC,
			gradientMap: _C,
			opaque: U.transparent === !1 && U.blending === 1 && U.alphaToCoverage === !1,
			alphaMap: vC,
			alphaTest: yC,
			alphaHash: bC,
			combine: U.combine,
			mapUv: VS && SS(U.map.channel),
			aoMapUv: WS && SS(U.aoMap.channel),
			lightMapUv: GS && SS(U.lightMap.channel),
			bumpMapUv: KS && SS(U.bumpMap.channel),
			normalMapUv: qS && SS(U.normalMap.channel),
			displacementMapUv: JS && SS(U.displacementMap.channel),
			emissiveMapUv: YS && SS(U.emissiveMap.channel),
			metalnessMapUv: XS && SS(U.metalnessMap.channel),
			roughnessMapUv: ZS && SS(U.roughnessMap.channel),
			anisotropyMapUv: iC && SS(U.anisotropyMap.channel),
			clearcoatMapUv: aC && SS(U.clearcoatMap.channel),
			clearcoatNormalMapUv: oC && SS(U.clearcoatNormalMap.channel),
			clearcoatRoughnessMapUv: sC && SS(U.clearcoatRoughnessMap.channel),
			iridescenceMapUv: cC && SS(U.iridescenceMap.channel),
			iridescenceThicknessMapUv: lC && SS(U.iridescenceThicknessMap.channel),
			sheenColorMapUv: uC && SS(U.sheenColorMap.channel),
			sheenRoughnessMapUv: dC && SS(U.sheenRoughnessMap.channel),
			specularMapUv: fC && SS(U.specularMap.channel),
			specularColorMapUv: pC && SS(U.specularColorMap.channel),
			specularIntensityMapUv: mC && SS(U.specularIntensityMap.channel),
			transmissionMapUv: hC && SS(U.transmissionMap.channel),
			thicknessMapUv: gC && SS(U.thicknessMap.channel),
			alphaMapUv: vC && SS(U.alphaMap.channel),
			vertexTangents: !!TS.attributes.tangent && (qS || QS),
			vertexColors: U.vertexColors,
			vertexAlphas: U.vertexColors === !0 && !!TS.attributes.color && TS.attributes.color.itemSize === 4,
			pointsUvs: CS.isPoints === !0 && !!TS.attributes.uv && (VS || vC),
			fog: !!wS,
			useFog: U.fog === !0,
			fogExp2: !!wS && wS.isFogExp2,
			flatShading: U.flatShading === !0 && U.wireframe === !1,
			sizeAttenuation: U.sizeAttenuation === !0,
			logarithmicDepthBuffer: X,
			reversedDepthBuffer: RS,
			skinning: CS.isSkinnedMesh === !0,
			morphTargets: TS.morphAttributes.position !== void 0,
			morphNormals: TS.morphAttributes.normal !== void 0,
			morphColors: TS.morphAttributes.color !== void 0,
			morphTargetsCount: jS,
			morphTextureStride: MS,
			numDirLights: G.directional.length,
			numPointLights: G.point.length,
			numSpotLights: G.spot.length,
			numSpotLightMaps: G.spotLightMap.length,
			numRectAreaLights: G.rectArea.length,
			numHemiLights: G.hemi.length,
			numDirLightShadows: G.directionalShadowMap.length,
			numPointLightShadows: G.pointShadowMap.length,
			numSpotLightShadows: G.spotShadowMap.length,
			numSpotLightShadowsWithMaps: G.numSpotLightShadowsWithMaps,
			numLightProbes: G.numLightProbes,
			numClippingPlanes: W.numPlanes,
			numClipIntersection: W.numIntersection,
			dithering: U.dithering,
			shadowMapEnabled: w.shadowMap.enabled && J.length > 0,
			shadowMapType: w.shadowMap.type,
			toneMapping: SC,
			decodeVideoTexture: VS && U.map.isVideoTexture === !0 && ColorManagement.getTransfer(U.map.colorSpace) === "srgb",
			decodeVideoTextureEmissive: YS && U.emissiveMap.isVideoTexture === !0 && ColorManagement.getTransfer(U.emissiveMap.colorSpace) === "srgb",
			premultipliedAlpha: U.premultipliedAlpha,
			doubleSided: U.side === 2,
			flipSided: U.side === 1,
			useDepthPacking: U.depthPacking >= 0,
			depthPacking: U.depthPacking || 0,
			index0AttributeName: U.index0AttributeName,
			extensionClipCullDistance: xC && U.extensions.clipCullDistance === !0 && j.has("WEBGL_clip_cull_distance"),
			extensionMultiDraw: (xC && U.extensions.multiDraw === !0 || BS) && j.has("WEBGL_multi_draw"),
			rendererExtensionParallelShaderCompile: j.has("KHR_parallel_shader_compile"),
			customProgramCacheKey: U.customProgramCacheKey()
		};
		return CC.vertexUv1s = q.has(1), CC.vertexUv2s = q.has(2), CC.vertexUv3s = q.has(3), q.clear(), CC;
	}
	function wS(T) {
		let O = [];
		if (T.shaderID ? O.push(T.shaderID) : (O.push(T.customVertexShaderID), O.push(T.customFragmentShaderID)), T.defines !== void 0) for (let w in T.defines) O.push(w), O.push(T.defines[w]);
		return T.isRawShaderMaterial === !1 && (TS(O, T), ES(O, T), O.push(w.outputColorSpace)), O.push(T.customProgramCacheKey), O.join();
	}
	function TS(w, T) {
		w.push(T.precision), w.push(T.outputColorSpace), w.push(T.envMapMode), w.push(T.envMapCubeUVHeight), w.push(T.mapUv), w.push(T.alphaMapUv), w.push(T.lightMapUv), w.push(T.aoMapUv), w.push(T.bumpMapUv), w.push(T.normalMapUv), w.push(T.displacementMapUv), w.push(T.emissiveMapUv), w.push(T.metalnessMapUv), w.push(T.roughnessMapUv), w.push(T.anisotropyMapUv), w.push(T.clearcoatMapUv), w.push(T.clearcoatNormalMapUv), w.push(T.clearcoatRoughnessMapUv), w.push(T.iridescenceMapUv), w.push(T.iridescenceThicknessMapUv), w.push(T.sheenColorMapUv), w.push(T.sheenRoughnessMapUv), w.push(T.specularMapUv), w.push(T.specularColorMapUv), w.push(T.specularIntensityMapUv), w.push(T.transmissionMapUv), w.push(T.thicknessMapUv), w.push(T.combine), w.push(T.fogExp2), w.push(T.sizeAttenuation), w.push(T.morphTargetsCount), w.push(T.morphAttributeCount), w.push(T.numDirLights), w.push(T.numPointLights), w.push(T.numSpotLights), w.push(T.numSpotLightMaps), w.push(T.numHemiLights), w.push(T.numRectAreaLights), w.push(T.numDirLightShadows), w.push(T.numPointLightShadows), w.push(T.numSpotLightShadows), w.push(T.numSpotLightShadowsWithMaps), w.push(T.numLightProbes), w.push(T.shadowMapType), w.push(T.toneMapping), w.push(T.numClippingPlanes), w.push(T.numClipIntersection), w.push(T.depthPacking);
	}
	function ES(w, T) {
		G.disableAll(), T.instancing && G.enable(0), T.instancingColor && G.enable(1), T.instancingMorph && G.enable(2), T.matcap && G.enable(3), T.envMap && G.enable(4), T.normalMapObjectSpace && G.enable(5), T.normalMapTangentSpace && G.enable(6), T.clearcoat && G.enable(7), T.iridescence && G.enable(8), T.alphaTest && G.enable(9), T.vertexColors && G.enable(10), T.vertexAlphas && G.enable(11), T.vertexUv1s && G.enable(12), T.vertexUv2s && G.enable(13), T.vertexUv3s && G.enable(14), T.vertexTangents && G.enable(15), T.anisotropy && G.enable(16), T.alphaHash && G.enable(17), T.batching && G.enable(18), T.dispersion && G.enable(19), T.batchingColor && G.enable(20), T.gradientMap && G.enable(21), w.push(G.mask), G.disableAll(), T.fog && G.enable(0), T.useFog && G.enable(1), T.flatShading && G.enable(2), T.logarithmicDepthBuffer && G.enable(3), T.reversedDepthBuffer && G.enable(4), T.skinning && G.enable(5), T.morphTargets && G.enable(6), T.morphNormals && G.enable(7), T.morphColors && G.enable(8), T.premultipliedAlpha && G.enable(9), T.shadowMapEnabled && G.enable(10), T.doubleSided && G.enable(11), T.flipSided && G.enable(12), T.useDepthPacking && G.enable(13), T.dithering && G.enable(14), T.transmission && G.enable(15), T.sheen && G.enable(16), T.opaque && G.enable(17), T.pointsUvs && G.enable(18), T.decodeVideoTexture && G.enable(19), T.decodeVideoTextureEmissive && G.enable(20), T.alphaToCoverage && G.enable(21), w.push(G.mask);
	}
	function DS(w) {
		let T = xS[w.type], O;
		if (T) {
			let w = ShaderLib[T];
			O = UniformsUtils.clone(w.uniforms);
		} else O = w.uniforms;
		return O;
	}
	function OS(T, O) {
		let j = Y.get(O);
		return j === void 0 ? (j = new WebGLProgram(w, O, T, U), J.push(j), Y.set(O, j)) : ++j.usedTimes, j;
	}
	function kS(w) {
		if (--w.usedTimes === 0) {
			let T = J.indexOf(w);
			J[T] = J[J.length - 1], J.pop(), Y.delete(w.cacheKey), w.destroy();
		}
	}
	function AS(w) {
		K.remove(w);
	}
	function jS() {
		K.dispose();
	}
	return {
		getParameters: CS,
		getProgramCacheKey: wS,
		getUniforms: DS,
		acquireProgram: OS,
		releaseProgram: kS,
		releaseShaderCache: AS,
		programs: J,
		dispose: jS
	};
}
function WebGLProperties() {
	let w = /* @__PURE__ */ new WeakMap();
	function T(T) {
		return w.has(T);
	}
	function O(T) {
		let O = w.get(T);
		return O === void 0 && (O = {}, w.set(T, O)), O;
	}
	function j(T) {
		w.delete(T);
	}
	function F(T, O, j) {
		w.get(T)[O] = j;
	}
	function U() {
		w = /* @__PURE__ */ new WeakMap();
	}
	return {
		has: T,
		get: O,
		remove: j,
		update: F,
		dispose: U
	};
}
function painterSortStable(w, T) {
	return w.groupOrder === T.groupOrder ? w.renderOrder === T.renderOrder ? w.material.id === T.material.id ? w.z === T.z ? w.id - T.id : w.z - T.z : w.material.id - T.material.id : w.renderOrder - T.renderOrder : w.groupOrder - T.groupOrder;
}
function reversePainterSortStable(w, T) {
	return w.groupOrder === T.groupOrder ? w.renderOrder === T.renderOrder ? w.z === T.z ? w.id - T.id : T.z - w.z : w.renderOrder - T.renderOrder : w.groupOrder - T.groupOrder;
}
function WebGLRenderList() {
	let w = [], T = 0, O = [], j = [], F = [];
	function U() {
		T = 0, O.length = 0, j.length = 0, F.length = 0;
	}
	function W(O, j, F, U, W, G) {
		let K = w[T];
		return K === void 0 ? (K = {
			id: O.id,
			object: O,
			geometry: j,
			material: F,
			groupOrder: U,
			renderOrder: O.renderOrder,
			z: W,
			group: G
		}, w[T] = K) : (K.id = O.id, K.object = O, K.geometry = j, K.material = F, K.groupOrder = U, K.renderOrder = O.renderOrder, K.z = W, K.group = G), T++, K;
	}
	function G(w, T, U, G, K, q) {
		let J = W(w, T, U, G, K, q);
		U.transmission > 0 ? j.push(J) : U.transparent === !0 ? F.push(J) : O.push(J);
	}
	function K(w, T, U, G, K, q) {
		let J = W(w, T, U, G, K, q);
		U.transmission > 0 ? j.unshift(J) : U.transparent === !0 ? F.unshift(J) : O.unshift(J);
	}
	function q(w, T) {
		O.length > 1 && O.sort(w || painterSortStable), j.length > 1 && j.sort(T || reversePainterSortStable), F.length > 1 && F.sort(T || reversePainterSortStable);
	}
	function J() {
		for (let O = T, j = w.length; O < j; O++) {
			let T = w[O];
			if (T.id === null) break;
			T.id = null, T.object = null, T.geometry = null, T.material = null, T.group = null;
		}
	}
	return {
		opaque: O,
		transmissive: j,
		transparent: F,
		init: U,
		push: G,
		unshift: K,
		finish: J,
		sort: q
	};
}
function WebGLRenderLists() {
	let w = /* @__PURE__ */ new WeakMap();
	function T(T, O) {
		let j = w.get(T), F;
		return j === void 0 ? (F = new WebGLRenderList(), w.set(T, [F])) : O >= j.length ? (F = new WebGLRenderList(), j.push(F)) : F = j[O], F;
	}
	function O() {
		w = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: T,
		dispose: O
	};
}
function UniformsCache() {
	let w = {};
	return { get: function(T) {
		if (w[T.id] !== void 0) return w[T.id];
		let O;
		switch (T.type) {
			case "DirectionalLight":
				O = {
					direction: new Vector3(),
					color: new Color()
				};
				break;
			case "SpotLight":
				O = {
					position: new Vector3(),
					direction: new Vector3(),
					color: new Color(),
					distance: 0,
					coneCos: 0,
					penumbraCos: 0,
					decay: 0
				};
				break;
			case "PointLight":
				O = {
					position: new Vector3(),
					color: new Color(),
					distance: 0,
					decay: 0
				};
				break;
			case "HemisphereLight":
				O = {
					direction: new Vector3(),
					skyColor: new Color(),
					groundColor: new Color()
				};
				break;
			case "RectAreaLight":
				O = {
					color: new Color(),
					position: new Vector3(),
					halfWidth: new Vector3(),
					halfHeight: new Vector3()
				};
				break;
		}
		return w[T.id] = O, O;
	} };
}
function ShadowUniformsCache() {
	let w = {};
	return { get: function(T) {
		if (w[T.id] !== void 0) return w[T.id];
		let O;
		switch (T.type) {
			case "DirectionalLight":
				O = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new Vector2()
				};
				break;
			case "SpotLight":
				O = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new Vector2()
				};
				break;
			case "PointLight":
				O = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new Vector2(),
					shadowCameraNear: 1,
					shadowCameraFar: 1e3
				};
				break;
		}
		return w[T.id] = O, O;
	} };
}
var nextVersion = 0;
function shadowCastingAndTexturingLightsFirst(w, T) {
	return (T.castShadow ? 2 : 0) - (w.castShadow ? 2 : 0) + (T.map ? 1 : 0) - (w.map ? 1 : 0);
}
function WebGLLights(w) {
	let T = new UniformsCache(), O = ShadowUniformsCache(), j = {
		version: 0,
		hash: {
			directionalLength: -1,
			pointLength: -1,
			spotLength: -1,
			rectAreaLength: -1,
			hemiLength: -1,
			numDirectionalShadows: -1,
			numPointShadows: -1,
			numSpotShadows: -1,
			numSpotMaps: -1,
			numLightProbes: -1
		},
		ambient: [
			0,
			0,
			0
		],
		probe: [],
		directional: [],
		directionalShadow: [],
		directionalShadowMap: [],
		directionalShadowMatrix: [],
		spot: [],
		spotLightMap: [],
		spotShadow: [],
		spotShadowMap: [],
		spotLightMatrix: [],
		rectArea: [],
		rectAreaLTC1: null,
		rectAreaLTC2: null,
		point: [],
		pointShadow: [],
		pointShadowMap: [],
		pointShadowMatrix: [],
		hemi: [],
		numSpotLightShadowsWithMaps: 0,
		numLightProbes: 0
	};
	for (let w = 0; w < 9; w++) j.probe.push(new Vector3());
	let F = new Vector3(), U = new Matrix4(), W = new Matrix4();
	function G(F) {
		let U = 0, W = 0, G = 0;
		for (let w = 0; w < 9; w++) j.probe[w].set(0, 0, 0);
		let K = 0, q = 0, J = 0, Y = 0, X = 0, Q = 0, xS = 0, SS = 0, CS = 0, wS = 0, TS = 0;
		F.sort(shadowCastingAndTexturingLightsFirst);
		for (let w = 0, ES = F.length; w < ES; w++) {
			let ES = F[w], DS = ES.color, OS = ES.intensity, kS = ES.distance, AS = null;
			if (ES.shadow && ES.shadow.map && (AS = ES.shadow.map.texture.format === 1030 ? ES.shadow.map.texture : ES.shadow.map.depthTexture || ES.shadow.map.texture), ES.isAmbientLight) U += DS.r * OS, W += DS.g * OS, G += DS.b * OS;
			else if (ES.isLightProbe) {
				for (let w = 0; w < 9; w++) j.probe[w].addScaledVector(ES.sh.coefficients[w], OS);
				TS++;
			} else if (ES.isDirectionalLight) {
				let w = T.get(ES);
				if (w.color.copy(ES.color).multiplyScalar(ES.intensity), ES.castShadow) {
					let w = ES.shadow, T = O.get(ES);
					T.shadowIntensity = w.intensity, T.shadowBias = w.bias, T.shadowNormalBias = w.normalBias, T.shadowRadius = w.radius, T.shadowMapSize = w.mapSize, j.directionalShadow[K] = T, j.directionalShadowMap[K] = AS, j.directionalShadowMatrix[K] = ES.shadow.matrix, Q++;
				}
				j.directional[K] = w, K++;
			} else if (ES.isSpotLight) {
				let w = T.get(ES);
				w.position.setFromMatrixPosition(ES.matrixWorld), w.color.copy(DS).multiplyScalar(OS), w.distance = kS, w.coneCos = Math.cos(ES.angle), w.penumbraCos = Math.cos(ES.angle * (1 - ES.penumbra)), w.decay = ES.decay, j.spot[J] = w;
				let F = ES.shadow;
				if (ES.map && (j.spotLightMap[CS] = ES.map, CS++, F.updateMatrices(ES), ES.castShadow && wS++), j.spotLightMatrix[J] = F.matrix, ES.castShadow) {
					let w = O.get(ES);
					w.shadowIntensity = F.intensity, w.shadowBias = F.bias, w.shadowNormalBias = F.normalBias, w.shadowRadius = F.radius, w.shadowMapSize = F.mapSize, j.spotShadow[J] = w, j.spotShadowMap[J] = AS, SS++;
				}
				J++;
			} else if (ES.isRectAreaLight) {
				let w = T.get(ES);
				w.color.copy(DS).multiplyScalar(OS), w.halfWidth.set(ES.width * .5, 0, 0), w.halfHeight.set(0, ES.height * .5, 0), j.rectArea[Y] = w, Y++;
			} else if (ES.isPointLight) {
				let w = T.get(ES);
				if (w.color.copy(ES.color).multiplyScalar(ES.intensity), w.distance = ES.distance, w.decay = ES.decay, ES.castShadow) {
					let w = ES.shadow, T = O.get(ES);
					T.shadowIntensity = w.intensity, T.shadowBias = w.bias, T.shadowNormalBias = w.normalBias, T.shadowRadius = w.radius, T.shadowMapSize = w.mapSize, T.shadowCameraNear = w.camera.near, T.shadowCameraFar = w.camera.far, j.pointShadow[q] = T, j.pointShadowMap[q] = AS, j.pointShadowMatrix[q] = ES.shadow.matrix, xS++;
				}
				j.point[q] = w, q++;
			} else if (ES.isHemisphereLight) {
				let w = T.get(ES);
				w.skyColor.copy(ES.color).multiplyScalar(OS), w.groundColor.copy(ES.groundColor).multiplyScalar(OS), j.hemi[X] = w, X++;
			}
		}
		Y > 0 && (w.has("OES_texture_float_linear") === !0 ? (j.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1, j.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2) : (j.rectAreaLTC1 = UniformsLib.LTC_HALF_1, j.rectAreaLTC2 = UniformsLib.LTC_HALF_2)), j.ambient[0] = U, j.ambient[1] = W, j.ambient[2] = G;
		let ES = j.hash;
		(ES.directionalLength !== K || ES.pointLength !== q || ES.spotLength !== J || ES.rectAreaLength !== Y || ES.hemiLength !== X || ES.numDirectionalShadows !== Q || ES.numPointShadows !== xS || ES.numSpotShadows !== SS || ES.numSpotMaps !== CS || ES.numLightProbes !== TS) && (j.directional.length = K, j.spot.length = J, j.rectArea.length = Y, j.point.length = q, j.hemi.length = X, j.directionalShadow.length = Q, j.directionalShadowMap.length = Q, j.pointShadow.length = xS, j.pointShadowMap.length = xS, j.spotShadow.length = SS, j.spotShadowMap.length = SS, j.directionalShadowMatrix.length = Q, j.pointShadowMatrix.length = xS, j.spotLightMatrix.length = SS + CS - wS, j.spotLightMap.length = CS, j.numSpotLightShadowsWithMaps = wS, j.numLightProbes = TS, ES.directionalLength = K, ES.pointLength = q, ES.spotLength = J, ES.rectAreaLength = Y, ES.hemiLength = X, ES.numDirectionalShadows = Q, ES.numPointShadows = xS, ES.numSpotShadows = SS, ES.numSpotMaps = CS, ES.numLightProbes = TS, j.version = nextVersion++);
	}
	function K(w, T) {
		let O = 0, G = 0, K = 0, q = 0, J = 0, Y = T.matrixWorldInverse;
		for (let T = 0, X = w.length; T < X; T++) {
			let X = w[T];
			if (X.isDirectionalLight) {
				let w = j.directional[O];
				w.direction.setFromMatrixPosition(X.matrixWorld), F.setFromMatrixPosition(X.target.matrixWorld), w.direction.sub(F), w.direction.transformDirection(Y), O++;
			} else if (X.isSpotLight) {
				let w = j.spot[K];
				w.position.setFromMatrixPosition(X.matrixWorld), w.position.applyMatrix4(Y), w.direction.setFromMatrixPosition(X.matrixWorld), F.setFromMatrixPosition(X.target.matrixWorld), w.direction.sub(F), w.direction.transformDirection(Y), K++;
			} else if (X.isRectAreaLight) {
				let w = j.rectArea[q];
				w.position.setFromMatrixPosition(X.matrixWorld), w.position.applyMatrix4(Y), W.identity(), U.copy(X.matrixWorld), U.premultiply(Y), W.extractRotation(U), w.halfWidth.set(X.width * .5, 0, 0), w.halfHeight.set(0, X.height * .5, 0), w.halfWidth.applyMatrix4(W), w.halfHeight.applyMatrix4(W), q++;
			} else if (X.isPointLight) {
				let w = j.point[G];
				w.position.setFromMatrixPosition(X.matrixWorld), w.position.applyMatrix4(Y), G++;
			} else if (X.isHemisphereLight) {
				let w = j.hemi[J];
				w.direction.setFromMatrixPosition(X.matrixWorld), w.direction.transformDirection(Y), J++;
			}
		}
	}
	return {
		setup: G,
		setupView: K,
		state: j
	};
}
function WebGLRenderState(w) {
	let T = new WebGLLights(w), O = [], j = [];
	function F(w) {
		q.camera = w, O.length = 0, j.length = 0;
	}
	function U(w) {
		O.push(w);
	}
	function W(w) {
		j.push(w);
	}
	function G() {
		T.setup(O);
	}
	function K(w) {
		T.setupView(O, w);
	}
	let q = {
		lightsArray: O,
		shadowsArray: j,
		camera: null,
		lights: T,
		transmissionRenderTarget: {}
	};
	return {
		init: F,
		state: q,
		setupLights: G,
		setupLightsView: K,
		pushLight: U,
		pushShadow: W
	};
}
function WebGLRenderStates(w) {
	let T = /* @__PURE__ */ new WeakMap();
	function O(O, j = 0) {
		let F = T.get(O), U;
		return F === void 0 ? (U = new WebGLRenderState(w), T.set(O, [U])) : j >= F.length ? (U = new WebGLRenderState(w), F.push(U)) : U = F[j], U;
	}
	function j() {
		T = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: O,
		dispose: j
	};
}
var vertex = "void main() {\n	gl_Position = vec4( position, 1.0 );\n}", fragment = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\nvoid main() {\n	const float samples = float( VSM_SAMPLES );\n	float mean = 0.0;\n	float squared_mean = 0.0;\n	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n	for ( float i = 0.0; i < samples; i ++ ) {\n		float uvOffset = uvStart + i * uvStride;\n		#ifdef HORIZONTAL_PASS\n			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;\n			mean += distribution.x;\n			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n		#else\n			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;\n			mean += depth;\n			squared_mean += depth * depth;\n		#endif\n	}\n	mean = mean / samples;\n	squared_mean = squared_mean / samples;\n	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );\n	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );\n}", _cubeDirections = [
	/* @__PURE__ */ new Vector3(1, 0, 0),
	/* @__PURE__ */ new Vector3(-1, 0, 0),
	/* @__PURE__ */ new Vector3(0, 1, 0),
	/* @__PURE__ */ new Vector3(0, -1, 0),
	/* @__PURE__ */ new Vector3(0, 0, 1),
	/* @__PURE__ */ new Vector3(0, 0, -1)
], _cubeUps = [
	/* @__PURE__ */ new Vector3(0, -1, 0),
	/* @__PURE__ */ new Vector3(0, -1, 0),
	/* @__PURE__ */ new Vector3(0, 0, 1),
	/* @__PURE__ */ new Vector3(0, 0, -1),
	/* @__PURE__ */ new Vector3(0, -1, 0),
	/* @__PURE__ */ new Vector3(0, -1, 0)
], _projScreenMatrix = /* @__PURE__ */ new Matrix4(), _lightPositionWorld = /* @__PURE__ */ new Vector3(), _lookTarget = /* @__PURE__ */ new Vector3();
function WebGLShadowMap(w, T, O) {
	let j = new Frustum(), F = new Vector2(), U = new Vector2(), W = new Vector4(), G = new MeshDepthMaterial(), K = new MeshDistanceMaterial(), q = {}, J = O.maxTextureSize, Y = {
		0: 1,
		1: 0,
		2: 2
	}, X = new ShaderMaterial({
		defines: { VSM_SAMPLES: 8 },
		uniforms: {
			shadow_pass: { value: null },
			resolution: { value: new Vector2() },
			radius: { value: 4 }
		},
		vertexShader: vertex,
		fragmentShader: fragment
	}), Q = X.clone();
	Q.defines.HORIZONTAL_PASS = 1;
	let xS = new BufferGeometry();
	xS.setAttribute("position", new BufferAttribute(new Float32Array([
		-1,
		-1,
		.5,
		3,
		-1,
		.5,
		-1,
		3,
		.5
	]), 3));
	let SS = new Mesh(xS, X), CS = this;
	this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
	let wS = this.type;
	this.render = function(T, O, G) {
		if (CS.enabled === !1 || CS.autoUpdate === !1 && CS.needsUpdate === !1 || T.length === 0) return;
		T.type === 2 && (warn("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), T.type = 1);
		let K = w.getRenderTarget(), q = w.getActiveCubeFace(), Y = w.getActiveMipmapLevel(), X = w.state;
		X.setBlending(0), X.buffers.depth.getReversed() === !0 ? X.buffers.color.setClear(0, 0, 0, 0) : X.buffers.color.setClear(1, 1, 1, 1), X.buffers.depth.setTest(!0), X.setScissorTest(!1);
		let Q = wS !== this.type;
		Q && O.traverse(function(w) {
			w.material && (Array.isArray(w.material) ? w.material.forEach((w) => w.needsUpdate = !0) : w.material.needsUpdate = !0);
		});
		for (let K = 0, q = T.length; K < q; K++) {
			let q = T[K], Y = q.shadow;
			if (Y === void 0) {
				warn("WebGLShadowMap:", q, "has no shadow.");
				continue;
			}
			if (Y.autoUpdate === !1 && Y.needsUpdate === !1) continue;
			F.copy(Y.mapSize);
			let xS = Y.getFrameExtents();
			if (F.multiply(xS), U.copy(Y.mapSize), (F.x > J || F.y > J) && (F.x > J && (U.x = Math.floor(J / xS.x), F.x = U.x * xS.x, Y.mapSize.x = U.x), F.y > J && (U.y = Math.floor(J / xS.y), F.y = U.y * xS.y, Y.mapSize.y = U.y)), Y.map === null || Q === !0) {
				if (Y.map !== null && (Y.map.depthTexture !== null && (Y.map.depthTexture.dispose(), Y.map.depthTexture = null), Y.map.dispose()), this.type === 3) {
					if (q.isPointLight) {
						warn("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
						continue;
					}
					Y.map = new WebGLRenderTarget(F.x, F.y, {
						format: RGFormat,
						type: HalfFloatType,
						minFilter: LinearFilter,
						magFilter: LinearFilter,
						generateMipmaps: !1
					}), Y.map.texture.name = q.name + ".shadowMap", Y.map.depthTexture = new DepthTexture(F.x, F.y, FloatType), Y.map.depthTexture.name = q.name + ".shadowMapDepth", Y.map.depthTexture.format = DepthFormat, Y.map.depthTexture.compareFunction = null, Y.map.depthTexture.minFilter = NearestFilter, Y.map.depthTexture.magFilter = NearestFilter;
				} else {
					q.isPointLight ? (Y.map = new WebGLCubeRenderTarget(F.x), Y.map.depthTexture = new CubeDepthTexture(F.x, UnsignedIntType)) : (Y.map = new WebGLRenderTarget(F.x, F.y), Y.map.depthTexture = new DepthTexture(F.x, F.y, UnsignedIntType)), Y.map.depthTexture.name = q.name + ".shadowMap", Y.map.depthTexture.format = DepthFormat;
					let T = w.state.buffers.depth.getReversed();
					this.type === 1 ? (Y.map.depthTexture.compareFunction = T ? 518 : 515, Y.map.depthTexture.minFilter = LinearFilter, Y.map.depthTexture.magFilter = LinearFilter) : (Y.map.depthTexture.compareFunction = null, Y.map.depthTexture.minFilter = NearestFilter, Y.map.depthTexture.magFilter = NearestFilter);
				}
				Y.camera.updateProjectionMatrix();
			}
			let SS = Y.map.isWebGLCubeRenderTarget ? 6 : 1;
			for (let T = 0; T < SS; T++) {
				if (Y.map.isWebGLCubeRenderTarget) w.setRenderTarget(Y.map, T), w.clear();
				else {
					T === 0 && (w.setRenderTarget(Y.map), w.clear());
					let O = Y.getViewport(T);
					W.set(U.x * O.x, U.y * O.y, U.x * O.z, U.y * O.w), X.viewport(W);
				}
				if (q.isPointLight) {
					let w = Y.camera, O = Y.matrix, j = q.distance || w.far;
					j !== w.far && (w.far = j, w.updateProjectionMatrix()), _lightPositionWorld.setFromMatrixPosition(q.matrixWorld), w.position.copy(_lightPositionWorld), _lookTarget.copy(w.position), _lookTarget.add(_cubeDirections[T]), w.up.copy(_cubeUps[T]), w.lookAt(_lookTarget), w.updateMatrixWorld(), O.makeTranslation(-_lightPositionWorld.x, -_lightPositionWorld.y, -_lightPositionWorld.z), _projScreenMatrix.multiplyMatrices(w.projectionMatrix, w.matrixWorldInverse), Y._frustum.setFromProjectionMatrix(_projScreenMatrix, w.coordinateSystem, w.reversedDepth);
				} else Y.updateMatrices(q);
				j = Y.getFrustum(), DS(O, G, Y.camera, q, this.type);
			}
			Y.isPointLightShadow !== !0 && this.type === 3 && TS(Y, G), Y.needsUpdate = !1;
		}
		wS = this.type, CS.needsUpdate = !1, w.setRenderTarget(K, q, Y);
	};
	function TS(O, j) {
		let U = T.update(SS);
		X.defines.VSM_SAMPLES !== O.blurSamples && (X.defines.VSM_SAMPLES = O.blurSamples, Q.defines.VSM_SAMPLES = O.blurSamples, X.needsUpdate = !0, Q.needsUpdate = !0), O.mapPass === null && (O.mapPass = new WebGLRenderTarget(F.x, F.y, {
			format: RGFormat,
			type: HalfFloatType
		})), X.uniforms.shadow_pass.value = O.map.depthTexture, X.uniforms.resolution.value = O.mapSize, X.uniforms.radius.value = O.radius, w.setRenderTarget(O.mapPass), w.clear(), w.renderBufferDirect(j, null, U, X, SS, null), Q.uniforms.shadow_pass.value = O.mapPass.texture, Q.uniforms.resolution.value = O.mapSize, Q.uniforms.radius.value = O.radius, w.setRenderTarget(O.map), w.clear(), w.renderBufferDirect(j, null, U, Q, SS, null);
	}
	function ES(T, O, j, F) {
		let U = null, W = j.isPointLight === !0 ? T.customDistanceMaterial : T.customDepthMaterial;
		if (W !== void 0) U = W;
		else if (U = j.isPointLight === !0 ? K : G, w.localClippingEnabled && O.clipShadows === !0 && Array.isArray(O.clippingPlanes) && O.clippingPlanes.length !== 0 || O.displacementMap && O.displacementScale !== 0 || O.alphaMap && O.alphaTest > 0 || O.map && O.alphaTest > 0 || O.alphaToCoverage === !0) {
			let w = U.uuid, T = O.uuid, j = q[w];
			j === void 0 && (j = {}, q[w] = j);
			let F = j[T];
			F === void 0 && (F = U.clone(), j[T] = F, O.addEventListener("dispose", OS)), U = F;
		}
		if (U.visible = O.visible, U.wireframe = O.wireframe, F === 3 ? U.side = O.shadowSide === null ? O.side : O.shadowSide : U.side = O.shadowSide === null ? Y[O.side] : O.shadowSide, U.alphaMap = O.alphaMap, U.alphaTest = O.alphaToCoverage === !0 ? .5 : O.alphaTest, U.map = O.map, U.clipShadows = O.clipShadows, U.clippingPlanes = O.clippingPlanes, U.clipIntersection = O.clipIntersection, U.displacementMap = O.displacementMap, U.displacementScale = O.displacementScale, U.displacementBias = O.displacementBias, U.wireframeLinewidth = O.wireframeLinewidth, U.linewidth = O.linewidth, j.isPointLight === !0 && U.isMeshDistanceMaterial === !0) {
			let T = w.properties.get(U);
			T.light = j;
		}
		return U;
	}
	function DS(O, F, U, W, G) {
		if (O.visible === !1) return;
		if (O.layers.test(F.layers) && (O.isMesh || O.isLine || O.isPoints) && (O.castShadow || O.receiveShadow && G === 3) && (!O.frustumCulled || j.intersectsObject(O))) {
			O.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse, O.matrixWorld);
			let j = T.update(O), K = O.material;
			if (Array.isArray(K)) {
				let T = j.groups;
				for (let q = 0, J = T.length; q < J; q++) {
					let J = T[q], Y = K[J.materialIndex];
					if (Y && Y.visible) {
						let T = ES(O, Y, W, G);
						O.onBeforeShadow(w, O, F, U, j, T, J), w.renderBufferDirect(U, null, j, T, O, J), O.onAfterShadow(w, O, F, U, j, T, J);
					}
				}
			} else if (K.visible) {
				let T = ES(O, K, W, G);
				O.onBeforeShadow(w, O, F, U, j, T, null), w.renderBufferDirect(U, null, j, T, O, null), O.onAfterShadow(w, O, F, U, j, T, null);
			}
		}
		let K = O.children;
		for (let w = 0, T = K.length; w < T; w++) DS(K[w], F, U, W, G);
	}
	function OS(w) {
		for (let T in w.target.removeEventListener("dispose", OS), q) {
			let O = q[T], j = w.target.uuid;
			j in O && (O[j].dispose(), delete O[j]);
		}
	}
}
var reversedFuncs = {
	0: 1,
	2: 6,
	4: 7,
	3: 5,
	1: 0,
	6: 2,
	7: 4,
	5: 3
};
function WebGLState(w, T) {
	function O() {
		let T = !1, O = new Vector4(), j = null, F = new Vector4(0, 0, 0, 0);
		return {
			setMask: function(O) {
				j !== O && !T && (w.colorMask(O, O, O, O), j = O);
			},
			setLocked: function(w) {
				T = w;
			},
			setClear: function(T, j, U, W, G) {
				G === !0 && (T *= W, j *= W, U *= W), O.set(T, j, U, W), F.equals(O) === !1 && (w.clearColor(T, j, U, W), F.copy(O));
			},
			reset: function() {
				T = !1, j = null, F.set(-1, 0, 0, 0);
			}
		};
	}
	function j() {
		let O = !1, j = !1, F = null, U = null, W = null;
		return {
			setReversed: function(w) {
				if (j !== w) {
					let O = T.get("EXT_clip_control");
					w ? O.clipControlEXT(O.LOWER_LEFT_EXT, O.ZERO_TO_ONE_EXT) : O.clipControlEXT(O.LOWER_LEFT_EXT, O.NEGATIVE_ONE_TO_ONE_EXT), j = w;
					let F = W;
					W = null, this.setClear(F);
				}
			},
			getReversed: function() {
				return j;
			},
			setTest: function(T) {
				T ? XS(w.DEPTH_TEST) : ZS(w.DEPTH_TEST);
			},
			setMask: function(T) {
				F !== T && !O && (w.depthMask(T), F = T);
			},
			setFunc: function(T) {
				if (j && (T = reversedFuncs[T]), U !== T) {
					switch (T) {
						case 0:
							w.depthFunc(w.NEVER);
							break;
						case 1:
							w.depthFunc(w.ALWAYS);
							break;
						case 2:
							w.depthFunc(w.LESS);
							break;
						case 3:
							w.depthFunc(w.LEQUAL);
							break;
						case 4:
							w.depthFunc(w.EQUAL);
							break;
						case 5:
							w.depthFunc(w.GEQUAL);
							break;
						case 6:
							w.depthFunc(w.GREATER);
							break;
						case 7:
							w.depthFunc(w.NOTEQUAL);
							break;
						default: w.depthFunc(w.LEQUAL);
					}
					U = T;
				}
			},
			setLocked: function(w) {
				O = w;
			},
			setClear: function(T) {
				W !== T && (j && (T = 1 - T), w.clearDepth(T), W = T);
			},
			reset: function() {
				O = !1, F = null, U = null, W = null, j = !1;
			}
		};
	}
	function F() {
		let T = !1, O = null, j = null, F = null, U = null, W = null, G = null, K = null, q = null;
		return {
			setTest: function(O) {
				T || (O ? XS(w.STENCIL_TEST) : ZS(w.STENCIL_TEST));
			},
			setMask: function(j) {
				O !== j && !T && (w.stencilMask(j), O = j);
			},
			setFunc: function(T, O, W) {
				(j !== T || F !== O || U !== W) && (w.stencilFunc(T, O, W), j = T, F = O, U = W);
			},
			setOp: function(T, O, j) {
				(W !== T || G !== O || K !== j) && (w.stencilOp(T, O, j), W = T, G = O, K = j);
			},
			setLocked: function(w) {
				T = w;
			},
			setClear: function(T) {
				q !== T && (w.clearStencil(T), q = T);
			},
			reset: function() {
				T = !1, O = null, j = null, F = null, U = null, W = null, G = null, K = null, q = null;
			}
		};
	}
	let U = new O(), W = new j(), G = new F(), K = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), J = {}, Y = {}, X = /* @__PURE__ */ new WeakMap(), Q = [], xS = null, SS = !1, CS = null, wS = null, TS = null, ES = null, DS = null, OS = null, kS = null, AS = new Color(0, 0, 0), jS = 0, MS = !1, NS = null, PS = null, FS = null, IS = null, LS = null, RS = w.getParameter(w.MAX_COMBINED_TEXTURE_IMAGE_UNITS), zS = !1, BS = 0, VS = w.getParameter(w.VERSION);
	VS.indexOf("WebGL") === -1 ? VS.indexOf("OpenGL ES") !== -1 && (BS = parseFloat(/^OpenGL ES (\d)/.exec(VS)[1]), zS = BS >= 2) : (BS = parseFloat(/^WebGL (\d)/.exec(VS)[1]), zS = BS >= 1);
	let HS = null, US = {}, WS = w.getParameter(w.SCISSOR_BOX), GS = w.getParameter(w.VIEWPORT), KS = new Vector4().fromArray(WS), qS = new Vector4().fromArray(GS);
	function JS(T, O, j, F) {
		let U = new Uint8Array(4), W = w.createTexture();
		w.bindTexture(T, W), w.texParameteri(T, w.TEXTURE_MIN_FILTER, w.NEAREST), w.texParameteri(T, w.TEXTURE_MAG_FILTER, w.NEAREST);
		for (let W = 0; W < j; W++) T === w.TEXTURE_3D || T === w.TEXTURE_2D_ARRAY ? w.texImage3D(O, 0, w.RGBA, 1, 1, F, 0, w.RGBA, w.UNSIGNED_BYTE, U) : w.texImage2D(O + W, 0, w.RGBA, 1, 1, 0, w.RGBA, w.UNSIGNED_BYTE, U);
		return W;
	}
	let YS = {};
	YS[w.TEXTURE_2D] = JS(w.TEXTURE_2D, w.TEXTURE_2D, 1), YS[w.TEXTURE_CUBE_MAP] = JS(w.TEXTURE_CUBE_MAP, w.TEXTURE_CUBE_MAP_POSITIVE_X, 6), YS[w.TEXTURE_2D_ARRAY] = JS(w.TEXTURE_2D_ARRAY, w.TEXTURE_2D_ARRAY, 1, 1), YS[w.TEXTURE_3D] = JS(w.TEXTURE_3D, w.TEXTURE_3D, 1, 1), U.setClear(0, 0, 0, 1), W.setClear(1), G.setClear(0), XS(w.DEPTH_TEST), W.setFunc(3), aC(!1), oC(1), XS(w.CULL_FACE), rC(0);
	function XS(T) {
		J[T] !== !0 && (w.enable(T), J[T] = !0);
	}
	function ZS(T) {
		J[T] !== !1 && (w.disable(T), J[T] = !1);
	}
	function QS(T, O) {
		return Y[T] === O ? !1 : (w.bindFramebuffer(T, O), Y[T] = O, T === w.DRAW_FRAMEBUFFER && (Y[w.FRAMEBUFFER] = O), T === w.FRAMEBUFFER && (Y[w.DRAW_FRAMEBUFFER] = O), !0);
	}
	function $S(T, O) {
		let j = Q, F = !1;
		if (T) {
			j = X.get(O), j === void 0 && (j = [], X.set(O, j));
			let U = T.textures;
			if (j.length !== U.length || j[0] !== w.COLOR_ATTACHMENT0) {
				for (let T = 0, O = U.length; T < O; T++) j[T] = w.COLOR_ATTACHMENT0 + T;
				j.length = U.length, F = !0;
			}
		} else j[0] !== w.BACK && (j[0] = w.BACK, F = !0);
		F && w.drawBuffers(j);
	}
	function eC(T) {
		return xS === T ? !1 : (w.useProgram(T), xS = T, !0);
	}
	let tC = {
		100: w.FUNC_ADD,
		101: w.FUNC_SUBTRACT,
		102: w.FUNC_REVERSE_SUBTRACT
	};
	tC[103] = w.MIN, tC[104] = w.MAX;
	let nC = {
		200: w.ZERO,
		201: w.ONE,
		202: w.SRC_COLOR,
		204: w.SRC_ALPHA,
		210: w.SRC_ALPHA_SATURATE,
		208: w.DST_COLOR,
		206: w.DST_ALPHA,
		203: w.ONE_MINUS_SRC_COLOR,
		205: w.ONE_MINUS_SRC_ALPHA,
		209: w.ONE_MINUS_DST_COLOR,
		207: w.ONE_MINUS_DST_ALPHA,
		211: w.CONSTANT_COLOR,
		212: w.ONE_MINUS_CONSTANT_COLOR,
		213: w.CONSTANT_ALPHA,
		214: w.ONE_MINUS_CONSTANT_ALPHA
	};
	function rC(T, O, j, F, U, W, G, K, q, J) {
		if (T === 0) {
			SS === !0 && (ZS(w.BLEND), SS = !1);
			return;
		}
		if (SS === !1 && (XS(w.BLEND), SS = !0), T !== 5) {
			if (T !== CS || J !== MS) {
				if ((wS !== 100 || DS !== 100) && (w.blendEquation(w.FUNC_ADD), wS = 100, DS = 100), J) switch (T) {
					case 1:
						w.blendFuncSeparate(w.ONE, w.ONE_MINUS_SRC_ALPHA, w.ONE, w.ONE_MINUS_SRC_ALPHA);
						break;
					case 2:
						w.blendFunc(w.ONE, w.ONE);
						break;
					case 3:
						w.blendFuncSeparate(w.ZERO, w.ONE_MINUS_SRC_COLOR, w.ZERO, w.ONE);
						break;
					case 4:
						w.blendFuncSeparate(w.DST_COLOR, w.ONE_MINUS_SRC_ALPHA, w.ZERO, w.ONE);
						break;
					default:
						error("WebGLState: Invalid blending: ", T);
						break;
				}
				else switch (T) {
					case 1:
						w.blendFuncSeparate(w.SRC_ALPHA, w.ONE_MINUS_SRC_ALPHA, w.ONE, w.ONE_MINUS_SRC_ALPHA);
						break;
					case 2:
						w.blendFuncSeparate(w.SRC_ALPHA, w.ONE, w.ONE, w.ONE);
						break;
					case 3:
						error("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
						break;
					case 4:
						error("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
						break;
					default:
						error("WebGLState: Invalid blending: ", T);
						break;
				}
				TS = null, ES = null, OS = null, kS = null, AS.set(0, 0, 0), jS = 0, CS = T, MS = J;
			}
			return;
		}
		U ||= O, W ||= j, G ||= F, (O !== wS || U !== DS) && (w.blendEquationSeparate(tC[O], tC[U]), wS = O, DS = U), (j !== TS || F !== ES || W !== OS || G !== kS) && (w.blendFuncSeparate(nC[j], nC[F], nC[W], nC[G]), TS = j, ES = F, OS = W, kS = G), (K.equals(AS) === !1 || q !== jS) && (w.blendColor(K.r, K.g, K.b, q), AS.copy(K), jS = q), CS = T, MS = !1;
	}
	function iC(T, O) {
		T.side === 2 ? ZS(w.CULL_FACE) : XS(w.CULL_FACE);
		let j = T.side === 1;
		O && (j = !j), aC(j), T.blending === 1 && T.transparent === !1 ? rC(0) : rC(T.blending, T.blendEquation, T.blendSrc, T.blendDst, T.blendEquationAlpha, T.blendSrcAlpha, T.blendDstAlpha, T.blendColor, T.blendAlpha, T.premultipliedAlpha), W.setFunc(T.depthFunc), W.setTest(T.depthTest), W.setMask(T.depthWrite), U.setMask(T.colorWrite);
		let F = T.stencilWrite;
		G.setTest(F), F && (G.setMask(T.stencilWriteMask), G.setFunc(T.stencilFunc, T.stencilRef, T.stencilFuncMask), G.setOp(T.stencilFail, T.stencilZFail, T.stencilZPass)), cC(T.polygonOffset, T.polygonOffsetFactor, T.polygonOffsetUnits), T.alphaToCoverage === !0 ? XS(w.SAMPLE_ALPHA_TO_COVERAGE) : ZS(w.SAMPLE_ALPHA_TO_COVERAGE);
	}
	function aC(T) {
		NS !== T && (T ? w.frontFace(w.CW) : w.frontFace(w.CCW), NS = T);
	}
	function oC(T) {
		T === 0 ? ZS(w.CULL_FACE) : (XS(w.CULL_FACE), T !== PS && (T === 1 ? w.cullFace(w.BACK) : T === 2 ? w.cullFace(w.FRONT) : w.cullFace(w.FRONT_AND_BACK))), PS = T;
	}
	function sC(T) {
		T !== FS && (zS && w.lineWidth(T), FS = T);
	}
	function cC(T, O, j) {
		T ? (XS(w.POLYGON_OFFSET_FILL), (IS !== O || LS !== j) && (w.polygonOffset(O, j), IS = O, LS = j)) : ZS(w.POLYGON_OFFSET_FILL);
	}
	function lC(T) {
		T ? XS(w.SCISSOR_TEST) : ZS(w.SCISSOR_TEST);
	}
	function uC(T) {
		T === void 0 && (T = w.TEXTURE0 + RS - 1), HS !== T && (w.activeTexture(T), HS = T);
	}
	function dC(T, O, j) {
		j === void 0 && (j = HS === null ? w.TEXTURE0 + RS - 1 : HS);
		let F = US[j];
		F === void 0 && (F = {
			type: void 0,
			texture: void 0
		}, US[j] = F), (F.type !== T || F.texture !== O) && (HS !== j && (w.activeTexture(j), HS = j), w.bindTexture(T, O || YS[T]), F.type = T, F.texture = O);
	}
	function fC() {
		let T = US[HS];
		T !== void 0 && T.type !== void 0 && (w.bindTexture(T.type, null), T.type = void 0, T.texture = void 0);
	}
	function pC() {
		try {
			w.compressedTexImage2D(...arguments);
		} catch (w) {
			error("WebGLState:", w);
		}
	}
	function mC() {
		try {
			w.compressedTexImage3D(...arguments);
		} catch (w) {
			error("WebGLState:", w);
		}
	}
	function hC() {
		try {
			w.texSubImage2D(...arguments);
		} catch (w) {
			error("WebGLState:", w);
		}
	}
	function gC() {
		try {
			w.texSubImage3D(...arguments);
		} catch (w) {
			error("WebGLState:", w);
		}
	}
	function _C() {
		try {
			w.compressedTexSubImage2D(...arguments);
		} catch (w) {
			error("WebGLState:", w);
		}
	}
	function vC() {
		try {
			w.compressedTexSubImage3D(...arguments);
		} catch (w) {
			error("WebGLState:", w);
		}
	}
	function yC() {
		try {
			w.texStorage2D(...arguments);
		} catch (w) {
			error("WebGLState:", w);
		}
	}
	function bC() {
		try {
			w.texStorage3D(...arguments);
		} catch (w) {
			error("WebGLState:", w);
		}
	}
	function xC() {
		try {
			w.texImage2D(...arguments);
		} catch (w) {
			error("WebGLState:", w);
		}
	}
	function SC() {
		try {
			w.texImage3D(...arguments);
		} catch (w) {
			error("WebGLState:", w);
		}
	}
	function CC(T) {
		KS.equals(T) === !1 && (w.scissor(T.x, T.y, T.z, T.w), KS.copy(T));
	}
	function wC(T) {
		qS.equals(T) === !1 && (w.viewport(T.x, T.y, T.z, T.w), qS.copy(T));
	}
	function TC(T, O) {
		let j = q.get(O);
		j === void 0 && (j = /* @__PURE__ */ new WeakMap(), q.set(O, j));
		let F = j.get(T);
		F === void 0 && (F = w.getUniformBlockIndex(O, T.name), j.set(T, F));
	}
	function EC(T, O) {
		let j = q.get(O).get(T);
		K.get(O) !== j && (w.uniformBlockBinding(O, j, T.__bindingPointIndex), K.set(O, j));
	}
	function DC() {
		w.disable(w.BLEND), w.disable(w.CULL_FACE), w.disable(w.DEPTH_TEST), w.disable(w.POLYGON_OFFSET_FILL), w.disable(w.SCISSOR_TEST), w.disable(w.STENCIL_TEST), w.disable(w.SAMPLE_ALPHA_TO_COVERAGE), w.blendEquation(w.FUNC_ADD), w.blendFunc(w.ONE, w.ZERO), w.blendFuncSeparate(w.ONE, w.ZERO, w.ONE, w.ZERO), w.blendColor(0, 0, 0, 0), w.colorMask(!0, !0, !0, !0), w.clearColor(0, 0, 0, 0), w.depthMask(!0), w.depthFunc(w.LESS), W.setReversed(!1), w.clearDepth(1), w.stencilMask(4294967295), w.stencilFunc(w.ALWAYS, 0, 4294967295), w.stencilOp(w.KEEP, w.KEEP, w.KEEP), w.clearStencil(0), w.cullFace(w.BACK), w.frontFace(w.CCW), w.polygonOffset(0, 0), w.activeTexture(w.TEXTURE0), w.bindFramebuffer(w.FRAMEBUFFER, null), w.bindFramebuffer(w.DRAW_FRAMEBUFFER, null), w.bindFramebuffer(w.READ_FRAMEBUFFER, null), w.useProgram(null), w.lineWidth(1), w.scissor(0, 0, w.canvas.width, w.canvas.height), w.viewport(0, 0, w.canvas.width, w.canvas.height), J = {}, HS = null, US = {}, Y = {}, X = /* @__PURE__ */ new WeakMap(), Q = [], xS = null, SS = !1, CS = null, wS = null, TS = null, ES = null, DS = null, OS = null, kS = null, AS = new Color(0, 0, 0), jS = 0, MS = !1, NS = null, PS = null, FS = null, IS = null, LS = null, KS.set(0, 0, w.canvas.width, w.canvas.height), qS.set(0, 0, w.canvas.width, w.canvas.height), U.reset(), W.reset(), G.reset();
	}
	return {
		buffers: {
			color: U,
			depth: W,
			stencil: G
		},
		enable: XS,
		disable: ZS,
		bindFramebuffer: QS,
		drawBuffers: $S,
		useProgram: eC,
		setBlending: rC,
		setMaterial: iC,
		setFlipSided: aC,
		setCullFace: oC,
		setLineWidth: sC,
		setPolygonOffset: cC,
		setScissorTest: lC,
		activeTexture: uC,
		bindTexture: dC,
		unbindTexture: fC,
		compressedTexImage2D: pC,
		compressedTexImage3D: mC,
		texImage2D: xC,
		texImage3D: SC,
		updateUBOMapping: TC,
		uniformBlockBinding: EC,
		texStorage2D: yC,
		texStorage3D: bC,
		texSubImage2D: hC,
		texSubImage3D: gC,
		compressedTexSubImage2D: _C,
		compressedTexSubImage3D: vC,
		scissor: CC,
		viewport: wC,
		reset: DC
	};
}
function WebGLTextures(w, T, O, j, F, U, W) {
	let G = T.has("WEBGL_multisampled_render_to_texture") ? T.get("WEBGL_multisampled_render_to_texture") : null, K = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), q = new Vector2(), J = /* @__PURE__ */ new WeakMap(), Y, X = /* @__PURE__ */ new WeakMap(), Q = !1;
	try {
		Q = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
	} catch {}
	function xS(w, T) {
		return Q ? new OffscreenCanvas(w, T) : createElementNS("canvas");
	}
	function SS(w, T, O) {
		let j = 1, F = dC(w);
		if ((F.width > O || F.height > O) && (j = O / Math.max(F.width, F.height)), j < 1) if (typeof HTMLImageElement < "u" && w instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && w instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && w instanceof ImageBitmap || typeof VideoFrame < "u" && w instanceof VideoFrame) {
			let O = Math.floor(j * F.width), U = Math.floor(j * F.height);
			Y === void 0 && (Y = xS(O, U));
			let W = T ? xS(O, U) : Y;
			return W.width = O, W.height = U, W.getContext("2d").drawImage(w, 0, 0, O, U), warn("WebGLRenderer: Texture has been resized from (" + F.width + "x" + F.height + ") to (" + O + "x" + U + ")."), W;
		} else return "data" in w && warn("WebGLRenderer: Image in DataTexture is too big (" + F.width + "x" + F.height + ")."), w;
		return w;
	}
	function CS(w) {
		return w.generateMipmaps;
	}
	function wS(T) {
		w.generateMipmap(T);
	}
	function TS(T) {
		return T.isWebGLCubeRenderTarget ? w.TEXTURE_CUBE_MAP : T.isWebGL3DRenderTarget ? w.TEXTURE_3D : T.isWebGLArrayRenderTarget || T.isCompressedArrayTexture ? w.TEXTURE_2D_ARRAY : w.TEXTURE_2D;
	}
	function ES(O, j, F, U, W = !1) {
		if (O !== null) {
			if (w[O] !== void 0) return w[O];
			warn("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + O + "'");
		}
		let G = j;
		if (j === w.RED && (F === w.FLOAT && (G = w.R32F), F === w.HALF_FLOAT && (G = w.R16F), F === w.UNSIGNED_BYTE && (G = w.R8)), j === w.RED_INTEGER && (F === w.UNSIGNED_BYTE && (G = w.R8UI), F === w.UNSIGNED_SHORT && (G = w.R16UI), F === w.UNSIGNED_INT && (G = w.R32UI), F === w.BYTE && (G = w.R8I), F === w.SHORT && (G = w.R16I), F === w.INT && (G = w.R32I)), j === w.RG && (F === w.FLOAT && (G = w.RG32F), F === w.HALF_FLOAT && (G = w.RG16F), F === w.UNSIGNED_BYTE && (G = w.RG8)), j === w.RG_INTEGER && (F === w.UNSIGNED_BYTE && (G = w.RG8UI), F === w.UNSIGNED_SHORT && (G = w.RG16UI), F === w.UNSIGNED_INT && (G = w.RG32UI), F === w.BYTE && (G = w.RG8I), F === w.SHORT && (G = w.RG16I), F === w.INT && (G = w.RG32I)), j === w.RGB_INTEGER && (F === w.UNSIGNED_BYTE && (G = w.RGB8UI), F === w.UNSIGNED_SHORT && (G = w.RGB16UI), F === w.UNSIGNED_INT && (G = w.RGB32UI), F === w.BYTE && (G = w.RGB8I), F === w.SHORT && (G = w.RGB16I), F === w.INT && (G = w.RGB32I)), j === w.RGBA_INTEGER && (F === w.UNSIGNED_BYTE && (G = w.RGBA8UI), F === w.UNSIGNED_SHORT && (G = w.RGBA16UI), F === w.UNSIGNED_INT && (G = w.RGBA32UI), F === w.BYTE && (G = w.RGBA8I), F === w.SHORT && (G = w.RGBA16I), F === w.INT && (G = w.RGBA32I)), j === w.RGB && (F === w.UNSIGNED_INT_5_9_9_9_REV && (G = w.RGB9_E5), F === w.UNSIGNED_INT_10F_11F_11F_REV && (G = w.R11F_G11F_B10F)), j === w.RGBA) {
			let T = W ? LinearTransfer : ColorManagement.getTransfer(U);
			F === w.FLOAT && (G = w.RGBA32F), F === w.HALF_FLOAT && (G = w.RGBA16F), F === w.UNSIGNED_BYTE && (G = T === "srgb" ? w.SRGB8_ALPHA8 : w.RGBA8), F === w.UNSIGNED_SHORT_4_4_4_4 && (G = w.RGBA4), F === w.UNSIGNED_SHORT_5_5_5_1 && (G = w.RGB5_A1);
		}
		return (G === w.R16F || G === w.R32F || G === w.RG16F || G === w.RG32F || G === w.RGBA16F || G === w.RGBA32F) && T.get("EXT_color_buffer_float"), G;
	}
	function DS(T, O) {
		let j;
		return T ? O === null || O === 1014 || O === 1020 ? j = w.DEPTH24_STENCIL8 : O === 1015 ? j = w.DEPTH32F_STENCIL8 : O === 1012 && (j = w.DEPTH24_STENCIL8, warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : O === null || O === 1014 || O === 1020 ? j = w.DEPTH_COMPONENT24 : O === 1015 ? j = w.DEPTH_COMPONENT32F : O === 1012 && (j = w.DEPTH_COMPONENT16), j;
	}
	function OS(w, T) {
		return CS(w) === !0 || w.isFramebufferTexture && w.minFilter !== 1003 && w.minFilter !== 1006 ? Math.log2(Math.max(T.width, T.height)) + 1 : w.mipmaps !== void 0 && w.mipmaps.length > 0 ? w.mipmaps.length : w.isCompressedTexture && Array.isArray(w.image) ? T.mipmaps.length : 1;
	}
	function kS(w) {
		let T = w.target;
		T.removeEventListener("dispose", kS), jS(T), T.isVideoTexture && J.delete(T);
	}
	function AS(w) {
		let T = w.target;
		T.removeEventListener("dispose", AS), NS(T);
	}
	function jS(w) {
		let T = j.get(w);
		if (T.__webglInit === void 0) return;
		let O = w.source, F = X.get(O);
		if (F) {
			let j = F[T.__cacheKey];
			j.usedTimes--, j.usedTimes === 0 && MS(w), Object.keys(F).length === 0 && X.delete(O);
		}
		j.remove(w);
	}
	function MS(T) {
		let O = j.get(T);
		w.deleteTexture(O.__webglTexture);
		let F = T.source, U = X.get(F);
		delete U[O.__cacheKey], W.memory.textures--;
	}
	function NS(T) {
		let O = j.get(T);
		if (T.depthTexture && (T.depthTexture.dispose(), j.remove(T.depthTexture)), T.isWebGLCubeRenderTarget) for (let T = 0; T < 6; T++) {
			if (Array.isArray(O.__webglFramebuffer[T])) for (let j = 0; j < O.__webglFramebuffer[T].length; j++) w.deleteFramebuffer(O.__webglFramebuffer[T][j]);
			else w.deleteFramebuffer(O.__webglFramebuffer[T]);
			O.__webglDepthbuffer && w.deleteRenderbuffer(O.__webglDepthbuffer[T]);
		}
		else {
			if (Array.isArray(O.__webglFramebuffer)) for (let T = 0; T < O.__webglFramebuffer.length; T++) w.deleteFramebuffer(O.__webglFramebuffer[T]);
			else w.deleteFramebuffer(O.__webglFramebuffer);
			if (O.__webglDepthbuffer && w.deleteRenderbuffer(O.__webglDepthbuffer), O.__webglMultisampledFramebuffer && w.deleteFramebuffer(O.__webglMultisampledFramebuffer), O.__webglColorRenderbuffer) for (let T = 0; T < O.__webglColorRenderbuffer.length; T++) O.__webglColorRenderbuffer[T] && w.deleteRenderbuffer(O.__webglColorRenderbuffer[T]);
			O.__webglDepthRenderbuffer && w.deleteRenderbuffer(O.__webglDepthRenderbuffer);
		}
		let F = T.textures;
		for (let T = 0, O = F.length; T < O; T++) {
			let O = j.get(F[T]);
			O.__webglTexture && (w.deleteTexture(O.__webglTexture), W.memory.textures--), j.remove(F[T]);
		}
		j.remove(T);
	}
	let PS = 0;
	function FS() {
		PS = 0;
	}
	function IS() {
		let w = PS;
		return w >= F.maxTextures && warn("WebGLTextures: Trying to use " + w + " texture units while this GPU supports only " + F.maxTextures), PS += 1, w;
	}
	function LS(w) {
		let T = [];
		return T.push(w.wrapS), T.push(w.wrapT), T.push(w.wrapR || 0), T.push(w.magFilter), T.push(w.minFilter), T.push(w.anisotropy), T.push(w.internalFormat), T.push(w.format), T.push(w.type), T.push(w.generateMipmaps), T.push(w.premultiplyAlpha), T.push(w.flipY), T.push(w.unpackAlignment), T.push(w.colorSpace), T.join();
	}
	function RS(T, F) {
		let U = j.get(T);
		if (T.isVideoTexture && lC(T), T.isRenderTargetTexture === !1 && T.isExternalTexture !== !0 && T.version > 0 && U.__version !== T.version) {
			let w = T.image;
			if (w === null) warn("WebGLRenderer: Texture marked for update but no image data found.");
			else if (w.complete === !1) warn("WebGLRenderer: Texture marked for update but image is incomplete");
			else {
				YS(U, T, F);
				return;
			}
		} else T.isExternalTexture && (U.__webglTexture = T.sourceTexture ? T.sourceTexture : null);
		O.bindTexture(w.TEXTURE_2D, U.__webglTexture, w.TEXTURE0 + F);
	}
	function zS(T, F) {
		let U = j.get(T);
		if (T.isRenderTargetTexture === !1 && T.version > 0 && U.__version !== T.version) {
			YS(U, T, F);
			return;
		} else T.isExternalTexture && (U.__webglTexture = T.sourceTexture ? T.sourceTexture : null);
		O.bindTexture(w.TEXTURE_2D_ARRAY, U.__webglTexture, w.TEXTURE0 + F);
	}
	function BS(T, F) {
		let U = j.get(T);
		if (T.isRenderTargetTexture === !1 && T.version > 0 && U.__version !== T.version) {
			YS(U, T, F);
			return;
		}
		O.bindTexture(w.TEXTURE_3D, U.__webglTexture, w.TEXTURE0 + F);
	}
	function VS(T, F) {
		let U = j.get(T);
		if (T.isCubeDepthTexture !== !0 && T.version > 0 && U.__version !== T.version) {
			XS(U, T, F);
			return;
		}
		O.bindTexture(w.TEXTURE_CUBE_MAP, U.__webglTexture, w.TEXTURE0 + F);
	}
	let HS = {
		[RepeatWrapping]: w.REPEAT,
		[ClampToEdgeWrapping]: w.CLAMP_TO_EDGE,
		[MirroredRepeatWrapping]: w.MIRRORED_REPEAT
	}, US = {
		[NearestFilter]: w.NEAREST,
		[NearestMipmapNearestFilter]: w.NEAREST_MIPMAP_NEAREST,
		[NearestMipmapLinearFilter]: w.NEAREST_MIPMAP_LINEAR,
		[LinearFilter]: w.LINEAR,
		[LinearMipmapNearestFilter]: w.LINEAR_MIPMAP_NEAREST,
		[LinearMipmapLinearFilter]: w.LINEAR_MIPMAP_LINEAR
	}, WS = {
		512: w.NEVER,
		519: w.ALWAYS,
		513: w.LESS,
		515: w.LEQUAL,
		514: w.EQUAL,
		518: w.GEQUAL,
		516: w.GREATER,
		517: w.NOTEQUAL
	};
	function GS(O, U) {
		if (U.type === 1015 && T.has("OES_texture_float_linear") === !1 && (U.magFilter === 1006 || U.magFilter === 1007 || U.magFilter === 1005 || U.magFilter === 1008 || U.minFilter === 1006 || U.minFilter === 1007 || U.minFilter === 1005 || U.minFilter === 1008) && warn("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), w.texParameteri(O, w.TEXTURE_WRAP_S, HS[U.wrapS]), w.texParameteri(O, w.TEXTURE_WRAP_T, HS[U.wrapT]), (O === w.TEXTURE_3D || O === w.TEXTURE_2D_ARRAY) && w.texParameteri(O, w.TEXTURE_WRAP_R, HS[U.wrapR]), w.texParameteri(O, w.TEXTURE_MAG_FILTER, US[U.magFilter]), w.texParameteri(O, w.TEXTURE_MIN_FILTER, US[U.minFilter]), U.compareFunction && (w.texParameteri(O, w.TEXTURE_COMPARE_MODE, w.COMPARE_REF_TO_TEXTURE), w.texParameteri(O, w.TEXTURE_COMPARE_FUNC, WS[U.compareFunction])), T.has("EXT_texture_filter_anisotropic") === !0) {
			if (U.magFilter === 1003 || U.minFilter !== 1005 && U.minFilter !== 1008 || U.type === 1015 && T.has("OES_texture_float_linear") === !1) return;
			if (U.anisotropy > 1 || j.get(U).__currentAnisotropy) {
				let W = T.get("EXT_texture_filter_anisotropic");
				w.texParameterf(O, W.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(U.anisotropy, F.getMaxAnisotropy())), j.get(U).__currentAnisotropy = U.anisotropy;
			}
		}
	}
	function KS(T, O) {
		let j = !1;
		T.__webglInit === void 0 && (T.__webglInit = !0, O.addEventListener("dispose", kS));
		let F = O.source, U = X.get(F);
		U === void 0 && (U = {}, X.set(F, U));
		let G = LS(O);
		if (G !== T.__cacheKey) {
			U[G] === void 0 && (U[G] = {
				texture: w.createTexture(),
				usedTimes: 0
			}, W.memory.textures++, j = !0), U[G].usedTimes++;
			let F = U[T.__cacheKey];
			F !== void 0 && (U[T.__cacheKey].usedTimes--, F.usedTimes === 0 && MS(O)), T.__cacheKey = G, T.__webglTexture = U[G].texture;
		}
		return j;
	}
	function qS(w, T, O) {
		return Math.floor(Math.floor(w / O) / T);
	}
	function JS(T, j, F, U) {
		let W = T.updateRanges;
		if (W.length === 0) O.texSubImage2D(w.TEXTURE_2D, 0, 0, 0, j.width, j.height, F, U, j.data);
		else {
			W.sort((w, T) => w.start - T.start);
			let G = 0;
			for (let w = 1; w < W.length; w++) {
				let T = W[G], O = W[w], F = T.start + T.count, U = qS(O.start, j.width, 4), K = qS(T.start, j.width, 4);
				O.start <= F + 1 && U === K && qS(O.start + O.count - 1, j.width, 4) === U ? T.count = Math.max(T.count, O.start + O.count - T.start) : (++G, W[G] = O);
			}
			W.length = G + 1;
			let K = w.getParameter(w.UNPACK_ROW_LENGTH), q = w.getParameter(w.UNPACK_SKIP_PIXELS), J = w.getParameter(w.UNPACK_SKIP_ROWS);
			w.pixelStorei(w.UNPACK_ROW_LENGTH, j.width);
			for (let T = 0, G = W.length; T < G; T++) {
				let G = W[T], K = Math.floor(G.start / 4), q = Math.ceil(G.count / 4), J = K % j.width, Y = Math.floor(K / j.width), X = q;
				w.pixelStorei(w.UNPACK_SKIP_PIXELS, J), w.pixelStorei(w.UNPACK_SKIP_ROWS, Y), O.texSubImage2D(w.TEXTURE_2D, 0, J, Y, X, 1, F, U, j.data);
			}
			T.clearUpdateRanges(), w.pixelStorei(w.UNPACK_ROW_LENGTH, K), w.pixelStorei(w.UNPACK_SKIP_PIXELS, q), w.pixelStorei(w.UNPACK_SKIP_ROWS, J);
		}
	}
	function YS(T, W, G) {
		let K = w.TEXTURE_2D;
		(W.isDataArrayTexture || W.isCompressedArrayTexture) && (K = w.TEXTURE_2D_ARRAY), W.isData3DTexture && (K = w.TEXTURE_3D);
		let q = KS(T, W), J = W.source;
		O.bindTexture(K, T.__webglTexture, w.TEXTURE0 + G);
		let Y = j.get(J);
		if (J.version !== Y.__version || q === !0) {
			O.activeTexture(w.TEXTURE0 + G);
			let T = ColorManagement.getPrimaries(ColorManagement.workingColorSpace), j = W.colorSpace === "" ? null : ColorManagement.getPrimaries(W.colorSpace), X = W.colorSpace === "" || T === j ? w.NONE : w.BROWSER_DEFAULT_WEBGL;
			w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL, W.flipY), w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL, W.premultiplyAlpha), w.pixelStorei(w.UNPACK_ALIGNMENT, W.unpackAlignment), w.pixelStorei(w.UNPACK_COLORSPACE_CONVERSION_WEBGL, X);
			let Q = SS(W.image, !1, F.maxTextureSize);
			Q = uC(W, Q);
			let xS = U.convert(W.format, W.colorSpace), TS = U.convert(W.type), kS = ES(W.internalFormat, xS, TS, W.colorSpace, W.isVideoTexture);
			GS(K, W);
			let AS, jS = W.mipmaps, MS = W.isVideoTexture !== !0, NS = Y.__version === void 0 || q === !0, PS = J.dataReady, FS = OS(W, Q);
			if (W.isDepthTexture) kS = DS(W.format === DepthStencilFormat, W.type), NS && (MS ? O.texStorage2D(w.TEXTURE_2D, 1, kS, Q.width, Q.height) : O.texImage2D(w.TEXTURE_2D, 0, kS, Q.width, Q.height, 0, xS, TS, null));
			else if (W.isDataTexture) if (jS.length > 0) {
				MS && NS && O.texStorage2D(w.TEXTURE_2D, FS, kS, jS[0].width, jS[0].height);
				for (let T = 0, j = jS.length; T < j; T++) AS = jS[T], MS ? PS && O.texSubImage2D(w.TEXTURE_2D, T, 0, 0, AS.width, AS.height, xS, TS, AS.data) : O.texImage2D(w.TEXTURE_2D, T, kS, AS.width, AS.height, 0, xS, TS, AS.data);
				W.generateMipmaps = !1;
			} else MS ? (NS && O.texStorage2D(w.TEXTURE_2D, FS, kS, Q.width, Q.height), PS && JS(W, Q, xS, TS)) : O.texImage2D(w.TEXTURE_2D, 0, kS, Q.width, Q.height, 0, xS, TS, Q.data);
			else if (W.isCompressedTexture) if (W.isCompressedArrayTexture) {
				MS && NS && O.texStorage3D(w.TEXTURE_2D_ARRAY, FS, kS, jS[0].width, jS[0].height, Q.depth);
				for (let T = 0, j = jS.length; T < j; T++) if (AS = jS[T], W.format !== 1023) if (xS !== null) if (MS) {
					if (PS) if (W.layerUpdates.size > 0) {
						let j = getByteLength(AS.width, AS.height, W.format, W.type);
						for (let F of W.layerUpdates) {
							let U = AS.data.subarray(F * j / AS.data.BYTES_PER_ELEMENT, (F + 1) * j / AS.data.BYTES_PER_ELEMENT);
							O.compressedTexSubImage3D(w.TEXTURE_2D_ARRAY, T, 0, 0, F, AS.width, AS.height, 1, xS, U);
						}
						W.clearLayerUpdates();
					} else O.compressedTexSubImage3D(w.TEXTURE_2D_ARRAY, T, 0, 0, 0, AS.width, AS.height, Q.depth, xS, AS.data);
				} else O.compressedTexImage3D(w.TEXTURE_2D_ARRAY, T, kS, AS.width, AS.height, Q.depth, 0, AS.data, 0, 0);
				else warn("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
				else MS ? PS && O.texSubImage3D(w.TEXTURE_2D_ARRAY, T, 0, 0, 0, AS.width, AS.height, Q.depth, xS, TS, AS.data) : O.texImage3D(w.TEXTURE_2D_ARRAY, T, kS, AS.width, AS.height, Q.depth, 0, xS, TS, AS.data);
			} else {
				MS && NS && O.texStorage2D(w.TEXTURE_2D, FS, kS, jS[0].width, jS[0].height);
				for (let T = 0, j = jS.length; T < j; T++) AS = jS[T], W.format === 1023 ? MS ? PS && O.texSubImage2D(w.TEXTURE_2D, T, 0, 0, AS.width, AS.height, xS, TS, AS.data) : O.texImage2D(w.TEXTURE_2D, T, kS, AS.width, AS.height, 0, xS, TS, AS.data) : xS === null ? warn("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : MS ? PS && O.compressedTexSubImage2D(w.TEXTURE_2D, T, 0, 0, AS.width, AS.height, xS, AS.data) : O.compressedTexImage2D(w.TEXTURE_2D, T, kS, AS.width, AS.height, 0, AS.data);
			}
			else if (W.isDataArrayTexture) if (MS) {
				if (NS && O.texStorage3D(w.TEXTURE_2D_ARRAY, FS, kS, Q.width, Q.height, Q.depth), PS) if (W.layerUpdates.size > 0) {
					let T = getByteLength(Q.width, Q.height, W.format, W.type);
					for (let j of W.layerUpdates) {
						let F = Q.data.subarray(j * T / Q.data.BYTES_PER_ELEMENT, (j + 1) * T / Q.data.BYTES_PER_ELEMENT);
						O.texSubImage3D(w.TEXTURE_2D_ARRAY, 0, 0, 0, j, Q.width, Q.height, 1, xS, TS, F);
					}
					W.clearLayerUpdates();
				} else O.texSubImage3D(w.TEXTURE_2D_ARRAY, 0, 0, 0, 0, Q.width, Q.height, Q.depth, xS, TS, Q.data);
			} else O.texImage3D(w.TEXTURE_2D_ARRAY, 0, kS, Q.width, Q.height, Q.depth, 0, xS, TS, Q.data);
			else if (W.isData3DTexture) MS ? (NS && O.texStorage3D(w.TEXTURE_3D, FS, kS, Q.width, Q.height, Q.depth), PS && O.texSubImage3D(w.TEXTURE_3D, 0, 0, 0, 0, Q.width, Q.height, Q.depth, xS, TS, Q.data)) : O.texImage3D(w.TEXTURE_3D, 0, kS, Q.width, Q.height, Q.depth, 0, xS, TS, Q.data);
			else if (W.isFramebufferTexture) {
				if (NS) if (MS) O.texStorage2D(w.TEXTURE_2D, FS, kS, Q.width, Q.height);
				else {
					let T = Q.width, j = Q.height;
					for (let F = 0; F < FS; F++) O.texImage2D(w.TEXTURE_2D, F, kS, T, j, 0, xS, TS, null), T >>= 1, j >>= 1;
				}
			} else if (jS.length > 0) {
				if (MS && NS) {
					let T = dC(jS[0]);
					O.texStorage2D(w.TEXTURE_2D, FS, kS, T.width, T.height);
				}
				for (let T = 0, j = jS.length; T < j; T++) AS = jS[T], MS ? PS && O.texSubImage2D(w.TEXTURE_2D, T, 0, 0, xS, TS, AS) : O.texImage2D(w.TEXTURE_2D, T, kS, xS, TS, AS);
				W.generateMipmaps = !1;
			} else if (MS) {
				if (NS) {
					let T = dC(Q);
					O.texStorage2D(w.TEXTURE_2D, FS, kS, T.width, T.height);
				}
				PS && O.texSubImage2D(w.TEXTURE_2D, 0, 0, 0, xS, TS, Q);
			} else O.texImage2D(w.TEXTURE_2D, 0, kS, xS, TS, Q);
			CS(W) && wS(K), Y.__version = J.version, W.onUpdate && W.onUpdate(W);
		}
		T.__version = W.version;
	}
	function XS(T, W, G) {
		if (W.image.length !== 6) return;
		let K = KS(T, W), q = W.source;
		O.bindTexture(w.TEXTURE_CUBE_MAP, T.__webglTexture, w.TEXTURE0 + G);
		let J = j.get(q);
		if (q.version !== J.__version || K === !0) {
			O.activeTexture(w.TEXTURE0 + G);
			let T = ColorManagement.getPrimaries(ColorManagement.workingColorSpace), j = W.colorSpace === "" ? null : ColorManagement.getPrimaries(W.colorSpace), Y = W.colorSpace === "" || T === j ? w.NONE : w.BROWSER_DEFAULT_WEBGL;
			w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL, W.flipY), w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL, W.premultiplyAlpha), w.pixelStorei(w.UNPACK_ALIGNMENT, W.unpackAlignment), w.pixelStorei(w.UNPACK_COLORSPACE_CONVERSION_WEBGL, Y);
			let X = W.isCompressedTexture || W.image[0].isCompressedTexture, Q = W.image[0] && W.image[0].isDataTexture, xS = [];
			for (let w = 0; w < 6; w++) !X && !Q ? xS[w] = SS(W.image[w], !0, F.maxCubemapSize) : xS[w] = Q ? W.image[w].image : W.image[w], xS[w] = uC(W, xS[w]);
			let TS = xS[0], DS = U.convert(W.format, W.colorSpace), kS = U.convert(W.type), AS = ES(W.internalFormat, DS, kS, W.colorSpace), jS = W.isVideoTexture !== !0, MS = J.__version === void 0 || K === !0, NS = q.dataReady, PS = OS(W, TS);
			GS(w.TEXTURE_CUBE_MAP, W);
			let FS;
			if (X) {
				jS && MS && O.texStorage2D(w.TEXTURE_CUBE_MAP, PS, AS, TS.width, TS.height);
				for (let T = 0; T < 6; T++) {
					FS = xS[T].mipmaps;
					for (let j = 0; j < FS.length; j++) {
						let F = FS[j];
						W.format === 1023 ? jS ? NS && O.texSubImage2D(w.TEXTURE_CUBE_MAP_POSITIVE_X + T, j, 0, 0, F.width, F.height, DS, kS, F.data) : O.texImage2D(w.TEXTURE_CUBE_MAP_POSITIVE_X + T, j, AS, F.width, F.height, 0, DS, kS, F.data) : DS === null ? warn("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : jS ? NS && O.compressedTexSubImage2D(w.TEXTURE_CUBE_MAP_POSITIVE_X + T, j, 0, 0, F.width, F.height, DS, F.data) : O.compressedTexImage2D(w.TEXTURE_CUBE_MAP_POSITIVE_X + T, j, AS, F.width, F.height, 0, F.data);
					}
				}
			} else {
				if (FS = W.mipmaps, jS && MS) {
					FS.length > 0 && PS++;
					let T = dC(xS[0]);
					O.texStorage2D(w.TEXTURE_CUBE_MAP, PS, AS, T.width, T.height);
				}
				for (let T = 0; T < 6; T++) if (Q) {
					jS ? NS && O.texSubImage2D(w.TEXTURE_CUBE_MAP_POSITIVE_X + T, 0, 0, 0, xS[T].width, xS[T].height, DS, kS, xS[T].data) : O.texImage2D(w.TEXTURE_CUBE_MAP_POSITIVE_X + T, 0, AS, xS[T].width, xS[T].height, 0, DS, kS, xS[T].data);
					for (let j = 0; j < FS.length; j++) {
						let F = FS[j].image[T].image;
						jS ? NS && O.texSubImage2D(w.TEXTURE_CUBE_MAP_POSITIVE_X + T, j + 1, 0, 0, F.width, F.height, DS, kS, F.data) : O.texImage2D(w.TEXTURE_CUBE_MAP_POSITIVE_X + T, j + 1, AS, F.width, F.height, 0, DS, kS, F.data);
					}
				} else {
					jS ? NS && O.texSubImage2D(w.TEXTURE_CUBE_MAP_POSITIVE_X + T, 0, 0, 0, DS, kS, xS[T]) : O.texImage2D(w.TEXTURE_CUBE_MAP_POSITIVE_X + T, 0, AS, DS, kS, xS[T]);
					for (let j = 0; j < FS.length; j++) {
						let F = FS[j];
						jS ? NS && O.texSubImage2D(w.TEXTURE_CUBE_MAP_POSITIVE_X + T, j + 1, 0, 0, DS, kS, F.image[T]) : O.texImage2D(w.TEXTURE_CUBE_MAP_POSITIVE_X + T, j + 1, AS, DS, kS, F.image[T]);
					}
				}
			}
			CS(W) && wS(w.TEXTURE_CUBE_MAP), J.__version = q.version, W.onUpdate && W.onUpdate(W);
		}
		T.__version = W.version;
	}
	function ZS(T, F, W, K, q, J) {
		let Y = U.convert(W.format, W.colorSpace), X = U.convert(W.type), Q = ES(W.internalFormat, Y, X, W.colorSpace), xS = j.get(F), SS = j.get(W);
		if (SS.__renderTarget = F, !xS.__hasExternalTextures) {
			let T = Math.max(1, F.width >> J), j = Math.max(1, F.height >> J);
			q === w.TEXTURE_3D || q === w.TEXTURE_2D_ARRAY ? O.texImage3D(q, J, Q, T, j, F.depth, 0, Y, X, null) : O.texImage2D(q, J, Q, T, j, 0, Y, X, null);
		}
		O.bindFramebuffer(w.FRAMEBUFFER, T), cC(F) ? G.framebufferTexture2DMultisampleEXT(w.FRAMEBUFFER, K, q, SS.__webglTexture, 0, sC(F)) : (q === w.TEXTURE_2D || q >= w.TEXTURE_CUBE_MAP_POSITIVE_X && q <= w.TEXTURE_CUBE_MAP_NEGATIVE_Z) && w.framebufferTexture2D(w.FRAMEBUFFER, K, q, SS.__webglTexture, J), O.bindFramebuffer(w.FRAMEBUFFER, null);
	}
	function QS(T, O, j) {
		if (w.bindRenderbuffer(w.RENDERBUFFER, T), O.depthBuffer) {
			let F = O.depthTexture, U = F && F.isDepthTexture ? F.type : null, W = DS(O.stencilBuffer, U), K = O.stencilBuffer ? w.DEPTH_STENCIL_ATTACHMENT : w.DEPTH_ATTACHMENT;
			cC(O) ? G.renderbufferStorageMultisampleEXT(w.RENDERBUFFER, sC(O), W, O.width, O.height) : j ? w.renderbufferStorageMultisample(w.RENDERBUFFER, sC(O), W, O.width, O.height) : w.renderbufferStorage(w.RENDERBUFFER, W, O.width, O.height), w.framebufferRenderbuffer(w.FRAMEBUFFER, K, w.RENDERBUFFER, T);
		} else {
			let T = O.textures;
			for (let F = 0; F < T.length; F++) {
				let W = T[F], K = U.convert(W.format, W.colorSpace), q = U.convert(W.type), J = ES(W.internalFormat, K, q, W.colorSpace);
				cC(O) ? G.renderbufferStorageMultisampleEXT(w.RENDERBUFFER, sC(O), J, O.width, O.height) : j ? w.renderbufferStorageMultisample(w.RENDERBUFFER, sC(O), J, O.width, O.height) : w.renderbufferStorage(w.RENDERBUFFER, J, O.width, O.height);
			}
		}
		w.bindRenderbuffer(w.RENDERBUFFER, null);
	}
	function $S(T, F, W) {
		let K = F.isWebGLCubeRenderTarget === !0;
		if (O.bindFramebuffer(w.FRAMEBUFFER, T), !(F.depthTexture && F.depthTexture.isDepthTexture)) throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
		let q = j.get(F.depthTexture);
		if (q.__renderTarget = F, (!q.__webglTexture || F.depthTexture.image.width !== F.width || F.depthTexture.image.height !== F.height) && (F.depthTexture.image.width = F.width, F.depthTexture.image.height = F.height, F.depthTexture.needsUpdate = !0), K) {
			if (q.__webglInit === void 0 && (q.__webglInit = !0, F.depthTexture.addEventListener("dispose", kS)), q.__webglTexture === void 0) {
				q.__webglTexture = w.createTexture(), O.bindTexture(w.TEXTURE_CUBE_MAP, q.__webglTexture), GS(w.TEXTURE_CUBE_MAP, F.depthTexture);
				let T = U.convert(F.depthTexture.format), j = U.convert(F.depthTexture.type), W;
				F.depthTexture.format === 1026 ? W = w.DEPTH_COMPONENT24 : F.depthTexture.format === 1027 && (W = w.DEPTH24_STENCIL8);
				for (let O = 0; O < 6; O++) w.texImage2D(w.TEXTURE_CUBE_MAP_POSITIVE_X + O, 0, W, F.width, F.height, 0, T, j, null);
			}
		} else RS(F.depthTexture, 0);
		let J = q.__webglTexture, Y = sC(F), X = K ? w.TEXTURE_CUBE_MAP_POSITIVE_X + W : w.TEXTURE_2D, Q = F.depthTexture.format === 1027 ? w.DEPTH_STENCIL_ATTACHMENT : w.DEPTH_ATTACHMENT;
		if (F.depthTexture.format === 1026) cC(F) ? G.framebufferTexture2DMultisampleEXT(w.FRAMEBUFFER, Q, X, J, 0, Y) : w.framebufferTexture2D(w.FRAMEBUFFER, Q, X, J, 0);
		else if (F.depthTexture.format === 1027) cC(F) ? G.framebufferTexture2DMultisampleEXT(w.FRAMEBUFFER, Q, X, J, 0, Y) : w.framebufferTexture2D(w.FRAMEBUFFER, Q, X, J, 0);
		else throw Error("Unknown depthTexture format");
	}
	function eC(T) {
		let F = j.get(T), U = T.isWebGLCubeRenderTarget === !0;
		if (F.__boundDepthTexture !== T.depthTexture) {
			let w = T.depthTexture;
			if (F.__depthDisposeCallback && F.__depthDisposeCallback(), w) {
				let T = () => {
					delete F.__boundDepthTexture, delete F.__depthDisposeCallback, w.removeEventListener("dispose", T);
				};
				w.addEventListener("dispose", T), F.__depthDisposeCallback = T;
			}
			F.__boundDepthTexture = w;
		}
		if (T.depthTexture && !F.__autoAllocateDepthBuffer) if (U) for (let w = 0; w < 6; w++) $S(F.__webglFramebuffer[w], T, w);
		else {
			let w = T.texture.mipmaps;
			w && w.length > 0 ? $S(F.__webglFramebuffer[0], T, 0) : $S(F.__webglFramebuffer, T, 0);
		}
		else if (U) {
			F.__webglDepthbuffer = [];
			for (let j = 0; j < 6; j++) if (O.bindFramebuffer(w.FRAMEBUFFER, F.__webglFramebuffer[j]), F.__webglDepthbuffer[j] === void 0) F.__webglDepthbuffer[j] = w.createRenderbuffer(), QS(F.__webglDepthbuffer[j], T, !1);
			else {
				let O = T.stencilBuffer ? w.DEPTH_STENCIL_ATTACHMENT : w.DEPTH_ATTACHMENT, U = F.__webglDepthbuffer[j];
				w.bindRenderbuffer(w.RENDERBUFFER, U), w.framebufferRenderbuffer(w.FRAMEBUFFER, O, w.RENDERBUFFER, U);
			}
		} else {
			let j = T.texture.mipmaps;
			if (j && j.length > 0 ? O.bindFramebuffer(w.FRAMEBUFFER, F.__webglFramebuffer[0]) : O.bindFramebuffer(w.FRAMEBUFFER, F.__webglFramebuffer), F.__webglDepthbuffer === void 0) F.__webglDepthbuffer = w.createRenderbuffer(), QS(F.__webglDepthbuffer, T, !1);
			else {
				let O = T.stencilBuffer ? w.DEPTH_STENCIL_ATTACHMENT : w.DEPTH_ATTACHMENT, j = F.__webglDepthbuffer;
				w.bindRenderbuffer(w.RENDERBUFFER, j), w.framebufferRenderbuffer(w.FRAMEBUFFER, O, w.RENDERBUFFER, j);
			}
		}
		O.bindFramebuffer(w.FRAMEBUFFER, null);
	}
	function tC(T, O, F) {
		let U = j.get(T);
		O !== void 0 && ZS(U.__webglFramebuffer, T, T.texture, w.COLOR_ATTACHMENT0, w.TEXTURE_2D, 0), F !== void 0 && eC(T);
	}
	function nC(T) {
		let F = T.texture, G = j.get(T), K = j.get(F);
		T.addEventListener("dispose", AS);
		let q = T.textures, J = T.isWebGLCubeRenderTarget === !0, Y = q.length > 1;
		if (Y || (K.__webglTexture === void 0 && (K.__webglTexture = w.createTexture()), K.__version = F.version, W.memory.textures++), J) {
			G.__webglFramebuffer = [];
			for (let T = 0; T < 6; T++) if (F.mipmaps && F.mipmaps.length > 0) {
				G.__webglFramebuffer[T] = [];
				for (let O = 0; O < F.mipmaps.length; O++) G.__webglFramebuffer[T][O] = w.createFramebuffer();
			} else G.__webglFramebuffer[T] = w.createFramebuffer();
		} else {
			if (F.mipmaps && F.mipmaps.length > 0) {
				G.__webglFramebuffer = [];
				for (let T = 0; T < F.mipmaps.length; T++) G.__webglFramebuffer[T] = w.createFramebuffer();
			} else G.__webglFramebuffer = w.createFramebuffer();
			if (Y) for (let T = 0, O = q.length; T < O; T++) {
				let O = j.get(q[T]);
				O.__webglTexture === void 0 && (O.__webglTexture = w.createTexture(), W.memory.textures++);
			}
			if (T.samples > 0 && cC(T) === !1) {
				G.__webglMultisampledFramebuffer = w.createFramebuffer(), G.__webglColorRenderbuffer = [], O.bindFramebuffer(w.FRAMEBUFFER, G.__webglMultisampledFramebuffer);
				for (let O = 0; O < q.length; O++) {
					let j = q[O];
					G.__webglColorRenderbuffer[O] = w.createRenderbuffer(), w.bindRenderbuffer(w.RENDERBUFFER, G.__webglColorRenderbuffer[O]);
					let F = U.convert(j.format, j.colorSpace), W = U.convert(j.type), K = ES(j.internalFormat, F, W, j.colorSpace, T.isXRRenderTarget === !0), J = sC(T);
					w.renderbufferStorageMultisample(w.RENDERBUFFER, J, K, T.width, T.height), w.framebufferRenderbuffer(w.FRAMEBUFFER, w.COLOR_ATTACHMENT0 + O, w.RENDERBUFFER, G.__webglColorRenderbuffer[O]);
				}
				w.bindRenderbuffer(w.RENDERBUFFER, null), T.depthBuffer && (G.__webglDepthRenderbuffer = w.createRenderbuffer(), QS(G.__webglDepthRenderbuffer, T, !0)), O.bindFramebuffer(w.FRAMEBUFFER, null);
			}
		}
		if (J) {
			O.bindTexture(w.TEXTURE_CUBE_MAP, K.__webglTexture), GS(w.TEXTURE_CUBE_MAP, F);
			for (let O = 0; O < 6; O++) if (F.mipmaps && F.mipmaps.length > 0) for (let j = 0; j < F.mipmaps.length; j++) ZS(G.__webglFramebuffer[O][j], T, F, w.COLOR_ATTACHMENT0, w.TEXTURE_CUBE_MAP_POSITIVE_X + O, j);
			else ZS(G.__webglFramebuffer[O], T, F, w.COLOR_ATTACHMENT0, w.TEXTURE_CUBE_MAP_POSITIVE_X + O, 0);
			CS(F) && wS(w.TEXTURE_CUBE_MAP), O.unbindTexture();
		} else if (Y) {
			for (let F = 0, U = q.length; F < U; F++) {
				let U = q[F], W = j.get(U), K = w.TEXTURE_2D;
				(T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) && (K = T.isWebGL3DRenderTarget ? w.TEXTURE_3D : w.TEXTURE_2D_ARRAY), O.bindTexture(K, W.__webglTexture), GS(K, U), ZS(G.__webglFramebuffer, T, U, w.COLOR_ATTACHMENT0 + F, K, 0), CS(U) && wS(K);
			}
			O.unbindTexture();
		} else {
			let j = w.TEXTURE_2D;
			if ((T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) && (j = T.isWebGL3DRenderTarget ? w.TEXTURE_3D : w.TEXTURE_2D_ARRAY), O.bindTexture(j, K.__webglTexture), GS(j, F), F.mipmaps && F.mipmaps.length > 0) for (let O = 0; O < F.mipmaps.length; O++) ZS(G.__webglFramebuffer[O], T, F, w.COLOR_ATTACHMENT0, j, O);
			else ZS(G.__webglFramebuffer, T, F, w.COLOR_ATTACHMENT0, j, 0);
			CS(F) && wS(j), O.unbindTexture();
		}
		T.depthBuffer && eC(T);
	}
	function rC(w) {
		let T = w.textures;
		for (let F = 0, U = T.length; F < U; F++) {
			let U = T[F];
			if (CS(U)) {
				let T = TS(w), F = j.get(U).__webglTexture;
				O.bindTexture(T, F), wS(T), O.unbindTexture();
			}
		}
	}
	let iC = [], aC = [];
	function oC(T) {
		if (T.samples > 0) {
			if (cC(T) === !1) {
				let F = T.textures, U = T.width, W = T.height, G = w.COLOR_BUFFER_BIT, q = T.stencilBuffer ? w.DEPTH_STENCIL_ATTACHMENT : w.DEPTH_ATTACHMENT, J = j.get(T), Y = F.length > 1;
				if (Y) for (let T = 0; T < F.length; T++) O.bindFramebuffer(w.FRAMEBUFFER, J.__webglMultisampledFramebuffer), w.framebufferRenderbuffer(w.FRAMEBUFFER, w.COLOR_ATTACHMENT0 + T, w.RENDERBUFFER, null), O.bindFramebuffer(w.FRAMEBUFFER, J.__webglFramebuffer), w.framebufferTexture2D(w.DRAW_FRAMEBUFFER, w.COLOR_ATTACHMENT0 + T, w.TEXTURE_2D, null, 0);
				O.bindFramebuffer(w.READ_FRAMEBUFFER, J.__webglMultisampledFramebuffer);
				let X = T.texture.mipmaps;
				X && X.length > 0 ? O.bindFramebuffer(w.DRAW_FRAMEBUFFER, J.__webglFramebuffer[0]) : O.bindFramebuffer(w.DRAW_FRAMEBUFFER, J.__webglFramebuffer);
				for (let O = 0; O < F.length; O++) {
					if (T.resolveDepthBuffer && (T.depthBuffer && (G |= w.DEPTH_BUFFER_BIT), T.stencilBuffer && T.resolveStencilBuffer && (G |= w.STENCIL_BUFFER_BIT)), Y) {
						w.framebufferRenderbuffer(w.READ_FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.RENDERBUFFER, J.__webglColorRenderbuffer[O]);
						let T = j.get(F[O]).__webglTexture;
						w.framebufferTexture2D(w.DRAW_FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.TEXTURE_2D, T, 0);
					}
					w.blitFramebuffer(0, 0, U, W, 0, 0, U, W, G, w.NEAREST), K === !0 && (iC.length = 0, aC.length = 0, iC.push(w.COLOR_ATTACHMENT0 + O), T.depthBuffer && T.resolveDepthBuffer === !1 && (iC.push(q), aC.push(q), w.invalidateFramebuffer(w.DRAW_FRAMEBUFFER, aC)), w.invalidateFramebuffer(w.READ_FRAMEBUFFER, iC));
				}
				if (O.bindFramebuffer(w.READ_FRAMEBUFFER, null), O.bindFramebuffer(w.DRAW_FRAMEBUFFER, null), Y) for (let T = 0; T < F.length; T++) {
					O.bindFramebuffer(w.FRAMEBUFFER, J.__webglMultisampledFramebuffer), w.framebufferRenderbuffer(w.FRAMEBUFFER, w.COLOR_ATTACHMENT0 + T, w.RENDERBUFFER, J.__webglColorRenderbuffer[T]);
					let U = j.get(F[T]).__webglTexture;
					O.bindFramebuffer(w.FRAMEBUFFER, J.__webglFramebuffer), w.framebufferTexture2D(w.DRAW_FRAMEBUFFER, w.COLOR_ATTACHMENT0 + T, w.TEXTURE_2D, U, 0);
				}
				O.bindFramebuffer(w.DRAW_FRAMEBUFFER, J.__webglMultisampledFramebuffer);
			} else if (T.depthBuffer && T.resolveDepthBuffer === !1 && K) {
				let O = T.stencilBuffer ? w.DEPTH_STENCIL_ATTACHMENT : w.DEPTH_ATTACHMENT;
				w.invalidateFramebuffer(w.DRAW_FRAMEBUFFER, [O]);
			}
		}
	}
	function sC(w) {
		return Math.min(F.maxSamples, w.samples);
	}
	function cC(w) {
		let O = j.get(w);
		return w.samples > 0 && T.has("WEBGL_multisampled_render_to_texture") === !0 && O.__useRenderToTexture !== !1;
	}
	function lC(w) {
		let T = W.render.frame;
		J.get(w) !== T && (J.set(w, T), w.update());
	}
	function uC(w, T) {
		let O = w.colorSpace, j = w.format, F = w.type;
		return w.isCompressedTexture === !0 || w.isVideoTexture === !0 || O !== "srgb-linear" && O !== "" && (ColorManagement.getTransfer(O) === "srgb" ? (j !== 1023 || F !== 1009) && warn("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : error("WebGLTextures: Unsupported texture color space:", O)), T;
	}
	function dC(w) {
		return typeof HTMLImageElement < "u" && w instanceof HTMLImageElement ? (q.width = w.naturalWidth || w.width, q.height = w.naturalHeight || w.height) : typeof VideoFrame < "u" && w instanceof VideoFrame ? (q.width = w.displayWidth, q.height = w.displayHeight) : (q.width = w.width, q.height = w.height), q;
	}
	this.allocateTextureUnit = IS, this.resetTextureUnits = FS, this.setTexture2D = RS, this.setTexture2DArray = zS, this.setTexture3D = BS, this.setTextureCube = VS, this.rebindTextures = tC, this.setupRenderTarget = nC, this.updateRenderTargetMipmap = rC, this.updateMultisampleRenderTarget = oC, this.setupDepthRenderbuffer = eC, this.setupFrameBufferTexture = ZS, this.useMultisampledRTT = cC, this.isReversedDepthBuffer = function() {
		return O.buffers.depth.getReversed();
	};
}
function WebGLUtils(w, T) {
	function O(O, j = "") {
		let F, U = ColorManagement.getTransfer(j);
		if (O === 1009) return w.UNSIGNED_BYTE;
		if (O === 1017) return w.UNSIGNED_SHORT_4_4_4_4;
		if (O === 1018) return w.UNSIGNED_SHORT_5_5_5_1;
		if (O === 35902) return w.UNSIGNED_INT_5_9_9_9_REV;
		if (O === 35899) return w.UNSIGNED_INT_10F_11F_11F_REV;
		if (O === 1010) return w.BYTE;
		if (O === 1011) return w.SHORT;
		if (O === 1012) return w.UNSIGNED_SHORT;
		if (O === 1013) return w.INT;
		if (O === 1014) return w.UNSIGNED_INT;
		if (O === 1015) return w.FLOAT;
		if (O === 1016) return w.HALF_FLOAT;
		if (O === 1021) return w.ALPHA;
		if (O === 1022) return w.RGB;
		if (O === 1023) return w.RGBA;
		if (O === 1026) return w.DEPTH_COMPONENT;
		if (O === 1027) return w.DEPTH_STENCIL;
		if (O === 1028) return w.RED;
		if (O === 1029) return w.RED_INTEGER;
		if (O === 1030) return w.RG;
		if (O === 1031) return w.RG_INTEGER;
		if (O === 1033) return w.RGBA_INTEGER;
		if (O === 33776 || O === 33777 || O === 33778 || O === 33779) if (U === "srgb") if (F = T.get("WEBGL_compressed_texture_s3tc_srgb"), F !== null) {
			if (O === 33776) return F.COMPRESSED_SRGB_S3TC_DXT1_EXT;
			if (O === 33777) return F.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
			if (O === 33778) return F.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
			if (O === 33779) return F.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
		} else return null;
		else if (F = T.get("WEBGL_compressed_texture_s3tc"), F !== null) {
			if (O === 33776) return F.COMPRESSED_RGB_S3TC_DXT1_EXT;
			if (O === 33777) return F.COMPRESSED_RGBA_S3TC_DXT1_EXT;
			if (O === 33778) return F.COMPRESSED_RGBA_S3TC_DXT3_EXT;
			if (O === 33779) return F.COMPRESSED_RGBA_S3TC_DXT5_EXT;
		} else return null;
		if (O === 35840 || O === 35841 || O === 35842 || O === 35843) if (F = T.get("WEBGL_compressed_texture_pvrtc"), F !== null) {
			if (O === 35840) return F.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
			if (O === 35841) return F.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
			if (O === 35842) return F.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
			if (O === 35843) return F.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
		} else return null;
		if (O === 36196 || O === 37492 || O === 37496 || O === 37488 || O === 37489 || O === 37490 || O === 37491) if (F = T.get("WEBGL_compressed_texture_etc"), F !== null) {
			if (O === 36196 || O === 37492) return U === "srgb" ? F.COMPRESSED_SRGB8_ETC2 : F.COMPRESSED_RGB8_ETC2;
			if (O === 37496) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : F.COMPRESSED_RGBA8_ETC2_EAC;
			if (O === 37488) return F.COMPRESSED_R11_EAC;
			if (O === 37489) return F.COMPRESSED_SIGNED_R11_EAC;
			if (O === 37490) return F.COMPRESSED_RG11_EAC;
			if (O === 37491) return F.COMPRESSED_SIGNED_RG11_EAC;
		} else return null;
		if (O === 37808 || O === 37809 || O === 37810 || O === 37811 || O === 37812 || O === 37813 || O === 37814 || O === 37815 || O === 37816 || O === 37817 || O === 37818 || O === 37819 || O === 37820 || O === 37821) if (F = T.get("WEBGL_compressed_texture_astc"), F !== null) {
			if (O === 37808) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : F.COMPRESSED_RGBA_ASTC_4x4_KHR;
			if (O === 37809) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : F.COMPRESSED_RGBA_ASTC_5x4_KHR;
			if (O === 37810) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : F.COMPRESSED_RGBA_ASTC_5x5_KHR;
			if (O === 37811) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : F.COMPRESSED_RGBA_ASTC_6x5_KHR;
			if (O === 37812) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : F.COMPRESSED_RGBA_ASTC_6x6_KHR;
			if (O === 37813) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : F.COMPRESSED_RGBA_ASTC_8x5_KHR;
			if (O === 37814) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : F.COMPRESSED_RGBA_ASTC_8x6_KHR;
			if (O === 37815) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : F.COMPRESSED_RGBA_ASTC_8x8_KHR;
			if (O === 37816) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : F.COMPRESSED_RGBA_ASTC_10x5_KHR;
			if (O === 37817) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : F.COMPRESSED_RGBA_ASTC_10x6_KHR;
			if (O === 37818) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : F.COMPRESSED_RGBA_ASTC_10x8_KHR;
			if (O === 37819) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : F.COMPRESSED_RGBA_ASTC_10x10_KHR;
			if (O === 37820) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : F.COMPRESSED_RGBA_ASTC_12x10_KHR;
			if (O === 37821) return U === "srgb" ? F.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : F.COMPRESSED_RGBA_ASTC_12x12_KHR;
		} else return null;
		if (O === 36492 || O === 36494 || O === 36495) if (F = T.get("EXT_texture_compression_bptc"), F !== null) {
			if (O === 36492) return U === "srgb" ? F.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : F.COMPRESSED_RGBA_BPTC_UNORM_EXT;
			if (O === 36494) return F.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
			if (O === 36495) return F.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
		} else return null;
		if (O === 36283 || O === 36284 || O === 36285 || O === 36286) if (F = T.get("EXT_texture_compression_rgtc"), F !== null) {
			if (O === 36283) return F.COMPRESSED_RED_RGTC1_EXT;
			if (O === 36284) return F.COMPRESSED_SIGNED_RED_RGTC1_EXT;
			if (O === 36285) return F.COMPRESSED_RED_GREEN_RGTC2_EXT;
			if (O === 36286) return F.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
		} else return null;
		return O === 1020 ? w.UNSIGNED_INT_24_8 : w[O] === void 0 ? null : w[O];
	}
	return { convert: O };
}
var _occlusion_vertex = "\nvoid main() {\n\n	gl_Position = vec4( position, 1.0 );\n\n}", _occlusion_fragment = "\nuniform sampler2DArray depthColor;\nuniform float depthWidth;\nuniform float depthHeight;\n\nvoid main() {\n\n	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );\n\n	if ( coord.x >= 1.0 ) {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;\n\n	} else {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;\n\n	}\n\n}", WebXRDepthSensing = class {
	constructor() {
		this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
	}
	init(w, T) {
		if (this.texture === null) {
			let O = new ExternalTexture(w.texture);
			(w.depthNear !== T.depthNear || w.depthFar !== T.depthFar) && (this.depthNear = w.depthNear, this.depthFar = w.depthFar), this.texture = O;
		}
	}
	getMesh(w) {
		if (this.texture !== null && this.mesh === null) {
			let T = w.cameras[0].viewport, O = new ShaderMaterial({
				vertexShader: _occlusion_vertex,
				fragmentShader: _occlusion_fragment,
				uniforms: {
					depthColor: { value: this.texture },
					depthWidth: { value: T.z },
					depthHeight: { value: T.w }
				}
			});
			this.mesh = new Mesh(new PlaneGeometry(20, 20), O);
		}
		return this.mesh;
	}
	reset() {
		this.texture = null, this.mesh = null;
	}
	getDepthTexture() {
		return this.texture;
	}
}, WebXRManager = class extends EventDispatcher {
	constructor(w, T) {
		super();
		let O = this, j = null, F = 1, U = null, W = "local-floor", G = 1, K = null, q = null, J = null, Y = null, X = null, Q = null, xS = typeof XRWebGLBinding < "u", SS = new WebXRDepthSensing(), CS = {}, wS = T.getContextAttributes(), TS = null, ES = null, DS = [], OS = [], kS = new Vector2(), AS = null, jS = new PerspectiveCamera();
		jS.viewport = new Vector4();
		let MS = new PerspectiveCamera();
		MS.viewport = new Vector4();
		let NS = [jS, MS], PS = new ArrayCamera(), FS = null, IS = null;
		this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(w) {
			let T = DS[w];
			return T === void 0 && (T = new WebXRController(), DS[w] = T), T.getTargetRaySpace();
		}, this.getControllerGrip = function(w) {
			let T = DS[w];
			return T === void 0 && (T = new WebXRController(), DS[w] = T), T.getGripSpace();
		}, this.getHand = function(w) {
			let T = DS[w];
			return T === void 0 && (T = new WebXRController(), DS[w] = T), T.getHandSpace();
		};
		function LS(w) {
			let T = OS.indexOf(w.inputSource);
			if (T === -1) return;
			let O = DS[T];
			O !== void 0 && (O.update(w.inputSource, w.frame, K || U), O.dispatchEvent({
				type: w.type,
				data: w.inputSource
			}));
		}
		function RS() {
			j.removeEventListener("select", LS), j.removeEventListener("selectstart", LS), j.removeEventListener("selectend", LS), j.removeEventListener("squeeze", LS), j.removeEventListener("squeezestart", LS), j.removeEventListener("squeezeend", LS), j.removeEventListener("end", RS), j.removeEventListener("inputsourceschange", zS);
			for (let w = 0; w < DS.length; w++) {
				let T = OS[w];
				T !== null && (OS[w] = null, DS[w].disconnect(T));
			}
			for (let w in FS = null, IS = null, SS.reset(), CS) delete CS[w];
			w.setRenderTarget(TS), X = null, Y = null, J = null, j = null, ES = null, qS.stop(), O.isPresenting = !1, w.setPixelRatio(AS), w.setSize(kS.width, kS.height, !1), O.dispatchEvent({ type: "sessionend" });
		}
		this.setFramebufferScaleFactor = function(w) {
			F = w, O.isPresenting === !0 && warn("WebXRManager: Cannot change framebuffer scale while presenting.");
		}, this.setReferenceSpaceType = function(w) {
			W = w, O.isPresenting === !0 && warn("WebXRManager: Cannot change reference space type while presenting.");
		}, this.getReferenceSpace = function() {
			return K || U;
		}, this.setReferenceSpace = function(w) {
			K = w;
		}, this.getBaseLayer = function() {
			return Y === null ? X : Y;
		}, this.getBinding = function() {
			return J === null && xS && (J = new XRWebGLBinding(j, T)), J;
		}, this.getFrame = function() {
			return Q;
		}, this.getSession = function() {
			return j;
		}, this.setSession = async function(q) {
			if (j = q, j !== null) {
				if (TS = w.getRenderTarget(), j.addEventListener("select", LS), j.addEventListener("selectstart", LS), j.addEventListener("selectend", LS), j.addEventListener("squeeze", LS), j.addEventListener("squeezestart", LS), j.addEventListener("squeezeend", LS), j.addEventListener("end", RS), j.addEventListener("inputsourceschange", zS), wS.xrCompatible !== !0 && await T.makeXRCompatible(), AS = w.getPixelRatio(), w.getSize(kS), xS && "createProjectionLayer" in XRWebGLBinding.prototype) {
					let O = null, U = null, W = null;
					wS.depth && (W = wS.stencil ? T.DEPTH24_STENCIL8 : T.DEPTH_COMPONENT24, O = wS.stencil ? DepthStencilFormat : DepthFormat, U = wS.stencil ? UnsignedInt248Type : UnsignedIntType);
					let G = {
						colorFormat: T.RGBA8,
						depthFormat: W,
						scaleFactor: F
					};
					J = this.getBinding(), Y = J.createProjectionLayer(G), j.updateRenderState({ layers: [Y] }), w.setPixelRatio(1), w.setSize(Y.textureWidth, Y.textureHeight, !1), ES = new WebGLRenderTarget(Y.textureWidth, Y.textureHeight, {
						format: RGBAFormat,
						type: UnsignedByteType,
						depthTexture: new DepthTexture(Y.textureWidth, Y.textureHeight, U, void 0, void 0, void 0, void 0, void 0, void 0, O),
						stencilBuffer: wS.stencil,
						colorSpace: w.outputColorSpace,
						samples: wS.antialias ? 4 : 0,
						resolveDepthBuffer: Y.ignoreDepthValues === !1,
						resolveStencilBuffer: Y.ignoreDepthValues === !1
					});
				} else {
					let O = {
						antialias: wS.antialias,
						alpha: !0,
						depth: wS.depth,
						stencil: wS.stencil,
						framebufferScaleFactor: F
					};
					X = new XRWebGLLayer(j, T, O), j.updateRenderState({ baseLayer: X }), w.setPixelRatio(1), w.setSize(X.framebufferWidth, X.framebufferHeight, !1), ES = new WebGLRenderTarget(X.framebufferWidth, X.framebufferHeight, {
						format: RGBAFormat,
						type: UnsignedByteType,
						colorSpace: w.outputColorSpace,
						stencilBuffer: wS.stencil,
						resolveDepthBuffer: X.ignoreDepthValues === !1,
						resolveStencilBuffer: X.ignoreDepthValues === !1
					});
				}
				ES.isXRRenderTarget = !0, this.setFoveation(G), K = null, U = await j.requestReferenceSpace(W), qS.setContext(j), qS.start(), O.isPresenting = !0, O.dispatchEvent({ type: "sessionstart" });
			}
		}, this.getEnvironmentBlendMode = function() {
			if (j !== null) return j.environmentBlendMode;
		}, this.getDepthTexture = function() {
			return SS.getDepthTexture();
		};
		function zS(w) {
			for (let T = 0; T < w.removed.length; T++) {
				let O = w.removed[T], j = OS.indexOf(O);
				j >= 0 && (OS[j] = null, DS[j].disconnect(O));
			}
			for (let T = 0; T < w.added.length; T++) {
				let O = w.added[T], j = OS.indexOf(O);
				if (j === -1) {
					for (let w = 0; w < DS.length; w++) if (w >= OS.length) {
						OS.push(O), j = w;
						break;
					} else if (OS[w] === null) {
						OS[w] = O, j = w;
						break;
					}
					if (j === -1) break;
				}
				let F = DS[j];
				F && F.connect(O);
			}
		}
		let BS = new Vector3(), VS = new Vector3();
		function HS(w, T, O) {
			BS.setFromMatrixPosition(T.matrixWorld), VS.setFromMatrixPosition(O.matrixWorld);
			let j = BS.distanceTo(VS), F = T.projectionMatrix.elements, U = O.projectionMatrix.elements, W = F[14] / (F[10] - 1), G = F[14] / (F[10] + 1), K = (F[9] + 1) / F[5], q = (F[9] - 1) / F[5], J = (F[8] - 1) / F[0], Y = (U[8] + 1) / U[0], X = W * J, Q = W * Y, xS = j / (-J + Y), SS = xS * -J;
			if (T.matrixWorld.decompose(w.position, w.quaternion, w.scale), w.translateX(SS), w.translateZ(xS), w.matrixWorld.compose(w.position, w.quaternion, w.scale), w.matrixWorldInverse.copy(w.matrixWorld).invert(), F[10] === -1) w.projectionMatrix.copy(T.projectionMatrix), w.projectionMatrixInverse.copy(T.projectionMatrixInverse);
			else {
				let T = W + xS, O = G + xS, F = X - SS, U = Q + (j - SS), J = K * G / O * T, Y = q * G / O * T;
				w.projectionMatrix.makePerspective(F, U, J, Y, T, O), w.projectionMatrixInverse.copy(w.projectionMatrix).invert();
			}
		}
		function US(w, T) {
			T === null ? w.matrixWorld.copy(w.matrix) : w.matrixWorld.multiplyMatrices(T.matrixWorld, w.matrix), w.matrixWorldInverse.copy(w.matrixWorld).invert();
		}
		this.updateCamera = function(w) {
			if (j === null) return;
			let T = w.near, O = w.far;
			SS.texture !== null && (SS.depthNear > 0 && (T = SS.depthNear), SS.depthFar > 0 && (O = SS.depthFar)), PS.near = MS.near = jS.near = T, PS.far = MS.far = jS.far = O, (FS !== PS.near || IS !== PS.far) && (j.updateRenderState({
				depthNear: PS.near,
				depthFar: PS.far
			}), FS = PS.near, IS = PS.far), PS.layers.mask = w.layers.mask | 6, jS.layers.mask = PS.layers.mask & 3, MS.layers.mask = PS.layers.mask & 5;
			let F = w.parent, U = PS.cameras;
			US(PS, F);
			for (let w = 0; w < U.length; w++) US(U[w], F);
			U.length === 2 ? HS(PS, jS, MS) : PS.projectionMatrix.copy(jS.projectionMatrix), WS(w, PS, F);
		};
		function WS(w, T, O) {
			O === null ? w.matrix.copy(T.matrixWorld) : (w.matrix.copy(O.matrixWorld), w.matrix.invert(), w.matrix.multiply(T.matrixWorld)), w.matrix.decompose(w.position, w.quaternion, w.scale), w.updateMatrixWorld(!0), w.projectionMatrix.copy(T.projectionMatrix), w.projectionMatrixInverse.copy(T.projectionMatrixInverse), w.isPerspectiveCamera && (w.fov = RAD2DEG * 2 * Math.atan(1 / w.projectionMatrix.elements[5]), w.zoom = 1);
		}
		this.getCamera = function() {
			return PS;
		}, this.getFoveation = function() {
			if (!(Y === null && X === null)) return G;
		}, this.setFoveation = function(w) {
			G = w, Y !== null && (Y.fixedFoveation = w), X !== null && X.fixedFoveation !== void 0 && (X.fixedFoveation = w);
		}, this.hasDepthSensing = function() {
			return SS.texture !== null;
		}, this.getDepthSensingMesh = function() {
			return SS.getMesh(PS);
		}, this.getCameraTexture = function(w) {
			return CS[w];
		};
		let GS = null;
		function KS(T, F) {
			if (q = F.getViewerPose(K || U), Q = F, q !== null) {
				let T = q.views;
				X !== null && (w.setRenderTargetFramebuffer(ES, X.framebuffer), w.setRenderTarget(ES));
				let F = !1;
				T.length !== PS.cameras.length && (PS.cameras.length = 0, F = !0);
				for (let O = 0; O < T.length; O++) {
					let j = T[O], U = null;
					if (X !== null) U = X.getViewport(j);
					else {
						let T = J.getViewSubImage(Y, j);
						U = T.viewport, O === 0 && (w.setRenderTargetTextures(ES, T.colorTexture, T.depthStencilTexture), w.setRenderTarget(ES));
					}
					let W = NS[O];
					W === void 0 && (W = new PerspectiveCamera(), W.layers.enable(O), W.viewport = new Vector4(), NS[O] = W), W.matrix.fromArray(j.transform.matrix), W.matrix.decompose(W.position, W.quaternion, W.scale), W.projectionMatrix.fromArray(j.projectionMatrix), W.projectionMatrixInverse.copy(W.projectionMatrix).invert(), W.viewport.set(U.x, U.y, U.width, U.height), O === 0 && (PS.matrix.copy(W.matrix), PS.matrix.decompose(PS.position, PS.quaternion, PS.scale)), F === !0 && PS.cameras.push(W);
				}
				let U = j.enabledFeatures;
				if (U && U.includes("depth-sensing") && j.depthUsage == "gpu-optimized" && xS) {
					J = O.getBinding();
					let w = J.getDepthInformation(T[0]);
					w && w.isValid && w.texture && SS.init(w, j.renderState);
				}
				if (U && U.includes("camera-access") && xS) {
					w.state.unbindTexture(), J = O.getBinding();
					for (let w = 0; w < T.length; w++) {
						let O = T[w].camera;
						if (O) {
							let w = CS[O];
							w || (w = new ExternalTexture(), CS[O] = w), w.sourceTexture = J.getCameraImage(O);
						}
					}
				}
			}
			for (let w = 0; w < DS.length; w++) {
				let T = OS[w], O = DS[w];
				T !== null && O !== void 0 && O.update(T, F, K || U);
			}
			GS && GS(T, F), F.detectedPlanes && O.dispatchEvent({
				type: "planesdetected",
				data: F
			}), Q = null;
		}
		let qS = new WebGLAnimation();
		qS.setAnimationLoop(KS), this.setAnimationLoop = function(w) {
			GS = w;
		}, this.dispose = function() {};
	}
}, _e1 = /* @__PURE__ */ new Euler(), _m1 = /* @__PURE__ */ new Matrix4();
function WebGLMaterials(w, T) {
	function O(w, T) {
		w.matrixAutoUpdate === !0 && w.updateMatrix(), T.value.copy(w.matrix);
	}
	function j(T, O) {
		O.color.getRGB(T.fogColor.value, getUnlitUniformColorSpace(w)), O.isFog ? (T.fogNear.value = O.near, T.fogFar.value = O.far) : O.isFogExp2 && (T.fogDensity.value = O.density);
	}
	function F(w, T, O, j, F) {
		T.isMeshBasicMaterial || T.isMeshLambertMaterial ? U(w, T) : T.isMeshToonMaterial ? (U(w, T), Y(w, T)) : T.isMeshPhongMaterial ? (U(w, T), J(w, T)) : T.isMeshStandardMaterial ? (U(w, T), X(w, T), T.isMeshPhysicalMaterial && Q(w, T, F)) : T.isMeshMatcapMaterial ? (U(w, T), xS(w, T)) : T.isMeshDepthMaterial ? U(w, T) : T.isMeshDistanceMaterial ? (U(w, T), SS(w, T)) : T.isMeshNormalMaterial ? U(w, T) : T.isLineBasicMaterial ? (W(w, T), T.isLineDashedMaterial && G(w, T)) : T.isPointsMaterial ? K(w, T, O, j) : T.isSpriteMaterial ? q(w, T) : T.isShadowMaterial ? (w.color.value.copy(T.color), w.opacity.value = T.opacity) : T.isShaderMaterial && (T.uniformsNeedUpdate = !1);
	}
	function U(w, j) {
		w.opacity.value = j.opacity, j.color && w.diffuse.value.copy(j.color), j.emissive && w.emissive.value.copy(j.emissive).multiplyScalar(j.emissiveIntensity), j.map && (w.map.value = j.map, O(j.map, w.mapTransform)), j.alphaMap && (w.alphaMap.value = j.alphaMap, O(j.alphaMap, w.alphaMapTransform)), j.bumpMap && (w.bumpMap.value = j.bumpMap, O(j.bumpMap, w.bumpMapTransform), w.bumpScale.value = j.bumpScale, j.side === 1 && (w.bumpScale.value *= -1)), j.normalMap && (w.normalMap.value = j.normalMap, O(j.normalMap, w.normalMapTransform), w.normalScale.value.copy(j.normalScale), j.side === 1 && w.normalScale.value.negate()), j.displacementMap && (w.displacementMap.value = j.displacementMap, O(j.displacementMap, w.displacementMapTransform), w.displacementScale.value = j.displacementScale, w.displacementBias.value = j.displacementBias), j.emissiveMap && (w.emissiveMap.value = j.emissiveMap, O(j.emissiveMap, w.emissiveMapTransform)), j.specularMap && (w.specularMap.value = j.specularMap, O(j.specularMap, w.specularMapTransform)), j.alphaTest > 0 && (w.alphaTest.value = j.alphaTest);
		let F = T.get(j), U = F.envMap, W = F.envMapRotation;
		U && (w.envMap.value = U, _e1.copy(W), _e1.x *= -1, _e1.y *= -1, _e1.z *= -1, U.isCubeTexture && U.isRenderTargetTexture === !1 && (_e1.y *= -1, _e1.z *= -1), w.envMapRotation.value.setFromMatrix4(_m1.makeRotationFromEuler(_e1)), w.flipEnvMap.value = U.isCubeTexture && U.isRenderTargetTexture === !1 ? -1 : 1, w.reflectivity.value = j.reflectivity, w.ior.value = j.ior, w.refractionRatio.value = j.refractionRatio), j.lightMap && (w.lightMap.value = j.lightMap, w.lightMapIntensity.value = j.lightMapIntensity, O(j.lightMap, w.lightMapTransform)), j.aoMap && (w.aoMap.value = j.aoMap, w.aoMapIntensity.value = j.aoMapIntensity, O(j.aoMap, w.aoMapTransform));
	}
	function W(w, T) {
		w.diffuse.value.copy(T.color), w.opacity.value = T.opacity, T.map && (w.map.value = T.map, O(T.map, w.mapTransform));
	}
	function G(w, T) {
		w.dashSize.value = T.dashSize, w.totalSize.value = T.dashSize + T.gapSize, w.scale.value = T.scale;
	}
	function K(w, T, j, F) {
		w.diffuse.value.copy(T.color), w.opacity.value = T.opacity, w.size.value = T.size * j, w.scale.value = F * .5, T.map && (w.map.value = T.map, O(T.map, w.uvTransform)), T.alphaMap && (w.alphaMap.value = T.alphaMap, O(T.alphaMap, w.alphaMapTransform)), T.alphaTest > 0 && (w.alphaTest.value = T.alphaTest);
	}
	function q(w, T) {
		w.diffuse.value.copy(T.color), w.opacity.value = T.opacity, w.rotation.value = T.rotation, T.map && (w.map.value = T.map, O(T.map, w.mapTransform)), T.alphaMap && (w.alphaMap.value = T.alphaMap, O(T.alphaMap, w.alphaMapTransform)), T.alphaTest > 0 && (w.alphaTest.value = T.alphaTest);
	}
	function J(w, T) {
		w.specular.value.copy(T.specular), w.shininess.value = Math.max(T.shininess, 1e-4);
	}
	function Y(w, T) {
		T.gradientMap && (w.gradientMap.value = T.gradientMap);
	}
	function X(w, T) {
		w.metalness.value = T.metalness, T.metalnessMap && (w.metalnessMap.value = T.metalnessMap, O(T.metalnessMap, w.metalnessMapTransform)), w.roughness.value = T.roughness, T.roughnessMap && (w.roughnessMap.value = T.roughnessMap, O(T.roughnessMap, w.roughnessMapTransform)), T.envMap && (w.envMapIntensity.value = T.envMapIntensity);
	}
	function Q(w, T, j) {
		w.ior.value = T.ior, T.sheen > 0 && (w.sheenColor.value.copy(T.sheenColor).multiplyScalar(T.sheen), w.sheenRoughness.value = T.sheenRoughness, T.sheenColorMap && (w.sheenColorMap.value = T.sheenColorMap, O(T.sheenColorMap, w.sheenColorMapTransform)), T.sheenRoughnessMap && (w.sheenRoughnessMap.value = T.sheenRoughnessMap, O(T.sheenRoughnessMap, w.sheenRoughnessMapTransform))), T.clearcoat > 0 && (w.clearcoat.value = T.clearcoat, w.clearcoatRoughness.value = T.clearcoatRoughness, T.clearcoatMap && (w.clearcoatMap.value = T.clearcoatMap, O(T.clearcoatMap, w.clearcoatMapTransform)), T.clearcoatRoughnessMap && (w.clearcoatRoughnessMap.value = T.clearcoatRoughnessMap, O(T.clearcoatRoughnessMap, w.clearcoatRoughnessMapTransform)), T.clearcoatNormalMap && (w.clearcoatNormalMap.value = T.clearcoatNormalMap, O(T.clearcoatNormalMap, w.clearcoatNormalMapTransform), w.clearcoatNormalScale.value.copy(T.clearcoatNormalScale), T.side === 1 && w.clearcoatNormalScale.value.negate())), T.dispersion > 0 && (w.dispersion.value = T.dispersion), T.iridescence > 0 && (w.iridescence.value = T.iridescence, w.iridescenceIOR.value = T.iridescenceIOR, w.iridescenceThicknessMinimum.value = T.iridescenceThicknessRange[0], w.iridescenceThicknessMaximum.value = T.iridescenceThicknessRange[1], T.iridescenceMap && (w.iridescenceMap.value = T.iridescenceMap, O(T.iridescenceMap, w.iridescenceMapTransform)), T.iridescenceThicknessMap && (w.iridescenceThicknessMap.value = T.iridescenceThicknessMap, O(T.iridescenceThicknessMap, w.iridescenceThicknessMapTransform))), T.transmission > 0 && (w.transmission.value = T.transmission, w.transmissionSamplerMap.value = j.texture, w.transmissionSamplerSize.value.set(j.width, j.height), T.transmissionMap && (w.transmissionMap.value = T.transmissionMap, O(T.transmissionMap, w.transmissionMapTransform)), w.thickness.value = T.thickness, T.thicknessMap && (w.thicknessMap.value = T.thicknessMap, O(T.thicknessMap, w.thicknessMapTransform)), w.attenuationDistance.value = T.attenuationDistance, w.attenuationColor.value.copy(T.attenuationColor)), T.anisotropy > 0 && (w.anisotropyVector.value.set(T.anisotropy * Math.cos(T.anisotropyRotation), T.anisotropy * Math.sin(T.anisotropyRotation)), T.anisotropyMap && (w.anisotropyMap.value = T.anisotropyMap, O(T.anisotropyMap, w.anisotropyMapTransform))), w.specularIntensity.value = T.specularIntensity, w.specularColor.value.copy(T.specularColor), T.specularColorMap && (w.specularColorMap.value = T.specularColorMap, O(T.specularColorMap, w.specularColorMapTransform)), T.specularIntensityMap && (w.specularIntensityMap.value = T.specularIntensityMap, O(T.specularIntensityMap, w.specularIntensityMapTransform));
	}
	function xS(w, T) {
		T.matcap && (w.matcap.value = T.matcap);
	}
	function SS(w, O) {
		let j = T.get(O).light;
		w.referencePosition.value.setFromMatrixPosition(j.matrixWorld), w.nearDistance.value = j.shadow.camera.near, w.farDistance.value = j.shadow.camera.far;
	}
	return {
		refreshFogUniforms: j,
		refreshMaterialUniforms: F
	};
}
function WebGLUniformsGroups(w, T, O, j) {
	let F = {}, U = {}, W = [], G = w.getParameter(w.MAX_UNIFORM_BUFFER_BINDINGS);
	function K(w, T) {
		let O = T.program;
		j.uniformBlockBinding(w, O);
	}
	function q(w, O) {
		let W = F[w.id];
		W === void 0 && (xS(w), W = J(w), F[w.id] = W, w.addEventListener("dispose", CS));
		let G = O.program;
		j.updateUBOMapping(w, G);
		let K = T.render.frame;
		U[w.id] !== K && (X(w), U[w.id] = K);
	}
	function J(T) {
		let O = Y();
		T.__bindingPointIndex = O;
		let j = w.createBuffer(), F = T.__size, U = T.usage;
		return w.bindBuffer(w.UNIFORM_BUFFER, j), w.bufferData(w.UNIFORM_BUFFER, F, U), w.bindBuffer(w.UNIFORM_BUFFER, null), w.bindBufferBase(w.UNIFORM_BUFFER, O, j), j;
	}
	function Y() {
		for (let w = 0; w < G; w++) if (W.indexOf(w) === -1) return W.push(w), w;
		return error("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
	}
	function X(T) {
		let O = F[T.id], j = T.uniforms, U = T.__cache;
		w.bindBuffer(w.UNIFORM_BUFFER, O);
		for (let T = 0, O = j.length; T < O; T++) {
			let O = Array.isArray(j[T]) ? j[T] : [j[T]];
			for (let j = 0, F = O.length; j < F; j++) {
				let F = O[j];
				if (Q(F, T, j, U) === !0) {
					let T = F.__offset, O = Array.isArray(F.value) ? F.value : [F.value], j = 0;
					for (let U = 0; U < O.length; U++) {
						let W = O[U], G = SS(W);
						typeof W == "number" || typeof W == "boolean" ? (F.__data[0] = W, w.bufferSubData(w.UNIFORM_BUFFER, T + j, F.__data)) : W.isMatrix3 ? (F.__data[0] = W.elements[0], F.__data[1] = W.elements[1], F.__data[2] = W.elements[2], F.__data[3] = 0, F.__data[4] = W.elements[3], F.__data[5] = W.elements[4], F.__data[6] = W.elements[5], F.__data[7] = 0, F.__data[8] = W.elements[6], F.__data[9] = W.elements[7], F.__data[10] = W.elements[8], F.__data[11] = 0) : (W.toArray(F.__data, j), j += G.storage / Float32Array.BYTES_PER_ELEMENT);
					}
					w.bufferSubData(w.UNIFORM_BUFFER, T, F.__data);
				}
			}
		}
		w.bindBuffer(w.UNIFORM_BUFFER, null);
	}
	function Q(w, T, O, j) {
		let F = w.value, U = T + "_" + O;
		if (j[U] === void 0) return typeof F == "number" || typeof F == "boolean" ? j[U] = F : j[U] = F.clone(), !0;
		{
			let w = j[U];
			if (typeof F == "number" || typeof F == "boolean") {
				if (w !== F) return j[U] = F, !0;
			} else if (w.equals(F) === !1) return w.copy(F), !0;
		}
		return !1;
	}
	function xS(w) {
		let T = w.uniforms, O = 0;
		for (let w = 0, j = T.length; w < j; w++) {
			let j = Array.isArray(T[w]) ? T[w] : [T[w]];
			for (let w = 0, T = j.length; w < T; w++) {
				let T = j[w], F = Array.isArray(T.value) ? T.value : [T.value];
				for (let w = 0, j = F.length; w < j; w++) {
					let j = F[w], U = SS(j), W = O % 16, G = W % U.boundary, K = W + G;
					O += G, K !== 0 && 16 - K < U.storage && (O += 16 - K), T.__data = new Float32Array(U.storage / Float32Array.BYTES_PER_ELEMENT), T.__offset = O, O += U.storage;
				}
			}
		}
		let j = O % 16;
		return j > 0 && (O += 16 - j), w.__size = O, w.__cache = {}, this;
	}
	function SS(w) {
		let T = {
			boundary: 0,
			storage: 0
		};
		return typeof w == "number" || typeof w == "boolean" ? (T.boundary = 4, T.storage = 4) : w.isVector2 ? (T.boundary = 8, T.storage = 8) : w.isVector3 || w.isColor ? (T.boundary = 16, T.storage = 12) : w.isVector4 ? (T.boundary = 16, T.storage = 16) : w.isMatrix3 ? (T.boundary = 48, T.storage = 48) : w.isMatrix4 ? (T.boundary = 64, T.storage = 64) : w.isTexture ? warn("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : warn("WebGLRenderer: Unsupported uniform value type.", w), T;
	}
	function CS(T) {
		let O = T.target;
		O.removeEventListener("dispose", CS);
		let j = W.indexOf(O.__bindingPointIndex);
		W.splice(j, 1), w.deleteBuffer(F[O.id]), delete F[O.id], delete U[O.id];
	}
	function wS() {
		for (let T in F) w.deleteBuffer(F[T]);
		W = [], F = {}, U = {};
	}
	return {
		bind: K,
		update: q,
		dispose: wS
	};
}
var DATA = new Uint16Array([
	12469,
	15057,
	12620,
	14925,
	13266,
	14620,
	13807,
	14376,
	14323,
	13990,
	14545,
	13625,
	14713,
	13328,
	14840,
	12882,
	14931,
	12528,
	14996,
	12233,
	15039,
	11829,
	15066,
	11525,
	15080,
	11295,
	15085,
	10976,
	15082,
	10705,
	15073,
	10495,
	13880,
	14564,
	13898,
	14542,
	13977,
	14430,
	14158,
	14124,
	14393,
	13732,
	14556,
	13410,
	14702,
	12996,
	14814,
	12596,
	14891,
	12291,
	14937,
	11834,
	14957,
	11489,
	14958,
	11194,
	14943,
	10803,
	14921,
	10506,
	14893,
	10278,
	14858,
	9960,
	14484,
	14039,
	14487,
	14025,
	14499,
	13941,
	14524,
	13740,
	14574,
	13468,
	14654,
	13106,
	14743,
	12678,
	14818,
	12344,
	14867,
	11893,
	14889,
	11509,
	14893,
	11180,
	14881,
	10751,
	14852,
	10428,
	14812,
	10128,
	14765,
	9754,
	14712,
	9466,
	14764,
	13480,
	14764,
	13475,
	14766,
	13440,
	14766,
	13347,
	14769,
	13070,
	14786,
	12713,
	14816,
	12387,
	14844,
	11957,
	14860,
	11549,
	14868,
	11215,
	14855,
	10751,
	14825,
	10403,
	14782,
	10044,
	14729,
	9651,
	14666,
	9352,
	14599,
	9029,
	14967,
	12835,
	14966,
	12831,
	14963,
	12804,
	14954,
	12723,
	14936,
	12564,
	14917,
	12347,
	14900,
	11958,
	14886,
	11569,
	14878,
	11247,
	14859,
	10765,
	14828,
	10401,
	14784,
	10011,
	14727,
	9600,
	14660,
	9289,
	14586,
	8893,
	14508,
	8533,
	15111,
	12234,
	15110,
	12234,
	15104,
	12216,
	15092,
	12156,
	15067,
	12010,
	15028,
	11776,
	14981,
	11500,
	14942,
	11205,
	14902,
	10752,
	14861,
	10393,
	14812,
	9991,
	14752,
	9570,
	14682,
	9252,
	14603,
	8808,
	14519,
	8445,
	14431,
	8145,
	15209,
	11449,
	15208,
	11451,
	15202,
	11451,
	15190,
	11438,
	15163,
	11384,
	15117,
	11274,
	15055,
	10979,
	14994,
	10648,
	14932,
	10343,
	14871,
	9936,
	14803,
	9532,
	14729,
	9218,
	14645,
	8742,
	14556,
	8381,
	14461,
	8020,
	14365,
	7603,
	15273,
	10603,
	15272,
	10607,
	15267,
	10619,
	15256,
	10631,
	15231,
	10614,
	15182,
	10535,
	15118,
	10389,
	15042,
	10167,
	14963,
	9787,
	14883,
	9447,
	14800,
	9115,
	14710,
	8665,
	14615,
	8318,
	14514,
	7911,
	14411,
	7507,
	14279,
	7198,
	15314,
	9675,
	15313,
	9683,
	15309,
	9712,
	15298,
	9759,
	15277,
	9797,
	15229,
	9773,
	15166,
	9668,
	15084,
	9487,
	14995,
	9274,
	14898,
	8910,
	14800,
	8539,
	14697,
	8234,
	14590,
	7790,
	14479,
	7409,
	14367,
	7067,
	14178,
	6621,
	15337,
	8619,
	15337,
	8631,
	15333,
	8677,
	15325,
	8769,
	15305,
	8871,
	15264,
	8940,
	15202,
	8909,
	15119,
	8775,
	15022,
	8565,
	14916,
	8328,
	14804,
	8009,
	14688,
	7614,
	14569,
	7287,
	14448,
	6888,
	14321,
	6483,
	14088,
	6171,
	15350,
	7402,
	15350,
	7419,
	15347,
	7480,
	15340,
	7613,
	15322,
	7804,
	15287,
	7973,
	15229,
	8057,
	15148,
	8012,
	15046,
	7846,
	14933,
	7611,
	14810,
	7357,
	14682,
	7069,
	14552,
	6656,
	14421,
	6316,
	14251,
	5948,
	14007,
	5528,
	15356,
	5942,
	15356,
	5977,
	15353,
	6119,
	15348,
	6294,
	15332,
	6551,
	15302,
	6824,
	15249,
	7044,
	15171,
	7122,
	15070,
	7050,
	14949,
	6861,
	14818,
	6611,
	14679,
	6349,
	14538,
	6067,
	14398,
	5651,
	14189,
	5311,
	13935,
	4958,
	15359,
	4123,
	15359,
	4153,
	15356,
	4296,
	15353,
	4646,
	15338,
	5160,
	15311,
	5508,
	15263,
	5829,
	15188,
	6042,
	15088,
	6094,
	14966,
	6001,
	14826,
	5796,
	14678,
	5543,
	14527,
	5287,
	14377,
	4985,
	14133,
	4586,
	13869,
	4257,
	15360,
	1563,
	15360,
	1642,
	15358,
	2076,
	15354,
	2636,
	15341,
	3350,
	15317,
	4019,
	15273,
	4429,
	15203,
	4732,
	15105,
	4911,
	14981,
	4932,
	14836,
	4818,
	14679,
	4621,
	14517,
	4386,
	14359,
	4156,
	14083,
	3795,
	13808,
	3437,
	15360,
	122,
	15360,
	137,
	15358,
	285,
	15355,
	636,
	15344,
	1274,
	15322,
	2177,
	15281,
	2765,
	15215,
	3223,
	15120,
	3451,
	14995,
	3569,
	14846,
	3567,
	14681,
	3466,
	14511,
	3305,
	14344,
	3121,
	14037,
	2800,
	13753,
	2467,
	15360,
	0,
	15360,
	1,
	15359,
	21,
	15355,
	89,
	15346,
	253,
	15325,
	479,
	15287,
	796,
	15225,
	1148,
	15133,
	1492,
	15008,
	1749,
	14856,
	1882,
	14685,
	1886,
	14506,
	1783,
	14324,
	1608,
	13996,
	1398,
	13702,
	1183
]), lut = null;
function getDFGLUT() {
	return lut === null && (lut = new DataTexture(DATA, 16, 16, RGFormat, HalfFloatType), lut.name = "DFG_LUT", lut.minFilter = LinearFilter, lut.magFilter = LinearFilter, lut.wrapS = ClampToEdgeWrapping, lut.wrapT = ClampToEdgeWrapping, lut.generateMipmaps = !1, lut.needsUpdate = !0), lut;
}
var WebGLRenderer = class {
	constructor(w = {}) {
		let { canvas: T = createCanvasElement(), context: O = null, depth: j = !0, stencil: F = !1, alpha: U = !1, antialias: W = !1, premultipliedAlpha: G = !0, preserveDrawingBuffer: K = !1, powerPreference: q = "default", failIfMajorPerformanceCaveat: J = !1, reversedDepthBuffer: Y = !1, outputBufferType: X = UnsignedByteType } = w;
		this.isWebGLRenderer = !0;
		let Q;
		if (O !== null) {
			if (typeof WebGLRenderingContext < "u" && O instanceof WebGLRenderingContext) throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
			Q = O.getContextAttributes().alpha;
		} else Q = U;
		let xS = X, SS = new Set([
			RGBAIntegerFormat,
			RGIntegerFormat,
			RedIntegerFormat
		]), CS = new Set([
			UnsignedByteType,
			UnsignedIntType,
			UnsignedShortType,
			UnsignedInt248Type,
			UnsignedShort4444Type,
			UnsignedShort5551Type
		]), wS = new Uint32Array(4), TS = new Int32Array(4), ES = null, DS = null, OS = [], kS = [], AS = null;
		this.domElement = T, this.debug = {
			checkShaderErrors: !0,
			onShaderError: null
		}, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
		let jS = this, MS = !1;
		this._outputColorSpace = SRGBColorSpace;
		let NS = 0, PS = 0, FS = null, IS = -1, LS = null, RS = new Vector4(), zS = new Vector4(), BS = null, VS = new Color(0), HS = 0, US = T.width, WS = T.height, GS = 1, KS = null, qS = null, JS = new Vector4(0, 0, US, WS), YS = new Vector4(0, 0, US, WS), XS = !1, ZS = new Frustum(), QS = !1, $S = !1, eC = new Matrix4(), tC = new Vector3(), nC = new Vector4(), rC = {
			background: null,
			fog: null,
			environment: null,
			overrideMaterial: null,
			isScene: !0
		}, iC = !1;
		function aC() {
			return FS === null ? GS : 1;
		}
		let oC = O;
		function sC(w, O) {
			return T.getContext(w, O);
		}
		try {
			let w = {
				alpha: !0,
				depth: j,
				stencil: F,
				antialias: W,
				premultipliedAlpha: G,
				preserveDrawingBuffer: K,
				powerPreference: q,
				failIfMajorPerformanceCaveat: J
			};
			if ("setAttribute" in T && T.setAttribute("data-engine", "three.js r182"), T.addEventListener("webglcontextlost", PC, !1), T.addEventListener("webglcontextrestored", FC, !1), T.addEventListener("webglcontextcreationerror", IC, !1), oC === null) {
				let T = "webgl2";
				if (oC = sC(T, w), oC === null) throw sC(T) ? Error("Error creating WebGL context with your selected attributes.") : Error("Error creating WebGL context.");
			}
		} catch (w) {
			throw error("WebGLRenderer: " + w.message), w;
		}
		let cC, lC, uC, dC, fC, pC, mC, hC, gC, _C, vC, yC, bC, xC, SC, CC, wC, TC, EC, DC, OC, kC, AC, jC;
		function MC() {
			cC = new WebGLExtensions(oC), cC.init(), kC = new WebGLUtils(oC, cC), lC = new WebGLCapabilities(oC, cC, w, kC), uC = new WebGLState(oC, cC), lC.reversedDepthBuffer && Y && uC.buffers.depth.setReversed(!0), dC = new WebGLInfo(oC), fC = new WebGLProperties(), pC = new WebGLTextures(oC, cC, uC, fC, lC, kC, dC), mC = new WebGLCubeMaps(jS), hC = new WebGLCubeUVMaps(jS), gC = new WebGLAttributes(oC), AC = new WebGLBindingStates(oC, gC), _C = new WebGLGeometries(oC, gC, dC, AC), vC = new WebGLObjects(oC, _C, gC, dC), EC = new WebGLMorphtargets(oC, lC, pC), CC = new WebGLClipping(fC), yC = new WebGLPrograms(jS, mC, hC, cC, lC, AC, CC), bC = new WebGLMaterials(jS, fC), xC = new WebGLRenderLists(), SC = new WebGLRenderStates(cC), TC = new WebGLBackground(jS, mC, hC, uC, vC, Q, G), wC = new WebGLShadowMap(jS, vC, lC), jC = new WebGLUniformsGroups(oC, dC, lC, uC), DC = new WebGLBufferRenderer(oC, cC, dC), OC = new WebGLIndexedBufferRenderer(oC, cC, dC), dC.programs = yC.programs, jS.capabilities = lC, jS.extensions = cC, jS.properties = fC, jS.renderLists = xC, jS.shadowMap = wC, jS.state = uC, jS.info = dC;
		}
		MC(), xS !== 1009 && (AS = new WebGLOutput(xS, T.width, T.height, j, F));
		let NC = new WebXRManager(jS, oC);
		this.xr = NC, this.getContext = function() {
			return oC;
		}, this.getContextAttributes = function() {
			return oC.getContextAttributes();
		}, this.forceContextLoss = function() {
			let w = cC.get("WEBGL_lose_context");
			w && w.loseContext();
		}, this.forceContextRestore = function() {
			let w = cC.get("WEBGL_lose_context");
			w && w.restoreContext();
		}, this.getPixelRatio = function() {
			return GS;
		}, this.setPixelRatio = function(w) {
			w !== void 0 && (GS = w, this.setSize(US, WS, !1));
		}, this.getSize = function(w) {
			return w.set(US, WS);
		}, this.setSize = function(w, O, j = !0) {
			if (NC.isPresenting) {
				warn("WebGLRenderer: Can't change size while VR device is presenting.");
				return;
			}
			US = w, WS = O, T.width = Math.floor(w * GS), T.height = Math.floor(O * GS), j === !0 && (T.style.width = w + "px", T.style.height = O + "px"), AS !== null && AS.setSize(T.width, T.height), this.setViewport(0, 0, w, O);
		}, this.getDrawingBufferSize = function(w) {
			return w.set(US * GS, WS * GS).floor();
		}, this.setDrawingBufferSize = function(w, O, j) {
			US = w, WS = O, GS = j, T.width = Math.floor(w * j), T.height = Math.floor(O * j), this.setViewport(0, 0, w, O);
		}, this.setEffects = function(w) {
			if (xS === 1009) {
				console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
				return;
			}
			if (w) {
				for (let T = 0; T < w.length; T++) if (w[T].isOutputPass === !0) {
					console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
					break;
				}
			}
			AS.setEffects(w || []);
		}, this.getCurrentViewport = function(w) {
			return w.copy(RS);
		}, this.getViewport = function(w) {
			return w.copy(JS);
		}, this.setViewport = function(w, T, O, j) {
			w.isVector4 ? JS.set(w.x, w.y, w.z, w.w) : JS.set(w, T, O, j), uC.viewport(RS.copy(JS).multiplyScalar(GS).round());
		}, this.getScissor = function(w) {
			return w.copy(YS);
		}, this.setScissor = function(w, T, O, j) {
			w.isVector4 ? YS.set(w.x, w.y, w.z, w.w) : YS.set(w, T, O, j), uC.scissor(zS.copy(YS).multiplyScalar(GS).round());
		}, this.getScissorTest = function() {
			return XS;
		}, this.setScissorTest = function(w) {
			uC.setScissorTest(XS = w);
		}, this.setOpaqueSort = function(w) {
			KS = w;
		}, this.setTransparentSort = function(w) {
			qS = w;
		}, this.getClearColor = function(w) {
			return w.copy(TC.getClearColor());
		}, this.setClearColor = function() {
			TC.setClearColor(...arguments);
		}, this.getClearAlpha = function() {
			return TC.getClearAlpha();
		}, this.setClearAlpha = function() {
			TC.setClearAlpha(...arguments);
		}, this.clear = function(w = !0, T = !0, O = !0) {
			let j = 0;
			if (w) {
				let w = !1;
				if (FS !== null) {
					let T = FS.texture.format;
					w = SS.has(T);
				}
				if (w) {
					let w = FS.texture.type, T = CS.has(w), O = TC.getClearColor(), j = TC.getClearAlpha(), F = O.r, U = O.g, W = O.b;
					T ? (wS[0] = F, wS[1] = U, wS[2] = W, wS[3] = j, oC.clearBufferuiv(oC.COLOR, 0, wS)) : (TS[0] = F, TS[1] = U, TS[2] = W, TS[3] = j, oC.clearBufferiv(oC.COLOR, 0, TS));
				} else j |= oC.COLOR_BUFFER_BIT;
			}
			T && (j |= oC.DEPTH_BUFFER_BIT), O && (j |= oC.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), oC.clear(j);
		}, this.clearColor = function() {
			this.clear(!0, !1, !1);
		}, this.clearDepth = function() {
			this.clear(!1, !0, !1);
		}, this.clearStencil = function() {
			this.clear(!1, !1, !0);
		}, this.dispose = function() {
			T.removeEventListener("webglcontextlost", PC, !1), T.removeEventListener("webglcontextrestored", FC, !1), T.removeEventListener("webglcontextcreationerror", IC, !1), TC.dispose(), xC.dispose(), SC.dispose(), fC.dispose(), mC.dispose(), hC.dispose(), vC.dispose(), AC.dispose(), jC.dispose(), yC.dispose(), NC.dispose(), NC.removeEventListener("sessionstart", UC), NC.removeEventListener("sessionend", WC), GC.stop();
		};
		function PC(w) {
			w.preventDefault(), log("WebGLRenderer: Context Lost."), MS = !0;
		}
		function FC() {
			log("WebGLRenderer: Context Restored."), MS = !1;
			let w = dC.autoReset, T = wC.enabled, O = wC.autoUpdate, j = wC.needsUpdate, F = wC.type;
			MC(), dC.autoReset = w, wC.enabled = T, wC.autoUpdate = O, wC.needsUpdate = j, wC.type = F;
		}
		function IC(w) {
			error("WebGLRenderer: A WebGL context could not be created. Reason: ", w.statusMessage);
		}
		function LC(w) {
			let T = w.target;
			T.removeEventListener("dispose", LC), RC(T);
		}
		function RC(w) {
			zC(w), fC.remove(w);
		}
		function zC(w) {
			let T = fC.get(w).programs;
			T !== void 0 && (T.forEach(function(w) {
				yC.releaseProgram(w);
			}), w.isShaderMaterial && yC.releaseShaderCache(w));
		}
		this.renderBufferDirect = function(w, T, O, j, F, U) {
			T === null && (T = rC);
			let W = F.isMesh && F.matrixWorld.determinant() < 0, G = ew(w, T, O, j, F);
			uC.setMaterial(j, W);
			let K = O.index, q = 1;
			if (j.wireframe === !0) {
				if (K = _C.getWireframeAttribute(O), K === void 0) return;
				q = 2;
			}
			let J = O.drawRange, Y = O.attributes.position, X = J.start * q, Q = (J.start + J.count) * q;
			U !== null && (X = Math.max(X, U.start * q), Q = Math.min(Q, (U.start + U.count) * q)), K === null ? Y != null && (X = Math.max(X, 0), Q = Math.min(Q, Y.count)) : (X = Math.max(X, 0), Q = Math.min(Q, K.count));
			let xS = Q - X;
			if (xS < 0 || xS === Infinity) return;
			AC.setup(F, j, G, O, K);
			let SS, CS = DC;
			if (K !== null && (SS = gC.get(K), CS = OC, CS.setIndex(SS)), F.isMesh) j.wireframe === !0 ? (uC.setLineWidth(j.wireframeLinewidth * aC()), CS.setMode(oC.LINES)) : CS.setMode(oC.TRIANGLES);
			else if (F.isLine) {
				let w = j.linewidth;
				w === void 0 && (w = 1), uC.setLineWidth(w * aC()), F.isLineSegments ? CS.setMode(oC.LINES) : F.isLineLoop ? CS.setMode(oC.LINE_LOOP) : CS.setMode(oC.LINE_STRIP);
			} else F.isPoints ? CS.setMode(oC.POINTS) : F.isSprite && CS.setMode(oC.TRIANGLES);
			if (F.isBatchedMesh) if (F._multiDrawInstances !== null) warnOnce("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."), CS.renderMultiDrawInstances(F._multiDrawStarts, F._multiDrawCounts, F._multiDrawCount, F._multiDrawInstances);
			else if (cC.get("WEBGL_multi_draw")) CS.renderMultiDraw(F._multiDrawStarts, F._multiDrawCounts, F._multiDrawCount);
			else {
				let w = F._multiDrawStarts, T = F._multiDrawCounts, O = F._multiDrawCount, U = K ? gC.get(K).bytesPerElement : 1, W = fC.get(j).currentProgram.getUniforms();
				for (let j = 0; j < O; j++) W.setValue(oC, "_gl_DrawID", j), CS.render(w[j] / U, T[j]);
			}
			else if (F.isInstancedMesh) CS.renderInstances(X, xS, F.count);
			else if (O.isInstancedBufferGeometry) {
				let w = O._maxInstanceCount === void 0 ? Infinity : O._maxInstanceCount, T = Math.min(O.instanceCount, w);
				CS.renderInstances(X, xS, T);
			} else CS.render(X, xS);
		};
		function BC(w, T, O) {
			w.transparent === !0 && w.side === 2 && w.forceSinglePass === !1 ? (w.side = 1, w.needsUpdate = !0, ZC(w, T, O), w.side = 0, w.needsUpdate = !0, ZC(w, T, O), w.side = 2) : ZC(w, T, O);
		}
		this.compile = function(w, T, O = null) {
			O === null && (O = w), DS = SC.get(O), DS.init(T), kS.push(DS), O.traverseVisible(function(w) {
				w.isLight && w.layers.test(T.layers) && (DS.pushLight(w), w.castShadow && DS.pushShadow(w));
			}), w !== O && w.traverseVisible(function(w) {
				w.isLight && w.layers.test(T.layers) && (DS.pushLight(w), w.castShadow && DS.pushShadow(w));
			}), DS.setupLights();
			let j = /* @__PURE__ */ new Set();
			return w.traverse(function(w) {
				if (!(w.isMesh || w.isPoints || w.isLine || w.isSprite)) return;
				let T = w.material;
				if (T) if (Array.isArray(T)) for (let F = 0; F < T.length; F++) {
					let U = T[F];
					BC(U, O, w), j.add(U);
				}
				else BC(T, O, w), j.add(T);
			}), DS = kS.pop(), j;
		}, this.compileAsync = function(w, T, O = null) {
			let j = this.compile(w, T, O);
			return new Promise((T) => {
				function O() {
					if (j.forEach(function(w) {
						fC.get(w).currentProgram.isReady() && j.delete(w);
					}), j.size === 0) {
						T(w);
						return;
					}
					setTimeout(O, 10);
				}
				cC.get("KHR_parallel_shader_compile") === null ? setTimeout(O, 10) : O();
			});
		};
		let VC = null;
		function HC(w) {
			VC && VC(w);
		}
		function UC() {
			GC.stop();
		}
		function WC() {
			GC.start();
		}
		let GC = new WebGLAnimation();
		GC.setAnimationLoop(HC), typeof self < "u" && GC.setContext(self), this.setAnimationLoop = function(w) {
			VC = w, NC.setAnimationLoop(w), w === null ? GC.stop() : GC.start();
		}, NC.addEventListener("sessionstart", UC), NC.addEventListener("sessionend", WC), this.render = function(w, T) {
			if (T !== void 0 && T.isCamera !== !0) {
				error("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
				return;
			}
			if (MS === !0) return;
			let O = NC.enabled === !0 && NC.isPresenting === !0, j = AS !== null && (FS === null || O) && AS.begin(jS, FS);
			if (w.matrixWorldAutoUpdate === !0 && w.updateMatrixWorld(), T.parent === null && T.matrixWorldAutoUpdate === !0 && T.updateMatrixWorld(), NC.enabled === !0 && NC.isPresenting === !0 && (AS === null || AS.isCompositing() === !1) && (NC.cameraAutoUpdate === !0 && NC.updateCamera(T), T = NC.getCamera()), w.isScene === !0 && w.onBeforeRender(jS, w, T, FS), DS = SC.get(w, kS.length), DS.init(T), kS.push(DS), eC.multiplyMatrices(T.projectionMatrix, T.matrixWorldInverse), ZS.setFromProjectionMatrix(eC, WebGLCoordinateSystem, T.reversedDepth), $S = this.localClippingEnabled, QS = CC.init(this.clippingPlanes, $S), ES = xC.get(w, OS.length), ES.init(), OS.push(ES), NC.enabled === !0 && NC.isPresenting === !0) {
				let w = jS.xr.getDepthSensingMesh();
				w !== null && KC(w, T, -Infinity, jS.sortObjects);
			}
			KC(w, T, 0, jS.sortObjects), ES.finish(), jS.sortObjects === !0 && ES.sort(KS, qS), iC = NC.enabled === !1 || NC.isPresenting === !1 || NC.hasDepthSensing() === !1, iC && TC.addToRenderList(ES, w), this.info.render.frame++, QS === !0 && CC.beginShadows();
			let F = DS.state.shadowsArray;
			if (wC.render(F, w, T), QS === !0 && CC.endShadows(), this.info.autoReset === !0 && this.info.reset(), (j && AS.hasRenderPass()) === !1) {
				let O = ES.opaque, j = ES.transmissive;
				if (DS.setupLights(), T.isArrayCamera) {
					let F = T.cameras;
					if (j.length > 0) for (let T = 0, U = F.length; T < U; T++) {
						let U = F[T];
						JC(O, j, w, U);
					}
					iC && TC.render(w);
					for (let T = 0, O = F.length; T < O; T++) {
						let O = F[T];
						qC(ES, w, O, O.viewport);
					}
				} else j.length > 0 && JC(O, j, w, T), iC && TC.render(w), qC(ES, w, T);
			}
			FS !== null && PS === 0 && (pC.updateMultisampleRenderTarget(FS), pC.updateRenderTargetMipmap(FS)), j && AS.end(jS), w.isScene === !0 && w.onAfterRender(jS, w, T), AC.resetDefaultState(), IS = -1, LS = null, kS.pop(), kS.length > 0 ? (DS = kS[kS.length - 1], QS === !0 && CC.setGlobalState(jS.clippingPlanes, DS.state.camera)) : DS = null, OS.pop(), ES = OS.length > 0 ? OS[OS.length - 1] : null;
		};
		function KC(w, T, O, j) {
			if (w.visible === !1) return;
			if (w.layers.test(T.layers)) {
				if (w.isGroup) O = w.renderOrder;
				else if (w.isLOD) w.autoUpdate === !0 && w.update(T);
				else if (w.isLight) DS.pushLight(w), w.castShadow && DS.pushShadow(w);
				else if (w.isSprite) {
					if (!w.frustumCulled || ZS.intersectsSprite(w)) {
						j && nC.setFromMatrixPosition(w.matrixWorld).applyMatrix4(eC);
						let T = vC.update(w), F = w.material;
						F.visible && ES.push(w, T, F, O, nC.z, null);
					}
				} else if ((w.isMesh || w.isLine || w.isPoints) && (!w.frustumCulled || ZS.intersectsObject(w))) {
					let T = vC.update(w), F = w.material;
					if (j && (w.boundingSphere === void 0 ? (T.boundingSphere === null && T.computeBoundingSphere(), nC.copy(T.boundingSphere.center)) : (w.boundingSphere === null && w.computeBoundingSphere(), nC.copy(w.boundingSphere.center)), nC.applyMatrix4(w.matrixWorld).applyMatrix4(eC)), Array.isArray(F)) {
						let j = T.groups;
						for (let U = 0, W = j.length; U < W; U++) {
							let W = j[U], G = F[W.materialIndex];
							G && G.visible && ES.push(w, T, G, O, nC.z, W);
						}
					} else F.visible && ES.push(w, T, F, O, nC.z, null);
				}
			}
			let F = w.children;
			for (let w = 0, U = F.length; w < U; w++) KC(F[w], T, O, j);
		}
		function qC(w, T, O, j) {
			let { opaque: F, transmissive: U, transparent: W } = w;
			DS.setupLightsView(O), QS === !0 && CC.setGlobalState(jS.clippingPlanes, O), j && uC.viewport(RS.copy(j)), F.length > 0 && YC(F, T, O), U.length > 0 && YC(U, T, O), W.length > 0 && YC(W, T, O), uC.buffers.depth.setTest(!0), uC.buffers.depth.setMask(!0), uC.buffers.color.setMask(!0), uC.setPolygonOffset(!1);
		}
		function JC(w, T, O, j) {
			if ((O.isScene === !0 ? O.overrideMaterial : null) !== null) return;
			if (DS.state.transmissionRenderTarget[j.id] === void 0) {
				let w = cC.has("EXT_color_buffer_half_float") || cC.has("EXT_color_buffer_float");
				DS.state.transmissionRenderTarget[j.id] = new WebGLRenderTarget(1, 1, {
					generateMipmaps: !0,
					type: w ? HalfFloatType : UnsignedByteType,
					minFilter: LinearMipmapLinearFilter,
					samples: lC.samples,
					stencilBuffer: F,
					resolveDepthBuffer: !1,
					resolveStencilBuffer: !1,
					colorSpace: ColorManagement.workingColorSpace
				});
			}
			let U = DS.state.transmissionRenderTarget[j.id], W = j.viewport || RS;
			U.setSize(W.z * jS.transmissionResolutionScale, W.w * jS.transmissionResolutionScale);
			let G = jS.getRenderTarget(), K = jS.getActiveCubeFace(), q = jS.getActiveMipmapLevel();
			jS.setRenderTarget(U), jS.getClearColor(VS), HS = jS.getClearAlpha(), HS < 1 && jS.setClearColor(16777215, .5), jS.clear(), iC && TC.render(O);
			let J = jS.toneMapping;
			jS.toneMapping = 0;
			let Y = j.viewport;
			if (j.viewport !== void 0 && (j.viewport = void 0), DS.setupLightsView(j), QS === !0 && CC.setGlobalState(jS.clippingPlanes, j), YC(w, O, j), pC.updateMultisampleRenderTarget(U), pC.updateRenderTargetMipmap(U), cC.has("WEBGL_multisampled_render_to_texture") === !1) {
				let w = !1;
				for (let F = 0, U = T.length; F < U; F++) {
					let { object: U, geometry: W, material: G, group: K } = T[F];
					if (G.side === 2 && U.layers.test(j.layers)) {
						let T = G.side;
						G.side = 1, G.needsUpdate = !0, XC(U, O, j, W, G, K), G.side = T, G.needsUpdate = !0, w = !0;
					}
				}
				w === !0 && (pC.updateMultisampleRenderTarget(U), pC.updateRenderTargetMipmap(U));
			}
			jS.setRenderTarget(G, K, q), jS.setClearColor(VS, HS), Y !== void 0 && (j.viewport = Y), jS.toneMapping = J;
		}
		function YC(w, T, O) {
			let j = T.isScene === !0 ? T.overrideMaterial : null;
			for (let F = 0, U = w.length; F < U; F++) {
				let U = w[F], { object: W, geometry: G, group: K } = U, q = U.material;
				q.allowOverride === !0 && j !== null && (q = j), W.layers.test(O.layers) && XC(W, T, O, G, q, K);
			}
		}
		function XC(w, T, O, j, F, U) {
			w.onBeforeRender(jS, T, O, j, F, U), w.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse, w.matrixWorld), w.normalMatrix.getNormalMatrix(w.modelViewMatrix), F.onBeforeRender(jS, T, O, j, w, U), F.transparent === !0 && F.side === 2 && F.forceSinglePass === !1 ? (F.side = 1, F.needsUpdate = !0, jS.renderBufferDirect(O, T, j, F, w, U), F.side = 0, F.needsUpdate = !0, jS.renderBufferDirect(O, T, j, F, w, U), F.side = 2) : jS.renderBufferDirect(O, T, j, F, w, U), w.onAfterRender(jS, T, O, j, F, U);
		}
		function ZC(w, T, O) {
			T.isScene !== !0 && (T = rC);
			let j = fC.get(w), F = DS.state.lights, U = DS.state.shadowsArray, W = F.state.version, G = yC.getParameters(w, F.state, U, T, O), K = yC.getProgramCacheKey(G), q = j.programs;
			j.environment = w.isMeshStandardMaterial ? T.environment : null, j.fog = T.fog, j.envMap = (w.isMeshStandardMaterial ? hC : mC).get(w.envMap || j.environment), j.envMapRotation = j.environment !== null && w.envMap === null ? T.environmentRotation : w.envMapRotation, q === void 0 && (w.addEventListener("dispose", LC), q = /* @__PURE__ */ new Map(), j.programs = q);
			let J = q.get(K);
			if (J !== void 0) {
				if (j.currentProgram === J && j.lightsStateVersion === W) return $C(w, G), J;
			} else G.uniforms = yC.getUniforms(w), w.onBeforeCompile(G, jS), J = yC.acquireProgram(G, K), q.set(K, J), j.uniforms = G.uniforms;
			let Y = j.uniforms;
			return (!w.isShaderMaterial && !w.isRawShaderMaterial || w.clipping === !0) && (Y.clippingPlanes = CC.uniform), $C(w, G), j.needsLights = nw(w), j.lightsStateVersion = W, j.needsLights && (Y.ambientLightColor.value = F.state.ambient, Y.lightProbe.value = F.state.probe, Y.directionalLights.value = F.state.directional, Y.directionalLightShadows.value = F.state.directionalShadow, Y.spotLights.value = F.state.spot, Y.spotLightShadows.value = F.state.spotShadow, Y.rectAreaLights.value = F.state.rectArea, Y.ltc_1.value = F.state.rectAreaLTC1, Y.ltc_2.value = F.state.rectAreaLTC2, Y.pointLights.value = F.state.point, Y.pointLightShadows.value = F.state.pointShadow, Y.hemisphereLights.value = F.state.hemi, Y.directionalShadowMap.value = F.state.directionalShadowMap, Y.directionalShadowMatrix.value = F.state.directionalShadowMatrix, Y.spotShadowMap.value = F.state.spotShadowMap, Y.spotLightMatrix.value = F.state.spotLightMatrix, Y.spotLightMap.value = F.state.spotLightMap, Y.pointShadowMap.value = F.state.pointShadowMap, Y.pointShadowMatrix.value = F.state.pointShadowMatrix), j.currentProgram = J, j.uniformsList = null, J;
		}
		function QC(w) {
			if (w.uniformsList === null) {
				let T = w.currentProgram.getUniforms();
				w.uniformsList = WebGLUniforms.seqWithValue(T.seq, w.uniforms);
			}
			return w.uniformsList;
		}
		function $C(w, T) {
			let O = fC.get(w);
			O.outputColorSpace = T.outputColorSpace, O.batching = T.batching, O.batchingColor = T.batchingColor, O.instancing = T.instancing, O.instancingColor = T.instancingColor, O.instancingMorph = T.instancingMorph, O.skinning = T.skinning, O.morphTargets = T.morphTargets, O.morphNormals = T.morphNormals, O.morphColors = T.morphColors, O.morphTargetsCount = T.morphTargetsCount, O.numClippingPlanes = T.numClippingPlanes, O.numIntersection = T.numClipIntersection, O.vertexAlphas = T.vertexAlphas, O.vertexTangents = T.vertexTangents, O.toneMapping = T.toneMapping;
		}
		function ew(w, T, O, j, F) {
			T.isScene !== !0 && (T = rC), pC.resetTextureUnits();
			let U = T.fog, W = j.isMeshStandardMaterial ? T.environment : null, G = FS === null ? jS.outputColorSpace : FS.isXRRenderTarget === !0 ? FS.texture.colorSpace : LinearSRGBColorSpace, K = (j.isMeshStandardMaterial ? hC : mC).get(j.envMap || W), q = j.vertexColors === !0 && !!O.attributes.color && O.attributes.color.itemSize === 4, J = !!O.attributes.tangent && (!!j.normalMap || j.anisotropy > 0), Y = !!O.morphAttributes.position, X = !!O.morphAttributes.normal, Q = !!O.morphAttributes.color, xS = 0;
			j.toneMapped && (FS === null || FS.isXRRenderTarget === !0) && (xS = jS.toneMapping);
			let SS = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, CS = SS === void 0 ? 0 : SS.length, wS = fC.get(j), TS = DS.state.lights;
			if (QS === !0 && ($S === !0 || w !== LS)) {
				let T = w === LS && j.id === IS;
				CC.setState(j, w, T);
			}
			let ES = !1;
			j.version === wS.__version ? wS.needsLights && wS.lightsStateVersion !== TS.state.version ? ES = !0 : wS.outputColorSpace === G ? F.isBatchedMesh && wS.batching === !1 || !F.isBatchedMesh && wS.batching === !0 || F.isBatchedMesh && wS.batchingColor === !0 && F.colorTexture === null || F.isBatchedMesh && wS.batchingColor === !1 && F.colorTexture !== null || F.isInstancedMesh && wS.instancing === !1 || !F.isInstancedMesh && wS.instancing === !0 || F.isSkinnedMesh && wS.skinning === !1 || !F.isSkinnedMesh && wS.skinning === !0 || F.isInstancedMesh && wS.instancingColor === !0 && F.instanceColor === null || F.isInstancedMesh && wS.instancingColor === !1 && F.instanceColor !== null || F.isInstancedMesh && wS.instancingMorph === !0 && F.morphTexture === null || F.isInstancedMesh && wS.instancingMorph === !1 && F.morphTexture !== null ? ES = !0 : wS.envMap === K ? j.fog === !0 && wS.fog !== U || wS.numClippingPlanes !== void 0 && (wS.numClippingPlanes !== CC.numPlanes || wS.numIntersection !== CC.numIntersection) ? ES = !0 : wS.vertexAlphas === q && wS.vertexTangents === J && wS.morphTargets === Y && wS.morphNormals === X && wS.morphColors === Q && wS.toneMapping === xS ? wS.morphTargetsCount !== CS && (ES = !0) : ES = !0 : ES = !0 : ES = !0 : (ES = !0, wS.__version = j.version);
			let OS = wS.currentProgram;
			ES === !0 && (OS = ZC(j, T, F));
			let kS = !1, AS = !1, MS = !1, NS = OS.getUniforms(), PS = wS.uniforms;
			if (uC.useProgram(OS.program) && (kS = !0, AS = !0, MS = !0), j.id !== IS && (IS = j.id, AS = !0), kS || LS !== w) {
				uC.buffers.depth.getReversed() && w.reversedDepth !== !0 && (w._reversedDepth = !0, w.updateProjectionMatrix()), NS.setValue(oC, "projectionMatrix", w.projectionMatrix), NS.setValue(oC, "viewMatrix", w.matrixWorldInverse);
				let T = NS.map.cameraPosition;
				T !== void 0 && T.setValue(oC, tC.setFromMatrixPosition(w.matrixWorld)), lC.logarithmicDepthBuffer && NS.setValue(oC, "logDepthBufFC", 2 / (Math.log(w.far + 1) / Math.LN2)), (j.isMeshPhongMaterial || j.isMeshToonMaterial || j.isMeshLambertMaterial || j.isMeshBasicMaterial || j.isMeshStandardMaterial || j.isShaderMaterial) && NS.setValue(oC, "isOrthographic", w.isOrthographicCamera === !0), LS !== w && (LS = w, AS = !0, MS = !0);
			}
			if (wS.needsLights && (TS.state.directionalShadowMap.length > 0 && NS.setValue(oC, "directionalShadowMap", TS.state.directionalShadowMap, pC), TS.state.spotShadowMap.length > 0 && NS.setValue(oC, "spotShadowMap", TS.state.spotShadowMap, pC), TS.state.pointShadowMap.length > 0 && NS.setValue(oC, "pointShadowMap", TS.state.pointShadowMap, pC)), F.isSkinnedMesh) {
				NS.setOptional(oC, F, "bindMatrix"), NS.setOptional(oC, F, "bindMatrixInverse");
				let w = F.skeleton;
				w && (w.boneTexture === null && w.computeBoneTexture(), NS.setValue(oC, "boneTexture", w.boneTexture, pC));
			}
			F.isBatchedMesh && (NS.setOptional(oC, F, "batchingTexture"), NS.setValue(oC, "batchingTexture", F._matricesTexture, pC), NS.setOptional(oC, F, "batchingIdTexture"), NS.setValue(oC, "batchingIdTexture", F._indirectTexture, pC), NS.setOptional(oC, F, "batchingColorTexture"), F._colorsTexture !== null && NS.setValue(oC, "batchingColorTexture", F._colorsTexture, pC));
			let RS = O.morphAttributes;
			if ((RS.position !== void 0 || RS.normal !== void 0 || RS.color !== void 0) && EC.update(F, O, OS), (AS || wS.receiveShadow !== F.receiveShadow) && (wS.receiveShadow = F.receiveShadow, NS.setValue(oC, "receiveShadow", F.receiveShadow)), j.isMeshGouraudMaterial && j.envMap !== null && (PS.envMap.value = K, PS.flipEnvMap.value = K.isCubeTexture && K.isRenderTargetTexture === !1 ? -1 : 1), j.isMeshStandardMaterial && j.envMap === null && T.environment !== null && (PS.envMapIntensity.value = T.environmentIntensity), PS.dfgLUT !== void 0 && (PS.dfgLUT.value = getDFGLUT()), AS && (NS.setValue(oC, "toneMappingExposure", jS.toneMappingExposure), wS.needsLights && tw(PS, MS), U && j.fog === !0 && bC.refreshFogUniforms(PS, U), bC.refreshMaterialUniforms(PS, j, GS, WS, DS.state.transmissionRenderTarget[w.id]), WebGLUniforms.upload(oC, QC(wS), PS, pC)), j.isShaderMaterial && j.uniformsNeedUpdate === !0 && (WebGLUniforms.upload(oC, QC(wS), PS, pC), j.uniformsNeedUpdate = !1), j.isSpriteMaterial && NS.setValue(oC, "center", F.center), NS.setValue(oC, "modelViewMatrix", F.modelViewMatrix), NS.setValue(oC, "normalMatrix", F.normalMatrix), NS.setValue(oC, "modelMatrix", F.matrixWorld), j.isShaderMaterial || j.isRawShaderMaterial) {
				let w = j.uniformsGroups;
				for (let T = 0, O = w.length; T < O; T++) {
					let O = w[T];
					jC.update(O, OS), jC.bind(O, OS);
				}
			}
			return OS;
		}
		function tw(w, T) {
			w.ambientLightColor.needsUpdate = T, w.lightProbe.needsUpdate = T, w.directionalLights.needsUpdate = T, w.directionalLightShadows.needsUpdate = T, w.pointLights.needsUpdate = T, w.pointLightShadows.needsUpdate = T, w.spotLights.needsUpdate = T, w.spotLightShadows.needsUpdate = T, w.rectAreaLights.needsUpdate = T, w.hemisphereLights.needsUpdate = T;
		}
		function nw(w) {
			return w.isMeshLambertMaterial || w.isMeshToonMaterial || w.isMeshPhongMaterial || w.isMeshStandardMaterial || w.isShadowMaterial || w.isShaderMaterial && w.lights === !0;
		}
		this.getActiveCubeFace = function() {
			return NS;
		}, this.getActiveMipmapLevel = function() {
			return PS;
		}, this.getRenderTarget = function() {
			return FS;
		}, this.setRenderTargetTextures = function(w, T, O) {
			let j = fC.get(w);
			j.__autoAllocateDepthBuffer = w.resolveDepthBuffer === !1, j.__autoAllocateDepthBuffer === !1 && (j.__useRenderToTexture = !1), fC.get(w.texture).__webglTexture = T, fC.get(w.depthTexture).__webglTexture = j.__autoAllocateDepthBuffer ? void 0 : O, j.__hasExternalTextures = !0;
		}, this.setRenderTargetFramebuffer = function(w, T) {
			let O = fC.get(w);
			O.__webglFramebuffer = T, O.__useDefaultFramebuffer = T === void 0;
		};
		let rw = oC.createFramebuffer();
		this.setRenderTarget = function(w, T = 0, O = 0) {
			FS = w, NS = T, PS = O;
			let j = null, F = !1, U = !1;
			if (w) {
				let W = fC.get(w);
				if (W.__useDefaultFramebuffer !== void 0) {
					uC.bindFramebuffer(oC.FRAMEBUFFER, W.__webglFramebuffer), RS.copy(w.viewport), zS.copy(w.scissor), BS = w.scissorTest, uC.viewport(RS), uC.scissor(zS), uC.setScissorTest(BS), IS = -1;
					return;
				} else if (W.__webglFramebuffer === void 0) pC.setupRenderTarget(w);
				else if (W.__hasExternalTextures) pC.rebindTextures(w, fC.get(w.texture).__webglTexture, fC.get(w.depthTexture).__webglTexture);
				else if (w.depthBuffer) {
					let T = w.depthTexture;
					if (W.__boundDepthTexture !== T) {
						if (T !== null && fC.has(T) && (w.width !== T.image.width || w.height !== T.image.height)) throw Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
						pC.setupDepthRenderbuffer(w);
					}
				}
				let G = w.texture;
				(G.isData3DTexture || G.isDataArrayTexture || G.isCompressedArrayTexture) && (U = !0);
				let K = fC.get(w).__webglFramebuffer;
				w.isWebGLCubeRenderTarget ? (j = Array.isArray(K[T]) ? K[T][O] : K[T], F = !0) : j = w.samples > 0 && pC.useMultisampledRTT(w) === !1 ? fC.get(w).__webglMultisampledFramebuffer : Array.isArray(K) ? K[O] : K, RS.copy(w.viewport), zS.copy(w.scissor), BS = w.scissorTest;
			} else RS.copy(JS).multiplyScalar(GS).floor(), zS.copy(YS).multiplyScalar(GS).floor(), BS = XS;
			if (O !== 0 && (j = rw), uC.bindFramebuffer(oC.FRAMEBUFFER, j) && uC.drawBuffers(w, j), uC.viewport(RS), uC.scissor(zS), uC.setScissorTest(BS), F) {
				let j = fC.get(w.texture);
				oC.framebufferTexture2D(oC.FRAMEBUFFER, oC.COLOR_ATTACHMENT0, oC.TEXTURE_CUBE_MAP_POSITIVE_X + T, j.__webglTexture, O);
			} else if (U) {
				let j = T;
				for (let T = 0; T < w.textures.length; T++) {
					let F = fC.get(w.textures[T]);
					oC.framebufferTextureLayer(oC.FRAMEBUFFER, oC.COLOR_ATTACHMENT0 + T, F.__webglTexture, O, j);
				}
			} else if (w !== null && O !== 0) {
				let T = fC.get(w.texture);
				oC.framebufferTexture2D(oC.FRAMEBUFFER, oC.COLOR_ATTACHMENT0, oC.TEXTURE_2D, T.__webglTexture, O);
			}
			IS = -1;
		}, this.readRenderTargetPixels = function(w, T, O, j, F, U, W, G = 0) {
			if (!(w && w.isWebGLRenderTarget)) {
				error("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
				return;
			}
			let K = fC.get(w).__webglFramebuffer;
			if (w.isWebGLCubeRenderTarget && W !== void 0 && (K = K[W]), K) {
				uC.bindFramebuffer(oC.FRAMEBUFFER, K);
				try {
					let W = w.textures[G], K = W.format, q = W.type;
					if (!lC.textureFormatReadable(K)) {
						error("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
						return;
					}
					if (!lC.textureTypeReadable(q)) {
						error("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
						return;
					}
					T >= 0 && T <= w.width - j && O >= 0 && O <= w.height - F && (w.textures.length > 1 && oC.readBuffer(oC.COLOR_ATTACHMENT0 + G), oC.readPixels(T, O, j, F, kC.convert(K), kC.convert(q), U));
				} finally {
					let w = FS === null ? null : fC.get(FS).__webglFramebuffer;
					uC.bindFramebuffer(oC.FRAMEBUFFER, w);
				}
			}
		}, this.readRenderTargetPixelsAsync = async function(w, T, O, j, F, U, W, G = 0) {
			if (!(w && w.isWebGLRenderTarget)) throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
			let K = fC.get(w).__webglFramebuffer;
			if (w.isWebGLCubeRenderTarget && W !== void 0 && (K = K[W]), K) if (T >= 0 && T <= w.width - j && O >= 0 && O <= w.height - F) {
				uC.bindFramebuffer(oC.FRAMEBUFFER, K);
				let W = w.textures[G], q = W.format, J = W.type;
				if (!lC.textureFormatReadable(q)) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
				if (!lC.textureTypeReadable(J)) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
				let Y = oC.createBuffer();
				oC.bindBuffer(oC.PIXEL_PACK_BUFFER, Y), oC.bufferData(oC.PIXEL_PACK_BUFFER, U.byteLength, oC.STREAM_READ), w.textures.length > 1 && oC.readBuffer(oC.COLOR_ATTACHMENT0 + G), oC.readPixels(T, O, j, F, kC.convert(q), kC.convert(J), 0);
				let X = FS === null ? null : fC.get(FS).__webglFramebuffer;
				uC.bindFramebuffer(oC.FRAMEBUFFER, X);
				let Q = oC.fenceSync(oC.SYNC_GPU_COMMANDS_COMPLETE, 0);
				return oC.flush(), await probeAsync(oC, Q, 4), oC.bindBuffer(oC.PIXEL_PACK_BUFFER, Y), oC.getBufferSubData(oC.PIXEL_PACK_BUFFER, 0, U), oC.deleteBuffer(Y), oC.deleteSync(Q), U;
			} else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
		}, this.copyFramebufferToTexture = function(w, T = null, O = 0) {
			let j = 2 ** -O, F = Math.floor(w.image.width * j), U = Math.floor(w.image.height * j), W = T === null ? 0 : T.x, G = T === null ? 0 : T.y;
			pC.setTexture2D(w, 0), oC.copyTexSubImage2D(oC.TEXTURE_2D, O, 0, 0, W, G, F, U), uC.unbindTexture();
		};
		let iw = oC.createFramebuffer(), aw = oC.createFramebuffer();
		this.copyTextureToTexture = function(w, T, O = null, j = null, F = 0, U = null) {
			U === null && (F === 0 ? U = 0 : (warnOnce("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."), U = F, F = 0));
			let W, G, K, q, J, Y, X, Q, xS, SS = w.isCompressedTexture ? w.mipmaps[U] : w.image;
			if (O !== null) W = O.max.x - O.min.x, G = O.max.y - O.min.y, K = O.isBox3 ? O.max.z - O.min.z : 1, q = O.min.x, J = O.min.y, Y = O.isBox3 ? O.min.z : 0;
			else {
				let T = 2 ** -F;
				W = Math.floor(SS.width * T), G = Math.floor(SS.height * T), K = w.isDataArrayTexture ? SS.depth : w.isData3DTexture ? Math.floor(SS.depth * T) : 1, q = 0, J = 0, Y = 0;
			}
			j === null ? (X = 0, Q = 0, xS = 0) : (X = j.x, Q = j.y, xS = j.z);
			let CS = kC.convert(T.format), wS = kC.convert(T.type), TS;
			T.isData3DTexture ? (pC.setTexture3D(T, 0), TS = oC.TEXTURE_3D) : T.isDataArrayTexture || T.isCompressedArrayTexture ? (pC.setTexture2DArray(T, 0), TS = oC.TEXTURE_2D_ARRAY) : (pC.setTexture2D(T, 0), TS = oC.TEXTURE_2D), oC.pixelStorei(oC.UNPACK_FLIP_Y_WEBGL, T.flipY), oC.pixelStorei(oC.UNPACK_PREMULTIPLY_ALPHA_WEBGL, T.premultiplyAlpha), oC.pixelStorei(oC.UNPACK_ALIGNMENT, T.unpackAlignment);
			let ES = oC.getParameter(oC.UNPACK_ROW_LENGTH), DS = oC.getParameter(oC.UNPACK_IMAGE_HEIGHT), OS = oC.getParameter(oC.UNPACK_SKIP_PIXELS), kS = oC.getParameter(oC.UNPACK_SKIP_ROWS), AS = oC.getParameter(oC.UNPACK_SKIP_IMAGES);
			oC.pixelStorei(oC.UNPACK_ROW_LENGTH, SS.width), oC.pixelStorei(oC.UNPACK_IMAGE_HEIGHT, SS.height), oC.pixelStorei(oC.UNPACK_SKIP_PIXELS, q), oC.pixelStorei(oC.UNPACK_SKIP_ROWS, J), oC.pixelStorei(oC.UNPACK_SKIP_IMAGES, Y);
			let jS = w.isDataArrayTexture || w.isData3DTexture, MS = T.isDataArrayTexture || T.isData3DTexture;
			if (w.isDepthTexture) {
				let O = fC.get(w), j = fC.get(T), SS = fC.get(O.__renderTarget), CS = fC.get(j.__renderTarget);
				uC.bindFramebuffer(oC.READ_FRAMEBUFFER, SS.__webglFramebuffer), uC.bindFramebuffer(oC.DRAW_FRAMEBUFFER, CS.__webglFramebuffer);
				for (let O = 0; O < K; O++) jS && (oC.framebufferTextureLayer(oC.READ_FRAMEBUFFER, oC.COLOR_ATTACHMENT0, fC.get(w).__webglTexture, F, Y + O), oC.framebufferTextureLayer(oC.DRAW_FRAMEBUFFER, oC.COLOR_ATTACHMENT0, fC.get(T).__webglTexture, U, xS + O)), oC.blitFramebuffer(q, J, W, G, X, Q, W, G, oC.DEPTH_BUFFER_BIT, oC.NEAREST);
				uC.bindFramebuffer(oC.READ_FRAMEBUFFER, null), uC.bindFramebuffer(oC.DRAW_FRAMEBUFFER, null);
			} else if (F !== 0 || w.isRenderTargetTexture || fC.has(w)) {
				let O = fC.get(w), j = fC.get(T);
				uC.bindFramebuffer(oC.READ_FRAMEBUFFER, iw), uC.bindFramebuffer(oC.DRAW_FRAMEBUFFER, aw);
				for (let w = 0; w < K; w++) jS ? oC.framebufferTextureLayer(oC.READ_FRAMEBUFFER, oC.COLOR_ATTACHMENT0, O.__webglTexture, F, Y + w) : oC.framebufferTexture2D(oC.READ_FRAMEBUFFER, oC.COLOR_ATTACHMENT0, oC.TEXTURE_2D, O.__webglTexture, F), MS ? oC.framebufferTextureLayer(oC.DRAW_FRAMEBUFFER, oC.COLOR_ATTACHMENT0, j.__webglTexture, U, xS + w) : oC.framebufferTexture2D(oC.DRAW_FRAMEBUFFER, oC.COLOR_ATTACHMENT0, oC.TEXTURE_2D, j.__webglTexture, U), F === 0 ? MS ? oC.copyTexSubImage3D(TS, U, X, Q, xS + w, q, J, W, G) : oC.copyTexSubImage2D(TS, U, X, Q, q, J, W, G) : oC.blitFramebuffer(q, J, W, G, X, Q, W, G, oC.COLOR_BUFFER_BIT, oC.NEAREST);
				uC.bindFramebuffer(oC.READ_FRAMEBUFFER, null), uC.bindFramebuffer(oC.DRAW_FRAMEBUFFER, null);
			} else MS ? w.isDataTexture || w.isData3DTexture ? oC.texSubImage3D(TS, U, X, Q, xS, W, G, K, CS, wS, SS.data) : T.isCompressedArrayTexture ? oC.compressedTexSubImage3D(TS, U, X, Q, xS, W, G, K, CS, SS.data) : oC.texSubImage3D(TS, U, X, Q, xS, W, G, K, CS, wS, SS) : w.isDataTexture ? oC.texSubImage2D(oC.TEXTURE_2D, U, X, Q, W, G, CS, wS, SS.data) : w.isCompressedTexture ? oC.compressedTexSubImage2D(oC.TEXTURE_2D, U, X, Q, SS.width, SS.height, CS, SS.data) : oC.texSubImage2D(oC.TEXTURE_2D, U, X, Q, W, G, CS, wS, SS);
			oC.pixelStorei(oC.UNPACK_ROW_LENGTH, ES), oC.pixelStorei(oC.UNPACK_IMAGE_HEIGHT, DS), oC.pixelStorei(oC.UNPACK_SKIP_PIXELS, OS), oC.pixelStorei(oC.UNPACK_SKIP_ROWS, kS), oC.pixelStorei(oC.UNPACK_SKIP_IMAGES, AS), U === 0 && T.generateMipmaps && oC.generateMipmap(TS), uC.unbindTexture();
		}, this.initRenderTarget = function(w) {
			fC.get(w).__webglFramebuffer === void 0 && pC.setupRenderTarget(w);
		}, this.initTexture = function(w) {
			w.isCubeTexture ? pC.setTextureCube(w, 0) : w.isData3DTexture ? pC.setTexture3D(w, 0) : w.isDataArrayTexture || w.isCompressedArrayTexture ? pC.setTexture2DArray(w, 0) : pC.setTexture2D(w, 0), uC.unbindTexture();
		}, this.resetState = function() {
			NS = 0, PS = 0, FS = null, uC.reset(), AC.reset();
		}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	get coordinateSystem() {
		return WebGLCoordinateSystem;
	}
	get outputColorSpace() {
		return this._outputColorSpace;
	}
	set outputColorSpace(w) {
		this._outputColorSpace = w;
		let T = this.getContext();
		T.drawingBufferColorSpace = ColorManagement._getDrawingBufferColorSpace(w), T.unpackColorSpace = ColorManagement._getUnpackColorSpace();
	}
}, _changeEvent = { type: "change" }, _startEvent = { type: "start" }, _endEvent = { type: "end" }, _ray = new Ray(), _plane = new Plane(), _TILT_LIMIT = Math.cos(70 * MathUtils.DEG2RAD), _v = new Vector3(), _twoPI = 2 * Math.PI, _STATE = {
	NONE: -1,
	ROTATE: 0,
	DOLLY: 1,
	PAN: 2,
	TOUCH_ROTATE: 3,
	TOUCH_PAN: 4,
	TOUCH_DOLLY_PAN: 5,
	TOUCH_DOLLY_ROTATE: 6
}, _EPS = 1e-6, OrbitControls = class extends Controls {
	constructor(w, T = null) {
		super(w, T), this.state = _STATE.NONE, this.target = new Vector3(), this.cursor = new Vector3(), this.minDistance = 0, this.maxDistance = Infinity, this.minZoom = 0, this.maxZoom = Infinity, this.minTargetRadius = 0, this.maxTargetRadius = Infinity, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -Infinity, this.maxAzimuthAngle = Infinity, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
			LEFT: "ArrowLeft",
			UP: "ArrowUp",
			RIGHT: "ArrowRight",
			BOTTOM: "ArrowDown"
		}, this.mouseButtons = {
			LEFT: MOUSE.ROTATE,
			MIDDLE: MOUSE.DOLLY,
			RIGHT: MOUSE.PAN
		}, this.touches = {
			ONE: TOUCH.ROTATE,
			TWO: TOUCH.DOLLY_PAN
		}, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new Vector3(), this._lastQuaternion = new Quaternion(), this._lastTargetPosition = new Vector3(), this._quat = new Quaternion().setFromUnitVectors(w.up, new Vector3(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Spherical(), this._sphericalDelta = new Spherical(), this._scale = 1, this._panOffset = new Vector3(), this._rotateStart = new Vector2(), this._rotateEnd = new Vector2(), this._rotateDelta = new Vector2(), this._panStart = new Vector2(), this._panEnd = new Vector2(), this._panDelta = new Vector2(), this._dollyStart = new Vector2(), this._dollyEnd = new Vector2(), this._dollyDelta = new Vector2(), this._dollyDirection = new Vector3(), this._mouse = new Vector2(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = onPointerMove.bind(this), this._onPointerDown = onPointerDown.bind(this), this._onPointerUp = onPointerUp.bind(this), this._onContextMenu = onContextMenu.bind(this), this._onMouseWheel = onMouseWheel.bind(this), this._onKeyDown = onKeyDown.bind(this), this._onTouchStart = onTouchStart.bind(this), this._onTouchMove = onTouchMove.bind(this), this._onMouseDown = onMouseDown.bind(this), this._onMouseMove = onMouseMove.bind(this), this._interceptControlDown = interceptControlDown.bind(this), this._interceptControlUp = interceptControlUp.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
	}
	connect(w) {
		super.connect(w), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, {
			passive: !0,
			capture: !0
		}), this.domElement.style.touchAction = "none";
	}
	disconnect() {
		this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "auto";
	}
	dispose() {
		this.disconnect();
	}
	getPolarAngle() {
		return this._spherical.phi;
	}
	getAzimuthalAngle() {
		return this._spherical.theta;
	}
	getDistance() {
		return this.object.position.distanceTo(this.target);
	}
	listenToKeyEvents(w) {
		w.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = w;
	}
	stopListenToKeyEvents() {
		this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
	}
	saveState() {
		this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
	}
	reset() {
		this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(_changeEvent), this.update(), this.state = _STATE.NONE;
	}
	update(w = null) {
		let T = this.object.position;
		_v.copy(T).sub(this.target), _v.applyQuaternion(this._quat), this._spherical.setFromVector3(_v), this.autoRotate && this.state === _STATE.NONE && this._rotateLeft(this._getAutoRotationAngle(w)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
		let O = this.minAzimuthAngle, j = this.maxAzimuthAngle;
		isFinite(O) && isFinite(j) && (O < -Math.PI ? O += _twoPI : O > Math.PI && (O -= _twoPI), j < -Math.PI ? j += _twoPI : j > Math.PI && (j -= _twoPI), O <= j ? this._spherical.theta = Math.max(O, Math.min(j, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (O + j) / 2 ? Math.max(O, this._spherical.theta) : Math.min(j, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
		let F = !1;
		if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
		else {
			let w = this._spherical.radius;
			this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), F = w != this._spherical.radius;
		}
		if (_v.setFromSpherical(this._spherical), _v.applyQuaternion(this._quatInverse), T.copy(this.target).add(_v), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
			let w = null;
			if (this.object.isPerspectiveCamera) {
				let T = _v.length();
				w = this._clampDistance(T * this._scale);
				let O = T - w;
				this.object.position.addScaledVector(this._dollyDirection, O), this.object.updateMatrixWorld(), F = !!O;
			} else if (this.object.isOrthographicCamera) {
				let T = new Vector3(this._mouse.x, this._mouse.y, 0);
				T.unproject(this.object);
				let O = this.object.zoom;
				this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), F = O !== this.object.zoom;
				let j = new Vector3(this._mouse.x, this._mouse.y, 0);
				j.unproject(this.object), this.object.position.sub(j).add(T), this.object.updateMatrixWorld(), w = _v.length();
			} else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
			w !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(w).add(this.object.position) : (_ray.origin.copy(this.object.position), _ray.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(_ray.direction)) < _TILT_LIMIT ? this.object.lookAt(this.target) : (_plane.setFromNormalAndCoplanarPoint(this.object.up, this.target), _ray.intersectPlane(_plane, this.target))));
		} else if (this.object.isOrthographicCamera) {
			let w = this.object.zoom;
			this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), w !== this.object.zoom && (this.object.updateProjectionMatrix(), F = !0);
		}
		return this._scale = 1, this._performCursorZoom = !1, F || this._lastPosition.distanceToSquared(this.object.position) > _EPS || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > _EPS || this._lastTargetPosition.distanceToSquared(this.target) > _EPS ? (this.dispatchEvent(_changeEvent), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
	}
	_getAutoRotationAngle(w) {
		return w === null ? _twoPI / 60 / 60 * this.autoRotateSpeed : _twoPI / 60 * this.autoRotateSpeed * w;
	}
	_getZoomScale(w) {
		let T = Math.abs(w * .01);
		return .95 ** (this.zoomSpeed * T);
	}
	_rotateLeft(w) {
		this._sphericalDelta.theta -= w;
	}
	_rotateUp(w) {
		this._sphericalDelta.phi -= w;
	}
	_panLeft(w, T) {
		_v.setFromMatrixColumn(T, 0), _v.multiplyScalar(-w), this._panOffset.add(_v);
	}
	_panUp(w, T) {
		this.screenSpacePanning === !0 ? _v.setFromMatrixColumn(T, 1) : (_v.setFromMatrixColumn(T, 0), _v.crossVectors(this.object.up, _v)), _v.multiplyScalar(w), this._panOffset.add(_v);
	}
	_pan(w, T) {
		let O = this.domElement;
		if (this.object.isPerspectiveCamera) {
			let j = this.object.position;
			_v.copy(j).sub(this.target);
			let F = _v.length();
			F *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * w * F / O.clientHeight, this.object.matrix), this._panUp(2 * T * F / O.clientHeight, this.object.matrix);
		} else this.object.isOrthographicCamera ? (this._panLeft(w * (this.object.right - this.object.left) / this.object.zoom / O.clientWidth, this.object.matrix), this._panUp(T * (this.object.top - this.object.bottom) / this.object.zoom / O.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
	}
	_dollyOut(w) {
		this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= w : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
	}
	_dollyIn(w) {
		this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= w : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
	}
	_updateZoomParameters(w, T) {
		if (!this.zoomToCursor) return;
		this._performCursorZoom = !0;
		let O = this.domElement.getBoundingClientRect(), j = w - O.left, F = T - O.top, U = O.width, W = O.height;
		this._mouse.x = j / U * 2 - 1, this._mouse.y = -(F / W) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
	}
	_clampDistance(w) {
		return Math.max(this.minDistance, Math.min(this.maxDistance, w));
	}
	_handleMouseDownRotate(w) {
		this._rotateStart.set(w.clientX, w.clientY);
	}
	_handleMouseDownDolly(w) {
		this._updateZoomParameters(w.clientX, w.clientX), this._dollyStart.set(w.clientX, w.clientY);
	}
	_handleMouseDownPan(w) {
		this._panStart.set(w.clientX, w.clientY);
	}
	_handleMouseMoveRotate(w) {
		this._rotateEnd.set(w.clientX, w.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
		let T = this.domElement;
		this._rotateLeft(_twoPI * this._rotateDelta.x / T.clientHeight), this._rotateUp(_twoPI * this._rotateDelta.y / T.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
	}
	_handleMouseMoveDolly(w) {
		this._dollyEnd.set(w.clientX, w.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
	}
	_handleMouseMovePan(w) {
		this._panEnd.set(w.clientX, w.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
	}
	_handleMouseWheel(w) {
		this._updateZoomParameters(w.clientX, w.clientY), w.deltaY < 0 ? this._dollyIn(this._getZoomScale(w.deltaY)) : w.deltaY > 0 && this._dollyOut(this._getZoomScale(w.deltaY)), this.update();
	}
	_handleKeyDown(w) {
		let T = !1;
		switch (w.code) {
			case this.keys.UP:
				w.ctrlKey || w.metaKey || w.shiftKey ? this.enableRotate && this._rotateUp(_twoPI * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), T = !0;
				break;
			case this.keys.BOTTOM:
				w.ctrlKey || w.metaKey || w.shiftKey ? this.enableRotate && this._rotateUp(-_twoPI * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), T = !0;
				break;
			case this.keys.LEFT:
				w.ctrlKey || w.metaKey || w.shiftKey ? this.enableRotate && this._rotateLeft(_twoPI * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), T = !0;
				break;
			case this.keys.RIGHT:
				w.ctrlKey || w.metaKey || w.shiftKey ? this.enableRotate && this._rotateLeft(-_twoPI * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), T = !0;
				break;
		}
		T && (w.preventDefault(), this.update());
	}
	_handleTouchStartRotate(w) {
		if (this._pointers.length === 1) this._rotateStart.set(w.pageX, w.pageY);
		else {
			let T = this._getSecondPointerPosition(w), O = .5 * (w.pageX + T.x), j = .5 * (w.pageY + T.y);
			this._rotateStart.set(O, j);
		}
	}
	_handleTouchStartPan(w) {
		if (this._pointers.length === 1) this._panStart.set(w.pageX, w.pageY);
		else {
			let T = this._getSecondPointerPosition(w), O = .5 * (w.pageX + T.x), j = .5 * (w.pageY + T.y);
			this._panStart.set(O, j);
		}
	}
	_handleTouchStartDolly(w) {
		let T = this._getSecondPointerPosition(w), O = w.pageX - T.x, j = w.pageY - T.y, F = Math.sqrt(O * O + j * j);
		this._dollyStart.set(0, F);
	}
	_handleTouchStartDollyPan(w) {
		this.enableZoom && this._handleTouchStartDolly(w), this.enablePan && this._handleTouchStartPan(w);
	}
	_handleTouchStartDollyRotate(w) {
		this.enableZoom && this._handleTouchStartDolly(w), this.enableRotate && this._handleTouchStartRotate(w);
	}
	_handleTouchMoveRotate(w) {
		if (this._pointers.length == 1) this._rotateEnd.set(w.pageX, w.pageY);
		else {
			let T = this._getSecondPointerPosition(w), O = .5 * (w.pageX + T.x), j = .5 * (w.pageY + T.y);
			this._rotateEnd.set(O, j);
		}
		this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
		let T = this.domElement;
		this._rotateLeft(_twoPI * this._rotateDelta.x / T.clientHeight), this._rotateUp(_twoPI * this._rotateDelta.y / T.clientHeight), this._rotateStart.copy(this._rotateEnd);
	}
	_handleTouchMovePan(w) {
		if (this._pointers.length === 1) this._panEnd.set(w.pageX, w.pageY);
		else {
			let T = this._getSecondPointerPosition(w), O = .5 * (w.pageX + T.x), j = .5 * (w.pageY + T.y);
			this._panEnd.set(O, j);
		}
		this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
	}
	_handleTouchMoveDolly(w) {
		let T = this._getSecondPointerPosition(w), O = w.pageX - T.x, j = w.pageY - T.y, F = Math.sqrt(O * O + j * j);
		this._dollyEnd.set(0, F), this._dollyDelta.set(0, (this._dollyEnd.y / this._dollyStart.y) ** +this.zoomSpeed), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
		let U = (w.pageX + T.x) * .5, W = (w.pageY + T.y) * .5;
		this._updateZoomParameters(U, W);
	}
	_handleTouchMoveDollyPan(w) {
		this.enableZoom && this._handleTouchMoveDolly(w), this.enablePan && this._handleTouchMovePan(w);
	}
	_handleTouchMoveDollyRotate(w) {
		this.enableZoom && this._handleTouchMoveDolly(w), this.enableRotate && this._handleTouchMoveRotate(w);
	}
	_addPointer(w) {
		this._pointers.push(w.pointerId);
	}
	_removePointer(w) {
		delete this._pointerPositions[w.pointerId];
		for (let T = 0; T < this._pointers.length; T++) if (this._pointers[T] == w.pointerId) {
			this._pointers.splice(T, 1);
			return;
		}
	}
	_isTrackingPointer(w) {
		for (let T = 0; T < this._pointers.length; T++) if (this._pointers[T] == w.pointerId) return !0;
		return !1;
	}
	_trackPointer(w) {
		let T = this._pointerPositions[w.pointerId];
		T === void 0 && (T = new Vector2(), this._pointerPositions[w.pointerId] = T), T.set(w.pageX, w.pageY);
	}
	_getSecondPointerPosition(w) {
		let T = w.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
		return this._pointerPositions[T];
	}
	_customWheelEvent(w) {
		let T = w.deltaMode, O = {
			clientX: w.clientX,
			clientY: w.clientY,
			deltaY: w.deltaY
		};
		switch (T) {
			case 1:
				O.deltaY *= 16;
				break;
			case 2:
				O.deltaY *= 100;
				break;
		}
		return w.ctrlKey && !this._controlActive && (O.deltaY *= 10), O;
	}
};
function onPointerDown(w) {
	this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(w.pointerId), this.domElement.ownerDocument.addEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(w) && (this._addPointer(w), w.pointerType === "touch" ? this._onTouchStart(w) : this._onMouseDown(w)));
}
function onPointerMove(w) {
	this.enabled !== !1 && (w.pointerType === "touch" ? this._onTouchMove(w) : this._onMouseMove(w));
}
function onPointerUp(w) {
	switch (this._removePointer(w), this._pointers.length) {
		case 0:
			this.domElement.releasePointerCapture(w.pointerId), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(_endEvent), this.state = _STATE.NONE;
			break;
		case 1:
			let T = this._pointers[0], O = this._pointerPositions[T];
			this._onTouchStart({
				pointerId: T,
				pageX: O.x,
				pageY: O.y
			});
			break;
	}
}
function onMouseDown(w) {
	let T;
	switch (w.button) {
		case 0:
			T = this.mouseButtons.LEFT;
			break;
		case 1:
			T = this.mouseButtons.MIDDLE;
			break;
		case 2:
			T = this.mouseButtons.RIGHT;
			break;
		default: T = -1;
	}
	switch (T) {
		case MOUSE.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseDownDolly(w), this.state = _STATE.DOLLY;
			break;
		case MOUSE.ROTATE:
			if (w.ctrlKey || w.metaKey || w.shiftKey) {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(w), this.state = _STATE.PAN;
			} else {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(w), this.state = _STATE.ROTATE;
			}
			break;
		case MOUSE.PAN:
			if (w.ctrlKey || w.metaKey || w.shiftKey) {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(w), this.state = _STATE.ROTATE;
			} else {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(w), this.state = _STATE.PAN;
			}
			break;
		default: this.state = _STATE.NONE;
	}
	this.state !== _STATE.NONE && this.dispatchEvent(_startEvent);
}
function onMouseMove(w) {
	switch (this.state) {
		case _STATE.ROTATE:
			if (this.enableRotate === !1) return;
			this._handleMouseMoveRotate(w);
			break;
		case _STATE.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseMoveDolly(w);
			break;
		case _STATE.PAN:
			if (this.enablePan === !1) return;
			this._handleMouseMovePan(w);
			break;
	}
}
function onMouseWheel(w) {
	this.enabled === !1 || this.enableZoom === !1 || this.state !== _STATE.NONE || (w.preventDefault(), this.dispatchEvent(_startEvent), this._handleMouseWheel(this._customWheelEvent(w)), this.dispatchEvent(_endEvent));
}
function onKeyDown(w) {
	this.enabled !== !1 && this._handleKeyDown(w);
}
function onTouchStart(w) {
	switch (this._trackPointer(w), this._pointers.length) {
		case 1:
			switch (this.touches.ONE) {
				case TOUCH.ROTATE:
					if (this.enableRotate === !1) return;
					this._handleTouchStartRotate(w), this.state = _STATE.TOUCH_ROTATE;
					break;
				case TOUCH.PAN:
					if (this.enablePan === !1) return;
					this._handleTouchStartPan(w), this.state = _STATE.TOUCH_PAN;
					break;
				default: this.state = _STATE.NONE;
			}
			break;
		case 2:
			switch (this.touches.TWO) {
				case TOUCH.DOLLY_PAN:
					if (this.enableZoom === !1 && this.enablePan === !1) return;
					this._handleTouchStartDollyPan(w), this.state = _STATE.TOUCH_DOLLY_PAN;
					break;
				case TOUCH.DOLLY_ROTATE:
					if (this.enableZoom === !1 && this.enableRotate === !1) return;
					this._handleTouchStartDollyRotate(w), this.state = _STATE.TOUCH_DOLLY_ROTATE;
					break;
				default: this.state = _STATE.NONE;
			}
			break;
		default: this.state = _STATE.NONE;
	}
	this.state !== _STATE.NONE && this.dispatchEvent(_startEvent);
}
function onTouchMove(w) {
	switch (this._trackPointer(w), this.state) {
		case _STATE.TOUCH_ROTATE:
			if (this.enableRotate === !1) return;
			this._handleTouchMoveRotate(w), this.update();
			break;
		case _STATE.TOUCH_PAN:
			if (this.enablePan === !1) return;
			this._handleTouchMovePan(w), this.update();
			break;
		case _STATE.TOUCH_DOLLY_PAN:
			if (this.enableZoom === !1 && this.enablePan === !1) return;
			this._handleTouchMoveDollyPan(w), this.update();
			break;
		case _STATE.TOUCH_DOLLY_ROTATE:
			if (this.enableZoom === !1 && this.enableRotate === !1) return;
			this._handleTouchMoveDollyRotate(w), this.update();
			break;
		default: this.state = _STATE.NONE;
	}
}
function onContextMenu(w) {
	this.enabled !== !1 && w.preventDefault();
}
function interceptControlDown(w) {
	w.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
function interceptControlUp(w) {
	w.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
function earcut(w, T, O = 2) {
	let j = T && T.length, F = j ? T[0] * O : w.length, U = linkedList(w, 0, F, O, !0), W = [];
	if (!U || U.next === U.prev) return W;
	let G, K, q;
	if (j && (U = eliminateHoles(w, T, U, O)), w.length > 80 * O) {
		G = w[0], K = w[1];
		let T = G, j = K;
		for (let U = O; U < F; U += O) {
			let O = w[U], F = w[U + 1];
			O < G && (G = O), F < K && (K = F), O > T && (T = O), F > j && (j = F);
		}
		q = Math.max(T - G, j - K), q = q === 0 ? 0 : 32767 / q;
	}
	return earcutLinked(U, W, O, G, K, q, 0), W;
}
function linkedList(w, T, O, j, F) {
	let U;
	if (F === signedArea(w, T, O, j) > 0) for (let F = T; F < O; F += j) U = insertNode(F / j | 0, w[F], w[F + 1], U);
	else for (let F = O - j; F >= T; F -= j) U = insertNode(F / j | 0, w[F], w[F + 1], U);
	return U && equals(U, U.next) && (removeNode(U), U = U.next), U;
}
function filterPoints(w, T) {
	if (!w) return w;
	T ||= w;
	let O = w, j;
	do
		if (j = !1, !O.steiner && (equals(O, O.next) || area(O.prev, O, O.next) === 0)) {
			if (removeNode(O), O = T = O.prev, O === O.next) break;
			j = !0;
		} else O = O.next;
	while (j || O !== T);
	return T;
}
function earcutLinked(w, T, O, j, F, U, W) {
	if (!w) return;
	!W && U && indexCurve(w, j, F, U);
	let G = w;
	for (; w.prev !== w.next;) {
		let K = w.prev, q = w.next;
		if (U ? isEarHashed(w, j, F, U) : isEar(w)) {
			T.push(K.i, w.i, q.i), removeNode(w), w = q.next, G = q.next;
			continue;
		}
		if (w = q, w === G) {
			W ? W === 1 ? (w = cureLocalIntersections(filterPoints(w), T), earcutLinked(w, T, O, j, F, U, 2)) : W === 2 && splitEarcut(w, T, O, j, F, U) : earcutLinked(filterPoints(w), T, O, j, F, U, 1);
			break;
		}
	}
}
function isEar(w) {
	let T = w.prev, O = w, j = w.next;
	if (area(T, O, j) >= 0) return !1;
	let F = T.x, U = O.x, W = j.x, G = T.y, K = O.y, q = j.y, J = Math.min(F, U, W), Y = Math.min(G, K, q), X = Math.max(F, U, W), Q = Math.max(G, K, q), xS = j.next;
	for (; xS !== T;) {
		if (xS.x >= J && xS.x <= X && xS.y >= Y && xS.y <= Q && pointInTriangleExceptFirst(F, G, U, K, W, q, xS.x, xS.y) && area(xS.prev, xS, xS.next) >= 0) return !1;
		xS = xS.next;
	}
	return !0;
}
function isEarHashed(w, T, O, j) {
	let F = w.prev, U = w, W = w.next;
	if (area(F, U, W) >= 0) return !1;
	let G = F.x, K = U.x, q = W.x, J = F.y, Y = U.y, X = W.y, Q = Math.min(G, K, q), xS = Math.min(J, Y, X), SS = Math.max(G, K, q), CS = Math.max(J, Y, X), wS = zOrder(Q, xS, T, O, j), TS = zOrder(SS, CS, T, O, j), ES = w.prevZ, DS = w.nextZ;
	for (; ES && ES.z >= wS && DS && DS.z <= TS;) {
		if (ES.x >= Q && ES.x <= SS && ES.y >= xS && ES.y <= CS && ES !== F && ES !== W && pointInTriangleExceptFirst(G, J, K, Y, q, X, ES.x, ES.y) && area(ES.prev, ES, ES.next) >= 0 || (ES = ES.prevZ, DS.x >= Q && DS.x <= SS && DS.y >= xS && DS.y <= CS && DS !== F && DS !== W && pointInTriangleExceptFirst(G, J, K, Y, q, X, DS.x, DS.y) && area(DS.prev, DS, DS.next) >= 0)) return !1;
		DS = DS.nextZ;
	}
	for (; ES && ES.z >= wS;) {
		if (ES.x >= Q && ES.x <= SS && ES.y >= xS && ES.y <= CS && ES !== F && ES !== W && pointInTriangleExceptFirst(G, J, K, Y, q, X, ES.x, ES.y) && area(ES.prev, ES, ES.next) >= 0) return !1;
		ES = ES.prevZ;
	}
	for (; DS && DS.z <= TS;) {
		if (DS.x >= Q && DS.x <= SS && DS.y >= xS && DS.y <= CS && DS !== F && DS !== W && pointInTriangleExceptFirst(G, J, K, Y, q, X, DS.x, DS.y) && area(DS.prev, DS, DS.next) >= 0) return !1;
		DS = DS.nextZ;
	}
	return !0;
}
function cureLocalIntersections(w, T) {
	let O = w;
	do {
		let j = O.prev, F = O.next.next;
		!equals(j, F) && intersects(j, O, O.next, F) && locallyInside(j, F) && locallyInside(F, j) && (T.push(j.i, O.i, F.i), removeNode(O), removeNode(O.next), O = w = F), O = O.next;
	} while (O !== w);
	return filterPoints(O);
}
function splitEarcut(w, T, O, j, F, U) {
	let W = w;
	do {
		let w = W.next.next;
		for (; w !== W.prev;) {
			if (W.i !== w.i && isValidDiagonal(W, w)) {
				let G = splitPolygon(W, w);
				W = filterPoints(W, W.next), G = filterPoints(G, G.next), earcutLinked(W, T, O, j, F, U, 0), earcutLinked(G, T, O, j, F, U, 0);
				return;
			}
			w = w.next;
		}
		W = W.next;
	} while (W !== w);
}
function eliminateHoles(w, T, O, j) {
	let F = [];
	for (let O = 0, U = T.length; O < U; O++) {
		let W = linkedList(w, T[O] * j, O < U - 1 ? T[O + 1] * j : w.length, j, !1);
		W === W.next && (W.steiner = !0), F.push(getLeftmost(W));
	}
	F.sort(compareXYSlope);
	for (let w = 0; w < F.length; w++) O = eliminateHole(F[w], O);
	return O;
}
function compareXYSlope(w, T) {
	let O = w.x - T.x;
	return O === 0 && (O = w.y - T.y, O === 0 && (O = (w.next.y - w.y) / (w.next.x - w.x) - (T.next.y - T.y) / (T.next.x - T.x))), O;
}
function eliminateHole(w, T) {
	let O = findHoleBridge(w, T);
	if (!O) return T;
	let j = splitPolygon(O, w);
	return filterPoints(j, j.next), filterPoints(O, O.next);
}
function findHoleBridge(w, T) {
	let O = T, j = w.x, F = w.y, U = -Infinity, W;
	if (equals(w, O)) return O;
	do {
		if (equals(w, O.next)) return O.next;
		if (F <= O.y && F >= O.next.y && O.next.y !== O.y) {
			let w = O.x + (F - O.y) * (O.next.x - O.x) / (O.next.y - O.y);
			if (w <= j && w > U && (U = w, W = O.x < O.next.x ? O : O.next, w === j)) return W;
		}
		O = O.next;
	} while (O !== T);
	if (!W) return null;
	let G = W, K = W.x, q = W.y, J = Infinity;
	O = W;
	do {
		if (j >= O.x && O.x >= K && j !== O.x && pointInTriangle(F < q ? j : U, F, K, q, F < q ? U : j, F, O.x, O.y)) {
			let T = Math.abs(F - O.y) / (j - O.x);
			locallyInside(O, w) && (T < J || T === J && (O.x > W.x || O.x === W.x && sectorContainsSector(W, O))) && (W = O, J = T);
		}
		O = O.next;
	} while (O !== G);
	return W;
}
function sectorContainsSector(w, T) {
	return area(w.prev, w, T.prev) < 0 && area(T.next, w, w.next) < 0;
}
function indexCurve(w, T, O, j) {
	let F = w;
	do
		F.z === 0 && (F.z = zOrder(F.x, F.y, T, O, j)), F.prevZ = F.prev, F.nextZ = F.next, F = F.next;
	while (F !== w);
	F.prevZ.nextZ = null, F.prevZ = null, sortLinked(F);
}
function sortLinked(w) {
	let T, O = 1;
	do {
		let j = w, F;
		w = null;
		let U = null;
		for (T = 0; j;) {
			T++;
			let W = j, G = 0;
			for (let w = 0; w < O && (G++, W = W.nextZ, W); w++);
			let K = O;
			for (; G > 0 || K > 0 && W;) G !== 0 && (K === 0 || !W || j.z <= W.z) ? (F = j, j = j.nextZ, G--) : (F = W, W = W.nextZ, K--), U ? U.nextZ = F : w = F, F.prevZ = U, U = F;
			j = W;
		}
		U.nextZ = null, O *= 2;
	} while (T > 1);
	return w;
}
function zOrder(w, T, O, j, F) {
	return w = (w - O) * F | 0, T = (T - j) * F | 0, w = (w | w << 8) & 16711935, w = (w | w << 4) & 252645135, w = (w | w << 2) & 858993459, w = (w | w << 1) & 1431655765, T = (T | T << 8) & 16711935, T = (T | T << 4) & 252645135, T = (T | T << 2) & 858993459, T = (T | T << 1) & 1431655765, w | T << 1;
}
function getLeftmost(w) {
	let T = w, O = w;
	do
		(T.x < O.x || T.x === O.x && T.y < O.y) && (O = T), T = T.next;
	while (T !== w);
	return O;
}
function pointInTriangle(w, T, O, j, F, U, W, G) {
	return (F - W) * (T - G) >= (w - W) * (U - G) && (w - W) * (j - G) >= (O - W) * (T - G) && (O - W) * (U - G) >= (F - W) * (j - G);
}
function pointInTriangleExceptFirst(w, T, O, j, F, U, W, G) {
	return !(w === W && T === G) && pointInTriangle(w, T, O, j, F, U, W, G);
}
function isValidDiagonal(w, T) {
	return w.next.i !== T.i && w.prev.i !== T.i && !intersectsPolygon(w, T) && (locallyInside(w, T) && locallyInside(T, w) && middleInside(w, T) && (area(w.prev, w, T.prev) || area(w, T.prev, T)) || equals(w, T) && area(w.prev, w, w.next) > 0 && area(T.prev, T, T.next) > 0);
}
function area(w, T, O) {
	return (T.y - w.y) * (O.x - T.x) - (T.x - w.x) * (O.y - T.y);
}
function equals(w, T) {
	return w.x === T.x && w.y === T.y;
}
function intersects(w, T, O, j) {
	let F = sign(area(w, T, O)), U = sign(area(w, T, j)), W = sign(area(O, j, w)), G = sign(area(O, j, T));
	return !!(F !== U && W !== G || F === 0 && onSegment(w, O, T) || U === 0 && onSegment(w, j, T) || W === 0 && onSegment(O, w, j) || G === 0 && onSegment(O, T, j));
}
function onSegment(w, T, O) {
	return T.x <= Math.max(w.x, O.x) && T.x >= Math.min(w.x, O.x) && T.y <= Math.max(w.y, O.y) && T.y >= Math.min(w.y, O.y);
}
function sign(w) {
	return w > 0 ? 1 : w < 0 ? -1 : 0;
}
function intersectsPolygon(w, T) {
	let O = w;
	do {
		if (O.i !== w.i && O.next.i !== w.i && O.i !== T.i && O.next.i !== T.i && intersects(O, O.next, w, T)) return !0;
		O = O.next;
	} while (O !== w);
	return !1;
}
function locallyInside(w, T) {
	return area(w.prev, w, w.next) < 0 ? area(w, T, w.next) >= 0 && area(w, w.prev, T) >= 0 : area(w, T, w.prev) < 0 || area(w, w.next, T) < 0;
}
function middleInside(w, T) {
	let O = w, j = !1, F = (w.x + T.x) / 2, U = (w.y + T.y) / 2;
	do
		O.y > U != O.next.y > U && O.next.y !== O.y && F < (O.next.x - O.x) * (U - O.y) / (O.next.y - O.y) + O.x && (j = !j), O = O.next;
	while (O !== w);
	return j;
}
function splitPolygon(w, T) {
	let O = createNode(w.i, w.x, w.y), j = createNode(T.i, T.x, T.y), F = w.next, U = T.prev;
	return w.next = T, T.prev = w, O.next = F, F.prev = O, j.next = O, O.prev = j, U.next = j, j.prev = U, j;
}
function insertNode(w, T, O, j) {
	let F = createNode(w, T, O);
	return j ? (F.next = j.next, F.prev = j, j.next.prev = F, j.next = F) : (F.prev = F, F.next = F), F;
}
function removeNode(w) {
	w.next.prev = w.prev, w.prev.next = w.next, w.prevZ && (w.prevZ.nextZ = w.nextZ), w.nextZ && (w.nextZ.prevZ = w.prevZ);
}
function createNode(w, T, O) {
	return {
		i: w,
		x: T,
		y: O,
		prev: null,
		next: null,
		z: 0,
		prevZ: null,
		nextZ: null,
		steiner: !1
	};
}
function signedArea(w, T, O, j) {
	let F = 0;
	for (let U = T, W = O - j; U < O; U += j) F += (w[W] - w[U]) * (w[U + 1] + w[W + 1]), W = U;
	return F;
}
var Earcut = class {
	static triangulate(w, T, O = 2) {
		return earcut(w, T, O);
	}
};
function makeRoomFloorMesh(w, T = {}) {
	let O = T.y ?? 0, j = [];
	for (let [T, O] of w) j.push(T, O);
	let F = Earcut.triangulate(j), U = new Float32Array(w.length * 3), W = 0;
	for (let [T, j] of w) U[W++] = T, U[W++] = O, U[W++] = j;
	let G = new BufferGeometry();
	G.setAttribute("position", new BufferAttribute(U, 3)), G.setIndex(F), G.computeVertexNormals();
	let K = new Mesh(G, T.material ?? new MeshStandardMaterial({
		roughness: 1,
		metalness: 0,
		side: 2
	}));
	return K.receiveShadow = !0, K;
}
function createFloorMaterial() {
	return new MeshStandardMaterial({
		roughness: 1,
		metalness: 0,
		side: 2
	});
}
function createRoomFloorGroup(w, T) {
	let O = new Group();
	for (let j of w) {
		let w = makeRoomFloorMesh(j.polygon, {
			y: 0,
			material: T
		});
		w.userData.roomId = j.id, w.userData.roomName = j.name, O.add(w);
	}
	return O;
}
function disposeMeshGeometries(w) {
	w && w.traverse((w) => {
		w instanceof Mesh && w.geometry.dispose();
	});
}
var WALL_HEIGHT = 2.6, WALL_THICKNESS = .08, WALL_BASE_OFFSET = .02, BOTTOM_ALPHA = .9, TOP_ALPHA = .2, WALL_GEOMETRY_EPSILON = 1e-4, EDGE_KEY_SCALE = 1e3, EDGE_KEY_DECIMALS = 3, roundKey = (w) => (Math.round(w * EDGE_KEY_SCALE) / EDGE_KEY_SCALE).toFixed(EDGE_KEY_DECIMALS);
function canonicalEdgeKey(w, T) {
	let O = `${roundKey(w[0])},${roundKey(w[1])}`, j = `${roundKey(T[0])},${roundKey(T[1])}`;
	return O < j ? `${O}|${j}` : `${j}|${O}`;
}
function clamp01(w) {
	return Math.min(1, Math.max(0, w));
}
function cross2D(w, T, O, j) {
	return w * j - T * O;
}
function segmentLengthSq(w) {
	let T = w.b[0] - w.a[0], O = w.b[1] - w.a[1];
	return T * T + O * O;
}
function isSegmentDegenerate(w) {
	return segmentLengthSq(w) <= WALL_GEOMETRY_EPSILON * WALL_GEOMETRY_EPSILON;
}
function isPointOnSegment$1(w, T, O) {
	let j = O[0] - T[0], F = O[1] - T[1], U = j * j + F * F;
	if (U <= WALL_GEOMETRY_EPSILON * WALL_GEOMETRY_EPSILON) return !1;
	let W = w[0] - T[0], G = w[1] - T[1];
	if (Math.abs(cross2D(j, F, W, G)) / Math.sqrt(U) > WALL_GEOMETRY_EPSILON) return !1;
	let K = W * j + G * F;
	return K >= -WALL_GEOMETRY_EPSILON && K <= U + WALL_GEOMETRY_EPSILON;
}
function segmentParameter(w, T, O) {
	let j = O[0] - T[0], F = O[1] - T[1];
	return Math.abs(j) >= Math.abs(F) ? Math.abs(j) <= WALL_GEOMETRY_EPSILON ? 0 : (w[0] - T[0]) / j : Math.abs(F) <= WALL_GEOMETRY_EPSILON ? 0 : (w[1] - T[1]) / F;
}
function areCollinearSegments(w, T) {
	let O = w.b[0] - w.a[0], j = w.b[1] - w.a[1], F = T.b[0] - T.a[0], U = T.b[1] - T.a[1], W = Math.hypot(O, j), G = Math.hypot(F, U);
	if (W <= WALL_GEOMETRY_EPSILON || G <= WALL_GEOMETRY_EPSILON || Math.abs(cross2D(O, j, F, U)) / (W * G) > WALL_GEOMETRY_EPSILON) return !1;
	let K = T.a[0] - w.a[0], q = T.a[1] - w.a[1];
	return Math.abs(cross2D(O, j, K, q)) / W <= WALL_GEOMETRY_EPSILON;
}
function interpolatePoint(w, T, O) {
	let j = clamp01(O);
	return [w[0] + (T[0] - w[0]) * j, w[1] + (T[1] - w[1]) * j];
}
function pushUniqueParameter(w, T) {
	let O = clamp01(T);
	for (let T of w) if (Math.abs(T - O) <= WALL_GEOMETRY_EPSILON) return;
	w.push(O);
}
function collectRoomEdgeSegments(w) {
	let T = [];
	for (let O of w) {
		let w = O.polygon;
		if (!(!Array.isArray(w) || w.length < 2)) for (let O = 0; O < w.length; O += 1) {
			let j = w[O], F = w[(O + 1) % w.length];
			if (!j || !F) continue;
			let U = {
				a: j,
				b: F
			};
			isSegmentDegenerate(U) || T.push(U);
		}
	}
	return T;
}
function resolveBoundaryEdgeSegments(w) {
	let T = collectRoomEdgeSegments(w);
	if (T.length === 0) return [];
	let O = /* @__PURE__ */ new Map();
	for (let w of T) {
		let j = [0, 1];
		for (let O of T) areCollinearSegments(w, O) && (isPointOnSegment$1(O.a, w.a, w.b) && pushUniqueParameter(j, segmentParameter(O.a, w.a, w.b)), isPointOnSegment$1(O.b, w.a, w.b) && pushUniqueParameter(j, segmentParameter(O.b, w.a, w.b)));
		j.sort((w, T) => w - T);
		for (let T = 0; T < j.length - 1; T += 1) {
			let F = j[T], U = j[T + 1];
			if (F === void 0 || U === void 0 || U - F <= WALL_GEOMETRY_EPSILON) continue;
			let W = {
				a: interpolatePoint(w.a, w.b, F),
				b: interpolatePoint(w.a, w.b, U)
			};
			if (isSegmentDegenerate(W)) continue;
			let G = canonicalEdgeKey(W.a, W.b), K = O.get(G);
			K ? K.count += 1 : O.set(G, {
				segment: W,
				count: 1
			});
		}
	}
	let j = [];
	for (let w of O.values()) w.count % 2 != 0 && j.push(w.segment);
	return j;
}
function createWallMesh(w, T, O, j, F) {
	let U = new Vector3(T[0] - w[0], 0, T[1] - w[1]), W = U.length();
	if (!Number.isFinite(W) || W <= .001) return null;
	let G = new BoxGeometry(Math.max(.01, W - j * 1.4), O, j), K = G.getAttribute("position"), q = new Float32Array(K.count);
	for (let w = 0; w < K.count; w += 1) {
		let T = (K.getY(w) + O / 2) / O;
		q[w] = BOTTOM_ALPHA + (TOP_ALPHA - BOTTOM_ALPHA) * T;
	}
	G.setAttribute("opacity", new BufferAttribute(q, 1));
	let J = new Mesh(G, F);
	return J.rotation.y = -Math.atan2(U.z, U.x), J.position.set((w[0] + T[0]) / 2, O / 2 + WALL_BASE_OFFSET, (w[1] + T[1]) / 2), J;
}
function createWallMaterial(w) {
	let T = new MeshStandardMaterial({
		color: 16777215,
		roughness: .35,
		metalness: 0,
		transparent: !0,
		depthWrite: !1,
		polygonOffset: !0,
		polygonOffsetFactor: 1,
		polygonOffsetUnits: 1,
		side: 2
	});
	return T.onBeforeCompile = (O) => {
		O.uniforms.uViewDir = w, O.vertexShader = O.vertexShader.replace("#include <common>", "#include <common>\nattribute float opacity;\nvarying float vOpacity;\nvarying vec3 vWorldPos;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvOpacity = opacity;\nvWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;"), O.fragmentShader = O.fragmentShader.replace("#include <common>", "#include <common>\nuniform vec3 uViewDir;\nvarying float vOpacity;\nvarying vec3 vWorldPos;").replace("#include <dithering_fragment>", "#include <dithering_fragment>\nfloat alignment = dot(normalize(vWorldPos - cameraPosition), normalize(uViewDir));\nfloat centerFade = smoothstep(0.35, 0.95, alignment);\nfloat finalAlpha = vOpacity * (1.0 - 0.9 * centerFade);\ngl_FragColor.a *= finalAlpha;"), T.userData.wallShader = O;
	}, T;
}
function syncWallMaterialViewDirection(w, T) {
	if (!w) return;
	let O = w.userData.wallShader?.uniforms?.uViewDir;
	O && O.value.copy(T);
}
function createWallGroup(w, T, O, j) {
	let F = O ?? createWallMaterial(T), U = typeof j?.height == "number" && Number.isFinite(j.height) ? Math.max(.2, j.height) : WALL_HEIGHT, W = new Group();
	for (let T of resolveBoundaryEdgeSegments(w)) {
		let w = createWallMesh(T.a, T.b, U, WALL_THICKNESS, F);
		w && W.add(w);
	}
	return {
		group: W,
		material: F
	};
}
var CLICK_MOVE_TOLERANCE_PX = 6, TOUCH_GESTURE_LOCK_THRESHOLD_PX = 8, HEATMAP_PLANE_Y = .03, HEATMAP_BOUNDS_PADDING = .2, HEATMAP_MIN_WIDTH = .6, HEATMAP_MIN_DEPTH = .6, HEATMAP_EPSILON = 1e-6, HEATMAP_EDGE_EPSILON = 1e-4, HEATMAP_SENSOR_DISTANCE_BIAS = .2, HEATMAP_MAX_NEAREST_SEARCH_RADIUS = 18, HEATMAP_NEIGHBORS = [
	[-1, 0],
	[1, 0],
	[0, -1],
	[0, 1],
	[-1, -1],
	[1, -1],
	[-1, 1],
	[1, 1]
], DEFAULT_HEATMAP_COLOR_STOPS = [
	{
		position: 0,
		r: 22,
		g: 82,
		b: 246
	},
	{
		position: .3,
		r: 22,
		g: 187,
		b: 255
	},
	{
		position: .55,
		r: 73,
		g: 219,
		b: 120
	},
	{
		position: .78,
		r: 255,
		g: 214,
		b: 70
	},
	{
		position: 1,
		r: 250,
		g: 74,
		b: 48
	}
], projectedWorldPoint = new Vector3(), cameraSpacePoint = new Vector3(), DEFAULT_CAMERA_POSITION$2 = {
	x: 3,
	y: 6,
	z: 10
}, DEFAULT_CAMERA_ROTATION$2 = {
	x: -38.66,
	y: 0
}, DEFAULT_CAMERA_MAX_ZOOM_OUT$1 = 60, DEFAULT_CAMERA_FALLBACK_ORBIT_DISTANCE = 9.6, CAMERA_TARGET_PLANE_Y = 0, CAMERA_TARGET_MIN_DISTANCE = .05, CAMERA_TARGET_MAX_DISTANCE = 500, CAMERA_TARGET_INTERSECTION_EPSILON = 1e-4, CAMERA_MIN_PITCH_DEG = -89, CAMERA_MAX_PITCH_DEG = 89, CAMERA_CONTROLS_MIN_POLAR_ANGLE = 1 * Math.PI / 180, CAMERA_CONTROLS_MAX_POLAR_ANGLE = 89 * Math.PI / 180, CAMERA_MAX_DISTANCE_PADDING = .001, CAMERA_FAR_PLANE_MULTIPLIER = 4, DEFAULT_WALL_COLOR_HEX = 16777215, DEFAULT_WALL_OPACITY$1 = 1, DEFAULT_WALL_HEIGHT$1 = 2.6, DEFAULT_GRID_ENABLED$1 = !0, DEFAULT_GRID_PRIMARY_COLOR_HEX = 8947848, DEFAULT_GRID_SECONDARY_COLOR_HEX = 4473924, DEFAULT_LIGHT_SIMULATION_ENABLED$1 = !0, DEFAULT_LIGHT_SIMULATION_INTENSITY$1 = 2.4, DEFAULT_LIGHT_SIMULATION_RANGE$1 = 4.5, DEFAULT_LIGHT_SIMULATION_DECAY$1 = 1.2, DEFAULT_LIGHT_SIMULATION_COLOR_HEX = 16766566;
function clamp$5(w, T, O) {
	return Math.min(O, Math.max(T, w));
}
function normalizeRendererConfig(w) {
	let T = Number(w?.wallOpacity), O = Number(w?.wallHeight), j = Number(w?.lightSimulationIntensity), F = Number(w?.lightSimulationRange), U = Number(w?.lightSimulationDecay);
	return {
		wallColor: typeof w?.wallColor == "string" && w.wallColor.trim() ? w.wallColor.trim() : null,
		wallOpacity: clamp$5(Number.isFinite(T) ? T : DEFAULT_WALL_OPACITY$1, 0, 1),
		wallHeight: clamp$5(Number.isFinite(O) ? O : DEFAULT_WALL_HEIGHT$1, .2, 10),
		gridEnabled: w?.gridEnabled === void 0 ? DEFAULT_GRID_ENABLED$1 : w.gridEnabled !== !1,
		gridColor: typeof w?.gridColor == "string" && w.gridColor.trim() ? w.gridColor.trim() : null,
		backgroundColor: typeof w?.backgroundColor == "string" && w.backgroundColor.trim() ? w.backgroundColor.trim() : null,
		lightSimulationEnabled: w?.lightSimulationEnabled === void 0 ? DEFAULT_LIGHT_SIMULATION_ENABLED$1 : w.lightSimulationEnabled !== !1,
		lightSimulationIntensity: clamp$5(Number.isFinite(j) ? j : DEFAULT_LIGHT_SIMULATION_INTENSITY$1, 0, 8),
		lightSimulationRange: clamp$5(Number.isFinite(F) ? F : DEFAULT_LIGHT_SIMULATION_RANGE$1, .5, 20),
		lightSimulationDecay: clamp$5(Number.isFinite(U) ? U : DEFAULT_LIGHT_SIMULATION_DECAY$1, 0, 4)
	};
}
function normalizeSimulatedLights(w) {
	if (!Array.isArray(w)) return [];
	let T = [];
	for (let O of w) {
		let w = Number(O?.x), j = Number(O?.y), F = Number(O?.z), U = Number(O?.intensity);
		if (!Number.isFinite(w) || !Number.isFinite(j) || !Number.isFinite(F) || !Number.isFinite(U)) continue;
		let W = clamp$5(U, 0, 1);
		W <= 1e-4 || T.push({
			id: String(O?.id ?? `light-${T.length + 1}`),
			x: w,
			y: j,
			z: F,
			color: typeof O?.color == "string" && O.color.trim() ? O.color.trim() : null,
			intensity: W
		});
	}
	return T;
}
function computeHeatmapBounds(w) {
	let T = Infinity, O = -Infinity, j = Infinity, F = -Infinity;
	for (let U of w) for (let [w, W] of U.polygon) w < T && (T = w), w > O && (O = w), W < j && (j = W), W > F && (F = W);
	if (!Number.isFinite(T) || !Number.isFinite(O) || !Number.isFinite(j) || !Number.isFinite(F)) return null;
	let U = (T + O) * .5, W = (j + F) * .5, G = Math.max(HEATMAP_MIN_WIDTH, O - T + HEATMAP_BOUNDS_PADDING * 2), K = Math.max(HEATMAP_MIN_DEPTH, F - j + HEATMAP_BOUNDS_PADDING * 2);
	return {
		minX: U - G * .5,
		maxX: U + G * .5,
		minZ: W - K * .5,
		maxZ: W + K * .5
	};
}
function resolveHeatmapColorStops(w) {
	if (!Array.isArray(w) || w.length < 2) return DEFAULT_HEATMAP_COLOR_STOPS;
	let T = w.map((w) => {
		let T = Number(w.position), O = Number(w.r), j = Number(w.g), F = Number(w.b);
		return !Number.isFinite(T) || !Number.isFinite(O) || !Number.isFinite(j) || !Number.isFinite(F) ? null : {
			position: clamp$5(T, 0, 1),
			r: Math.round(clamp$5(O, 0, 255)),
			g: Math.round(clamp$5(j, 0, 255)),
			b: Math.round(clamp$5(F, 0, 255))
		};
	}).filter((w) => w !== null).sort((w, T) => w.position - T.position);
	if (T.length < 2) return DEFAULT_HEATMAP_COLOR_STOPS;
	let O = [];
	for (let w of T) {
		let T = O[O.length - 1];
		if (T && Math.abs(T.position - w.position) <= HEATMAP_EPSILON) {
			O[O.length - 1] = w;
			continue;
		}
		O.push(w);
	}
	if (O.length < 2) return DEFAULT_HEATMAP_COLOR_STOPS;
	let j = O[0], F = O[O.length - 1];
	if (!j || !F) return DEFAULT_HEATMAP_COLOR_STOPS;
	let U = [...O];
	return j.position > 0 && U.unshift({
		...j,
		position: 0
	}), F.position < 1 && U.push({
		...F,
		position: 1
	}), U;
}
function sampleHeatmapColor(w, T) {
	let O = clamp$5(w, 0, 1);
	for (let w = 1; w < T.length; w += 1) {
		let j = T[w], F = T[w - 1];
		if (!j || !F || O > j.position) continue;
		let U = Math.max(HEATMAP_EPSILON, j.position - F.position), W = (O - F.position) / U;
		return [
			Math.round(F.r + (j.r - F.r) * W),
			Math.round(F.g + (j.g - F.g) * W),
			Math.round(F.b + (j.b - F.b) * W)
		];
	}
	let j = T[T.length - 1];
	return j ? [
		j.r,
		j.g,
		j.b
	] : [
		255,
		64,
		64
	];
}
function isPointOnSegment(w, T, O, j, F, U) {
	let W = F - O, G = U - j, K = w - O, q = T - j;
	if (Math.abs(W * q - G * K) > HEATMAP_EDGE_EPSILON) return !1;
	let J = K * W + q * G;
	return J < -HEATMAP_EDGE_EPSILON ? !1 : J <= W * W + G * G + HEATMAP_EDGE_EPSILON;
}
function isPointInsidePolygon(w, T, O) {
	if (O.length < 3) return !1;
	let j = !1;
	for (let F = 0, U = O.length - 1; F < O.length; U = F, F += 1) {
		let W = O[F], G = O[U];
		if (!W || !G) continue;
		let [K, q] = W, [J, Y] = G;
		if (isPointOnSegment(w, T, K, q, J, Y)) return !0;
		let X = Y - q;
		Math.abs(X) <= HEATMAP_EPSILON || q > T != Y > T && w < (J - K) * (T - q) / X + K && (j = !j);
	}
	return j;
}
function ensureHeatmapMask(w, T) {
	let O = w.heatmapBounds;
	if (!O || w.heatmapRooms.length === 0) return w.heatmapMask = null, w.heatmapMaskResolution = 0, w.heatmapMaskRoomsVersion = 0, !1;
	if (w.heatmapMask && w.heatmapMaskResolution === T && w.heatmapMaskRoomsVersion === w.heatmapRoomsVersion) return !0;
	let j = Math.max(16, Math.round(T)), F = j * j, U = new Uint8Array(F), W = Math.max(HEATMAP_EPSILON, O.maxX - O.minX), G = Math.max(HEATMAP_EPSILON, O.maxZ - O.minZ);
	for (let T = 0; T < j; T += 1) {
		let F = O.minZ + (T + .5) / j * G, K = T * j;
		for (let T = 0; T < j; T += 1) {
			let G = O.minX + (T + .5) / j * W, q = !1;
			for (let T of w.heatmapRooms) if (T && isPointInsidePolygon(G, F, T.polygon)) {
				q = !0;
				break;
			}
			if (!q) continue;
			let J = K + T;
			U[J] = 1;
		}
	}
	return w.heatmapMask = U, w.heatmapMaskResolution = j, w.heatmapMaskRoomsVersion = w.heatmapRoomsVersion, !0;
}
function findNearestMaskedCell(w, T, O, j, F, U) {
	let W = clamp$5(Math.round(j), 0, T - 1), G = clamp$5(Math.round(F), 0, O - 1), K = G * T + W;
	if ((w[K] ?? 0) > 0) return K;
	let q = Math.max(1, Math.round(U));
	for (let j = 1; j <= q; j += 1) {
		let F = Math.max(0, W - j), U = Math.min(T - 1, W + j), K = Math.max(0, G - j), q = Math.min(O - 1, G + j);
		for (let O = F; O <= U; O += 1) {
			let j = K * T + O;
			if ((w[j] ?? 0) > 0) return j;
			let F = q * T + O;
			if (q !== K && (w[F] ?? 0) > 0) return F;
		}
		for (let O = K + 1; O < q; O += 1) {
			let j = O * T + F;
			if ((w[j] ?? 0) > 0) return j;
			let W = O * T + U;
			if (U !== F && (w[W] ?? 0) > 0) return W;
		}
	}
	return -1;
}
function pushDistanceNode(w, T) {
	w.push(T);
	let O = w.length - 1;
	for (; O > 0;) {
		let T = Math.floor((O - 1) / 2), j = w[T], F = w[O];
		if (!j || !F || j.distance <= F.distance) break;
		w[T] = F, w[O] = j, O = T;
	}
}
function popDistanceNode(w) {
	if (w.length === 0) return;
	let T = w[0], O = w.pop();
	if (!O || w.length === 0) return T;
	w[0] = O;
	let j = 0;
	for (;;) {
		let T = j * 2 + 1, O = T + 1, F = j, U = w[j], W = w[T], G = w[O];
		W && U && W.distance < U.distance && (F = T);
		let K = w[F];
		if (G && K && G.distance < K.distance && (F = O), F === j) break;
		let q = w[F];
		if (!U || !q) break;
		w[j] = q, w[F] = U, j = F;
	}
	return T;
}
function computeDistanceMap(w, T, O, j, F, U) {
	let W = T * O, G = new Float32Array(W);
	if (G.fill(Infinity), j < 0 || j >= W || (w[j] ?? 0) === 0) return G;
	let K = Math.hypot(F, U);
	G[j] = 0;
	let q = [{
		index: j,
		distance: 0
	}];
	for (; q.length > 0;) {
		let j = popDistanceNode(q);
		if (!j) break;
		let W = G[j.index] ?? Infinity;
		if (j.distance > W + HEATMAP_EPSILON) continue;
		let J = j.index % T, Y = (j.index - J) / T;
		for (let [W, X] of HEATMAP_NEIGHBORS) {
			let Q = J + W, xS = Y + X;
			if (Q < 0 || Q >= T || xS < 0 || xS >= O) continue;
			let SS = xS * T + Q;
			if ((w[SS] ?? 0) === 0) continue;
			let CS = W === 0 || X === 0 ? W === 0 ? U : F : K, wS = j.distance + CS;
			wS >= (G[SS] ?? Infinity) - HEATMAP_EPSILON || (G[SS] = wS, pushDistanceNode(q, {
				index: SS,
				distance: wS
			}));
		}
	}
	return G;
}
function createCamera(w) {
	let T = new PerspectiveCamera(50, 1, .1, 100), O = w?.position ?? DEFAULT_CAMERA_POSITION$2, j = resolveCameraOrientation(O, w?.rotation ?? DEFAULT_CAMERA_ROTATION$2), F = resolveCameraMaxDistance(w?.maxZoomOut, j.orbitDistance);
	return T.position.set(O.x, O.y, O.z), T.up.set(0, 1, 0), T.lookAt(j.target.x, j.target.y, j.target.z), T.far = resolveCameraFarPlane(F), T.updateProjectionMatrix(), T;
}
function createRenderer(w) {
	let T = new WebGLRenderer({
		antialias: !0,
		alpha: !0
	});
	return T.setPixelRatio(Math.min(window.devicePixelRatio, 2)), T.domElement.style.width = "100%", T.domElement.style.height = "100%", T.domElement.style.display = "block", T.domElement.style.touchAction = "none", w.appendChild(T.domElement), T;
}
function createControls(w, T, O) {
	let j = new OrbitControls(w, T.domElement), F = resolveCameraOrientation(O?.position ?? DEFAULT_CAMERA_POSITION$2, O?.rotation ?? DEFAULT_CAMERA_ROTATION$2);
	return j.target.set(F.target.x, F.target.y, F.target.z), j.enableDamping = !0, j.dampingFactor = .08, j.enableZoom = !0, j.minPolarAngle = CAMERA_CONTROLS_MIN_POLAR_ANGLE, j.maxPolarAngle = CAMERA_CONTROLS_MAX_POLAR_ANGLE, j.maxDistance = resolveCameraMaxDistance(O?.maxZoomOut, F.orbitDistance), j.mouseButtons = {
		LEFT: MOUSE.ROTATE,
		MIDDLE: MOUSE.ROTATE,
		RIGHT: MOUSE.PAN
	}, j.touches = {
		ONE: TOUCH.PAN,
		TWO: TOUCH.DOLLY_ROTATE
	}, j.update(), j;
}
function applyCameraConfig(w, T) {
	let O = w.camera, j = w.controls;
	if (!O || !j) return;
	let F = resolveCameraOrientation(T.position, T.rotation), U = resolveCameraMaxDistance(T.maxZoomOut, F.orbitDistance);
	O.position.set(T.position.x, T.position.y, T.position.z), O.up.set(0, 1, 0), j.target.set(F.target.x, F.target.y, F.target.z), O.lookAt(F.target.x, F.target.y, F.target.z), O.far = resolveCameraFarPlane(U), O.updateProjectionMatrix(), j.maxDistance = U, j.update();
}
function toRadians(w) {
	return w * Math.PI / 180;
}
function resolveCameraOrientation(w, T) {
	let O = normalizeCameraRotation$1(T), j = new Euler(toRadians(O.x), toRadians(O.y), 0, "XYZ"), F = new Vector3(0, 0, -1).applyEuler(j).normalize(), U = DEFAULT_CAMERA_FALLBACK_ORBIT_DISTANCE;
	if (Math.abs(F.y) > CAMERA_TARGET_INTERSECTION_EPSILON) {
		let T = (CAMERA_TARGET_PLANE_Y - w.y) / F.y;
		T >= CAMERA_TARGET_MIN_DISTANCE && T <= CAMERA_TARGET_MAX_DISTANCE && (U = T);
	}
	return {
		target: {
			x: w.x + F.x * U,
			y: w.y + F.y * U,
			z: w.z + F.z * U
		},
		orbitDistance: U
	};
}
function normalizeCameraRotation$1(w) {
	let T = clamp$5(w.x, CAMERA_MIN_PITCH_DEG, CAMERA_MAX_PITCH_DEG), O = (w.y % 360 + 360) % 360;
	return {
		x: T,
		y: O > 180 ? O - 360 : O
	};
}
function resolveCameraMaxDistance(w, T) {
	let O = Number.isFinite(w) && typeof w == "number" ? Math.max(2, w) : DEFAULT_CAMERA_MAX_ZOOM_OUT$1;
	return Math.max(O, T + CAMERA_MAX_DISTANCE_PADDING);
}
function resolveCameraFarPlane(w) {
	return Math.max(100, w * CAMERA_FAR_PLANE_MULTIPLIER);
}
function resolveColor(w, T) {
	if (!w) return new Color(T);
	try {
		return new Color(w);
	} catch {
		return new Color(T);
	}
}
function applyWallMaterialConfig(w, T) {
	if (!w) return;
	let O = resolveColor(T.wallColor, DEFAULT_WALL_COLOR_HEX);
	w.color.copy(O), w.opacity = clamp$5(T.wallOpacity, 0, 1), w.needsUpdate = !0;
}
function createGridHelper(w) {
	let T = resolveColor(w.gridColor, DEFAULT_GRID_PRIMARY_COLOR_HEX), O = T.clone().multiplyScalar(.45);
	w.gridColor === null && O.setHex(DEFAULT_GRID_SECONDARY_COLOR_HEX);
	let j = new GridHelper(100, 100, T, O);
	return j.visible = w.gridEnabled, j;
}
function disposeGridHelper(w) {
	if (w) if (w.geometry.dispose(), Array.isArray(w.material)) for (let T of w.material) T.dispose();
	else w.material.dispose();
}
function replaceGridHelper(w) {
	if (!w.scene) return;
	w.gridHelper &&= (w.scene.remove(w.gridHelper), disposeGridHelper(w.gridHelper), null);
	let T = createGridHelper(w.rendererConfig);
	w.gridHelper = T, w.scene.add(T);
}
function replaceSimulatedLightGroup(w) {
	if (w.scene && w.simulatedLightGroup && w.scene.remove(w.simulatedLightGroup), w.simulatedLightGroup = null, !w.scene || !w.rendererConfig.lightSimulationEnabled || w.rendererConfig.lightSimulationIntensity <= 0 || w.rendererConfig.lightSimulationRange <= 0 || w.simulatedLights.length === 0) return;
	let T = new Group(), O = w.rendererConfig.lightSimulationIntensity, j = w.rendererConfig.lightSimulationRange, F = w.rendererConfig.lightSimulationDecay;
	for (let U of w.simulatedLights) {
		let w = new PointLight(resolveColor(U.color, DEFAULT_LIGHT_SIMULATION_COLOR_HEX), U.intensity * O, j, F);
		w.position.set(U.x, U.y, U.z), T.add(w);
	}
	w.simulatedLightGroup = T, w.scene.add(T);
}
function applySimulatedLights(w, T) {
	w.simulatedLights = normalizeSimulatedLights(T), replaceSimulatedLightGroup(w);
}
function applySceneBackground(w, T) {
	if (w) {
		if (!T) {
			w.background = null;
			return;
		}
		try {
			w.background = new Color(T);
		} catch {
			w.background = null;
		}
	}
}
function applyRendererConfig(w, T) {
	let O = w.rendererConfig, j = normalizeRendererConfig(T), F = Math.abs(O.wallHeight - j.wallHeight) > 1e-4, U = O.gridColor !== j.gridColor;
	w.rendererConfig = j, applySceneBackground(w.scene, j.backgroundColor), w.scene && (U || !w.gridHelper) ? replaceGridHelper(w) : w.gridHelper && (w.gridHelper.visible = j.gridEnabled), applyWallMaterialConfig(w.wallMaterial, j), replaceSimulatedLightGroup(w), F && w.heatmapRooms.length > 0 && replaceWallGroup(w, w.heatmapRooms);
}
function addSceneDecorations(w) {
	let T = w.scene;
	if (!T) return;
	replaceGridHelper(w), applySceneBackground(T, w.rendererConfig.backgroundColor);
	let O = new DirectionalLight(16777215, 1.05);
	O.position.set(4, 6, 5);
	let j = new DirectionalLight(8959231, .5);
	j.position.set(-3, -2, -4);
	let F = new AmbientLight(16777215, .25);
	T.add(O, j, F);
}
function resizeRenderer(w, T, O) {
	let j = O.getBoundingClientRect(), F = Math.max(1, Math.round(j.width) || O.clientWidth || 300), U = Math.round(F * .625), W = Math.max(1, Math.round(j.height)) || Math.max(1, O.clientHeight) || Math.max(1, U);
	w.setSize(F, W, !1), T.aspect = F / W, T.updateProjectionMatrix();
}
function replaceFloorGroup(w, T) {
	if (!w.scene) return;
	w.floorGroup && (w.scene.remove(w.floorGroup), disposeMeshGeometries(w.floorGroup));
	let O = w.floorMaterial ?? createFloorMaterial();
	w.floorMaterial = O, w.floorGroup = createRoomFloorGroup(T, O), w.scene.add(w.floorGroup);
}
function replaceWallGroup(w, T) {
	if (!w.scene) return;
	w.wallGroup && (w.scene.remove(w.wallGroup), disposeMeshGeometries(w.wallGroup));
	let O = createWallGroup(T, w.viewDirUniform, w.wallMaterial ?? void 0, { height: w.rendererConfig.wallHeight });
	w.wallGroup = O.group, w.wallMaterial = O.material, applyWallMaterialConfig(w.wallMaterial, w.rendererConfig), w.scene.add(w.wallGroup);
}
function disposeHeatmapMesh(w) {
	w.heatmapMesh && w.scene && w.scene.remove(w.heatmapMesh), w.heatmapMesh && w.heatmapMesh.geometry.dispose(), w.heatmapMesh = null;
}
function disposeHeatmapTexture(w) {
	w.heatmapTexture?.dispose(), w.heatmapTexture = null, w.heatmapCanvas = null, w.heatmapContext = null, w.heatmapMaterial && (w.heatmapMaterial.map = null);
}
function ensureHeatmapMaterial(w) {
	return w.heatmapMaterial ||= new MeshBasicMaterial({
		transparent: !0,
		opacity: 1,
		depthWrite: !1
	}), w.heatmapMaterial;
}
function ensureHeatmapCanvas(w, T) {
	let O = Math.max(16, Math.round(T));
	if (w.heatmapCanvas && w.heatmapContext && w.heatmapTexture && w.heatmapCanvas.width === O && w.heatmapCanvas.height === O) return !0;
	disposeHeatmapTexture(w);
	let j = document.createElement("canvas");
	j.width = O, j.height = O;
	let F = j.getContext("2d", { willReadFrequently: !0 });
	if (!F) return !1;
	let U = new CanvasTexture(j);
	U.minFilter = LinearFilter, U.magFilter = LinearFilter, U.wrapS = ClampToEdgeWrapping, U.wrapT = ClampToEdgeWrapping, w.heatmapCanvas = j, w.heatmapContext = F, w.heatmapTexture = U;
	let W = ensureHeatmapMaterial(w);
	return W.map = U, W.needsUpdate = !0, !0;
}
function updateHeatmapSurface(w, T) {
	if (w.heatmapRooms = T.map((w) => ({
		id: w.id,
		name: w.name,
		polygon: w.polygon.map(([w, T]) => [w, T])
	})), w.heatmapRoomsVersion += 1, w.heatmapMask = null, w.heatmapMaskResolution = 0, w.heatmapMaskRoomsVersion = 0, w.heatmapBounds = computeHeatmapBounds(T), !w.scene || !w.heatmapBounds) {
		disposeHeatmapMesh(w);
		return;
	}
	let O = w.heatmapBounds.maxX - w.heatmapBounds.minX, j = w.heatmapBounds.maxZ - w.heatmapBounds.minZ, F = (w.heatmapBounds.minX + w.heatmapBounds.maxX) * .5, U = (w.heatmapBounds.minZ + w.heatmapBounds.maxZ) * .5, W = ensureHeatmapMaterial(w), G = new PlaneGeometry(O, j, 1, 1);
	w.heatmapMesh ? (w.heatmapMesh.geometry.dispose(), w.heatmapMesh.geometry = G) : (w.heatmapMesh = new Mesh(G, W), w.heatmapMesh.rotation.x = -Math.PI / 2, w.heatmapMesh.renderOrder = 2, w.scene.add(w.heatmapMesh)), w.heatmapMesh.position.set(F, HEATMAP_PLANE_Y, U);
}
function drawHeatmapTexture(w, T) {
	if (!w.heatmapBounds || !w.heatmapCanvas || !w.heatmapContext) return;
	let O = w.heatmapBounds, { heatmapCanvas: j, heatmapContext: F } = w, U = j.width, W = j.height;
	if (U < 2 || W < 2 || !ensureHeatmapMask(w, U) || !w.heatmapMask) return;
	let G = w.heatmapMask, K = O.maxX - O.minX, q = O.maxZ - O.minZ, J = K / U, Y = q / W, X = Math.min(T.minValue, T.maxValue), Q = Math.max(T.minValue, T.maxValue), xS = Math.max(HEATMAP_EPSILON, Q - X), SS = resolveHeatmapColorStops(T.colorStops), CS = clamp$5(T.opacity, 0, 1), wS = clamp$5(T.blur, 0, 1), TS = 1.2 + (1 - wS) * 1.3, ES = .65 + wS * 1.5, DS = .6 + wS * 1.6, OS = T.samples.map((w) => {
		let T = (w.x - O.minX) / Math.max(K, HEATMAP_EPSILON) * U - .5, j = (w.z - O.minZ) / Math.max(q, HEATMAP_EPSILON) * W - .5, F = findNearestMaskedCell(G, U, W, T, j, HEATMAP_MAX_NEAREST_SEARCH_RADIUS);
		if (F < 0 && (F = findNearestMaskedCell(G, U, W, T, j, Math.max(U, W))), F < 0) return null;
		let X = Math.max(Math.max(J, Y) * .5, w.radius), Q = Math.max(.05, w.weight);
		return {
			value: w.value,
			weight: Q,
			influenceScale: Math.max(HEATMAP_EPSILON, X * ES),
			distanceMap: computeDistanceMap(G, U, W, F, J, Y)
		};
	}).filter((w) => w !== null);
	if (OS.length === 0) {
		F.clearRect(0, 0, U, W);
		return;
	}
	let kS = F.createImageData(U, W), AS = kS.data;
	for (let w = 0; w < G.length; w += 1) {
		let T = w * 4;
		if ((G[w] ?? 0) === 0) {
			AS[T] = 0, AS[T + 1] = 0, AS[T + 2] = 0, AS[T + 3] = 0;
			continue;
		}
		let O = 0, j = 0, F = 0;
		for (let T of OS) {
			let U = T.distanceMap[w] ?? Infinity;
			if (!Number.isFinite(U)) continue;
			let W = U / T.influenceScale, G = T.weight / (W + HEATMAP_SENSOR_DISTANCE_BIAS) ** +TS;
			!Number.isFinite(G) || G <= HEATMAP_EPSILON || (O += G * T.value, j += G, G > F && (F = G));
		}
		if (j <= HEATMAP_EPSILON) {
			AS[T] = 0, AS[T + 1] = 0, AS[T + 2] = 0, AS[T + 3] = 0;
			continue;
		}
		let [U, W, K] = sampleHeatmapColor(clamp$5((O / j - X) / xS, 0, 1), SS), q = clamp$5(1 - Math.exp(-F * DS), 0, 1), J = Math.round(clamp$5(CS * (.45 + q * .55), 0, 1) * 255);
		AS[T] = U, AS[T + 1] = W, AS[T + 2] = K, AS[T + 3] = J;
	}
	F.putImageData(kS, 0, 0);
}
function renderHeatmap(w) {
	if (!w.heatmapMesh || !w.heatmapBounds) return;
	let T = w.heatmapData;
	if (!T || !T.visible || T.samples.length === 0) {
		w.heatmapMesh.visible = !1;
		return;
	}
	if (!ensureHeatmapCanvas(w, T.resolution)) {
		w.heatmapMesh.visible = !1;
		return;
	}
	drawHeatmapTexture(w, T), w.heatmapTexture && (w.heatmapTexture.needsUpdate = !0), w.heatmapMesh.visible = !0;
}
function replaceRooms(w, T) {
	replaceFloorGroup(w, T), replaceWallGroup(w, T), updateHeatmapSurface(w, T), renderHeatmap(w);
}
function pickRoomAtPointer(w, T, O, j, F) {
	if (!w.renderer || !w.camera || !w.floorGroup) return null;
	let U = w.renderer.domElement.getBoundingClientRect(), W = j - U.left, G = F - U.top;
	if (W < 0 || G < 0 || W > U.width || G > U.height) return null;
	O.x = W / U.width * 2 - 1, O.y = -(G / U.height * 2 - 1), T.setFromCamera(O, w.camera);
	let K = [];
	w.floorGroup.traverse((w) => {
		w instanceof Mesh && K.push(w);
	});
	let q = T.intersectObjects(K, !0)[0];
	if (!q) return null;
	let J = q.object;
	return {
		roomId: String(J.userData.roomId ?? ""),
		roomName: String(J.userData.roomName ?? ""),
		x: W,
		y: G,
		worldX: q.point.x,
		worldY: q.point.y,
		worldZ: q.point.z
	};
}
function readFirstTwoTouchPoints(w) {
	let T = w.values(), O = T.next().value, j = T.next().value;
	return !O || !j ? null : [O, j];
}
function installPointerHandlers(w, T) {
	if (!w.renderer) return null;
	let O = new Raycaster(), j = new Vector2(), F = null, U = /* @__PURE__ */ new Map(), W = !1, G = !1, K = null, q = 0, J = 0, Y = 0, X = w.controls?.enableRotate ?? !0, Q = w.controls?.enableZoom ?? !0, xS = () => {
		let T = w.controls;
		if (T) {
			if (!W) {
				T.enableRotate = X, T.enableZoom = Q;
				return;
			}
			if (K === "zoom") {
				T.enableRotate = !1, T.enableZoom = Q;
				return;
			}
			if (K === "rotate") {
				T.enableRotate = X, T.enableZoom = !1;
				return;
			}
			T.enableRotate = !1, T.enableZoom = !1;
		}
	}, SS = () => {
		W = !1, K = null, q = 0, J = 0, Y = 0, U.size === 0 && (G = !1), xS();
	}, CS = (w) => {
		if (w.pointerType === "touch" && (U.set(w.pointerId, {
			x: w.clientX,
			y: w.clientY
		}), U.size > 1)) {
			G = !0, F = null, K = null;
			let w = readFirstTwoTouchPoints(U);
			if (w) {
				let [T, O] = w, j = O.x - T.x, F = O.y - T.y;
				q = Math.hypot(j, F), J = (T.x + O.x) / 2, Y = (T.y + O.y) / 2, W = !0, xS();
			}
		}
		w.isPrimary && (F = {
			pointerId: w.pointerId,
			clientX: w.clientX,
			clientY: w.clientY,
			button: w.button,
			isPrimary: w.isPrimary,
			pointerType: w.pointerType
		});
	}, wS = (w) => {
		if (w.pointerType !== "touch" || !U.has(w.pointerId) || (U.set(w.pointerId, {
			x: w.clientX,
			y: w.clientY
		}), !W) || K) return;
		let T = readFirstTwoTouchPoints(U);
		if (!T) return;
		let [O, j] = T, F = j.x - O.x, G = j.y - O.y, X = Math.hypot(F, G), Q = (O.x + j.x) / 2, SS = (O.y + j.y) / 2, CS = Math.abs(X - q), wS = Math.hypot(Q - J, SS - Y);
		CS < TOUCH_GESTURE_LOCK_THRESHOLD_PX && wS < TOUCH_GESTURE_LOCK_THRESHOLD_PX || (K = CS >= wS ? "zoom" : "rotate", xS());
	}, TS = (W) => {
		if (W.pointerType === "touch" && (U.delete(W.pointerId), U.size < 2 && SS()), G) {
			F = null;
			return;
		}
		if (!F) return;
		let K = F;
		if (F = null, !W.isPrimary || !K.isPrimary || W.pointerId !== K.pointerId || K.pointerType === "mouse" && (K.button !== 0 || W.button !== 0) || K.pointerType === "touch" && U.size > 0) return;
		let q = W.clientX - K.clientX, J = W.clientY - K.clientY;
		if (q * q + J * J > CLICK_MOVE_TOLERANCE_PX * CLICK_MOVE_TOLERANCE_PX) return;
		let Y = pickRoomAtPointer(w, O, j, W.clientX, W.clientY);
		Y && T?.(Y);
	}, ES = (w) => {
		w.pointerType === "touch" && (U.delete(w.pointerId), U.size < 2 && SS()), F = null;
	}, DS = () => {
		F = null, U.clear(), SS();
	}, OS = (w) => {
		w.touches.length > 1 && w.preventDefault();
	}, kS = (w) => {
		w.preventDefault();
	}, AS = w.renderer.domElement;
	return AS.addEventListener("pointerdown", CS), AS.addEventListener("pointermove", wS), AS.addEventListener("pointerup", TS), AS.addEventListener("pointercancel", ES), AS.addEventListener("pointerleave", DS), AS.addEventListener("touchmove", OS, { passive: !1 }), AS.addEventListener("gesturestart", kS, { passive: !1 }), AS.addEventListener("gesturechange", kS, { passive: !1 }), AS.addEventListener("gestureend", kS, { passive: !1 }), () => {
		AS.removeEventListener("pointerdown", CS), AS.removeEventListener("pointermove", wS), AS.removeEventListener("pointerup", TS), AS.removeEventListener("pointercancel", ES), AS.removeEventListener("pointerleave", DS), AS.removeEventListener("touchmove", OS), AS.removeEventListener("gesturestart", kS), AS.removeEventListener("gesturechange", kS), AS.removeEventListener("gestureend", kS);
	};
}
function stopAnimation(w) {
	w.frameId !== null && (window.cancelAnimationFrame(w.frameId), w.frameId = null);
}
function renderFrame(w) {
	if (!(!w.renderer || !w.scene || !w.camera)) {
		w.controls?.update(), w.wallMaterial && (w.viewDirUniform.value.set(0, 0, -1).applyQuaternion(w.camera.quaternion).normalize(), syncWallMaterialViewDirection(w.wallMaterial, w.viewDirUniform.value));
		for (let T of w.frameListeners) T();
		w.renderer.render(w.scene, w.camera), w.frameId = window.requestAnimationFrame(() => renderFrame(w));
	}
}
function cleanupState(w) {
	stopAnimation(w), w.resizeObserver?.disconnect(), w.resizeObserver = null, w.pointerCleanup?.(), w.pointerCleanup = null, w.frameListeners.clear(), w.controls?.dispose(), w.controls = null, w.scene && w.gridHelper && w.scene.remove(w.gridHelper), disposeGridHelper(w.gridHelper), w.gridHelper = null, w.scene && w.simulatedLightGroup && w.scene.remove(w.simulatedLightGroup), w.simulatedLightGroup = null, w.simulatedLights = [], w.floorGroup &&= (disposeMeshGeometries(w.floorGroup), null), w.floorMaterial?.dispose(), w.floorMaterial = null, w.wallGroup &&= (disposeMeshGeometries(w.wallGroup), null), w.wallMaterial?.dispose(), w.wallMaterial = null, disposeHeatmapMesh(w), disposeHeatmapTexture(w), w.heatmapMaterial?.dispose(), w.heatmapMaterial = null, w.heatmapBounds = null, w.heatmapMask = null, w.heatmapMaskResolution = 0, w.heatmapMaskRoomsVersion = 0, w.heatmapRooms = [], w.heatmapRoomsVersion = 0, w.heatmapData = null, w.renderer && (w.renderer.dispose(), w.renderer.domElement.parentNode && w.renderer.domElement.parentNode.removeChild(w.renderer.domElement)), w.renderer = null, w.camera = null, w.scene = null, w.mounted = !1;
}
function projectWorldPoint(w, T, O, j) {
	if (!w.renderer || !w.camera) return null;
	let F = w.renderer.domElement.getBoundingClientRect();
	return F.width <= 0 || F.height <= 0 ? null : (w.camera.updateMatrixWorld(), projectedWorldPoint.set(T, O, j), cameraSpacePoint.copy(projectedWorldPoint).applyMatrix4(w.camera.matrixWorldInverse), projectedWorldPoint.project(w.camera), {
		x: (projectedWorldPoint.x + 1) / 2 * F.width,
		y: (-projectedWorldPoint.y + 1) / 2 * F.height,
		visible: cameraSpacePoint.z < 0 && projectedWorldPoint.x >= -1 && projectedWorldPoint.x <= 1 && projectedWorldPoint.y >= -1 && projectedWorldPoint.y <= 1
	});
}
function useThreeFloorplan() {
	let w = {
		renderer: null,
		camera: null,
		scene: null,
		controls: null,
		frameId: null,
		resizeObserver: null,
		mounted: !1,
		floorGroup: null,
		floorMaterial: null,
		wallGroup: null,
		wallMaterial: null,
		gridHelper: null,
		simulatedLightGroup: null,
		simulatedLights: [],
		rendererConfig: normalizeRendererConfig(),
		heatmapBounds: null,
		heatmapMesh: null,
		heatmapMaterial: null,
		heatmapTexture: null,
		heatmapCanvas: null,
		heatmapContext: null,
		heatmapMask: null,
		heatmapMaskResolution: 0,
		heatmapMaskRoomsVersion: 0,
		heatmapRooms: [],
		heatmapRoomsVersion: 0,
		heatmapData: null,
		pointerCleanup: null,
		frameListeners: /* @__PURE__ */ new Set(),
		viewDirUniform: { value: new Vector3(0, 0, -1) }
	}, T = (T, O, j) => {
		w.mounted && cleanupState(w), w.rendererConfig = normalizeRendererConfig(j?.renderer), w.simulatedLights = normalizeSimulatedLights(j?.lights), w.scene = new Scene(), w.camera = createCamera(j?.camera), w.renderer = createRenderer(T), w.controls = createControls(w.camera, w.renderer, j?.camera), addSceneDecorations(w), replaceRooms(w, O), replaceSimulatedLightGroup(w), resizeRenderer(w.renderer, w.camera, T), w.resizeObserver = new ResizeObserver(() => {
			!w.renderer || !w.camera || resizeRenderer(w.renderer, w.camera, T);
		}), w.resizeObserver.observe(T), w.pointerCleanup = installPointerHandlers(w, j?.onRoomClick), w.mounted = !0, renderFrame(w);
	}, O = (T) => {
		w.scene && replaceRooms(w, T);
	}, j = (T) => {
		applyCameraConfig(w, T);
	}, F = (T) => {
		applyRendererConfig(w, T);
	}, U = (T) => {
		applySimulatedLights(w, T);
	}, W = (T) => {
		w.heatmapData = T, renderHeatmap(w);
	}, G = () => {
		cleanupState(w);
	};
	return onBeforeUnmount(G), {
		mount: T,
		updateRooms: O,
		updateCamera: j,
		updateRenderer: F,
		updateLights: U,
		updateHeatmap: W,
		projectWorldPoint: (T, O, j) => projectWorldPoint(w, T, O, j),
		subscribeFrame: (T) => (w.frameListeners.add(T), () => {
			w.frameListeners.delete(T);
		}),
		isMounted: () => w.mounted,
		unmount: G
	};
}
function useAreaRegistry(w) {
	let T = ref([]), O = ref(null), j = ref(!1), F = ref(!1), U = null, W = computed(() => {
		let w = {};
		for (let O of T.value) w[O.area_id] = O;
		return w;
	}), G = computed(() => F.value || T.value.length > 0);
	async function K() {
		let U = w.value;
		if (!U?.callWS) return;
		let W = T.value.length > 0;
		j.value = !0;
		try {
			O.value = null;
			let w = await U.callWS({ type: "config/area_registry/list" });
			T.value = Array.isArray(w) ? w : [], F.value = !0;
		} catch (w) {
			O.value = w, W || (T.value = [], F.value = !1), console.warn("[lovelace-3d] Failed to load areas", w);
		} finally {
			j.value = !1;
		}
	}
	function q(w) {
		return !!W.value[w];
	}
	function J(w) {
		return W.value[w]?.name ?? "";
	}
	function Y() {
		T.value = [], F.value = !1, O.value = null, U = null;
	}
	return watch(w, (w) => {
		if (!w) {
			Y();
			return;
		}
		let T = w.connection ?? null;
		if (T) {
			if (F.value && U === T) return;
			U = T, K();
			return;
		}
		F.value || K();
	}, { immediate: !0 }), {
		areas: T,
		areasById: W,
		ready: G,
		error: O,
		loading: j,
		refresh: K,
		isValidArea: q,
		getAreaName: J
	};
}
var DEFAULT_SENSOR_RADIUS = 2.8, DEFAULT_SENSOR_WEIGHT = 1, DEFAULT_OPACITY = .72, DEFAULT_RESOLUTION = 192, DEFAULT_BLUR = .55;
function clamp$4(w, T, O) {
	return Math.min(O, Math.max(T, w));
}
function asFinite$4(w) {
	let T = Number(w);
	return Number.isFinite(T) ? T : null;
}
function parsePoint$2(w, T) {
	if (Array.isArray(w) && w.length >= 3) {
		let [T, O, j] = w, F = asFinite$4(T), U = asFinite$4(O), W = asFinite$4(j);
		if (F !== null && U !== null && W !== null) return {
			x: F,
			y: U,
			z: W
		};
	}
	let O = asFinite$4(T.x), j = asFinite$4(T.y), F = asFinite$4(T.z);
	return O !== null && j !== null && F !== null ? {
		x: O,
		y: j,
		z: F
	} : null;
}
function parseSensors(w, T) {
	if (!Array.isArray(w)) return [];
	let O = [];
	for (let j = 0; j < w.length; j += 1) {
		let F = w[j];
		if (!F || typeof F != "object") continue;
		let U = F, W = String(U.entity ?? U.entity_id ?? "").trim();
		if (!W || !W.includes(".")) {
			console.warn("[lovelace-3d] Invalid heatmap sensor entity, expected 'domain.object_id'", F);
			continue;
		}
		let G = parsePoint$2(U.position, U);
		if (!G) {
			console.warn("[lovelace-3d] Heatmap sensor is missing a valid position ([x, y, z] or x/y/z)", F);
			continue;
		}
		let K = clamp$4(asFinite$4(U.radius) ?? T.radius, .25, 30), q = clamp$4(asFinite$4(U.weight) ?? T.weight, .05, 10);
		O.push({
			id: String(U.id ?? `${W}-${j + 1}`),
			entityId: W,
			label: String(U.label ?? U.name ?? W),
			point: G,
			radius: K,
			weight: q,
			valueAttribute: String(U.value_attribute ?? U.attribute ?? "").trim() || null
		});
	}
	return O;
}
function parseColorRanges(w) {
	if (!Array.isArray(w)) return [];
	let T = [];
	for (let O of w) {
		if (Array.isArray(O) && O.length >= 2) {
			let w = asFinite$4(O[0]), j = String(O[1] ?? "").trim();
			if (w === null || !j) continue;
			T.push({
				value: w,
				color: j
			});
			continue;
		}
		if (!O || typeof O != "object") continue;
		let w = O, j = asFinite$4(w.value ?? w.at ?? w.temperature ?? w.temp), F = String(w.color ?? w.colour ?? "").trim();
		j === null || !F || T.push({
			value: j,
			color: F
		});
	}
	let O = /* @__PURE__ */ new Map();
	for (let w of T) O.set(w.value.toFixed(6), w);
	return [...O.values()].sort((w, T) => w.value - T.value);
}
function parseHeatmapConfig(w) {
	let T = w && typeof w == "object" && !Array.isArray(w) ? w : null, O = asFinite$4(T?.radius), j = asFinite$4(T?.weight), F = {
		radius: clamp$4(O ?? DEFAULT_SENSOR_RADIUS, .25, 30),
		weight: clamp$4(j ?? DEFAULT_SENSOR_WEIGHT, .05, 10)
	}, U = parseSensors(T?.sensors ?? T?.entries ?? T?.points ?? w, F), W = asFinite$4(T?.min ?? T?.min_value), G = asFinite$4(T?.max ?? T?.max_value), K = W === null ? null : W, q = G === null ? null : G, J = parseColorRanges(T?.color_ranges ?? T?.color_stops ?? T?.ranges ?? T?.temperature_ranges), Y = asFinite$4(T?.opacity), X = asFinite$4(T?.resolution), Q = asFinite$4(T?.blur ?? T?.softness);
	return {
		enabled: T?.enabled !== !1,
		defaultVisible: T?.default_visible !== !1 && T?.visible !== !1,
		sensors: U,
		minValue: K,
		maxValue: q,
		colorRanges: J,
		opacity: clamp$4(Y ?? DEFAULT_OPACITY, .05, 1),
		resolution: Math.round(clamp$4(X ?? DEFAULT_RESOLUTION, 96, 384)),
		blur: clamp$4(Q ?? DEFAULT_BLUR, 0, 1)
	};
}
function createHeatmapSignature(w) {
	return [
		`enabled:${w.enabled}`,
		`visible:${w.defaultVisible}`,
		`min:${w.minValue === null ? "auto" : w.minValue.toFixed(4)}`,
		`max:${w.maxValue === null ? "auto" : w.maxValue.toFixed(4)}`,
		w.colorRanges.map((w) => `${w.value.toFixed(4)}:${w.color}`).join("||"),
		`opacity:${w.opacity.toFixed(4)}`,
		`resolution:${w.resolution}`,
		`blur:${w.blur.toFixed(4)}`,
		w.sensors.map((w) => `${w.id}|${w.entityId}|${w.valueAttribute ?? ""}|${w.radius.toFixed(4)}|${w.weight.toFixed(4)}|${w.point.x.toFixed(4)},${w.point.y.toFixed(4)},${w.point.z.toFixed(4)}`).join("||")
	].join("|");
}
var DEFAULT_FLOATER_OVERLAP_DISTANCE_PX = 40, DEFAULT_FLOATER_OVERLAP_MIN_ITEMS$1 = 2, DEFAULT_FLOATER_OVERLAP_EXPAND_DURATION_MS$1 = 120;
function clamp$3(w, T, O) {
	return Math.min(O, Math.max(T, w));
}
function asFinite$3(w) {
	let T = Number(w);
	return Number.isFinite(T) ? T : null;
}
function defaultIconForDomain(w) {
	switch (w) {
		case "light": return "mdi:lightbulb";
		case "switch": return "mdi:toggle-switch";
		case "fan": return "mdi:fan";
		case "cover": return "mdi:garage";
		case "climate": return "mdi:thermostat";
		case "lock": return "mdi:lock";
		case "media_player": return "mdi:play-circle";
		default: return "mdi:flash";
	}
}
function defaultIconForEntity(w) {
	return defaultIconForDomain(w.split(".", 1)[0] ?? "");
}
function parsePoint$1(w, T) {
	if (Array.isArray(w) && w.length >= 3) {
		let [T, O, j] = w, F = Number(T), U = Number(O), W = Number(j);
		if (Number.isFinite(F) && Number.isFinite(U) && Number.isFinite(W)) return {
			x: F,
			y: U,
			z: W
		};
	}
	let O = Number(T.x), j = Number(T.y), F = Number(T.z);
	return Number.isFinite(O) && Number.isFinite(j) && Number.isFinite(F) ? {
		x: O,
		y: j,
		z: F
	} : null;
}
function parseFloaterAction(w, T) {
	let O = String(w ?? "toggle").trim().toLowerCase().replace(/_/g, "-");
	return O === "more-info" ? "more-info" : O === "popup" ? "popup" : O === "toggle" ? "toggle" : T;
}
function parseFloaterGroup(w, T) {
	return String(w ?? "").trim().toLowerCase() || (T.split(".", 1)[0]?.trim().toLowerCase() ?? "") || "default";
}
function parseFloaters(w) {
	if (!Array.isArray(w)) return [];
	let T = [];
	for (let O = 0; O < w.length; O += 1) {
		let j = w[O];
		if (!j || typeof j != "object") continue;
		let F = j, U = String(F.entity ?? F.entity_id ?? "").trim();
		if (!U || !U.includes(".")) {
			console.warn("[lovelace-3d] Invalid floater entity, expected 'domain.object_id'", j);
			continue;
		}
		let W = parsePoint$1(F.position, F);
		if (!W) {
			console.warn("[lovelace-3d] Floater is missing a valid position ([x, y, z] or x/y/z)", j);
			continue;
		}
		let G = parseFloaterAction(F.tap_action ?? F.press_action ?? F.action, "toggle"), K = parseFloaterAction(F.hold_action ?? F.long_press_action, "popup"), q = String(F.id ?? `${U}-${O + 1}`), J = String(F.label ?? F.name ?? U), Y = String(F.icon ?? "").trim() || defaultIconForEntity(U), X = parseFloaterGroup(F.group ?? F.category, U);
		T.push({
			id: q,
			entityId: U,
			label: J,
			icon: Y,
			group: X,
			point: W,
			tapAction: G,
			holdAction: K
		});
	}
	return T;
}
function parseFloaterOverlapConfig(w) {
	let T = w && typeof w == "object" && !Array.isArray(w) ? w : {}, O = asFinite$3(T.distance_px ?? T.distance ?? T.overlap_distance ?? T.threshold_px), j = asFinite$3(T.min_items ?? T.minItems ?? T.group_size), F = asFinite$3(T.expand_duration_ms ?? T.expandDurationMs ?? T.expand_ms);
	return {
		enabled: T.enabled !== !1,
		distancePx: clamp$3(O ?? DEFAULT_FLOATER_OVERLAP_DISTANCE_PX, 8, 240),
		minItems: Math.round(clamp$3(j ?? DEFAULT_FLOATER_OVERLAP_MIN_ITEMS$1, 2, 12)),
		expandDurationMs: Math.round(clamp$3(F ?? DEFAULT_FLOATER_OVERLAP_EXPAND_DURATION_MS$1, 0, 1e3))
	};
}
function createFloaterOverlapSignature(w) {
	return [
		`enabled:${w.enabled}`,
		`distance:${w.distancePx.toFixed(4)}`,
		`minItems:${w.minItems}`,
		`expand:${w.expandDurationMs}`
	].join("|");
}
function createFloatersSignature(w) {
	return w.map((w) => `${w.id}|${w.entityId}|${w.icon}|${w.group}|${w.tapAction}|${w.holdAction}|${w.point.x.toFixed(4)},${w.point.y.toFixed(4)},${w.point.z.toFixed(4)}`).join("||");
}
var DEFAULT_CAMERA_POSITION$1 = {
	x: 3,
	y: 6,
	z: 10
}, DEFAULT_CAMERA_ROTATION$1 = {
	x: -38.66,
	y: 0
}, DEFAULT_CAMERA_TARGET$1 = {
	x: 3,
	y: 0,
	z: 2.5
}, DEFAULT_MAX_ZOOM_OUT = 60, LOOK_DIRECTION_EPSILON$1 = 1e-4, MIN_CAMERA_PITCH_DEG$1 = -89, MAX_CAMERA_PITCH_DEG$1 = 89;
function clamp$2(w, T, O) {
	return Math.min(O, Math.max(T, w));
}
function asFinite$2(w) {
	let T = Number(w);
	return Number.isFinite(T) ? T : null;
}
function normalizeCameraRotation(w) {
	let T = clamp$2(w.x, MIN_CAMERA_PITCH_DEG$1, MAX_CAMERA_PITCH_DEG$1), O = (w.y % 360 + 360) % 360;
	return {
		x: T,
		y: O > 180 ? O - 360 : O
	};
}
function parsePoint(w, T, O) {
	if (w && typeof w == "object" && !Array.isArray(w)) {
		let T = w, O = asFinite$2(T.x), j = asFinite$2(T.y), F = asFinite$2(T.z);
		if (O !== null && j !== null && F !== null) return {
			x: O,
			y: j,
			z: F
		};
	}
	if (Array.isArray(w) && w.length >= 3) {
		let [T, O, j] = w, F = asFinite$2(T), U = asFinite$2(O), W = asFinite$2(j);
		if (F !== null && U !== null && W !== null) return {
			x: F,
			y: U,
			z: W
		};
	}
	let j = asFinite$2(T.x), F = asFinite$2(T.y), U = asFinite$2(T.z);
	return j !== null && F !== null && U !== null ? {
		x: j,
		y: F,
		z: U
	} : { ...O };
}
function parseRotation(w, T, O) {
	if (w && typeof w == "object" && !Array.isArray(w)) {
		let T = w, O = asFinite$2(T.x), j = asFinite$2(T.y);
		if (O !== null && j !== null) return normalizeCameraRotation({
			x: O,
			y: j
		});
	}
	if (Array.isArray(w) && w.length >= 2) {
		let [T, O] = w, j = asFinite$2(T), F = asFinite$2(O);
		if (j !== null && F !== null) return normalizeCameraRotation({
			x: j,
			y: F
		});
	}
	let j = asFinite$2(T.x), F = asFinite$2(T.y);
	return normalizeCameraRotation(j !== null && F !== null ? {
		x: j,
		y: F
	} : { ...O });
}
function hasLegacyTarget(w) {
	return w.target !== void 0 || w.look_at !== void 0 || w.lookat !== void 0 || w.target_x !== void 0 || w.target_y !== void 0 || w.target_z !== void 0 || w.look_at_x !== void 0 || w.look_at_y !== void 0 || w.look_at_z !== void 0 || w.lookat_x !== void 0 || w.lookat_y !== void 0 || w.lookat_z !== void 0;
}
function hasRotation(w) {
	return w.rotation !== void 0 || w.rotate !== void 0 || w.camera_rotation !== void 0 || w.rotation_x !== void 0 || w.rotation_y !== void 0 || w.rotation_z !== void 0 || w.rotate_x !== void 0 || w.rotate_y !== void 0 || w.rotate_z !== void 0 || w.camera_rotation_x !== void 0 || w.camera_rotation_y !== void 0 || w.camera_rotation_z !== void 0;
}
function deriveRotationFromTarget(w, T) {
	let O = T.x - w.x, j = T.y - w.y, F = T.z - w.z, U = Math.sqrt(O * O + j * j + F * F);
	if (U <= LOOK_DIRECTION_EPSILON$1) return { ...DEFAULT_CAMERA_ROTATION$1 };
	let W = O / U, G = j / U, K = F / U, q = Math.asin(clamp$2(G, -1, 1)), J = Math.atan2(-W, -K), Y = 180 / Math.PI;
	return {
		x: q * Y,
		y: J * Y
	};
}
function parseCameraConfig(w) {
	let T = w && typeof w == "object" && !Array.isArray(w) ? w : {}, O = {
		x: T.position_x ?? T.camera_x,
		y: T.position_y ?? T.camera_y,
		z: T.position_z ?? T.camera_z
	}, j = {
		x: T.rotation_x ?? T.rotate_x ?? T.camera_rotation_x,
		y: T.rotation_y ?? T.rotate_y ?? T.camera_rotation_y
	}, F = {
		x: T.target_x ?? T.look_at_x ?? T.lookat_x,
		y: T.target_y ?? T.look_at_y ?? T.lookat_y,
		z: T.target_z ?? T.look_at_z ?? T.lookat_z
	}, U = parsePoint(T.position ?? T.camera_position, O, DEFAULT_CAMERA_POSITION$1), W = parseRotation(T.rotation ?? T.rotate ?? T.camera_rotation, j, DEFAULT_CAMERA_ROTATION$1), G = parsePoint(T.target ?? T.look_at ?? T.lookat, F, DEFAULT_CAMERA_TARGET$1);
	return {
		position: U,
		rotation: hasRotation(T) ? W : hasLegacyTarget(T) ? normalizeCameraRotation(deriveRotationFromTarget(U, G)) : W,
		maxZoomOut: clamp$2(asFinite$2(T.max_zoom_out ?? T.maxZoomOut ?? T.max_distance ?? T.maxDistance) ?? DEFAULT_MAX_ZOOM_OUT, 2, 300)
	};
}
function createCameraSignature(w) {
	return [
		`pos:${w.position.x.toFixed(4)},${w.position.y.toFixed(4)},${w.position.z.toFixed(4)}`,
		`rot:${w.rotation.x.toFixed(4)},${w.rotation.y.toFixed(4)}`,
		`maxZoomOut:${w.maxZoomOut.toFixed(4)}`
	].join("|");
}
var DEFAULT_WALL_OPACITY = 1, DEFAULT_WALL_HEIGHT = 2.6, DEFAULT_GRID_ENABLED = !0, DEFAULT_LIGHT_SIMULATION_ENABLED = !0, DEFAULT_LIGHT_SIMULATION_INTENSITY = 2.4, DEFAULT_LIGHT_SIMULATION_RANGE = 4.5, DEFAULT_LIGHT_SIMULATION_DECAY = 1.2, DEFAULT_CARD_TRANSPARENT = !1;
function asFinite$1(w) {
	let T = Number(w);
	return Number.isFinite(T) ? T : null;
}
function clamp$1(w, T, O) {
	return Math.min(O, Math.max(T, w));
}
function asTrimmedColor(w) {
	return String(w ?? "").trim() || null;
}
function parseRendererConfig(w) {
	let T = w && typeof w == "object" && !Array.isArray(w) ? w : {}, O = asFinite$1(T.wall_opacity ?? T.wallOpacity ?? T.wall_alpha ?? T.wallAlpha), j = asFinite$1(T.wall_height ?? T.wallHeight ?? T.walls_height ?? T.wallsHeight), F = T.grid_enabled ?? T.gridEnabled ?? T.grid ?? T.show_grid, U = T.light_simulation_enabled ?? T.lightSimulationEnabled ?? T.simulate_lights ?? T.simulateLights, W = asFinite$1(T.light_simulation_intensity ?? T.lightSimulationIntensity ?? T.light_intensity ?? T.lightIntensity), G = asFinite$1(T.light_simulation_range ?? T.lightSimulationRange ?? T.light_range ?? T.lightRange), K = asFinite$1(T.light_simulation_decay ?? T.lightSimulationDecay ?? T.light_decay ?? T.lightDecay);
	return {
		wallColor: asTrimmedColor(T.wall_color ?? T.wallColor ?? T.walls_color ?? T.wallsColor),
		wallOpacity: clamp$1(O ?? DEFAULT_WALL_OPACITY, 0, 1),
		wallHeight: clamp$1(j ?? DEFAULT_WALL_HEIGHT, .2, 10),
		gridEnabled: F === void 0 ? DEFAULT_GRID_ENABLED : F !== !1,
		gridColor: asTrimmedColor(T.grid_color ?? T.gridColor),
		backgroundColor: asTrimmedColor(T.background_color ?? T.backgroundColor ?? T.background ?? T.scene_background_color ?? T.sceneBackgroundColor),
		lightSimulationEnabled: U === void 0 ? DEFAULT_LIGHT_SIMULATION_ENABLED : U !== !1 && U !== "false",
		lightSimulationIntensity: clamp$1(W ?? DEFAULT_LIGHT_SIMULATION_INTENSITY, 0, 8),
		lightSimulationRange: clamp$1(G ?? DEFAULT_LIGHT_SIMULATION_RANGE, .5, 20),
		lightSimulationDecay: clamp$1(K ?? DEFAULT_LIGHT_SIMULATION_DECAY, 0, 4),
		cardTransparent: (T.card_transparent ?? T.cardTransparent ?? T.transparent_card ?? T.transparentCard) === !0 || (T.card_transparent ?? T.cardTransparent ?? T.transparent_card ?? T.transparentCard) === "true" || DEFAULT_CARD_TRANSPARENT,
		cardBackgroundColor: asTrimmedColor(T.card_background_color ?? T.cardBackgroundColor ?? T.card_background ?? T.cardBackground)
	};
}
function createRendererSignature(w) {
	return [
		`wallColor:${w.wallColor ?? "default"}`,
		`wallOpacity:${w.wallOpacity.toFixed(4)}`,
		`wallHeight:${w.wallHeight.toFixed(4)}`,
		`gridEnabled:${w.gridEnabled}`,
		`gridColor:${w.gridColor ?? "default"}`,
		`background:${w.backgroundColor ?? "transparent"}`,
		`lightSimulationEnabled:${w.lightSimulationEnabled}`,
		`lightSimulationIntensity:${w.lightSimulationIntensity.toFixed(4)}`,
		`lightSimulationRange:${w.lightSimulationRange.toFixed(4)}`,
		`lightSimulationDecay:${w.lightSimulationDecay.toFixed(4)}`,
		`cardTransparent:${w.cardTransparent}`,
		`cardBackground:${w.cardBackgroundColor ?? "default"}`
	].join("|");
}
var DEFAULT_ITEMS = [{
	id: "heatmap-toggle",
	label: "Heatmap",
	icon: "mdi:thermometer",
	action: "toggle-heatmap",
	floaterGroup: null
}];
function asFinite(w) {
	let T = Number(w);
	return Number.isFinite(T) ? T : null;
}
function clamp(w, T, O) {
	return Math.min(O, Math.max(T, w));
}
function parseNavbarPosition(w) {
	let T = String(w ?? "left").trim().toLowerCase().replace(/_/g, "-");
	return T === "right" ? "right" : T === "top" ? "top" : T === "bottom" ? "bottom" : T === "top-left" ? "top-left" : T === "top-right" ? "top-right" : T === "bottom-left" ? "bottom-left" : T === "bottom-right" ? "bottom-right" : "left";
}
function parseNavbarAction(w) {
	let T = String(w ?? "").trim().toLowerCase().replace(/_/g, "-");
	return T === "toggle-heatmap" ? "toggle-heatmap" : T === "set-floater-group" ? "set-floater-group" : null;
}
function parseNavbarItems(w) {
	if (w == null) return DEFAULT_ITEMS.map((w) => ({ ...w }));
	if (!Array.isArray(w)) return [];
	let T = [];
	for (let O = 0; O < w.length; O += 1) {
		let j = w[O];
		if (!j || typeof j != "object") continue;
		let F = j, U = parseNavbarAction(F.action ?? F.type);
		if (!U) continue;
		let W = String(F.floater_group ?? F.group ?? F.target ?? "").trim().toLowerCase(), G = U === "set-floater-group" ? W || "all" : null;
		T.push({
			id: String(F.id ?? `${U}-${O + 1}`),
			label: String(F.label ?? F.name ?? (U === "set-floater-group" ? G === "all" ? "All" : G : "Heatmap")),
			icon: String(F.icon ?? (U === "set-floater-group" ? "mdi:lightbulb-group" : "mdi:thermometer")).trim() || (U === "set-floater-group" ? "mdi:lightbulb-group" : "mdi:thermometer"),
			action: U,
			floaterGroup: G
		});
	}
	return T;
}
function parseNavbarConfig(w) {
	let T = w && typeof w == "object" && !Array.isArray(w) ? w : {}, O = asFinite(T.opacity), j = asFinite(T.blur), F = asFinite(T.offset_x ?? T.offsetX), U = asFinite(T.offset_y ?? T.offsetY);
	return {
		enabled: T.enabled !== !1,
		position: parseNavbarPosition(T.position),
		transparent: T.transparent !== !1,
		opacity: clamp(O ?? .58, .05, 1),
		blur: clamp(j ?? 10, 0, 28),
		backgroundColor: String(T.background ?? T.background_color ?? "").trim() || null,
		borderColor: String(T.border_color ?? T.borderColor ?? "").trim() || null,
		textColor: String(T.text_color ?? T.textColor ?? "").trim() || null,
		iconColor: String(T.icon_color ?? T.iconColor ?? "").trim() || null,
		offsetX: Math.round(clamp(F ?? 14, 0, 128)),
		offsetY: Math.round(clamp(U ?? 16, 0, 128)),
		items: parseNavbarItems(T.items)
	};
}
var TEMPLATE_TOKENS = {
	"room.id": (w) => w.roomId,
	"room.name": (w) => w.roomName,
	"room.area_id": (w) => w.roomId,
	"click.x": (w) => String(Math.round(w.x)),
	"click.y": (w) => String(Math.round(w.y)),
	"click.world_x": (w) => w.worldX.toFixed(4),
	"click.world_y": (w) => w.worldY.toFixed(4),
	"click.world_z": (w) => w.worldZ.toFixed(4)
};
function applyStringTemplate(w, T) {
	return w.replace(/\{\{\s*([^{}]+?)\s*\}\}/g, (w, O) => {
		let j = TEMPLATE_TOKENS[String(O).trim()];
		return j ? j(T) : w;
	});
}
function applyActionTemplates(w, T) {
	if (typeof w == "string") return applyStringTemplate(w, T);
	if (Array.isArray(w)) return w.map((w) => applyActionTemplates(w, T));
	if (w && typeof w == "object") {
		let O = {};
		for (let [j, F] of Object.entries(w)) O[j] = applyActionTemplates(F, T);
		return O;
	}
	return w;
}
function toRecord(w) {
	if (!(!w || typeof w != "object" || Array.isArray(w))) return w;
}
function parsePolygon(w) {
	if (!Array.isArray(w)) return [];
	let T = [];
	for (let O of w) {
		if (!Array.isArray(O) || O.length < 2) continue;
		let [w, j] = O, F = Number(w), U = Number(j);
		!Number.isFinite(F) || !Number.isFinite(U) || T.push([F, U]);
	}
	return T.length >= 3 ? T : [];
}
function parseRoomTapAction(w, T) {
	let O = String(w ?? "").trim().toLowerCase().replace(/_/g, "-");
	return O === "popup" ? "popup" : O === "navigate" ? "navigate" : O === "none" || O === "disabled" || O === "ignore" ? "none" : T;
}
function parseRoomClickConfig(w) {
	let T = toRecord(w.tap_action);
	return {
		tapAction: parseRoomTapAction(T?.action ?? w.tap_action ?? w.press_action ?? w.action ?? w.click_action ?? w.on_click, "popup"),
		navigationPath: String(T?.navigation_path ?? T?.path ?? w.navigation_path ?? w.url_path ?? w.path ?? "").trim()
	};
}
function parsePopupActions(w, T) {
	if (w === void 0) return {
		configured: !1,
		actions: []
	};
	if (!Array.isArray(w)) return console.warn(`[lovelace-3d] ${T} actions must be an array`, w), {
		configured: !0,
		actions: []
	};
	let O = [];
	for (let T = 0; T < w.length; T += 1) {
		let j = w[T];
		if (!j || typeof j != "object") continue;
		let F = j, U = String(F.service ?? F.action ?? "").trim();
		if (!U || !U.includes(".")) {
			console.warn("[lovelace-3d] Invalid room action service, expected 'domain.service'", j);
			continue;
		}
		O.push({
			id: String(F.id ?? `${U}-${T + 1}`),
			label: String(F.label ?? F.name ?? U),
			service: U,
			serviceData: toRecord(F.service_data) ?? toRecord(F.data) ?? {},
			target: toRecord(F.target),
			closeOnRun: F.close_on_run !== !1
		});
	}
	return {
		configured: !0,
		actions: O
	};
}
function parseRoomEntries(w, T) {
	if (!T.ready || !Array.isArray(w)) return [];
	let O = [];
	for (let j of w) {
		if (!j || typeof j != "object") continue;
		let w = j, F = String(w.area ?? "");
		if (!F) continue;
		if (!T.isValidArea(F)) {
			console.warn(`[lovelace-3d] Unknown area "${F}" in room config`, j);
			continue;
		}
		let U = parsePolygon(w.polygon);
		if (U.length < 3) continue;
		let W = String(w.name ?? "") || T.getAreaName(F) || F, G = w.room_popup_actions ?? w.room_actions;
		O.push({
			room: {
				id: F,
				name: W,
				polygon: U
			},
			clickConfig: parseRoomClickConfig(w),
			actionConfig: parsePopupActions(G, `Room "${F}"`)
		});
	}
	return O;
}
function buildRoomActionConfigMap(w) {
	let T = {};
	for (let O of w) T[O.room.id] = O.actionConfig;
	return T;
}
function createRoomsSignature(w) {
	return w.map((w) => `${w.id}|${w.name}|${w.polygon.map(([w, T]) => `${w.toFixed(4)},${T.toFixed(4)}`).join(";")}`).join("||");
}
var _hoisted_1 = { class: "wrap" }, _hoisted_2 = { class: "content" }, _hoisted_3 = { class: "three-shell" }, _hoisted_4 = {
	key: 0,
	class: "floater-layer",
	"aria-label": "Floating entity controls"
}, _hoisted_5 = ["aria-label", "onClick"], _hoisted_6 = { class: "navbar-label" }, _hoisted_7 = {
	key: 3,
	class: "loader-overlay",
	role: "status",
	"aria-live": "polite",
	"aria-label": "Loading area registry"
}, _hoisted_8 = {
	key: 0,
	class: "loader-spinner",
	"aria-hidden": "true"
}, HEATMAP_AUTO_RANGE_PADDING_RATIO = .12, FLOATER_GROUP_ICON = "mdi:layers-triple", FLOATER_GROUP_COLLAPSE_ICON = "mdi:close", FLOATER_GROUP_RADIUS_BASE_PX = 52, FLOATER_GROUP_RADIUS_STEP_PX = 4, FLOATER_GROUP_RADIUS_CAP_PX = 84, App_default = /* @__PURE__ */ defineComponent({
	__name: "App",
	props: { state: { type: Object } },
	setup(w) {
		let T = w, O = computed(() => T.state?.hass ?? null), { ready: j, loading: F, isValidArea: U, getAreaName: W } = useAreaRegistry(O), G = computed(() => T.state?.config ?? {}), K = ref(null), q = useThreeFloorplan(), J = ref(null), Y = ref(null), X = ref(null), Q = ref(null), xS = ref(null), SS = ref(null), CS = ref(1), wS = ref({}), TS = ref({}), ES = ref(!0), DS = ref("all"), OS = !1, kS = null, AS = computed(() => parseRoomEntries(G.value.rooms, {
			ready: j.value,
			isValidArea: U,
			getAreaName: W
		})), jS = computed(() => AS.value.map((w) => w.room)), MS = computed(() => buildRoomActionConfigMap(AS.value)), NS = computed(() => {
			let w = {};
			for (let T of AS.value) w[T.room.id] = T.clickConfig;
			return w;
		}), PS = computed(() => parsePopupActions(G.value.room_popup_actions ?? G.value.room_actions, "Card")), FS = computed(() => {
			if (!X.value) return [];
			let w = MS.value[X.value.roomId];
			return w?.configured ? w.actions : PS.value.actions;
		}), IS = computed(() => FS.value.map((w) => ({
			id: w.id,
			label: w.label
		}))), LS = computed(() => X.value ? {
			id: X.value.roomId,
			name: X.value.roomName
		} : null), RS = computed(() => parseFloaters(G.value.floaters)), zS = computed(() => {
			let w = {};
			for (let T of RS.value) w[T.id] = T;
			return w;
		}), BS = computed(() => parseHeatmapConfig(G.value.heatmaps)), VS = computed(() => parseCameraConfig(G.value.camera)), HS = computed(() => parseRendererConfig(G.value.renderer)), US = computed(() => parseFloaterOverlapConfig(G.value.floater_overlap)), WS = computed(() => parseNavbarConfig(G.value.navbar)), GS = computed(() => {
			let w = HS.value, T = {};
			return w.cardTransparent ? (T["--ha-card-background"] = "transparent", T["--ha-card-box-shadow"] = "none", T["--ha-card-border-width"] = "0px") : w.cardBackgroundColor && (T["--ha-card-background"] = w.cardBackgroundColor), T;
		}), KS = computed(() => {
			if (!HS.value.lightSimulationEnabled) return [];
			let w = [];
			for (let T of RS.value) {
				if (!T.entityId.startsWith("light.")) continue;
				let j = O.value?.states?.[T.entityId];
				if (!j || j.state !== "on") continue;
				let F = oC(j.attributes);
				F <= 1e-4 || w.push({
					id: T.id,
					x: T.point.x,
					y: T.point.y,
					z: T.point.z,
					color: aC(j.attributes),
					intensity: F
				});
			}
			return w;
		});
		function qS(w) {
			let T = Number(w);
			return Number.isFinite(T) ? T : null;
		}
		let YS = [
			255,
			214,
			102
		];
		function XS(w, T, O) {
			let j = Math.max(0, Math.min(1, T / 100)), F = Math.max(0, Math.min(1, O / 255)), U = F * j, W = (w % 360 + 360) % 360 / 60, G = U * (1 - Math.abs(W % 2 - 1)), K = 0, q = 0, J = 0;
			W >= 0 && W < 1 ? [K, q, J] = [
				U,
				G,
				0
			] : W < 2 ? [K, q, J] = [
				G,
				U,
				0
			] : W < 3 ? [K, q, J] = [
				0,
				U,
				G
			] : W < 4 ? [K, q, J] = [
				0,
				G,
				U
			] : W < 5 ? [K, q, J] = [
				G,
				0,
				U
			] : [K, q, J] = [
				U,
				0,
				G
			];
			let Y = F - U;
			return [
				Math.round((K + Y) * 255),
				Math.round((q + Y) * 255),
				Math.round((J + Y) * 255)
			];
		}
		function ZS(w) {
			return Math.round(Math.min(255, Math.max(0, w)));
		}
		function QS(w) {
			return `rgb(${w[0]}, ${w[1]}, ${w[2]})`;
		}
		function eC(w) {
			if (!Array.isArray(w) || w.length < 3) return null;
			let T = qS(w[0]), O = qS(w[1]), j = qS(w[2]);
			return T === null || O === null || j === null ? null : [
				ZS(T),
				ZS(O),
				ZS(j)
			];
		}
		function tC(w) {
			return w[0] > 0 || w[1] > 0 || w[2] > 0;
		}
		function nC(w) {
			let T = Math.min(4e4, Math.max(1e3, w)) / 100, O = 255, j = 255, F = 255;
			return T <= 66 ? (j = 99.4708025861 * Math.log(T) - 161.1195681661, F = T <= 19 ? 0 : 138.5177312231 * Math.log(T - 10) - 305.0447927307) : (O = 329.698727446 * (T - 60) ** -.1332047592, j = 288.1221695283 * (T - 60) ** -.0755148492), [
				ZS(O),
				ZS(j),
				ZS(F)
			];
		}
		function rC(w) {
			if (!w) return YS;
			let T = eC(w.rgb_color);
			if (T) return T;
			let O = w.rgbw_color;
			if (Array.isArray(O) && O.length >= 4) {
				let w = eC(O), T = qS(O[3]);
				if (w && tC(w)) return w;
				if (T !== null && T > 0) return nC(3200);
				if (w) return w;
			}
			let j = w.rgbww_color;
			if (Array.isArray(j) && j.length >= 5) {
				let w = eC(j);
				if (w && tC(w)) return w;
				let T = qS(j[3]) ?? 0, O = qS(j[4]) ?? 0, F = T + O;
				if (F > 0) return nC(2700 + O / F * 3800);
				if (w) return w;
			}
			let F = w.hs_color;
			if (Array.isArray(F) && F.length >= 2) {
				let T = qS(F[0]), O = qS(F[1]), j = qS(w.brightness) ?? 255;
				if (T !== null && O !== null) return XS(T, O, j);
			}
			let U = qS(w.color_temp_kelvin);
			if (U !== null && U > 0) return nC(U);
			let W = qS(w.color_temp);
			return W !== null && W > 0 ? nC(1e6 / W) : YS;
		}
		function aC(w) {
			return QS(rC(w));
		}
		function oC(w) {
			if (!w) return 1;
			let T = qS(w.brightness);
			if (T !== null) return lC(T / 255);
			let O = qS(w.brightness_pct);
			return O === null ? 1 : lC(O / 100);
		}
		function sC(w, T) {
			return T ? w.entityId.startsWith("light.") && T.state === "on" ? aC(T.attributes) : T.state === "on" ? "var(--primary-color)" : null : null;
		}
		function cC(w) {
			let T = Number(w);
			if (Number.isFinite(T)) return T;
			let O = Number.parseFloat(w);
			return Number.isFinite(O) ? O : null;
		}
		function lC(w) {
			return Math.min(1, Math.max(0, w));
		}
		function uC(w) {
			let T = w.trim().replace(/^#/, "");
			if (!T) return null;
			if (T.length === 3 || T.length === 4) {
				let w = T.charAt(0), O = T.charAt(1), j = T.charAt(2);
				if (!w || !O || !j) return null;
				let F = Number.parseInt(w + w, 16), U = Number.parseInt(O + O, 16), W = Number.parseInt(j + j, 16);
				return Number.isFinite(F) && Number.isFinite(U) && Number.isFinite(W) ? [
					F,
					U,
					W
				] : null;
			}
			if (T.length === 6 || T.length === 8) {
				let w = Number.parseInt(T.slice(0, 2), 16), O = Number.parseInt(T.slice(2, 4), 16), j = Number.parseInt(T.slice(4, 6), 16);
				return Number.isFinite(w) && Number.isFinite(O) && Number.isFinite(j) ? [
					w,
					O,
					j
				] : null;
			}
			return null;
		}
		function dC(w) {
			let T = w.trim().match(/^rgba?\((.+)\)$/i);
			if (!T) return null;
			let O = T[1];
			if (!O) return null;
			let j = O.split(",").map((w) => w.trim());
			if (j.length < 3) return null;
			let F = [];
			for (let w = 0; w < 3; w += 1) {
				let T = j[w];
				if (!T) return null;
				if (T.endsWith("%")) {
					let w = Number.parseFloat(T.slice(0, -1));
					if (!Number.isFinite(w)) return null;
					F.push(Math.round(lC(w / 100) * 255));
					continue;
				}
				let O = Number.parseFloat(T);
				if (!Number.isFinite(O)) return null;
				F.push(Math.round(Math.min(255, Math.max(0, O))));
			}
			let [U, W, G] = F;
			return U === void 0 || W === void 0 || G === void 0 ? null : [
				U,
				W,
				G
			];
		}
		function fC(w) {
			let T = w.trim();
			return T ? T.startsWith("#") ? uC(T) : dC(T) : null;
		}
		function pC(w, T) {
			if (!T) return null;
			if (w.valueAttribute) {
				let O = T.attributes?.[w.valueAttribute];
				if (O !== void 0) {
					let w = qS(O);
					return w === null ? cC(String(O)) : w;
				}
			}
			return cC(String(T.state ?? ""));
		}
		function mC(w, T) {
			let O = Math.abs(w) >= 100 ? 0 : Math.abs(w) >= 10 ? 1 : 2, j = w.toFixed(O);
			return T ? `${j} ${T}` : j;
		}
		let hC = computed(() => {
			let w = BS.value;
			if (!w.enabled || w.sensors.length === 0) return [];
			let T = [];
			for (let j of w.sensors) {
				let w = O.value?.states?.[j.entityId], F = pC(j, w);
				if (F === null) continue;
				let U = String(w?.attributes?.unit_of_measurement ?? "").trim();
				T.push({
					id: j.id,
					entityId: j.entityId,
					label: j.label,
					point: j.point,
					x: j.point.x,
					z: j.point.z,
					value: F,
					unit: U,
					radius: j.radius,
					weight: j.weight
				});
			}
			return T;
		}), gC = computed(() => {
			let w = hC.value;
			if (w.length === 0) return null;
			let T = BS.value, O = Infinity, j = -Infinity;
			for (let T of w) T.value < O && (O = T.value), T.value > j && (j = T.value);
			let F = T.minValue ?? O, U = T.maxValue ?? j;
			if (Number.isFinite(F) || (F = O), Number.isFinite(U) || (U = j), !Number.isFinite(F) || !Number.isFinite(U)) return null;
			let W = T.minValue === null, G = T.maxValue === null, K = Math.max(1e-4, U - F), q = Math.max(.2, K * HEATMAP_AUTO_RANGE_PADDING_RATIO);
			W && (F -= q), G && (U += q), U - F < 1e-4 && (U = F + 1);
			let J = Math.max(1e-4, U - F), Y = T.colorRanges.map((w) => {
				let T = fC(w.color);
				if (!T) return null;
				let [O, j, U] = T;
				return {
					position: lC((w.value - F) / J),
					r: O,
					g: j,
					b: U
				};
			}).filter((w) => w !== null).sort((w, T) => w.position - T.position);
			return {
				samples: w.map((w) => ({
					x: w.x,
					z: w.z,
					value: w.value,
					radius: w.radius,
					weight: w.weight
				})),
				minValue: F,
				maxValue: U,
				colorStops: Y.length >= 2 ? Y : null,
				opacity: T.opacity,
				resolution: T.resolution,
				blur: T.blur,
				visible: ES.value
			};
		}), _C = computed(() => !!gC.value && ES.value), vC = computed(() => {
			let w = WS.value;
			if (!w.enabled) return [];
			let T = BS.value.enabled && BS.value.sensors.length > 0;
			return w.items.filter((w) => {
				if (w.action === "toggle-heatmap") return T;
				if (w.action === "set-floater-group") {
					let T = w.floaterGroup ?? "all";
					return T === "all" || RS.value.some((w) => w.group === T);
				}
				return !0;
			});
		}), yC = computed(() => `pos-${WS.value.position}`), bC = computed(() => {
			let w = WS.value.position;
			return w === "top" || w === "bottom" ? "horizontal" : "vertical";
		}), xC = computed(() => {
			let w = WS.value, T = w.transparent ? `rgba(16, 19, 26, ${w.opacity.toFixed(3)})` : "rgba(16, 19, 26, 0.94)";
			return {
				"--navbar-offset-x": `${w.offsetX}px`,
				"--navbar-offset-y": `${w.offsetY}px`,
				"--navbar-bg": w.backgroundColor ?? T,
				"--navbar-border": w.borderColor ?? "rgba(255, 255, 255, 0.16)",
				"--navbar-text": w.textColor ?? "var(--primary-text-color)",
				"--navbar-icon": w.iconColor ?? w.textColor ?? "var(--primary-text-color)",
				"--navbar-blur": `${w.blur}px`
			};
		});
		function SC(w) {
			let T = !!gC.value && ES.value;
			return w.action === "toggle-heatmap" ? T : w.action === "set-floater-group" ? !T && DS.value === (w.floaterGroup ?? "all") : !1;
		}
		function CC(w) {
			if (w.action === "toggle-heatmap") {
				if (gC.value && ES.value && vC.value.length <= 1) return;
				ES.value = !ES.value, ES.value && (YC(), JC());
				return;
			}
			w.action === "set-floater-group" && (DS.value = w.floaterGroup ?? "all", ES.value &&= !1, YC(), JC());
		}
		function wC(w, T, O) {
			if (w.length === 0) return [];
			let j = [], F = /* @__PURE__ */ new Set(), U = T * T, W = Math.max(2, Math.round(O));
			for (let T = 0; T < w.length; T += 1) {
				if (F.has(T)) continue;
				let O = [], G = [T];
				for (F.add(T); G.length > 0;) {
					let T = G.pop();
					if (T === void 0) break;
					O.push(T);
					let j = w[T];
					if (j) for (let T = 0; T < w.length; T += 1) {
						if (F.has(T)) continue;
						let O = w[T];
						if (!O) continue;
						let W = j.x - O.x, K = j.y - O.y;
						W * W + K * K > U || (F.add(T), G.push(T));
					}
				}
				let K = O.map((T) => w[T]).filter((w) => w !== void 0).sort((w, T) => w.id.localeCompare(T.id));
				if (K.length === 0) continue;
				let q = K.reduce((w, T) => (w.x += T.x, w.y += T.y, w), {
					x: 0,
					y: 0
				});
				if (K.length < W) for (let w of K) j.push({
					id: w.id,
					x: w.x,
					y: w.y,
					items: [w]
				});
				else j.push({
					id: K.map((w) => w.id).join("|"),
					x: q.x / K.length,
					y: q.y / K.length,
					items: K
				});
			}
			return j.sort((w, T) => w.id.localeCompare(T.id)), j;
		}
		function TC(w) {
			for (let T of w) if (T.accentColor) return T.accentColor;
			return null;
		}
		function EC(w) {
			for (let T of w) if (T.isOn) return T.icon;
			return w[0]?.icon || FLOATER_GROUP_ICON;
		}
		function DC(w) {
			if (w <= 2) return FLOATER_GROUP_RADIUS_BASE_PX;
			let T = FLOATER_GROUP_RADIUS_BASE_PX + (w - 2) * FLOATER_GROUP_RADIUS_STEP_PX;
			return Math.min(FLOATER_GROUP_RADIUS_CAP_PX, T);
		}
		function OC(w) {
			return 1 - (1 - Math.max(0, Math.min(1, w))) ** 3;
		}
		function kC(w) {
			SS.value = {
				groupId: w,
				startedAtMs: performance.now()
			}, CS.value = 0;
		}
		function AC() {
			SS.value = null, CS.value = 1;
		}
		function jC(w) {
			let T = SS.value;
			if (!T) return;
			if (xS.value !== T.groupId) {
				AC();
				return;
			}
			let O = Math.max(1, US.value.expandDurationMs), j = Math.min(1, Math.max(0, (w - T.startedAtMs) / O));
			CS.value = j, j >= 1 && AC();
		}
		function MC(w) {
			let T = SS.value;
			return !T || T.groupId !== w ? 1 : OC(CS.value);
		}
		let NC = computed(() => _C.value ? [] : DS.value === "all" ? RS.value : RS.value.filter((w) => w.group === DS.value)), PC = computed(() => {
			let w = [];
			for (let T of NC.value) {
				let j = wS.value[T.id];
				if (!j || !j.visible) continue;
				let F = O.value?.states?.[T.entityId], U = String(F?.attributes?.icon ?? "").trim() || T.icon, W = F?.state === "on", G = sC(T, F);
				w.push({
					id: T.id,
					label: T.label,
					icon: U,
					x: j.x,
					y: j.y,
					isOn: W,
					accentColor: G,
					floaterId: T.id,
					sensorEntityId: null,
					valueText: null
				});
			}
			return w;
		}), FC = computed(() => {
			if (!_C.value) return [];
			let w = [];
			for (let T of hC.value) {
				let O = TS.value[T.id];
				!O || !O.visible || w.push({
					id: `heatmap-sensor-${T.id}`,
					label: T.label || T.entityId,
					icon: "mdi:thermometer",
					x: O.x,
					y: O.y,
					isOn: !1,
					accentColor: null,
					floaterId: null,
					sensorEntityId: T.entityId,
					valueText: mC(T.value, T.unit)
				});
			}
			return w;
		}), IC = computed(() => _C.value ? FC.value : PC.value), LC = computed(() => _C.value || !US.value.enabled ? IC.value.map((w) => ({
			id: w.id,
			x: w.x,
			y: w.y,
			items: [w]
		})) : wC(IC.value, US.value.distancePx, US.value.minItems)), RC = computed(() => {
			let w = [];
			for (let T of LC.value) {
				if (T.items.length === 1) {
					let O = T.items[0];
					if (!O) continue;
					w.push({
						id: `floater-${O.id}`,
						x: O.x,
						y: O.y,
						icon: O.icon,
						label: O.label,
						isOn: O.isOn,
						accentColor: O.accentColor,
						isActive: !!O.floaterId && Q.value === O.floaterId,
						isGroup: !1,
						groupCount: null,
						floaterId: O.floaterId,
						sensorEntityId: O.sensorEntityId,
						groupId: null,
						valueText: O.valueText
					});
					continue;
				}
				let O = xS.value === T.id, j = MC(T.id), F = T.items.some((w) => !!w.floaterId && Q.value === w.floaterId);
				if (!O) {
					w.push({
						id: `group-${T.id}`,
						x: T.x,
						y: T.y,
						icon: EC(T.items),
						label: `${T.items.length} overlapping controls`,
						isOn: T.items.some((w) => w.isOn),
						accentColor: TC(T.items),
						isActive: F,
						isGroup: !0,
						groupCount: T.items.length,
						floaterId: null,
						sensorEntityId: null,
						groupId: T.id,
						valueText: null
					});
					continue;
				}
				w.push({
					id: `group-center-${T.id}`,
					x: T.x,
					y: T.y,
					icon: FLOATER_GROUP_COLLAPSE_ICON,
					label: `Collapse ${T.items.length} controls`,
					isOn: !1,
					accentColor: null,
					isActive: !1,
					isGroup: !0,
					groupCount: T.items.length,
					floaterId: null,
					sensorEntityId: null,
					groupId: T.id,
					valueText: null
				});
				let U = DC(T.items.length), W = Math.PI * 2 / T.items.length, G = -Math.PI / 2;
				T.items.forEach((O, F) => {
					let K = G + W * F;
					w.push({
						id: `group-item-${T.id}-${O.id}`,
						x: T.x + Math.cos(K) * U * j,
						y: T.y + Math.sin(K) * U * j,
						icon: O.icon,
						label: O.label,
						isOn: O.isOn,
						accentColor: O.accentColor,
						isActive: !!O.floaterId && Q.value === O.floaterId,
						isGroup: !1,
						groupCount: null,
						floaterId: O.floaterId,
						sensorEntityId: O.sensorEntityId,
						groupId: null,
						valueText: O.valueText
					});
				});
			}
			return w;
		}), zC = computed(() => Q.value ? zS.value[Q.value] ?? null : null), BC = computed(() => {
			if (!Q.value) return null;
			let w = wS.value[Q.value];
			return !w || !w.visible ? null : {
				x: w.x,
				y: w.y
			};
		}), VC = computed(() => {
			let w = zC.value;
			return w ? O.value?.states?.[w.entityId] ?? null : null;
		}), HC = computed(() => {
			let w = zC.value;
			return w ? String(VC.value?.attributes?.friendly_name ?? w.label ?? w.entityId) : "";
		}), UC = computed(() => {
			let w = zC.value;
			return w ? String(VC.value?.attributes?.icon ?? "").trim() || w.icon : "";
		}), WC = computed(() => {
			if (!zC.value) return "";
			if (!VC.value) return "Entity unavailable";
			let w = String(VC.value.state), T = String(VC.value.attributes?.unit_of_measurement ?? "").trim();
			return T ? `${w} ${T}` : w;
		}), GC = computed(() => "Toggle"), KC = computed(() => "Open controls");
		function qC() {
			X.value = null, J.value = null;
		}
		function JC() {
			xS.value = null, AC();
		}
		function YC() {
			Q.value = null, Y.value = null;
		}
		function XC(w) {
			qC(), JC(), Q.value = w;
		}
		function ZC(w) {
			if (qC(), YC(), xS.value === w) {
				xS.value = null, AC();
				return;
			}
			xS.value = w, kC(w);
		}
		function QC(w) {
			if (w.groupId) {
				ZC(w.groupId);
				return;
			}
			if (w.floaterId) {
				ew(w.floaterId);
				return;
			}
			w.sensorEntityId && iw(w.sensorEntityId);
		}
		function $C(w) {
			if (!w.groupId) {
				if (w.floaterId) {
					tw(w.floaterId);
					return;
				}
				w.sensorEntityId && iw(w.sensorEntityId);
			}
		}
		async function ew(w) {
			let T = zS.value[w];
			if (T) {
				qC(), JC();
				try {
					await cw(T, T.tapAction);
				} catch (w) {
					console.warn("[lovelace-3d] Floater button press failed", T, w);
				}
			}
		}
		async function tw(w) {
			let T = zS.value[w];
			if (T) {
				qC(), JC();
				try {
					await cw(T, T.holdAction);
				} catch (w) {
					console.warn("[lovelace-3d] Floater long press failed", T, w);
				}
			}
		}
		function nw(w) {
			YC(), JC();
			let T = aw(w), O = NS.value[w.roomId], j = O?.tapAction ?? "popup";
			if (j === "none") {
				qC();
				return;
			}
			if (j === "navigate") {
				qC();
				let j = String(applyActionTemplates(O?.navigationPath ?? "", T) ?? "").trim();
				if (!j) {
					console.warn("[lovelace-3d] Room navigate action is missing navigation_path", w);
					return;
				}
				ow({ tap_action: {
					action: "navigate",
					navigation_path: j
				} });
				return;
			}
			X.value = T;
		}
		async function rw(w) {
			let T = O.value, j = X.value;
			if (!T?.callService || !j) return;
			let F = FS.value.find((T) => T.id === w);
			if (!F) return;
			let [U, W] = F.service.split(".", 2);
			if (!U || !W) {
				console.warn("[lovelace-3d] Invalid room action service", F.service);
				return;
			}
			J.value = F.id;
			try {
				let w = applyActionTemplates(F.serviceData, j), O = F.target ? applyActionTemplates(F.target, j) : void 0;
				await T.callService(U, W, w, O), F.closeOnRun && qC();
			} catch (w) {
				console.warn("[lovelace-3d] Room action failed", F, w);
			} finally {
				J.value === F.id && (J.value = null);
			}
		}
		function iw(w) {
			(K.value ?? document.body).dispatchEvent(new CustomEvent("hass-more-info", {
				detail: { entityId: w },
				bubbles: !0,
				composed: !0
			}));
		}
		function aw(w) {
			return {
				roomId: w.roomId,
				roomName: w.roomName || w.roomId,
				x: w.x,
				y: w.y,
				worldX: w.worldX,
				worldY: w.worldY,
				worldZ: w.worldZ
			};
		}
		function ow(w) {
			(K.value ?? document.body).dispatchEvent(new CustomEvent("hass-action", {
				detail: {
					config: w,
					action: "tap"
				},
				bubbles: !0,
				composed: !0
			}));
		}
		async function sw(w) {
			let T = O.value;
			T?.callService && await T.callService("homeassistant", "toggle", {}, { entity_id: w });
		}
		async function cw(w, T) {
			if (T === "toggle") {
				await sw(w.entityId);
				return;
			}
			if (T === "more-info") {
				YC(), iw(w.entityId);
				return;
			}
			T === "popup" ? XC(w.id) : console.warn("[lovelace-3d] Unknown floater action", T, w);
		}
		async function lw(w, T) {
			let O = zC.value;
			if (O) {
				Y.value = T;
				try {
					await cw(O, w);
				} catch (w) {
					console.warn("[lovelace-3d] Floater action failed", O, w);
				} finally {
					Y.value === T && (Y.value = null);
				}
			}
		}
		async function uw() {
			await lw("toggle", "primary");
		}
		async function dw() {
			await lw("more-info", "secondary");
		}
		function fw() {
			if (jC(performance.now()), !q.isMounted()) Object.keys(wS.value).length > 0 && (wS.value = {}), Object.keys(TS.value).length > 0 && (TS.value = {});
			else {
				let w = {};
				for (let T of RS.value) {
					let O = q.projectWorldPoint(T.point.x, T.point.y, T.point.z);
					O && (w[T.id] = O);
				}
				wS.value = w;
				let T = {};
				for (let w of BS.value.sensors) {
					let O = q.projectWorldPoint(w.point.x, w.point.y, w.point.z);
					O && (T[w.id] = O);
				}
				TS.value = T;
			}
		}
		function pw() {
			q.isMounted() && q.updateHeatmap(gC.value);
		}
		function mw() {
			q.isMounted() && q.updateLights(KS.value);
		}
		let hw = computed(() => createRoomsSignature(jS.value)), gw = computed(() => createFloatersSignature(RS.value)), _w = computed(() => createHeatmapSignature(BS.value)), vw = computed(() => createCameraSignature(VS.value)), yw = computed(() => createRendererSignature(HS.value)), bw = computed(() => KS.value.map((w) => `${w.id}|${w.color ?? "default"}|${w.intensity.toFixed(4)}|${w.x.toFixed(4)},${w.y.toFixed(4)},${w.z.toFixed(4)}`).join("||")), xw = computed(() => createFloaterOverlapSignature(US.value));
		return onMounted(() => {
			kS = q.subscribeFrame(fw), watch([
				j,
				hw,
				vw,
				yw
			], ([w]) => {
				if (!K.value || !w) return;
				let T = jS.value;
				q.isMounted() ? (q.updateRooms(T), q.updateCamera(VS.value), q.updateRenderer(HS.value)) : q.mount(K.value, T, {
					onRoomClick: nw,
					camera: VS.value,
					renderer: HS.value,
					lights: KS.value
				}), mw(), fw(), pw();
			}, { immediate: !0 });
		}), onBeforeUnmount(() => {
			kS?.(), kS = null;
		}), watch(hw, () => {
			X.value && (jS.value.some((w) => w.id === X.value?.roomId) || qC());
		}), watch(gw, () => {
			JC(), fw(), DS.value !== "all" && (RS.value.some((w) => w.group === DS.value) || (DS.value = "all")), Q.value && (zS.value[Q.value] || YC());
		}), watch(xw, () => {
			JC();
		}), watch(bw, () => {
			mw();
		}), watch(_C, (w) => {
			w && (YC(), JC());
		}), watch(_w, () => {
			let w = BS.value;
			if (!w.enabled || w.sensors.length === 0) {
				ES.value = !1, OS = !1, pw();
				return;
			}
			OS ||= (ES.value = w.defaultVisible, !0), pw();
		}, { immediate: !0 }), watch(gC, () => {
			pw();
		}), watch(() => vC.value.length, (w) => {
			w > 0 || (DS.value !== "all" && (DS.value = "all"), ES.value &&= !1);
		}, { immediate: !0 }), (w, T) => {
			let O = resolveComponent("ha-icon"), U = resolveComponent("ha-card");
			return openBlock(), createBlock(U, {
				class: normalizeClass(["ha-card-reset", { "card-transparent": HS.value.cardTransparent }]),
				style: normalizeStyle(GS.value)
			}, {
				default: withCtx(() => [createBaseVNode("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [createBaseVNode("div", _hoisted_3, [
					createBaseVNode("div", {
						ref_key: "threeMount",
						ref: K,
						class: "three-surface",
						"aria-label": "Three.js preview"
					}, null, 512),
					RC.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_4, [(openBlock(!0), createElementBlock(Fragment, null, renderList(RC.value, (w) => (openBlock(), createBlock(FloaterButton_default, {
						key: w.id,
						x: w.x,
						y: w.y,
						icon: w.icon,
						label: w.label,
						"is-on": w.isOn,
						"accent-color": w.accentColor,
						"is-active": w.isActive,
						"is-group": w.isGroup,
						"group-count": w.groupCount,
						"value-text": w.valueText,
						onPress: (T) => QC(w),
						onLongPress: (T) => $C(w)
					}, null, 8, [
						"x",
						"y",
						"icon",
						"label",
						"is-on",
						"accent-color",
						"is-active",
						"is-group",
						"group-count",
						"value-text",
						"onPress",
						"onLongPress"
					]))), 128))])) : createCommentVNode("", !0),
					vC.value.length > 0 ? (openBlock(), createElementBlock("div", {
						key: 1,
						class: normalizeClass(["navbar-layer", [yC.value, bC.value]])
					}, [createBaseVNode("nav", {
						class: "control-navbar",
						style: normalizeStyle(xC.value),
						"aria-label": "Floorplan controls"
					}, [(openBlock(!0), createElementBlock(Fragment, null, renderList(vC.value, (w) => (openBlock(), createElementBlock("button", {
						key: w.id,
						class: normalizeClass(["navbar-btn", { active: SC(w) }]),
						type: "button",
						"aria-label": w.label,
						onClick: (T) => CC(w)
					}, [createVNode(O, {
						class: "navbar-icon",
						icon: w.icon
					}, null, 8, ["icon"]), createBaseVNode("span", _hoisted_6, toDisplayString(w.label), 1)], 10, _hoisted_5))), 128))], 4)], 2)) : createCommentVNode("", !0),
					zC.value && BC.value ? (openBlock(), createElementBlock("div", {
						key: 2,
						class: "floater-popup-layer",
						onPointerdown: withModifiers(YC, ["self"])
					}, [createVNode(FloaterEntityPopup_default, {
						name: HC.value,
						"entity-id": zC.value.entityId,
						icon: UC.value,
						"state-text": WC.value,
						x: BC.value.x,
						y: BC.value.y,
						"primary-label": GC.value,
						"secondary-label": KC.value,
						"running-action": Y.value,
						onClose: YC,
						onPrimary: uw,
						onSecondary: dw
					}, null, 8, [
						"name",
						"entity-id",
						"icon",
						"state-text",
						"x",
						"y",
						"primary-label",
						"secondary-label",
						"running-action"
					])], 32)) : createCommentVNode("", !0),
					unref(j) ? createCommentVNode("", !0) : (openBlock(), createElementBlock("div", _hoisted_7, [unref(F) ? (openBlock(), createElementBlock("div", _hoisted_8)) : createCommentVNode("", !0), createBaseVNode("span", null, toDisplayString(unref(F) ? "Loading area registry..." : "Waiting for area registry..."), 1)])),
					X.value && LS.value ? (openBlock(), createElementBlock("div", {
						key: 4,
						class: "room-popup-layer",
						onPointerdown: withModifiers(qC, ["self"])
					}, [createVNode(RoomActionPopup_default, {
						room: LS.value,
						actions: IS.value,
						x: X.value.x,
						y: X.value.y,
						"running-action-id": J.value,
						onClose: qC,
						onRun: rw
					}, null, 8, [
						"room",
						"actions",
						"x",
						"y",
						"running-action-id"
					])], 32)) : createCommentVNode("", !0)
				])])])]),
				_: 1
			}, 8, ["class", "style"]);
		};
	}
}), style_default = ":host,.ha-card-reset{display:block}.ha-card-reset.card-transparent{--ha-card-background:transparent;--ha-card-box-shadow:none;--ha-card-border-width:0}.wrap{padding:12px}.tilt{width:100%}.content{gap:10px;padding:12px;display:grid}.three-surface{aspect-ratio:16/10;background:var(--three-surface-bg,color-mix(in srgb,var(--secondary-background-color)90%,transparent));border:1px solid var(--three-surface-border,color-mix(in srgb,var(--divider-color)60%,transparent));border-radius:12px;width:100%;min-height:260px;max-height:70vh;overflow:hidden}.ha-card-reset.card-transparent .three-surface{--three-surface-bg:transparent;--three-surface-border:transparent}.three-surface canvas{width:100%;height:100%;display:block}.three-shell{border-radius:12px;position:relative;overflow:hidden}.floater-layer{z-index:2;pointer-events:none;position:absolute;inset:0}.floater-popup-layer{z-index:5;position:absolute;inset:0}.navbar-layer{z-index:3;pointer-events:none;position:absolute;inset:0}.control-navbar{border:1px solid var(--navbar-border,#ffffff29);background:var(--navbar-bg,#10131a9e);-webkit-backdrop-filter:blur(var(--navbar-blur,10px));backdrop-filter:blur(var(--navbar-blur,10px));pointer-events:auto;border-radius:20px;gap:8px;padding:10px 8px;display:flex;position:absolute;box-shadow:0 10px 28px #00000052}.navbar-layer.vertical .control-navbar{flex-direction:column;align-items:center;width:fit-content}.navbar-layer.horizontal .control-navbar{flex-direction:row;align-items:stretch}.navbar-layer.pos-left .control-navbar{left:var(--navbar-offset-x,14px);top:50%;transform:translateY(-50%)}.navbar-layer.pos-right .control-navbar{right:var(--navbar-offset-x,14px);top:50%;transform:translateY(-50%)}.navbar-layer.pos-top .control-navbar{left:50%;top:var(--navbar-offset-y,16px);transform:translate(-50%)}.navbar-layer.pos-bottom .control-navbar{left:50%;bottom:var(--navbar-offset-y,16px);transform:translate(-50%)}.navbar-layer.pos-top-left .control-navbar{left:var(--navbar-offset-x,14px);top:var(--navbar-offset-y,16px)}.navbar-layer.pos-top-right .control-navbar{right:var(--navbar-offset-x,14px);top:var(--navbar-offset-y,16px)}.navbar-layer.pos-bottom-left .control-navbar{left:var(--navbar-offset-x,14px);bottom:var(--navbar-offset-y,16px)}.navbar-layer.pos-bottom-right .control-navbar{right:var(--navbar-offset-x,14px);bottom:var(--navbar-offset-y,16px)}.navbar-btn{cursor:pointer;width:66px;min-height:58px;color:var(--navbar-text,var(--primary-text-color));background:0 0;border:0;border-radius:14px;justify-items:center;gap:6px;padding:8px 6px;display:grid}.navbar-btn:hover,.navbar-btn:focus-visible{background:#ffffff14;outline:none}.navbar-btn.active{background:#ffffff24}.navbar-btn .navbar-icon{--mdc-icon-size:22px;color:var(--navbar-icon,var(--primary-text-color))}.navbar-btn .navbar-label{text-align:center;font-size:11px;font-weight:600;line-height:1.1}.floater-btn{transform:translate3d(var(--floater-x),var(--floater-y),0)translate(-50%,-50%);will-change:transform;border:1px solid color-mix(in srgb,var(--primary-color)55%,transparent);width:42px;height:42px;color:var(--primary-text-color);background:color-mix(in srgb,var(--card-background-color)76%,var(--primary-color)24%);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);cursor:pointer;pointer-events:auto;border-radius:999px;place-items:center;display:grid;position:absolute;top:0;left:0;box-shadow:0 8px 24px #00000052}.floater-btn.value{border-radius:999px;justify-content:center;align-items:center;gap:6px;width:auto;min-width:66px;height:34px;padding:0 10px;display:inline-flex}.floater-btn.group{border-color:color-mix(in srgb,var(--primary-color)80%,transparent);background:color-mix(in srgb,var(--card-background-color)18%,var(--primary-color)82%)}.floater-btn.on{border-color:color-mix(in srgb,var(--floater-accent,var(--primary-color))70%,transparent);background:color-mix(in srgb,var(--card-background-color)30%,var(--floater-accent,var(--primary-color))70%);box-shadow:0 0 0 1px color-mix(in srgb,var(--floater-accent,var(--primary-color))55%,transparent),0 10px 24px #00000061}.floater-btn.active{border-color:color-mix(in srgb,var(--primary-color)80%,transparent);box-shadow:0 0 0 2px color-mix(in srgb,var(--primary-color)30%,transparent),0 10px 24px #00000059}.floater-btn.active.on{border-color:color-mix(in srgb,var(--floater-accent,var(--primary-color))85%,transparent);box-shadow:0 0 0 2px color-mix(in srgb,var(--floater-accent,var(--primary-color))35%,transparent),0 12px 26px #0006}.floater-btn .floater-icon{--mdc-icon-size:20px}.floater-btn.value .floater-icon{--mdc-icon-size:16px}.floater-btn .floater-value{font-size:12px;font-weight:700;line-height:1}.floater-btn .floater-count{min-width:18px;height:18px;color:var(--primary-text-color);background:color-mix(in srgb,var(--card-background-color)16%,var(--primary-color)84%);border:1px solid color-mix(in srgb,var(--primary-color)60%,transparent);border-radius:999px;place-items:center;padding:0 4px;font-size:10px;font-weight:700;line-height:1;display:grid;position:absolute;top:-5px;right:-5px}.floater-popup{left:clamp(12px,var(--popup-x),calc(100% - 12px));top:clamp(12px,var(--popup-y),calc(100% - 12px));transform:translate(-50%,var(--popup-shift-y));border:1px solid color-mix(in srgb,var(--divider-color)70%,transparent);background:color-mix(in srgb,var(--card-background-color)93%,transparent);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);z-index:4;border-radius:12px;min-width:230px;max-width:min(320px,100% - 24px);padding:10px;position:absolute;box-shadow:0 12px 30px #00000059}.floater-popup .close-btn{float:right;cursor:pointer;color:var(--secondary-text-color);background:color-mix(in srgb,var(--secondary-background-color)70%,transparent);border:0;border-radius:8px;padding:4px 8px;font-size:12px}.floater-popup .floater-head{align-items:center;gap:8px;margin-bottom:6px;display:flex}.floater-popup .floater-icon{--mdc-icon-size:20px}.floater-popup .name{font-size:14px;font-weight:700}.floater-popup .entity{opacity:.75;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,monospace;font-size:11px}.floater-popup .state{color:var(--secondary-text-color);margin-bottom:10px;font-size:13px}.floater-popup .actions{gap:8px;display:grid}.floater-popup .action-btn{border:1px solid color-mix(in srgb,var(--primary-color)45%,transparent);cursor:pointer;text-align:left;width:100%;color:var(--primary-text-color);background:color-mix(in srgb,var(--primary-color)16%,transparent);border-radius:10px;padding:8px 10px;font-size:13px;font-weight:600}.floater-popup .action-btn.secondary{border-color:color-mix(in srgb,var(--divider-color)75%,transparent);background:color-mix(in srgb,var(--secondary-background-color)75%,transparent)}.floater-popup .action-btn:disabled{opacity:.6;cursor:wait}.room-popup-layer{z-index:6;position:absolute;inset:0}.room-popup{left:clamp(12px,var(--popup-x),calc(100% - 12px));top:clamp(12px,var(--popup-y),calc(100% - 12px));transform:translate(-50%,var(--popup-shift-y));border:1px solid color-mix(in srgb,var(--divider-color)70%,transparent);background:color-mix(in srgb,var(--card-background-color)92%,transparent);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);z-index:4;border-radius:12px;min-width:210px;max-width:min(300px,100% - 24px);padding:10px;position:absolute;box-shadow:0 12px 30px #00000059}.room-popup .close-btn{float:right;cursor:pointer;color:var(--secondary-text-color);background:color-mix(in srgb,var(--secondary-background-color)70%,transparent);border:0;border-radius:8px;padding:4px 8px;font-size:12px}.room-popup .room-name{margin:2px 0;font-size:14px;font-weight:700}.room-popup .room-id{opacity:.75;margin-bottom:10px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,monospace;font-size:11px}.room-popup .actions{gap:8px;display:grid}.room-popup .action-btn{border:1px solid color-mix(in srgb,var(--primary-color)45%,transparent);cursor:pointer;text-align:left;width:100%;color:var(--primary-text-color);background:color-mix(in srgb,var(--primary-color)16%,transparent);border-radius:10px;padding:8px 10px;font-size:13px;font-weight:600}.room-popup .action-btn:disabled{opacity:.6;cursor:wait}.room-popup .empty{opacity:.8;font-size:12px}.loader-overlay{background:color-mix(in srgb,var(--card-background-color)72%,transparent);color:var(--secondary-text-color);z-index:1;justify-content:center;align-items:center;gap:10px;font-weight:600;display:flex;position:absolute;inset:0}.loader-spinner{border:3px solid color-mix(in srgb,var(--primary-color)40%,transparent);border-top-color:var(--primary-color);border-radius:50%;width:24px;height:24px;animation:.85s linear infinite spin}@media (max-width:760px){.navbar-layer.vertical .control-navbar{width:82px;padding:8px 6px}.navbar-btn{gap:5px;width:66px;min-height:56px}.navbar-btn .navbar-label{font-size:10px}}@keyframes spin{to{transform:rotate(360deg)}}", t$1, e$1, s$2, o$3, n$1, r$1, i$1, S$1, c$1, init_css_tag = __esmMin((() => {
	t$1 = globalThis, e$1 = t$1.ShadowRoot && (t$1.ShadyCSS === void 0 || t$1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$3 = /* @__PURE__ */ new WeakMap(), n$1 = class {
		constructor(w, T, O) {
			if (this._$cssResult$ = !0, O !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
			this.cssText = w, this.t = T;
		}
		get styleSheet() {
			let w = this.o, T = this.t;
			if (e$1 && w === void 0) {
				let O = T !== void 0 && T.length === 1;
				O && (w = o$3.get(T)), w === void 0 && ((this.o = w = new CSSStyleSheet()).replaceSync(this.cssText), O && o$3.set(T, w));
			}
			return w;
		}
		toString() {
			return this.cssText;
		}
	}, r$1 = (w) => new n$1(typeof w == "string" ? w : w + "", void 0, s$2), i$1 = (w, ...T) => new n$1(w.length === 1 ? w[0] : T.reduce((T, O, j) => T + ((w) => {
		if (!0 === w._$cssResult$) return w.cssText;
		if (typeof w == "number") return w;
		throw Error("Value passed to 'css' function must be a 'css' function result: " + w + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
	})(O) + w[j + 1], w[0]), w, s$2), S$1 = (w, T) => {
		if (e$1) w.adoptedStyleSheets = T.map((w) => w instanceof CSSStyleSheet ? w : w.styleSheet);
		else for (let O of T) {
			let T = document.createElement("style"), j = t$1.litNonce;
			j !== void 0 && T.setAttribute("nonce", j), T.textContent = O.cssText, w.appendChild(T);
		}
	}, c$1 = e$1 ? (w) => w : (w) => w instanceof CSSStyleSheet ? ((w) => {
		let T = "";
		for (let O of w.cssRules) T += O.cssText;
		return r$1(T);
	})(w) : w;
})), i$3, e$2, h$1, r$2, o$2, n$2, a$1, c$2, l$1, p$1, d$1, u$1, f$1, b$1, y, init_reactive_element = __esmMin((() => {
	init_css_tag(), {is: i$3, defineProperty: e$2, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$2, getOwnPropertySymbols: o$2, getPrototypeOf: n$2} = Object, a$1 = globalThis, c$2 = a$1.trustedTypes, l$1 = c$2 ? c$2.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (w, T) => w, u$1 = {
		toAttribute(w, T) {
			switch (T) {
				case Boolean:
					w = w ? l$1 : null;
					break;
				case Object:
				case Array: w = w == null ? w : JSON.stringify(w);
			}
			return w;
		},
		fromAttribute(w, T) {
			let O = w;
			switch (T) {
				case Boolean:
					O = w !== null;
					break;
				case Number:
					O = w === null ? null : Number(w);
					break;
				case Object:
				case Array: try {
					O = JSON.parse(w);
				} catch {
					O = null;
				}
			}
			return O;
		}
	}, f$1 = (w, T) => !i$3(w, T), b$1 = {
		attribute: !0,
		type: String,
		converter: u$1,
		reflect: !1,
		useDefault: !1,
		hasChanged: f$1
	}, Symbol.metadata ??= Symbol("metadata"), a$1.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap(), y = class extends HTMLElement {
		static addInitializer(w) {
			this._$Ei(), (this.l ??= []).push(w);
		}
		static get observedAttributes() {
			return this.finalize(), this._$Eh && [...this._$Eh.keys()];
		}
		static createProperty(w, T = b$1) {
			if (T.state && (T.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(w) && ((T = Object.create(T)).wrapped = !0), this.elementProperties.set(w, T), !T.noAccessor) {
				let O = Symbol(), j = this.getPropertyDescriptor(w, O, T);
				j !== void 0 && e$2(this.prototype, w, j);
			}
		}
		static getPropertyDescriptor(w, T, O) {
			let { get: j, set: F } = h$1(this.prototype, w) ?? {
				get() {
					return this[T];
				},
				set(w) {
					this[T] = w;
				}
			};
			return {
				get: j,
				set(T) {
					let U = j?.call(this);
					F?.call(this, T), this.requestUpdate(w, U, O);
				},
				configurable: !0,
				enumerable: !0
			};
		}
		static getPropertyOptions(w) {
			return this.elementProperties.get(w) ?? b$1;
		}
		static _$Ei() {
			if (this.hasOwnProperty(d$1("elementProperties"))) return;
			let w = n$2(this);
			w.finalize(), w.l !== void 0 && (this.l = [...w.l]), this.elementProperties = new Map(w.elementProperties);
		}
		static finalize() {
			if (this.hasOwnProperty(d$1("finalized"))) return;
			if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
				let w = this.properties, T = [...r$2(w), ...o$2(w)];
				for (let O of T) this.createProperty(O, w[O]);
			}
			let w = this[Symbol.metadata];
			if (w !== null) {
				let T = litPropertyMetadata.get(w);
				if (T !== void 0) for (let [w, O] of T) this.elementProperties.set(w, O);
			}
			this._$Eh = /* @__PURE__ */ new Map();
			for (let [w, T] of this.elementProperties) {
				let O = this._$Eu(w, T);
				O !== void 0 && this._$Eh.set(O, w);
			}
			this.elementStyles = this.finalizeStyles(this.styles);
		}
		static finalizeStyles(w) {
			let T = [];
			if (Array.isArray(w)) {
				let O = new Set(w.flat(Infinity).reverse());
				for (let w of O) T.unshift(c$1(w));
			} else w !== void 0 && T.push(c$1(w));
			return T;
		}
		static _$Eu(w, T) {
			let O = T.attribute;
			return !1 === O ? void 0 : typeof O == "string" ? O : typeof w == "string" ? w.toLowerCase() : void 0;
		}
		constructor() {
			super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
		}
		_$Ev() {
			this._$ES = new Promise((w) => this.enableUpdating = w), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((w) => w(this));
		}
		addController(w) {
			(this._$EO ??= /* @__PURE__ */ new Set()).add(w), this.renderRoot !== void 0 && this.isConnected && w.hostConnected?.();
		}
		removeController(w) {
			this._$EO?.delete(w);
		}
		_$E_() {
			let w = /* @__PURE__ */ new Map(), T = this.constructor.elementProperties;
			for (let O of T.keys()) this.hasOwnProperty(O) && (w.set(O, this[O]), delete this[O]);
			w.size > 0 && (this._$Ep = w);
		}
		createRenderRoot() {
			let w = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
			return S$1(w, this.constructor.elementStyles), w;
		}
		connectedCallback() {
			this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((w) => w.hostConnected?.());
		}
		enableUpdating(w) {}
		disconnectedCallback() {
			this._$EO?.forEach((w) => w.hostDisconnected?.());
		}
		attributeChangedCallback(w, T, O) {
			this._$AK(w, O);
		}
		_$ET(w, T) {
			let O = this.constructor.elementProperties.get(w), j = this.constructor._$Eu(w, O);
			if (j !== void 0 && !0 === O.reflect) {
				let F = (O.converter?.toAttribute === void 0 ? u$1 : O.converter).toAttribute(T, O.type);
				this._$Em = w, F == null ? this.removeAttribute(j) : this.setAttribute(j, F), this._$Em = null;
			}
		}
		_$AK(w, T) {
			let O = this.constructor, j = O._$Eh.get(w);
			if (j !== void 0 && this._$Em !== j) {
				let w = O.getPropertyOptions(j), F = typeof w.converter == "function" ? { fromAttribute: w.converter } : w.converter?.fromAttribute === void 0 ? u$1 : w.converter;
				this._$Em = j;
				let U = F.fromAttribute(T, w.type);
				this[j] = U ?? this._$Ej?.get(j) ?? U, this._$Em = null;
			}
		}
		requestUpdate(w, T, O, j = !1, F) {
			if (w !== void 0) {
				let U = this.constructor;
				if (!1 === j && (F = this[w]), O ??= U.getPropertyOptions(w), !((O.hasChanged ?? f$1)(F, T) || O.useDefault && O.reflect && F === this._$Ej?.get(w) && !this.hasAttribute(U._$Eu(w, O)))) return;
				this.C(w, T, O);
			}
			!1 === this.isUpdatePending && (this._$ES = this._$EP());
		}
		C(w, T, { useDefault: O, reflect: j, wrapped: F }, U) {
			O && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(w) && (this._$Ej.set(w, U ?? T ?? this[w]), !0 !== F || U !== void 0) || (this._$AL.has(w) || (this.hasUpdated || O || (T = void 0), this._$AL.set(w, T)), !0 === j && this._$Em !== w && (this._$Eq ??= /* @__PURE__ */ new Set()).add(w));
		}
		async _$EP() {
			this.isUpdatePending = !0;
			try {
				await this._$ES;
			} catch (w) {
				Promise.reject(w);
			}
			let w = this.scheduleUpdate();
			return w != null && await w, !this.isUpdatePending;
		}
		scheduleUpdate() {
			return this.performUpdate();
		}
		performUpdate() {
			if (!this.isUpdatePending) return;
			if (!this.hasUpdated) {
				if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
					for (let [w, T] of this._$Ep) this[w] = T;
					this._$Ep = void 0;
				}
				let w = this.constructor.elementProperties;
				if (w.size > 0) for (let [T, O] of w) {
					let { wrapped: w } = O, j = this[T];
					!0 !== w || this._$AL.has(T) || j === void 0 || this.C(T, void 0, O, j);
				}
			}
			let w = !1, T = this._$AL;
			try {
				w = this.shouldUpdate(T), w ? (this.willUpdate(T), this._$EO?.forEach((w) => w.hostUpdate?.()), this.update(T)) : this._$EM();
			} catch (T) {
				throw w = !1, this._$EM(), T;
			}
			w && this._$AE(T);
		}
		willUpdate(w) {}
		_$AE(w) {
			this._$EO?.forEach((w) => w.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(w)), this.updated(w);
		}
		_$EM() {
			this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
		}
		get updateComplete() {
			return this.getUpdateComplete();
		}
		getUpdateComplete() {
			return this._$ES;
		}
		shouldUpdate(w) {
			return !0;
		}
		update(w) {
			this._$Eq &&= this._$Eq.forEach((w) => this._$ET(w, this[w])), this._$EM();
		}
		updated(w) {}
		firstUpdated(w) {}
	}, y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1?.({ ReactiveElement: y }), (a$1.reactiveElementVersions ??= []).push("2.1.2");
}));
function V(w, T) {
	if (!u(w) || !w.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return e === void 0 ? T : e.createHTML(T);
}
function M(w, T, O = w, j) {
	if (T === E) return T;
	let F = j === void 0 ? O._$Cl : O._$Co?.[j], U = a(T) ? void 0 : T._$litDirective$;
	return F?.constructor !== U && (F?._$AO?.(!1), U === void 0 ? F = void 0 : (F = new U(w), F._$AT(w, O, j)), j === void 0 ? O._$Cl = F : (O._$Co ??= [])[j] = F), F !== void 0 && (T = M(w, F._$AS(w, T.values), F, j)), T;
}
var t, i$2, s$1, e, h, o$1, n, r, l, c, a, u, d, f, v, _, m, p, g, $, y$1, x, b, E, A, C, P, N, S, R, k, H, I, L, z, Z, B, D, init_lit_html = __esmMin((() => {
	t = globalThis, i$2 = (w) => w, s$1 = t.trustedTypes, e = s$1 ? s$1.createPolicy("lit-html", { createHTML: (w) => w }) : void 0, h = "$lit$", o$1 = `lit$${Math.random().toFixed(9).slice(2)}$`, n = "?" + o$1, r = `<${n}>`, l = document, c = () => l.createComment(""), a = (w) => w === null || typeof w != "object" && typeof w != "function", u = Array.isArray, d = (w) => u(w) || typeof w?.[Symbol.iterator] == "function", f = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y$1 = /^(?:script|style|textarea|title)$/i, x = (w) => (T, ...O) => ({
		_$litType$: w,
		strings: T,
		values: O
	}), b = x(1), x(2), x(3), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l.createTreeWalker(l, 129), N = (w, T) => {
		let O = w.length - 1, j = [], F, U = T === 2 ? "<svg>" : T === 3 ? "<math>" : "", W = v;
		for (let T = 0; T < O; T++) {
			let O = w[T], G, K, q = -1, J = 0;
			for (; J < O.length && (W.lastIndex = J, K = W.exec(O), K !== null);) J = W.lastIndex, W === v ? K[1] === "!--" ? W = _ : K[1] === void 0 ? K[2] === void 0 ? K[3] !== void 0 && (W = p) : (y$1.test(K[2]) && (F = RegExp("</" + K[2], "g")), W = p) : W = m : W === p ? K[0] === ">" ? (W = F ?? v, q = -1) : K[1] === void 0 ? q = -2 : (q = W.lastIndex - K[2].length, G = K[1], W = K[3] === void 0 ? p : K[3] === "\"" ? $ : g) : W === $ || W === g ? W = p : W === _ || W === m ? W = v : (W = p, F = void 0);
			let Y = W === p && w[T + 1].startsWith("/>") ? " " : "";
			U += W === v ? O + r : q >= 0 ? (j.push(G), O.slice(0, q) + h + O.slice(q) + o$1 + Y) : O + o$1 + (q === -2 ? T : Y);
		}
		return [V(w, U + (w[O] || "<?>") + (T === 2 ? "</svg>" : T === 3 ? "</math>" : "")), j];
	}, S = class w {
		constructor({ strings: T, _$litType$: O }, j) {
			let F;
			this.parts = [];
			let U = 0, W = 0, G = T.length - 1, K = this.parts, [q, J] = N(T, O);
			if (this.el = w.createElement(q, j), P.currentNode = this.el.content, O === 2 || O === 3) {
				let w = this.el.content.firstChild;
				w.replaceWith(...w.childNodes);
			}
			for (; (F = P.nextNode()) !== null && K.length < G;) {
				if (F.nodeType === 1) {
					if (F.hasAttributes()) for (let w of F.getAttributeNames()) if (w.endsWith(h)) {
						let T = J[W++], O = F.getAttribute(w).split(o$1), j = /([.?@])?(.*)/.exec(T);
						K.push({
							type: 1,
							index: U,
							name: j[2],
							strings: O,
							ctor: j[1] === "." ? I : j[1] === "?" ? L : j[1] === "@" ? z : H
						}), F.removeAttribute(w);
					} else w.startsWith(o$1) && (K.push({
						type: 6,
						index: U
					}), F.removeAttribute(w));
					if (y$1.test(F.tagName)) {
						let w = F.textContent.split(o$1), T = w.length - 1;
						if (T > 0) {
							F.textContent = s$1 ? s$1.emptyScript : "";
							for (let O = 0; O < T; O++) F.append(w[O], c()), P.nextNode(), K.push({
								type: 2,
								index: ++U
							});
							F.append(w[T], c());
						}
					}
				} else if (F.nodeType === 8) if (F.data === n) K.push({
					type: 2,
					index: U
				});
				else {
					let w = -1;
					for (; (w = F.data.indexOf(o$1, w + 1)) !== -1;) K.push({
						type: 7,
						index: U
					}), w += o$1.length - 1;
				}
				U++;
			}
		}
		static createElement(w, T) {
			let O = l.createElement("template");
			return O.innerHTML = w, O;
		}
	}, R = class {
		constructor(w, T) {
			this._$AV = [], this._$AN = void 0, this._$AD = w, this._$AM = T;
		}
		get parentNode() {
			return this._$AM.parentNode;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		u(w) {
			let { el: { content: T }, parts: O } = this._$AD, j = (w?.creationScope ?? l).importNode(T, !0);
			P.currentNode = j;
			let F = P.nextNode(), U = 0, W = 0, G = O[0];
			for (; G !== void 0;) {
				if (U === G.index) {
					let T;
					G.type === 2 ? T = new k(F, F.nextSibling, this, w) : G.type === 1 ? T = new G.ctor(F, G.name, G.strings, this, w) : G.type === 6 && (T = new Z(F, this, w)), this._$AV.push(T), G = O[++W];
				}
				U !== G?.index && (F = P.nextNode(), U++);
			}
			return P.currentNode = l, j;
		}
		p(w) {
			let T = 0;
			for (let O of this._$AV) O !== void 0 && (O.strings === void 0 ? O._$AI(w[T]) : (O._$AI(w, O, T), T += O.strings.length - 2)), T++;
		}
	}, k = class w {
		get _$AU() {
			return this._$AM?._$AU ?? this._$Cv;
		}
		constructor(w, T, O, j) {
			this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = w, this._$AB = T, this._$AM = O, this.options = j, this._$Cv = j?.isConnected ?? !0;
		}
		get parentNode() {
			let w = this._$AA.parentNode, T = this._$AM;
			return T !== void 0 && w?.nodeType === 11 && (w = T.parentNode), w;
		}
		get startNode() {
			return this._$AA;
		}
		get endNode() {
			return this._$AB;
		}
		_$AI(w, T = this) {
			w = M(this, w, T), a(w) ? w === A || w == null || w === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : w !== this._$AH && w !== E && this._(w) : w._$litType$ === void 0 ? w.nodeType === void 0 ? d(w) ? this.k(w) : this._(w) : this.T(w) : this.$(w);
		}
		O(w) {
			return this._$AA.parentNode.insertBefore(w, this._$AB);
		}
		T(w) {
			this._$AH !== w && (this._$AR(), this._$AH = this.O(w));
		}
		_(w) {
			this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = w : this.T(l.createTextNode(w)), this._$AH = w;
		}
		$(w) {
			let { values: T, _$litType$: O } = w, j = typeof O == "number" ? this._$AC(w) : (O.el === void 0 && (O.el = S.createElement(V(O.h, O.h[0]), this.options)), O);
			if (this._$AH?._$AD === j) this._$AH.p(T);
			else {
				let w = new R(j, this), O = w.u(this.options);
				w.p(T), this.T(O), this._$AH = w;
			}
		}
		_$AC(w) {
			let T = C.get(w.strings);
			return T === void 0 && C.set(w.strings, T = new S(w)), T;
		}
		k(T) {
			u(this._$AH) || (this._$AH = [], this._$AR());
			let O = this._$AH, j, F = 0;
			for (let U of T) F === O.length ? O.push(j = new w(this.O(c()), this.O(c()), this, this.options)) : j = O[F], j._$AI(U), F++;
			F < O.length && (this._$AR(j && j._$AB.nextSibling, F), O.length = F);
		}
		_$AR(w = this._$AA.nextSibling, T) {
			for (this._$AP?.(!1, !0, T); w !== this._$AB;) {
				let T = i$2(w).nextSibling;
				i$2(w).remove(), w = T;
			}
		}
		setConnected(w) {
			this._$AM === void 0 && (this._$Cv = w, this._$AP?.(w));
		}
	}, H = class {
		get tagName() {
			return this.element.tagName;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		constructor(w, T, O, j, F) {
			this.type = 1, this._$AH = A, this._$AN = void 0, this.element = w, this.name = T, this._$AM = j, this.options = F, O.length > 2 || O[0] !== "" || O[1] !== "" ? (this._$AH = Array(O.length - 1).fill(/* @__PURE__ */ new String()), this.strings = O) : this._$AH = A;
		}
		_$AI(w, T = this, O, j) {
			let F = this.strings, U = !1;
			if (F === void 0) w = M(this, w, T, 0), U = !a(w) || w !== this._$AH && w !== E, U && (this._$AH = w);
			else {
				let j = w, W, G;
				for (w = F[0], W = 0; W < F.length - 1; W++) G = M(this, j[O + W], T, W), G === E && (G = this._$AH[W]), U ||= !a(G) || G !== this._$AH[W], G === A ? w = A : w !== A && (w += (G ?? "") + F[W + 1]), this._$AH[W] = G;
			}
			U && !j && this.j(w);
		}
		j(w) {
			w === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, w ?? "");
		}
	}, I = class extends H {
		constructor() {
			super(...arguments), this.type = 3;
		}
		j(w) {
			this.element[this.name] = w === A ? void 0 : w;
		}
	}, L = class extends H {
		constructor() {
			super(...arguments), this.type = 4;
		}
		j(w) {
			this.element.toggleAttribute(this.name, !!w && w !== A);
		}
	}, z = class extends H {
		constructor(w, T, O, j, F) {
			super(w, T, O, j, F), this.type = 5;
		}
		_$AI(w, T = this) {
			if ((w = M(this, w, T, 0) ?? A) === E) return;
			let O = this._$AH, j = w === A && O !== A || w.capture !== O.capture || w.once !== O.once || w.passive !== O.passive, F = w !== A && (O === A || j);
			j && this.element.removeEventListener(this.name, this, O), F && this.element.addEventListener(this.name, this, w), this._$AH = w;
		}
		handleEvent(w) {
			typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, w) : this._$AH.handleEvent(w);
		}
	}, Z = class {
		constructor(w, T, O) {
			this.element = w, this.type = 6, this._$AN = void 0, this._$AM = T, this.options = O;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		_$AI(w) {
			M(this, w);
		}
	}, B = t.litHtmlPolyfillSupport, B?.(S, k), (t.litHtmlVersions ??= []).push("3.3.2"), D = (w, T, O) => {
		let j = O?.renderBefore ?? T, F = j._$litPart$;
		if (F === void 0) {
			let w = O?.renderBefore ?? null;
			j._$litPart$ = F = new k(T.insertBefore(c(), w), w, void 0, O ?? {});
		}
		return F._$AI(w), F;
	};
})), s, i, o, init_lit_element = __esmMin((() => {
	init_reactive_element(), init_reactive_element(), init_lit_html(), init_lit_html(), s = globalThis, i = class extends y {
		constructor() {
			super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
		}
		createRenderRoot() {
			let w = super.createRenderRoot();
			return this.renderOptions.renderBefore ??= w.firstChild, w;
		}
		update(w) {
			let T = this.render();
			this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(w), this._$Do = D(T, this.renderRoot, this.renderOptions);
		}
		connectedCallback() {
			super.connectedCallback(), this._$Do?.setConnected(!0);
		}
		disconnectedCallback() {
			super.disconnectedCallback(), this._$Do?.setConnected(!1);
		}
		render() {
			return E;
		}
	}, i._$litElement$ = !0, i.finalized = !0, s.litElementHydrateSupport?.({ LitElement: i }), o = s.litElementPolyfillSupport, o?.({ LitElement: i }), (s.litElementVersions ??= []).push("4.2.2");
})), init_is_server = __esmMin((() => {})), init_lit = __esmMin((() => {
	init_reactive_element(), init_lit_html(), init_lit_element(), init_is_server();
})), lovelace_3d_editor_exports = /* @__PURE__ */ __export({ ensureLovelace3DEditorDefined: () => ensureLovelace3DEditorDefined });
function ensureLovelace3DEditorDefined() {
	customElements.get(EDITOR_TAG) || customElements.define(EDITOR_TAG, Lovelace3DEditor);
}
var EDITOR_TAG, CARD_TYPE, ROOMS_KEY, FLOATERS_KEY, FLOATER_OVERLAP_KEY, CAMERA_KEY, RENDERER_KEY, HEATMAPS_KEY, NAVBAR_KEY, ACTIONS_KEY, LEGACY_ACTIONS_KEY, ROOMS_ICON, RENDERER_ICON, FLOATERS_ICON, HEATMAPS_ICON, NAVBAR_ICON, ACTIONS_ICON, DEFAULT_HEATMAP_RADIUS, DEFAULT_HEATMAP_WEIGHT, DEFAULT_HEATMAP_OPACITY, DEFAULT_HEATMAP_RESOLUTION, DEFAULT_HEATMAP_BLUR, DEFAULT_CAMERA_POSITION, DEFAULT_CAMERA_ROTATION, DEFAULT_CAMERA_TARGET, DEFAULT_CAMERA_MAX_ZOOM_OUT, DEFAULT_RENDERER_WALL_OPACITY, DEFAULT_RENDERER_WALL_HEIGHT, DEFAULT_RENDERER_GRID_ENABLED, DEFAULT_RENDERER_LIGHT_SIMULATION_ENABLED, DEFAULT_RENDERER_LIGHT_SIMULATION_INTENSITY, DEFAULT_RENDERER_LIGHT_SIMULATION_RANGE, DEFAULT_RENDERER_LIGHT_SIMULATION_DECAY, DEFAULT_RENDERER_CARD_TRANSPARENT, DEFAULT_FLOATER_OVERLAP_DISTANCE, DEFAULT_FLOATER_OVERLAP_MIN_ITEMS, DEFAULT_FLOATER_OVERLAP_EXPAND_DURATION_MS, LOOK_DIRECTION_EPSILON, MIN_CAMERA_PITCH_DEG, MAX_CAMERA_PITCH_DEG, Lovelace3DEditor, init_lovelace_3d_editor = __esmMin((() => {
	init_lit(), EDITOR_TAG = "lovelace-3d-editor", CARD_TYPE = "custom:lovelace-3d", ROOMS_KEY = "rooms", FLOATERS_KEY = "floaters", FLOATER_OVERLAP_KEY = "floater_overlap", CAMERA_KEY = "camera", RENDERER_KEY = "renderer", HEATMAPS_KEY = "heatmaps", NAVBAR_KEY = "navbar", ACTIONS_KEY = "room_popup_actions", LEGACY_ACTIONS_KEY = "room_actions", ROOMS_ICON = "mdi:floor-plan", RENDERER_ICON = "mdi:video-3d", FLOATERS_ICON = "mdi:lightbulb-group", HEATMAPS_ICON = "mdi:thermometer", NAVBAR_ICON = "mdi:dock-left", ACTIONS_ICON = "mdi:gesture-tap-button", DEFAULT_HEATMAP_RADIUS = 2.8, DEFAULT_HEATMAP_WEIGHT = 1, DEFAULT_HEATMAP_OPACITY = .72, DEFAULT_HEATMAP_RESOLUTION = 192, DEFAULT_HEATMAP_BLUR = .55, DEFAULT_CAMERA_POSITION = {
		x: 3,
		y: 6,
		z: 10
	}, DEFAULT_CAMERA_ROTATION = {
		x: -38.66,
		y: 0
	}, DEFAULT_CAMERA_TARGET = {
		x: 3,
		y: 0,
		z: 2.5
	}, DEFAULT_CAMERA_MAX_ZOOM_OUT = 60, DEFAULT_RENDERER_WALL_OPACITY = 1, DEFAULT_RENDERER_WALL_HEIGHT = 2.6, DEFAULT_RENDERER_GRID_ENABLED = !0, DEFAULT_RENDERER_LIGHT_SIMULATION_ENABLED = !0, DEFAULT_RENDERER_LIGHT_SIMULATION_INTENSITY = 2.4, DEFAULT_RENDERER_LIGHT_SIMULATION_RANGE = 4.5, DEFAULT_RENDERER_LIGHT_SIMULATION_DECAY = 1.2, DEFAULT_RENDERER_CARD_TRANSPARENT = !1, DEFAULT_FLOATER_OVERLAP_DISTANCE = 40, DEFAULT_FLOATER_OVERLAP_MIN_ITEMS = 2, DEFAULT_FLOATER_OVERLAP_EXPAND_DURATION_MS = 120, LOOK_DIRECTION_EPSILON = 1e-4, MIN_CAMERA_PITCH_DEG = -89, MAX_CAMERA_PITCH_DEG = 89, Lovelace3DEditor = class extends i {
		constructor(...w) {
			super(...w), this.hass = null, this._config = {}, this._rooms = [], this._floaters = [], this._floaterOverlap = this._createDefaultFloaterOverlapEditorConfig(), this._heatmap = this._createDefaultHeatmapEditorConfig(), this._camera = this._createDefaultCameraEditorConfig(), this._renderer = this._createDefaultRendererEditorConfig(), this._navbar = this._createDefaultNavbarEditorConfig(), this._actions = [], this._actionsError = "", this._cameraConfigured = !1, this._rendererConfigured = !1, this._floaterOverlapConfigured = !1, this._heatmapsConfigured = !1, this._navbarConfigured = !1, this._panelExpanded = {}, this._computeLabel = (w) => {
				switch (w.name) {
					case "entity": return "Entity";
					case "area": return "Area ID";
					case "name": return "Name";
					case "id": return "ID";
					case "label": return "Label";
					case "icon": return "Icon";
					case "group": return "Floater Group";
					case "tap_action": return "Tap Action";
					case "navigation_path": return "Navigation Path";
					case "hold_action": return "Hold Action";
					case "value_attribute": return "Value Attribute";
					case "value": return "Value";
					case "color": return "Color";
					case "enabled": return "Enabled";
					case "default_visible": return "Visible By Default";
					case "min_value": return "Min Value";
					case "max_value": return "Max Value";
					case "radius": return "Radius";
					case "weight": return "Weight";
					case "opacity": return "Opacity";
					case "resolution": return "Resolution";
					case "blur": return "Blur";
					case "position": return "Position";
					case "position_x": return "Position X";
					case "position_y": return "Position Y";
					case "position_z": return "Position Z";
					case "rotation_x": return "Rotation X (deg)";
					case "rotation_y": return "Rotation Y (deg)";
					case "max_zoom_out": return "Max Zoom Out";
					case "wall_color": return "Wall Color";
					case "wall_opacity": return "Wall Opacity";
					case "wall_height": return "Wall Height";
					case "grid_enabled": return "Show Grid";
					case "grid_color": return "Grid Color";
					case "card_transparent": return "Card Transparent";
					case "card_background_color": return "Card Background Color";
					case "transparent": return "Transparent";
					case "background_color": return "Background Color";
					case "light_simulation_enabled": return "Enable Light Simulation";
					case "light_simulation_intensity": return "Light Intensity";
					case "light_simulation_range": return "Light Range";
					case "light_simulation_decay": return "Light Decay";
					case "border_color": return "Border Color";
					case "text_color": return "Text Color";
					case "icon_color": return "Icon Color";
					case "offset_x": return "Offset X";
					case "offset_y": return "Offset Y";
					case "action": return "Action";
					case "floater_group": return "Floater Group";
					case "overlap_enabled": return "Overlap Enabled";
					case "overlap_distance_px": return "Overlap Distance (px)";
					case "overlap_min_items": return "Min Items In Group";
					case "overlap_expand_duration_ms": return "Expand Duration (ms)";
					case "service": return "Service";
					case "close_on_run": return "Close On Run";
					case "x": return "X";
					case "y": return "Y";
					case "z": return "Z";
					default: return w.name ?? "";
				}
			}, this._cameraChanged = (w) => {
				let T = this._asRecord(w.detail?.value) ?? {};
				this._cameraConfigured = !0, this._camera = {
					...this._camera,
					position: {
						x: this._toFinite(T.position_x, this._camera.position.x),
						y: this._toFinite(T.position_y, this._camera.position.y),
						z: this._toFinite(T.position_z, this._camera.position.z)
					},
					rotation: this._normalizeCameraRotation({
						x: this._toFinite(T.rotation_x, this._camera.rotation.x),
						y: this._toFinite(T.rotation_y, this._camera.rotation.y)
					}),
					maxZoomOut: Math.round(this._clamp(this._toFinite(T.max_zoom_out, this._camera.maxZoomOut), 2, 300))
				}, this._emitConfigFromEditor();
			}, this._rendererChanged = (w) => {
				let T = this._asRecord(w.detail?.value) ?? {};
				this._rendererConfigured = !0, this._renderer = {
					...this._renderer,
					wallColor: this._nextTextValue(T, "wall_color", this._renderer.wallColor),
					wallOpacity: this._clamp(this._toFinite(T.wall_opacity, this._renderer.wallOpacity), 0, 1),
					wallHeight: this._clamp(this._toFinite(T.wall_height, this._renderer.wallHeight), .2, 10),
					gridEnabled: this._hasValueKey(T, "grid_enabled") ? T.grid_enabled !== !1 : this._renderer.gridEnabled,
					gridColor: this._nextTextValue(T, "grid_color", this._renderer.gridColor),
					backgroundColor: this._nextTextValue(T, "background_color", this._renderer.backgroundColor),
					lightSimulationEnabled: this._hasValueKey(T, "light_simulation_enabled") ? T.light_simulation_enabled !== !1 : this._renderer.lightSimulationEnabled,
					lightSimulationIntensity: this._clamp(this._toFinite(T.light_simulation_intensity, this._renderer.lightSimulationIntensity), 0, 8),
					lightSimulationRange: this._clamp(this._toFinite(T.light_simulation_range, this._renderer.lightSimulationRange), .5, 20),
					lightSimulationDecay: this._clamp(this._toFinite(T.light_simulation_decay, this._renderer.lightSimulationDecay), 0, 4),
					cardTransparent: this._hasValueKey(T, "card_transparent") ? T.card_transparent !== !1 : this._renderer.cardTransparent,
					cardBackgroundColor: this._nextTextValue(T, "card_background_color", this._renderer.cardBackgroundColor)
				}, this._emitConfigFromEditor();
			}, this._floaterOverlapChanged = (w) => {
				let T = this._asRecord(w.detail?.value) ?? {};
				this._floaterOverlapConfigured = !0, this._floaterOverlap = {
					...this._floaterOverlap,
					enabled: this._hasValueKey(T, "overlap_enabled") ? T.overlap_enabled !== !1 : this._floaterOverlap.enabled,
					distancePx: this._clamp(this._toFinite(T.overlap_distance_px, this._floaterOverlap.distancePx), 8, 240),
					minItems: Math.round(this._clamp(this._toFinite(T.overlap_min_items, this._floaterOverlap.minItems), 2, 12)),
					expandDurationMs: Math.round(this._clamp(this._toFinite(T.overlap_expand_duration_ms, this._floaterOverlap.expandDurationMs), 0, 1e3))
				}, this._emitConfigFromEditor();
			}, this._addRoom = () => {
				this._rooms = [...this._rooms, {
					area: "",
					name: "",
					tapAction: "popup",
					navigationPath: "",
					polygon: this._createDefaultRoomPolygon(),
					extra: {}
				}], this._emitConfigFromEditor();
			}, this._addFloater = () => {
				let w = this._floaters.length + 1;
				this._floaters = [...this._floaters, {
					id: `floater_${w}`,
					entity: "",
					label: "",
					icon: "mdi:lightbulb",
					group: "light",
					tapAction: "toggle",
					holdAction: "popup",
					position: {
						x: 0,
						y: 0,
						z: 0
					},
					extra: {}
				}], this._emitConfigFromEditor();
			}, this._heatmapConfigChanged = (w) => {
				let T = this._asRecord(w.detail?.value) ?? {};
				this._heatmapsConfigured = !0, this._heatmap = {
					...this._heatmap,
					enabled: this._hasValueKey(T, "enabled") ? T.enabled !== !1 : this._heatmap.enabled,
					defaultVisible: this._hasValueKey(T, "default_visible") ? T.default_visible !== !1 : this._heatmap.defaultVisible,
					minValue: this._nextTextValue(T, "min_value", this._heatmap.minValue),
					maxValue: this._nextTextValue(T, "max_value", this._heatmap.maxValue),
					radius: this._clamp(this._toFinite(T.radius, this._heatmap.radius), .25, 30),
					weight: this._clamp(this._toFinite(T.weight, this._heatmap.weight), .05, 10),
					opacity: this._clamp(this._toFinite(T.opacity, this._heatmap.opacity), .05, 1),
					resolution: Math.round(this._clamp(this._toFinite(T.resolution, this._heatmap.resolution), 96, 384)),
					blur: this._clamp(this._toFinite(T.blur, this._heatmap.blur), 0, 1)
				}, this._emitConfigFromEditor();
			}, this._addHeatmapColorRange = () => {
				this._heatmapsConfigured = !0, this._heatmap = {
					...this._heatmap,
					colorRanges: [...this._heatmap.colorRanges, {
						value: 22,
						color: "#49db78",
						extra: {}
					}]
				}, this._emitConfigFromEditor();
			}, this._addHeatmapSensor = () => {
				let w = this._heatmap.sensors.length + 1;
				this._heatmapsConfigured = !0, this._heatmap = {
					...this._heatmap,
					sensors: [...this._heatmap.sensors, {
						id: `heatmap_sensor_${w}`,
						entity: "",
						label: "",
						valueAttribute: "",
						radius: this._heatmap.radius,
						weight: this._heatmap.weight,
						position: {
							x: 0,
							y: 0,
							z: 0
						},
						extra: {}
					}]
				}, this._emitConfigFromEditor();
			}, this._navbarConfigChanged = (w) => {
				let T = this._asRecord(w.detail?.value) ?? {};
				this._navbarConfigured = !0, this._navbar = {
					...this._navbar,
					enabled: this._hasValueKey(T, "enabled") ? T.enabled !== !1 : this._navbar.enabled,
					position: this._hasValueKey(T, "position") ? this._normalizeNavbarPosition(T.position) : this._navbar.position,
					transparent: this._hasValueKey(T, "transparent") ? T.transparent !== !1 : this._navbar.transparent,
					opacity: this._clamp(this._toFinite(T.opacity, this._navbar.opacity), .05, 1),
					blur: this._clamp(this._toFinite(T.blur, this._navbar.blur), 0, 28),
					backgroundColor: this._nextTextValue(T, "background_color", this._navbar.backgroundColor),
					borderColor: this._nextTextValue(T, "border_color", this._navbar.borderColor),
					textColor: this._nextTextValue(T, "text_color", this._navbar.textColor),
					iconColor: this._nextTextValue(T, "icon_color", this._navbar.iconColor),
					offsetX: Math.round(this._clamp(this._toFinite(T.offset_x, this._navbar.offsetX), 0, 128)),
					offsetY: Math.round(this._clamp(this._toFinite(T.offset_y, this._navbar.offsetY), 0, 128))
				}, this._emitConfigFromEditor();
			}, this._addNavbarItem = () => {
				this._navbarConfigured = !0;
				let w = this._navbar.items.length + 1;
				this._navbar = {
					...this._navbar,
					items: [...this._navbar.items, {
						id: `navbar_item_${w}`,
						label: "",
						icon: "mdi:lightbulb-group",
						action: "set-floater-group",
						floaterGroup: "all",
						extra: {}
					}]
				}, this._emitConfigFromEditor();
			}, this._addAction = () => {
				let w = this._actions.length + 1;
				this._actions = [...this._actions, {
					id: `action_${w}`,
					label: "",
					service: "",
					closeOnRun: !0,
					serviceDataJson: "",
					targetJson: "",
					extra: {}
				}], this._emitConfigFromEditor();
			};
		}
		static #e = this.properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_rooms: { state: !0 },
			_floaters: { state: !0 },
			_floaterOverlap: { state: !0 },
			_heatmap: { state: !0 },
			_camera: { state: !0 },
			_renderer: { state: !0 },
			_navbar: { state: !0 },
			_actions: { state: !0 },
			_actionsError: { state: !0 },
			_cameraConfigured: { state: !0 },
			_rendererConfigured: { state: !0 },
			_floaterOverlapConfigured: { state: !0 },
			_heatmapsConfigured: { state: !0 },
			_navbarConfigured: { state: !0 },
			_panelExpanded: { state: !0 }
		};
		static #t = this.styles = i$1`
    :host {
      display: block;
    }

    .editor-shell {
      display: grid;
      gap: 12px;
      padding: 12px 0 6px;
    }

    .section-panel,
    .item-panel {
      border: 1px solid color-mix(in srgb, var(--divider-color, #40444f) 72%, transparent);
      border-radius: 12px;
      background: color-mix(in srgb, var(--card-background-color, #1d2028) 94%, transparent);
      overflow: hidden;
    }

    .section-panel ha-expansion-panel,
    .item-panel ha-expansion-panel {
      background: transparent;
      --ha-card-background: transparent;
      --expansion-panel-border-width: 0px;
      --expansion-panel-content-padding: 0px;
      --expansion-panel-summary-padding: 0 12px;
    }

    .section-title,
    .item-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin: 0;
      min-height: 54px;
      color: var(--primary-text-color);
    }

    .section-title-label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      font-weight: 640;
    }

    .section-title-label ha-icon {
      color: var(--primary-text-color);
    }

    .item-header {
      font-size: 13px;
      font-weight: 600;
    }

    .item-header ha-icon {
      color: var(--primary-text-color);
    }

    .section-content {
      padding: 0 12px 12px;
      display: grid;
      gap: 10px;
    }

    .item-content {
      padding: 0 10px 10px;
      display: grid;
      gap: 10px;
    }

    .section-help {
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.4;
    }

    .list {
      display: grid;
      gap: 8px;
    }

    .item-title {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 11px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      font-weight: 700;
    }

    .sub-block {
      display: grid;
      gap: 8px;
    }

    .inline-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 8px;
      align-items: end;
    }

    .add-button,
    .remove-button {
      border: 1px solid color-mix(in srgb, var(--divider-color, #40444f) 74%, transparent);
      border-radius: 8px;
      height: 30px;
      padding: 0 10px;
      cursor: pointer;
      background: color-mix(in srgb, var(--secondary-background-color, #212530) 72%, transparent);
      color: var(--primary-text-color);
      font-size: 12px;
      font-weight: 600;
    }

    .add-button {
      justify-self: start;
    }

    .remove-button {
      color: var(--secondary-text-color);
      justify-self: end;
    }

    .remove-button:hover,
    .add-button:hover {
      border-color: color-mix(in srgb, var(--primary-color, #3a8dff) 60%, var(--divider-color, #40444f));
      color: var(--primary-text-color);
    }

    .error {
      color: var(--error-color, #db4437);
      font-size: 12px;
      font-weight: 600;
      border: 1px solid color-mix(in srgb, var(--error-color, #db4437) 50%, transparent);
      border-radius: 8px;
      padding: 8px 10px;
      background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
    }

    ha-textfield {
      width: 100%;
    }

    code {
      background: color-mix(in srgb, var(--primary-color, #3a8dff) 18%, transparent);
      border-radius: 5px;
      padding: 1px 4px;
    }
  `;
		setConfig(w) {
			this._config = { ...w ?? {} }, this._rooms = this._parseRooms(this._config[ROOMS_KEY]), this._floaters = this._parseFloaters(this._config[FLOATERS_KEY]), this._floaterOverlap = this._parseFloaterOverlap(this._config[FLOATER_OVERLAP_KEY]), this._heatmap = this._parseHeatmap(this._config[HEATMAPS_KEY]), this._camera = this._parseCamera(this._config[CAMERA_KEY]), this._renderer = this._parseRenderer(this._config[RENDERER_KEY]), this._navbar = this._parseNavbar(this._config[NAVBAR_KEY]), this._actions = this._parseActions(this._config[ACTIONS_KEY] ?? this._config[LEGACY_ACTIONS_KEY]), this._actionsError = "", this._cameraConfigured = this._config[CAMERA_KEY] !== void 0, this._rendererConfigured = this._config[RENDERER_KEY] !== void 0, this._floaterOverlapConfigured = this._config[FLOATER_OVERLAP_KEY] !== void 0, this._heatmapsConfigured = this._config[HEATMAPS_KEY] !== void 0, this._navbarConfigured = this._config[NAVBAR_KEY] !== void 0;
		}
		render() {
			return this.hass ? b`
      <div class="editor-shell">
        ${this._renderRendererSection()} ${this._renderRoomsSection()} ${this._renderFloatersSection()}
        ${this._renderHeatmapSection()} ${this._renderNavbarSection()} ${this._renderActionsSection()}
      </div>
    ` : A;
		}
		_renderRendererSection() {
			return b`
      <section class="section-panel">
        <ha-expansion-panel
          outlined
          ?expanded=${this._isPanelExpanded("renderer", !0)}
          @expanded-changed=${(w) => {
				this._panelExpandedChanged("renderer", w);
			}}
        >
          ${this._renderSectionHeader(RENDERER_ICON, "Renderer Settings")}
          <div class="section-content">
            <section class="item-panel">
              <ha-expansion-panel
                outlined
                ?expanded=${this._isPanelExpanded("renderer-camera", !0)}
                @expanded-changed=${(w) => {
				this._panelExpandedChanged("renderer-camera", w);
			}}
              >
                <h5 slot="header" class="item-header">
                  <span class="section-title-label">
                    <ha-icon .icon=${"mdi:camera-control"}></ha-icon>
                    Camera
                  </span>
                </h5>
                <div class="item-content">
                  <ha-form
                    .hass=${this.hass}
                    .data=${{
				position_x: this._camera.position.x,
				position_y: this._camera.position.y,
				position_z: this._camera.position.z,
				rotation_x: this._camera.rotation.x,
				rotation_y: this._camera.rotation.y,
				max_zoom_out: this._camera.maxZoomOut
			}}
                    .schema=${[
				{
					name: "position_x",
					selector: { number: { step: .1 } }
				},
				{
					name: "position_y",
					selector: { number: { step: .1 } }
				},
				{
					name: "position_z",
					selector: { number: { step: .1 } }
				},
				{
					name: "rotation_x",
					selector: { number: {
						min: -89,
						max: 89,
						step: .1
					} }
				},
				{
					name: "rotation_y",
					selector: { number: {
						min: -180,
						max: 180,
						step: .1
					} }
				},
				{
					name: "max_zoom_out",
					selector: { number: {
						min: 2,
						max: 300,
						step: 1
					} }
				}
			]}
                    .computeLabel=${this._computeLabel}
                    @value-changed=${this._cameraChanged}
                  ></ha-form>
                </div>
              </ha-expansion-panel>
            </section>
            <section class="item-panel">
              <ha-expansion-panel
                outlined
                ?expanded=${this._isPanelExpanded("renderer-visuals", !0)}
                @expanded-changed=${(w) => {
				this._panelExpandedChanged("renderer-visuals", w);
			}}
              >
                <h5 slot="header" class="item-header">
                  <span class="section-title-label">
                    <ha-icon .icon=${"mdi:palette-outline"}></ha-icon>
                    Visuals
                  </span>
                </h5>
                <div class="item-content">
                  <ha-form
                    .hass=${this.hass}
                    .data=${{
				wall_color: this._renderer.wallColor,
				wall_opacity: this._renderer.wallOpacity,
				wall_height: this._renderer.wallHeight,
				grid_enabled: this._renderer.gridEnabled,
				grid_color: this._renderer.gridColor,
				background_color: this._renderer.backgroundColor,
				card_transparent: this._renderer.cardTransparent,
				card_background_color: this._renderer.cardBackgroundColor
			}}
                    .schema=${[
				{
					name: "wall_color",
					selector: { text: {} }
				},
				{
					name: "wall_opacity",
					selector: { number: {
						min: 0,
						max: 1,
						step: .01
					} }
				},
				{
					name: "wall_height",
					selector: { number: {
						min: .2,
						max: 10,
						step: .1
					} }
				},
				{
					name: "grid_enabled",
					selector: { boolean: {} }
				},
				{
					name: "grid_color",
					selector: { text: {} }
				},
				{
					name: "background_color",
					selector: { text: {} }
				},
				{
					name: "card_transparent",
					selector: { boolean: {} }
				},
				{
					name: "card_background_color",
					selector: { text: {} }
				}
			]}
                    .computeLabel=${this._computeLabel}
                    @value-changed=${this._rendererChanged}
                  ></ha-form>
                </div>
              </ha-expansion-panel>
            </section>
            <section class="item-panel">
              <ha-expansion-panel
                outlined
                ?expanded=${this._isPanelExpanded("renderer-light-simulation", !0)}
                @expanded-changed=${(w) => {
				this._panelExpandedChanged("renderer-light-simulation", w);
			}}
              >
                <h5 slot="header" class="item-header">
                  <span class="section-title-label">
                    <ha-icon .icon=${"mdi:lightbulb-group-outline"}></ha-icon>
                    Light Simulation
                  </span>
                </h5>
                <div class="item-content">
                  <ha-form
                    .hass=${this.hass}
                    .data=${{
				light_simulation_enabled: this._renderer.lightSimulationEnabled,
				light_simulation_intensity: this._renderer.lightSimulationIntensity,
				light_simulation_range: this._renderer.lightSimulationRange,
				light_simulation_decay: this._renderer.lightSimulationDecay
			}}
                    .schema=${[
				{
					name: "light_simulation_enabled",
					selector: { boolean: {} }
				},
				{
					name: "light_simulation_intensity",
					selector: { number: {
						min: 0,
						max: 8,
						step: .1
					} }
				},
				{
					name: "light_simulation_range",
					selector: { number: {
						min: .5,
						max: 20,
						step: .1
					} }
				},
				{
					name: "light_simulation_decay",
					selector: { number: {
						min: 0,
						max: 4,
						step: .1
					} }
				}
			]}
                    .computeLabel=${this._computeLabel}
                    @value-changed=${this._rendererChanged}
                  ></ha-form>
                </div>
              </ha-expansion-panel>
            </section>
          </div>
        </ha-expansion-panel>
      </section>
    `;
		}
		_renderRoomsSection() {
			return b`
      <section class="section-panel">
        <ha-expansion-panel
          outlined
          ?expanded=${this._isPanelExpanded("rooms", !0)}
          @expanded-changed=${(w) => {
				this._panelExpandedChanged("rooms", w);
			}}
        >
          ${this._renderSectionHeader(ROOMS_ICON, "Rooms")}
          <div class="section-content">
            <div class="section-help">
              Add rooms and polygon points. Each room needs an <code>area</code> and polygon.
            </div>
            <div class="list">
              ${this._rooms.map((w, T) => b`
                  <section class="item-panel">
                    <ha-expansion-panel
                      outlined
                      ?expanded=${this._isPanelExpanded(`rooms-item-${T}`, T === 0)}
                      @expanded-changed=${(w) => {
				this._panelExpandedChanged(`rooms-item-${T}`, w);
			}}
                    >
                      <h5 slot="header" class="item-header">
                        <span class="section-title-label">
                          <ha-icon .icon=${"mdi:vector-polygon"}></ha-icon>
                          Room ${T + 1}
                        </span>
                        <button
                          class="remove-button"
                          type="button"
                          @click=${(w) => {
				this._handleHeaderButtonClick(w, () => this._removeRoom(T));
			}}
                        >
                          Remove
                        </button>
                      </h5>
                      <div class="item-content">
                        <ha-form
                          .hass=${this.hass}
                          .data=${{
				area: w.area,
				name: w.name,
				tap_action: w.tapAction,
				navigation_path: w.navigationPath
			}}
                          .schema=${[
				{
					name: "area",
					selector: { text: {} }
				},
				{
					name: "name",
					selector: { text: {} }
				},
				{
					name: "tap_action",
					selector: { select: {
						mode: "dropdown",
						options: [
							{
								label: "Popup",
								value: "popup"
							},
							{
								label: "Navigate",
								value: "navigate"
							},
							{
								label: "None",
								value: "none"
							}
						]
					} }
				},
				...w.tapAction === "navigate" ? [{
					name: "navigation_path",
					selector: { text: {} }
				}] : []
			]}
                          .computeLabel=${this._computeLabel}
                          @value-changed=${(w) => {
				this._roomChanged(T, w);
			}}
                        ></ha-form>

                        <div class="sub-block">
                          <div class="item-title">Polygon Points</div>
                          ${w.polygon.map((w, O) => b`
                              <div class="inline-row">
                                <ha-form
                                  .hass=${this.hass}
                                  .data=${{
				x: w.x,
				z: w.z
			}}
                                  .schema=${[{
				name: "x",
				selector: { number: { step: .1 } }
			}, {
				name: "z",
				selector: { number: { step: .1 } }
			}]}
                                  .computeLabel=${this._computeLabel}
                                  @value-changed=${(w) => {
				this._roomPointChanged(T, O, w);
			}}
                                ></ha-form>
                                <button
                                  class="remove-button"
                                  type="button"
                                  @click=${() => {
				this._removeRoomPoint(T, O);
			}}
                                >
                                  Remove
                                </button>
                              </div>
                            `)}
                          <button
                            class="add-button"
                            type="button"
                            @click=${() => {
				this._addRoomPoint(T);
			}}
                          >
                            + Add point
                          </button>
                        </div>
                      </div>
                    </ha-expansion-panel>
                  </section>
                `)}
              <button class="add-button" type="button" @click=${this._addRoom}>+ Add room</button>
            </div>
          </div>
        </ha-expansion-panel>
      </section>
    `;
		}
		_renderFloatersSection() {
			return b`
      <section class="section-panel">
        <ha-expansion-panel
          outlined
          ?expanded=${this._isPanelExpanded("floaters", !0)}
          @expanded-changed=${(w) => {
				this._panelExpandedChanged("floaters", w);
			}}
        >
          ${this._renderSectionHeader(FLOATERS_ICON, "Floaters")}
          <div class="section-content">
            <div class="section-help">
              Create floaters with entity, position and actions. Use <code>group</code> to control navbar filtering.
            </div>
            <div class="sub-block">
              <div class="item-title">Overlap Behavior</div>
              <ha-form
                .hass=${this.hass}
                .data=${{
				overlap_enabled: this._floaterOverlap.enabled,
				overlap_distance_px: this._floaterOverlap.distancePx,
				overlap_min_items: this._floaterOverlap.minItems,
				overlap_expand_duration_ms: this._floaterOverlap.expandDurationMs
			}}
                .schema=${[
				{
					name: "overlap_enabled",
					selector: { boolean: {} }
				},
				{
					name: "overlap_distance_px",
					selector: { number: {
						min: 8,
						max: 240,
						step: 1
					} }
				},
				{
					name: "overlap_min_items",
					selector: { number: {
						min: 2,
						max: 12,
						step: 1
					} }
				},
				{
					name: "overlap_expand_duration_ms",
					selector: { number: {
						min: 0,
						max: 1e3,
						step: 10
					} }
				}
			]}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._floaterOverlapChanged}
              ></ha-form>
            </div>
            <div class="list">
              ${this._floaters.map((w, T) => b`
                  <section class="item-panel">
                    <ha-expansion-panel
                      outlined
                      ?expanded=${this._isPanelExpanded(`floaters-item-${T}`, T === 0)}
                      @expanded-changed=${(w) => {
				this._panelExpandedChanged(`floaters-item-${T}`, w);
			}}
                    >
                      <h5 slot="header" class="item-header">
                        <span class="section-title-label">
                          <ha-icon .icon=${"mdi:circle-medium"}></ha-icon>
                          Floater ${T + 1}
                        </span>
                        <button
                          class="remove-button"
                          type="button"
                          @click=${(w) => {
				this._handleHeaderButtonClick(w, () => this._removeFloater(T));
			}}
                        >
                          Remove
                        </button>
                      </h5>

                      <div class="item-content">
                        <ha-form
                          .hass=${this.hass}
                          .data=${{
				id: w.id,
				entity: w.entity,
				label: w.label,
				icon: w.icon,
				group: w.group,
				tap_action: w.tapAction,
				hold_action: w.holdAction
			}}
                          .schema=${[
				{
					name: "id",
					selector: { text: {} }
				},
				{
					name: "entity",
					selector: { entity: {} }
				},
				{
					name: "label",
					selector: { text: {} }
				},
				{
					name: "icon",
					selector: { icon: {} }
				},
				{
					name: "group",
					selector: { text: {} }
				},
				{
					name: "tap_action",
					selector: { select: {
						mode: "dropdown",
						options: [
							{
								label: "Toggle",
								value: "toggle"
							},
							{
								label: "More info",
								value: "more-info"
							},
							{
								label: "Popup",
								value: "popup"
							}
						]
					} }
				},
				{
					name: "hold_action",
					selector: { select: {
						mode: "dropdown",
						options: [
							{
								label: "Popup",
								value: "popup"
							},
							{
								label: "More info",
								value: "more-info"
							},
							{
								label: "Toggle",
								value: "toggle"
							}
						]
					} }
				}
			]}
                          .computeLabel=${this._computeLabel}
                          @value-changed=${(w) => {
				this._floaterChanged(T, w);
			}}
                        ></ha-form>

                        <div class="sub-block">
                          <div class="item-title">Position [x, y, z]</div>
                          <ha-form
                            .hass=${this.hass}
                            .data=${{
				x: w.position.x,
				y: w.position.y,
				z: w.position.z
			}}
                            .schema=${[
				{
					name: "x",
					selector: { number: { step: .1 } }
				},
				{
					name: "y",
					selector: { number: { step: .1 } }
				},
				{
					name: "z",
					selector: { number: { step: .1 } }
				}
			]}
                            .computeLabel=${this._computeLabel}
                            @value-changed=${(w) => {
				this._floaterPositionChanged(T, w);
			}}
                          ></ha-form>
                        </div>
                      </div>
                    </ha-expansion-panel>
                  </section>
                `)}
              <button class="add-button" type="button" @click=${this._addFloater}>+ Add floater</button>
            </div>
          </div>
        </ha-expansion-panel>
      </section>
    `;
		}
		_renderHeatmapSection() {
			return b`
      <section class="section-panel">
        <ha-expansion-panel
          outlined
          ?expanded=${this._isPanelExpanded("heatmaps", !0)}
          @expanded-changed=${(w) => {
				this._panelExpandedChanged("heatmaps", w);
			}}
        >
          ${this._renderSectionHeader(HEATMAPS_ICON, "Heatmaps")}
          <div class="section-content">
            <div class="section-help">
              Configure global heatmap values, color ranges and sensors. Sensors ignore height for interpolation.
            </div>

            <ha-form
              .hass=${this.hass}
              .data=${{
				enabled: this._heatmap.enabled,
				default_visible: this._heatmap.defaultVisible,
				min_value: this._heatmap.minValue,
				max_value: this._heatmap.maxValue,
				radius: this._heatmap.radius,
				weight: this._heatmap.weight,
				opacity: this._heatmap.opacity,
				resolution: this._heatmap.resolution,
				blur: this._heatmap.blur
			}}
              .schema=${[
				{
					name: "enabled",
					selector: { boolean: {} }
				},
				{
					name: "default_visible",
					selector: { boolean: {} }
				},
				{
					name: "min_value",
					selector: { text: {} }
				},
				{
					name: "max_value",
					selector: { text: {} }
				},
				{
					name: "radius",
					selector: { number: {
						min: .25,
						max: 30,
						step: .1
					} }
				},
				{
					name: "weight",
					selector: { number: {
						min: .05,
						max: 10,
						step: .05
					} }
				},
				{
					name: "opacity",
					selector: { number: {
						min: .05,
						max: 1,
						step: .01
					} }
				},
				{
					name: "resolution",
					selector: { number: {
						min: 96,
						max: 384,
						step: 1
					} }
				},
				{
					name: "blur",
					selector: { number: {
						min: 0,
						max: 1,
						step: .01
					} }
				}
			]}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._heatmapConfigChanged}
            ></ha-form>

            <section class="item-panel">
              <ha-expansion-panel
                outlined
                ?expanded=${this._isPanelExpanded("heatmaps-color-ranges", !0)}
                @expanded-changed=${(w) => {
				this._panelExpandedChanged("heatmaps-color-ranges", w);
			}}
              >
                <h5 slot="header" class="item-header">
                  <span class="section-title-label">
                    <ha-icon .icon=${"mdi:gradient-horizontal"}></ha-icon>
                    Color Ranges
                  </span>
                </h5>
                <div class="item-content">
                  <div class="list">
                    ${this._heatmap.colorRanges.map((w, T) => b`
                        <section class="item-panel">
                          <ha-expansion-panel
                            outlined
                            ?expanded=${this._isPanelExpanded(`heatmaps-color-item-${T}`, T === 0)}
                            @expanded-changed=${(w) => {
				this._panelExpandedChanged(`heatmaps-color-item-${T}`, w);
			}}
                          >
                            <h5 slot="header" class="item-header">
                              <span class="section-title-label">
                                <ha-icon .icon=${"mdi:palette-outline"}></ha-icon>
                                Range ${T + 1}
                              </span>
                              <button
                                class="remove-button"
                                type="button"
                                @click=${(w) => {
				this._handleHeaderButtonClick(w, () => this._removeHeatmapColorRange(T));
			}}
                              >
                                Remove
                              </button>
                            </h5>
                            <div class="item-content">
                              <ha-form
                                .hass=${this.hass}
                                .data=${{
				value: w.value,
				color: w.color
			}}
                                .schema=${[{
				name: "value",
				selector: { number: { step: .1 } }
			}, {
				name: "color",
				selector: { text: {} }
			}]}
                                .computeLabel=${this._computeLabel}
                                @value-changed=${(w) => {
				this._heatmapColorRangeChanged(T, w);
			}}
                              ></ha-form>
                            </div>
                          </ha-expansion-panel>
                        </section>
                      `)}
                  </div>
                  <button class="add-button" type="button" @click=${this._addHeatmapColorRange}>+ Add color range</button>
                </div>
              </ha-expansion-panel>
            </section>

            <section class="item-panel">
              <ha-expansion-panel
                outlined
                ?expanded=${this._isPanelExpanded("heatmaps-sensors", !0)}
                @expanded-changed=${(w) => {
				this._panelExpandedChanged("heatmaps-sensors", w);
			}}
              >
                <h5 slot="header" class="item-header">
                  <span class="section-title-label">
                    <ha-icon .icon=${"mdi:access-point"}></ha-icon>
                    Sensors
                  </span>
                </h5>
                <div class="item-content">
                  <div class="list">
                    ${this._heatmap.sensors.map((w, T) => b`
                        <section class="item-panel">
                          <ha-expansion-panel
                            outlined
                            ?expanded=${this._isPanelExpanded(`heatmaps-sensor-item-${T}`, T === 0)}
                            @expanded-changed=${(w) => {
				this._panelExpandedChanged(`heatmaps-sensor-item-${T}`, w);
			}}
                          >
                            <h5 slot="header" class="item-header">
                              <span class="section-title-label">
                                <ha-icon .icon=${"mdi:thermometer-lines"}></ha-icon>
                                Sensor ${T + 1}
                              </span>
                              <button
                                class="remove-button"
                                type="button"
                                @click=${(w) => {
				this._handleHeaderButtonClick(w, () => this._removeHeatmapSensor(T));
			}}
                              >
                                Remove
                              </button>
                            </h5>

                            <div class="item-content">
                              <ha-form
                                .hass=${this.hass}
                                .data=${{
				id: w.id,
				entity: w.entity,
				label: w.label,
				value_attribute: w.valueAttribute,
				radius: w.radius,
				weight: w.weight
			}}
                                .schema=${[
				{
					name: "id",
					selector: { text: {} }
				},
				{
					name: "entity",
					selector: { entity: {} }
				},
				{
					name: "label",
					selector: { text: {} }
				},
				{
					name: "value_attribute",
					selector: { text: {} }
				},
				{
					name: "radius",
					selector: { number: {
						min: .25,
						max: 30,
						step: .1
					} }
				},
				{
					name: "weight",
					selector: { number: {
						min: .05,
						max: 10,
						step: .05
					} }
				}
			]}
                                .computeLabel=${this._computeLabel}
                                @value-changed=${(w) => {
				this._heatmapSensorChanged(T, w);
			}}
                              ></ha-form>

                              <div class="sub-block">
                                <div class="item-title">Position [x, y, z]</div>
                                <ha-form
                                  .hass=${this.hass}
                                  .data=${{
				x: w.position.x,
				y: w.position.y,
				z: w.position.z
			}}
                                  .schema=${[
				{
					name: "x",
					selector: { number: { step: .1 } }
				},
				{
					name: "y",
					selector: { number: { step: .1 } }
				},
				{
					name: "z",
					selector: { number: { step: .1 } }
				}
			]}
                                  .computeLabel=${this._computeLabel}
                                  @value-changed=${(w) => {
				this._heatmapSensorPositionChanged(T, w);
			}}
                                ></ha-form>
                              </div>
                            </div>
                          </ha-expansion-panel>
                        </section>
                      `)}
                  </div>
                  <button class="add-button" type="button" @click=${this._addHeatmapSensor}>+ Add sensor</button>
                </div>
              </ha-expansion-panel>
            </section>
          </div>
        </ha-expansion-panel>
      </section>
    `;
		}
		_renderNavbarSection() {
			return b`
      <section class="section-panel">
        <ha-expansion-panel
          outlined
          ?expanded=${this._isPanelExpanded("navbar", !0)}
          @expanded-changed=${(w) => {
				this._panelExpandedChanged("navbar", w);
			}}
        >
          ${this._renderSectionHeader(NAVBAR_ICON, "Navbar")}
          <div class="section-content">
            <div class="section-help">Configure navbar placement, look, and grouped actions.</div>

            <ha-form
              .hass=${this.hass}
              .data=${{
				enabled: this._navbar.enabled,
				position: this._navbar.position,
				transparent: this._navbar.transparent,
				opacity: this._navbar.opacity,
				blur: this._navbar.blur,
				background_color: this._navbar.backgroundColor,
				border_color: this._navbar.borderColor,
				text_color: this._navbar.textColor,
				icon_color: this._navbar.iconColor,
				offset_x: this._navbar.offsetX,
				offset_y: this._navbar.offsetY
			}}
              .schema=${[
				{
					name: "enabled",
					selector: { boolean: {} }
				},
				{
					name: "position",
					selector: { select: {
						mode: "dropdown",
						options: [
							{
								label: "Left",
								value: "left"
							},
							{
								label: "Right",
								value: "right"
							},
							{
								label: "Top",
								value: "top"
							},
							{
								label: "Bottom",
								value: "bottom"
							},
							{
								label: "Top Left",
								value: "top-left"
							},
							{
								label: "Top Right",
								value: "top-right"
							},
							{
								label: "Bottom Left",
								value: "bottom-left"
							},
							{
								label: "Bottom Right",
								value: "bottom-right"
							}
						]
					} }
				},
				{
					name: "transparent",
					selector: { boolean: {} }
				},
				{
					name: "opacity",
					selector: { number: {
						min: .05,
						max: 1,
						step: .01
					} }
				},
				{
					name: "blur",
					selector: { number: {
						min: 0,
						max: 28,
						step: 1
					} }
				},
				{
					name: "background_color",
					selector: { text: {} }
				},
				{
					name: "border_color",
					selector: { text: {} }
				},
				{
					name: "text_color",
					selector: { text: {} }
				},
				{
					name: "icon_color",
					selector: { text: {} }
				},
				{
					name: "offset_x",
					selector: { number: {
						min: 0,
						max: 128,
						step: 1
					} }
				},
				{
					name: "offset_y",
					selector: { number: {
						min: 0,
						max: 128,
						step: 1
					} }
				}
			]}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._navbarConfigChanged}
            ></ha-form>

            <section class="item-panel">
              <ha-expansion-panel
                outlined
                ?expanded=${this._isPanelExpanded("navbar-items", !0)}
                @expanded-changed=${(w) => {
				this._panelExpandedChanged("navbar-items", w);
			}}
              >
                <h5 slot="header" class="item-header">
                  <span class="section-title-label">
                    <ha-icon .icon=${"mdi:view-list"}></ha-icon>
                    Navbar Items
                  </span>
                </h5>
                <div class="item-content">
                  <div class="list">
                    ${this._navbar.items.map((w, T) => b`
                        <section class="item-panel">
                          <ha-expansion-panel
                            outlined
                            ?expanded=${this._isPanelExpanded(`navbar-item-${T}`, T === 0)}
                            @expanded-changed=${(w) => {
				this._panelExpandedChanged(`navbar-item-${T}`, w);
			}}
                          >
                            <h5 slot="header" class="item-header">
                              <span class="section-title-label">
                                <ha-icon .icon=${"mdi:format-list-bulleted-square"}></ha-icon>
                                Item ${T + 1}
                              </span>
                              <button
                                class="remove-button"
                                type="button"
                                @click=${(w) => {
				this._handleHeaderButtonClick(w, () => this._removeNavbarItem(T));
			}}
                              >
                                Remove
                              </button>
                            </h5>
                            <div class="item-content">
                              <ha-form
                                .hass=${this.hass}
                                .data=${{
				id: w.id,
				label: w.label,
				icon: w.icon,
				action: w.action,
				floater_group: w.floaterGroup
			}}
                                .schema=${[
				{
					name: "id",
					selector: { text: {} }
				},
				{
					name: "label",
					selector: { text: {} }
				},
				{
					name: "icon",
					selector: { icon: {} }
				},
				{
					name: "action",
					selector: { select: {
						mode: "dropdown",
						options: [{
							label: "Toggle heatmap",
							value: "toggle-heatmap"
						}, {
							label: "Set floater group",
							value: "set-floater-group"
						}]
					} }
				},
				{
					name: "floater_group",
					selector: { text: {} }
				}
			]}
                                .computeLabel=${this._computeLabel}
                                @value-changed=${(w) => {
				this._navbarItemChanged(T, w);
			}}
                              ></ha-form>
                            </div>
                          </ha-expansion-panel>
                        </section>
                      `)}
                  </div>
                  <button class="add-button" type="button" @click=${this._addNavbarItem}>+ Add navbar item</button>
                </div>
              </ha-expansion-panel>
            </section>
          </div>
        </ha-expansion-panel>
      </section>
    `;
		}
		_renderActionsSection() {
			return b`
      <section class="section-panel">
        <ha-expansion-panel
          outlined
          ?expanded=${this._isPanelExpanded("actions", !0)}
          @expanded-changed=${(w) => {
				this._panelExpandedChanged("actions", w);
			}}
        >
          ${this._renderSectionHeader(ACTIONS_ICON, "Default Popup Actions")}
          <div class="section-content">
            <div class="section-help">
              Used when a room does not define local <code>room_popup_actions</code>.
            </div>
            <div class="list">
              ${this._actions.map((w, T) => b`
                  <section class="item-panel">
                    <ha-expansion-panel
                      outlined
                      ?expanded=${this._isPanelExpanded(`actions-item-${T}`, T === 0)}
                      @expanded-changed=${(w) => {
				this._panelExpandedChanged(`actions-item-${T}`, w);
			}}
                    >
                      <h5 slot="header" class="item-header">
                        <span class="section-title-label">
                          <ha-icon .icon=${"mdi:gesture-tap-button"}></ha-icon>
                          Action ${T + 1}
                        </span>
                        <button
                          class="remove-button"
                          type="button"
                          @click=${(w) => {
				this._handleHeaderButtonClick(w, () => this._removeAction(T));
			}}
                        >
                          Remove
                        </button>
                      </h5>
                      <div class="item-content">
                        <ha-form
                          .hass=${this.hass}
                          .data=${{
				id: w.id,
				label: w.label,
				service: w.service,
				close_on_run: w.closeOnRun
			}}
                          .schema=${[
				{
					name: "id",
					selector: { text: {} }
				},
				{
					name: "label",
					selector: { text: {} }
				},
				{
					name: "service",
					selector: { text: {} }
				},
				{
					name: "close_on_run",
					selector: { boolean: {} }
				}
			]}
                          .computeLabel=${this._computeLabel}
                          @value-changed=${(w) => {
				this._actionChanged(T, w);
			}}
                        ></ha-form>

                        <ha-textfield
                          .label=${"service_data (JSON object)"}
                          .value=${w.serviceDataJson}
                          @input=${(w) => {
				this._actionServiceDataChanged(T, this._inputValue(w));
			}}
                        ></ha-textfield>

                        <ha-textfield
                          .label=${"target (JSON object)"}
                          .value=${w.targetJson}
                          @input=${(w) => {
				this._actionTargetChanged(T, this._inputValue(w));
			}}
                        ></ha-textfield>
                      </div>
                    </ha-expansion-panel>
                  </section>
                `)}

              <button class="add-button" type="button" @click=${this._addAction}>+ Add action</button>
              ${this._actionsError ? b`<div class="error">${this._actionsError}</div>` : A}
            </div>
          </div>
        </ha-expansion-panel>
      </section>
    `;
		}
		_renderSectionHeader(w, T) {
			return b`
      <h4 slot="header" class="section-title">
        <span class="section-title-label">
          <ha-icon .icon=${w}></ha-icon>
          ${T}
        </span>
      </h4>
    `;
		}
		_handleHeaderButtonClick(w, T) {
			w.preventDefault(), w.stopPropagation(), T();
		}
		_isPanelExpanded(w, T) {
			let O = this._panelExpanded[w];
			return typeof O == "boolean" ? O : !1;
		}
		_panelExpandedChanged(w, T) {
			if (T.target !== T.currentTarget) return;
			let O = T.detail, j = T.currentTarget, F = typeof O?.expanded == "boolean" ? O.expanded : typeof O?.value == "boolean" ? O.value : typeof j?.expanded == "boolean" ? j.expanded : !1;
			this._panelExpanded = {
				...this._panelExpanded,
				[w]: F
			};
		}
		_removeRoom(w) {
			this._rooms = this._rooms.filter((T, O) => O !== w), this._emitConfigFromEditor();
		}
		_roomChanged(w, T) {
			let O = this._asRecord(T.detail?.value) ?? {}, j = this._rooms[w];
			if (!j) return;
			let F = [...this._rooms];
			F[w] = {
				...j,
				area: this._nextTextValue(O, "area", j.area),
				name: this._nextTextValue(O, "name", j.name),
				tapAction: this._normalizeRoomTapAction(O.tap_action, j.tapAction),
				navigationPath: this._nextTextValue(O, "navigation_path", j.navigationPath)
			}, this._rooms = F, this._emitConfigFromEditor();
		}
		_addRoomPoint(w) {
			let T = this._rooms[w];
			if (!T) return;
			let O = [...T.polygon], j = O[O.length - 1] ?? {
				x: 0,
				z: 0
			};
			O.push({
				x: j.x + 1,
				z: j.z
			});
			let F = [...this._rooms];
			F[w] = {
				...T,
				polygon: O
			}, this._rooms = F, this._emitConfigFromEditor();
		}
		_removeRoomPoint(w, T) {
			let O = this._rooms[w];
			if (!O) return;
			let j = O.polygon.filter((w, O) => O !== T), F = [...this._rooms];
			F[w] = {
				...O,
				polygon: j.length > 0 ? j : this._createDefaultRoomPolygon()
			}, this._rooms = F, this._emitConfigFromEditor();
		}
		_roomPointChanged(w, T, O) {
			let j = this._asRecord(O.detail?.value) ?? {}, F = this._rooms[w], U = F?.polygon[T];
			if (!F || !U) return;
			let W = [...F.polygon];
			W[T] = {
				x: this._toFinite(j.x, U.x),
				z: this._toFinite(j.z, U.z)
			};
			let G = [...this._rooms];
			G[w] = {
				...F,
				polygon: W
			}, this._rooms = G, this._emitConfigFromEditor();
		}
		_removeFloater(w) {
			this._floaters = this._floaters.filter((T, O) => O !== w), this._emitConfigFromEditor();
		}
		_floaterChanged(w, T) {
			let O = this._asRecord(T.detail?.value) ?? {}, j = this._floaters[w];
			if (!j) return;
			let F = this._normalizeFloaterAction(O.tap_action, j.tapAction), U = this._normalizeFloaterAction(O.hold_action, j.holdAction), W = [...this._floaters];
			W[w] = {
				...j,
				id: this._nextTextValue(O, "id", j.id),
				entity: this._nextTextValue(O, "entity", j.entity),
				label: this._nextTextValue(O, "label", j.label),
				icon: this._nextTextValue(O, "icon", j.icon),
				group: this._nextTextValue(O, "group", j.group).toLowerCase(),
				tapAction: F,
				holdAction: U
			}, this._floaters = W, this._emitConfigFromEditor();
		}
		_floaterPositionChanged(w, T) {
			let O = this._asRecord(T.detail?.value) ?? {}, j = this._floaters[w];
			if (!j) return;
			let F = [...this._floaters];
			F[w] = {
				...j,
				position: {
					x: this._toFinite(O.x, j.position.x),
					y: this._toFinite(O.y, j.position.y),
					z: this._toFinite(O.z, j.position.z)
				}
			}, this._floaters = F, this._emitConfigFromEditor();
		}
		_removeHeatmapColorRange(w) {
			this._heatmapsConfigured = !0, this._heatmap = {
				...this._heatmap,
				colorRanges: this._heatmap.colorRanges.filter((T, O) => O !== w)
			}, this._emitConfigFromEditor();
		}
		_heatmapColorRangeChanged(w, T) {
			let O = this._asRecord(T.detail?.value) ?? {}, j = this._heatmap.colorRanges[w];
			if (!j) return;
			let F = [...this._heatmap.colorRanges];
			F[w] = {
				...j,
				value: this._toFinite(O.value, j.value),
				color: this._nextTextValue(O, "color", j.color)
			}, this._heatmapsConfigured = !0, this._heatmap = {
				...this._heatmap,
				colorRanges: F
			}, this._emitConfigFromEditor();
		}
		_removeHeatmapSensor(w) {
			this._heatmapsConfigured = !0, this._heatmap = {
				...this._heatmap,
				sensors: this._heatmap.sensors.filter((T, O) => O !== w)
			}, this._emitConfigFromEditor();
		}
		_heatmapSensorChanged(w, T) {
			let O = this._asRecord(T.detail?.value) ?? {}, j = this._heatmap.sensors[w];
			if (!j) return;
			let F = [...this._heatmap.sensors];
			F[w] = {
				...j,
				id: this._nextTextValue(O, "id", j.id),
				entity: this._nextTextValue(O, "entity", j.entity),
				label: this._nextTextValue(O, "label", j.label),
				valueAttribute: this._nextTextValue(O, "value_attribute", j.valueAttribute),
				radius: this._clamp(this._toFinite(O.radius, j.radius), .25, 30),
				weight: this._clamp(this._toFinite(O.weight, j.weight), .05, 10)
			}, this._heatmapsConfigured = !0, this._heatmap = {
				...this._heatmap,
				sensors: F
			}, this._emitConfigFromEditor();
		}
		_heatmapSensorPositionChanged(w, T) {
			let O = this._asRecord(T.detail?.value) ?? {}, j = this._heatmap.sensors[w];
			if (!j) return;
			let F = [...this._heatmap.sensors];
			F[w] = {
				...j,
				position: {
					x: this._toFinite(O.x, j.position.x),
					y: this._toFinite(O.y, j.position.y),
					z: this._toFinite(O.z, j.position.z)
				}
			}, this._heatmapsConfigured = !0, this._heatmap = {
				...this._heatmap,
				sensors: F
			}, this._emitConfigFromEditor();
		}
		_removeNavbarItem(w) {
			this._navbarConfigured = !0, this._navbar = {
				...this._navbar,
				items: this._navbar.items.filter((T, O) => O !== w)
			}, this._emitConfigFromEditor();
		}
		_navbarItemChanged(w, T) {
			let O = this._asRecord(T.detail?.value) ?? {}, j = this._navbar.items[w];
			if (!j) return;
			let F = this._normalizeNavbarAction(O.action, j.action), U = [...this._navbar.items];
			U[w] = {
				...j,
				id: this._nextTextValue(O, "id", j.id),
				label: this._nextTextValue(O, "label", j.label),
				icon: this._nextTextValue(O, "icon", j.icon),
				action: F,
				floaterGroup: F === "set-floater-group" ? this._nextTextValue(O, "floater_group", j.floaterGroup).toLowerCase() : ""
			}, this._navbarConfigured = !0, this._navbar = {
				...this._navbar,
				items: U
			}, this._emitConfigFromEditor();
		}
		_removeAction(w) {
			this._actions = this._actions.filter((T, O) => O !== w), this._emitConfigFromEditor();
		}
		_actionChanged(w, T) {
			let O = this._asRecord(T.detail?.value) ?? {}, j = this._actions[w];
			if (!j) return;
			let F = [...this._actions];
			F[w] = {
				...j,
				id: this._nextTextValue(O, "id", j.id),
				label: this._nextTextValue(O, "label", j.label),
				service: this._nextTextValue(O, "service", j.service),
				closeOnRun: this._hasValueKey(O, "close_on_run") ? O.close_on_run !== !1 : j.closeOnRun
			}, this._actions = F, this._emitConfigFromEditor();
		}
		_actionServiceDataChanged(w, T) {
			let O = this._actions[w];
			if (!O) return;
			let j = [...this._actions];
			j[w] = {
				...O,
				serviceDataJson: T.trim()
			}, this._actions = j, this._emitConfigFromEditor();
		}
		_actionTargetChanged(w, T) {
			let O = this._actions[w];
			if (!O) return;
			let j = [...this._actions];
			j[w] = {
				...O,
				targetJson: T.trim()
			}, this._actions = j, this._emitConfigFromEditor();
		}
		_emitConfigFromEditor() {
			let w = this._createBaseConfig();
			delete w.entity;
			let T = this._serializeCamera();
			T ? w[CAMERA_KEY] = T : delete w[CAMERA_KEY];
			let O = this._serializeRenderer();
			O ? w[RENDERER_KEY] = O : delete w[RENDERER_KEY];
			let j = this._serializeRooms();
			j.length > 0 ? w[ROOMS_KEY] = j : delete w[ROOMS_KEY];
			let F = this._serializeFloaters();
			F.length > 0 ? w[FLOATERS_KEY] = F : delete w[FLOATERS_KEY];
			let U = this._serializeFloaterOverlap();
			U ? w[FLOATER_OVERLAP_KEY] = U : delete w[FLOATER_OVERLAP_KEY];
			let W = this._serializeHeatmap();
			W ? w[HEATMAPS_KEY] = W : delete w[HEATMAPS_KEY];
			let G = this._serializeNavbar();
			G ? w[NAVBAR_KEY] = G : delete w[NAVBAR_KEY];
			let K = this._serializeActions();
			K && (K.length > 0 ? w[ACTIONS_KEY] = K : delete w[ACTIONS_KEY], delete w[LEGACY_ACTIONS_KEY], this._fireConfigChanged(w));
		}
		_serializeCamera() {
			let w = {
				...this._camera.extra,
				position: [
					this._camera.position.x,
					this._camera.position.y,
					this._camera.position.z
				],
				rotation: [this._camera.rotation.x, this._camera.rotation.y],
				max_zoom_out: this._camera.maxZoomOut
			};
			return this._cameraConfigured || Object.keys(this._camera.extra).length > 0 ? w : null;
		}
		_serializeRenderer() {
			let w = {
				...this._renderer.extra,
				wall_opacity: this._renderer.wallOpacity,
				wall_height: this._renderer.wallHeight,
				grid_enabled: this._renderer.gridEnabled,
				light_simulation_enabled: this._renderer.lightSimulationEnabled,
				light_simulation_intensity: this._renderer.lightSimulationIntensity,
				light_simulation_range: this._renderer.lightSimulationRange,
				light_simulation_decay: this._renderer.lightSimulationDecay,
				card_transparent: this._renderer.cardTransparent
			}, T = this._renderer.wallColor.trim();
			T ? w.wall_color = T : delete w.wall_color;
			let O = this._renderer.gridColor.trim();
			O ? w.grid_color = O : delete w.grid_color;
			let j = this._renderer.backgroundColor.trim();
			j ? w.background_color = j : delete w.background_color;
			let F = this._renderer.cardBackgroundColor.trim();
			return F ? w.card_background_color = F : delete w.card_background_color, this._rendererConfigured || Object.keys(this._renderer.extra).length > 0 ? w : null;
		}
		_serializeRooms() {
			return this._rooms.map((w) => {
				let T = {
					...w.extra,
					area: w.area.trim(),
					polygon: w.polygon.map((w) => [w.x, w.z]),
					tap_action: w.tapAction
				}, O = w.name.trim();
				O ? T.name = O : delete T.name;
				let j = w.navigationPath.trim();
				return w.tapAction === "navigate" && j ? T.navigation_path = j : delete T.navigation_path, T;
			});
		}
		_serializeFloaters() {
			return this._floaters.map((w, T) => {
				let O = w.id.trim() || `floater_${T + 1}`, j = w.label.trim(), F = w.icon.trim(), U = w.group.trim().toLowerCase(), W = {
					...w.extra,
					id: O,
					entity: w.entity.trim(),
					position: [
						w.position.x,
						w.position.y,
						w.position.z
					],
					tap_action: w.tapAction,
					hold_action: w.holdAction
				};
				return j ? W.label = j : delete W.label, F ? W.icon = F : delete W.icon, U ? W.group = U : delete W.group, W;
			});
		}
		_serializeFloaterOverlap() {
			let w = {
				...this._floaterOverlap.extra,
				enabled: this._floaterOverlap.enabled,
				distance_px: this._floaterOverlap.distancePx,
				min_items: this._floaterOverlap.minItems,
				expand_duration_ms: this._floaterOverlap.expandDurationMs
			};
			return this._floaterOverlapConfigured || Object.keys(this._floaterOverlap.extra).length > 0 ? w : null;
		}
		_serializeHeatmap() {
			let w = this._parseOptionalNumber(this._heatmap.minValue), T = this._parseOptionalNumber(this._heatmap.maxValue), O = this._heatmap.sensors.map((w, T) => {
				let O = {
					...w.extra,
					id: w.id.trim() || `heatmap_sensor_${T + 1}`,
					entity: w.entity.trim(),
					position: [
						w.position.x,
						w.position.y,
						w.position.z
					],
					radius: w.radius,
					weight: w.weight
				}, j = w.label.trim();
				j ? O.label = j : delete O.label;
				let F = w.valueAttribute.trim();
				return F ? O.value_attribute = F : delete O.value_attribute, O;
			}), j = this._heatmap.colorRanges.map((w) => ({
				...w.extra,
				value: w.value,
				color: w.color.trim()
			})), F = {
				...this._heatmap.extra,
				enabled: this._heatmap.enabled,
				default_visible: this._heatmap.defaultVisible,
				radius: this._heatmap.radius,
				weight: this._heatmap.weight,
				opacity: this._heatmap.opacity,
				resolution: this._heatmap.resolution,
				blur: this._heatmap.blur,
				sensors: O
			};
			return w === null ? delete F.min : F.min = w, T === null ? delete F.max : F.max = T, j.length > 0 ? F.color_ranges = j : delete F.color_ranges, this._heatmapsConfigured || O.length > 0 || j.length > 0 || w !== null || T !== null || this._hasNonDefaultHeatmapGlobals() || Object.keys(this._heatmap.extra).length > 0 ? F : null;
		}
		_serializeNavbar() {
			let w = this._navbar.items.map((w, T) => {
				let O = {
					...w.extra,
					id: w.id.trim() || `navbar_item_${T + 1}`,
					label: w.label.trim(),
					icon: w.icon.trim(),
					action: w.action
				};
				return w.action === "set-floater-group" ? O.floater_group = w.floaterGroup.trim().toLowerCase() || "all" : delete O.floater_group, O;
			}), T = {
				...this._navbar.extra,
				enabled: this._navbar.enabled,
				position: this._navbar.position,
				transparent: this._navbar.transparent,
				opacity: this._navbar.opacity,
				blur: this._navbar.blur,
				offset_x: this._navbar.offsetX,
				offset_y: this._navbar.offsetY,
				items: w
			}, O = this._navbar.backgroundColor.trim();
			O ? T.background_color = O : delete T.background_color;
			let j = this._navbar.borderColor.trim();
			j ? T.border_color = j : delete T.border_color;
			let F = this._navbar.textColor.trim();
			F ? T.text_color = F : delete T.text_color;
			let U = this._navbar.iconColor.trim();
			return U ? T.icon_color = U : delete T.icon_color, this._navbarConfigured || Object.keys(this._navbar.extra).length > 0 ? T : null;
		}
		_serializeActions() {
			this._actionsError = "";
			let w = [];
			for (let T = 0; T < this._actions.length; T += 1) {
				let O = this._actions[T];
				if (!O) continue;
				let j = this._parseJsonObject(O.serviceDataJson, `Action ${T + 1} service_data`);
				if (j === null) return null;
				let F = this._parseJsonObject(O.targetJson, `Action ${T + 1} target`);
				if (F === null) return null;
				let U = {
					...O.extra,
					id: O.id.trim() || `action_${T + 1}`,
					label: O.label.trim(),
					service: O.service.trim(),
					close_on_run: O.closeOnRun
				};
				j ? U.service_data = j : delete U.service_data, F ? U.target = F : delete U.target, w.push(U);
			}
			return w;
		}
		_parseRooms(w) {
			return Array.isArray(w) ? w.map((w) => {
				let T = this._asRecord(w);
				if (!T) return null;
				let O = this._asRecord(T.tap_action), j = this._parsePolygon(T.polygon);
				return {
					area: String(T.area ?? "").trim(),
					name: String(T.name ?? "").trim(),
					tapAction: this._normalizeRoomTapAction(O?.action ?? T.tap_action ?? T.press_action ?? T.action ?? T.click_action ?? T.on_click, "popup"),
					navigationPath: String(O?.navigation_path ?? O?.path ?? T.navigation_path ?? T.url_path ?? T.path ?? "").trim(),
					polygon: j.length > 0 ? j : this._createDefaultRoomPolygon(),
					extra: this._withoutKeys(T, [
						"area",
						"name",
						"tap_action",
						"press_action",
						"action",
						"click_action",
						"on_click",
						"navigation_path",
						"url_path",
						"path",
						"polygon"
					])
				};
			}).filter((w) => !!w) : [];
		}
		_parseFloaters(w) {
			return Array.isArray(w) ? w.map((w, T) => {
				let O = this._asRecord(w);
				if (!O) return null;
				let j = this._parsePoint3(O.position, O, {
					x: 0,
					y: 0,
					z: 0
				});
				return {
					id: String(O.id ?? `floater_${T + 1}`),
					entity: String(O.entity ?? O.entity_id ?? "").trim(),
					label: String(O.label ?? O.name ?? "").trim(),
					icon: String(O.icon ?? "").trim(),
					group: String(O.group ?? O.category ?? "").trim().toLowerCase(),
					tapAction: this._normalizeFloaterAction(O.tap_action ?? O.press_action ?? O.action, "toggle"),
					holdAction: this._normalizeFloaterAction(O.hold_action ?? O.long_press_action, "popup"),
					position: j,
					extra: this._withoutKeys(O, [
						"id",
						"entity",
						"entity_id",
						"label",
						"name",
						"icon",
						"group",
						"category",
						"tap_action",
						"press_action",
						"action",
						"hold_action",
						"long_press_action",
						"position",
						"x",
						"y",
						"z"
					])
				};
			}).filter((w) => !!w) : [];
		}
		_parseFloaterOverlap(w) {
			let T = this._asRecord(w);
			return {
				enabled: T?.enabled !== !1,
				distancePx: this._clamp(this._toFinite(T?.distance_px ?? T?.distance ?? T?.overlap_distance ?? T?.threshold_px, DEFAULT_FLOATER_OVERLAP_DISTANCE), 8, 240),
				minItems: Math.round(this._clamp(this._toFinite(T?.min_items ?? T?.minItems ?? T?.group_size, DEFAULT_FLOATER_OVERLAP_MIN_ITEMS), 2, 12)),
				expandDurationMs: Math.round(this._clamp(this._toFinite(T?.expand_duration_ms ?? T?.expandDurationMs ?? T?.expand_ms, DEFAULT_FLOATER_OVERLAP_EXPAND_DURATION_MS), 0, 1e3)),
				extra: this._withoutKeys(T, [
					"enabled",
					"distance_px",
					"distance",
					"overlap_distance",
					"threshold_px",
					"min_items",
					"minItems",
					"group_size",
					"expand_duration_ms",
					"expandDurationMs",
					"expand_ms"
				])
			};
		}
		_parseCamera(w) {
			let T = this._asRecord(w), O = {
				x: T?.position_x ?? T?.camera_x,
				y: T?.position_y ?? T?.camera_y,
				z: T?.position_z ?? T?.camera_z
			}, j = {
				x: T?.rotation_x ?? T?.rotate_x ?? T?.camera_rotation_x,
				y: T?.rotation_y ?? T?.rotate_y ?? T?.camera_rotation_y
			}, F = {
				x: T?.target_x ?? T?.look_at_x ?? T?.lookat_x,
				y: T?.target_y ?? T?.look_at_y ?? T?.lookat_y,
				z: T?.target_z ?? T?.look_at_z ?? T?.lookat_z
			}, U = this._parsePoint3(T?.position ?? T?.camera_position, O, DEFAULT_CAMERA_POSITION), W = this._parseRotation(T?.rotation ?? T?.rotate ?? T?.camera_rotation, j, DEFAULT_CAMERA_ROTATION), G = this._parsePoint3(T?.target ?? T?.look_at ?? T?.lookat, F, DEFAULT_CAMERA_TARGET);
			return {
				position: U,
				rotation: this._hasCameraRotation(T) ? W : this._hasLegacyCameraTarget(T) ? this._deriveRotationFromTarget(U, G) : W,
				maxZoomOut: Math.round(this._clamp(this._toFinite(T?.max_zoom_out ?? T?.maxZoomOut ?? T?.max_distance ?? T?.maxDistance, DEFAULT_CAMERA_MAX_ZOOM_OUT), 2, 300)),
				extra: this._withoutKeys(T, /* @__PURE__ */ "position.camera_position.position_x.position_y.position_z.camera_x.camera_y.camera_z.rotation.rotate.camera_rotation.rotation_x.rotation_y.rotation_z.rotate_x.rotate_y.rotate_z.camera_rotation_x.camera_rotation_y.camera_rotation_z.target.look_at.lookat.target_x.target_y.target_z.look_at_x.look_at_y.look_at_z.lookat_x.lookat_y.lookat_z.max_zoom_out.maxZoomOut.max_distance.maxDistance".split("."))
			};
		}
		_parseRenderer(w) {
			let T = this._asRecord(w);
			return {
				wallColor: String(T?.wall_color ?? T?.wallColor ?? T?.walls_color ?? T?.wallsColor ?? "").trim(),
				wallOpacity: this._clamp(this._toFinite(T?.wall_opacity ?? T?.wallOpacity ?? T?.wall_alpha ?? T?.wallAlpha, DEFAULT_RENDERER_WALL_OPACITY), 0, 1),
				wallHeight: this._clamp(this._toFinite(T?.wall_height ?? T?.wallHeight ?? T?.walls_height ?? T?.wallsHeight, DEFAULT_RENDERER_WALL_HEIGHT), .2, 10),
				gridEnabled: (T?.grid_enabled ?? T?.gridEnabled ?? T?.grid ?? T?.show_grid) !== !1,
				gridColor: String(T?.grid_color ?? T?.gridColor ?? "").trim(),
				backgroundColor: String(T?.background_color ?? T?.backgroundColor ?? T?.background ?? T?.scene_background_color ?? T?.sceneBackgroundColor ?? "").trim(),
				lightSimulationEnabled: (T?.light_simulation_enabled ?? T?.lightSimulationEnabled ?? T?.simulate_lights ?? T?.simulateLights) !== !1,
				lightSimulationIntensity: this._clamp(this._toFinite(T?.light_simulation_intensity ?? T?.lightSimulationIntensity ?? T?.light_intensity ?? T?.lightIntensity, DEFAULT_RENDERER_LIGHT_SIMULATION_INTENSITY), 0, 8),
				lightSimulationRange: this._clamp(this._toFinite(T?.light_simulation_range ?? T?.lightSimulationRange ?? T?.light_range ?? T?.lightRange, DEFAULT_RENDERER_LIGHT_SIMULATION_RANGE), .5, 20),
				lightSimulationDecay: this._clamp(this._toFinite(T?.light_simulation_decay ?? T?.lightSimulationDecay ?? T?.light_decay ?? T?.lightDecay, DEFAULT_RENDERER_LIGHT_SIMULATION_DECAY), 0, 4),
				cardTransparent: (T?.card_transparent ?? T?.cardTransparent ?? T?.transparent_card ?? T?.transparentCard) === !0,
				cardBackgroundColor: String(T?.card_background_color ?? T?.cardBackgroundColor ?? T?.card_background ?? T?.cardBackground ?? "").trim(),
				extra: this._withoutKeys(T, /* @__PURE__ */ "wall_color.wallColor.walls_color.wallsColor.wall_opacity.wallOpacity.wall_alpha.wallAlpha.wall_height.wallHeight.walls_height.wallsHeight.grid_enabled.gridEnabled.grid.show_grid.grid_color.gridColor.background_color.backgroundColor.background.scene_background_color.sceneBackgroundColor.light_simulation_enabled.lightSimulationEnabled.simulate_lights.simulateLights.light_simulation_intensity.lightSimulationIntensity.light_intensity.lightIntensity.light_simulation_range.lightSimulationRange.light_range.lightRange.light_simulation_decay.lightSimulationDecay.light_decay.lightDecay.card_transparent.cardTransparent.transparent_card.transparentCard.card_background_color.cardBackgroundColor.card_background.cardBackground".split("."))
			};
		}
		_hasLegacyCameraTarget(w) {
			return w ? w.target !== void 0 || w.look_at !== void 0 || w.lookat !== void 0 || w.target_x !== void 0 || w.target_y !== void 0 || w.target_z !== void 0 || w.look_at_x !== void 0 || w.look_at_y !== void 0 || w.look_at_z !== void 0 || w.lookat_x !== void 0 || w.lookat_y !== void 0 || w.lookat_z !== void 0 : !1;
		}
		_hasCameraRotation(w) {
			return w ? w.rotation !== void 0 || w.rotate !== void 0 || w.camera_rotation !== void 0 || w.rotation_x !== void 0 || w.rotation_y !== void 0 || w.rotation_z !== void 0 || w.rotate_x !== void 0 || w.rotate_y !== void 0 || w.rotate_z !== void 0 || w.camera_rotation_x !== void 0 || w.camera_rotation_y !== void 0 || w.camera_rotation_z !== void 0 : !1;
		}
		_deriveRotationFromTarget(w, T) {
			let O = T.x - w.x, j = T.y - w.y, F = T.z - w.z, U = Math.sqrt(O * O + j * j + F * F);
			if (U <= LOOK_DIRECTION_EPSILON) return { ...DEFAULT_CAMERA_ROTATION };
			let W = O / U, G = j / U, K = F / U, q = Math.asin(this._clamp(G, -1, 1)), J = Math.atan2(-W, -K), Y = 180 / Math.PI;
			return this._normalizeCameraRotation({
				x: q * Y,
				y: J * Y
			});
		}
		_parseHeatmap(w) {
			let T = this._asRecord(w), O = T?.sensors ?? T?.entries ?? T?.points ?? w, j = this._parseHeatmapSensors(O), F = this._parseHeatmapColorRanges(T?.color_ranges ?? T?.color_stops ?? T?.ranges ?? T?.temperature_ranges);
			return {
				enabled: T?.enabled !== !1,
				defaultVisible: T?.default_visible !== !1 && T?.visible !== !1,
				minValue: this._numberToString(T?.min ?? T?.min_value),
				maxValue: this._numberToString(T?.max ?? T?.max_value),
				radius: this._clamp(this._toFinite(T?.radius, DEFAULT_HEATMAP_RADIUS), .25, 30),
				weight: this._clamp(this._toFinite(T?.weight, DEFAULT_HEATMAP_WEIGHT), .05, 10),
				opacity: this._clamp(this._toFinite(T?.opacity, DEFAULT_HEATMAP_OPACITY), .05, 1),
				resolution: Math.round(this._clamp(this._toFinite(T?.resolution, DEFAULT_HEATMAP_RESOLUTION), 96, 384)),
				blur: this._clamp(this._toFinite(T?.blur ?? T?.softness, DEFAULT_HEATMAP_BLUR), 0, 1),
				sensors: j,
				colorRanges: F,
				extra: this._withoutKeys(T, [
					"enabled",
					"default_visible",
					"visible",
					"min",
					"min_value",
					"max",
					"max_value",
					"radius",
					"weight",
					"opacity",
					"resolution",
					"blur",
					"softness",
					"sensors",
					"entries",
					"points",
					"color_ranges",
					"color_stops",
					"ranges",
					"temperature_ranges"
				])
			};
		}
		_parseHeatmapSensors(w) {
			return Array.isArray(w) ? w.map((w, T) => {
				let O = this._asRecord(w);
				if (!O) return null;
				let j = this._parsePoint3(O.position, O, {
					x: 0,
					y: 0,
					z: 0
				});
				return {
					id: String(O.id ?? `heatmap_sensor_${T + 1}`),
					entity: String(O.entity ?? O.entity_id ?? "").trim(),
					label: String(O.label ?? O.name ?? "").trim(),
					valueAttribute: String(O.value_attribute ?? O.attribute ?? "").trim(),
					radius: this._clamp(this._toFinite(O.radius, DEFAULT_HEATMAP_RADIUS), .25, 30),
					weight: this._clamp(this._toFinite(O.weight, DEFAULT_HEATMAP_WEIGHT), .05, 10),
					position: j,
					extra: this._withoutKeys(O, [
						"id",
						"entity",
						"entity_id",
						"label",
						"name",
						"value_attribute",
						"attribute",
						"radius",
						"weight",
						"position",
						"x",
						"y",
						"z"
					])
				};
			}).filter((w) => !!w) : [];
		}
		_parseHeatmapColorRanges(w) {
			return Array.isArray(w) ? w.map((w) => {
				if (Array.isArray(w) && w.length >= 2) return {
					value: this._toFinite(w[0], 0),
					color: String(w[1] ?? "").trim(),
					extra: {}
				};
				let T = this._asRecord(w);
				return T ? {
					value: this._toFinite(T.value ?? T.at ?? T.temperature ?? T.temp, 0),
					color: String(T.color ?? T.colour ?? "").trim(),
					extra: this._withoutKeys(T, [
						"value",
						"at",
						"temperature",
						"temp",
						"color",
						"colour"
					])
				} : null;
			}).filter((w) => !!w) : [];
		}
		_parseNavbar(w) {
			let T = this._asRecord(w);
			return {
				enabled: T?.enabled !== !1,
				position: this._normalizeNavbarPosition(T?.position),
				transparent: T?.transparent !== !1,
				opacity: this._clamp(this._toFinite(T?.opacity, .58), .05, 1),
				blur: this._clamp(this._toFinite(T?.blur, 10), 0, 28),
				backgroundColor: String(T?.background_color ?? T?.background ?? "").trim(),
				borderColor: String(T?.border_color ?? T?.borderColor ?? "").trim(),
				textColor: String(T?.text_color ?? T?.textColor ?? "").trim(),
				iconColor: String(T?.icon_color ?? T?.iconColor ?? "").trim(),
				offsetX: Math.round(this._clamp(this._toFinite(T?.offset_x ?? T?.offsetX, 14), 0, 128)),
				offsetY: Math.round(this._clamp(this._toFinite(T?.offset_y ?? T?.offsetY, 16), 0, 128)),
				items: this._parseNavbarItems(T?.items),
				extra: this._withoutKeys(T, [
					"enabled",
					"position",
					"transparent",
					"opacity",
					"blur",
					"background",
					"background_color",
					"border_color",
					"borderColor",
					"text_color",
					"textColor",
					"icon_color",
					"iconColor",
					"offset_x",
					"offsetX",
					"offset_y",
					"offsetY",
					"items"
				])
			};
		}
		_parseNavbarItems(w) {
			if (!Array.isArray(w)) return [{
				id: "heatmap-toggle",
				label: "Heatmap",
				icon: "mdi:thermometer",
				action: "toggle-heatmap",
				floaterGroup: "",
				extra: {}
			}];
			let T = w.map((w, T) => {
				let O = this._asRecord(w);
				if (!O) return null;
				let j = this._normalizeNavbarAction(O.action ?? O.type, "toggle-heatmap");
				return {
					id: String(O.id ?? `navbar_item_${T + 1}`).trim(),
					label: String(O.label ?? O.name ?? "").trim(),
					icon: String(O.icon ?? "").trim(),
					action: j,
					floaterGroup: String(O.floater_group ?? O.group ?? O.target ?? "").trim().toLowerCase(),
					extra: this._withoutKeys(O, [
						"id",
						"label",
						"name",
						"icon",
						"action",
						"type",
						"floater_group",
						"group",
						"target"
					])
				};
			}).filter((w) => !!w);
			return T.length > 0 ? T : [{
				id: "heatmap-toggle",
				label: "Heatmap",
				icon: "mdi:thermometer",
				action: "toggle-heatmap",
				floaterGroup: "",
				extra: {}
			}];
		}
		_parseActions(w) {
			return Array.isArray(w) ? w.map((w, T) => {
				let O = this._asRecord(w);
				if (!O) return null;
				let j = this._asRecord(O.service_data) ?? this._asRecord(O.data), F = this._asRecord(O.target);
				return {
					id: String(O.id ?? `action_${T + 1}`).trim(),
					label: String(O.label ?? O.name ?? "").trim(),
					service: String(O.service ?? O.action ?? "").trim(),
					closeOnRun: O.close_on_run !== !1,
					serviceDataJson: j ? JSON.stringify(j) : "",
					targetJson: F ? JSON.stringify(F) : "",
					extra: this._withoutKeys(O, [
						"id",
						"label",
						"name",
						"service",
						"action",
						"service_data",
						"data",
						"target",
						"close_on_run"
					])
				};
			}).filter((w) => !!w) : [];
		}
		_createDefaultRoomPolygon() {
			return [
				{
					x: 0,
					z: 0
				},
				{
					x: 2,
					z: 0
				},
				{
					x: 2,
					z: 2
				},
				{
					x: 0,
					z: 2
				}
			];
		}
		_createDefaultCameraEditorConfig() {
			return {
				position: { ...DEFAULT_CAMERA_POSITION },
				rotation: { ...DEFAULT_CAMERA_ROTATION },
				maxZoomOut: DEFAULT_CAMERA_MAX_ZOOM_OUT,
				extra: {}
			};
		}
		_createDefaultRendererEditorConfig() {
			return {
				wallColor: "",
				wallOpacity: DEFAULT_RENDERER_WALL_OPACITY,
				wallHeight: DEFAULT_RENDERER_WALL_HEIGHT,
				gridEnabled: DEFAULT_RENDERER_GRID_ENABLED,
				gridColor: "",
				backgroundColor: "",
				lightSimulationEnabled: DEFAULT_RENDERER_LIGHT_SIMULATION_ENABLED,
				lightSimulationIntensity: DEFAULT_RENDERER_LIGHT_SIMULATION_INTENSITY,
				lightSimulationRange: DEFAULT_RENDERER_LIGHT_SIMULATION_RANGE,
				lightSimulationDecay: DEFAULT_RENDERER_LIGHT_SIMULATION_DECAY,
				cardTransparent: DEFAULT_RENDERER_CARD_TRANSPARENT,
				cardBackgroundColor: "",
				extra: {}
			};
		}
		_createDefaultFloaterOverlapEditorConfig() {
			return {
				enabled: !0,
				distancePx: DEFAULT_FLOATER_OVERLAP_DISTANCE,
				minItems: DEFAULT_FLOATER_OVERLAP_MIN_ITEMS,
				expandDurationMs: DEFAULT_FLOATER_OVERLAP_EXPAND_DURATION_MS,
				extra: {}
			};
		}
		_createDefaultHeatmapEditorConfig() {
			return {
				enabled: !0,
				defaultVisible: !0,
				minValue: "",
				maxValue: "",
				radius: DEFAULT_HEATMAP_RADIUS,
				weight: DEFAULT_HEATMAP_WEIGHT,
				opacity: DEFAULT_HEATMAP_OPACITY,
				resolution: DEFAULT_HEATMAP_RESOLUTION,
				blur: DEFAULT_HEATMAP_BLUR,
				sensors: [],
				colorRanges: [],
				extra: {}
			};
		}
		_createDefaultNavbarEditorConfig() {
			return {
				enabled: !0,
				position: "left",
				transparent: !0,
				opacity: .58,
				blur: 10,
				backgroundColor: "",
				borderColor: "",
				textColor: "",
				iconColor: "",
				offsetX: 14,
				offsetY: 16,
				items: [{
					id: "heatmap-toggle",
					label: "Heatmap",
					icon: "mdi:thermometer",
					action: "toggle-heatmap",
					floaterGroup: "",
					extra: {}
				}],
				extra: {}
			};
		}
		_asRecord(w) {
			return !w || typeof w != "object" || Array.isArray(w) ? null : w;
		}
		_withoutKeys(w, T) {
			if (!w) return {};
			let O = new Set(T), j = {};
			for (let [T, F] of Object.entries(w)) O.has(T) || (j[T] = F);
			return j;
		}
		_parsePolygon(w) {
			if (!Array.isArray(w)) return [];
			let T = [];
			for (let O of w) {
				if (!Array.isArray(O) || O.length < 2) continue;
				let w = Number(O[0]), j = Number(O[1]);
				!Number.isFinite(w) || !Number.isFinite(j) || T.push({
					x: w,
					z: j
				});
			}
			return T;
		}
		_parsePoint3(w, T, O) {
			if (w && typeof w == "object" && !Array.isArray(w)) {
				let T = w, O = Number(T.x), j = Number(T.y), F = Number(T.z);
				if (Number.isFinite(O) && Number.isFinite(j) && Number.isFinite(F)) return {
					x: O,
					y: j,
					z: F
				};
			}
			if (Array.isArray(w) && w.length >= 3) {
				let T = Number(w[0]), O = Number(w[1]), j = Number(w[2]);
				if (Number.isFinite(T) && Number.isFinite(O) && Number.isFinite(j)) return {
					x: T,
					y: O,
					z: j
				};
			}
			let j = Number(T.x), F = Number(T.y), U = Number(T.z);
			return Number.isFinite(j) && Number.isFinite(F) && Number.isFinite(U) ? {
				x: j,
				y: F,
				z: U
			} : { ...O };
		}
		_parseRotation(w, T, O) {
			if (w && typeof w == "object" && !Array.isArray(w)) {
				let T = w, O = Number(T.x), j = Number(T.y);
				if (Number.isFinite(O) && Number.isFinite(j)) return this._normalizeCameraRotation({
					x: O,
					y: j
				});
			}
			if (Array.isArray(w) && w.length >= 2) {
				let T = Number(w[0]), O = Number(w[1]);
				if (Number.isFinite(T) && Number.isFinite(O)) return this._normalizeCameraRotation({
					x: T,
					y: O
				});
			}
			let j = Number(T.x), F = Number(T.y);
			return Number.isFinite(j) && Number.isFinite(F) ? this._normalizeCameraRotation({
				x: j,
				y: F
			}) : this._normalizeCameraRotation({ ...O });
		}
		_normalizeCameraRotation(w) {
			let T = this._clamp(w.x, MIN_CAMERA_PITCH_DEG, MAX_CAMERA_PITCH_DEG), O = (w.y % 360 + 360) % 360;
			return {
				x: T,
				y: O > 180 ? O - 360 : O
			};
		}
		_normalizeFloaterAction(w, T) {
			let O = String(w ?? "").trim().toLowerCase().replace(/_/g, "-");
			return O === "more-info" ? "more-info" : O === "popup" ? "popup" : O === "toggle" ? "toggle" : T;
		}
		_normalizeRoomTapAction(w, T) {
			let O = String(w ?? "").trim().toLowerCase().replace(/_/g, "-");
			return O === "popup" ? "popup" : O === "navigate" ? "navigate" : O === "none" || O === "disabled" || O === "ignore" ? "none" : T;
		}
		_normalizeNavbarPosition(w) {
			let T = String(w ?? "").trim().toLowerCase().replace(/_/g, "-");
			return T === "right" ? "right" : T === "top" ? "top" : T === "bottom" ? "bottom" : T === "top-left" ? "top-left" : T === "top-right" ? "top-right" : T === "bottom-left" ? "bottom-left" : T === "bottom-right" ? "bottom-right" : "left";
		}
		_normalizeNavbarAction(w, T) {
			let O = String(w ?? "").trim().toLowerCase().replace(/_/g, "-");
			return O === "set-floater-group" ? "set-floater-group" : O === "toggle-heatmap" ? "toggle-heatmap" : T;
		}
		_toFinite(w, T) {
			if (w == null || typeof w == "string" && w.trim() === "") return T;
			let O = Number(w);
			return Number.isFinite(O) ? O : T;
		}
		_hasValueKey(w, T) {
			return Object.prototype.hasOwnProperty.call(w, T);
		}
		_nextTextValue(w, T, O) {
			return this._hasValueKey(w, T) ? String(w[T] ?? "").trim() : O;
		}
		_clamp(w, T, O) {
			return Math.min(O, Math.max(T, w));
		}
		_numberToString(w) {
			let T = Number(w);
			return Number.isFinite(T) ? String(T) : "";
		}
		_parseOptionalNumber(w) {
			let T = w.trim();
			if (!T) return null;
			let O = Number(T);
			return Number.isFinite(O) ? O : null;
		}
		_parseJsonObject(w, T) {
			let O = w.trim();
			if (O) try {
				let w = JSON.parse(O);
				return !w || typeof w != "object" || Array.isArray(w) ? (this._actionsError = `${T} must be a JSON object.`, null) : w;
			} catch (w) {
				return this._actionsError = `${T} contains invalid JSON (${w instanceof Error ? w.message : String(w)}).`, null;
			}
		}
		_inputValue(w) {
			let T = w.target;
			return String(T?.value ?? "");
		}
		_hasNonDefaultHeatmapGlobals() {
			return this._heatmap.enabled !== !0 || this._heatmap.defaultVisible !== !0 || Math.abs(this._heatmap.radius - DEFAULT_HEATMAP_RADIUS) > 1e-4 || Math.abs(this._heatmap.weight - DEFAULT_HEATMAP_WEIGHT) > 1e-4 || Math.abs(this._heatmap.opacity - DEFAULT_HEATMAP_OPACITY) > 1e-4 || this._heatmap.resolution !== DEFAULT_HEATMAP_RESOLUTION || Math.abs(this._heatmap.blur - DEFAULT_HEATMAP_BLUR) > 1e-4;
		}
		_createBaseConfig() {
			return {
				...this._config,
				type: String(this._config.type ?? CARD_TYPE)
			};
		}
		_fireConfigChanged(w) {
			this._config = { ...w }, this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: w },
				bubbles: !0,
				composed: !0
			}));
		}
	};
})), globalWindow = window;
globalWindow.process ??= { env: {} }, globalWindow.process.env ??= {};
var CARD_TAG = "lovelace-3d", Lovelace3DCard = class extends HTMLElement {
	constructor() {
		super(), this._state = reactive({
			hass: null,
			config: {}
		}), this._app = null, this._mountEl = null, this._root = this.attachShadow({ mode: "open" }), this._root.innerHTML = `
      <style>${style_default}</style>
      <div id="root"></div>
    `, this._mountEl = this._root.querySelector("#root");
	}
	setConfig(w) {
		this._state.config = { ...w ?? {} };
	}
	set hass(w) {
		this._state.hass = w;
	}
	connectedCallback() {
		this._app || !this._mountEl || (this._app = createApp(App_default, { state: this._state }), this._app.mount(this._mountEl));
	}
	disconnectedCallback() {
		this._app &&= (this._app.unmount(), null);
	}
	getCardSize() {
		return 3;
	}
	static async getConfigElement() {
		let { ensureLovelace3DEditorDefined: w } = await Promise.resolve().then(() => (init_lovelace_3d_editor(), lovelace_3d_editor_exports));
		return w(), document.createElement("lovelace-3d-editor");
	}
	static getStubConfig() {
		return {
			type: "custom:lovelace-3d",
			rooms: []
		};
	}
};
customElements.get(CARD_TAG) || customElements.define(CARD_TAG, Lovelace3DCard), globalWindow.customCards ??= [], globalWindow.customCards.some((w) => w.type === CARD_TAG) || globalWindow.customCards.push({
	type: CARD_TAG,
	name: "Lovelace 3D",
	description: "A 3D visualization card for your home automation system"
});
