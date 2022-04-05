var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var path = require("path");
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url ="mongodb+srv://CSCI3100:Ab123456@cluster0.wkhhe.mongodb.net/User?retryWrites=true&w=majority";

app.use(require('body-parser')());

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/createproduct.html'));
  });
  
app.listen(3000);

app.post('/createproduct', function(req, res) {

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("Product");
      var myobj = { productname: req.body.productname, quantity: req.body.quantity, remain: req.body.quantity, price: req.body.price, contact: req.body.contact ,picture:req.body.picture};
      dbo.collection("Users").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });

  });
