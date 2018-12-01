/** @module models/favorites */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Paths = new Schema({
	path: {type: 'string', required: true, default: "./"},
	name: {type: 'string', required: true, default: "New Upload"},
	extension: {type: 'string'},
	size: {type: 'number', required: true, default: 0},
	dateCreated: {type: 'string', default: Date.now()},
	tags: {type: 'string', default: ""}
});

mongoose.model('Paths', Paths);
