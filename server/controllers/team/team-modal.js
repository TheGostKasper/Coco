var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    images: { type: String, required: false },
    extra: {
        matches: Number,
        comments: {
            type: [{ player_id: String, comment: String, created_at: Date }], require: false
        },
        likes: Number,
        disLikes: Number,
        points: Number,
        history: {
            won: Number,
            draw: Number,
            lost: Number
        }
    },
    admins: { type: [{ player_id: String }], required: false },
    players: { type: [{ player_id: String }], required: false },
    sportsType: [{ sportTypeId: String, sportRate: String }],
    availability: Boolean,
    created_at: Date,
    updated_at: Date,
});
teamSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Team = mongoose.model('Team', teamSchema);
module.exports = Team;