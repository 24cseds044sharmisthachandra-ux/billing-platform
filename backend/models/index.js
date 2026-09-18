import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, email: { type: String, required: true, unique: true, lowercase: true, trim: true }, password: { type: String, required: true, minlength: 8 }, role: { type: String, default: 'admin' } }, { timestamps: true });
adminSchema.pre('save', async function(next) { if (!this.isModified('password')) return next(); this.password = await bcrypt.hash(this.password, 12); next(); });
adminSchema.methods.comparePassword = function(value) { return bcrypt.compare(value, this.password); };

const productSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, sku: { type: String, required: true, unique: true, uppercase: true, trim: true }, category: { type: String, default: 'General' }, price: { type: Number, required: true, min: 0 }, cost: { type: Number, default: 0, min: 0 }, reorderLevel: { type: Number, default: 10, min: 0 }, description: String, active: { type: Boolean, default: true } }, { timestamps: true });
const stockSchema = new mongoose.Schema({ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, type: { type: String, enum: ['addition', 'removal'], required: true }, quantity: { type: Number, required: true, min: 1 }, reason: { type: String, required: true, trim: true }, balanceAfter: { type: Number, required: true, min: 0 }, admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' } }, { timestamps: true });
const customerSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, email: { type: String, required: true, lowercase: true, trim: true }, phone: String, company: String, address: String, notes: String }, { timestamps: true });
const orderSchema = new mongoose.Schema({ orderNumber: { type: String, unique: true }, customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }, items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, name: String, quantity: { type: Number, min: 1 }, price: { type: Number, min: 0 } }], subtotal: Number, discount: { type: Number, default: 0 }, total: Number, status: { type: String, enum: ['pending', 'processing', 'shipped', 'completed', 'cancelled'], default: 'pending' }, couponCode: String }, { timestamps: true });
const couponSchema = new mongoose.Schema({ code: { type: String, required: true, unique: true, uppercase: true, trim: true }, type: { type: String, enum: ['percentage', 'fixed'], required: true }, value: { type: Number, required: true, min: 0 }, minOrderAmount: { type: Number, default: 0 }, usageLimit: { type: Number, default: 0 }, usedCount: { type: Number, default: 0 }, expiresAt: { type: Date, required: true }, active: { type: Boolean, default: true } }, { timestamps: true });

export const Admin = mongoose.model('Admin', adminSchema);
export const Product = mongoose.model('Product', productSchema);
export const Stock = mongoose.model('Stock', stockSchema);
export const Customer = mongoose.model('Customer', customerSchema);
export const Order = mongoose.model('Order', orderSchema);
export const Coupon = mongoose.model('Coupon', couponSchema);
