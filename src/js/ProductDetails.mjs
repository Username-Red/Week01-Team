export default class ProductDetails {
    constructor(productId,  dataSource) {
        this.productId = productId;      // Stores the product ID
        this.product = {};               // Will store product data once fetched
        this.dataSource = dataSource;    // Reference to the data source for fetching details
      }

      async init() {
        // Fetch product details using the productId
        this.product = await this.dataSource.findProductById(this.productId);
        // Render the fetched product details
        this.renderProductDetails();
      }

      addProductToCart(product) {
        //Clearly this function was incomplete because it would overwrite the localstorage cart
        //So let's fix it
        // Attempt to parse existing cart data or set it to an empty array if parsing fails
        let cart = JSON.parse(localStorage.getItem("so-cart"));
 
        // If `cart` is not an array, reinitialize it as an empty array
        if (!Array.isArray(cart)) {
        cart = [];
        }
 
        // Add the new product to the cart array
        cart.push(product);
 
        // Save the updated cart array back to localStorage
        localStorage.setItem("so-cart", JSON.stringify(cart));
    }

    renderProductDetails() {
        document.querySelector(".product-detail h3").textContent = this.product.Brand.Name;
        document.querySelector(".product-detail h2").textContent = this.product.NameWithoutBrand;
        document.querySelector(".product-detail img").src = this.product.Image;
        document.querySelector(".product-detail img").alt = this.product.NameWithoutBrand;
        document.querySelector(".product-card__price").textContent = `$${this.product.SuggestedRetailPrice}`;
        document.querySelector(".product__color").textContent = this.product.Colors[0].ColorName;
        document.querySelector(".product__description").textContent = this.product.DescriptionHtmlSimple;
        document.querySelector(".product-detail__add button").setAttribute("data-id", this.product.Id) ;
       
 
    }



}