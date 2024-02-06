const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(port, () => console.log(`App is running on port ${port}`));