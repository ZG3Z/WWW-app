const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Client = sequelize.define('Client', {
    ID_client: {
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
        validate: {
            len: {
                args: [5,60],
                msg: "Pole powinno zawierać od 5 do 60 znaków"
            },
            isEmail: {
                msg: "Pole powinno zawirać prawidłowy adres email"
            }
        }
    }
});

module.exports = Client;