import express from 'express';
import cors from 'cors';
import { urlencoded, json } from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import bikeRoutes from './routes/bikeRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import cookieParser from 'cookie-parser';
import { dbConn } from './Database/dbConn.js';
const app = express();

const allowedOrigins = [
  'https://bike-service-station.vercel.app', // Your frontend URL
  'http://localhost:3000', // Local development URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization,token', // Allowed headers
  })
);


// Middleware to parse JSON request bodies
app.use(json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

dbConn();
app.use('/auth', authRoutes);
app.use('/services', servicesRoutes);
app.use('/bikes', bikeRoutes);
app.use('/bookings', bookingRoutes);
// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});