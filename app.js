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

// MONGOOSE/MODEL CONFIG
// Schema for blog
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now()}
});
// compile into a model
var Blog = mongoose.model("Blog", blogSchema);


// Sample blog post
// Blog.create({
//   title: "test blog",
//   image: "https://www.theblogstarter.com/wp-content/uploads/2014/02/4.jpg",
//   body: "Sample test blog!!!"
// });


// ============
// ROUTES
// ============
app.get("/", function(req, res){
  res.redirect("/blogs");
});


// index
app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if (err) {
      console.log("ERROR!!!");
    } else {
      res.render("index", {blogs: blogs});
    }
  });

});




app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
