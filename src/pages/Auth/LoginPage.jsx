import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/tasks.api';
import { toast } from "react-hot-toast";
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

   /* useEffect(() => { // Hook para verificar el control de token csrf
        // Obtener y establecer el token CSRF al montar el componente
        axios.get('http://localhost:8000/authentication/get-csrf-token/')
            .then(response => {
                const csrfToken = response.data.csrfToken;
                console.log('CSRF Token (fetched on mount):', csrfToken);
                Cookies.set('csrftoken', csrfToken);
            })
            .catch(error => {
                console.error("CSRF token fetch failed:", error);
            });
    }, []);
*/
    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log('Cookies before login attempt:', document.cookie);
            const csrfToken = Cookies.get('csrftoken');
            console.log('CSRF Token (used in login):', csrfToken);

            
           
            const userData = await loginUser(credentials); // Pasar el token CSRF a la función loginUser
            console.log('Login successful', userData); 
            
            // Guardar los tokens en el almacenamiento local o en cookies
            localStorage.setItem('refresh', userData.refresh);
            localStorage.setItem('access', userData.access);

            
            navigate('/tasks');
            toast.success("Redirecting");
            
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please check your credentials.');
            setError('Login failed. Please check your credentials.');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto">
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
                        className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
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
                        className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                    />
                </div>
                <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
