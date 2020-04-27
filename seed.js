var mongoose = require("mongoose");
var Camp = require("./models/camps");
var Comment=require("./models/comment");

var data = [{
    name: "Camp Ground",
    image: "https://2.imimg.com/data2/JD/UU/MY-320337/camp-tent.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

}, {
    name: "Forign Ground",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Camp_4.jpg",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    
}, {
    name: "Yester Ground",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Camp_4.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    
}
]

function seedDB() {

    Camp.deleteMany({}, function (err) {
        if (err)
            console.log(err);
        // else {
        //     console.log("Cams premoved");
        //     data.forEach(function (seed) {
        //         Camp.create(seed, function (err, camp) {
        //             if (err)
        //                 console.log(err);
        //             else {
        //                 console.log("New camp added");
        //                 Comment.create({
        //                     text:"Hello this is a comment",
        //                     author:"JK R"
        //                 },function(err,comment){
        //                     if(err){
        //                         console.log(err);
        //                     } else{
        //                         camp.comments.push(comment);
        //                         camp.save();
        //                         console.log("Comment added");
        //                     }
        //                 })
        //             }
        //         })
        //     })

        // }
    })
}

module.exports = seedDB;
