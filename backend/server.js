require("dotenv").config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error');
const rateLimit = require('express-rate-limit');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const contentRoutes = require('./routes/contentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Security Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://equipment-website.vercel.app",
    "https://maalavyaenterprises.com",
    "https://www.maalavyaenterprises.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);

//test route
app.post('/api/test', (req, res) => {
  res.send("TEST WORKING");
});
// Default Route
app.get('/', (req, res) => {
  res.json({ message: 'Medical Equipment API Running...' });
});

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// 🔥 RUN SERVER (Always boots Express so APIs respond, regardless of DB state)
const startServer = async () => {
  try {
    await connectDB(); // ✅ WAIT for DB FIRST

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
  }
};

startServer();