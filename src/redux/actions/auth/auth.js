import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    LOGOUT,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
} from './types';

const REACT_APP_API_URL = 'http://localhost:8000/';

// Helper function to configure Axios
const getConfig = (token = null) => ({
    headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `JWT ${token}` }),
        'Accept': 'application/json'
    }
});

// Helper function to handle loading state
const setLoading = (dispatch, loadingState) => {
    dispatch({
        type: loadingState
    });
};

export const load_user = () => async dispatch => {
    const token = localStorage.getItem('access');

    if (token) {
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/auth/users/me/`, getConfig(token));

            dispatch({
                type: res.status === 200 ? USER_LOADED_SUCCESS : USER_LOADED_FAIL,
                payload: res.status === 200 ? res.data : null
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    setLoading(dispatch, SET_AUTH_LOADING);

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${REACT_APP_API_URL}/auth/jwt/create/`, body, getConfig());

        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(load_user());
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    } finally {
        setLoading(dispatch, REMOVE_AUTH_LOADING);
    }
};

export const check_authenticated = () => async dispatch => {
    const token = localStorage.getItem('access');

    if (token) {
        const body = JSON.stringify({ token });

        try {
            const res = await axios.post(`${REACT_APP_API_URL}/auth/jwt/verify/`, body, getConfig());

            dispatch({
                type: res.status === 200 ? AUTHENTICATED_SUCCESS : AUTHENTICATED_FAIL
            });
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const refresh = () => async dispatch => {
    const refresh_token = localStorage.getItem('refresh');

    if (refresh_token) {
        const body = JSON.stringify({ refresh: refresh_token });

        try {
            const res = await axios.post(`${REACT_APP_API_URL}/auth/jwt/refresh/`, body, getConfig());

            dispatch({
                type: res.status === 200 ? REFRESH_SUCCESS : REFRESH_FAIL,
                payload: res.status === 200 ? res.data : null
            });
        } catch (err) {
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }
};

export const reset_password = email => async dispatch => {
    setLoading(dispatch, SET_AUTH_LOADING);

    const body = JSON.stringify({ email });

    try {
        const res = await axios.post(`${REACT_APP_API_URL}/auth/users/reset_password/`, body, getConfig());

        dispatch({
            type: res.status === 204 ? RESET_PASSWORD_SUCCESS : RESET_PASSWORD_FAIL
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_FAIL
        });
    } finally {
        setLoading(dispatch, REMOVE_AUTH_LOADING);
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    setLoading(dispatch, SET_AUTH_LOADING);

    if (new_password !== re_new_password) {
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        });
        setLoading(dispatch, REMOVE_AUTH_LOADING);
    } else {
        const body = JSON.stringify({ uid, token, new_password, re_new_password });

        try {
            const res = await axios.post(`${REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, getConfig());

            dispatch({
                type: res.status === 204 ? RESET_PASSWORD_CONFIRM_SUCCESS : RESET_PASSWORD_CONFIRM_FAIL
            });
        } catch (err) {
            dispatch({
                type: RESET_PASSWORD_CONFIRM_FAIL
            });
        } finally {
            setLoading(dispatch, REMOVE_AUTH_LOADING);
        }
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};
