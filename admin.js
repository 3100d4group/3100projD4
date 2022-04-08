const fs = require('fs');

const path = require("path");

const schema = require("./Schemas.js");

const express = require('express');
const app = express();
app.use(require('body-parser')());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stu128:p090058-@csci2720.m2qbq.mongodb.net/stu128');

exports.displayUsers = function(req,res){
    fs.readFile(__dirname+'/admin.html', (err, html)=> {
        if (err) {
            res.send(err);
        }
        else{
            res.write(html);
            schema.User.find().populate('userID').exec(function(err, f){
                if (err) {
                    res.send(err);
                }

            else{
                f.forEach(function(e){

            res.write("\
                        <div class=\"card col-6 col-md-4 col-xl-3 m-3\" style=\"height : 20rem;\">\
                        <img src=\"\" class=\"card-img-top\" alt=\"...\">\
                        <div class=\"card-body\">\
                        <h5 class=\"card-title\">User ID: "+e.userId+"<br></h5>\
                        <p class=\"card-text\">Password: "+e.passWord+"<br>\
                        Email: "+e.email+"</p>\
                        <a href=\"#\" class=\"btn btn-primary\">Reset Password</a>\
                        <a href=\"#\" class=\"btn btn-primary\">Delete Account</a>\
                        </div>\
                        </div>");
        });
    }
})
}})}

exports.resetPW=function(req,res){
    let conditions={userId: }, update={$set:{passWord:"000"}};
    document.User.updateOne(conditions, update, (err,e)=>{
        if (err){
            res.send(err);
          }
          else if(e != null){
            res.send("Reset pasword success.");
          }
    });

}
