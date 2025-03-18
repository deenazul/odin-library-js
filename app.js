class Book {
    constructor(title, author, pages) {
        this.id = crypto.randomUUID();
        this.bookTitle = title;
        this.bookAuthor = author;
        this.bookPages = pages;
    }
}

class Library {
    constructor() {
        //array to store book obj
         this.myLibrary = [];
    }

    addBooktoLibrary(newBook) {
        this.myLibrary.push(newBook)
    }

    removeBookById(bookId) {
        this.myLibrary = this.myLibrary.filter(book => book.id !== bookId);
    }
}

const library = new Library();

const getBookfromInput = () => {
const bookTitle = document.getElementById("bookTitle").value
const bookAuthor = document.getElementById("bookAuthor").value
const bookPages = document.getElementById("bookPages").value
return new Book(bookTitle, bookAuthor, bookPages)
}

const addBooktoLibrary = (e) => {
    const newBook = getBookfromInput(); //create new book from input 
    library.addBooktoLibrary(newBook);
    displayBookCard(newBook);
}

// ui 
const addBookDialog = document.getElementById("addBookDialog")
const newBookBtn = document.getElementById("newBookBtn")
const addBookForm = document.getElementById("addBookForm")
// const newBookBtn = document.querySelector("addBookDialog + newBookBtn")
const bookTitle = document.getElementById("bookTitle")
const bookAuthor = document.getElementById("bookAuthor")
const bookPages = document.getElementById("bookPages")
const submitBtn = document.getElementById("submitBtn")
const closeBtn = document.getElementById("closeBtn")
const outputBox = document.querySelector("output")
// const removeBtn = document.querySelector('removeBtn')

// open dialog
newBookBtn.addEventListener("click", () => {
    addBookForm.reset();
    addBookDialog.showModal();
})


submitBtn.addEventListener("click", () => {
    // e.preventDefault();
    addBooktoLibrary();
    addBookDialog.close();
})

closeBtn.addEventListener("click", (e) => {
    addBookDialog.close();
})

const displayBookCard = (book) => {
    const card = document.createElement('div')
    card.classList.add('card-book')
    card.setAttribute("data-id", book.id)

    card.innerHTML = `
    <h2>${book.bookTitle}</h2>
    <p>Author: ${book.bookAuthor}</p>
    <p>Number of Pages: ${book.bookPages}</p>
    <div class="btnDiv">
    <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
    </label>
    <button class="removeBtn" data-id="${book.id}"> Remove </button>
    </div>
    `;
    
    outputBox.appendChild(card);
}

outputBox.addEventListener("click", (e) =>{
    if (e.target && e.target.classList.contains('removeBtn')) {
        const bookId = e.target.getAttribute('data-id')
        library.removeBookById(bookId)   
        outputBox.innerHTML = '';
        library.myLibrary.forEach(displayBookCard);
    }
})