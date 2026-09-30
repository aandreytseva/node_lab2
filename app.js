const express = require('express');
const logger = require('./middleware/logger');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const bookController = require('./controllers/bookController');

const app = express();

app.use(express.json());

app.use(logger);

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

app.get('/api/statistics', bookController.getStatistics);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
