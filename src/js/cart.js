import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // Get the items from localStorage
  const cartItems = getLocalStorage("so-cart") || []; // Fallback to an empty array if null or undefined

   // Log the cart items to debug
   //console.log("Cart Items:", cartItems);

  // Check if cartItems is an array and then map
  const htmlItems = Array.isArray(cartItems) ? cartItems.map((item) => cartItemTemplate(item)) : [];

  // Update the HTML content of the product list
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice} <br/>${((item.SuggestedRetailPrice - item.FinalPrice) / item.SuggestedRetailPrice * 100).toFixed(0) + "% Off"}</p>
  
</li>`;
//(product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice * 100).toFixed(0) + "%";
  return newItem;
}

renderCartContents()