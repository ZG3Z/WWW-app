const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-23570-sequelize', 'hbstudent', 'hbstudent', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;