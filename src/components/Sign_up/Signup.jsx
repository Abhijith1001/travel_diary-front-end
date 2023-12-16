// Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ onSignup }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/signup/newuser', {
                userName,
                email,
                password,
            });

            console.log(response.data);

            const userId = response.data.user_id;
            onSignup();
            navigate(`/${userId}`);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">User Name</label>
                <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
