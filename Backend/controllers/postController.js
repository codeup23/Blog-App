const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

const secret = pandey;

exports.createPost = async (req, res) => {

  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const token = req.cookies.token;

  jwt.verify(token, secret, {}, async (err, info) => {

    if (err) 
        throw err;

    const { title, summary, content } = req.body;

    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });

    res.status(200).json(postDoc);
  });
};

exports.updatePost = async (req, res) => {
  try {
    let newPath = null;

    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const { id, title, summary, content } = req.body;

      const postDoc = await Post.findById(id);
      if (!postDoc) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(403).json({ message: 'You are not the author' });
      }

      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
      postDoc.cover = newPath ? newPath : postDoc.cover;

      await postDoc.save();

      res.json(postDoc);
    });
    
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getPosts = async (req, res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20)
  );
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ 
        message: 'Post not found' 
      });
    }
    // Check if the authenticated user is the author of the post
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ 
        message: 'You are not the author of this post' 
      });
    }
    await Post.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
        message: 'Post deleted successfully' 
      });
  } catch (err) {
    res.status(500).json({ 
      message: 'Server error'
    });
  }
}




// exports.updatePost = async (req, res) => {
//   let newPath = null;

//   if (req.file) {
//     const { originalname, path } = req.file;
//     const parts = originalname.split('.');
//     const ext = parts[parts.length - 1];
//     newPath = path + '.' + ext;
//     fs.renameSync(path, newPath);
//   }

//   const { token } = req.cookies;
//   jwt.verify(token, secret, {}, async (err, info) => {
//     if (err) throw err;
//     const { id, title, summary, content } = req.body;
//     const postDoc = await Post.findById(id);
//     const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    
//     if (!isAuthor) {
//       return res.status(400).json('you are not the author');
//     }
    
//     await postDoc.update({
//       title,
//       summary,
//       content,
//       cover: newPath ? newPath : postDoc.cover,
//     });

//     res.json(postDoc);
//   });
// };
