import { setLocalStorage, getLocalStorage, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";


const dataSource = new ProductData("tents");
const parameter = getParams("product");
// const blep = await dataSource.findProductById(parameter);

const products = new ProductDetails(parameter, dataSource);
products.init();

// console.log(blep);


function addProductToCart(product) {
  //Clearly this function was incomplete because it would overwrite the localstorage cart
  //So let's fix it
  // Attempt to parse existing cart data or set it to an empty array if parsing fails
  let cart = JSON.parse(localStorage.getItem("so-cart"));

  // If `cart` is not an array, reinitialize it as an empty array
  if (!Array.isArray(cart)) {
  cart = [];
  }

  // Add the new product to the cart array
  cart.push(product);

  // Save the updated cart array back to localStorage
  localStorage.setItem("so-cart", JSON.stringify(cart));
}
// add to cart button event handler
async function addToCartHandler(e) {
  const productss = getLocalStorage("so-cart") ? getLocalStorage("so-cart") : [];
  const product = await dataSource.findProductById(e.target.dataset.id);
  productss.push(product);
  addProductToCart(productss);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);



