import { getLocalStorage, qs } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice} <br> ${(((item.SuggestedRetailPrice - item.FinalPrice) / item.SuggestedRetailPrice) * 100).toFixed(0)}% Off</p>
     <button item-id ="${item.Id}" class="remove-item">Remove Item</button>
  </li>`;
}

// add to cart




function removeIconListeners() {
  const removeIcons = document.querySelectorAll(".remove-item")

  removeIcons.forEach(removeIcon => {
    removeIcon.addEventListener("click", removeFromCart)
      
  })
}


function removeFromCart(event){
    const itemId = event.target.getAttribute("item-id");

    let cart = JSON.parse(localStorage.getItem("so-cart")) || [];

    cart = cart.filter(item => item.Id !== itemId);

    localStorage.setItem("so-cart", JSON.stringify(cart));

    // Re-render the cart
  const shoppingCart = new ShoppingCart("so-cart", ".cart-card");
  shoppingCart.renderCartContents();

}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }


  renderCartContents() {

  const cartContainer = qs(this.parentSelector)
 
  const cartItems = getLocalStorage(this.key);
  const cartFooter = qs(".cart-footer");
  const cartTotal = qs(".cart-total");

  // Check if cart items are available
  if (cartItems && cartItems.length > 0) {
    console.log(cartItems)
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    
   cartContainer.innerHTML = htmlItems.join("");

    // Calculate the total cost of the items
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    // Show the cart footer and update the total
    cartFooter.classList.remove("hide");
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  } else {
    // Hide the cart footer if the cart is empty
    qs(this.parentSelector).innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.classList.add("hide");
  }

  removeIconListeners()
}

}
