

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import TaskFormPage from './pages/TaskFormPage';
import LoginPage from './pages/LoginPage'; // Import LoginPage

import RegisterPage from './pages/RegisterPage';
import { Navigation } from './components/Navigation';
import { Toaster } from 'react-hot-toast';

function App() {
    const isAuthenticated = localStorage.getItem('access_token');

    return (
<BrowserRouter>
            <div className="container mx-auto">
                <Navigation />
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate replace to="/tasks"/> : <LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} /> {/* New route for registration */}
                    <Route path="/tasks" element={isAuthenticated ? <TasksPage /> : <Navigate replace to="/login" />} />
                    <Route path="/tasks-create" element={isAuthenticated ? <TaskFormPage /> : <Navigate replace to="/login" />} />
                    <Route path="/tasks/:id" element={isAuthenticated ? <TaskFormPage /> : <Navigate replace to="/login" />} />
                </Routes>
                <Toaster />
            </div>
        </BrowserRouter>
    );
}

export default App;
