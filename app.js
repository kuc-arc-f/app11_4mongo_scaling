var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('express-flash');
var session = require('express-session');
//
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var reactTasksRouter = require('./routes/react_tasks');
var ordersRouter = require('./routes/orders');
var breadsRouter = require('./routes/breads');
var breadOrdersRouter = require('./routes/bread_orders');
var reportBreadsRouter = require('./routes/report_breads');
var reportCategoryRouter = require('./routes/report_category');
var reportTypeRouter = require('./routes/report_type');

//
var apiRouter = require('./routes/api');
var apiOrdersRouter = require('./routes/api_orders');
var apiBreadsRouter = require('./routes/api_breads');
var apiBreadOrdersRouter = require('./routes/api_bread_orders');
var apiReportBreadsRouter = require('./routes/api_report_breads');
var apiReportCategoryRouter = require('./routes/api_report_category');
var apiReportTypeRouter = require('./routes/api_report_type');

var app = express();
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '5mb', extended: true }));
app.use(express.urlencoded({ limit:'5mb' ,extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  next();
});
// CSRF
//express-sessionモジュールを設定する
app.use(session({
  //暗号化に利用するキーを設定
  secret: 'secret key',
  //毎回セッションを作成しない
  resave: false,
  //未初期化状態のセッションを保存しない
  saveUninitialized: false,
  cookie: {
    //生存期間( msec )
    maxAge: 365 * 24 * 60 * 1000,
    //httpsを使用しない
    secure: false
  }
}));
app.use(flash());
//route
app.use('/', indexRouter);
app.use('/login', loginRouter );
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter );
app.use('/react_tasks', reactTasksRouter );
app.use('/orders',  ordersRouter );
app.use('/breads',  breadsRouter );
app.use('/bread_orders',  breadOrdersRouter );
app.use('/report_breads',  reportBreadsRouter );
app.use('/report_category',  reportCategoryRouter );
app.use('/report_type',  reportTypeRouter );

//api
app.use('/api', apiRouter );
app.use('/api_orders', apiOrdersRouter );
app.use('/api_breads',  apiBreadsRouter );
app.use('/api_bread_orders',  apiBreadOrdersRouter );
app.use('/api_report_breads',  apiReportBreadsRouter );
app.use('/api_report_category',  apiReportCategoryRouter );
app.use('/api_report_type',  apiReportTypeRouter );

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
