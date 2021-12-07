class Book {
  constructor(title, author, isbn) {

    this.title = title;
    this.author = author;
    this.isbn = isbn;

  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');

    // tr create

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);

    console.log(book);
  }

  showAlert(message, className) {
    // div

    const div = document.createElement('div');
    div.className = `alert ${className}`;

    // add text
    div.appendChild(document.createTextNode(message));

    // insert into dom

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    // timeout after 3s

    setTimeout(function() {

      document.querySelector('.alert').remove();

    }, 3000);
  }

  deleteBook(target) {
    if(target.className === 'delete') {

      target.parentElement.parentElement.remove();
  
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}





// event listener

document.getElementById('book-form').addEventListener('submit', function(e) {

  // get form values

  const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);

  // instatiate ui

  const ui = new UI();

  if (title === '' || author === '' || isbn === '') {

    // error alert
    ui.showAlert('Please fill in all fields','error');
  
  } else {
    ui.addBookToList(book);

    ui.showAlert('Success!', 'success');

    // clear fields after submit
    ui.clearFields();
  }



  e.preventDefault();
})

// event listen for delete

document.getElementById('book-list').addEventListener('click', function(e) {

  const ui = new UI();

  // delete
  ui.deleteBook(e.target);

  // show msg

  ui.showAlert('Book removed', 'success');


  e.preventDefault();
})