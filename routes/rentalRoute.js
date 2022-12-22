const express = require('express');
const router = express.Router();
const rentalControler = require('../controllers/rentalControllers');

router.get('/', rentalControler.showRentalList);
router.get('/add', rentalControler.showAddRentalForm);
router.get('/edit/:rentalId', rentalControler.showEditRentalForm);
router.get('/details/:rentalId', rentalControler.showRentalDetails);

router.post('/add', rentalControler.addRental);
router.post('/edit', rentalControler.updateRental);
router.get('/delete/:rentalId', rentalControler.deleteRental);

module.exports = router;