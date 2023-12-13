import React from 'react';
import axios from 'axios';

const UpdateBook = () => {
  const updateBook = async (id, title, author, genre) => {
    try {
      await axios.put(`http://127.0.0.1:3000/books/${id}`, { title, author, genre });
      // Add logic to handle success or error messages
      console.log('Book updated successfully');
    } catch (error) {
      console.error('Error updating book: ', error);
    }
  };

  // Implement the form for updating books similar to AddBook component
  // Use the updateBook function when the form is submitted

  return (
    <div>
      <h2>Update Book</h2>
      {/* Form for updating a book */}
    </div>
  );
};

export default UpdateBook;
