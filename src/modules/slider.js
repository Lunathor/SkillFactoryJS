export class Slider {
  constructor(element) {
    this.slider = element;
    this.track = this.slider.querySelector('.slider__track');
    this.dots = this.slider.querySelectorAll('.slider__dot');
    this.slides = this.slider.querySelectorAll('.slider__slide');
    
    this.currentSlide = 0;
    this.slideCount = this.slides.length;
    this.autoSlideInterval = null;
    this.autoSlideDelay = 5000; // 5 секунд
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startAutoSlide();
    this.updateSlider();
  }

  setupEventListeners() {
    // Обработчики для точек навигации
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });

    // Пауза автопрокрутки при наведении
    this.slider.addEventListener('mouseenter', () => {
      this.stopAutoSlide();
    });

    this.slider.addEventListener('mouseleave', () => {
      this.startAutoSlide();
    });
  }

  goToSlide(slideIndex) {
    this.currentSlide = slideIndex;
    this.updateSlider();
    this.startAutoSlide(); // Перезапускаем автопрокрутку
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slideCount;
    this.updateSlider();
  }

  updateSlider() {
    // Перемещаем трек
    const translateX = -this.currentSlide * (100 / this.slideCount);
    this.track.style.transform = `translateX(${translateX}%)`;

    // Обновляем активную точку
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('slider__dot--active', index === this.currentSlide);
    });
  }

  startAutoSlide() {
    this.stopAutoSlide(); // Очищаем предыдущий интервал
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  // Публичный метод для остановки слайдера (например, при уходе со страницы)
  destroy() {
    this.stopAutoSlide();
  }
}
