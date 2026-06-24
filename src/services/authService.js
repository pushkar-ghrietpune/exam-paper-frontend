import axios from "./axiosConfig";
import API_BASE_URL from "./api";

const BASE_URL = API_BASE_URL + "/auth";

export const login = (
loginData
) => {

return axios.post(
    `${BASE_URL}/login`,
    loginData
);

};