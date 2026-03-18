import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onExpenseAdded }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('expense');
    const [installments, setInstallments] = useState(1);
    const [date, setDate] = useState('');
    const [mesaj, setMesaj] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/expenses', {
                amount: amount,
                category: category,
                description: description,
                type: type,
                installments: installments,
                date: date
            }, {
                withCredentials: true
            });
            setMesaj('Kayıt Başarılı !');

            setAmount('');
            setCategory('');
            setDescription('');
            setType('expense');
            setInstallments(1);
            setDate('');

            if (onExpenseAdded) onExpenseAdded();
        }
        catch (err) {
            console.log(err);
            setMesaj(err.response.data.message);
        }
    }
    return (
        <div className='containerExpenseForm' >
            <h3>Yeni işlem Ekle</h3>
            {mesaj && <p>{mesaj}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <input type="number" placeholder='Miktar' value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <br />

                    <input type="text" placeholder='Kategori' value={category} onChange={(e) => setCategory(e.target.value)} />
                    <br />

                    <input type="text" placeholder='Açıklama' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <br />

                    <input type="number" placeholder='Taksit Sayısı' value={installments} onChange={(e) => setInstallments(e.target.value)} />
                    <br />

                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <br />

                    <label>Tür:</label>

                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="expense">Gider</option>
                        <option value="income">Gelir</option>
                    </select>
                    <br />

                    <button type="submit">Ekle</button>
                </div>
            </form>
        </div>
    )
};

export default ExpenseForm;
