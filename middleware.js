const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

const auth = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price == null || !category || inStock == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
};

module.exports = { logger, auth, validateProduct, errorHandler };
