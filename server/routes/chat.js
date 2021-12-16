const sequenceGenerator = require('./sequenceGenerator');
const Chat = require('../models/chat');

var express = require('express');
var router = express.Router();
module.exports = router;

var CurrentSender = "101"; // ToDo >> Hard Coded

router.get('/', (req, res, next) => {
    Chat.find()
        .populate()
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(error => {
            errorCatch(error, res);
        });
});

router.post('/', (req, res, next) => {

    const maxChatId = sequenceGenerator.nextId("chat");
    console.log(req.body);
    const message = new Chat({
        id: maxChatId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender, // TODO: Hard-coded value
        conversation: req.body.conversation,
        timestamp: Date.now()
    });

    message.save()
        .then(createdMessage => {
            res.status(201).json({
                message: 'Message added successfully',
                message: createdMessage
            });
        })
        .catch(error => {
            errorCatch(error, res);
        });
});

// router.put('/:id', (req, res, next) => {
//     Chat.findOne({
//             id: req.params.id
//         })
//         .then(message => {
//             message.subject = req.body.subject;
//             message.msgText = req.body.msgText;
//             message.sender = CurrentSender; // TODO: Hard-coded value

//             Message.updateOne({
//                     id: req.params.id
//                 }, message)
//                 .then(result => {
//                     res.status(204).json({
//                         message: 'Message updated successfully'
//                     })
//                 })
//                 .catch(error => {
//                     errorCatch(error, res);
//                 });
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: 'Message not found.',
//                 error: {
//                     message: 'Message not found'
//                 }
//             });
//         });
// });

router.delete("/:id", (req, res, next) => {
    Chat.findOne({
            id: req.params.id
        })
        .then(message => {
            Chat.deleteOne({
                    id: req.params.id
                })
                .then(result => {
                    res.status(204).json({
                        message: "Message deleted successfully"
                    });
                })
                .catch(error => {
                    errorCatch(error, res);
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Message not found.',
                error: {
                    message: 'Message not found'
                }
            });
        });
});

function errorCatch(error, res) {
    return res.status(500).json({
        message: 'An error occurred',
        error: error
    });
}

module.exports = router;