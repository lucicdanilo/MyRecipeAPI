const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import routes 
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
var cors = require('cors')
app.use(cors())
dotenv.config();

// DB connect
mongoose.connect(
    process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true },
    () => console.log('DB connected!')
);

// Middleware
app.use(express.json());

// Route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


app.listen(3000, () => console.log('Server running...'));
