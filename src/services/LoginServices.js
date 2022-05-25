import {Axios} from './Axios';

export function login(payload){
    const url = "/api/auth/signin";
    return Axios.post(url,payload)
}

export const LoginServices = {
    login
}