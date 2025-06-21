import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/productModel.js";

dotenv.config();

const app = express();

app.post("/products", async (req, res) => {
  const product = req.body;

  if (!product.price || !product.name || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//postman






app.listen(5000, () => {
  connectDB;
  console.log("server started at http://localhost:5000 hellooooo");
});

//  afzalurrahman
//  PI8jQtkSoUNBg7wK
//   mongodb+srv://afzalurrahman:PI8jQtkSoUNBg7wK@cluster0.5ad8cz6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
