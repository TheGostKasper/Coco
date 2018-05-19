var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
    hostId: { type: String, required: true },
    scheduleId: { type: String, required: true },
    pitchId: { type: String, required: true },
    playerId: { type: String, required: true },
    group: { type: boolean, required: false },
    created_at: Date,
    updated_at: Date,
});

reservationSchema.pre('save', (next) => {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;