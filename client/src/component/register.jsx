import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/auth/register', { username, password });
            alert('User registered');
            navigate('/dashboard')
        } catch (error) {
            alert('Error registering user');
        }
    };

    return (
        <div className="h-screen w-full items-center flex justify-center">
            <form onSubmit={handleSubmit} className="flex w-1/2 px-20 flex-col space-y-4">
            <input type="text" placeholder="Username" className="p-2 border" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" className="p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="p-2 bg-blue-500 text-white">Register</button>
        </form>
        </div>
    );
};

export default Register;
