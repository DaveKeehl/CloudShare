/** @module root/router */
'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
require('../../models/Paths');
const Path = mongoose.model('Paths');

const rootFolder = "test";
const currentFolder = rootFolder;

/** router for /root */
module.exports = router;

const preview_extensions = {
	'.html': 'text/html',
	'.css' : 'text/css',
	'.txt' : 'text/plain',
	'.mp4' : 'video/mp4',
	'.ogv' : 'video/ogg',
	'.gif' : 'image/gif',
	'.jpg' : 'image/jpeg',
	'.png' : 'image/png',
	'.mp3' : 'audio/mpeg',
	'.js'  : 'application/javascript',
	'.json': 'application/json',
	'.pdf' : 'application/pdf'
}

router.get('/', function(req, res){
	res.redirect('/displaydir?path='+rootFolder);
});

router.get('/displaydir', function(req, res){
	let dirpath_query = req.query.path;
	Path.find({parent: dirpath_query}).then(function(result){
		res.status(200);
		if(req.accepts('html')) {
			res.render('index', {list: result});
		} else {
			res.type('application/json').json(result);
		}	
	}).catch(function(err) {
		res.status(500);
		res.end("Internal Server Error: Server down!");
	});
});

router.post('/download', function(req, res){
	let filepath_query = req.query.path;
	Path.find({path: filepath_query}).then(function(result){
		res.status(202);
		res.download(filepath_query, result.name);
		res.end();
	}).catch(function(err) {
		res.status(400);
		res.end("File Could Not Be Downloaded!");
	});
});

router.get('/preview', function(req, res){
	let filepath_query = req.query.path;
	Path.find({path: filepath_query}).then(function(_result){

	});
});