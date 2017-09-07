import {
    PREFERENCE_POST,
    PREFERENCE_POST_SUCCESS,
    PREFERENCE_POST_FAILURE,
    PREFERENCE_GET,
    PREFERENCE_GET_SUCCESS,
    PREFERENCE_GET_FAILURE,
    PREFERENCE_REMOVE,
    PREFERENCE_REMOVE_SUCCESS,
    PREFERENCE_REMOVE_FAILURE,
    PREFERENCE_EDIT,
    PREFERENCE_EDIT_SUCCESS,
    PREFERENCE_EDIT_FAILURE

} from './ActionTypes';
import axios from 'axios';

/* PREFERENCE POST */
export function preferencePostRequest(preferences) {
    return (dispatch) => {
    dispatch(preferencePost());
        return axios.post('/api/preference/', { preferences })
        .then((response) => {

            dispatch(preferencePostSuccess());
        }).catch((error) => {
            dispatch(preferencePostFailure(error.response.data.code));
        });
    };
}

export function preferencePost() {
    return {
        type: PREFERENCE_POST
    };
}

export function preferencePostSuccess() {
    return {
        type: PREFERENCE_POST_SUCCESS
    };
}

export function preferencePostFailure(error) {
    return {
        type: PREFERENCE_POST_FAILURE,
        error
    };
}

/* PREFERENCE GET */
export function preferenceGetRequest(username) {
    return (dispatch) => {
    dispatch(preferenceGet());
        return axios.get('/api/preference/' + username)
        .then((response) => {
              dispatch(preferenceGetSuccess( response.data  ));

        }).catch((error) => {
            dispatch(preferenceGetFailure());
        });

    };

}

export function preferenceGet() {
    return {
        type: PREFERENCE_GET
    };
}

export function preferenceGetSuccess(data ) {
    return {
        type: PREFERENCE_GET_SUCCESS,
        data
    };
}

export function preferenceGetFailure() {
    return {
        type: PREFERENCE_GET_FAILURE
    };
}


export function preferenceRemoveRequest(username ) {
    return (dispatch) => {
            dispatch(preferenceRemove());

            return axios.delete('/api/preference/' + username)
            .then((response) => {
                dispatch(preferenceRemoveSuccess());
            }).catch((error) => {
                dispatch(preferenceRemoveFailure(error.response.data.code));
            });
        };
}

export function preferenceRemove() {
    return {
        type: PREFERENCE_REMOVE
    };
}

export function preferenceRemoveSuccess( ) {
    return {
        type: PREFERENCE_REMOVE_SUCCESS
    };
}

export function preferenceRemoveFailure(error) {
    return {
        type: PREFERENCE_REMOVE_FAILURE,
        error
    };
}

export function preferenceEditRequest(username, preferences) {
    return (dispatch) => {
            dispatch(preferenceEdit());
            return axios.put('/api/preference/' + username, { preferences })
            .then((response) => {
                dispatch(preferenceEditSuccess(response.data.preferences));
            }).catch((error) => {
                dispatch(preferenceEditFailure(error.response.data.code));
            });
        };
}

export function preferenceEdit() {
    return {
        type: PREFERENCE_EDIT
    };
}

export function preferenceEditSuccess(preferences) {
    return {
        type: PREFERENCE_EDIT_SUCCESS,
        preferences
    };
}

export function preferenceEditFailure(error) {
    return {
        type: PREFERENCE_EDIT_FAILIURE,
        error
    };