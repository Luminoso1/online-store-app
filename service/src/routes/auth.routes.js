import { Router } from 'express'
import { login, register, logout, verifyEmail } from '../controllers/auth.controller.js'
const router = Router()

router.post('/login', login)

router.post('/register', register)

router.get('/verify-email/:token', verifyEmail)

router.get('/logout', logout)

export default router
