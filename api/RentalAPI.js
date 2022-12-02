const RentalRepository = require('../repository/mysql2/RentalRepository');

exports.getRentals = (req, res, next) => {
    RentalRepository.getRentals()
        .then(rentals =>{
            res.status(200).json(rentals);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getRentalById = (req, res, next) => {
    const rentalId = req.params.rentalId;
    RentalRepository.getRentalById(rentalId)
        .then(rental => {
            if(!rental) {
                res.status(404).json({
                    messsage: 'Rental with id: ' + rentalId + ' not found'
                })
            } else {
                res.status(200).json(rental);
            }
        });
};

exports.createRental = (req, res, next) => {
    RentalRepository.createRental(req.body)
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

exports.updateRental = (req, res, next) => {
    const rentalId = req.params.rentalId;
    RentalRepository.updateRental(rentalId, req.body)
        .then(result => {
            res.status(200).json({message: 'Rental updated!', rental: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteRental = (req, res, next) => {
    const rentalId = req.params.rentalId;
    RentalRepository.deleteRental(rentalId)
        .then(result => {
            res.status(200).json({message: 'Removed rental', rental: result})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};