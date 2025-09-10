import { GoogleBooksAPI } from './api.js';
import { BookDisplay } from './book-display.js';
import { Modal } from './modal.js';

export class Bookshop {
  constructor(cart) {
    this.cart = cart;
    this.api = new GoogleBooksAPI();
    this.modal = new Modal();
    this.bookDisplay = new BookDisplay(
      document.getElementById('books-grid'),
      cart,
      this.modal
    );
    
    this.categories = document.getElementById('categories-list');
    this.loadMoreBtn = document.getElementById('load-more-btn');
    
    this.currentCategory = 'programming';
    this.currentStartIndex = 0;
    this.hasMoreBooks = false;
    this.isLoading = false;
  }

  init() {
    this.setupEventListeners();
    this.loadBooks(this.currentCategory);
  }

  setupEventListeners() {
    // Обработчики для категорий
    if (this.categories) {
      this.categories.addEventListener('click', (e) => {
        const button = e.target.closest('.categories__button');
        if (button) {
          const category = button.dataset.category;
          this.switchCategory(category);
        }
      });
    }

    // Обработчик для кнопки "Загрузить еще"
    if (this.loadMoreBtn) {
      this.loadMoreBtn.addEventListener('click', () => {
        this.loadMoreBooks();
      });
    }

    // Обработчик для добавления в корзину из модального окна
    document.addEventListener('addToCart', (e) => {
      this.cart.addItem(e.detail.book);
    });
  }

  async switchCategory(category) {
    if (category === this.currentCategory || this.isLoading) {
      return;
    }

    // Обновляем активную категорию
    this.updateActiveCategory(category);
    
    // Сбрасываем состояние
    this.currentCategory = category;
    this.currentStartIndex = 0;
    this.hasMoreBooks = false;
    
    // Загружаем книги новой категории
    await this.loadBooks(category);
  }

  updateActiveCategory(category) {
    // Убираем активный класс со всех кнопок
    const buttons = this.categories.querySelectorAll('.categories__button');
    buttons.forEach(btn => {
      btn.classList.remove('categories__button--active');
    });

    // Добавляем активный класс к выбранной кнопке
    const activeButton = this.categories.querySelector(`[data-category="${category}"]`);
    if (activeButton) {
      activeButton.classList.add('categories__button--active');
    }
  }

  async loadBooks(category, append = false) {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.bookDisplay.showLoading();

    try {
      const result = await this.api.getBooksByCategory(category, this.currentStartIndex);
      
      if (append) {
        this.bookDisplay.appendBooks(result.books);
      } else {
        this.bookDisplay.renderBooks(result.books);
      }

      this.hasMoreBooks = result.hasMore;
      this.bookDisplay.showLoadMoreButton(this.hasMoreBooks);

      if (result.books.length > 0) {
        this.currentStartIndex += result.books.length;
      }

    } catch (error) {
      console.error('Ошибка при загрузке книг:', error);
      this.showError('Произошла ошибка при загрузке книг. Попробуйте еще раз.');
    } finally {
      this.isLoading = false;
      this.bookDisplay.hideLoading();
    }
  }

  async loadMoreBooks() {
    if (!this.hasMoreBooks || this.isLoading) {
      return;
    }

    await this.loadBooks(this.currentCategory, true);
  }

  showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.cssText = `
      grid-column: 1 / -1;
      text-align: center;
      padding: 40px 20px;
      background-color: #FEF2F2;
      border: 1px solid #FECACA;
      border-radius: 8px;
      color: #DC2626;
    `;
    errorElement.innerHTML = `
      <h3 style="margin-bottom: 8px;">Ошибка</h3>
      <p>${message}</p>
    `;
    
    this.bookDisplay.container.innerHTML = '';
    this.bookDisplay.container.appendChild(errorElement);
  }

  // Публичные методы для внешнего использования
  getCurrentCategory() {
    return this.currentCategory;
  }

  getCurrentStartIndex() {
    return this.currentStartIndex;
  }

  getHasMoreBooks() {
    return this.hasMoreBooks;
  }

  getIsLoading() {
    return this.isLoading;
  }
}
