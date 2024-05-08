// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navigation from './components/Navigation';
import AuthenticatedNav from './components/AuthenticatedNav';
import TasksRouter from './components/tasksRouter';
import Dashboard from './components/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
    const isAuthenticated = localStorage.getItem('token');

    return (
        <BrowserRouter>
            {isAuthenticated ? <AuthenticatedNav /> : <Navigation />}
            
                <Routes>
                    <Route path="/" element={<Navigate replace to={isAuthenticated ? "/tasks" : "/login"} />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate replace to= "/login" /> } />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/tasks/*" element={<TasksRouter isAuthenticated={isAuthenticated} />} />
                </Routes>
                <Toaster />
        </BrowserRouter>

        
    );
}
 

export default App;