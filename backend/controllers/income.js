const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async(req,res)=>{
    const {title, amount, category, description, date} = req.body;

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })
    console.log(income);
    try{
        //check if input is empty
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required'})
        }
        if(amount<=0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be positive'})
        }
        await income.save()
        res.status(200).json({message: "Income added"});
    }
    catch(error){
        res.status(500).json({message: "Server Error"})
    }
}

exports.getIncomes = async(req,res)=>{
    try {
        const income = await IncomeSchema.find().sort({createdAt: -1})
        console.log("hello")
        console.log(income)
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

exports.deleteIncome = async(req,res)=>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income)=>{
            res.status(200).json({message: "Income Deleted"});
        })
        .catch((err)=>{
            res.status(500).json({message: "Server Error"})
        })
}