const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');

const customerApiController = require('../../api/CustomerAPI');

router.get('/', customerApiController.getCustomers);
router.get('/:customerId', customerApiController.getCustomerById);
router.post('/', customerApiController.createCustomer);
router.put('/:customerId', customerApiController.updateCustomer);
router.delete('/:customerId', isAuth, customerApiController.deleteCustomer);

module.exports = router;