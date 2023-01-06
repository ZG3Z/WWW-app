const Bike = require("../../model/sequelize/Bike");
const Customer = require("../../model/sequelize/Customer");
const Rental = require("../../model/sequelize/Rental");

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
        Email: newCustomerData.Email
    });
};

exports.updateCustomer = (customerId, customerData) => {
    const Name = customerData.Name;
    const Surname = customerData.Surname;
    const Telephone = customerData.Telephone;
    const Email = customerData.Email;
    return Customer.update(customerData, {where: {ID_customer: customerId}});
};

exports.deleteCustomer = (customerId) => {
    return Customer.destroy({
        where: {ID_customer: customerId}
    });
};
