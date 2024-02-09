
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user');
const ChatRoom = require('../models/chat-room');

dotenv.config({path: "./config.env"});

let db;

async function connectDB(){
    try{
        const DB_URI = process.env.DB_URI;
        db = await mongoose.connect(DB_URI);
        console.log("DB connection successful\n");
    }catch (error){
        console.error('Error connecting to the database:\n', error);
        throw error;
    }
}

function setupUserStream(){

    if (!db) {
        throw new Error('Database connection not established. Call connectDB first.');
    }

    const userStream = User.watch();
    
    userStream.on('change', (change) => {
        console.log('CRUD operation registered on User collection in DB');
        // Handle the change event as needed
    });

    console.log('User stream set up successfully');
}


function setupChatRoomStream(){
    if (!db) {
        throw new Error('Database connection not established. Call connectDB first.');
    }

    const chatRoomStream = ChatRoom.watch();

    chatRoomStream.on('change', (change) => {
        console.log('CRUD operation registered on ChatRoom collection in DB\n');
        // Handle the change event as needed
    });

    console.log('Chat Room stream set up successfully');

}

module.exports = {connectDB, setupUserStream, setupChatRoomStream};