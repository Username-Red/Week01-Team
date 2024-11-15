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

      if ("content" in document.createElement("template")) {
        //Instantiate the table with the existing HTML tbody
        //and the row with the template
        const sectionForProduct = document.querySelector(".product-detail");
        const template = document.querySelector(".contentHTML");
    
        //Clone the new row and insert it into the table
        const clone = template.content.cloneNode(true);
        let h3 = clone.querySelectorAll(".productName");
        let h2 = clone.querySelectorAll(".heading2");
        h3[0].textContent = this.product.Brand.Name;
        h2[0].textContent = this.product.NameWithoutBrand;
        let img = clone.querySelectorAll(".imageTent");
        img[0].setAttribute("src", this.product.Image);
        img[0].setAttribute("alt", this.product.NameWithoutBrand);
        let p = clone.querySelectorAll(".parag");
        p[0].textContent = `$${this.product.SuggestedRetailPrice}`;
        p[1].textContent =  this.product.Colors[0].ColorName;
        p[2].innerHTML = this.product.DescriptionHtmlSimple
        let button = clone.querySelectorAll("#addToCart");
        button[0].textContent = "Add to Cart";
        button[0].setAttribute("data-id", this.product.Id)
        
    
        sectionForProduct.appendChild(clone);
    
                
    } else {
        //Find another way to add the rows to the table because 
        //the HTML template is not supported.
    }       

  }



}