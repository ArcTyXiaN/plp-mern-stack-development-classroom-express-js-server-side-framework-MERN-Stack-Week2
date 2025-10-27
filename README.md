
## Product API Documentation

**Built with Express.js — Week 2 Assignment**

This project is a well-structured **Express.js REST API** designed for managing a collection of products. It demonstrates **middleware usage**, **routing**, **authentication**, **error handling**, and **basic data operations** — all using in-memory storage.

---

##  Overview

The API allows developers to:

* Retrieve, filter, and search for products
* Add, update, or delete products (secured by an API key)
* View simple product statistics
* Understand middleware and error handling structure in Express.js

The project emphasizes clean RESTful architecture and can serve as a foundation for more complex backend systems.

---

##  Project Structure

```
project/
│
├── server.js          # Main entry point for the API
├── package.json       # Project configuration
├── .env               # Environment variables (optional)
└── README.md          # Documentation
```

---

##  Core Concepts Covered

This project includes practical use of:

* Express.js routing
* Custom middleware functions
* Request logging
* Simple API authentication
* In-memory data manipulation
* Query filtering, pagination, and search
* Centralized error handling

---

##  Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/ArcTyXiaN/plp-mern-stack-development-classroom-express-js-server-side-framework-MERN-Stack-Week2.git
cd plp-mern-stack-development-classroom-express-js-server-side-framework-MERN-Stack-Week2
```

### 2. Initialize project

```bash
npm init -y
```

### 3. Install dependencies

```bash
npm install express body-parser uuid dotenv
```

### 4. Configure environment

Create a `.env` file:

```
PORT=3000
```

### 5. Start the server

```bash
node server.js
```

The server will run on:
 **[http://localhost:3000](http://localhost:3000)**

---

##  API Endpoints

### Base URL:

```
http://localhost:3000
```

---

### 1. **GET /**

**Description:** Root route that confirms the API is active.

**Response:**

```text
Welcome to the Product API! Go to /api/products to see all products.
```

---

### 2. **GET /api/products**

**Description:** Fetch all products. Supports filtering, searching, and pagination.

**Query Parameters:**

| Parameter | Type   | Description                | Example                              |
| --------- | ------ | -------------------------- | ------------------------------------ |
| category  | string | Filter by category         | `/api/products?category=electronics` |
| name      | string | Search by product name     | `/api/products?name=phone`           |
| page      | number | Page number (default 1)    | `/api/products?page=2`               |
| limit     | number | Items per page (default 5) | `/api/products?limit=10`             |

**Response Example:**

```json
{
  "total": 3,
  "data": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```

---

### 3. **GET /api/products/:id**

**Description:** Retrieve a single product by its ID.

**Example Request:**

```
GET /api/products/2
```

**Example Response:**

```json
{
  "id": "2",
  "name": "Smartphone",
  "description": "Latest model with 128GB storage",
  "price": 800,
  "category": "electronics",
  "inStock": true
}
```

**Errors:**

* `404 Not Found` — If product ID doesn’t exist.

---

### 4. **POST /api/products**

**Description:** Create a new product.
**Authentication Required:**  (API Key)

**Headers:**

```
x-api-key: 12345
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Headphones",
  "description": "Wireless noise-cancelling headphones",
  "price": 250,
  "category": "electronics",
  "inStock": true
}
```

**Response:**

```json
{
  "id": "e8d9f6a4-72b5-4a30-ae20-4dbed4cbb7a0",
  "name": "Headphones",
  "description": "Wireless noise-cancelling headphones",
  "price": 250,
  "category": "electronics",
  "inStock": true
}
```

**Errors:**

* `400 Bad Request` — If any field is missing.
* `401 Unauthorized` — If API key is invalid.

---

### 5. **PUT /api/products/:id**

**Description:** Update an existing product.
**Authentication Required:**  (API Key)

**Headers:**

```
x-api-key: 12345
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Smartphone Pro",
  "description": "Upgraded version with better camera",
  "price": 950,
  "category": "electronics",
  "inStock": true
}
```

**Response:**

```json
{
  "id": "2",
  "name": "Smartphone Pro",
  "description": "Upgraded version with better camera",
  "price": 950,
  "category": "electronics",
  "inStock": true
}
```

**Errors:**

* `404 Not Found` — If product does not exist.
* `400 Bad Request` — Missing fields.
* `401 Unauthorized` — Invalid API key.

---

### 6. **DELETE /api/products/:id**

**Description:** Remove a product from the list.
**Authentication Required:**  (API Key)

**Headers:**

```
x-api-key: 12345
```

**Response:**

```json
{
  "id": "3",
  "name": "Coffee Maker",
  "description": "Programmable coffee maker with timer",
  "price": 50,
  "category": "kitchen",
  "inStock": false
}
```

**Errors:**

* `404 Not Found` — Product not found.
* `401 Unauthorized` — Invalid API key.

---

### 7. **GET /api/stats**

**Description:** Returns a count of products per category.

**Example Response:**

```json
{
  "electronics": 2,
  "kitchen": 1
}
```

---

##  Authentication

Only **non-GET** `/api` routes require authentication.
Use the header:

```
x-api-key: 12345
```

If the API key is invalid or missing, the response will be:

```json
{
  "message": "Unauthorized: Invalid API key"
}
```

---

##  Middleware Explained

| Middleware                    | Purpose                                       |
| ----------------------------- | --------------------------------------------- |
| **body-parser.json()**        | Parses incoming JSON request bodies           |
| **Logger Middleware**         | Logs request method, URL, and timestamp       |
| **Authentication Middleware** | Checks API key for POST, PUT, DELETE requests |
| **Error Handler**             | Catches and formats all application errors    |

---

##  Error Handling

The API includes a **global error handler** that returns structured error messages:

| Status Code | Meaning      | Example Message           |
| ----------- | ------------ | ------------------------- |
| 400         | Bad Request  | "All fields are required" |
| 401         | Unauthorized | "Invalid API key"         |
| 404         | Not Found    | "Product not found"       |
| 500         | Server Error | "Server Error"            |

**Example Error Response:**

```json
{
  "message": "Product not found"
}
```

---

##  Testing the API

Use **cURL**, **Postman**, or **Thunder Client**.

Example (create product):

```bash
curl -X POST http://localhost:3000/api/products \
-H "Content-Type: application/json" \
-H "x-api-key: 12345" \
-d '{"name":"Tablet","description":"Portable touchscreen device","price":400,"category":"electronics","inStock":true}'
```

---

##  Sample Data

```json
[
  {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  },
  {
    "id": "2",
    "name": "Smartphone",
    "description": "Latest model with 128GB storage",
    "price": 800,
    "category": "electronics",
    "inStock": true
  },
  {
    "id": "3",
    "name": "Coffee Maker",
    "description": "Programmable coffee maker with timer",
    "price": 50,
    "category": "kitchen",
    "inStock": false
  }
]
```

---

##  Future Improvements

* Connect to a database (MongoDB or PostgreSQL)
* Implement authentication using JWT
* Add data validation with **Joi** or **Zod**
* Write automated tests with **Jest**
* Add Swagger/OpenAPI documentation

---

