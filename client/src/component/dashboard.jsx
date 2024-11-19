import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
            
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/api/auth/dashboard', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessage(response.data.message);
            } catch (error) {
                navigate('/login');
            }
        };

        fetchDashboard();
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-6 border w-1/3">
                <h2 className="text-4xl font-bold text-center">Dashboard</h2>
                <p>{message || 'Loading...'}</p>
            </div>
        </div>
    );
};

export default Dashboard;
