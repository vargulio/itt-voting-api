const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const userSchema = new Schema({
    username: String,
    password: String,
    hasVoted: Boolean
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;