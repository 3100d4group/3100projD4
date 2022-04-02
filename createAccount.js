var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var path = require("path");
var nodemailer = require('nodemailer');

app.use(require('body-parser')());

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/createAccount.html'));
  });
  
app.listen(3000);

app.post('/process', function(req, res) {
    console.log('Form : ' + req.query.form);
    console.log('Name : ' + req.body.name);
    console.log('Email : ' + req.body.email);
    console.log('Password : ' + req.body.password);
    res.sendFile(path.join(__dirname+'/login.html'));
  });

