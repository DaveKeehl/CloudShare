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
	}).catch(function(err){
		res.status(404);
		res.end("Directory Not Found!");
	});
});

router.get('/download', function(req, res){
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

router.get('/search',function(req,res){
	let current_dir = req.query.parent;
	let name_query = req.query.name;
	let date_query = req.query.dateCreated;
	let extension_query = req.query.extension;
	let tags_query = req.query.tags;
	Path.find({$and: [{parent: current_dir},
					  {$or: [{name: name_query},
						     {dateCreated: date_query},
						     {extension: extension_query},
						     {tags: tags_query}]}]})
	.then(function(result){
		if(req.accepts('html')) {
			res.render('index', {list: result});
		} else {
			res.type('application/json').json(result);
		}
	}).catch(function(err){
		res.status(500);
		res.end("Database Communication Error!");
	});
});