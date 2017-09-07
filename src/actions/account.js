import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT
} from './ActionTypes';

import axios from 'axios';

export function loginRequest(username, password) {

    return (dispatch) => {
            // Inform Login API is starting
            dispatch(login());

            // API REQUEST
            return axios.post('/api/account/signin', { username, password })
            .then((response) => {
                // SUCCEED
                dispatch(loginSuccess(username));
            }).catch((error) => {
                // FAILED
                console.log("=== what type of error ? " + error);
                dispatch(loginFailure());
            });

        };
}


export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };

}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}


export function getStatusRequest() {
   return (dispatch) => {
           dispatch(getStatus());

           return axios.get('/api/account/getInfo')
           .then((response) => {
               dispatch(getStatusSuccess(response.data.info.username));
           }).catch((error) => {
               dispatch(getStatusFailure());
           });
       };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(username) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        username
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

export function logoutRequest() {
    return (dispatch) => {
        return axios.post('/api/account/logout')
        .then((response) => {
            dispatch(logout());
        });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}