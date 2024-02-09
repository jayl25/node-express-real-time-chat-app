
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderID: {
        type: String,
        required: true
    },

    senderUsername: {
        type: String,
        required: true
    },
    receiverUsername: {
        type: String,
        required: true
    },

    receiverID: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    chatRoomID: {
        type: String,
        required: true,
    },
    sentOn: {
        type: Date,
        default: Date.now()
    }
});

const Message = mongoose.model('Messages', messageSchema);
module.exports = Message;