const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    cart :{
        items : [
            {
                productId : {type: Schema.Types.ObjectId,ref:"Product", required:true},
                quantity : {type : Number,default:1,required:true}
            }

        ]
    }
});

userSchema.methods.addToCart = function (productId) {
    let found = false;
    this.cart.items.forEach(item => {
        if (item) {
            if (item.productId==productId) {
                found = true;
                item.quantity++;
            }
        }
    }); 
    if (!found) {
        this.cart.items.push({
            productId : productId,
            quantity : 1
        });
    }
    return this.save();
}

userSchema.methods.decreaseToCart = function (productId) {
    this.cart.items = this.cart.items.map(item=>{
        if (item.productId==productId) {
            if(item.quantity>1){
                item.quantity--;
                return item;
            }
        } else return item;
    });
    this.cart.items = this.cart.items.filter(item=>{
        if(item==null){
            return false;
        } else return true;
    });
    return this.save();
}

userSchema.methods.removeFromCart = function (productId) {
    this.cart.items = this.cart.items.filter(item=>{
        if(item.productId==productId){
            return false;
        } else return true;
    });
    return this.save();
}


module.exports = mongoose.model("Users",userSchema);