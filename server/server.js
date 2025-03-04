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
    origin:  "https://bike-service-station.vercel.app",
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,token'
}));

// Middleware to parse JSON request bodies
app.use(json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/services', servicesRoutes);
app.use('/bikes', bikeRoutes);
app.use('/bookings', bookingRoutes);
app.listen(5000, () => {
    console.log('listening on port 5000');
})