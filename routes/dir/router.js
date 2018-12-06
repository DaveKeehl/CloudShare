/** @module root/router */
'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
require('../../models/Entries');
const Entry = mongoose.model('Entries');

const rootFolder = "test";

/** router for /root */
module.exports = router;

// Directory get
router.get('/*', function(req,res){
	let dirpath = req.path.slice(1);
	let prevpath = dirpath.split('/');
	prevpath.pop();
	let previous = prevpath.join('/');
	let name_query = req.query.name;
	if (name_query){
		Entry.find({$and: [{parent: dirpath},{name: name_query}]})
		.then(function(result){
			res.status(200);
			if(req.accepts('html')) {
				res.render('index', {squery: true, previous: previous, path: dirpath, list: result});
			} else {
				res.type('application/json').json(result);
			}
		}).catch(function(err){
			res.status(500);
			res.end("Internal Server Error!");
		});
	} else {
		Entry.find({parent: dirpath})
		.then(function(result){
			res.status(200);
			if(req.accepts('html')) {
				res.render('index', {squery: false, previous: previous, path: dirpath, list: result});
			} else {
				res.type('application/json').json(result);
			}
		}).catch(function(err){
			res.status(500);
			res.end("Internal Server Error!");
		});
	}
});

// Directory creation
router.post('/*', function(req,res){
	let dirpath = req.path.slice(1);
	res.end('POST ' + dirpath);
});

// Directory replacement
router.put('/*', function(req,res){
	let dirpath = req.path.slice(1);
	fs.mkdirSync(dirpath);
	//Put the directory reference into the database
	res.status(200);
	res.end('Directory ' + dirpath + ' created');
});

// Directory deletion
router.delete('/*', function(req,res){
	let dirpath = req.path.slice(1);
	res.end('DELETE ' + dirpath);
});

