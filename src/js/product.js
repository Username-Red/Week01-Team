import {
  setLocalStorage,
  getLocalStorage,
  getParams,
  loadHeaderFooter,
} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter("../index.html", "../cart/");

const dataSource = new ProductData("tents");
const parameter = getParams("product");

const products = new ProductDetails(parameter, dataSource);
products.init();

function addProductToCart(productss) {
  setLocalStorage("so-cart", productss);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const productss = getLocalStorage("so-cart")
    ? getLocalStorage("so-cart")
    : [];
  const product = await dataSource.findProductById(e.target.dataset.id);
  productss.push(product);
  addProductToCart(productss);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
