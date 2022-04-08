//this is changepassword.js
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


exports.changepassword =  function(req, res) {
  schema.User.findOne( {email: req.session.user} ,(err,user)=>{
        if(err) return res.send(err);

        if(req.body.current == user.passWord && req.body.new==req.body.confirm){
            user.passWord = req.body.new;
        }
        user.save();
    });
  };
//Todo:how to link to form: /changepwd