
function themeCSS(cssFile) {

    var oldCSS = document.getElementsByid("themes");

    var newCSS = document.createElement("link");
    newCSS.setAttribute("rel", "stylesheet");
    newCSS.setAttribute("type", "text/css");
    newCSS.setAttribute("href", cssFile);

   document.getElementsByid("themes").replace(oldCSS,newCSS);
}

