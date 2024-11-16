import Axios from 'axios'
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://localhost:3030/api/';

const axios = Axios.create({ withCredentials: true })

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'GET', data = null) {
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
            console.log(res.data)
            return res.data;
        } catch (error) {
            console.error('Network error:', error);
            throw error;
        }
    }
}




