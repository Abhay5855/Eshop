const Order = require("../models/order");

// Get order by ID
exports.getOrderByID = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          err: "Failed to get the order",
        });
      }

      req.order = order;
      next();
    });
};

// Create Order
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;

  const order = new Order(req.body);

  order.save((err, orders) => {
    if (err) {
      return res.status(400).json({
        err: "Failed to add a product",
      });
    }

    res.json(orders);
  });
};

// Get all orders

exports.getAllOrder = (req, res) => {
  Order.find().populate("user", "_id name");
  exec((err, order) => {
    if (err) {
      return res.status(400).json({
        err: "Failed to get the orders",
      });
    }

    res.json(order);
  });
};

// Get order status
exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues());
};

exports.updateOrderStatus = (req, res) => {

     Order.findByIdAndUpdate(
        {_id : req.body.orderId},
        {$set : {status : req.body.status}},
        (err, order) => {

             if(err){
                return res.status(400).json({
                    err : "Failed to update the status"
                })
             }

             res.json(order);
        }
     )
};
