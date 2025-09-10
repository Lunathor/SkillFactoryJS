export class Modal {
  constructor() {
    this.modal = document.getElementById('book-modal');
    this.overlay = document.getElementById('modal-overlay');
    this.closeBtn = document.getElementById('modal-close');
    this.content = document.getElementById('book-detail');
    
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Закрытие по клику на overlay
    if (this.overlay) {
      this.overlay.addEventListener('click', () => {
        this.close();
      });
    }

    // Закрытие по клику на кнопку закрытия
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => {
        this.close();
      });
    }

    // Закрытие по клавише Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  open(book) {
    if (!this.modal) return;

    this.renderBookDetail(book);
    this.modal.classList.add('modal--active');
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
  }

  close() {
    if (!this.modal) return;

    this.modal.classList.remove('modal--active');
    document.body.style.overflow = ''; // Восстанавливаем прокрутку
  }

  isOpen() {
    return this.modal && this.modal.classList.contains('modal--active');
  }

  renderBookDetail(book) {
    if (!this.content) return;

    const imageUrl = this.getBookImageUrl(book);
    const price = this.getBookPrice(book);
    const rating = this.renderRating(book.averageRating, book.ratingsCount);

    this.content.innerHTML = `
      <img src="${imageUrl}" alt="${book.title}" class="book-detail__image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjAgMTUwSDE4MFYyNTBIMTIwVjE1MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg=='">
      <div class="book-detail__info">
        <div class="book-detail__author">${book.authors.join(', ')}</div>
        <h1 class="book-detail__title">${book.title}</h1>
        ${rating}
        <p class="book-detail__description">${book.description || 'Описание недоступно'}</p>
        ${price ? `<div class="book-detail__price">${price}</div>` : ''}
        <div class="book-detail__actions">
          <button class="btn btn--primary book-detail__button" data-action="add-to-cart">
            В корзину
          </button>
          <button class="btn btn--secondary book-detail__button" data-action="close-modal">
            Закрыть
          </button>
        </div>
        <div class="book-detail__meta">
          ${book.publishedDate ? `
            <div class="book-detail__meta-item">
              <div class="book-detail__meta-label">Дата издания</div>
              <div class="book-detail__meta-value">${new Date(book.publishedDate).getFullYear()}</div>
            </div>
          ` : ''}
          ${book.pageCount ? `
            <div class="book-detail__meta-item">
              <div class="book-detail__meta-label">Страниц</div>
              <div class="book-detail__meta-value">${book.pageCount}</div>
            </div>
          ` : ''}
          ${book.language ? `
            <div class="book-detail__meta-item">
              <div class="book-detail__meta-label">Язык</div>
              <div class="book-detail__meta-value">${book.language.toUpperCase()}</div>
            </div>
          ` : ''}
          ${book.categories && book.categories.length > 0 ? `
            <div class="book-detail__meta-item">
              <div class="book-detail__meta-label">Категории</div>
              <div class="book-detail__meta-value">${book.categories.join(', ')}</div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Добавляем обработчики событий
    this.setupDetailEventListeners(book);
  }

  setupDetailEventListeners(book) {
    // Обработчик для кнопки "В корзину"
    const addToCartBtn = this.content.querySelector('[data-action="add-to-cart"]');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Событие будет обработано в основном модуле
        this.dispatchAddToCartEvent(book);
      });
    }

    // Обработчик для кнопки "Закрыть"
    const closeBtn = this.content.querySelector('[data-action="close-modal"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.close();
      });
    }
  }

  dispatchAddToCartEvent(book) {
    const event = new CustomEvent('addToCart', {
      detail: { book },
      bubbles: true
    });
    document.dispatchEvent(event);
  }

  getBookImageUrl(book) {
    if (book.imageLinks?.large) {
      return book.imageLinks.large.replace('http:', 'https:');
    }
    if (book.imageLinks?.thumbnail) {
      return book.imageLinks.thumbnail.replace('http:', 'https:');
    }
    if (book.imageLinks?.smallThumbnail) {
      return book.imageLinks.smallThumbnail.replace('http:', 'https:');
    }
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjAgMTUwSDE4MFYyNTBIMTIwVjE1MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg==';
  }

  getBookPrice(book) {
    const listPrice = book.saleInfo?.listPrice;
    const retailPrice = book.saleInfo?.retailPrice;
    
    if (retailPrice) {
      return `${retailPrice.amount} ${retailPrice.currencyCode}`;
    }
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
        starsHtml += '<svg class="book-detail__star" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      } else if (i === stars && hasHalfStar) {
        starsHtml += '<svg class="book-detail__star" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      } else {
        starsHtml += '<svg class="book-detail__star book-detail__star--empty" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      }
    }

    const formattedCount = this.formatRatingCount(ratingsCount);

    return `
      <div class="book-detail__rating">
        <div class="book-detail__stars">${starsHtml}</div>
        <span class="book-detail__rating-text">${formattedCount}</span>
      </div>
    `;
  }

  formatRatingCount(count) {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M отзывов`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K отзывов`;
    } else {
      return `${count} отзывов`;
    }
  }
}
