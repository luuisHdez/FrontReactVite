import React, { useState } from 'react';
import { registerUser } from '../../api/tasks.api'; // Import the function from your tasks API file
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
        return re.test(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Invalid email format.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must contain at least one uppercase letter, one symbol, and be at least 8 characters long.');
            return;
        }

        try {
            await registerUser({ username, password, email });
            toast.success('you are registered');
            navigate('/login'); // Redirect to login on successful registration
        } catch (error) {
            setError('Failed to register. Please check your credentials and try again.');
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                    />
                </div>
                <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Register</button>
                {error && <p className="error bg-red-500 p-3 rounded-lg block w-full text-center">{error}</p>}
            </form>
            <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3"
                    onClick={() => navigate("/login")}>Sign in</button>
        </div>
    );
}

export default RegisterPage;