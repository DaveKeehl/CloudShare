/** @module models/favorites */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Files = new Schema({
	name: {type: 'string', required: true, default: "New Upload"},
	extension: {type: 'string'},
  path: {type: 'string', required: true, default: "./"},
	size: {type: 'number', required: true, default: 0},
	dateCreated: {type: 'string', default: Date.now()},
	tags: {type: 'string', required: true, default: ""}
});

mongoose.model('Files', Files);
