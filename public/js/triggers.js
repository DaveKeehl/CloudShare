function deleteDirTrigger = (event) => {
    (withParameters ((params) => {
        deleteDir(params);
    }))(event);
}

function renameDirTrigger = (event) => {
    (withParameters ((params) => {
        renameDir(params);
    }))(event);
}

function createDirTrigger = (event) => {
    (withParameters ((params) => {
        createDir(params);
    }))(event);
}

function deleteFileTrigger = (event) => {
    (withParameters ((params) => {
        deleteFile(params);
    }))(event);
}

function renameFileTrigger = (event) => {
    (withParameters ((params) => {
        renameFile(params);
    }))(event);
}

function createFileTrigger = (event) => {
    (withParameters ((params) => {
        createFile(params);
    }))(event);
}

function deleteTagsTrigger = (event) => {
    (withParameters ((params) => {
        deleteTags(params);
    }))(event);
}

function clearTagsTrigger = (event) => {
    (withParameters ((params) => {
        clearTags(params);
    }))(event);
}

function createTagsTrigger = (event) =>{
    (withParameters ((params) => {
        createTags(params);
    }))(event);
}