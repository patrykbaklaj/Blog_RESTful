var express     = require("express"),
app             = express();
bodyParser      = require("body-parser"),
methodOverride  = require("method-override"),
sanitizer       = require("express-sanitizer"),
mongoose        = require("mongoose");

// connecting to the mongoDB
mongoose.connect("mongodb://localhost/restful_blog_app");

// settings for app
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(sanitizer());

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

// NEW ROUTE
app.get("/blogs/new", function(req, res){
  res.render("new");
});


// CREATE ROUTE
app.post("/blogs", function(req, res){
  // sanitizing
  req.body.blog.body = req.sanitize(req.body.blog.body);
  // creating blog
  Blog.create(req.body.blog, function(err, newBlog){
    if (err) {
      console.log("An error occurred");
      res.render("new");
    } else {
      // redirect to index
      res.redirect("/blogs");
    }
  });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if (err) {
      console.log("An error occurred");
      res.redirect("blogs");
    } else {
      res.render("show", {blog: foundBlog});
    }
  });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if (err) {
      console.log("An error occurred");
      res.redirect("/blogs");
    } else {
      res.render("edit", {blog: foundBlog});
    }
  });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  })
});

// DESTROY ROUTE
app.delete("/blogs/:id", function(req, res){
  // destroy blog
  Blog.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.redirect("/blogs");
    } else {
      // redirecting
      res.redirect("/blogs");
    }
  });
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
