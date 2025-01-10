const express = require('express')

const cors = require("cors")

const connectDB = require('./config/db.js')

const authRoutes = require('./routes/auth.js')

require('dotenv').config();
require('./models/User');
require('./models/Favorite');
require('./models/Profile');
require('./models/WeatherLog');

const app = express()

app.use(cors())

app.use(express.json())

connectDB(app)

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3000

// zagon serverja
app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})