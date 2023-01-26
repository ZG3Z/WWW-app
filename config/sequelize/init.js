const sequelize = require('./sequelize');

const Customer = require('../../model/sequelize/Customer');
const Bike = require('../../model/sequelize/Bike');
const Rental = require('../../model/sequelize/Rental');
const Accessory = require('../../model/sequelize/Accessory');
const Equipment = require('../../model/sequelize/Equipment');

const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');

module.exports = () => {
    Customer.hasMany(Rental, {as: 'Rentals', foreignKey: {name: 'Customer_ID_customer', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rental.belongsTo(Customer, {as: 'Customer', foreignKey: {name: 'Customer_ID_customer', allowNull: false}});
    Bike.hasMany(Rental, {as: 'Rentals', foreignKey: {name: 'Bike_ID_bike', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rental.belongsTo(Bike, {as: 'Bike', foreignKey: {name: 'Bike_ID_bike', allowNull: false}});

    Bike.hasMany(Equipment, {as: 'Equipment', foreignKey: {name: 'Bike_ID_bike', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Equipment.belongsTo(Bike, {as: 'Bike', foreignKey: {name: 'Bike_ID_bike', allowNull: false}});
    Accessory.hasMany(Equipment, {as: 'Equipment', foreignKey: {name: 'Accessory_ID_accessory', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Equipment.belongsTo(Accessory, {as: 'Accessory', foreignKey: {name: 'Accessory_ID_accessory', allowNull: false}});

    let allCustomers, allBikes, allAccessories;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Customer.findAll();
        })
        .then (customers => {
            if(!customers || customers.length == 0){
                return Customer.bulkCreate([
                    {Name: 'Admin', Surname: 'Admin', Telephone: '', Email: 'admin@rbike.com', Password: passHash},
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
            return Accessory.findAll();
        })
        .then( accessories => {
            if(!accessories || accessories.length == 0){
                return Accessory.bulkCreate([
                    {Name: 'Kask'},
                    {Name: 'Pompka'},
                    {Name: 'Dzwonek'},
                    {Name: 'Lampka'},
                    {Name: 'Koszyk'}
                ])
                .then( () => {
                    return Accessory.findAll();
                });
            } else {
                return accessories;
            }
        })
        .then(accessories => {
            allAccessories = accessories;
            return Rental.findAll();
        })
        .then( rentals => {
            if(!rentals || rentals.length == 0){
                return Rental.bulkCreate([
                    {Customer_ID_customer: allCustomers[1].ID_customer, Bike_ID_bike: allBikes[0].ID_bike, Date_from: '2022-03-04', Date_to: '2022-03-06', Equipment: true},
                    {Customer_ID_customer: allCustomers[2].ID_customer, Bike_ID_bike: allBikes[0].ID_bike, Date_from: '2022-04-20', Date_to: '2022-05-12', Equipment: true},
                    {Customer_ID_customer: allCustomers[1].ID_customer, Bike_ID_bike: allBikes[1].ID_bike, Date_from: '2022-05-10', Date_to: '2022-06-04', Equipment: false},
                    {Customer_ID_customer: allCustomers[3].ID_customer, Bike_ID_bike: allBikes[2].ID_bike, Date_from: '2022-07-24', Date_to: '2022-08-14', Equipment: false},
                    {Customer_ID_customer: allCustomers[1].ID_customer, Bike_ID_bike: allBikes[2].ID_bike, Date_from: '2022-09-10', Date_to: '2022-09-24', Equipment: false},
                    {Customer_ID_customer: allCustomers[2].ID_customer, Bike_ID_bike: allBikes[0].ID_bike, Date_from: '2022-09-18', Date_to: '2022-09-20', Equipment: true}
                ]);
            } else {
                return rentals;
            }
        }).then( ()=>{
            return Equipment.findAll();
        })
        .then( equipments => {
            if(!equipments || equipments.length == 0){
                return Equipment.bulkCreate([
                    {Bike_ID_bike: allBikes[0].ID_bike, Accessory_ID_accessory: allAccessories[0].ID_accessory},
                    {Bike_ID_bike: allBikes[0].ID_bike, Accessory_ID_accessory: allAccessories[1].ID_accessory},
                    {Bike_ID_bike: allBikes[0].ID_bike, Accessory_ID_accessory: allAccessories[3].ID_accessory},
                    {Bike_ID_bike: allBikes[1].ID_bike, Accessory_ID_accessory: allAccessories[0].ID_accessory},
                    {Bike_ID_bike: allBikes[1].ID_bike, Accessory_ID_accessory: allAccessories[1].ID_accessory},
                    {Bike_ID_bike: allBikes[1].ID_bike, Accessory_ID_accessory: allAccessories[2].ID_accessory},
                    {Bike_ID_bike: allBikes[2].ID_bike, Accessory_ID_accessory: allAccessories[3].ID_accessory},
                    {Bike_ID_bike: allBikes[2].ID_bike, Accessory_ID_accessory: allAccessories[0].ID_accessory},
                    {Bike_ID_bike: allBikes[2].ID_bike, Accessory_ID_accessory: allAccessories[1].ID_accessory},
                    {Bike_ID_bike: allBikes[2].ID_bike, Accessory_ID_accessory: allAccessories[2].ID_accessory},
                    {Bike_ID_bike: allBikes[2].ID_bike, Accessory_ID_accessory: allAccessories[4].ID_accessory},
                ]);
            } else {
                return equipments;
            }
        });
};