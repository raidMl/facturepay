import mongoose from "mongoose";
const ccpSchema = new mongoose.Schema({     
    fname:{type :String,required:true,minlength:3,maxlength:25},
    cardNumber:{type:String,required:true,minlength:14,maxlength:18},
    expirationDate:{type:Date,required:true},
    cvv:{type:Number,required:true},
    sold:{type:Number,required:true,default:0}, 
    AcountType:{type:String,required:true,default:"user"}, //use commercial for admin
    userId:{type:String,required:true}



},

{timestamps: true }//when data c&u

)

const Ccp=mongoose.model("ccp",ccpSchema)

// exports.Order=Order;   //es5
 export default Ccp     //es6