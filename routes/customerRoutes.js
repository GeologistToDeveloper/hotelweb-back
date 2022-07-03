const express = require('express');

const Customer = require('../models/customer');
const customerControllers = require('../controllers/customer');

const router = express.Router();

router.post('/signup', customerControllers.postCustomerSignup);

module.exports = router;