let deleteDirTrigger = (event,path) => {
    console.log("Delete Directory Trigger!");
    console.log(event);
    console.log(path);
    (withParameters ((params) => {
        deleteDir(params,path);
    }))(event);
}

let renameDirTrigger = (event,path) => {
    (withParameters ((params) => {
        renameDir(params,path);
    }))(event);
}

function createDirTrigger (event,path){
    console.log("Create Directory Trigger!");
    console.log(event);
    console.log(path);
    (withParameters ((params) => {
        createDir(params,path);
    }))(event);
}

let deleteFileTrigger = (event,path) => {
    (withParameters ((params) => {
        deleteFile(params,path);
    }))(event);
}

let renameFileTrigger = (event,path) => {
    (withParameters ((params) => {
        renameFile(params,path);
    }))(event);
}

let createFileTrigger = (event) => {
    (withParameters ((params) => {
        createFile(params);
    }))(event);
}

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