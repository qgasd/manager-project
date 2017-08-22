var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var login = require('./routes/login');
var index = require('./routes/index');
var users = require('./routes/users');
var interfaceService = require('./routes/InterfaceController');
var interfaceRefrenceService = require('./routes/interfaceRefrenceController');
var basicParameterService = require('./routes/BasicParameterController');
var employeesService = require('./routes/EmployeesController');
var softwareProductService = require('./routes/SoftwareProductController');
var interfaceRefrence = require('./routes/interfaceRefrenceController');
var interfaceIOService = require('./routes/interfaceIOController');
var app = express();
//设置跨域访问
app.all("*", function (req,res,next) {
  let allowedOrigins = [
    "http://localhost:4200",
    "http://172.21.21.254:4200",
    "http://172.21.21.68",
    "http://172.21.21.210",
    "http://172.21.21.254",
    "http://172.21.21.223"
  ];
　// 这里是允许跨域的的domain列表
  let origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Credentials", true);// Allow Cookie
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'keyboard cat', 
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 1000 * 60,
      httpOnly:false
  }
}));

app.post('/checkLogin',function(req, res, next) {
    var sessionId = req.cookies.sessionId;
    var cookie = req.cookies;
    var session = req.session;
   // console.log(cookie);
      if(cookie.account!=undefined){
        res.send({'cookie':cookie});
      }else{
        if(sessionId==undefined){
          session.destroy();
          res.send({'sign':false});
        }else{
          res.send({"session":session});
        }
      }
  next();
});
app.get('/logoout',function(req,res,next){

  req.session.destroy();
  res.clearCookie('account');
  res.clearCookie('sessionId');
  res.clearCookie('groups');
  if(req.session == null )
  res.send({"message":"清除成功"});
  next();
})

app.use('/', index);
app.use('/users', users);
app.use('/loginAuthentication',login);
app.use('/basicParameter',basicParameterService);
app.use('/employees',employeesService);
app.use('/softwareProduct',softwareProductService);
app.use('/interface',interfaceService);
app.use('/interfaceRefrence',interfaceRefrenceService);
app.use('/interfaceIO',interfaceIOService)
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
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
