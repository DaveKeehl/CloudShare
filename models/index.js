/** @module models/index.js
* Loads all models
*/
'use strict';

const mongoose = require('mongoose');

require('./Entries');


module.exports = {
  'Files' : mongoose.model('Files'),
  'Dirs' : mongoose.model('Dirs')
}
