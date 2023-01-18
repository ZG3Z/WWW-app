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
        allowNull: false
    },
    Surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Telephone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Customer;