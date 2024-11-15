import ProductData from "./ProductData.mjs"
import ProductListing from "./ProductList.mjs"



const dataSource = new ProductData('tents')
const productListElement = document.querySelector('.product-list')

const productListing = new ProductListing('Tents', dataSource, productListElement)
productListing.init()

