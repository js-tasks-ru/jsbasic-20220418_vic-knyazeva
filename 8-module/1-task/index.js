import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, { once: true });

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.offsetHeight) { // icon not visible
      return;
    }
    if (document.documentElement.clientWidth <= 767) { // mobile styles in use
      this.setDefaultPosition();
      return;
    }

    const windowY = window.pageYOffset;

    if (this.initialY === undefined) { // store initial Y-position
      this.initialY = this.elem.getBoundingClientRect().top + windowY;
    }
    if (windowY > this.initialY) {
      this.setUpdatedPosition();
    }
    else {
      this.setDefaultPosition();
    }
  }

  setDefaultPosition() {
    const style = this.elem.style;
    style.position = "";
    style.top = "";
    style.zIndex = "";
    style.left = "";
  }

  setUpdatedPosition() {
    const style = this.elem.style;
    style.position = "fixed";
    style.top = "50px";
    style.zIndex = 1000;
    const outsideX = document.querySelector(".container").getBoundingClientRect().right + 20;
    const insideX = document.documentElement.clientWidth - this.elem.offsetWidth - 10;
    style.left = `${Math.min(outsideX, insideX)}px`
  }
}
