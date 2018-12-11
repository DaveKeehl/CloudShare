/** @module file/router */
'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs-extra');
const formidable = require('formidable');
const mongoose = require('mongoose');
require('../../models/Entries');
const Entry = mongoose.model('Entries');

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
			res.redirect("/dir/display/"+previous);
		} else {
			res.json(removed);
		}
	}).catch(function(err){
		res.status(500).end("Internal Server Error!");
	});
});

// Add a file
router.post('/*', function(req,res) {
	let dirpath = req.path.slice(1).replace(/%20/g,' ');
	let prevpath = dirpath.split('/');
	prevpath.pop();
	let parentpath = prevpath.join('/');
	let form = new formidable.IncomingForm();
	form.uploadDir = parentpath;
	form.parse(req, function(err, _fields, files){
	    if(err) {
	    	console.log(err);
			res.status(500);
			res.end("An Error Has Occured!");
	    }
	    let tmpFile = files.file.path;
	    let destFile = path.join(parentpath, files.file.name);
	    var stat = fs.statSync(destFile);
	    const form ={
			isDir: false,
			path: destFile,
			name: tmpFile,
			parent: parentpath,
			size: formatBytes(stat.size),
			extension: path.extname(destFile),
			timeCreated: formatTime(stat.ctime),
			dateCreated: formatDate(stat.ctime),
			tags: []
		};  
	});
});