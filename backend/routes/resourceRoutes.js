import { Router } from 'express';
import { list, getOne, create, update, remove } from '../controllers/resourceController.js';
import { protect } from '../middleware/auth.js';
import { validate, productInput, customerInput, couponInput } from '../middleware/validate.js';
export function resourceRoutes(resource, schema) { const router = Router(); router.use(protect); router.route('/').get(list(resource)).post(validate(schema), create(resource)); router.route('/:id').get(getOne(resource)).put(validate(schema.partial()), update(resource)).delete(remove(resource)); return router; }
export { productInput, customerInput, couponInput };
