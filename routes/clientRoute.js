const express = require('express');
const router = express.Router();
const clientControler = require('../controllers/clientControllers');

router.get('/', clientControler.showClientList);
router.get('/add', clientControler.showAddClientForm);
router.get('/edit/:clientId', clientControler.showEditClientForm);
router.get('/details/:clientId', clientControler.showClientDetails);

router.post('/add', clientControler.addClient);
router.post('/edit', clientControler.updateClient);
router.get('/delete/:clientId', clientControler.deleteClient);

module.exports = router;