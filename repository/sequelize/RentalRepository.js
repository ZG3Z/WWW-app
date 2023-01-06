const Sequelize = require('sequelize');

const Bike = require("../../model/sequelize/Bike");
const Customer = require("../../model/sequelize/Customer");
const Rental = require("../../model/sequelize/Rental");

exports.getRentals = () => {
    return Rental.findAll({include: [
        {
            model: Customer,
            as: 'Customer'
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
            model: Customer,
            as: 'Customer'
        },
        {
            model: Bike,
            as: 'Bike'
        }]
    });
};

exports.createRental = (data) => {
    return Rental.create({
        Customer_ID_customer: data.Customer_ID_customer,
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