interface IParsedUrl {
    protocol?:string;
    domain?:string;
    port?:string;
    path?:string;
    params?:Record<string, string>;
    anchor?:string;
}

function parseUrl(url:string):IParsedUrl {
    const result:IParsedUrl = {};
    const splitProtocol = url.split("://");
    let current = url;
    let domainAndPort = "";
    if (splitProtocol.length > 1) {
        result.protocol = splitProtocol[0];
        current = splitProtocol[1];
    }
    const splitDomainAndPort = current.split("/");
    if (splitDomainAndPort.length > 1) {
        domainAndPort = splitDomainAndPort[0];
        const domainAndPortArray = domainAndPort.split(":");
        result.domain = domainAndPortArray[0];
        if (domainAndPortArray[1]) {
            result.port = domainAndPortArray[1];
        }
    }
    current = splitDomainAndPort.slice(1).join("/");
    const pathArray=current.split("?");
    result.path = pathArray[0];
    current = pathArray[1];
    const paramsAndAnchor = current.split("#");
    result.anchor = paramsAndAnchor[1];
    current = paramsAndAnchor[0];
    const paramsArray = current.split("&");
    const params = {};
    paramsArray.forEach((param:string) => {
        const arr = param.split("=");
        params[arr[0]] = arr[1];
    })
    result.params = params;
    return result;
}

const test = "http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument"
console.log(parseUrl(test));
