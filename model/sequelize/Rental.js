const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Rental = sequelize.define('Rental', {
    ID_rental: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Client_ID_client: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    Bike_ID_bike: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    Date_from: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    Date_to: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    }
});

module.exports = Rental;