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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            }
        }
    },
    Model: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            }
        }
    },
    Colour: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,30],
                msg: "Pole powinno zawierać od 2 do 30 znaków"
            }
        }
    }
});

module.exports = Bike;