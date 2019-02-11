import Axios from 'axios';

const API = 'https://opendata.hopefully.works';
const BACKEND = 'http://localhost:2550';

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

export function GetNewData(accessToken, callback) {

    let config = {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    }
    Axios.get(API + '/api/events', config)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            callback(error.response);
        });
}

export function GetDataFromDb(callback) {
    Axios.get(BACKEND + '/api/data-from-db')
        .then(response => {
            callback(response);
        })
        .catch(error => {
            callback(error.response);
        });
}