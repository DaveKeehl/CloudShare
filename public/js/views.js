(function(dust){dust.register("entry",body_0);function body_0(chk,ctx){return chk.w("<html><!-- SELF LINK --><tr><td class=\"top-action\"><img src=\"https://img.icons8.com/small/1600/filled-folder.png\"><a href='/dir/").f(ctx.get(["path"], false),ctx,"h").w("'>.</a></td><td></td><td></td><td></td></tr><!-- LINK TO PARENT -->").h("eq",ctx,{"block":body_1},{"key":ctx.get(["squery"], false),"value":ctx.get(["true"], false),"type":"boolean"},"h").w("<!-- FILES -->").s(ctx.get(["list"], false),ctx,{"block":body_3},{}).w("</html>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.h("ne",ctx,{"block":body_2},{"key":ctx.get(["previous"], false),"value":"","type":"string"},"h");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.w("<tr><td class=\"top-action\"><img src=\"https://img.icons8.com/small/1600/filled-folder.png\"><a href='/dir/").f(ctx.get(["previous"], false),ctx,"h").w("'>..</a></td><td></td><td></td><td></td></tr>");}body_2.__dustBody=!0;function body_3(chk,ctx){return chk.w("<tr><!-- FILE IS A DIRECTORY -->").h("eq",ctx,{"else":body_4,"block":body_5},{"key":ctx.get(["isDir"], false),"value":ctx.get(["false"], false),"type":"boolean"},"h").w("</tr>");}body_3.__dustBody=!0;function body_4(chk,ctx){return chk.w("<td><img src=\"https://img.icons8.com/small/1600/filled-folder.png\"><a href='/dir/").f(ctx.get(["path"], false),ctx,"h").w("'>").f(ctx.get(["name"], false),ctx,"h").w("</a></td><td></td><td><!-- ").f(ctx.get(["timeCreated"], false),ctx,"h").w("<br> -->").f(ctx.get(["dateCreated"], false),ctx,"h").w("</td><!-- <td>").f(ctx.get(["tags"], false),ctx,"h").w("</td> --><td><ul><li><button class=\"file-action\"></button></li><li><button class=\"file-action\"></button></li><li><button class=\"file-action\"></button></li><li><button class=\"file-action\"></button></li></ul></td>");}body_4.__dustBody=!0;function body_5(chk,ctx){return chk.w("<td><img src=\"https://cdn3.iconfinder.com/data/icons/brands-applications/512/File-512.png\"><a href='/file/preview/").f(ctx.get(["path"], false),ctx,"h").w("' target=\"_blank\">").f(ctx.get(["name"], false),ctx,"h").w("</a></td><td>").f(ctx.get(["size"], false),ctx,"h").w("</td><td><!-- ").f(ctx.get(["timeCreated"], false),ctx,"h").w("<br> -->").f(ctx.get(["dateCreated"], false),ctx,"h").w("</td><!-- <td>").f(ctx.get(["tags"], false),ctx,"h").w("</td> --><td><ul><li><button class=\"file-action\"></button></li><li><button class=\"file-action\"></button></li><li><button class=\"file-action\"></button></li><li><button class=\"file-action\"></button></li></ul></td><!-- FILE IS NOT A DIRECTORY -->");}body_5.__dustBody=!0;return body_0}(dust));
(function(dust){dust.register("index",body_0);function body_0(chk,ctx){return chk.w("<!doctype html><html lang=\"en\"><head><!-- Metatags --><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\"><title>CloudShare</title><!-- Google Fonts --><link href=\"https://fonts.googleapis.com/css?family=Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i\" rel=\"stylesheet\"><link href=\"https://fonts.googleapis.com/css?family=Orbitron:400,500\" rel=\"stylesheet\"><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto:300,400,500\"><!-- Fontawesome --><link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.5.0/css/all.css\" integrity=\"sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU\" crossorigin=\"anonymous\"><!-- Material Icons --><link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\"rel=\"stylesheet\"><!-- Bootstrap CSS --><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css\" integrity=\"sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO\" crossorigin=\"anonymous\"><!-- Stylesheets --><link rel=\"stylesheet\" href=\"/style.css\"><!-- Favicons --><link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/img/apple-touch-icon.png\"><link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/img/favicon-32x32.png\"><link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/img/favicon-16x16.png\"><link rel=\"manifest\" href=\"/img/site.webmanifest\"><link rel=\"mask-icon\" href=\"/img/safari-pinned-tab.svg\" color=\"#0062ff\"><meta name=\"msapplication-TileColor\" content=\"#000000\"><meta name=\"theme-color\" content=\"#000000\"></head><body><aside id=\"left\" class=\"column\"><header class=\"top-left\"><div class=\"logo\"><a href=\"#\"><img src=\"/img/logo.svg\"><!-- <h1>CloudShare</h1> --></a></div></header><div class=\"bottom\"><div class=\"dropdown\"><button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><i class=\"fas fa-palette\"></i>Choose theme</button><div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\"><button class=\"default-theme dropdown-item\">Theme 1</button><button class=\"dropdown-item\">Theme 2</button><button class=\"dropdown-item\">Theme 3</button><button class=\"last-theme dropdown-item\">Theme 4</button></div></div><button class=\"new-folder\"><i class=\"fas fa-folder-plus\"></i>Create new folder</button><button class=\"upload-file\"><i class=\"fas fa-cloud-upload-alt\"></i>Upload new file</button><div class=\"uploadMultipleContainer\"><div class=\"uploadMultiple\"></div></div></div></aside><main id=\"right\" class=\"column\"><header class=\"top-right\"><div class=\"padding-side-50\"><nav class=\"navbar\" aria-label=\"breadcrumb\"><ol class=\"breadcrumb\"><!--<li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>--><!--<li class=\"breadcrumb-item active\" aria-current=\"page\">Library</li>-->").f(ctx.get(["path"], false),ctx,"h").w("</ol><form class=\"form-inline my-2 my-lg-0\"><input class=\"form-control mr-sm-2\" type=\"search\" placeholder=\"Search...\" aria-label=\"Search\"></form></nav></div></header><div class=\"bottom\"><table><thead><tr><th>Name</th><th>Size</th><th>Created</th><th>Actions</th></tr></thead><tbody>").p("entry",ctx,ctx,{}).w("</tbody></table></div></main><!-- Optional JavaScript --><!-- jQuery first, then Popper.js, then Bootstrap JS --><script src=\"https://code.jquery.com/jquery-3.3.1.slim.min.js\" integrity=\"sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo\" crossorigin=\"anonymous\"></script><script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js\" integrity=\"sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49\" crossorigin=\"anonymous\"></script><script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js\" integrity=\"sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy\" crossorigin=\"anonymous\"></script><script></script></body></html>");}body_0.__dustBody=!0;return body_0}(dust));
