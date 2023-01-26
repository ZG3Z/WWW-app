const EquipmentRepository = require('../repository/sequelize/EquipmentRepository');

exports.getEquipments = (req, res, next) => {
    EquipmentRepository.getEquipments()
        .then(equipments =>{
            res.status(200).json(equipments);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEquipmentById = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    EquipmentRepository.getEquipmentById(equipmentId)
        .then(equipment => {
            if(!equipment) {
                res.status(404).json({
                    messsage: 'Equipment with id: ' + equipmentId + ' not found'
                })
            } else {
                res.status(200).json(equipment);
            }
        });
};

exports.createEquipment = (req, res, next) => {
    EquipmentRepository.createEquipment(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateEquipment = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    EquipmentRepository.updateEquipment(equipmentId, req.body)
        .then(result => {
            res.status(200).json({message: 'Equipment updated!', equipment: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteEquipment = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    EquipmentRepository.deleteEquipment(equipmentId)
        .then(result => {
            res.status(200).json({message: 'Removed equipment', equipment: result})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};