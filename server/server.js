import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import bikeRoutes from './routes/bikeRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import cookieParser from 'cookie-parser';
import { dbConn } from './Database/dbConn.js';

const app = express();

app.use(
  cors({
    origin: '*', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

dbConn();

app.use('/auth', authRoutes);
app.use('/services', servicesRoutes);
app.use('/bikes', bikeRoutes);
app.use('/bookings', bookingRoutes);

export default app;
