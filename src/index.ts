import express, { Request, Response } from 'express';
import cors from 'cors'

const app = express()
const PORT = 3000


app.use(cors({
  origin: 'http://localhost:5173' 
}))
app.use(express.json())


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})