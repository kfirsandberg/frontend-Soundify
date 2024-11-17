import Axios from 'axios'
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://localhost:3030/api/';

const axios = Axios.create({ withCredentials: true })

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data);
    },
    getApi(endpoint, data) {
        return ajaxApi(endpoint, 'GET', data);
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


async function ajaxApi(endpoint, method = 'GET', data = null) {
    const url = `api/${endpoint}`;
    if (method === 'GET' && data) {
        const queryString = Object.keys(data)
            .map((key) => `${key}=${encodeURIComponent(data[key])}`)
            .join('&');
        const finalQueryString = queryString.replace(/%20/g, '_');
        console.log(`Full URL: ${url}?${finalQueryString}`);
        try {
            const res = await axios.get(`${url}?${finalQueryString}`, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.error('Network error:', error);
            throw error;
        }
    }
}

async function ajax(endpoint, method = 'GET', data = null) {
    const url = `${BASE_URL}${endpoint}`;
    // console.log(url); // This is just for debugging to ensure the URL is correct

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




