const TILE_SIZE = 16;
const CHUNK_SIZE = 32;
const global1 = globalThis;
const ANIMATED = {
    2266: {
        frames: [
            2266,
            2267,
            2268,
            2269
        ].map((frame)=>`${frame}`
        ),
        speed: 0.025
    },
    2374: {
        frames: [
            2374,
            2375,
            2376,
            2377,
            2378,
            2379,
            2380,
            2381
        ].map((frame)=>`${frame}`
        ),
        speed: 0.075
    },
    658: {
        frames: [
            658,
            659,
            660,
            659
        ].map((frame)=>`${frame}`
        ),
        speed: 0.05
    },
    661: {
        frames: [
            661,
            662,
            663,
            664,
            663,
            664,
            663,
            664,
            663,
            664,
            662,
            661,
            661,
            661
        ].map((frame)=>`${frame}`
        ),
        speed: 0.05
    },
    774: {
        frames: [
            774,
            775,
            776,
            777,
            776,
            777,
            776,
            777,
            776,
            777,
            775,
            774,
            774,
            774
        ].map((frame)=>`${frame}`
        ),
        speed: 0.05
    }
};
var PATCH;
(function(PATCH) {
    PATCH[PATCH["UNCHANGED"] = 0] = "UNCHANGED";
    PATCH[PATCH["CREATED"] = 0.25] = "CREATED";
    PATCH[PATCH["EDITED"] = 0.5] = "EDITED";
    PATCH[PATCH["DELETED"] = 0.75] = "DELETED";
})(PATCH || (PATCH = {
}));
const CREATURES_FLYING = [
    "wingull",
    "pelipper"
];
var t3 = setTimeout;
function e(t) {
    return Boolean(t && void 0 !== t.length);
}
function r() {
}
function i(t) {
    if (!(this instanceof i)) throw new TypeError("Promises must be constructed via new");
    if ("function" != typeof t) throw new TypeError("not a function");
    this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], u(t, this);
}
function n(t, e) {
    for(; 3 === t._state;)t = t._value;
    0 !== t._state ? (t._handled = !0, i._immediateFn(function() {
        var r = 1 === t._state ? e.onFulfilled : e.onRejected;
        if (null !== r) {
            var i;
            try {
                i = r(t._value);
            } catch (t1) {
                return void s(e.promise, t1);
            }
            o(e.promise, i);
        } else (1 === t._state ? o : s)(e.promise, t._value);
    })) : t._deferreds.push(e);
}
function o(t, e) {
    try {
        if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
        if (e && ("object" == typeof e || "function" == typeof e)) {
            var r = e.then;
            if (e instanceof i) return t._state = 3, t._value = e, void a(t);
            if ("function" == typeof r) return void u((n = r, o = e, function() {
                n.apply(o, arguments);
            }), t);
        }
        t._state = 1, t._value = e, a(t);
    } catch (e1) {
        s(t, e1);
    }
    var n, o;
}
function s(t, e) {
    t._state = 2, t._value = e, a(t);
}
function a(t) {
    2 === t._state && 0 === t._deferreds.length && i._immediateFn(function() {
        t._handled || i._unhandledRejectionFn(t._value);
    });
    for(var e1 = 0, r1 = t._deferreds.length; e1 < r1; e1++)n(t, t._deferreds[e1]);
    t._deferreds = null;
}
function h(t, e, r) {
    this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = r;
}
function u(t, e) {
    var r = !1;
    try {
        t(function(t) {
            r || (r = !0, o(e, t));
        }, function(t) {
            r || (r = !0, s(e, t));
        });
    } catch (t1) {
        if (r) return;
        r = !0, s(e, t1);
    }
}
i.prototype.catch = function(t) {
    return this.then(null, t);
}, i.prototype.then = function(t, e) {
    var i1 = new this.constructor(r);
    return n(this, new h(t, e, i1)), i1;
}, i.prototype.finally = function(t) {
    var e = this.constructor;
    return this.then(function(r) {
        return e.resolve(t()).then(function() {
            return r;
        });
    }, function(r) {
        return e.resolve(t()).then(function() {
            return e.reject(r);
        });
    });
}, i.all = function(t) {
    return new i(function(r, i) {
        if (!e(t)) return i(new TypeError("Promise.all accepts an array"));
        var n = Array.prototype.slice.call(t);
        if (0 === n.length) return r([]);
        var o = n.length;
        function s(t, e) {
            try {
                if (e && ("object" == typeof e || "function" == typeof e)) {
                    var a = e.then;
                    if ("function" == typeof a) return void a.call(e, function(e) {
                        s(t, e);
                    }, i);
                }
                n[t] = e, 0 == --o && r(n);
            } catch (t1) {
                i(t1);
            }
        }
        for(var a = 0; a < n.length; a++)s(a, n[a]);
    });
}, i.allSettled = function(t) {
    return new this(function(e, r) {
        if (!t || void 0 === t.length) return r(new TypeError(typeof t + " " + t + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
        var i = Array.prototype.slice.call(t);
        if (0 === i.length) return e([]);
        var n = i.length;
        function o(t, r) {
            if (r && ("object" == typeof r || "function" == typeof r)) {
                var s = r.then;
                if ("function" == typeof s) return void s.call(r, function(e) {
                    o(t, e);
                }, function(r) {
                    i[t] = {
                        status: "rejected",
                        reason: r
                    }, 0 == --n && e(i);
                });
            }
            i[t] = {
                status: "fulfilled",
                value: r
            }, 0 == --n && e(i);
        }
        for(var s = 0; s < i.length; s++)o(s, i[s]);
    });
}, i.resolve = function(t) {
    return t && "object" == typeof t && t.constructor === i ? t : new i(function(e) {
        e(t);
    });
}, i.reject = function(t) {
    return new i(function(e, r) {
        r(t);
    });
}, i.race = function(t) {
    return new i(function(r, n) {
        if (!e(t)) return n(new TypeError("Promise.race accepts an array"));
        for(var o = 0, s = t.length; o < s; o++)i.resolve(t[o]).then(r, n);
    });
}, i._immediateFn = "function" == typeof setImmediate && function(t) {
    setImmediate(t);
} || function(e) {
    t3(e, 0);
}, i._unhandledRejectionFn = function(t) {
    "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t);
};
var l = Object.getOwnPropertySymbols, c = Object.prototype.hasOwnProperty, d = Object.prototype.propertyIsEnumerable;
var f = function() {
    try {
        if (!Object.assign) return !1;
        var t2 = new String("abc");
        if (t2[5] = "de", "5" === Object.getOwnPropertyNames(t2)[0]) return !1;
        for(var e1 = {
        }, r1 = 0; r1 < 10; r1++)e1["_" + String.fromCharCode(r1)] = r1;
        if ("0123456789" !== Object.getOwnPropertyNames(e1).map(function(t) {
            return e1[t];
        }).join("")) return !1;
        var i1 = {
        };
        return "abcdefghijklmnopqrst".split("").forEach(function(t) {
            i1[t] = t;
        }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({
        }, i1)).join("");
    } catch (t1) {
        return !1;
    }
}() ? Object.assign : function(t, e) {
    for(var r, i, n = arguments, o1 = function(t) {
        if (null == t) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(t);
    }(t), s1 = 1; s1 < arguments.length; s1++){
        for(var a in r = Object(n[s1]))c.call(r, a) && (o1[a] = r[a]);
        if (l) {
            i = l(r);
            for(var h = 0; h < i.length; h++)d.call(r, i[h]) && (o1[i[h]] = r[i[h]]);
        }
    }
    return o1;
};
if (self.Promise || (self.Promise = i), Object.assign || (Object.assign = f), Date.now && Date.prototype.getTime || (Date.now = function() {
    return (new Date).getTime();
}), !self.performance || !self.performance.now) {
    var p = Date.now();
    self.performance || (self.performance = {
    }), self.performance.now = function() {
        return Date.now() - p;
    };
}
for(var _ = Date.now(), m = [
    "ms",
    "moz",
    "webkit",
    "o"
], v = 0; v < m.length && !self.requestAnimationFrame; ++v){
    var y = m[v];
    self.requestAnimationFrame = self[y + "RequestAnimationFrame"], self.cancelAnimationFrame = self[y + "CancelAnimationFrame"] || self[y + "CancelRequestAnimationFrame"];
}
self.requestAnimationFrame || (self.requestAnimationFrame = function(t) {
    if ("function" != typeof t) throw new TypeError(t + "is not a function");
    var e1 = Date.now(), r1 = 16 + _ - e1;
    return r1 < 0 && (r1 = 0), _ = e1, self.setTimeout(function() {
        _ = Date.now(), t(performance.now());
    }, r1);
}), self.cancelAnimationFrame || (self.cancelAnimationFrame = function(t) {
    return clearTimeout(t);
}), Math.sign || (Math.sign = function(t) {
    return 0 === (t = Number(t)) || isNaN(t) ? t : t > 0 ? 1 : -1;
}), Number.isInteger || (Number.isInteger = function(t) {
    return "number" == typeof t && isFinite(t) && Math.floor(t) === t;
}), self.ArrayBuffer || (self.ArrayBuffer = Array), self.Float32Array || (self.Float32Array = Array), self.Uint32Array || (self.Uint32Array = Array), self.Uint16Array || (self.Uint16Array = Array), self.Uint8Array || (self.Uint8Array = Array), self.Int32Array || (self.Int32Array = Array);
var g = /iPhone/i, E = /iPod/i, T = /iPad/i, b = /\biOS-universal(?:.+)Mac\b/i, x1 = /\bAndroid(?:.+)Mobile\b/i, R = /Android/i, A = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, O = /Silk/i, S = /Windows Phone/i, I = /\bWindows(?:.+)ARM\b/i, P = /BlackBerry/i, N = /BB10/i, M = /Opera Mini/i, D = /\b(CriOS|Chrome)(?:.+)Mobile/i, C = /Mobile(?:.+)Firefox\b/i, w = function(t) {
    return void 0 !== t && "MacIntel" === t.platform && "number" == typeof t.maxTouchPoints && t.maxTouchPoints > 1 && "undefined" == typeof MSStream;
};
var L, F, U, G, B, X, k, H, j, Y, V, W, z, q, K, Z, J, Q, $, tt = function(t) {
    var e1 = {
        userAgent: "",
        platform: "",
        maxTouchPoints: 0
    };
    t || "undefined" == typeof navigator ? "string" == typeof t ? e1.userAgent = t : t && t.userAgent && (e1 = {
        userAgent: t.userAgent,
        platform: t.platform,
        maxTouchPoints: t.maxTouchPoints || 0
    }) : e1 = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        maxTouchPoints: navigator.maxTouchPoints || 0
    };
    var r1 = e1.userAgent, i1 = r1.split("[FBAN");
    void 0 !== i1[1] && (r1 = i1[0]), void 0 !== (i1 = r1.split("Twitter"))[1] && (r1 = i1[0]);
    var n1 = function(t) {
        return function(e) {
            return e.test(t);
        };
    }(r1), o1 = {
        apple: {
            phone: n1(g) && !n1(S),
            ipod: n1(E),
            tablet: !n1(g) && (n1(T) || w(e1)) && !n1(S),
            universal: n1(b),
            device: (n1(g) || n1(E) || n1(T) || n1(b) || w(e1)) && !n1(S)
        },
        amazon: {
            phone: n1(A),
            tablet: !n1(A) && n1(O),
            device: n1(A) || n1(O)
        },
        android: {
            phone: !n1(S) && n1(A) || !n1(S) && n1(x1),
            tablet: !n1(S) && !n1(A) && !n1(x1) && (n1(O) || n1(R)),
            device: !n1(S) && (n1(A) || n1(O) || n1(x1) || n1(R)) || n1(/\bokhttp\b/i)
        },
        windows: {
            phone: n1(S),
            tablet: n1(I),
            device: n1(S) || n1(I)
        },
        other: {
            blackberry: n1(P),
            blackberry10: n1(N),
            opera: n1(M),
            firefox: n1(C),
            chrome: n1(D),
            device: n1(P) || n1(N) || n1(M) || n1(C) || n1(D)
        },
        any: !1,
        phone: !1,
        tablet: !1
    };
    return o1.any = o1.apple.device || o1.android.device || o1.windows.device || o1.other.device, o1.phone = o1.apple.phone || o1.android.phone || o1.windows.phone, o1.tablet = o1.apple.tablet || o1.android.tablet || o1.windows.tablet, o1;
}(self.navigator);
!function(t) {
    t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2";
}(L || (L = {
})), (function(t) {
    t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS";
})(F || (F = {
})), (function(t) {
    t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL";
})(U || (U = {
})), (function(t) {
    t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR";
})(G || (G = {
})), (function(t) {
    t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(B || (B = {
})), (function(t) {
    t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(X || (X = {
})), (function(t) {
    t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(k || (k = {
})), (function(t) {
    t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(H || (H = {
})), (function(t) {
    t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT";
})(j || (j = {
})), (function(t) {
    t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR";
})(Y || (Y = {
})), (function(t) {
    t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(V || (V = {
})), (function(t) {
    t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL";
})(W || (W = {
})), (function(t) {
    t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(z || (z = {
})), (function(t) {
    t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT";
})(q || (q = {
})), (function(t) {
    t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL";
})(K || (K = {
})), (function(t) {
    t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp";
})(Z || (Z = {
})), (function(t) {
    t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE";
})(J || (J = {
})), (function(t) {
    t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH";
})(Q || (Q = {
})), (function(t) {
    t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})($ || ($ = {
}));
var et = {
    MIPMAP_TEXTURES: W.POW2,
    ANISOTROPIC_LEVEL: 0,
    RESOLUTION: 1,
    FILTER_RESOLUTION: 1,
    FILTER_MULTISAMPLE: Q.NONE,
    SPRITE_MAX_TEXTURES: function(t) {
        var e1, r1 = !0;
        (tt.tablet || tt.phone) && (tt.apple.device && (e1 = navigator.userAgent.match(/OS (\d+)_(\d+)?/)) && parseInt(e1[1], 10) < 11 && (r1 = !1), tt.android.device && (e1 = navigator.userAgent.match(/Android\s([0-9.]*)/)) && parseInt(e1[1], 10) < 7 && (r1 = !1));
        return r1 ? 32 : 4;
    }(),
    SPRITE_BATCH_SIZE: 4096,
    RENDER_OPTIONS: {
        view: null,
        antialias: !1,
        autoDensity: !1,
        backgroundColor: 0,
        backgroundAlpha: 1,
        useContextAlpha: !0,
        clearBeforeRender: !0,
        preserveDrawingBuffer: !1,
        width: 800,
        height: 600,
        legacy: !1
    },
    GC_MODE: K.AUTO,
    GC_MAX_IDLE: 3600,
    GC_MAX_CHECK_COUNT: 600,
    WRAP_MODE: V.CLAMP,
    SCALE_MODE: Y.LINEAR,
    PRECISION_VERTEX: Z.HIGH,
    PRECISION_FRAGMENT: tt.apple.device ? Z.HIGH : Z.MEDIUM,
    CAN_UPLOAD_SAME_BUFFER: !tt.apple.device,
    CREATE_IMAGE_BITMAP: !1,
    ROUND_PIXELS: !1
}, rt = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {
};
function it(t, e, r) {
    return t(r = {
        path: e,
        exports: {
        },
        require: function(t, e) {
            return (function() {
                throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
            })(null == e && r.path);
        }
    }, r.exports), r.exports;
}
var nt = it(function(t) {
    var e = Object.prototype.hasOwnProperty, r1 = "~";
    function i() {
    }
    function n(t, e, r) {
        this.fn = t, this.context = e, this.once = r || !1;
    }
    function o(t, e, i, o, s) {
        if ("function" != typeof i) throw new TypeError("The listener must be a function");
        var a = new n(i, o || t, s), h = r1 ? r1 + e : e;
        return t._events[h] ? t._events[h].fn ? t._events[h] = [
            t._events[h],
            a
        ] : t._events[h].push(a) : (t._events[h] = a, t._eventsCount++), t;
    }
    function s(t, e) {
        0 == --t._eventsCount ? t._events = new i : delete t._events[e];
    }
    function a() {
        this._events = new i, this._eventsCount = 0;
    }
    Object.create && (i.prototype = Object.create(null), (new i).__proto__ || (r1 = !1)), a.prototype.eventNames = function() {
        var t1, i1, n1 = [];
        if (0 === this._eventsCount) return n1;
        for(i1 in t1 = this._events)e.call(t1, i1) && n1.push(r1 ? i1.slice(1) : i1);
        return Object.getOwnPropertySymbols ? n1.concat(Object.getOwnPropertySymbols(t1)) : n1;
    }, a.prototype.listeners = function(t) {
        var e1 = r1 ? r1 + t : t, i1 = this._events[e1];
        if (!i1) return [];
        if (i1.fn) return [
            i1.fn
        ];
        for(var n1 = 0, o1 = i1.length, s1 = new Array(o1); n1 < o1; n1++)s1[n1] = i1[n1].fn;
        return s1;
    }, a.prototype.listenerCount = function(t) {
        var e1 = r1 ? r1 + t : t, i1 = this._events[e1];
        return i1 ? i1.fn ? 1 : i1.length : 0;
    }, a.prototype.emit = function(t, e, i, n, o, s) {
        var a = arguments, h = r1 ? r1 + t : t;
        if (!this._events[h]) return !1;
        var u, l, c = this._events[h], d = arguments.length;
        if (c.fn) {
            switch(c.once && this.removeListener(t, c.fn, void 0, !0), d){
                case 1:
                    return c.fn.call(c.context), !0;
                case 2:
                    return c.fn.call(c.context, e), !0;
                case 3:
                    return c.fn.call(c.context, e, i), !0;
                case 4:
                    return c.fn.call(c.context, e, i, n), !0;
                case 5:
                    return c.fn.call(c.context, e, i, n, o), !0;
                case 6:
                    return c.fn.call(c.context, e, i, n, o, s), !0;
            }
            for(l = 1, u = new Array(d - 1); l < d; l++)u[l - 1] = a[l];
            c.fn.apply(c.context, u);
        } else {
            var f, p = c.length;
            for(l = 0; l < p; l++)switch(c[l].once && this.removeListener(t, c[l].fn, void 0, !0), d){
                case 1:
                    c[l].fn.call(c[l].context);
                    break;
                case 2:
                    c[l].fn.call(c[l].context, e);
                    break;
                case 3:
                    c[l].fn.call(c[l].context, e, i);
                    break;
                case 4:
                    c[l].fn.call(c[l].context, e, i, n);
                    break;
                default:
                    if (!u) for(f = 1, u = new Array(d - 1); f < d; f++)u[f - 1] = a[f];
                    c[l].fn.apply(c[l].context, u);
            }
        }
        return !0;
    }, a.prototype.on = function(t, e, r) {
        return o(this, t, e, r, !1);
    }, a.prototype.once = function(t, e, r) {
        return o(this, t, e, r, !0);
    }, a.prototype.removeListener = function(t, e, i, n) {
        var o1 = r1 ? r1 + t : t;
        if (!this._events[o1]) return this;
        if (!e) return s(this, o1), this;
        var a1 = this._events[o1];
        if (a1.fn) a1.fn !== e || n && !a1.once || i && a1.context !== i || s(this, o1);
        else {
            for(var h = 0, u = [], l = a1.length; h < l; h++)(a1[h].fn !== e || n && !a1[h].once || i && a1[h].context !== i) && u.push(a1[h]);
            u.length ? this._events[o1] = 1 === u.length ? u[0] : u : s(this, o1);
        }
        return this;
    }, a.prototype.removeAllListeners = function(t) {
        var e1;
        return t ? (e1 = r1 ? r1 + t : t, this._events[e1] && s(this, e1)) : (this._events = new i, this._eventsCount = 0), this;
    }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = r1, a.EventEmitter = a, t.exports = a;
}), ot = at, st = at;
function at(t, e, r) {
    r = r || 2;
    var i1, n1, o, s, a, h, u1, l1 = e && e.length, c1 = l1 ? e[0] * r : t.length, d1 = ht(t, 0, c1, r, !0), f1 = [];
    if (!d1 || d1.next === d1.prev) return f1;
    if (l1 && (d1 = (function(t, e, r, i) {
        var n11, o1, s1, a1, h1, u11 = [];
        for(n11 = 0, o1 = e.length; n11 < o1; n11++)s1 = e[n11] * i, a1 = n11 < o1 - 1 ? e[n11 + 1] * i : t.length, (h1 = ht(t, s1, a1, i, !1)) === h1.next && (h1.steiner = !0), u11.push(gt(h1));
        for(u11.sort(_t), n11 = 0; n11 < u11.length; n11++)mt(u11[n11], r), r = ut(r, r.next);
        return r;
    })(t, e, d1, r)), t.length > 80 * r) {
        i1 = o = t[0], n1 = s = t[1];
        for(var p = r; p < c1; p += r)(a = t[p]) < i1 && (i1 = a), (h = t[p + 1]) < n1 && (n1 = h), a > o && (o = a), h > s && (s = h);
        u1 = 0 !== (u1 = Math.max(o - i1, s - n1)) ? 1 / u1 : 0;
    }
    return lt(d1, f1, r, i1, n1, u1), f1;
}
function ht(t, e, r, i, n) {
    var o1, s1;
    if (n === Dt(t, e, r, i) > 0) for(o1 = e; o1 < r; o1 += i)s1 = Pt(o1, t[o1], t[o1 + 1], s1);
    else for(o1 = r - i; o1 >= e; o1 -= i)s1 = Pt(o1, t[o1], t[o1 + 1], s1);
    return s1 && xt(s1, s1.next) && (Nt(s1), s1 = s1.next), s1;
}
function ut(t, e) {
    if (!t) return t;
    e || (e = t);
    var r1, i1 = t;
    do {
        if (r1 = !1, i1.steiner || !xt(i1, i1.next) && 0 !== bt(i1.prev, i1, i1.next)) i1 = i1.next;
        else {
            if (Nt(i1), (i1 = e = i1.prev) === i1.next) break;
            r1 = !0;
        }
    }while (r1 || i1 !== e)
    return e;
}
function lt(t, e, r, i, n, o, s) {
    if (t) {
        !s && o && (function(t, e, r, i) {
            var n1 = t;
            do {
                null === n1.z && (n1.z = yt(n1.x, n1.y, e, r, i)), n1.prevZ = n1.prev, n1.nextZ = n1.next, n1 = n1.next;
            }while (n1 !== t)
            n1.prevZ.nextZ = null, n1.prevZ = null, (function(t) {
                var e, r, i, n, o, s, a, h, u = 1;
                do {
                    for(r = t, t = null, o = null, s = 0; r;){
                        for(s++, i = r, a = 0, e = 0; e < u && (a++, i = i.nextZ); e++);
                        for(h = u; a > 0 || h > 0 && i;)0 !== a && (0 === h || !i || r.z <= i.z) ? (n = r, r = r.nextZ, a--) : (n = i, i = i.nextZ, h--), o ? o.nextZ = n : t = n, n.prevZ = o, o = n;
                        r = i;
                    }
                    o.nextZ = null, u *= 2;
                }while (s > 1)
            })(n1);
        })(t, i, n, o);
        for(var a, h, u = t; t.prev !== t.next;)if (a = t.prev, h = t.next, o ? dt(t, i, n, o) : ct(t)) e.push(a.i / r), e.push(t.i / r), e.push(h.i / r), Nt(t), t = h.next, u = h.next;
        else if ((t = h) === u) {
            s ? 1 === s ? lt(t = ft(ut(t), e, r), e, r, i, n, o, 2) : 2 === s && pt(t, e, r, i, n, o) : lt(ut(t), e, r, i, n, o, 1);
            break;
        }
    }
}
function ct(t) {
    var e1 = t.prev, r1 = t, i1 = t.next;
    if (bt(e1, r1, i1) >= 0) return !1;
    for(var n1 = t.next.next; n1 !== t.prev;){
        if (Et(e1.x, e1.y, r1.x, r1.y, i1.x, i1.y, n1.x, n1.y) && bt(n1.prev, n1, n1.next) >= 0) return !1;
        n1 = n1.next;
    }
    return !0;
}
function dt(t, e, r, i) {
    var n1 = t.prev, o1 = t, s1 = t.next;
    if (bt(n1, o1, s1) >= 0) return !1;
    for(var a1 = n1.x < o1.x ? n1.x < s1.x ? n1.x : s1.x : o1.x < s1.x ? o1.x : s1.x, h1 = n1.y < o1.y ? n1.y < s1.y ? n1.y : s1.y : o1.y < s1.y ? o1.y : s1.y, u1 = n1.x > o1.x ? n1.x > s1.x ? n1.x : s1.x : o1.x > s1.x ? o1.x : s1.x, l1 = n1.y > o1.y ? n1.y > s1.y ? n1.y : s1.y : o1.y > s1.y ? o1.y : s1.y, c1 = yt(a1, h1, e, r, i), d1 = yt(u1, l1, e, r, i), f1 = t.prevZ, p = t.nextZ; f1 && f1.z >= c1 && p && p.z <= d1;){
        if (f1 !== t.prev && f1 !== t.next && Et(n1.x, n1.y, o1.x, o1.y, s1.x, s1.y, f1.x, f1.y) && bt(f1.prev, f1, f1.next) >= 0) return !1;
        if (f1 = f1.prevZ, p !== t.prev && p !== t.next && Et(n1.x, n1.y, o1.x, o1.y, s1.x, s1.y, p.x, p.y) && bt(p.prev, p, p.next) >= 0) return !1;
        p = p.nextZ;
    }
    for(; f1 && f1.z >= c1;){
        if (f1 !== t.prev && f1 !== t.next && Et(n1.x, n1.y, o1.x, o1.y, s1.x, s1.y, f1.x, f1.y) && bt(f1.prev, f1, f1.next) >= 0) return !1;
        f1 = f1.prevZ;
    }
    for(; p && p.z <= d1;){
        if (p !== t.prev && p !== t.next && Et(n1.x, n1.y, o1.x, o1.y, s1.x, s1.y, p.x, p.y) && bt(p.prev, p, p.next) >= 0) return !1;
        p = p.nextZ;
    }
    return !0;
}
function ft(t, e, r) {
    var i1 = t;
    do {
        var n = i1.prev, o = i1.next.next;
        !xt(n, o) && Rt(n, i1, i1.next, o) && St(n, o) && St(o, n) && (e.push(n.i / r), e.push(i1.i / r), e.push(o.i / r), Nt(i1), Nt(i1.next), i1 = t = o), i1 = i1.next;
    }while (i1 !== t)
    return ut(i1);
}
function pt(t, e, r, i, n, o) {
    var s1 = t;
    do {
        for(var a = s1.next.next; a !== s1.prev;){
            if (s1.i !== a.i && Tt(s1, a)) {
                var h = It(s1, a);
                return s1 = ut(s1, s1.next), h = ut(h, h.next), lt(s1, e, r, i, n, o), void lt(h, e, r, i, n, o);
            }
            a = a.next;
        }
        s1 = s1.next;
    }while (s1 !== t)
}
function _t(t, e) {
    return t.x - e.x;
}
function mt(t, e) {
    if (e = (function(t, e) {
        var r, i = e, n = t.x, o = t.y, s = -1 / 0;
        do {
            if (o <= i.y && o >= i.next.y && i.next.y !== i.y) {
                var a = i.x + (o - i.y) * (i.next.x - i.x) / (i.next.y - i.y);
                if (a <= n && a > s) {
                    if (s = a, a === n) {
                        if (o === i.y) return i;
                        if (o === i.next.y) return i.next;
                    }
                    r = i.x < i.next.x ? i : i.next;
                }
            }
            i = i.next;
        }while (i !== e)
        if (!r) return null;
        if (n === s) return r;
        var h, u = r, l = r.x, c = r.y, d = 1 / 0;
        i = r;
        do {
            n >= i.x && i.x >= l && n !== i.x && Et(o < c ? n : s, o, l, c, o < c ? s : n, o, i.x, i.y) && (h = Math.abs(o - i.y) / (n - i.x), St(i, t) && (h < d || h === d && (i.x > r.x || i.x === r.x && vt(r, i))) && (r = i, d = h)), i = i.next;
        }while (i !== u)
        return r;
    })(t, e)) {
        var r = It(e, t);
        ut(e, e.next), ut(r, r.next);
    }
}
function vt(t, e) {
    return bt(t.prev, t, e.prev) < 0 && bt(e.next, t, t.next) < 0;
}
function yt(t, e, r, i, n) {
    return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - r) * n) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - i) * n) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1;
}
function gt(t) {
    var e1 = t, r1 = t;
    do {
        (e1.x < r1.x || e1.x === r1.x && e1.y < r1.y) && (r1 = e1), e1 = e1.next;
    }while (e1 !== t)
    return r1;
}
function Et(t, e, r, i, n, o, s, a) {
    return (n - s) * (e - a) - (t - s) * (o - a) >= 0 && (t - s) * (i - a) - (r - s) * (e - a) >= 0 && (r - s) * (o - a) - (n - s) * (i - a) >= 0;
}
function Tt(t, e) {
    return t.next.i !== e.i && t.prev.i !== e.i && !function(t, e) {
        var r = t;
        do {
            if (r.i !== t.i && r.next.i !== t.i && r.i !== e.i && r.next.i !== e.i && Rt(r, r.next, t, e)) return !0;
            r = r.next;
        }while (r !== t)
        return !1;
    }(t, e) && (St(t, e) && St(e, t) && (function(t, e) {
        var r = t, i = !1, n = (t.x + e.x) / 2, o = (t.y + e.y) / 2;
        do {
            r.y > o != r.next.y > o && r.next.y !== r.y && n < (r.next.x - r.x) * (o - r.y) / (r.next.y - r.y) + r.x && (i = !i), r = r.next;
        }while (r !== t)
        return i;
    })(t, e) && (bt(t.prev, t, e.prev) || bt(t, e.prev, e)) || xt(t, e) && bt(t.prev, t, t.next) > 0 && bt(e.prev, e, e.next) > 0);
}
function bt(t, e, r) {
    return (e.y - t.y) * (r.x - e.x) - (e.x - t.x) * (r.y - e.y);
}
function xt(t, e) {
    return t.x === e.x && t.y === e.y;
}
function Rt(t, e, r, i) {
    var n1 = Ot(bt(t, e, r)), o1 = Ot(bt(t, e, i)), s1 = Ot(bt(r, i, t)), a1 = Ot(bt(r, i, e));
    return n1 !== o1 && s1 !== a1 || !(0 !== n1 || !At(t, r, e)) || !(0 !== o1 || !At(t, i, e)) || !(0 !== s1 || !At(r, t, i)) || !(0 !== a1 || !At(r, e, i));
}
function At(t, e, r) {
    return e.x <= Math.max(t.x, r.x) && e.x >= Math.min(t.x, r.x) && e.y <= Math.max(t.y, r.y) && e.y >= Math.min(t.y, r.y);
}
function Ot(t) {
    return t > 0 ? 1 : t < 0 ? -1 : 0;
}
function St(t, e) {
    return bt(t.prev, t, t.next) < 0 ? bt(t, e, t.next) >= 0 && bt(t, t.prev, e) >= 0 : bt(t, e, t.prev) < 0 || bt(t, t.next, e) < 0;
}
function It(t, e) {
    var r1 = new Mt(t.i, t.x, t.y), i1 = new Mt(e.i, e.x, e.y), n1 = t.next, o1 = e.prev;
    return t.next = e, e.prev = t, r1.next = n1, n1.prev = r1, i1.next = r1, r1.prev = i1, o1.next = i1, i1.prev = o1, i1;
}
function Pt(t, e, r, i) {
    var n1 = new Mt(t, e, r);
    return i ? (n1.next = i.next, n1.prev = i, i.next.prev = n1, i.next = n1) : (n1.prev = n1, n1.next = n1), n1;
}
function Nt(t) {
    t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ);
}
function Mt(t, e, r) {
    this.i = t, this.x = e, this.y = r, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
function Dt(t, e, r, i) {
    for(var n1 = 0, o1 = e, s1 = r - i; o1 < r; o1 += i)n1 += (t[s1] - t[o1]) * (t[o1 + 1] + t[s1 + 1]), s1 = o1;
    return n1;
}
at.deviation = function(t, e, r, i) {
    var n1 = e && e.length, o1 = n1 ? e[0] * r : t.length, s1 = Math.abs(Dt(t, 0, o1, r));
    if (n1) for(var a1 = 0, h1 = e.length; a1 < h1; a1++){
        var u = e[a1] * r, l = a1 < h1 - 1 ? e[a1 + 1] * r : t.length;
        s1 -= Math.abs(Dt(t, u, l, r));
    }
    var c1 = 0;
    for(a1 = 0; a1 < i.length; a1 += 3){
        var d = i[a1] * r, f = i[a1 + 1] * r, p = i[a1 + 2] * r;
        c1 += Math.abs((t[d] - t[p]) * (t[f + 1] - t[d + 1]) - (t[d] - t[f]) * (t[p + 1] - t[d + 1]));
    }
    return 0 === s1 && 0 === c1 ? 0 : Math.abs((c1 - s1) / s1);
}, at.flatten = function(t) {
    for(var e1 = t[0][0].length, r1 = {
        vertices: [],
        holes: [],
        dimensions: e1
    }, i = 0, n1 = 0; n1 < t.length; n1++){
        for(var o = 0; o < t[n1].length; o++)for(var s = 0; s < e1; s++)r1.vertices.push(t[n1][o][s]);
        n1 > 0 && (i += t[n1 - 1].length, r1.holes.push(i));
    }
    return r1;
}, ot.default = st;
var Ct = it(function(t, e) {
    !function(r) {
        var i = e && !e.nodeType && e, n = t && !t.nodeType && t, o = "object" == typeof rt && rt;
        o.global !== o && o.window !== o && o.self !== o || (r = o);
        var s, a, h = 2147483647, u = 36, l = 1, c = 26, d = 38, f = 700, p = 72, _ = 128, m = "-", v = /^xn--/, y = /[^\x20-\x7E]/, g = /[\x2E\u3002\uFF0E\uFF61]/g, E = {
            overflow: "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input"
        }, T = u - l, b = Math.floor, x = String.fromCharCode;
        function R(t) {
            throw RangeError(E[t]);
        }
        function A(t, e) {
            for(var r1 = t.length, i1 = []; r1--;)i1[r1] = e(t[r1]);
            return i1;
        }
        function O(t, e) {
            var r1 = t.split("@"), i1 = "";
            return r1.length > 1 && (i1 = r1[0] + "@", t = r1[1]), i1 + A((t = t.replace(g, ".")).split("."), e).join(".");
        }
        function S(t) {
            for(var e1, r1, i1 = [], n1 = 0, o1 = t.length; n1 < o1;)(e1 = t.charCodeAt(n1++)) >= 55296 && e1 <= 56319 && n1 < o1 ? 56320 == (64512 & (r1 = t.charCodeAt(n1++))) ? i1.push(((1023 & e1) << 10) + (1023 & r1) + 65536) : (i1.push(e1), n1--) : i1.push(e1);
            return i1;
        }
        function I(t) {
            return A(t, function(t) {
                var e = "";
                return t > 65535 && (e += x((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += x(t);
            }).join("");
        }
        function P(t, e) {
            return t + 22 + 75 * (t < 26) - ((0 != e) << 5);
        }
        function N(t, e, r) {
            var i1 = 0;
            for(t = r ? b(t / f) : t >> 1, t += b(t / e); t > T * c >> 1; i1 += u)t = b(t / T);
            return b(i1 + (T + 1) * t / (t + d));
        }
        function M(t) {
            var e, r1, i1, n1, o, s, a, d, f, v, y, g1 = [], E1 = t.length, T = 0, x = _, A = p;
            for((r1 = t.lastIndexOf(m)) < 0 && (r1 = 0), i1 = 0; i1 < r1; ++i1)t.charCodeAt(i1) >= 128 && R("not-basic"), g1.push(t.charCodeAt(i1));
            for(n1 = r1 > 0 ? r1 + 1 : 0; n1 < E1;){
                for(o = T, s = 1, a = u; n1 >= E1 && R("invalid-input"), ((d = (y = t.charCodeAt(n1++)) - 48 < 10 ? y - 22 : y - 65 < 26 ? y - 65 : y - 97 < 26 ? y - 97 : u) >= u || d > b((h - T) / s)) && R("overflow"), T += d * s, !(d < (f = a <= A ? l : a >= A + c ? c : a - A)); a += u)s > b(h / (v = u - f)) && R("overflow"), s *= v;
                A = N(T - o, e = g1.length + 1, 0 == o), b(T / e) > h - x && R("overflow"), x += b(T / e), T %= e, g1.splice(T++, 0, x);
            }
            return I(g1);
        }
        function D(t) {
            var e1, r1, i1, n1, o1, s1, a, d, f, v, y1, g1, E, T, A, O1 = [];
            for(g1 = (t = S(t)).length, e1 = _, r1 = 0, o1 = p, s1 = 0; s1 < g1; ++s1)(y1 = t[s1]) < 128 && O1.push(x(y1));
            for(i1 = n1 = O1.length, n1 && O1.push(m); i1 < g1;){
                for(a = h, s1 = 0; s1 < g1; ++s1)(y1 = t[s1]) >= e1 && y1 < a && (a = y1);
                for(a - e1 > b((h - r1) / (E = i1 + 1)) && R("overflow"), r1 += (a - e1) * E, e1 = a, s1 = 0; s1 < g1; ++s1)if ((y1 = t[s1]) < e1 && ++r1 > h && R("overflow"), y1 == e1) {
                    for(d = r1, f = u; !(d < (v = f <= o1 ? l : f >= o1 + c ? c : f - o1)); f += u)A = d - v, T = u - v, O1.push(x(P(v + A % T, 0))), d = b(A / T);
                    O1.push(x(P(d, 0))), o1 = N(r1, E, i1 == n1), r1 = 0, ++i1;
                }
                ++r1, ++e1;
            }
            return O1.join("");
        }
        if (s = {
            version: "1.3.2",
            ucs2: {
                decode: S,
                encode: I
            },
            decode: M,
            encode: D,
            toASCII: function(t) {
                return O(t, function(t) {
                    return y.test(t) ? "xn--" + D(t) : t;
                });
            },
            toUnicode: function(t) {
                return O(t, function(t) {
                    return v.test(t) ? M(t.slice(4).toLowerCase()) : t;
                });
            }
        }, i && n) if (t.exports == i) n.exports = s;
        else for(a in s)s.hasOwnProperty(a) && (i[a] = s[a]);
        else r.punycode = s;
    }(rt);
}), wt = {
    isString: function(t) {
        return "string" == typeof t;
    },
    isObject: function(t) {
        return "object" == typeof t && null !== t;
    },
    isNull: function(t) {
        return null === t;
    },
    isNullOrUndefined: function(t) {
        return null == t;
    }
};
function Lt(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
}
var Ft = function(t, e, r, i) {
    e = e || "&", r = r || "=";
    var n1 = {
    };
    if ("string" != typeof t || 0 === t.length) return n1;
    var o = /\+/g;
    t = t.split(e);
    var s1 = 1000;
    i && "number" == typeof i.maxKeys && (s1 = i.maxKeys);
    var a1 = t.length;
    s1 > 0 && a1 > s1 && (a1 = s1);
    for(var h1 = 0; h1 < a1; ++h1){
        var u, l, c, d, f = t[h1].replace(o, "%20"), p = f.indexOf(r);
        p >= 0 ? (u = f.substr(0, p), l = f.substr(p + 1)) : (u = f, l = ""), c = decodeURIComponent(u), d = decodeURIComponent(l), Lt(n1, c) ? Array.isArray(n1[c]) ? n1[c].push(d) : n1[c] = [
            n1[c],
            d
        ] : n1[c] = d;
    }
    return n1;
}, Ut = function(t) {
    switch(typeof t){
        case "string":
            return t;
        case "boolean":
            return t ? "true" : "false";
        case "number":
            return isFinite(t) ? t : "";
        default:
            return "";
    }
}, Gt = function(t, e, r, i) {
    return e = e || "&", r = r || "=", null === t && (t = void 0), "object" == typeof t ? Object.keys(t).map(function(i) {
        var n = encodeURIComponent(Ut(i)) + r;
        return Array.isArray(t[i]) ? t[i].map(function(t) {
            return n + encodeURIComponent(Ut(t));
        }).join(e) : n + encodeURIComponent(Ut(t[i]));
    }).join(e) : i ? encodeURIComponent(Ut(i)) + r + encodeURIComponent(Ut(t)) : "";
}, Bt = it(function(t, e) {
    e.decode = e.parse = Ft, e.encode = e.stringify = Gt;
}), Xt = re, kt = function(t, e) {
    return re(t, !1, !0).resolve(e);
}, Ht = function(t) {
    wt.isString(t) && (t = re(t));
    if (!(t instanceof jt)) return jt.prototype.format.call(t);
    return t.format();
};
function jt() {
    this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
}
var Yt = /^([a-z0-9.+-]+:)/i, Vt = /:[0-9]*$/, Wt = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, zt = [
    "{",
    "}",
    "|",
    "\\",
    "^",
    "`"
].concat([
    "<",
    ">",
    '"',
    "`",
    " ",
    "\r",
    "\n",
    "\t"
]), qt = [
    "'"
].concat(zt), Kt = [
    "%",
    "/",
    "?",
    ";",
    "#"
].concat(qt), Zt = [
    "/",
    "?",
    "#"
], Jt = /^[+a-z0-9A-Z_-]{0,63}$/, Qt = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, $t = {
    javascript: !0,
    "javascript:": !0
}, te = {
    javascript: !0,
    "javascript:": !0
}, ee = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0
};
function re(t, e, r) {
    if (t && wt.isObject(t) && t instanceof jt) return t;
    var i1 = new jt;
    return i1.parse(t, e, r), i1;
}
jt.prototype.parse = function(t, e, r) {
    if (!wt.isString(t)) throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
    var i1 = t.indexOf("?"), n1 = -1 !== i1 && i1 < t.indexOf("#") ? "?" : "#", o1 = t.split(n1);
    o1[0] = o1[0].replace(/\\/g, "/");
    var s1 = t = o1.join(n1);
    if (s1 = s1.trim(), !r && 1 === t.split("#").length) {
        var a = Wt.exec(s1);
        if (a) return this.path = s1, this.href = s1, this.pathname = a[1], a[2] ? (this.search = a[2], this.query = e ? Bt.parse(this.search.substr(1)) : this.search.substr(1)) : e && (this.search = "", this.query = {
        }), this;
    }
    var h1 = Yt.exec(s1);
    if (h1) {
        var u = (h1 = h1[0]).toLowerCase();
        this.protocol = u, s1 = s1.substr(h1.length);
    }
    if (r || h1 || s1.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var l = "//" === s1.substr(0, 2);
        !l || h1 && te[h1] || (s1 = s1.substr(2), this.slashes = !0);
    }
    if (!te[h1] && (l || h1 && !ee[h1])) {
        for(var c, d, f = -1, p = 0; p < Zt.length; p++){
            -1 !== (_ = s1.indexOf(Zt[p])) && (-1 === f || _ < f) && (f = _);
        }
        -1 !== (d = -1 === f ? s1.lastIndexOf("@") : s1.lastIndexOf("@", f)) && (c = s1.slice(0, d), s1 = s1.slice(d + 1), this.auth = decodeURIComponent(c)), f = -1;
        for(p = 0; p < Kt.length; p++){
            var _;
            -1 !== (_ = s1.indexOf(Kt[p])) && (-1 === f || _ < f) && (f = _);
        }
        -1 === f && (f = s1.length), this.host = s1.slice(0, f), s1 = s1.slice(f), this.parseHost(), this.hostname = this.hostname || "";
        var m = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
        if (!m) for(var v = this.hostname.split(/\./), y = (p = 0, v.length); p < y; p++){
            var g = v[p];
            if (g && !g.match(Jt)) {
                for(var E = "", T = 0, b = g.length; T < b; T++)g.charCodeAt(T) > 127 ? E += "x" : E += g[T];
                if (!E.match(Jt)) {
                    var x = v.slice(0, p), R = v.slice(p + 1), A = g.match(Qt);
                    A && (x.push(A[1]), R.unshift(A[2])), R.length && (s1 = "/" + R.join(".") + s1), this.hostname = x.join(".");
                    break;
                }
            }
        }
        this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), m || (this.hostname = Ct.toASCII(this.hostname));
        var O = this.port ? ":" + this.port : "", S = this.hostname || "";
        this.host = S + O, this.href += this.host, m && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== s1[0] && (s1 = "/" + s1));
    }
    if (!$t[u]) for(p = 0, y = qt.length; p < y; p++){
        var I = qt[p];
        if (-1 !== s1.indexOf(I)) {
            var P = encodeURIComponent(I);
            P === I && (P = escape(I)), s1 = s1.split(I).join(P);
        }
    }
    var N1 = s1.indexOf("#");
    -1 !== N1 && (this.hash = s1.substr(N1), s1 = s1.slice(0, N1));
    var M1 = s1.indexOf("?");
    if (-1 !== M1 ? (this.search = s1.substr(M1), this.query = s1.substr(M1 + 1), e && (this.query = Bt.parse(this.query)), s1 = s1.slice(0, M1)) : e && (this.search = "", this.query = {
    }), s1 && (this.pathname = s1), ee[u] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
        O = this.pathname || "";
        var D = this.search || "";
        this.path = O + D;
    }
    return this.href = this.format(), this;
}, jt.prototype.format = function() {
    var t1 = this.auth || "";
    t1 && (t1 = (t1 = encodeURIComponent(t1)).replace(/%3A/i, ":"), t1 += "@");
    var e1 = this.protocol || "", r1 = this.pathname || "", i1 = this.hash || "", n1 = !1, o1 = "";
    this.host ? n1 = t1 + this.host : this.hostname && (n1 = t1 + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (n1 += ":" + this.port)), this.query && wt.isObject(this.query) && Object.keys(this.query).length && (o1 = Bt.stringify(this.query));
    var s1 = this.search || o1 && "?" + o1 || "";
    return e1 && ":" !== e1.substr(-1) && (e1 += ":"), this.slashes || (!e1 || ee[e1]) && !1 !== n1 ? (n1 = "//" + (n1 || ""), r1 && "/" !== r1.charAt(0) && (r1 = "/" + r1)) : n1 || (n1 = ""), i1 && "#" !== i1.charAt(0) && (i1 = "#" + i1), s1 && "?" !== s1.charAt(0) && (s1 = "?" + s1), e1 + n1 + (r1 = r1.replace(/[?#]/g, function(t) {
        return encodeURIComponent(t);
    })) + (s1 = s1.replace("#", "%23")) + i1;
}, jt.prototype.resolve = function(t) {
    return this.resolveObject(re(t, !1, !0)).format();
}, jt.prototype.resolveObject = function(t) {
    if (wt.isString(t)) {
        var e = new jt;
        e.parse(t, !1, !0), t = e;
    }
    for(var r1 = new jt, i1 = Object.keys(this), n1 = 0; n1 < i1.length; n1++){
        var o = i1[n1];
        r1[o] = this[o];
    }
    if (r1.hash = t.hash, "" === t.href) return r1.href = r1.format(), r1;
    if (t.slashes && !t.protocol) {
        for(var s = Object.keys(t), a = 0; a < s.length; a++){
            var h = s[a];
            "protocol" !== h && (r1[h] = t[h]);
        }
        return ee[r1.protocol] && r1.hostname && !r1.pathname && (r1.path = r1.pathname = "/"), r1.href = r1.format(), r1;
    }
    if (t.protocol && t.protocol !== r1.protocol) {
        if (!ee[t.protocol]) {
            for(var u = Object.keys(t), l = 0; l < u.length; l++){
                var c = u[l];
                r1[c] = t[c];
            }
            return r1.href = r1.format(), r1;
        }
        if (r1.protocol = t.protocol, t.host || te[t.protocol]) r1.pathname = t.pathname;
        else {
            for(var d = (t.pathname || "").split("/"); d.length && !(t.host = d.shift()););
            t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== d[0] && d.unshift(""), d.length < 2 && d.unshift(""), r1.pathname = d.join("/");
        }
        if (r1.search = t.search, r1.query = t.query, r1.host = t.host || "", r1.auth = t.auth, r1.hostname = t.hostname || t.host, r1.port = t.port, r1.pathname || r1.search) {
            var f = r1.pathname || "", p = r1.search || "";
            r1.path = f + p;
        }
        return r1.slashes = r1.slashes || t.slashes, r1.href = r1.format(), r1;
    }
    var _1 = r1.pathname && "/" === r1.pathname.charAt(0), m1 = t.host || t.pathname && "/" === t.pathname.charAt(0), v1 = m1 || _1 || r1.host && t.pathname, y = v1, g1 = r1.pathname && r1.pathname.split("/") || [], E1 = (d = t.pathname && t.pathname.split("/") || [], r1.protocol && !ee[r1.protocol]);
    if (E1 && (r1.hostname = "", r1.port = null, r1.host && ("" === g1[0] ? g1[0] = r1.host : g1.unshift(r1.host)), r1.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === d[0] ? d[0] = t.host : d.unshift(t.host)), t.host = null), v1 = v1 && ("" === d[0] || "" === g1[0])), m1) r1.host = t.host || "" === t.host ? t.host : r1.host, r1.hostname = t.hostname || "" === t.hostname ? t.hostname : r1.hostname, r1.search = t.search, r1.query = t.query, g1 = d;
    else if (d.length) g1 || (g1 = []), g1.pop(), g1 = g1.concat(d), r1.search = t.search, r1.query = t.query;
    else if (!wt.isNullOrUndefined(t.search)) {
        if (E1) r1.hostname = r1.host = g1.shift(), (A1 = !!(r1.host && r1.host.indexOf("@") > 0) && r1.host.split("@")) && (r1.auth = A1.shift(), r1.host = r1.hostname = A1.shift());
        return r1.search = t.search, r1.query = t.query, wt.isNull(r1.pathname) && wt.isNull(r1.search) || (r1.path = (r1.pathname ? r1.pathname : "") + (r1.search ? r1.search : "")), r1.href = r1.format(), r1;
    }
    if (!g1.length) return r1.pathname = null, r1.search ? r1.path = "/" + r1.search : r1.path = null, r1.href = r1.format(), r1;
    for(var T1 = g1.slice(-1)[0], b1 = (r1.host || t.host || g1.length > 1) && ("." === T1 || ".." === T1) || "" === T1, x1 = 0, R1 = g1.length; R1 >= 0; R1--)"." === (T1 = g1[R1]) ? g1.splice(R1, 1) : ".." === T1 ? (g1.splice(R1, 1), x1++) : x1 && (g1.splice(R1, 1), x1--);
    if (!v1 && !y) for(; x1--; x1)g1.unshift("..");
    !v1 || "" === g1[0] || g1[0] && "/" === g1[0].charAt(0) || g1.unshift(""), b1 && "/" !== g1.join("/").substr(-1) && g1.push("");
    var A1, O1 = "" === g1[0] || g1[0] && "/" === g1[0].charAt(0);
    E1 && (r1.hostname = r1.host = O1 ? "" : g1.length ? g1.shift() : "", (A1 = !!(r1.host && r1.host.indexOf("@") > 0) && r1.host.split("@")) && (r1.auth = A1.shift(), r1.host = r1.hostname = A1.shift()));
    return (v1 = v1 || r1.host && g1.length) && !O1 && g1.unshift(""), g1.length ? r1.pathname = g1.join("/") : (r1.pathname = null, r1.path = null), wt.isNull(r1.pathname) && wt.isNull(r1.search) || (r1.path = (r1.pathname ? r1.pathname : "") + (r1.search ? r1.search : "")), r1.auth = t.auth || r1.auth, r1.slashes = r1.slashes || t.slashes, r1.href = r1.format(), r1;
}, jt.prototype.parseHost = function() {
    var t1 = this.host, e1 = Vt.exec(t1);
    e1 && (":" !== (e1 = e1[0]) && (this.port = e1.substr(1)), t1 = t1.substr(0, t1.length - e1.length)), t1 && (this.hostname = t1);
};
var ie, ne, oe, se, ae, he, ue, le, ce, de, fe, pe, _e, me, ve, ye, ge, Ee, Te;
!function(t) {
    t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2";
}(ie || (ie = {
})), (function(t) {
    t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS";
})(ne || (ne = {
})), (function(t) {
    t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL";
})(oe || (oe = {
})), (function(t) {
    t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR";
})(se || (se = {
})), (function(t) {
    t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(ae || (ae = {
})), (function(t) {
    t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(he || (he = {
})), (function(t) {
    t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(ue || (ue = {
})), (function(t) {
    t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(le || (le = {
})), (function(t) {
    t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT";
})(ce || (ce = {
})), (function(t) {
    t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR";
})(de || (de = {
})), (function(t) {
    t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(fe || (fe = {
})), (function(t) {
    t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL";
})(pe || (pe = {
})), (function(t) {
    t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(_e || (_e = {
})), (function(t) {
    t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT";
})(me || (me = {
})), (function(t) {
    t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL";
})(ve || (ve = {
})), (function(t) {
    t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp";
})(ye || (ye = {
})), (function(t) {
    t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE";
})(ge || (ge = {
})), (function(t) {
    t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH";
})(Ee || (Ee = {
})), (function(t) {
    t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})(Te || (Te = {
}));
var be = {
    parse: Xt,
    format: Ht,
    resolve: kt
};
et.RETINA_PREFIX = /@([0-9\.]+)x/, et.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1;
var xe, Re = !1, Ae = "6.2.0";
function Oe(t) {
    var e;
    if (!Re) {
        if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
            var r = [
                "\n %c %c %c PixiJS " + Ae + " - ✰ " + t + " ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n",
                "background: #ff66a5; padding:5px 0;",
                "background: #ff66a5; padding:5px 0;",
                "color: #ff66a5; background: #030307; padding:5px 0;",
                "background: #ff66a5; padding:5px 0;",
                "background: #ffc3dc; padding:5px 0;",
                "background: #ff66a5; padding:5px 0;",
                "color: #ff2424; background: #fff; padding:5px 0;",
                "color: #ff2424; background: #fff; padding:5px 0;",
                "color: #ff2424; background: #fff; padding:5px 0;"
            ];
            (e = self.console).log.apply(e, r);
        } else self.console && self.console.log("PixiJS " + Ae + " - " + t + " - http://www.pixijs.com/");
        Re = !0;
    }
}
function Se() {
    return void 0 === xe && (xe = (function() {
        var t = {
            stencil: !0,
            failIfMajorPerformanceCaveat: et.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
        };
        try {
            if (!self.WebGLRenderingContext) return !1;
            var e = document.createElement("canvas"), r = e.getContext("webgl", t) || e.getContext("experimental-webgl", t), i = !(!r || !r.getContextAttributes().stencil);
            if (r) {
                var n = r.getExtension("WEBGL_lose_context");
                n && n.loseContext();
            }
            return r = null, i;
        } catch (t1) {
            return !1;
        }
    })()), xe;
}
var Ie = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    goldenrod: "#daa520",
    gold: "#ffd700",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavenderblush: "#fff0f5",
    lavender: "#e6e6fa",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
};
function Pe(t, e) {
    return void 0 === e && (e = []), e[0] = (t >> 16 & 255) / 255, e[1] = (t >> 8 & 255) / 255, e[2] = (255 & t) / 255, e;
}
function Ne(t) {
    var e1 = t.toString(16);
    return "#" + ("000000".substr(0, 6 - e1.length) + e1);
}
function Me(t) {
    return "string" == typeof t && "#" === (t = Ie[t.toLowerCase()] || t)[0] && (t = t.substr(1)), parseInt(t, 16);
}
var De = function() {
    for(var t1 = [], e1 = [], r1 = 0; r1 < 32; r1++)t1[r1] = r1, e1[r1] = r1;
    t1[se.NORMAL_NPM] = se.NORMAL, t1[se.ADD_NPM] = se.ADD, t1[se.SCREEN_NPM] = se.SCREEN, e1[se.NORMAL] = se.NORMAL_NPM, e1[se.ADD] = se.ADD_NPM, e1[se.SCREEN] = se.SCREEN_NPM;
    var i1 = [];
    return i1.push(e1), i1.push(t1), i1;
}();
function Ce(t, e) {
    return De[e ? 1 : 0][t];
}
function we(t, e, r, i) {
    return r = r || new Float32Array(4), i || void 0 === i ? (r[0] = t[0] * e, r[1] = t[1] * e, r[2] = t[2] * e) : (r[0] = t[0], r[1] = t[1], r[2] = t[2]), r[3] = e, r;
}
function Le(t, e) {
    if (1 === e) return (255 * e << 24) + t;
    if (0 === e) return 0;
    var r1 = t >> 16 & 255, i1 = t >> 8 & 255, n1 = 255 & t;
    return (255 * e << 24) + ((r1 = r1 * e + 0.5 | 0) << 16) + ((i1 = i1 * e + 0.5 | 0) << 8) + (n1 * e + 0.5 | 0);
}
function Fe(t, e, r, i) {
    return (r = r || new Float32Array(4))[0] = (t >> 16 & 255) / 255, r[1] = (t >> 8 & 255) / 255, r[2] = (255 & t) / 255, (i || void 0 === i) && (r[0] *= e, r[1] *= e, r[2] *= e), r[3] = e, r;
}
function Ue(t, e) {
    void 0 === e && (e = null);
    var r1 = 6 * t;
    if ((e = e || new Uint16Array(r1)).length !== r1) throw new Error("Out buffer length is incorrect, got " + e.length + " and expected " + r1);
    for(var i1 = 0, n1 = 0; i1 < r1; i1 += 6, n1 += 4)e[i1 + 0] = n1 + 0, e[i1 + 1] = n1 + 1, e[i1 + 2] = n1 + 2, e[i1 + 3] = n1 + 0, e[i1 + 4] = n1 + 2, e[i1 + 5] = n1 + 3;
    return e;
}
function Ge(t) {
    if (4 === t.BYTES_PER_ELEMENT) return t instanceof Float32Array ? "Float32Array" : t instanceof Uint32Array ? "Uint32Array" : "Int32Array";
    if (2 === t.BYTES_PER_ELEMENT) {
        if (t instanceof Uint16Array) return "Uint16Array";
    } else if (1 === t.BYTES_PER_ELEMENT && t instanceof Uint8Array) return "Uint8Array";
    return null;
}
var Be = {
    Float32Array: Float32Array,
    Uint32Array: Uint32Array,
    Int32Array: Int32Array,
    Uint8Array: Uint8Array
};
function Xe(t) {
    return t += 0 === t ? 1 : 0, --t, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, 1 + (t |= t >>> 16);
}
function ke(t) {
    return !(t & t - 1 || !t);
}
function He(t) {
    var e1 = (t > 65535 ? 1 : 0) << 4, r1 = ((t >>>= e1) > 255 ? 1 : 0) << 3;
    return e1 |= r1, e1 |= r1 = ((t >>>= r1) > 15 ? 1 : 0) << 2, (e1 |= r1 = ((t >>>= r1) > 3 ? 1 : 0) << 1) | (t >>>= r1) >> 1;
}
function je(t, e, r) {
    var i, n1 = t.length;
    if (!(e >= n1 || 0 === r)) {
        var o = n1 - (r = e + r > n1 ? n1 - e : r);
        for(i = e; i < o; ++i)t[i] = t[i + r];
        t.length = o;
    }
}
function Ye(t) {
    return 0 === t ? 0 : t < 0 ? -1 : 1;
}
var Ve = 0;
function We() {
    return ++Ve;
}
var ze = {
};
var qe = {
}, Ke = Object.create(null), Ze = Object.create(null);
var Je = function() {
    function t(t, e, r) {
        this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.resolution = r || et.RESOLUTION, this.resize(t, e);
    }
    return t.prototype.clear = function() {
        this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, t.prototype.resize = function(t, e) {
        this.canvas.width = Math.round(t * this.resolution), this.canvas.height = Math.round(e * this.resolution);
    }, t.prototype.destroy = function() {
        this.context = null, this.canvas = null;
    }, Object.defineProperty(t.prototype, "width", {
        get: function() {
            return this.canvas.width;
        },
        set: function(t) {
            this.canvas.width = Math.round(t);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "height", {
        get: function() {
            return this.canvas.height;
        },
        set: function(t) {
            this.canvas.height = Math.round(t);
        },
        enumerable: !1,
        configurable: !0
    }), t;
}();
function Qe(t) {
    var e1, r1, i1, n1 = t.width, o1 = t.height, s1 = t.getContext("2d"), a1 = s1.getImageData(0, 0, n1, o1).data, h1 = a1.length, u1 = {
        top: null,
        left: null,
        right: null,
        bottom: null
    }, l1 = null;
    for(e1 = 0; e1 < h1; e1 += 4)0 !== a1[e1 + 3] && (r1 = e1 / 4 % n1, i1 = ~~(e1 / 4 / n1), null === u1.top && (u1.top = i1), null === u1.left ? u1.left = r1 : r1 < u1.left && (u1.left = r1), null === u1.right ? u1.right = r1 + 1 : u1.right < r1 && (u1.right = r1 + 1), null === u1.bottom ? u1.bottom = i1 : u1.bottom < i1 && (u1.bottom = i1));
    return null !== u1.top && (n1 = u1.right - u1.left, o1 = u1.bottom - u1.top + 1, l1 = s1.getImageData(u1.left, u1.top, n1, o1)), {
        height: o1,
        width: n1,
        data: l1
    };
}
var $e, tr = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;
function er(t, e) {
    if (void 0 === e && (e = self.location), 0 === t.indexOf("data:")) return "";
    e = e || self.location, $e || ($e = document.createElement("a")), $e.href = t;
    var r1 = be.parse($e.href), i1 = !r1.port && "" === e.port || r1.port === e.port;
    return r1.hostname === e.hostname && i1 && r1.protocol === e.protocol ? "" : "anonymous";
}
function rr(t, e) {
    var r1 = et.RETINA_PREFIX.exec(t);
    return r1 ? parseFloat(r1[1]) : void 0 !== e ? e : 1;
}
var ir, nr = {
    __proto__: null,
    BaseTextureCache: Ze,
    CanvasRenderTarget: Je,
    DATA_URI: tr,
    ProgramCache: qe,
    TextureCache: Ke,
    clearTextureCache: function() {
        var t1;
        for(t1 in Ke)delete Ke[t1];
        for(t1 in Ze)delete Ze[t1];
    },
    correctBlendMode: Ce,
    createIndicesForQuads: Ue,
    decomposeDataUri: function(t) {
        var e1 = tr.exec(t);
        if (e1) return {
            mediaType: e1[1] ? e1[1].toLowerCase() : void 0,
            subType: e1[2] ? e1[2].toLowerCase() : void 0,
            charset: e1[3] ? e1[3].toLowerCase() : void 0,
            encoding: e1[4] ? e1[4].toLowerCase() : void 0,
            data: e1[5]
        };
    },
    deprecation: function(t, e, r) {
        if (void 0 === r && (r = 3), !ze[e]) {
            var i = (new Error).stack;
            void 0 === i ? console.warn("PixiJS Deprecation Warning: ", e + "\nDeprecated since v" + t) : (i = i.split("\n").splice(r).join("\n"), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", e + "\nDeprecated since v" + t), console.warn(i), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", e + "\nDeprecated since v" + t), console.warn(i))), ze[e] = !0;
        }
    },
    destroyTextureCache: function() {
        var t1;
        for(t1 in Ke)Ke[t1].destroy();
        for(t1 in Ze)Ze[t1].destroy();
    },
    determineCrossOrigin: er,
    getBufferType: Ge,
    getResolutionOfUrl: rr,
    hex2rgb: Pe,
    hex2string: Ne,
    interleaveTypedArrays: function(t, e) {
        for(var r1 = 0, i1 = 0, n = {
        }, o1 = 0; o1 < t.length; o1++)i1 += e[o1], r1 += t[o1].length;
        var s1 = new ArrayBuffer(4 * r1), a = null, h = 0;
        for(o1 = 0; o1 < t.length; o1++){
            var u = e[o1], l = t[o1], c = Ge(l);
            n[c] || (n[c] = new Be[c](s1)), a = n[c];
            for(var d = 0; d < l.length; d++)a[(d / u | 0) * i1 + h + d % u] = l[d];
            h += u;
        }
        return new Float32Array(s1);
    },
    isPow2: ke,
    isWebGLSupported: Se,
    log2: He,
    nextPow2: Xe,
    premultiplyBlendMode: De,
    premultiplyRgba: we,
    premultiplyTint: Le,
    premultiplyTintToRgba: Fe,
    removeItems: je,
    rgb2hex: function(t) {
        return (255 * t[0] << 16) + (255 * t[1] << 8) + (255 * t[2] | 0);
    },
    sayHello: Oe,
    sign: Ye,
    skipHello: function() {
        Re = !0;
    },
    string2hex: Me,
    trimCanvas: Qe,
    uid: We,
    url: be,
    isMobile: tt,
    EventEmitter: nt,
    earcut: ot
}, or = 2 * Math.PI, sr = 180 / Math.PI, ar = Math.PI / 180;
!function(t) {
    t[t.POLY = 0] = "POLY", t[t.RECT = 1] = "RECT", t[t.CIRC = 2] = "CIRC", t[t.ELIP = 3] = "ELIP", t[t.RREC = 4] = "RREC";
}(ir || (ir = {
}));
var hr = function() {
    function t(t, e, r, i) {
        void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === i && (i = 0), this.x = Number(t), this.y = Number(e), this.width = Number(r), this.height = Number(i), this.type = ir.RECT;
    }
    return Object.defineProperty(t.prototype, "left", {
        get: function() {
            return this.x;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "right", {
        get: function() {
            return this.x + this.width;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "top", {
        get: function() {
            return this.y;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "bottom", {
        get: function() {
            return this.y + this.height;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t, "EMPTY", {
        get: function() {
            return new t(0, 0, 0, 0);
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.clone = function() {
        return new t(this.x, this.y, this.width, this.height);
    }, t.prototype.copyFrom = function(t) {
        return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this;
    }, t.prototype.copyTo = function(t) {
        return t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t;
    }, t.prototype.contains = function(t, e) {
        return !(this.width <= 0 || this.height <= 0) && t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height;
    }, t.prototype.pad = function(t, e) {
        return void 0 === t && (t = 0), void 0 === e && (e = t), this.x -= t, this.y -= e, this.width += 2 * t, this.height += 2 * e, this;
    }, t.prototype.fit = function(t) {
        var e = Math.max(this.x, t.x), r = Math.min(this.x + this.width, t.x + t.width), i = Math.max(this.y, t.y), n = Math.min(this.y + this.height, t.y + t.height);
        return this.x = e, this.width = Math.max(r - e, 0), this.y = i, this.height = Math.max(n - i, 0), this;
    }, t.prototype.ceil = function(t, e) {
        void 0 === t && (t = 1), void 0 === e && (e = 0.001);
        var r = Math.ceil((this.x + this.width - e) * t) / t, i = Math.ceil((this.y + this.height - e) * t) / t;
        return this.x = Math.floor((this.x + e) * t) / t, this.y = Math.floor((this.y + e) * t) / t, this.width = r - this.x, this.height = i - this.y, this;
    }, t.prototype.enlarge = function(t) {
        var e = Math.min(this.x, t.x), r = Math.max(this.x + this.width, t.x + t.width), i = Math.min(this.y, t.y), n = Math.max(this.y + this.height, t.y + t.height);
        return this.x = e, this.width = r - e, this.y = i, this.height = n - i, this;
    }, t;
}(), ur = function() {
    function t(t, e, r) {
        void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = 0), this.x = t, this.y = e, this.radius = r, this.type = ir.CIRC;
    }
    return t.prototype.clone = function() {
        return new t(this.x, this.y, this.radius);
    }, t.prototype.contains = function(t, e) {
        if (this.radius <= 0) return !1;
        var r = this.radius * this.radius, i = this.x - t, n = this.y - e;
        return (i *= i) + (n *= n) <= r;
    }, t.prototype.getBounds = function() {
        return new hr(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
    }, t;
}(), lr = function() {
    function t(t, e, r, i) {
        void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === i && (i = 0), this.x = t, this.y = e, this.width = r, this.height = i, this.type = ir.ELIP;
    }
    return t.prototype.clone = function() {
        return new t(this.x, this.y, this.width, this.height);
    }, t.prototype.contains = function(t, e) {
        if (this.width <= 0 || this.height <= 0) return !1;
        var r = (t - this.x) / this.width, i = (e - this.y) / this.height;
        return (r *= r) + (i *= i) <= 1;
    }, t.prototype.getBounds = function() {
        return new hr(this.x - this.width, this.y - this.height, this.width, this.height);
    }, t;
}(), cr = function() {
    function t() {
        for(var t1 = arguments, e = [], r = 0; r < arguments.length; r++)e[r] = t1[r];
        var i = Array.isArray(e[0]) ? e[0] : e;
        if ("number" != typeof i[0]) {
            for(var n = [], o = 0, s = i.length; o < s; o++)n.push(i[o].x, i[o].y);
            i = n;
        }
        this.points = i, this.type = ir.POLY, this.closeStroke = !0;
    }
    return t.prototype.clone = function() {
        var e = new t(this.points.slice());
        return e.closeStroke = this.closeStroke, e;
    }, t.prototype.contains = function(t, e) {
        for(var r = !1, i = this.points.length / 2, n = 0, o = i - 1; n < i; o = n++){
            var s = this.points[2 * n], a = this.points[2 * n + 1], h = this.points[2 * o], u = this.points[2 * o + 1];
            a > e != u > e && t < (e - a) / (u - a) * (h - s) + s && (r = !r);
        }
        return r;
    }, t;
}(), dr = function() {
    function t(t, e, r, i, n) {
        void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === i && (i = 0), void 0 === n && (n = 20), this.x = t, this.y = e, this.width = r, this.height = i, this.radius = n, this.type = ir.RREC;
    }
    return t.prototype.clone = function() {
        return new t(this.x, this.y, this.width, this.height, this.radius);
    }, t.prototype.contains = function(t, e) {
        if (this.width <= 0 || this.height <= 0) return !1;
        if (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height) {
            if (e >= this.y + this.radius && e <= this.y + this.height - this.radius || t >= this.x + this.radius && t <= this.x + this.width - this.radius) return !0;
            var r = t - (this.x + this.radius), i = e - (this.y + this.radius), n = this.radius * this.radius;
            if (r * r + i * i <= n) return !0;
            if ((r = t - (this.x + this.width - this.radius)) * r + i * i <= n) return !0;
            if (r * r + (i = e - (this.y + this.height - this.radius)) * i <= n) return !0;
            if ((r = t - (this.x + this.radius)) * r + i * i <= n) return !0;
        }
        return !1;
    }, t;
}(), fr = function() {
    function t(t, e) {
        void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = 0, this.y = 0, this.x = t, this.y = e;
    }
    return t.prototype.clone = function() {
        return new t(this.x, this.y);
    }, t.prototype.copyFrom = function(t) {
        return this.set(t.x, t.y), this;
    }, t.prototype.copyTo = function(t) {
        return t.set(this.x, this.y), t;
    }, t.prototype.equals = function(t) {
        return t.x === this.x && t.y === this.y;
    }, t.prototype.set = function(t, e) {
        return void 0 === t && (t = 0), void 0 === e && (e = t), this.x = t, this.y = e, this;
    }, t;
}(), pr = function() {
    function t(t, e, r, i) {
        void 0 === r && (r = 0), void 0 === i && (i = 0), this._x = r, this._y = i, this.cb = t, this.scope = e;
    }
    return t.prototype.clone = function(e, r) {
        return void 0 === e && (e = this.cb), void 0 === r && (r = this.scope), new t(e, r, this._x, this._y);
    }, t.prototype.set = function(t, e) {
        return void 0 === t && (t = 0), void 0 === e && (e = t), this._x === t && this._y === e || (this._x = t, this._y = e, this.cb.call(this.scope)), this;
    }, t.prototype.copyFrom = function(t) {
        return this._x === t.x && this._y === t.y || (this._x = t.x, this._y = t.y, this.cb.call(this.scope)), this;
    }, t.prototype.copyTo = function(t) {
        return t.set(this._x, this._y), t;
    }, t.prototype.equals = function(t) {
        return t.x === this._x && t.y === this._y;
    }, Object.defineProperty(t.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x !== t && (this._x = t, this.cb.call(this.scope));
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y !== t && (this._y = t, this.cb.call(this.scope));
        },
        enumerable: !1,
        configurable: !0
    }), t;
}(), _r = function() {
    function t(t, e, r, i, n, o) {
        void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === i && (i = 1), void 0 === n && (n = 0), void 0 === o && (o = 0), this.array = null, this.a = t, this.b = e, this.c = r, this.d = i, this.tx = n, this.ty = o;
    }
    return t.prototype.fromArray = function(t) {
        this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5];
    }, t.prototype.set = function(t, e, r, i, n, o) {
        return this.a = t, this.b = e, this.c = r, this.d = i, this.tx = n, this.ty = o, this;
    }, t.prototype.toArray = function(t, e) {
        this.array || (this.array = new Float32Array(9));
        var r = e || this.array;
        return t ? (r[0] = this.a, r[1] = this.b, r[2] = 0, r[3] = this.c, r[4] = this.d, r[5] = 0, r[6] = this.tx, r[7] = this.ty, r[8] = 1) : (r[0] = this.a, r[1] = this.c, r[2] = this.tx, r[3] = this.b, r[4] = this.d, r[5] = this.ty, r[6] = 0, r[7] = 0, r[8] = 1), r;
    }, t.prototype.apply = function(t, e) {
        e = e || new fr;
        var r = t.x, i = t.y;
        return e.x = this.a * r + this.c * i + this.tx, e.y = this.b * r + this.d * i + this.ty, e;
    }, t.prototype.applyInverse = function(t, e) {
        e = e || new fr;
        var r = 1 / (this.a * this.d + this.c * -this.b), i = t.x, n = t.y;
        return e.x = this.d * r * i + -this.c * r * n + (this.ty * this.c - this.tx * this.d) * r, e.y = this.a * r * n + -this.b * r * i + (-this.ty * this.a + this.tx * this.b) * r, e;
    }, t.prototype.translate = function(t, e) {
        return this.tx += t, this.ty += e, this;
    }, t.prototype.scale = function(t, e) {
        return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this;
    }, t.prototype.rotate = function(t) {
        var e = Math.cos(t), r = Math.sin(t), i = this.a, n = this.c, o = this.tx;
        return this.a = i * e - this.b * r, this.b = i * r + this.b * e, this.c = n * e - this.d * r, this.d = n * r + this.d * e, this.tx = o * e - this.ty * r, this.ty = o * r + this.ty * e, this;
    }, t.prototype.append = function(t) {
        var e = this.a, r = this.b, i = this.c, n = this.d;
        return this.a = t.a * e + t.b * i, this.b = t.a * r + t.b * n, this.c = t.c * e + t.d * i, this.d = t.c * r + t.d * n, this.tx = t.tx * e + t.ty * i + this.tx, this.ty = t.tx * r + t.ty * n + this.ty, this;
    }, t.prototype.setTransform = function(t, e, r, i, n, o, s, a, h) {
        return this.a = Math.cos(s + h) * n, this.b = Math.sin(s + h) * n, this.c = -Math.sin(s - a) * o, this.d = Math.cos(s - a) * o, this.tx = t - (r * this.a + i * this.c), this.ty = e - (r * this.b + i * this.d), this;
    }, t.prototype.prepend = function(t) {
        var e = this.tx;
        if (1 !== t.a || 0 !== t.b || 0 !== t.c || 1 !== t.d) {
            var r = this.a, i = this.c;
            this.a = r * t.a + this.b * t.c, this.b = r * t.b + this.b * t.d, this.c = i * t.a + this.d * t.c, this.d = i * t.b + this.d * t.d;
        }
        return this.tx = e * t.a + this.ty * t.c + t.tx, this.ty = e * t.b + this.ty * t.d + t.ty, this;
    }, t.prototype.decompose = function(t) {
        var e = this.a, r = this.b, i = this.c, n = this.d, o = t.pivot, s = -Math.atan2(-i, n), a = Math.atan2(r, e), h = Math.abs(s + a);
        return h < 0.00001 || Math.abs(or - h) < 0.00001 ? (t.rotation = a, t.skew.x = t.skew.y = 0) : (t.rotation = 0, t.skew.x = s, t.skew.y = a), t.scale.x = Math.sqrt(e * e + r * r), t.scale.y = Math.sqrt(i * i + n * n), t.position.x = this.tx + (o.x * e + o.y * i), t.position.y = this.ty + (o.x * r + o.y * n), t;
    }, t.prototype.invert = function() {
        var t1 = this.a, e = this.b, r = this.c, i = this.d, n = this.tx, o = t1 * i - e * r;
        return this.a = i / o, this.b = -e / o, this.c = -r / o, this.d = t1 / o, this.tx = (r * this.ty - i * n) / o, this.ty = -(t1 * this.ty - e * n) / o, this;
    }, t.prototype.identity = function() {
        return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
    }, t.prototype.clone = function() {
        var e = new t;
        return e.a = this.a, e.b = this.b, e.c = this.c, e.d = this.d, e.tx = this.tx, e.ty = this.ty, e;
    }, t.prototype.copyTo = function(t) {
        return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
    }, t.prototype.copyFrom = function(t) {
        return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this;
    }, Object.defineProperty(t, "IDENTITY", {
        get: function() {
            return new t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t, "TEMP_MATRIX", {
        get: function() {
            return new t;
        },
        enumerable: !1,
        configurable: !0
    }), t;
}(), mr = [
    1,
    1,
    0,
    -1,
    -1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    -1,
    -1,
    0,
    1
], vr = [
    0,
    1,
    1,
    1,
    0,
    -1,
    -1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    -1,
    -1
], yr = [
    0,
    -1,
    -1,
    -1,
    0,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    0,
    -1,
    -1,
    -1
], gr = [
    1,
    1,
    0,
    -1,
    -1,
    -1,
    0,
    1,
    -1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1
], Er = [], Tr = [], br = Math.sign;
!function() {
    for(var t1 = 0; t1 < 16; t1++){
        var e = [];
        Er.push(e);
        for(var r = 0; r < 16; r++)for(var i = br(mr[t1] * mr[r] + yr[t1] * vr[r]), n = br(vr[t1] * mr[r] + gr[t1] * vr[r]), o = br(mr[t1] * yr[r] + yr[t1] * gr[r]), s = br(vr[t1] * yr[r] + gr[t1] * gr[r]), a = 0; a < 16; a++)if (mr[a] === i && vr[a] === n && yr[a] === o && gr[a] === s) {
            e.push(a);
            break;
        }
    }
    for(t1 = 0; t1 < 16; t1++){
        var h = new _r;
        h.set(mr[t1], vr[t1], yr[t1], gr[t1], 0, 0), Tr.push(h);
    }
}();
var xr = {
    E: 0,
    SE: 1,
    S: 2,
    SW: 3,
    W: 4,
    NW: 5,
    N: 6,
    NE: 7,
    MIRROR_VERTICAL: 8,
    MAIN_DIAGONAL: 10,
    MIRROR_HORIZONTAL: 12,
    REVERSE_DIAGONAL: 14,
    uX: function(t) {
        return mr[t];
    },
    uY: function(t) {
        return vr[t];
    },
    vX: function(t) {
        return yr[t];
    },
    vY: function(t) {
        return gr[t];
    },
    inv: function(t) {
        return 8 & t ? 15 & t : 7 & -t;
    },
    add: function(t, e) {
        return Er[t][e];
    },
    sub: function(t, e) {
        return Er[t][xr.inv(e)];
    },
    rotate180: function(t) {
        return 4 ^ t;
    },
    isVertical: function(t) {
        return 2 == (3 & t);
    },
    byDirection: function(t, e) {
        return 2 * Math.abs(t) <= Math.abs(e) ? e >= 0 ? xr.S : xr.N : 2 * Math.abs(e) <= Math.abs(t) ? t > 0 ? xr.E : xr.W : e > 0 ? t > 0 ? xr.SE : xr.SW : t > 0 ? xr.NE : xr.NW;
    },
    matrixAppendRotationInv: function(t, e, r, i) {
        void 0 === r && (r = 0), void 0 === i && (i = 0);
        var n1 = Tr[xr.inv(e)];
        n1.tx = r, n1.ty = i, t.append(n1);
    }
}, Rr = function() {
    function t() {
        this.worldTransform = new _r, this.localTransform = new _r, this.position = new pr(this.onChange, this, 0, 0), this.scale = new pr(this.onChange, this, 1, 1), this.pivot = new pr(this.onChange, this, 0, 0), this.skew = new pr(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0;
    }
    return t.prototype.onChange = function() {
        this._localID++;
    }, t.prototype.updateSkew = function() {
        this._cx = Math.cos(this._rotation + this.skew.y), this._sx = Math.sin(this._rotation + this.skew.y), this._cy = -Math.sin(this._rotation - this.skew.x), this._sy = Math.cos(this._rotation - this.skew.x), this._localID++;
    }, t.prototype.updateLocalTransform = function() {
        var t1 = this.localTransform;
        this._localID !== this._currentLocalID && (t1.a = this._cx * this.scale.x, t1.b = this._sx * this.scale.x, t1.c = this._cy * this.scale.y, t1.d = this._sy * this.scale.y, t1.tx = this.position.x - (this.pivot.x * t1.a + this.pivot.y * t1.c), t1.ty = this.position.y - (this.pivot.x * t1.b + this.pivot.y * t1.d), this._currentLocalID = this._localID, this._parentID = -1);
    }, t.prototype.updateTransform = function(t) {
        var e = this.localTransform;
        if (this._localID !== this._currentLocalID && (e.a = this._cx * this.scale.x, e.b = this._sx * this.scale.x, e.c = this._cy * this.scale.y, e.d = this._sy * this.scale.y, e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c), e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== t._worldID) {
            var r = t.worldTransform, i = this.worldTransform;
            i.a = e.a * r.a + e.b * r.c, i.b = e.a * r.b + e.b * r.d, i.c = e.c * r.a + e.d * r.c, i.d = e.c * r.b + e.d * r.d, i.tx = e.tx * r.a + e.ty * r.c + r.tx, i.ty = e.tx * r.b + e.ty * r.d + r.ty, this._parentID = t._worldID, this._worldID++;
        }
    }, t.prototype.setFromMatrix = function(t) {
        t.decompose(this), this._localID++;
    }, Object.defineProperty(t.prototype, "rotation", {
        get: function() {
            return this._rotation;
        },
        set: function(t) {
            this._rotation !== t && (this._rotation = t, this.updateSkew());
        },
        enumerable: !1,
        configurable: !0
    }), t.IDENTITY = new t, t;
}();
et.SORTABLE_CHILDREN = !1;
var Ar = function() {
    function t() {
        this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.rect = null, this.updateID = -1;
    }
    return t.prototype.isEmpty = function() {
        return this.minX > this.maxX || this.minY > this.maxY;
    }, t.prototype.clear = function() {
        this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0;
    }, t.prototype.getRectangle = function(t) {
        return this.minX > this.maxX || this.minY > this.maxY ? hr.EMPTY : ((t = t || new hr(0, 0, 1, 1)).x = this.minX, t.y = this.minY, t.width = this.maxX - this.minX, t.height = this.maxY - this.minY, t);
    }, t.prototype.addPoint = function(t) {
        this.minX = Math.min(this.minX, t.x), this.maxX = Math.max(this.maxX, t.x), this.minY = Math.min(this.minY, t.y), this.maxY = Math.max(this.maxY, t.y);
    }, t.prototype.addPointMatrix = function(t, e) {
        var r = t.a, i = t.b, n = t.c, o = t.d, s = t.tx, a = t.ty, h = r * e.x + n * e.y + s, u = i * e.x + o * e.y + a;
        this.minX = Math.min(this.minX, h), this.maxX = Math.max(this.maxX, h), this.minY = Math.min(this.minY, u), this.maxY = Math.max(this.maxY, u);
    }, t.prototype.addQuad = function(t) {
        var e = this.minX, r = this.minY, i = this.maxX, n = this.maxY, o = t[0], s = t[1];
        e = o < e ? o : e, r = s < r ? s : r, i = o > i ? o : i, n = s > n ? s : n, e = (o = t[2]) < e ? o : e, r = (s = t[3]) < r ? s : r, i = o > i ? o : i, n = s > n ? s : n, e = (o = t[4]) < e ? o : e, r = (s = t[5]) < r ? s : r, i = o > i ? o : i, n = s > n ? s : n, e = (o = t[6]) < e ? o : e, r = (s = t[7]) < r ? s : r, i = o > i ? o : i, n = s > n ? s : n, this.minX = e, this.minY = r, this.maxX = i, this.maxY = n;
    }, t.prototype.addFrame = function(t, e, r, i, n) {
        this.addFrameMatrix(t.worldTransform, e, r, i, n);
    }, t.prototype.addFrameMatrix = function(t, e, r, i, n) {
        var o = t.a, s = t.b, a = t.c, h = t.d, u = t.tx, l = t.ty, c = this.minX, d = this.minY, f = this.maxX, p = this.maxY, _ = o * e + a * r + u, m = s * e + h * r + l;
        c = _ < c ? _ : c, d = m < d ? m : d, f = _ > f ? _ : f, p = m > p ? m : p, c = (_ = o * i + a * r + u) < c ? _ : c, d = (m = s * i + h * r + l) < d ? m : d, f = _ > f ? _ : f, p = m > p ? m : p, c = (_ = o * e + a * n + u) < c ? _ : c, d = (m = s * e + h * n + l) < d ? m : d, f = _ > f ? _ : f, p = m > p ? m : p, c = (_ = o * i + a * n + u) < c ? _ : c, d = (m = s * i + h * n + l) < d ? m : d, f = _ > f ? _ : f, p = m > p ? m : p, this.minX = c, this.minY = d, this.maxX = f, this.maxY = p;
    }, t.prototype.addVertexData = function(t, e, r) {
        for(var i = this.minX, n = this.minY, o = this.maxX, s = this.maxY, a = e; a < r; a += 2){
            var h = t[a], u = t[a + 1];
            i = h < i ? h : i, n = u < n ? u : n, o = h > o ? h : o, s = u > s ? u : s;
        }
        this.minX = i, this.minY = n, this.maxX = o, this.maxY = s;
    }, t.prototype.addVertices = function(t, e, r, i) {
        this.addVerticesMatrix(t.worldTransform, e, r, i);
    }, t.prototype.addVerticesMatrix = function(t, e, r, i, n, o) {
        void 0 === n && (n = 0), void 0 === o && (o = n);
        for(var s = t.a, a = t.b, h = t.c, u = t.d, l = t.tx, c = t.ty, d = this.minX, f = this.minY, p = this.maxX, _ = this.maxY, m = r; m < i; m += 2){
            var v = e[m], y = e[m + 1], g = s * v + h * y + l, E = u * y + a * v + c;
            d = Math.min(d, g - n), p = Math.max(p, g + n), f = Math.min(f, E - o), _ = Math.max(_, E + o);
        }
        this.minX = d, this.minY = f, this.maxX = p, this.maxY = _;
    }, t.prototype.addBounds = function(t) {
        var e = this.minX, r = this.minY, i = this.maxX, n = this.maxY;
        this.minX = t.minX < e ? t.minX : e, this.minY = t.minY < r ? t.minY : r, this.maxX = t.maxX > i ? t.maxX : i, this.maxY = t.maxY > n ? t.maxY : n;
    }, t.prototype.addBoundsMask = function(t, e) {
        var r = t.minX > e.minX ? t.minX : e.minX, i = t.minY > e.minY ? t.minY : e.minY, n = t.maxX < e.maxX ? t.maxX : e.maxX, o = t.maxY < e.maxY ? t.maxY : e.maxY;
        if (r <= n && i <= o) {
            var s = this.minX, a = this.minY, h = this.maxX, u = this.maxY;
            this.minX = r < s ? r : s, this.minY = i < a ? i : a, this.maxX = n > h ? n : h, this.maxY = o > u ? o : u;
        }
    }, t.prototype.addBoundsMatrix = function(t, e) {
        this.addFrameMatrix(e, t.minX, t.minY, t.maxX, t.maxY);
    }, t.prototype.addBoundsArea = function(t, e) {
        var r = t.minX > e.x ? t.minX : e.x, i = t.minY > e.y ? t.minY : e.y, n = t.maxX < e.x + e.width ? t.maxX : e.x + e.width, o = t.maxY < e.y + e.height ? t.maxY : e.y + e.height;
        if (r <= n && i <= o) {
            var s = this.minX, a = this.minY, h = this.maxX, u = this.maxY;
            this.minX = r < s ? r : s, this.minY = i < a ? i : a, this.maxX = n > h ? n : h, this.maxY = o > u ? o : u;
        }
    }, t.prototype.pad = function(t, e) {
        void 0 === t && (t = 0), void 0 === e && (e = t), this.isEmpty() || (this.minX -= t, this.maxX += t, this.minY -= e, this.maxY += e);
    }, t.prototype.addFramePad = function(t, e, r, i, n, o) {
        t -= n, e -= o, r += n, i += o, this.minX = this.minX < t ? this.minX : t, this.maxX = this.maxX > r ? this.maxX : r, this.minY = this.minY < e ? this.minY : e, this.maxY = this.maxY > i ? this.maxY : i;
    }, t;
}(), Or = function(t, e) {
    return (Or = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
};
function Sr(t, e) {
    function r() {
        this.constructor = t;
    }
    Or(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
}
var Ir, Pr, Nr, Mr, Dr, Cr, wr, Lr, Fr, Ur, Gr, Br, Xr, kr, Hr, jr, Yr, Vr, Wr, zr = function(t) {
    function e() {
        var e1 = t.call(this) || this;
        return e1.tempDisplayObjectParent = null, e1.transform = new Rr, e1.alpha = 1, e1.visible = !0, e1.renderable = !0, e1.parent = null, e1.worldAlpha = 1, e1._lastSortedIndex = 0, e1._zIndex = 0, e1.filterArea = null, e1.filters = null, e1._enabledFilters = null, e1._bounds = new Ar, e1._localBounds = null, e1._boundsID = 0, e1._boundsRect = null, e1._localBoundsRect = null, e1._mask = null, e1._maskRefCount = 0, e1._destroyed = !1, e1.isSprite = !1, e1.isMask = !1, e1;
    }
    return Sr(e, t), e.mixin = function(t) {
        for(var r = Object.keys(t), i = 0; i < r.length; ++i){
            var n = r[i];
            Object.defineProperty(e.prototype, n, Object.getOwnPropertyDescriptor(t, n));
        }
    }, Object.defineProperty(e.prototype, "destroyed", {
        get: function() {
            return this._destroyed;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype._recursivePostUpdateTransform = function() {
        this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform);
    }, e.prototype.updateTransform = function() {
        this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
    }, e.prototype.getBounds = function(t, e) {
        return t || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._bounds.updateID !== this._boundsID && (this.calculateBounds(), this._bounds.updateID = this._boundsID), e || (this._boundsRect || (this._boundsRect = new hr), e = this._boundsRect), this._bounds.getRectangle(e);
    }, e.prototype.getLocalBounds = function(t) {
        t || (this._localBoundsRect || (this._localBoundsRect = new hr), t = this._localBoundsRect), this._localBounds || (this._localBounds = new Ar);
        var e1 = this.transform, r = this.parent;
        this.parent = null, this.transform = this._tempDisplayObjectParent.transform;
        var i = this._bounds, n = this._boundsID;
        this._bounds = this._localBounds;
        var o = this.getBounds(!1, t);
        return this.parent = r, this.transform = e1, this._bounds = i, this._bounds.updateID += this._boundsID - n, o;
    }, e.prototype.toGlobal = function(t, e, r) {
        return void 0 === r && (r = !1), r || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(t, e);
    }, e.prototype.toLocal = function(t, e, r, i) {
        return e && (t = e.toGlobal(t, r, i)), i || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(t, r);
    }, e.prototype.setParent = function(t) {
        if (!t || !t.addChild) throw new Error("setParent: Argument must be a Container");
        return t.addChild(this), t;
    }, e.prototype.setTransform = function(t, e, r, i, n, o, s, a, h) {
        return void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = 1), void 0 === i && (i = 1), void 0 === n && (n = 0), void 0 === o && (o = 0), void 0 === s && (s = 0), void 0 === a && (a = 0), void 0 === h && (h = 0), this.position.x = t, this.position.y = e, this.scale.x = r || 1, this.scale.y = i || 1, this.rotation = n, this.skew.x = o, this.skew.y = s, this.pivot.x = a, this.pivot.y = h, this;
    }, e.prototype.destroy = function(t) {
        this.parent && this.parent.removeChild(this), this.emit("destroyed"), this.removeAllListeners(), this.transform = null, this.parent = null, this._bounds = null, this.mask = null, this.filters = null, this.filterArea = null, this.hitArea = null, this.interactive = !1, this.interactiveChildren = !1, this._destroyed = !0;
    }, Object.defineProperty(e.prototype, "_tempDisplayObjectParent", {
        get: function() {
            return null === this.tempDisplayObjectParent && (this.tempDisplayObjectParent = new qr), this.tempDisplayObjectParent;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.enableTempParent = function() {
        var t1 = this.parent;
        return this.parent = this._tempDisplayObjectParent, t1;
    }, e.prototype.disableTempParent = function(t) {
        this.parent = t;
    }, Object.defineProperty(e.prototype, "x", {
        get: function() {
            return this.position.x;
        },
        set: function(t) {
            this.transform.position.x = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "y", {
        get: function() {
            return this.position.y;
        },
        set: function(t) {
            this.transform.position.y = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "worldTransform", {
        get: function() {
            return this.transform.worldTransform;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "localTransform", {
        get: function() {
            return this.transform.localTransform;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "position", {
        get: function() {
            return this.transform.position;
        },
        set: function(t) {
            this.transform.position.copyFrom(t);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "scale", {
        get: function() {
            return this.transform.scale;
        },
        set: function(t) {
            this.transform.scale.copyFrom(t);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "pivot", {
        get: function() {
            return this.transform.pivot;
        },
        set: function(t) {
            this.transform.pivot.copyFrom(t);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "skew", {
        get: function() {
            return this.transform.skew;
        },
        set: function(t) {
            this.transform.skew.copyFrom(t);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "rotation", {
        get: function() {
            return this.transform.rotation;
        },
        set: function(t) {
            this.transform.rotation = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "angle", {
        get: function() {
            return this.transform.rotation * sr;
        },
        set: function(t) {
            this.transform.rotation = t * ar;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "zIndex", {
        get: function() {
            return this._zIndex;
        },
        set: function(t) {
            this._zIndex = t, this.parent && (this.parent.sortDirty = !0);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "worldVisible", {
        get: function() {
            var t1 = this;
            do {
                if (!t1.visible) return !1;
                t1 = t1.parent;
            }while (t1)
            return !0;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "mask", {
        get: function() {
            return this._mask;
        },
        set: function(t) {
            var e1;
            this._mask !== t && (this._mask && ((e1 = this._mask.maskObject || this._mask)._maskRefCount--, 0 === e1._maskRefCount && (e1.renderable = !0, e1.isMask = !1)), this._mask = t, this._mask && (0 === (e1 = this._mask.maskObject || this._mask)._maskRefCount && (e1.renderable = !1, e1.isMask = !0), e1._maskRefCount++));
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(nt), qr = function(t) {
    function e() {
        var e1 = null !== t && t.apply(this, arguments) || this;
        return e1.sortDirty = null, e1;
    }
    return Sr(e, t), e;
}(zr);
function Kr(t, e) {
    return t.zIndex === e.zIndex ? t._lastSortedIndex - e._lastSortedIndex : t.zIndex - e.zIndex;
}
zr.prototype.displayObjectUpdateTransform = zr.prototype.updateTransform, (function(t) {
    t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2";
})(Ir || (Ir = {
})), (function(t) {
    t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS";
})(Pr || (Pr = {
})), (function(t) {
    t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL";
})(Nr || (Nr = {
})), (function(t) {
    t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR";
})(Mr || (Mr = {
})), (function(t) {
    t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(Dr || (Dr = {
})), (function(t) {
    t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(Cr || (Cr = {
})), (function(t) {
    t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(wr || (wr = {
})), (function(t) {
    t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(Lr || (Lr = {
})), (function(t) {
    t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT";
})(Fr || (Fr = {
})), (function(t) {
    t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR";
})(Ur || (Ur = {
})), (function(t) {
    t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(Gr || (Gr = {
})), (function(t) {
    t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL";
})(Br || (Br = {
})), (function(t) {
    t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(Xr || (Xr = {
})), (function(t) {
    t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT";
})(kr || (kr = {
})), (function(t) {
    t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL";
})(Hr || (Hr = {
})), (function(t) {
    t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp";
})(jr || (jr = {
})), (function(t) {
    t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE";
})(Yr || (Yr = {
})), (function(t) {
    t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH";
})(Vr || (Vr = {
})), (function(t) {
    t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})(Wr || (Wr = {
}));
var Zr = function(t) {
    function e() {
        var e1 = t.call(this) || this;
        return e1.children = [], e1.sortableChildren = et.SORTABLE_CHILDREN, e1.sortDirty = !1, e1;
    }
    return Sr(e, t), e.prototype.onChildrenChange = function(t) {
    }, e.prototype.addChild = function() {
        for(var t1 = arguments, e1 = [], r = 0; r < arguments.length; r++)e1[r] = t1[r];
        if (e1.length > 1) for(var i = 0; i < e1.length; i++)this.addChild(e1[i]);
        else {
            var n = e1[0];
            n.parent && n.parent.removeChild(n), n.parent = this, this.sortDirty = !0, n.transform._parentID = -1, this.children.push(n), this._boundsID++, this.onChildrenChange(this.children.length - 1), this.emit("childAdded", n, this, this.children.length - 1), n.emit("added", this);
        }
        return e1[0];
    }, e.prototype.addChildAt = function(t, e) {
        if (e < 0 || e > this.children.length) throw new Error(t + "addChildAt: The index " + e + " supplied is out of bounds " + this.children.length);
        return t.parent && t.parent.removeChild(t), t.parent = this, this.sortDirty = !0, t.transform._parentID = -1, this.children.splice(e, 0, t), this._boundsID++, this.onChildrenChange(e), t.emit("added", this), this.emit("childAdded", t, this, e), t;
    }, e.prototype.swapChildren = function(t, e) {
        if (t !== e) {
            var r = this.getChildIndex(t), i = this.getChildIndex(e);
            this.children[r] = e, this.children[i] = t, this.onChildrenChange(r < i ? r : i);
        }
    }, e.prototype.getChildIndex = function(t) {
        var e1 = this.children.indexOf(t);
        if (-1 === e1) throw new Error("The supplied DisplayObject must be a child of the caller");
        return e1;
    }, e.prototype.setChildIndex = function(t, e) {
        if (e < 0 || e >= this.children.length) throw new Error("The index " + e + " supplied is out of bounds " + this.children.length);
        var r = this.getChildIndex(t);
        je(this.children, r, 1), this.children.splice(e, 0, t), this.onChildrenChange(e);
    }, e.prototype.getChildAt = function(t) {
        if (t < 0 || t >= this.children.length) throw new Error("getChildAt: Index (" + t + ") does not exist.");
        return this.children[t];
    }, e.prototype.removeChild = function() {
        for(var t1 = arguments, e1 = [], r = 0; r < arguments.length; r++)e1[r] = t1[r];
        if (e1.length > 1) for(var i = 0; i < e1.length; i++)this.removeChild(e1[i]);
        else {
            var n = e1[0], o = this.children.indexOf(n);
            if (-1 === o) return null;
            n.parent = null, n.transform._parentID = -1, je(this.children, o, 1), this._boundsID++, this.onChildrenChange(o), n.emit("removed", this), this.emit("childRemoved", n, this, o);
        }
        return e1[0];
    }, e.prototype.removeChildAt = function(t) {
        var e1 = this.getChildAt(t);
        return e1.parent = null, e1.transform._parentID = -1, je(this.children, t, 1), this._boundsID++, this.onChildrenChange(t), e1.emit("removed", this), this.emit("childRemoved", e1, this, t), e1;
    }, e.prototype.removeChildren = function(t, e) {
        void 0 === t && (t = 0), void 0 === e && (e = this.children.length);
        var r, i = t, n = e - i;
        if (n > 0 && n <= e) {
            r = this.children.splice(i, n);
            for(var o = 0; o < r.length; ++o)r[o].parent = null, r[o].transform && (r[o].transform._parentID = -1);
            for(this._boundsID++, this.onChildrenChange(t), o = 0; o < r.length; ++o)r[o].emit("removed", this), this.emit("childRemoved", r[o], this, o);
            return r;
        }
        if (0 === n && 0 === this.children.length) return [];
        throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
    }, e.prototype.sortChildren = function() {
        for(var t1 = !1, e1 = 0, r = this.children.length; e1 < r; ++e1){
            var i = this.children[e1];
            i._lastSortedIndex = e1, t1 || 0 === i.zIndex || (t1 = !0);
        }
        t1 && this.children.length > 1 && this.children.sort(Kr), this.sortDirty = !1;
    }, e.prototype.updateTransform = function() {
        this.sortableChildren && this.sortDirty && this.sortChildren(), this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
        for(var t1 = 0, e1 = this.children.length; t1 < e1; ++t1){
            var r = this.children[t1];
            r.visible && r.updateTransform();
        }
    }, e.prototype.calculateBounds = function() {
        this._bounds.clear(), this._calculateBounds();
        for(var t1 = 0; t1 < this.children.length; t1++){
            var e = this.children[t1];
            if (e.visible && e.renderable) if (e.calculateBounds(), e._mask) {
                var r = e._mask.maskObject || e._mask;
                r.calculateBounds(), this._bounds.addBoundsMask(e._bounds, r._bounds);
            } else e.filterArea ? this._bounds.addBoundsArea(e._bounds, e.filterArea) : this._bounds.addBounds(e._bounds);
        }
        this._bounds.updateID = this._boundsID;
    }, e.prototype.getLocalBounds = function(e, r) {
        void 0 === r && (r = !1);
        var i = t.prototype.getLocalBounds.call(this, e);
        if (!r) for(var n = 0, o = this.children.length; n < o; ++n){
            var s = this.children[n];
            s.visible && s.updateTransform();
        }
        return i;
    }, e.prototype._calculateBounds = function() {
    }, e.prototype.render = function(t) {
        if (this.visible && !(this.worldAlpha <= 0) && this.renderable) if (this._mask || this.filters && this.filters.length) this.renderAdvanced(t);
        else {
            this._render(t);
            for(var e = 0, r = this.children.length; e < r; ++e)this.children[e].render(t);
        }
    }, e.prototype.renderAdvanced = function(t) {
        var e1 = this.filters, r = this._mask;
        if (e1) {
            this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;
            for(var i = 0; i < e1.length; i++)e1[i].enabled && this._enabledFilters.push(e1[i]);
        }
        var n = e1 && this._enabledFilters && this._enabledFilters.length || r && (!r.isMaskData || r.enabled && (r.autoDetect || r.type !== Yr.NONE));
        n && t.batch.flush(), e1 && this._enabledFilters && this._enabledFilters.length && t.filter.push(this, this._enabledFilters), r && t.mask.push(this, this._mask), this._render(t), i = 0;
        for(var o = this.children.length; i < o; i++)this.children[i].render(t);
        n && t.batch.flush(), r && t.mask.pop(this), e1 && this._enabledFilters && this._enabledFilters.length && t.filter.pop();
    }, e.prototype._render = function(t) {
    }, e.prototype.destroy = function(e) {
        t.prototype.destroy.call(this), this.sortDirty = !1;
        var r = "boolean" == typeof e ? e : e && e.children, i1 = this.removeChildren(0, this.children.length);
        if (r) for(var n = 0; n < i1.length; ++n)i1[n].destroy(e);
    }, Object.defineProperty(e.prototype, "width", {
        get: function() {
            return this.scale.x * this.getLocalBounds().width;
        },
        set: function(t) {
            var e1 = this.getLocalBounds().width;
            this.scale.x = 0 !== e1 ? t / e1 : 1, this._width = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
        get: function() {
            return this.scale.y * this.getLocalBounds().height;
        },
        set: function(t) {
            var e1 = this.getLocalBounds().height;
            this.scale.y = 0 !== e1 ? t / e1 : 1, this._height = t;
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(zr);
Zr.prototype.containerUpdateTransform = Zr.prototype.updateTransform;
var Jr = {
    accessible: !1,
    accessibleTitle: null,
    accessibleHint: null,
    tabIndex: 0,
    _accessibleActive: !1,
    _accessibleDiv: null,
    accessibleType: "button",
    accessiblePointerEvents: "auto",
    accessibleChildren: !0,
    renderId: -1
};
zr.mixin(Jr);
var Qr, $r = 100, ti = 0, ei = 0, ri = 2, ii = function() {
    function t(t) {
        this.debug = !1, this._isActive = !1, this._isMobileAccessibility = !1, this.pool = [], this.renderId = 0, this.children = [], this.androidUpdateCount = 0, this.androidUpdateFrequency = 500, this._hookDiv = null, (tt.tablet || tt.phone) && this.createTouchHook();
        var e = document.createElement("div");
        e.style.width = $r + "px", e.style.height = $r + "px", e.style.position = "absolute", e.style.top = ti + "px", e.style.left = ei + "px", e.style.zIndex = ri.toString(), this.div = e, this.renderer = t, this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), self.addEventListener("keydown", this._onKeyDown, !1);
    }
    return Object.defineProperty(t.prototype, "isActive", {
        get: function() {
            return this._isActive;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "isMobileAccessibility", {
        get: function() {
            return this._isMobileAccessibility;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.createTouchHook = function() {
        var t = this, e = document.createElement("button");
        e.style.width = "1px", e.style.height = "1px", e.style.position = "absolute", e.style.top = "-1000px", e.style.left = "-1000px", e.style.zIndex = 2..toString(), e.style.backgroundColor = "#FF0000", e.title = "select to enable accessibility for this content", e.addEventListener("focus", function() {
            t._isMobileAccessibility = !0, t.activate(), t.destroyTouchHook();
        }), document.body.appendChild(e), this._hookDiv = e;
    }, t.prototype.destroyTouchHook = function() {
        this._hookDiv && (document.body.removeChild(this._hookDiv), this._hookDiv = null);
    }, t.prototype.activate = function() {
        var t1;
        this._isActive || (this._isActive = !0, self.document.addEventListener("mousemove", this._onMouseMove, !0), self.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), null === (t1 = this.renderer.view.parentNode) || void 0 === t1 || t1.appendChild(this.div));
    }, t.prototype.deactivate = function() {
        var t1;
        this._isActive && !this._isMobileAccessibility && (this._isActive = !1, self.document.removeEventListener("mousemove", this._onMouseMove, !0), self.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), null === (t1 = this.div.parentNode) || void 0 === t1 || t1.removeChild(this.div));
    }, t.prototype.updateAccessibleObjects = function(t) {
        if (t.visible && t.accessibleChildren) {
            t.accessible && t.interactive && (t._accessibleActive || this.addChild(t), t.renderId = this.renderId);
            var e = t.children;
            if (e) for(var r = 0; r < e.length; r++)this.updateAccessibleObjects(e[r]);
        }
    }, t.prototype.update = function() {
        var t1 = performance.now();
        if (!(tt.android.device && t1 < this.androidUpdateCount) && (this.androidUpdateCount = t1 + this.androidUpdateFrequency, this.renderer.renderingToScreen)) {
            this.renderer._lastObjectRendered && this.updateAccessibleObjects(this.renderer._lastObjectRendered);
            var e = this.renderer.view.getBoundingClientRect(), r = e.left, i = e.top, n = e.width, o = e.height, s = this.renderer, a = s.width, h = s.height, u = s.resolution, l = n / a * u, c = o / h * u, d = this.div;
            d.style.left = r + "px", d.style.top = i + "px", d.style.width = a + "px", d.style.height = h + "px";
            for(var f = 0; f < this.children.length; f++){
                var p = this.children[f];
                if (p.renderId !== this.renderId) p._accessibleActive = !1, je(this.children, f, 1), this.div.removeChild(p._accessibleDiv), this.pool.push(p._accessibleDiv), p._accessibleDiv = null, f--;
                else {
                    d = p._accessibleDiv;
                    var _ = p.hitArea, m = p.worldTransform;
                    p.hitArea ? (d.style.left = (m.tx + _.x * m.a) * l + "px", d.style.top = (m.ty + _.y * m.d) * c + "px", d.style.width = _.width * m.a * l + "px", d.style.height = _.height * m.d * c + "px") : (_ = p.getBounds(), this.capHitArea(_), d.style.left = _.x * l + "px", d.style.top = _.y * c + "px", d.style.width = _.width * l + "px", d.style.height = _.height * c + "px", d.title !== p.accessibleTitle && null !== p.accessibleTitle && (d.title = p.accessibleTitle), d.getAttribute("aria-label") !== p.accessibleHint && null !== p.accessibleHint && d.setAttribute("aria-label", p.accessibleHint)), p.accessibleTitle === d.title && p.tabIndex === d.tabIndex || (d.title = p.accessibleTitle, d.tabIndex = p.tabIndex, this.debug && this.updateDebugHTML(d));
                }
            }
            this.renderId++;
        }
    }, t.prototype.updateDebugHTML = function(t) {
        t.innerHTML = "type: " + t.type + "</br> title : " + t.title + "</br> tabIndex: " + t.tabIndex;
    }, t.prototype.capHitArea = function(t) {
        t.x < 0 && (t.width += t.x, t.x = 0), t.y < 0 && (t.height += t.y, t.y = 0);
        var e = this.renderer, r = e.width, i = e.height;
        t.x + t.width > r && (t.width = r - t.x), t.y + t.height > i && (t.height = i - t.y);
    }, t.prototype.addChild = function(t) {
        var e = this.pool.pop();
        e || ((e = document.createElement("button")).style.width = $r + "px", e.style.height = $r + "px", e.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent", e.style.position = "absolute", e.style.zIndex = ri.toString(), e.style.borderStyle = "none", navigator.userAgent.toLowerCase().indexOf("chrome") > -1 ? e.setAttribute("aria-live", "off") : e.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? e.setAttribute("aria-relevant", "additions") : e.setAttribute("aria-relevant", "text"), e.addEventListener("click", this._onClick.bind(this)), e.addEventListener("focus", this._onFocus.bind(this)), e.addEventListener("focusout", this._onFocusOut.bind(this))), e.style.pointerEvents = t.accessiblePointerEvents, e.type = t.accessibleType, t.accessibleTitle && null !== t.accessibleTitle ? e.title = t.accessibleTitle : t.accessibleHint && null !== t.accessibleHint || (e.title = "displayObject " + t.tabIndex), t.accessibleHint && null !== t.accessibleHint && e.setAttribute("aria-label", t.accessibleHint), this.debug && this.updateDebugHTML(e), t._accessibleActive = !0, t._accessibleDiv = e, e.displayObject = t, this.children.push(t), this.div.appendChild(t._accessibleDiv), t._accessibleDiv.tabIndex = t.tabIndex;
    }, t.prototype._onClick = function(t) {
        var e = this.renderer.plugins.interaction, r = t.target.displayObject, i = e.eventData;
        e.dispatchEvent(r, "click", i), e.dispatchEvent(r, "pointertap", i), e.dispatchEvent(r, "tap", i);
    }, t.prototype._onFocus = function(t) {
        t.target.getAttribute("aria-live") || t.target.setAttribute("aria-live", "assertive");
        var e = this.renderer.plugins.interaction, r = t.target.displayObject, i = e.eventData;
        e.dispatchEvent(r, "mouseover", i);
    }, t.prototype._onFocusOut = function(t) {
        t.target.getAttribute("aria-live") || t.target.setAttribute("aria-live", "polite");
        var e = this.renderer.plugins.interaction, r = t.target.displayObject, i = e.eventData;
        e.dispatchEvent(r, "mouseout", i);
    }, t.prototype._onKeyDown = function(t) {
        9 === t.keyCode && this.activate();
    }, t.prototype._onMouseMove = function(t) {
        0 === t.movementX && 0 === t.movementY || this.deactivate();
    }, t.prototype.destroy = function() {
        this.destroyTouchHook(), this.div = null, self.document.removeEventListener("mousemove", this._onMouseMove, !0), self.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null;
    }, t;
}();
et.TARGET_FPMS = 0.06, (function(t) {
    t[t.INTERACTION = 50] = "INTERACTION", t[t.HIGH = 25] = "HIGH", t[t.NORMAL = 0] = "NORMAL", t[t.LOW = -25] = "LOW", t[t.UTILITY = -50] = "UTILITY";
})(Qr || (Qr = {
}));
var ni = function() {
    function t(t, e, r, i) {
        void 0 === e && (e = null), void 0 === r && (r = 0), void 0 === i && (i = !1), this.next = null, this.previous = null, this._destroyed = !1, this.fn = t, this.context = e, this.priority = r, this.once = i;
    }
    return t.prototype.match = function(t, e) {
        return void 0 === e && (e = null), this.fn === t && this.context === e;
    }, t.prototype.emit = function(t) {
        this.fn && (this.context ? this.fn.call(this.context, t) : this.fn(t));
        var e = this.next;
        return this.once && this.destroy(!0), this._destroyed && (this.next = null), e;
    }, t.prototype.connect = function(t) {
        this.previous = t, t.next && (t.next.previous = this), this.next = t.next, t.next = this;
    }, t.prototype.destroy = function(t) {
        void 0 === t && (t = !1), this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
        var e = this.next;
        return this.next = t ? null : e, this.previous = null, e;
    }, t;
}(), oi = function() {
    function t() {
        var t = this;
        this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new ni(null, null, 1 / 0), this.deltaMS = 1 / et.TARGET_FPMS, this.elapsedMS = 1 / et.TARGET_FPMS, this._tick = function(e) {
            t._requestId = null, t.started && (t.update(e), t.started && null === t._requestId && t._head.next && (t._requestId = requestAnimationFrame(t._tick)));
        };
    }
    return t.prototype._requestIfNeeded = function() {
        null === this._requestId && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick));
    }, t.prototype._cancelIfNeeded = function() {
        null !== this._requestId && (cancelAnimationFrame(this._requestId), this._requestId = null);
    }, t.prototype._startIfPossible = function() {
        this.started ? this._requestIfNeeded() : this.autoStart && this.start();
    }, t.prototype.add = function(t, e, r) {
        return void 0 === r && (r = Qr.NORMAL), this._addListener(new ni(t, e, r));
    }, t.prototype.addOnce = function(t, e, r) {
        return void 0 === r && (r = Qr.NORMAL), this._addListener(new ni(t, e, r, !0));
    }, t.prototype._addListener = function(t) {
        var e = this._head.next, r = this._head;
        if (e) {
            for(; e;){
                if (t.priority > e.priority) {
                    t.connect(r);
                    break;
                }
                r = e, e = e.next;
            }
            t.previous || t.connect(r);
        } else t.connect(r);
        return this._startIfPossible(), this;
    }, t.prototype.remove = function(t, e) {
        for(var r = this._head.next; r;)r = r.match(t, e) ? r.destroy() : r.next;
        return this._head.next || this._cancelIfNeeded(), this;
    }, Object.defineProperty(t.prototype, "count", {
        get: function() {
            if (!this._head) return 0;
            for(var t1 = 0, e = this._head; e = e.next;)t1++;
            return t1;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.start = function() {
        this.started || (this.started = !0, this._requestIfNeeded());
    }, t.prototype.stop = function() {
        this.started && (this.started = !1, this._cancelIfNeeded());
    }, t.prototype.destroy = function() {
        if (!this._protected) {
            this.stop();
            for(var t = this._head.next; t;)t = t.destroy(!0);
            this._head.destroy(), this._head = null;
        }
    }, t.prototype.update = function(t) {
        var e;
        if (void 0 === t && (t = performance.now()), t > this.lastTime) {
            if ((e = this.elapsedMS = t - this.lastTime) > this._maxElapsedMS && (e = this._maxElapsedMS), e *= this.speed, this._minElapsedMS) {
                var r = t - this._lastFrame | 0;
                if (r < this._minElapsedMS) return;
                this._lastFrame = t - r % this._minElapsedMS;
            }
            this.deltaMS = e, this.deltaTime = this.deltaMS * et.TARGET_FPMS;
            for(var i = this._head, n = i.next; n;)n = n.emit(this.deltaTime);
            i.next || this._cancelIfNeeded();
        } else this.deltaTime = this.deltaMS = this.elapsedMS = 0;
        this.lastTime = t;
    }, Object.defineProperty(t.prototype, "FPS", {
        get: function() {
            return 1000 / this.elapsedMS;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "minFPS", {
        get: function() {
            return 1000 / this._maxElapsedMS;
        },
        set: function(t) {
            var e = Math.min(this.maxFPS, t), r = Math.min(Math.max(0, e) / 1000, et.TARGET_FPMS);
            this._maxElapsedMS = 1 / r;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "maxFPS", {
        get: function() {
            return this._minElapsedMS ? Math.round(1000 / this._minElapsedMS) : 0;
        },
        set: function(t) {
            if (0 === t) this._minElapsedMS = 0;
            else {
                var e = Math.max(this.minFPS, t);
                this._minElapsedMS = 1 / (e / 1000);
            }
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t, "shared", {
        get: function() {
            if (!t._shared) {
                var e = t._shared = new t;
                e.autoStart = !0, e._protected = !0;
            }
            return t._shared;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t, "system", {
        get: function() {
            if (!t._system) {
                var e = t._system = new t;
                e.autoStart = !0, e._protected = !0;
            }
            return t._system;
        },
        enumerable: !1,
        configurable: !0
    }), t;
}(), si = function() {
    function t() {
    }
    return t.init = function(t) {
        var e = this;
        t = Object.assign({
            autoStart: !0,
            sharedTicker: !1
        }, t), Object.defineProperty(this, "ticker", {
            set: function(t) {
                this._ticker && this._ticker.remove(this.render, this), this._ticker = t, t && t.add(this.render, this, Qr.LOW);
            },
            get: function() {
                return this._ticker;
            }
        }), this.stop = function() {
            e._ticker.stop();
        }, this.start = function() {
            e._ticker.start();
        }, this._ticker = null, this.ticker = t.sharedTicker ? oi.shared : new oi, t.autoStart && this.start();
    }, t.destroy = function() {
        if (this._ticker) {
            var t = this._ticker;
            this.ticker = null, t.destroy();
        }
    }, t;
}(), ai = function() {
    function t() {
        this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0, this.global = new fr, this.target = null, this.originalEvent = null, this.identifier = null, this.isPrimary = !1, this.button = 0, this.buttons = 0, this.width = 0, this.height = 0, this.tiltX = 0, this.tiltY = 0, this.pointerType = null, this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0;
    }
    return Object.defineProperty(t.prototype, "pointerId", {
        get: function() {
            return this.identifier;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.getLocalPosition = function(t, e, r) {
        return t.worldTransform.applyInverse(r || this.global, e);
    }, t.prototype.copyEvent = function(t) {
        "isPrimary" in t && t.isPrimary && (this.isPrimary = !0), this.button = "button" in t && t.button;
        var e = "buttons" in t && t.buttons;
        this.buttons = Number.isInteger(e) ? e : "which" in t && t.which, this.width = "width" in t && t.width, this.height = "height" in t && t.height, this.tiltX = "tiltX" in t && t.tiltX, this.tiltY = "tiltY" in t && t.tiltY, this.pointerType = "pointerType" in t && t.pointerType, this.pressure = "pressure" in t && t.pressure, this.rotationAngle = "rotationAngle" in t && t.rotationAngle, this.twist = "twist" in t && t.twist || 0, this.tangentialPressure = "tangentialPressure" in t && t.tangentialPressure || 0;
    }, t.prototype.reset = function() {
        this.isPrimary = !1;
    }, t;
}(), hi = function(t, e) {
    return (hi = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
}, ui = function() {
    function t() {
        this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.target = null, this.currentTarget = null, this.type = null, this.data = null;
    }
    return t.prototype.stopPropagation = function() {
        this.stopped = !0, this.stopPropagationHint = !0, this.stopsPropagatingAt = this.currentTarget;
    }, t.prototype.reset = function() {
        this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.currentTarget = null, this.target = null;
    }, t;
}(), li = function() {
    function t(e) {
        this._pointerId = e, this._flags = t.FLAGS.NONE;
    }
    return t.prototype._doSet = function(t, e) {
        this._flags = e ? this._flags | t : this._flags & ~t;
    }, Object.defineProperty(t.prototype, "pointerId", {
        get: function() {
            return this._pointerId;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "flags", {
        get: function() {
            return this._flags;
        },
        set: function(t) {
            this._flags = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "none", {
        get: function() {
            return this._flags === t.FLAGS.NONE;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "over", {
        get: function() {
            return 0 != (this._flags & t.FLAGS.OVER);
        },
        set: function(e) {
            this._doSet(t.FLAGS.OVER, e);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "rightDown", {
        get: function() {
            return 0 != (this._flags & t.FLAGS.RIGHT_DOWN);
        },
        set: function(e) {
            this._doSet(t.FLAGS.RIGHT_DOWN, e);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "leftDown", {
        get: function() {
            return 0 != (this._flags & t.FLAGS.LEFT_DOWN);
        },
        set: function(e) {
            this._doSet(t.FLAGS.LEFT_DOWN, e);
        },
        enumerable: !1,
        configurable: !0
    }), t.FLAGS = Object.freeze({
        NONE: 0,
        OVER: 1,
        LEFT_DOWN: 2,
        RIGHT_DOWN: 4
    }), t;
}(), ci = function() {
    function t() {
        this._tempPoint = new fr;
    }
    return t.prototype.recursiveFindHit = function(t, e, r, i, n) {
        if (!e || !e.visible) return !1;
        var o = t.data.global, s = !1, a = n = e.interactive || n, h = !0;
        if (e.hitArea ? (i && (e.worldTransform.applyInverse(o, this._tempPoint), e.hitArea.contains(this._tempPoint.x, this._tempPoint.y) ? s = !0 : (i = !1, h = !1)), a = !1) : e._mask && i && (e._mask.containsPoint && e._mask.containsPoint(o) || (i = !1)), h && e.interactiveChildren && e.children) for(var u = e.children, l = u.length - 1; l >= 0; l--){
            var c = u[l], d = this.recursiveFindHit(t, c, r, i, a);
            if (d) {
                if (!c.parent) continue;
                a = !1, d && (t.target && (i = !1), s = !0);
            }
        }
        return n && (i && !t.target && !e.hitArea && e.containsPoint && e.containsPoint(o) && (s = !0), e.interactive && (s && !t.target && (t.target = e), r && r(t, e, !!s))), s;
    }, t.prototype.findHit = function(t, e, r, i) {
        this.recursiveFindHit(t, e, r, i, !1);
    }, t;
}(), di = {
    interactive: !1,
    interactiveChildren: !0,
    hitArea: null,
    get buttonMode () {
        return "pointer" === this.cursor;
    },
    set buttonMode (t1){
        t1 ? this.cursor = "pointer" : "pointer" === this.cursor && (this.cursor = null);
    },
    cursor: null,
    get trackedPointers () {
        return void 0 === this._trackedPointers && (this._trackedPointers = {
        }), this._trackedPointers;
    },
    _trackedPointers: void 0
};
zr.mixin(di);
var fi = 1, pi = {
    target: null,
    data: {
        global: null
    }
}, _i = function(t) {
    function e(e, r) {
        var i = t.call(this) || this;
        return r = r || {
        }, i.renderer = e, i.autoPreventDefault = void 0 === r.autoPreventDefault || r.autoPreventDefault, i.interactionFrequency = r.interactionFrequency || 10, i.mouse = new ai, i.mouse.identifier = fi, i.mouse.global.set(-999999), i.activeInteractionData = {
        }, i.activeInteractionData[fi] = i.mouse, i.interactionDataPool = [], i.eventData = new ui, i.interactionDOMElement = null, i.moveWhenInside = !1, i.eventsAdded = !1, i.tickerAdded = !1, i.mouseOverRenderer = !("PointerEvent" in self), i.supportsTouchEvents = "ontouchstart" in self, i.supportsPointerEvents = !!self.PointerEvent, i.onPointerUp = i.onPointerUp.bind(i), i.processPointerUp = i.processPointerUp.bind(i), i.onPointerCancel = i.onPointerCancel.bind(i), i.processPointerCancel = i.processPointerCancel.bind(i), i.onPointerDown = i.onPointerDown.bind(i), i.processPointerDown = i.processPointerDown.bind(i), i.onPointerMove = i.onPointerMove.bind(i), i.processPointerMove = i.processPointerMove.bind(i), i.onPointerOut = i.onPointerOut.bind(i), i.processPointerOverOut = i.processPointerOverOut.bind(i), i.onPointerOver = i.onPointerOver.bind(i), i.cursorStyles = {
            default: "inherit",
            pointer: "pointer"
        }, i.currentCursorMode = null, i.cursor = null, i.resolution = 1, i.delayedEvents = [], i.search = new ci, i._tempDisplayObject = new qr, i._eventListenerOptions = {
            capture: !0,
            passive: !1
        }, i._useSystemTicker = void 0 === r.useSystemTicker || r.useSystemTicker, i.setTargetElement(i.renderer.view, i.renderer.resolution), i;
    }
    return (function(t, e) {
        function r() {
            this.constructor = t;
        }
        hi(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
    })(e, t), Object.defineProperty(e.prototype, "useSystemTicker", {
        get: function() {
            return this._useSystemTicker;
        },
        set: function(t) {
            this._useSystemTicker = t, t ? this.addTickerListener() : this.removeTickerListener();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "lastObjectRendered", {
        get: function() {
            return this.renderer._lastObjectRendered || this._tempDisplayObject;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.hitTest = function(t, e) {
        return pi.target = null, pi.data.global = t, e || (e = this.lastObjectRendered), this.processInteractive(pi, e, null, !0), pi.target;
    }, e.prototype.setTargetElement = function(t, e) {
        void 0 === e && (e = 1), this.removeTickerListener(), this.removeEvents(), this.interactionDOMElement = t, this.resolution = e, this.addEvents(), this.addTickerListener();
    }, e.prototype.addTickerListener = function() {
        !this.tickerAdded && this.interactionDOMElement && this._useSystemTicker && (oi.system.add(this.tickerUpdate, this, Qr.INTERACTION), this.tickerAdded = !0);
    }, e.prototype.removeTickerListener = function() {
        this.tickerAdded && (oi.system.remove(this.tickerUpdate, this), this.tickerAdded = !1);
    }, e.prototype.addEvents = function() {
        if (!this.eventsAdded && this.interactionDOMElement) {
            var t = this.interactionDOMElement.style;
            self.navigator.msPointerEnabled ? (t.msContentZooming = "none", t.msTouchAction = "none") : this.supportsPointerEvents && (t.touchAction = "none"), this.supportsPointerEvents ? (self.document.addEventListener("pointermove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerdown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerleave", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerover", this.onPointerOver, this._eventListenerOptions), self.addEventListener("pointercancel", this.onPointerCancel, this._eventListenerOptions), self.addEventListener("pointerup", this.onPointerUp, this._eventListenerOptions)) : (self.document.addEventListener("mousemove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mousedown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mouseout", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mouseover", this.onPointerOver, this._eventListenerOptions), self.addEventListener("mouseup", this.onPointerUp, this._eventListenerOptions)), this.supportsTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchcancel", this.onPointerCancel, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchend", this.onPointerUp, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchmove", this.onPointerMove, this._eventListenerOptions)), this.eventsAdded = !0;
        }
    }, e.prototype.removeEvents = function() {
        if (this.eventsAdded && this.interactionDOMElement) {
            var t = this.interactionDOMElement.style;
            self.navigator.msPointerEnabled ? (t.msContentZooming = "", t.msTouchAction = "") : this.supportsPointerEvents && (t.touchAction = ""), this.supportsPointerEvents ? (self.document.removeEventListener("pointermove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerdown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerleave", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerover", this.onPointerOver, this._eventListenerOptions), self.removeEventListener("pointercancel", this.onPointerCancel, this._eventListenerOptions), self.removeEventListener("pointerup", this.onPointerUp, this._eventListenerOptions)) : (self.document.removeEventListener("mousemove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mousedown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mouseout", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mouseover", this.onPointerOver, this._eventListenerOptions), self.removeEventListener("mouseup", this.onPointerUp, this._eventListenerOptions)), this.supportsTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchcancel", this.onPointerCancel, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchend", this.onPointerUp, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchmove", this.onPointerMove, this._eventListenerOptions)), this.interactionDOMElement = null, this.eventsAdded = !1;
        }
    }, e.prototype.tickerUpdate = function(t) {
        this._deltaTime += t, this._deltaTime < this.interactionFrequency || (this._deltaTime = 0, this.update());
    }, e.prototype.update = function() {
        if (this.interactionDOMElement) if (this._didMove) this._didMove = !1;
        else {
            for(var t in this.cursor = null, this.activeInteractionData)if (this.activeInteractionData.hasOwnProperty(t)) {
                var e = this.activeInteractionData[t];
                if (e.originalEvent && "touch" !== e.pointerType) {
                    var r = this.configureInteractionEventForDOMEvent(this.eventData, e.originalEvent, e);
                    this.processInteractive(r, this.lastObjectRendered, this.processPointerOverOut, !0);
                }
            }
            this.setCursorMode(this.cursor);
        }
    }, e.prototype.setCursorMode = function(t) {
        t = t || "default";
        var e1 = !0;
        if (self.OffscreenCanvas && this.interactionDOMElement instanceof OffscreenCanvas && (e1 = !1), this.currentCursorMode !== t) {
            this.currentCursorMode = t;
            var r = this.cursorStyles[t];
            if (r) switch(typeof r){
                case "string":
                    e1 && (this.interactionDOMElement.style.cursor = r);
                    break;
                case "function":
                    r(t);
                    break;
                case "object":
                    e1 && Object.assign(this.interactionDOMElement.style, r);
            }
            else e1 && "string" == typeof t && !Object.prototype.hasOwnProperty.call(this.cursorStyles, t) && (this.interactionDOMElement.style.cursor = t);
        }
    }, e.prototype.dispatchEvent = function(t, e, r) {
        r.stopPropagationHint && t !== r.stopsPropagatingAt || (r.currentTarget = t, r.type = e, t.emit(e, r), t[e] && t[e](r));
    }, e.prototype.delayDispatchEvent = function(t, e, r) {
        this.delayedEvents.push({
            displayObject: t,
            eventString: e,
            eventData: r
        });
    }, e.prototype.mapPositionToPoint = function(t, e, r) {
        var i;
        i = this.interactionDOMElement.parentElement ? this.interactionDOMElement.getBoundingClientRect() : {
            x: 0,
            y: 0,
            width: this.interactionDOMElement.width,
            height: this.interactionDOMElement.height,
            left: 0,
            top: 0
        };
        var n = 1 / this.resolution;
        t.x = (e - i.left) * (this.interactionDOMElement.width / i.width) * n, t.y = (r - i.top) * (this.interactionDOMElement.height / i.height) * n;
    }, e.prototype.processInteractive = function(t, e, r, i) {
        var n = this.search.findHit(t, e, r, i), o = this.delayedEvents;
        if (!o.length) return n;
        t.stopPropagationHint = !1;
        var s = o.length;
        this.delayedEvents = [];
        for(var a = 0; a < s; a++){
            var h = o[a], u = h.displayObject, l = h.eventString, c = h.eventData;
            c.stopsPropagatingAt === u && (c.stopPropagationHint = !0), this.dispatchEvent(u, l, c);
        }
        return n;
    }, e.prototype.onPointerDown = function(t) {
        if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
            var e = this.normalizeToPointerData(t);
            this.autoPreventDefault && e[0].isNormalized && (t.cancelable || !("cancelable" in t)) && t.preventDefault();
            for(var r = e.length, i = 0; i < r; i++){
                var n = e[i], o = this.getInteractionDataForPointerId(n), s = this.configureInteractionEventForDOMEvent(this.eventData, n, o);
                if (s.data.originalEvent = t, this.processInteractive(s, this.lastObjectRendered, this.processPointerDown, !0), this.emit("pointerdown", s), "touch" === n.pointerType) this.emit("touchstart", s);
                else if ("mouse" === n.pointerType || "pen" === n.pointerType) {
                    var a = 2 === n.button;
                    this.emit(a ? "rightdown" : "mousedown", this.eventData);
                }
            }
        }
    }, e.prototype.processPointerDown = function(t, e, r) {
        var i = t.data, n = t.data.identifier;
        if (r) {
            if (e.trackedPointers[n] || (e.trackedPointers[n] = new li(n)), this.dispatchEvent(e, "pointerdown", t), "touch" === i.pointerType) this.dispatchEvent(e, "touchstart", t);
            else if ("mouse" === i.pointerType || "pen" === i.pointerType) {
                var o = 2 === i.button;
                o ? e.trackedPointers[n].rightDown = !0 : e.trackedPointers[n].leftDown = !0, this.dispatchEvent(e, o ? "rightdown" : "mousedown", t);
            }
        }
    }, e.prototype.onPointerComplete = function(t, e, r) {
        for(var i = this.normalizeToPointerData(t), n = i.length, o = t.target !== this.interactionDOMElement ? "outside" : "", s = 0; s < n; s++){
            var a = i[s], h = this.getInteractionDataForPointerId(a), u = this.configureInteractionEventForDOMEvent(this.eventData, a, h);
            if (u.data.originalEvent = t, this.processInteractive(u, this.lastObjectRendered, r, e || !o), this.emit(e ? "pointercancel" : "pointerup" + o, u), "mouse" === a.pointerType || "pen" === a.pointerType) {
                var l = 2 === a.button;
                this.emit(l ? "rightup" + o : "mouseup" + o, u);
            } else "touch" === a.pointerType && (this.emit(e ? "touchcancel" : "touchend" + o, u), this.releaseInteractionDataForPointerId(a.pointerId));
        }
    }, e.prototype.onPointerCancel = function(t) {
        this.supportsTouchEvents && "touch" === t.pointerType || this.onPointerComplete(t, !0, this.processPointerCancel);
    }, e.prototype.processPointerCancel = function(t, e) {
        var r = t.data, i = t.data.identifier;
        void 0 !== e.trackedPointers[i] && (delete e.trackedPointers[i], this.dispatchEvent(e, "pointercancel", t), "touch" === r.pointerType && this.dispatchEvent(e, "touchcancel", t));
    }, e.prototype.onPointerUp = function(t) {
        this.supportsTouchEvents && "touch" === t.pointerType || this.onPointerComplete(t, !1, this.processPointerUp);
    }, e.prototype.processPointerUp = function(t, e, r) {
        var i = t.data, n = t.data.identifier, o = e.trackedPointers[n], s = "touch" === i.pointerType, a = "mouse" === i.pointerType || "pen" === i.pointerType, h = !1;
        if (a) {
            var u = 2 === i.button, l = li.FLAGS, c = u ? l.RIGHT_DOWN : l.LEFT_DOWN, d = void 0 !== o && o.flags & c;
            r ? (this.dispatchEvent(e, u ? "rightup" : "mouseup", t), d && (this.dispatchEvent(e, u ? "rightclick" : "click", t), h = !0)) : d && this.dispatchEvent(e, u ? "rightupoutside" : "mouseupoutside", t), o && (u ? o.rightDown = !1 : o.leftDown = !1);
        }
        r ? (this.dispatchEvent(e, "pointerup", t), s && this.dispatchEvent(e, "touchend", t), o && (a && !h || this.dispatchEvent(e, "pointertap", t), s && (this.dispatchEvent(e, "tap", t), o.over = !1))) : o && (this.dispatchEvent(e, "pointerupoutside", t), s && this.dispatchEvent(e, "touchendoutside", t)), o && o.none && delete e.trackedPointers[n];
    }, e.prototype.onPointerMove = function(t) {
        if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
            var e = this.normalizeToPointerData(t);
            "mouse" !== e[0].pointerType && "pen" !== e[0].pointerType || (this._didMove = !0, this.cursor = null);
            for(var r = e.length, i = 0; i < r; i++){
                var n = e[i], o = this.getInteractionDataForPointerId(n), s = this.configureInteractionEventForDOMEvent(this.eventData, n, o);
                s.data.originalEvent = t, this.processInteractive(s, this.lastObjectRendered, this.processPointerMove, !0), this.emit("pointermove", s), "touch" === n.pointerType && this.emit("touchmove", s), "mouse" !== n.pointerType && "pen" !== n.pointerType || this.emit("mousemove", s);
            }
            "mouse" === e[0].pointerType && this.setCursorMode(this.cursor);
        }
    }, e.prototype.processPointerMove = function(t, e, r) {
        var i = t.data, n = "touch" === i.pointerType, o = "mouse" === i.pointerType || "pen" === i.pointerType;
        o && this.processPointerOverOut(t, e, r), this.moveWhenInside && !r || (this.dispatchEvent(e, "pointermove", t), n && this.dispatchEvent(e, "touchmove", t), o && this.dispatchEvent(e, "mousemove", t));
    }, e.prototype.onPointerOut = function(t) {
        if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
            var e = this.normalizeToPointerData(t)[0];
            "mouse" === e.pointerType && (this.mouseOverRenderer = !1, this.setCursorMode(null));
            var r = this.getInteractionDataForPointerId(e), i = this.configureInteractionEventForDOMEvent(this.eventData, e, r);
            i.data.originalEvent = e, this.processInteractive(i, this.lastObjectRendered, this.processPointerOverOut, !1), this.emit("pointerout", i), "mouse" === e.pointerType || "pen" === e.pointerType ? this.emit("mouseout", i) : this.releaseInteractionDataForPointerId(r.identifier);
        }
    }, e.prototype.processPointerOverOut = function(t, e, r) {
        var i = t.data, n = t.data.identifier, o = "mouse" === i.pointerType || "pen" === i.pointerType, s = e.trackedPointers[n];
        r && !s && (s = e.trackedPointers[n] = new li(n)), void 0 !== s && (r && this.mouseOverRenderer ? (s.over || (s.over = !0, this.delayDispatchEvent(e, "pointerover", t), o && this.delayDispatchEvent(e, "mouseover", t)), o && null === this.cursor && (this.cursor = e.cursor)) : s.over && (s.over = !1, this.dispatchEvent(e, "pointerout", this.eventData), o && this.dispatchEvent(e, "mouseout", t), s.none && delete e.trackedPointers[n]));
    }, e.prototype.onPointerOver = function(t) {
        var e1 = this.normalizeToPointerData(t)[0], r = this.getInteractionDataForPointerId(e1), i = this.configureInteractionEventForDOMEvent(this.eventData, e1, r);
        i.data.originalEvent = e1, "mouse" === e1.pointerType && (this.mouseOverRenderer = !0), this.emit("pointerover", i), "mouse" !== e1.pointerType && "pen" !== e1.pointerType || this.emit("mouseover", i);
    }, e.prototype.getInteractionDataForPointerId = function(t) {
        var e1, r = t.pointerId;
        return r === fi || "mouse" === t.pointerType ? e1 = this.mouse : this.activeInteractionData[r] ? e1 = this.activeInteractionData[r] : ((e1 = this.interactionDataPool.pop() || new ai).identifier = r, this.activeInteractionData[r] = e1), e1.copyEvent(t), e1;
    }, e.prototype.releaseInteractionDataForPointerId = function(t) {
        var e1 = this.activeInteractionData[t];
        e1 && (delete this.activeInteractionData[t], e1.reset(), this.interactionDataPool.push(e1));
    }, e.prototype.configureInteractionEventForDOMEvent = function(t, e, r) {
        return t.data = r, this.mapPositionToPoint(r.global, e.clientX, e.clientY), "touch" === e.pointerType && (e.globalX = r.global.x, e.globalY = r.global.y), r.originalEvent = e, t.reset(), t;
    }, e.prototype.normalizeToPointerData = function(t) {
        var e1 = [];
        if (this.supportsTouchEvents && t instanceof TouchEvent) for(var r = 0, i = t.changedTouches.length; r < i; r++){
            var n = t.changedTouches[r];
            void 0 === n.button && (n.button = t.touches.length ? 1 : 0), void 0 === n.buttons && (n.buttons = t.touches.length ? 1 : 0), void 0 === n.isPrimary && (n.isPrimary = 1 === t.touches.length && "touchstart" === t.type), void 0 === n.width && (n.width = n.radiusX || 1), void 0 === n.height && (n.height = n.radiusY || 1), void 0 === n.tiltX && (n.tiltX = 0), void 0 === n.tiltY && (n.tiltY = 0), void 0 === n.pointerType && (n.pointerType = "touch"), void 0 === n.pointerId && (n.pointerId = n.identifier || 0), void 0 === n.pressure && (n.pressure = n.force || 0.5), void 0 === n.twist && (n.twist = 0), void 0 === n.tangentialPressure && (n.tangentialPressure = 0), void 0 === n.layerX && (n.layerX = n.offsetX = n.clientX), void 0 === n.layerY && (n.layerY = n.offsetY = n.clientY), n.isNormalized = !0, e1.push(n);
        }
        else if (!self.MouseEvent || t instanceof MouseEvent && !(this.supportsPointerEvents && t instanceof self.PointerEvent)) {
            var o = t;
            void 0 === o.isPrimary && (o.isPrimary = !0), void 0 === o.width && (o.width = 1), void 0 === o.height && (o.height = 1), void 0 === o.tiltX && (o.tiltX = 0), void 0 === o.tiltY && (o.tiltY = 0), void 0 === o.pointerType && (o.pointerType = "mouse"), void 0 === o.pointerId && (o.pointerId = fi), void 0 === o.pressure && (o.pressure = 0.5), void 0 === o.twist && (o.twist = 0), void 0 === o.tangentialPressure && (o.tangentialPressure = 0), o.isNormalized = !0, e1.push(o);
        } else e1.push(t);
        return e1;
    }, e.prototype.destroy = function() {
        this.removeEvents(), this.removeTickerListener(), this.removeAllListeners(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactionDOMElement = null, this.onPointerDown = null, this.processPointerDown = null, this.onPointerUp = null, this.processPointerUp = null, this.onPointerCancel = null, this.processPointerCancel = null, this.onPointerMove = null, this.processPointerMove = null, this.onPointerOut = null, this.processPointerOverOut = null, this.onPointerOver = null, this.search = null;
    }, e;
}(nt), mi = function() {
    function t(t) {
        this.items = [], this._name = t, this._aliasCount = 0;
    }
    return t.prototype.emit = function(t, e, r, i, n, o, s, a) {
        if (arguments.length > 8) throw new Error("max arguments reached");
        var h = this.name, u = this.items;
        this._aliasCount++;
        for(var l = 0, c = u.length; l < c; l++)u[l][h](t, e, r, i, n, o, s, a);
        return u === this.items && this._aliasCount--, this;
    }, t.prototype.ensureNonAliasedItems = function() {
        this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0, this.items = this.items.slice(0));
    }, t.prototype.add = function(t) {
        return t[this._name] && (this.ensureNonAliasedItems(), this.remove(t), this.items.push(t)), this;
    }, t.prototype.remove = function(t) {
        var e = this.items.indexOf(t);
        return -1 !== e && (this.ensureNonAliasedItems(), this.items.splice(e, 1)), this;
    }, t.prototype.contains = function(t) {
        return -1 !== this.items.indexOf(t);
    }, t.prototype.removeAll = function() {
        return this.ensureNonAliasedItems(), this.items.length = 0, this;
    }, t.prototype.destroy = function() {
        this.removeAll(), this.items = null, this._name = null;
    }, Object.defineProperty(t.prototype, "empty", {
        get: function() {
            return 0 === this.items.length;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "name", {
        get: function() {
            return this._name;
        },
        enumerable: !1,
        configurable: !0
    }), t;
}();
Object.defineProperties(mi.prototype, {
    dispatch: {
        value: mi.prototype.emit
    },
    run: {
        value: mi.prototype.emit
    }
}), et.PREFER_ENV = tt.any ? ie.WEBGL : ie.WEBGL2, et.STRICT_TEXTURE_CACHE = !1;
var vi = [];
function yi(t, e) {
    if (!t) return null;
    var r = "";
    if ("string" == typeof t) {
        var i = /\.(\w{3,4})(?:$|\?|#)/i.exec(t);
        i && (r = i[1].toLowerCase());
    }
    for(var n1 = vi.length - 1; n1 >= 0; --n1){
        var o = vi[n1];
        if (o.test && o.test(t, r)) return new o(t, e);
    }
    throw new Error("Unrecognized source type to auto-detect Resource");
}
var gi = function(t, e) {
    return (gi = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
};
function Ei(t, e) {
    function r() {
        this.constructor = t;
    }
    gi(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
}
var Ti = function() {
    return (Ti = Object.assign || function(t) {
        for(var e, r = arguments, i = 1, n = arguments.length; i < n; i++)for(var o in e = r[i])Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        return t;
    }).apply(this, arguments);
}, bi = function() {
    function t(t, e) {
        void 0 === t && (t = 0), void 0 === e && (e = 0), this._width = t, this._height = e, this.destroyed = !1, this.internal = !1, this.onResize = new mi("setRealSize"), this.onUpdate = new mi("update"), this.onError = new mi("onError");
    }
    return t.prototype.bind = function(t) {
        this.onResize.add(t), this.onUpdate.add(t), this.onError.add(t), (this._width || this._height) && this.onResize.emit(this._width, this._height);
    }, t.prototype.unbind = function(t) {
        this.onResize.remove(t), this.onUpdate.remove(t), this.onError.remove(t);
    }, t.prototype.resize = function(t, e) {
        t === this._width && e === this._height || (this._width = t, this._height = e, this.onResize.emit(t, e));
    }, Object.defineProperty(t.prototype, "valid", {
        get: function() {
            return !!this._width && !!this._height;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.update = function() {
        this.destroyed || this.onUpdate.emit();
    }, t.prototype.load = function() {
        return Promise.resolve(this);
    }, Object.defineProperty(t.prototype, "width", {
        get: function() {
            return this._width;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "height", {
        get: function() {
            return this._height;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.style = function(t, e, r) {
        return !1;
    }, t.prototype.dispose = function() {
    }, t.prototype.destroy = function() {
        this.destroyed || (this.destroyed = !0, this.dispose(), this.onError.removeAll(), this.onError = null, this.onResize.removeAll(), this.onResize = null, this.onUpdate.removeAll(), this.onUpdate = null);
    }, t.test = function(t, e) {
        return !1;
    }, t;
}(), xi = function(t) {
    function e(e, r) {
        var i = this, n = r || {
        }, o = n.width, s = n.height;
        if (!o || !s) throw new Error("BufferResource width or height invalid");
        return (i = t.call(this, o, s) || this).data = e, i;
    }
    return Ei(e, t), e.prototype.upload = function(t, e, r) {
        var i = t.gl;
        i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === _e.UNPACK);
        var n = e.realWidth, o = e.realHeight;
        return r.width === n && r.height === o ? i.texSubImage2D(e.target, 0, 0, 0, n, o, e.format, r.type, this.data) : (r.width = n, r.height = o, i.texImage2D(e.target, 0, r.internalFormat, n, o, 0, e.format, r.type, this.data)), !0;
    }, e.prototype.dispose = function() {
        this.data = null;
    }, e.test = function(t) {
        return t instanceof Float32Array || t instanceof Uint8Array || t instanceof Uint32Array;
    }, e;
}(bi), Ri = {
    scaleMode: de.NEAREST,
    format: he.RGBA,
    alphaMode: _e.NPM
}, Ai = function(t) {
    function e(e, r) {
        void 0 === e && (e = null), void 0 === r && (r = null);
        var i = t.call(this) || this, n = (r = r || {
        }).alphaMode, o = r.mipmap, s = r.anisotropicLevel, a = r.scaleMode, h = r.width, u = r.height, l = r.wrapMode, c = r.format, d = r.type, f = r.target, p = r.resolution, _ = r.resourceOptions;
        return !e || e instanceof bi || ((e = yi(e, _)).internal = !0), i.resolution = p || et.RESOLUTION, i.width = Math.round((h || 0) * i.resolution) / i.resolution, i.height = Math.round((u || 0) * i.resolution) / i.resolution, i._mipmap = void 0 !== o ? o : et.MIPMAP_TEXTURES, i.anisotropicLevel = void 0 !== s ? s : et.ANISOTROPIC_LEVEL, i._wrapMode = l || et.WRAP_MODE, i._scaleMode = void 0 !== a ? a : et.SCALE_MODE, i.format = c || he.RGBA, i.type = d || le.UNSIGNED_BYTE, i.target = f || ue.TEXTURE_2D, i.alphaMode = void 0 !== n ? n : _e.UNPACK, i.uid = We(), i.touched = 0, i.isPowerOfTwo = !1, i._refreshPOT(), i._glTextures = {
        }, i.dirtyId = 0, i.dirtyStyleId = 0, i.cacheId = null, i.valid = h > 0 && u > 0, i.textureCacheIds = [], i.destroyed = !1, i.resource = null, i._batchEnabled = 0, i._batchLocation = 0, i.parentTextureArray = null, i.setResource(e), i;
    }
    return Ei(e, t), Object.defineProperty(e.prototype, "realWidth", {
        get: function() {
            return Math.round(this.width * this.resolution);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "realHeight", {
        get: function() {
            return Math.round(this.height * this.resolution);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "mipmap", {
        get: function() {
            return this._mipmap;
        },
        set: function(t) {
            this._mipmap !== t && (this._mipmap = t, this.dirtyStyleId++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "scaleMode", {
        get: function() {
            return this._scaleMode;
        },
        set: function(t) {
            this._scaleMode !== t && (this._scaleMode = t, this.dirtyStyleId++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "wrapMode", {
        get: function() {
            return this._wrapMode;
        },
        set: function(t) {
            this._wrapMode !== t && (this._wrapMode = t, this.dirtyStyleId++);
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.setStyle = function(t, e) {
        var r;
        return void 0 !== t && t !== this.scaleMode && (this.scaleMode = t, r = !0), void 0 !== e && e !== this.mipmap && (this.mipmap = e, r = !0), r && this.dirtyStyleId++, this;
    }, e.prototype.setSize = function(t, e, r) {
        return r = r || this.resolution, this.setRealSize(t * r, e * r, r);
    }, e.prototype.setRealSize = function(t, e, r) {
        return this.resolution = r || this.resolution, this.width = Math.round(t) / this.resolution, this.height = Math.round(e) / this.resolution, this._refreshPOT(), this.update(), this;
    }, e.prototype._refreshPOT = function() {
        this.isPowerOfTwo = ke(this.realWidth) && ke(this.realHeight);
    }, e.prototype.setResolution = function(t) {
        var e1 = this.resolution;
        return e1 === t ? this : (this.resolution = t, this.valid && (this.width = Math.round(this.width * e1) / t, this.height = Math.round(this.height * e1) / t, this.emit("update", this)), this._refreshPOT(), this);
    }, e.prototype.setResource = function(t) {
        if (this.resource === t) return this;
        if (this.resource) throw new Error("Resource can be set only once");
        return t.bind(this), this.resource = t, this;
    }, e.prototype.update = function() {
        this.valid ? (this.dirtyId++, this.dirtyStyleId++, this.emit("update", this)) : this.width > 0 && this.height > 0 && (this.valid = !0, this.emit("loaded", this), this.emit("update", this));
    }, e.prototype.onError = function(t) {
        this.emit("error", this, t);
    }, e.prototype.destroy = function() {
        this.resource && (this.resource.unbind(this), this.resource.internal && this.resource.destroy(), this.resource = null), this.cacheId && (delete Ze[this.cacheId], delete Ke[this.cacheId], this.cacheId = null), this.dispose(), e.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0;
    }, e.prototype.dispose = function() {
        this.emit("dispose", this);
    }, e.prototype.castToBaseTexture = function() {
        return this;
    }, e.from = function(t, r, i) {
        void 0 === i && (i = et.STRICT_TEXTURE_CACHE);
        var n = "string" == typeof t, o = null;
        if (n) o = t;
        else {
            if (!t._pixiId) {
                var s = r && r.pixiIdPrefix || "pixiid";
                t._pixiId = s + "_" + We();
            }
            o = t._pixiId;
        }
        var a = Ze[o];
        if (n && i && !a) throw new Error('The cacheId "' + o + '" does not exist in BaseTextureCache.');
        return a || ((a = new e(t, r)).cacheId = o, e.addToCache(a, o)), a;
    }, e.fromBuffer = function(t, r, i, n) {
        t = t || new Float32Array(r * i * 4);
        var o = new xi(t, {
            width: r,
            height: i
        }), s = t instanceof Float32Array ? le.FLOAT : le.UNSIGNED_BYTE;
        return new e(o, Object.assign(Ri, n || {
            width: r,
            height: i,
            type: s
        }));
    }, e.addToCache = function(t, e) {
        e && (-1 === t.textureCacheIds.indexOf(e) && t.textureCacheIds.push(e), Ze[e] && console.warn("BaseTexture added to the cache with an id [" + e + "] that already had an entry"), Ze[e] = t);
    }, e.removeFromCache = function(t) {
        if ("string" == typeof t) {
            var e = Ze[t];
            if (e) {
                var r = e.textureCacheIds.indexOf(t);
                return r > -1 && e.textureCacheIds.splice(r, 1), delete Ze[t], e;
            }
        } else if (t && t.textureCacheIds) {
            for(var i = 0; i < t.textureCacheIds.length; ++i)delete Ze[t.textureCacheIds[i]];
            return t.textureCacheIds.length = 0, t;
        }
        return null;
    }, e._globalBatch = 0, e;
}(nt), Oi = function(t) {
    function e(e, r) {
        var i = this, n = r || {
        }, o = n.width, s = n.height;
        (i = t.call(this, o, s) || this).items = [], i.itemDirtyIds = [];
        for(var a = 0; a < e; a++){
            var h = new Ai;
            i.items.push(h), i.itemDirtyIds.push(-2);
        }
        return i.length = e, i._load = null, i.baseTexture = null, i;
    }
    return Ei(e, t), e.prototype.initFromArray = function(t, e) {
        for(var r = 0; r < this.length; r++)t[r] && (t[r].castToBaseTexture ? this.addBaseTextureAt(t[r].castToBaseTexture(), r) : t[r] instanceof bi ? this.addResourceAt(t[r], r) : this.addResourceAt(yi(t[r], e), r));
    }, e.prototype.dispose = function() {
        for(var t2 = 0, e1 = this.length; t2 < e1; t2++)this.items[t2].destroy();
        this.items = null, this.itemDirtyIds = null, this._load = null;
    }, e.prototype.addResourceAt = function(t, e) {
        if (!this.items[e]) throw new Error("Index " + e + " is out of bounds");
        return t.valid && !this.valid && this.resize(t.width, t.height), this.items[e].setResource(t), this;
    }, e.prototype.bind = function(e) {
        if (null !== this.baseTexture) throw new Error("Only one base texture per TextureArray is allowed");
        t.prototype.bind.call(this, e);
        for(var r = 0; r < this.length; r++)this.items[r].parentTextureArray = e, this.items[r].on("update", e.update, e);
    }, e.prototype.unbind = function(e) {
        t.prototype.unbind.call(this, e);
        for(var r = 0; r < this.length; r++)this.items[r].parentTextureArray = null, this.items[r].off("update", e.update, e);
    }, e.prototype.load = function() {
        var t = this;
        if (this._load) return this._load;
        var e1 = this.items.map(function(t) {
            return t.resource;
        }).filter(function(t) {
            return t;
        }).map(function(t) {
            return t.load();
        });
        return this._load = Promise.all(e1).then(function() {
            var e11 = t.items[0], r = e11.realWidth, i = e11.realHeight;
            return t.resize(r, i), Promise.resolve(t);
        }), this._load;
    }, e;
}(bi), Si = function(t) {
    function e(e, r) {
        var i, n, o = this, s = r || {
        }, a = s.width, h = s.height;
        return Array.isArray(e) ? (i = e, n = e.length) : n = e, o = t.call(this, n, {
            width: a,
            height: h
        }) || this, i && o.initFromArray(i, r), o;
    }
    return Ei(e, t), e.prototype.addBaseTextureAt = function(t, e) {
        if (!t.resource) throw new Error("ArrayResource does not support RenderTexture");
        return this.addResourceAt(t.resource, e), this;
    }, e.prototype.bind = function(e) {
        t.prototype.bind.call(this, e), e.target = ue.TEXTURE_2D_ARRAY;
    }, e.prototype.upload = function(t, e, r) {
        var i = this.length, n = this.itemDirtyIds, o = this.items, s = t.gl;
        r.dirtyId < 0 && s.texImage3D(s.TEXTURE_2D_ARRAY, 0, r.internalFormat, this._width, this._height, i, 0, e.format, r.type, null);
        for(var a = 0; a < i; a++){
            var h = o[a];
            n[a] < h.dirtyId && (n[a] = h.dirtyId, h.valid && s.texSubImage3D(s.TEXTURE_2D_ARRAY, 0, 0, 0, a, h.resource.width, h.resource.height, 1, e.format, r.type, h.resource.source));
        }
        return !0;
    }, e;
}(Oi), Ii = function(t) {
    function e(e) {
        var r = this, i = e, n = i.naturalWidth || i.videoWidth || i.width, o = i.naturalHeight || i.videoHeight || i.height;
        return (r = t.call(this, n, o) || this).source = e, r.noSubImage = !1, r;
    }
    return Ei(e, t), e.crossOrigin = function(t, e, r) {
        void 0 === r && 0 !== e.indexOf("data:") ? t.crossOrigin = er(e) : !1 !== r && (t.crossOrigin = "string" == typeof r ? r : "anonymous");
    }, e.prototype.upload = function(t, e, r, i) {
        var n = t.gl, o = e.realWidth, s = e.realHeight;
        return i = i || this.source, n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === _e.UNPACK), this.noSubImage || e.target !== n.TEXTURE_2D || r.width !== o || r.height !== s ? (r.width = o, r.height = s, n.texImage2D(e.target, 0, r.internalFormat, e.format, r.type, i)) : n.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, e.format, r.type, i), !0;
    }, e.prototype.update = function() {
        if (!this.destroyed) {
            var e = this.source, r = e.naturalWidth || e.videoWidth || e.width, i = e.naturalHeight || e.videoHeight || e.height;
            this.resize(r, i), t.prototype.update.call(this);
        }
    }, e.prototype.dispose = function() {
        this.source = null;
    }, e;
}(bi), Pi = function(t) {
    function e(e) {
        return t.call(this, e) || this;
    }
    return Ei(e, t), e.test = function(t) {
        var e1 = self.OffscreenCanvas;
        return !!(e1 && t instanceof e1) || self.HTMLCanvasElement && t instanceof HTMLCanvasElement;
    }, e;
}(Ii), Ni = function(t) {
    function e(r, i) {
        var n = this, o = i || {
        }, s = o.width, a = o.height, h = o.autoLoad, u = o.linkBaseTexture;
        if (r && r.length !== e.SIDES) throw new Error("Invalid length. Got " + r.length + ", expected 6");
        n = t.call(this, 6, {
            width: s,
            height: a
        }) || this;
        for(var l = 0; l < e.SIDES; l++)n.items[l].target = ue.TEXTURE_CUBE_MAP_POSITIVE_X + l;
        return n.linkBaseTexture = !1 !== u, r && n.initFromArray(r, i), !1 !== h && n.load(), n;
    }
    return Ei(e, t), e.prototype.bind = function(e) {
        t.prototype.bind.call(this, e), e.target = ue.TEXTURE_CUBE_MAP;
    }, e.prototype.addBaseTextureAt = function(t, e, r) {
        if (void 0 === r && (r = this.linkBaseTexture), !this.items[e]) throw new Error("Index " + e + " is out of bounds");
        if (!this.linkBaseTexture || t.parentTextureArray || Object.keys(t._glTextures).length > 0) {
            if (!t.resource) throw new Error("CubeResource does not support copying of renderTexture.");
            this.addResourceAt(t.resource, e);
        } else t.target = ue.TEXTURE_CUBE_MAP_POSITIVE_X + e, t.parentTextureArray = this.baseTexture, this.items[e] = t;
        return t.valid && !this.valid && this.resize(t.realWidth, t.realHeight), this.items[e] = t, this;
    }, e.prototype.upload = function(t, r, i) {
        for(var n = this.itemDirtyIds, o = 0; o < e.SIDES; o++){
            var s = this.items[o];
            n[o] < s.dirtyId && (s.valid && s.resource ? (s.resource.upload(t, s, i), n[o] = s.dirtyId) : n[o] < -1 && (t.gl.texImage2D(s.target, 0, i.internalFormat, r.realWidth, r.realHeight, 0, r.format, i.type, null), n[o] = -1));
        }
        return !0;
    }, e.test = function(t) {
        return Array.isArray(t) && t.length === e.SIDES;
    }, e.SIDES = 6, e;
}(Oi), Mi = function(t) {
    function e(e, r) {
        var i = this;
        if (r = r || {
        }, !(e instanceof HTMLImageElement)) {
            var n = new Image;
            Ii.crossOrigin(n, e, r.crossorigin), n.src = e, e = n;
        }
        return i = t.call(this, e) || this, !e.complete && i._width && i._height && (i._width = 0, i._height = 0), i.url = e.src, i._process = null, i.preserveBitmap = !1, i.createBitmap = (void 0 !== r.createBitmap ? r.createBitmap : et.CREATE_IMAGE_BITMAP) && !!self.createImageBitmap, i.alphaMode = "number" == typeof r.alphaMode ? r.alphaMode : null, i.bitmap = null, i._load = null, !1 !== r.autoLoad && i.load(), i;
    }
    return Ei(e, t), e.prototype.load = function(t) {
        var e = this;
        return this._load ? this._load : (void 0 !== t && (this.createBitmap = t), this._load = new Promise(function(t, r) {
            var i = e.source;
            e.url = i.src;
            var n = function() {
                e.destroyed || (i.onload = null, i.onerror = null, e.resize(i.width, i.height), e._load = null, e.createBitmap ? t(e.process()) : t(e));
            };
            i.complete && i.src ? n() : (i.onload = n, i.onerror = function(t) {
                r(t), e.onError.emit(t);
            });
        }), this._load);
    }, e.prototype.process = function() {
        var t = this, e1 = this.source;
        if (null !== this._process) return this._process;
        if (null !== this.bitmap || !self.createImageBitmap) return Promise.resolve(this);
        var r = self.createImageBitmap, i = !e1.crossOrigin || "anonymous" === e1.crossOrigin;
        return this._process = fetch(e1.src, {
            mode: i ? "cors" : "no-cors"
        }).then(function(t) {
            return t.blob();
        }).then(function(i) {
            return r(i, 0, 0, e1.width, e1.height, {
                premultiplyAlpha: t.alphaMode === _e.UNPACK ? "premultiply" : "none"
            });
        }).then(function(e) {
            return t.destroyed ? Promise.reject() : (t.bitmap = e, t.update(), t._process = null, Promise.resolve(t));
        }), this._process;
    }, e.prototype.upload = function(e, r, i) {
        if ("number" == typeof this.alphaMode && (r.alphaMode = this.alphaMode), !this.createBitmap) return t.prototype.upload.call(this, e, r, i);
        if (!this.bitmap && (this.process(), !this.bitmap)) return !1;
        if (t.prototype.upload.call(this, e, r, i, this.bitmap), !this.preserveBitmap) {
            var n = !0, o = r._glTextures;
            for(var s in o){
                var a = o[s];
                if (a !== i && a.dirtyId !== r.dirtyId) {
                    n = !1;
                    break;
                }
            }
            n && (this.bitmap.close && this.bitmap.close(), this.bitmap = null);
        }
        return !0;
    }, e.prototype.dispose = function() {
        this.source.onload = null, this.source.onerror = null, t.prototype.dispose.call(this), this.bitmap && (this.bitmap.close(), this.bitmap = null), this._process = null, this._load = null;
    }, e.test = function(t) {
        return "string" == typeof t || t instanceof HTMLImageElement;
    }, e;
}(Ii), Di = function(t) {
    function e(e, r) {
        var i = this;
        return r = r || {
        }, (i = t.call(this, document.createElement("canvas")) || this)._width = 0, i._height = 0, i.svg = e, i.scale = r.scale || 1, i._overrideWidth = r.width, i._overrideHeight = r.height, i._resolve = null, i._crossorigin = r.crossorigin, i._load = null, !1 !== r.autoLoad && i.load(), i;
    }
    return Ei(e, t), e.prototype.load = function() {
        var t = this;
        return this._load ? this._load : (this._load = new Promise(function(r) {
            if (t._resolve = function() {
                t.resize(t.source.width, t.source.height), r(t);
            }, e.SVG_XML.test(t.svg.trim())) {
                if (!btoa) throw new Error("Your browser doesn't support base64 conversions.");
                t.svg = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(t.svg)));
            }
            t._loadSvg();
        }), this._load);
    }, e.prototype._loadSvg = function() {
        var t = this, e1 = new Image;
        Ii.crossOrigin(e1, this.svg, this._crossorigin), e1.src = this.svg, e1.onerror = function(r) {
            t._resolve && (e1.onerror = null, t.onError.emit(r));
        }, e1.onload = function() {
            if (t._resolve) {
                var r = e1.width, i = e1.height;
                if (!r || !i) throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
                var n = r * t.scale, o = i * t.scale;
                (t._overrideWidth || t._overrideHeight) && (n = t._overrideWidth || t._overrideHeight / i * r, o = t._overrideHeight || t._overrideWidth / r * i), n = Math.round(n), o = Math.round(o);
                var s = t.source;
                s.width = n, s.height = o, s._pixiId = "canvas_" + We(), s.getContext("2d").drawImage(e1, 0, 0, r, i, 0, 0, n, o), t._resolve(), t._resolve = null;
            }
        };
    }, e.getSize = function(t) {
        var r = e.SVG_SIZE.exec(t), i = {
        };
        return r && (i[r[1]] = Math.round(parseFloat(r[3])), i[r[5]] = Math.round(parseFloat(r[7]))), i;
    }, e.prototype.dispose = function() {
        t.prototype.dispose.call(this), this._resolve = null, this._crossorigin = null;
    }, e.test = function(t, r) {
        return "svg" === r || "string" == typeof t && /^data:image\/svg\+xml(;(charset=utf8|utf8))?;base64/.test(t) || "string" == typeof t && e.SVG_XML.test(t);
    }, e.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m, e.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i, e;
}(Ii), Ci = function(t) {
    function e(r, i) {
        var n = this;
        if (i = i || {
        }, !(r instanceof HTMLVideoElement)) {
            var o = document.createElement("video");
            o.setAttribute("preload", "auto"), o.setAttribute("webkit-playsinline", ""), o.setAttribute("playsinline", ""), "string" == typeof r && (r = [
                r
            ]);
            var s = r[0].src || r[0];
            Ii.crossOrigin(o, s, i.crossorigin);
            for(var a = 0; a < r.length; ++a){
                var h = document.createElement("source"), u = r[a], l = u.src, c = u.mime, d = (l = l || r[a]).split("?").shift().toLowerCase(), f = d.substr(d.lastIndexOf(".") + 1);
                c = c || e.MIME_TYPES[f] || "video/" + f, h.src = l, h.type = c, o.appendChild(h);
            }
            r = o;
        }
        return (n = t.call(this, r) || this).noSubImage = !0, n._autoUpdate = !0, n._isConnectedToTicker = !1, n._updateFPS = i.updateFPS || 0, n._msToNextUpdate = 0, n.autoPlay = !1 !== i.autoPlay, n._load = null, n._resolve = null, n._onCanPlay = n._onCanPlay.bind(n), n._onError = n._onError.bind(n), !1 !== i.autoLoad && n.load(), n;
    }
    return Ei(e, t), e.prototype.update = function(e) {
        if (!this.destroyed) {
            var r = oi.shared.elapsedMS * this.source.playbackRate;
            this._msToNextUpdate = Math.floor(this._msToNextUpdate - r), (!this._updateFPS || this._msToNextUpdate <= 0) && (t.prototype.update.call(this), this._msToNextUpdate = this._updateFPS ? Math.floor(1000 / this._updateFPS) : 0);
        }
    }, e.prototype.load = function() {
        var t = this;
        if (this._load) return this._load;
        var e1 = this.source;
        return (e1.readyState === e1.HAVE_ENOUGH_DATA || e1.readyState === e1.HAVE_FUTURE_DATA) && e1.width && e1.height && (e1.complete = !0), e1.addEventListener("play", this._onPlayStart.bind(this)), e1.addEventListener("pause", this._onPlayStop.bind(this)), this._isSourceReady() ? this._onCanPlay() : (e1.addEventListener("canplay", this._onCanPlay), e1.addEventListener("canplaythrough", this._onCanPlay), e1.addEventListener("error", this._onError, !0)), this._load = new Promise(function(r) {
            t.valid ? r(t) : (t._resolve = r, e1.load());
        }), this._load;
    }, e.prototype._onError = function(t) {
        this.source.removeEventListener("error", this._onError, !0), this.onError.emit(t);
    }, e.prototype._isSourcePlaying = function() {
        var t2 = this.source;
        return t2.currentTime > 0 && !1 === t2.paused && !1 === t2.ended && t2.readyState > 2;
    }, e.prototype._isSourceReady = function() {
        var t2 = this.source;
        return 3 === t2.readyState || 4 === t2.readyState;
    }, e.prototype._onPlayStart = function() {
        this.valid || this._onCanPlay(), this.autoUpdate && !this._isConnectedToTicker && (oi.shared.add(this.update, this), this._isConnectedToTicker = !0);
    }, e.prototype._onPlayStop = function() {
        this._isConnectedToTicker && (oi.shared.remove(this.update, this), this._isConnectedToTicker = !1);
    }, e.prototype._onCanPlay = function() {
        var t2 = this.source;
        t2.removeEventListener("canplay", this._onCanPlay), t2.removeEventListener("canplaythrough", this._onCanPlay);
        var e1 = this.valid;
        this.resize(t2.videoWidth, t2.videoHeight), !e1 && this._resolve && (this._resolve(this), this._resolve = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && t2.play();
    }, e.prototype.dispose = function() {
        this._isConnectedToTicker && (oi.shared.remove(this.update, this), this._isConnectedToTicker = !1);
        var e1 = this.source;
        e1 && (e1.removeEventListener("error", this._onError, !0), e1.pause(), e1.src = "", e1.load()), t.prototype.dispose.call(this);
    }, Object.defineProperty(e.prototype, "autoUpdate", {
        get: function() {
            return this._autoUpdate;
        },
        set: function(t) {
            t !== this._autoUpdate && (this._autoUpdate = t, !this._autoUpdate && this._isConnectedToTicker ? (oi.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._isSourcePlaying() && (oi.shared.add(this.update, this), this._isConnectedToTicker = !0));
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "updateFPS", {
        get: function() {
            return this._updateFPS;
        },
        set: function(t) {
            t !== this._updateFPS && (this._updateFPS = t);
        },
        enumerable: !1,
        configurable: !0
    }), e.test = function(t, r) {
        return self.HTMLVideoElement && t instanceof HTMLVideoElement || e.TYPES.indexOf(r) > -1;
    }, e.TYPES = [
        "mp4",
        "m4v",
        "webm",
        "ogg",
        "ogv",
        "h264",
        "avi",
        "mov"
    ], e.MIME_TYPES = {
        ogv: "video/ogg",
        mov: "video/quicktime",
        m4v: "video/mp4"
    }, e;
}(Ii), wi = function(t) {
    function e(e) {
        return t.call(this, e) || this;
    }
    return Ei(e, t), e.test = function(t) {
        return !!self.createImageBitmap && t instanceof ImageBitmap;
    }, e;
}(Ii);
vi.push(Mi, wi, Pi, Ci, Di, xi, Ni, Si);
var Li = {
    __proto__: null,
    Resource: bi,
    BaseImageResource: Ii,
    INSTALLED: vi,
    autoDetectResource: yi,
    AbstractMultiResource: Oi,
    ArrayResource: Si,
    BufferResource: xi,
    CanvasResource: Pi,
    CubeResource: Ni,
    ImageResource: Mi,
    SVGResource: Di,
    VideoResource: Ci,
    ImageBitmapResource: wi
}, Fi = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return Ei(e, t), e.prototype.upload = function(t, e, r) {
        var i = t.gl;
        i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === _e.UNPACK);
        var n = e.realWidth, o = e.realHeight;
        return r.width === n && r.height === o ? i.texSubImage2D(e.target, 0, 0, 0, n, o, e.format, r.type, this.data) : (r.width = n, r.height = o, i.texImage2D(e.target, 0, r.internalFormat, n, o, 0, e.format, r.type, this.data)), !0;
    }, e;
}(xi), Ui = function() {
    function t(t, e) {
        this.width = Math.round(t || 100), this.height = Math.round(e || 100), this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {
        }, this.disposeRunner = new mi("disposeFramebuffer"), this.multisample = Ee.NONE;
    }
    return Object.defineProperty(t.prototype, "colorTexture", {
        get: function() {
            return this.colorTextures[0];
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.addColorTexture = function(t, e) {
        return void 0 === t && (t = 0), this.colorTextures[t] = e || new Ai(null, {
            scaleMode: de.NEAREST,
            resolution: 1,
            mipmap: pe.OFF,
            width: this.width,
            height: this.height
        }), this.dirtyId++, this.dirtyFormat++, this;
    }, t.prototype.addDepthTexture = function(t) {
        return this.depthTexture = t || new Ai(new Fi(null, {
            width: this.width,
            height: this.height
        }), {
            scaleMode: de.NEAREST,
            resolution: 1,
            width: this.width,
            height: this.height,
            mipmap: pe.OFF,
            format: he.DEPTH_COMPONENT,
            type: le.UNSIGNED_SHORT
        }), this.dirtyId++, this.dirtyFormat++, this;
    }, t.prototype.enableDepth = function() {
        return this.depth = !0, this.dirtyId++, this.dirtyFormat++, this;
    }, t.prototype.enableStencil = function() {
        return this.stencil = !0, this.dirtyId++, this.dirtyFormat++, this;
    }, t.prototype.resize = function(t, e) {
        if (t = Math.round(t), e = Math.round(e), t !== this.width || e !== this.height) {
            this.width = t, this.height = e, this.dirtyId++, this.dirtySize++;
            for(var r = 0; r < this.colorTextures.length; r++){
                var i = this.colorTextures[r], n = i.resolution;
                i.setSize(t / n, e / n);
            }
            this.depthTexture && (n = this.depthTexture.resolution, this.depthTexture.setSize(t / n, e / n));
        }
    }, t.prototype.dispose = function() {
        this.disposeRunner.emit(this, !1);
    }, t.prototype.destroyDepthTexture = function() {
        this.depthTexture && (this.depthTexture.destroy(), this.depthTexture = null, ++this.dirtyId, ++this.dirtyFormat);
    }, t;
}(), Gi = function(t) {
    function e(e) {
        var r = this;
        return "number" == typeof e && (e = {
            width: arguments[0],
            height: arguments[1],
            scaleMode: arguments[2],
            resolution: arguments[3]
        }), e.width = e.width || 100, e.height = e.height || 100, e.multisample = void 0 !== e.multisample ? e.multisample : Ee.NONE, (r = t.call(this, null, e) || this).mipmap = pe.OFF, r.valid = !0, r.clearColor = [
            0,
            0,
            0,
            0
        ], r.framebuffer = new Ui(r.realWidth, r.realHeight).addColorTexture(0, r), r.framebuffer.multisample = e.multisample, r.maskStack = [], r.filterStack = [
            {
            }
        ], r;
    }
    return Ei(e, t), e.prototype.resize = function(t, e) {
        this.framebuffer.resize(t * this.resolution, e * this.resolution), this.setRealSize(this.framebuffer.width, this.framebuffer.height);
    }, e.prototype.dispose = function() {
        this.framebuffer.dispose(), t.prototype.dispose.call(this);
    }, e.prototype.destroy = function() {
        t.prototype.destroy.call(this), this.framebuffer.destroyDepthTexture(), this.framebuffer = null;
    }, e;
}(Ai), Bi = function() {
    function t() {
        this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = new Float32Array(8);
    }
    return t.prototype.set = function(t, e, r) {
        var i = e.width, n = e.height;
        if (r) {
            var o = t.width / 2 / i, s = t.height / 2 / n, a = t.x / i + o, h = t.y / n + s;
            r = xr.add(r, xr.NW), this.x0 = a + o * xr.uX(r), this.y0 = h + s * xr.uY(r), r = xr.add(r, 2), this.x1 = a + o * xr.uX(r), this.y1 = h + s * xr.uY(r), r = xr.add(r, 2), this.x2 = a + o * xr.uX(r), this.y2 = h + s * xr.uY(r), r = xr.add(r, 2), this.x3 = a + o * xr.uX(r), this.y3 = h + s * xr.uY(r);
        } else this.x0 = t.x / i, this.y0 = t.y / n, this.x1 = (t.x + t.width) / i, this.y1 = t.y / n, this.x2 = (t.x + t.width) / i, this.y2 = (t.y + t.height) / n, this.x3 = t.x / i, this.y3 = (t.y + t.height) / n;
        this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3;
    }, t;
}(), Xi = new Bi, ki = function(t) {
    function e(r, i, n, o, s, a) {
        var h = t.call(this) || this;
        if (h.noFrame = !1, i || (h.noFrame = !0, i = new hr(0, 0, 1, 1)), r instanceof e && (r = r.baseTexture), h.baseTexture = r, h._frame = i, h.trim = o, h.valid = !1, h._uvs = Xi, h.uvMatrix = null, h.orig = n || i, h._rotate = Number(s || 0), !0 === s) h._rotate = 2;
        else if (h._rotate % 2 != 0) throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
        return h.defaultAnchor = a ? new fr(a.x, a.y) : new fr(0, 0), h._updateID = 0, h.textureCacheIds = [], r.valid ? h.noFrame ? r.valid && h.onBaseTextureUpdated(r) : h.frame = i : r.once("loaded", h.onBaseTextureUpdated, h), h.noFrame && r.on("update", h.onBaseTextureUpdated, h), h;
    }
    return Ei(e, t), e.prototype.update = function() {
        this.baseTexture.resource && this.baseTexture.resource.update();
    }, e.prototype.onBaseTextureUpdated = function(t) {
        if (this.noFrame) {
            if (!this.baseTexture.valid) return;
            this._frame.width = t.width, this._frame.height = t.height, this.valid = !0, this.updateUvs();
        } else this.frame = this._frame;
        this.emit("update", this);
    }, e.prototype.destroy = function(t) {
        if (this.baseTexture) {
            if (t) {
                var r = this.baseTexture.resource;
                r && r.url && Ke[r.url] && e.removeFromCache(r.url), this.baseTexture.destroy();
            }
            this.baseTexture.off("loaded", this.onBaseTextureUpdated, this), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null;
        }
        this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, e.removeFromCache(this), this.textureCacheIds = null;
    }, e.prototype.clone = function() {
        var t2 = this._frame.clone(), r = this._frame === this.orig ? t2 : this.orig.clone(), i = new e(this.baseTexture, !this.noFrame && t2, r, this.trim && this.trim.clone(), this.rotate, this.defaultAnchor);
        return this.noFrame && (i._frame = t2), i;
    }, e.prototype.updateUvs = function() {
        this._uvs === Xi && (this._uvs = new Bi), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++;
    }, e.from = function(t, r, i) {
        void 0 === r && (r = {
        }), void 0 === i && (i = et.STRICT_TEXTURE_CACHE);
        var n = "string" == typeof t, o = null;
        if (n) o = t;
        else if (t instanceof Ai) {
            if (!t.cacheId) {
                var s = r && r.pixiIdPrefix || "pixiid";
                t.cacheId = s + "-" + We(), Ai.addToCache(t, t.cacheId);
            }
            o = t.cacheId;
        } else t._pixiId || (s = r && r.pixiIdPrefix || "pixiid", t._pixiId = s + "_" + We()), o = t._pixiId;
        var a = Ke[o];
        if (n && i && !a) throw new Error('The cacheId "' + o + '" does not exist in TextureCache.');
        return a || t instanceof Ai ? !a && t instanceof Ai && (a = new e(t), e.addToCache(a, o)) : (r.resolution || (r.resolution = rr(t)), (a = new e(new Ai(t, r))).baseTexture.cacheId = o, Ai.addToCache(a.baseTexture, o), e.addToCache(a, o)), a;
    }, e.fromURL = function(t, r) {
        var i = Object.assign({
            autoLoad: !1
        }, null == r ? void 0 : r.resourceOptions), n = e.from(t, Object.assign({
            resourceOptions: i
        }, r), !1), o = n.baseTexture.resource;
        return n.baseTexture.valid ? Promise.resolve(n) : o.load().then(function() {
            return Promise.resolve(n);
        });
    }, e.fromBuffer = function(t, r, i, n) {
        return new e(Ai.fromBuffer(t, r, i, n));
    }, e.fromLoader = function(t, r, i, n) {
        var o = new Ai(t, Object.assign({
            scaleMode: et.SCALE_MODE,
            resolution: rr(r)
        }, n)), s1 = o.resource;
        s1 instanceof Mi && (s1.url = r);
        var a = new e(o);
        return i || (i = r), Ai.addToCache(a.baseTexture, i), e.addToCache(a, i), i !== r && (Ai.addToCache(a.baseTexture, r), e.addToCache(a, r)), a.baseTexture.valid ? Promise.resolve(a) : new Promise(function(t) {
            a.baseTexture.once("loaded", function() {
                return t(a);
            });
        });
    }, e.addToCache = function(t, e) {
        e && (-1 === t.textureCacheIds.indexOf(e) && t.textureCacheIds.push(e), Ke[e] && console.warn("Texture added to the cache with an id [" + e + "] that already had an entry"), Ke[e] = t);
    }, e.removeFromCache = function(t) {
        if ("string" == typeof t) {
            var e = Ke[t];
            if (e) {
                var r = e.textureCacheIds.indexOf(t);
                return r > -1 && e.textureCacheIds.splice(r, 1), delete Ke[t], e;
            }
        } else if (t && t.textureCacheIds) {
            for(var i = 0; i < t.textureCacheIds.length; ++i)Ke[t.textureCacheIds[i]] === t && delete Ke[t.textureCacheIds[i]];
            return t.textureCacheIds.length = 0, t;
        }
        return null;
    }, Object.defineProperty(e.prototype, "resolution", {
        get: function() {
            return this.baseTexture.resolution;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "frame", {
        get: function() {
            return this._frame;
        },
        set: function(t) {
            this._frame = t, this.noFrame = !1;
            var e1 = t.x, r = t.y, i = t.width, n = t.height, o = e1 + i > this.baseTexture.width, s1 = r + n > this.baseTexture.height;
            if (o || s1) {
                var a = o && s1 ? "and" : "or", h = "X: " + e1 + " + " + i + " = " + (e1 + i) + " > " + this.baseTexture.width, u = "Y: " + r + " + " + n + " = " + (r + n) + " > " + this.baseTexture.height;
                throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: " + h + " " + a + " " + u);
            }
            this.valid = i && n && this.baseTexture.valid, this.trim || this.rotate || (this.orig = t), this.valid && this.updateUvs();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "rotate", {
        get: function() {
            return this._rotate;
        },
        set: function(t) {
            this._rotate = t, this.valid && this.updateUvs();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "width", {
        get: function() {
            return this.orig.width;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
        get: function() {
            return this.orig.height;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.castToBaseTexture = function() {
        return this.baseTexture;
    }, e;
}(nt);
function Hi(t) {
    t.destroy = function() {
    }, t.on = function() {
    }, t.once = function() {
    }, t.emit = function() {
    };
}
ki.EMPTY = new ki(new Ai), Hi(ki.EMPTY), Hi(ki.EMPTY.baseTexture), ki.WHITE = (function() {
    var t2 = document.createElement("canvas");
    t2.width = 16, t2.height = 16;
    var e1 = t2.getContext("2d");
    return e1.fillStyle = "white", e1.fillRect(0, 0, 16, 16), new ki(new Ai(new Pi(t2)));
})(), Hi(ki.WHITE), Hi(ki.WHITE.baseTexture);
var ji = function(t) {
    function e(e, r) {
        var i = t.call(this, e, r) || this;
        return i.valid = !0, i.filterFrame = null, i.filterPoolKey = null, i.updateUvs(), i;
    }
    return Ei(e, t), Object.defineProperty(e.prototype, "framebuffer", {
        get: function() {
            return this.baseTexture.framebuffer;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "multisample", {
        get: function() {
            return this.framebuffer.multisample;
        },
        set: function(t) {
            this.framebuffer.multisample = t;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.resize = function(t, e, r) {
        void 0 === r && (r = !0);
        var i = this.baseTexture.resolution, n = Math.round(t * i) / i, o = Math.round(e * i) / i;
        this.valid = n > 0 && o > 0, this._frame.width = this.orig.width = n, this._frame.height = this.orig.height = o, r && this.baseTexture.resize(n, o), this.updateUvs();
    }, e.prototype.setResolution = function(t) {
        var e1 = this.baseTexture;
        e1.resolution !== t && (e1.setResolution(t), this.resize(e1.width, e1.height, !1));
    }, e.create = function(t) {
        for(var r = arguments, i = [], n = 1; n < arguments.length; n++)i[n - 1] = r[n];
        return "number" == typeof t && (t = {
            width: t,
            height: i[0],
            scaleMode: i[1],
            resolution: i[2]
        }), new e(new Gi(t));
    }, e;
}(ki), Yi = function() {
    function t(t) {
        this.texturePool = {
        }, this.textureOptions = t || {
        }, this.enableFullScreen = !1, this._pixelsWidth = 0, this._pixelsHeight = 0;
    }
    return t.prototype.createTexture = function(t, e, r) {
        void 0 === r && (r = Ee.NONE);
        var i = new Gi(Object.assign({
            width: t,
            height: e,
            resolution: 1,
            multisample: r
        }, this.textureOptions));
        return new ji(i);
    }, t.prototype.getOptimalTexture = function(t, e, r, i) {
        var n;
        void 0 === r && (r = 1), void 0 === i && (i = Ee.NONE), t = Math.ceil(t * r), e = Math.ceil(e * r), this.enableFullScreen && t === this._pixelsWidth && e === this._pixelsHeight ? n = i > 1 ? -i : -1 : (n = ((65535 & (t = Xe(t))) << 16 | 65535 & (e = Xe(e))) >>> 0, i > 1 && (n += 4294967296 * i)), this.texturePool[n] || (this.texturePool[n] = []);
        var o = this.texturePool[n].pop();
        return o || (o = this.createTexture(t, e, i)), o.filterPoolKey = n, o.setResolution(r), o;
    }, t.prototype.getFilterTexture = function(t, e, r) {
        var i = this.getOptimalTexture(t.width, t.height, e || t.resolution, r || Ee.NONE);
        return i.filterFrame = t.filterFrame, i;
    }, t.prototype.returnTexture = function(t) {
        var e = t.filterPoolKey;
        t.filterFrame = null, this.texturePool[e].push(t);
    }, t.prototype.returnFilterTexture = function(t) {
        this.returnTexture(t);
    }, t.prototype.clear = function(t) {
        if (t = !1 !== t) for(var e in this.texturePool){
            var r = this.texturePool[e];
            if (r) for(var i = 0; i < r.length; i++)r[i].destroy(!0);
        }
        this.texturePool = {
        };
    }, t.prototype.setScreenSize = function(t) {
        if (t.width !== this._pixelsWidth || t.height !== this._pixelsHeight) {
            for(var e in this.enableFullScreen = t.width > 0 && t.height > 0, this.texturePool)if (Number(e) < 0) {
                var r = this.texturePool[e];
                if (r) for(var i = 0; i < r.length; i++)r[i].destroy(!0);
                this.texturePool[e] = [];
            }
            this._pixelsWidth = t.width, this._pixelsHeight = t.height;
        }
    }, t.SCREEN_KEY = -1, t;
}(), Vi = function() {
    function t(t, e, r, i, n, o, s) {
        void 0 === e && (e = 0), void 0 === r && (r = !1), void 0 === i && (i = le.FLOAT), this.buffer = t, this.size = e, this.normalized = r, this.type = i, this.stride = n, this.start = o, this.instance = s;
    }
    return t.prototype.destroy = function() {
        this.buffer = null;
    }, t.from = function(e, r, i, n, o) {
        return new t(e, r, i, n, o);
    }, t;
}(), Wi = 0, zi = function() {
    function t(t, e, r) {
        void 0 === e && (e = !0), void 0 === r && (r = !1), this.data = t || new Float32Array(1), this._glBuffers = {
        }, this._updateID = 0, this.index = r, this.static = e, this.id = Wi++, this.disposeRunner = new mi("disposeBuffer");
    }
    return t.prototype.update = function(t) {
        t instanceof Array && (t = new Float32Array(t)), this.data = t || this.data, this._updateID++;
    }, t.prototype.dispose = function() {
        this.disposeRunner.emit(this, !1);
    }, t.prototype.destroy = function() {
        this.dispose(), this.data = null;
    }, Object.defineProperty(t.prototype, "index", {
        get: function() {
            return this.type === Te.ELEMENT_ARRAY_BUFFER;
        },
        set: function(t) {
            this.type = t ? Te.ELEMENT_ARRAY_BUFFER : Te.ARRAY_BUFFER;
        },
        enumerable: !1,
        configurable: !0
    }), t.from = function(e) {
        return e instanceof Array && (e = new Float32Array(e)), new t(e);
    }, t;
}(), qi = {
    Float32Array: Float32Array,
    Uint32Array: Uint32Array,
    Int32Array: Int32Array,
    Uint8Array: Uint8Array
}, Ki = {
    5126: 4,
    5123: 2,
    5121: 1
}, Zi = 0, Ji = {
    Float32Array: Float32Array,
    Uint32Array: Uint32Array,
    Int32Array: Int32Array,
    Uint8Array: Uint8Array,
    Uint16Array: Uint16Array
}, Qi = function() {
    function t(t, e) {
        void 0 === t && (t = []), void 0 === e && (e = {
        }), this.buffers = t, this.indexBuffer = null, this.attributes = e, this.glVertexArrayObjects = {
        }, this.id = Zi++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new mi("disposeGeometry"), this.refCount = 0;
    }
    return t.prototype.addAttribute = function(t, e, r, i, n, o, s, a) {
        if (void 0 === r && (r = 0), void 0 === i && (i = !1), void 0 === a && (a = !1), !e) throw new Error("You must pass a buffer when creating an attribute");
        e instanceof zi || (e instanceof Array && (e = new Float32Array(e)), e = new zi(e));
        var h = t.split("|");
        if (h.length > 1) {
            for(var u = 0; u < h.length; u++)this.addAttribute(h[u], e, r, i, n);
            return this;
        }
        var l = this.buffers.indexOf(e);
        return -1 === l && (this.buffers.push(e), l = this.buffers.length - 1), this.attributes[t] = new Vi(l, r, i, n, o, s, a), this.instanced = this.instanced || a, this;
    }, t.prototype.getAttribute = function(t) {
        return this.attributes[t];
    }, t.prototype.getBuffer = function(t) {
        return this.buffers[this.getAttribute(t).buffer];
    }, t.prototype.addIndex = function(t) {
        return t instanceof zi || (t instanceof Array && (t = new Uint16Array(t)), t = new zi(t)), t.type = Te.ELEMENT_ARRAY_BUFFER, this.indexBuffer = t, -1 === this.buffers.indexOf(t) && this.buffers.push(t), this;
    }, t.prototype.getIndex = function() {
        return this.indexBuffer;
    }, t.prototype.interleave = function() {
        if (1 === this.buffers.length || 2 === this.buffers.length && this.indexBuffer) return this;
        var t2, e = [], r = [], i = new zi;
        for(t2 in this.attributes){
            var n = this.attributes[t2], o = this.buffers[n.buffer];
            e.push(o.data), r.push(n.size * Ki[n.type] / 4), n.buffer = 0;
        }
        for(i.data = (function(t, e) {
            for(var r1 = 0, i1 = 0, n = {
            }, o = 0; o < t.length; o++)i1 += e[o], r1 += t[o].length;
            var s = new ArrayBuffer(4 * r1), a = null, h = 0;
            for(o = 0; o < t.length; o++){
                var u = e[o], l = t[o], c = Ge(l);
                n[c] || (n[c] = new qi[c](s)), a = n[c];
                for(var d = 0; d < l.length; d++)a[(d / u | 0) * i1 + h + d % u] = l[d];
                h += u;
            }
            return new Float32Array(s);
        })(e, r), t2 = 0; t2 < this.buffers.length; t2++)this.buffers[t2] !== this.indexBuffer && this.buffers[t2].destroy();
        return this.buffers = [
            i
        ], this.indexBuffer && this.buffers.push(this.indexBuffer), this;
    }, t.prototype.getSize = function() {
        for(var t in this.attributes){
            var e = this.attributes[t];
            return this.buffers[e.buffer].data.length / (e.stride / 4 || e.size);
        }
        return 0;
    }, t.prototype.dispose = function() {
        this.disposeRunner.emit(this, !1);
    }, t.prototype.destroy = function() {
        this.dispose(), this.buffers = null, this.indexBuffer = null, this.attributes = null;
    }, t.prototype.clone = function() {
        for(var e = new t, r = 0; r < this.buffers.length; r++)e.buffers[r] = new zi(this.buffers[r].data.slice(0));
        for(var r in this.attributes){
            var i = this.attributes[r];
            e.attributes[r] = new Vi(i.buffer, i.size, i.normalized, i.type, i.stride, i.start, i.instance);
        }
        return this.indexBuffer && (e.indexBuffer = e.buffers[this.buffers.indexOf(this.indexBuffer)], e.indexBuffer.type = Te.ELEMENT_ARRAY_BUFFER), e;
    }, t.merge = function(e) {
        for(var r, i = new t, n = [], o = [], s = [], a = 0; a < e.length; a++){
            r = e[a];
            for(var h = 0; h < r.buffers.length; h++)o[h] = o[h] || 0, o[h] += r.buffers[h].data.length, s[h] = 0;
        }
        for(a = 0; a < r.buffers.length; a++)n[a] = new Ji[Ge(r.buffers[a].data)](o[a]), i.buffers[a] = new zi(n[a]);
        for(a = 0; a < e.length; a++)for(r = e[a], h = 0; h < r.buffers.length; h++)n[h].set(r.buffers[h].data, s[h]), s[h] += r.buffers[h].data.length;
        if (i.attributes = r.attributes, r.indexBuffer) {
            i.indexBuffer = i.buffers[r.buffers.indexOf(r.indexBuffer)], i.indexBuffer.type = Te.ELEMENT_ARRAY_BUFFER;
            var u = 0, l = 0, c = 0, d = 0;
            for(a = 0; a < r.buffers.length; a++)if (r.buffers[a] !== r.indexBuffer) {
                d = a;
                break;
            }
            for(var a in r.attributes){
                var f = r.attributes[a];
                (0 | f.buffer) === d && (l += f.size * Ki[f.type] / 4);
            }
            for(a = 0; a < e.length; a++){
                var p = e[a].indexBuffer.data;
                for(h = 0; h < p.length; h++)i.indexBuffer.data[h + c] += u;
                u += e[a].buffers[d].data.length / l, c += p.length;
            }
        }
        return i;
    }, t;
}(), $i = function(t) {
    function e() {
        var e1 = t.call(this) || this;
        return e1.addAttribute("aVertexPosition", new Float32Array([
            0,
            0,
            1,
            0,
            1,
            1,
            0,
            1
        ])).addIndex([
            0,
            1,
            3,
            2
        ]), e1;
    }
    return Ei(e, t), e;
}(Qi), tn = function(t) {
    function e() {
        var e1 = t.call(this) || this;
        return e1.vertices = new Float32Array([
            -1,
            -1,
            1,
            -1,
            1,
            1,
            -1,
            1
        ]), e1.uvs = new Float32Array([
            0,
            0,
            1,
            0,
            1,
            1,
            0,
            1
        ]), e1.vertexBuffer = new zi(e1.vertices), e1.uvBuffer = new zi(e1.uvs), e1.addAttribute("aVertexPosition", e1.vertexBuffer).addAttribute("aTextureCoord", e1.uvBuffer).addIndex([
            0,
            1,
            2,
            0,
            2,
            3
        ]), e1;
    }
    return Ei(e, t), e.prototype.map = function(t, e) {
        var r = 0, i = 0;
        return this.uvs[0] = r, this.uvs[1] = i, this.uvs[2] = r + e.width / t.width, this.uvs[3] = i, this.uvs[4] = r + e.width / t.width, this.uvs[5] = i + e.height / t.height, this.uvs[6] = r, this.uvs[7] = i + e.height / t.height, r = e.x, i = e.y, this.vertices[0] = r, this.vertices[1] = i, this.vertices[2] = r + e.width, this.vertices[3] = i, this.vertices[4] = r + e.width, this.vertices[5] = i + e.height, this.vertices[6] = r, this.vertices[7] = i + e.height, this.invalidate(), this;
    }, e.prototype.invalidate = function() {
        return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this;
    }, e;
}(Qi), en = 0, rn = function() {
    function t(t, e, r) {
        this.group = !0, this.syncUniforms = {
        }, this.dirtyId = 0, this.id = en++, this.static = !!e, this.ubo = !!r, t instanceof zi ? (this.buffer = t, this.buffer.type = Te.UNIFORM_BUFFER, this.autoManage = !1, this.ubo = !0) : (this.uniforms = t, this.ubo && (this.buffer = new zi(new Float32Array(1)), this.buffer.type = Te.UNIFORM_BUFFER, this.autoManage = !0));
    }
    return t.prototype.update = function() {
        this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update();
    }, t.prototype.add = function(e, r, i) {
        if (this.ubo) throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
        this.uniforms[e] = new t(r, i);
    }, t.from = function(e, r, i) {
        return new t(e, r, i);
    }, t.uboFrom = function(e, r) {
        return new t(e, null == r || r, !0);
    }, t;
}(), nn = function() {
    function t() {
        this.renderTexture = null, this.target = null, this.legacy = !1, this.resolution = 1, this.multisample = Ee.NONE, this.sourceFrame = new hr, this.destinationFrame = new hr, this.bindingSourceFrame = new hr, this.bindingDestinationFrame = new hr, this.filters = [], this.transform = null;
    }
    return t.prototype.clear = function() {
        this.target = null, this.filters = null, this.renderTexture = null;
    }, t;
}(), on = [
    new fr,
    new fr,
    new fr,
    new fr
], sn = new _r, an = function() {
    function t(t) {
        this.renderer = t, this.defaultFilterStack = [
            {
            }
        ], this.texturePool = new Yi, this.texturePool.setScreenSize(t.view), this.statePool = [], this.quad = new $i, this.quadUv = new tn, this.tempRect = new hr, this.activeState = {
        }, this.globalUniforms = new rn({
            outputFrame: new hr,
            inputSize: new Float32Array(4),
            inputPixel: new Float32Array(4),
            inputClamp: new Float32Array(4),
            resolution: 1,
            filterArea: new Float32Array(4),
            filterClamp: new Float32Array(4)
        }, !0), this.forceClear = !1, this.useMaxPadding = !1;
    }
    return t.prototype.push = function(t, e) {
        for(var r = this.renderer, i = this.defaultFilterStack, n = this.statePool.pop() || new nn, o = this.renderer.renderTexture, s = e[0].resolution, a = e[0].multisample, h = e[0].padding, u = e[0].autoFit, l = e[0].legacy, c = 1; c < e.length; c++){
            var d = e[c];
            s = Math.min(s, d.resolution), a = Math.min(a, d.multisample), h = this.useMaxPadding ? Math.max(h, d.padding) : h + d.padding, u = u && d.autoFit, l = l || d.legacy;
        }
        if (1 === i.length && (this.defaultFilterStack[0].renderTexture = o.current), i.push(n), n.resolution = s, n.multisample = a, n.legacy = l, n.target = t, n.sourceFrame.copyFrom(t.filterArea || t.getBounds(!0)), n.sourceFrame.pad(h), u) {
            var f = this.tempRect.copyFrom(o.sourceFrame);
            r.projection.transform && this.transformAABB(sn.copyFrom(r.projection.transform).invert(), f), n.sourceFrame.fit(f);
        }
        this.roundFrame(n.sourceFrame, o.current ? o.current.resolution : r.resolution, o.sourceFrame, o.destinationFrame, r.projection.transform), n.renderTexture = this.getOptimalFilterTexture(n.sourceFrame.width, n.sourceFrame.height, s, a), n.filters = e, n.destinationFrame.width = n.renderTexture.width, n.destinationFrame.height = n.renderTexture.height;
        var p = this.tempRect;
        p.x = 0, p.y = 0, p.width = n.sourceFrame.width, p.height = n.sourceFrame.height, n.renderTexture.filterFrame = n.sourceFrame, n.bindingSourceFrame.copyFrom(o.sourceFrame), n.bindingDestinationFrame.copyFrom(o.destinationFrame), n.transform = r.projection.transform, r.projection.transform = null, o.bind(n.renderTexture, n.sourceFrame, p), r.framebuffer.clear(0, 0, 0, 0);
    }, t.prototype.pop = function() {
        var t2 = this.defaultFilterStack, e = t2.pop(), r = e.filters;
        this.activeState = e;
        var i = this.globalUniforms.uniforms;
        i.outputFrame = e.sourceFrame, i.resolution = e.resolution;
        var n = i.inputSize, o = i.inputPixel, s = i.inputClamp;
        if (n[0] = e.destinationFrame.width, n[1] = e.destinationFrame.height, n[2] = 1 / n[0], n[3] = 1 / n[1], o[0] = Math.round(n[0] * e.resolution), o[1] = Math.round(n[1] * e.resolution), o[2] = 1 / o[0], o[3] = 1 / o[1], s[0] = 0.5 * o[2], s[1] = 0.5 * o[3], s[2] = e.sourceFrame.width * n[2] - 0.5 * o[2], s[3] = e.sourceFrame.height * n[3] - 0.5 * o[3], e.legacy) {
            var a = i.filterArea;
            a[0] = e.destinationFrame.width, a[1] = e.destinationFrame.height, a[2] = e.sourceFrame.x, a[3] = e.sourceFrame.y, i.filterClamp = i.inputClamp;
        }
        this.globalUniforms.update();
        var h = t2[t2.length - 1];
        if (this.renderer.framebuffer.blit(), 1 === r.length) r[0].apply(this, e.renderTexture, h.renderTexture, me.BLEND, e), this.returnFilterTexture(e.renderTexture);
        else {
            var u = e.renderTexture, l = this.getOptimalFilterTexture(u.width, u.height, e.resolution);
            l.filterFrame = u.filterFrame;
            var c = 0;
            for(c = 0; c < r.length - 1; ++c){
                1 === c && e.multisample > 1 && ((l = this.getOptimalFilterTexture(u.width, u.height, e.resolution)).filterFrame = u.filterFrame), r[c].apply(this, u, l, me.CLEAR, e);
                var d = u;
                u = l, l = d;
            }
            r[c].apply(this, u, h.renderTexture, me.BLEND, e), c > 1 && e.multisample > 1 && this.returnFilterTexture(e.renderTexture), this.returnFilterTexture(u), this.returnFilterTexture(l);
        }
        e.clear(), this.statePool.push(e);
    }, t.prototype.bindAndClear = function(t, e) {
        void 0 === e && (e = me.CLEAR);
        var r = this.renderer, i = r.renderTexture, n = r.state;
        if (t === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, t && t.filterFrame) {
            var o = this.tempRect;
            o.x = 0, o.y = 0, o.width = t.filterFrame.width, o.height = t.filterFrame.height, i.bind(t, t.filterFrame, o);
        } else t !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? i.bind(t) : this.renderer.renderTexture.bind(t, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
        var s = 1 & n.stateId || this.forceClear;
        (e === me.CLEAR || e === me.BLIT && s) && this.renderer.framebuffer.clear(0, 0, 0, 0);
    }, t.prototype.applyFilter = function(t, e, r, i) {
        var n = this.renderer;
        n.state.set(t.state), this.bindAndClear(r, i), t.uniforms.uSampler = e, t.uniforms.filterGlobals = this.globalUniforms, n.shader.bind(t), t.legacy = !!t.program.attributeData.aTextureCoord, t.legacy ? (this.quadUv.map(e._frame, e.filterFrame), n.geometry.bind(this.quadUv), n.geometry.draw(ae.TRIANGLES)) : (n.geometry.bind(this.quad), n.geometry.draw(ae.TRIANGLE_STRIP));
    }, t.prototype.calculateSpriteMatrix = function(t, e) {
        var r = this.activeState, i = r.sourceFrame, n = r.destinationFrame, o = e._texture.orig, s = t.set(n.width, 0, 0, n.height, i.x, i.y), a = e.worldTransform.copyTo(_r.TEMP_MATRIX);
        return a.invert(), s.prepend(a), s.scale(1 / o.width, 1 / o.height), s.translate(e.anchor.x, e.anchor.y), s;
    }, t.prototype.destroy = function() {
        this.renderer = null, this.texturePool.clear(!1);
    }, t.prototype.getOptimalFilterTexture = function(t, e, r, i) {
        return void 0 === r && (r = 1), void 0 === i && (i = Ee.NONE), this.texturePool.getOptimalTexture(t, e, r, i);
    }, t.prototype.getFilterTexture = function(t, e, r) {
        if ("number" == typeof t) {
            var i = t;
            t = e, e = i;
        }
        t = t || this.activeState.renderTexture;
        var n = this.texturePool.getOptimalTexture(t.width, t.height, e || t.resolution, r || Ee.NONE);
        return n.filterFrame = t.filterFrame, n;
    }, t.prototype.returnFilterTexture = function(t) {
        this.texturePool.returnTexture(t);
    }, t.prototype.emptyPool = function() {
        this.texturePool.clear(!0);
    }, t.prototype.resize = function() {
        this.texturePool.setScreenSize(this.renderer.view);
    }, t.prototype.transformAABB = function(t, e) {
        var r = on[0], i = on[1], n = on[2], o = on[3];
        r.set(e.left, e.top), i.set(e.left, e.bottom), n.set(e.right, e.top), o.set(e.right, e.bottom), t.apply(r, r), t.apply(i, i), t.apply(n, n), t.apply(o, o);
        var s = Math.min(r.x, i.x, n.x, o.x), a = Math.min(r.y, i.y, n.y, o.y), h = Math.max(r.x, i.x, n.x, o.x), u = Math.max(r.y, i.y, n.y, o.y);
        e.x = s, e.y = a, e.width = h - s, e.height = u - a;
    }, t.prototype.roundFrame = function(t, e, r, i, n) {
        if (n) {
            var o = n.a, s = n.b, a = n.c, h = n.d;
            if ((Math.abs(s) > 0.0001 || Math.abs(a) > 0.0001) && (Math.abs(o) > 0.0001 || Math.abs(h) > 0.0001)) return;
        }
        (n = n ? sn.copyFrom(n) : sn.identity()).translate(-r.x, -r.y).scale(i.width / r.width, i.height / r.height).translate(i.x, i.y), this.transformAABB(n, t), t.ceil(e), this.transformAABB(n.invert(), t);
    }, t;
}(), hn = function() {
    function t(t) {
        this.renderer = t;
    }
    return t.prototype.flush = function() {
    }, t.prototype.destroy = function() {
        this.renderer = null;
    }, t.prototype.start = function() {
    }, t.prototype.stop = function() {
        this.flush();
    }, t.prototype.render = function(t) {
    }, t;
}(), un = function() {
    function t(t) {
        this.renderer = t, this.emptyRenderer = new hn(t), this.currentRenderer = this.emptyRenderer;
    }
    return t.prototype.setObjectRenderer = function(t) {
        this.currentRenderer !== t && (this.currentRenderer.stop(), this.currentRenderer = t, this.currentRenderer.start());
    }, t.prototype.flush = function() {
        this.setObjectRenderer(this.emptyRenderer);
    }, t.prototype.reset = function() {
        this.setObjectRenderer(this.emptyRenderer);
    }, t.prototype.copyBoundTextures = function(t, e) {
        for(var r = this.renderer.texture.boundTextures, i = e - 1; i >= 0; --i)t[i] = r[i] || null, t[i] && (t[i]._batchLocation = i);
    }, t.prototype.boundArray = function(t, e, r, i) {
        for(var n = t.elements, o = t.ids, s = t.count, a = 0, h = 0; h < s; h++){
            var u = n[h], l = u._batchLocation;
            if (l >= 0 && l < i && e[l] === u) o[h] = l;
            else for(; a < i;){
                var c = e[a];
                if (!c || c._batchEnabled !== r || c._batchLocation !== a) {
                    o[h] = a, u._batchLocation = a, e[a] = u;
                    break;
                }
                a++;
            }
        }
    }, t.prototype.destroy = function() {
        this.renderer = null;
    }, t;
}(), ln = 0, cn = function() {
    function t(t) {
        this.renderer = t, this.webGLVersion = 1, this.extensions = {
        }, this.supports = {
            uint32Indices: !1
        }, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this), t.view.addEventListener("webglcontextlost", this.handleContextLost, !1), t.view.addEventListener("webglcontextrestored", this.handleContextRestored, !1);
    }
    return Object.defineProperty(t.prototype, "isLost", {
        get: function() {
            return !this.gl || this.gl.isContextLost();
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.contextChange = function(t) {
        this.gl = t, this.renderer.gl = t, this.renderer.CONTEXT_UID = ln++, t.isContextLost() && t.getExtension("WEBGL_lose_context") && t.getExtension("WEBGL_lose_context").restoreContext();
    }, t.prototype.initFromContext = function(t) {
        this.gl = t, this.validateContext(t), this.renderer.gl = t, this.renderer.CONTEXT_UID = ln++, this.renderer.runners.contextChange.emit(t);
    }, t.prototype.initFromOptions = function(t) {
        var e = this.createContext(this.renderer.view, t);
        this.initFromContext(e);
    }, t.prototype.createContext = function(t, e) {
        var r;
        if (et.PREFER_ENV >= ie.WEBGL2 && (r = t.getContext("webgl2", e)), r) this.webGLVersion = 2;
        else if (this.webGLVersion = 1, !(r = t.getContext("webgl", e) || t.getContext("experimental-webgl", e))) throw new Error("This browser does not support WebGL. Try using the canvas renderer");
        return this.gl = r, this.getExtensions(), this.gl;
    }, t.prototype.getExtensions = function() {
        var t2 = this.gl, e = {
            anisotropicFiltering: t2.getExtension("EXT_texture_filter_anisotropic"),
            floatTextureLinear: t2.getExtension("OES_texture_float_linear"),
            s3tc: t2.getExtension("WEBGL_compressed_texture_s3tc"),
            s3tc_sRGB: t2.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
            etc: t2.getExtension("WEBGL_compressed_texture_etc"),
            etc1: t2.getExtension("WEBGL_compressed_texture_etc1"),
            pvrtc: t2.getExtension("WEBGL_compressed_texture_pvrtc") || t2.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
            atc: t2.getExtension("WEBGL_compressed_texture_atc"),
            astc: t2.getExtension("WEBGL_compressed_texture_astc")
        };
        1 === this.webGLVersion ? Object.assign(this.extensions, e, {
            drawBuffers: t2.getExtension("WEBGL_draw_buffers"),
            depthTexture: t2.getExtension("WEBGL_depth_texture"),
            loseContext: t2.getExtension("WEBGL_lose_context"),
            vertexArrayObject: t2.getExtension("OES_vertex_array_object") || t2.getExtension("MOZ_OES_vertex_array_object") || t2.getExtension("WEBKIT_OES_vertex_array_object"),
            uint32ElementIndex: t2.getExtension("OES_element_index_uint"),
            floatTexture: t2.getExtension("OES_texture_float"),
            floatTextureLinear: t2.getExtension("OES_texture_float_linear"),
            textureHalfFloat: t2.getExtension("OES_texture_half_float"),
            textureHalfFloatLinear: t2.getExtension("OES_texture_half_float_linear")
        }) : 2 === this.webGLVersion && Object.assign(this.extensions, e, {
            colorBufferFloat: t2.getExtension("EXT_color_buffer_float")
        });
    }, t.prototype.handleContextLost = function(t) {
        t.preventDefault();
    }, t.prototype.handleContextRestored = function() {
        this.renderer.runners.contextChange.emit(this.gl);
    }, t.prototype.destroy = function() {
        var t2 = this.renderer.view;
        this.renderer = null, t2.removeEventListener("webglcontextlost", this.handleContextLost), t2.removeEventListener("webglcontextrestored", this.handleContextRestored), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext();
    }, t.prototype.postrender = function() {
        this.renderer.renderingToScreen && this.gl.flush();
    }, t.prototype.validateContext = function(t) {
        var e = t.getContextAttributes(), r = "WebGL2RenderingContext" in self && t instanceof self.WebGL2RenderingContext;
        r && (this.webGLVersion = 2), e.stencil || console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
        var i = r || !!t.getExtension("OES_element_index_uint");
        this.supports.uint32Indices = i, i || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
    }, t;
}(), dn = function(t) {
    this.framebuffer = t, this.stencil = null, this.dirtyId = -1, this.dirtyFormat = -1, this.dirtySize = -1, this.multisample = Ee.NONE, this.msaaBuffer = null, this.blitFramebuffer = null, this.mipLevel = 0;
}, fn = new hr, pn = function() {
    function t(t) {
        this.renderer = t, this.managedFramebuffers = [], this.unknownFramebuffer = new Ui(10, 10), this.msaaSamples = null;
    }
    return t.prototype.contextChange = function() {
        var t2 = this.gl = this.renderer.gl;
        if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new hr, this.hasMRT = !0, this.writeDepthTexture = !0, this.disposeAll(!0), 1 === this.renderer.context.webGLVersion) {
            var e = this.renderer.context.extensions.drawBuffers, r = this.renderer.context.extensions.depthTexture;
            et.PREFER_ENV === ie.WEBGL_LEGACY && (e = null, r = null), e ? t2.drawBuffers = function(t) {
                return e.drawBuffersWEBGL(t);
            } : (this.hasMRT = !1, t2.drawBuffers = function() {
            }), r || (this.writeDepthTexture = !1);
        } else this.msaaSamples = t2.getInternalformatParameter(t2.RENDERBUFFER, t2.RGBA8, t2.SAMPLES);
    }, t.prototype.bind = function(t, e, r) {
        void 0 === r && (r = 0);
        var i = this.gl;
        if (t) {
            var n = t.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(t);
            this.current !== t && (this.current = t, i.bindFramebuffer(i.FRAMEBUFFER, n.framebuffer)), n.mipLevel !== r && (t.dirtyId++, t.dirtyFormat++, n.mipLevel = r), n.dirtyId !== t.dirtyId && (n.dirtyId = t.dirtyId, n.dirtyFormat !== t.dirtyFormat ? (n.dirtyFormat = t.dirtyFormat, n.dirtySize = t.dirtySize, this.updateFramebuffer(t, r)) : n.dirtySize !== t.dirtySize && (n.dirtySize = t.dirtySize, this.resizeFramebuffer(t)));
            for(var o = 0; o < t.colorTextures.length; o++){
                var s = t.colorTextures[o];
                this.renderer.texture.unbind(s.parentTextureArray || s);
            }
            if (t.depthTexture && this.renderer.texture.unbind(t.depthTexture), e) {
                var a = e.width >> r, h = e.height >> r, u = a / e.width;
                this.setViewport(e.x * u, e.y * u, a, h);
            } else a = t.width >> r, h = t.height >> r, this.setViewport(0, 0, a, h);
        } else this.current && (this.current = null, i.bindFramebuffer(i.FRAMEBUFFER, null)), e ? this.setViewport(e.x, e.y, e.width, e.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height);
    }, t.prototype.setViewport = function(t, e, r, i) {
        var n = this.viewport;
        t = Math.round(t), e = Math.round(e), r = Math.round(r), i = Math.round(i), n.width === r && n.height === i && n.x === t && n.y === e || (n.x = t, n.y = e, n.width = r, n.height = i, this.gl.viewport(t, e, r, i));
    }, Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.current ? {
                x: 0,
                y: 0,
                width: this.current.width,
                height: this.current.height
            } : {
                x: 0,
                y: 0,
                width: this.renderer.width,
                height: this.renderer.height
            };
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.clear = function(t, e, r, i, n) {
        void 0 === n && (n = oe.COLOR | oe.DEPTH);
        var o = this.gl;
        o.clearColor(t, e, r, i), o.clear(n);
    }, t.prototype.initFramebuffer = function(t) {
        var e = this.gl, r = new dn(e.createFramebuffer());
        return r.multisample = this.detectSamples(t.multisample), t.glFramebuffers[this.CONTEXT_UID] = r, this.managedFramebuffers.push(t), t.disposeRunner.add(this), r;
    }, t.prototype.resizeFramebuffer = function(t) {
        var e = this.gl, r = t.glFramebuffers[this.CONTEXT_UID];
        r.msaaBuffer && (e.bindRenderbuffer(e.RENDERBUFFER, r.msaaBuffer), e.renderbufferStorageMultisample(e.RENDERBUFFER, r.multisample, e.RGBA8, t.width, t.height)), r.stencil && (e.bindRenderbuffer(e.RENDERBUFFER, r.stencil), r.msaaBuffer ? e.renderbufferStorageMultisample(e.RENDERBUFFER, r.multisample, e.DEPTH24_STENCIL8, t.width, t.height) : e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, t.width, t.height));
        var i = t.colorTextures, n = i.length;
        e.drawBuffers || (n = Math.min(n, 1));
        for(var o = 0; o < n; o++){
            var s = i[o], a = s.parentTextureArray || s;
            this.renderer.texture.bind(a, 0);
        }
        t.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(t.depthTexture, 0);
    }, t.prototype.updateFramebuffer = function(t, e) {
        var r = this.gl, i = t.glFramebuffers[this.CONTEXT_UID], n = t.colorTextures, o = n.length;
        r.drawBuffers || (o = Math.min(o, 1)), i.multisample > 1 && this.canMultisampleFramebuffer(t) ? (i.msaaBuffer = i.msaaBuffer || r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, i.msaaBuffer), r.renderbufferStorageMultisample(r.RENDERBUFFER, i.multisample, r.RGBA8, t.width, t.height), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.RENDERBUFFER, i.msaaBuffer)) : i.msaaBuffer && (r.deleteRenderbuffer(i.msaaBuffer), i.msaaBuffer = null, i.blitFramebuffer && (i.blitFramebuffer.dispose(), i.blitFramebuffer = null));
        for(var s = [], a1 = 0; a1 < o; a1++){
            var h = n[a1], u = h.parentTextureArray || h;
            this.renderer.texture.bind(u, 0), 0 === a1 && i.msaaBuffer || (r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0 + a1, h.target, u._glTextures[this.CONTEXT_UID].texture, e), s.push(r.COLOR_ATTACHMENT0 + a1));
        }
        if (s.length > 1 && r.drawBuffers(s), t.depthTexture && this.writeDepthTexture) {
            var l = t.depthTexture;
            this.renderer.texture.bind(l, 0), r.framebufferTexture2D(r.FRAMEBUFFER, r.DEPTH_ATTACHMENT, r.TEXTURE_2D, l._glTextures[this.CONTEXT_UID].texture, e);
        }
        !t.stencil && !t.depth || t.depthTexture && this.writeDepthTexture ? i.stencil && (r.deleteRenderbuffer(i.stencil), i.stencil = null) : (i.stencil = i.stencil || r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, i.stencil), i.msaaBuffer ? r.renderbufferStorageMultisample(r.RENDERBUFFER, i.multisample, r.DEPTH24_STENCIL8, t.width, t.height) : r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, t.width, t.height), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_STENCIL_ATTACHMENT, r.RENDERBUFFER, i.stencil));
    }, t.prototype.canMultisampleFramebuffer = function(t) {
        return 1 !== this.renderer.context.webGLVersion && t.colorTextures.length <= 1 && !t.depthTexture;
    }, t.prototype.detectSamples = function(t) {
        var e = this.msaaSamples, r = Ee.NONE;
        if (t <= 1 || null === e) return r;
        for(var i = 0; i < e.length; i++)if (e[i] <= t) {
            r = e[i];
            break;
        }
        return 1 === r && (r = Ee.NONE), r;
    }, t.prototype.blit = function(t, e, r) {
        var i = this.current, n = this.renderer, o = this.gl, s = this.CONTEXT_UID;
        if (2 === n.context.webGLVersion && i) {
            var a = i.glFramebuffers[s];
            if (a) {
                if (!t) {
                    if (!a.msaaBuffer) return;
                    var h = i.colorTextures[0];
                    if (!h) return;
                    a.blitFramebuffer || (a.blitFramebuffer = new Ui(i.width, i.height), a.blitFramebuffer.addColorTexture(0, h)), (t = a.blitFramebuffer).colorTextures[0] !== h && (t.colorTextures[0] = h, t.dirtyId++, t.dirtyFormat++), t.width === i.width && t.height === i.height || (t.width = i.width, t.height = i.height, t.dirtyId++, t.dirtySize++);
                }
                e || ((e = fn).width = i.width, e.height = i.height), r || (r = e);
                var u = e.width === r.width && e.height === r.height;
                this.bind(t), o.bindFramebuffer(o.READ_FRAMEBUFFER, a.framebuffer), o.blitFramebuffer(e.x, e.y, e.width, e.height, r.x, r.y, r.width, r.height, o.COLOR_BUFFER_BIT, u ? o.NEAREST : o.LINEAR);
            }
        }
    }, t.prototype.disposeFramebuffer = function(t, e) {
        var r = t.glFramebuffers[this.CONTEXT_UID], i = this.gl;
        if (r) {
            delete t.glFramebuffers[this.CONTEXT_UID];
            var n = this.managedFramebuffers.indexOf(t);
            n >= 0 && this.managedFramebuffers.splice(n, 1), t.disposeRunner.remove(this), e || (i.deleteFramebuffer(r.framebuffer), r.msaaBuffer && i.deleteRenderbuffer(r.msaaBuffer), r.stencil && i.deleteRenderbuffer(r.stencil)), r.blitFramebuffer && r.blitFramebuffer.dispose();
        }
    }, t.prototype.disposeAll = function(t) {
        var e = this.managedFramebuffers;
        this.managedFramebuffers = [];
        for(var r = 0; r < e.length; r++)this.disposeFramebuffer(e[r], t);
    }, t.prototype.forceStencil = function() {
        var t2 = this.current;
        if (t2) {
            var e = t2.glFramebuffers[this.CONTEXT_UID];
            if (e && !e.stencil) {
                t2.stencil = !0;
                var r = t2.width, i = t2.height, n = this.gl, o = n.createRenderbuffer();
                n.bindRenderbuffer(n.RENDERBUFFER, o), e.msaaBuffer ? n.renderbufferStorageMultisample(n.RENDERBUFFER, e.multisample, n.DEPTH24_STENCIL8, r, i) : n.renderbufferStorage(n.RENDERBUFFER, n.DEPTH_STENCIL, r, i), e.stencil = o, n.framebufferRenderbuffer(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.RENDERBUFFER, o);
            }
        }
    }, t.prototype.reset = function() {
        this.current = this.unknownFramebuffer, this.viewport = new hr;
    }, t.prototype.destroy = function() {
        this.renderer = null;
    }, t;
}(), _n = {
    5126: 4,
    5123: 2,
    5121: 1
}, mn = function() {
    function t(t) {
        this.renderer = t, this._activeGeometry = null, this._activeVao = null, this.hasVao = !0, this.hasInstance = !0, this.canUseUInt32ElementIndex = !1, this.managedGeometries = {
        };
    }
    return t.prototype.contextChange = function() {
        this.disposeAll(!0);
        var t = this.gl = this.renderer.gl, e = this.renderer.context;
        if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, 2 !== e.webGLVersion) {
            var r = this.renderer.context.extensions.vertexArrayObject;
            et.PREFER_ENV === ie.WEBGL_LEGACY && (r = null), r ? (t.createVertexArray = function() {
                return r.createVertexArrayOES();
            }, t.bindVertexArray = function(t) {
                return r.bindVertexArrayOES(t);
            }, t.deleteVertexArray = function(t) {
                return r.deleteVertexArrayOES(t);
            }) : (this.hasVao = !1, t.createVertexArray = function() {
                return null;
            }, t.bindVertexArray = function() {
                return null;
            }, t.deleteVertexArray = function() {
                return null;
            });
        }
        if (2 !== e.webGLVersion) {
            var i = t.getExtension("ANGLE_instanced_arrays");
            i ? (t.vertexAttribDivisor = function(t, e) {
                return i.vertexAttribDivisorANGLE(t, e);
            }, t.drawElementsInstanced = function(t, e, r, n, o) {
                return i.drawElementsInstancedANGLE(t, e, r, n, o);
            }, t.drawArraysInstanced = function(t, e, r, n) {
                return i.drawArraysInstancedANGLE(t, e, r, n);
            }) : this.hasInstance = !1;
        }
        this.canUseUInt32ElementIndex = 2 === e.webGLVersion || !!e.extensions.uint32ElementIndex;
    }, t.prototype.bind = function(t, e) {
        e = e || this.renderer.shader.shader;
        var r = this.gl, i = t.glVertexArrayObjects[this.CONTEXT_UID], n = !1;
        i || (this.managedGeometries[t.id] = t, t.disposeRunner.add(this), t.glVertexArrayObjects[this.CONTEXT_UID] = i = {
        }, n = !0);
        var o = i[e.program.id] || this.initGeometryVao(t, e, n);
        this._activeGeometry = t, this._activeVao !== o && (this._activeVao = o, this.hasVao ? r.bindVertexArray(o) : this.activateVao(t, e.program)), this.updateBuffers();
    }, t.prototype.reset = function() {
        this.unbind();
    }, t.prototype.updateBuffers = function() {
        for(var t2 = this._activeGeometry, e = this.renderer.buffer, r = 0; r < t2.buffers.length; r++){
            var i = t2.buffers[r];
            e.update(i);
        }
    }, t.prototype.checkCompatibility = function(t, e) {
        var r = t.attributes, i = e.attributeData;
        for(var n in i)if (!r[n]) throw new Error('shader and geometry incompatible, geometry missing the "' + n + '" attribute');
    }, t.prototype.getSignature = function(t, e) {
        var r = t.attributes, i = e.attributeData, n = [
            "g",
            t.id
        ];
        for(var o in r)i[o] && n.push(o);
        return n.join("-");
    }, t.prototype.initGeometryVao = function(t, e, r) {
        void 0 === r && (r = !0);
        var i = this.gl, n = this.CONTEXT_UID, o = this.renderer.buffer, s = e.program;
        s.glPrograms[n] || this.renderer.shader.generateProgram(e), this.checkCompatibility(t, s);
        var a = this.getSignature(t, s), h = t.glVertexArrayObjects[this.CONTEXT_UID], u = h[a];
        if (u) return h[s.id] = u, u;
        var l = t.buffers, c = t.attributes, d = {
        }, f = {
        };
        for(var p in l)d[p] = 0, f[p] = 0;
        for(var p in c)!c[p].size && s.attributeData[p] ? c[p].size = s.attributeData[p].size : c[p].size || console.warn("PIXI Geometry attribute '" + p + "' size cannot be determined (likely the bound shader does not have the attribute)"), d[c[p].buffer] += c[p].size * _n[c[p].type];
        for(var p in c){
            var _ = c[p], m = _.size;
            void 0 === _.stride && (d[_.buffer] === m * _n[_.type] ? _.stride = 0 : _.stride = d[_.buffer]), void 0 === _.start && (_.start = f[_.buffer], f[_.buffer] += m * _n[_.type]);
        }
        u = i.createVertexArray(), i.bindVertexArray(u);
        for(var v = 0; v < l.length; v++){
            var y = l[v];
            o.bind(y), r && y._glBuffers[n].refCount++;
        }
        return this.activateVao(t, s), this._activeVao = u, h[s.id] = u, h[a] = u, u;
    }, t.prototype.disposeGeometry = function(t, e) {
        var r;
        if (this.managedGeometries[t.id]) {
            delete this.managedGeometries[t.id];
            var i = t.glVertexArrayObjects[this.CONTEXT_UID], n = this.gl, o = t.buffers, s = null === (r = this.renderer) || void 0 === r ? void 0 : r.buffer;
            if (t.disposeRunner.remove(this), i) {
                if (s) for(var a = 0; a < o.length; a++){
                    var h = o[a]._glBuffers[this.CONTEXT_UID];
                    h && (h.refCount--, 0 !== h.refCount || e || s.dispose(o[a], e));
                }
                if (!e) {
                    for(var u in i)if ("g" === u[0]) {
                        var l = i[u];
                        this._activeVao === l && this.unbind(), n.deleteVertexArray(l);
                    }
                }
                delete t.glVertexArrayObjects[this.CONTEXT_UID];
            }
        }
    }, t.prototype.disposeAll = function(t) {
        for(var e = Object.keys(this.managedGeometries), r = 0; r < e.length; r++)this.disposeGeometry(this.managedGeometries[e[r]], t);
    }, t.prototype.activateVao = function(t, e) {
        var r = this.gl, i = this.CONTEXT_UID, n = this.renderer.buffer, o = t.buffers, s = t.attributes;
        t.indexBuffer && n.bind(t.indexBuffer);
        var a = null;
        for(var h in s){
            var u = s[h], l = o[u.buffer], c = l._glBuffers[i];
            if (e.attributeData[h]) {
                a !== c && (n.bind(l), a = c);
                var d = e.attributeData[h].location;
                if (r.enableVertexAttribArray(d), r.vertexAttribPointer(d, u.size, u.type || r.FLOAT, u.normalized, u.stride, u.start), u.instance) {
                    if (!this.hasInstance) throw new Error("geometry error, GPU Instancing is not supported on this device");
                    r.vertexAttribDivisor(d, 1);
                }
            }
        }
    }, t.prototype.draw = function(t, e, r, i) {
        var n = this.gl, o = this._activeGeometry;
        if (o.indexBuffer) {
            var s = o.indexBuffer.data.BYTES_PER_ELEMENT, a = 2 === s ? n.UNSIGNED_SHORT : n.UNSIGNED_INT;
            2 === s || 4 === s && this.canUseUInt32ElementIndex ? o.instanced ? n.drawElementsInstanced(t, e || o.indexBuffer.data.length, a, (r || 0) * s, i || 1) : n.drawElements(t, e || o.indexBuffer.data.length, a, (r || 0) * s) : console.warn("unsupported index buffer type: uint32");
        } else o.instanced ? n.drawArraysInstanced(t, r, e || o.getSize(), i || 1) : n.drawArrays(t, r, e || o.getSize());
        return this;
    }, t.prototype.unbind = function() {
        this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null;
    }, t.prototype.destroy = function() {
        this.renderer = null;
    }, t;
}(), vn = function() {
    function t(t) {
        void 0 === t && (t = null), this.type = ge.NONE, this.autoDetect = !0, this.maskObject = t || null, this.pooled = !1, this.isMaskData = !0, this.resolution = null, this.multisample = et.FILTER_MULTISAMPLE, this.enabled = !0, this._filters = null, this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null, this._scissorRectLocal = null, this._target = null;
    }
    return Object.defineProperty(t.prototype, "filter", {
        get: function() {
            return this._filters ? this._filters[0] : null;
        },
        set: function(t) {
            t ? this._filters ? this._filters[0] = t : this._filters = [
                t
            ] : this._filters = null;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.reset = function() {
        this.pooled && (this.maskObject = null, this.type = ge.NONE, this.autoDetect = !0), this._target = null, this._scissorRectLocal = null;
    }, t.prototype.copyCountersOrReset = function(t) {
        t ? (this._stencilCounter = t._stencilCounter, this._scissorCounter = t._scissorCounter, this._scissorRect = t._scissorRect) : (this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null);
    }, t;
}();
function yn(t, e, r) {
    var i1 = t.createShader(e);
    return t.shaderSource(i1, r), t.compileShader(i1), i1;
}
function gn(t, e) {
    var r1 = t.getShaderSource(e).split("\n").map(function(t, e) {
        return e + ": " + t;
    }), i1 = t.getShaderInfoLog(e), n1 = i1.split("\n"), o = {
    }, s1 = n1.map(function(t) {
        return parseFloat(t.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"));
    }).filter(function(t) {
        return !(!t || o[t] || (o[t] = !0, 0));
    }), a1 = [
        ""
    ];
    s1.forEach(function(t) {
        r1[t - 1] = "%c" + r1[t - 1] + "%c", a1.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
    });
    var h1 = r1.join("\n");
    a1[0] = h1, console.error(i1), console.groupCollapsed("click to view full shader code"), console.warn.apply(console, a1), console.groupEnd();
}
function En(t) {
    for(var e1 = new Array(t), r1 = 0; r1 < e1.length; r1++)e1[r1] = !1;
    return e1;
}
function Tn(t, e) {
    switch(t){
        case "float":
            return 0;
        case "vec2":
            return new Float32Array(2 * e);
        case "vec3":
            return new Float32Array(3 * e);
        case "vec4":
            return new Float32Array(4 * e);
        case "int":
        case "uint":
        case "sampler2D":
        case "sampler2DArray":
            return 0;
        case "ivec2":
            return new Int32Array(2 * e);
        case "ivec3":
            return new Int32Array(3 * e);
        case "ivec4":
            return new Int32Array(4 * e);
        case "uvec2":
            return new Uint32Array(2 * e);
        case "uvec3":
            return new Uint32Array(3 * e);
        case "uvec4":
            return new Uint32Array(4 * e);
        case "bool":
            return !1;
        case "bvec2":
            return En(2 * e);
        case "bvec3":
            return En(3 * e);
        case "bvec4":
            return En(4 * e);
        case "mat2":
            return new Float32Array([
                1,
                0,
                0,
                1
            ]);
        case "mat3":
            return new Float32Array([
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ]);
        case "mat4":
            return new Float32Array([
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
            ]);
    }
    return null;
}
var bn, xn = {
}, Rn = xn;
function An() {
    if (Rn === xn || Rn && Rn.isContextLost()) {
        var t = document.createElement("canvas"), e = void 0;
        et.PREFER_ENV >= ie.WEBGL2 && (e = t.getContext("webgl2", {
        })), e || ((e = t.getContext("webgl", {
        }) || t.getContext("experimental-webgl", {
        })) ? e.getExtension("WEBGL_draw_buffers") : e = null), Rn = e;
    }
    return Rn;
}
function On(t, e, r) {
    if ("precision" !== t.substring(0, 9)) {
        var i = e;
        return e === ye.HIGH && r !== ye.HIGH && (i = ye.MEDIUM), "precision " + i + " float;\n" + t;
    }
    return r !== ye.HIGH && "precision highp" === t.substring(0, 15) ? t.replace("precision highp", "precision mediump") : t;
}
var Sn = {
    float: 1,
    vec2: 2,
    vec3: 3,
    vec4: 4,
    int: 1,
    ivec2: 2,
    ivec3: 3,
    ivec4: 4,
    uint: 1,
    uvec2: 2,
    uvec3: 3,
    uvec4: 4,
    bool: 1,
    bvec2: 2,
    bvec3: 3,
    bvec4: 4,
    mat2: 4,
    mat3: 9,
    mat4: 16,
    sampler2D: 1
};
function In(t) {
    return Sn[t];
}
var Pn = null, Nn = {
    FLOAT: "float",
    FLOAT_VEC2: "vec2",
    FLOAT_VEC3: "vec3",
    FLOAT_VEC4: "vec4",
    INT: "int",
    INT_VEC2: "ivec2",
    INT_VEC3: "ivec3",
    INT_VEC4: "ivec4",
    UNSIGNED_INT: "uint",
    UNSIGNED_INT_VEC2: "uvec2",
    UNSIGNED_INT_VEC3: "uvec3",
    UNSIGNED_INT_VEC4: "uvec4",
    BOOL: "bool",
    BOOL_VEC2: "bvec2",
    BOOL_VEC3: "bvec3",
    BOOL_VEC4: "bvec4",
    FLOAT_MAT2: "mat2",
    FLOAT_MAT3: "mat3",
    FLOAT_MAT4: "mat4",
    SAMPLER_2D: "sampler2D",
    INT_SAMPLER_2D: "sampler2D",
    UNSIGNED_INT_SAMPLER_2D: "sampler2D",
    SAMPLER_CUBE: "samplerCube",
    INT_SAMPLER_CUBE: "samplerCube",
    UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
    SAMPLER_2D_ARRAY: "sampler2DArray",
    INT_SAMPLER_2D_ARRAY: "sampler2DArray",
    UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
};
function Mn(t, e) {
    if (!Pn) {
        var r = Object.keys(Nn);
        Pn = {
        };
        for(var i = 0; i < r.length; ++i){
            var n = r[i];
            Pn[t[n]] = Nn[n];
        }
    }
    return Pn[e];
}
var Dn, Cn = [
    {
        test: function(t) {
            return "float" === t.type && 1 === t.size;
        },
        code: function(t) {
            return '\n            if(uv["' + t + '"] !== ud["' + t + '"].value)\n            {\n                ud["' + t + '"].value = uv["' + t + '"]\n                gl.uniform1f(ud["' + t + '"].location, uv["' + t + '"])\n            }\n            ';
        }
    },
    {
        test: function(t) {
            return ("sampler2D" === t.type || "samplerCube" === t.type || "sampler2DArray" === t.type) && 1 === t.size && !t.isArray;
        },
        code: function(t) {
            return 't = syncData.textureCount++;\n\n            renderer.texture.bind(uv["' + t + '"], t);\n\n            if(ud["' + t + '"].value !== t)\n            {\n                ud["' + t + '"].value = t;\n                gl.uniform1i(ud["' + t + '"].location, t);\n; // eslint-disable-line max-len\n            }';
        }
    },
    {
        test: function(t, e) {
            return "mat3" === t.type && 1 === t.size && void 0 !== e.a;
        },
        code: function(t) {
            return '\n            gl.uniformMatrix3fv(ud["' + t + '"].location, false, uv["' + t + '"].toArray(true));\n            ';
        },
        codeUbo: function(t) {
            return "\n                var " + t + "_matrix = uv." + t + ".toArray(true);\n\n                data[offset] = " + t + "_matrix[0];\n                data[offset+1] = " + t + "_matrix[1];\n                data[offset+2] = " + t + "_matrix[2];\n        \n                data[offset + 4] = " + t + "_matrix[3];\n                data[offset + 5] = " + t + "_matrix[4];\n                data[offset + 6] = " + t + "_matrix[5];\n        \n                data[offset + 8] = " + t + "_matrix[6];\n                data[offset + 9] = " + t + "_matrix[7];\n                data[offset + 10] = " + t + "_matrix[8];\n            ";
        }
    },
    {
        test: function(t, e) {
            return "vec2" === t.type && 1 === t.size && void 0 !== e.x;
        },
        code: function(t) {
            return '\n                cv = ud["' + t + '"].value;\n                v = uv["' + t + '"];\n\n                if(cv[0] !== v.x || cv[1] !== v.y)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    gl.uniform2f(ud["' + t + '"].location, v.x, v.y);\n                }';
        },
        codeUbo: function(t) {
            return "\n                v = uv." + t + ";\n\n                data[offset] = v.x;\n                data[offset+1] = v.y;\n            ";
        }
    },
    {
        test: function(t) {
            return "vec2" === t.type && 1 === t.size;
        },
        code: function(t) {
            return '\n                cv = ud["' + t + '"].value;\n                v = uv["' + t + '"];\n\n                if(cv[0] !== v[0] || cv[1] !== v[1])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    gl.uniform2f(ud["' + t + '"].location, v[0], v[1]);\n                }\n            ';
        }
    },
    {
        test: function(t, e) {
            return "vec4" === t.type && 1 === t.size && void 0 !== e.width;
        },
        code: function(t) {
            return '\n                cv = ud["' + t + '"].value;\n                v = uv["' + t + '"];\n\n                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    cv[2] = v.width;\n                    cv[3] = v.height;\n                    gl.uniform4f(ud["' + t + '"].location, v.x, v.y, v.width, v.height)\n                }';
        },
        codeUbo: function(t) {
            return "\n                    v = uv." + t + ";\n\n                    data[offset] = v.x;\n                    data[offset+1] = v.y;\n                    data[offset+2] = v.width;\n                    data[offset+3] = v.height;\n                ";
        }
    },
    {
        test: function(t) {
            return "vec4" === t.type && 1 === t.size;
        },
        code: function(t) {
            return '\n                cv = ud["' + t + '"].value;\n                v = uv["' + t + '"];\n\n                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    cv[2] = v[2];\n                    cv[3] = v[3];\n\n                    gl.uniform4f(ud["' + t + '"].location, v[0], v[1], v[2], v[3])\n                }';
        }
    }
], wn = {
    float: "\n    if (cv !== v)\n    {\n        cu.value = v;\n        gl.uniform1f(location, v);\n    }",
    vec2: "\n    if (cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2f(location, v[0], v[1])\n    }",
    vec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3f(location, v[0], v[1], v[2])\n    }",
    vec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4f(location, v[0], v[1], v[2], v[3]);\n    }",
    int: "\n    if (cv !== v)\n    {\n        cu.value = v;\n\n        gl.uniform1i(location, v);\n    }",
    ivec2: "\n    if (cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2i(location, v[0], v[1]);\n    }",
    ivec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3i(location, v[0], v[1], v[2]);\n    }",
    ivec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4i(location, v[0], v[1], v[2], v[3]);\n    }",
    uint: "\n    if (cv !== v)\n    {\n        cu.value = v;\n\n        gl.uniform1ui(location, v);\n    }",
    uvec2: "\n    if (cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2ui(location, v[0], v[1]);\n    }",
    uvec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3ui(location, v[0], v[1], v[2]);\n    }",
    uvec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);\n    }",
    bool: "\n    if (cv !== v)\n    {\n        cu.value = v;\n        gl.uniform1i(location, v);\n    }",
    bvec2: "\n    if (cv[0] != v[0] || cv[1] != v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2i(location, v[0], v[1]);\n    }",
    bvec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3i(location, v[0], v[1], v[2]);\n    }",
    bvec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4i(location, v[0], v[1], v[2], v[3]);\n    }",
    mat2: "gl.uniformMatrix2fv(location, false, v)",
    mat3: "gl.uniformMatrix3fv(location, false, v)",
    mat4: "gl.uniformMatrix4fv(location, false, v)",
    sampler2D: "gl.uniform1i(location, v)",
    samplerCube: "gl.uniform1i(location, v)",
    sampler2DArray: "gl.uniform1i(location, v)"
}, Ln = {
    float: "gl.uniform1fv(location, v)",
    vec2: "gl.uniform2fv(location, v)",
    vec3: "gl.uniform3fv(location, v)",
    vec4: "gl.uniform4fv(location, v)",
    mat4: "gl.uniformMatrix4fv(location, false, v)",
    mat3: "gl.uniformMatrix3fv(location, false, v)",
    mat2: "gl.uniformMatrix2fv(location, false, v)",
    int: "gl.uniform1iv(location, v)",
    ivec2: "gl.uniform2iv(location, v)",
    ivec3: "gl.uniform3iv(location, v)",
    ivec4: "gl.uniform4iv(location, v)",
    uint: "gl.uniform1uiv(location, v)",
    uvec2: "gl.uniform2uiv(location, v)",
    uvec3: "gl.uniform3uiv(location, v)",
    uvec4: "gl.uniform4uiv(location, v)",
    bool: "gl.uniform1iv(location, v)",
    bvec2: "gl.uniform2iv(location, v)",
    bvec3: "gl.uniform3iv(location, v)",
    bvec4: "gl.uniform4iv(location, v)",
    sampler2D: "gl.uniform1iv(location, v)",
    samplerCube: "gl.uniform1iv(location, v)",
    sampler2DArray: "gl.uniform1iv(location, v)"
}, Fn = [
    "precision mediump float;",
    "void main(void){",
    "float test = 0.1;",
    "%forloop%",
    "gl_FragColor = vec4(0.0);",
    "}"
].join("\n");
function Un(t) {
    for(var e1 = "", r1 = 0; r1 < t; ++r1)r1 > 0 && (e1 += "\nelse "), r1 < t - 1 && (e1 += "if(test == " + r1 + ".0){}");
    return e1;
}
function Gn(t, e) {
    if (0 === t) throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
    for(var r = e.createShader(e.FRAGMENT_SHADER);;){
        var i = Fn.replace(/%forloop%/gi, Un(t));
        if (e.shaderSource(r, i), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS)) break;
        t = t / 2 | 0;
    }
    return t;
}
var Bn = 0, Xn = {
}, kn = function() {
    function t(e, r, i) {
        void 0 === i && (i = "pixi-shader"), this.id = Bn++, this.vertexSrc = e || t.defaultVertexSrc, this.fragmentSrc = r || t.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), "#version" !== this.vertexSrc.substring(0, 8) && (i = i.replace(/\s+/g, "-"), Xn[i] ? (Xn[i]++, i += "-" + Xn[i]) : Xn[i] = 1, this.vertexSrc = "#define SHADER_NAME " + i + "\n" + this.vertexSrc, this.fragmentSrc = "#define SHADER_NAME " + i + "\n" + this.fragmentSrc, this.vertexSrc = On(this.vertexSrc, et.PRECISION_VERTEX, ye.HIGH), this.fragmentSrc = On(this.fragmentSrc, et.PRECISION_FRAGMENT, function() {
            if (!bn) {
                bn = ye.MEDIUM;
                var t = An();
                if (t && t.getShaderPrecisionFormat) {
                    var e = t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT);
                    bn = e.precision ? ye.HIGH : ye.MEDIUM;
                }
            }
            return bn;
        }())), this.glPrograms = {
        }, this.syncUniforms = null;
    }
    return Object.defineProperty(t, "defaultVertexSrc", {
        get: function() {
            return "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n}\n";
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t, "defaultFragmentSrc", {
        get: function() {
            return "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor *= texture2D(uSampler, vTextureCoord);\n}";
        },
        enumerable: !1,
        configurable: !0
    }), t.from = function(e, r, i) {
        var n = e + r, o = qe[n];
        return o || (qe[n] = o = new t(e, r, i)), o;
    }, t;
}(), Hn = function() {
    function t(t, e) {
        this.uniformBindCount = 0, this.program = t, this.uniformGroup = e ? e instanceof rn ? e : new rn(e) : new rn({
        });
    }
    return t.prototype.checkUniformExists = function(t, e) {
        if (e.uniforms[t]) return !0;
        for(var r in e.uniforms){
            var i = e.uniforms[r];
            if (i.group && this.checkUniformExists(t, i)) return !0;
        }
        return !1;
    }, t.prototype.destroy = function() {
        this.uniformGroup = null;
    }, Object.defineProperty(t.prototype, "uniforms", {
        get: function() {
            return this.uniformGroup.uniforms;
        },
        enumerable: !1,
        configurable: !0
    }), t.from = function(e, r, i) {
        return new t(kn.from(e, r), i);
    }, t;
}(), jn = function() {
    function t() {
        this.data = 0, this.blendMode = se.NORMAL, this.polygonOffset = 0, this.blend = !0, this.depthMask = !0;
    }
    return Object.defineProperty(t.prototype, "blend", {
        get: function() {
            return !!(1 & this.data);
        },
        set: function(t) {
            !!(1 & this.data) !== t && (this.data ^= 1);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "offsets", {
        get: function() {
            return !!(2 & this.data);
        },
        set: function(t) {
            !!(2 & this.data) !== t && (this.data ^= 2);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "culling", {
        get: function() {
            return !!(4 & this.data);
        },
        set: function(t) {
            !!(4 & this.data) !== t && (this.data ^= 4);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "depthTest", {
        get: function() {
            return !!(8 & this.data);
        },
        set: function(t) {
            !!(8 & this.data) !== t && (this.data ^= 8);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "depthMask", {
        get: function() {
            return !!(32 & this.data);
        },
        set: function(t) {
            !!(32 & this.data) !== t && (this.data ^= 32);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "clockwiseFrontFace", {
        get: function() {
            return !!(16 & this.data);
        },
        set: function(t) {
            !!(16 & this.data) !== t && (this.data ^= 16);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "blendMode", {
        get: function() {
            return this._blendMode;
        },
        set: function(t) {
            this.blend = t !== se.NONE, this._blendMode = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "polygonOffset", {
        get: function() {
            return this._polygonOffset;
        },
        set: function(t) {
            this.offsets = !!t, this._polygonOffset = t;
        },
        enumerable: !1,
        configurable: !0
    }), t.for2d = function() {
        var e = new t;
        return e.depthTest = !1, e.blend = !0, e;
    }, t;
}(), Yn = function(t) {
    function e(r, i, n) {
        var o = this, s = kn.from(r || e.defaultVertexSrc, i || e.defaultFragmentSrc);
        return (o = t.call(this, s, n) || this).padding = 0, o.resolution = et.FILTER_RESOLUTION, o.multisample = et.FILTER_MULTISAMPLE, o.enabled = !0, o.autoFit = !0, o.state = new jn, o;
    }
    return Ei(e, t), e.prototype.apply = function(t, e, r, i, n) {
        t.applyFilter(this, e, r, i);
    }, Object.defineProperty(e.prototype, "blendMode", {
        get: function() {
            return this.state.blendMode;
        },
        set: function(t) {
            this.state.blendMode = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "resolution", {
        get: function() {
            return this._resolution;
        },
        set: function(t) {
            this._resolution = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e, "defaultVertexSrc", {
        get: function() {
            return "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n";
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e, "defaultFragmentSrc", {
        get: function() {
            return "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n";
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(Hn), Vn = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n", Wn = "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform float npmAlpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);\n\n    original *= (alphaMul * masky.r * alpha * clip);\n\n    gl_FragColor = original;\n}\n", zn = new _r, qn = function() {
    function t(t, e) {
        this._texture = t, this.mapCoord = new _r, this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = void 0 === e ? 0.5 : e, this.isSimple = !1;
    }
    return Object.defineProperty(t.prototype, "texture", {
        get: function() {
            return this._texture;
        },
        set: function(t) {
            this._texture = t, this._textureID = -1;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.multiplyUvs = function(t, e) {
        void 0 === e && (e = t);
        for(var r = this.mapCoord, i = 0; i < t.length; i += 2){
            var n = t[i], o = t[i + 1];
            e[i] = n * r.a + o * r.c + r.tx, e[i + 1] = n * r.b + o * r.d + r.ty;
        }
        return e;
    }, t.prototype.update = function(t) {
        var e = this._texture;
        if (!e || !e.valid) return !1;
        if (!t && this._textureID === e._updateID) return !1;
        this._textureID = e._updateID, this._updateID++;
        var r = e._uvs;
        this.mapCoord.set(r.x1 - r.x0, r.y1 - r.y0, r.x3 - r.x0, r.y3 - r.y0, r.x0, r.y0);
        var i = e.orig, n = e.trim;
        n && (zn.set(i.width / n.width, 0, 0, i.height / n.height, -n.x / n.width, -n.y / n.height), this.mapCoord.append(zn));
        var o = e.baseTexture, s = this.uClampFrame, a = this.clampMargin / o.resolution, h = this.clampOffset;
        return s[0] = (e._frame.x + a + h) / o.width, s[1] = (e._frame.y + a + h) / o.height, s[2] = (e._frame.x + e._frame.width - a + h) / o.width, s[3] = (e._frame.y + e._frame.height - a + h) / o.height, this.uClampOffset[0] = h / o.realWidth, this.uClampOffset[1] = h / o.realHeight, this.isSimple = e._frame.width === o.width && e._frame.height === o.height && 0 === e.rotate, !0;
    }, t;
}(), Kn = function(t) {
    function e(e, r, i) {
        var n = this, o = null;
        return "string" != typeof e && void 0 === r && void 0 === i && (o = e, e = void 0, r = void 0, i = void 0), (n = t.call(this, e || Vn, r || Wn, i) || this).maskSprite = o, n.maskMatrix = new _r, n;
    }
    return Ei(e, t), Object.defineProperty(e.prototype, "maskSprite", {
        get: function() {
            return this._maskSprite;
        },
        set: function(t) {
            this._maskSprite = t, this._maskSprite && (this._maskSprite.renderable = !1);
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.apply = function(t, e, r, i) {
        var n = this._maskSprite, o = n._texture;
        o.valid && (o.uvMatrix || (o.uvMatrix = new qn(o, 0)), o.uvMatrix.update(), this.uniforms.npmAlpha = o.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = o, this.uniforms.otherMatrix = t.calculateSpriteMatrix(this.maskMatrix, n).prepend(o.uvMatrix.mapCoord), this.uniforms.alpha = n.worldAlpha, this.uniforms.maskClamp = o.uvMatrix.uClampFrame, t.applyFilter(this, e, r, i));
    }, e;
}(Yn), Zn = function() {
    function t(t) {
        this.renderer = t, this.enableScissor = !0, this.alphaMaskPool = [], this.maskDataPool = [], this.maskStack = [], this.alphaMaskIndex = 0;
    }
    return t.prototype.setMaskStack = function(t) {
        this.maskStack = t, this.renderer.scissor.setMaskStack(t), this.renderer.stencil.setMaskStack(t);
    }, t.prototype.push = function(t, e) {
        var r = e;
        if (!r.isMaskData) {
            var i = this.maskDataPool.pop() || new vn;
            i.pooled = !0, i.maskObject = e, r = i;
        }
        var n = 0 !== this.maskStack.length ? this.maskStack[this.maskStack.length - 1] : null;
        if (r.copyCountersOrReset(n), r.autoDetect && this.detect(r), r._target = t, r.type !== ge.SPRITE && this.maskStack.push(r), r.enabled) switch(r.type){
            case ge.SCISSOR:
                this.renderer.scissor.push(r);
                break;
            case ge.STENCIL:
                this.renderer.stencil.push(r);
                break;
            case ge.SPRITE:
                r.copyCountersOrReset(null), this.pushSpriteMask(r);
        }
        r.type === ge.SPRITE && this.maskStack.push(r);
    }, t.prototype.pop = function(t) {
        var e = this.maskStack.pop();
        if (e && e._target === t) {
            if (e.enabled) switch(e.type){
                case ge.SCISSOR:
                    this.renderer.scissor.pop();
                    break;
                case ge.STENCIL:
                    this.renderer.stencil.pop(e.maskObject);
                    break;
                case ge.SPRITE:
                    this.popSpriteMask(e);
            }
            if (e.reset(), e.pooled && this.maskDataPool.push(e), 0 !== this.maskStack.length) {
                var r = this.maskStack[this.maskStack.length - 1];
                r.type === ge.SPRITE && r._filters && (r._filters[0].maskSprite = r.maskObject);
            }
        }
    }, t.prototype.detect = function(t) {
        t.maskObject.isSprite ? t.type = ge.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(t) ? t.type = ge.SCISSOR : t.type = ge.STENCIL;
    }, t.prototype.pushSpriteMask = function(t) {
        var e, r, i = t.maskObject, n = t._target, o = t._filters;
        o || (o = this.alphaMaskPool[this.alphaMaskIndex]) || (o = this.alphaMaskPool[this.alphaMaskIndex] = [
            new Kn
        ]);
        var s, a, h = this.renderer, u = h.renderTexture;
        if (u.current) {
            var l = u.current;
            s = t.resolution || l.resolution, a = null !== (e = t.multisample) && void 0 !== e ? e : l.multisample;
        } else s = t.resolution || h.resolution, a = null !== (r = t.multisample) && void 0 !== r ? r : h.multisample;
        o[0].resolution = s, o[0].multisample = a, o[0].maskSprite = i;
        var c = n.filterArea;
        n.filterArea = i.getBounds(!0), h.filter.push(n, o), n.filterArea = c, t._filters || this.alphaMaskIndex++;
    }, t.prototype.popSpriteMask = function(t) {
        this.renderer.filter.pop(), t._filters ? t._filters[0].maskSprite = null : (this.alphaMaskIndex--, this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null);
    }, t.prototype.destroy = function() {
        this.renderer = null;
    }, t;
}(), Jn = function() {
    function t(t) {
        this.renderer = t, this.maskStack = [], this.glConst = 0;
    }
    return t.prototype.getStackLength = function() {
        return this.maskStack.length;
    }, t.prototype.setMaskStack = function(t) {
        var e = this.renderer.gl, r = this.getStackLength();
        this.maskStack = t;
        var i = this.getStackLength();
        i !== r && (0 === i ? e.disable(this.glConst) : (e.enable(this.glConst), this._useCurrent()));
    }, t.prototype._useCurrent = function() {
    }, t.prototype.destroy = function() {
        this.renderer = null, this.maskStack = null;
    }, t;
}(), Qn = new _r, $n = function(t) {
    function e(e) {
        var r = t.call(this, e) || this;
        return r.glConst = WebGLRenderingContext.SCISSOR_TEST, r;
    }
    return Ei(e, t), e.prototype.getStackLength = function() {
        var t2 = this.maskStack[this.maskStack.length - 1];
        return t2 ? t2._scissorCounter : 0;
    }, e.prototype.calcScissorRect = function(t) {
        if (!t._scissorRectLocal) {
            var e = t._scissorRect, r = t.maskObject, i = this.renderer, n = i.renderTexture;
            r.renderable = !0;
            var o = r.getBounds();
            this.roundFrameToPixels(o, n.current ? n.current.resolution : i.resolution, n.sourceFrame, n.destinationFrame, i.projection.transform), r.renderable = !1, e && o.fit(e), t._scissorRectLocal = o;
        }
    }, e.isMatrixRotated = function(t) {
        if (!t) return !1;
        var e1 = t.a, r = t.b, i = t.c, n = t.d;
        return (Math.abs(r) > 0.0001 || Math.abs(i) > 0.0001) && (Math.abs(e1) > 0.0001 || Math.abs(n) > 0.0001);
    }, e.prototype.testScissor = function(t) {
        var r = t.maskObject;
        if (!r.isFastRect || !r.isFastRect()) return !1;
        if (e.isMatrixRotated(r.worldTransform)) return !1;
        if (e.isMatrixRotated(this.renderer.projection.transform)) return !1;
        this.calcScissorRect(t);
        var i = t._scissorRectLocal;
        return i.width > 0 && i.height > 0;
    }, e.prototype.roundFrameToPixels = function(t, r, i, n, o) {
        e.isMatrixRotated(o) || ((o = o ? Qn.copyFrom(o) : Qn.identity()).translate(-i.x, -i.y).scale(n.width / i.width, n.height / i.height).translate(n.x, n.y), this.renderer.filter.transformAABB(o, t), t.fit(n), t.x = Math.round(t.x * r), t.y = Math.round(t.y * r), t.width = Math.round(t.width * r), t.height = Math.round(t.height * r));
    }, e.prototype.push = function(t) {
        t._scissorRectLocal || this.calcScissorRect(t);
        var e1 = this.renderer.gl;
        t._scissorRect || e1.enable(e1.SCISSOR_TEST), t._scissorCounter++, t._scissorRect = t._scissorRectLocal, this._useCurrent();
    }, e.prototype.pop = function() {
        var t2 = this.renderer.gl;
        this.getStackLength() > 0 ? this._useCurrent() : t2.disable(t2.SCISSOR_TEST);
    }, e.prototype._useCurrent = function() {
        var t2, e1 = this.maskStack[this.maskStack.length - 1]._scissorRect;
        t2 = this.renderer.renderTexture.current ? e1.y : this.renderer.height - e1.height - e1.y, this.renderer.gl.scissor(e1.x, t2, e1.width, e1.height);
    }, e;
}(Jn), to = function(t) {
    function e(e) {
        var r = t.call(this, e) || this;
        return r.glConst = WebGLRenderingContext.STENCIL_TEST, r;
    }
    return Ei(e, t), e.prototype.getStackLength = function() {
        var t2 = this.maskStack[this.maskStack.length - 1];
        return t2 ? t2._stencilCounter : 0;
    }, e.prototype.push = function(t) {
        var e1 = t.maskObject, r = this.renderer.gl, i = t._stencilCounter;
        0 === i && (this.renderer.framebuffer.forceStencil(), r.enable(r.STENCIL_TEST)), t._stencilCounter++, r.colorMask(!1, !1, !1, !1), r.stencilFunc(r.EQUAL, i, 4294967295), r.stencilOp(r.KEEP, r.KEEP, r.INCR), e1.renderable = !0, e1.render(this.renderer), this.renderer.batch.flush(), e1.renderable = !1, this._useCurrent();
    }, e.prototype.pop = function(t) {
        var e1 = this.renderer.gl;
        0 === this.getStackLength() ? (e1.disable(e1.STENCIL_TEST), e1.clearStencil(0), e1.clear(e1.STENCIL_BUFFER_BIT)) : (e1.colorMask(!1, !1, !1, !1), e1.stencilOp(e1.KEEP, e1.KEEP, e1.DECR), t.renderable = !0, t.render(this.renderer), this.renderer.batch.flush(), t.renderable = !1, this._useCurrent());
    }, e.prototype._useCurrent = function() {
        var t2 = this.renderer.gl;
        t2.colorMask(!0, !0, !0, !0), t2.stencilFunc(t2.EQUAL, this.getStackLength(), 4294967295), t2.stencilOp(t2.KEEP, t2.KEEP, t2.KEEP);
    }, e;
}(Jn), eo = function() {
    function t(t) {
        this.renderer = t, this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new _r, this.transform = null;
    }
    return t.prototype.update = function(t, e, r, i) {
        this.destinationFrame = t || this.destinationFrame || this.defaultFrame, this.sourceFrame = e || this.sourceFrame || t, this.calculateProjection(this.destinationFrame, this.sourceFrame, r, i), this.transform && this.projectionMatrix.append(this.transform);
        var n = this.renderer;
        n.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, n.globalUniforms.update(), n.shader.shader && n.shader.syncUniformGroup(n.shader.shader.uniforms.globals);
    }, t.prototype.calculateProjection = function(t, e, r, i) {
        var n = this.projectionMatrix, o = i ? -1 : 1;
        n.identity(), n.a = 1 / e.width * 2, n.d = o * (1 / e.height * 2), n.tx = -1 - e.x * n.a, n.ty = -o - e.y * n.d;
    }, t.prototype.setTransform = function(t) {
    }, t.prototype.destroy = function() {
        this.renderer = null;
    }, t;
}(), ro = new hr, io = new hr, no = function() {
    function t(t) {
        this.renderer = t, this.clearColor = t._backgroundColorRgba, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new hr, this.destinationFrame = new hr, this.viewportFrame = new hr;
    }
    return t.prototype.bind = function(t, e, r) {
        void 0 === t && (t = null);
        var i, n, o, s = this.renderer;
        this.current = t, t ? (o = (i = t.baseTexture).resolution, e || (ro.width = t.frame.width, ro.height = t.frame.height, e = ro), r || (io.x = t.frame.x, io.y = t.frame.y, io.width = e.width, io.height = e.height, r = io), n = i.framebuffer) : (o = s.resolution, e || (ro.width = s.screen.width, ro.height = s.screen.height, e = ro), r || ((r = ro).width = e.width, r.height = e.height));
        var a = this.viewportFrame;
        a.x = r.x * o, a.y = r.y * o, a.width = r.width * o, a.height = r.height * o, t || (a.y = s.view.height - (a.y + a.height)), a.ceil(), this.renderer.framebuffer.bind(n, a), this.renderer.projection.update(r, e, o, !n), t ? this.renderer.mask.setMaskStack(i.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(e), this.destinationFrame.copyFrom(r);
    }, t.prototype.clear = function(t, e) {
        t = this.current ? t || this.current.baseTexture.clearColor : t || this.clearColor;
        var r = this.destinationFrame, i = this.current ? this.current.baseTexture : this.renderer.screen, n = r.width !== i.width || r.height !== i.height;
        if (n) {
            var o = this.viewportFrame, s = o.x, a = o.y, h = o.width, u = o.height;
            s = Math.round(s), a = Math.round(a), h = Math.round(h), u = Math.round(u), this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(s, a, h, u);
        }
        this.renderer.framebuffer.clear(t[0], t[1], t[2], t[3], e), n && this.renderer.scissor.pop();
    }, t.prototype.resize = function() {
        this.bind(null);
    }, t.prototype.reset = function() {
        this.bind(null);
    }, t.prototype.destroy = function() {
        this.renderer = null;
    }, t;
}();
function oo(t, e, r, i, n) {
    r.buffer.update(n);
}
var so = {
    float: "\n        data[offset] = v;\n    ",
    vec2: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n    ",
    vec3: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n        data[offset+2] = v[2];\n\n    ",
    vec4: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n        data[offset+2] = v[2];\n        data[offset+3] = v[3];\n    ",
    mat2: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n\n        data[offset+4] = v[2];\n        data[offset+5] = v[3];\n    ",
    mat3: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n        data[offset+2] = v[2];\n\n        data[offset + 4] = v[3];\n        data[offset + 5] = v[4];\n        data[offset + 6] = v[5];\n\n        data[offset + 8] = v[6];\n        data[offset + 9] = v[7];\n        data[offset + 10] = v[8];\n    ",
    mat4: "\n        for(var i = 0; i < 16; i++)\n        {\n            data[offset + i] = v[i];\n        }\n    "
}, ao = {
    float: 4,
    vec2: 8,
    vec3: 12,
    vec4: 16,
    int: 4,
    ivec2: 8,
    ivec3: 12,
    ivec4: 16,
    uint: 4,
    uvec2: 8,
    uvec3: 12,
    uvec4: 16,
    bool: 4,
    bvec2: 8,
    bvec3: 12,
    bvec4: 16,
    mat2: 32,
    mat3: 48,
    mat4: 64
};
function ho(t) {
    for(var e1 = t.map(function(t) {
        return {
            data: t,
            offset: 0,
            dataLen: 0,
            dirty: 0
        };
    }), r = 0, i = 0, n1 = 0, o1 = 0; o1 < e1.length; o1++){
        var s = e1[o1];
        if (r = ao[s.data.type], s.data.size > 1 && (r = Math.max(r, 16) * s.data.size), s.dataLen = r, i % r != 0 && i < 16) {
            var a = i % r % 16;
            i += a, n1 += a;
        }
        i + r > 16 ? (n1 = 16 * Math.ceil(n1 / 16), s.offset = n1, n1 += r, i = r) : (s.offset = n1, i += r, n1 += r);
    }
    return {
        uboElements: e1,
        size: n1 = 16 * Math.ceil(n1 / 16)
    };
}
function uo(t, e) {
    var r1 = [];
    for(var i1 in t)e[i1] && r1.push(e[i1]);
    return r1.sort(function(t, e) {
        return t.index - e.index;
    }), r1;
}
function lo(t, e) {
    if (!t.autoManage) return {
        size: 0,
        syncFunc: oo
    };
    for(var r1 = ho(uo(t.uniforms, e)), i1 = r1.uboElements, n1 = r1.size, o1 = [
        "\n    var v = null;\n    var v2 = null;\n    var cv = null;\n    var t = 0;\n    var gl = renderer.gl\n    var index = 0;\n    var data = buffer.data;\n    "
    ], s1 = 0; s1 < i1.length; s1++){
        for(var a = i1[s1], h = t.uniforms[a.data.name], u = a.data.name, l = !1, c = 0; c < Cn.length; c++){
            var d = Cn[c];
            if (d.codeUbo && d.test(a.data, h)) {
                o1.push("offset = " + a.offset / 4 + ";", Cn[c].codeUbo(a.data.name, h)), l = !0;
                break;
            }
        }
        if (!l) if (a.data.size > 1) {
            var f = In(a.data.type), p = Math.max(ao[a.data.type] / 16, 1), _ = f / p, m = (4 - _ % 4) % 4;
            o1.push("\n                cv = ud." + u + ".value;\n                v = uv." + u + ";\n                offset = " + a.offset / 4 + ";\n\n                t = 0;\n\n                for(var i=0; i < " + a.data.size * p + "; i++)\n                {\n                    for(var j = 0; j < " + _ + "; j++)\n                    {\n                        data[offset++] = v[t++];\n                    }\n                    offset += " + m + ";\n                }\n\n                ");
        } else {
            var v = so[a.data.type];
            o1.push("\n                cv = ud." + u + ".value;\n                v = uv." + u + ";\n                offset = " + a.offset / 4 + ";\n                " + v + ";\n                ");
        }
    }
    return o1.push("\n       renderer.buffer.update(buffer);\n    "), {
        size: n1,
        syncFunc: new Function("ud", "uv", "renderer", "syncData", "buffer", o1.join("\n"))
    };
}
var co = function() {
}, fo = function() {
    function t(t, e) {
        this.program = t, this.uniformData = e, this.uniformGroups = {
        }, this.uniformDirtyGroups = {
        }, this.uniformBufferBindings = {
        };
    }
    return t.prototype.destroy = function() {
        this.uniformData = null, this.uniformGroups = null, this.uniformDirtyGroups = null, this.uniformBufferBindings = null, this.program = null;
    }, t;
}();
function po(t, e) {
    var r1 = yn(t, t.VERTEX_SHADER, e.vertexSrc), i1 = yn(t, t.FRAGMENT_SHADER, e.fragmentSrc), n1 = t.createProgram();
    if (t.attachShader(n1, r1), t.attachShader(n1, i1), t.linkProgram(n1), t.getProgramParameter(n1, t.LINK_STATUS) || (function(t, e, r, i) {
        t.getProgramParameter(e, t.LINK_STATUS) || (t.getShaderParameter(r, t.COMPILE_STATUS) || gn(t, r), t.getShaderParameter(i, t.COMPILE_STATUS) || gn(t, i), console.error("PixiJS Error: Could not initialize shader."), "" !== t.getProgramInfoLog(e) && console.warn("PixiJS Warning: gl.getProgramInfoLog()", t.getProgramInfoLog(e)));
    })(t, n1, r1, i1), e.attributeData = (function(t, e) {
        for(var r11 = {
        }, i11 = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), n11 = 0; n11 < i11; n11++){
            var o = e.getActiveAttrib(t, n11);
            if (0 !== o.name.indexOf("gl_")) {
                var s = Mn(e, o.type), a = {
                    type: s,
                    name: o.name,
                    size: In(s),
                    location: e.getAttribLocation(t, o.name)
                };
                r11[o.name] = a;
            }
        }
        return r11;
    })(n1, t), e.uniformData = (function(t, e) {
        for(var r11 = {
        }, i11 = e.getProgramParameter(t, e.ACTIVE_UNIFORMS), n11 = 0; n11 < i11; n11++){
            var o = e.getActiveUniform(t, n11), s = o.name.replace(/\[.*?\]$/, ""), a = !!o.name.match(/\[.*?\]$/), h = Mn(e, o.type);
            r11[s] = {
                name: s,
                index: n11,
                type: h,
                size: o.size,
                isArray: a,
                value: Tn(h, o.size)
            };
        }
        return r11;
    })(n1, t), !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(e.vertexSrc)) {
        var o = Object.keys(e.attributeData);
        o.sort(function(t, e) {
            return t > e ? 1 : -1;
        });
        for(var s = 0; s < o.length; s++)e.attributeData[o[s]].location = s, t.bindAttribLocation(n1, s, o[s]);
        t.linkProgram(n1);
    }
    t.deleteShader(r1), t.deleteShader(i1);
    var a1 = {
    };
    for(var s in e.uniformData){
        var h = e.uniformData[s];
        a1[s] = {
            location: t.getUniformLocation(n1, s),
            value: Tn(h.type, h.size)
        };
    }
    return new fo(n1, a1);
}
var _o = 0, mo = {
    textureCount: 0,
    uboCount: 0
}, vo = function() {
    function t(t) {
        this.destroyed = !1, this.renderer = t, this.systemCheck(), this.gl = null, this.shader = null, this.program = null, this.cache = {
        }, this._uboCache = {
        }, this.id = _o++;
    }
    return t.prototype.systemCheck = function() {
        if (!function() {
            if ("boolean" == typeof Dn) return Dn;
            try {
                var t = new Function("param1", "param2", "param3", "return param1[param2] === param3;");
                Dn = !0 === t({
                    a: "b"
                }, "a", "b");
            } catch (t2) {
                Dn = !1;
            }
            return Dn;
        }()) throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.");
    }, t.prototype.contextChange = function(t) {
        this.gl = t, this.reset();
    }, t.prototype.bind = function(t, e) {
        t.uniforms.globals = this.renderer.globalUniforms;
        var r = t.program, i = r.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(t);
        return this.shader = t, this.program !== r && (this.program = r, this.gl.useProgram(i.program)), e || (mo.textureCount = 0, mo.uboCount = 0, this.syncUniformGroup(t.uniformGroup, mo)), i;
    }, t.prototype.setUniforms = function(t) {
        var e = this.shader.program, r = e.glPrograms[this.renderer.CONTEXT_UID];
        e.syncUniforms(r.uniformData, t, this.renderer);
    }, t.prototype.syncUniformGroup = function(t, e) {
        var r = this.getGlProgram();
        t.static && t.dirtyId === r.uniformDirtyGroups[t.id] || (r.uniformDirtyGroups[t.id] = t.dirtyId, this.syncUniforms(t, r, e));
    }, t.prototype.syncUniforms = function(t, e, r) {
        (t.syncUniforms[this.shader.program.id] || this.createSyncGroups(t))(e.uniformData, t.uniforms, this.renderer, r);
    }, t.prototype.createSyncGroups = function(t) {
        var e = this.getSignature(t, this.shader.program.uniformData, "u");
        return this.cache[e] || (this.cache[e] = (function(t, e) {
            var r, i = [
                "\n        var v = null;\n        var cv = null;\n        var cu = null;\n        var t = 0;\n        var gl = renderer.gl;\n    "
            ];
            for(var n in t.uniforms){
                var o = e[n];
                if (o) {
                    for(var s = t.uniforms[n], a = !1, h = 0; h < Cn.length; h++)if (Cn[h].test(o, s)) {
                        i.push(Cn[h].code(n, s)), a = !0;
                        break;
                    }
                    if (!a) {
                        var u = (1 === o.size ? wn : Ln)[o.type].replace("location", 'ud["' + n + '"].location');
                        i.push('\n            cu = ud["' + n + '"];\n            cv = cu.value;\n            v = uv["' + n + '"];\n            ' + u + ";");
                    }
                } else (null === (r = t.uniforms[n]) || void 0 === r ? void 0 : r.group) && (t.uniforms[n].ubo ? i.push("\n                        renderer.shader.syncUniformBufferGroup(uv." + n + ", '" + n + "');\n                    ") : i.push("\n                        renderer.shader.syncUniformGroup(uv." + n + ", syncData);\n                    "));
            }
            return new Function("ud", "uv", "renderer", "syncData", i.join("\n"));
        })(t, this.shader.program.uniformData)), t.syncUniforms[this.shader.program.id] = this.cache[e], t.syncUniforms[this.shader.program.id];
    }, t.prototype.syncUniformBufferGroup = function(t, e) {
        var r = this.getGlProgram();
        if (!t.static || 0 !== t.dirtyId || !r.uniformGroups[t.id]) {
            t.dirtyId = 0;
            var i = r.uniformGroups[t.id] || this.createSyncBufferGroup(t, r, e);
            t.buffer.update(), i(r.uniformData, t.uniforms, this.renderer, mo, t.buffer);
        }
        this.renderer.buffer.bindBufferBase(t.buffer, r.uniformBufferBindings[e]);
    }, t.prototype.createSyncBufferGroup = function(t, e, r) {
        var i = this.renderer.gl;
        this.renderer.buffer.bind(t.buffer);
        var n = this.gl.getUniformBlockIndex(e.program, r);
        e.uniformBufferBindings[r] = this.shader.uniformBindCount, i.uniformBlockBinding(e.program, n, this.shader.uniformBindCount), this.shader.uniformBindCount++;
        var o = this.getSignature(t, this.shader.program.uniformData, "ubo"), s = this._uboCache[o];
        if (s || (s = this._uboCache[o] = lo(t, this.shader.program.uniformData)), t.autoManage) {
            var a = new Float32Array(s.size / 4);
            t.buffer.update(a);
        }
        return e.uniformGroups[t.id] = s.syncFunc, e.uniformGroups[t.id];
    }, t.prototype.getSignature = function(t, e, r) {
        var i = t.uniforms, n = [
            r + "-"
        ];
        for(var o in i)n.push(o), e[o] && n.push(e[o].type);
        return n.join("-");
    }, t.prototype.getGlProgram = function() {
        return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null;
    }, t.prototype.generateProgram = function(t) {
        var e = this.gl, r = t.program, i = po(e, r);
        return r.glPrograms[this.renderer.CONTEXT_UID] = i, i;
    }, t.prototype.reset = function() {
        this.program = null, this.shader = null;
    }, t.prototype.destroy = function() {
        this.renderer = null, this.destroyed = !0;
    }, t;
}(), yo = 0, go = 1, Eo = 2, To = 3, bo = 4, xo = 5, Ro = function() {
    function t() {
        this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = se.NONE, this._blendEq = !1, this.map = [], this.map[yo] = this.setBlend, this.map[go] = this.setOffset, this.map[Eo] = this.setCullFace, this.map[To] = this.setDepthTest, this.map[bo] = this.setFrontFace, this.map[xo] = this.setDepthMask, this.checks = [], this.defaultState = new jn, this.defaultState.blend = !0;
    }
    return t.prototype.contextChange = function(t) {
        this.gl = t, this.blendModes = (function(t, e) {
            return void 0 === e && (e = []), e[se.NORMAL] = [
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.ADD] = [
                t.ONE,
                t.ONE
            ], e[se.MULTIPLY] = [
                t.DST_COLOR,
                t.ONE_MINUS_SRC_ALPHA,
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.SCREEN] = [
                t.ONE,
                t.ONE_MINUS_SRC_COLOR,
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.OVERLAY] = [
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.DARKEN] = [
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.LIGHTEN] = [
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.COLOR_DODGE] = [
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.COLOR_BURN] = [
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.HARD_LIGHT] = [
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.SOFT_LIGHT] = [
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.DIFFERENCE] = [
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.EXCLUSION] = [
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.HUE] = [
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.SATURATION] = [
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.COLOR] = [
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.LUMINOSITY] = [
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.NONE] = [
                0,
                0
            ], e[se.NORMAL_NPM] = [
                t.SRC_ALPHA,
                t.ONE_MINUS_SRC_ALPHA,
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.ADD_NPM] = [
                t.SRC_ALPHA,
                t.ONE,
                t.ONE,
                t.ONE
            ], e[se.SCREEN_NPM] = [
                t.SRC_ALPHA,
                t.ONE_MINUS_SRC_COLOR,
                t.ONE,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.SRC_IN] = [
                t.DST_ALPHA,
                t.ZERO
            ], e[se.SRC_OUT] = [
                t.ONE_MINUS_DST_ALPHA,
                t.ZERO
            ], e[se.SRC_ATOP] = [
                t.DST_ALPHA,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.DST_OVER] = [
                t.ONE_MINUS_DST_ALPHA,
                t.ONE
            ], e[se.DST_IN] = [
                t.ZERO,
                t.SRC_ALPHA
            ], e[se.DST_OUT] = [
                t.ZERO,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.DST_ATOP] = [
                t.ONE_MINUS_DST_ALPHA,
                t.SRC_ALPHA
            ], e[se.XOR] = [
                t.ONE_MINUS_DST_ALPHA,
                t.ONE_MINUS_SRC_ALPHA
            ], e[se.SUBTRACT] = [
                t.ONE,
                t.ONE,
                t.ONE,
                t.ONE,
                t.FUNC_REVERSE_SUBTRACT,
                t.FUNC_ADD
            ], e;
        })(t), this.set(this.defaultState), this.reset();
    }, t.prototype.set = function(t) {
        if (t = t || this.defaultState, this.stateId !== t.data) {
            for(var e = this.stateId ^ t.data, r = 0; e;)1 & e && this.map[r].call(this, !!(t.data & 1 << r)), e >>= 1, r++;
            this.stateId = t.data;
        }
        for(r = 0; r < this.checks.length; r++)this.checks[r](this, t);
    }, t.prototype.forceState = function(t) {
        t = t || this.defaultState;
        for(var e = 0; e < this.map.length; e++)this.map[e].call(this, !!(t.data & 1 << e));
        for(e = 0; e < this.checks.length; e++)this.checks[e](this, t);
        this.stateId = t.data;
    }, t.prototype.setBlend = function(e) {
        this.updateCheck(t.checkBlendMode, e), this.gl[e ? "enable" : "disable"](this.gl.BLEND);
    }, t.prototype.setOffset = function(e) {
        this.updateCheck(t.checkPolygonOffset, e), this.gl[e ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
    }, t.prototype.setDepthTest = function(t) {
        this.gl[t ? "enable" : "disable"](this.gl.DEPTH_TEST);
    }, t.prototype.setDepthMask = function(t) {
        this.gl.depthMask(t);
    }, t.prototype.setCullFace = function(t) {
        this.gl[t ? "enable" : "disable"](this.gl.CULL_FACE);
    }, t.prototype.setFrontFace = function(t) {
        this.gl.frontFace(this.gl[t ? "CW" : "CCW"]);
    }, t.prototype.setBlendMode = function(t) {
        if (t !== this.blendMode) {
            this.blendMode = t;
            var e = this.blendModes[t], r = this.gl;
            2 === e.length ? r.blendFunc(e[0], e[1]) : r.blendFuncSeparate(e[0], e[1], e[2], e[3]), 6 === e.length ? (this._blendEq = !0, r.blendEquationSeparate(e[4], e[5])) : this._blendEq && (this._blendEq = !1, r.blendEquationSeparate(r.FUNC_ADD, r.FUNC_ADD));
        }
    }, t.prototype.setPolygonOffset = function(t, e) {
        this.gl.polygonOffset(t, e);
    }, t.prototype.reset = function() {
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.forceState(this.defaultState), this._blendEq = !0, this.blendMode = -1, this.setBlendMode(0);
    }, t.prototype.updateCheck = function(t, e) {
        var r1 = this.checks.indexOf(t);
        e && -1 === r1 ? this.checks.push(t) : e || -1 === r1 || this.checks.splice(r1, 1);
    }, t.checkBlendMode = function(t, e) {
        t.setBlendMode(e.blendMode);
    }, t.checkPolygonOffset = function(t, e) {
        t.setPolygonOffset(1, e.polygonOffset);
    }, t.prototype.destroy = function() {
        this.gl = null;
    }, t;
}(), Ao = function() {
    function t(t) {
        this.renderer = t, this.count = 0, this.checkCount = 0, this.maxIdle = et.GC_MAX_IDLE, this.checkCountMax = et.GC_MAX_CHECK_COUNT, this.mode = et.GC_MODE;
    }
    return t.prototype.postrender = function() {
        this.renderer.renderingToScreen && (this.count++, this.mode !== ve.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())));
    }, t.prototype.run = function() {
        for(var t2 = this.renderer.texture, e = t2.managedTextures, r = !1, i = 0; i < e.length; i++){
            var n = e[i];
            !n.framebuffer && this.count - n.touched > this.maxIdle && (t2.destroyTexture(n, !0), e[i] = null, r = !0);
        }
        if (r) {
            var o = 0;
            for(i = 0; i < e.length; i++)null !== e[i] && (e[o++] = e[i]);
            e.length = o;
        }
    }, t.prototype.unload = function(t) {
        var e = this.renderer.texture, r = t._texture;
        r && !r.framebuffer && e.destroyTexture(r);
        for(var i = t.children.length - 1; i >= 0; i--)this.unload(t.children[i]);
    }, t.prototype.destroy = function() {
        this.renderer = null;
    }, t;
}(), Oo = function(t) {
    this.texture = t, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = !1, this.wrapMode = 33071, this.type = le.UNSIGNED_BYTE, this.internalFormat = he.RGBA, this.samplerType = 0;
}, So = function() {
    function t(t) {
        this.renderer = t, this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = !1, this.unknownTexture = new Ai, this.hasIntegerTextures = !1;
    }
    return t.prototype.contextChange = function() {
        var t2 = this.gl = this.renderer.gl;
        this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion, this.internalFormats = (function(t) {
            var e, r, i, n, o, s, a, h, u, l, c, d, f, p, _, m, v, y, g, E, T, b, x;
            return "WebGL2RenderingContext" in self && t instanceof self.WebGL2RenderingContext ? ((e = {
            })[le.UNSIGNED_BYTE] = ((r = {
            })[he.RGBA] = t.RGBA8, r[he.RGB] = t.RGB8, r[he.RG] = t.RG8, r[he.RED] = t.R8, r[he.RGBA_INTEGER] = t.RGBA8UI, r[he.RGB_INTEGER] = t.RGB8UI, r[he.RG_INTEGER] = t.RG8UI, r[he.RED_INTEGER] = t.R8UI, r[he.ALPHA] = t.ALPHA, r[he.LUMINANCE] = t.LUMINANCE, r[he.LUMINANCE_ALPHA] = t.LUMINANCE_ALPHA, r), e[le.BYTE] = ((i = {
            })[he.RGBA] = t.RGBA8_SNORM, i[he.RGB] = t.RGB8_SNORM, i[he.RG] = t.RG8_SNORM, i[he.RED] = t.R8_SNORM, i[he.RGBA_INTEGER] = t.RGBA8I, i[he.RGB_INTEGER] = t.RGB8I, i[he.RG_INTEGER] = t.RG8I, i[he.RED_INTEGER] = t.R8I, i), e[le.UNSIGNED_SHORT] = ((n = {
            })[he.RGBA_INTEGER] = t.RGBA16UI, n[he.RGB_INTEGER] = t.RGB16UI, n[he.RG_INTEGER] = t.RG16UI, n[he.RED_INTEGER] = t.R16UI, n[he.DEPTH_COMPONENT] = t.DEPTH_COMPONENT16, n), e[le.SHORT] = ((o = {
            })[he.RGBA_INTEGER] = t.RGBA16I, o[he.RGB_INTEGER] = t.RGB16I, o[he.RG_INTEGER] = t.RG16I, o[he.RED_INTEGER] = t.R16I, o), e[le.UNSIGNED_INT] = ((s = {
            })[he.RGBA_INTEGER] = t.RGBA32UI, s[he.RGB_INTEGER] = t.RGB32UI, s[he.RG_INTEGER] = t.RG32UI, s[he.RED_INTEGER] = t.R32UI, s[he.DEPTH_COMPONENT] = t.DEPTH_COMPONENT24, s), e[le.INT] = ((a = {
            })[he.RGBA_INTEGER] = t.RGBA32I, a[he.RGB_INTEGER] = t.RGB32I, a[he.RG_INTEGER] = t.RG32I, a[he.RED_INTEGER] = t.R32I, a), e[le.FLOAT] = ((h = {
            })[he.RGBA] = t.RGBA32F, h[he.RGB] = t.RGB32F, h[he.RG] = t.RG32F, h[he.RED] = t.R32F, h[he.DEPTH_COMPONENT] = t.DEPTH_COMPONENT32F, h), e[le.HALF_FLOAT] = ((u = {
            })[he.RGBA] = t.RGBA16F, u[he.RGB] = t.RGB16F, u[he.RG] = t.RG16F, u[he.RED] = t.R16F, u), e[le.UNSIGNED_SHORT_5_6_5] = ((l = {
            })[he.RGB] = t.RGB565, l), e[le.UNSIGNED_SHORT_4_4_4_4] = ((c = {
            })[he.RGBA] = t.RGBA4, c), e[le.UNSIGNED_SHORT_5_5_5_1] = ((d = {
            })[he.RGBA] = t.RGB5_A1, d), e[le.UNSIGNED_INT_2_10_10_10_REV] = ((f = {
            })[he.RGBA] = t.RGB10_A2, f[he.RGBA_INTEGER] = t.RGB10_A2UI, f), e[le.UNSIGNED_INT_10F_11F_11F_REV] = ((p = {
            })[he.RGB] = t.R11F_G11F_B10F, p), e[le.UNSIGNED_INT_5_9_9_9_REV] = ((_ = {
            })[he.RGB] = t.RGB9_E5, _), e[le.UNSIGNED_INT_24_8] = ((m = {
            })[he.DEPTH_STENCIL] = t.DEPTH24_STENCIL8, m), e[le.FLOAT_32_UNSIGNED_INT_24_8_REV] = ((v = {
            })[he.DEPTH_STENCIL] = t.DEPTH32F_STENCIL8, v), x = e) : ((y = {
            })[le.UNSIGNED_BYTE] = ((g = {
            })[he.RGBA] = t.RGBA, g[he.RGB] = t.RGB, g[he.ALPHA] = t.ALPHA, g[he.LUMINANCE] = t.LUMINANCE, g[he.LUMINANCE_ALPHA] = t.LUMINANCE_ALPHA, g), y[le.UNSIGNED_SHORT_5_6_5] = ((E = {
            })[he.RGB] = t.RGB, E), y[le.UNSIGNED_SHORT_4_4_4_4] = ((T = {
            })[he.RGBA] = t.RGBA, T), y[le.UNSIGNED_SHORT_5_5_5_1] = ((b = {
            })[he.RGBA] = t.RGBA, b), x = y), x;
        })(t2);
        var e = t2.getParameter(t2.MAX_TEXTURE_IMAGE_UNITS);
        this.boundTextures.length = e;
        for(var r = 0; r < e; r++)this.boundTextures[r] = null;
        this.emptyTextures = {
        };
        var i = new Oo(t2.createTexture());
        for(t2.bindTexture(t2.TEXTURE_2D, i.texture), t2.texImage2D(t2.TEXTURE_2D, 0, t2.RGBA, 1, 1, 0, t2.RGBA, t2.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[t2.TEXTURE_2D] = i, this.emptyTextures[t2.TEXTURE_CUBE_MAP] = new Oo(t2.createTexture()), t2.bindTexture(t2.TEXTURE_CUBE_MAP, this.emptyTextures[t2.TEXTURE_CUBE_MAP].texture), r = 0; r < 6; r++)t2.texImage2D(t2.TEXTURE_CUBE_MAP_POSITIVE_X + r, 0, t2.RGBA, 1, 1, 0, t2.RGBA, t2.UNSIGNED_BYTE, null);
        for(t2.texParameteri(t2.TEXTURE_CUBE_MAP, t2.TEXTURE_MAG_FILTER, t2.LINEAR), t2.texParameteri(t2.TEXTURE_CUBE_MAP, t2.TEXTURE_MIN_FILTER, t2.LINEAR), r = 0; r < this.boundTextures.length; r++)this.bind(null, r);
    }, t.prototype.bind = function(t, e) {
        void 0 === e && (e = 0);
        var r = this.gl;
        if ((t = null == t ? void 0 : t.castToBaseTexture()) && t.valid && !t.parentTextureArray) {
            t.touched = this.renderer.textureGC.count;
            var i = t._glTextures[this.CONTEXT_UID] || this.initTexture(t);
            this.boundTextures[e] !== t && (this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), r.bindTexture(t.target, i.texture)), i.dirtyId !== t.dirtyId && (this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), this.updateTexture(t)), this.boundTextures[e] = t;
        } else this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), r.bindTexture(r.TEXTURE_2D, this.emptyTextures[r.TEXTURE_2D].texture), this.boundTextures[e] = null;
    }, t.prototype.reset = function() {
        this._unknownBoundTextures = !0, this.hasIntegerTextures = !1, this.currentLocation = -1;
        for(var t2 = 0; t2 < this.boundTextures.length; t2++)this.boundTextures[t2] = this.unknownTexture;
    }, t.prototype.unbind = function(t) {
        var e = this.gl, r = this.boundTextures;
        if (this._unknownBoundTextures) {
            this._unknownBoundTextures = !1;
            for(var i = 0; i < r.length; i++)r[i] === this.unknownTexture && this.bind(null, i);
        }
        for(i = 0; i < r.length; i++)r[i] === t && (this.currentLocation !== i && (e.activeTexture(e.TEXTURE0 + i), this.currentLocation = i), e.bindTexture(t.target, this.emptyTextures[t.target].texture), r[i] = null);
    }, t.prototype.ensureSamplerType = function(t) {
        var e = this.boundTextures, r = this.hasIntegerTextures, i = this.CONTEXT_UID;
        if (r) for(var n = t - 1; n >= 0; --n){
            var o = e[n];
            o && o._glTextures[i].samplerType !== ce.FLOAT && this.renderer.texture.unbind(o);
        }
    }, t.prototype.initTexture = function(t) {
        var e = new Oo(this.gl.createTexture());
        return e.dirtyId = -1, t._glTextures[this.CONTEXT_UID] = e, this.managedTextures.push(t), t.on("dispose", this.destroyTexture, this), e;
    }, t.prototype.initTextureType = function(t, e) {
        var r, i1;
        e.internalFormat = null !== (i1 = null === (r = this.internalFormats[t.type]) || void 0 === r ? void 0 : r[t.format]) && void 0 !== i1 ? i1 : t.format, 2 === this.webGLVersion && t.type === le.HALF_FLOAT ? e.type = this.gl.HALF_FLOAT : e.type = t.type;
    }, t.prototype.updateTexture = function(t) {
        var e = t._glTextures[this.CONTEXT_UID];
        if (e) {
            var r = this.renderer;
            if (this.initTextureType(t, e), t.resource && t.resource.upload(r, t, e)) e.samplerType !== ce.FLOAT && (this.hasIntegerTextures = !0);
            else {
                var i = t.realWidth, n = t.realHeight, o = r.gl;
                (e.width !== i || e.height !== n || e.dirtyId < 0) && (e.width = i, e.height = n, o.texImage2D(t.target, 0, e.internalFormat, i, n, 0, t.format, e.type, null));
            }
            t.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(t), e.dirtyId = t.dirtyId;
        }
    }, t.prototype.destroyTexture = function(t, e) {
        var r = this.gl;
        if ((t = t.castToBaseTexture())._glTextures[this.CONTEXT_UID] && (this.unbind(t), r.deleteTexture(t._glTextures[this.CONTEXT_UID].texture), t.off("dispose", this.destroyTexture, this), delete t._glTextures[this.CONTEXT_UID], !e)) {
            var i = this.managedTextures.indexOf(t);
            -1 !== i && je(this.managedTextures, i, 1);
        }
    }, t.prototype.updateTextureStyle = function(t) {
        var e = t._glTextures[this.CONTEXT_UID];
        e && (t.mipmap !== pe.POW2 && 2 === this.webGLVersion || t.isPowerOfTwo ? e.mipmap = t.mipmap >= 1 : e.mipmap = !1, 2 === this.webGLVersion || t.isPowerOfTwo ? e.wrapMode = t.wrapMode : e.wrapMode = fe.CLAMP, t.resource && t.resource.style(this.renderer, t, e) || this.setStyle(t, e), e.dirtyStyleId = t.dirtyStyleId);
    }, t.prototype.setStyle = function(t, e) {
        var r = this.gl;
        if (e.mipmap && t.mipmap !== pe.ON_MANUAL && r.generateMipmap(t.target), r.texParameteri(t.target, r.TEXTURE_WRAP_S, e.wrapMode), r.texParameteri(t.target, r.TEXTURE_WRAP_T, e.wrapMode), e.mipmap) {
            r.texParameteri(t.target, r.TEXTURE_MIN_FILTER, t.scaleMode === de.LINEAR ? r.LINEAR_MIPMAP_LINEAR : r.NEAREST_MIPMAP_NEAREST);
            var i = this.renderer.context.extensions.anisotropicFiltering;
            if (i && t.anisotropicLevel > 0 && t.scaleMode === de.LINEAR) {
                var n = Math.min(t.anisotropicLevel, r.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
                r.texParameterf(t.target, i.TEXTURE_MAX_ANISOTROPY_EXT, n);
            }
        } else r.texParameteri(t.target, r.TEXTURE_MIN_FILTER, t.scaleMode === de.LINEAR ? r.LINEAR : r.NEAREST);
        r.texParameteri(t.target, r.TEXTURE_MAG_FILTER, t.scaleMode === de.LINEAR ? r.LINEAR : r.NEAREST);
    }, t.prototype.destroy = function() {
        this.renderer = null;
    }, t;
}(), Io = {
    __proto__: null,
    FilterSystem: an,
    BatchSystem: un,
    ContextSystem: cn,
    FramebufferSystem: pn,
    GeometrySystem: mn,
    MaskSystem: Zn,
    ScissorSystem: $n,
    StencilSystem: to,
    ProjectionSystem: eo,
    RenderTextureSystem: no,
    ShaderSystem: vo,
    StateSystem: Ro,
    TextureGCSystem: Ao,
    TextureSystem: So
}, Po = new _r, No = function(t) {
    function e(e, r) {
        void 0 === e && (e = ne.UNKNOWN);
        var i = t.call(this) || this;
        return r = Object.assign({
        }, et.RENDER_OPTIONS, r), i.options = r, i.type = e, i.screen = new hr(0, 0, r.width, r.height), i.view = r.view || document.createElement("canvas"), i.resolution = r.resolution || et.RESOLUTION, i.useContextAlpha = r.useContextAlpha, i.autoDensity = !!r.autoDensity, i.preserveDrawingBuffer = r.preserveDrawingBuffer, i.clearBeforeRender = r.clearBeforeRender, i._backgroundColor = 0, i._backgroundColorRgba = [
            0,
            0,
            0,
            1
        ], i._backgroundColorString = "#000000", i.backgroundColor = r.backgroundColor || i._backgroundColor, i.backgroundAlpha = r.backgroundAlpha, void 0 !== r.transparent && (i.useContextAlpha = r.transparent, i.backgroundAlpha = r.transparent ? 0 : 1), i._lastObjectRendered = null, i.plugins = {
        }, i;
    }
    return Ei(e, t), e.prototype.initPlugins = function(t) {
        for(var e1 in t)this.plugins[e1] = new t[e1](this);
    }, Object.defineProperty(e.prototype, "width", {
        get: function() {
            return this.view.width;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
        get: function() {
            return this.view.height;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.resize = function(t, e) {
        this.view.width = Math.round(t * this.resolution), this.view.height = Math.round(e * this.resolution);
        var r = this.view.width / this.resolution, i = this.view.height / this.resolution;
        this.screen.width = r, this.screen.height = i, this.autoDensity && (this.view.style.width = r + "px", this.view.style.height = i + "px"), this.emit("resize", r, i);
    }, e.prototype.generateTexture = function(t, e, r, i) {
        void 0 === e && (e = {
        }), "number" == typeof e && (e = {
            scaleMode: e,
            resolution: r,
            region: i
        });
        var n = e.region, o = function(t, e) {
            var r1 = {
            };
            for(var i1 in t)Object.prototype.hasOwnProperty.call(t, i1) && e.indexOf(i1) < 0 && (r1[i1] = t[i1]);
            if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                var n = 0;
                for(i1 = Object.getOwnPropertySymbols(t); n < i1.length; n++)e.indexOf(i1[n]) < 0 && (r1[i1[n]] = t[i1[n]]);
            }
            return r1;
        }(e, [
            "region"
        ]);
        0 === (i = n || t.getLocalBounds(null, !0)).width && (i.width = 1), 0 === i.height && (i.height = 1);
        var s = ji.create(Ti({
            width: i.width,
            height: i.height
        }, o));
        return Po.tx = -i.x, Po.ty = -i.y, this.render(t, {
            renderTexture: s,
            clear: !1,
            transform: Po,
            skipUpdateTransform: !!t.parent
        }), s;
    }, e.prototype.destroy = function(t) {
        for(var e1 in this.plugins)this.plugins[e1].destroy(), this.plugins[e1] = null;
        t && this.view.parentNode && this.view.parentNode.removeChild(this.view), this.plugins = null, this.type = ne.UNKNOWN, this.view = null, this.screen = null, this._tempDisplayObjectParent = null, this.options = null, this._backgroundColorRgba = null, this._backgroundColorString = null, this._lastObjectRendered = null;
    }, Object.defineProperty(e.prototype, "backgroundColor", {
        get: function() {
            return this._backgroundColor;
        },
        set: function(t) {
            this._backgroundColor = t, this._backgroundColorString = Ne(t), Pe(t, this._backgroundColorRgba);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "backgroundAlpha", {
        get: function() {
            return this._backgroundColorRgba[3];
        },
        set: function(t) {
            this._backgroundColorRgba[3] = t;
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(nt), Mo = function(t) {
    this.buffer = t || null, this.updateID = -1, this.byteLength = -1, this.refCount = 0;
}, Do = function() {
    function t(t) {
        this.renderer = t, this.managedBuffers = {
        }, this.boundBufferBases = {
        };
    }
    return t.prototype.destroy = function() {
        this.renderer = null;
    }, t.prototype.contextChange = function() {
        this.disposeAll(!0), this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
    }, t.prototype.bind = function(t) {
        var e = this.gl, r = this.CONTEXT_UID, i = t._glBuffers[r] || this.createGLBuffer(t);
        e.bindBuffer(t.type, i.buffer);
    }, t.prototype.bindBufferBase = function(t, e) {
        var r = this.gl, i = this.CONTEXT_UID;
        if (this.boundBufferBases[e] !== t) {
            var n = t._glBuffers[i] || this.createGLBuffer(t);
            this.boundBufferBases[e] = t, r.bindBufferBase(r.UNIFORM_BUFFER, e, n.buffer);
        }
    }, t.prototype.bindBufferRange = function(t, e, r) {
        var i = this.gl, n = this.CONTEXT_UID;
        r = r || 0;
        var o = t._glBuffers[n] || this.createGLBuffer(t);
        i.bindBufferRange(i.UNIFORM_BUFFER, e || 0, o.buffer, 256 * r, 256);
    }, t.prototype.update = function(t) {
        var e = this.gl, r = this.CONTEXT_UID, i = t._glBuffers[r];
        if (t._updateID !== i.updateID) if (i.updateID = t._updateID, e.bindBuffer(t.type, i.buffer), i.byteLength >= t.data.byteLength) e.bufferSubData(t.type, 0, t.data);
        else {
            var n = t.static ? e.STATIC_DRAW : e.DYNAMIC_DRAW;
            i.byteLength = t.data.byteLength, e.bufferData(t.type, t.data, n);
        }
    }, t.prototype.dispose = function(t, e) {
        if (this.managedBuffers[t.id]) {
            delete this.managedBuffers[t.id];
            var r = t._glBuffers[this.CONTEXT_UID], i = this.gl;
            t.disposeRunner.remove(this), r && (e || i.deleteBuffer(r.buffer), delete t._glBuffers[this.CONTEXT_UID]);
        }
    }, t.prototype.disposeAll = function(t) {
        for(var e = Object.keys(this.managedBuffers), r = 0; r < e.length; r++)this.dispose(this.managedBuffers[e[r]], t);
    }, t.prototype.createGLBuffer = function(t) {
        var e = this.CONTEXT_UID, r = this.gl;
        return t._glBuffers[e] = new Mo(r.createBuffer()), this.managedBuffers[t.id] = t, t.disposeRunner.add(this), t._glBuffers[e];
    }, t;
}(), Co = function(t) {
    function e(r) {
        var i = t.call(this, ne.WEBGL, r) || this;
        return r = i.options, i.gl = null, i.CONTEXT_UID = 0, i.runners = {
            destroy: new mi("destroy"),
            contextChange: new mi("contextChange"),
            reset: new mi("reset"),
            update: new mi("update"),
            postrender: new mi("postrender"),
            prerender: new mi("prerender"),
            resize: new mi("resize")
        }, i.runners.contextChange.add(i), i.globalUniforms = new rn({
            projectionMatrix: new _r
        }, !0), i.addSystem(Zn, "mask").addSystem(cn, "context").addSystem(Ro, "state").addSystem(vo, "shader").addSystem(So, "texture").addSystem(Do, "buffer").addSystem(mn, "geometry").addSystem(pn, "framebuffer").addSystem($n, "scissor").addSystem(to, "stencil").addSystem(eo, "projection").addSystem(Ao, "textureGC").addSystem(an, "filter").addSystem(no, "renderTexture").addSystem(un, "batch"), i.initPlugins(e.__plugins), i.multisample = void 0, r.context ? i.context.initFromContext(r.context) : i.context.initFromOptions({
            alpha: !!i.useContextAlpha,
            antialias: r.antialias,
            premultipliedAlpha: i.useContextAlpha && "notMultiplied" !== i.useContextAlpha,
            stencil: !0,
            preserveDrawingBuffer: r.preserveDrawingBuffer,
            powerPreference: i.options.powerPreference
        }), i.renderingToScreen = !0, Oe(2 === i.context.webGLVersion ? "WebGL 2" : "WebGL 1"), i.resize(i.options.width, i.options.height), i;
    }
    return Ei(e, t), e.create = function(t) {
        if (Se()) return new e(t);
        throw new Error('WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.');
    }, e.prototype.contextChange = function() {
        var t2, e1 = this.gl;
        if (1 === this.context.webGLVersion) {
            var r = e1.getParameter(e1.FRAMEBUFFER_BINDING);
            e1.bindFramebuffer(e1.FRAMEBUFFER, null), t2 = e1.getParameter(e1.SAMPLES), e1.bindFramebuffer(e1.FRAMEBUFFER, r);
        } else r = e1.getParameter(e1.DRAW_FRAMEBUFFER_BINDING), e1.bindFramebuffer(e1.DRAW_FRAMEBUFFER, null), t2 = e1.getParameter(e1.SAMPLES), e1.bindFramebuffer(e1.DRAW_FRAMEBUFFER, r);
        t2 >= Ee.HIGH ? this.multisample = Ee.HIGH : t2 >= Ee.MEDIUM ? this.multisample = Ee.MEDIUM : t2 >= Ee.LOW ? this.multisample = Ee.LOW : this.multisample = Ee.NONE;
    }, e.prototype.addSystem = function(t, e) {
        var r1 = new t(this);
        if (this[e]) throw new Error('Whoops! The name "' + e + '" is already in use');
        for(var i in this[e] = r1, this.runners)this.runners[i].add(r1);
        return this;
    }, e.prototype.render = function(t, e) {
        var r1, i, n, o;
        if (e && (e instanceof ji ? (r1 = e, i = arguments[2], n = arguments[3], o = arguments[4]) : (r1 = e.renderTexture, i = e.clear, n = e.transform, o = e.skipUpdateTransform)), this.renderingToScreen = !r1, this.runners.prerender.emit(), this.emit("prerender"), this.projection.transform = n, !this.context.isLost) {
            if (r1 || (this._lastObjectRendered = t), !o) {
                var s = t.enableTempParent();
                t.updateTransform(), t.disableTempParent(s);
            }
            this.renderTexture.bind(r1), this.batch.currentRenderer.start(), (void 0 !== i ? i : this.clearBeforeRender) && this.renderTexture.clear(), t.render(this), this.batch.currentRenderer.flush(), r1 && r1.baseTexture.update(), this.runners.postrender.emit(), this.projection.transform = null, this.emit("postrender");
        }
    }, e.prototype.generateTexture = function(e, r, i, n) {
        void 0 === r && (r = {
        });
        var o = t.prototype.generateTexture.call(this, e, r, i, n);
        return this.framebuffer.blit(), o;
    }, e.prototype.resize = function(e, r) {
        t.prototype.resize.call(this, e, r), this.runners.resize.emit(this.screen.height, this.screen.width);
    }, e.prototype.reset = function() {
        return this.runners.reset.emit(), this;
    }, e.prototype.clear = function() {
        this.renderTexture.bind(), this.renderTexture.clear();
    }, e.prototype.destroy = function(e) {
        for(var r1 in this.runners.destroy.emit(), this.runners)this.runners[r1].destroy();
        t.prototype.destroy.call(this, e), this.gl = null;
    }, Object.defineProperty(e.prototype, "extract", {
        get: function() {
            return this.plugins.extract;
        },
        enumerable: !1,
        configurable: !0
    }), e.registerPlugin = function(t, r) {
        e.__plugins = e.__plugins || {
        }, e.__plugins[t] = r;
    }, e;
}(No);
function wo(t) {
    return Co.create(t);
}
var Lo = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", Fo = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n", Uo = function() {
    function t(t) {
        this.renderer = t;
    }
    return t.prototype.destroy = function() {
        this.renderer = null;
    }, t;
}(), Go = function() {
    this.texArray = null, this.blend = 0, this.type = ae.TRIANGLES, this.start = 0, this.size = 0, this.data = null;
}, Bo = function() {
    function t() {
        this.elements = [], this.ids = [], this.count = 0;
    }
    return t.prototype.clear = function() {
        for(var t2 = 0; t2 < this.count; t2++)this.elements[t2] = null;
        this.count = 0;
    }, t;
}(), Xo = function() {
    function t(t) {
        "number" == typeof t ? this.rawBinaryData = new ArrayBuffer(t) : t instanceof Uint8Array ? this.rawBinaryData = t.buffer : this.rawBinaryData = t, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData);
    }
    return Object.defineProperty(t.prototype, "int8View", {
        get: function() {
            return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "uint8View", {
        get: function() {
            return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "int16View", {
        get: function() {
            return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "uint16View", {
        get: function() {
            return this._uint16View || (this._uint16View = new Uint16Array(this.rawBinaryData)), this._uint16View;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "int32View", {
        get: function() {
            return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.view = function(t) {
        return this[t + "View"];
    }, t.prototype.destroy = function() {
        this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this._uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null;
    }, t.sizeOf = function(t) {
        switch(t){
            case "int8":
            case "uint8":
                return 1;
            case "int16":
            case "uint16":
                return 2;
            case "int32":
            case "uint32":
            case "float32":
                return 4;
            default:
                throw new Error(t + " isn't a valid view type");
        }
    }, t;
}(), ko = function(t) {
    function e(e) {
        var r = t.call(this, e) || this;
        return r.shaderGenerator = null, r.geometryClass = null, r.vertexSize = null, r.state = jn.for2d(), r.size = 4 * et.SPRITE_BATCH_SIZE, r._vertexCount = 0, r._indexCount = 0, r._bufferedElements = [], r._bufferedTextures = [], r._bufferSize = 0, r._shader = null, r._packedGeometries = [], r._packedGeometryPoolSize = 2, r._flushId = 0, r._aBuffers = {
        }, r._iBuffers = {
        }, r.MAX_TEXTURES = 1, r.renderer.on("prerender", r.onPrerender, r), e.runners.contextChange.add(r), r._dcIndex = 0, r._aIndex = 0, r._iIndex = 0, r._attributeBuffer = null, r._indexBuffer = null, r._tempBoundTextures = [], r;
    }
    return Ei(e, t), e.prototype.contextChange = function() {
        var t2 = this.renderer.gl;
        et.PREFER_ENV === ie.WEBGL_LEGACY ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(t2.getParameter(t2.MAX_TEXTURE_IMAGE_UNITS), et.SPRITE_MAX_TEXTURES), this.MAX_TEXTURES = Gn(this.MAX_TEXTURES, t2)), this._shader = this.shaderGenerator.generateShader(this.MAX_TEXTURES);
        for(var e1 = 0; e1 < this._packedGeometryPoolSize; e1++)this._packedGeometries[e1] = new this.geometryClass;
        this.initFlushBuffers();
    }, e.prototype.initFlushBuffers = function() {
        for(var t2 = e._drawCallPool, r = e._textureArrayPool, i = this.size / 4, n = Math.floor(i / this.MAX_TEXTURES) + 1; t2.length < i;)t2.push(new Go);
        for(; r.length < n;)r.push(new Bo);
        for(var o = 0; o < this.MAX_TEXTURES; o++)this._tempBoundTextures[o] = null;
    }, e.prototype.onPrerender = function() {
        this._flushId = 0;
    }, e.prototype.render = function(t) {
        t._texture.valid && (this._vertexCount + t.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += t.vertexData.length / 2, this._indexCount += t.indices.length, this._bufferedTextures[this._bufferSize] = t._texture.baseTexture, this._bufferedElements[this._bufferSize++] = t);
    }, e.prototype.buildTexturesAndDrawCalls = function() {
        var t = this._bufferedTextures, r = this.MAX_TEXTURES, i = e._textureArrayPool, n = this.renderer.batch, o = this._tempBoundTextures, s = this.renderer.textureGC.count, a = ++Ai._globalBatch, h = 0, u = i[0], l = 0;
        n.copyBoundTextures(o, r);
        for(var c = 0; c < this._bufferSize; ++c){
            var d = t[c];
            t[c] = null, d._batchEnabled !== a && (u.count >= r && (n.boundArray(u, o, a, r), this.buildDrawCalls(u, l, c), l = c, u = i[++h], ++a), d._batchEnabled = a, d.touched = s, u.elements[u.count++] = d);
        }
        for(u.count > 0 && (n.boundArray(u, o, a, r), this.buildDrawCalls(u, l, this._bufferSize), ++h, ++a), c = 0; c < o.length; c++)o[c] = null;
        Ai._globalBatch = a;
    }, e.prototype.buildDrawCalls = function(t, r, i) {
        var n = this._bufferedElements, o = this._attributeBuffer, s = this._indexBuffer, a = this.vertexSize, h = e._drawCallPool, u = this._dcIndex, l = this._aIndex, c = this._iIndex, d = h[u];
        d.start = this._iIndex, d.texArray = t;
        for(var f = r; f < i; ++f){
            var p = n[f], _ = p._texture.baseTexture, m = De[_.alphaMode ? 1 : 0][p.blendMode];
            n[f] = null, r < f && d.blend !== m && (d.size = c - d.start, r = f, (d = h[++u]).texArray = t, d.start = c), this.packInterleavedGeometry(p, o, s, l, c), l += p.vertexData.length / 2 * a, c += p.indices.length, d.blend = m;
        }
        r < i && (d.size = c - d.start, ++u), this._dcIndex = u, this._aIndex = l, this._iIndex = c;
    }, e.prototype.bindAndClearTexArray = function(t) {
        for(var e1 = this.renderer.texture, r = 0; r < t.count; r++)e1.bind(t.elements[r], t.ids[r]), t.elements[r] = null;
        t.count = 0;
    }, e.prototype.updateGeometry = function() {
        var t2 = this._packedGeometries, e1 = this._attributeBuffer, r = this._indexBuffer;
        et.CAN_UPLOAD_SAME_BUFFER ? (t2[this._flushId]._buffer.update(e1.rawBinaryData), t2[this._flushId]._indexBuffer.update(r), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, t2[this._flushId] = new this.geometryClass), t2[this._flushId]._buffer.update(e1.rawBinaryData), t2[this._flushId]._indexBuffer.update(r), this.renderer.geometry.bind(t2[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++);
    }, e.prototype.drawBatches = function() {
        for(var t2 = this._dcIndex, r = this.renderer, i = r.gl, n = r.state, o = e._drawCallPool, s = null, a = 0; a < t2; a++){
            var h = o[a], u = h.texArray, l = h.type, c = h.size, d = h.start, f = h.blend;
            s !== u && (s = u, this.bindAndClearTexArray(u)), this.state.blendMode = f, n.set(this.state), i.drawElements(l, c, i.UNSIGNED_SHORT, 2 * d);
        }
    }, e.prototype.flush = function() {
        0 !== this._vertexCount && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount), this._indexBuffer = this.getIndexBuffer(this._indexCount), this._aIndex = 0, this._iIndex = 0, this._dcIndex = 0, this.buildTexturesAndDrawCalls(), this.updateGeometry(), this.drawBatches(), this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0);
    }, e.prototype.start = function() {
        this.renderer.state.set(this.state), this.renderer.texture.ensureSamplerType(this.MAX_TEXTURES), this.renderer.shader.bind(this._shader), et.CAN_UPLOAD_SAME_BUFFER && this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
    }, e.prototype.stop = function() {
        this.flush();
    }, e.prototype.destroy = function() {
        for(var e1 = 0; e1 < this._packedGeometryPoolSize; e1++)this._packedGeometries[e1] && this._packedGeometries[e1].destroy();
        this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._attributeBuffer = null, this._indexBuffer = null, this._shader && (this._shader.destroy(), this._shader = null), t.prototype.destroy.call(this);
    }, e.prototype.getAttributeBuffer = function(t) {
        var e1 = Xe(Math.ceil(t / 8)), r = He(e1), i = 8 * e1;
        this._aBuffers.length <= r && (this._iBuffers.length = r + 1);
        var n = this._aBuffers[i];
        return n || (this._aBuffers[i] = n = new Xo(i * this.vertexSize * 4)), n;
    }, e.prototype.getIndexBuffer = function(t) {
        var e1 = Xe(Math.ceil(t / 12)), r = He(e1), i = 12 * e1;
        this._iBuffers.length <= r && (this._iBuffers.length = r + 1);
        var n = this._iBuffers[r];
        return n || (this._iBuffers[r] = n = new Uint16Array(i)), n;
    }, e.prototype.packInterleavedGeometry = function(t, e, r, i, n) {
        for(var o = e.uint32View, s = e.float32View, a = i / this.vertexSize, h = t.uvs, u = t.indices, l = t.vertexData, c = t._texture.baseTexture._batchLocation, d = Math.min(t.worldAlpha, 1), f = d < 1 && t._texture.baseTexture.alphaMode ? Le(t._tintRGB, d) : t._tintRGB + (255 * d << 24), p = 0; p < l.length; p += 2)s[i++] = l[p], s[i++] = l[p + 1], s[i++] = h[p], s[i++] = h[p + 1], o[i++] = f, s[i++] = c;
        for(p = 0; p < u.length; p++)r[n++] = a + u[p];
    }, e._drawCallPool = [], e._textureArrayPool = [], e;
}(hn), Ho = function() {
    function t(t, e) {
        if (this.vertexSrc = t, this.fragTemplate = e, this.programCache = {
        }, this.defaultGroupCache = {
        }, e.indexOf("%count%") < 0) throw new Error('Fragment template must contain "%count%".');
        if (e.indexOf("%forloop%") < 0) throw new Error('Fragment template must contain "%forloop%".');
    }
    return t.prototype.generateShader = function(t) {
        if (!this.programCache[t]) {
            for(var e = new Int32Array(t), r = 0; r < t; r++)e[r] = r;
            this.defaultGroupCache[t] = rn.from({
                uSamplers: e
            }, !0);
            var i = this.fragTemplate;
            i = (i = i.replace(/%count%/gi, "" + t)).replace(/%forloop%/gi, this.generateSampleSrc(t)), this.programCache[t] = new kn(this.vertexSrc, i);
        }
        var n = {
            tint: new Float32Array([
                1,
                1,
                1,
                1
            ]),
            translationMatrix: new _r,
            default: this.defaultGroupCache[t]
        };
        return new Hn(this.programCache[t], n);
    }, t.prototype.generateSampleSrc = function(t) {
        var e = "";
        e += "\n", e += "\n";
        for(var r = 0; r < t; r++)r > 0 && (e += "\nelse "), r < t - 1 && (e += "if(vTextureId < " + r + ".5)"), e += "\n{", e += "\n\tcolor = texture2D(uSamplers[" + r + "], vTextureCoord);", e += "\n}";
        return (e += "\n") + "\n";
    }, t;
}(), jo = function(t) {
    function e(e) {
        void 0 === e && (e = !1);
        var r = t.call(this) || this;
        return r._buffer = new zi(null, e, !1), r._indexBuffer = new zi(null, e, !0), r.addAttribute("aVertexPosition", r._buffer, 2, !1, le.FLOAT).addAttribute("aTextureCoord", r._buffer, 2, !1, le.FLOAT).addAttribute("aColor", r._buffer, 4, !0, le.UNSIGNED_BYTE).addAttribute("aTextureId", r._buffer, 1, !0, le.FLOAT).addIndex(r._indexBuffer), r;
    }
    return Ei(e, t), e;
}(Qi), Yo = "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform vec4 tint;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor * tint;\n}\n", Vo = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = color * vColor;\n}\n", Wo = function() {
    function t() {
    }
    return t.create = function(t) {
        var e = Object.assign({
            vertex: Yo,
            fragment: Vo,
            geometryClass: jo,
            vertexSize: 6
        }, t), r = e.vertex, i = e.fragment, n = e.vertexSize, o = e.geometryClass;
        return (function(t) {
            function e(e) {
                var s = t.call(this, e) || this;
                return s.shaderGenerator = new Ho(r, i), s.geometryClass = o, s.vertexSize = n, s;
            }
            return Ei(e, t), e;
        })(ko);
    }, Object.defineProperty(t, "defaultVertexSrc", {
        get: function() {
            return Yo;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t, "defaultFragmentTemplate", {
        get: function() {
            return Vo;
        },
        enumerable: !1,
        configurable: !0
    }), t;
}(), zo = Wo.create(), qo = {
}, Ko = function(t) {
    Object.defineProperty(qo, t, {
        get: function() {
            return Li[t];
        }
    });
};
for(var Zo in Li)Ko(Zo);
var Jo = {
}, Qo = function(t) {
    Object.defineProperty(Jo, t, {
        get: function() {
            return Io[t];
        }
    });
};
for(var Zo in Io)Qo(Zo);
var $o = function() {
    function t(e) {
        var r = this;
        this.stage = new Zr, e = Object.assign({
            forceCanvas: !1
        }, e), this.renderer = wo(e), t._plugins.forEach(function(t) {
            t.init.call(r, e);
        });
    }
    return t.registerPlugin = function(e) {
        t._plugins.push(e);
    }, t.prototype.render = function() {
        this.renderer.render(this.stage);
    }, Object.defineProperty(t.prototype, "view", {
        get: function() {
            return this.renderer.view;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "screen", {
        get: function() {
            return this.renderer.screen;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.destroy = function(e, r) {
        var i = this, n = t._plugins.slice(0);
        n.reverse(), n.forEach(function(t) {
            t.destroy.call(i);
        }), this.stage.destroy(r), this.stage = null, this.renderer.destroy(e), this.renderer = null;
    }, t._plugins = [], t;
}(), ts = function() {
    function t() {
    }
    return t.init = function(t) {
        var e = this;
        Object.defineProperty(this, "resizeTo", {
            set: function(t) {
                self.removeEventListener("resize", this.queueResize), this._resizeTo = t, t && (self.addEventListener("resize", this.queueResize), this.resize());
            },
            get: function() {
                return this._resizeTo;
            }
        }), this.queueResize = function() {
            e._resizeTo && (e.cancelResize(), e._resizeId = requestAnimationFrame(function() {
                return e.resize();
            }));
        }, this.cancelResize = function() {
            e._resizeId && (cancelAnimationFrame(e._resizeId), e._resizeId = null);
        }, this.resize = function() {
            if (e._resizeTo) {
                var t, r;
                if (e.cancelResize(), e._resizeTo === self) t = self.innerWidth, r = self.innerHeight;
                else {
                    var i = e._resizeTo;
                    t = i.clientWidth, r = i.clientHeight;
                }
                e.renderer.resize(t, r);
            }
        }, this._resizeId = null, this._resizeTo = null, this.resizeTo = t.resizeTo || null;
    }, t.destroy = function() {
        self.removeEventListener("resize", this.queueResize), this.cancelResize(), this.cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null;
    }, t;
}();
$o.registerPlugin(ts);
var es = new hr, rs = function() {
    function t(t) {
        this.renderer = t;
    }
    return t.prototype.image = function(t, e, r) {
        var i = new Image;
        return i.src = this.base64(t, e, r), i;
    }, t.prototype.base64 = function(t, e, r) {
        return this.canvas(t).toDataURL(e, r);
    }, t.prototype.canvas = function(e) {
        var r, i, n, o = this.renderer, s = !1, a = !1;
        e && (e instanceof ji ? n = e : (n = this.renderer.generateTexture(e), a = !0)), n ? (r = n.baseTexture.resolution, i = n.frame, s = !1, o.renderTexture.bind(n)) : (r = this.renderer.resolution, s = !0, (i = es).width = this.renderer.width, i.height = this.renderer.height, o.renderTexture.bind(null));
        var h = Math.floor(i.width * r + 0.0001), u = Math.floor(i.height * r + 0.0001), l = new Je(h, u, 1), c = new Uint8Array(4 * h * u), d = o.gl;
        d.readPixels(i.x * r, i.y * r, h, u, d.RGBA, d.UNSIGNED_BYTE, c);
        var f = l.context.getImageData(0, 0, h, u);
        if (t.arrayPostDivide(c, f.data), l.context.putImageData(f, 0, 0), s) {
            var p = new Je(l.width, l.height, 1);
            p.context.scale(1, -1), p.context.drawImage(l.canvas, 0, -u), l.destroy(), l = p;
        }
        return a && n.destroy(!0), l.canvas;
    }, t.prototype.pixels = function(e) {
        var r, i, n, o = this.renderer, s = !1;
        e && (e instanceof ji ? n = e : (n = this.renderer.generateTexture(e), s = !0)), n ? (r = n.baseTexture.resolution, i = n.frame, o.renderTexture.bind(n)) : (r = o.resolution, (i = es).width = o.width, i.height = o.height, o.renderTexture.bind(null));
        var a = i.width * r, h = i.height * r, u = new Uint8Array(4 * a * h), l = o.gl;
        return l.readPixels(i.x * r, i.y * r, a, h, l.RGBA, l.UNSIGNED_BYTE, u), s && n.destroy(!0), t.arrayPostDivide(u, u), u;
    }, t.prototype.destroy = function() {
        this.renderer = null;
    }, t.arrayPostDivide = function(t, e) {
        for(var r = 0; r < t.length; r += 4){
            var i = e[r + 3] = t[r + 3];
            0 !== i ? (e[r] = Math.round(Math.min(255 * t[r] / i, 255)), e[r + 1] = Math.round(Math.min(255 * t[r + 1] / i, 255)), e[r + 2] = Math.round(Math.min(255 * t[r + 2] / i, 255))) : (e[r] = t[r], e[r + 1] = t[r + 1], e[r + 2] = t[r + 2]);
        }
    }, t;
}(), is = function() {
    function t(t, e, r) {
        void 0 === e && (e = !1), this._fn = t, this._once = e, this._thisArg = r, this._next = this._prev = this._owner = null;
    }
    return t.prototype.detach = function() {
        return null !== this._owner && (this._owner.detach(this), !0);
    }, t;
}();
function ns(t, e) {
    return t._head ? (t._tail._next = e, e._prev = t._tail, t._tail = e) : (t._head = e, t._tail = e), e._owner = t, e;
}
var os = function() {
    function t() {
        this._head = this._tail = void 0;
    }
    return t.prototype.handlers = function(t) {
        void 0 === t && (t = !1);
        var e = this._head;
        if (t) return !!e;
        for(var r = []; e;)r.push(e), e = e._next;
        return r;
    }, t.prototype.has = function(t) {
        if (!(t instanceof is)) throw new Error("MiniSignal#has(): First arg must be a SignalBinding object.");
        return t._owner === this;
    }, t.prototype.dispatch = function() {
        for(var t2 = arguments, e = [], r = 0; r < arguments.length; r++)e[r] = t2[r];
        var i = this._head;
        if (!i) return !1;
        for(; i;)i._once && this.detach(i), i._fn.apply(i._thisArg, e), i = i._next;
        return !0;
    }, t.prototype.add = function(t, e) {
        if (void 0 === e && (e = null), "function" != typeof t) throw new Error("MiniSignal#add(): First arg must be a Function.");
        return ns(this, new is(t, !1, e));
    }, t.prototype.once = function(t, e) {
        if (void 0 === e && (e = null), "function" != typeof t) throw new Error("MiniSignal#once(): First arg must be a Function.");
        return ns(this, new is(t, !0, e));
    }, t.prototype.detach = function(t) {
        if (!(t instanceof is)) throw new Error("MiniSignal#detach(): First arg must be a SignalBinding object.");
        return t._owner !== this ? this : (t._prev && (t._prev._next = t._next), t._next && (t._next._prev = t._prev), t === this._head ? (this._head = t._next, null === t._next && (this._tail = null)) : t === this._tail && (this._tail = t._prev, this._tail._next = null), t._owner = null, this);
    }, t.prototype.detachAll = function() {
        var t2 = this._head;
        if (!t2) return this;
        for(this._head = this._tail = null; t2;)t2._owner = null, t2 = t2._next;
        return this;
    }, t;
}();
function ss(t, e) {
    e = e || {
    };
    for(var r1 = {
        key: [
            "source",
            "protocol",
            "authority",
            "userInfo",
            "user",
            "password",
            "host",
            "port",
            "relative",
            "path",
            "directory",
            "file",
            "query",
            "anchor"
        ],
        q: {
            name: "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    }, i1 = r1.parser[e.strictMode ? "strict" : "loose"].exec(t), n1 = {
    }, o1 = 14; o1--;)n1[r1.key[o1]] = i1[o1] || "";
    return n1[r1.q.name] = {
    }, n1[r1.key[12]].replace(r1.q.parser, function(t, e, i) {
        e && (n1[r1.q.name][e] = i);
    }), n1;
}
var as = !(!self.XDomainRequest || "withCredentials" in new XMLHttpRequest), hs = null;
function us() {
}
function ls(t, e, r) {
    e && 0 === e.indexOf(".") && (e = e.substring(1)), e && (t[e] = r);
}
function cs(t) {
    return t.toString().replace("object ", "");
}
var ds = function() {
    function t(e, r, i) {
        if (this._dequeue = us, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = null, this._boundOnError = null, this._boundOnProgress = null, this._boundOnTimeout = null, this._boundXhrOnError = null, this._boundXhrOnTimeout = null, this._boundXhrOnAbort = null, this._boundXhrOnLoad = null, "string" != typeof e || "string" != typeof r) throw new Error("Both name and url are required for constructing a resource.");
        i = i || {
        }, this._flags = 0, this._setFlag(t.STATUS_FLAGS.DATA_URL, 0 === r.indexOf("data:")), this.name = e, this.url = r, this.extension = this._getExtension(), this.data = null, this.crossOrigin = !0 === i.crossOrigin ? "anonymous" : i.crossOrigin, this.timeout = i.timeout || 0, this.loadType = i.loadType || this._determineLoadType(), this.xhrType = i.xhrType, this.metadata = i.metadata || {
        }, this.error = null, this.xhr = null, this.children = [], this.type = t.TYPE.UNKNOWN, this.progressChunk = 0, this._dequeue = us, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundOnTimeout = this._onTimeout.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnTimeout = this._xhrOnTimeout.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this.onStart = new os, this.onProgress = new os, this.onComplete = new os, this.onAfterMiddleware = new os;
    }
    return t.setExtensionLoadType = function(e, r) {
        ls(t._loadTypeMap, e, r);
    }, t.setExtensionXhrType = function(e, r) {
        ls(t._xhrTypeMap, e, r);
    }, Object.defineProperty(t.prototype, "isDataUrl", {
        get: function() {
            return this._hasFlag(t.STATUS_FLAGS.DATA_URL);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "isComplete", {
        get: function() {
            return this._hasFlag(t.STATUS_FLAGS.COMPLETE);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "isLoading", {
        get: function() {
            return this._hasFlag(t.STATUS_FLAGS.LOADING);
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.complete = function() {
        this._clearEvents(), this._finish();
    }, t.prototype.abort = function(e) {
        if (!this.error) {
            if (this.error = new Error(e), this._clearEvents(), this.xhr) this.xhr.abort();
            else if (this.xdr) this.xdr.abort();
            else if (this.data) if (this.data.src) this.data.src = t.EMPTY_GIF;
            else for(; this.data.firstChild;)this.data.removeChild(this.data.firstChild);
            this._finish();
        }
    }, t.prototype.load = function(e) {
        var r = this;
        if (!this.isLoading) if (this.isComplete) e && setTimeout(function() {
            return e(r);
        }, 1);
        else switch(e && this.onComplete.once(e), this._setFlag(t.STATUS_FLAGS.LOADING, !0), this.onStart.dispatch(this), !1 !== this.crossOrigin && "string" == typeof this.crossOrigin || (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType){
            case t.LOAD_TYPE.IMAGE:
                this.type = t.TYPE.IMAGE, this._loadElement("image");
                break;
            case t.LOAD_TYPE.AUDIO:
                this.type = t.TYPE.AUDIO, this._loadSourceElement("audio");
                break;
            case t.LOAD_TYPE.VIDEO:
                this.type = t.TYPE.VIDEO, this._loadSourceElement("video");
                break;
            case t.LOAD_TYPE.XHR:
            default:
                as && this.crossOrigin ? this._loadXdr() : this._loadXhr();
        }
    }, t.prototype._hasFlag = function(t) {
        return 0 != (this._flags & t);
    }, t.prototype._setFlag = function(t, e) {
        this._flags = e ? this._flags | t : this._flags & ~t;
    }, t.prototype._clearEvents = function() {
        clearTimeout(this._elementTimer), this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("timeout", this._boundXhrOnTimeout, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null));
    }, t.prototype._finish = function() {
        if (this.isComplete) throw new Error("Complete called again for an already completed resource.");
        this._setFlag(t.STATUS_FLAGS.COMPLETE, !0), this._setFlag(t.STATUS_FLAGS.LOADING, !1), this.onComplete.dispatch(this);
    }, t.prototype._loadElement = function(t) {
        this.metadata.loadElement ? this.data = this.metadata.loadElement : "image" === t && void 0 !== self.Image ? this.data = new Image : this.data = document.createElement(t), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout));
    }, t.prototype._loadSourceElement = function(t) {
        if (this.metadata.loadElement ? this.data = this.metadata.loadElement : "audio" === t && void 0 !== self.Audio ? this.data = new Audio : this.data = document.createElement(t), null !== this.data) {
            if (this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), !this.metadata.skipSource) if (navigator.isCocoonJS) this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
            else if (Array.isArray(this.url)) for(var e = this.metadata.mimeType, r = 0; r < this.url.length; ++r)this.data.appendChild(this._createSource(t, this.url[r], Array.isArray(e) ? e[r] : e));
            else e = this.metadata.mimeType, this.data.appendChild(this._createSource(t, this.url, Array.isArray(e) ? e[0] : e));
            this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load(), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout));
        } else this.abort("Unsupported element: " + t);
    }, t.prototype._loadXhr = function() {
        "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
        var e = this.xhr = new XMLHttpRequest;
        e.open("GET", this.url, !0), e.timeout = this.timeout, this.xhrType === t.XHR_RESPONSE_TYPE.JSON || this.xhrType === t.XHR_RESPONSE_TYPE.DOCUMENT ? e.responseType = t.XHR_RESPONSE_TYPE.TEXT : e.responseType = this.xhrType, e.addEventListener("error", this._boundXhrOnError, !1), e.addEventListener("timeout", this._boundXhrOnTimeout, !1), e.addEventListener("abort", this._boundXhrOnAbort, !1), e.addEventListener("progress", this._boundOnProgress, !1), e.addEventListener("load", this._boundXhrOnLoad, !1), e.send();
    }, t.prototype._loadXdr = function() {
        "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
        var t2 = this.xhr = new self.XDomainRequest;
        t2.timeout = this.timeout || 5000, t2.onerror = this._boundXhrOnError, t2.ontimeout = this._boundXhrOnTimeout, t2.onprogress = this._boundOnProgress, t2.onload = this._boundXhrOnLoad, t2.open("GET", this.url, !0), setTimeout(function() {
            return t2.send();
        }, 1);
    }, t.prototype._createSource = function(t, e, r) {
        r || (r = t + "/" + this._getExtension(e));
        var i = document.createElement("source");
        return i.src = e, i.type = r, i;
    }, t.prototype._onError = function(t) {
        this.abort("Failed to load element using: " + t.target.nodeName);
    }, t.prototype._onProgress = function(t) {
        t && t.lengthComputable && this.onProgress.dispatch(this, t.loaded / t.total);
    }, t.prototype._onTimeout = function() {
        this.abort("Load timed out.");
    }, t.prototype._xhrOnError = function() {
        var t2 = this.xhr;
        this.abort(cs(t2) + " Request failed. Status: " + t2.status + ', text: "' + t2.statusText + '"');
    }, t.prototype._xhrOnTimeout = function() {
        var t2 = this.xhr;
        this.abort(cs(t2) + " Request timed out.");
    }, t.prototype._xhrOnAbort = function() {
        var t2 = this.xhr;
        this.abort(cs(t2) + " Request was aborted by the user.");
    }, t.prototype._xhrOnLoad = function() {
        var e = this.xhr, r = "", i = void 0 === e.status ? 200 : e.status;
        if ("" !== e.responseType && "text" !== e.responseType && void 0 !== e.responseType || (r = e.responseText), 0 === i && (r.length > 0 || e.responseType === t.XHR_RESPONSE_TYPE.BUFFER) ? i = 200 : 1223 === i && (i = 204), 2 == (i / 100 | 0)) {
            if (this.xhrType === t.XHR_RESPONSE_TYPE.TEXT) this.data = r, this.type = t.TYPE.TEXT;
            else if (this.xhrType === t.XHR_RESPONSE_TYPE.JSON) try {
                this.data = JSON.parse(r), this.type = t.TYPE.JSON;
            } catch (t2) {
                return void this.abort("Error trying to parse loaded json: " + t2);
            }
            else if (this.xhrType === t.XHR_RESPONSE_TYPE.DOCUMENT) try {
                if (self.DOMParser) {
                    var n = new DOMParser;
                    this.data = n.parseFromString(r, "text/xml");
                } else {
                    var o = document.createElement("div");
                    o.innerHTML = r, this.data = o;
                }
                this.type = t.TYPE.XML;
            } catch (t5) {
                return void this.abort("Error trying to parse loaded xml: " + t5);
            }
            else this.data = e.response || r;
            this.complete();
        } else this.abort("[" + e.status + "] " + e.statusText + ": " + e.responseURL);
    }, t.prototype._determineCrossOrigin = function(t, e) {
        if (0 === t.indexOf("data:")) return "";
        if (self.origin !== self.location.origin) return "anonymous";
        e = e || self.location, hs || (hs = document.createElement("a")), hs.href = t;
        var r = ss(hs.href, {
            strictMode: !0
        }), i = !r.port && "" === e.port || r.port === e.port, n = r.protocol ? r.protocol + ":" : "";
        return r.host === e.hostname && i && n === e.protocol ? "" : "anonymous";
    }, t.prototype._determineXhrType = function() {
        return t._xhrTypeMap[this.extension] || t.XHR_RESPONSE_TYPE.TEXT;
    }, t.prototype._determineLoadType = function() {
        return t._loadTypeMap[this.extension] || t.LOAD_TYPE.XHR;
    }, t.prototype._getExtension = function(t) {
        void 0 === t && (t = this.url);
        var e = "";
        if (this.isDataUrl) {
            var r = t.indexOf("/");
            e = t.substring(r + 1, t.indexOf(";", r));
        } else {
            var i = t.indexOf("?"), n = t.indexOf("#"), o = Math.min(i > -1 ? i : t.length, n > -1 ? n : t.length);
            e = (t = t.substring(0, o)).substring(t.lastIndexOf(".") + 1);
        }
        return e.toLowerCase();
    }, t.prototype._getMimeFromXhrType = function(e) {
        switch(e){
            case t.XHR_RESPONSE_TYPE.BUFFER:
                return "application/octet-binary";
            case t.XHR_RESPONSE_TYPE.BLOB:
                return "application/blob";
            case t.XHR_RESPONSE_TYPE.DOCUMENT:
                return "application/xml";
            case t.XHR_RESPONSE_TYPE.JSON:
                return "application/json";
            case t.XHR_RESPONSE_TYPE.DEFAULT:
            case t.XHR_RESPONSE_TYPE.TEXT:
            default:
                return "text/plain";
        }
    }, t;
}();
function fs() {
}
function ps(t) {
    return function() {
        for(var e = arguments, r = [], i = 0; i < arguments.length; i++)r[i] = e[i];
        if (null === t) throw new Error("Callback was already called.");
        var n = t;
        t = null, n.apply(this, r);
    };
}
!function(t) {
    !function(t) {
        t[t.NONE = 0] = "NONE", t[t.DATA_URL = 1] = "DATA_URL", t[t.COMPLETE = 2] = "COMPLETE", t[t.LOADING = 4] = "LOADING";
    }(t.STATUS_FLAGS || (t.STATUS_FLAGS = {
    })), (function(t) {
        t[t.UNKNOWN = 0] = "UNKNOWN", t[t.JSON = 1] = "JSON", t[t.XML = 2] = "XML", t[t.IMAGE = 3] = "IMAGE", t[t.AUDIO = 4] = "AUDIO", t[t.VIDEO = 5] = "VIDEO", t[t.TEXT = 6] = "TEXT";
    })(t.TYPE || (t.TYPE = {
    })), (function(t) {
        t[t.XHR = 1] = "XHR", t[t.IMAGE = 2] = "IMAGE", t[t.AUDIO = 3] = "AUDIO", t[t.VIDEO = 4] = "VIDEO";
    })(t.LOAD_TYPE || (t.LOAD_TYPE = {
    })), (function(t) {
        t.DEFAULT = "text", t.BUFFER = "arraybuffer", t.BLOB = "blob", t.DOCUMENT = "document", t.JSON = "json", t.TEXT = "text";
    })(t.XHR_RESPONSE_TYPE || (t.XHR_RESPONSE_TYPE = {
    })), t._loadTypeMap = {
        gif: t.LOAD_TYPE.IMAGE,
        png: t.LOAD_TYPE.IMAGE,
        bmp: t.LOAD_TYPE.IMAGE,
        jpg: t.LOAD_TYPE.IMAGE,
        jpeg: t.LOAD_TYPE.IMAGE,
        tif: t.LOAD_TYPE.IMAGE,
        tiff: t.LOAD_TYPE.IMAGE,
        webp: t.LOAD_TYPE.IMAGE,
        tga: t.LOAD_TYPE.IMAGE,
        svg: t.LOAD_TYPE.IMAGE,
        "svg+xml": t.LOAD_TYPE.IMAGE,
        mp3: t.LOAD_TYPE.AUDIO,
        ogg: t.LOAD_TYPE.AUDIO,
        wav: t.LOAD_TYPE.AUDIO,
        mp4: t.LOAD_TYPE.VIDEO,
        webm: t.LOAD_TYPE.VIDEO
    }, t._xhrTypeMap = {
        xhtml: t.XHR_RESPONSE_TYPE.DOCUMENT,
        html: t.XHR_RESPONSE_TYPE.DOCUMENT,
        htm: t.XHR_RESPONSE_TYPE.DOCUMENT,
        xml: t.XHR_RESPONSE_TYPE.DOCUMENT,
        tmx: t.XHR_RESPONSE_TYPE.DOCUMENT,
        svg: t.XHR_RESPONSE_TYPE.DOCUMENT,
        tsx: t.XHR_RESPONSE_TYPE.DOCUMENT,
        gif: t.XHR_RESPONSE_TYPE.BLOB,
        png: t.XHR_RESPONSE_TYPE.BLOB,
        bmp: t.XHR_RESPONSE_TYPE.BLOB,
        jpg: t.XHR_RESPONSE_TYPE.BLOB,
        jpeg: t.XHR_RESPONSE_TYPE.BLOB,
        tif: t.XHR_RESPONSE_TYPE.BLOB,
        tiff: t.XHR_RESPONSE_TYPE.BLOB,
        webp: t.XHR_RESPONSE_TYPE.BLOB,
        tga: t.XHR_RESPONSE_TYPE.BLOB,
        json: t.XHR_RESPONSE_TYPE.JSON,
        text: t.XHR_RESPONSE_TYPE.TEXT,
        txt: t.XHR_RESPONSE_TYPE.TEXT,
        ttf: t.XHR_RESPONSE_TYPE.BUFFER,
        otf: t.XHR_RESPONSE_TYPE.BUFFER
    }, t.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
}(ds || (ds = {
}));
var _s = function(t, e) {
    this.data = t, this.callback = e;
}, ms = function() {
    function t(t, e) {
        var r = this;
        if (void 0 === e && (e = 1), this.workers = 0, this.saturated = fs, this.unsaturated = fs, this.empty = fs, this.drain = fs, this.error = fs, this.started = !1, this.paused = !1, this._tasks = [], this._insert = function(t, e, i) {
            if (i && "function" != typeof i) throw new Error("task callback must be a function");
            if (r.started = !0, null == t && r.idle()) setTimeout(function() {
                return r.drain();
            }, 1);
            else {
                var n = new _s(t, "function" == typeof i ? i : fs);
                e ? r._tasks.unshift(n) : r._tasks.push(n), setTimeout(r.process, 1);
            }
        }, this.process = function() {
            for(; !r.paused && r.workers < r.concurrency && r._tasks.length;){
                var t = r._tasks.shift();
                0 === r._tasks.length && r.empty(), r.workers += 1, r.workers === r.concurrency && r.saturated(), r._worker(t.data, ps(r._next(t)));
            }
        }, this._worker = t, 0 === e) throw new Error("Concurrency must not be zero");
        this.concurrency = e, this.buffer = e / 4;
    }
    return t.prototype._next = function(t) {
        var e = this;
        return function() {
            for(var r = arguments, i = [], n = 0; n < arguments.length; n++)i[n] = r[n];
            e.workers -= 1, t.callback.apply(t, i), null != i[0] && e.error(i[0], t.data), e.workers <= e.concurrency - e.buffer && e.unsaturated(), e.idle() && e.drain(), e.process();
        };
    }, t.prototype.push = function(t, e) {
        this._insert(t, !1, e);
    }, t.prototype.kill = function() {
        this.workers = 0, this.drain = fs, this.started = !1, this._tasks = [];
    }, t.prototype.unshift = function(t, e) {
        this._insert(t, !0, e);
    }, t.prototype.length = function() {
        return this._tasks.length;
    }, t.prototype.running = function() {
        return this.workers;
    }, t.prototype.idle = function() {
        return this._tasks.length + this.workers === 0;
    }, t.prototype.pause = function() {
        !0 !== this.paused && (this.paused = !0);
    }, t.prototype.resume = function() {
        if (!1 !== this.paused) {
            this.paused = !1;
            for(var t = 1; t <= this.concurrency; t++)this.process();
        }
    }, t.eachSeries = function(t, e, r, i) {
        var n = 0, o = t.length;
        !function s(a) {
            a || n === o ? r && r(a) : i ? setTimeout(function() {
                e(t[n++], s);
            }, 1) : e(t[n++], s);
        }();
    }, t.queue = function(e, r) {
        return new t(e, r);
    }, t;
}(), vs = /(#[\w-]+)?$/, ys = function() {
    function t(e, r) {
        var i = this;
        void 0 === e && (e = ""), void 0 === r && (r = 10), this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(t, e) {
            return i._loadResource(t, e);
        }, this.resources = {
        }, this.baseUrl = e, this.progress = 0, this.loading = !1, this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(t, e) {
            return i._loadResource(t, e);
        }, this._queue = ms.queue(this._boundLoadResource, r), this._queue.pause(), this.resources = {
        }, this.onProgress = new os, this.onError = new os, this.onLoad = new os, this.onStart = new os, this.onComplete = new os;
        for(var n = 0; n < t._plugins.length; ++n){
            var o = t._plugins[n], s = o.pre, a = o.use;
            s && this.pre(s), a && this.use(a);
        }
        this._protected = !1;
    }
    return t.prototype._add = function(t, e, r, i) {
        if (this.loading && (!r || !r.parentResource)) throw new Error("Cannot add resources while the loader is running.");
        if (this.resources[t]) throw new Error('Resource named "' + t + '" already exists.');
        if (e = this._prepareUrl(e), this.resources[t] = new ds(t, e, r), "function" == typeof i && this.resources[t].onAfterMiddleware.once(i), this.loading) {
            for(var n = r.parentResource, o = [], s = 0; s < n.children.length; ++s)n.children[s].isComplete || o.push(n.children[s]);
            var a = n.progressChunk * (o.length + 1) / (o.length + 2);
            for(n.children.push(this.resources[t]), n.progressChunk = a, s = 0; s < o.length; ++s)o[s].progressChunk = a;
            this.resources[t].progressChunk = a;
        }
        return this._queue.push(this.resources[t]), this;
    }, t.prototype.pre = function(t) {
        return this._beforeMiddleware.push(t), this;
    }, t.prototype.use = function(t) {
        return this._afterMiddleware.push(t), this;
    }, t.prototype.reset = function() {
        for(var t in this.progress = 0, this.loading = !1, this._queue.kill(), this._queue.pause(), this.resources){
            var e = this.resources[t];
            e._onLoadBinding && e._onLoadBinding.detach(), e.isLoading && e.abort("loader reset");
        }
        return this.resources = {
        }, this;
    }, t.prototype.load = function(t) {
        if ("function" == typeof t && this.onComplete.once(t), this.loading) return this;
        if (this._queue.idle()) this._onStart(), this._onComplete();
        else {
            for(var e = 100 / this._queue._tasks.length, r = 0; r < this._queue._tasks.length; ++r)this._queue._tasks[r].data.progressChunk = e;
            this._onStart(), this._queue.resume();
        }
        return this;
    }, Object.defineProperty(t.prototype, "concurrency", {
        get: function() {
            return this._queue.concurrency;
        },
        set: function(t) {
            this._queue.concurrency = t;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype._prepareUrl = function(t) {
        var e, r = ss(t, {
            strictMode: !0
        });
        if (e = r.protocol || !r.path || 0 === t.indexOf("//") ? t : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== t.charAt(0) ? this.baseUrl + "/" + t : this.baseUrl + t, this.defaultQueryString) {
            var i = vs.exec(e)[0];
            -1 !== (e = e.substr(0, e.length - i.length)).indexOf("?") ? e += "&" + this.defaultQueryString : e += "?" + this.defaultQueryString, e += i;
        }
        return e;
    }, t.prototype._loadResource = function(t, e) {
        var r = this;
        t._dequeue = e, ms.eachSeries(this._beforeMiddleware, function(e, i) {
            e.call(r, t, function() {
                i(t.isComplete ? {
                } : null);
            });
        }, function() {
            t.isComplete ? r._onLoad(t) : (t._onLoadBinding = t.onComplete.once(r._onLoad, r), t.load());
        }, !0);
    }, t.prototype._onStart = function() {
        this.progress = 0, this.loading = !0, this.onStart.dispatch(this);
    }, t.prototype._onComplete = function() {
        this.progress = 100, this.loading = !1, this.onComplete.dispatch(this, this.resources);
    }, t.prototype._onLoad = function(t) {
        var e = this;
        t._onLoadBinding = null, this._resourcesParsing.push(t), t._dequeue(), ms.eachSeries(this._afterMiddleware, function(r, i) {
            r.call(e, t, i);
        }, function() {
            t.onAfterMiddleware.dispatch(t), e.progress = Math.min(100, e.progress + t.progressChunk), e.onProgress.dispatch(e, t), t.error ? e.onError.dispatch(t.error, e, t) : e.onLoad.dispatch(e, t), e._resourcesParsing.splice(e._resourcesParsing.indexOf(t), 1), e._queue.idle() && 0 === e._resourcesParsing.length && e._onComplete();
        }, !0);
    }, t.prototype.destroy = function() {
        this._protected || this.reset();
    }, Object.defineProperty(t, "shared", {
        get: function() {
            var e = t._shared;
            return e || ((e = new t)._protected = !0, t._shared = e), e;
        },
        enumerable: !1,
        configurable: !0
    }), t.registerPlugin = function(e) {
        return t._plugins.push(e), e.add && e.add(), t;
    }, t._plugins = [], t;
}();
ys.prototype.add = function(t, e, r, i) {
    if (Array.isArray(t)) {
        for(var n = 0; n < t.length; ++n)this.add(t[n]);
        return this;
    }
    if ("object" == typeof t && (r = t, i = e || r.callback || r.onComplete, e = r.url, t = r.name || r.key || r.url), "string" != typeof e && (i = r, r = e, e = t), "string" != typeof e) throw new Error("No url passed to add resource to loader.");
    return "function" == typeof r && (i = r, r = null), this._add(t, e, r, i);
};
var gs, Es, Ts = function() {
    function t() {
    }
    return t.init = function(t) {
        t = Object.assign({
            sharedLoader: !1
        }, t), this.loader = t.sharedLoader ? ys.shared : new ys;
    }, t.destroy = function() {
        this.loader && (this.loader.destroy(), this.loader = null);
    }, t;
}(), bs = function() {
    function t() {
    }
    return t.add = function() {
        ds.setExtensionLoadType("svg", ds.LOAD_TYPE.XHR), ds.setExtensionXhrType("svg", ds.XHR_RESPONSE_TYPE.TEXT);
    }, t.use = function(t, e) {
        if (!t.data || t.type !== ds.TYPE.IMAGE && "svg" !== t.extension) e();
        else {
            var r = t.data, i = t.url, n = t.name, o = t.metadata;
            ki.fromLoader(r, i, n, o).then(function(r) {
                t.texture = r, e();
            }).catch(e);
        }
    }, t;
}(), xs = self.URL || self.webkitURL;
ys.registerPlugin({
    use: function(t, e) {
        if (t.data) {
            if (t.xhr && t.xhrType === ds.XHR_RESPONSE_TYPE.BLOB) if (self.Blob && "string" != typeof t.data) {
                if (0 === t.data.type.indexOf("image")) {
                    var r = xs.createObjectURL(t.data);
                    return t.blob = t.data, t.data = new Image, t.data.src = r, t.type = ds.TYPE.IMAGE, void (t.data.onload = function() {
                        xs.revokeObjectURL(r), t.data.onload = null, e();
                    });
                }
            } else {
                var i = t.xhr.getResponseHeader("content-type");
                if (i && 0 === i.indexOf("image")) return t.data = new Image, t.data.src = "data:" + i + ";base64," + (function(t) {
                    for(var e1 = "", r = 0; r < t.length;){
                        for(var i = [
                            0,
                            0,
                            0
                        ], n = [
                            0,
                            0,
                            0,
                            0
                        ], o = 0; o < i.length; ++o)r < t.length ? i[o] = 255 & t.charCodeAt(r++) : i[o] = 0;
                        switch(n[0] = i[0] >> 2, n[1] = (3 & i[0]) << 4 | i[1] >> 4, n[2] = (15 & i[1]) << 2 | i[2] >> 6, n[3] = 63 & i[2], r - (t.length - 1)){
                            case 2:
                                n[3] = 64, n[2] = 64;
                                break;
                            case 1:
                                n[3] = 64;
                        }
                        for(o = 0; o < n.length; ++o)e1 += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(n[o]);
                    }
                    return e1;
                })(t.xhr.responseText), t.type = ds.TYPE.IMAGE, void (t.data.onload = function() {
                    t.data.onload = null, e();
                });
            }
            e();
        } else e();
    }
}), ys.registerPlugin(bs), (function(t) {
    t[t.COMPRESSED_RGB_S3TC_DXT1_EXT = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT", t[t.COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT", t[t.COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT", t[t.COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT", t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT", t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT", t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT", t[t.COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT", t[t.COMPRESSED_R11_EAC = 37488] = "COMPRESSED_R11_EAC", t[t.COMPRESSED_SIGNED_R11_EAC = 37489] = "COMPRESSED_SIGNED_R11_EAC", t[t.COMPRESSED_RG11_EAC = 37490] = "COMPRESSED_RG11_EAC", t[t.COMPRESSED_SIGNED_RG11_EAC = 37491] = "COMPRESSED_SIGNED_RG11_EAC", t[t.COMPRESSED_RGB8_ETC2 = 37492] = "COMPRESSED_RGB8_ETC2", t[t.COMPRESSED_RGBA8_ETC2_EAC = 37496] = "COMPRESSED_RGBA8_ETC2_EAC", t[t.COMPRESSED_SRGB8_ETC2 = 37493] = "COMPRESSED_SRGB8_ETC2", t[t.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37497] = "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC", t[t.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37494] = "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2", t[t.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37495] = "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2", t[t.COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG", t[t.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG", t[t.COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG", t[t.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG", t[t.COMPRESSED_RGB_ETC1_WEBGL = 36196] = "COMPRESSED_RGB_ETC1_WEBGL", t[t.COMPRESSED_RGB_ATC_WEBGL = 35986] = "COMPRESSED_RGB_ATC_WEBGL", t[t.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 35986] = "COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL", t[t.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 34798] = "COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL";
})(Es || (Es = {
}));
var Rs = ((gs = {
})[Es.COMPRESSED_RGB_S3TC_DXT1_EXT] = 0.5, gs[Es.COMPRESSED_RGBA_S3TC_DXT1_EXT] = 0.5, gs[Es.COMPRESSED_RGBA_S3TC_DXT3_EXT] = 1, gs[Es.COMPRESSED_RGBA_S3TC_DXT5_EXT] = 1, gs[Es.COMPRESSED_SRGB_S3TC_DXT1_EXT] = 0.5, gs[Es.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT] = 0.5, gs[Es.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT] = 1, gs[Es.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT] = 1, gs[Es.COMPRESSED_R11_EAC] = 0.5, gs[Es.COMPRESSED_SIGNED_R11_EAC] = 0.5, gs[Es.COMPRESSED_RG11_EAC] = 1, gs[Es.COMPRESSED_SIGNED_RG11_EAC] = 1, gs[Es.COMPRESSED_RGB8_ETC2] = 0.5, gs[Es.COMPRESSED_RGBA8_ETC2_EAC] = 1, gs[Es.COMPRESSED_SRGB8_ETC2] = 0.5, gs[Es.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC] = 1, gs[Es.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2] = 0.5, gs[Es.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2] = 0.5, gs[Es.COMPRESSED_RGB_PVRTC_4BPPV1_IMG] = 0.5, gs[Es.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG] = 0.5, gs[Es.COMPRESSED_RGB_PVRTC_2BPPV1_IMG] = 0.25, gs[Es.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG] = 0.25, gs[Es.COMPRESSED_RGB_ETC1_WEBGL] = 0.5, gs[Es.COMPRESSED_RGB_ATC_WEBGL] = 0.5, gs[Es.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL] = 1, gs[Es.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL] = 1, gs), As = function(t, e) {
    return (As = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
};
function Os(t, e) {
    function r() {
        this.constructor = t;
    }
    As(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
}
var Ss, Is, Ps = function(t) {
    function e(e, r) {
        void 0 === r && (r = {
            width: 1,
            height: 1,
            autoLoad: !0
        });
        var i, n, o = this;
        return "string" == typeof e ? (i = e, n = new Uint8Array) : (i = null, n = e), (o = t.call(this, n, r) || this).origin = i, o.buffer = n ? new Xo(n) : null, o.origin && !1 !== r.autoLoad && o.load(), n && n.length && (o.loaded = !0, o.onBlobLoaded(o.buffer.rawBinaryData)), o;
    }
    return Os(e, t), e.prototype.onBlobLoaded = function(t) {
    }, e.prototype.load = function() {
        return t2 = this, e1 = Promise, r = function() {
            var t;
            return (function(t, e) {
                var r, i, n, o, s = {
                    label: 0,
                    sent: function() {
                        if (1 & n[0]) throw n[1];
                        return n[1];
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                    return this;
                }), o;
                function a(o) {
                    return function(a) {
                        return (function(o) {
                            if (r) throw new TypeError("Generator is already executing.");
                            for(; s;)try {
                                if (r = 1, i && (n = 2 & o[0] ? i.return : o[0] ? i.throw || ((n = i.return) && n.call(i), 0) : i.next) && !(n = n.call(i, o[1])).done) return n;
                                switch(i = 0, n && (o = [
                                    2 & o[0],
                                    n.value
                                ]), o[0]){
                                    case 0:
                                    case 1:
                                        n = o;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++, i = o[1], o = [
                                            0
                                        ];
                                        continue;
                                    case 7:
                                        o = s.ops.pop(), s.trys.pop();
                                        continue;
                                    default:
                                        if (!(n = (n = s.trys).length > 0 && n[n.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                            s = 0;
                                            continue;
                                        }
                                        if (3 === o[0] && (!n || o[1] > n[0] && o[1] < n[3])) {
                                            s.label = o[1];
                                            break;
                                        }
                                        if (6 === o[0] && s.label < n[1]) {
                                            s.label = n[1], n = o;
                                            break;
                                        }
                                        if (n && s.label < n[2]) {
                                            s.label = n[2], s.ops.push(o);
                                            break;
                                        }
                                        n[2] && s.ops.pop(), s.trys.pop();
                                        continue;
                                }
                                o = e.call(t, s);
                            } catch (t2) {
                                o = [
                                    6,
                                    t2
                                ], i = 0;
                            } finally{
                                r = n = 0;
                            }
                            if (5 & o[0]) throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            };
                        })([
                            o,
                            a
                        ]);
                    };
                }
            })(this, function(e) {
                switch(e.label){
                    case 0:
                        return [
                            4,
                            fetch(this.origin)
                        ];
                    case 1:
                        return [
                            4,
                            e.sent().blob()
                        ];
                    case 2:
                        return [
                            4,
                            e.sent().arrayBuffer()
                        ];
                    case 3:
                        return t = e.sent(), this.data = new Uint32Array(t), this.buffer = new Xo(t), this.loaded = !0, this.onBlobLoaded(t), this.update(), [
                            2,
                            this
                        ];
                }
            });
        }, new (e1 || (e1 = Promise))(function(i, n) {
            function o(t) {
                try {
                    a(r.next(t));
                } catch (t2) {
                    n(t2);
                }
            }
            function s(t) {
                try {
                    a(r.throw(t));
                } catch (t2) {
                    n(t2);
                }
            }
            function a(t) {
                t.done ? i(t.value) : new e1(function(e) {
                    e(t.value);
                }).then(o, s);
            }
            a((r = r.apply(t2, [])).next());
        });
        var t2, e1, r;
    }, e;
}(xi), Ns = function(t) {
    function e(r, i) {
        var n = t.call(this, r, i) || this;
        return n.format = i.format, n.levels = i.levels || 1, n._width = i.width, n._height = i.height, n._extension = e._formatToExtension(n.format), (i.levelBuffers || n.buffer) && (n._levelBuffers = i.levelBuffers || e._createLevelBuffers(r instanceof Uint8Array ? r : n.buffer.uint8View, n.format, n.levels, 4, 4, n.width, n.height)), n;
    }
    return Os(e, t), e.prototype.upload = function(t, e, r) {
        var i = t.gl;
        if (!t.context.extensions[this._extension]) throw new Error(this._extension + " textures are not supported on the current machine");
        if (!this._levelBuffers) return !1;
        for(var n = 0, o = this.levels; n < o; n++){
            var s = this._levelBuffers[n], a = s.levelID, h = s.levelWidth, u = s.levelHeight, l = s.levelBuffer;
            i.compressedTexImage2D(i.TEXTURE_2D, a, this.format, h, u, 0, l);
        }
        return !0;
    }, e.prototype.onBlobLoaded = function() {
        this._levelBuffers = e._createLevelBuffers(this.buffer.uint8View, this.format, this.levels, 4, 4, this.width, this.height);
    }, e._formatToExtension = function(t) {
        if (t >= 33776 && t <= 33779) return "s3tc";
        if (t >= 37488 && t <= 37497) return "etc";
        if (t >= 35840 && t <= 35843) return "pvrtc";
        if (t >= 36196) return "etc1";
        if (t >= 35986 && t <= 34798) return "atc";
        throw new Error("Invalid (compressed) texture format given!");
    }, e._createLevelBuffers = function(t, e, r, i, n, o, s) {
        for(var a = new Array(r), h = t.byteOffset, u = o, l = s, c = u + i - 1 & ~(i - 1), d = l + n - 1 & ~(n - 1), f = c * d * Rs[e], p = 0; p < r; p++)a[p] = {
            levelID: p,
            levelWidth: r > 1 ? u : c,
            levelHeight: r > 1 ? l : d,
            levelBuffer: new Uint8Array(t.buffer, h, f)
        }, h += f, f = (c = (u = u >> 1 || 1) + i - 1 & ~(i - 1)) * (d = (l = l >> 1 || 1) + n - 1 & ~(n - 1)) * Rs[e];
        return a;
    }, e;
}(Ps), Ms = function() {
    function t() {
    }
    return t.use = function(e, r) {
        var i = e.data;
        if (e.type === ds.TYPE.JSON && i && i.cacheID && i.textures) {
            for(var n = i.textures, o = void 0, s = void 0, a = 0, h = n.length; a < h; a++){
                var u = n[a], l = u.src, c = u.format;
                if (c || (s = l), t.textureFormats[c]) {
                    o = l;
                    break;
                }
            }
            if (!(o = o || s)) return void r(new Error("Cannot load compressed-textures in " + e.url + ", make sure you provide a fallback"));
            if (o === e.url) return void r(new Error("URL of compressed texture cannot be the same as the manifest's URL"));
            var d = {
                crossOrigin: e.crossOrigin,
                metadata: e.metadata.imageMetadata,
                parentResource: e
            }, f = be.resolve(e.url.replace(this.baseUrl, ""), o), p = i.cacheID;
            this.add(p, f, d, function(t) {
                if (t.error) r(t.error);
                else {
                    var i = t.texture, n = void 0 === i ? null : i, o = t.textures, s = void 0 === o ? {
                    } : o;
                    Object.assign(e, {
                        texture: n,
                        textures: s
                    }), r();
                }
            });
        } else r();
    }, t.add = function() {
        var e = document.createElement("canvas").getContext("webgl");
        if (e) {
            var r = {
                s3tc: e.getExtension("WEBGL_compressed_texture_s3tc"),
                s3tc_sRGB: e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
                etc: e.getExtension("WEBGL_compressed_texture_etc"),
                etc1: e.getExtension("WEBGL_compressed_texture_etc1"),
                pvrtc: e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
                atc: e.getExtension("WEBGL_compressed_texture_atc"),
                astc: e.getExtension("WEBGL_compressed_texture_astc")
            };
            for(var i in t.textureExtensions = r, t.textureFormats = {
            }, r){
                var n = r[i];
                n && Object.assign(t.textureFormats, Object.getPrototypeOf(n));
            }
        }
    }, t;
}();
function Ds(t, e, r) {
    var i1 = {
        textures: {
        },
        texture: null
    };
    return e ? (e.map(function(t) {
        return new ki(new Ai(t, Object.assign({
            mipmap: pe.OFF,
            alphaMode: _e.NO_PREMULTIPLIED_ALPHA
        }, r)));
    }).forEach(function(e, r) {
        var n = e.baseTexture, o = t + "-" + (r + 1);
        Ai.addToCache(n, o), ki.addToCache(e, o), 0 === r && (Ai.addToCache(n, t), ki.addToCache(e, t), i1.texture = e), i1.textures[o] = e;
    }), i1) : i1;
}
ds.setExtensionXhrType("dds", ds.XHR_RESPONSE_TYPE.BUFFER);
var Cs, ws;
!function(t) {
    t[t.DXGI_FORMAT_UNKNOWN = 0] = "DXGI_FORMAT_UNKNOWN", t[t.DXGI_FORMAT_R32G32B32A32_TYPELESS = 1] = "DXGI_FORMAT_R32G32B32A32_TYPELESS", t[t.DXGI_FORMAT_R32G32B32A32_FLOAT = 2] = "DXGI_FORMAT_R32G32B32A32_FLOAT", t[t.DXGI_FORMAT_R32G32B32A32_UINT = 3] = "DXGI_FORMAT_R32G32B32A32_UINT", t[t.DXGI_FORMAT_R32G32B32A32_SINT = 4] = "DXGI_FORMAT_R32G32B32A32_SINT", t[t.DXGI_FORMAT_R32G32B32_TYPELESS = 5] = "DXGI_FORMAT_R32G32B32_TYPELESS", t[t.DXGI_FORMAT_R32G32B32_FLOAT = 6] = "DXGI_FORMAT_R32G32B32_FLOAT", t[t.DXGI_FORMAT_R32G32B32_UINT = 7] = "DXGI_FORMAT_R32G32B32_UINT", t[t.DXGI_FORMAT_R32G32B32_SINT = 8] = "DXGI_FORMAT_R32G32B32_SINT", t[t.DXGI_FORMAT_R16G16B16A16_TYPELESS = 9] = "DXGI_FORMAT_R16G16B16A16_TYPELESS", t[t.DXGI_FORMAT_R16G16B16A16_FLOAT = 10] = "DXGI_FORMAT_R16G16B16A16_FLOAT", t[t.DXGI_FORMAT_R16G16B16A16_UNORM = 11] = "DXGI_FORMAT_R16G16B16A16_UNORM", t[t.DXGI_FORMAT_R16G16B16A16_UINT = 12] = "DXGI_FORMAT_R16G16B16A16_UINT", t[t.DXGI_FORMAT_R16G16B16A16_SNORM = 13] = "DXGI_FORMAT_R16G16B16A16_SNORM", t[t.DXGI_FORMAT_R16G16B16A16_SINT = 14] = "DXGI_FORMAT_R16G16B16A16_SINT", t[t.DXGI_FORMAT_R32G32_TYPELESS = 15] = "DXGI_FORMAT_R32G32_TYPELESS", t[t.DXGI_FORMAT_R32G32_FLOAT = 16] = "DXGI_FORMAT_R32G32_FLOAT", t[t.DXGI_FORMAT_R32G32_UINT = 17] = "DXGI_FORMAT_R32G32_UINT", t[t.DXGI_FORMAT_R32G32_SINT = 18] = "DXGI_FORMAT_R32G32_SINT", t[t.DXGI_FORMAT_R32G8X24_TYPELESS = 19] = "DXGI_FORMAT_R32G8X24_TYPELESS", t[t.DXGI_FORMAT_D32_FLOAT_S8X24_UINT = 20] = "DXGI_FORMAT_D32_FLOAT_S8X24_UINT", t[t.DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS = 21] = "DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS", t[t.DXGI_FORMAT_X32_TYPELESS_G8X24_UINT = 22] = "DXGI_FORMAT_X32_TYPELESS_G8X24_UINT", t[t.DXGI_FORMAT_R10G10B10A2_TYPELESS = 23] = "DXGI_FORMAT_R10G10B10A2_TYPELESS", t[t.DXGI_FORMAT_R10G10B10A2_UNORM = 24] = "DXGI_FORMAT_R10G10B10A2_UNORM", t[t.DXGI_FORMAT_R10G10B10A2_UINT = 25] = "DXGI_FORMAT_R10G10B10A2_UINT", t[t.DXGI_FORMAT_R11G11B10_FLOAT = 26] = "DXGI_FORMAT_R11G11B10_FLOAT", t[t.DXGI_FORMAT_R8G8B8A8_TYPELESS = 27] = "DXGI_FORMAT_R8G8B8A8_TYPELESS", t[t.DXGI_FORMAT_R8G8B8A8_UNORM = 28] = "DXGI_FORMAT_R8G8B8A8_UNORM", t[t.DXGI_FORMAT_R8G8B8A8_UNORM_SRGB = 29] = "DXGI_FORMAT_R8G8B8A8_UNORM_SRGB", t[t.DXGI_FORMAT_R8G8B8A8_UINT = 30] = "DXGI_FORMAT_R8G8B8A8_UINT", t[t.DXGI_FORMAT_R8G8B8A8_SNORM = 31] = "DXGI_FORMAT_R8G8B8A8_SNORM", t[t.DXGI_FORMAT_R8G8B8A8_SINT = 32] = "DXGI_FORMAT_R8G8B8A8_SINT", t[t.DXGI_FORMAT_R16G16_TYPELESS = 33] = "DXGI_FORMAT_R16G16_TYPELESS", t[t.DXGI_FORMAT_R16G16_FLOAT = 34] = "DXGI_FORMAT_R16G16_FLOAT", t[t.DXGI_FORMAT_R16G16_UNORM = 35] = "DXGI_FORMAT_R16G16_UNORM", t[t.DXGI_FORMAT_R16G16_UINT = 36] = "DXGI_FORMAT_R16G16_UINT", t[t.DXGI_FORMAT_R16G16_SNORM = 37] = "DXGI_FORMAT_R16G16_SNORM", t[t.DXGI_FORMAT_R16G16_SINT = 38] = "DXGI_FORMAT_R16G16_SINT", t[t.DXGI_FORMAT_R32_TYPELESS = 39] = "DXGI_FORMAT_R32_TYPELESS", t[t.DXGI_FORMAT_D32_FLOAT = 40] = "DXGI_FORMAT_D32_FLOAT", t[t.DXGI_FORMAT_R32_FLOAT = 41] = "DXGI_FORMAT_R32_FLOAT", t[t.DXGI_FORMAT_R32_UINT = 42] = "DXGI_FORMAT_R32_UINT", t[t.DXGI_FORMAT_R32_SINT = 43] = "DXGI_FORMAT_R32_SINT", t[t.DXGI_FORMAT_R24G8_TYPELESS = 44] = "DXGI_FORMAT_R24G8_TYPELESS", t[t.DXGI_FORMAT_D24_UNORM_S8_UINT = 45] = "DXGI_FORMAT_D24_UNORM_S8_UINT", t[t.DXGI_FORMAT_R24_UNORM_X8_TYPELESS = 46] = "DXGI_FORMAT_R24_UNORM_X8_TYPELESS", t[t.DXGI_FORMAT_X24_TYPELESS_G8_UINT = 47] = "DXGI_FORMAT_X24_TYPELESS_G8_UINT", t[t.DXGI_FORMAT_R8G8_TYPELESS = 48] = "DXGI_FORMAT_R8G8_TYPELESS", t[t.DXGI_FORMAT_R8G8_UNORM = 49] = "DXGI_FORMAT_R8G8_UNORM", t[t.DXGI_FORMAT_R8G8_UINT = 50] = "DXGI_FORMAT_R8G8_UINT", t[t.DXGI_FORMAT_R8G8_SNORM = 51] = "DXGI_FORMAT_R8G8_SNORM", t[t.DXGI_FORMAT_R8G8_SINT = 52] = "DXGI_FORMAT_R8G8_SINT", t[t.DXGI_FORMAT_R16_TYPELESS = 53] = "DXGI_FORMAT_R16_TYPELESS", t[t.DXGI_FORMAT_R16_FLOAT = 54] = "DXGI_FORMAT_R16_FLOAT", t[t.DXGI_FORMAT_D16_UNORM = 55] = "DXGI_FORMAT_D16_UNORM", t[t.DXGI_FORMAT_R16_UNORM = 56] = "DXGI_FORMAT_R16_UNORM", t[t.DXGI_FORMAT_R16_UINT = 57] = "DXGI_FORMAT_R16_UINT", t[t.DXGI_FORMAT_R16_SNORM = 58] = "DXGI_FORMAT_R16_SNORM", t[t.DXGI_FORMAT_R16_SINT = 59] = "DXGI_FORMAT_R16_SINT", t[t.DXGI_FORMAT_R8_TYPELESS = 60] = "DXGI_FORMAT_R8_TYPELESS", t[t.DXGI_FORMAT_R8_UNORM = 61] = "DXGI_FORMAT_R8_UNORM", t[t.DXGI_FORMAT_R8_UINT = 62] = "DXGI_FORMAT_R8_UINT", t[t.DXGI_FORMAT_R8_SNORM = 63] = "DXGI_FORMAT_R8_SNORM", t[t.DXGI_FORMAT_R8_SINT = 64] = "DXGI_FORMAT_R8_SINT", t[t.DXGI_FORMAT_A8_UNORM = 65] = "DXGI_FORMAT_A8_UNORM", t[t.DXGI_FORMAT_R1_UNORM = 66] = "DXGI_FORMAT_R1_UNORM", t[t.DXGI_FORMAT_R9G9B9E5_SHAREDEXP = 67] = "DXGI_FORMAT_R9G9B9E5_SHAREDEXP", t[t.DXGI_FORMAT_R8G8_B8G8_UNORM = 68] = "DXGI_FORMAT_R8G8_B8G8_UNORM", t[t.DXGI_FORMAT_G8R8_G8B8_UNORM = 69] = "DXGI_FORMAT_G8R8_G8B8_UNORM", t[t.DXGI_FORMAT_BC1_TYPELESS = 70] = "DXGI_FORMAT_BC1_TYPELESS", t[t.DXGI_FORMAT_BC1_UNORM = 71] = "DXGI_FORMAT_BC1_UNORM", t[t.DXGI_FORMAT_BC1_UNORM_SRGB = 72] = "DXGI_FORMAT_BC1_UNORM_SRGB", t[t.DXGI_FORMAT_BC2_TYPELESS = 73] = "DXGI_FORMAT_BC2_TYPELESS", t[t.DXGI_FORMAT_BC2_UNORM = 74] = "DXGI_FORMAT_BC2_UNORM", t[t.DXGI_FORMAT_BC2_UNORM_SRGB = 75] = "DXGI_FORMAT_BC2_UNORM_SRGB", t[t.DXGI_FORMAT_BC3_TYPELESS = 76] = "DXGI_FORMAT_BC3_TYPELESS", t[t.DXGI_FORMAT_BC3_UNORM = 77] = "DXGI_FORMAT_BC3_UNORM", t[t.DXGI_FORMAT_BC3_UNORM_SRGB = 78] = "DXGI_FORMAT_BC3_UNORM_SRGB", t[t.DXGI_FORMAT_BC4_TYPELESS = 79] = "DXGI_FORMAT_BC4_TYPELESS", t[t.DXGI_FORMAT_BC4_UNORM = 80] = "DXGI_FORMAT_BC4_UNORM", t[t.DXGI_FORMAT_BC4_SNORM = 81] = "DXGI_FORMAT_BC4_SNORM", t[t.DXGI_FORMAT_BC5_TYPELESS = 82] = "DXGI_FORMAT_BC5_TYPELESS", t[t.DXGI_FORMAT_BC5_UNORM = 83] = "DXGI_FORMAT_BC5_UNORM", t[t.DXGI_FORMAT_BC5_SNORM = 84] = "DXGI_FORMAT_BC5_SNORM", t[t.DXGI_FORMAT_B5G6R5_UNORM = 85] = "DXGI_FORMAT_B5G6R5_UNORM", t[t.DXGI_FORMAT_B5G5R5A1_UNORM = 86] = "DXGI_FORMAT_B5G5R5A1_UNORM", t[t.DXGI_FORMAT_B8G8R8A8_UNORM = 87] = "DXGI_FORMAT_B8G8R8A8_UNORM", t[t.DXGI_FORMAT_B8G8R8X8_UNORM = 88] = "DXGI_FORMAT_B8G8R8X8_UNORM", t[t.DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM = 89] = "DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM", t[t.DXGI_FORMAT_B8G8R8A8_TYPELESS = 90] = "DXGI_FORMAT_B8G8R8A8_TYPELESS", t[t.DXGI_FORMAT_B8G8R8A8_UNORM_SRGB = 91] = "DXGI_FORMAT_B8G8R8A8_UNORM_SRGB", t[t.DXGI_FORMAT_B8G8R8X8_TYPELESS = 92] = "DXGI_FORMAT_B8G8R8X8_TYPELESS", t[t.DXGI_FORMAT_B8G8R8X8_UNORM_SRGB = 93] = "DXGI_FORMAT_B8G8R8X8_UNORM_SRGB", t[t.DXGI_FORMAT_BC6H_TYPELESS = 94] = "DXGI_FORMAT_BC6H_TYPELESS", t[t.DXGI_FORMAT_BC6H_UF16 = 95] = "DXGI_FORMAT_BC6H_UF16", t[t.DXGI_FORMAT_BC6H_SF16 = 96] = "DXGI_FORMAT_BC6H_SF16", t[t.DXGI_FORMAT_BC7_TYPELESS = 97] = "DXGI_FORMAT_BC7_TYPELESS", t[t.DXGI_FORMAT_BC7_UNORM = 98] = "DXGI_FORMAT_BC7_UNORM", t[t.DXGI_FORMAT_BC7_UNORM_SRGB = 99] = "DXGI_FORMAT_BC7_UNORM_SRGB", t[t.DXGI_FORMAT_AYUV = 100] = "DXGI_FORMAT_AYUV", t[t.DXGI_FORMAT_Y410 = 101] = "DXGI_FORMAT_Y410", t[t.DXGI_FORMAT_Y416 = 102] = "DXGI_FORMAT_Y416", t[t.DXGI_FORMAT_NV12 = 103] = "DXGI_FORMAT_NV12", t[t.DXGI_FORMAT_P010 = 104] = "DXGI_FORMAT_P010", t[t.DXGI_FORMAT_P016 = 105] = "DXGI_FORMAT_P016", t[t.DXGI_FORMAT_420_OPAQUE = 106] = "DXGI_FORMAT_420_OPAQUE", t[t.DXGI_FORMAT_YUY2 = 107] = "DXGI_FORMAT_YUY2", t[t.DXGI_FORMAT_Y210 = 108] = "DXGI_FORMAT_Y210", t[t.DXGI_FORMAT_Y216 = 109] = "DXGI_FORMAT_Y216", t[t.DXGI_FORMAT_NV11 = 110] = "DXGI_FORMAT_NV11", t[t.DXGI_FORMAT_AI44 = 111] = "DXGI_FORMAT_AI44", t[t.DXGI_FORMAT_IA44 = 112] = "DXGI_FORMAT_IA44", t[t.DXGI_FORMAT_P8 = 113] = "DXGI_FORMAT_P8", t[t.DXGI_FORMAT_A8P8 = 114] = "DXGI_FORMAT_A8P8", t[t.DXGI_FORMAT_B4G4R4A4_UNORM = 115] = "DXGI_FORMAT_B4G4R4A4_UNORM", t[t.DXGI_FORMAT_P208 = 116] = "DXGI_FORMAT_P208", t[t.DXGI_FORMAT_V208 = 117] = "DXGI_FORMAT_V208", t[t.DXGI_FORMAT_V408 = 118] = "DXGI_FORMAT_V408", t[t.DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE = 119] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE", t[t.DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE = 120] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE", t[t.DXGI_FORMAT_FORCE_UINT = 121] = "DXGI_FORMAT_FORCE_UINT";
}(Cs || (Cs = {
})), (function(t) {
    t[t.DDS_DIMENSION_TEXTURE1D = 2] = "DDS_DIMENSION_TEXTURE1D", t[t.DDS_DIMENSION_TEXTURE2D = 3] = "DDS_DIMENSION_TEXTURE2D", t[t.DDS_DIMENSION_TEXTURE3D = 6] = "DDS_DIMENSION_TEXTURE3D";
})(ws || (ws = {
}));
var Ls, Fs, Us, Gs = ((Ss = {
})[827611204] = Es.COMPRESSED_RGBA_S3TC_DXT1_EXT, Ss[861165636] = Es.COMPRESSED_RGBA_S3TC_DXT3_EXT, Ss[894720068] = Es.COMPRESSED_RGBA_S3TC_DXT5_EXT, Ss), Bs = ((Is = {
})[Cs.DXGI_FORMAT_BC1_TYPELESS] = Es.COMPRESSED_RGBA_S3TC_DXT1_EXT, Is[Cs.DXGI_FORMAT_BC1_UNORM] = Es.COMPRESSED_RGBA_S3TC_DXT1_EXT, Is[Cs.DXGI_FORMAT_BC2_TYPELESS] = Es.COMPRESSED_RGBA_S3TC_DXT3_EXT, Is[Cs.DXGI_FORMAT_BC2_UNORM] = Es.COMPRESSED_RGBA_S3TC_DXT3_EXT, Is[Cs.DXGI_FORMAT_BC3_TYPELESS] = Es.COMPRESSED_RGBA_S3TC_DXT5_EXT, Is[Cs.DXGI_FORMAT_BC3_UNORM] = Es.COMPRESSED_RGBA_S3TC_DXT5_EXT, Is[Cs.DXGI_FORMAT_BC1_UNORM_SRGB] = Es.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT, Is[Cs.DXGI_FORMAT_BC2_UNORM_SRGB] = Es.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT, Is[Cs.DXGI_FORMAT_BC3_UNORM_SRGB] = Es.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT, Is), Xs = function() {
    function t() {
    }
    return t.use = function(e, r) {
        if ("dds" === e.extension && e.data) try {
            Object.assign(e, Ds(e.name || e.url, t.parse(e.data), e.metadata));
        } catch (t2) {
            return void r(t2);
        }
        r();
    }, t.parse = function(t) {
        var e = new Uint32Array(t);
        if (542327876 !== e[0]) throw new Error("Invalid DDS file magic word");
        var r = new Uint32Array(t, 0, 124 / Uint32Array.BYTES_PER_ELEMENT), i = r[3], n = r[4], o = r[7], s = new Uint32Array(t, 19 * Uint32Array.BYTES_PER_ELEMENT, 32 / Uint32Array.BYTES_PER_ELEMENT), a = s[1];
        if (4 & a) {
            var h = s[2];
            if (808540228 !== h) {
                var u = Gs[h], l = new Uint8Array(t, 128);
                return [
                    new Ns(l, {
                        format: u,
                        width: n,
                        height: i,
                        levels: o
                    })
                ];
            }
            var c = new Uint32Array(e.buffer, 128, 20 / Uint32Array.BYTES_PER_ELEMENT), d = c[0], f = c[1], p = c[2], _ = c[3], m = Bs[d];
            if (void 0 === m) throw new Error("DDSLoader cannot parse texture data with DXGI format " + d);
            if (4 === p) throw new Error("DDSLoader does not support cubemap textures");
            if (f === ws.DDS_DIMENSION_TEXTURE3D) throw new Error("DDSLoader does not supported 3D texture data");
            var v = new Array;
            if (1 === _) v.push(new Uint8Array(t, 148));
            else {
                for(var y = Rs[m], g = 0, E = n, T = i, b = 0; b < o; b++)g += Math.max(1, E + 3 & -4) * Math.max(1, T + 3 & -4) * y, E >>>= 1, T >>>= 1;
                var x = 148;
                for(b = 0; b < _; b++)v.push(new Uint8Array(t, x, g)), x += g;
            }
            return v.map(function(t) {
                return new Ns(t, {
                    format: m,
                    width: n,
                    height: i,
                    levels: o
                });
            });
        }
        if (64 & a) throw new Error("DDSLoader does not support uncompressed texture data.");
        if (512 & a) throw new Error("DDSLoader does not supported YUV uncompressed texture data.");
        if (131072 & a) throw new Error("DDSLoader does not support single-channel (lumninance) texture data!");
        if (2 & a) throw new Error("DDSLoader does not support single-channel (alpha) texture data!");
        throw new Error("DDSLoader failed to load a texture file due to an unknown reason!");
    }, t;
}();
ds.setExtensionXhrType("ktx", ds.XHR_RESPONSE_TYPE.BUFFER);
var ks = [
    171,
    75,
    84,
    88,
    32,
    49,
    49,
    187,
    13,
    10,
    26,
    10
], Hs = ((Ls = {
})[le.UNSIGNED_BYTE] = 1, Ls[le.UNSIGNED_SHORT] = 2, Ls[le.FLOAT] = 4, Ls[le.HALF_FLOAT] = 8, Ls), js = ((Fs = {
})[he.RGBA] = 4, Fs[he.RGB] = 3, Fs[he.LUMINANCE] = 1, Fs[he.LUMINANCE_ALPHA] = 2, Fs[he.ALPHA] = 1, Fs), Ys = ((Us = {
})[le.UNSIGNED_SHORT_4_4_4_4] = 2, Us[le.UNSIGNED_SHORT_5_5_5_1] = 2, Us[le.UNSIGNED_SHORT_5_6_5] = 2, Us), Vs = function() {
    function t() {
    }
    return t.use = function(e, r) {
        if ("ktx" === e.extension && e.data) try {
            var i = e.name || e.url;
            Object.assign(e, Ds(i, t.parse(i, e.data), e.metadata));
        } catch (t2) {
            return void r(t2);
        }
        r();
    }, t.parse = function(e, r) {
        var i = new DataView(r);
        if (!t.validate(e, i)) return null;
        var n = 67305985 === i.getUint32(12, !0), o = i.getUint32(16, n), s = i.getUint32(24, n), a = i.getUint32(28, n), h = i.getUint32(36, n), u = i.getUint32(40, n) || 1, l = i.getUint32(44, n) || 1, c = i.getUint32(48, n) || 1, d = i.getUint32(52, n), f = i.getUint32(56, n), p = i.getUint32(60, n);
        if (0 === u || 1 !== l) throw new Error("Only 2D textures are supported");
        if (1 !== d) throw new Error("CubeTextures are not supported by KTXLoader yet!");
        if (1 !== c) throw new Error("WebGL does not support array textures");
        var _, m = h + 3 & -4, v = u + 3 & -4, y = new Array(c), g = h * u;
        if (0 === o && (g = m * v), void 0 === (_ = 0 !== o ? Hs[o] ? Hs[o] * js[s] : Ys[o] : Rs[a])) throw new Error("Unable to resolve the pixel format stored in the *.ktx file!");
        for(var E = g * _, T = h, b = u, x = m, R = v, A = 64 + p, O = 0; O < f; O++){
            for(var S = i.getUint32(A, n), I = A + 4, P = 0; P < c; P++){
                var N = y[P];
                N || (N = y[P] = new Array(f)), N[O] = {
                    levelID: O,
                    levelWidth: f > 1 ? T : x,
                    levelHeight: f > 1 ? b : R,
                    levelBuffer: new Uint8Array(r, I, E)
                }, I += E;
            }
            A = (A += S + 4) % 4 != 0 ? A + 4 - A % 4 : A, E = (x = (T = T >> 1 || 1) + 4 - 1 & -4) * (R = (b = b >> 1 || 1) + 4 - 1 & -4) * _;
        }
        if (0 !== o) throw new Error("TODO: Uncompressed");
        return y.map(function(t) {
            return new Ns(null, {
                format: a,
                width: h,
                height: u,
                levels: f,
                levelBuffers: t
            });
        });
    }, t.validate = function(t, e) {
        for(var r = 0; r < ks.length; r++)if (e.getUint8(r) !== ks[r]) return !1;
        return !0;
    }, t;
}(), Ws = function(t, e) {
    return (Ws = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
};
function zs(t, e) {
    function r() {
        this.constructor = t;
    }
    Ws(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
}
var qs, Ks, Zs = function(t) {
    function e(e, r, i, n) {
        void 0 === e && (e = 1500), void 0 === i && (i = 16384), void 0 === n && (n = !1);
        var o = t.call(this) || this;
        return i > 16384 && (i = 16384), o._properties = [
            !1,
            !0,
            !1,
            !1,
            !1
        ], o._maxSize = e, o._batchSize = i, o._buffers = null, o._bufferUpdateIDs = [], o._updateID = 0, o.interactiveChildren = !1, o.blendMode = se.NORMAL, o.autoResize = n, o.roundPixels = !0, o.baseTexture = null, o.setProperties(r), o._tint = 0, o.tintRgb = new Float32Array(4), o.tint = 16777215, o;
    }
    return zs(e, t), e.prototype.setProperties = function(t) {
        t && (this._properties[0] = "vertices" in t || "scale" in t ? !!t.vertices || !!t.scale : this._properties[0], this._properties[1] = "position" in t ? !!t.position : this._properties[1], this._properties[2] = "rotation" in t ? !!t.rotation : this._properties[2], this._properties[3] = "uvs" in t ? !!t.uvs : this._properties[3], this._properties[4] = "tint" in t || "alpha" in t ? !!t.tint || !!t.alpha : this._properties[4]);
    }, e.prototype.updateTransform = function() {
        this.displayObjectUpdateTransform();
    }, Object.defineProperty(e.prototype, "tint", {
        get: function() {
            return this._tint;
        },
        set: function(t) {
            this._tint = t, Pe(t, this.tintRgb);
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.render = function(t) {
        var e = this;
        this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable && (this.baseTexture || (this.baseTexture = this.children[0]._texture.baseTexture, this.baseTexture.valid || this.baseTexture.once("update", function() {
            return e.onChildrenChange(0);
        })), t.batch.setObjectRenderer(t.plugins.particle), t.plugins.particle.render(this));
    }, e.prototype.onChildrenChange = function(t) {
        for(var e1 = Math.floor(t / this._batchSize); this._bufferUpdateIDs.length < e1;)this._bufferUpdateIDs.push(0);
        this._bufferUpdateIDs[e1] = ++this._updateID;
    }, e.prototype.dispose = function() {
        if (this._buffers) {
            for(var t = 0; t < this._buffers.length; ++t)this._buffers[t].destroy();
            this._buffers = null;
        }
    }, e.prototype.destroy = function(e) {
        t.prototype.destroy.call(this, e), this.dispose(), this._properties = null, this._buffers = null, this._bufferUpdateIDs = null;
    }, e;
}(Zr), Js = function() {
    function t(t, e, r) {
        this.geometry = new Qi, this.indexBuffer = null, this.size = r, this.dynamicProperties = [], this.staticProperties = [];
        for(var i = 0; i < t.length; ++i){
            var n = t[i];
            n = {
                attributeName: n.attributeName,
                size: n.size,
                uploadFunction: n.uploadFunction,
                type: n.type || le.FLOAT,
                offset: n.offset
            }, e[i] ? this.dynamicProperties.push(n) : this.staticProperties.push(n);
        }
        this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this._updateID = 0, this.initBuffers();
    }
    return t.prototype.initBuffers = function() {
        var t2 = this.geometry, e = 0;
        this.indexBuffer = new zi(Ue(this.size), !0, !0), t2.addIndex(this.indexBuffer), this.dynamicStride = 0;
        for(var r = 0; r < this.dynamicProperties.length; ++r)(s = this.dynamicProperties[r]).offset = e, e += s.size, this.dynamicStride += s.size;
        var i = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
        this.dynamicData = new Float32Array(i), this.dynamicDataUint32 = new Uint32Array(i), this.dynamicBuffer = new zi(this.dynamicData, !1, !1);
        var n = 0;
        for(this.staticStride = 0, r = 0; r < this.staticProperties.length; ++r)(s = this.staticProperties[r]).offset = n, n += s.size, this.staticStride += s.size;
        var o = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
        for(this.staticData = new Float32Array(o), this.staticDataUint32 = new Uint32Array(o), this.staticBuffer = new zi(this.staticData, !0, !1), r = 0; r < this.dynamicProperties.length; ++r){
            var s = this.dynamicProperties[r];
            t2.addAttribute(s.attributeName, this.dynamicBuffer, 0, s.type === le.UNSIGNED_BYTE, s.type, 4 * this.dynamicStride, 4 * s.offset);
        }
        for(r = 0; r < this.staticProperties.length; ++r)s = this.staticProperties[r], t2.addAttribute(s.attributeName, this.staticBuffer, 0, s.type === le.UNSIGNED_BYTE, s.type, 4 * this.staticStride, 4 * s.offset);
    }, t.prototype.uploadDynamic = function(t, e, r) {
        for(var i = 0; i < this.dynamicProperties.length; i++){
            var n = this.dynamicProperties[i];
            n.uploadFunction(t, e, r, n.type === le.UNSIGNED_BYTE ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, n.offset);
        }
        this.dynamicBuffer._updateID++;
    }, t.prototype.uploadStatic = function(t, e, r) {
        for(var i = 0; i < this.staticProperties.length; i++){
            var n = this.staticProperties[i];
            n.uploadFunction(t, e, r, n.type === le.UNSIGNED_BYTE ? this.staticDataUint32 : this.staticData, this.staticStride, n.offset);
        }
        this.staticBuffer._updateID++;
    }, t.prototype.destroy = function() {
        this.indexBuffer = null, this.dynamicProperties = null, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this.staticProperties = null, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.geometry.destroy();
    }, t;
}(), Qs = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;\n    gl_FragColor = color;\n}", $s = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nattribute vec2 aPositionCoord;\nattribute float aRotation;\n\nuniform mat3 translationMatrix;\nuniform vec4 uColor;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void){\n    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);\n    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);\n\n    vec2 v = vec2(x, y);\n    v = v + aPositionCoord;\n\n    gl_Position = vec4((translationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vColor = aColor * uColor;\n}\n", ta = function(t) {
    function e(e) {
        var r = t.call(this, e) || this;
        return r.shader = null, r.properties = null, r.tempMatrix = new _r, r.properties = [
            {
                attributeName: "aVertexPosition",
                size: 2,
                uploadFunction: r.uploadVertices,
                offset: 0
            },
            {
                attributeName: "aPositionCoord",
                size: 2,
                uploadFunction: r.uploadPosition,
                offset: 0
            },
            {
                attributeName: "aRotation",
                size: 1,
                uploadFunction: r.uploadRotation,
                offset: 0
            },
            {
                attributeName: "aTextureCoord",
                size: 2,
                uploadFunction: r.uploadUvs,
                offset: 0
            },
            {
                attributeName: "aColor",
                size: 1,
                type: le.UNSIGNED_BYTE,
                uploadFunction: r.uploadTint,
                offset: 0
            }
        ], r.shader = Hn.from($s, Qs, {
        }), r.state = jn.for2d(), r;
    }
    return zs(e, t), e.prototype.render = function(t) {
        var e1 = t.children, r = t._maxSize, i = t._batchSize, n = this.renderer, o = e1.length;
        if (0 !== o) {
            o > r && !t.autoResize && (o = r);
            var s = t._buffers;
            s || (s = t._buffers = this.generateBuffers(t));
            var a = e1[0]._texture.baseTexture;
            this.state.blendMode = Ce(t.blendMode, a.alphaMode), n.state.set(this.state);
            var h = n.gl, u = t.worldTransform.copyTo(this.tempMatrix);
            u.prepend(n.globalUniforms.uniforms.projectionMatrix), this.shader.uniforms.translationMatrix = u.toArray(!0), this.shader.uniforms.uColor = we(t.tintRgb, t.worldAlpha, this.shader.uniforms.uColor, a.alphaMode), this.shader.uniforms.uSampler = a, this.renderer.shader.bind(this.shader);
            for(var l = !1, c = 0, d = 0; c < o; c += i, d += 1){
                var f = o - c;
                f > i && (f = i), d >= s.length && s.push(this._generateOneMoreBuffer(t));
                var p = s[d];
                p.uploadDynamic(e1, c, f);
                var _ = t._bufferUpdateIDs[d] || 0;
                (l = l || p._updateID < _) && (p._updateID = t._updateID, p.uploadStatic(e1, c, f)), n.geometry.bind(p.geometry), h.drawElements(h.TRIANGLES, 6 * f, h.UNSIGNED_SHORT, 0);
            }
        }
    }, e.prototype.generateBuffers = function(t) {
        for(var e1 = [], r = t._maxSize, i = t._batchSize, n = t._properties, o = 0; o < r; o += i)e1.push(new Js(this.properties, n, i));
        return e1;
    }, e.prototype._generateOneMoreBuffer = function(t) {
        var e1 = t._batchSize, r = t._properties;
        return new Js(this.properties, r, e1);
    }, e.prototype.uploadVertices = function(t, e, r, i, n, o) {
        for(var s = 0, a = 0, h = 0, u = 0, l = 0; l < r; ++l){
            var c = t[e + l], d = c._texture, f = c.scale.x, p = c.scale.y, _ = d.trim, m = d.orig;
            _ ? (s = (a = _.x - c.anchor.x * m.width) + _.width, h = (u = _.y - c.anchor.y * m.height) + _.height) : (s = m.width * (1 - c.anchor.x), a = m.width * -c.anchor.x, h = m.height * (1 - c.anchor.y), u = m.height * -c.anchor.y), i[o] = a * f, i[o + 1] = u * p, i[o + n] = s * f, i[o + n + 1] = u * p, i[o + 2 * n] = s * f, i[o + 2 * n + 1] = h * p, i[o + 3 * n] = a * f, i[o + 3 * n + 1] = h * p, o += 4 * n;
        }
    }, e.prototype.uploadPosition = function(t, e, r, i, n, o) {
        for(var s = 0; s < r; s++){
            var a = t[e + s].position;
            i[o] = a.x, i[o + 1] = a.y, i[o + n] = a.x, i[o + n + 1] = a.y, i[o + 2 * n] = a.x, i[o + 2 * n + 1] = a.y, i[o + 3 * n] = a.x, i[o + 3 * n + 1] = a.y, o += 4 * n;
        }
    }, e.prototype.uploadRotation = function(t, e, r, i, n, o) {
        for(var s = 0; s < r; s++){
            var a = t[e + s].rotation;
            i[o] = a, i[o + n] = a, i[o + 2 * n] = a, i[o + 3 * n] = a, o += 4 * n;
        }
    }, e.prototype.uploadUvs = function(t, e, r, i, n, o) {
        for(var s = 0; s < r; ++s){
            var a = t[e + s]._texture._uvs;
            a ? (i[o] = a.x0, i[o + 1] = a.y0, i[o + n] = a.x1, i[o + n + 1] = a.y1, i[o + 2 * n] = a.x2, i[o + 2 * n + 1] = a.y2, i[o + 3 * n] = a.x3, i[o + 3 * n + 1] = a.y3, o += 4 * n) : (i[o] = 0, i[o + 1] = 0, i[o + n] = 0, i[o + n + 1] = 0, i[o + 2 * n] = 0, i[o + 2 * n + 1] = 0, i[o + 3 * n] = 0, i[o + 3 * n + 1] = 0, o += 4 * n);
        }
    }, e.prototype.uploadTint = function(t, e, r, i, n, o) {
        for(var s = 0; s < r; ++s){
            var a = t[e + s], h = a._texture.baseTexture.alphaMode > 0, u = a.alpha, l = u < 1 && h ? Le(a._tintRGB, u) : a._tintRGB + (255 * u << 24);
            i[o] = l, i[o + n] = l, i[o + 2 * n] = l, i[o + 3 * n] = l, o += 4 * n;
        }
    }, e.prototype.destroy = function() {
        t.prototype.destroy.call(this), this.shader && (this.shader.destroy(), this.shader = null), this.tempMatrix = null;
    }, e;
}(hn);
!function(t) {
    t.MITER = "miter", t.BEVEL = "bevel", t.ROUND = "round";
}(qs || (qs = {
})), (function(t) {
    t.BUTT = "butt", t.ROUND = "round", t.SQUARE = "square";
})(Ks || (Ks = {
}));
var ea = {
    adaptive: !0,
    maxLength: 10,
    minSegments: 8,
    maxSegments: 2048,
    epsilon: 0.0001,
    _segmentsCount: function(t, e) {
        if (void 0 === e && (e = 20), !this.adaptive || !t || isNaN(t)) return e;
        var r1 = Math.ceil(t / this.maxLength);
        return r1 < this.minSegments ? r1 = this.minSegments : r1 > this.maxSegments && (r1 = this.maxSegments), r1;
    }
}, ra = function() {
    function t() {
        this.color = 16777215, this.alpha = 1, this.texture = ki.WHITE, this.matrix = null, this.visible = !1, this.reset();
    }
    return t.prototype.clone = function() {
        var e = new t;
        return e.color = this.color, e.alpha = this.alpha, e.texture = this.texture, e.matrix = this.matrix, e.visible = this.visible, e;
    }, t.prototype.reset = function() {
        this.color = 16777215, this.alpha = 1, this.texture = ki.WHITE, this.matrix = null, this.visible = !1;
    }, t.prototype.destroy = function() {
        this.texture = null, this.matrix = null;
    }, t;
}(), ia = function(t, e) {
    return (ia = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
};
function na(t, e) {
    function r() {
        this.constructor = t;
    }
    ia(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
}
var oa = {
    build: function(t) {
        t.points = t.shape.points.slice();
    },
    triangulate: function(t, e) {
        var r1 = t.points, i = t.holes, n = e.points, o = e.indices;
        if (r1.length >= 6) {
            for(var s = [], a = 0; a < i.length; a++){
                var h = i[a];
                s.push(r1.length / 2), r1 = r1.concat(h.points);
            }
            var u = ot(r1, s, 2);
            if (!u) return;
            var l = n.length / 2;
            for(a = 0; a < u.length; a += 3)o.push(u[a] + l), o.push(u[a + 1] + l), o.push(u[a + 2] + l);
            for(a = 0; a < r1.length; a++)n.push(r1[a]);
        }
    }
}, sa = {
    build: function(t) {
        var e1, r1, i1 = t.shape, n1 = t.points, o = i1.x, s = i1.y;
        if (n1.length = 0, t.type === ir.CIRC) e1 = i1.radius, r1 = i1.radius;
        else {
            var a = t.shape;
            e1 = a.width, r1 = a.height;
        }
        if (0 !== e1 && 0 !== r1) {
            var h = Math.floor(30 * Math.sqrt(i1.radius)) || Math.floor(15 * Math.sqrt(e1 + r1));
            h /= 2.3;
            for(var u = 2 * Math.PI / h, l = 0; l < h - 0.5; l++)n1.push(o + Math.sin(-u * l) * e1, s + Math.cos(-u * l) * r1);
            n1.push(n1[0], n1[1]);
        }
    },
    triangulate: function(t, e) {
        var r1 = t.points, i1 = e.points, n1 = e.indices, o1 = i1.length / 2, s1 = o1, a1 = t.shape, h1 = t.matrix, u1 = a1.x, l1 = a1.y;
        i1.push(t.matrix ? h1.a * u1 + h1.c * l1 + h1.tx : u1, t.matrix ? h1.b * u1 + h1.d * l1 + h1.ty : l1);
        for(var c1 = 0; c1 < r1.length; c1 += 2)i1.push(r1[c1], r1[c1 + 1]), n1.push(o1++, s1, o1);
    }
}, aa = {
    build: function(t) {
        var e1 = t.shape, r1 = e1.x, i1 = e1.y, n1 = e1.width, o1 = e1.height, s1 = t.points;
        s1.length = 0, s1.push(r1, i1, r1 + n1, i1, r1 + n1, i1 + o1, r1, i1 + o1);
    },
    triangulate: function(t, e) {
        var r1 = t.points, i1 = e.points, n1 = i1.length / 2;
        i1.push(r1[0], r1[1], r1[2], r1[3], r1[6], r1[7], r1[4], r1[5]), e.indices.push(n1, n1 + 1, n1 + 2, n1 + 1, n1 + 2, n1 + 3);
    }
};
function ha(t, e, r) {
    return t + (e - t) * r;
}
function ua(t, e, r, i, n, o, s) {
    void 0 === s && (s = []);
    for(var a1 = s, h1 = 0, u1 = 0, l1 = 0, c1 = 0, d1 = 0, f1 = 0, p = 0, _1 = 0; p <= 20; ++p)h1 = ha(t, r, _1 = p / 20), u1 = ha(e, i, _1), l1 = ha(r, n, _1), c1 = ha(i, o, _1), d1 = ha(h1, l1, _1), f1 = ha(u1, c1, _1), 0 === p && a1[a1.length - 2] === d1 && a1[a1.length - 1] === f1 || a1.push(d1, f1);
    return a1;
}
var la = {
    build: function(t) {
        var e1 = t.shape, r1 = t.points, i1 = e1.x, n1 = e1.y, o1 = e1.width, s1 = e1.height, a1 = Math.max(0, Math.min(e1.radius, Math.min(o1, s1) / 2));
        r1.length = 0, a1 ? (ua(i1, n1 + a1, i1, n1, i1 + a1, n1, r1), ua(i1 + o1 - a1, n1, i1 + o1, n1, i1 + o1, n1 + a1, r1), ua(i1 + o1, n1 + s1 - a1, i1 + o1, n1 + s1, i1 + o1 - a1, n1 + s1, r1), ua(i1 + a1, n1 + s1, i1, n1 + s1, i1, n1 + s1 - a1, r1)) : r1.push(i1, n1, i1 + o1, n1, i1 + o1, n1 + s1, i1, n1 + s1);
    },
    triangulate: function(t, e) {
        for(var r1 = t.points, i1 = e.points, n1 = e.indices, o1 = i1.length / 2, s1 = ot(r1, null, 2), a1 = 0, h1 = s1.length; a1 < h1; a1 += 3)n1.push(s1[a1] + o1), n1.push(s1[a1 + 1] + o1), n1.push(s1[a1 + 2] + o1);
        for(a1 = 0, h1 = r1.length; a1 < h1; a1++)i1.push(r1[a1], r1[++a1]);
    }
};
function ca(t, e, r, i, n, o, s, a) {
    var h1, u1;
    s ? (h1 = i, u1 = -r) : (h1 = -i, u1 = r);
    var l1 = t - r * n + h1, c1 = e - i * n + u1, d1 = t + r * o + h1, f1 = e + i * o + u1;
    return a.push(l1, c1), a.push(d1, f1), 2;
}
function da(t, e, r, i, n, o, s, a) {
    var h1 = r - t, u1 = i - e, l1 = Math.atan2(h1, u1), c1 = Math.atan2(n - t, o - e);
    a && l1 < c1 ? l1 += 2 * Math.PI : !a && l1 > c1 && (c1 += 2 * Math.PI);
    var d1 = l1, f1 = c1 - l1, p = Math.abs(f1), _1 = Math.sqrt(h1 * h1 + u1 * u1), m1 = 1 + (15 * p * Math.sqrt(_1) / Math.PI >> 0), v1 = f1 / m1;
    if (d1 += v1, a) {
        s.push(t, e), s.push(r, i);
        for(var y = 1, g = d1; y < m1; y++, g += v1)s.push(t, e), s.push(t + Math.sin(g) * _1, e + Math.cos(g) * _1);
        s.push(t, e), s.push(n, o);
    } else {
        for(s.push(r, i), s.push(t, e), y = 1, g = d1; y < m1; y++, g += v1)s.push(t + Math.sin(g) * _1, e + Math.cos(g) * _1), s.push(t, e);
        s.push(n, o), s.push(t, e);
    }
    return 2 * m1;
}
function fa(t, e) {
    t.lineStyle.native ? (function(t, e) {
        var r = 0, i = t.shape, n = t.points || i.points, o = i.type !== ir.POLY || i.closeStroke;
        if (0 !== n.length) {
            var s = e.points, a = e.indices, h = n.length / 2, u = s.length / 2, l = u;
            for(s.push(n[0], n[1]), r = 1; r < h; r++)s.push(n[2 * r], n[2 * r + 1]), a.push(l, l + 1), l++;
            o && a.push(l, u);
        }
    })(t, e) : (function(t, e) {
        var r = t.shape, i = t.points || r.points.slice(), n = e.closePointEps;
        if (0 !== i.length) {
            var o = t.lineStyle, s = new fr(i[0], i[1]), a = new fr(i[i.length - 2], i[i.length - 1]), h = r.type !== ir.POLY || r.closeStroke, u = Math.abs(s.x - a.x) < n && Math.abs(s.y - a.y) < n;
            if (h) {
                i = i.slice(), u && (i.pop(), i.pop(), a.set(i[i.length - 2], i[i.length - 1]));
                var l = 0.5 * (s.x + a.x), c = 0.5 * (a.y + s.y);
                i.unshift(l, c), i.push(l, c);
            }
            var d = e.points, f = i.length / 2, p = i.length, _ = d.length / 2, m = o.width / 2, v = m * m, y = o.miterLimit * o.miterLimit, g = i[0], E = i[1], T = i[2], b = i[3], x = 0, R = 0, A = -(E - b), O = g - T, S = 0, I = 0, P = Math.sqrt(A * A + O * O);
            A /= P, O /= P, A *= m, O *= m;
            var N = o.alignment, M = 2 * (1 - N), D = 2 * N;
            h || (o.cap === Ks.ROUND ? p += da(g - A * (M - D) * 0.5, E - O * (M - D) * 0.5, g - A * M, E - O * M, g + A * D, E + O * D, d, !0) + 2 : o.cap === Ks.SQUARE && (p += ca(g, E, A, O, M, D, !0, d))), d.push(g - A * M, E - O * M), d.push(g + A * D, E + O * D);
            for(var C = 1; C < f - 1; ++C){
                g = i[2 * (C - 1)], E = i[2 * (C - 1) + 1], T = i[2 * C], b = i[2 * C + 1], x = i[2 * (C + 1)], R = i[2 * (C + 1) + 1], A = -(E - b), O = g - T, A /= P = Math.sqrt(A * A + O * O), O /= P, A *= m, O *= m, S = -(b - R), I = T - x, S /= P = Math.sqrt(S * S + I * I), I /= P, S *= m, I *= m;
                var w = T - g, L = E - b, F = T - x, U = R - b, G = L * F - U * w, B = G < 0;
                if (Math.abs(G) < 0.1) d.push(T - A * M, b - O * M), d.push(T + A * D, b + O * D);
                else {
                    var X = (-A + g) * (-O + b) - (-A + T) * (-O + E), k = (-S + x) * (-I + b) - (-S + T) * (-I + R), H = (w * k - F * X) / G, j = (U * X - L * k) / G, Y = (H - T) * (H - T) + (j - b) * (j - b), V = T + (H - T) * M, W = b + (j - b) * M, z = T - (H - T) * D, q = b - (j - b) * D, K = B ? M : D;
                    Y <= Math.min(w * w + L * L, F * F + U * U) + K * K * v ? o.join === qs.BEVEL || Y / v > y ? (B ? (d.push(V, W), d.push(T + A * D, b + O * D), d.push(V, W), d.push(T + S * D, b + I * D)) : (d.push(T - A * M, b - O * M), d.push(z, q), d.push(T - S * M, b - I * M), d.push(z, q)), p += 2) : o.join === qs.ROUND ? B ? (d.push(V, W), d.push(T + A * D, b + O * D), p += da(T, b, T + A * D, b + O * D, T + S * D, b + I * D, d, !0) + 4, d.push(V, W), d.push(T + S * D, b + I * D)) : (d.push(T - A * M, b - O * M), d.push(z, q), p += da(T, b, T - A * M, b - O * M, T - S * M, b - I * M, d, !1) + 4, d.push(T - S * M, b - I * M), d.push(z, q)) : (d.push(V, W), d.push(z, q)) : (d.push(T - A * M, b - O * M), d.push(T + A * D, b + O * D), o.join === qs.BEVEL || Y / v > y || (o.join === qs.ROUND ? p += B ? da(T, b, T + A * D, b + O * D, T + S * D, b + I * D, d, !0) + 2 : da(T, b, T - A * M, b - O * M, T - S * M, b - I * M, d, !1) + 2 : (B ? (d.push(z, q), d.push(z, q)) : (d.push(V, W), d.push(V, W)), p += 2)), d.push(T - S * M, b - I * M), d.push(T + S * D, b + I * D), p += 2);
                }
            }
            g = i[2 * (f - 2)], E = i[2 * (f - 2) + 1], T = i[2 * (f - 1)], A = -(E - (b = i[2 * (f - 1) + 1])), O = g - T, A /= P = Math.sqrt(A * A + O * O), O /= P, A *= m, O *= m, d.push(T - A * M, b - O * M), d.push(T + A * D, b + O * D), h || (o.cap === Ks.ROUND ? p += da(T - A * (M - D) * 0.5, b - O * (M - D) * 0.5, T - A * M, b - O * M, T + A * D, b + O * D, d, !1) + 2 : o.cap === Ks.SQUARE && (p += ca(T, b, A, O, M, D, !1, d)));
            var Z = e.indices, J = ea.epsilon * ea.epsilon;
            for(C = _; C < p + _ - 2; ++C)g = d[2 * C], E = d[2 * C + 1], T = d[2 * (C + 1)], b = d[2 * (C + 1) + 1], x = d[2 * (C + 2)], R = d[2 * (C + 2) + 1], Math.abs(g * (b - R) + T * (R - E) + x * (E - b)) < J || Z.push(C, C + 1, C + 2);
        }
    })(t, e);
}
var pa, _a = function() {
    function t() {
    }
    return t.curveTo = function(t, e, r, i, n, o) {
        var s = o[o.length - 2], a = o[o.length - 1] - e, h = s - t, u = i - e, l = r - t, c = Math.abs(a * l - h * u);
        if (c < 0.00000001 || 0 === n) return o[o.length - 2] === t && o[o.length - 1] === e || o.push(t, e), null;
        var d = a * a + h * h, f = u * u + l * l, p = a * u + h * l, _ = n * Math.sqrt(d) / c, m = n * Math.sqrt(f) / c, v = _ * p / d, y = m * p / f, g = _ * l + m * h, E = _ * u + m * a, T = h * (m + v), b = a * (m + v), x = l * (_ + y), R = u * (_ + y);
        return {
            cx: g + t,
            cy: E + e,
            radius: n,
            startAngle: Math.atan2(b - E, T - g),
            endAngle: Math.atan2(R - E, x - g),
            anticlockwise: h * u > l * a
        };
    }, t.arc = function(t, e, r, i, n, o, s, a, h) {
        for(var u = s - o, l = ea._segmentsCount(Math.abs(u) * n, 40 * Math.ceil(Math.abs(u) / or)), c = u / (2 * l), d = 2 * c, f = Math.cos(c), p = Math.sin(c), _ = l - 1, m = _ % 1 / _, v = 0; v <= _; ++v){
            var y = c + o + d * (v + m * v), g = Math.cos(y), E = -Math.sin(y);
            h.push((f * g + p * E) * n + r, (f * -E + p * g) * n + i);
        }
    }, t;
}(), ma = function() {
    function t() {
    }
    return t.curveLength = function(t, e, r, i, n, o, s, a) {
        for(var h = 0, u = 0, l = 0, c = 0, d = 0, f = 0, p = 0, _ = 0, m = 0, v = 0, y = 0, g = t, E = e, T = 1; T <= 10; ++T)v = g - (_ = (p = (f = (d = 1 - (u = T / 10)) * d) * d) * t + 3 * f * u * r + 3 * d * (l = u * u) * n + (c = l * u) * s), y = E - (m = p * e + 3 * f * u * i + 3 * d * l * o + c * a), g = _, E = m, h += Math.sqrt(v * v + y * y);
        return h;
    }, t.curveTo = function(e, r, i, n, o, s, a) {
        var h = a[a.length - 2], u = a[a.length - 1];
        a.length -= 2;
        var l = ea._segmentsCount(t.curveLength(h, u, e, r, i, n, o, s)), c = 0, d = 0, f = 0, p = 0, _ = 0;
        a.push(h, u);
        for(var m = 1, v = 0; m <= l; ++m)f = (d = (c = 1 - (v = m / l)) * c) * c, _ = (p = v * v) * v, a.push(f * h + 3 * d * v * e + 3 * c * p * i + _ * o, f * u + 3 * d * v * r + 3 * c * p * n + _ * s);
    }, t;
}(), va = function() {
    function t() {
    }
    return t.curveLength = function(t, e, r, i, n, o) {
        var s = t - 2 * r + n, a = e - 2 * i + o, h = 2 * r - 2 * t, u = 2 * i - 2 * e, l = 4 * (s * s + a * a), c = 4 * (s * h + a * u), d = h * h + u * u, f = 2 * Math.sqrt(l + c + d), p = Math.sqrt(l), _ = 2 * l * p, m = 2 * Math.sqrt(d), v = c / p;
        return (_ * f + p * c * (f - m) + (4 * d * l - c * c) * Math.log((2 * p + v + f) / (v + m))) / (4 * _);
    }, t.curveTo = function(e, r, i, n, o) {
        for(var s = o[o.length - 2], a = o[o.length - 1], h = ea._segmentsCount(t.curveLength(s, a, e, r, i, n)), u = 0, l = 0, c = 1; c <= h; ++c){
            var d = c / h;
            u = s + (e - s) * d, l = a + (r - a) * d, o.push(u + (e + (i - e) * d - u) * d, l + (r + (n - r) * d - l) * d);
        }
    }, t;
}(), ya = function() {
    function t() {
        this.reset();
    }
    return t.prototype.begin = function(t, e, r) {
        this.reset(), this.style = t, this.start = e, this.attribStart = r;
    }, t.prototype.end = function(t, e) {
        this.attribSize = e - this.attribStart, this.size = t - this.start;
    }, t.prototype.reset = function() {
        this.style = null, this.size = 0, this.start = 0, this.attribStart = 0, this.attribSize = 0;
    }, t;
}(), ga = ((pa = {
})[ir.POLY] = oa, pa[ir.CIRC] = sa, pa[ir.ELIP] = sa, pa[ir.RECT] = aa, pa[ir.RREC] = la, pa), Ea = [], Ta = [];
function ba(t) {
    for(var e1 = t.points, r1 = 0, i1 = 0; i1 < e1.length - 2; i1 += 2)r1 += (e1[i1 + 2] - e1[i1]) * (e1[i1 + 3] + e1[i1 + 1]);
    return r1 > 0;
}
var xa, Ra = function() {
    function t(t, e, r, i) {
        void 0 === e && (e = null), void 0 === r && (r = null), void 0 === i && (i = null), this.points = [], this.holes = [], this.shape = t, this.lineStyle = r, this.fillStyle = e, this.matrix = i, this.type = t.type;
    }
    return t.prototype.clone = function() {
        return new t(this.shape, this.fillStyle, this.lineStyle, this.matrix);
    }, t.prototype.destroy = function() {
        this.shape = null, this.holes.length = 0, this.holes = null, this.points.length = 0, this.points = null, this.lineStyle = null, this.fillStyle = null;
    }, t;
}(), Aa = new fr, Oa = new Ar, Sa = function(t) {
    function e() {
        var e1 = t.call(this) || this;
        return e1.closePointEps = 0.0001, e1.boundsPadding = 0, e1.uvsFloat32 = null, e1.indicesUint16 = null, e1.batchable = !1, e1.points = [], e1.colors = [], e1.uvs = [], e1.indices = [], e1.textureIds = [], e1.graphicsData = [], e1.drawCalls = [], e1.batchDirty = -1, e1.batches = [], e1.dirty = 0, e1.cacheDirty = -1, e1.clearDirty = 0, e1.shapeIndex = 0, e1._bounds = new Ar, e1.boundsDirty = -1, e1;
    }
    return na(e, t), Object.defineProperty(e.prototype, "bounds", {
        get: function() {
            return this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.calculateBounds()), this._bounds;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.invalidate = function() {
        this.boundsDirty = -1, this.dirty++, this.batchDirty++, this.shapeIndex = 0, this.points.length = 0, this.colors.length = 0, this.uvs.length = 0, this.indices.length = 0, this.textureIds.length = 0;
        for(var t2 = 0; t2 < this.drawCalls.length; t2++)this.drawCalls[t2].texArray.clear(), Ta.push(this.drawCalls[t2]);
        for(this.drawCalls.length = 0, t2 = 0; t2 < this.batches.length; t2++){
            var e = this.batches[t2];
            e.reset(), Ea.push(e);
        }
        this.batches.length = 0;
    }, e.prototype.clear = function() {
        return this.graphicsData.length > 0 && (this.invalidate(), this.clearDirty++, this.graphicsData.length = 0), this;
    }, e.prototype.drawShape = function(t, e, r, i) {
        void 0 === e && (e = null), void 0 === r && (r = null), void 0 === i && (i = null);
        var n = new Ra(t, e, r, i);
        return this.graphicsData.push(n), this.dirty++, this;
    }, e.prototype.drawHole = function(t, e) {
        if (void 0 === e && (e = null), !this.graphicsData.length) return null;
        var r = new Ra(t, null, null, e), i = this.graphicsData[this.graphicsData.length - 1];
        return r.lineStyle = i.lineStyle, i.holes.push(r), this.dirty++, this;
    }, e.prototype.destroy = function() {
        t.prototype.destroy.call(this);
        for(var e1 = 0; e1 < this.graphicsData.length; ++e1)this.graphicsData[e1].destroy();
        this.points.length = 0, this.points = null, this.colors.length = 0, this.colors = null, this.uvs.length = 0, this.uvs = null, this.indices.length = 0, this.indices = null, this.indexBuffer.destroy(), this.indexBuffer = null, this.graphicsData.length = 0, this.graphicsData = null, this.drawCalls.length = 0, this.drawCalls = null, this.batches.length = 0, this.batches = null, this._bounds = null;
    }, e.prototype.containsPoint = function(t) {
        for(var e1 = this.graphicsData, r = 0; r < e1.length; ++r){
            var i = e1[r];
            if (i.fillStyle.visible && i.shape && (i.matrix ? i.matrix.applyInverse(t, Aa) : Aa.copyFrom(t), i.shape.contains(Aa.x, Aa.y))) {
                var n = !1;
                if (i.holes) {
                    for(var o = 0; o < i.holes.length; o++)if (i.holes[o].shape.contains(Aa.x, Aa.y)) {
                        n = !0;
                        break;
                    }
                }
                if (!n) return !0;
            }
        }
        return !1;
    }, e.prototype.updateBatches = function(t) {
        if (this.graphicsData.length) {
            if (this.validateBatching()) {
                this.cacheDirty = this.dirty;
                var e = this.uvs, r = this.graphicsData, i = null, n = null;
                this.batches.length > 0 && (n = (i = this.batches[this.batches.length - 1]).style);
                for(var o = this.shapeIndex; o < r.length; o++){
                    this.shapeIndex++;
                    var s = r[o], a = s.fillStyle, h = s.lineStyle;
                    ga[s.type].build(s), s.matrix && this.transformPoints(s.points, s.matrix);
                    for(var u = 0; u < 2; u++){
                        var l = 0 === u ? a : h;
                        if (l.visible) {
                            var c = l.texture.baseTexture, d = this.indices.length, f = this.points.length / 2;
                            c.wrapMode = fe.REPEAT, 0 === u ? this.processFill(s) : this.processLine(s);
                            var p = this.points.length / 2 - f;
                            0 !== p && (i && !this._compareStyles(n, l) && (i.end(d, f), i = null), i || ((i = Ea.pop() || new ya).begin(l, d, f), this.batches.push(i), n = l), this.addUvs(this.points, e, l.texture, f, p, l.matrix));
                        }
                    }
                }
                var _ = this.indices.length, m = this.points.length / 2;
                if (i && i.end(_, m), 0 !== this.batches.length) {
                    if (this.indicesUint16 && this.indices.length === this.indicesUint16.length) this.indicesUint16.set(this.indices);
                    else {
                        var v = m > 65535 && t;
                        this.indicesUint16 = v ? new Uint32Array(this.indices) : new Uint16Array(this.indices);
                    }
                    this.batchable = this.isBatchable(), this.batchable ? this.packBatches() : this.buildDrawCalls();
                } else this.batchable = !0;
            }
        } else this.batchable = !0;
    }, e.prototype._compareStyles = function(t, e) {
        return !(!t || !e) && t.texture.baseTexture === e.texture.baseTexture && t.color + t.alpha === e.color + e.alpha && !!t.native == !!e.native;
    }, e.prototype.validateBatching = function() {
        if (this.dirty === this.cacheDirty || !this.graphicsData.length) return !1;
        for(var t2 = 0, e1 = this.graphicsData.length; t2 < e1; t2++){
            var r = this.graphicsData[t2], i = r.fillStyle, n = r.lineStyle;
            if (i && !i.texture.baseTexture.valid) return !1;
            if (n && !n.texture.baseTexture.valid) return !1;
        }
        return !0;
    }, e.prototype.packBatches = function() {
        this.batchDirty++, this.uvsFloat32 = new Float32Array(this.uvs);
        for(var t2 = this.batches, e1 = 0, r = t2.length; e1 < r; e1++)for(var i = t2[e1], n = 0; n < i.size; n++){
            var o = i.start + n;
            this.indicesUint16[o] = this.indicesUint16[o] - i.attribStart;
        }
    }, e.prototype.isBatchable = function() {
        if (this.points.length > 131070) return !1;
        for(var t2 = this.batches, r = 0; r < t2.length; r++)if (t2[r].style.native) return !1;
        return this.points.length < 2 * e.BATCHABLE_SIZE;
    }, e.prototype.buildDrawCalls = function() {
        for(var t2 = ++Ai._globalBatch, e1 = 0; e1 < this.drawCalls.length; e1++)this.drawCalls[e1].texArray.clear(), Ta.push(this.drawCalls[e1]);
        this.drawCalls.length = 0;
        var r = this.colors, i = this.textureIds, n = Ta.pop();
        n || ((n = new Go).texArray = new Bo), n.texArray.count = 0, n.start = 0, n.size = 0, n.type = ae.TRIANGLES;
        var o = 0, s = null, a = 0, h = !1, u = ae.TRIANGLES, l = 0;
        for(this.drawCalls.push(n), e1 = 0; e1 < this.batches.length; e1++){
            var c = this.batches[e1], d = c.style, f = d.texture.baseTexture;
            h !== !!d.native && (u = (h = !!d.native) ? ae.LINES : ae.TRIANGLES, s = null, o = 8, t2++), s !== f && (s = f, f._batchEnabled !== t2 && (8 === o && (t2++, o = 0, n.size > 0 && ((n = Ta.pop()) || ((n = new Go).texArray = new Bo), this.drawCalls.push(n)), n.start = l, n.size = 0, n.texArray.count = 0, n.type = u), f.touched = 1, f._batchEnabled = t2, f._batchLocation = o, f.wrapMode = fe.REPEAT, n.texArray.elements[n.texArray.count++] = f, o++)), n.size += c.size, l += c.size, a = f._batchLocation, this.addColors(r, d.color, d.alpha, c.attribSize, c.attribStart), this.addTextureIds(i, a, c.attribSize, c.attribStart);
        }
        Ai._globalBatch = t2, this.packAttributes();
    }, e.prototype.packAttributes = function() {
        for(var t2 = this.points, e1 = this.uvs, r = this.colors, i = this.textureIds, n = new ArrayBuffer(3 * t2.length * 4), o = new Float32Array(n), s = new Uint32Array(n), a = 0, h = 0; h < t2.length / 2; h++)o[a++] = t2[2 * h], o[a++] = t2[2 * h + 1], o[a++] = e1[2 * h], o[a++] = e1[2 * h + 1], s[a++] = r[h], o[a++] = i[h];
        this._buffer.update(n), this._indexBuffer.update(this.indicesUint16);
    }, e.prototype.processFill = function(t) {
        t.holes.length ? (this.processHoles(t.holes), oa.triangulate(t, this)) : ga[t.type].triangulate(t, this);
    }, e.prototype.processLine = function(t) {
        fa(t, this);
        for(var e1 = 0; e1 < t.holes.length; e1++)fa(t.holes[e1], this);
    }, e.prototype.processHoles = function(t) {
        for(var e1 = 0; e1 < t.length; e1++){
            var r = t[e1];
            ga[r.type].build(r), r.matrix && this.transformPoints(r.points, r.matrix);
        }
    }, e.prototype.calculateBounds = function() {
        var t2 = this._bounds, e1 = Oa, r = _r.IDENTITY;
        this._bounds.clear(), e1.clear();
        for(var i = 0; i < this.graphicsData.length; i++){
            var n = this.graphicsData[i], o = n.shape, s = n.type, a = n.lineStyle, h = n.matrix || _r.IDENTITY, u = 0;
            if (a && a.visible) {
                var l = a.alignment;
                u = a.width, s === ir.POLY ? ba(o) ? u *= 1 - l : u *= l : u *= Math.max(0, l);
            }
            if (r !== h && (e1.isEmpty() || (t2.addBoundsMatrix(e1, r), e1.clear()), r = h), s === ir.RECT || s === ir.RREC) {
                var c = o;
                e1.addFramePad(c.x, c.y, c.x + c.width, c.y + c.height, u, u);
            } else if (s === ir.CIRC) {
                var d = o;
                e1.addFramePad(d.x, d.y, d.x, d.y, d.radius + u, d.radius + u);
            } else if (s === ir.ELIP) {
                var f = o;
                e1.addFramePad(f.x, f.y, f.x, f.y, f.width + u, f.height + u);
            } else {
                var p = o;
                t2.addVerticesMatrix(r, p.points, 0, p.points.length, u, u);
            }
        }
        e1.isEmpty() || t2.addBoundsMatrix(e1, r), t2.pad(this.boundsPadding, this.boundsPadding);
    }, e.prototype.transformPoints = function(t, e) {
        for(var r = 0; r < t.length / 2; r++){
            var i = t[2 * r], n = t[2 * r + 1];
            t[2 * r] = e.a * i + e.c * n + e.tx, t[2 * r + 1] = e.b * i + e.d * n + e.ty;
        }
    }, e.prototype.addColors = function(t, e, r, i, n) {
        void 0 === n && (n = 0);
        var o = Le((e >> 16) + (65280 & e) + ((255 & e) << 16), r);
        t.length = Math.max(t.length, n + i);
        for(var s = 0; s < i; s++)t[n + s] = o;
    }, e.prototype.addTextureIds = function(t, e, r, i) {
        void 0 === i && (i = 0), t.length = Math.max(t.length, i + r);
        for(var n = 0; n < r; n++)t[i + n] = e;
    }, e.prototype.addUvs = function(t, e, r, i, n, o) {
        void 0 === o && (o = null);
        for(var s = 0, a = e.length, h = r.frame; s < n;){
            var u = t[2 * (i + s)], l = t[2 * (i + s) + 1];
            if (o) {
                var c = o.a * u + o.c * l + o.tx;
                l = o.b * u + o.d * l + o.ty, u = c;
            }
            s++, e.push(u / h.width, l / h.height);
        }
        var d = r.baseTexture;
        (h.width < d.width || h.height < d.height) && this.adjustUvs(e, r, a, n);
    }, e.prototype.adjustUvs = function(t, e, r, i) {
        for(var n = e.baseTexture, o = r + 2 * i, s = e.frame, a = s.width / n.width, h = s.height / n.height, u = s.x / s.width, l = s.y / s.height, c = Math.floor(t[r] + 0.000001), d = Math.floor(t[r + 1] + 0.000001), f = r + 2; f < o; f += 2)c = Math.min(c, Math.floor(t[f] + 0.000001)), d = Math.min(d, Math.floor(t[f + 1] + 0.000001));
        for(u -= c, l -= d, f = r; f < o; f += 2)t[f] = (t[f] + u) * a, t[f + 1] = (t[f + 1] + l) * h;
    }, e.BATCHABLE_SIZE = 100, e;
}(jo), Ia = function(t) {
    function e() {
        var e1 = null !== t && t.apply(this, arguments) || this;
        return e1.width = 0, e1.alignment = 0.5, e1.native = !1, e1.cap = Ks.BUTT, e1.join = qs.MITER, e1.miterLimit = 10, e1;
    }
    return na(e, t), e.prototype.clone = function() {
        var t2 = new e;
        return t2.color = this.color, t2.alpha = this.alpha, t2.texture = this.texture, t2.matrix = this.matrix, t2.visible = this.visible, t2.width = this.width, t2.alignment = this.alignment, t2.native = this.native, t2.cap = this.cap, t2.join = this.join, t2.miterLimit = this.miterLimit, t2;
    }, e.prototype.reset = function() {
        t.prototype.reset.call(this), this.color = 0, this.alignment = 0.5, this.width = 0, this.native = !1;
    }, e;
}(ra), Pa = new Float32Array(3), Na = {
}, Ma = function(t) {
    function e(e) {
        void 0 === e && (e = null);
        var r = t.call(this) || this;
        return r.shader = null, r.pluginName = "batch", r.currentPath = null, r.batches = [], r.batchTint = -1, r.batchDirty = -1, r.vertexData = null, r._fillStyle = new ra, r._lineStyle = new Ia, r._matrix = null, r._holeMode = !1, r.state = jn.for2d(), r._geometry = e || new Sa, r._geometry.refCount++, r._transformID = -1, r.tint = 16777215, r.blendMode = se.NORMAL, r;
    }
    return na(e, t), Object.defineProperty(e.prototype, "geometry", {
        get: function() {
            return this._geometry;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.clone = function() {
        return this.finishPoly(), new e(this._geometry);
    }, Object.defineProperty(e.prototype, "blendMode", {
        get: function() {
            return this.state.blendMode;
        },
        set: function(t) {
            this.state.blendMode = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "tint", {
        get: function() {
            return this._tint;
        },
        set: function(t) {
            this._tint = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "fill", {
        get: function() {
            return this._fillStyle;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "line", {
        get: function() {
            return this._lineStyle;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.lineStyle = function(t, e, r, i, n) {
        return void 0 === t && (t = null), void 0 === e && (e = 0), void 0 === r && (r = 1), void 0 === i && (i = 0.5), void 0 === n && (n = !1), "number" == typeof t && (t = {
            width: t,
            color: e,
            alpha: r,
            alignment: i,
            native: n
        }), this.lineTextureStyle(t);
    }, e.prototype.lineTextureStyle = function(t) {
        t = Object.assign({
            width: 0,
            texture: ki.WHITE,
            color: t && t.texture ? 16777215 : 0,
            alpha: 1,
            matrix: null,
            alignment: 0.5,
            native: !1,
            cap: Ks.BUTT,
            join: qs.MITER,
            miterLimit: 10
        }, t), this.currentPath && this.startPoly();
        var e1 = t.width > 0 && t.alpha > 0;
        return e1 ? (t.matrix && (t.matrix = t.matrix.clone(), t.matrix.invert()), Object.assign(this._lineStyle, {
            visible: e1
        }, t)) : this._lineStyle.reset(), this;
    }, e.prototype.startPoly = function() {
        if (this.currentPath) {
            var t = this.currentPath.points, e = this.currentPath.points.length;
            e > 2 && (this.drawShape(this.currentPath), this.currentPath = new cr, this.currentPath.closeStroke = !1, this.currentPath.points.push(t[e - 2], t[e - 1]));
        } else this.currentPath = new cr, this.currentPath.closeStroke = !1;
    }, e.prototype.finishPoly = function() {
        this.currentPath && (this.currentPath.points.length > 2 ? (this.drawShape(this.currentPath), this.currentPath = null) : this.currentPath.points.length = 0);
    }, e.prototype.moveTo = function(t, e) {
        return this.startPoly(), this.currentPath.points[0] = t, this.currentPath.points[1] = e, this;
    }, e.prototype.lineTo = function(t, e) {
        this.currentPath || this.moveTo(0, 0);
        var r = this.currentPath.points, i = r[r.length - 2], n = r[r.length - 1];
        return i === t && n === e || r.push(t, e), this;
    }, e.prototype._initCurve = function(t, e) {
        void 0 === t && (t = 0), void 0 === e && (e = 0), this.currentPath ? 0 === this.currentPath.points.length && (this.currentPath.points = [
            t,
            e
        ]) : this.moveTo(t, e);
    }, e.prototype.quadraticCurveTo = function(t, e, r, i) {
        this._initCurve();
        var n = this.currentPath.points;
        return 0 === n.length && this.moveTo(0, 0), va.curveTo(t, e, r, i, n), this;
    }, e.prototype.bezierCurveTo = function(t, e, r, i, n, o) {
        return this._initCurve(), ma.curveTo(t, e, r, i, n, o, this.currentPath.points), this;
    }, e.prototype.arcTo = function(t, e, r, i, n) {
        this._initCurve(t, e);
        var o = this.currentPath.points, s = _a.curveTo(t, e, r, i, n, o);
        if (s) {
            var a = s.cx, h = s.cy, u = s.radius, l = s.startAngle, c = s.endAngle, d = s.anticlockwise;
            this.arc(a, h, u, l, c, d);
        }
        return this;
    }, e.prototype.arc = function(t, e, r, i, n, o) {
        if (void 0 === o && (o = !1), i === n) return this;
        if (!o && n <= i ? n += or : o && i <= n && (i += or), 0 == n - i) return this;
        var s = t + Math.cos(i) * r, a = e + Math.sin(i) * r, h = this._geometry.closePointEps, u = this.currentPath ? this.currentPath.points : null;
        if (u) {
            var l = Math.abs(u[u.length - 2] - s), c = Math.abs(u[u.length - 1] - a);
            l < h && c < h || u.push(s, a);
        } else this.moveTo(s, a), u = this.currentPath.points;
        return _a.arc(s, a, t, e, r, i, n, o, u), this;
    }, e.prototype.beginFill = function(t, e) {
        return void 0 === t && (t = 0), void 0 === e && (e = 1), this.beginTextureFill({
            texture: ki.WHITE,
            color: t,
            alpha: e
        });
    }, e.prototype.beginTextureFill = function(t) {
        t = Object.assign({
            texture: ki.WHITE,
            color: 16777215,
            alpha: 1,
            matrix: null
        }, t), this.currentPath && this.startPoly();
        var e1 = t.alpha > 0;
        return e1 ? (t.matrix && (t.matrix = t.matrix.clone(), t.matrix.invert()), Object.assign(this._fillStyle, {
            visible: e1
        }, t)) : this._fillStyle.reset(), this;
    }, e.prototype.endFill = function() {
        return this.finishPoly(), this._fillStyle.reset(), this;
    }, e.prototype.drawRect = function(t, e, r, i) {
        return this.drawShape(new hr(t, e, r, i));
    }, e.prototype.drawRoundedRect = function(t, e, r, i, n) {
        return this.drawShape(new dr(t, e, r, i, n));
    }, e.prototype.drawCircle = function(t, e, r) {
        return this.drawShape(new ur(t, e, r));
    }, e.prototype.drawEllipse = function(t, e, r, i) {
        return this.drawShape(new lr(t, e, r, i));
    }, e.prototype.drawPolygon = function() {
        for(var t2, e1 = arguments, r = [], i = 0; i < arguments.length; i++)r[i] = e1[i];
        var n = !0, o = r[0];
        o.points ? (n = o.closeStroke, t2 = o.points) : t2 = Array.isArray(r[0]) ? r[0] : r;
        var s = new cr(t2);
        return s.closeStroke = n, this.drawShape(s), this;
    }, e.prototype.drawShape = function(t) {
        return this._holeMode ? this._geometry.drawHole(t, this._matrix) : this._geometry.drawShape(t, this._fillStyle.clone(), this._lineStyle.clone(), this._matrix), this;
    }, e.prototype.clear = function() {
        return this._geometry.clear(), this._lineStyle.reset(), this._fillStyle.reset(), this._boundsID++, this._matrix = null, this._holeMode = !1, this.currentPath = null, this;
    }, e.prototype.isFastRect = function() {
        var t2 = this._geometry.graphicsData;
        return !(1 !== t2.length || t2[0].shape.type !== ir.RECT || t2[0].holes.length || t2[0].lineStyle.visible && t2[0].lineStyle.width);
    }, e.prototype._render = function(t) {
        this.finishPoly();
        var e1 = this._geometry, r = t.context.supports.uint32Indices;
        e1.updateBatches(r), e1.batchable ? (this.batchDirty !== e1.batchDirty && this._populateBatches(), this._renderBatched(t)) : (t.batch.flush(), this._renderDirect(t));
    }, e.prototype._populateBatches = function() {
        var t2 = this._geometry, e = this.blendMode, r = t2.batches.length;
        this.batchTint = -1, this._transformID = -1, this.batchDirty = t2.batchDirty, this.batches.length = r, this.vertexData = new Float32Array(t2.points);
        for(var i = 0; i < r; i++){
            var n = t2.batches[i], o = n.style.color, s = new Float32Array(this.vertexData.buffer, 4 * n.attribStart * 2, 2 * n.attribSize), a = new Float32Array(t2.uvsFloat32.buffer, 4 * n.attribStart * 2, 2 * n.attribSize), h = {
                vertexData: s,
                blendMode: e,
                indices: new Uint16Array(t2.indicesUint16.buffer, 2 * n.start, n.size),
                uvs: a,
                _batchRGB: Pe(o),
                _tintRGB: o,
                _texture: n.style.texture,
                alpha: n.style.alpha,
                worldAlpha: 1
            };
            this.batches[i] = h;
        }
    }, e.prototype._renderBatched = function(t) {
        if (this.batches.length) {
            t.batch.setObjectRenderer(t.plugins[this.pluginName]), this.calculateVertices(), this.calculateTints();
            for(var e = 0, r = this.batches.length; e < r; e++){
                var i = this.batches[e];
                i.worldAlpha = this.worldAlpha * i.alpha, t.plugins[this.pluginName].render(i);
            }
        }
    }, e.prototype._renderDirect = function(t) {
        var e1 = this._resolveDirectShader(t), r = this._geometry, i = this.tint, n = this.worldAlpha, o = e1.uniforms, s = r.drawCalls;
        o.translationMatrix = this.transform.worldTransform, o.tint[0] = (i >> 16 & 255) / 255 * n, o.tint[1] = (i >> 8 & 255) / 255 * n, o.tint[2] = (255 & i) / 255 * n, o.tint[3] = n, t.shader.bind(e1), t.geometry.bind(r, e1), t.state.set(this.state);
        for(var a = 0, h = s.length; a < h; a++)this._renderDrawCallDirect(t, r.drawCalls[a]);
    }, e.prototype._renderDrawCallDirect = function(t, e) {
        for(var r = e.texArray, i = e.type, n = e.size, o = e.start, s = r.count, a = 0; a < s; a++)t.texture.bind(r.elements[a], a);
        t.geometry.draw(i, n, o);
    }, e.prototype._resolveDirectShader = function(t) {
        var e1 = this.shader, r = this.pluginName;
        if (!e1) {
            if (!Na[r]) {
                for(var i = t.plugins.batch.MAX_TEXTURES, n = new Int32Array(i), o = 0; o < i; o++)n[o] = o;
                var s = {
                    tint: new Float32Array([
                        1,
                        1,
                        1,
                        1
                    ]),
                    translationMatrix: new _r,
                    default: rn.from({
                        uSamplers: n
                    }, !0)
                }, a = t.plugins[r]._shader.program;
                Na[r] = new Hn(a, s);
            }
            e1 = Na[r];
        }
        return e1;
    }, e.prototype._calculateBounds = function() {
        this.finishPoly();
        var t2 = this._geometry;
        if (t2.graphicsData.length) {
            var e = t2.bounds, r = e.minX, i = e.minY, n = e.maxX, o = e.maxY;
            this._bounds.addFrame(this.transform, r, i, n, o);
        }
    }, e.prototype.containsPoint = function(t) {
        return this.worldTransform.applyInverse(t, e._TEMP_POINT), this._geometry.containsPoint(e._TEMP_POINT);
    }, e.prototype.calculateTints = function() {
        if (this.batchTint !== this.tint) {
            this.batchTint = this.tint;
            for(var t = Pe(this.tint, Pa), e = 0; e < this.batches.length; e++){
                var r = this.batches[e], i = r._batchRGB, n = (t[0] * i[0] * 255 << 16) + (t[1] * i[1] * 255 << 8) + (0 | t[2] * i[2] * 255);
                r._tintRGB = (n >> 16) + (65280 & n) + ((255 & n) << 16);
            }
        }
    }, e.prototype.calculateVertices = function() {
        var t2 = this.transform._worldID;
        if (this._transformID !== t2) {
            this._transformID = t2;
            for(var e = this.transform.worldTransform, r = e.a, i = e.b, n = e.c, o = e.d, s = e.tx, a = e.ty, h = this._geometry.points, u = this.vertexData, l = 0, c = 0; c < h.length; c += 2){
                var d = h[c], f = h[c + 1];
                u[l++] = r * d + n * f + s, u[l++] = o * f + i * d + a;
            }
        }
    }, e.prototype.closePath = function() {
        var t2 = this.currentPath;
        return t2 && (t2.closeStroke = !0, this.finishPoly()), this;
    }, e.prototype.setMatrix = function(t) {
        return this._matrix = t, this;
    }, e.prototype.beginHole = function() {
        return this.finishPoly(), this._holeMode = !0, this;
    }, e.prototype.endHole = function() {
        return this.finishPoly(), this._holeMode = !1, this;
    }, e.prototype.destroy = function(e) {
        this._geometry.refCount--, 0 === this._geometry.refCount && this._geometry.dispose(), this._matrix = null, this.currentPath = null, this._lineStyle.destroy(), this._lineStyle = null, this._fillStyle.destroy(), this._fillStyle = null, this._geometry = null, this.shader = null, this.vertexData = null, this.batches.length = 0, this.batches = null, t.prototype.destroy.call(this, e);
    }, e._TEMP_POINT = new fr, e;
}(Zr), Da = {
    buildPoly: oa,
    buildCircle: sa,
    buildRectangle: aa,
    buildRoundedRectangle: la,
    buildLine: fa,
    ArcUtils: _a,
    BezierUtils: ma,
    QuadraticUtils: va,
    BatchPart: ya,
    FILL_COMMANDS: ga,
    BATCH_POOL: Ea,
    DRAW_CALL_POOL: Ta
}, Ca = function(t, e) {
    return (Ca = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
}, wa = new fr, La = new Uint16Array([
    0,
    1,
    2,
    0,
    2,
    3
]), Fa = function(t) {
    function e(e) {
        var r = t.call(this) || this;
        return r._anchor = new pr(r._onAnchorUpdate, r, e ? e.defaultAnchor.x : 0, e ? e.defaultAnchor.y : 0), r._texture = null, r._width = 0, r._height = 0, r._tint = null, r._tintRGB = null, r.tint = 16777215, r.blendMode = se.NORMAL, r._cachedTint = 16777215, r.uvs = null, r.texture = e || ki.EMPTY, r.vertexData = new Float32Array(8), r.vertexTrimmedData = null, r._transformID = -1, r._textureID = -1, r._transformTrimmedID = -1, r._textureTrimmedID = -1, r.indices = La, r.pluginName = "batch", r.isSprite = !0, r._roundPixels = et.ROUND_PIXELS, r;
    }
    return (function(t, e) {
        function r() {
            this.constructor = t;
        }
        Ca(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
    })(e, t), e.prototype._onTextureUpdate = function() {
        this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this._width && (this.scale.x = Ye(this.scale.x) * this._width / this._texture.orig.width), this._height && (this.scale.y = Ye(this.scale.y) * this._height / this._texture.orig.height);
    }, e.prototype._onAnchorUpdate = function() {
        this._transformID = -1, this._transformTrimmedID = -1;
    }, e.prototype.calculateVertices = function() {
        var t2 = this._texture;
        if (this._transformID !== this.transform._worldID || this._textureID !== t2._updateID) {
            this._textureID !== t2._updateID && (this.uvs = this._texture._uvs.uvsFloat32), this._transformID = this.transform._worldID, this._textureID = t2._updateID;
            var e = this.transform.worldTransform, r = e.a, i = e.b, n = e.c, o = e.d, s = e.tx, a = e.ty, h = this.vertexData, u = t2.trim, l = t2.orig, c = this._anchor, d = 0, f = 0, p = 0, _ = 0;
            if (u ? (d = (f = u.x - c._x * l.width) + u.width, p = (_ = u.y - c._y * l.height) + u.height) : (d = (f = -c._x * l.width) + l.width, p = (_ = -c._y * l.height) + l.height), h[0] = r * f + n * _ + s, h[1] = o * _ + i * f + a, h[2] = r * d + n * _ + s, h[3] = o * _ + i * d + a, h[4] = r * d + n * p + s, h[5] = o * p + i * d + a, h[6] = r * f + n * p + s, h[7] = o * p + i * f + a, this._roundPixels) for(var m = et.RESOLUTION, v = 0; v < h.length; ++v)h[v] = Math.round((h[v] * m | 0) / m);
        }
    }, e.prototype.calculateTrimmedVertices = function() {
        if (this.vertexTrimmedData) {
            if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID) return;
        } else this.vertexTrimmedData = new Float32Array(8);
        this._transformTrimmedID = this.transform._worldID, this._textureTrimmedID = this._texture._updateID;
        var t2 = this._texture, e1 = this.vertexTrimmedData, r = t2.orig, i = this._anchor, n = this.transform.worldTransform, o = n.a, s = n.b, a = n.c, h = n.d, u = n.tx, l = n.ty, c = -i._x * r.width, d = c + r.width, f = -i._y * r.height, p = f + r.height;
        e1[0] = o * c + a * f + u, e1[1] = h * f + s * c + l, e1[2] = o * d + a * f + u, e1[3] = h * f + s * d + l, e1[4] = o * d + a * p + u, e1[5] = h * p + s * d + l, e1[6] = o * c + a * p + u, e1[7] = h * p + s * c + l;
    }, e.prototype._render = function(t) {
        this.calculateVertices(), t.batch.setObjectRenderer(t.plugins[this.pluginName]), t.plugins[this.pluginName].render(this);
    }, e.prototype._calculateBounds = function() {
        var t2 = this._texture.trim, e1 = this._texture.orig;
        !t2 || t2.width === e1.width && t2.height === e1.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData));
    }, e.prototype.getLocalBounds = function(e) {
        return 0 === this.children.length ? (this._bounds.minX = this._texture.orig.width * -this._anchor._x, this._bounds.minY = this._texture.orig.height * -this._anchor._y, this._bounds.maxX = this._texture.orig.width * (1 - this._anchor._x), this._bounds.maxY = this._texture.orig.height * (1 - this._anchor._y), e || (this._localBoundsRect || (this._localBoundsRect = new hr), e = this._localBoundsRect), this._bounds.getRectangle(e)) : t.prototype.getLocalBounds.call(this, e);
    }, e.prototype.containsPoint = function(t) {
        this.worldTransform.applyInverse(t, wa);
        var e1 = this._texture.orig.width, r = this._texture.orig.height, i = -e1 * this.anchor.x, n = 0;
        return wa.x >= i && wa.x < i + e1 && (n = -r * this.anchor.y, wa.y >= n && wa.y < n + r);
    }, e.prototype.destroy = function(e) {
        if (t.prototype.destroy.call(this, e), this._texture.off("update", this._onTextureUpdate, this), this._anchor = null, "boolean" == typeof e ? e : e && e.texture) {
            var r = "boolean" == typeof e ? e : e && e.baseTexture;
            this._texture.destroy(!!r);
        }
        this._texture = null;
    }, e.from = function(t, r) {
        return new e(t instanceof ki ? t : ki.from(t, r));
    }, Object.defineProperty(e.prototype, "roundPixels", {
        get: function() {
            return this._roundPixels;
        },
        set: function(t) {
            this._roundPixels !== t && (this._transformID = -1), this._roundPixels = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "width", {
        get: function() {
            return Math.abs(this.scale.x) * this._texture.orig.width;
        },
        set: function(t) {
            var e1 = Ye(this.scale.x) || 1;
            this.scale.x = e1 * t / this._texture.orig.width, this._width = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
        get: function() {
            return Math.abs(this.scale.y) * this._texture.orig.height;
        },
        set: function(t) {
            var e1 = Ye(this.scale.y) || 1;
            this.scale.y = e1 * t / this._texture.orig.height, this._height = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "anchor", {
        get: function() {
            return this._anchor;
        },
        set: function(t) {
            this._anchor.copyFrom(t);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "tint", {
        get: function() {
            return this._tint;
        },
        set: function(t) {
            this._tint = t, this._tintRGB = (t >> 16) + (65280 & t) + ((255 & t) << 16);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "texture", {
        get: function() {
            return this._texture;
        },
        set: function(t) {
            this._texture !== t && (this._texture && this._texture.off("update", this._onTextureUpdate, this), this._texture = t || ki.EMPTY, this._cachedTint = 16777215, this._textureID = -1, this._textureTrimmedID = -1, t && (t.baseTexture.valid ? this._onTextureUpdate() : t.once("update", this._onTextureUpdate, this)));
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(Zr), Ua = function(t, e) {
    return (Ua = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
};
!function(t) {
    t[t.LINEAR_VERTICAL = 0] = "LINEAR_VERTICAL", t[t.LINEAR_HORIZONTAL = 1] = "LINEAR_HORIZONTAL";
}(xa || (xa = {
}));
var Ga = {
    align: "left",
    breakWords: !1,
    dropShadow: !1,
    dropShadowAlpha: 1,
    dropShadowAngle: Math.PI / 6,
    dropShadowBlur: 0,
    dropShadowColor: "black",
    dropShadowDistance: 5,
    fill: "black",
    fillGradientType: xa.LINEAR_VERTICAL,
    fillGradientStops: [],
    fontFamily: "Arial",
    fontSize: 26,
    fontStyle: "normal",
    fontVariant: "normal",
    fontWeight: "normal",
    letterSpacing: 0,
    lineHeight: 0,
    lineJoin: "miter",
    miterLimit: 10,
    padding: 0,
    stroke: "black",
    strokeThickness: 0,
    textBaseline: "alphabetic",
    trim: !1,
    whiteSpace: "pre",
    wordWrap: !1,
    wordWrapWidth: 100,
    leading: 0
}, Ba = [
    "serif",
    "sans-serif",
    "monospace",
    "cursive",
    "fantasy",
    "system-ui"
], Xa = function() {
    function t(t) {
        this.styleID = 0, this.reset(), ja(this, t, t);
    }
    return t.prototype.clone = function() {
        var e = {
        };
        return ja(e, this, Ga), new t(e);
    }, t.prototype.reset = function() {
        ja(this, Ga, Ga);
    }, Object.defineProperty(t.prototype, "align", {
        get: function() {
            return this._align;
        },
        set: function(t) {
            this._align !== t && (this._align = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "breakWords", {
        get: function() {
            return this._breakWords;
        },
        set: function(t) {
            this._breakWords !== t && (this._breakWords = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "dropShadow", {
        get: function() {
            return this._dropShadow;
        },
        set: function(t) {
            this._dropShadow !== t && (this._dropShadow = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "dropShadowAlpha", {
        get: function() {
            return this._dropShadowAlpha;
        },
        set: function(t) {
            this._dropShadowAlpha !== t && (this._dropShadowAlpha = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "dropShadowAngle", {
        get: function() {
            return this._dropShadowAngle;
        },
        set: function(t) {
            this._dropShadowAngle !== t && (this._dropShadowAngle = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "dropShadowBlur", {
        get: function() {
            return this._dropShadowBlur;
        },
        set: function(t) {
            this._dropShadowBlur !== t && (this._dropShadowBlur = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "dropShadowColor", {
        get: function() {
            return this._dropShadowColor;
        },
        set: function(t) {
            var e = Ha(t);
            this._dropShadowColor !== e && (this._dropShadowColor = e, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "dropShadowDistance", {
        get: function() {
            return this._dropShadowDistance;
        },
        set: function(t) {
            this._dropShadowDistance !== t && (this._dropShadowDistance = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "fill", {
        get: function() {
            return this._fill;
        },
        set: function(t) {
            var e = Ha(t);
            this._fill !== e && (this._fill = e, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "fillGradientType", {
        get: function() {
            return this._fillGradientType;
        },
        set: function(t) {
            this._fillGradientType !== t && (this._fillGradientType = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "fillGradientStops", {
        get: function() {
            return this._fillGradientStops;
        },
        set: function(t) {
            (function(t, e) {
                if (!Array.isArray(t) || !Array.isArray(e)) return !1;
                if (t.length !== e.length) return !1;
                for(var r = 0; r < t.length; ++r)if (t[r] !== e[r]) return !1;
                return !0;
            })(this._fillGradientStops, t) || (this._fillGradientStops = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "fontFamily", {
        get: function() {
            return this._fontFamily;
        },
        set: function(t) {
            this.fontFamily !== t && (this._fontFamily = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "fontSize", {
        get: function() {
            return this._fontSize;
        },
        set: function(t) {
            this._fontSize !== t && (this._fontSize = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "fontStyle", {
        get: function() {
            return this._fontStyle;
        },
        set: function(t) {
            this._fontStyle !== t && (this._fontStyle = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "fontVariant", {
        get: function() {
            return this._fontVariant;
        },
        set: function(t) {
            this._fontVariant !== t && (this._fontVariant = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "fontWeight", {
        get: function() {
            return this._fontWeight;
        },
        set: function(t) {
            this._fontWeight !== t && (this._fontWeight = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "letterSpacing", {
        get: function() {
            return this._letterSpacing;
        },
        set: function(t) {
            this._letterSpacing !== t && (this._letterSpacing = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "lineHeight", {
        get: function() {
            return this._lineHeight;
        },
        set: function(t) {
            this._lineHeight !== t && (this._lineHeight = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "leading", {
        get: function() {
            return this._leading;
        },
        set: function(t) {
            this._leading !== t && (this._leading = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "lineJoin", {
        get: function() {
            return this._lineJoin;
        },
        set: function(t) {
            this._lineJoin !== t && (this._lineJoin = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "miterLimit", {
        get: function() {
            return this._miterLimit;
        },
        set: function(t) {
            this._miterLimit !== t && (this._miterLimit = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "padding", {
        get: function() {
            return this._padding;
        },
        set: function(t) {
            this._padding !== t && (this._padding = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "stroke", {
        get: function() {
            return this._stroke;
        },
        set: function(t) {
            var e = Ha(t);
            this._stroke !== e && (this._stroke = e, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "strokeThickness", {
        get: function() {
            return this._strokeThickness;
        },
        set: function(t) {
            this._strokeThickness !== t && (this._strokeThickness = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "textBaseline", {
        get: function() {
            return this._textBaseline;
        },
        set: function(t) {
            this._textBaseline !== t && (this._textBaseline = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "trim", {
        get: function() {
            return this._trim;
        },
        set: function(t) {
            this._trim !== t && (this._trim = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "whiteSpace", {
        get: function() {
            return this._whiteSpace;
        },
        set: function(t) {
            this._whiteSpace !== t && (this._whiteSpace = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "wordWrap", {
        get: function() {
            return this._wordWrap;
        },
        set: function(t) {
            this._wordWrap !== t && (this._wordWrap = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "wordWrapWidth", {
        get: function() {
            return this._wordWrapWidth;
        },
        set: function(t) {
            this._wordWrapWidth !== t && (this._wordWrapWidth = t, this.styleID++);
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.toFontString = function() {
        var t2 = "number" == typeof this.fontSize ? this.fontSize + "px" : this.fontSize, e = this.fontFamily;
        Array.isArray(this.fontFamily) || (e = this.fontFamily.split(","));
        for(var r = e.length - 1; r >= 0; r--){
            var i = e[r].trim();
            !/([\"\'])[^\'\"]+\1/.test(i) && Ba.indexOf(i) < 0 && (i = '"' + i + '"'), e[r] = i;
        }
        return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + t2 + " " + e.join(",");
    }, t;
}();
function ka(t) {
    return "number" == typeof t ? Ne(t) : ("string" == typeof t && 0 === t.indexOf("0x") && (t = t.replace("0x", "#")), t);
}
function Ha(t) {
    if (Array.isArray(t)) {
        for(var e = 0; e < t.length; ++e)t[e] = ka(t[e]);
        return t;
    }
    return ka(t);
}
function ja(t, e, r) {
    for(var i1 in r)Array.isArray(e[i1]) ? t[i1] = e[i1].slice() : t[i1] = e[i1];
}
var Ya = function() {
    function t(t, e, r, i, n, o, s, a, h) {
        this.text = t, this.style = e, this.width = r, this.height = i, this.lines = n, this.lineWidths = o, this.lineHeight = s, this.maxLineWidth = a, this.fontProperties = h;
    }
    return t.measureText = function(e, r, i, n) {
        void 0 === n && (n = t._canvas), i = null == i ? r.wordWrap : i;
        var o = r.toFontString(), s = t.measureFont(o);
        0 === s.fontSize && (s.fontSize = r.fontSize, s.ascent = r.fontSize);
        var a = n.getContext("2d");
        a.font = o;
        for(var h = (i ? t.wordWrap(e, r, n) : e).split(/(?:\r\n|\r|\n)/), u = new Array(h.length), l = 0, c = 0; c < h.length; c++){
            var d = a.measureText(h[c]).width + (h[c].length - 1) * r.letterSpacing;
            u[c] = d, l = Math.max(l, d);
        }
        var f = l + r.strokeThickness;
        r.dropShadow && (f += r.dropShadowDistance);
        var p = r.lineHeight || s.fontSize + r.strokeThickness, _ = Math.max(p, s.fontSize + r.strokeThickness) + (h.length - 1) * (p + r.leading);
        return r.dropShadow && (_ += r.dropShadowDistance), new t(e, r, f, _, h, u, p + r.leading, l, s);
    }, t.wordWrap = function(e, r, i) {
        void 0 === i && (i = t._canvas);
        for(var n = i.getContext("2d"), o = 0, s = "", a = "", h = Object.create(null), u = r.letterSpacing, l = r.whiteSpace, c = t.collapseSpaces(l), d = t.collapseNewlines(l), f = !c, p = r.wordWrapWidth + u, _ = t.tokenize(e), m = 0; m < _.length; m++){
            var v = _[m];
            if (t.isNewline(v)) {
                if (!d) {
                    a += t.addLine(s), f = !c, s = "", o = 0;
                    continue;
                }
                v = " ";
            }
            if (c) {
                var y = t.isBreakingSpace(v), g = t.isBreakingSpace(s[s.length - 1]);
                if (y && g) continue;
            }
            var E = t.getFromCache(v, u, h, n);
            if (E > p) if ("" !== s && (a += t.addLine(s), s = "", o = 0), t.canBreakWords(v, r.breakWords)) for(var T = t.wordWrapSplit(v), b = 0; b < T.length; b++){
                for(var x = T[b], R = 1; T[b + R];){
                    var A = T[b + R], O = x[x.length - 1];
                    if (t.canBreakChars(O, A, v, b, r.breakWords)) break;
                    x += A, R++;
                }
                b += x.length - 1;
                var S = t.getFromCache(x, u, h, n);
                S + o > p && (a += t.addLine(s), f = !1, s = "", o = 0), s += x, o += S;
            }
            else {
                s.length > 0 && (a += t.addLine(s), s = "", o = 0);
                var I = m === _.length - 1;
                a += t.addLine(v, !I), f = !1, s = "", o = 0;
            }
            else E + o > p && (f = !1, a += t.addLine(s), s = "", o = 0), (s.length > 0 || !t.isBreakingSpace(v) || f) && (s += v, o += E);
        }
        return a + t.addLine(s, !1);
    }, t.addLine = function(e, r) {
        return void 0 === r && (r = !0), e = t.trimRight(e), r ? e + "\n" : e;
    }, t.getFromCache = function(t, e, r, i) {
        var n = r[t];
        if ("number" != typeof n) {
            var o = t.length * e;
            n = i.measureText(t).width + o, r[t] = n;
        }
        return n;
    }, t.collapseSpaces = function(t) {
        return "normal" === t || "pre-line" === t;
    }, t.collapseNewlines = function(t) {
        return "normal" === t;
    }, t.trimRight = function(e) {
        if ("string" != typeof e) return "";
        for(var r = e.length - 1; r >= 0; r--){
            var i = e[r];
            if (!t.isBreakingSpace(i)) break;
            e = e.slice(0, -1);
        }
        return e;
    }, t.isNewline = function(e) {
        return "string" == typeof e && t._newlines.indexOf(e.charCodeAt(0)) >= 0;
    }, t.isBreakingSpace = function(e, r) {
        return "string" == typeof e && t._breakingSpaces.indexOf(e.charCodeAt(0)) >= 0;
    }, t.tokenize = function(e) {
        var r = [], i = "";
        if ("string" != typeof e) return r;
        for(var n = 0; n < e.length; n++){
            var o = e[n], s = e[n + 1];
            t.isBreakingSpace(o, s) || t.isNewline(o) ? ("" !== i && (r.push(i), i = ""), r.push(o)) : i += o;
        }
        return "" !== i && r.push(i), r;
    }, t.canBreakWords = function(t, e) {
        return e;
    }, t.canBreakChars = function(t, e, r, i, n) {
        return !0;
    }, t.wordWrapSplit = function(t) {
        return t.split("");
    }, t.measureFont = function(e) {
        if (t._fonts[e]) return t._fonts[e];
        var r = {
            ascent: 0,
            descent: 0,
            fontSize: 0
        }, i = t._canvas, n = t._context;
        n.font = e;
        var o = t.METRICS_STRING + t.BASELINE_SYMBOL, s = Math.ceil(n.measureText(o).width), a = Math.ceil(n.measureText(t.BASELINE_SYMBOL).width), h = Math.ceil(t.HEIGHT_MULTIPLIER * a);
        a = a * t.BASELINE_MULTIPLIER | 0, i.width = s, i.height = h, n.fillStyle = "#f00", n.fillRect(0, 0, s, h), n.font = e, n.textBaseline = "alphabetic", n.fillStyle = "#000", n.fillText(o, 0, a);
        var u = n.getImageData(0, 0, s, h).data, l = u.length, c = 4 * s, d = 0, f = 0, p = !1;
        for(d = 0; d < a; ++d){
            for(var _ = 0; _ < c; _ += 4)if (255 !== u[f + _]) {
                p = !0;
                break;
            }
            if (p) break;
            f += c;
        }
        for(r.ascent = a - d, f = l - c, p = !1, d = h; d > a; --d){
            for(_ = 0; _ < c; _ += 4)if (255 !== u[f + _]) {
                p = !0;
                break;
            }
            if (p) break;
            f -= c;
        }
        return r.descent = d - a, r.fontSize = r.ascent + r.descent, t._fonts[e] = r, r;
    }, t.clearMetrics = function(e) {
        void 0 === e && (e = ""), e ? delete t._fonts[e] : t._fonts = {
        };
    }, t;
}(), Va = function() {
    try {
        var t = new OffscreenCanvas(0, 0), e1 = t.getContext("2d");
        return e1 && e1.measureText ? t : document.createElement("canvas");
    } catch (t2) {
        return document.createElement("canvas");
    }
}();
Va.width = Va.height = 10, Ya._canvas = Va, Ya._context = Va.getContext("2d"), Ya._fonts = {
}, Ya.METRICS_STRING = "|ÉqÅ", Ya.BASELINE_SYMBOL = "M", Ya.BASELINE_MULTIPLIER = 1.4, Ya.HEIGHT_MULTIPLIER = 2, Ya._newlines = [
    10,
    13
], Ya._breakingSpaces = [
    9,
    32,
    8192,
    8193,
    8194,
    8195,
    8196,
    8197,
    8198,
    8200,
    8201,
    8202,
    8287,
    12288
];
var Wa = {
    texture: !0,
    children: !1,
    baseTexture: !0
}, za = "letterSpacing" in CanvasRenderingContext2D.prototype || "textLetterSpacing" in CanvasRenderingContext2D.prototype, qa = function(t) {
    function e(e, r, i) {
        var n = this, o = !1;
        i || (i = document.createElement("canvas"), o = !0), i.width = 3, i.height = 3;
        var s = ki.from(i);
        return s.orig = new hr, s.trim = new hr, (n = t.call(this, s) || this)._ownCanvas = o, n.canvas = i, n.context = n.canvas.getContext("2d"), n._resolution = et.RESOLUTION, n._autoResolution = !0, n._text = null, n._style = null, n._styleListener = null, n._font = "", n.text = e, n.style = r, n.localStyleID = -1, n;
    }
    return (function(t, e) {
        function r() {
            this.constructor = t;
        }
        Ua(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
    })(e, t), e.prototype.updateText = function(t) {
        var r = this._style;
        if (this.localStyleID !== r.styleID && (this.dirty = !0, this.localStyleID = r.styleID), this.dirty || !t) {
            this._font = this._style.toFontString();
            var i, n, o = this.context, s = Ya.measureText(this._text || " ", this._style, this._style.wordWrap, this.canvas), a = s.width, h = s.height, u = s.lines, l = s.lineHeight, c = s.lineWidths, d = s.maxLineWidth, f = s.fontProperties;
            this.canvas.width = Math.ceil(Math.ceil(Math.max(1, a) + 2 * r.padding) * this._resolution), this.canvas.height = Math.ceil(Math.ceil(Math.max(1, h) + 2 * r.padding) * this._resolution), o.scale(this._resolution, this._resolution), o.clearRect(0, 0, this.canvas.width, this.canvas.height), o.font = this._font, o.lineWidth = r.strokeThickness, o.textBaseline = r.textBaseline, o.lineJoin = r.lineJoin, o.miterLimit = r.miterLimit;
            for(var p = r.dropShadow ? 2 : 1, _ = 0; _ < p; ++_){
                var m = r.dropShadow && 0 === _, v = m ? Math.ceil(Math.max(1, h) + 2 * r.padding) : 0, y = v * this._resolution;
                if (m) {
                    o.fillStyle = "black", o.strokeStyle = "black";
                    var g = r.dropShadowColor, E = Pe("number" == typeof g ? g : Me(g));
                    o.shadowColor = "rgba(" + 255 * E[0] + "," + 255 * E[1] + "," + 255 * E[2] + "," + r.dropShadowAlpha + ")", o.shadowBlur = r.dropShadowBlur, o.shadowOffsetX = Math.cos(r.dropShadowAngle) * r.dropShadowDistance, o.shadowOffsetY = Math.sin(r.dropShadowAngle) * r.dropShadowDistance + y;
                } else o.fillStyle = this._generateFillStyle(r, u, s), o.strokeStyle = r.stroke, o.shadowColor = "black", o.shadowBlur = 0, o.shadowOffsetX = 0, o.shadowOffsetY = 0;
                var T = (l - f.fontSize) / 2;
                (!e.nextLineHeightBehavior || l - f.fontSize < 0) && (T = 0);
                for(var b = 0; b < u.length; b++)i = r.strokeThickness / 2, n = r.strokeThickness / 2 + b * l + f.ascent + T, "right" === r.align ? i += d - c[b] : "center" === r.align && (i += (d - c[b]) / 2), r.stroke && r.strokeThickness && this.drawLetterSpacing(u[b], i + r.padding, n + r.padding - v, !0), r.fill && this.drawLetterSpacing(u[b], i + r.padding, n + r.padding - v);
            }
            this.updateTexture();
        }
    }, e.prototype.drawLetterSpacing = function(t, e, r, i) {
        void 0 === i && (i = !1);
        var n = this._style.letterSpacing;
        if (0 === n || za) return za && (this.context.letterSpacing = n, this.context.textLetterSpacing = n), void (i ? this.context.strokeText(t, e, r) : this.context.fillText(t, e, r));
        for(var o = e, s = Array.from ? Array.from(t) : t.split(""), a = this.context.measureText(t).width, h = 0, u = 0; u < s.length; ++u){
            var l = s[u];
            i ? this.context.strokeText(l, o, r) : this.context.fillText(l, o, r), o += a - (h = this.context.measureText(t.substring(u + 1)).width) + n, a = h;
        }
    }, e.prototype.updateTexture = function() {
        var t2 = this.canvas;
        if (this._style.trim) {
            var e = Qe(t2);
            e.data && (t2.width = e.width, t2.height = e.height, this.context.putImageData(e.data, 0, 0));
        }
        var r = this._texture, i = this._style, n = i.trim ? 0 : i.padding, o = r.baseTexture;
        r.trim.width = r._frame.width = t2.width / this._resolution, r.trim.height = r._frame.height = t2.height / this._resolution, r.trim.x = -n, r.trim.y = -n, r.orig.width = r._frame.width - 2 * n, r.orig.height = r._frame.height - 2 * n, this._onTextureUpdate(), o.setRealSize(t2.width, t2.height, this._resolution), r.updateUvs(), this._recursivePostUpdateTransform(), this.dirty = !1;
    }, e.prototype._render = function(e) {
        this._autoResolution && this._resolution !== e.resolution && (this._resolution = e.resolution, this.dirty = !0), this.updateText(!0), t.prototype._render.call(this, e);
    }, e.prototype.getLocalBounds = function(e) {
        return this.updateText(!0), t.prototype.getLocalBounds.call(this, e);
    }, e.prototype._calculateBounds = function() {
        this.updateText(!0), this.calculateVertices(), this._bounds.addQuad(this.vertexData);
    }, e.prototype._generateFillStyle = function(t, e, r) {
        var i, n = t.fill;
        if (!Array.isArray(n)) return n;
        if (1 === n.length) return n[0];
        var o = t.dropShadow ? t.dropShadowDistance : 0, s = t.padding || 0, a = this.canvas.width / this._resolution - o - 2 * s, h = this.canvas.height / this._resolution - o - 2 * s, u = n.slice(), l = t.fillGradientStops.slice();
        if (!l.length) for(var c = u.length + 1, d = 1; d < c; ++d)l.push(d / c);
        if (u.unshift(n[0]), l.unshift(0), u.push(n[n.length - 1]), l.push(1), t.fillGradientType === xa.LINEAR_VERTICAL) {
            i = this.context.createLinearGradient(a / 2, s, a / 2, h + s);
            var f = r.fontProperties.fontSize + t.strokeThickness;
            for(d = 0; d < e.length; d++){
                var p = r.lineHeight * (d - 1) + f, _ = r.lineHeight * d, m = _;
                d > 0 && p > _ && (m = (_ + p) / 2);
                var v = _ + f, y = r.lineHeight * (d + 1), g = v;
                d + 1 < e.length && y < v && (g = (v + y) / 2);
                for(var E = (g - m) / h, T = 0; T < u.length; T++){
                    var b;
                    b = "number" == typeof l[T] ? l[T] : T / u.length;
                    var x = Math.min(1, Math.max(0, m / h + b * E));
                    x = Number(x.toFixed(5)), i.addColorStop(x, u[T]);
                }
            }
        } else {
            i = this.context.createLinearGradient(s, h / 2, a + s, h / 2);
            var R = u.length + 1, A = 1;
            for(d = 0; d < u.length; d++){
                var O;
                O = "number" == typeof l[d] ? l[d] : A / R, i.addColorStop(O, u[d]), A++;
            }
        }
        return i;
    }, e.prototype.destroy = function(e) {
        "boolean" == typeof e && (e = {
            children: e
        }), e = Object.assign({
        }, Wa, e), t.prototype.destroy.call(this, e), this._ownCanvas && (this.canvas.height = this.canvas.width = 0), this.context = null, this.canvas = null, this._style = null;
    }, Object.defineProperty(e.prototype, "width", {
        get: function() {
            return this.updateText(!0), Math.abs(this.scale.x) * this._texture.orig.width;
        },
        set: function(t) {
            this.updateText(!0);
            var e1 = Ye(this.scale.x) || 1;
            this.scale.x = e1 * t / this._texture.orig.width, this._width = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
        get: function() {
            return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height;
        },
        set: function(t) {
            this.updateText(!0);
            var e1 = Ye(this.scale.y) || 1;
            this.scale.y = e1 * t / this._texture.orig.height, this._height = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "style", {
        get: function() {
            return this._style;
        },
        set: function(t) {
            t = t || {
            }, this._style = t instanceof Xa ? t : new Xa(t), this.localStyleID = -1, this.dirty = !0;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "text", {
        get: function() {
            return this._text;
        },
        set: function(t) {
            t = String(null == t ? "" : t), this._text !== t && (this._text = t, this.dirty = !0);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "resolution", {
        get: function() {
            return this._resolution;
        },
        set: function(t) {
            this._autoResolution = !1, this._resolution !== t && (this._resolution = t, this.dirty = !0);
        },
        enumerable: !1,
        configurable: !0
    }), e.nextLineHeightBehavior = !1, e;
}(Fa);
et.UPLOADS_PER_FRAME = 4;
var Ka = function(t, e) {
    return (Ka = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
}, Za = function() {
    function t(t) {
        this.maxItemsPerFrame = t, this.itemsLeft = 0;
    }
    return t.prototype.beginFrame = function() {
        this.itemsLeft = this.maxItemsPerFrame;
    }, t.prototype.allowedToUpload = function() {
        return this.itemsLeft-- > 0;
    }, t;
}();
function Ja(t, e) {
    var r1 = !1;
    if (t && t._textures && t._textures.length) {
        for(var i = 0; i < t._textures.length; i++)if (t._textures[i] instanceof ki) {
            var n = t._textures[i].baseTexture;
            -1 === e.indexOf(n) && (e.push(n), r1 = !0);
        }
    }
    return r1;
}
function Qa(t, e) {
    if (t.baseTexture instanceof Ai) {
        var r = t.baseTexture;
        return -1 === e.indexOf(r) && e.push(r), !0;
    }
    return !1;
}
function $a(t, e) {
    if (t._texture && t._texture instanceof ki) {
        var r = t._texture.baseTexture;
        return -1 === e.indexOf(r) && e.push(r), !0;
    }
    return !1;
}
function th(t, e) {
    return e instanceof qa && (e.updateText(!0), !0);
}
function eh(t, e) {
    if (e instanceof Xa) {
        var r = e.toFontString();
        return Ya.measureFont(r), !0;
    }
    return !1;
}
function rh(t, e) {
    if (t instanceof qa) {
        -1 === e.indexOf(t.style) && e.push(t.style), -1 === e.indexOf(t) && e.push(t);
        var r = t._texture.baseTexture;
        return -1 === e.indexOf(r) && e.push(r), !0;
    }
    return !1;
}
function ih(t, e) {
    return t instanceof Xa && (-1 === e.indexOf(t) && e.push(t), !0);
}
var nh = function() {
    function t(t) {
        var e = this;
        this.limiter = new Za(et.UPLOADS_PER_FRAME), this.renderer = t, this.uploadHookHelper = null, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.delayedTick = function() {
            e.queue && e.prepareItems();
        }, this.registerFindHook(rh), this.registerFindHook(ih), this.registerFindHook(Ja), this.registerFindHook(Qa), this.registerFindHook($a), this.registerUploadHook(th), this.registerUploadHook(eh);
    }
    return t.prototype.upload = function(t, e) {
        "function" == typeof t && (e = t, t = null), t && this.add(t), this.queue.length ? (e && this.completes.push(e), this.ticking || (this.ticking = !0, oi.system.addOnce(this.tick, this, Qr.UTILITY))) : e && e();
    }, t.prototype.tick = function() {
        setTimeout(this.delayedTick, 0);
    }, t.prototype.prepareItems = function() {
        for(this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload();){
            var t = this.queue[0], e = !1;
            if (t && !t._destroyed) {
                for(var r = 0, i = this.uploadHooks.length; r < i; r++)if (this.uploadHooks[r](this.uploadHookHelper, t)) {
                    this.queue.shift(), e = !0;
                    break;
                }
            }
            e || this.queue.shift();
        }
        if (this.queue.length) oi.system.addOnce(this.tick, this, Qr.UTILITY);
        else {
            this.ticking = !1;
            var n = this.completes.slice(0);
            for(this.completes.length = 0, r = 0, i = n.length; r < i; r++)n[r]();
        }
    }, t.prototype.registerFindHook = function(t) {
        return t && this.addHooks.push(t), this;
    }, t.prototype.registerUploadHook = function(t) {
        return t && this.uploadHooks.push(t), this;
    }, t.prototype.add = function(t) {
        for(var e = 0, r1 = this.addHooks.length; e < r1 && !this.addHooks[e](t, this.queue); e++);
        if (t instanceof Zr) for(e = t.children.length - 1; e >= 0; e--)this.add(t.children[e]);
        return this;
    }, t.prototype.destroy = function() {
        this.ticking && oi.system.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, this.limiter = null, this.uploadHookHelper = null;
    }, t;
}();
function oh(t, e) {
    return e instanceof Ai && (e._glTextures[t.CONTEXT_UID] || t.texture.bind(e), !0);
}
function sh(t, e) {
    if (!(e instanceof Ma)) return !1;
    var r1 = e.geometry;
    e.finishPoly(), r1.updateBatches();
    for(var i1 = r1.batches, n1 = 0; n1 < i1.length; n1++){
        var o = i1[n1].style.texture;
        o && oh(t, o.baseTexture);
    }
    return r1.batchable || t.geometry.bind(r1, e._resolveDirectShader(t)), !0;
}
function ah(t, e) {
    return t instanceof Ma && (e.push(t), !0);
}
var hh = function(t) {
    function e(e) {
        var r = t.call(this, e) || this;
        return r.uploadHookHelper = r.renderer, r.registerFindHook(ah), r.registerUploadHook(oh), r.registerUploadHook(sh), r;
    }
    return (function(t, e) {
        function r() {
            this.constructor = t;
        }
        Ka(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
    })(e, t), e;
}(nh), uh = function() {
    function t(t) {
        this.maxMilliseconds = t, this.frameStart = 0;
    }
    return t.prototype.beginFrame = function() {
        this.frameStart = Date.now();
    }, t.prototype.allowedToUpload = function() {
        return Date.now() - this.frameStart < this.maxMilliseconds;
    }, t;
}(), lh = function() {
    function t(t, e, r) {
        void 0 === r && (r = null), this._texture = t instanceof ki ? t : null, this.baseTexture = t instanceof Ai ? t : this._texture.baseTexture, this.textures = {
        }, this.animations = {
        }, this.data = e;
        var i = this.baseTexture.resource;
        this.resolution = this._updateResolution(r || (i ? i.url : null)), this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null;
    }
    return t.prototype._updateResolution = function(t) {
        void 0 === t && (t = null);
        var e = this.data.meta.scale, r = rr(t, null);
        return null === r && (r = void 0 !== e ? parseFloat(e) : 1), 1 !== r && this.baseTexture.setResolution(r), r;
    }, t.prototype.parse = function(e) {
        this._batchIndex = 0, this._callback = e, this._frameKeys.length <= t.BATCH_SIZE ? (this._processFrames(0), this._processAnimations(), this._parseComplete()) : this._nextBatch();
    }, t.prototype._processFrames = function(e) {
        for(var r = e, i = t.BATCH_SIZE; r - e < i && r < this._frameKeys.length;){
            var n = this._frameKeys[r], o = this._frames[n], s = o.frame;
            if (s) {
                var a, h = null, u = !1 !== o.trimmed && o.sourceSize ? o.sourceSize : o.frame, l = new hr(0, 0, Math.floor(u.w) / this.resolution, Math.floor(u.h) / this.resolution);
                a = o.rotated ? new hr(Math.floor(s.x) / this.resolution, Math.floor(s.y) / this.resolution, Math.floor(s.h) / this.resolution, Math.floor(s.w) / this.resolution) : new hr(Math.floor(s.x) / this.resolution, Math.floor(s.y) / this.resolution, Math.floor(s.w) / this.resolution, Math.floor(s.h) / this.resolution), !1 !== o.trimmed && o.spriteSourceSize && (h = new hr(Math.floor(o.spriteSourceSize.x) / this.resolution, Math.floor(o.spriteSourceSize.y) / this.resolution, Math.floor(s.w) / this.resolution, Math.floor(s.h) / this.resolution)), this.textures[n] = new ki(this.baseTexture, a, l, h, o.rotated ? 2 : 0, o.anchor), ki.addToCache(this.textures[n], n);
            }
            r++;
        }
    }, t.prototype._processAnimations = function() {
        var t2 = this.data.animations || {
        };
        for(var e in t2){
            this.animations[e] = [];
            for(var r = 0; r < t2[e].length; r++){
                var i = t2[e][r];
                this.animations[e].push(this.textures[i]);
            }
        }
    }, t.prototype._parseComplete = function() {
        var t2 = this._callback;
        this._callback = null, this._batchIndex = 0, t2.call(this, this.textures);
    }, t.prototype._nextBatch = function() {
        var e = this;
        this._processFrames(this._batchIndex * t.BATCH_SIZE), this._batchIndex++, setTimeout(function() {
            e._batchIndex * t.BATCH_SIZE < e._frameKeys.length ? e._nextBatch() : (e._processAnimations(), e._parseComplete());
        }, 0);
    }, t.prototype.destroy = function(t) {
        var e;
        for(var r in void 0 === t && (t = !1), this.textures)this.textures[r].destroy();
        this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, t && (null === (e = this._texture) || void 0 === e || e.destroy(), this.baseTexture.destroy()), this._texture = null, this.baseTexture = null;
    }, t.BATCH_SIZE = 1000, t;
}(), ch = function() {
    function t() {
    }
    return t.use = function(e, r) {
        var i, n, o = this, s = e.name + "_image";
        if (e.data && e.type === ds.TYPE.JSON && e.data.frames && !o.resources[s]) {
            var a = null === (n = null === (i = e.data) || void 0 === i ? void 0 : i.meta) || void 0 === n ? void 0 : n.related_multi_packs;
            if (Array.isArray(a)) for(var h = function(t) {
                if ("string" != typeof t) return "continue";
                var r1 = t.replace(".json", ""), i1 = be.resolve(e.url.replace(o.baseUrl, ""), t);
                if (o.resources[r1] || Object.values(o.resources).some(function(t) {
                    return be.format(be.parse(t.url)) === i1;
                })) return "continue";
                var n1 = {
                    crossOrigin: e.crossOrigin,
                    loadType: ds.LOAD_TYPE.XHR,
                    xhrType: ds.XHR_RESPONSE_TYPE.JSON,
                    parentResource: e,
                    metadata: e.metadata
                };
                o.add(r1, i1, n1);
            }, u = 0, l = a; u < l.length; u++)h(l[u]);
            var c = {
                crossOrigin: e.crossOrigin,
                metadata: e.metadata.imageMetadata,
                parentResource: e
            }, d = t.getResourcePath(e, o.baseUrl);
            o.add(s, d, c, function(t) {
                if (t.error) r(t.error);
                else {
                    var i = new lh(t.texture, e.data, e.url);
                    i.parse(function() {
                        e.spritesheet = i, e.textures = i.textures, r();
                    });
                }
            });
        } else r();
    }, t.getResourcePath = function(t, e) {
        return t.isDataUrl ? t.data.meta.image : be.resolve(t.url.replace(e, ""), t.data.meta.image);
    }, t;
}(), dh = function(t, e) {
    return (dh = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
};
function fh(t, e) {
    function r() {
        this.constructor = t;
    }
    dh(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
}
var ph = new fr, _h = function(t) {
    function e(e, r, i) {
        void 0 === r && (r = 100), void 0 === i && (i = 100);
        var n = t.call(this, e) || this;
        return n.tileTransform = new Rr, n._width = r, n._height = i, n.uvMatrix = n.texture.uvMatrix || new qn(e), n.pluginName = "tilingSprite", n.uvRespectAnchor = !1, n;
    }
    return fh(e, t), Object.defineProperty(e.prototype, "clampMargin", {
        get: function() {
            return this.uvMatrix.clampMargin;
        },
        set: function(t) {
            this.uvMatrix.clampMargin = t, this.uvMatrix.update(!0);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "tileScale", {
        get: function() {
            return this.tileTransform.scale;
        },
        set: function(t) {
            this.tileTransform.scale.copyFrom(t);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "tilePosition", {
        get: function() {
            return this.tileTransform.position;
        },
        set: function(t) {
            this.tileTransform.position.copyFrom(t);
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype._onTextureUpdate = function() {
        this.uvMatrix && (this.uvMatrix.texture = this._texture), this._cachedTint = 16777215;
    }, e.prototype._render = function(t) {
        var e1 = this._texture;
        e1 && e1.valid && (this.tileTransform.updateLocalTransform(), this.uvMatrix.update(), t.batch.setObjectRenderer(t.plugins[this.pluginName]), t.plugins[this.pluginName].render(this));
    }, e.prototype._calculateBounds = function() {
        var t2 = this._width * -this._anchor._x, e1 = this._height * -this._anchor._y, r = this._width * (1 - this._anchor._x), i = this._height * (1 - this._anchor._y);
        this._bounds.addFrame(this.transform, t2, e1, r, i);
    }, e.prototype.getLocalBounds = function(e) {
        return 0 === this.children.length ? (this._bounds.minX = this._width * -this._anchor._x, this._bounds.minY = this._height * -this._anchor._y, this._bounds.maxX = this._width * (1 - this._anchor._x), this._bounds.maxY = this._height * (1 - this._anchor._y), e || (this._localBoundsRect || (this._localBoundsRect = new hr), e = this._localBoundsRect), this._bounds.getRectangle(e)) : t.prototype.getLocalBounds.call(this, e);
    }, e.prototype.containsPoint = function(t) {
        this.worldTransform.applyInverse(t, ph);
        var e1 = this._width, r = this._height, i = -e1 * this.anchor._x;
        if (ph.x >= i && ph.x < i + e1) {
            var n = -r * this.anchor._y;
            if (ph.y >= n && ph.y < n + r) return !0;
        }
        return !1;
    }, e.prototype.destroy = function(e) {
        t.prototype.destroy.call(this, e), this.tileTransform = null, this.uvMatrix = null;
    }, e.from = function(t, r) {
        return new e(t instanceof ki ? t : ki.from(t, r), r.width, r.height);
    }, Object.defineProperty(e.prototype, "width", {
        get: function() {
            return this._width;
        },
        set: function(t) {
            this._width = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
        get: function() {
            return this._height;
        },
        set: function(t) {
            this._height = t;
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(Fa), mh = "#version 100\n#define SHADER_NAME Tiling-Sprite-100\n\nprecision lowp float;\n\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", vh = new _r, yh = function(t) {
    function e(e) {
        var r = t.call(this, e) || this;
        return e.runners.contextChange.add(r), r.quad = new tn, r.state = jn.for2d(), r;
    }
    return fh(e, t), e.prototype.contextChange = function() {
        var t2 = this.renderer, e1 = {
            globals: t2.globalUniforms
        };
        this.simpleShader = Hn.from(mh, "#version 100\n#define SHADER_NAME Tiling-Sprite-Simple-100\n\nprecision lowp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n    vec4 texSample = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = texSample * uColor;\n}\n", e1), this.shader = t2.context.webGLVersion > 1 ? Hn.from("#version 300 es\n#define SHADER_NAME Tiling-Sprite-300\n\nprecision lowp float;\n\nin vec2 aVertexPosition;\nin vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nout vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", "#version 300 es\n#define SHADER_NAME Tiling-Sprite-100\n\nprecision lowp float;\n\nin vec2 vTextureCoord;\n\nout vec4 fragmentColor;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    vec2 unclamped = coord;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    vec4 texSample = texture(uSampler, coord, unclamped == coord ? 0.0f : -32.0f);// lod-bias very negative to force lod 0\n\n    fragmentColor = texSample * uColor;\n}\n", e1) : Hn.from(mh, "#version 100\n#ifdef GL_EXT_shader_texture_lod\n    #extension GL_EXT_shader_texture_lod : enable\n#endif\n#define SHADER_NAME Tiling-Sprite-100\n\nprecision lowp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    vec2 unclamped = coord;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    #ifdef GL_EXT_shader_texture_lod\n        vec4 texSample = unclamped == coord\n            ? texture2D(uSampler, coord) \n            : texture2DLodEXT(uSampler, coord, 0);\n    #else\n        vec4 texSample = texture2D(uSampler, coord);\n    #endif\n\n    gl_FragColor = texSample * uColor;\n}\n", e1);
    }, e.prototype.render = function(t) {
        var e1 = this.renderer, r = this.quad, i = r.vertices;
        i[0] = i[6] = t._width * -t.anchor.x, i[1] = i[3] = t._height * -t.anchor.y, i[2] = i[4] = t._width * (1 - t.anchor.x), i[5] = i[7] = t._height * (1 - t.anchor.y);
        var n = t.uvRespectAnchor ? t.anchor.x : 0, o = t.uvRespectAnchor ? t.anchor.y : 0;
        (i = r.uvs)[0] = i[6] = -n, i[1] = i[3] = -o, i[2] = i[4] = 1 - n, i[5] = i[7] = 1 - o, r.invalidate();
        var s = t._texture, a = s.baseTexture, h = t.tileTransform.localTransform, u = t.uvMatrix, l = a.isPowerOfTwo && s.frame.width === a.width && s.frame.height === a.height;
        l && (a._glTextures[e1.CONTEXT_UID] ? l = a.wrapMode !== fe.CLAMP : a.wrapMode === fe.CLAMP && (a.wrapMode = fe.REPEAT));
        var c = l ? this.simpleShader : this.shader, d = s.width, f = s.height, p = t._width, _ = t._height;
        vh.set(h.a * d / p, h.b * d / _, h.c * f / p, h.d * f / _, h.tx / p, h.ty / _), vh.invert(), l ? vh.prepend(u.mapCoord) : (c.uniforms.uMapCoord = u.mapCoord.toArray(!0), c.uniforms.uClampFrame = u.uClampFrame, c.uniforms.uClampOffset = u.uClampOffset), c.uniforms.uTransform = vh.toArray(!0), c.uniforms.uColor = Fe(t.tint, t.worldAlpha, c.uniforms.uColor, a.alphaMode), c.uniforms.translationMatrix = t.transform.worldTransform.toArray(!0), c.uniforms.uSampler = s, e1.shader.bind(c), e1.geometry.bind(r), this.state.blendMode = Ce(t.blendMode, a.alphaMode), e1.state.set(this.state), e1.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0);
    }, e;
}(hn), gh = function(t, e) {
    return (gh = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
};
function Eh(t, e) {
    function r() {
        this.constructor = t;
    }
    gh(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
}
var Th = function() {
    function t(t, e) {
        this.uvBuffer = t, this.uvMatrix = e, this.data = null, this._bufferUpdateId = -1, this._textureUpdateId = -1, this._updateID = 0;
    }
    return t.prototype.update = function(t) {
        if (t || this._bufferUpdateId !== this.uvBuffer._updateID || this._textureUpdateId !== this.uvMatrix._updateID) {
            this._bufferUpdateId = this.uvBuffer._updateID, this._textureUpdateId = this.uvMatrix._updateID;
            var e = this.uvBuffer.data;
            this.data && this.data.length === e.length || (this.data = new Float32Array(e.length)), this.uvMatrix.multiplyUvs(e, this.data), this._updateID++;
        }
    }, t;
}(), bh = new fr, xh = new cr, Rh = function(t) {
    function e(e, r, i, n) {
        void 0 === n && (n = ae.TRIANGLES);
        var o = t.call(this) || this;
        return o.geometry = e, o.shader = r, o.state = i || jn.for2d(), o.drawMode = n, o.start = 0, o.size = 0, o.uvs = null, o.indices = null, o.vertexData = new Float32Array(1), o.vertexDirty = -1, o._transformID = -1, o._roundPixels = et.ROUND_PIXELS, o.batchUvs = null, o;
    }
    return Eh(e, t), Object.defineProperty(e.prototype, "geometry", {
        get: function() {
            return this._geometry;
        },
        set: function(t) {
            this._geometry !== t && (this._geometry && (this._geometry.refCount--, 0 === this._geometry.refCount && this._geometry.dispose()), this._geometry = t, this._geometry && this._geometry.refCount++, this.vertexDirty = -1);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "uvBuffer", {
        get: function() {
            return this.geometry.buffers[1];
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "verticesBuffer", {
        get: function() {
            return this.geometry.buffers[0];
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "material", {
        get: function() {
            return this.shader;
        },
        set: function(t) {
            this.shader = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "blendMode", {
        get: function() {
            return this.state.blendMode;
        },
        set: function(t) {
            this.state.blendMode = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "roundPixels", {
        get: function() {
            return this._roundPixels;
        },
        set: function(t) {
            this._roundPixels !== t && (this._transformID = -1), this._roundPixels = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "tint", {
        get: function() {
            return "tint" in this.shader ? this.shader.tint : null;
        },
        set: function(t) {
            this.shader.tint = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "texture", {
        get: function() {
            return "texture" in this.shader ? this.shader.texture : null;
        },
        set: function(t) {
            this.shader.texture = t;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype._render = function(t) {
        var r = this.geometry.buffers[0].data;
        this.shader.batchable && this.drawMode === ae.TRIANGLES && r.length < 2 * e.BATCHABLE_SIZE ? this._renderToBatch(t) : this._renderDefault(t);
    }, e.prototype._renderDefault = function(t) {
        var e1 = this.shader;
        e1.alpha = this.worldAlpha, e1.update && e1.update(), t.batch.flush(), e1.uniforms.translationMatrix = this.transform.worldTransform.toArray(!0), t.shader.bind(e1), t.state.set(this.state), t.geometry.bind(this.geometry, e1), t.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount);
    }, e.prototype._renderToBatch = function(t) {
        var e1 = this.geometry, r = this.shader;
        r.uvMatrix && (r.uvMatrix.update(), this.calculateUvs()), this.calculateVertices(), this.indices = e1.indexBuffer.data, this._tintRGB = r._tintRGB, this._texture = r.texture;
        var i = this.material.pluginName;
        t.batch.setObjectRenderer(t.plugins[i]), t.plugins[i].render(this);
    }, e.prototype.calculateVertices = function() {
        var t2 = this.geometry.buffers[0], e = t2.data, r = t2._updateID;
        if (r !== this.vertexDirty || this._transformID !== this.transform._worldID) {
            this._transformID = this.transform._worldID, this.vertexData.length !== e.length && (this.vertexData = new Float32Array(e.length));
            for(var i = this.transform.worldTransform, n = i.a, o = i.b, s = i.c, a = i.d, h = i.tx, u = i.ty, l = this.vertexData, c = 0; c < l.length / 2; c++){
                var d = e[2 * c], f = e[2 * c + 1];
                l[2 * c] = n * d + s * f + h, l[2 * c + 1] = o * d + a * f + u;
            }
            if (this._roundPixels) {
                var p = et.RESOLUTION;
                for(c = 0; c < l.length; ++c)l[c] = Math.round((l[c] * p | 0) / p);
            }
            this.vertexDirty = r;
        }
    }, e.prototype.calculateUvs = function() {
        var t2 = this.geometry.buffers[1], e1 = this.shader;
        e1.uvMatrix.isSimple ? this.uvs = t2.data : (this.batchUvs || (this.batchUvs = new Th(t2, e1.uvMatrix)), this.batchUvs.update(), this.uvs = this.batchUvs.data);
    }, e.prototype._calculateBounds = function() {
        this.calculateVertices(), this._bounds.addVertexData(this.vertexData, 0, this.vertexData.length);
    }, e.prototype.containsPoint = function(t) {
        if (!this.getBounds().contains(t.x, t.y)) return !1;
        this.worldTransform.applyInverse(t, bh);
        for(var e = this.geometry.getBuffer("aVertexPosition").data, r = xh.points, i = this.geometry.getIndex().data, n = i.length, o = 4 === this.drawMode ? 3 : 1, s = 0; s + 2 < n; s += o){
            var a = 2 * i[s], h = 2 * i[s + 1], u = 2 * i[s + 2];
            if (r[0] = e[a], r[1] = e[a + 1], r[2] = e[h], r[3] = e[h + 1], r[4] = e[u], r[5] = e[u + 1], xh.contains(bh.x, bh.y)) return !0;
        }
        return !1;
    }, e.prototype.destroy = function(e) {
        t.prototype.destroy.call(this, e), this._cachedTexture && (this._cachedTexture.destroy(), this._cachedTexture = null), this.geometry = null, this.shader = null, this.state = null, this.uvs = null, this.indices = null, this.vertexData = null;
    }, e.BATCHABLE_SIZE = 100, e;
}(Zr), Ah = "varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}\n", Oh = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTextureMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\n}\n", Sh = function(t) {
    function e(e, r) {
        var i = this, n = {
            uSampler: e,
            alpha: 1,
            uTextureMatrix: _r.IDENTITY,
            uColor: new Float32Array([
                1,
                1,
                1,
                1
            ])
        };
        return (r = Object.assign({
            tint: 16777215,
            alpha: 1,
            pluginName: "batch"
        }, r)).uniforms && Object.assign(n, r.uniforms), (i = t.call(this, r.program || kn.from(Oh, Ah), n) || this)._colorDirty = !1, i.uvMatrix = new qn(e), i.batchable = void 0 === r.program, i.pluginName = r.pluginName, i.tint = r.tint, i.alpha = r.alpha, i;
    }
    return Eh(e, t), Object.defineProperty(e.prototype, "texture", {
        get: function() {
            return this.uniforms.uSampler;
        },
        set: function(t) {
            this.uniforms.uSampler !== t && (this.uniforms.uSampler = t, this.uvMatrix.texture = t);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "alpha", {
        get: function() {
            return this._alpha;
        },
        set: function(t) {
            t !== this._alpha && (this._alpha = t, this._colorDirty = !0);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "tint", {
        get: function() {
            return this._tint;
        },
        set: function(t) {
            t !== this._tint && (this._tint = t, this._tintRGB = (t >> 16) + (65280 & t) + ((255 & t) << 16), this._colorDirty = !0);
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.update = function() {
        if (this._colorDirty) {
            this._colorDirty = !1;
            var t = this.texture.baseTexture;
            Fe(this._tint, this._alpha, this.uniforms.uColor, t.alphaMode);
        }
        this.uvMatrix.update() && (this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord);
    }, e;
}(Hn), Ih = function(t) {
    function e(e, r, i) {
        var n = t.call(this) || this, o = new zi(e), s = new zi(r, !0), a = new zi(i, !0, !0);
        return n.addAttribute("aVertexPosition", o, 2, !1, le.FLOAT).addAttribute("aTextureCoord", s, 2, !1, le.FLOAT).addIndex(a), n._updateId = -1, n;
    }
    return Eh(e, t), Object.defineProperty(e.prototype, "vertexDirtyId", {
        get: function() {
            return this.buffers[0]._updateID;
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(Qi), Ph = function(t, e) {
    return (Ph = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
}, Nh = function() {
    this.info = [], this.common = [], this.page = [], this.char = [], this.kerning = [], this.distanceField = [];
}, Mh = function() {
    function t() {
    }
    return t.test = function(t) {
        return "string" == typeof t && 0 === t.indexOf("info face=");
    }, t.parse = function(t) {
        var e = t.match(/^[a-z]+\s+.+$/gm), r = {
            info: [],
            common: [],
            page: [],
            char: [],
            chars: [],
            kerning: [],
            kernings: [],
            distanceField: []
        };
        for(var i in e){
            var n = e[i].match(/^[a-z]+/gm)[0], o = e[i].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm), s = {
            };
            for(var a in o){
                var h = o[a].split("="), u = h[0], l = h[1].replace(/"/gm, ""), c = parseFloat(l), d = isNaN(c) ? l : c;
                s[u] = d;
            }
            r[n].push(s);
        }
        var f = new Nh;
        return r.info.forEach(function(t) {
            return f.info.push({
                face: t.face,
                size: parseInt(t.size, 10)
            });
        }), r.common.forEach(function(t) {
            return f.common.push({
                lineHeight: parseInt(t.lineHeight, 10)
            });
        }), r.page.forEach(function(t) {
            return f.page.push({
                id: parseInt(t.id, 10),
                file: t.file
            });
        }), r.char.forEach(function(t) {
            return f.char.push({
                id: parseInt(t.id, 10),
                page: parseInt(t.page, 10),
                x: parseInt(t.x, 10),
                y: parseInt(t.y, 10),
                width: parseInt(t.width, 10),
                height: parseInt(t.height, 10),
                xoffset: parseInt(t.xoffset, 10),
                yoffset: parseInt(t.yoffset, 10),
                xadvance: parseInt(t.xadvance, 10)
            });
        }), r.kerning.forEach(function(t) {
            return f.kerning.push({
                first: parseInt(t.first, 10),
                second: parseInt(t.second, 10),
                amount: parseInt(t.amount, 10)
            });
        }), r.distanceField.forEach(function(t) {
            return f.distanceField.push({
                distanceRange: parseInt(t.distanceRange, 10),
                fieldType: t.fieldType
            });
        }), f;
    }, t;
}(), Dh = function() {
    function t() {
    }
    return t.test = function(t) {
        return t instanceof XMLDocument && t.getElementsByTagName("page").length && null !== t.getElementsByTagName("info")[0].getAttribute("face");
    }, t.parse = function(t) {
        for(var e = new Nh, r = t.getElementsByTagName("info"), i = t.getElementsByTagName("common"), n = t.getElementsByTagName("page"), o = t.getElementsByTagName("char"), s = t.getElementsByTagName("kerning"), a = t.getElementsByTagName("distanceField"), h = 0; h < r.length; h++)e.info.push({
            face: r[h].getAttribute("face"),
            size: parseInt(r[h].getAttribute("size"), 10)
        });
        for(h = 0; h < i.length; h++)e.common.push({
            lineHeight: parseInt(i[h].getAttribute("lineHeight"), 10)
        });
        for(h = 0; h < n.length; h++)e.page.push({
            id: parseInt(n[h].getAttribute("id"), 10) || 0,
            file: n[h].getAttribute("file")
        });
        for(h = 0; h < o.length; h++){
            var u = o[h];
            e.char.push({
                id: parseInt(u.getAttribute("id"), 10),
                page: parseInt(u.getAttribute("page"), 10) || 0,
                x: parseInt(u.getAttribute("x"), 10),
                y: parseInt(u.getAttribute("y"), 10),
                width: parseInt(u.getAttribute("width"), 10),
                height: parseInt(u.getAttribute("height"), 10),
                xoffset: parseInt(u.getAttribute("xoffset"), 10),
                yoffset: parseInt(u.getAttribute("yoffset"), 10),
                xadvance: parseInt(u.getAttribute("xadvance"), 10)
            });
        }
        for(h = 0; h < s.length; h++)e.kerning.push({
            first: parseInt(s[h].getAttribute("first"), 10),
            second: parseInt(s[h].getAttribute("second"), 10),
            amount: parseInt(s[h].getAttribute("amount"), 10)
        });
        for(h = 0; h < a.length; h++)e.distanceField.push({
            fieldType: a[h].getAttribute("fieldType"),
            distanceRange: parseInt(a[h].getAttribute("distanceRange"), 10)
        });
        return e;
    }, t;
}(), Ch = function() {
    function t() {
    }
    return t.test = function(t) {
        if ("string" == typeof t && t.indexOf("<font>") > -1) {
            var e = (new self.DOMParser).parseFromString(t, "text/xml");
            return Dh.test(e);
        }
        return !1;
    }, t.parse = function(t) {
        var e = (new self.DOMParser).parseFromString(t, "text/xml");
        return Dh.parse(e);
    }, t;
}(), wh = [
    Mh,
    Dh,
    Ch
];
function Lh(t) {
    for(var e1 = 0; e1 < wh.length; e1++)if (wh[e1].test(t)) return wh[e1];
    return null;
}
function Fh(t, e, r, i, n, o, s) {
    var a1 = r.text, h1 = r.fontProperties;
    e.translate(i, n), e.scale(o, o);
    var u1 = s.strokeThickness / 2, l1 = -s.strokeThickness / 2;
    e.font = s.toFontString(), e.lineWidth = s.strokeThickness, e.textBaseline = s.textBaseline, e.lineJoin = s.lineJoin, e.miterLimit = s.miterLimit, e.fillStyle = (function(t, e, r, i, n, o) {
        var s1, a11 = r.fill;
        if (!Array.isArray(a11)) return a11;
        if (1 === a11.length) return a11[0];
        var h11 = r.dropShadow ? r.dropShadowDistance : 0, u11 = r.padding || 0, l = t.width / i - h11 - 2 * u11, c = t.height / i - h11 - 2 * u11, d = a11.slice(), f = r.fillGradientStops.slice();
        if (!f.length) for(var p = d.length + 1, _ = 1; _ < p; ++_)f.push(_ / p);
        if (d.unshift(a11[0]), f.unshift(0), d.push(a11[a11.length - 1]), f.push(1), r.fillGradientType === xa.LINEAR_VERTICAL) {
            s1 = e.createLinearGradient(l / 2, u11, l / 2, c + u11);
            var m = 0, v = (o.fontProperties.fontSize + r.strokeThickness) / c;
            for(_ = 0; _ < n.length; _++)for(var y = o.lineHeight * _, g = 0; g < d.length; g++){
                var E = y / c + ("number" == typeof f[g] ? f[g] : g / d.length) * v, T = Math.max(m, E);
                T = Math.min(T, 1), s1.addColorStop(T, d[g]), m = T;
            }
        } else {
            s1 = e.createLinearGradient(u11, c / 2, l + u11, c / 2);
            var b = d.length + 1, x = 1;
            for(_ = 0; _ < d.length; _++){
                var R;
                R = "number" == typeof f[_] ? f[_] : x / b, s1.addColorStop(R, d[_]), x++;
            }
        }
        return s1;
    })(t, e, s, o, [
        a1
    ], r), e.strokeStyle = s.stroke;
    var c1 = s.dropShadowColor, d1 = Pe("number" == typeof c1 ? c1 : Me(c1));
    s.dropShadow ? (e.shadowColor = "rgba(" + 255 * d1[0] + "," + 255 * d1[1] + "," + 255 * d1[2] + "," + s.dropShadowAlpha + ")", e.shadowBlur = s.dropShadowBlur, e.shadowOffsetX = Math.cos(s.dropShadowAngle) * s.dropShadowDistance, e.shadowOffsetY = Math.sin(s.dropShadowAngle) * s.dropShadowDistance) : (e.shadowColor = "black", e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0), s.stroke && s.strokeThickness && e.strokeText(a1, u1, l1 + r.lineHeight - h1.descent), s.fill && e.fillText(a1, u1, l1 + r.lineHeight - h1.descent), e.setTransform(1, 0, 0, 1, 0, 0), e.fillStyle = "rgba(0, 0, 0, 0)";
}
function Uh(t) {
    return Array.from ? Array.from(t) : t.split("");
}
function Gh(t) {
    return t.codePointAt ? t.codePointAt(0) : t.charCodeAt(0);
}
var Bh = function() {
    function t(t, e, r) {
        var i, n, o = t.info[0], s = t.common[0], a = t.page[0], h = t.distanceField[0], u = rr(a.file), l = {
        };
        this._ownsTextures = r, this.font = o.face, this.size = o.size, this.lineHeight = s.lineHeight / u, this.chars = {
        }, this.pageTextures = l;
        for(var c = 0; c < t.page.length; c++){
            var d = t.page[c], f = d.id, p = d.file;
            l[f] = e instanceof Array ? e[c] : e[p], (null == h ? void 0 : h.fieldType) && "none" !== h.fieldType && (l[f].baseTexture.alphaMode = _e.NO_PREMULTIPLIED_ALPHA);
        }
        for(c = 0; c < t.char.length; c++){
            var _ = t.char[c], m = (f = _.id, _.page), v = t.char[c], y = v.x, g = v.y, E = v.width, T = v.height, b = v.xoffset, x = v.yoffset, R = v.xadvance;
            g /= u, E /= u, T /= u, b /= u, x /= u, R /= u;
            var A = new hr((y /= u) + l[m].frame.x / u, g + l[m].frame.y / u, E, T);
            this.chars[f] = {
                xOffset: b,
                yOffset: x,
                xAdvance: R,
                kerning: {
                },
                texture: new ki(l[m].baseTexture, A),
                page: m
            };
        }
        for(c = 0; c < t.kerning.length; c++){
            var O = t.kerning[c], S = O.first, I = O.second, P = O.amount;
            S /= u, I /= u, P /= u, this.chars[I] && (this.chars[I].kerning[S] = P);
        }
        this.distanceFieldRange = null == h ? void 0 : h.distanceRange, this.distanceFieldType = null !== (n = null === (i = null == h ? void 0 : h.fieldType) || void 0 === i ? void 0 : i.toLowerCase()) && void 0 !== n ? n : "none";
    }
    return t.prototype.destroy = function() {
        for(var t2 in this.chars)this.chars[t2].texture.destroy(), this.chars[t2].texture = null;
        for(var t2 in this.pageTextures)this._ownsTextures && this.pageTextures[t2].destroy(!0), this.pageTextures[t2] = null;
        this.chars = null, this.pageTextures = null;
    }, t.install = function(e, r, i) {
        var n;
        if (e instanceof Nh) n = e;
        else {
            var o = Lh(e);
            if (!o) throw new Error("Unrecognized data format for font.");
            n = o.parse(e);
        }
        r instanceof ki && (r = [
            r
        ]);
        var s = new t(n, r, i);
        return t.available[s.font] = s, s;
    }, t.uninstall = function(e) {
        var r = t.available[e];
        if (!r) throw new Error("No font found named '" + e + "'");
        r.destroy(), delete t.available[e];
    }, t.from = function(e, r, i) {
        if (!e) throw new Error("[BitmapFont] Property `name` is required.");
        var n = Object.assign({
        }, t.defaultOptions, i), o = n.chars, s = n.padding, a = n.resolution, h = n.textureWidth, u = n.textureHeight, l = function(t) {
            "string" == typeof t && (t = [
                t
            ]);
            for(var e1 = [], r1 = 0, i1 = t.length; r1 < i1; r1++){
                var n = t[r1];
                if (Array.isArray(n)) {
                    if (2 !== n.length) throw new Error("[BitmapFont]: Invalid character range length, expecting 2 got " + n.length + ".");
                    var o = n[0].charCodeAt(0), s = n[1].charCodeAt(0);
                    if (s < o) throw new Error("[BitmapFont]: Invalid character range.");
                    for(var a = o, h = s; a <= h; a++)e1.push(String.fromCharCode(a));
                } else e1.push.apply(e1, Uh(n));
            }
            if (0 === e1.length) throw new Error("[BitmapFont]: Empty set when resolving characters.");
            return e1;
        }(o), c = r instanceof Xa ? r : new Xa(r), d = h, f1 = new Nh;
        f1.info[0] = {
            face: c.fontFamily,
            size: c.fontSize
        }, f1.common[0] = {
            lineHeight: c.fontSize
        };
        for(var p, _, m, v = 0, y = 0, g = 0, E = [], T = 0; T < l.length; T++){
            p || ((p = document.createElement("canvas")).width = h, p.height = u, _ = p.getContext("2d"), m = new Ai(p, {
                resolution: a
            }), E.push(new ki(m)), f1.page.push({
                id: E.length - 1,
                file: ""
            }));
            var b = Ya.measureText(l[T], c, !1, p), x = b.width, R = Math.ceil(b.height), A = Math.ceil(("italic" === c.fontStyle ? 2 : 1) * x);
            if (y >= u - R * a) {
                if (0 === y) throw new Error("[BitmapFont] textureHeight " + u + "px is too small for " + c.fontSize + "px fonts");
                --T, p = null, _ = null, m = null, y = 0, v = 0, g = 0;
            } else if (g = Math.max(R + b.fontProperties.descent, g), A * a + v >= d) --T, y += g * a, y = Math.ceil(y), v = 0, g = 0;
            else {
                Fh(p, _, b, v, y, a, c);
                var O = Gh(b.text);
                f1.char.push({
                    id: O,
                    page: E.length - 1,
                    x: v / a,
                    y: y / a,
                    width: A,
                    height: R,
                    xoffset: 0,
                    yoffset: 0,
                    xadvance: Math.ceil(x - (c.dropShadow ? c.dropShadowDistance : 0) - (c.stroke ? c.strokeThickness : 0))
                }), v += (A + 2 * s) * a, v = Math.ceil(v);
            }
        }
        T = 0;
        for(var S = l.length; T < S; T++)for(var I = l[T], P = 0; P < S; P++){
            var N = l[P], M = _.measureText(I).width, D = _.measureText(N).width, C = _.measureText(I + N).width - (M + D);
            C && f1.kerning.push({
                first: Gh(I),
                second: Gh(N),
                amount: C
            });
        }
        var w = new t(f1, E, !0);
        return void 0 !== t.available[e] && t.uninstall(e), t.available[e] = w, w;
    }, t.ALPHA = [
        [
            "a",
            "z"
        ],
        [
            "A",
            "Z"
        ],
        " "
    ], t.NUMERIC = [
        [
            "0",
            "9"
        ]
    ], t.ALPHANUMERIC = [
        [
            "a",
            "z"
        ],
        [
            "A",
            "Z"
        ],
        [
            "0",
            "9"
        ],
        " "
    ], t.ASCII = [
        [
            " ",
            "~"
        ]
    ], t.defaultOptions = {
        resolution: 1,
        textureWidth: 512,
        textureHeight: 512,
        padding: 4,
        chars: t.ALPHANUMERIC
    }, t.available = {
    }, t;
}(), Xh = [], kh = [], Hh = [], jh = function(t) {
    function e(r, i) {
        void 0 === i && (i = {
        });
        var n = t.call(this) || this;
        n._tint = 16777215;
        var o = Object.assign({
        }, e.styleDefaults, i), s = o.align, a = o.tint, h = o.maxWidth, u = o.letterSpacing, l = o.fontName, c = o.fontSize;
        if (!Bh.available[l]) throw new Error('Missing BitmapFont "' + l + '"');
        return n._activePagesMeshData = [], n._textWidth = 0, n._textHeight = 0, n._align = s, n._tint = a, n._fontName = l, n._fontSize = c || Bh.available[l].size, n._text = r, n._maxWidth = h, n._maxLineHeight = 0, n._letterSpacing = u, n._anchor = new pr(function() {
            n.dirty = !0;
        }, n, 0, 0), n._roundPixels = et.ROUND_PIXELS, n.dirty = !0, n._textureCache = {
        }, n;
    }
    return (function(t, e) {
        function r() {
            this.constructor = t;
        }
        Ph(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
    })(e, t), e.prototype.updateText = function() {
        for(var t, e1 = Bh.available[this._fontName], r = this._fontSize / e1.size, i = new fr, n = [], o = [], s = [], a = Uh(this._text.replace(/(?:\r\n|\r)/g, "\n") || " "), h = this._maxWidth * e1.size / this._fontSize, u = "none" === e1.distanceFieldType ? Xh : kh, l = null, c = 0, d = 0, f = 0, p = -1, _ = 0, m = 0, v = 0, y = 0, g = 0; g < a.length; g++){
            var E = Gh(X = a[g]);
            if (/(?:\s)/.test(X) && (p = g, _ = c, y++), "\r" !== X && "\n" !== X) {
                var T = e1.chars[E];
                if (T) {
                    l && T.kerning[l] && (i.x += T.kerning[l]);
                    var b = Hh.pop() || {
                        texture: ki.EMPTY,
                        line: 0,
                        charCode: 0,
                        prevSpaces: 0,
                        position: new fr
                    };
                    b.texture = T.texture, b.line = f, b.charCode = E, b.position.x = i.x + T.xOffset + this._letterSpacing / 2, b.position.y = i.y + T.yOffset, b.prevSpaces = y, n.push(b), c = b.position.x + T.texture.orig.width, i.x += T.xAdvance + this._letterSpacing, v = Math.max(v, T.yOffset + T.texture.height), l = E, -1 !== p && h > 0 && i.x > h && (je(n, 1 + p - ++m, 1 + g - p), g = p, p = -1, o.push(_), s.push(n.length > 0 ? n[n.length - 1].prevSpaces : 0), d = Math.max(d, _), f++, i.x = 0, i.y += e1.lineHeight, l = null, y = 0);
                }
            } else o.push(c), s.push(-1), d = Math.max(d, c), ++f, ++m, i.x = 0, i.y += e1.lineHeight, l = null, y = 0;
        }
        var x = a[a.length - 1];
        "\r" !== x && "\n" !== x && (/(?:\s)/.test(x) && (c = _), o.push(c), d = Math.max(d, c), s.push(-1));
        var R = [];
        for(g = 0; g <= f; g++){
            var A = 0;
            "right" === this._align ? A = d - o[g] : "center" === this._align ? A = (d - o[g]) / 2 : "justify" === this._align && (A = s[g] < 0 ? 0 : (d - o[g]) / s[g]), R.push(A);
        }
        var O = n.length, S = {
        }, I = [], P = this._activePagesMeshData;
        for(g = 0; g < P.length; g++)u.push(P[g]);
        for(g = 0; g < O; g++){
            var N = (H = n[g].texture).baseTexture.uid;
            if (!S[N]) {
                if (!(K = u.pop())) {
                    var M = new Ih, D = void 0, C = void 0;
                    "none" === e1.distanceFieldType ? (D = new Sh(ki.EMPTY), C = se.NORMAL) : (D = new Sh(ki.EMPTY, {
                        program: kn.from("// Mesh material default fragment\r\nattribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\n\r\nuniform mat3 projectionMatrix;\r\nuniform mat3 translationMatrix;\r\nuniform mat3 uTextureMatrix;\r\n\r\nvarying vec2 vTextureCoord;\r\n\r\nvoid main(void)\r\n{\r\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r\n\r\n    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\r\n}\r\n", "// Pixi texture info\r\nvarying vec2 vTextureCoord;\r\nuniform sampler2D uSampler;\r\n\r\n// Tint\r\nuniform vec4 uColor;\r\n\r\n// on 2D applications fwidth is screenScale / glyphAtlasScale * distanceFieldRange\r\nuniform float uFWidth;\r\n\r\nvoid main(void) {\r\n\r\n  // To stack MSDF and SDF we need a non-pre-multiplied-alpha texture.\r\n  vec4 texColor = texture2D(uSampler, vTextureCoord);\r\n\r\n  // MSDF\r\n  float median = texColor.r + texColor.g + texColor.b -\r\n                  min(texColor.r, min(texColor.g, texColor.b)) -\r\n                  max(texColor.r, max(texColor.g, texColor.b));\r\n  // SDF\r\n  median = min(median, texColor.a);\r\n\r\n  float screenPxDistance = uFWidth * (median - 0.5);\r\n  float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);\r\n\r\n  // NPM Textures, NPM outputs\r\n  gl_FragColor = vec4(uColor.rgb, uColor.a * alpha);\r\n\r\n}\r\n"),
                        uniforms: {
                            uFWidth: 0
                        }
                    }), C = se.NORMAL_NPM);
                    var w = new Rh(M, D);
                    w.blendMode = C, K = {
                        index: 0,
                        indexCount: 0,
                        vertexCount: 0,
                        uvsCount: 0,
                        total: 0,
                        mesh: w,
                        vertices: null,
                        uvs: null,
                        indices: null
                    };
                }
                K.index = 0, K.indexCount = 0, K.vertexCount = 0, K.uvsCount = 0, K.total = 0;
                var L = this._textureCache;
                L[N] = L[N] || new ki(H.baseTexture), K.mesh.texture = L[N], K.mesh.tint = this._tint, I.push(K), S[N] = K;
            }
            S[N].total++;
        }
        for(g = 0; g < P.length; g++)-1 === I.indexOf(P[g]) && this.removeChild(P[g].mesh);
        for(g = 0; g < I.length; g++)I[g].mesh.parent !== this && this.addChild(I[g].mesh);
        for(var g in this._activePagesMeshData = I, S){
            var F = (K = S[g]).total;
            if (!((null === (t = K.indices) || void 0 === t ? void 0 : t.length) > 6 * F) || K.vertices.length < 2 * Rh.BATCHABLE_SIZE) K.vertices = new Float32Array(8 * F), K.uvs = new Float32Array(8 * F), K.indices = new Uint16Array(6 * F);
            else for(var U = K.total, G = K.vertices, B = 4 * U * 2; B < G.length; B++)G[B] = 0;
            K.mesh.size = 6 * F;
        }
        for(g = 0; g < O; g++){
            var X, k = (X = n[g]).position.x + R[X.line] * ("justify" === this._align ? X.prevSpaces : 1);
            this._roundPixels && (k = Math.round(k));
            var H, j = k * r, Y = X.position.y * r, V = S[(H = X.texture).baseTexture.uid], W = H.frame, z = H._uvs, q = V.index++;
            V.indices[6 * q + 0] = 0 + 4 * q, V.indices[6 * q + 1] = 1 + 4 * q, V.indices[6 * q + 2] = 2 + 4 * q, V.indices[6 * q + 3] = 0 + 4 * q, V.indices[6 * q + 4] = 2 + 4 * q, V.indices[6 * q + 5] = 3 + 4 * q, V.vertices[8 * q + 0] = j, V.vertices[8 * q + 1] = Y, V.vertices[8 * q + 2] = j + W.width * r, V.vertices[8 * q + 3] = Y, V.vertices[8 * q + 4] = j + W.width * r, V.vertices[8 * q + 5] = Y + W.height * r, V.vertices[8 * q + 6] = j, V.vertices[8 * q + 7] = Y + W.height * r, V.uvs[8 * q + 0] = z.x0, V.uvs[8 * q + 1] = z.y0, V.uvs[8 * q + 2] = z.x1, V.uvs[8 * q + 3] = z.y1, V.uvs[8 * q + 4] = z.x2, V.uvs[8 * q + 5] = z.y2, V.uvs[8 * q + 6] = z.x3, V.uvs[8 * q + 7] = z.y3;
        }
        for(var g in this._textWidth = d * r, this._textHeight = (i.y + e1.lineHeight) * r, S){
            var K = S[g];
            if (0 !== this.anchor.x || 0 !== this.anchor.y) for(var Z = 0, J = this._textWidth * this.anchor.x, Q = this._textHeight * this.anchor.y, $ = 0; $ < K.total; $++)K.vertices[Z++] -= J, K.vertices[Z++] -= Q, K.vertices[Z++] -= J, K.vertices[Z++] -= Q, K.vertices[Z++] -= J, K.vertices[Z++] -= Q, K.vertices[Z++] -= J, K.vertices[Z++] -= Q;
            this._maxLineHeight = v * r;
            var tt = K.mesh.geometry.getBuffer("aVertexPosition"), et = K.mesh.geometry.getBuffer("aTextureCoord"), rt = K.mesh.geometry.getIndex();
            tt.data = K.vertices, et.data = K.uvs, rt.data = K.indices, tt.update(), et.update(), rt.update();
        }
        for(g = 0; g < n.length; g++)Hh.push(n[g]);
    }, e.prototype.updateTransform = function() {
        this.validate(), this.containerUpdateTransform();
    }, e.prototype._render = function(e) {
        var r = Bh.available[this._fontName], i = r.distanceFieldRange, n = r.distanceFieldType, o = r.size;
        if ("none" !== n) for(var s = this.worldTransform, a = s.a, h = s.b, u = s.c, l = s.d, c = Math.sqrt(a * a + h * h), d = Math.sqrt(u * u + l * l), f = (Math.abs(c) + Math.abs(d)) / 2, p = this._fontSize / o, _ = 0, m = this._activePagesMeshData; _ < m.length; _++)m[_].mesh.shader.uniforms.uFWidth = f * i * p * e.resolution;
        t.prototype._render.call(this, e);
    }, e.prototype.getLocalBounds = function() {
        return this.validate(), t.prototype.getLocalBounds.call(this);
    }, e.prototype.validate = function() {
        this.dirty && (this.updateText(), this.dirty = !1);
    }, Object.defineProperty(e.prototype, "tint", {
        get: function() {
            return this._tint;
        },
        set: function(t) {
            if (this._tint !== t) {
                this._tint = t;
                for(var e = 0; e < this._activePagesMeshData.length; e++)this._activePagesMeshData[e].mesh.tint = t;
            }
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "align", {
        get: function() {
            return this._align;
        },
        set: function(t) {
            this._align !== t && (this._align = t, this.dirty = !0);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "fontName", {
        get: function() {
            return this._fontName;
        },
        set: function(t) {
            if (!Bh.available[t]) throw new Error('Missing BitmapFont "' + t + '"');
            this._fontName !== t && (this._fontName = t, this.dirty = !0);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "fontSize", {
        get: function() {
            return this._fontSize;
        },
        set: function(t) {
            this._fontSize !== t && (this._fontSize = t, this.dirty = !0);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "anchor", {
        get: function() {
            return this._anchor;
        },
        set: function(t) {
            "number" == typeof t ? this._anchor.set(t) : this._anchor.copyFrom(t);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "text", {
        get: function() {
            return this._text;
        },
        set: function(t) {
            t = String(null == t ? "" : t), this._text !== t && (this._text = t, this.dirty = !0);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "maxWidth", {
        get: function() {
            return this._maxWidth;
        },
        set: function(t) {
            this._maxWidth !== t && (this._maxWidth = t, this.dirty = !0);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "maxLineHeight", {
        get: function() {
            return this.validate(), this._maxLineHeight;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "textWidth", {
        get: function() {
            return this.validate(), this._textWidth;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "letterSpacing", {
        get: function() {
            return this._letterSpacing;
        },
        set: function(t) {
            this._letterSpacing !== t && (this._letterSpacing = t, this.dirty = !0);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "roundPixels", {
        get: function() {
            return this._roundPixels;
        },
        set: function(t) {
            t !== this._roundPixels && (this._roundPixels = t, this.dirty = !0);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "textHeight", {
        get: function() {
            return this.validate(), this._textHeight;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.destroy = function(e) {
        var r = this._textureCache;
        for(var i in r)r[i].destroy(), delete r[i];
        this._textureCache = null, t.prototype.destroy.call(this, e);
    }, e.styleDefaults = {
        align: "left",
        tint: 16777215,
        maxWidth: 0,
        letterSpacing: 0
    }, e;
}(Zr), Yh = function() {
    function t() {
    }
    return t.add = function() {
        ds.setExtensionXhrType("fnt", ds.XHR_RESPONSE_TYPE.TEXT);
    }, t.use = function(e, r) {
        var i = Lh(e.data);
        if (i) for(var n = t.getBaseUrl(this, e), o = i.parse(e.data), s = {
        }, a = function(t) {
            s[t.metadata.pageFile] = t.texture, Object.keys(s).length === o.page.length && (e.bitmapFont = Bh.install(o, s, !0), r());
        }, h = 0; h < o.page.length; ++h){
            var u = o.page[h].file, l = n + u, c = !1;
            for(var d in this.resources){
                var f = this.resources[d];
                if (f.url === l) {
                    f.metadata.pageFile = u, f.texture ? a(f) : f.onAfterMiddleware.add(a), c = !0;
                    break;
                }
            }
            if (!c) {
                var p = {
                    crossOrigin: e.crossOrigin,
                    loadType: ds.LOAD_TYPE.IMAGE,
                    metadata: Object.assign({
                        pageFile: u
                    }, e.metadata.imageMetadata),
                    parentResource: e
                };
                this.add(l, p, a);
            }
        }
        else r();
    }, t.getBaseUrl = function(e, r) {
        var i = r.isDataUrl ? "" : t.dirname(r.url);
        return r.isDataUrl && ("." === i && (i = ""), e.baseUrl && i && "/" === e.baseUrl.charAt(e.baseUrl.length - 1) && (i += "/")), (i = i.replace(e.baseUrl, "")) && "/" !== i.charAt(i.length - 1) && (i += "/"), i;
    }, t.dirname = function(t) {
        var e = t.replace(/\\/g, "/").replace(/\/$/, "").replace(/\/[^\/]*$/, "");
        return e === t ? "." : "" === e ? "/" : e;
    }, t;
}(), Vh = function(t, e) {
    return (Vh = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
}, Wh = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float uAlpha;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;\n}\n", zh = function(t) {
    function e(e) {
        void 0 === e && (e = 1);
        var r = t.call(this, Lo, Wh, {
            uAlpha: 1
        }) || this;
        return r.alpha = e, r;
    }
    return (function(t, e) {
        function r() {
            this.constructor = t;
        }
        Vh(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
    })(e, t), Object.defineProperty(e.prototype, "alpha", {
        get: function() {
            return this.uniforms.uAlpha;
        },
        set: function(t) {
            this.uniforms.uAlpha = t;
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(Yn), qh = function(t, e) {
    return (qh = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
};
function Kh(t, e) {
    function r() {
        this.constructor = t;
    }
    qh(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
}
var Zh, Jh, Qh, $h, tu, eu, ru, iu, nu, ou, su, au, hu, uu, lu, cu, du, fu, pu, _u = "\n    attribute vec2 aVertexPosition;\n\n    uniform mat3 projectionMatrix;\n\n    uniform float strength;\n\n    varying vec2 vBlurTexCoords[%size%];\n\n    uniform vec4 inputSize;\n    uniform vec4 outputFrame;\n\n    vec4 filterVertexPosition( void )\n    {\n        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n    }\n\n    vec2 filterTextureCoord( void )\n    {\n        return aVertexPosition * (outputFrame.zw * inputSize.zw);\n    }\n\n    void main(void)\n    {\n        gl_Position = filterVertexPosition();\n\n        vec2 textureCoord = filterTextureCoord();\n        %blur%\n    }", mu = {
    5: [
        0.153388,
        0.221461,
        0.250301
    ],
    7: [
        0.071303,
        0.131514,
        0.189879,
        0.214607
    ],
    9: [
        0.028532,
        0.067234,
        0.124009,
        0.179044,
        0.20236
    ],
    11: [
        0.0093,
        0.028002,
        0.065984,
        0.121703,
        0.175713,
        0.198596
    ],
    13: [
        0.002406,
        0.009255,
        0.027867,
        0.065666,
        0.121117,
        0.174868,
        0.197641
    ],
    15: [
        0.000489,
        0.002403,
        0.009246,
        0.02784,
        0.065602,
        0.120999,
        0.174697,
        0.197448
    ]
}, vu = [
    "varying vec2 vBlurTexCoords[%size%];",
    "uniform sampler2D uSampler;",
    "void main(void)",
    "{",
    "    gl_FragColor = vec4(0.0);",
    "    %blur%",
    "}"
].join("\n");
!function(t) {
    t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2";
}(Zh || (Zh = {
})), (function(t) {
    t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS";
})(Jh || (Jh = {
})), (function(t) {
    t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL";
})(Qh || (Qh = {
})), (function(t) {
    t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR";
})($h || ($h = {
})), (function(t) {
    t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(tu || (tu = {
})), (function(t) {
    t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(eu || (eu = {
})), (function(t) {
    t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(ru || (ru = {
})), (function(t) {
    t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(iu || (iu = {
})), (function(t) {
    t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT";
})(nu || (nu = {
})), (function(t) {
    t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR";
})(ou || (ou = {
})), (function(t) {
    t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(su || (su = {
})), (function(t) {
    t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL";
})(au || (au = {
})), (function(t) {
    t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(hu || (hu = {
})), (function(t) {
    t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT";
})(uu || (uu = {
})), (function(t) {
    t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL";
})(lu || (lu = {
})), (function(t) {
    t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp";
})(cu || (cu = {
})), (function(t) {
    t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE";
})(du || (du = {
})), (function(t) {
    t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH";
})(fu || (fu = {
})), (function(t) {
    t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})(pu || (pu = {
}));
var yu = function(t) {
    function e(e, r, i, n, o) {
        void 0 === r && (r = 8), void 0 === i && (i = 4), void 0 === n && (n = et.FILTER_RESOLUTION), void 0 === o && (o = 5);
        var s = this, a = function(t, e) {
            var r1, i = Math.ceil(t / 2), n1 = _u, o1 = "";
            r1 = e ? "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);" : "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";
            for(var s1 = 0; s1 < t; s1++){
                var a = r1.replace("%index%", s1.toString());
                o1 += a = a.replace("%sampleIndex%", s1 - (i - 1) + ".0"), o1 += "\n";
            }
            return (n1 = n1.replace("%blur%", o1)).replace("%size%", t.toString());
        }(o, e), h = function(t) {
            for(var e, r1 = mu[t], i = r1.length, n1 = vu, o1 = "", s1 = 0; s1 < t; s1++){
                var a = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;".replace("%index%", s1.toString());
                e = s1, s1 >= i && (e = t - s1 - 1), o1 += a = a.replace("%value%", r1[e].toString()), o1 += "\n";
            }
            return (n1 = n1.replace("%blur%", o1)).replace("%size%", t.toString());
        }(o);
        return (s = t.call(this, a, h) || this).horizontal = e, s.resolution = n, s._quality = 0, s.quality = i, s.blur = r, s;
    }
    return Kh(e, t), e.prototype.apply = function(t, e, r, i) {
        if (r ? this.horizontal ? this.uniforms.strength = 1 / r.width * (r.width / e.width) : this.uniforms.strength = 1 / r.height * (r.height / e.height) : this.horizontal ? this.uniforms.strength = 1 / t.renderer.width * (t.renderer.width / e.width) : this.uniforms.strength = 1 / t.renderer.height * (t.renderer.height / e.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 1 === this.passes) t.applyFilter(this, e, r, i);
        else {
            var n = t.getFilterTexture(), o = t.renderer, s = e, a = n;
            this.state.blend = !1, t.applyFilter(this, s, a, uu.CLEAR);
            for(var h = 1; h < this.passes - 1; h++){
                t.bindAndClear(s, uu.BLIT), this.uniforms.uSampler = a;
                var u = a;
                a = s, s = u, o.shader.bind(this), o.geometry.draw(5);
            }
            this.state.blend = !0, t.applyFilter(this, a, r, i), t.returnFilterTexture(n);
        }
    }, Object.defineProperty(e.prototype, "blur", {
        get: function() {
            return this.strength;
        },
        set: function(t) {
            this.padding = 1 + 2 * Math.abs(t), this.strength = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "quality", {
        get: function() {
            return this._quality;
        },
        set: function(t) {
            this._quality = t, this.passes = t;
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(Yn), gu = function(t) {
    function e(e, r, i, n) {
        void 0 === e && (e = 8), void 0 === r && (r = 4), void 0 === i && (i = et.FILTER_RESOLUTION), void 0 === n && (n = 5);
        var o = t.call(this) || this;
        return o.blurXFilter = new yu(!0, e, r, i, n), o.blurYFilter = new yu(!1, e, r, i, n), o.resolution = i, o.quality = r, o.blur = e, o.repeatEdgePixels = !1, o;
    }
    return Kh(e, t), e.prototype.apply = function(t, e, r, i) {
        var n = Math.abs(this.blurXFilter.strength), o = Math.abs(this.blurYFilter.strength);
        if (n && o) {
            var s = t.getFilterTexture();
            this.blurXFilter.apply(t, e, s, uu.CLEAR), this.blurYFilter.apply(t, s, r, i), t.returnFilterTexture(s);
        } else o ? this.blurYFilter.apply(t, e, r, i) : this.blurXFilter.apply(t, e, r, i);
    }, e.prototype.updatePadding = function() {
        this._repeatEdgePixels ? this.padding = 0 : this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength));
    }, Object.defineProperty(e.prototype, "blur", {
        get: function() {
            return this.blurXFilter.blur;
        },
        set: function(t) {
            this.blurXFilter.blur = this.blurYFilter.blur = t, this.updatePadding();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "quality", {
        get: function() {
            return this.blurXFilter.quality;
        },
        set: function(t) {
            this.blurXFilter.quality = this.blurYFilter.quality = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "blurX", {
        get: function() {
            return this.blurXFilter.blur;
        },
        set: function(t) {
            this.blurXFilter.blur = t, this.updatePadding();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "blurY", {
        get: function() {
            return this.blurYFilter.blur;
        },
        set: function(t) {
            this.blurYFilter.blur = t, this.updatePadding();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "blendMode", {
        get: function() {
            return this.blurYFilter.blendMode;
        },
        set: function(t) {
            this.blurYFilter.blendMode = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "repeatEdgePixels", {
        get: function() {
            return this._repeatEdgePixels;
        },
        set: function(t) {
            this._repeatEdgePixels = t, this.updatePadding();
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(Yn), Eu = function(t, e) {
    return (Eu = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
}, Tu = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\nuniform float uAlpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (uAlpha == 0.0) {\n        gl_FragColor = c;\n        return;\n    }\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (c.a > 0.0) {\n      c.rgb /= c.a;\n    }\n\n    vec4 result;\n\n    result.r = (m[0] * c.r);\n        result.r += (m[1] * c.g);\n        result.r += (m[2] * c.b);\n        result.r += (m[3] * c.a);\n        result.r += m[4];\n\n    result.g = (m[5] * c.r);\n        result.g += (m[6] * c.g);\n        result.g += (m[7] * c.b);\n        result.g += (m[8] * c.a);\n        result.g += m[9];\n\n    result.b = (m[10] * c.r);\n       result.b += (m[11] * c.g);\n       result.b += (m[12] * c.b);\n       result.b += (m[13] * c.a);\n       result.b += m[14];\n\n    result.a = (m[15] * c.r);\n       result.a += (m[16] * c.g);\n       result.a += (m[17] * c.b);\n       result.a += (m[18] * c.a);\n       result.a += m[19];\n\n    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);\n\n    // Premultiply alpha again.\n    rgb *= result.a;\n\n    gl_FragColor = vec4(rgb, result.a);\n}\n", bu = function(t) {
    function e() {
        var e1 = this, r = {
            m: new Float32Array([
                1,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                1,
                0
            ]),
            uAlpha: 1
        };
        return (e1 = t.call(this, Fo, Tu, r) || this).alpha = 1, e1;
    }
    return (function(t, e) {
        function r() {
            this.constructor = t;
        }
        Eu(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
    })(e, t), e.prototype._loadMatrix = function(t, e) {
        void 0 === e && (e = !1);
        var r = t;
        e && (this._multiply(r, this.uniforms.m, t), r = this._colorMatrix(r)), this.uniforms.m = r;
    }, e.prototype._multiply = function(t, e, r) {
        return t[0] = e[0] * r[0] + e[1] * r[5] + e[2] * r[10] + e[3] * r[15], t[1] = e[0] * r[1] + e[1] * r[6] + e[2] * r[11] + e[3] * r[16], t[2] = e[0] * r[2] + e[1] * r[7] + e[2] * r[12] + e[3] * r[17], t[3] = e[0] * r[3] + e[1] * r[8] + e[2] * r[13] + e[3] * r[18], t[4] = e[0] * r[4] + e[1] * r[9] + e[2] * r[14] + e[3] * r[19] + e[4], t[5] = e[5] * r[0] + e[6] * r[5] + e[7] * r[10] + e[8] * r[15], t[6] = e[5] * r[1] + e[6] * r[6] + e[7] * r[11] + e[8] * r[16], t[7] = e[5] * r[2] + e[6] * r[7] + e[7] * r[12] + e[8] * r[17], t[8] = e[5] * r[3] + e[6] * r[8] + e[7] * r[13] + e[8] * r[18], t[9] = e[5] * r[4] + e[6] * r[9] + e[7] * r[14] + e[8] * r[19] + e[9], t[10] = e[10] * r[0] + e[11] * r[5] + e[12] * r[10] + e[13] * r[15], t[11] = e[10] * r[1] + e[11] * r[6] + e[12] * r[11] + e[13] * r[16], t[12] = e[10] * r[2] + e[11] * r[7] + e[12] * r[12] + e[13] * r[17], t[13] = e[10] * r[3] + e[11] * r[8] + e[12] * r[13] + e[13] * r[18], t[14] = e[10] * r[4] + e[11] * r[9] + e[12] * r[14] + e[13] * r[19] + e[14], t[15] = e[15] * r[0] + e[16] * r[5] + e[17] * r[10] + e[18] * r[15], t[16] = e[15] * r[1] + e[16] * r[6] + e[17] * r[11] + e[18] * r[16], t[17] = e[15] * r[2] + e[16] * r[7] + e[17] * r[12] + e[18] * r[17], t[18] = e[15] * r[3] + e[16] * r[8] + e[17] * r[13] + e[18] * r[18], t[19] = e[15] * r[4] + e[16] * r[9] + e[17] * r[14] + e[18] * r[19] + e[19], t;
    }, e.prototype._colorMatrix = function(t) {
        var e1 = new Float32Array(t);
        return e1[4] /= 255, e1[9] /= 255, e1[14] /= 255, e1[19] /= 255, e1;
    }, e.prototype.brightness = function(t, e) {
        var r = [
            t,
            0,
            0,
            0,
            0,
            0,
            t,
            0,
            0,
            0,
            0,
            0,
            t,
            0,
            0,
            0,
            0,
            0,
            1,
            0
        ];
        this._loadMatrix(r, e);
    }, e.prototype.tint = function(t, e) {
        var r = [
            (t >> 16 & 255) / 255,
            0,
            0,
            0,
            0,
            0,
            (t >> 8 & 255) / 255,
            0,
            0,
            0,
            0,
            0,
            (255 & t) / 255,
            0,
            0,
            0,
            0,
            0,
            1,
            0
        ];
        this._loadMatrix(r, e);
    }, e.prototype.greyscale = function(t, e) {
        var r = [
            t,
            t,
            t,
            0,
            0,
            t,
            t,
            t,
            0,
            0,
            t,
            t,
            t,
            0,
            0,
            0,
            0,
            0,
            1,
            0
        ];
        this._loadMatrix(r, e);
    }, e.prototype.blackAndWhite = function(t) {
        this._loadMatrix([
            0.3,
            0.6,
            0.1,
            0,
            0,
            0.3,
            0.6,
            0.1,
            0,
            0,
            0.3,
            0.6,
            0.1,
            0,
            0,
            0,
            0,
            0,
            1,
            0
        ], t);
    }, e.prototype.hue = function(t, e) {
        t = (t || 0) / 180 * Math.PI;
        var r = Math.cos(t), i = Math.sin(t), n = 1 / 3, o = (0, Math.sqrt)(n), s = [
            r + (1 - r) * n,
            n * (1 - r) - o * i,
            n * (1 - r) + o * i,
            0,
            0,
            n * (1 - r) + o * i,
            r + n * (1 - r),
            n * (1 - r) - o * i,
            0,
            0,
            n * (1 - r) - o * i,
            n * (1 - r) + o * i,
            r + n * (1 - r),
            0,
            0,
            0,
            0,
            0,
            1,
            0
        ];
        this._loadMatrix(s, e);
    }, e.prototype.contrast = function(t, e) {
        var r = (t || 0) + 1, i = -0.5 * (r - 1), n = [
            r,
            0,
            0,
            0,
            i,
            0,
            r,
            0,
            0,
            i,
            0,
            0,
            r,
            0,
            i,
            0,
            0,
            0,
            1,
            0
        ];
        this._loadMatrix(n, e);
    }, e.prototype.saturate = function(t, e) {
        void 0 === t && (t = 0);
        var r = 2 * t / 3 + 1, i = -0.5 * (r - 1), n = [
            r,
            i,
            i,
            0,
            0,
            i,
            r,
            i,
            0,
            0,
            i,
            i,
            r,
            0,
            0,
            0,
            0,
            0,
            1,
            0
        ];
        this._loadMatrix(n, e);
    }, e.prototype.desaturate = function() {
        this.saturate(-1);
    }, e.prototype.negative = function(t) {
        this._loadMatrix([
            -1,
            0,
            0,
            1,
            0,
            0,
            -1,
            0,
            1,
            0,
            0,
            0,
            -1,
            1,
            0,
            0,
            0,
            0,
            1,
            0
        ], t);
    }, e.prototype.sepia = function(t) {
        this._loadMatrix([
            0.393,
            0.7689999,
            0.18899999,
            0,
            0,
            0.349,
            0.6859999,
            0.16799999,
            0,
            0,
            0.272,
            0.5339999,
            0.13099999,
            0,
            0,
            0,
            0,
            0,
            1,
            0
        ], t);
    }, e.prototype.technicolor = function(t) {
        this._loadMatrix([
            1.9125277891456083,
            -0.8545344976951645,
            -0.09155508482755585,
            0,
            11.793603434377337,
            -0.3087833385928097,
            1.7658908555458428,
            -0.10601743074722245,
            0,
            -70.35205161461398,
            -0.231103377548616,
            -0.7501899197440212,
            1.847597816108189,
            0,
            30.950940869491138,
            0,
            0,
            0,
            1,
            0
        ], t);
    }, e.prototype.polaroid = function(t) {
        this._loadMatrix([
            1.438,
            -0.062,
            -0.062,
            0,
            0,
            -0.122,
            1.378,
            -0.122,
            0,
            0,
            -0.016,
            -0.016,
            1.483,
            0,
            0,
            0,
            0,
            0,
            1,
            0
        ], t);
    }, e.prototype.toBGR = function(t) {
        this._loadMatrix([
            0,
            0,
            1,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0
        ], t);
    }, e.prototype.kodachrome = function(t) {
        this._loadMatrix([
            1.1285582396593525,
            -0.3967382283601348,
            -0.03992559172921793,
            0,
            63.72958762196502,
            -0.16404339962244616,
            1.0835251566291304,
            -0.05498805115633132,
            0,
            24.732407896706203,
            -0.16786010706155763,
            -0.5603416277695248,
            1.6014850761964943,
            0,
            35.62982807460946,
            0,
            0,
            0,
            1,
            0
        ], t);
    }, e.prototype.browni = function(t) {
        this._loadMatrix([
            0.5997023498159715,
            0.34553243048391263,
            -0.2708298674538042,
            0,
            47.43192855600873,
            -0.037703249837783157,
            0.8609577587992641,
            0.15059552388459913,
            0,
            -36.96841498319127,
            0.24113635128153335,
            -0.07441037908422492,
            0.44972182064877153,
            0,
            -7.562075277591283,
            0,
            0,
            0,
            1,
            0
        ], t);
    }, e.prototype.vintage = function(t) {
        this._loadMatrix([
            0.6279345635605994,
            0.3202183420819367,
            -0.03965408211312453,
            0,
            9.651285835294123,
            0.02578397704808868,
            0.6441188644374771,
            0.03259127616149294,
            0,
            7.462829176470591,
            0.0466055556782719,
            -0.0851232987247891,
            0.5241648018700465,
            0,
            5.159190588235296,
            0,
            0,
            0,
            1,
            0
        ], t);
    }, e.prototype.colorTone = function(t, e, r, i, n) {
        var o = ((r = r || 16770432) >> 16 & 255) / 255, s = (r >> 8 & 255) / 255, a = (255 & r) / 255, h = ((i = i || 3375104) >> 16 & 255) / 255, u = (i >> 8 & 255) / 255, l = (255 & i) / 255, c = [
            0.3,
            0.59,
            0.11,
            0,
            0,
            o,
            s,
            a,
            t = t || 0.2,
            0,
            h,
            u,
            l,
            e = e || 0.15,
            0,
            o - h,
            s - u,
            a - l,
            0,
            0
        ];
        this._loadMatrix(c, n);
    }, e.prototype.night = function(t, e) {
        var r = [
            -2 * (t = t || 0.1),
            -t,
            0,
            0,
            0,
            -t,
            0,
            t,
            0,
            0,
            0,
            t,
            2 * t,
            0,
            0,
            0,
            0,
            0,
            1,
            0
        ];
        this._loadMatrix(r, e);
    }, e.prototype.predator = function(t, e) {
        var r = [
            11.224130630493164 * t,
            -4.794486999511719 * t,
            -2.8746118545532227 * t,
            0 * t,
            0.40342438220977783 * t,
            -3.6330697536468506 * t,
            9.193157196044922 * t,
            -2.951810836791992 * t,
            0 * t,
            -1.316135048866272 * t,
            -3.2184197902679443 * t,
            -4.2375030517578125 * t,
            7.476448059082031 * t,
            0 * t,
            0.8044459223747253 * t,
            0,
            0,
            0,
            1,
            0
        ];
        this._loadMatrix(r, e);
    }, e.prototype.lsd = function(t) {
        this._loadMatrix([
            2,
            -0.4,
            0.5,
            0,
            0,
            -0.5,
            2,
            -0.4,
            0,
            0,
            -0.4,
            -0.5,
            3,
            0,
            0,
            0,
            0,
            0,
            1,
            0
        ], t);
    }, e.prototype.reset = function() {
        this._loadMatrix([
            1,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
            0
        ], !1);
    }, Object.defineProperty(e.prototype, "matrix", {
        get: function() {
            return this.uniforms.m;
        },
        set: function(t) {
            this.uniforms.m = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "alpha", {
        get: function() {
            return this.uniforms.uAlpha;
        },
        set: function(t) {
            this.uniforms.uAlpha = t;
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(Yn);
bu.prototype.grayscale = bu.prototype.greyscale;
var xu, Ru, Au, Ou, Su, Iu, Pu, Nu, Mu, Du, Cu, wu, Lu, Fu, Uu, Gu, Bu, Xu, ku, Hu = function(t, e) {
    return (Hu = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
}, ju = "varying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\nuniform mat2 rotation;\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform highp vec4 inputSize;\nuniform vec4 inputClamp;\n\nvoid main(void)\n{\n  vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n  map -= 0.5;\n  map.xy = scale * inputSize.zw * (rotation * map.xy);\n\n  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));\n}\n", Yu = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n\tgl_Position = filterVertexPosition();\n\tvTextureCoord = filterTextureCoord();\n\tvFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;\n}\n", Vu = function(t) {
    function e(e, r) {
        var i = this, n = new _r;
        return e.renderable = !1, (i = t.call(this, Yu, ju, {
            mapSampler: e._texture,
            filterMatrix: n,
            scale: {
                x: 1,
                y: 1
            },
            rotation: new Float32Array([
                1,
                0,
                0,
                1
            ])
        }) || this).maskSprite = e, i.maskMatrix = n, null == r && (r = 20), i.scale = new fr(r, r), i;
    }
    return (function(t, e) {
        function r() {
            this.constructor = t;
        }
        Hu(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
    })(e, t), e.prototype.apply = function(t, e, r, i) {
        this.uniforms.filterMatrix = t.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x, this.uniforms.scale.y = this.scale.y;
        var n = this.maskSprite.worldTransform, o = Math.sqrt(n.a * n.a + n.b * n.b), s = Math.sqrt(n.c * n.c + n.d * n.d);
        0 !== o && 0 !== s && (this.uniforms.rotation[0] = n.a / o, this.uniforms.rotation[1] = n.b / o, this.uniforms.rotation[2] = n.c / s, this.uniforms.rotation[3] = n.d / s), t.applyFilter(this, e, r, i);
    }, Object.defineProperty(e.prototype, "map", {
        get: function() {
            return this.uniforms.mapSampler;
        },
        set: function(t) {
            this.uniforms.mapSampler = t;
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(Yn), Wu = function(t, e) {
    return (Wu = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
}, zu = "\nattribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vFragCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvoid texcoords(vec2 fragCoord, vec2 inverseVP,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = filterVertexPosition();\n\n   vFragCoord = aVertexPosition * outputFrame.zw;\n\n   texcoords(vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n", qu = 'varying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vFragCoord;\nuniform sampler2D uSampler;\nuniform highp vec4 inputSize;\n\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n\n --\n\n From:\n https://github.com/mitsuhiko/webgl-meincraft\n\n Copyright (c) 2011 by Armin Ronacher.\n\n Some rights reserved.\n\n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n\n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n\n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n\n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n\n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 inverseVP,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n      vec4 color;\n\n      color = fxaa(uSampler, vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n      gl_FragColor = color;\n}\n', Ku = function(t) {
    function e() {
        return t.call(this, zu, qu) || this;
    }
    return (function(t, e) {
        function r() {
            this.constructor = t;
        }
        Wu(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
    })(e, t), e;
}(Yn), Zu = function(t, e) {
    return (Zu = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
}, Ju = "precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float uNoise;\nuniform float uSeed;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\n    float diff = (randomValue - 0.5) * uNoise;\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n    }\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    // Premultiply alpha again.\n    color.rgb *= color.a;\n\n    gl_FragColor = color;\n}\n", Qu = function(t) {
    function e(e, r) {
        void 0 === e && (e = 0.5), void 0 === r && (r = Math.random());
        var i = t.call(this, Fo, Ju, {
            uNoise: 0,
            uSeed: 0
        }) || this;
        return i.noise = e, i.seed = r, i;
    }
    return (function(t, e) {
        function r() {
            this.constructor = t;
        }
        Zu(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
    })(e, t), Object.defineProperty(e.prototype, "noise", {
        get: function() {
            return this.uniforms.uNoise;
        },
        set: function(t) {
            this.uniforms.uNoise = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "seed", {
        get: function() {
            return this.uniforms.uSeed;
        },
        set: function(t) {
            this.uniforms.uSeed = t;
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(Yn);
!function(t) {
    t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2";
}(xu || (xu = {
})), (function(t) {
    t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS";
})(Ru || (Ru = {
})), (function(t) {
    t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL";
})(Au || (Au = {
})), (function(t) {
    t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR";
})(Ou || (Ou = {
})), (function(t) {
    t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(Su || (Su = {
})), (function(t) {
    t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(Iu || (Iu = {
})), (function(t) {
    t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(Pu || (Pu = {
})), (function(t) {
    t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(Nu || (Nu = {
})), (function(t) {
    t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT";
})(Mu || (Mu = {
})), (function(t) {
    t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR";
})(Du || (Du = {
})), (function(t) {
    t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(Cu || (Cu = {
})), (function(t) {
    t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL";
})(wu || (wu = {
})), (function(t) {
    t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(Lu || (Lu = {
})), (function(t) {
    t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT";
})(Fu || (Fu = {
})), (function(t) {
    t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL";
})(Uu || (Uu = {
})), (function(t) {
    t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp";
})(Gu || (Gu = {
})), (function(t) {
    t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE";
})(Bu || (Bu = {
})), (function(t) {
    t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH";
})(Xu || (Xu = {
})), (function(t) {
    t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})(ku || (ku = {
}));
var $u = new _r;
zr.prototype._cacheAsBitmap = !1, zr.prototype._cacheData = null, zr.prototype._cacheAsBitmapResolution = null, zr.prototype._cacheAsBitmapMultisample = Xu.NONE;
var tl = function() {
    this.textureCacheId = null, this.originalRender = null, this.originalRenderCanvas = null, this.originalCalculateBounds = null, this.originalGetLocalBounds = null, this.originalUpdateTransform = null, this.originalDestroy = null, this.originalMask = null, this.originalFilterArea = null, this.originalContainsPoint = null, this.sprite = null;
};
Object.defineProperties(zr.prototype, {
    cacheAsBitmapResolution: {
        get: function() {
            return this._cacheAsBitmapResolution;
        },
        set: function(t) {
            t !== this._cacheAsBitmapResolution && (this._cacheAsBitmapResolution = t, this.cacheAsBitmap && (this.cacheAsBitmap = !1, this.cacheAsBitmap = !0));
        }
    },
    cacheAsBitmapMultisample: {
        get: function() {
            return this._cacheAsBitmapMultisample;
        },
        set: function(t) {
            t !== this._cacheAsBitmapMultisample && (this._cacheAsBitmapMultisample = t, this.cacheAsBitmap && (this.cacheAsBitmap = !1, this.cacheAsBitmap = !0));
        }
    },
    cacheAsBitmap: {
        get: function() {
            return this._cacheAsBitmap;
        },
        set: function(t) {
            var e1;
            this._cacheAsBitmap !== t && (this._cacheAsBitmap = t, t ? (this._cacheData || (this._cacheData = new tl), (e1 = this._cacheData).originalRender = this.render, e1.originalRenderCanvas = this.renderCanvas, e1.originalUpdateTransform = this.updateTransform, e1.originalCalculateBounds = this.calculateBounds, e1.originalGetLocalBounds = this.getLocalBounds, e1.originalDestroy = this.destroy, e1.originalContainsPoint = this.containsPoint, e1.originalMask = this._mask, e1.originalFilterArea = this.filterArea, this.render = this._renderCached, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : ((e1 = this._cacheData).sprite && this._destroyCachedDisplayObject(), this.render = e1.originalRender, this.renderCanvas = e1.originalRenderCanvas, this.calculateBounds = e1.originalCalculateBounds, this.getLocalBounds = e1.originalGetLocalBounds, this.destroy = e1.originalDestroy, this.updateTransform = e1.originalUpdateTransform, this.containsPoint = e1.originalContainsPoint, this._mask = e1.originalMask, this.filterArea = e1.originalFilterArea));
        }
    }
}), zr.prototype._renderCached = function(t) {
    !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(t), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._render(t));
}, zr.prototype._initCachedDisplayObject = function(t) {
    var e;
    if (!this._cacheData || !this._cacheData.sprite) {
        var r = this.alpha;
        this.alpha = 1, t.batch.flush();
        var i = this.getLocalBounds(null, !0).clone();
        if (this.filters) {
            var n = this.filters[0].padding;
            i.pad(n);
        }
        i.ceil(et.RESOLUTION);
        var o = t.renderTexture.current, s = t.renderTexture.sourceFrame.clone(), a = t.renderTexture.destinationFrame.clone(), h = t.projection.transform, u = ji.create({
            width: i.width,
            height: i.height,
            resolution: this.cacheAsBitmapResolution || t.resolution,
            multisample: null !== (e = this.cacheAsBitmapMultisample) && void 0 !== e ? e : t.multisample
        }), l = "cacheAsBitmap_" + We();
        this._cacheData.textureCacheId = l, Ai.addToCache(u.baseTexture, l), ki.addToCache(u, l);
        var c = this.transform.localTransform.copyTo($u).invert().translate(-i.x, -i.y);
        this.render = this._cacheData.originalRender, t.render(this, {
            renderTexture: u,
            clear: !0,
            transform: c,
            skipUpdateTransform: !1
        }), t.framebuffer.blit(), t.projection.transform = h, t.renderTexture.bind(o, s, a), this.render = this._renderCached, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = r;
        var d = new Fa(u);
        d.transform.worldTransform = this.transform.worldTransform, d.anchor.x = -i.x / i.width, d.anchor.y = -i.y / i.height, d.alpha = r, d._bounds = this._bounds, this._cacheData.sprite = d, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.enableTempParent(), this.updateTransform(), this.disableTempParent(null)), this.containsPoint = d.containsPoint.bind(d);
    }
}, zr.prototype._renderCachedCanvas = function(t) {
    !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(t), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderCanvas(t));
}, zr.prototype._initCachedDisplayObjectCanvas = function(t) {
    if (!this._cacheData || !this._cacheData.sprite) {
        var e = this.getLocalBounds(null, !0), r = this.alpha;
        this.alpha = 1;
        var i = t.context, n = t._projTransform;
        e.ceil(et.RESOLUTION);
        var o = ji.create({
            width: e.width,
            height: e.height
        }), s = "cacheAsBitmap_" + We();
        this._cacheData.textureCacheId = s, Ai.addToCache(o.baseTexture, s), ki.addToCache(o, s);
        var a = $u;
        this.transform.localTransform.copyTo(a), a.invert(), a.tx -= e.x, a.ty -= e.y, this.renderCanvas = this._cacheData.originalRenderCanvas, t.render(this, {
            renderTexture: o,
            clear: !0,
            transform: a,
            skipUpdateTransform: !1
        }), t.context = i, t._projTransform = n, this.renderCanvas = this._renderCachedCanvas, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = r;
        var h = new Fa(o);
        h.transform.worldTransform = this.transform.worldTransform, h.anchor.x = -e.x / e.width, h.anchor.y = -e.y / e.height, h.alpha = r, h._bounds = this._bounds, this._cacheData.sprite = h, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = t._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.containsPoint = h.containsPoint.bind(h);
    }
}, zr.prototype._calculateCachedBounds = function() {
    this._bounds.clear(), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite._calculateBounds(), this._bounds.updateID = this._boundsID;
}, zr.prototype._getCachedLocalBounds = function() {
    return this._cacheData.sprite.getLocalBounds(null);
}, zr.prototype._destroyCachedDisplayObject = function() {
    this._cacheData.sprite._texture.destroy(!0), this._cacheData.sprite = null, Ai.removeFromCache(this._cacheData.textureCacheId), ki.removeFromCache(this._cacheData.textureCacheId), this._cacheData.textureCacheId = null;
}, zr.prototype._cacheAsBitmapDestroy = function(t) {
    this.cacheAsBitmap = !1, this.destroy(t);
}, zr.prototype.name = null, Zr.prototype.getChildByName = function(t, e) {
    for(var r1 = 0, i1 = this.children.length; r1 < i1; r1++)if (this.children[r1].name === t) return this.children[r1];
    if (e) {
        for(r1 = 0, i1 = this.children.length; r1 < i1; r1++)if (this.children[r1].getChildByName) {
            var n = this.children[r1].getChildByName(t, !0);
            if (n) return n;
        }
    }
    return null;
}, zr.prototype.getGlobalPosition = function(t, e) {
    return void 0 === t && (t = new fr), void 0 === e && (e = !1), this.parent ? this.parent.toGlobal(this.position, t, e) : (t.x = this.position.x, t.y = this.position.y), t;
};
var el = function(t, e) {
    return (el = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
};
function rl(t, e) {
    function r() {
        this.constructor = t;
    }
    el(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
}
var il = function(t) {
    function e(e, r, i, n) {
        void 0 === e && (e = 100), void 0 === r && (r = 100), void 0 === i && (i = 10), void 0 === n && (n = 10);
        var o = t.call(this) || this;
        return o.segWidth = i, o.segHeight = n, o.width = e, o.height = r, o.build(), o;
    }
    return rl(e, t), e.prototype.build = function() {
        for(var t2 = this.segWidth * this.segHeight, e1 = [], r = [], i = [], n = this.segWidth - 1, o = this.segHeight - 1, s = this.width / n, a = this.height / o, h = 0; h < t2; h++){
            var u = h % this.segWidth, l = h / this.segWidth | 0;
            e1.push(u * s, l * a), r.push(u / n, l / o);
        }
        var c = n * o;
        for(h = 0; h < c; h++){
            var d = h % n, f = h / n | 0, p = f * this.segWidth + d, _ = f * this.segWidth + d + 1, m = (f + 1) * this.segWidth + d, v = (f + 1) * this.segWidth + d + 1;
            i.push(p, _, m, _, v, m);
        }
        this.buffers[0].data = new Float32Array(e1), this.buffers[1].data = new Float32Array(r), this.indexBuffer.data = new Uint16Array(i), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update();
    }, e;
}(Ih), nl = function(t) {
    function e(e, r, i) {
        void 0 === e && (e = 200), void 0 === i && (i = 0);
        var n = t.call(this, new Float32Array(4 * r.length), new Float32Array(4 * r.length), new Uint16Array(6 * (r.length - 1))) || this;
        return n.points = r, n._width = e, n.textureScale = i, n.build(), n;
    }
    return rl(e, t), Object.defineProperty(e.prototype, "width", {
        get: function() {
            return this._width;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.build = function() {
        var t2 = this.points;
        if (t2) {
            var e = this.getBuffer("aVertexPosition"), r = this.getBuffer("aTextureCoord"), i = this.getIndex();
            if (!(t2.length < 1)) {
                e.data.length / 4 !== t2.length && (e.data = new Float32Array(4 * t2.length), r.data = new Float32Array(4 * t2.length), i.data = new Uint16Array(6 * (t2.length - 1)));
                var n = r.data, o = i.data;
                n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1;
                for(var s = 0, a = t2[0], h = this._width * this.textureScale, u = t2.length, l = 0; l < u; l++){
                    var c = 4 * l;
                    if (this.textureScale > 0) {
                        var d = a.x - t2[l].x, f = a.y - t2[l].y, p = Math.sqrt(d * d + f * f);
                        a = t2[l], s += p / h;
                    } else s = l / (u - 1);
                    n[c] = s, n[c + 1] = 0, n[c + 2] = s, n[c + 3] = 1;
                }
                var _ = 0;
                for(l = 0; l < u - 1; l++)c = 2 * l, o[_++] = c, o[_++] = c + 1, o[_++] = c + 2, o[_++] = c + 2, o[_++] = c + 1, o[_++] = c + 3;
                r.update(), i.update(), this.updateVertices();
            }
        }
    }, e.prototype.updateVertices = function() {
        var t2 = this.points;
        if (!(t2.length < 1)) {
            for(var e, r = t2[0], i = 0, n = 0, o = this.buffers[0].data, s = t2.length, a = 0; a < s; a++){
                var h = t2[a], u = 4 * a;
                n = -((e = a < t2.length - 1 ? t2[a + 1] : h).x - r.x), i = e.y - r.y;
                var l = Math.sqrt(i * i + n * n), c = this.textureScale > 0 ? this.textureScale * this._width / 2 : this._width / 2;
                i /= l, n /= l, i *= c, n *= c, o[u] = h.x + i, o[u + 1] = h.y + n, o[u + 2] = h.x - i, o[u + 3] = h.y - n, r = h;
            }
            this.buffers[0].update();
        }
    }, e.prototype.update = function() {
        this.textureScale > 0 ? this.build() : this.updateVertices();
    }, e;
}(Ih), ol = function(t) {
    function e(e, r, i) {
        void 0 === i && (i = 0);
        var n = this, o = new nl(e.height, r, i), s = new Sh(e);
        return i > 0 && (e.baseTexture.wrapMode = fe.REPEAT), (n = t.call(this, o, s) || this).autoUpdate = !0, n;
    }
    return rl(e, t), e.prototype._render = function(e) {
        var r = this.geometry;
        (this.autoUpdate || r._width !== this.shader.texture.height) && (r._width = this.shader.texture.height, r.update()), t.prototype._render.call(this, e);
    }, e;
}(Rh), sl = function(t) {
    function e(e, r, i) {
        var n = this, o = new il(e.width, e.height, r, i), s = new Sh(ki.WHITE);
        return (n = t.call(this, o, s) || this).texture = e, n.autoResize = !0, n;
    }
    return rl(e, t), e.prototype.textureUpdated = function() {
        this._textureID = this.shader.texture._updateID;
        var t2 = this.geometry, e1 = this.shader.texture, r = e1.width, i = e1.height;
        !this.autoResize || t2.width === r && t2.height === i || (t2.width = this.shader.texture.width, t2.height = this.shader.texture.height, t2.build());
    }, Object.defineProperty(e.prototype, "texture", {
        get: function() {
            return this.shader.texture;
        },
        set: function(t) {
            this.shader.texture !== t && (this.shader.texture = t, this._textureID = -1, t.baseTexture.valid ? this.textureUpdated() : t.once("update", this.textureUpdated, this));
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype._render = function(e) {
        this._textureID !== this.shader.texture._updateID && this.textureUpdated(), t.prototype._render.call(this, e);
    }, e.prototype.destroy = function(e) {
        this.shader.texture.off("update", this.textureUpdated, this), t.prototype.destroy.call(this, e);
    }, e;
}(Rh), al = function(t) {
    function e(e, r, i, n, o) {
        void 0 === e && (e = ki.EMPTY);
        var s = this, a = new Ih(r, i, n);
        a.getBuffer("aVertexPosition").static = !1;
        var h = new Sh(e);
        return (s = t.call(this, a, h, null, o) || this).autoUpdate = !0, s;
    }
    return rl(e, t), Object.defineProperty(e.prototype, "vertices", {
        get: function() {
            return this.geometry.getBuffer("aVertexPosition").data;
        },
        set: function(t) {
            this.geometry.getBuffer("aVertexPosition").data = t;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype._render = function(e) {
        this.autoUpdate && this.geometry.getBuffer("aVertexPosition").update(), t.prototype._render.call(this, e);
    }, e;
}(Rh), hl = 10, ul = function(t) {
    function e(e, r, i, n, o) {
        void 0 === r && (r = hl), void 0 === i && (i = hl), void 0 === n && (n = hl), void 0 === o && (o = hl);
        var s = t.call(this, ki.WHITE, 4, 4) || this;
        return s._origWidth = e.orig.width, s._origHeight = e.orig.height, s._width = s._origWidth, s._height = s._origHeight, s._leftWidth = r, s._rightWidth = n, s._topHeight = i, s._bottomHeight = o, s.texture = e, s;
    }
    return rl(e, t), e.prototype.textureUpdated = function() {
        this._textureID = this.shader.texture._updateID, this._refresh();
    }, Object.defineProperty(e.prototype, "vertices", {
        get: function() {
            return this.geometry.getBuffer("aVertexPosition").data;
        },
        set: function(t) {
            this.geometry.getBuffer("aVertexPosition").data = t;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.updateHorizontalVertices = function() {
        var t2 = this.vertices, e1 = this._getMinScale();
        t2[9] = t2[11] = t2[13] = t2[15] = this._topHeight * e1, t2[17] = t2[19] = t2[21] = t2[23] = this._height - this._bottomHeight * e1, t2[25] = t2[27] = t2[29] = t2[31] = this._height;
    }, e.prototype.updateVerticalVertices = function() {
        var t2 = this.vertices, e1 = this._getMinScale();
        t2[2] = t2[10] = t2[18] = t2[26] = this._leftWidth * e1, t2[4] = t2[12] = t2[20] = t2[28] = this._width - this._rightWidth * e1, t2[6] = t2[14] = t2[22] = t2[30] = this._width;
    }, e.prototype._getMinScale = function() {
        var t2 = this._leftWidth + this._rightWidth, e1 = this._width > t2 ? 1 : this._width / t2, r = this._topHeight + this._bottomHeight, i = this._height > r ? 1 : this._height / r;
        return Math.min(e1, i);
    }, Object.defineProperty(e.prototype, "width", {
        get: function() {
            return this._width;
        },
        set: function(t) {
            this._width = t, this._refresh();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
        get: function() {
            return this._height;
        },
        set: function(t) {
            this._height = t, this._refresh();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "leftWidth", {
        get: function() {
            return this._leftWidth;
        },
        set: function(t) {
            this._leftWidth = t, this._refresh();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "rightWidth", {
        get: function() {
            return this._rightWidth;
        },
        set: function(t) {
            this._rightWidth = t, this._refresh();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "topHeight", {
        get: function() {
            return this._topHeight;
        },
        set: function(t) {
            this._topHeight = t, this._refresh();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "bottomHeight", {
        get: function() {
            return this._bottomHeight;
        },
        set: function(t) {
            this._bottomHeight = t, this._refresh();
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype._refresh = function() {
        var t2 = this.texture, e1 = this.geometry.buffers[1].data;
        this._origWidth = t2.orig.width, this._origHeight = t2.orig.height;
        var r = 1 / this._origWidth, i = 1 / this._origHeight;
        e1[0] = e1[8] = e1[16] = e1[24] = 0, e1[1] = e1[3] = e1[5] = e1[7] = 0, e1[6] = e1[14] = e1[22] = e1[30] = 1, e1[25] = e1[27] = e1[29] = e1[31] = 1, e1[2] = e1[10] = e1[18] = e1[26] = r * this._leftWidth, e1[4] = e1[12] = e1[20] = e1[28] = 1 - r * this._rightWidth, e1[9] = e1[11] = e1[13] = e1[15] = i * this._topHeight, e1[17] = e1[19] = e1[21] = e1[23] = 1 - i * this._bottomHeight, this.updateHorizontalVertices(), this.updateVerticalVertices(), this.geometry.buffers[0].update(), this.geometry.buffers[1].update();
    }, e;
}(sl), ll = function(t, e) {
    return (ll = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
    })(t, e);
}, cl = function(t) {
    function e(e, r) {
        void 0 === r && (r = !0);
        var i = t.call(this, e[0] instanceof ki ? e[0] : e[0].texture) || this;
        return i._textures = null, i._durations = null, i._autoUpdate = r, i._isConnectedToTicker = !1, i.animationSpeed = 1, i.loop = !0, i.updateAnchor = !1, i.onComplete = null, i.onFrameChange = null, i.onLoop = null, i._currentTime = 0, i._playing = !1, i._previousFrame = null, i.textures = e, i;
    }
    return (function(t, e) {
        function r() {
            this.constructor = t;
        }
        ll(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
    })(e, t), e.prototype.stop = function() {
        this._playing && (this._playing = !1, this._autoUpdate && this._isConnectedToTicker && (oi.shared.remove(this.update, this), this._isConnectedToTicker = !1));
    }, e.prototype.play = function() {
        this._playing || (this._playing = !0, this._autoUpdate && !this._isConnectedToTicker && (oi.shared.add(this.update, this, Qr.HIGH), this._isConnectedToTicker = !0));
    }, e.prototype.gotoAndStop = function(t) {
        this.stop();
        var e1 = this.currentFrame;
        this._currentTime = t, e1 !== this.currentFrame && this.updateTexture();
    }, e.prototype.gotoAndPlay = function(t) {
        var e1 = this.currentFrame;
        this._currentTime = t, e1 !== this.currentFrame && this.updateTexture(), this.play();
    }, e.prototype.update = function(t) {
        if (this._playing) {
            var e = this.animationSpeed * t, r = this.currentFrame;
            if (null !== this._durations) {
                var i = this._currentTime % 1 * this._durations[this.currentFrame];
                for(i += e / 60 * 1000; i < 0;)this._currentTime--, i += this._durations[this.currentFrame];
                var n = Math.sign(this.animationSpeed * t);
                for(this._currentTime = Math.floor(this._currentTime); i >= this._durations[this.currentFrame];)i -= this._durations[this.currentFrame] * n, this._currentTime += n;
                this._currentTime += i / this._durations[this.currentFrame];
            } else this._currentTime += e;
            this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : r !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < r ? this.onLoop() : this.animationSpeed < 0 && this.currentFrame > r && this.onLoop()), this.updateTexture());
        }
    }, e.prototype.updateTexture = function() {
        var t2 = this.currentFrame;
        this._previousFrame !== t2 && (this._previousFrame = t2, this._texture = this._textures[t2], this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this.uvs = this._texture._uvs.uvsFloat32, this.updateAnchor && this._anchor.copyFrom(this._texture.defaultAnchor), this.onFrameChange && this.onFrameChange(this.currentFrame));
    }, e.prototype.destroy = function(e) {
        this.stop(), t.prototype.destroy.call(this, e), this.onComplete = null, this.onFrameChange = null, this.onLoop = null;
    }, e.fromFrames = function(t) {
        for(var r = [], i = 0; i < t.length; ++i)r.push(ki.from(t[i]));
        return new e(r);
    }, e.fromImages = function(t) {
        for(var r = [], i = 0; i < t.length; ++i)r.push(ki.from(t[i]));
        return new e(r);
    }, Object.defineProperty(e.prototype, "totalFrames", {
        get: function() {
            return this._textures.length;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "textures", {
        get: function() {
            return this._textures;
        },
        set: function(t) {
            if (t[0] instanceof ki) this._textures = t, this._durations = null;
            else {
                this._textures = [], this._durations = [];
                for(var e = 0; e < t.length; e++)this._textures.push(t[e].texture), this._durations.push(t[e].time);
            }
            this._previousFrame = null, this.gotoAndStop(0), this.updateTexture();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "currentFrame", {
        get: function() {
            var t2 = Math.floor(this._currentTime) % this._textures.length;
            return t2 < 0 && (t2 += this._textures.length), t2;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "playing", {
        get: function() {
            return this._playing;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "autoUpdate", {
        get: function() {
            return this._autoUpdate;
        },
        set: function(t) {
            t !== this._autoUpdate && (this._autoUpdate = t, !this._autoUpdate && this._isConnectedToTicker ? (oi.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._playing && (oi.shared.add(this.update, this), this._isConnectedToTicker = !0));
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(Fa);
Co.registerPlugin("accessibility", ii), Co.registerPlugin("extract", rs), Co.registerPlugin("interaction", _i), Co.registerPlugin("particle", ta), Co.registerPlugin("prepare", hh), Co.registerPlugin("batch", zo), Co.registerPlugin("tilingSprite", yh), ys.registerPlugin(Yh), ys.registerPlugin(Ms), ys.registerPlugin(Xs), ys.registerPlugin(Vs), ys.registerPlugin(ch), $o.registerPlugin(si), $o.registerPlugin(Ts);
var dl = "6.2.0", fl = {
    AlphaFilter: zh,
    BlurFilter: gu,
    BlurFilterPass: yu,
    ColorMatrixFilter: bu,
    DisplacementFilter: Vu,
    FXAAFilter: Ku,
    NoiseFilter: Qu
};
const mod = {
    ALPHA_MODES: _e,
    AbstractBatchRenderer: ko,
    AbstractMultiResource: Oi,
    AbstractRenderer: No,
    AccessibilityManager: ii,
    AnimatedSprite: cl,
    AppLoaderPlugin: Ts,
    Application: $o,
    ArrayResource: Si,
    Attribute: Vi,
    BLEND_MODES: se,
    BUFFER_BITS: oe,
    BUFFER_TYPE: Te,
    BaseImageResource: Ii,
    BasePrepare: nh,
    BaseRenderTexture: Gi,
    BaseTexture: Ai,
    BatchDrawCall: Go,
    BatchGeometry: jo,
    BatchPluginFactory: Wo,
    BatchRenderer: zo,
    BatchShaderGenerator: Ho,
    BatchSystem: un,
    BatchTextureArray: Bo,
    BitmapFont: Bh,
    BitmapFontData: Nh,
    BitmapFontLoader: Yh,
    BitmapText: jh,
    BlobResource: Ps,
    Bounds: Ar,
    Buffer: zi,
    BufferResource: xi,
    CLEAR_MODES: me,
    CanvasResource: Pi,
    Circle: ur,
    CompressedTextureLoader: Ms,
    CompressedTextureResource: Ns,
    Container: Zr,
    ContextSystem: cn,
    CountLimiter: Za,
    CubeResource: Ni,
    DDSLoader: Xs,
    DEG_TO_RAD: ar,
    DRAW_MODES: ae,
    DisplayObject: zr,
    ENV: ie,
    Ellipse: lr,
    Extract: rs,
    FORMATS: he,
    FORMATS_TO_COMPONENTS: js,
    FillStyle: ra,
    Filter: Yn,
    FilterState: nn,
    FilterSystem: an,
    Framebuffer: Ui,
    FramebufferSystem: pn,
    GC_MODES: ve,
    GLFramebuffer: dn,
    GLProgram: fo,
    GLTexture: Oo,
    GRAPHICS_CURVES: ea,
    Geometry: Qi,
    GeometrySystem: mn,
    Graphics: Ma,
    GraphicsData: Ra,
    GraphicsGeometry: Sa,
    IGLUniformData: co,
    INSTALLED: vi,
    INTERNAL_FORMATS: Es,
    INTERNAL_FORMAT_TO_BYTES_PER_PIXEL: Rs,
    ImageBitmapResource: wi,
    ImageResource: Mi,
    InteractionData: ai,
    InteractionEvent: ui,
    InteractionManager: _i,
    InteractionTrackingData: li,
    KTXLoader: Vs,
    LINE_CAP: Ks,
    LINE_JOIN: qs,
    LineStyle: Ia,
    Loader: ys,
    LoaderResource: ds,
    MASK_TYPES: ge,
    MIPMAP_MODES: pe,
    MSAA_QUALITY: Ee,
    MaskData: vn,
    MaskSystem: Zn,
    Matrix: _r,
    Mesh: Rh,
    MeshBatchUvs: Th,
    MeshGeometry: Ih,
    MeshMaterial: Sh,
    NineSlicePlane: ul,
    ObjectRenderer: hn,
    ObservablePoint: pr,
    PI_2: or,
    PRECISION: ye,
    ParticleContainer: Zs,
    ParticleRenderer: ta,
    PlaneGeometry: il,
    Point: fr,
    Polygon: cr,
    Prepare: hh,
    Program: kn,
    ProjectionSystem: eo,
    Quad: $i,
    QuadUv: tn,
    RAD_TO_DEG: sr,
    RENDERER_TYPE: ne,
    Rectangle: hr,
    RenderTexture: ji,
    RenderTexturePool: Yi,
    RenderTextureSystem: no,
    Renderer: Co,
    Resource: bi,
    RopeGeometry: nl,
    RoundedRectangle: dr,
    Runner: mi,
    SAMPLER_TYPES: ce,
    SCALE_MODES: de,
    SHAPES: ir,
    SVGResource: Di,
    ScissorSystem: $n,
    Shader: Hn,
    ShaderSystem: vo,
    SimpleMesh: al,
    SimplePlane: sl,
    SimpleRope: ol,
    Sprite: Fa,
    SpriteMaskFilter: Kn,
    Spritesheet: lh,
    SpritesheetLoader: ch,
    State: jn,
    StateSystem: Ro,
    StencilSystem: to,
    System: Uo,
    TARGETS: ue,
    TEXT_GRADIENT: xa,
    TYPES: le,
    TYPES_TO_BYTES_PER_COMPONENT: Hs,
    TYPES_TO_BYTES_PER_PIXEL: Ys,
    TemporaryDisplayObject: qr,
    Text: qa,
    TextMetrics: Ya,
    TextStyle: Xa,
    Texture: ki,
    TextureGCSystem: Ao,
    TextureLoader: bs,
    TextureMatrix: qn,
    TextureSystem: So,
    TextureUvs: Bi,
    Ticker: oi,
    TickerPlugin: si,
    TilingSprite: _h,
    TilingSpriteRenderer: yh,
    TimeLimiter: uh,
    Transform: Rr,
    UPDATE_PRIORITY: Qr,
    UniformGroup: rn,
    VERSION: dl,
    VideoResource: Ci,
    ViewableBuffer: Xo,
    WRAP_MODES: fe,
    accessibleTarget: Jr,
    autoDetectRenderer: wo,
    autoDetectResource: yi,
    checkMaxIfStatementsInShader: Gn,
    createUBOElements: ho,
    defaultFilterVertex: Fo,
    defaultVertex: Lo,
    filters: fl,
    generateProgram: po,
    generateUniformBufferSync: lo,
    getTestContext: An,
    getUBOData: uo,
    graphicsUtils: Da,
    groupD8: xr,
    interactiveTarget: di,
    isMobile: tt,
    resources: qo,
    settings: et,
    systems: Jo,
    uniformParsers: Cn,
    utils: nr
};
class Render {
    static engine;
    static app;
    static commit;
    static async setup() {
        this.engine = mod;
        this.engine.settings.SCALE_MODE = this.engine.SCALE_MODES.NEAREST;
        this.engine.settings.ROUND_PIXELS = true;
        this.commit = global1.document.querySelector("#commit")?.innerText ?? "";
        const domloader = global1.document.querySelector(".loader .loaded");
        domloader.querySelector(".loading")?.remove();
        domloader.innerHTML = `<span>loading textures<span class="loading"></span></span><span>loaded gracidea</span>${domloader.innerHTML}`;
        const loader = Render.engine.Loader.shared;
        loader.add(`/copyrighted/textures/tileset3.json?commit=${this.commit}`);
        loader.add(`/copyrighted/textures/npcs.json?commit=${this.commit}`);
        loader.add(`/copyrighted/textures/creatures.json?commit=${this.commit}`);
        loader.onProgress.add(({ progress =0  }, { name =""  })=>domloader.innerHTML = `<span>loaded ${name.split("/").pop()?.replace(/[?].*$/, "")} (${Math.floor(progress)}%)</span>${domloader.innerHTML}`
        );
        loader.onComplete.add(()=>domloader.innerHTML = `<span>loaded textures</span>${domloader.innerHTML}`
        );
        this.app = new Render.engine.Application({
            width: global1.document.body.clientWidth,
            height: global1.document.body.clientHeight,
            resizeTo: global1.window,
            autoDensity: true,
            resolution: global1.devicePixelRatio,
            backgroundAlpha: 0
        });
        global1.document.querySelector("body").appendChild(this.app.view);
        await new Promise((solve)=>loader.load(()=>solve(null)
            )
        );
        global1.document.querySelector(".loader").remove();
    }
    static Polygon(points) {
        return new Render.engine.Polygon(...points.map((n)=>n * 16
        ));
    }
    static Graphics({ z =NaN , stroke , fill , text , textStyle , textPosition , rect , circle , ellipse , polygon  }) {
        const graphics = new Render.engine.Graphics();
        if (stroke) graphics.lineStyle(...stroke);
        if (fill) graphics.beginFill(...fill);
        if (rect) graphics.drawRect(...rect.map((n)=>n * 16
        ));
        if (circle) graphics.drawCircle(...circle.map((n)=>n * 16
        ));
        if (ellipse) graphics.drawEllipse(...ellipse.map((n)=>n * 16
        ));
        if (polygon) {
            if (polygon instanceof Render.engine.Polygon) graphics.drawPolygon(polygon);
            else graphics.drawPolygon(...polygon.map((n)=>n * 16
            ));
        }
        graphics.endFill();
        if (text) {
            const textSprite = graphics.addChild(new Render.engine.Text(text, textStyle));
            textSprite.anchor.set(0.5);
            if (textPosition) textSprite.position.set(textPosition.x, textPosition.y);
        }
        if (!Number.isNaN(z)) graphics.zIndex = z;
        return graphics;
    }
    static ParticleContainer({ x =0 , y =0  } = {
    }) {
        const container = new Render.engine.ParticleContainer();
        container.position.set(x * 16, y * 16);
        return container;
    }
    static Container({ x =0 , y =0 , z =NaN , sorted =false  } = {
    }) {
        const container = new Render.engine.Container();
        container.position.set(x * 16, y * 16);
        if (!Number.isNaN(z)) container.zIndex = z;
        if (sorted) container.sortableChildren = true;
        return container;
    }
    static Texture({ frame =Render.engine.Texture.EMPTY  }) {
        return Render.engine.Texture.from(`${frame}`);
    }
    static TilingSprite({ frame =Render.engine.Texture.EMPTY , x =0 , y =0 , z =NaN , width =0 , height =0  }) {
        const sprite = Render.engine.TilingSprite.from(`${frame}`, {
            width: width * 16,
            height: height * 16
        });
        sprite.position.set(x * 16, y * 16);
        if (!Number.isNaN(z)) sprite.zIndex = z;
        return sprite;
    }
    static Sprite({ frame =Render.engine.Texture.EMPTY , x =0 , y =0 , z =NaN , anchor , scale  } = {
    }) {
        let sprite;
        if (frame instanceof Render.engine.Texture) sprite = new Render.engine.Sprite.from(frame);
        else if (`${frame}` in ANIMATED) {
            sprite = new Render.engine.AnimatedSprite.fromFrames(ANIMATED[frame].frames);
            sprite.animationSpeed = ANIMATED[frame].speed;
            sprite.play();
        } else {
            sprite = new Render.engine.Sprite.from(`${frame}`);
        }
        sprite.position.set(x * 16, y * 16);
        if (anchor) sprite.anchor.set(...anchor);
        if (scale) sprite.scale.set(...scale);
        if (!Number.isNaN(z)) sprite.zIndex = z;
        return sprite;
    }
    static get cache() {
        return Render.engine.utils.TextureCache;
    }
    static get filters() {
        return Render.engine.filters;
    }
}
class Positionable {
    world;
    x;
    y;
    width;
    height;
    constructor({ world , x =0 , y =0 , width =0 , height =0  }){
        this.world = world;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
class Renderable extends Positionable {
    sprite;
    rendered = false;
    destroyed = false;
    _debug;
    hide() {
        this.sprite.visible = false;
    }
    show() {
        if (this.destroyed) return;
        if (!this.rendered) {
            this.rendered = true;
            this.render();
        }
        this.sprite.visible = true;
        this.debug();
    }
    toggle() {
        return this.sprite.visible ? this.hide() : this.show();
    }
    debug(visible = false) {
        if (this._debug) {
            this._debug.visible = visible;
            this._debug.position.set(this.x * 16, this.y * 16);
        }
    }
    patch(patch, { sprite , from  } = {
    }) {
        if (from) patch = from.patchCreated ? PATCH.CREATED : from.patchEdited ? PATCH.EDITED : from.patchDeleted ? PATCH.DELETED : PATCH.UNCHANGED;
        let tint = 2236962;
        switch(patch){
            case PATCH.CREATED:
                {
                    tint = 65280;
                    break;
                }
            case PATCH.DELETED:
                {
                    tint = 16711680;
                    break;
                }
            case PATCH.EDITED:
                {
                    tint = 16776960;
                    break;
                }
        }
        if (sprite) sprite.tint = tint;
        return tint;
    }
    destructor() {
        this.destroyed = true;
        this.rendered = false;
        this.sprite.visible = false;
        this.sprite.removeChildren();
        this.debug(false);
        this._debug?.parent.removeChild(this._debug);
    }
}
class Minimap extends Renderable {
    sprite;
    data = null;
    constructor({ world  }){
        super({
            world
        });
        this.sprite = this.world.sprites.minimap.addChild(Render.Container());
        this.hide();
    }
    hide() {
        this.world.sprites.world.filters = null;
        return super.hide();
    }
    show() {
        this.world.sprites.world.filters = [
            new Render.filters.BlurFilter(),
            new Render.filters.ColorMatrixFilter()
        ];
        this.world.sprites.world.filters[1].brightness(0.5);
        return super.show();
    }
    get open() {
        return this.sprite.visible;
    }
    async render() {
        this.sprite.scale.set(1.5);
        if (!this.data) this.data = await fetch(`/map/${this.world.name}/pins`).then((res)=>res.json()
        );
        for (const [name, { mx , my , pins  }] of Object.entries(this.data.regions)){
            const sprite = this.sprite.addChild(Render.Sprite({
                frame: `/copyrighted/imgs/regions/${name}.png?commit=${Render.commit}`
            }));
            sprite.position.set(mx, my);
            for (const { x , y , mx: mx1 , my: my1  } of pins){
                const pin = sprite.addChild(Render.Graphics({
                    fill: [
                        16711680,
                        0.5
                    ],
                    rect: [
                        0,
                        0,
                        0.5,
                        0.5
                    ]
                }));
                pin.interactive = true;
                pin.position.set(mx1, my1);
                pin.on("mouseover", ()=>pin.tint = 65280
                );
                pin.on("mouseout", ()=>pin.tint = 16777215
                );
                pin.on("click", ()=>this.moveTo({
                        x,
                        y
                    })
                );
                pin.on("tap", ()=>this.moveTo({
                        x,
                        y
                    })
                );
            }
        }
        let mx1 = Infinity, my1 = Infinity, Mx = -Infinity, My = -Infinity;
        this.sprite.children.forEach((sprite)=>{
            mx1 = Math.min(mx1, sprite.x);
            my1 = Math.min(my1, sprite.y);
            Mx = Math.max(Mx, sprite.x + sprite.width);
            My = Math.max(My, sprite.y + sprite.height);
        });
        const width = (Mx - mx1) / 2, height = (My - my1) / 2;
        this.sprite.position.set(-mx1 + (width + global1.document.body.clientWidth / 2) / 2, -my1 + (height - global1.document.body.clientHeight / 2) / 2);
    }
    moveTo({ x , y  }) {
        this.world.camera.moveTo({
            x,
            y
        });
        this.hide();
    }
}
class App {
    world;
    controller;
    ready;
    constructor(){
        const that = this;
        this.world = null;
        this.controller = null;
        const params = new URLSearchParams(window.location.search);
        App.debug.patch = params.get("patch");
        this.ready = new Promise((solve)=>{
            Render.setup().then(()=>{
                that.world = new World({
                    app: this,
                    name: params.get("map")
                });
                that.controller = new Controller({
                    app: this,
                    world: this.world
                });
                that.world.camera.moveTo({
                    x: 329,
                    y: -924
                });
                solve();
            });
        });
    }
    static debug = {
        logs: false,
        chunks: false,
        areas: false,
        camera: false,
        patch: null
    };
    static config = {
        showNpcs: true,
        showCreatures: true,
        shinyRate: 1 / 8,
        delta: 0.0625
    };
}
class World {
    sprites;
    loaded = {
        chunks: new Map(),
        areas: new Map()
    };
    camera;
    minimap;
    name;
    app;
    tick = 0;
    constructor({ app , name  }){
        this.app = app;
        this.name = name ?? "overworld";
        const sprite = Render.app.stage.addChild(Render.Container());
        this.sprites = {
            world: sprite,
            chunks: sprite.addChild(Render.Container({
                sorted: true
            })),
            locations: sprite.addChild(Render.Container()),
            debug: sprite.addChild(Render.Container()),
            minimap: Render.app.stage.addChild(Render.Container())
        };
        this.camera = new Camera({
            world: this
        });
        this.minimap = new Minimap({
            world: this
        });
        const seaTextures = ANIMATED[2374].frames.map((frame)=>Render.Texture({
                frame
            })
        );
        Render.engine.Ticker.shared.add(()=>{
            this.tick += App.config.delta;
            if (Number.isInteger(this.tick)) {
                this.loaded.chunks.forEach((chunk)=>{
                    if (chunk.layers.has("0X")) chunk.layers.get("0X").texture = seaTextures[this.tick % seaTextures.length];
                });
                this.app.controller.updateFPS(Render.engine.Ticker.shared.FPS);
            }
            this.loaded.areas.forEach((area)=>area.update(this.tick)
            );
        });
    }
    chunkAt({ x , y  }) {
        return this.loaded.chunks.get(`${Math.floor(Math.ceil(x + 1) / 32)};${Math.floor(Math.floor(y - 1) / 32)}`);
    }
}
class Controller {
    app;
    world;
    constructor({ app , world  }){
        this.app = app;
        this.world = world;
        this.scrollers();
        this.controls();
    }
    scrollers() {
        let click = {
            x: 0,
            y: 0,
            active: false
        };
        let touch = {
            x: 0,
            y: 0
        };
        Render.app.view.addEventListener("touchstart", (event)=>touch = {
                x: event.touches[0].pageX,
                y: event.touches[0].pageY
            }
        );
        Render.app.view.addEventListener("touchmove", (event)=>{
            const delta = {
                x: touch.x - event.touches[0].pageX,
                y: touch.y - event.touches[0].pageY
            };
            touch = {
                x: event.touches[0].pageX,
                y: event.touches[0].pageY
            };
            if (!this.world.minimap.open) {
                this.world.sprites.world.position.set(Math.round(this.world.sprites.world.position.x - delta.x), Math.round(this.world.sprites.world.position.y - delta.y));
            } else {
                this.world.minimap.sprite.position.set(Math.round(this.world.minimap.sprite.position.x - delta.x), Math.round(this.world.minimap.sprite.position.y - delta.y));
            }
            this.world.camera.render();
        });
        Render.app.view.addEventListener("mousedown", (event)=>click = {
                x: event.pageX,
                y: event.pageY,
                active: true
            }
        );
        global1.document.addEventListener("mousemove", (event)=>{
            if (click.active) {
                if (event.buttons === 0) {
                    click.active = false;
                    this.world.camera.render();
                    return;
                }
                const delta = {
                    x: click.x - event.pageX,
                    y: click.y - event.pageY
                };
                click = {
                    x: event.pageX,
                    y: event.pageY,
                    active: true
                };
                if (!this.world.minimap.open) {
                    this.world.sprites.world.position.set(Math.round(this.world.sprites.world.position.x - delta.x), Math.round(this.world.sprites.world.position.y - delta.y));
                } else {
                    this.world.minimap.sprite.position.set(Math.round(this.world.minimap.sprite.position.x - delta.x), Math.round(this.world.minimap.sprite.position.y - delta.y));
                }
            }
        });
        Render.app.view.addEventListener("wheel", (event)=>{
            event.preventDefault();
            if (!this.world.minimap.open) {
                this.world.sprites.world.position.set(Math.round(this.world.sprites.world.position.x - event.deltaX), Math.round(this.world.sprites.world.position.y - event.deltaY));
            } else {
                this.world.minimap.sprite.position.set(Math.round(this.world.minimap.sprite.position.x - event.deltaX), Math.round(this.world.minimap.sprite.position.y - event.deltaY));
            }
            this.world.camera.render();
        });
    }
    controls() {
        global1.document.querySelector("[data-control-for='map']")?.addEventListener("click", ()=>this.world.minimap.toggle()
        );
        global1.document.querySelector("[data-control-for='debug']")?.addEventListener("click", ()=>{
            global1.document.querySelector("nav.debug").style.display = global1.document.querySelector("nav.debug").style.display === "flex" ? "none" : "flex";
        });
        Object.keys(App.debug).forEach((key)=>{
            const input = global1.document.createElement("input");
            input.setAttribute("data-control-for", key);
            input.setAttribute("type", "checkbox");
            if ([
                "patch"
            ].includes(key)) input.setAttribute("disabled", true);
            input.checked = App.debug[key];
            input.addEventListener("change", ()=>{
                App.debug[key] = input.checked;
                this.world.camera.render();
            });
            const label = global1.document.createElement("label");
            label.innerText = key;
            label.prepend(input);
            global1.document.querySelector(".debug")?.append(label);
        });
    }
    updateDOM() {
        const location = global1.document.querySelector("#location .name");
        if (location) location.innerHTML = this.world.camera.location[0] ?? "-  ";
        const position = global1.document.querySelector("#location .position");
        if (position) position.innerHTML = `${this.world.camera.x};${this.world.camera.y}`;
    }
    updateFPS(fps) {
        global1.document.querySelector(".debug [data-control-for='fps']").innerText = `${Math.round(fps)} FPS`;
    }
}
class Camera extends Renderable {
    sprite;
    constructor({ world  }){
        super({
            world
        });
        this.sprite = this.world.sprites.world.addChild(Render.Container());
        Object.defineProperties(this, {
            x: {
                get: ()=>Math.floor((-this.world.sprites.world.position.x + global1.document.body.clientWidth / 2) / 16)
                ,
                set: (x)=>this.moveTo({
                        x,
                        y: this.y
                    })
            },
            y: {
                get: ()=>Math.floor((-this.world.sprites.world.position.y + global1.document.body.clientHeight / 2) / 16)
                ,
                set: (y)=>this.moveTo({
                        x: this.x,
                        y
                    })
            }
        });
        this.render();
    }
    throttle = false;
    debounce = false;
    debug() {
        if (!this._debug) this._debug = this.world.sprites.debug.addChild(Render.Graphics({
            fill: [
                16711680,
                0.5
            ],
            rect: [
                0,
                0,
                1,
                1
            ]
        }));
        return super.debug(App.debug.camera);
    }
    render({ DX =2 , DY =1 , DM =3  } = {
    }) {
        if (this.throttle) {
            this.debounce = true;
            return;
        }
        this.throttle = true;
        this.debug();
        const { x , y  } = this;
        const X = Math.floor(x / 32);
        const Y = Math.floor(y / 32);
        const visible = [];
        for(let x1 = X - DX; x1 <= X + DX; x1++){
            for(let y = Y - DY; y <= Y + DY; y++)visible.push(`${x1};${y}`);
        }
        visible.forEach((id)=>{
            if (!this.world.loaded.chunks.has(id)) this.world.loaded.chunks.set(id, new Chunk({
                id,
                world: this.world
            }));
            this.world.loaded.chunks.get(id)?.show();
        });
        this.world.loaded.chunks.forEach((chunk, id)=>{
            if (!visible.includes(id)) {
                chunk.hide();
                if (Math.sqrt((chunk.x - X) ** 2 + (chunk.y - Y) ** 2) > DM) {
                    this.world.loaded.chunks.delete(id);
                    chunk.destructor();
                }
            }
        });
        const areas = new Set();
        this.world.loaded.chunks.forEach((chunk)=>chunk.areas.forEach((area)=>areas.add(area)
            )
        );
        this.world.loaded.areas.forEach((area, id)=>{
            if (!areas.has(area)) {
                this.world.loaded.areas.delete(id);
                area.destructor();
            }
        });
        this.world.app?.controller?.updateDOM();
        setTimeout(()=>{
            this.throttle = false;
            if (this.debounce) {
                this.debounce = false;
                this.render();
            }
        }, 200);
    }
    get location() {
        return [
            ...this.world.loaded.areas.values()
        ].filter((area)=>(area.data.type === "locations" || area.data.type === "regions") && area.contains(this)
        ).map(({ data  })=>data.name
        );
    }
    moveTo({ x , y  }) {
        this.world.sprites.world.position.set(-x * 16 + global1.document.body.clientWidth / 2, -y * 16 + global1.document.body.clientHeight / 2);
        this.render();
    }
}
class Chunk extends Renderable {
    id;
    sprite;
    data = null;
    layers = new Map();
    areas = new Set();
    world;
    constructor({ id , world  }){
        super({
            world
        });
        this.id = id;
        this.world = world;
        [this.x, this.y] = this.id.split(";").map((n)=>Number(n) * CHUNK_SIZE
        );
        this.width = this.height = CHUNK_SIZE;
        this.sprite = this.world.sprites.chunks.addChild(Render.Container({
            x: this.x,
            y: this.y,
            z: this.x - this.y
        }));
        if (App.debug.chunks) console.debug(`loaded chunk: ${this.id}`);
    }
    destructor() {
        if (App.debug.chunks) console.debug(`unloaded loaded chunk: ${this.id}`);
        this.layers.clear();
        this.areas.clear();
        return super.destructor();
    }
    show() {
        super.show();
        this.data?.areas?.forEach((area)=>Area.from({
                data: area,
                chunk: this
            })?.show()
        );
    }
    debug() {
        if (!this._debug) {
            this._debug = this.world.sprites.debug.addChild(Render.Graphics({
                text: this.id,
                textStyle: {
                    fontSize: 12,
                    fill: "white"
                },
                stroke: [
                    1,
                    255,
                    0.5
                ],
                fill: [
                    255,
                    0.25
                ],
                rect: [
                    0,
                    0,
                    this.width,
                    this.height
                ]
            }));
        }
        return super.debug(App.debug.chunks);
    }
    async render() {
        if (!this.data) this.data = await fetch(`/map/${this.world.name}/${this.id}${App.debug.patch ? `?patch=${App.debug.patch}` : ""}`).then((res)=>res.json()
        );
        this.layers.set("0X", this.sprite.addChild(Render.TilingSprite({
            frame: 0,
            width: 32,
            height: 32
        })));
        if (App.debug.patch) this.patch(PATCH.UNCHANGED, {
            sprite: this.layers.get("0X")
        });
        for (const { name , sublayers , sorted =false  } of [
            {
                name: "1X",
                sublayers: [
                    "1A",
                    "1B",
                    "1C"
                ]
            },
            {
                name: "2X",
                sublayers: [
                    "2A",
                    "2B",
                    "2C"
                ],
                sorted: true
            }, 
        ]){
            if (!this.layers.has(name)) this.layers.set(name, this.sprite.addChild(Render.Container({
                z: 0,
                sorted
            })));
            const layer = this.layers.get(name);
            for(let z = 0; z < sublayers.length; z++){
                const tiles = this.data?.chunk?.layers?.[sublayers[z]];
                if (!tiles) continue;
                for(let i = 0; i < tiles.length; i++){
                    const tile = tiles[i];
                    if (tile >= 0) {
                        const y = i % 32, x = Math.floor(i / 32);
                        const sprite = layer.addChild(Render.Sprite({
                            frame: ~~tile,
                            x,
                            y,
                            z: y * 32 + z
                        }));
                        if (App.debug.patch) this.patch(tile % 1, {
                            sprite
                        });
                    }
                }
            }
        }
        this.world.camera.render();
    }
}
var Type;
var Pattern;
(function(Type) {
    Type["people"] = "people";
    Type["creatures"] = "creatures";
    Type["regions"] = "regions";
    Type["locations"] = "locations";
})(Type || (Type = {
}));
class Area extends Renderable {
    id;
    sprite;
    data;
    polygon;
    npcs = new Set();
    constructor({ id , data , world  }){
        super({
            world
        });
        this.id = id;
        this.data = data;
        this.polygon = Render.Polygon(this.data.points);
        this.sprite = Render.Container();
        if (App.debug.logs) console.debug(`loaded area: ${this.id} (${this.data.name})`);
    }
    contains({ x , y  }) {
        return this.polygon.contains(x * 16, y * 16);
    }
    debug() {
        if (!this._debug) {
            this._debug = this.world.sprites.debug.addChild(Render.Graphics({
                text: `${this.data.name ?? ""}\n(${this.data.type}#${this.id})`.trim(),
                textStyle: {
                    align: "center",
                    fontSize: 10,
                    fill: "white"
                },
                textPosition: {
                    x: this.polygon.points[0],
                    y: this.polygon.points[1]
                },
                stroke: [
                    1,
                    16777215,
                    0.5
                ],
                fill: [
                    16777215,
                    0.25
                ],
                polygon: this.polygon
            }));
            if (App.debug.patch) this.patch(NaN, {
                sprite: this._debug,
                from: this.data.properties
            });
            else this._debug.tint = 65280;
        }
        if (this._debug && App.debug.areas) this._debug.alpha = this.contains(this.world.camera) ? 1 : 0.25;
        return super.debug(App.debug.areas);
    }
    update(_tick) {
        if (this.data.name) {
            switch(this.data.type){
                case Type.people:
                    {
                        if (App.config.showNpcs && !this.npcs.size) this.npcs.add(new NPC({
                            world: this.world,
                            area: this,
                            type: this.data.type,
                            name: this.data.name,
                            pattern: this.data.properties.pattern
                        }));
                        break;
                    }
                case Type.creatures:
                    {
                        if (App.config.showCreatures && this.npcs.size < 1 + Math.floor(Number(this.data.properties.size) / 20)) {
                            if (this.data.properties.encounters) {
                                const encounters = this.data.properties.encounters;
                                const random = Math.random();
                                let weight = 0;
                                for(const species in encounters){
                                    if (random <= weight + encounters[species]) {
                                        this.npcs.add(new NPC({
                                            world: this.world,
                                            area: this,
                                            type: this.data.type,
                                            name: species
                                        }));
                                        break;
                                    }
                                    weight += encounters[species];
                                }
                            }
                        }
                        break;
                    }
            }
        }
        this.npcs.forEach((npc)=>npc.update(this.world.tick)
        );
    }
    destructor() {
        if (App.debug.logs) console.debug(`unloaded loaded area: ${this.id}`);
        this.npcs.forEach((npc)=>npc.destructor()
        );
        this.npcs.clear();
        return super.destructor();
    }
    render() {
    }
    static from({ data , chunk  }) {
        const id = `${data.id}`;
        if (!chunk.world.loaded.areas.has(id)) chunk.world.loaded.areas.set(id, new Area({
            id,
            data,
            world: chunk.world
        }));
        const area = chunk.world.loaded.areas.get(id);
        chunk.areas.add(area);
        return area;
    }
}
(function(Pattern) {
    Pattern["patrol"] = "patrol";
    Pattern["loop"] = "loop";
    Pattern["wander"] = "wander";
    Pattern["fixed"] = "fixed";
    Pattern["lookaround"] = "lookaround";
})(Pattern || (Pattern = {
}));
var Direction;
(function(Direction) {
    Direction[Direction["none"] = 0] = "none";
    Direction[Direction["up"] = 1] = "up";
    Direction[Direction["right"] = 2] = "right";
    Direction[Direction["down"] = 3] = "down";
    Direction[Direction["left"] = 4] = "left";
})(Direction || (Direction = {
}));
class NPC extends Renderable {
    sprite;
    sprites;
    offset = {
        x: 0,
        y: 0
    };
    area;
    track = [];
    _track_index = 0;
    pattern;
    name;
    type;
    lifetime = Infinity;
    direction = Direction.none;
    directions = [];
    constructor({ world , area , type , name , pattern =Pattern.fixed  }){
        super({
            world
        });
        this.area = area;
        this.name = name;
        this.type = type;
        this.sprite = Render.Container();
        this.pattern = pattern;
        let frame = "";
        this.directions = this.area.data.properties.directions ?? [];
        if (type === Type.creatures) {
            const type = Math.random() < App.config.shinyRate ? "shiny" : "regular";
            frame = `${type}/${this.name}`;
            this.lifetime = Math.floor(12 + Math.random() * 28);
            this.pattern = Pattern.wander;
        }
        if (type === Type.people) frame = `${this.name}_${this.directions.length ? this.directions[0] : "down"}_0`;
        this.sprites = {
            main: this.sprite.addChild(Render.Sprite({
                frame: frame,
                anchor: [
                    0.5,
                    1
                ]
            })),
            mask: null,
            shadow: null
        };
        if (App.debug.logs) console.debug(`loaded npc: ${this.name}`);
        this.computeSpawn();
        this.computePattern();
        this.sprite.alpha = 0;
    }
    destructor() {
        if (App.debug.logs) console.debug(`unloaded npc: ${this.name}`);
        this.area.npcs.delete(this);
        return super.destructor();
    }
    computeSpawn() {
        this.x = this.area.polygon.points[0] / TILE_SIZE;
        this.y = this.area.polygon.points[1] / TILE_SIZE;
        for (const { dx , dy  } of [
            {
                dx: -1,
                dy: -1
            },
            {
                dx: 0,
                dy: -1
            },
            {
                dx: +1,
                dy: -1
            },
            {
                dx: -1,
                dy: 0
            },
            {
                dx: +1,
                dy: 0
            },
            {
                dx: -1,
                dy: +1
            },
            {
                dx: 0,
                dy: +1
            },
            {
                dx: +1,
                dy: +1
            }
        ]){
            this.x += dx;
            this.y += dy;
            if (this.area.contains(this)) break;
        }
        let nx = this.x, ny = this.y;
        for(let i = 0; i < 30 * Math.random(); i++){
            for (const { dx , dy  } of [
                {
                    dx: 0,
                    dy: -1
                },
                {
                    dx: -1,
                    dy: 0
                },
                {
                    dx: +1,
                    dy: 0
                },
                {
                    dx: 0,
                    dy: +1
                }
            ]){
                if (this.area.contains({
                    x: nx + dx,
                    y: ny + dy
                })) {
                    nx += dx;
                    ny += dy;
                }
            }
        }
        this.x = nx;
        this.y = ny;
    }
    computePattern() {
        if (this.pattern === "loop" || this.pattern === "patrol") {
            const points = this.area.polygon.points.map((n)=>n / 16
            );
            points.push(points[0], points[1]);
            this.track = [
                points[0],
                points[1]
            ];
            for(let i = 2; i < points.length; i += 2){
                const [px, py, nx, ny] = [
                    points[i - 2],
                    points[i - 1],
                    points[i],
                    points[i + 1]
                ];
                const dx = nx - px;
                const dy = ny - py;
                let [x, y] = [
                    px,
                    py
                ];
                for(let j = 0; j < Math.abs(dx); j++)this.track.push(x += Math.sign(dx), y);
                for(let j1 = 0; j1 < Math.abs(dy); j1++)this.track.push(x, y += Math.sign(dy));
            }
            for(let i1 = 0; i1 < this.track.length; i1 += 2){
                const [x, y] = [
                    this.track[i1],
                    this.track[i1 + 1]
                ];
                if (!this.area.contains({
                    x,
                    y
                })) this.track[i1] = this.track[i1 + 1] = NaN;
            }
            this.track = this.track.filter(Number.isFinite);
            if (this.pattern === "patrol") {
                const points = this.track.slice();
                for(let i = points.length - 4; i > 0; i -= 2)this.track.push(points[i], points[i + 1]);
            }
            if (this.pattern === "loop" && this.track[0] === this.track[this.track.length - 2] && this.track[1] === this.track[this.track.length - 1]) {
                this.track.pop();
                this.track.pop();
            }
        }
    }
    render() {
        const chunk = this.world.chunkAt(this);
        if (chunk) {
            if (CREATURES_FLYING.includes(this.name) && !this.sprites.shadow) {
                this.offset.y = -TILE_SIZE;
                const shadow = Render.Graphics({
                    fill: [
                        0,
                        0.5
                    ],
                    ellipse: [
                        0,
                        -0.5,
                        2 / 3,
                        2 / 4
                    ]
                });
                this.sprites.shadow = this.sprite.addChildAt(shadow, 0);
            }
            if ([
                "magikarp",
                "sharpedo",
                "wailmer",
                "tentacool"
            ].includes(this.name) && !this.sprites.mask) {
                const mask = Render.Graphics({
                    rect: [
                        -2,
                        -2.75,
                        4,
                        2
                    ],
                    fill: [
                        0,
                        0
                    ]
                });
                this.sprite.addChild(mask);
                this.sprites.main.mask = this.sprites.mask = mask;
            }
            const rx = this.x - chunk.x, ry = this.y - chunk.y;
            this.sprite.position.set((rx + 0.5) * 16, (ry + 1) * 16);
            this.sprite.zIndex = Math.ceil(ry) * CHUNK_SIZE;
            this.sprites.main.position.set(this.offset.x, this.offset.y);
            chunk?.layers.get("2X")?.addChild(this.sprite);
            if (App.debug.patch) this.patch(NaN, {
                sprite: this.sprites.main,
                from: this.area.data.properties
            });
        }
    }
    update(tick) {
        this.lifetime -= App.config.delta;
        if (this.lifetime <= 1) this.sprite.alpha *= 0.8;
        else if (this.sprite.alpha < 1) {
            this.sprite.alpha = Math.min(1, this.sprite.alpha * 1.25);
            if (!this.sprite.alpha) this.sprite.alpha = 0.03;
        }
        if (Number.isInteger(tick)) {
            if (this.lifetime <= 0) {
                this.destructor();
                return;
            }
            this.direction = Direction.none;
            this[this.pattern]();
        }
        this.goDirection();
        this.render();
    }
    fixed() {
    }
    loop() {
        this._track_index = (this._track_index + 2) % this.track.length;
        const dx = this.track[this._track_index] - this.x;
        const dy = this.track[this._track_index + 1] - this.y;
        if (dx > 0) this.goRight();
        else if (dx < 0) this.goLeft();
        else if (dy < 0) this.goUp();
        else if (dy > 0) this.goDown();
    }
    patrol() {
        this.loop();
    }
    wander() {
        void [
            ()=>null
            ,
            ()=>this.goLeft()
            ,
            ()=>this.goRight()
            ,
            ()=>this.goUp()
            ,
            ()=>this.goDown()
        ][Math.floor(Math.random() / 0.2)]();
    }
    lookaround() {
        void [
            ()=>null
            ,
            ()=>this.lookLeft()
            ,
            ()=>this.lookRight()
            ,
            ()=>this.lookUp()
            ,
            ()=>this.lookDown()
        ][Math.floor(Math.random() / 0.2)]();
    }
    texture(suffix, { flip =0  } = {
    }) {
        const frame = `${this.name}${suffix ? `_${suffix}` : ""}`;
        if (frame in Render.cache) this.sprites.main.texture = Render.Texture({
            frame
        });
        else if (flip) this.sprites.main.scale.x = Math.sign(flip);
    }
    lookLeft() {
        this.texture("left_0", {
            flip: +1
        });
    }
    goDirection() {
        const delta = App.config.delta;
        if (this.direction === Direction.none) return;
        const dx = Math.round(Math.abs(this.x - Math.floor(this.x)) / (1 / 6)) % 3;
        const dy = Math.round(Math.abs(this.y - Math.floor(this.y)) / (1 / 6)) % 3;
        switch(this.direction){
            case Direction.up:
                {
                    this.y -= delta;
                    this.texture(`up_${dy}`);
                    return;
                }
            case Direction.down:
                {
                    this.y += delta;
                    this.texture(`down_${dy}`);
                    return;
                }
            case Direction.left:
                {
                    this.x -= delta;
                    this.texture(`left_${dx}`);
                    return;
                }
            case Direction.right:
                {
                    this.x += delta;
                    this.texture(`right_${dx}`);
                    return;
                }
        }
    }
    goLeft() {
        if (this.area.contains({
            x: this.x - 1,
            y: this.y
        })) {
            this.direction = Direction.left;
            this.lookLeft();
        }
    }
    lookRight() {
        this.texture("right_0", {
            flip: -1
        });
    }
    goRight() {
        if (this.area.contains({
            x: this.x + 1,
            y: this.y
        })) {
            this.direction = Direction.right;
            this.lookRight();
        }
    }
    lookUp() {
        this.texture("up_0");
    }
    goUp() {
        if (this.area.contains({
            x: this.x,
            y: this.y - 1
        })) {
            this.direction = Direction.up;
            this.lookUp();
        }
    }
    lookDown() {
        this.texture("down_0");
    }
    goDown() {
        if (this.area.contains({
            x: this.x,
            y: this.y + 1
        })) {
            this.direction = Direction.down;
            this.lookDown();
        }
    }
}
global1.app = new App();
