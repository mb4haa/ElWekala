const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

router.post("", checkAuth, (req,res,next) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    date: req.body.date,
    content: req.body.content
  });

  post.save().then(createdPost => {
      res.status(201).json({
      message: 'Post added succesfully',
      post: {
        ...createdPost,
        id: createdPost._id
      }
  });
  }).catch( err => {
    res.status(500).json({
      message: 'an Error occured (usually cause the date already exists)'
    });
  });
});

router.get( '', (req,res,next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  //console.log(req.query);
  if(pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage-1))
      .limit(pageSize);
  }
  postQuery
  .then(documents => {
    fetchedPosts = documents;
    return Post.count();
  }).then(count => {
    res.status(200).json({
      message: 'Posts Fetched succesfully!',
      posts: fetchedPosts,
      maxPosts: count
  });
  }).catch(err => {
    res.status(500).json({
      message: 'Fetching Posts Failed'
    });
  });
});

router.delete('/:id', checkAuth, (req,res,next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted"});
  }).catch(error => {
    res.status(500).json({
      message: 'Fetching Posts Failed'
    })
  });
});



module.exports = router;
