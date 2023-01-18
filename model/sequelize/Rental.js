const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Rental = sequelize.define('Rental', {
    ID_rental: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Customer_ID_customer: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Bike_ID_bike: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Date_from: {
        type: Sequelize.DATE,
        allowNull: false
    },
    Date_to: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = Rental;