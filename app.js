const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const kleiDust = require('klei-dust');
const methodOverride = require('method-override');
const path = require('path');
const fs = require('fs-extra');
const util = require('./util');
const mongoose = require('mongoose');
require('./models/Entries');
const Entry = mongoose.model('Entries');

const rootFolder = "test";

const app = express();

//Configure DB

mongoose.connect('mongodb://localhost/cloudshare-dev');
var db = mongoose.connection;
db.once('open', function() {
    console.log('Mongodb connection opened');
    console.log("Date: "+util.formatDate(new Date()));
    console.log("Time: "+util.formatTime(new Date()));
	let paths = util.walk(rootFolder);
	console.log("Initialising Database:")
    Entry.deleteMany({}).then(function(_deleted){
        paths.forEach((result)=>{
            console.log("---------------------------------------------\n");
            if(result.isDir){
                console.log("Saving Directory: " + result.path + "\n");
            } else {
                console.log("Saving File: " + result.path + "\n");
            }
            console.log("Stats:");
            console.log("Entry Name: " + result.name);
            console.log("Extension: " + result.extension);
            console.log("Parent Dir: " + path.basename(result.parent));
            console.log("Size: " + result.size);
            console.log("Created: " + result.timeCreated + " " + result.dateCreated);
            console.log("Tags: " + result.tags + "\n");
            new Entry(result).save();         
        });
    }).catch(function(err){
        console.log("An error occured in dropping the previous database:\n"+err);
    }); 
});

//Dust
app.set('views', __dirname + '/views');
kleiDust.setOptions({useHelpers : true});
app.engine('dust', kleiDust.dust);
app.set('view engine', 'dust');
//Statics, Mthod Override and Body Parsers
app.use(express.static('./public'));
app.use('/file/preview/test',express.static(path.join(__dirname, 'test')));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));
app.use(busboyBodyParser({ multi: true }));
app.use(methodOverride('_method'));
//Configure Logger
app.use(logger('dev'));

// Initialize routers here
const routers = require('./routes/routers');

app.use('/', routers.root);
app.use('/file', routers.file);
app.use('/dir', routers.dir);
app.use('/tags', routers.tags);

module.exports = app;
