
const express = require('express');
const path = require('path');

const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminsRouter = require('./routes/admins');
const loginRouter = require('./routes/login');

const storeRouter=require('./routes/store')

var app = express();

require('dotenv').config();


const port = process.env.PORT || 5000;
const COOKIE_SECRET=process.env.COOKIE_SECRET;

// -----------------mongoose connection---------------------
const uri = process.env.ATLAS_URI;
mongoose.set('useUnifiedTopology', true);// to avoid deprecation warning
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB Atlas database connection successfully!')
})
//------------------------------------------------------------



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors())

//config session
 const timeSession=parseInt(process.env.SESSION_TIME_MIN)*60*1000;
app.use(session({
  name:'_portal.connect',
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  cookie: { maxAge: timeSession },
  store: MongoStore.create({
    mongoUrl: uri
    //touchAfter: 30 * 3600 // time period in seconds
  })
}));//end middleware

//passport middleware
app.use(passport.initialize())
app.use(passport.session())
//require authorization config
const auth=require('./ authorization');
const  ensureAuthenticated=auth.ensureAuthenticated;

app.use('/',indexRouter);
app.use('/users', usersRouter);
app.use('/admins',ensureAuthenticated, adminsRouter);
app.use('/login', loginRouter);
app.use('/store', storeRouter);


app.use(function (req, res) {
  res.status(404).send('<h1>Error 404</h1>Página no encontrada, pruebe otra ruta');
});



app.use(function (err, req, res) {
  console.error(err.stack);
  res.status(500).send('<h1>Error 500</h1>Algo anda mal!');
});

app.listen(port, () => {
  console.log(`Server is running  on port: ${port} ...`);
})

module.exports = app;
