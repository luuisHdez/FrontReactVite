import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import AuthenticatedNav from './components/AuthenticatedNav';
import { Toaster } from 'react-hot-toast';
import Chartbrush from './components/Dashboard/Chartbrush'

// Lazy load the components
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const TasksPage = lazy(() => import('./components/Tasks/TasksPage'));
const TaskFormPage = lazy(() => import('./components/Tasks/TaskFormPage'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Definir el estado de autenticación
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        //Validar si el usuario es autenticado
        const token = document.cookie.includes('csrftoken');
        setIsAuthenticated(token);
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Mostrar una pantalla de carga mientras se verifica la autenticación
    }

    return (
        <BrowserRouter>
            <MainRoutes isAuthenticated={isAuthenticated} />
        </BrowserRouter>
    );
}

function MainRoutes({ isAuthenticated }) {
    return (
        <>
            {isAuthenticated ? <AuthenticatedNav/> : <Navigation />}
           
            <Suspense fallback={<div>Loading...</div>}>
                <main className="mt-8 p-4">
                    <Routes>
                        <Route path="/" element={<Navigate replace to={isAuthenticated ? "/dashboard" : "/login"} />} />
                        <Route path="/charts" element={isAuthenticated ? <Chartbrush /> : <Navigate replace to="/login" />} />
                        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate replace to="/login" />} />
                        <Route path="/login" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/tasks/*" element={isAuthenticated ? <TasksLayout /> : <Navigate replace to="/login" />} />
                    </Routes>
                </main>
            </Suspense>
            <Toaster />
        </>
    );
}

function TasksLayout() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<TasksPage />} />
                <Route path="create" element={<TaskFormPage />} />
                <Route path=":id" element={<TaskFormPage />} />
            </Routes>
        </Suspense>
    );
}

export default App;