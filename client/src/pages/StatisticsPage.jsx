import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Navbar from '../components/Navbar';
const COLORS = ['#28a745', '#dc3545','#cd7584','#f7b731','#ff6b6b','#4ecdc4','#556270','#c7f464'];

const statisticsPage=()=>{
    const [categories,setCategories]=useState([]);
    const[mesaj,setMesaj]=useState('');
    const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });


    const fetchData=async()=>{
        try{
            const responseSummary=await axios.get('http://localhost:3000/api/expenses/summary',{withCredentials:true})
            setSummary(responseSummary.data);

            const responseCategories=await axios.get('http://localhost:3000/api/expenses/categories',{withCredentials:true})
            setCategories(responseCategories.data);

        }
         catch(err)
        {
            setMesaj(`Hata oluştu : ${err.response.data.error}`);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    const chartData = [
        { name: 'Gelir', value: summary.income },
        { name: 'Gider', value: summary.expense }
    ];
    const expenseChartData = categories
        .filter(c => c._id.type==='expense') 
        .map(c => ({ name: c._id.category, value: c.totalAmount }));

    const incomeChartData=
      categories.filter(c => c._id.type==='income').map(c => ({ name: c._id.category, value: c.totalAmount }))
    ;
    return(
        <div>
            <Navbar/>
            {mesaj && <p>{mesaj}</p>}
            <h1>İstatistikler</h1>
            <br /><br /><br />


            <h3>Gelir Gider Dağılımı</h3>
            {(summary.income > 0 || summary.expense > 0) && (

                    <PieChart width={400} height={300}>
                        <Pie data={chartData} dataKey={'value'} cx='50%' cy='50%'
                            innerRadius={60}
                            outerRadius={100}
                        >
                            {chartData.map((dilim, i) => (
                                <Cell key={`cell-${i}`} fill={COLORS[i]} />
                            ))}

                        </Pie>
                        <Tooltip formatter={(deger) => `${deger} ₺`} />
                        <Legend />
                    </PieChart>
                )}
                <br />


            <h3>Gider Kategorileri</h3>
            {(summary.expense > 0) && (

                    <PieChart width={400} height={300}>
                        <Pie data={expenseChartData} dataKey={'value'} cx='50%' cy='50%'
                            innerRadius={60}
                            outerRadius={100}
                        >
                            {expenseChartData.map((dilim, i) => (
                                <Cell key={`cell-${i}`} fill={COLORS[i]} />
                            ))}

                        </Pie>
                        <Tooltip formatter={(deger) => `${deger} ₺`} />
                        <Legend />
                    </PieChart>
                )}
                <br />


            <h3>Gelir Kategorileri</h3>
            {(summary.income > 0) && (

                    <PieChart width={400} height={300}>
                        <Pie data={incomeChartData} dataKey={'value'} cx='50%' cy='50%'
                            innerRadius={60}
                            outerRadius={100}
                        >
                            {incomeChartData.map((dilim, i) => (
                                <Cell key={`cell-${i}`} fill={COLORS[i]} />
                            ))}

                        </Pie>
                        <Tooltip formatter={(deger) => `${deger} ₺`} />
                        <Legend />
                    </PieChart>
                )}

                {summary.income === 0 && summary.expense === 0 && (
                    <p>Henüz gelir veya gider eklenmemiş.</p>
                )}



            <h3></h3>
        </div>
    )
}

export default statisticsPage;