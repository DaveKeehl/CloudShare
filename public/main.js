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
    });

    socket.on('entry.created', function(event) {
        refresh();
    });

    socket.on('entry.renamed', function(event) {
        refresh();
    });

    socket.on('tags.created', function(event) {
        refresh();
    });

    socket.on('tags.deleted', function(event) {
        refresh();
    });

    socket.on('tags.cleared', function(event) {
        refresh();
    });
}

function refresh(){
    let current = document.getElementsByClassName("breadcrumb")[0].innerText;
    let url = '/dir/display/'+ current;
    let searchval = document.getElementsByClassName("form-control mr-sm-2")[0].value;
    if (searchval == ""){
        doJSONRequest('GET', url, {}, null).then((result) => {
            dust.render('index', {squery: result.squery, 
                              previous: result.previous, 
                              path: result.path, 
                              list: result.list}, (err, out) => {
                document.body.innerHTML = out;
            });
        });
    } else {
        doJSONRequest('GET', url, {}, {name: searchval}).then((result) => {
            dust.render('index', {squery: result.squery, 
                                  previous: result.previous, 
                                  path: result.path, 
                                  list: result.list}, (err, out) => {
                document.body.innerHTML = out;
            });
        });
    }
}

function deleteDir(path){
    let url = '/dir/' + path;
    doFetchRequest('DELETE', url, {}, {});
}

function renameDir(path,newname){
    let url = '/dir/' + path;
    doFetchRequest('PUT', url, {}, {dirname: newname});
}

function createDir(path,name){
    let url = '/dir/' + path;
    doFetchRequest('POST', url, {}, {folder_name: name});
}

function deleteFile(path){
    let url = '/file/' + path;
    doFetchRequest('DELETE', url, {}, {});
}

function renameFile(path,newname){
    let url = '/file/' + path;
    doFetchRequest('PUT', url, {}, {newname: newname});
}

// function createFile(path,name){
//     let url = '/file/' + path;
//     doFetchRequest('POST', url, {}, {folder_name: name});
// }

function deleteTags(path,tags){
    let url = '/tags/' + path;
    doFetchRequest('DELETE', url, {}, {tags: tags});
}

function clearTags(path){
    let url = '/tags/' + path;
    doFetchRequest('PUT', url, {}, {});
}

function createTags(path,tags){
    let url = '/tags/' + path;
    doFetchRequest('POST', url, {}, {tags: tags});
}

// function addListener(form) {
//       form.addEventListener("submit", (event) => {
//           event.preventDefault();
//       });
//       const createDirButton = form.querySelector("#mkdirModal button[type="submit"]");
//       createDirButton.addEventListener("click", createDirButtonListener);
//       const createFileButton = form.querySelector("#uploadModal button[type="submit"]");
//       createFileButton.addEventListener("click", createFileButtonListener);
//       const deleteDirButton = form.querySelector("#deleteDirectoryModal button[type="submit"]");
//       deleteDirButton.addEventListener("click", deleteDirButtonListener);
//       const deleteFileButton = form.querySelector("#deleteFileModal button[type="submit"]");
//       deleteFileButton.addEventListener("click", deleteFileButtonListener);
//       const renameDirButton = form.querySelector("#renameDirectoryModal button[type="submit"]");
//       renameDirButton.addEventListener("click", renameDirButtonListener);
//       const renameFileButton = form.querySelector("#renameFileModal button[type="submit"]");
//       renameFileButton.addEventListener("click", renameFileButtonListener);
//
// }
