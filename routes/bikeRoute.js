const express = require('express');
const router = express.Router();
const bikeControler = require('../controllers/bikeControllers');

router.get('/', bikeControler.showBikeList);
router.get('/add', bikeControler.showAddBikeForm);
router.get('/details/:bikeId', bikeControler.showBikeDetails);

module.exports = router;