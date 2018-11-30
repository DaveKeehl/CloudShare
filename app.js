const express = require('express');
//const methodOverride = require('method-override');
const logger = require('morgan');
const bodyParser = require('body-parser');
const kleiDust = require('klei-dust');
const mongoose = require('mongoose');

const app = express();

//configure database
//mongoose.connect('mongodb://localhost/canvas-dev');
//var db = mongoose.connection;
//db.once('open', function() {
//    console.log('Mongodb connection opened');
//});

//configure app
app.use(logger('dev'));

app.set('view engine', 'dust');
app.set('views', './views');
app.engine('dust', kleiDust.dust);

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}))
//app.use(methodOverride('_method'));

// Initialize routers here
const routers = require('./routes/routers');

app.use('/', routers.root);
//app.use('/favorites', routers.favorites);
//app.use('/tests', routers.tests);

module.exports = app;