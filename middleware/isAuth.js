const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "superdupersecretkey");
    }
    catch(err) {
        throw err;
    }
    if(!decodedToken) {
        const err = new Error('Error!');
        throw err;
    }
    req.userId = decodedToken.userId;
    next();
}