/** @module dir/router */
'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const zipdir = require('zip-dir');
const path = require('path');
const mongoose = require('mongoose');
const util = require('../../util');
require('../../models/Entries');
const Entry = mongoose.model('Entries');

const rootFolder = "test";

/** router for /dir */
module.exports = router;

// Directory get
router.get('/display/*', function(req,res){
	let dirpath = req.path.slice(9).replace(/%20/g,' ');
	let prevpath = dirpath.split('/');
	prevpath.pop();
	let previous = prevpath.join('/');
	let name_query = req.query.name;
	//For now, sorting is statically predefined
	//to sorting first by whether entries are
	//directories or files, and then by name
	let sort_critareon = {
		isDir: -1,
		name: 1
	};

	if (name_query){
		Entry.find({$and: [{parent: dirpath},{name: {$regex: name_query}}]}, null, {sort: sort_critareon})
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
		Entry.find({parent: dirpath}, null, {sort: sort_critareon})
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

// Directory download
router.get('/download/*', function(req,res){
	let dirpath = req.path.slice(10).replace(/%20/g,' ');
	let dirname = path.basename(dirpath);
	fs.pathExists(dirpath).then(function(exists){
		if (exists){
			zipdir(dirpath, { saveTo: 'temp/' + dirname + '.zip', 
							  filter: (path, stat) => !/\.zip$/.test(path) }, function (err, buffer) {
				if (err){
					console.log(err);
					res.status(500);
					res.end("There was a problem with the file compression!")
				}
				fs.readFile('temp/' + dirname + '.zip', 'binary', function(err, file){
					if(err) {
						res.status(500)
						res.end("There was a problem with reading the compressed file!");
					} else {
						res.status(202);
						res.set("Content-Disposition", "attachment;filename="+dirname+".zip");
						res.write(file, 'binary');
						fs.remove('temp/' + dirname + '.zip').then(function(){
							res.end("Download Successfull!");
						}).catch(function(err){
							console.log(err);
							res.status(500);
							res.end("There was a problem with removing the compressed directory!");
						});
					}
				})
			});
		} else {
			res.status(404);
			res.end("Directory Could Not Be Found!")
		}
	});
});

// Directory creation
router.post('/*', function(req,res){
	let dirpath = req.path.slice(1).replace(/%20/g,' ');
	console.log(dirpath);
	let dirname = req.body.folder_name;
	if (!dirname){
		dirname = "New Folder";
	}
	let checkpath = path.join(dirpath,dirname);
	let creationpath = checkpath;

	let present = true;
	let counter = -1;
	while(present){
		if(fs.pathExistsSync(checkpath)){
			counter += 1;
			checkpath = creationpath + " (" + counter + ")";
		} else {
			creationpath = checkpath;
			present = false;
		}
	}

	fs.mkdir(creationpath).then(function(){
		let stats = fs.statSync(creationpath);
		let file_name = path.basename(creationpath);
		let parent_folder = path.dirname(creationpath);
		const form = {
			isDir: stats.isDirectory(),
			path: creationpath,
			name: file_name,
			parent: parent_folder,
			extension: null,
			size: util.formatBytes(stats.size),
			timeCreated: util.formatTime(stats.ctime),
			dateCreated: util.formatDate(stats.ctime)
		};
		return new Entry(form).save();
	}).then(function(saved) {
		if (req.accepts("html")) {
			res.status(201);
			res.redirect("/dir/display/"+dirpath);
		} else {
			res.status(201).json(saved);
		}
	}).catch(function(err){
		console.log(err);
		res.status(500);
		res.end("Something Went Wrong!");
	});
});

// Directory deletion
router.delete('/*', function(req,res){
	let dirpath = req.path.slice(1).replace(/%20/g,' ');
	let prevpath = dirpath.split('/');
	prevpath.pop();
	let previous = prevpath.join('/');
	Entry.findOne({path: dirpath}).then(function(found){
		return Entry.deleteOne(found);
	}).then(function(_deleted){
		return Entry.deleteMany({parent: {$regex: dirpath}});
	}).then(function(_removed){
		return fs.remove(dirpath);
	}).then(function(){
		res.status(204);
		res.redirect("/dir/display/"+previous);
	}).catch(function(err){
		console.log(err);
		res.status(500);
		res.end("Delete Unsuccessfull!");
	})
});

// Directory renaming
router.put('/*', function(req,res){
	let dirpath = req.path.slice(1).replace(/%20/g,' ');
	let prevpath = dirpath.split('/');
	prevpath.pop();
	let previous = prevpath.join('/');
	let newname = req.body.new_name;
	let newpath = path.join(previous,newname);
	let old;
	Entry.findOne({path: dirpath}).then(function(found){
		old = found;
		const form = {
			isDir: found.isDir,
			path: newpath,
			name: newname,
			parent: found.parent,
			extension: found.extension,
			size: found.size,
			timeCreated: found.timeCreated,
			dateCreated: found.dateCreated
		};		
	});
});

// router.put('/*', function(req,res){
// 	let dirpath = req.path.slice(1);
// 	fs.mkdirSync(dirpath);
// 	Entry.findOne(dirpath, function(err, found){
// 		if(err){
// 			res.status(400).end();
// 		}
// 		else if(found === null){
// 			const entry = new Entries ({
// 				isDir: req.body.isDir,
// 				path: req.body.path,
// 				name: req.body.name,
// 				parent: req.body.parent,
// 				extension: req.body.extension,
// 				size: req.body.size,
// 				timeCreated: req.body.timeCreated,
// 				dateCreated: req.body.dateCreated
// 			});
// 			entry.save(function(err, saved) {
// 					if (!err) {
// 							if (req.accepts("html")) {
// 									res.status(201);
// 									res.redirect("/");
// 							}
// 							else {
// 									res.status(201).json(saved);
// 							}
// 					}
// 			});
// 		}
// 		else {
// 			if (req.body.isDir) {
// 					found.isDir = req.body.isDir;
// 			}
// 			if (req.body.path) {
// 					found.path = req.body.path;
// 			}
// 			if (req.body.name) {
// 					found.name = req.body.name;
// 			}
// 			if (req.body.parent) {
// 					found.parent = req.body.parent;
// 			}
// 			if(req.body.extension){
// 				found.extension = req.body.extension;
// 			}
// 			if(req.body.size){
// 				found.size = req.body.size;
// 			}
// 			if(req.body.timeCreated) {
// 				found.timeCreated =req.body.timeCreated;
// 			}
// 			if(req.body.dateCreated) {
// 				found.dateCreated = req.body.dateCreated;
// 			}
// 			found.save(function(err, saved) {
// 					if (!err) {
// 							if (req.accepts("html")) {
// 									// event.emit('favorite.updated', saved);
// 									res.status(201);
// 									res.redirect("/");
// 							}
// 							else {
// 									// event.emit('favorite.updated', saved);
// 									res.status(201).json(saved);
// 							}
// 					}
// 					else {
// 							res.status(400).end();
// 					}
// 			});
// 		}
// 	});
// 	fs.renameSync(dirpath,)
// 	res.status(200);
// 	res.end('Directory ' + dirpath + ' created');
// });
