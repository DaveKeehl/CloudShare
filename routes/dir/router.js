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
const event = require('../../pubsub');

const rootFolder = "test";

/** router for /dir */
module.exports = router;

// Directory get
router.get('/display/*', function(req,res){
	let dirpath = req.path.slice(9).replace(/%20/g,' ');
	let prevpath = dirpath.split('/');
	prevpath.pop();
	let previous = prevpath.join('/');
	let name_query = req.body.name;
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
				res.type('application/json').json({squery: false, previous: previous, path: dirpath, list: result});
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
	let filename = dirname + '.zip';
	fs.pathExists(dirpath).then(function(exists){
		if (exists){
			zipdir(dirpath, { saveTo: 'temp/' + filename,
							  filter: (path, stat) => !/\.zip$/.test(path) }, function (err, buffer) {
				if (err){
					console.log(err);
					res.status(500);
					res.end("There was a problem with the file compression!")
				}
				fs.readFile('temp/' + filename, 'binary', function(err, data){
					if(err) {
						res.status(500)
						res.end("There was a problem with reading the compressed file!");
					}
					res.status(202);
					res.set("Content-Disposition", "attachment;filename="+filename);
					res.write(data, 'binary');
					fs.remove('temp/' + filename).then(function(){
						res.end("Download Successfull!");
					}).catch(function(err){
						console.log(err);
						res.status(500);
						res.end("There was a problem with removing the compressed directory!");
					});
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
		event.emit('entry.created');
		if (req.accepts("html")) {
			res.status(201);
			res.end();
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
	let deleted;
	Entry.findOne({path: dirpath}).then(function(found){
		deleted = found;
		return Entry.deleteOne(found);
	}).then(function(_deleted){
		return Entry.deleteMany({parent: {$regex: dirpath}});
	}).then(function(_removed){
		return fs.remove(dirpath);
	}).then(function(){
		res.status(204);
		event.emit('entry.deleted');
		if (req.accepts("html")){
			res.end();
		} else {
			res.status(201).json(deleted);
		}
	}).catch(function(err){
		console.log(err);
		res.status(500);
		res.end("Delete Unsuccessfull!");
	})
});

// Directory renaming
router.put('/*', function(req,res){
	let dirpath = req.path.slice(1).replace(/%20/g,' ');
	let prevpath = path.dirname(dirpath);
	let dirname = req.body.dirname;
	if (!dirname){
		dirname = "newname";
	}

	let checkpath = path.join(prevpath,dirname);
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

 	fs.move(dirpath,creationpath).then(function(){
		return Entry.deleteMany({path: {$regex: dirpath}});
	}).then(function(_deleted){
		let stats = fs.statSync(creationpath);
        const form = {
        	isDir: true,
        	path: creationpath,
        	name: dirname,
        	parent: prevpath,
        	extension: null,
        	size: util.formatBytes(stats.size),
        	timeCreated: util.formatDate(stats.ctime),
        	dateCreated: util.formatDate(stats.ctime)
        }
        new Entry(form).save();	
		let paths = util.walk(creationpath);
		paths.forEach((result)=>{
            new Entry(result).save();         
        });

        res.status(202);
        res.end();
	}).catch(function(err){
		console.log(err);
		res.status(500);
		res.end("An Error Occured While Updating The Directory Name");
	});
});
