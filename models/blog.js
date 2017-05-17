var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({

  name: String,
  email: String,
  tittle: String,
  content : String
});

var Blog = mongoose.model('blogs', blogSchema);

module.exports = Blog;
