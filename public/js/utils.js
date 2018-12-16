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


const getFileLink = function() {
    const eventPath = event.target.dataset.path;
    const filePath = window.location.origin + "/file/"+eventPath;
    event.target.dataset.clipboardText=filePath;
}

const getDirectoryLink = function() {
    const eventPath = event.target.dataset.path;
    const directoryPath = window.location.origin + "/dir/download/" + eventPath;
    event.target.dataset.clipboardText = directoryPath;
}

const search=function() {
    var input = document.getElementById('myInput');
    var filter = input.value.toUpperCase();
    var body = document.getElementById('table');
    var tr = body.getElementsByTagName('tr');
    for (i = 0; i < tr.length; i++) {
        var a = tr[i].getElementsByTagName('a')[0];
        var txtValue = a.textContent || a.innerText;
        var p = tr[i].querySelector('div');
        p = p && p.querySelector('p').innerText ? p.querySelector('p').innerText : p;
        if ((txtValue.toUpperCase().indexOf(filter) > - 1) || (typeof p === 'string' && p.toUpperCase().indexOf(filter) > - 1)) {
            tr[i].style.display = '';
        } else{
            tr[i].style.display = 'none';
        }
    }
}
