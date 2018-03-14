var hoverZoomPlugins = hoverZoomPlugins || [];
hoverZoomPlugins.push({
    name: "Default",
    prepareImgLinks: function(e) {
        var o = [];
        $("a[href]").filter(function() {
            return this.href.match(/\/[^:]+\.(?:jpe?g|gif|png|webm|mp4|svg|webp|bmp|ico|xbm)(?:[\?#].*)?$/i)
        }).each(function() {
            if (!$(this).data().hoverZoomSrc) this.href
        }), o.length && e($(o))
    }
});