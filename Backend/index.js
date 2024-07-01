const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());

const cors = require('cors');
const allowedOrigins = [
  'http://localhost:3000', 
  'https://blog-app-chi-pearl.vercel.app', // Add your Vercel domain here
  // Add other allowed origins as needed
];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use('/uploads', express.static(__dirname + '/uploads'));

const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });

// DB CONNECTION
const dbConnect = require('./config/database');
dbConnect();

// COOKIE PARSER
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// DEFINE ROUTES
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoutes');
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

