import axios from 'axios';

// Create an Axios instance for task operations
const tasksapi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/'
});

// Interceptor to attach token to each request
tasksapi.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Set Authorization header
        }
        return config;
    },
    error => Promise.reject(error)
);

// Create an Axios instance for registration and login operations
const register = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/'
});

export const loginUser = (credentials) => {
    return register.post('token/', credentials)
        .then(response => {
            localStorage.setItem('token', response.data.token); // Store token in localStorage
            console.log(localStorage.getItem('token'));
            return response.data;
        })
        .catch(error => {
            console.error("Login failed:", error);
            throw error;
        });
};

export const getAllTasks = () => {
    return tasksapi.get('/')
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error!", error);
            throw error;
        });
};

export const getTask = (id) => {
    return tasksapi.get(`${id}/`) // Ensure proper URL format
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error!", error);
            throw error;
        });
};

export const createTask = (task) => {
    return tasksapi.post('/', task)
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error!", error);
            throw error;
        });
};

export const deleteTask = (id) => {
    return tasksapi.delete(`${id}/`) // Ensure proper URL format
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error!", error);
            throw error;
        });
};

export const updateTask = (id, task) => {
    return tasksapi.put(`${id}/`, task) // Ensure proper URL format
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error!", error);
            throw error;
        });
};

export const registerUser = (userData) => {
    return register.post('register/', userData)
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error!", error);
            throw error;
        });
};
