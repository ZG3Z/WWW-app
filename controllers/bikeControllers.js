const BikeRepository = require('../repository/sequelize/BikeRepository');

exports.showBikeList = (req, res, next) => {
    BikeRepository.getBikes()
    .then(bikes => {
        res.render('pages/bike/list', {
            bikes: bikes,
            navLocation: 'bikeNav'
        });
    });
};

exports.showAddBikeForm = (req, res, next) => {
    res.render('pages/bike/form', {
        bike: {},
        pageTitle: 'Nowy rower',
        formMode: 'createNew',
        btnLabel: 'Dodaj rower',
        formAction: '/bikes/add',
        navLocation: 'bikeNav',
        validationErrors: []
    });
};

exports.showEditBikeForm = (req, res, next) => {
    const bikeId = req.params.bikeId;
    BikeRepository.getBikeById(bikeId)
        .then(bike => {
            res.render('pages/bike/form', {
                bike: bike,
                formMode: 'edit',
                pageTitle: 'Edycja roweru',
                btnLabel: 'Edytuj rower',
                formAction: '/bikes/edit',
                navLocation: 'bikeNav',
                validationErrors: []
            })
        });
};


exports.showBikeDetails = (req, res, next) => {
    const bikeId = req.params.bikeId;
    BikeRepository.getBikeById(bikeId)
        .then(bike => {
            res.render('pages/bike/form', {
                bike: bike,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły roweru',
                formAction: '',
                navLocation: 'bikeNav',
                validationErrors: []
            });
        });
};

exports.addBike = (req, res, next) => {
    const bikeData = {...req.body};
    BikeRepository.createBike(bikeData)
        .then( result => {
            res.redirect('/bikes');
        })
        .catch(err => {
            res.render('pages/bike/form', {
                bike: bikeData,
                pageTitle: 'Nowy rower',
                formMode: 'createNew',
                btnLabel: 'Dodaj rower',
                formAction: '/bikes/add',
                navLocation: 'bikeNav',
                validationErrors: err.errors
            })
        });
};

exports.updateBike = (req, res, next) => {
    const bikeId = req.body.ID_bike;
    const bikeData = {...req.body};
    
    BikeRepository.updateBike(bikeId, bikeData)
        .then( result => {
            res.redirect('/bikes');
        })
        .catch( err => {
            res.render('pages/bike/form', {
                bike: bikeData,
                formMode: 'edit',
                pageTitle: 'Edycja roweru',
                btnLabel: 'Edytuj rower',
                formAction: '/bikes/edit',
                navLocation: 'bikeNav',
                validationErrors: err.errors
            })
        });
};


exports.deleteBike = (req, res, next) => {
    const bikeId = req.params.bikeId;
    const bikeData = { ...req.body };

    BikeRepository.deleteBike(bikeId)
        .then( () => {
            res.redirect('/bikes');
        })
        .catch(err => {
            res.render('pages/bike/form', {
                bike: bikeData,
                formMode: 'delete',
                pageTitle: 'Usuwanie roweru',
                btnLabel: 'Usuń rower',
                formAction: '/bikes/delete',
                navLocation: 'bikeNav',
                validationErrors: []
            })
        });
};