import { uploadImageToS3, upload } from '../utils/upload.js';

import jwt from 'jsonwebtoken';

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
