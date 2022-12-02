const express = require('express');
const router = express.Router();

const bikeApiController = require('../../api/BikeAPI');

router.get('/', bikeApiController.getBikes);
router.get('/:bikeId', bikeApiController.getBikeById);
router.post('/', bikeApiController.createBike);
router.put('/:bikeId', bikeApiController.updateBike);
router.delete('/:bikeId', bikeApiController.deleteBike);

module.exports = router;