import { getLocalStorage, qs } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice} <br> ${(((item.SuggestedRetailPrice - item.FinalPrice) / item.SuggestedRetailPrice) * 100).toFixed(0)}% Off</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
  const cartItems = getLocalStorage(this.key);
  const cartFooter = qs(".cart-footer");
  const cartTotal = qs(".cart-total");

  // Check if cart items are available
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    qs(this.parentSelector).innerHTML = htmlItems.join("");

    // Calculate the total cost of the items
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    // Show the cart footer and update the total
    cartFooter.classList.remove("hide");
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  } else {
    // Hide the cart footer if the cart is empty
    this.parentSelector.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.classList.add("hide");
  }
}
}
