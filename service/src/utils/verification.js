import { v4 as uuidv4 } from 'uuid'
import db from '../utils/db.js'

export const generateVerificationToken = async (email) => {
  const token = uuidv4()

  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await db.emailVerification.findUnique({
    where: { email: email }
  })

  if (existingToken) {
    await db.emailVerification.delete({
      where: { email: existingToken.email }
    })
  }

  const verificationToken = await db.emailVerification.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verificationToken
}
