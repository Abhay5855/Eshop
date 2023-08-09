const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  // FInd the user with id from the mongoDb
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return err.status(400).json({
        error: "User does not exist",
      });
    }

    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  // Remove the password and extra feilds from here which are not required.
  req.profile.salt = undefined;
  req.profile.encrpt_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};

// Get All users
exports.getAllUsers = (req, res) => {
  User.find((err, user) => {
    if (err || !user) {
      return err.status(400).json({
        error: "Users do not exist",
      });
    }

    return res.json(user);
  });
};

//Update the user;

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err || !user) {
        return err.status(400).json({
          error: "Users do not exist",
        });
      }
      // Remove the password and extra feilds from here which are not required.
      user.salt = undefined;
      user.encrpt_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;

      res.json(user);
    }
  );
};

// Get user Purchase list
exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order in this account",
        });
      }

      return res.json(order);
    });
};

// Middleware to push order in the purchase list
exports.pushOrderInPurchaseList = (req, res, next) => {
  // First create an empty purchases list
  let purchases = [];

  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      description: product.description,
      name: product.name,
      category: product.category,
      amount: req.body.order.amount,
      quantity: product.quantity,
      transition_id: req.body.order.transition_id,
    });
  });

  // Store this in DB
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, response) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save Purchase list to DB",
        });
      }
    }
  );

  next();
};
