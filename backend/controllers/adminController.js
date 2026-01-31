import { uploadImageToS3, upload } from '../utils/upload.js';

import jwt from 'jsonwebtoken';
import * as xlsx from 'xlsx';

import Product from '../models/Product.js';

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Hardcoded admin credentials
    const ADMIN_EMAIL = 'adminkatta@gmail.com';
    const ADMIN_PASSWORD = 'katta2026@123';

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    // Generate JWT token for admin
    const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_change_in_production';

    const token = jwt.sign(
      { userId: 'admin', email: ADMIN_EMAIL, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Admin login successful',
      token,
      admin: {
        id: 'admin',
        name: 'Admin',
        email: ADMIN_EMAIL,
        role: 'admin',
      },
    });
  } catch (err) {
    next(err);
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Manually upload to S3
    const imageUrl = await uploadImageToS3(req.file);
    
    res.json({ imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed' });
  }
};

export const bulkUploadProducts = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No Excel file provided' });
    }

    const wb = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = wb.SheetNames?.[0];
    if (!sheetName) {
      return res.status(400).json({ message: 'Excel file has no sheets' });
    }

    const ws = wb.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(ws, { defval: '' });
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ message: 'Excel sheet is empty' });
    }

    const failures = [];
    let insertedCount = 0;

    const toBool = (v) => {
      if (typeof v === 'boolean') return v;
      if (typeof v === 'number') return v === 1;
      const s = String(v || '').trim().toLowerCase();
      return s === 'true' || s === '1' || s === 'yes' || s === 'y';
    };

    const parseSpecs = (v) => {
      if (!v) return {};
      if (typeof v === 'object') return v;
      const s = String(v).trim();
      if (!s) return {};
      try {
        const parsed = JSON.parse(s);
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch (_e) {
        return {};
      }
    };

    const parseImagesFromRow = (row) => {
      const imagesCell = String(row.images || row.Images || '').trim();
      if (imagesCell) {
        return imagesCell
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      }

      const imgs = [];
      for (let i = 1; i <= 5; i++) {
        const v = String(row[`image${i}`] || row[`Image${i}`] || '').trim();
        if (v) imgs.push(v);
      }
      return imgs;
    };

    for (let idx = 0; idx < rows.length; idx++) {
      const rowNumber = idx + 2;
      const row = rows[idx] && typeof rows[idx] === 'object' ? rows[idx] : {};

      const name = String(row.name || row.Name || '').trim();
      const category = String(row.category || row.Category || '').trim();
      const subcategory = String(row.subcategory || row.Subcategory || '').trim();
      const thickness = String(row.thickness || row.Thickness || '').trim();
      const finish = String(row.finish || row.Finish || '').trim();
      const description = String(row.description || row.Description || '').trim();
      const priceRaw = row.price ?? row.Price;
      const price = Number(priceRaw);
      const isFeatured = toBool(row.isFeatured ?? row.IsFeatured);
      const specs = parseSpecs(row.specs ?? row.Specs);
      const images = parseImagesFromRow(row);

      if (!name || !category || !subcategory || !description || !Number.isFinite(price)) {
        failures.push({ row: rowNumber, message: 'Missing required fields (name/category/subcategory/price/description)' });
        continue;
      }

      if (!Array.isArray(images) || images.length === 0) {
        failures.push({ row: rowNumber, message: 'At least one image URL is required' });
        continue;
      }

      if (images.length > 5) {
        failures.push({ row: rowNumber, message: 'Maximum 5 images allowed' });
        continue;
      }

      try {
        const doc = new Product({
          name,
          category,
          subcategory,
          thickness: thickness || undefined,
          finish: finish || undefined,
          price,
          image: images[0],
          images,
          description,
          specs: specs || {},
          isFeatured,
        });

        await doc.save();
        insertedCount += 1;
      } catch (e) {
        failures.push({ row: rowNumber, message: e?.message || 'Failed to insert row' });
      }
    }

    res.json({
      message: 'Bulk upload completed',
      insertedCount,
      failedCount: failures.length,
      failures,
    });
  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({ message: 'Bulk upload failed' });
  }
};
