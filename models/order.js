const moongoose = require("mongoose");
const { Schema } = moongoose;

const { ObjectId} = moongoose.Schema;

const ProductCartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  description : String,
  name: String,
  count: Number,
  quantity : Number,
});

const OrderSchema = new Schema(
  {
    products: [ProductCartSchema],
    transition_id: {},
    address: String,
    amount: { type: Number },
    updated: Date,
    status : {
      type : "String",
      default : "Recieved",
      enum : ["Cancelled" , "Delivered" , "Shipped" , "Processing" , "Recieved"]
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = moongoose.model("Order", OrderSchema);
