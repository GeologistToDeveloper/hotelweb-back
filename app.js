const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
// const Customer = require('./models/customer');
const Owner = require('./models/owner');
const Property = require('./models/property');

const customerRoutes = require('./routes/customerRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const multer = require("multer");
const {v4: uuidv4} = require('uuid');

const app = express();

const fileFilter = (req, file,cb) => {
  if (file.mimetype === 'image/png' ||file.mimetype === 'image/jpg' ||file.mimetype === 'image/jpeg'){
    cb(null, true);
  }
  else {
    cb(null, false);
  }
  
}

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, path.join(__dirname,'public','images'));
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + Math.random().toString() + '.jpg');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer({
  storage: fileStorage,
  fileFilter: fileFilter
}).single('picture'));
app.use('/public/images',express.static(path.join(__dirname,'public','images')));
app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(customerRoutes);
app.use('/admin',ownerRoutes);

Owner.hasMany(Property);
Property.belongsTo(Owner);

sequelize
  // .sync({force:true})
  .sync()
  .then(result => app.listen(8080) )
  .catch((err) => console.log(err));


