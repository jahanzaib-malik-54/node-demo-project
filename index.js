import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON


app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});




const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "pencil", price: 1 },
  { id: 4, name: "noteBook", price: 10 },
];

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

//  GET product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

//  CREATE a new product
app.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

//  UPDATE a product
app.put("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });

  const { name, price } = req.body;
  product.name = name ?? product.name;
  product.price = price ?? product.price;

  res.json(product);
});

//  DELETE a product
app.delete("/api/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex === -1)
    return res.status(404).json({ message: "Product not found" });

  const deleted = products.splice(productIndex, 1);
  res.json(deleted[0]);
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
