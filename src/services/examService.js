import {Axios} from "./Axios";

export function getAllExam(payload) {
    const url = "/api/category";
    return Axios.get(url,payload)
}

export function getExam(id) {
    const url = `/api/category/${id}`;
    return Axios.get(url)
}

export function addExam(payload) {
    const url = "/api/category/add";
    return Axios.post(url,payload)
}

export function editExam(payload) {
    const url = "/api/category/update";
    return Axios.post(url,payload)
}

export function delExam(id) {
    const url = `/api/category/delete/${id}`;
    return Axios.del(url)
}

export const authService = {
    getAllExam,
    getExam,
    addExam,
    editExam,
    delExam
};