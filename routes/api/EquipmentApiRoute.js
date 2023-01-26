const express = require('express');
const router = express.Router();

const equipmentsApiController = require('../../api/EquipmentAPI');

router.get('/', equipmentsApiController.getEquipments);
router.get('/:equipmentId', equipmentsApiController.getEquipmentById);
router.post('/', equipmentsApiController.createEquipment);
router.put('/:equipmentId', equipmentsApiController.updateEquipment);
router.delete('/:equipmentId', equipmentsApiController.deleteEquipment);

module.exports = router;