import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    const [hataMesaji, setHataMesaji] = useState('');
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

    return (
        <div className="navbar">
            <div className="navbar-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/expenses">İşlemler</Link>
                <Link to="/subscriptions">Abonelikler</Link>
                <Link to="/statistics">İstatistikler</Link>
                <Link to="/update">Bilgileri Güncelle</Link>
            </div>
            <button onClick={handleLogOut}>Çıkış Yap</button>
        </div>
    )

}
export default Navbar;