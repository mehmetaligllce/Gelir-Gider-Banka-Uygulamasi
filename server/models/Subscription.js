import mongoose from'mongoose';

const subscriptionSchema=new mongoose.Schema({
    name:{type:String, required:true},
    amount:{type:Number, required:true},
    paymentDay:{type:Number, required:true},
    category:{type:String, required:true},
    isActive:{type:Boolean, default:true},
    user:{type:mongoose.Schema.Types.ObjectId, ref: 'User', required:true}
});

export const Subscription=mongoose.model("Subscription",subscriptionSchema);