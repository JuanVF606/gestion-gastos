import axios from 'axios';

// Configura la base URL de tu API si es necesario
const api = axios.create({
    baseURL: '/api/v1/',
});

// Obtener categorías
export const getCategorias = () => {
    return api.get('categorias/')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching categories:', error);
            throw error;
        });
};

// Obtener tipos de gasto
export const getTiposGasto = () => {
    return api.get('tipos-gasto/')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching types of expenses:', error);
            throw error;
        });
};

// Crear presupuesto
export const createPresupuesto = (data) => {
    return api.post('presupuestos/', data)
        .then(response => response.data)
        .catch(error => {
            console.error('Error creating presupuesto:', error);
            throw error;
        });
};
