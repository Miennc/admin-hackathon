import {Axios} from './Axios';

export function getAllQuestions(examId) {
    const url = `/api/question/getQuestionByExamId/${examId}`;
    return Axios.get(url)
}

export function getQuestion(id) {
    const url = `/api/question/getById/${id}`;
    return Axios.get(url)
}

export function addQuestion(payload) {
    Axios.setHeaders({
        'content-type': 'multipart/form-data'
    })
    const url = "/api/question/add";
    return Axios.post(url,payload)
}

export function editQuestion(payload) {
    const url = "/api/question/add";
    return Axios.post(url,payload)
}

export function deleteQuestion(id) {
    const url = `/api/question/delete/${id}`;
    return Axios.del(url)
}

export const questionService = {
    getAllQuestions,
    getQuestion,
    addQuestion,
    editQuestion,
    deleteQuestion
};