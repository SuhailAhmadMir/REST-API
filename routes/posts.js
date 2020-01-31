const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//get back all the posts
router.get("/", async (req, res) => {
  try {
    //.find will return all the posts, if we want to limit posts then use .find().limit which will return only five elements
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// get a specific post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE A POST
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE A POST
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
//SUBMITS A POST
//
// METHOD 1: BY USING .then()
// router.post("/", (req, res) => {
//   const post = new Post({
//     title: req.body.title,
//     description: req.body.description
//   });

//   post
//     .save()
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => {
//       res.json({ message: err });
//     });
// });
//
// METHOD 2: using async()..await()
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
