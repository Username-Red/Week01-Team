import {renderListWithTemplate, qs} from "./utils.mjs";

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
    const list = await this.dataSource.getData(this.category);
      this.renderList(list);
      qs(".title").innerHTML = this.category;
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
