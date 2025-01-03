import {renderListWithTemplate, qs, getLocalStorage} from "./utils.mjs";

const select = document.querySelector("select")
// const unwantedList = ["Talus Tent - 3-Person, 3-Season", "Ajax Tent - 2-Person, 3-Season"]
function productCardTemplate(product){
  let discountMessage = "";
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    const discountPercentage = Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100);
    discountMessage = `<p class="product-card__discount">Discount: ${discountPercentage}% off</p>`;
  }
  return `
   <li class="product-card">
            <a href="/product_pages/index.html?product=${product.Id}">
              <img
                src=${product.Images.PrimaryMedium}
                alt="image of ${product.Name}"
              />
              <h3 class="card__brand">${product.Name.split(" ")[0]}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.FinalPrice}</p>
              ${discountMessage}
              </a>
          </li>
  `;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    let list = []
    if(this.category === "favorite"){
      list = await getLocalStorage("favorite")
      
    }
    else{list = await this.dataSource.getData(this.category);}
     
   
      qs(".title").innerHTML = this.category;
      this.renderList(list);

      select.addEventListener("change", () => {
        this.listElement.innerHTML = "";
        const option = select.value;
    
        //Sort items based on selected option
        const sortedItems = [...list].sort((a, b) => {
            if (option === "low-to-high") {
                return a.FinalPrice - b.FinalPrice;
            } else if (option === "a-z") {
                return a.Name.localeCompare(b.Name)
            }
        })
    
        this.renderList(sortedItems)
    })
    

  }
  renderList(list) {
    if(list === null || list.length === 0){
      this.listElement.innerHTML = `<li>No item found for ${this.category}</li>`
    }
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
