import axios from 'axios';
import API_BASE_URL from "./api";



export const getPapers = (subjectId) => {

    return axios.get(
        `${API_BASE_URL}/papers?subjectId=${subjectId}`
    );

};