const Bike = require("../../model/sequelize/Bike");
const Customer = require("../../model/sequelize/Customer");
const Rental = require("../../model/sequelize/Rental");

exports.getBikes = () => {
    return Bike.findAll();
}

exports.getBikeById = (bikeId) => {
    return Bike.findByPk(bikeId, 
        {
            include: [{
                model: Rental,
                as: 'Rentals',
                include: [{
                    model: Customer,
                    as: 'Customer'
                }]
            }]
    });
};

exports.createBike = (newBikeData) => {
    return Bike.create({
        Brand: newBikeData.Brand,
        Model: newBikeData.Model,
        Colour: newBikeData.Colour,
    });
};

exports.updateBike = (bikeId, bikeData) => {
    return Bike.update(bikeData, {where: {ID_bike: bikeId}});
};

exports.deleteBike = (bikeId) => {
    return Bike.destroy({
        where: {ID_bike: bikeId}
    });
};
