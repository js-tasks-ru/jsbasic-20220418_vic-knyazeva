import createElement from '../../assets/lib/create-element.js';

const arrowVisibleClass = 'ribbon__arrow_visible';
const itemActiveClass = 'ribbon__item_active';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
  }

  get elem() {
    return this._elem;
  }

  render() {
    this._elem = document.createElement('DIV');
    this._elem.classList.add('ribbon');

    this._arrowLf = renderArrow('ribbon__arrow_left', false);
    this._arrowRg = renderArrow('ribbon__arrow_right', true);

    this._arrowLf.addEventListener('click', () => this._inner.scrollBy(-350, 0));
    this._arrowRg.addEventListener('click', () => this._inner.scrollBy(+350, 0));

    this._inner = document.createElement('DIV');
    this._inner.classList.add('ribbon__inner');
    this._inner.addEventListener('scroll', () => this.updateArrowsState());

    this._elem.appendChild(this._arrowLf);
    this._elem.appendChild(this._inner);
    this._elem.appendChild(this._arrowRg);

    this.categories.forEach((category, index) => {
      const menuItem = createElement(`<a href="#" class="ribbon__item"></a>`);
      menuItem.textContent = category.name;
      menuItem.dataset.id = category.id;
      menuItem.addEventListener('click', (event) => this.handleMenuItemClick(event));
      if (index === 0)
        menuItem.classList.add(itemActiveClass);
      this._inner.appendChild(menuItem);
    });
  }

  handleMenuItemClick(event) {
    event.preventDefault();

    const item = event.target;
    const prev = this._inner.querySelector('.ribbon__item.' + itemActiveClass);
    if (prev) {
      if (prev === item)
        return;
      prev.classList.remove(itemActiveClass);
    }

    item.classList.add(itemActiveClass);

    const customEvent = new CustomEvent("ribbon-select", {
      detail: event.target.dataset.id,
      bubbles: true
    });
    this._elem.dispatchEvent(customEvent);
  }

  updateArrowsState() {
    let scrollLf = this._inner.scrollLeft;
    let scrollRg = this._inner.scrollWidth - this._inner.clientWidth - scrollLf;
    updateArrow(this._arrowLf, scrollLf !== 0);
    updateArrow(this._arrowRg, scrollRg !== 0);
  }
}

function updateArrow(arrowElement, visible) {
  if (visible)
    arrowElement.classList.add(arrowVisibleClass);
  else
    arrowElement.classList.remove(arrowVisibleClass);
}

function renderArrow(className, visible) {
  const elem = document.createElement("BUTTON");
  elem.classList.add('ribbon__arrow', className);
  if (visible)
    elem.classList.add(arrowVisibleClass);
  elem.appendChild(renderImage(`/assets/images/icons/angle-icon.svg`, 'icon'));
  return elem;
}

function renderImage(src, alt) {
  const elem = document.createElement("IMG");
  elem.src = src;
  elem.alt = alt;
  return elem;
}
