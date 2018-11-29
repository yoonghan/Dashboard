#!/bin/env node

var express   = require('express'),
  path = require("path"),
  bodyParser = require('body-parser'),
  env         = process.env;

var NodeApp = function() {
  const self = this;

  self.setupVariables = function() {
    self.ipaddress = '0.0.0.0';
    self.port      = 8000;
  };

  //All pages will default to index.html
  self.initializePages = function() {
    self.app.get('/receiver', function(req, res) {
      console.log(req.body, "Message");
      res.status(200).send("OK");
    });

    self.app.get('/receiver/*', function(req, res) {
      console.log(req.body, "Message P");
      res.status(200).send("OK");
    });

    self.app.post('/receiver', function(req, res) {
      console.log(req.body, "Message P");
      res.status(200).send("OK");
    });

    self.app.post('/receiver/*', function(req, res) {
      console.log(req.body, "Message P2");
      res.status(200).send("OK");
    });

    self.app.options('/receiver', function(req, res) {
      console.log(req.body, "Message O");
      res.status(200).send("OK");
    });

    self.app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, '../public/html/index.html'), function(err) {
        if (err) {
          res.status(500).send(err);
        }
      })
    });
  }

  self.initializeServer = function() {
      self.app = express();
      self.app.use(bodyParser.json());//use
      self.app.use(express.static('public'));
      self.initializePages();
  };

  self.initialize = function() {
      self.setupVariables();
      self.initializeServer();
  };

  self.start = function() {
    self.app.listen(self.port, self.ipaddress, function() {
        console.log('%s: Node server started on %s:%d ...',
                    Date(Date.now() ), self.ipaddress, self.port);
    });
  };
};

var zapp = new NodeApp();
zapp.initialize();
zapp.start();
