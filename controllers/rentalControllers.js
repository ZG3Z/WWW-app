exports.showRentalList = (req, res, next) => {
    res.render('pages/rental/list', { navLocation: 'rentalNav' });
}

exports.showAddRentalForm = (req, res, next) => {
    res.render('pages/rental/form', { navLocation: 'rentalNav' });
}

exports.showRentalDetails = (req, res, next) => {
    res.render('pages/rental/details', { navLocation: 'rentalNav' });
}