import { jwtVerify, SignJWT } from 'jose'
import { SECRET_TOKEN_KEY } from '../config.js'

export const generateToken = async (payload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(SECRET_TOKEN_KEY))
}

export const verifyToken = async (token) => {
  const decoded = await jwtVerify(
    token,
    new TextEncoder().encode(SECRET_TOKEN_KEY)
  )

  return decoded
}
