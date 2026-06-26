const express = require('express');
const { sendMailToCompany } = require('../controllers/mailController');

const router = express.Router();

router.post('/send', sendMailToCompany);

module.exports = router;