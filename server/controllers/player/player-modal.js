var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    teams: { type: [{ team_id: String }], required: false },
    groups: { type: [{ group_id: String }], required: false },
    availability: Boolean,
    images: { type: String, required: false },
    extra: {
        manOfTheMatch: Number,
        comments: {
            type: [{ player_id: String, comment: String, created_at: Date }], required: false
        },
        likes: Number,
        disLikes: Number,
        points: Number
    },
    age: Number,
    wight: Number,
    height: Number,
    sportsType: [{ sportTypeId: String, position: String, sportRate: Number }],
    location: { type: { lat: String, lng: String }, required: false },
    created_at: Date,
    updated_at: Date,
});
playerSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Player = mongoose.model('Player', playerSchema);
module.exports = Player;