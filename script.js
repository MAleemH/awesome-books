import Books from './modules/book.js';

const form = document.querySelector('#form');
const bookList = document.querySelector('.book-list');
const titleInput = document.querySelector('#input_title');
const authorInput = document.querySelector('#input_author');
const addBtn = document.querySelector('#add_btn');

class Library {
  constructor() {
    this.Library = JSON.parse(localStorage.getItem('collections')) || [];
  }

  addBook() {
    const newBook = new Books();
    newBook.title = titleInput.value;
    newBook.author = authorInput.value;
    this.Library.push(newBook);
    localStorage.setItem('collections', JSON.stringify(this.Library));
    this.showBook();
  }

  showBook() {
    bookList.innerHTML = '';
    this.Library.forEach((collection, i) => {
      bookList.innerHTML += `<div id="${i}" class="books">
            <p class="book-info">
                <span class="title">"${collection.title}" by ${collection.author}</span>
            </p>
            <button class="remove-btn">Remove</button>
    </div>`;
    });
  }

  removeBook(book) {
    book.parentElement.remove();
    this.Library = this.Library.filter((collection, i) => i !== Number(book.parentElement.id));
    localStorage.setItem('collections', JSON.stringify(this.Library));
  }
}

window.onload = () => {
  const newLibrary = new Library();
  newLibrary.showBook();
  //   newLibrary.showBook();

  form.addEventListener('submit', (e) => {
    // const newLibrary = new Library();
    if (titleInput.value !== '' && authorInput.value !== '') {
      e.preventDefault();
      addBtn.disabled = false;
      newLibrary.addBook();
      titleInput.value = '';
      authorInput.value = '';
      newLibrary.showBook();
    } else {
      addBtn.disabled = true;
    }
    window.location.reload();
  });

  bookList.addEventListener('click', (e) => {
    if (e.target.className.includes('remove-btn')) {
      const data = e.target;
      newLibrary.removeBook(data);
    }
    window.location.reload();
  });
};