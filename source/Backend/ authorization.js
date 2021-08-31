const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const users = require('./models/users')
require('dotenv').config({ path: process.cwd() + '/.env' });

const Domain=process.env.DOMAIN;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  users.Users.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    users.Users.findOne({ username: username }, (err, user) => {
      console.log('>>' + username + '? attempted to log in...');
      if (err) { return done(err); }
      if (!user) { 
        console.log('User do not exist...')
        return done(null, false);
       }
       return bcrypt.compare(password, user.password)
              .then(result=>{
                if (!result){
                  console.log('Incorrect Password')
                  return done(null, false);
                }else{
                  console.log('log in successfully, user: ',user.username)
                  return done(null, user);
                }
              })
              .catch(e=>{
                console.log(e);
                return done(null, false);
              })
       
    });
  }//end callback passport.use

));//end passport.use LocalStrategy

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('Is currenty Authenticated')
    return next();
  }
  console.log('Bad attempt to access!')
  res.redirect(Domain+'/login');
};

module.exports = {
 ensureAuthenticated

}