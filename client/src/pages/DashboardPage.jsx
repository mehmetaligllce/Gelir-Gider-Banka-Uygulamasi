import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from '../components/Navbar';


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [hataMesaji, setHataMesaji] = useState('');
    const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
    const navigate = useNavigate();


    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:3000/api/auth/me', { withCredentials: true });
                setUser(userResponse.data);


                const summaryResponse = await axios.get('http://localhost:3000/api/expenses/summary', { withCredentials: true });
                setSummary(summaryResponse.data);
            }
            catch (err) {
                setHataMesaji('Oturum bulunamadı');
                navigate('/');
            }
        }
        fetchDashboardData();
    }, [navigate]);

    // LOGOUT
    const handleLogOut = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/logout', {}, {
                withCredentials: true
            });
            navigate('/');
        }
        catch (err) {
            setHataMesaji('Hata Oluştu');
            navigate('/');
        }
    }


    if (!user) {
        return <div><p>Yükleniyor...</p></div>;
    }


    return (
        <div className="dashboard-container">

            <h2>Param Nerede</h2>
            <h4>Hoşgeldin {user.username}</h4>
            <Navbar />

            <div>
                {hataMesaji && <p>{hataMesaji}</p>}
                <div className='summary-boxes'>
                    <p>Toplam Gelir: {summary.income} ₺</p>
                    <p>Toplam Gider: {summary.expense} ₺</p>
                    <p>Toplam Varlık: {summary.balance} ₺</p>
                </div>




            </div>

        </div>
    )
};
export default Dashboard;