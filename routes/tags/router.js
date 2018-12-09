/** @module tags/router */
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

/** router for /tags */
module.exports = router;

// Add Tags
router.post('/*', function(req, res){
	let dirpath = req.path.slice(1);
	let tags_query = req.query.tags;
	let tags = tags_query.replace(/\s/g,'').split(',');	
	let foundentry;
	let foundtags;
	Entry.findOne({path: dirpath}).then(function(found){
		foundentry = found;
		foundtags = found.tags;
		return Entry.deleteOne(found);
	}).then(function(_deleted){
		tags.forEach((tag) => {
			if (foundtags.includes(tag)){
				console.log("Entry already tagged with: " + tag);
			} else {
				console.log("Adding Tag: " + tag);
				foundtags.push(tag);
			}
		});		
		const form = {
			isDir: foundentry.isDir,
			path: foundentry.path,
			name: foundentry.name,
			parent: foundentry.parent,
			size: foundentry.size,
			extension: foundentry.extension,
			timeCreated: foundentry.timeCreated,
			dateCreated: foundentry.dateCreated,
			tags: foundtags
		};
		return new Entry(form).save();
	}).then(function(saved){
		res.status(201);
		res.end("Successfully Added Tags to Entry: " + saved.path);
	}).catch(function(err){
		res.status(500);
		res.end(err);
	});
});

router.delete('/*', function(req, res){
	let dirpath = req.path.slice(1);
	let tags_query = req.query.tags;
	let tags = tags_query.replace(/\s/g,'').split(',');	
	let foundentry;
	let foundtags;
	Entry.findOne({path: dirpath}).then(function(found){
		foundentry = found;
		foundtags = found.tags;
		return Entry.deleteOne(found);
	}).then(function(_deleted){
		tags.forEach((tag) => {
			if (foundtags.includes(tag)){
				console.log("Removing Tag: " + tag);
				let index = foundtags.indexOf(tag);
				foundtags.splice(index, 1);
			} else {
				console.log("Entry Does Not Contain Tag: " + tag);
			}
		});		
		const form = {
			isDir: foundentry.isDir,
			path: foundentry.path,
			name: foundentry.name,
			parent: foundentry.parent,
			size: foundentry.size,
			extension: foundentry.extension,
			timeCreated: foundentry.timeCreated,
			dateCreated: foundentry.dateCreated,
			tags: foundtags
		};
		return new Entry(form).save();
	}).then(function(saved){
		res.status(204);
		res.end("Successfully Deleted Tags from Entry: " + saved.path);
	}).catch(function(err){
		res.status(500);
		res.end(err);
	});
});

// Clear Tags
router.put('/*', function(req, res){
	let dirpath = req.path.slice(1);
	let foundentry;
	Entry.findOne({path: dirpath}).then(function(found){
		foundentry = found;
		return Entry.deleteOne(found);
	}).then(function(_deleted){
		const form = {
			isDir: foundentry.isDir,
			path: foundentry.path,
			name: foundentry.name,
			parent: foundentry.parent,
			size: foundentry.size,
			extension: foundentry.extension,
			timeCreated: foundentry.timeCreated,
			dateCreated: foundentry.dateCreated,
			tags: []
		};
		return new Entry(form).save();
	}).then(function(saved){
		res.status(205);
		res.end("Tags Successfully Cleared For Entry: " + saved.path);
	}).catch(function(err){
		res.status(500);
		res.end(err);
	});
});