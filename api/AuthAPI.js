const CustomerRepository = require('../repository/sequelize/CustomerRepository');
const config = require("../config/auth/key")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;
    CustomerRepository.findByEmail(email)
        .then(user => {
            if (!user) {
                return res.status(401).send({ message: "Nieprawidłowy email lub hasło!" })
            }

            bcrypt.compare(password, user.Password)
                .then(isEqual => {
                    if (!isEqual) {
                        return res.status(401).send({ message: "Nieprawidłowy email lub hasło!" })
                    }
                    const token = jwt.sign(
                        {
                            email: user.Email,
                            userId: user.ID_customer,
                        },
                        config.secret,
                        { expiresIn: '1h' }
                    )
                    res.status(200).json({ token: token, userId: user.ID_customer })
                })
                .catch(err => {
                    console.log(err)
                    res.status(501)
                })
        })
}
