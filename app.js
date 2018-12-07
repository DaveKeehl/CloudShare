const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const kleiDust = require('klei-dust');
const path = require('path');
const fs = require('fs-extra');
const util = require('./util');
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
    console.log("Date: "+util.formatDate(new Date()));
    console.log("Time: "+util.formatTime(new Date()));
	let paths = util.walk(rootFolder);
	console.log("Initialising Database:")
    paths.forEach((result)=>{
        Entry.findOne({path: result.path}).then(function(found){
            if (found) {
                //Add a check to check if the record fully matches
                //the file we want to add
                if(found.isDir){
                    console.log("Directory already in database: "+result.path);
                } else {
                    console.log("File already in database: "+result.path);
                }
            } else {
                if(result.isDir){
                    console.log("Saving Directory: " + result.path);
                } else {
                    console.log("Saving File: " + result.path);
                }              
                new Entry(result).save();        
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
