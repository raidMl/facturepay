import mongoose from "mongoose";
const factureShema = new mongoose.Schema({     
    name:{type :String,required:true,minlength:3,maxlength:25},// electricity gas water
    description:{type:String,required:false},
    price:{type:Number,required:true}, 
    status:{type:String,required:true,default:'not payed'}, //payed
    userId:{type:String,required:true}



},

{timestamps: true }//when data c&u

)

const Facture=mongoose.model("Facture",factureShema)

// exports.Order=Order;   //es5
 export default Facture     //es6