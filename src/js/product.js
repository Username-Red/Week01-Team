import { setLocalStorage, getLocalStorage, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";


const dataSource = new ProductData("tents");
const parameter = getParams("product");
// const blep = await dataSource.findProductById(parameter);

const products = new ProductDetails(parameter, dataSource);
products.init();

// console.log(blep);

// add to cart button event handler
async function addToCartHandler(e) {
  const productss = getLocalStorage("so-cart") ? getLocalStorage("so-cart") : [];
  const product = await dataSource.findProductById(e.target.dataset.id);
  productss.push(product);
  products.addProductToCart(productss);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);



