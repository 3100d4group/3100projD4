//this is handleproduct.js, name change from buyproduct.js
const express = require('express'),
  app = express();

//user defined module
const schema = require("./Schemas.js");

exports.handleProd = function(req,res){
    if (req.body.action == 'Buy'){
        res.send("ToDo: buy");
    }
    else if(req.body.action == 'Delete'){
        schema.Product.findOne({ productId: req.body.product}).remove((err,e)=>{
            if (err){
                res.send(err);
            }
            else if(e.deletedCount == 0){
                alert("Error : Nothing deleted");
                res.redirect('/home');
            }
            else{
                res.redirect('/home');
            }
        });
    }
    else{
        res.send("Error: unknown action");
    }
};
