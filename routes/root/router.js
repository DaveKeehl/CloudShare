/** @module root/router */
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

/** router for /root */
module.exports = router;

// Default get, routes the user immediately to the root
router.get('/', function(req, res){
	res.redirect('/dir/'+rootFolder);
});