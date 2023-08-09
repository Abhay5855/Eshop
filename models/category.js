const moongoose = require("mongoose");

const { Schema } = moongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = moongoose.model("Category", categorySchema);
