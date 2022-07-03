const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Owner = require("../models/owner");
const Property = require("../models/property");

exports.getProperties = (req,res,next) => {
  const userId = req.query.userId;
  Property.findAll({where: {ownerId : userId}})
  .then(properties => {
    return res.status(200).json(properties);
  })
  .catch(err => {
    console.log(err);
  })
}

exports.getEditProperty = (req,res,next) => {
  const propertyId = req.query.propertyId;
  Property.findOne({where: {id:propertyId}})
  .then(property => {
    return res.status(200).json(property);
  })
  .catch(err => {
    console.log(err);
  });
}



exports.postOwnerSignup = (req, res, next) => {
  const name = req.body.name;
  const mail = req.body.mail;
  const dob = req.body.dob;
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      return Owner.create({
        name: name,
        mailId: mail,
        dob: dob,
        username: username,
        password: hashedPassword,
      });
    })
    .then((owner) => {
      const token = jwt.sign({ email: mail, userId: owner.id}, "superdupersecretkey", {
        expiresIn: "1h",
      });
      console.log(owner.id);
      return res.status(200).json({ token: token, userId: owner.id });
    })
    .catch((err) => console.log(err));
};

exports.postOwnerLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  Owner.findOne({ where: { username: username } })
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

exports.postAddProperty = (req, res, next) => {
  const name = req.body.name;
  const city = req.body.city;
  const type = req.body.type;
  const address = req.body.address;
  const rate = req.body.rate;
  const contact = req.body.contact;
  const picture = req.file.path;
//   console.log(req.userId);
  Owner.findOne({ where: { id: req.userId } })
    .then((owner) => {
      return owner.createProperty({
        name: name,
        city: city,
        type: type,
        address: address,
        rate: rate,
        contact: contact,
        picture: picture,
      });
    })
    .then((result) => {
      return res.json("ok");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProperty = (req,res,next) => {
  const propertyId = req.params.propertyId;
  const name = req.body.name;
  const city = req.body.city;
  const type = req.body.type;
  const address = req.body.address;
  const rate = req.body.rate;
  const contact = req.body.contact;
  let picture;
  Property.findOne({where: {id:propertyId}})
  .then(property => {
    if(!req.file){
      picture = property.picture;
    }
    else{
      picture = req.file.path;
    }
    return property.update({
      name: name,
        city: city,
        type: type,
        address: address,
        rate: rate,
        contact: contact,
        picture: picture,
    })
    .then(result => {
      return res.status(200).json('ok');
    })
    .catch(err => {
      console.log(err);
    });
  })
  .catch(err => {
    console.log(err);
  });
}

exports.deleteProperty = (req,res,next) => {
  const propertyId = req.params.propertyId;
  Property.destroy({where : {id: propertyId}})
    .then(result => {
      return res.status(200).json('deleted');
    })
    .catch(err=>{
      console.log(err);
    });
}

exports.getIsLoggedIn = (req,res,next) => {
  const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "superdupersecretkey");
    }
    catch(err) {
        // throw err;
    }
    if(!decodedToken) {
        return res.json({isLoggedIn: false});
    }
    return res.json({isLoggedIn: true});
}