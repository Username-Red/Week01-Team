import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { qs, loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

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
