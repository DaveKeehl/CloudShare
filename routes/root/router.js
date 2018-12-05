/** @module root/router */
'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
require('../../models/Entries');
const Entry = mongoose.model('Entries');

const rootFolder = "test";
const currentFolder = rootFolder;

/** router for /root */
module.exports = router;

// Default get, routes the user immediately to the root
router.get('/', function(req, res){
	res.redirect('/dir/'+rootFolder);
});

// A general search function that starts from the root and returns all files
// matching criteria using an OR
router.get('/search',function(req,res){
	let name_query = req.query.name;
	let date_query = req.query.dateCreated;
	let extension_query = req.query.extension;
	let tags_query = req.query.tags;
	let size_query = req.query.size;
	Entry.find({$or: [{name: name_query},
					 {size: size_query},
			         {dateCreated: date_query},
					 {extension: extension_query},
					 {tags: tags_query}]})
	.then(function(result){
		res.status(200);
		if(req.accepts('html')) {
			res.render('index', {path: dirpath, list: result});
		} else {
			res.type('application/json').json(result);
		}
	}).catch(function(err){
		res.status(500);
		res.end("Internal Server Error!");
	});
});

// A directory specific search function that starts from
// the specified URL of directory and returns all files
// matching criteria using an OR
/*router.get('/search/*',function(req,res){
	let dirpath = req.originalUrl.split('/dir/')[1];
	let name_query = req.query.name;
	let date_query = req.query.dateCreated;
	let extension_query = req.query.extension;
	let tags_query = req.query.tags;
	File.find({$and: [{parent: dirpath},
					  {$or: [{name: name_query},
					 		 {size: size_query},
			        		 {dateCreated: date_query},
							 {extension: extension_query},
							 {tags: tags_query}]}]})
	.then(function(result){
		res.status(200);
		if(req.accepts('html')) {
			res.render('index', {list: result});
		} else {
			res.type('application/json').json(result);
		}
	}).catch(function(err){
		res.status(404);
		res.end("File With Specified Properties Does Not Exist!");
	});
});*/
