import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Sunmica', 'Panels'],
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
      trim: true,
    },
    thickness: {
      type: String,
    },
    finish: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    specs: {
      type: Map,
      of: String,
      default: {},
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
