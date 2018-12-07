/** @module root/router */
'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');
const mongoose = require('mongoose');
const util = require('../../util');
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
		Entry.find({$and: [{parent: dirpath},{name: name_query}]}, null, {sort: {isDir: -1, name: 1}})
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
		Entry.find({parent: dirpath}, null, {sort: {isDir: -1, name: 1}})
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
	fs.mkdir(dirpath, function(err){
		if(err){
			console.log(err);
			return
		}
		let stats = fs.statSync(dirpath);
		let file_name = path.basename(dirpath);
		let parent_folder = path.dirname(dirpath);

		const form = {
			isDir: stats.isDirectory(),
			path: dirpath,
			name: file_name,
			parent: parent_folder,
			extension: null,
			size: util.formatBytes(stats.size),
			timeCreated: util.formatTime(stats.ctime),
			dateCreated: util.formatDate(stats.ctime)
		};

		new Entry(form).save().then(function(saved) {
			console.log("Created Directory: " + saved.path);
			if (req.accepts("html")) {
				res.status(201);
				res.redirect("/"+dirpath);
			} else {
				res.status(201).json(saved);
			}
		}).catch(function(err){
			res.status(400);
			res.end("Bad Method!");
		});	
	});
});

// Directory deletion
router.delete('/*', function(req,res){
	let dirpath = req.path.slice(1);
	let foundparent;
	fs.rmdir(dirpath, function(err){
		if(err){
			console.log(err);
			return
		}
		Entry.findOne({path: dirpath}).then(function(found){
			if(found){
				foundparent = found.parent;
				return found;
			} else {
				res.status(404);
				res.end("Specified Directory Does Not Exist!");
			}
		}).then(function(found){
			return Entry.deleteOne(found);
		}).then(function(deleted){
			console.log("Deleted Directory: " + dirpath);
			if (req.accepts("html")) {
				res.status(204);
				res.redirect("/"+foundparent);
			} else {
				res.status(204).json(saved);
			}
		}).catch(function(err){
			console.log(err);
			res.status(400);
			res.end("Bad Method!");			
		})
	});	
});

// Directory replacement
router.put('/*', function(req,res){
	let dirpath = req.path.slice(1);
	fs.mkdirSync(dirpath);
	Entries.findOne(dirpath, function(err, found){
		if(err){
			res.status(400).end();
		}
		else if(found === null){
			const entry = new Entries ({
				isDir: req.body.isDir,
				path: req.body.path,
				name: req.body.name,
				parent: req.body.parent,
				extension: req.body.extension,
				size: req.body.size,
				timeCreated: req.body.timeCreated,
				dateCreated: req.body.dateCreated
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
			});
		}
		else {
			if (req.body.isDir) {
					found.isDir = req.body.isDir;
			}
			if (req.body.path) {
					found.path = req.body.path;
			}
			if (req.body.name) {
					found.name = req.body.name;
			}
			if (req.body.parent) {
					found.parent = req.body.parent;
			}
			if(req.body.extension){
				found.extension = req.body.extension;
			}
			if(req.body.size){
				found.size = req.body.size;
			}
			if(req.body.timeCreated) {
				found.timeCreated =req.body.timeCreated;
			}
			if(req.body.dateCreated) {
				found.dateCreated = req.body.dateCreated;
			}
			found.save(function(err, saved) {
					if (!err) {
							if (req.accepts("html")) {
									// event.emit('favorite.updated', saved);
									res.status(201);
									res.redirect("/");
							}
							else {
									// event.emit('favorite.updated', saved);
									res.status(201).json(saved);
							}
					}
					else {
							res.status(400).end();
					}
			});
		}
	});
	fs.renameSync(dirpath,)
	res.status(200);
	res.end('Directory ' + dirpath + ' created');
});
