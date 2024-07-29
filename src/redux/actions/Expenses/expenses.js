import axios from 'axios';

// Define your API URL
const API_URL = 'http://localhost:8000/api/v1/gastos/';

export const UPDATE_EXPENSES_REQUEST = 'UPDATE_EXPENSES_REQUEST';
export const UPDATE_EXPENSES_SUCCESS = 'UPDATE_EXPENSES_SUCCESS';
export const UPDATE_EXPENSES_FAILURE = 'UPDATE_EXPENSES_FAILURE';

// Action to update expenses
export const updateExpenses = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_EXPENSES_REQUEST });
  try {
    await axios.post(`${API_URL}expenses/create/`, data);
    dispatch({ type: UPDATE_EXPENSES_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_EXPENSES_FAILURE, payload: error.message });
  }
};
