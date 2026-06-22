import axios from 'axios';
import API_BASE_URL from "./api";



export const getSubjects = (classId) => {

    return axios.get(
        `${API_BASE_URL}/subjects?classId=${classId}`
    );

};