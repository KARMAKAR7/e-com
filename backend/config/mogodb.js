import e from "express";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://rijukarmakar285:fIkUrSsw6BNDpkdo@cluster0.w8dhzrx.mongodb.net', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
export default connectDB;