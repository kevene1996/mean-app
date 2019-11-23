const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"
    );
  next();
})

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post, 'post from post');
  res.status(201).json({
    message: "post added success"
  })
})

app.get('/api/posts', (req, res, next) => {
  const posts = [{
      id: "fadsdada44",
      title: "First serve post",
      content: "server first content"
    },
    {
      id: "kdkasdadss4",
      title: "Second serve post",
      content: "server second content"
    }
  ];
  res.status(200).json({
    message: "Post success",
    posts: posts
  });
})

module.exports = app; // exports all variables and functions in 'app'
