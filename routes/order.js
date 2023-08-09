const express = require("express");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { getOrderByID, createOrder, getAllOrder } = require("../controllers/order");
const { updateStock } = require("../controllers/product");
const { isSignedin, isAuthenticated } = require("../controllers/auth");
const router = express.Router();




router.param("userID" , getUserById);
router.param("orderID" , getOrderByID);

// Create order
router.post("/order/create/:userID" ,isSignedin, isAuthenticated, pushOrderInPurchaseList , updateStock, createOrder);

// Get Order
router.get("/order/all/:userID" , isSignedin, isAuthenticated, getAllOrder);

// Get order status
router.get("/order/status/:userID" , getOrderStatus);

// Update the order status
router.put("/order/:orderID/status/:userID" , updateOrderStatus);

module.exports = router;