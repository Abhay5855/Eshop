const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  signout,
  isSignedin,
  isAuthenticated,
} = require("../controllers/auth");
const { body } = require("express-validator");

// Signup
router.post(
  "/signup",
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),

  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid email address"),

  body("name").notEmpty().withMessage("Name cannot be empty"),
  signup
);

// Signin
router.post(
  "/login",
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),

  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid email address"),
  login
);

// Signout
router.post("/signout", signout);

// Proteted
router.post("/testroute", isSignedin, (req, res) => {
  res.send("protected route");
});

module.exports = router;
