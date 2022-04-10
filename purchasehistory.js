const express = require('express'),
app = express();


const path = require("path");
const session = require('express-session');
const schema = require("./Schemas.js");

exports.purchasehistory = function(req,res){
    //find the user 
    schema.User.findOne( {email: req.session.user}, (err, user)=>{    
        if (err) 
            res.send(err); 
        else{
            productlist='';
            //find the product using the productId stored in purchaseditem
            user.purchaseditem.forEach(item => {
                schema.Product.findOne(
                    {productId: item},(err,product)=>{
                        if(err) res.send(err);
                    //add the html to object productlist
                    productlist+="<div class=\"list-group-item list-group-item-action\">\
                                <span>"+ product.name + "</span><span style=\"float: right\">"
                                +product.price+ "</span></div>";
                    }
                    
                ); 
            //pass the productlist(html) to purchasehistory.ejs
            res.render(path.join(__dirname + '/purchasehistory.ejs'),{ listitem :productlist });
            });  
        }
    });
};
