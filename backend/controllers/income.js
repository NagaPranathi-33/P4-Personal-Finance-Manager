const IncomeSchema = require('../models/incomeModel')

exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date } = req.body;

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !amount || !category || !date || !description){
            return res.status(400).json({msg: "Please fill in all fields"})
        }
        if(amount <= 0 || amount === "number"){
            return res.status(400).json({msg: "Amount must be a positive number"})
        }
        await income.save()
        res.status(200).json({msg: "Income added successfully"})
    }catch (error) {
        res.status(500).json({msg: "server error"})
    }
    console.log(income)
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({msg: "server error"})
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    console.log(req.params);
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({msg: "Income deleted"})
        })
        .catch((error) => {
            res.status(500).json({msg: "server error"})
        })
}