import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import connectToDb from "./config/db_config.js";
import cookieParser from "cookie-parser";
const app = express();
import productRoutes from './routes/productRoutes.js';

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            // Allow non-browser requests like Postman or server-to-server requests
            return callback(null, true);
        }
        return callback(null, origin); // Allow any origin dynamically
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Allow cookies
};

const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});


app.use('/api/products', productRoutes);

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