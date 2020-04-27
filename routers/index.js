


var express=require("express"),
    router=express.Router(),
    User=require("../models/user")
    passport=require("passport");

    router.get("/", function (req, res) {
        res.render("home");
    })


//AUTH ROUTES
router.get("/register", function (req, res) {
    res.render("register");
})

router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error",err.message);
            return res.redirect("register");
        }

        else {
            passport.authenticate("local")(req, res, function () {
                req.flash("success","Successfully registered! Welcome "+user.username+"!");
                res.redirect("/campgrounds");
            })
        }
    })
})

//login routes

router.get("/login", function (req, res) {
    res.render("login");
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash:true,
    successFlash:"Login successful!"
}), function (req, res) {

    
    
})

//logout

router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/");
})



module.exports=router;