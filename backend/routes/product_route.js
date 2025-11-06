import express from "express";
import { addProduct, listProduct, removeProduct } from "../controller/productController.js";
import upload from '../middleware/multer.js';
import adminAuth from "../middleware/admin.js";

const productRoute = express.Router();

productRoute.post(
  "/add",adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  addProduct 
);

productRoute.route("/list").get(listProduct);
productRoute.route("/remov").post(adminAuth,removeProduct);

export default productRoute;