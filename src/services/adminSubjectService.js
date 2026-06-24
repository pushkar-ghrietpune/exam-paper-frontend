    import axios from "./axiosConfig";
    import API_BASE_URL from "./api";

    const BASE_URL = API_BASE_URL + "/admin/subjects";

    export const getSubjects = () => {


    return axios.get(BASE_URL);


    };

    export const createSubject = (subjectData) => {


    return axios.post(
        BASE_URL,
        subjectData
    );


    };

    export const updateSubject = (
    id,
    subjectData
    ) => {


    return axios.put(
        `${BASE_URL}/${id}`,
        subjectData
    );


    };

    export const deleteSubject = (
    id
    ) => {


    return axios.delete(
        `${BASE_URL}/${id}`
    );


    };
