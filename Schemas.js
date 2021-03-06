/*
    Schemas which indicates the type of data
    module name: Database schemas
    programmer: Wong Ngou Shan, Yip Yuk Pang
    version:1.0 (8 April 22)
*/
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://CSCI3100:Ab123456@cluster0.wkhhe.mongodb.net/User?retryWrites=true&w=majority');

const ProductSchema = mongoose.Schema({         //product information
    productId: { type: Number, required: true,
    unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    seller: {type: mongoose.ObjectId, ref: 'User', required: true},
    remain: {type: Number, required: true},
    picture:{ data: Buffer, contentType: String },
    contact:{type: String, required: true}
});
const UserSchema = mongoose.Schema({          //user account information
    userId: { type: String, required: true,
    unique: true },
    passWord:{type: String, required: true },
    email:{type: String, required: true, unique: true},
    picture:{ data: Buffer, contentType: String },
    verify:{type: Boolean, required: true},
    isAdmin:{type: Boolean, required: true}    
});
const HistorySchema = mongoose.Schema({    //user buying history
    buyer:{type: mongoose.ObjectId, ref: 'User', required: true},
    product:{type: mongoose.ObjectId, ref: 'Product', required: true},
    quantity: { type: Number, required: true },
    date: {type: Date ,required:true}
});    
const Producta = mongoose.model('Product',ProductSchema);
const Usera = mongoose.model('User',UserSchema);
const Historya = mongoose.model('History',HistorySchema);

exports.User = Usera;
exports.Product = Producta;
exports.History = Historya;
