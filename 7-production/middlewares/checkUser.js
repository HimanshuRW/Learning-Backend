const User = require("../models/users");

module.exports = async (req,res,next)=>{
    console.log("----- in the middle ware -----------");
    if(req.session.isLoggedIn){
        console.log("---------- In the if block of  checkuser --------")
        req.user = await User.findOne({email:req.session.user.email});
        console.log(req.user);
        res.locals.isLoggedIn = true;
        next();
    } else {
        console.log("----- in the else block -----");
        console.log(req.session.isLoggedIn);
        return res.redirect("/login");
    }
}