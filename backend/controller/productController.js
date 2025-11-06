// controllers/productController.js
import productModel from "../models/productModel.js";

// 1️⃣ Add Product
const addProduct = async (req, res, next) => {
  try {
    const { name, description, sizes, category, subCategory, bestSeller } = req.body;
    
   
    const images = [];
    const fileFields = ["image1", "image2", "image3"];

    for (const field of fileFields) {
      const file = req.files?.[field]?.[0];
      if (file) {
        const imagePath = `/assets/products/${file.filename}`;
        images.push(imagePath);
      }
    }

    const product = await productModel.create({
      name,
      description,
      image: images,
      sizes,
      category,
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
    });

    res.status(201).json({
      success: true,
      message: "✅ Product added successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// 2️⃣ List Products
const listProduct = async (req, res, next) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// 3️⃣ Remove Product
const removeProduct = async (req, res, next) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "🗑️ Product removed" });
  } catch (error) {
    next(error);
  }
};


export { addProduct, listProduct, removeProduct };
