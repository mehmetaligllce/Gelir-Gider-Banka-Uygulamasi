import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hataMesaji, setHataMesaji] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', {
                username,
                email,
                password
            }, { withCredentials: true });

            console.log('Sunucudan gelen cevap', response.data);
            navigate('/');
        } catch (err) {
            if (err.response && err.response.data) {
                setHataMesaji(err.response.data.error);
            } else {
                setHataMesaji('Kayıt Başarısız');
            }
        }
    };

    return (
        <div className='containerRegister'>
            <h2>Kayıt Ol</h2>
            {hataMesaji && <p style={{ color: 'red' }}>{hataMesaji}</p>}

            <form onSubmit={handleRegister}>
                <br />
                <input type="text" placeholder="Kullanıcı Adı" value={username}
                    onChange={(e) => setUsername(e.target.value)} required />
                <br />
                <input type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                <br />
                <input type="password" placeholder="Şifre" value={password}
                    onChange={(e) => setPassword(e.target.value)} required />
                <br />
                <button type="submit">Kayıt Ol</button>
                <p>Hesabınız var mı? <Link to="/">Giriş Yap</Link></p>
            </form>
        </div>
    );
};

export default Register; 