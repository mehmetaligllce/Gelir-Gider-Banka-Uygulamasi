import express from 'express';
import mongoose from 'mongoose';
import { Subscription } from '../models/Subscription.js';
import isAuthenticated from '../middlewares/auth.js';

const router = express.Router();

router.use(isAuthenticated);

//posts
router.post('/', async (req, res) => { 
    try {
        const name=req.body.name;
        const amount = req.body.amount;
        const paymentDay= req.body.paymentDay;
        const category=req.body.category;
        const isActive=req.body.isActive;
        const userId=req.session.userId; 

        if (!name || !amount || !paymentDay || !category) {
            return res.status(400).json({error : 'Tüm alanları doldurun!'});
        }
        else{
            const subscription = new Subscription({
                name: name,
                amount: amount,
                paymentDay: paymentDay,
                category: category,
                isActive: isActive !== undefined ? isActive : true,
                user: userId 
            });
            await subscription.save();
            return res.status(201).json({message : 'Abonelik eklendi!'});
        }
    } catch(e) {
        return res.status(500).json({error: 'Hata oluştu!'});
    }
});

//gets
router.get('/', async (req, res) => { 
    try {
        const userId=req.session.userId; 
        const subscriptions=await Subscription.find({ user: userId }); 
        return res.status(200).json(subscriptions);
    } catch(e) {
        return res.status(500).json({error: 'Hata oluştu!'});
    }
});

router.get('/upcoming', async (req, res) => { 
    try {
        const userId=req.session.userId;
        const subs=await Subscription.find({user:userId, isActive:true}).sort({paymentDay:1});
        const date=new Date().getDate();
        
        const upcoming = subs.filter(sub => {
            return sub.paymentDay >= date && sub.paymentDay <= date + 7;
        });
        return res.status(200).json(upcoming);
    } catch(e) {
        return res.status(500).json({error: 'Hata oluştu!'});
    }
});

//puts
router.put('/:id', async (req, res) => { 
    try {
        const updateId=req.params.id;
        const newAmount=req.body.amount;
        const newCategory=req.body.category;
        const newName=req.body.name; 
        const newPaymentDay=req.body.paymentDay;
        const newIsActive=req.body.isActive;

        
        const subscription= await Subscription.findOneAndUpdate(
            { _id: updateId, user: req.session.userId },
            {
                amount: newAmount,
                category: newCategory,
                name: newName,
                paymentDay: newPaymentDay,
                isActive: newIsActive
            }
        );

        if(!subscription)
        {
            return res.status(404).json({error:"Abonelik bulunamadı!"});
        }
        else return res.status(200).json({message:"Abonelik güncellendi!"});
    } catch(e) {
        return res.status(500).json({error: 'Hata oluştu!'});
    }
});

//deletes
router.delete('/:id', async (req, res) => { 
    try {
        const deleteId=req.params.id;

        const subscriptionInfo = await Subscription.findOneAndDelete({user: req.session.userId, _id: deleteId});

        if(!subscriptionInfo)
        {
            return res.status(404).json({error:"Abonelik bulunamadı!"});
        }
        else return res.status(200).json({message:"Abonelik silindi!"});
    } catch(e) {
        return res.status(500).json({error: 'Hata oluştu!'});
    }
});

export default router;