var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pitchSchema = new Schema({
    name: { type: String, required: true },
    host_id: { type: String, required: true },
    images: { type: String, required: false },
    plrsBerTeam: Number,
    availability:Boolean,    
    type: String,
    rate: Number,
    created_at: Date,
    updated_at: Date
});
pitchSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Pitch = mongoose.model('Pitch', pitchSchema);
module.exports = Pitch;