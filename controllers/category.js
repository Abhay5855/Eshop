const Category = require("../models/category");

// Get category by id
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        message: "Category does not exist",
      });
    }

    req.category = cate;
    next();
  });
};

// Create a new category
exports.createCategory = (req, res) => {
  const category = new Category(req.body);

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        message: "Unable to add category to the DB",
      });
    }

    res.json({
      category,
    });
  });
};

// Get category by Id
exports.getCategory = (req, res) => {
  return res.json(req.category);
};

// Get all categories
exports.getAllCategory = (req, res) => {
  Category.find((err, category) => {
    if (err) {
      return res.status(400).json({
        message: "No categories",
      });
    }

    return res.json(category);
  });
};

// Update the category
exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        message: "Failed to update the category",
      });
    }
    res.json(updatedCategory);
  });
};

// Delete the category
exports.deleteCategory = (req, res) => {
  const category = req.category;

  category.remove((err, removeCategory) => {
    if (err) {
      return res.status(400).json({
        message: "Failed to delete the category",
      });
    }

    res.json({
      message: "Successfully Deleteted",
    });
  });
};
