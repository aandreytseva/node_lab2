const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.get('/',          authorController.getAllAuthors);
router.get('/:id',       authorController.getAuthorById);
router.get('/:id/books', authorController.getBooksByAuthor);

module.exports = router;
