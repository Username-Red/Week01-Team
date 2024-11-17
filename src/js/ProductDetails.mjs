import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>
    <p class="product__discount">Original Price $${(product.SuggestedRetailPrice)}</p>
    
    <p class="product__discount">Discount off $${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2) }
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch the product details
    this.product = await this.dataSource.findProductById(this.productId);
    // Render the product details in the specified selector
    this.renderProductDetails("main");
    // Add event listener to the "Add to Cart" button
    // Add the event listener after rendering
    const addToCartButton = document.getElementById("addToCart");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", this.addToCart.bind(this));
    } else {
      console.error("Add to Cart button not found in the DOM");
    }
  }


  addToCart() {
    // Retrieve the existing cart from localStorage or set an empty array if it doesn't exist
    let productCart = getLocalStorage("so-cart") || [];

    // Ensure that productCart is always an array
    if (!Array.isArray(productCart)) {
      productCart = [];
    }

    // Push the new product into the cart array
    productCart.push(this.product);

    // Save the updated cart back to localStorage
    setLocalStorage("so-cart", productCart);

    // Log the cart and product for debugging
    console.log("Updated cart:", productCart);
    console.log("Product added:", this.product);

   
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}
