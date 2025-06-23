import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error fetching products: ", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
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

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("error deleting product:", error.message);
    res.status(500).json({ success: false, message: "Product not found" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("server starttted at http://localhost:5000 hellooooo");
});

//  afzalurrahman
//  PI8jQtkSoUNBg7wK
//   mongodb+srv://afzalurrahman:PI8jQtkSoUNBg7wK@cluster0.5ad8cz6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
