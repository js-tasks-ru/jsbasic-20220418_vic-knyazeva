export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
      this.onProductUpdate(cartItem);
    }
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

