/** @module models/favorites */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dateObj = new Date().toJSON();
const time = dateObj.slice(11,19);
const date = dateObj.slice(0,10).replace(/-/g,'/');

var Paths = new Schema({
	path: {type: 'string', required: true, default: "./"},
	name: {type: 'string', required: true, default: "New Upload"},
	parent: {type: 'string', required: true, default: "."},
	extension: {type: 'string'},
	size: {type: 'number', required: true, default: 0},
	dateCreated: {type: 'string', default: time + " " + date},
	tags: {type: 'string', default: ""}
});

mongoose.model('Paths', Paths);
