import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} by {book.author} - {book.genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
