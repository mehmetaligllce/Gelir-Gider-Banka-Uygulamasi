import React from "react";
import axios from "axios";

const ExpenseList = ({ expenses,onExpenseDeleted }) => {
    if (!expenses || expenses.length === 0) {
        return <p>Hiç gideriniz bulunamadı</p>
    }
    const handleDelete=async(id)=>{
        try{
            const response=await axios.delete(`http://localhost:3000/api/expenses/${id}`,{withCredentials:true})

            if(onExpenseDeleted) onExpenseDeleted();
        }
        catch(err){
            console.log("Hata oluştu",err);
        }
    }
    return (
        <div className="expenses">
            <h2>İşlem Geçmişi</h2>
            <table>
                <thead>
                    <tr>
                        <th>Kategori</th>
                        <th>Açıklama</th>
                        <th>Miktar</th>
                        <th>Tür</th>
                        <th>Taksit Sayısı</th>
                        <th>Aylık Tutar</th>
                        <th>Tarih</th>
                        <th>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(e => (
                        <tr key={e._id}>
                            <td>{e.category}</td>
                            <td>{e.description}</td>
                            <td>{e.amount} ₺</td>
                            <td style={{ color: e.type === "expense" ? "red" : "green" }}>{e.type === "expense" ? "Gider" : "Gelir"}</td>
                            <td> {e.installments} </td>
                            <td> {(e.amount/(e.installments || 1)).toFixed(2)} ₺</td>
                            <td> {e.date ? e.date.split("T")[0] : "Belirtilmedi"} </td>
                            <td ><button onClick={()=>handleDelete(e._id)}>Sil</button></td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ExpenseList