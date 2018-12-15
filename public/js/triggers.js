function createDirTrigger (event,path){
    (withParameters ((params) => {
        createDir(params,path);
    }))(event);
}

let deleteDirTrigger = (event) => {
    (withParameters ((params) => {
        deleteDir(params,path);
    }))(event);
}

let renameDirTrigger = (event,path) => {
    (withParameters ((params) => {
        renameDir(params,path);
    }))(event);
}

/////////////////////////////////////////

let createFileTrigger = (event,path) => {
    (withParameters ((params) => {
        createFile(params,path);
    }))(event);
}

let deleteFileTrigger = (event) => {
    (withParameters ((params) => {
        deleteFile(params,path);
    }))(event);
}

let renameFileTrigger = (event,path) => {
    (withParameters ((params) => {
        renameFile(params,path);
    }))(event);
}

/////////////////////////////////////////

let deleteTagsTrigger = (event,path) => {
    (withParameters ((params) => {
        deleteTags(params,path);
    }))(event);
}

let clearTagsTrigger = (event) => {
    (withParameters ((params) => {
        clearTags(params,path);
    }))(event);
}

let createTagsTrigger = (event) =>{
    (withParameters ((params) => {
        createTags(params,path);
    }))(event);
}