const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const auth = require('../controller/auth.controller');
const imageUpload = require('../utils/imageUpload');

router.post('/register', imageUpload.single('avatar') , auth.register);
router.post('/login', auth.login);
router.get('/user', authMiddleware, auth.getUser);
router.delete('/logout', authMiddleware, auth.userLogout);
// router.get('/profile', authMiddleware, auth.getProfile);

module.exports = router;