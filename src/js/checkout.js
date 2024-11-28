import { loadHeaderFooter, changeFormAction, qs, setLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter("../index.html", "../cart/index.html");
changeFormAction();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

qs("#zip").addEventListener(
  "blur",
  myCheckout.calculateOrdertotal.bind(myCheckout),
);
// listening for click on the button

qs("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const form = qs("#checkoutForm")
  const checkValidity = form.checkValidity()
  form.reportValidity()
 if (checkValidity) {
  myCheckout.checkout();
  window.location.href = "../checkout/success.html";
  setLocalStorage("so-cart", [])

 }
  
});
