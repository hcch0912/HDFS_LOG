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
  // Start the application after the database connection is ready
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
    var file = './data/llogs.json';
    var data ;
        jsonfile.readFile(file, function(err, obj) {
          if(err) console.log(err);
          else{
            obj.data.forEach(function(row){
                db.collection('log').insert(row);
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
    var users = ["All","root","other"]
    res.send(users);
});

app.get('/api/heatMapData',function(req,res){

   var file = './data/pm25.json'
    jsonfile.readFile(file, function(err, obj) {
      return res.json(obj);
    })



});

app.get('/api/barChartData',function(req,res){
        var data = {
        labels: [
            'resilience', 'maintainability', 'accessibility',
            'uptime', 'functionality', 'impact'
        ],
        series: [
            {
            label: '2012',
            values: [4, 8, 15, 16, 23, 42]
            },
            {
            label: '2013',
            values: [12, 43, 22, 11, 73, 25]
            },
            {
            label: '2014',
            values: [31, 28, 14, 8, 15, 21]
            },]
        };
        return res.json(data);
})

//time from 0 - 5
app.get('/api/lineChartData',function(req,res){
    var filters = {
        'time' : 3,
        'user': ['root']
    }
    dataU.getLine(db,filters,res);
});

app.get('/api/bubbleChartData',function(req,res){
  filters = req.body.params;
  dataU.getBubbleData(db,filters,res);
});


app.get('/api/logs',function(req,res){

   dataU.getLogsByUser(db,'root',function(err, data){
            if (err) {
                return res(err);
            } else {
                return res.json(data);
            }
        });
});


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