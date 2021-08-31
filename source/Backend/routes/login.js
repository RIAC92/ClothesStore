var express = require('express');
var router = express.Router();
const path=require('path');
const passport=require('passport');
require('dotenv').config({ path: process.cwd() + '/.env' });

const Domain=process.env.DOMAIN;


router.post('/',
passport.authenticate('local', { failureRedirect: Domain+'/login' }),
function(req, res) {
  res.redirect(Domain+'/admins-page');
});

router.get('/', function(req, res, next) {
    res.sendFile(path.dirname(__dirname)+'/views/login-signin.html');
    return
  });

router.get('/out', function(req, res, next) {
  if (!req.user){
    res.redirect(Domain+'/login');
    return
  }else{  
  console.log(req.user.username,', logout')
    req.logout();
    req.session.destroy(e=>{
        if(e){
            console.log(e)
        }else{
            console.log('the session has been destroyed')
            res.redirect(Domain+'/login');
        }
      });
      
    return
  }
  });


module.exports = router;
