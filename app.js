const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const kleiDust = require('klei-dust');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('./models/Entries');
const Entry = mongoose.model('Entries');

const app = express();

//configure database

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

mongoose.connect('mongodb://localhost/cloudshare-dev');
var db = mongoose.connection;
db.once('open', function() {
    console.log('Mongodb connection opened');
    console.log("Date: "+formatDate(new Date()));
    console.log("Time: "+formatTime(new Date()));
	var walk = function(dir){
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
	let paths = walk("test");
	console.log("Initialising Database:")
    paths.forEach((result)=>{
    	new Entry(result).save().then(function(saved) {
            if(saved.isDir){
                console.log("Saved Directory: " + saved.path);
            } else {
                console.log("Saved File: " + saved.path);
            }
        }).catch(function(err){
            console.log(err);
        });
    });
});



//configure app
app.use(logger('dev'));
//dust
app.set('views', __dirname + '/views');
kleiDust.setOptions({useHelpers : true});
app.engine('dust', kleiDust.dust);
app.set('view engine', 'dust');

app.use(express.static('./public'));
app.use('/file/preview/test',express.static(path.join(__dirname, 'test')));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));

// Initialize routers here
const routers = require('./routes/routers');

app.use('/', routers.root);
app.use('/file', routers.file);
app.use('/dir', routers.dir);

module.exports = app;
