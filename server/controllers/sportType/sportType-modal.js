var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sTypeSchema = new Schema({
    name: { type: String, required: true, unique: true },
    images: { type: String, required: false },
    created_at: Date,
    updated_at: Date,
});
sTypeSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var SportType = mongoose.model('SportType', sTypeSchema);
module.exports = SportType;