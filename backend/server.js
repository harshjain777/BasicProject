require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db.js')
const authRoute = require('./routes/auth.js')
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));