// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/Sign_in/Signin';
import SignUp from './components/Sign_up/Signup';
import AddPost from './components/Add_post/Add_post';
import SearchedUser from './components/Search/SearchedUser';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Perform token validation logic if needed
            setAuthenticated(true);
            // Fetch user data or perform other necessary actions
        }
    }, []);

    const handleLogin = (userId) => {
        setAuthenticated(true);
        setUserId(userId);
    };

    const handleLogout = () => {
        setAuthenticated(false);
        setUserId('');
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
                <Route path="/signup" element={<SignUp onSignup={handleLogin} />} />

                {authenticated ? (
                    <Route
                        path="/:userId"
                        element={<AddPost onLogout={handleLogout} userId={userId} />}
                    />
                ) : (
                    <Route
                        path="/signin"
                        element={authenticated ? <Navigate to={`/${userId}`} /> : <SignIn onLogin={handleLogin} />}
                    />
                )}

                <Route path='/profile/:userId' element={ <SearchedUser /> }/>
            </Routes>
        </Router>
    );
};

export default App;
