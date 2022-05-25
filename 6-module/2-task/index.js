export default class ProductCard {
  constructor(product) {
    this._elem = this.render(product);
  }

  get elem() {
    return this._elem;
  }

  render(product) {
    let elem = document.createElement('DIV');
    elem.className = 'card';
    elem.dataset.productId = product.id;

    elem.innerHTML = `
      <div class="card__top">
          <img src="/assets/images/products/${product.image}" class="card__image" alt="${product.name}">
          <span class="card__price">€${product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`;
    elem.addEventListener('click', event => this.handleClick(event));
    return elem;
  }

  handleClick(event) {
    if (event.target.tagName !== 'BUTTON')
      return;

    const customEvent = new CustomEvent("product-add", {
      detail: this._elem.dataset.productId,
      bubbles: true
    });

    this._elem.dispatchEvent(customEvent);
  }
}
