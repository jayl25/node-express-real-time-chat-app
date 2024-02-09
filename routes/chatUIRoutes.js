
const express = require('express');
const router = express.Router();
const { loadDashboard, getOrCreateChat, sendMessage } = require('../controllers/chatUIController');

router.get('/', loadDashboard);
router.get('/chat/:selectedUsername/:selectedUserId', getOrCreateChat);
router.post('/chat/:selectedUsername/:selectedUserId', sendMessage);

module.exports = router;