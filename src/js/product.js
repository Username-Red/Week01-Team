import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(products) {
  setLocalStorage("so-cart", products);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const products = getLocalStorage("so-cart") ? getLocalStorage("so-cart") : [];
  const product = await dataSource.findProductById(e.target.dataset.id);
  products.push(product);
  addProductToCart(products);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
