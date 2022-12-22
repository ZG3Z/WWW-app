const Bike = require("../../model/sequelize/Bike");
const Client = require("../../model/sequelize/Client");
const Rental = require("../../model/sequelize/Rental");

exports.getClients = () => {
    return Client.findAll();
}

exports.getClientById = (clientId) => {
    return Client.findByPk(clientId, 
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

exports.createClient = (newClientData) => {
    return Client.create({
        Name: newClientData.Name,
        Surname: newClientData.Surname,
        Telephone: newClientData.Telephone,
        Email: newClientData.Email
    });
};

exports.updateClient = (clientId, clientData) => {
    const Name = clientData.Name;
    const Surname = clientData.Surname;
    const Telephone = clientData.Telephone;
    const Email = clientData.Email;
    return Client.update(clientData, {where: {ID_client: clientId}});
};

exports.deleteClient = (clientId) => {
    return Client.destroy({
        where: {ID_client: clientId}
    });
};
