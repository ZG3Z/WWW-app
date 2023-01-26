const Accessory = require("../../model/sequelize/Accessory");
const Bike = require("../../model/sequelize/Bike");
const Equipment = require("../../model/sequelize/Equipment");

exports.getAccessories = () => {
    return Accessory.findAll();
}

exports.getAccessoryById = (accessoryId) => {
    return Accessory.findByPk(accessoryId, 
        {
            include: [{
                model: Equipment,
                as: 'Equipment',
                include: [{
                    model: Bike,
                    as: 'Bike'
                }]
            }]
    });
};

exports.createAccessory = (newAccessoryData) => {
    return Accessory.create({
        Name: newAccessoryData.Name,
    });
};

exports.updateAccessory = (accessoryId, AccessoryData) => {
    return Accessory.update(AccessoryData, {where: {ID_Accessory: accessoryId}});
};

exports.deleteAccessory = (accessoryId) => {
    return Accessory.destroy({
        where: {ID_accessory: accessoryId}
    });
};
