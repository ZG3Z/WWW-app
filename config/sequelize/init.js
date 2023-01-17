const sequelize = require('./sequelize');

const Customer = require('../../model/sequelize/Customer');
const Bike = require('../../model/sequelize/Bike');
const Rental = require('../../model/sequelize/Rental');

const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');

module.exports = () => {
    Customer.hasMany(Rental, {as: 'Rentals', foreignKey: {name: 'Customer_ID_customer', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rental.belongsTo(Customer, {as: 'Customer', foreignKey: {name: 'Customer_ID_customer', allowNull: false}});
    Bike.hasMany(Rental, {as: 'Rentals', foreignKey: {name: 'Bike_ID_bike', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rental.belongsTo(Bike, {as: 'Bike', foreignKey: {name: 'Bike_ID_bike', allowNull: false}});

    let allCustomers, allBikes;

    return sequelize
        .sync({force: true})
        .then( () => {
            return Customer.findAll();
        })
        .then (customers => {
            if(!customers || customers.length == 0){
                return Customer.bulkCreate([
                    {Name: 'Jan', Surname: 'Kowalski', Telephone: '123456789', Email: 'jan.kowalski@rbike.com', Password: passHash},
                    {Name: 'Anna', Surname: 'Nowak', Telephone: '987654321', Email: 'anna.nowak@rbike.com', Password: passHash},
                    {Name: 'Adam', Surname: 'Kowalczyk', Telephone: '888888888', Email: 'adam.kowalczyk@rbike.com', Password: passHash}
                ])
                .then( () => {
                    return Customer.findAll();
                });
            } else {
                return customers;
            }
        })
        .then( customers => {
            allCustomers = customers;
            return Bike.findAll();
        })
        .then( bikes => {
            if(!bikes || bikes.length == 0){
                return Bike.bulkCreate([
                    {Brand: 'Specialized', Model: 'Rockhopper', Colour: 'Czarny'},
                    {Brand: 'Unibike', Model: 'Indiana', Colour: 'Czerwony'},
                    {Brand: 'Cube', Model: 'SL Road', Colour: 'Niebieski'}
                ])
                .then( () => {
                    return Bike.findAll();
                });
            } else {
                return bikes;
            }
        })
        .then(bikes => {
            allBikes = bikes;
            return Rental.findAll();
        })
        .then( rentals => {
            if(!rentals || rentals.length == 0){
                return Rental.bulkCreate([
                    {Customer_ID_customer: allCustomers[0].ID_customer, Bike_ID_bike: allBikes[0].ID_bike, Date_from: '2022-03-04', Date_to: '2022-03-06'},
                    {Customer_ID_customer: allCustomers[1].ID_customer, Bike_ID_bike: allBikes[0].ID_bike, Date_from: '2022-04-20', Date_to: '2022-05-12'},
                    {Customer_ID_customer: allCustomers[0].ID_customer, Bike_ID_bike: allBikes[1].ID_bike, Date_from: '2022-05-10', Date_to: '2022-06-04'},
                    {Customer_ID_customer: allCustomers[2].ID_customer, Bike_ID_bike: allBikes[2].ID_bike, Date_from: '2022-07-24', Date_to: '2022-08-14'},
                    {Customer_ID_customer: allCustomers[0].ID_customer, Bike_ID_bike: allBikes[2].ID_bike, Date_from: '2022-09-10', Date_to: '2022-09-24'},
                    {Customer_ID_customer: allCustomers[1].ID_customer, Bike_ID_bike: allBikes[0].ID_bike, Date_from: '2022-09-18', Date_to: '2022-07-20'}
                ]);
            } else {
                return rentals;
            }
        });
};