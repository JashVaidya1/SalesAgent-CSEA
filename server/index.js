import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({ path: './.env.production' });
import connectToDb from "./config/db_config.js";
import cookieParser from "cookie-parser";
const app = express();
import customerRoutes from './routes/customerRoutes.js';
import callRoutes from './routes/callRoutes.js';
import laptopRoutes from './routes/laptopRoutes.js';
import summaryRoutes from './routes/summaryRoutes.js';

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        return callback(null, origin); 
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Allow cookies
};

const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.get('/api/v1', (req, res) => {
  res.send('Server is running!');
});


app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/calls', callRoutes);
app.use('/api/v1/laptops', laptopRoutes);
app.use('/api/v1/summary', summaryRoutes);


const start = async () => {
    try {
        await connectToDb(process.env.MONGO_URI);
        console.log("Database connected successfully!");

        app.listen(PORT, async () => {
            console.log(`Server is listening on port ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();