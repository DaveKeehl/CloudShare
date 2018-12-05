/** @module models/favorites */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dateObj = new Date().toJSON();
const time = dateObj.slice(11,19);
const date = dateObj.slice(0,10).replace(/-/g,'/');

let Entries = new Schema({
	isDir: {type: 'boolean', required: true, default: true},
	path: {type: 'string', required: true, default: ""},
	name: {type: 'string', required: true, default: ""},
	parent: {type: 'string', required: true, default: ""},
	size: {type: 'number', required: true, default: 0},
	extension: {type: 'string', default: ""},
	timeCreated: {type: 'string', default: time},
	dateCreated: {type: 'string', default: date},
	tags: {type: 'string', default: ""}
});

mongoose.model('Entries', Entries);