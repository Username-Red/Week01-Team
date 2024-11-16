import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const productData = new ProductData("tents");

const listItem = document.querySelector(".product-list")
const productList = new ProductList("tents", productData, listItem)

productList.init();
// console.log(list);


