const CustomerRepository = require('../repository/sequelize/CustomerRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.LoginEmail;
    const password = req.body.LoginPassword;

    CustomerRepository.findByEmail(email)
        .then(customer => {
            if(!customer) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres e-mail lub hasło"
                })
            } else if (authUtil.comparePasswords(password, customer.Password)) {
                req.session.loggedUser = customer;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres e-mail lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
};

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}