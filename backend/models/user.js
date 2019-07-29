const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
 email: {type: String, required: true, unique: true},
 password: {type: String, required: true},
 firstname: {type: String, required: true},
 lastname: {type: String, required: true},
 following: {type: Array, required:true },
 followers: {type: Array, required:true},
 listings: {type: Array, required:true},
 likes: {type: Array, required:true},
 retweets: {type: Array, required:true},
 prefs: {type: Array, required:true},
});

userSchema.plugin(uniqueValidator);

module.exports=mongoose.model('User', userSchema);
