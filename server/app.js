import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';
import subscriptionRoutes from './routes/subscription.js';

dotenv.config(
    { quiet: true }
);

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());


try {
    mongoose.connect("mongodb://localhost:27017/banka_uygulamasi");
}
catch (error) {
    console.log(error);
    process.exit(1);
}

app.use(session({
    secret: 'super_gizli_anahtar',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/banka_uygulamasi"
    })
}));

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});