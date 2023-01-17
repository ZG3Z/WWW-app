const Bike = require("../../model/sequelize/Bike");
const Customer = require("../../model/sequelize/Customer");
const Rental = require("../../model/sequelize/Rental");

const authUtil = require('../../util/authUtils');

exports.getCustomers = () => {
    return Customer.findAll();
}

exports.getCustomerById = (customerId) => {
    return Customer.findByPk(customerId, 
        {
            include: [{
                model: Rental,
                as: 'Rentals',
                include: [{
                    model: Bike,
                    as: 'Bike'
                }]
            }]
    });
};

exports.createCustomer = (newCustomerData) => {
    return Customer.create({
        Name: newCustomerData.Name,
        Surname: newCustomerData.Surname,
        Telephone: newCustomerData.Telephone,
        Email: newCustomerData.Email,
        Password: authUtil.hashPassword(newCustomerData.Password)
    });
};

exports.updateCustomer = (customerId, customerData) => {
    return Customer.update(customerData, {where: {ID_customer: customerId}});
};

exports.deleteCustomer = (customerId) => {
    return Customer.destroy({
        where: {ID_customer: customerId}
    });
};

exports.findByEmail = (email) => {
    return Customer.findOne({
        where: {Email: email}
    });
};
