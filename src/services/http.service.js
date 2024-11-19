import Axios from 'axios'
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://localhost:3030/api/';

const axios = Axios.create({ withCredentials: true })

export const httpService = {
    get(endpoint, data) {
        // console.log(endpoint)
        return ajax(endpoint, 'GET', data);
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data);
    },
    put(endpoint, data) {
        
        return ajax(endpoint, 'PUT', data);
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data);
    }
};


async function ajax(endpoint, method = 'GET', data = null) {
    const url = `${BASE_URL}${endpoint}`;
    // console.log(url); // This is just for debugging to ensure the URL is correct
    console.log(url, method, data);

    // Directly append query parameters to the URL for GET requests
    if (method === 'GET' && data) {
        const queryString = Object.keys(data)
            .map((key) => `${key}=${encodeURIComponent(data[key])}`)
            .join('&');
        return axios({
            url: `${url}?${queryString}`,
            method,
            withCredentials: true,
        });
    } else {
        return axios({
            url,
            method,
            data,
            withCredentials: true,
        });
    }
}




