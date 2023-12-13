const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const booksRouter = require('../server/routers/book');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Library')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Connection to MongoDB failed:', error.message);
  });

app.use('/books', booksRouter);

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Get all books
app.get('/search', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  find books
app.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new book
app.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a book
app.patch('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (req.body.title) {
      book.title = req.body.title;
    }
    if (req.body.author) {
      book.author = req.body.author;
    }
    if (req.body.description) {
      book.description = req.body.description;
    }
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book
app.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndRemove(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = app;


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
