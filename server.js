'use strict'

const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');

const http = require('http');

const authRouter = require('./routes/authRoutes');
const chatUIRouter = require('./routes/chatUIRoutes');

const checkAuth = require('./middleware/checkAuth');
const { connectDB, setupUserStream, setupChatRoomStream } = require('./services/dbConfig');


dotenv.config({path: "./config.env"});

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

connectDB()
    .then(() => {
        setupUserStream();
        setupChatRoomStream();
    })
    .catch((error) => {
        console.error('Error:', error);
    });

app.use(express.static('public'));

app.use(session({
  secret: '$eCret$e$sion',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use(checkAuth);
app.use('', chatUIRouter);
app.use('/account', authRouter);

server.listen(port, () => {
    console.log(`Listening to requests at http://localhost:${port}`);
});