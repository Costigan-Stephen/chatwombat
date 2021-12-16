const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    contacts: [{
        type: String,
        required: true,
        ref: 'Contact'
    }]
});

module.exports = mongoose.model('Conversation', conversationSchema);