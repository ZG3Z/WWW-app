const express = require('express');
const router = express.Router();
const bikeControler = require('../controllers/bikeControllers');

router.get('/', bikeControler.showBikeList);
router.get('/add', bikeControler.showAddBikeForm);
router.get('/edit/:bikeId', bikeControler.showEditBikeForm);
router.get('/details/:bikeId', bikeControler.showBikeDetails);

router.post('/add', bikeControler.addBike);
router.post('/edit', bikeControler.updateBike);
router.get('/delete/:bikeId', bikeControler.deleteBike);

module.exports = router;