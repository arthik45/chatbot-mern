import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import dotenv from "dotenv";
dotenv.config(); 
import chatRoute from './routes/chat.js';



const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
// app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.startsWith("http://localhost")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));



app.get('/', (req, res) => {
  res.send('Api is running...');
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Incoming ${req.method} request to ${req.url}`);
  next();
});


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRoute);






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});