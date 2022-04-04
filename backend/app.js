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

    app.all('/*', (req, res) => {
        res.sendFile(__dirname + '/homepage.html');
    });
})

const server = app.listen(3000);
