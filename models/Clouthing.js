class Clouthing{
    constructor( vestuary, size, price, brand, image, color){
        this.vestuary = vestuary;
        this.size = size;
        this.price = price;
        this.image = image;
        this.brand = brand;
        this.color = color;
        this.sold = false;
        this.id = this.generateId();
    }
    generateId(){
        return Math.floor(Math.random() * 1000000);
    }
    markSold(){
        this.sold = true;
    }
  

}

export default Clouthing;