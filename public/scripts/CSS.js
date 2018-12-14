
const css= () => {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("css") == null){
            localStorage.setItem("css", "style-theme1.css");
        }
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.onload = function() {
          document.body.style.display = "flex";
        }
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = "/css/"+localStorage.getItem("css");
        head.appendChild(link);
    } else {
    	console.log("error")
    }
}


