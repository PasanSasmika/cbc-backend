import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        reduired: true,
        unique: true
    },

    email: {
        type: String,
        reduired: true
    },

    orderedItems: [
        {
            name: {
                type: String,
                reduired: true
            },
            
            productId:{
                type:String,
                required:true
            },

            price : {
                type: Number,
                reduired: true
            },

            quantity: {
                type: Number,
                reduired: true
            },
            image:{
                type: String,
                required: true
            }
        }
    ],

    date : {
        type: Date,
        default: Date.now
    },

    paymentId: {
        type: String
    },
    
    status: {
        type: String,
        default: "preparing"
    },

    notes : {
        type: String
    },

    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    }
})

const Order = mongoose.model("orders", orderSchema);

export default Order;