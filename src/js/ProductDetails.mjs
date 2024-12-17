  import { alertMessage, getLocalStorage,qs, setLocalStorage, renderListWithTemplate } from "./utils.mjs";
 
  // function productImageTemplate(product){  
  //   product.Images.ExtraImages.forEach(image => {
  //    `<img class="slide" src=${image.Src} alt="Image of${product.Name}">`
  //   });
  // }
  function productImageTemplate(ExtraImage){  
    return `
        <img class="slide" src=${ExtraImage.Src} alt="Image of${ExtraImage.Title}">
`
  }
  

  export default class ProductDetails {
    constructor(productId,  dataSource) {
        this.productId = productId;      
        this.product = {};               
        this.dataSource = dataSource;  
      }

      async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        this.carousel()
      }

      addProductToCart(product) {
        let cart = getLocalStorage("so-cart") || []
      
        const existingItem = cart.find(newItem => newItem.Id === product.Id)
    
        if (existingItem){
          existingItem.quantity = (existingItem.quantity || 1) + 1;
      
        }
        else{
          product.quantity = 1
          cart.push(product)
        }
      
        localStorage.setItem("so-cart", JSON.stringify(cart));
      
   
      
         alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    }

    renderProductDetails() {
        qs(".product-detail h3").innerHTML = this.product.Brand.Name;
        qs(".product-detail h2").innerHTML = this.product.NameWithoutBrand;
        renderListWithTemplate(productImageTemplate,qs(".slides"),this.product.Images.ExtraImages);
        const newChild = document.createElement("img");
        newChild.src = this.product.Images.PrimaryLarge
        newChild.alt = this.product.Name
        qs(".slides").prepend(newChild)
        qs(".product-card__price").innerHTML = "Now " + `$${this.product.FinalPrice}`;
        qs(".product-card__save").innerHTML = "Save $" + (this.product.SuggestedRetailPrice - this.product.FinalPrice).toFixed(2);

        qs(".product-card__disc").innerHTML = "Was " + `$${this.product.SuggestedRetailPrice}`;
        qs(".product__color").innerHTML = this.product.Colors[0].ColorName;
        qs(".product__description").innerHTML = this.product.DescriptionHtmlSimple;
        qs(".product-detail__add button").setAttribute("data-id", this.product.Id);
        qs("#addToFavorite").addEventListener("click", () =>{
          
          let favorites = getLocalStorage("favorite") || []
          const existFavoriteItem = favorites.find(newItem => newItem.Id === this.product.Id)
          if(!existFavoriteItem){
            favorites.push(this.product)
            setLocalStorage("favorite", favorites)
            
            alertMessage("Added to Favorite");
          }

          
        }) ;
        //  console.log(this.product.Images.ExtraImages)
    }

    carousel() {
      const slides = document.querySelectorAll(".slides img");
      let slideIndex = 0;
      let intervalId = null;

      initializeSlider();
     
      
      function initializeSlider() {
        if (slides.length > 0) {
          slides[slideIndex].classList.add("displaySlide");
          intervalId = setInterval(nextSlide, 3000);
        }
        
      }
      function showSlide(index) {
        if (index >= slides.length) {
          slideIndex = 0
        } else if (index < 0) {
          slideIndex = slides.length - 1;
        }

        slides.forEach(slide => {
          slide.classList.remove("displaySlide");
        });
        slides[slideIndex].classList.add("displaySlide");
      }
      // function prevSlide() {
      //   clearInterval(intervalId);
      //   slideIndex--;
      //   showSlide(slideIndex)
      // }
      function nextSlide() {
        slideIndex++;
        showSlide(slideIndex);
      }
    }

    
}
