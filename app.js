var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var blogs = require('./routes/blogs');
const mongoose = require('mongoose');
const cors = require('cors');
var app = express();

var db_config = {
  development: 'mongodb://localhost/blog',
  test: 'mongodb://localhost/blog-test'
}

var app_env =app.settings.env

mongoose.connect(db_config[app_env], function(err,res){
  console.log('connected to Database');
})

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/blogs', blogs);



module.exports = app;
