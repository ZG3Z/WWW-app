const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Equipment = sequelize.define('Equipment', {
    ID_equipment: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Bike_ID_bike: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Accessory_ID_accessory: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Equipment;