var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noop = function() {};

var blogPosts = new Schema ({
  title: String,
  author: String,
  date: { type: Date, default: Date.now },
  body: String,
  comments: [{ user: String, date: Date, body: String}]
});

var BPost = mongoose.model("BPost", blogPosts);

module.exports = BPost;
