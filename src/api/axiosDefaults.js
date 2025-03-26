import axios from 'axios';

axios.defaults.baseURL = 'https://drf-api-moments-app-83b302cf21ca.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true
