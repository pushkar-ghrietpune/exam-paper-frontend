import axios from "axios";

import { getToken } from "../utils/auth";

const axiosInstance = axios.create({

    baseURL: import.meta.env.VITE_API_BASE_URL

});

axiosInstance.interceptors.request.use(

    (config) => {

        const token = getToken();

        if (token) {

            config.headers.Authorization =

                `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);

import {

    logout

} from "../utils/auth";

axiosInstance.interceptors.response.use(

    (response) => {

        return response;

    },

    (error) => {

        if (

            error.response &&

            (

                error.response.status === 401

                ||

                error.response.status === 403

            )

        ) {

            logout();

            window.location.href = "/login";

        }

        return Promise.reject(

            error

        );

    }

);

export default axiosInstance;