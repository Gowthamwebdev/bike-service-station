import express from 'express';
import cors from 'cors';
import { urlencoded, json} from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
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

app.use('/api/auth', authRoutes);
app.listen(5000, () => {
    console.log('listening on port 5000');
})