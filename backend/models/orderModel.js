import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    items: {
        type: Array,
        require: true
    },
    ammount: {
        type: Number,
        require: true
    },
    address: {
        type: Object,
        require: true
    },
    ststus: {
        type: String,
        require: true,
        default: 'Order placed'
    },
    PaymentMethod: {
        type: String,
        require: true
    },
    Payment: {
        type: Boolean,
        require: true,
        default: false
    },
    date: {
        type: Number,
        require: true
    }
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;