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
    fs.readFile(__dirname+'/purchasehistory.html', function(err, html) { //require fs
        if (err) 
            return res.send(err);    
        else{ 
            res.write(html);//express
            schema.User.findOne( {email: req.session.user} .exec(function(err, user){    
                if (err) 
                    return res.send(err); 
                else{
                        res.write(user.purchaseditem);
                    }
                    

            }));
            res.write("</div><br><br></form></body></html>");
            res.end();
            
        }
    });
};
//To do: need to add  to buyproduct.js :
//<div class="list-group-item list-group-item-action"><span>(product)hello </span><span style="float: right">(price)$100 * (quantity)10</span></div>