/** @module models/index.js
* Loads all models
*/
'use strict';

const mongoose = require('mongoose');

require('./Files');

module.exports = {
  'Files' : mongoose.model('Files')
}

