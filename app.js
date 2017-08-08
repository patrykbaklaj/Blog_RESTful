var express     = require("express"),
    app         = express();
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

// connecting to the mongoDB
mongoose.connect("mongodb://localhost/restful_blog_app");

// settings for app
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.listen(3000, function(){
  console.log("Server is running on port 3000");
});

// title
// image
// bodyParser
// created - date
