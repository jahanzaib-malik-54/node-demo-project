import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI, {

  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(express.json());

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel + MongoDB!");
});

// GET all products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET product by ID
app.get("/api/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// CREATE a product
app.post("/api/products", async (req, res) => {
  const { name, price } = req.body;
  const newProduct = new Product({ name, price });
  await newProduct.save();
  res.status(201).json(newProduct);
});

// UPDATE a product
app.put("/api/products/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Product not found" });
  res.json(updated);
});

// DELETE a product
app.delete("/api/products/:id", async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Product not found" });
  res.json(deleted);
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
