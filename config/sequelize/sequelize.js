const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-23570-sequelize', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;