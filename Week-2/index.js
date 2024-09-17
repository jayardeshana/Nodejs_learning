const express = require('express');
const app = express();
const port = 3000;
const Joi = require('joi');

app.use(express.json());

// Joi schema for validation
const bookSchema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    genre: Joi.string().min(3).required(),
});


let books = [];


// Add book
app.post('/add-book', (req, res) => {

    const { error } = bookSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
    };
    books.push(book);
    res.status(201).json(book);
});


//Delete book
app.delete('/delete-book/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));

    if (bookIndex === -1) return res.status(404).send('Book not found');
    books.splice(bookIndex, 1);
    res.status(200).json("deleted successfully")
})


//Get a book by ID
app.get('/get-book/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});


// Get all books
app.get('/get-all-books', (req, res) => {
    res.json(books);
});


// UPDATE - Update a book by ID
app.put('/update-book/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    res.json(book);
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


