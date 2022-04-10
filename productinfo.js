const express = require("express");
const mongoose = require("mongoose");
// const Router = require("./routes")
var MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.json());
url = 'mongodb+srv://CSCI3100:Ab123456@cluster0.wkhhe.mongodb.net/User?retryWrites=true&w=majority';

mongoose.connect(url, {

      useNewUrlParser: true, 
      
      useUnifiedTopology: true 
      
      }, err => {
      if(err) throw err;
      console.log('Connected to MongoDB!!!')
      });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
  MongoClient.connect(url, function(err, db) {
      console.log("Connected successfully");
      if (err) throw err;
      var dbo = db.db("User");
      dbo.collection("products").find({}).toArray(function(err, result) {
        if (err) throw err;
      //   console.log(result);
        console.log(JSON.parse(JSON.stringify(result)))
        db.close();
      });
    }); 

