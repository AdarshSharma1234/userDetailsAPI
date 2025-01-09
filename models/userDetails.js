const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
userName: { type: String, required: true },
age: { type: Number, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true }
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails;