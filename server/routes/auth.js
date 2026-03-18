import express from 'express';
import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { hashPassword, comparePassword } from '../modules/bcrypt.js';
import authMiddleware from '../middlewares/auth.js';
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Tüm alanları doldurun!' });
        }
        else if (await User.findOne({ email: email })) {
            return res.status(400).json({ error: 'Bu email zaten kayıtlı!' });
        }
        else if (password.length < 8) {
            return res.status(400).json({ error: 'Şifre en az 8 karakter olmalıdır!' });
        }
        else {
            const passwordHash = await hashPassword(password);
            const user = new User({ username, email, passwordHash });
            await user.save();
            return res.status(201).json({ message: 'Kayıt başarılı!' });
        }
    }
    catch (e) {
        return res.status(500).json({ error: 'Kayıt olurken hata oluştu!' });
    }
})

// Login
router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({ error: "Tüm alanları doldurun!" });
        }

        const user = await User.findOne({ email: email });

        if (user && await comparePassword(password, user.passwordHash)) {
            req.session.userId = user._id;

            return res.status(200).json({ message: "Giriş başarılı!", user: { username: user.username, email: user.email } });
        }
        else {
            return res.status(400).json({ error: "Kullanıcı adı veya şifre yanlış!" });
        }
    }
    catch (e) {
        return res.status(500).json({ error: 'Giriş yaparken hata oluştu!' });
    }
})

// Logout
router.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Çıkış yapılırken bir hata oluştu' });
        }
        res.status(200).json({ message: 'Çıkış başarılı!' });
    });
})

// Me
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).select("-passwordHash");
        if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });
        return res.status(200).json(user);
    }
    catch (e) {
        return res.status(500).json({ error: 'Kullanıcı bilgileri alınırken hata oluştu!' });
    }
})

router.put('/update', authMiddleware, async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userId = req.session.userId;
        
        const existingUser = await User.findOne({ email: email, _id: { $ne: userId } });
        if (existingUser) {
            return res.status(400).json({ error: 'Bu email zaten başka bir hesap tarafından kullanılıyor!' });
        }
        
        const updateData = { username, email };
        
        if (password) {
            if (password.length < 8) {
                return res.status(400).json({ error: 'Şifre en az 8 karakter olmalıdır!' });
            }
            updateData.passwordHash = await hashPassword(password);
        }

        await User.findByIdAndUpdate(userId, updateData);

        return res.status(200).json({ message: 'Güncelleme başarılı!' });
    }   
    catch (err) {
        return res.status(500).json({ error: 'Kullanıcı bilgileri güncellenirken hata oluştu!' });
    }
})

export default router;