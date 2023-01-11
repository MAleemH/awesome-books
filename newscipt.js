const bookList = document.querySelector('.book-list');
const form = document.querySelector('#form');
const title = document.querySelector('#input_title');
const author = document.querySelector('#input_author');
let books = [];
const addBook = (book) => {
  bookList.innerHTML += `
    <tr id='${book.id}'>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td><button id='delete' type='button' onclick = 'removeBook(${book.id})'>Remove</button></td>
    </tr>
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
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    addBook(book);
    form.reset();
  }
});
// remove book
function removeBook(bookId) {
  const deleteBook = JSON.parse(localStorage.getItem('books'));
  const newArray = deleteBook.filter((book) => book.id !== bookId);
  localStorage.setItem('books', JSON.stringify(newArray));
  const booksId = document.getElementById(bookId);
  booksId.remove();
}
const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
if (localStorage.getItem('books')) {
  storedBooks.map((book) => addBook(book));
}
removeBook();