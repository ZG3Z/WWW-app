const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Bike = sequelize.define('Bike', {
    ID_bike: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Model: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Colour: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Bike;