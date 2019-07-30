const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    following: { type: Array, required: true },
    followers: { type: Array, required: true },
    listings: { type: Array, required: true },
    likes: { type: Array, required: true },
    retweets: { type: Array, required: true },
    prefs: { type: Array, required: true },
    cart: { type: Array, required: true },
    image: {type: String, required: true},
    gender: { type: String, enum: ['Female', 'Male', 'Rather not specify'], default: 'Rather not specify' },
    size: {type: String, enum: ['XS', 'Small', 'Medium', 'Large', 'XL', 'XXL', 'Unknown'], default: 'Unknown'}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
