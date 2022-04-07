/*var http = require('http');
var fs = require('fs');*/
var express = require('express');
var app = express();
/*var path = require("path");
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url ="mongodb+srv://CSCI3100:Ab123456@cluster0.wkhhe.mongodb.net/User?retryWrites=true&w=majority";
*/

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stu128:p090058-@csci2720.m2qbq.mongodb.net/stu128');

const schema = require("./Schemas.js");

app.use(require('body-parser')());

/*app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/createproduct.html'));
  });*/
  

exports.createProduct =  function(req, res) {
  schema.Product.findOne()
    .sort({ productId: -1 })
    .exec((err,e)=>{
      if (err)
      res.send(err);
      else{
        schema.User.findOne({email:req.session.user})
        .exec((err,f)=>{
          if (err)
          res.send(err);
          else if(f == null){
            res.send("error: user does not exist");
          }
          else{
            if(e == null)
              newId = 0;
            else
              newId = e.productId+1;
            console.log(newId);
            postUserId = f._id;
            schema.Product.create({
              productId: newId,
              name: req.body.productname,
              remain: req.body.quantity,
              price: req.body.price,
              seller: f._id,
              contact: req.body.contact
            },(err,g)=>{
              if (err) 
                res.send(err);
              else
                console.log("1 product inserted");
                res.send("Product created!");
            });
          }
        });
      }
    });
    /*MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("Product");
      var myobj = { productname: req.body.productname, quantity: req.body.quantity, remain: req.body.quantity, price: req.body.price, contact: req.body.contact ,picture:req.body.productpic};
      dbo.collection("Users").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });*/

  };
