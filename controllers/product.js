const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

// Get Product by ID
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

// Create Product
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //TODO: restrictions on field -> check if all values are filled
    const { name, description, stock, category, price } = fields;

    if (!name || !description || !stock || !category || !price) {
      return res.status(400).json({
        message: "Please include all feilds",
      });
    }

    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed",
        });
      }
      res.json(product);
    });
  });
};

// Get Products

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// Middleware to get the photos
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }

  next();
};

// Delete Products
exports.deleteProduct = (req, res) => {
  const product = req.product;

  product.remove((err, deleteProduct) => {
    if (err) {
      res.status(400).json({
        error: "Failed to delete the Product",
      });
    }

    res.json({
      message: "Successfully deleted the Product",
      deleteProduct,
    });
  });
};

// Update the Product

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Failed to update the Product",
        });
      }
      res.json(product);
    });
  });
};

// Get All Products
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .populate("category")
    .exec((err, products) => {
      if (err) {
        res.status(400).json({
          error: "Failed to get the Products",
        });
      }

      res.json(products);
    });
};

// Middleware to update the stock and the count -

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
  });

  next();
};
