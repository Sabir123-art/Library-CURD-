import React from 'react';
import axios from 'axios';

const AddBook = () => {
  const addBook = async (title, author, genre) => {
    try {
      await axios.post('http://127.0.0.1:3000/books', { title, author, genre });
      // Add logic to handle success or error messages
      console.log('Book added successfully');
    } catch (error) {
      console.error('Error adding book: ', error);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const author = event.target.elements.author.value;
    const genre = event.target.elements.genre.value;

    addBook(title, author, genre);

    // Clear form fields after adding book
    event.target.reset();
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" className="form-control" id="title" required />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input type="text" className="form-control" id="author" required />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input type="text" className="form-control" id="genre" required />
        </div>
        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
