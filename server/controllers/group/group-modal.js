var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
    name: { type: String, required: true, unique: true },
    images: { type: String, required: false },
    extra: {
        shared: [{
            name: String, player_id: Number, coast: Number
        }],
        comments: [{ player_id: String, comment: String, created_at: Date }],
        likes: { type: Number, default: 0 },
        points: { type: Number, default: 0 }
    },
    teams: [{ team_id: String }],
    players: { type: [{ player_id: String }], required: false },
    availability: Boolean,
    rate: { type: Number, default: 5 },
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