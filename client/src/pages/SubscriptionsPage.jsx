import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SubscriptionsForm from "../components/SubscriptionsForm";
import SubscriptionsList from "../components/SubscriptionsList";
import Navbar from "../components/Navbar";

const SubscriptionsPage = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [upcomingsubscriptions, setUpcomingsubscriptions] = useState([]);
    const [hataMesaji, setHataMesaji] = useState('');
    const navigate = useNavigate();

    const fetchSubscriptions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/subscriptions', { withCredentials: true });
            setSubscriptions(response.data);
        }
        catch (err) {
            setHataMesaji('Bilgiler çekilirken hata oluştu');
        }
    }
    useEffect(() => {
        fetchSubscriptions();
    }, []);


    const fetchUpcomingSubscriptions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/subscriptions/upcoming', { withCredentials: true });
            setUpcomingsubscriptions(response.data);
        }
        catch (err) {
            setHataMesaji('Yaklaşan Aboneliklerin Bilgileri çekilirken hata oluştu');
        }
    }
    useEffect(() => {
        fetchUpcomingSubscriptions();
    }, []);

    const refreshSubscriptions = () => {
        fetchSubscriptions();
        fetchUpcomingSubscriptions();
    }

    return (
        <div className="subscriptions-container">
            <Navbar />

            <h2>Abonelikler</h2>

            <div>
                {hataMesaji && <p>{hataMesaji}</p>}

                <SubscriptionsForm onSubscriptionAdded={refreshSubscriptions} />
                <SubscriptionsList subscriptions={subscriptions} onSubscriptionDeleted={refreshSubscriptions} upcomingsubscriptions={upcomingsubscriptions} />
            </div>
        </div>

    )


}
export default SubscriptionsPage;