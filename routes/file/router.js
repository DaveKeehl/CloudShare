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
	let dirpath = req.path.slice(1);
	Entry.find({path: dirpath}).then(function(result){
		res.status(202);
		res.set("Content-Disposition", "attachment;filename="+result.name);
		res.download(dirpath, result.name);
		res.end();
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
    let dirpath = req.path.slice(1);
    let redirect;
	Entry.findOne({path: path}).then(function(found){
	    if (!found) {
	        res.status(404);
	        res.end("No Entries Found!");
	    } else {
	        return Entry.deleteOne(found);
	    }
	}).then(function(deleted){
		return fs.remove(dirpath);
	}).then(function(){
		if (req.accepts("html")) {
			res.status(204).redirect("/"+redirect);
		} else {
			res.json(removed);
		}
	}).catch(function(err){
		res.status(500).end("Internal Server Error!");
	});
});