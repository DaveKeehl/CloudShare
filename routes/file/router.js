/** @module file/router */
'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs-extra');
const formidable = require('formidable');
const util = require('../../util');
const mongoose = require('mongoose');
require('../../models/Entries');
const Entry = mongoose.model('Entries');
const event = require('../../pubsub');

const rootFolder = "test";

/** router for /file */
module.exports = router;

// Download  a file
router.get('/*', function(req, res){
	let dirpath = req.path.slice(1).replace(/%20/g,' ');
	Entry.findOne({path: dirpath}).then(function(result){
		fs.readFile(result.path, 'binary', function(err, file){
			if(err) {
				res.status(500)
				res.end();
			} else {
				res.status(202);
				res.set("Content-Disposition", "attachment;filename="+result.name);
				res.write(file, 'binary');
				res.end();
			}
		})
	}).catch(function(err) {
		res.status(400);
		res.end("File Could Not Be Downloaded!");
	});
});

// Delete a file
router.delete('/*', function(req, res) {
    let dirpath = req.path.slice(1).replace(/%20/g,' ');
    let previous;
	Entry.findOne({path: dirpath}).then(function(found){
	    if (!found) {
	        res.status(404);
	        res.end("No Entries Found!");
	    } else {
	    	previous = found.parent;
	        return Entry.deleteOne(found);
	    }
	}).then(function(deleted){
		return fs.remove(dirpath);
	}).then(function(){
		if (req.accepts("html")) {
			res.status(204);
			// event.emit('entry.deleted');
			res.redirect("/dir/display/"+previous);
		} else {
			// event.emit('entry.deleted');
			res.json(removed);
		}
	}).catch(function(err){
		res.status(500).end("Internal Server Error!");
	});
});

// Add a file
router.post('/*', function(req,res) {
	let dirpath = req.path.slice(1).replace(/%20/g,' ');
	let file = req.files['choose-file'];
	file.forEach((file)=>{
		let extless = file.name.split('.')[0];
		let extension = path.extname(file.name);
		let newname = extless + extension;
		let checkpath = path.join(dirpath,newname);
		let creationpath = checkpath;
		let present = true;
		let counter = -1;
		while(present){
			if(fs.pathExistsSync(checkpath)){
				counter += 1;
				newname = extless + " (" + counter + ")" + extension;
				checkpath = path.join(dirpath,newname);
			} else {
				creationpath = checkpath;
				present = false;
			}
		}

		fs.writeFile(creationpath,file.data,{flag: 'w+'}).then(function(){
			const form = {
				isDir: false,
				path: creationpath,
				name: newname,
				parent: dirpath,
				size: util.formatBytes(file.size),
				extension: extension
			};
			new Entry(form).save();
		}).catch(function(err){
			console.log(err);
			res.status(500)
			res.end("An Error Occured In Uploading The File");
		});
	});
	res.status(201);
	res.redirect("/dir/display/"+dirpath);
});

router.put('/*', function(req,res){
	let dirpath = req.path.slice(1).replace(/%20/g,' ');
	let parentpath = path.dirname(dirpath);
	let extname = path.extname(dirpath);
	
	let newname = req.body.newname;
	if (!newname){
		newname = "newname";
	}
	
	let newpath = path.join(parentpath,newname+extname);
	let checkpath = newpath;
	let creationpath = checkpath;
	let creationname = newname;
	let present = true;
	let counter = -1;
	while(present){
		if(fs.pathExistsSync(checkpath)){
			counter += 1;
			creationname = newname + " (" + counter + ")";
			checkpath = path.join(parentpath, creationname+extname);
		} else {
			creationpath = checkpath;
			present = false;
		}
	}
	let old;

 	fs.move(dirpath,creationpath).then(function(){
		return Entry.findOne({path: dirpath})
	}).then(function(found){
		old = found;
		let stats = fs.statSync(creationpath)
		const form = {
			isDir: false,
			path: creationpath,
			name: creationname+extname,
			parent: parentpath,
			size: found.size,
			extension: extname,
			timeCreated: util.formatTime(stats.ctime),
			dateCreated: util.formatDate(stats.ctime),
			tags: found.tags
		};
		return new Entry(form).save();
	}).then(function(_saved){
		return Entry.deleteOne(old);
	}).then(function(_deleted){
		res.status(200);
		res.redirect("/dir/display/"+parentpath);
	}).catch(function(err){
		console.log(err);
		res.status(500);
		res.end("An Error Occured While Updating The File");
	});
});
