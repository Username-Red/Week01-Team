import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { qs } from "./utils.mjs";
import Alert from "./Alert.js";

const alert = new Alert("alerts");
alert.renderElement();
const main = async () => {
  const dataSource = new ProductData("tents");
  const listElement = qs(".product-list");
  const productList = new ProductListing("tents", dataSource, listElement);
  await productList.init();
};

main();
