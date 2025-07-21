import mongoose  from "mongoose";


const userAddressSchema=mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    addressLine1:{
        type: String,
        required: true
    },
    addressLine2:{
        type: String,
        required: false
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    postalCode:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    }

},{
    timestamps: true
})
userAddressSchema.index({ userID: 1 });
const UserAddress=mongoose.model("UserAddress",userAddressSchema);
export default UserAddress;
