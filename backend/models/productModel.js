import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    catagory: { type: String, required: true },
    subcatagory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestSeller: { type: Boolean, default: false },
    date: { type: Date, required: true },
});

const productModel = mongoose.models.product || mongoose.model("products", productSchema);
export default productModel;