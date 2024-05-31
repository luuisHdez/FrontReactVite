import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import AuthenticatedNav from './components/AuthenticatedNav';
import { Toaster } from 'react-hot-toast';

// Lazy load the components
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const TasksPage = lazy(() => import('./components/Tasks/TasksPage'));
const TaskFormPage = lazy(() => import('./components/Tasks/TaskFormPage'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));

function App() {
    const isAuthenticated = Boolean(localStorage.getItem('token'));

    return (
        <BrowserRouter>
            <MainRoutes isAuthenticated={isAuthenticated} />
        </BrowserRouter>
    );
}

function MainRoutes({ isAuthenticated }) {
    return (
        <>
            {isAuthenticated ? <AuthenticatedNav /> : <Navigation />}
           
            <Suspense fallback={<div>Loading...</div>}>
                <main className="mt-8 p-4">
                    <Routes>
                        <Route path="/" element={<Navigate replace to={isAuthenticated ? "/dashboard" : "/login"} />} />
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
                <Route path="tasks-create" element={<TaskFormPage />} />
                <Route path=":id" element={<TaskFormPage />} />
            </Routes>
        </Suspense>
    );
}

export default App;