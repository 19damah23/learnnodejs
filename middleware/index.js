const express = require('express');
const auth = require('./auth');
const verification = require('./verification');
const router = express.Router();

// registers the registration menu
router.post('/api/v1/register', auth.registration);
router.post('/api/v1/login', auth.login);

// authorized pages
router.get('/api/v1/secretpage', verification(), auth.secretpage);

module.exports = router;