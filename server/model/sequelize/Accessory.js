const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Accessory = sequelize.define('Accessory', {
    ID_accessory: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Accessory;