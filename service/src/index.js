import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/index.js'
import { PORT } from './config.js'
const app = express()

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use(cookieParser())

app.use('/api/v1', router)

app.listen(PORT, () => console.log('app listen on port 3000'))
