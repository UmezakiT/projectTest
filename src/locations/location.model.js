const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    locationName: { type: String, required: true },
    locationDescription: { type: String, required: true },
    locationPicture: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    userID: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Location', schema);