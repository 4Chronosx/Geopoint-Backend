import express, { Request, Response } from 'express';
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import geoRoutes from './routes/geo.routes'
import dbRoutes from './routes/db.routes'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = 8000

app.use(cookieParser())
const allowedOrigins = [
  'http://localhost:8000',
  'http://localhost:3000',
  'http://localhost:5173',
  'https://yourdomain.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json())

app.use('/api', authRoutes);
app.use('/home', geoRoutes);
app.use('/search', dbRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})