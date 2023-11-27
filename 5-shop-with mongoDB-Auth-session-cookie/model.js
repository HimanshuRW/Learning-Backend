

const getDb = require("---").getDb;

class Product {
    constructor(...[]){
        // --
    }

    save(){
        const db = getDb();
        db.collection('products')
            .insertOne(this)
            .then(result =>{
                console.log(result);
            }).catch(err=>{
                console.log(err);
            })
    }
}