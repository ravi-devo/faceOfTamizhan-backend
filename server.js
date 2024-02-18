const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');

dotenv.config();

const port = process.env.PORT;

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(port, () => console.log(`App is running on port ${port}`));