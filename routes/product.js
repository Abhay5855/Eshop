const express = require("express");
const router = express.Router();
const {getUserById} = require("../controllers/user");
const {getProductById, photo, deleteProduct, updateProduct} = require("../controllers/product");
const {createProduct, getProduct, getAllProducts} = require("../controllers/product");
const { isSignedin, isAuthenticated } = require("../controllers/auth");


// Params
router.param("userId", getUserById);
router.param("productId", getProductById);


// Get product by id
router.get("/product/:productId" , getProduct)

// Create Product
router.post("/product/create/:userId" , createProduct);

// Get photo
router.get("/product/photo/:productId" , photo);

// Delete Product
router.delete("/product/:productId/:userId", isSignedin, isAuthenticated, deleteProduct );

// Update the Product
router.put("/product/:productId/:userId" , isSignedin , isAuthenticated , updateProduct);

// Get all Products
router.get("/products" , getAllProducts);

module.exports = router;
