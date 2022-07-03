const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Property = sequelize.define('property',{
    id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rate: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    contact: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    picture: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Property;