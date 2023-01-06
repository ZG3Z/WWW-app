const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Customer = sequelize.define('Customer', {
    ID_customer: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Name: {
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
    },
    Surname: {
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
    },
    Telephone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [9],
                msg: "Pole powinno zawierać 9 cyfr"
            }
        }
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

module.exports = Customer;