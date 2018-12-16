
const css = () => {
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

document.getElementById("theme1")
    .onclick = () => {
        localStorage.setItem("css", "style-theme1.css");
    css();
};

document.getElementById("theme2")
    .onclick = () => {
        localStorage.setItem("css", "style-theme2.css");
    css();
};

document.getElementById("theme3")
    .onclick = () => {
        localStorage.setItem("css", "style-theme3.css");
    css();
};

document.getElementById("theme4")
					.onclick = () => {
    localStorage.setItem("css", "style-theme4.css");
    css();s
};
