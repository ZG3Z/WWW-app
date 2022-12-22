const Sequelize = require('sequelize');

const Bike = require("../../model/sequelize/Bike");
const Client = require("../../model/sequelize/Client");
const Rental = require("../../model/sequelize/Rental");

exports.getRentals = () => {
    return Rental.findAll({include: [
        {
            model: Client,
            as: 'Client'
        },
        {
            model: Bike,
            as: 'Bike'
        }]
    });
};

exports.getRentalById = (rentalId) => {
    return Rental.findByPk(rentalId, {include: [
        {
            model: Client,
            as: 'Client'
        },
        {
            model: Bike,
            as: 'Bike'
        }]
    });
};

exports.createRental = (data) => {
    return Rental.create({
        Client_ID_client: data.Client_ID_client,
        Bike_ID_bike: data.Bike_ID_bike,
        Date_from: data.Date_from,
        Date_to: data.Date_to
    });
};

exports.updateRental = (rentalId, data) => {
    return Rental.update(data, {where: {ID_rental: rentalId}});
}

exports.deleteRental = (rentalId) => {
    return Rental.destroy({
        where: {ID_rental: rentalId}
    });
}

exports.deleteManyRentals = (rentalId) => {
    return Rental.find({ID_rental: {[Sequelize.Op.in]: rentalId}})
}