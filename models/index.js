/** @module models/index.js
* Loads all models
*/
'use strict';

const mongoose = require('mongoose');

require('./Entries');


module.exports = {
  'Entries' : mongoose.model('Entries')
}
