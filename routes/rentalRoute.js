const express = require('express');
const router = express.Router();
const rentalControler = require('../controllers/rentalControllers');

router.get('/', rentalControler.showRentalList);
router.get('/add', rentalControler.showAddRentalForm);
router.get('/details/:rentalId', rentalControler.showRentalDetails);

module.exports = router;