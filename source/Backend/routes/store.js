const express = require('express');
const router = express.Router();


const home = require('./store/home-route.js');
const catalog = require('./store/catalog-route.js');
const order = require('./store/order-route.js');


router.use('/home', home);
router.use('/catalog',catalog);
router.use('/order',order);




module.exports = router;
