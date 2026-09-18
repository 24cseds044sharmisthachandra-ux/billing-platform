import jwt from 'jsonwebtoken';
import { Admin } from '../models/index.js';

export async function protect(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Authentication required' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(payload.id).select('-password');
    if (!req.admin) return res.status(401).json({ message: 'Admin account not found' });
    next();
  } catch { return res.status(401).json({ message: 'Invalid or expired token' }); }
}
