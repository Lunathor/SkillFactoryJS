export class Cart {
  constructor() {
    this.items = new Map(); // Map для хранения товаров {bookId: {book, quantity}}
    this.badge = document.getElementById('cart-badge');
    
    this.init();
  }

  init() {
    this.updateBadge();
  }

  addItem(book) {
    const bookId = book.id;
    
    if (this.items.has(bookId)) {
      // Увеличиваем количество
      const item = this.items.get(bookId);
      item.quantity += 1;
    } else {
      // Добавляем новый товар
      this.items.set(bookId, {
        book: book,
        quantity: 1
      });
    }
    
    this.updateBadge();
    this.updateButtonState(bookId, true);
    this.showAddToCartAnimation(bookId);
  }

  removeItem(bookId) {
    if (this.items.has(bookId)) {
      this.items.delete(bookId);
      this.updateBadge();
      this.updateButtonState(bookId, false);
    }
  }

  toggleItem(book) {
    const bookId = book.id;
    
    if (this.items.has(bookId)) {
      this.removeItem(bookId);
    } else {
      this.addItem(book);
    }
  }

  updateButtonState(bookId, inCart) {
    const button = document.querySelector(`[data-book-id="${bookId}"] [data-action="add-to-cart"]`);
    if (button) {
      if (inCart) {
        button.textContent = 'В корзине';
        button.classList.add('btn--in-cart');
      } else {
        button.textContent = 'В корзину';
        button.classList.remove('btn--in-cart');
      }
    }
  }

  isInCart(bookId) {
    return this.items.has(bookId);
  }

  updateQuantity(bookId, quantity) {
    if (quantity <= 0) {
      this.removeItem(bookId);
    } else if (this.items.has(bookId)) {
      this.items.get(bookId).quantity = quantity;
      this.updateBadge();
    }
  }

  getTotalItems() {
    let total = 0;
    this.items.forEach(item => {
      total += item.quantity;
    });
    return total;
  }

  getTotalPrice() {
    let total = 0;
    this.items.forEach(item => {
      const price = item.book.saleInfo?.listPrice?.amount || 0;
      total += price * item.quantity;
    });
    return total;
  }

  getItems() {
    return Array.from(this.items.values());
  }

  clear() {
    this.items.clear();
    this.updateBadge();
  }

  updateBadge() {
    if (this.badge) {
      const totalItems = this.getTotalItems();
      this.badge.textContent = totalItems;
      this.badge.style.display = totalItems > 0 ? 'block' : 'none';
    }
  }

  showAddToCartAnimation(bookId) {
    // Простая анимация добавления в корзину
    if (this.badge) {
      this.badge.style.transform = 'scale(1.2)';
      setTimeout(() => {
        this.badge.style.transform = 'scale(1)';
      }, 200);
    }
  }

  // Методы для работы с localStorage (опционально)
  saveToLocalStorage() {
    const cartData = {
      items: Array.from(this.items.entries())
    };
    localStorage.setItem('bookshop-cart', JSON.stringify(cartData));
  }

  loadFromLocalStorage() {
    const cartData = localStorage.getItem('bookshop-cart');
    if (cartData) {
      try {
        const parsed = JSON.parse(cartData);
        this.items = new Map(parsed.items);
        this.updateBadge();
      } catch (error) {
        console.error('Ошибка загрузки корзины из localStorage:', error);
      }
    }
  }
}
