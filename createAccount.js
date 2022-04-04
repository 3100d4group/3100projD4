var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var path = require("path");
var nodemailer = require('nodemailer');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://CSCI3100:Ab123456@cluster0.wkhhe.mongodb.net/User?retryWrites=true&w=majority";

app.use(require('body-parser')());

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/createAccount.html'));
  });
  
app.listen(3000);

app.post('/register', function(req, res) {
    console.log('Name : ' + req.body.username);
    console.log('Email : ' + req.body.email);
    console.log('Password : ' + req.body.password);

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'csci3100proj4@gmail.com',
        pass: '@b123456'
      }
    });
    
    var mailOptions = {
      from: 'csci3100proj4@gmail.com',
      to: req.body.email,
      subject: 'Email verification',
      text: 'Testing'
    };
    
    /*transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });*/

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("User");
      var myobj = { username: req.body.username, password: req.body.password, email: req.body.email };
      dbo.collection("Users").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });

    res.sendFile(path.join(__dirname+'/login.html'));
  });