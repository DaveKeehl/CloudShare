/** @module file/router */
'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
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
				res.status(500).end();
				return;
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

/* router.post('/*', function(req,res) {
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
    let dirpath = req.path.slice(1).replace(/%20/g,' ');
    let redirect;
	Entry.findOne({path: dirpath}).then(function(found){
	    if (!found) {
	        res.status(404);
	        res.end("No Entries Found!");
	    } else {
	    	redirect = found.parent;
	        return Entry.deleteOne(found);
	    }
	}).then(function(deleted){
		return fs.remove(dirpath);
	}).then(function(){
		if (req.accepts("html")) {
			res.status(204).end();
		} else {
			res.json(removed);
		}
	}).catch(function(err){
		res.status(500).end("Internal Server Error!");
	});
});