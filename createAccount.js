const express = require('express'),
  app = express(),
  url = require('url'),//under userVerify
  nodemailer = require('nodemailer'),//send verification email
  session = require('express-session'),
  fs = require("fs"), path = require("path");//for upload images

//user defined module
const doc = require("./Schemas.js");

//session setup
app.use(session({
  secret: 'recommand 128 bytes random string',
  cookie: { maxAge: 60 * 1000 }
}));

//module functions
exports.userLogin = function(req,res){
  let conditions = {email: req.body.email, passWord: req.body.password, verify: true};
  doc.User.findOne(conditions,(err,e)=>{
    if (err){
      res.send(err);
    }
    else if(e != null){
      req.session.user = req.body.email; //requires js session
      res.redirect('/home');
    }
    else{
      res.send("Can't find acc or password is wrong");
    }
  });
};

exports.userVerify = function(req,res){
    var q = url.parse(req.url, true);
    var qdata = q.query;

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

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    
    //upload image
    var obj = {
      userId: req.body.username,
      passWord: req.body.password,
      email: req.body.email,
      picture: {
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: req.file.mimetype
      },
      verify: 0
    }
   
   doc.User.create(obj,(err,e)=>{
    if (err) res.send(err);
    else
      console.log("1 document inserted");
      res.send("Account created, please check your email for verification");
   });
  };
