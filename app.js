const createError = require('http-errors');
const express = require('express');
const asyncify = require('express-asyncify');
const session = require(`express-session`);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api/jwtApi');

const app = asyncify(express());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret : process.env.sessionSecret,
  resave: false,
  saveUninitialized: true
}));

app.set('jwt-secret', process.env.secret);

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use( (err, req, res, next) => {
  // error 템플릿에 전달할 데이터 설정
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
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
