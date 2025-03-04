// массив для хранения книг
const myLibrary = []; 

// конструктор для книги
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// ф-я для добавления книги в массив
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  renderBooks();
}

// ф-я для поиска карточки по идентификатору
function updateCard(index) {
  const card = document.querySelector(`#book-${index}`);
  if (!card) return;

  // изменение статуса - прочитано или нет
  const book = myLibrary[index];
  card.querySelector("p strong").textContent = book.read ? "Прочитано" : "Не прочитано";
  card.querySelector("button:first-of-type").textContent = book.read
    ? "Отметить как не прочитано"
    : "Отметить как прочитано";
}

// ф-я для обновления карточек книг
function renderBooks() {
  const cardsContainer = document.getElementById("bookCards");
  cardsContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const card = createCard(book, index);
    cardsContainer.appendChild(card);
  });
}

// создаем новую карточку и добавляем ей класс
function createCard(book, index) {
  const card = document.createElement("div");
  card.id = `book-${index}`;
  card.classList.add("card");

  card.innerHTML = `
    <h3>${book.title}</h3>
    <p><strong>Автор:</strong> ${book.author}</p>
    <p><strong>Страницы:</strong> ${book.pages}</p>
    <p><strong>Статус:</strong> ${book.read ? "Прочитано" : "Не прочитано"}</p>
    <button onclick="toggleReadStatus(${index})">
      ${book.read ? "Отметить как не прочитано" : "Отметить как прочитано"}
    </button>
    <button onclick="removeBook(${index})">Удалить</button>
  `;
  return card;
}

// ф-я для удаления книги
function removeBook(index) {
  myLibrary.splice(index, 1);
  renderBooks();
}

// ф-я для изменения статуса - прочитано или нет
function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  renderBooks();
}

// модальное окно и анимация
const modal = document.getElementById("bookModal");
const modalCard = document.querySelector(".modal-card");
const openModalBtn = document.getElementById("newBookBtn");
const closeModalBtn = document.getElementById("closeModal");
const bookForm = document.getElementById("bookForm");

openModalBtn.addEventListener("click", () => {
  modal.showModal();
  // запуск анимации появления
  requestAnimationFrame(() => {
    modalCard.classList.add("show");
  });
});

closeModalBtn.addEventListener("click", closeModalWithAnimation);

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);
  bookForm.reset();
  closeModalWithAnimation();
});

// ф-я для закрытия модального окна с анимацией
function closeModalWithAnimation() {
  // запуск анимации исчезновения
  modalCard.classList.remove("show");
  modalCard.addEventListener("transitionend", 
  function handler() {
    modal.close();
    modalCard.removeEventListener("transitionend", handler);
  });
}

addBookToLibrary("Герой нашего времени", "М. Ю. Лермонтов", 224, true);
addBookToLibrary("Война и мир", "Л. Н. Толстой", 1225, false);

