import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
            console.log(response.data);
            // Save the JWT token in localStorage
            localStorage.setItem('token', response.data.token); 
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="flex flex-col space-y-4 p-6 border w-1/3">
                <h2 className="text-xl font-bold text-center">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    className="p-2 border"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-2 border"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="p-2 bg-blue-500 text-white">Login</button>
            </form>
        </div>
    );
};

export default Login;
