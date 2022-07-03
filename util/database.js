const Sequelize = require("sequelize");

const sequelize = new Sequelize("hotelweb", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
