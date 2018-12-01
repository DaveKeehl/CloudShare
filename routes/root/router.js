/** @module root/router */
'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
require('../../models/Paths');
const Path = mongoose.model('Paths');

const rootFolder = "test";

/** router for /root */
module.exports = router;

router.get('/', function(req, res){
	fs.readdirSync(rootFolder).forEach((file) => {
		//console.log(file);
	});
	res.render('index',{});
});
