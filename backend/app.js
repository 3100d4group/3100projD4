const express = require('express');
const app = express();

const cors = require('cors'); 
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stu128:p090058-@csci2720.m2qbq.mongodb.net/stu128');
const db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console,
'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
    console.log("Connection is open...");
    
    const ProductSchema = mongoose.Schema({
        productId: { type: Number, required: true,
        unique: true },
        productname: { type: String, required: true },
        price: { type: Number, required: true },
        quantity:{type: Number, required: true},
        remain:{type: Number, required: true},
        seller: {type: mongoose.ObjectId, ref: 'User'},
        picture:{type: String }
        });
    const UserSchema = mongoose.Schema({
        userId: { type: Number, required: true,
        unique: true },
        username: { type: String, required: true, unique:true },
        password:{type: String, required: true },
        email:{type:String, required: true, unique:true},
        picture:{type: String }
        });
    const Product = mongoose.model('Product',ProductSchema);
    const User = mongoose.model('User',UserSchema);  


    

    app.all('/*', (req, res) => {
        res.sendFile(__dirname + '/login.html');
    });
})


const server = app.listen(3000);
