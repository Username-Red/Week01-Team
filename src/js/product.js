import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";


// Add event listener to the "Add to Cart" button
document.addEventListener("DOMContentLoaded", () => {
  // Your code to add the event listener
// Initialize data source and fetch product details
const dataSource = new ProductData("tents");
const productId = getParam("product");

// Create a new ProductDetails instance and initialize it
const product = new ProductDetails(productId, dataSource);
product.init();

// Event handler to add product to cart
// function addToCartHandler(event) {
//   // Using the `addToCart` method from the `ProductDetails` class
//   product.addToCart();
// }


  // document
  //   .getElementById("addToCart")
  //   .addEventListener("click", addToCart);
});
