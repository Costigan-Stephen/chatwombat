const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    }]
});

module.exports = mongoose.model('Conversation', conversationSchema);