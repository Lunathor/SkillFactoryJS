import { API_CONFIG } from '../config/api.js';

export class GoogleBooksAPI {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.apiKey = API_CONFIG.GOOGLE_BOOKS_API_KEY;
    this.maxResults = API_CONFIG.MAX_RESULTS;
    this.useApiKey = API_CONFIG.USE_API_KEY;
  }

  async searchBooks(query, startIndex = 0) {
    try {
      const params = new URLSearchParams({
        q: query,
        startIndex: startIndex.toString(),
        maxResults: this.maxResults.toString(),
        printType: 'books',
        orderBy: 'relevance'
      });

      // Добавляем API ключ только если он включен
      if (this.useApiKey && this.apiKey && this.apiKey !== 'YOUR_API_KEY_HERE') {
        params.append('key', this.apiKey);
      }

      const response = await fetch(`${this.baseURL}?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.formatBooksData(data);
    } catch (error) {
      console.error('Ошибка при загрузке книг:', error);
      throw error;
    }
  }

  formatBooksData(data) {
    if (!data.items) {
      return {
        books: [],
        totalItems: 0,
        hasMore: false
      };
    }

    const books = data.items.map(item => this.formatBookData(item));
    const hasMore = data.items.length === this.maxResults;

    return {
      books,
      totalItems: data.totalItems,
      hasMore
    };
  }

  formatBookData(item) {
    const volumeInfo = item.volumeInfo || {};
    const saleInfo = item.saleInfo || {};

    return {
      id: item.id,
      title: volumeInfo.title || 'Без названия',
      authors: volumeInfo.authors || ['Неизвестный автор'],
      description: volumeInfo.description || '',
      imageLinks: volumeInfo.imageLinks || {},
      averageRating: volumeInfo.averageRating || null,
      ratingsCount: volumeInfo.ratingsCount || 0,
      publishedDate: volumeInfo.publishedDate || '',
      categories: volumeInfo.categories || [],
      language: volumeInfo.language || 'ru',
      pageCount: volumeInfo.pageCount || null,
      saleInfo: {
        listPrice: saleInfo.listPrice || null,
        retailPrice: saleInfo.retailPrice || null,
        buyLink: saleInfo.buyLink || null
      }
    };
  }

  getCategoryQuery(category) {
    const categoryQueries = {
      'programming': 'programming OR coding OR software development OR computer science',
      'fiction': 'fiction OR novel OR literature',
      'science': 'science OR scientific OR research',
      'business': 'business OR management OR entrepreneurship',
      'history': 'history OR historical',
      'art': 'art OR design OR creative'
    };

    return categoryQueries[category] || category;
  }

  async getBooksByCategory(category, startIndex = 0) {
    const query = this.getCategoryQuery(category);
    return await this.searchBooks(query, startIndex);
  }
}
