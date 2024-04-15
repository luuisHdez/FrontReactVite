import React, { useState } from 'react';
import { registerUser } from '../api/tasks.api'; // Import the function from your tasks API file
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Call the registerUser function from tasksApi and pass the user data
            await registerUser({ username, password, email });
            // On successful registration, redirect to the login page or home page
            navigate('/login');
        } catch (error) {
            // Handle errors such as username taken or server issues
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
                <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3"
                    onClick={()=> navigate("/login"}>Sing in</button>
            </form>
        </div>
    );
}

export default RegisterPage;
