const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxMessageId: {
        type: String,
        required: true
    },
    maxContactId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Sequence', sequenceSchema);