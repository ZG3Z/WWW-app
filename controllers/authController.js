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
                    loginError: req.__('validationMessage.loginError')
                })
            } else if (authUtil.comparePasswords(password, customer.Password)) {
                req.session.loggedUser = customer;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('validationMessage.loginError')
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