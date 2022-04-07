const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stu128:p090058-@csci2720.m2qbq.mongodb.net/stu128');

const ProductSchema = mongoose.Schema({
    productId: { type: Number, required: true,
    unique: true },
    name: { type: String, required: true },
    price: { type: Number },
    seller: {type: mongoose.ObjectId, ref: 'User'},
    picture:{type: String }
    });
const UserSchema = mongoose.Schema({
    userId: { type: String, required: true,
    unique: true },
    passWord:{type: String, required: true },
    email:{type: String, required: true},
    picture:{type: String },
    verify:{type: Boolean, required: true}
    });
const Producta = mongoose.model('Product',ProductSchema);
const Usera = mongoose.model('User',UserSchema);

exports.User = Usera;
exports.Product = Producta;