import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Custom hook for handling login
const useLogin = () => {
    const navigate = useNavigate();

    const loginUser = async (credentials) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/token/`, credentials);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            navigate('/tasks');
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Throw error to be caught by the calling component
        }
    };

    return { loginUser };
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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default LoginPage;
