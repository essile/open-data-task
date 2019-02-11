import Axios from 'axios';

const API = 'https://opendata.hopefully.works';

export function GetAccessTokenOnSignup(user, callback) {
    Axios.post(API + '/api/signup', {
        "email": user.email,
        "password": user.password
    })
        .then(response => {
            callback(response);
        })
        .catch(error => {
            callback(error.response);
        });
}

export function GetAccessTokenOnLogin(user, callback) {
    Axios.post(API + '/api/login', {
        "email": user.email,
        "password": user.password
    })
        .then(response => {
            callback(response);
        })
        .catch(error => {
            callback(error.response);
        });
}

export function GetData(user, callback) {

    let config = {
        headers: { 'Authorization': 'Bearer ' + user.accessToken }
    }

    Axios.get(API + '/api/events', config)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            callback(error.response);
        });
}