const bookList = document.querySelector('#booksList');
const form = document.querySelector('#form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

let allBooks = [];

const addBook = (book) => {
  bookList.innerHTML += `
    <tr id='${book.id}'>
      <td>${book.title}</td> <br>
      <td>${book.author}</td> <br>
      <td><button id='delete' type='button' onclick = 'removeBook(${book.id})'>Remove</button></td>
    </tr>
    <hr>
`;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (title.value && author.value !== '') {
    const book = {
      id: Math.random(),
      title: title.value,
      author: author.value,
    };

    if (localStorage.getItem('allBooks') === null) {
      allBooks = [];
    } else {
      allBooks = JSON.parse(localStorage.getItem('allBooks'));
    }
    allBooks.push(book);
    localStorage.setItem('allBooks', JSON.stringify(allBooks));
    addBook(book);
    form.reset();
  }
});

// remove book

function removeBook(bookId) {
  const deleteBook = JSON.parse(localStorage.getItem('allBooks'));

  const newArray = deleteBook.filter((book) => book.id !== bookId);
  localStorage.setItem('allBooks', JSON.stringify(newArray));

  const allBooksId = document.getElementById(bookId);
  allBooksId.remove();
}

const storedallBooks = JSON.parse(localStorage.getItem('allBooks')) || [];

if (localStorage.getItem('allBooks')) {
  storedallBooks.map((book) => addBook(book));
}

removeBook();