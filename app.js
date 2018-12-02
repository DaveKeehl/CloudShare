const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const kleiDust = require('klei-dust');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('./models/Paths');
const Path = mongoose.model('Paths');

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
    	let form = {
    		path: result,
    		name: file_name,
    		parent: parent_folder,
    		extension: extension,
    		size: fs.statSync(result).size
    	}
    	new Path(form).save().then(function(saved) {
    		console.log("Saved: " + saved.path);
    	}).catch(function(err){
    		console.log(err);
    	})
    });
});



//configure app
app.use(logger('dev'));

app.set('view engine', 'dust');
app.set('views', './views');
app.engine('dust', kleiDust.dust);

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}))

// Initialize routers here
const routers = require('./routes/routers');

app.use('/', routers.root);
app.use('/chat', routers.chat);
//app.use('/upload', routers.upload);

module.exports = app;
