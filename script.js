const form = document.querySelector('#form');
const bookList = document.querySelector('.book-list');
const titleInput = document.querySelector('#input_title');
const authorInput = document.querySelector('#input_author');
const addBtn = document.querySelector('#add_btn');

let collections = JSON.parse(localStorage.getItem('collections')) || [];

function addBook() {
  collections.push({
    title: titleInput.value,
    author: authorInput.value,
  });
  localStorage.setItem('collections', JSON.stringify(collections));
}

function showBook() {
  bookList.innerHTML = '';
  collections.forEach((collection, index) => {
    bookList.innerHTML += `<div class='book${index + 1}' id="${index}">
            <p class="book-info">
                <span class="title">${collection.title}</span>
                <br/>
                <span class="author">${collection.author}</span>
            </p>
            <button class="remove-btn">Remove</button>
            <hr/>
    </div>`;
  });
}

function removeBook(cur) {
  cur.parentElement.remove();
  collections = collections.filter((collection, index) => index !== Number(cur.parentElement.id));
  localStorage.setItem('collections', JSON.stringify(collections));
}

showBook();

form.addEventListener('submit', (e) => {
  if (titleInput.value !== '' && authorInput.value !== '') {
    addBtn.disabled = false;
    addBook();
    titleInput.value = '';
    authorInput.value = '';
    showBook();

    e.preventDefault();
  } else {
    addBtn.disabled = true;
  }
});

bookList.addEventListener('click', (e) => {
  if (e.target.className.includes('remove-btn')) {
    const targetEl = e.target;
    removeBook(targetEl);
  }
});