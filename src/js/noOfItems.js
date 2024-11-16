import { getLocalStorage } from "./utils.mjs";

function countCartItems() {
    const itemsInCart = getLocalStorage("so-cart")
    const totalNoOfItem = itemsInCart.length;
    console.log(totalNoOfItem)
  
    const numberInHtml = document.querySelector("#noOfItems");
  
    numberInHtml.innerHTML = totalNoOfItem
  }
  
  countCartItems();