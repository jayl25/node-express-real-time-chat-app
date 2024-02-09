

const mongoose = require('mongoose');
const Message = require('../models/message');

const chatRoomSchema = new mongoose.Schema({
    
    id: {
        type: String,
        required: true,
    },

    users: {
        type: [String],
        required: true,
    },
    messages: {
        type: [String], // Storing references to message document IDs
        ref: 'Message', // Reference to the Messages collection
        default: [],
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
module.exports = ChatRoom;