var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hostSchema = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: { lat: String, lng: String }, unique: false },
    availability: Boolean,
    phones: String,
    images: String,
    rate: Number,
    created_at: Date,
    updated_at: Date
});
hostSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Host = mongoose.model('Host', hostSchema);
module.exports = Host;