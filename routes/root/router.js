/** @module root/router */
'use strict';

const express = require('express');
const router = express.Router();

//const mongoose = require('mongoose');
//require('../../models/Favorites');
//const Favorite = mongoose.model('Favorites');

/** router for /root */
module.exports = router;

router.get('/', function(req, res){
	res.render('index', {});
});
