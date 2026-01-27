import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_change_in_production';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Auth header:', authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No auth header or invalid format');
    return res.status(401).json({ message: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    console.log('Set userId:', req.userId, 'userRole:', req.userRole);
    next();
  } catch (err) {
    console.log('Token verification error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
