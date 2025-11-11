import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import { connectDB } from './configs/db.js'
import stripeRoutes from './routes/stripes.js'


await connectDB()

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

app.use('/', (req, res) => {
    res.send('server is running')
})

// ⚠️ Stripe webhook route phải dùng raw body
app.use('/api/webhook', stripeRoutes)
app.use('/api', stripeRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

