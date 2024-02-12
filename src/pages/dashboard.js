import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../css/home.css';

export function home() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    book_title: '',
    author: '',
    category: '',
    published_year: 0,
    price: 0,
    copies_in_stock: 0
  });
  const [updatedBook, setUpdatedBook] = useState({
    id: 0,
    book_title: '',
    author: '',
    category: '',
    published_year: 0,
    price: 0,
    copies_in_stock: 0
  });
  const [bookIdToDelete, setBookIdToDelete] = useState(0);
  const [bookIdToGet, setBookIdToGet] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async () => {
    try {
      await axios.post('http://localhost:8080/books', newBook);
      setNewBook({
        book_title: '',
        author: '',
        category: '',
        published_year: 2020,
        price: 0.0,
        copies_in_stock: 0
      });
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const getBookById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/books/${bookIdToGet}`);
      setSelectedBook(response.data);
    } catch (error) {
      console.error('Error fetching book by ID:', error);
    }
  };

  const updateBook = async () => {
    try {
      await axios.put('http://localhost:8080/books', updatedBook);
      setUpdatedBook({
        id: 0,
        book_title: '',
        author: '',
        category: '',
        published_year: 0,
        price: 0,
        copies_in_stock: 0
      });
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const deleteBook = async () => {
    try {
      await axios.delete(`http://localhost:8080/books/${bookIdToDelete}`);
      setBookIdToDelete(0);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container">

      <div className="add-update-delete">
        <div className="add-book">
          <h2>Add Book</h2>
          <label>Title:</label>
          <input
            type="text"
            value={newBook.book_title}
            onChange={e => setNewBook({ ...newBook, book_title: e.target.value })}
            placeholder="Title"
          />
          <label>Author:</label>
          <input
            type="text"
            value={newBook.author}
            onChange={e => setNewBook({ ...newBook, author: e.target.value })}
            placeholder="Author"
          />
          <label>Category:</label>
           <input
            type="text"
            value={newBook.category}
            onChange={e => setNewBook({ ...newBook, category: e.target.value })}
            placeholder="Category"
          />
          <label>Number of Copies:</label>
          <input
            type="number"
            value={newBook.copies_in_stock}
            onChange={e => setNewBook({ ...newBook, copies_in_stock: parseInt(e.target.value) })}
            placeholder="Number of Copies"
          />
          <label>LKR:</label>
          <input
            type="number"
            value={newBook.price}
            onChange={e => setNewBook({ ...newBook, price: parseInt(e.target.value) })}
            placeholder="LKR"
          />
          <label>Year:</label>
          <input
            type="number"
            value={newBook.published_year}
            onChange={e => setNewBook({ ...newBook, published_year: parseInt(e.target.value) })}
            placeholder="Year"
          />
          <button onClick={addBook}>Add Book</button>
        </div>
        <div className="get-book">
          <h2>Get Book By ID</h2>
          <label>ID:</label>
          <input
            type="number"
            value={bookIdToGet}
            onChange={e => setBookIdToGet(parseInt(e.target.value))}
            placeholder="Book ID"
          />
          <button onClick={getBookById}>Get Book</button>
          {selectedBook && (
            <div>
              <h3>{selectedBook.book_title}</h3>
              <p>Author: {selectedBook.author}</p>
              <p>Category: {selectedBook.category}</p>
              <p>Published Year: {selectedBook.published_year}</p>
              <p>Price: {selectedBook.price}</p>
              <p>Copies in Stock: {selectedBook.copies_in_stock}</p>
            </div>
          )}
        </div>

        <div className="update-book">
          <h2>Update Book</h2>
          <label>ID:</label>
          <input
            type="number"
            value={updatedBook.id}
            onChange={e => setUpdatedBook({ ...updatedBook, id: parseInt(e.target.value) })}
            placeholder="ID"
          />
          <label>Title:</label>
          <input
            type="text"
            value={updatedBook.book_title}
            onChange={e => setUpdatedBook({ ...updatedBook, book_title: e.target.value })}
            placeholder="Title"
          />
          <label>Author:</label>
          <input
            type="text"
            value={updatedBook.author}
            onChange={e => setUpdatedBook({ ...updatedBook, author: e.target.value })}
            placeholder="Author"
          />
          <button onClick={updateBook}>Update Book</button>
        </div>

        <div className="delete-book">
          <h2>Delete Book</h2>
          <label>ID:</label>
          <input
            type="number"
            value={bookIdToDelete}
            onChange={e => setBookIdToDelete(parseInt(e.target.value))}
            placeholder="ID"
          />
          <button onClick={deleteBook}>Delete Book</button>
        </div>
      </div>
      <h1>Books</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Published Year</th>
            <th>Price</th>
            <th>Copies in Stock</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.book_title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.published_year}</td>
              <td>{book.price}</td>
              <td>{book.copies_in_stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

