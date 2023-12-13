async function displayBooks() {
    try {
        const books = await Book.find();
        const bookListDiv = document.getElementById('bookList');
        bookListDiv.innerHTML = '';

        books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book-card');

        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Description: ${book.description}</p>
            <p>Year: ${book.year}</p>
        `;

        bookListDiv.appendChild(bookElement);
        });
    } catch (error) {
        console.error('Error fetching books:', error);
    }
    }
    async function addBook(title, author, description, year) {
    try {
        const newBook = new Book({
        title,
        author,
        description,
        year
        });

        await newBook.save();

        displayBooks();
    } catch (error) {
        console.error('Error adding book:', error);
    }
    }


    // Add event listener for form submission
    document.getElementById('addBookForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const year = document.getElementById('year').value;
      const Description = document.getElementById('Description').value;
      addBook(title, author, year, );

      // Clear form fields after adding book
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.year = document.getElementById('year').value = '';
      document.Description = document.getElementById.value = '';
    });
    displayBooks();
