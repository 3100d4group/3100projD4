//this is changepassword.js
const schema = require("./Schemas.js");


exports.changepassword =  function(req, res) {
  schema.User.findOne( {email: req.session.user} ,(err,user)=>{
        if(err) return res.send(err);

        if(req.body.current == user.passWord && req.body.new==req.body.confirm){
            user.passWord = req.body.new;
            user.save();
            res.send("Password updated!");
        }
        else{
            res.send("Wrong old password or confirm password not match")
        }
    });
  };
