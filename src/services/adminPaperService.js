import axios from "./axiosConfig";
import API_BASE_URL from "./api";

const BASE_URL = API_BASE_URL + "/admin/papers";

export const getPapers = () => {


return axios.get(BASE_URL);


};

export const createPaper = (formData) => {


return axios.post(
    BASE_URL,
    formData,
    {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }
);


};

export const updatePaper = (
id,
formData
) => {


return axios.put(
    `${BASE_URL}/${id}`,
    formData,
    {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }
);


};

export const deletePaper = (
id
) => {


return axios.delete(
    `${BASE_URL}/${id}`
);


};
