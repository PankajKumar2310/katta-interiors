import mongoose from 'mongoose';
import Product from '../models/Product.js';

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

const toClientProduct = (doc) => {
  const obj = doc.toObject({ flattenMaps: true });
  const { _id, __v, ...rest } = obj;
  return { id: _id.toString(), ...rest };
};

// GET /api/products
// Supports: page, limit, category, subcategory, search, minPrice, maxPrice, thickness, finish, featured, ids, excludeId
export const getProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      subcategory,
      search,
      minPrice,
      maxPrice,
      thickness,
      finish,
      featured,
      ids,
      excludeId,
    } = req.query;

    const pageNum = Number(page) || 1;
    const pageSize = Number(limit) || 12;

    const filter = {};

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    if (ids) {
      const idList = String(ids)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const objectIds = idList
        .filter((id) => mongoose.isValidObjectId(id))
        .map((id) => new mongoose.Types.ObjectId(id));

      filter._id = { $in: objectIds };
    }

    if (excludeId && mongoose.isValidObjectId(excludeId)) {
      filter._id = {
        ...(filter._id || {}),
        $ne: new mongoose.Types.ObjectId(excludeId),
      };
    }

    if (category) {
      filter.category = { $in: Array.isArray(category) ? category : [category] };
    }

    if (subcategory) {
      filter.subcategory = { $in: Array.isArray(subcategory) ? subcategory : [subcategory] };
    }

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (thickness) {
      filter.thickness = { $in: Array.isArray(thickness) ? thickness : [thickness] };
    }

    if (finish) {
      filter.finish = { $in: Array.isArray(finish) ? finish : [finish] };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const totalCount = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);

    res.json({
      products: products.map(toClientProduct),
      page: pageNum,
      limit: pageSize,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize) || 1,
    });
  } catch (err) {
    if (err?.name === 'ValidationError') {
      const firstKey = err?.errors ? Object.keys(err.errors)[0] : null;
      const msg = firstKey ? err.errors[firstKey]?.message : err.message;
      return res.status(400).json({ message: msg || 'Validation failed' });
    }

    if (err?.name === 'CastError') {
      return res.status(400).json({ message: err.message || 'Invalid value' });
    }

    next(err);
  }
};

// GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(toClientProduct(product));
  } catch (err) {
    next(err);
  }
};

// GET /api/products/meta
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      subcategory,
      thickness,
      finish,
      price,
      image,
      images,
      description,
      specs,
      isFeatured = false,
    } = req.body;

    const parsedImages = images !== undefined ? parseImages(images) : [];
    const finalImages = parsedImages.length > 0 ? parsedImages : image ? [String(image).trim()].filter(Boolean) : [];

    if (finalImages.length === 0) {
      return res.status(400).json({ message: 'At least one product image is required' });
    }

    if (finalImages.length > 5) {
      return res.status(400).json({ message: 'Maximum 5 images allowed per product' });
    }

    if (!name || !category || !subcategory || !price || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const product = new Product({
      name: typeof name === 'string' ? name.trim() : name,
      category: typeof category === 'string' ? category.trim() : category,
      subcategory: typeof subcategory === 'string' ? subcategory.trim() : subcategory,
      thickness: typeof thickness === 'string' ? thickness.trim() : thickness,
      finish: typeof finish === 'string' ? finish.trim() : finish,
      price: Number(price),
      image: finalImages[0],
      images: finalImages,
      description: typeof description === 'string' ? description.trim() : description,
      specs: specs || {},
      isFeatured: Boolean(isFeatured),
    });

    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: toClientProduct(product),
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const updates = req.body;
    if (updates.price !== undefined) updates.price = Number(updates.price);
    if (updates.isFeatured !== undefined) updates.isFeatured = Boolean(updates.isFeatured);

    if (updates.images !== undefined) {
      const parsedImages = parseImages(updates.images);

      if (parsedImages.length === 0) {
        return res.status(400).json({ message: 'At least one product image is required' });
      }

      if (parsedImages.length > 5) {
        return res.status(400).json({ message: 'Maximum 5 images allowed per product' });
      }

      updates.images = parsedImages;
      updates.image = parsedImages[0];
    } else if (updates.image !== undefined) {
      const img = updates.image ? String(updates.image).trim() : '';
      if (!img) {
        return res.status(400).json({ message: 'At least one product image is required' });
      }
      updates.image = img;
      updates.images = [img];
    }

    const product = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product: toClientProduct(product),
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const getProductsMeta = async (_req, res, next) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          subcategories: { $addToSet: '$subcategory' },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          subcategories: 1,
        },
      },
      { $sort: { name: 1 } },
    ]);

    const thicknesses = (await Product.distinct('thickness'))
      .filter((v) => typeof v === 'string' && v.trim().length > 0)
      .sort();

    const finishes = (await Product.distinct('finish'))
      .filter((v) => typeof v === 'string' && v.trim().length > 0)
      .sort();

    const priceAgg = await Product.aggregate([
      {
        $group: {
          _id: null,
          min: { $min: '$price' },
          max: { $max: '$price' },
        },
      },
    ]);

    const price = {
      min: priceAgg[0]?.min ?? 0,
      max: priceAgg[0]?.max ?? 0,
    };

    res.json({ categories, thicknesses, finishes, price });
  } catch (err) {
    next(err);
  }
};
