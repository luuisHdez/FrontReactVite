// src/components/TasksRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TasksPage from '../pages/TasksPage';
import TaskFormPage from '../pages/TaskFormPage';

function TasksRouter({ isAuthenticated }) {
    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <TasksPage /> : <Navigate replace to="/login" />} />
            <Route path="dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate replace to= "/login" /> } />
            <Route path="create" element={isAuthenticated ? <TaskFormPage /> : <Navigate replace to="/login" />} />
            <Route path=":id" element={isAuthenticated ? <TaskFormPage /> : <Navigate replace to="/login" />} />
        </Routes>
    );
}

export default TasksRouter;