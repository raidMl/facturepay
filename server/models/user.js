import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 30 ,unique: true},
    email: { type: String, required: true, minlength: 8, maxlength: 50, unique: true },
    phone: { type: String, required: true, minlength: 8, maxlength: 14, unique: true },
    adress:{ type: String, required: true, minlength: 4, maxlength: 30 },
    password: { type: String, required: true, minlength: 8, maxlength: 1024, },
    role: { type: String, required: true, minlength: 3, maxlength: 30, default: "user" },
    // image: {
    //     type: String,
    //     required: false
    // },
    isActive: { type: Boolean, required: true, minlength:4, maxlength:5,default:true }

},


    { timestamps: true }//when data c&u
)

const User = mongoose.model("User", userSchema)
export default User;