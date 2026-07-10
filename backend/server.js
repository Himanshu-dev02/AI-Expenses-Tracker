import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import incomeRouter from './routes/incomeRoute.js';
import expenseRouter from './routes/expenseRoute.js';
import dashboardRouter from './routes/dashboardRoutes.js';
import receiptRouter from './routes/receiptRoute.js';
import predictionRouter from './routes/predictionRoute.js';

const app = express();
const PORT = 4000;


//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//DB
connectDB();



//Routes
app.use("/api/user", userRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/receipt", receiptRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/prediction", predictionRouter);

app.get('/', (req, res) => {
    res.send("API WORKING!");
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
