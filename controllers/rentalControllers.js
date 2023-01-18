const RentalRepository = require('../repository/sequelize/RentalRepository');
const CustomerRepository = require('../repository/sequelize/CustomerRepository');
const BikeRepository = require('../repository/sequelize/BikeRepository');

exports.showRentalList = (req, res, next) => {
    RentalRepository.getRentals()
        .then(rentals => {
            res.render('pages/rental/list', {
                rentals: rentals,
                navLocation: 'rentalNav'
            })
        });
}

exports.showAddRentalForm = (req, res, next) => {
    let allCustomers, allBikes;

    CustomerRepository.getCustomers()
        .then( customers => {
            allCustomers = customers;
            return BikeRepository.getBikes();
        })
        .then(bikes => {
            allBikes = bikes;
            res.render('pages/rental/form', {
                rental: {},
                allCustomers: allCustomers,
                allBikes: allBikes,
                formMode: 'createNew',
                pageTitle: req.__('rental.form.add.pageTitle'),
                btnLabel: req.__('rental.form.add.btnLabel'),
                formAction: '/rentals/add',
                navLocation: 'rentalNav',
                validationErrors: []
            });
        });
}

exports.showEditRentalForm = (req, res, next) => {
    const rentalId = req.params.rentalId;
    let allCustomers, allBikes;

    CustomerRepository.getCustomers()
        .then( customers => {
            allCustomers = customers;
            return BikeRepository.getBikes();
        })
        .then(bikes => {
            allBikes = bikes;
            return  RentalRepository.getRentalById(rentalId);
        })
        .then(rental => {
            res.render('pages/rental/form', {
                rental: rental,
                allCustomers: allCustomers,
                allBikes: allBikes,
                formMode: 'edit',
                pageTitle: req.__('rental.form.edit.pageTitle'),
                btnLabel: req.__('rental.form.edit.btnLabel'),
                formAction: '/rentals/edit',
                navLocation: 'rentalNav',
                validationErrors: []
            })
        });
};

exports.showRentalDetails = (req, res, next) => {
    const rentalId = req.params.rentalId;
    let allCustomers, allBikes;

    CustomerRepository.getCustomers()
        .then( customers => {
            allCustomers = customers;
            return BikeRepository.getBikes();
        })
        .then(bikes => {
            allBikes = bikes;
            return  RentalRepository.getRentalById(rentalId);
        })
        .then(rental => {
            res.render('pages/rental/form', {
                rental: rental,
                allCustomers: allCustomers,
                allBikes: allBikes,
                formMode: 'showDetails',
                pageTitle: req.__('rental.form.details.pageTitle'),
                formAction: '',
                navLocation: 'rentalNav',
                validationErrors: []
            })
        });
};

exports.addRental = (req, res, next) => {
    const rentalData = {...req.body};

    RentalRepository.createRental(rentalData)
        .then( result => {
            res.redirect('/rentals');
        })
        .catch(err => {
            CustomerRepository.getCustomers()
            .then( customers => {
                allCustomers = customers;
                return BikeRepository.getBikes();
            })
            .then(bikes => {
                allBikes = bikes;
                res.render('pages/rental/form', {
                    rental: {},
                    allCustomers: allCustomers,
                    allBikes: allBikes,
                    formMode: 'createNew',
                    pageTitle: req.__('rental.form.add.pageTitle'),
                    btnLabel: req.__('rental.form.add.btnLabel'),
                    formAction: '/rentals/add',
                    navLocation: 'rentalNav',
                    validationErrors: err.errors
                });
            })
        });
};

exports.updateRental = (req, res, next) => {
    const rentalId = req.body.ID_rental;
    const rentalData = {...req.body};

    RentalRepository.updateRental(rentalId, rentalData)
        .then( result => {
            res.redirect('/rentals');
        })
        .catch(err => {
            CustomerRepository.getCustomers()
                .then( customers => {
                    allCustomers = customers;
                    return BikeRepository.getBikes();
                })
                .then(bikes => {
                    allBikes = bikes;
                    return  RentalRepository.getRentalById(rentalId);
                })
                .then(rental => {
                    res.render('pages/rental/form', {
                        rental: rental,
                        allCustomers: allCustomers,
                        allBikes: allBikes,
                        formMode: 'edit',
                        pageTitle: req.__('rental.form.edit.pageTitle'),
                        btnLabel: req.__('rental.form.edit.btnLabel'),
                        formAction: '/rentals/edit',
                        navLocation: 'rentalNav',
                        validationErrors: err.errors
                    })
                })
        });
};

exports.deleteRental = (req, res, next) => {
    const rentalId = req.params.rentalId;
    const rentalData = {...req.body};

    RentalRepository.deleteRental(rentalId)
        .then( () => {
            res.redirect('/rentals');
        })
        .catch(err => {
            res.render('pages/rental/form', {
                rental: rentalData,
                formMode: 'delete',
                pageTitle: req.__('rental.form.delete.pageTitle'),
                btnLabel: req.__('rental.form.delete.btnLabel'),
                formAction: '/rentals/delete',
                navLocation: 'rentalNav',
                validationErrors: []
            })
        });
};