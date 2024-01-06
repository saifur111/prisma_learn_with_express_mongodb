const express = require("express")
const router = express.Router();

const isloggedIn =require("../middleware/isLoggedIn");
const { createPost, updatePost, deletePost, getPosts } = require("../controllers/postController");
router.route("/post/create").post(isloggedIn, createPost);
router.route("/post/update/:postId").put(isloggedIn, updatePost);
router.route("/post/delete/:postId").delete(isloggedIn, deletePost);
router.route("/post/get").get(isloggedIn,getPosts);

module.exports = router;
