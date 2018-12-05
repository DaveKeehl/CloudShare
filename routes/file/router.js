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

/*
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
*/