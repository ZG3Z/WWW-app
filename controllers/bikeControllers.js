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
        pageTitle: req.__('bike.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('bike.form.add.btnLabel'),
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
                pageTitle: req.__('bike.form.edit.pageTitle'),
                btnLabel: req.__('bike.form.edit.btnLabel'),
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
                pageTitle: req.__('bike.form.details.pageTitle'),
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
                pageTitle: req.__('bike.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('bike.form.add.btnLabel'),
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
                pageTitle: req.__('bike.form.edit.pageTitle'),
                btnLabel: req.__('bike.form.edit.btnLabel'),
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
                pageTitle: req.__('bike.form.delete.pageTitle'),
                btnLabel: req.__('bike.form.delete.btnLabel'),
                formAction: '/bikes/delete',
                navLocation: 'bikeNav',
                validationErrors: []
            })
        });
};