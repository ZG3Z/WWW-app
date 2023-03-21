const express = require('express');
const router = express.Router();

const rentalsApiController = require('../../api/RentalAPI');

router.get('/', rentalsApiController.getRentals);
router.get('/:rentalId', rentalsApiController.getRentalById);
router.post('/', rentalsApiController.createRental);
router.put('/:rentalId', rentalsApiController.updateRental);
router.delete('/:rentalId', rentalsApiController.deleteRental);

module.exports = router;