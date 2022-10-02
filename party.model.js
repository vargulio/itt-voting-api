const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const partySchema = new Schema({
    name: String,
    slogan: String,
    picture: String,
    leader: String,
    agitation: String
})
partySchema.index({name: 'text'});

const Parties = mongoose.model('Parties', partySchema);

module.exports = Parties;