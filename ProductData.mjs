class ProductData{
    constructor(category){
        this.category =category;
        this.path = `../json/${this.category}.json`;
    }

    getData(){
        return fetch(this.path)
         .then(convertoJson)
         .then((data) =data);
        
    }
    
}
export default ProductData