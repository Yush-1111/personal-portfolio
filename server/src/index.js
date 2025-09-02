import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'
import contactRouter from './routes/contact.js'
import projectsRouter from './routes/projects.js'
import adminRouter from './routes/admin.js'
import authRouter from './routes/auth.js'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
app.use(helmet())
app.use(express.json({limit:'2mb'}))
app.use(morgan('tiny'))
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))


mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stellar_portfolio_admin')
  .then(()=>console.log('Mongo connected'))
  .catch(e=>console.error('Mongo error', e.message))

app.use('/api/contact', contactRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/admin', adminRouter)
app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`Server listening ${PORT}`))
