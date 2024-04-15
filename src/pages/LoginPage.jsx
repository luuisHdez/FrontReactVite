import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/tasks.api';  // Import loginUser from tasks.api.js

// Custom hook for handling login
const useLogin = () => {
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        try {
            const tokens = await loginUser(credentials);
            localStorage.setItem('access_token', tokens.access);
            localStorage.setItem('refresh_token', tokens.refresh);
            navigate('/tasks');
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Throw error to be caught by the calling component
        }
    };

    return { loginUser: handleLogin };
};

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginUser } = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser({ username, password });
        } catch (error) {
            setError('Failed to log in. Please check your credentials and try again.');
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="bg-zinc-700 p-3 rounded-lg block w-full mb-3" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="bg-zinc-700 p-3 rounded-lg block w-full mb-3" />
                </div>
                <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Login</button>
                {error && <p className="error bg-red-500 p-3 rounded-lg block w-full text-center">{error}</p>}
            </form>
        </div>
    );
}

export default LoginPage;
