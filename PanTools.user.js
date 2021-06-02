// ==UserScript==
// @name          网盘工具箱
// @namespace     https://wiki.shuma.ink
// @description   一个好用的网盘助手；插件主要功能有：[1]自动匹配页面内百度网盘分享的访问地址及密钥并保存至本地
// @license       MIT
// @version       1.0.0
// @author        shuma
// @source        https://wiki.shuma.ink
// @include       *://*
// @require       http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @supportURL    https://wiki.shuma.ink
// @grant         GM_xmlhttpRequest
// @grant         GM_registerMenuCommand
// @grant         GM_openInTab
// @grant         GM_info
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_getResourceText
// @grant         GM_addStyle
// @grant         window.onurlchange
// @connect       *://*
// @run-at        document-end
// ==/UserScript==

(function(e) {
    var t = {};
    function __webpack_require__(n) {
        if (t[n]) {
            return t[n].exports;
        }
        var r = t[n] = {
            i: n,
            l: false,
            exports: {}
        };
        e[n].call(r.exports, r, r.exports, __webpack_require__);
        r.l = true;
        return r.exports;
    }
    __webpack_require__.m = e;
    __webpack_require__.c = t;
    __webpack_require__.d = function(e, t, n) {
        if (!__webpack_require__.o(e, t)) {
            Object.defineProperty(e, t, {
                enumerable: true,
                get: n
            });
        }
    };
    __webpack_require__.r = function(e) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            });
        }
        Object.defineProperty(e, "__esModule", {
            value: true
        });
    };
    __webpack_require__.t = function(e, t) {
        if (t & 1) e = __webpack_require__(e);
        if (t & 8) return e;
        if (t & 4 && typeof e === "object" && e && e.__esModule) return e;
        var n = Object.create(null);
        __webpack_require__.r(n);
        Object.defineProperty(n, "default", {
            enumerable: true,
            value: e
        });
        if (t & 2 && typeof e != "string") for (var r in e) __webpack_require__.d(n, r, function(t) {
            return e[t];
        }.bind(null, r));
        return n;
    };
    __webpack_require__.n = function(e) {
        var t = e && e.__esModule ? function getDefault() {
            return e["default"];
        } : function getModuleExports() {
            return e;
        };
        __webpack_require__.d(t, "a", t);
        return t;
    };
    __webpack_require__.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 11);
})([ function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.Logger = void 0;
    var r = n(21);
    var a = n(22);
    var o = function() {
        function Logger() {}
        Logger.log = function(e, t) {
            console.group(r.Env.Sign + "[" + t.toString() + "]");
            console.log(e);
            console.groupEnd();
        };
        Logger.debug = function(e) {
            this.log(e, a.LogLevel.debug);
        };
        Logger.info = function(e) {
            this.log(e, a.LogLevel.info);
        };
        Logger.warn = function(e) {
            this.log(e, a.LogLevel.warn);
        };
        Logger.error = function(e) {
            this.log(e, a.LogLevel.error);
        };
        return Logger;
    }();
    t.Logger = o;
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.Core = void 0;
    var r = function() {
        function Core() {}
        Core.currentUrl = function() {
            return window.location.href;
        };
        Object.defineProperty(Core, "url", {
            get: function() {
                return window.location.href;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Core, "clearUrl", {
            get: function() {
                return this.url.replace(window.location.hash, "");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Core, "hash", {
            get: function() {
                return window.location.hash.slice(1);
            },
            enumerable: false,
            configurable: true
        });
        Core.open = function(e, t) {
            if (t === void 0) {
                t = false;
            }
            GM_openInTab(e, {
                active: !t
            });
        };
        return Core;
    }();
    t.Core = r;
}, function(e, t, n) {
    var r = n(20);
    t = r(false);
    t.push([ e.i, ".pantools-container{z-index:99999 !important}.pantools-popup{font-size:14px !important}.pantools-setting-label{display:flex;align-items:center;justify-content:space-between;padding-top:20px}.pantools-setting-checkbox{width:16px;height:16px}\n", "" ]);
    e.exports = t;
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.IocAuto = t.Container = void 0;
    n(12);
    var r = new Map;
    var a = function() {
        function Container() {}
        Container.Registe = function(e, t) {
            var n = this.processName(e.name);
            r.set(n, window.Reflect.construct(e, this.buildParams(t)));
            return r.get(n);
        };
        Container.buildParams = function(e) {
            var t = [];
            e === null || e === void 0 ? void 0 : e.map((function(e) {
                t.push(e);
            }));
            return t;
        };
        Container.processName = function(e) {
            return e.toLowerCase();
        };
        Container.Require = function(e) {
            var t = this;
            if (e == undefined) {
                return null;
            }
            var n = this.processName(e.name);
            if (r.has(n)) {
                return r.get(n);
            }
            var a = Reflect.getMetadata(i, e);
            var o;
            if (a === null || a === void 0 ? void 0 : a.length) {
                o = a.map((function(e) {
                    return t.Require(e);
                }));
            }
            return this.Registe(e, o);
        };
        Container.define = function(e, t) {
            var n;
            var r = Reflect.getMetadata(o, e, t);
            var a = (n = Object.getOwnPropertyDescriptor(e, t)) !== null && n !== void 0 ? n : {
                writable: true,
                configurable: true
            };
            a.value = this.Require(r);
            Object.defineProperty(e, t, a);
        };
        return Container;
    }();
    t.Container = a;
    var o = "design:type";
    var i = "design:paramtypes";
    function IocAuto(e, t) {
        a.define(e, t);
    }
    t.IocAuto = IocAuto;
}, function(e, t, n) {
    "use strict";
    var r = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    };
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.Alert = void 0;
    var a = r(n(18));
    n(19);
    var o = function() {
        function Alert() {}
        Alert.info = function(e, t) {
            if (t === void 0) {
                t = 2;
            }
            a.default.fire({
                toast: true,
                position: "top",
                showCancelButton: false,
                showConfirmButton: false,
                title: e,
                icon: "success",
                timer: t * 1e3,
                customClass: this.customeCss
            });
        };
        Alert.html = function(e, t, n, r, o, i) {
            if (n === void 0) {
                n = false;
            }
            if (r === void 0) {
                r = "";
            }
            if (o === void 0) {
                o = false;
            }
            if (i === void 0) {
                i = "";
            }
            return a.default.fire({
                toast: true,
                position: "top",
                html: t,
                showCancelButton: n,
                showConfirmButton: o,
                title: e,
                cancelButtonText: r,
                confirmButtonText: i,
                customClass: this.customeCss
            });
        };
        Alert.customeCss = {
            container: "pantools-container",
            popup: "pantools-popup",
            title: "pantools-title",
            closeButton: "pantools-close",
            icon: "pantools-icon",
            image: "pantools-image",
            htmlContainer: "pantools-html",
            input: "pantools-input",
            validationMessage: "pantools-validation",
            actions: "pantools-actions",
            confirmButton: "pantools-confirm",
            denyButton: "pantools-deny",
            cancelButton: "pantools-cancel",
            loader: "pantools-loader",
            footer: "pantools-footer"
        };
        return Alert;
    }();
    t.Alert = o;
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.PanRoutes = void 0;
    var r = n(6);
    var a = n(7);
    t.PanRoutes = [ {
        type: a.PanTypeEnum.\u767e\u5ea6\u4e91\u76d8,
        SiteEnum: r.SiteEnum.BDY,
        contextRule: /((?:https?:\/\/)?(?:yun|pan).baidu.com\/(?:s\/(\w|-)*|share\/\S*\d)(#\w{4})?)(.{10})/g,
        idRule: /\/s\/[0-9](([0-9A-Za-z-]*))/i,
        linkRule: /((?:https?:\/\/)?(?:yun|pan).baidu.com\/(?:s\/(\w|-)*|share\/\S*\d)(#\w{4})?)/i,
        pwdRule: /(?<=\s*(\u5bc6|\u63d0\u53d6|\u8bbf\u95ee|\u5bc6|\u63d0\u53d6|\u8a2a\u554f|key|password|pwd)[\u7801\u78bc]?[\uff1a:]?\s*)[A-Za-z0-9]{3,8}/i,
        urlRule: /(?:https?:\/\/)?(?:yun|pan).baidu.com\/share\/init\?surl=([a-zA-Z0-9-]*)/i,
        inputSelector: "#accessCode",
        buttonSelecto: "#submitBtn",
        urlId: "surl"
    } ];
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.SiteEnum = void 0;
    var r;
    (function(e) {
        e["All"] = "All";
        e["TaoBao"] = "TaoBao";
        e["TMall"] = "TMall";
        e["JingDong"] = "JingDong";
        e["IQiYi"] = "IQiYi";
        e["YouKu"] = "YouKu";
        e["LeShi"] = "LeShi";
        e["TuDou"] = "TuDou";
        e["Tencent_V"] = "Tencent_V";
        e["MangGuo"] = "MangGuo";
        e["SoHu"] = "SoHu";
        e["Acfun"] = "Acfun";
        e["BiliBili"] = "BiliBili";
        e["M1905"] = "M1905";
        e["PPTV"] = "PPTV";
        e["YinYueTai"] = "YinYueTai";
        e["WangYi"] = "WangYi";
        e["Tencent_M"] = "Tencent_M";
        e["KuGou"] = "KuGou";
        e["KuWo"] = "KuWo";
        e["XiaMi"] = "XiaMi";
        e["TaiHe"] = "TaiHe";
        e["QingTing"] = "QingTing";
        e["LiZhi"] = "LiZhi";
        e["MiGu"] = "MiGu";
        e["XiMaLaYa"] = "XiMaLaYa";
        e["SXB"] = "SXB";
        e["BDY"] = "BDY";
        e["BDY1"] = "BDY1";
        e["LZY"] = "LZY";
        e["SuNing"] = "SuNing";
        e["Vp"] = "Vp";
    })(r = t.SiteEnum || (t.SiteEnum = {}));
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.PanTypeEnum = void 0;
    var r;
    (function(e) {
        e[e["\u767e\u5ea6\u4e91\u76d8"] = 0] = "\u767e\u5ea6\u4e91\u76d8";
        e[e["LanZou"] = 1] = "LanZou";
    })(r = t.PanTypeEnum || (t.PanTypeEnum = {}));
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.AppBase = void 0;
    var r = n(0);
    var a = n(1);
    var o = function() {
        function AppBase() {
            var e = this;
            this._unique = true;
            this.Process = function() {
                e.loader();
                e.run();
            };
        }
        AppBase.prototype.unique = function() {
            return this._unique;
        };
        AppBase.prototype.linkTest = function(e) {
            var t = this;
            if (!e) {
                e = a.Core.currentUrl();
            }
            var n = false;
            this.rules.forEach((function(a, o) {
                if (a.test(e)) {
                    r.Logger.debug("app:" + t.appName + " test pass");
                    n = true;
                    t.site = o;
                    return false;
                }
                r.Logger.debug("app:" + t.appName + " test fail");
                return true;
            }));
            return n;
        };
        return AppBase;
    }();
    t.AppBase = o;
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.Config = void 0;
    var r = n(0);
    var a = function() {
        function Config() {}
        Config.set = function(e, t, n) {
            if (n === void 0) {
                n = -1;
            }
            var r = {
                key: e,
                value: t,
                exp: n == -1 ? n : (new Date).getTime() + n * 1e3
            };
            GM_setValue(this.encode(e), JSON.stringify(r));
        };
        Config.get = function(e, t) {
            if (t === void 0) {
                t = false;
            }
            var n = GM_getValue(this.encode(e));
            if (n) {
                var a = JSON.parse(n);
                if (a.exp == -1 || a.exp > (new Date).getTime()) {
                    r.Logger.info(e + " cache true");
                    return a.value;
                }
            }
            r.Logger.info(e + " cache false");
            return t;
        };
        Config.decode = function(e) {
            return atob(e);
        };
        Config.encode = function(e) {
            return btoa(e);
        };
        return Config;
    }();
    t.Config = a;
}, function(e, t, n) {
    "use strict";
    var r = function isOldIE() {
        var e;
        return function memorize() {
            if (typeof e === "undefined") {
                e = Boolean(window && document && document.all && !window.atob);
            }
            return e;
        };
    }();
    var a = function getTarget() {
        var e = {};
        return function memorize(t) {
            if (typeof e[t] === "undefined") {
                var n = document.querySelector(t);
                if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) {
                    try {
                        n = n.contentDocument.head;
                    } catch (e) {
                        n = null;
                    }
                }
                e[t] = n;
            }
            return e[t];
        };
    }();
    var o = [];
    function getIndexByIdentifier(e) {
        var t = -1;
        for (var n = 0; n < o.length; n++) {
            if (o[n].identifier === e) {
                t = n;
                break;
            }
        }
        return t;
    }
    function modulesToDom(e, t) {
        var n = {};
        var r = [];
        for (var a = 0; a < e.length; a++) {
            var i = e[a];
            var s = t.base ? i[0] + t.base : i[0];
            var l = n[s] || 0;
            var u = "".concat(s, " ").concat(l);
            n[s] = l + 1;
            var c = getIndexByIdentifier(u);
            var f = {
                css: i[1],
                media: i[2],
                sourceMap: i[3]
            };
            if (c !== -1) {
                o[c].references++;
                o[c].updater(f);
            } else {
                o.push({
                    identifier: u,
                    updater: addStyle(f, t),
                    references: 1
                });
            }
            r.push(u);
        }
        return r;
    }
    function insertStyleElement(e) {
        var t = document.createElement("style");
        var r = e.attributes || {};
        if (typeof r.nonce === "undefined") {
            var o = true ? n.nc : undefined;
            if (o) {
                r.nonce = o;
            }
        }
        Object.keys(r).forEach((function(e) {
            t.setAttribute(e, r[e]);
        }));
        if (typeof e.insert === "function") {
            e.insert(t);
        } else {
            var i = a(e.insert || "head");
            if (!i) {
                throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            }
            i.appendChild(t);
        }
        return t;
    }
    function removeStyleElement(e) {
        if (e.parentNode === null) {
            return false;
        }
        e.parentNode.removeChild(e);
    }
    var i = function replaceText() {
        var e = [];
        return function replace(t, n) {
            e[t] = n;
            return e.filter(Boolean).join("\n");
        };
    }();
    function applyToSingletonTag(e, t, n, r) {
        var a = n ? "" : r.media ? "@media ".concat(r.media, " {").concat(r.css, "}") : r.css;
        if (e.styleSheet) {
            e.styleSheet.cssText = i(t, a);
        } else {
            var o = document.createTextNode(a);
            var s = e.childNodes;
            if (s[t]) {
                e.removeChild(s[t]);
            }
            if (s.length) {
                e.insertBefore(o, s[t]);
            } else {
                e.appendChild(o);
            }
        }
    }
    function applyToTag(e, t, n) {
        var r = n.css;
        var a = n.media;
        var o = n.sourceMap;
        if (a) {
            e.setAttribute("media", a);
        } else {
            e.removeAttribute("media");
        }
        if (o && typeof btoa !== "undefined") {
            r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o)))), " */");
        }
        if (e.styleSheet) {
            e.styleSheet.cssText = r;
        } else {
            while (e.firstChild) {
                e.removeChild(e.firstChild);
            }
            e.appendChild(document.createTextNode(r));
        }
    }
    var s = null;
    var l = 0;
    function addStyle(e, t) {
        var n;
        var r;
        var a;
        if (t.singleton) {
            var o = l++;
            n = s || (s = insertStyleElement(t));
            r = applyToSingletonTag.bind(null, n, o, false);
            a = applyToSingletonTag.bind(null, n, o, true);
        } else {
            n = insertStyleElement(t);
            r = applyToTag.bind(null, n, t);
            a = function remove() {
                removeStyleElement(n);
            };
        }
        r(e);
        return function updateStyle(t) {
            if (t) {
                if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) {
                    return;
                }
                r(e = t);
            } else {
                a();
            }
        };
    }
    e.exports = function(e, t) {
        t = t || {};
        if (!t.singleton && typeof t.singleton !== "boolean") {
            t.singleton = r();
        }
        e = e || [];
        var n = modulesToDom(e, t);
        return function update(e) {
            e = e || [];
            if (Object.prototype.toString.call(e) !== "[object Array]") {
                return;
            }
            for (var r = 0; r < n.length; r++) {
                var a = n[r];
                var i = getIndexByIdentifier(a);
                o[i].references--;
            }
            var s = modulesToDom(e, t);
            for (var l = 0; l < n.length; l++) {
                var u = n[l];
                var c = getIndexByIdentifier(u);
                if (o[c].references === 0) {
                    o[c].updater();
                    o.splice(c, 1);
                }
            }
            n = s;
        };
    };
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    var r = n(3);
    var a = n(15);
    r.Container.Require(a.PanTools).Init();
}, function(e, t, n) {
    (function(e, t) {
        var n;
        (function(n) {
            (function(e) {
                var r = typeof t === "object" ? t : typeof self === "object" ? self : typeof this === "object" ? this : Function("return this;")();
                var a = makeExporter(n);
                if (typeof r.Reflect === "undefined") {
                    r.Reflect = n;
                } else {
                    a = makeExporter(r.Reflect, a);
                }
                e(a);
                function makeExporter(e, t) {
                    return function(n, r) {
                        if (typeof e[n] !== "function") {
                            Object.defineProperty(e, n, {
                                configurable: true,
                                writable: true,
                                value: r
                            });
                        }
                        if (t) t(n, r);
                    };
                }
            })((function(t) {
                var n = Object.prototype.hasOwnProperty;
                var r = typeof Symbol === "function";
                var a = r && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
                var o = r && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
                var i = typeof Object.create === "function";
                var s = {
                    __proto__: []
                } instanceof Array;
                var l = !i && !s;
                var u = {
                    create: i ? function() {
                        return MakeDictionary(Object.create(null));
                    } : s ? function() {
                        return MakeDictionary({
                            __proto__: null
                        });
                    } : function() {
                        return MakeDictionary({});
                    },
                    has: l ? function(e, t) {
                        return n.call(e, t);
                    } : function(e, t) {
                        return t in e;
                    },
                    get: l ? function(e, t) {
                        return n.call(e, t) ? e[t] : undefined;
                    } : function(e, t) {
                        return e[t];
                    }
                };
                var c = Object.getPrototypeOf(Function);
                var f = typeof e === "object" && e.env && e.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
                var d = !f && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
                var p = !f && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
                var m = !f && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
                var w = new m;
                function decorate(e, t, n, r) {
                    if (!IsUndefined(n)) {
                        if (!IsArray(e)) throw new TypeError;
                        if (!IsObject(t)) throw new TypeError;
                        if (!IsObject(r) && !IsUndefined(r) && !IsNull(r)) throw new TypeError;
                        if (IsNull(r)) r = undefined;
                        n = ToPropertyKey(n);
                        return DecorateProperty(e, t, n, r);
                    } else {
                        if (!IsArray(e)) throw new TypeError;
                        if (!IsConstructor(t)) throw new TypeError;
                        return DecorateConstructor(e, t);
                    }
                }
                t("decorate", decorate);
                function metadata(e, t) {
                    function decorator(n, r) {
                        if (!IsObject(n)) throw new TypeError;
                        if (!IsUndefined(r) && !IsPropertyKey(r)) throw new TypeError;
                        OrdinaryDefineOwnMetadata(e, t, n, r);
                    }
                    return decorator;
                }
                t("metadata", metadata);
                function defineMetadata(e, t, n, r) {
                    if (!IsObject(n)) throw new TypeError;
                    if (!IsUndefined(r)) r = ToPropertyKey(r);
                    return OrdinaryDefineOwnMetadata(e, t, n, r);
                }
                t("defineMetadata", defineMetadata);
                function hasMetadata(e, t, n) {
                    if (!IsObject(t)) throw new TypeError;
                    if (!IsUndefined(n)) n = ToPropertyKey(n);
                    return OrdinaryHasMetadata(e, t, n);
                }
                t("hasMetadata", hasMetadata);
                function hasOwnMetadata(e, t, n) {
                    if (!IsObject(t)) throw new TypeError;
                    if (!IsUndefined(n)) n = ToPropertyKey(n);
                    return OrdinaryHasOwnMetadata(e, t, n);
                }
                t("hasOwnMetadata", hasOwnMetadata);
                function getMetadata(e, t, n) {
                    if (!IsObject(t)) throw new TypeError;
                    if (!IsUndefined(n)) n = ToPropertyKey(n);
                    return OrdinaryGetMetadata(e, t, n);
                }
                t("getMetadata", getMetadata);
                function getOwnMetadata(e, t, n) {
                    if (!IsObject(t)) throw new TypeError;
                    if (!IsUndefined(n)) n = ToPropertyKey(n);
                    return OrdinaryGetOwnMetadata(e, t, n);
                }
                t("getOwnMetadata", getOwnMetadata);
                function getMetadataKeys(e, t) {
                    if (!IsObject(e)) throw new TypeError;
                    if (!IsUndefined(t)) t = ToPropertyKey(t);
                    return OrdinaryMetadataKeys(e, t);
                }
                t("getMetadataKeys", getMetadataKeys);
                function getOwnMetadataKeys(e, t) {
                    if (!IsObject(e)) throw new TypeError;
                    if (!IsUndefined(t)) t = ToPropertyKey(t);
                    return OrdinaryOwnMetadataKeys(e, t);
                }
                t("getOwnMetadataKeys", getOwnMetadataKeys);
                function deleteMetadata(e, t, n) {
                    if (!IsObject(t)) throw new TypeError;
                    if (!IsUndefined(n)) n = ToPropertyKey(n);
                    var r = GetOrCreateMetadataMap(t, n, false);
                    if (IsUndefined(r)) return false;
                    if (!r.delete(e)) return false;
                    if (r.size > 0) return true;
                    var a = w.get(t);
                    a.delete(n);
                    if (a.size > 0) return true;
                    w.delete(t);
                    return true;
                }
                t("deleteMetadata", deleteMetadata);
                function DecorateConstructor(e, t) {
                    for (var n = e.length - 1; n >= 0; --n) {
                        var r = e[n];
                        var a = r(t);
                        if (!IsUndefined(a) && !IsNull(a)) {
                            if (!IsConstructor(a)) throw new TypeError;
                            t = a;
                        }
                    }
                    return t;
                }
                function DecorateProperty(e, t, n, r) {
                    for (var a = e.length - 1; a >= 0; --a) {
                        var o = e[a];
                        var i = o(t, n, r);
                        if (!IsUndefined(i) && !IsNull(i)) {
                            if (!IsObject(i)) throw new TypeError;
                            r = i;
                        }
                    }
                    return r;
                }
                function GetOrCreateMetadataMap(e, t, n) {
                    var r = w.get(e);
                    if (IsUndefined(r)) {
                        if (!n) return undefined;
                        r = new d;
                        w.set(e, r);
                    }
                    var a = r.get(t);
                    if (IsUndefined(a)) {
                        if (!n) return undefined;
                        a = new d;
                        r.set(t, a);
                    }
                    return a;
                }
                function OrdinaryHasMetadata(e, t, n) {
                    var r = OrdinaryHasOwnMetadata(e, t, n);
                    if (r) return true;
                    var a = OrdinaryGetPrototypeOf(t);
                    if (!IsNull(a)) return OrdinaryHasMetadata(e, a, n);
                    return false;
                }
                function OrdinaryHasOwnMetadata(e, t, n) {
                    var r = GetOrCreateMetadataMap(t, n, false);
                    if (IsUndefined(r)) return false;
                    return ToBoolean(r.has(e));
                }
                function OrdinaryGetMetadata(e, t, n) {
                    var r = OrdinaryHasOwnMetadata(e, t, n);
                    if (r) return OrdinaryGetOwnMetadata(e, t, n);
                    var a = OrdinaryGetPrototypeOf(t);
                    if (!IsNull(a)) return OrdinaryGetMetadata(e, a, n);
                    return undefined;
                }
                function OrdinaryGetOwnMetadata(e, t, n) {
                    var r = GetOrCreateMetadataMap(t, n, false);
                    if (IsUndefined(r)) return undefined;
                    return r.get(e);
                }
                function OrdinaryDefineOwnMetadata(e, t, n, r) {
                    var a = GetOrCreateMetadataMap(n, r, true);
                    a.set(e, t);
                }
                function OrdinaryMetadataKeys(e, t) {
                    var n = OrdinaryOwnMetadataKeys(e, t);
                    var r = OrdinaryGetPrototypeOf(e);
                    if (r === null) return n;
                    var a = OrdinaryMetadataKeys(r, t);
                    if (a.length <= 0) return n;
                    if (n.length <= 0) return a;
                    var o = new p;
                    var i = [];
                    for (var s = 0, l = n; s < l.length; s++) {
                        var u = l[s];
                        var c = o.has(u);
                        if (!c) {
                            o.add(u);
                            i.push(u);
                        }
                    }
                    for (var f = 0, d = a; f < d.length; f++) {
                        var u = d[f];
                        var c = o.has(u);
                        if (!c) {
                            o.add(u);
                            i.push(u);
                        }
                    }
                    return i;
                }
                function OrdinaryOwnMetadataKeys(e, t) {
                    var n = [];
                    var r = GetOrCreateMetadataMap(e, t, false);
                    if (IsUndefined(r)) return n;
                    var a = r.keys();
                    var o = GetIterator(a);
                    var i = 0;
                    while (true) {
                        var s = IteratorStep(o);
                        if (!s) {
                            n.length = i;
                            return n;
                        }
                        var l = IteratorValue(s);
                        try {
                            n[i] = l;
                        } catch (e) {
                            try {
                                IteratorClose(o);
                            } finally {
                                throw e;
                            }
                        }
                        i++;
                    }
                }
                function Type(e) {
                    if (e === null) return 1;
                    switch (typeof e) {
                      case "undefined":
                        return 0;

                      case "boolean":
                        return 2;

                      case "string":
                        return 3;

                      case "symbol":
                        return 4;

                      case "number":
                        return 5;

                      case "object":
                        return e === null ? 1 : 6;

                      default:
                        return 6;
                    }
                }
                function IsUndefined(e) {
                    return e === undefined;
                }
                function IsNull(e) {
                    return e === null;
                }
                function IsSymbol(e) {
                    return typeof e === "symbol";
                }
                function IsObject(e) {
                    return typeof e === "object" ? e !== null : typeof e === "function";
                }
                function ToPrimitive(e, t) {
                    switch (Type(e)) {
                      case 0:
                        return e;

                      case 1:
                        return e;

                      case 2:
                        return e;

                      case 3:
                        return e;

                      case 4:
                        return e;

                      case 5:
                        return e;
                    }
                    var n = t === 3 ? "string" : t === 5 ? "number" : "default";
                    var r = GetMethod(e, a);
                    if (r !== undefined) {
                        var o = r.call(e, n);
                        if (IsObject(o)) throw new TypeError;
                        return o;
                    }
                    return OrdinaryToPrimitive(e, n === "default" ? "number" : n);
                }
                function OrdinaryToPrimitive(e, t) {
                    if (t === "string") {
                        var n = e.toString;
                        if (IsCallable(n)) {
                            var r = n.call(e);
                            if (!IsObject(r)) return r;
                        }
                        var a = e.valueOf;
                        if (IsCallable(a)) {
                            var r = a.call(e);
                            if (!IsObject(r)) return r;
                        }
                    } else {
                        var a = e.valueOf;
                        if (IsCallable(a)) {
                            var r = a.call(e);
                            if (!IsObject(r)) return r;
                        }
                        var o = e.toString;
                        if (IsCallable(o)) {
                            var r = o.call(e);
                            if (!IsObject(r)) return r;
                        }
                    }
                    throw new TypeError;
                }
                function ToBoolean(e) {
                    return !!e;
                }
                function ToString(e) {
                    return "" + e;
                }
                function ToPropertyKey(e) {
                    var t = ToPrimitive(e, 3);
                    if (IsSymbol(t)) return t;
                    return ToString(t);
                }
                function IsArray(e) {
                    return Array.isArray ? Array.isArray(e) : e instanceof Object ? e instanceof Array : Object.prototype.toString.call(e) === "[object Array]";
                }
                function IsCallable(e) {
                    return typeof e === "function";
                }
                function IsConstructor(e) {
                    return typeof e === "function";
                }
                function IsPropertyKey(e) {
                    switch (Type(e)) {
                      case 3:
                        return true;

                      case 4:
                        return true;

                      default:
                        return false;
                    }
                }
                function GetMethod(e, t) {
                    var n = e[t];
                    if (n === undefined || n === null) return undefined;
                    if (!IsCallable(n)) throw new TypeError;
                    return n;
                }
                function GetIterator(e) {
                    var t = GetMethod(e, o);
                    if (!IsCallable(t)) throw new TypeError;
                    var n = t.call(e);
                    if (!IsObject(n)) throw new TypeError;
                    return n;
                }
                function IteratorValue(e) {
                    return e.value;
                }
                function IteratorStep(e) {
                    var t = e.next();
                    return t.done ? false : t;
                }
                function IteratorClose(e) {
                    var t = e["return"];
                    if (t) t.call(e);
                }
                function OrdinaryGetPrototypeOf(e) {
                    var t = Object.getPrototypeOf(e);
                    if (typeof e !== "function" || e === c) return t;
                    if (t !== c) return t;
                    var n = e.prototype;
                    var r = n && Object.getPrototypeOf(n);
                    if (r == null || r === Object.prototype) return t;
                    var a = r.constructor;
                    if (typeof a !== "function") return t;
                    if (a === e) return t;
                    return a;
                }
                function CreateMapPolyfill() {
                    var e = {};
                    var t = [];
                    var n = function() {
                        function MapIterator(e, t, n) {
                            this._index = 0;
                            this._keys = e;
                            this._values = t;
                            this._selector = n;
                        }
                        MapIterator.prototype["@@iterator"] = function() {
                            return this;
                        };
                        MapIterator.prototype[o] = function() {
                            return this;
                        };
                        MapIterator.prototype.next = function() {
                            var e = this._index;
                            if (e >= 0 && e < this._keys.length) {
                                var n = this._selector(this._keys[e], this._values[e]);
                                if (e + 1 >= this._keys.length) {
                                    this._index = -1;
                                    this._keys = t;
                                    this._values = t;
                                } else {
                                    this._index++;
                                }
                                return {
                                    value: n,
                                    done: false
                                };
                            }
                            return {
                                value: undefined,
                                done: true
                            };
                        };
                        MapIterator.prototype.throw = function(e) {
                            if (this._index >= 0) {
                                this._index = -1;
                                this._keys = t;
                                this._values = t;
                            }
                            throw e;
                        };
                        MapIterator.prototype.return = function(e) {
                            if (this._index >= 0) {
                                this._index = -1;
                                this._keys = t;
                                this._values = t;
                            }
                            return {
                                value: e,
                                done: true
                            };
                        };
                        return MapIterator;
                    }();
                    return function() {
                        function Map() {
                            this._keys = [];
                            this._values = [];
                            this._cacheKey = e;
                            this._cacheIndex = -2;
                        }
                        Object.defineProperty(Map.prototype, "size", {
                            get: function() {
                                return this._keys.length;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        Map.prototype.has = function(e) {
                            return this._find(e, false) >= 0;
                        };
                        Map.prototype.get = function(e) {
                            var t = this._find(e, false);
                            return t >= 0 ? this._values[t] : undefined;
                        };
                        Map.prototype.set = function(e, t) {
                            var n = this._find(e, true);
                            this._values[n] = t;
                            return this;
                        };
                        Map.prototype.delete = function(t) {
                            var n = this._find(t, false);
                            if (n >= 0) {
                                var r = this._keys.length;
                                for (var a = n + 1; a < r; a++) {
                                    this._keys[a - 1] = this._keys[a];
                                    this._values[a - 1] = this._values[a];
                                }
                                this._keys.length--;
                                this._values.length--;
                                if (t === this._cacheKey) {
                                    this._cacheKey = e;
                                    this._cacheIndex = -2;
                                }
                                return true;
                            }
                            return false;
                        };
                        Map.prototype.clear = function() {
                            this._keys.length = 0;
                            this._values.length = 0;
                            this._cacheKey = e;
                            this._cacheIndex = -2;
                        };
                        Map.prototype.keys = function() {
                            return new n(this._keys, this._values, getKey);
                        };
                        Map.prototype.values = function() {
                            return new n(this._keys, this._values, getValue);
                        };
                        Map.prototype.entries = function() {
                            return new n(this._keys, this._values, getEntry);
                        };
                        Map.prototype["@@iterator"] = function() {
                            return this.entries();
                        };
                        Map.prototype[o] = function() {
                            return this.entries();
                        };
                        Map.prototype._find = function(e, t) {
                            if (this._cacheKey !== e) {
                                this._cacheIndex = this._keys.indexOf(this._cacheKey = e);
                            }
                            if (this._cacheIndex < 0 && t) {
                                this._cacheIndex = this._keys.length;
                                this._keys.push(e);
                                this._values.push(undefined);
                            }
                            return this._cacheIndex;
                        };
                        return Map;
                    }();
                    function getKey(e, t) {
                        return e;
                    }
                    function getValue(e, t) {
                        return t;
                    }
                    function getEntry(e, t) {
                        return [ e, t ];
                    }
                }
                function CreateSetPolyfill() {
                    return function() {
                        function Set() {
                            this._map = new d;
                        }
                        Object.defineProperty(Set.prototype, "size", {
                            get: function() {
                                return this._map.size;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        Set.prototype.has = function(e) {
                            return this._map.has(e);
                        };
                        Set.prototype.add = function(e) {
                            return this._map.set(e, e), this;
                        };
                        Set.prototype.delete = function(e) {
                            return this._map.delete(e);
                        };
                        Set.prototype.clear = function() {
                            this._map.clear();
                        };
                        Set.prototype.keys = function() {
                            return this._map.keys();
                        };
                        Set.prototype.values = function() {
                            return this._map.values();
                        };
                        Set.prototype.entries = function() {
                            return this._map.entries();
                        };
                        Set.prototype["@@iterator"] = function() {
                            return this.keys();
                        };
                        Set.prototype[o] = function() {
                            return this.keys();
                        };
                        return Set;
                    }();
                }
                function CreateWeakMapPolyfill() {
                    var e = 16;
                    var t = u.create();
                    var r = CreateUniqueKey();
                    return function() {
                        function WeakMap() {
                            this._key = CreateUniqueKey();
                        }
                        WeakMap.prototype.has = function(e) {
                            var t = GetOrCreateWeakMapTable(e, false);
                            return t !== undefined ? u.has(t, this._key) : false;
                        };
                        WeakMap.prototype.get = function(e) {
                            var t = GetOrCreateWeakMapTable(e, false);
                            return t !== undefined ? u.get(t, this._key) : undefined;
                        };
                        WeakMap.prototype.set = function(e, t) {
                            var n = GetOrCreateWeakMapTable(e, true);
                            n[this._key] = t;
                            return this;
                        };
                        WeakMap.prototype.delete = function(e) {
                            var t = GetOrCreateWeakMapTable(e, false);
                            return t !== undefined ? delete t[this._key] : false;
                        };
                        WeakMap.prototype.clear = function() {
                            this._key = CreateUniqueKey();
                        };
                        return WeakMap;
                    }();
                    function CreateUniqueKey() {
                        var e;
                        do {
                            e = "@@WeakMap@@" + CreateUUID();
                        } while (u.has(t, e));
                        t[e] = true;
                        return e;
                    }
                    function GetOrCreateWeakMapTable(e, t) {
                        if (!n.call(e, r)) {
                            if (!t) return undefined;
                            Object.defineProperty(e, r, {
                                value: u.create()
                            });
                        }
                        return e[r];
                    }
                    function FillRandomBytes(e, t) {
                        for (var n = 0; n < t; ++n) e[n] = Math.random() * 255 | 0;
                        return e;
                    }
                    function GenRandomBytes(e) {
                        if (typeof Uint8Array === "function") {
                            if (typeof crypto !== "undefined") return crypto.getRandomValues(new Uint8Array(e));
                            if (typeof msCrypto !== "undefined") return msCrypto.getRandomValues(new Uint8Array(e));
                            return FillRandomBytes(new Uint8Array(e), e);
                        }
                        return FillRandomBytes(new Array(e), e);
                    }
                    function CreateUUID() {
                        var t = GenRandomBytes(e);
                        t[6] = t[6] & 79 | 64;
                        t[8] = t[8] & 191 | 128;
                        var n = "";
                        for (var r = 0; r < e; ++r) {
                            var a = t[r];
                            if (r === 4 || r === 6 || r === 8) n += "-";
                            if (a < 16) n += "0";
                            n += a.toString(16).toLowerCase();
                        }
                        return n;
                    }
                }
                function MakeDictionary(e) {
                    e.__ = undefined;
                    delete e.__;
                    return e;
                }
            }));
        })(n || (n = {}));
    }).call(this, n(13), n(14));
}, function(e, t) {
    var n = e.exports = {};
    var r;
    var a;
    function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
    }
    (function() {
        try {
            if (typeof setTimeout === "function") {
                r = setTimeout;
            } else {
                r = defaultSetTimout;
            }
        } catch (e) {
            r = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === "function") {
                a = clearTimeout;
            } else {
                a = defaultClearTimeout;
            }
        } catch (e) {
            a = defaultClearTimeout;
        }
    })();
    function runTimeout(e) {
        if (r === setTimeout) {
            return setTimeout(e, 0);
        }
        if ((r === defaultSetTimout || !r) && setTimeout) {
            r = setTimeout;
            return setTimeout(e, 0);
        }
        try {
            return r(e, 0);
        } catch (t) {
            try {
                return r.call(null, e, 0);
            } catch (t) {
                return r.call(this, e, 0);
            }
        }
    }
    function runClearTimeout(e) {
        if (a === clearTimeout) {
            return clearTimeout(e);
        }
        if ((a === defaultClearTimeout || !a) && clearTimeout) {
            a = clearTimeout;
            return clearTimeout(e);
        }
        try {
            return a(e);
        } catch (t) {
            try {
                return a.call(null, e);
            } catch (t) {
                return a.call(this, e);
            }
        }
    }
    var o = [];
    var i = false;
    var s;
    var l = -1;
    function cleanUpNextTick() {
        if (!i || !s) {
            return;
        }
        i = false;
        if (s.length) {
            o = s.concat(o);
        } else {
            l = -1;
        }
        if (o.length) {
            drainQueue();
        }
    }
    function drainQueue() {
        if (i) {
            return;
        }
        var e = runTimeout(cleanUpNextTick);
        i = true;
        var t = o.length;
        while (t) {
            s = o;
            o = [];
            while (++l < t) {
                if (s) {
                    s[l].run();
                }
            }
            l = -1;
            t = o.length;
        }
        s = null;
        i = false;
        runClearTimeout(e);
    }
    n.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var n = 1; n < arguments.length; n++) {
                t[n - 1] = arguments[n];
            }
        }
        o.push(new Item(e, t));
        if (o.length === 1 && !i) {
            runTimeout(drainQueue);
        }
    };
    function Item(e, t) {
        this.fun = e;
        this.array = t;
    }
    Item.prototype.run = function() {
        this.fun.apply(null, this.array);
    };
    n.title = "browser";
    n.browser = true;
    n.env = {};
    n.argv = [];
    n.version = "";
    n.versions = {};
    function noop() {}
    n.on = noop;
    n.addListener = noop;
    n.once = noop;
    n.off = noop;
    n.removeListener = noop;
    n.removeAllListeners = noop;
    n.emit = noop;
    n.prependListener = noop;
    n.prependOnceListener = noop;
    n.listeners = function(e) {
        return [];
    };
    n.binding = function(e) {
        throw new Error("process.binding is not supported");
    };
    n.cwd = function() {
        return "/";
    };
    n.chdir = function(e) {
        throw new Error("process.chdir is not supported");
    };
    n.umask = function() {
        return 0;
    };
}, function(e, t) {
    var n;
    n = function() {
        return this;
    }();
    try {
        n = n || new Function("return this")();
    } catch (e) {
        if (typeof window === "object") n = window;
    }
    e.exports = n;
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.PanTools = void 0;
    var r = n(16);
    var a = n(23);
    var o = n(3);
    var i = n(0);
    var s = function() {
        function PanTools() {
            this.plugins = new Array;
            this.plugins = [ o.Container.Require(a.PanCode), o.Container.Require(r.PanFill) ];
            i.Logger.info("container loaded");
        }
        PanTools.prototype.Init = function() {
            this.plugins.every((function(e) {
                if (e.linkTest()) {
                    new Promise((function(e) {
                        e(1);
                    })).then(e.Process);
                    i.Logger.debug("element unique:" + e.unique());
                    return !e.unique();
                }
                return true;
            }));
        };
        return PanTools;
    }();
    t.PanTools = s;
}, function(e, t, n) {
    "use strict";
    var r = this && this.__extends || function() {
        var extendStatics = function(e, t) {
            extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(e, t) {
                e.__proto__ = t;
            } || function(e, t) {
                for (var n in t) if (t.hasOwnProperty(n)) e[n] = t[n];
            };
            return extendStatics(e, t);
        };
        return function(e, t) {
            extendStatics(e, t);
            function __() {
                this.constructor = e;
            }
            e.prototype = t === null ? Object.create(t) : (__.prototype = t.prototype, new __);
        };
    }();
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.PanFill = void 0;
    var a = n(17);
    var o = n(4);
    var i = n(1);
    var s = n(5);
    var l = n(8);
    var u = n(9);
    var c = function(e) {
        r(PanFill, e);
        function PanFill() {
            var t = e !== null && e.apply(this, arguments) || this;
            t.appName = "PanFill";
            t.rules = t.getRules();
            return t;
        }
        PanFill.prototype.getRules = function() {
            var e = new Map;
            s.PanRoutes.forEach((function(t) {
                e.set(t.SiteEnum, t.urlRule);
            }));
            return e;
        };
        PanFill.prototype.loader = function() {};
        PanFill.prototype.run = function() {
            s.PanRoutes.forEach((function(e) {
                if (e.urlRule.test(i.Core.url)) {
                    var t = false;
                    if (e.urlId) {
                        t = a.Url.get(e.urlId);
                    }
                    if (!t) {
                        var n = i.Core.url.match(e.idRule);
                        if (n) {
                            t = n[1];
                        }
                    }
                    if (t) {
                        var r = e.type.toString() + "_" + t;
                        var s = u.Config.get(r, false);
                        if (s) {
                            var l = document.querySelector(e.inputSelector);
                            if (l) {
                                l.value = s.pwd;
                                l.dispatchEvent(new Event("input"));
                                o.Alert.info("\u8bc6\u522b\u5230\u5bc6\u7801\uff01\u5df2\u81ea\u52a8\u5e2e\u60a8\u586b\u5199");
                            }
                        }
                    }
                }
            }));
        };
        return PanFill;
    }(l.AppBase);
    t.PanFill = c;
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.Url = void 0;
    var r = function() {
        function Url() {}
        Url.get = function(e) {
            var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i");
            var n = location.search.substr(1).match(t);
            if (n != null) return n[2];
            return false;
        };
        return Url;
    }();
    t.Url = r;
}, function(e, t, n) {
    (function(t, n) {
        true ? e.exports = n() : undefined;
    })(this, (function() {
        "use strict";
        function _typeof(e) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                _typeof = function(e) {
                    return typeof e;
                };
            } else {
                _typeof = function(e) {
                    return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                };
            }
            return _typeof(e);
        }
        function _classCallCheck(e, t) {
            if (!(e instanceof t)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _defineProperties(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || false;
                r.configurable = true;
                if ("value" in r) r.writable = true;
                Object.defineProperty(e, r.key, r);
            }
        }
        function _createClass(e, t, n) {
            if (t) _defineProperties(e.prototype, t);
            if (n) _defineProperties(e, n);
            return e;
        }
        function _extends() {
            _extends = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) {
                        if (Object.prototype.hasOwnProperty.call(n, r)) {
                            e[r] = n[r];
                        }
                    }
                }
                return e;
            };
            return _extends.apply(this, arguments);
        }
        function _inherits(e, t) {
            if (typeof t !== "function" && t !== null) {
                throw new TypeError("Super expression must either be null or a function");
            }
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: true,
                    configurable: true
                }
            });
            if (t) _setPrototypeOf(e, t);
        }
        function _getPrototypeOf(e) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            };
            return _getPrototypeOf(e);
        }
        function _setPrototypeOf(e, t) {
            _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                e.__proto__ = t;
                return e;
            };
            return _setPrototypeOf(e, t);
        }
        function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
                Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
                return true;
            } catch (e) {
                return false;
            }
        }
        function _construct(e, t, n) {
            if (_isNativeReflectConstruct()) {
                _construct = Reflect.construct;
            } else {
                _construct = function _construct(e, t, n) {
                    var r = [ null ];
                    r.push.apply(r, t);
                    var a = Function.bind.apply(e, r);
                    var o = new a;
                    if (n) _setPrototypeOf(o, n.prototype);
                    return o;
                };
            }
            return _construct.apply(null, arguments);
        }
        function _assertThisInitialized(e) {
            if (e === void 0) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return e;
        }
        function _possibleConstructorReturn(e, t) {
            if (t && (typeof t === "object" || typeof t === "function")) {
                return t;
            }
            return _assertThisInitialized(e);
        }
        function _createSuper(e) {
            var t = _isNativeReflectConstruct();
            return function _createSuperInternal() {
                var n = _getPrototypeOf(e), r;
                if (t) {
                    var a = _getPrototypeOf(this).constructor;
                    r = Reflect.construct(n, arguments, a);
                } else {
                    r = n.apply(this, arguments);
                }
                return _possibleConstructorReturn(this, r);
            };
        }
        function _superPropBase(e, t) {
            while (!Object.prototype.hasOwnProperty.call(e, t)) {
                e = _getPrototypeOf(e);
                if (e === null) break;
            }
            return e;
        }
        function _get(e, t, n) {
            if (typeof Reflect !== "undefined" && Reflect.get) {
                _get = Reflect.get;
            } else {
                _get = function _get(e, t, n) {
                    var r = _superPropBase(e, t);
                    if (!r) return;
                    var a = Object.getOwnPropertyDescriptor(r, t);
                    if (a.get) {
                        return a.get.call(n);
                    }
                    return a.value;
                };
            }
            return _get(e, t, n || e);
        }
        var e = "SweetAlert2:";
        var t = function uniqueArray(e) {
            var t = [];
            for (var n = 0; n < e.length; n++) {
                if (t.indexOf(e[n]) === -1) {
                    t.push(e[n]);
                }
            }
            return t;
        };
        var n = function capitalizeFirstLetter(e) {
            return e.charAt(0).toUpperCase() + e.slice(1);
        };
        var r = function objectValues(e) {
            return Object.keys(e).map((function(t) {
                return e[t];
            }));
        };
        var a = function toArray(e) {
            return Array.prototype.slice.call(e);
        };
        var o = function warn(t) {
            console.warn("".concat(e, " ").concat(_typeof(t) === "object" ? t.join(" ") : t));
        };
        var i = function error(t) {
            console.error("".concat(e, " ").concat(t));
        };
        var s = [];
        var l = function warnOnce(e) {
            if (!(s.indexOf(e) !== -1)) {
                s.push(e);
                o(e);
            }
        };
        var u = function warnAboutDeprecation(e, t) {
            l('"'.concat(e, '" is deprecated and will be removed in the next major release. Please use "').concat(t, '" instead.'));
        };
        var c = function callIfFunction(e) {
            return typeof e === "function" ? e() : e;
        };
        var f = function hasToPromiseFn(e) {
            return e && typeof e.toPromise === "function";
        };
        var d = function asPromise(e) {
            return f(e) ? e.toPromise() : Promise.resolve(e);
        };
        var p = function isPromise(e) {
            return e && Promise.resolve(e) === e;
        };
        var m = Object.freeze({
            cancel: "cancel",
            backdrop: "backdrop",
            close: "close",
            esc: "esc",
            timer: "timer"
        });
        var w = function isJqueryElement(e) {
            return _typeof(e) === "object" && e.jquery;
        };
        var h = function isElement(e) {
            return e instanceof Element || w(e);
        };
        var g = function argsToParams(e) {
            var t = {};
            if (_typeof(e[0]) === "object" && !h(e[0])) {
                _extends(t, e[0]);
            } else {
                [ "title", "html", "icon" ].forEach((function(n, r) {
                    var a = e[r];
                    if (typeof a === "string" || h(a)) {
                        t[n] = a;
                    } else if (a !== undefined) {
                        i("Unexpected type of ".concat(n, '! Expected "string" or "Element", got ').concat(_typeof(a)));
                    }
                }));
            }
            return t;
        };
        var v = "swal2-";
        var y = function prefix(e) {
            var t = {};
            for (var n in e) {
                t[e[n]] = v + e[n];
            }
            return t;
        };
        var b = y([ "container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "no-transition", "toast", "toast-shown", "show", "hide", "close", "title", "header", "content", "html-container", "actions", "confirm", "deny", "cancel", "footer", "icon", "icon-content", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "input-label", "validation-message", "progress-steps", "active-progress-step", "progress-step", "progress-step-line", "loader", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen", "rtl", "timer-progress-bar", "timer-progress-bar-container", "scrollbar-measure", "icon-success", "icon-warning", "icon-info", "icon-question", "icon-error" ]);
        var C = y([ "success", "warning", "info", "question", "error" ]);
        var k = function getContainer() {
            return document.body.querySelector(".".concat(b.container));
        };
        var _ = function elementBySelector(e) {
            var t = k();
            return t ? t.querySelector(e) : null;
        };
        var x = function elementByClass(e) {
            return _(".".concat(e));
        };
        var P = function getPopup() {
            return x(b.popup);
        };
        var O = function getIcon() {
            return x(b.icon);
        };
        var T = function getTitle() {
            return x(b.title);
        };
        var S = function getContent() {
            return x(b.content);
        };
        var M = function getHtmlContainer() {
            return x(b["html-container"]);
        };
        var A = function getImage() {
            return x(b.image);
        };
        var I = function getProgressSteps() {
            return x(b["progress-steps"]);
        };
        var B = function getValidationMessage() {
            return x(b["validation-message"]);
        };
        var E = function getConfirmButton() {
            return _(".".concat(b.actions, " .").concat(b.confirm));
        };
        var j = function getDenyButton() {
            return _(".".concat(b.actions, " .").concat(b.deny));
        };
        var L = function getInputLabel() {
            return x(b["input-label"]);
        };
        var D = function getLoader() {
            return _(".".concat(b.loader));
        };
        var R = function getCancelButton() {
            return _(".".concat(b.actions, " .").concat(b.cancel));
        };
        var q = function getActions() {
            return x(b.actions);
        };
        var V = function getHeader() {
            return x(b.header);
        };
        var z = function getFooter() {
            return x(b.footer);
        };
        var U = function getTimerProgressBar() {
            return x(b["timer-progress-bar"]);
        };
        var H = function getCloseButton() {
            return x(b.close);
        };
        var N = '\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n';
        var F = function getFocusableElements() {
            var e = a(P().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort((function(e, t) {
                e = parseInt(e.getAttribute("tabindex"));
                t = parseInt(t.getAttribute("tabindex"));
                if (e > t) {
                    return 1;
                } else if (e < t) {
                    return -1;
                }
                return 0;
            }));
            var n = a(P().querySelectorAll(N)).filter((function(e) {
                return e.getAttribute("tabindex") !== "-1";
            }));
            return t(e.concat(n)).filter((function(e) {
                return ue(e);
            }));
        };
        var K = function isModal() {
            return !W() && !document.body.classList.contains(b["no-backdrop"]);
        };
        var W = function isToast() {
            return document.body.classList.contains(b["toast-shown"]);
        };
        var G = function isLoading() {
            return P().hasAttribute("data-loading");
        };
        var Y = {
            previousBodyPadding: null
        };
        var $ = function setInnerHtml(e, t) {
            e.textContent = "";
            if (t) {
                var n = new DOMParser;
                var r = n.parseFromString(t, "text/html");
                a(r.querySelector("head").childNodes).forEach((function(t) {
                    e.appendChild(t);
                }));
                a(r.querySelector("body").childNodes).forEach((function(t) {
                    e.appendChild(t);
                }));
            }
        };
        var Z = function hasClass(e, t) {
            if (!t) {
                return false;
            }
            var n = t.split(/\s+/);
            for (var r = 0; r < n.length; r++) {
                if (!e.classList.contains(n[r])) {
                    return false;
                }
            }
            return true;
        };
        var X = function removeCustomClasses(e, t) {
            a(e.classList).forEach((function(n) {
                if (!(r(b).indexOf(n) !== -1) && !(r(C).indexOf(n) !== -1) && !(r(t.showClass).indexOf(n) !== -1)) {
                    e.classList.remove(n);
                }
            }));
        };
        var Q = function applyCustomClass(e, t, n) {
            X(e, t);
            if (t.customClass && t.customClass[n]) {
                if (typeof t.customClass[n] !== "string" && !t.customClass[n].forEach) {
                    return o("Invalid type of customClass.".concat(n, '! Expected string or iterable object, got "').concat(_typeof(t.customClass[n]), '"'));
                }
                te(e, t.customClass[n]);
            }
        };
        function getInput(e, t) {
            if (!t) {
                return null;
            }
            switch (t) {
              case "select":
              case "textarea":
              case "file":
                return re(e, b[t]);

              case "checkbox":
                return e.querySelector(".".concat(b.checkbox, " input"));

              case "radio":
                return e.querySelector(".".concat(b.radio, " input:checked")) || e.querySelector(".".concat(b.radio, " input:first-child"));

              case "range":
                return e.querySelector(".".concat(b.range, " input"));

              default:
                return re(e, b.input);
            }
        }
        var J = function focusInput(e) {
            e.focus();
            if (e.type !== "file") {
                var t = e.value;
                e.value = "";
                e.value = t;
            }
        };
        var ee = function toggleClass(e, t, n) {
            if (!e || !t) {
                return;
            }
            if (typeof t === "string") {
                t = t.split(/\s+/).filter(Boolean);
            }
            t.forEach((function(t) {
                if (e.forEach) {
                    e.forEach((function(e) {
                        n ? e.classList.add(t) : e.classList.remove(t);
                    }));
                } else {
                    n ? e.classList.add(t) : e.classList.remove(t);
                }
            }));
        };
        var te = function addClass(e, t) {
            ee(e, t, true);
        };
        var ne = function removeClass(e, t) {
            ee(e, t, false);
        };
        var re = function getChildByClass(e, t) {
            for (var n = 0; n < e.childNodes.length; n++) {
                if (Z(e.childNodes[n], t)) {
                    return e.childNodes[n];
                }
            }
        };
        var ae = function applyNumericalStyle(e, t, n) {
            if (n === "".concat(parseInt(n))) {
                n = parseInt(n);
            }
            if (n || parseInt(n) === 0) {
                e.style[t] = typeof n === "number" ? "".concat(n, "px") : n;
            } else {
                e.style.removeProperty(t);
            }
        };
        var oe = function show(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "flex";
            e.style.display = t;
        };
        var ie = function hide(e) {
            e.style.display = "none";
        };
        var se = function setStyle(e, t, n, r) {
            var a = e.querySelector(t);
            if (a) {
                a.style[n] = r;
            }
        };
        var le = function toggle(e, t, n) {
            t ? oe(e, n) : ie(e);
        };
        var ue = function isVisible(e) {
            return !!(e && (e.offsetWidth || e.offsetHeight || e.getClientRects().length));
        };
        var ce = function allButtonsAreHidden() {
            return !ue(E()) && !ue(j()) && !ue(R());
        };
        var fe = function isScrollable(e) {
            return !!(e.scrollHeight > e.clientHeight);
        };
        var de = function hasCssAnimation(e) {
            var t = window.getComputedStyle(e);
            var n = parseFloat(t.getPropertyValue("animation-duration") || "0");
            var r = parseFloat(t.getPropertyValue("transition-duration") || "0");
            return n > 0 || r > 0;
        };
        var pe = function contains(e, t) {
            if (typeof e.contains === "function") {
                return e.contains(t);
            }
        };
        var me = function animateTimerProgressBar(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var n = U();
            if (ue(n)) {
                if (t) {
                    n.style.transition = "none";
                    n.style.width = "100%";
                }
                setTimeout((function() {
                    n.style.transition = "width ".concat(e / 1e3, "s linear");
                    n.style.width = "0%";
                }), 10);
            }
        };
        var we = function stopTimerProgressBar() {
            var e = U();
            var t = parseInt(window.getComputedStyle(e).width);
            e.style.removeProperty("transition");
            e.style.width = "100%";
            var n = parseInt(window.getComputedStyle(e).width);
            var r = parseInt(t / n * 100);
            e.style.removeProperty("transition");
            e.style.width = "".concat(r, "%");
        };
        var he = function isNodeEnv() {
            return typeof window === "undefined" || typeof document === "undefined";
        };
        var ge = '\n <div aria-labelledby="'.concat(b.title, '" aria-describedby="').concat(b.content, '" class="').concat(b.popup, '" tabindex="-1">\n   <div class="').concat(b.header, '">\n     <ul class="').concat(b["progress-steps"], '"></ul>\n     <div class="').concat(b.icon, '"></div>\n     <img class="').concat(b.image, '" />\n     <h2 class="').concat(b.title, '" id="').concat(b.title, '"></h2>\n     <button type="button" class="').concat(b.close, '"></button>\n   </div>\n   <div class="').concat(b.content, '">\n     <div id="').concat(b.content, '" class="').concat(b["html-container"], '"></div>\n     <input class="').concat(b.input, '" />\n     <input type="file" class="').concat(b.file, '" />\n     <div class="').concat(b.range, '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="').concat(b.select, '"></select>\n     <div class="').concat(b.radio, '"></div>\n     <label for="').concat(b.checkbox, '" class="').concat(b.checkbox, '">\n       <input type="checkbox" />\n       <span class="').concat(b.label, '"></span>\n     </label>\n     <textarea class="').concat(b.textarea, '"></textarea>\n     <div class="').concat(b["validation-message"], '" id="').concat(b["validation-message"], '"></div>\n   </div>\n   <div class="').concat(b.actions, '">\n     <div class="').concat(b.loader, '"></div>\n     <button type="button" class="').concat(b.confirm, '"></button>\n     <button type="button" class="').concat(b.deny, '"></button>\n     <button type="button" class="').concat(b.cancel, '"></button>\n   </div>\n   <div class="').concat(b.footer, '"></div>\n   <div class="').concat(b["timer-progress-bar-container"], '">\n     <div class="').concat(b["timer-progress-bar"], '"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, "");
        var ve = function resetOldContainer() {
            var e = k();
            if (!e) {
                return false;
            }
            e.parentNode.removeChild(e);
            ne([ document.documentElement, document.body ], [ b["no-backdrop"], b["toast-shown"], b["has-column"] ]);
            return true;
        };
        var ye;
        var be = function resetValidationMessage(e) {
            if (_r.isVisible() && ye !== e.target.value) {
                _r.resetValidationMessage();
            }
            ye = e.target.value;
        };
        var Ce = function addInputChangeListeners() {
            var e = S();
            var t = re(e, b.input);
            var n = re(e, b.file);
            var r = e.querySelector(".".concat(b.range, " input"));
            var a = e.querySelector(".".concat(b.range, " output"));
            var o = re(e, b.select);
            var i = e.querySelector(".".concat(b.checkbox, " input"));
            var s = re(e, b.textarea);
            t.oninput = be;
            n.onchange = be;
            o.onchange = be;
            i.onchange = be;
            s.oninput = be;
            r.oninput = function(e) {
                be(e);
                a.value = r.value;
            };
            r.onchange = function(e) {
                be(e);
                r.nextSibling.value = r.value;
            };
        };
        var ke = function getTarget(e) {
            return typeof e === "string" ? document.querySelector(e) : e;
        };
        var _e = function setupAccessibility(e) {
            var t = P();
            t.setAttribute("role", e.toast ? "alert" : "dialog");
            t.setAttribute("aria-live", e.toast ? "polite" : "assertive");
            if (!e.toast) {
                t.setAttribute("aria-modal", "true");
            }
        };
        var xe = function setupRTL(e) {
            if (window.getComputedStyle(e).direction === "rtl") {
                te(k(), b.rtl);
            }
        };
        var Pe = function init(e) {
            var t = ve();
            if (he()) {
                i("SweetAlert2 requires document to initialize");
                return;
            }
            var n = document.createElement("div");
            n.className = b.container;
            if (t) {
                te(n, b["no-transition"]);
            }
            $(n, ge);
            var r = ke(e.target);
            r.appendChild(n);
            _e(e);
            xe(r);
            Ce();
        };
        var Oe = function parseHtmlToContainer(e, t) {
            if (e instanceof HTMLElement) {
                t.appendChild(e);
            } else if (_typeof(e) === "object") {
                Te(e, t);
            } else if (e) {
                $(t, e);
            }
        };
        var Te = function handleObject(e, t) {
            if (e.jquery) {
                Se(t, e);
            } else {
                $(t, e.toString());
            }
        };
        var Se = function handleJqueryElem(e, t) {
            e.textContent = "";
            if (0 in t) {
                for (var n = 0; n in t; n++) {
                    e.appendChild(t[n].cloneNode(true));
                }
            } else {
                e.appendChild(t.cloneNode(true));
            }
        };
        var Me = function() {
            if (he()) {
                return false;
            }
            var e = document.createElement("div");
            var t = {
                WebkitAnimation: "webkitAnimationEnd",
                OAnimation: "oAnimationEnd oanimationend",
                animation: "animationend"
            };
            for (var n in t) {
                if (Object.prototype.hasOwnProperty.call(t, n) && typeof e.style[n] !== "undefined") {
                    return t[n];
                }
            }
            return false;
        }();
        var Ae = function measureScrollbar() {
            var e = document.createElement("div");
            e.className = b["scrollbar-measure"];
            document.body.appendChild(e);
            var t = e.getBoundingClientRect().width - e.clientWidth;
            document.body.removeChild(e);
            return t;
        };
        var Ie = function renderActions(e, t) {
            var n = q();
            var r = D();
            var a = E();
            var o = j();
            var i = R();
            if (!t.showConfirmButton && !t.showDenyButton && !t.showCancelButton) {
                ie(n);
            }
            Q(n, t, "actions");
            renderButton(a, "confirm", t);
            renderButton(o, "deny", t);
            renderButton(i, "cancel", t);
            handleButtonsStyling(a, o, i, t);
            if (t.reverseButtons) {
                n.insertBefore(i, r);
                n.insertBefore(o, r);
                n.insertBefore(a, r);
            }
            $(r, t.loaderHtml);
            Q(r, t, "loader");
        };
        function handleButtonsStyling(e, t, n, r) {
            if (!r.buttonsStyling) {
                return ne([ e, t, n ], b.styled);
            }
            te([ e, t, n ], b.styled);
            if (r.confirmButtonColor) {
                e.style.backgroundColor = r.confirmButtonColor;
            }
            if (r.denyButtonColor) {
                t.style.backgroundColor = r.denyButtonColor;
            }
            if (r.cancelButtonColor) {
                n.style.backgroundColor = r.cancelButtonColor;
            }
        }
        function renderButton(e, t, r) {
            le(e, r["show".concat(n(t), "Button")], "inline-block");
            $(e, r["".concat(t, "ButtonText")]);
            e.setAttribute("aria-label", r["".concat(t, "ButtonAriaLabel")]);
            e.className = b[t];
            Q(e, r, "".concat(t, "Button"));
            te(e, r["".concat(t, "ButtonClass")]);
        }
        function handleBackdropParam(e, t) {
            if (typeof t === "string") {
                e.style.background = t;
            } else if (!t) {
                te([ document.documentElement, document.body ], b["no-backdrop"]);
            }
        }
        function handlePositionParam(e, t) {
            if (t in b) {
                te(e, b[t]);
            } else {
                o('The "position" parameter is not valid, defaulting to "center"');
                te(e, b.center);
            }
        }
        function handleGrowParam(e, t) {
            if (t && typeof t === "string") {
                var n = "grow-".concat(t);
                if (n in b) {
                    te(e, b[n]);
                }
            }
        }
        var Be = function renderContainer(e, t) {
            var n = k();
            if (!n) {
                return;
            }
            handleBackdropParam(n, t.backdrop);
            if (!t.backdrop && t.allowOutsideClick) {
                o('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
            }
            handlePositionParam(n, t.position);
            handleGrowParam(n, t.grow);
            Q(n, t, "container");
            var r = document.body.getAttribute("data-swal2-queue-step");
            if (r) {
                n.setAttribute("data-queue-step", r);
                document.body.removeAttribute("data-swal2-queue-step");
            }
        };
        var Ee = {
            promise: new WeakMap,
            innerParams: new WeakMap,
            domCache: new WeakMap
        };
        var je = [ "input", "file", "range", "select", "radio", "checkbox", "textarea" ];
        var Le = function renderInput(e, t) {
            var n = S();
            var r = Ee.innerParams.get(e);
            var a = !r || t.input !== r.input;
            je.forEach((function(e) {
                var r = b[e];
                var o = re(n, r);
                qe(e, t.inputAttributes);
                o.className = r;
                if (a) {
                    ie(o);
                }
            }));
            if (t.input) {
                if (a) {
                    De(t);
                }
                Ve(t);
            }
        };
        var De = function showInput(e) {
            if (!Ne[e.input]) {
                return i('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(e.input, '"'));
            }
            var t = He(e.input);
            var n = Ne[e.input](t, e);
            oe(n);
            setTimeout((function() {
                J(n);
            }));
        };
        var Re = function removeAttributes(e) {
            for (var t = 0; t < e.attributes.length; t++) {
                var n = e.attributes[t].name;
                if (!([ "type", "value", "style" ].indexOf(n) !== -1)) {
                    e.removeAttribute(n);
                }
            }
        };
        var qe = function setAttributes(e, t) {
            var n = getInput(S(), e);
            if (!n) {
                return;
            }
            Re(n);
            for (var r in t) {
                if (e === "range" && r === "placeholder") {
                    continue;
                }
                n.setAttribute(r, t[r]);
            }
        };
        var Ve = function setCustomClass(e) {
            var t = He(e.input);
            if (e.customClass) {
                te(t, e.customClass.input);
            }
        };
        var ze = function setInputPlaceholder(e, t) {
            if (!e.placeholder || t.inputPlaceholder) {
                e.placeholder = t.inputPlaceholder;
            }
        };
        var Ue = function setInputLabel(e, t, n) {
            if (n.inputLabel) {
                e.id = b.input;
                var r = document.createElement("label");
                var a = b["input-label"];
                r.setAttribute("for", e.id);
                r.className = a;
                te(r, n.customClass.inputLabel);
                r.innerText = n.inputLabel;
                t.insertAdjacentElement("beforebegin", r);
            }
        };
        var He = function getInputContainer(e) {
            var t = b[e] ? b[e] : b.input;
            return re(S(), t);
        };
        var Ne = {};
        Ne.text = Ne.email = Ne.password = Ne.number = Ne.tel = Ne.url = function(e, t) {
            if (typeof t.inputValue === "string" || typeof t.inputValue === "number") {
                e.value = t.inputValue;
            } else if (!p(t.inputValue)) {
                o('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(_typeof(t.inputValue), '"'));
            }
            Ue(e, e, t);
            ze(e, t);
            e.type = t.input;
            return e;
        };
        Ne.file = function(e, t) {
            Ue(e, e, t);
            ze(e, t);
            return e;
        };
        Ne.range = function(e, t) {
            var n = e.querySelector("input");
            var r = e.querySelector("output");
            n.value = t.inputValue;
            n.type = t.input;
            r.value = t.inputValue;
            Ue(n, e, t);
            return e;
        };
        Ne.select = function(e, t) {
            e.textContent = "";
            if (t.inputPlaceholder) {
                var n = document.createElement("option");
                $(n, t.inputPlaceholder);
                n.value = "";
                n.disabled = true;
                n.selected = true;
                e.appendChild(n);
            }
            Ue(e, e, t);
            return e;
        };
        Ne.radio = function(e) {
            e.textContent = "";
            return e;
        };
        Ne.checkbox = function(e, t) {
            var n = getInput(S(), "checkbox");
            n.value = 1;
            n.id = b.checkbox;
            n.checked = Boolean(t.inputValue);
            var r = e.querySelector("span");
            $(r, t.inputPlaceholder);
            return e;
        };
        Ne.textarea = function(e, t) {
            e.value = t.inputValue;
            ze(e, t);
            Ue(e, e, t);
            var n = function getPadding(e) {
                return parseInt(window.getComputedStyle(e).paddingLeft) + parseInt(window.getComputedStyle(e).paddingRight);
            };
            if ("MutationObserver" in window) {
                var r = parseInt(window.getComputedStyle(P()).width);
                var a = function outputsize() {
                    var t = e.offsetWidth + n(P()) + n(S());
                    if (t > r) {
                        P().style.width = "".concat(t, "px");
                    } else {
                        P().style.width = null;
                    }
                };
                new MutationObserver(a).observe(e, {
                    attributes: true,
                    attributeFilter: [ "style" ]
                });
            }
            return e;
        };
        var Fe = function renderContent(e, t) {
            var n = M();
            Q(n, t, "htmlContainer");
            if (t.html) {
                Oe(t.html, n);
                oe(n, "block");
            } else if (t.text) {
                n.textContent = t.text;
                oe(n, "block");
            } else {
                ie(n);
            }
            Le(e, t);
            Q(S(), t, "content");
        };
        var Ke = function renderFooter(e, t) {
            var n = z();
            le(n, t.footer);
            if (t.footer) {
                Oe(t.footer, n);
            }
            Q(n, t, "footer");
        };
        var We = function renderCloseButton(e, t) {
            var n = H();
            $(n, t.closeButtonHtml);
            Q(n, t, "closeButton");
            le(n, t.showCloseButton);
            n.setAttribute("aria-label", t.closeButtonAriaLabel);
        };
        var Ge = function renderIcon(e, t) {
            var n = Ee.innerParams.get(e);
            var r = O();
            if (n && t.icon === n.icon) {
                Ze(r, t);
                Ye(r, t);
                return;
            }
            if (!t.icon && !t.iconHtml) {
                return ie(r);
            }
            if (t.icon && Object.keys(C).indexOf(t.icon) === -1) {
                i('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(t.icon, '"'));
                return ie(r);
            }
            oe(r);
            Ze(r, t);
            Ye(r, t);
            te(r, t.showClass.icon);
        };
        var Ye = function applyStyles(e, t) {
            for (var n in C) {
                if (t.icon !== n) {
                    ne(e, C[n]);
                }
            }
            te(e, C[t.icon]);
            Xe(e, t);
            $e();
            Q(e, t, "icon");
        };
        var $e = function adjustSuccessIconBackgoundColor() {
            var e = P();
            var t = window.getComputedStyle(e).getPropertyValue("background-color");
            var n = e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");
            for (var r = 0; r < n.length; r++) {
                n[r].style.backgroundColor = t;
            }
        };
        var Ze = function setContent(e, t) {
            e.textContent = "";
            if (t.iconHtml) {
                $(e, Qe(t.iconHtml));
            } else if (t.icon === "success") {
                $(e, '\n      <div class="swal2-success-circular-line-left"></div>\n      <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n      <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n      <div class="swal2-success-circular-line-right"></div>\n    ');
            } else if (t.icon === "error") {
                $(e, '\n      <span class="swal2-x-mark">\n        <span class="swal2-x-mark-line-left"></span>\n        <span class="swal2-x-mark-line-right"></span>\n      </span>\n    ');
            } else {
                var n = {
                    question: "?",
                    warning: "!",
                    info: "i"
                };
                $(e, Qe(n[t.icon]));
            }
        };
        var Xe = function setColor(e, t) {
            if (!t.iconColor) {
                return;
            }
            e.style.color = t.iconColor;
            e.style.borderColor = t.iconColor;
            for (var n = 0, r = [ ".swal2-success-line-tip", ".swal2-success-line-long", ".swal2-x-mark-line-left", ".swal2-x-mark-line-right" ]; n < r.length; n++) {
                var a = r[n];
                se(e, a, "backgroundColor", t.iconColor);
            }
            se(e, ".swal2-success-ring", "borderColor", t.iconColor);
        };
        var Qe = function iconContent(e) {
            return '<div class="'.concat(b["icon-content"], '">').concat(e, "</div>");
        };
        var Je = function renderImage(e, t) {
            var n = A();
            if (!t.imageUrl) {
                return ie(n);
            }
            oe(n, "");
            n.setAttribute("src", t.imageUrl);
            n.setAttribute("alt", t.imageAlt);
            ae(n, "width", t.imageWidth);
            ae(n, "height", t.imageHeight);
            n.className = b.image;
            Q(n, t, "image");
        };
        var et = [];
        var tt = function queue(e) {
            u("Swal.queue()", "async/await");
            var t = this;
            et = e;
            var n = function resetAndResolve(e, t) {
                et = [];
                e(t);
            };
            var r = [];
            return new Promise((function(e) {
                (function step(a, o) {
                    if (a < et.length) {
                        document.body.setAttribute("data-swal2-queue-step", a);
                        t.fire(et[a]).then((function(t) {
                            if (typeof t.value !== "undefined") {
                                r.push(t.value);
                                step(a + 1, o);
                            } else {
                                n(e, {
                                    dismiss: t.dismiss
                                });
                            }
                        }));
                    } else {
                        n(e, {
                            value: r
                        });
                    }
                })(0);
            }));
        };
        var nt = function getQueueStep() {
            return k() && k().getAttribute("data-queue-step");
        };
        var rt = function insertQueueStep(e, t) {
            if (t && t < et.length) {
                return et.splice(t, 0, e);
            }
            return et.push(e);
        };
        var at = function deleteQueueStep(e) {
            if (typeof et[e] !== "undefined") {
                et.splice(e, 1);
            }
        };
        var ot = function createStepElement(e) {
            var t = document.createElement("li");
            te(t, b["progress-step"]);
            $(t, e);
            return t;
        };
        var it = function createLineElement(e) {
            var t = document.createElement("li");
            te(t, b["progress-step-line"]);
            if (e.progressStepsDistance) {
                t.style.width = e.progressStepsDistance;
            }
            return t;
        };
        var st = function renderProgressSteps(e, t) {
            var n = I();
            if (!t.progressSteps || t.progressSteps.length === 0) {
                return ie(n);
            }
            oe(n);
            n.textContent = "";
            var r = parseInt(t.currentProgressStep === undefined ? nt() : t.currentProgressStep);
            if (r >= t.progressSteps.length) {
                o("Invalid currentProgressStep parameter, it should be less than progressSteps.length " + "(currentProgressStep like JS arrays starts from 0)");
            }
            t.progressSteps.forEach((function(e, a) {
                var o = ot(e);
                n.appendChild(o);
                if (a === r) {
                    te(o, b["active-progress-step"]);
                }
                if (a !== t.progressSteps.length - 1) {
                    var i = it(t);
                    n.appendChild(i);
                }
            }));
        };
        var lt = function renderTitle(e, t) {
            var n = T();
            le(n, t.title || t.titleText, "block");
            if (t.title) {
                Oe(t.title, n);
            }
            if (t.titleText) {
                n.innerText = t.titleText;
            }
            Q(n, t, "title");
        };
        var ut = function renderHeader(e, t) {
            var n = V();
            Q(n, t, "header");
            st(e, t);
            Ge(e, t);
            Je(e, t);
            lt(e, t);
            We(e, t);
        };
        var ct = function renderPopup(e, t) {
            var n = k();
            var r = P();
            if (t.toast) {
                ae(n, "width", t.width);
                r.style.width = "100%";
            } else {
                ae(r, "width", t.width);
            }
            ae(r, "padding", t.padding);
            if (t.background) {
                r.style.background = t.background;
            }
            ie(B());
            ft(r, t);
        };
        var ft = function addClasses(e, t) {
            e.className = "".concat(b.popup, " ").concat(ue(e) ? t.showClass.popup : "");
            if (t.toast) {
                te([ document.documentElement, document.body ], b["toast-shown"]);
                te(e, b.toast);
            } else {
                te(e, b.modal);
            }
            Q(e, t, "popup");
            if (typeof t.customClass === "string") {
                te(e, t.customClass);
            }
            if (t.icon) {
                te(e, b["icon-".concat(t.icon)]);
            }
        };
        var dt = function render(e, t) {
            ct(e, t);
            Be(e, t);
            ut(e, t);
            Fe(e, t);
            Ie(e, t);
            Ke(e, t);
            if (typeof t.didRender === "function") {
                t.didRender(P());
            } else if (typeof t.onRender === "function") {
                t.onRender(P());
            }
        };
        var pt = function isVisible$$1() {
            return ue(P());
        };
        var mt = function clickConfirm() {
            return E() && E().click();
        };
        var wt = function clickDeny() {
            return j() && j().click();
        };
        var ht = function clickCancel() {
            return R() && R().click();
        };
        function fire() {
            var e = this;
            for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) {
                n[r] = arguments[r];
            }
            return _construct(e, n);
        }
        function mixin(e) {
            var t = function(t) {
                _inherits(MixinSwal, t);
                var n = _createSuper(MixinSwal);
                function MixinSwal() {
                    _classCallCheck(this, MixinSwal);
                    return n.apply(this, arguments);
                }
                _createClass(MixinSwal, [ {
                    key: "_main",
                    value: function _main(t, n) {
                        return _get(_getPrototypeOf(MixinSwal.prototype), "_main", this).call(this, t, _extends({}, e, n));
                    }
                } ]);
                return MixinSwal;
            }(this);
            return t;
        }
        var gt = function showLoading(e) {
            var t = P();
            if (!t) {
                _r.fire();
            }
            t = P();
            var n = q();
            var r = D();
            if (!e && ue(E())) {
                e = E();
            }
            oe(n);
            if (e) {
                ie(e);
                r.setAttribute("data-button-to-replace", e.className);
            }
            r.parentNode.insertBefore(r, e);
            te([ t, n ], b.loading);
            oe(r);
            t.setAttribute("data-loading", true);
            t.setAttribute("aria-busy", true);
            t.focus();
        };
        var vt = 100;
        var yt = {};
        var bt = function focusPreviousActiveElement() {
            if (yt.previousActiveElement && yt.previousActiveElement.focus) {
                yt.previousActiveElement.focus();
                yt.previousActiveElement = null;
            } else if (document.body) {
                document.body.focus();
            }
        };
        var Ct = function restoreActiveElement(e) {
            return new Promise((function(t) {
                if (!e) {
                    return t();
                }
                var n = window.scrollX;
                var r = window.scrollY;
                yt.restoreFocusTimeout = setTimeout((function() {
                    bt();
                    t();
                }), vt);
                if (typeof n !== "undefined" && typeof r !== "undefined") {
                    window.scrollTo(n, r);
                }
            }));
        };
        var kt = function getTimerLeft() {
            return yt.timeout && yt.timeout.getTimerLeft();
        };
        var _t = function stopTimer() {
            if (yt.timeout) {
                we();
                return yt.timeout.stop();
            }
        };
        var xt = function resumeTimer() {
            if (yt.timeout) {
                var e = yt.timeout.start();
                me(e);
                return e;
            }
        };
        var Pt = function toggleTimer() {
            var e = yt.timeout;
            return e && (e.running ? _t() : xt());
        };
        var Ot = function increaseTimer(e) {
            if (yt.timeout) {
                var t = yt.timeout.increase(e);
                me(t, true);
                return t;
            }
        };
        var Tt = function isTimerRunning() {
            return yt.timeout && yt.timeout.isRunning();
        };
        var St = false;
        var Mt = {};
        function bindClickHandler() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "data-swal-template";
            Mt[e] = this;
            if (!St) {
                document.body.addEventListener("click", At);
                St = true;
            }
        }
        var At = function bodyClickListener(e) {
            for (var t = e.target; t && t !== document; t = t.parentNode) {
                for (var n in Mt) {
                    var r = t.getAttribute(n);
                    if (r) {
                        Mt[n].fire({
                            template: r
                        });
                        return;
                    }
                }
            }
        };
        var It = {
            title: "",
            titleText: "",
            text: "",
            html: "",
            footer: "",
            icon: undefined,
            iconColor: undefined,
            iconHtml: undefined,
            template: undefined,
            toast: false,
            animation: true,
            showClass: {
                popup: "swal2-show",
                backdrop: "swal2-backdrop-show",
                icon: "swal2-icon-show"
            },
            hideClass: {
                popup: "swal2-hide",
                backdrop: "swal2-backdrop-hide",
                icon: "swal2-icon-hide"
            },
            customClass: {},
            target: "body",
            backdrop: true,
            heightAuto: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            stopKeydownPropagation: true,
            keydownListenerCapture: false,
            showConfirmButton: true,
            showDenyButton: false,
            showCancelButton: false,
            preConfirm: undefined,
            preDeny: undefined,
            confirmButtonText: "OK",
            confirmButtonAriaLabel: "",
            confirmButtonColor: undefined,
            denyButtonText: "No",
            denyButtonAriaLabel: "",
            denyButtonColor: undefined,
            cancelButtonText: "Cancel",
            cancelButtonAriaLabel: "",
            cancelButtonColor: undefined,
            buttonsStyling: true,
            reverseButtons: false,
            focusConfirm: true,
            focusDeny: false,
            focusCancel: false,
            returnFocus: true,
            showCloseButton: false,
            closeButtonHtml: "&times;",
            closeButtonAriaLabel: "Close this dialog",
            loaderHtml: "",
            showLoaderOnConfirm: false,
            showLoaderOnDeny: false,
            imageUrl: undefined,
            imageWidth: undefined,
            imageHeight: undefined,
            imageAlt: "",
            timer: undefined,
            timerProgressBar: false,
            width: undefined,
            padding: undefined,
            background: undefined,
            input: undefined,
            inputPlaceholder: "",
            inputLabel: "",
            inputValue: "",
            inputOptions: {},
            inputAutoTrim: true,
            inputAttributes: {},
            inputValidator: undefined,
            returnInputValueOnDeny: false,
            validationMessage: undefined,
            grow: false,
            position: "center",
            progressSteps: [],
            currentProgressStep: undefined,
            progressStepsDistance: undefined,
            onBeforeOpen: undefined,
            onOpen: undefined,
            willOpen: undefined,
            didOpen: undefined,
            onRender: undefined,
            didRender: undefined,
            onClose: undefined,
            onAfterClose: undefined,
            willClose: undefined,
            didClose: undefined,
            onDestroy: undefined,
            didDestroy: undefined,
            scrollbarPadding: true
        };
        var Bt = [ "allowEscapeKey", "allowOutsideClick", "background", "buttonsStyling", "cancelButtonAriaLabel", "cancelButtonColor", "cancelButtonText", "closeButtonAriaLabel", "closeButtonHtml", "confirmButtonAriaLabel", "confirmButtonColor", "confirmButtonText", "currentProgressStep", "customClass", "denyButtonAriaLabel", "denyButtonColor", "denyButtonText", "didClose", "didDestroy", "footer", "hideClass", "html", "icon", "iconColor", "iconHtml", "imageAlt", "imageHeight", "imageUrl", "imageWidth", "onAfterClose", "onClose", "onDestroy", "progressSteps", "returnFocus", "reverseButtons", "showCancelButton", "showCloseButton", "showConfirmButton", "showDenyButton", "text", "title", "titleText", "willClose" ];
        var Et = {
            animation: 'showClass" and "hideClass',
            onBeforeOpen: "willOpen",
            onOpen: "didOpen",
            onRender: "didRender",
            onClose: "willClose",
            onAfterClose: "didClose",
            onDestroy: "didDestroy"
        };
        var jt = [ "allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusDeny", "focusCancel", "returnFocus", "heightAuto", "keydownListenerCapture" ];
        var Lt = function isValidParameter(e) {
            return Object.prototype.hasOwnProperty.call(It, e);
        };
        var Dt = function isUpdatableParameter(e) {
            return Bt.indexOf(e) !== -1;
        };
        var Rt = function isDeprecatedParameter(e) {
            return Et[e];
        };
        var qt = function checkIfParamIsValid(e) {
            if (!Lt(e)) {
                o('Unknown parameter "'.concat(e, '"'));
            }
        };
        var Vt = function checkIfToastParamIsValid(e) {
            if (jt.indexOf(e) !== -1) {
                o('The parameter "'.concat(e, '" is incompatible with toasts'));
            }
        };
        var zt = function checkIfParamIsDeprecated(e) {
            if (Rt(e)) {
                u(e, Rt(e));
            }
        };
        var Ut = function showWarningsForParams(e) {
            for (var t in e) {
                qt(t);
                if (e.toast) {
                    Vt(t);
                }
                zt(t);
            }
        };
        var Ht = Object.freeze({
            isValidParameter: Lt,
            isUpdatableParameter: Dt,
            isDeprecatedParameter: Rt,
            argsToParams: g,
            isVisible: pt,
            clickConfirm: mt,
            clickDeny: wt,
            clickCancel: ht,
            getContainer: k,
            getPopup: P,
            getTitle: T,
            getContent: S,
            getHtmlContainer: M,
            getImage: A,
            getIcon: O,
            getInputLabel: L,
            getCloseButton: H,
            getActions: q,
            getConfirmButton: E,
            getDenyButton: j,
            getCancelButton: R,
            getLoader: D,
            getHeader: V,
            getFooter: z,
            getTimerProgressBar: U,
            getFocusableElements: F,
            getValidationMessage: B,
            isLoading: G,
            fire: fire,
            mixin: mixin,
            queue: tt,
            getQueueStep: nt,
            insertQueueStep: rt,
            deleteQueueStep: at,
            showLoading: gt,
            enableLoading: gt,
            getTimerLeft: kt,
            stopTimer: _t,
            resumeTimer: xt,
            toggleTimer: Pt,
            increaseTimer: Ot,
            isTimerRunning: Tt,
            bindClickHandler: bindClickHandler
        });
        function hideLoading() {
            var e = Ee.innerParams.get(this);
            if (!e) {
                return;
            }
            var t = Ee.domCache.get(this);
            ie(t.loader);
            var n = t.popup.getElementsByClassName(t.loader.getAttribute("data-button-to-replace"));
            if (n.length) {
                oe(n[0], "inline-block");
            } else if (ce()) {
                ie(t.actions);
            }
            ne([ t.popup, t.actions ], b.loading);
            t.popup.removeAttribute("aria-busy");
            t.popup.removeAttribute("data-loading");
            t.confirmButton.disabled = false;
            t.denyButton.disabled = false;
            t.cancelButton.disabled = false;
        }
        function getInput$1(e) {
            var t = Ee.innerParams.get(e || this);
            var n = Ee.domCache.get(e || this);
            if (!n) {
                return null;
            }
            return getInput(n.content, t.input);
        }
        var Nt = function fixScrollbar() {
            if (Y.previousBodyPadding !== null) {
                return;
            }
            if (document.body.scrollHeight > window.innerHeight) {
                Y.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"));
                document.body.style.paddingRight = "".concat(Y.previousBodyPadding + Ae(), "px");
            }
        };
        var Ft = function undoScrollbar() {
            if (Y.previousBodyPadding !== null) {
                document.body.style.paddingRight = "".concat(Y.previousBodyPadding, "px");
                Y.previousBodyPadding = null;
            }
        };
        var Kt = function iOSfix() {
            var e = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
            if (e && !Z(document.body, b.iosfix)) {
                var t = document.body.scrollTop;
                document.body.style.top = "".concat(t * -1, "px");
                te(document.body, b.iosfix);
                Gt();
                Wt();
            }
        };
        var Wt = function addBottomPaddingForTallPopups() {
            var e = !navigator.userAgent.match(/(CriOS|FxiOS|EdgiOS|YaBrowser|UCBrowser)/i);
            if (e) {
                var t = 44;
                if (P().scrollHeight > window.innerHeight - t) {
                    k().style.paddingBottom = "".concat(t, "px");
                }
            }
        };
        var Gt = function lockBodyScroll() {
            var e = k();
            var t;
            e.ontouchstart = function(e) {
                t = Yt(e);
            };
            e.ontouchmove = function(e) {
                if (t) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            };
        };
        var Yt = function shouldPreventTouchMove(e) {
            var t = e.target;
            var n = k();
            if ($t(e) || Zt(e)) {
                return false;
            }
            if (t === n) {
                return true;
            }
            if (!fe(n) && t.tagName !== "INPUT" && !(fe(S()) && S().contains(t))) {
                return true;
            }
            return false;
        };
        var $t = function isStylys(e) {
            return e.touches && e.touches.length && e.touches[0].touchType === "stylus";
        };
        var Zt = function isZoom(e) {
            return e.touches && e.touches.length > 1;
        };
        var Xt = function undoIOSfix() {
            if (Z(document.body, b.iosfix)) {
                var e = parseInt(document.body.style.top, 10);
                ne(document.body, b.iosfix);
                document.body.style.top = "";
                document.body.scrollTop = e * -1;
            }
        };
        var Qt = function isIE11() {
            return !!window.MSInputMethodContext && !!document.documentMode;
        };
        var Jt = function fixVerticalPositionIE() {
            var e = k();
            var t = P();
            e.style.removeProperty("align-items");
            if (t.offsetTop < 0) {
                e.style.alignItems = "flex-start";
            }
        };
        var en = function IEfix() {
            if (typeof window !== "undefined" && Qt()) {
                Jt();
                window.addEventListener("resize", Jt);
            }
        };
        var tn = function undoIEfix() {
            if (typeof window !== "undefined" && Qt()) {
                window.removeEventListener("resize", Jt);
            }
        };
        var nn = function setAriaHidden() {
            var e = a(document.body.children);
            e.forEach((function(e) {
                if (e === k() || pe(e, k())) {
                    return;
                }
                if (e.hasAttribute("aria-hidden")) {
                    e.setAttribute("data-previous-aria-hidden", e.getAttribute("aria-hidden"));
                }
                e.setAttribute("aria-hidden", "true");
            }));
        };
        var rn = function unsetAriaHidden() {
            var e = a(document.body.children);
            e.forEach((function(e) {
                if (e.hasAttribute("data-previous-aria-hidden")) {
                    e.setAttribute("aria-hidden", e.getAttribute("data-previous-aria-hidden"));
                    e.removeAttribute("data-previous-aria-hidden");
                } else {
                    e.removeAttribute("aria-hidden");
                }
            }));
        };
        var an = {
            swalPromiseResolve: new WeakMap
        };
        function removePopupAndResetState(e, t, n, r) {
            if (W()) {
                cn(e, r);
            } else {
                Ct(n).then((function() {
                    return cn(e, r);
                }));
                yt.keydownTarget.removeEventListener("keydown", yt.keydownHandler, {
                    capture: yt.keydownListenerCapture
                });
                yt.keydownHandlerAdded = false;
            }
            if (t.parentNode && !document.body.getAttribute("data-swal2-queue-step")) {
                t.parentNode.removeChild(t);
            }
            if (K()) {
                Ft();
                Xt();
                tn();
                rn();
            }
            removeBodyClasses();
        }
        function removeBodyClasses() {
            ne([ document.documentElement, document.body ], [ b.shown, b["height-auto"], b["no-backdrop"], b["toast-shown"] ]);
        }
        function close(e) {
            var t = P();
            if (!t) {
                return;
            }
            e = on(e);
            var n = Ee.innerParams.get(this);
            if (!n || Z(t, n.hideClass.popup)) {
                return;
            }
            var r = an.swalPromiseResolve.get(this);
            ne(t, n.showClass.popup);
            te(t, n.hideClass.popup);
            var a = k();
            ne(a, n.showClass.backdrop);
            te(a, n.hideClass.backdrop);
            sn(this, t, n);
            r(e);
        }
        var on = function prepareResolveValue(e) {
            if (typeof e === "undefined") {
                return {
                    isConfirmed: false,
                    isDenied: false,
                    isDismissed: true
                };
            }
            return _extends({
                isConfirmed: false,
                isDenied: false,
                isDismissed: false
            }, e);
        };
        var sn = function handlePopupAnimation(e, t, n) {
            var r = k();
            var a = Me && de(t);
            var o = n.onClose, i = n.onAfterClose, s = n.willClose, l = n.didClose;
            ln(t, s, o);
            if (a) {
                un(e, t, r, n.returnFocus, l || i);
            } else {
                removePopupAndResetState(e, r, n.returnFocus, l || i);
            }
        };
        var ln = function runDidClose(e, t, n) {
            if (t !== null && typeof t === "function") {
                t(e);
            } else if (n !== null && typeof n === "function") {
                n(e);
            }
        };
        var un = function animatePopup(e, t, n, r, a) {
            yt.swalCloseEventFinishedCallback = removePopupAndResetState.bind(null, e, n, r, a);
            t.addEventListener(Me, (function(e) {
                if (e.target === t) {
                    yt.swalCloseEventFinishedCallback();
                    delete yt.swalCloseEventFinishedCallback;
                }
            }));
        };
        var cn = function triggerDidCloseAndDispose(e, t) {
            setTimeout((function() {
                if (typeof t === "function") {
                    t();
                }
                e._destroy();
            }));
        };
        function setButtonsDisabled(e, t, n) {
            var r = Ee.domCache.get(e);
            t.forEach((function(e) {
                r[e].disabled = n;
            }));
        }
        function setInputDisabled(e, t) {
            if (!e) {
                return false;
            }
            if (e.type === "radio") {
                var n = e.parentNode.parentNode;
                var r = n.querySelectorAll("input");
                for (var a = 0; a < r.length; a++) {
                    r[a].disabled = t;
                }
            } else {
                e.disabled = t;
            }
        }
        function enableButtons() {
            setButtonsDisabled(this, [ "confirmButton", "denyButton", "cancelButton" ], false);
        }
        function disableButtons() {
            setButtonsDisabled(this, [ "confirmButton", "denyButton", "cancelButton" ], true);
        }
        function enableInput() {
            return setInputDisabled(this.getInput(), false);
        }
        function disableInput() {
            return setInputDisabled(this.getInput(), true);
        }
        function showValidationMessage(e) {
            var t = Ee.domCache.get(this);
            var n = Ee.innerParams.get(this);
            $(t.validationMessage, e);
            t.validationMessage.className = b["validation-message"];
            if (n.customClass && n.customClass.validationMessage) {
                te(t.validationMessage, n.customClass.validationMessage);
            }
            oe(t.validationMessage);
            var r = this.getInput();
            if (r) {
                r.setAttribute("aria-invalid", true);
                r.setAttribute("aria-describedBy", b["validation-message"]);
                J(r);
                te(r, b.inputerror);
            }
        }
        function resetValidationMessage$1() {
            var e = Ee.domCache.get(this);
            if (e.validationMessage) {
                ie(e.validationMessage);
            }
            var t = this.getInput();
            if (t) {
                t.removeAttribute("aria-invalid");
                t.removeAttribute("aria-describedBy");
                ne(t, b.inputerror);
            }
        }
        function getProgressSteps$1() {
            var e = Ee.domCache.get(this);
            return e.progressSteps;
        }
        var fn = function() {
            function Timer(e, t) {
                _classCallCheck(this, Timer);
                this.callback = e;
                this.remaining = t;
                this.running = false;
                this.start();
            }
            _createClass(Timer, [ {
                key: "start",
                value: function start() {
                    if (!this.running) {
                        this.running = true;
                        this.started = new Date;
                        this.id = setTimeout(this.callback, this.remaining);
                    }
                    return this.remaining;
                }
            }, {
                key: "stop",
                value: function stop() {
                    if (this.running) {
                        this.running = false;
                        clearTimeout(this.id);
                        this.remaining -= new Date - this.started;
                    }
                    return this.remaining;
                }
            }, {
                key: "increase",
                value: function increase(e) {
                    var t = this.running;
                    if (t) {
                        this.stop();
                    }
                    this.remaining += e;
                    if (t) {
                        this.start();
                    }
                    return this.remaining;
                }
            }, {
                key: "getTimerLeft",
                value: function getTimerLeft() {
                    if (this.running) {
                        this.stop();
                        this.start();
                    }
                    return this.remaining;
                }
            }, {
                key: "isRunning",
                value: function isRunning() {
                    return this.running;
                }
            } ]);
            return Timer;
        }();
        var dn = {
            email: function email(e, t) {
                return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e) ? Promise.resolve() : Promise.resolve(t || "Invalid email address");
            },
            url: function url(e, t) {
                return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(e) ? Promise.resolve() : Promise.resolve(t || "Invalid URL");
            }
        };
        function setDefaultInputValidators(e) {
            if (!e.inputValidator) {
                Object.keys(dn).forEach((function(t) {
                    if (e.input === t) {
                        e.inputValidator = dn[t];
                    }
                }));
            }
        }
        function validateCustomTargetElement(e) {
            if (!e.target || typeof e.target === "string" && !document.querySelector(e.target) || typeof e.target !== "string" && !e.target.appendChild) {
                o('Target parameter is not valid, defaulting to "body"');
                e.target = "body";
            }
        }
        function setParameters(e) {
            setDefaultInputValidators(e);
            if (e.showLoaderOnConfirm && !e.preConfirm) {
                o("showLoaderOnConfirm is set to true, but preConfirm is not defined.\n" + "showLoaderOnConfirm should be used together with preConfirm, see usage example:\n" + "https://sweetalert2.github.io/#ajax-request");
            }
            e.animation = c(e.animation);
            validateCustomTargetElement(e);
            if (typeof e.title === "string") {
                e.title = e.title.split("\n").join("<br />");
            }
            Pe(e);
        }
        var pn = [ "swal-title", "swal-html", "swal-footer" ];
        var mn = function getTemplateParams(e) {
            var t = typeof e.template === "string" ? document.querySelector(e.template) : e.template;
            if (!t) {
                return {};
            }
            var n = t.content || t;
            Cn(n);
            var r = _extends(wn(n), hn(n), gn(n), vn(n), yn(n), bn(n, pn));
            return r;
        };
        var wn = function getSwalParams(e) {
            var t = {};
            a(e.querySelectorAll("swal-param")).forEach((function(e) {
                kn(e, [ "name", "value" ]);
                var n = e.getAttribute("name");
                var r = e.getAttribute("value");
                if (typeof It[n] === "boolean" && r === "false") {
                    r = false;
                }
                if (_typeof(It[n]) === "object") {
                    r = JSON.parse(r);
                }
                t[n] = r;
            }));
            return t;
        };
        var hn = function getSwalButtons(e) {
            var t = {};
            a(e.querySelectorAll("swal-button")).forEach((function(e) {
                kn(e, [ "type", "color", "aria-label" ]);
                var r = e.getAttribute("type");
                t["".concat(r, "ButtonText")] = e.innerHTML;
                t["show".concat(n(r), "Button")] = true;
                if (e.hasAttribute("color")) {
                    t["".concat(r, "ButtonColor")] = e.getAttribute("color");
                }
                if (e.hasAttribute("aria-label")) {
                    t["".concat(r, "ButtonAriaLabel")] = e.getAttribute("aria-label");
                }
            }));
            return t;
        };
        var gn = function getSwalImage(e) {
            var t = {};
            var n = e.querySelector("swal-image");
            if (n) {
                kn(n, [ "src", "width", "height", "alt" ]);
                if (n.hasAttribute("src")) {
                    t.imageUrl = n.getAttribute("src");
                }
                if (n.hasAttribute("width")) {
                    t.imageWidth = n.getAttribute("width");
                }
                if (n.hasAttribute("height")) {
                    t.imageHeight = n.getAttribute("height");
                }
                if (n.hasAttribute("alt")) {
                    t.imageAlt = n.getAttribute("alt");
                }
            }
            return t;
        };
        var vn = function getSwalIcon(e) {
            var t = {};
            var n = e.querySelector("swal-icon");
            if (n) {
                kn(n, [ "type", "color" ]);
                if (n.hasAttribute("type")) {
                    t.icon = n.getAttribute("type");
                }
                if (n.hasAttribute("color")) {
                    t.iconColor = n.getAttribute("color");
                }
                t.iconHtml = n.innerHTML;
            }
            return t;
        };
        var yn = function getSwalInput(e) {
            var t = {};
            var n = e.querySelector("swal-input");
            if (n) {
                kn(n, [ "type", "label", "placeholder", "value" ]);
                t.input = n.getAttribute("type") || "text";
                if (n.hasAttribute("label")) {
                    t.inputLabel = n.getAttribute("label");
                }
                if (n.hasAttribute("placeholder")) {
                    t.inputPlaceholder = n.getAttribute("placeholder");
                }
                if (n.hasAttribute("value")) {
                    t.inputValue = n.getAttribute("value");
                }
            }
            var r = e.querySelectorAll("swal-input-option");
            if (r.length) {
                t.inputOptions = {};
                a(r).forEach((function(e) {
                    kn(e, [ "value" ]);
                    var n = e.getAttribute("value");
                    var r = e.innerHTML;
                    t.inputOptions[n] = r;
                }));
            }
            return t;
        };
        var bn = function getSwalStringParams(e, t) {
            var n = {};
            for (var r in t) {
                var a = t[r];
                var o = e.querySelector(a);
                if (o) {
                    kn(o, []);
                    n[a.replace(/^swal-/, "")] = o.innerHTML.trim();
                }
            }
            return n;
        };
        var Cn = function showWarningsForElements(e) {
            var t = pn.concat([ "swal-param", "swal-button", "swal-image", "swal-icon", "swal-input", "swal-input-option" ]);
            a(e.querySelectorAll("*")).forEach((function(n) {
                if (n.parentNode !== e) {
                    return;
                }
                var r = n.tagName.toLowerCase();
                if (t.indexOf(r) === -1) {
                    o("Unrecognized element <".concat(r, ">"));
                }
            }));
        };
        var kn = function showWarningsForAttributes(e, t) {
            a(e.attributes).forEach((function(n) {
                if (t.indexOf(n.name) === -1) {
                    o([ 'Unrecognized attribute "'.concat(n.name, '" on <').concat(e.tagName.toLowerCase(), ">."), "".concat(t.length ? "Allowed attributes are: ".concat(t.join(", ")) : "To set the value, use HTML within the element.") ]);
                }
            }));
        };
        var _n = 10;
        var xn = function openPopup(e) {
            var t = k();
            var n = P();
            if (typeof e.willOpen === "function") {
                e.willOpen(n);
            } else if (typeof e.onBeforeOpen === "function") {
                e.onBeforeOpen(n);
            }
            var r = window.getComputedStyle(document.body);
            var a = r.overflowY;
            Mn(t, n, e);
            setTimeout((function() {
                Tn(t, n);
            }), _n);
            if (K()) {
                Sn(t, e.scrollbarPadding, a);
                nn();
            }
            if (!W() && !yt.previousActiveElement) {
                yt.previousActiveElement = document.activeElement;
            }
            Pn(n, e);
            ne(t, b["no-transition"]);
        };
        var Pn = function runDidOpen(e, t) {
            if (typeof t.didOpen === "function") {
                setTimeout((function() {
                    return t.didOpen(e);
                }));
            } else if (typeof t.onOpen === "function") {
                setTimeout((function() {
                    return t.onOpen(e);
                }));
            }
        };
        var On = function swalOpenAnimationFinished(e) {
            var t = P();
            if (e.target !== t) {
                return;
            }
            var n = k();
            t.removeEventListener(Me, swalOpenAnimationFinished);
            n.style.overflowY = "auto";
        };
        var Tn = function setScrollingVisibility(e, t) {
            if (Me && de(t)) {
                e.style.overflowY = "hidden";
                t.addEventListener(Me, On);
            } else {
                e.style.overflowY = "auto";
            }
        };
        var Sn = function fixScrollContainer(e, t, n) {
            Kt();
            en();
            if (t && n !== "hidden") {
                Nt();
            }
            setTimeout((function() {
                e.scrollTop = 0;
            }));
        };
        var Mn = function addClasses(e, t, n) {
            te(e, n.showClass.backdrop);
            t.style.setProperty("opacity", "0", "important");
            oe(t);
            setTimeout((function() {
                te(t, n.showClass.popup);
                t.style.removeProperty("opacity");
            }), _n);
            te([ document.documentElement, document.body ], b.shown);
            if (n.heightAuto && n.backdrop && !n.toast) {
                te([ document.documentElement, document.body ], b["height-auto"]);
            }
        };
        var An = function handleInputOptionsAndValue(e, t) {
            if (t.input === "select" || t.input === "radio") {
                Ln(e, t);
            } else if ([ "text", "email", "number", "tel", "textarea" ].indexOf(t.input) !== -1 && (f(t.inputValue) || p(t.inputValue))) {
                Dn(e, t);
            }
        };
        var In = function getInputValue(e, t) {
            var n = e.getInput();
            if (!n) {
                return null;
            }
            switch (t.input) {
              case "checkbox":
                return Bn(n);

              case "radio":
                return En(n);

              case "file":
                return jn(n);

              default:
                return t.inputAutoTrim ? n.value.trim() : n.value;
            }
        };
        var Bn = function getCheckboxValue(e) {
            return e.checked ? 1 : 0;
        };
        var En = function getRadioValue(e) {
            return e.checked ? e.value : null;
        };
        var jn = function getFileValue(e) {
            return e.files.length ? e.getAttribute("multiple") !== null ? e.files : e.files[0] : null;
        };
        var Ln = function handleInputOptions(e, t) {
            var n = S();
            var r = function processInputOptions(e) {
                return Rn[t.input](n, qn(e), t);
            };
            if (f(t.inputOptions) || p(t.inputOptions)) {
                gt(E());
                d(t.inputOptions).then((function(t) {
                    e.hideLoading();
                    r(t);
                }));
            } else if (_typeof(t.inputOptions) === "object") {
                r(t.inputOptions);
            } else {
                i("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(_typeof(t.inputOptions)));
            }
        };
        var Dn = function handleInputValue(e, t) {
            var n = e.getInput();
            ie(n);
            d(t.inputValue).then((function(r) {
                n.value = t.input === "number" ? parseFloat(r) || 0 : "".concat(r);
                oe(n);
                n.focus();
                e.hideLoading();
            }))["catch"]((function(t) {
                i("Error in inputValue promise: ".concat(t));
                n.value = "";
                oe(n);
                n.focus();
                e.hideLoading();
            }));
        };
        var Rn = {
            select: function select(e, t, n) {
                var select = re(e, b.select);
                var r = function renderOption(e, t, r) {
                    var a = document.createElement("option");
                    a.value = r;
                    $(a, t);
                    a.selected = Vn(r, n.inputValue);
                    e.appendChild(a);
                };
                t.forEach((function(e) {
                    var t = e[0];
                    var n = e[1];
                    if (Array.isArray(n)) {
                        var a = document.createElement("optgroup");
                        a.label = t;
                        a.disabled = false;
                        select.appendChild(a);
                        n.forEach((function(e) {
                            return r(a, e[1], e[0]);
                        }));
                    } else {
                        r(select, n, t);
                    }
                }));
                select.focus();
            },
            radio: function radio(e, t, n) {
                var radio = re(e, b.radio);
                t.forEach((function(e) {
                    var t = e[0];
                    var r = e[1];
                    var a = document.createElement("input");
                    var o = document.createElement("label");
                    a.type = "radio";
                    a.name = b.radio;
                    a.value = t;
                    if (Vn(t, n.inputValue)) {
                        a.checked = true;
                    }
                    var i = document.createElement("span");
                    $(i, r);
                    i.className = b.label;
                    o.appendChild(a);
                    o.appendChild(i);
                    radio.appendChild(o);
                }));
                var r = radio.querySelectorAll("input");
                if (r.length) {
                    r[0].focus();
                }
            }
        };
        var qn = function formatInputOptions(e) {
            var t = [];
            if (typeof Map !== "undefined" && e instanceof Map) {
                e.forEach((function(e, n) {
                    var r = e;
                    if (_typeof(r) === "object") {
                        r = formatInputOptions(r);
                    }
                    t.push([ n, r ]);
                }));
            } else {
                Object.keys(e).forEach((function(n) {
                    var r = e[n];
                    if (_typeof(r) === "object") {
                        r = formatInputOptions(r);
                    }
                    t.push([ n, r ]);
                }));
            }
            return t;
        };
        var Vn = function isSelected(e, t) {
            return t && t.toString() === e.toString();
        };
        var zn = function handleConfirmButtonClick(e, t) {
            e.disableButtons();
            if (t.input) {
                Nn(e, t, "confirm");
            } else {
                Gn(e, t, true);
            }
        };
        var Un = function handleDenyButtonClick(e, t) {
            e.disableButtons();
            if (t.returnInputValueOnDeny) {
                Nn(e, t, "deny");
            } else {
                Kn(e, t, false);
            }
        };
        var Hn = function handleCancelButtonClick(e, t) {
            e.disableButtons();
            t(m.cancel);
        };
        var Nn = function handleConfirmOrDenyWithInput(e, t, n) {
            var r = In(e, t);
            if (t.inputValidator) {
                Fn(e, t, r);
            } else if (!e.getInput().checkValidity()) {
                e.enableButtons();
                e.showValidationMessage(t.validationMessage);
            } else if (n === "deny") {
                Kn(e, t, r);
            } else {
                Gn(e, t, r);
            }
        };
        var Fn = function handleInputValidator(e, t, n) {
            e.disableInput();
            var r = Promise.resolve().then((function() {
                return d(t.inputValidator(n, t.validationMessage));
            }));
            r.then((function(r) {
                e.enableButtons();
                e.enableInput();
                if (r) {
                    e.showValidationMessage(r);
                } else {
                    Gn(e, t, n);
                }
            }));
        };
        var Kn = function deny(e, t, n) {
            if (t.showLoaderOnDeny) {
                gt(j());
            }
            if (t.preDeny) {
                var r = Promise.resolve().then((function() {
                    return d(t.preDeny(n, t.validationMessage));
                }));
                r.then((function(t) {
                    if (t === false) {
                        e.hideLoading();
                    } else {
                        e.closePopup({
                            isDenied: true,
                            value: typeof t === "undefined" ? n : t
                        });
                    }
                }));
            } else {
                e.closePopup({
                    isDenied: true,
                    value: n
                });
            }
        };
        var Wn = function succeedWith(e, t) {
            e.closePopup({
                isConfirmed: true,
                value: t
            });
        };
        var Gn = function confirm(e, t, n) {
            if (t.showLoaderOnConfirm) {
                gt();
            }
            if (t.preConfirm) {
                e.resetValidationMessage();
                var r = Promise.resolve().then((function() {
                    return d(t.preConfirm(n, t.validationMessage));
                }));
                r.then((function(t) {
                    if (ue(B()) || t === false) {
                        e.hideLoading();
                    } else {
                        Wn(e, typeof t === "undefined" ? n : t);
                    }
                }));
            } else {
                Wn(e, n);
            }
        };
        var Yn = function addKeydownHandler(e, t, n, r) {
            if (t.keydownTarget && t.keydownHandlerAdded) {
                t.keydownTarget.removeEventListener("keydown", t.keydownHandler, {
                    capture: t.keydownListenerCapture
                });
                t.keydownHandlerAdded = false;
            }
            if (!n.toast) {
                t.keydownHandler = function(t) {
                    return Jn(e, t, r);
                };
                t.keydownTarget = n.keydownListenerCapture ? window : P();
                t.keydownListenerCapture = n.keydownListenerCapture;
                t.keydownTarget.addEventListener("keydown", t.keydownHandler, {
                    capture: t.keydownListenerCapture
                });
                t.keydownHandlerAdded = true;
            }
        };
        var $n = function setFocus(e, t, n) {
            var r = F();
            if (r.length) {
                t = t + n;
                if (t === r.length) {
                    t = 0;
                } else if (t === -1) {
                    t = r.length - 1;
                }
                return r[t].focus();
            }
            P().focus();
        };
        var Zn = [ "ArrowRight", "ArrowDown", "Right", "Down" ];
        var Xn = [ "ArrowLeft", "ArrowUp", "Left", "Up" ];
        var Qn = [ "Escape", "Esc" ];
        var Jn = function keydownHandler(e, t, n) {
            var r = Ee.innerParams.get(e);
            if (!r) {
                return;
            }
            if (r.stopKeydownPropagation) {
                t.stopPropagation();
            }
            if (t.key === "Enter") {
                er(e, t, r);
            } else if (t.key === "Tab") {
                tr(t, r);
            } else if ([].concat(Zn, Xn).indexOf(t.key) !== -1) {
                nr(t.key);
            } else if (Qn.indexOf(t.key) !== -1) {
                rr(t, r, n);
            }
        };
        var er = function handleEnter(e, t, n) {
            if (t.isComposing) {
                return;
            }
            if (t.target && e.getInput() && t.target.outerHTML === e.getInput().outerHTML) {
                if ([ "textarea", "file" ].indexOf(n.input) !== -1) {
                    return;
                }
                mt();
                t.preventDefault();
            }
        };
        var tr = function handleTab(e, t) {
            var n = e.target;
            var r = F();
            var a = -1;
            for (var o = 0; o < r.length; o++) {
                if (n === r[o]) {
                    a = o;
                    break;
                }
            }
            if (!e.shiftKey) {
                $n(t, a, 1);
            } else {
                $n(t, a, -1);
            }
            e.stopPropagation();
            e.preventDefault();
        };
        var nr = function handleArrows(e) {
            var t = E();
            var n = j();
            var r = R();
            if (!([ t, n, r ].indexOf(document.activeElement) !== -1)) {
                return;
            }
            var a = Zn.indexOf(e) !== -1 ? "nextElementSibling" : "previousElementSibling";
            var o = document.activeElement[a];
            if (o) {
                o.focus();
            }
        };
        var rr = function handleEsc(e, t, n) {
            if (c(t.allowEscapeKey)) {
                e.preventDefault();
                n(m.esc);
            }
        };
        var ar = function handlePopupClick(e, t, n) {
            var r = Ee.innerParams.get(e);
            if (r.toast) {
                or(e, t, n);
            } else {
                sr(t);
                lr(t);
                ur(e, t, n);
            }
        };
        var or = function handleToastClick(e, t, n) {
            t.popup.onclick = function() {
                var t = Ee.innerParams.get(e);
                if (t.showConfirmButton || t.showDenyButton || t.showCancelButton || t.showCloseButton || t.timer || t.input) {
                    return;
                }
                n(m.close);
            };
        };
        var ir = false;
        var sr = function handleModalMousedown(e) {
            e.popup.onmousedown = function() {
                e.container.onmouseup = function(t) {
                    e.container.onmouseup = undefined;
                    if (t.target === e.container) {
                        ir = true;
                    }
                };
            };
        };
        var lr = function handleContainerMousedown(e) {
            e.container.onmousedown = function() {
                e.popup.onmouseup = function(t) {
                    e.popup.onmouseup = undefined;
                    if (t.target === e.popup || e.popup.contains(t.target)) {
                        ir = true;
                    }
                };
            };
        };
        var ur = function handleModalClick(e, t, n) {
            t.container.onclick = function(r) {
                var a = Ee.innerParams.get(e);
                if (ir) {
                    ir = false;
                    return;
                }
                if (r.target === t.container && c(a.allowOutsideClick)) {
                    n(m.backdrop);
                }
            };
        };
        function _main(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            Ut(_extends({}, t, e));
            if (yt.currentInstance) {
                yt.currentInstance._destroy();
            }
            yt.currentInstance = this;
            var n = cr(e, t);
            setParameters(n);
            Object.freeze(n);
            if (yt.timeout) {
                yt.timeout.stop();
                delete yt.timeout;
            }
            clearTimeout(yt.restoreFocusTimeout);
            var r = dr(this);
            dt(this, n);
            Ee.innerParams.set(this, n);
            return fr(this, r, n);
        }
        var cr = function prepareParams(e, t) {
            var n = mn(e);
            var r = _extends({}, It, t, n, e);
            r.showClass = _extends({}, It.showClass, r.showClass);
            r.hideClass = _extends({}, It.hideClass, r.hideClass);
            if (e.animation === false) {
                r.showClass = {
                    popup: "swal2-noanimation",
                    backdrop: "swal2-noanimation"
                };
                r.hideClass = {};
            }
            return r;
        };
        var fr = function swalPromise(e, t, n) {
            return new Promise((function(r) {
                var a = function dismissWith(t) {
                    e.closePopup({
                        isDismissed: true,
                        dismiss: t
                    });
                };
                an.swalPromiseResolve.set(e, r);
                t.confirmButton.onclick = function() {
                    return zn(e, n);
                };
                t.denyButton.onclick = function() {
                    return Un(e, n);
                };
                t.cancelButton.onclick = function() {
                    return Hn(e, a);
                };
                t.closeButton.onclick = function() {
                    return a(m.close);
                };
                ar(e, t, a);
                Yn(e, yt, n, a);
                An(e, n);
                xn(n);
                pr(yt, n, a);
                mr(t, n);
                setTimeout((function() {
                    t.container.scrollTop = 0;
                }));
            }));
        };
        var dr = function populateDomCache(e) {
            var t = {
                popup: P(),
                container: k(),
                content: S(),
                actions: q(),
                confirmButton: E(),
                denyButton: j(),
                cancelButton: R(),
                loader: D(),
                closeButton: H(),
                validationMessage: B(),
                progressSteps: I()
            };
            Ee.domCache.set(e, t);
            return t;
        };
        var pr = function setupTimer(e, t, n) {
            var r = U();
            ie(r);
            if (t.timer) {
                e.timeout = new fn((function() {
                    n("timer");
                    delete e.timeout;
                }), t.timer);
                if (t.timerProgressBar) {
                    oe(r);
                    setTimeout((function() {
                        if (e.timeout && e.timeout.running) {
                            me(t.timer);
                        }
                    }));
                }
            }
        };
        var mr = function initFocus(e, t) {
            if (t.toast) {
                return;
            }
            if (!c(t.allowEnterKey)) {
                return hr();
            }
            if (!wr(e, t)) {
                $n(t, -1, 1);
            }
        };
        var wr = function focusButton(e, t) {
            if (t.focusDeny && ue(e.denyButton)) {
                e.denyButton.focus();
                return true;
            }
            if (t.focusCancel && ue(e.cancelButton)) {
                e.cancelButton.focus();
                return true;
            }
            if (t.focusConfirm && ue(e.confirmButton)) {
                e.confirmButton.focus();
                return true;
            }
            return false;
        };
        var hr = function blurActiveElement() {
            if (document.activeElement && typeof document.activeElement.blur === "function") {
                document.activeElement.blur();
            }
        };
        function update(e) {
            var t = P();
            var n = Ee.innerParams.get(this);
            if (!t || Z(t, n.hideClass.popup)) {
                return o("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
            }
            var r = {};
            Object.keys(e).forEach((function(t) {
                if (_r.isUpdatableParameter(t)) {
                    r[t] = e[t];
                } else {
                    o('Invalid parameter to update: "'.concat(t, '". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js\n\nIf you think this parameter should be updatable, request it here: https://github.com/sweetalert2/sweetalert2/issues/new?template=02_feature_request.md'));
                }
            }));
            var a = _extends({}, n, r);
            dt(this, a);
            Ee.innerParams.set(this, a);
            Object.defineProperties(this, {
                params: {
                    value: _extends({}, this.params, e),
                    writable: false,
                    enumerable: true
                }
            });
        }
        function _destroy() {
            var e = Ee.domCache.get(this);
            var t = Ee.innerParams.get(this);
            if (!t) {
                return;
            }
            if (e.popup && yt.swalCloseEventFinishedCallback) {
                yt.swalCloseEventFinishedCallback();
                delete yt.swalCloseEventFinishedCallback;
            }
            if (yt.deferDisposalTimer) {
                clearTimeout(yt.deferDisposalTimer);
                delete yt.deferDisposalTimer;
            }
            gr(t);
            vr(this);
        }
        var gr = function runDidDestroy(e) {
            if (typeof e.didDestroy === "function") {
                e.didDestroy();
            } else if (typeof e.onDestroy === "function") {
                e.onDestroy();
            }
        };
        var vr = function disposeSwal(e) {
            delete e.params;
            delete yt.keydownHandler;
            delete yt.keydownTarget;
            yr(Ee);
            yr(an);
        };
        var yr = function unsetWeakMaps(e) {
            for (var t in e) {
                e[t] = new WeakMap;
            }
        };
        var br = Object.freeze({
            hideLoading: hideLoading,
            disableLoading: hideLoading,
            getInput: getInput$1,
            close: close,
            closePopup: close,
            closeModal: close,
            closeToast: close,
            enableButtons: enableButtons,
            disableButtons: disableButtons,
            enableInput: enableInput,
            disableInput: disableInput,
            showValidationMessage: showValidationMessage,
            resetValidationMessage: resetValidationMessage$1,
            getProgressSteps: getProgressSteps$1,
            _main: _main,
            update: update,
            _destroy: _destroy
        });
        var Cr;
        var kr = function() {
            function SweetAlert() {
                _classCallCheck(this, SweetAlert);
                if (typeof window === "undefined") {
                    return;
                }
                if (typeof Promise === "undefined") {
                    i("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)");
                }
                Cr = this;
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
                    t[n] = arguments[n];
                }
                var r = Object.freeze(this.constructor.argsToParams(t));
                Object.defineProperties(this, {
                    params: {
                        value: r,
                        writable: false,
                        enumerable: true,
                        configurable: true
                    }
                });
                var a = this._main(this.params);
                Ee.promise.set(this, a);
            }
            _createClass(SweetAlert, [ {
                key: "then",
                value: function then(e) {
                    var t = Ee.promise.get(this);
                    return t.then(e);
                }
            }, {
                key: "finally",
                value: function _finally(e) {
                    var t = Ee.promise.get(this);
                    return t["finally"](e);
                }
            } ]);
            return SweetAlert;
        }();
        _extends(kr.prototype, br);
        _extends(kr, Ht);
        Object.keys(br).forEach((function(e) {
            kr[e] = function() {
                if (Cr) {
                    var t;
                    return (t = Cr)[e].apply(t, arguments);
                }
            };
        }));
        kr.DismissReason = m;
        kr.version = "10.16.9";
        var _r = kr;
        _r["default"] = _r;
        return _r;
    }));
    if (typeof this !== "undefined" && this.Sweetalert2) {
        this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2;
    }
    "undefined" != typeof document && function(e, t) {
        var n = e.createElement("style");
        if (e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet) n.styleSheet.disabled || (n.styleSheet.cssText = t); else try {
            n.innerHTML = t;
        } catch (e) {
            n.innerText = t;
        }
    }(document, '.swal2-popup.swal2-toast{flex-direction:column;align-items:stretch;width:auto;padding:1.25em;overflow-y:hidden;background:#fff;box-shadow:0 0 .625em #d9d9d9}.swal2-popup.swal2-toast .swal2-header{flex-direction:row;padding:0}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:static;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;margin:0 .625em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container{padding:.625em 0 0}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{font-size:.25em}}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{flex:1;flex-basis:auto!important;align-self:stretch;width:auto;height:2.2em;height:auto;margin:0 .3125em;margin-top:.3125em;padding:0}.swal2-popup.swal2-toast .swal2-styled{margin:.125em .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(100,150,200,.5)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:flex;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-bottom-end>:first-child,.swal2-container.swal2-bottom-left>:first-child,.swal2-container.swal2-bottom-right>:first-child,.swal2-container.swal2-bottom-start>:first-child,.swal2-container.swal2-bottom>:first-child{margin-top:auto}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-no-transition{transition:none!important}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-popup{display:none;position:relative;box-sizing:border-box;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border:none;border-radius:5px;background:#fff;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-header{display:flex;flex-direction:column;align-items:center;padding:0 1.8em}.swal2-title{position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:100%;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;box-shadow:none;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#2778c4;color:#fff;font-size:1em}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#d14529;color:#fff;font-size:1em}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#757575;color:#fff;font-size:1em}.swal2-styled:focus{outline:0;box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;height:.25em;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:1.25em auto}.swal2-close{position:absolute;z-index:2;top:0;right:0;align-items:center;justify-content:center;width:1.2em;height:1.2em;padding:0;overflow:hidden;transition:color .1s ease-out;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-content{z-index:1;justify-content:center;margin:0;padding:0 1.6em;color:#545454;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em auto}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em auto;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-input[type=number]{max-width:10em}.swal2-file{background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto}.swal2-validation-message{align-items:center;justify-content:center;margin:0 -2.7em;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;border:.25em solid transparent;border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:0 0 1.25em;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{top:auto;right:auto;bottom:auto;left:auto;max-width:calc(100% - .625em * 2);background-color:transparent!important}body.swal2-no-backdrop .swal2-container>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-container.swal2-top{top:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-container.swal2-top-left,body.swal2-no-backdrop .swal2-container.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-container.swal2-top-end,body.swal2-no-backdrop .swal2-container.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-container.swal2-center{top:50%;left:50%;transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-container.swal2-center-left,body.swal2-no-backdrop .swal2-container.swal2-center-start{top:50%;left:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-container.swal2-center-end,body.swal2-no-backdrop .swal2-container.swal2-center-right{top:50%;right:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-container.swal2-bottom{bottom:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-container.swal2-bottom-left,body.swal2-no-backdrop .swal2-container.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-container.swal2-bottom-end,body.swal2-no-backdrop .swal2-container.swal2-bottom-right{right:0;bottom:0}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}');
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(10);
    var a = n.n(r);
    var o = n(2);
    var i = n.n(o);
    var s = {};
    s.insert = "head";
    s.singleton = false;
    var l = a()(i.a, s);
    t["default"] = i.a.locals || {};
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        var t = [];
        t.toString = function toString() {
            return this.map((function(t) {
                var n = cssWithMappingToString(t, e);
                if (t[2]) {
                    return "@media ".concat(t[2], " {").concat(n, "}");
                }
                return n;
            })).join("");
        };
        t.i = function(e, n, r) {
            if (typeof e === "string") {
                e = [ [ null, e, "" ] ];
            }
            var a = {};
            if (r) {
                for (var o = 0; o < this.length; o++) {
                    var i = this[o][0];
                    if (i != null) {
                        a[i] = true;
                    }
                }
            }
            for (var s = 0; s < e.length; s++) {
                var l = [].concat(e[s]);
                if (r && a[l[0]]) {
                    continue;
                }
                if (n) {
                    if (!l[2]) {
                        l[2] = n;
                    } else {
                        l[2] = "".concat(n, " and ").concat(l[2]);
                    }
                }
                t.push(l);
            }
        };
        return t;
    };
    function cssWithMappingToString(e, t) {
        var n = e[1] || "";
        var r = e[3];
        if (!r) {
            return n;
        }
        if (t && typeof btoa === "function") {
            var a = toComment(r);
            var o = r.sources.map((function(e) {
                return "/*# sourceURL=".concat(r.sourceRoot || "").concat(e, " */");
            }));
            return [ n ].concat(o).concat([ a ]).join("\n");
        }
        return [ n ].join("\n");
    }
    function toComment(e) {
        var t = btoa(unescape(encodeURIComponent(JSON.stringify(e))));
        var n = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(t);
        return "/*# ".concat(n, " */");
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.ScriptOption = t.ScriptInfo = t.Env = void 0;
    var r = function() {
        function Env() {}
        Env.Sign = "PanTools";
        return Env;
    }();
    t.Env = r;
    var a = function() {
        function ScriptInfo() {}
        return ScriptInfo;
    }();
    t.ScriptInfo = a;
    var o = function() {
        function ScriptOption() {}
        return ScriptOption;
    }();
    t.ScriptOption = o;
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.LogLevel = void 0;
    var r;
    (function(e) {
        e[e["debug"] = 0] = "debug";
        e[e["info"] = 1] = "info";
        e[e["warn"] = 2] = "warn";
        e[e["error"] = 3] = "error";
    })(r = t.LogLevel || (t.LogLevel = {}));
}, function(e, t, n) {
    "use strict";
    var r = this && this.__extends || function() {
        var extendStatics = function(e, t) {
            extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(e, t) {
                e.__proto__ = t;
            } || function(e, t) {
                for (var n in t) if (t.hasOwnProperty(n)) e[n] = t[n];
            };
            return extendStatics(e, t);
        };
        return function(e, t) {
            extendStatics(e, t);
            function __() {
                this.constructor = e;
            }
            e.prototype = t === null ? Object.create(t) : (__.prototype = t.prototype, new __);
        };
    }();
    var a = this && this.__awaiter || function(e, t, n, r) {
        function adopt(e) {
            return e instanceof n ? e : new n((function(t) {
                t(e);
            }));
        }
        return new (n || (n = Promise))((function(n, a) {
            function fulfilled(e) {
                try {
                    step(r.next(e));
                } catch (e) {
                    a(e);
                }
            }
            function rejected(e) {
                try {
                    step(r["throw"](e));
                } catch (e) {
                    a(e);
                }
            }
            function step(e) {
                e.done ? n(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((r = r.apply(e, t || [])).next());
        }));
    };
    var o = this && this.__generator || function(e, t) {
        var n = {
            label: 0,
            sent: function() {
                if (o[0] & 1) throw o[1];
                return o[1];
            },
            trys: [],
            ops: []
        }, r, a, o, i;
        return i = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
        }, typeof Symbol === "function" && (i[Symbol.iterator] = function() {
            return this;
        }), i;
        function verb(e) {
            return function(t) {
                return step([ e, t ]);
            };
        }
        function step(i) {
            if (r) throw new TypeError("Generator is already executing.");
            while (n) try {
                if (r = 1, a && (o = i[0] & 2 ? a["return"] : i[0] ? a["throw"] || ((o = a["return"]) && o.call(a), 
                0) : a.next) && !(o = o.call(a, i[1])).done) return o;
                if (a = 0, o) i = [ i[0] & 2, o.value ];
                switch (i[0]) {
                  case 0:
                  case 1:
                    o = i;
                    break;

                  case 4:
                    n.label++;
                    return {
                        value: i[1],
                        done: false
                    };

                  case 5:
                    n.label++;
                    a = i[1];
                    i = [ 0 ];
                    continue;

                  case 7:
                    i = n.ops.pop();
                    n.trys.pop();
                    continue;

                  default:
                    if (!(o = n.trys, o = o.length > 0 && o[o.length - 1]) && (i[0] === 6 || i[0] === 2)) {
                        n = 0;
                        continue;
                    }
                    if (i[0] === 3 && (!o || i[1] > o[0] && i[1] < o[3])) {
                        n.label = i[1];
                        break;
                    }
                    if (i[0] === 6 && n.label < o[1]) {
                        n.label = o[1];
                        o = i;
                        break;
                    }
                    if (o && n.label < o[2]) {
                        n.label = o[2];
                        n.ops.push(i);
                        break;
                    }
                    if (o[2]) n.ops.pop();
                    n.trys.pop();
                    continue;
                }
                i = t.call(e, n);
            } catch (e) {
                i = [ 6, e ];
                a = 0;
            } finally {
                r = o = 0;
            }
            if (i[0] & 5) throw i[1];
            return {
                value: i[0] ? i[1] : void 0,
                done: true
            };
        }
    };
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.PanCode = void 0;
    var i = n(7);
    var s = n(1);
    var l = n(4);
    var u = n(24);
    var c = n(0);
    var f = n(6);
    var d = n(8);
    var p = n(9);
    var m = n(5);
    var w = function(e) {
        r(PanCode, e);
        function PanCode() {
            var t = e !== null && e.apply(this, arguments) || this;
            t._unique = false;
            t.appName = "PanCode";
            t.rules = new Map([ [ f.SiteEnum.All, /(.*)/i ] ]);
            return t;
        }
        PanCode.prototype.loader = function() {};
        PanCode.prototype.run = function() {
            var e = $("body").text();
            document.addEventListener("mouseup", this.pageListener.bind(this), true);
        };
        PanCode.prototype.render = function(e) {
            return a(this, void 0, void 0, (function() {
                return o(this, (function(t) {
                    m.PanRoutes.forEach((function(t) {
                        var n = e.match(t.contextRule);
                        n === null || n === void 0 ? void 0 : n.forEach((function(e) {
                            var n = e.match(t.linkRule);
                            c.Logger.debug(n);
                            if (n) {
                                var r = e.match(t.pwdRule);
                                var a = e.match(t.idRule);
                                var o = new u.PanInfo;
                                o.type = t.type;
                                if (a == null) {
                                    return;
                                }
                                o.id = a[1];
                                o.pwd = r == null ? "" : r[0];
                                var i = $("body").html();
                                i = i.replace(new RegExp(n[0] + "(?=[^#])", "gm"), "<a target='_blank' class='btn btn-url' style='color:#d00' href=\"" + n[0] + '">' + n[0] + "</a>");
                                $("body").html(i);
                                if (o.pwd != "" && o.pwd != null) {
                                    var s = t.type.toString() + "_" + o.id;
                                    c.Logger.debug(o);
                                    if (p.Config.get(s, false)) {
                                        return;
                                    }
                                    p.Config.set(s, o);
                                }
                            }
                        }));
                    }));
                    return [ 2 ];
                }));
            }));
        };
        PanCode.prototype.pageListener = function() {
            var e = unsafeWindow.getSelection();
            var t = e === null || e === void 0 ? void 0 : e.toString();
            if (t && t != PanCode.lastText) {
                PanCode.lastText = t;
                var n = this.parseLink(t);
                if (n != null && n.link != "") {
                    if (n.pwd != "" && n.pwd != null) {
                        var r = n.type.toString() + "_" + n.id;
                        if (!p.Config.get(r, false)) {
                            p.Config.set(r, n);
                        }
                    }
                    l.Alert.html("\u53d1\u73b0\u94fe\u63a5\uff1a" + i.PanTypeEnum[n.type], '<span style="font-size:0.8em;">' + (n.pwd ? "\u5bc6\u7801\uff1a" + n.pwd : "\u662f\u5426\u6253\u5f00\u8be5\u94fe\u63a5\uff1f"), true, "\u53d6\u6d88", true, "\u6253\u5f00").then((function(e) {
                        if (e.isConfirmed) {
                            if (n != null) {
                                s.Core.open(n.link);
                            }
                        }
                    }));
                }
            }
        };
        PanCode.prototype.parseLink = function(e) {
            var t = null;
            m.PanRoutes.every((function(n) {
                var r = e.match(n.linkRule);
                var a = e.match(n.pwdRule);
                var o = e.match(n.idRule);
                if (o == null) {
                    return true;
                }
                t = new u.PanInfo;
                t.type = n.type;
                t.id = o[1];
                t.pwd = a == null ? "" : a[0];
                t.link = r == null ? "" : r[0];
                t.type = n.type;
            }));
            return t;
        };
        PanCode.lastText = "";
        return PanCode;
    }(d.AppBase);
    t.PanCode = w;
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: true
    });
    t.PanRule = t.PanInfo = void 0;
    var r = function() {
        function PanInfo() {}
        return PanInfo;
    }();
    t.PanInfo = r;
    var a = function() {
        function PanRule() {}
        return PanRule;
    }();
    t.PanRule = a;
} ]);