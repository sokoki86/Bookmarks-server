const express = require ('express');
const { v4: uuid } = require('uuid');
const logger = require('./logger');
const bodyParser = express.json()
const bookmarkRouter = express.Router();


bookmarkRouter
.route('/bookmarks')
.get((req, res) => {
    res
    .json(store.bookmarks);
  })
.post(bodyParser,(req, res) => {
     const { title, url, rating, bookmarkId } = req.body;
  
     if (!title) {
       logger.error(`Title is requires`);
       return res
       .status(400)
       .send('Title is required');
     }
     if (!url) {
       logger.error(`URL is required`);
       return res
       .status
       .send('URL is required');
     }
     if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
       logger.error(`Rating is required`);
       return res
       .status(400)
       .send('Rating is required'); 
     }
     const id = uuid();
  
     const bookmark = {
       id,
       title,
       url,
       rating
     };
     bookmarks.push(bookmark);
  
     logger.info(`Bookmark with id ${id} created`);
  
     res.status(201)
     .location(`http://localhost:8000/bookmarks/${id}`)
     .json({id});
  });
  bookmarkRouter
  .route('./bookmarks/:id')
 .get((req, res) => {
     const { id } = req.params;
     const bookmark = bookmarks.find(li => li.id == id);
  
     if(!bookmark) {
       logger.errror(`Bookmark with id ${id} not found.`);
       return res
       .status(404)
       .send('Bookmark was not found')
     }
     res.json(bookmark);
  })
.delete(bodyParser, (req, res) => {
    const { id } = req.params;
  
    const bookmarkIndex = bookmarks.findIndex(li => li.id == id);
  
    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found`);
      return res
      .status(400)
      .send('Not Found');
    }
  
    bookmarks.splice(bookmarkIndex, 1);
  
    logger.info(`Bookmark with id ${id} deleted`);
    return res
    .status(204)
    .send('Not Found')
  });

module.exports = bookmarkRouter