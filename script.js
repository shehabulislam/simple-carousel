class SimpleCarousel {
  constructor(element, slideToShow = 3) {
    if (!element) throw new Error("element must be");
    console.log(element);
    this.carousel = element;
    this.carouselContent = element.querySelector(".carousel-content");
    this.slides = element.querySelectorAll(".slide");
    this.prevButton = element.querySelector(".nav #prevBtn");
    this.nextButton = element.querySelector(".nav #nextBtn");

    this.slideWidth = this.slides[0].offsetWidth + 10; // Include margin
    this.slidesToShow = slideToShow; // Number of slides to show
    this.currentIndex = 0;
    this.transitionInProgress = false;

    this.init();
  }

  init() {
    this.prevButton.addEventListener("click", () => this.prevSlide());
    this.nextButton.addEventListener("click", () => this.nextSlide());
    this.updateCarousel();
  }

  prevSlide() {
    if (this.transitionInProgress) return;
    this.transitionInProgress = true;

    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    if (this.currentIndex + 1 === this.slides.length) {
      this.currentIndex = this.slides.length - this.slidesToShow;
    }
    this.updateCarousel();
  }

  nextSlide() {
    if (this.transitionInProgress) return;
    this.transitionInProgress = true;

    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    if (this.currentIndex + this.slidesToShow > this.slides.length) {
      this.currentIndex = 0;
    }
    this.updateCarousel();
  }

  updateCarousel() {
    console.log(this.currentIndex);
    const translateX = -this.currentIndex * this.slideWidth;
    this.carouselContent.style.transform = `translateX(${translateX}px)`;

    this.carouselContent.addEventListener("transitionend", () => {
      this.transitionInProgress = false;
    });
  }

  destroy() {
    this.prevButton.removeEventListener("click", () => this.prevSlide());
    this.nextButton.removeEventListener("click", () => this.nextSlide());
  }

  reinit() {
    this.prevButton.addEventListener("click", () => this.prevSlide());
    this.nextButton.addEventListener("click", () => this.nextSlide());
    this.updateCarousel();
  }
}
