/** @module root/router */
'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

const rootFolder = "test";
//const mongoose = require('mongoose');
//require('../../models/Favorites');
//const Favorite = mongoose.model('Favorites');

/** router for /root */
module.exports = router;

router.get('/', function(req, res){
	fs.readdirSync("../../" + rootFolder, true).forEach(file => {
		if(file.isFile()){
			res.render('file', {});
		} else {
			res.render('directory', {});
		}
	})
	res.render('index', {});
});
