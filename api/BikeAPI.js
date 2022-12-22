const BikeRepository = require('../repository/sequelize/BikeRepository');

exports.getBikes = (req, res, next) => {
    BikeRepository.getBikes()
        .then(bikes =>{
            res.status(200).json(bikes);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getBikeById = (req, res, next) => {
    const bikeId = req.params.bikeId;
    BikeRepository.getBikeById(bikeId)
        .then(bike => {
            if(!bike) {
                res.status(404).json({
                    messsage: 'Bike with id: ' + bikeId + ' not found'
                })
            } else {
                res.status(200).json(bike);
            }
        });
};

exports.createBike = (req, res, next) => {
    BikeRepository.createBike(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateBike = (req, res, next) => {
    const bikeId = req.params.bikeId;
    BikeRepository.updateBike(bikeId, req.body)
        .then(result => {
            res.status(200).json({message: 'Bike updated!', bike: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteBike = (req, res, next) => {
    const bikeId = req.params.bikeId;
    BikeRepository.deleteBike(bikeId)
        .then(result => {
            res.status(200).json({message: 'Removed bike', bike: result})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};