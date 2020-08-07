require('dotenv').config();
const path = require('path');
const express = require('express');

//A library that helps us log the requests in the console
const logger = require('morgan');

// Used to setthe favicon for our app
const favicon = require('serve-favicon');

const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const mongoose = require('mongoose');

// Set up the database
require('./configs/db.config');

const app = express();

// Express View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// setting up the middleware to let it know where to find the favicon icon
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Sets up morgan in our middleware so that we can see the requests getting logged
app.use(logger('dev'));

// a body parser to allow us to parse form submissions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// helps us use the cookies from each request
app.use(cookieParser());

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
 
app.use(session({
  secret: 'my-pet-cat',
  cookie: {
    maxAge: 60*60*24*1000 // 1day // in milliseconds 
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60*60*24 // 1 day // value in seconds
  })
}));


// Routes middleware
const indexRouter = require('./routes/index.routes');
app.use('/', indexRouter);

const authRouter = require('./routes/auth.routes');
app.use('/', authRouter);

module.exports = app;