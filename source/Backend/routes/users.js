var express = require('express');
var router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const users = require('../models/users.js')
require('dotenv').config({ path: path.dirname(__dirname) + '/.env' });


const ADMIN = process.env.SUDO;
const SALT_ROUNDS = parseInt(process.env.SALTROUNDS);
/* GET users listing. */
router.post('/', function (req, res, next) {
  let action = req.query.action;

  if (action === 'newUser') {
    let newUser = req.body;
    console.log(newUser, ADMIN, SALT_ROUNDS)
    if (newUser.admin_password === ADMIN) {
      bcrypt.genSalt(SALT_ROUNDS)//gen Salt
        .then(salt => bcrypt.hash(newUser.password, salt))//gen hash
        .then(hashPassword => {
          return users.Users.create({
            username: newUser.username,
            password: hashPassword,
            created_on: new Date()
          })
        })
        .then(data => {
          console.log(data);
          res.json({ message: 'A new user has been created' })
        })
        .catch(e => {
          console.log(e);
          res.json({ error: 'An error has occurred' })
        })
    } else {
      res.json({ error: 'Incorrect Password' });
    }//end else

  }else if(action==='delete'){
    let admin_password=req.body.admin_password;
    let userId=req.body.id;
    if(admin_password===ADMIN){
      users.Users.deleteOne({_id:userId})
      .then(result=>{
        if(result.n==1){
          res.json({message:'User has been deleted'});
          return
        }else{
          res.json({error:'User do not exist'});
        }
      })
      .catch(e=>{
        console.log(e);
        res.json({error:'A error has occurred'})
      })
    }else{
      res.json({ error: 'Incorrect Password' });
    }//end else
  }

});

module.exports = router;
