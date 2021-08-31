var express = require('express');
const ensureAuthenticated = require('../ authorization').ensureAuthenticated;
var router = express.Router();
const path = require('path');
require('dotenv').config({ path: process.cwd() + '/.env' });
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const SALT_ROUNDS = parseInt(process.env.SALTROUNDS);
const MY_FORM_SECRET = process.env.MY_FORM_SECRET;
const STORE_TIME_MIN=process.env.STORE_TIME_MIN;
const Domain=process.env.DOMAIN;
/* GET home page. */
/*
//-------------------- Authenticated Middleware------------------------
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('Is currenty Authenticated')
    return next();
  }
  console.log('Bad attempt to access!')
  res.redirect('http://localhost:5000/login');
};
//------------------------------------------------------------------------
*/
router.get('/', function (req, res, next) {
  let formCookie = req.signedCookies.form;

  if (!formCookie) {//cookie do not exist

    bcrypt.genSalt(SALT_ROUNDS)//gen Salt
      .then(salt => bcrypt.hash(MY_FORM_SECRET, salt))//gen hash
      .then(hashFormSecret => {
        let dateExpires=new Date(Date.now() + STORE_TIME_MIN*60*1000)
        return res
          .cookie('form', (hashFormSecret+'&t'+dateExpires.getTime()+'&'+uuidv4()), { expires:dateExpires , httpOnly: true , signed:true})
          .sendFile(path.dirname(__dirname) + '/public/build/index.html');
      })
      .catch(e => {
        console.log(e);
        res.json({ error: "An error has occurred" })
      })
  } else {//cookie exist
    console.log("han visitado la pagina recientemente",req.signedCookies)
    res.sendFile(path.dirname(__dirname) + '/public/build/index.html');

  }//end else


});//end get

router.get('/pedidos', function (req, res, next) {  
  res.redirect(Domain+'/');

});
router.get('/catalogo', function (req, res, next) {  
  res.redirect(Domain+'/');

});
router.get('/catalogo/:producto', function (req, res, next) {  
  res.redirect(Domain+'/');

});

router.get('/admins-page', ensureAuthenticated, function (req, res, next) {
  res.sendFile(path.dirname(__dirname) + '/views/index.html');
  

});


router.get('/admins-page/:params', function (req, res, next) {
  res.redirect(Domain+'/admins-page');
});


router.get('/admins-users', function (req, res, ) {
  res.sendFile(path.dirname(__dirname) + '/views/admins-users-form.html');
});
/*
router.get('/admins-menu/suppliers', ensureAuthenticated, function (req, res, next) {
  res.sendFile(path.dirname(__dirname) + '/views/suppliers-form.html');
});
router.get('/admins-menu/delivers', ensureAuthenticated, function (req, res, next) {
  res.sendFile(path.dirname(__dirname) + '/views/delivers-form.html');
});
router.get('/admins-menu/products', ensureAuthenticated, function (req, res) {
  res.sendFile(path.dirname(__dirname) + '/views/products-form.html');
});
router.get('/admins-menu/config', ensureAuthenticated, function (req, res) {
  res.sendFile(path.dirname(__dirname) + '/views/config-form.html');
});*/
module.exports = router;
