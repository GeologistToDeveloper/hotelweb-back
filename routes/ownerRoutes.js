const express = require('express');


const ownerControllers = require('../controllers/owner');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/properties', isAuth, ownerControllers.getProperties);

router.get('/get-property', isAuth, ownerControllers.getEditProperty);

router.post('/edit-properties/:propertyId', isAuth, ownerControllers.postEditProperty);

router.post('/signup', ownerControllers.postOwnerSignup);

router.post('/login', ownerControllers.postOwnerLogin);

router.post('/add-property',isAuth, ownerControllers.postAddProperty);

router.delete('/delete-property/:propertyId', isAuth, ownerControllers.deleteProperty);

router.get('/is-logged-in', ownerControllers.getIsLoggedIn);

module.exports = router;