import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3000

export const SECRET_TOKEN_KEY = process.env.SECRET_TOKEN_KEY

export const EMAIL_USER = process.env.EMAIL_USER

export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

export const PUBLIC_APP_URL = process.env.PUBLIC_APP_URL
