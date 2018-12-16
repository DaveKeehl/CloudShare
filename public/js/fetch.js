function doFetchRequest(method, url, headers, body) {
    if ((arguments.length) != 4 || (method !== "PUT" && method !== "POST" &&
    method !== "GET" && method !== "DELETE") ||
    ((body && typeof body !== 'string'))) {
        throw new Error();
    }
    else if (method === "POST" || method === "PUT") {
        return fetch(url, {
            method: method,
            headers: headers,
            body: body
        });
    }
    else {
        return fetch(url, {
            method: method,
            headers: headers,
        });
    }
}

function doJSONRequest(method, url, headers, body) {

    if ((arguments.length != 4) || (method !== "PUT" && method !== "POST" &&
    method !== "GET" && method !== "DELETE")) {
        throw new Error();
    }
    if ((headers["Content-Type"] && headers["Content-Type"] !== "application/json") || (headers["Accept"] && headers["Accept"] !== "application/json")) {
        throw new Error();
    }
    headers["Accept"] = "application/json";

    if ((method === "POST") || (method === "PUT")) {
        headers["Content-Type"] = "application/json";
    }

    return doFetchRequest(method, url, headers, JSON.stringify(body))
    .then((res) => {
        return res.json();
    });

}
