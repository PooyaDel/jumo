import axios from "axios";
const api = axios.create({
    baseURL: process.env.REACT_APP_APIURL
});
api.defaults.params = {};
api.interceptors.request.use((config) => {
    config.params = {
        ... config.params, 
        'api_key': process.env.REACT_APP_API_KEY,
        'append_to_response': 'images'
    };
    config.headers['Content-Type'] = 'application/json';
    return config;
}, (error) => {
    document.getElementById('loader')?.classList.remove('loading');
    return Promise.reject(error);
});

export default api;
