import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.js'
import { adminMiddleware } from '../middlewares/admin.js'
import {
  cancelUserCart,
  createAndFill,
  getAll,
  getAllByUser,
  updateState
} from '../controllers/cart.controller.js'
const router = Router()

// add products to cart
router.post('/create', authMiddleware, createAndFill)

router.post('/update-state', authMiddleware, adminMiddleware, updateState)

router.get('/all', authMiddleware, adminMiddleware, getAll)

router.get('/user/all', authMiddleware, getAllByUser)

router.post('/user/cancel', authMiddleware, cancelUserCart)


export default router
