var Sequence = require('../models/sequence');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var maxUserId;
var maxConversationId;
var sequenceId = "61a1ec1fb5999f70d6ed8de3";

function SequenceGenerator() {

    Sequence.findOne()
        .exec(function(err, sequence) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            sequenceId = sequence._id;
            maxDocumentId = sequence.maxDocumentId;
            maxMessageId = sequence.maxMessageId;
            maxContactId = sequence.maxContactId;
            maxUserId = sequence.maxUserId;
            maxConversationId = sequence.maxConversationId;
        });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

    var updateObject = {};
    var nextId;

    switch (collectionType) {
        case 'documents':
            maxDocumentId++;
            updateObject = { maxDocumentId: maxDocumentId };
            nextId = maxDocumentId;
            break;
        case 'messages':
            maxMessageId++;
            updateObject = { maxMessageId: maxMessageId };
            nextId = maxMessageId;
            break;
        case 'contacts':
            maxContactId++;
            updateObject = { maxContactId: maxContactId };
            nextId = maxContactId;
            break;
        case 'users':
            maxUserId++;
            updateObject = { maxUserId: maxUserId };
            nextId = maxUserId;
            break;
        case 'conversations':
            maxConversationId++;
            updateObject = { maxConversationId: maxConversationId };
            nextId = maxConversationId;
            break;
        default:
            return -1;
    }

    Sequence.update({ _id: sequenceId }, { $set: updateObject },
        function(err) {
            if (err) {
                console.log("nextId error = " + err);
                return null
            }
        });

    return nextId;
}

module.exports = new SequenceGenerator();