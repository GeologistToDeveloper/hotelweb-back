const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Customer  = require('../models/customer');
const Property = require("../models/property");


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

exports.postCustomerLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    Customer.findOne({ where: { username: username } })
      .then((user) => {
        if (!user) {
          return res.status(401).json("nah");
        }
        return bcrypt.compare(password, user.password).then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign(
              { username: username, userId: user.id },
              "superdupersecretkey",
              {
                expiresIn: "1h",
              }
            );
            console.log(user.id);
            return res.status(200).json({ token: token, userId: user.id });
          }
          return res.status(401).json("nah");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

exports.getProperties = (req,res,next) => {
    Property.findAll()
    .then(properties => {
      return res.status(200).json(properties);
    })
    .catch(err => {
      console.log(err);
    })
  }

exports.getIsLoggedIn = (req,res,next) => {
    console.log('aaya');
    const token = req.get('Authorization').split(' ')[1];
      let decodedToken;
      try {
          decodedToken = jwt.verify(token, "superdupersecretkey");
      }
      catch(err) {
          throw err;
      }
      if(!decodedToken) {
          return res.json({isLoggedIn: false});
      }
      return res.json({isLoggedIn: true});
  }