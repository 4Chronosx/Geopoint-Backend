import express, { Request, Response } from 'express';
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import geoRoutes from './routes/geo.routes'

const app = express()
const PORT = 8000


app.use(cors({
  origin: 'http://localhost:8000' 
}))
app.use(express.json())

app.use('/api', authRoutes);
app.use('/home', geoRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})