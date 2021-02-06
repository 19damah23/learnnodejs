const express = require('express');
const auth = require('./auth');
const router = express.Router();

// registers the registration menu
router.post('/api/v1/register', auth.registration);

module.exports = router;