import { generateToken } from '../utils/jwt.js'
import { clearSessionCookie, setSessionCookie } from '../utils/cookie.js'
import { comparePassword, encryptPassword } from '../utils/bcrypt.js'
import { generateVerificationToken } from '../utils/verification.js'
import { sendVerificationEmail } from '../utils/nodemailer.js'
import db from '../utils/db.js'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // get user from db
    const user = await db.user.findFirst({
      where: { email: email }
    })

    if (!user) {
      return res.status(400).json({ message: 'user not found' })
    }

    // ensure user is verified
    // if (!user.isVerified) {
    //   const verificationToken = await generateVerificationToken(user.email)
    //   await sendVerificationEmail(user.email, verificationToken.token)

    //   return res.status(400).json({
    //     message: 'verify your account',
    //     email: user.email
    //   })
    // }

    // compare password
    const isPasswordMatch = comparePassword(password, user.password)

    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'invalid password' })
    }

    // generate token & set token
    const payload = {
      id: user.id,
      role: user.role
    }
    const token = await generateToken(payload)

    setSessionCookie(res, token)

    return res.status(200).json({
      message: 'login successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        address: user.address,
        phone: user.phone
      }
    })
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).json({ message: 'Error login controller' })
  }
}

export const register = async (req, res) => {
  try {
    const { username, email, address, phone, password, role = 'CUSTOMER' } = req.body

    const isUser = await db.user.findUnique({
      where: { email: email }
    })

    if (isUser) {
      return res.status(400).json({ message: 'user already exists' })
    }

    const hash = encryptPassword(password)

    const newUser = await db.user.create({
      data: {
        username,
        email,
        address,
        phone,
        password: hash,
        role
      }
    })

    // const verificationToken = await generateVerificationToken(newUser.email)
    // await sendVerificationEmail(newUser.email, verificationToken)

    return res.status(200).json({
      message: 'user sucessfully created. Now verify your email',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        address: newUser.address,
        phone: newUser.phone,
        role: newUser.role
      }
    })
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).json({ message: 'Error register controller' })
  }
}

export const logout = (req, res) => {
  try {
    clearSessionCookie(res)
    return res.status(200).json({ message: 'logout successfully' })
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).send('Error logout controller')
  }
}

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params

    const verificationRecord = await db.emailVerification.findFirst({
      where: { token }
    })

    // ensure token has not expired
    if (new Date() > verificationRecord.expires) {
      await db.emailVerification.delete({
        where: { email: verificationRecord.email }
      })
      return res.status(400).json({ message: 'token has expired' })
    }

    // verify user email -> isVerified { true }
    const updatedUser = await db.user.update({
      where: { email: verificationRecord.email },
      data: { isVerified: true }
    })

    if (!updatedUser) {
      return res.status(400).json({ message: 'user not found' })
    }

    // delete the email token
    await db.emailVerification.delete({
      where: { email: verificationRecord.email }
    })

    return res.status(200).json({ message: 'email verified successfully' })
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).send('Error logout controller')
  }
}
