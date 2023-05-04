const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const authorisation = require('../../middleware/authorisation');

//Route to create new post
router.post('/', [authorisation,
  [
    check('text', 'Text is required for the post!!').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user;
    const user = await User.findById(userId).select('-password');//Get the user but not his password.

    const newPost = new Post({
      user: user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar
    });
    const post = await newPost.save();
    res.json(post);

  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error!!");
  }
})

//Route to fetch all posts (we don't allow user to see all public posts if he is not logged in thus token is needed)
router.get('/', [authorisation], async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });//Sort posts by getting latest post first
    if (posts.length < 1) {
      return res.json({ msg: "No posts Found!!" });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!!');
  }
})

//Route to fetch post by id in link
router.get('/:id', [authorisation], async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found!!" });
    }
    res.json(post);

  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: "Post not found!!" });
    }
    console.error(err.message);
    res.status(500).send("Server Error!!");
  }
})

//Route to delete post by id in params
router.delete('/:id', [authorisation], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "Post Not Found!!" })
    }
    if (post.user.toString() !== req.user) {//If owner of the post is not the user with token.
      return res.status(401).json({ msg: "You don't have access to delete the post!!" });
    }
    await post.remove();
    res.json({ msg: "Post successfully removed!!" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: 'Post Not Found!!' });
    }
    console.error(err.message);
    res.status(500).send("Server Error!!");
  }
})

//Route to like a post
router.put('/like/:id', authorisation, async (req, res) => {

  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user;

    const previousLike = post.likes.filter((item) => item.user.toString() === userId);
    if (previousLike.length > 0) {//If user has already liked the post
      return res.status(400).json({ msg: "Post Already Been Liked !!" });
    }
    post.likes.unshift({ user: userId });
    await post.save();
    res.json(post.likes);

  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error !!");
  }

})


//Route to unlike a post
router.put('/unlike/:id', authorisation, async (req, res) => {

  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user;

    const previousLike = post.likes.filter((item) => item.user.toString() === userId);
    if (previousLike.length < 1) {//If user never liked the post and want to unlike it
      return res.status(400).json({ msg: "Post not liked yet!!" });
    }

    const removeIndex = post.likes.map((item) => item.user).indexOf(userId);
    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json(post.likes);

  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error!!");
  }
})


//Route to comment on a post
router.post('/comment/:post_id', [authorisation,
  [
    check("text", "You need to add text to the comment!").not().isEmpty()
  ]
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.post_id);
    const user = await User.findById(req.user);
    if (!post) {
      return res.status(400).json({ msg: "Post Not Found !!" });
    }
    const newComment = {
      text: req.body.text,
      user: req.user,
      avatar: user.avatar,
      name: user.name
    };

    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);

  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: "Post Not Found !!" });
    }
    console.error(err.message);
    return res.status(500).send("Server Error !!");
  }
})

//Route to delete your comment
router.delete('/unComment/:post_id/:comment_id', authorisation, async (req, res) => {
  //We are also taking comment_id in params because a user can post more than one comment
  //So we should know which comment to delete
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).json({ msg: "Post Not Found !!" });
    }

    const comment = post.comments.find(item=>item.id===req.params.comment_id);
    
    //Check if comment exists
    if(!comment) {
      return res.status(400).json({ msg: "Comment Not Found !!" });
    }
    //If the owner of comment is same as the user with token
    if(comment.user.toString()!==req.user) {
      return res.status(401).json({msg: "You do not have access to delete the comment"});
    }

    const removeIndex = post.comments.map(item=>item._id.toString()).indexOf(req.params.comment_id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);

  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: "Post Not Found !!" });
    }
    console.error(err.message);
    return res.status(500).send("Server Error !!");
  }
})
module.exports = router;