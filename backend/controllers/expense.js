const ExpenseSchema = require('../models/expenseModel')

exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date } = req.body;

    const expense = ExpenseSchema({
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
        await expense.save()
        res.status(200).json({msg: "expense added successfully"})
    }catch (error) {
        res.status(500).json({msg: "server error"})
    }
    console.log(expense)
}

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({msg: "server error"})
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    console.log(req.params);
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({msg: "Expense deleted"})
        })
        .catch((error) => {
            res.status(500).json({msg: "server error"})
        })
}