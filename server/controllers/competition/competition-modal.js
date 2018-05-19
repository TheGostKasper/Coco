var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var competitionSchema = new Schema({
    hostId: { type: String, required: true },
    scheduleId: { type: String, required: true },
    pitchId: { type: String, required: true },
    home: { type: String, required: true },
    away: { type: String, required: true },
    winner: {
        type: { teamId: String, results: String }
    },
    extra: {
        comments: {
            type: [{ player_id: String, comment: String, created_at: Date }], require: false
        }
    },
    created_at: Date,
    updated_at: Date,
});

competitionSchema.pre('save', (next) => {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Competition = mongoose.model('Competition', competitionSchema);
module.exports = Competition;