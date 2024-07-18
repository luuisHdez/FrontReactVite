import axios from 'axios';
import Cookies from 'js-cookie';

// Crea una instancia de Axios para las operaciones de tareas
const tasksapi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/',
    withCredentials: true, // Asegura que las cookies se envíen con cada solicitud
});

// Crea una instancia de Axios para las operaciones de autenticación
const Authentication = axios.create({
    baseURL: 'http://localhost:8000/authentication/',
    withCredentials: true, // Asegura que las cookies se envíen con cada solicitud
});

// Añadir CSRF token a las solicitudes si está presente en las cookies
Authentication.interceptors.request.use(
    config => {
        const csrfToken = Cookies.get('csrftoken');
        console.log('CSRF Token (before API call):', csrfToken); // Imprime el token CSRF antes de la llamada API
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Interceptor para manejar errores de autenticación
// Añadir token de acceso y CSRF token a las solicitudes de tasksapi
tasksapi.interceptors.request.use(
    config => {
        const csrfToken = Cookies.get('csrftoken');
        const accessToken = localStorage.getItem('access'); // Obtener el token de acceso del almacenamiento local
        console.log('Access Token (before API call):', accessToken);
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Función para registrar un usuario
export const registerUser = (userData) => {
    return Authentication.post('register/', userData)
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error!", error);
            throw error;
        });
};

// Función para iniciar sesión del usuario
export const loginUser = (credentials) => {
    const csrfToken = Cookies.get('csrftoken'); // Obtener el token CSRF de las cookies
    console.log(csrfToken,"tokeeeeeeen")
    return Authentication.post('login/', credentials, {
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    .then(response => {
        localStorage.setItem('access', response.data.access); // Guardar el token de acceso
        localStorage.setItem('refresh', response.data.refresh); // Guardar el token de refresco
        return response.data;
    })
    .catch(error => {
        console.error("Login failed:", error);
        throw error;
    });
};

export const logout = () => {
    const csrfToken = Cookies.get('csrftoken'); // Obtener el token CSRF de las cookies
    console.log(csrfToken,"tokeeeeeeen")
    return Authentication.post('logout/', {}, {
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    .then(response => {
        // Remove the session data
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        Cookies.remove('csrftoken');
       
        return response.data;
    })
    .catch(error => {
        console.log("Logout failed", error);
        throw error;
    });
}

// Otras funciones para manejar las tareas (sin cambios)
export const getAllTasks = () => {
    return tasksapi.get('/')
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error!", error);
            throw error;
        });
};

export const getTask = (id) => {
    return tasksapi.get(`${id}/`) // Asegura el formato correcto de la URL
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
    return tasksapi.delete(`${id}/`) // Asegura el formato correcto de la URL
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error!", error);
            throw error;
        });
};

export const updateTask = (id, task) => {
    return tasksapi.put(`${id}/`, task) // Asegura el formato correcto de la URL
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error!", error);
            throw error;
        });
};
