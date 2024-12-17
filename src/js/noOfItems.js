import { getLocalStorage, qs } from "./utils.mjs";

function countCartItems() {
  const itemsInCart = getLocalStorage("so-cart");
  let runningQuantity = 0
  const totalNoOfItem = itemsInCart.map(item => runningQuantity += item.quantity);

  const numberInHtml = qs("#noOfItems");

  if (numberInHtml) {
    numberInHtml.innerHTML = totalNoOfItem;
  }
}

function waitForHeaderFooterAndCountItems() {
  const observer = new MutationObserver(() => {
    const numberInHtml = qs("#noOfItems");
    if (numberInHtml) {
      countCartItems();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

waitForHeaderFooterAndCountItems();
