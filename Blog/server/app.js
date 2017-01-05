var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var bPost = require("./models/posts.js");
var path = require("path");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/blogdb");

app.use(bodyParser.urlencoded({ extended: false}));

app.get("/", function(req, res, next) {
  bPost.find()
    .sort({ date: "descending" })
    .exec(function(err, blog) {
      if (err) { return next(err) }
      res.render("index", { blog: blog });
    });
});

app.get("/newpost", function(req, res, next) {
  res.render("newpost");
});

app.post("/newpost", function(req, res) {
  console.log("post");
  var title = req.body.title;
  var author = req.body.author;
  var body = req.body.body;

  var newPost = new bPost ({
    title: title,
    author: author,
    body: body
  });
  newPost.save(function() {
    res.redirect("/")
  });
});

app.listen(3000, function() {
  console.log("live from 3000")
});
