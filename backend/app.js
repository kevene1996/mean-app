const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const app = express();
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://Kevin:sk3Hcs4winHmINo9@cluster0-u0pxi.mongodb.net/node-angular?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connection to database success');
  }).catch((err) => {
    console.log(err, 'Connection failed');
  })

app.use(bodyParser.json());

app.use((req, res, next) => {

  res.setHeader(
    'Access-Control-Allow-Origin', '*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );

  next();
})

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((result) => {
    console.log(result, 'resultsss');
    res.status(201).json({
      message: "post added success",
      postId: result._id
    })
  });
})


app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        message: "Post success",
        posts: documents
      })
    });
})

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
  })
  res.status(200).json({
    message: 'post deleted'
  });
})

module.exports = app; // exports all variables and functions in 'app'
