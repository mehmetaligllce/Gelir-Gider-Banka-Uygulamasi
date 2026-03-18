import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/Expenselist";
import Navbar from "../components/Navbar";

const ExpensesPage = () => {
    const [hataMesaji, setHataMesaji] = useState('');
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();


    const fetchExpenses = async () => {
        try {
            const fetch = await axios.get('http://localhost:3000/api/expenses', { withCredentials: true });
            setExpenses(fetch.data);
        }
        catch (err) {
            setHataMesaji('Bilgiler çekilirken hata oluştu');
        }
    }
    useEffect(() => {
        fetchExpenses();
    }, [])


    return (
        <div className="expenses-container">
            <Navbar />

            <h2>Gelir ve Giderler</h2>

            <div>
                {hataMesaji && <p>{hataMesaji}</p>}


                <ExpenseForm onExpenseAdded={fetchExpenses} />

                <ExpenseList expenses={expenses} onExpenseDeleted={fetchExpenses} />

            </div>
        </div>
    )

}
export default ExpensesPage;
