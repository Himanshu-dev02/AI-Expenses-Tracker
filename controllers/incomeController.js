import incomeModel from "../models/incomeModel.js";
import xlsx from "xlsx";
import getDateRange from "../utils/dateFilter.js";


//add income
export async function addIncome(req, res) {
    const userId = req.user.id;

        const { description, amount, category, date } = req.body;
        try{
            if(!description || !amount || !category || !date){
                return res.status(400).json({ 
                    success: false,
                    message: "All fields are required" });
            }
            const income = new incomeModel({
                userId,
                description,
                amount,
                category,
                date: new Date(date)
                 
            });
            await income.save();
            res.json({ 
                success: true,
                message: "Income added successfully" });
        }catch(error){
            res.status(500).json({
                success: false,
                message: "Failed to add income" });
        }
    }


    //get income
    export async function getAllIncome(req, res) {
        const userId = req.user.id;
        try{
            const income = await incomeModel.find({userId}).sort({date: -1});
            res.json(income );
        }catch(error){
            console.log(error);
            res.status(500).json({ 
                success: false,
                message: "Failed to get income" });
        }
    }

    // update income
    export async function updateIncome(req, res) {
        const userId = req.user.id;
        const { id } = req.params;
        const { description, amount} = req.body;
        try{
            const updatedIncome = await incomeModel.findOneAndUpdate(
                {_id: id, userId},
                 {description, amount}, 
                 {new: true});
                 if (!updatedIncome) {
                    return res.status(404).json({ 
                        success: false,
                        message: "Income not found" });
                 }
            res.json({ 
                success: true,
                message: "Income updated successfully",
                data:
                updatedIncome });
        }catch(error){
            console.log(error);
            res.status(500).json({ 
                success: false,
                message: "Failed to update income" });
        }
    }   

// to delete income
export async function deleteIncome(req, res) {
    try{
        const income = await incomeModel.findByIdAndDelete(req.params.id);
        if (!income) {
            return res.status(404).json({ 
                success: false,
                message: "Income not found" });
        }
        return res.json({ 
            success: true,
            message: "Income deleted successfully"
             });
    }catch(error){
        console.log(error);
        res.status(500).json({ 
            success: false,
            message: "Failed to delete income" });
    }
}


//to download the data in an excel sheet
export async function downloadIncomeExcel(req, res) {
    const userId = req.user.id;
    try{
        const income = await incomeModel.find({userId}).sort({date: -1});
        const planeData = income.map((inc) => ({
            description: inc.description,
            amount: inc.amount,
            category: inc.category,
            date: new Date(inc.date).toLocaleDateString(),
        }));
        const worksheet =  XSXL.utils.json_to_sheet(plainData);
        const workbook = XSXL.utils.book_new();
        XSXL.utils.book_append_sheet(workbook, worksheet, "IncomeModel");
       XSXL.writeFile(workbook, "income_details.xlsx");
        res.download("income_details.xlsx");
    }catch(error){
        console.log(error);
        res.status(500).json({ 
            success: false,
            message: "Failed to get income" });
    }
}

//to get income overview
