exports.showClientList = (req, res, next) => {
    res.render('pages/client/list', { navLocation: 'clientNav' });
}

exports.showAddClientForm = (req, res, next) => {
    res.render('pages/client/form', { navLocation: 'clientNav' });
}

exports.showClientDetails = (req, res, next) => {
    res.render('pages/client/details', { navLocation: 'clientNav' });
}