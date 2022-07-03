const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Customer  = require('../models/customer');


exports.postCustomerSignup = (req,res,next) => {
    const name = req.body.name;
    const mail = req.body.mail;
    const dob = req.body.dob;
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    bcrypt.hash(password,12)
    .then(hashedPassword => {
        return Customer.create({
            name: name,
            mailId: mail,
            dob: dob,
            username: username,
            password: hashedPassword
        })
    }
    )
    .then(result =>{
        const token = jwt.sign({email:mail},'superdupersecretkey',{expiresIn: '1h'});
        res.status(200).json({token:token});
    }
    ).catch(err => console.log(err));
}