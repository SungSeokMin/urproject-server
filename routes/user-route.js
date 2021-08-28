const express = require('express');
const router = express.Router();

const UserModule = require('../controllers/user-controller');

router.post('/login', UserModule.login);
router.get('/logout', UserModule.logout);
router.post('/signup', UserModule.signUp);

module.exports = router;
