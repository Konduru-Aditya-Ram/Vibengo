const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');

// import your route modules
const userRoutes       = require('./routes/user.routes');
const captainRoutes    = require('./routes/captain.routes');
const mapsRoutes       = require('./routes/maps.routes');
const rideRoutes       = require('./routes/ride.routes');
const sharingrideRoutes= require('./routes/sharingride.routes');
const lfsrideRoutes    = require('./routes/lfsride.routes');

const app = express();

// 1) CORS configuration
const corsOptions = {
  origin: 'https://vibengo.vercel.app',   // allow only your deployed front‑end
  methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
  credentials: true,                      // allow cookies/auth headers
};
app.use(cors(corsOptions));

// preflight across the board
app.options('*', cors(corsOptions));

// 2) Body parsers & cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3) Connect to MongoDB (or whatever)
connectToDb();

// 4) Health check or root
app.get('/', (req, res) => {
  res.send('🚀 API is running');
});

// 5) Mount your routers
app.use('/users',         userRoutes);
app.use('/captains',      captainRoutes);
app.use('/maps',          mapsRoutes);
app.use('/rides',         rideRoutes);
app.use('/sharingrides',  sharingrideRoutes);
app.use('/lfsrides',      lfsrideRoutes);

module.exports = app;


