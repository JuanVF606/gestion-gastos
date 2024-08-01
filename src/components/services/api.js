import axios from 'axios';

// Configura la base URL de tu API si es necesario
const api = axios.create({
    baseURL: '/api/v1/',
});

// Obtener categorías
export const getCategorias = async () => {
    try {
        const response = await api.get('categorias/');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Obtener tipos de gasto
export const getTiposGasto = async () => {
    try {
        const response = await api.get('tipos-gasto/');
        return response.data;
    } catch (error) {
        console.error('Error fetching types of expenses:', error);
        throw error;
    }
};

// Crear presupuesto
export const createPresupuesto = async (data) => {
    try {
        const response = await api.post('presupuestos/', data);
        return response.data;
    } catch (error) {
        console.error('Error creating presupuesto:', error);
        throw error;
    }
};

export const getPresupuestoPorMes = async () => {
    try {
        const response = await api.get('presupuesto-mensual/');
        return response.data;
    } catch (error) {
        console.error('Error fetching monthly budget:', error);
        throw error;
    }
};