import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  get elem() {
    return this._elem;
  }

  updateFilter(filter) {
    Object.assign(this.filters, filter);
    this._inner.innerHTML = "";
    this.renderCards();
  }

  render() {
    this._elem = document.createElement('DIV');
    this._elem.classList.add('products-grid');

    this._inner = document.createElement('DIV');
    this._inner.re
    this._inner.classList.add('products-grid__inner');

    this._elem.append(this._inner);

    this.renderCards();
  }

  renderCards() {
    this._inner.clea
    
    const f = this.filters;
    for (const product of this.products) {
      if (f.noNuts && product.nuts)
        continue;

      if (f.vegeterianOnly && !product.vegeterian)
        continue;

      if (f.category && f.category !== product.category)
        continue;

      if (typeof f.maxSpiciness === 'number' &&
         f.maxSpiciness < product.spiciness)
        continue;

      const card = new ProductCard(product);
      this._inner.append(card.elem);
    }
  }
}
