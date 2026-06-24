import axios from "./axiosConfig";
import API_BASE_URL from "./api";

const BASE_URL = API_BASE_URL + "/admin/boards";

export const getBoards = () => {
return axios.get(BASE_URL);
};

export const createBoard = (name) => {
return axios.post(BASE_URL, {
name
});
};

export const updateBoard = (id, name) => {
return axios.put(`${BASE_URL}/${id}`, {
name
});
};

export const deleteBoard = (id) => {
return axios.delete(`${BASE_URL}/${id}`);
};
