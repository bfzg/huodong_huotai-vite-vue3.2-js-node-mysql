var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//功能模块
var user = require('./routes/user')
var usersManage = require('./routes/userManage');
var individual = require('./routes/indiviidual');
var school = require('./routes/school');
//token
var auto = require("./schema/token/authorization");

var app = express();



//解决跨域问题
app.all('*',function (req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//api

app.use('/', indexRouter);
//登录模块
app.use(user);
// app.use(auto.verifyToken);  //验证token
//用户管理模块
app.use('/api',usersManage);
//个人活动管理模块
app.use('/api',individual);
//学校活动管理模块
app.use('/api',school);

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
//修改端口号
process.env.PORT = 3333;

//使用nodemon
var debug = require('debug')('my-application'); // debug模块
app.set('port', process.env.PORT || 3000); // 设定监听端口
 
//启动监听
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

// module.exports = app;
