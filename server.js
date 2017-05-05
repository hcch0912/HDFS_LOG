require('babel-register');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var async = require('async');
var colors = require('colors');
var mongodb = require('mongodb');
var request = require('request');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var swig  = require('swig');
var xml2js = require('xml2js');
var _ = require('underscore');
var jsonfile = require('jsonfile')
var config = require('./config');
var routes = require('./app/routes');
var app = express();

var dataU = require('./data.js');
var fs = require("fs");
var d3 = require("d3");

var dbUrl = 'mongodb://192.168.101.155:27017/';
var dbLocal = 'mongodb://localhost:27017';
var url = 'mongodb://root:whoami@192.168.101.155:27017';
var dbUsername = 'root';
var dbPassword = 'whoami';
var MongoClient = mongodb.MongoClient
    , format = require('util').format;


var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once
MongoClient.connect(dbLocal, function(err, database) {
  if(err) throw err;
  console.log("database connected");
  db = database;
  //Start the application after the database connection is ready
  // db.authenticate(dbUsername,dbPassword,'--authenticationDatabase admin',function(err,res){
  //           if(err)
  //           {
  //               console.log('Error');
  //           }
  //           else
  //           {
  //               console.log('Auth Success');
  //           }
  // });
  app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
});

// Reuse database object in request handlers
app.get("/api/test", function(req, res) {
  console.log("in test");
  var response;

 db.collection('log').find({}, function(err, docs) {
   if(err)  console.log(err);
    docs.forEach(function(err, doc) {
      if(doc) {
       // console.log(doc);
        response.push(doc);
      }
      else {
        console.log(err);
        res.end();
      }
    });
  });
});

app.get('/api/insert',function(req,res){
    var file = './data/logfake.json';
    var data ;
        jsonfile.readFile(file, function(err, obj) {
          if(err) console.log(err);
          else{
            obj.data.forEach(function(row){
                db.collection('hdfs_log').insert(row);
            });
          }
        })
  
});

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/users',function(req,res){
    var users = ["All","root","hui","chen","admin","test1"];
    res.send(users);
});

app.get('/api/heatMapData',function(req,res){

   var file = './data/pm25.json'
    jsonfile.readFile(file, function(err, obj) {
      return res.json(obj);
    })



});

app.get('/api/barChartData',function(req,res){
    var filters = {
        'time' : 6,
        'users': ['root', 'hui', 'chen']
    }
    dataU.getBar(db,filters, res);
})

//time from 0 - 5
app.get('/api/lineChartData',function(req,res){
    var filters = {
        'time' : 0,
        'users': ['root', 'hui', 'chen']
    }
    dataU.getLine(db,filters,res);
});

app.get('/api/bubbleChartData',function(req,res){
   var filters = {
        'time' : 6,
        'users': ['root', 'hui', 'chen']
    }
  dataU.getBubble(db,filters,res);
});


app.get('/api/logs',function(req,res){

  // query = {'object':'VectorData'}
  var currentTime =  new Date('2017-04-07 23:48:24');
   query = {"timestamp" :{ $gte: new Date(currentTime -  1000 * 60 * 60 * 24).toISOString()},}
    dataU.queryU(db,query,function(err,data){
       if (err) {
                  return res(err);
              } else {
                  return res.json(data);
              }
    });
});

app.get('/api/userAnaData', function(req,res){
             var data = [ 
                     {"id":"Users"}, 
                     {"id":"Users.root"}, 
                     {"id":"Users.root.登录","value":44, "color":"#FF9900"}, 
                     {"id":"Users.root.用户管理","value":21, "color":"#F6854D"}, 
                     {"id":"Users.root.审计","value":13, "color":"#D6BA33"}, 
                     {"id":"Users.hui"}, 
                     {"id":"Users.hui.登录","value":50, "color":"#6DB33F"},
                     {"id":"Users.hui.上传","value":23, "color":"#5FA134"},
                     {"id":"Users.hui.下载","value":23, "color":"#005F0F"},
                     {"id":"Users.chen"}, 
                     {"id":"Users.chen.上传","value":49, "color":"#00A0D2"},
                     {"id":"Users.chen.新建","value":33, "color":"#00618A"},
                     {"id":"Users.chen.登录","value":13, "color":"#0678BE"}
               ]

               return res.send(data);

})

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
        var page = swig.renderFile('views/index.html', { html: html });
        res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});




// app.listen(app.get('port'), function() {
//   console.log('Express server listening on port ' + app.get('port'));
// });