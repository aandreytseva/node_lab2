const books = require('../models/bookModel');
const authors = require('../models/authorModel');

exports.getAllBooks = (req, res) => {
    let result = books;

    if (req.query.genre) {
        result = result.filter(b => b.genre.toLowerCase() === req.query.genre.toLowerCase());
    }

    if (req.query.year) {
        result = result.filter(b => b.year === Number(req.query.year));
    }

    res.json(result);
};

exports.searchBooks = (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({ error: 'Query parameter "title" is required' });
    }

    const found = books.filter(b =>
        b.title.toLowerCase().includes(title.toLowerCase())
    );

    res.json(found);
};

exports.getBookById = (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
};

exports.createBook = (req, res) => {
    const { title, authorId, genre, year } = req.body;

    if (!title || authorId === undefined || !genre || year === undefined) {
        return res.status(400).json({ error: 'Fields title, authorId, genre and year are required' });
    }

    const authorExists = authors.find(a => a.id === Number(authorId));
    if (!authorExists) {
        return res.status(400).json({ error: `Author with id ${authorId} not found` });
    }

    const newBook = {
        id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title,
        authorId: Number(authorId),
        genre,
        year: Number(year)
    };

    books.push(newBook);
    res.status(201).json(newBook);
};

exports.updateBook = (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const { title, authorId, genre, year } = req.body;

    if (authorId !== undefined) {
        const authorExists = authors.find(a => a.id === Number(authorId));
        if (!authorExists) {
            return res.status(400).json({ error: `Author with id ${authorId} not found` });
        }
        book.authorId = Number(authorId);
    }

    if (title !== undefined) book.title = title;
    if (genre !== undefined) book.genre = genre;
    if (year !== undefined)  book.year = Number(year);

    res.json(book);
};

exports.deleteBook = (req, res) => {
    const index = books.findIndex(b => b.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const deleted = books.splice(index, 1);
    res.json(deleted[0]);
};

exports.getStatistics = (req, res) => {
    const genres = [...new Set(books.map(b => b.genre))];
    const newest = books.reduce((a, b) => (a.year > b.year ? a : b));
    const oldest = books.reduce((a, b) => (a.year < b.year ? a : b));

    res.json({
        totalBooks: books.length,
        totalAuthors: authors.length,
        totalGenres: genres.length,
        genres,
        newestBook: newest,
        oldestBook: oldest
    });
};
