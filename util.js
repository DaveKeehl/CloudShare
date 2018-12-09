const path = require('path');
const fs = require('fs-extra');

function formatBytes(a,b){
    if (0==a){
        return"0 B";
    }

    var c = 1024;
    var d = b || 1;
    var e = ["B","KB","MB","GB","TB","PB","EB","ZB","YB"];
    var f = Math.floor(Math.log(a)/Math.log(c));

    return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f];
}

function formatDate(dateMS){
    dateMS = dateMS.toJSON();
    const year = dateMS.slice(0,4);
    const month = dateMS.slice(5,7);
    const day = dateMS.slice(8,10);
    return [day,month,year].join().replace(/,/g,'/');
}

function formatTime(dateMS){
    dateMS = dateMS.toJSON();
    return dateMS.slice(11,19);
}

function walk(dir){
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir,file);
        var file_name = path.basename(file);
        var extension = path.extname(file);
        var parent_folder = path.dirname(file);
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results.push({
                isDir: true,
                path: file,
                name: file_name,
                parent: parent_folder,
                size: formatBytes(stat.size),
                extension: null,
                timeCreated: formatTime(stat.ctime),
                dateCreated: formatDate(stat.ctime)
            })
            results = results.concat(walk(file));
        } else {
            /* Is a file */
            results.push({
                isDir: false,
                path: file,
                name: file_name,
                parent: parent_folder,
                size: formatBytes(stat.size),
                extension: extension,
                timeCreated: formatTime(stat.ctime),
                dateCreated: formatDate(stat.ctime)
            });
        }
    });
    return results;
}

function compareEntries(obj1,obj2){
    return ((obj1.isDir == obj2.isDir) &&
            (obj1.path == obj2.path) &&
            (obj1.name == obj2.name) &&
            (obj1.parent == obj2.parent) &&
            (obj1.size == obj2.size) &&
            (obj1.extension == obj2.extension) &&
            (obj1.timeCreated == obj2.timeCreated) &&
            (obj1.dateCreated == obj2.dateCreated));
}

module.exports.formatTime = formatTime;
module.exports.formatDate = formatDate;
module.exports.formatBytes = formatBytes;
module.exports.compareEntries = compareEntries;
module.exports.walk = walk;