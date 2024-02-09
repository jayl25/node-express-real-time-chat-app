
const User = require('../models/user');
const ChatRoom = require('../models/chat-room');
const Message = require('../models/message');

const loadDashboard = async (req, res) => {
    if (req.session.loggedIn) {
        const loggedInUsername = req.session.username;

        try {
            const users = await User.find({ username: { $ne: loggedInUsername } });
            
            res.locals.title = 'Dashboard';
            res.locals.users = users;
            
            res.render('index');
        } catch (err) {
            console.error('Error finding users:', err);
            return res.status(500).send('Internal Server Error');
        }
    } else {
        return res.redirect('/account/login');
    }
};

const getOrCreateChat = async (req, res) => {
    if (req.session.loggedIn){
        const selectedUsername = req.params.selectedUsername;
        const selectedUserId = req.params.selectedUserId;
        
        const usersIdList = [req.session.userId, selectedUserId].sort();
        const chatRoomId = usersIdList.join('_');

        try{
            let chatRoom = await ChatRoom.findOne({ id: chatRoomId });

            if (!chatRoom) {
                chatRoom = await ChatRoom.create({ id: chatRoomId, users: [req.session.username, selectedUsername] });
            }else{
                const messages = await Message.find({ chatRoomID: chatRoomId })
                                              .sort({ sentOn: 1 });

                res.locals.messages = messages;
            }
        }catch (error){
            console.error('Error: ', error);
            return res.status(500).send('Internal Server Error');
        }

        res.locals.title = `Chatting: ${selectedUsername}`;
        res.locals.selectedUsername = selectedUsername;
        res.locals.selectedUserId = selectedUserId;
        res.locals.roomID = chatRoomId;
        res.locals.currentUserID = req.session.userId
        
        res.render('chat-ui');
    }else{
        return res.redirect('/account/login');
    }
}

const sendMessage = async (req, res) => {
    const selectedUsername = req.params.selectedUsername;
    const selectedUserId = req.params.selectedUserId;
    const roomID = req.body.chatRoomId;
    const content = req.body.content;

    try{
        const chatRoom = await ChatRoom.findOne({id: roomID});

        const message = new Message({
            senderID: req.session.userId,
            senderUsername: req.session.username,
            receiverID: selectedUserId,
            receiverUsername: selectedUsername,
            chatRoomID: roomID,
            content: content,
        });
        await message.save();

        chatRoom.messages.push(message._id);
        await chatRoom.save();

    }catch (error){
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
    
    res.redirect(`/chat/${selectedUsername}/${selectedUserId}`);
}

module.exports = { loadDashboard, getOrCreateChat, sendMessage };
