//Start of socket implementation 

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


