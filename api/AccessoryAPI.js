const AccessoryRepository = require('../repository/sequelize/AccessoryRepository');

exports.getAccessories = (req, res, next) => {
    AccessoryRepository.getAccessories()
        .then(accessories =>{
            res.status(200).json(accessories);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getAccessoryById = (req, res, next) => {
    const accessoryId = req.params.accessoryId;
    AccessoryRepository.getAccessoryById(accessoryId)
        .then(accessory => {
            if(!accessory) {
                res.status(404).json({
                    messsage: 'Accessory with id: ' + accessoryId + ' not found'
                })
            } else {
                res.status(200).json(accessory);
            }
        });
};

exports.createAccessory = (req, res, next) => {
    AccessoryRepository.createAccessory(req.body)
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

exports.updateAccessory = (req, res, next) => {
    const accessoryId = req.params.accessoryId;
    AccessoryRepository.updateAccessory(accessoryId, req.body)
        .then(result => {
            res.status(200).json({message: 'Accessory updated!', accessory: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteAccessory = (req, res, next) => {
    const accessoryId = req.params.accessoryId;
    AccessoryRepository.deleteAccessory(accessoryId)
        .then(result => {
            res.status(200).json({message: 'Removed accessory', accessory: result})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};