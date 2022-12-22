const sequelize = require('./sequelize');

const Client = require('../../model/sequelize/Client');
const Bike = require('../../model/sequelize/Bike');
const Rental = require('../../model/sequelize/Rental');

module.exports = () => {
    Client.hasMany(Rental, {as: 'Rentals', foreignKey: {name: 'Client_ID_client', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rental.belongsTo(Client, {as: 'Client', foreignKey: {name: 'Client_ID_client', allowNull: false}});
    Bike.hasMany(Rental, {as: 'Rentals', foreignKey: {name: 'Bike_ID_bike', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rental.belongsTo(Bike, {as: 'Bike', foreignKey: {name: 'Bike_ID_bike', allowNull: false}});

    let allClients, allBikes;

    return sequelize
        .sync({force: true})
        .then( () => {
            return Client.findAll();
        })
        .then (clients => {
            if(!clients || clients.length == 0){
                return Client.bulkCreate([
                    {Name: 'Jan', Surname: 'Kowalski', Telephone: '123456789', Email: 'jan.kowalski@bike.com'},
                    {Name: 'Anna', Surname: 'Nowak', Telephone: '987654321', Email: 'anna.nowak@bike.com'},
                    {Name: 'Adam', Surname: 'Kowalczyk', Telephone: '888888888', Email: 'adam.kowalczyk@bike.com'}
                ])
                .then( () => {
                    return Client.findAll();
                });
            } else {
                return clients;
            }
        })
        .then( clients => {
            allClients = clients;
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
                    {Client_ID_client: allClients[0].ID_client, Bike_ID_bike: allBikes[0].ID_bike, Date_from: '2022-03-04', Date_to: '2022-03-06'},
                    {Client_ID_client: allClients[1].ID_client, Bike_ID_bike: allBikes[0].ID_bike, Date_from: '2022-04-20', Date_to: '2022-05-12'},
                    {Client_ID_client: allClients[0].ID_client, Bike_ID_bike: allBikes[1].ID_bike, Date_from: '2022-05-10', Date_to: '2022-06-04'},
                    {Client_ID_client: allClients[2].ID_client, Bike_ID_bike: allBikes[2].ID_bike, Date_from: '2022-07-24', Date_to: '2022-08-14'},
                    {Client_ID_client: allClients[0].ID_client, Bike_ID_bike: allBikes[2].ID_bike, Date_from: '2022-09-10', Date_to: '2022-09-24'},
                    {Client_ID_client: allClients[1].ID_client, Bike_ID_bike: allBikes[0].ID_bike, Date_from: '2022-09-18', Date_to: '2022-07-20'}
                ]);
            } else {
                return rentals;
            }
        });
};