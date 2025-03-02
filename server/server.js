import express from 'express';
import cors from 'cors';
import { urlencoded, json} from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import bikeRoutes from './routes/bikeRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
    origin: process.env.NEXT_PUBLIC_API_URL,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,token'
}));

// Middleware to parse JSON request bodies
app.use(json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/bookings', bookingRoutes);
app.listen(5000, () => {
    console.log('listening on port 5000');
})