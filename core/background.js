var options, hasReleaseNotes = !1,
    viewWindow = null;

function ajaxRequest(e, t) {
    var a = new XMLHttpRequest;
    a.onreadystatechange = function() {
        4 == a.readyState && (200 == a.status ? t(a.responseText) : t(null))
    }, a.open(e.method, e.url, !0);
    for (var s in e.headers) a.setRequestHeader(e.headers[s].header, e.headers[s].value);
    a.send(e.data)
}

function onMessage(e, t, a) {
    switch (e.action) {
        case "ajaxGet":
            return ajaxRequest({
                url: e.url,
                method: "GET"
            }, a), !0;
        case "ajaxRequest":
            return ajaxRequest(e, a), !0;
        case "addUrlToHistory":
            chrome['history'].addUrl({
                url: e.url
            });
            break;
        case "getOptions":
            return a(options), !0;
        case "setOption":
            options[e.name] = e.value, localStorage.options = JSON.stringify(options), sendOptions(e.options);
            break;
        case "saveOptions":
            localStorage.options = JSON.stringify(e.options), sendOptions(e.options);
            break;
        case "setItem":
            localStorage.setItem(e.id, e.data);
            break;
        case "getItem":
            return a(localStorage.getItem(e.id)), !0;
        case "removeItem":
            localStorage.removeItem(e.id)
    }
}

function init() {
    options = loadOptions(), chrome['runtime']['onMessage'].addListener(onMessage)
}
init();