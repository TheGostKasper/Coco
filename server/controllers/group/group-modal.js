var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
    name: { type: String, required: true, unique: true },
    images: { type: String, required: false },
    extra: {
        matches: [{
            destination: String, players: Number, time_start: Date, time_End: Date
        }],
        shared: [{
            name: String, player_id: Number, coast: Number
        }],
        comments: [{ player_id: Number, comment: String, created_at: Date }],
        teams: Array,
        likes: Number,
        disLikes: Number,
        points: Number
    },
    admins: [{ player_id: Number }],
    players: Array,
    sportType: Number,
    availability: Boolean,
    rate: Number,
    created_at: Date,
    updated_at: Date,
});
groupSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Group = mongoose.model('Group', groupSchema);
module.exports = Group;