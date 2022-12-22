const ClientRepository = require('../repository/sequelize/ClientRepository');

exports.showClientList = (req, res, next) => {
    ClientRepository.getClients()
        .then(clients => {
            res.render('pages/client/list', {
                clients: clients,
                navLocation: 'clientNav'
            });
        });
};

exports.showAddClientForm = (req, res, next) => {
    res.render('pages/client/form', {
        client: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj pracownika',
        formAction: '/clients/add',
        navLocation: 'clientNav',
        validationErrors: []
    });
};

exports.showEditClientForm = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId)
    .then(client => {
        res.render('pages/client/form', {
            client: client,
            formMode: 'edit',
            pageTitle: 'Edycja klient',
            btnLabel: 'Edytuj pracownika',
            formAction: '/clients/edit',
            navLocation: 'clientNav',
            validationErrors: []
        });
    });
};

exports.showClientDetails = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId)
        .then(client => {
            res.render('pages/client/form', {
                client: client,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły klienta',
                formAction: '',
                navLocation: 'clientNav',
                validationErrors: []
            });
        });
};

exports.addClient = (req, res, next) => {
    const clientData = {...req.body};
    ClientRepository.createClient(clientData)
        .then( result => {
            res.redirect('/clients');
        })
        .catch( err => {
            res.render('pages/client/form', {
                client: clientData,
                pageTitle: 'Nowy klient',
                formMode: 'createNew',
                btnLabel: 'Dodaj pracownika',
                formAction: '/clients/add',
                navLocation: 'clientNav',
                validationErrors: err.errors
            })
        });
};

exports.updateClient = (req, res, next) => {
    const clientId = req.body.ID_client;
    const clientData = {...req.body};
    ClientRepository.updateClient(clientId, clientData)
        .then( result => {
            res.redirect('/clients');
        })
        .catch( err => {
            res.render('pages/client/form', {
                client: clientData,
                formMode: 'edit',
                pageTitle: 'Edycja klient',
                btnLabel: 'Edytuj pracownika',
                formAction: '/clients/edit',
                navLocation: 'clientNav',
                validationErrors: err.errors
            })
        });
};

exports.deleteClient = (req, res, next) => {
    const clientId = req.params.clientId;
    const clientData = {...req.body};

    ClientRepository.deleteClient(clientId)
        .then( () => {
            res.redirect('/clients');
        })
        .catch( err => {
            res.render('pages/client/form', {
                client: clientData,
                formMode: 'delete',
                pageTitle: 'Usuwanie klienta',
                btnLabel: 'Usuń klienta',
                formAction: '/clients/delete',
                navLocation: 'clientNav',
                validationErrors: []
            })
        });
};