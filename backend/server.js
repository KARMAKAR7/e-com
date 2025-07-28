// Basic Express server setup
import express from 'express'
import cors from 'cors';
// Import dotenv to manage environment variables
import dotenv from 'dotenv';
import connectDB from './config/mogodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();
//middleware
app.use(cors());
app.use(express.json());
dotenv.config(); // Load environment variables from .env file using
//api endpoints

app.use('/api/users', userRouter);
app.use('/api/product', productRouter); // Assuming you have a productRouter defined in your routes
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
