const express = require('express'),
    app = express(),
    cors = require('cors'), //HTML form submittion
    bodyParser = require('body-parser'),
    path = require("path"),//.path
    session = require('express-session'),//session
    mongoose = require('mongoose'),
    multer = require("multer");//for uploading image

mongoose.connect('mongodb+srv://CSCI3100:Ab123456@cluster0.wkhhe.mongodb.net/User?retryWrites=true&w=majority');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('html', require('ejs').renderFile);
app.use(session({
  secret: 'recommand 128 bytes random string',
  cookie: { maxAge: 60 * 1000 }
}));

//multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
 
var upload = multer({ storage: storage })

//user defined modules
const createAcc = require("./createAccount.js");//creating account and login
const createProd = require("./createproduct.js");//create product
const home = require("./homepage.js");//load homepage where it display all the product
const profile = require("./myprofile.js");//display my profile
const changepassword = require("./changepassword.js");//change password

//start
const db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console,
'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
    console.log("Connection is open...");

    app.all('/', (req, res) => {
        if(!req.session.user){
            res.redirect('/login');
        }
        else{
            home.loadHome(req,res);
        }
    });
    app.get('/register', (req, res) => {
        res.sendFile(__dirname + '/createAccount.html');
    });
    app.post('/register', upload.single('propic'), function(req, res) {
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
        if(!req.session.user){
            res.redirect('/login');
        }
        else
            res.sendFile(path.join(__dirname+'/createproduct.html'));
      });
    app.post('/createProduct',upload.single('productpic'), function(req,res){
        if(!req.session.user){
            res.redirect('/login');
        }
        else{
            createProd.createProduct(req,res);
        }
    });
    app.get('/myprofile',function(req,res){
        if(!req.session.user){
            res.redirect('/login');
        }
        else
            profile.myProfile(req,res);
    });
    app.get('/changepassword',function(req,res){
        if(!req.session.user){
            res.redirect('/login');
        }
        else
            res.sendFile(path.join(__dirname+'/changepassword.html'));
    });
    app.post('/changepassword',function(req,res){
        if(!req.session.user){
            res.redirect('/login');
        }
        else
            changepassword.changepassword(req,res);
    });
    app.get('/logout',function(req,res){
        req.session.destroy();
        res.redirect('/login');
    });
})

const server = app.listen(3000);
