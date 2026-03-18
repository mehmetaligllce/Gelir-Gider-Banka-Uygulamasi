import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const UpdatePage = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mesaj, setMesaj] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/auth/me', { withCredentials: true });
                setUsername(response.data.username);
                setEmail(response.data.email);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/api/auth/update', {
                username,
                email,
                password
            }, {
                withCredentials: true
            });

            setMesaj(response.data.message);
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);

        } catch (err) {
            setMesaj(err.response?.data?.error || 'Bir hata oluştu');
        }
    }

    return (
        <div>
            <Navbar />


            <div className="containerRegister">
                <h1 style={{ color: 'red'}}>Kullanıcı Bilgilerini Güncelle</h1>

                <form onSubmit={handleUpdate}>
                    <label>Kullanıcı Adı</label>
                    <input type="text" placeholder="Kullanıcı Adı" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    <label>Email</label>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label>Şifre (Değiştirmek istemiyorsan boş bırak)</label>
                    <input type="password" placeholder="Yeni Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">Güncelle</button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePage;
