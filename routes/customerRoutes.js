const express = require('express');

const Customer = require('../models/customer');
const customerControllers = require('../controllers/customer');

const router = express.Router();

router.post('/signup', customerControllers.postCustomerSignup);

router.post('/login', customerControllers.postCustomerLogin);

router.get('/is-logged-in', customerControllers.getIsLoggedIn);

router.get('/properties',  customerControllers.getProperties);

module.exports = router;