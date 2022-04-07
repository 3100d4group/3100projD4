/*var http = require('http');
var fs = require('fs');*/

var express = require('express');
var app = express();

var url = require('url');

//var path = require("path");

var nodemailer = require('nodemailer');

/*(var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var Mongourl = "mongodb+srv://CSCI3100:Ab123456@cluster0.wkhhe.mongodb.net/User?retryWrites=true&w=majority";
*/

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stu128:p090058-@csci2720.m2qbq.mongodb.net/stu128');

var session = require('express-session');

const doc = require("./Schemas.js");

app.use(require('body-parser')());
app.use(session({
  secret: 'recommand 128 bytes random string',
  cookie: { maxAge: 60 * 1000 }
}));

/*
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/createAccount.html'));
});

app.post('/ToLogin',function(req,res){
  res.sendFile(path.join(__dirname+'/login.html'));
});
*/

exports.userLogin = function(req,res){
  //console.log('Email : ' + req.body.email);
  //console.log('Password : ' + req.body.password);
  let conditions = {email: req.body.email, passWord: req.body.password, verify: true};
  doc.User.findOne(conditions,(err,e)=>{
    if (err){
      res.send(err);
    }
    else if(e != null){
      //console.log(e);
      req.session.user = req.body.email; //requires js session
      res.redirect('/home');
    }
    else{
      res.send("Can't find acc or password is wrong");
    }
  });

  /*MongoClient.connect(Mongourl, function(err, db) {
    if (err) throw err;
    var dbo = db.db("User");
    dbo.collection("Users").find({}, { projection: { email: req.body.email, password: req.body.password, verify: 1 } }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      if(result[0].email == req.body.email && result[0].password == req.body.password){
        res.sendFile(path.join(__dirname+'/homepage.html'));
      }
      else{
        res.sendFile(path.join(__dirname+'/login.html'));
      }
      db.close();
    });
  });*/


};

exports.userVerify = function(req,res){
    var q = url.parse(req.url, true);
    var qdata = q.query;


    /*MongoClient.connect(Mongourl, function(err, db) {
      if (err) throw err;
      var dbo = db.db("User");
      var myquery = { username: qdata.username };
      var newvalues = { $set: {verify: 1 } };
      dbo.collection("Users").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
    });*/
    let conditions = {userId: qdata.username}, update = {$set:{verify: true}};
    doc.User.updateOne(conditions, update,(err,e)=>{
        if (err){
          res.send(err);
        }
        else if(e != null){
          res.send("Verify complete!");
        }
        else{
          res.send("Can't find acc");
      }

    });
  };
  

exports.registerAccount = function (req, res) {
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
      html: '<a href="http://localhost:3000/verify?username=' + req.body.username + '">click here to verify your account</a>'
    };
    console.log(__dirname+'/login.html?username='+req.body.username);
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;

    console.log(filename);
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    /*
    MongoClient.connect(Mongourl, function(err, db) {
      if (err) throw err;
      var dbo = db.db("User");
      var myobj = { username: req.body.username, password: req.body.password, email: req.body.email , verify: 0};
      dbo.collection("Users").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });
    */
   
   doc.User.create({
    userId: req.body.username,
    passWord: req.body.password,
    email: req.body.email,
    verify: 0
   },(err,e)=>{
    if (err) res.send(err);
    else
      console.log("1 document inserted");
      res.send("Account created, please check your email for verification");
   });
  };
