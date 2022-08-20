interface IParsedUrl {
    protocol?:string;
    domain?:string;
    port?:string;
    path?:string;
    params?:Record<string, string>;
    anchor?:string;
}

function parseUrlRefactored(url:string):IParsedUrl {
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
    }
}

function parseProtocol(url:string):string | undefined {
    const splitted = url.split("://");
    if (splitted.length > 1) {
        return splitted[0];
    }
}

function parseDomain(url:string):string | undefined  {
    const pattern = /^(?:https?:\/\/)?(?:www\.)?((?:(?!www\.|\.).)+\.[a-zA-Z0-9.]+)/;
    const res = url.match(pattern);
    if (res) {
        const urlWithProtocol = res[0];
        const splitted = urlWithProtocol.split("://");
        return splitted[splitted.length - 1];
    }
}

function parsePort(url:string):string | undefined {
    const pattern = /(?::\d+)/;
    const res = url.match(pattern);
    if (res) {
        return res[0].split(":")[1];
    }
}

function parsePath(url:string):string | undefined {
    const pattern = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/;
    const res = url.match(pattern);
    if (res) {
        return res[3];
    }
}

function parseParams(url:string):Record<string, string> | undefined {
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
    }, {} as Record<string, string>);
}

function parseAnchor(url:string):string | undefined {
    const splitted = url.split("#");
    if (splitted.length > 1) {
        return splitted[1];
    }
}

const testUrl = "http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument"
console.log(parseUrlRefactored(testUrl));
