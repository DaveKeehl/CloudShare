function init() {

  let socket = io();

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
    const dom = document.getElementById(event._id);
    if(dom) {
      dom.outerHTML= "Entry deleted";
    }
  });

  socket.on('entry.created', function(event) {
    dust.render('/', event, function(err, out){
      const mainDom = document.getElementByTag("table");
      let tr = document.createElement("tr");
      mainDom.appendChild(tr);
      tr.outerHTML = out;
    })
  });

  socket.on('entry.renamed', function(event) {
    // something
  });
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
