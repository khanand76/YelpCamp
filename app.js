var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    Camp = require("./models/camps"),
    Comment = require("./models/comment"),
    seedDB = require("./seed"),
    middleware=require("./middleware"),
    flash=require("connect-flash"); //contents of index.js will be automatically required


    // seedDB(); //seed the db



    app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/yelp_camp_v12", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
})

app.use("/campgrounds/:id/comments", require("./routers/comment"));
app.use(require("./routers/index"));
app.use("/campgrounds", require("./routers/camp"));

//==========
//  ROUTES
//==========
app.listen(3000, function () {
    console.log("The YelpCamp Server has started!");
})








