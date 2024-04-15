import axios from 'axios';
const tasksapi = axios.create({
    baseURL:'http://localhost:8000/tasks/api/v1/tasks/'
});
const register = axios.create({
    baseURL:'http://localhost:8000/tasks/api/v1/'
});

export const loginUser = (credentials) => {
    return register.post('token/', credentials)
        .then(response => response.data)
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

export const getTask = (id) =>{
    console.log(id,"param get");
    return tasksapi.get(id)
  .then(response => response.data)
  .catch(error => {
    console.error("There was an error!", error);
    throw error;
});
}

export const createTask = (task) => {
    return tasksapi.post('/', task)
    .then(response => response.data)
    .catch(error => {
        console.error("There was an error!", error);
        throw error;
    });
}

export const deleteTask = (id) => {
    return tasksapi.delete(id)
  .then(response => response.data)
  .catch(error => {
    console.error("There was an error!", error);   
    throw error; 
});
}

export const updateTask = (id, task) => {
    return tasksapi.put(`${id}/`,task)
.then(response => response.data)
.catch(error => {
    console.error("There was an error!", error);
});
}

export const registerUser = (userData) => {
    return register.post('register/', userData)
    .then(response => response.data)
    .catch(error => {
        console.error("There was an error!", error);
        throw error;
    });
}
