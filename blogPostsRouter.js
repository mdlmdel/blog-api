const express = require('express');
const router = express.Router();

const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

// Function for example post
function examplePost() {
  return 'This is a test blog post we are adding. ' +
    'What do you want to see on this new blog? News, sports, business, '
    'something else? Leave us a comment below to let us know what ' +
    'you want to see. '
}

// Add some example posts to BlogPosts
// so there's some data to look at
BlogPosts.create(
  'This is the first blog post', examplePost());
BlogPosts.create(
  'This is the second blog post', examplePost());

// when the root of this router is called with GET, return
// all current BlogPosts items
router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  // ensure `title` and `content` and `author` are in request body
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const optionalFields = ['publishDate'];

  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item);
});

// when PUT request comes in with updated blog posts, ensure has
// required fields. also ensure that item id in url path, and
// item id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `ShoppingList.update` with updated item.
router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog posts item \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    name: req.body.name,
    content: req.body.content, 
    author: req.body.author
  });
  res.status(204).json(updatedItem);
});

router.post('/', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create('title', 'content', 'author', 'publishDate');
  res.status(201).json(item);
});

// when DELETE request comes in with an id in path,
// try to delete that item from BlogPosts.
router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog posts item \`${req.params.ID}\``);
  res.status(204).end();
});

module.exports = router;