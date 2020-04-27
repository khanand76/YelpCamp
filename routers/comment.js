//Comment Routes

var express = require("express"),
    router = express.Router({ mergeParams: true }),
    Comment = require("../models/comment")
Camp = require("../models/camps"),
middleware=require("../middleware");

//Comments new
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Camp.findById(req.params.id, function (err, camp) {
        if (err||!camp) {

            console.log(err);
            req.flash("error","no camp found");
            res.redirect("/campgrounds");
        }
        else {
            res.render("comments/new", { camp: camp });
        }
    })

})

//Comments create
router.post("/", middleware.isLoggedIn, function (req, res) {
    var comment = req.body.comment;
    console.log(comment);
    Comment.create(comment, function (err, newcomment) {
        if (err)
            console.log(err);

        else {
            Camp.findById(req.params.id, function (err, camp) {
                if (err)
                    console.log(err);
                else {
                    newcomment.author.id = req.user._id;
                    newcomment.author.username = req.user.username;
                    newcomment.save();
                    camp.comments.push(newcomment);
                    camp.save();
                    console.log("comment saved");
                    console.log(newcomment);
                    req.flash("success","Comment added");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            })
        }
    })


});

//Comment delete
router.delete("/:cid", middleware.isCorrectCommentUser, function (req, res) {


    Comment.findByIdAndRemove(req.params.cid, function (err) {
        if (err)
            console.log(err);
        else {
            // console.log("cid2 "+req.params.cid);

            console.log("Comment deleted");
            req.flash("success","Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//edit comments  form
router.get("/:cid/edit", middleware.isCorrectCommentUser, function (req, res) {

    // Camp.findById(req.params.id, function (err, camp) {
    //     if (err)
    //         console.log(err);
    //     else {
    //         Comment.findById(req.params.cid,function(err,comment){
    //             if(err)
    //             console.log(err);
    //             else{

    //         res.render("comments/update", { camp: camp ,fcomment:comment});
    //             }
    //         })

    //     }
    // })

    Comment.findById(req.params.cid, function (err, comment) {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.render("comments/update", { camp_id: req.params.id, comment: comment });
        }
    })

})

//Comment Update
router.put("/:cid", middleware.isCorrectCommentUser, function (req, res) {
    var comment = req.body.comment;
    // Camp.findById(req.params.id, function (err, camp) {
    //     if (err)
    //         console.log(err);
    //     else {
    //         Comment.findByIdAndUpdate(req.params.cid,comment, function (err, newcomment) {
    //             if (err)
    //                 console.log(err);
    //             else {
    //                 newcomment.author.id = req.user._id;
    //                 newcomment.author.username = req.user.username;
    //                 newcomment.save();
    //                 console.log("Comment saved: " + comment);
    //                 // camp.comments.push(newcomment);
    //                 // camp.save();
    //                 console.log("Comment pushed to camp: " + camp);
    //                 res.redirect("/campgrounds/"+req.params.id);
    //             }

    //         })
    //     }
    // })

    Comment.findByIdAndUpdate(req.params.cid, comment, function (err, newcomment) {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            console.log("Comment updated");
            req.flash("success","Comment updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

module.exports = router;