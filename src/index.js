import './styles/main.scss';
import { Slider } from './modules/slider';
import { Bookshop } from './modules/bookshop';
import { Cart } from './modules/cart';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация слайдера
  const sliderElement = document.querySelector('.slider');
  if (sliderElement) {
    new Slider(sliderElement);
  }

  // Инициализация корзины
  const cart = new Cart();

  // Инициализация книжного магазина
  const bookshop = new Bookshop(cart);
  bookshop.init();
});
