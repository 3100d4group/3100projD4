var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var path = require("path");
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url ="mongodb://localhost:27017/";

app.use(require('body-parser')());

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/createproduct.html'));
  });
  
app.listen(3000);

app.post('/testjs', function(req, res) {

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("Product");
      var myobj = { productname: req.body.productname, quantity: req.body.quantity, remainquantity: req.body.quantity, price: req.body.price, contact: req.body.contact };
      dbo.collection("Users").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });

  });
