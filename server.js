const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { logger, auth, validateProduct, errorHandler } = require('./middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(logger);

let products = [];

// Hello world
app.get('/', (req, res) => res.send('Hello World'));

// GET all products (with filter, pagination, search)
app.get('/api/products', (req, res) => {
  let result = products;
  const { category, name, page = 1, limit = 5 } = req.query;

  if (category) result = result.filter(p => p.category === category);
  if (name) result = result.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));

  const start = (page - 1) * limit;
  const end = page * limit;
  res.json({ total: result.length, data: result.slice(start, end) });
});

// GET one product
app.get('/api/products/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next({ status: 404, message: 'Product not found' });
  res.json(product);
});

// CREATE product
app.post('/api/products', auth, validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// UPDATE product
app.put('/api/products/:id', auth, validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next({ status: 404, message: 'Product not found' });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE product
app.delete('/api/products/:id', auth, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next({ status: 404, message: 'Product not found' });
  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

// STATS
app.get('/api/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
