import express from 'express';
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,token'
}));

// Middleware to parse JSON request bodies
app.use(urlencoded({ extended: false }));
app.use(json());