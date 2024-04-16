import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for redirection
import { loginUser } from './path_to/tasks.api'; // Adjust the import path as needed

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(''); // Clear any existing errors

        try {
            const userData = await loginUser(credentials);
            console.log('Login successful', userData);
            // Redirect to another route upon successful login
            navigate('/dashboard'); // Change '/dashboard' to your target route after login
            setLoading(false);
        } catch (error) {
            console.error("Login failed:", error);
            setError('Login failed. Please check your credentials.');
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
