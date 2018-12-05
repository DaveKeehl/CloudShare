/** @module models/favorites */
const scripts = require('../public/scripts/script');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Entries = new Schema({
	isDir: {type: 'boolean', required: true, default: true},
	path: {type: 'string', required: true, default: ""},
	name: {type: 'string', required: true, default: ""},
	parent: {type: 'string', required: true, default: ""},
	size: {type: 'string', required: true, default: ""},
	extension: {type: 'string', default: ""},
	timeCreated: {type: 'string', default: scripts.formatTime(new Date())},
	dateCreated: {type: 'string', default: scripts.formatDate(new Date())},
	tags: {type: 'string', default: ""}
});

mongoose.model('Entries', Entries);