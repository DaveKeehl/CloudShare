const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const kleiDust = require('klei-dust');
const path = require('path');
const fs = require('fs');
const scripts = require('./public/scripts/script');
const mongoose = require('mongoose');
require('./models/Entries');
const Entry = mongoose.model('Entries');

const rootFolder = "test";

const app = express();

//configure database

mongoose.connect('mongodb://localhost/cloudshare-dev');
var db = mongoose.connection;
db.once('open', function() {
    console.log('Mongodb connection opened');
    console.log("Date: "+scripts.formatDate(new Date()));
    console.log("Time: "+scripts.formatTime(new Date()));
	let paths = scripts.walk(rootFolder);
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
