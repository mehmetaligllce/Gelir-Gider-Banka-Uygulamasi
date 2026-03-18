import React,{ useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login=()=>{
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[hataMesaji,setHataMesaji]=useState('');

    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{const response =await axios.post('http://localhost:3000/api/auth/login',{
            email,
            password
        },{withCredentials:true});
        console.log('Sunucudan gelen cevap',response.data);
        navigate('/dashboard');
        }
        catch(error){
            setHataMesaji('Giriş başarısız');
            if(error.response && error.response.data)
            {
                setHataMesaji(error.response.data.error);
            }
            else{
                setHataMesaji('Bir hata oluştu');
            }
        }
    };
    return(
        <div className="login-container">
            <h1>Giriş Yap</h1>
            {hataMesaji && <p style={{color:'red'}}>{hataMesaji}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <button type="submit">Giriş Yap</button>
            </form>
            <p>Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link></p>
        </div>
    );
};

export default Login;