const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/conversations');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', (req, res, next) => {
    Contact.find()
        .populate('group')
        .then(contacts => {
            res.status(200).json(contacts);
        })
        .catch(error => {
            errorCatch(error, res);
        });
});

router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("conversations");
    console.log("id: " + maxContactId);
    console.log("ct: " + JSON.stringify(req.body));
    const contact = new Contact({
        id: maxContactId,
        contacts: req.body.groupContacts
    });

    contact.save()
        .then(createdContact => {
            res.status(201).json({
                message: 'Conversation added successfully',
                contact: createdContact
            });
        })
        .catch(error => {
            errorCatch(error, res);
        });
});

// router.put('/:id', (req, res, next) => {
//     Contact.findOne({
//             id: req.params.id
//         })
//         .then(contact => {
//             contact.name = req.body.name;
//             contact.email = req.body.email;
//             contact.phone = req.body.phone;
//             contact.imageUrl = req.body.imageUrl;

//             Contact.updateOne({
//                     id: req.params.id
//                 }, contact)
//                 .then(result => {
//                     res.status(204).json({
//                         message: 'Conversation updated successfully'
//                     })
//                 })
//                 .catch(error => {
//                     errorCatch(error, res);
//                 });
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: 'Conversation not found.',
//                 error: {
//                     contact: 'Conversation not found'
//                 }
//             });
//         });
// });

router.delete("/:id", (req, res, next) => {
    Contact.findOne({
            id: req.params.id
        })
        .then(contact => {
            Contact.deleteOne({
                    id: req.params.id
                })
                .then(result => {
                    res.status(204).json({
                        message: "Conversation deleted successfully"
                    });
                })
                .catch(error => {
                    errorCatch(error, res);
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Conversation not found.',
                error: {
                    contact: 'Contact not found'
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