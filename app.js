var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const i18n = require('i18n');
const cors = require('cors');
const authApiRouter = require('./routes/api/AuthApiRoute');

var indexRouter = require('./routes/index');

var customerRouter = require('./routes/customerRoute');
var bikeRouter = require('./routes/bikeRoute');
var rentalRouter = require('./routes/rentalRoute');

var customerApiController = require('./routes/api/CustomerApiRoute');
var bikeApiController = require('./routes/api/BikeApiRoute');
var rentalApiController = require('./routes/api/RentalApiRoute');
var accessoryApiController = require('./routes/api/AccessoryApiRoute');
var equipmentApiController = require('./routes/api/EquipmentApiRoute');

const authUtil = require('./util/authUtils');

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
  .catch(err => {
    console.log(err);
  });

var app = express();

i18n.configure({
  locales: ['pl', 'en'],
  directory: path.join(__dirname, 'locales'),
  objectNotation: true,
  defaultLocale: 'pl',
  cookie: 'rbike-lang',
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(i18n.init);

const session = require('express-session');
app.use(session({
  secret: 'my_secret_password',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  next();
});

app.use((req, res, next) => {
  if(!res.locals.lang) {
      const currentLang = req.cookies['rbike-lang'];
      res.locals.lang = currentLang;
  }
  next();
});

app.use('/api/auth', authApiRouter);

app.use('/', indexRouter);
app.use('/customers', authUtil.permitAuthenticatedUser, customerRouter);
app.use('/bikes', authUtil.permitAuthenticatedUser, bikeRouter);
app.use('/rentals', authUtil.permitAuthenticatedUser, rentalRouter);

app.use('/api/customers', customerApiController);
app.use('/api/bikes', bikeApiController);
app.use('/api/rentals', rentalApiController);
app.use('/api/accessories', accessoryApiController);
app.use('/api/equipments', equipmentApiController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
