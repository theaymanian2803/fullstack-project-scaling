import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'

// Route Imports
import productRouter from './routes/productsRoutes.js'
import userRouter from './routes/userRoutes.js'
import ordersRouter from './routes/orderRoutes.js'
import uploadRouter from './routes/uploadRoute.js'
import contactAdmin from './routes/contactRoutes.js'
import googleAuthRouter from './routes/googleRoute.js'
import reviewRouter from './routes/reviewsRoutes.js'

// Middleware Imports
import { notFound, errorHandler } from './middleware/errorHandler.js'

dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 5000

// 1. GLOBAL MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// CORS Logic
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:5173',
    credentials: true,
  })
)

// 2. API ROUTES
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/uploads', uploadRouter)
app.use('/api/contact', contactAdmin)
app.use('/api/reviews', reviewRouter)
app.use('/api/auth/google', googleAuthRouter)

app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
})

// 3. STATIC FILES & PRODUCTION LOGIC

// Static folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (process.env.NODE_ENV === 'production') {
  // Use '..' to go UP from /backend/ to the root, then into /frontend/dist/

  app.use(express.static(path.join(__dirname, 'frontend/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'))
  })
}

// 4. ERROR HANDLING (Must be after all routes)
app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
)
