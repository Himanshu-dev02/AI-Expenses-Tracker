import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';

const app = express();
const PORT = 4000;


//Middleware
app.use(cors());
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));


//DB
connectDB();



//Routes
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('API WORKING!');
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
