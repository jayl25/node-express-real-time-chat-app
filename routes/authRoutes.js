

const express = require('express');
const router = express.Router();
const {loadRegisterForm, loadLoginForm, registerUser, loginUser, logout} = require('../controllers/authController');

router.get('/login', loadLoginForm);
router.post('/login', loginUser);
router.get('/register', loadRegisterForm);
router.post('/register', registerUser);
router.get('/logout', logout);

module.exports = router;