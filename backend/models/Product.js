import mongoose from 'mongoose';

 const parseImages = (images) => {
   if (Array.isArray(images)) return images.map((s) => String(s).trim()).filter(Boolean);
   if (typeof images === 'string' && images.trim().length > 0) {
     return images
       .split(',')
       .map((s) => s.trim())
       .filter(Boolean);
   }
   return [];
 };

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
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length >= 1 && arr.length <= 5;
        },
        message: 'A product must have 1 to 5 images',
      },
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

 productSchema.pre('validate', function () {
   const nextImages = parseImages(this.images);
   if (nextImages.length === 0 && this.image) {
     this.images = [this.image];
     return;
   }

   if (nextImages.length > 0) {
     this.images = nextImages;
     this.image = nextImages[0];
   }
 });

 productSchema.pre('findOneAndUpdate', function () {
   const update = this.getUpdate() || {};
   const set = update.$set || update;

   const hasImages = Object.prototype.hasOwnProperty.call(set, 'images');
   const hasImage = Object.prototype.hasOwnProperty.call(set, 'image');

   if (hasImages) {
     const nextImages = parseImages(set.images);
     set.images = nextImages;
     set.image = nextImages[0];
   } else if (hasImage) {
     const img = set.image ? String(set.image).trim() : '';
     set.image = img;
     set.images = img ? [img] : [];
   }

   if (update.$set) update.$set = set;
   this.setUpdate(update);
 });

const Product = mongoose.model('Product', productSchema);

export default Product;
