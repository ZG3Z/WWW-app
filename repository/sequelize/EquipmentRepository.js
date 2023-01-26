const Sequelize = require('sequelize');

const Bike = require("../../model/sequelize/Bike");
const Accessory = require("../../model/sequelize/Accessory");
const Equipment = require("../../model/sequelize/Equipment");

exports.getEquipments = () => {
    return Equipment.findAll({include: [
        {
            model: Bike,
            as: 'Bike'
        },
        {
            model: Accessory,
            as: 'Accessory'
        }]
    });
};

exports.getEquipmentById = (equipmentId) => {
    return Equipment.findByPk(equipmentId, {include: [
        {
            model: Bike,
            as: 'Bike'
        },
        {
            model: Accessory,
            as: 'Accessory'
        }]
    });
};

exports.createEquipment = (data) => {
    return Equipment.create({
        Bike_ID_bike: data.Bike_ID_bike,
        Accessory_ID_accessory: data.Accessory_ID_accessory
    });
};

exports.updateEquipment = (equipmentId, data) => {
    return Equipment.update(data, {where: {ID_equipment: equipmentId}});
}

exports.deleteEquipment = (equipmentId) => {
    return Equipment.destroy({
        where: {ID_equipment: equipmentId}
    });
}

exports.deleteManyEquipments = (equipmentId) => {
    return Equipment.find({ID_equipment: {[Sequelize.Op.in]: equipmentId}})
}