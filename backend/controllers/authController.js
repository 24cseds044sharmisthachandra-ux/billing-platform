import jwt from 'jsonwebtoken';
import { Admin } from '../models/index.js';
const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
export async function login(req, res) { const { email, password } = req.body; const admin = await Admin.findOne({ email }); if (!admin || !(await admin.comparePassword(password))) return res.status(401).json({ message: 'Invalid email or password' }); res.json({ token: sign(admin.id), admin: { id: admin.id, name: admin.name, email: admin.email } }); }
export async function me(req, res) { res.json(req.admin); }
export async function seedAdmin() { if (process.env.ADMIN_EMAIL && !(await Admin.exists({ email: process.env.ADMIN_EMAIL }))) await Admin.create({ name: 'Workspace Admin', email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD || 'ChangeMe123!' }); }
