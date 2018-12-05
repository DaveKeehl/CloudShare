const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const kleiDust = require('klei-dust');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('./models/Entries');
const File = mongoose.model('Files');
const Dir = mongoose.model('Dirs');

const app = express();

//configure database

mongoose.connect('mongodb://localhost/cloudshare-dev');
var db = mongoose.connection;
db.once('open', function() {
    console.log('Mongodb connection opened');
	var walk = function(dir){
	    var results = [];
	    var list = fs.readdirSync(dir);
	    list.forEach(function(file) {
	        file = path.join(dir,file);
	        var stat = fs.statSync(file);
	        if (stat && stat.isDirectory()) {
	            /* Recurse into a subdirectory */
                results.push(file);
	            results = results.concat(walk(file));
	        } else {
	            /* Is a file */
	            results.push(file);
	        }
    	});
    	return results;
	}
	let paths = walk("test");
	console.log("Initialising Database:")
    paths.forEach((result)=>{
    	let file_name = path.basename(result);
    	let extension = path.extname(result);
    	let parent_folder = path.dirname(result);
        if (extension != ''){
            let form = {
                path: result,
                name: file_name,
                parent: parent_folder,
                extension: extension,
                size: fs.statSync(result).size
            }
            new File(form).save().then(function(saved) {
                console.log("Saved File: " + saved.path);
            }).catch(function(err){
                console.log(err);
            })
        } else {
            let form = {
                path: result,
                name: file_name,
                parent: parent_folder,
                size: fs.statSync(result).size
            }
            new Dir(form).save().then(function(saved) {
                console.log("Saved Directory: " + saved.path);
            }).catch(function(err){
                console.log(err);
            })            
        }
    });
});



//configure app
app.use(logger('dev'));
//dust
app.set('views', __dirname + '/views');
app.engine('dust', kleiDust.dust);
app.set('view engine', 'dust');

app.use(express.static('./public'));
app.use('/preview/test',express.static(path.join(__dirname, 'test')));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));

// Initialize routers here
const routers = require('./routes/routers');

app.use('/', routers.root);
//app.use('/upload', routers.upload);

module.exports = app;
