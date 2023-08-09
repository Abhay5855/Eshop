const express = require("express");
const router = express.Router();
const { isSignedin, isAuthenticated } = require("../controllers/auth");
const { getUserById, getUser, getAllUsers, updateUser, userPurchaseList } = require("../controllers/user");

router.param("userId", getUserById);
router.get("/user/:userId", isSignedin, isAuthenticated, getUser);
router.put("/user/:userId" , isSignedin , isAuthenticated, updateUser);
router.get("/users", getAllUsers);
// Get all product list
router.get("orders/user/:userId" , isSignedin , isAuthenticated, userPurchaseList);

module.exports = router;
