// Конфигурация API
export const API_CONFIG = {

  // Используем переменную окружения для API ключа
  // ВАЖНО: Замените на новый API ключ! Старый был скомпрометирован
  GOOGLE_BOOKS_API_KEY: process.env.GOOGLE_BOOKS_API_KEY || 'AIzaSyBv5t9xefBc5hNNpY7QufyZwZLKM6ElEB0',
  
  // Базовые настройки
  BASE_URL: 'https://www.googleapis.com/books/v1/volumes',
  MAX_RESULTS: 6,
  
  // Настройки для разработки
  USE_API_KEY: true, 
};
