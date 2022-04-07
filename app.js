const express = require('express');
const app = express();

const cors = require('cors'); 
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stu128:p090058-@csci2720.m2qbq.mongodb.net/stu128');

var session = require('express-session');

var path = require("path");

app.use(require('body-parser')());
app.use(session({
  secret: 'recommand 128 bytes random string',
  cookie: { maxAge: 60 * 1000 }
}));

const createAcc = require("./createAccount.js");
const createProd = require("./createproduct.js");
const home = require("./homepage.js");

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
    app.get('/verify',function(req,res){
        createAcc.userVerify(req, res);
    });
    app.get('/login',function(req,res){
        res.sendFile(path.join(__dirname+'/login.html'));//requires path
    });
    app.post('/login',function(req,res){
        createAcc.userLogin(req,res);
    });
    app.get('/home',function(req,res){
        if(!req.session.user){
            res.redirect('/login');
        }
        else{
            home.loadHome(req,res);
        }
    });
    app.get('/createProduct',function(req,res){
        res.sendFile(path.join(__dirname+'/createproduct.html'));
      });
    app.post('/createProduct',function(req,res){
        if(!req.session.user){
            res.redirect('/login');
        }
        else{
            createProd.createProduct(req,res);
        }
    });
})

const server = app.listen(3000);
