const express = require('express');
const morgan = require('morgan');
const blogPostsRouter = require('./blogPostsRouter');
const app = express();

app.use(morgan('common'));

// you need to import `blogPostsRouter` router and route
// requests to HTTP requests to `/blog-posts` to `blogPostsRouter`
/* This means that everything starts with blog-posts, the blogPostsRouter
 comes after that. */
app.use('/blog-posts', blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});