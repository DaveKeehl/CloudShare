function init() {

    let socket = io();

    css();

    socket.on('connect', function() {
        console.log("Socket connected!");
    });

    socket.on('disconnect', function(reason) {
        console.log("Socket disconnected!");
    });

    socket.on('reconnect', function(attemptNumber) {
        console.log("Socket reconnected!");
    });

    socket.on('entry.deleted', function(event) {
        refresh();
        css();
    });

    socket.on('entry.created', function(event) {
        refresh();
        css();
    });

    socket.on('entry.renamed', function(event) {
        refresh();
        css();
    });

    socket.on('tags.created', function(event) {
        refresh();
        css();
    });

    socket.on('tags.deleted', function(event) {
        refresh();
        css();
    });

    socket.on('tags.cleared', function(event) {
        refresh();
        css();
    });

    document.getElementById("theme1").onclick = () => {
        localStorage.setItem("css", "style-theme1.css");
        css();
    };

    document.getElementById("theme2").onclick = () => {
        localStorage.setItem("css", "style-theme2.css");
        css();
    };

    document.getElementById("theme3").onclick = () => {
        localStorage.setItem("css", "style-theme3.css");
        css();
    };

    document.getElementById("theme4").onclick = () => {
        localStorage.setItem("css", "style-theme4.css");
        css();
    };
}

function refresh(){
    let current = document.getElementsByClassName("breadcrumb")[0].innerText;
    let url = '/dir/display/'+ current;
    
    doJSONRequest('GET', url, {}, {}).then((result) => {
        dust.render('index', {squery: result.content.squery, 
                              previous: result.content.previous, 
                              path: result.content.path, 
                              list: result.content.list}, (err, out) => {                 
            document.body.innerHTML = out;
        });
    });
}

function deleteDir(params,path){
    doJSONRequest('DELETE', '/dir/' + path, {}, {});
}

function createDir(params,path){
    doJSONRequest('POST', '/dir/' + path, {}, params);
}

function renameDir(params,path){
    doJSONRequest('PUT', '/dir/' + url, {}, params);
}

function deleteFile(params,path){
    doJSONRequest('DELETE', '/file/' + url, {}, params);
}

function createFile(params,path){
    doFormRequest('POST', '/file/' + path, {}, params);
}

function renameFile(params,path){
    doJSONRequest('PUT', '/file/' + url, {}, params);
}

function deleteTags(params,path){
    doJSONRequest('DELETE', '/tags/' + url, {}, params);
}

function createTags(params,path){
    doJSONRequest('POST', '/tags/' + url, {}, params);
}

function clearTags(params,path){
    doJSONRequest('PUT', '/tags/' + url, {}, params);
}