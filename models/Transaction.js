class Transaction{
    constructor(value, description, type){
    
        this.value = value;
        this.description = description;
        this.type = type;
        this.id = this.generateId();
        
    }
    generateId(){
        return Math.floor(Math.random() * 1000);
    }
}


export default Transaction;
