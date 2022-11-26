exports.showBikeList = (req, res, next) => {
    res.render('pages/bike/list', { navLocation: 'bikeNav' });
}

exports.showAddBikeForm = (req, res, next) => {
    res.render('pages/bike/form', { navLocation: 'bikeNav' });
}

exports.showBikeDetails = (req, res, next) => {
    res.render('pages/bike/details', { navLocation: 'bikeNav' });
}