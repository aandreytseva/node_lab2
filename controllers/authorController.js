const authors = require('../models/authorModel');
const books = require('../models/bookModel');

exports.getAllAuthors = (req, res) => {
    res.json(authors);
};

exports.getAuthorById = (req, res) => {
    const author = authors.find(a => a.id === Number(req.params.id));

    if (!author) {
        return res.status(404).json({ error: 'Author not found' });
    }

    res.json(author);
};

exports.getBooksByAuthor = (req, res) => {
    const author = authors.find(a => a.id === Number(req.params.id));

    if (!author) {
        return res.status(404).json({ error: 'Author not found' });
    }

    const authorBooks = books.filter(b => b.authorId === author.id);
    res.json(authorBooks);
};
