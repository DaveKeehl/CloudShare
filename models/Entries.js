/** @module models/favorites */
const util = require('../util');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Entries = new Schema({
	isDir: {type: Boolean, required: true, default: true},
	path: {type: String, required: true, default: ""},
	name: {type: String, required: true, default: ""},
	parent: {type: String, required: true, default: ""},
	size: {type: String, required: true, default: ""},
	extension: {type: String, default: ""},
	timeCreated: {type: String, default: util.formatTime(new Date())},
	dateCreated: {type: String, default: util.formatDate(new Date())},
	tags: {type: [String], default: []}
});

mongoose.model('Entries', Entries);