var express = require("express"),
    router = express.Router(),
    Camp = require("../models/camps"),
    middleware = require("../middleware");




router.get("/", function (req, res) {
    Camp.find({}, function (err, camps) {
        if (err)
            console.log(err);
        else {
            res.render("camps/index", { campgrounds: camps });
        }
    })
    // res.render("campgrounds",{campgrounds:campgrounds});
})

//New
router.get("/new", middleware.isLoggedIn, function (req, res) {

    res.render("camps/new");
})

//Show
router.get("/:id", function (req, res) {
    var id = req.params.id;
    Camp.findById(id).populate("comments").exec(function (err, camp) { ///Can also use Camp.findById(id,callback)
        if (err) {
            req.flash("error","Camp not found");
            console.log(err);
            res.redirect("/campgrounds");
        }
        else if(!camp){
            req.flash("error","Camp not found");
            res.redirect("/campgrounds");
        }

        else {


            res.render("camps/show", { camps: camp });

        }
    })

})

//Create
router.post("/", middleware.isLoggedIn, function (req, res) {

    Camp.create(req.body.camp, function (err, camp) {
        if (err)
            console.log(err);
        else {
            camp.user.id = req.user._id;
            camp.user.username = req.user.username;
            camp.save();
            // console.log("Camp: "+camp);
            console.log("We added a new campground:");
            console.log(camp);
            req.flash("success", "Camp added");
            res.redirect("/campgrounds");
        }
    })
    // campgrounds.push({name:req.body.name,image:req.body.url});

})



//DELETE
router.delete("/:id", middleware.isCorrectCampUser, function (req, res) {


    Camp.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            req.flash("error", err.message);
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            console.log("camp deleted");
            req.flash("success", "Post deleted!")
            res.redirect("/campgrounds")
        }
    })
})

//EDIT CAMP
router.get("/:id/edit", middleware.isCorrectCampUser, function (req, res) {

    Camp.findById(req.params.id, function (err, camp) {
        if (err) {
            res.redirect("/campgrounds");
            console.log(err);
        }

        else {
            res.render("camps/update", { camp: camp });
        }
    })

});

//UPDATE
router.put("/:id", middleware.isCorrectCampUser, function (req, res) {

    var camp = req.body.camp;
    Camp.findByIdAndUpdate(req.params.id, camp, function (err, newcamp) {
        if (err)
            console.log(err);
        else {
            console.log(newcamp);
            newcamp.user.id = req.user._id;
            newcamp.user.username = req.user.username;
            newcamp.save();
            console.log("Camp updated");
            //console.log(newcamp);
            req.flash("success", "Camp updated");
            res.redirect("/campgrounds/" + req.params.id);

        }
    })
})

module.exports = router;