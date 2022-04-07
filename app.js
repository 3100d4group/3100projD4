const express = require('express');
const app = express();

const cors = require('cors'); 
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stu128:p090058-@csci2720.m2qbq.mongodb.net/stu128');

const createAcc = require("./createAccount.js");

const db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console,
'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
    console.log("Connection is open...");
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

    app.all('/', (req, res) => {
        res.sendFile(__dirname + '/createAccount.html');
    });
    app.post('/register', function(req, res) {
        createAcc.registerAccount(req, res);
    });
})

const server = app.listen(3000);