import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product)
      return;

    let cartItem = this.cartItems.find(item => item.product.id === product.id);
    if (cartItem)
      cartItem.count++;
    else {
      cartItem = {
        product: product,
        count: 1
      };
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let index = this.cartItems
      .findIndex(pi => pi.product.id == productId);
    if (index < 0)
      return;

    const cartItem = this.cartItems[index];
    cartItem.count += amount;
    if (cartItem.count < 1) {
      this.cartItems.splice(index, 1);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((prev, item) => prev + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((prev, item) => prev + item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");

    this.modalBody = document.createElement("div");
    for (let item of this.cartItems) {
      const itemElem = this.renderProduct(item.product, item.count);
      this.modalBody.append(itemElem);
    }
    this.modalBody.append(this.renderOrderForm());
    this.modalBody.querySelector("form").addEventListener('submit', e => this.onSubmit(e));
    this.modalBody.addEventListener("click", e => this.onModalBodyClick(e));

    this.modal.setBody(this.modalBody);

    this.modal.elem.addEventListener("modal-close", (e) => {
      console.log(`modal-close`, e);
      this.modal = null;
      this.modalBody = null
    });
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (!this.modal) {
      // modal is not opened
      return;
    }

    if (!this.cartItems.length) {
      // all cart items removed
      this.modal.close();
      return;
    }

    if (cartItem.count === 0) {
      // cart item removed
      this.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"]`).remove();
    }
    else {
      // cart item changed
      this.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`).innerHTML = cartItem.count;
      this.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`).innerHTML = "€" + (cartItem.count * cartItem.product.price).toFixed(2)
    }

    // update total price
    this.modalBody.querySelector(".cart-buttons__info-price").innerHTML = "€" + this.getTotalPrice().toFixed(2)
  }

  async onSubmit(e) {
    e.preventDefault();
    this.modalBody.querySelector('button[type="submit"]').classList.add("is-loading");
    let formData = new FormData(this.modalBody.querySelector('form.cart-form'));
    this.cartItems.forEach((v, i) => {
      formData.append(`items[${i}].id`, v.product.id);
      formData.append(`items[${i}].count`, v.count);
    });

    let response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    });

    let result = await response.json();

    this.modal.setTitle("Success!");
    this.modalBody.querySelector('button[type="submit"]').classList.remove("is-loading");
    this.cartItems = [];
    this.cartIcon.update(this);
    this.modalBody.innerHTML = `
<div class="modal__body-inner">
  <p>
    Order successful! Your order is being cooked :) <br>
    We’ll notify you about delivery time shortly.<br>
    <img src="/assets/images/delivery.gif">
  </p>
</div>`;
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  onModalBodyClick(event) {
    if (event.target.closest(".cart-counter__button")) {
      let productId = event.target.closest("[data-product-id]").dataset.productId;
      let amount = event.target.closest(".cart-counter__button_plus") ? 1 : -1;
      this.updateProductCount(productId, amount);
    }
  };
}

