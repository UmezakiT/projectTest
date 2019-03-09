const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    fishName: { type: String, required: true },
    fishDescription: { type: String, required: true },
    fishPicture: { type: String },
    fishSize: { type: Number, required: true },
    userID: { type: String, required: true },
    locationID: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Fish', schema);