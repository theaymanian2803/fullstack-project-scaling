import path from 'path'
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

app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
})

// 3. STATIC FILES & PRODUCTION LOGIC
const __dirname = path.resolve()

// Static folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// if (process.env.NODE_ENV === 'production') {
//   const distPath = path.join(__dirname, '/frontend/dist')

//   // Serve the frontend build files
//   app.use(express.static(distPath))

//   // EXPRESS 5 BULLETPROOF FIX:
//   // We use a Regular Expression literal to match everything.
//   // This bypasses the 'path-to-regexp' parameter naming requirement.
//   app.get(/^(?!\/api).+/, (req, res) => {
//     res.sendFile(path.resolve(distPath, 'index.html'))
//   })
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running...')
//   })
// }

// 4. ERROR HANDLING (Must be after all routes)
app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
)
