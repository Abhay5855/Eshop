const moongoose = require("mongoose");

const { Schema } = moongoose;

const { ObjectId } = moongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },

    description: {
      type: String,
      maxlength: 2000,
      trim: true,
      required: true,
    },

    photo: {
      data: Buffer,
      contentType: String
    },

    stock : {
       type : Number,
    },

    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },

    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = moongoose.model("Product", productSchema);
