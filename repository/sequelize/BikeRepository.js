const Bike = require("../../model/sequelize/Bike");
const Client = require("../../model/sequelize/Client");
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
                    model: Client,
                    as: 'Client'
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
    const Brand = bikeData.Brand;
    const Model = bikeData.Model;
    const Colour = bikeData.Colour;
    return Bike.update(bikeData, {where: {ID_bike: bikeId}});
};

exports.deleteBike = (bikeId) => {
    return Bike.destroy({
        where: {ID_bike: bikeId}
    });
};
