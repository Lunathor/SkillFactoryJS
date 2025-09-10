export class BookDisplay {
  constructor(container, cart, modal) {
    this.container = container;
    this.cart = cart;
    this.modal = modal;
    this.loadingElement = document.getElementById('books-loading');
    this.loadMoreBtn = document.getElementById('load-more-btn');
  }

  showLoading() {
    if (this.loadingElement) {
      this.loadingElement.classList.remove('books__loading--hidden');
    }
  }

  hideLoading() {
    if (this.loadingElement) {
      this.loadingElement.classList.add('books__loading--hidden');
    }
  }

  showLoadMoreButton(show) {
    if (this.loadMoreBtn) {
      if (show) {
        this.loadMoreBtn.classList.remove('btn--hidden');
      } else {
        this.loadMoreBtn.classList.add('btn--hidden');
      }
    }
  }

  renderBooks(books) {
    this.container.innerHTML = '';
    
    if (books.length === 0) {
      this.renderEmptyState();
      return;
    }

    books.forEach(book => {
      const bookElement = this.createBookCard(book);
      this.container.appendChild(bookElement);
    });
  }

  appendBooks(books) {
    books.forEach(book => {
      const bookElement = this.createBookCard(book);
      this.container.appendChild(bookElement);
    });
  }

  createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.dataset.bookId = book.id;

    const imageUrl = this.getBookImageUrl(book);
    const price = this.getBookPrice(book);
    const rating = this.renderRating(book.averageRating, book.ratingsCount);

    card.innerHTML = `
      <img src="${imageUrl}" alt="${book.title}" class="book-card__image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBWMTQwSDgwVjYwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K'">
      <div class="book-card__content">
        <h3 class="book-card__title">${book.title}</h3>
        <p class="book-card__author">${book.authors.join(', ')}</p>
        ${rating}
        <p class="book-card__description">${book.description}</p>
        ${price ? `<div class="book-card__price">${price}</div>` : ''}
        <div class="book-card__actions">
          <button class="btn btn--primary book-card__button" data-action="add-to-cart">
            В корзину
          </button>
        </div>
      </div>
    `;

    // Добавляем обработчик клика на карточку
    card.addEventListener('click', (e) => {
      // Не открываем модальное окно при клике на кнопки
      if (e.target.closest('[data-action]')) {
        return;
      }
      this.modal.open(book);
    });

    // Добавляем обработчик клика на кнопку "В корзину"
    const addToCartBtn = card.querySelector('[data-action="add-to-cart"]');
    addToCartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.cart.toggleItem(book);
    });

    return card;
  }

  getBookImageUrl(book) {
    if (book.imageLinks?.thumbnail) {
      return book.imageLinks.thumbnail.replace('http:', 'https:');
    }
    if (book.imageLinks?.smallThumbnail) {
      return book.imageLinks.smallThumbnail.replace('http:', 'https:');
    }
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBWMTQwSDgwVjYwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
  }

  getBookPrice(book) {
    const listPrice = book.saleInfo?.listPrice;
    if (listPrice) {
      return `${listPrice.amount} ${listPrice.currencyCode}`;
    }
    return null;
  }

  renderRating(averageRating, ratingsCount) {
    if (!averageRating) {
      return '';
    }

    const stars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.5;
    
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        starsHtml += '<svg class="book-card__star" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      } else if (i === stars && hasHalfStar) {
        starsHtml += '<svg class="book-card__star" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      } else {
        starsHtml += '<svg class="book-card__star book-card__star--empty" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      }
    }

    return `
      <div class="book-card__rating">
        <div class="book-card__stars">${starsHtml}</div>
        <span class="book-card__rating-text">(${ratingsCount})</span>
      </div>
    `;
  }

  renderEmptyState() {
    this.container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #6B7280;">
        <h3 style="margin-bottom: 16px; font-size: 18px;">Книги не найдены</h3>
        <p>Попробуйте выбрать другую категорию или изменить поисковый запрос</p>
      </div>
    `;
  }
}
