const User = require("../models/user");
const { validationResult } = require("express-validator");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

// Signup route
exports.signup = (req, res) => {
  // Error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    }
    res.json({
      email: user?.email,
      id: user?._id,
      lastname: user?.lastname,
    });
  });
};

// Signin route
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "Email does not exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        err: "Password do not match",
      });
    }

    // create token
    var token = jwt.sign({ _id: user._id }, "shhhhh");

    // send token in the cookie
    res.cookie("access_token", token, { expire: new Date() + 9999 });

    //send response to the frontend
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, email, name, role },
    });
  });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

// Signout route
exports.signout = (req, res) => {
  // Clear the cookie
  res.clearCookie("token");

  return res.json({
    message: "User logged out successfully !",
  });
};

//Custom Middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};


// Protected
exports.isSignedin = expressJwt({
  secret: "shhhhh",
  userProperty: "auth",
});
