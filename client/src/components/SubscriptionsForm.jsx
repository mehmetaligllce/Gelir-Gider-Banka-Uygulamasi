import React, { useState } from 'react';
import axios from 'axios'

const SubscriptionsForm = ({ onSubscriptionAdded }) => {
    const [name,setName]=useState('');
    const [amount,setAmount]=useState('');
    const [paymentDay,setPaymentDay]=useState('');
    const [category,setCategory]=useState('');
    const [mesaj,setMesaj]=useState('');
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post('http://localhost:3000/api/subscriptions',{
                name:name,
                amount:amount,
                paymentDay:paymentDay,
                category:category
            },{
                withCredentials:true
            });

            setMesaj('Kayıt Başarılı !');

            setName('');
            setAmount('');
            setPaymentDay('');
            setCategory('');

            if(onSubscriptionAdded) onSubscriptionAdded();
        }
        catch(err)
        {
            setMesaj('Hata Oluştu !');
        }
    }

    return(
        <div className='subscriptions-form'>
            <h3>Yeni Abone Ekle</h3>
            {mesaj && <p>{mesaj}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder='Ad' value={name} onChange={(e) => setName(e.target.value)} />
                    <br />

                    <input type="number" placeholder='Miktar' value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <br />

                    <input type="number" min="1" max="31" placeholder='Ayın Kaçında Ödenecek? (Örn: 15)' value={paymentDay} onChange={(e) => setPaymentDay(e.target.value)} />
                    <br />

                    <input type="text" placeholder='Kategori' value={category} onChange={(e) => setCategory(e.target.value)} />
                    <br />

                    <button type="submit">Ekle</button>
                </div>
            </form>
        </div>
    )


}
export default SubscriptionsForm;