import axios from "./axiosConfig";
import API_BASE_URL from "./api";

const BASE_URL = API_BASE_URL + "/admin/classes";

export const getClasses = () => {


return axios.get(BASE_URL);


};

export const createClass = (classData) => {


return axios.post(
    BASE_URL,
    classData
);


};

export const updateClass = (
id,
classData
) => {


return axios.put(
    `${BASE_URL}/${id}`,
    classData
);


};

export const deleteClass = (
id
) => {


return axios.delete(
    `${BASE_URL}/${id}`
);


};
