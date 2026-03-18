import express from 'express';
import mongoose from 'mongoose';
import { Expense } from '../models/Expense.js';
import isAuthenticated from '../middlewares/auth.js';

const router = express.Router();

//posts

router.post('/',isAuthenticated, async (req, res) => {
    try{
        const amount = req.body.amount;
        const category = req.body.category;
        const description = req.body.description;
        const type = req.body.type;
        const installments = req.body.installments;
        const date = req.body.date;
        const userId = req.session.userId;

        if(!amount || !category || !description || !type)
        {
            return res.status(400).json({error:"Tüm alanları doldurun!"});
        }
        else{
            const expense = new Expense({
                amount: amount,
                category: category,
                description: description,
                type: type,
                installments: installments,
                date: date,
                user: userId
            });
            await expense.save();
            return res.status(201).json({message:'Harcama eklendi!'});
        }
    }
    catch(e)
    {
        return res.status(500).json({error:'Hata oluştu!'})
    }
})

//gets
router.get('/',isAuthenticated, async (req, res) => {
    try{
        const userId=req.session.userId;
        const expenses=await Expense.find({user:userId}).sort({date: -1});
        return res.status(200).json(expenses);
    }
    catch(e)
    {
        return res.status(500).json({error:'Hata oluştu!'})
    }
})

router.get('/summary',isAuthenticated, async (req, res) => {
    try{
        const userId=req.session.userId;
        const expenses = await Expense.find({user:userId});
        
        let totalIncome = 0;
        let totalExpense = 0;
        
        expenses.forEach(exp => {
            if(exp.type === "income")
                totalIncome += exp.amount;
            else
                totalExpense += exp.amount;
        });

        return res.status(200).json({
            income: totalIncome, 
            expense: totalExpense, 
            balance: totalIncome - totalExpense
        });
        
    }
    catch(e)
    {
        return res.status(500).json({error:'Hata oluştu!'})
    }
})

router.get('/categories',isAuthenticated,async(req,res)=>{
    try{
        const userId=req.session.userId;
        const categories=await Expense.aggregate([
            {
                $match:{user:new mongoose.Types.ObjectId(userId)}
            },
            {
                $group:{
                    _id: {category:"$category",type:"$type"},
                    totalAmount:{$sum:"$amount"}
                }
            }
        ]);
        res.json(categories);
    }
    catch(err)
    {
        return res.status(500).json({error:'Hata oluştu !'});
    }
})

//puts

router.put('/:id',isAuthenticated, async (req, res) => {
    try{
        const updateId=req.params.id;
        const newAmount=req.body.amount;
        const newCategory=req.body.category;
        const newDescription=req.body.description;

        const expense = await Expense.findOneAndUpdate(
            { _id: updateId, user: req.session.userId },
            { amount: newAmount, category: newCategory, description: newDescription }
        );

        if(!expense)
        {
            return res.status(404).json({error:"Harcama bulunamadı!"});
        }

        return res.status(200).json({message:"Harcama güncellendi!"});
    }
    catch(e)
    {
        return res.status(500).json({error:'Hata oluştu!'})
    }

})


//deletes

router.delete('/:id',isAuthenticated, async (req, res) => {
    try {
        const deleteId = req.params.id;

        const expense = await Expense.findOneAndDelete({_id: deleteId, user: req.session.userId});

        if(!expense)
        {
            return res.status(404).json({error:"Harcama bulunamadı!"});
        }

        return res.status(200).json({message:"Harcama silindi!"});
    } catch(e) {
        return res.status(500).json({error:'Hata oluştu!'})
    }
})

export default router;