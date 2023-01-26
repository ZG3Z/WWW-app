const express = require('express');
const router = express.Router();

const accessoryApiController = require('../../api/AccessoryAPI');

router.get('/', accessoryApiController.getAccessories);
router.get('/:accessoryId', accessoryApiController.getAccessoryById);
router.post('/', accessoryApiController.createAccessory);
router.put('/:accessoryId', accessoryApiController.updateAccessory);
router.delete('/:accessoryId', accessoryApiController.deleteAccessory);

module.exports = router;