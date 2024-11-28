  import { alertMessage, getLocalStorage,qs, setLocalStorage } from "./utils.mjs";
export default class ProductDetails {
    constructor(productId,  dataSource) {
        this.productId = productId;      
        this.product = {};               
        this.dataSource = dataSource;  
      }

      async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
      }

      addProductToCart(product) {
         setLocalStorage("so-cart", product);
         alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    }

    renderProductDetails() {
        qs(".product-detail h3").innerHTML = this.product.Brand.Name;
        qs(".product-detail h2").innerHTML = this.product.NameWithoutBrand;
        qs(".product-detail img").src = this.product.Images.PrimaryLarge;
        qs(".product-detail img").alt = this.product.NameWithoutBrand;
        qs(".product-card__price").innerHTML = "Now " + `$${this.product.FinalPrice}`;
        qs(".product-card__save").innerHTML = "Save $" + (this.product.SuggestedRetailPrice - this.product.FinalPrice).toFixed(2);
        qs(".product-card__disc").innerHTML = "Was " + `$${this.product.SuggestedRetailPrice}`;
        qs(".product__color").innerHTML = this.product.Colors[0].ColorName;
        qs(".product__description").innerHTML = this.product.DescriptionHtmlSimple;
        qs(".product-detail__add button").setAttribute("data-id", this.product.Id) ;
    }
}
