import { Router } from 'express'
import {
  createMany,
  createOne,
  edit,
  getByCategoryAndName,
  inactiveProduct,
  remove
} from '../controllers/product.controller.js'
import { authMiddleware } from '../middlewares/auth.js'
import { adminMiddleware } from '../middlewares/admin.js'
import { getAll } from '../controllers/product.controller.js'
import upload from '../utils/multer.js'
const router = Router()

// router.post('/create', authMiddleware, createMany)

router.post(
  '/create',
  authMiddleware,
  adminMiddleware,
  upload.single('image'),
  createOne
)

router.get('/all', getAll)

router.get('/:categoryName/:productName', getByCategoryAndName)

router.delete('/delete', authMiddleware, adminMiddleware, remove)

router.put(
  '/edit',
  authMiddleware,
  adminMiddleware,
  upload.single('image'),
  edit
)

router.get(
  '/inactive/:productId',
  authMiddleware,
  adminMiddleware,
  inactiveProduct
)

export default router
