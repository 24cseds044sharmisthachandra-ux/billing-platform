import { Router } from 'express';
import { listOrders, createOrder, updateOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
const router = Router(); router.use(protect); router.route('/').get(listOrders).post(createOrder); router.patch('/:id/status', updateOrder); export default router;
