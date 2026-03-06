import { Router } from 'express'
import authRoutes from './auth.routes.js'
import productRoutes from './product.routes.js'
import cardRoutes from './cart.routes.js'

const router = Router()

router.use('/auth', authRoutes)

router.use('/products', productRoutes)

router.use('/cart', cardRoutes)

export default router
