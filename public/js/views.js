(function(dust){dust.register("entry",body_0);function body_0(chk,ctx){return chk.w("<html><!-- SELF LINK --><tr><td class=\"top-action\"><i class=\"fas fa-folder\"></i><a href='/dir/display/").f(ctx.get(["path"], false),ctx,"h").w("'>.</a></td><td></td><td></td><td></td></tr><!-- LINK TO PARENT -->").h("eq",ctx,{"block":body_1},{"key":ctx.get(["squery"], false),"value":ctx.get(["true"], false),"type":"boolean"},"h").w("<!-- FILES -->").s(ctx.get(["list"], false),ctx,{"block":body_3},{}).w("</html>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.h("ne",ctx,{"block":body_2},{"key":ctx.get(["previous"], false),"value":"","type":"string"},"h");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.w("<tr><td class=\"top-action\"><i class=\"fas fa-folder\"></i><a href='/dir/display/").f(ctx.get(["previous"], false),ctx,"h").w("'>..</a></td><td></td><td></td><td></td></tr>");}body_2.__dustBody=!0;function body_3(chk,ctx){return chk.w("<tr><!-- FILE IS NOT A DIRECTORY -->").h("eq",ctx,{"else":body_4,"block":body_5},{"key":ctx.get(["isDir"], false),"value":ctx.get(["false"], false),"type":"boolean"},"h").w("</tr>");}body_3.__dustBody=!0;function body_4(chk,ctx){return chk.w("<td><i class=\"fas fa-folder\"></i><a href='/dir/display/").f(ctx.get(["path"], false),ctx,"h").w("'>").f(ctx.get(["name"], false),ctx,"h").w("</a><p class=\"tags\">").f(ctx.get(["tags"], false),ctx,"h").w("</p></td><td></td><td><!-- ").f(ctx.get(["timeCreated"], false),ctx,"h").w("<br> -->").f(ctx.get(["dateCreated"], false),ctx,"h").w("</td><!-- <td>").f(ctx.get(["tags"], false),ctx,"h").w("</td> --><td><form class=\"file-actions\" method=\"POST\"><input type=\"submit\" value=\"\" formaction=\"/dir/").f(ctx.get(["path"], false),ctx,"h").w("?_method=DELETE\" class=\"deleteDirectory\"><input type=\"submit\" value=\"\" formaction=\"\" class=\"getDirectoryLink\"><input type=\"submit\" value=\"\" formaction=\"\" class=\"downloadDirectory\"><input type=\"submit\" value=\"\" formaction=\"\" class=\"renameDirectory\"></form></td>");}body_4.__dustBody=!0;function body_5(chk,ctx){return chk.w("<td><img src=\"https://cdn3.iconfinder.com/data/icons/brands-applications/512/File-512.png\"><div><a href='/file/preview/").f(ctx.get(["path"], false),ctx,"h").w("' target=\"_blank\">").f(ctx.get(["name"], false),ctx,"h").w("</a><!-- ").f(ctx.get(["tags"], false),ctx,"h").w(" --><p class=\"tags\">").f(ctx.get(["tags"], false),ctx,"h").w("</p></div><!-- <img src=\"https://cdn3.iconfinder.com/data/icons/brands-applications/512/File-512.png\"><button type=\"button\" class=\"fileName btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModal\">").f(ctx.get(["name"], false),ctx,"h").w("</button><div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\" role=\"document\"><div class=\"modal-content\"><div class=\"modal-header\"><h5 class=\"modal-title\" id=\"exampleModalLabel\">").f(ctx.get(["name"], false),ctx,"h").w("</h5><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div><div class=\"modal-body\"><img src='/file/preview/").f(ctx.get(["path"], false),ctx,"h").w("'></div></div></div></div> --></td><td>").f(ctx.get(["size"], false),ctx,"h").w("</td><td><!-- ").f(ctx.get(["timeCreated"], false),ctx,"h").w("<br> -->").f(ctx.get(["dateCreated"], false),ctx,"h").w("</td><!-- <td>").f(ctx.get(["tags"], false),ctx,"h").w("</td> --><td><form class=\"file-actions\" method=\"POST\"><input type=\"submit\" value=\"\" formaction=\"/file/").f(ctx.get(["path"], false),ctx,"h").w("?_method=DELETE\" class=\"deleteFile\"><input type=\"submit\" value=\"\" formaction=\"\" class=\"getLink\"><input type=\"submit\" value=\"\" formaction=\"/file/").f(ctx.get(["path"], false),ctx,"h").w("?_method=GET\" class=\"downloadFile\"><input type=\"submit\" value=\"\" formaction=\"\" class=\"renameFile\"></form></td><!-- FILE IS A DIRECTORY -->");}body_5.__dustBody=!0;return body_0}(dust));
(function(dust){dust.register("index",body_0);function body_0(chk,ctx){return chk.w("<!doctype html><html lang=\"en\"><head><!-- Metatags --><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\"><title>CloudShare</title><!-- Google Fonts --><!-- Raleway --><link href=\"https://fonts.googleapis.com/css?family=Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i\" rel=\"stylesheet\"><!-- Roboto --><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto:300,400,500\"><!-- Fontawesome --><link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.5.0/css/all.css\" integrity=\"sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU\" crossorigin=\"anonymous\"><!-- Material Icons --><link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\"rel=\"stylesheet\"><!-- Bootstrap CSS --><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css\" integrity=\"sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO\" crossorigin=\"anonymous\"><!-- Stylesheets --><link rel=\"stylesheet\" href=\"/css/style-thema1.css\"><!-- Favicons --><link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/img/apple-touch-icon.png\"><link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/img/favicon-32x32.png\"><link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/img/favicon-16x16.png\"><link rel=\"manifest\" href=\"/img/site.webmanifest\"><link rel=\"mask-icon\" href=\"/img/safari-pinned-tab.svg\" color=\"#5bbad5\"><meta name=\"msapplication-TileColor\" content=\"#00aba9\"><meta name=\"theme-color\" content=\"#ffffff\"></head><body><aside id=\"left\" class=\"column\"><header class=\"top-left\"><div class=\"logo\"><a href=\"/\"><img src=\"/img/logo.svg\"></a></div></header><div class=\"bottom\"><div class=\"dropdown\"><button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><i class=\"fas fa-palette\"></i>Choose theme</button><div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\"><button class=\"default-theme dropdown-item\">Theme 1</button><button class=\"dropdown-item\">Theme 2</button><button class=\"dropdown-item\">Theme 3</button><button class=\"last-theme dropdown-item\">Theme 4</button></div></div><!-- <form method=\"POST\"><button class=\"new-folder\" formaction=\"/dir/new/").f(ctx.get(["path"], false),ctx,"h").w("/New Folder?_method=PUT\"><i class=\"fas fa-folder-plus\"></i>Create new folder</button><button class=\"upload-file\" formaction=\"\"><i class=\"fas fa-cloud-upload-alt\"></i>Upload new file</button></form> --><button class=\"new-folder\" data-toggle=\"modal\" data-target=\"#exampleModal\"><i class=\"fas fa-folder-plus\"></i>Create new folder</button><form method=\"POST\"><button class=\"upload-file\" formaction=\"\"><i class=\"fas fa-cloud-upload-alt\"></i>Upload new file</button><div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\" role=\"document\"><div class=\"modal-content\"><div class=\"modal-body\"><input type=\"text\" name=\"folder_name\" placeholder=\"New folder\"></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button><button type=\"submit\" class=\"btn btn-primary\" formaction=\"/dir/new/").f(ctx.get(["path"], false),ctx,"h").w("?_method=PUT\">OK</button></div></div></div></div></form><!-- <div class=\"uploadMultipleContainer\"><div class=\"uploadMultiple\"><i class=\"fas fa-upload\"></i><p>Drop files</p></div></div> --></div></aside><main id=\"right\" class=\"column\"><header class=\"top-right\"><div class=\"padding-side-50\"><nav class=\"navbar\" aria-label=\"breadcrumb\"><ol class=\"breadcrumb\"><!--<li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>--><!--<li class=\"breadcrumb-item active\" aria-current=\"page\">Library</li>-->").f(ctx.get(["path"], false),ctx,"h").w("</ol><form class=\"form-inline my-2 my-lg-0\"><input class=\"form-control mr-sm-2\" type=\"search\" placeholder=\"Search...\" aria-label=\"Search\"></form></nav></div></header><div class=\"bottom\"><table><thead><tr><th>Name</th><th>Size</th><th>Created</th><th>Actions</th></tr></thead><tbody>").p("entry",ctx,ctx,{}).w("</tbody></table></div></main><!-- Optional JavaScript --><!-- jQuery first, then Popper.js, then Bootstrap JS --><script src=\"https://code.jquery.com/jquery-3.3.1.slim.min.js\" integrity=\"sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo\" crossorigin=\"anonymous\"></script><script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js\" integrity=\"sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49\" crossorigin=\"anonymous\"></script><script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js\" integrity=\"sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy\" crossorigin=\"anonymous\"></script><script></script></body></html>");}body_0.__dustBody=!0;return body_0}(dust));
