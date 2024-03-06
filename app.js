class Book{
  constructor(title, author, isbn){
      this.title = title;
      this.author = author;
      this.isbn = isbn;
  }
}

class UI{
    static displayBooks(){
        let books = Storage.getBooks();
            books.forEach(function(book){
                UI.addBooKToList(book);
            });
        }

    static showAlert(message, className){
      const container = document.querySelector('.container');
      const  form = document.querySelector('form');
      const div = document.createElement('div');
            div.appendChild(document.createTextNode(message));
            div.className = `alert alert-${className}`;
        container.insertBefore(div, form); 
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 2000);
    }

   static addBooKToList(book){
      const row = document.createElement('tr');
           row.innerHTML = `<td>${book.title}</td> 
           <td>${book.author}</td>
           <td>${book.isbn}</td>
           <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td> 
           `;
           bookList.appendChild(row);
        }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }

    static removeBookFromList(e){
        if(e.target.classList.contains('delete')){
           e.target.parentElement.parentElement.remove();
        }
    }
}


class Storage{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBooKToStorage(book){
        let books = Storage.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

   static removeBookFromStorage(e){
        let mainIsbn = e.target.parentElement.previousElementSibling.textContent;
        let books = Storage.getBooks();
            books.forEach(function(book, index){
                if(mainIsbn === book.isbn){
                    books.splice(index, 1);
                }
            })
            localStorage.setItem('books', JSON.stringify(books));
    }
}

const form = document.querySelector('form');
const bookList = document.querySelector('#bookList');
      form.addEventListener('submit', function(e){
          e.preventDefault();

          const title = document.querySelector('#title').value;
          const author = document.querySelector('#author').value;
          const isbn = document.querySelector('#isbn').value;

          if(title === '' || author === '' || isbn === ''){
              UI.showAlert('Please fill the details', 'danger');
          }else{
            const book = new Book(title, author, isbn);
                  UI.addBooKToList(book);
                  Storage.addBooKToStorage(book);
                  UI.clearFields();
                  UI.showAlert('Book Added', 'success');
          }

        });

 bookList.addEventListener('click', function(e){
     e.preventDefault();
     UI.removeBookFromList(e);
     UI.showAlert('Book Removed', 'danger');
     Storage.removeBookFromStorage(e);

 });

 window.addEventListener('DOMContentLoaded', function(e){
     e.preventDefault();
    UI.displayBooks();
})
