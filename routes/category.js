const express = require("express");
const router = express.Router();
const { isSignedin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {getCategoryById, getCategory, createCategory, getAllCategory, updateCategory, deleteCategory} = require("../controllers/category");

// Params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// Actual routes
// post category
router.post("/category/create/:userId" , isSignedin , isAuthenticated , createCategory);

// Get category by Id 
router.get("/category/:categoryId" , getCategory);

// Get all categories
router.get("/category", getAllCategory);

// Update category
router.put("/category/:categoryId/:userId" , isSignedin , isAuthenticated , updateCategory);

// Delete Category
router.delete("/category/:categoryId/:userId", isSignedin , isAuthenticated , deleteCategory);



module.exports = router;
