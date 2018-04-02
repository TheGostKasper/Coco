var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
    day: String,
    start: String,
    end: String,
    pitch_id: String,
    created_at: Date,
    updated_at: Date
});
scheduleSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;