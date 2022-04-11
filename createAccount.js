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
      res.render(__dirname+'/login.ejs',{message:"<p style=\"color:red\">Sorry, but it seems that the account does not exist or you have enter an incorrect password. Please try again.</p>"});
    }
  });
};

exports.userVerify = function(req,res){
    var q = url.parse(req.url, true);
    var qdata = q.query;

    let conditions = {userId: qdata.username,verify:false}, update = {$set:{verify: true}};
    doc.User.updateOne(conditions, update,(err,e)=>{
        if (err){
          res.send(err);
        }
        else if(e.modifiedCount != 0){
          res.render(path.join(__dirname + '/toLogin.ejs'),{message:"<h1>You are good to go!</h1><p>Login to start shopping!</p>"});
        }
        else{
          res.render(path.join(__dirname + '/toLogin.ejs'),{message:"<h1>Opps...</h1><p>Seems like there are some errors, or your have already been verified.</p>"});
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
      html: '<a href="ec2-44-202-57-120.compute-1.amazonaws.com:3000/verify?username=' + req.body.username + '">click here to verify your account</a>'
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
      isAdmin: false,
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
      res.render(path.join(__dirname + '/toLogin.ejs'),{message:"<h1>Account created!</h1><p>Please check your email for verification.</p>"});
   });
  };
