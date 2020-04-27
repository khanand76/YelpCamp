var Camp = require("../models/camps"),
    Comment = require("../models/comment"),
    middleWareObj = {};

middleWareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        console.log("not logged in");
        req.flash("error", "You have to login to do that");
        res.redirect("/login");
    }
};

middleWareObj.isCorrectCampUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        Camp.findById(req.params.id, function (err, camp) {
            if (err) {
                req.flash("error", "Camp not found!");
                console.log(err);
                res.redirect("back");
            }

            else if (!camp) {
                req.flash("error", "Camp not found!");
                console.log("Camp not found");
                res.redirect("back");

            }

            else {
                if (camp.user.id.equals(req.user._id)) { //equals is a built in method that comes with mongoose 
                    console.log("correct user");
                    next();
                }
                else {
                    console.log("Wrong user");
                    req.flash("error", "You cannot do that");
                    res.redirect("/campgrounds/" + req.params.id)

                }
            }
        }
        )
    }
    else {
        console.log("Not logged in");
        req.flash("error", "You have to login to do that");
        res.redirect("/login");
    }
}

middleWareObj.isCorrectCommentUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.cid, function (err, comment) {
            if (err){
                console.log(err);
                req.flash("error","Comment not found!");
                res.redirect("/campgrounds");
            }
                

            else if (!comment) {
                req.flash("error","Comment not found!");
                console.log("Comment not found");
                res.redirect("/campgrounds");

            }
            else {
                console.log(comment);

                if (comment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    console.log("Wrong user");
                    req.flash("error", "You cannot do that!");
                    res.redirect("/campgrounds/" + req.params.id)
                }
            }
        }
        )
    }
    else {
        console.log("Not logged in");
        req.flash("error", "You have to login to do that");
        res.redirect("/login");
    }
}

module.exports = middleWareObj;