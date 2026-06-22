import axios from 'axios';
import API_BASE_URL from "./api";



export const getClasses = () => {
    return axios.get(`${API_BASE_URL}/classes`);
};