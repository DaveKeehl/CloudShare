function doFetchRequest(method, url, headers, body) {
    if(arguments.length != 4)
	throw new Error('arguments length must be 4');

    if(method === "HEAD")
	throw new Error('method cannot be HEAD');

    let init = {
	method: method,
	headers: headers
    };

    if(body != null && method != 'GET')
	init.body = body;

    return fetch(url, init);
}

function doJSONRequest(method, url, headers, body) {
    if(arguments.length != 4)
	throw new Error('arguments length must be 4');

    if(headers['Accept'] && headers['Accept'] != 'application/json')
	throw new Error('cannot define the Accept header');

    if(headers['Content-Type'] && headers['Content-Type'] != 'application/json')
	throw new Error('cannot define the Content-Type header');

    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';

    return doFetchRequest(method, url, headers, JSON.stringify(body))
        .then((res) => {
            let jsonResponse = {};
            jsonResponse.status = res.status;
            jsonResponse.ok = res.ok;
            return res.json()
                .then((obj) => {
                    jsonResponse.content = obj;
                    return jsonResponse;
                });
        });
}

function doFormRequest(method, url, headers, form) {
    let formData = new FormData();

    headers['Accept'] = 'application/json';

    Object.keys(form)
        .map((key) => {
            console.log(formData.entries());
            formData.append(key, form[key]);
        });

    return doFetchRequest(method, url, headers, formData);
}
