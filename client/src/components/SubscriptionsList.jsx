import React from "react";
import axios from "axios";
const getBrandLogo=(name)=>{
    const brandName = String(name || '').toLowerCase();
    const brandDomains={
        'netflix': 'netflix.com',
        'spotify': 'spotify.com',
        'youtube': 'youtube.com',
        'prime': 'amazon.com',
        'amazon': 'amazon.com',
        'exxen': 'exxen.com',
        'blutv': 'blutv.com',
        'disney': 'disneyplus.com',
        'apple': 'apple.com',
        'gym': 'macfit.com.tr',
        'xbox': 'xbox.com',
        'playstation': 'playstation.com',
        'adobe': 'adobe.com',
        'canva': 'canva.com',
        'github': 'github.com',
        'discord': 'discord.com',
        'chatgpt': 'openai.com',
        'tod': 'todtv.com.tr', 
        'max': 'hbomax.com',
        'hepsiburada': 'hepsiburada.com'

    };
    for(const[key,domain] of Object.entries(brandDomains)){
        if(brandName.includes(key))
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    }
    return 'https://ui-avatars.com/api/?name=' + name + '&background=7c83ff&color=fff&rounded=true&bold=true';
};


const SubscriptionsList = ({ subscriptions, onSubscriptionDeleted, upcomingsubscriptions }) => {
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/subscriptions/${id}`, { withCredentials: true });
            onSubscriptionDeleted();
        } catch (error) {
            console.error("Abonelik silinirken hata oluştu:", error);
        }
    };
    return (
        <div className="subscriptionlist">
            {!upcomingsubscriptions || upcomingsubscriptions.length === 0 ? <p>Kesilecek abonelik bulunamadı</p> : <p>7 Gün İçinde Kesilecek Abonelikler</p>}

            {upcomingsubscriptions.map(sub => (
                <div key={sub._id}>
                    <ul>
                        <li>{sub.name}</li>
                        <li>{sub.amount} ₺</li>
                        <li>(Ayın {sub.paymentDay}. günü)</li>
                        <li>{sub.category}</li>
                    </ul>
                </div>
            ))}

            <h3>Tüm Abonelikler</h3>
            {(!subscriptions || subscriptions.length === 0) ? <p> Henüz aktif abonelik bulunamadı</p> : <p>Aktif Abonelikler</p>}

            <table border="1">
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Abonelik Adı</th>
                        <th>Aylık Tutar</th>
                        <th>Ödeme Günü</th>
                        <th>Kategori</th>
                        <th>Aktif Mi?</th>
                        <th>Sil</th>
                    </tr>
                </thead>
                <tbody>

                    {subscriptions.map(sub => (
                        <tr key={sub._id}>
                            <td><img src={getBrandLogo(sub.name)} alt={sub.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} /></td>
                            <td>{sub.name}</td>
                            <td>{sub.amount} ₺</td>
                            <td>Ayın {sub.paymentDay}. günü</td>
                            <td>{sub.category}</td>
                            <td style={{ color: sub.isActive ? 'green' : 'red' }}>{sub.isActive ? 'Aktif' : 'Pasif'}</td>
                            <td><button onClick={() => handleDelete(sub._id)}>Sil</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );

};

export default SubscriptionsList;