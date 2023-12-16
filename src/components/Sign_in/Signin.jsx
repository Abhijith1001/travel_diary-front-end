import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/signin/olduser', {
                email,
                password,
            });

            const { token, userId } = response.data;

            if (token && userId) {
                localStorage.setItem('token', token);
                onLogin(userId);
                navigate(`/${userId}`);
            } else {
                console.log('Invalid credentials');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="button" onClick={handleLogin}>
                Log In
            </button>
        </div>
    );
};

export default SignIn;
