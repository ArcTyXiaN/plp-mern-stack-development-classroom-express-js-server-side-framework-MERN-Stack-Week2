# Express.js REST API

## Setup
1. Run: npm init -y
2. Install dependencies:
   npm install express body-parser uuid dotenv
3. Create a `.env` file using `.env.example`
4. Run the server:
   node server.js

## Endpoints
GET /api/products
GET /api/products/:id
POST /api/products (requires x-api-key)
PUT /api/products/:id (requires x-api-key)
DELETE /api/products/:id (requires x-api-key)
GET /api/stats

## Example
POST /api/products
Header: x-api-key: 12345
Body:
{
  "name": "Phone",
  "description": "Android smartphone",
  "price": 400,
  "category": "Electronics",
  "inStock": true
}
