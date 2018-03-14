var hoverZoomPlugins = hoverZoomPlugins || [],
    hoverZoomPluginOKA = {
        name: "ok (a)",
        version: "0.4",
        prepareImgLinks: function(e) {
            $(".photo img,            .ucard-mini img,            img.photo-sc_i_cnt_a_img,            .d_comment_author_icon img,            .disc-i_image img,            img.chat_seen_ava_img,            div.chats_i_img img,            a img,            img.uslider_img,            .photo-panel_cover img,            .comments_author-avatar__user img,            .lcTc_avatar img,            img.chats_i_tx_ava,            .media-topic_img,            .image img").each(function() {
                var e = $(this);
                hoverZoomPluginOKA.prepareImgLinkFromImg(e)
            })
        },
        prepareImgLinkFromHref: function(e) {
            var o = e.attr("href").split("/");
            if (-1 == o[0].indexOf("http")) {
                if (e.parents("#nav").length) return;
                4
            }
            var t = o[o.length - 1];
            parseInt(t) == t && hoverZoomPluginOKA.prepareImgLinkFromPhotoId(e, t)
        },
        getYoulaBigImage: function(e) {
            var o = e.attr("src");
            return o && 0 !== o.indexOf("data:") || (o = e.parents(".image").attr("style")) && (o = o.match(/url\(\s*"?'?([^"')]+)"?\s*\)/i)) && o.length > 1 && (o = o[1]), o = (o || "").replace(/(.*images\/)\d+_\d+(\/.*)/, "$1640_640_out$2")
        },
        prepareImgLinkFromImg: function(e) {
            var o = e.attr("src");
            try {
                var t = o.match(/\bid=([0-9]*)/);
                if (t && (t = t[1]), e.hasClass("gif_preview")) return;
                if (e.is('[alt^="youla"]') || e.parents(".YoulaOK_Components_CatalogItem_CatalogItemComponent").length)
                    if (o = hoverZoomPluginOKA.getYoulaBigImage(e)) return e.data().hoverZoomSrc = [o], void e.addClass("hoverZoomLink");
                e.parents(".online-fr_i").length ? e = e.parents(".online-fr_i") : e.parents(".photo-album_cnt").length ? e = e.parents(".photo-album_cnt") : e.parents(".collage_i").length ? e = e.parents(".collage_i") : e.parents(".roundedCard").length ? e = e.parents(".roundedCard") : e.parents(".media-link_img").length ? e = e.parents(".media-link_img") : e.parents(".chats_i.h-mod").length ? e.data().hoveredObj = e.parents(".chats_i.h-mod") : e.parents(".photo").length ? e = e.parents(".photo") : e.parents(".comments_form.__avatar").length && (e.data().hoveredObj = e.parents(".comments_form.__avatar")), t || e.data().photoId ? hoverZoomPluginOKA.prepareImgLinkFromPhotoId(e, t || e.data().photoId) : hoverZoomPluginOKA.prepareImgLinkFromGroupImg(e)
            } catch (e) {}
        },
        prepareImgLinkFromSrc: function(e) {
            var o = e.data().hoverZoomSrc[0].split("/");
            if (!(o.length < 5)) {
                var t = o[4];
                t = t.substr(0, t.indexOf("_")), hoverZoomPluginOKA.prepareImgLinkFromPhotoId(e, t)
            }
        },
        prepareImgLinkFromGroupImg: function(e) {
            var o = e.data();
            o.mouseenterAttached || (o.mouseenterAttached = !0, e.one("mouseenter", function() {
                var o = e.closest("a");
                o.length || (o = e.children("a"));
                var t = o.attr("href") || document.location.pathname;
                t && 0 != t.indexOf("http") && 0 != t.indexOf("//") && hoverZoom.prepareFromDocument(e, "https://m.ok.ru" + t, function(o) {
                    var t = o.querySelector("span.u-ava_img");
                    return t && (t = (t = t.getAttribute("style")).match(/\bphotoId=([0-9]*)/)) && t.length > 1 && (hoverZoomPluginOKA.prepareImgLinkFromPhotoId(e, t[1]), e.mouseenter()), null
                })
            }))
        },
        prepareImgLinkFromPhotoId: function(e, o) {
            if (e && o) {
                var t = e.data();
                if (t.photoId = o, t.hoveredObj) {
                    var r = "leaved";
                    t.hoveredObj.mousemove(function(o) {
                        if (o.originalEvent) {
                            o.stopPropagation();
                            var t = e[0].getBoundingClientRect();
                            if (o.originalEvent.clientX > t.left && o.originalEvent.clientX < t.left + t.width && o.originalEvent.clientY > t.top && o.originalEvent.clientY < t.top + t.height) {
                                "entered" != r && (r = "entered", e.mouseenter(), hoverZoom.displayPicFromElement(e));
                                var a = $.Event("mousemove");
                                a.pageX = o.pageX, a.pageY = o.pageY, e.trigger(a)
                            } else "leaved" != r && (r = "leaved", e.mouseleave())
                        }
                    })
                }
                var a = "cache_OKPhoto_" + (options.showHighRes ? "hi" : "lo") + "_",
                    n = localStorage[a + o];
                n ? (t.hoverZoomSrc = [n], e.addClass("hoverZoomLink")) : e.mouseenter(function() {
                    t.hoverZoomMouseOver = !0, t.hoverZoomOKApiCalled || (t.hoverZoomOKApiCalled = !0, src = "https://dg55.mycdn.me/getImage?photoId=" + o + "&photoType=0", t.hoverZoomSrc = [src], e.addClass("hoverZoomLink"), t.hoverZoomMouseOver && hoverZoom.displayPicFromElement(e), localStorage[a + o] = src)
                }).mouseleave(function() {
                    t.hoverZoomMouseOver = !1
                })
            }
        }
    };
hoverZoomPlugins.push(hoverZoomPluginOKA);