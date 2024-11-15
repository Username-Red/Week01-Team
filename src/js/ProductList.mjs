import { renderListWithTemplate } from "./utils.mjs"


function productCardTemplate(product) {
    return `
        <li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
                <img src="${product.Image}"  alt="Image of ${product.Name}">
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.Name}</h2>
                <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
        </li>
    `
}




export default class ProductListing{
    constructor (category, dataSource, listElement){
        this.category = category,
        this.dataSource = dataSource,
        this.listElement = listElement
    }

    async init(){
        // get the list of products
        const list = await this.dataSource.getData()

        // filter the list to 4 products
        const filteredList = this.filterProducts(list)
        // render the product list
        this.renderList(filteredList)
    }

    filterProducts(list){
        return list.filter(product => product.category === this.category).slice(0, 4)
    }

    renderList(list){
       renderListWithTemplate(productCardTemplate, this.listElement, list, 'afterbegin', true)
    }
    
}