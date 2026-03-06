import { verifyToken } from '../utils/jwt.js'
import { clearSessionCookie } from '../utils/cookie.js'

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.session

  if (!token) {
    return res.status(401).json({ message: 'not authorized' })
  }
  
  req.session = { user: null }

  try {
    // verify token
    const decoded = await verifyToken(token)

    req.session.user = decoded.payload

    next()
  } catch (error) {
    console.log('ERROR: validate auth cookie ', error.message)

    clearSessionCookie(res)

    return res.status(401).json({ message: 'not authorized' })
  }
}
