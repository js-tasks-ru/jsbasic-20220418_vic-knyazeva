import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.current = 0;
    this._elem = this.render();
  }

  get elem() {
    return this._elem;
  }

  render() {
    let elem = document.createElement('DIV');
    elem.className = 'carousel';

    this._rgArrow = renderArrow('carousel__arrow_right', 'angle-icon');
    this._rgArrow.addEventListener('click', (event) => this.handleRightArrow());
    elem.appendChild(this._rgArrow);

    this._lfArrow = renderArrow('carousel__arrow_left', 'angle-left-icon');
    this._lfArrow.addEventListener('click', (event) => this.handleLeftArrow());
    this._lfArrow.style.display = 'none';
    elem.appendChild(this._lfArrow);

    this._inner = document.createElement('DIV');
    this._inner.className = 'carousel__inner';
    elem.appendChild(this._inner);

    for (let slide of this.slides) {
      const slideElem = renderSlide(slide);

      slideElem.querySelector('button.carousel__button')
        .addEventListener('click', () => this.handleClickAdd(slide.id));

      this._inner.appendChild(slideElem);
    }

    return elem;
  }

  handleRightArrow() {
    if (this.current < this.slides.length - 1) {
      ++this.current;
      this.updateCarousel();
    }
  }

  handleLeftArrow() {
    if (this.current > 0) {
      --this.current;
      this.updateCarousel();
    }
  }

  updateCarousel() {
    this.updateCarouselArrow(this._lfArrow, this.current == 0);
    this.updateCarouselArrow(this._rgArrow, this.current == this.slides.length - 1);
    const currentSlideWidth = this._inner.children[0].offsetWidth;
    this._inner.style.transform = `translateX(${-this.current * currentSlideWidth}px)`;
  }

  updateCarouselArrow(carouselArrow, hidden) {
    carouselArrow.style.display = hidden ? 'none' : '';
  }

  handleClickAdd(productId) {
    const customEvent = new CustomEvent("product-add", {
      detail: productId,
      bubbles: true
    });
    this._elem.dispatchEvent(customEvent);
  }
}

function renderImage(src, alt) {
  const elem = document.createElement("IMG");
  elem.src = src;
  elem.alt = alt;
  return elem;
}

function renderArrow(className, icon) {
  const elem = document.createElement("DIV");
  elem.className = `carousel__arrow ${className}`;
  elem.innerHTML = `<img src="/assets/images/icons/${icon}.svg" alt="icon" />`;
  return elem;
}

function renderSlide(slide) {
  const elem = document.createElement('DIV');
  elem.className = 'carousel__slide';
  elem.dataset.id = slide.id;
  elem.appendChild(renderImage(`/assets/images/carousel/${slide.image}`, slide.name));
  elem.insertAdjacentHTML('beforeend', `
    <div class="carousel__caption">
      <span class="carousel__price">€${slide.price.toFixed(2)}</span>
      <div class="carousel__title">${slide.name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>`);
  return elem;
}
