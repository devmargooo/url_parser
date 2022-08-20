function parseUrlRefactored(url) {
    const protocol = parseProtocol(url);
    const domain = parseDomain(url);
    const port = parsePort(url);
    const path = parsePath(url);
    const params = parseParams(url);
    const anchor = parseAnchor(url);
    return {
        protocol,
        domain,
        port,
        path,
        params,
        anchor
    };
}
function parseProtocol(url) {
    const splitted = url.split("://");
    if (splitted.length > 1) {
        return splitted[0];
    }
}
function parseDomain(url) {
    const pattern = /^(?:https?:\/\/)?(?:www\.)?((?:(?!www\.|\.).)+\.[a-zA-Z0-9.]+)/;
    const res = url.match(pattern);
    if (res) {
        const urlWithProtocol = res[0];
        const splitted = urlWithProtocol.split("://");
        return splitted[splitted.length - 1];
    }
}
function parsePort(url) {
    const pattern = /(?::\d+)/;
    const res = url.match(pattern);
    if (res) {
        return res[0].split(":")[1];
    }
}
function parsePath(url) {
    const pattern = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/;
    const res = url.match(pattern);
    if (res) {
        return res[3];
    }
}
function parseParams(url) {
    const paramsWithAnchor = url.split("?");
    if (paramsWithAnchor.length < 2) {
        return;
    }
    const splitted = paramsWithAnchor[1].split("#")[0];
    const couples = splitted.split("&");
    return couples.reduce((res, cur) => {
        const [key, value] = cur.split("=");
        res[key] = value;
        return res;
    }, {});
}
function parseAnchor(url) {
    const splitted = url.split("#");
    if (splitted.length > 1) {
        return splitted[1];
    }
}
const testUrl = "http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument";
console.log(parseUrlRefactored(testUrl));
//# sourceMappingURL=clean.js.map