import axios from 'axios';
import values from '../Datas/Values';

const instance = axios.create({
    baseURL: values.api.baseUrl
})
export default instance
