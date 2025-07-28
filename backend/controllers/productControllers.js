import { v2 as cloudinary } from "cloudinary";
import { json } from "express";
// funtion for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        const image1 = req.files.image1[0];
        const image2 = req.files.image2[0];
        const image3 = req.files.image3[0];
        const image4 = req.files.image4[0];
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // uplaod the images to cloudinary
        let imagesUrl = await Promise.all(images.map(async (image) => {
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "auto" });

                return result.secure_url;
            });
        }));

        // Validate input
        if (!name || !description || !price || !category || !subCategory || !sizes || !bestseller || imagesUrl.length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Create new product
        const newProduct = new productModel({
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: Boolean(bestseller),
            images: imagesUrl,
            Date: Date.now()
        });
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

//function for list products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// function for remove product
const removeProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Validate input
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Find and delete product
        const deletedProduct = await productModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

//function for single product information
const getProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Validate input
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Find product by ID
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export { addProduct, listProducts, removeProduct, getProduct };