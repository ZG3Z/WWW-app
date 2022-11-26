const express = require('express');
const router = express.Router();
const clientControler = require('../controllers/clientControllers');

router.get('/', clientControler.showClientList);
router.get('/add', clientControler.showAddClientForm);
router.get('/details/:clientId', clientControler.showClientList);

module.exports = router;