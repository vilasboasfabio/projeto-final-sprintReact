import Transaction from "./Transaction";

class TransactionsList{
    constructor(){
        this.historic = [];
        this.balance = 0; 
        this.recepts = 0;
        this.expenses = 0;

    }
    add(value, description, type){
        const newtransaction = new Transaction(Number(value), description, type);

        console.log(newtransaction);
        this.historic.push(newtransaction);
        this.updateValues();
       
        console.log(this.saldo);
    }

    update(id, description, value){
        const transaction = this.getTransactionById(id);
        transaction.description = description;
        transaction.value = value;
        this.updateValues();
    }

    remove(id){
        this.historic = this.historic.filter(transaction => transaction.id !== id);
        this.updateValues();
        

    }
   getTransactionById(id){
         return this.historic.find(transaction => transaction.id === id);
    }
    updateValues(){
        this.balance = 0;
        this.recepts = 0;
        this.expenses = 0;
        this.historic.map(transaction => {
            if(transaction.type == 'recept'){
                this.recepts += Number(transaction.value);
            }else{
                this.expenses += Number(transaction.value);
            }
        });
        this.balance = this.recepts - this.expenses;
    }
    
}

export default TransactionsList;