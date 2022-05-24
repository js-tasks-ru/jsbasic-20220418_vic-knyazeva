function initCarousel() {
  let lfArrow = document.getElementsByClassName('carousel__arrow_left')[0];
  let rgArrow = document.getElementsByClassName('carousel__arrow_right')[0];
  let inner = document.getElementsByClassName('carousel__inner')[0];
  let slides = inner.getElementsByClassName('carousel__slide');

  let currentSlideIndex = 0;
  updateCarousel();

  lfArrow.addEventListener('click', () => {
    if (currentSlideIndex > 0)
    {
      --currentSlideIndex;
      updateCarousel();
    }
  });
  rgArrow.addEventListener('click', () => {
    if (currentSlideIndex < slides.length - 1)
    {
      ++currentSlideIndex;
      updateCarousel();
    }
  });

  window.addEventListener('resize', updateCarousel);

  function updateCarousel() {
    updateCarouselArrow(lfArrow, currentSlideIndex == 0);
    updateCarouselArrow(rgArrow, currentSlideIndex == slides.length - 1);
    inner.style.transform = `translateX(${-currentSlideIndex * slides[0].offsetWidth}px)`;
  }

  function updateCarouselArrow(carouselArrow, visible) {
    carouselArrow.style.display = visible ? 'none' : '';
  }
}
