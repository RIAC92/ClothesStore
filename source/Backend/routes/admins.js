const express = require('express');
const router = express.Router();
//const suppliers = require('../models/suppliers.js');
//const contacts = require('../models/contacts.js');


const delivers = require('./admins/delivers-route.js');
const suppliers = require('./admins/suppliers-route.js');
const contacts = require('./admins/contacts-route.js');
const products = require('./admins/products-route.js');
const fatsConfig = require('./admins/config-route.js');
const Orders = require('./admins/orders-route.js');



router.use('/delivers', delivers);
router.use('/suppliers', suppliers);
router.use('/contacts', contacts);
router.use('/products', products);
router.use('/config', fatsConfig);
router.use('/orders', Orders);



module.exports = router;
