var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Runway');

module.exports = mongoose;