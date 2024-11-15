import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { qs } from "./utils.mjs";

const main = async () => {
  const dataSource = new ProductData("tents");
  const listElement = qs(".product-list");
  const productList = new ProductListing("tents", dataSource, listElement);
  await productList.init();
};

main();
