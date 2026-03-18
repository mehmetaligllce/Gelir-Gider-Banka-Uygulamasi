import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true, enum: ['income', 'expense'] },
    installments: { type: Number, default: 1,min:1},
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})
export const Expense = mongoose.model("Expense", expenseSchema);