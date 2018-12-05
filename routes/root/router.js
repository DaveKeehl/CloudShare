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

// Directory get
router.get('/dir/*', function(req,res){
	let dirpath = req.originalUrl.split('/dir/')[1];
	let prevpath = dirpath.split('/');
	Entry.find({parent: dirpath}).then(function(result){
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

// Directory creation
router.post('/dir/*', function(req,res){
	let dirpath = req.originalUrl.split('/dir/')[1];
	res.end('POST ' + dirpath);
});

// Directory replacement
router.put('/dir/*', function(req,res){
	let dirpath = req.originalUrl.split('/dir/')[1];
	fs.mkdirSync(dirpath);
	//Put the directory reference into the database
	res.status(200);
	res.end('Directory ' + dirpath + ' created');
});

// Directory deletion
router.delete('/dir/*', function(req,res){
	let dirpath = req.originalUrl.split('/dir/')[1];
	res.end('DELETE ' + dirpath);
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

// Download  a file
router.get('/download/*', function(req, res){
	let dirpath = req.originalUrl.split('/dir/')[1];
	Entry.find({path: dirpath}).then(function(result){
		res.status(202);
		res.download(dirpath, result.name);
		res.end();
	}).catch(function(err) {
		res.status(400);
		res.end("File Could Not Be Downloaded!");
	});
});

/* router.post('/upload', function(req,res) {
	const entry = new Entries ({
		isDir: req.body.isDir,
		path: req.body.path,
		name: req.body.name,
		parent: req.body.parent,
		extension: req.body.extension,
		size: req.body.size,
		timeCreated: req.body.timeCreated,
		dateCreated: req.body.dateCreated,
		tags: req.body.tags
	});
	entry.save(function(err, saved) {
			if (!err) {
					if (req.accepts("html")) {
							res.status(201);
							res.redirect("/");
					}
					else {
							res.status(201).json(saved);
					}
			}
			else {
					res.status(400).end();
			}
	});
});
*/

router.delete('/*', function(req, res) {
    let path = req.originalUrl;

	Entry.find({path: path}).then(function(found){
	    if (found == []) {
	        res.status(404).end("No Entries Found!");
			return;
	    }
	    else {
	        return Entry.remove(found);
	    }
	}).then(function(removed){
		if(removed.isDir) {
			fs.rmdirSync(path);
		} else {
			fs.unlinkSync(path);
		}
		if (req.accepts("html")) {
			res.status(204).redirect("/");
		} else {
			res.json(removed);
		}
	}).catch(function(err){
		res.status(500).end("Internal Server Error!");
	});
});

