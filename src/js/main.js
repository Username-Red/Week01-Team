import Alert from "./Alert.js";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, qs } from "./utils.mjs";

loadHeaderFooter();

const alert = new Alert("alerts");
const main = async () => {
  const dataSource = new ProductData("tents");
  const listElement = qs(".product-list");
  const productList = new ProductListing("tents", dataSource, listElement);
  await productList.init();
};

alert.renderElement();
main();

//newsletter form
const form = document.getElementById('newsletterForm');

form.addEventListener('submit',function(event){
  event.preventDefault();

  const emailInput = document.getElementById('email');
  const email = emailInput.value;

  if(!email || !email.includes('@')){
    alert('Please enter a valid email address.');
    return;
  }
  console.log('Email submitted:', email)

  

  alert('Thank you for subscribing to our newsletter!')
});
