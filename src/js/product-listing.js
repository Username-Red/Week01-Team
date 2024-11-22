import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { qs, loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const renderProducts = async () => {
  const category = getParams("category");
  const dataSource = new ProductData();
  const listElement = qs(".product-list");
  const productList = new ProductListing(category, dataSource, listElement);
  await productList.init();
};

renderProducts();
