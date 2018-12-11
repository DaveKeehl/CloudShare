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
    // not sure what goes here
  });

  socket.on('entry.created', function(event) {
    dust.render('entry/', event, function(err, out){
      // something
    })
  });

  socket.on('entry.moved', function(event) {
    // something
  });

  // Need to work on further
}
