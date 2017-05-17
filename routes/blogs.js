var express = require('express');
var router = express.Router();
var blogController = require("../controllers/blogController")


router.get('/', blogController.getAllBlog);
// router.get('/:id', blogController.getOneBlog)
router.post('/', blogController.insertBlog);
router.put('/:id', blogController.updateBlog)
router.delete('/:id',blogController.deleteBlog)



module.exports = router;
