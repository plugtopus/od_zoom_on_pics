var options, siteDomain, prgPreloading, lblPreloading, aPreload;

function i18n() {
    $("#lblDisable").text(chrome['i18n'].getMessage("popDisableForAllSites")), $("#lblFor").text(chrome['i18n'].getMessage("popDisableForSite2")), $("#aPreload").text(chrome['i18n'].getMessage("popPreloadImages")), $("#spanPreloading").text(chrome['i18n'].getMessage("popPreloadingImages")), $("#aMoreOptions").text(chrome['i18n'].getMessage("popMoreOptions"))
}

function chkExtensionDisabledOnClick() {
    options.extensionEnabled = !$("#chkExtensionDisabled")[0].checked, saveOptions()
}

function chkExcludeSiteOnClick() {
    for (var e = -1, i = 0; i < options.excludedSites.length; i++)
        if (options.excludedSites[i] == siteDomain) {
            e = i;
            break
        }
    $("#chkExcludeSite")[0].checked ? -1 == e && options.excludedSites.push(siteDomain) : e > -1 && options.excludedSites.splice(e, 1), saveOptions()
}

function saveOptions() {
    localStorage.options = JSON.stringify(options), sendOptions(options)
}

function onMessage(e, i, o) {
    switch (e.action) {
        case "preloadAvailable":
            aPreload.css("display", "inline");
            break;
        case "preloadProgress":
            prgPreloading.attr("value", e.value).attr("max", e.max), lblPreloading.css("display", e.value < e.max ? "inline" : "none"), e.value < e.max && aPreload.css("display", "none")
    }
}

function aPreloadOnClick() {
    chrome['tabs'].executeScript(null, {
        code: "if (hoverZoom) { hoverZoom.preloadImages(); }"
    }), aPreload.css("display", "none"), prgPreloading.attr("value", 0).attr("max", 1), lblPreloading.css("display", "inline")
}
$(function() {
    options = loadOptions(), i18n(), $("#Dis-enable").text(options.whiteListMode ? chrome['i18n'].getMessage("popEnableForSite1") : chrome['i18n'].getMessage("popDisableForSite1")), prgPreloading = $("#prgPreloading"), lblPreloading = $("#lblPreloading"), (aPreload = $("#aPreload")).click(aPreloadOnClick), $("#chkExtensionDisabled").click(chkExtensionDisabledOnClick), $("#chkExcludeSite").click(chkExcludeSiteOnClick), options.alwaysPreload || aPreload.css("display", "inline"), chrome['tabs'].getSelected(null, function(e) {
        siteDomain = e.url.split("/", 3)[2], $("#siteDomain").text(siteDomain), $("#chkExtensionDisabled")[0].checked = !options.extensionEnabled;
        for (var i = 0; i < options.excludedSites.length; i++)
            if (options.excludedSites[i] == siteDomain) {
                $("#chkExcludeSite")[0].checked = !0;
                break
            }
    }), chrome['runtime'].onMessage.addListener(onMessage)
});