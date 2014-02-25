
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3030);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));

// connect 内建的中间件，在开发环境下使用，在终端显示简单的日志
// 假如你去掉这一行代码，不管你怎么刷新网页，终端都只有一行 Express server listening on port 3030
app.use(express.logger('dev'));

// connect 内建的中间件，用来解析请求体，支持 application/json， application/x-www-form-urlencoded, 和 multipart/form-data
app.use(express.bodyParser());

app.use(express.json());
app.use(express.urlencoded());

// connect 内建的中间件，可以协助处理 POST 请求，伪装 PUT、DELETE 和其他 HTTP 方法
app.use(express.methodOverride());

app.use(app.router);

// connect 内建的中间件，设置根目录下的 public 文件夹为存放 image、css、js 等静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// 全局路由控制，./routes/index.js
routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
