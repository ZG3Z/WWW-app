var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var customerRouter = require('./routes/customerRoute');
var bikeRouter = require('./routes/bikeRoute');
var rentalRouter = require('./routes/rentalRoute');

var customerApiController = require('./routes/api/CustomerApiRoute');
var bikeApiController = require('./routes/api/BikeApiRoute');
var rentalApiController = require('./routes/api/RentalApiRoute');

const authUtil = require('./util/authUtils');

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
  .catch(err => {
    console.log(err);
  });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

app.use('/', indexRouter);
app.use('/customers', authUtil.permitAuthenticatedUser, customerRouter);
app.use('/bikes', authUtil.permitAuthenticatedUser, bikeRouter);
app.use('/rentals', authUtil.permitAuthenticatedUser, rentalRouter);

app.use('/api/customers', customerApiController);
app.use('/api/bikes', bikeApiController);
app.use('/api/rentals', rentalApiController);

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
