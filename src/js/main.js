import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

loadHeaderFooter();
const alert = new Alert("alerts");
alert.renderElement();
