const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    subject: {
        type: String
    },
    msgText: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.String,
        ref: 'Contact'
    },
    conversation: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date
    }
});

module.exports = mongoose.model('Chat', ChatSchema);