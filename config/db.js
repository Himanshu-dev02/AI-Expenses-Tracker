import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://meshramhimanshu20_db_user:aV7UlzQ2FN0jrLCk@cluster0.hrkhgoh.mongodb.net/ExpensesTracker")
    .then(() => 
        console.log("Connected to MongoDB"));
}
    