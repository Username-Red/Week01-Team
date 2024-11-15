import {renderListWithTemplate} from "./utils.mjs";

const unwantedList = ["Talus Tent - 3-Person, 3-Season", "Ajax Tent - 2-Person, 3-Season"]
function productCardTemplate(product){
  return `
   <li class="product-card">
            <a href="product_pages/?product=${product.Id}">
              <img
                src=${product.Image}
                alt="image of ${product.Name}"
              />
              <h3 class="card__brand">${product.Name.split(" ")[0]}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.FinalPrice}</p></a
            >
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
    const list = await this.dataSource.getData();
    if(unwantedList || unwantedList.length > 0){
      const filteredList = list.filter(elem => unwantedList.includes(elem.NameWithoutBrand) === false);
      this.renderList(filteredList);
    }else this.renderList(list);
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
