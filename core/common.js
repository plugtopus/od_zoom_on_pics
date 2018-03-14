function loadOptions() {
    var e;
    return null == localStorage.options && (localStorage.options = "{}"), (e = JSON.parse(localStorage.options)).extensionEnabled = !e.hasOwnProperty("extensionEnabled") || e.extensionEnabled, e.zoomVideos = !e.hasOwnProperty("zoomVideos") || e.zoomVideos, e.muteVideos = !e.hasOwnProperty("muteVideos") || e.muteVideos, e.showCaptions = !e.hasOwnProperty("showCaptions") || e.showCaptions, e.showHighRes = !!e.hasOwnProperty("showHighRes") && e.showHighRes, e.addToHistory = !e.hasOwnProperty("addToHistory") || e.addToHistory, e.alwaysPreload = !!e.hasOwnProperty("alwaysPreload") && e.alwaysPreload, e.displayDelay = e.hasOwnProperty("displayDelay") ? e.displayDelay : 100, e.fadeDuration = e.hasOwnProperty("fadeDuration") ? e.fadeDuration : 200, e.excludedSites = e.hasOwnProperty("excludedSites") ? e.excludedSites : [], e.whiteListMode = !!e.hasOwnProperty("whiteListMode") && e.whiteListMode, e.picturesOpacity = e.hasOwnProperty("picturesOpacity") ? e.picturesOpacity : 1, e.showWhileLoading = !e.hasOwnProperty("showWhileLoading") || e.showWhileLoading, e.mouseUnderlap = !e.hasOwnProperty("mouseUnderlap") || e.mouseUnderlap, e.updateNotifications = !e.hasOwnProperty("updateNotifications") || e.updateNotifications, e.enableAds = e.hasOwnProperty("enableAds") ? e.enableAds : 0, e.filterNSFW = !!e.hasOwnProperty("filterNSFW") && e.filterNSFW, e.enableGalleries = !e.hasOwnProperty("enableGalleries") || e.enableGalleries, e.galleriesMouseWheel = !e.hasOwnProperty("galleriesMouseWheel") || e.galleriesMouseWheel, e.actionKey = e.hasOwnProperty("actionKey") ? e.actionKey : 0, e.fullZoomKey = e.hasOwnProperty("fullZoomKey") ? e.fullZoomKey : 90, e.hideKey = e.hasOwnProperty("hideKey") ? e.hideKey : 88, e.openImageInWindowKey = e.hasOwnProperty("openImageInWindowKey") ? e.openImageInWindowKey : 87, e.openImageInTabKey = e.hasOwnProperty("openImageInTabKey") ? e.openImageInTabKey : 84, e.saveImageKey = e.hasOwnProperty("saveImageKey") ? e.saveImageKey : 83, e.prevImgKey = e.hasOwnProperty("prevImgKey") ? e.prevImgKey : 37, e.nextImgKey = e.hasOwnProperty("nextImgKey") ? e.nextImgKey : 39, localStorage.options = JSON.stringify(e), e
}

function sendOptions(e) {
    var o = {
        action: "optionsChanged",
        options: e
    };
    chrome['windows'].getAll(null, function(e) {
        for (var n = 0; n < e.length; n++) chrome['tabs'].getAllInWindow(e[n].id, function(e) {
            for (var n = 0; n < e.length; n++) chrome['tabs'].sendMessage(e[n].id, o)
        })
    }), chrome['runtime'].sendMessage(o)
}

function isExcludedSite(e) {
    var o = !options.whiteListMode,
        n = e.substr(e.indexOf("://") + 3);
    "www." == n.substr(0, 4) && (n = n.substr(4));
    for (var t = 0; t < options.excludedSites.length; t++) {
        var r = options.excludedSites[t];
        if ("www." == r.substr(0, 4) && (r = r.substr(4)), r && r.length <= n.length && n.substr(0, r.length) == r) return o
    }
    return !o
}

function compareVersionNumbers(e, o) {
    var n, t, r = e.split("."),
        s = o.split("."),
        a = Math.min(r.length, s.length);
    for (n = 0; n < a; n++)
        if (0 !== (t = parseInt(r[n]) < parseInt(s[n]))) return t;
    return r.length - s.length
}

function hasMinChromeVersion(e) {
    var o = navigator.appVersion.match(/Chrome\/([^\s]+)/);
    if (o && !(o.length < 2)) return compareVersionNumbers(o[1], e) >= 0
}

function keyCodeToKeyName(e) {
    return 16 == e ? "Shift" : 17 == e ? "Ctrl" : 17 == e ? "Command" : e >= 65 && e <= 90 ? String.fromCharCode(e) : "None"
}