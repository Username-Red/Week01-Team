function productCardTemplate(product) {
    const stringLiteral = `
    <li class="product-card">
            <a href="product_pages/?product=${product.Id}">
              <img
                src="${product.Image}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.ListPrice}</p></a
            >
          </li>
    `
    return stringLiteral
}

export default class ProductListing {

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData()

        this.renderList(list)
    }

    renderList(array) {
        const productList = array.map(product => 
            productCardTemplate(product)
        )

        this.listElement.insertAdjacentHTML("afterbegin", productList.join(""))
    }
}