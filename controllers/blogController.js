var method = {}
var Blog = require("../models/blog");




method.getAllBlog = (req, res) => {
  Blog.find(function(err, blogs) {
      if (err) {
          res.send(err)
      } else {
          res.send(blogs);
      }
  });
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


method.insertBlog = (req, res) => {
    if(!validateEmail(req.body.email)){
      res.send({msg: 'email ngaco'})
    }else{
      var blog = new Blog(req.body);
      blog.save(function(err, blog) {
          if (err) {
              res.send(err);
          }
          res.send(blog)
      });
    }

}

method.updateBlog = (req, res, next) => {
    Blog.findById(req.params.id, function(err, blog) {
        // Handle any possible database errors
        if (err) {
            res.send(err);
        } else {
          blog.name = req.body.name || blog.name
          blog.email = req.body.email || blog.email
          blog.tittle = req.body.tittle || blog.tittle
          blog.content = req.body.content || blog.content

            blog.save(function(err, blog) {
                if (err) {
                    res.send(err)
                }
                res.send(blog);
            });
        }
    });
}

method.deleteBlog = (req, res) => {
    Blog.findByIdAndRemove(req.params.id, function(err, blog) {
        var response = {
            message: "blog successfully deleted",
            id: blog._id
        };
        res.send(blog);
    });
}







module.exports = method;
