const User = require('../models/users');
const bcrypt = require("bcryptjs");

module.exports.getLogin = (req, res, next) => {
    console.log("inside the login");
    res.render("auth/login", {
        errMsg: "",
        docTitle: "Login",
        path: "/login",
        isLoggedIn: false
    });
    console.log("login sent ");
    console.log("----------------------------------------");
}
module.exports.postLogin = (req, res, next) => {
    console.log("in the post login -----------------");
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user == null) {
                res.render("auth/login", {
                    errMsg: "Wrong Emial or password",
                    docTitle: "Login",
                    path: "/login",
                    isLoggedIn: false
                });
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        // ----- right Credentials ----
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        req.session.save(() => {
                            res.redirect("/");
                        })
                    } else {
                        // ---- wrong password ---
                        res.render("auth/login", {
                            errMsg: "Wrong Emial or password",
                            docTitle: "Login",
                            path: "/login",
                            isLoggedIn: false
                        });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
}
module.exports.getRegister = (req, res, next) => {
    res.render("auth/register", {
        errMsg: "",
        docTitle: "Register",
        path: "/register",
        isLoggedIn: false
    });
}
module.exports.postRegister = async (req, res, next) => {
    console.log("---- post register -----");
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log(user);
            if (user == null) {
                if (req.body.password == req.body.confirm_password) {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, function (err, hashedPassword) {
                            const newUser = new User({
                                email: req.body.email,
                                password: hashedPassword,
                                cart: { items: [] }
                            })
                            newUser.save()
                                .then(user => {
                                    req.session.isLoggedIn = true;
                                    req.session.user = user;
                                    req.session.save(() => {
                                        res.redirect("/");
                                    })
                                })
                        });
                    });
                } else {
                    res.render("auth/register", {
                        errMsg: "Password and Comfirm Password are not same",
                        docTitle: "Register",
                        path: "/register",
                        isLoggedIn: false
                    });
                }
            } else {
                res.render("auth/register", {
                    errMsg: "This mail already exists",
                    docTitle: "Register",
                    path: "/register",
                    isLoggedIn: false
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
}
module.exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/login')
    })
}