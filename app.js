
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser({uploadDir:'./tmp'}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/push',routes.pushExt);
app.get('/type/:type',routes.getExt);
app.post('/like',routes.like);
app.get('/admin',routes.checkLogin,routes.admin);
app.get('/login',routes.login);
app.post('/login',routes.doLogin);
app.post('/pass',routes.pass);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
