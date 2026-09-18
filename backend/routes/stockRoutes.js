import { Router } from 'express';
import { listStock, createStock, stockSummary } from '../controllers/stockController.js';
import { protect } from '../middleware/auth.js';
const router = Router(); router.use(protect); router.get('/summary', stockSummary); router.route('/').get(listStock).post(createStock); export default router;
