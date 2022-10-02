const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resultsSchema = new Schema({
    partyId: String,
    voters: Number
})

const Results = mongoose.model('Results', resultsSchema);

module.exports = Results;