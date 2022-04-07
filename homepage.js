const fs = require('fs');

const path = require("path");

const schema = require("./Schemas.js");

const express = require('express');
const app = express();
app.use(require('body-parser')());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stu128:p090058-@csci2720.m2qbq.mongodb.net/stu128');

exports.loadHome = function(req,res){
    fs.readFile(__dirname+'/homepage.html', (err, html)=> { //require fs
        if (err) {
            res.send(err); 
        }       
        else{ 
            res.write(html);//express
            schema.Product.find().populate('seller').exec(function(err, f) {    
                if (err) {
                    res.send(err); 
                }
                else{
                    f.forEach(function(e){
                        res.write("\
                        <div class=\"card col-6 col-md-4 col-xl-3 m-3\" style=\"height : 20rem;\">\
                        <img src=\"\" class=\"card-img-top\" alt=\"...\">\
                        <div class=\"card-body\">\
                        <h5 class=\"card-title\">"+e.name+"<br></h5>\
                        <p class=\"card-text\">Price: $"+e.price+"<br>\
                        "+e.remain+" remaining<br>\
                        Contact: "+e.contact+"<br>\
                        Posted by "+e.seller.userId+"</p>\
                        Ref: productId "+e.productId+"</p>\
                        <a href=\"#\" class=\"btn btn-primary\">Buy</a>\
                        </div>\
                        </div>");
                    });
                    res.write("\
                        </div>\
                        </div>\
                        </body>\
                        </html>\
                    ");
                    res.end();
                }
            });
        }
    });
};