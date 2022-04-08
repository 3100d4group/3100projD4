const fs = require('fs');

const path = require("path");

const schema = require("./Schemas.js");

const express = require('express');
const app = express();
app.use(require('body-parser')());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stu128:p090058-@csci2720.m2qbq.mongodb.net/stu128');

    /*
    const ProductSchema = mongoose.Schema({
        productId: { type: Number, required: true,
        unique: true },
        name: { type: String, required: true },
        price: { type: Number },
        seller: {type: mongoose.ObjectId, ref: 'User'},
        picture:{type: String }
        });
    const UserSchema = mongoose.Schema({
        userId: { type: Number, required: true,
        unique: true },
        name: { type: String, required: true },
        passWord:{type: String, required: true },
        email:{type: String, required: true},
        picture:{type: String },
        verify:{type: Boolean, required: true}
        });
    const Product = mongoose.model('Product',ProductSchema);
    const User = mongoose.model('User',UserSchema);   */
    
exports.loadHome = function(req,res){
    fs.readFile(__dirname+'/myprofile.html', function(err, html) { //require fs
        if (err) 
            return res.send(err);    
        else{ 
            res.write(html);//express
            schema.User.findOne( {email: req.session.user} .exec(function(err, user){    
                if (err) 
                    return res.send(err); 
                else{
                        res.write("<a href=\"#\" class=\"btn btn-primary ms-5 mt-3\">Upload new profile photo</a>\
                        <h3 class=\"mx-5 mt-5\">Username:</h3><h3 class=\"mx-5\" id=\"username\">"+user.name+"</h3>\
                        <br><h3 class=\"mx-5\">Email:</h3><h3 class=\"mx-5\" id=\"email\">"+user.email+"</h3>");
                    }//Todo:upload new profile photo (href)
            }));
            res.write("<a href=\"/purchasehistory.html\" class=\"btn btn-primary ms-5 mt-3\">View Order History</a>\
            <a href=\"/changepassword.html\" class=\"btn btn-primary ms-5 mt-3\">Change Passsword</a>\
            <a href=\"/login.html\" class=\"btn btn-danger ms-5 mt-3\">Logout</a></div></body></html>");
            res.end();
            
        }
    });
};