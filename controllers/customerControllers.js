const CustomerRepository = require('../repository/sequelize/CustomerRepository');

exports.showCustomerList = (req, res, next) => {
    CustomerRepository.getCustomers()
        .then(customers => {
            res.render('pages/customer/list', {
                customers: customers,
                navLocation: 'customerNav'
            });
        });
};

exports.showAddCustomerForm = (req, res, next) => {
    res.render('pages/customer/form', {
        customer: {},
        pageTitle: req.__('customer.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('customer.form.add.btnLabel'),
        formAction: '/customers/add',
        navLocation: 'customerNav',
        validationErrors: []
    });
};

exports.showEditCustomerForm = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.getCustomerById(customerId)
    .then(customer => {
        res.render('pages/customer/form', {
            customer: customer,
            formMode: 'edit',
            pageTitle: req.__('customer.form.edit.pageTitle'),
            btnLabel: req.__('customer.form.edit.btnLabel'),
            formAction: '/customers/edit',
            navLocation: 'customerNav',
            validationErrors: []
        });
    });
};

exports.showCustomerDetails = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customer/form', {
                customer: customer,
                formMode: 'showDetails',
                pageTitle: req.__('customer.form.details.pageTitle'),
                formAction: '',
                navLocation: 'customerNav',
                validationErrors: []
            });
        });
};

exports.addCustomer = (req, res, next) => {
    const customerData = {...req.body};
    CustomerRepository.createCustomer(customerData)
        .then( result => {
            res.redirect('/customers');
        })
        .catch( err => {
            res.render('pages/customer/form', {
                customer: customerData,
                pageTitle: req.__('customer.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('customer.form.add.btnLabel'),
                formAction: '/customers/add',
                navLocation: 'customerNav',
                validationErrors: err.errors
            })
        });
};

exports.updateCustomer = (req, res, next) => {
    const customerId = req.body.ID_customer;
    const customerData = {...req.body};
    CustomerRepository.updateCustomer(customerId, customerData)
        .then( result => {
            res.redirect('/customers');
        })
        .catch( err => {
            res.render('pages/customer/form', {
                customer: customerData,
                formMode: 'edit',
                pageTitle: req.__('customer.form.edit.pageTitle'),
                btnLabel: req.__('customer.form.edit.btnLabel'),
                formAction: '/customers/edit',
                navLocation: 'customerNav',
                validationErrors: err.errors
            })
        });
};

exports.deleteCustomer = (req, res, next) => {
    const customerId = req.params.customerId;
    const customerData = {...req.body};

    CustomerRepository.deleteCustomer(customerId)
        .then( () => {
            res.redirect('/customers');
        })
        .catch( err => {
            res.render('pages/customer/form', {
                customer: customerData,
                formMode: 'delete',
                pageTitle: req.__('customer.form.delete.pageTitle'),
                btnLabel: req.__('customer.form.delete.btnLabel'),
                formAction: '/customers/delete',
                navLocation: 'customerNav',
                validationErrors: []
            })
        });
};