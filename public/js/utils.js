const test = function() {
    console.log(event.target.dataset.path);
};

const deleteFilePath = function() {
    const eventPath = event.target.dataset.path;
    const filePath = "/file/" + eventPath + "?_method=DELETE";
    const deleteButton = document.getElementById("deleteFileButton");
    deleteButton.formAction = filePath;
};

const deleteDirectoryPath = function() {
    const eventPath = event.target.dataset.path;
    const directoryPath = "/dir/" + eventPath + "?_method=DELETE";
    console.log(directoryPath);
    const deleteButton = document.getElementById("deleteDirectoryButton");
    deleteButton.formAction = directoryPath;
};

const renameFilePath = function() {
    const eventPath = event.target.dataset.path;
    const filePath = "/file/" + eventPath + "?_method=PUT";
    console.log(eventPath);
    const renameButton = document.getElementById("renameFileButton");
    renameButton.formAction = filePath;
};

const renameDirectoryPath = function() {
    const eventPath = event.target.dataset.path;
    const directoryPath = "/dir/" + eventPath + "?_method=PUT";
    console.log(directoryPath);
    const renameButton = document.getElementById("renameDirectoryButton");
    renameButton.formAction = directoryPath;
};

const taggingPath = function() {
    const eventPath = event.target.dataset.path;
    console.log("eventPath:" + eventPath);
    const addTagPath = "/tags/" + eventPath + "?_method=POST";
    console.log("addTagPath:" + addTagPath);
    const deleteTagPath = "/tags/" + eventPath + "?_method=DELETE";
    console.log("deleteTagPath:" + deleteTagPath);
    const clearTagPath = "/tags/" + eventPath + "?_method=PUT";
    console.log("clearTagPath:" + clearTagPath);
    const addTagButton = document.getElementById("addTag");
    const deleteTagButton = document.getElementById("deleteTag");
    const clearTagsButton = document.getElementById("clearTags");
    addTagButton.formAction = addTagPath;
    deleteTagButton.formAction = deleteTagPath;
    clearTagsButton.formAction = clearTagPath;
};


const getFileLink=function(){
    const eventPath = event.target.dataset.path;
    const filePath = window.location.origin+"/file/"+eventPath;
    event.target.dataset.clipboardText=filePath;
}

const getDirectoryLink=function(){
    const eventPath = event.target.dataset.path;
    const directoryPath = window.location.origin+"/dir/download/"+eventPath;
    event.target.dataset.clipboardText=directoryPath;
<<<<<<< HEAD
}
=======
}
>>>>>>> parent of 7158f31... change CSS.js
