var hoverZoomPlugins = hoverZoomPlugins || [],
    debug = !1;

function cLog(e) {
    debug && console.log(e)
}
var hoverZoom = {
    options: {},
    currentLink: null,
    hzImg: null,
    hzImgCss: {
        border: "1px solid #e3e3e3",
        "line-height": 0,
        overflow: "hidden",
        padding: "2px",
        margin: 0,
        position: "absolute",
        "z-index": 2147483647,
        "border-radius": "3px",
        background: "-webkit-gradient(linear, left top, right bottom, from(#ffffff), to(#ededed), color-stop(0.5, #ffffff))",
        "-webkit-box-shadow": "3px 3px 6px rgba(0,0,0,0.46)"
    },
    imgLoading: null,
    pageGenerator: "",
    loadHoverZoom: function() {
        var e, o, t = hoverZoom,
            n = $(window),
            r = $(document.body),
            i = null,
            a = null,
            h = null,
            l = null,
            s = {},
            c = !1,
            d = !1,
            m = !1,
            u = !1,
            g = !1,
            p = null,
            v = !0,
            f = null,
            w = {
                url: "",
                host: "",
                naturalHeight: 0,
                naturalWidth: 0,
                video: !1
            },
            y = {
                opacity: "0.5",
                position: "absolute",
                "max-height": "22px",
                "max-width": "22px",
                left: "3px",
                top: "3px",
                margin: "0",
                padding: "0",
                "border-radius": "2px"
            },
            Z = {
                opacity: "1",
                position: "static",
                height: "auto",
                width: "auto",
                left: "auto",
                top: "auto",
                "max-height": "none",
                "max-width": "none",
                margin: "0",
                padding: "0",
                "border-radius": "0",
                "background-size": "100% 100%",
                "background-position": "center",
                "background-repeat": "no-repeat"
            },
            I = {
                font: "menu",
                "font-size": "11px",
                "font-weight": "bold",
                color: "#333",
                "text-align": "center",
                "max-height": "27px",
                overflow: "hidden",
                "vertical-align": "top"
            },
            x = {
                position: "absolute",
                top: "5px",
                right: "5px",
                font: "menu",
                "font-size": "14px",
                "font-weight": "bold",
                color: "white",
                "text-shadow": "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                "text-align": "center",
                overflow: "hidden",
                "vertical-align": "top",
                "horizontal-align": "right"
            },
            b = ["www.redditmedia.com"];

        function L(e) {
            if (h) {
                void 0 !== e && void 0 !== e.top && void 0 !== e.left || (e = {
                    top: s.top,
                    left: s.left
                });
                var o = 10,
                    n = 15,
                    r = window.innerWidth,
                    a = window.innerHeight,
                    l = document.documentElement && document.documentElement.scrollLeft || document['body'].scrollLeft,
                    c = document.documentElement && document.documentElement.scrollTop || document['body'].scrollTop,
                    d = document.body.clientWidth,
                    u = e.left - l < r / 2;
                if (u ? e.left += 20 : e.left -= 20, t.imgLoading) e.top -= 10, u || (e.left -= 25);
                else {
                    var g = options.mouseUnderlap || m;
                    if (h.width("auto").height("auto"), w.naturalWidth = h.width(), w.naturalHeight = h.height(), !w.naturalWidth || !w.naturalHeight) return;
                    g ? h.width(Math.min(w.naturalWidth, r - o + l)) : u ? w.naturalWidth + o > r - e.left && h.width(r - e.left - o + l) : w.naturalWidth + o > e.left && h.width(e.left - o - l), t.hzImg.height() > a - o - n && h.height(a - o - n).width("auto"),
                        function() {
                            if (i) {
                                i.css("max-width", h.width()), i.height() > 20 && i.css("font-weight", "normal");
                                for (var e = 0; t.hzImg.height() > a - n && e++ < 10;) h.height(a - o - n - i.height()).width("auto"), i.css("max-width", h.width())
                            }
                        }(), e.top -= t.hzImg.height() / 2, u || (e.left -= t.hzImg.width() + o), g && (e.left = u ? Math.min(e.left, l + r - t.hzImg.width() - o) : Math.max(e.left, l));
                    var p = c + a - t.hzImg.height() - o - n;
                    e.top > p && (e.top = p), e.top < c && (e.top = c)
                }
                v && (e.left -= (r - d) / 2), t.hzImg.css({
                    top: Math.round(e.top),
                    left: Math.round(e.left)
                })
            }
        }

        function S() {
            c && (L(), t.imgLoading && h && h.height() > 0 ? C() : setTimeout(S, 100))
        }

        function k() {
            p && (p.each(function() {
                $(this).data() && this.setAttribute("title", $(this).data().hoverZoomTitle)
            }), p = null)
        }

        function z(e) {
            cLog("hideHoverZoomImg(" + e + ")"), (e || h) && t.hzImg && !m && (h = null, c && (e = !0), t.hzImg.stop(!0, !0).fadeOut(e ? 0 : options.fadeDuration, function() {
                i = null, t.imgLoading = null, t.hzImg.empty(), k()
            }))
        }

        function T(o) {
            if (!(!options.extensionEnabled || m || _() || n.height() < 30 || n.width() < 30)) {
                var r, i = $(o.target),
                    a = void 0 == o.pageY;
                if (a ? r = t.currentLink : (s = {
                        top: o.pageY,
                        left: o.pageX
                    }, r = i.parents(".hoverZoomLink"), i.hasClass("hoverZoomLink") && (r = r.add(i))), !(options.mouseUnderlap && i.length && s && f && (h && h.length && i[0] == h[0] || t.hzImg && t.hzImg.length && i[0] == t.hzImg[0]) && s.top > f.top && s.top < f.bottom && s.left > f.left && s.left < f.right))
                    if (r && r.length > 0) {
                        var l = r.data().hoverZoomSrcIndex || 0;
                        if (r.data().hoverZoomSrc && void 0 !== r.data().hoverZoomSrc && r.data().hoverZoomSrc[l] && void 0 !== r.data().hoverZoomSrc[l])
                            if (r.data().hoverZoomSrc[l] != w.url && z(), p || (p = $("[title]").not('iframe, .lightbox, [rel^="lightbox"]')).each(function() {
                                    $(this).data().hoverZoomTitle = this.getAttribute("title"), this.removeAttribute("title")
                                }), h) L();
                            else if (t.currentLink = r, !options.actionKey || d) {
                                w.url = r.data().hoverZoomSrc[l], clearTimeout(e);
                                var u = a ? 0 : options.displayDelay;
                                e = setTimeout(M, u), c = !0
                            }
                    } else t.currentLink && (cLog("MOUSE MOVE"), A())
            }
        }

        function E(e) {
            h && e.target != t.hzImg[0] && e.target != h[0] && (cLog("MOUSE DOWN"), A(), k())
        }

        function M() {
            if (cLog("loadFullSizeImage"), !h) {
                if (t.createHzImg(!u), t.createImgLoading(), w.video = "webm" == w.url.substr(w.url.length - 4) || "mp4" == w.url.substr(w.url.length - 3), w.video) {
                    if (!options.zoomVideos) return;
                    var e = document.createElement("video");
                    e.style.width = 0, e.style.height = 0, e.loop = !0, e.muted = options.muteVideos, e.poster = chrome['extension'].getURL("images/white.png"), e.src = w.url, h = $(e).appendTo(t.hzImg), e.addEventListener("loadedmetadata", function() {
                        L()
                    }), e.addEventListener("loadeddata", function() {
                        G(), e.play(), e.removeAttribute("poster")
                    }), e.load()
                } else h = $('<img style="border: none" />').appendTo(t.hzImg).load(G).error(O).attr("src", w.url);
                w.host = function(e) {
                    var o = "";
                    o = e.indexOf("://") > -1 ? e.replace(/.+:\/\/([^\/]*).*/, "$1") : window.location.host;
                    var t = o.split("."),
                        n = 2;
                    if (t.length > 2) {
                        var r = t[t.length - 2];
                        "co" != r && "com" != r && "net" != r && "org" != r || (n = 3)
                    }
                    for (; t.length > n;) t.shift();
                    return t.join(".")
                }(w.url), g = !1, h.css(y), options.showWhileLoading && !w.video && S(), L()
            }
            L()
        }

        function G() {
            cLog("imgFullSizeOnLoad"), w.url == $(h).attr("src") && (c = !1, t.imgLoading && C())
        }

        function C() {
            if (cLog("displayFullSizeImage"), t.imgLoading.remove(), t.imgLoading = null, t.hzImg.stop(!0, !0), t.hzImg.offset({
                    top: -9e3,
                    left: -9e3
                }), t.hzImg.empty(), clearTimeout(D), t.hzImg.css("cursor", "none"), h.css(Z).appendTo(t.hzImg).mousemove(N), t.currentLink) {
                var e = (l = t.currentLink).attr("src");
                if (e || (e = (l = t.currentLink.find("[src]").first()).attr("src")), e || (l = t.currentLink.find("[style]").first(), e = t.getThumbUrl(l)), e = e || "noimage", c && -1 == e.indexOf("noimage")) {
                    var o = w.url.substr(w.url.length - 3).toLowerCase();
                    if ("gif" != o && "svg" != o && "png" != o) {
                        var n = h.width() / h.height(),
                            r = l.width() / l.height();
                        Math.abs(n - r) < .1 && h.css({
                            "background-image": "url(" + e + ")"
                        })
                    }
                } else l = null;
                t.hzImg.css("cursor", "pointer"), s = l || t.currentLink, (f = s.offset()).bottom = f.top + s.height(), f.right = f.left + s.width()
            }
            var s;
            if (t.currentLink) {
                var d = t.currentLink.data();
                if (options.showCaptions && d.hoverZoomCaption && (i = $("<div/>", {
                        id: "hzCaption",
                        text: d.hoverZoomCaption
                    }).css(I).appendTo(t.hzImg)), d.hoverZoomGallerySrc) {
                    var m = "";
                    d.hoverZoomGallerySrc.length > 0 && (m = d.hoverZoomGalleryIndex + 1 + "/" + d.hoverZoomGallerySrc.length), a = $("<div/>", {
                        id: "hzGallery",
                        text: m
                    }).css(x).appendTo(t.hzImg), 0 == d.hoverZoomGalleryIndex && d.hoverZoomGallerySrc.length > 1 && se(1)
                }
            }
            if (g || u || t.hzImg.hide().fadeTo(options.fadeDuration, options.picturesOpacity), setTimeout(L, options.showWhileLoading ? 0 : 10), options.addToHistory && !chrome['extension'].inIncognitoContext) {
                var p = t.currentLink.context.href || w.url;
                chrome['runtime'].sendMessage({
                    action: "addUrlToHistory",
                    url: p
                })
            }
            chrome['runtime'].sendMessage({
                action: "trackEvent",
                event: {
                    category: "Actions",
                    action: "ImageDisplayedOnSite",
                    label: document.location.host
                }
            }), chrome['runtime'].sendMessage({
                action: "trackEvent",
                event: {
                    category: "Actions",
                    action: "ImageDisplayedFromSite",
                    label: w.host
                }
            })
        }

        function O() {
            if (w.url == $(this).attr("src")) {
                var e = t.currentLink ? t.currentLink.data().hoverZoomSrcIndex : 0;
                t.currentLink && e < t.currentLink.data().hoverZoomSrc.length - 1 ? (h.remove(), h = null, e++, t.currentLink.data().hoverZoomSrcIndex = e, console.info("[HoverZoom] Failed to load image: " + w.url + "\nTrying next one..."), w.url = t.currentLink.data().hoverZoomSrc[e], setTimeout(M, 100)) : (z(), console.warn("[HoverZoom] Failed to load image: " + w.url), chrome.runtime.sendMessage({
                    action: "trackEvent",
                    event: {
                        category: "Errors",
                        action: "LoadingErrorFromSite",
                        label: w.host
                    }
                }))
            }
        }
        var W = !1,
            D = 0;

        function H() {
            W = !0, t.hzImg.css("cursor", "none")
        }

        function N() {
            cLog("imgFullSizeOnMouseMove"), h || options.mouseUnderlap || z(!0), clearTimeout(D), W || (t.hzImg.css("cursor", "pointer"), D = setTimeout(H, 500)), W = !1
        }

        function A() {
            cLog("cancelImageLoading"), t.currentLink = null, clearTimeout(e), z()
        }

        function K(e) {
            var o = null;
            if (e.attr("title") ? o = e : (o = e.find("[title]")).length || (o = e.parents("[title]")), o && o.length) e.data().hoverZoomCaption = o.attr("title");
            else {
                var t = e.attr("alt") || e.find("[alt]").attr("alt");
                if (t && t.length > 6 && !/^\d+$/.test(t)) e.data().hoverZoomCaption = t;
                else {
                    var n = e.attr("ref") || e.find("[ref]").attr("ref");
                    n && n.length > 6 && !/^\d+$/.test(n) && (e.data().hoverZoomCaption = n)
                }
            }
        }

        function U(e) {
            e.each(function() {
                var e = $(this),
                    o = e.data();
                if (o.hoverZoomSrc || o.hoverZoomGallerySrc) {
                    if (o.hoverZoomSrc) {
                        var t = o.hoverZoomSrc[0],
                            n = t == e.attr("src");
                        if (n || e.find("img[src]").each(function() {
                                this.src == t && (n = !0)
                            }), n) return
                    }
                    if (!options.extensionEnabled || _()) return;
                    e.addClass("hoverZoomLink"), o.hoverZoomGallerySrc ? (o.hoverZoomGalleryIndex = 0, o.hoverZoomGallerySrc = o.hoverZoomGallerySrc.map(function(e) {
                        return e.map(Y)
                    }), le(e)) : o.hoverZoomSrc = o.hoverZoomSrc.map(Y), o.hoverZoomSrcIndex = 0, options.showCaptions && !o.hoverZoomCaption && K(e)
                } else V(!0)
            })
        }

        function F() {
            debug && console.time("prepareImgLinks");
            for (var e = 0; e < hoverZoomPlugins.length; e++) hoverZoomPlugins[e].prepareImgLinks(U);
            q = null, options.alwaysPreload ? (clearTimeout(o), o = setTimeout(t.preloadImages, 800)) : chrome['runtime'].sendMessage({
                action: "preloadAvailable"
            }),
                function(e) {
                    e || (j = 500);
                    clearTimeout(P), P = setTimeout(R, j), j *= 2
                }(), debug && console.timeEnd("prepareImgLinks")
        }
        var P, j = 500;

        function R() {
            ["www.facebook.com"].indexOf(location.host) > -1 || $("img").filter(function() {
                var e = $(this);
                if (this.src.toLowerCase().lastIndexOf(".jpg") != this.src.length - 4) return !1;
                if (e.data().hoverZoomSrc) return !1;
                if (this == document.body.firstChild) return !1;
                var o = this.getAttribute("width") || this.getAttribute("height") || this.style && (this.style.width || this.style.height || this.style.maxWidth || this.style.maxHeight);
                return o || (o = o || "0px" != e.css("width") || "0px" != e.css("height") || "none" != e.css("max-width") || "none" != e.css("max-height")), o
            }).one("mouseover.hoverZoom", function() {
                var e = $(this),
                    o = parseInt(this.getAttribute("width") || this.style.width || this.style.maxWidth || e.css("width") || e.css("max-width")),
                    t = parseInt(this.getAttribute("height") || this.style.height || this.style.maxHeight || e.css("height") || e.css("max-height")),
                    n = $('<img id="hzDownscaled" style="position: absolute; top: -10000px;">').appendTo(document.body);
                o > 300 || t > 300 || n.load(function() {
                    setTimeout(function() {
                        if (n.height() > 1.8 * t || n.width() > 1.8 * o) {
                            var r = e.data().hoverZoomSrc || [];
                            r.unshift(e.attr("src")), e.data().hoverZoomSrc = r, e.addClass("hoverZoomLink")
                        }
                        n.remove()
                    }, 10)
                }).attr("src", this.src)
            })
        }
        var q, B = 500;

        function V(e) {
            options.extensionEnabled && !_() && (e || (B = 500), clearTimeout(q), q = setTimeout(F, B), B *= 2)
        }

        function Y(e) {
            for (var o = unescape(encodeURIComponent(e)); e != o;) e = o, o = unescape(e);
            return decodeURIComponent(escape(e))
        }

        function X() {
            ! function() {
                if (!window.innerHeight || !window.innerWidth) return;
                J = null, v = "static" != r.css("position") || "0px" == r.css("padding-left") && "0px" == r.css("padding-right") && "0px" == r.css("margin-left") && "0px" == r.css("margin-right"), t.pageGenerator = $('meta[name="generator"]').attr("content"), F(), cLog("bindEvents"), n.bind("DOMNodeInserted", Q).load(ee).scroll(A), $(document).mousemove(T).mouseleave(A).mousedown(E).keydown(te).keyup(ne), options.galleriesMouseWheel && $(document).on("mousewheel", oe), re()
            }(), options.extensionEnabled && !_() || (z(), $(document).unbind("mousemove", T))
        }
        var J = null;

        function _() {
            if (null != J) return J;
            var e = !options.whiteListMode,
                o = location.href.substr(location.protocol.length + 2);
            "www." == o.substr(0, 4) && (o = o.substr(4));
            for (var t = 0; t < options.excludedSites.length; t++) {
                var n = options.excludedSites[t];
                if ("www." == n.substr(0, 4) && (n = n.substr(4)), n && n.length <= o.length && o.substr(0, n.length) == n) return J = e, e
            }
            return J = !e, !e
        }

        function Q(e) {
            var o = e.target;
            o && o.nodeType === Node.ELEMENT_NODE && ("A" === o.nodeName || "IMG" === o.nodeName || o.getElementsByTagName("A").length > 0 || o.getElementsByTagName("IMG").length > 0 ? "hzImg" !== o.id && "hzImg" !== o.parentNode.id && "hzDownscaled" !== o.id && V() : "EMBED" !== o.nodeName && "OBJECT" !== o.nodeName || re())
        }

        function ee(e) {
            V()
        }

        function oe(e) {
            h && (t.currentLink.data().hoverZoomGallerySrc && (e.preventDefault(), e.originalEvent.wheelDeltaY > 0 ? ie(-1) : ie(1)))
        }

        function te(e) {
            if (!(e.target && ["INPUT", "TEXTAREA", "SELECT"].indexOf(e.target.tagName) > -1)) {
                if (e.which == options.actionKey && !d && (d = !0, $(this).mousemove(), c || h)) return !1;
                if (e.which == options.fullZoomKey && !m && (m = !0, L(), h)) return !1;
                if (e.which == options.hideKey && !u && (u = !0, t.hzImg && t.hzImg.hide(), h)) return !1;
                if (h) {
                    if (e.which == options.openImageInWindowKey) return chrome['runtime'].sendMessage({
                        action: "getItem",
                        id: "popupBorder"
                    }, function(e) {
                        var o, t = {
                            width: 16,
                            height: 38
                        };
                        if (e) try {
                            t = JSON.parse(e)
                        } catch (e) {}(o = {
                            url: w.url,
                            width: w.naturalWidth + t.width,
                            height: w.naturalHeight + t.height,
                            type: "popup",
                            incognito: chrome['extension'].inIncognitoContext
                        }).height > screen.availHeight && (o.height = screen.availHeight, o.width = Math.round(t.width + (screen.availHeight - t.height) * w.naturalWidth / w.naturalHeight)), o.width > screen.availWidth && (o.width = screen.availWidth, o.height = Math.round(t.height + (screen.availWidth - t.width) * w.naturalHeight / w.naturalWidth)), o.top = Math.round(screen.availHeight / 2 - o.height / 2), o.left = Math.round(screen.availWidth / 2 - o.width / 2), chrome.runtime.sendMessage({
                            action: "openViewWindow",
                            createData: o
                        })
                    }), !1;
                    if (e.which == options.openImageInTabKey) return o = e.shiftKey, chrome['runtime'].sendMessage({
                        action: "openViewTab",
                        createData: {
                            url: w.url,
                            active: !o
                        }
                    }), !1;
                    if (e.which == options.saveImageKey) return function() {
                        var e = document.createElement("a");
                        e.href = w.url, e.download = w.url.split("/").pop().split("?")[0], e.download || (e.download = "image.jpg");
                        var o = document.createEvent("MouseEvent");
                        o.initEvent("click", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), e.dispatchEvent(o)
                    }(), !1;
                    if (e.which == options.actionKey || e.which == options.fullZoomKey || e.which == options.hideKey) return !1;
                    if (e.which == options.prevImgKey) return ie(-1), !1;
                    if (e.which == options.nextImgKey) return ie(1), !1
                }
                var o
            }
        }

        function ne(e) {
            e.which == options.actionKey && (d = !1, z()), e.which == options.fullZoomKey && (m = !1, $(this).mousemove()), e.which == options.hideKey && (u = !1, h && t.hzImg.show(), $(this).mousemove())
        }

        function re() {
            if (-1 != b.indexOf(location.host) && !(_() || window == window.top && 0 == $(".hoverZoomLink").length)) {
                $('embed:not([wmode]), embed[wmode="window"]').each(function() {
                    if (this.type && "application/x-shockwave-flash" == this.type.toLowerCase()) {
                        var e = this.cloneNode(!0);
                        e.setAttribute("wmode", "opaque"), n.unbind("DOMNodeInserted", Q), $(this).replaceWith(e), n.bind("DOMNodeInserted", Q)
                    }
                });
                var e = function() {
                    return "wmode" == this.name.toLowerCase()
                };
                $('object[type="application/x-shockwave-flash"]').filter(function() {
                    var o = $(this).children("param").filter(e);
                    return 0 == o.length || "window" == o.attr("value").toLowerCase()
                }).each(function() {
                    var o = this.cloneNode(!0);
                    $(o).children("param").filter(e).remove(), $('<param name="wmode" value="opaque">').appendTo(o), n.unbind("DOMNodeInserted", Q), $(this).replaceWith(o), n.bind("DOMNodeInserted", Q)
                })
            }
        }

        function ie(e) {
            cLog("rotateGalleryImg(" + e + ")");
            var o = t.currentLink,
                n = o.data();
            if (n.hoverZoomGallerySrc) {
                var r = n.hoverZoomGallerySrc.length;
                n.hoverZoomGalleryIndex = (n.hoverZoomGalleryIndex + e + r) % r, le(o), n.hoverZoomSrcIndex = 0, c = !0, a.text(".../" + n.hoverZoomGallerySrc.length), ae(), se((n.hoverZoomGalleryIndex + e + r) % r)
            }
        }

        function ae() {
            clearTimeout(e), w.url = t.currentLink.data().hoverZoomSrc[t.currentLink.data().hoverZoomSrcIndex], h.load(he).error(function() {
                imgOnError(this, !1, ae)
            }).attr("src", w.url)
        }

        function he() {
            cLog("nextGalleryImageOnLoad"), c && (c = !1, L(), data = t.currentLink.data(), data.hoverZoomGallerySrc.length > 0 && a.text(data.hoverZoomGalleryIndex + 1 + "/" + data.hoverZoomGallerySrc.length), options.showCaptions && $(i).text(data.hoverZoomCaption))
        }

        function le(e) {
            if (options.enableGalleries) {
                var o = e.data();
                o.hoverZoomSrc = o.hoverZoomGallerySrc[o.hoverZoomGalleryIndex], o.hoverZoomGalleryCaption ? o.hoverZoomCaption = o.hoverZoomGalleryCaption[o.hoverZoomGalleryIndex] : K(e)
            }
        }

        function se(e) {
            (new Image).src = t.currentLink.data().hoverZoomGallerySrc[e][0]
        }
        chrome['runtime'].onMessage.addListener(function(e, o, t) {
            "optionsChanged" == e.action && (options = e.options, X())
        }), chrome['runtime'].sendMessage({
            action: "getOptions"
        }, function(e) {
            options = e, options && X()
        })
    },
    urlReplace: function(e, o, t, n, r) {
        $(o).each(function() {
            var o, i, a, h = $(this);
            if (o = r ? h.parents(r) : h, i = hoverZoom.getThumbUrl(this)) {
                if (a = i, Array.isArray(t))
                    for (var l = 0; l < t.length; l++) i = i.replace(t[l], n[l]);
                else i = i.replace(t, n);
                if (a != (i = unescape(i))) {
                    var s = o.data().hoverZoomSrc;
                    "[object Array]" === Object.prototype.toString.call(s) ? s.unshift(i) : s = [i], o.data().hoverZoomSrc = s, e.push(o)
                }
            }
        })
    },
    getThumbUrl: function(e) {
        var o = !(!e || 1 != e.nodeType) && getComputedStyle(e),
            t = o ? o.backgroundImage : "none";
        return "none" != t ? t.replace(/.*url\s*\(\s*(.*)\s*\).*/i, "$1") : e.src || e.href
    },
    displayPicFromElement: function(e) {
        hoverZoom.currentLink = e, $(document).mousemove()
    },
    createHzImg: function(e) {
        hoverZoom.hzImg || (hoverZoom.hzImg = $('<div id="hzImg"></div>').appendTo(document.body), hoverZoom.hzImg.click(function(e) {
            if (hoverZoom.currentLink && hoverZoom.currentLink.length) {
                var o = document.createEvent("MouseEvents");
                o.initMouseEvent("click", e.bubbles, e.cancelable, e.view, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, null), hoverZoom.currentLink[0].dispatchEvent(o)
            }
        })), hoverZoom.hzImg.css(hoverZoom.hzImgCss), hoverZoom.hzImg.empty(), e && hoverZoom.hzImg.stop(!0, !0).fadeTo(options.fadeDuration, options.picturesOpacity)
    },
    createImgLoading: function() {
        hoverZoom.imgLoading = hoverZoom.imgLoading || $('<img src="' + chrome.extension.getURL("img/loader.gif") + '" style="opacity: 0.8; padding: 0; margin: 0" />'), hoverZoom.imgLoading.appendTo(hoverZoom.hzImg)
    },
    preloadImages: function() {
        var e = $(".hoverZoomLink"),
            o = 0,
            t = 200;
        setTimeout(function n() {
            if (!(o >= e.length)) {
                var r = e.eq(o++);
                if (r.data().hoverZoomPreloaded) n(), chrome['runtime'].sendMessage({
                    action: "preloadProgress",
                    value: o,
                    max: e.length
                });
                else {
                    var i = r.data().hoverZoomSrcIndex || 0;
                    $('<img src="' + r.data().hoverZoomSrc[i] + '">').load(function() {
                        r.data().hoverZoomPreloaded = !0, setTimeout(n, t), chrome['runtime'].sendMessage({
                            action: "preloadProgress",
                            value: o,
                            max: e.length
                        })
                    }).error(function() {
                        i < r.data().hoverZoomSrc.length - 1 && (r.data().hoverZoomSrcIndex++, o--), setTimeout(n, t)
                    })
                }
            }
        }, t)
    },
    prepareOEmbedLink: function(e, o, t) {
        t || (t = getThumbUrl(e)), e = $(e), $.getJSON(o + t, function(o) {
            o && "photo" == o.type && o.url && (e.data().hoverZoomSrc = [o.url], e.addClass("hoverZoomLink"), hoverZoom.displayPicFromElement(e))
        })
    },
    prepareFromDocument: function(e, o, t) {
        $.get(o, function(o) {
            var n = (new DOMParser).parseFromString(o, "text/html"),
                r = n.querySelector('meta[http-equiv="refresh"][content]');
            if (r) {
                var i = r.content.substr(r.content.toLowerCase().indexOf("url=") + 4);
                i && hoverZoom.prepareFromDocument(e, i, t)
            }
            var a = t(n);
            a && (Array.isArray(a) ? (clog(a), e.data().hoverZoomGallerySrc = a, e.data().hoverZoomGalleryIndex = 0, e.data().hoverZoomSrc = a[0]) : e.data().hoverZoomSrc = [a], e.addClass("hoverZoomLink"), hoverZoom.displayPicFromElement(e))
        })
    }
};
hoverZoom.loadHoverZoom();